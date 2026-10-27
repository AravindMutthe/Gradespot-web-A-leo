## Lead endpoint honesty — 201 saved vs 202 received (branch-only, 2026-10-27)

- **Bug:** `src/app/api/leads/route.ts` returned 201 with
  `{ ok: true, stored, id }` for both Supabase-stored leads and
  log-only leads, and all three forms (`LeadForm`, `RegisterForm`,
  `LpLeadForm`) treated any `res.ok` as success and showed a
  "sent / saved / in" message without checking `stored`. A lead that
  was only logged on the server was therefore presented as saved.
- **Contract now:** `stored === "supabase"` → 201,
  `{ ok: true, stored: "supabase", id }` (the lead IS in the database).
  `stored === "log"` → 202,
  `{ ok: true, stored: "log", id: null, notice }` (the lead was
  received and logged on the server for follow-up, but was NOT saved
  to the database; the notice says so and gives a contact fallback).
  Validation failures stay 400 with per-field errors, unchanged.
  The log fallback itself is kept — it prevents silent loss during
  development/outages — but it is now honest instead of silent.
  Migration 0004 is applied and the Supabase path is primary when the
  service key is present; this fix covers the exceptional log-only
  path, it is not a claim that no leads are ever saved.
- **Frontend:** each form parses the response body on every ok
  response and checks `stored`. Supabase → the existing "sent"
  success state, wording unchanged. Log → a NEW distinct "received"
  state (not "sent"): it states the enquiry/registration was received
  but could not be saved to the database right now, shows the server's
  notice, does NOT claim the lead is "in" or saved, and does NOT show
  the WhatsApp continuation as if the lead were stored. The received
  state blocks double-submission like "sent". Non-ok responses and
  network errors stay "error", unchanged.
- **Other callers checked:** the only `fetch("/api/leads")` callers in
  `src/` are those three forms; `DemoBand` references the endpoint in
  a comment only and needed no change. The deal-brief form does not
  post to `/api/leads` at all (draft-only).

## Nexus revenue application — Release 3 prep (branch-only, 2026-10-25)

Source: GradeSpot revenue strategy (Axon `docs/REVENUE-STRATEGY.md`,
saved 2026-10-25, internal only) + the Site A vs Site B comparison
(Site A = Nexus preview 6pdz1fjzr, 8.0/10; Site B = production
build-app, 6.9/10; Site A wins IA/UX/transparency, Site B wins
aggressive above-the-fold lead capture).

- **What was applied:**
  - Seven revenue divisions (`src/data/revenue-divisions.ts`), grouped
    on `/services` above the existing 12-service grid, each with a
    status badge and a clear next action. Only real, existing services
    are listed under a division; no service was invented.
  - Service detail pages (`/services/[slug]`): Get a Quote →
    `/corporate-and-international` (draft-only deal brief) and Book a
    Consultation → `/contact-us`, alongside the existing short enquiry
    link. Nothing is purchased on a service page.
  - Ongoing support & maintenance panel on `/services`: a consultation
    concept only — scope and terms agreed on consultation, no price,
    no subscription, no recurring-billing claim.
  - CTA harmonization: Book Free Demo → `/register` (existing demo /
    registration lead flow, no payment taken there) paired with Explore
    Programs → `/trainings`, alongside the kept Talk to an Advisor →
    `/contact-us`. Full trio on the homepage hero (all sizes), at xl in
    the desktop header, and stacked on mobile; at the compact 960–1280px
    nav breakpoint only Talk to an Advisor shows, so the bar cannot
    overflow. No working lead path was removed to do this.
  - Ungated high-level outlines on full course pages: a "Course outline
    at a glance" box listing the course's own published section headings
    verbatim, in order, before the full sections. Batch schedules and
    demo registration stay behind the enquiry/demo forms.
  - Transparency kept: Available vs Planned badges and real catalogue
    counts are unchanged; Planned domains/courses are never promoted as
    available or enrollable.
- **MERGE EXCLUSION — deliberately NOT applied:** the comparison's
  recommendation to "adopt Site A as main" is a merge/production
  decision. It is NOT done here. This work stays on
  `feat/frontend-v2-platform`, local commits only; `main` and live are
  untouched and no new preview exists yet. Merging needs the user's
  explicit word in chat.
- **Deliberately NOT applied — prices:** no price, price range or price
  claim from the revenue table (web ₹8K–60K, training ₹3K–35K,
  maintenance ₹1K–8K/mo, cloud ₹15K–1.5L, etc.) appears on any page.
  Quote/consultation CTAs lead to quote/consultation/enquiry flows,
  never to a priced checkout.
- **Deliberately NOT applied — traffic/figures:** no counter, stat or
  claim uses the unverified 3,000–4,000 monthly visitors, 4–6
  clients/month or 7–9 students/day figures.
