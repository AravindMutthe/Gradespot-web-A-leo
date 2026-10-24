import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses as localCourses } from "@/data/courses";
import { courseDetails } from "@/data/course-details";
import { testimonials } from "@/data/testimonials";
import { business, telHref } from "@/data/site";
import { getCourse } from "@/lib/data";
import { generatedCourseFaqs, getJobRoles } from "@/lib/course-faqs";
import { courseWaLink, syllabusWaLink } from "@/lib/wa";
import { courseSchema, faqSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import LpLeadForm from "@/components/LpLeadForm";
import { FaqList } from "@/components/ui";

// City × course landing pages (research expansion pack, DECISIONS.md
// §18) — the ppc report's playbook (tactics 1–5) and the folder-1
// local-SEO matrix, applied to the 11 full courses:
//   /lp/<course>-in-hyderabad
// Nav-free chrome (the layout's Chrome switch drops the global
// header/footer here), message-matched H1 (course + city), ONE primary
// CTA repeated in identical words ("Get My Free Counselling Call"),
// a 3-field form above the fold, per-course pre-filled WhatsApp, a
// sticky mobile Call/WhatsApp/CTA bar, and content strictly from the
// course's real published data — topics, outcomes, job roles, and
// duration/fees only where published. No batch dates exist anywhere in
// the record, so none are shown.

const CTA = "Get My Free Counselling Call";

// One verbatim Google testimonial per LP (proof next to the ask, ppc
// report §1.6) — chosen by course where a matching review exists.
const testimonialBySlug: Record<string, string> = {
  "soc-analyst": "M Vamsi",
  "azure-administrator-az-104": "Arif Syed",
  "certified-ethical-hacker-ceh": "Kammarapalli pallavi",
};

function lpSlug(courseSlug: string) {
  return `${courseSlug}-in-hyderabad`;
}

export function generateStaticParams() {
  return localCourses.filter((c) => !c.catalogOnly).map((c) => ({ slug: lpSlug(c.slug) }));
}

async function resolve(slug: string) {
  if (!slug.endsWith("-in-hyderabad")) return null;
  const courseSlug = slug.slice(0, -"-in-hyderabad".length);
  const course = await getCourse(courseSlug);
  if (!course || course.catalogOnly) return null;
  return course;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await resolve(slug);
  if (!course) return { title: "Training in Hyderabad" };
  const d = courseDetails[course.slug];
  const short = d?.short ?? course.title;
  return {
    alternates: { canonical: `/lp/${slug}` },
    title: `${short} Training in Hyderabad`,
    description: `${short} training in Hyderabad at GradeSpot IT Solutions, Dilsukhnagar — online & offline classes. ${d?.outcome ?? "Book a free counselling call."}`,
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await resolve(slug);
  if (!course) notFound();

  const d = courseDetails[course.slug];
  const short = d?.short ?? course.title;
  const roles = getJobRoles(course);
  const faqs = generatedCourseFaqs(course).slice(0, 5);
  const tName = testimonialBySlug[course.slug] ?? "naresh chepuri";
  const testimonial = testimonials.find((t) => t.name === tName) ?? testimonials[0];
  const phone = business.phones[0];

  const facts: string[] = [];
  if (course.duration) facts.push(`Duration: ${course.duration}`);
  facts.push("Online & Offline Classes");
  facts.push("Dilsukhnagar, Hyderabad");
  if (d) facts.push(`Certification: ${d.certification}`);

  return (
    <>
      <JsonLd data={courseSchema(course)} />
      <JsonLd data={faqSchema(faqs)} />

      {/* Slim utility strip (location line only — the theme toggle
          moved to the floating button, §25.9; the LP stays nav-free). */}
      <div className="bg-ink-deep text-footer-text">
        <div className="wrap flex items-center justify-between gap-3 py-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            {business.locationLabel}
          </p>
        </div>
      </div>

      {/* LP chrome: logo + phone only, no nav. Logo carries the
          same §22 luminous plate as the main header (.logo-plate,
          §25 per-theme variant + official light artwork in dark). */}
      <div className="glass-panel border-b border-line">
        <div className="wrap flex items-center justify-between py-3">
          <Link
            href="/"
            aria-label="GradeSpot IT Solutions — Home"
            className="logo-plate rounded-2xl px-3 py-1 ring-1 ring-line"
          >
            <span className="dark:hidden">
              <Image
                src="/images/logo.png"
                alt="GradeSpot IT Solutions"
                width={193}
                height={60}
                className="h-11 w-auto"
                priority
              />
            </span>
            <span className="hidden dark:block">
              <Image
                src="/images/logo-light.png"
                alt="GradeSpot IT Solutions"
                width={193}
                height={60}
                className="h-11 w-auto"
                priority
              />
            </span>
          </Link>
          <a
            href={telHref(phone)}
            className="flex min-h-[44px] items-center rounded-full border border-heading/30 px-4 py-2 text-sm font-semibold text-heading transition-colors hover:border-brand hover:text-signal"
          >
            {phone}
          </a>
        </div>
      </div>

      {/* Hero: message-matched H1 + form above the fold */}
      <section className="panel-ink py-10 md:py-14">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brand-bright">
              Hyderabad · {course.category}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.15] md:text-[46px]">
              {short} Training in Hyderabad
            </h1>
            {d && <p className="mt-4 max-w-xl text-base leading-7 text-white/85">{d.outcome}.</p>}
            <ul className="mt-6 space-y-2.5 text-[15px] text-white/90">
              {d && (
                <li>
                  <span className="mr-2 font-bold text-brand-bright">✓</span>For: {d.who}
                </li>
              )}
              <li>
                <span className="mr-2 font-bold text-brand-bright">✓</span>Hands-on labs and live
                classes — not just theory
              </li>
              {roles.length > 0 && (
                <li>
                  <span className="mr-2 font-bold text-brand-bright">✓</span>Prepares you for roles
                  like {roles.slice(0, 3).join(", ")}
                </li>
              )}
              <li>
                <span className="mr-2 font-bold text-brand-bright">✓</span>Free demo class available —
                ask when our counsellor calls
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#leadform" className="btn-primary">
                {CTA}
              </a>
              <a
                href={syllabusWaLink(course.title)}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-light"
              >
                Get the Syllabus on WhatsApp
              </a>
            </div>
          </div>
          <div id="leadform" className="scroll-mt-6">
            <LpLeadForm courseTitle={course.title} />
            <p className="mt-4 rounded-xl bg-white/[0.07] px-5 py-4 text-sm leading-6 text-white/85 ring-1 ring-white/10">
              <span className="font-semibold text-white">{testimonial.name}</span> — “
              {testimonial.text}”{" "}
              <span className="text-white/60">({testimonial.source})</span>
            </p>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="border-b border-line bg-surface-light">
        <div className="wrap flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-semibold text-heading">
          {facts.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </section>

      {/* Topics + roles */}
      <section className="section-pad">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[28px] font-bold leading-[34px] text-heading">
              What you will learn
            </h2>
            {d ? (
              <ul className="mt-5 space-y-3">
                {d.topics.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-6 text-body">
                    <span className="mt-1 font-bold text-signal">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[15px] leading-7 text-body">{course.summary}</p>
            )}
            <div className="mt-8">
              <a href="#leadform" className="btn-primary">
                {CTA}
              </a>
            </div>
          </div>
          <div>
            {roles.length > 0 && (
              <>
                <h2 className="text-[28px] font-bold leading-[34px] text-heading">
                  Roles this training prepares you for
                </h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-surface-light px-4 py-2 text-sm font-semibold text-heading"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </>
            )}
            <div className="mt-8 rounded-2xl border border-line bg-surface-light p-6">
              <h3 className="text-lg font-bold text-heading">Prefer to read everything first?</h3>
              <p className="mt-2 text-sm leading-6 text-body">
                The full course page carries the complete curriculum, every section and the
                enquiry form.
              </p>
              <Link
                href={`/trainings/${course.slug}`}
                className="mt-3 inline-block text-sm font-bold text-signal hover:text-signal-strong"
              >
                See the full {short} course page →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + final CTA repeat */}
      <section className="bg-surface-light section-pad">
        <div className="wrap mx-auto max-w-3xl">
          <h2 className="text-center text-[28px] font-bold leading-[34px] text-heading">
            Quick answers
          </h2>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
          <div className="mt-10 text-center">
            <a href="#leadform" className="btn-primary">
              {CTA}
            </a>
            <p className="mt-3 text-sm text-body">
              Same offer, one button — or{" "}
              <a
                href={courseWaLink(course.title)}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-signal hover:underline"
              >
                WhatsApp us instead →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* LP footer: minimal, no nav */}
      <footer className="bg-ink-deep py-8 pb-24 text-sm text-footer-text nav:pb-8">
        <div className="wrap flex flex-wrap items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {business.legalName}
          </p>
          <p>
            {phone} · {business.address}
          </p>
        </div>
      </footer>

      {/* Sticky mobile action bar (LP pattern) */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-white/10 bg-ink-deep text-center nav:hidden">
        <a href={telHref(phone)} className="py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-white active:bg-white/10">
          Call Now
        </a>
        <a
          href={courseWaLink(course.title)}
          target="_blank"
          rel="noreferrer"
          className="border-x border-white/10 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-wa-bright active:bg-white/10"
        >
          WhatsApp
        </a>
        <a href="#leadform" className="py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-bright active:bg-white/10">
          Free Counselling
        </a>
      </div>
    </>
  );
}
