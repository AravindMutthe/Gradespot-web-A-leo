import type { Metadata } from "next";
import { FaqList, PageHero, siteFaqs } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" }, title: "Help & FAQs" };

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
    </>
  );
}
