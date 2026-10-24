import { staticPageMetadata } from "@/lib/metadata";
import { CtaBand, FaqList, PageHero, siteFaqs } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata = staticPageMetadata({
  title: "Help & FAQs",
  description: "Answers to common questions about GradeSpot IT Solutions trainings — batch schedules, online and offline class modes, fees where published, free demo classes, and how to contact the team in Dilsukhnagar, Hyderabad.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(siteFaqs)} />
      <PageHero title="Help & FAQs" subtitle="Most common questions about our services" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-3xl">
          <FaqList items={siteFaqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
