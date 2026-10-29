// Two-door categorization tests (owner-ordered 2026-10-28, Leo's
// final call after Das's consolidated recommendation).
//
// These tests pin the new contract: directory-led training door with
// NO visitor-operated filters, one dynamic route for all 10 topic
// pages, reserved segments that cannot collide with course slugs,
// planned pages that stay honest and unindexed, a certifications
// page with no mapping and no forbidden claims, exactly one canonical
// internships destination, a grouped business directory with exactly
// the 12 existing services + 4 pathways, homepage links repointed,
// search + sitemap gains for indexed pages only, and zero sample
// markers anywhere (purge gates).

import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses, courseCategories } from "../src/data/courses";
import { services } from "../src/data/services";
import {
  BUSINESS_PATHWAYS,
  OWNER_WORDS_MAPPING,
  RESERVED_TRAINING_SEGMENTS,
  SERVICE_GROUPS,
  TRAINING_DIRECTORY_ENTRIES,
  serviceGroupsCoverServices,
  topicCategories,
  topicCategoryBySlug,
  topicSlug,
} from "../src/lib/two-door";
import { buildSearchIndex, categorySlug } from "../src/lib/search";
import { buildTrainingRow } from "../src/lib/trainings-rows";
import { courseDurations } from "../src/data/courses";
import sitemap from "../src/app/sitemap";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const directory = readSource("../src/app/trainings/page.tsx");
const coursesDir = readSource("../src/app/trainings/courses/page.tsx");
const categoryPage = readSource("../src/app/trainings/category/[slug]/page.tsx");
const programmesPage = readSource("../src/app/trainings/training-programmes/page.tsx");
const certificationsPage = readSource("../src/app/trainings/certifications/page.tsx");
const studyGuidesPage = readSource("../src/app/trainings/study-guides/page.tsx");
const detailPage = readSource("../src/app/trainings/[slug]/page.tsx");
const servicesDir = readSource("../src/app/services/page.tsx");
const home = readSource("../src/app/page.tsx");
const sitemapSrc = readSource("../src/app/sitemap.ts");
const leadRoute = readSource("../src/app/api/leads/route.ts");

const index = buildSearchIndex();
const byHref = (href: string) => index.find((e) => e.href === href);
const siteUrls = sitemap().map((s) => s.url);

describe("Two-door — topic taxonomy from catalogue data", () => {
  it("lists exactly the 10 declared categories, in declared order, with real counts", () => {
    const cats = topicCategories();
    expect(cats.map((c) => c.name)).toEqual(courseCategories);
    expect(Object.fromEntries(cats.map((c) => [c.name, c.count]))).toEqual({
      "Microsoft Azure": 7,
      Cisco: 2,
      CompTIA: 5,
      Networking: 1,
      "Digital Marketing": 1,
      Cybersecurity: 4,
      AWS: 3,
      "Programming & Data": 6,
      "Medical Coding": 6,
      "Design & CAD": 1,
    });
    expect(cats.reduce((n, c) => n + c.count, 0)).toBe(36);
  });

  it("shares one slug per category with the search index", () => {
    for (const cat of courseCategories) {
      expect(topicSlug(cat)).toBe(categorySlug(cat));
      expect(topicCategoryBySlug(topicSlug(cat))?.name).toBe(cat);
    }
    expect(topicCategoryBySlug("not-a-category")).toBeUndefined();
  });

  it("renders exactly its own topic's rows on a category page, nothing else", () => {
    for (const cat of topicCategories()) {
      const rows = courses
        .filter((c) => c.category === cat.name)
        .map((c) =>
          buildTrainingRow({
            slug: c.slug,
            title: c.title,
            category: c.category,
            summary: c.summary,
            catalogOnly: c.catalogOnly,
            duration: courseDurations[c.slug],
          }),
        );
      expect(rows.length).toBe(cat.count);
      expect(rows.every((r) => r.category === cat.name)).toBe(true);
      // Purge gates: verified rows link to their detail page;
      // held rows carry no title link (title-only + enquiry).
      expect(
        rows.every((r) =>
          r.heldBack ? r.titleHref === null : r.titleHref === `/trainings/${r.slug}`,
        ),
      ).toBe(true);
    }
  });
});

describe("Two-door — reserved segments cannot collide with course slugs", () => {
  it("no course slug equals a reserved /trainings segment", () => {
    for (const course of courses) {
      expect(RESERVED_TRAINING_SEGMENTS).not.toContain(course.slug);
    }
    expect(RESERVED_TRAINING_SEGMENTS).toEqual([
      "category",
      "courses",
      "certifications",
      "study-guides",
      "training-programmes",
    ]);
  });
});

