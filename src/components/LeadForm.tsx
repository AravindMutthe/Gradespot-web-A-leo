"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { validateLead } from "@/lib/lead-validation";
import { newIdempotencyKey } from "@/lib/lead-contract";
import { business } from "@/data/site";

// Lead form per the researched conversion rules:
// - few fields (name, phone, email, one qualifier, optional message)
// - outcome-worded submit ("Request a Callback", never "Submit")
// - phone is a real tel input; WhatsApp opt-in checkbox (WhatsApp policy
//   requires opt-in before business-initiated messaging)
// - every lead carries its source page for attribution
// - Stage 7: only a RECORDED lead (201 + stored "supabase") shows the
//   recorded confirmation and the WhatsApp continuation; a log-only lead
//   gets 503 and honest not-confirmed copy, never a success state
export default function LeadForm({
  interest,
  idPrefix = "lead",
  interestOptions,
  hideMessage = false,
  submitLabel = "Request a Callback",
  showCountry = false,
  showPartnership = false,
  purposeNote,
}: {
  interest?: string;
  idPrefix?: string;
  // When set, the interest field becomes a product select (used by the
  // For Institutes demo form) instead of a free-text input.
  interestOptions?: string[];
  hideMessage?: boolean;
  submitLabel?: string;
  // Partner With Us form: an Organisation field plus a partnership-type
  // select that REPLACES the interest qualifier. The lead's interest
  // value is derived from the type ("Partnership: <type>") because the
  // leads table requires an interest value on every row.
  showPartnership?: boolean;
  // Optional, never required: a free-text country field (used by the
  // Partner With Us form). validateLead accepts it (max 100 chars) and
  // createLead includes it in the insert, but it persists ONLY once the
  // leads.country column exists — that DB migration is still pending.
  showCountry?: boolean;
  // Optional pre-submission purpose note, rendered above the fields.
  // Used ONLY by course detail pages (curriculum-gating policy: the
  // full syllabus is sent by the team after enquiry). Undefined
  // everywhere else, so every other form renders exactly as before.
  // This note changes no submission semantics, status mapping, or
  // success/error copy.
  purposeNote?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "recorded" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const [recordedInterest, setRecordedInterest] = useState<string>(interest ?? "");

  const waNumber = business.phones[0].replace(/[^+\d]/g, "").replace(/^\+/, "");
  const waText = encodeURIComponent(
    recordedInterest
      ? `Hi GradeSpot, I just sent an enquiry about ${recordedInterest} on your website. Please share the details.`
      : "Hi GradeSpot, I just sent an enquiry on your website. Please share the details.",
  );

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
      // Partner form: no interest input is rendered; the interest value
      // is derived from the partnership type (see the showPartnership
      // prop note). Other forms send interest as entered.
      interest: showPartnership
        ? `Partnership: ${String(fd.get("partnershipType") ?? "")}`
        : String(fd.get("interest") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      partnershipType: String(fd.get("partnershipType") ?? ""),
      message: String(fd.get("message") ?? ""),
      whatsappOptIn: fd.get("whatsappOptIn") === "true",
      source: `website:${pathname ?? "/"}`,
      // Optional country (partner form only). validateLead accepts it
      // (max 100 chars); it persists only once the leads.country column
      // exists — see the showCountry note.
      country: String(fd.get("country") ?? ""),
    };
    // Client runs the SAME validators as /api/leads (§25.18) — bad
    // input is caught here with inline per-field errors and never sent.
    const checked = validateLead(payload);
    if (!checked.data) {
      setErrors(checked.errors);
      return;
    }
    setState("sending");
    setServerMessage("");
    setRecordedInterest(payload.interest);
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
      // recorded lead. Anything else — including 503 log-only — is NOT
      // a success, even though the form data was well-formed.
      if (res.status === 201 && body && body.stored === "supabase") {
        setState("recorded");
        form.reset();
      } else {
        if (body && typeof body === "object" && "errors" in body) {
          setErrors(body.errors as Record<string, string>);
        }
        if (body && typeof body === "object" && typeof body.error === "string") {
          setServerMessage(body.error);
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
  const id = (n: string) => `${idPrefix}-${n}`;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line border-t-[3px] border-t-brand bg-parchment p-7 shadow-[0_20px_40px_rgba(31,24,16,0.10)]"
      noValidate
    >
      <p className="mb-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-strong">
        <span>Phone-first</span>
        <span aria-hidden>·</span>
        <span>Email optional</span>
        <span aria-hidden>·</span>
        <span>No spam, ever</span>
      </p>
      {purposeNote && (
        <p className="mb-5 text-sm leading-6 text-body">{purposeNote}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={label}>
            Full Name *
          </label>
          <input
            id={id("name")}
            name="name"
            required
            autoComplete="name"
            className={field}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-field-error">{errors.name}</p>}
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
            className={field}
            placeholder="+91 …"
            inputMode="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-field-error">{errors.phone}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor={id("email")} className={label}>
          Email <span className="font-normal text-body">(optional)</span>
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          className={field}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-field-error">{errors.email}</p>}
      </div>
      {showPartnership && (
        <div className="mt-4">
          <label htmlFor={id("organisation")} className={label}>
            Organisation *
          </label>
          <input
            id={id("organisation")}
            name="organisation"
            required
            autoComplete="organization"
            className={field}
            placeholder="Your organisation"
          />
          {errors.organisation && <p className="mt-1 text-xs text-field-error">{errors.organisation}</p>}
        </div>
      )}
      <div className="mt-4">
        {showPartnership ? (
          <>
            <label htmlFor={id("partnershipType")} className={label}>
              Partnership type *
            </label>
            <select
              id={id("partnershipType")}
              name="partnershipType"
              required
              defaultValue="training"
              className={field}
            >
              {["training", "university MoU", "reseller", "white-label"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {errors.partnershipType && (
              <p className="mt-1 text-xs text-field-error">{errors.partnershipType}</p>
            )}
          </>
        ) : (
          <>
            <label htmlFor={id("interest")} className={label}>
              I&apos;m interested in *
            </label>
            {interestOptions ? (
              <select
                id={id("interest")}
                name="interest"
                required
                defaultValue={interestOptions[0]}
                className={field}
              >
                {interestOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id("interest")}
                name="interest"
                required
                defaultValue={interest ?? ""}
                className={field}
                placeholder="Course Training, Certification Voucher, a Service…"
              />
            )}
            {errors.interest && <p className="mt-1 text-xs text-field-error">{errors.interest}</p>}
          </>
        )}
      </div>
      {showCountry && (
        <div className="mt-4">
          <label htmlFor={id("country")} className={label}>
            Country <span className="font-normal text-body">(optional)</span>
          </label>
          <input
            id={id("country")}
            name="country"
            autoComplete="country-name"
            className={field}
            placeholder="Your country"
          />
        </div>
      )}
      {!hideMessage && (
        <div className="mt-4">
          <label htmlFor={id("message")} className={label}>
            Message
          </label>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            className={field}
            placeholder="Anything we should know?"
          />
          {errors.message && <p className="mt-1 text-xs text-field-error">{errors.message}</p>}
        </div>
      )}
      <label htmlFor={id("wa")} className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-body">
        <input
          id={id("wa")}
          name="whatsappOptIn"
          type="checkbox"
          value="true"
          className="mt-1 h-4 w-4 shrink-0 accent-signal"
        />
        <span>Yes, send me course details and updates on WhatsApp.</span>
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-body">
        Your details are used only to respond to this enquiry — no spam, ever.
      </p>
      {state === "recorded" && (
        <div className="mt-4 rounded-lg bg-success-surface p-4 text-sm text-success-text">
          <p>Thank you — your enquiry has been received and recorded. Our team will get back to you shortly.</p>
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
      {state === "error" && (
        <p className="mt-4 rounded-lg bg-error-surface p-4 text-sm text-error-text">
          {serverMessage ||
            "We could not submit your enquiry. Please check the fields and try again, or call us directly."}
        </p>
      )}
    </form>
  );
}
