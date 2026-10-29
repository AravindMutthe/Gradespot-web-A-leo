import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand, AnswerLead } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { comparisons } from "@/data/comparisons";
import { courseDetails } from "@/data/course-details";
import { buildCourseDetail, findLocalCourse } from "@/lib/course-detail";
import { comparisonPageMetadata } from "@/lib/metadata";
import { getJobRoles } from "@/lib/course-faqs";

// "X vs Y" comparison pages — Stage 8 re-template. Changes from the
// old body, all from the Stage 3/4/5 gate rules:
// - Data source switched from DB-first getCourse() to LOCAL repo files
//   (the DB CCNA row carries contested 90-day content + 19 extra
//   paragraphs; a DB-driven table could not honour the holds).
// - No "Published fees" row: no B1-verified price figure exists, and
//   the CCNA/CCNP fee plans are CCNA copy / unverified. Fees are
//   "Confirmed on enquiry" for both sides.
// - No per-course "Mode" assertion: mode is "Confirmed on enquiry".
// - Held side (CCNA R1 in ccna-vs-network-plus): every detail cell
//   reads "Course details to be confirmed", the "Choose …" card is a
//   held notice + Enquire, and no LP link is offered for it.
// - SOC renders under its neutral title; its 90-day repo-map duration
//   is footnoted as still needing independent verification.
// - Generated "Quick answers" + FAQPage schema removed (unapproved
//   FAQs, one carrying a free-demo promise).
const HELD = "Course details to be confirmed";

export function generateStaticParams() {
  return comparisons.map((c) => ({ pair: c.slug }));
}

function resolve(pair: string) {
  const def = comparisons.find((c) => c.slug === pair);
  if (!def) return null;
  const a = findLocalCourse(def.a);
  const b = findLocalCourse(def.b);
  if (!a || !b) return null;
  return { def, a, b };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const r = resolve(pair);
  if (!r) return { title: "Course Comparison" };
  return comparisonPageMetadata(r.def.title, r.a.title, r.b.title, `/compare/${pair}`);
}

