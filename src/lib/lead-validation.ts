// Shared lead validation — ONE implementation used by the client forms
// AND the /api/leads route (v1 hardening, DECISIONS.md §25.18). The
// server must never accept what the client rejects, so both sides run
// these exact functions; the route only adds storage on top. Kept
// dependency-free (no zod) so importing it into client components
// costs nothing in bundle size.
//
// Rules:
// - name: required, 2–120 chars, letters/spaces/hyphen/apostrophe/dot
//   only, at least two letters (rejects "12", "A", "!!!").
// - phone: required. Indian mobile with +91 / 91 / trunk-0 / bare
//   10-digit forms must be 10 digits starting 6–9; anything else must
//   be a plausible international number (+country code, 7–15 digits).
//   All-same-digit numbers and sequential runs (0123456789,
//   1234567890, 9876543210) are rejected as obviously fake.
// - email: optional, but strictly format-checked whenever present.
// - interest: required; a "Registration:" / "Demo:" prefix with an
//   empty course behind it is rejected (the old empty-course hole).
// - course: optional field; when a form sends one it must be non-empty.
// - country: optional free text, max 100 chars (partner form only;
//   persists only once the leads.country column exists).
// - organisation: partner form only; required in the form UI, and when
//   present must be 2–200 chars (absent/empty counts as absent here so
//   other forms are unaffected; persists only once the leads
//   .organisation column exists).
// - partnershipType: partner form only; when present must be one of
//   training, university MoU, reseller, white-label (absent/empty counts
//   as absent here so other forms are unaffected; persists only once
//   the leads.partnership_type column exists).
// - message: optional, capped at 2000 chars.
// - DPDP consent lines and the unticked WhatsApp opt-in are untouched
//   by this module — they live in the form components.

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message?: string;
  source?: string;
  whatsappOptIn?: boolean;
  course?: string;
  country?: string;
  organisation?: string;
  partnershipType?: string;
}

// Anti-spam additions (forms redesign, no vendor, no account, no key):
// - Honeypot: the forms render a visually hidden field named `website`
//   (bot-attractive, NOT a browser autofill token). A filled honeypot
//   is rejected WITHOUT recording a lead and WITHOUT naming the
//   honeypot in the error — the caller sees only the generic message.
// - Minimum time-to-submit: the forms stamp `formLoadedAt` (client
//   epoch ms) at mount. A submission faster than MIN_SUBMIT_MS after
//   load is a SOFT signal, not proof of humanity: timestamps can be
//   spoofed by a determined submitter, and a client clock far ahead
//   of the server can shorten the measured gap. Human form users are
//   NEVER auto-rejected for speed (Das recommendation): the form
//   keeps their data and asks for confirmation instead, and a
//   submission carrying confirmedFastSubmit: true is accepted. Only
//   direct API posts with NO confirmation flag and elapsed <
//   MIN_SUBMIT_MS are still rejected (the bot path). Missing or
//   non-numeric timestamps are ALLOWED (old clients, API compat) —
//   the defence is the layering (honeypot + time + existing
//   20-per-60s per-IP rate limit + validation), never any single
//   check. Neither anti-spam field (nor the confirmation flag) is
//   copied into the returned payload, so none can ever reach storage.
export const MIN_SUBMIT_MS = 3000;
export const ANTI_SPAM_MESSAGE = "Please check the fields and try again.";

export function validateHoneypot(value: unknown): string | null {
  if (value === undefined) return null;
  if (typeof value !== "string") return ANTI_SPAM_MESSAGE;
  if (value.trim().length > 0) return ANTI_SPAM_MESSAGE;
  return null;
}

export function validateSubmitTiming(
  value: unknown,
  nowMs: number = Date.now(),
): string | null {
  if (value === undefined) return null;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (nowMs - value < MIN_SUBMIT_MS) return ANTI_SPAM_MESSAGE;
  return null;
}

export type LeadErrors = Record<string, string>;

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const SEQUENTIAL = new Set(["0123456789", "1234567890", "9876543210", "0987654321"]);

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

