import { staticPageMetadata } from "@/lib/metadata";
import { CtaBand, FaqList, PageHero, siteFaqs } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Help & FAQs",
  description:
    "Answers to common questions about GradeSpot IT Solutions trainings — batch schedules, online and offline class modes, fees confirmed on enquiry, and how to contact the team in Dilsukhnagar, Hyderabad.",
  path: "/faq",
});

// Stage 8: the visible FAQ text is the published site FAQ set with four
// answers corrected in ui.tsx (demo "Yes" → confirmed on enquiry; fees
// "published per course" → confirmed on enquiry; employer-wall clause
// and "hands-on labs" assertion removed). FAQPage schema is REMOVED:
// no FAQ set on this site has a recorded human approval, and schema is
// the stronger claim — approval is owed before it returns.
export default function FaqPage() {
  return (
    <>
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
