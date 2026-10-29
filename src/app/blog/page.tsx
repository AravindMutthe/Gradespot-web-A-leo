import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle, CtaBand } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { articles } from "@/data/articles";
import { blogPosts } from "@/data/blog";

export const metadata = staticPageMetadata({
  title: "Learning Articles",
  description: "Career roadmaps and course explainers from GradeSpot IT Solutions — how to start a cybersecurity career, CEH vs Security+, and what a SOC analyst actually does.",
  path: "/blog",
});

// Blog index — Stage 8: card grids → compact rows; DigiDefense cards
// rendered as text link rows (their images held — default no-images
// rule). Article bodies themselves are untouched (see the detail
// page); only this index presentation changes.
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
          <div className="mx-auto mt-10 max-w-5xl divide-y divide-line border-y border-line">
            {articles.map((a) => (
              <article key={a.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-signal-strong">
                    {new Date(`${a.date}T00:00:00`).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-heading">{a.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-body">{a.excerpt}</p>
                </div>
                <Link
                  href={`/blog/${a.slug}`}
                  className="text-sm font-bold text-action hover:text-action-dark"
                >
                  Read the article →
                </Link>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <SectionTitle
              label="DigiDefense"
              title="From our security blog"
            />
            <p className="mt-3 max-w-2xl">
              In-depth security write-ups live on our blog, DigiDefense — start with these:
            </p>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {blogPosts.map((p) => (
                <a
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-wrap items-baseline justify-between gap-3 py-5"
                >
                  <h3 className="text-lg font-semibold leading-snug text-heading">{p.title}</h3>
                  <span aria-hidden className="text-signal">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
