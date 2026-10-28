# Final Design Phase 1 — Header-first — Checkpoint 2026-10-28

Stage: Final design PHASE 1 (header-first), parallel workstream.
Branch: `feat/frontend-v3-final-design` (own branch; never pushed to
`feat/frontend-v3`).
Base: see "Base deviation" below — read it first.

## Base deviation (disclosed, not hidden)

The brief required branching from `bf38e57` and stopping if
`feat/frontend-v3` HEAD differed. When this stage started, HEAD had
already advanced to `1e6a441` — the sibling detail-hero-buttons
commit, whose parent IS `bf38e57` (verified from the sibling
worktree's local log and the GitHub API). Branching from stale
`bf38e57` would have created a needless integration conflict with
exactly the work the parent planned to integrate next. This branch
therefore starts from `1e6a441` (a strict child of `bf38e57`) and
includes the buttons work. `feat/frontend-v3` itself was never
touched by this stage, and this branch is fully reversible. The
parent may still reject the deviation; nothing on `feat/frontend-v3`
depends on this branch.

## Changed (14 files + 2 new)

- `src/app/lp/[slug]/page.tsx` — LP header logo swap
  (`logo-light.png` → `logo.png`, file swap only, neither logo
  file edited); LP Call pill gains `shrink-0` (NO nowrap — the LP
  max-zoom structural test forbids it, and the LP bar already wraps
  via flex-wrap); LP footer clearance `nav:pb-8` → `nav:pb-20`
  (the 32px desktop padding was below the 44px bar height, which
  is exactly how the bar overlapped footer links on desktop).
- `src/components/SiteStickyBar.tsx` (new) — mobile-only
  (`md:hidden`) sticky bar, Call + Enquire only, never a demo
  booking. Rendered by Chrome on site pages only.
- `src/components/Chrome.tsx` — renders the site bar + a
  mobile-only `h-[68px]` spacer after the footer (clearance, so the
  bar can never cover a CTA or footer link). LP branch untouched:
  bare `<main>` only, no site bar.
- `src/components/Footer.tsx` — column subheads sans (the one
  `font-display` use at 17px removed); Support link "Register" →
  "Course enquiry" (URL `/register` unchanged).
- `src/components/Header.tsx` — desktop Call pill gains
  `whitespace-nowrap shrink-0` (stops the multi-line pill);
  Support link "Register" → "Course enquiry" (URL unchanged).
- `src/components/LpLeadForm.tsx` — helper reworded to "3 required
  fields — name, phone, and when you can start. Email is optional."
- `src/lib/lp-model.ts` — SOC outcome strips a trailing " aligned"
  from the certification value before composing, so the sentence
  reads "Aligned with EC-Council CSA / SC-200 — aligned, not
  certified." (single "aligned", meaning unchanged).
- `src/app/trainings/courses/page.tsx` — compare bridge under the
  topic grid: "Not sure which track fits your background? Compare
  courses side by side by their published coverage areas." →
  `/compare`. No promise beyond area-level comparison.
- `src/app/globals.css` — new `@utility row-hover`: flat surface
  tint + soft shadow on hover, visible focus outline. NO gradient,
  NO border gradient, NO large image cards.
- `src/app/trainings/category/[slug]/page.tsx`,
  `src/app/services/page.tsx`, `src/app/trainings/courses/page.tsx`
  — `row-hover` on the flat row lists (courses directory links,
  category rows, service + pathway rows); title links gain
  `focus-visible:underline`.
- `src/app/page.tsx` — homepage CTA "Register for a Free Demo
  Class" → "Ask about a demo class" (URL `/register` unchanged).
- `src/data/courses.ts` — vocabulary pass, rendered copy only:
  17 Enroll CTA occurrences reworded to Enquire language (2
  summaries, 15 section-body paragraphs). See "Left
  intentionally" below.
- `tests/final-design-phase1.test.ts` (new, 13 tests).
- `tests/lp-rebuild.test.ts` — LP logo expectation updated to the
  dark file (with Phase 1 comment); max-zoom no-nowrap rule kept.
- `tests/trainings-index.test.ts` — the two flagged summaries are
  now clean (flag list `[]`).

## Left intentionally (not oversights)

- Skipped-section "Enroll/Enrol in …" headings and their bodies:
  never rendered — the detail skip rule depends on those headings.
  Rewording them would make misattributed sections render.
- DM FAQ process questions ("Who is eligible to enroll…?", "How
  can I enroll…?" + enrollment-form answer): they describe the
  enrollment process/eligibility itself, not a marketing tail;
  rewording them to "enquire" would misstate the process. NOTE for
  the parent: this FAQ pair still emits in DM FAQPage schema (the
  DM page is a sample page; its visible sections list is empty,
  but `courseFaqs()` still feeds schema). Pre-existing Stage 5
  behavior, not introduced here — needs a content decision, not a
  silent rewrite.
- `/register` page title/route unchanged (URL-stability rule);
  only the links pointing at it were reworded.
- DemoBand / EnquiryRail untouched: neither renders on any page
  (detail template removed them); dead code, not a surface.
- Promotions ticker "Free Demo Classes" untouched: not one of the
  briefed vocabulary surfaces; flagged here for the vocabulary
  pass's next round, not silently changed.

## Pending (explicitly excluded, not built)

- Design-token FINALIZATION and door-polarity final design:
  tokens stay MEASURED CANDIDATES pending Gate 1 owner review.
  No token is presented as approved; no door-accent system was
  built and no brand split was introduced.
- Adobe Express art: nothing from Adobe enters the repo in this
  phase (generations uninspected/parked).
- No content-fact, nav/taxonomy, search/sitemap, lead-contract,
  or sample-marker changes.

## Verification (all green)

- Tests: 234/234 (baseline 221 + 13 new), 15 files.
- Fresh-install build: `rm -rf node_modules .next`, `npm ci`,
  `npm run build` clean — 115/115 pages.
- `tsc` 0 errors; lint 0 errors (2 pre-existing warnings in files
  untouched by this stage).
- Built-HTML spot checks: LP header serves `logo.png`; SOC outcome
  sentence single-aligned; courses page has the compare banner;
  homepage has zero "Register for a Free Demo Class" and carries
  "Ask about a demo class" + "Course enquiry"; Security+ detail
  HTML has zero "Enroll"; site sticky bar renders on site pages
  and is absent on LP pages.
- Two test conflicts found and resolved honestly, not papered
  over: (1) the LP test had pinned the defective light logo —
  updated with a comment; (2) my first LP pill used nowrap, which
  the LP max-zoom test forbids — nowrap removed from the LP pill,
  kept only on the site header pill.
