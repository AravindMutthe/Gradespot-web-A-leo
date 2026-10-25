import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCourses, getServices } from "@/lib/data";
import { homeParagraphs } from "@/data/pages";
import { testimonials } from "@/data/testimonials";
import { BlogCards, CourseCard, CredentialCard, ExperienceBadge, FaqList, SectionTitle, SignatureBlock, siteFaqs, AnswerLead } from "@/components/ui";
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
import OfferCards from "@/components/OfferCards";
import { faqSchema, webPageSchema } from "@/lib/schema";

// Homepage — GradeSpot Nexus Release 1 (docs/frontend-v2/SPEC.md §3).
// This is NOT the v1 eleven-section card-row reorder (commit f584ee5,
// superseded). Compositions alternate on purpose:
//   editorial (hero, why) → structured discovery (Academy table) →
//   technical workspace (labs + pathway graph) → editorial pathway
//   feature (certifications) → service-delivery table (Enterprise) →
//   editorial proof (why, insights) → application enquiry (Speak).
// No repeated rows of identical cards. No invented fees, dates,
// trainers, stats, ratings or placement claims. Counts below are
// computed from the real catalogue at render time. Programs marked
// Planned are never presented as available.

const heroBlocks = [
  { label: "Cybersecurity Academy", body: "Role-based training and authorized labs.", href: "/trainings#category-cybersecurity", img: "/images/courses/cybersecurity-technologies.jpg" },
  { label: "Cloud & Infrastructure", body: "Cloud platforms, Linux, networking and DevOps.", href: "/trainings#category-aws", img: "/images/courses/aws-solutions-architect-associate.jpg" },
  { label: "Career Pathways", body: "Skills, tools, certifications and projects.", href: "/career-support", img: "/images/courses/soc-analyst.jpg" },
  { label: "Enterprise Solutions", body: "Consulting, engineering and technical services.", href: "/services", img: "/images/courses/ccna.jpg" },
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

  const academyRows = [
    { domain: "Cybersecurity", href: "/trainings#category-cybersecurity", n: countIn("Cybersecurity"), status: "Available" },
    { domain: "Cloud — AWS / Microsoft Azure", href: "/trainings", n: countIn("AWS", "Microsoft Azure"), status: "Available" },
    { domain: "Networking — Cisco / Networking", href: "/trainings#category-cisco", n: countIn("Cisco", "Networking"), status: "Available" },
    { domain: "Software Engineering", href: "/trainings#category-programming-data", n: countIn("Programming & Data"), status: "Available" },
    { domain: "Linux & Infrastructure", href: "/trainings", n: 0, status: "Planned" },
    { domain: "DevOps & SRE", href: "/trainings#category-microsoft-azure", n: countIn("Microsoft Azure"), status: "Planned — AZ-400 under Azure" },
    { domain: "AI & Data", href: "/trainings#category-programming-data", n: countIn("Programming & Data"), status: "Planned — data courses exist" },
    { domain: "Other Existing Programs", href: "/trainings#category-medical-coding", n: countIn("Medical Coding", "Digital Marketing", "Design & CAD"), status: "Available" },
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

      {/* EDITORIAL HERO — Nexus §3. No single-course hero. */}
      <section className="hero-paper relative overflow-hidden border-b border-line" aria-label="Hero">
        <div className="wrap grid items-start gap-10 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <p className="eyebrow text-nexus-brand-600">GradeSpot IT Solutions · Technology Academy · Certifications · Applied Labs · Enterprise IT Solutions</p>
            <h1 className="nexus-editorial mt-5 max-w-xl text-[44px] font-semibold text-heading md:text-[68px]">
              Engineering Skills. Real-World Solutions.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-body">
              Professional technology education, certification preparation, hands-on labs
              and enterprise IT services — in Dilsukhnagar, Hyderabad, online and in
              the classroom.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-body">{homeParagraphs[1]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/trainings" className="btn-primary">Explore Academy</Link>
              <Link href="/register" className="btn-outline-navy">Book Free Demo</Link>
              <Link href="/services" className="btn-outline-navy">IT Solutions</Link>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-body">
              Academy · Technology Solutions · Labs &amp; Career Pathways
            </p>
          </div>
          <div className="nexus-diagram rounded-2xl p-5" data-reveal>
            <p className="eyebrow text-nexus-brand-600">Skill graph — real catalogue, no invented pathways</p>
            <ul className="mt-4 space-y-0">
              {[
                ["Cybersecurity", "SOC Analyst · CEH · VAPT →", "/trainings#category-cybersecurity"],
                ["Cloud & Infrastructure", "AWS · Azure · CCNA →", "/trainings#category-aws"],
                ["Career Pathways", "Roles, skills, tools, projects →", "/career-support"],
                ["Enterprise Solutions", "Consulting · Engineering · Services →", "/services"],
              ].map(([label, detail, href]) => (
                <li key={label} className="nexus-row">
                  <span className="w-40 shrink-0 font-display text-[15px] font-semibold text-heading">{label}</span>
                  <span className="grow text-[13px] text-body">{detail}</span>
                  <Link href={href} className="shrink-0 text-[13px] font-bold text-nexus-brand-600 hover:underline">Open →</Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] leading-5 text-body">
              Interactive career roadmaps arrive in Release 2. Today, role links go to
              real course pages and to Career Support.
            </p>
          </div>
        </div>
        <div className="wrap pb-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroBlocks.map((b) => (
              <Link key={b.label} href={b.href} className="group relative block overflow-hidden rounded-[18px]">
                <Image src={b.img} alt={b.label} width={400} height={300} className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                <span className="absolute inset-x-0 bottom-0 bg-nexus-ink-950/85 px-4 py-3">
                  <span className="block text-[13px] font-bold text-nexus-text-inverse">{b.label}</span>
                  <span className="block text-[12px] text-nexus-text-inverse/80">{b.body}</span>
                </span>
              </Link>
            ))}
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

      {/* STRUCTURED DISCOVERY — Academy table, not a card grid. */}
      <section className="section-pad" aria-label="Academy discovery">
        <div className="wrap">
          <SectionTitle label="Academy · Structured Discovery" title="Find a program by domain — and see what is actually available" />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-body">
            Counts are computed from the real catalogue. Planned domains are labelled
            Planned and are not promoted as enrollable. Levels, curriculum previews and
            demo eligibility arrive with Release 2 tagging.
          </p>
          <div className="nexus-app mt-8 overflow-hidden">
            <div className="nexus-row bg-nexus-surface-sunken font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-nexus-text-secondary">
              <span className="grow">Domain</span>
              <span className="hidden w-32 sm:block">Programs</span>
              <span className="w-36 text-right">Status</span>
            </div>
            {academyRows.map((r) => (
              <div key={r.domain} className="nexus-row">
                <Link href={r.href} className="grow font-display text-[16px] font-semibold text-heading hover:text-nexus-brand-600 hover:underline">{r.domain} →</Link>
                <span className="hidden w-32 font-mono text-[12px] text-body sm:block">{r.n > 0 ? `${r.n} training${r.n === 1 ? "" : "s"}` : "—"}</span>
                <span className="w-36 text-right"><span className="nexus-status">{r.status}</span></span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/trainings" className="btn-primary">View All Trainings</Link>
            <Link href="/compare" className="text-sm font-bold text-nexus-brand-600 hover:underline">Course Comparisons →</Link>
          </div>
        </div>
      </section>

      {/* TECHNICAL WORKSPACE — labs + pathway graph, Carbon-inspired. */}
      <section className="bg-nexus-surface-sunken section-pad" aria-label="Labs and career pathways">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle label="Labs & Projects · Technical Workspace" title="Learn by doing, inside the course" />
            <p className="mt-4 text-sm leading-6 text-body">
              There is no separate labs portal yet. Hands-on labs, simulations and
              projects are delivered inside these training programs, as described on
              their course pages. Standalone capstones, quizzes and portfolios are
              Planned, not available.
            </p>
            <div className="nexus-app mt-6 overflow-hidden">
              {labCourses.map((c) => (
                <div key={c.slug} className="nexus-row">
                  <Link href={`/trainings/${c.slug}`} className="grow font-semibold text-heading hover:text-nexus-brand-600 hover:underline">{c.title} →</Link>
                  <span className="nexus-status">Labs in course</span>
                </div>
              ))}
            </div>
          </div>
          <div className="nexus-diagram rounded-2xl p-5">
            <p className="eyebrow text-nexus-brand-600">Career pathway — SOC Analyst (real course)</p>
            <ol className="mt-4 space-y-0">
              {[
                ["1 · Foundations", "Networking, Linux, security fundamentals"],
                ["2 · Detection", "SIEM, log analysis, triage"],
                ["3 · Response", "Incident response, threat intelligence"],
                ["4 · Proof", "SOC Analyst training page, certificate verification"],
              ].map(([step, detail]) => (
                <li key={step} className="nexus-row">
                  <span className="w-36 shrink-0 font-display text-[14px] font-semibold text-heading">{step}</span>
                  <span className="text-[13px] text-body">{detail}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[12.5px] leading-5 text-body">
              Full interactive roadmaps for all twelve spec pathways arrive in
              Release 2. This graph uses only published SOC Analyst content.
            </p>
            <Link href="/trainings/soc-analyst" className="mt-3 inline-block text-[13px] font-bold text-nexus-brand-600 hover:underline">SOC Analyst Training →</Link>
          </div>
        </div>
      </section>

      {/* EDITORIAL FEATURE — certification pathways, training-toward wording. */}
      <section className="section-pad" aria-label="Certification pathways">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionTitle label="Certifications · Editorial Feature" title="Training toward industry certifications" />
            <p className="mt-4 text-sm leading-6 text-body">
              These are training programs in each vendor area. Certification itself is
              awarded by the vendor or exam body, not by this page. No exam date, fee
              or eligibility is claimed here. Red Hat and Kubernetes pathways are
              Planned — no such courses are published.
            </p>
            <ul className="mt-6 space-y-2">
              {vendors.map((v) => (
                <li key={v.t} className="flex items-center justify-between gap-4 border-b border-line py-2.5">
                  <Link href={v.href} className="font-semibold text-heading hover:text-nexus-brand-600 hover:underline">{v.t} →</Link>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-nexus-brand-600">{v.n} trainings</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/student-certifications" className="text-sm font-bold text-nexus-brand-600 hover:underline">Student Certifications →</Link>
              <Link href="/certificate-verification" className="text-sm font-bold text-nexus-brand-600 hover:underline">Verify a Certificate →</Link>
            </div>
          </div>
          {ceh && (
            <div>
              <p className="eyebrow text-nexus-brand-600">Featured Cybersecurity Program</p>
              <div className="mt-4"><CourseCard course={ceh} /></div>
              <p className="mt-3 text-[12.5px] leading-5 text-body">CEH is one featured program, not the visual for the whole business.</p>
            </div>
          )}
        </div>
      </section>

      {/* SERVICE-DELIVERY TABLE + FOR BUSINESS PANEL — Enterprise. */}
      <section className="bg-nexus-surface-sunken section-pad" aria-label="IT solutions and enterprise">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionTitle label="IT Solutions · Service Delivery" title="Security, infrastructure, software, digital and consulting" />
            <div className="nexus-app mt-6 overflow-hidden">
              {services.slice(0, 8).map((s) => (
                <div key={s.slug} className="nexus-row">
                  <Link href={`/services/${s.slug}`} className="grow font-semibold text-heading hover:text-nexus-brand-600 hover:underline">{s.title} →</Link>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.06em] text-body sm:block">Service delivery</span>
                </div>
              ))}
            </div>
            <Link href="/services" className="btn-primary mt-6">All Services</Link>
          </div>
          <div className="rounded-2xl bg-nexus-ink-950 p-7 text-nexus-text-inverse">
            <p className="eyebrow text-nexus-brand-300">For Business — Prominent</p>
            <h3 className="mt-3 font-display text-[26px] font-semibold leading-snug">Request a service consultation</h3>
            <p className="mt-3 text-sm leading-6 text-nexus-text-inverse/85">
              For Business lives here, in IT Solutions — not buried in the Academy.
              Tell us the problem and the scope; the team replies with the next step.
              Services are quoted to scope; no prices are published here.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact-us" className="btn-primary">Talk to an Advisor</Link>
              <Link href="/corporate-and-international" className="text-sm font-bold text-nexus-text-inverse underline">Corporate &amp; International →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL PROOF — Why GradeSpot, published copy only. */}
      <section className="section-pad" aria-label="Why GradeSpot">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="Why GradeSpot"
              title="We assist companies in enhancing their digital presence and fortifying their Security"
            />
            <p className="mt-4">{homeParagraphs[6]}</p>
            <div className="mt-6"><ExperienceBadge /></div>
            <Link href="/about-us" className="btn-primary mt-6">About Us</Link>
            <div className="mt-8"><SignatureBlock /></div>
          </div>
          <div className="space-y-6">
            <CredentialCard title="An ISO Certified Company" body={homeParagraphs[8]} seal="iso" />
            <CredentialCard title="AICTE Internships Approved" body={homeParagraphs[10]} seal="aicte" />
          </div>
        </div>
        <div className="wrap mt-14">
          <h3 className="text-center text-2xl font-semibold text-heading">Learner voices — published testimonials only</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {proofTestimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-[18px] border border-line bg-parchment p-7">
                <blockquote className="grow text-[14.5px] leading-7 text-heading">{t.text}</blockquote>
                <figcaption className="mt-4 border-t border-line pt-3.5">
                  <span className="block text-sm font-semibold text-heading">{t.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-body">{t.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/testimonials" className="text-sm font-bold text-nexus-brand-600 hover:underline">Read all learner voices →</Link>
            <Link href="/certificate-verification" className="text-sm font-bold text-nexus-brand-600 hover:underline">Verify a Certificate →</Link>
            <Link href="/team-members" className="text-sm font-bold text-nexus-brand-600 hover:underline">Meet Our Team →</Link>
          </div>
        </div>
      </section>

      {/* INSIGHTS — editorial list + FAQ, not a card grid. */}
      <section className="bg-nexus-surface-sunken section-pad" aria-label="Insights and resources">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionTitle label="Insights & Resources" title="Articles, guides, comparisons and FAQs" />
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/blog" className="text-sm font-bold text-nexus-brand-600 hover:underline">Learning Articles →</Link>
              <Link href="/resources" className="text-sm font-bold text-nexus-brand-600 hover:underline">Resources →</Link>
              <Link href="/compare" className="text-sm font-bold text-nexus-brand-600 hover:underline">Course Comparisons →</Link>
            </div>
          </div>
          <FaqList items={siteFaqs} />
        </div>
        <div className="wrap mt-10"><BlogCards /></div>
      </section>

      {/* APPLICATION ENQUIRY — steps, then the existing promotions seam once. */}
      <section className="section-pad" aria-label="Speak with GradeSpot">
        <div className="wrap">
          <SectionTitle label="Speak With GradeSpot · Application" title="Training enquiry, service consultation, contact" center />
          <div className="nexus-app mx-auto mt-8 max-w-3xl overflow-hidden">
            {[
              ["Discover", "Search, navigation, guides →"],
              ["Evaluate", "Syllabus, labs, pricing, FAQs →"],
              ["Engage", "Demo, consultation, application →"],
              ["Deliver", "Training, labs, service projects →"],
            ].map(([step, detail]) => (
              <div key={step} className="nexus-row">
                <span className="w-32 shrink-0 font-display text-[16px] font-semibold text-heading">{step}</span>
                <span className="text-[13.5px] text-body">{detail}</span>
              </div>
            ))}
          </div>
          <div className="mt-10"><OfferCards excludeSlug="free-demo-card" /></div>
          <div className="mt-10 text-center">
            <Link href="/contact-us" className="btn-primary">Talk to an Advisor</Link>
          </div>
        </div>
      </section>
    </>
  );
}