// Spam TLDs for the name-field web-address check below. Kept narrow
// on purpose: it must catch "example.com" / "www.example.com" as a
// name without catching "St. John" (dot followed by a space, not a
// TLD) or "J. R. R. Tolkien" (initials, not domains).
const SPAM_TLDS = [
  "com",
  "net",
  "org",
  "io",
  "co",
  "in",
  "me",
  "info",
  "biz",
  "xyz",
  "site",
  "online",
  "top",
  "click",
  "link",
  "live",
  "fun",
  "pro",
  "app",
];

export function validateName(value: unknown): string | null {
  const v = asString(value)?.trim() ?? "";
  if (v.length === 0) return "Please enter your full name";
  if (v.length < 2) return "Please enter your full name (at least 2 characters)";
  if (v.length > 120) return "Name is too long (max 120 characters)";
  if (!NAME_PATTERN.test(v) || /[-'.]$/.test(v))
    return "Name may only contain letters, spaces, hyphens, apostrophes and dots";
  if ((v.match(/\p{L}/gu) ?? []).length < 2)
    return "Please enter your full name (at least 2 letters)";
  // Web addresses are not names: reject URL-like content that the
  // letter pattern above would otherwise pass ("www.example.com",
  // "example.com", "https://…"). Legitimate dotted names ("St. John",
  // initials) do not match: the dot must be followed directly by a
  // spam TLD and then a space, end, slash, or colon.
  if (/www\./i.test(v) || /https?:\/\//i.test(v))
    return "Please enter your full name (web addresses are not accepted)";
  if (
    new RegExp(`\\b[a-z0-9-]+\\.(${SPAM_TLDS.join("|")})(\\s|$|\\/|:)` , "i").test(v)
  )
    return "Please enter your full name (web addresses are not accepted)";
  return null;
}

export function validatePhone(value: unknown): string | null {
  const raw = asString(value)?.trim() ?? "";
  if (raw.length === 0) return "Please enter your phone number";
  const stripped = raw.replace(/[\s\-()]/g, "");
  if (!/^\+?\d+$/.test(stripped))
    return "Please enter a valid phone number (digits and an optional + only)";
  const digits = stripped.replace(/^\+/, "");
  if (digits.length < 7) return "Phone number is too short";
  if (digits.length > 15) return "Phone number is too long";
  if (/^(\d)\1+$/.test(digits))
    return "Please enter a real phone number";
  // Indian mobile: +91 / 91 / trunk-0 / bare 10-digit.
  let national: string | null = null;
  if (digits.length === 12 && digits.startsWith("91")) national = digits.slice(2);
  else if (digits.length === 10) national = digits;
  else if (digits.length === 11 && digits.startsWith("0")) national = digits.slice(1);
  if (national !== null) {
    if (national.length !== 10 || !/^[6-9]\d{9}$/.test(national))
      return "Please enter a valid 10-digit Indian mobile number starting with 6–9";
    if (SEQUENTIAL.has(national))
      return "Please enter a real phone number";
    return null;
  }
  // International fallback: +country code, 7–15 digits, never 0-led.
  if (digits.startsWith("0"))
    return "Please enter a valid phone number (use +91 for Indian numbers)";
  return null;
}

export function validateEmail(value: unknown): string | null {
  if (value === undefined) return null; // optional
  if (typeof value !== "string") return "Please enter a valid email address";
  const v = value.trim();
  if (v.length === 0) return null; // optional — empty is fine
  if (v.length > 160) return "Email address is too long";
  if (v.includes("..")) return "Please enter a valid email address";
  const [local, domain, ...rest] = v.split("@");
  if (!local || !domain || rest.length > 0)
    return "Please enter a valid email address";
  if (!/^[A-Za-z0-9._%+-]+$/.test(local) || local.startsWith(".") || local.endsWith("."))
    return "Please enter a valid email address";
  if (
    !/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(domain) ||
    domain.startsWith("-") ||
    domain.startsWith(".")
  )
    return "Please enter a valid email address";
  return null;
}

export function validateInterest(value: unknown): string | null {
  const v = asString(value)?.trim() ?? "";
  if (v.length === 0) return "Tell us what you are interested in";
  if (v.length < 2) return "Tell us what you are interested in";
  if (v.length > 200) return "Interest is too long (max 200 characters)";
  if (/^(Registration|Demo):$/.test(v)) return "Please choose a course";
  return null;
}

export function validateCourse(value: unknown): string | null {
  if (value === undefined) return null;
  const v = asString(value)?.trim() ?? "";
  if (v.length === 0) return "Please choose a course";
  if (v.length > 200) return "Course name is too long";
  return null;
}

export function validateCountry(value: unknown): string | null {
  if (value === undefined) return null; // optional
  if (typeof value !== "string") return "Country must be text";
  const v = value.trim();
  if (v.length === 0) return null; // optional — empty is fine
  if (v.length > 100) return "Country is too long (max 100 characters)";
  return null;
}

export function validateOrganisation(value: unknown): string | null {
  if (value === undefined) return null; // other forms don't send it
  if (typeof value !== "string") return "Organisation must be text";
  const v = value.trim();
  if (v.length === 0) return null; // absent counts as absent here
  if (v.length < 2) return "Please enter your organisation name";
  if (v.length > 200) return "Organisation name is too long (max 200 characters)";
  return null;
}

const PARTNERSHIP_TYPES = ["training", "university MoU", "reseller", "white-label"];

export function validatePartnershipType(value: unknown): string | null {
  if (value === undefined) return null; // other forms don't send it
  if (typeof value !== "string") return "Partnership type must be text";
  const v = value.trim();
  if (v.length === 0) return null; // absent counts as absent here
  if (!PARTNERSHIP_TYPES.includes(v)) return "Please choose a partnership type";
  return null;
}

export function validateMessage(value: unknown): string | null {
  if (value === undefined) return null;
  if (typeof value !== "string") return "Message must be text";
  const v = value;
  if (v.trim().length > 2000) return "Message is too long (max 2000 characters)";
  return null;
}

/** Validate a raw (untrusted) lead payload. Returns field errors, or a
 *  cleaned payload when valid. Unknown extra fields are ignored. */
export function validateLead(
  body: unknown,
): { data: LeadPayload; errors: LeadErrors } | { data: null; errors: LeadErrors } {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { data: null, errors: { form: "Invalid request body" } };
  }
  const b = body as Record<string, unknown>;
  // Anti-spam gate FIRST, before field errors: a filled honeypot or
  // an UNCONFIRMED too-fast submission returns ONLY the generic
  // message — the error shape never names the honeypot or the timing
  // rule, so a bot learns nothing about which check tripped. A
  // submission carrying confirmedFastSubmit: true (the human confirm
  // step) skips the timing check; the honeypot still applies. Neither
  // anti-spam field nor the confirmation flag is copied into the
  // returned payload, so none can ever reach storage.
  const confirmed = b.confirmedFastSubmit === true;
  const antiSpam =
    validateHoneypot(b.website) ??
    (confirmed ? null : validateSubmitTiming(b.formLoadedAt));
  if (antiSpam) return { data: null, errors: { form: antiSpam } };
  const errors: LeadErrors = {};
  const put = (key: string, err: string | null) => {
    if (err && !errors[key]) errors[key] = err;
  };
  put("name", validateName(b.name));
  put("phone", validatePhone(b.phone));
  put("email", validateEmail(b.email));
  put("interest", validateInterest(b.interest));
  put("course", validateCourse(b.course));
  put("country", validateCountry(b.country));
  put("organisation", validateOrganisation(b.organisation));
  put("partnershipType", validatePartnershipType(b.partnershipType));
  put("message", validateMessage(b.message));
  if (b.source !== undefined) {
    const s = asString(b.source);
    if (s === null || s.trim().length > 200) errors.source = "Invalid source";
  }
  if (b.whatsappOptIn !== undefined && typeof b.whatsappOptIn !== "boolean") {
    errors.whatsappOptIn = "Invalid WhatsApp preference";
  }
  if (Object.keys(errors).length > 0) return { data: null, errors };
  return {
    data: {
      name: (b.name as string).trim(),
      email: (b.email as string | undefined)?.trim() ?? "",
      phone: (b.phone as string).trim(),
      interest: (b.interest as string).trim(),
      message: asString(b.message)?.trim() || undefined,
      source: asString(b.source)?.trim() || undefined,
      whatsappOptIn: (b.whatsappOptIn as boolean | undefined) ?? false,
      course: asString(b.course)?.trim() || undefined,
      country: asString(b.country)?.trim() || undefined,
      organisation: asString(b.organisation)?.trim() || undefined,
      partnershipType: asString(b.partnershipType)?.trim() || undefined,
    },
    errors: {},
  };
}
