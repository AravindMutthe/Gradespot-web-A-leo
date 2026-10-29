// Frontend 3.0 — Stage 6 search index, matching and query parsing
// (pure, no rendering).
//
// Rules applied here, from the Stage 2→3 gate agreement and the
// Stage 6 brief:
// - The index is generated from LOCAL repo files only
//   (src/data/courses.ts + src/data/services.ts). The DB-first
//   getCourses()/getServices() reads are NOT used: the DB row for
//   CCNA carries contested 90-day content and extra paragraphs, so
//   a DB-driven index could not honour the held rules below. DB
//   divergence remains a reconciliation-gate matter, not something
//   search papers over.
// - ONE taxonomy: category labels, order and slugs are exactly the
//   trainings index's declared set (courseCategories, repo file
//   order), with slugs from the shared categoryAnchor() helper.
//   No second category label set is introduced here.
// - Held presentation, same as Stages 3/4/5: a held course or service
//   contributes its title and its held notice only — never a summary,
//   curriculum, duration, level, mode, certification, price, demo
//   promise, seat/batch claim or Register action. Held courses are
//   the 25 catalogue-only courses plus the three Stage 5 held
//   full-detail courses (CCNA R1, CCNP R2, Digital Marketing R4).
//   Every service is held (no confirmed scope in repo data).
// - Demo exception (feat/demo-content-gaps, preview only): demo
//   slugs override the held rule in buildSearchIndex — their demo
//   summary is the snippet, flagged demo: true, and the results page
//   renders the Demo marker. isHeldCourseSlug is unchanged.
// - Verified courses contribute their repo summary verbatim as the
//   snippet — nothing is generated, completed or paraphrased.
// - SOC is indexed under its neutral display title only
//   ("SOC Analyst Training in Hyderabad"); the job-ready title never
//   enters the index, results or metadata. CCNP is indexed under its
//   own title only: no CCNA copy, topics or pricing is ever indexed
//   (topics and pricing are not indexed for any course).
// - No result exists for anything outside the catalogue: there is no
//   Docker course, no Linux course and no finance / business-services
//   / institutions course, so a query for one honestly matches nothing.
// - Pages indexed are existing public pages only, under their
//   published PageHero titles, plus the two-door categorization
//   pages (training directory, courses directory, 10 category pages,
//   certifications explanatory page). /pricing is deliberately NOT
//   indexed: the route exists but is linked from neither header nor
//   footer, and linking it from search results before the pricing-nav
//   gap is decided would invent a nav entry. /lp/* pages are never
//   indexed. PLANNED pages (/trainings/training-programmes,
//   /trainings/study-guides) are NOT indexed as available content:
//   they are visitor destinations with noindex, excluded from the
//   sitemap, and must not surface as searchable content.
// - Matching is plain substring/token matching over the local index:
//   no AI, no external search service, no analytics in search.

import { courses, courseCategories } from "@/data/courses";
import { services } from "@/data/services";
import { categoryAnchor } from "@/data/catalogue-nav";
import { topicCategories } from "@/lib/two-door";
import { displayCourseTitle } from "@/lib/trainings-rows";
import {
  HELD_DETAIL_REASONS,
  PENDING_LABEL as COURSE_PENDING_LABEL,
  ENQUIRE_LABEL as COURSE_ENQUIRE_LABEL,
} from "@/lib/course-detail";
import {
  DEMO_CCNP_SUMMARY,
  DEMO_COURSE_CONTENT,
  DEMO_SERVICE_CONTENT,
  isDemoCourseSlug,
  isDemoServiceSlug,
} from "@/data/demo-content";
import {
  SERVICE_PENDING_LABEL,
  SERVICE_DETAILS_LABEL,
} from "@/lib/services-rows";

export type SearchKind = "course" | "service" | "page";

