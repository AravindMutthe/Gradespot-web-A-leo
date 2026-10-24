# gradespot-leo-build-app

Leo's own build of the GradeSpot website — from scratch, own design,
not depending on WordPress; works as the original site plus additional
features, dynamic with admin-configured frontend.

## Why this repo

Same WordPress problem, different answer. Replicating the old design
keeps the old site's limits in spirit. This repo exists so GradeSpot
gets a website designed from scratch — not depending on the WordPress
design at all — while serving the same real business.

## What it is building

A from-scratch website with its own design: "Prospectus" — paper and
ink with vermilion signal colour, Fraunces + Instrument Sans + IBM
Plex Mono, rich mega menu, scrolling ticker board, promo banners.
Same real content as the official site (36 trainings, 12 services,
team, testimonials), plus additional features the old site never had.

## Why it is building it

It works same as the original site — same trainings, services,
content, lead enquiries, certificate verification — and serves
additional features: free demo flows, `/register` lead registration,
`/partner-with-us` discussions, comparisons, city landing pages,
local pages, SEO/AEO (self-canonicals, strict schema, llms.txt, OG
cards). And it works as a dynamic website like Royal Salon: the
frontend is configurable from admin — the promotions seam
(`src/data/promotions.ts`, migration `0005`) is built admin-shaped
today, and admin control itself arrives via `gradespot-axon`.

Status: v1 approved 2026-10-24, live at
https://gradespot-leo-build-app.vercel.app.

New here? Read in this order: this README → `DECISIONS.md` (§19–§20
design, §25 SEO/AEO) → `src/data/site.ts` → `src/app/page.tsx` →
`src/lib/metadata.ts` → `src/lib/data.ts` →
`src/data/promotions.ts`.

## Design

**Design — "Prospectus" (v1, DECISIONS.md §19–§20):** the site reads
like a world-class institute prospectus crossed with a course-code
ledger. Aravind's v1 mandate: full creative control — forget the
original site's theme, style, layouts, fonts, colours and buttons.
Only the menu options carry over (minus three logged trims), the
official logo artwork stays unmodified, and the content truth layer
is untouchable.

**Layout:** ink mono utility strip + light paper bar with the dark
logo; Trainings mega-menu and Resources dropdown restyled as paper
panels. Menu = Trainings / Services / Pricing / About Us / Resources
/ For Colleges / For Institutes (pill) + Register + Request a
Callback. v1 trims (logged in §19): Home removed (logo is home),
Contact Us removed from the bar (duplicated by the Callback CTA;
kept in footer), Digital moved into Resources. Home order: hero →
"In short:" answer-first box → What We Do → About (9 Years +
signature) → ISO + AICTE emblem cards on white plates → counters →
Top Class Trainings → Services → No-Cost First Steps (free
counselling, syllabus on WhatsApp, free certificate verification) →
For Institutes / Axon products → Learner Voices → FAQ → Free
Consultation footer. A floating dark/light toggle (bottom-right)
switches themes; the logo plate swaps per theme.

**Structure:** design tokens → self-hosted fonts → components →
pages. Layered course cards (image gradient, Free Demo badge,
duration chip); ghost-numeral service/offer cards; a CSS scrolling
Ticker board (featured trainings + free services, reduced-motion
safe); a data-driven PromoBanner and OfferCards row, fed by the
admin-shaped promotions seam (`src/data/promotions.ts`, migration
`0005`). Content rule: only true offers (free demo, free
counselling, syllabus on WhatsApp, free certificate verification) —
no invented discounts or urgency.

**Theme:** paper `#FAF6EE`, parchment `#FFFDF8`, cream `#F2EADA`,
ink `#201913` / ink-deep `#171208`, line `#E0D4BE`; signal vermilion
`#B23A0A` (logo orange deepened one step so text/buttons meet WCAG
2.2 AA — 5.6:1 on paper, 5.0:1 on cream, 6.0:1 under white text),
true logo orange `#F7631B` reserved for display accents on ink
(6.0:1), brand-dark `#9A3412`, brand-soft `#FBEADA`; WhatsApp green
deepened to `#0B7A43` (5.4:1 with white); body text `#5A4B38`
(7.8:1). Fonts, self-hosted variable woff2 in `public/fonts/`:
Fraunces (display serif, 100–900 + italic), Instrument Sans
(text/UI, 400–700), IBM Plex Mono (codes, labels, eyebrows). Dark
theme = inverted light palette, AA measured in both themes. The logo
plate is the approved original: luminous parchment plate + halo,
per-theme logo swap — never recolored, filtered or swapped by any
theme.

