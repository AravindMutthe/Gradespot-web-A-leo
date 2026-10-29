// Demo content — PREVIEW BRANCH ONLY (feat/demo-content-gaps).
//
// Every record in this file is placeholder demo copy, written from
// general domain knowledge for an IT training + IT services business.
// It is NOT official GradeSpot content: no summary, section, scope,
// duration, or tier description here has been confirmed by the
// business, and none of it may be presented as real. Official inputs
// replace demo content page by page; each replacement removes that
// page's demo marker. This branch must NEVER merge as-is.
//
// Language rules enforced by tests/demo-content.test.ts:
// - "Prepares for [exam]" wording for certification courses.
// - NO job, placement, pay, exam-outcome, rating, review, or success
//   claims of any kind, even as demo.
// - NO trainer names. NO invented GradeSpot-specific facts (no
//   batches, schedules, fees, student counts, partner names, or
//   locations beyond Dilsukhnagar/Hyderabad already public).
// - NO fee figures anywhere, even as demo.
// - Excluded by policy: AICTE/ISO credential claims or emblem
//   changes (R7), Pay-after-Pass offers in any form (R8), and any
//   outcome-promise wording anywhere.

import type { CourseSection } from "@/data/courses";

export interface DemoCourseContent {
  summary: string;
  sections: CourseSection[];
  /** Only CCNA carries a demo duration; every other demo course leaves duration unclaimed. */
  durationLabel?: string;
  /** Demo module areas used as the facts "What you will learn" list (Hardware only). */
  topics?: string[];
}

export interface DemoServiceContent {
  summary: string;
  scope: string[];
  deliverables: string[];
  exclusions: string[];
  engagement: string;
  /** Always enquiry-confirmed; never asserts free or paid. */
  consultation: string;
}

const about = (p1: string, p2: string): CourseSection => ({
  heading: "About this course",
  paragraphs: [p1, p2],
});
const who = (p: string): CourseSection => ({
  heading: "Who this course is for",
  paragraphs: [p],
});
const klo = (items: string[]): CourseSection => ({
  heading: "Key Learning Objectives",
  paragraphs: items,
});
const modules = (items: string[]): CourseSection => ({
  heading: "Module areas",
  paragraphs: items,
});

