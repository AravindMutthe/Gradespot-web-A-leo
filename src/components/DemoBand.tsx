import LeadForm from "@/components/LeadForm";
import { syllabusWaLink, waLink } from "@/lib/wa";

// Book-a-Free-Demo band for course pages (research expansion pack,
// DECISIONS.md §18 — ppc report §1.10 / folder-1 tactic 6: the free
// demo class is a first-class conversion path, not a footnote). The
// form posts through the standard /api/leads with interest
// "Demo: <course>" so demos are attributable in the lead pipeline, and
// the WhatsApp syllabus pattern sits beside it (per-course pre-filled
// message asking for the syllabus).
export default function DemoBand({ courseTitle }: { courseTitle: string }) {
  return (
    <div className="mt-12 rounded-[20px] panel-ink p-8">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="eyebrow text-brand-bright">
            Free Demo Class
          </p>
          <h2 className="mt-3 font-display text-[26px] font-semibold text-paper">
            See the training before you join — book a free demo
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/85">
            Sit in on a real {courseTitle} session, meet the trainer and check the lab before
            you decide. Tell us you want a demo and the team will confirm a timing that suits
            you — online or at our Dilsukhnagar institute.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={syllabusWaLink(courseTitle)}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-wa px-6 py-3 text-[15px] font-semibold text-wa-bright transition-colors hover:bg-white/10"
            >
              Get the Syllabus on WhatsApp
            </a>
            <a
              href={waLink(`Hi GradeSpot, I want to book a free demo class for ${courseTitle}.`)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              Book the Demo on WhatsApp
            </a>
          </div>
        </div>
        <div className="[&_form]:shadow-none">
          <LeadForm
            interest={`Demo: ${courseTitle}`}
            idPrefix="demo-lead"
            hideMessage
            submitLabel="Book My Free Demo"
          />
        </div>
      </div>
    </div>
  );
}
