import { staticPageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui";
import Link from "next/link";

export const metadata = staticPageMetadata({
  title: "Privacy Policy",
  description:
    "Draft privacy policy outline for GradeSpot IT Solutions — structure plus the facts the owner must confirm before publication.",
  path: "/privacy-policy",
});

// DRAFT — not a finished legal policy. Every TODO below is a fact slot
// the owner must supply and verify before this page may be presented as
// a real policy. Stated facts here are limited to published contact
// details, the observed processors (Supabase for data storage, Vercel
// for web hosting), and the observed no-trackers fact (verified by code
// audit); everything else remains a TODO.
const sections = [
  {
    heading: "Who we are",
    body: "This policy describes how GradeSpot IT Solutions handles personal data collected through this website. Published contact details for GradeSpot IT Solutions: info@gsitssolutions.com, +91 91826 54056, 16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060.",
    todos: [
      "TODO: CIN / registration number, if any",
      "TODO: confirm whether the published contact address is also the registered address",
    ],
  },
  {
    heading: "Data we collect",
    body: "The enquiry forms on this site ask for your name and phone number, with email, interest, message, and a WhatsApp opt-in as optional fields. The certificate verification page accepts a certificate code for lookup.",
    todos: [
      "TODO: confirm this is the complete list of personal data collected",
      "TODO: confirm whether server logs, form metadata, or any other data is collected",
    ],
  },
  {
    heading: "How we use your data",
    body: "Enquiry details are used to respond to the enquiry — the forms state this on the page itself.",
    todos: [
      "TODO: confirm every purpose personal data is used for",
      "TODO: confirm whether data is used for marketing, and on what consent basis",
    ],
  },
  {
    heading: "Sharing",
    body: "Enquiry data is stored using Supabase (data storage) and this website is hosted on Vercel (web hosting). No other sharing arrangement is described here until confirmed.",
    todos: [
      "TODO: confirm whether any third party beyond Supabase (data storage) and Vercel (web hosting) receives personal data",
      "TODO: confirm whether any data leaves India, and under what safeguards",
    ],
  },
  {
    heading: "Cookies and trackers",
    body: "A code audit of this site found no analytics scripts, no advertising trackers, and no third-party cookies set by the site itself. Outbound links (for example WhatsApp, maps, and social profiles) are ordinary links, not embedded trackers.",
    todos: ["TODO: re-confirm before publication if any tracker is ever added"],
  },
  {
    heading: "Retention",
    body: "No retention period is stated here until confirmed.",
    todos: [
      "TODO: how long enquiry data is kept",
      "TODO: how long verification lookups are logged, if at all",
      "TODO: how data is deleted on request",
    ],
  },
  {
    heading: "Your rights",
    body: "No rights process is described here until confirmed.",
    todos: [
      "TODO: how a person asks for access, correction, or deletion of their data",
      "TODO: response timelines for such requests",
    ],
  },
  {
    heading: "Grievance officer",
    body: "No grievance officer is named here until confirmed.",
    todos: ["TODO: grievance officer name", "TODO: grievance officer email"],
  },
  {
    heading: "Changes to this policy",
    body: "No change process is described here until confirmed.",
    todos: ["TODO: how policy changes are announced and when they take effect"],
  },
];

const checklist = [
  "CIN (if any), and confirmation of whether the published contact address is also the registered address",
  "Complete list of personal data collected",
  "Every purpose data is used for, and every third party it is shared with",
  "Whether any data leaves India, and under what safeguards",
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
            className="rounded-[20px] border-2 border-dashed border-brand bg-brand-soft p-7 md:p-9"
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
