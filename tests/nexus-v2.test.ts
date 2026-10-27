// Nexus v2 unit tests — pure logic only (no DOM, no network, no
// Supabase). These test the code that was actually changed in this
// pass: rate limiting, bot checks, and the honesty config seam.
// Run with: npx vitest run
import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";
import { checkBotSignals } from "@/lib/bot-check";
import { enabledHeaderCtas, siteSettings } from "@/data/site-settings";
import { validateLead } from "@/lib/lead-validation";

describe("rate limiting", () => {
  it("allows up to max, then blocks with a retry-after", () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    expect(checkRateLimit(key, 3, 600).allowed).toBe(true);
    expect(checkRateLimit(key, 3, 600).allowed).toBe(true);
    expect(checkRateLimit(key, 3, 600).allowed).toBe(true);
    const blocked = checkRateLimit(key, 3, 600);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});

describe("bot checks", () => {
  it("rejects a filled honeypot", () => {
    expect(checkBotSignals({ website: "https://spam.example" }).ok).toBe(false);
  });
  it("rejects a submission faster than the configured minimum", () => {
    expect(checkBotSignals({ formStartedAt: Date.now() }).ok).toBe(false);
  });
  it("passes a clean, slow-enough submission and a missing timestamp (fail open)", () => {
    expect(
      checkBotSignals({ formStartedAt: Date.now() - (siteSettings.botCheck.minSeconds + 5) * 1000 }).ok,
    ).toBe(true);
    expect(checkBotSignals({}).ok).toBe(true);
  });
  it("ignores bot fields in lead validation (they are API-layer signals, not lead fields)", () => {
    const checked = validateLead({
      name: "Test User",
      phone: "9876543210",
      email: "",
      interest: "CCNA",
      website: "",
      formStartedAt: Date.now(),
    });
    // 9876543210 is a rejected sequential number — validation must
    // still catch real field errors even with bot fields present.
    expect(checked.data).toBeNull();
    expect(checked.errors.phone).toBeTruthy();
  });
});

describe("honesty config seam", () => {
  it("defaults every unverified claim to OFF", () => {
    expect(siteSettings.showCounters).toBe(false);
    expect(siteSettings.showExperienceBadge).toBe(false);
    expect(siteSettings.showCredentialIso).toBe(false);
    expect(siteSettings.showCredentialAicte).toBe(false);
    expect(siteSettings.showEmployerWall).toBe(false);
  });
  it("exposes the full header CTA trio, enabled, by default", () => {
    const ctas = enabledHeaderCtas();
    expect(ctas.map((c) => c.label)).toEqual([
      "Book Free Demo",
      "Explore Programs",
      "Talk to an Advisor",
    ]);
  });
  it("keeps qualification notes attached to every gated claim", () => {
    expect(siteSettings.counterNote.length).toBeGreaterThan(20);
    expect(siteSettings.credentialNote.length).toBeGreaterThan(20);
    expect(siteSettings.employerNote.length).toBeGreaterThan(20);
  });
});

describe("atlas integration seam (future-only, disabled by default)", () => {
  it("is disabled by default and builds no deep link", async () => {
    const m = await import("@/data/atlas-integration");
    expect(m.atlasIntegrationEnabled()).toBe(false);
    expect(m.atlasDeepLink("example-chapter")).toBeNull();
  });
  it("requires both the flag and a base URL, and builds a chapter link when both are set", async () => {
    const m = await import("@/data/atlas-integration");
    expect(m.atlasIntegrationEnabled({ enabled: true, deepLinkBase: "" })).toBe(false);
    expect(m.atlasIntegrationEnabled({ enabled: false, deepLinkBase: "https://example.invalid" })).toBe(false);
    expect(
      m.atlasDeepLink("example-chapter", { enabled: true, deepLinkBase: "https://example.invalid/" }),
    ).toBe("https://example.invalid/chapters/example-chapter");
  });
});
