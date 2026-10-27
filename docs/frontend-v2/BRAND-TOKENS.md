# GradeSpot Nexus — Brand Tokens (sampled, not invented)

Status: Release 1, branch `feat/frontend-v2-platform` only. Spec v2 §0
requires this sampling before any Nexus styling. This document is the
sampling record. The logo files themselves were NOT edited, filtered,
recoloured, cropped or replaced. Proportions are preserved by using the
files exactly as shipped (`public/images/logo.png`,
`public/images/logo-light.png`, rendered by Header/Footer/LP with a
per-theme swap, on the untouched `.logo-plate` rules in `globals.css`).

## Method

Python Pillow (PIL 10.2.0), script run 2026-10-25 against the two repo
logo files. For each file: opened as RGBA, counted total / opaque
(alpha ≥ 200) / semi-transparent / transparent pixels, then counted
exact opaque colours and colours quantized to the nearest 16 per channel.
"Orange-ish" = R > 150 and R − G > 40 and G − B > 10. "Navy-ish" =
B > R + 10 and B > 40 and R < 100. No eyeballing, no colour-picker guess.

## What the logo files actually show

| File | Size | Opaque share |
| ---- | ---- | ------------ |
| `public/images/logo.png` | 1600 × 498 | 196,233 / 796,800 = 24.6% |
| `public/images/logo-light.png` | 1600 × 498 | 196,270 / 796,800 = 24.6% |

Dominant exact opaque colours, `logo.png`:

| Colour | Pixels | Share of opaque |
| ------ | ------ | --------------- |
| #E57439 (orange) | 99,997 | 50.96% |
| #434140 (charcoal) | 77,233 | 39.36% |
| #42403F (charcoal, anti-alias) | 2,286 | 1.16% |
| #E47338 (orange, anti-alias) | 1,704 | 0.87% |

Dominant exact opaque colours, `logo-light.png` (same artwork, light text):

| Colour | Pixels | Share of opaque |
| ------ | ------ | --------------- |
| #E57439 (orange) | 100,011 | 50.96% |
| #F4EAE6 (warm pale tint, light text) | 73,615 | 37.51% |
| #F3E9E5 (warm pale tint, anti-alias) | 4,399 | 2.24% |

Aggregates:

- Orange-ish pixels: 110,302 / 196,233 = 56.2% in both files.
- Navy-ish pixels: **0 / 196,233 = 0.0% in both files.**

### Sampled brand colours (the only brand colours Nexus may use)

- **Brand primary (sampled, graphic / large / on-dark): #E57439**
- **Brand charcoal (sampled, wordmark text): #434140**
- **Brand pale tint (sampled, light-text file): #F4EAE6**

### Discrepancies — flagged, not silently resolved

| Earlier value | Where it came from | Verdict for Nexus |
| ------------- | ------------------ | ----------------- |
| #F7631B / #F98238 | Oct 2026 live-site theme audit (gsitssolutions.com) | Close orange family, but NOT the repo logo's orange. #F7631B is brighter than sampled #E57439 (R 247 vs 229, G 99 vs 116). Do not use as the Nexus brand primary; the repo logo is the source of truth per spec v2 §0. |
| #0E2B3D (heading navy) | Same live-site audit | NOT in the repo logo files at all (0 navy-ish pixels). It is a live-site theme value, not a logo value. Nexus does not use navy-blue as a brand colour. Charcoal (#434140 family) is the logo's dark colour. |
| #B23A0A (Leo vermilion) / #F7631B (Leo brand-bright) | Leo v1 `globals.css` | Leo v1's own working tokens, deepened for contrast. They are not a logo extraction and are superseded for Nexus by the sampled tokens below. Leo v1 on `main`/live is unchanged by this. |
| #0C57B7, #7C3AED, #CCFBF1, etc. | Spec v2 §3 illustrative token architecture | ILLUSTRATIVE ONLY, explicitly not a verified logo extraction. None of them are used as Nexus brand colours. Blue/purple are not introduced as brand hues. |

### Contrast — why the sampled orange needs a darker derivative

Measured WCAG contrast (sampled orange vs white / ivory):

| Colour | vs white | vs ivory #FFFBF5 |
| ------ | -------- | ---------------- |
| #E57439 (sampled primary) | 3.05:1 — fails AA for normal text and for white-on-colour small text | 2.96:1 |
| #C24E1F (derived button) | 4.77:1 — passes AA | 4.63:1 |
| #B84A1E (derived text dark) | 5.20:1 — passes AA | 5.05:1 |
| #9C3E18 (derived text darker) | 6.74:1 — passes AA | 6.54:1 |

Rule used in Nexus: sampled #E57439 is used for large text, graphics,
accents on dark surfaces, and the brand mark's family. Normal-size text
and primary buttons use the darker derivatives #C24E1F / #B84A1E, which
are the same orange hue darkened in lightness only — no new hue is
introduced. Dark theme lifts brand text to #FF8A4C (already in Leo's
dark signal family, same hue).

## The 40-token Nexus system

