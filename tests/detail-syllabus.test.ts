// Frontend 3.0 — detail-page 4-button hero + grouped syllabus section
// (owner-approved proposal, Leo's review, owner tapped yes).
//
// Pins, at model + template-source level (the repo has no
// component-rendering test setup, so rendered output is pinned by the
// live fetch in the checkpoint, as with demo-fill and LP rebuild):
//   1. hero buttons on full detail pages, in exactly this order:
//      About the Course -> View Syllabus -> Enquire Now ->
//      All Trainings. Enquire stays the solid primary; About and
//      View Syllabus are secondary; All Trainings keeps its style.
//   2. every hero href resolves to an id on the same page: About ->
//      #about (about sections, only where they exist), Syllabus ->
//      #syllabus (grouped section, always on full pages), Enquire ->
//      #enquire (form panel) or /contact-us on held pages.
//   3. grouped syllabus section, in order: areas list ("What you
//      will learn") + card outcomes element + gated block. The
//      card outcomes element is the "Key Learning Objectives"
//      list where one exists (moved verbatim into the card), else
//      the kept section titled "Course Outcomes" or "Common Job
//      Roles", else nothing (areas + gated only; sample pages
//      carry no sections). Exactly one outcomes element per card;
//      a legacy outcome section on a KLO page stays in About
//      verbatim, never duplicated into the card. SOC/CEH carry a
//      dashed "Key Learning - Objectives" heading, which is NOT
//      the KLO list, so they fall back to legacy.
//   4. About renders only where about sections exist (the 8
//      verified pages); sample pages carry no repo sections, so no
//      About button and no dead anchor for them.
//   5. breadcrumb, owner-refined 4 levels: Home / Trainings /
//      Courses / course title. No topic-category crumb anywhere in
//      the detail trail (visual or schema).
//   6. vocabulary lock: exact button texts only — never Enroll,
//      Register, or "Download syllabus".

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { courseDetails } from "../src/data/course-details";
import {
  buildCourseDetail,
  findLocalCourse,
} from "../src/lib/course-detail";
import type { CourseSection } from "../src/data/courses";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const detail = readSource("../src/app/trainings/[slug]/page.tsx");
const lp = readSource("../src/app/lp/[slug]/page.tsx");
const services = readSource("../src/app/services/[slug]/page.tsx");

// The full-branch hero buttons div: from its marker comment to the
// div itself (start AT the div, not the comment — the comment names
// all four buttons and would corrupt order checks), then to the
// div's own closing tag (no nested divs inside it).
// NOTE (mobile compaction stage): the container class changed from
// the old flex-wrap stack to the mobile 2-col grid + md+ flex row;
// the pin below tracks the current container class.
const heroSpan = (() => {
  const commentAt = detail.indexOf("Hero buttons, owner-approved reading order");
  expect(commentAt).toBeGreaterThan(-1);
  const start = detail.indexOf(
    '<div className="detail-hero-cta mt-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4">',
    commentAt,
  );
  expect(start).toBeGreaterThan(-1);
  const end = detail.indexOf("</div>", start);
  expect(end).toBeGreaterThan(start);
  return detail.slice(start, end);
})();

