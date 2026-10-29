"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MIN_SUBMIT_MS, validateLead } from "@/lib/lead-validation";
import { newIdempotencyKey } from "@/lib/lead-contract";
import { business } from "@/data/site";
import {
  leadFormCard,
  leadFormConfirm,
  leadFormEyebrow,
  leadFormErrorPanel,
  leadFormErrorText,
  leadFormField,
  leadFormHelper,
  leadFormHoneypot,
  leadFormLabel,
  leadFormSuccess,
  leadFormWaButton,
} from "@/components/lead-form-styles";

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
  // Anti-spam: stamped once at mount, sent with the payload. A
  // submission faster than 3s after load is a soft signal (see
  // lead-validation.ts): the form asks for confirmation instead of
  // rejecting (Das recommendation). Never reset on success:
  // a second submission from the same mount is always older than 3s.
  const [formLoadedAt] = useState(() => Date.now());
  // Fast-submit confirm step (Das recommendation): when a
  // human submits faster than MIN_SUBMIT_MS, show the
  // confirm panel instead of rejecting; the preserved form
  // data is resubmitted with confirmedFastSubmit: true.
  const [needsConfirm, setNeedsConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
    void submitForm(e.currentTarget, false);
  }

  // Shared submit path for the first submit AND the fast-submit
  // confirm click. `confirmed` is true only when the human pressed
  // the confirm button; it skips the timing check in validateLead
  // (the honeypot still applies) and is never stored.
  async function submitForm(form: HTMLFormElement, confirmed: boolean) {
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
      // Anti-spam fields: the honeypot (must stay empty) and the mount
      // timestamp. validateLead checks both but never copies them into
      // the stored payload, so neither can ever reach storage.
      website: String(fd.get("website") ?? ""),
      formLoadedAt,
      // Confirmation flag for the fast-submit confirm step:
      // true only after the human pressed confirm. validateLead
      // reads it but never stores it.
      confirmedFastSubmit: confirmed,
    };
    // Fast-submit confirm gate (Das recommendation): a human who
    // submits faster than MIN_SUBMIT_MS after load is NOT rejected
    // and loses nothing — the form keeps their data and asks for
    // confirmation instead. A filled honeypot never reaches this
    // gate: it fails validation below with the generic message.
    if (
      !confirmed &&
      Date.now() - formLoadedAt < MIN_SUBMIT_MS &&
      String(fd.get("website") ?? "").trim() === ""
    ) {
      setNeedsConfirm(true);
      return;
    }
    setNeedsConfirm(false);
    // Client runs the SAME validators as /api/leads (§25.18) — bad
    // input is caught here with inline per-field errors and never sent.
    const checked = validateLead(payload);
    if (!checked.data) {
      setErrors(checked.errors);
      // Anti-spam failures surface ONLY the generic message — never a
      // hint about which check tripped.
      if (checked.errors.form) {
        setServerMessage(checked.errors.form);
        setState("error");
      }
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
        // 503-ready (known follow-up, fixed here): the 503 log-only
        // body carries `message`, not `error` — read message first so
        // the honest not-confirmed copy surfaces, exactly like
        // LpLeadForm already does.
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

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
      className={leadFormCard}
      noValidate
    >
      <p className={leadFormEyebrow}>
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
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? id("email-error") : undefined}
          className={field}
          placeholder="you@example.com"
        />
        {errors.email && <p id={id("email-error")} className={leadFormErrorText}>{errors.email}</p>}
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
            aria-invalid={!!errors.organisation}
            aria-describedby={errors.organisation ? id("organisation-error") : undefined}
            className={field}
            placeholder="Your organisation"
          />
          {errors.organisation && <p id={id("organisation-error")} className={leadFormErrorText}>{errors.organisation}</p>}
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
              aria-invalid={!!errors.partnershipType}
              aria-describedby={errors.partnershipType ? id("partnershipType-error") : undefined}
              className={field}
            >
              {["training", "university MoU", "reseller", "white-label"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {errors.partnershipType && (
              <p id={id("partnershipType-error")} className={leadFormErrorText}>{errors.partnershipType}</p>
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
                aria-invalid={!!errors.interest}
                aria-describedby={errors.interest ? id("interest-error") : undefined}
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
                aria-invalid={!!errors.interest}
                aria-describedby={errors.interest ? id("interest-error") : undefined}
                className={field}
                placeholder="Course Training, Certification Voucher, a Service…"
              />
            )}
            {errors.interest && <p id={id("interest-error")} className={leadFormErrorText}>{errors.interest}</p>}
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
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? id("message-error") : undefined}
            className={field}
            placeholder="Anything we should know?"
          />
          {errors.message && <p id={id("message-error")} className={leadFormErrorText}>{errors.message}</p>}
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
      {/* Honeypot: visually hidden, never focusable, never autofilled.
          Bots that fill it are rejected server-side with a generic
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
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
      {needsConfirm && (
        <div role="status" className={leadFormConfirm}>
          <p>You submitted very quickly — please confirm to send this enquiry.</p>
          <button
            type="button"
            ref={(el) => {
              if (el) el.focus();
            }}
            onClick={() => {
              setNeedsConfirm(false);
              if (formRef.current) void submitForm(formRef.current, true);
            }}
            className="btn-primary mt-3 w-full"
          >
            Yes, send my enquiry
          </button>
        </div>
      )}
      <p className={leadFormHelper}>
        Your details are used only to respond to this enquiry — no spam, ever.
      </p>
      {state === "recorded" && (
        <div role="status" className={leadFormSuccess}>
          <p>Thank you — your enquiry has been received and recorded. Our team will get back to you shortly.</p>
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
            "We could not submit your enquiry. Please check the fields and try again, or call us directly."}
        </p>
      )}
    </form>
  );
}
