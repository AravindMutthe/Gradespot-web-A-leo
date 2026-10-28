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
