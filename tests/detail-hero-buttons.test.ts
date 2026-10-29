// Frontend 3.0 — detail-page hero buttons (LP hero pair, placed where
// suitable, owner-delegated Leo placement call).
//
// Pins, at model + template-source level (the repo has no
// component-rendering test setup, so rendered output is pinned by the
// live fetch in the checkpoint, as with demo-fill and LP rebuild):
//   1. every course detail page renders "Enquire Now" in the hero;
//   2. "View Syllabus" renders ONLY where a syllabus/areas section
//      actually renders — the hero button is wrapped in exactly the
//      same condition as the "What you will learn" topics list
//      (facts.topics non-empty), and its href "#syllabus" targets the
//      id added to that list, so a dead anchor cannot occur;
//   3. the held branch (no body renders at all on a held page) has no
//      View Syllabus; its Enquire Now keeps the existing /contact-us
//      destination, and the held wording is unchanged;
//   4. button text is exactly "Enquire Now" / "View Syllabus" — never
//      Enroll, Register, or "Download syllabus" (detailed syllabus is
//      gated, shared after enquiry, never an instant download);
//   5. LP pages keep their own pair untouched; service pages gain no
//      View Syllabus (no syllabus exists there); no content fact
//      or held-page semantic changes; no sample marker anywhere.
// NOTE (purge gates, 2026-10-29): placeholder data removed, so
// 28 of 36 detail pages take the held branch (25 catalogue-only
// + 3 held full courses) and only the 8 verified pages render
// the pair. The held branch is no longer a guard — it is the
// live presentation for held courses.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { courseDetails } from "../src/data/course-details";
import {
  PENDING_LABEL,
  buildCourseDetail,
  findLocalCourse,
} from "../src/lib/course-detail";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const detail = readSource("../src/app/trainings/[slug]/page.tsx");
const lp = readSource("../src/app/lp/[slug]/page.tsx");
const services = readSource("../src/app/services/[slug]/page.tsx");

// The held branch: from the ternary to its branch separator.
const heldSpan = (() => {
  const start = detail.indexOf("model.heldBack ?");
  const end = detail.indexOf(") : (", start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return detail.slice(start, end);
})();

describe("Detail hero buttons — placement", () => {
  it("covers all 36 courses; 0 held, 31 demo, 8 verified render topics", () => {
    expect(courses.length).toBe(36);
    let held = 0;
    let demo = 0;
    let withTopics = 0;
    for (const c of courses) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      if (model.heldBack) {
        held++;
        expect(model.facts).toBeNull();
      } else {
        if (model.demo) demo++;
        if ((model.facts?.topics?.length ?? 0) > 0) withTopics++;
      }
    }
    // Demo branch: no held pages remain; 31 demo pages (25 catalogue
    // + CCNA + CCNP + DM + Network+ + Security+ + Hardware); all 8
    // verified pages still render topics (5 published, 3 demo areas).
    expect(held).toBe(0);
    expect(demo).toBe(31);
    expect(withTopics).toBe(8);
  });

  it("hero carries Enquire Now on every detail page, to a real target", () => {
    expect(detail).toContain("Enquire Now");
    // Full pages: on-page enquiry panel. Held pages: the
    // existing /contact-us enquiry route, per the held branch.
    expect(detail).toContain('href="#enquire"');
    expect(detail).toContain('id="enquire"');
    expect(heldSpan).toContain("Enquire Now");
    expect(heldSpan).toContain('href="/contact-us"');
  });

  it("View Syllabus targets the grouped syllabus section on every full page", () => {
    // SUPERSEDED (syllabus-card stage): the grouped syllabus section
    // below always renders on a full page (its gated block is
    // unconditional), so View Syllabus is no longer wrapped in the
    // topics condition. The topics condition now governs only the
    // areas list INSIDE the grouped section.
    expect(detail).toContain('href="#syllabus"');
    expect(detail).toContain('id="syllabus"');
    // Exactly one "#syllabus" href (the hero button) and one
    // id="syllabus" (the grouped section) — the id itself carries no #.
    expect(detail.match(/#syllabus/g)?.length).toBe(1);
    expect(detail.match(/id="syllabus"/g)?.length).toBe(1);
    // The areas list inside the grouped section is still
    // topics-conditioned.
    expect(detail).toMatch(
      /model\.facts\?\.topics && model\.facts\.topics\.length > 0 && \([\s\S]{0,300}What you will learn/,
    );
  });

  it("held branch has no View Syllabus, no About, and keeps the held wording", () => {
    expect(heldSpan).not.toContain("View Syllabus");
    expect(heldSpan).not.toContain("#syllabus");
    expect(heldSpan).not.toContain("About the Course");
    expect(heldSpan).not.toContain("#about");
    expect(PENDING_LABEL).toBe("Course details to be confirmed");
    expect(heldSpan).toContain("PENDING_LABEL");
  });

  it("vocabulary lock: no Enroll, Register, or Download-syllabus button", () => {
    expect(detail).not.toContain(">Enroll<");
    expect(detail).not.toContain("Download syllabus");
    expect(detail).not.toMatch(/>\s*Register\s*</);
    expect(detail).toContain("Enquire Now");
    expect(detail).toContain("View Syllabus");
  });

  it("LP pages keep their own pair; service pages gain no View Syllabus", () => {
    expect(lp).toContain("Enquire Now");
    expect(lp).toContain("View Syllabus");
    expect(lp).toContain('href="#leadform"');
    expect(lp).toContain('href="#syllabus"');
    expect(services).not.toContain("View Syllabus");
    expect(services).not.toContain("#syllabus");
  });

  it("no sample marker renders in the hero", () => {
    expect(detail).not.toContain("SampleTag");
    expect(detail).not.toContain("DemoLegend");
    expect(detail).not.toContain("text-sample");
    expect(findLocalCourse("ccna-200-301")).toBeTruthy();
  });
});
