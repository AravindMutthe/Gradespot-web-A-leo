// Frontend 3.0 — Stage 2 homepage content tests.
//
// These tests pin the Stage 2 contract: D3 hero wording verbatim,
// equal-door CTAs, category-level discovery only (no per-course status
// or enrolment CTA on the homepage), interest links to existing routes
// only, and NO carried-forward v1 claims (counters, learner counts,
// "years", emblem claims, employer logos, testimonials, stats ribbons,
// promo banners, ticker). They read the page source, so a regression
// that reintroduces a dropped section fails here before it ships.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses, courseCategories } from "../src/data/courses";
import { categoryAnchor } from "../src/data/catalogue-nav";
import { services } from "../src/data/services";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const home = readSource("../src/app/page.tsx");

describe("Stage 2 homepage — hero and doors", () => {
  it("uses the D3 hero wording verbatim with the v1.1 subline", () => {
    expect(home).toContain("Practical IT training — and IT services — in Hyderabad.");
    expect(home).toContain(
      "Explore technical courses and business IT solutions from GradeSpot IT Solutions.",
    );
  });

  it("gives Training and IT Solutions equal-weight CTAs", () => {
    expect(home).toContain('href="/trainings"');
    expect(home).toContain('href="/services"');
    expect(home).toContain("Explore Training");
    expect(home).toContain("Explore IT Solutions");
  });

  it("does not reuse the v1 hero wrapper or present a search box", () => {
    expect(home).not.toContain("hero-paper");
    expect(home).not.toContain("<input");
    expect(home).not.toContain('type="search"');
  });

  it("does not link to a page that does not exist yet", () => {
    expect(home).not.toContain("/careers");
  });
});

describe("Stage 2 homepage — discovery from repo data only", () => {
  it("derives the index from the repo catalogue: 36 trainings, 10 categories", () => {
    expect(courses.length).toBe(36);
    expect(courseCategories.length).toBe(10);
    const present = courseCategories.filter(
      (cat) => courses.some((c) => c.category === cat),
    );
    expect(present.length).toBe(10);
  });

  it("lists 12 services, title-only, to existing service routes", () => {
    expect(services.length).toBe(12);
    // Service hrefs are built dynamically (`/services/${s.slug}`), so
    // assert the template — not a literal per-slug string.
    expect(home).toContain("`/services/${s.slug}`");
    for (const s of services) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("links every interest entry to an existing route", () => {
    // Interest hrefs live in the INTERESTS array and render via
    // href={item.href}, so assert the array entries plus the render.
    expect(home).toContain("href={item.href}");
    for (const href of [
      "/trainings",
      "/services",
      "/corporate-and-international",
      "/for-institutes",
      "/for-colleges",
      "/certificate-verification",
    ]) {
      expect(home).toContain(`"${href}"`);
    }
  });
});

describe("Stage 2 homepage — dropped v1 claims stay dropped", () => {
  it("carries no counters, learner counts, emblem claims, or v1 proof sections", () => {
    for (const forbidden of [
      "1,500",
      "Happy Learners",
      "ISO Certified",
      "AICTE Internships",
      "iso-logo",
      "aicte-logo",
      "StatsRibbon",
      "Testimonial",
      "Ticker",
      "PromoBanner",
      "ExperienceBadge",
      "SignatureBlock",
      "LogoWall",
    ]) {
      expect(home).not.toContain(forbidden);
    }
  });

  it("shows no employer logos and no enrolment CTA for a pending course", () => {
    expect(home).not.toContain("employers");
    expect(home).not.toContain("Employer");
    expect(home).not.toContain("Enrol");
    expect(home).not.toContain("Enroll");
  });
});

describe("Stage 2 homepage — category rows deep-link to trainings sections", () => {
  it("links each category row to its own /trainings anchor (same anchors Stage 3 renders)", () => {
    expect(home).toContain("`/trainings#${categoryAnchor(cat.name)}`");
    expect(categoryAnchor("Microsoft Azure")).toBe("category-microsoft-azure");
    expect(categoryAnchor("Programming & Data")).toBe("category-programming-data");
    expect(categoryAnchor("Design & CAD")).toBe("category-design-cad");
  });
});
