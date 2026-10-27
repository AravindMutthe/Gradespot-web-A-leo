"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { validateLead } from "@/lib/lead-validation";
import { business } from "@/data/site";
import BotFields from "@/components/BotFields";

// Course / demo registration form (Aravind's decision, 2026-10-23;
// DECISIONS.md §20). This is LEAD registration — it posts to the same
// /api/leads pipeline as every other form (source "website:/register"
// from the path, interest naming the type + course: "Registration: X"
// or "Demo: X", matching the existing demo convention). It is NOT a
// user account: no password, no login. Accounts belong to the LMS /
// admin phase (gradespot-axon).
export default function RegisterForm({
  courses,
  initialCourse,
}: {
  courses: string[];
  initialCourse?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "received" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentText, setSentText] = useState("");
  const [receivedNotice, setReceivedNotice] = useState<string>("");

  const waNumber = business.phones[0].replace(/[^+\d]/g, "").replace(/^\+/, "");
  const waText = encodeURIComponent(
    sentText
      ? `Hi GradeSpot, I just registered on your website (${sentText}). Please share the details.`
      : "Hi GradeSpot, I just registered on your website. Please share the details.",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending" || state === "sent" || state === "received") return; // double-submit guard
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const course = String(fd.get("course") ?? "");
    const type = String(fd.get("type") ?? "Course Registration");
    const interest = `${type === "Free Demo" ? "Demo" : "Registration"}: ${course}`;
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      interest,
      course,
      message: "",
      whatsappOptIn: fd.get("whatsappOptIn") === "true",
      source: `website:${pathname ?? "/register"}`,
      // Bot-check signals (BotFields): read by /api/leads BEFORE
      // validation/storage; validateLead ignores them on purpose.
      website: String(fd.get("website") ?? ""),
      formStartedAt: Number(fd.get("formStartedAt") ?? "") || undefined,
    };
    // Same validators as /api/leads (§25.18) — this also closes the
    // old empty-course hole: an unchosen course now fails here AND
    // on the server instead of posting "Registration: ".
    const checked = validateLead(payload);
    if (!checked.data) {
      setErrors(checked.errors);
      return;
    }
    setState("sending");
    setSentText(interest);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Saved-vs-received honesty: a 202/log response means the
        // registration was received and logged, NOT saved to the
        // database. It must never show the "sent" (in) state or the
        // WhatsApp continuation as if the registration were stored.
        const body = await res.json().catch(() => ({}));
        if (body && typeof body === "object" && body.stored === "log") {
          setReceivedNotice(
            typeof body.notice === "string" && body.notice
              ? body.notice
              : "Your registration was received but could not be saved to our database right now. It has been logged on our server for follow-up — if you do not hear back, please contact us directly.",
          );
          setState("received");
        } else {
          setState("sent");
        }
        form.reset();
      } else {
        const body = await res.json().catch(() => ({}));
        if (body && typeof body === "object" && "errors" in body) {
          setErrors(body.errors as Record<string, string>);
        }
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-parchment px-4 py-3 text-[15px] text-heading outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/20";
  const label = "block text-sm font-semibold text-heading";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[20px] border border-line border-t-[3px] border-t-brand bg-parchment p-7 shadow-[0_20px_40px_rgba(31,24,16,0.10)]"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-name" className={label}>
            Full Name *
          </label>
          <input id="reg-name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="reg-phone" className={label}>
            Phone *
          </label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={field}
            placeholder="+91 …"
            inputMode="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-field-error">{errors.phone}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="reg-email" className={label}>
          Email <span className="font-normal text-body">(optional)</span>
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          className={field}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-field-error">{errors.email}</p>}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-course" className={label}>
            Course *
          </label>
          <select id="reg-course" name="course" required className={field} defaultValue={initialCourse ?? ""}>
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.course && <p className="mt-1 text-xs text-field-error">{errors.course}</p>}
          {errors.interest && <p className="mt-1 text-xs text-field-error">{errors.interest}</p>}
        </div>
        <div>
          <label htmlFor="reg-type" className={label}>
            I want to *
          </label>
          <select id="reg-type" name="type" className={field} defaultValue="Course Registration">
            <option>Course Registration</option>
            <option>Free Demo</option>
          </select>
        </div>
      </div>
      <label htmlFor="reg-wa" className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-body">
        <input
          id="reg-wa"
          name="whatsappOptIn"
          type="checkbox"
          value="true"
          className="mt-1 h-4 w-4 shrink-0 accent-signal"
        />
        <span>
          Yes, contact me on WhatsApp about this registration. I agree to be contacted about
          GradeSpot courses and services; my details are used only to respond to this
          registration and are never sold.
        </span>
      </label>
      <BotFields />
      <button type="submit" disabled={state === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">
        {state === "sending" ? "Registering…" : "Register"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-body">
        Registering sends us your details so the team can confirm your seat or demo timing —
        it is an enquiry, not an online payment or a user account.
      </p>
      {state === "sent" && (
        <div className="mt-4 rounded-lg bg-success-surface p-4 text-sm text-success-text">
          <p>Thank you — your registration is in. Our team will call to confirm the details.</p>
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded-xl bg-wa px-5 py-2.5 font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Continue on WhatsApp →
          </a>
        </div>
      )}
      {state === "received" && (
        <div className="mt-4 rounded-lg bg-error-surface p-4 text-sm text-error-text">
          <p>
            Thank you — your registration was received, but it could not be saved to our
            database right now.
          </p>
          <p className="mt-2">{receivedNotice}</p>
        </div>
      )}
      {state === "error" && (
        <p className="mt-4 rounded-lg bg-error-surface p-4 text-sm text-error-text">
          We could not submit your registration. Please check the fields and try again, or call
          us directly.
        </p>
      )}
    </form>
  );
}
