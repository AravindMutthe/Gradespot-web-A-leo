import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle, CourseCard, FaqList } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { business, telHref } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { getCourses } from "@/lib/data";

export const metadata: Metadata = {
  title: "IT Training Institute in Dilsukhnagar, Hyderabad",
  description:
    "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad — cybersecurity, cloud, networking and digital marketing trainings with online & offline classes. Call +91 91826 54056.",
};

// Local institute page (research expansion pack, DECISIONS.md §18 —
// folder-1 tactic 8 local-SEO pattern + ppc report §2.5/§2.2: the
// website + reviews win the AI answer; answer-first content with the
// real address, phone and facts is what gets cited). Everything here
// is a published fact: address, phone, hours, courses, and the verbatim
// Google testimonials. No geo coordinates are published anywhere in
// the record, so the map is a query link — never invented lat/long.

const localFaqs = [
  {
    q: "Where is GradeSpot IT Solutions located in Hyderabad?",
    a: `GradeSpot IT Solutions is at ${business.address}. The institute is in Dilsukhnagar, near Sai Baba Temple on Road No. 1, Sri Krishna Nagar.`,
  },
  {
    q: "What are the institute's office hours?",
    a: `Office hours are ${business.officeHours}, as published on the website. Batches run in online and offline modes — call ${business.phones[0]} for the timing of a specific course batch.`,
  },
  {
    q: "Which courses can I join at the Dilsukhnagar institute?",
    a: "The full catalogue covers cybersecurity (CEH, SOC Analyst, Security+, PenTest+), networking (CCNA, CCNP, Network+, Hardware & Networking), cloud (Azure AZ-900, AZ-104 and AWS), digital marketing, programming & data, and medical coding programs — with online and offline classes.",
  },
  {
    q: "Can I attend classes online instead of visiting Dilsukhnagar?",
    a: "Yes. GradeSpot runs online and offline classes for its trainings — live sessions with recorded videos and hands-on labs — so you can learn from the institute without travelling to Dilsukhnagar.",
  },
  {
    q: "How do I find the fee for a course?",
    a: `Some course fees are published on the course pages (for example the CCNA plans on the pricing page); the rest are confirmed on enquiry. Call ${business.phones[0]} and the team will share the current fee for the course you want.`,
  },
  {
    q: "Can I attend a demo before enrolling?",
    a: "Yes — every full course page carries a free demo booking form, and the landing pages for Hyderabad courses take a free counselling call request. The team confirms the timing with you.",
  },
];

export default async function LocalInstitutePage() {
  const fullCourses = (await getCourses()).filter((c) => !c.catalogOnly);
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}`;

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Training Institute in Dilsukhnagar, Hyderabad", path: "/training-institute-in-dilsukhnagar-hyderabad" },
        ])}
      />
      <JsonLd data={faqSchema(localFaqs)} />
      <PageHero
        title="IT Training Institute in Dilsukhnagar, Hyderabad"
        subtitle="Cybersecurity, cloud, networking and digital marketing training — at our Dilsukhnagar institute and online."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[{ name: "Home", path: "/" }, { name: "Training Institute in Dilsukhnagar" }]}
            />
            {/* Answer-first block (AEO: the direct answer comes first) */}
            <p className="mt-8 text-[17px] leading-8 text-heading">
              GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad,
              offering professional training programs for corporates and students across
              computer hardware, networking, cybersecurity, cloud computing, digital marketing
              and data science — with online and offline classes, hands-on labs and expert
              instructors. Call {business.phones[0]} to talk to a trainer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-[#dbe4ee] bg-white px-7 py-8 shadow-sm">
              <h2 className="text-lg font-bold text-heading">Visit us</h2>
              <address className="mt-3 text-sm not-italic leading-6 text-body">
                {business.address}
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-bold text-brand hover:text-brand-dark"
              >
                View on Google Maps →
              </a>
            </article>
            <article className="rounded-2xl border border-[#dbe4ee] bg-white px-7 py-8 shadow-sm">
              <h2 className="text-lg font-bold text-heading">Call or write</h2>
              <p className="mt-3 text-sm leading-6 text-body">
                {business.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="block font-semibold text-heading hover:text-brand">
                    {p}
                  </a>
                ))}
                {business.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block hover:text-brand">
                    {e}
                  </a>
                ))}
              </p>
            </article>
            <article className="rounded-2xl border border-[#dbe4ee] bg-white px-7 py-8 shadow-sm">
              <h2 className="text-lg font-bold text-heading">Office hours</h2>
              <p className="mt-3 font-display text-2xl font-extrabold text-heading">
                {business.officeHours}
              </p>
              <p className="mt-2 text-sm leading-6 text-body">
                Online &amp; offline classes. Walk in for a counselling session, or book a free
                demo class from any course page.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle label="Trainings" title="Courses at our Hyderabad institute" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fullCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/trainings" className="btn-primary">
              See the Full Catalogue
            </Link>
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Hyderabad Landing Pages" title="Course pages for Hyderabad learners" center />
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {fullCourses.map((c) => (
              <Link
                key={c.slug}
                href={`/lp/${c.slug}-in-hyderabad`}
                className="rounded-full border border-[#dbe4ee] bg-white px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-brand hover:text-brand"
              >
                {c.title} in Hyderabad
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <SectionTitle label="Learner Voices" title="What our learners say" center />
            <div className="mt-8 space-y-4">
              {testimonials.slice(0, 4).map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-2xl border border-[#dbe4ee] bg-white px-7 py-6 shadow-sm"
                >
                  <p className="text-[15px] leading-7 text-heading">“{t.text}”</p>
                  <footer className="mt-3 text-sm font-semibold text-body">
                    {t.name} · <span className="font-normal">{t.source}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
            <p className="mt-6 text-center">
              <Link href="/testimonials" className="text-sm font-bold text-brand hover:text-brand-dark">
                Read all testimonials →
              </Link>
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <SectionTitle label="Questions" title="Visiting us — quick answers" center />
            <div className="mt-8">
              <FaqList items={localFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
