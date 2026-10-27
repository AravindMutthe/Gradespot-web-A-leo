import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead-validation";
import { createLead } from "@/lib/data";
import { siteSettings } from "@/data/site-settings";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { checkBotSignals } from "@/lib/bot-check";

// Leads API — validation lives in @/lib/lead-validation, the SAME
// module the client forms run before sending (v1 hardening §25.18).
// The server never trusts the client: an invalid payload gets a 400
// with per-field errors and is never stored or acknowledged as success.
// Email is optional (phone-first leads) but strictly format-checked
// whenever present; the `course` field is a client-side selection guard
// and is stripped before storage.
//
// Saved-vs-received contract (lead-endpoint honesty fix):
// - stored === "supabase" → 201, { ok: true, stored: "supabase", id }.
//   The lead IS in the database.
// - stored === "log" → 202, { ok: true, stored: "log", id: null, notice }.
//   The lead was RECEIVED and logged on the server for follow-up, but
//   was NOT saved to the database (Supabase unavailable / service key
//   absent). 202 is deliberately NOT 201: 201 would claim a database
//   record that does not exist. The log fallback is kept so an enquiry
//   is never silently dropped, but it must never be presented as saved.
//   Clients must check `stored` on every ok response and show the
//   distinct "received" state for the log path, never the "sent" state.
export async function POST(request: Request) {
  // Abuse layer 1 — rate limit, before any body work (config seam:
  // siteSettings.rateLimit, env-overridable for the numbers only).
  // Per-instance in-memory store: see lib/rate-limit.ts for the honest
  // limitation. Never logs the IP or the payload.
  if (siteSettings.features.rateLimiting) {
    const limited = checkRateLimit(
      `leads:${clientIp(request)}`,
      siteSettings.rateLimit.leadsMax,
      siteSettings.rateLimit.leadsWindowSeconds,
    );
    if (!limited.allowed) {
      console.error("[leads] Rate limit hit");
      return NextResponse.json(
        { error: "Too many requests. Please wait a little and try again." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
      );
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Validation failed", errors: { form: "Invalid request body" } }, { status: 400 });
  }

  // Abuse layer 2 — honeypot + timing (lib/bot-check.ts). Tripped
  // payloads are dropped here, before validation and storage, with a
  // generic message that does not name the check or keep the payload.
  const bot = checkBotSignals(body);
  if (!bot.ok) {
    console.error("[leads] Bot check tripped:", bot.reason ?? "unknown");
    return NextResponse.json(
      { error: "Validation failed", errors: { form: "Please check the fields and try again." } },
      { status: 400 },
    );
  }

  const { data, errors } = validateLead(body);
  if (!data) {
    return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
  }

  const { course: _course, ...lead } = data;
  const result = await createLead(lead);
  if (result.stored === "log") {
    return NextResponse.json(
      {
        ok: true,
        stored: "log",
        id: null,
        notice:
          "Your enquiry was received but could not be saved to our database right now. It has been logged on our server for follow-up — if you do not hear back, please contact us directly.",
      },
      { status: 202 },
    );
  }
  return NextResponse.json({ ok: true, stored: "supabase", id: result.id ?? null }, { status: 201 });
}
