// Curriculum gating — Stage 5 follow-up, owner-authorised two-tier
// policy: module AREAS public ("What you will learn", verbatim topic
// lists), lesson-level curriculum detail behind enquiry (shared
// off-site by the team after enquiry; no download promised, no gated
// paragraph rendered anywhere). These tests pin the model, the search
// index, metadata and schema. The enquiry-panel purpose note is pinned
// by live fetch (the repo has no component-rendering test setup) plus
// tsc for the prop wiring — see the checkpoint, stated plainly.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { courseDetails } from "../src/data/course-details";
import {
  buildCourseDetail,
  findLocalCourse,
} from "../src/lib/course-detail";
import { buildSearchIndex, searchEntries } from "../src/lib/search";
import { getSampleCourse } from "../src/lib/demo-fill";
import { courseSchema } from "../src/lib/schema";
import { coursePageMetadata } from "../src/lib/metadata";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const page = readSource("../src/app/trainings/[slug]/page.tsx");
const leadForm = readSource("../src/components/LeadForm.tsx");

const VERIFIED = [
  "azure-fundamentals-az-900",
  "azure-administrator-az-104",
  "comptia-network-plus",
  "comptia-pentest-plus",
  "comptia-security-plus",
  "computer-hardware-and-networking",
  "soc-analyst",
  "certified-ethical-hacker-ceh",
];

// Headings moved behind the gate per verified course. Hardware has
// none: its "Course Curriculum" is AZ-104 copy verbatim, so it is
// skipped as misattributed, never gated as Hardware's syllabus.
// Network+/Security+ have none: their curriculum fragments stay
// suppressed under R6 (nothing substantive to gate).
const GATED_HEADINGS: Record<string, string[]> = {
  "azure-fundamentals-az-900": ["Course Curriculum"],
  "azure-administrator-az-104": ["Course Curriculum"],
  "comptia-network-plus": [],
  "comptia-pentest-plus": ["Course Curriculum"],
  "comptia-security-plus": [],
  "computer-hardware-and-networking": [],
  "soc-analyst": ["Our Curriculum"],
  "certified-ethical-hacker-ceh": ["Certified Ethical Hacker v13", "Tools Covered"],
};

// Distinctive curriculum-only strings: present in curriculum sections
// (and nowhere in summaries, titles or categories). If any of these
// ever surfaces in a public surface, the gate has leaked.
const CURRICULUM_ONLY_STRINGS = [
  "Describe the shared responsibility model",
  "Lab: Discovering IoT devices with Shodan",
  "Describe infrastructure as a service (IaaS)",
];

describe("curriculum gating — model", () => {
  it("keeps area lists public and verbatim for all 8 verified courses", () => {
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.heldBack).toBe(false);
      const expected = courseDetails[slug].topics.filter(
        (t) => !/job-ready/i.test(t),
      );
      expect(model.facts!.topics).toEqual(expected);
    }
  });

  it("moves exactly the gated headings out of public sections", () => {
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.gatedHeadings).toEqual(GATED_HEADINGS[slug]);
      for (const h of GATED_HEADINGS[slug]) {
        expect(model.sections.some((s) => s.heading === h)).toBe(false);
      }
    }
  });

  it("excludes Hardware's misattributed curriculum from public AND gated layers", () => {
    const hw = findLocalCourse("computer-hardware-and-networking")!;
    const model = buildCourseDetail(hw, courseDetails[hw.slug], undefined);
    expect(model.sections.some((s) => s.heading === "Course Curriculum")).toBe(false);
    expect(model.gatedHeadings).not.toContain("Course Curriculum");
    const skipped = model.skippedSections.find(
      (s) => s.heading === "Course Curriculum",
    );
    expect(skipped).toBeTruthy();
    expect(skipped!.reason).toMatch(/misattributed/);
  });

  it("leaves held pages unchanged: no areas, no sections, no gated block", () => {
    for (const c of courses) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      if (!model.heldBack) continue;
      expect(model.facts).toBeNull();
      expect(model.sections).toEqual([]);
      expect(model.gatedHeadings).toEqual([]);
    }
  });

  it("keeps SOC neutralised under gating", () => {
    const soc = findLocalCourse("soc-analyst")!;
    const model = buildCourseDetail(soc, courseDetails[soc.slug], undefined);
    expect(model.displayTitle).toBe("SOC Analyst Training in Hyderabad");
    expect(model.facts!.topics!.some((t) => /job-ready/i.test(t))).toBe(false);
  });
});

describe("curriculum gating — page, search, metadata, schema", () => {
  it("renders the gated block and purpose note, and no download promise, in live code", () => {
    const code = page.replace(/^\s*\/\/.*$/gm, "");
    expect(code).toContain("Full syllabus — shared after enquiry");
    expect(code).toContain("Enquire for the Full Syllabus");
    expect(code).toContain('href="#enquire"');
    expect(code).toContain("What you will learn");
    expect(code).toContain(
      "Share your details and the team will send the full syllabus via WhatsApp or mail.",
    );
    expect(code).not.toMatch(/download/i);
    expect(code).not.toMatch(/instant/i);
    expect(leadForm).toContain("purposeNote");
  });

  it("keeps gated detail out of the search index", () => {
    const index = buildSearchIndex();
    for (const token of ["iaas", "shodan"]) {
      expect(searchEntries(index, token)).toEqual([]);
    }
    for (const entry of index) {
      if (entry.kind !== "course") continue;
      const course = courses.find((c) => `/trainings/${c.slug}` === entry.href)!;
      // Snippet is one of: null (no held course remains), the verified
      // repo summary, or the marked sample summary — never a gated
      // lesson/lab/tool list.
      const sample = getSampleCourse(course.slug);
      expect(
        entry.snippet === null ||
          entry.snippet === course.summary ||
          (sample !== undefined && entry.snippet === sample.summary),
      ).toBe(true);
      const hay = JSON.stringify(entry).toLowerCase();
      for (const s of CURRICULUM_ONLY_STRINGS) {
        expect(hay).not.toContain(s.toLowerCase());
      }
    }
  });

  it("keeps gated detail out of metadata and JSON-LD", () => {
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      const meta = coursePageMetadata(c, `/trainings/${slug}`, {
        displayTitle: model.displayTitle,
      });
      const schema = courseSchema(c, {
        displayTitle: model.displayTitle,
        suppressOffers: true,
      });
      const blob = JSON.stringify(meta) + JSON.stringify(schema);
      for (const s of CURRICULUM_ONLY_STRINGS) {
        expect(blob).not.toContain(s);
      }
    }
  });
});
