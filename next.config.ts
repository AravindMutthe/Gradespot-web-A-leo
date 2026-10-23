import type { NextConfig } from "next";

// Legacy URL map: every URL from the live WordPress site's sitemap (49 URLs),
// the audit's 10 dead catalog destinations, and the /index.php/contact-us/
// alias — each with and without trailing slash and with and without the
// /index.php/ prefix. Rationale per group is documented in DECISIONS.md.
const legacyRedirects = [
  {
    "source": "/index.php/about-us-gradespot-it-solutions",
    "destination": "/about-us",
    "permanent": true
  },
  {
    "source": "/index.php/about-us-gradespot-it-solutions/",
    "destination": "/about-us",
    "permanent": true
  },
  {
    "source": "/about-us-gradespot-it-solutions",
    "destination": "/about-us",
    "permanent": true
  },
  {
    "source": "/about-us-gradespot-it-solutions/",
    "destination": "/about-us",
    "permanent": true
  },
  {
    "source": "/index.php/aws-cloud-practitioner",
    "destination": "/trainings/aws-cloud-practitioner",
    "permanent": true
  },
  {
    "source": "/index.php/aws-cloud-practitioner/",
    "destination": "/trainings/aws-cloud-practitioner",
    "permanent": true
  },
  {
    "source": "/aws-cloud-practitioner",
    "destination": "/trainings/aws-cloud-practitioner",
    "permanent": true
  },
  {
    "source": "/aws-cloud-practitioner/",
    "destination": "/trainings/aws-cloud-practitioner",
    "permanent": true
  },
  {
    "source": "/index.php/aws-devops",
    "destination": "/trainings/aws-devops-engineer",
    "permanent": true
  },
  {
    "source": "/index.php/aws-devops/",
    "destination": "/trainings/aws-devops-engineer",
    "permanent": true
  },
  {
    "source": "/aws-devops",
    "destination": "/trainings/aws-devops-engineer",
    "permanent": true
  },
  {
    "source": "/aws-devops/",
    "destination": "/trainings/aws-devops-engineer",
    "permanent": true
  },
  {
    "source": "/index.php/aws-solutions-architect-associate",
    "destination": "/trainings/aws-solutions-architect-associate",
    "permanent": true
  },
  {
    "source": "/index.php/aws-solutions-architect-associate/",
    "destination": "/trainings/aws-solutions-architect-associate",
    "permanent": true
  },
  {
    "source": "/aws-solutions-architect-associate",
    "destination": "/trainings/aws-solutions-architect-associate",
    "permanent": true
  },
  {
    "source": "/aws-solutions-architect-associate/",
    "destination": "/trainings/aws-solutions-architect-associate",
    "permanent": true
  },
  {
    "source": "/index.php/azure-administrator-training",
    "destination": "/trainings/azure-administrator-az-104",
    "permanent": true
  },
  {
    "source": "/index.php/azure-administrator-training/",
    "destination": "/trainings/azure-administrator-az-104",
    "permanent": true
  },
  {
    "source": "/azure-administrator-training",
    "destination": "/trainings/azure-administrator-az-104",
    "permanent": true
  },
  {
    "source": "/azure-administrator-training/",
    "destination": "/trainings/azure-administrator-az-104",
    "permanent": true
  },
  {
    "source": "/index.php/best-soc-analyst-training",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/best-soc-analyst-training/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/best-soc-analyst-training",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/best-soc-analyst-training/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/case-studies-version-one",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/case-studies-version-one/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/case-studies-version-one",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/case-studies-version-one/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/case-studies-version-three",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/case-studies-version-three/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/case-studies-version-three",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/case-studies-version-three/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/ccna-200-301-certification-training",
    "destination": "/trainings/ccna-200-301",
    "permanent": true
  },
  {
    "source": "/index.php/ccna-200-301-certification-training/",
    "destination": "/trainings/ccna-200-301",
    "permanent": true
  },
  {
    "source": "/ccna-200-301-certification-training",
    "destination": "/trainings/ccna-200-301",
    "permanent": true
  },
  {
    "source": "/ccna-200-301-certification-training/",
    "destination": "/trainings/ccna-200-301",
    "permanent": true
  },
  {
    "source": "/index.php/ccnp-350-401-certification-training",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/index.php/ccnp-350-401-certification-training/",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/ccnp-350-401-certification-training",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/ccnp-350-401-certification-training/",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/index.php/ccnp-training",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/index.php/ccnp-training/",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/ccnp-training",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/ccnp-training/",
    "destination": "/trainings/ccnp-350-401-encor",
    "permanent": true
  },
  {
    "source": "/index.php/cert",
    "destination": "/certificate-verification",
    "permanent": true
  },
  {
    "source": "/index.php/cert/",
    "destination": "/certificate-verification",
    "permanent": true
  },
  {
    "source": "/cert",
    "destination": "/certificate-verification",
    "permanent": true
  },
  {
    "source": "/cert/",
    "destination": "/certificate-verification",
    "permanent": true
  },
  {
    "source": "/index.php/certification-exam-support",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/index.php/certification-exam-support/",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/certification-exam-support",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/certification-exam-support/",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/index.php/comptia-network-plus-training",
    "destination": "/trainings/comptia-network-plus",
    "permanent": true
  },
  {
    "source": "/index.php/comptia-network-plus-training/",
    "destination": "/trainings/comptia-network-plus",
    "permanent": true
  },
  {
    "source": "/comptia-network-plus-training",
    "destination": "/trainings/comptia-network-plus",
    "permanent": true
  },
  {
    "source": "/comptia-network-plus-training/",
    "destination": "/trainings/comptia-network-plus",
    "permanent": true
  },
  {
    "source": "/index.php/comptia-pentest-plus-training",
    "destination": "/trainings/comptia-pentest-plus",
    "permanent": true
  },
  {
    "source": "/index.php/comptia-pentest-plus-training/",
    "destination": "/trainings/comptia-pentest-plus",
    "permanent": true
  },
  {
    "source": "/comptia-pentest-plus-training",
    "destination": "/trainings/comptia-pentest-plus",
    "permanent": true
  },
  {
    "source": "/comptia-pentest-plus-training/",
    "destination": "/trainings/comptia-pentest-plus",
    "permanent": true
  },
  {
    "source": "/index.php/comptia-security-plus-training",
    "destination": "/trainings/comptia-security-plus",
    "permanent": true
  },
  {
    "source": "/index.php/comptia-security-plus-training/",
    "destination": "/trainings/comptia-security-plus",
    "permanent": true
  },
  {
    "source": "/comptia-security-plus-training",
    "destination": "/trainings/comptia-security-plus",
    "permanent": true
  },
  {
    "source": "/comptia-security-plus-training/",
    "destination": "/trainings/comptia-security-plus",
    "permanent": true
  },
  {
    "source": "/index.php/computer-hardware-and-networking",
    "destination": "/trainings/computer-hardware-and-networking",
    "permanent": true
  },
  {
    "source": "/index.php/computer-hardware-and-networking/",
    "destination": "/trainings/computer-hardware-and-networking",
    "permanent": true
  },
  {
    "source": "/computer-hardware-and-networking",
    "destination": "/trainings/computer-hardware-and-networking",
    "permanent": true
  },
  {
    "source": "/computer-hardware-and-networking/",
    "destination": "/trainings/computer-hardware-and-networking",
    "permanent": true
  },
  {
    "source": "/index.php/contact-us",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/index.php/contact-us/",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/contact-us/",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/index.php/contact-us-gradespot-it-solutions",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/index.php/contact-us-gradespot-it-solutions/",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/contact-us-gradespot-it-solutions",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/contact-us-gradespot-it-solutions/",
    "destination": "/contact-us",
    "permanent": true
  },
  {
    "source": "/index.php/cyber-security",
    "destination": "/services/cybersecurity-services",
    "permanent": true
  },
  {
    "source": "/index.php/cyber-security/",
    "destination": "/services/cybersecurity-services",
    "permanent": true
  },
  {
    "source": "/cyber-security",
    "destination": "/services/cybersecurity-services",
    "permanent": true
  },
  {
    "source": "/cyber-security/",
    "destination": "/services/cybersecurity-services",
    "permanent": true
  },
  {
    "source": "/index.php/cyber-security-professioanl-training",
    "destination": "/trainings/cybersecurity-technologies",
    "permanent": true
  },
  {
    "source": "/index.php/cyber-security-professioanl-training/",
    "destination": "/trainings/cybersecurity-technologies",
    "permanent": true
  },
  {
    "source": "/cyber-security-professioanl-training",
    "destination": "/trainings/cybersecurity-technologies",
    "permanent": true
  },
  {
    "source": "/cyber-security-professioanl-training/",
    "destination": "/trainings/cybersecurity-technologies",
    "permanent": true
  },
  {
    "source": "/index.php/digital-marketing-training-45-days",
    "destination": "/trainings/digital-marketing",
    "permanent": true
  },
  {
    "source": "/index.php/digital-marketing-training-45-days/",
    "destination": "/trainings/digital-marketing",
    "permanent": true
  },
  {
    "source": "/digital-marketing-training-45-days",
    "destination": "/trainings/digital-marketing",
    "permanent": true
  },
  {
    "source": "/digital-marketing-training-45-days/",
    "destination": "/trainings/digital-marketing",
    "permanent": true
  },
  {
    "source": "/index.php/dummy-gradespot-it-solutions",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/dummy-gradespot-it-solutions/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/dummy-gradespot-it-solutions",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/dummy-gradespot-it-solutions/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/elementor-494",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/elementor-494/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/elementor-494",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/elementor-494/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/faq",
    "destination": "/faq",
    "permanent": true
  },
  {
    "source": "/index.php/faq/",
    "destination": "/faq",
    "permanent": true
  },
  {
    "source": "/faq/",
    "destination": "/faq",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-eight",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-eight/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-eight",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-eight/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-eleven",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-eleven/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-eleven",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-eleven/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-five",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-five/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-five",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-five/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-four",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-four/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-four",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-four/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-nine",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-nine/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-nine",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-nine/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-one",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-one/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-one",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-one/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-seven",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-seven/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-seven",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-seven/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-six",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-six/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-six",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-six/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-ten",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-ten/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-ten",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-ten/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-three",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-three/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-three",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-three/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-two",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/home-version-two/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-two",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/home-version-two/",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/index.php/it-management",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/it-management/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/it-management",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/it-management/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-azure-fundamentals",
    "destination": "/trainings/azure-fundamentals-az-900",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-azure-fundamentals/",
    "destination": "/trainings/azure-fundamentals-az-900",
    "permanent": true
  },
  {
    "source": "/microsoft-azure-fundamentals",
    "destination": "/trainings/azure-fundamentals-az-900",
    "permanent": true
  },
  {
    "source": "/microsoft-azure-fundamentals/",
    "destination": "/trainings/azure-fundamentals-az-900",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-azure-security-technologies",
    "destination": "/trainings/azure-security-engineer-az-500",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-azure-security-technologies/",
    "destination": "/trainings/azure-security-engineer-az-500",
    "permanent": true
  },
  {
    "source": "/microsoft-azure-security-technologies",
    "destination": "/trainings/azure-security-engineer-az-500",
    "permanent": true
  },
  {
    "source": "/microsoft-azure-security-technologies/",
    "destination": "/trainings/azure-security-engineer-az-500",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-azure-sentinel-training",
    "destination": "/trainings/microsoft-sentinel",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-azure-sentinel-training/",
    "destination": "/trainings/microsoft-sentinel",
    "permanent": true
  },
  {
    "source": "/microsoft-azure-sentinel-training",
    "destination": "/trainings/microsoft-sentinel",
    "permanent": true
  },
  {
    "source": "/microsoft-azure-sentinel-training/",
    "destination": "/trainings/microsoft-sentinel",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-devops-training",
    "destination": "/trainings/microsoft-devops-az-400",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-devops-training/",
    "destination": "/trainings/microsoft-devops-az-400",
    "permanent": true
  },
  {
    "source": "/microsoft-devops-training",
    "destination": "/trainings/microsoft-devops-az-400",
    "permanent": true
  },
  {
    "source": "/microsoft-devops-training/",
    "destination": "/trainings/microsoft-devops-az-400",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-security-operations-analyst",
    "destination": "/trainings/sc-200",
    "permanent": true
  },
  {
    "source": "/index.php/microsoft-security-operations-analyst/",
    "destination": "/trainings/sc-200",
    "permanent": true
  },
  {
    "source": "/microsoft-security-operations-analyst",
    "destination": "/trainings/sc-200",
    "permanent": true
  },
  {
    "source": "/microsoft-security-operations-analyst/",
    "destination": "/trainings/sc-200",
    "permanent": true
  },
  {
    "source": "/index.php/our-client-reviews",
    "destination": "/testimonials",
    "permanent": true
  },
  {
    "source": "/index.php/our-client-reviews/",
    "destination": "/testimonials",
    "permanent": true
  },
  {
    "source": "/our-client-reviews",
    "destination": "/testimonials",
    "permanent": true
  },
  {
    "source": "/our-client-reviews/",
    "destination": "/testimonials",
    "permanent": true
  },
  {
    "source": "/index.php/our-services-gradespot-it-solutions",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/our-services-gradespot-it-solutions/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/our-services-gradespot-it-solutions",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/our-services-gradespot-it-solutions/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/our-students-100-certifications",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/index.php/our-students-100-certifications/",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/our-students-100-certifications",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/our-students-100-certifications/",
    "destination": "/student-certifications",
    "permanent": true
  },
  {
    "source": "/index.php/our-trainings-gradespot-it-solutions",
    "destination": "/trainings",
    "permanent": true
  },
  {
    "source": "/index.php/our-trainings-gradespot-it-solutions/",
    "destination": "/trainings",
    "permanent": true
  },
  {
    "source": "/our-trainings-gradespot-it-solutions",
    "destination": "/trainings",
    "permanent": true
  },
  {
    "source": "/our-trainings-gradespot-it-solutions/",
    "destination": "/trainings",
    "permanent": true
  },
  {
    "source": "/index.php/practical-ethical-hacking-training",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/index.php/practical-ethical-hacking-training/",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/practical-ethical-hacking-training",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/practical-ethical-hacking-training/",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/index.php/security-operations-center-analyst-training-online",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/security-operations-center-analyst-training-online/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/security-operations-center-analyst-training-online",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/security-operations-center-analyst-training-online/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/services-version-one",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/services-version-one/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services-version-one",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services-version-one/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/services-version-three",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/services-version-three/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services-version-three",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services-version-three/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/services-version-two",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/services-version-two/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services-version-two",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services-version-two/",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/index.php/soc-analyst-training",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/soc-analyst-training/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/soc-analyst-training",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/soc-analyst-training/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/soc-analyst-training-in-india",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/soc-analyst-training-in-india/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/soc-analyst-training-in-india",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/soc-analyst-training-in-india/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/swapna-reddy",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/swapna-reddy/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/swapna-reddy",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/swapna-reddy/",
    "destination": "/trainings/soc-analyst",
    "permanent": true
  },
  {
    "source": "/index.php/team-members",
    "destination": "/team-members",
    "permanent": true
  },
  {
    "source": "/index.php/team-members/",
    "destination": "/team-members",
    "permanent": true
  },
  {
    "source": "/team-members/",
    "destination": "/team-members",
    "permanent": true
  },
  {
    "source": "/index.php/team-single",
    "destination": "/team-members/nikhil-duth-d",
    "permanent": true
  },
  {
    "source": "/index.php/team-single/",
    "destination": "/team-members/nikhil-duth-d",
    "permanent": true
  },
  {
    "source": "/team-single",
    "destination": "/team-members/nikhil-duth-d",
    "permanent": true
  },
  {
    "source": "/team-single/",
    "destination": "/team-members/nikhil-duth-d",
    "permanent": true
  },
  {
    "source": "/index.php/terms-and-conditions-gradespot-it-solutions",
    "destination": "/terms-and-conditions",
    "permanent": true
  },
  {
    "source": "/index.php/terms-and-conditions-gradespot-it-solutions/",
    "destination": "/terms-and-conditions",
    "permanent": true
  },
  {
    "source": "/terms-and-conditions-gradespot-it-solutions",
    "destination": "/terms-and-conditions",
    "permanent": true
  },
  {
    "source": "/terms-and-conditions-gradespot-it-solutions/",
    "destination": "/terms-and-conditions",
    "permanent": true
  },
  {
    "source": "/index.php/web-application-penetration-testing-gradespot-it-solutions",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/index.php/web-application-penetration-testing-gradespot-it-solutions/",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/web-application-penetration-testing-gradespot-it-solutions",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/web-application-penetration-testing-gradespot-it-solutions/",
    "destination": "/trainings/certified-ethical-hacker-ceh",
    "permanent": true
  },
  {
    "source": "/index.php/why-choose-gradespot-it-solutions",
    "destination": "/why-choose-us",
    "permanent": true
  },
  {
    "source": "/index.php/why-choose-gradespot-it-solutions/",
    "destination": "/why-choose-us",
    "permanent": true
  },
  {
    "source": "/why-choose-gradespot-it-solutions",
    "destination": "/why-choose-us",
    "permanent": true
  },
  {
    "source": "/why-choose-gradespot-it-solutions/",
    "destination": "/why-choose-us",
    "permanent": true
  }
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
