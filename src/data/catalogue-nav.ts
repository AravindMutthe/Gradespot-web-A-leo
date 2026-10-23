// Lightweight navigation catalogue — titles, categories, images,
// published durations and course codes copied from the real
// catalogue data (src/data/courses.ts + course-details.ts).
// This file exists so the client Header can render the rich mega
// menu without bundling the full course-section content.

export interface NavCourse {
  slug: string;
  title: string;
  label: string;
  category: string;
  image: string | null;
  code?: string;
  duration?: string;
}

export const navCourses: NavCourse[] = [
  { slug: "azure-fundamentals-az-900", title: "Microsoft Certified: Azure Fundamentals | AZ-900", label: "Azure AZ-900", category: "Microsoft Azure", image: "/images/courses/az-900.jpg", code: "AZ-900" },
  { slug: "azure-administrator-az-104", title: "Microsoft Certified: Azure Administrator Associate | AZ-104", label: "Azure AZ-104", category: "Microsoft Azure", image: "/images/courses/az-104.jpg", code: "AZ-104" },
  { slug: "ccna-200-301", title: "Cisco Certified Network Associate: CCNA 200-301", label: "CCNA 200-301", category: "Cisco", image: "/images/courses/ccna.jpg", code: "200-301", duration: "45 days" },
  { slug: "ccnp-350-401-encor", title: "CCNP Enterprise 350-401 ENCOR", label: "CCNP 350-401 ENCOR", category: "Cisco", image: "/images/courses/ccnp.jpg", code: "350-401 ENCOR", duration: "45 days" },
  { slug: "comptia-network-plus", title: "CompTIA Network+: N10-008", label: "CompTIA Network+", category: "CompTIA", image: "/images/courses/network-plus.jpg", code: "N10-008", duration: "30 days" },
  { slug: "comptia-pentest-plus", title: "CompTIA PenTest+: PT0-002", label: "CompTIA PenTest+", category: "CompTIA", image: "/images/courses/pentest-plus.jpg", code: "PT0-002", duration: "60 hours" },
  { slug: "comptia-security-plus", title: "CompTIA Security+: Sy0-701", label: "CompTIA Security+", category: "CompTIA", image: "/images/courses/security-plus.jpg", code: "Sy0-701", duration: "30 days" },
  { slug: "computer-hardware-and-networking", title: "Computer Hardware and Networking Training", label: "Hardware & Networking", category: "Networking", image: "/images/courses/hardware-networking.jpg" },
  { slug: "digital-marketing", title: "Complete Digital Marketing", label: "Digital Marketing", category: "Digital Marketing", image: "/images/courses/digital-marketing.jpg", duration: "45 days" },
  { slug: "soc-analyst", title: "SOC Analyst Training in Hyderabad | Job-Ready in 90 Days", label: "SOC Analyst", category: "Cybersecurity", image: "/images/courses/soc-analyst.jpg", duration: "90 days" },
  { slug: "certified-ethical-hacker-ceh", title: "Certified Ethical Hacker [CEH v13]", label: "CEH v13", category: "Cybersecurity", image: "/images/courses/ceh.jpg", code: "CEH v13", duration: "45 days" },
  { slug: "azure-security-engineer-az-500", title: "Microsoft Certified: Azure Security Engineer Associate | AZ-500", label: "Azure Security Engineer", category: "Microsoft Azure", image: "/images/courses/azure-security-engineer-az-500.jpg", code: "AZ-500" },
  { slug: "microsoft-devops-az-400", title: "Designing and Implementing Microsoft DevOps Solutions | AZ-400", label: "Azure DevOps Solutions", category: "Microsoft Azure", image: "/images/courses/microsoft-devops-az-400.jpg", code: "AZ-400" },
  { slug: "sc-900", title: "Security, Compliance, and Identity Fundamentals | SC-900", label: "Security, Compliance & Identity Fundamentals", category: "Microsoft Azure", image: "/images/courses/sc-900.jpg", code: "SC-900" },
  { slug: "sc-200", title: "Microsoft Certified: Security Operations Analyst Associate | SC-200", label: "Security Operations Analyst", category: "Microsoft Azure", image: "/images/courses/sc-200.jpg", code: "SC-200" },
  { slug: "microsoft-sentinel", title: "Microsoft Sentinel Training", label: "Microsoft Sentinel", category: "Microsoft Azure", image: "/images/courses/microsoft-sentinel.jpg" },
  { slug: "aws-cloud-practitioner", title: "AWS Certified Cloud Practitioner | AWS CLF-C02", label: "AWS Cloud Practitioner", category: "AWS", image: "/images/courses/aws-cloud-practitioner.jpg", code: "CLF-C02" },
  { slug: "aws-solutions-architect-associate", title: "AWS Certified Solutions Architect \u2013 Associate | AWS SAA-C03", label: "AWS Solutions Architect – Associate", category: "AWS", image: "/images/courses/aws-solutions-architect-associate.jpg", code: "SAA-C03" },
  { slug: "aws-devops-engineer", title: "AWS Certified DevOps Engineer - Professional | AWS DOP-C02", label: "AWS DevOps Engineer – Professional", category: "AWS", image: "/images/courses/aws-devops-engineer.jpg", code: "DOP-C02" },
  { slug: "comptia-a-plus-core-1", title: "CompTIA A+ Core 1: 220-1101", label: "CompTIA A+ Core 1: 220-1101", category: "CompTIA", image: "/images/courses/comptia-a-plus-core-1.jpg", code: "220-1101" },
  { slug: "comptia-a-plus-core-2", title: "CompTIA A+ Core 2: 220-1102", label: "CompTIA A+ Core 2: 220-1102", category: "CompTIA", image: "/images/courses/comptia-a-plus-core-2.jpg", code: "220-1102" },
  { slug: "cybersecurity-technologies", title: "Program in Cybersecurity Technologies", label: "Cybersecurity Technologies", category: "Cybersecurity", image: "/images/courses/cybersecurity-technologies.jpg" },
  { slug: "vapt", title: "Vulnerability Assessment & Penetration Testing [VA PT]", label: "Vulnerability Assessment & Penetration Testing", category: "Cybersecurity", image: "/images/courses/vapt.jpg" },
  { slug: "core-java", title: "Core Java", label: "Core Java", category: "Programming & Data", image: "/images/courses/core-java.jpg" },
  { slug: "java-full-stack", title: "Java Full Stack", label: "Java Full Stack", category: "Programming & Data", image: "/images/courses/java-full-stack.jpg" },
  { slug: "power-bi", title: "Power BI", label: "Power BI", category: "Programming & Data", image: "/images/courses/power-bi.jpg" },
  { slug: "mysql", title: "MySQL", label: "MySQL", category: "Programming & Data", image: "/images/courses/mysql.jpg" },
  { slug: "data-analytics", title: "Data Analytics", label: "Data Analytics", category: "Programming & Data", image: "/images/courses/data-analytics.jpg" },
  { slug: "data-science", title: "Data Science", label: "Data Science", category: "Programming & Data", image: "/images/courses/data-science.jpg" },
  { slug: "certified-professional-coder-cpc", title: "Certified Professional Coder - CPC", label: "Certified Professional Coder", category: "Medical Coding", image: "/images/courses/certified-professional-coder-cpc.jpg", code: "CPC" },
  { slug: "hcc-medical-coding", title: "Hierarchical condition category - HCC", label: "HCC Medical Coding", category: "Medical Coding", image: "/images/courses/hcc-medical-coding.jpg", code: "HCC" },
  { slug: "ip-drg-medical-coding", title: "Inpatient Diagnosis-Related Group - IP-DRG", label: "IP-DRG Medical Coding", category: "Medical Coding", image: "/images/courses/ip-drg-medical-coding.jpg", code: "IP-DRG" },
  { slug: "em-medical-coding", title: "E&M (Evaluation and Management)", label: "E&M Medical Coding", category: "Medical Coding", image: "/images/courses/em-medical-coding.jpg", code: "E&M" },
  { slug: "radiology-medical-coding", title: "Radiology - Medical Coding", label: "Radiology Medical Coding", category: "Medical Coding", image: "/images/courses/radiology-medical-coding.jpg" },
  { slug: "anesthesia-medical-coding", title: "Anesthesia - Medical Coding", label: "Anesthesia Medical Coding", category: "Medical Coding", image: "/images/courses/anesthesia-medical-coding.jpg" },
  { slug: "autocad", title: "AutoCAD", label: "AutoCAD", category: "Design & CAD", image: "/images/courses/autocad.jpg" },
];

export const navCategoryOrder = [
  "Cybersecurity",
  "Cisco",
  "Microsoft Azure",
  "CompTIA",
  "AWS",
  "Networking",
  "Programming & Data",
  "Medical Coding",
  "Digital Marketing",
  "Design & CAD",
];

export function categoryAnchor(category: string) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}
