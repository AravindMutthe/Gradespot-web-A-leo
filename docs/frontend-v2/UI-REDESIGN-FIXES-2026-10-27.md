# GradeSpot Leo — R1-preview audit fixes: controlled copy pass + Part 1 must-fix + safe Part 2 quick wins

**Status: BRANCH-LOCAL, UNCOMMITTED. No push, no preview deploy, no merge, no production change by this pass.**
**Branch:** `feat/frontend-v2-platform` · **Tip before:** `9248d58` · **Tip after:** `9248d58` (unchanged — nothing committed)
**Basis:** owner-tapped "Start the controlled copy pass now" (Das-backed: controlled branch copy pass, coordinated with R2) PLUS the owner's detailed audit of the exact R1 preview (`https://gradespot-leo-build-qppfvx31b-axonfde.vercel.app/`, deployment `dpl_FDetLyzd1ffjBSXAuf1W5SVwjYDn`, Lighthouse 12, mobile + desktop, 390/1280/1440/1920 px, rating 7/10). Audit figures below are the auditor's, not newly measured here — sandbox Chrome cannot run Lighthouse, so no new score is claimed.

## 1. Files changed (15 modified + 2 new: `manifest.ts` + this report)

| File | Change |
|---|---|
| `src/components/Header.tsx` | Nav breakpoint follows globals (now 1280 px); desktop bar to ONE primary CTA; sr-only "Closed" duplication removed; utility-strip tap targets to 24 px; desktop search fixed 220 px; menu labels stay compact until 1536 px; mobile drawer gains a theme-toggle row |
| `src/app/globals.css` | `--breakpoint-nav` 60rem → 80rem; body-padding breakpoint 959 → 1279 px; `html, body { overflow-x: clip; }` safety net only; dark-surface heading guard; hero reveal exemption + reduced-motion exemption; dark brand-600/700 token overrides |
| `src/app/page.tsx` | Copy rewrite (see §4); hero column exempt from reveal; hero category-card `sizes` corrected; DevOps/AI rows no longer carry another category's count; consultation h3 gets inverse text colour |
| `src/data/nexus-nav.ts` | Copy rewrite (see §4); **no href added, removed, or changed — 54 unique destinations before and after** |
| `src/data/revenue-divisions.ts` | Planned statusNotes rewritten to "Coming soon — ask us" wording |
| `src/app/services/page.tsx` | Intro rewritten; Planned chip renders as "Coming soon — ask us" |
| `src/app/for-institutes/page.tsx` | "No invented numbers" heading/body rewritten as customer copy |
| `src/app/compare/page.tsx` | Subtitle rewritten (internal "no invented differences" removed) |
| `src/app/corporate-and-international/page.tsx` | "Case studies — TODO" section replaced with a no-claim section (no client/outcome claimed) |
| `src/data/testimonials.ts` | Capitalisation only: "naresh chepuri" → "Naresh Chepuri" (no rating/course added — none in source) |
| `src/components/Footer.tsx` | Privacy/Refund links removed (routes kept, see §5); footer links lifted to 44 px tall |
| `src/app/sitemap.ts` | `/privacy-policy` and `/refund-policy` removed from sitemap (LASTMOD entries removed too); routes still exist |
| `src/components/ThemeToggle.tsx` | Floating toggle hidden below the nav breakpoint (drawer carries it); LP pages keep it on mobile (no drawer there) |
| `src/app/layout.tsx` | Explicit `<link rel="icon" href="/favicon.ico">` (file already existed) |
| `src/app/manifest.ts` | **New.** Manifest from existing favicon only — no installability claim (no square icon) |
| `src/proxy.ts` | CSP allows `https://vercel.live` script-src on preview deployments only; production CSP unchanged |

## 2. Part 1.1 — Desktop header overflow (1280/1440 px)

**Audit finding:** page 1517 px wide at 1280 px viewport, 1597 px at 1440 px; "Talk to an Advisor" cut off; horizontal scrollbar. Cause: nav breakpoint 60rem (960 px), full menu needing ~1600 px. This confirmed the R1 risk at 960–1099 px was understated — the band is wider.

