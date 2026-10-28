"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { validateLead } from "@/lib/lead-validation";
import { newIdempotencyKey } from "@/lib/lead-contract";
import { business } from "@/data/site";
import {
  leadFormCard,
  leadFormErrorPanel,
  leadFormErrorText,
  leadFormField,
  leadFormHelper,
  leadFormHoneypot,
  leadFormLabel,
  leadFormSuccess,
  leadFormWaButton,
} from "@/components/lead-form-styles";

// Course / demo registration form (Aravind's decision, 2026-10-23;
// DECISIONS.md §20). This is LEAD registration — it posts to the same
// /api/leads pipeline as every other form (source "website:/register"
// from the path, interest naming the type + course: "Registration: X"
// or "Demo: X", matching the existing demo convention). It is NOT a
// user account: no password, no login. Accounts belong to the LMS /
// admin phase (gradespot-axon).
// Stage 7: only a RECORDED lead (201 + stored "supabase") shows the
// recorded confirmation and the WhatsApp continuation; a log-only lead
// gets 503 and honest not-confirmed copy, never a success state.
export default function RegisterForm({
  courses,
  initialCourse,
}: {
  courses: string[];
  initialCourse?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "recorded" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [recordedText, setRecordedText] = useState("");
  // Anti-spam mount timestamp (see LeadForm / lead-validation.ts):
  // the server rejects submissions faster than 3s after load.
  const [formLoadedAt] = useState(() => Date.now());

  const waNumber = business.phones[0].replace(/[^+\d]/g, "").replace(/^\+/, "");
  const waText = encodeURIComponent(
    recordedText
      ? `Hi GradeSpot, I just registered on your website (${recordedText}). Please share the details.`
      : "Hi GradeSpot, I just registered on your website. Please share the details.",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return; // double-submit guard
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
      // Anti-spam fields: honeypot (must stay empty) + mount
      // timestamp. validateLead checks both but never copies them
      // into the stored payload.
      website: String(fd.get("website") ?? ""),
      formLoadedAt,
    };
    // Same validators as /api/leads (§25.18) — this also closes the
    // old empty-course hole: an unchosen course now fails here AND
    // on the server instead of posting "Registration: ".
    const checked = validateLead(payload);
    if (!checked.data) {
      setErrors(checked.errors);
      // Anti-spam failures surface ONLY the generic message.
      if (checked.errors.form) {
        setServerMessage(checked.errors.form);
        setState("error");
      }
      return;
    }
    setState("sending");
    setServerMessage("");
    setRecordedText(interest);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": newIdempotencyKey(),
        },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      // Stage 7 honest contract: only 201 + stored "supabase" is a
      // recorded lead. A 503 log-only response is NOT a success.
      if (res.status === 201 && body && body.stored === "supabase") {
        setState("recorded");
        form.reset();
      } else {
        if (body && typeof body === "object" && "errors" in body) {
          setErrors(body.errors as Record<string, string>);
        }
        if (body && typeof body === "object" && typeof body.message === "string") {
          setServerMessage(body.message);
        } else if (body && typeof body === "object" && typeof body.error === "string") {
          setServerMessage(body.error);
        }
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  const field = leadFormField;
  const label = leadFormLabel;

  return (
    <form
      onSubmit={onSubmit}
      className={leadFormCard}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-name" className={label}>
            Full Name *
          </label>
          <input id="reg-name" name="name" required autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "reg-name-error" : undefined} className={field} placeholder="Your name" />
          {errors.name && <p id="reg-name-error" className={leadFormErrorText}>{errors.name}</p>}
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
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "reg-phone-error" : undefined}
            className={field}
            placeholder="+91 …"
            inputMode="tel"
          />
          {errors.phone && <p id="reg-phone-error" className={leadFormErrorText}>{errors.phone}</p>}
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
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "reg-email-error" : undefined}
          className={field}
          placeholder="you@example.com"
        />
        {errors.email && <p id="reg-email-error" className={leadFormErrorText}>{errors.email}</p>}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-course" className={label}>
            Course *
          </label>
          <select id="reg-course" name="course" required className={field} aria-invalid={!!(errors.course || errors.interest)} aria-describedby={(errors.course || errors.interest) ? "reg-course-error" : undefined} defaultValue={initialCourse ?? ""}>
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.course && <p id="reg-course-error" className={leadFormErrorText}>{errors.course}</p>}
          {errors.interest && <p id="reg-course-error" className={leadFormErrorText}>{errors.interest}</p>}
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
      {/* Honeypot: visually hidden, never focusable, never autofilled.
          Filled honeypots are rejected server-side with a generic
          error that never names this field. Real users never see it. */}
      <div aria-hidden="true" className={leadFormHoneypot}>
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
      <button type="submit" disabled={state === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">
        {state === "sending" ? "Registering…" : "Register"}
      </button>
      <p className={leadFormHelper}>
        Registering sends us your details so the team can confirm your seat or demo timing —
        it is an enquiry, not an online payment or a user account.
      </p>
      {state === "recorded" && (
        <div role="status" className={leadFormSuccess}>
          <p>Thank you — your registration enquiry has been received and recorded. Our team will call to confirm the details.</p>
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className={leadFormWaButton}
          >
            Continue on WhatsApp →
          </a>
        </div>
      )}
      {state === "error" && (
        <p role="alert" className={leadFormErrorPanel}>
          {serverMessage ||
            "We could not submit your registration. Please check the fields and try again, or call us directly."}
        </p>
      )}
    </form>
  );
}
