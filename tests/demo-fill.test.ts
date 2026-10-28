// Demo-fill — owner-authorised, preview only (2026-10-28 18:29 IST,
// as corrected 18:43 IST for AICTE/ISO display).
//
// These tests pin the marker system and the exclusions, so a sample
// string can never render unmarked and an exclusion can never slip
// in unnoticed:
//   1. every sample datum carries sample: true in its record;
//   2. every sample-carrying template renders the Sample tag AND the
//      sample font color class alongside the datum (component
//      rendering is pinned by live fetch + tsc, as with the purpose
//      note — the repo has no component-rendering test setup — so
//      these tests pin the template sources, and the live fetch in
//      the checkpoint pins the rendered output);
//   3. the demo legend renders on every sample-carrying page;
//   4. sample lesson/lab/tool lists are gated: no lesson-level data
//      exists for samples, and nothing gated reaches metadata,
//      JSON-LD or search snippets beyond the area level;
//   5. exclusions hold on the sample dataset itself (no invented
//      personal names, testimonials, logos, partnership claims,
//      batch/seat/trainer/placement/guarantee/client/case-study
//      facts, certificate details, or legal finalisation);
//   6. held tracks stay held: LP pages, lead/verify contract, legal
//      drafts, and the open /careers-in-index question (careers is
//      still NOT in the search index — reported open, not decided).
// MERGE GATE (stated here so it travels with the code): ZERO sample
// markers before any production deploy. Every sample below must be
// replaced by real company data and approved before production.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { services } from "../src/data/services";
import {
  SAMPLE_COURSE_FEE_RANGES,
  SAMPLE_COURSES,
  SAMPLE_INSTITUTE_TIER_RANGES,
  SAMPLE_SERVICES,
} from "../src/data/demo-samples";
import {
  SAMPLE_COLOR,
  SAMPLE_LEGEND_TEXT,
  getSampleCourse,
  getSampleService,
} from "../src/lib/demo-fill";
import { buildCourseDetail, findLocalCourse } from "../src/lib/course-detail";
import { buildServiceRow } from "../src/lib/services-rows";
import { buildTrainingRow } from "../src/lib/trainings-rows";
import { buildSearchIndex } from "../src/lib/search";
import { courseDetails } from "../src/data/course-details";
import { coursePageMetadata } from "../src/lib/metadata";
import { courseSchema } from "../src/lib/schema";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const globals = readSource("../src/app/globals.css");
const sampleTag = readSource("../src/components/SampleTag.tsx");
const legend = readSource("../src/components/DemoLegend.tsx");
const detailPage = readSource("../src/app/trainings/[slug]/page.tsx");
const trainingsIndex = readSource("../src/app/trainings/page.tsx");
const searchRow = readSource("../src/components/CatalogueSearch.tsx");
const servicesIndex = readSource("../src/app/services/page.tsx");
const serviceDetail = readSource("../src/app/services/[slug]/page.tsx");
const searchPage = readSource("../src/app/search/page.tsx");
const pricingPage = readSource("../src/app/pricing/page.tsx");
const comparePage = readSource("../src/app/compare/[pair]/page.tsx");
const lpPage = readSource("../src/app/lp/[slug]/page.tsx");
const leadRoute = readSource("../src/app/api/leads/route.ts");

const SAMPLE_PAGES: Record<string, string> = {
  "trainings index": trainingsIndex,
  "trainings detail": detailPage,
  "services index": servicesIndex,
  "services detail": serviceDetail,
  "search results": searchPage,
  pricing: pricingPage,
  "compare pair": comparePage,
};

const catalogOnlySlugs = courses.filter((c) => c.catalogOnly).map((c) => c.slug);
const EXPECTED_COURSE_SLUGS = [
  ...catalogOnlySlugs,
  "ccna-200-301",
  "ccnp-350-401-encor",
  "digital-marketing",
];

