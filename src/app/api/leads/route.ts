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
  return NextResponse.json({ ok: true, stored: result.stored, id: result.id ?? null }, { status: 201 });
}
