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
