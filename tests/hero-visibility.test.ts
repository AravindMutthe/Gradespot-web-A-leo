// Hero-visibility gate fix tests.
//
// Defect (pre-LP visual inspection, multiple screenshots): on
// /trainings/ccna-200-301 the H1 existed in the DOM but was INVISIBLE
// in the dark navy hero — breadcrumb and kicker rendered, then a gap,
// then the Sample pill and buttons. Root cause, measured:
//   - globals.css @layer base sets `h1, h2, h3, h4 { @apply
//     font-display text-heading; }` — an EXPLICIT color on every bare
//     heading, which beats any inherited section text color.
//   - --color-heading is #10233f, identical to --color-ink (#10233f).
//   - The course-detail hero is `<section class="bg-ink ... text-white">`
//     with a BARE h1 (no text color class), so the title rendered
//     ink-on-ink: contrast 1.00:1 — invisible.
//   - The LP hero shares the defect: `<section class="panel-ink">`
//     (dark gradient #10233f -> #0b1a2e, inherited color paper) with a
//     bare h1, so the same ink-on-ink failure hit all 11 LP pages.
// Fix (narrowest possible, no token or template redesign): give each
// dark-hero h1 its own explicit light-text class — text-white on the
// detail hero (matching that section's text-white), text-paper on the
// LP hero (matching panel-ink's declared paper color; paper is
// #ffffff in this token set, so both render white).
// These tests read the page sources and the token file, so a
// regression that strips the light class — or changes the tokens
// until the pairing fails AA — fails here. They deliberately scope
// to the two hero files plus the homepage guard: a repo-wide scan
// would false-positive, because ui.tsx holds BOTH the light
// PageHero (correctly text-heading on light hero-paper) and dark
// bands whose headings already carry explicit light classes.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

function token(css: string, name: string): string {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --color-${name} not found in globals.css`);
  return m[1].toLowerCase();
}

function luminance(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const f = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = ch.map(f);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function h1ClassNames(source: string): string[] {
  const out: string[] = [];
  for (const m of source.matchAll(/<h1\b[^>]*className="([^"]*)"/g)) out.push(m[1]);
  return out;
}

const css = readSource("../src/app/globals.css");
const detail = readSource("../src/app/trainings/[slug]/page.tsx");
const lp = readSource("../src/app/lp/[slug]/page.tsx");
const home = readSource("../src/app/page.tsx");

describe("hero title visibility (dark-hero pairing)", () => {
  it("documents the trap: base headings resolve to ink, identical to the hero background", () => {
    expect(css).toMatch(/h1,\s*h2,\s*h3,\s*h4\s*\{\s*@apply font-display text-heading/);
    expect(token(css, "heading")).toBe(token(css, "ink"));
    // Before the fix this pairing measured 1.00:1 — invisible.
    expect(contrast(token(css, "heading"), token(css, "ink"))).toBeCloseTo(1.0, 2);
  });

  it("course-detail hero: dark bg-ink section with a white h1 (all 36 detail pages share this template)", () => {
    expect(detail).toMatch(/<section className="bg-ink[^"]*text-white/);
    const classes = h1ClassNames(detail);
    expect(classes).toHaveLength(1);
    expect(classes[0]).toMatch(/\btext-white\b/);
    expect(contrast("#ffffff", token(css, "ink"))).toBeGreaterThan(4.5);
  });

  it("LP hero: dark panel-ink section with a paper h1 (all 11 LP pages share this template)", () => {
    expect(lp).toMatch(/<section className="panel-ink/);
    const classes = h1ClassNames(lp);
    expect(classes).toHaveLength(1);
    expect(classes[0]).toMatch(/\btext-paper\b/);
    expect(contrast(token(css, "paper"), token(css, "ink-deep"))).toBeGreaterThan(4.5);
  });

  it("regression: no dark-hero h1 in either fixed file lacks a light-text class", () => {
    for (const src of [detail, lp]) {
      for (const cls of h1ClassNames(src)) {
        expect(cls).toMatch(/\btext-(white|paper)\b/);
      }
      expect(h1ClassNames(src).length).toBeGreaterThan(0);
    }
  });

  it("unaffected guard: homepage hero h1 still carries its explicit white class", () => {
    const classes = h1ClassNames(home);
    expect(classes).toHaveLength(1);
    expect(classes[0]).toMatch(/\btext-white\b/);
  });
});
