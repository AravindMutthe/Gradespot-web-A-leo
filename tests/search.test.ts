// Frontend 3.0 — Stage 6 search tests.
//
// These tests pin the Stage 6 contract: a build-time index generated
// from LOCAL repo files only (never the DB-first reads), one taxonomy
// shared with the trainings index, held items that expose nothing
// beyond title + held notice, SOC neutralised, CCNP never surfacing
// CCNA content, honest empty states for non-catalogue queries, stable
// query params, and a header search box on desktop + mobile without
// any nav, slug, route or canonical change outside /search.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses, courseCategories } from "../src/data/courses";
import { services } from "../src/data/services";
import { navCategoryOrder } from "../src/data/catalogue-nav";
import {
  PAGE_ENTRIES,
  SEARCH_CATEGORIES,
  buildSearchIndex,
  categorySlug,
  filterSearchResults,
  isHeldCourseSlug,
  parseSearchQuery,
  searchEntries,
} from "../src/lib/search";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const index = buildSearchIndex();
const byHref = new Map(index.map((e) => [e.href, e]));
const byKind = (kind: string) => index.filter((e) => e.kind === kind);
const courseBySlug = (slug: string) =>
  index.find((e) => e.kind === "course" && e.href === `/trainings/${slug}`);
const sourceBySlug = new Map(courses.map((c) => [c.slug, c]));

const HELD_FULL_DETAIL = ["ccna-200-301", "ccnp-350-401-encor", "digital-marketing"];

