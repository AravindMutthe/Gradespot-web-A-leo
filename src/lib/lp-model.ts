// Frontend 3.0 — LP rebuild: landing-page model (pure, no rendering).
//
// The LP template reads LOCAL repo data only, through the Stage 5
// detail model — never DB-first getCourse (the DB CCNA row carries
// contested 90-day content), never raw course sections, never
// generated FAQs, never the course summary or the course-details
// outcome. Those last two are dropped on purpose:
//   - SOC + Security+ repo summaries end in retired "Enroll
//     today!/now!" vocabulary (a later vocabulary pass owns them);
//   - the SOC course-details outcome carries the held job-ready
//     claim. Rendering either on an LP would reintroduce copy the
//     LP stage is required to remove.
// The LP hero therefore carries the H1 + fit line (who) + CTAs,
// and the facts strip carries duration / mode / location /
// certification. Nothing else on the page needs the
// summary or the outcome.
//
// Two-tier syllabus gating (same as detail pages): the model
// exposes module AREAS only (facts.topics). Lesson-level lists
// never enter this model — the gated syllabus block on the page
// is a heading + enquiry CTA, and the syllabus itself is shared
// off-site by the team after enquiry. No download, no "instant",
// no timing promise.
//
// Purge gates (2026-10-29): vendor marks removed — the four demo-only
// vendor files are deleted and no vendor image renders on LPs.
// Employer logos stay OFF; EC-Council/Pearson stay in-progress
// only, never partners.
// SOC duration rule (LP-stricter than the detail model): the
// detail model renders the repo-map "90 days" for SOC, but that
// figure is NOT independently verified, so the LP renders
// "Duration confirmed on enquiry" instead. The detail-page SOC
// duration is a flagged open item for the vocabulary/content
// pass, not something this stage silently copies.

import { courseDetails } from "@/data/course-details";
import type { CourseSection } from "@/data/courses";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { buildCourseDetail, findLocalCourse } from "@/lib/course-detail";

// Purge gates (2026-10-29): vendor marks removed — the four demo-only
// vendor files are deleted and no vendor image renders on LPs.
// EC-Council/Pearson stay in-progress only, never partners.

// Presentation variants (Das LP proposal, reconciled): emphasis
// only — they do NOT rename courses or alter taxonomy.
//   cloud-infra: AZ-900, AZ-104, CCNA, CCNP, Network+, Hardware
//   cybersecurity: CEH, PenTest+, Security+, SOC
//   digital-marketing: Digital Marketing alone
export type LpVariant = "cloud-infra" | "cybersecurity" | "digital-marketing";

export const LP_VARIANT_BY_SLUG: Record<string, LpVariant> = {
  "azure-fundamentals-az-900": "cloud-infra",
  "azure-administrator-az-104": "cloud-infra",
  "ccna-200-301": "cloud-infra",
  "ccnp-350-401-encor": "cloud-infra",
  "comptia-network-plus": "cloud-infra",
  "computer-hardware-and-networking": "cloud-infra",
  "certified-ethical-hacker-ceh": "cybersecurity",
  "comptia-pentest-plus": "cybersecurity",
  "comptia-security-plus": "cybersecurity",
  "soc-analyst": "cybersecurity",
  "digital-marketing": "digital-marketing",
};

// Testimonials matched WITH provenance: the review text itself
// names the course. Arif Syed names the AZ-104 course; M Vamsi
// names SOC training. Every other LP has no matched review and
// gets no proof block. NOTE the corrected error in the old
// template: it mapped Kammarapalli pallavi to the CEH LP, but her
// review text is about SOC training, not CEH — so CEH gets no
// proof block, and pallavi is NOT reused as a CEH testimonial.
// The generic "naresh chepuri" fallback is gone entirely.
const LP_TESTIMONIAL_BY_SLUG: Record<string, string> = {
  "azure-administrator-az-104": "Arif Syed",
  "soc-analyst": "M Vamsi",
};

