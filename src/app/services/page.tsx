import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { servicesFaqAnswers } from "@/data/pages";
import { business, telHref } from "@/data/site";
import { FaqList, LogoWall, PageHero, SectionTitle, ServiceCard, siteFaqs } from "@/components/ui";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive IT Training & Career Solutions — professional IT services tailored to your business needs."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <article className="rounded-lg bg-surface-light p-7">
              <h2 className="text-2xl font-semibold">24/7 Customer Support</h2>
              <p className="mt-2 text-sm leading-6">{servicesFaqAnswers.support}</p>
            </article>
            <article className="rounded-lg bg-surface-light p-7">
              <h2 className="text-2xl font-semibold">Smart Solutions</h2>
              <p className="mt-2 text-sm leading-6">{servicesFaqAnswers.smart}</p>
            </article>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <SectionTitle label="FAQ" title="Most common question about our services" />
            <FaqList items={siteFaqs} />
          </div>

          <div className="mt-16 rounded-lg bg-heading p-8 text-center text-white">
            <h2 className="text-2xl font-semibold text-white">Need a service for your business?</h2>
            <p className="mx-auto mt-2 max-w-xl text-white/80">
              Tell us what you are building or training for — we will respond with the right
              service plan.
            </p>
            <Link href="/contact-us" className="btn-primary mt-5">
              Contact Us Now
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <article className="rounded-lg bg-surface-light p-7">
              <h2 className="text-xl font-semibold">Address</h2>
              <p className="mt-2 text-sm leading-6">{business.address}</p>
            </article>
            <article className="rounded-lg bg-surface-light p-7">
              <h2 className="text-xl font-semibold">Send Us Mail</h2>
              <p className="mt-2 text-sm leading-6">
                {business.emails.map((e) => (
                  <span key={e} className="block">
                    <a className="hover:text-brand" href={`mailto:${e}`}>
                      {e}
                    </a>
                  </span>
                ))}
              </p>
            </article>
            <article className="rounded-lg bg-surface-light p-7">
              <h2 className="text-xl font-semibold">Call Us</h2>
              <p className="mt-2 text-sm leading-6">
                {business.phones.map((p) => (
                  <span key={p} className="block">
                    <a className="hover:text-brand" href={telHref(p)}>
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
