// Frontend 3.0 — Stage 8 remaining public-page template tests.
//
// These tests pin the Stage 8 contract: every remaining old-v1 page
// body is re-templated in the Stage 3/4/5 text-first language, with
// the forbidden surfaces removed from the page code (checked on
// IMPORT lines, so explanatory comments cannot trip them), held
// content held, no price figure, no demo/seat promise, no unapproved
// FAQ schema, no DB-first data source in the re-templated pages, and
// /careers rebuilt from spec as expression-of-interest only. They read
// page source, so a regression that reintroduces a dropped surface
// fails here.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const PAGES = [
  "about-us",
  "accessibility",
  "blog",
  "blog/[slug]",
  "career-support",
  "careers",
  "certificate-verification",
  "compare",
  "compare/[pair]",
  "contact-us",
  "corporate-and-international",
  "faq",
  "for-colleges",
  "for-institutes",
  "partner-with-us",
  "pricing",
  "privacy-policy",
  "refund-policy",
  "register",
  "resources",
  "student-certifications",
  "team-members",
  "team-members/nikhil-duth-d",
  "terms-and-conditions",
  "testimonials",
  "training-institute-in-dilsukhnagar-hyderabad",
  "why-choose-us",
];

const sources: Record<string, string> = Object.fromEntries(
  PAGES.map((p) => [p, readSource(`../src/app/${p}/page.tsx`)]),
);

function stripComments(src: string): string {
  return src.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
}

function importLines(src: string): string {
  return src
    .split("\n")
    .filter((l) => l.trim().startsWith("import "))
    .join("\n");
}

const FORBIDDEN_IMPORTS = [
  "LogoWall",
  "StatsRibbon",
  "FeatureTrio",
  "OfferCards",
  "CourseCard",
  "BlogCards",
  "ExperienceBadge",
  "CredentialCard",
  "SignatureBlock",
  "DemoBand",
  "EnquiryRail",
];

describe("Stage 8 page inventory", () => {
  it("every in-scope page file exists and renders a page", () => {
    for (const p of PAGES) {
      expect(sources[p].length).toBeGreaterThan(200);
      expect(sources[p]).toContain("export default");
    }
  });

  it("no in-scope page imports a forbidden surface component", () => {
    for (const p of PAGES) {
      const imports = importLines(sources[p]);
      for (const name of FORBIDDEN_IMPORTS) {
        expect(imports).not.toContain(name);
      }
    }
  });

  it("no in-scope page emits FAQPage schema or reads DB-first course/service data", () => {
    for (const p of PAGES) {
      const imports = importLines(sources[p]);
      expect(imports).not.toContain("faqSchema");
      expect(imports).not.toContain("getCourse");
      expect(imports).not.toContain("getServices");
    }
  });

  it("no in-scope page renders a price figure", () => {
    for (const p of PAGES) {
      // Strip comments: the held-notice explanations name the figures
      // they refuse to render, which must not trip this test.
      expect(stripComments(sources[p])).not.toMatch(/₹/);
    }
  });
});

