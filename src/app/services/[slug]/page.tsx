import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services as localServices } from "@/data/services";
import { getService } from "@/lib/data";
import { PageHero } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return localServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.summary ?? `${service.title} — a GradeSpot IT Solutions service, Hyderabad.`, alternates: { canonical: `/services/${slug}` } };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={serviceSchema(service.title, service.slug)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <PageHero title={service.title} subtitle="A GradeSpot IT Solutions service — Dilsukhnagar, Hyderabad." />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: service.title },
              ]}
            />
          </div>
          <div className="mx-auto mt-8 max-w-4xl space-y-10">
            {service.summary && (
              <article>
                <h2 className="text-[28px] font-semibold leading-[34px]">
                  {service.title} at GradeSpot
                </h2>
                <p className="mt-3 text-lg leading-8">{service.summary}</p>
                {service.offerings && service.offerings.length > 0 && (
                  <>
                    <h3 className="mt-8 text-xl font-semibold text-heading">What This Includes</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {service.offerings.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-3 rounded-xl border border-line bg-surface-light px-4 py-3 text-[15px] font-medium text-heading"
                        >
                          <span className="font-bold text-brand" aria-hidden>
                            ✓
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            )}
            <p className="text-[15px] leading-7 text-body">
              Looking at the wider picture? Browse{" "}
              <Link href="/services" className="font-semibold text-brand hover:underline">
                all services
              </Link>{" "}
              or read the{" "}
              <Link href="/faq" className="font-semibold text-brand hover:underline">
                Help &amp; FAQs
              </Link>
              .
            </p>
            <div className="rounded-2xl border border-line bg-surface-light p-8 text-center">
              <h2 className="text-2xl font-semibold">Interested in {service.title}?</h2>
              <p className="mx-auto mt-2 max-w-xl">
                Send an enquiry and our team will discuss your requirement, timelines and the
                right way to engage this service.
              </p>
              <Link href="/contact-us" className="btn-primary mt-5">
                Enquire Now
              </Link>
            </div>
            <p>
              <Link href="/services" className="text-sm font-semibold text-brand hover:underline">
                ← All Services
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
