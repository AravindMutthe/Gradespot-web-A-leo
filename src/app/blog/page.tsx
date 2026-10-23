import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle, BlogCards, CtaBand } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Learning Articles",
  description:
    "Career roadmaps and course explainers from GradeSpot IT Solutions — how to start a cybersecurity career, CEH vs Security+, and what a SOC analyst actually does.",
};

// Blog index (research expansion pack, DECISIONS.md §18). The Oct-6
// BLOG_POSTS were title stubs with "[Pending]" bodies, so the articles
// here are original Leo-authored pieces built from real course data
// (src/data/articles.ts). The external DigiDefense security blog —
// where the business's articles actually live — is linked as its own
// section, exactly as the live site presents it.
export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Learning Articles", path: "/blog" },
        ])}
      />
      <PageHero
        title="Learning Articles"
        subtitle="Roadmaps and explainers for choosing and starting a training — written from our own courses' published topics, durations and job roles."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Learning Articles" }]} />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="flex flex-col rounded-2xl border border-line bg-parchment px-7 py-8 shadow-sm transition duration-300 hover:shadow-[0_20px_40px_rgba(31,24,16,0.12)]"
              >
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-signal-strong">
                  {new Date(`${a.date}T00:00:00`).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-3 text-xl font-bold leading-snug text-heading">{a.title}</h2>
                <p className="mt-2 text-sm leading-6 text-body">{a.excerpt}</p>
                <Link
                  href={`/blog/${a.slug}`}
                  className="mt-auto inline-block pt-5 text-sm font-bold text-signal hover:text-signal-strong"
                >
                  Read the article →
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <SectionTitle
              label="DigiDefense"
              title="From our security blog"
            />
            <p className="mt-3 max-w-2xl">
              In-depth security write-ups live on our blog, DigiDefense — start with these:
            </p>
            <div className="mt-8">
              <BlogCards />
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
