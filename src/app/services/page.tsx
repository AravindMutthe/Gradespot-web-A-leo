import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { PageHero, AnswerLead } from "@/components/ui";
import { buildServiceRow } from "@/lib/services-rows";

export const metadata = staticPageMetadata({
  title: "Services",
  description: "GradeSpot IT Solutions services — IT trainings, web development, cybersecurity solutions, digital marketing, network infrastructure building and logo designing for businesses in Hyderabad and online.",
  path: "/services",
});

// Frontend 3.0 — Stage 4 services index (Option A, compact rows).
// What this template contains, and nothing else:
// - the compact service rows and an enquiry/help section with
//   truthful wording only.
// Every service is held back to title-only: per src/data/services.ts,
// all summaries are pending Aravind's accuracy confirmation and the
// live detail pages carry only template filler, so no summary and
// no offerings list is rendered for any service.
// The promotional sections of the old template are removed from this
// template outright, not hidden: no service-card grid, no round-the-
// clock support claim card, no filler "smart" card, no FAQ section
// (its shared answers carry unverified quality and free-demo claims),
// no employer logo wall, no duplicated contact cards (the contact
// page remains the contact surface).
// Slugs, service order and routes are unchanged.

export default async function ServicesPage() {
  const services = await getServices();
  const rows = services.map((s) => buildServiceRow({ slug: s.slug, title: s.title }));

  return (
    <>
      <PageHero
        title="IT Services"
        subtitle="Services from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Service details, scope and availability are confirmed on enquiry."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse {services.length} services from GradeSpot IT Solutions in Dilsukhnagar,
          Hyderabad, listed below. Service details, scope and availability are confirmed on
          enquiry.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          <ul className="border-t border-line">
            {rows.map((row) => (
              <li key={row.slug} className="border-b border-line">
                <article className="flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold">
                      <Link href={row.titleHref} className="hover:text-signal">
                        {row.displayTitle}
                      </Link>
                    </h2>
                    <p className="mt-1 text-[15px] text-body">{row.statusLabel}</p>
                  </div>
                  <Link
                    href={row.actionHref}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
                  >
                    {row.actionLabel}
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-2xl border border-line bg-surface-light p-8 text-center">
            <h2 className="text-2xl font-semibold">Need a service for your business?</h2>
            <p className="mx-auto mt-2 max-w-xl">
              Tell us what you need — send an enquiry and our team will discuss your
              requirement.
            </p>
            <Link href="/contact-us" className="btn-primary mt-5">
              Enquire About Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