describe("Two-door — training directory (no filters, no long list)", () => {
  it("lists the five offering-type entries in the owner's order", () => {
    expect(TRAINING_DIRECTORY_ENTRIES.map((e) => e.href)).toEqual([
      "/trainings/courses",
      "/trainings/training-programmes",
      "/trainings/certifications",
      "/services/internships",
      "/trainings/study-guides",
    ]);
    expect(directory).toContain("TRAINING_DIRECTORY_ENTRIES");
    for (const entry of TRAINING_DIRECTORY_ENTRIES) {
      expect(directory).not.toContain(entry.href);
    }
    // The directory renders entries from the model, not hardcoded rows.
    expect(directory).not.toContain("buildTrainingRow");
    // No live-filtering component is imported or rendered (the word
    // survives only in the retirement comment documenting the change).
    expect(directory).not.toContain('from "@/components/CatalogueSearch"');
    expect(directory).not.toContain("<CatalogueSearch");
  });

  it("carries a search box that goes to /search, not a filter control", () => {
    expect(directory).toContain("SearchBox");
    expect(directory).not.toContain('from "@/components/CatalogueSearch"');
    expect(directory).not.toContain("<CatalogueSearch");
    expect(existsSync(new URL("../src/components/CatalogueSearch.tsx", import.meta.url))).toBe(
      false,
    );
  });

  it("courses directory links every topic to its dynamic category page", () => {
    expect(coursesDir).toContain("topicCategories()");
    expect(coursesDir).toContain("`/trainings/category/${cat.slug}`");
    expect(coursesDir).toContain('href="/trainings"');
  });

  it("category pages are dynamic, 404 unknown slugs, and carry no sample markers", () => {
    expect(categoryPage).toContain("generateStaticParams");
    expect(categoryPage).toContain("notFound()");
    expect(categoryPage).toContain("topicCategoryBySlug");
    expect(categoryPage).not.toContain("DemoLegend");
    expect(categoryPage).not.toContain("SampleTag");
    expect(categoryPage).not.toContain("text-sample");
    expect(categoryPage).toContain('href="/trainings/courses"');
    expect(categoryPage).toContain('href="/trainings"');
  });

  it("detail breadcrumb no longer carries a topic-category level (owner-refined 4-level trail)", () => {
    // SUPERSEDED (syllabus-card stage, corrected breadcrumb
    // amendment): the detail breadcrumb is Home / Trainings /
    // Courses / title — the topic-category level was deliberately
    // dropped for shorter phone-width trails. Sibling discovery
    // survives via related courses + All Trainings, and category
    // pages remain reachable from the Trainings directory. The
    // category back-link therefore no longer comes from the detail
    // breadcrumb, and the detail template no longer references
    // topicSlug for it.
    expect(detailPage).not.toContain("topicSlug");
    expect(detailPage).not.toContain("/trainings/category/${topicSlug(course.category)}");
    expect(detailPage).toContain('"/trainings/courses"');
  });
});

describe("Two-door — planned pages stay honest and unindexed", () => {
  it("training programmes page names no track, syllabus, duration or date", () => {
    expect(programmesPage).toContain("No programme curriculum is confirmed yet");
    expect(programmesPage).toContain("basics, fundamentals and entry level");
    expect(programmesPage).toContain("robots: { index: false, follow: true }");
    expect(programmesPage).not.toContain("Duration:");
    expect(programmesPage).not.toContain("DemoLegend");
    expect(byHref("/trainings/training-programmes")).toBeUndefined();
    expect(siteUrls).not.toContain(
      "https://gradespot-leo-build-app.vercel.app/trainings/training-programmes",
    );
    expect(sitemapSrc).not.toContain("/trainings/training-programmes");
  });

  it("study guides page says plainly that nothing is available yet", () => {
    // JSX wraps the sentence across source lines; normalize whitespace.
    const text = studyGuidesPage.replace(/\s+/g, " ");
    expect(text).toContain("No guides are available for download or purchase yet");
    expect(studyGuidesPage).toContain("robots: { index: false, follow: true }");
    expect(studyGuidesPage).not.toContain("DemoLegend");
    expect(byHref("/trainings/study-guides")).toBeUndefined();
    expect(siteUrls).not.toContain(
      "https://gradespot-leo-build-app.vercel.app/trainings/study-guides",
    );
    expect(sitemapSrc).not.toContain("/trainings/study-guides");
  });
});

describe("Two-door — certifications page: no mapping, no forbidden claims", () => {
  it("states the mapping is pending and links only to the courses directory", () => {
    expect(certificationsPage).toContain("pending approval");
    expect(certificationsPage).toContain('href="/trainings/courses"');
    for (const course of courses) {
      expect(certificationsPage).not.toContain(`/trainings/${course.slug}`);
    }
  });

  it("carries none of the forbidden claim strings", () => {
    for (const forbidden of [
      "awards that vendor",
      "official vendor authorization",
      "guaranteed pass",
      "exam voucher",
      "guaranteed employment",
      "guaranteed placement",
    ]) {
      expect(certificationsPage.toLowerCase()).not.toContain(forbidden);
    }
  });

  it("is indexed and in the sitemap (unlike the planned pages)", () => {
    expect(byHref("/trainings/certifications")).toBeDefined();
    expect(siteUrls).toContain(
      "https://gradespot-leo-build-app.vercel.app/trainings/certifications",
    );
  });
});

