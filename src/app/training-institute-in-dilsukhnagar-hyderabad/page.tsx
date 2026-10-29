import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle, CtaBand } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { business, telHref } from "@/data/site";
import { courses } from "@/data/courses";
import { courseDetails } from "@/data/course-details";
import { buildCourseDetail } from "@/lib/course-detail";
import { buildLpModel } from "@/lib/lp-model";

export const metadata = staticPageMetadata({
  title: "IT Training Institute in Dilsukhnagar, Hyderabad",
  description: "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad — cybersecurity, cloud, networking and digital marketing trainings with online & offline classes. Call +91 91826 54056.",
  path: "/training-institute-in-dilsukhnagar-hyderabad",
  image: "/images/map-dilsukhnagar.jpg",
});

// Local institute page — Stage 8 re-template. Held/corrected from the
// old body: the fee FAQ ("some fees are published… CCNA plans on the
// pricing page") → fees confirmed on enquiry; the demo FAQ ("every full
// course page carries a free demo booking form") → demo availability
// confirmed on enquiry; the counselling FAQ → ask on enquiry; the
// "live sessions with recorded videos and hands-on labs" line → online
// and offline classes only; the generic testimonial slice (unmatched
// reviews attached to this page) removed; the CourseCard grid replaced
// by text rows (held courses show their held notice, never a summary);
// FAQPage schema removed (no recorded approval for this FAQ set);
// data source switched from DB-first getCourse() to local repo files.
// No map image block on this page: the local OpenStreetMap-built map
// lives on the contact page. The metadata image below is the page's
// OG card, unchanged.
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
    a: "Yes. GradeSpot runs online and offline classes for its trainings, so you can learn from the institute without travelling to Dilsukhnagar.",
  },
  {
    q: "How do I find the fee for a course?",
    a: `Fees are confirmed on enquiry. Call ${business.phones[0]} and the team will share the current fee for the course you want.`,
  },
  {
    q: "Can I attend a demo before joining?",
    a: "Demo availability is confirmed on enquiry — send an enquiry or call and the team will confirm what is available for the course you want.",
  },
  {
    q: "How do I reach or visit the institute?",
    a: `The institute is in Dilsukhnagar, Hyderabad, at ${business.address}. Call ${business.phones[0]} for directions or to book a visit — the contact page also carries a map of the Dilsukhnagar location.`,
  },
  {
    q: "Can I book a counselling session?",
    a: "Ask about a counselling call on enquiry — send an enquiry or register your interest and the team will arrange a call with you.",
  },
];

export default function LocalInstitutePage() {
  const fullCourses = courses.filter((c) => !c.catalogOnly);
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Training Institute in Dilsukhnagar, Hyderabad", path: "/training-institute-in-dilsukhnagar-hyderabad" },
        ])}
      />
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
            <p className="mt-8 text-[17px] leading-8 text-heading">
              GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad,
              offering training programs for corporates and students across
              computer hardware, networking, cybersecurity, cloud computing, digital marketing
              and data science — with online and offline classes. Call {business.phones[0]} to talk to a trainer.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-line bg-surface-light px-7 py-8">
              <h2 className="text-lg font-bold text-heading">Visit us</h2>
              <address className="mt-3 text-sm not-italic leading-6 text-body">
                {business.address}
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-bold text-action hover:text-action-dark"
              >
                View on Google Maps →
              </a>
            </article>
            <article className="rounded-2xl border border-line bg-surface-light px-7 py-8">
              <h2 className="text-lg font-bold text-heading">Call or write</h2>
              <p className="mt-3 text-sm leading-6 text-body">
                {business.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="block font-semibold text-heading hover:text-action-dark">
                    <span aria-hidden="true">📞</span> Call
                  </a>
                ))}
                {business.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block hover:text-action-dark">
                    {e}
                  </a>
                ))}
              </p>
            </article>
            <article className="rounded-2xl border border-line bg-surface-light px-7 py-8">
              <h2 className="text-lg font-bold text-heading">Office hours</h2>
              <p className="mt-3 font-display text-2xl font-extrabold text-heading">
                {business.officeHours}
              </p>
              <p className="mt-2 text-sm leading-6 text-body">
                Online &amp; offline classes. Walk in for a counselling session, or send an
                enquiry about a course.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle label="Trainings" title="Courses at our Hyderabad institute" center />
          <div className="mx-auto mt-10 max-w-4xl divide-y divide-line border-y border-line">
            {fullCourses.map((c) => {
              const m = buildCourseDetail(c, courseDetails[c.slug], undefined);
              return (
                <article key={c.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                  <div>
                    <h3 className="text-lg font-bold text-heading">{m.displayTitle}</h3>
                    <p className="mt-1 text-sm leading-6 text-body">
                      {m.heldBack ? "Course details to be confirmed" : c.category}
                    </p>
                  </div>
                  <Link
                    href={`/trainings/${c.slug}`}
                    className="text-sm font-bold text-action hover:text-action-dark"
                  >
                    View the course →
                  </Link>
                </article>
              );
            })}
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
            {fullCourses
              .filter((c) => buildLpModel(c.slug) !== null)
              .map((c) => (
              <Link
                key={c.slug}
                href={`/lp/${c.slug}-in-hyderabad`}
                className="rounded-full border border-line bg-surface-light px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-brand hover:text-action-dark"
              >
                {buildCourseDetail(c, courseDetails[c.slug], undefined).displayTitle} in Hyderabad
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <SectionTitle label="Questions" title="Visiting us — quick answers" center />
            <div className="mt-8 space-y-3">
              {localFaqs.map((f) => (
                <details
                  key={f.q}
                  className="rounded-2xl border border-line bg-surface-light px-6 py-5"
                >
                  <summary className="cursor-pointer font-display text-[17px] font-semibold text-heading">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-[15px] leading-7 text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
