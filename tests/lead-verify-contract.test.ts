// Frontend 3.0 — Stage 7 lead/verify contract tests (real, passing).
//
// These replace the Stage 0 GAP `it.fails` tests: they pin the honest
// contract instead of documenting its absence. A lead response may only
// claim what actually happened: 201 + stable id only when durably
// stored; 503 + not-confirmed copy when only logged; no queued/pending
// state without a durable queue; idempotency best-effort per instance;
// verify field selection unchanged.

import { readFileSync } from "node:fs";
import { describe, expect, it, beforeEach } from "vitest";
import {
  leadOutcomeToResponse,
  normalizeIdempotencyKey,
  newIdempotencyKey,
  getCachedLeadOutcome,
  rememberLeadOutcome,
  clearLeadOutcomeCache,
  LEAD_RECORDED_MESSAGE,
  LEAD_NOT_CONFIRMED_MESSAGE,
  LEAD_RATE_LIMITED_MESSAGE,
} from "../src/lib/lead-contract";
import {
  createRateLimiter,
  clientIpFromHeaders,
} from "../src/lib/rate-limit";

function readSource(rel: string): string {
  return readFileSync(new URL(rel, import.meta.url), "utf8");
}

describe("Stage 7 — lead status mapping", () => {
  it("maps a durably stored lead to 201 with id and recorded copy", () => {
    const res = leadOutcomeToResponse({ stored: "supabase", id: "42" });
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.status).toBe("recorded");
    expect(res.body.stored).toBe("supabase");
    expect(res.body.id).toBe("42");
    expect(res.body.message).toBe(LEAD_RECORDED_MESSAGE);
    expect(res.body.message).toContain("received and recorded");
  });

  it("maps a log-only lead to 503 with no id and not-confirmed copy", () => {
    const res = leadOutcomeToResponse({ stored: "log" });
    expect(res.status).toBe(503);
    expect(res.body.ok).toBe(false);
    expect(res.body.status).toBe("not_confirmed");
    expect(res.body.stored).toBe("log");
    expect(res.body.id).toBeNull();
    expect(res.body.message).toBe(LEAD_NOT_CONFIRMED_MESSAGE);
    expect(res.body.message).toContain("couldn't confirm");
    expect(res.body.message).not.toContain("will get back to you");
    expect(res.body.message).not.toContain("shortly");
  });

  it("never promises a callback for a log-only lead", () => {
    const res = leadOutcomeToResponse({ stored: "log" });
    expect(res.body.message).not.toMatch(/will call|will get back|counsellor will call/i);
  });
});

describe("Stage 7 — idempotency keys (best-effort, per instance)", () => {
  beforeEach(() => clearLeadOutcomeCache());

  it("accepts UUID-shaped and token-shaped keys, rejects malformed ones", () => {
    expect(normalizeIdempotencyKey(newIdempotencyKey())).not.toBeNull();
    expect(normalizeIdempotencyKey("abc-def_12345")).toBe("abc-def_12345");
    expect(normalizeIdempotencyKey("short")).toBeNull();
    expect(normalizeIdempotencyKey("has space key 123")).toBeNull();
    expect(normalizeIdempotencyKey("")).toBeNull();
    expect(normalizeIdempotencyKey(undefined)).toBeNull();
    expect(normalizeIdempotencyKey(123)).toBeNull();
  });

  it("generates a fresh key per call", () => {
    expect(newIdempotencyKey()).not.toBe(newIdempotencyKey());
  });

  it("replays a cached outcome without re-storing, and expires entries", () => {
    const key = "replay-key-12345";
    expect(getCachedLeadOutcome(key)).toBeNull();
    rememberLeadOutcome(
      key,
      { status: "recorded", stored: "supabase", id: "7" },
      1_000,
    );
    expect(getCachedLeadOutcome(key, 2_000)).toEqual({
      status: "recorded",
      stored: "supabase",
      id: "7",
    });
    // Past the 24h TTL the entry is gone, so a resubmission is fresh.
    expect(getCachedLeadOutcome(key, 1_000 + 24 * 60 * 60 * 1000 + 1)).toBeNull();
  });

  it("documents the per-instance limitation in code", () => {
    const contract = readSource("../src/lib/lead-contract.ts");
    expect(contract).toMatch(/per-instance/i);
    expect(contract).toMatch(/NOT shared across/i);
    expect(contract).toMatch(/shared store/i);
  });
});

