import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle, FaqList } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "For Institutes",
  description:
    "WhatsApp lead automation, a secure video learning hub and resilient lab setup for training institutes — built by GradeSpot IT Solutions, an institute ourselves.",
};

// For Institutes (B2B) page — harvested 2026-10-23 (DECISIONS.md §17).
// Anatomy follows the research-demo page and the Stage-1 approved plan:
// pain → three products → 5-step process → proof → demo form + FAQ.
// Products are Aravind's real three (gradespot-axon/docs/PRODUCTS.md).
// NO prices anywhere — the Set A vs Set B pricing decision is still open.
// Proof copy is factual only: no metrics, no case-study numbers, no
// outcome promises (his standing GTM honesty rule).

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
    tag: "Product 1",
    t: "WhatsApp Lead Engine",
    d: "Our flagship. An enquiry from a QR code or your website is stored with its source, the student gets an instant WhatsApp reply with course material, your counsellor is alerted right away, and follow-up sequences keep the conversation warm. It runs on the official Meta WhatsApp Cloud API with n8n — no unofficial gateways, no ban risk.",
  },
  {
    tag: "Product 2",
    t: "Secure Learning Hub",
    d: "A watermarked video LMS for your recorded classes: student logins, progress tracking, quizzes and an online test series. Visible watermarking discourages casual sharing of your recordings — honestly positioned, without impossible DRM promises.",
  },
  {
    tag: "Product 3",
    t: "Resilient Linux Lab",
    d: "Crash-proof PXE thin-client labs. Your lab computers boot from one central image, so a broken machine is fixed with a reboot instead of a repair call. One-time on-premise setup, after a technical assessment of your lab.",
  },
];

const steps = [
  { n: "1", t: "Connect", d: "WhatsApp API approved on your institute's own number." },
  { n: "2", t: "Capture", d: "Every enquiry answered in seconds, 24×7." },
  { n: "3", t: "Nurture", d: "Automated follow-ups keep prospects warm." },
  { n: "4", t: "Convert", d: "Your counsellor gets hot leads with context." },
  { n: "5", t: "Retain", d: "Fee reminders and batch updates on autopilot." },
];

const demoFaqs = [
  {
    q: "Is this the official WhatsApp API?",
    a: "Yes — the official WhatsApp Business Platform (Cloud API) only. No grey-area bulk tools, so your number carries no ban risk.",
  },
  {
    q: "Does it run on our institute's own number?",
    a: "Yes. The Lead Engine is set up on your institute's own WhatsApp number, and every enquiry lands in a database with its source — QR code, website or walk-in.",
  },
  {
    q: "What happens after I book a demo?",
    a: "We walk you through the live flow — the same enquiry pipeline this website runs on — and map it to your institute's courses, counsellors and batches.",
  },
  {
    q: "Do we need to replace our current tools?",
    a: "No. The products connect over the web — website forms, QR codes and WhatsApp — and sit alongside the way your team already works.",
  },
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
        title="Never Miss Another Admission Enquiry"
        subtitle="WhatsApp automation, a secure video learning hub and complete lab setup — everything a modern training institute needs, from the team that runs one."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "For Institutes" }]} />
          </div>

          {/* Pain */}
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
                  className="rounded-2xl border border-[#dbe4ee] bg-white px-8 py-10 shadow-sm"
                >
                  <span className="block h-1 w-10 rounded-full bg-brand" aria-hidden />
                  <h3 className="mt-4 text-xl font-bold text-heading">{p.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{p.d}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="mt-20">
            <SectionTitle label="Axon Products" title="Three products, one partner" center />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {products.map((p) => (
                <article
                  key={p.t}
                  className="flex flex-col rounded-2xl border border-[#dbe4ee] bg-white px-8 py-10 shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(10,34,54,0.12)]"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    {p.tag}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-heading">{p.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{p.d}</p>
                  <a href="#demo" className="mt-auto inline-block pt-5 text-sm font-bold text-brand hover:text-brand-dark">
                    Book a Demo →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle title="From enquiry to enrolled in 5 steps" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <article
                key={s.n}
                className="rounded-2xl border border-[#dbe4ee] bg-white px-6 py-8 text-center shadow-sm"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-lg font-extrabold text-brand">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-heading">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-6 text-body">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof — factual only */}
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle label="Proof, Not Promises" title="We run an institute first" center />
            <p className="mt-4">
              GradeSpot is Pilot Customer #1: these products are built for our own admissions
              before they are offered to anyone else.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            <article className="rounded-2xl bg-surface-light p-7">
              <h3 className="text-lg font-semibold text-heading">This website runs on it</h3>
              <p className="mt-2 text-sm leading-6 text-body">
                Every enquiry sent through these pages is captured into our database with its
                source — website, QR code or walk-in — so no lead depends on someone&apos;s
                memory.
              </p>
            </article>
            <article className="rounded-2xl bg-surface-light p-7">
              <h3 className="text-lg font-semibold text-heading">Verification is live</h3>
              <p className="mt-2 text-sm leading-6 text-body">
                Employers can verify a GradeSpot certificate on this site right now — the same
                trust tool we offer institutes.{" "}
                <Link href="/certificate-verification" className="font-semibold text-brand hover:underline">
                  Try certificate verification →
                </Link>
              </p>
            </article>
            <article className="rounded-2xl bg-surface-light p-7">
              <h3 className="text-lg font-semibold text-heading">No invented numbers</h3>
              <p className="mt-2 text-sm leading-6 text-body">
                We don&apos;t publish case-study figures we can&apos;t stand behind. As real
                institutes complete their pilots, their results will appear here — with their
                names attached.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Demo form + FAQ */}
      <section id="demo" className="scroll-mt-32 bg-surface-light section-pad">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="Live Demo"
              title="Book a live demo"
            />
            <p className="mt-4 max-w-xl">
              Tell us which product you want to see. We&apos;ll show you the admission flow
              handling real enquiries and map it to your institute.
            </p>
            <div className="mt-8">
              <LeadForm
                idPrefix="demo"
                hideMessage
                submitLabel="Book a Demo"
                interestOptions={[
                  "Demo: WhatsApp Lead Engine",
                  "Demo: Secure Learning Hub (Video LMS)",
                  "Demo: Resilient Linux Lab",
                  "Demo: The Full Institute Platform",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionTitle label="Questions" title="Demo FAQ" />
            <div className="mt-6">
              <FaqList items={demoFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
