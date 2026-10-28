// Demo-fill legend banner (server component, no client JS).
//
// Rendered on every page that carries sample content, above the
// sample content itself. Deliberately a single component so the
// purge removes it in one place: delete the DemoLegend usages (and
// this file) when real company data replaces the samples. The
// legend's own text is a notice, not sample data, so it renders in
// body text with a Sample tag — it does not itself need the sample
// font color.

import { SampleTag } from "@/components/SampleTag";
import { SAMPLE_LEGEND_TEXT } from "@/lib/demo-fill";

export function DemoLegend() {
  return (
    <div
      role="note"
      className="rounded-2xl border border-sample/40 bg-[#F5F3FF] p-5"
    >
      <p className="flex flex-wrap items-center gap-3 text-[15px] leading-7 text-body">
        <SampleTag />
        <span>{SAMPLE_LEGEND_TEXT}</span>
      </p>
    </div>
  );
}
