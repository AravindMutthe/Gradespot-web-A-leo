// Demo-fill markers (server components, no client JS).
//
// SampleTag: the visible "Sample" marker that accompanies EVERY
// rendered sample datum, alongside the sample font color. Color
// alone is never the sole marker (accessibility, and screenshots
// that lose color context). The tag is a white pill with
// sample-colored text and border, so it reads on light surfaces
// and on the dark detail hero alike (sample color on white:
// 7.10:1, AA PASS).

export function SampleTag() {
  return (
    <span className="inline-flex min-h-[24px] items-center rounded-full border border-sample bg-white px-2.5 py-0.5 text-[12px] font-bold text-sample">
      Sample
    </span>
  );
}