export const DEMO_COURSE_CONTENT: Record<string, DemoCourseContent> = {
  "azure-security-engineer-az-500": {
    summary:
      "This course covers Microsoft Azure security: identity protection, platform security, data protection, and security operations. It prepares for the Microsoft AZ-500 exam.",
    sections: [
      about(
        "Azure security work spans identity, networks, compute, storage, and monitoring. This course follows that shape: it starts with identity and access in Microsoft Entra ID, then moves to securing Azure networks, virtual machines, storage accounts, and applications.",
        "Security operations topics cover Microsoft Defender for Cloud, Microsoft Sentinel, and the day-to-day work of reviewing alerts, investigating incidents, and applying remediation steps. It prepares for the Microsoft AZ-500 exam.",
      ),
      who("This course is for learners with basic Azure familiarity who want to work on cloud security topics: administrators, support engineers, and IT professionals moving into security-focused roles."),
      klo([
        "Manage Microsoft Entra ID identities, groups, and role-based access control.",
        "Configure identity protection, conditional access, and privileged identity management concepts.",
        "Secure Azure virtual networks, including network security groups and private endpoints.",
        "Protect compute and storage with disk encryption, key vaults, and access policies.",
        "Use Microsoft Defender for Cloud to assess posture and respond to recommendations.",
        "Work with Microsoft Sentinel workspaces, analytics rules, and incident investigation.",
      ]),
      modules([
        "Identity and access: Entra ID, MFA, conditional access, privileged identity concepts",
        "Network security: virtual networks, network security groups, firewalls, private endpoints",
        "Compute security: virtual machines, disk encryption, Azure Bastion",
        "Storage and data security: key vaults, storage access, data classification concepts",
        "Application security: app registrations, managed identities, API protection basics",
        "Security operations: Defender for Cloud, Sentinel, KQL fundamentals, incident handling",
      ]),
    ],
  },
  "microsoft-devops-az-400": {
    summary:
      "This course covers DevOps practices on Microsoft Azure: source control, continuous integration and delivery, infrastructure as code, and monitoring. It prepares for the Microsoft AZ-400 exam.",
    sections: [
      about(
        "DevOps work connects development and operations: version control, automated builds and releases, infrastructure defined in code, and feedback from monitoring. This course covers that pipeline end to end using Azure DevOps and GitHub Actions concepts.",
        "Topics include branching strategies, pipeline design, release gates, infrastructure as code with Bicep and Terraform concepts, and monitoring with Application Insights and Log Analytics. It prepares for the Microsoft AZ-400 exam.",
      ),
      who("This course is for developers, system administrators, and IT professionals who already work with Azure or application delivery and want to formalise DevOps practices."),
      klo([
        "Design branching and version-control strategies for team projects.",
        "Build continuous integration pipelines that compile, test, and package code.",
        "Design release pipelines with environments, approvals, and deployment strategies.",
        "Describe infrastructure as code using Bicep and Terraform concepts.",
        "Configure monitoring, alerts, and dashboards with Application Insights and Log Analytics.",
        "Apply security and compliance checks inside delivery pipelines.",
      ]),
      modules([
        "DevOps foundations: practices, team structures, and feedback loops",
        "Source control: Git workflows, branching strategies, pull requests",
        "Continuous integration: pipeline design, automated testing, artefacts",
        "Continuous delivery: environments, release gates, deployment strategies",
        "Infrastructure as code: Bicep and Terraform concepts",
        "Monitoring and feedback: Application Insights, Log Analytics, alerts",
      ]),
    ],
  },
  "sc-900": {
    summary:
      "This course introduces security, compliance, and identity fundamentals in the Microsoft cloud: identity concepts, security solutions, and compliance tools. It prepares for the Microsoft SC-900 exam.",
    sections: [
      about(
        "Security, compliance, and identity are the three foundations of cloud trust. This course introduces each one: how identity works in Microsoft Entra ID, how Microsoft security solutions protect users and data, and how compliance tools help organisations meet regulatory requirements.",
        "No prior security background is assumed. The course explains concepts first and then maps them to Microsoft tools such as Defender, Sentinel, and Purview at an introductory level. It prepares for the Microsoft SC-900 exam.",
      ),
      who("This course is for beginners, students, and IT professionals who want a first grounding in security, compliance, and identity concepts before deeper specialisation."),
      klo([
        "Explain core security concepts: confidentiality, integrity, availability, and Zero Trust.",
        "Describe identity concepts: authentication, authorisation, and Microsoft Entra ID.",
        "Identify Microsoft security solutions: Defender, Sentinel, and security baselines.",
        "Explain compliance concepts: data protection, privacy, and regulatory frameworks.",
        "Describe Microsoft Purview capabilities for data governance and compliance.",
        "Recognise common threats and the controls used to reduce them.",
      ]),
      modules([
        "Security concepts: Zero Trust, shared responsibility, threat landscape",
        "Identity: Entra ID, authentication methods, access management",
        "Security solutions: Defender family, Sentinel, security posture",
        "Compliance concepts: regulations, data residency, privacy principles",
        "Microsoft Purview: data classification, retention, insider risk concepts",
      ]),
    ],
  },
  "sc-200": {
    summary:
      "This course covers security operations: detecting threats with Microsoft Sentinel and Defender XDR, investigating incidents with KQL, and responding to attacks. It prepares for the Microsoft SC-200 exam.",
    sections: [
      about(
        "Security operations centres monitor, detect, investigate, and respond to threats. This course follows that workflow: collecting logs into Microsoft Sentinel, writing KQL queries to hunt for suspicious activity, triaging incidents, and carrying out response steps with Defender XDR.",
        "Topics include workspace configuration, analytics rules, incident management, threat intelligence concepts, and automation with playbooks. It prepares for the Microsoft SC-200 exam.",
      ),
      who("This course is for IT and security professionals with basic networking and Microsoft 365 or Azure familiarity who want to work in security operations or incident response."),
      klo([
        "Configure Microsoft Sentinel workspaces and connect common data sources.",
        "Write KQL queries to search logs and hunt for indicators of compromise.",
        "Create analytics rules and manage incidents through their lifecycle.",
        "Use Defender XDR to investigate endpoints, identities, and email threats.",
        "Apply threat intelligence concepts to prioritise investigations.",
        "Describe automation options with playbooks and response procedures.",
      ]),
      modules([
        "Security operations fundamentals: SOC workflow, triage, escalation",
        "Microsoft Sentinel: workspaces, data connectors, workbooks",
        "KQL: log queries, hunting queries, functions and operators",
        "Analytics rules and incidents: detection, tuning, investigation",
        "Defender XDR: endpoints, identities, email, and cloud apps",
        "Response and automation: playbooks, procedures, reporting",
      ]),
    ],
  },
  "microsoft-sentinel": {
    summary:
      "This course covers Microsoft Sentinel: setting up workspaces, ingesting logs, writing KQL queries, building detections, and managing incidents from triage to closure.",
    sections: [
      about(
        "Microsoft Sentinel is a cloud-native SIEM and SOAR solution: it collects security logs, detects threats with analytics rules, and supports investigation and automated response. This course covers the full workflow, from workspace setup and data connectors to incidents and workbooks.",
        "A large part of the course is KQL, the query language used to search and analyse log data. Learners practise writing queries for hunting, detection, and reporting scenarios.",
      ),
      who("This course is for security analysts, system administrators, and IT professionals who work with Microsoft security tooling or want to move into security operations."),
      klo([
        "Create and configure a Microsoft Sentinel workspace.",
        "Connect data sources and understand common log tables.",
        "Write KQL queries for searching, filtering, and aggregating log data.",
        "Build analytics rules, including scheduled and near-real-time detections.",
        "Manage incidents: triage, investigation, and closure.",
        "Create workbooks for visual reporting and automation with playbooks.",
      ]),
      modules([
        "Sentinel architecture: workspaces, regions, data ingestion",
        "Data connectors and log tables: Azure, Microsoft 365, third-party sources",
        "KQL fundamentals: tables, filters, projections, aggregations",
        "Hunting: hypotheses, queries, and bookmarking findings",
        "Detections: analytics rules, tuning, and false-positive handling",
        "Incidents and response: investigation graphs, playbooks, workbooks",
      ]),
    ],
  },
  "aws-cloud-practitioner": {
    summary:
      "This course introduces cloud computing and Amazon Web Services: core services, global infrastructure, security concepts, and billing. It prepares for the AWS Certified Cloud Practitioner (CLF-C02) exam.",
    sections: [
      about(
        "This is an entry-level cloud course. It explains what cloud computing is, how AWS organises its global infrastructure into regions and availability zones, and what the most widely used services do: compute with EC2, storage with S3, databases with RDS, and networking with VPC.",
        "The course also covers the shared responsibility model, basic security concepts such as IAM, and how AWS billing and pricing work, including support plans. It prepares for the AWS Certified Cloud Practitioner (CLF-C02) exam.",
      ),
      who("This course is for beginners, students, and non-technical professionals who want a first understanding of AWS and cloud computing, including those planning further AWS specialisation."),
      klo([
        "Explain cloud computing concepts: on-demand resources, elasticity, and pay-as-you-go pricing.",
        "Describe AWS global infrastructure: regions, availability zones, and edge locations.",
        "Identify core AWS services: EC2, S3, RDS, VPC, IAM, and CloudWatch.",
        "Explain the shared responsibility model for security and compliance.",
        "Describe AWS billing, pricing models, and support plans.",
        "Recognise common AWS use cases and architectural patterns.",
      ]),
      modules([
        "Cloud concepts: service models, deployment models, benefits",
        "AWS global infrastructure: regions, availability zones, edge locations",
        "Compute: EC2, Lambda, Elastic Beanstalk concepts",
        "Storage: S3, EBS, EFS, storage classes",
        "Databases: RDS, DynamoDB, Redshift concepts",
        "Networking and security: VPC, IAM, shared responsibility",
        "Billing: pricing models, cost tools, support plans",
      ]),
    ],
  },
  "aws-solutions-architect-associate": {
    summary:
      "This course covers designing solutions on AWS: resilient architectures, high-performing designs, secure applications, and cost-optimised infrastructure. It prepares for the AWS Solutions Architect – Associate (SAA-C03) exam.",
    sections: [
      about(
        "Solutions architecture is about choosing the right AWS services and arranging them so a workload is resilient, secure, and cost-effective. This course works through the major design areas: networking with VPC, compute choices, storage tiers, databases, decoupling with queues and topics, and security controls.",
        "Design scenarios are used throughout: multi-tier applications, high availability across availability zones, backup and disaster recovery concepts, and cost optimisation. It prepares for the AWS Solutions Architect – Associate (SAA-C03) exam.",
      ),
      who("This course is for learners with basic AWS familiarity — roughly at Cloud Practitioner level — who want to design architectures, including developers, administrators, and engineers."),
      klo([
        "Design resilient architectures using multiple availability zones and load balancing.",
        "Choose compute options: EC2, containers, and serverless, for a given workload.",
        "Select storage and database services based on access patterns and consistency needs.",
        "Design secure networks with VPC, subnets, security groups, and network ACLs.",
        "Apply IAM, encryption, and secrets management to an architecture.",
        "Optimise architectures for cost using pricing models and storage tiers.",
      ]),
      modules([
        "Resilient design: multi-AZ patterns, load balancing, auto scaling",
        "Compute: EC2 families, containers, Lambda, Elastic Beanstalk",
        "Storage: S3 tiers, EBS, EFS, lifecycle policies",
        "Databases: RDS, Aurora, DynamoDB, ElastiCache selection",
        "Networking: VPC design, subnets, routing, Direct Connect and VPN concepts",
        "Security: IAM policies, KMS, Secrets Manager, WAF concepts",
        "Cost optimisation: pricing models, trusted advisor concepts, tagging",
      ]),
    ],
  },
  "aws-devops-engineer": {
    summary:
      "This course covers DevOps on AWS at professional level: CI/CD pipelines, infrastructure automation, monitoring, and incident response. It prepares for the AWS DevOps Engineer – Professional (DOP-C02) exam.",
    sections: [
      about(
        "Professional-level DevOps on AWS means automating the full delivery lifecycle: source control, build and test automation, deployment strategies, infrastructure as code, and observability. This course covers those areas with AWS services such as CodePipeline, CodeBuild, CodeDeploy, CloudFormation, and CloudWatch.",
        "Advanced topics include deployment strategies (blue/green, canary, rolling), configuration management concepts, high-availability design, and incident response procedures. It prepares for the AWS DevOps Engineer – Professional (DOP-C02) exam.",
      ),
      who("This course is for developers, system administrators, and engineers with prior AWS experience who want to formalise professional-level DevOps practices."),
      klo([
        "Design CI/CD pipelines with CodeCommit, CodeBuild, CodeDeploy, and CodePipeline.",
        "Automate infrastructure with CloudFormation and configuration management concepts.",
        "Implement deployment strategies: rolling, blue/green, and canary.",
        "Configure monitoring, logging, and alerting with CloudWatch and X-Ray concepts.",
        "Apply security controls and compliance checks inside delivery pipelines.",
        "Design incident response and disaster recovery procedures for AWS workloads.",
      ]),
      modules([
        "CI/CD on AWS: CodePipeline, CodeBuild, CodeDeploy, artefact management",
        "Infrastructure as code: CloudFormation, CDK concepts, drift",
        "Configuration management: Systems Manager, OpsWorks concepts",
        "Deployment strategies: rolling, blue/green, canary, feature flags",
        "Monitoring: CloudWatch metrics, logs, alarms, dashboards, X-Ray",
        "Incident response: runbooks, on-call concepts, post-incident review",
      ]),
    ],
  },
};