export default async function ComparePairPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const r = resolve(pair);
  if (!r) notFound();
  const { def, a, b } = r;
  const ma = buildCourseDetail(a, courseDetails[a.slug], undefined);
  const mb = buildCourseDetail(b, courseDetails[b.slug], undefined);
  // Held courses contribute NO job roles here — the original
  // sections of a held full course (e.g. CCNA's contested
  // curriculum) must not leak in as roles. Career-support applies
  // the same exclusion.
  const rolesA = ma.heldBack ? [] : getJobRoles(a);
  const rolesB = mb.heldBack ? [] : getJobRoles(b);

  const val = (held: boolean, v: string | null | undefined) => (held ? HELD : (v ?? "Confirmed on enquiry"));
  // SOC's published outcome opens "Job-ready …" — the job-ready claim
  // is held everywhere (Stage 5 neutralisation), so strip that prefix
  // rather than republishing it in the outcome row.
  const outcome = (held: boolean, v: string | null | undefined) =>
    held ? HELD : (v ? v.replace(/^Job-ready\s+/i, "") : "Confirmed on enquiry");
  const dur = (held: boolean, label: string | null) =>
    held ? HELD : label ? label.replace(/^Duration: /, "") : "Confirmed on enquiry";

  // Fact rows: Who/Duration/Level/Certification/Topics cells render
  // model facts for verified sides and the held notice for held
  // sides. Focus, Mode, Fees and Published outcome render
  // pre-existing comparison copy or enquiry wording.
  const rows: { label: string; va: string; vb: string }[] = [
    { label: "Focus", va: def.focusA, vb: def.focusB },
    { label: "Who it's for", va: val(ma.heldBack, ma.facts?.who), vb: val(mb.heldBack, mb.facts?.who) },
    { label: "Duration", va: dur(ma.heldBack, ma.durationLabel), vb: dur(mb.heldBack, mb.durationLabel) },
    { label: "Mode", va: "Confirmed on enquiry", vb: "Confirmed on enquiry" },
    { label: "Level", va: val(ma.heldBack, ma.facts?.level), vb: val(mb.heldBack, mb.facts?.level) },
    { label: "Certification", va: val(ma.heldBack, ma.facts?.certification), vb: val(mb.heldBack, mb.facts?.certification) },
    { label: "Fees", va: "Confirmed on enquiry", vb: "Confirmed on enquiry" },
    { label: "Published outcome", va: outcome(ma.heldBack, courseDetails[a.slug]?.outcome), vb: outcome(mb.heldBack, courseDetails[b.slug]?.outcome) },
  ];

  const shortA = ma.displayTitle;
  const shortB = mb.displayTitle;
  const socFootnote = a.slug === "soc-analyst" || b.slug === "soc-analyst";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Course Comparisons", path: "/compare" },
          { name: def.title, path: `/compare/${def.slug}` },
        ])}
      />
      <PageHero
        title={def.title}
        subtitle="A factual side-by-side from each course's own published page — topics, duration, certification, and the roles each one prepares you for. Fees are confirmed on enquiry."
      />
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          In short: {shortA} — {def.focusA.split(". ")[0]}. {shortB} —{" "}
          {def.focusB.split(". ")[0]}.
        </AnswerLead>
      </div>
      {(ma.heldBack || mb.heldBack) && (
        <div className="wrap pt-8">
          <p className="rounded-2xl border border-line bg-surface-light p-5 text-[15px] leading-7 text-body">
            One side of this comparison is still to be confirmed:{" "}
            {ma.heldBack ? shortA : shortB} shows &ldquo;Course details to be
            confirmed&rdquo; in its detail rows below, and its full details
            will appear once its content is approved. The other side is
            shown in full.
          </p>
        </div>
      )}
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Course Comparisons", path: "/compare" },
                { name: `${shortA} vs ${shortB}` },
              ]}
            />
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-line bg-surface-light">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 font-display text-base font-bold">Compare</th>
                  <th className="px-6 py-4 font-display text-base font-bold">
                    <span className="flex flex-wrap items-center gap-3">{shortA}</span>
                  </th>
                  <th className="px-6 py-4 font-display text-base font-bold">
                    <span className="flex flex-wrap items-center gap-3">{shortB}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? "bg-surface-light/60" : ""}>
                    <th className="px-6 py-4 align-top font-semibold text-heading">{row.label}</th>
                    <td className="px-6 py-4 align-top leading-6 text-body">
                      {row.va}
                    </td>
                    <td className="px-6 py-4 align-top leading-6 text-body">
                      {row.vb}
                    </td>
                  </tr>
                ))}
                <tr className="bg-surface-light/60">
                  <th className="px-6 py-4 align-top font-semibold text-heading">Key topics</th>
                  <td className="px-6 py-4 align-top leading-6 text-body">
                    {ma.heldBack ? HELD : (ma.facts?.topics ? ma.facts.topics.join("; ") : "See course page")}
                  </td>
                  <td className="px-6 py-4 align-top leading-6 text-body">
                    {mb.heldBack ? HELD : (mb.facts?.topics ? mb.facts.topics.join("; ") : "See course page")}
                  </td>
                </tr>
                {(rolesA.length > 0 || rolesB.length > 0) && (
                  <tr>
                    <th className="px-6 py-4 align-top font-semibold text-heading">Job roles</th>
                    <td className="px-6 py-4 align-top leading-6 text-body">
                      {ma.heldBack ? HELD : rolesA.slice(0, 8).join(", ") || "See course page"}
                    </td>
                    <td className="px-6 py-4 align-top leading-6 text-body">
                      {mb.heldBack ? HELD : rolesB.slice(0, 8).join(", ") || "See course page"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {socFootnote && (
            <p className="mx-auto mt-4 max-w-5xl text-sm leading-6 text-body">
              SOC Analyst duration is shown from the repo duration map; independent
              verification is still owed.
            </p>
          )}

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              { m: ma, c: a, choose: def.chooseA, short: shortA },
              { m: mb, c: b, choose: def.chooseB, short: shortB },
            ].map(({ m, c, choose, short }) => (
              <article key={c.slug} className="rounded-2xl border border-line bg-surface-light px-8 py-9">
                <h2 className="text-xl font-bold text-heading">Choose {short} if…</h2>
                {m.heldBack ? (
                  <>
                    <p className="mt-3 text-[15px] leading-7 text-body">{HELD}</p>
                    <div className="mt-6">
                      <Link href="/contact-us" className="btn-primary">
                        <span aria-hidden="true">✉️</span> Enquire
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-[15px] leading-7 text-body">{choose}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={`/trainings/${c.slug}`} className="btn-primary">
                        View {short}
                      </Link>
                      <Link
                        href={`/lp/${c.slug}-in-hyderabad`}
                        className="text-[15px] font-bold leading-[48px] text-action hover:text-action-dark"
                      >
                        {short} in Hyderabad →
                      </Link>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center">
            <Link href="/compare" className="text-sm font-bold text-action hover:text-action-dark">
              ← All course comparisons
            </Link>
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
