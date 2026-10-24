# gradespot-leo-build-app

**Frontend** — Leo's own build of the GradeSpot website. Named by Aravind on 2026-10-23.

## What this is

The second frontend for GradeSpot, alongside `gradespot-rebuild-replica-app`:

- **`gradespot-rebuild-replica-app`** — the faithful replica of the official site (Phases 1+2 complete, live).
- **`gradespot-leo-build-app`** (this repo) — an original build: same real business, same real content, same data — designed fresh by Leo instead of replicating the official site's design.

Both are frontend-only. Admin and the Axon products live in **`gradespot-axon`** and connect through the same integration contract (lead events with source, certificate verify, payment webhooks, one DB-backed catalogue) — that contract is documented in the `gradespot-axon` repo.

## Rules that carry over

- **Same facts, always:** real courses, services, prices and claims from the official record only — design freedom never means invented content.
- **Same stack:** Next.js 15 + TypeScript + Tailwind + Supabase data layer (reads the shared catalogue; falls back to local data).
- **Same isolation:** never mixed with Royal Salon, the portfolio, or the replica repo's code.
- **Free tier only.** All assets downloaded into the repo — nothing hotlinked.
- **Branches:** `main` is the single line since 2026-10-24 (`leo-build-v1` crowned as `main`); features on branches; merges only on Aravind's review.

## Design system (v1 — "Prospectus", 2026-10-23, DECISIONS.md §19–§20)

Aravind's v1 mandate: full creative control — forget the original site's theme, style, layouts, fonts, colours and buttons. Only the menu options carry over (minus three logged trims), the official logo artwork stays unmodified, and the content truth layer is untouchable. Rich Salon-style boards and promo banners were added the same day, and all promotional content runs through an admin-shaped data layer.

- **Concept — "Prospectus":** the site reads like a world-class institute prospectus crossed with a course-code ledger. Ivory paper canvas, warm ink, one signal colour; serif display type, mono index labels (course codes, eyebrows, stats), layered parchment cards, ink panels, a scrolling featured board.
- **Palette (harmonizes with the logo; not derived from it):** paper `#FAF6EE`, parchment `#FFFDF8`, cream `#F2EADA`, ink `#201913` / ink-deep `#171208`, line `#E0D4BE`; signal vermilion `#B23A0A` (the logo orange deepened one step so text/buttons meet WCAG 2.2 AA — 5.6:1 on paper, 5.0:1 on cream, 6.0:1 under white text), true logo orange `#F7631B` reserved for display accents on ink (6.0:1), brand-dark `#9A3412`, brand-soft `#FBEADA`; WhatsApp green deepened to `#0B7A43` (5.4:1 with white). Body text `#5A4B38` measures 7.8:1.
- **Fonts (self-hosted variable woff2 in `public/fonts/`):** Fraunces (display serif, 100–900 + italic), Instrument Sans (text/UI, 400–700), IBM Plex Mono (codes, labels, eyebrows).
- **Header:** ink mono utility strip + light paper bar with the dark logo; Trainings mega-menu and Resources dropdown restyled as paper panels; menu = Trainings / Services / Pricing / About Us / Resources / For Colleges / For Institutes (pill) + Register + Request a Callback. v1 trims (logged in §19): Home removed (logo is home), Contact Us removed from the bar (duplicated by the Callback CTA; kept in footer), Digital moved into Resources.
- **Rich layer:** layered course cards (image gradient, Free Demo badge, duration chip), ghost-numeral service/offer cards, a CSS scrolling **Ticker** board (featured trainings + free services, reduced-motion safe), a data-driven **PromoBanner** and **OfferCards** row. Promotions are consumed from one data layer shaped for the future `site_promotions` Supabase table (migration `0005`, admin CRUD in gradespot-axon Phase 3); today's config seam is `src/data/promotions.ts`. Content rule: only true offers (free demo, free counselling, syllabus on WhatsApp, free certificate verification) — no invented discounts or urgency.
- **Registration (§20):** `/register` is course/demo LEAD registration on `/api/leads` (source `website:/register`) — not user accounts; accounts stay deferred to the LMS/admin phase.
- **Standards & legal (§19):** semantic HTML5 + landmarks + skip link; WCAG 2.2 AA tokens/targets/focus; OG + Twitter meta and canonical URLs on every page; OWASP security headers in `next.config.ts`; robots/sitemap/llms.txt maintained; no ad trackers and no non-essential cookies; `/accessibility` statement written only from implemented measures. A privacy policy page remains blocked on Aravind's data (see §19).

