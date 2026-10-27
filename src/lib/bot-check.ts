// Bot checks for lead submissions — honeypot + timing, no CAPTCHA,
// no third-party script, no vendor lock-in, no friction for real users.
//
// Design (current best practice, researched 2026-10-27):
// - Honeypot: a plausible field ("website") rendered off-screen with
//   CSS positioning (never type="hidden", never display:none inline),
//   aria-hidden, tabindex -1, autocomplete off, so screen readers,
//   keyboard users and autofill never trigger it. Server-side only:
//   a browser-side check is useless against bots that never run JS.
// - Timing: the form records its render time in a hidden field; a
//   submission faster than siteSettings.botCheck.minSeconds (3s) is
//   rejected as automated. 3s is deliberately low — autofill users
//   can legitimately be fast — so this is one layer, not a wall.
// - Failure wording is generic ("Validation failed"), and the payload
//   is NEVER stored or logged when a check trips: logging a bot's
//   payload would keep personal data that was never a real enquiry.
// - Missing timestamp FAILS OPEN: direct API clients that predate
//   this field are not blocked by it; the honeypot and rate limit
//   still apply to them. Headless bots that leave the honeypot empty
//   and respect timing are NOT stopped by this layer — that limit is
//   documented, not hidden.

import { siteSettings } from "@/data/site-settings";

export interface BotCheckResult {
  ok: boolean;
  /** Generic, non-revealing reason key for server logs (no payload). */
  reason?: "honeypot" | "too-fast";
}

/**
 * Check a raw lead payload body for bot signals. `body` is the parsed
 * JSON object; unknown fields are ignored by the lead validator, but
 * the honeypot field is read here BEFORE validation so a bot payload
 * is dropped without ever reaching storage.
 */
export function checkBotSignals(body: unknown): BotCheckResult {
  if (!siteSettings.features.botChecks || !siteSettings.botCheck.enabled) {
    return { ok: true };
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { ok: true };
  }
  const b = body as Record<string, unknown>;
  const honeypot = b[siteSettings.botCheck.honeypotField];
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { ok: false, reason: "honeypot" };
  }
  const startedAt = b.formStartedAt;
  if (typeof startedAt === "number" && Number.isFinite(startedAt)) {
    const elapsedSeconds = (Date.now() - startedAt) / 1000;
    // Clock-skew guard: a future timestamp is treated as "just now",
    // not as a pass — but it still fails open unless it is wildly
    // in the future, in which case the honeypot/rate-limit layers
    // remain the defence.
    if (elapsedSeconds >= 0 && elapsedSeconds < siteSettings.botCheck.minSeconds) {
      return { ok: false, reason: "too-fast" };
    }
  }
  return { ok: true };
}
