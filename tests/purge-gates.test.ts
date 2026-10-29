// Purge gates (2026-10-29) — the production merge gates for sample
// markers and demo vendor marks, pinned as tests so a regression
// that reintroduces placeholder data fails here, not in production:
//
//   1. ZERO `sample: true` literals anywhere under src/.
//   2. The demo-fill module, demo-samples data, SampleTag and
//      DemoLegend components are gone (no file, no import, no
//      rendering, no sample color class).
//   3. The four demo-only vendor files are gone, and no source
//      references them or the vendors/ directory at all.
//   4. AICTE + ISO are NOT purged: the owner stated those marks
//      are real, so the about-us page still carries them.
//   5. Held fallbacks hold: the 25 catalogue-only courses + 3 held
//      full courses render held (title + pending notice only),
//      training rows + service rows + search entries agree, and
//      the 3 held LPs build no model (404) while the 8 verified
//      LPs build — and the sitemap lists only the 8 live LPs.
//   6. Pricing publishes no fee figure of any kind.
//
// Gaps the purge exposes are REPORTED, never filled here: held
// courses/services/LPs have no duration, summary, scope or price
// until real company data is approved.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { services } from "../src/data/services";
import { courseDetails } from "../src/data/course-details";
import {
  HELD_DETAIL_REASONS,
  PENDING_LABEL,
  buildCourseDetail,
  findLocalCourse,
} from "../src/lib/course-detail";
import { buildTrainingRow } from "../src/lib/trainings-rows";
import {
  SERVICE_PENDING_LABEL,
  buildServiceRow,
} from "../src/lib/services-rows";
import { buildSearchIndex, isHeldCourseSlug } from "../src/lib/search";
import { buildLpModel } from "../src/lib/lp-model";
import sitemap from "../src/app/sitemap";

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css)$/.test(entry)) out.push(p);
  }
  return out;
}

const SRC_FILES = walk("src");
const SRC_TEXT = SRC_FILES.map((f) => readFileSync(f, "utf8")).join("\n");

const HELD_FULL = Object.keys(HELD_DETAIL_REASONS);
const VERIFIED_LP_SLUGS = [
  "azure-fundamentals-az-900",
  "azure-administrator-az-104",
  "certified-ethical-hacker-ceh",
  "comptia-network-plus",
  "comptia-pentest-plus",
  "comptia-security-plus",
  "computer-hardware-and-networking",
  "soc-analyst",
];

describe("Purge gates — zero sample markers", () => {
  it("no `sample: true` literal anywhere under src/", () => {
    expect(SRC_TEXT).not.toContain("sample: true");
  });

  it("demo-fill module, demo-samples data, SampleTag and DemoLegend are gone", () => {
    expect(existsSync("src/lib/demo-fill.ts")).toBe(false);
    expect(existsSync("src/data/demo-samples.ts")).toBe(false);
    expect(existsSync("src/components/SampleTag.tsx")).toBe(false);
    expect(existsSync("src/components/DemoLegend.tsx")).toBe(false);
    expect(SRC_TEXT).not.toContain("SampleTag");
    expect(SRC_TEXT).not.toContain("DemoLegend");
    // No module reference survives (historical comments may still
    // name the removed system; the gate is on imports/usages).
    expect(SRC_TEXT).not.toContain("lib/demo-fill");
    expect(SRC_TEXT).not.toContain("data/demo-samples");
    expect(SRC_TEXT).not.toContain("components/SampleTag");
    expect(SRC_TEXT).not.toContain("components/DemoLegend");
    expect(SRC_TEXT).not.toContain("text-sample");
    expect(SRC_TEXT).not.toContain("border-sample");
    expect(SRC_TEXT).not.toContain("--color-sample");
  });

  it("no model object carries a sample field", () => {
    for (const c of courses) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect("sample" in model).toBe(false);
      expect("sample" in buildTrainingRow({
        slug: c.slug,
        title: c.title,
        category: c.category,
        summary: c.summary,
        catalogOnly: c.catalogOnly,
      })).toBe(false);
    }
    for (const s of services) {
      expect("sample" in buildServiceRow({ slug: s.slug, title: s.title })).toBe(false);
    }
    for (const e of buildSearchIndex()) {
      expect("sample" in e).toBe(false);
    }
    for (const slug of VERIFIED_LP_SLUGS) {
      expect("sample" in buildLpModel(slug)!).toBe(false);
    }
  });
});

