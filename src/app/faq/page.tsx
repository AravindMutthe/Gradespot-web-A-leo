import type { Metadata } from "next";
import { FaqList, PageHero, siteFaqs } from "@/components/ui";

export const metadata: Metadata = { title: "Help & FAQs" };

export default function FaqPage() {
  return (
    <>
      <PageHero title="Help & FAQs" subtitle="Most common questions about our services" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-3xl">
          <FaqList items={siteFaqs} />
        </div>
      </section>
    </>
  );
}
