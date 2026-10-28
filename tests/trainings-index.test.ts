// Frontend 3.0 — Stage 3 trainings index tests.
//
// These tests pin the Stage 2→3 gate contract for the trainings
// template: Option A compact text-first rows, title-only held-back
// rows, truthful durations, distinct conversion actions, removed
// promotional sections actually absent from the template, and
// unchanged slugs/categories/routes. They read the row model and
// the template sources, so a regression that reintroduces a large
// card, a removed section, or an invented claim fails here.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses, courseCategories, courseDurations } from "../src/data/courses";
import {
  buildTrainingRow,
  displayCourseTitle,
  groupTrainingRows,
} from "../src/lib/trainings-rows";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const page = readSource("../src/app/trainings/page.tsx");
const search = readSource("../src/components/CatalogueSearch.tsx");

const rows = courses.map((c) =>
  buildTrainingRow({
    slug: c.slug,
    title: c.title,
    category: c.category,
    summary: c.summary,
    catalogOnly: c.catalogOnly,
    duration: courseDurations[c.slug],
  }),
);
const bySlug = new Map(rows.map((r) => [r.slug, r]));
const sourceBySlug = new Map(courses.map((c) => [c.slug, c]));

const HELD_SLUGS = ["ccna-200-301", "ccnp-350-401-encor", "digital-marketing"];
const ENQUIRY_DURATION_SLUGS = [
  "azure-fundamentals-az-900",
  "azure-administrator-az-104",
  "computer-hardware-and-networking",
];

describe("Stage 3 trainings index — inventory and category order", () => {
  it("renders 36 rows in the 10 repo categories, repo order unchanged", () => {
    expect(rows.length).toBe(36);
    expect(courseCategories.length).toBe(10);
    const groups = groupTrainingRows(rows, courseCategories);
    expect(groups.map((g) => g.category)).toEqual(courseCategories);
    expect(groups.reduce((n, g) => n + g.rows.length, 0)).toBe(36);
  });

  it("keeps the repo per-category counts", () => {
    const counts = new Map<string, number>();
    for (const r of rows) counts.set(r.category, (counts.get(r.category) ?? 0) + 1);
    expect(counts.get("Microsoft Azure")).toBe(7);
    expect(counts.get("Programming & Data")).toBe(6);
    expect(counts.get("Medical Coding")).toBe(6);
    expect(counts.get("CompTIA")).toBe(5);
    expect(counts.get("Cybersecurity")).toBe(4);
    expect(counts.get("AWS")).toBe(3);
    expect(counts.get("Cisco")).toBe(2);
    expect(counts.get("Networking")).toBe(1);
    expect(counts.get("Digital Marketing")).toBe(1);
    expect(counts.get("Design & CAD")).toBe(1);
  });

  it("changes no slug, category, or route: every row matches its source course", () => {
    expect(rows.map((r) => r.slug)).toEqual(courses.map((c) => c.slug));
    for (const r of rows) {
      expect(r.category).toBe(sourceBySlug.get(r.slug)?.category);
    }
  });
});

describe("Stage 3 trainings index — held-back rows", () => {
  it("holds the three truncated summaries as title-only rows", () => {
    for (const slug of HELD_SLUGS) {
      // Evidence the hold is real: the source summary ends mid-sentence.
      expect(sourceBySlug.get(slug)?.summary.endsWith("…")).toBe(true);
      const row = bySlug.get(slug)!;
      expect(row.heldBack).toBe(true);
      expect(row.description).toBeNull();
      expect(row.titleHref).toBeNull();
      expect(row.durationLabel).toBeNull();
      expect(row.statusLabel).toBe("Course details to be confirmed");
      expect(row.actionLabel).toBe("Enquire About This Course");
      expect(row.actionHref).toBe("/contact-us");
    }
  });

  it("renders all 25 catalogue-only courses title-only with enquiry only", () => {
    const pending = rows.filter((r) => sourceBySlug.get(r.slug)?.catalogOnly);
    expect(pending.length).toBe(25);
    for (const row of pending) {
      expect(row.heldBack).toBe(true);
      expect(row.description).toBeNull();
      expect(row.titleHref).toBeNull();
      expect(row.statusLabel).toBe("Course details to be confirmed");
      expect(row.actionLabel).toBe("Enquire About This Course");
      expect(row.actionHref).toBe("/contact-us");
      expect(row.durationLabel).toBe("Duration not yet published");
    }
  });

  it("renders the 8 verified full-detail summaries verbatim and complete", () => {
    const verified = rows.filter((r) => !r.heldBack);
    expect(verified.length).toBe(8);
    for (const row of verified) {
      expect(row.description).toBe(sourceBySlug.get(row.slug)?.summary);
      expect(row.description?.endsWith("…")).toBe(false);
      expect(row.statusLabel).toBeNull();
      expect(row.titleHref).toBe(`/trainings/${row.slug}`);
      expect(row.actionLabel).toBe("View course details");
      expect(row.actionHref).toBe(`/trainings/${row.slug}`);
    }
  });
});

