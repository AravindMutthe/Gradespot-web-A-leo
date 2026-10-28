# LP Rebuild Checkpoint — Frontend 3.0, 2026-10-28

Branch: `feat/frontend-v3`. Parent: `a19477a` (hero-visibility
fix). Preview-only stage: no merge, no production deploy, no
DB write, no live lead submission. All 11 LP URLs unchanged.

## 1. Consolidated layout matrix (Das 7 steps × Leo 13 steps)

Das's 7-step spine is the section order; Leo's 13 steps map
into it (no side-by-side orders):

| Das step | Leo steps mapped in | What renders |
|---|---|---|
| Chrome (above spine) | slim strip + logo bar | Location line; logo + phone pill only. No site nav/search/footer. Bar wraps (flex-wrap) — max-zoom rule. |
| 1 Compact hero | hero (form REMOVED) | Eyebrow (domain category) + H1 + CTAs + summary card (duration / mode / location / certification / vendor mark). Form moved to step 3 (Das deviation from Leo's hero-form pattern, recorded). |
| 2 Learning overview | facts strip (part) | Level / mode / location cards + cybersecurity framing line (variant b only). |
| 3 Enquiry panel | final CTA (form part) | Enquiry info (batch/schedule/fees confirmed on enquiry; demo = ask-about; syllabus shared after enquiry via WhatsApp/mail) + LpLeadForm. Grid `1fr 380px` desktop, stacked mobile. |
| 4 Syllabus and practical topics | topics | Verified module AREAS as rows (two-column when content supports it, one column mobile) + gated full-syllabus block (heading + enquiry CTA). Expandable rows DEFERRED: no per-topic detail exists in source to expand into; the gated block is the detail route. Labs: none (none approved). |
| 5 Intended audience | who + roles (who part) | `who` string only. Roles live in outcomes, not here. |
| 6 Learning outcomes | who + roles (roles part) + cross-link (outcomes part) | Certification-alignment qualifier (preparation / aligned / completion) + preparation-role pills + DM measurement line (variant c only). |
| Proof | proof | Matched testimonials only (AZ-104, SOC), after outcomes, before cross-link. |
| Cross-link | cross-link | Link to the verified `/trainings/<slug>` course page. No LP-to-LP links. |
| 7 Final enquiry | FAQ → final enquiry (collapsed) + final CTA | Final CTA + WhatsApp alternative. NO FAQ section (no source-supported answers exist) and NO FAQPage schema. |
| Chrome (below spine) | footer + sticky bar | Neutral footer (no legal-entity claim) + sticky Call / WhatsApp / Free Counselling bar. |

Leo steps OMITTED, with reason: highlights (no verified
source — would duplicate facts); slim-strip extras (folded
into chrome); separate FAQ (collapsed per §4 of the
reconciliation amendment).

## 2. Sizing spec as applied (Das proposals, not measurements)

- Container: `wrap` = max-width 1200px, padding-inline 20px
  mobile / 24px ≥768px. Matches Das 1200px max; gutters
  24px desktop (within Das 24–32) and 20px mobile (within
  Das 16–20).
- Hero: 60/40 text-to-summary desktop
  (`lg:grid-cols-[1.6fr_1fr]`), single column mobile.
- Hero heading: `text-4xl` (36px) mobile, `md:text-[46px]`
  desktop — within Das 30–36 / 40–48. Kept verbatim from
  the hero fix.
- Enquiry panel: grid `1fr 380px` desktop (within Das
  320–380), full width after introduction on mobile.
- Curriculum cards: two columns (`md:grid-cols-2`) when
  content supports it, one column mobile; topic rows gap
  12px (within Das 12–16).
- Card radius: `rounded-2xl` = 16px (within Das 12–16).
- Primary CTA: site `btn-primary` = 50px min-height —
  DEVIATION from Das 44–48px by +2px (generous side, site
  button consistency kept). NOT a WCAG claim: WCAG 2.2 AA
  minimum is 24×24; 44–48px is Das's usability preference.
- Fewer cards, stronger hierarchy: no card around every
  paragraph; NO fixed-height cards (test-pinned).

## 3. Vocabulary / source-status matrix

Rule: a term enters LP copy ONLY when that course's source
supports it. LP copy uses ONLY model fields (who / level /
certification / areas / roles = [V] verified or [sample]) +
structural copy. Das's per-LP candidate terms are [P]
proposed unless the source backs them — [P] terms stay out.

| LP | Variant | Topics source | Roles source | Outcome line |
|---|---|---|---|---|
| AZ-900 | cloud-infra | [V] areas | [V] filtered sections | Prepares for Microsoft AZ-900 — preparation, not award |
| AZ-104 | cloud-infra | [V] areas | [V] filtered sections | Prepares for Microsoft AZ-104 — preparation, not award |
| CCNA | cloud-infra | [sample] 6 areas | [sample] 3 roles | Generic preparation line (sample) |
| CCNP | cloud-infra | [sample] 6 areas, zero strings shared with CCNA | [sample] 3 roles, disjoint from CCNA | Generic preparation line (sample) |
| Network+ | cloud-infra | [V] areas | [V] filtered sections | Prepares for CompTIA Network+ (N10-008 / N10-009) — preparation, not award. Versions are the source string; currency of either version NOT asserted. |
| Security+ | cybersecurity | [V] areas | [V] filtered sections | Prepares for CompTIA Security+ (SY0-601 / SY0-701) — preparation, not award (same version caveat) |
| PenTest+ | cybersecurity | [V] areas | [V] filtered sections | Prepares for CompTIA PenTest+ (PT0-002) — preparation, not award |
| CEH | cybersecurity | [V] areas | [V] filtered sections | Prepares for EC-Council CEH v13 — preparation, not award |
| SOC | cybersecurity | [V] areas | [V] filtered sections | Aligned with EC-Council CSA / SC-200 aligned — aligned, not certified |
| Hardware | cloud-infra | [V] areas | [V] filtered sections (misattributed ethical-hacking roles section SKIPPED in model) | Course completion certificate |
| Digital Marketing | digital-marketing | [sample] 6 areas (incl. verbatim "Marketing analytics and campaign measurement", reused as the variant-c measurement line) | [sample] 3 roles | Generic preparation line (sample) |

Variant framing lines (presentation only, never taxonomy):
- (b) cybersecurity: "Coverage focuses on authorized
  testing and defensive practice." — framing from area
  vocabulary, not a syllabus claim.
- (c) digital marketing: "Measurement covered: marketing
  analytics and campaign measurement." — verbatim from DM
  sample areas.
- (a) cloud-infra: no extra copy (spine default).

Forbidden phrasing (test-pinned out of all LP model values):
guaranteed placement, job-ready in 90 days, become
certified, industry-approved training, official partner,
100% success, guarantee, 100% placement, salary, best /
top / No. 1, limited seats, countdown, certified-for-SOC /
completion, real-time projects with companies, internship
guaranteed, trainer names, batch dates, fee figures,
discount percentages. Vocabulary lock: Enquire / "Ask
about a demo" / never Register / never Enrol on LP.

## 4. LP sample inventory (verified vs sample per LP)

- Verified (8): AZ-900, AZ-104, Network+, PenTest+,
  Security+, Hardware, SOC, CEH — all values from repo
  detail model; no SampleTag, no DemoLegend.
- Sample (3, marked): CCNA, CCNP, Digital Marketing —
  sample duration (60 days, never a contested figure),
  sample mode (Classroom & online), sample areas, sample
  roles, sample summary, sample who/level/certification.
  Markers: violet `#6D28D9` (`--color-sample`) text +
  SampleTag per section + DemoLegend on the page +
  `sample: true` in the record. Tests enumerate every
  sample and fail if any renders without flag + tag +
  color.
- MERGE GATE UNCHANGED: zero sample markers before any
  production deploy. Demo images (vendor marks) are part
  of the same purge gate.

## 5. Honesty defects FIXED in this stage

- H1 gate fix carried forward (a19477a): LP hero now
  `bg-ink` + `text-white` h1 (15.74:1, same as detail hero).
- "Free demo class available" template assertion: REMOVED
  (replaced by "ask about a demo — availability confirmed
  on enquiry").
- Generated FAQ set + FAQPage schema: REMOVED (step 7
  collapses to final enquiry).
- Unmatched/default testimonial fallback: REMOVED. CEH
  no longer carries pallavi's SOC review; only AZ-104
  (Arif Syed) and SOC (M Vamsi) carry proof, matched by
  review text naming the course.
- Template-wide "hands-on labs" assertion: REMOVED (no
  labs section; none approved).
- Unverified footer legal name: REMOVED (neutral footer).
- LP lead form 503 gap: LpLeadForm now reads
  `body.message` (the 503 field) before `body.error`, so
  the honest not-confirmed copy surfaces; recorded panel
  now reads "received and recorded" + WhatsApp
  continuation, with NO timing promise. (Main LeadForm
  shares the read-`body.error`-only pattern — OPEN
  follow-up for the parent, NOT fixed in this stage.)
- SOC job-ready title/outcome: neutralized
  (`displayCourseTitle` + outcome line); SOC duration
  renders "Duration confirmed on enquiry" on LP (LP-stricter
  than the detail model, which still renders repo 90 days
  — flagged open item for the content pass).
- SOC/Security+ "Enroll" tails: LP renders NEITHER the
  course summary NOR the detail outcome anywhere.
- CCNP CCNA-copy: sample areas/roles are fresh generic
  enterprise networking, zero identical strings shared
  with CCNA (test-pinned).
- CCNA 45-vs-90: neither figure published on LP (samples
  use 60 days).
- LP slug resolution bug found by build inspection: the
  first rewrite passed the LP slug (with `-in-hyderabad`)
  straight to the model and prerendered all 11 LPs as
  error shells — fixed with `courseSlugForLpSlug` +
  round-trip tests. The build passing did NOT catch this
  (notFound shells still count as generated pages).

## 6. Honesty defects STILL OPEN (unchanged by this stage)

R1 (CCNA 45-vs-90), R2 (CCNP content), R4 (DM summary),
exam-version currency (CompTIA versions), Hardware/SOC
real syllabi, certification mapping, owner facts (which
courses carry completion certificates + criteria),
pricing placement + Set A/B, /careers-in-search,
internship terms + legal review, first real Training
programme curriculum, first real study guides, R1–R11
rows, C1 canonical DB, GitHub token confirm-or-revoke,
logo "lookalikes" question (Das explicitly opposes
imitations — recorded open for owner, do NOT build
lookalikes).

## 7. Reconciliation decisions (Leo vs Das vs owner)

- Order: Das 7-step spine ADOPTED, Leo 13 steps mapped
  into it (matrix §1). Leo hero-form pattern OVERRULED
  by Das (form in step 3) — overrule line: one clear
  primary action at the enquiry step reads better than a
  form above the fold on a text-first LP.
- FAQ: Das step 7 requires source-supported answers;
  Leo's generated set is NOT source-supported, so the
  earlier removal STANDS (no FAQ, no FAQPage).
- Vendor marks: owner demo-only overrule + official-first
  priority governs PREVIEW; Das R10 gate governs
  PRODUCTION. Applied: 4 downloaded demo images (see
  LP-R10-ASSET-REGISTER-2026-10-28.md), 0 owner-supplied
  files, 0 generic illustrations, 0 reserved mark slots.
  Das's "do not generate imitations" + owner "no
  lookalikes" both honored — no lookalike built.
- Sizing: Das proposals applied as spec, with the
  btn-primary 50px deviation recorded (§2) and the WCAG
  44px claim explicitly NOT made (WCAG 2.2 AA min 24×24).
- Expandable topic rows: DEFERRED (no per-topic detail
  in source); gated block is the detail route.
- Max zoom (owner standing rule): structural
  preconditions test-pinned (§8); visual proof owed.

## 8. Max-zoom structural checks added (tests)

- No `w-[Npx]` fixed widths (lookbehind excludes
  `max-w-[...]` caps), no `h-[Npx]` fixed heights, no
  `whitespace-nowrap`, no `min-w-[...]` in the LP
  template source.
- Hero heading `max-w-4xl` (wraps); enquiry grid
  `1fr 380px` (stacks); logo/phone bar `flex-wrap`
  (wraps); topics grid fractional; sticky bar links
  `flex-1` + `px-1 text-center` (share the row).
- NOT claimed: actual max-zoom rendering — parent
  verifies visually, owner verifies on his phone.

## 9. What remains for parent live-browser verification

- LP rendering desktop + phone (all 11, incl. vendor
  mark rendering — SVGs verified by file identity +
  brand colors only, NOT by a visual render).
- LP form states (recorded / log-only / invalid /
  rate-limited) against the preview API.
- Max-zoom reflow on LP pages + site header (logo crop
  defect already logged for the header stage).
- Mobile menu, 200% zoom, exact 1280px header state
  (all still owed from the pre-LP inspection).
- LP preview phone + max-zoom check by the owner.
- Main LeadForm `body.error`-only pattern (same-pattern
  observation, open follow-up).
