// Topic artwork map for the modern + stylish pass (image-slot cards).
// A topic renders real art ONLY when a file has been downloaded and
// file-inspected by Leo; every other topic returns null and the card
// renders its designed token-tint panel. Never invent a path, never
// point at a remote URL — the card component refuses non-local paths
// by design.
//
// AWS art (2026-10-29): Adobe Express shapes-only regeneration,
// simplified variant 3 — orange cloud above two navy and one orange
// cylinders, full off-white background. File-inspected at full size:
// no letters, words, logos, or people. Downloaded as JPEG (that is
// the format Adobe served, despite the PNG download control), so the
// repo path keeps the true .jpg extension rather than a .webp lie.
// The alternate clean variant (navy cloud, burnt-orange frame) is
// held outside the repo as the alternate, not shipped unused.

const TOPIC_ART: Record<string, string> = {
  aws: "/images/topics/aws.jpg",
};

export function topicArt(slug: string): string | null {
  return TOPIC_ART[slug] ?? null;
}
