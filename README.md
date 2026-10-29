# gradespot-leo-website

Formerly Gradespot-web-A-leo.

## Purpose

Leo's own build of the GradeSpot website — built from scratch, with its
own design, not depending on WordPress. It serves the same real business
as the official site: trainings, services, lead enquiries, and
certificate verification, plus additional features the old site never
had (free-demo flows, `/register` lead registration, `/partner-with-us`
discussions, comparisons, and city landing pages).

## Current status: ACTIVE — canonical candidate, future production replacement

- **Active.** Latest commit fetched at scan time: `474bf99`
  (2026-10-29T06:27:07Z, "Narrow Call/Enquire swap to Header pills +
  SiteStickyBar only").
- **Canonical candidate.** Per the owner's 2026-10-29 decision, Leo — not
  the Replica — is the canonical candidate and the future production
  replacement for the WordPress site (`gsitssolutions.com`).
- **Cutover has NOT happened yet.** The WordPress site remains the live
  production site until a separate production/cutover approval. Do not
  describe Leo as already live on `gsitssolutions.com`.
- **v1 approved 2026-10-24** (per the current README).

## What this repo is NOT

- Not the WordPress site, and not a copy of its theme, layout, fonts,
  or buttons. Only the real content and menu options carry over.
- Not the Replica. The Replica (`gradespot-rebuild-website`) is now the
  temporary experiment.
- Not the backend or the admin. Admin control is a separate,
  not-yet-live phase (see "Still open" below).
- Not a site with user accounts. `/register` is lead registration only;
  accounts are deferred to a later LMS/admin phase.
- Not a partnership agreement. `/partner-with-us` is a discussion
  invitation only — no terms, no ROI claims.

## Design (as stated in the current README)

"Prospectus" design: paper/ink with vermilion signal colour, self-hosted
Fraunces (display), Instrument Sans (text/UI), and IBM Plex Mono
(codes/labels). Light and dark themes are stated to meet WCAG 2.2 AA
contrast in the README; that contrast claim was **not re-measured in
this draft task** and should be re-checked before any accessibility
claim is published. The official logo artwork stays unmodified.

## Tech stack (only as evidenced in the current README)

- Next.js 15, React 19, Tailwind CSS v4, TypeScript, zod
  (form/API validation), `@supabase/supabase-js`
- Data flow (per README): page → `src/lib/data.ts` → the Leo Supabase
  project when environment variables are present, otherwise the local
  files in `src/data/`
- Local assets only — nothing hotlinked, per the README's own rule
- The README states 90 routes, 36 trainings, and 12 services. Those
  counts were **not re-counted in this task**; treat them as
  README-stated figures, not freshly verified counts.

## How to run / test (as evidenced in the current README)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — must pass before any PR
npm start        # preview the production build locally
npm run lint
```

Prerequisites stated in the README: Node.js 20 LTS + npm, and Git.
No accounts are needed to start (the site runs on local data without
`.env.local`); Supabase keys are needed only for live-data work and
must never be committed (`.env.local` is never committed).

The current README states there is **no automated test suite** in this
repo — verification is the production build + lint + manual checks
(home, one training page, and the other checks listed in the README).
Do not claim a test suite exists.

## Deploy status — flagged, do not treat as settled

- The current README states: live at `https://leo-web-a.vercel.app`,
  Vercel project `leo-web-a`, API-upload deploys, **not git-connected**,
  Mumbai region, and "pushing to GitHub deploys nothing".
- A later conversation record (2026-10-29 morning) states the Leo repo
  was connected to Vercel via the GitHub App and that pushes to `main`
  then auto-deploy production. **These two records conflict.**
- This draft therefore does **not** settle the deploy method. Verify in
  Vercel (project, git connection, production branch, and current
  deployment) before relying on either statement, and before describing
  any URL as the current production URL.
- The old Leo URL `gradespot-leo-build-app.vercel.app` appears in older
  records; a 2026-10-29 commit renamed the production domain to
  `leo-web-a`. Treat the old URL as historical unless re-verified live.

## Still open

- Organisation: `gradespot-official` has **not** been created. This repo
  remains under the personal account `AravindMutthe`. Organisation
  creation is deferred to a later, separate decision.
- Admin: the promotions seam (`src/data/promotions.ts`, migration
  `0005`) is built admin-shaped today, but admin control itself is
  **not live** in this repo. It is planned via the separate Axon
  backend repo (`gradespot-api`), which is still scaffold-only.
- Contracts / infrastructure: no separate `gradespot-contracts` or
  `gradespot-infrastructure` repo has been split out yet.
- No prices, learner counts, placement claims, or ISO/AICTE
  certifications are asserted in this draft. The current README
  mentions ISO/AICTE emblem cards as design elements; it does not, by
  itself, verify any certification, and none is claimed here.
- Branching: the current README's claim of a single `main` branch since
  2026-10-24 is stale (later commits reference a
  `feat/main-finish-gates` branch). Confirm the current branch list
  before stating a branching rule.