- **Deliberately NOT applied — payment:** no Razorpay, no card/bank/UPI
  collection, no Purchase/Subscribe checkout. No "Purchase" or
  "Subscribe" button was added; actions are Get a Quote, Book a
  Consultation, Enroll Now (real courses, existing lead flow) and Book
  Free Demo.
- **Deliberately NOT applied — authorized claims:** no "authorized
  reseller" or "authorized partner" wording was added anywhere.
  Partnerships remain a discussion, and partnership terms are drafted,
  never signed, through a form alone.
- **Deliberately NOT applied — invented syllabus, AutoCAD named:**
  the AutoCAD catalogue entry is catalogOnly with an empty summary and
  empty sections, so there is NO verified AutoCAD syllabus in the repo.
  The comparison's example modules (2D Drafting, 3D Modeling, Isometric
  Views) are illustrative, NOT GradeSpot syllabus data, and were NOT
  published. AutoCAD (and every catalogOnly course) now carries an
  explicit "Course outline — not yet published" box, with syllabus,
  batch schedule and fees confirmed on enquiry.
- **Syllabus gap list — courses with no published syllabus (all
  catalogOnly, summary + sections empty):** azure-security-engineer-az-500,
  microsoft-devops-az-400, sc-900, sc-200, microsoft-sentinel,
  aws-cloud-practitioner, aws-solutions-architect-associate,
  aws-devops-engineer, comptia-a-plus-core-1, comptia-a-plus-core-2,
  cybersecurity-technologies, vapt, core-java, java-full-stack, power-bi,
  mysql, data-analytics, data-science, certified-professional-coder-cpc,
  hcc-medical-coding, ip-drg-medical-coding, em-medical-coding,
  radiology-medical-coding, anesthesia-medical-coding, autocad.
  Real syllabus material from GradeSpot is needed before any of these
  can carry an outline. The 11 full courses (azure-fundamentals-az-900,
  azure-administrator-az-104, ccna-200-301, ccnp-350-401-encor,
  comptia-network-plus, comptia-pentest-plus, comptia-security-plus,
  computer-hardware-and-networking, digital-marketing, soc-analyst,
  certified-ethical-hacker-ceh) already render their published sections
  and now also show the at-a-glance outline.
- **Divisions with no real offering (Planned, labelled as such):**
  AI, Automation & Business Solutions; Digital Learning Products &
  SaaS. Cloud, DevOps & Managed IT Services is Partial — network
  infrastructure building is available, a standalone cloud/DevOps
  implementation offering is Planned.
- **Enquiry rule still applies:** billing-style fields appear ONLY on
  the deal/agreement/exchange brief forms. Course, service and all
  related enquiry flows are unchanged in scope and stay short; no
  enquiry form file was touched in this build.
- **Remaining gaps:** no `/api/deal-briefs` endpoint (deal briefs stay
  draft-only); no standalone Labs portal or Certification route; no
  level tags or interactive roadmaps (Release 2); phone tap check still
  owed, including for the new header CTA trio and the division cards.

## Nexus deal/agreement/exchange forms (branch-only, after Release 1)

- **Scope rule, reinforced 2026-10-25:** the billing-style pattern (SPEC §6A)
  applies ONLY to genuine deal/agreement/exchange flows. It is NOT
  applicable to course enquiries, service enquiries, contact/general
  enquiries, or ANY enquiry-like form related to them — those stay short
  and progressive with NO billing fields, NO address block and NO
  organization/VAT/GST/account-type block. Enquiry forms checked and
  unchanged in this build: `LeadForm` (contact-us, for-institutes demo,
  for-colleges, partner discussion form), `RegisterForm` (/register),
  `LpLeadForm` (landing pages), trainings/service enquiry flows.
