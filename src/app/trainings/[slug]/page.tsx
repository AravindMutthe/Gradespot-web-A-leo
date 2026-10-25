import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses as localCourses, type CourseSection } from "@/data/courses";
import { getCourse, getCourses } from "@/lib/data";
import { coursePageMetadata } from "@/lib/metadata";
import { BlogCards, CourseCard, FaqList, FeatureTrio, LogoWall, StatsRibbon, AnswerLead } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import EnquiryRail from "@/components/EnquiryRail";
import DemoBand from "@/components/DemoBand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, courseFaqs, courseSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { generatedCourseFaqs } from "@/lib/course-faqs";
import { courseAnswerSummary } from "@/lib/aeo";
import { courseDetails } from "@/data/course-details";
import { comparisons } from "@/data/comparisons";

// Zero-click formatting (§25.23): section headings that genuinely pose
// a question the section answers are rendered as questions. Data is
// untouched — the mapping happens at render. Anything not listed here
// keeps its published heading verbatim. Variants (e.g. "Course Overview
// - CCNA 200-301 Training", "Common Job Roles After CCNA") are matched
// by prefix, so every course's wording maps the same way.
function questionHeading(heading: string, short: string): string {
  const h = heading.replace(/:\s*$/, "").trim();
  if (h.startsWith("Course Overview")) return `What is ${short}?`;
  if (h.startsWith("Common Job Roles")) return `What jobs can you get after ${short}?`;
  if (h.startsWith("Key Learning")) return `What will you learn in ${short}?`;
  if (h.startsWith("Program") && h.includes("Features")) return `What does the ${short} program include?`;
  if (h === "Course Curriculum" || h === "Our Curriculum") return `What does the ${short} curriculum cover?`;
  if (h === "Our Pricing") return `What does ${short} cost?`;
  if (h === "Our Students works for") return "Where do our students work?";
  if (h === "About This Course") return `What is ${short}?`;
  return heading;
}

// Indicative FX line for pricing cards (international build). Reference
// rates 2026-10-25, reused from the replica work (Converterhub mid-market
// via web search, Finnhub cross-check): 1 INR = 0.010534 USD, 0.007876
// GBP, 0.009403 EUR, rounded to whole units. Render-time, so it applies
// to Supabase rows too; data strings and schema offers are untouched.
// Returns null when the price string has no parseable ₹ amount.
function indicativeFx(price: string | undefined): string | null {
  if (!price) return null;
  const m = price.replace(/,/g, "").match(/₹\s*(\d+)/);
  if (!m) return null;
  const inr = Number(m[1]);
  if (!Number.isFinite(inr) || inr <= 0) return null;
  const usd = Math.round(inr * 0.010534);
  const gbp = Math.round(inr * 0.007876);
  const eur = Math.round(inr * 0.009403);
  return `≈ $${usd} · £${gbp} · €${eur} (indicative)`;
}

function SectionBody({ section }: { section: CourseSection }) {
  if (section.style === "cards") {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {section.paragraphs.map((p, j) => (
          <div
            key={j}
            className="rounded-xl border border-line bg-surface-light px-4 py-3 text-center text-[15px] font-semibold text-heading"
          >
            {p}
          </div>
        ))}
      </div>
    );
  }
  if (section.style === "pricing") {
    return (
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {section.paragraphs.map((p, j) => {
          const [name, price] = p.split(" — ");
          const fx = indicativeFx(price);
          return (
            <div
              key={j}
              className="rounded-2xl border border-line bg-parchment px-6 py-8 text-center shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-body">{name}</p>
              <p className="mt-2 text-3xl font-extrabold text-heading">{price ?? p}</p>
              {fx && <p className="mt-2 text-sm font-semibold text-body">{fx}</p>}
            </div>
          );
        })}
      </div>
    );
  }
  if (section.style === "faq") {
    return (
      <div className="mt-3 space-y-4">
        {section.paragraphs.map((p, j) =>
          j % 2 === 0 ? (
            <h3 key={j} className="pt-2 text-lg font-semibold text-heading">
              {p}
            </h3>
          ) : (
            <p key={j}>{p}</p>
          ),
        )}
      </div>
    );
  }
  return (
    <div className="mt-3 space-y-4">
      {section.paragraphs.map((p, j) => (
        <p key={j}>{p}</p>
      ))}
    </div>
  );
}

