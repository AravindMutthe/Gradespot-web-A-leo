import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { divisionServices, revenueDivisions } from "@/data/revenue-divisions";
import { servicesFaqAnswers } from "@/data/pages";
import { business, telHref } from "@/data/site";
import { FaqList, LogoWall, PageHero, SectionTitle, ServiceCard, siteFaqs } from "@/components/ui";
import { divisionIcon } from "@/components/Artwork";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata = staticPageMetadata({
  title: "Services",
  description: "GradeSpot IT Solutions services — IT trainings, web development, cybersecurity solutions, digital marketing, network infrastructure building and logo designing for businesses in Hyderabad and online.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      {/* FAQPage for the siteFaqs rendered below via FaqList (§25.21). */}
      <JsonLd data={faqSchema(siteFaqs)} />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive IT Training & Career Solutions — professional IT services tailored to your business needs."
      />
      <section className="section-pad">
        <div className="wrap">
          {/* Revenue divisions (Nexus revenue application): the 12 real
              services grouped by the seven strategy divisions. Planned
              divisions carry no service and are labelled Planned, never
              presented as available. No price is published anywhere here;
              every action is a quote, a consultation or an enquiry. */}
          <SectionTitle
            label="Revenue divisions"
            title="What GradeSpot does, by division"
          />
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-body">
            Services are grouped by the business division they belong to.
            Divisions marked “Coming soon — ask us” have no published offering
            yet — ask about them on consultation rather than buying anything
            here.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {revenueDivisions.map((d) => {
              const divServices = divisionServices(d);
              return (
                <article
                  key={d.key}
                  className="rounded-2xl border border-line bg-surface-light p-7"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="flex items-center gap-3 text-xl font-semibold">
                      <span aria-hidden className="text-2xl">
                        {divisionIcon(d.key)}
                      </span>
                      {d.title}
                    </h2>
                    <span className="rounded-full border border-line bg-parchment px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-heading">
                      {d.status === "Planned" ? "Coming soon — ask us" : d.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-body">{d.blurb}</p>
                  <p className="mt-2 text-[13px] leading-5 text-body">{d.statusNote}</p>
                  {divServices.length > 0 ? (
                    <ul className="mt-4 space-y-1.5">
                      {divServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="text-[15px] font-semibold text-signal hover:underline"
                          >
                            {s.title} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[14px] font-semibold text-body">
                      No published service in this division yet.
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {d.status !== "Planned" && (
                      <Link href="/corporate-and-international" className="btn-primary">
                        Get a Quote
                      </Link>
                    )}
                    <Link href="/contact-us" className="btn-outline-navy">
                      Book a Consultation
                    </Link>
                    <Link href={d.exploreHref} className="text-[14px] font-bold text-signal hover:underline">
                      {d.exploreLabel} →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Ongoing support & maintenance — a consultation concept, not a
              priced product: scope and terms are agreed on consultation,
              no recurring-billing claim is made, and nothing is sold here. */}
          <article className="mt-12 rounded-2xl border border-line bg-parchment p-7">
            <h2 className="text-xl font-semibold">Ongoing support &amp; maintenance</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-body">
              Already a GradeSpot client, or planning a website or system you
              will need looked after? Ask about an ongoing support and
              maintenance arrangement — what it covers, and on what terms, is
              agreed on consultation for your specific system. No price and
              no subscription is published or sold on this page.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact-us" className="btn-primary">
                Book a Consultation
              </Link>
              <Link href="/corporate-and-international" className="btn-outline-navy">
                Get a Quote
              </Link>
            </div>
          </article>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-2xl font-semibold">24/7 Customer Support</h2>
              <p className="mt-2 text-sm leading-6">{servicesFaqAnswers.support}</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-2xl font-semibold">Smart Solutions</h2>
              <p className="mt-2 text-sm leading-6">{servicesFaqAnswers.smart}</p>
            </article>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <SectionTitle label="FAQ" title="Most common question about our services" />
            <FaqList items={siteFaqs} />
          </div>

          <div className="mt-16 rounded-[20px] panel-ink p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-paper">Need a service for your business?</h2>
            <p className="mx-auto mt-2 max-w-xl text-paper/80">
              Tell us what you are building or training for — we will respond with the right
              service plan. No price is quoted on this page; scope is agreed
              on consultation.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/corporate-and-international" className="btn-primary">
                Get a Quote
              </Link>
              <Link href="/contact-us" className="btn-outline-light">
                Book a Consultation
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-xl font-semibold">Address</h2>
              <p className="mt-2 text-sm leading-6">{business.address}</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-xl font-semibold">Send Us Mail</h2>
              <p className="mt-2 text-sm leading-6">
                {business.emails.map((e) => (
                  <span key={e} className="block">
                    <a className="hover:text-signal" href={`mailto:${e}`}>
                      {e}
                    </a>
                  </span>
                ))}
              </p>
            </article>
            <article className="rounded-2xl border border-line bg-surface-light p-7">
              <h2 className="text-xl font-semibold">Call Us</h2>
              <p className="mt-2 text-sm leading-6">
                {business.phones.map((p) => (
                  <span key={p} className="block">
                    <a className="hover:text-signal" href={telHref(p)}>
                      {p}
                    </a>
                  </span>
                ))}
              </p>
            </article>
          </div>
        </div>
      </section>
      <LogoWall />
    </>
  );
}