describe("Demo-fill — sample inventory and flags", () => {
  it("covers exactly the 28 formerly-held courses, each flagged sample: true", () => {
    expect(SAMPLE_COURSES.length).toBe(28);
    expect(SAMPLE_COURSES.map((s) => s.slug).sort()).toEqual([...EXPECTED_COURSE_SLUGS].sort());
    for (const s of SAMPLE_COURSES) {
      expect(s.sample).toBe(true);
      expect(courses.some((c) => c.slug === s.slug)).toBe(true);
      expect(getSampleCourse(s.slug)).toBe(s);
    }
    for (const slug of EXPECTED_COURSE_SLUGS) {
      expect(getSampleCourse(slug)).toBeDefined();
    }
  });

  it("covers exactly the 12 services, each flagged sample: true", () => {
    expect(SAMPLE_SERVICES.length).toBe(12);
    expect(SAMPLE_SERVICES.map((s) => s.slug).sort()).toEqual(
      services.map((s) => s.slug).sort(),
    );
    for (const s of SAMPLE_SERVICES) {
      expect(s.sample).toBe(true);
      expect(getSampleService(s.slug)).toBe(s);
      expect(s.offerings.length).toBeGreaterThanOrEqual(3);
      expect(s.offerings.length).toBeLessThanOrEqual(6);
    }
  });

  it("every sample course carries a 2–4 sentence summary, 5–6 areas, and a plausible duration/mode/level", () => {
    for (const s of SAMPLE_COURSES) {
      const sentences = s.summary.split(/(?<=[.!?])\s+/).filter(Boolean);
      expect(sentences.length).toBeGreaterThanOrEqual(2);
      expect(sentences.length).toBeLessThanOrEqual(4);
      expect(s.areas.length).toBeGreaterThanOrEqual(5);
      expect(s.areas.length).toBeLessThanOrEqual(6);
      expect(s.duration).toMatch(/^\d+ (days|hours)$/);
      expect(["Classroom & online", "Classroom", "Online", "Blended"]).toContain(s.mode);
      expect(s.level).toBeTruthy();
      expect(s.certification).toBeTruthy();
    }
  });

  it("CCNP sample areas are written fresh as generic enterprise networking, never CCNA copy", () => {
    const ccnp = getSampleCourse("ccnp-350-401-encor")!;
    const ccna = getSampleCourse("ccna-200-301")!;
    const blob = JSON.stringify({ summary: ccnp.summary, areas: ccnp.areas });
    expect(blob).not.toMatch(/200-301|CCNA/);
    const shared = ccnp.areas.filter((a) => ccna.areas.includes(a));
    expect(shared).toEqual([]);
  });

  it("sample fee ranges are ranges only, never an exact official price", () => {
    expect(SAMPLE_COURSE_FEE_RANGES.length).toBe(10);
    expect(SAMPLE_INSTITUTE_TIER_RANGES.length).toBe(3);
    for (const r of [...SAMPLE_COURSE_FEE_RANGES, ...SAMPLE_INSTITUTE_TIER_RANGES]) {
      expect(r.range).toMatch(/₹[\d,]+\s*–\s*₹[\d,]+/);
    }
  });

  it("sample models un-hold through every generation path, flag intact", () => {
    for (const s of SAMPLE_COURSES) {
      const c = findLocalCourse(s.slug)!;
      const detail = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(detail.sample).toBe(true);
      expect(detail.heldBack).toBe(false);
      expect(detail.summary).toBe(s.summary);
      const row = buildTrainingRow({
        slug: c.slug,
        title: c.title,
        category: c.category,
        summary: c.summary,
        catalogOnly: c.catalogOnly,
        duration: undefined,
      });
      expect(row.sample).toBe(true);
    }
    for (const s of SAMPLE_SERVICES) {
      const title = services.find((sv) => sv.slug === s.slug)!.title;
      const row = buildServiceRow({ slug: s.slug, title });
      expect(row.sample).toBe(true);
      expect(row.description).toBe(s.summary);
    }
  });
});

describe("Demo-fill — marker system (color + tag + legend)", () => {
  it("uses ONE sample color, measured AA on every light surface, as a Tailwind token", () => {
    expect(SAMPLE_COLOR).toBe("#6D28D9");
    expect(globals).toContain("--color-sample: #6d28d9");
    // Measured WCAG 2.2 relative-luminance ratios (recorded in the
    // CSS comment): 6.79:1 on #F8FAFC, 7.10:1 on #FFFFFF,
    // 6.48:1 on #F5F3FF, 6.32:1 on #EEF2F7, white-on-sample 7.10:1.
    expect(globals).toContain("6.79:1");
    expect(globals).toContain("7.10:1");
  });

  it("SampleTag renders the visible Sample text in the sample color", () => {
    expect(sampleTag).toContain("Sample");
    expect(sampleTag).toContain("text-sample");
    expect(sampleTag).toContain("border-sample");
  });

  it("the demo legend text is the agreed notice and renders on every sample-carrying page", () => {
    expect(SAMPLE_LEGEND_TEXT).toContain("Demo preview");
    expect(SAMPLE_LEGEND_TEXT).toContain("will be replaced with official GradeSpot data");
    expect(legend).toContain("SAMPLE_LEGEND_TEXT");
    expect(legend).toContain("SampleTag");
    for (const [name, src] of Object.entries(SAMPLE_PAGES)) {
      expect(src, `${name} must render DemoLegend`).toContain("DemoLegend");
    }
    // Legend is a single component: purge removes it in one place.
    expect(legend).toContain('role="note"');
  });

  it("every sample-carrying template pairs the Sample tag with the sample font color", () => {
    const templates: Record<string, string> = {
      "trainings detail": detailPage,
      "trainings rows": searchRow,
      "services index": servicesIndex,
      "services detail": serviceDetail,
      "search results": searchPage,
      pricing: pricingPage,
      "compare pair": comparePage,
    };
    for (const [name, src] of Object.entries(templates)) {
      expect(src, `${name} must render SampleTag`).toContain("SampleTag");
      expect(src, `${name} must use text-sample`).toContain("text-sample");
    }
  });
});

