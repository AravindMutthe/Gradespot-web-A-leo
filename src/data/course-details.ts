// Enrichment fields for the 11 full courses — harvested 2026-10-23 for
// the research expansion pack (DECISIONS.md §18) from the Oct-6 build's
// content engine (AravindMutthe/gradespot-frontend-website,
// src/lib/mock-data.ts @ e54a51c), which was itself populated from the
// live gsitssolutions.com site on 2026-10-06: short name, who the course
// is for, published outcome, topic list, level and certification. These
// are the business's own published fields — nothing here is new copy
// about facts. AZ-900 / AZ-104 / Hardware carry NO duration in any
// source ("Contact us for the schedule"), so duration stays absent and
// pages answer "confirmed on enquiry" instead of inventing one.

export interface CourseDetail {
  short: string;
  who: string;
  outcome: string;
  topics: string[];
  level: string;
  certification: string;
}

export const courseDetails: Record<string, CourseDetail> = {
  "ccna-200-301": {
    short: "CCNA 200-301",
    who: "Students, IT freshers & working professionals — no prior experience required",
    outcome: "Cisco CCNA 200-301 certification and entry-level networking roles",
    topics: [
      "OSI & TCP/IP models, subnetting and IP addressing",
      "Configure and troubleshoot routers, switches, VLANs, IPv4/IPv6",
      "Network security fundamentals: AAA, authentication, encryption",
      "Automation & programmability, SDN basics",
      "Hands-on labs, Cisco Packet Tracer and real-world scenarios",
      "CCNA 200-301 exam prep with mock tests and study guides",
    ],
    level: "Beginner-friendly (no prior experience required)",
    certification: "Cisco CCNA 200-301",
  },
  "ccnp-350-401-encor": {
    short: "CCNP 350-401 ENCOR",
    who: "Network engineers & CCNA holders — ready for enterprise networking",
    outcome: "Cisco CCNP Enterprise certification and senior network roles",
    topics: [
      "Core networking skills for IT infrastructure roles",
      "OSI & TCP/IP models, subnetting and IP addressing",
      "Configure and troubleshoot routers and switches",
      "Design and manage secure enterprise networks",
      "Hands-on labs and real-world networking scenarios",
      "Exam-oriented preparation with practice questions",
    ],
    level: "Intermediate",
    certification: "Cisco CCNP 350-401 ENCOR",
  },
  "comptia-network-plus": {
    short: "CompTIA Network+",
    who: "Beginners & IT support staff — vendor-neutral networking foundation",
    outcome: "CompTIA Network+ certification and network support roles",
    topics: [
      "Network components, topologies and architectures",
      "OSI & TCP/IP models, media and cabling",
      "IP addressing, routing and network services",
      "WANs, wireless networks, cloud and datacenter",
      "Network security, hardening and attack mitigation",
    ],
    level: "Beginner-friendly",
    certification: "CompTIA Network+ (N10-008 / N10-009)",
  },
  "comptia-security-plus": {
    short: "CompTIA Security+",
    who: "Beginners & IT staff moving into cybersecurity",
    outcome: "CompTIA Security+ certification and SOC / security analyst roles",
    topics: [
      "Security fundamentals: CIA triad, AAA, non-repudiation",
      "Threats, vulnerabilities and threat actor analysis",
      "Security control categories and gap analysis",
      "Zero Trust architecture concepts",
      "Hands-on learning with real-world scenarios",
      "Security+ SY0-601 & SY0-701 exam preparation",
    ],
    level: "Beginner-friendly",
    certification: "CompTIA Security+ (SY0-601 / SY0-701)",
  },
  "comptia-pentest-plus": {
    short: "CompTIA PenTest+",
    who: "Security learners with networking basics — hands-on hacking",
    outcome: "CompTIA PenTest+ certification and penetration tester roles",
    topics: [
      "Planning and scoping penetration test engagements",
      "Passive and active reconnaissance",
      "Vulnerability scanning with Nmap & Zenmap",
      "Social engineering, wireless and network attacks",
      "Application, cloud and mobile attacks",
      "Post-exploitation, reporting and remediation",
    ],
    level: "Intermediate",
    certification: "CompTIA PenTest+ (PT0-002)",
  },
  "soc-analyst": {
    short: "SOC Analyst",
    who: "Beginners & career switchers — threat detection & SIEM operations",
    outcome: "Job-ready SOC Analyst (Tier 1/2/3) roles; CSA / SC-200 aligned",
    topics: [
      "Threat detection and incident response techniques",
      "SIEM tools: Splunk Enterprise Security, IBM QRadar, AlienVault",
      "Log analysis across Windows, Linux, Mac and firewalls",
      "Threat intelligence-driven SOC operations",
      "Incident response processes, SOPs and IRT collaboration",
      "Job-ready SOC Analyst (Tier 1/2/3) career preparation",
    ],
    level: "Beginner-friendly",
    certification: "EC-Council CSA / SC-200 aligned",
  },
  "certified-ethical-hacker-ceh": {
    short: "CEH v13",
    who: "Beginners & security enthusiasts — ethical hacking from zero",
    outcome: "EC-Council CEH v13 certification and ethical hacker roles",
    topics: [
      "Ethical hacking concepts, framework and methodology",
      "Footprinting, reconnaissance and scanning networks",
      "System hacking and malware analysis",
      "Vulnerability analysis and cryptography",
      "AI-driven ethical hacking tools and techniques",
      "CEH v13 exam preparation with live labs",
    ],
    level: "Beginner-friendly",
    certification: "EC-Council CEH v13",
  },
  "azure-fundamentals-az-900": {
    short: "Azure AZ-900",
    who: "Beginners starting their cloud journey",
    outcome: "Microsoft AZ-900 certification and cloud support roles",
    topics: [
      "Core cloud computing concepts and Azure positioning",
      "Azure compute, storage, networking and databases",
      "Deploy and manage virtual machines",
      "Azure identity: Azure AD and role-based access control",
      "Monitor and optimize resources for performance and cost",
      "AZ-900 exam preparation",
    ],
    level: "Beginner",
    certification: "Microsoft AZ-900",
  },
  "azure-administrator-az-104": {
    short: "Azure AZ-104",
    who: "IT admins & AZ-900 holders — Azure administration",
    outcome: "Microsoft AZ-104 certification and Azure administrator roles",
    topics: [
      "Manage Azure AD objects: users, groups and RBAC",
      "Subscriptions and governance: Azure Policy, resource locks",
      "Administer virtual machines, networking and storage",
      "Identity and access management",
      "Monitoring, security and performance optimization",
      "AZ-104 exam preparation",
    ],
    level: "Intermediate",
    certification: "Microsoft AZ-104",
  },
  "digital-marketing": {
    short: "Digital Marketing",
    who: "Students, entrepreneurs & career switchers — 45-day job-oriented program",
    outcome: "Digital marketing executive roles and freelance opportunities",
    topics: [
      "Search engine optimization (SEO)",
      "Search engine marketing (SEM)",
      "Social media marketing (SMM)",
      "Content marketing and email marketing",
      "Marketing analytics and campaign optimization",
      "Hands-on projects with real campaigns",
    ],
    level: "Beginner",
    certification: "Course completion certificate",
  },
  "computer-hardware-and-networking": {
    short: "Hardware & Networking",
    who: "Beginners — computer hardware and networking fundamentals",
    outcome: "Hardware & network support roles with practical lab skills",
    topics: [
      "Computer hardware fundamentals",
      "Networking essentials",
      "Hands-on practical labs",
      "Live classes with recorded videos",
      "Course completion certification",
      "Expert instruction",
    ],
    level: "Beginner",
    certification: "Course completion certificate",
  },
};
