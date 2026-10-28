import Image from "next/image";
import Link from "next/link";
import { business, telHref } from "@/data/site";

// Frontend 3.0 global footer (Stage 1, feat/frontend-v3).
// Architecture by visitor job/task, NOT the v1 column set: Learn,
// Get IT help, Explore, Get support, Legal. Every link is an existing
// route slug; nothing is added, removed, or renamed here.
// Deliberately absent, per the honesty gates: no counters, no "years",
// no employer logos (wall OFF, R10), no ISO/AICTE emblems (proof not
// found), no stats, no invented claims. Brand block carries only the
// business name, its published location label, and its published phone.

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Learn",
    links: [
      { label: "Trainings", href: "/trainings" },
      { label: "Compare courses", href: "/compare" },
      { label: "Career support", href: "/career-support" },
      { label: "Student certifications", href: "/student-certifications" },
      { label: "Certificate verification", href: "/certificate-verification" },
    ],
  },
  {
    heading: "Get IT help",
    links: [
      { label: "Services", href: "/services" },
      { label: "For institutes", href: "/for-institutes" },
      { label: "For colleges", href: "/for-colleges" },
      { label: "Corporate & international", href: "/corporate-and-international" },
      { label: "Partner with us", href: "/partner-with-us" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Team members", href: "/team-members" },
      { label: "Why choose us", href: "/why-choose-us" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Learning resources", href: "/resources" },
      { label: "Training institute in Dilsukhnagar", href: "/training-institute-in-dilsukhnagar-hyderabad" },
    ],
  },
  {
    heading: "Get support",
    links: [
      { label: "Contact us", href: "/contact-us" },
      { label: "Register", href: "/register" },
      { label: "FAQs", href: "/faq" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Refund policy", href: "/refund-policy" },
      { label: "Terms & conditions", href: "/terms-and-conditions" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const phone = business.phones[0];
  return (
    <footer className="border-t-4 border-brand-accent bg-ink text-paper">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.2fr_repeat(5,1fr)] md:py-14">
        <div>
          <Link href="/" aria-label="GradeSpot IT Solutions — home">
            <Image
              src="/images/logo-light.png"
              alt="GradeSpot IT Solutions"
              width={180}
              height={56}
              className="h-auto w-[180px]"
            />
          </Link>
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-footer-text">
            IT training and IT services in Hyderabad.
          </p>
          <p className="mt-4 text-[15px] text-footer-text">{business.locationLabel}</p>
          <a
            href={telHref(phone)}
            className="mt-1 inline-flex min-h-11 items-center text-[15px] font-semibold text-paper hover:text-brand-accent"
          >
            {phone}
          </a>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={`Footer — ${col.heading}`}>
            <h2 className="font-display text-[17px] font-semibold text-paper">{col.heading}</h2>
            <ul className="mt-4 space-y-1">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[15px] text-footer-text hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-2 py-5 text-sm text-footer-text">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
