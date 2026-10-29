import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { business, telHref } from "@/data/site";
import { buildLpModel, courseSlugForLpSlug, lpSlugFor } from "@/lib/lp-model";
import { lpPageMetadata } from "@/lib/metadata";
import { courseSchema } from "@/lib/schema";
import { waLink } from "@/lib/wa";
import JsonLd from "@/components/JsonLd";
import LpLeadForm from "@/components/LpLeadForm";

// LP rebuild (Frontend 3.0, Das 7-step spine — Leo's 13 steps
// mapped into it; see docs/frontend-v2/LP-REBUILD-CHECKPOINT
// for the layout matrix):
//   Chrome: slim strip + logo/phone bar (logo + phone pill only,
//   no site nav, no site search, no site footer — LP stays
//   nav-free; the bar wraps at narrow widths so it never crops
//   the logo or the phone pill at max zoom).
//   1 Compact hero: eyebrow (domain category) + H1 + CTAs +
//      summary card (duration / mode / location / certification /
//      vendor mark).
//   2 Learning overview: level / mode / location + the
//      cybersecurity framing line (variant b only).
//   3 Enquiry panel: enquiry info + LpLeadForm (one clear
//      primary action; no price, no batch date).
//   4 Syllabus and practical topics: verified module AREAS as
//      rows + the gated full-syllabus block (enquiry CTA).
//   5 Intended audience: who + suitability (roles live in
//      outcomes, not here).
//   6 Learning outcomes: certification alignment qualifier +
//      preparation roles + the Digital Marketing measurement
//      line (variant c only).
//   Proof (matched only) -> cross-link -> 7 Final enquiry.
//   Sticky bottom bar: Call / WhatsApp / Free Counselling.
// Labs: none shown (no approved labs exist — a labs section is
// omitted rather than asserted). FAQs: none (no source-supported
// answers exist — step 7 collapses to the final enquiry action
// and carries NO FAQ schema). Imageless: no course photos, no
// art, no stock — text first (purge gates: no vendor images).
// No fixed-height cards, no fixed
// pixel widths, no nowrap anywhere — max-zoom reflow is
// structural (visual verification still owed to the parent).
export function generateStaticParams() {
  // Purge gates: only LPs whose model builds are emitted. Held
  // courses (CCNA, CCNP, Digital Marketing) return null from
  // buildLpModel, so no path — and no 404 shell — is generated
  // for them; their routes 404 at request time instead.
  return courses
    .filter((c) => !c.catalogOnly && buildLpModel(c.slug) !== null)
    .map((c) => ({ slug: lpSlugFor(c.slug) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const courseSlug = courseSlugForLpSlug(slug);
  const lp = courseSlug ? buildLpModel(courseSlug) : null;
  if (!lp) return {};
  return lpPageMetadata(lp, `/lp/${lp.lpSlug}`);
}

export default async function LpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const courseSlug = courseSlugForLpSlug(slug);
  const lp = courseSlug ? buildLpModel(courseSlug) : null;
  if (!lp) notFound();

  const course = courses.find((c) => c.slug === lp.slug)!;
  const phone = business.phones[0];

  return (
    <main>
      <JsonLd
        data={courseSchema(course, {
          displayTitle: lp.displayTitle,
          suppressOffers: true,
          description: lp.metaDescription,
        })}
      />

      {/* Chrome: slim strip + logo/phone bar. No nav, no search. */}
      <div className="bg-ink-deep">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-[12px] font-medium tracking-wide text-footer-text">
          <span>{business.locationLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Online &amp; Offline Classes</span>
        </div>
      </div>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 md:px-6">
          <Link href="/" className="flex items-center" aria-label="GradeSpot IT Solutions — home">
            <Image
              src="/images/logo.png"
              alt="GradeSpot IT Solutions"
              width={180}
              height={44}
              className="h-11 w-auto"
              priority
            />
          </Link>
          <a
            href={telHref(phone)}
            className="flex min-h-[44px] shrink-0 items-center rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-heading"
          >
            Call: {phone}
          </a>
        </div>
      </header>

      {/* Step 1 — compact hero. */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:px-6 lg:grid-cols-[1.6fr_1fr] lg:py-16">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/85">
              {lp.category} · Hyderabad
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.15] text-white md:text-[46px]">
              {lp.h1}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#leadform" className="btn-primary min-h-[44px] px-6 py-3">
                Enquire Now
              </a>
              <a href="#syllabus" className="btn-outline-light min-h-[44px] px-6 py-3">
                View Syllabus
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6 text-[15px] text-body">
            <dl className="space-y-3">
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <dt className="font-semibold text-heading">Duration:</dt>
                <dd>{lp.durationLabel}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <dt className="font-semibold text-heading">Mode:</dt>
                <dd>{lp.mode}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <dt className="font-semibold text-heading">Location:</dt>
                <dd>{business.locationLabel}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <dt className="font-semibold text-heading">Certification:</dt>
                <dd>{lp.certification}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Step 2 — learning overview. */}
      <section className="section-pad bg-canvas">
        <div className="wrap">
          <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
            Learning overview
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-heading">Level</p>
              <p className="mt-2 text-[15px] leading-6 text-body">
                {lp.level}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-heading">Mode</p>
              <p className="mt-2 text-[15px] leading-6 text-body">
                {lp.mode}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-heading">Location</p>
              <p className="mt-2 text-[15px] leading-6 text-body">
                {business.locationLabel}
              </p>
            </div>
          </div>
          {lp.variant === "cybersecurity" && (
            <p className="mt-6 max-w-3xl text-[15px] leading-6 text-body">
              Coverage focuses on authorized testing and defensive practice.
            </p>
          )}
        </div>
      </section>

      {/* Step 3 — enquiry panel (form out of the hero, per Das). */}
      <section id="leadform" className="scroll-mt-6 border-t border-line bg-surface section-pad">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
              Enquire about this course
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-body">
              Share your details and the team will respond to your enquiry. Batch, schedule and
              fees are confirmed on enquiry. A demo class can be arranged — ask about a demo and
              availability is confirmed on enquiry. The full syllabus is shared by the GradeSpot
              team after enquiry — via WhatsApp or mail.
            </p>
            <a
              href={waLink(
                `Hi GradeSpot, I want to know more about ${lp.displayTitle} training in Hyderabad.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-xl bg-wa px-5 py-2.5 font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Chat on WhatsApp →
            </a>
          </div>
          <LpLeadForm courseTitle={lp.displayTitle} />
        </div>
      </section>

      {/* Step 4 — syllabus and practical topics (areas public, detail gated). */}
      <section id="syllabus" className="scroll-mt-6 border-t border-line bg-canvas section-pad">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
              Syllabus and practical topics
            </h2>
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {lp.topics.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-2 rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] leading-6"
              >
                <span aria-hidden="true" className="font-bold text-signal">✓</span>
                <span className="text-body">{topic}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-line bg-surface p-7">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-xl font-bold text-heading">
                Full syllabus — shared after enquiry
              </h3>
            </div>
            <p className="mt-2 text-[15px] leading-6 text-body">
              The complete syllabus is shared by the GradeSpot team after enquiry — via WhatsApp or
              mail. The topics above are the public coverage; lesson-level detail is not published
              here.
            </p>
            <a href="#leadform" className="btn-primary mt-4 inline-block min-h-[44px] px-6 py-3">
              Enquire for the Full Syllabus
            </a>
          </div>
        </div>
      </section>

      {/* Step 5 — intended audience. */}
      <section className="border-t border-line bg-surface section-pad">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
              Who it&apos;s for
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-[15px] leading-6 text-body">
            {lp.who}
          </p>
        </div>
      </section>

      {/* Step 6 — learning outcomes (supported objectives only). */}
      <section className="border-t border-line bg-canvas section-pad">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
              Learning outcomes
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-[15px] leading-6 text-body">
            {lp.outcomeLine}
          </p>
          {lp.variant === "digital-marketing" && (
            <p className="mt-4 max-w-3xl text-[15px] leading-6 text-body">
              Measurement covered: marketing analytics and campaign measurement.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {lp.roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-body"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Proof — matched testimonials only, never a fallback. */}
      {lp.testimonial && (
        <section className="border-t border-line bg-surface section-pad">
          <div className="wrap">
            <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
              What students say
            </h2>
            <blockquote className="mt-6 max-w-3xl rounded-2xl border border-line bg-canvas p-7">
              <p className="text-[15px] leading-6 text-body">&ldquo;{lp.testimonial.text}&rdquo;</p>
              <footer className="mt-4 text-sm text-body">
                — {lp.testimonial.name}
                <span className="text-muted"> · Posted on Google</span>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* Cross-link — verified course link (no LP links into the site). */}
      <section className="border-t border-line bg-surface section-pad">
        <div className="wrap">
          <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
            See the full course page
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-6 text-body">
            More detail on {lp.displayTitle} — including the full course description and related
            courses — is on the course page.
          </p>
          <Link href={`/trainings/${lp.slug}`} className="btn-secondary mt-4 inline-block min-h-[44px] px-6 py-3">
            View the course page →
          </Link>
        </div>
      </section>

      {/* Step 7 — final enquiry (FAQ collapses here: no
          source-supported answers exist, so no FAQ section and
          no FAQ schema on any LP). */}
      <section className="border-t border-line bg-canvas section-pad">
        <div className="wrap text-center">
          <h2 className="font-display text-2xl font-bold text-heading md:text-3xl">
            Ready to learn {lp.short}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-6 text-body">
            Enquire about {lp.displayTitle} — batch, schedule and fees are confirmed on enquiry.
          </p>
          <a href="#leadform" className="btn-primary mt-6 inline-block min-h-[44px] px-6 py-3">
            Enquire Now
          </a>
        </div>
      </section>

      {/* Neutral footer (no legal-entity claim). */}
      <footer className="bg-ink-deep pb-24 nav:pb-20">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4 text-[13px] text-footer-text md:px-6">
          <span>GradeSpot IT Solutions — {business.locationLabel}</span>
          <a href={telHref(phone)} className="font-semibold">
            {phone}
          </a>
        </div>
      </footer>

      {/* Sticky bar: Call / WhatsApp / Free Counselling. */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex bg-ink shadow-[0_-2px_8px_rgba(16,35,63,0.25)]">
        <a
          href={telHref(phone)}
          className="flex min-h-[44px] flex-1 items-center justify-center px-1 text-center text-[12px] font-bold text-white"
        >
          Call Now
        </a>
        <a
          href={waLink(`Hi GradeSpot, I have a question about ${lp.displayTitle}.`)}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[44px] flex-1 items-center justify-center px-1 text-center text-[12px] font-bold text-white"
        >
          WhatsApp
        </a>
        <a
          href="#leadform"
          className="flex min-h-[44px] flex-1 items-center justify-center px-1 text-center text-[12px] font-bold text-white"
        >
          Free Counselling
        </a>
      </div>
    </main>
  );
}
