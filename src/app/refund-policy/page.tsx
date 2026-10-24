import { staticPageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui";
import Link from "next/link";

export const metadata = staticPageMetadata({
  title: "Refund Policy",
  description:
    "Draft refund policy outline for GradeSpot IT Solutions — structure plus the facts the owner must confirm before publication.",
  path: "/refund-policy",
});

// DRAFT — not a finished legal policy. Every TODO below is a fact slot
// the owner must supply and verify before this page may be presented as
// a real policy. No refund term, timeline, or eligibility rule is
// asserted here, because none has been supplied.
const sections = [
  {
    heading: "Scope",
    body: "This draft covers refunds for payments made to GradeSpot IT Solutions. Which payments and services it covers is not stated here until confirmed.",
    todos: [
      "TODO: which fees and services this policy covers (courses, certifications, services)",
      "TODO: whether instalment / EMI payments are covered differently",
    ],
  },
  {
    heading: "Eligibility",
    body: "No eligibility rule is stated here until confirmed.",
    todos: [
      "TODO: conditions under which a refund is available",
      "TODO: conditions under which a refund is not available",
    ],
  },
  {
    heading: "Timelines",
    body: "No timeline is stated here until confirmed.",
    todos: [
      "TODO: window within which a refund may be requested",
      "TODO: processing time once a refund is approved",
    ],
  },
  {
    heading: "How to request a refund",
    body: "No request process is described here until confirmed.",
    todos: [
      "TODO: channel for refund requests (form, email, in person)",
      "TODO: information the requester must provide",
      "TODO: contact email for refund requests",
    ],
  },
  {
    heading: "Refund mode",
    body: "No refund mode is stated here until confirmed.",
    todos: [
      "TODO: mode of refund (original payment method, bank transfer, other)",
      "TODO: whether any deductions apply, and what they are",
    ],
  },
  {
    heading: "Non-refundable cases",
    body: "No non-refundable case is listed here until confirmed.",
    todos: ["TODO: list every non-refundable case, if any"],
  },
  {
    heading: "Contact and grievance",
    body: "No contact or grievance route is named here until confirmed.",
    todos: [
      "TODO: contact email for refund questions",
      "TODO: grievance officer name and email, if different from the privacy policy",
    ],
  },
];

const checklist = [
  "Which fees and services are covered (and how instalments are treated)",
  "Eligibility rules and non-refundable cases",
  "Request window and processing time",
  "Request channel, required information, and contact email",
  "Refund mode and any deductions",
  "Grievance route",
];

export default function RefundPolicyDraftPage() {
  return (
    <>
      <PageHero
        title="Refund Policy"
        subtitle="DRAFT — outline pending verified facts. This is not a finished legal policy."
      />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-6">
          <div
            data-reveal
            className="rounded-[20px] border-2 border-dashed border-brand bg-brand-soft p-7 md:p-9"
          >
            <h2 className="font-display text-[26px] font-semibold leading-[32px] text-heading">
              Draft — do not treat as a published policy
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-body">
              This page exists so the structure is ready. Every section marked TODO needs a
              verified fact from the owner before publication. No refund term below was
              invented to fill a gap.
            </p>
          </div>

          {sections.map((s, i) => (
            <article
              key={s.heading}
              data-reveal
              className="rounded-[20px] border border-line bg-parchment p-7 shadow-[0_1px_2px_rgba(31,24,16,0.05)] md:p-9"
            >
              <p className="font-mono text-[12px] font-semibold tracking-[0.1em] text-signal-strong">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-[26px] font-semibold leading-[32px]">{s.heading}</h2>
              <p className="mt-3 text-[15px] leading-7 text-body">{s.body}</p>
              <ul className="mt-4 space-y-2">
                {s.todos.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg bg-cream px-4 py-2 font-mono text-[13px] font-semibold text-signal-strong"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="panel-ink rounded-[20px] p-8 md:p-9">
            <h2 className="font-display text-2xl font-semibold text-paper">
              What must be supplied before publication
            </h2>
            <ul className="mt-4 space-y-2">
              {checklist.map((c) => (
                <li key={c} className="text-[15px] leading-7 text-paper/80">
                  — {c}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3.5">
              <Link href="/contact-us" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/terms-and-conditions" className="btn-outline-light">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
