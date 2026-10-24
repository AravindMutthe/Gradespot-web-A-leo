import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCourses, getServices } from "@/lib/data";
import { homeParagraphs } from "@/data/pages";
import { team } from "@/data/team";
import { CourseCard, CredentialCard, CtaBand, ExperienceBadge, FaqList, FeatureTrio, ForInstitutesBand, SectionTitle, ServiceCard, SignatureBlock, StatsRibbon, TestimonialSpotlight, siteFaqs } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
  },
  alternates: { canonical: "/" },
};
import Ticker from "@/components/Ticker";
import PromoBanner from "@/components/PromoBanner";
import OfferCards from "@/components/OfferCards";
import { faqSchema } from "@/lib/schema";

export default async function HomePage() {
  const [courses, services] = await Promise.all([getCourses(), getServices()]);
  const featuredCourses = courses.filter((c) => !c.catalogOnly).slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(siteFaqs)} />
      {/* Hero — corporate split layout; headline and copy as published on the live homepage */}
      <section className="hero-paper relative overflow-hidden border-b border-line">
        <div className="wrap grid items-center gap-12 py-6 md:py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <p className="eyebrow text-signal-strong">Dilsukhnagar · Hyderabad</p>
            <h1 className="mt-4 max-w-xl font-display text-[44px] font-semibold leading-[1.05] text-heading md:text-[68px]">
              We Create Better <span className="font-medium italic text-signal">IT Solutions</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-body">{homeParagraphs[1]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/trainings" className="btn-primary">
                Explore Trainings
              </Link>
              <Link href="/register" className="btn-outline-navy">
                Register
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              className="absolute -right-4 -top-4 h-full w-full rounded-[22px] border-2 border-heading"
              aria-hidden
            />
            <Image
              src="/images/courses/ceh.jpg"
              alt="Certified Ethical Hacker [CEH v13]"
              width={800}
              height={600}
              className="relative h-auto w-full rounded-[22px] object-cover shadow-[0_28px_56px_rgba(31,24,16,0.22)]"
              priority
            />
            <Link
              href="/trainings/certified-ethical-hacker-ceh"
              className="absolute bottom-4 left-4 rounded-full bg-ink/90 px-4 py-2 text-[13px] font-semibold text-paper backdrop-blur transition-colors hover:text-brand-bright"
            >
              Certified Ethical Hacker [CEH v13] →
            </Link>
          </div>
        </div>

        {/* Audience doors — the split-audience routing the nav research
            prescribes (SANS/OffSec pattern, §22): a student, an
            institute owner and a college/partner each get their door
            inside the first screen, not after a scroll hunt. */}
        <div className="wrap pb-14">
          <div className="grid gap-3.5 md:grid-cols-3">
            {[
              {
                audience: "Students & Learners",
                title: "Trainings & Free Demo Classes",
                href: "/trainings",
              },
              {
                audience: "Institute Owners",
                title: "Automate Your Admissions",
                href: "/for-institutes",
              },
              {
                audience: "Colleges & Partners",
                title: "Workshops, Internships & Collaboration",
                href: "/for-colleges",
              },
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
                <span
                  aria-hidden
                  className="font-display text-xl text-signal transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      {/* What we do — the four published homepage blurbs */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="What We Do" title="Transform every Digital Process" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Top Class Trainings", d: homeParagraphs[2], img: "/images/courses/ceh.jpg" },
              { t: "Web Design & Development", d: homeParagraphs[3], img: "/images/courses/java-full-stack.jpg" },
              { t: "Cyber Security", d: homeParagraphs[4], img: "/images/blog/Golden-Ticket-Attack.jpg" },
              { t: "Digital Marketing", d: homeParagraphs[5], img: "/images/courses/digital-marketing.jpg" },
            ].map((x, i) => (
              <article
                key={x.t}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className="group overflow-hidden rounded-2xl border border-line bg-parchment shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={x.img}
                    alt={x.t}
                    width={600}
                    height={340}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="h-36 w-full object-cover sepia-[0.12] transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="eyebrow absolute left-3 top-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-7 py-7">
                  <h3 className="text-xl font-bold">{x.t}</h3>
                  <p className="mt-2 text-sm leading-6">{x.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-4">
        <PromoBanner />
      </div>

      {/* Intro + credentials, as published */}
      <section className="bg-surface-light section-pad">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="About GradeSpot"
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
            <CredentialCard
              title="An ISO Certified Company"
              body={homeParagraphs[8]}
              seal="iso"
            />
            <CredentialCard
              title="AICTE Internships Approved"
              body={homeParagraphs[10]}
              seal="aicte"
            />
          </div>
        </div>
      </section>

      <StatsRibbon />

      {/* Trainings preview */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Trainings" title="Top Class Trainings" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/trainings" className="btn-primary">
              View All Trainings
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle label="Services" title="Elevating Minds — Unleashing Creativity" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-primary">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Offer board — the free first steps (promotions data layer, §19) */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="No-Cost First Steps" title="Start Free" center />
          <div className="mt-10">
            <OfferCards excludeSlug="free-demo-card" />
          </div>
        </div>
      </section>

      <ForInstitutesBand />

      {/* Trusted by + leadership */}
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle title="Trusted by 1,500+ Happy Learners" center />
            <p className="mt-4">{homeParagraphs[11]}</p>
          </div>
          <h3 className="mt-14 text-center text-2xl font-semibold text-heading">
            Meet Our Leadership
          </h3>
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
            <Link href="/team-members" className="text-sm font-semibold text-signal hover:underline">
              Meet Our Team →
            </Link>
          </div>
        </div>
      </section>

      <FeatureTrio />

      {/* FAQ */}
      <section className="bg-surface-light section-pad">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle label="FAQ" title="Most common question about our services" />
          <FaqList items={siteFaqs} />
        </div>
      </section>

      {/* Learner proof beside the final ask (§22) */}
      <TestimonialSpotlight />

      <CtaBand />
    </>
  );
}
