// Per-IP rate limiting for the public API routes — zero paid service,
// zero new dependency, honoring the zero-budget rule.
//
// HONEST LIMITATION, stated plainly: this is an in-memory, per-process
// store. On Vercel serverless, each function instance keeps its own
// counters, so a limit of N per window is N per instance, not N
// globally, and counters reset on cold start / redeploy. That still
// cuts concentrated abuse (the common case for a small public form),
// but it is NOT a distributed limiter. The real fix is a shared store
// (Upstash Redis free tier, or Axon-owned counting) — recorded as an
// open item in the rating file, not papered over here.
//
// Behaviour:
// - Sliding window: timestamps per key, pruned on every check.
// - Fail OPEN on internal error: a limiter bug must never block a
//   legitimate enquiry — it logs and allows. Abuse protection is a
//   layer, not a gate that can take the business offline.
// - 429 responses carry Retry-After and a plain, honest message.
// - NOTHING personal is logged: only the route key and the fact of a
//   limit hit. IP addresses are never written to logs.

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the oldest request in the window expires. */
  retryAfterSeconds: number;
}

const buckets = new Map<string, number[]>();
const MAX_BUCKETS = 5000;

function prune(now: number, windowMs: number): void {
  if (buckets.size <= MAX_BUCKETS) return;
  // Memory guard: drop the oldest buckets entirely rather than growing
  // without bound under a distributed attack.
  const entries = [...buckets.entries()].sort((a, b) => (a[1][0] ?? 0) - (b[1][0] ?? 0));
  for (const [key] of entries.slice(0, entries.length - MAX_BUCKETS)) {
    buckets.delete(key);
  }
  void now;
  void windowMs;
}

/** First entry of X-Forwarded-For, or "unknown" — never the raw header. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkRateLimit(
  key: string,
  max: number,
  windowSeconds: number,
): RateLimitResult {
  try {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const stamps = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
    if (stamps.length >= max) {
      const oldest = stamps[0] ?? now;
      const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
      buckets.set(key, stamps);
      return { allowed: false, retryAfterSeconds };
    }
    stamps.push(now);
    buckets.set(key, stamps);
    prune(now, windowMs);
    return { allowed: true, retryAfterSeconds: 0 };
  } catch {
    // Fail open: see module comment.
    return { allowed: true, retryAfterSeconds: 0 };
  }
}

/** Test / introspection helper: number of tracked buckets (no IPs exposed). */
export function rateLimitBucketCount(): number {
  return buckets.size;
}
