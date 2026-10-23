"use client";

import { useState } from "react";

export default function LeadForm({ interest }: { interest?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("sent");
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
    "w-full rounded border border-neutral-300 px-4 py-3 text-[15px] text-heading outline-none focus:border-brand";
  const label = "block text-sm font-semibold text-heading";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#dbe4ee] bg-white p-7 shadow-[0_20px_40px_rgba(10,34,54,0.10)]"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className={label}>
            Full Name *
          </label>
          <input id="lead-name" name="name" required className={field} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="lead-phone" className={label}>
            Phone *
          </label>
          <input
            id="lead-phone"
            name="phone"
            required
            className={field}
            placeholder="+91 …"
            inputMode="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="lead-email" className={label}>
          Email *
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          required
          className={field}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="lead-interest" className={label}>
          I&apos;m interested in *
        </label>
        <input
          id="lead-interest"
          name="interest"
          required
          defaultValue={interest ?? ""}
          className={field}
          placeholder="Course Training, Certification Voucher, a Service…"
        />
        {errors.interest && <p className="mt-1 text-xs text-red-600">{errors.interest}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="lead-message" className={label}>
          Message
        </label>
        <textarea id="lead-message" name="message" rows={4} className={field} placeholder="Anything we should know?" />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <button type="submit" disabled={state === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">
        {state === "sending" ? "Submitting…" : "Submit Query"}
      </button>
      {state === "sent" && (
        <p className="mt-4 rounded bg-green-50 p-4 text-sm text-green-800">
          Thank you — your enquiry has been received. Our team will get back to you shortly.
        </p>
      )}
      {state === "error" && (
        <p className="mt-4 rounded bg-red-50 p-4 text-sm text-red-700">
          We could not submit your enquiry. Please check the fields and try again, or call us
          directly.
        </p>
      )}
    </form>
  );
}