export interface SearchEntry {
  kind: SearchKind;
  title: string;
  href: string;
  // Courses only; null for services and pages.
  category: string | null;
  categorySlug: string | null;
  // Verified course summary verbatim; null for held items,
  // services, and pages (their rows show a status/type label
  // instead). Demo entries carry the demo summary here.
  snippet: string | null;
  // Held notice, or null for verified courses and pages.
  statusLabel: string | null;
  actionLabel: string;
  actionHref: string;
  // Demo branch only (feat/demo-content-gaps): true when the
  // snippet is demo copy. The search page must render the Demo
  // marker whenever this is true.
  demo: boolean;
}

// Slug for a category label, shared with the trainings index anchors:
// categoryAnchor() returns "category-<slug>", the query param carries
// the bare slug.
export function categorySlug(category: string): string {
  return categoryAnchor(category).replace(/^category-/, "");
}

// The declared taxonomy, in declared order.
export const SEARCH_CATEGORIES: string[] = [...courseCategories];

// Existing public pages indexed under their published PageHero titles.
// /pricing is excluded on purpose (see the header comment); /lp/*
// pages are never indexed; /register is a form destination, not a
// search destination, and is likewise excluded. Two-door pages: the
// training directory, the courses directory, the 10 dynamic category
// pages and the certifications explanatory page are indexed; the two
// planned pages (training-programmes, study-guides) are excluded.
export const PAGE_ENTRIES: { title: string; href: string }[] = [
  { title: "Practical IT training — and IT services — in Hyderabad.", href: "/" },
  { title: "Training", href: "/trainings" },
  { title: "Courses", href: "/trainings/courses" },
  ...topicCategories().map((cat) => ({
    title: `${cat.name} Courses`,
    href: `/trainings/category/${cat.slug}`,
  })),
  { title: "Certifications", href: "/trainings/certifications" },
  { title: "IT Services", href: "/services" },
  { title: "Contact Us — GradeSpot IT Solutions", href: "/contact-us" },
  { title: "Course Comparisons", href: "/compare" },
  { title: "Career Support — Roles, Proof, No Promises", href: "/career-support" },
  { title: "Verify Our Certificates", href: "/certificate-verification" },
  { title: "Help & FAQs", href: "/faq" },
  { title: "About Us — GradeSpot IT Solutions", href: "/about-us" },
  { title: "Why Choose Us", href: "/why-choose-us" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "Team Members", href: "/team-members" },
];

export function isHeldCourseSlug(slug: string): boolean {
  const course = courses.find((c) => c.slug === slug);
  if (!course) return false;
  return course.catalogOnly || slug in HELD_DETAIL_REASONS;
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const course of courses) {
    const heldBack = course.catalogOnly || course.slug in HELD_DETAIL_REASONS;
    const title = displayCourseTitle(course.title);
    // Demo branch only (feat/demo-content-gaps): demo pages are
    // searchable by their demo summary, flagged demo so the results
    // page renders the marker. This overrides the held rule for demo
    // slugs only; isHeldCourseSlug above is unchanged.
    if (isDemoCourseSlug(course.slug)) {
      const demoContent = DEMO_COURSE_CONTENT[course.slug];
      entries.push({
        kind: "course",
        title,
        href: `/trainings/${course.slug}`,
        category: course.category,
        categorySlug: categorySlug(course.category),
        snippet:
          course.slug === "ccnp-350-401-encor"
            ? DEMO_CCNP_SUMMARY
            : (demoContent?.summary ?? course.summary),
        statusLabel: null,
        actionLabel: "View course details",
        actionHref: `/trainings/${course.slug}`,
        demo: true,
      });
    } else if (heldBack) {
      entries.push({
        kind: "course",
        title,
        href: `/trainings/${course.slug}`,
        category: course.category,
        categorySlug: categorySlug(course.category),
        snippet: null,
        statusLabel: COURSE_PENDING_LABEL,
        actionLabel: COURSE_ENQUIRE_LABEL,
        actionHref: "/contact-us",
        demo: false,
      });
    } else {
      entries.push({
        kind: "course",
        title,
        href: `/trainings/${course.slug}`,
        category: course.category,
        categorySlug: categorySlug(course.category),
        snippet: course.summary || null,
        statusLabel: null,
        actionLabel: "View course details",
        actionHref: `/trainings/${course.slug}`,
        demo: false,
      });
    }
  }

  for (const service of services) {
    entries.push({
      kind: "service",
      title: service.title,
      href: `/services/${service.slug}`,
      category: null,
      categorySlug: null,
      // Demo branch only: demo scope summary, flagged demo.
      snippet: isDemoServiceSlug(service.slug)
        ? (DEMO_SERVICE_CONTENT[service.slug]?.summary ?? null)
        : null,
      statusLabel: isDemoServiceSlug(service.slug)
        ? null
        : SERVICE_PENDING_LABEL,
      actionLabel: SERVICE_DETAILS_LABEL,
      actionHref: `/services/${service.slug}`,
      demo: isDemoServiceSlug(service.slug),
    });
  }

  for (const page of PAGE_ENTRIES) {
    entries.push({
      kind: "page",
      title: page.title,
      href: page.href,
      category: null,
      categorySlug: null,
      snippet: null,
      statusLabel: null,
      actionLabel: "Visit page",
      actionHref: page.href,
      demo: false,
    });
  }

  return entries;
}

