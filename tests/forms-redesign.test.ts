// Forms redesign (feat/frontend-v3-forms-redesign): anti-spam layers,
// 503 message-first reading, and the theme-adaptive (no hardcoded
// color) rule for the three enquiry forms. Source-assertion style,
// matching the rest of this suite (no component renderer installed).
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  MIN_SUBMIT_MS,
  validateLead,
  validateName,
} from "../src/lib/lead-validation";

const read = (rel: string) =>
  readFileSync(new URL(rel, import.meta.url), "utf8");

const LEAD_FORM = read("../src/components/LeadForm.tsx");
const LP_FORM = read("../src/components/LpLeadForm.tsx");
const REGISTER_FORM = read("../src/components/RegisterForm.tsx");
const FORM_STYLES = read("../src/components/lead-form-styles.ts");

const validBase = (overrides: Record<string, unknown> = {}) => ({
  name: "Aravind Mutthe",
  phone: "+919182654056",
  email: "",
  interest: "Azure Training",
  message: "Hello",
  source: "website:/test",
  whatsappOptIn: false,
  // Anti-spam fields as a real form sends them: empty honeypot and a
  // mount timestamp comfortably older than the minimum.
  website: "",
  formLoadedAt: Date.now() - 10_000,
  ...overrides,
});

describe("honeypot", () => {
  it("rejects a filled honeypot without recording", () => {
    const checked = validateLead(validBase({ website: "https://spam.example" }));
    expect(checked.data).toBeNull();
    expect(checked.errors.form).toBeDefined();
  });

  it("rejects a whitespace-only honeypot only when non-empty after trim; whitespace alone passes", () => {
    expect(validateLead(validBase({ website: "   " })).data).not.toBeNull();
    expect(validateLead(validBase({ website: "x" })).data).toBeNull();
  });

  it("never names the honeypot in the error", () => {
    const checked = validateLead(validBase({ website: "filled" }));
    expect(checked.data).toBeNull();
    const blob = JSON.stringify(checked.errors);
    expect(blob).not.toMatch(/honeypot/i);
    expect(blob).not.toMatch(/website/i);
  });

  it("missing honeypot is allowed (old clients, API compat)", () => {
    const rest = validBase();
    delete (rest as Record<string, unknown>).website;
    expect(validateLead(rest).data).not.toBeNull();
  });

  it("honeypot and timestamp are never copied into the stored payload", () => {
    const checked = validateLead(validBase());
    expect(checked.data).not.toBeNull();
    expect("website" in checked.data!).toBe(false);
    expect("formLoadedAt" in checked.data!).toBe(false);
    // The confirm flag is a transport-only signal, like the other
    // anti-spam fields: read by validation, never stored.
    expect("confirmedFastSubmit" in checked.data!).toBe(false);
  });
});

describe("minimum time-to-submit", () => {
  it(`rejects UNCONFIRMED submissions faster than ${MIN_SUBMIT_MS}ms after load`, () => {
    expect(MIN_SUBMIT_MS).toBe(3000);
    const checked = validateLead(validBase({ formLoadedAt: Date.now() }));
    expect(checked.data).toBeNull();
    expect(checked.errors.form).toBeDefined();
  });

  it("accepts CONFIRMED fast submissions (Das: humans are never auto-rejected for speed)", () => {
    const checked = validateLead(
      validBase({ formLoadedAt: Date.now(), confirmedFastSubmit: true }),
    );
    expect(checked.data).not.toBeNull();
  });

  it("a non-boolean confirmation flag does not skip the timing check", () => {
    const checked = validateLead(
      validBase({ formLoadedAt: Date.now(), confirmedFastSubmit: "true" }),
    );
    expect(checked.data).toBeNull();
  });

  it("the honeypot still rejects even a confirmed fast submission", () => {
    const checked = validateLead(
      validBase({
        formLoadedAt: Date.now(),
        confirmedFastSubmit: true,
        website: "https://spam.example",
      }),
    );
    expect(checked.data).toBeNull();
  });

  it("all three forms carry the recoverable confirm step (no data loss, keyboard-focusable)", () => {
    for (const src of [LEAD_FORM, LP_FORM, REGISTER_FORM]) {
      // State + ref + shared submit path with the confirmation flag.
      expect(src).toContain("needsConfirm");
      expect(src).toContain("formRef");
      expect(src).toContain("submitForm");
      expect(src).toContain("confirmedFastSubmit");
      expect(src).toContain("MIN_SUBMIT_MS");
      // The panel itself: announced (role=status), native button,
      // auto-focused on mount, resubmits the preserved form data.
      expect(src).toContain('role="status"');
      expect(src).toContain("leadFormConfirm");
      expect(src).toContain("You submitted very quickly");
      expect(src).toContain("Yes, send my enquiry");
      expect(src).toContain("submitForm(formRef.current, true)");
      // The old automatic-rejection wording is gone from the forms.
      expect(src).not.toContain("server rejects submissions faster");
      expect(src).not.toContain("the server rejects submissions faster");
    }
    expect(FORM_STYLES).toContain("leadFormConfirm");
  });

  it("accepts submissions at or after the minimum", () => {
    expect(
      validateLead(validBase({ formLoadedAt: Date.now() - MIN_SUBMIT_MS })).data,
    ).not.toBeNull();
  });

  it("missing or non-numeric timestamps are allowed (soft signal, not a gate)", () => {
    const rest = validBase();
    delete (rest as Record<string, unknown>).formLoadedAt;
    expect(validateLead(rest).data).not.toBeNull();
    expect(validateLead(validBase({ formLoadedAt: "soon" })).data).not.toBeNull();
  });
});

