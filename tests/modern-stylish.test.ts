// Modern + stylish pass (feat/frontend-v3-modern-stylish, owner-approved
// 2026-10-29): hero hierarchy, image-led cards alongside the boards,
// the home-only verified facts band, token-bound color, restrained
// motion. Source-assertion style, matching the rest of this suite
// (no component renderer installed).
//
// Contract notes this suite pins:
// - Boards stay: every directory surface still renders DirectoryBoard
//   with its flat rows. Cards are ADDITIVE, never a replacement.
// - Cards carry an image slot: topics render real art ONLY through
//   the topicArt map, and only after Leo file-inspected the actual
//   file (AWS, 2026-10-29). Every other topic renders its designed
//   token-tint panel. Remote URLs are refused by design.
// - The facts band shows ONLY verified facts, with counts wired from
//   the catalogue data (never typed-in numbers).
// - Every color in the new/changed styles comes from @theme tokens:
//   no hardcoded hex in the new components or the edited pages.
// - The large hero scale is a PROPOSAL for Gate 1, not an approval.

import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { courses } from "../src/data/courses";
import { services } from "../src/data/services";

const read = (rel: string) => readFileSync(new URL(rel, import.meta.url), "utf8");
const TOPIC_ART = read("../src/lib/topic-art.ts");

const CARD = read("../src/components/VisualTopicCard.tsx");
const BAND = read("../src/components/FactsBand.tsx");
const UI = read("../src/components/ui.tsx");
const HOME = read("../src/app/page.tsx");
const HUB = read("../src/app/trainings/page.tsx");
const COURSES_PAGE = read("../src/app/trainings/courses/page.tsx");
const CATEGORY_PAGE = read("../src/app/trainings/category/[slug]/page.tsx");
const DIRECTORY_PAGES = [HUB, COURSES_PAGE, CATEGORY_PAGE];

const stripComments = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|\s)\/\/.*$/gm, " ");

describe("modern + stylish — image-slot card contract", () => {
  it("card accepts an image asset and renders a tint panel without one", () => {
    expect(CARD).toContain("imageSrc");
    expect(CARD).toContain("aspect-square");
    expect(CARD).toContain("aspect-video");
    expect(CARD).toContain("bg-surface-muted");
    // Local-only by design: remote URLs fall back to the tint panel.
    expect(CARD).toContain('startsWith("/")');
    expect(CARD).not.toContain("https://");
    expect(CARD).not.toContain("http://");
  });

  it("documents the slot contract: square category/course art, wide banners, local PNG/WebP", () => {
    expect(CARD).toContain("1:1");
    expect(CARD).toContain("16:9");
    expect(CARD).toContain("1200x1200");
    expect(CARD).toContain("1920x1080");
    expect(CARD).toContain("/images/topics/");
    expect(CARD).toContain("/images/banners/");
    expect(CARD).toContain("/images/courses/");
    expect(CARD).toContain("PNG");
    expect(CARD).toContain("WebP");
  });

  it("pages pass imageSrc ONLY via the topicArt map — no hardcoded, remote, or invented artwork", () => {
    for (const page of [HOME, COURSES_PAGE]) {
      expect(page).toContain("VisualTopicCard");
      expect(page).toContain("topicArt(");
      expect(page).not.toContain('imageSrc="');
      expect(page).not.toContain("imageSrc='");
    }
    for (const page of [HUB, CATEGORY_PAGE]) {
      expect(page).toContain("VisualTopicCard");
      expect(page).not.toContain("imageSrc");
    }
  });

  it("topicArt map: AWS resolves to the verified file, unverified topics to null", () => {
    expect(TOPIC_ART).toContain('aws: "/images/topics/aws.jpg"');
    expect(TOPIC_ART).toContain("?? null");
    expect(TOPIC_ART).not.toContain("http://");
    expect(TOPIC_ART).not.toContain("https://");
    expect(existsSync(new URL("../public/images/topics/aws.jpg", import.meta.url))).toBe(true);
  });

  it("sample rows keep their SampleTag on the card, not just on the board row", () => {
    expect(CARD).toContain("SampleTag");
    expect(CARD).toContain("sample");
    expect(CATEGORY_PAGE).toContain("sample={row.sample}");
  });

  it("cards sit alongside the boards; boards and flat rows are preserved", () => {
    for (const page of DIRECTORY_PAGES) {
      expect(page).toContain("DirectoryBoard");
      expect(page).toContain("row-hover");
      expect(page).toContain("border-t border-line");
      expect(page).toContain("border-b border-line");
    }
    expect(HOME).toContain("VisualTopicCard");
    expect(HOME).toContain("border-t border-line");
  });

  it("card grids reflow single-column on mobile (no fixed widths, no scroll containers)", () => {
    for (const page of [HOME, HUB, COURSES_PAGE, CATEGORY_PAGE]) {
      expect(page).toContain("grid gap-5 sm:grid-cols-2 lg:grid-cols-3");
    }
    for (const src of [CARD, HOME, HUB, COURSES_PAGE, CATEGORY_PAGE]) {
      expect(src).not.toContain("whitespace-nowrap");
      expect(src).not.toContain("overflow-x-auto");
    }
  });
});