describe("Stage 3 trainings index — durations and actions", () => {
  it("uses only repo durations, with the explicit prefix", () => {
    expect(bySlug.get("comptia-network-plus")?.durationLabel).toBe("Duration: 30 days");
    expect(bySlug.get("comptia-security-plus")?.durationLabel).toBe("Duration: 30 days");
    expect(bySlug.get("comptia-pentest-plus")?.durationLabel).toBe("Duration: 60 hours");
    expect(bySlug.get("certified-ethical-hacker-ceh")?.durationLabel).toBe("Duration: 45 days");
    expect(bySlug.get("soc-analyst")?.durationLabel).toBe("Duration: 90 days");
  });

  it("labels the three named no-duration courses as confirmed on enquiry", () => {
    for (const slug of ENQUIRY_DURATION_SLUGS) {
      expect(bySlug.get(slug)?.durationLabel).toBe("Duration confirmed on enquiry");
    }
  });

  it("never groups a duration with another label and never invents one", () => {
    for (const row of rows) {
      if (row.durationLabel) {
        expect(
          row.durationLabel.startsWith("Duration: ") ||
            row.durationLabel === "Duration confirmed on enquiry" ||
            row.durationLabel === "Duration not yet published",
        ).toBe(true);
        expect(row.durationLabel.toLowerCase()).not.toContain("demo");
      }
    }
  });

  it("uses only the two index actions, with no seat or availability promise", () => {
    for (const row of rows) {
      expect(["Enquire About This Course", "View course details"]).toContain(row.actionLabel);
      const joined = `${row.actionLabel} ${row.statusLabel ?? ""}`.toLowerCase();
      expect(joined).not.toContain("register");
      expect(joined).not.toContain("seat");
      expect(joined).not.toContain("batch");
      expect(joined).not.toContain("demo");
      expect(joined).not.toContain("enrol");
    }
    expect(page.toLowerCase()).not.toContain("enrol");
    expect(search.toLowerCase()).not.toContain("enrol");
    expect(page).not.toContain("Register");
    expect(search).not.toContain("Register");
  });
});

describe("Stage 3 trainings index — claims and vocabulary", () => {
  it("neutralises the outcome promise in the SOC display title, data untouched", () => {
    const source = sourceBySlug.get("soc-analyst")!;
    expect(source.title.toLowerCase()).toContain("job-ready");
    expect(displayCourseTitle(source.title)).toBe("SOC Analyst Training in Hyderabad");
    expect(bySlug.get("soc-analyst")?.displayTitle).toBe("SOC Analyst Training in Hyderabad");
    for (const row of rows) {
      expect(row.displayTitle.toLowerCase()).not.toContain("job-ready");
      expect((row.description ?? "").toLowerCase()).not.toContain("job-ready");
    }
  });

  it("documents the two source summaries that still use retired wording", () => {
    // The row model does not rewrite source copy; these two verbatim
    // summaries end with an "Enroll" invitation and are flagged for
    // the owner/content approver. The template's own actions do not
    // use that wording (see the actions test above).
    const flagged = courses.filter((c) => /enroll/i.test(c.summary)).map((c) => c.slug);
    expect(flagged.sort()).toEqual(["comptia-security-plus", "soc-analyst"]);
  });

  it("uses the agreed collection wording in the template", () => {
    expect(page).toContain("Training Courses");
    expect(search).toContain("Search training courses");
    expect(search).toContain("No courses match your search.");
  });
});

describe("Stage 3 trainings index — removed sections are gone, not hidden", () => {
  it("imports and renders none of the removed sections on the index page", () => {
    for (const name of [
      "StatsRibbon",
      "LogoWall",
      "BlogCards",
      "FeatureTrio",
      "CourseCardBody",
      "showcaseItems",
    ]) {
      expect(page).not.toContain(name);
    }
    expect(page).not.toContain("<Ticker");
    expect(page).not.toContain("next/image");
    expect(page).not.toContain("Video Showcase");
  });

  it("renders rows, not cards, in the search component", () => {
    expect(search).not.toContain("CourseCardBody");
    expect(search).not.toContain("next/image");
    expect(search).not.toContain("Free Demo");
    expect(search).toContain("TrainingCourseRow");
  });
});
