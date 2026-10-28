import { staticPageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui";
import Link from "next/link";

export const metadata = staticPageMetadata({
  title: "Privacy Policy",
  description:
    "Draft privacy policy outline for GradeSpot IT Solutions — structure plus the facts the owner must confirm before publication.",
  path: "/privacy-policy",
});

// DRAFT — not a finished legal policy. Every slot below is a fact slot
// the owner must supply and verify before this page may be presented as
// a real policy. Stated facts here are limited to published contact
// details, the observed processors (Supabase for data storage, Vercel
// for web hosting), and the observed no-trackers fact (verified by code
// audit); everything else remains a slot to confirm.
const sections = [
  {
    heading: "Who we are",
    body: "This policy describes how GradeSpot IT Solutions handles personal data collected through this website. Published contact details for GradeSpot IT Solutions: info@gsitssolutions.com, +91 91826 54056, 16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060.",
    todos: [
      "CIN / registration number, if any",
      "confirm whether the published contact address is also the registered address",
    ],
  },
  {
    heading: "Data we collect",
    body: "The enquiry forms on this site ask for your name and phone number, with email, interest, message, and a WhatsApp opt-in as optional fields. The partner form additionally asks for organisation, country, and partnership type. The certificate verification page accepts a certificate code for lookup.",
    todos: [
      "confirm this is the complete list of personal data collected",
      "confirm whether server logs, form metadata, or any other data is collected",
    ],
  },
  {
    heading: "How we use your data",
    body: "Enquiry details are used to respond to the enquiry — the forms state this on the page itself.",
    todos: [
      "confirm every purpose personal data is used for",
      "confirm whether data is used for marketing, and on what consent basis",
    ],
  },
  {
    heading: "Sharing",
    body: "Enquiry data is stored using Supabase (data storage) and this website is hosted on Vercel (web hosting). No other sharing arrangement is described here until confirmed.",
    todos: [
      "confirm whether any third party beyond Supabase (data storage) and Vercel (web hosting) receives personal data",
      "confirm whether any data leaves India, and under what safeguards",
    ],
  },
  {
    heading: "International transfers",
    body: "This website is hosted in India (Mumbai) and enquiry data is stored in India (Mumbai: Supabase ap-south-1; site served from Vercel bom1, Mumbai). When a visitor from the UK or the EU sends an enquiry, their data is therefore transferred to India. No transfer safeguard is claimed here until confirmed.",
    todos: [
      "EU/UK representative decision (lawyer question)",
      "transfer safeguards (lawyer confirmation)",
    ],
  },
  {
    heading: "Cookies and trackers",
    body: "A code audit of this site found no analytics scripts, no advertising trackers, and no third-party cookies set by the site itself. Outbound links (for example WhatsApp, maps, and social profiles) are ordinary links, not embedded trackers.",
    todos: ["re-confirm before publication if any tracker is ever added"],
  },
  {
    heading: "Retention",
    body: "No retention period is stated here until confirmed.",
    todos: [
      "how long enquiry data is kept",
      "how long verification lookups are logged, if at all",
      "how data is deleted on request",
    ],
  },
  {
    heading: "Your rights",
    body: "Under the GDPR and UK GDPR, visitors from the UK and the EU have rights including access to their personal data, erasure, rectification, restriction of processing, data portability, and objection. Requests can be sent to info@gsitssolutions.com. No process or timeline is described here until confirmed.",
    todos: [
      "how a person asks for access, correction, or deletion of their data",
      "response timelines for such requests",
    ],
  },
  {
    heading: "Grievance officer",
    body: "No grievance officer is named here until confirmed.",
    todos: ["grievance officer name", "grievance officer email"],
  },
  {
    heading: "Changes to this policy",
    body: "No change process is described here until confirmed.",
    todos: ["how policy changes are announced and when they take effect"],
  },
];

const checklist = [
  "CIN (if any), and confirmation of whether the published contact address is also the registered address",
  "Complete list of personal data collected",
  "Every purpose data is used for, and every third party it is shared with",
  "Whether any data leaves India, and under what safeguards",
  "EU/UK representative decision (lawyer question)",
  "Transfer safeguards (lawyer confirmation)",
  "Retention periods and deletion process",
  "Rights-request process and timelines",
  "Grievance officer name and email",
  "Change-announcement process",
];

export default function PrivacyPolicyDraftPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="DRAFT — outline pending verified facts. This is not a finished legal policy."
      />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-6">
          <div
            data-reveal
            className="rounded-[20px] border border-line bg-surface-light p-7 md:p-9"
          >
            <h2 className="font-display text-[26px] font-semibold leading-[32px] text-heading">
              Draft — do not treat as a published policy
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-body">
              This page exists so the structure is ready. Every section marked TODO needs a
              verified fact from the owner before publication. Nothing here is legal advice,
              and no fact below was invented to fill a gap.
            </p>
          </div>

          {sections.map((s, i) => (
            <article
              key={s.heading}
              data-reveal
              className="rounded-[20px] border border-line bg-surface-light p-7 md:p-9"
            >
              <p className="font-mono text-[12px] font-semibold tracking-[0.1em] text-signal-strong">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-[26px] font-semibold leading-[32px]">{s.heading}</h2>
              <p className="mt-3 text-[15px] leading-7 text-body">{s.body}</p>
              <ul className="mt-4 space-y-2">
                {s.todos.map((t) => (
                  <li key={t} className="text-sm leading-6 text-body">Still to confirm: {t}</li>
                ))}
              </ul>
            </article>
          ))}

          <div className="rounded-[20px] border border-line bg-surface-light p-8 md:p-9">
            <h2 className="font-display text-2xl font-semibold text-heading">
              What must be supplied before publication
            </h2>
            <ul className="mt-4 space-y-2">
              {checklist.map((c) => (
                <li key={c} className="text-[15px] leading-7 text-body">
                  — {c}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3.5">
              <Link href="/contact-us" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/terms-and-conditions" className="btn-outline-navy">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
