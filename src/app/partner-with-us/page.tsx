import { staticPageMetadata } from "@/lib/metadata";
import { PageHero, SectionTitle } from "@/components/ui";
import LeadForm from "@/components/LeadForm";
import DealAgreementForm from "@/components/nexus/DealAgreementForm";

// Partner With Us (DECISIONS.md §21) — Aravind's decision,
// 2026-10-23: the site openly welcomes collaborations and franchise
// discussions. LEGAL LINE, kept on the page itself: this is an
// invitation to discuss, NOT a franchise offer. No investment
// figures, no ROI/earnings claims, no territory promises, no
// franchise terms appear here — none exist yet. Proof is limited to
// facts: GradeSpot is Pilot Customer #1 for its own products, and
// the products are real and in use on this site.
export const metadata = staticPageMetadata({
  title: "Partner With Us",
  description: "Collaborations and franchise discussions are welcome at GradeSpot IT Solutions, Hyderabad — for institutes, colleges, trainers, content and community partners, and new-centre conversations.",
  path: "/partner-with-us",
});

const tracks = [
  {
    n: "01",
    t: "Collaborations",
    d: "For institutes, colleges, trainers, and content or community partners. Co-run workshops and industrial trainings, collaborate on training delivery, or build community programs together — if it helps learners and fits both sides, we want to hear it.",
    points: ["Institutes & colleges", "Trainers & mentors", "Content partners", "Community partners"],
  },
  {
    n: "02",
    t: "Franchise Discussions",
    d: "For people thinking about a new centre. GradeSpot runs its own institute in Dilsukhnagar, Hyderabad and builds the products it runs on — if you'd like to talk about a centre of your own, the conversation starts here, with no package and no pressure.",
    points: ["New-centre conversations", "Run on the GradeSpot stack", "Start with a talk, not a form fee", "Decide together, step by step"],
  },
];

const steps = [
  { t: "Talk", d: "Send the form below or call us. Tell us who you are and what you have in mind — a few lines is enough." },
  { t: "Understand", d: "We get on a call and understand each other's goals, capacity and expectations honestly, including what we cannot do." },
  { t: "Pilot", d: "Where it makes sense, we start small — a workshop, a cohort, a trial of the products — before anything bigger is discussed." },
  { t: "Decide", d: "Only after a pilot do both sides decide whether a deeper collaboration or a centre makes sense, and on what terms." },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        title="Collaborations & franchise discussions are welcome"
        subtitle="GradeSpot IT Solutions is a training institute that also builds the products it runs on. If you are an institute, a college, a trainer, a partner — or you're thinking about a centre of your own — we are open to a conversation."
      />

      {/* Two tracks */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Two Doors" title="Pick your conversation" center />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            {tracks.map((tr) => (
              <article
                key={tr.t}
                data-reveal
                className="relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-parchment p-8 shadow-[0_1px_2px_rgba(31,24,16,0.05)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-5 font-display text-[84px] font-semibold leading-none text-heading/[0.05]"
                >
                  {tr.n}
                </span>
                <p className="eyebrow text-signal-strong">Track {tr.n}</p>
                <h3 className="mt-3 font-display text-[26px] font-semibold text-heading">{tr.t}</h3>
                <p className="mt-3 text-[15px] leading-7 text-body">{tr.d}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tr.points.map((pt) => (
                    <li
                      key={pt}
                      className="rounded-full bg-brand-soft px-3.5 py-1.5 text-[13px] font-semibold text-signal-strong"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <a
                    href="#start"
                    className={tr.n === "01" ? "btn-outline-navy" : "btn-primary"}
                  >
                    {tr.n === "01" ? "Start a Collaboration" : "Discuss a Franchise"}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle label="How It Goes" title="Talk → Understand → Pilot → Decide" center />
          {/* Ordered process, kept as styled cards (§25.23): the <ol>
              makes the genuine Talk → Understand → Pilot → Decide
              sequence machine-readable as steps, visuals unchanged. */}
          <ol className="mx-auto mt-10 grid max-w-5xl list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.t}
                data-reveal
                className="rounded-[18px] border border-line bg-parchment p-6"
              >
                <p className="font-mono text-[12px] font-semibold text-signal-strong">
                  STEP {i + 1}
                </p>
                <h3 className="mt-2 font-display text-[21px] font-semibold text-heading">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-body">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-10 max-w-3xl rounded-[18px] border border-line bg-parchment p-6 text-center">
            <h3 className="font-display text-[20px] font-semibold text-heading">
              The proof is this website
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-body">
              GradeSpot is Pilot Customer #1 for its own products: the enquiry pipeline, demo
              bookings and certificate verification on this site run on the same stack a
              collaboration or centre would use. No projections — just a working system you
              can inspect right now.
            </p>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="start" className="section-pad scroll-mt-32">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div data-reveal>
            <SectionTitle label="Start" title="Start the conversation" />
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-body">
              Use the form and tell us about your organisation and the partnership type you
              have in mind. We reply to every serious enquiry personally.
            </p>
            <p className="mt-5 max-w-xl rounded-[14px] border border-line bg-cream px-5 py-4 text-sm leading-6 text-body">
              <strong className="text-heading">Please note:</strong> this page is an invitation
              to discuss — it is not a franchise offer. GradeSpot has no franchise package,
              investment figure, earnings claim or territory terms to publish today; anything
              of that kind would only ever be discussed directly, after we understand each
              other.
            </p>
          </div>
          <div data-reveal>
            <LeadForm
              idPrefix="partner"
              submitLabel="Start the Conversation"
              showCountry
              showPartnership
            />
          </div>
        </div>
      </section>

      {/* Partnership deal brief — separate from the discussion form
          above, which stays untouched and short. This is for partners
          past the conversation stage who want to draft terms. It is
          a draft brief only: it does NOT turn this page into a
          franchise offer, and it adds no investment figure, ROI or
          earnings claim, territory promise or franchise terms — none
          exist yet. Nothing here is signed, charged or sent. */}
      <section id="deal-brief" className="bg-surface-light section-pad scroll-mt-32">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div data-reveal>
            <SectionTitle label="Draft Terms" title="Ready to draft partnership terms?" />
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-body">
              If you have already talked with us and want to put the
              partnership on paper, use this brief: scope, deliverables,
              timeline, who signs off on scope and payment, success
              criteria, and the billing and legal address a signed deal
              would need.
            </p>
            <p className="mt-5 max-w-xl rounded-[14px] border border-line bg-cream px-5 py-4 text-sm leading-6 text-body">
              <strong className="text-heading">Please note:</strong> this is
              still a discussion, not a franchise offer and not a signed
              agreement. This brief is prepared in your browser only — it
              is not sent, not stored, not signed, and no payment is
              taken or changed here.
            </p>
          </div>
          <div data-reveal>
            <DealAgreementForm idPrefix="partner-deal" defaultDealType="partnership" />
          </div>
        </div>
      </section>
    </>
  );
}
