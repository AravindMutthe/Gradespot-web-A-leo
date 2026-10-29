import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { PageHero, AnswerLead } from "@/components/ui";
import DirectoryBoard from "@/components/DirectoryBoard";
import { DemoBadge, DemoNote } from "@/components/DemoMarker";
import { buildServiceRow } from "@/lib/services-rows";
import { BUSINESS_PATHWAYS, SERVICE_GROUPS } from "@/lib/two-door";

export const metadata = staticPageMetadata({
  title: "Services",
  description: "GradeSpot IT Solutions services — IT trainings, web development, cybersecurity solutions, digital marketing, network infrastructure building and logo designing for businesses in Hyderabad and online.",
  path: "/services",
});

// Frontend 3.0 — Two-door categorization: the business door directory.
//
// The 12 existing services are presented in FOUR presentation-group
// sections (labels only — they establish no new business line), in
// the published services order within each group. Detail URLs are
// unchanged (/services/[slug]); every row carries the pending
// notice until its scope is confirmed.
// A distinct "Who We Work With" section lists the 4 business-facing
// pages. Partner With Us is NOT labelled a service and carries no
// partner list: no partners exist to list, and EC-Council/Pearson are
// in-progress only, never listed as partners. Corporate &
// International is never presented as proof of operating in any
// foreign jurisdiction. Deal/agreement forms stay draft-only and are
// untouched by this change.
// Owner-words mapping (reported, not built as duplicate pages):
// "Solutions" = Technology & Security + Digital & Creative groups;
// "Collaborations" = the Who We Work With pathways; "Partnerships" =
// the Partner With Us entry. No standalone Solutions, Collaborations
// or Partnerships pages are created — they would duplicate the same
// 12 services + 4 pages.
// Pricing is deliberately NOT regrouped here: where Pricing sits in
// the business door stays open with the pricing decision.

export default async function ServicesPage() {
  const services = await getServices();
  const rows = services.map((s) => buildServiceRow({ slug: s.slug, title: s.title }));
  const rowBySlug = new Map(rows.map((r) => [r.slug, r]));

  return (
    <>
      <PageHero
        title="IT Services"
        subtitle="Services from GradeSpot IT Solutions in Dilsukhnagar, Hyderabad. Service details, scope and availability are confirmed on enquiry."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          Browse {services.length} services from GradeSpot IT Solutions in Dilsukhnagar,
          Hyderabad, grouped below. Service details, scope and availability are confirmed on
          enquiry.
        </AnswerLead>
      </div>
      <section className="section-pad">
        <div className="wrap">
          {/* Demo branch only: legend wherever demo rows appear. */}
          {rows.some((row) => row.demo) && <DemoNote />}
          {SERVICE_GROUPS.map((group) => (
            <div key={group.label} className="mb-12">
              <DirectoryBoard door="business" title={group.label}>
              <ul className="border-t border-line">
                {group.slugs.map((slug) => {
                  const row = rowBySlug.get(slug)!;
                  return (
                    <li key={row.slug} className="border-b border-line">
                      <article className="row-hover flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-4">
                        <div className="min-w-0">
                          <h3 className="flex flex-wrap items-center gap-3 text-lg font-semibold">
                            <Link href={row.titleHref} className="hover:text-action-dark focus-visible:underline">
                              {row.displayTitle}
                            </Link>
                            {row.demo && <DemoBadge />}
                          </h3>
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
                  );
                })}
              </ul>
              </DirectoryBoard>
            </div>
          ))}

          <div className="mb-12">
            <DirectoryBoard
              door="business"
              title="Who We Work With"
              description="Business pathways — institutes, colleges and organisations working with GradeSpot."
            >
            <ul className="border-t border-line">
              {BUSINESS_PATHWAYS.map((pathway) => (
                <li key={pathway.href} className="border-b border-line">
                  <article className="row-hover flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">
                        <Link href={pathway.href} className="hover:text-action-dark focus-visible:underline">
                          {pathway.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-[15px] text-body">{pathway.line}</p>
                    </div>
                    <Link
                      href={pathway.href}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-canvas px-5 py-2 text-[15px] font-semibold text-ink"
                    >
                      Visit page
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
            </DirectoryBoard>
          </div>

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