describe("Stage 8 held content", () => {
  it("about page holds ISO/AICTE cards, the wall, stats and the 1,500+ paragraph", () => {
    const s = sources["about-us"];
    expect(s).toContain("Accreditation");
    expect(s).toContain("confirmed on enquiry");
    expect(s).toContain("slice(6, 13)");
    expect(s).not.toContain("1,500+ happy learners who");
  });

  it("career support shows roles only for verified courses and services title-only", () => {
    const s = sources["career-support"];
    expect(s).toContain("buildCourseDetail");
    expect(s).toContain("heldBack");
    expect(s).toContain("Service details to be confirmed");
    expect(stripComments(s)).not.toContain("testimonials");
  });

  it("compare pair holds the held side and never renders fees", () => {
    const s = sources["compare/[pair]"];
    expect(s).toContain("Course details to be confirmed");
    expect(s).toContain("Confirmed on enquiry");
    expect(stripComments(s)).not.toContain("getPricingPlans");
    expect(stripComments(s)).not.toContain("Published fees");
  });

  it("pricing holds every figure and every unbuilt capability claim", () => {
    const s = sources["pricing"];
    expect(s).toContain("confirmed on enquiry");
    expect(stripComments(s)).not.toContain("Instant auto-reply");
    expect(stripComments(s)).not.toContain("CRM-lite");
    expect(stripComments(s)).not.toContain("quoted after a demo");
  });

  it("for-institutes reframes Axon products as in development", () => {
    const s = sources["for-institutes"];
    expect(s).toContain("in development");
    expect(s).toContain("Discuss a Pilot");
    expect(stripComments(s)).not.toContain("Book a Live Demo");
    expect(stripComments(s)).not.toContain("answered in seconds");
  });

  it("student certifications drops the 100+ count, the gallery images and Pay-after-Pass", () => {
    const s = sources["student-certifications"];
    expect(s).toContain("Payment terms for any training are confirmed on enquiry");
    expect(stripComments(s)).not.toContain("100+");
    expect(stripComments(s)).not.toContain("Pay after you Pass");
    expect(importLines(s)).not.toContain("next/image");
  });

  it("team pages hold portraits and skill bars", () => {
    expect(importLines(sources["team-members"])).not.toContain("next/image");
    expect(stripComments(sources["team-members/nikhil-duth-d"])).not.toContain("95");
    expect(sources["team-members/nikhil-duth-d"]).toContain("9 Years");
  });

  it("accessibility no longer claims a theme toggle or v1 contrast numbers", () => {
    const s = stripComments(sources["accessibility"]);
    expect(s).not.toContain("theme toggle");
    expect(s).not.toContain("7.8:1");
    expect(s).not.toContain("11.5:1");
    expect(s).toContain("Menus that work by keyboard");
  });

  it("legal pages stay marked draft and terms flags its refund contradiction", () => {
    expect(sources["privacy-policy"]).toContain("Draft — do not treat as a published policy");
    expect(sources["refund-policy"]).toContain("Draft — do not treat as a published policy");
    expect(sources["terms-and-conditions"]).toContain("Draft — do not treat as a published policy");
    expect(sources["terms-and-conditions"]).toContain("strictly non-refundable");
  });

  it("dilsukhnagar page holds fees, demos and the testimonial slice", () => {
    const s = sources["training-institute-in-dilsukhnagar-hyderabad"];
    expect(s).toContain("Fees are confirmed on enquiry");
    expect(s).toContain("Demo availability is confirmed on enquiry");
    expect(stripComments(s)).not.toContain("testimonials");
  });
});

describe("Stage 8 /careers Option A rebuild", () => {
  it("lists no opening, no salary, no role, no deadline", () => {
    const s = sources["careers"];
    expect(s).toContain("No openings listed");
    expect(s).toContain("does not list individual openings");
    expect(s).toContain("/contact-us");
    expect(s).not.toMatch(/₹|\bLPA\b|Apply now/i);
  });

  it("disambiguates from learner career support", () => {
    expect(sources["careers"]).toContain("/career-support");
  });

  it("is linked from header, footer and sitemap", () => {
    const header = readSource("../src/components/Header.tsx");
    const footer = readSource("../src/components/Footer.tsx");
    const sitemap = readSource("../src/app/sitemap.ts");
    expect(header).toContain('"/careers"');
    expect(footer).toContain('"/careers"');
    expect(sitemap).toContain('"/careers"');
  });
});

describe("Stage 8 FAQ honesty", () => {
  it("faq page emits no FAQPage schema", () => {
    expect(importLines(sources["faq"])).not.toContain("faqSchema");
    expect(sources["faq"]).not.toContain("JsonLd");
  });

  it("site FAQ answers no longer promise a demo or published fees", () => {
    const ui = readSource("../src/components/ui.tsx");
    expect(ui).toContain("Demo availability is confirmed on enquiry");
    expect(ui).toContain("Fees are confirmed on enquiry");
    expect(ui).not.toContain("Yes. GradeSpot offers a free demo class");
    expect(ui).not.toContain("companies its students work with");
  });

  it("CTA band no longer claims to be the world's most reliable", () => {
    const ui = readSource("../src/components/ui.tsx");
    expect(ui).not.toContain("world&apos;s most reliable");
  });
});