describe("Purge gates — zero demo vendor marks, real marks kept", () => {
  it("the four demo-only vendor files are deleted and unreferenced", () => {
    for (const f of [
      "microsoft-logo.svg",
      "cisco-logo.svg",
      "comptia-logo.svg",
      "eccouncil-logo.jpg",
    ]) {
      expect(existsSync(`public/images/vendors/${f}`)).toBe(false);
      expect(SRC_TEXT).not.toContain(f);
    }
    expect(SRC_TEXT).not.toContain("/images/vendors/");
  });

  it("AICTE + ISO stay: owner-stated real marks, still rendered", () => {
    const about = readFileSync("src/app/about-us/page.tsx", "utf8");
    expect(about).toContain('seal="aicte"');
    expect(about).toContain('seal="iso"');
    expect(about).toContain("AICTE / ISO Certified");
  });
});

describe("Purge gates — held fallbacks hold everywhere", () => {
  it("28 held courses render held (title + pending notice only)", () => {
    const held = courses.filter((c) => c.catalogOnly || HELD_FULL.includes(c.slug));
    expect(held.length).toBe(28);
    for (const c of held) {
      const model = buildCourseDetail(c, courseDetails[c.slug], undefined);
      expect(model.heldBack).toBe(true);
      expect(model.summary).toBeNull();
      expect(model.facts).toBeNull();
      expect(model.sections).toEqual([]);
      expect(isHeldCourseSlug(c.slug)).toBe(true);
    }
  });

  it("training rows, service rows and search entries agree on held", () => {
    for (const c of courses.filter((x) => x.catalogOnly)) {
      const row = buildTrainingRow({
        slug: c.slug,
        title: c.title,
        category: c.category,
        summary: c.summary,
        catalogOnly: true,
      });
      expect(row.heldBack).toBe(true);
      expect(row.statusLabel).toBe(PENDING_LABEL);
    }
    for (const s of services) {
      const row = buildServiceRow({ slug: s.slug, title: s.title });
      expect(row.heldBack).toBe(true);
      expect(row.statusLabel).toBe(SERVICE_PENDING_LABEL);
    }
    const index = buildSearchIndex();
    expect(index.filter((e) => e.kind === "course" && e.statusLabel !== null).length).toBe(28);
    expect(index.filter((e) => e.kind === "service" && e.statusLabel !== null).length).toBe(12);
  });

  it("8 LPs build, 3 held LPs return null, sitemap lists only live LPs", () => {
    for (const slug of VERIFIED_LP_SLUGS) {
      expect(buildLpModel(slug)).not.toBeNull();
    }
    for (const slug of ["ccna-200-301", "ccnp-350-401-encor", "digital-marketing"]) {
      expect(buildLpModel(slug)).toBeNull();
    }
    const urls = sitemap().map((e) => e.url);
    for (const slug of VERIFIED_LP_SLUGS) {
      expect(urls).toContain(`https://gradespot-leo-build-app.vercel.app/lp/${slug}-in-hyderabad`);
    }
    for (const slug of ["ccna-200-301", "ccnp-350-401-encor", "digital-marketing"]) {
      expect(urls).not.toContain(`https://gradespot-leo-build-app.vercel.app/lp/${slug}-in-hyderabad`);
    }
  });

  it("pricing publishes no fee figure of any kind", () => {
    const pricing = readFileSync("src/app/pricing/page.tsx", "utf8");
    expect(pricing).not.toContain("SAMPLE_COURSE_FEE_RANGES");
    expect(pricing).not.toContain("SAMPLE_INSTITUTE_TIER_RANGES");
    expect(pricing).not.toContain("SampleTag");
    expect(pricing).not.toMatch(/₹/);
    expect(pricing).toContain("confirmed on enquiry");
  });
});