// Lowercase tokens split on anything that is not a letter or digit.
// An empty query tokenises to [] and matches everything (the results
// page decides whether an empty query lists anything at all).
export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0);
}

function haystack(entry: SearchEntry): string {
  if (entry.kind === "course") {
    // Held courses have no snippet, so a query can never surface held
    // or truncated text through search — only title and category.
    // Lesson detail does not exist as data and is never in the
    // haystack.
    return entry.snippet
      ? `${entry.title} ${entry.category ?? ""} ${entry.snippet}`.toLowerCase()
      : `${entry.title} ${entry.category ?? ""}`.toLowerCase();
  }
  if (entry.kind === "service") {
    // Held services match on title only.
    return entry.title.toLowerCase();
  }
  return entry.title.toLowerCase();
}

// AND semantics: every query token must appear in the haystack.
export function searchEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [...entries];
  return entries.filter((entry) => {
    const hay = haystack(entry);
    return tokens.every((token) => hay.includes(token));
  });
}

export interface SearchQuery {
  q: string;
  type: SearchKind | null;
  category: string | null;
}

const VALID_TYPES: SearchKind[] = ["course", "service", "page"];

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

// Stable, human-readable query params: ?q=, ?type=course|service|page,
// ?category=<bare slug>. Unknown or malformed values are ignored
// (never treated as a filter), and overlong queries are truncated.
export function parseSearchQuery(
  params: Record<string, string | string[] | undefined>,
): SearchQuery {
  const rawQ = firstParam(params.q) ?? "";
  const q = rawQ.trim().slice(0, 200);
  const rawType = firstParam(params.type);
  const type: SearchKind | null =
    rawType !== undefined && (VALID_TYPES as string[]).includes(rawType)
      ? (rawType as SearchKind)
      : null;
  const rawCategory = firstParam(params.category);
  const category =
    rawCategory !== undefined &&
    SEARCH_CATEGORIES.some((c) => categorySlug(c) === rawCategory)
      ? rawCategory
      : null;
  return { q, type, category };
}

// Applies the type and category filters. The category filter narrows
// courses only: services and pages carry no category, so they pass
// through it unchanged.
export function filterSearchResults(
  entries: SearchEntry[],
  query: SearchQuery,
): SearchEntry[] {
  return entries.filter((entry) => {
    if (query.type !== null && entry.kind !== query.type) return false;
    if (
      query.category !== null &&
      entry.kind === "course" &&
      entry.categorySlug !== query.category
    ) {
      return false;
    }
    return true;
  });
}
