// Frontend 3.0 — Stage 0 baseline regression-test scaffolding, updated
// by Stage 7.
//
// Purpose: record main's ACTUAL lead/verification behaviour against the
// v1.1 contract, with honest pass/fail status. Nothing here changes a
// route; correcting the gaps below was Stage 7 work, and any correction
// must preserve existing external route and consumer compatibility.
// A breaking request-contract change, if ever needed, is escalated,
// never silently introduced.
//
// Honesty note on the former GAP tests: they used `it.fails`
// deliberately — `it.fails` passes only while the inner assertion FAILS,
// i.e. while the gap is still present. Stage 7 fixed the gaps, so the
// `it.fails` tests were replaced by real passing tests in this file and
// in tests/lead-verify-contract.test.ts. Do not reintroduce `it.fails`
// without a live gap behind it.
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

describe("Stage 0 baseline — lead route vs v1.1 contract (FIXED in Stage 7)", () => {
  const route = readSource("../src/app/api/leads/route.ts");

  it("returns 201 only when durably stored, not unconditionally", () => {
    // Stage 7: the route maps stored "supabase" -> 201 and stored "log"
    // -> 503 through leadOutcomeToResponse; it no longer answers a bare
    // unconditional 201 for every stored outcome.
    expect(route).toContain("leadOutcomeToResponse");
    expect(route).not.toMatch(/return NextResponse\.json\(\{ ok: true, stored: result\.stored/);
  });

  it("Stage 7: log-only lead returns 503 with honest not-confirmed copy", () => {
    const contract = readSource("../src/lib/lead-contract.ts");
    expect(contract).toContain("status: 503");
    expect(contract).toContain("couldn't confirm your enquiry as recorded");
    expect(contract).toContain("stored: \"log\"");
    expect(contract).toContain("id: null");
  });

  it("Stage 7: route defines no queued/pending state for log-only leads", () => {
    // 202 means "accepted for processing" and there is no durable queue
    // in this stage, so the route must not answer 202 for any lead.
    expect(route).not.toMatch(/status:\s*202/);
    expect(route).toContain("status: 429");
  });

  it("Stage 7: idempotency is handled (best-effort, per instance)", () => {
    const contract = readSource("../src/lib/lead-contract.ts");
    const route = readSource("../src/app/api/leads/route.ts");
    expect(route).toMatch(/Idempotency-Key/);
    expect(contract).toContain("getCachedLeadOutcome");
    expect(contract).toContain("rememberLeadOutcome");
    expect(contract).toMatch(/NOT shared across/i);
    const data = readSource("../src/lib/data.ts");
    // No DB schema change in Stage 7: dedupe lives in the route layer,
    // not in a new table or migration.
    expect(data).not.toMatch(/idempotency/i);
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