Exactly 40 tokens. Brand tokens are sampled or same-hue derivatives of
the sampled colours. Neutral tokens are the charcoal family. Semantic
and data tokens are functional only — they are not brand colours, and
most pages use neutral surfaces plus two or three brand accents, never
all 40 at once.

### Brand scale (10) — same orange hue, lightness steps

| Token | Value | Use |
| ----- | ----- | --- |
| nexus-brand-50 | #FDF1EA | Tint background |
| nexus-brand-100 | #FBE3D3 | Tint background, chips |
| nexus-brand-200 | #F6C5A6 | Borders on tint, hover tint |
| nexus-brand-300 | #EE9A6E | Large graphic accent |
| nexus-brand-400 | #E57439 | **Sampled primary — graphics, large text, on-dark accent** |
| nexus-brand-500 | #D45F24 | Button hover (large/graphic) |
| nexus-brand-600 | #C24E1F | Primary button, AA text on light |
| nexus-brand-700 | #9C3E18 | Strong text, button pressed |
| nexus-brand-800 | #7E3214 | Darkest button/outline |
| nexus-brand-900 | #5F2610 | Deepest brand, diagrams only |

### Ink / neutral scale (8) — charcoal family from #434140

| Token | Value | Use |
| ----- | ----- | --- |
| nexus-ink-950 | #1E1C1B | Darkest surface, footer, overlays |
| nexus-ink-900 | #2A2726 | Headings, primary text (light theme) |
| nexus-ink-800 | #434140 | **Sampled charcoal — wordmark family** |
| nexus-ink-700 | #5A5654 | Secondary text |
| nexus-ink-600 | #7A7572 | Muted text |
| nexus-ink-500 | #9A9490 | Placeholder, disabled |
| nexus-ink-400 | #B8B1AD | Borders on dark |
| nexus-ink-300 | #D8D2CD | Dividers on dark |

### Surfaces (6)

| Token | Value | Use |
| ----- | ----- | --- |
| nexus-canvas | #FFFBF5 | Page background (warm ivory) |
| nexus-surface | #FFFDF8 | Cards, panels |
| nexus-surface-raised | #FFFFFF | Raised cards, menus |
| nexus-surface-sunken | #F4EAE6 | **Sampled pale tint — sunken tint, chips** |
| nexus-line | #E7DED2 | Borders |
| nexus-line-strong | #CFC2B2 | Strong borders, rules |

### Text (4, semantic aliases of the ink scale)

| Token | Value |
| ----- | ----- |
| nexus-text-primary | #2A2726 |
| nexus-text-secondary | #5A5654 |
| nexus-text-muted | #7A7572 |
| nexus-text-inverse | #FFFBF5 |

### Semantic, functional only (8)

| Token | Value | Use |
| ----- | ----- | --- |
| nexus-success | #166534 | Success text/icons |
| nexus-success-surface | #F0FDF4 | Success background |
| nexus-error | #B91C1C | Error text/icons |
| nexus-error-surface | #FEF2F2 | Error background |
| nexus-warning | #92400E | Warning text/icons |
| nexus-warning-surface | #FFFBEB | Warning background |
| nexus-info | #0F4C5C | Info text/icons (muted teal, not brand blue) |
| nexus-info-surface | #EAF4F6 | Info background |

### Data / chart, functional only (2)

| Token | Value | Use |
| ----- | ----- | --- |
| nexus-data-teal | #0F766E | Charts, diagrams (muted, not brand) |
| nexus-data-amber | #B45309 | Charts, diagrams (warm, not brand) |

### Focus / overlay (2)

| Token | Value | Use |
| ----- | ----- | --- |
| nexus-focus | #C24E1F | Focus ring (same as brand-600) |
| nexus-overlay | #1E1C1BCC | Modal/backdrop overlay (ink-950 at 80%) |

Token count check: 10 + 8 + 6 + 4 + 8 + 2 + 2 = **40**.

Dark theme mapping (in `globals.css` `.dark`): canvas → #171412,
surface → #221E1C, surface-raised → #2A2623, surface-sunken → #2E2620,
line → #413832, text-primary → #FFFBF5, text-secondary → #D8D2CD,
text-muted → #9A9490, brand text → #FF8A4C, brand button → #E57439
with ink text only where contrast is verified. No navy, no purple is
introduced as a brand colour in either theme.

## What is still unconfirmed

- The exact logo artwork's wordmark proportions and clear-space: not
  measured in this sampling (pixel colours only). The artwork files are
  used unmodified, so proportions are preserved by construction.
- Whether the live site's heading navy #0E2B3D should ever appear in
  Nexus: flagged above — it is not logo-derived, so it is excluded from
  the Nexus brand system unless the user explicitly reinstates it.
- Any future brand refresh: if the logo files change, this document and
  the token system must be re-sampled, not hand-edited to a new hue.

---

## v2 — R1 supporting tokens (2026-10-27, NOT a rewrite of the v1 sampling)

