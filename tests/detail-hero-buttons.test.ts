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
//      View Syllabus (no syllabus exists there); no sample marker,
//      content fact, or held-page semantic changes.
// NOTE (verified from the model, 2026-10-28): demo-fill un-held every
// catalogue-only page with marked samples, so TODAY 0 of 36 detail
// pages take the held branch and all 36 render the pair. The held
// branch is a guard for any course that becomes held again — the
// placement table in the checkpoint states this, it is not a
// contradiction of the conditional rule.

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
  it("covers all 36 courses; today 0 are held and all 36 render topics", () => {
    expect(courses.length).toBe(36);
    let held = 0;
    let withTopics = 0;
    for (const c of courses) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      if (model.heldBack) {
        held++;
        expect(model.facts).toBeNull();
      } else {
        expect(model.facts?.topics?.length ?? 0).toBeGreaterThan(0);
        withTopics++;
      }
    }
    expect(held).toBe(0);
    expect(withTopics).toBe(36);
  });

  it("hero carries Enquire Now on every detail page, to a real target", () => {
    expect(detail).toContain("Enquire Now");
    // Full pages: on-page enquiry panel. Held pages (none today):
    // the existing /contact-us enquiry route, per the held branch.
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

  it("sample marking in the hero is untouched", () => {
    expect(detail).toContain("SampleTag");
    expect(findLocalCourse("ccna-200-301")).toBeTruthy();
  });
});