describe("Two-door — internships has exactly one canonical destination", () => {
  it("training door links to /services/internships; no duplicate training-route page exists", () => {
    expect(
      TRAINING_DIRECTORY_ENTRIES.find((e) => e.title === "Internships")?.href,
    ).toBe("/services/internships");
    expect(
      existsSync(new URL("../src/app/trainings/internships/page.tsx", import.meta.url)),
    ).toBe(false);
    // The interim wording is honest: details under review, no opening confirmed.
    expect(
      TRAINING_DIRECTORY_ENTRIES.find((e) => e.title === "Internships")?.status,
    ).toContain("no current opening confirmed");
    // The unpaid model is recorded internally only: it must not appear
    // as a published opening, role, term or promise on any new page.
    for (const src of [directory, certificationsPage, programmesPage, studyGuidesPage]) {
      expect(src.toLowerCase()).not.toContain("unpaid");
    }
  });
});

describe("Two-door — business directory: exactly 12 services, 4 pathways", () => {
  it("groups cover all 12 services exactly once, in the specified group order", () => {
    expect(SERVICE_GROUPS.map((g) => g.label)).toEqual([
      "Education & Workforce",
      "Technology & Security",
      "Digital & Creative",
      "Staffing & Consultancy",
    ]);
    expect(serviceGroupsCoverServices()).toBe(true);
    expect(services.length).toBe(12);
    expect(servicesDir).toContain("SERVICE_GROUPS");
    expect(servicesDir).toContain("buildServiceRow");
    expect(servicesDir).not.toContain("DemoLegend");
    expect(servicesDir).toContain("Enquire About Our Services");
  });

  it("pathways are business pages, not services, and Partner With Us lists no partners", () => {
    expect(BUSINESS_PATHWAYS.map((p) => p.href)).toEqual([
      "/for-institutes",
      "/for-colleges",
      "/corporate-and-international",
      "/partner-with-us",
    ]);
    expect(servicesDir).toContain("Who We Work With");
    expect(servicesDir).toContain("BUSINESS_PATHWAYS");
    const grouped = SERVICE_GROUPS.flatMap((g) => g.slugs);
    expect(grouped).not.toContain("partner-with-us");
    // No partner names in the pathway model itself (the in-progress
    // note survives only in the page's header comment documenting the
    // rule, never as a listed partner).
    for (const pathway of BUSINESS_PATHWAYS) {
      expect(`${pathway.title} ${pathway.line}`.toLowerCase()).not.toContain("ec-council");
      expect(`${pathway.title} ${pathway.line}`.toLowerCase()).not.toContain("pearson");
    }
  });

  it("owner-words mapping is reported, not built as duplicate pages", () => {
    expect(OWNER_WORDS_MAPPING.Solutions).toContain("Technology & Security");
    expect(OWNER_WORDS_MAPPING.Collaborations).toContain("Who We Work With");
    expect(OWNER_WORDS_MAPPING.Partnerships).toContain("Partner With Us");
    expect(
      existsSync(new URL("../src/app/services/solutions/page.tsx", import.meta.url)),
    ).toBe(false);
    expect(
      existsSync(new URL("../src/app/services/partnerships/page.tsx", import.meta.url)),
    ).toBe(false);
  });
});

describe("Two-door — homepage, search and sitemap follow the new routes", () => {
  it("homepage category rows point to category pages, zero old anchor links remain", () => {
    expect(home).toContain("`/trainings/category/${topicSlug(cat.name)}`");
    // The compat limit survives only in a comment documenting it;
    // no anchor href is rendered anywhere on the homepage.
    expect(home).not.toContain("href={`/trainings#");
    expect(home).not.toContain('href="/trainings#');
  });

  it("search index gains the directory, courses directory, 10 category pages and certifications", () => {
    const pages = index.filter((e) => e.kind === "page");
    expect(pages.length).toBe(24);
    expect(index.length).toBe(72);
    expect(byHref("/trainings/courses")).toBeDefined();
    expect(byHref("/trainings/certifications")).toBeDefined();
    for (const cat of topicCategories()) {
      expect(byHref(`/trainings/category/${cat.slug}`)).toBeDefined();
    }
    expect(byHref("/trainings/training-programmes")).toBeUndefined();
    expect(byHref("/trainings/study-guides")).toBeUndefined();
    expect(byHref("/careers")).toBeUndefined();
    expect(byHref("/pricing")).toBeUndefined();
    expect(index.some((e) => e.href.startsWith("/lp/"))).toBe(false);
  });

  it("sitemap gains the same indexed pages and excludes the planned pages", () => {
    const base = "https://gradespot-leo-build-app.vercel.app";
    expect(siteUrls).toContain(`${base}/trainings/courses`);
    expect(siteUrls).toContain(`${base}/trainings/certifications`);
    for (const cat of topicCategories()) {
      expect(siteUrls).toContain(`${base}/trainings/category/${cat.slug}`);
    }
    expect(siteUrls).not.toContain(`${base}/trainings/training-programmes`);
    expect(siteUrls).not.toContain(`${base}/trainings/study-guides`);
  });

  it("lead honesty is untouched: 503 for log-only, no 202 anywhere", () => {
    expect(leadRoute).toContain("503");
    expect(leadRoute).not.toContain("202");
  });
});
