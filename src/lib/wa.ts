import { business } from "@/data/site";

// WhatsApp deep links (research rule, applied sitewide since the
// compliance pass: never open a blank chat window — always pre-fill a
// message matched to the page's context).
export const waNumber = business.phones[0].replace(/[^+\d]/g, "").replace(/^\+/, "");

export function waLink(text: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}

export function syllabusWaLink(courseTitle: string): string {
  return waLink(
    `Hi GradeSpot, please send me the syllabus for ${courseTitle}. I'd like the topics, duration and batch details.`,
  );
}

export function courseWaLink(courseTitle: string): string {
  return waLink(
    `Hi GradeSpot, I'm interested in ${courseTitle} in Hyderabad. Please share the course details, batch timings and fees.`,
  );
}