describe("Stage 6 search — inventory from local repo files only", () => {
  it("indexes 36 courses + 12 services + 24 pages, no extras, no missing", () => {
    expect(byKind("course").length).toBe(36);
    expect(byKind("service").length).toBe(12);
    expect(byKind("page").length).toBe(24);
    expect(index.length).toBe(72);
    for (const course of courses) {
      expect(byHref.has(`/trainings/${course.slug}`)).toBe(true);
    }
    for (const service of services) {
      expect(byHref.has(`/services/${service.slug}`)).toBe(true);
    }
    for (const page of PAGE_ENTRIES) {
      expect(byHref.has(page.href)).toBe(true);
    }
    const hrefs = index.map((e) => e.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never indexes LP pages, /pricing, planned pages, or any non-catalogue entry", () => {
    expect(index.some((e) => e.href.startsWith("/lp/"))).toBe(false);
    expect(index.some((e) => e.href === "/pricing")).toBe(false);
    expect(index.some((e) => e.href === "/trainings/training-programmes")).toBe(false);
    expect(index.some((e) => e.href === "/trainings/study-guides")).toBe(false);
    expect(index.some((e) => /docker|linux/i.test(e.title))).toBe(false);
    expect(PAGE_ENTRIES.some((p) => p.href === "/pricing")).toBe(false);
  });

  it("reads local repo data, not the DB-first data layer", () => {
    const lib = readSource("../src/lib/search.ts");
    expect(lib).toContain('from "@/data/courses"');
    expect(lib).toContain('from "@/data/services"');
    // No import of the DB-first data layer, no Supabase client use.
    expect(lib).not.toContain('from "@/lib/data"');
    expect(lib).not.toContain("supabase");
  });
});

describe("Stage 6 search — taxonomy sync with the trainings index", () => {
  it("uses the declared 10 categories in declared repo order", () => {
    expect(SEARCH_CATEGORIES).toEqual(courseCategories);
    expect(SEARCH_CATEGORIES.length).toBe(10);
    const firstSeen: string[] = [];
    for (const entry of byKind("course")) {
      if (entry.category && !firstSeen.includes(entry.category)) {
        firstSeen.push(entry.category);
      }
    }
    expect(firstSeen).toEqual(courseCategories);
  });

  it("reconciled the legacy nav category order to the declared order", () => {
    expect(navCategoryOrder).toEqual(courseCategories);
  });

  it("derives every category slug from the shared anchor helper", () => {
    for (const cat of courseCategories) {
      const slug = categorySlug(cat);
      expect(slug).toMatch(/^[a-z0-9-]+$/);
      expect(slug).not.toContain("category-");
    }
    expect(categorySlug("Microsoft Azure")).toBe("microsoft-azure");
    expect(categorySlug("Programming & Data")).toBe("programming-data");
    expect(categorySlug("Design & CAD")).toBe("design-cad");
  });

  it("filters courses by category slug and nothing else by category", () => {
    const azure = filterSearchResults(index, {
      q: "",
      type: "course",
      category: "microsoft-azure",
    });
    expect(azure.length).toBe(7);
    expect(azure.every((e) => e.category === "Microsoft Azure")).toBe(true);
    const mixed = filterSearchResults(index, {
      q: "",
      type: null,
      category: "aws",
    });
    // Category narrows courses only; services and pages pass through.
    expect(mixed.filter((e) => e.kind === "course").length).toBe(3);
    expect(mixed.some((e) => e.kind === "service")).toBe(true);
    expect(mixed.some((e) => e.kind === "page")).toBe(true);
  });
});

describe("Stage 6 search — sample-filled content rules (demo-fill)", () => {
  it("marks the 28 formerly-held courses + 12 services as samples, with zero held entries", () => {
    const held = byKind("course").filter((e) => e.statusLabel !== null);
    expect(held.length).toBe(0);
    for (const slug of HELD_FULL_DETAIL) {
      expect(isHeldCourseSlug(slug)).toBe(false);
    }
    for (const course of courses.filter((c) => c.catalogOnly)) {
      expect(isHeldCourseSlug(course.slug)).toBe(false);
    }
    const sampleCourses = byKind("course").filter((e) => e.sample);
    expect(sampleCourses.length).toBe(28);
    const sampleServices = byKind("service").filter((e) => e.sample);
    expect(sampleServices.length).toBe(12);
  });

  it("sample entries expose a sample snippet + detail action only, never a held notice", () => {
    for (const entry of byKind("course").filter((e) => e.sample)) {
      expect(entry.snippet).toBeTruthy();
      expect(entry.statusLabel).toBeNull();
      expect(entry.actionLabel).toBe("View course details");
      expect(entry.actionHref).toBe(entry.href);
      const blob = JSON.stringify(entry);
      expect(blob).not.toMatch(/batch|seat count|trainer|guaranteed|placement %/i);
    }
    for (const entry of byKind("service").filter((e) => e.sample)) {
      expect(entry.snippet).toBeTruthy();
      expect(entry.statusLabel).toBeNull();
      expect(entry.actionLabel).toBe("View service details");
      expect(entry.actionHref).toBe(entry.href);
    }
  });

  it("verified entries carry their repo summary verbatim and nothing else", () => {
    const verified = byKind("course").filter((e) => e.statusLabel === null && !e.sample);
    expect(verified.length).toBe(8);
    for (const entry of verified) {
      const slug = entry.href.replace("/trainings/", "");
      expect(entry.snippet).toBe(sourceBySlug.get(slug)?.summary);
      expect(entry.actionLabel).toBe("View course details");
    }
  });

  it("SOC is neutral everywhere; CCNP sample never surfaces CCNA content", () => {
    const soc = courseBySlug("soc-analyst");
    expect(soc?.title).toBe("SOC Analyst Training in Hyderabad");
    expect(index.some((e) => /job-ready/i.test(e.title))).toBe(false);
    expect(index.some((e) => /job-ready/i.test(e.snippet ?? ""))).toBe(false);
    const ccnp = courseBySlug("ccnp-350-401-encor");
    expect(ccnp?.sample).toBe(true);
    expect(ccnp?.statusLabel).toBeNull();
    expect(ccnp?.snippet).toBeTruthy();
    expect(ccnp?.title).not.toMatch(/CCNA/i);
    expect(ccnp?.snippet).not.toMatch(/200-301|CCNA/);
    const ccna = courseBySlug("ccna-200-301");
    expect(ccna?.sample).toBe(true);
    expect(ccna?.statusLabel).toBeNull();
    expect(ccna?.snippet).toBeTruthy();
  });
});

describe("Stage 6 search — matching and honest empty states", () => {
  it("matches on title and category, case-insensitively, with AND tokens", () => {
    const azure = searchEntries(index, "azure");
    expect(azure.some((e) => e.href === "/trainings/azure-fundamentals-az-900")).toBe(true);
    expect(azure.some((e) => e.href === "/trainings/azure-security-engineer-az-500")).toBe(true);
    expect(searchEntries(index, "AZURE").length).toBe(azure.length);
    const narrow = searchEntries(index, "azure fundamentals");
    expect(narrow.map((e) => e.href)).toContain("/trainings/azure-fundamentals-az-900");
    expect(narrow.map((e) => e.href)).not.toContain("/trainings/azure-administrator-az-104");
  });

  it("returns an honest empty set for non-catalogue queries", () => {
    expect(searchEntries(index, "docker")).toEqual([]);
    expect(searchEntries(index, "linux")).toEqual([]);
    expect(searchEntries(index, "finance course")).toEqual([]);
  });

  it("finds SOC under its neutral title and held courses by title only", () => {
    const soc = searchEntries(index, "soc analyst");
    expect(soc.map((e) => e.href)).toContain("/trainings/soc-analyst");
    expect(soc.find((e) => e.href === "/trainings/soc-analyst")?.title).toBe(
      "SOC Analyst Training in Hyderabad",
    );
    const az500 = searchEntries(index, "azure security engineer");
    expect(az500.map((e) => e.href)).toContain("/trainings/azure-security-engineer-az-500");
  });
});

describe("Stage 6 search — query params", () => {
  it("parses q/type/category, ignoring unknown values", () => {
    expect(parseSearchQuery({})).toEqual({ q: "", type: null, category: null });
    expect(parseSearchQuery({ q: "  azure ", type: "course", category: "aws" })).toEqual({
      q: "azure",
      type: "course",
      category: "aws",
    });
    expect(parseSearchQuery({ type: "banana" }).type).toBeNull();
    expect(parseSearchQuery({ category: "not-a-category" }).category).toBeNull();
    expect(parseSearchQuery({ q: ["azure", "aws"] }).q).toBe("azure");
  });

  it("truncates overlong queries instead of failing", () => {
    const parsed = parseSearchQuery({ q: "a".repeat(500) });
    expect(parsed.q.length).toBe(200);
  });

  it("narrows by type", () => {
    const onlyServices = filterSearchResults(searchEntries(index, "cybersecurity"), {
      q: "cybersecurity",
      type: "service",
      category: null,
    });
    expect(onlyServices.length).toBe(1);
    expect(onlyServices[0].href).toBe("/services/cybersecurity-services");
  });
});

describe("Stage 6 search — chrome, results page and no scope creep", () => {
  it("puts a search box in the desktop bar and at the top of the mobile sheet", () => {
    const header = readSource("../src/components/Header.tsx");
    expect(header).toContain("SearchBox");
    expect(header).toContain("<SearchBox compact />");
    expect(header).toContain("onNavigate={() => setMobileOpen(false)}");
    const box = readSource("../src/components/SearchBox.tsx");
    expect(box).toContain('role="search"');
    expect(box).toContain("/search?q=");
    expect(box).toContain('e.key === "Escape"');
    expect(box).toContain("min-h-11");
    expect(box).not.toMatch(/google\.com|duckduckgo|bing\.com|algolia/i);
  });

  it("keeps the six nav groups and every existing route untouched", () => {
    const header = readSource("../src/components/Header.tsx");
    for (const label of ["Training", "IT Solutions", "Resources", "Company", "Support", "Legal"]) {
      expect(header).toContain(label);
    }
    const sitemap = readSource("../src/app/sitemap.ts");
    expect(sitemap).not.toContain('"/search"');
    const home = readSource("../src/app/page.tsx");
    expect(home).not.toContain("<input");
  });

  it("renders a truthful empty state and a noindex results page", () => {
    const page = readSource("../src/app/search/page.tsx");
    expect(page).toContain("No matching courses or services found");
    expect(page).toContain("robots: { index: false, follow: true }");
    expect(page).not.toContain("did you mean");
    expect(page).not.toContain("next/image");
    expect(page).not.toContain("Free Demo");
    expect(page).not.toContain("Register");
  });

  it("adds no new dependency and no external search service", () => {
    const lib = readSource("../src/lib/search.ts");
    expect(lib).not.toMatch(/fetch\(|axios|algolia|meilisearch|typesense/i);
    const pkg = JSON.parse(readSource("../package.json"));
    expect(Object.keys(pkg.dependencies).sort()).toEqual([
      "@supabase/supabase-js",
      "next",
      "react",
      "react-dom",
      "zod",
    ]);
  });
});
