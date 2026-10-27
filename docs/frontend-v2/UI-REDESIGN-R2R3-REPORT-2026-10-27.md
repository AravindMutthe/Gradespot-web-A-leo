# GradeSpot Nexus — R2+R3 modern redesign pass (2026-10-27)

Branch-local redesign answering the owner's 2026-10-27 ~21:59 IST
rejection in his own words: menu style not modern/advanced, nav bar,
headings style, footer, course cards, images repeated and fitted in
cards in responsive. R1 only changed header/tokens; page sections and
cards still carried the old V1 "Prospectus" treatment — that is why
the site still read old-style. This pass changes style/layout only:
no content wording, no URL, no claim, no price, no status, no
trainer, no batch, no rating, no placement figure is added, removed
or changed anywhere below.

Scope: 7 files changed, 1 report added. No dependency, no asset,
no animation library, no hotlink, no download. Logo files untouched.
Catalogue gate unchanged (CCNA 90-day vs repo 45-day, CCNP CCNA copy,
25 catalog-only summary divergences, migration 0006 unapplied).
Draft legal pages stay unlinked (privacy/refund not re-linked in
footer or sitemap). `/careers` is NOT part of this pass: the
untracked parent files `src/app/careers/` and
`docs/frontend-v2/CAREERS-PAGE-SPEC-2026-10-27.md` were not edited,
committed, or deployed here.

## 1. Before → after, per owner item

### 1. Nav bar + menu — modern, not a crowded 6-dropdown wall
- Before: parchment glass bar, 11px semibold triggers in rounded
  rectangles, mono uppercase utility strip, serif mega-panel column
  heads, parchment mega panel.
- After (`src/components/Header.tsx`): slimmer bar (py-2, logo
  h-9/xl:h-11 instead of h-10/xl:h-12), solid canvas with blur
  instead of glass parchment; pill triggers (rounded-full, bold,
  tight tracking) with the same visible open state; utility strip
  in clean sans (no mono uppercase shouting); mega panel is a
  solid canvas card with roomier padding (p-7), sans bold uppercase
  column heads with a brand rule, sans bold featured title;
  mobile menu button is a pill, drawer has a rounded edge and
  divided group rows.
- Kept exactly: all six groups, all destinations (see §4), click
  primary + 400ms gap-tolerant hover, Escape + focus return,
  aria-expanded only (no sr-only Open/Closed text), 44×44 targets,
  single-CTA bar hierarchy from the fix pass, header search
  behaviour unchanged, 1280px nav breakpoint unchanged (the bar
  cannot overflow at 1280/1440px the way the R1 audit found, but
  see §6 — live width measurement is still owed).

### 2. Headings — modern system, no oversized serif boilerplate
- Before: base h1–h4 in Fraunces serif; PageHero 40/56px serif;
  SectionTitle 32/38px serif with mono eyebrow and side rules.
- After (`src/app/globals.css`, `src/components/ui.tsx`): base
  h1–h4 are now Instrument Sans, bold, tracking −0.02em.
  PageHero is 34/48px sans bold tracking-tight on a support-canvas
  band with a short brand rule; SectionTitle is 26/32px sans bold
  tracking-tight with a plain sans uppercase label (no side
  rules). FAQ summaries, service-card titles, feature-trio titles,
  home row labels, and the "Request a service consultation" h3
  were moved from serif to the same sans language. Content
  wording is unchanged in every heading.

### 3. Footer — restructured by visitor task, same links
- Before: ink footer, serif 19px column heads, mono uppercase
  bottom bar, "Quick Links" / "Contact Info" columns.
- After (`src/components/Footer.tsx`): column heads are 13px sans
  bold uppercase tracking; columns are now headed Company /
  Get Started / Popular Trainings / Visit Us; link rows keep
  44px height and gain only a soft hover surface; bottom bar is
  clean sans (no mono uppercase). No link added, no link removed,
  no link renamed — the link sets before and after are identical
  (verified in §4). Draft Privacy/Refund pages are still NOT
  linked.

