import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { termsSections } from "@/data/pages";
import { PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Terms and Conditions",
  description: "Draft terms and conditions for using the GradeSpot IT Solutions website and services, Dilsukhnagar, Hyderabad — pending owner + lawyer/CA review.",
  path: "/terms-and-conditions",
});

// Terms (§22 rich treatment): the published sections as numbered
// ledger cards in the Prospectus language, closing with a next-step
// panel — legal text unchanged, presentation no longer plain.
export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms and Conditions" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-6">
          <div className="rounded-[20px] border border-line bg-surface-light p-7 md:p-9">
            <h2 className="font-display text-[26px] font-semibold leading-[32px] text-heading">
              Draft — do not treat as a published policy
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-body">
              This page presents the terms text as drafted. It is not a finished legal
              document: it still needs owner + lawyer/CA review before publication, and one
              open contradiction is flagged for that review — the refund section below states
              fees are strictly non-refundable, while the refund policy page states no refund
              term at all until confirmed. Nothing here is legal advice.
            </p>
          </div>
          {termsSections.map((s, i) => (
            <article
              key={i}
              data-reveal
              className="rounded-[20px] border border-line bg-surface-light p-7 md:p-9"
            >
              <p className="font-mono text-[12px] font-semibold tracking-[0.1em] text-signal-strong">
                {String(i + 1).padStart(2, "0")}
              </p>
              {s.heading && (
                <h2 className="mt-2 text-[26px] font-semibold leading-[32px]">{s.heading}</h2>
              )}
              <div className="mt-3 space-y-4">
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="rounded-[20px] border border-line bg-surface-light p-8 md:p-9">
            <h2 className="font-display text-2xl font-semibold text-heading">
              Questions about these terms?
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-body">
              Reach the team through the contact page, or read how this site is built for
              accessibility.
            </p>
            <div className="mt-5 flex flex-wrap gap-3.5">
              <Link href="/contact-us" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/accessibility" className="btn-outline-navy">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
