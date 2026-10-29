// Direction A — "The Prospectus" design pins (design-focus brief §4,
// 2026-10-29). Source-level pins, per repo convention (no component
// rendering setup): hero scale, contents tap targets, chapter rows,
// Bootstrap grid-only import, paper tint, rule-draw motion, colophon,
// and the must-survive rules (Call/Enquire scope, mobile hero
// compaction, held branch, no images, no sample markers).

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(`src/${path}`, "utf8");
const readTest = (path: string) => readFileSync(path, "utf8");

describe("Direction A heroes (64px, Gate 1 item 7 overrule)", () => {
  it("home cover, PageHero, and detail H1 are 64px at md", () => {
    expect(read("components/prospectus.tsx")).toContain("md:text-[64px]");
    expect(read("components/ui.tsx")).toContain("md:text-[64px]");
    expect(read("app/trainings/[slug]/page.tsx")).toContain("md:text-[64px]");
  });

  it("home meta line is computed from data counts, not hardcoded", () => {
    const home = read("app/page.tsx");
    expect(home).toContain("metaLine=");
    expect(home).toContain("trainings ·");
    expect(home).toContain("services`");
    expect(home).not.toContain("36 trainings · 12 services");
  });
});

describe("Chapter templates", () => {
  it("contents links are 44px tap targets; rows carry the 3px door marker", () => {
    const prospectus = read("components/prospectus.tsx");
    expect(prospectus).toContain("min-h-[44px]");
    expect(prospectus).toContain("h-[3px]");
    expect(prospectus).toContain("bg-door-training");
    expect(prospectus).toContain("bg-door-business");
  });

  it("home indexes use the Bootstrap editorial grid (row + col-md-6)", () => {
    const prospectus = read("components/prospectus.tsx");
    expect(prospectus).toContain('className="row g-4"');
    expect(prospectus).toContain("col-md-6");
  });

  it("detail facts render as a strip in the hero, not the old body card", () => {
    const detail = read("app/trainings/[slug]/page.tsx");
    expect(detail).toContain("FactsStrip");
    expect(detail).toContain("ChapterContents chapters={detailChapters} dark");
    expect(detail).not.toContain("Course facts\n                  </h2>");
  });

  it("detail chapters are numbered sequentially and held pages take none", () => {
    const detail = read("app/trainings/[slug]/page.tsx");
    expect(detail).toContain("model.heldBack ? [] : buildDetailChapters");
    expect(detail).toContain("ChapterEyebrow");
  });
});

describe("Bootstrap Path 2 (grid only, token-mapped)", () => {
  it("imports grid parts only — never the wholesale bundle, containers, utilities, or reboot", () => {
    const scss = read("app/bootstrap-prospectus.scss");
    expect(scss).toContain("bootstrap/scss/grid");
    // Import-statement precision: the file's own comments name the
    // excluded parts, so assert the absence of their imports, not of
    // the words.
    expect(scss).not.toContain('@import "bootstrap/scss/bootstrap-grid"');
    expect(scss).not.toContain('@import "bootstrap/scss/bootstrap"');
    expect(scss).not.toContain('@import "bootstrap/scss/containers"');
    expect(scss).not.toContain('@import "bootstrap/scss/utilities/api"');
    expect(scss).not.toContain('@import "bootstrap/scss/reboot"');
    expect(scss).not.toContain("bootstrap.bundle");
  });

  it("maps variables to Gate 1 tokens first and aligns breakpoints to Tailwind", () => {
    const scss = read("app/bootstrap-prospectus.scss");
    expect(scss).toContain("$primary: #c24e1f");
    expect(scss).toContain("sm: 640px");
    expect(scss).toContain("xl: 1280px");
    expect(read("app/layout.tsx")).toContain("bootstrap-prospectus.scss");
  });

  it("no Bootstrap JavaScript is imported anywhere", () => {
    for (const file of [
      "app/layout.tsx",
      "components/prospectus.tsx",
      "components/Header.tsx",
    ]) {
      expect(read(file)).not.toContain("bootstrap.bundle");
      expect(read(file)).not.toContain("bootstrap/dist/js");
    }
  });
});

describe("Paper tint, motion, colophon, header contents bar", () => {
  it("paper-warm token exists with measured contrast pairs", () => {
    const css = read("app/globals.css");
    expect(css).toContain("--color-paper-warm: #fdfcf8");
    expect(css).toContain("14.25:1");
    expect(css).toContain("7.38:1");
  });

  it("rule-draw is CSS-only with a no-JS fallback and reduced-motion rule", () => {
    const css = read("app/globals.css");
    expect(css).toContain(".chapter-rule-draw");
    expect(css).toContain("html:not(.reveal-on)");
    expect(css).toContain("prefers-reduced-motion");
  });

  it("footer colophon uses published address + hours + enquiry language", () => {
    const footer = read("components/Footer.tsx");
    expect(footer).toContain("business.address");
    expect(footer).toContain("business.officeHours");
    expect(footer).toContain("Details confirmed on enquiry");
  });

  it("header desktop groups are serif labels with mono counts; mobile sheet untouched in structure", () => {
    const header = read("components/Header.tsx");
    expect(header).toContain("font-display text-[17px]");
    expect(header).toContain("font-mono text-[12px]");
    expect(header).toContain('aria-label="Mobile"');
  });
});

describe("Must-survive rules", () => {
  it("Call pill + Enquire button in the header are untouched in scope", () => {
    const header = read("components/Header.tsx");
    expect(header).toContain("telHref(phone)");
    expect(header).toContain("📞");
    expect(header).toContain('href="/contact-us"');
  });

  it("mobile detail-hero compaction hook and classes survive", () => {
    expect(read("app/globals.css")).toContain(".detail-hero-cta");
    const detail = read("app/trainings/[slug]/page.tsx");
    expect(detail).toContain("detail-hero-cta mt-7 grid grid-cols-2 gap-3 md:flex");
  });

  it("no course images, no sample markers, no free-demo promises in the new design code", () => {
    for (const file of [
      "components/prospectus.tsx",
      "lib/chapter-contract.ts",
      "app/bootstrap-prospectus.scss",
    ]) {
      const code = read(file);
      expect(code).not.toContain("<Image");
      expect(code).not.toContain("/images/courses");
      expect(code).not.toContain("Free Demo");
    }
    expect(readTest("tests/chapter-contract.test.ts")).not.toContain("Sample");
  });
});