### 4. Course cards — modern
- Before (`src/components/ui.tsx`): parchment card, h-44 fixed
  image with sepia-[0.14] and a dark gradient, mono chips and
  "Free Demo" badge, serif title, no status distinction.
- After: `modern-card` surface (raised, soft border, small lift
  on hover, reduced-motion safe); image area is a true 16:9
  `aspect-video` (no fixed height, no sepia, no gradient wash);
  category is a rounded-full chip; catalog-only courses carry
  the honest chip "Coming soon — ask us" and are NEVER labelled
  Available; full courses carry no status chip (no status is
  claimed for them here). Title is sans bold tracking-tight;
  CTAs are 44px (Read More + pill Free Demo, same hrefs).
  Service cards and blog cards use the same modern card and
  16:9 treatment. The catalog-only chip is plumbed honestly:
  `CatalogueSearch` now passes `catalogOnly` through from the
  catalogue data, and `CourseCard` passes `course.catalogOnly`.

### 5. Images — repeated + fitted, fixed at the cause
- Before: home hero blocks reused 4 course photos
  (cybersecurity-technologies, aws-solutions-architect-associate,
  soc-analyst, ccna) that also appear as course cards on
  /trainings; trainings showcase reused 3 course photos
  (microsoft-sentinel, aws-solutions-architect-associate,
  hardware-networking) plus 1 blog photo (Information_warfare)
  that also appears in BlogCards on the same page; card photos
  were sepia-filtered and forced into h-44 / h-32 / h-36 boxes
  with object-cover cropping, worse on responsive widths.
- After: sepia is gone from every card (grep: 0 hits); no card
  uses a fixed image height (grep: 0 hits for h-44/h-32/h-36 on
  images). Home hero blocks and the trainings showcase are now
  DESIGN-LED cards — logo-palette gradient surfaces (support
  deep → teal, dark-theme gradient re-pointed to the dark end
  so white text stays AA) with an initial / index mark, no photo
  at all. Labels, bodies, hrefs, titles, and order are unchanged.
  Course photos themselves are untouched: the catalogue still
  has 36 unique images, one per course, each shown once as a
  course card in aspect-video with correct `sizes` — no
  stretched fit, no forced height, no new asset, no hotlink.
  BlogCards keep their own unique blog photos (not course
  photos), now in aspect-video.

### 6. Tokens
- Logo anchor unchanged: orange #E57439, charcoal #434140.
  Supporting R1 tokens (deep #17324D, deep-soft #EAF0F5, teal
  #0D766E, teal-strong #0A5C55, canvas #F7F5F0; dark values as
  in globals.css) are reused, not replaced. No new token was
  introduced. Every new pairing used here was contrast-computed
  (table in §3).

## 2. Files changed

- `src/app/globals.css` — modern heading base, `modern-card`,
  `design-led-card`, `modern-chip` utilities, dark-theme
  design-led gradient, reduced-motion guard.
- `src/components/Header.tsx` — nav bar, triggers, mega panel,
  drawer, utility strip (presentation only).
- `src/components/Footer.tsx` — headings, hover surface,
  bottom bar (link sets identical).
- `src/components/ui.tsx` — PageHero, SectionTitle,
  CourseCardBody/CourseCard (+catalogOnly), ServiceCard,
  BlogCards, FaqList, FeatureTrio headings.
- `src/components/CatalogueSearch.tsx` — `catalogOnly` plumbed
  through (1 line of type + pass-through).
- `src/app/page.tsx` — hero h1 sans, hero blocks design-led,
  row labels sans, consultation h3 sans. No wording changed.
- `src/app/trainings/page.tsx` — showcase design-led,
  `catalogOnly` mapped into search. No wording changed.
- `src/data/nexus-nav.ts` — UNTOUCHED (byte-identical).

## 3. Contrast table (computed WCAG, all ≥ AA normal 4.5:1)

