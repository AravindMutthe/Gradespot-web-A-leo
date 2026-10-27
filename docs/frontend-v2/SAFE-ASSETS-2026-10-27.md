# GradeSpot Leo — Safe Assets Inventory (2026-10-27)

Branch: `feat/frontend-v2-platform`. This pass (owner direction
2026-10-27 ~23:27 IST, "use any suitable, secure logos, images", plus
the 23:28 IST artworks/illustrations addition) uses ONLY assets with a
lawful, non-endorsing basis. "Secure" here means: GradeSpot-owned,
already in the repo with a lawful basis, generic, or Das-generated for
GradeSpot — never a vendor logo, employer logo, government/official
emblem, or third-party logo used as an endorsement, and never an
AI-generated vendor/official logo.

## 1. Used in this pass

### OWN — GradeSpot's own marks (unchanged, never edited/recoloured/cropped)
| Asset | File | Use |
|---|---|---|
| GradeSpot logo | `public/images/logo.png` | Header, footer, LP pages (as before) |
| GradeSpot logo (light) | `public/images/logo-light.png` | Dark surfaces (as before) |

### REPO — existing site assets, used as-is, no new claim about them
| Asset class | Files | Use in this pass |
|---|---|---|
| Course photos | `public/images/courses/*.jpg` (36, one per course) | Course cards, 16:9, no sepia (R2R3 treatment kept) |
| OG images | `public/images/og/*.jpg` | Page/OG images (as before) |
| Map | `public/images/map-dilsukhnagar.jpg` | Contact / Dilsukhnagar pages (as before) |
| Blog images | `public/images/blog/*.jpg` | Blog cards (as before) |
| Certification images | `public/images/certifications/cert-*.jpg` (30) | Student-certifications gallery (as before). No new claim is made about what any certificate proves; they are existing site assets, not new evidence added by this pass. |
| Fonts | `public/fonts/*.woff2` (Fraunces, Instrument Sans, IBM Plex Mono) | Self-hosted only; no Google Fonts, no font CDN |

### GENERIC — new in this pass, local code only (no file asset, no download)
| Asset | Source | Where |
|---|---|---|
| Category icons (10) | `src/components/Artwork.tsx` — `categoryIcon()` | Course-card category chips + no-photo fallback cards. Map: AWS 🖥️, Cisco 🔌, CompTIA 🧰, Cybersecurity 🛡️, Design & CAD 📐, Digital Marketing 📣, Medical Coding 🏥, Microsoft Azure ☁️, Networking 🌐, Programming & Data 💻; fallback 📚. These are generic Unicode symbols, NOT vendor marks — the Azure/AWS/Cisco/CompTIA names stay as text only. |
| Service icons (12) | `Artwork.tsx` — `serviceIcon()` | Service cards. Map: Corporate Trainings 🎓, Internships 📚, Industrial Trainings 🏭, College Workshops 🏫, Cybersecurity Services 🛡️, Web Development 🌐, Digital Marketing Solutions 📣, Network Infrastructure Building 🔌, Logo Designing 🎨, US IT Staffing 👥, Domestic Consultancy 🤝, Abroad Consultancy ✈️; fallback 💼. |
| Division icons (7) | `Artwork.tsx` — `divisionIcon()` | Services division rows. Map: web-software 🌐, education 🎓, cloud-managed ☁️, ai-automation 🤖, cybersecurity 🛡️, digital-learning-saas 💻, partnerships 🤝; fallback 💼. |
| Hero-block icons (4) | `Artwork.tsx` — `heroBlockIcon()` | Home hero blocks (replaces the bare initial letter). Map: Cybersecurity Academy 🛡️, Cloud & Infrastructure ☁️, Career Pathways 🎓, Enterprise Solutions 🏢. |
| Showcase icons (4) | `Artwork.tsx` — `showcaseIcon()` | Trainings showcase cards. Map: IT Consultancy 🤝, Cyber Security 🛡️, Cloud Computing ☁️, Backup & Recovery 💾. |
| Artwork motif | `Artwork.tsx` — `ArtworkMotif()` (inline SVG: network nodes/lines, rings, or dots) | Home hero-block tiles, over the design-led gradient. Abstract shapes only, in white at low opacity, `aria-hidden`. No text, no price, no date, no statistic, no rating, no logo, no person likeness inside the artwork. An illustration of a network is decoration, not a claim GradeSpot runs that network. |

Icon rules (all marks above): decorative only — every icon span carries
`aria-hidden` and never carries meaning alone; the text label next to
it is the content. No new dependency (no Lucide — it is not in
`package.json` — and no remote icon font was added). No icon file was
downloaded; the SVG lives in repo code and is referenced locally.