- **New component** (`src/components/nexus/DealAgreementForm.tsx`,
  schema `src/lib/deal-brief-validation.ts`): split first/last name,
  authorized email/phone, organization + account type, country selector,
  address line 1 / line 2 (optional), city, state selector (India) or
  region text (international), country-aware ZIP/postal code, VAT/GST
  (optional), plus GradeSpot deal fields — deal type (service agreement,
  partnership, enterprise training deal, payment arrangement, other
  exchange), scope, expected deliverables, timeline range, indicative
  budget range (respondent's band, never a GradeSpot price), decision-maker
  ("who signs off on scope and payment"), success criteria ("how will
  you know this worked?"). Screenshot fields NOT copied literally: no
  "Change payment method" action that does anything (see below), no
  pre-filled values, no screenshot address data.
- **Submission mode — draft/unsent, chosen deliberately:** the form
  validates client-side with Zod and shows a review brief with a copy
  button. It makes NO network request. Sending through `/api/leads` was
  rejected because that schema ignores unknown fields, so address and
  deal terms would be silently dropped, and its 2000-char message cap
  could truncate a brief; `/api/leads` is NOT widened and its validation
  is untouched. A future `/api/deal-briefs` endpoint (own storage, rate
  limits, auth, server-side run of this schema) is a gap, not built here.
- **Payment placeholder:** a visually distinct dashed box labelled
  "Change payment method — not here" that submits nothing and changes
  nothing; no card, bank or UPI details are collected anywhere.
- **Applied to:** `/corporate-and-international` ("Enterprise deal
  brief", default enterprise training) and `/partner-with-us` (separate
  "Draft Terms" section below the untouched discussion form, default
  partnership). `/partner-with-us` remains a discussion invitation,
  not a franchise offer and not a signed agreement; `/register` remains
  lead-only. No new public route was invented — both flows already
  existed as business routes. No backend/Supabase/Axon/replica/portfolio/
  Royal Salon changes.

# Frontend 2.0 — Implementation Notes (Nexus Release 1)

Branch: `feat/frontend-v2-platform`. Local only — not pushed, not merged,
not deployed (in this release). `main` and live are untouched.

## Nexus Release 1 — SUPERSEDES the v1 notes below

- **Brand tokens** (`docs/frontend-v2/BRAND-TOKENS.md`): sampled from the
  repo logo files by Pillow pixel counts — primary #E57439 (50.96% of
  opaque pixels), charcoal #434140 (39.36%), pale tint #F4EAE6, 0 navy
  pixels. The 40-token system is built from those colours plus
  same-hue AA derivatives (#C24E1F / #9C3E18 for text and buttons).
  Live-site #F7631B/#F98238, Leo #B23A0A and heading navy #0E2B3D are
  NOT the sampled logo colours and are not used as Nexus brand colours.
  Illustrative spec hexes (#0C57B7 etc.) are not used as brand colours.
- **Design system** (`src/app/globals.css`): legacy token names repointed
  to Nexus values; 40 `--color-nexus-*` tokens; Nexus utilities
  (`nexus-editorial`, `nexus-app`, `nexus-diagram`, `nexus-row`,
  `nexus-status`); light/dark themes via the existing `.dark` toggle.
  Logo files and `.logo-plate` rules are untouched. No Carbon React on
  public pages in this release — Carbon-inspired rigor only.
- **Navigation** (`src/components/Header.tsx`, `src/data/nexus-nav.ts`,
  v1 file `src/data/frontend-v2-nav.ts` removed): six Nexus groups —
  Academy, Certifications, Career Pathways, Labs & Projects, IT Solutions,
  Company & Resources. Desktop mega panels, mobile accordion, header
  search over real catalogue/services, Talk to an Advisor → /contact-us,
  For Business prominent in the IT Solutions featured panel.
- **Homepage** (`src/app/page.tsx`, rewritten): alternating editorial /
  structured-discovery table / technical workspace / editorial feature /
  service-delivery table / editorial proof / application enquiry —
  NOT the v1 eleven-section card-row reorder. Hero: "Engineering Skills.
  Real-World Solutions." with Explore Academy / IT Solutions actions and
  a skill-graph panel. PromoBanner, FeatureTrio and the trailing CtaBand
  were removed from the homepage to remove duplicate/repetitive banners
  and CTAs; promotions remain once, via OfferCards in the final section.
- **Guards kept:** `/register` lead-only, `/partner-with-us`
  discussion-only, promotions via `getPromotions()`, all assets local,
  no new routes, no backend/Supabase/Axon/replica/portfolio/Royal Salon
  changes. No Carbon, Meilisearch/Typesense, Recharts, React Flow,
  React Hook Form or React Compiler was added in this release — those
  are Release 2–4 / evaluated items, not Release 1.
- **Gaps, not done (carried forward):** no standalone Labs portal;
  no Certification route (filtered Training views, training-toward
  wording); no Linux/DevOps/AI standalone domains (Planned, except real
  data courses); no level tags (Release 2); no interactive career
  roadmaps (Release 2, role links go to real courses / Career Support);
  no upcoming-batches page; backend NestJS vs Next.js+Supabase still
  open; logo wordmark proportions/clear-space not measured (files used
  unmodified, so preserved by construction); phone tap check still owed.

---

# Frontend 2.0 — Implementation Notes (Navigation + Homepage) — v1, SUPERSEDED

Branch: `feat/frontend-v2-platform`. Local only — not pushed, not merged,
not deployed. `main` and live are untouched. No preview deployment exists yet.

## What was implemented

- **Navigation 2.0** (`src/components/Header.tsx`, `src/data/frontend-v2-nav.ts`):
  six primary menus only — Training, Certifications, Labs & Projects,
  IT Solutions, For Organizations, Explore. Desktop mega panels are three
  structured columns plus a featured panel. Mobile is a one-level accordion
  (each top menu expands once; groups inside are headings, not nested
  accordions). Header search filters the real catalogue + services and
  links only to real course/service pages, plus "Search all trainings".
  Top strip now reads "Hyderabad, India · Online & Classroom Training"
  with Contact and Student Support links. Primary CTA is
  "Talk to an Advisor" → `/contact-us` (existing advisory flow).
  Registration is contextual only: a small link inside the Training
  panel/accordion, never a prominent header button.
- **Homepage 2.0** (`src/app/page.tsx`): the spec's eleven sections in
  order — Hero, Choose Your Path, Explore Technology Domains,
  Certification Pathways, Hands-on Learning, Professional IT Solutions,
  Why GradeSpot, Enterprise & Institutional Programs, Success & Trust,
  Insights & Resources, Speak With GradeSpot — reusing existing
  components, published copy, course/service data and the promotions seam.
  Hero is a four-domain image grid (cybersecurity, cloud, networking,
  software), not a single CEH course. CEH appears only as a program card
  in Certification Pathways and as a lab course in Hands-on Learning.
- **Trainings page**: secondary "Explore Programs" link added next to
  "Talk to a Trainer", pointing at the existing `#course-search` anchor.
- **Untouched guards**: logo plate JSX copied unchanged from Leo v1
  (luminous parchment + halo, per-theme swap); Prospectus tokens and
  self-hosted fonts unchanged; `/register` still lead-only;
  `/partner-with-us` still a discussion invitation; promotions still via
  `getPromotions()`; no new routes were created; no backend, Supabase,
  Axon, replica, portfolio or Royal Salon changes.

## Verification (local, 2026-10-25)

- `npm run lint`: 0 errors, 2 warnings — both pre-existing
  (`postcss.config.mjs` anonymous default export; unused `_course` in
  `src/app/api/leads/route.ts`). No new warnings.
- `npm run build` (after clearing `.next/cache/fetch-cache`): passes,
  99 routes generated, same route set as before (no `/certifications`,
  no `/labs` route added).
- Local smoke (`next start`, port 3214, killed by PID, port verified free
  afterwards): `/`, `/trainings`, `/services`, `/contact-us`,
  `/for-institutes`, `/for-colleges`, `/partner-with-us`, `/about-us`,
  `/resources`, `/certificate-verification`, `/corporate-and-international`
  — all 200. Homepage HTML contains all eleven section headings and
  "Talk to an Advisor" / "Explore Programs".
- No lead POST test was run (no validation-passing lead was sent to
  live Supabase, per the standing lesson).

## What was NOT implemented / gaps — read before reviewing

1. **No standalone Labs/Projects page.** No labs route existed, and no
   standalone labs offering was verified. The Labs & Projects menu and
   the Hands-on Learning section link only to real course pages whose
   published content describes hands-on labs (CEH, CCNA, AZ-104, SOC
   Analyst, VAPT), and the menu's featured panel says this plainly.
   A real labs portal, lab catalogue or project gallery still needs a
   confirmed offering before it can be built.
2. **No Certification route or exam pages.** Vendor links are filtered
   Training views (`/trainings#category-aws`, `#category-microsoft-azure`,
   `#category-cisco`, `#category-comptia`, `#category-cybersecurity`),
   verified against `src/data/catalogue-nav.ts` (AWS 3, Microsoft Azure 7,
   Cisco 2, CompTIA 5, Cybersecurity 4 courses). Wording is "training
   toward" a certification, never a guarantee of certification, an exam
   date, a fee or eligibility.
3. **No Linux / DevOps & SRE domain column.** The catalogue has no
   Linux or DevOps category. Azure DevOps (AZ-400) and AWS DevOps
   Engineer appear under their real vendor categories. A Linux/DevOps/SRE
   domain page needs real courses first.
4. **No level filtering.** By Experience (Foundation / Intermediate /
   Advanced / Professional Upskilling) links to `/trainings` because the
   catalogue has no level tags. Filtered level views need that data.
5. **No upcoming-batches page.** "Upcoming Batches" links to `/trainings`;
   the Trainings page already states batch schedules are confirmed on
   enquiry. No dates were invented.
6. **Spec conflicts still open, not settled here:** (a) navigation merge
   vs the earlier preserve-every-menu-item rule; (b) NestJS monolith vs
   earlier Axon v1 Next.js + Supabase — no backend work was done in this
   change, frontend only, using existing data and `/api/leads`.
7. **Retired, not deleted:** the v1 "What We Do" four-blurb grid is not
   on the new homepage; its topics are covered by the Domains and
   Services sections. All v1 routes remain live, so no URL was removed.
8. **Phone check still owed:** mega-menu hover/click, mobile accordion
   and header search were verified by build + local HTML only, not on a
   phone. The user (phone reviewer) is the final check for tap behaviour.
