import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Course } from "@/data/courses";
import type { Service } from "@/data/services";
import { business, stats, telHref } from "@/data/site";
import { siteSettings } from "@/data/site-settings";
import { testimonials } from "@/data/testimonials";
import { servicesFaqAnswers } from "@/data/pages";
import { employers } from "@/data/employers";
import { blogPosts } from "@/data/blog";
import { services as allServices } from "@/data/services";

// Shared components in the Leo redesign v1 language ("Prospectus",
// DECISIONS.md §19): paper heroes with serif display type, mono index
// labels, parchment cards with warm shadows, ink panels. Content —
// copy, links, images — is unchanged from v1 everywhere below.

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="hero-paper border-b border-line py-6 md:py-8">
      <div className="wrap" data-reveal>
        <span className="block h-[3px] w-14 rounded-full bg-gradient-to-r from-brand-dark via-brand to-brand-bright" aria-hidden />
        <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.08] text-heading md:text-[56px]">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-3xl text-lg leading-8 text-body">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({
  label,
  title,
  center,
}: {
  label?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""} data-reveal>
      {label && (
        <p
          className={`eyebrow flex items-center gap-3 text-signal-strong ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="inline-block h-[2px] w-9 bg-brand" aria-hidden />
          {label}
          {center && <span className="inline-block h-[2px] w-9 bg-brand" aria-hidden />}
        </p>
      )}
      <h2 className="mt-3.5 text-[32px] font-semibold leading-[1.15] text-heading md:text-[38px]">
        {title}
      </h2>
    </div>
  );
}

export function StatsRibbon() {
  // Config seam (siteSettings.showCounters, OFF by default): the
  // counters are UNVERIFIED — published on the previous site, with
  // "Certified Learners" set by the owner to 1250 between two
  // conflicting published figures. They render ONLY when an admin
  // has verified them and flipped the toggle; the qualification
  // note renders with them, always. Returning null removes the
  // section entirely (no empty gap) until then.
  if (!siteSettings.showCounters) return null;
  return (
    <section className="panel-ink py-14">
      <div className="wrap grid grid-cols-2 gap-8 text-center sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <div key={s.label} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}>
            <p className="font-display text-[42px] font-semibold leading-none text-brand-bright">
              {s.value}
            </p>
            <p className="eyebrow mt-2.5 text-paper/70">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="wrap mt-8 text-center text-xs text-paper/60">{siteSettings.counterNote}</p>
    </section>
  );
}

// Presentational course card — takes plain props so the client-side
// catalogue search can render the exact same card as the server pages.
export function CourseCardBody({
  slug,
  title,
  category,
  summary,
  image,
  duration,
}: {
  slug: string;
  title: string;
  category: string;
  summary?: string;
  image?: string | null;
  duration?: string;
}) {
  return (
    <article
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-parchment shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(31,24,16,0.13)]"
    >
      {image ? (
        <Link href={`/trainings/${slug}`} className="relative block overflow-hidden" aria-label={title}>
          <Image
            src={image}
            alt={title}
            width={600}
            height={340}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="h-44 w-full object-cover sepia-[0.14] transition duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/10"
          />
          <span className="eyebrow absolute right-3 top-3 rounded-md bg-brand px-2.5 py-1.5 text-white shadow-lg">
            Free Demo
          </span>
          {duration && (
            <span className="absolute bottom-3 left-3 rounded-md bg-ink/85 px-2.5 py-1.5 font-mono text-[11.5px] font-medium text-paper">
              {duration}
            </span>
          )}
        </Link>
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-navy px-6 text-center">
          <span className="font-display text-lg font-semibold text-paper">{category}</span>
        </div>
      )}
      <div className="flex grow flex-col p-6">
        <p>
          <span className="eyebrow inline-block rounded-md bg-brand-soft px-2.5 py-1.5 text-signal-strong">
            {category}
          </span>
        </p>
        <h3 className="mt-3.5 text-[19px] font-semibold leading-snug text-heading">
          <Link href={`/trainings/${slug}`} className="transition-colors hover:text-signal">
            {title}
          </Link>
        </h3>
        {duration && !image && (
          <p className="mt-2 font-mono text-[12.5px] font-medium text-signal-strong">
            Duration — {duration}
          </p>
        )}
        {summary && <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{summary}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Link
            href={`/trainings/${slug}`}
            className="inline-block text-sm font-bold text-signal transition-colors hover:text-signal-strong"
          >
            Read More{" "}
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href={`/trainings/${slug}#demo`}
            className="inline-block rounded-lg bg-ink px-3 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-brand"
          >
            Free Demo
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <CourseCardBody
      slug={course.slug}
      title={course.title}
      category={course.category}
      summary={course.summary}
      image={course.image}
      duration={course.duration}
    />
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const idx = allServices.findIndex((s) => s.slug === service.slug);
  return (
    <article
      data-reveal
      className="group relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-parchment px-7 py-8 shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(31,24,16,0.12)]"
    >
      {idx >= 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 -top-4 font-display text-[72px] font-semibold leading-none text-heading/[0.05]"
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
      )}
      <span className="block h-[3px] w-10 rounded-full bg-brand transition-all duration-300 group-hover:w-16" aria-hidden />
      <p className="eyebrow mt-4 text-[10.5px] text-signal-strong">
        Service {idx >= 0 ? String(idx + 1).padStart(2, "0") : ""}
      </p>
      <h3 className="mt-2 text-[21px] font-semibold text-heading">
        <Link href={`/services/${service.slug}`} className="transition-colors hover:text-signal">
          {service.title}
        </Link>
      </h3>
      {service.summary && (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{service.summary}</p>
      )}
      <Link
        href={`/services/${service.slug}`}
        className="mt-auto inline-block pt-5 text-sm font-bold text-signal transition-colors hover:text-signal-strong"
      >
        Read More →
      </Link>
    </article>
  );
}

export const siteFaqs = [
  { q: "What training programs do you offer?", a: servicesFaqAnswers.trainings },
  { q: "What services do you offer?", a: servicesFaqAnswers.services },
  { q: "What's the best way to get in touch with your team?", a: servicesFaqAnswers.contact },
  {
    q: "Do you offer online or offline classes?",
    a: "Both. GradeSpot runs online and offline classes for its trainings from its institute in Dilsukhnagar, Hyderabad — live sessions with recorded videos and hands-on labs.",
  },
  {
    q: "How do I know the current batch schedule?",
    a: "Batch schedules are confirmed on enquiry — call +91 91826 54056 or send an enquiry and the team will share the current batch schedule.",
  },
  {
    q: "Can I attend a free demo class?",
    a: "Yes. GradeSpot offers a free demo class — register on the site and the team confirms the demo timing by phone.",
  },
  {
    q: "What are the fees for a training?",
    a: "Fees are published per course where a pricing section exists — for example the CCNA and CCNP plans on the course pages. For other trainings the fee is confirmed on enquiry — call +91 91826 54056. Nothing is charged before you confirm.",
  },
  {
    q: "Do your trainings prepare for certifications?",
    a: "Yes — each training prepares you for the certification named on its course page, with exam-oriented preparation as published in the curriculum. GradeSpot certificates can be verified by code on the certificate verification page.",
  },
  {
    q: "Do you guarantee placements?",
    a: "No. GradeSpot publishes the job roles each training prepares you for and the companies its students work with, and backs preparation with hands-on labs, certification guidance and career-oriented services — but it publishes no placement percentages and guarantees no job.",
  },
];

// AEO / zero-click answer-first lead (§25.22–25.23): a concise direct
// answer rendered visibly at the top of a page/section, with the detail
// after it. Text must be factual page copy only — never invented.
export function AnswerLead({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p
      id={id}
      className="rounded-2xl border border-line bg-surface-light px-6 py-5 text-[15px] leading-7 text-body"
    >
      <span className="mr-2 font-display font-semibold text-heading">In short:</span>
      {children}
    </p>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items
        .filter((f) => f.a)
        .map((f) => (
          <details
            key={f.q}
            className="faq-item rounded-2xl border border-line bg-parchment px-6 py-5 transition-shadow duration-300 hover:shadow-[0_14px_28px_rgba(31,24,16,0.08)]"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-[17px] font-semibold text-heading">
              {f.q}
              <span aria-hidden className="faq-plus shrink-0 text-xl font-normal leading-none text-signal">
                +
              </span>
            </summary>
            <p className="mt-2.5 text-[15px] leading-7 text-body">{f.a}</p>
          </details>
        ))}
    </div>
  );
}

export function CtaBand() {
  const phone = business.phones[0];
  return (
    <section className="panel-ink py-16">
      <div className="wrap flex flex-wrap items-center justify-between gap-6" data-reveal>
        <div>
          <p className="eyebrow text-brand-bright">Free Consultation</p>
          <h2 className="mt-2.5 text-[32px] font-semibold leading-[38px] text-paper">Need Help?</h2>
          <p className="mt-1.5 text-paper/80">
            Reach out to the world&apos;s most reliable IT services. Get a free consultation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3.5">
          <Link href="/contact-us" className="btn-primary">
            Request a Callback
          </Link>
          <a href={telHref(phone)} className="btn-outline-light">
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  );
}

// Verbatim learner proof, placed beside the conversion asks
// (engagement pass, DECISIONS.md §22): three of the eight published
// Google testimonials — SOC, Azure and Cloud voices — unedited, with
// the register door in the same section so proof sits next to action.
export function TestimonialSpotlight() {
  const picks = ["M Vamsi", "Arif Syed", "kruthikrishna dwaraka"]
    .map((name) => testimonials.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (picks.length === 0) return null;
  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionTitle label="Learner Voices" title="What our learners say" center />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {picks.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              className="relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-parchment p-7 shadow-[0_1px_2px_rgba(31,24,16,0.05)]"
            >
              <span aria-hidden className="font-display text-[44px] font-semibold leading-[0.6] text-signal">
                &ldquo;
              </span>
              <blockquote className="mt-3 grow text-[14.5px] leading-7 text-heading">
                {t.text}
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3.5">
                <span className="block text-sm font-semibold text-heading">{t.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-body">
                  {t.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/register" className="btn-primary">
            Register / Book a Free Demo
          </Link>
          <Link
            href="/testimonials"
            className="text-sm font-bold text-signal transition-colors hover:text-signal-strong"
          >
            Read all learner voices →
          </Link>
        </div>
      </div>
    </section>
  );
}

// For Institutes band on the home page (harvested 2026-10-23 from the
// gsits-platform B2BBand pattern, DECISIONS.md §17): the B2B door.
// Factual copy only — no prices (tier pricing undecided), no delivery
// promises, no testimonials.
export function ForInstitutesBand() {
  const items = [
    {
      t: "WhatsApp Lead Engine",
      d: "Instant replies, lead capture and counsellor alerts on your own number.",
    },
    {
      t: "Secure Learning Hub",
      d: "Watermarked video courses with student logins and progress tracking.",
    },
    {
      t: "Resilient Linux Lab",
      d: "PXE thin-client labs that recover with a reboot, not a repair call.",
    },
  ];
  return (
    <section className="panel-ink section-pad">
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow text-brand-bright">For Institutes</p>
          <h2 className="mt-3.5 text-[32px] font-semibold leading-[1.15] text-paper md:text-[38px]">
            Run an Institute? Automate Admissions.
          </h2>
          <p className="mt-3.5 text-paper/80">
            GradeSpot builds the products it runs on. Our Axon products for training institutes
            start with our own admissions — and are available to yours.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {items.map((x, i) => (
            <article
              key={x.t}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              className="rounded-[18px] bg-white/[0.05] px-7 py-8 ring-1 ring-white/10"
            >
              <p className="font-mono text-[12px] font-semibold text-brand-bright">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2.5 text-lg font-semibold text-paper">{x.t}</h3>
              <p className="mt-2 text-sm leading-6 text-paper/75">{x.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/for-institutes" className="btn-primary">
            Explore For Institutes
          </Link>
          <Link href="/for-institutes#demo" className="btn-outline-light">
            Book a Demo
          </Link>
          <Link href="/for-colleges" className="btn-outline-light">
            For Colleges
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-paper/75">
          Or start a different conversation —{" "}
          <Link
            href="/partner-with-us"
            className="font-semibold text-brand-bright underline-offset-4 hover:underline"
          >
            collaborations &amp; franchise discussions are welcome →
          </Link>
        </p>
      </div>
    </section>
  );
}

// "Our Students works with" employer logo wall — shown across the live
// site (Trainings, Services, About, Why Choose Us, Testimonials, Student
// Certifications, Certificate Verification and every course page).
export function LogoWall() {
  // Config seam (siteSettings.showEmployerWall, OFF by default): the
  // wall's claim is that students were EMPLOYED by these companies,
  // and no per-student placement evidence is in the repo —
  // UNVERIFIED as a placement claim. When an admin flips it ON, the
  // qualification note renders with it, and the heading no longer
  // claims employment. Returning null removes the section entirely.
  if (!siteSettings.showEmployerWall) return null;
  return (
    <section className="bg-surface-light section-pad">
      <div className="wrap">
        <SectionTitle title="Companies in our students' career paths" center />
        <p className="mx-auto mt-3 max-w-2xl text-center">{siteSettings.employerNote}</p>
        <div className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {employers.map((e) => (
            <div
              key={e.name}
              data-reveal
              className="logo-tile flex h-24 items-center justify-center rounded-2xl border border-line bg-parchment px-4"
            >
              <Image
                src={e.logo}
                alt={e.name}
                width={211}
                height={96}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog article cards from the external blog (digidefense.in), as shown on
// the live Trainings page and the CCNA/CCNP/SOC/CEH course pages.
export function BlogCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((p) => (
        <article
          key={p.title}
          data-reveal
          className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-parchment shadow-[0_1px_2px_rgba(31,24,16,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(31,24,16,0.13)]"
        >
          <a href={p.url} target="_blank" rel="noreferrer" className="block overflow-hidden">
            <Image
              src={p.image}
              alt={p.title}
              width={600}
              height={340}
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </a>
          <div className="flex grow flex-col p-6">
            <h3 className="font-display text-[17px] font-semibold leading-snug text-heading">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-signal"
              >
                {p.title}
              </a>
            </h3>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-block pt-4 text-sm font-bold text-signal transition-colors hover:text-signal-strong"
            >
              Read More →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

// Feature trio strip from the live Home/About/Trainings/course pages.
// §22 polish: promoted from three bare labels to an ink ledger band —
// the three published points as numbered columns with the conversion
// action built into the same surface, so the strip works as a board,
// not a footnote.
export function FeatureTrio() {
  const items = [
    "Student Satisfaction",
    "Top Class Trainings",
    "Online & Offline Classes",
  ];
  return (
    <section className="section-pad">
      <div className="wrap">
        <div
          data-reveal
          className="panel-ink grid items-center gap-8 rounded-[24px] px-8 py-10 md:px-10 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          {items.map((t, i) => (
            <div
              key={t}
              className="border-l-2 border-brand/70 pl-5"
            >
              <p className="font-mono text-[12px] font-semibold text-brand-bright">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 font-display text-[21px] font-semibold text-paper">{t}</h3>
            </div>
          ))}
          <Link href="/contact-us" className="btn-primary whitespace-nowrap">
            Talk to a Trainer
          </Link>
        </div>
      </div>
    </section>
  );
}

// "9 years of experience" badge from the live Home/About/Why Choose Us.
// Config seam (siteSettings.showExperienceBadge, OFF by default):
// UNVERIFIED — no founding date in the repo to derive it from.
// Renders only when an admin has verified it and flipped the toggle.
export function ExperienceBadge() {
  if (!siteSettings.showExperienceBadge) return null;
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-brand-bright/40 bg-ink px-5 py-4 text-paper shadow-lg">
      <span className="font-display text-4xl font-semibold text-brand-bright">9 Years</span>
      <span className="text-sm font-medium leading-tight">
        of
        <br />
        Experience
      </span>
    </div>
  );
}

// Founder signature block from the live Home and About pages.
export function SignatureBlock() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {/* §25: the signature art is dark ink on transparency — in dark
          mode .signature-art gives it a pale plate (globals.css). */}
      <span className="signature-art inline-block">
        <Image
          src="/images/signature.png"
          alt="Signature of Nikhil Duth D"
          width={300}
          height={243}
          className="h-20 w-auto"
        />
      </span>
      <div>
        <p className="text-lg font-semibold text-heading">Nikhil Duth D</p>
        <p className="text-sm text-body">Founder &amp; MD — Corporate Trainings</p>
      </div>
    </div>
  );
}

// Credential cards (§25.15, SUPERSEDES §25.13): the two
// trust-weight cards — ISO 9001:2015 certification and AICTE
// internship approval — as formal, government-recognizable
// credential presentations: text on the left, the body's OFFICIAL
// emblem on the right, on a neutral white plate so the artwork
// reads identically in light and dark. NO custom seal motifs, NO
// filters, NO recolors, NO redraws of the official artwork.
// Files live in the repo (never hotlinked):
// - public/images/iso-logo.svg — ISO "Red Square" logo, via
//   Wikimedia Commons File:ISO_Logo_(Red_square).svg (described
//   there as the current ISO logo, author ISO).
// - public/images/aicte-logo.png — official AICTE emblem, via the
//   en.wikipedia.org file "All India Council for Technical
//   Education logo.png" (source: the body itself).
// Copy is verbatim; only presentation changes. The emblem is a
// fixed-size, non-overlapping flex item (never cropped, never
// over the text). Trademark note, kept on the record: both the
// ISO name and logo are registered trademarks with restricted
// use, and the ISO/AICTE claims themselves remain on Aravind's
// confirm-or-remove list — if either claim is unconfirmed, its
// emblem comes off.
function CredentialEmblem({ kind }: { kind: "iso" | "aicte" }) {
  const emblem =
    kind === "iso"
      ? {
          src: "/images/iso-logo.svg",
          alt: "Official logo of the International Organization for Standardization (ISO)",
          width: 1181,
          height: 1087,
        }
      : {
          src: "/images/aicte-logo.png",
          alt: "Official logo of the All India Council for Technical Education (AICTE)",
          width: 316,
          height: 316,
        };
  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-[0_8px_20px_rgba(31,24,16,0.10)] ring-1 ring-line sm:h-28 sm:w-28">
      <Image
        src={emblem.src}
        alt={emblem.alt}
        width={emblem.width}
        height={emblem.height}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function CredentialCard({
  title,
  body,
  seal,
}: {
  title: string;
  body: string;
  seal: "iso" | "aicte";
}) {
  // Config seam (OFF by default, per seal): ISO 9001:2015 and AICTE
  // claims are on the owner's confirm-or-remove list with no proof
  // in the repo, and both emblems are registered official artwork.
  // A card renders ONLY when its toggle is ON, with the qualification
  // note — never as an unqualified certification claim.
  const enabled = seal === "iso" ? siteSettings.showCredentialIso : siteSettings.showCredentialAicte;
  if (!enabled) return null;
  return (
    <article className="flex items-center gap-5 rounded-2xl border-2 border-heading/25 bg-parchment p-5 shadow-[0_18px_36px_rgba(31,24,16,0.10)] sm:gap-6 sm:p-6">
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6">{body}</p>
        <p className="mt-2 text-xs leading-5 text-body">{siteSettings.credentialNote}</p>
      </div>
      <CredentialEmblem kind={seal} />
    </article>
  );
}

// Social links (LinkedIn company page + YouTube) with inline SVG icons.
export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/gradespot-it-solutions",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/watch?v=owhuBrGIOsE",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export function SocialLinks({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <>
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`GradeSpot IT Solutions on ${s.label}`}
          className="hover:text-brand-bright"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </>
  );
}
