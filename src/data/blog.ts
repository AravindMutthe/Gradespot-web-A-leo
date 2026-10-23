// Blog article cards shown on the live Trainings page and on the CCNA,
// CCNP, SOC and CEH course pages (crawl 2026-10-23). Articles live on the
// external blog (digidefense.in); images are downloaded locally.

export interface BlogPost {
  title: string;
  image: string;
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    title:
      "Two-Factor authentication (2FA): why you should enable it now – A Comprehensive Overview",
    image: "/images/blog/2FA.jpg",
    url: "https://digidefense.in",
  },
  {
    title: "Information Warfare: A Comprehensive Overview",
    image: "/images/blog/Information_warfare.jpg",
    url: "https://digidefense.in/information-warfare-a-comprehensive-overview/",
  },
  {
    title: "Golden Ticket Attack: A Comprehensive Guide to Understand this Attack",
    image: "/images/blog/Golden-Ticket-Attack.jpg",
    url: "https://digidefense.in/golden-ticket-attack-a-comprehensive-guide/",
  },
];