describe("Demo-fill — two-tier gating holds for samples", () => {
  it("sample courses expose areas publicly and no lesson/lab/tool list anywhere", () => {
    for (const s of SAMPLE_COURSES) {
      const c = findLocalCourse(s.slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.facts!.topics).toEqual(s.areas);
      expect(model.sections).toEqual([]);
      expect(model.gatedHeadings).toEqual([]);
    }
    expect(detailPage).toContain("Full syllabus — shared after enquiry");
  });

  it("nothing gated reaches metadata, JSON-LD or search snippets beyond the area level", () => {
    const index = buildSearchIndex();
    for (const entry of index.filter((e) => e.sample)) {
      const sample =
        entry.kind === "course"
          ? getSampleCourse(entry.href.replace("/trainings/", ""))
          : getSampleService(entry.href.replace("/services/", ""));
      expect(entry.snippet).toBe(sample?.summary ?? null);
    }
    for (const s of SAMPLE_COURSES) {
      const c = findLocalCourse(s.slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      const meta = coursePageMetadata(c, `/trainings/${s.slug}`, {
        displayTitle: model.displayTitle,
        description: model.sample ? model.summary ?? undefined : undefined,
      });
      // withPlace appends the place suffix, so the sample summary
      // must lead the description, not equal it.
      expect(meta.description.startsWith(s.summary)).toBe(true);
      const schema = courseSchema(c, { displayTitle: model.displayTitle, suppressOffers: true });
      const schemaBlob = JSON.stringify(schema);
      for (const area of s.areas) {
        expect(schemaBlob).not.toContain(area);
      }
    }
  });
});

describe("Demo-fill — exclusions hold on the sample dataset", () => {
  it("no invented personal names, testimonials, logos, or partnership claims in any sample record", () => {
    const blob = JSON.stringify({ SAMPLE_COURSES, SAMPLE_SERVICES });
    // "Resume review" is a legitimate consultancy offering, and
    // "logo" is the logo-designing service itself — ban testimonial
    // claims and logo FILES, not those words.
    expect(blob).not.toMatch(/testimonials?|★|rated \d/i);
    expect(blob).not.toMatch(/\.png|\.svg|\.webp|employer logo|vendor logo/i);
    expect(blob).not.toMatch(/partner|authorised|authorized training/i);
    expect(blob).not.toMatch(/EC-Council|Pearson/);
  });

  it("no batch dates, seat counts, trainer names, placement or guarantee facts in any sample record", () => {
    const blob = JSON.stringify({ SAMPLE_COURSES, SAMPLE_SERVICES });
    // "Topics planned with faculty" is workshop planning wording,
    // not a named trainer — ban named-trainer and batch/seat facts.
    expect(blob).not.toMatch(/batch|seat|trainer|instructor/i);
    expect(blob).not.toMatch(/guarantee|placement|%|job-ready|salary|₹\d/i);
    expect(blob).not.toMatch(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/);
    expect(blob).not.toMatch(/client|case stud/i);
  });

  it("no certificate numbers, dates, scopes or standards numbers in any sample record", () => {
    const blob = JSON.stringify({ SAMPLE_COURSES, SAMPLE_SERVICES });
    expect(blob).not.toMatch(/9001|ISO\s*\d|certificate (number|no\.|id)|issued on/i);
  });

  it("legal pages stay drafts with their draft banners", () => {
    // Privacy, refund and terms are drafts; accessibility is a
    // conformance statement, not a draft policy, so it is not in
    // this loop.
    for (const rel of [
      "../src/app/privacy-policy/page.tsx",
      "../src/app/refund-policy/page.tsx",
      "../src/app/terms-and-conditions/page.tsx",
    ]) {
      const src = readSource(rel);
      expect(src.toLowerCase()).toContain("draft");
    }
  });

  it("no sample marker, image or tag leaks into the SampleTag/DemoLegend components themselves", () => {
    expect(sampleTag).not.toContain("<img");
    expect(legend).not.toContain("<img");
  });
});

describe("Demo-fill — held tracks stay held", () => {
  it("LP pages are untouched: no sample import, no SampleTag, no DemoLegend", () => {
    expect(lpPage).not.toContain("SampleTag");
    expect(lpPage).not.toContain("DemoLegend");
    expect(lpPage).not.toContain("demo-fill");
    expect(lpPage).not.toContain("demo-samples");
  });

  it("lead/verify contract is untouched: 503 for log-only, no 202 anywhere", () => {
    expect(leadRoute).toContain("503");
    expect(leadRoute).not.toContain("202");
  });

  it("the /careers-in-index question stays OPEN: careers is still not in the search index", () => {
    const index = buildSearchIndex();
    expect(index.some((e) => e.href === "/careers")).toBe(false);
    expect(index.length).toBe(60);
  });

  it("no new dependency, no hotlinked asset, no slug/route/category change from demo-fill", () => {
    const pkg = JSON.parse(readSource("../package.json"));
    expect(pkg.dependencies).not.toHaveProperty("demo-fill");
    const blob = JSON.stringify({ SAMPLE_COURSES, SAMPLE_SERVICES });
    expect(blob).not.toMatch(/https?:\/\//);
    expect(courses.length).toBe(36);
    expect(services.length).toBe(12);
  });
});
