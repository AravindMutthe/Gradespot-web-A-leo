// Frontend 3.0 — DEMO-FILL sample data (owner-authorised, preview only).
//
// READ FIRST: every record here is SAMPLE content written for the demo
// preview, NOT GradeSpot's confirmed content. Each record carries
// `sample: true`, and every surface that renders one must show the
// Sample tag + the sample font color + the site demo legend (see
// src/components/SampleTag.tsx and src/components/DemoLegend.tsx).
// Sample content closes NO content decision: R1 (CCNA), R2 (CCNP),
// R4 (Digital Marketing), R9 (service scopes) and every other
// R-row stay open until REAL company data replaces the samples and
// is approved. Before ANY production deploy, a zero-sample-marker
// purge is required (see the demo-fill checkpoint) — samples must
// never reach production as if real.
//
// What samples never contain (binding exclusions, even for demo):
// no invented personal names, photos or reviews; no real-organisation,
// vendor or employer logos; no partnership claims (EC-Council /
// Pearson partnership is IN PROGRESS ONLY — never presented as a
// partnership here); no batch dates, seat counts, trainer names,
// placement percentages, job guarantees, clients or case studies;
// no certificate numbers, issue dates, scopes or standards numbers
// (AICTE / ISO display is owner-authorised separately — see the
// about-us page — and is NOT sample data, so it carries no tag).
// Durations are plausible shapes only (days / hours) and, for the
// three held full courses, deliberately differ from the contested
// repo/DB figures so a sample value can never be mistaken for a
// decision on R1/R2/R4. Fee ranges are ranges only, never an exact
// official price.

export interface SampleCourse {
  slug: string;
  summary: string;
  areas: string[];
  duration: string;
  mode: string;
  level: string;
  certification: string;
  who: string;
  // LP rebuild: preparation-language role titles for the landing
  // page's roles panel. Fresh generic wording, never copied from
  // repo sections (CCNA/CCNP/DM sections are contested or
  // truncated) and never a placement promise. Only the three held
  // full courses carry sample roles; verified courses use their
  // filtered-section roles instead.
  roles?: string[];
  sample: true;
}

export interface SampleService {
  slug: string;
  summary: string;
  offerings: string[];
  sample: true;
}

export interface SampleFeeRange {
  label: string;
  range: string;
  sample: true;
}

