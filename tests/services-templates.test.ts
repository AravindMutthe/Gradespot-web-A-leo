// Frontend 3.0 — Stage 4 services template tests.
//
// These tests pin the Stage 2→3 gate contract for the services
// templates: Option A compact text-first rows, removed promotional
// sections actually absent from the templates, and unchanged
// slugs/routes. DEMO-FILL (owner-authorised, preview only): the 12
// services are now sample-filled (scope + offerings, marked); the
// title-only hold assertions below pin the demo contract. The repo
// summaries stay unconfirmed and never render. They read the row
// model and the template sources, so a regression that reintroduces
// a card grid, a removed section, or an invented claim fails here.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { services } from "../src/data/services";
import {
  SERVICE_DETAILS_LABEL,
  SERVICE_ENQUIRE_LABEL,
  SERVICE_PENDING_LABEL,
  buildServiceRow,
} from "../src/lib/services-rows";
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

describe("Stage 4 services index — inventory and sample-filled rows", () => {
  it("renders 12 rows, one per service, in repo order with slugs unchanged", () => {
    expect(rows.length).toBe(12);
    expect(rows.map((r) => r.slug)).toEqual(services.map((s) => s.slug));
    expect(rows.every((r) => r.sample)).toBe(true);
    expect(rows.every((r) => r.heldBack)).toBe(false);
  });

  it("fills every row with a marked sample scope and a details action, never an enquiry-only dead end", () => {
    for (const row of rows) {
      expect(row.description).toBeTruthy();
      expect(row.statusLabel).toBe("");
      expect(row.actionLabel).toBe(SERVICE_DETAILS_LABEL);
      expect(row.actionHref).toBe(`/services/${row.slug}`);
      expect(row.titleHref).toBe(`/services/${row.slug}`);
      expect(row.offerings).toBeTruthy();
      expect(row.offerings!.length).toBeGreaterThanOrEqual(3);
      expect(row.offerings!.length).toBeLessThanOrEqual(6);
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

  it("detail renders sample scope + offerings only via the sample branch, never repo summaries, prices or timelines", () => {
    expect(detail).not.toContain("service.summary");
    expect(detail).not.toContain("service.offerings");
    expect(detail).not.toContain("₹");
    expect(detail).toContain("sample.summary");
    expect(detail).toContain("sample.offerings");
    expect(detail).toContain("SampleTag");
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