Object.assign(DEMO_COURSE_CONTENT, {
  "comptia-a-plus-core-1": {
    summary:
      "This course covers the hardware and networking foundations of IT support: mobile devices, networking technology, hardware components, and troubleshooting. It prepares for the CompTIA A+ Core 1 (220-1101) exam.",
    sections: [
      about(
        "Core 1 is the hardware half of A+. It covers mobile devices and laptops, networking fundamentals including ports, protocols, and Wi-Fi standards, and the internal components of desktop systems: motherboards, processors, memory, storage, and power.",
        "Troubleshooting is a thread throughout: a structured methodology for diagnosing hardware, network, and mobile-device problems, applied to realistic fault scenarios. It prepares for the CompTIA A+ Core 1 (220-1101) exam.",
      ),
      who("This course is for beginners entering IT support, including students and career changers, and for support staff who want a structured grounding in hardware and networking."),
      klo([
        "Identify mobile device and laptop components and their characteristics.",
        "Explain networking fundamentals: IP addressing, ports, protocols, and Wi-Fi standards.",
        "Identify motherboard, processor, memory, storage, and power supply components.",
        "Apply a structured troubleshooting methodology to hardware and network faults.",
        "Configure and troubleshoot printers and multifunction devices.",
        "Describe virtualisation and cloud concepts at a foundational level.",
      ]),
      modules([
        "Mobile devices: laptops, tablets, smartphones, accessories",
        "Networking: TCP/IP, ports, protocols, Wi-Fi standards, cabling",
        "Hardware: motherboards, CPUs, RAM, storage, power supplies",
        "Peripherals: displays, printers, input devices",
        "Virtualisation and cloud: hypervisors, cloud models",
        "Troubleshooting: methodology, hardware faults, network faults",
      ]),
    ],
  },
  "comptia-a-plus-core-2": {
    summary:
      "This course covers operating systems, security, and software troubleshooting for IT support roles. It prepares for the CompTIA A+ Core 2 (220-1102) exam.",
    sections: [
      about(
        "Core 2 is the software and security half of A+. It covers Windows, macOS, Linux, and mobile operating systems: installation, configuration, and command-line tools. Security topics include malware types, social engineering, access controls, and best practices for securing workstations and networks.",
        "Software troubleshooting and operational procedures complete the course: diagnosing OS and application problems, backup concepts, and professional documentation and communication practices. It prepares for the CompTIA A+ Core 2 (220-1102) exam.",
      ),
      who("This course is for beginners entering IT support and for support staff who want a structured grounding in operating systems and security practices."),
      klo([
        "Install, configure, and manage Windows, macOS, Linux, and mobile operating systems.",
        "Use command-line tools for administration and troubleshooting.",
        "Identify malware types and apply removal and prevention steps.",
        "Explain security best practices: authentication, access control, and data protection.",
        "Troubleshoot operating system, application, and security problems.",
        "Apply operational procedures: documentation, change management, and professionalism.",
      ]),
      modules([
        "Operating systems: Windows, macOS, Linux, Chrome OS, mobile OS",
        "Command-line tools: Windows, Linux, and macOS shells",
        "Security: malware, social engineering, access controls, encryption concepts",
        "Software troubleshooting: OS errors, application faults, boot problems",
        "Operational procedures: documentation, ticketing, change management",
      ]),
    ],
  },
  "cybersecurity-technologies": {
    summary:
      "This programme introduces cybersecurity technologies: security fundamentals, network defence, cryptography basics, and security operations concepts.",
    sections: [
      about(
        "Cybersecurity technologies span people, processes, and tools. This programme introduces the foundations first — the CIA triad, threat actors and attack types, and risk concepts — then moves to defensive technologies: firewalls, intrusion detection, endpoint protection, and security monitoring.",
        "Cryptography basics, identity and access management, and incident response concepts complete the programme, giving learners a map of the field before deeper specialisation.",
      ),
      who("This programme is for beginners and IT professionals who want a broad introduction to cybersecurity technologies before choosing a specialisation such as network defence, ethical hacking, or security operations."),
      klo([
        "Explain security fundamentals: CIA triad, threat actors, and risk concepts.",
        "Describe network defence technologies: firewalls, IDS/IPS, and segmentation.",
        "Explain cryptography basics: symmetric and asymmetric encryption, hashing, certificates.",
        "Describe identity and access management: authentication, authorisation, MFA.",
        "Recognise common attack types: phishing, malware, denial of service, injection.",
        "Outline incident response stages and security operations workflows.",
      ]),
      modules([
        "Foundations: CIA triad, threats, vulnerabilities, risk",
        "Network defence: firewalls, IDS/IPS, VPNs, segmentation",
        "Endpoint and application security: antivirus, EDR concepts, hardening",
        "Cryptography: encryption, hashing, PKI, certificates",
        "Identity and access: MFA, SSO, privileged access concepts",
        "Operations: monitoring, SIEM concepts, incident response stages",
      ]),
    ],
  },
  vapt: {
    summary:
      "This course covers vulnerability assessment and penetration testing: scoping engagements, scanning for vulnerabilities, testing systems with standard methodologies, and reporting findings responsibly.",
    sections: [
      about(
        "Vulnerability assessment finds weaknesses; penetration testing verifies whether they are exploitable, under agreed rules of engagement. This course covers both: reconnaissance, scanning with standard tools, manual verification techniques, and the methodology used in professional assessments.",
        "Reporting is treated as a core skill: findings are ranked by severity, explained with evidence and reproduction steps, and paired with remediation guidance. All testing is taught strictly within authorised, agreed-scope engagements.",
      ),
      who("This course is for IT and security professionals with networking and operating-system fundamentals who want to work in offensive security assessment roles."),
      klo([
        "Scope an assessment: rules of engagement, authorisation, and boundaries.",
        "Perform reconnaissance using passive and active techniques.",
        "Run vulnerability scans and interpret results, including false positives.",
        "Apply manual testing techniques for common web and network weaknesses.",
        "Follow standard methodologies, including OWASP guidance for web applications.",
        "Write assessment reports with severity ratings, evidence, and remediation advice.",
      ]),
      modules([
        "Engagement fundamentals: scoping, authorisation, rules of engagement",
        "Reconnaissance: DNS, network enumeration, service identification",
        "Vulnerability scanning: tools, plugins, result analysis",
        "Network testing: service exploitation concepts, privilege escalation basics",
        "Web testing: OWASP Top 10, injection, authentication weaknesses",
        "Reporting: severity, evidence, remediation, retest concepts",
      ]),
    ],
  },
  "core-java": {
    summary:
      "This course covers Core Java: object-oriented programming, collections, exception handling, and file and database basics for building Java applications.",
    sections: [
      about(
        "Java remains a widely used language for backend systems, Android development foundations, and enterprise applications. This course builds from language fundamentals — variables, control flow, and methods — into object-oriented design with classes, inheritance, interfaces, and polymorphism.",
        "Later topics include the collections framework, exception handling, multithreading concepts, file handling, and JDBC basics for database connectivity, with practical exercises throughout.",
      ),
      who("This course is for beginners with basic programming familiarity and for learners who want a structured Java foundation before frameworks or full-stack work."),
      klo([
        "Write Java programmes using variables, operators, control flow, and methods.",
        "Apply object-oriented concepts: classes, objects, inheritance, interfaces, polymorphism.",
        "Use the collections framework: lists, sets, and maps.",
        "Handle errors with exceptions and write robust input handling.",
        "Explain multithreading concepts and basic concurrency.",
        "Read and write files and connect to databases with JDBC basics.",
      ]),
      modules([
        "Language fundamentals: syntax, data types, operators, control flow",
        "Object-oriented programming: classes, inheritance, interfaces, polymorphism",
        "Collections: lists, sets, maps, generics basics",
        "Exception handling and file I/O",
        "Multithreading concepts and concurrency basics",
        "JDBC: connections, queries, result handling",
      ]),
    ],
  },
  "java-full-stack": {
    summary:
      "This course covers full-stack Java development: backend services with Spring Boot, frontend development with HTML, CSS, and JavaScript, REST APIs, and database integration.",
    sections: [
      about(
        "Full-stack development means building both sides of a web application: the backend services that hold business logic and data, and the frontend that users interact with. This course covers backend development with Java and Spring Boot, REST API design, and frontend development with HTML, CSS, and JavaScript.",
        "Database integration, authentication concepts, and deployment basics complete the picture, with a project that ties the layers together into one working application.",
      ),
      who("This course is for learners with Core Java familiarity who want to build complete web applications, including students and developers moving into full-stack roles."),
      klo([
        "Build REST APIs with Spring Boot: controllers, services, and repositories.",
        "Design data models and persist them with JPA and relational databases.",
        "Create frontend pages with HTML, CSS, and JavaScript that consume APIs.",
        "Apply authentication and authorisation concepts to a web application.",
        "Handle validation, error responses, and API versioning basics.",
        "Assemble a complete full-stack project from database to user interface.",
      ]),
      modules([
        "Backend: Spring Boot, dependency injection, REST controllers",
        "Data: JPA, entities, repositories, relational design",
        "Frontend: HTML, CSS, JavaScript, DOM, fetch APIs",
        "APIs: REST design, status codes, validation, error handling",
        "Security: authentication concepts, JWT basics, CORS",
        "Project: full-stack application build and deployment basics",
      ]),
    ],
  },
});

