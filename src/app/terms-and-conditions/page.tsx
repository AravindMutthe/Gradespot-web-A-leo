import type { Metadata } from "next";
import { termsSections } from "@/data/pages";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms and Conditions" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-10">
          {termsSections.map((s, i) => (
            <article key={i}>
              {s.heading && (
                <h2 className="text-[26px] font-semibold leading-[32px]">{s.heading}</h2>
              )}
              <div className="mt-3 space-y-4">
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
