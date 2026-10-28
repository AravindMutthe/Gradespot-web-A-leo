// Per-IP sliding-window rate limiting for the leads API — Frontend 3.0
// Stage 7.
//
// HONESTY NOTE: this limiter is NEW on the v3 branch (the Nexus branch
// had one; the v3 branch did not — there was no rate limiting on
// /api/leads at Stage 7 inspection time). It is written fresh here, not
// ported, and it is deliberately per-instance: the store is an in-memory
// map, so on Vercel serverless each instance enforces its own window.
// That is abuse friction, NOT distributed protection. The real fix — a
// shared store (the same open item as distributed idempotency) — is a
// separate, later decision and is NOT built in this stage. Nothing in
// this module claims cross-instance enforcement.
//
// Default: 20 submissions per IP per 60 seconds. Generous for humans
// (including retries after an honest 503), tight enough to blunt a
// naive submit loop. A limited caller gets 429 with a retry-after hint
// and honest copy; a 429 is never presented as a recorded lead.

export interface RateLimitDecision {
  allowed: boolean;
  /** Seconds to wait before retrying — present only when blocked. */
  retryAfterSeconds?: number;
}

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function checkRateLimit(
    ip: string,
    nowMs: number = Date.now(),
  ): RateLimitDecision {
    const cutoff = nowMs - windowMs;
    const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
    if (recent.length >= limit) {
      const oldest = recent[0];
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((oldest + windowMs - nowMs) / 1000),
      );
      hits.set(ip, recent);
      return { allowed: false, retryAfterSeconds };
    }
    recent.push(nowMs);
    hits.set(ip, recent);
    return { allowed: true };
  };
}

/** Route default: 20 requests / 60s per IP, per instance. */
export const checkLeadRateLimit = createRateLimiter(20, 60_000);

/** Best-effort client IP: first entry of X-Forwarded-For, else X-Real-IP. */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip");
  if (real?.trim()) return real.trim();
  return "unknown";
}