## Complete folder / directory structure

```
.
├── DECISIONS.md            # design rulings, SEO/AEO passes, open gaps
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts          # security headers, legacy redirect map
├── package.json            # scripts: dev, build, start, lint
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.ico
│   ├── fonts/              # Fraunces, Instrument Sans, IBM Plex Mono (self-hosted woff2)
│   ├── images/             # all images, local, never hotlinked
│   │   ├── blog/
│   │   ├── certifications/
│   │   ├── courses/
│   │   ├── employers/
│   │   ├── og/             # 38 local 1200×630 cards, built dynamically by metadata.ts
│   │   │   ├── blog/
│   │   │   ├── compare/
│   │   │   └── services/
│   │   ├── team/
│   │   ├── aicte-logo.png
│   │   ├── iso-logo.svg
│   │   ├── map-dilsukhnagar.jpg
│   │   ├── logo.png
│   │   ├── logo-light.png
│   │   └── signature.png
│   ├── llms.txt
│   └── llms-full.txt       # generated, real data only (see scripts/)
├── scripts/
│   ├── generate-llms-full.py   # rebuild llms-full.txt from data files only
│   ├── generate-og-cards.py    # build local OG cards (re-run when a fallback title changes)
│   └── sitemap-lastmod.py      # lastmod map from git history, paste into sitemap.ts
├── src/
│   ├── app/                # 90 routes (each dir holds its page)
│   │   ├── about-us/
│   │   ├── accessibility/
│   │   ├── api/
│   │   │   ├── leads/      # POST enquiry endpoint
│   │   │   └── verify/     # POST certificate-code verification
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── career-support/
│   │   ├── certificate-verification/
│   │   ├── compare/
│   │   │   └── [pair]/
│   │   ├── contact-us/
│   │   ├── faq/
│   │   ├── for-colleges/
│   │   ├── for-institutes/
│   │   ├── lp/
│   │   │   └── [slug]/     # city × course landing pages
│   │   ├── partner-with-us/
│   │   ├── pricing/
│   │   ├── register/       # lead registration only, no accounts
│   │   ├── resources/
│   │   ├── services/
│   │   │   └── [slug]/     # 12 service pages
│   │   ├── student-certifications/
│   │   ├── team-members/
│   │   │   └── nikhil-duth-d/
│   │   ├── terms-and-conditions/
│   │   ├── testimonials/
│   │   ├── training-institute-in-dilsukhnagar-hyderabad/
│   │   ├── trainings/
│   │   │   └── [slug]/     # 36 course pages
│   │   └── why-choose-us/
│   ├── components/         # shared UI, including ui.tsx (site FAQs)
│   ├── data/               # 14 files; local fallback when Supabase is absent
│   │   ├── articles.ts
│   │   ├── blog.ts
│   │   ├── catalogue-nav.ts
│   │   ├── certifications.ts
│   │   ├── comparisons.ts
│   │   ├── course-details.ts
│   │   ├── courses.ts      # 36 courses
│   │   ├── employers.ts
│   │   ├── pages.ts
│   │   ├── promotions.ts   # admin-shaped promotions seam
│   │   ├── services.ts     # 12 services
│   │   ├── site.ts         # business facts (phones, counters, address)
│   │   ├── team.ts
│   │   └── testimonials.ts
│   └── lib/
│       ├── aeo.ts              # answer-first summaries, published fields only
│       ├── course-faqs.ts
│       ├── data.ts             # Supabase-or-local data layer
│       ├── lead-validation.ts  # one shared ruleset: client forms AND /api/leads
│       ├── metadata.ts         # dynamic titles, descriptions, OG images
│       ├── schema.ts           # strict structured data (one Organization @id)
│       ├── supabase.ts         # Supabase client
│       └── wa.ts               # WhatsApp deep links, always pre-filled
└── supabase/
    └── migrations/
        ├── 0001_init.sql
        ├── 0002_gap_additions.sql
        ├── 0003_course_images.sql
        ├── 0004_lead_source_whatsapp.sql
        └── 0005_site_promotions.sql
```

