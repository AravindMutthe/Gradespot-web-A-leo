// Frontend 3.0 — Stage 0 baseline regression-test scaffolding.
//
// Purpose: record main's ACTUAL lead/verification behaviour against the
// v1.1 contract, with honest pass/fail status. Nothing here changes a
// route; correcting the gaps below is Stage 7 work, and any correction
// must preserve existing external route and consumer compatibility.
// A breaking request-contract change, if ever needed, is escalated,
// never silently introduced.
//
// Honesty note on the GAP tests: they use `it.fails` deliberately.
// `it.fails` passes only while the inner assertion FAILS — i.e. while
// the gap is still present. That is documentation of a known gap, not
// a faked pass: the day the gap is fixed, the `it.fails` test itself
// fails and must be replaced by a real passing test. Do not convert
// these to plain passing tests without fixing the behaviour.
//
// v1.1 contract (specification, NOT main's behaviour):
//   201 Created — durably stored, stable lead ID.
//   202 Accepted — ONLY with a proven durable queue (recoverable
//     processing ID + explicit pending state).
//   503 Unavailable — neither safely accepted, safe retry path.
//   Explicit consent fields including whatsapp_opt_in; idempotency
//   key scope/expiry, duplicate handling, retry behaviour defined.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { validateLead } from "../src/lib/lead-validation";
import { courses } from "../src/data/courses";
import { services } from "../src/data/services";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

const VALID_LEAD = {
  name: "Test User",
  email: "",
  phone: "9885189951",
  interest: "Course enquiry",
  whatsappOptIn: true,
};

describe("Stage 0 baseline — lead validation (main behaviour, preserved)", () => {
  it("accepts a valid lead payload including whatsappOptIn", () => {
    const { data, errors } = validateLead(VALID_LEAD);
    expect(errors).toEqual({});
    expect(data).not.toBeNull();
    expect(data?.whatsappOptIn).toBe(true);
  });

  it("rejects an invalid name", () => {
    const { data, errors } = validateLead({ ...VALID_LEAD, name: "A" });
    expect(data).toBeNull();
    expect(errors.name).toBeTruthy();
  });

  it("rejects an obviously fake sequential phone number", () => {
    const { data, errors } = validateLead({ ...VALID_LEAD, phone: "1234567890" });
    expect(data).toBeNull();
    expect(errors.phone).toBeTruthy();
  });

  it("rejects a non-boolean whatsappOptIn", () => {
    const { data, errors } = validateLead({ ...VALID_LEAD, whatsappOptIn: "yes" });
    expect(data).toBeNull();
    expect(errors.whatsappOptIn).toBeTruthy();
  });

  it("rejects a missing interest", () => {
    const { data, errors } = validateLead({ ...VALID_LEAD, interest: "" });
    expect(data).toBeNull();
    expect(errors.interest).toBeTruthy();
  });
});

describe("Stage 0 baseline — catalogue inventory (main data, unchanged)", () => {
  it("has 36 courses: 11 full-detail, 25 catalogue-only", () => {
    expect(courses).toHaveLength(36);
    expect(courses.filter((c) => c.catalogOnly)).toHaveLength(25);
    expect(courses.filter((c) => !c.catalogOnly)).toHaveLength(11);
  });

  it("covers 10 categories", () => {
    expect(new Set(courses.map((c) => c.category)).size).toBe(10);
  });

  it("has 12 services", () => {
    expect(services).toHaveLength(12);
  });
});

describe("Stage 0 baseline — lead route vs v1.1 contract (GAPS, Stage 7)", () => {
  const route = readSource("../src/app/api/leads/route.ts");

  it("returns 201 unconditionally on main (documented defect)", () => {
    // Main returns status 201 in all cases; the stored flag is in the
    // body, not the status. This test documents that fact.
    expect(route).toContain("status: 201");
  });

  it.fails("GAP (Stage 7): log-only lead must not return 201", () => {
    // v1.1 requires the status to reflect durability: 201 only when
    // durably stored, 202 only with a proven durable queue, 503 when
    // neither is safely accepted. Main branches on nothing: it always
    // answers 201. This assertion fails until Stage 7 fixes it.
    expect(route).toMatch(/stored\s*===\s*"supabase"\s*\?\s*201\s*:\s*202/);
  });

  it.fails("GAP (Stage 7): route defines 202/503 durability states", () => {
    expect(route).toContain("status: 202");
    expect(route).toContain("status: 503");
  });

  it.fails("GAP (Stage 7): idempotency is handled", () => {
    const data = readSource("../src/lib/data.ts");
    expect(data).toMatch(/idempotency/i);
  });
});

describe("Stage 0 baseline — verify route (main behaviour, preserved)", () => {
  it("selects only the certificate record fields (no extra personal data)", () => {
    const data = readSource("../src/lib/data.ts");
    expect(data).toContain('.select("code,student_name,course,issued_on")');
  });

  it("verify route validates the code before lookup", () => {
    const route = readSource("../src/app/api/verify/route.ts");
    expect(route).toContain("min(3");
    expect(route).toContain("max(80");
  });
});
