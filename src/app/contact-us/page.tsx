import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { contactParagraphs } from "@/data/pages";
import { business, telHref } from "@/data/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  const allPhones = [...business.phones, ...business.extraPhones];
  return (
    <>
      <PageHero title="Contact Us — GradeSpot IT Solutions" />
      <section className="section-pad">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-[32px] font-semibold leading-[38px]">Contact GradeSpot IT Solutions</h2>
            <div className="mt-4 space-y-4">
              {contactParagraphs.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>

          {/* Side panel — dimensions follow the live site's contact panel */}
          <aside className="w-full bg-heading p-[50px] text-white lg:max-w-[400px]">
            <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
            <div className="mt-6 space-y-6 text-sm leading-6">
              <div>
                <h3 className="font-semibold text-brand">Our Location</h3>
                <p className="mt-1 text-white/85">{business.address}</p>
              </div>
              <div>
                <h3 className="font-semibold text-brand">Send Us Mail</h3>
                {business.emails.map((e) => (
                  <p key={e}>
                    <a className="text-white/85 hover:text-brand" href={`mailto:${e}`}>
                      {e}
                    </a>
                  </p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-brand">Call Us</h3>
                {allPhones.map((p) => (
                  <p key={p}>
                    <a className="text-white/85 hover:text-brand" href={telHref(p)}>
                      {p}
                    </a>
                  </p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-brand">Office Hours</h3>
                <p className="mt-1 text-white/85">{business.officeHours}</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="wrap mt-14 grid gap-6 md:grid-cols-2">
          <article className="rounded-lg bg-surface-light p-7">
            <h2 className="text-2xl font-semibold">24/7 Customer Support</h2>
            <p className="mt-2 text-sm leading-6">{contactParagraphs[6]}</p>
          </article>
          <article className="rounded-lg bg-surface-light p-7">
            <h2 className="text-2xl font-semibold">Smart Solutions</h2>
            <p className="mt-2 text-sm leading-6">{contactParagraphs[7]}</p>
          </article>
        </div>

        <div className="wrap mt-14">
          <h2 className="text-2xl font-semibold">Find Us</h2>
          <iframe
            title="GradeSpot IT Solutions — Dilsukhnagar, Hyderabad"
            src={`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
            className="mt-4 h-96 w-full rounded-lg border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
