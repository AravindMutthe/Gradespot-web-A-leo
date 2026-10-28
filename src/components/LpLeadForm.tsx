"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { validateLead } from "@/lib/lead-validation";
import { newIdempotencyKey } from "@/lib/lead-contract";
import { waLink } from "@/lib/wa";
import {
  leadFormCard,
  leadFormErrorPanel,
  leadFormErrorText,
  leadFormField,
  leadFormHelper,
  leadFormHoneypot,
  leadFormLabel,
  leadFormWaButton,
} from "@/components/lead-form-styles";

// Landing-page lead form (size the form to the offer —
// a free counselling call asks for name, phone and ONE qualifying
// question). The qualifying answer rides in the message field; the
// course is the fixed interest; source attribution is automatic from
// the path, exactly like the main LeadForm. Email is optional here
// (the API accepts it empty for LP leads) — phone is the lead.
// Stage 7 (LP rebuild): only a RECORDED lead (201 + stored
// "supabase") shows the recorded confirmation with a WhatsApp
// continuation. A log-only lead gets 503 and the API's honest
// not-confirmed copy — note the 503 body carries `message`, not
// `error`, so this form reads BOTH fields; reading only `error`
// would have shown a generic fallback instead of the honest
// not-confirmed copy. Invalid -> 400 errors
// inline; too many -> 429 message. No bare success state, no
// timing promise (not even for recorded leads), no seat/batch promise.
export default function LpLeadForm({
  courseTitle,
  idPrefix = "lp",
}: {
  courseTitle: string;
  idPrefix?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "recorded" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  // Anti-spam mount timestamp (see LeadForm / lead-validation.ts):
  // the server rejects submissions faster than 3s after load.
  const [formLoadedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return; // double-submit guard
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      interest: courseTitle,
      message: `Wants to start: ${String(fd.get("start") ?? "Immediately")}`,
      whatsappOptIn: fd.get("whatsappOptIn") === "true",
      source: `website:${pathname ?? "/"}`,
      // Anti-spam fields: honeypot (must stay empty) + mount
      // timestamp. validateLead checks both but never copies them
      // into the stored payload.
      website: String(fd.get("website") ?? ""),
      formLoadedAt,
    };
    // Same validators as /api/leads (§25.18) — caught here, never sent.
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
      // The 503 body carries `message` (LEAD_NOT_CONFIRMED_MESSAGE),
      // not `error` — read message first so the honest copy
      // surfaces instead of a generic fallback.
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
  const id = (n: string) => `${idPrefix}-${n}`;

  if (state === "recorded") {
    return (
      <div role="status" className={leadFormCard}>
        <h3 className="font-display text-xl font-bold text-heading">Thank you!</h3>
        <p className="mt-2 text-sm leading-6 text-body">
          Your enquiry has been received and recorded. Our team will get back to you.
        </p>
        <a
          href={waLink(
            `Hi GradeSpot, I just sent an enquiry about ${courseTitle} on your website. Please share the details.`,
          )}
          target="_blank"
          rel="noreferrer"
          className={leadFormWaButton}
        >
          Continue on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={leadFormCard}
      noValidate
    >
      <h3 className="font-display text-xl font-bold text-heading">Get My Free Counselling Call</h3>
      <p className="mt-1 text-sm text-body">3 required fields — name, phone, and when you can start. Email is optional.</p>
      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor={id("name")} className={label}>
            Full Name *
          </label>
          <input
            id={id("name")}
            name="name"
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-error") : undefined}
            className={field}
            placeholder="Your name"
          />
          {errors.name && <p id={id("name-error")} className={leadFormErrorText}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone *
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id("phone-error") : undefined}
            className={field}
            placeholder="+91 …"
            inputMode="tel"
          />
          {errors.phone && <p id={id("phone-error")} className={leadFormErrorText}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor={id("start")} className={label}>
            When can you start?
          </label>
          <select id={id("start")} name="start" className={field} defaultValue="Immediately">
            <option>Immediately</option>
            <option>Within a month</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div>
          <label htmlFor={id("email")} className={label}>
            Email <span className="font-normal text-body">(optional)</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("email-error") : undefined}
            className={field}
            placeholder="you@example.com"
          />
          {errors.email && <p id={id("email-error")} className={leadFormErrorText}>{errors.email}</p>}
        </div>
      </div>
      <label
        htmlFor={id("wa")}
        className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-body"
      >
        <input
          id={id("wa")}
          name="whatsappOptIn"
          type="checkbox"
          value="true"
          className="mt-1 h-4 w-4 shrink-0 accent-signal"
        />
        <span>Yes, send me course details and updates on WhatsApp.</span>
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
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Get My Free Counselling Call"}
      </button>
      <p className={leadFormHelper}>
        No spam — one counsellor call. Your details are used only to respond to this enquiry.
      </p>
      {state === "error" && (
        <p role="alert" className={leadFormErrorPanel}>
          {serverMessage ||
            "We could not submit your request. Please check the fields and try again, or call us directly."}
        </p>
      )}
    </form>
  );
}
