"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { business } from "@/data/site";

// Lead form per the researched conversion rules:
// - few fields (name, phone, email, one qualifier, optional message)
// - outcome-worded submit ("Request a Callback", never "Submit")
// - phone is a real tel input; WhatsApp opt-in checkbox (WhatsApp policy
//   requires opt-in before business-initiated messaging)
// - every lead carries its source page for attribution
// - success state confirms AND offers an instant WhatsApp continuation
export default function LeadForm({
  interest,
  idPrefix = "lead",
}: {
  interest?: string;
  idPrefix?: string;
}) {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentInterest, setSentInterest] = useState<string>(interest ?? "");

  const waNumber = business.phones[0].replace(/[^+\d]/g, "").replace(/^\+/, "");
  const waText = encodeURIComponent(
    sentInterest
      ? `Hi GradeSpot, I just sent an enquiry about ${sentInterest} on your website. Please share the details.`
      : "Hi GradeSpot, I just sent an enquiry on your website. Please share the details.",
  );

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
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
      whatsappOptIn: fd.get("whatsappOptIn") === "true",
      source: `website:${pathname ?? "/"}`,
    };
    setSentInterest(payload.interest);
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
    "w-full rounded-lg border border-neutral-300 px-4 py-3 text-[15px] text-heading outline-none transition-colors focus:border-brand";
  const label = "block text-sm font-semibold text-heading";
  const id = (n: string) => `${idPrefix}-${n}`;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#dbe4ee] bg-white p-7 shadow-[0_20px_40px_rgba(10,34,54,0.10)]"
      noValidate
    >
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
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
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
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor={id("email")} className={label}>
          Email *
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor={id("interest")} className={label}>
          I&apos;m interested in *
        </label>
        <input
          id={id("interest")}
          name="interest"
          required
          defaultValue={interest ?? ""}
          className={field}
          placeholder="Course Training, Certification Voucher, a Service…"
        />
        {errors.interest && <p className="mt-1 text-xs text-red-600">{errors.interest}</p>}
      </div>
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
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <label htmlFor={id("wa")} className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-body">
        <input
          id={id("wa")}
          name="whatsappOptIn"
          type="checkbox"
          value="true"
          className="mt-1 h-4 w-4 shrink-0 accent-[#f7631b]"
        />
        <span>Yes, send me course details and updates on WhatsApp.</span>
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Request a Callback"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-body">
        Your details are used only to respond to this enquiry — no spam, ever.
      </p>
      {state === "sent" && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
          <p>Thank you — your enquiry has been received. Our team will get back to you shortly.</p>
          <a
            href={`https://wa.me/${waNumber}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded-full bg-[#25d366] px-5 py-2.5 font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Continue on WhatsApp →
          </a>
        </div>
      )}
      {state === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          We could not submit your enquiry. Please check the fields and try again, or call us
          directly.
        </p>
      )}
    </form>
  );
}
