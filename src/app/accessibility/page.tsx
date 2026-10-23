import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/ui";
import { business, telHref } from "@/data/site";

// Accessibility statement (Leo redesign v1, DECISIONS.md §19) —
// written ONLY from what this build actually implements and has
// verified; no aspirational claims. If a measure is not listed here,
// this page does not claim it.
export const metadata: Metadata = {
  alternates: { canonical: "/accessibility" },
  title: "Accessibility",
  description:
    "How the GradeSpot IT Solutions website is built for accessibility — the WCAG 2.2 AA measures implemented in this build, and how to reach us if anything does not work for you.",
};

const measures = [
  {
    t: "Structure you can navigate by ear",
    d: "Pages use semantic HTML5 landmarks (header, nav, main, footer), one clear heading order, breadcrumb trails on detail pages, and a Skip to Content link as the first focusable element.",
  },
  {
    t: "Contrast that meets WCAG 2.2 AA",
    d: "Text and interactive colours are tokenised and measured: body text sits at 7.8:1 against the page background, links and button text at 4.8:1 or better, and accents on dark panels at 5.6:1 or better.",
  },
  {
    t: "Visible focus, generous targets",
    d: "Keyboard focus is always shown with a 2px outline, anchored sections scroll clear of the sticky header, and navigation links and action-bar buttons are at least 44px tall.",
  },
  {
    t: "Motion only if you allow it",
    d: "Scroll-reveal effects and the scrolling board are disabled when your system requests reduced motion — the board becomes a static list and content is never hidden.",
  },
  {
    t: "Images and forms with labels",
    d: "Informative images carry alt text (decorative images are marked as such), and every form field has a visible label, a proper input type (including tel for phone numbers), and error messages in text.",
  },
  {
    t: "Readable without scripts",
    d: "All page content is server-rendered and readable with JavaScript disabled; scripts only enhance (menus, reveals, form submission states).",
  },
];

export default function AccessibilityPage() {
  const phone = business.phones[0];
  return (
    <>
      <PageHero
        title="Accessibility"
        subtitle="This website is built to be usable by everyone, including visitors using assistive technology. This statement describes only what the current build actually implements."
      />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <SectionTitle label="Our Measures" title="What this build implements" />
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {measures.map((m) => (
                <article
                  key={m.t}
                  className="rounded-[18px] border border-line bg-parchment p-6 shadow-[0_1px_2px_rgba(31,24,16,0.05)]"
                >
                  <h3 className="font-display text-[19px] font-semibold text-heading">{m.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{m.d}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-[20px] panel-ink p-8">
              <h2 className="font-display text-2xl font-semibold text-paper">
                Something not working for you?
              </h2>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-7 text-paper/80">
                Tell us what you were trying to do and what got in the way, and we will provide
                the same information or service another way — by phone, WhatsApp or email — and
                fix the barrier in the site.
              </p>
              <div className="mt-6 flex flex-wrap gap-3.5">
                <a href={telHref(phone)} className="btn-primary">
                  Call {phone}
                </a>
                <a href={`mailto:${business.emails[0]}`} className="btn-outline-light">
                  {business.emails[0]}
                </a>
              </div>
              <p className="mt-5 text-sm text-paper/70">
                Prefer a form? Use the{" "}
                <Link href="/contact-us" className="font-semibold text-brand-bright underline underline-offset-4">
                  contact page
                </Link>{" "}
                — it reaches the same team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
