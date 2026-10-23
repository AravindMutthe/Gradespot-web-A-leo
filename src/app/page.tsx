import Image from "next/image";
import Link from "next/link";
import { getCourses, getServices } from "@/lib/data";
import { homeParagraphs } from "@/data/pages";
import { team } from "@/data/team";
import { CourseCard, CtaBand, ExperienceBadge, FaqList, FeatureTrio, SectionTitle, ServiceCard, SignatureBlock, StatsRibbon, siteFaqs } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export default async function HomePage() {
  const [courses, services] = await Promise.all([getCourses(), getServices()]);
  const featuredCourses = courses.filter((c) => !c.catalogOnly).slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(siteFaqs)} />
      {/* Hero — corporate split layout; headline and copy as published on the live homepage */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef3f8_0%,#ffffff_92%)]">
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="max-w-xl font-display text-[42px] font-bold leading-[1.1] text-heading md:text-[64px]">
              We Create Better <span className="font-extrabold text-brand">IT Solutions</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-body">{homeParagraphs[1]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/trainings" className="btn-primary">
                Explore Trainings
              </Link>
              <Link href="/services" className="btn-outline-navy">
                Our Services
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              className="absolute -right-4 -top-4 h-full w-full rounded-3xl border-2 border-brand"
              aria-hidden
            />
            <Image
              src="/images/courses/ceh.jpg"
              alt="Certified Ethical Hacker [CEH v13]"
              width={800}
              height={600}
              className="relative h-auto w-full rounded-3xl object-cover shadow-2xl"
              priority
            />
            <Link
              href="/trainings/certified-ethical-hacker-ceh"
              className="absolute bottom-4 left-4 rounded-full bg-navy/90 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur transition-colors hover:text-brand"
            >
              Certified Ethical Hacker [CEH v13] →
            </Link>
          </div>
        </div>
      </section>

      {/* What we do — the four published homepage blurbs */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="What We Do" title="Transform every Digital Process" center />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Top Class Trainings", d: homeParagraphs[2] },
              { t: "Web Design & Development", d: homeParagraphs[3] },
              { t: "Cyber Security", d: homeParagraphs[4] },
              { t: "Digital Marketing", d: homeParagraphs[5] },
            ].map((x) => (
              <article
                key={x.t}
                className="rounded-2xl border border-[#dbe4ee] bg-white px-8 py-10 shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(10,34,54,0.12)]"
              >
                <span className="block h-1 w-10 rounded-full bg-brand" aria-hidden />
                <h3 className="mt-4 text-xl font-bold">{x.t}</h3>
                <p className="mt-2 text-sm leading-6">{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <article className="rounded-2xl border border-[#dbe4ee] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">An ISO Certified Company</h3>
              <p className="mt-2 text-sm leading-6">{homeParagraphs[8]}</p>
            </article>
            <article className="rounded-2xl border border-[#dbe4ee] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">AICTE Internships Approved</h3>
              <p className="mt-2 text-sm leading-6">{homeParagraphs[10]}</p>
            </article>
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
                  className="mx-auto h-56 w-full rounded-2xl object-cover"
                />
                <h4 className="mt-3 text-lg font-semibold">{m.name}</h4>
                <p className="text-sm text-brand">{m.role}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/team-members" className="text-sm font-semibold text-brand hover:underline">
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

      <CtaBand />
    </>
  );
}
