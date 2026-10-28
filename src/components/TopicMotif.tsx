// Finished abstract motifs (Das verdict 2026-10-29, owner-adopted
// the same day): when a topic has no verified artwork file, its card
// shows a deliberately finished original motif — never a blank panel
// waiting for art, never a broken image, never a box pretending to
// be a photo. All motifs are decorative abstract geometry rendered
// as inline SVG: token colors only, static (no animation), no text,
// no letters, no numerals, no logos, no vendor imitation. The AWS
// card keeps its real verified artwork; its motif is fallback-only
// if that file is ever absent. Unknown slugs get the generic motif.

export type MotifKind =
  | "cloud"
  | "network"
  | "shield"
  | "cluster"
  | "drafting"
  | "signal"
  | "medical"
  | "bracket"
  | "generic";

const MOTIF_BY_SLUG: Record<string, MotifKind> = {
  "microsoft-azure": "cloud",
  aws: "cloud",
  cisco: "network",
  networking: "network",
  cybersecurity: "shield",
  comptia: "cluster",
  "design-cad": "drafting",
  "digital-marketing": "signal",
  "medical-coding": "medical",
  "programming-data": "bracket",
};

export function motifKindForSlug(slug: string): MotifKind {
  return MOTIF_BY_SLUG[slug] ?? "generic";
}

// Each motif is drawn on a 200x200 viewBox. Primary shapes use solid
// token colors so the motif reads against the tint panel; depth
// shapes use low-opacity token fills. All strokes are token colors.

function CloudMotif() {
  return (
    <>
      <path
        d="M38 118a30 30 0 0 1 24-46 38 38 0 0 1 72 2 28 28 0 0 1 26 44z"
        className="fill-ink"
      />
      <path d="M100 118v34" className="stroke-brand" strokeWidth="5" />
      <circle cx="62" cy="164" r="10" className="fill-brand" />
      <circle cx="100" cy="172" r="10" className="fill-brand" />
      <circle cx="138" cy="164" r="10" className="fill-brand" />
    </>
  );
}

function NetworkMotif() {
  return (
    <>
      <path
        d="M40 60 100 40l60 20-30 60-60 20z M100 40v100 M40 60l60 80 M160 60l-60 80"
        className="stroke-ink"
        strokeWidth="4"
        fill="none"
      />
      <circle cx="40" cy="60" r="12" className="fill-brand" />
      <circle cx="100" cy="40" r="12" className="fill-brand" />
      <circle cx="160" cy="60" r="12" className="fill-brand" />
      <circle cx="100" cy="140" r="12" className="fill-brand" />
      <circle cx="70" cy="120" r="8" className="fill-ink" />
      <circle cx="130" cy="120" r="8" className="fill-ink" />
    </>
  );
}

function ShieldMotif() {
  return (
    <>
      <path
        d="M100 26 152 52v52c0 34-22 56-52 70-30-14-52-36-52-70V52z"
        className="fill-ink/10 stroke-ink"
        strokeWidth="5"
      />
      <circle cx="100" cy="92" r="22" className="fill-brand" />
      <circle cx="100" cy="92" r="9" className="fill-ink" />
      <circle cx="62" cy="152" r="7" className="fill-brand" />
      <circle cx="138" cy="152" r="7" className="fill-brand" />
    </>
  );
}

function ClusterMotif() {
  const dots: Array<[number, number]> = [
    [50, 50],
    [100, 50],
    [150, 50],
    [50, 100],
    [100, 100],
    [150, 100],
    [50, 150],
    [100, 150],
    [150, 150],
  ];
  return (
    <>
      <path
        d="M50 50h100v100H50z M50 100h100 M100 50v100"
        className="stroke-brand"
        strokeWidth="3"
        fill="none"
      />
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" className="fill-ink" />
      ))}
    </>
  );
}

function DraftingMotif() {
  // Drafting-line geometry only: construction lines, a triangle and
  // a circle. No tick marks, no graduations, no numerals of any kind.
  return (
    <>
      <path d="M30 160h140 M30 40v120" className="stroke-ink" strokeWidth="4" />
      <path d="M50 160 150 60l-60 0z" className="stroke-brand" strokeWidth="4" fill="none" />
      <circle cx="128" cy="122" r="34" className="stroke-ink" strokeWidth="4" fill="none" />
      <path d="M30 40l140 120" className="stroke-ink" strokeWidth="2" />
    </>
  );
}

function SignalMotif() {
  return (
    <>
      <path
        d="M40 160a120 120 0 0 1 120-120 M70 160a80 80 0 0 1 80-80 M100 160a40 40 0 0 1 40-40"
        className="stroke-brand"
        strokeWidth="6"
        fill="none"
      />
      <circle cx="40" cy="160" r="12" className="fill-ink" />
      <circle cx="160" cy="40" r="8" className="fill-brand" />
    </>
  );
}

function MedicalMotif() {
  const plus = (cx: number, cy: number, s: number, cls: string) => (
    <path
      d={`M${cx - s / 3} ${cy - s}h${(2 * s) / 3}v${(2 * s) / 3}h${(2 * s) / 3}v${(2 * s) / 3}h-${(2 * s) / 3}v${(2 * s) / 3}h-${(2 * s) / 3}v-${(2 * s) / 3}h-${(2 * s) / 3}v-${(2 * s) / 3}h${(2 * s) / 3}z`}
      className={cls}
    />
  );
  return (
    <>
      <path d="M30 30h140v140H30z" className="stroke-ink" strokeWidth="3" fill="none" />
      {plus(70, 70, 36, "fill-brand")}
      {plus(130, 70, 36, "fill-ink")}
      {plus(70, 130, 36, "fill-ink")}
      {plus(130, 130, 36, "fill-brand")}
    </>
  );
}

function BracketMotif() {
  return (
    <>
      <path
        d="M60 40v120h30 M140 40v120h-30"
        className="stroke-ink"
        strokeWidth="10"
        fill="none"
      />
      <circle cx="100" cy="70" r="8" className="fill-brand" />
      <circle cx="100" cy="100" r="8" className="fill-brand" />
      <circle cx="100" cy="130" r="8" className="fill-brand" />
    </>
  );
}

function GenericMotif() {
  return (
    <>
      <circle cx="100" cy="100" r="66" className="stroke-ink" strokeWidth="4" fill="none" />
      <circle cx="100" cy="34" r="10" className="fill-brand" />
      <circle cx="158" cy="132" r="10" className="fill-brand" />
      <circle cx="42" cy="132" r="10" className="fill-brand" />
      <circle cx="100" cy="100" r="12" className="fill-ink" />
    </>
  );
}

const MOTIFS: Record<MotifKind, () => React.ReactNode> = {
  cloud: CloudMotif,
  network: NetworkMotif,
  shield: ShieldMotif,
  cluster: ClusterMotif,
  drafting: DraftingMotif,
  signal: SignalMotif,
  medical: MedicalMotif,
  bracket: BracketMotif,
  generic: GenericMotif,
};

export default function TopicMotif({
  slug,
  className = "",
  preserveAspectRatio,
}: {
  slug: string;
  className?: string;
  preserveAspectRatio?: string;
}) {
  const Motif = MOTIFS[motifKindForSlug(slug)];
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    >
      <Motif />
    </svg>
  );
}
