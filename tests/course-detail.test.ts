// Frontend 3.0 — Stage 5 course-detail template tests.
//
// These tests pin the Stage 5 contract: 28 held detail pages render
// title + held notice + Enquire only; 8 verified pages render repo
// sections verbatim minus the skipped categories; no price, no demo
// promise, no Register seat promise, no LogoWall/stats, no unmatched
// testimonial, no unapproved FAQ schema, SOC neutralised, and no
// slug/route change. They read the model and the page source, so a
// regression that reintroduces a dropped surface fails here.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { courseDetails } from "../src/data/course-details";
import {
  ENQUIRE_LABEL,
  PENDING_LABEL,
  buildCourseDetail,
  filterDetailSections,
  findLocalCourse,
} from "../src/lib/course-detail";
import { courseFaqs, courseSchema } from "../src/lib/schema";
import { coursePageMetadata } from "../src/lib/metadata";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const page = readSource("../src/app/trainings/[slug]/page.tsx");

const HELD_FULL = ["ccna-200-301", "ccnp-350-401-encor", "digital-marketing"];
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

describe("Stage 5 detail — inventory and dispositions", () => {
  it("covers all 36 courses: 28 held, 8 verified", () => {
    expect(courses.length).toBe(36);
    const held = courses.filter(
      (c) => c.catalogOnly || HELD_FULL.includes(c.slug),
    );
    expect(held.length).toBe(28);
    const verified = courses.filter((c) => VERIFIED.includes(c.slug));
    expect(verified.length).toBe(8);
    expect(new Set([...held.map((c) => c.slug), ...VERIFIED]).size).toBe(36);
  });

  it("renders formerly-held pages as held pages: title + held notice only, no invented data", () => {
    for (const c of courses) {
      if (!(c.catalogOnly || HELD_FULL.includes(c.slug))) continue;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.heldBack).toBe(true);
      expect(model.summary).toBeNull();
      expect(model.durationLabel).toBeNull();
      expect(model.facts).toBeNull();
      expect(model.sections).toEqual([]);
      expect("sample" in model).toBe(false);
    }
  });

  it("never renders CCNA content as CCNP content", () => {
    const ccnp = findLocalCourse("ccnp-350-401-encor")!;
    const model = buildCourseDetail(ccnp, courseDetails[ccnp.slug], undefined);
    // Held pages carry no body content at all, so no CCNA trace
    // can surface: no summary, no facts, no sections.
    expect(model.heldBack).toBe(true);
    expect(model.summary).toBeNull();
    expect(model.facts).toBeNull();
    expect(model.sections).toEqual([]);
  });

  it("renders verified pages with summaries and duration rules", () => {
    const expectations: Record<string, string> = {
      "azure-fundamentals-az-900": "Duration confirmed on enquiry",
      "azure-administrator-az-104": "Duration confirmed on enquiry",
      "computer-hardware-and-networking": "Duration confirmed on enquiry",
      "comptia-network-plus": "Duration: 30 days",
      "comptia-pentest-plus": "Duration: 60 hours",
      "comptia-security-plus": "Duration: 30 days",
      "soc-analyst": "Duration confirmed on enquiry", // Stage 5 neutralisation 2026-10-28: unverified 90 days removed
      "certified-ethical-hacker-ceh": "Duration: 45 days",
    };
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.heldBack).toBe(false);
      expect(model.summary).toBeTruthy();
      expect(model.summary).not.toMatch(/…\s*$/);
      expect(model.durationLabel).toBe(expectations[slug]);
      expect(model.facts).toBeTruthy();
    }
  });

  it("keeps Network+ and Security+ curriculum sections suppressed (R6) while their area lists stay public", () => {
    // Curriculum-gating follow-up: R6 was always about the curriculum
    // SECTION (a 1-line DHCP fragment / a 5-line fragment), never
    // about the area lists in course-details.ts. Under the two-tier
    // policy the areas stay public ("What you will learn") and the
    // fragmentary sections stay suppressed — nothing substantive to
    // gate, and the full syllabus is supplied off-site after enquiry.
    for (const slug of ["comptia-network-plus", "comptia-security-plus"]) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.facts!.topics!.length).toBeGreaterThan(0);
      expect(
        model.sections.some((s) => s.heading === "Course Curriculum"),
      ).toBe(false);
      expect(
        model.skippedSections.some((s) => s.heading === "Course Curriculum"),
      ).toBe(true);
      expect(model.gatedHeadings).toEqual([]);
    }
    const ceh = findLocalCourse("certified-ethical-hacker-ceh")!;
    const cehModel = buildCourseDetail(ceh, courseDetails[ceh.slug], undefined);
    expect(cehModel.facts!.topics!.length).toBeGreaterThan(0);
  });

  it("neutralises SOC and suppresses its job-ready topic", () => {
    const soc = findLocalCourse("soc-analyst")!;
    const model = buildCourseDetail(soc, courseDetails[soc.slug], undefined);
    expect(model.displayTitle).toBe("SOC Analyst Training in Hyderabad");
    expect(model.displayTitle).not.toMatch(/job-ready/i);
    expect(model.jobReadyTopicsSuppressed).toBe(true);
    expect(model.facts!.topics!.some((t) => /job-ready/i.test(t))).toBe(false);
  });

  it("skips employer claims, unmatched testimonials, offer and enrol sections", () => {
    const az900 = findLocalCourse("azure-fundamentals-az-900")!;
    const { skipped } = filterDetailSections(az900);
    expect(skipped.some((s) => s.heading.startsWith("Our Students works for"))).toBe(true);
    const soc = findLocalCourse("soc-analyst")!;
    const socSkipped = filterDetailSections(soc).skipped;
    expect(socSkipped.some((s) => s.heading === "What Our Learners Say")).toBe(true);
    expect(socSkipped.some((s) => s.heading === "Visit our Blog")).toBe(true);
    const az104 = findLocalCourse("azure-administrator-az-104")!;
    const az104Skipped = filterDetailSections(az104).skipped;
    expect(az104Skipped.some((s) => /voucher/i.test(s.heading))).toBe(true);
    expect(az104Skipped.some((s) => /^Enroll in /i.test(s.heading))).toBe(true);
    const hw = findLocalCourse("computer-hardware-and-networking")!;
    const hwSkipped = filterDetailSections(hw).skipped;
    expect(hwSkipped.some((s) => s.heading === "Common Job Roles for Ethical Hacking")).toBe(true);
    expect(hwSkipped.some((s) => s.heading === "Skills To Measure In CCNA 200-301")).toBe(true);
  });

  it("keeps no pricing section in any verified page", () => {
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.sections.some((s) => s.style === "pricing")).toBe(false);
      expect(model.sections.some((s) => s.heading === "Our Pricing")).toBe(false);
    }
  });
});

