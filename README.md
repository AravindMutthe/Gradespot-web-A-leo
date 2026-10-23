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

## Status

Scaffold only (2026-10-23). The design direction gets proposed and approved before the build starts — no code yet.
