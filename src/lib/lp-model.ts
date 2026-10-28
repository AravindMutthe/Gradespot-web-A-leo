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
// and the facts strip carries duration / mode / location / vendor
// alignment / certification. Nothing else on the page needs the
// summary or the outcome.
//
// Two-tier syllabus gating (same as detail pages): the model
// exposes module AREAS only (facts.topics). Lesson-level lists
// never enter this model — the gated syllabus block on the page
// is a heading + enquiry CTA, and the syllabus itself is shared
// off-site by the team after enquiry. No download, no "instant",
// no timing promise.
//
// Vendor marks: see LP_VENDOR_MARKS below (owner amendments
// 20:26 + 20:29 IST, demo-only preview scope; production
// decisions await GradeSpot officials). In short: provider brand
// portals are gated, so demo images are reputable open-source /
// press-distribution copies, bytes unmodified, approval status
// honestly "demo-only, authorization pending" — never
// "approved", never partner framing. Employer logos stay OFF;
// EC-Council/Pearson stay in-progress only, never partners.
// Before ANY production deploy, every mark below must be
// removed or authorized (part of the production purge gate).
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
import { getSampleCourse } from "@/lib/demo-fill";

// Vendor marks — OWNER AMENDMENTS 20:26 + 20:29 IST (demo-only
// preview scope; production decisions await GradeSpot officials).
// Priority applied: (1) official provider files first — provider
// brand portals for Microsoft (Partner Center / FastTrack login),
// Cisco (Brand Center request tool; corporate logo generally not
// granted to third parties), CompTIA (partner portal) are all
// gated, so no provider-direct file was obtainable; (2) reputable
// open-source / press-distribution copies, unmodified, as demo
// images; (3) reserved text slots where no file exists. Status at
// build time:
//   - Downloaded demo images (4 files, public/images/vendors/,
//     bytes unmodified — never edited, recoloured, cropped or
//     redrawn; a downloadable file is NOT authorization):
//       Microsoft  → microsoft-logo.svg (2012 lockup, tiles +
//                      wordmark, Commons PD)
//       Cisco      → cisco-logo.svg (bridge + wordmark, red,
//                      Commons PD)
//       CompTIA    → comptia-logo.svg (wordmark, red, Commons PD)
//       EC-Council → eccouncil-logo.jpg (lockup incl. "Building
//                      A Culture of Security" tagline, EC-Council
//                      press release via PR Newswire)
//     SVG marks are verified by file identity + brand colors, not
//     by a visual render (no rasterizer in this environment);
//     the parent's live-browser check must confirm they render
//     correctly. Currency vs current brand guidelines is NOT
//     verified for any mark.
//   - Reserved text slots: NONE for vendor marks (all four vendors
//     have a demo image). Hardware & Digital Marketing have no
//     vendor mark by design (completion certificate, not a vendor
//     certification), not by reservation.
//   - Generic illustrations used: NONE (no suitable generic file
//     in the repo; Adobe generations uninspected/parked; Das
//     generation banned; no lookalikes built).
//   - Employer/other-organisation logos: OFF entirely. EC-Council
//     /Pearson: in-progress only, never partners, never
//     "authorized partner" framing. Full R10 register (exact
//     asset, owner, source URL + download date, terms, purpose,
//     restrictions, repo path, approval status "demo-only,
//     authorization pending discussion with GradeSpot officials")
//     is in the stage report + docs/frontend-v2/
//     LP-R10-ASSET-REGISTER-2026-10-28.md. Before ANY production
//     deploy, every mark below must be removed or authorized:
//     demo images are part of the production purge gate alongside
//     sample markers.
export interface LpVendorMark {
  vendor: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

export const LP_VENDOR_MARKS: Record<string, LpVendorMark> = {
  "azure-fundamentals-az-900": {
    vendor: "Microsoft",
    image: "/images/vendors/microsoft-logo.svg",
    imageWidth: 338,
    imageHeight: 72,
  },
  "azure-administrator-az-104": {
    vendor: "Microsoft",
    image: "/images/vendors/microsoft-logo.svg",
    imageWidth: 338,
    imageHeight: 72,
  },
  "ccna-200-301": {
    vendor: "Cisco",
    image: "/images/vendors/cisco-logo.svg",
    imageWidth: 72,
    imageHeight: 38,
  },
  "ccnp-350-401-encor": {
    vendor: "Cisco",
    image: "/images/vendors/cisco-logo.svg",
    imageWidth: 72,
    imageHeight: 38,
  },
  "comptia-network-plus": {
    vendor: "CompTIA",
    image: "/images/vendors/comptia-logo.svg",
    imageWidth: 198,
    imageHeight: 42,
  },
  "comptia-security-plus": {
    vendor: "CompTIA",
    image: "/images/vendors/comptia-logo.svg",
    imageWidth: 198,
    imageHeight: 42,
  },
  "comptia-pentest-plus": {
    vendor: "CompTIA",
    image: "/images/vendors/comptia-logo.svg",
    imageWidth: 198,
    imageHeight: 42,
  },
  "certified-ethical-hacker-ceh": {
    vendor: "EC-Council",
    image: "/images/vendors/eccouncil-logo.jpg",
    imageWidth: 399,
    imageHeight: 146,
  },
  // SOC shows the EC-Council mark as ALIGNMENT only (its
  // certification string is "EC-Council CSA / SC-200 aligned");
  // the page carries the aligned-not-certified qualifier with it.
  "soc-analyst": {
    vendor: "EC-Council",
    image: "/images/vendors/eccouncil-logo.jpg",
    imageWidth: 399,
    imageHeight: 146,
  },
};

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
  sample: boolean;
  who: string;
  level: string;
  certification: string;
  durationLabel: string;
  mode: string;
  topics: string[];
  roles: string[];
  outcomeLine: string;
  sampleSummary: string;
  vendorMark: LpVendorMark | null;
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
  // Fail closed: a held page (no sample record to un-hold it)
  // must never render as an LP. All 11 LPs are un-held today
  // (8 verified + 3 sample records), so this is a guard, not a
  // path any current LP takes.
  if (model.heldBack || !model.facts) return null;

