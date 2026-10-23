import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services as localServices } from "@/data/services";
import { servicesFaqAnswers } from "@/data/pages";
import { getService } from "@/lib/data";
import { PageHero } from "@/components/ui";

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
  return { title: service.title, description: `${service.title} — a GradeSpot IT Solutions service, Hyderabad.` };
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
      <PageHero title={service.title} subtitle="A GradeSpot IT Solutions service — Dilsukhnagar, Hyderabad." />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl space-y-10">
            <article>
              <h2 className="text-[28px] font-semibold leading-[34px]">What We Offer</h2>
              <p className="mt-3">{servicesFaqAnswers.services}</p>
              <p className="mt-4">{servicesFaqAnswers.trainings}</p>
            </article>
            <article>
              <h2 className="text-[28px] font-semibold leading-[34px]">How We Support You</h2>
              <p className="mt-3">{servicesFaqAnswers.support}</p>
              <p className="mt-4">{servicesFaqAnswers.smart}</p>
            </article>
            <div className="rounded-lg bg-surface-light p-8 text-center">
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
