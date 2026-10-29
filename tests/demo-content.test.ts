// Demo content — PREVIEW BRANCH ONLY (feat/demo-content-gaps).
//
// These tests pin the demo contract for the content gaps (owner demo
// order 2026-10-29): every demo-filled page renders a visible Demo
// marker + legend, no demo content renders without the marker, demo
// copy carries no outcome promises and no fee figures, CCNP is a
// partial page with zero CCNA-derived content, Network+/Security+
// carry no curriculum section, Hardware carries no AZ-104 curriculum,
// SOC is untouched, and the pricing page stays enquiry-only. This
// branch must NEVER merge as-is: official inputs replace demo content
// page by page, and each replacement removes that page's demo marker.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { courseDetails } from "../src/data/course-details";
import { services } from "../src/data/services";
import {
  DEMO_CCNP_NOTICE,
  DEMO_CCNP_SUMMARY,
  DEMO_COURSE_CONTENT,
  DEMO_COURSE_SLUGS,
  DEMO_CURRICULUM_NOTE,
  DEMO_SERVICE_CONTENT,
  DEMO_SERVICE_SLUGS,
  DEMO_TIER_DESCRIPTIONS,
  isDemoCourseSlug,
  isDemoServiceSlug,
} from "../src/data/demo-content";
import { buildCourseDetail, findLocalCourse } from "../src/lib/course-detail";
import { buildTrainingRow } from "../src/lib/trainings-rows";
import { buildServiceRow } from "../src/lib/services-rows";
import { buildSearchIndex } from "../src/lib/search";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const demoSource = readSource("../src/data/demo-content.ts");
const detailPage = readSource("../src/app/trainings/[slug]/page.tsx");
const categoryPage = readSource(
  "../src/app/trainings/category/[slug]/page.tsx",
);
const servicesPage = readSource("../src/app/services/page.tsx");
const serviceDetailPage = readSource("../src/app/services/[slug]/page.tsx");
const searchPage = readSource("../src/app/search/page.tsx");
const pricingPage = readSource("../src/app/pricing/page.tsx");

const DEMO_COURSE_SET = new Set(DEMO_COURSE_SLUGS);
const DEMO_SERVICE_SET = new Set(DEMO_SERVICE_SLUGS);

describe("demo content — inventory", () => {
  it("covers all 25 catalogue-only courses + CCNA + DM + CCNP + Network+ + Security+ + Hardware", () => {
    const catalogOnly = courses.filter((c) => c.catalogOnly).map((c) => c.slug);
    expect(catalogOnly.length).toBe(25);
    for (const slug of catalogOnly) {
      expect(DEMO_COURSE_SET.has(slug)).toBe(true);
    }
    for (const slug of [
      "ccna-200-301",
      "digital-marketing",
      "ccnp-350-401-encor",
      "comptia-network-plus",
      "comptia-security-plus",
      "computer-hardware-and-networking",
    ]) {
      expect(DEMO_COURSE_SET.has(slug)).toBe(true);
    }
    expect(DEMO_COURSE_SLUGS.size).toBe(31);
    expect(DEMO_SERVICE_SLUGS.size).toBe(12);
    expect(services.map((s) => s.slug).sort()).toEqual(
      [...DEMO_SERVICE_SLUGS].sort(),
    );
  });

  it("every demo course model is flagged demo with a non-empty summary", () => {
    for (const slug of DEMO_COURSE_SLUGS) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.demo).toBe(true);
      expect(model.heldBack).toBe(false);
      expect(model.summary).toBeTruthy();
      if (slug === "ccnp-350-401-encor") {
        expect(model.demoPartial).toBe(true);
        expect(model.sections).toEqual([]);
        expect(model.durationLabel).toBeNull();
      } else {
        expect(model.demoPartial).toBe(false);
        expect(model.sections.length).toBeGreaterThan(0);
      }
    }
  });

  it("every demo service row is flagged demo with scope fields present", () => {
    for (const slug of DEMO_SERVICE_SLUGS) {
      const row = buildServiceRow({ slug, title: slug });
      expect(row.demo).toBe(true);
      expect(row.heldBack).toBe(false);
      const demo = DEMO_SERVICE_CONTENT[slug]!;
      expect(demo.summary).toBeTruthy();
      expect(demo.scope.length).toBeGreaterThan(0);
      expect(demo.deliverables.length).toBeGreaterThan(0);
      expect(demo.exclusions.length).toBeGreaterThan(0);
      expect(demo.engagement).toBeTruthy();
      expect(demo.consultation).toBeTruthy();
      expect(row.description).toBe(demo.summary);
    }
  });

  it("demo duration rules: CCNA demo-marked, Network+/Security+ enquiry-only, DM unpublished", () => {
    const ccna = buildCourseDetail(
      findLocalCourse("ccna-200-301")!,
      courseDetails["ccna-200-301"],
      undefined,
    );
    expect(ccna.durationLabel).toBe("Duration (demo): 8 weeks");
    for (const slug of ["comptia-network-plus", "comptia-security-plus"]) {
      const model = buildCourseDetail(
        findLocalCourse(slug)!,
        courseDetails[slug],
        undefined,
      );
      expect(model.durationLabel).toBe("Duration confirmed on enquiry");
    }
    const dm = buildCourseDetail(
      findLocalCourse("digital-marketing")!,
      courseDetails["digital-marketing"],
      undefined,
    );
    // The repo's unapproved "45 days" is deliberately never surfaced.
    expect(dm.durationLabel).toBe("Duration not yet published");
  });
});

