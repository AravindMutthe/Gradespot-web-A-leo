// Course comparison pairs (research expansion pack, DECISIONS.md §18 —
// ppc report §2.2: comparison queries trigger AI answers 95.4% of the
// time, so "X vs Y" pages are AEO assets). Every row of every table is
// rendered from the two courses' real published data (topics, outcomes,
// durations, fees where published, job roles) — the only authored text
// is the focus summary and the "which is for you" guidance, both drawn
// strictly from those published fields.

export interface Comparison {
  slug: string;
  a: string; // course slug
  b: string; // course slug
  title: string;
  focusA: string;
  focusB: string;
  chooseA: string;
  chooseB: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "ceh-vs-security-plus",
    a: "certified-ethical-hacker-ceh",
    b: "comptia-security-plus",
    title: "CEH vs Security+: Which Cybersecurity Certification First?",
    focusA:
      "Offensive security — ethical hacking methodology: footprinting, scanning, system hacking, malware analysis and vulnerability analysis, with live labs.",
    focusB:
      "Defensive foundations — security concepts, threats and vulnerabilities, control categories, gap analysis and Zero Trust architecture concepts.",
    chooseA:
      "Choose CEH v13 if you want to think like an attacker: hands-on hacking labs, penetration-testing direction and the EC-Council CEH v13 certification.",
    chooseB:
      "Choose Security+ if you want the broad security foundation first: it is the published route into SOC and security analyst roles and prepares you for deeper specialisation later.",
  },
  {
    slug: "ccna-vs-network-plus",
    a: "ccna-200-301",
    b: "comptia-network-plus",
    title: "CCNA vs Network+: Cisco Depth or Vendor-Neutral Breadth?",
    focusA:
      "Cisco networking — configuring and troubleshooting routers, switches, VLANs and IPv4/IPv6, with Cisco Packet Tracer labs and CCNA 200-301 exam prep.",
    focusB:
      "Vendor-neutral networking — components, topologies, cabling, IP addressing, routing, WANs, wireless, cloud and datacenter concepts across vendors.",
    chooseA:
      "Choose CCNA if you want Cisco-specific, job-focused networking depth — it is the certification named in the published outcome for entry-level networking roles, with published fee plans.",
    chooseB:
      "Choose Network+ if you want a vendor-neutral foundation first — the published audience is beginners and IT support staff building a networking base that transfers across vendors.",
  },
  {
    slug: "ceh-vs-comptia-pentest-plus",
    a: "certified-ethical-hacker-ceh",
    b: "comptia-pentest-plus",
    title: "CEH vs PenTest+: Ethical Hacking or Penetration Testing?",
    focusA:
      "Offensive security — ethical hacking methodology: footprinting, scanning, system hacking, malware analysis and vulnerability analysis, with live labs.",
    focusB:
      "Hands-on penetration testing — planning and scoping engagements, passive and active reconnaissance, vulnerability scanning with Nmap & Zenmap, social engineering, wireless and network attacks, and post-exploitation, reporting and remediation.",
    chooseA:
      "Choose CEH v13 if you want to think like an attacker: hands-on hacking labs, penetration-testing direction and the EC-Council CEH v13 certification.",
    chooseB:
      "Choose PenTest+ if you want penetration testing as the craft itself: planning and scoping engagements, reconnaissance and vulnerability scanning, toward the CompTIA PenTest+ certification and penetration tester roles.",
  },
  {
    slug: "soc-analyst-vs-ceh",
    a: "soc-analyst",
    b: "certified-ethical-hacker-ceh",
    title: "SOC Analyst vs CEH: Defence or Offence?",
    focusA:
      "Defence — threat detection, SIEM operations (Splunk Enterprise Security, IBM QRadar, AlienVault), log analysis and incident response processes.",
    focusB:
      "Offence — ethical hacking methodology: footprinting, scanning, system hacking, malware analysis and vulnerability analysis, with live labs.",
    chooseA:
      "Choose SOC Analyst if you want to defend: monitoring, detection and incident response, prepared for Tier 1/2/3 SOC roles over a 90-day job-oriented program.",
    chooseB:
      "Choose CEH v13 if you want to attack (legally): hands-on hacking labs and the EC-Council CEH v13 certification toward ethical hacker and penetration tester roles.",
  },
];
