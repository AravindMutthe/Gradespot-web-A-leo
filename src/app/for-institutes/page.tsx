import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle, AnswerLead } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = staticPageMetadata({
  title: "For Institutes",
  description:
    "Institute products in development from GradeSpot IT Solutions — WhatsApp lead automation, a secure video learning hub and resilient lab setup — discussed with institutes before any pilot.",
  path: "/for-institutes",
});

// For Institutes — Stage 8 honest rewrite. The old page presented the
// Axon products as running systems ("instant WhatsApp reply", "answered
// in seconds, 24×7", "every enquiry lands in a database", "this website
// runs on it", "book a live demo" of the same pipeline). None of that
// is true yet: Axon is docs + a workflow file, not a built API; this
// site's own enquiry route is not the Axon pipeline; no institute pilot
// has run. So this page now says what is actually on offer: three
// products IN DEVELOPMENT, discussed with institutes, with pilots
// decided case by case. Present-tense running claims, instant/24×7
// promises, database guarantees, live-demo offers and the demo FAQ are
// all removed. What IS live and honestly claimable: certificate
// verification on this site, and GradeSpot running its own institute.
// No prices anywhere (Set A vs Set B still open).
const pains = [
  {
    t: "Enquiries arrive after hours",
    d: "Students ask on WhatsApp in the evening. If nobody replies until the next morning, many of them have already joined somewhere else.",
  },
  {
    t: "Follow-ups live in someone's phone",
    d: "When an interested student's number sits in one counsellor's chat history, there is no system to follow up — and the trail quietly goes cold.",
  },
  {
    t: "Reminders eat the counsellor's day",
    d: "Fee reminders, batch updates and brochure requests are sent one by one, by hand — time that should go into counselling and teaching.",
  },
];

const products = [
  {
    tag: "Product 1 — in development",
    t: "WhatsApp Lead Engine",
    d: "Planned: an enquiry from a QR code or your website is captured with its source, the student gets a WhatsApp reply with course material, and your counsellor is alerted. It is designed around the official Meta WhatsApp Cloud API — no unofficial gateways.",
  },
  {
    tag: "Product 2 — in development",
    t: "Secure Learning Hub",
    d: "Planned: a watermarked video LMS for recorded classes — student logins, progress tracking, quizzes and an online test series. Visible watermarking discourages casual sharing; no impossible DRM promises.",
  },
  {
    tag: "Product 3 — in development",
    t: "Resilient Linux Lab",
    d: "Planned: PXE thin-client labs where lab computers boot from one central image, so a broken machine is fixed with a reboot instead of a repair call. One-time on-premise setup, after a technical assessment of your lab.",
  },
];

const steps = [
  { n: "1", t: "Talk", d: "Tell us your courses, counsellors and batches." },
  { n: "2", t: "Assess", d: "We map what a pilot would need — including a technical assessment for any lab setup." },
  { n: "3", t: "Pilot", d: "Where it makes sense, start small and measure it before anything bigger is discussed." },
  { n: "4", t: "Decide", d: "Only after a pilot do both sides decide whether a deeper arrangement makes sense, and on what terms." },
];

export default function ForInstitutesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "For Institutes", path: "/for-institutes" },
        ])}
      />
      <PageHero
        title="For Institutes — Products in Development"
        subtitle="WhatsApp lead automation, a secure video learning hub and resilient lab setup — being built by the team that runs an institute, and discussed with institutes before any pilot."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot is building WhatsApp lead automation, a secure video learning hub and
          resilient lab setup for training institutes — products built for its own admissions
          first. They are in development, not yet running products: institutes can discuss a
          pilot through the form below, and pricing is scoped per institute on enquiry.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "For Institutes" }]} />
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <a href="#discuss" className="btn-primary">
              Discuss a Pilot
            </a>
            <Link href="/pricing" className="btn-outline-navy">
              See Institute Plans
            </Link>
            <Link href="/partner-with-us" className="btn-outline-navy">
              Partner With Us
            </Link>
          </div>

          <div className="mt-12">
            <SectionTitle
              label="For Institute Owners"
              title="The problems every institute owner knows"
              center
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {pains.map((p) => (
                <article
                  key={p.t}
                  className="rounded-2xl border border-line bg-surface-light px-8 py-10"
                >
                  <span className="block h-1 w-10 rounded-full bg-brand" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold text-heading">{p.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{p.d}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <SectionTitle label="Axon Products" title="Three products, in development" center />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {products.map((p) => (
                <article
                  key={p.t}
                  className="flex flex-col rounded-2xl border border-line bg-surface-light px-8 py-10"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-signal-strong">
                    {p.tag}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-heading">{p.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{p.d}</p>
                  <a href="#discuss" className="mt-auto inline-block pt-5 text-sm font-bold text-action hover:text-action-dark">
                    Discuss this product →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle title="How a pilot would run" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <article
                key={s.n}
                className="rounded-2xl border border-line bg-surface-light px-6 py-8 text-center"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-lg font-extrabold text-brand-bright">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-heading">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-6 text-body">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle label="Honest Status" title="What is live today" center />
            <p className="mt-4">
              Certificate verification runs on this site right now — employers can verify a
              GradeSpot certificate by its code. The three institute products above are in
              development: no pilot results exist yet, and none are published here. As real
              institutes complete pilots, their results will appear here — with their names
              attached and their permission.
            </p>
            <p className="mt-4">
              <Link href="/certificate-verification" className="font-semibold text-action hover:underline">
                Try certificate verification →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-line bg-surface-light p-8 md:p-10">
            <div className="max-w-2xl">
              <p className="eyebrow text-signal-strong">Partner With Us</p>
              <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-heading">
                Open to working together?
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-body">
                Beyond products: collaborations and franchise discussions are welcome — with
                institutes, colleges, trainers and people thinking about a centre of their own.
              </p>
            </div>
            <a href="/partner-with-us" className="btn-primary">
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      <section id="discuss" className="scroll-mt-32 bg-surface-light section-pad">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="Discuss a Pilot"
              title="Talk to us about a pilot"
            />
            <p className="mt-4 max-w-xl">
              Tell us which product you are interested in. We will discuss what a pilot would
              need for your institute — no live demo of a finished product is promised, because
              the products are still in development.
            </p>
            <div className="mt-8">
              <LeadForm
                idPrefix="demo"
                hideMessage
                submitLabel="Discuss a Pilot"
                interestOptions={[
                  "Pilot: WhatsApp Lead Engine",
                  "Pilot: Secure Learning Hub (Video LMS)",
                  "Pilot: Resilient Linux Lab",
                  "Pilot: The Full Institute Platform",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionTitle label="Questions" title="What to expect" />
            <p className="mt-4 max-w-xl">
              A conversation first: your courses, counsellors and batches, what a pilot would
              cover, and what it would cost — scoped per institute on enquiry. Anything the
              products cannot do yet will be said plainly on that call.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