## Status

**v1 built, verified and approved (2026-10-23 build, approved 2026-10-24, branch `main`).** Next.js 15 + React + TS + Tailwind v4, data/content layer ported from the replica (its own Supabase project, same local fallback). `npm run build` passes; 90 routes, all returning 200 with a clean internal-link crawl; hardening + SEO/AEO passes done (self-canonicals, strict schema, local OG cards, llms-full.txt). **Live:** https://gradespot-leo-build-app.vercel.app (Vercel project `gradespot-leo-build-app`). Deploys are API uploads from the local working copy — pushing to GitHub does not deploy.

<!-- NEW-DEV-GUIDE -->

## New here? Understand this repo in 10 minutes

Read in this order:

1. This README — the map (design system above, structure below).
2. `DECISIONS.md` — §19–§20 for the design rulings, §25 for the
   SEO/AEO passes, and the open gaps (fees, durations, GBP, YouTube —
   never invented, always logged).
3. `src/data/site.ts` — the business facts in one place.
4. `src/app/page.tsx` — how the home page is composed.
5. `src/lib/metadata.ts` — how every page's title, description and OG
   image are built.
6. `src/lib/data.ts` — how data flows (Supabase first, local fallback).
7. `src/data/promotions.ts` — the admin-shaped promotions seam.
8. `src/lib/schema.ts` — the strict structured-data rules.

## Structure

- `src/app/` — 90 routes. Pages: Home, About Us, Accessibility,
  Trainings (+ 36 course pages under `trainings/[slug]`), Services (+ 12
  under `services/[slug]`), Pricing, Resources, Team Members (including
  `team-members/nikhil-duth-d`), Why Choose Us, Testimonials, Student
  Certifications, Certificate Verification, Contact Us, Help & FAQs
  (`faq`), Terms and Conditions, For Colleges, For Institutes,
  Career Support, Partner With Us, Register, Blog (+ articles under
  `blog/[slug]`), Comparisons (`compare/[pair]`, e.g. CEH vs PenTest+),
  city×course landing pages (`lp/[slug]`), and the local page
  `training-institute-in-dilsukhnagar-hyderabad`. APIs: `api/leads`
  (POST enquiry) and `api/verify` (POST certificate-code verification).
- `src/components/` — shared UI, including `ui.tsx` (site FAQs and
  shared blocks).
- `src/data/` — 14 files. `site.ts` (business facts), `courses.ts`
  (36 courses), `course-details.ts` (full detail for 11 courses),
  `services.ts` (12 services), `team.ts`, `testimonials.ts`,
  `certifications.ts`, `employers.ts`, `blog.ts`, `articles.ts`,
  `comparisons.ts`, `catalogue-nav.ts`, `pages.ts`, and
  `promotions.ts` (the promotions seam: typed config shaped for the
  future `site_promotions` Supabase table — only true offers, no
  invented discounts or urgency).
- `src/lib/` — `data.ts` (Supabase-or-local data layer),
  `supabase.ts` (client), `metadata.ts` (dynamic titles/descriptions/
  OG images, including `/images/og${path}.jpg` for static pages and
  per-slug builders for services, blog and comparisons),
  `schema.ts` (strict structured data: one Organization `@id`, no
  AggregateRating, no invented values), `aeo.ts` (answer-first
  summaries, 40–60 words, assembled only from published fields —
  anything unpublished is answered as "confirmed on enquiry"),
  `course-faqs.ts`, `lead-validation.ts` (one shared implementation
  used by the client forms AND the `/api/leads` route, so the server
  never accepts what the client rejects), `wa.ts` (WhatsApp deep links
  — always pre-filled with a message matched to the page, never a
  blank chat window).
