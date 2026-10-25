import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCourses, getServices } from "@/lib/data";
import { homeParagraphs } from "@/data/pages";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { BlogCards, CourseCard, CredentialCard, CtaBand, ExperienceBadge, FaqList, FeatureTrio, ForInstitutesBand, SectionTitle, ServiceCard, SignatureBlock, StatsRibbon, siteFaqs, AnswerLead } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
  },
  description:
    "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
  alternates: { canonical: "/", languages: { en: "/" } },
  openGraph: {
    title: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
    images: [{ url: "/images/og/home.jpg" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
    images: ["/images/og/home.jpg"],
  },
};
import Ticker from "@/components/Ticker";
import PromoBanner from "@/components/PromoBanner";
import OfferCards from "@/components/OfferCards";
import { faqSchema, webPageSchema } from "@/lib/schema";

// Homepage 2.0 — docs/frontend-v2/SPEC.md §4, eleven sections in
// order, reusing existing content/components. No new claims, no new
// routes, no invented offers. Hero represents the full offering:
// a four-domain image grid, NOT a single CEH course. CEH appears
// only in §4 as one featured cybersecurity program card.

const heroDomains = [
  { label: "Cybersecurity", href: "/trainings#category-cybersecurity", img: "/images/courses/cybersecurity-technologies.jpg" },
  { label: "Cloud Computing", href: "/trainings#category-aws", img: "/images/courses/aws-solutions-architect-associate.jpg" },
  { label: "Networking", href: "/trainings#category-cisco", img: "/images/courses/ccna.jpg" },
  { label: "Software & Data", href: "/trainings#category-programming-data", img: "/images/courses/java-full-stack.jpg" },
];

export default async function HomePage() {
  const [courses, services] = await Promise.all([getCourses(), getServices()]);
  const countIn = (...cats: string[]) => courses.filter((c) => cats.includes(c.category)).length;
  const findCourse = (slug: string) => courses.find((c) => c.slug === slug);
  const ceh = findCourse("certified-ethical-hacker-ceh");
  const labCourses = ["certified-ethical-hacker-ceh", "ccna-200-301", "azure-administrator-az-104", "soc-analyst"]
    .map(findCourse)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const proofTestimonials = testimonials.slice(0, 3);

  const domains = [
    { t: "Cybersecurity", href: "/trainings#category-cybersecurity", n: countIn("Cybersecurity") },
    { t: "Cloud Computing", href: "/trainings", n: countIn("AWS", "Microsoft Azure") },
    { t: "Networking & Infrastructure", href: "/trainings#category-cisco", n: countIn("Cisco", "Networking") },
    { t: "Software & Data", href: "/trainings#category-programming-data", n: countIn("Programming & Data") },
    { t: "Other Programs", href: "/trainings#category-medical-coding", n: countIn("Medical Coding", "Digital Marketing", "Design & CAD") },
  ];
  const vendors = [
    { t: "AWS Training", href: "/trainings#category-aws", n: countIn("AWS") },
    { t: "Microsoft Azure Training", href: "/trainings#category-microsoft-azure", n: countIn("Microsoft Azure") },
    { t: "Cisco Training", href: "/trainings#category-cisco", n: countIn("Cisco") },
    { t: "CompTIA Training", href: "/trainings#category-comptia", n: countIn("CompTIA") },
    { t: "Cybersecurity Training", href: "/trainings#category-cybersecurity", n: countIn("Cybersecurity") },
  ];

  return (
    <>
      <JsonLd data={faqSchema(siteFaqs)} />
      <JsonLd data={webPageSchema("/", "GradeSpot IT Solutions", "#answer-summary")} />

      {/* 01 · Hero — full offering, two customer pathways */}
      <section className="hero-paper relative overflow-hidden border-b border-line" aria-label="Hero">
        <div className="wrap grid items-center gap-12 py-6 md:py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <p className="eyebrow text-signal-strong">Hyderabad, India · Online &amp; Classroom Training</p>
            <h1 className="mt-4 max-w-xl font-display text-[44px] font-semibold leading-[1.05] text-heading md:text-[68px]">
              Technology Training <span className="font-medium italic text-signal">and IT Solutions</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-body">{homeParagraphs[1]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact-us" className="btn-primary">
                Talk to an Advisor
              </Link>
              <Link href="/trainings" className="btn-outline-navy">
                Explore Programs
              </Link>
            </div>
            <p className="mt-4 text-sm text-body">
              Two pathways: <Link href="/trainings" className="font-semibold text-signal hover:underline">I&apos;m learning →</Link>
              {" "}·{" "}
              <Link href="/services" className="font-semibold text-signal hover:underline">I need IT services →</Link>
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]" data-reveal>
            <div className="grid grid-cols-2 gap-3">
              {heroDomains.map((d) => (
                <Link key={d.label} href={d.href} className="group relative block overflow-hidden rounded-[18px]">
                  <Image
                    src={d.img}
                    alt={d.label}
                    width={400}
                    height={300}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-3 left-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-[12px] font-semibold text-paper">
                    {d.label}
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-center text-sm text-body">
              Cybersecurity, cloud, networking and software — plus the full catalogue on the Trainings page.
            </p>
          </div>
        </div>
      </section>

      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot IT Solutions is an IT training institute and services company in
          Dilsukhnagar, Hyderabad. It offers {courses.length} trainings in cybersecurity,
          cloud, networking, programming, data and digital marketing, with online and
          offline classes, plus corporate training, internships and IT services. Learners
          can start with a free demo class.
        </AnswerLead>
      </div>

      <Ticker />

      {/* 02 · Choose Your Path */}
      <section className="section-pad" aria-label="Choose your path">
        <div className="wrap">
          <SectionTitle label="02 · Choose Your Path" title="Who are you here for?" center />
          <div className="mt-10 grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { audience: "Students", title: "Trainings & Free Demo Classes", href: "/trainings" },
              { audience: "Professionals", title: "Upskill & Certification Preparation", href: "/trainings" },
              { audience: "Businesses", title: "IT Services & Consulting", href: "/services" },
              { audience: "Institutions", title: "Workshops, Internships & Collaboration", href: "/for-institutes" },
            ].map((d, i) => (
              <Link
                key={d.audience}
                href={d.href}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className="group flex items-center justify-between gap-4 rounded-[16px] border border-line bg-parchment px-6 py-5 shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(31,24,16,0.12)]"
              >
                <span>
                  <span className="eyebrow block text-[10.5px] text-signal-strong">{d.audience}</span>
                  <span className="mt-1.5 block font-display text-[17.5px] font-semibold leading-snug text-heading">
                    {d.title}
                  </span>
                </span>
                <span aria-hidden className="font-display text-xl text-signal transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · Explore Technology Domains */}
      <section className="bg-surface-light section-pad" aria-label="Explore technology domains">
        <div className="wrap">
          <SectionTitle label="03 · Explore Technology Domains" title="Find your domain" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {domains.map((d) => (
              <Link
                key={d.t}
                href={d.href}
                className="group rounded-2xl border border-line bg-parchment px-6 py-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
              >
                <span className="block font-display text-[19px] font-semibold leading-snug text-heading group-hover:text-signal">{d.t}</span>
                <span className="mt-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-signal-strong">
                  {d.n} training{d.n === 1 ? "" : "s"}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/trainings" className="btn-primary">View All Trainings</Link>
          </div>
        </div>
      </section>

      <div className="pb-4">
        <PromoBanner />
      </div>

      {/* 04 · Certification Pathways — vendor training only, no guarantees */}
      <section className="section-pad" aria-label="Certification pathways">
        <div className="wrap">
          <SectionTitle label="04 · Certification Pathways" title="Training toward industry certifications" center />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-body">
            These are training programs in each vendor area. Certification itself is awarded
            by the vendor/exam body, not by this page.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {vendors.map((v) => (
              <Link
                key={v.t}
                href={v.href}
                className="group rounded-2xl border border-line bg-parchment px-6 py-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
              >
                <span className="block font-display text-[19px] font-semibold leading-snug text-heading group-hover:text-signal">{v.t}</span>
                <span className="mt-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-signal-strong">
                  {v.n} training{v.n === 1 ? "" : "s"}
                </span>
              </Link>
            ))}
          </div>
          {ceh && (
            <div className="mt-10">
              <p className="eyebrow text-center text-signal-strong">Featured Cybersecurity Program</p>
              <div className="mx-auto mt-4 max-w-md">
                <CourseCard course={ceh} />
              </div>
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/student-certifications" className="text-sm font-bold text-signal hover:underline">Student Certifications →</Link>
            <Link href="/certificate-verification" className="text-sm font-bold text-signal hover:underline">Verify a Certificate →</Link>
          </div>
        </div>
      </section>

      {/* 05 · Hands-on Learning — labs inside courses, no standalone portal */}
      <section className="bg-surface-light section-pad" aria-label="Hands-on learning">
        <div className="wrap">
          <SectionTitle label="05 · Hands-on Learning" title="Learn by doing, inside the course" center />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-body">
            There is no separate labs portal yet. Hands-on labs, simulations and projects are
            delivered inside these training programs, as described on their course pages.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {labCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/trainings" className="btn-primary">Explore Programs</Link>
          </div>
        </div>
      </section>

      {/* 06 · Professional IT Solutions */}
      <section className="section-pad" aria-label="Professional IT solutions">
        <div className="wrap">
          <SectionTitle label="06 · Professional IT Solutions" title="Security, infrastructure, software, digital and consulting" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-primary">All Services</Link>
          </div>
        </div>
      </section>

      {/* 07 · Why GradeSpot — published copy, credentials, features */}
      <section className="bg-surface-light section-pad" aria-label="Why GradeSpot">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="07 · Why GradeSpot"
              title="We assist companies in enhancing their digital presence and fortifying their Security"
            />
            <p className="mt-4">{homeParagraphs[6]}</p>
            <div className="mt-6">
              <ExperienceBadge />
            </div>
            <Link href="/about-us" className="btn-primary mt-6">
              About Us
            </Link>
            <div className="mt-8">
              <SignatureBlock />
            </div>
          </div>
          <div className="space-y-6">
            <CredentialCard title="An ISO Certified Company" body={homeParagraphs[8]} seal="iso" />
            <CredentialCard title="AICTE Internships Approved" body={homeParagraphs[10]} seal="aicte" />
          </div>
        </div>
      </section>

      <FeatureTrio />

      {/* 08 · Enterprise & Institutional Programs */}
      <section className="section-pad" aria-label="Enterprise and institutional programs">
        <div className="wrap">
          <SectionTitle label="08 · Enterprise & Institutional Programs" title="For colleges, institutes and businesses" center />
          <div className="mt-10 grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "For Colleges", d: "Workshops, industrial trainings and internships at your campus.", href: "/for-colleges" },
              { t: "For Institutes", d: "Admissions automation, learning hub and labs — book a live demo.", href: "/for-institutes" },
              { t: "Partner With Us", d: "Collaborations and franchise discussions are welcome.", href: "/partner-with-us" },
              { t: "Corporate & International", d: "Corporate training and international programs.", href: "/corporate-and-international" },
            ].map((x) => (
              <Link
                key={x.t}
                href={x.href}
                className="group rounded-[16px] border border-line bg-parchment px-6 py-5 shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(31,24,16,0.12)]"
              >
                <span className="block font-display text-[17.5px] font-semibold leading-snug text-heading group-hover:text-signal">{x.t} →</span>
                <span className="mt-1.5 block text-sm leading-6 text-body">{x.d}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ForInstitutesBand />

      {/* 09 · Success & Trust — published proof only */}
      <section className="section-pad" aria-label="Success and trust">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle label="09 · Success & Trust" title="Trusted by 1,500+ Happy Learners" center />
            <p className="mt-4">{homeParagraphs[11]}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {proofTestimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-[18px] border border-line bg-parchment p-7 shadow-[0_1px_2px_rgba(31,24,16,0.05)]">
                <blockquote className="grow text-[14.5px] leading-7 text-heading">{t.text}</blockquote>
                <figcaption className="mt-4 border-t border-line pt-3.5">
                  <span className="block text-sm font-semibold text-heading">{t.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-body">{t.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/testimonials" className="text-sm font-bold text-signal hover:underline">Read all learner voices →</Link>
            <Link href="/certificate-verification" className="text-sm font-bold text-signal hover:underline">Verify a Certificate →</Link>
            <Link href="/contact-us" className="btn-primary">Talk to an Advisor</Link>
          </div>
          <h3 className="mt-14 text-center text-2xl font-semibold text-heading">Meet Our Leadership</h3>
          <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="text-center">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={350}
                  height={350}
                  sizes="(min-width:640px) 33vw, 100vw"
                  className="mx-auto h-56 w-full rounded-2xl object-cover"
                />
                <h4 className="mt-3 text-lg font-semibold">{m.name}</h4>
                <p className="text-sm text-signal">{m.role}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/team-members" className="text-sm font-semibold text-signal hover:underline">Meet Our Team →</Link>
          </div>
        </div>
      </section>

      <StatsRibbon />

      {/* 10 · Insights & Resources */}
      <section className="section-pad" aria-label="Insights and resources">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionTitle label="10 · Insights & Resources" title="Articles, guides, comparisons and FAQs" />
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/blog" className="text-sm font-bold text-signal hover:underline">Learning Articles →</Link>
              <Link href="/resources" className="text-sm font-bold text-signal hover:underline">Resources →</Link>
              <Link href="/compare" className="text-sm font-bold text-signal hover:underline">Course Comparisons →</Link>
            </div>
          </div>
          <FaqList items={siteFaqs} />
        </div>
        <div className="wrap mt-10">
          <BlogCards />
        </div>
      </section>

      {/* 11 · Speak With GradeSpot */}
      <section className="bg-surface-light section-pad" aria-label="Speak with GradeSpot">
        <div className="wrap">
          <SectionTitle label="11 · Speak With GradeSpot" title="Training enquiry, service consultation, contact" center />
          <div className="mt-10">
            <OfferCards excludeSlug="free-demo-card" />
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact-us" className="btn-primary">Talk to an Advisor</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