describe("demo content — CCNP partial shape (Das)", () => {
  it("CCNP is title + track identity + demo description + under-review notice + enquiry CTA, nothing else", () => {
    const ccnp = buildCourseDetail(
      findLocalCourse("ccnp-350-401-encor")!,
      courseDetails["ccnp-350-401-encor"],
      undefined,
    );
    expect(ccnp.demoPartial).toBe(true);
    expect(ccnp.summary).toBe(DEMO_CCNP_SUMMARY);
    expect(ccnp.summary).toMatch(/350-401 ENCOR/);
    expect(DEMO_CCNP_NOTICE).toMatch(/Detailed syllabus under review/);
    // Zero CCNA-derived content: no CCNA string anywhere in the
    // partial page's summary or sections, and no sections at all.
    expect(ccnp.summary).not.toMatch(/CCNA/i);
    expect(JSON.stringify(ccnp.sections)).not.toMatch(/CCNA/i);
    expect(ccnp.sections).toEqual([]);
    // The detail template gates the syllabus section, facts, About,
    // compare, and hero Syllabus button behind !demoPartial.
    expect(detailPage).toMatch(/!model\.demoPartial && \(/);
    expect(detailPage).toContain("DEMO_CCNP_NOTICE");
  });

  it("CCNP search and training rows carry the demo summary, never CCNA copy", () => {
    const row = buildTrainingRow({
      slug: "ccnp-350-401-encor",
      title: "CCNP Enterprise Training in Hyderabad",
      category: "cisco",
      summary: "",
      catalogOnly: false,
    });
    expect(row.demo).toBe(true);
    expect(row.description).toBe(DEMO_CCNP_SUMMARY);
    expect(row.description).not.toMatch(/CCNA/i);
    const index = buildSearchIndex();
    const entry = index.find(
      (e) => e.href === "/trainings/ccnp-350-401-encor",
    )!;
    expect(entry.demo).toBe(true);
    expect(entry.snippet).toBe(DEMO_CCNP_SUMMARY);
    expect(entry.snippet).not.toMatch(/CCNA/i);
  });
});

describe("demo content — curriculum-gap pages", () => {
  it("Network+ and Security+ carry no curriculum section, only the demo curriculum-status note", () => {
    for (const slug of ["comptia-network-plus", "comptia-security-plus"]) {
      const model = buildCourseDetail(
        findLocalCourse(slug)!,
        courseDetails[slug],
        undefined,
      );
      expect(model.demo).toBe(true);
      for (const s of model.sections) {
        expect(s.heading).not.toBe("Course Curriculum");
        expect(s.heading).not.toBe("Our Curriculum");
      }
      expect(
        model.sections.some((s) => s.heading === DEMO_CURRICULUM_NOTE.heading),
      ).toBe(true);
    }
  });

  it("Hardware carries demo module areas only — no curriculum heading, no AZ-104/Azure content", () => {
    const model = buildCourseDetail(
      findLocalCourse("computer-hardware-and-networking")!,
      courseDetails["computer-hardware-and-networking"],
      undefined,
    );
    expect(model.demo).toBe(true);
    const blob = JSON.stringify(model.sections);
    expect(model.sections.some((s) => s.heading === "Course Curriculum")).toBe(
      false,
    );
    expect(blob).not.toMatch(/AZ-104|Azure Administrator/i);
    expect(model.facts!.topics).toEqual(
      DEMO_COURSE_CONTENT["computer-hardware-and-networking"]?.topics,
    );
    // The misattributed published curriculum stays recorded as skipped.
    const skipped = model.skippedSections.find(
      (s) => s.heading === "Course Curriculum",
    );
    expect(skipped).toBeTruthy();
    expect(skipped!.reason).toMatch(/misattributed/);
  });
});

describe("demo content — SOC untouched", () => {
  it("SOC is not a demo slug and its model is unchanged", () => {
    expect(isDemoCourseSlug("soc-analyst")).toBe(false);
    expect(isDemoServiceSlug("soc-analyst")).toBe(false);
    const soc = buildCourseDetail(
      findLocalCourse("soc-analyst")!,
      courseDetails["soc-analyst"],
      undefined,
    );
    expect(soc.demo).toBe(false);
    expect(soc.heldBack).toBe(false);
    expect(soc.summary).toBe(
      courses.find((c) => c.slug === "soc-analyst")!.summary,
    );
    expect(soc.sections.length).toBeGreaterThan(0);
    expect(JSON.stringify(soc)).not.toMatch(/90 Days|Job-Ready/i);
  });
});

describe("demo content — markers on every demo-filled surface", () => {
  it("detail page renders badge + legend under the demo condition only", () => {
    expect(detailPage).toContain("DemoBadge");
    expect(detailPage).toContain("DemoNote");
    expect(detailPage).toMatch(/model\.demo && \([\s\S]{0,200}DemoBadge/);
    expect(detailPage).toMatch(/model\.demo && \([\s\S]{0,400}DemoNote/);
  });

  it("category page renders legend above the board and badges on demo rows", () => {
    expect(categoryPage).toContain("DemoBadge");
    expect(categoryPage).toContain("DemoNote");
    expect(categoryPage).toMatch(/row\.demo/);
  });

  it("services pages render legend + badges for demo rows and demo detail scope", () => {
    expect(servicesPage).toContain("DemoBadge");
    expect(servicesPage).toContain("DemoNote");
    expect(servicesPage).toMatch(/row\.demo/);
    expect(serviceDetailPage).toContain("DemoBadge");
    expect(serviceDetailPage).toContain("DemoNote");
    expect(serviceDetailPage).toContain("isDemoServiceSlug");
    expect(serviceDetailPage).toContain("DEMO_SERVICE_CONTENT");
  });

  it("search results render badges on demo entries", () => {
    expect(searchPage).toContain("DemoBadge");
    expect(searchPage).toMatch(/entry\.demo/);
  });

  it("pricing page renders badge + legend for demo tier descriptions", () => {
    expect(pricingPage).toContain("DemoBadge");
    expect(pricingPage).toContain("DemoNote");
    expect(pricingPage).toContain("DEMO_TIER_DESCRIPTIONS");
  });

  it("the marker component renders a visible Demo badge and the legend text", () => {
    const marker = readSource("../src/components/DemoMarker.tsx");
    expect(marker).toContain("DemoBadge");
    expect(marker).toContain("DemoNote");
    expect(marker).toContain("data-demo-marker");
    expect(marker).toContain("data-demo-note");
    expect(marker).toContain("Demo content: this page shows placeholder demo copy");
    expect(marker).toContain("replaced page by page from official");
    expect(marker).toContain("GradeSpot inputs");
  });

  it("demo metadata and schema never carry demo copy (held text instead)", () => {
    expect(detailPage).toMatch(
      /held: model\.heldBack \|\| model\.demo/,
    );
  });
});

describe("demo content — language and honesty audits", () => {
  it("no outcome-promise wording anywhere in demo copy", () => {
    expect(demoSource).not.toMatch(/guarantee/i);
    expect(demoSource).not.toMatch(/100%\s*(placement|pass)/i);
    expect(demoSource).not.toMatch(/pass rate/i);
    expect(demoSource).not.toMatch(/salary/i);
    expect(demoSource).not.toMatch(/assured (job|placement)/i);
    expect(demoSource).not.toMatch(/placement (guarantee|assured)/i);
  });

  it("no fee figures anywhere in demo copy", () => {
    expect(demoSource).not.toMatch(/₹/);
    expect(demoSource).not.toMatch(/Rs\.\s*[0-9]/);
    expect(demoSource).not.toMatch(/INR\s*[0-9]/);
  });

  it("no trainer names, no invented GradeSpot-specific facts in demo copy", () => {
    // Demo copy names no individual and no batch, schedule, fee,
    // student-count, or partner claim: the only location mentions
    // are the already-public Dilsukhnagar/Hyderabad.
    expect(demoSource).not.toMatch(/batch (starts|starting|schedule)/i);
    expect(demoSource).not.toMatch(/students enrolled/i);
    expect(demoSource).not.toMatch(/partnered with/i);
  });

  it("certification demo summaries use prepares-for wording", () => {
    for (const slug of [
      "azure-security-engineer-az-500",
      "microsoft-devops-az-400",
      "sc-900",
      "sc-200",
      "aws-cloud-practitioner",
      "aws-solutions-architect-associate",
      "aws-devops-engineer",
      "comptia-a-plus-core-1",
      "comptia-a-plus-core-2",
    ]) {
      expect(DEMO_COURSE_CONTENT[slug]?.summary).toMatch(
        /prepares for/i,
      );
    }
  });

  it("pricing tier descriptions exist, carry no amounts, and the page stays enquiry-only", () => {
    expect(Object.keys(DEMO_TIER_DESCRIPTIONS).length).toBeGreaterThan(0);
    for (const desc of Object.values(DEMO_TIER_DESCRIPTIONS)) {
      expect(desc).toBeTruthy();
      expect(desc).not.toMatch(/₹|Rs\.\s*[0-9]|INR\s*[0-9]/);
    }
    expect(pricingPage).toContain("confirmed on enquiry");
    expect(pricingPage).not.toContain('href="/pricing"');
  });
});
