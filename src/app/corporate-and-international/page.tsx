import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, SectionTitle } from "@/components/ui";
import DealAgreementForm from "@/components/nexus/DealAgreementForm";
import Link from "next/link";

// Corporate & International (international build, 2026-10-25) — stands
// ONLY on published facts: GradeSpot runs corporate trainings in
// Hyderabad, teaches cybersecurity and networking, delivers in English,
// and already serves learners from the US, UK, France and Germany.
// No client names, counts, or outcomes are claimed — none exist in the
// record. The capability statement and case studies are marked TODO
// until real material exists; there is deliberately NO download link
// to a file that does not exist yet.
export const metadata = staticPageMetadata({
  title: "Corporate & International",
  description:
    "Corporate trainings and international partnerships from GradeSpot IT Solutions, Hyderabad — cybersecurity and networking training delivered in English, for companies, colleges and training partners.",
  path: "/corporate-and-international",
});

const offerings = [
  "Online & offline batches",
  "Hands-on labs",
  "Certification preparation",
  "Career guidance and placement assistance",
];

const partnershipTypes = [
  { t: "Training", d: "GradeSpot delivers training for your learners or staff." },
  { t: "University MoU", d: "A formal collaboration with a college or university." },
  { t: "Reseller", d: "Offer GradeSpot trainings through your own channel." },
  { t: "White-label", d: "Trainings delivered under your brand." },
];

export default function CorporateAndInternationalPage() {
  return (
    <>
      <PageHero
        title="Corporate & International"
        subtitle="Cybersecurity and networking training from Hyderabad — for companies, colleges and training partners, delivered in English."
      />

      {/* For companies */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle
            label="For Companies"
            title="Corporate trainings"
            center
          />
          <p className="mx-auto mt-4 max-w-3xl text-center text-[15px] leading-7 text-body">
            Professional IT training programs for corporates and students across hardware,
            networking, cybersecurity, cloud computing, digital marketing and more.
          </p>
          <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {offerings.map((o) => (
              <li
                key={o}
                className="rounded-[16px] border border-line bg-parchment px-5 py-4 text-[15px] font-semibold text-heading"
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* For international partners */}
      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle
            label="For International Partners"
            title="Training across borders, in English"
            center
          />
          <p className="mx-auto mt-4 max-w-3xl text-center text-[15px] leading-7 text-body">
            GradeSpot already serves learners from the US, UK, France and Germany. Training
            is delivered in English. If you are an overseas college or training firm, the
            partnership conversation starts on the partner page.
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipTypes.map((p) => (
              <article
                key={p.t}
                className="rounded-[18px] border border-line bg-parchment p-6"
              >
                <h3 className="font-display text-[20px] font-semibold text-heading">{p.t}</h3>
                <p className="mt-2 text-sm leading-6 text-body">{p.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/partner-with-us" className="btn-primary">
              Start a Partnership Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise deal brief — a genuine deal flow, not an enquiry.
          Draft only: nothing here is signed, charged or sent. The
          billing-style pattern (SPEC §6A) belongs on deal/agreement/
          exchange flows like this one, never on enquiry forms. */}
      <section id="deal-brief" className="section-pad scroll-mt-32">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="Enterprise Deal Brief"
              title="Ready to talk terms, not just enquire?"
            />
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-body">
              If you are past the enquiry stage and want to draft the terms of a
              corporate training deal or service agreement, use this brief. It
              covers scope, deliverables, timeline, who signs off on scope and
              payment, and how success will be judged — plus the billing and
              legal address a signed deal would need.
            </p>
            <p className="mt-5 max-w-xl rounded-[14px] border border-line bg-cream px-5 py-4 text-sm leading-6 text-body">
              <strong className="text-heading">Draft only:</strong> this form
              prepares a brief for discussion. It is not sent, not stored, not
              signed, and no payment is taken or changed here. No GradeSpot
              prices appear in it — pricing is scoped per engagement.
            </p>
          </div>
          <div>
            <DealAgreementForm idPrefix="corporate-deal" defaultDealType="enterprise-training" />
          </div>
        </div>
      </section>

      {/* Capability statement — on request, no fake download */}
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl">
          <SectionTitle label="Capability Statement" title="Available on request" center />
          <p className="mx-auto mt-4 max-w-3xl text-center text-[15px] leading-7 text-body">
            A downloadable capability statement is being prepared. Until it is published,
            request it by email and the team will send it directly.
          </p>
          <p className="mt-6 text-center">
            <a
              href="mailto:info@gsitssolutions.com"
              className="text-[15px] font-bold text-signal hover:text-signal-strong"
            >
              info@gsitssolutions.com
            </a>
          </p>
        </div>
      </section>

      {/* Case studies: none published. No client, outcome, or result is
          claimed here until real material exists and the client has
          agreed to be named. */}
      <section className="bg-surface-light section-pad">
        <div className="wrap mx-auto max-w-4xl">
          <div className="rounded-[20px] border border-line bg-parchment p-7 md:p-9">
            <h2 className="font-display text-[26px] font-semibold leading-[32px] text-heading">
              Case studies
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-body">
              No case study is published here yet. When a client engagement is
              complete and the client has agreed to be named, its story will
              appear here. Until then, ask us about recent work on consultation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
