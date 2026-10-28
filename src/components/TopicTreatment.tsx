// Category treatment (Das verdict 2026-10-29, owner-adopted the same
// day): a category page carries exactly ONE treatment above its
// complete course list — never a per-course card grid duplicating
// the directory. The treatment shows the topic's verified artwork
// when the topicArt map has a file, otherwise the finished SVG
// motif for the topic. It is a panel, not a link: it depicts the
// page the visitor is already on. Rounded corners live in this
// component file, so per-page rounded counts are unaffected.

import Image from "next/image";
import TopicMotif from "@/components/TopicMotif";
import { topicArt } from "@/lib/topic-art";

export default function TopicTreatment({
  slug,
  name,
  countLabel,
}: {
  slug: string;
  name: string;
  countLabel?: string;
}) {
  const art = topicArt(slug);
  return (
    <div data-reveal className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="relative aspect-video overflow-hidden bg-surface-muted">
        {art ? (
          <Image src={art} alt="" fill className="object-cover" />
        ) : (
          <TopicMotif
            slug={slug}
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 p-5">
        <p className="text-lg font-semibold text-ink">{name}</p>
        {countLabel && <p className="text-sm text-muted">{countLabel}</p>}
      </div>
    </div>
  );
}
