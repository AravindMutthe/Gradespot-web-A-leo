"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

// Landing-page lead form (ppc report §1.4: size the form to the offer —
// a free counselling call asks for name, phone and ONE qualifying
// question). The qualifying answer rides in the message field; the
// course is the fixed interest; source attribution is automatic from
// the path, exactly like the main LeadForm. Email is optional here
// (the API accepts it empty for LP leads) — phone is the lead.
export default function LpLeadForm({
  courseTitle,
  idPrefix = "lp",
}: {
  courseTitle: string;
  idPrefix?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
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
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    "w-full rounded-xl border border-line bg-parchment px-4 py-3 text-[15px] text-heading outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/20";
  const label = "block text-sm font-semibold text-heading";
  const id = (n: string) => `${idPrefix}-${n}`;

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-line border-t-[3px] border-t-brand bg-parchment p-7 shadow-[0_20px_40px_rgba(31,24,16,0.10)]">
        <h3 className="font-display text-xl font-bold text-heading">Thank you!</h3>
        <p className="mt-2 text-sm leading-6 text-body">
          Your free counselling call request for {courseTitle} is in. Our counsellor will call
          you shortly — keep your phone nearby.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line border-t-[3px] border-t-brand bg-parchment p-7 shadow-[0_20px_40px_rgba(31,24,16,0.10)]"
      noValidate
    >
      <h3 className="font-display text-xl font-bold text-heading">Get My Free Counselling Call</h3>
      <p className="mt-1 text-sm text-body">3 fields. A counsellor calls you back.</p>
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
            className={field}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-field-error">{errors.email}</p>}
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
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Get My Free Counselling Call"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-body">
        No spam — one counsellor call. Your details are used only to respond to this enquiry.
      </p>
      {state === "error" && (
        <p className="mt-4 rounded-lg bg-error-surface p-4 text-sm text-error-text">
          We could not submit your request. Please check the fields and try again, or call us
          directly.
        </p>
      )}
    </form>
  );
}
