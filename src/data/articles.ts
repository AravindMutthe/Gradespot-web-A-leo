// Learning articles (research expansion pack, DECISIONS.md §18).
// The Oct-6 build's BLOG_POSTS were stubs ("[Pending: article body]"),
// so these three articles are ORIGINAL, Leo-authored educational
// content written for this build — every fact in them comes from the
// courses' real published data (topics, durations, certifications, job
// roles) already on this site. No statistics, quotes, salaries or
// external claims are asserted. Dates are the authoring dates.

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO — authoring date
  sections: { heading: string; paragraphs: string[] }[];
}

export const articles: Article[] = [
  {
    slug: "how-to-start-a-cybersecurity-career",
    title: "How to Start a Cybersecurity Career",
    excerpt:
      "A practical roadmap from zero: build the networking base, choose offence or defence, and use certifications as milestones — mapped to real GradeSpot courses and the roles they prepare you for.",
    date: "2026-10-23",
    sections: [
      {
        heading: "Step 1: Build the base everyone stands on",
        paragraphs: [
          "Every security role — attacker or defender — works on top of networks and systems. That is why the published starting points are fundamentals, not hacking tools: network components, topologies and architectures; the OSI and TCP/IP models; IP addressing, routing and network services; and how WANs, wireless networks, cloud and datacenter environments fit together. Those are the topics of the CompTIA Network+ training, and the Computer Hardware and Networking Training covers the machine-level base — hardware fundamentals and networking essentials with hands-on practical labs.",
          "If you are a beginner or IT support staff member, this base is not a delay — it is what makes the security material in step 2 actually make sense.",
        ],
      },
      {
        heading: "Step 2: Choose a direction — offence or defence",
        paragraphs: [
          "Cybersecurity splits early into two crafts. Defence is the world of the Security Operations Centre: threat detection and incident response, SIEM tools such as Splunk Enterprise Security, IBM QRadar and AlienVault, log analysis across Windows, Linux, Mac and firewalls, and threat intelligence-driven operations. That is the SOC Analyst training — a 90-day program whose published outcome is job-ready SOC Analyst (Tier 1, 2 and 3) roles.",
          "Offence is the attacker's craft, practised legally: ethical hacking concepts and methodology, footprinting and reconnaissance, scanning networks, system hacking, vulnerability analysis and cryptography. That is the Certified Ethical Hacker (CEH v13) training — 45 days, built around live labs and CEH v13 exam preparation.",
          "Between the two sits the broad foundation: CompTIA Security+ (30 days) covers security fundamentals — the CIA triad, AAA and non-repudiation — plus threats and vulnerabilities, security control categories, gap analysis and Zero Trust architecture concepts. Its published outcome is Security+ certification and SOC / security analyst roles, so it works as a first milestone whichever direction you later choose.",
        ],
      },
      {
        heading: "Step 3: Let certifications mark the milestones",
        paragraphs: [
          "Certifications are how employers read your progress, and each GradeSpot training names the one it prepares for: CompTIA Network+ (N10-008 / N10-009) for the networking base, CompTIA Security+ (SY0-701) for the security foundation, EC-Council CEH v13 for ethical hacking, and the SOC Analyst program aligned to EC-Council CSA and Microsoft SC-200. Treat them as milestones on the roadmap, not as the roadmap itself — the hands-on labs and live classes are where the skill is built.",
        ],
      },
      {
        heading: "Step 4: Aim at a named role",
        paragraphs: [
          "A roadmap needs a destination, and the course pages publish the roles each training prepares you for. The SOC path leads to SOC Analyst (Tier 1, 2, 3), Cybersecurity Analyst, Threat Intelligence Analyst, Incident Response Specialist and SIEM Administrator roles. The CEH path leads to Ethical Hacker / Penetration Tester, Vulnerability Assessment Analyst, Security Analyst and Cyber Defense Analyst roles. Security+ prepares you for Security Analyst, Security Engineer, Security Administrator and IT Auditor roles, among others.",
          "Pick the role first, then walk the roadmap backwards. If you are unsure, book a free demo class on the course page of the path you are leaning towards, or take a free counselling call — seeing a real session settles the question faster than any article.",
        ],
      },
    ],
  },
  {
    slug: "ceh-vs-security-plus-which-first",
    title: "CEH vs Security+: Which Certification Should You Do First?",
    excerpt:
      "CEH teaches you to attack; Security+ teaches you to defend. A factual comparison of focus, duration, certification and roles — from the two courses' own published pages.",
    date: "2026-10-23",
    sections: [
      {
        heading: "The one-line difference",
        paragraphs: [
          "CEH v13 is offensive security: ethical hacking concepts, framework and methodology; footprinting, reconnaissance and scanning networks; system hacking and malware analysis; vulnerability analysis and cryptography — practised in live labs, toward the EC-Council CEH v13 certification. Security+ is defensive foundations: the CIA triad, AAA and non-repudiation; threats, vulnerabilities and threat actor analysis; security control categories and gap analysis; and Zero Trust architecture concepts — toward the CompTIA Security+ certification.",
        ],
      },
      {
        heading: "The published facts, side by side",
        paragraphs: [
          "Duration: CEH training at GradeSpot runs 45 days; Security+ runs 30 days. Both are beginner-friendly and run in online and offline modes. CEH's published audience is beginners and security enthusiasts who want ethical hacking from zero; Security+'s is beginners and IT staff moving into cybersecurity. CEH's published outcome is the CEH v13 certification and ethical hacker roles; Security+'s is the Security+ certification and SOC / security analyst roles.",
          "The roles tell the same story. CEH prepares you for Ethical Hacker / Penetration Tester, Vulnerability Assessment Analyst and Cyber Defense Analyst roles. Security+ prepares you for Security Analyst, Security Engineer, Security Administrator, IT Auditor and Penetration Tester / Ethical Hacker roles. The full side-by-side table is on our CEH vs Security+ comparison page.",
        ],
      },
      {
        heading: "So which first?",
        paragraphs: [
          "If your goal is a broad security foundation — especially a SOC or security analyst seat — Security+ is the published foundation route, and its 30 days make it the shorter first milestone. If your goal is hands-on offence — hacking labs, penetration testing direction — CEH is the direct route, and it is also published as beginner-friendly, so you do not need Security+ first.",
          "Neither order is wrong; they are two doors into the same field, and many learners eventually hold both. If you are still torn, book a free demo of each — the course pages carry the demo form — and decide after sitting in both classrooms.",
        ],
      },
    ],
  },
  {
    slug: "what-does-a-soc-analyst-do",
    title: "What Does a SOC Analyst Actually Do?",
    excerpt:
      "Monitoring, detection and response — the daily work of a Security Operations Centre analyst, explained through the topics and tools of a real SOC training syllabus.",
    date: "2026-10-23",
    sections: [
      {
        heading: "Watching the walls: monitoring and detection",
        paragraphs: [
          "A SOC (Security Operations Centre) analyst spends the day inside the organisation's detection tooling. The core skill is threat detection: reading alerts and logs across Windows, Linux, Mac and firewall sources and deciding what is noise and what is an incident. The tooling has names you will see in the SOC Analyst syllabus — SIEM platforms such as Splunk Enterprise Security, IBM QRadar and AlienVault collect those logs and surface the events that matter.",
        ],
      },
      {
        heading: "Responding: process, not panic",
        paragraphs: [
          "When an alert is real, the analyst follows incident response processes — documented SOPs (standard operating procedures) and collaboration with the IRT (incident response team). Threat intelligence-driven SOC operations means the team also works from knowledge of current attacker behaviour, not just yesterday's alerts. The SOC Analyst training at GradeSpot covers exactly this chain: threat detection and incident response techniques, log analysis, threat intelligence-driven operations, and incident response processes, SOPs and IRT collaboration.",
        ],
      },
      {
        heading: "Tiers: how the role grows",
        paragraphs: [
          "SOC work is organised in tiers. The published outcome of the SOC Analyst training is job-ready SOC Analyst (Tier 1, Tier 2 and Tier 3) roles — Tier 1 triages alerts, higher tiers investigate deeper and tune the detection tooling. The same syllabus prepares you for adjacent roles published on the course page: Cybersecurity Analyst, Threat Intelligence Analyst, Incident Response Specialist, SIEM Administrator, Vulnerability Assessment Specialist and Network Security Analyst.",
        ],
      },
      {
        heading: "The training shape",
        paragraphs: [
          "The SOC Analyst program at GradeSpot is a 90-day, beginner-friendly training for beginners and career switchers, aligned to EC-Council CSA and Microsoft SC-200, in online and offline modes. If the daily work described here sounds like your kind of job, the fastest way to test that feeling is a free demo class — the booking form is on the SOC Analyst course page.",
        ],
      },
    ],
  },
];