describe("name field tightening", () => {
  it("rejects URL-like names", () => {
    for (const bad of [
      "www.example.com",
      "https://spam.example",
      "Visit example.com today",
    ]) {
      expect(validateName(bad)).not.toBeNull();
    }
  });

  it("keeps legitimate dotted names", () => {
    for (const good of [
      "Aravind Mutthe",
      "Mary-Jane O'Brien",
      "St. John",
      "J. R. R. Tolkien",
      "Anne Marie",
    ]) {
      expect(validateName(good)).toBeNull();
    }
  });

  it("message length stays capped at 2000 chars", () => {
    expect(validateLead(validBase({ message: "x".repeat(2001) })).data).toBeNull();
    expect(validateLead(validBase({ message: "x".repeat(2000) })).data).not.toBeNull();
  });
});

describe("503 message-first reading (all three enquiry forms)", () => {
  // No component renderer is installed, so this pins the reading
  // order in source: `message` must be checked before `error`, or a
  // 503 log-only response shows a generic fallback instead of the
  // honest not-confirmed copy.
  it("LeadForm reads body.message before body.error", () => {
    const msg = LEAD_FORM.indexOf('typeof body.message === "string"');
    const err = LEAD_FORM.indexOf('typeof body.error === "string"');
    expect(msg).toBeGreaterThan(-1);
    expect(err).toBeGreaterThan(-1);
    expect(msg).toBeLessThan(err);
  });

  it("RegisterForm reads body.message before body.error", () => {
    const msg = REGISTER_FORM.indexOf('typeof body.message === "string"');
    const err = REGISTER_FORM.indexOf('typeof body.error === "string"');
    expect(msg).toBeGreaterThan(-1);
    expect(err).toBeGreaterThan(-1);
    expect(msg).toBeLessThan(err);
  });

  it("LpLeadForm keeps its message-first reading", () => {
    const msg = LP_FORM.indexOf('typeof body.message === "string"');
    const err = LP_FORM.indexOf('typeof body.error === "string"');
    expect(msg).toBeGreaterThan(-1);
    expect(err).toBeGreaterThan(-1);
    expect(msg).toBeLessThan(err);
  });
});

describe("honeypot present in all three forms", () => {
  it.each([
    ["LeadForm", LEAD_FORM],
    ["LpLeadForm", LP_FORM],
    ["RegisterForm", REGISTER_FORM],
  ])("%s renders a hidden, unfocusable, non-autofill honeypot", (_name, src) => {
    expect(src).toContain('name="website"');
    expect(src).toContain("aria-hidden");
    expect(src).toContain("tabIndex={-1}");
    expect(src).toContain('autoComplete="off"');
    expect(src).toContain("formLoadedAt");
  });
});

describe("theme-adaptive forms: no hardcoded color", () => {
  const files: Array<[string, string]> = [
    ["lead-form-styles.ts", FORM_STYLES],
    ["LeadForm.tsx", LEAD_FORM],
    ["LpLeadForm.tsx", LP_FORM],
    ["RegisterForm.tsx", REGISTER_FORM],
  ];

  it.each(files)("%s contains no hardcoded hex color", (_name, src) => {
    expect(src).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it("the shared styles use tokens only", () => {
    for (const token of [
      "bg-surface",
      "bg-surface-muted",
      "border-line",
      "border-t-brand",
      "text-heading",
      "text-body",
      "text-muted",
      "text-signal-strong",
      "text-field-error",
      "bg-success-surface",
      "text-success-text",
      "bg-error-surface",
      "text-error-text",
      "bg-wa",
      "focus:border-brand",
      "focus:ring-brand/20",
    ]) {
      expect(FORM_STYLES).toContain(token);
    }
  });

  it("all three forms share the one style module", () => {
    for (const src of [LEAD_FORM, LP_FORM, REGISTER_FORM]) {
      expect(src).toContain("@/components/lead-form-styles");
      expect(src).toContain("leadFormCard");
      expect(src).toContain("leadFormField");
    }
  });
});
