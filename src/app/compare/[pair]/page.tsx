import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { comparisons } from "@/data/comparisons";
import { courseDetails } from "@/data/course-details";
import { getCourse } from "@/lib/data";
import { getJobRoles, getPricingPlans, type PricingPlan } from "@/lib/course-faqs";

// "X vs Y" comparison pages (research expansion pack, DECISIONS.md
// §18 — ppc report §2.2: comparison searches trigger AI answers 95.4%
// of the time; folder-1 Q5: comparison content is cite-worthy AEO).
// The decision table is rendered ONLY from the two courses' real
// published fields; fees appear only where a course publishes them.

export function generateStaticParams() {
  return comparisons.map((c) => ({ pair: c.slug }));
}

async function resolve(pair: string) {
  const def = comparisons.find((c) => c.slug === pair);
  if (!def) return null;
  const a = await getCourse(def.a);
  const b = await getCourse(def.b);
  if (!a || !b) return null;
  return { def, a, b };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const r = await resolve(pair);
  if (!r) return { title: "Course Comparison" };
  return {
    alternates: { canonical: `/compare/${pair}` },
    title: r.def.title,
    description: `${r.def.title} A side-by-side comparison of ${r.a.title} and ${r.b.title} at GradeSpot IT Solutions, Hyderabad — focus, duration, certification, fees where published, and job roles.`,
  };
}

function feesCell(plans: PricingPlan[]): string {
  if (plans.length === 0) return "Confirmed on enquiry";
  return plans.map((p) => `${p.name} — ${p.price}`).join("; ");
}

export default async function ComparePairPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const r = await resolve(pair);
  if (!r) notFound();
  const { def, a, b } = r;
  const da = courseDetails[a.slug];
  const db = courseDetails[b.slug];
  const rolesA = getJobRoles(a);
  const rolesB = getJobRoles(b);

  const rows: { label: string; va: string; vb: string }[] = [
    { label: "Focus", va: def.focusA, vb: def.focusB },
    ...(da && db ? [{ label: "Who it's for", va: da.who, vb: db.who }] : []),
    {
      label: "Duration",
      va: a.duration ?? "Confirmed on enquiry",
      vb: b.duration ?? "Confirmed on enquiry",
    },
    { label: "Mode", va: "Online & Offline Classes", vb: "Online & Offline Classes" },
    ...(da && db ? [{ label: "Level", va: da.level, vb: db.level }] : []),
    ...(da && db ? [{ label: "Certification", va: da.certification, vb: db.certification }] : []),
    { label: "Published fees", va: feesCell(getPricingPlans(a)), vb: feesCell(getPricingPlans(b)) },
    ...(da && db
      ? [{ label: "Published outcome", va: da.outcome, vb: db.outcome }]
      : []),
  ];

  const faqs = [
    {
      q: `What is the difference between ${da?.short ?? a.title} and ${db?.short ?? b.title}?`,
      a: `${da?.short ?? a.title} focuses on: ${def.focusA} ${db?.short ?? b.title} focuses on: ${def.focusB}`,
    },
    {
      q: `Which should I choose — ${da?.short ?? a.title} or ${db?.short ?? b.title}?`,
      a: `${def.chooseA} ${def.chooseB} You can also book a free demo of either course on its course page before deciding.`,
    },
  ];

  const shortA = da?.short ?? a.title;
  const shortB = db?.short ?? b.title;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Course Comparisons", path: "/compare" },
          { name: def.title, path: `/compare/${def.slug}` },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        title={def.title}
        subtitle="A factual side-by-side from each course's own published page — topics, duration, certification, fees where published, and the roles each one prepares you for."
      />
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

          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-2xl border border-line bg-parchment shadow-sm">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 font-display text-base font-bold">Compare</th>
                  <th className="px-6 py-4 font-display text-base font-bold">{shortA}</th>
                  <th className="px-6 py-4 font-display text-base font-bold">{shortB}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? "bg-surface-light/60" : ""}>
                    <th className="px-6 py-4 align-top font-semibold text-heading">{row.label}</th>
                    <td className="px-6 py-4 align-top leading-6 text-body">{row.va}</td>
                    <td className="px-6 py-4 align-top leading-6 text-body">{row.vb}</td>
                  </tr>
                ))}
                <tr className="bg-surface-light/60">
                  <th className="px-6 py-4 align-top font-semibold text-heading">Key topics</th>
                  <td className="px-6 py-4 align-top leading-6 text-body">
                    {da ? da.topics.join("; ") : a.summary}
                  </td>
                  <td className="px-6 py-4 align-top leading-6 text-body">
                    {db ? db.topics.join("; ") : b.summary}
                  </td>
                </tr>
                {(rolesA.length > 0 || rolesB.length > 0) && (
                  <tr>
                    <th className="px-6 py-4 align-top font-semibold text-heading">Job roles</th>
                    <td className="px-6 py-4 align-top leading-6 text-body">
                      {rolesA.slice(0, 8).join(", ") || "See course page"}
                    </td>
                    <td className="px-6 py-4 align-top leading-6 text-body">
                      {rolesB.slice(0, 8).join(", ") || "See course page"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Which is for you */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-line border-t-4 border-t-brand bg-parchment px-8 py-9 shadow-sm">
              <h2 className="text-xl font-bold text-heading">Choose {shortA} if…</h2>
              <p className="mt-3 text-[15px] leading-7 text-body">{def.chooseA}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/trainings/${a.slug}`} className="btn-primary">
                  View {shortA}
                </Link>
                <Link
                  href={`/lp/${a.slug}-in-hyderabad`}
                  className="text-[15px] font-bold leading-[48px] text-signal hover:text-signal-strong"
                >
                  {shortA} in Hyderabad →
                </Link>
              </div>
            </article>
            <article className="rounded-2xl border border-line border-t-4 border-t-brand bg-parchment px-8 py-9 shadow-sm">
              <h2 className="text-xl font-bold text-heading">Choose {shortB} if…</h2>
              <p className="mt-3 text-[15px] leading-7 text-body">{def.chooseB}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/trainings/${b.slug}`} className="btn-primary">
                  View {shortB}
                </Link>
                <Link
                  href={`/lp/${b.slug}-in-hyderabad`}
                  className="text-[15px] font-bold leading-[48px] text-signal hover:text-signal-strong"
                >
                  {shortB} in Hyderabad →
                </Link>
              </div>
            </article>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="text-[26px] font-bold text-heading">Quick answers</h2>
            <div className="mt-5 space-y-4">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-semibold text-heading">{f.q}</h3>
                  <p className="mt-1.5 text-[15px] leading-7 text-body">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center">
              <Link href="/compare" className="text-sm font-bold text-signal hover:text-signal-strong">
                ← All course comparisons
              </Link>
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
