import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCertificate } from "@/lib/data";

const verifySchema = z.object({
  code: z.string().trim().min(3, "Enter a certificate code").max(80),
});

export async function POST(request: Request) {
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