| Pairing | Ratio |
|---|---|
| Heading #2a2726 on canvas #fffbf5 | 14.38:1 |
| Body #5a5654 on canvas #fffbf5 | 7.04:1 |
| Signal-strong #9c3e18 on canvas #fffbf5 | 6.54:1 |
| Signal-strong #9c3e18 on brand-soft #fdf1ea (category chip) | 6.08:1 |
| White on brand-600 #c24e1f (Free Demo badge) | 4.77:1 |
| White on support-deep #17324d (design-led card) | 13.13:1 |
| White on teal #0d766e (design-led gradient end, light) | 5.48:1 |
| Heading #fffbf5 on dark canvas #171412 | 17.79:1 |
| Body #d8d2cd on dark canvas #171412 | 12.24:1 |
| Signal #ff8a4c on dark canvas #171412 | 7.85:1 |
| Signal-strong #ffb287 on dark canvas #171412 | 10.45:1 |
| Paper #fffbf5 on dark deep-soft #16283c | 14.52:1 |
| Teal-strong #0a5c55 on canvas #fffbf5 | 7.61:1 |
| Teal-strong dark #5eead4 on dark canvas #171412 | 12.40:1 |
| White on dark design-led end #0a3d38 | 12.09:1 |
| White on dark support-deep #1d3a5c | 11.59:1 |

The dark-theme design-led gradient deliberately does NOT reuse
the light teal end (#2ab3a3, white = 2.60:1, fail); it is
re-pointed to #0a3d38 (12.09:1).

## 4. Verification (branch-local, before commit)

- Build: PASS, 101/101 static pages locally. NOTE: the local
  tree contains the parent's untracked `/careers` page, so the
  local count is 101; the preview built from the committed
  branch tarball (without `/careers`) is expected at 100 pages
  — the preview build itself is the count that matters, and it
  is reported in the deploy step.
- Lint: 0 errors, 2 pre-existing warnings (postcss anonymous
  export; unused `_course` in leads route), 0 new.
- Tests: 10/10 (Vitest).
- Local smoke GETs 200: / 177,067 B, /trainings 213,011 B,
  /trainings/ccna-200-301 151,128 B,
  /trainings/azure-security-engineer-az-500 97,982 B, /services
  127,126 B, /contact-us 52,900 B. Rendered /trainings HTML:
  `aspect-video` 50×, `sepia` 0×; AZ-500 page carries the
  "Coming soon — ask us" chip 2× (card + detail context).
- Rendered-copy grep: 0 invented claims; the single
  "real catalogue" hit in `src/app/page.tsx` is a code comment,
  not rendered copy (same rule as the fix pass).
- URL preservation: `src/data/nexus-nav.ts` byte-identical;
  54 unique destinations before, 54 after, 0 deleted, 0 added.
  Footer link sets before/after identical (25 distinct
  destinations each: 22 column links + 3 bottom-strip links).
- Image audit: sepia 0 hits; fixed-height image classes
  (h-44/h-32/h-36) 0 hits; course images 36 unique / 36 courses;
  home hero photo reuse 4 → 0; trainings showcase photo reuse
  4 → 0; blog photos remain unique blog photos, not course
  photos.

## 5. Open blockers (NOT claimed past)

1. Live viewport/Lighthouse/axe/keyboard/tap-target measurement
   is still unmeasured by sandbox Chrome — the sandbox browser
   failure is unchanged. The new header/card treatment is code-
   verified, not live-measured. Owner phone test on the new
   preview is owed (nav, drawer, headings, footer, cards, images
   on responsive widths).
2. Live header-overflow retest at 1280/1366/1440/1536px
   (`scrollWidth === innerWidth`) still required on the new
   preview; trigger padding moved only 4px→6px per side, but
   only a live check settles it.
3. Catalogue gate unchanged (CCNA, CCNP, 25 divergences,
   migration 0006 unapplied). No DB, Supabase, SSO, production,
   merge, payment, or paid-tier change in this pass.
4. Owner UI acceptance is separate from any tool pass: this
   preview is a candidate for his eye, not an approval.
