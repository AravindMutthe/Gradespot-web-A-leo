# Nexus UI Redesign — Pass R1 Implementation Report (2026-10-27)

**Status: BRANCH-LOCAL IMPLEMENTATION ONLY. NOT MERGED, NOT DEPLOYED,
NOT PREVIEWED, NOT CLAIMED AS OWNER-ACCEPTED.**

Branch: `feat/frontend-v2-platform`. Tip before: `69d0987`.
Tip after: `69d0987` (unchanged — work is **uncommitted** by design
for this subagent; the parent decides commit / preview / push).
No push, no merge to main, no production deploy, no SSO change,
no Supabase write, no migration apply, no lead POST, no payment,
no replica / portfolio / Royal Salon / Atlas work.

**Scope: Pass R1 only**, per
`docs/frontend-v2/UI-REDESIGN-AUDIT-2026-10-27.md` §3 (R1) plus the
owner addition of 2026-10-27: the redesigned site must be 100%
responsive to all devices and screens. R2 (menu content
organisation, footer regrouping) and R3 (page section bands,
search-adjacent page treatment) are **explicitly NOT done**.
Six Nexus groups, their labels, and all destinations in
`src/data/nexus-nav.ts` are unchanged — that file is
byte-identical to HEAD. Das's conceptual navigation
(GradeSpot | Explore training | Business solutions | About |
Get in touch) was **not** adopted in R1: it is concept only, and
replacing the six groups would have been a scope violation.

## 1. Files changed (3 tracked files, 0 new code files)

| File | Change |
|---|---|
| `src/components/Header.tsx` | Rewritten (see §3). Old file ~493 lines; new file 769 lines. No other component was changed. |
| `src/app/globals.css` | R1 supporting tokens in `@theme` + `.dark` overrides; R1 base-layer responsiveness safeguards; `nexus-row` stacks below 640px (see §5). |
| `docs/frontend-v2/BRAND-TOKENS.md` | v2 section appended (80 lines). The v1 sampling is untouched — v2 is an addition, not a silent rewrite. |

Untouched, by design: `src/data/nexus-nav.ts` (byte-identical to
HEAD), `src/data/catalogue-nav.ts`, `src/data/services.ts`,
`src/data/site-settings.ts` (CTA labels/hrefs/order unchanged),
logo files (`public/images/logo.png`,
`public/images/logo-light.png` — `git status` clean for both),
Footer, all page components, all catalogue content.

## 2. New tokens + contrast ratios (both themes, computed, not claimed)

Brand anchor unchanged: sampled logo orange #E57439 and charcoal
#434140. Supporting colours are supporting only — never a
primary CTA, never outranking logo orange/charcoal. Primary CTA
remains the logo-orange gradient (`btn-primary`).

Light theme tokens (globals.css `@theme`):
`nexus-support-deep` #17324D, `nexus-support-deep-soft` #EAF0F5,
`nexus-support-teal` #0D766E, `nexus-support-teal-strong`
#0A5C55, `nexus-support-canvas` #F7F5F0.

Dark theme tokens (`.dark` overrides): deep #1D3A5C,
deep-soft #16283C, teal #2AB3A3, teal-strong #5EEAD4,
canvas #201C19. Dark page canvas remains #171412.

Computed WCAG ratios (AA normal = 4.5:1, AA large = 3:1):

Light:
- White #FFFFFF on deep #17324D — 13.13:1 AA normal
- Paper #FFFBF5 on deep #17324D — 12.73:1 AA normal
- Deep #17324D on canvas-alt #F7F5F0 — 12.05:1 AA normal
- Deep #17324D on deep-soft #EAF0F5 — 11.43:1 AA normal
- Ink #2A2726 on deep-soft #EAF0F5 — 12.90:1 AA normal
- Brand-700 #9C3E18 on deep-soft #EAF0F5 — 5.87:1 AA normal
- Teal #0D766E on deep-soft #EAF0F5 — 4.77:1 AA normal
- Teal #0D766E on white — 5.48:1 AA normal; on canvas #FFFBF5 — 5.31:1 AA normal
- White on teal #0D766E — 5.48:1 AA normal
- Teal-strong #0A5C55 on white — 7.85:1 AA normal; on canvas-alt — 7.21:1 AA normal
- White on teal-strong #0A5C55 — 7.85:1 AA normal
- Ink #2A2726 on canvas-alt #F7F5F0 — 13.61:1 AA normal
- Brand-700 #9C3E18 on canvas-alt #F7F5F0 — 6.19:1 AA normal

Dark:
- Paper #FFFBF5 on deep #1D3A5C — 11.24:1 AA normal
- White #FFFFFF on deep #1D3A5C — 11.59:1 AA normal
- Paper #FFFBF5 on deep-soft #16283C — 14.52:1 AA normal
- Muted #D8D2CD on deep #1D3A5C — 7.74:1 AA normal
- Teal-bright #5EEAD4 on canvas #171412 — 12.40:1 AA normal
- Teal #2AB3A3 on canvas #171412 — 7.05:1 AA normal
- Paper #FFFBF5 on canvas #201C19 — 16.41:1 AA normal
- Brand-bright #FF8A4C on canvas #171412 — 7.85:1 AA normal
- Brand-bright #FF8A4C on deep #1D3A5C — 4.96:1 AA normal

FORBIDDEN pairings (computed, not used in R1):
- Brand-600 #C24E1F on canvas-alt #F7F5F0 — 4.38:1, FAILS AA
  normal (large only). Use brand-700 (6.19:1) instead.
- Brand-600 #C24E1F on deep-soft #EAF0F5 — 4.15:1, FAILS AA
  normal (large only). Use brand-700 (5.87:1) instead.
- Sampled orange #E57439 as normal text on white — 3.05:1,
  FAILS AA normal (v1 record). Graphics / large text / on-dark only.