// Roles come from the Stage 5 FILTERED sections (model.sections),
// never from raw course sections. That is what keeps Hardware's
// misattributed "Common Job Roles for Ethical Hacking" section
// (skipped in the model) off the Hardware LP, and what keeps
// CCNA-derived job roles off every page that must not carry them.
export function rolesFromDetailSections(sections: CourseSection[]): string[] {
  for (const s of sections) {
    if (/job roles/i.test(s.heading ?? "")) return s.paragraphs;
  }
  return [];
}

export interface LpModel {
  slug: string;
  lpSlug: string;
  category: string;
  short: string;
  h1: string;
  displayTitle: string;
  who: string;
  level: string;
  certification: string;
  durationLabel: string;
  mode: string;
  topics: string[];
  roles: string[];
  outcomeLine: string;
  variant: LpVariant;
  testimonial: Testimonial | null;
  metaDescription: string;
}

export function lpSlugFor(courseSlug: string): string {
  return `${courseSlug}-in-hyderabad`;
}

// Reverse of lpSlugFor: the page receives the LP slug from the
// URL and must strip the suffix before looking up the course.
// Returns null for anything without the suffix, so a bare course
// slug (or any other path) can never resolve as an LP — it 404s
// instead of silently rendering the wrong course.
export function courseSlugForLpSlug(lpSlug: string): string | null {
  return lpSlug.endsWith("-in-hyderabad")
    ? lpSlug.slice(0, -"-in-hyderabad".length)
    : null;
}

export function buildLpModel(courseSlug: string): LpModel | null {
  const course = findLocalCourse(courseSlug);
  const detail = courseDetails[courseSlug];
  if (!course || course.catalogOnly || !detail) return null;
  const model = buildCourseDetail(course, detail, undefined);
  // Fail closed: a held page must never render as an LP. After the
  // purge gates, the three held full courses (CCNA, CCNP, Digital
  // Marketing) return null here, so their LP routes 404 until real
  // content is approved — that gap is reported, never filled with
  // placeholder data.
  if (model.heldBack || !model.facts) return null;

  // SOC duration: repo-map 90 days is unverified — LP renders the
  // confirmed-on-enquiry wording instead (see header note).
  // Detail durationLabels carry a "Duration: " prefix from the
  // detail model; the LP card supplies its own label, so the
  // prefix is stripped here to avoid a doubled label.
  const durationLabel =
    course.slug === "soc-analyst"
      ? "Duration confirmed on enquiry"
      : (model.durationLabel ?? "Duration confirmed on enquiry").replace(/^Duration:\s*/, "");
  const roles = rolesFromDetailSections(model.sections);
  const testimonialName = LP_TESTIMONIAL_BY_SLUG[course.slug];
  const testimonial = testimonialName
    ? (testimonials.find((t) => t.name === testimonialName) ?? null)
    : null;

  return {
    slug: course.slug,
    lpSlug: lpSlugFor(course.slug),
    category: course.category,
    short: detail.short,
    h1: `${detail.short} Training in Hyderabad`,
    displayTitle: model.displayTitle,
    who: model.facts.who,
    level: model.facts.level,
    certification: model.facts.certification,
    durationLabel,
    mode: "Online & Offline Classes",
    topics: model.facts.topics ?? [],
    roles,
    // Outcome line (Das rule: preparation for an examination is
    // not the award of a certification; attendance alone never
    // establishes a vendor credential).
    outcomeLine: model.facts.certification.includes("aligned")
        ? `Aligned with ${model.facts.certification.replace(/\s+aligned$/i, "")} — aligned, not certified. Attendance does not award a vendor credential.`
        : model.facts.certification.toLowerCase().includes("completion")
          ? "Leads to a course completion certificate from GradeSpot IT Solutions."
          : `Prepares for ${model.facts.certification} — preparation for an examination, not the award of a certification.`,
    variant: LP_VARIANT_BY_SLUG[course.slug] ?? "cloud-infra",
    testimonial,
    // Meta description never carries the raw outcome or summary
    // (Enroll tails, SOC job-ready).
    metaDescription: `${detail.short} training in Hyderabad at GradeSpot IT Solutions, Dilsukhnagar — online & offline classes. For ${model.facts.who}. Certification: ${model.facts.certification}. Details confirmed on enquiry.`,
  };
}