  const sample = model.sample ? getSampleCourse(course.slug) : undefined;
  // SOC duration: repo-map 90 days is unverified — LP renders the
  // confirmed-on-enquiry wording instead (see header note).
  // Sample + verified durationLabels carry a "Duration: " prefix
  // from the detail model; the LP card supplies its own label,
  // so the prefix is stripped here to avoid a doubled label.
  const durationLabel =
    course.slug === "soc-analyst"
      ? "Duration confirmed on enquiry"
      : (model.durationLabel ?? "Duration confirmed on enquiry").replace(/^Duration:\s*/, "");
  const roles = sample?.roles ?? rolesFromDetailSections(model.sections);
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
    sample: model.sample,
    who: model.facts.who,
    level: model.facts.level,
    certification: model.facts.certification,
    durationLabel,
    mode: sample ? sample.mode : "Online & Offline Classes",
    topics: model.facts.topics ?? [],
    roles,
    sampleSummary: model.sample ? (getSampleCourse(course.slug)?.summary ?? "") : "",
    // Outcome line (Das rule: preparation for an examination is
    // not the award of a certification; attendance alone never
    // establishes a vendor credential). Sample LPs get the generic
    // preparation line — no credential is claimed for samples.
    outcomeLine: model.sample
      ? "Builds the foundations covered in this course — full outcomes confirmed on enquiry."
      : model.facts.certification.includes("aligned")
        ? `Aligned with ${model.facts.certification.replace(/\s+aligned$/i, "")} — aligned, not certified. Attendance does not award a vendor credential.`
        : model.facts.certification.toLowerCase().includes("completion")
          ? "Leads to a course completion certificate from GradeSpot IT Solutions."
          : `Prepares for ${model.facts.certification} — preparation for an examination, not the award of a certification.`,
    vendorMark: LP_VENDOR_MARKS[course.slug] ?? null,
    variant: LP_VARIANT_BY_SLUG[course.slug] ?? "cloud-infra",
    testimonial,
    // Meta description never carries the raw outcome or summary
    // (Enroll tails, SOC job-ready). Sample LPs carry the sample
    // summary itself (demo-fill meta precedent: the page's Sample
    // tag + legend are the markers, since meta cannot carry them).
    metaDescription: model.sample
      ? (model.summary ?? "")
      : `${detail.short} training in Hyderabad at GradeSpot IT Solutions, Dilsukhnagar — online & offline classes. For ${model.facts.who}. Certification: ${model.facts.certification}. Details confirmed on enquiry.`,
  };
}
