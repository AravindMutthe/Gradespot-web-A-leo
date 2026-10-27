import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCertificate } from "@/lib/data";
import { siteSettings } from "@/data/site-settings";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const verifySchema = z.object({
  code: z.string().trim().min(3, "Enter a certificate code").max(80),
});

export async function POST(request: Request) {
  // Abuse layer — rate limit before any lookup, so certificate codes
  // cannot be enumerated at full speed from one IP. Per-instance
  // store: see lib/rate-limit.ts. Never logs the IP or the code.
  if (siteSettings.features.rateLimiting) {
    const limited = checkRateLimit(
      `verify:${clientIp(request)}`,
      siteSettings.rateLimit.verifyMax,
      siteSettings.rateLimit.verifyWindowSeconds,
    );
    if (!limited.allowed) {
      return NextResponse.json(
        { found: false, error: "Too many requests. Please wait a little and try again." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
      );
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ found: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = verifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ found: false, error: "Invalid certificate code" }, { status: 422 });
  }

  const certificate = await verifyCertificate(parsed.data.code);
  if (!certificate) {
    return NextResponse.json({ found: false });
  }
  return NextResponse.json({ found: true, certificate });
}
