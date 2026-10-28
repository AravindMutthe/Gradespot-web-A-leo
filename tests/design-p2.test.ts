// Final Design Phase 2 — door-polarity + card/board system tests.
//
// These tests pin the P2 design contract for the directory surfaces
// (trainings hub, /trainings/courses, /trainings/category/[slug],
// services directory): ONE shared board system for both doors, flat
// rows preserved, no gradient borders, no large cards, real counts
// from catalogue data, and door tokens labelled CANDIDATE (Gate 1
// owner review pending — nothing here finalizes tokens/typography).
// They read the component + page sources, so a regression that
// reintroduces a second card language, a gradient border, or an
// invented count fails here. Course detail pages, LP pages, lead
// forms, search, sitemap and navigation are out of P2 scope and are
// not asserted here.

import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses, courseCategories } from "../src/data/courses";
import { services } from "../src/data/services";
import {
  BUSINESS_PATHWAYS,
  SERVICE_GROUPS,
  TRAINING_DIRECTORY_ENTRIES,
  topicCategories,
} from "../src/lib/two-door";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const board = readSource("../src/components/DirectoryBoard.tsx");
const globals = readSource("../src/app/globals.css");
const hub = readSource("../src/app/trainings/page.tsx");
const coursesPage = readSource("../src/app/trainings/courses/page.tsx");
const categoryPage = readSource("../src/app/trainings/category/[slug]/page.tsx");
const servicesPage = readSource("../src/app/services/page.tsx");
const changedPages = [hub, coursesPage, categoryPage, servicesPage];

describe("P2 — one shared board system for both doors", () => {
  it("all four directory surfaces render the same DirectoryBoard component", () => {
    for (const page of changedPages) {
      expect(page).toContain('from "@/components/DirectoryBoard"');
      expect(page).toContain("<DirectoryBoard");
      expect(page).toContain("</DirectoryBoard>");
    }
    const boards = readdirSync(new URL("../src/components/", import.meta.url)).filter((f) =>
      f.toLowerCase().includes("board"),
    );
    expect(boards).toEqual(["DirectoryBoard.tsx"]);
  });

  it("door difference is eyebrow + solid accent rule only, never a second card language", () => {
    expect(board).toContain('training: {');
    expect(board).toContain('business: {');
    expect(board).toContain("bg-door-training");
    expect(board).toContain("bg-door-business");
    expect(board).toContain("h-[3px] w-14 rounded-full");
    // No gradient *classes* in P2 surfaces (the word appears in the
    // component's own "no gradient borders" comment — that is not a
    // gradient style).
    expect(board).not.toContain("bg-gradient");
    expect(board).not.toContain("gradient-to-");
    for (const page of changedPages) {
      expect(page).not.toContain("bg-gradient");
      expect(page).not.toContain("gradient-to-");
    }
  });

  it("rows stay flat text-first rows with the Phase 1 row-hover treatment", () => {
    for (const page of changedPages) {
      expect(page).toContain("row-hover");
      expect(page).toContain("border-t border-line");
      expect(page).toContain("border-b border-line");
    }
  });

  // SUPERSEDED IN PART by the modern + stylish pass (owner-approved
  // 2026-10-29): image-led cards are now AUTHORISED, sitting
  // ALONGSIDE the boards — the boards and flat rows below are
  // unchanged, and the cards live in their own component file, so
  // the per-page rounded-2xl counts below still hold exactly.
  // SUPERSEDED IN PART AGAIN by the Das fixes (owner-adopted
  // 2026-10-29): category pages no longer render per-course cards;
  // they render exactly ONE TopicTreatment (rounded corners live in
  // that component file, so the category count below still holds).
  it("cards sit alongside boards: pages render VisualTopicCard AND DirectoryBoard; page rounded-2xl counts unchanged (cards live in the component)", () => {
    const count = (src: string) => (src.match(/rounded-2xl/g) ?? []).length;
    expect(count(hub)).toBe(1); // Talk to a Trainer panel only
    expect(count(coursesPage)).toBe(2); // compare bridge + trainer panel
    expect(count(categoryPage)).toBe(1); // trainer panel only
    expect(count(servicesPage)).toBe(1); // services CTA panel only
    for (const page of [hub, coursesPage]) {
      expect(page).toContain("VisualTopicCard");
      expect(page).toContain("DirectoryBoard");
    }
    expect(categoryPage).toContain("TopicTreatment");
    expect(categoryPage).toContain("DirectoryBoard");
    expect(categoryPage).not.toContain("VisualTopicCard");
  });

  it("boards carry real counts from catalogue data, never invented counts", () => {
    const categories = topicCategories();
    expect(categories.length).toBe(10);
    expect(courseCategories.length).toBe(10);
    expect(courses.length).toBe(36);
    expect(categories.reduce((n, c) => n + c.count, 0)).toBe(36);
    expect(coursesPage).toContain("`${total} courses, grouped by topic below.`");
    expect(categoryPage).toContain("rows.length");
    expect(services.length).toBe(12);
    const grouped = SERVICE_GROUPS.flatMap((g) => g.slugs);
    expect(grouped.length).toBe(12);
    expect(new Set(grouped).size).toBe(12);
    expect(grouped.sort()).toEqual(services.map((s) => s.slug).sort());
    expect(BUSINESS_PATHWAYS.length).toBe(4);
    expect(TRAINING_DIRECTORY_ENTRIES.length).toBe(5);
  });

  it("no dead or placeholder links introduced on the board surfaces", () => {
    for (const page of changedPages) {
      expect(page).not.toContain('href=""');
      expect(page).not.toContain("href='#'");
    }
    expect(coursesPage).toContain("`/trainings/category/${cat.slug}`");
    for (const entry of TRAINING_DIRECTORY_ENTRIES) {
      expect(entry.href.startsWith("/")).toBe(true);
    }
  });

  it("door tokens are labelled CANDIDATE; Gate 1 finalization is not claimed", () => {
    expect(globals).toContain("--color-door-training");
    expect(globals).toContain("--color-door-business");
    expect(globals).toContain("CANDIDATE");
    expect(board).toContain("CANDIDATE");
    expect(board).toContain("Gate 1");
    expect(board).not.toContain("final token");
    expect(board).not.toContain("approved token");
  });

  it("no Enroll/Register vocabulary and no max-zoom-hostile styling in P2 surfaces", () => {
    for (const src of [board, ...changedPages]) {
      expect(src).not.toContain("Enroll");
      expect(src).not.toContain("Register");
      expect(src).not.toContain("whitespace-nowrap");
      expect(src).not.toContain("overflow-x-auto");
    }
  });
});