**Fix (audit Fix A, reconciled with no-destination-deleted):**
- `--breakpoint-nav`: 60rem → **80rem (1280 px)**. Below 1280 px visitors get the drawer, not a cut-off bar. The old 960 px rationale (phone desktop-view reporting ~980 px) is superseded in a comment: those visitors now get the drawer, which is usable at that width.
- Desktop bar: **ONE primary CTA only — "Book Free Demo" → `/register`** (rendered as `btn-primary`). "Explore Programs" → `/trainings` and "Talk to an Advisor" → `/contact-us` are **not deleted**: they remain in the mobile drawer (all three CTAs), the Academy mega-menu / hero, the IT Solutions mega-menu, and the footer (Contact Us → `/contact-us`; Trainings → `/trainings`).
- Compactness, so the bar fits the 1200 px wrap at 1280 px: menu labels stay 11 px / px-1 until 1536 px (`2xl:`), desktop search is a fixed 220 px (was an unconstrained `w-full` input that could push the bar wide), mega panel stays max 1240 px.
- Body bottom-padding breakpoint moved 959 → 1279 px so the sticky-bar clearance switches with the chrome.
- Safety net only: `html, body { overflow-x: clip; }` (never `hidden`, never as the fix itself).

**NOT claimed:** overflow fixed from code alone. A live retest is still required: at 1280, 1366, 1440, 1536 px, `document.documentElement.scrollWidth === innerWidth` must be true. Sandbox Chrome cannot measure this (it hangs even on a test page — the known sandbox failure, not the site). If the live retest still shows overflow, the next step is further label/CTA shortening, not widening the safety net.

## 3. Part 1.2 — Consultation heading contrast

**Audit finding:** "Request a service consultation" was #2a2726 on #1e1c1b = **1.14:1**, effectively invisible. Cause: global `h3 { text-heading }` overrode the card's inverse text colour.

**Fix:** the h3 now carries `text-nexus-text-inverse` explicitly, AND a guard was added to `globals.css`: headings inside `.bg-nexus-ink-950` or `.panel-ink` inherit the surface text colour. The guard was audited across all dark surfaces: every other `panel-ink` heading in the repo already sets `text-paper` explicitly, so the consultation heading was the only broken one; the guard prevents recurrence.

**Contrast table (computed with the WCAG relative-luminance formula, not claimed):**

| Pairing | Before | After | Verdict |
|---|---|---|---|
| Consultation heading `#fffbf5` on `#1e1c1b` | 1.14:1 (audit) | **16.47:1** | Pass AA normal (≥4.5:1) |
| Insights links `text-nexus-brand-600 #c24e1f` on sunken `#f4eae6` (light) | 4.03:1 | — | **Failed AA normal** |
| Insights links `text-nexus-brand-700 #9c3e18` on sunken `#f4eae6` (light) | — | **5.70:1** | Pass AA normal |
| Insights links, dark theme: brand-600 `#c24e1f` on dark sunken `#2e2620` | 3.11:1 | — | Failed AA normal |
| Insights links, dark theme: brand-700 overridden to `#ffb287` on `#2e2620` | — | **8.46:1** | Pass AA normal |
| Dark token override: brand-600 → `#ff8a4c` on `#2e2620` | 3.11:1 | **6.36:1** | Pass AA normal |

The dark brand-600/700 overrides are text-only tokens in this repo (no `bg-nexus-brand-600` use found), so they affect text contrast only. Brand-600 on plain paper (4.63:1) already passed and is untouched.

## 4. Part 1.3 — Internal/spec copy rewrite (before → after)