// Register strip (DECISIONS.md §20): the registration door beside
// the demo band on every course page. Links to /register with the
// course pre-selected.
function RegisterStrip({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-line bg-parchment px-7 py-6">
      <div>
        <h2 className="font-display text-[21px] font-semibold text-heading">
          Ready to register for {title}?
        </h2>
        <p className="mt-1 max-w-xl text-sm leading-6 text-body">
          Send the two-minute registration and the team will call to confirm your seat, batch
          and mode of training.
        </p>
      </div>
      <Link href={`/register?course=${slug}`} className="btn-navy">
        Register for This Course
      </Link>
    </div>
  );
}

// Corporate / B2B door on every course page (research: a corporate-training
// module belongs on course pages, not only on a separate B2B page). Copy is
// the business's own published positioning — corporate trainings are a
// published GradeSpot service and the founder's published role.
function B2BStrip() {
  return (
    <div className="mt-12 rounded-[20px] panel-ink p-8 md:flex md:items-center md:justify-between md:gap-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-paper">Training a Team or a Classroom?</h2>
        <p className="mt-2 max-w-xl text-paper/80">
          GradeSpot also runs Corporate Trainings, College Workshops and Industrial Trainings —
          the same hands-on programs, delivered for your organisation.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
        <Link href="/services/corporate-trainings" className="btn-primary">
          Corporate Trainings
        </Link>
        <Link href="/services" className="btn-outline-light">
          All Services
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return localCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "Course not found" };
  return coursePageMetadata(course, `/trainings/${slug}`);
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  // Related trainings: same published category, real catalogue data only.
  const related = (await getCourses())
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Trainings", path: "/trainings" },
    { name: course.title },
  ];

  // Research expansion (§18): generated factual FAQs (real fields only)
  // merged with the course's published FAQ sections, plus the demo path
  // and any comparison page this course appears in.
  const publishedFaqs = courseFaqs(course);
  const generatedFaqs = generatedCourseFaqs(course).filter(
    (g) => !publishedFaqs.some((p) => p.q.trim().toLowerCase() === g.q.trim().toLowerCase()),
  );
  const allFaqs = [...generatedFaqs, ...publishedFaqs];
  const comparePair = comparisons.find((c) => c.a === course.slug || c.b === course.slug);
  const detail = courseDetails[course.slug];
  const short = detail?.short ?? course.title;
  const answerSummary = courseAnswerSummary(course, detail);

  return (
    <>
      <JsonLd data={courseSchema(course)} />
      <JsonLd data={webPageSchema(`/trainings/${course.slug}`, course.title, "#answer-summary")} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trainings", path: "/trainings" },
          { name: course.title, path: `/trainings/${course.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(allFaqs)} />

      <section className="bg-ink py-6 text-white md:py-8">
        <div className="wrap">
          <Breadcrumbs
            dark
            items={crumbs}
          />
          <p className="eyebrow mt-6 text-brand-bright">
            {course.category}
          </p>
          <h1 className="mt-2 max-w-4xl text-4xl font-semibold md:text-5xl md:leading-tight">
            {course.title}
          </h1>
          {course.summary && (
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">{course.summary}</p>
          )}
          {course.duration && (
            <p className="mt-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
              Duration: {course.duration}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-4">
            <a href="#enquire" className="btn-primary">
              Enquire About This Course
            </a>
            <Link href="/trainings" className="btn-outline-light">
              All Trainings
            </Link>
          </div>
        </div>
      </section>

      {course.image && (
        <div className="wrap mt-10">
          <Image
            src={course.image}
            alt={course.title}
            width={1140}
            height={480}
            sizes="(min-width:1200px) 1140px, 100vw"
            priority
            fetchPriority="high"
            className="h-72 w-full rounded-2xl object-cover md:h-96"
          />
        </div>
      )}

      <section className="section-pad">
        <div className="wrap">
          {course.catalogOnly ? (
            <div className="mx-auto max-w-3xl">
              <AnswerLead id="answer-summary">{answerSummary}</AnswerLead>
              <h2 className="mt-8 text-[32px] font-semibold leading-[38px]">{questionHeading("About This Course", short)}</h2>
              <p className="mt-4">
                {course.title} is part of the GradeSpot IT Solutions training catalogue, offered
                at our Dilsukhnagar, Hyderabad institute with online and offline classes. Our
                organization offers an array of professional training programs for both
                corporates and students — ranging across computer hardware, networking,
                cybersecurity, cloud computing, digital marketing, data science and more — with
                comprehensive, up-to-date expertise in each technology.
              </p>
              <p className="mt-4">
                For the current batch schedule, curriculum and enrolment details for this
                course, talk to a trainer and we will walk you through the complete program.
              </p>
              <div id="enquire" className="mt-8 scroll-mt-32">
                <EnquiryRail courseTitle={course.title} />
              </div>
              <div id="demo" className="scroll-mt-32">
                <DemoBand courseTitle={course.title} />
              </div>
              <RegisterStrip slug={course.slug} title={course.title} />
              {generatedFaqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-[28px] font-semibold leading-[34px]">
                    {course.title} — FAQs
                  </h2>
                  <div className="mt-6">
                    <FaqList items={generatedFaqs} />
                  </div>
                </div>
              )}
              <B2BStrip />
            </div>
          ) : (
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_370px]">
              <div className="order-2 min-w-0 lg:order-1">
                <div className="mb-10">
                  <AnswerLead id="answer-summary">{answerSummary}</AnswerLead>
                </div>
                {/* Course facts (DECISIONS §25.37): rendered ONLY from
                    course-details for the 11 full courses that have it —
                    audience (eligibility), level, certification and
                    topics. Courses without a detail entry show nothing
                    here, never a guessed fact. Fees live in the pricing
                    sections below, duration in the hero pill, batch
                    timings stay "confirmed on enquiry" (no schedule is
                    published anywhere), and no syllabus PDF exists in
                    the repo, so no PDF is linked. */}
                {detail && (
                  <div className="mb-10 rounded-2xl border border-line bg-parchment p-7">
                    <h2 className="text-lg font-bold text-heading">Course facts</h2>
                    <dl className="mt-4 space-y-3 text-[15px] leading-7 text-body">
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                        <dt className="w-32 shrink-0 font-semibold text-heading">Who it&apos;s for</dt>
                        <dd>{detail.who}</dd>
                      </div>
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                        <dt className="w-32 shrink-0 font-semibold text-heading">Level</dt>
                        <dd>{detail.level}</dd>
                      </div>
                      <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                        <dt className="w-32 shrink-0 font-semibold text-heading">Certification</dt>
                        <dd>{detail.certification}</dd>
                      </div>
                      {detail.topics.length > 0 && (
                        <div>
                          <dt className="font-semibold text-heading">Topics covered</dt>
                          <dd className="mt-2">
                            <ul className="list-disc space-y-1 pl-5">
                              {detail.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
                <div className="space-y-12">
                  {course.sections.map((s, i) => (
                    <div key={i}>
                      <article>
                        {s.heading && (
                          <h2 className="text-[28px] font-semibold leading-[34px]">{questionHeading(s.heading, short)}</h2>
                        )}
                        <SectionBody section={s} />
                      </article>
                      {s.heading === "Visit our Blog" && (
                        <div className="mt-6">
                          <BlogCards />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div id="demo" className="scroll-mt-32">
                  <DemoBand courseTitle={course.title} />
                </div>
                <RegisterStrip slug={course.slug} title={course.title} />
                {generatedFaqs.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-[28px] font-semibold leading-[34px]">
                      {course.title} — FAQs
                    </h2>
                    <div className="mt-6">
                      <FaqList items={generatedFaqs} />
                    </div>
                  </div>
                )}
                {comparePair && (
                  <div className="mt-12 rounded-2xl border border-line bg-parchment p-8">
                    <h2 className="text-2xl font-semibold">Still deciding?</h2>
                    <p className="mt-2 max-w-xl">
                      We compared this course side-by-side with the closest alternative — topics,
                      duration, certification and roles — so you can choose with the facts in
                      front of you.
                    </p>
                    <Link
                      href={`/compare/${comparePair.slug}`}
                      className="mt-4 inline-block text-[15px] font-bold text-signal hover:text-signal-strong"
                    >
                      {comparePair.title} →
                    </Link>
                  </div>
                )}
                <div className="mt-12 rounded-2xl border border-line bg-surface-light p-8 text-center">
                  <h2 className="text-2xl font-semibold">Ready to enrol?</h2>
                  <p className="mx-auto mt-2 max-w-xl">
                    Send an enquiry and our team will help you with batches, mode of training and
                    certification guidance for {course.title}.
                  </p>
                  <a href="#enquire" className="btn-primary mt-5">
                    Enquire Now
                  </a>
                </div>
                <B2BStrip />
              </div>
              <div id="enquire" className="order-1 scroll-mt-32 lg:order-2">
                <EnquiryRail courseTitle={course.title} />
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-surface-light">
          <div className="wrap">
            <h2 className="text-[28px] font-semibold leading-[34px]">Related Trainings</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!course.catalogOnly && (
        <>
          <LogoWall />
          <StatsRibbon />
          <FeatureTrio />
        </>
      )}
    </>
  );
}
