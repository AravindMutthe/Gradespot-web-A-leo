// Leadership exactly as published on the live Team Members page
// (crawl 2026-10-23). The live page shows Prudhvi Sai Gariga's card four
// times — deduplicated here. Name spellings are as published; see
// DECISIONS.md.

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  email?: string;
  profileHref?: string;
}

export const team: TeamMember[] = [
  {
    name: "Nikhil Duth D",
    role: "Founder & MD",
    image: "/images/team/nikhil-duth-d.jpg",
    email: "nikhil@gsitssolutions.com",
    profileHref: "/team-members/nikhil-duth-d",
  },
  {
    name: "Aravindh Mutthe",
    role: "Co-Founder",
    image: "/images/team/aravind-mutthe.jpg",
  },
  {
    name: "Prudhvi Sai Gariga",
    role: "Sr. Security Engineer & Technical Trainer",
    image: "/images/team/prudhvi-sai-gariga.jpg",
  },
];
