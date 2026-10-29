// Frontend 3.0 — Stage 5 course-detail model (pure, no rendering).
//
// Rules applied here, from the Stage 2→3 gate agreement and Leo's
// Stage 5 final call:
// - The detail template reads LOCAL repo data only (src/data/courses.ts
//   + src/data/course-details.ts), exactly as Stages 3/4 read repo
//   files directly. The DB-first getCourse() read is NOT used here:
//   the DB row for CCNA carries contested 90-day content and extra
//   paragraphs, so a DB-driven template could not honour the held
//   rules below. DB divergence remains a reconciliation-gate matter,
//   not something this template papers over.
// - Held presentation (title + held notice + Enquire only, no body
//   sections, no summary, no level/mode/certification, no duration,
//   no Register, no seat/batch promise, no demo CTA) for: all 25
//   catalogue-only courses, CCNA (R1 open), CCNP (R2 open) and
//   Digital Marketing (R4 open + truncated summary).
// - Verified presentation for the remaining 8 full-detail courses:
//   repo sections verbatim, minus the skipped categories below.
//   Nothing is auto-completed and no truncated summary is rendered.
// - Duration comes only from the repo duration map. AZ-900, AZ-104
//   and Hardware & Networking have no repo duration and say
//   "Duration confirmed on enquiry".
// - A title carrying an outcome promise is neutralised for display
//   (SOC). The source data file is never edited.

import {
  courses as localCourses,
  courseDurations,
  type Course,
  type CourseSection,
} from "@/data/courses";
import type { CourseDetail } from "@/data/course-details";
import { displayCourseTitle } from "@/lib/trainings-rows";

// Full-detail courses held in full, with the reason recorded.
export const HELD_DETAIL_REASONS: Record<string, string> = {
  "ccna-200-301":
    "R1 open: duration contested (45-day repo vs 90-day DB) and the curriculum mixes contested topics.",
  "ccnp-350-401-encor":
    "R2 open: page body is CCNA copy verbatim (sections, pricing and FAQ headings).",
  "digital-marketing":
    "R4 open and summary truncated mid-sentence: sections are held with the summary until R4 closes and complete text is supplied.",
};

// Courses whose curriculum section is not rendered (R6: empty curricula).
// NOTE (curriculum gating follow-up): this set now governs ONLY the
// curriculum-section skip. The area lists in course-details.ts are a
// different field and stay public as "What you will learn" (see below).
export const NO_CURRICULUM_SLUGS = new Set([
  "comptia-network-plus",
  "comptia-security-plus",
]);

// Sections on the Hardware page whose bodies are another course's
// content, verified by reading the paragraphs: an ethical-hacking
// intro under a Cisco heading, ethical-hacking job roles, and a CCNA
// skills section. Never rendered as Hardware content.
// Curriculum-gating follow-up: Hardware's "Course Curriculum" section
// is ALSO misattributed — its 26 paragraphs are identical, paragraph
// for paragraph, to AZ-104's "Course Curriculum". It is therefore
// skipped as misattributed (never rendered publicly, never presented
// as Hardware's gated syllabus) and flagged for the content team.
const MISATTRIBUTED_SECTIONS: Record<string, Set<string>> = {
  "computer-hardware-and-networking": new Set([
    "Cisco Certified Network Associate",
    "Common Job Roles for Ethical Hacking",
    "Skills To Measure In CCNA 200-301",
    "Course Curriculum",
  ]),
};

// Curriculum sections moved behind the enquiry gate (owner-authorised
// two-tier policy, Stage 5 follow-up): lesson-level lists, NOT module
// areas. Only headings are recorded in the model — the paragraphs
// never reach the page, so gated detail cannot leak into HTML,
// metadata, JSON-LD or the search index. The full syllabus itself is
// shared off-site by the team after enquiry; nothing is auto-sent and
// no download is ever promised.
const GATED_CURRICULUM_HEADINGS = new Set([
  "Course Curriculum",
  "Our Curriculum",
]);
// CEH has no "Course Curriculum" section: its curriculum is presented
// in the "Certified Ethical Hacker v13" section (intro + shared item
// list) and the "Tools Covered" tool list. Both are lesson/material
// detail, so both are gated for CEH.
const CEH_GATED_HEADINGS = new Set([
  "Certified Ethical Hacker v13",
  "Tools Covered",
]);

function isGatedCurriculum(slug: string, heading: string): boolean {
  if (GATED_CURRICULUM_HEADINGS.has(heading)) return true;
  if (
    slug === "certified-ethical-hacker-ceh" &&
    CEH_GATED_HEADINGS.has(heading)
  ) {
    return true;
  }
  return false;
}

// Courses without a repo duration that say "confirmed on enquiry".
const DURATION_ON_ENQUIRY_SLUGS = new Set([
  "azure-fundamentals-az-900",
  "azure-administrator-az-104",
  "computer-hardware-and-networking",
  "soc-analyst",
]);

export const PENDING_LABEL = "Course details to be confirmed";
export const ENQUIRE_LABEL = "Enquire About This Course";

export interface DetailFacts {
  who: string;
  level: string;
  certification: string;
  // Public module AREAS (two-tier curriculum policy): the verbatim
  // topic lists from course-details.ts. Never null for a verified
  // course (all 8 carry a detail record); null only where no detail
  // record exists. The lesson-level curriculum sections are a
  // different field and are gated, not rendered (see gatedHeadings).
  topics: string[] | null;
}

export interface SkippedSection {
  heading: string;
  reason: string;
}

export interface RelatedCourse {
  slug: string;
  title: string;
}

