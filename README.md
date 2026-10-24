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
