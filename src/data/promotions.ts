// Promotions data layer — admin-configured content (Aravind's
// architecture decision, 2026-10-23; DECISIONS.md §19).
//
// This module is the typed CONFIG SEAM for the future Supabase table
// `site_promotions` (migration supabase/migrations/0005_site_promotions.sql
// ships the identical shape: slug, kind, title, body, cta_label,
// cta_href, image, active, sort, starts_at, ends_at, with anon read of
// active rows only). Supabase DDL cannot be applied from the build
// sandbox, so reads resolve here today; when the migration is applied,
// lib/data.ts getPromotions() swaps to the table with no component
// changes. Admin CRUD itself lives in gradespot-axon (Phase 3) — this
// site only consumes.
//
// CONTENT RULE (Consumer Protection Act 2019 / ASCI honesty standard,
// §19): only offers that are actually true today may be seeded — the
// free demo class, the free counselling call, the syllabus on
// WhatsApp, and free certificate verification. No invented discounts,
// percentages, strike-through prices, deadlines or festival offers.
// An inactive/empty slot renders nothing — never a fake deal.

export type PromotionKind = "banner" | "card" | "ticker";

export interface Promotion {
  slug: string;
  kind: PromotionKind;
  title: string;
  body: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  image: string | null;
  active: boolean;
  sort: number;
  startsAt: string | null; // timestamp; null = no start bound
  endsAt: string | null; // timestamp; null = no end bound
}

export const promotions: Promotion[] = [
  {
    slug: "free-demo-banner",
    kind: "banner",
    title: "Sit in on a real class — free.",
    body: "See the training before you join: attend an actual session, meet the trainer and check the lab, online or at our Dilsukhnagar institute. Pick a course and book your demo — the team confirms a timing that suits you.",
    ctaLabel: "Book a Free Demo",
    ctaHref: "/trainings",
    image: "/images/courses/ceh.jpg",
    active: true,
    sort: 1,
    startsAt: null,
    endsAt: null,
  },
  {
    slug: "free-demo-card",
    kind: "card",
    title: "Book a Free Demo",
    body: "Attend a real session of any course before you enrol — online or at the Dilsukhnagar institute.",
    ctaLabel: "Browse Trainings",
    ctaHref: "/trainings",
    image: null,
    active: true,
    sort: 1,
    startsAt: null,
    endsAt: null,
  },
  {
    slug: "free-counselling-card",
    kind: "card",
    title: "Free Counselling Call",
    body: "Talk to a counsellor about courses, batches, modes of training and certification paths — no charge.",
    ctaLabel: "Request a Callback",
    ctaHref: "/contact-us",
    image: null,
    active: true,
    sort: 2,
    startsAt: null,
    endsAt: null,
  },
  {
    slug: "syllabus-whatsapp-card",
    kind: "card",
    title: "Syllabus on WhatsApp",
    body: "Get a course syllabus sent to your WhatsApp — open any course page and use its syllabus button.",
    ctaLabel: "See the Courses",
    ctaHref: "/trainings",
    image: null,
    active: true,
    sort: 3,
    startsAt: null,
    endsAt: null,
  },
  {
    slug: "certificate-verification-card",
    kind: "card",
    title: "Free Certificate Verification",
    body: "Employers and students can verify any GradeSpot certificate by its code — free, on this site.",
    ctaLabel: "Verify a Certificate",
    ctaHref: "/certificate-verification",
    image: null,
    active: true,
    sort: 4,
    startsAt: null,
    endsAt: null,
  },
  // Ticker/board lines (interleaved with the featured course titles
  // the Ticker component reads from the catalogue data).
  { slug: "ticker-demo", kind: "ticker", title: "Free Demo Classes", body: null, ctaLabel: null, ctaHref: null, image: null, active: true, sort: 1, startsAt: null, endsAt: null },
  { slug: "ticker-counselling", kind: "ticker", title: "Free Counselling Call", body: null, ctaLabel: null, ctaHref: null, image: null, active: true, sort: 2, startsAt: null, endsAt: null },
  { slug: "ticker-syllabus", kind: "ticker", title: "Syllabus on WhatsApp", body: null, ctaLabel: null, ctaHref: null, image: null, active: true, sort: 3, startsAt: null, endsAt: null },
  { slug: "ticker-verify", kind: "ticker", title: "Free Certificate Verification", body: null, ctaLabel: null, ctaHref: null, image: null, active: true, sort: 4, startsAt: null, endsAt: null },
  { slug: "ticker-modes", kind: "ticker", title: "Online & Offline Classes", body: null, ctaLabel: null, ctaHref: null, image: null, active: true, sort: 5, startsAt: null, endsAt: null },
  { slug: "ticker-location", kind: "ticker", title: "Dilsukhnagar · Hyderabad", body: null, ctaLabel: null, ctaHref: null, image: null, active: true, sort: 6, startsAt: null, endsAt: null },
];