Rule applied (Das's guardrail overrides the audit where they conflict): planned functionality is **never** described as available; a static graph is **never** presented as interactive; destinations are **not** silently removed. Planned items therefore get the single neutral label **"Coming soon — ask us"** with their enquiry link intact — they are not hidden. Build/spec notes live only in code comments or this report, never in JSX strings.

**Homepage (`src/app/page.tsx`):**
- "Skill graph — real catalogue, no invented pathways" → "Skill graph — training areas"
- "Interactive career roadmaps arrive in Release 2. Today, role links go to real course pages and to Career Support." → "Explore career paths: follow a role to its course pages, or talk to an advisor about skills, tools and certifications."
- "Find a program by domain — and see what is actually available" → "Find a program by domain"
- "Counts are computed from the real catalogue. Planned domains are labelled Planned and are not promoted as enrollable. Levels, curriculum previews and demo eligibility arrive with Release 2 tagging." → "Program counts come from the training catalogue. Domains marked 'Coming soon — ask us' are not yet open for enrolment — ask us about them."
- "There is no separate labs portal yet. … Standalone capstones, quizzes and portfolios are Planned, not available." → "Hands-on labs, simulations and projects are delivered inside these training programs, as described on their course pages. Ask us about standalone capstones, quizzes and portfolios."
- "Career pathway — SOC Analyst (real course)" → "Career pathway — SOC Analyst"
- "Full interactive roadmaps for all twelve spec pathways arrive in Release 2. This graph uses only published SOC Analyst content." → "This is an overview of the SOC Analyst learning topics. Talk to an advisor for a full learning plan." (It is a list, not an interactive graph — labelled as an overview, not as interactive.)
- "No exam date, fee or eligibility is claimed here. Red Hat and Kubernetes pathways are Planned — no such courses are published." → "Certification is awarded by the vendor or exam body. Ask us about exam dates, fees and eligibility, and about Red Hat and Kubernetes training."
- "CEH is one featured program, not the visual for the whole business." → **deleted** (pure meta-note; the CourseCard already presents CEH).
- "For Business — Prominent" → "For Business"; "For Business lives here, in IT Solutions — not buried in the Academy." → deleted (the panel itself is in IT Solutions; no navigation commentary needed).
- "Learner voices — published testimonials only" → "Learner voices"

**DevOps contradiction, resolved honestly:** the homepage domain table showed DevOps & SRE with the Microsoft Azure count (7 trainings) while marking it Planned. Both DevOps & SRE and AI & Data rows now show count "—" and status "Coming soon — ask us", keeping their category links (Azure / Programming & Data) so visitors can still see the existing courses there. No count was invented to replace the removed one. Linux & Infrastructure keeps count "—" with the same label.

**Menu (`src/data/nexus-nav.ts`, no href changed):**
- "By Level — Release 2 tagging" → "By Level"; level notes "Level tags not yet in catalogue" → "Ask us about level and prerequisites"
- "Planned Domains" → "More domains — ask us"; Linux note → "Coming soon — ask us"; DevOps note → "Azure courses listed here; ask us about DevOps & SRE"; AI note → "Data courses listed here; ask us about AI"
- Academy featured body → "Browse the training catalogue. Course pages show the published curriculum and demo information where available — ask us about anything not listed."
- "Planned Vendor Training" → "More vendor training — ask us"; Red Hat / Kubernetes notes → "Coming soon — ask us"
- Certifications featured body → "Certification itself is awarded by the vendor or exam body. Ask us about exam dates, fees and eligibility."
- "Roles — courses today, roadmaps in Release 2" → "Roles — explore courses"; "More Roles — Planned Roadmaps" → "More roles — ask us"; all "Interactive roadmap Planned — Release 2" / "Release 2 interactive roadmaps" / "Release 2" notes → "Coming soon — ask us"; pathways featured title/body → "Role routes, starting with courses" / "Explore role routes and the courses behind them, then talk to an advisor about skills, tools and certifications for that role."
- "Planned — Not Available" → "Coming soon — ask us"; labs notes → "Coming soon — ask us" (portal, quizzes) and "Delivered inside programs today — ask us" (capstones); labs featured eyebrow "Honest Note" → "Labs & Projects", title "No Standalone Labs Portal Yet" → "Labs inside courses", body → "Labs and projects are delivered inside training programs. Follow a course page to see the labs it includes."
- Solutions featured eyebrow "For Business — Prominent" → "For Business"; body → "Tell us the problem and the scope; the team replies with the next step. No prices are published here; services are quoted to scope."

**Other pages:**
- `/services`: intro → "Divisions marked 'Coming soon — ask us' have no published offering yet — ask about them on consultation…"; Planned chip renders as "Coming soon — ask us"; `revenue-divisions.ts` statusNotes rewritten the same way (Partial note: "ask us about a standalone cloud/DevOps implementation offering").
- `/for-institutes`: "No invented numbers" → "Only figures we can stand behind"; body → "We publish institute results only once a pilot is complete and the institute has agreed to be named. Until then, no case-study figure appears here."
- `/compare`: subtitle → "Two similar courses, one clear decision. Every comparison below is built from the courses' own published topics, durations, certifications and job roles." (internal "no invented differences" removed).
- `/corporate-and-international`: "Case studies — TODO" section (with its two TODO list items) replaced by a plain "Case studies" section stating no case study is published yet and none is claimed until a client engagement is complete and the client has agreed to be named.

**Post-fix grep (customer-facing JSX/TSX copy, comments excluded):** 0 occurrences of "Release 2", "real catalogue", "REAL COURSE", "Prominent", "spec pathways", "not the visual", "testimonials only", "actually available". Remaining occurrences, all allowed and listed here:
- `src/app/privacy-policy/page.tsx` + `src/app/refund-policy/page.tsx`: TODO fact slots — the draft pages themselves, kept in the repo but unlinked (see §5). They still render at their URLs if visited directly; that is why §5 is a blocker, not a fix.
- `src/app/for-colleges/page.tsx:90`: lowercase "programs planned through the enquiry form" — ordinary scheduling language, not a Planned status label.
- `src/app/services/page.tsx` comment + status comparisons (`d.status === "Planned"`): code, not customer copy; the rendered label is "Coming soon — ask us".
- `src/data/revenue-divisions.ts`: the `RevenueDivisionStatus` type and `status: "Planned"` values — internal data; rendered labels are mapped (see above).
- `src/app/trainings/[slug]/page.tsx`: "invented here" appears only inside JSX comments (syllabus transparency / outline-at-a-glance notes), not rendered copy.

**`lint:copy` script (audit proposal — NOT added):** adding `"lint:copy": "! rg …"` to `package.json` would fail on the legitimate remaining occurrences above (draft-page TODOs, code comments, internal status values). It is documented here as a proposal for when the draft pages are published or removed and the grep can be scoped to rendered copy only. No script was changed.

## 5. Part 1.4 — Legal drafts: OWNER/LAWYER BLOCKER (not fixed by inventing facts)

**Deliberately NOT written:** no privacy policy, no refund policy, no grievance officer name/email, no registered address, no refund terms (the audit's "7 days / fewer than 2 sessions" example is an example, not a GradeSpot fact, and was NOT used), no case studies.

**Branch change only:** the draft legal pages are removed from footer navigation (`Footer.tsx` quickLinks) and from sitemap generation (`sitemap.ts`: both paths and their LASTMOD entries removed). Sitemap generation is a static list in `src/app/sitemap.ts` (`staticPaths` + course/service/comparison/article maps) — no other generation path exists. The routes themselves are **kept** (`/privacy-policy`, `/refund-policy` still return 200 — verified in smoke), so nothing is deleted; they are simply unlinked until published.

**Facts still needed before any legal publication (owner + lawyer):** confirmed entity name and registered address (and whether the published contact address is also the registered address); contact email; complete list of personal data collected (including server logs/form metadata if any); every purpose data is used for and the marketing consent basis; every third party receiving data (beyond Supabase storage and Vercel hosting, if any) and whether data leaves India under what safeguards; retention periods for enquiry data and verification lookups; how access/correction/deletion requests work and their response timelines; grievance officer name and email; how policy changes are announced and take effect; which fees/services a refund policy covers, instalment/EMI treatment, refund-available and non-refundable conditions, request window, processing time, request channel, information required, refund mode, and any deductions. Production legal publication is a separate owner + lawyer decision, not this branch.

## 6. Part 2 — Safe quick wins

- **Hero LCP:** the hero column (`<div data-reveal>` containing the H1) now carries `hero-no-reveal`, and `globals.css` forces `.hero-no-reveal` (and its descendants) to opacity 1 / transform none. The reveal system itself is untouched elsewhere. Reduced-motion exemption added: under `prefers-reduced-motion: reduce`, all `[data-reveal]` render visible with no transition. LCP improvement is **audit-stated (3.3 s → ~1.5 s), not newly measured** — sandbox cannot run Lighthouse.
- **TBT / lazy-loading — evaluated, NOT applied, with reasons:** `FaqList` is a server component (plain `<details>` HTML, zero client JS) — lazy-loading it would add JS, not save it. `ThemeToggle` is a ~20-line client toggle whose lazy load would delay theme switching and risk a hydration flash; the saving is negligible against the audit's 530 ms TBT. Neither was lazy-loaded; no SSR/hydration risk was introduced.
- **Ticker — already compliant:** it is already a CSS-only marquee, pauses on hover, and becomes a static wrapped board under reduced motion. Its second row is `aria-hidden` (visual loop only); accessible text is a single copy. Content unchanged. Offscreen pausing was not added (it would need an IntersectionObserver — new JS — against the TBT goal).
- **Browserslist — proposal, NOT applied:** setting `["chrome 111", "edge 111", "firefox 111", "safari 16.4"]` could drop ~14 KiB of legacy polyfills (audit-stated), but it would also drop support for older browsers without a recorded supported-browser commitment to check against. Left as a proposal for an owner decision.
- **Images:** hero category cards now carry `sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"` (4-column grid). CourseCard/BlogCards already carried the correct 33vw sizes for their 3-column grids. Logo already has `priority`; all other images use the Next default (lazy). Savings (~59 KiB sizing + ~12 KiB offscreen) are **audit-stated, not newly measured**.
- **Accessibility:** nav buttons no longer render the sr-only "Open"/"Closed" text and no longer carry a stale `aria-label` duplicating state — `aria-expanded` + `aria-haspopup` + `aria-controls` only (state is announced once, and cannot go stale). Insights links on sunken backgrounds: brand-600 → brand-700 (see contrast table, §3). Floating theme toggle: hidden below the nav breakpoint (drawer carries a theme row instead, same `gradespot-theme` localStorage key); LP pages keep the floating toggle on mobile because they have no drawer. Footer links: 44 px tall (R1 target, above the 24 px AA floor). Utility-strip links (email, phone, Contact, Student Support): 24 px minimum. The audit's "32 tap targets < 24 px" could not be re-counted without a live browser — the fixed classes above are the auditable response; a live tap-target audit remains part of the retest.
- **Launch/SEO, preview-safe only:** `src/app/manifest.ts` added (existing favicon only; no square icon, so no installability claim); explicit `<link rel="icon">` added (existing file). CSP allows `https://vercel.live` in `script-src` **only when `VERCEL_ENV === "preview"`** (proxy); production CSP is byte-identical to before, and no new `unsafe-inline` was added. Course schema: **already present** — `courseSchema()` in `src/lib/schema.ts` is already rendered on every training page from catalogue data (name, provider by reference, description, `hasCourseInstance` mode online/onsite for full courses only, credential only where course-details names one, offers only where a real pricing section exists, no schedule, no invented fee) — nothing was added or duplicated. **Not changed, per brief:** canonical/OG/JSON-LD/sitemap domain (still the Leo build domain), `noindex` on preview (correct), no AggregateRating (no verified Google rating in repo), no analytics (new service, owner decision).

## 7. Deliberately NOT done (Part 3 + gated items — proposals only)

Hero proof numbers (4.9 rating, 2000+ learners, batch 3 Nov), fee ranges, batch dates, "Get fee details on WhatsApp" buttons, trainer cards, lab/classroom photos, testimonial star ratings or course-taken fields, video testimonials, hosting blog articles on `/blog`, local SEO landing pages, Google Map/NAP footer changes, geo/openingHours schema additions, homepage lead form, and the "Why GradeSpot" rewrite with the audit's 4 concrete points (lab per learner, weekly mocks, trainer certifications, batch patterns) — all need a verified GradeSpot fact that is not in the repo, so each stays a proposal with its fact needed, not a build. The only Part 3-adjacent change made is the capitalisation fix above. The audit's "next batch starts…" conversion line, fee/EMI lines, and rating display are likewise proposals, not copy.

## 8. URL preservation

Old `nexus-nav.ts` (HEAD `9248d58`) vs new: **54 unique destinations before, 54 after, 0 missing, 0 added.** Header CTA reduction removes no destination: `/register`, `/trainings`, `/contact-us` all remain in the drawer CTA set, and in mega-menu/hero/footer paths (see §2). No slug renamed, no menu option removed, no category added/removed. Legal pages: routes kept, links removed (see §5) — that is a deliberate unlinking of draft pages, not a destination deletion, and it is listed here explicitly.

## 9. Verification

- `npm run build`: **PASS** — 100/100 static pages (99 + new `/manifest.webmanifest`).
- `npm run lint`: **0 errors, 2 warnings, both pre-existing** (postcss anonymous export; unused `_course` in leads route). 0 new warnings.
- `npm test`: **10/10 passed**.
- Smoke (local `next start`, GETs only, no lead POST, server killed by PID after): `/` 200, `/trainings` 200, `/trainings/ccna-200-301` 200, `/trainings/azure-security-engineer-az-500` (catalog-only) 200, `/services` 200, `/contact-us` 200, `/for-institutes` 200, `/compare` 200, `/privacy-policy` 200, `/refund-policy` 200, `/corporate-and-international` 200, `/sitemap.xml` 200, `/manifest.webmanifest` 200. Homepage HTML contains "Coming soon — ask us" and **0 occurrences of "Release 2"**. `/sitemap.xml` contains **0 occurrences of privacy-policy/refund-policy**.
- Grep: see §4 for the full remaining-occurrence list (all allowed, all explained).

## 10. Open blockers — do not claim past these

1. **Live header-overflow retest still required** (1280/1366/1440/1536 px, `scrollWidth === innerWidth`). Code-level fit is argued in §2, not measured.
2. **Live Lighthouse/axe/keyboard/tap-target retest still required** on a real browser (the audit's 7/10, mobile 78, LCP 3.3 s, TBT 530 ms are the last measured figures; this pass claims no new score).
3. **Legal publication blocked** on owner + lawyer facts listed in §5.
4. **Catalogue gate unchanged** (CCNA, CCNP, 25 divergences, migration 0006 unapplied) — independent of UI/copy quality.
5. **Owner phone test still owed** on the next preview (drawer, search, new single-CTA bar, theme toggle location, copy tone).
6. Browserslist, `lint:copy`, and all Part 3 items remain proposals, not builds.
