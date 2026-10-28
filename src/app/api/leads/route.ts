import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead-validation";
import { createLead } from "@/lib/data";
import {
  leadOutcomeToResponse,
  normalizeIdempotencyKey,
  getCachedLeadOutcome,
  rememberLeadOutcome,
  LEAD_RATE_LIMITED_MESSAGE,
} from "@/lib/lead-contract";
import { checkLeadRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

// Leads API — Stage 7 honest contract (Frontend 3.0).
//
// Validation lives in @/lib/lead-validation, the SAME module the client
// forms run before sending. The server never trusts the client: an
// invalid payload gets a 400 with per-field errors and is never stored
// or acknowledged as success. Email is optional (phone-first leads) but
// strictly format-checked whenever present; the `course` field is a
// client-side selection guard and is stripped before storage.
//
// Status honesty (the Stage 7 change): the HTTP status now reflects
// durability. Durably stored in Supabase -> 201 with a stable id and a
// "received and recorded" notice. Only logged (storage unavailable or
// failed) -> 503 with copy saying the enquiry could NOT be confirmed as
// recorded, inviting a retry or a direct call. No status here claims a
// lead is recorded, accepted for processing, or queued when it is not:
// there is no durable queue in this stage, so no queued/pending state
// is offered at all (see @/lib/lead-contract for the decision note).
// Forms must branch on `stored`/`status`, never on a bare "sent" flag.
//
// Idempotency (best-effort, per instance — see @/lib/lead-contract):
// a client-supplied Idempotency-Key (header or body field) replays the
// cached outcome without re-inserting. A malformed key is treated as no
// key, never as a failed submission.
//
// Rate limiting: per-IP sliding window, per instance (see
// @/lib/rate-limit). A limited caller gets 429, never a recorded lead.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Validation failed", errors: { form: "Invalid request body" } },
      { status: 400 },
    );
  }

  const raw = body as Record<string, unknown>;
  const idempotencyKey =
    normalizeIdempotencyKey(request.headers.get("Idempotency-Key")) ??
    normalizeIdempotencyKey(raw.idempotencyKey);

  if (idempotencyKey) {
    const cached = getCachedLeadOutcome(idempotencyKey);
    if (cached) {
      const replay = leadOutcomeToResponse(cached);
      return NextResponse.json(replay.body, { status: replay.status });
    }
  }

  const limit = checkLeadRateLimit(clientIpFromHeaders(request.headers));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: LEAD_RATE_LIMITED_MESSAGE,
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      { status: 429 },
    );
  }

  const { data, errors } = validateLead(body);
  if (!data) {
    return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
  }

  const { course: _course, ...lead } = data;
  const result = await createLead(lead);
  const response = leadOutcomeToResponse(result);
  if (idempotencyKey) {
    rememberLeadOutcome(idempotencyKey, {
      status: response.body.status,
      stored: response.body.stored,
      id: response.body.id,
    });
  }
  return NextResponse.json(response.body, { status: response.status });
}
