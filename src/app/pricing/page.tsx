import type { Metadata } from "next";
import Link from "next/link";
import { getCourses, getServices } from "@/lib/data";
import { PageHero, SectionTitle } from "@/components/ui";
import OfferCards from "@/components/OfferCards";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing",
  description:
    "GradeSpot pricing: published course fees for students, scoped quotes for businesses, and institute plans quoted after a demo.",
};

// Pricing page — harvested 2026-10-23 (DECISIONS.md §17), three-audience
// structure from the Oct-6 site. Research rule: publish course prices,
// gate service/institute quotes. The ONLY amounts on this page are the
// real published CCNA/CCNP fees, rendered from the same course data as
// the course pages. Institute tiers are described by contents only —
// the Set A vs Set B price decision is still open, so no institute or
// service amount appears anywhere on this page.

const instituteTiers = [
  {
    name: "Missed Enquiry Killer",
    points: [
      "WhatsApp Cloud API set up on your institute's number",
      "Instant auto-reply + lead capture (name, course interest, phone)",
      "Instant counsellor alert on WhatsApp and email",
      "Source attribution on every lead",
    ],
  },
  {
    name: "Admissions on Autopilot",
    points: [
      "Everything in Missed Enquiry Killer",
      "Qualification chatbot (course, goal, city, budget)",
      "Automated follow-up sequences, including fee reminders",
      "CRM-lite dashboard — lead pipeline with source attribution",
      "Monthly performance review",
    ],
  },
  {
    name: "Institute OS",
    points: [
      "Everything in Admissions on Autopilot",
      "Watermarked video LMS — courses, student logins, progress tracking, quizzes",
      "Online test-series module",
      "Linux PXE thin-client lab setup (one-time, on-premise)",
      "Priority support and quarterly growth review",
    ],
  },
];

export default async function PricingPage() {
  const [courses, services] = await Promise.all([getCourses(), getServices()]);
  const pricedCourses = ["ccna-200-301", "ccnp-350-401-encor"]
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({
      course: c,
      plans: c.sections.find((s) => s.style === "pricing")?.paragraphs ?? [],
    }))
    .filter((x) => x.plans.length > 0);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <PageHero
        title="Pricing"
        subtitle="Straightforward pricing: published course fees for students, and individually scoped quotes for businesses and institutes."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing" }]} />
          </div>

          {/* Free first steps — promotions data layer (§19) */}
          <div className="mt-12">
            <SectionTitle label="No-Cost First Steps" title="Start free" />
            <div className="mt-8">
              <OfferCards />
            </div>
          </div>

          {/* Students — the real published fees */}
          <div className="mt-12">
            <SectionTitle label="For Students" title="Course fees, published" />
            <p className="mt-4 max-w-3xl">
              These are the fees published on the course pages themselves — the same figures,
              with nothing added.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {pricedCourses.map(({ course, plans }) => (
                <article
                  key={course.slug}
                  className="rounded-2xl border border-line bg-parchment p-8 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-heading">{course.title}</h3>
                  {course.duration && (
                    <p className="mt-1 text-sm font-semibold text-brand-dark">
                      Duration: {course.duration}
                    </p>
                  )}
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {plans.map((p) => {
                      const [name, price] = p.split(" — ");
                      return (
                        <div
                          key={p}
                          className="rounded-xl border border-line bg-surface-light px-4 py-5 text-center"
                        >
                          <p className="text-[12px] font-semibold uppercase tracking-wide text-body">
                            {name}
                          </p>
                          <p className="mt-1.5 text-2xl font-extrabold text-heading">
                            {price ?? p}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    href={`/trainings/${course.slug}`}
                    className="mt-6 inline-block text-sm font-bold text-brand hover:text-brand-dark"
                  >
                    View the course →
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-line bg-surface-light p-8 text-center">
              <h3 className="text-xl font-semibold text-heading">All other trainings</h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-body">
                Fees for the remaining trainings are confirmed on enquiry — the batch, the mode
                (online or offline) and certification options change the figure, so we quote the
                exact amount before you enrol. No surprises afterwards.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/trainings" className="btn-primary">
                  View All Trainings
                </Link>
                <Link href="/contact-us" className="btn-outline-navy">
                  Ask for a Fee Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Businesses — quotes gated */}
          <div className="mt-20">
            <SectionTitle label="For Businesses" title="Services, quoted to scope" />
            <p className="mt-4 max-w-3xl">
              Every business engagement is scoped first — team size, timelines and depth of the
              work decide the quote, so we don&apos;t publish one-size numbers. Tell us the
              requirement and we&apos;ll respond with a scoped plan.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-xl border border-line bg-parchment px-6 py-5 font-semibold text-heading shadow-sm transition duration-300 hover:shadow-[0_16px_32px_rgba(31,24,16,0.12)]"
                >
                  {s.title} <span className="text-brand">→</span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact-us" className="btn-primary">
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Institutes — contents only, no amounts */}
          <div className="mt-20">
            <SectionTitle label="For Institutes" title="Institute plans, quoted after a demo" />
            <p className="mt-4 max-w-3xl">
              Three plans, growing with your institute. The right plan depends on your enquiry
              volume and branches, so institute pricing is quoted after a short demo — the plan
              contents below are exactly what each tier includes.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {instituteTiers.map((t, i) => (
                <article
                  key={t.name}
                  className={`flex flex-col rounded-2xl border bg-parchment px-8 py-10 shadow-sm ${
                    i === 1 ? "border-brand ring-1 ring-brand" : "border-line"
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    Tier {i + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-heading">{t.name}</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-6 text-body">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="font-bold text-brand" aria-hidden>
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/for-institutes" className="btn-primary">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