Data flow: page → `src/lib/data.ts` → the Leo Supabase project when
`.env.local` is present, otherwise the local files in `src/data/`.
Leads share `src/lib/lead-validation.ts` on client and server, so the
server never accepts what the client rejects. Promotions flow through
`src/data/promotions.ts` today; the `site_promotions` table
(migration `0005`) and admin CRUD live in `gradespot-axon` Phase 3.

## How to work with it

### Prerequisites

- Node.js 20 LTS + npm, and Git.
- No accounts needed to start: without `.env.local`, the site runs
  entirely on the local files in `src/data/`. A Supabase project is
  only needed for live-data work (keys via the Secure Vault / Vercel,
  never committed).
- Stack: Next.js 15, React 19, Tailwind CSS v4, TypeScript, zod
  (form/API validation), `@supabase/supabase-js`.
- Python 3 only if you regenerate derived files (llms-full.txt, OG
  cards) — see step 4 below.

### Build and test locally

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — must pass before any PR
npm start        # preview the production build locally
npm run lint
```

There is no automated test suite in this repo — verification is the
production build + lint + manual checks: home, one training page,
one service page, `/register`, `/partner-with-us`, one compare page,
one landing page, the lead form, and certificate verification.

### Feature development → PR for review

1. Start from latest `main`: `git checkout main && git pull`.
2. Branch, never commit to `main` directly:
   `git checkout -b feature/<short-name>`.
3. Build the feature following the Design and Rules sections above —
   own design (never WordPress-dependent), content from the official
   record only, assets downloaded into the repo, nothing hotlinked,
   no invented data.
4. Repo-specific upkeep when your change touches these:
   - Data feeding `llms-full.txt` or OG cards changed → re-run
     `scripts/generate-llms-full.py` / `scripts/generate-og-cards.py`.
   - A route added or removed → update the sitemap
     (`scripts/sitemap-lastmod.py`).
   - Promotions → edit the typed config in `src/data/promotions.ts`
     only; never invent offers.
   - Metadata/schema → go through `src/lib/metadata.ts` and
     `src/lib/schema.ts` (strict schema rules).
   - A database schema change needs a new file in
     `supabase/migrations/` and Aravind's approval.
5. Run `npm run build` + `npm run lint` + the manual checks above.
   Fix everything before pushing.
6. Push the branch and open a pull request into `main`, describing
   what changed and how you verified it.
7. Review: Aravind reviews every PR; merge happens only on his word.
   Merging does NOT deploy — production is API-uploaded from the
   local working copy (Vercel project `gradespot-leo-build-app`)
   only when he commissions it.

## Rules

- **Own design, never WordPress-dependent.** This repo does not copy
  the old site's theme, layout, fonts or buttons — only the real
  content carries over.
- **Logo artwork unmodified, always.** The approved luminous
  parchment + halo logo plate is not experimented with without
  Aravind's word.
- **Same real content, same truth layer.** Never invent fees, dates,
  trainers, stats, reviews, certificates or placement claims. Gaps
  stay logged in `DECISIONS.md`, never filled with guesses.
- **Dynamic like Royal Salon: frontend configurable from admin.**
  The promotions seam is admin-shaped today; admin control arrives
  via `gradespot-axon`.
- **`/register` is lead registration only** (course/demo enquiry on
  `/api/leads`) — no user accounts; accounts stay deferred to the
  LMS/admin phase.
- **`/partner-with-us` is a discussion invitation only** — no terms,
  no ROI, invitation-only framing.
- **Branches:** `main` is the single line since 2026-10-24
  (`leo-build-v1` crowned as `main`). Features on branches; merges
  only on Aravind's review.
- **Deploying:** NOT git-connected. Production is API-uploaded from
  the local working copy (Vercel project `gradespot-leo-build-app`,
  Mumbai region). Pushing to GitHub deploys nothing.
- **Free tier only.** All assets downloaded into the repo — nothing
  hotlinked, no remote code fetched.
- **`.env.local` is never committed.** Supabase keys live in the
  Secure Vault and in Vercel's server settings, never in chat or git.
