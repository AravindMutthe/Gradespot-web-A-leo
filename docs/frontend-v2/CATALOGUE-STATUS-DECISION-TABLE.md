# Catalogue Status Decision Table — 25 catalog-only courses

**Status:** DESIGN ONLY, DECISION TABLE ONLY. This file invents no status,
no price, no duration, and no syllabus. It is the companion to
`CATALOGUE-CONTRACT-V1.md` v1.0.1 §3.3 (amendment A4, Das B1 refinement 4).

**Why this table exists:** a missing syllabus is NOT evidence of a
program's status. In v1.0.0 these 25 courses were proposed as
`Planned` by default. That proposal is withdrawn. Under v1.0.1, every
catalog-only course starts at `program_status = null` (PENDING) in the
draft migration 0006, and receives a status ONLY when GradeSpot fills
its row below AND the contract §6.0 two-approval gate (database-change
approval + content approval, verified restorable backup, verified
rollback) passes. A blank row is not approval, not a default, and not
a promise — it is an open decision. Until a row is filled, that course
renders no enrollment CTA and at most "status to be confirmed"
(contract §1b).

**How to fill it (GradeSpot only):** for each slug, write exactly one
of `Available` / `Planned` / `Waitlist` / `Not Offered` in the
"GradeSpot decision" column, plus the date and the deciding role in
"Decided by / date" if known. Meanings (contract §1b): `Available` =
enquiries open for this program (not "a batch is running this week",
not "a seat is guaranteed"); `Planned` = listed, not yet open (not a
launch-date promise); `Waitlist` = enquiries join a waitlist, nothing
is sold; `Not Offered` = listed for reference only, no enrollment CTA
(a contact enquiry is still allowed). Do NOT fill a row from a guess,
from a missing syllabus, or from another course's status. Leave a row
blank rather than guess — a blank row keeps the course safely pending.

**Slugs and titles below are copied verbatim from the repo catalogue
(`src/data/courses.ts`, `catalogOnly: true` entries) — 25 rows, counted
and checked against the repo. No row has been added, removed, or
renamed. Titles are catalogue titles, not status claims.**

| # | Slug | Catalogue title | Category | GradeSpot decision (Available / Planned / Waitlist / Not Offered) | Notes / decided by / date |
|---|---|---|---|---|---|
| 1 | azure-security-engineer-az-500 | Microsoft Certified: Azure Security Engineer Associate \| AZ-500 | Microsoft Azure | | |
| 2 | microsoft-devops-az-400 | Designing and Implementing Microsoft DevOps Solutions \| AZ-400 | Microsoft Azure | | |
| 3 | sc-900 | Security, Compliance, and Identity Fundamentals \| SC-900 | Microsoft Azure | | |
| 4 | sc-200 | Microsoft Certified: Security Operations Analyst Associate \| SC-200 | Microsoft Azure | | |
| 5 | microsoft-sentinel | Microsoft Sentinel Training | Microsoft Azure | | |
| 6 | aws-cloud-practitioner | AWS Certified Cloud Practitioner \| AWS CLF-C02 | AWS | | |
| 7 | aws-solutions-architect-associate | AWS Certified Solutions Architect – Associate \| AWS SAA-C03 | AWS | | |
| 8 | aws-devops-engineer | AWS Certified DevOps Engineer - Professional \| AWS DOP-C02 | AWS | | |
| 9 | comptia-a-plus-core-1 | CompTIA A+ Core 1: 220-1101 | CompTIA | | |
| 10 | comptia-a-plus-core-2 | CompTIA A+ Core 2: 220-1102 | CompTIA | | |
| 11 | cybersecurity-technologies | Program in Cybersecurity Technologies | Cybersecurity | | |
| 12 | vapt | Vulnerability Assessment & Penetration Testing [VA PT] | Cybersecurity | | |
| 13 | core-java | Core Java | Programming & Data | | |
| 14 | java-full-stack | Java Full Stack | Programming & Data | | |
| 15 | power-bi | Power BI | Programming & Data | | |
| 16 | mysql | MySQL | Programming & Data | | |
| 17 | data-analytics | Data Analytics | Programming & Data | | |
| 18 | data-science | Data Science | Programming & Data | | |
| 19 | certified-professional-coder-cpc | Certified Professional Coder - CPC | Medical Coding | | |
| 20 | hcc-medical-coding | Hierarchical condition category - HCC | Medical Coding | | |
| 21 | ip-drg-medical-coding | Inpatient Diagnosis-Related Group - IP-DRG | Medical Coding | | |
| 22 | em-medical-coding | E&M (Evaluation and Management) | Medical Coding | | |
| 23 | radiology-medical-coding | Radiology - Medical Coding | Medical Coding | | |
| 24 | anesthesia-medical-coding | Anesthesia - Medical Coding | Medical Coding | | |
| 25 | autocad | AutoCAD | Design & CAD | | |

**Completion rule:** this table is complete only when all 25 rows are
filled OR GradeSpot has explicitly recorded, per blank row, that the
course stays pending for now. A partially filled table is a partially
approved backfill: filled rows may proceed under §6.0; blank rows stay
`null` (PENDING) and must not be backfilled with any status.
