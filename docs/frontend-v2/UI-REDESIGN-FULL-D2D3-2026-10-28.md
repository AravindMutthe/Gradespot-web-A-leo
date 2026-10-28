# UI REDESIGN — FULL, D2/D3 BASIS (2026-10-28)

Branch preview only. No merge, no production. Decisions: D1 equal hybrid
(owner, 2026-10-27); D2 three-job nav presentation and D3 hero statement
(owner-tapped sequence, 2026-10-28, on Muse's recommendation; owner may
overrule anytime). This note is the design record for the full-redesign
commit on top of 831484b. It does not authorise any content, catalogue,
legal, pricing, payment or production decision.

## 1. Decisions as implemented

- D2: header, mobile drawer, footer and header search present THREE jobs —
  Training, IT Solutions, Company & Resources — over the six unchanged
  groups in `src/data/nexus-nav.ts` (see `src/data/nav-jobs.ts` and
  `docs/frontend-v2/NAV-JOB-MAPPING-2026-10-28.md`). Desktop: a job trigger
  opens a job panel listing that job's menus; choosing a menu opens its
  existing mega panel, with a back link to the job. Mobile drawer:
  jobs → menus → columns. Search indexes job headings as entry points to
  their existing job hrefs (no new destination).
- D3: home hero H1 is exactly "Practical IT training — and IT services —
  in Hyderabad." Subline (research-proposed, framing only, no invented
  fact): "Classroom and online courses in cloud, cybersecurity,
  networking, software, and more, plus IT services for businesses. Ask
  about a course or a consultation — no fees or batch dates are listed
  here until confirmed." Hero CTAs are two EQUAL `btn-primary` buttons:
  "Explore Training" → /trainings and "Explore IT Solutions" → /services.
  "Book a free demo" remains as a text link below the CTAs. The old hero
  headline/subline are replaced only on the home hero; no other page's
  headline was rewritten to match.

## 2. Tokens (unchanged values, new pairings)

Logo colours remain the anchor: orange #E57439, charcoal #434140.
Supporting: deep #17324D, deep-soft #EAF0F5, teal #0D766E,
teal-strong #0A5C55, canvas #F7F5F0. Supporting colours never outrank
logo colours and are never the primary CTA colour except where the
pairing below is contrast-checked. Logo files never edited, recoloured
or cropped. No new token was introduced by this redesign; the pairings
below are new combinations of existing tokens, computed with the WCAG
relative-luminance formula (scripted, not eyeballed).

| Pairing | Ratio | Verdict |
|---|---|---|
| Paper #F7F5F0 on deep #17324D (light) | 12.05:1 | PASS AA normal |
| Paper #FFFBF5 on deep #1D3A5C (dark theme deep) | 11.24:1 | PASS AA normal |
| White #FFFBF5 on teal-strong #0A5C55 (light) | 7.61:1 | PASS AA normal |
| Teal #2AB3A3 on ink #201C19 (dark accent text) | 6.50:1 | PASS AA normal |
| Brand-700 #9C3E18 on paper #F7F5F0 (light links) | 6.19:1 | PASS AA normal |
| Teal-strong #0A5C55 on deep-soft #EAF0F5 (light labels) | 6.83:1 | PASS AA normal |
| Deep #17324D on deep-soft #EAF0F5 (job panel text) | 11.43:1 | PASS AA normal |
| Paper #FFFBF5 on ink-950 #1E1C1B (dark surfaces, existing) | 16.47:1 | PASS AA normal |
| Brand-600 #C24E1F on canvas #FFFBF5 (light primary text) | 4.63:1 | PASS AA normal |

Forbidden pairings from earlier reports stay forbidden: brand-600
# C24E1F on canvas-alt and on deep-soft (4.38:1 / 4.15:1 — below AA
normal); brand-700 is used there instead.

## 3. Home order and equal-weight rule

Order: hero (D3) → training discovery → IT services → labs & career
pathways → certifications → why GradeSpot → insights → enquiry.
Equality is achieved structurally, not by alternating order alone:
both engine sections use the same `section-pad` section, the same
`SectionTitle` hierarchy, the same `nexus-app` table treatment, and the
same CTA row (one `btn-primary` + text links). The old services
two-column layout (table + dark "For Business" panel) was flattened to
that pattern; the panel's consultation wording ("Tell us the problem
and the scope; the team replies with the next step. Services are
quoted to scope; no prices are published here.") is folded into the
services intro paragraph — moved, not deleted, and no new claim added.
The Academy section keeps its table + "View All Trainings" primary CTA
+ "Course Comparisons" text link. Neither engine is labelled lead or
second anywhere on the page.

