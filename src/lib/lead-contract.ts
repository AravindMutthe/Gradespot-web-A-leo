// Lead/verify status contract — Frontend 3.0 Stage 7.
//
// This module is the single source of truth for what a lead response may
// claim. The rule is simple and non-negotiable: a response may only claim
// what actually happened.
//
//   stored "supabase"  -> the lead row exists in Supabase with a stable
//                         id. Only then may the UI say "received and
//                         recorded" and only then may a WhatsApp
//                         continuation say "I just sent an enquiry".
//   stored "log"       -> the lead was only written to the server log.
//                         Nothing was durably stored, nothing will be
//                         processed, and no follow-up is queued. The
//                         response MUST be an honest failure (503), never
//                         a success, and the UI must say the enquiry could
//                         NOT be confirmed as recorded and invite a retry
//                         or a direct call. It must never promise a
//                         callback for a log-only lead.
//
// 202-vs-503 decision note (Stage 7, open for owner/Das review):
// The Nexus branch answered log-only leads with 202. Stage 7 deliberately
// takes the stricter path and does NOT use 202 here, because 202 means
// "accepted for processing" — and there is no durable queue processing
// a log-only lead (DB inbox/outbox is a leading candidate, not built;
// Axon is not built). Answering 202 for a lead nobody will ever process
// would repeat the original dishonesty in a new status code. What would
// change this: a proven durable queue (recoverable processing id +
// explicit pending state + a recovery path) — then, and only then, 202
// becomes honest for queued leads, and this module's mapping must be
// updated with that queue's contract attached.
//
// Idempotency note (honestly limited): the dedupe store below is an
// in-memory per-process map. On Vercel serverless, each instance has its
// own map, so dedupe is best-effort within one instance, NOT distributed
// dedupe. A shared store (the real fix) is a separate, later decision
// and is NOT built in this stage. Nothing in this module claims durable
// or cross-instance idempotency.

export type LeadStored = "supabase" | "log";

export type LeadOutcomeStatus = "recorded" | "not_confirmed";

export interface LeadOutcome {
  status: LeadOutcomeStatus;
  stored: LeadStored;
  /** Stable Supabase row id — present ONLY for recorded leads. */
  id: string | null;
}

export const LEAD_RECORDED_MESSAGE =
  "Your enquiry has been received and recorded. Our team will get back to you.";

export const LEAD_NOT_CONFIRMED_MESSAGE =
  "We couldn't confirm your enquiry as recorded. Please try again, or contact the team directly.";

export const LEAD_RATE_LIMITED_MESSAGE =
  "Too many enquiries from this address. Please wait a little and try again.";

/** Map a storage result to the honest HTTP status + body. */
export function leadOutcomeToResponse(result: {
  stored: LeadStored;
  id?: string | null;
}): { status: number; body: LeadOutcome & { ok: boolean; message: string } } {
  if (result.stored === "supabase") {
    return {
      status: 201,
      body: {
        ok: true,
        status: "recorded",
        stored: "supabase",
        id: result.id ?? null,
        message: LEAD_RECORDED_MESSAGE,
      },
    };
  }
  return {
    status: 503,
    body: {
      ok: false,
      status: "not_confirmed",
      stored: "log",
      id: null,
      message: LEAD_NOT_CONFIRMED_MESSAGE,
    },
  };
}

// ——— Idempotency keys ———
// A client-generated key, one per submission attempt. Accepted shape:
// 8–128 chars of [A-Za-z0-9_-] (covers crypto.randomUUID() output).
// Anything else is treated as "no key" — a malformed key must never fail
// an otherwise valid enquiry; it simply gets no dedupe.

const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9_-]{8,128}$/;

export function normalizeIdempotencyKey(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const key = value.trim();
  return IDEMPOTENCY_KEY_PATTERN.test(key) ? key : null;
}

/** Client-side key generator (safe to import into client components). */
export function newIdempotencyKey(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

// ——— Best-effort per-instance dedupe store ———
// Key -> the outcome already returned for it. Replays return the cached
// outcome WITHOUT re-inserting. Entries expire after 24h (pruned on
// access). This store lives in process memory: it is NOT shared across
// serverless instances and does NOT survive a cold start. See the header
// note: distributed dedupe needs a shared store, which is out of scope.

const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

interface CachedOutcome {
  outcome: LeadOutcome;
  at: number;
}

const idempotencyStore = new Map<string, CachedOutcome>();

export function getCachedLeadOutcome(
  key: string,
  nowMs: number = Date.now(),
): LeadOutcome | null {
  const entry = idempotencyStore.get(key);
  if (!entry) return null;
  if (nowMs - entry.at > IDEMPOTENCY_TTL_MS) {
    idempotencyStore.delete(key);
    return null;
  }
  return entry.outcome;
}

export function rememberLeadOutcome(
  key: string,
  outcome: LeadOutcome,
  nowMs: number = Date.now(),
): void {
  for (const [k, entry] of idempotencyStore) {
    if (nowMs - entry.at > IDEMPOTENCY_TTL_MS) idempotencyStore.delete(k);
  }
  idempotencyStore.set(key, { outcome, at: nowMs });
}

/** Test seam: clear the store. Not used by any route. */
export function clearLeadOutcomeCache(): void {
  idempotencyStore.clear();
}
