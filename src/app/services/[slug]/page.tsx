import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services as localServices } from "@/data/services";
import { getService } from "@/lib/data";
import { servicePageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { DemoBadge, DemoNote } from "@/components/DemoMarker";
import {
  DEMO_SERVICE_CONTENT,
  isDemoServiceSlug,
} from "@/data/demo-content";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { SERVICE_ENQUIRE_LABEL, SERVICE_PENDING_LABEL } from "@/lib/services-rows";

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
  return servicePageMetadata(service, `/services/${slug}`);
}

// Frontend 3.0 — Stage 4 service detail template (exact version).
// Every service is held back: per src/data/services.ts, all summaries
// are pending Aravind's accuracy confirmation and the live detail
// pages carry only template filler, so this template renders the
// title plus a "details to be confirmed" notice and a single enquiry
// action — and nothing else. No summary, no offerings list ("What
// This Includes" is gone), no price, no timelines promise, no
// scope/deliverables/eligibility claim. The data file is untouched;
// when the owner/content approver confirms a service's scope, that
// service — and only that service — moves to verified rendering.
// Slugs, canonical URLs and routes are unchanged. The Service
// JSON-LD below asserts name, URL, provider and area served only.
// Demo exception (feat/demo-content-gaps, preview only): demo-scope
// services render placeholder scope copy with marker + legend; the
// held presentation above stays for every non-demo service.

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  // Demo branch only (feat/demo-content-gaps): demo-scope services
  // render placeholder scope copy with marker + legend. Every other
  // service keeps the held presentation below, unchanged.
  const demo = isDemoServiceSlug(slug)
    ? DEMO_SERVICE_CONTENT[slug]
    : undefined;
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
            {demo ? (
              <>
                <article>
                  <h2 className="flex flex-wrap items-center gap-3 text-[28px] font-semibold leading-[34px]">
                    {service.title} at GradeSpot <DemoBadge />
                  </h2>
                  <DemoNote />
                  <p className="mt-4 text-lg leading-8">{demo.summary}</p>
                </article>
                <article>
                  <h2 className="text-[22px] font-semibold leading-snug text-ink">
                    What this service covers
                  </h2>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {demo.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <h2 className="text-[22px] font-semibold leading-snug text-ink">
                    What you receive
                  </h2>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {demo.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <h2 className="text-[22px] font-semibold leading-snug text-ink">
                    What is not included
                  </h2>
                  <ul className="mt-3 list-disc space-y-1 pl-5">
                    {demo.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <h2 className="text-[22px] font-semibold leading-snug text-ink">
                    How engagements work
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-body">
                    {demo.engagement}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-body">
                    {demo.consultation}
                  </p>
                </article>
              </>
            ) : (
              <article>
                <h2 className="flex flex-wrap items-center gap-3 text-[28px] font-semibold leading-[34px]">
                  {service.title} at GradeSpot
                </h2>
                <p className="mt-3 text-lg leading-8">{SERVICE_PENDING_LABEL}.</p>
                <p className="mt-3 text-[15px] leading-7 text-body">
                  Scope, deliverables and availability for this service are confirmed directly
                  by the GradeSpot team.
                </p>
              </article>
            )}
            <div className="rounded-2xl border border-line bg-surface-light p-8 text-center">
              <h2 className="text-2xl font-semibold">Interested in {service.title}?</h2>
              <p className="mx-auto mt-2 max-w-xl">
                Send an enquiry and our team will discuss your requirement.
              </p>
              <Link href="/contact-us" className="btn-primary mt-5">
                {SERVICE_ENQUIRE_LABEL}
              </Link>
            </div>
            <p>
              <Link href="/services" className="text-sm font-semibold text-action hover:underline">
                ← All Services
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