## 4. Section order per page type

- /trainings: hero (new honest subtitle — no "turn learners into tech
  leaders" superlative) → answer-first summary → "Browse · All
  Trainings" section heading + lead paragraph → status lens + category
  tabs + course cards → advisor box → showcase → feature trio → blog.
  Status lens and category tabs unchanged; duration/level/mode/demo
  rows appear only where the catalogue publishes them.
- Full course page: hero (category, title, published summary, duration
  pill where filled) → NEW meta strip (status chip only: "Published
  detail" or "Coming soon — ask us", from the catalogue's own
  published-detail flag — NOT a B1 program status — plus "Batch
  schedule and fees confirmed on enquiry") → answer-first summary →
  course facts (only where course-details exists) → outline at a
  glance (verbatim published headings, in order) → published sections
  IN THEIR PUBLISHED ORDER (not reordered — reordering would risk
  masking the CCNA/CCNP gate defects) → demo → register → FAQs →
  comparison where one exists → enquiry CTA → corporate strip →
  related trainings. The meta strip adds no fact beyond the flag and
  the enquiry statement already published elsewhere.
- Catalog-only page: hero + meta strip ("Coming soon — ask us") →
  answer summary → "About This Course" → "Course outline — not yet
  published" gap statement → enquiry → demo → register → FAQs →
  corporate strip. Related links are same-category full-detail courses
  only (existing behaviour, unchanged).
- /services: hero → revenue divisions (outcome → published offerings
  → audience → consultation CTA; Planned divisions "Coming soon —
  ask us") → NEW "How engagement works" strip (Tell us the problem →
  Scope agreed on consultation → Quoted to scope; framing from
  published copy only, no terms/price/timeline promised) → ongoing
  support & maintenance (consultation concept, unchanged) → FAQs.
- /contact-us: hero → form column with NEW lead microcopy ("Tell us
  your name, phone number, and which course or service you are asking
  about. Mode, batch and fee details follow in our reply.") → side
  panel (location, mail, phones, hours, all published) → map. Form
  logic, validation and saved-vs-logged success wording unchanged.
- /register, /corporate-and-international, /partner-with-us: structure
  already follows hero → sections → form → CTA and was left
  structurally unchanged by this redesign, except through the shared
  header/footer/nav. Their draft-only deal forms (deals/agreements/
  exchanges only, never course/service enquiries) were not touched.

## 5. Spacing / density rules

- One section rhythm: `section-pad` everywhere, alternating paper /
  sunken surfaces; no section is given a larger padding or a larger
  title size to imply it outranks its equal counterpart (home engines).
- Tables (`nexus-app` rows) are the discovery pattern for both engines;
  card grids are used only for course cards, showcase and testimonials
  (16:9, unique photo, no sepia, no repeated photo — R2R3, kept).
- Every interactive target stays at least 44×44px (desktop triggers,
  drawer rows, footer rows, search results); footer link rows keep the
  44px height from the audit fix.
- Section headings are one system: every `SectionTitle` carries the
  same brand rule as `PageHero` (added in the 2026-10-28 fix commit),
  so headings read as new everywhere, not only on the home hero.
- Reduced motion: transitions remain colour/chevron only; the hero
  column keeps `hero-no-reveal` (no fade-in on the LCP element).

## 6. Deliberately kept (not redesigned away)

Safe-assets artwork/icons/motif (`Artwork.tsx`); status lens; careers
page, menu option, footer link and sitemap entry; footer task columns
structure (regrouped under jobs, links kept); testimonials without star
ratings; compare built only from published data; draft-only deal forms;
employer wall OFF; ISO/AICTE emblems as-is; local-only assets (no new
remote reference); catalogue content (CCNA 45-day repo text, CCNP
defect as-is, 25 catalog-only PENDING, migration 0006 unapplied).

## 7. Deliberately NOT built

Interactive roadmaps, student portal, payments, enrollment, AI, filters
beyond category tabs + status lens, a featured rail (an editorial pick
without owner confirmation), per-course B1 fields (unfilled, never
defaulted), any new dependency, any new asset download, any vendor /
employer / government logo, any AI-generated official logo.

## 8. Still open after this redesign

D2/D3 are decided and implemented, but: catalogue gate still BLOCKED
(CCNA row, CCNP defect, 25 divergences, migration 0006 unapplied,
register R1–R11 all pending); per-logo permission (R10) still open —
Das did not address it; Das image files not yet forwarded (13 WebP +
hero replacement); Das illustration set not yet requested; live
viewport / Lighthouse / axe measurement still unmeasured (sandbox
Chrome limitation) — no score is claimed for this redesign; owner
phone test owed on the new design as a whole (3-job nav, hero,
home order, course meta strip, services strip, contact microcopy).

## 9. Wider-window audit (20:04–22:25, 2026-10-27) — checked item by item

Owner direction 2026-10-28: the important window is 20:04–22:25, not
just 21:25–22:12. Every item below was checked against this build;
fixes found necessary were made in the fix commit on top of e569219
(Escape focus-return + graph wording), everything else was already
satisfied or is deliberately deferred with its reason. Nothing here
is browser-measured; all of it is code-verified, with live measurement
still owed.

- 20:04 mandate: UI/menu rejection is a UI acceptance rejection, not a
  rejection of catalogue/drift/pilot work — none of that work was
  touched by this redesign. Logo colours are anchor, not whole palette:
  tokens + contrast table in §2; supporting colours never outrank logo
  colours; primary CTAs use the brand (logo-orange) gradient, never a
  supporting colour; logo files never edited. Six groups, destinations
  and URLs preserved in substance under D2 (mapping doc); changes are
  design/interaction only. No gate waived: catalogue, measurement and
  merge/production separation all still stand.
- Das UI reply (20:28–20:30): substantial redesign, not colours/radii —
  header proportions (3 job triggers, larger type), typography hierarchy
  (SectionTitle brand rule + hero scale), spacing, cards (R2R3, kept),
  buttons (equal hero CTAs), menu presentation (job panels), mobile
  navigation (drawer jobs → menus → columns), visual density (one
  section rhythm), section ordering (home reorder), responsive
  behaviour (80rem content-width breakpoint, kept). Interaction rules:
  click-primary, keyboard-supported, 400ms gap-tolerant hover (hover
  enhances, never sole activation); Escape closes AND returns focus —
  fixed in this pass, because the first D2 cut returned focus to a
  menu-key ref that no longer exists as a trigger (triggers are keyed
  by job since D2); now Escape from a job trigger, job panel or menu
  panel returns focus to the job trigger. Drawer: nested accordions,
  clear back/close, visible search, primary enquiry action at top,
  context preserved across taps. Labels: job labels favour learner /
  customer intent (Training / IT Solutions / Company & Resources);
  inner menu labels are retained unchanged for preservation, with the
  job label as the intent layer. Premium from consistency/readability,
  not new colours (0 new tokens) or new animation (hero-no-reveal,
  colour/chevron only). Das had NOT independently inspected the Nexus
  preview — his reply is NOT cited anywhere here as a visual
  inspection. Acceptance checklist status: pages home/catalogue/full
  course/catalog-only/services/contact/registration/corporate-partnership
  all smoke-tested 200 (partner-with-us added in the fix pass);
  viewports 360/390/768/1024/1280/1440, keyboard tab order, axe,
  screen-reader, Lighthouse mobile/desktop and the owner old-vs-new
  usability tasks are all UNMEASURED and owed on the exact preview
  build — header overflow at 1280/1366/1440/1536px
  (scrollWidth === innerWidth) is likewise UNMEASURED, not claimed.
- R1 (9248d58), kept, not regressed: single utility strip; one CTA
  hierarchy in the bar (single "Book Free Demo" primary); 44×44
  openers with visible open state; click-primary + 400ms gap-tolerant
  hover; Escape + focus return (fixed, see above); content-responsive
  mega panel; accessible mobile drawer; whole-menu search (courses +
  services + every menu destination + job headings, arrow-key
  navigation, touch-safe close, no invented destination); R1
  supporting tokens; base responsive safeguards; no overflow-x hidden
  masking (only the pre-existing `clip` safety net).
- 21:21 audit + Fixes document, not regressed: desktop header narrower
  than before (3 triggers vs 6 menus) but overflow still UNMEASURED
  until a real browser checks it; dark-surface heading contrast — the
  home services dark panel was removed in this redesign (its wording
  moved to a light section), and the only new dark strip (job/mega
  panel footer bar) carries light text with no heading inside it, so
  the 1.14:1 failure does not return; internal/spec copy stays out
  (diff grep: 0× "Release 2", roadmap or graph-implementation
  explanations in rendered text); Planned stays "Coming soon — ask
  us", never hidden; draft legal pages stay unlinked (0 links in
  footer/sitemap, no invented policy/grievance officer/address/refund
  terms); hero LCP element keeps `hero-no-reveal`; category-card image
  sizes unchanged (33vw/50vw/100vw on course cards); nav uses
  aria-expanded only (0× audible "Closed"); tap targets ≥44px on
  triggers, drawer rows and footer rows; manifest + explicit icon
  link untouched; CSP vercel.live allowance untouched
  (preview-only via VERCEL_ENV === "preview").
- 21:53 owner complaint, visibly answered: menu style (3-job bar +
  two-level panels, larger type); nav bar (3 triggers, not 6 crowded
  ones); headings (R2+R3 sans system + new SectionTitle brand rule,
  one system with PageHero); footer (regrouped under the 3 jobs, link
  set verified identical); course cards (16:9 aspect-video, no sepia,
  unique photo per course, correct sizes — object-cover crop is
  inherent to a uniform grid and minimal at 600×340, the old fixed
  h-44 + sepia forcing is gone); homepage category/showcase cards
  design-led with no repeated photos (hero blocks and showcase use
  motif/icons, not course photos).
- 22:12 research direction: vertical cards for browsing (course
  cards), horizontal rows for comparison/services (nexus-app rows);
  detail order purpose → meta (filled fields only) → outcomes →
  mode/demo → audience → prerequisites → curriculum with labs → FAQ →
  one CTA (course page already follows it; the new meta strip adds
  status + enquiry statements only, and published sections were NOT
  reordered, so the CCNA/CCNP gate defects are not masked);
  first-contact forms minimal (name, phone, course/service interest,
  WhatsApp opt-in — unchanged); filters minimum = category tabs +
  status lens (kept); do-not-copy enforced (0× scale/placement/salary
  statistics, price-led cards, hidden planned items, countdown/
  scarcity, "guaranteed" promises, partner badges in the diff; the
  pre-existing FAQ answer explicitly says GradeSpot guarantees no
  job); equal hybrid throughout (home engines equal weight, jobs
  equal triggers — Training listed first only because that is the D2
  decision order, not a lead ranking); core focus = D3 hero statement.
- External evaluation (21:04) + Das evaluation reply (21:14): NOT R1
  acceptance and NOT cited as such anywhere in this redesign — no
  "evaluated 8.1" claim is made. Meta-copy cleanup before final
  measurement: developer-facing language removed (see audit bullet);
  truthful limitations kept (Planned labels, gap statements, "not
  published — ask us" pattern); destinations never disappear silently
  (mapping doc); only genuinely available actions described (browse,
  request information, enquire, working contact options); static
  pathway/graph material is labelled as an overview, never presented
  as interactive — the home "Skill graph" eyebrow was renamed to
  "Training areas" in the fix commit to remove even the graph
  wording. Catalogue counts are program counts only, never
  enrolment/certification/placement/revenue. Custom domain stays
  separately gated (no purchase, DNS, canonical or hosting change).
  Interactive roadmaps / student portal stay later-phase (not built).
- Content spec + pilot (22:21), as adjusted for equal hybrid:
  taxonomy followed (Dilsukhnagar Hyderabad, online + classroom;
  Training 36 in 10 categories; IT Solutions 12 in 7 divisions;
  certification as lens; pathways as role rows from real courses
  only; audiences learners/institutions/businesses); vocabulary
  P/F/N discipline kept — new copy in this redesign is published
  fact or framing only, no F/N term presented as fact; SEO/AEO
  patterns kept (H1 + answer-first paragraph on home and course
  pages, H2 order per page type, schema set unchanged,
  AggregateRating refused, HowTo not proposed, JobPosting refused,
  Offer only from a B1-verified figure — 0× JobPosting/
  AggregateRating in the diff); pilot fact traces kept (CCNA 45-day
  repo text untouched, AZ-500 gap statement untouched, services
  division pattern untouched, lead microcopy added on /contact-us
  with saved-vs-logged states verbatim in meaning). DEFERRED, with
  reason: the analogy/metaphor bank (2 per domain, 10 total) was NOT
  pasted onto pages — each analogy needs a per-item tie to the exact
  published fact it explains plus its never-become sentence checked,
  which is a copy-verification task, not a layout change; the bank
  stays in the spec/pilot as the record until that check is done.
  Training-led ordering/wording from the original spec/pilot was NOT
  reintroduced anywhere (the adjustment note governs).
- Careers (21:31): integration stays in this build — menu option,
  footer link, sitemap entry, header search (via nav data) — content
  unchanged from draft, and /careers smoke-tested 200 on the fix
  build.