Object.assign(DEMO_COURSE_CONTENT, {
  "power-bi": {
    summary:
      "This course covers Microsoft Power BI: connecting and shaping data with Power Query, modelling with DAX, and building dashboards and reports for business users.",
    sections: [
      about(
        "Power BI turns raw data into reports people can explore. This course follows the standard workflow: connect to data sources, clean and shape data with Power Query, build a data model with relationships and DAX measures, and design visuals and dashboards.",
        "Publishing and sharing complete the course: workspaces, scheduled refresh concepts, and the difference between reports and dashboards in the Power BI Service.",
      ),
      who("This course is for analysts, accountants, managers, and professionals who work with spreadsheets or business data and want to build interactive reports."),
      klo([
        "Connect Power BI to spreadsheets, databases, and common data sources.",
        "Clean and shape data with Power Query, including merges and transformations.",
        "Build data models with relationships, star-schema concepts, and DAX measures.",
        "Design visuals: charts, tables, matrices, slicers, and drill-through pages.",
        "Create dashboards and configure scheduled refresh concepts.",
        "Publish and share reports through workspaces in the Power BI Service.",
      ]),
      modules([
        "Getting started: Power BI Desktop, interface, data sources",
        "Power Query: cleaning, shaping, merging, appending data",
        "Data modelling: relationships, star schema, calculated columns",
        "DAX: measures, calculated columns, common functions",
        "Visuals: charts, tables, slicers, drill-through, tooltips",
        "Service: workspaces, dashboards, refresh, sharing concepts",
      ]),
    ],
  },
  mysql: {
    summary:
      "This course covers MySQL: writing SQL queries, designing tables, working with joins and indexes, and managing databases with stored procedures and backups.",
    sections: [
      about(
        "MySQL is a widely used relational database. This course starts with SQL fundamentals — SELECT statements, filtering, sorting, and aggregation — then moves to multi-table queries with joins, subqueries, and views.",
        "Database design topics include normalisation, primary and foreign keys, and indexes. Administration basics cover user management, stored procedures, triggers, and backup and restore concepts.",
      ),
      who("This course is for beginners, developers, and analysts who need to work with relational databases, including those preparing for backend or data roles."),
      klo([
        "Write SQL queries: SELECT, WHERE, ORDER BY, GROUP BY, and aggregate functions.",
        "Join tables with INNER, LEFT, and RIGHT joins and interpret results.",
        "Design tables with keys, constraints, and normalisation principles.",
        "Create and use views, stored procedures, and triggers.",
        "Improve query performance with indexes and EXPLAIN basics.",
        "Manage users, permissions, backups, and restores at a basic level.",
      ]),
      modules([
        "SQL fundamentals: SELECT, filtering, sorting, aggregation",
        "Multi-table queries: joins, subqueries, set operations",
        "Database design: normalisation, keys, constraints",
        "Views, procedures, and triggers",
        "Indexes and query performance basics",
        "Administration: users, permissions, backup and restore",
      ]),
    ],
  },
  "data-analytics": {
    summary:
      "This course covers data analytics: cleaning and exploring data, analysing it with spreadsheets and SQL, visualising findings, and presenting insights clearly.",
    sections: [
      about(
        "Data analytics turns raw records into answers. This course follows the analyst workflow: define a question, gather and clean data, explore it for patterns, analyse it with spreadsheets and SQL, and present findings with charts and dashboards.",
        "Statistics foundations — averages, distributions, and comparisons — are covered at a practical level, with emphasis on avoiding common misreadings of data.",
      ),
      who("This course is for beginners, business professionals, and students who want to analyse data for decisions, including those planning further specialisation in data science or business intelligence."),
      klo([
        "Frame analytical questions and identify the data needed to answer them.",
        "Clean messy data: missing values, duplicates, and inconsistent formats.",
        "Analyse data with spreadsheet functions, pivot tables, and SQL queries.",
        "Apply statistics foundations: averages, distributions, and comparisons.",
        "Visualise findings with charts and dashboards that communicate clearly.",
        "Present insights with context, limitations, and recommended actions.",
      ]),
      modules([
        "Analyst workflow: questions, data, analysis, presentation",
        "Data cleaning: formats, missing values, duplicates",
        "Spreadsheets: functions, pivot tables, lookups",
        "SQL for analysts: queries, joins, aggregations",
        "Statistics foundations: distributions, comparisons, pitfalls",
        "Visualisation and storytelling with data",
      ]),
    ],
  },
  "data-science": {
    summary:
      "This course covers data science foundations: Python programming, statistics, data wrangling, visualisation, and introductory machine learning.",
    sections: [
      about(
        "Data science combines programming, statistics, and domain understanding. This course builds the programming base in Python with pandas and NumPy, then covers statistics foundations, data wrangling, and visualisation with standard libraries.",
        "Machine learning is introduced at a foundational level: regression, classification, clustering, and model evaluation concepts, with practical exercises on real datasets.",
      ),
      who("This course is for learners with basic programming or analytics familiarity who want a structured entry into data science, including analysts and engineers changing focus."),
      klo([
        "Write Python programmes for data work using pandas and NumPy.",
        "Clean, reshape, and merge datasets for analysis.",
        "Apply statistics foundations: distributions, hypothesis concepts, correlation.",
        "Visualise data with Matplotlib and Seaborn.",
        "Build introductory models: regression, classification, and clustering.",
        "Evaluate models with standard metrics and avoid common pitfalls.",
      ]),
      modules([
        "Python for data: pandas, NumPy, Jupyter workflows",
        "Data wrangling: cleaning, reshaping, merging datasets",
        "Statistics foundations: distributions, sampling, correlation",
        "Visualisation: Matplotlib, Seaborn, exploratory analysis",
        "Machine learning basics: regression, classification, clustering",
        "Model evaluation: metrics, overfitting, validation concepts",
      ]),
    ],
  },
  "certified-professional-coder-cpc": {
    summary:
      "This course covers medical coding foundations: ICD-10-CM diagnosis coding, CPT procedure coding, HCPCS, modifiers, and compliance principles. It prepares for the Certified Professional Coder (CPC) exam.",
    sections: [
      about(
        "Medical coders translate clinical documentation into standardised codes used for billing and records. This course covers the three code systems at the centre of the work: ICD-10-CM for diagnoses, CPT for procedures and services, and HCPCS for supplies and additional services.",
        "Guidelines and compliance are treated as core skills: reading documentation accurately, applying coding guidelines, using modifiers correctly, and understanding the audit and compliance context of coding work. It prepares for the Certified Professional Coder (CPC) exam.",
      ),
      who("This course is for beginners entering medical coding, including life-science graduates and healthcare support staff, and for coders preparing for CPC certification."),
      klo([
        "Apply ICD-10-CM guidelines to assign diagnosis codes from documentation.",
        "Apply CPT guidelines to code procedures and evaluation and management services.",
        "Use HCPCS Level II codes and modifiers correctly.",
        "Read clinical documentation and identify codable elements.",
        "Explain compliance principles, audit concepts, and documentation requirements.",
        "Practise with coding exercises across major body systems and service types.",
      ]),
      modules([
        "Coding foundations: code systems, documentation, guidelines",
        "ICD-10-CM: chapters, conventions, diagnosis coding",
        "CPT: surgery, radiology, pathology, medicine sections",
        "Evaluation and management: levels, documentation elements",
        "HCPCS and modifiers: Level II codes, modifier usage",
        "Compliance: audits, documentation requirements, ethics concepts",
      ]),
    ],
  },
  "hcc-medical-coding": {
    summary:
      "This course covers hierarchical condition category (HCC) coding: risk adjustment concepts, documentation requirements, and accurate capture of chronic conditions.",
    sections: [
      about(
        "Hierarchical condition category coding supports risk adjustment: patient conditions are documented and coded so that health risk is reflected accurately. This course explains the HCC model, the role of documentation, and the coding practices that keep risk capture complete and compliant.",
        "Topics include common chronic condition categories, the importance of annual documentation, specificity in diagnosis coding, and the audit context in which HCC coding is reviewed.",
      ),
      who("This course is for medical coders and healthcare documentation professionals who want to work with risk adjustment coding, including CPC learners adding a specialty."),
      klo([
        "Explain the HCC model and how risk adjustment works.",
        "Identify commonly coded chronic condition categories.",
        "Apply documentation requirements for complete and specific coding.",
        "Recognise the difference between active, chronic, and historical conditions.",
        "Describe audit concepts and common documentation gaps.",
        "Practise HCC coding with realistic documentation examples.",
      ]),
      modules([
        "Risk adjustment foundations: HCC model, risk scores",
        "Chronic condition categories: diabetes, heart disease, kidney disease, and others",
        "Documentation: specificity, annual capture, provider notes",
        "Coding practice: case exercises with documentation review",
        "Audits: common errors, compliance, query concepts",
      ]),
    ],
  },
  "ip-drg-medical-coding": {
    summary:
      "This course covers inpatient diagnosis-related group (IP-DRG) coding: MS-DRG assignment, principal diagnosis selection, procedure coding, and documentation requirements for inpatient records.",
    sections: [
      about(
        "Inpatient coding assigns diagnosis-related groups that reflect the resources used during a hospital stay. This course covers the MS-DRG system: how principal diagnosis, secondary diagnoses, and procedures combine to determine a DRG, and why documentation quality changes the result.",
        "Procedure coding with ICD-10-PCS is covered at a foundational level, along with the querying process used when documentation is unclear or conflicting.",
      ),
      who("This course is for medical coders with basic ICD-10-CM familiarity who want to move into inpatient coding, including coders adding an inpatient specialty."),
      klo([
        "Explain the MS-DRG system and how DRGs are assigned.",
        "Select principal diagnosis following official guidelines.",
        "Apply secondary diagnosis coding, including complications and comorbidities.",
        "Describe ICD-10-PCS structure and basic procedure coding.",
        "Recognise when a documentation query is needed and how it works.",
        "Practise DRG assignment with inpatient case exercises.",
      ]),
      modules([
        "MS-DRG foundations: grouping logic, relative weights concepts",
        "Principal diagnosis selection and guidelines",
        "Secondary diagnoses: CC/MCC concepts",
        "ICD-10-PCS: structure, root operations, approach",
        "Documentation queries and compliance",
        "Case practice: inpatient record exercises",
      ]),
    ],
  },
  "em-medical-coding": {
    summary:
      "This course covers evaluation and management (E/M) coding: visit levels, medical decision making, time-based coding, and documentation requirements.",
    sections: [
      about(
        "Evaluation and management codes describe visits where a provider evaluates and manages a patient: office visits, hospital visits, consultations, and telehealth encounters. This course covers how visit levels are determined under current guidelines.",
        "The two main methods — medical decision making and time — are explained in detail, along with the documentation elements each method requires and the common errors that lead to incorrect levels.",
      ),
      who("This course is for medical coders and billing professionals who code outpatient and inpatient visits, including CPC learners adding E/M depth."),
      klo([
        "Explain E/M code categories: office, hospital, consultation, and other settings.",
        "Apply medical decision making levels: problems, data, and risk.",
        "Apply time-based E/M coding rules correctly.",
        "Identify required documentation elements for each level.",
        "Recognise common E/M errors and audit findings.",
        "Practise E/M levelling with realistic visit documentation.",
      ]),
      modules([
        "E/M categories and code structure",
        "Medical decision making: problems, data, risk",
        "Time-based coding: rules and documentation",
        "Documentation requirements by level",
        "Common errors and audit concepts",
        "Case practice: visit note exercises",
      ]),
    ],
  },
  "radiology-medical-coding": {
    summary:
      "This course covers radiology coding: diagnostic imaging procedures, interventional radiology concepts, supervision and interpretation rules, and modality-specific guidelines.",
    sections: [
      about(
        "Radiology coding covers imaging services from X-ray and ultrasound to CT, MRI, and nuclear medicine, plus interventional procedures. This course explains how radiology codes are structured, how supervision and interpretation is reported, and how contrast and guidance affect code selection.",
        "Modality-specific guidelines and common documentation requirements are covered with realistic report examples.",
      ),
      who("This course is for medical coders with basic CPT familiarity who want a radiology specialty, including coders working with imaging providers."),
      klo([
        "Identify radiology code families by modality: X-ray, ultrasound, CT, MRI, nuclear medicine.",
        "Apply supervision and interpretation reporting rules.",
        "Explain how contrast, guidance, and complete versus limited studies affect coding.",
        "Describe interventional radiology coding concepts.",
        "Recognise common radiology documentation requirements.",
        "Practise radiology coding with realistic report examples.",
      ]),
      modules([
        "Radiology code structure and modalities",
        "Diagnostic imaging: X-ray, ultrasound, CT, MRI",
        "Nuclear medicine basics",
        "Supervision and interpretation rules",
        "Interventional radiology concepts",
        "Report-based coding practice",
      ]),
    ],
  },
  "anesthesia-medical-coding": {
    summary:
      "This course covers anesthesia coding: anesthesia code families, time units, modifiers, physical status, and the documentation required for anesthesia services.",
    sections: [
      about(
        "Anesthesia coding differs from most procedure coding: payment-related concepts include base units, time units, and physical status modifiers, and the documentation comes from anesthesia records rather than operative notes alone.",
        "This course covers anesthesia code families by anatomical site, time reporting rules, commonly used modifiers, and the documentation elements auditors check.",
      ),
      who("This course is for medical coders with basic CPT familiarity who want an anesthesia specialty, including coders working with anesthesia providers or surgical facilities."),
      klo([
        "Identify anesthesia code families by anatomical site and procedure type.",
        "Apply time-unit reporting rules for anesthesia services.",
        "Use physical status modifiers and other common anesthesia modifiers.",
        "Explain qualifying circumstances and their documentation.",
        "Recognise documentation requirements on anesthesia records.",
        "Practise anesthesia coding with realistic case examples.",
      ]),
      modules([
        "Anesthesia code families and structure",
        "Time units: start, stop, and reporting rules",
        "Modifiers: physical status and qualifying circumstances",
        "Monitored anesthesia care concepts",
        "Documentation: anesthesia records and requirements",
        "Case practice: anesthesia coding exercises",
      ]),
    ],
  },
  autocad: {
    summary:
      "This course covers AutoCAD 2D drafting: drawing and editing tools, layers, blocks, annotations, layouts, and plotting for architectural and engineering drawings.",
    sections: [
      about(
        "AutoCAD is a standard tool for 2D drafting in architecture, engineering, and construction. This course builds drafting skill from the ground up: drawing with lines, circles, and polylines, editing with trim, fillet, and offset, and organising drawings with layers.",
        "Later topics include blocks and attributes, text and dimension styles, layouts and viewports, and plotting drawings to scale for printing and sharing.",
      ),
      who("This course is for beginners, students, and professionals in architecture, civil engineering, mechanical drafting, and interior design who want practical AutoCAD drafting skill."),
      klo([
        "Draw and edit 2D geometry: lines, circles, polylines, arcs, and splines.",
        "Organise drawings with layers, line types, and object properties.",
        "Create and use blocks, attributes, and external references.",
        "Annotate drawings with text, dimensions, leaders, and tables.",
        "Set up layouts, viewports, and plot styles for scaled output.",
        "Produce complete, print-ready 2D drawings from a brief.",
      ]),
      modules([
        "Interface and drawing setup: units, limits, templates",
        "Draw and modify tools: lines, circles, trim, fillet, offset, array",
        "Layers, properties, and drawing organisation",
        "Blocks, attributes, and external references",
        "Annotation: text, dimensions, leaders, hatching",
        "Layouts, viewports, and plotting to scale",
      ]),
    ],
  },
  "ccna-200-301": {
    summary:
      "This demo page covers Cisco networking fundamentals: network components, IP addressing, switching, routing, wireless basics, and automation concepts. It prepares for the Cisco CCNA 200-301 exam.",
    sections: [
      about(
        "Networking fundamentals start with how devices communicate: network components, topologies, and the TCP/IP model. This demo page covers addressing with IPv4 and IPv6, subnetting, and the services that make networks work: DHCP and DNS.",
        "Switching and routing topics include VLANs, spanning-tree concepts, inter-VLAN routing, and OSPF fundamentals, plus wireless principles and network automation basics. It prepares for the Cisco CCNA 200-301 exam.",
      ),
      who("This demo page is for learners beginning network engineering, including students and IT support staff moving toward networking roles."),
      klo([
        "Explain network components, topologies, and the TCP/IP model.",
        "Apply IPv4 and IPv6 addressing and subnetting.",
        "Configure VLANs and explain spanning-tree concepts.",
        "Describe inter-VLAN routing and OSPF fundamentals.",
        "Explain wireless principles, standards, and security basics.",
        "Describe network automation and programmability concepts.",
      ]),
      modules([
        "Networking fundamentals: components, topologies, TCP/IP",
        "IP addressing: IPv4, IPv6, subnetting, DHCP, DNS",
        "Switching: VLANs, trunking, spanning-tree concepts",
        "Routing: inter-VLAN routing, static routes, OSPF fundamentals",
        "Wireless: standards, security, controller concepts",
        "Security and automation: ACLs, device security, programmability basics",
      ]),
    ],
    durationLabel: "Duration (demo): 8 weeks",
  },
  "digital-marketing": {
    summary:
      "This demo page covers digital marketing: search engine optimisation, social media marketing, paid advertising, email marketing, and analytics for measuring results.",
    sections: [
      about(
        "Digital marketing connects businesses with audiences across search, social, email, and advertising channels. This demo page covers how each channel works, how they fit into a marketing funnel, and how results are measured with analytics tools.",
        "Practical topics include keyword research, on-page and technical SEO basics, social content planning, paid campaign structures, and reading analytics reports to decide what to change next.",
      ),
      who("This demo page is for beginners, business owners, and marketing learners who want a working understanding of digital marketing channels and measurement."),
      klo([
        "Explain the digital marketing funnel and how channels support each stage.",
        "Apply SEO basics: keyword research, on-page optimisation, technical checks.",
        "Plan social media content and measure engagement.",
        "Structure paid campaigns on search and social platforms.",
        "Design email campaigns: lists, segments, and basic automation.",
        "Read analytics reports and use them to improve campaigns.",
      ]),
      modules([
        "Marketing foundations: funnels, audiences, goals, measurement",
        "SEO: keyword research, on-page, technical basics, local SEO",
        "Social media: content planning, platforms, engagement metrics",
        "Paid advertising: search ads, social ads, budgets, targeting",
        "Email marketing: lists, segmentation, automation basics",
        "Analytics: GA4 concepts, reports, conversion tracking",
      ]),
    ],
  },
  "computer-hardware-and-networking": {
    summary:
      "This demo page covers computer hardware and networking foundations: system components, operating system installation, networking basics, and structured troubleshooting.",
    sections: [
      about(
        "This demo page covers the hardware side of IT support: identifying components, assembling and upgrading systems, installing operating systems, and connecting machines to networks. Networking basics include cabling, IP addressing, and wireless setup.",
        "Troubleshooting runs through the page: a structured approach to diagnosing hardware faults, boot problems, and connectivity issues, with preventive maintenance and safety practices.",
      ),
      who("This demo page is for beginners entering IT support and for learners who want practical hardware and networking foundations."),
      klo([
        "Identify computer components: motherboards, processors, memory, storage, power supplies.",
        "Assemble, upgrade, and maintain desktop systems.",
        "Install and configure operating systems and drivers.",
        "Set up wired and wireless networks: cabling, IP addressing, routers.",
        "Apply structured troubleshooting to hardware and connectivity faults.",
        "Follow safety and ESD practices for hardware work.",
      ]),
    ],
    // Demo module areas replace the published area list on this branch
    // only; the published list returns when official inputs replace demo.
    topics: [
      "Computer components: motherboards, processors, memory, storage",
      "Power supplies and cooling",
      "Peripherals: displays, printers, input devices",
      "Operating system installation and drivers",
      "Networking basics: cabling, IP addressing, Wi-Fi setup",
      "Troubleshooting: hardware faults, boot problems, connectivity",
      "Preventive maintenance and ESD safety",
    ],
  },
});