Status: R1 only. The v1 sampling above is unchanged. These tokens
were added because the owner directed that logo colours are the
anchor, not the only colours, and Das (UI review, 2026-10-27)
agreed that interpretation while requiring that any pairing be
contrast-checked individually. Deep blue and teal below are
SUPPORTING colours only: never a primary CTA, never outranking
logo orange #E57439 / charcoal #434140, never a second brand.
Logo files are untouched.

Tailwind names (globals.css `@theme` + `.dark` overrides):
`nexus-support-deep`, `nexus-support-deep-soft`,
`nexus-support-teal`, `nexus-support-teal-strong`,
`nexus-support-canvas`.

### Light theme values and computed WCAG ratios

| Token | Value | Approved pairings (computed) | Ratio |
|---|---|---|---|
| nexus-support-deep | #17324D | White #FFFFFF on it | 13.13:1 AA normal |
| nexus-support-deep | #17324D | Paper #FFFBF5 on it | 12.73:1 AA normal |
| nexus-support-deep | #17324D | On canvas-alt #F7F5F0 (as text) | 12.05:1 AA normal |
| nexus-support-deep | #17324D | On deep-soft #EAF0F5 (as text) | 11.43:1 AA normal |
| nexus-support-deep-soft | #EAF0F5 | Ink #2A2726 on it | 12.90:1 AA normal |
| nexus-support-deep-soft | #EAF0F5 | Brand-700 #9C3E18 on it | 5.87:1 AA normal |
| nexus-support-deep-soft | #EAF0F5 | Teal #0D766E on it | 4.77:1 AA normal |
| nexus-support-teal | #0D766E | On white #FFFFFF (as text) | 5.48:1 AA normal |
| nexus-support-teal | #0D766E | On canvas #FFFBF5 (as text) | 5.31:1 AA normal |
| nexus-support-teal | #0D766E | White #FFFFFF on it | 5.48:1 AA normal |
| nexus-support-teal-strong | #0A5C55 | On white #FFFFFF (as text) | 7.85:1 AA normal |
| nexus-support-teal-strong | #0A5C55 | On canvas-alt #F7F5F0 (as text) | 7.21:1 AA normal |
| nexus-support-teal-strong | #0A5C55 | White #FFFFFF on it | 7.85:1 AA normal |
| nexus-support-canvas | #F7F5F0 | Ink #2A2726 on it | 13.61:1 AA normal |
| nexus-support-canvas | #F7F5F0 | Brand-700 #9C3E18 on it | 6.19:1 AA normal |
| nexus-support-canvas | #F7F5F0 | Deep #17324D on it | 12.05:1 AA normal |

### Dark theme values and computed WCAG ratios

Dark values: deep #1D3A5C, deep-soft #16283C, teal #2AB3A3,
teal-strong #5EEAD4, canvas #201C19. Page canvas in dark is #171412.

| Pairing | Ratio |
|---|---|
| Paper #FFFBF5 on deep #1D3A5C | 11.24:1 AA normal |
| White #FFFFFF on deep #1D3A5C | 11.59:1 AA normal |
| Paper #FFFBF5 on deep-soft #16283C | 14.52:1 AA normal |
| Muted #D8D2CD on deep #1D3A5C | 7.74:1 AA normal |
| Teal-bright #5EEAD4 on canvas #171412 | 12.40:1 AA normal |
| Teal #2AB3A3 on canvas #171412 | 7.05:1 AA normal |
| Paper #FFFBF5 on canvas #201C19 | 16.41:1 AA normal |
| Brand-bright #FF8A4C on canvas #171412 | 7.85:1 AA normal |
| Brand-bright #FF8A4C on deep #1D3A5C | 4.96:1 AA normal |

### FORBIDDEN pairings (computed, do not use)

| Pairing | Ratio | Verdict |
|---|---|---|
| Brand-600 #C24E1F on canvas-alt #F7F5F0 | 4.38:1 | FAILS AA normal (large text only) — use brand-700 #9C3E18 (6.19:1) instead |
| Brand-600 #C24E1F on deep-soft #EAF0F5 | 4.15:1 | FAILS AA normal (large text only) — use brand-700 #9C3E18 (5.87:1) instead |
| Sampled orange #E57439 as normal text on white | 3.05:1 | FAILS AA normal (already recorded in v1) — graphics / large text / on-dark only |

### Where R1 uses the supporting tokens

- Featured mega-panel / mobile featured card: `nexus-support-deep`
  background with paper text (12.73:1 light, 11.24:1 dark).
- Menu / search hover backgrounds: `nexus-support-deep-soft`
  with heading text (12.90:1 light, 14.52:1 dark for paper on
  deep-soft in dark).
- Search kind labels and mobile column titles:
  `nexus-support-teal-strong` (7.85:1 light on white, 12.40:1
  dark on canvas).
- No R1 component uses a supporting colour for a primary CTA.
  Primary CTA remains the logo-orange gradient (`btn-primary`).
- `nexus-support-canvas` is defined for R2/R3 section bands;
  R1 header code does not yet apply it to page sections, so no
  page claims a new section treatment from R1 alone.