- `public/` — `favicon.ico`; `fonts/` (Fraunces, Instrument Sans, IBM
  Plex Mono, self-hosted woff2); `images/` (`blog/`,
  `certifications/`, `courses/`, `employers/`, `team/`, `og/` with 38
  local 1200×630 cards built dynamically by `metadata.ts`,
  `aicte-logo.png`, `iso-logo.svg`, `map-dilsukhnagar.jpg`,
  `logo.png`, `logo-light.png`, `signature.png`); `llms.txt` and
  `llms-full.txt` (real data only, generated — see `scripts/`).
- `scripts/` — `generate-llms-full.py` (rebuilds `llms-full.txt` from
  the repo's own data files only; run from the repo root after content
  changes), `generate-og-cards.py` (builds the local OG cards with
  PIL; re-run when a fallback page's title changes),
  `sitemap-lastmod.py` (prints a lastmod map from real git history;
  paste the output into `sitemap.ts` when routes change).
- `supabase/migrations/` — `0001_init.sql`, `0002_gap_additions.sql`,
  `0003_course_images.sql`, `0004_lead_source_whatsapp.sql`,
  `0005_site_promotions.sql`.
- `DECISIONS.md` — design rulings, SEO/AEO passes, and every open gap.
- `package.json` — scripts: `dev`, `build`, `start`, `lint`.

## How data flows

Page or component → `src/lib/data.ts` → the Leo Supabase project when
`.env.local` is present, otherwise the local files in `src/data/`
(same catalogue content as the replica, separate project data).

- Leads: forms and the `/api/leads` route share
  `src/lib/lead-validation.ts` — identical rules on both sides.
- Verification: `POST /api/verify` → certificate-code lookup.
- Promotions: `src/data/promotions.ts` feeds the banner and offer
  cards today; the `site_promotions` table (migration `0005`) and
  admin CRUD live in the `gradespot-axon` repo's Phase 3.
- WhatsApp: `src/lib/wa.ts` builds every wa.me link with a
  context-matched pre-filled message.
- SEO/AEO: `src/lib/metadata.ts` (self-canonicals, explicit OG image
  per page, `og:locale en_IN`) + `src/lib/schema.ts` (strict schema)
  + `src/lib/aeo.ts` ("In short:" answer-first boxes).

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Node.js 18.18 or newer. `.env.local` holds the Leo Supabase project's
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` — never committed. Without them the site
runs entirely on the local data.

## Deploying

This repo is NOT git-connected to Vercel. Production is deployed by API
upload from the local working copy
(`deploy_gradespot_leo_preview.py`). Pushing to GitHub deploys nothing.
Vercel project `gradespot-leo-build-app`, Mumbai region.
**Live:** https://gradespot-leo-build-app.vercel.app

## Rules for contributors (additions to the rules above)

- **Logo artwork unmodified, always.** The logo plate is the approved
  luminous parchment + halo design — do not experiment with it without
  Aravind's word.
- **No invented content.** No fees, dates, trainers, stats, reviews,
  certificates or placement claims beyond the published record. Gaps
  stay logged in `DECISIONS.md`, never filled with guesses.
- **`/register` is lead registration only** (course/demo enquiry on
  `/api/leads`) — no user accounts; accounts stay deferred to the
  LMS/admin phase.
- **`/partner-with-us` is a discussion invitation only** — no
  terms, no ROI, invitation-only framing.
- **Branches:** `main` is the single line since 2026-10-24. Features
  on branches; merges only on Aravind's review.
- **Free tier only.** All assets downloaded into the repo — nothing
  hotlinked, no remote code fetched.
- **`.env.local` is never committed.**