// CCNP partial page (Das's partial-page shape): title, confirmed
// exam/track identity, demo description, and an explicit
// "Detailed syllabus under review" notice rendered by the template.
// NO body sections — and in particular ZERO CCNA-derived job roles,
// exam requirements, or learning outcomes. If no verified CCNP
// description exists, this page stays held instead.
export const DEMO_CCNP_SUMMARY =
  "This demo partial page introduces the Cisco Certified Network Professional (CCNP) Enterprise track, built around the 350-401 ENCOR exam. It prepares for the Cisco 350-401 ENCOR exam. The detailed syllabus is under review.";

export const DEMO_CCNP_NOTICE =
  "Detailed syllabus under review — the full syllabus for this course is shared by the GradeSpot team after enquiry.";

// Demo service scope copy. Every field is placeholder demo copy:
// target customer, scope, deliverables, exclusions, engagement model,
// and a consultation basis that is ALWAYS enquiry-confirmed (never
// asserts free or paid, never asserts a timeline or a price).
const demoService = (
  summary: string,
  scope: string[],
  deliverables: string[],
  exclusions: string[],
  engagement: string,
): DemoServiceContent => ({
  summary,
  scope,
  deliverables,
  exclusions,
  engagement,
  consultation:
    "Whether the initial consultation is free or paid is confirmed on enquiry.",
});