// The held branch: from the ternary to its branch separator.
const heldSpan = (() => {
  const start = detail.indexOf("model.heldBack ?");
  const end = detail.indexOf(") : (", start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return detail.slice(start, end);
})();

const isKloSection = (s: CourseSection) =>
  /key learning objectives/i.test(s.heading ?? "");
const isLegacyOutcomeSection = (s: CourseSection) =>
  /course outcomes/i.test(s.heading ?? "") ||
  /common job roles/i.test(s.heading ?? "");
// Mirror of the template's card-outcomes rule: KLO wins where one
// exists, else the legacy outcome section, else nothing.
const cardOutcomes = (sections: CourseSection[]) => {
  const klo = sections.filter(isKloSection);
  return klo.length > 0 ? klo : sections.filter(isLegacyOutcomeSection);
};

describe("Detail 4-button hero + grouped syllabus", () => {
  it("hero buttons are in the approved order with resolving targets", () => {
    const labels = [
      "About the Course",
      "View Syllabus",
      "Enquire Now",
      "All Trainings",
    ];
    const positions = labels.map((l) => heroSpan.indexOf(l));
    for (const p of positions) expect(p).toBeGreaterThan(-1);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    // Hrefs in the same order as their buttons.
    const hrefs = ['href="#about"', 'href="#syllabus"', 'href="#enquire"', 'href="/trainings"'];
    const hrefPositions = hrefs.map((h) => heroSpan.indexOf(h));
    for (const p of hrefPositions) expect(p).toBeGreaterThan(-1);
    expect(hrefPositions).toEqual([...hrefPositions].sort((a, b) => a - b));
    // Enquire is the solid primary; About/Syllabus are secondary.
    expect(heroSpan).toMatch(/href="#enquire" className="btn-primary/);
    expect(heroSpan).toMatch(/href="#about" className="btn-outline-light/);
    expect(heroSpan).toMatch(/href="#syllabus" className="btn-outline-light/);
    // Targets exist exactly once each in the template.
    expect(detail.match(/id="about"/g)?.length).toBe(1);
    expect(detail.match(/id="syllabus"/g)?.length).toBe(1);
    expect(detail.match(/id="enquire"/g)?.length).toBe(1);
    // Buttons reflow on narrow widths without clipping/overlap:
    // compact 2-column grid below md, today's flex row at md+
    // (mobile compaction stage — replaces the old flex-wrap stack).
    expect(heroSpan).toContain(
      "detail-hero-cta mt-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4",
    );
  });

  it("About is conditional on about sections; View Syllabus is on every full page", () => {
    expect(heroSpan).toMatch(
      /aboutSections\.length > 0 && \([\s\S]{0,200}About the Course/,
    );
    // The grouped section always renders on full pages (its gated
    // block is unconditional), so View Syllabus is unconditional
    // there — unlike the previous stage's topics condition.
    expect(heroSpan).not.toMatch(/topics[\s\S]{0,200}View Syllabus/);
    // Held pages: Enquire + All Trainings only, no About/Syllabus.
    expect(heldSpan).toContain("Enquire Now");
    expect(heldSpan).toContain("All Trainings");
    expect(heldSpan).not.toContain("About the Course");
    expect(heldSpan).not.toContain("View Syllabus");
  });

  it("grouped syllabus section orders areas, outcomes, gated block", () => {
    const syllabusAt = detail.indexOf('id="syllabus"');
    const aboutAt = detail.indexOf('id="about"');
    expect(syllabusAt).toBeGreaterThan(-1);
    expect(aboutAt).toBeGreaterThan(syllabusAt);
    const areasAt = detail.indexOf("What you will learn", syllabusAt);
    const outcomesAt = detail.indexOf("cardOutcomeSections.map", syllabusAt);
    const gatedAt = detail.indexOf(
      "Full syllabus — shared after enquiry",
      syllabusAt,
    );
    expect(areasAt).toBeGreaterThan(-1);
    expect(outcomesAt).toBeGreaterThan(areasAt);
    expect(gatedAt).toBeGreaterThan(outcomesAt);
    expect(gatedAt).toBeLessThan(aboutAt);
    // Gated wording verbatim, never a download promise.
    expect(detail).toMatch(
      /The full syllabus for this course is shared by the GradeSpot team\s+after enquiry — via WhatsApp or mail\./,
    );
    expect(detail).toContain("Enquire for the Full Syllabus");
    expect(detail).not.toContain("Download syllabus");
  });

  it("per-course partition: about + card outcomes cover sections exactly, nothing lost", () => {
    expect(courses.length).toBe(36);
    let aboutPages = 0;
    let cardOutcomePages = 0;
    let kloPages = 0;
    let legacyFallbackPages = 0;
    let bothPages = 0;
    let held = 0;
    for (const c of courses) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      if (model.heldBack) {
        held++;
        expect(model.sections).toEqual([]);
        continue;
      }
      const klo = model.sections.filter(isKloSection);
      const legacy = model.sections.filter(isLegacyOutcomeSection);
      const outcomes = cardOutcomes(model.sections);
      const about = model.sections.filter((s) => !outcomes.includes(s));
      // Partition: every kept section lands in exactly one group.
      expect(about.length + outcomes.length).toBe(model.sections.length);
      // Card outcomes and About never overlap (no duplication).
      expect(outcomes.some((s) => about.includes(s))).toBe(false);
      if (about.length > 0) aboutPages++;
      if (outcomes.length > 0) cardOutcomePages++;
      if (klo.length > 0) kloPages++;
      if (klo.length === 0 && legacy.length > 0) legacyFallbackPages++;
      if (klo.length > 0 && legacy.length > 0) {
        bothPages++;
        // Legacy stays in About verbatim, never duplicated into the card.
        expect(about.some((s) => isLegacyOutcomeSection(s))).toBe(true);
        expect(outcomes.some((s) => isLegacyOutcomeSection(s))).toBe(false);
      }
      if (model.sample) {
        // Sample pages carry no repo sections: no About, no outcomes.
        expect(model.sections).toEqual([]);
        expect(about).toEqual([]);
        expect(outcomes).toEqual([]);
      }
    }
    expect(held).toBe(0);
    // 8 verified pages carry about sections, and all 8 now carry a
    // card outcomes element: 5 via Key Learning Objectives
    // (AZ-900, Network+, PenTest+, Security+, Hardware) and 3 via
    // the legacy fallback (AZ-104, SOC, CEH). 3 pages carry both
    // KLO and legacy (Network+, PenTest+, Security+).
    expect(aboutPages).toBe(8);
    expect(cardOutcomePages).toBe(8);
    expect(kloPages).toBe(5);
    expect(legacyFallbackPages).toBe(3);
    expect(bothPages).toBe(3);
    const az900 = buildCourseDetail(
      findLocalCourse("azure-fundamentals-az-900")!,
      courseDetails["azure-fundamentals-az-900"],
      undefined,
    );
    expect(cardOutcomes(az900.sections).map((s) => s.heading)).toEqual([
      "Key Learning Objectives:",
    ]);
    expect(az900.sections.filter(isKloSection).length).toBe(1);
    const hardware = buildCourseDetail(
      findLocalCourse("computer-hardware-and-networking")!,
      courseDetails["computer-hardware-and-networking"],
      undefined,
    );
    // Hardware has no LEGACY outcome section, but it does have a
    // KLO list — so its card now carries outcomes (correcting the
    // previous stage's "areas + gated only" placement for it).
    expect(hardware.sections.filter(isLegacyOutcomeSection)).toEqual([]);
    expect(cardOutcomes(hardware.sections).map((s) => s.heading)).toEqual([
      "Key Learning Objectives:",
    ]);
    // SOC/CEH dashed headings are NOT the KLO list: they fall back
    // to their legacy outcome section.
    for (const slug of ["soc-analyst", "certified-ethical-hacker-ceh"]) {
      const model = buildCourseDetail(
        findLocalCourse(slug)!,
        courseDetails[slug],
        undefined,
      );
      expect(model.sections.filter(isKloSection)).toEqual([]);
      expect(cardOutcomes(model.sections).length).toBe(1);
      expect(cardOutcomes(model.sections).every(isLegacyOutcomeSection)).toBe(true);
    }
  });

  it("objectives appear exactly once: card renders card outcomes, About renders the rest", () => {
    // Template source: the syllabus card maps cardOutcomeSections
    // exactly once, and the About block maps aboutSections exactly
    // once — no second rendering of either group anywhere.
    expect(detail.match(/cardOutcomeSections\.map/g)?.length).toBe(1);
    expect(detail.match(/aboutSections\.map/g)?.length).toBe(1);
    // The card's map sits inside the syllabus section, before the
    // gated block; the About map sits after the syllabus section.
    const syllabusAt = detail.indexOf('id="syllabus"');
    const gatedAt = detail.indexOf("Full syllabus — shared after enquiry", syllabusAt);
    const cardMapAt = detail.indexOf("cardOutcomeSections.map", syllabusAt);
    const aboutMapAt = detail.indexOf("aboutSections.map", syllabusAt);
    expect(cardMapAt).toBeGreaterThan(syllabusAt);
    expect(cardMapAt).toBeLessThan(gatedAt);
    expect(aboutMapAt).toBeGreaterThan(gatedAt);
    // Model level: on every verified page, no KLO section survives
    // in About (it moved into the card).
    for (const c of courses) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      if (model.heldBack || model.sample) continue;
      const outcomes = cardOutcomes(model.sections);
      const about = model.sections.filter((s) => !outcomes.includes(s));
      expect(about.filter(isKloSection)).toEqual([]);
    }
  });

  it("breadcrumb is exactly Home / Trainings / Courses / title, no category level", () => {
    const crumbsStart = detail.indexOf("const crumbs = [");
    const crumbsEnd = detail.indexOf("];", crumbsStart);
    expect(crumbsStart).toBeGreaterThan(-1);
    expect(crumbsEnd).toBeGreaterThan(crumbsStart);
    const crumbs = detail.slice(crumbsStart, crumbsEnd);
    const names = ['"Home"', '"Trainings"', '"Courses"'];
    const namePositions = names.map((n) => crumbs.indexOf(n));
    for (const p of namePositions) expect(p).toBeGreaterThan(-1);
    expect(namePositions).toEqual([...namePositions].sort((a, b) => a - b));
    expect(crumbs).toContain('"/trainings/courses"');
    expect(crumbs).toContain("model.displayTitle");
    expect(crumbs).not.toContain("category");
    expect(detail).not.toContain("topicSlug");
    // Schema mirrors the same 4 levels.
    const schemaStart = detail.indexOf("breadcrumbSchema([");
    const schemaEnd = detail.indexOf("])}", schemaStart);
    expect(schemaStart).toBeGreaterThan(-1);
    expect(schemaEnd).toBeGreaterThan(schemaStart);
    const schema = detail.slice(schemaStart, schemaEnd);
    expect(schema).toContain('"/trainings/courses"');
    expect(schema).not.toContain("category");
  });

  it("vocabulary lock and scope: no Enroll/Register/Download, LP untouched, services gain nothing", () => {
    expect(detail).not.toContain(">Enroll<");
    expect(detail).not.toContain("Download syllabus");
    expect(detail).not.toMatch(/>\s*Register\s*</);
    expect(detail).toContain("About the Course");
    expect(detail).toContain("View Syllabus");
    expect(detail).toContain("Enquire Now");
    expect(detail).toContain("All Trainings");
    // LP pages keep their own pair and anchors, untouched.
    expect(lp).toContain("Enquire Now");
    expect(lp).toContain("View Syllabus");
    expect(lp).toContain('href="#leadform"');
    expect(lp).toContain('href="#syllabus"');
    // Service pages gain neither new button.
    expect(services).not.toContain("About the Course");
    expect(services).not.toContain("View Syllabus");
  });
});
