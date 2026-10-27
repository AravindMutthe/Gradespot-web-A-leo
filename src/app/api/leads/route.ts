import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead-validation";
import { createLead } from "@/lib/data";

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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Validation failed", errors: { form: "Invalid request body" } }, { status: 400 });
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
