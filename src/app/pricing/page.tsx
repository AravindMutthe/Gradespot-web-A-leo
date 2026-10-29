import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { services } from "@/data/services";
import { PageHero, SectionTitle } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = staticPageMetadata({
  title: "Pricing",
  description:
    "GradeSpot pricing: course fees, business quotes and institute plans are confirmed on enquiry; no official fee is published.",
  path: "/pricing",
});

// Pricing page — Stage 8 hold, purge gates applied. The old page
// rendered the CCNA/CCNP fee plans from DB course data (the CCNP
// plans are CCNA copy; legacy pricing sections must not be
// converted without per-figure verification), a "Start free" offer
// row asserting free demo classes (no course has a confirmed demo
// offer), and institute tier contents describing unbuilt Axon
// products as available ("instant auto-reply", "CRM-lite
// dashboard", "quoted after a demo"). Those stay held: no legacy
// figure, no offer, no capability list appears below, and no fee
// figure of any kind — the former demo ranges are removed, not
// replaced. Business services stay quoted-to-scope. This page is
// deliberately NOT added to header or footer nav — the pricing-nav
// gap is undecided until the pricing decision (Set A vs B) is made.
// Local service data only (titles); no DB reads.
const instituteTiers = [
  "Missed Enquiry Killer",
  "Admissions on Autopilot",
  "Institute OS",
];

export default function PricingPage() {
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
        subtitle="Course fees are confirmed on enquiry. No official fee is published on this page."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing" }]} />
          </div>

          <div className="mt-12">
            <SectionTitle label="For Students" title="Course fees, confirmed on enquiry" />
            <p className="mt-4 max-w-3xl">
              No official course fee is published on this page. Fees are confirmed on enquiry —
              ask about the course you want and the team will share the current fee. Nothing is
              charged before you confirm.
            </p>
            <div className="mt-8">
              <Link href="/contact-us" className="btn-primary">
                Ask for a Fee Quote
              </Link>
            </div>
          </div>

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
                  className="rounded-xl border border-line bg-surface-light px-6 py-5 font-semibold text-heading"
                >
                  {s.title} <span className="text-signal">→</span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact-us" className="btn-primary">
                Get a Quote
              </Link>
            </div>
          </div>

          <div className="mt-20">
            <SectionTitle label="For Institutes" title="Institute plans, quoted on enquiry" />
            <p className="mt-4 max-w-3xl">
              Three institute plans are under discussion, growing with your institute. Plan
              contents and pricing are scoped per institute on enquiry — the products behind
              them are in development, so no capability list is published here yet.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {instituteTiers.map((name, i) => (
                <article
                  key={name}
                  className="rounded-2xl border border-line bg-surface-light px-8 py-10"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-signal-strong">
                    Tier {i + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-heading">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">
                    Contents and pricing scoped per institute on enquiry.
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/for-institutes" className="btn-primary">
                Discuss Institute Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
