import Link from "next/link";
import { business, telHref } from "@/data/site";

// Conversion chrome from the researched instructions: a floating WhatsApp
// button on every page and a sticky Call / WhatsApp / Enquire bar on
// mobile. Uses only the one published phone number — no new content.
const phone = business.phones[0];
const waNumber = phone.replace(/[^+\d]/g, "").replace(/^\+/, "");
// Research rule: never open a blank chat window — always pre-fill.
const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
  "Hi GradeSpot, I have an enquiry about your trainings and services. Please share the details.",
)}`;

function ChatIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function FloatingActions() {
  return (
    <>
      {/* Floating WhatsApp — desktop only. On mobile the sticky bar
          below already carries WhatsApp; showing both stacked two
          WhatsApp actions on one phone screen (§22 declutter). */}
      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with GradeSpot IT Solutions on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_10px_30px_rgba(11,122,67,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(11,122,67,0.5)] nav:flex"
      >
        <ChatIcon />
      </a>

      {/* Mobile sticky CTA bar — the phone-first conversion row:
          Call / WhatsApp / Register (the demo+registration door,
          §22 — "Enquire" sent students to a generic contact form). */}
      <div className="glass-ink fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-white/10 text-center nav:hidden">
        <a
          href={telHref(phone)}
          className="flex min-h-[52px] items-center justify-center py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-white active:bg-white/10"
        >
          Call Now
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[52px] items-center justify-center border-x border-white/10 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-wa-bright active:bg-white/10"
        >
          WhatsApp
        </a>
        <Link href="/register" className="flex min-h-[52px] items-center justify-center py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-bright active:bg-white/10">
          Register
        </Link>
      </div>
    </>
  );
}
