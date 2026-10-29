import { staticPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/ui";
import { business, telHref } from "@/data/site";

export const metadata = staticPageMetadata({
  title: "Accessibility",
  description:
    "How the GradeSpot IT Solutions website is built for accessibility — the measures implemented in this build, and how to reach us if anything does not work for you.",
  path: "/accessibility",
});

// Accessibility statement — Frontend 3.0 Stage 8 rewrite. The old page
// described the v1 build: a header theme toggle (Stage 1 has none —
// light-first, dark deferred), contrast numbers measured on v1 tokens,
// and a scrolling board with scroll-reveal behaviour. None of those
// describe this build, so none are claimed here. Only measures this
// build actually implements are listed; contrast measurement on the
// Stage 1 candidate tokens is still owed (see report).
const measures = [
  {
    t: "Structure you can navigate by ear",
    d: "Pages use semantic HTML5 landmarks (header, nav, main, footer), one clear heading order, breadcrumb trails on detail pages, and a Skip to Content link as the first focusable element.",
  },
  {
    t: "Visible focus, generous targets",
    d: "Keyboard focus is always shown, anchored sections scroll clear of the sticky header, and navigation links and action buttons are at least 44px tall.",
  },
  {
    t: "Menus that work by keyboard",
    d: "Header menus open on click, never on hover alone; one menu is open at a time, and Escape or clicking outside closes it.",
  },
  {
    t: "Motion only if you allow it",
    d: "Content is never hidden behind a reveal effect: everything on a page is readable without scripts or animation.",
  },
  {
    t: "Images and forms with labels",
    d: "Informative images carry alt text (decorative images are marked as such), and every form field has a visible label, a proper input type (including tel for phone numbers), and error messages in text.",
  },
  {
    t: "Readable without scripts",
    d: "All page content is server-rendered and readable with JavaScript disabled; scripts only enhance (menus, form submission states).",
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
                  className="rounded-[18px] border border-line bg-surface-light p-6"
                >
                  <h3 className="font-sans text-[19px] font-semibold text-heading">{m.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">{m.d}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-[20px] border border-line bg-surface-light p-8">
              <h2 className="font-display text-2xl font-semibold text-heading">
                Something not working for you?
              </h2>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-7 text-body">
                Tell us what you were trying to do and what got in the way, and we will provide
                the same information or service another way — by phone, WhatsApp or email — and
                fix the barrier in the site.
              </p>
              <div className="mt-6 flex flex-wrap gap-3.5">
                <a href={telHref(phone)} className="btn-primary">
                  <span aria-hidden="true">📞</span> Call
                </a>
                <a href={`mailto:${business.emails[0]}`} className="btn-outline-navy">
                  {business.emails[0]}
                </a>
              </div>
              <p className="mt-5 text-sm text-body">
                Prefer a form? Use the{" "}
                <Link href="/contact-us" className="font-semibold text-action underline underline-offset-4">
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