## 2. Image-placement audit (this pass, in-repo assets only)
- Home category/hero blocks: design-led treatment kept (R2R3) — no
  reused course photo. Now with a category icon + network motif
  instead of a bare initial letter.
- Course cards: unique course photo kept, 16:9, no sepia. Cards
  without a photo keep the design-led surface, now with the category
  icon + category text.
- Services division rows: icon treatment added; no course photo
  reused on a services row.
- Services cards: icon added; no photo, no logo.
- Trainings showcase: design-led treatment kept (R2R3) — no reused
  course/blog photo. Now with a showcase icon per card.
- Hero: current treatment kept. The Das hero is PENDING (see §3) and
  was NOT substituted with a stock photo.

## 3. Pending — Das (NOT in the repo, NOT used in this pass)
| Set | Status |
|---|---|
| 13 Das images (1 hero, 7 category, 4 services, 1 corporate), 1280×720 WebP + ZIP | Claimed delivered in the ChatGPT thread; item 1 hero inline preview was a third-party stock card, so item 1 is held and a genuine-crop replacement was requested (owner decision 2026-10-27 ~23:04 IST). Items 2–13 held for file review. NO file has reached Muse yet: the owner must forward the ZIP + replacement file before any of these can be inspected, let alone placed. Slots are reserved by the design-led treatments above; no ChatGPT file URL is linked anywhere. |
| Item-1 replacement (`01_homepage_hero — REPLACEMENT`) | Requested from Das; reply pending at the time of this pass. Same hold: no use before owner-forwarded file + Muse inspection. |
| PENDING-DAS illustration set (new, from the 23:28 IST addition) | Generic business/finance/economic-network and IT/network diagrams and illustrations, to be requested from Das ONLY after the item-1 replacement resolves (no stacked posts on one thread). Rules when requested: generic scenes/diagrams only; no vendor/official logo drawn or generated, no real person likeness, no readable text/price/date/statistic/rating inside artwork, no employer/government logo, no claim created by the artwork. NOT requested yet; NOT used yet. |

## 4. Excluded — deliberately NOT used, with reasons
| Asset | Reason it stays out |
|---|---|
| All 10 employer logos (`public/images/employers/*`: Cloud4C, Diligent, EY, Movate, Persistent, PurpleTalk, Tericsoft, Wipro, XCubeLabs, Astreya) | The employer wall stays OFF. Its claim (students employed by these companies) has no per-student placement evidence in the repo. A logo on the wall would publish that claim. Each logo needs, per logo: organisation name, exact relationship, and permission/evidence — none supplied. |
| All vendor marks (Microsoft, AWS, Cisco, CompTIA, etc.) | None in the repo, none added. Course titles name vendors in TEXT only (identification, not endorsement). A vendor mark would read as partnership/authorisation, which GradeSpot has not shown it holds. Das must never generate a vendor logo — a generated logo would be a fake mark. |
| ISO + AICTE emblem files (`public/images/iso-logo.svg`, `public/images/aicte-logo.png`) | Left exactly as-is: no new claim added, no new placement, no recolour/crop. Proof for those credentials was not found, so this pass adds nothing around them. |
| Any AI-generated official/vendor logo | Forbidden by the secure-only rule (see §1 header). |
| Any hotlinked / CDN / ChatGPT-linked asset | Forbidden by the local-only rule (see §5). No remote asset reference was introduced by this pass. |

## 5. Local-only verification (this pass)
- Fonts self-hosted; no `fonts.googleapis`, `unpkg`, `jsdelivr`.
- No `src="http…"` image, no hotlinked image/script/stylesheet.
- New icons/SVG live in repo code (`src/components/Artwork.tsx`) and
  are referenced locally. Das files, when forwarded, will land in
  `public/` in the repo and be referenced locally — never linked to a
  ChatGPT file URL or a third-party host.
- Remote URLs remaining in code are outbound links/metadata only
  (blog, Maps link, schema sameAs, preview-only `vercel.live` CSP),
  unchanged by this pass.

## 6. What this pass does NOT do
- No content invention: no price, statistic, syllabus, status, rating,
  placement, batch, or trainer claim added.
- No URL renamed, deleted, or added (URL preservation: 54 unique
  destinations before and after — see the pass report).
- No employer wall turned ON; no ISO/AICTE claim added or changed;
  no vendor logo added; no logo file edited.
- No Das file used (none in repo); no Das contact made by this pass;
  no Supabase write; no lead POST; no SSO change; no production
  change.
