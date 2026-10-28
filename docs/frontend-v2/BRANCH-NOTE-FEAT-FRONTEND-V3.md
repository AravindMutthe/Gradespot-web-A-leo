# Frontend 3.0 — Branch working note (feat/frontend-v3)

Working note for the branch only. Not a content change, not a design approval,
not an authorization for anything beyond this branch. Final tokens, hero
wording final approval, and all five release gates remain owner-controlled.

## Baseline (Stage 0, verified 2026-10-28)
- Repo: AravindMutthe/Gradespot-web-A-leo. Branch: feat/frontend-v3, created
  locally from verified clean main 289fe2b3ab1466da5f2a6e32c20364def752edf6.
  Remote main was verified via the GitHub API before branching and matched
  exactly; if it moves, stop and reconcile — never silently branch from a
  different baseline.
- Clean main inventory (verified from git/filesystem, not summaries):
  234 tracked files (public/ 136, src/ 80, supabase/ 5, scripts/ 3, root 10;
  no docs/ on main). 32 page files + 2 API routes (api/leads, api/verify).
  Sitemap expands to 93 published URLs. Historical 54/55 counts are NOT
  authoritative.
- Content sources (unchanged by this branch): 36 courses in src/data/courses.ts
  (11 full-detail, 25 catalogue-only, all 25 program_status PENDING in the
  v1.1 sense — catalogOnly: true, no invented detail); 10 categories
  (AWS, Cisco, CompTIA, Cybersecurity, Design & CAD, Digital Marketing,
  Medical Coding, Microsoft Azure, Networking, Programming & Data).
  12 services in src/data/services.ts, 7 divisions (per v1.1; division
  grouping itself is a Stage 3 concern and is not decided here).
- Stack on main: Next.js 16.4.3, React 19, Tailwind CSS 4, TypeScript 5,
  Zod, Supabase JS only. No UI library, no Lucide, no Motion. No test
  framework declared in package.json on main; Vitest 3.2.7 is present in
  the local node_modules and is used to run tests/ in this branch only.
- Migrations in repo: 0004 applied (leads.source, leads.whatsapp_opt_in);
  0005 (promotions) NOT applied — getPromotions reads local data;
  0006 (catalogue contract fields) DRAFT ONLY, NOT APPLIED.

## Protected (do not touch)
- main branch: never written to. Production deployment
  (gradespot-leo-build-app.vercel.app, old pre-Nexus build, deployment
  dpl_35zRHc3ofdCfVxcjyH8p7XVJNBar) is NEVER retargeted by this branch.
  SSO changes are owner-only. No push and no preview is created until
  after the Stage 1 checkpoint report (preview authority sits with Leo;
  production deployment is owner-only, always).
- Content facts: no invented prices, trainers, dates, ratings, placement
  claims, or syllabus. Employer wall stays OFF (no employer logos shown).
  No vendor/official logos generated or added. Logo files
  (public/images/logo.png, logo-light.png, 1600x498) are never edited,
  recoloured, or cropped.
- No Atlas, Replica, portfolio, Royal Salon, or ADP content in this branch.
- The superseded branch feat/frontend-v2-platform (ca1d954) is read-only
  reference for what NOT to repeat (Nexus lineage). Nothing is copied
  from it except reading it as reference.
- Pre-existing untracked docs in the working tree (FINAL-CALL, MATRIX,
  older research docs) stay untracked; they are NOT committed by this
  branch's work.

## Change boundary (refined, Leo as lead on Das's recommendation)
Frontend 3.0 may change presentation, frontend-local search generation,
automated tests, and narrowly necessary compatibility/security corrections
to the existing Leo lead and verification routes, PROVIDED the external API
contracts remain compatible and no database schema, content fact, production
configuration, or external system is changed. Anything outside this boundary
requires separate owner authorization. In particular:
- Stage 0/1 do NOT change the lead/verify routes. The regression-test
  scaffolding in tests/ records main's current behaviour against the v1.1
  contract; correcting main's 201-even-for-log-only defect is Stage 7 work
  and must preserve existing external route and consumer compatibility.
  A breaking request-contract change, if ever needed, is escalated, never
  silently introduced.

## Lead / verification behaviour on main (honest record, Stage 0)
- POST /api/leads: validates via src/lib/lead-validation.ts (shared with
  client forms), strips the `course` field before storage, then returns
  HTTP 201 in ALL cases, with body { ok: true, stored: "supabase" | "log",
  id }. When storage falls back to server-side logging, the status is
  still 201 — this is the known defect against the v1.1 contract.
- createLead (src/lib/data.ts): inserts via the service-role client when
  configured (full insert incl. source + whatsapp_opt_in, with a core-column
  retry on failure); otherwise logs the lead server-side and returns
  stored: "log" with no id. No idempotency key, no durable queue, no
  202/503 distinction on main.
- POST /api/verify: Zod-validates { code } (3–80 chars), looks up the
  certificates table, returns { found: true, certificate: { code,
  studentName, course, issuedOn } } or { found: false }. No personal data
  beyond the certificate record itself is returned; unknown codes honestly
  return found: false. Verification behaviour is preserved until an
  approved Axon replacement contract exists (Stage 7, not Stage 0/1).
- v1.1 contract (specification for Stage 7, NOT main's behaviour):
  durable 201 Created (stable lead ID) / 202 Accepted ONLY with a proven
  durable queue (recoverable processing ID + explicit pending state) /
  503 Unavailable (neither safely accepted, safe retry path); explicit
  consent fields including whatsapp_opt_in; idempotency-key scope/expiry,
  duplicate handling, and retry behaviour defined. A WhatsApp click is a
  contact action only, never proof of delivery.

## Stage plan (this task: Stage 0 + Stage 1 only)
- Stage 0: baseline verification (this note) + lead/verify regression-test
  scaffolding (tests/lead-contract-baseline.test.ts).
- Stage 1: single new token system (src/app/globals.css rewritten as
  Frontend 3.0 tokens; no v1 tokens alongside, no Nexus lineage) + global
  chrome (new Header/Footer with task-based IA: Training, IT Solutions,
  Resources, Company, Support, Legal; existing route slugs unchanged).
- Stage 2+ (NOT this task): homepage, trainings, services, remaining
  templates, build-time search, lead/verify compatibility work.
