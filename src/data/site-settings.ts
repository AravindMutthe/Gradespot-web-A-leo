// Site settings — the ADMIN-READY CONFIG SEAM (Nexus, 2026-10-27).
//
// This module is the typed, documented place where display and abuse-
// control behaviour is decided, instead of scattering new hardcoded
// values through components. Today it resolves from this file, exactly
// like the promotions seam (src/data/promotions.ts) did before its
// Supabase table existed. When the Axon admin platform exists, this
// module's read path swaps to a public, non-secret settings row served
// by Axon (e.g. GET /api/site-settings returning only the fields
// below) and NO component changes: components already read through
// these accessors, never through a second hardcoded copy.
//
// WHAT IS NEVER IN HERE: secrets, service-role keys, private student
// data, prices, or anything that must not be public. The /api/site-
// settings route (if added later) must serve exactly this shape and
// nothing else, and must never echo env vars.
//
// HONESTY DEFAULTS — read before flipping anything on:
// Every toggle below defaults to OFF for a claim that has no
// independent verification in this repo. A source-note such as "as
// published on our previous site" does NOT verify the underlying
// fact — it only moves the claim one step back — so a note alone was
// judged insufficient for counters, years, credentials and employer
// placements. An admin may flip a toggle ON only when the underlying
// fact has been verified and the evidence recorded; when a toggle is
// ON, its qualification note renders next to the claim, always.
//   counters: published on the live site (crawl 2026-10-23), with
//     "Certified Learners" published as both 1200 and 1500 and set to
//     1250 by the owner — UNVERIFIED, no independent source in repo.
//   experienceYears: "9 Years" from live Home/About pages —
//     UNVERIFIED, no founding date in repo to derive it from.
//   credentials (ISO 9001:2015, AICTE): on the owner's confirm-or-
//     remove list, no certificate/approval proof in repo, and both
//     emblems are registered official artwork — UNVERIFIED.
//   employerWall: logos harvested from the live "Our Students works
//     with" wall; the wall's claim is that students were EMPLOYED by
//     those companies, and no per-student placement evidence is in
//     the repo — UNVERIFIED as a placement claim.
// Future Axon field names are given in comments so the admin CRUD
// can be built against this contract without guessing.

export interface HeaderCta {
  label: string;
  href: string;
  enabled: boolean;
  /** "outline" | "text" | "primary" — the Header maps these to its existing button styles. */
  style: "outline" | "text" | "primary";
}

export interface SiteSettings {
  /** Header CTA trio. Admin may reorder, relabel, or disable one, but
   *  must never remove the last way to contact the business. */
  headerCtas: HeaderCta[];
  /** Learner counters (StatsRibbon + EnquiryRail line). OFF by default. */
  showCounters: boolean;
  /** Note rendered with counters whenever they are ON. */
  counterNote: string;
  /** "9 Years" experience badge. OFF by default. */
  showExperienceBadge: boolean;
  /** ISO / AICTE credential cards. Each OFF by default, independently. */
  showCredentialIso: boolean;
  showCredentialAicte: boolean;
  /** Note rendered with any credential card that is ON. */
  credentialNote: string;
  /** Employer logo wall. OFF by default; when ON, employerNote renders. */
  showEmployerWall: boolean;
  employerNote: string;
  /** Abuse controls for /api/leads and /api/verify (see lib/rate-limit). */
  rateLimit: {
    /** leads: max submissions per IP per windowSeconds. */
    leadsMax: number;
    leadsWindowSeconds: number;
    /** verify: max lookups per IP per windowSeconds. */
    verifyMax: number;
    verifyWindowSeconds: number;
  };
  /** Bot checks for lead forms (see lib/bot-check). */
  botCheck: {
    /** Minimum seconds between form render and submit. Below this,
     *  the submission is rejected as automated. Kept low (3s) so
     *  autofill users are not punished; it is one layer, not a wall. */
    minSeconds: number;
    /** Honeypot field name. Plausible, never "honeypot". */
    honeypotField: string;
    enabled: boolean;
  };
  /** Feature toggles for new pieces added in this pass. */
  features: {
    /** Honest 429 responses on the API routes. */
    rateLimiting: boolean;
    /** Honeypot + timing checks on lead forms and the API. */
    botChecks: boolean;
    /** Atlas integration — FUTURE ONLY, disabled by default. See
     *  src/data/atlas-integration.ts for the contract this flag gates.
     *  No Atlas content renders anywhere while this is false. */
    atlasIntegrationEnabled: boolean;
  };
}

function envInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * The single settings object. Server code may read env overrides for
 * the numeric abuse limits (RATE_LIMIT_*); display toggles are NOT
 * env-overridable at runtime in this build — they change here, and
 * later in Axon, so a deploy cannot silently re-publish an
 * unverified claim by flipping an env var.
 */
export const siteSettings: SiteSettings = {
  headerCtas: [
    { label: "Book Free Demo", href: "/register", enabled: true, style: "outline" },
    { label: "Explore Programs", href: "/trainings", enabled: true, style: "text" },
    { label: "Talk to an Advisor", href: "/contact-us", enabled: true, style: "primary" },
  ],
  showCounters: false,
  counterNote:
    "Figures as previously published on our earlier site; not independently verified.",
  showExperienceBadge: false,
  showCredentialIso: false,
  showCredentialAicte: false,
  credentialNote:
    "Credential status as previously published on our earlier site; confirmation is pending.",
  showEmployerWall: false,
  employerNote:
    "Logos as shown on our previous site; this wall does not claim any individual student's placement.",
  rateLimit: {
    leadsMax: envInt("LEADS_RATE_LIMIT_MAX", 30),
    leadsWindowSeconds: envInt("LEADS_RATE_LIMIT_WINDOW_SECONDS", 600),
    verifyMax: envInt("VERIFY_RATE_LIMIT_MAX", 60),
    verifyWindowSeconds: envInt("VERIFY_RATE_LIMIT_WINDOW_SECONDS", 600),
  },
  botCheck: {
    minSeconds: 3,
    honeypotField: "website",
    enabled: true,
  },
  features: {
    rateLimiting: true,
    botChecks: true,
    atlasIntegrationEnabled: false,
  },
};

/** Header CTAs that are currently enabled, in order. */
export function enabledHeaderCtas(): HeaderCta[] {
  return siteSettings.headerCtas.filter((c) => c.enabled);
}
