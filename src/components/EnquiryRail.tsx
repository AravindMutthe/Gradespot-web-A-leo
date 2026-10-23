import LeadForm from "@/components/LeadForm";
import { business, stats } from "@/data/site";
import { syllabusWaLink } from "@/lib/wa";

// Sticky enquiry rail for course pages (research: the form lives ON the
// course page, next to the content — not one click away on /contact-us).
// Carries the callback form with the course pre-filled, a course-specific
// pre-filled WhatsApp button, and the published proof counters.
export default function EnquiryRail({ courseTitle }: { courseTitle: string }) {
  const waNumber = business.phones[0].replace(/[^+\d]/g, "").replace(/^\+/, "");
  const waText = encodeURIComponent(
    `Hi GradeSpot, I'm interested in ${courseTitle}. Please share the course details, batch timings and fees.`,
  );
  const happy = stats.find((s) => s.label === "Happy Learners");
  const certified = stats.find((s) => s.label === "Certified Learners");

  return (
    <aside className="lg:sticky lg:top-32">
      <h2 className="font-display text-[22px] font-semibold leading-snug text-heading">
        Request a Callback
      </h2>
      <p className="mt-1.5 text-sm leading-6 text-body">
        Ask about batches, mode of training and certification guidance for this course.
      </p>
      <div className="mt-4">
        <LeadForm interest={courseTitle} idPrefix="rail-lead" />
      </div>
      <a
        href={`https://wa.me/${waNumber}?text=${waText}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-wa px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(11,122,67,0.35)] transition-transform hover:scale-[1.02]"
      >
        Chat about this course on WhatsApp
      </a>
      <a
        href={syllabusWaLink(courseTitle)}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-wa px-6 py-3 text-[15px] font-semibold text-heading transition-colors hover:bg-brand-soft"
      >
        Get the Syllabus on WhatsApp
      </a>
      <a
        href="#demo"
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        Book a Free Demo Class
      </a>
      {happy && certified && (
        <p className="mt-4 text-center text-[13px] font-medium text-body">
          Joined by {happy.value} Happy Learners · {certified.value} Certified Learners
        </p>
      )}
    </aside>
  );
}
