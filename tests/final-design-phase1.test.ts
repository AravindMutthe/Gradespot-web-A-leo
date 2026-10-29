// Final design PHASE 1 — header-first (Frontend 3.0, parallel
// workstream on feat/frontend-v3-final-design). Pins the phase-1
// contract at template-source + model level (the repo has no
// component-rendering test setup, so rendered output is pinned by
// the live fetch in the checkpoint, as with earlier stages):
//   1. LP header uses the DARK logo file on its light bar (the
//      light logo washed out); neither logo file is edited.
//   2. Call pills never wrap the number (no-wrap + shrink guards).
//   3. LP footer clears the sticky bar at every width; the site
//      sticky bar is mobile-only with Call + Enquire and its own
//      clearance spacer, and never appears on LP pages.
//   4. Footer subheads are sans (Fraunces stays H1/major H2 only).
//   5. Copy fixes: LP form-helper count is accurate; SOC outcome
//      says "aligned" exactly once (no duplication).
//   6. Compare bridge under the trainings category grid links to
//      /compare and promises only area-level comparison.
//   7. Card interactions are flat row-hover only: no gradients,
//      no large image cards.
//   8. Vocabulary pass: homepage demo link and chrome Register
//      links are enquiry-consistent (URLs unchanged); no Enroll
//      tail survives in any summary or kept non-FAQ section body.
//      Intentionally left: skipped-section headings/bodies (never
//      rendered — the skip rule depends on their Enroll headings)
//      and DM FAQ process questions (eligibility/enrollment
//      process language, not a marketing tail; rewording them to
//      "enquire" would misstate the process).

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "@/data/courses";
import { courseDetails } from "@/data/course-details";
import { buildCourseDetail, findLocalCourse } from "@/lib/course-detail";
import { buildLpModel } from "@/lib/lp-model";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const LP_PAGE = readSource("../src/app/lp/[slug]/page.tsx");
const LP_FORM = readSource("../src/components/LpLeadForm.tsx");
const HEADER = readSource("../src/components/Header.tsx");
const FOOTER = readSource("../src/components/Footer.tsx");
const CHROME = readSource("../src/components/Chrome.tsx");
const LAYOUT = readSource("../src/app/layout.tsx");
const STICKY = readSource("../src/components/SiteStickyBar.tsx");
const GLOBALS = readSource("../src/app/globals.css");
const COURSES_DIR = readSource("../src/app/trainings/courses/page.tsx");
const CATEGORY_PAGE = readSource("../src/app/trainings/category/[slug]/page.tsx");
const SERVICES_PAGE = readSource("../src/app/services/page.tsx");
const HOME_PAGE = readSource("../src/app/page.tsx");

describe("final design phase 1: header + LP chrome", () => {
  it("LP header uses the dark logo file on its light bar", () => {
    expect(LP_PAGE).toContain('src="/images/logo.png"');
    expect(LP_PAGE).not.toContain("logo-light.png");
  });

  it("Call pills never wrap the number (LP bar keeps the max-zoom no-nowrap rule)", () => {
    // Site desktop pill: no-wrap + shrink guard. LP pill: shrink
    // guard only — the LP max-zoom structural test forbids nowrap
    // in the LP template, and the LP bar already wraps to its own
    // line via flex-wrap, so the number fits without nowrap.
    expect(HEADER).toContain("whitespace-nowrap");
    expect(LP_PAGE).toContain("shrink-0 items-center rounded-full");
    expect(LP_PAGE).not.toContain("whitespace-nowrap");
  });

  it("LP footer clears the sticky bar at every width", () => {
    expect(LP_PAGE).toContain("nav:pb-20");
    expect(LP_PAGE).not.toContain("nav:pb-8");
  });

  it("footer subheads are sans, not display serif", () => {
    expect(FOOTER).not.toContain("font-display");
  });

  it("LP form-helper count is accurate", () => {
    expect(LP_FORM).toContain("3 required fields");
    expect(LP_FORM).not.toContain("3 fields — name");
  });

  it("SOC outcome says aligned exactly once", () => {
    const soc = buildLpModel("soc-analyst");
    expect(soc).not.toBeNull();
    expect(soc!.outcomeLine).toContain("aligned, not certified");
    expect(soc!.outcomeLine).not.toContain("SC-200 aligned");
    expect(soc!.outcomeLine).not.toContain("aligned — aligned");
  });
});

