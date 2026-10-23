import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { contactParagraphs } from "@/data/pages";
import { business, telHref } from "@/data/site";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/contact-us" }, title: "Contact Us" };

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
          <aside className="w-full rounded-[20px] panel-ink p-8 lg:max-w-[400px] lg:p-[50px]">
            <h2 className="font-display text-2xl font-semibold text-paper">Get in Touch</h2>
            <div className="mt-6 space-y-6 text-sm leading-6">
              <div>
                <h3 className="font-semibold text-brand-bright">Our Location</h3>
                <p className="mt-1 text-paper/85">{business.address}</p>
              </div>
              <div>
                <h3 className="font-semibold text-brand-bright">Send Us Mail</h3>
                {business.emails.map((e) => (
                  <p key={e}>
                    <a className="text-paper/85 hover:text-brand-bright" href={`mailto:${e}`}>
                      {e}
                    </a>
                  </p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-brand-bright">Call Us</h3>
                {allPhones.map((p) => (
                  <p key={p}>
                    <a className="text-paper/85 hover:text-brand-bright" href={telHref(p)}>
                      {p}
                    </a>
                  </p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold text-brand-bright">Office Hours</h3>
                <p className="mt-1 text-paper/85">{business.officeHours}</p>
              </div>
            </div>
          </aside>
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