A dark-theme trap found and fixed during implementation: an
early draft used dark-blue text (`nexus-support-deep`, dark value
#1D3A5C) on dark-blue hover backgrounds (`nexus-support-deep-soft`,
dark value #16283C) — contrast ~1.2:1. That pairing was removed
before build; hover/open states now keep heading text on the
support background (12.90:1 light, 14.52:1 dark for paper on
deep-soft). This is why the token table above, not the draft,
is the record.

Where R1 uses the tokens: featured mega-panel / mobile featured
card background (`support-deep` + paper text); menu / search
hover backgrounds (`support-deep-soft` + heading text); search
kind labels and mobile column titles (`support-teal-strong`).
`support-canvas` is defined for R2/R3 section bands; R1 header
code does not apply it to page sections, so R1 claims no new
page section treatment.

## 3. Header / menu / search behaviour changes (R1)

**Single utility strip, one behaviour.** Pre-R1 the strip was
rendered twice (once per breakpoint) with different sticky
behaviour. R1 renders it once, above the header, and it scrolls
away on every size; only the header bar itself is sticky.
Content (location, email, phones, socials, Contact, Student
Support) is unchanged.

**One CTA hierarchy, no second header row.** Desktop bar:
primary "Talk to an Advisor" → /contact-us always; secondary
"Explore Programs" → /trainings always alongside it; outline
"Book Free Demo" → /register only at xl. Mobile bar: search icon
+ Menu button only; all three CTAs sit at the top of the mobile
drawer in primary → secondary → outline order. The pre-R1
permanent second search row at 960–1280px is removed. No sticky
two-row header remains in the code.

**Menu openers: 44×44px, visible open state, click-primary.**
Pre-R1 chevrons were 16px wide at the nav breakpoint. R1 triggers
are single buttons, minimum 44×44px at every size, with label +
rotated chevron + background + ring when open, and an
"Open"/"Closed" screen-reader state — not only a ▾/▴ glyph.
Click toggles (primary activation). Hover opens as an
enhancement only, with a 400ms gap-tolerant close delay and a
panel that cancels close on hover, so a small pointer gap never
drops the menu. Keyboard: Enter/Space opens, Escape closes and
returns focus to that trigger. Focus alone does not auto-open
(pre-R1 focus-open behaviour removed, to avoid trapping keyboard
users).

**Mega panel: content-responsive, featured only where distinct.**
Pre-R1: fixed `grid-cols-[1fr_300px]` on every menu, capped at
`max-h-[calc(100vh-170px)]` with internal scrolling. R1: column
count follows the menu's actual column count (1/2/3); the
featured panel renders only where its CTA href differs from the
group href (Certifications, IT Solutions, Company & Resources
show it; Academy, Career Pathways, Labs & Projects do not, because
their featured CTA duplicates the group link — see §4 for the
preservation consequence, which is none: the destination is the
group link itself). The panel's max-height fallback
(`calc(100dvh-120px)`, scroll only if taller than the viewport)
means: no internal scrolling where the panel fits the viewport,
scroll only as a fallback where it cannot fit. Featured panel
styling is now supporting deep blue + paper text, instead of the
repeated ink panel on every menu.

**Mobile drawer, not a scroll dump.** Pre-R1: an inline accordion
under the bar, one level, all links of a group shown at once in a
62vh scrolling box. R1: a fixed dialog drawer (`role="dialog"`,
`aria-modal="true"`, backdrop click closes, Escape closes, focus
to Close on open, focus returned to the Menu button on close,
body scroll locked while open), width `min(420px, 92vw)`, full
viewport height. Group list → group view with a sticky
"← All menus" back control + sticky "View group" action at the
top of the group view; columns inside a group are individually
collapsible (44px+ title buttons, rotated chevron, aria-expanded);
search and CTAs sit at the drawer top and are not unmounted when
switching groups; group/column open state is kept across taps
and across drawer close (it is not reset on every tap). All six
menus and all their links are rendered. The Academy contextual
"Register / Book a Demo" link is preserved inside the Academy
group view.

**Search: whole menu, keyboard, touch-safe.** Pre-R1 search
covered courses (5) + services (3), capped at 8, no keyboard
navigation, 150ms blur-timeout close. R1 index (built once from
existing data only) covers: all 36 courses (label/title/category/
code), all 12 services, all 6 menu groups, every column link in
`nexus-nav.ts`, and every featured CTA — with kind labels
(Training / Service / Menu · {group}). Results are capped at 10,
starts-with matches first, then shortest label. Keyboard: Arrow
Down/Up cycles, Enter selects, Escape clears and closes.
Blur closes only when focus actually leaves the search container
(no 150ms timeout). Results have an explicit Close control
(44px) in addition to Escape and selection. No destination is
invented: every hit's href comes from `catalogue-nav.ts`,
services data, or `nexus-nav.ts` as it exists in this repo.
Inline search is used at xl and in the drawer; icon-triggered
popover search (44×44px button, absolute panel
`w-[320px] max-w-[92vw]`, Close control, focus returned to the
button on close) is used at nav–xl and on mobile.

## 4. URL-preservation check (old = HEAD `nexus-nav.ts`)

`src/data/nexus-nav.ts` is byte-identical to HEAD, so "old" and
"new" menu data are the same file. The check below is therefore
a render check: is every destination in that file still reachable
from the new header (desktop panel, mobile drawer, or both) or
from the unchanged footer?

- Total href occurrences in old `nexus-nav.ts`: **91**,
  unique destinations: **54**. No external links (0).
- All 91 occurrences render: every column link renders via
  `MenuLinkItem` on desktop and in the mobile drawer; every
  group href renders as a "View {group}" link on desktop and in
  the mobile drawer, and as a search hit; every distinct featured
  CTA renders in the featured panel/card.
- **Moved, not removed (2 interaction moves, both listed):**
  1. Group landing pages: pre-R1 the desktop trigger was a text
     link to the group href plus a separate chevron button. R1
     the trigger is a button (click-to-open, required for
     44×44px + click-primary activation); the group href is
     reached via the panel footer "View {group} →" link on
     desktop, the sticky "View {group} →" action in the mobile
     drawer, and the search index. Destination preserved;
     interaction changed.
  2. Featured panels for Academy, Career Pathways, and Labs &
     Projects: pre-R1 these rendered a featured card whose CTA
     duplicated the group href (/trainings, /career-support,
     /trainings). R1 hides that card by the distinct-CTA rule
     (§3). Destination preserved (it is the group link itself);
     the repeated card is removed, not the destination.
- **Disappeared destinations: none.** No destination in old
  `nexus-nav.ts` is missing from the new header, and no new
  destination was added. No slug renamed, no category added or
  removed, no menu option removed.
- Footer destinations were not changed in R1 (footer regrouping
  is R2); the footer still renders its previous links, so
  footer-reachable destinations are unchanged as well.

## 5. Responsiveness — what was fixed, and what is NOT claimed

Owner addition (hard requirement): the redesigned site must be
100% responsive to all devices and screens, from 320 CSS px to
1920+ CSS px, continuous sweep, portrait and landscape, with no
horizontal overflow, clipping, or lost content, and WCAG reflow
at 320px without two-dimensional scrolling (except genuinely
tabular content, flagged not hidden).

### Fixes applied in R1 (+ responsive addition)

- **Removed / fluidised fixed widths in R1 code:**
  - Old fixed 300px featured panel → content-responsive grid;
    featured is 280px only at lg+ and only where shown, inside a
    `max-w-[1240px]` container that shrinks (it is a max-width,
    not a fixed width; at 960px the panel is ~960px wide, and
    below lg the grid stacks to a single column).
  - Old `max-w-[1240px]` mega-panel container: kept as a
    max-width (shrinks with the viewport) with `px-3`; it is not
    a fixed width and does not force overflow.
  - Search popover: `w-[320px] max-w-[92vw]` — fluid below 348px.
  - Mobile drawer: `w-[min(420px,92vw)]` — fluid at every width.
  - Mobile bar at 320px: logo reduced to h-10 (was h-12 below
    nav), Menu button compacted (px-3, label hidden below
    360px so the button is just ☰ at 320px, still 48px tall).
    Estimated 320px bar total: wrap padding 40 + logo ~128 +
    search 44 + menu ~52 + gaps ~16 = ~280px < 320px.
  - Desktop triggers at nav: px-1 / 11px at nav, px-2.5 / 13px
    at xl; secondary CTA 13px at nav; primary CTA px-3 / 12px
    at nav — to reduce the 960px bar total after secondary
    became always-visible (see open risk below).
  - Utility strip: `flex-nowrap` + `overflow-hidden` + truncated
    first span — content truncates, it does not push the page
    sideways (truncation of the location line at very small
    widths is accepted; Contact link remains visible).
  - Global base-layer safeguards (globals.css, in `@layer base`
    so utilities still win): `img, video { max-width: 100%;
    height: auto; }` and `overflow-wrap: break-word` for
    p/li/a/td/th/headings. No `overflow-x: hidden/clip` on
    html/body was added — that would hide overflow instead of
    fixing it and would mask this check.
  - Shared `nexus-row` (homepage label + detail rows with fixed
    w-40 / w-36 / w-32 labels): stacks below 640px
    (`flex-direction: column; align-items: flex-start`) instead
    of squeezing a fixed label beside a detail at 320px. At
    sm+ it keeps its row layout. This affects every `nexus-row`
    usage (homepage skill graph, steps, journey rows) — all are
    label + detail rows, for which stacking at mobile is the
    correct responsive behaviour.
  - `.wrap` container: `max-width: 1200px` with 20/24px padding —
    a max-width, shrinks at every width. Footer grid: 1 column
    below md, 2 at md, 5 fractional columns at lg — no fixed
    column widths.
- **Touch / interaction at every size:** all new openers,
  search buttons, drawer controls, and menu links are at least
  44px in their narrow dimension (44×44px triggers, 48px mobile
  buttons, 44px search/close controls, 44px menu links).
  No hover-only activation remains in R1 header code: click is
  primary, hover is enhancement, keyboard and Escape and visible
  Close controls all work. Drawer and mega panel fit viewport
  height (drawer `h-full`; panel `max-h: calc(100dvh-120px)`
  fallback scroll only if taller than the viewport).
- **Images:** base-layer `max-width: 100%; height: auto` (see
  above). No image in R1 header code has a fixed pixel width
  that exceeds its container (logo uses height classes with
  `w-auto`).
- **Long words / URLs:** base-layer `overflow-wrap: break-word`
  (see above). No long unbreakable string was found in R1 header
  code; the longest menu labels wrap inside their column
  (columns are not `whitespace-nowrap` except the desktop
  trigger buttons, whose text is short group labels).
- **Tabular content (flagged, not hidden):** `/compare/[pair]`
  renders a table with `min-w-[640px]` inside an
  `overflow-x-auto` wrapper — internal horizontal scroll for
  genuinely tabular content, by design. That page is NOT in the
  required six-page check below, and its table is NOT hidden.
  No table exists on the six required pages' R1-touched code.

### Per-page, per-width check — READ THIS BEFORE CLAIMING "100% RESPONSIVE"

**Live viewport rendering was NOT measured in this subagent.**
Evidence: headless Chromium in this sandbox hangs on both a
`data:` URL and the local Next.js server (timeout 25s on a data
URL; an earlier headless run stayed running past 60s and had to
be killed by PID). This is the same sandbox-Chrome failure
already recorded for Lighthouse/axe work — Chrome networking in
this sandbox is broken, not the site. A subagent cannot operate
the live browser, so no viewport sweep (scrollWidth vs
clientWidth at each width, portrait/landscape) could be run here.

The table below therefore records, for each required page and
each required width, whether the check is **code-verified**
(no fixed-width overflow pattern in the code for that width,
with the reasoning given) or **UNMEASURED** (live rendering not
run). Code-verified is not a substitute for a live sweep, and
**"100% responsive" is NOT claimed by this report.**

Widths required: 320, 360, 375, 390, 414, 600, 768, 800, 900,
1024, 1100, 1280, 1366, 1440, 1536, 1920, plus portrait and
landscape for phone/tablet sizes. The reasoning below applies
uniformly across those widths for the header chrome (the only
code R1 changed), because every R1 header element is either
fluid (max-width / min() / %), hidden below a breakpoint, or
stacked below a breakpoint — there is no R1 header element with
a fixed pixel width larger than the smallest viewport, except
the lg+ featured column (280px, only at ≥1024px, inside a
shrinking max-width container) and the search popover (320px
capped at 92vw). Page-body content was not rebuilt in R1, so
page-body overflow at a given width cannot be ruled out from
R1 code alone — that is the open blocker in §6, not a passed
check.

| Page | Widths | Header / chrome (R1 code) | Page body (pre-existing, NOT rebuilt in R1) | Live rendering |
|---|---|---|---|---|
| / (homepage) | 320–1920, portrait + landscape | Code-verified fluid: drawer <960, single bar ≥960, popover ≤92vw, logo h-10, compact triggers ≥960 | NOT rebuilt: H1 44px (md: 68px) wraps; nexus-row stacks <640 (R1 fix); other homepage sections use max-width containers and responsive grids in pre-existing code — not re-audited element-by-element here | UNMEASURED — live sweep required |
| /trainings | 320–1920 | As above | NOT rebuilt: catalogue cards / filters are pre-existing code — not re-audited here | UNMEASURED |
| /trainings/ccna-200-301 (full) | 320–1920 | As above | NOT rebuilt: course detail sections are pre-existing code — not re-audited here | UNMEASURED |
| /trainings/azure-security-engineer-az-500 (catalog-only) | 320–1920 | As above | NOT rebuilt: catalog-only detail is pre-existing code — not re-audited here | UNMEASURED |
| /services | 320–1920 | As above | NOT rebuilt: services listing / detail are pre-existing code — not re-audited here | UNMEASURED |
| /contact-us | 320–1920 | As above | NOT rebuilt: lead form (p-7 card, full-width fields) is pre-existing code — not re-audited here | UNMEASURED |

Orientation note: portrait vs landscape at phone/tablet widths
changes only the viewport width/height the same fluid rules
apply to (drawer `h-full`, panel `100dvh` fallback, bar
single-row). No orientation-specific code exists in R1, so no
orientation-specific breakage is introduced by R1 code — but,
again, that is a code statement, not a live landscape measurement.

### Known risk areas (exact, not hidden)

1. **Desktop bar at 960–1099px — RISK, not proven overflow.**
   With secondary CTA now always visible in the bar, the
   960px bar total (logo + 6 compact triggers + search icon +
   secondary + primary + wrap padding) is estimated to be close
   to, and possibly just over, 960px. Compact fixes (11px
   triggers, px-1 padding, smaller CTAs, h-10 logo) were applied
   to reduce it, but without a live render the fit at 960px
   cannot be confirmed. If the parent's live sweep shows the bar
   overflowing or wrapping at 960–1099px, the R1-scope fix is
   to hide the secondary CTA below 1280px (primary only in the
   bar, secondary in the drawer / mega-panel footer) — that
   change is documented here as the fallback, not silently
   applied, because it would revise the "secondary always in
   the bar" hierarchy.
2. **Homepage at 320px — visual density, not overflow.**
   The 44px H1 and stacked nexus-rows will be tall at 320px.
   No fixed-width element forces horizontal overflow in the
   code, but whether the page *feels* usable at 320px is a
   phone-test judgement, not a code proof.
3. **Mega panel on short viewports — fallback scroll.**
   On a short landscape phone/tablet viewport where the panel
   is taller than `100dvh - 120px`, the panel scrolls internally.
   That is the documented fallback (not a page-sideways push),
   and it is the only internal scroll R1 introduces — and only
   when the panel cannot fit.
4. **Pre-existing page-body fixed widths outside R1 scope.**
   A full-page rebuild to audit every section, card, and form
   on all six pages at all 16 widths would exceed R1 scope
   (header/tokens only). That audit is stated here as remaining
   work for a full-page responsiveness pass, not silently
   claimed as done.

## 6. Verification results

- **Build:** `npm run build` — PASS. Compiled successfully
  (final run after the §7 column rule and the §8 reduced-motion
  rule), 99/99 static pages generated.
- **Lint:** `npm run lint` — 0 errors, 2 warnings, both
  pre-existing (postcss.config.mjs anonymous default export;
  `_course` unused in `src/app/api/leads/route.ts`). An
  earlier R1 draft introduced a third warning (unused
  eslint-disable in Header.tsx); it was removed before the
  final build, so R1 adds 0 new warnings.
- **Tests:** `npm test` (Vitest 3.2.7) — 10/10 passed
  (`tests/nexus-v2.test.ts`).
- **Smoke (local `next start`, GETs only, no lead POST):**
  `/` 200, `/trainings` 200, `/trainings/ccna-200-301` 200,
  `/trainings/azure-security-engineer-az-500` 200, `/services`
  200, `/contact-us` 200. (Final build server, PID-killed after
  the check; no server left running by this subagent.)
- **Grep checks on the diff:** no ₹ / price figures, no Vercel
  Pro / Supabase Pro / paid tier / tracker strings, no Atlas
  content (Atlas is mentioned only in pre-existing comments
  about the disabled integration seam, not in R1 code), no
  hotlinked URLs in the diff, no new external links.
- **Logo:** untouched (see §1). No new UI library on public
  pages (React + Next.js + Tailwind only, as before). No
  Supabase write, no migration, no lead POST, no merge, no
  deploy, no SSO change, no push.
- **What was NOT verified (open blockers, not waived):**
  1. Live viewport sweep at 320–1920px + portrait/landscape
     (see §5) — requires a real browser (parent browser task
     or owner phone), because sandbox Chrome hangs. Until it
     runs, "100% responsive" must not be claimed.
  2. Desktop bar fit at 960–1099px (see §5, risk 1) — same live
     sweep, with the documented fallback if it overflows.
  3. Keyboard / screen-reader / axe / Lighthouse on the new
     header — not run in this subagent (same sandbox-Chrome
     limitation). The code is keyboard-operable by construction
     (44px targets, Escape, focus return, aria-expanded /
     aria-controls / aria-modal), but that is a code statement,
     not a measured axe/Lighthouse pass.
  4. Owner phone test on the redesigned header/menu/search —
     still owed (the acceptance that matters most, per the
     audit). No preview was deployed by this subagent, so no
     phone test could be run on a preview URL.

## 7. Adaptable / growable / flexible — extension points (owner principle, applied in R1)

R1 header, mega panel, drawer, and search are driven by data,
not by hard-coded layouts. Nothing in R1 assumes exactly six
groups or exactly three columns — except the two honest caps
flagged at the end of this section.

**How the data drives the UI today (verified in code):**
- Groups: `nexusMenus` (`src/data/nexus-nav.ts`, typed
  `NavMenu[]`) is mapped for desktop triggers, desktop panel,
  mobile group list, mobile group view, and search. Adding a
  group object renders it everywhere; removing one removes it
  everywhere (no per-page header copy exists — `Header` is a
  single component used by `Chrome` on every page).
- Columns: a group's `columns: NavMenuColumn[]` are mapped
  for desktop and for collapsible drawer columns. Column count
  is rendered via the `.nexus-menu-cols` CSS class
  (globals.css) with `--menu-cols` set from
  `activeMenu.columns.length` (capped at 3 per row for
  readability; a 4th+ column wraps to a second row, it does not
  overflow). The earlier R1 draft's ternary
  (`length === 1 ? 1 : length === 2 ? 2 : 3`) was replaced by
  this data-driven rule before the final build, precisely so
  column count is not hard-coded in Header.tsx.
- Featured panel: the rule is data-driven and identical on
  desktop and mobile — `showFeatured(menu)` is true iff
  `menu.featured.ctaHref !== menu.href`. No group name is
  special-cased.
- CTAs: `enabledHeaderCtas()` (`src/data/site-settings.ts`)
  filtered by `enabled`, selected by `style` (primary / text /
  outline). Relabelling, reordering, or disabling a CTA is a
  data change; Header code does not contain the CTA labels or
  hrefs as literals (the only literal CTA in Header is none —
  labels/hrefs come from site-settings).
- Search index: `buildSearchIndex()` in Header.tsx is generated
  at module load from `navCourses` (catalogue-nav.ts),
  `services` (services.ts), and `nexusMenus` (nexus-nav.ts) —
  courses, services, groups, every column link, every featured
  CTA. It is not a hand-maintained list. A destination added to
  any of those three data files appears in search on the next
  build with no Header edit.
- Breakpoints follow content width, not a device list: the
  nav breakpoint is `--breakpoint-nav: 60rem` (960px, the width
  at which the full bar fits, not a phone model); the drawer
  is used below it, the bar above it; the mega-panel grid
  switches at `sm` (640px) and `lg` (1024px) based on panel
  width, and the featured column only at lg+. The responsive
  sweep in §5 is therefore about widths, not devices — a new
  content width or a future section reflows under the same
  rules, it does not need a new breakpoint unless its own
  content demands one.
- Tokens in one place: all R1 colours live in
  `BRAND-TOKENS.md` (v2 section, documented) and in
  `globals.css` `@theme` + `.dark` (implemented). No R1 colour
  is written per page or per component as a literal hex, except
  the pre-existing page code R1 did not touch. A future palette
  change is a token change in those two places, not a
  page-by-page edit.
- Reusable primitives (one definition, used everywhere):
  `HeaderSearchInner` (desktop inline, compact popover, mobile
  popover, drawer search — four usages, one component),
  `MenuLinkItem` (desktop panel links and drawer links),
  `SearchPopover` (compact and mobile). A fix in any of these
  fixes every page, because every page uses the same `Header`
  via `Chrome`.

**Exactly how to extend, without touching header layout code:**

(a) **New menu destination:** add a `{ label, href, note? }`
    link to the appropriate `columns[].links[]` in
    `src/data/nexus-nav.ts` (or change an existing link's href
    there). It renders in the desktop panel, the mobile drawer,
    and search on the next build. No Header edit. If the link
    is external, set `external: true` (existing `NavMenuLink`
    field) — it renders with `↗` and `rel="noreferrer"`.
(b) **New nav group:** append a `NavMenu` object
    (`key`, `label`, `href`, `columns[]`, `featured`) to
    `nexusMenus` in `src/data/nexus-nav.ts`. It renders as a
    desktop trigger + panel, a mobile drawer group, and a
    search hit. No Header edit. Caveat (flagged, not hidden):
    the desktop bar has room for roughly the current six
    groups at 960px (see §5 risk 1); a seventh group will need
    a bar-width decision (compact triggers, overflow menu, or
    a higher nav breakpoint) at that time — the group itself
    will still render, but the bar fit must be re-checked.
(c) **New course / service category:** add the course to the
    catalogue data that feeds `navCourses` (catalogue-nav.ts)
    or the service to `services` (services.ts), with its slug
    and category. It appears in search on the next build; it
    appears in the menu only if a menu link to it is also added
    under (a) — search and menu are both data-driven, but they
    read different data files, so a course is not
    automatically a menu entry. A new *category* (a new
    grouping value, not a new course) needs no Header edit, but
    the category filter UI on `/trainings` is pre-existing code
    outside R1 and must be checked separately if categories
    change — that is a catalogue-page concern, not a header
    concern, and R1 does not claim it.
(d) **New token:** add the colour to `BRAND-TOKENS.md` (v2
    section, with its computed contrast ratios in both themes)
    and to `globals.css` `@theme` (light) and `.dark`
    (dark). Then use the token name (e.g.
    `bg-nexus-support-*`) in a component. Do not write a hex
    literal in a component. If a token is intended for text,
    its pairings must be computed and filed in BRAND-TOKENS.md
    before use — the forbidden pairings in §2 are the template
    for what "filed" means.

**Places where R1 still hard-codes something (flagged, not claimed flexible):**
- `--menu-cols` caps at 3 per row (readability cap, wraps
  beyond — deliberate, documented above).
- The `nav` breakpoint (960px) and the drawer/bar switch are
  fixed breakpoints; a future section wider than the bar will
  need a breakpoint decision, not automatic adaptation.
- The desktop bar fits roughly six groups (see (b) caveat).
- The featured-panel width (280px at lg+) is a fixed column
  width inside a shrinking container — it adapts by hiding
  below lg, not by fluidising, because a featured card needs a
  minimum readable width. That is a deliberate readability floor,
  not an overflow risk (panel container shrinks, featured
  stacks below lg).
- Search ranking (starts-with first, then shortest label, top
  10) is a fixed rule in code, not data — changing ranking
  needs a Header edit. Search *content* is data-driven;
  search *ranking* is not, and that distinction is recorded
  here so it is not overstated.

No new category, group, course, or page was added in R1.
Growth readiness is the goal; R1 ships only the existing
destinations, reorganised to grow.

## 8. Efficient / optimized (owner principles, applied in R1)

(a) **Dependencies added: none.** `package.json` is untouched
    by R1. No library, framework, plugin, or font was added.
    If a library had been needed, R1 would have stopped and
    reported it instead of adding it — none was.
(b) **New assets added: none.** No image, font, icon, script,
    or stylesheet was added. Logo files are untouched and
    reused at their existing sizes (logo rendered at h-10 /
    h-12 via CSS, from the existing 1600×498 files — no
    oversized new image was introduced; a dedicated
    owner-approved square icon for PWA installability remains
    an open item from v1, not an R1 addition, and the logo was
    not cropped for it).
(c) **Duplicated components / styles removed:**
    - Utility strip: rendered twice pre-R1 (once per
      breakpoint, different sticky behaviour) → rendered once
      in R1, single behaviour (§3).
    - Search: pre-R1 search logic lived in the header with a
      150ms blur-timeout close and no keyboard navigation →
      R1 has one `HeaderSearchInner` reused in four places
      (§7), with focus-based close and keyboard navigation.
    - Menu links: desktop and mobile links were separate
      render paths pre-R1 → R1 uses one `MenuLinkItem` for both.
    - Featured-panel rule: pre-R1 featured cards were rendered
      unconditionally on every menu → R1 has one
      `showFeatured()` rule used on desktop and mobile, and
      cards that duplicated the group link are not rendered.
    - No per-page copies of header/menu/search logic exist or
      were created: every page uses the same `Header`.
(d) **Build output size (measured, with its limit stated):**
    Final R1 build: `.next/static` totals 904 KB on disk
    (uncompressed, all routes' chunks included: JS ~806 KB
    across all chunks, CSS 66.6 KB in a single file).
    **Change vs the pre-R1 build: NOT measurable from this
    subagent** — no pre-R1 `.next` snapshot was preserved
    before R1 builds overwrote it, so a before/after delta
    cannot be honestly computed now. The 904 KB / 66.6 KB
    figures are the R1 baseline for the parent to compare
    against on the next build; they are not a claimed
    improvement. CSS staying in a single 66.6 KB file (tokens
    via variables, no per-page stylesheets) is consistent with
    the lean-CSS claim, but it is not a measured saving.
(e) **Performance regression risks that cannot be measured in
    the sandbox (stated, not claimed away):**
    - **No Lighthouse score is claimed.** Lighthouse is
      already recorded as unavailable in this sandbox
      (Chrome hangs; PageSpeed Insights API returned 429, a
      hard stop, in the earlier catalogue task). Any
      Lighthouse / CWV claim for R1 must come from a real
      browser run by the parent.
    - **Client JS:** Header is a client component (it must be
      — menu/drawer/search are interactive), but its state is
      local (`useState`/`useMemo` in Header only). A menu
      open/close, a search keystroke, or a drawer tap re-renders
      Header, not the whole page: page content is server-rendered
      static HTML (99/99 static pages) and is not re-rendered
      by header state changes. Search filters locally from the
      already-loaded `SEARCH_INDEX` (built at module load from
      local data) — no network call per keystroke, no debounce
      needed because there is nothing to debounce against.
    - **No layout shift on menu open by construction:**
      the mega panel is absolutely positioned below the bar
      (`top-full`), the drawer is fixed, and the search popover
      is absolute — none of them pushes page content down.
      (Measured CLS is still owed with a real browser; the
      construction argument is not a CLS measurement.)
    - **Animations / motion:** R1 adds no animation library,
      no entrance motion, no parallax. The only transitions are
      colour changes and chevron rotations, disabled under
      `prefers-reduced-motion: reduce` (globals.css R1 rule,
      scoped to `header`). No motion was added that a
      reduced-motion user must endure.
    - **Images / fonts:** no new image or font, so no new
      layout-shift or download risk from R1. Pre-existing
      image sizes on pages (outside R1) were not re-audited —
      an oversized page image, if one exists, is a page-level
      optimisation for a later pass, not an R1 regression.
    - **Phone responsiveness:** header/menu/drawer/search open
      from local state with no network round-trip, so no
      perceptible lag is expected from R1 code itself — but
      "no perceptible lag on a phone" is a phone-test
      judgement, and the owner phone test is still owed (§6).
    - **If an optimisation would need a new library, a new
      asset, or a page rebuild, it was NOT done in R1:**
      image resizing / next-gen formats, font subsetting,
      bundle splitting beyond Next.js defaults, and any
      page-body performance rebuild are later decisions,
      flagged here, not silently applied.
- **R1 changes confined to the files they needed:**
  `src/components/Header.tsx`, `src/app/globals.css`,
  `docs/frontend-v2/BRAND-TOKENS.md`, plus this report.
  No unrelated page, catalogue file, or data file was
  refactored under the banner of optimisation.

## 9. Modern and stylish — design language (owner principle, applied in R1)

Modern here means contemporary, clean, and consistent — not
more colours, not more motion, not a template. The R1 language
is built on the existing Next.js/React components and the
logo-anchored palette (orange #E57439 / charcoal #434140
anchor; supporting deep blue and teal only as documented
tokens with measured contrast, §2). Nothing in this section
is a claim that the owner has accepted the look — "modern and
stylish" is judged on the preview, and the owner phone test is
still owed. What follows is what specifically changed, so the
owner can judge it element by element.

**Spacing scale (before → after):**
- Header bar: pre-R1 bar had a second search row at 960–1280px
  and two utility strips → R1 has one strip (scrolls away)
  and one bar, with consistent 44px+ touch rows throughout.
  The bar breathes because it is one row, not because it is
  larger.
- Mega panel: pre-R1 panel padding and a fixed 300px featured
  column on every menu, with internal scrolling → R1 panel
  uses p-6, gap-7 between columns, and columns that follow
  the menu's own column count, so a 1-column menu does not
  sit in a 3-column frame and a 3-column menu is not squeezed.
- Drawer: pre-R1 accordion dumped all links of a group in a
  62vh scrolling box → R1 drawer uses a 56px+ group row, a
  sticky View-group action, and collapsible columns, so the
  drawer reads as a menu, not as a page dumped into a box.
- Cards / panels: featured cards use a single treatment
  (supporting deep background, paper text, eyebrow + title +
  one-line body + CTA) instead of the repeated ink panel on
  every menu. One card language, used only where it adds a
  destination (§3).

**Typography hierarchy (before → after):**
- Group triggers: 12px at nav, compacted to 11px at nav / 13px
  at xl in R1 — smaller at the tight breakpoint so the bar
  fits, larger where there is room. Hierarchy comes from
  weight and spacing, not from size alone.
- Panel columns: eyebrow column titles (10.5px, mono, with a
  heading-coloured bottom border) → link labels (13.5px,
  semibold) → notes (11.5px, regular). Three levels, consistent
  on every menu, instead of the pre-R1 flat link lists.
- Featured card: eyebrow (paper/70) → title (paper, bold) →
  body (paper/80, 12.5px) → CTA. The featured card is visually
  distinct from the column lists without a new colour — it
  uses the supporting deep token, which is the only place in
  R1 where deep blue carries a panel.
- Search results: kind label (Training / Service / Menu ·
  {group}) above the result label, so a search hit is
  self-explanatory without opening it.

**Panel / card treatment (before → after):**
- Pre-R1: glass-ink panel, repeated on every menu, fixed
  1fr+300px, capped height with scroll. R1: glass-panel with
  a brand top border (2px, logo orange), rounded-2xl, deep
  shadow (28px/56px, 18% ink), content-responsive columns,
  featured only where distinct. The panel looks current
  because it is calm (one shadow, one border accent, one
  featured treatment) rather than busy.
- Drawer: full-height fixed dialog, parchment background,
  shadow-2xl, sticky top actions — a contemporary app drawer,
  not a scrolling page section.

**CTA treatment (before → after):**
- Hierarchy is visual and consistent: primary = logo-orange
  gradient button (unchanged style, always present); secondary
  = bold text link (no box, no competing button); outline =
  navy-outline button only at xl (where there is room for a
  third action without crowding). Pre-R1 the outline CTA and
  the second search row competed with the primary at the same
  breakpoint; R1 gives each CTA a distinct weight and a
  distinct breakpoint, so the hierarchy reads at a glance.
- Mobile: the same three CTAs in the same order at the top of
  the drawer, primary first — the hierarchy does not change
  between phone and desktop, only its container does.

**What was deliberately NOT done for "stylish", and why:**
- No 30–40-colour palette, no gradient backgrounds on panels,
  no entrance animations, no parallax, no icon library, no
  template — each would have broken contrast, touch, or
  efficiency (§8) or the "no unrelated template" rule.
- No treatment that breaks AA contrast, 44px targets,
  keyboard/Escape/focus behaviour, hover-only rules, or the
  no-overflow rule was shipped. If a future stylish treatment
  would break any of those, it is dropped and reported, per
  the brief — no such treatment is pending in R1, because
  none was attempted that failed; the R1 treatments above
  were chosen to satisfy those constraints first.
- Logo untouched: the modern look is anchored by the logo's
  colours, not by editing, recolouring, or cropping the logo.

## 10. Technology — actually used in R1, and proposals deferred

**No technology, tool, or infrastructure claim below is
presented as live unless it is in the verified R1 build.**

(a) **Actually used in R1 (versions from `package.json`, not memory):**
- Next.js **16.4.3** (App Router, static generation — 99/99
  static pages in the R1 build; header is a client component
  inside otherwise server-rendered pages).
- React **19.1.0** / React DOM 19.1.0 (function components,
  hooks: `useState`/`useEffect`/`useMemo`/`useRef` only — no
  state library, no context provider added for the header).
- TypeScript **5** (typed data contracts: `NavMenu`,
  `NavMenuColumn`, `NavMenuLink`, `NavMenuFeatured`,
  `HeaderCta` — the header consumes typed data, it does not
  parse untyped JSON at runtime).
- Tailwind CSS **4.1.0** (via `@tailwindcss/postcss` 4.1.0;
  `@theme` tokens, `.dark` overrides, CSS variables such as
  `--menu-cols` and `--breakpoint-nav: 60rem`).
- Supabase JS **2.58.0** and Zod **4.6.7**: present in the
  repo, **not used by R1 header code** — R1 adds no Supabase
  call, no migration, no lead POST, and no new validation.
  They are listed here so the stack is stated accurately,
  not overstated.
- Existing local fonts and images only (Fraunces / Instrument
  Sans / IBM Plex Mono from v1, self-hosted; existing logo
  files). No new font or image was added in R1.
- Existing free-tier setup unchanged: Vercel (API-upload
  deploys, not git-connected) and Supabase (shared project,
  ap-south-1) are the deployment/data setup R1 builds for,
  but R1 itself deploys nothing and writes nothing — the
  free-until-mandatory hosting rule is unchanged, and no
  paid tier, hosted service, or infrastructure change is part
  of R1.

(b) **Open-source / public-ecosystem candidates evaluated and DEFERRED (proposals only, not in R1):**
- **Pagefind (open-source, MIT, static search index):**
  deferred — R1 search is already generated from local data
  and filters client-side with no network call; a build-time
  index would help only if the catalogue grew far beyond 36
  courses + 12 services, and it would add a build step for no
  R1 benefit. Self-hostable (static files), no lock-in.
- **axe-core / @axe-core/playwright (open-source, MPL-2.0,
  accessibility testing):** deferred, not added — axe
  measurement is owed for R1 (§6) but must run in a real
  browser, which this subagent cannot operate; adding the
  dependency without a runnable browser would be shelfware.
  Self-hostable, no lock-in, no cost.
- **Lighthouse (open-source, Apache-2.0, performance
  measurement):** deferred for the same reason — measurement
  tool, not a runtime dependency, and unusable in this
  sandbox (see §8e). No score is claimed from it.
- **React Flow (open-source, MIT, knowledge-graph /
  System Explorer-style visualisation):** deferred — a later
  Atlas-style explorer is a separate product decision, not an
  R1 header need; adding it to R1 would be a new library for
  no R1 purpose. Self-hostable, no lock-in.
- **shadcn/ui / Radix primitives (open-source, MIT,
  accessible component primitives):** deferred — R1 header
  primitives (opener, panel, drawer, search result, CTA) are
  already hand-built and accessible by construction
  (44px, Escape, focus return, aria states); adopting a
  primitive library in R1 would add dependencies to replace
  working code. Self-hostable, no lock-in, but no R1 benefit.
- **Framer Motion / Motion (open-source, MIT, animation):**
  deferred and, for R1, rejected on principle — R1 adds no
  motion beyond colour/chevron transitions, and a motion
  library would contradict the efficiency principle (§8).
  No lock-in, but no R1 use.

(c) **Private / proprietary-ecosystem candidates: none proposed for R1.**
No private tool, paid service, or proprietary SDK is proposed
in this report. If a future phase proposes one, the brief's
conditions bind: free-tier only, no paid tier, no secret
outside Secure Vault/environment, no vendor lock-in that
would block moving away — and it must be listed as a proposal
with cost and lock-in caveat, never silently added. The
existing Vercel / Supabase free-tier setup is the only
hosted-ecosystem element R1 relies on, and R1 changes nothing
about it.

**Technology claims NOT made:** no AI feature, no new API,
no new database, no new hosted service, no new CI/CD, no
payment integration, and no "advanced" label beyond the stack
above is claimed for R1. "Advanced" in R1 means using Next.js
16 / React 19 / TypeScript / Tailwind 4 well (typed,
data-driven, server-rendered pages with local client state
only where interaction needs it) — not novelty, and not a
technology that is not in the build.

## 11. Explicitly NOT done (R2/R3 and other scope)

- R2: menu content organisation (Available vs Planned sections),
  footer regrouping by task, 44px footer link rows.
- R3: page section bands using `support-canvas`, search-adjacent
  page treatment, any page-body rebuild.
- Six-group replacement (Das concept navigation) — not adopted.
- Any label, group, or destination rename/removal (see §4).
- Any category addition/removal (B1 contract amendment needed).
- Any catalogue content, price, duration, trainer, status,
  certification, placement, or rating change.
- Any commit by this subagent beyond the local working tree
  state reported here: files are **uncommitted** (see §1).
  Parent decides whether to commit (suggested message:
  "Nexus UI redesign Pass R1 — supporting tokens, single-strip
  header, 44px click-primary mega menu, mobile drawer, whole-
  menu search; no URL deleted, no merge, no deploy") and
  whether to deploy a preview for the owner phone test.
- No preview deployed, no push, no Das/owner contact by this
  subagent. The parent must arrange the preview + phone test
  and the live viewport sweep in §5/§6 before any merge
  discussion. Catalogue gate (CCNA, CCNP, 25 summary
  divergences, migration 0006) remains a separate blocker
  regardless of UI quality.
