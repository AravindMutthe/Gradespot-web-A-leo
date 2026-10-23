import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutParagraphs } from "@/data/pages";
import { team } from "@/data/team";
import { CtaBand, ExperienceBadge, FeatureTrio, LogoWall, PageHero, SectionTitle, SignatureBlock, StatsRibbon } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/about-us" }, title: "About Us" };

export default function AboutPage() {
  // aboutParagraphs order follows the live About page: intro, ISO, AICTE,
  // trusted-by, then the long company narrative, then process lines.
  const narrative = aboutParagraphs.slice(5, 13);
  return (
    <>
      <PageHero title="About Us — GradeSpot IT Solutions" />
      <section className="section-pad">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="About GradeSpot IT Solutions"
              title="We assist companies in enhancing their digital presence and fortifying their Security."
            />
            <p className="mt-4">{aboutParagraphs[0]}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <ExperienceBadge />
              <SignatureBlock />
            </div>
            <div className="mt-6 space-y-4">
              <article className="rounded-2xl border border-line bg-surface-light p-5">
                <h3 className="text-lg font-semibold">An ISO Certified Company</h3>
                <p className="mt-1 text-sm leading-6">{aboutParagraphs[2]}</p>
              </article>
              <article className="rounded-2xl border border-line bg-surface-light p-5">
                <h3 className="text-lg font-semibold">AICTE Internships Approved</h3>
                <p className="mt-1 text-sm leading-6">{aboutParagraphs[4]}</p>
              </article>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-heading">How We Work</h3>
            <ol className="mt-4 space-y-4">
              <li className="rounded-2xl border border-line bg-parchment p-5 shadow-sm">
                <span className="font-extrabold text-signal">01</span>
                <p className="mt-1">Explore from our range of services for your business needs</p>
              </li>
              <li className="rounded-2xl border border-line bg-parchment p-5 shadow-sm">
                <span className="font-extrabold text-signal">02</span>
                <p className="mt-1">Connect with us to schedule a meeting and discuss your needs</p>
              </li>
              <li className="rounded-2xl border border-line bg-parchment p-5 shadow-sm">
                <span className="font-extrabold text-signal">03</span>
                <p className="mt-1">
                  Talk to a Trainer — online &amp; offline classes with top-class trainings.
                </p>
              </li>
            </ol>
            <Link href="/contact-us" className="btn-primary mt-6">
              Talk to a Trainer
            </Link>
          </div>
        </div>
      </section>

      <StatsRibbon />

      <FeatureTrio />

      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Our Story" title="About GradeSpot IT Solutions" center />
          <div
            data-reveal
            className="mx-auto mt-8 max-w-4xl space-y-5 rounded-[20px] border border-line border-l-[3px] border-l-brand bg-parchment px-7 py-8 shadow-[0_1px_2px_rgba(31,24,16,0.05)] md:px-10 md:py-10"
          >
            {narrative.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[17px] leading-8 text-heading" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle title="Meet Our Leadership" center />
          <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="text-center">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={350}
                  height={350}
                  className="mx-auto h-56 w-full rounded object-cover"
                />
                <h3 className="mt-3 text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-signal">{m.role}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[18px] border border-line bg-parchment px-7 py-6 text-center shadow-[0_1px_2px_rgba(31,24,16,0.05)]">
            <h3 className="font-display text-[20px] font-semibold text-heading">
              Questions about trainings or services?
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-body">
              The answers live in one place — our Help &amp; FAQs.
            </p>
            <Link href="/faq" className="mt-3.5 inline-block text-sm font-bold text-signal hover:text-signal-strong">
              Read Help &amp; FAQs →
            </Link>
          </div>
        </div>
      </section>

      <LogoWall />

      <CtaBand />
    </>
  );
}
