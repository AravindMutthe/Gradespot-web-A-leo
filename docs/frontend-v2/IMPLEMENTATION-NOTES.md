# Frontend 2.0 — Implementation Notes (Navigation + Homepage)

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