describe("Stage 7 — rate limiting (per instance, honestly limited)", () => {
  it("allows up to the limit, then blocks with a retry hint", () => {
    const check = createRateLimiter(3, 60_000);
    expect(check("1.2.3.4", 0).allowed).toBe(true);
    expect(check("1.2.3.4", 1_000).allowed).toBe(true);
    expect(check("1.2.3.4", 2_000).allowed).toBe(true);
    const blocked = check("1.2.3.4", 3_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    // A different IP is unaffected.
    expect(check("5.6.7.8", 3_000).allowed).toBe(true);
    // After the window passes, the IP is allowed again.
    expect(check("1.2.3.4", 61_001).allowed).toBe(true);
  });

  it("reads the client IP from forwarded headers, first entry wins", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.9, 70.41.3.117",
    });
    expect(clientIpFromHeaders(headers)).toBe("203.0.113.9");
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });

  it("route returns 429 with honest copy, never a recorded lead", () => {
    const route = readSource("../src/app/api/leads/route.ts");
    expect(route).toContain("status: 429");
    expect(route).toContain("LEAD_RATE_LIMITED_MESSAGE");
    expect(LEAD_RATE_LIMITED_MESSAGE).toContain("Too many enquiries");
  });

  it("documents the per-instance limitation in code", () => {
    const limiter = readSource("../src/lib/rate-limit.ts");
    expect(limiter).toMatch(/per-instance/i);
    expect(limiter).toMatch(/NOT distributed/i);
    expect(limiter).toMatch(/shared store/i);
  });
});

describe("Stage 7 — forms branch on the honest status", () => {
  const forms = [
    "../src/components/LeadForm.tsx",
    "../src/components/RegisterForm.tsx",
    "../src/components/LpLeadForm.tsx",
  ];

  it("all three forms send an idempotency key and require 201 + supabase", () => {
    for (const form of forms) {
      const src = readSource(form);
      expect(src).toContain("Idempotency-Key");
      expect(src).toContain("newIdempotencyKey()");
      expect(src).toContain('res.status === 201');
      expect(src).toContain('body.stored === "supabase"');
    }
  });

  it("all three forms keep a double-submit guard", () => {
    for (const form of forms) {
      const src = readSource(form);
      expect(src).toContain('if (state === "sending") return');
      expect(src).toContain('disabled={state === "sending"}');
    }
  });

  it("no form claims a bare 'sent' success or an unrecorded callback", () => {
    for (const form of forms) {
      const src = readSource(form);
      expect(src).not.toContain('"sent"');
      expect(src).not.toContain("your enquiry has been received. Our team");
      expect(src).not.toContain("your registration is in.");
      expect(src).not.toContain("is in. Our counsellor will call");
    }
  });

  it("recorded copy says 'received and recorded' in every form", () => {
    // LeadForm + LpLeadForm keep "received and recorded". RegisterForm
    // now uses the exact Das string (Part B(b)): "Your enquiry has
    // been recorded" — recorded only on 201, never on 503.
    for (const form of forms) {
      const src = readSource(form);
      if (form.includes("RegisterForm")) {
        expect(src).toContain("Your enquiry has been recorded");
      } else {
        expect(src).toContain("received and recorded");
      }
    }
  });

  it("forms surface the server's not-confirmed message on failure", () => {
    for (const form of forms) {
      const src = readSource(form);
      expect(src).toContain("serverMessage");
      expect(src).toContain('typeof body.error === "string"');
    }
  });

  it("no WhatsApp continuation renders outside the recorded state", () => {
    // LeadForm/RegisterForm render the wa.me link only inside the
    // recorded block; LpLeadForm has no WhatsApp continuation at all.
    const lead = readSource("../src/components/LeadForm.tsx");
    const reg = readSource("../src/components/RegisterForm.tsx");
    expect(lead.indexOf('state === "recorded"')).toBeLessThan(lead.indexOf("wa.me"));
    expect(reg.indexOf('state === "recorded"')).toBeLessThan(reg.indexOf("wa.me"));
    expect(readSource("../src/components/LpLeadForm.tsx")).not.toContain("wa.me");
  });
});

describe("Stage 7 — verify contract unchanged", () => {
  it("verify route still validates 3–80 chars before lookup", () => {
    const route = readSource("../src/app/api/verify/route.ts");
    expect(route).toContain("min(3");
    expect(route).toContain("max(80");
    expect(route).toContain("found: false");
  });

  it("verify still selects only code/student_name/course/issued_on", () => {
    const data = readSource("../src/lib/data.ts");
    expect(data).toContain('.select("code,student_name,course,issued_on")');
  });

  it("no new verification data or widened contract", () => {
    const route = readSource("../src/app/api/verify/route.ts");
    expect(route).not.toContain("email");
    expect(route).not.toContain("phone");
  });
});

describe("Stage 7 — route compatibility preserved where it matters", () => {
  it("invalid payloads still get 400 with per-field errors", () => {
    const route = readSource("../src/app/api/leads/route.ts");
    expect(route).toContain("status: 400");
    expect(route).toContain("Validation failed");
  });

  it("validation and storage modules are unchanged in shape", () => {
    const route = readSource("../src/app/api/leads/route.ts");
    expect(route).toContain("validateLead");
    expect(route).toContain("createLead");
  });
});