describe("modern + stylish — home-only verified facts band", () => {
  it("counts come from catalogue data, never typed-in numbers", () => {
    expect(courses.length).toBe(36);
    expect(services.length).toBe(12);
    expect(HOME).toContain("<FactsBand");
    expect(HOME).toContain("courseCount={courses.length}");
    expect(HOME).toContain("serviceCount={services.length}");
    expect(BAND).toContain("courseCount");
    expect(BAND).toContain("serviceCount");
  });

  it("band shows only the three verified facts: courses, services, Dilsukhnagar classroom + online", () => {
    expect(BAND).toContain('"courses"');
    expect(BAND).toContain('"services"');
    expect(BAND).toContain("Dilsukhnagar");
    expect(BAND).toContain("Classroom + online");
    for (const forbidden of ["learners", "placement", "rating", "testimonial", "partner"]) {
      expect(BAND.toLowerCase()).not.toContain(forbidden);
    }
  });

  it("band renders on home only", () => {
    expect(HOME).toContain("FactsBand");
    for (const page of DIRECTORY_PAGES) {
      expect(page).not.toContain("FactsBand");
    }
  });
});

describe("modern + stylish — hero hierarchy (Gate 1 proposal, not approval)", () => {
  it("PageHero gains a large variant; the standard scale is preserved byte-for-byte", () => {
    expect(UI).toContain("large");
    expect(UI).toContain("text-[44px]");
    expect(UI).toContain("md:text-[64px]");
    expect(UI).toContain("text-[40px]");
    expect(UI).toContain("md:text-[56px]");
    expect(UI).toContain("py-10 md:py-14");
    expect(UI).toContain("py-6 md:py-8");
  });

  it("large hero is used only by hub, courses, and category pages", () => {
    for (const page of DIRECTORY_PAGES) {
      expect(page).toContain("<PageHero");
      expect(page).toContain("large");
    }
    const servicesPage = read("../src/app/services/page.tsx");
    expect(servicesPage).not.toContain("large");
  });

  it("home hero grows in scale and spacing, with copy verbatim", () => {
    expect(HOME).toContain("text-[44px]");
    expect(HOME).toContain("md:text-[64px]");
    expect(HOME).toContain("Practical IT training — and IT services — in Hyderabad.");
    expect(HOME).toContain("Explore Training");
    expect(HOME).toContain("Explore IT Solutions");
  });

  it("no font-family scope change: headings stay display type as built (Gate 1 item still pending)", () => {
    expect(UI).not.toContain("font-sans");
    const globals = read("../src/app/globals.css");
    expect(globals).toMatch(/h1,\s*h2,\s*h3,\s*h4\s*\{\s*@apply font-display text-heading/);
  });
});

describe("modern + stylish — token-bound color and restrained motion", () => {
  it("no hardcoded hex in the new components or the edited pages", () => {
    const hex = /#[0-9a-fA-F]{6}\b/;
    for (const src of [CARD, BAND, HOME, HUB, COURSES_PAGE, CATEGORY_PAGE]) {
      expect(stripComments(src)).not.toMatch(hex);
    }
    // ui.tsx carries pre-existing rgba() shadows; the hero edit adds
    // no hex either.
    expect(stripComments(UI)).not.toMatch(hex);
  });

  it("no new gradient classes on the directory pages (boards stay flat)", () => {
    for (const page of DIRECTORY_PAGES) {
      expect(page).not.toContain("bg-gradient");
      expect(page).not.toContain("gradient-to-");
    }
  });

  it("motion reuses the existing reveal hook only — no new animation library", () => {
    expect(CARD).toContain("data-reveal");
    expect(BAND).toContain("data-reveal");
    for (const src of [CARD, BAND]) {
      expect(src).not.toContain("framer-motion");
      expect(src).not.toContain("gsap");
      expect(src).not.toContain("@keyframes");
    }
  });

  it("no Enroll/Register vocabulary introduced by the pass", () => {
    for (const src of [CARD, BAND, HOME, HUB, COURSES_PAGE, CATEGORY_PAGE]) {
      expect(src).not.toContain("Enroll");
      expect(src).not.toContain("Register");
    }
  });

  it("forms, sitemap, and canonical handling are untouched by the pass", () => {
    for (const src of [CARD, BAND, HOME, HUB, COURSES_PAGE, CATEGORY_PAGE]) {
      expect(src).not.toContain("LeadForm");
      expect(src).not.toContain("LpLeadForm");
      expect(src).not.toContain("RegisterForm");
    }
    const sitemap = read("../src/app/sitemap.ts");
    expect(sitemap).not.toContain("VisualTopicCard");
    expect(sitemap).not.toContain("FactsBand");
  });
});
