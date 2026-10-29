// Frontend 3.0 — detail-page hero buttons, mobile compaction ONLY.
//
// Owner requirement from a phone screenshot: the 4 hero buttons
// wrapped into a scattered uneven 1+2+1 stack on mobile. Fix is
// mobile-only (below md, 768px): the hero containers render as a
// compact 2-column grid with reduced button padding + font size.
// Desktop (md+) keeps today's flex row and today's button sizes
// exactly. Pins, at template-source level (repo has no
// component-rendering test setup, so rendered output is pinned by
// the live fetch in the checkpoint):
//   1. both hero containers (held + full branches) carry the
//      mobile 2-column grid classes AND the md+ flex-row classes;
//   2. the mobile size rule exists in globals.css, scoped to the
//      detail hero class, inside a max-width: 767px media query,
//      with padding + font-size REDUCED versus the btn-* base
//      (12px 28px / 15px), and min-height 44px;
//   3. desktop sizes are preserved: btn-primary / btn-outline-light
//      still define 12px 28px / 15px, and no md+ size override
//      exists on the hero buttons;
//   4. button order and conditional rendering unchanged: About
//      still conditional, Enquire still solid primary, held branch
//      still Enquire -> /contact-us + All Trainings only;
//   5. no other button surface changed: the detail-hero-cta class
//      appears in no other page source, and LP / service hero
//      sources are untouched by this stage.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const detail = readSource("../src/app/trainings/[slug]/page.tsx");
const css = readSource("../src/app/globals.css");
const lp = readSource("../src/app/lp/[slug]/page.tsx");
const services = readSource("../src/app/services/[slug]/page.tsx");

const MOBILE_GRID =
  "detail-hero-cta mt-7 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4";

describe("Detail hero buttons — mobile compaction", () => {
  it("both hero containers carry the mobile 2-col grid + md+ flex row", () => {
    const occurrences = detail.split(MOBILE_GRID).length - 1;
    expect(occurrences).toBe(2);
  });

  it("no hero container keeps the old mobile flex-wrap stack", () => {
    expect(detail).not.toContain('className="mt-7 flex flex-wrap gap-4"');
  });

  it("mobile size rule is scoped, below md only, and reduced vs base", () => {
    const mqStart = css.indexOf("@media (max-width: 767px)");
    expect(mqStart).toBeGreaterThan(-1);
    const mqEnd = css.indexOf("}", css.indexOf("}", mqStart) + 1);
    const mq = css.slice(mqStart, mqEnd);
    expect(mq).toContain(".detail-hero-cta > a");
    expect(mq).toContain("padding: 10px 12px");
    expect(mq).toContain("font-size: 14px");
    expect(mq).toContain("min-height: 44px");
  });

  it("desktop button sizes are preserved (btn base 12px 28px / 15px)", () => {
    expect(css).toContain("padding: 12px 28px");
    expect(css).toContain("font-size: 15px");
    // The hero containers carry exactly the grid + md+ flex classes
    // — no md: size override on them (other page sections may use
    // md: sizing, so this pins the container lines themselves).
    const containerLines = detail
      .split("\n")
      .filter((line) => line.includes("detail-hero-cta mt-7"));
    expect(containerLines.length).toBe(2);
    for (const line of containerLines) {
      expect(line.trim()).toBe(
        `<div className="${MOBILE_GRID}">`,
      );
      expect(line).not.toMatch(/md:(px-|py-|text-)/);
    }
    // The only detail-hero-cta occurrences in CSS are the comment
    // mention and the single max-width rule selector — no md+
    // (min-width) override block exists.
    const blocks = css.split("detail-hero-cta").length - 1;
    expect(blocks).toBe(2);
    expect(css).not.toMatch(/@media \(min-width[^)]*\)[^}]*detail-hero-cta/);
  });

  it("button order and conditional rendering unchanged", () => {
    const hero = detail.slice(detail.indexOf("Hero buttons, owner-approved"));
    const order = [
      "About the Course",
      "View Syllabus",
      "✉️</span> Enquire",
      "All Trainings",
    ];
    let last = -1;
    for (const label of order) {
      const at = hero.indexOf(label, last);
      expect(at).toBeGreaterThan(last);
      last = at;
    }
    expect(hero).toContain("aboutSections.length > 0");
    expect(hero).toContain('className="btn-primary min-h-[44px]"');
    expect(hero).toContain('className="btn-outline-light min-h-[44px]"');
  });

  it("held branch keeps Enquire -> /contact-us + All Trainings only", () => {
    const heldSpan = (() => {
      const start = detail.indexOf("model.heldBack ?");
      const end = detail.indexOf(") : (", start);
      expect(start).toBeGreaterThan(-1);
      expect(end).toBeGreaterThan(start);
      return detail.slice(start, end);
    })();
    expect(heldSpan).toContain('href="/contact-us"');
    expect(heldSpan).toContain("All Trainings");
    expect(heldSpan).not.toContain("View Syllabus");
    expect(heldSpan).not.toContain("About the Course");
    expect(heldSpan).toContain(MOBILE_GRID);
  });

  it("no other page surface carries the hero compaction class", () => {
    expect(lp).not.toContain("detail-hero-cta");
    expect(services).not.toContain("detail-hero-cta");
    expect(lp).not.toContain("grid grid-cols-2 gap-3 md:flex");
    expect(services).not.toContain("grid grid-cols-2 gap-3 md:flex");
  });
});
