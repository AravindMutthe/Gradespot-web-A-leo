// Safe artwork + icons — local only, secure only.
//
// What this file is: decorative category/service/division marks and a
// token-palette SVG motif, created in this repo (inline SVG, no file
// asset, no download, no remote font, no new dependency).
//
// What this file is NOT: a logo set. No vendor mark, employer logo,
// government/official emblem, or AI-generated logo is drawn, copied,
// or implied here. Every mark below is a generic Unicode symbol or an
// abstract shape (nodes, rings, dots). Symbols are decorative only:
// they always carry aria-hidden="true" at the call site and never
// carry meaning alone — the text label next to them is the content.
// An illustration of a network is decoration, not a claim GradeSpot
// runs that network; an icon of a shield is decoration, not a
// certification, partnership, or security claim.

const CATEGORY_ICONS: Record<string, string> = {
  AWS: "🖥️",
  Cisco: "🔌",
  CompTIA: "🧰",
  Cybersecurity: "🛡️",
  "Design & CAD": "📐",
  "Digital Marketing": "📣",
  "Medical Coding": "🏥",
  "Microsoft Azure": "☁️",
  Networking: "🌐",
  "Programming & Data": "💻",
};

const SERVICE_ICONS: Record<string, string> = {
  "Corporate Trainings": "🎓",
  Internships: "📚",
  "Industrial Trainings": "🏭",
  "College Workshops": "🏫",
  "Cybersecurity Services": "🛡️",
  "Web Development": "🌐",
  "Digital Marketing Solutions": "📣",
  "Network Infrastructure Building": "🔌",
  "Logo Designing": "🎨",
  "US IT Staffing": "👥",
  "Domestic Consultancy": "🤝",
  "Abroad Consultancy": "✈️",
};

const DIVISION_ICONS: Record<string, string> = {
  "web-software": "🌐",
  education: "🎓",
  "cloud-managed": "☁️",
  "ai-automation": "🤖",
  cybersecurity: "🛡️",
  "digital-learning-saas": "💻",
  partnerships: "🤝",
};

const HERO_BLOCK_ICONS: Record<string, string> = {
  "Cybersecurity Academy": "🛡️",
  "Cloud & Infrastructure": "☁️",
  "Career Pathways": "🎓",
  "Enterprise Solutions": "🏢",
};

const SHOWCASE_ICONS: Record<string, string> = {
  "IT Consultancy": "🤝",
  "Cyber Security": "🛡️",
  "Cloud Computing": "☁️",
  "Backup & Recovery": "💾",
};

export function categoryIcon(category: string): string {
  return CATEGORY_ICONS[category] ?? "📚";
}

export function serviceIcon(title: string): string {
  return SERVICE_ICONS[title] ?? "💼";
}

export function divisionIcon(key: string): string {
  return DIVISION_ICONS[key] ?? "💼";
}

export function heroBlockIcon(label: string): string {
  return HERO_BLOCK_ICONS[label] ?? "📚";
}

export function showcaseIcon(title: string): string {
  return SHOWCASE_ICONS[title] ?? "📚";
}

// Abstract motif: nodes + connecting lines, or rings, or dots — drawn
// in white at low opacity over the design-led gradient, in the logo
// palette's supporting tones. No text, no price, no date, no statistic,
// no rating, no logo, no person likeness inside the artwork.
export function ArtworkMotif({
  variant = "network",
  className = "",
}: {
  variant?: "network" | "rings" | "dots";
  className?: string;
}) {
  if (variant === "rings") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
        className={className}
      >
        <g fill="none" stroke="#ffffff" strokeOpacity="0.35">
          <circle cx="160" cy="30" r="44" />
          <circle cx="160" cy="30" r="28" />
          <circle cx="160" cy="30" r="12" />
          <circle cx="40" cy="95" r="26" />
          <circle cx="40" cy="95" r="12" />
        </g>
      </svg>
    );
  }
  if (variant === "dots") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
        className={className}
      >
        <g fill="#ffffff" fillOpacity="0.3">
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 9 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={12 + c * 22} cy={12 + r * 24} r="2" />
            )),
          )}
        </g>
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      preserveAspectRatio="none"
      className={className}
    >
      <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1">
        <line x1="20" y1="90" x2="70" y2="40" />
        <line x1="70" y1="40" x2="130" y2="70" />
        <line x1="130" y1="70" x2="180" y2="25" />
        <line x1="70" y1="40" x2="110" y2="100" />
        <line x1="130" y1="70" x2="110" y2="100" />
      </g>
      <g fill="#ffffff" fillOpacity="0.55">
        <circle cx="20" cy="90" r="5" />
        <circle cx="70" cy="40" r="6" />
        <circle cx="130" cy="70" r="5" />
        <circle cx="180" cy="25" r="6" />
        <circle cx="110" cy="100" r="4" />
      </g>
    </svg>
  );
}