describe("Stage 5 detail — schema, metadata and removed surfaces", () => {
  it("emits no Offer and no instance/credential for held pages", () => {
    const ccnp = findLocalCourse("ccnp-350-401-encor")!;
    const schema = courseSchema(ccnp, { held: true, suppressOffers: true }) as Record<
      string,
      unknown
    >;
    expect(schema.offers).toBeUndefined();
    expect(schema.hasCourseInstance).toBeUndefined();
    expect(schema.educationalCredentialAwarded).toBeUndefined();
  });

  it("emits no Offer for verified pages and a neutral SOC name", () => {
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      const schema = courseSchema(c, { suppressOffers: true }) as Record<string, unknown>;
      expect(schema.offers).toBeUndefined();
    }
    const soc = findLocalCourse("soc-analyst")!;
    const socSchema = courseSchema(soc, {
      displayTitle: "SOC Analyst Training in Hyderabad",
      suppressOffers: true,
    }) as Record<string, unknown>;
    expect(socSchema.name).toBe("SOC Analyst Training in Hyderabad");
  });

  it("emits no FAQPage schema from unapproved FAQs", () => {
    for (const slug of VERIFIED) {
      const c = findLocalCourse(slug)!;
      expect(courseFaqs(c)).toEqual([]);
    }
  });

  it("publishes neutral metadata for held pages and SOC", () => {
    const ccna = findLocalCourse("ccna-200-301")!;
    const meta = coursePageMetadata(ccna, "/trainings/ccna-200-301", { held: true });
    expect(meta.description).toContain("confirmed on enquiry");
    expect(meta.description).not.toContain("excel in the");
    const soc = findLocalCourse("soc-analyst")!;
    const socMeta = coursePageMetadata(soc, "/trainings/soc-analyst", {
      displayTitle: "SOC Analyst Training in Hyderabad",
    });
    expect(socMeta.title).toBe("SOC Analyst Training in Hyderabad");
    expect(socMeta.title).not.toMatch(/job-ready/i);
  });

  it("contains none of the removed surfaces or promises", () => {
    // Strip line comments: the page header documents the removals in
    // prose, so the check must cover live code, not documentation.
    const code = page.replace(/^\s*\/\/.*$/gm, "");
    for (const forbidden of [
      "DemoBand",
      "RegisterStrip",
      "B2BStrip",
      "LogoWall",
      "StatsRibbon",
      "FeatureTrio",
      "EnquiryRail",
      "generatedCourseFaqs",
      "AnswerLead",
      "courseAnswerSummary",
      "Register for This Course",
      "Book a Free Demo",
      "Ready to enrol?",
      "next/image",
      "from \"@/lib/data\"",
      "getCourse",
    ]) {
      expect(code).not.toContain(forbidden);
    }
    expect(page).toContain("✉️</span> Enquire");
    expect(page).toContain("PENDING_LABEL");
  });

  it("keeps slugs, routes and categories unchanged", () => {
    expect(ENQUIRE_LABEL).toBe("Enquire About This Course");
    expect(PENDING_LABEL).toBe("Course details to be confirmed");
    expect(page).toContain("localCourses.map((c) => ({ slug: c.slug }))");
    for (const c of courses) {
      expect(findLocalCourse(c.slug)?.category).toBe(c.category);
    }
  });
});