export const DEMO_SERVICE_CONTENT: Record<string, DemoServiceContent> = {
  "corporate-trainings": demoService(
    "Demo scope: technology training programmes delivered for company teams, covering the same subject areas as the public course catalogue, adapted to a team's role and skill level.",
    [
      "Training for company teams in software, cloud, networking, cybersecurity, and data topics",
      "Needs discussion to select topics and depth for each team",
      "Sessions for groups, scheduled around the company's working pattern",
    ],
    [
      "A training plan covering the agreed topics and depth",
      "Session materials for participants",
      "A summary of topics covered after delivery",
    ],
    [
      "Individual enrolment for the public course catalogue (see the Trainings section)",
      "Certification exam fees and exam bookings",
      "Ongoing support contracts beyond the agreed training period",
    ],
    "Engagement is scoped per company on enquiry: team size, topics, and depth decide the plan.",
  ),
  internships: demoService(
    "Demo scope: structured internship programmes where learners work on guided practical tasks with mentoring, aimed at building workplace-ready familiarity with real tools and workflows.",
    [
      "Guided practical tasks in technology topics",
      "Mentoring and periodic progress reviews",
      "Exposure to team working practices and documentation",
    ],
    [
      "A defined task plan for the internship period",
      "Mentoring sessions and progress feedback",
      "A completion summary describing the work undertaken",
    ],
    [
      "Any promise of employment, placement, or stipend",
      "Academic credit decisions, which rest with the learner's institution",
      "Certification exam fees",
    ],
    "Engagement is scoped per intake on enquiry: duration, topic area, and mentoring structure are confirmed before the programme starts.",
  ),
  "industrial-trainings": demoService(
    "Demo scope: practical training aligned to industry work, for students and working professionals who want applied familiarity with current tools and practices.",
    [
      "Practical sessions in technology topics used in industry roles",
      "Exercises based on realistic workplace scenarios",
      "Coverage of tools and workflows used in the relevant field",
    ],
    [
      "A training plan covering the agreed topics",
      "Practical exercises and session materials",
      "A summary of topics covered after delivery",
    ],
    [
      "Certification exam fees and exam bookings",
      "Employment or placement promises",
      "Company-specific internal systems training unless agreed in scope",
    ],
    "Engagement is scoped per group on enquiry: topics, depth, and group size decide the plan.",
  ),
  "college-workshops": demoService(
    "Demo scope: technical workshops conducted for college students, covering introductory and intermediate topics with demonstrations and exercises.",
    [
      "Single-session or short-series workshops for student groups",
      "Demonstrations and guided exercises on the chosen topic",
      "Introductory and intermediate topic coverage",
    ],
    [
      "A workshop plan covering the agreed topic and level",
      "Demonstration materials and exercise handouts",
      "A summary of topics covered after delivery",
    ],
    [
      "Full course delivery (see the Trainings section for courses)",
      "Certification exam fees",
      "Individual mentoring beyond the workshop session",
    ],
    "Engagement is scoped per college on enquiry: topic, level, group size, and venue decide the plan.",
  ),
  "cybersecurity-services": demoService(
    "Demo scope: cybersecurity services for organisations, covering assessment, architecture guidance, and monitoring concepts to help teams understand and reduce their security exposure.",
    [
      "Security assessments of networks, systems, and applications",
      "Architecture and configuration guidance",
      "Threat monitoring concepts and incident response planning",
    ],
    [
      "An assessment plan covering the agreed systems and scope",
      "A findings report with observations and recommended actions",
      "A walkthrough of the findings with the organisation's team",
    ],
    [
      "Any promise that an assessment finds every vulnerability",
      "Ongoing managed security operations unless separately agreed",
      "Remediation implementation unless agreed as a separate engagement",
    ],
    "Engagement is scoped per organisation on enquiry: systems in scope, depth of assessment, and reporting format decide the plan.",
  ),
  "web-development": demoService(
    "Demo scope: website design and development for businesses, covering business websites, landing pages, and web applications, from planning through launch.",
    [
      "Business websites, landing pages, and brochure sites",
      "Custom web applications and content-managed sites",
      "Redesign and improvement of existing websites",
    ],
    [
      "A website plan covering pages, features, and content structure",
      "Design and development of the agreed site",
      "Launch support and a handover note for ongoing updates",
    ],
    [
      "Content writing unless agreed as part of the engagement",
      "Ongoing marketing or advertising services",
      "Third-party subscription costs for hosting, domains, or plugins",
    ],
    "Engagement is scoped per project on enquiry: pages, features, and content requirements decide the plan.",
  ),
  "digital-marketing-solutions": demoService(
    "Demo scope: digital marketing services to help businesses reach audiences online, covering search, social media, advertising, and analytics.",
    [
      "Search engine optimisation and local search visibility",
      "Social media presence and content planning",
      "Paid advertising on search and social platforms",
      "Analytics setup and performance reporting",
    ],
    [
      "A marketing plan covering channels, goals, and measurement",
      "Campaign setup and management for the agreed channels",
      "Periodic performance reports with observations",
    ],
    [
      "Any promise of rankings, traffic volumes, or sales outcomes",
      "Advertising spend itself, which is billed separately by platforms",
      "Creative production beyond the agreed scope",
    ],
    "Engagement is scoped per business on enquiry: channels, goals, and budget direction decide the plan.",
  ),
  "network-infrastructure-building": demoService(
    "Demo scope: network infrastructure setup for offices and campuses, covering structured cabling, switching, wireless coverage, and basic network configuration.",
    [
      "Structured cabling and network point installation",
      "Switch, router, and wireless access point setup",
      "Basic network configuration: addressing, VLANs, and internet connectivity",
      "Documentation of the installed network",
    ],
    [
      "A network plan covering layout, equipment, and cabling",
      "Installation and configuration of the agreed infrastructure",
      "A handover document describing the installed setup",
    ],
    [
      "Ongoing managed network operations unless separately agreed",
      "Electrical or civil works beyond network installation",
      "Equipment costs unless agreed as part of the engagement",
    ],
    "Engagement is scoped per site on enquiry: site size, coverage needs, and equipment decide the plan.",
  ),
  "logo-designing": demoService(
    "Demo scope: logo and basic brand identity design for businesses, covering logo concepts, revisions, and final file delivery.",
    [
      "Logo concept design based on the business brief",
      "Revisions within an agreed number of rounds",
      "Final logo files in standard formats for print and digital use",
    ],
    [
      "Logo concepts for review",
      "Revised logo based on feedback within the agreed rounds",
      "Final logo files and a short usage note",
    ],
    [
      "Full brand identity systems beyond the logo unless agreed",
      "Trademark registration or legal clearance",
      "Website or marketing material design unless agreed separately",
    ],
    "Engagement is scoped per business on enquiry: brief, concept count, and revision rounds decide the plan.",
  ),
  "us-it-staffing": demoService(
    "Demo scope: IT staffing support connecting organisations with technology professionals for contract and full-time roles in the United States, covering sourcing, screening, and placement coordination.",
    [
      "Sourcing candidates for technology roles",
      "Screening against the role's stated technical requirements",
      "Coordination of interviews and placement documentation",
    ],
    [
      "Candidate profiles matched to the stated role requirements",
      "Screening notes for shortlisted candidates",
      "Placement coordination through onboarding documentation",
    ],
    [
      "Any promise that a specific candidate will be placed",
      "Immigration or visa advice, which requires qualified legal counsel",
      "Employment decisions, which rest with the hiring organisation",
    ],
    "Engagement is scoped per requirement on enquiry: role, skills, and hiring timeline decide the plan.",
  ),
  "domestic-consultancy": demoService(
    "Demo scope: consultancy for organisations in India on technology staffing and capability needs, covering requirement analysis, candidate sourcing, and placement coordination.",
    [
      "Requirement analysis for technology roles",
      "Candidate sourcing and screening against stated requirements",
      "Placement coordination with hiring teams",
    ],
    [
      "Role requirement notes agreed with the hiring team",
      "Candidate profiles matched to the stated requirements",
      "Placement coordination through onboarding documentation",
    ],
    [
      "Any promise that a specific candidate will be placed",
      "Employment decisions, which rest with the hiring organisation",
      "Legal or statutory advice, which requires qualified counsel",
    ],
    "Engagement is scoped per requirement on enquiry: role, skills, and hiring timeline decide the plan.",
  ),
  "abroad-consultancy": demoService(
    "Demo scope: consultancy for individuals and organisations on overseas technology opportunities, covering role research, application preparation, and documentation guidance.",
    [
      "Research on overseas roles matching a candidate's profile",
      "Application preparation support: profiles, documentation, and interviews",
      "Guidance on documentation requirements for overseas processes",
    ],
    [
      "A role research summary for the candidate's profile",
      "Application preparation support for agreed opportunities",
      "A documentation checklist for the process",
    ],
    [
      "Any promise of a visa, job offer, or admission outcome",
      "Immigration or legal advice, which requires qualified counsel",
      "Fees charged by employers, institutions, or authorities",
    ],
    "Engagement is scoped per candidate on enquiry: profile, target roles, and destination decide the plan.",
  ),
};

