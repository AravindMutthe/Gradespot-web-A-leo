// Two-door categorization (owner-ordered 2026-10-28; Leo's final call
// after Das's consolidated recommendation, same day). Pure, no rendering.
//
// Rules this module pins:
// - NO visitor-operated filters anywhere (owner rejected filters as
//   extra user work). Directory entries and anchor jump-links are
//   navigation, not filters.
// - Training door is DIRECTORY-LED: /trainings lists offering types,
//   /trainings/courses lists topic categories, and ONE dynamic route
//   /trainings/category/[slug] generates all 10 topic pages from
//   catalogue data. No hardcoded page per category, so a category
//   growing (vertical) or a new category arriving (horizontal) needs
//   no new code.
// - Courses and Training Programmes are SEPARATE entries by Leo's
//   call, deliberately differing from Das's combined-label
//   recommendation: the owner defines Training as broader
//   fundamentals/entry-level programmes, and ZERO of the 36 courses
//   is reclassified into it, so no arbitrary classification occurs.
// - Reserved first segments under /trainings (static pages plus the
//   dynamic category segment). No course slug may equal one — a
//   future course slug colliding with one would shadow the
//   directory/category page, so the collision is a test failure,
//   not a runtime surprise.
// - Business door groups are PRESENTATION labels only: they establish
//   no new business line. The 12 services and 4 pathways below are
//   exactly the existing routes, regrouped for discovery.

import { courses, courseCategories } from "@/data/courses";
import { services } from "@/data/services";
import { categoryAnchor } from "@/data/catalogue-nav";

// Static /trainings pages plus the dynamic category segment.
export const RESERVED_TRAINING_SEGMENTS: string[] = [
  "category",
  "courses",
  "certifications",
  "study-guides",
  "training-programmes",
];

// Bare slug for a topic category, shared with the search index's
// categorySlug(): categoryAnchor() returns "category-<slug>".
export function topicSlug(category: string): string {
  return categoryAnchor(category).replace(/^category-/, "");
}

export interface TopicCategory {
  name: string;
  slug: string;
  count: number;
}

// Declared repo order, counts computed from local catalogue data.
export function topicCategories(): TopicCategory[] {
  return courseCategories.map((name) => ({
    name,
    slug: topicSlug(name),
    count: courses.filter((c) => c.category === name).length,
  }));
}

export function topicCategoryBySlug(slug: string): TopicCategory | undefined {
  return topicCategories().find((t) => t.slug === slug);
}

export interface TrainingDirectoryEntry {
  title: string;
  href: string;
  line: string;
  status: string;
}

// Order is the owner's order. Counts are real only where real:
// Courses carries the real count (36); every other entry carries
// status wording, never an invented count.
export const TRAINING_DIRECTORY_ENTRIES: TrainingDirectoryEntry[] = [
  {
    title: "Courses",
    href: "/trainings/courses",
    line: "Individual subjects and single-subject paths, grouped by topic.",
    status: "36 courses",
  },
  {
    title: "Training Programmes",
    href: "/trainings/training-programmes",
    line: "Broader multi-subject programmes taught at basics, fundamentals and entry level.",
    status: "Planned — no programme curriculum confirmed yet",
  },
  {
    title: "Certifications",
    href: "/trainings/certifications",
    line: "Courses covering certification-related subjects. Course-to-certification mapping is pending approval.",
    status: "Explanatory page — no certification mapping confirmed yet",
  },
  {
    title: "Internships",
    href: "/services/internships",
    line: "Internship programmes. Programme details under review — enquire for information about eligibility, availability and terms.",
    status: "Details under review — no current opening confirmed on this page",
  },
  {
    title: "Study Guides & Notes",
    href: "/trainings/study-guides",
    line: "Learning resources to support GradeSpot courses.",
    status: "Planned — no guides available yet",
  },
];

export interface ServiceGroup {
  label: string;
  slugs: string[];
}

// Presentation groups only — every slug below is an existing
// service, in the published services order within each group.
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    label: "Education & Workforce",
    slugs: ["corporate-trainings", "industrial-trainings", "college-workshops", "internships"],
  },
  {
    label: "Technology & Security",
    slugs: ["cybersecurity-services", "web-development", "network-infrastructure-building"],
  },
  {
    label: "Digital & Creative",
    slugs: ["digital-marketing-solutions", "logo-designing"],
  },
  {
    label: "Staffing & Consultancy",
    slugs: ["us-it-staffing", "domestic-consultancy", "abroad-consultancy"],
  },
];

export interface BusinessPathway {
  title: string;
  href: string;
  line: string;
}

// Business-facing pages, NOT services. Partner With Us is never
// labelled a service and carries no partner list: no partners exist
// to list, and EC-Council/Pearson are in-progress only, never listed
// as partners. Corporate & International is never presented as proof
// of operating in any foreign jurisdiction.
export const BUSINESS_PATHWAYS: BusinessPathway[] = [
  {
    title: "For Institutes",
    href: "/for-institutes",
    line: "Information for institutes working with GradeSpot.",
  },
  {
    title: "For Colleges",
    href: "/for-colleges",
    line: "Information for colleges working with GradeSpot.",
  },
  {
    title: "Corporate & International",
    href: "/corporate-and-international",
    line: "Information for organisations working with GradeSpot.",
  },
  {
    title: "Partner With Us",
    href: "/partner-with-us",
    line: "Discuss working with GradeSpot. No partners are listed here.",
  },
];

// Owner-words mapping (reported, not built as duplicate pages):
// "Solutions" is served by the Technology & Security + Digital &
// Creative groups (deliverable solutions); "Collaborations" by the
// Who We Work With pathways; "Partnerships" by the Partner With Us
// entry. Standalone Solutions/Collaborations/Partnerships pages
// would duplicate the same 12 services + 4 pages, so none are made.
export const OWNER_WORDS_MAPPING: Record<string, string> = {
  Solutions: "Technology & Security + Digital & Creative service groups",
  Collaborations: "Who We Work With pathways",
  Partnerships: "Partner With Us entry",
};

export function serviceGroupSlugs(): string[] {
  return SERVICE_GROUPS.flatMap((g) => g.slugs);
}

// Sanity helper used by tests: every group slug must be a real
// service, and together the groups must cover all services exactly.
export function serviceGroupsCoverServices(): boolean {
  const grouped = serviceGroupSlugs();
  const actual = services.map((s) => s.slug);
  return (
    grouped.length === actual.length &&
    new Set(grouped).size === grouped.length &&
    actual.every((slug) => grouped.includes(slug))
  );
}
