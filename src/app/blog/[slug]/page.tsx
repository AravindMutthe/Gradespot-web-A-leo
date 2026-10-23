import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand } from "@/components/ui";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/schema";
import { articles } from "@/data/articles";

// Article pages (research expansion pack, DECISIONS.md §18) — original
// Leo-authored educational content; every fact traces to the courses'
// published data on this site (see src/data/articles.ts header).
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "GradeSpot IT Solutions" },
    publisher: { "@type": "Organization", name: "GradeSpot IT Solutions" },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Learning Articles", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />
      <PageHero title={article.title} subtitle={article.excerpt} />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Learning Articles", path: "/blog" },
                { name: article.title },
              ]}
            />
            <p className="mt-6 text-sm font-medium text-body">
              By the GradeSpot team ·{" "}
              {new Date(`${article.date}T00:00:00`).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="mt-8 space-y-10">
              {article.sections.map((s) => (
                <article key={s.heading}>
                  <h2 className="text-[26px] font-bold leading-[32px] text-heading">{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="mt-4 text-[16px] leading-8 text-body">
                      {p}
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <div className="mt-12 rounded-2xl bg-surface-light p-7">
              <h2 className="text-lg font-bold text-heading">Keep exploring</h2>
              <p className="mt-2 text-sm leading-6 text-body">
                Browse the trainings these articles draw on, compare courses side by side, or
                book a free demo class from any course page.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
                <Link href="/trainings" className="text-brand hover:text-brand-dark">
                  All Trainings →
                </Link>
                <Link href="/compare" className="text-brand hover:text-brand-dark">
                  Course Comparisons →
                </Link>
                <Link href="/blog" className="text-brand hover:text-brand-dark">
                  More Articles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