// Demo tier descriptions for the pricing page. No amounts, no
// capability lists presented as available — plan concepts only, and
// the enquiry-only pricing policy is unchanged (no nav change).
export const DEMO_TIER_DESCRIPTIONS: Record<string, string> = {
  "Missed Enquiry Killer":
    "Demo description: a plan concept for capturing enquiries that might otherwise be missed. Contents and pricing are scoped per institute on enquiry.",
  "Admissions on Autopilot":
    "Demo description: a plan concept for streamlining admissions follow-up for institutes. Contents and pricing are scoped per institute on enquiry.",
  "Institute OS":
    "Demo description: a plan concept for an institute operations platform. Contents and pricing are scoped per institute on enquiry.",
};

// Demo slug sets. SOC is deliberately absent: its published body
// stays exactly as live, with no demo offer or demo wording.
export const DEMO_COURSE_SLUGS: ReadonlySet<string> = new Set([
  ...Object.keys(DEMO_COURSE_CONTENT),
  "ccnp-350-401-encor",
  "comptia-network-plus",
  "comptia-security-plus",
]);

export const DEMO_SERVICE_SLUGS: ReadonlySet<string> = new Set(
  Object.keys(DEMO_SERVICE_CONTENT),
);

export function isDemoCourseSlug(slug: string): boolean {
  return DEMO_COURSE_SLUGS.has(slug);
}

export function isDemoServiceSlug(slug: string): boolean {
  return DEMO_SERVICE_SLUGS.has(slug);
}

// Demo note for Network+ / Security+ pages: their published sections
// and area lists stay; only the curriculum status is demo-marked.
export const DEMO_CURRICULUM_NOTE: { heading: string; paragraphs: string[] } = {
  heading: "Course curriculum — demo note",
  paragraphs: [
    "Demo note: the curriculum section for this course is placeholder content awaiting official inputs from the training team. The module areas listed under \u201cWhat you will learn\u201d are the published area lists.",
    "The full lesson-level syllabus is shared by the GradeSpot team after enquiry.",
  ],
};
