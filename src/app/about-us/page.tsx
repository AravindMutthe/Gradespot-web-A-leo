import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { aboutParagraphs } from "@/data/pages";
import { team } from "@/data/team";
import { CtaBand, CredentialCard, PageHero, SectionTitle } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { aboutPageSchema } from "@/lib/schema";

export const metadata = staticPageMetadata({
  title: "About Us",
  description:
    "GradeSpot IT Solutions assists companies in enhancing their digital presence and fortifying their security — IT training, corporate training and internships from Dilsukhnagar, Hyderabad.",
  path: "/about-us",
});

// Frontend 3.0 — Stage 8 re-template, demo-fill emblem correction.
// Held from the old body, outright: the employer logo wall, the
// stats ribbon, the feature trio, the "9 years" experience badge,
// the signature image, team portraits, and the "1,500+ happy
// learners" paragraph (unverified count). What remains is published
// company copy plus the leadership list as text rows.
// OWNER CORRECTION 18:43 IST (supersedes the Stage 8 emblem hold):
// AICTE + ISO ARE REAL per the owner, so the existing repo emblem
// files render below as real certification marks with plain wording
// ("AICTE / ISO Certified") — NO certificate numbers, issue dates,
// scopes or standards numbers are rendered (none appear in repo
// data). The emblem files are untouched (never recoloured or
// redrawn). Leo has NOT independently inspected the certificate
// documents (the earlier Drive/Gmail search found no proof), so
// display is owner-authorised and proof remains an open item (R7).
export default function AboutPage() {
  // aboutParagraphs order follows the live About page. Index 5 is the
  // "1,500+ happy learners" paragraph — held, not rendered.
  const narrative = aboutParagraphs.slice(6, 13);
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <PageHero title="About Us — GradeSpot IT Solutions" />
      <section className="section-pad">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              label="About GradeSpot IT Solutions"
              title="We assist companies in enhancing their digital presence and fortifying their Security."
            />
            <p className="mt-4">{aboutParagraphs[0]}</p>
            <p className="mt-4 text-sm leading-6 text-body">
              Nikhil Duth D — Founder &amp; Managing Director. Accreditation
              details are confirmed on enquiry.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-heading">How We Work</h3>
            <ol className="mt-4 space-y-4">
              <li className="rounded-2xl border border-line bg-surface-light p-5">
                <span className="font-extrabold text-signal">01</span>
                <p className="mt-1">Explore from our range of services for your business needs</p>
              </li>
              <li className="rounded-2xl border border-line bg-surface-light p-5">
                <span className="font-extrabold text-signal">02</span>
                <p className="mt-1">Connect with us to schedule a meeting and discuss your needs</p>
              </li>
              <li className="rounded-2xl border border-line bg-surface-light p-5">
                <span className="font-extrabold text-signal">03</span>
                <p className="mt-1">Talk to a Trainer about online and offline classes.</p>
              </li>
            </ol>
            <Link href="/contact-us" className="btn-primary mt-6">
              Talk to a Trainer
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Our Story" title="About GradeSpot IT Solutions" center />
          <div className="mx-auto mt-8 max-w-4xl space-y-5">
            {narrative.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle title="Meet Our Leadership" center />
          <div className="mx-auto mt-8 max-w-4xl divide-y divide-line border-y border-line">
            {team.map((m) => (
              <div key={m.name} className="flex flex-wrap items-baseline justify-between gap-3 py-4">
                <div>
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-signal">{m.role}</p>
                </div>
                {m.profileHref ? (
                  <Link
                    href={m.profileHref}
                    className="text-sm font-bold text-signal hover:text-signal-strong"
                  >
                    View Profile →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <h3 className="font-display text-[20px] font-semibold text-heading">
              Questions about trainings or services?
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-body">
              The answers live in one place — our Help &amp; FAQs.
            </p>
            <Link href="/faq" className="mt-3.5 inline-block text-sm font-bold text-signal hover:text-signal-strong">
              Read Help &amp; FAQs →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Certifications" title="AICTE / ISO Certified" center />
          <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
            <CredentialCard
              title="AICTE / ISO Certified"
              body="GradeSpot IT Solutions — AICTE / ISO Certified. Certificate details are confirmed on enquiry."
              seal="aicte"
            />
            <CredentialCard
              title="AICTE / ISO Certified"
              body="GradeSpot IT Solutions — AICTE / ISO Certified. Certificate details are confirmed on enquiry."
              seal="iso"
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