export interface DetailModel {
  slug: string;
  category: string;
  displayTitle: string;
  heldBack: boolean;
  heldReason: string | null;
  summary: string | null;
  durationLabel: string | null;
  facts: DetailFacts | null;
  sections: CourseSection[];
  skippedSections: SkippedSection[];
  // Headings of curriculum sections moved behind the enquiry gate
  // (two-tier policy). Headings only — never paragraphs — so gated
  // detail cannot leak into any rendered surface. Empty for held
  // pages (no gated block) and for verified pages whose curriculum
  // is fragmentary (R6) or misattributed (Hardware): those pages
  // still show the gated block, with the syllabus itself supplied
  // off-site by the team after enquiry.
  gatedHeadings: string[];
  jobReadyTopicsSuppressed: boolean;
  related: RelatedCourse[];
  compareSlug: string | null;
  compareTitle: string | null;
}

export function findLocalCourse(slug: string): Course | undefined {
  return localCourses.find((c) => c.slug === slug);
}

function isOfferHeading(heading: string): boolean {
  if (!/^Get an? /i.test(heading)) return false;
  return /free/i.test(heading) || /voucher/i.test(heading);
}

function isEnrolHeading(heading: string): boolean {
  return /^Enroll in /i.test(heading) || /^Enrol in /i.test(heading);
}

export function filterDetailSections(course: Course): {
  kept: CourseSection[];
  skipped: SkippedSection[];
  gated: string[];
} {
  const kept: CourseSection[] = [];
  const skipped: SkippedSection[] = [];
  const gated: string[] = [];
  const misattributed = MISATTRIBUTED_SECTIONS[course.slug] ?? new Set<string>();
  for (const s of course.sections) {
    const h = s.heading ?? "";
    if (s.style === "pricing") {
      skipped.push({ heading: h, reason: "pricing section — no verified price" });
    } else if (h === "Our Pricing") {
      skipped.push({ heading: h, reason: "pricing section — no verified price" });
    } else if (h.startsWith("Our Students works for")) {
      skipped.push({ heading: h, reason: "unverified employer claim" });
    } else if (h === "Visit our Blog") {
      skipped.push({ heading: h, reason: "navigation, not course content" });
    } else if (h === "What Our Learners Say") {
      skipped.push({ heading: h, reason: "unmatched testimonials (same generic set on multiple pages, incl. a placement claim)" });
    } else if (isEnrolHeading(h)) {
      skipped.push({ heading: h, reason: "conversion filler + retired enrol vocabulary" });
    } else if (isOfferHeading(h)) {
      skipped.push({ heading: h, reason: "unverified free-offer claim (voucher/free exam)" });
    } else if (
      NO_CURRICULUM_SLUGS.has(course.slug) &&
      (h === "Course Curriculum" || h === "Our Curriculum")
    ) {
      skipped.push({ heading: h, reason: "R6 open: empty curriculum" });
    } else if (misattributed.has(h)) {
      skipped.push({ heading: h, reason: "section body is another course's content, misattributed to this page" });
    } else if (isGatedCurriculum(course.slug, h)) {
      // Two-tier policy: lesson-level curriculum moves behind the
      // enquiry gate. Record the heading only; the paragraphs are
      // dropped here and never reach the page.
      gated.push(h);
    } else {
      kept.push(s);
    }
  }
  return { kept, skipped, gated };
}

export function buildCourseDetail(
  course: Course,
  detail: CourseDetail | undefined,
  compare: { slug: string; title: string } | undefined,
): DetailModel {
  const displayTitle = displayCourseTitle(course.title);
  const heldReason =
    course.catalogOnly
      ? "Catalogue-only course: no published detail page, summary, curriculum or availability in repo data."
      : (HELD_DETAIL_REASONS[course.slug] ?? null);
  // Purge gates (2026-10-29): demo-fill removed. Held presentation
  // applies to every slug with a held reason — catalogue-only
  // courses and the three held full courses — with no sample
  // record to un-hold them.
  const heldBack = heldReason !== null;

  const related: RelatedCourse[] = localCourses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3)
    .map((c) => ({ slug: c.slug, title: displayCourseTitle(c.title) }));

  if (heldBack) {
    return {
      slug: course.slug,
      category: course.category,
      displayTitle,
      heldBack: true,
      heldReason,
      summary: null,
      durationLabel: null,
      facts: null,
      sections: [],
      skippedSections: [],
      gatedHeadings: [],
      jobReadyTopicsSuppressed: false,
      related: [],
      compareSlug: null,
      compareTitle: null,
    };
  }

  const duration = courseDurations[course.slug];
  const durationLabel = duration
    ? `Duration: ${duration}`
    : DURATION_ON_ENQUIRY_SLUGS.has(course.slug)
      ? "Duration confirmed on enquiry"
      : "Duration not yet published";

  let facts: DetailFacts | null = null;
  let jobReadyTopicsSuppressed = false;
  if (detail) {
    // Two-tier policy: the area lists stay public for every verified
    // course, including Network+/Security+ (their R6 problem is the
    // curriculum SECTION, which stays suppressed below — not the
    // area list). Only the job-ready topic is filtered (SOC).
    const topics = detail.topics.filter((t) => {
      if (/job-ready/i.test(t)) {
        jobReadyTopicsSuppressed = true;
        return false;
      }
      return true;
    });
    facts = {
      who: detail.who,
      level: detail.level,
      certification: detail.certification,
      topics,
    };
  }

  const { kept, skipped, gated } = filterDetailSections(course);

  return {
    slug: course.slug,
    category: course.category,
    displayTitle,
    heldBack: false,
    heldReason: null,
    summary: course.summary || null,
    durationLabel,
    facts,
    sections: kept,
    skippedSections: skipped,
    gatedHeadings: gated,
    jobReadyTopicsSuppressed,
    related,
    compareSlug: compare?.slug ?? null,
    compareTitle: compare?.title ?? null,
  };
}
