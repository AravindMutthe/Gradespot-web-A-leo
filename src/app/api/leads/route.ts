import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/data";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number")
    .max(20)
    .regex(/^[+\d][\d\s\-()]*$/, "Please enter a valid phone number"),
  interest: z.string().trim().min(2, "Tell us what you are interested in").max(200),
  message: z.string().trim().max(2000).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
  }

  const result = await createLead(parsed.data);
  return NextResponse.json({ ok: true, stored: result.stored, id: result.id ?? null }, { status: 201 });
}