export const SAMPLE_COURSES: SampleCourse[] = [
  {
    slug: "azure-security-engineer-az-500",
    summary:
      "Learn to secure Microsoft Azure environments end to end, from identity and platform protection to security operations and data security. This course builds practical skills in managing security controls across Azure subscriptions, networks and workloads, with hands-on practice on the tools security engineers use every day.",
    areas: [
      "Identity and access protection in Azure",
      "Platform and network security controls",
      "Security operations and monitoring",
      "Data and application security",
      "Governance, policy and compliance basics",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Preparation for Microsoft AZ-500",
    who: "IT professionals and AZ-900 holders moving into cloud security",
    sample: true,
  },
  {
    slug: "microsoft-devops-az-400",
    summary:
      "Build DevOps practices on Microsoft Azure, from source control and continuous integration to continuous delivery, infrastructure as code and monitoring. Learners work through realistic pipelines and release workflows used by modern engineering teams.",
    areas: [
      "Source control and branching strategies",
      "Continuous integration pipelines",
      "Continuous delivery and release management",
      "Infrastructure as code",
      "Monitoring, feedback and security in pipelines",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Advanced",
    certification: "Preparation for Microsoft AZ-400",
    who: "Developers, administrators and engineers adopting DevOps practices",
    sample: true,
  },
  {
    slug: "sc-900",
    summary:
      "Get a clear foundation in security, compliance and identity concepts, and how Microsoft's security and compliance solutions address them. A practical starting point for learners entering cybersecurity, compliance or identity roles.",
    areas: [
      "Security, compliance and identity concepts",
      "Microsoft Entra identity solutions",
      "Microsoft security solutions",
      "Microsoft compliance solutions",
      "Shared responsibility and Zero Trust basics",
    ],
    duration: "30 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Preparation for Microsoft SC-900",
    who: "Beginners and career switchers exploring security and compliance",
    sample: true,
  },
  {
    slug: "sc-200",
    summary:
      "Learn security operations analysis with Microsoft's threat protection tools: detecting threats, investigating incidents and responding with structured workflows. The course centres on SIEM and extended detection practices used in security operations centres.",
    areas: [
      "Threat detection with Microsoft Sentinel",
      "Security incident investigation workflows",
      "Threat hunting fundamentals",
      "Incident response and reporting",
      "Security operations centre practices",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Preparation for Microsoft SC-200",
    who: "IT and security learners moving into SOC analyst roles",
    sample: true,
  },
  {
    slug: "microsoft-sentinel",
    summary:
      "Learn Microsoft Sentinel as a cloud-native SIEM: connecting data sources, writing detection rules, automating responses and hunting threats across an environment. Practical labs follow the day-to-day work of a security operations analyst.",
    areas: [
      "Sentinel workspaces and data connectors",
      "Analytics rules and detection",
      "Automation with playbooks",
      "Threat hunting with KQL basics",
      "Incident management in Sentinel",
    ],
    duration: "30 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Security learners and SOC analysts working with Microsoft tools",
    sample: true,
  },
  {
    slug: "aws-cloud-practitioner",
    summary:
      "Understand Amazon Web Services at a foundational level: core services, cloud concepts, billing and support, and the shared responsibility model. A solid first step for anyone starting a cloud career on AWS.",
    areas: [
      "Cloud concepts and AWS value proposition",
      "Core AWS compute, storage and database services",
      "AWS global infrastructure basics",
      "Billing, pricing and support plans",
      "Shared responsibility and security basics",
    ],
    duration: "30 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Preparation for AWS CLF-C02",
    who: "Beginners starting a cloud career on AWS",
    sample: true,
  },
  {
    slug: "aws-solutions-architect-associate",
    summary:
      "Learn to design resilient, secure and cost-effective architectures on AWS. The course covers designing for availability, performance and security, with worked examples across compute, storage, networking and databases.",
    areas: [
      "Designing resilient architectures",
      "High-performing and scalable solutions",
      "Secure applications and architectures",
      "Cost-optimised designs",
      "Migration and decoupling concepts",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Preparation for AWS SAA-C03",
    who: "Cloud learners and developers designing on AWS",
    sample: true,
  },
  {
    slug: "aws-devops-engineer",
    summary:
      "Build DevOps practices on AWS at a professional level: automating infrastructure, running CI/CD pipelines, monitoring systems and applying security controls across the delivery lifecycle. Learners practise automation, monitoring and security controls through realistic pipeline work.",
    areas: [
      "CI/CD pipelines on AWS",
      "Infrastructure automation",
      "Monitoring, logging and incident response",
      "Security controls in delivery pipelines",
      "High-availability and disaster recovery concepts",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Advanced",
    certification: "Preparation for AWS DOP-C02",
    who: "DevOps engineers and developers working on AWS",
    sample: true,
  },
  {
    slug: "comptia-a-plus-core-1",
    summary:
      "Build the hardware and networking foundation of IT support: installing and configuring devices, understanding mobile and networking fundamentals, and troubleshooting common problems with a structured approach. Practice follows the faults support technicians meet every day.",
    areas: [
      "Mobile devices and hardware installation",
      "Networking fundamentals and cabling",
      "Hardware troubleshooting",
      "Virtualisation and cloud basics",
      "Operational procedures for technicians",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Preparation for CompTIA A+ 220-1101",
    who: "Beginners entering IT support roles",
    sample: true,
  },
  {
    slug: "comptia-a-plus-core-2",
    summary:
      "Continue the IT support foundation with operating systems, security and software troubleshooting: configuring Windows and other operating systems, applying security best practices and resolving software issues methodically. Learners practise the step-by-step diagnosis support roles use on the job.",
    areas: [
      "Operating system configuration",
      "Security concepts for support roles",
      "Software troubleshooting",
      "Operational procedures and safety",
      "Scripting and remote support basics",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Preparation for CompTIA A+ 220-1102",
    who: "Beginners entering IT support roles",
    sample: true,
  },
  {
    slug: "cybersecurity-technologies",
    summary:
      "A broad program in cybersecurity technologies covering defensive fundamentals, system and network security, and the tools and practices security teams use to protect organisations. Suitable for learners who want the full landscape before specialising.",
    areas: [
      "Cybersecurity foundations and threat landscape",
      "Network and system security fundamentals",
      "Identity, access and data protection",
      "Security monitoring and incident basics",
      "Governance, risk and compliance awareness",
    ],
    duration: "90 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Beginners and career switchers entering cybersecurity",
    sample: true,
  },
  {
    slug: "vapt",
    summary:
      "Learn vulnerability assessment and penetration testing from scoping to reporting: discovering weaknesses, validating them safely, and writing findings that teams can act on. Labs follow a structured testing methodology throughout.",
    areas: [
      "Scoping and rules of engagement",
      "Vulnerability scanning and analysis",
      "Manual testing techniques",
      "Exploitation concepts in a lab environment",
      "Reporting and remediation guidance",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Security learners with networking basics",
    sample: true,
  },
  {
    slug: "core-java",
    summary:
      "Learn Java from the ground up: core language fundamentals, object-oriented programming, collections and exception handling, with regular coding practice. A foundation for application development and for full-stack learning afterwards.",
    areas: [
      "Java syntax and core language features",
      "Object-oriented programming",
      "Collections and generics",
      "Exception handling and file handling",
      "Coding practice and small projects",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Beginners starting software development",
    sample: true,
  },
  {
    slug: "java-full-stack",
    summary:
      "Become a full-stack Java developer: backend services, databases, frontend development and deployment, assembled into working applications. The course follows one stack end to end, with project work at every stage.",
    areas: [
      "Java backend development",
      "Databases and data access",
      "Frontend development basics",
      "APIs and integration",
      "Deployment and project work",
    ],
    duration: "90 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Learners with Java basics moving to full-stack development",
    sample: true,
  },
  {
    slug: "power-bi",
    summary:
      "Learn Microsoft Power BI for business reporting: connecting and shaping data, building data models, writing measures, and designing dashboards that decision makers can actually read. Learners finish with a portfolio-style dashboard project.",
    areas: [
      "Connecting and shaping data",
      "Data modelling basics",
      "Measures and calculations",
      "Visual design and dashboards",
      "Publishing and sharing reports",
    ],
    duration: "30 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Analysts, students and professionals working with business data",
    sample: true,
  },
  {
    slug: "mysql",
    summary:
      "Learn MySQL for real database work: designing tables, writing queries, joining data, and keeping databases fast and reliable. Practice follows the queries analysts and developers write every day.",
    areas: [
      "Database design basics",
      "Queries, filtering and sorting",
      "Joins and aggregations",
      "Indexes and query performance basics",
      "Backup and administration basics",
    ],
    duration: "30 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Beginners and developers working with data",
    sample: true,
  },
  {
    slug: "data-analytics",
    summary:
      "Learn data analytics end to end: cleaning and exploring data, asking answerable questions, and presenting findings clearly with charts and dashboards. Tools and techniques stay close to what analyst roles actually require.",
    areas: [
      "Data cleaning and preparation",
      "Exploratory analysis",
      "Spreadsheets and SQL for analysis",
      "Visualisation and dashboards",
      "Presenting findings and storytelling",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Students and professionals moving into analytics roles",
    sample: true,
  },
  {
    slug: "data-science",
    summary:
      "Learn data science foundations: Python programming, statistics, data handling and an introduction to machine learning, applied through guided projects. The course emphasises understanding methods, not just running them.",
    areas: [
      "Python for data work",
      "Statistics foundations",
      "Data cleaning and exploration",
      "Machine learning introduction",
      "Guided projects and presentation",
    ],
    duration: "90 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Learners with basic programming moving into data science",
    sample: true,
  },
  {
    slug: "certified-professional-coder-cpc",
    summary:
      "Prepare for the Certified Professional Coder credential: CPT, ICD-10-CM and HCPCS coding systems, official guidelines, and exam-style practice. The course builds accuracy through coded case work across common specialties.",
    areas: [
      "CPT coding system and guidelines",
      "ICD-10-CM diagnosis coding",
      "HCPCS Level II coding",
      "Modifiers and bundling concepts",
      "Exam-style practice cases",
    ],
    duration: "90 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Preparation for CPC",
    who: "Learners entering medical coding careers",
    sample: true,
  },
  {
    slug: "hcc-medical-coding",
    summary:
      "Learn Hierarchical Condition Category coding for risk adjustment: how chronic conditions are documented, coded and validated, and why accurate HCC capture matters for patient records and reimbursement models. Practice cases build accuracy across common chronic conditions.",
    areas: [
      "Risk adjustment concepts",
      "Chronic condition documentation",
      "HCC code assignment",
      "Documentation and validation basics",
      "Practice cases",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Medical coders specialising in risk adjustment",
    sample: true,
  },
  {
    slug: "ip-drg-medical-coding",
    summary:
      "Learn inpatient diagnosis-related group coding: reading inpatient records, assigning diagnosis and procedure codes, and understanding how MS-DRG assignment follows from them. Practice cases follow the inpatient coding workflow end to end.",
    areas: [
      "Inpatient record review",
      "Diagnosis and procedure coding",
      "MS-DRG assignment concepts",
      "Coding guidelines for inpatients",
      "Practice cases",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Medical coders specialising in inpatient coding",
    sample: true,
  },
  {
    slug: "em-medical-coding",
    summary:
      "Learn Evaluation and Management coding: how visit levels are determined, what documentation supports them, and how time-based and complexity-based coding differ in practice. Practice cases cover common visit types and documentation patterns.",
    areas: [
      "E&M level determination",
      "Documentation requirements",
      "Time-based coding concepts",
      "Medical decision making basics",
      "Practice cases",
    ],
    duration: "30 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Medical coders learning E&M coding",
    sample: true,
  },
  {
    slug: "radiology-medical-coding",
    summary:
      "Learn radiology coding across diagnostic and interventional procedures: how imaging studies are coded, when modifiers apply, and how documentation supports the codes chosen. Practice cases cover common imaging studies and modifier decisions.",
    areas: [
      "Diagnostic imaging coding",
      "Interventional radiology basics",
      "Modifiers in radiology",
      "Documentation requirements",
      "Practice cases",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Medical coders specialising in radiology",
    sample: true,
  },
  {
    slug: "anesthesia-medical-coding",
    summary:
      "Learn anesthesia coding: base units, time units and modifiers, and how anesthesia records translate into codes. The course follows the coding workflow from case documentation to final code assignment.",
    areas: [
      "Anesthesia coding fundamentals",
      "Base units and time units",
      "Modifiers in anesthesia",
      "Documentation requirements",
      "Practice cases",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Intermediate",
    certification: "Course completion certificate",
    who: "Medical coders specialising in anesthesia",
    sample: true,
  },
  {
    slug: "autocad",
    summary:
      "Learn AutoCAD for professional 2D drafting: drawing and editing geometry, working with layers and dimensions, and producing clean, printable layouts. Practice follows the drawings used in engineering and design offices.",
    areas: [
      "Drawing and editing tools",
      "Layers, blocks and annotations",
      "Dimensions and text",
      "Layouts and plotting",
      "Practice drawings",
    ],
    duration: "45 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Students and professionals learning technical drafting",
    sample: true,
  },
  {
    slug: "ccna-200-301",
    summary:
      "Learn enterprise networking foundations with Cisco technologies: how networks are built, addressed, routed and secured, with hands-on practice on switches, routers and wireless essentials. This sample summary stands in for the full CCNA description until the confirmed course text is supplied.",
    areas: [
      "Networking fundamentals and IP addressing",
      "Switching, VLANs and inter-VLAN routing",
      "Routing concepts and dynamic routing basics",
      "Wireless networking essentials",
      "Network security fundamentals",
      "Network automation and programmability basics",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Preparation for Cisco CCNA 200-301",
    who: "Students, IT freshers and working professionals",
    roles: ["Network support roles", "IT support roles", "Network technician roles"],
    sample: true,
  },
  {
    slug: "ccnp-350-401-encor",
    summary:
      "Learn enterprise network design and operations at a professional level: architecture, advanced routing, software-defined networking and assurance across campus and branch networks. This sample summary is written fresh for enterprise networking and stands in for the confirmed ENCOR text until it is supplied.",
    areas: [
      "Enterprise network architecture and design",
      "Advanced routing concepts for enterprise networks",
      "SD-WAN and software-defined networking concepts",
      "Wireless and campus network design",
      "Network security and access control in enterprise networks",
      "Network assurance and monitoring",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Advanced",
    certification: "Preparation for Cisco CCNP 350-401 ENCOR",
    who: "Network engineers and CCNA holders moving to enterprise networking",
    roles: [
      "Enterprise network engineer roles",
      "Network design roles",
      "Senior network support roles",
    ],
    sample: true,
  },
  {
    slug: "digital-marketing",
    summary:
      "Learn digital marketing across search, social, content and analytics: how campaigns are planned, run and measured, with hands-on practice on live-style campaign exercises. This sample summary stands in for the complete digital marketing description until the confirmed text is supplied.",
    areas: [
      "Search engine optimisation (SEO)",
      "Search engine marketing (SEM)",
      "Social media marketing (SMM)",
      "Content and email marketing",
      "Marketing analytics and campaign measurement",
      "Campaign planning and practice exercises",
    ],
    duration: "60 days",
    mode: "Classroom & online",
    level: "Beginner",
    certification: "Course completion certificate",
    who: "Students, entrepreneurs and career switchers",
    roles: [
      "Digital marketing executive roles",
      "Social media marketing roles",
      "SEO executive roles",
    ],
    sample: true,
  },
];

export const SAMPLE_SERVICES: SampleService[] = [
  {
    slug: "corporate-trainings",
    summary:
      "Custom IT training programs designed around a team's skills and schedule, delivered for corporates and working professionals.",
    offerings: [
      "Custom training plans scheduled around team requirements",
      "On-site and online delivery",
      "Skill assessment before training begins",
      "Certification-aligned learning paths",
      "Progress reporting for team leads",
    ],
    sample: true,
  },
  {
    slug: "internships",
    summary:
      "Structured internship tracks that give learners supervised, hands-on experience on real-style project work.",
    offerings: [
      "Structured internship tracks",
      "Mentor guidance through the program",
      "Hands-on project work",
      "Completion certificate",
    ],
    sample: true,
  },
  {
    slug: "industrial-trainings",
    summary:
      "Practical training programs aligned to industry needs, built around lab work rather than theory alone.",
    offerings: [
      "Industry-aligned practical modules",
      "Lab-based practice sessions",
      "Project work",
      "Assessment and feedback",
    ],
    sample: true,
  },
  {
    slug: "college-workshops",
    summary:
      "Technical workshops conducted for college students, planned with faculty around the topics students need most.",
    offerings: [
      "One-day and multi-day workshop formats",
      "Hands-on sessions",
      "Topics planned with faculty",
      "Participation certificates",
    ],
    sample: true,
  },
  {
    slug: "cybersecurity-services",
    summary:
      "Cybersecurity services for organisations that need to understand their exposure and strengthen their defences.",
    offerings: [
      "Vulnerability assessment",
      "Penetration testing support",
      "Security awareness sessions",
      "Security policy review",
      "Incident response guidance",
    ],
    sample: true,
  },
  {
    slug: "web-development",
    summary:
      "Websites built for businesses that need a clear, fast and maintainable online presence.",
    offerings: [
      "Business websites",
      "Landing pages",
      "Content-managed websites",
      "Website maintenance",
      "Basic search-engine setup",
    ],
    sample: true,
  },
  {
    slug: "digital-marketing-solutions",
    summary:
      "Digital marketing services that help businesses reach customers online and understand what their marketing returns.",
    offerings: [
      "Search engine optimisation",
      "Social media management",
      "Paid campaign setup",
      "Content planning",
      "Monthly reporting",
    ],
    sample: true,
  },
  {
    slug: "network-infrastructure-building",
    summary:
      "Network infrastructure built for offices and campuses, from cabling to configured, documented networks.",
    offerings: [
      "Structured cabling",
      "Local and wide area network setup",
      "Wi-Fi planning and setup",
      "Network rack setup",
      "Network documentation",
    ],
    sample: true,
  },
  {
    slug: "logo-designing",
    summary:
      "Logo design for businesses that need a mark they can use consistently across print and digital channels.",
    offerings: [
      "Logo concepts",
      "Revision rounds",
      "Brand colour guidance",
      "Print and web file formats",
    ],
    sample: true,
  },
  {
    slug: "us-it-staffing",
    summary:
      "IT staffing support for US requirements, covering screening and coordination through to onboarding.",
    offerings: [
      "Candidate screening",
      "Skill matching",
      "Interview coordination",
      "Onboarding support",
    ],
    sample: true,
  },
  {
    slug: "domestic-consultancy",
    summary:
      "Consultancy for learners and professionals planning their next step within India.",
    offerings: [
      "Career guidance",
      "Course selection advice",
      "Interview preparation",
      "Resume review",
    ],
    sample: true,
  },
  {
    slug: "abroad-consultancy",
    summary:
      "Consultancy for learners planning study or work pathways overseas, with guidance through each step of the process.",
    offerings: [
      "Study and work pathway guidance",
      "Documentation checklist support",
      "Application process guidance",
      "Interview preparation",
    ],
    sample: true,
  },
];

export const SAMPLE_COURSE_FEE_RANGES: SampleFeeRange[] = [
  { label: "Microsoft Azure courses", range: "₹8,000 – ₹25,000", sample: true },
  { label: "Cisco courses", range: "₹10,000 – ₹30,000", sample: true },
  { label: "CompTIA courses", range: "₹8,000 – ₹20,000", sample: true },
  { label: "Networking courses", range: "₹6,000 – ₹15,000", sample: true },
  { label: "Digital Marketing courses", range: "₹10,000 – ₹25,000", sample: true },
  { label: "Cybersecurity courses", range: "₹12,000 – ₹35,000", sample: true },
  { label: "AWS courses", range: "₹8,000 – ₹25,000", sample: true },
  { label: "Programming & Data courses", range: "₹8,000 – ₹30,000", sample: true },
  { label: "Medical Coding courses", range: "₹15,000 – ₹40,000", sample: true },
  { label: "Design & CAD courses", range: "₹8,000 – ₹20,000", sample: true },
];

export const SAMPLE_INSTITUTE_TIER_RANGES: SampleFeeRange[] = [
  { label: "Missed Enquiry Killer", range: "₹4,000 – ₹8,000 / month", sample: true },
  { label: "Admissions on Autopilot", range: "₹8,000 – ₹15,000 / month", sample: true },
  { label: "Institute OS", range: "₹15,000 – ₹30,000 / month", sample: true },
];
