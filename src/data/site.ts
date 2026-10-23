// Business facts exactly as published on the live gsitssolutions.com
// (crawl 2026-10-23). Conflicts between pages are logged in DECISIONS.md.
// Phone + learner-count conflicts were resolved by Aravind on 2026-10-23:
// ONE phone number sitewide, and 1250 Certified Learners.

export const business = {
  name: "GradeSpot IT Solutions",
  legalName: "GradeSpot IT Solutions Pvt. Ltd.",
  locationLabel: "Dilsukhnagar, Hyderabad",
  address:
    "16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060",
  // The single number used everywhere (Aravind, 2026-10-23: "use only any
  // one phn number"). +91 91826 54056 was the most widely published of the
  // three numbers on the live site (header/footer, FAQ, most Call Us
  // blocks). The other two (+91 88866 60597, +91 76600 43217) are retired
  // from the rebuild unless he says otherwise.
  phones: ["+91 91826 54056"],
  extraPhones: [] as string[],
  emails: ["info@gsitssolutions.com", "hr@gsitssolutions.com"],
  officeHours: "8:00 AM – 9:00 PM",
  digitalUrl: "https://digital.gsitssolutions.com",
  blogUrl: "https://digidefense.in",
};

export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^+\d]/g, "");
}

// Counters as published on the live site. "Certified Learners" was
// published as both 1200 and 1500; Aravind set it to 1250 on 2026-10-23.
export const stats = [
  { value: "1,500+", label: "Happy Learners" },
  { value: "1250", label: "Certified Learners" },
  { value: "1500", label: "Students Enrolled" },
  { value: "250", label: "Interns" },
  { value: "12", label: "Web Projects" },
];
