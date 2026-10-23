// Employer logos shown in the live site's "Our Students works with" wall
// (crawl 2026-10-23). Dark variants, downloaded locally. Two further logos
// on the live wall could not be identified ("Company112", "client logo 33")
// and are deliberately not reproduced. See DECISIONS.md §12.

export interface Employer {
  name: string;
  logo: string;
}

export const employers: Employer[] = [
  { name: "XCube Labs", logo: "/images/employers/XCubeLabs-logo-Black.png" },
  { name: "Cloud4C", logo: "/images/employers/Cloud4C-Logo.png" },
  { name: "Persistent Systems", logo: "/images/employers/Persistent-systems-logo.png" },
  { name: "Diligient", logo: "/images/employers/Diligient-Logo.png" },
  { name: "Wipro", logo: "/images/employers/Wipro-Logo.png" },
  { name: "Astreya", logo: "/images/employers/astreya-logo.png" },
  { name: "Tericsoft", logo: "/images/employers/Tericsoft-logo.png" },
  { name: "EY", logo: "/images/employers/EY.png" },
  { name: "Movate", logo: "/images/employers/Movate-Logo.png" },
  { name: "PurpleTalk", logo: "/images/employers/PurpleTalk.png" },
];
