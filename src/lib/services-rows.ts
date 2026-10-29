// Frontend 3.0 — Stage 4 services row model (pure, no rendering).
//
// Rules applied here, from the Stage 2→3 gate agreement and Leo's call:
// - One row per service, in the order returned by getServices (the
//   published Services-page order; the DB read is sorted to that
//   canonical order in lib/data). Slugs, order and routes are never
//   changed here.
// - Every service is held back to title-only. The repo data file
//   (src/data/services.ts, header) states that ALL per-service
//   summaries are pending Aravind's accuracy confirmation, that
//   summaries and offerings were recovered from a live-site scrape,
//   and that the live detail pages themselves carry only template
//   filler. No service has a confirmed scope or confirmed offerings
//   in repo data, so no summary and no offerings list is rendered
//   for any service. Nothing is auto-completed and no filler
//   ("IT staffing services for US requirements.",
//   "Aesthetically pleasing themes", and the rest) is presented
//   as verified scope.
// - When the owner/content approver confirms a service's scope, that
//   service — and only that service — moves to verified rendering
//   in a later change. This module must not be edited to "fill in"
//   a service without that confirmation.
// - No images on rows: image provenance is unreviewed, so rows are
//   text-first. No price anywhere: Pricing Set A vs B is undecided
//   and no published price exists for any service.
// - Conversion actions are limited to the two labels below. No
//   Register, no demo CTA, no "enrol" — no service has a confirmed
//   defined registration process or a confirmed demo offer.

// Demo branch imports (feat/demo-content-gaps). The demo data file
// is the ONLY source of demo copy; this module never invents any.
import {
  DEMO_SERVICE_CONTENT,
  isDemoServiceSlug,
} from "@/data/demo-content";

export interface ServiceRowInput {
  slug: string;
  title: string;
}

export interface ServiceRow {
  slug: string;
  displayTitle: string;
  description: string | null;
  statusLabel: string;
  actionLabel: string;
  actionHref: string;
  titleHref: string;
  heldBack: boolean;
  // Demo branch only (feat/demo-content-gaps): true when the row
  // carries demo scope copy. Templates must render the Demo marker
  // whenever this is true.
  demo: boolean;
}

export const SERVICE_PENDING_LABEL = "Service details to be confirmed";
export const SERVICE_ENQUIRE_LABEL = "Enquire About This Service";
export const SERVICE_DETAILS_LABEL = "View service details";
// Demo branch only: the listing status line for demo-scope rows.
export const SERVICE_DEMO_LABEL = "Demo scope available";

export function buildServiceRow(service: ServiceRowInput): ServiceRow {
  // Demo branch only (feat/demo-content-gaps): demo-scope rows link
  // to their demo detail page with the demo summary. The detail page
  // carries the marker + legend; the listing renders the badge.
  if (isDemoServiceSlug(service.slug)) {
    const demo = DEMO_SERVICE_CONTENT[service.slug];
    return {
      slug: service.slug,
      displayTitle: service.title,
      description: demo?.summary ?? null,
      statusLabel: SERVICE_DEMO_LABEL,
      actionLabel: SERVICE_DETAILS_LABEL,
      actionHref: `/services/${service.slug}`,
      titleHref: `/services/${service.slug}`,
      heldBack: false,
      demo: true,
    };
  }
  // Purge gates (2026-10-29): demo-fill removed. Every service is
  // held back to title-only until its scope is confirmed (R9 stays
  // open); the detail page carries the pending notice + enquiry.
  return {
    slug: service.slug,
    displayTitle: service.title,
    description: null,
    statusLabel: SERVICE_PENDING_LABEL,
    actionLabel: SERVICE_DETAILS_LABEL,
    actionHref: `/services/${service.slug}`,
    titleHref: `/services/${service.slug}`,
    heldBack: true,
    demo: false,
  };
}