describe("final design phase 1: compare bridge + row hover", () => {
  it("compare banner under the category grid links to /compare, area-level only", () => {
    expect(COURSES_DIR).toContain('href="/compare"');
    expect(COURSES_DIR).toContain("coverage areas");
    expect(COURSES_DIR).not.toContain("Compare Cloud Curricula");
  });

  it("row-hover is flat: tint + soft shadow, no gradients, on all three row lists", () => {
    expect(GLOBALS).toContain("@utility row-hover");
    expect(GLOBALS).toContain("background-color: var(--color-surface-light)");
    expect(COURSES_DIR).toContain("row-hover");
    expect(CATEGORY_PAGE).toContain("row-hover");
    expect(SERVICES_PAGE).toContain("row-hover");
    for (const src of [COURSES_DIR, CATEGORY_PAGE, SERVICES_PAGE]) {
      expect(src).not.toContain("bg-gradient");
    }
  });
});

describe("final design phase 1: site sticky bar", () => {
  it("mobile-only, Call + Enquire only, never a demo booking", () => {
    expect(STICKY).toContain("md:hidden");
    expect(STICKY).toContain("telHref(phone)");
    expect(STICKY).toContain('href="/contact-us"');
    expect(STICKY).toContain("Enquire");
    // Forbidden phrases (labels), not the rule's own comment words.
    expect(STICKY).not.toContain("Book Demo");
    expect(STICKY).not.toContain("Book a demo");
    expect(STICKY).not.toContain("Demo Class");
    expect(STICKY).not.toContain("Book My");
  });

  it("Chrome renders it on site pages only, with footer clearance", () => {
    // Perf contract (feat/main-perf-tbt): the static chrome is
    // server-rendered in the root layout and passed to Chrome as
    // props, so Footer / spacer / sticky bar ship no client JS —
    // only the Header island hydrates. Chrome itself imports
    // neither Footer nor SiteStickyBar anymore.
    expect(CHROME).not.toContain('components/Footer');
    expect(CHROME).not.toContain('components/SiteStickyBar');
    expect(LAYOUT).toContain("<Footer />");
    expect(LAYOUT).toContain("h-[68px] md:hidden");
    expect(LAYOUT).toContain("<SiteStickyBar />");
    expect(LAYOUT.indexOf("<Footer />")).toBeLessThan(
      LAYOUT.indexOf("<SiteStickyBar />"),
    );
    // LP branch returns a bare main (no header, footer, or sticky
    // bar); the site branch renders header, main, then the footer
    // prop in that order.
    expect(CHROME).toContain('return <main id="main">{children}</main>;');
    expect(CHROME).toContain(
      "{header}\n      <main id=\"main\">{children}</main>\n      {footer}",
    );
  });
});

describe("final design phase 1: vocabulary pass", () => {
  it("homepage demo link is enquiry-consistent, URL unchanged", () => {
    expect(HOME_PAGE).toContain("Ask about a demo class");
    expect(HOME_PAGE).not.toContain("Register for a Free Demo Class");
    expect(HOME_PAGE).toContain('href="/register"');
  });

  it("chrome Register links are enquiry-consistent, URLs unchanged", () => {
    expect(HEADER).toContain("Course enquiry");
    expect(FOOTER).toContain("Course enquiry");
    expect(HEADER).not.toContain('{ label: "Register"');
    expect(FOOTER).not.toContain('{ label: "Register"');
  });

  it("no Enroll tail in any summary or kept non-FAQ section body", () => {
    const flaggedSummaries = courses
      .filter((c) => /enroll/i.test(c.summary))
      .map((c) => c.slug);
    expect(flaggedSummaries).toEqual([]);
    for (const c of courses) {
      const course = findLocalCourse(c.slug);
      if (!course) continue;
      const model = buildCourseDetail(course, courseDetails[c.slug], undefined);
      if (model.summary) expect(model.summary).not.toMatch(/enroll/i);
      for (const s of model.sections) {
        if (s.style === "faq") continue; // process language, documented above
        for (const p of s.paragraphs ?? []) {
          expect(p).not.toMatch(/enroll/i);
        }
      }
    }
  });
});
