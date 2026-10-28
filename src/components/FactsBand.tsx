// Modern + stylish pass (feat/frontend-v3-modern-stylish, owner-approved
// 2026-10-29) — FactsBand: the home-only band of verified facts.
// Exactly three facts, all derived from repo data or published copy:
//   - courses.length courses (repo catalogue data, never a typed-in count)
//   - services.length services (repo catalogue data, never a typed-in count)
//   - Dilsukhnagar, classroom + online (published location + mode)
// Nothing else is shown here: no scale claims, no third-party marks,
// no quoted voices. The counts are props so the band can never drift
// from the data: the home page passes courses.length and
// services.length, and the test pins that wiring.

interface FactsBandProps {
  courseCount: number;
  serviceCount: number;
}

export default function FactsBand({ courseCount, serviceCount }: FactsBandProps) {
  const facts = [
    { value: String(courseCount), label: "courses" },
    { value: String(serviceCount), label: "services" },
    { value: "Dilsukhnagar", label: "Classroom + online" },
  ];
  return (
    <section aria-label="GradeSpot in brief" className="panel-ink py-10 md:py-14">
      <div className="wrap grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} data-reveal>
            <p className="font-display text-[42px] leading-none font-semibold text-brand-bright md:text-[56px]">
              {fact.value}
            </p>
            <p className="eyebrow mt-2.5 text-footer-text">{fact.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
