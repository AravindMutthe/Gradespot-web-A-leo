// Demo markers — preview branch ONLY (feat/demo-content-gaps).
//
// Rule (standing demo-fill policy): every surface that renders demo
// content carries a VISIBLE "Demo" marker, and every page with demo
// content carries the legend below. A demo surface without its marker
// is a defect; tests/demo-content.test.ts enforces it by model flag
// and by source reference. When official inputs replace demo content
// page by page, that page's marker goes away with the demo content.

export function DemoBadge() {
  return (
    <span
      data-demo-marker
      className="inline-flex shrink-0 items-center rounded-md border border-warning-text bg-warning-surface px-2 py-0.5 text-[12px] font-bold uppercase tracking-wide text-warning-text"
    >
      Demo
    </span>
  );
}

export function DemoNote({ dark = false }: { dark?: boolean }) {
  return (
    <p
      data-demo-note
      className={`mt-3 max-w-3xl text-sm leading-6 ${dark ? "text-white/85" : "text-body"}`}
    >
      Demo content: this page shows placeholder demo copy written for
      demonstration. It will be replaced page by page from official
      GradeSpot inputs. Nothing marked Demo here is a confirmed course,
      service, fee, schedule, or offer — confirm details on enquiry.
    </p>
  );
}
