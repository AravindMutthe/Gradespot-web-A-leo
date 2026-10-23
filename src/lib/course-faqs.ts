import type { Course } from "@/data/courses";
import { courseDetails } from "@/data/course-details";
import { business } from "@/data/site";

// Factual helpers + generated course FAQs (research expansion pack,
// DECISIONS.md §18). Every answer is assembled ONLY from published
// fields: the course's own sections (job roles, pricing plans), the
// harvested enrichment (who / outcome / topics / level / certification)
// and the published duration map. Anything not published is answered
// honestly as "confirmed on enquiry" — never invented.

export function getJobRoles(course: Course): string[] {
  for (const s of course.sections) {
    if (/job roles/i.test(s.heading)) return s.paragraphs;
  }
  return [];
}

export interface PricingPlan {
  name: string;
  price: string;
}

export function getPricingPlans(course: Course): PricingPlan[] {
  const plans: PricingPlan[] = [];
  for (const s of course.sections) {
    if (s.style !== "pricing") continue;
    for (const p of s.paragraphs) {
      const [name, price] = p.split(" — ");
      if (name && price) plans.push({ name: name.trim(), price: price.trim() });
    }
  }
  return plans;
}

export function generatedCourseFaqs(course: Course): { q: string; a: string }[] {
  const d = courseDetails[course.slug];
  const title = d?.short ?? course.title;
  const faqs: { q: string; a: string }[] = [];
  const phone = business.phones[0];

  if (d) {
    faqs.push({
      q: `Who is the ${title} training for?`,
      a: `${d.who}. The published outcome of this program is: ${d.outcome}.`,
    });
  }

  faqs.push({
    q: `What is the duration of the ${title} training?`,
    a: course.duration
      ? `The published duration of the ${title} training at GradeSpot IT Solutions is ${course.duration}. Batches run in online and offline modes — call ${phone} for the current batch schedule.`
      : `The duration of the ${title} training is confirmed on enquiry — call ${phone} or send an enquiry and the team will share the current batch schedule.`,
  });

  const plans = getPricingPlans(course);
  faqs.push({
    q: `What is the fee for the ${title} training?`,
    a:
      plans.length > 0
        ? `The published plans for this training are: ${plans
            .map((p) => `${p.name} — ${p.price}`)
            .join("; ")}.`
        : `The fee for the ${title} training is confirmed on enquiry — call ${phone} and the team will share the current fee and any certification options. Nothing is charged before you confirm.`,
  });

  faqs.push({
    q: `Is the ${title} training available online or offline?`,
    a: `Both. GradeSpot runs online and offline classes for its trainings from its institute in Dilsukhnagar, Hyderabad — live sessions with recorded videos and hands-on labs.`,
  });

  if (d) {
    faqs.push({
      q: `Which certification does the ${title} training prepare for?`,
      a: `This training prepares you for ${d.certification}. The program includes exam-oriented preparation as published in the course curriculum.`,
    });
  }

  const roles = getJobRoles(course);
  if (roles.length > 0) {
    faqs.push({
      q: `What job roles does the ${title} training lead to?`,
      a: `The roles this training prepares you for include: ${roles.slice(0, 8).join(", ")}. These are the roles published on the course page — GradeSpot does not guarantee placement; it prepares you for these roles with hands-on training and certification guidance.`,
    });
  }

  if (d) {
    faqs.push({
      q: `What will I learn in the ${title} training?`,
      a: `Key topics include: ${d.topics.join("; ")}.`,
    });
  }

  faqs.push({
    q: `Can I attend a demo class before joining ${title}?`,
    a: `Yes — you can book a free demo for this course using the demo form on this page, or call ${phone}. The team will confirm the demo timing with you.`,
  });

  return faqs;
}
