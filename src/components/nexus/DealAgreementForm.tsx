"use client";

import { useState } from "react";
import {
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_TYPES,
  BUDGET_RANGE_LABELS,
  BUDGET_RANGES,
  DEAL_COUNTRIES,
  DEAL_TYPE_LABELS,
  DEAL_TYPES,
  INDIAN_STATES,
  TIMELINE_LABELS,
  TIMELINES,
  validateDealBrief,
  type AccountType,
  type DealBrief,
  type DealType,
} from "@/lib/deal-brief-validation";

// Nexus deal/agreement/exchange brief — deals, agreements and
// exchanges of value/obligations ONLY (SPEC §6A). This component is
// never used on course enquiries, service enquiries or general
// enquiries, which stay short and progressive via LeadForm.
//
// DRAFT ONLY, by design: the form validates client-side with Zod
// and produces a brief the user reviews and shares themselves. It
// makes NO network request, stores nothing, signs nothing and
// changes no payment method — /api/leads cannot hold these fields
// (its schema ignores unknown fields, so a brief sent there would
// silently lose its address and deal terms), and no /api/deal-briefs
// endpoint exists yet. The payment-method box below is a labelled
// placeholder, not a working payment change: no card, bank or UPI
// details are collected anywhere on this page.
export default function DealAgreementForm({
  defaultDealType = "service-agreement",
  idPrefix = "deal",
}: {
  defaultDealType?: DealType;
  idPrefix?: string;
}) {
  const [country, setCountry] = useState<string>("India");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brief, setBrief] = useState<DealBrief | null>(null);
  const [copied, setCopied] = useState(false);

  const field =
    "w-full rounded-xl border border-line bg-parchment px-4 py-3 text-[15px] text-heading outline-none transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/20";
  const label = "block text-sm font-semibold text-heading";
  const id = (n: string) => `${idPrefix}-${n}`;
  const err = (n: string) =>
    errors[n] ? <p className="mt-1 text-xs text-field-error">{errors[n]}</p> : null;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setCopied(false);
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      organisation: String(fd.get("organisation") ?? ""),
      accountType: String(fd.get("accountType") ?? "") as AccountType,
      dealType: String(fd.get("dealType") ?? "") as DealType,
      scope: String(fd.get("scope") ?? ""),
      deliverables: String(fd.get("deliverables") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      budgetRange: String(fd.get("budgetRange") ?? ""),
      decisionMaker: String(fd.get("decisionMaker") ?? ""),
      successCriteria: String(fd.get("successCriteria") ?? ""),
      country: String(fd.get("country") ?? ""),
      addressLine1: String(fd.get("addressLine1") ?? ""),
      addressLine2: String(fd.get("addressLine2") ?? ""),
      city: String(fd.get("city") ?? ""),
      stateRegion: String(fd.get("stateRegion") ?? ""),
      postalCode: String(fd.get("postalCode") ?? ""),
      vatGst: String(fd.get("vatGst") ?? ""),
    };
    const checked = validateDealBrief(payload);
    if (!checked.data) {
      setErrors(checked.errors);
      return;
    }
    setBrief(checked.data);
  }

  function briefText(b: DealBrief): string {
    const lines = [
      `Deal brief — ${DEAL_TYPE_LABELS[b.dealType]}`,
      `Contact: ${b.firstName} ${b.lastName} (${b.email}, ${b.phone})`,
      `Account: ${ACCOUNT_TYPE_LABELS[b.accountType]}${b.organisation ? ` — ${b.organisation}` : ""}`,
      `Billing / legal address: ${b.addressLine1}${b.addressLine2 ? `, ${b.addressLine2}` : ""}, ${b.city}, ${b.stateRegion} ${b.postalCode}, ${b.country}${b.vatGst ? ` (VAT/GST: ${b.vatGst})` : ""}`,
      `Scope: ${b.scope}`,
      `Expected deliverables: ${b.deliverables}`,
      `Timeline: ${TIMELINE_LABELS[b.timeline]}; Budget: ${BUDGET_RANGE_LABELS[b.budgetRange]} (indicative only, not a GradeSpot price)`,
      `Who signs off on scope and payment: ${b.decisionMaker}`,
      `How we will know this worked: ${b.successCriteria}`,
      "",
      "Draft brief only — not sent, not stored, not signed, and no payment method changed.",
    ];
    return lines.join("\n");
  }

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(briefText(brief));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (brief) {
    return (
      <div className="rounded-2xl border border-line border-t-[3px] border-t-brand bg-parchment p-7 shadow-[0_20px_40px_rgba(31,24,16,0.10)]">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-strong">
          Draft deal brief — review before sharing
        </p>
        <h3 className="mt-3 font-display text-[22px] font-semibold text-heading">
          {DEAL_TYPE_LABELS[brief.dealType]}
        </h3>
        <dl className="mt-5 space-y-3 text-sm leading-6 text-body">
          <div>
            <dt className="font-semibold text-heading">Authorized contact</dt>
            <dd>
              {brief.firstName} {brief.lastName} · {brief.email} · {brief.phone}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">Account</dt>
            <dd>
              {ACCOUNT_TYPE_LABELS[brief.accountType]}
              {brief.organisation ? ` — ${brief.organisation}` : ""}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">Billing / legal address</dt>
            <dd>
              {brief.addressLine1}
              {brief.addressLine2 ? `, ${brief.addressLine2}` : ""}, {brief.city},{" "}
              {brief.stateRegion} {brief.postalCode}, {brief.country}
              {brief.vatGst ? ` · VAT/GST: ${brief.vatGst}` : ""}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">Scope</dt>
            <dd>{brief.scope}</dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">Expected deliverables</dt>
            <dd>{brief.deliverables}</dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">Timeline &amp; budget</dt>
            <dd>
              {TIMELINE_LABELS[brief.timeline]} · {BUDGET_RANGE_LABELS[brief.budgetRange]}{" "}
              (indicative only — not a GradeSpot price)
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">Who signs off on scope and payment</dt>
            <dd>{brief.decisionMaker}</dd>
          </div>
          <div>
            <dt className="font-semibold text-heading">How we will know this worked</dt>
            <dd>{brief.successCriteria}</dd>
          </div>
        </dl>
        <p className="mt-5 rounded-lg bg-warning-surface p-4 text-sm leading-6 text-warning-text">
          <strong>Not sent, not stored, not signed.</strong> This brief lives only in your
          browser. No payment method has been changed and no agreement has been signed.
          Share it with GradeSpot by email at{" "}
          <a href="mailto:info@gsitssolutions.com" className="font-semibold underline">
            info@gsitssolutions.com
          </a>{" "}
          or by phone, and terms are agreed in a signed deal — never through this form
          alone.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={copyBrief} className="btn-primary">
            {copied ? "Brief copied ✓" : "Copy deal brief"}
          </button>
          <button type="button" onClick={() => setBrief(null)} className="btn-outline-navy">
            Edit brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line border-t-[3px] border-t-brand bg-parchment p-7 shadow-[0_20px_40px_rgba(31,24,16,0.10)]"
      noValidate
    >
      <p className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-signal-strong">
        Deal brief · Draft only · Nothing is signed or charged here
      </p>

      {/* 1 — The deal */}
      <h3 className="font-display text-[19px] font-semibold text-heading">1 · The deal</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("dealType")} className={label}>
            Deal / agreement type *
          </label>
          <select id={id("dealType")} name="dealType" required defaultValue={defaultDealType} className={field}>
            {DEAL_TYPES.map((t) => (
              <option key={t} value={t}>
                {DEAL_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
          {err("dealType")}
        </div>
        <div>
          <label htmlFor={id("timeline")} className={label}>
            Timeline *
          </label>
          <select id={id("timeline")} name="timeline" required defaultValue="flexible" className={field}>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {TIMELINE_LABELS[t]}
              </option>
            ))}
          </select>
          {err("timeline")}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor={id("scope")} className={label}>
          Scope / requirements summary *
        </label>
        <textarea id={id("scope")} name="scope" rows={4} required className={field} placeholder="What should this deal cover? Be specific — this becomes the draft brief." />
        {err("scope")}
      </div>
      <div className="mt-4">
        <label htmlFor={id("deliverables")} className={label}>
          Expected deliverables *
        </label>
        <textarea id={id("deliverables")} name="deliverables" rows={3} required className={field} placeholder="What should GradeSpot deliver, and what should you deliver?" />
        {err("deliverables")}
      </div>
      <div className="mt-4">
        <label htmlFor={id("budgetRange")} className={label}>
          Budget range <span className="font-normal text-body">(indicative only — not a GradeSpot price)</span>
        </label>
        <select id={id("budgetRange")} name="budgetRange" defaultValue="to-be-scoped" className={field}>
          {BUDGET_RANGES.map((b) => (
            <option key={b} value={b}>
              {BUDGET_RANGE_LABELS[b]}
            </option>
          ))}
        </select>
        {err("budgetRange")}
      </div>

      {/* 2 — Decision & success (established GradeSpot form practice) */}
      <h3 className="mt-8 font-display text-[19px] font-semibold text-heading">
        2 · Decision &amp; success
      </h3>
      <div className="mt-4">
        <label htmlFor={id("decisionMaker")} className={label}>
          Who signs off on scope and payment? *
        </label>
        <input id={id("decisionMaker")} name="decisionMaker" required className={field} placeholder="Name and role of the person who can approve this deal" />
        {err("decisionMaker")}
      </div>
      <div className="mt-4">
        <label htmlFor={id("successCriteria")} className={label}>
          How will you know this worked? *
        </label>
        <textarea id={id("successCriteria")} name="successCriteria" rows={3} required className={field} placeholder="The outcome that would make this deal a success for you" />
        {err("successCriteria")}
      </div>

      {/* 3 — Authorized contact */}
      <h3 className="mt-8 font-display text-[19px] font-semibold text-heading">
        3 · Authorized contact
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("firstName")} className={label}>
            First name *
          </label>
          <input id={id("firstName")} name="firstName" required autoComplete="given-name" className={field} placeholder="First name" />
          {err("firstName")}
        </div>
        <div>
          <label htmlFor={id("lastName")} className={label}>
            Last name *
          </label>
          <input id={id("lastName")} name="lastName" required autoComplete="family-name" className={field} placeholder="Last name" />
          {err("lastName")}
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("email")} className={label}>
            Email *
          </label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
          {err("email")}
        </div>
        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone *
          </label>
          <input id={id("phone")} name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+91 …" inputMode="tel" />
          {err("phone")}
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("accountType")} className={label}>
            Account type *
          </label>
          <select id={id("accountType")} name="accountType" required defaultValue="business" className={field}>
            {ACCOUNT_TYPES.map((t) => (
              <option key={t} value={t}>
                {ACCOUNT_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
          {err("accountType")}
        </div>
        <div>
          <label htmlFor={id("organisation")} className={label}>
            Organization <span className="font-normal text-body">(required unless Individual)</span>
          </label>
          <input id={id("organisation")} name="organisation" autoComplete="organization" className={field} placeholder="Your organization" />
          {err("organisation")}
        </div>
      </div>

      {/* 4 — Billing / legal address (billing-style pattern, deals only) */}
      <h3 className="mt-8 font-display text-[19px] font-semibold text-heading">
        4 · Billing / legal address
      </h3>
      <div className="mt-4">
        <label htmlFor={id("country")} className={label}>
          Country *
        </label>
        <select
          id={id("country")}
          name="country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={field}
        >
          {DEAL_COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {err("country")}
      </div>
      <div className="mt-4">
        <label htmlFor={id("addressLine1")} className={label}>
          Address line 1 *
        </label>
        <input id={id("addressLine1")} name="addressLine1" required autoComplete="street-address" className={field} placeholder="Street address" />
        {err("addressLine1")}
      </div>
      <div className="mt-4">
        <label htmlFor={id("addressLine2")} className={label}>
          Address line 2 <span className="font-normal text-body">(optional)</span>
        </label>
        <input id={id("addressLine2")} name="addressLine2" autoComplete="address-line2" className={field} placeholder="Apartment, suite, building (optional)" />
        {err("addressLine2")}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("city")} className={label}>
            City *
          </label>
          <input id={id("city")} name="city" required autoComplete="address-level2" className={field} placeholder="City" />
          {err("city")}
        </div>
        <div>
          {country === "India" ? (
            <>
              <label htmlFor={id("stateRegion")} className={label}>
                State *
              </label>
              <select id={id("stateRegion")} name="stateRegion" required defaultValue="Telangana" className={field}>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <label htmlFor={id("stateRegion")} className={label}>
                State / region *
              </label>
              <input id={id("stateRegion")} name="stateRegion" required autoComplete="address-level1" className={field} placeholder="State or region" />
            </>
          )}
          {err("stateRegion")}
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("postalCode")} className={label}>
            ZIP / postal code *
          </label>
          <input id={id("postalCode")} name="postalCode" required autoComplete="postal-code" className={field} placeholder={country === "India" ? "6-digit PIN code" : "ZIP / postal code"} />
          {err("postalCode")}
        </div>
        <div>
          <label htmlFor={id("vatGst")} className={label}>
            VAT / GST <span className="font-normal text-body">(optional)</span>
          </label>
          <input id={id("vatGst")} name="vatGst" className={field} placeholder="VAT or GST number (optional)" />
          {err("vatGst")}
        </div>
      </div>

      {/* Payment-method placeholder — visually distinct, submits nothing */}
      <div className="mt-8 rounded-[16px] border-2 border-dashed border-line bg-surface-light p-5">
        <h3 className="font-display text-[17px] font-semibold text-heading">
          Change payment method — not here
        </h3>
        <p className="mt-2 text-sm leading-6 text-body">
          Payment arrangements are agreed in the signed deal, not changed through this
          brief. This box changes nothing: no payment method is updated here, and no
          card, bank or UPI details are collected on this page. If a deal needs a
          payment-method change, that is a separate, explicitly confirmed step after
          the deal is signed.
        </p>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full">
        Prepare deal brief
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-body">
        This prepares a draft brief for discussion only. It is not sent, not stored,
        not signed, and nothing is charged.
      </p>
    </form>
  );
}
