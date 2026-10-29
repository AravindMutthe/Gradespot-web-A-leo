// Frontend 3.0 — Stage 4 services template tests.
//
// These tests pin the Stage 2→3 gate contract for the services
// templates: Option A compact text-first rows, removed promotional
// sections actually absent from the templates, and unchanged
// slugs/routes. PURGE GATES (2026-10-29): placeholder data
// removed — the 12 services are held back to title-only again.
// The title-only hold assertions below pin that hold. The repo
// summaries stay unconfirmed and never render. They read the row
// model and the template sources, so a regression that reintroduces
// a card grid, a removed section, or an invented claim fails here.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { services } from "../src/data/services";
import {
  SERVICE_DEMO_LABEL,
  SERVICE_DETAILS_LABEL,
  SERVICE_ENQUIRE_LABEL,
  SERVICE_PENDING_LABEL,
  buildServiceRow,
} from "../src/lib/services-rows";
import {
  DEMO_SERVICE_CONTENT,
} from "../src/data/demo-content";
import { servicePageMetadata } from "../src/lib/metadata";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const index = readSource("../src/app/services/page.tsx");
const detail = readSource("../src/app/services/[slug]/page.tsx");
const metadataSrc = readSource("../src/lib/metadata.ts");

const rows = services.map((s) => buildServiceRow({ slug: s.slug, title: s.title }));

// Every summary and offering string currently in the repo data file.
// None of these may appear in either services template.
const HELD_TEXTS = services.flatMap((s) => [
  ...(s.summary ? [s.summary] : []),
  ...(s.offerings ?? []),
]);

describe("Stage 4 services index — inventory and demo rows (demo branch)", () => {
  it("renders 12 rows, one per service, in repo order with slugs unchanged", () => {
    expect(rows.length).toBe(12);
    expect(rows.map((r) => r.slug)).toEqual(services.map((s) => s.slug));
    // Demo branch: all 12 rows are demo rows (not held-back rows).
    expect(rows.every((r) => r.demo)).toBe(true);
    expect(rows.every((r) => r.heldBack)).toBe(false);
    expect(rows.every((r) => "sample" in r)).toBe(false);
  });

  it("renders every row with its demo scope summary and the demo label", () => {
    for (const row of rows) {
      expect(row.description).toBe(DEMO_SERVICE_CONTENT[row.slug]?.summary);
      expect(row.statusLabel).toBe(SERVICE_DEMO_LABEL);
      expect(row.actionLabel).toBe(SERVICE_DETAILS_LABEL);
      expect(row.actionHref).toBe(`/services/${row.slug}`);
      expect(row.titleHref).toBe(`/services/${row.slug}`);
    }
  });

  it("keeps the 12 published service slugs", () => {
    expect(services.map((s) => s.slug)).toEqual([
      "corporate-trainings",
      "internships",
      "industrial-trainings",
      "college-workshops",
      "cybersecurity-services",
      "web-development",
      "digital-marketing-solutions",
      "network-infrastructure-building",
      "logo-designing",
      "us-it-staffing",
      "domestic-consultancy",
      "abroad-consultancy",
    ]);
  });
});

describe("Stage 4 services templates — removed surfaces and forbidden content", () => {
  it("index uses rows, not the card grid, logo wall, FAQ section or promo cards", () => {
    expect(index).not.toContain("ServiceCard");
    expect(index).not.toContain("LogoWall");
    expect(index).not.toContain("FaqList");
    expect(index).not.toContain("faqSchema");
    expect(index).not.toContain("servicesFaqAnswers");
    expect(index).not.toContain("24/7 Customer Support");
    expect(index).not.toContain("Smart Solutions");
    expect(index).toContain("Enquire About Our Services");
  });

  it("detail renders the pending notice + enquiry only, never repo summaries, prices or timelines", () => {
    expect(detail).not.toContain("service.summary");
    expect(detail).not.toContain("service.offerings");
    expect(detail).not.toContain("₹");
    expect(detail).not.toContain("SampleTag");
    expect(detail).not.toContain("DemoLegend");
    expect(detail).toContain("SERVICE_PENDING_LABEL");
    expect(detail).toContain("SERVICE_ENQUIRE_LABEL");
    expect(detail).toContain("/contact-us");
    // The labels themselves, pinned literally (not via the constants).
    expect(SERVICE_PENDING_LABEL).toBe("Service details to be confirmed");
    expect(SERVICE_ENQUIRE_LABEL).toBe("Enquire About This Service");
  });

  it("no held summary or offering string appears in either template source", () => {
    for (const text of HELD_TEXTS) {
      expect(index).not.toContain(text);
      expect(detail).not.toContain(text);
    }
  });

  it("detail metadata carries a neutral description, never the unconfirmed summary", () => {
    const meta = servicePageMetadata(services[5], "/services/web-development");
    expect(meta.description).toContain("confirmed on enquiry");
    expect(meta.description).not.toContain("aesthetically pleasing");
    const meta2 = servicePageMetadata(services[9], "/services/us-it-staffing");
    expect(meta2.description).not.toContain("IT staffing services for US requirements.");
  });

  it("metadata builder no longer publishes service summaries as descriptions", () => {
    const block = metadataSrc.slice(
      metadataSrc.indexOf("export function servicePageMetadata"),
      metadataSrc.indexOf("export function comparisonPageMetadata"),
    );
    expect(block).not.toContain("service.summary");
  });
});
