#!/usr/bin/env python3
"""Generate per-page 1200x630 OG cards locally into public/images/og/.

Replaces the shared ceh.jpg fallback for the 36 pages that have no
content image of their own (DECISIONS.md §25.24) plus the homepage
(whose hero is the CEH photo). Pages with real content images keep
them — this script never touches a course/LP/team/map/cert image.

Titles are copied verbatim from the page's own metadata export
(src/app/*/page.tsx, src/lib/metadata.ts callers) or, for services /
articles / comparisons, from src/data/*.ts. Brand line, place line and
phone are the site's published facts (src/data/site.ts). No external
image service, no hotlinking: fonts are system DejaVu, output is a
local JPEG committed to the repo. Re-run any time a fallback page's
title changes; the script overwrites deterministically.

Usage: python3 scripts/generate-og-cards.py  (from the repo root)
"""
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "og"

BRAND = "GRADESPOT IT SOLUTIONS"
FOOTER = "Dilsukhnagar, Hyderabad  ·  +91 91826 54056"
PAPER = (250, 247, 239)   # warm paper, Leo "Prospectus" palette
INK = (27, 47, 75)        # navy #1B2F4B
GOLD = (138, 109, 27)     # deep gold #8a6d1b
MUTED = (90, 84, 74)

SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

# (output path relative to public/images/og/, card title)
CARDS = [
    # Homepage (its hero is the CEH photo; the card is brand, not a course)
    ("home.jpg", "IT Training Institute in Hyderabad, Dilsukhnagar"),
    # 17 static fallback pages (§25.24)
    ("about-us.jpg", "About Us"),
    ("accessibility.jpg", "Accessibility"),
    ("blog.jpg", "Learning Articles"),
    ("career-support.jpg", "Career Support"),
    ("certificate-verification.jpg", "Certificate Verification"),
    ("compare.jpg", "Course Comparisons"),
    ("faq.jpg", "Help & FAQs"),
    ("for-colleges.jpg", "For Colleges"),
    ("for-institutes.jpg", "For Institutes"),
    ("partner-with-us.jpg", "Partner With Us"),
    ("pricing.jpg", "Pricing"),
    ("register.jpg", "Register"),
    ("resources.jpg", "Resources"),
    ("services.jpg", "Services"),
    ("terms-and-conditions.jpg", "Terms and Conditions"),
    ("testimonials.jpg", "Testimonials"),
    ("why-choose-us.jpg", "Why Choose Us"),
    # Trainings index
    ("trainings.jpg", "IT Trainings in Hyderabad"),
    # 12 service detail pages
    ("services/corporate-trainings.jpg", "Corporate Trainings"),
    ("services/internships.jpg", "Internships"),
    ("services/industrial-trainings.jpg", "Industrial Trainings"),
    ("services/college-workshops.jpg", "College Workshops"),
    ("services/cybersecurity-services.jpg", "Cybersecurity Services"),
    ("services/web-development.jpg", "Web Development"),
    ("services/digital-marketing-solutions.jpg", "Digital Marketing Solutions"),
    ("services/network-infrastructure-building.jpg", "Network Infrastructure Building"),
    ("services/logo-designing.jpg", "Logo Designing"),
    ("services/us-it-staffing.jpg", "US IT Staffing"),
    ("services/domestic-consultancy.jpg", "Domestic Consultancy"),
    ("services/abroad-consultancy.jpg", "Abroad Consultancy"),
    # 3 blog articles
    ("blog/how-to-start-a-cybersecurity-career.jpg", "How to Start a Cybersecurity Career"),
    ("blog/ceh-vs-security-plus-which-first.jpg", "CEH vs Security+: Which Certification Should You Do First?"),
    ("blog/what-does-a-soc-analyst-do.jpg", "What Does a SOC Analyst Actually Do?"),
    # 3 comparison pairs
    ("compare/ceh-vs-security-plus.jpg", "CEH vs Security+: Which Cybersecurity Certification First?"),
    ("compare/ccna-vs-network-plus.jpg", "CCNA vs Network+: Cisco Depth or Vendor-Neutral Breadth?"),
    ("compare/soc-analyst-vs-ceh.jpg", "SOC Analyst vs CEH: Defence or Offence?"),
    ("compare/ceh-vs-comptia-pentest-plus.jpg", "CEH vs PenTest+: Ethical Hacking or Penetration Testing?"),
]


def title_size(title: str) -> int:
    if len(title) <= 28:
        return 66
    if len(title) <= 55:
        return 56
    if len(title) <= 80:
        return 46
    return 40


def draw_card(title: str, path: Path) -> None:
    img = Image.new("RGB", (1200, 630), PAPER)
    d = ImageDraw.Draw(img)
    # Gold top rule + thin ink frame accent (brand palette only).
    d.rectangle([0, 0, 1200, 10], fill=GOLD)
    d.rectangle([0, 620, 1200, 630], fill=INK)
    brand_font = ImageFont.truetype(SANS_BOLD, 30)
    d.text((80, 72), BRAND, font=brand_font, fill=GOLD)
    d.line([80, 128, 320, 128], fill=GOLD, width=4)
    size = title_size(title)
    font = ImageFont.truetype(SERIF_BOLD, size)
    # Wrap to the card width (max ~1040 px of text).
    lines, cur = [], ""
    for word in title.split():
        trial = f"{cur} {word}".strip()
        if d.textlength(trial, font=font) <= 1040:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    y = 190
    for line in lines[:4]:
        d.text((80, y), line, font=font, fill=INK)
        y += size + 18
    footer_font = ImageFont.truetype(SANS, 26)
    d.text((80, 520), FOOTER, font=footer_font, fill=MUTED)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=85)


def main() -> None:
    total = 0
    for rel, title in CARDS:
        path = OUT / rel
        draw_card(title, path)
        im = Image.open(path)
        assert im.size == (1200, 630), f"{rel}: {im.size}"
        print(f"{rel}  {path.stat().st_size // 1024} KiB")
        total += path.stat().st_size
    print(f"{len(CARDS)} cards, {total // 1024} KiB total")


if __name__ == "__main__":
    main()
