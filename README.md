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
- **Branches:** `main` stable; features on branches; merges only on Aravind's review.

## Design system (v1, built 2026-10-23 on branch `leo-build-v1`)

Aravind's brief: full design freedom (colors, fonts, styles, corporate menus/themes) with content and menu options identical to the replica, the researched conversion instructions followed — refined the same day to: **the logo stays the official logo unmodified, and the palette is drawn from the logo's colors.**

- **Logo:** the official GradeSpot logo files, unmodified — `logo-light.png` on the navy header/footer, `logo.png` where the replica uses it. No recoloring, no filters, no redraws.
- **Palette (from the logo — its orange + deep navy):** brand orange `#F7631B` (CTAs, accents, highlights, icon tints), brand dark `#D9520F`, brand soft `#FDEEE4`; deep navy `#0A2236` (header, ribbons, structural blocks), navy deep `#061724` (utility bar, footer), logo navy `#0E2B3D` (headings); body slate `#47596B`; surface `#EEF3F8`. Navy does the structural work, orange is the accent — the inverse emphasis of the replica.
- **Fonts (self-hosted variable woff2 in `public/fonts/`):** Plus Jakarta Sans 600–800 for display/headings, Inter 400–700 for body.
- **Header:** slim navy-deep utility bar (location, email, office hours, socials, phone) + deep-navy main bar with the light logo, sentence-case semibold nav, a **Trainings mega-menu** (categories rail + popular trainings grid + navy footer strip) and the same Resources dropdown. Menu options and destinations are exactly the replica's: Home / About Us / Trainings / Resources / Digital (external) / Services / Contact Us + Get Started.
- **Home hero:** light corporate split hero — gradient surface, Jakarta headline with orange accent word, pill CTAs, course image in an orange offset frame with a course chip link (the replica's hero is a dark full-bleed band).
- **Components:** 1200px container, pill buttons (orange primary with soft shadow, navy + outline variants), rounded-2xl bordered cards with hover lift, orange category chips, navy stats ribbon with orange numerals, gradient navy page heroes with an orange rule, orange-topped footer.
- **Conversion chrome (researched instructions):** floating WhatsApp button on every page and a mobile sticky Call / WhatsApp / Enquire bar — using only the one published number (+91 91826 54056). Lead forms stay ≤4 fields with source attribution; Course/FAQ/LocalBusiness schema, breadcrumbs, sitemap and robots carried over from the replica.

## Status

**v1 built and verified (2026-10-23, branch `leo-build-v1`).** Next.js 15 + React + TS + Tailwind v4, data/content layer ported from the replica (same Supabase project, same local fallback). `npm run build` passes; route parity with the replica is exact (21 app routes, 65 prerendered pages, identical sets; `next.config.ts` byte-identical so all 233 legacy redirects match); every route returns 200 and a full internal-link crawl is clean. Not deployed — no Vercel/Supabase project created; merges to `main` only on Aravind's review.
