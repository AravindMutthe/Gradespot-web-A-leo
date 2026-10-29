#!/usr/bin/env python3
"""Generate public/llms-full.txt from the repo's own data files only.

Sources: src/data/courses.ts (title/category/summary/catalogOnly,
pricing + FAQ sections), src/data/course-details.ts (certification),
the courseDurations map in courses.ts, src/data/services.ts,
src/data/articles.ts, src/components/ui.tsx (siteFaqs) +
src/data/pages.ts (servicesFaqAnswers). Nothing is fetched, guessed or
filled: a fee, duration, certification or FAQ appears only where the
source data publishes it, and the file's header says so explicitly.

Usage: python3 scripts/generate-llms-full.py  (from the repo root)
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://leo-web-a.vercel.app"


def read(rel: str) -> str:
    return (ROOT / rel).read_text()


def qstrings(block: str) -> list[str]:
    return re.findall(r'"((?:[^"\\]|\\.)*)"', block)


courses_src = read("src/data/courses.ts")
details_src = read("src/data/course-details.ts")
services_src = read("src/data/services.ts")
articles_src = read("src/data/articles.ts")
ui_src = read("src/components/ui.tsx")
pages_src = read("src/data/pages.ts")

# --- course durations map -------------------------------------------------
dur_section = courses_src.split("courseDurations", 1)[1]
durations = dict(re.findall(r'"([^"]+)": "([^"]+)"', dur_section))

# --- course-details certifications ---------------------------------------
details = {}
for m in re.finditer(r'"([^"]+)": \{\s*short:.*?certification: "([^"]+)"', details_src, re.S):
    details[m.group(1)] = m.group(2)

# --- courses: slice per "slug" occurrence ---------------------------------
slug_hits = list(re.finditer(r'"slug": "([^"]+)"', courses_src))
courses = []
for i, hit in enumerate(slug_hits):
    start, end = hit.start(), slug_hits[i + 1].start() if i + 1 < len(slug_hits) else len(courses_src)
    block = courses_src[start:end]
    slug = hit.group(1)
    title = re.search(r'"title": "([^"]+)"', block).group(1)
    cat = re.search(r'"category": "([^"]+)"', block).group(1)
    summary = re.search(r'"summary": "([^"]*)"', block).group(1)
    catalog = re.search(r'"catalogOnly": (true|false)', block).group(1) == "true"
    fees = re.findall(r'"([^"—]+) — ₹([\d,]+)"', block)
    faqs = []
    for fm in re.finditer(r'"paragraphs": \[(.*?)\][^}]*?"style": "faq"', block, re.S):
        paras = qstrings(fm.group(1))
        for j in range(0, len(paras) - 1, 2):
            faqs.append((paras[j], paras[j + 1]))
    courses.append(dict(slug=slug, title=title, category=cat, summary=summary,
                         catalog=catalog, fees=fees, faqs=faqs))

# --- services ---------------------------------------------------------------
services = []
for m in re.finditer(
        r'slug: "([^"]+)",\s*title: "([^"]+)",(?:\s*//[^\n]*\n)*\s*summary:\s*"([^"]*)"',
        services_src, re.S):
    services.append(m.groups())

# --- articles ---------------------------------------------------------------
articles = []
for m in re.finditer(
        r'slug: "([^"]+)",\s*title: "([^"]+)",\s*excerpt:\s*"([^"]*)",\s*date: "([^"]+)"',
        articles_src, re.S):
    articles.append(m.groups())

# --- site FAQs (literal answers + servicesFaqAnswers references) ------------
answers = dict(re.findall(r'"(\w+)": "([^"]*)"', pages_src.split("servicesFaqAnswers", 1)[1]))
faqs_site = []
faq_block = ui_src.split("export const siteFaqs", 1)[1].split("];", 1)[0]
for m in re.finditer(r'q: "([^"]+)",\s*a: (servicesFaqAnswers\.(\w+)|"([^"]*)")', faq_block):
    q = m.group(1)
    a = answers[m.group(3)] if m.group(3) else m.group(4)
    faqs_site.append((q, a))

out: list[str] = []
out.append("# GradeSpot IT Solutions — full catalogue")
out.append("")
out.append("> Full course details, fees, durations and FAQs for AI assistants")
out.append("> and search engines. Built ONLY from data published on this site")
out.append("> (see the repo's src/data/*). Where a fee, duration, certification")
out.append("> or schedule is absent below, it is NOT published on the site —")
out.append("> batches and unpublished fees are confirmed on enquiry, and nothing")
out.append("> here has been guessed to fill a gap.")
out.append("")
out.append("## Contact")
out.append("")
out.append("- Address: 16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060")
out.append("- Phone: +91 91826 54056")
out.append("- Email: info@gsitssolutions.com")
out.append("- Office Hours: 8:00 AM - 9:00 PM (days are not published on the site)")
out.append("- Modes: online and offline classes")
out.append("- Free demo class: available; register on the site and the team confirms timing by phone")
out.append("- Placement: no placement guarantee is published; the site publishes job roles per training and companies students work with")
out.append("")
out.append(f"## Trainings ({len(courses)} courses)")
out.append("")
for c in courses:
    out.append(f"### {c['title']}")
    out.append("")
    out.append(f"- URL: {BASE}/trainings/{c['slug']}")
    out.append(f"- Category: {c['category']}")
    if c['slug'] in durations:
        out.append(f"- Duration: {durations[c['slug']]}")
    if c['slug'] in details:
        out.append(f"- Certification: {details[c['slug']]}")
    for plan, price in c['fees']:
        out.append(f"- Fee — {plan.strip()}: ₹{price}")
    if c['catalog']:
        out.append("- Note: catalogue course — listed in the trainings catalogue without a published detail page; no curriculum, fee or duration is published for it")
    out.append(f"- Summary: {c['summary']}")
    out.append("")
out.append("## Services")
out.append("")
for slug, title, summary in services:
    out.append(f"- [{title}]({BASE}/services/{slug}): {summary}")
out.append("")
out.append("## Learning articles")
out.append("")
for slug, title, excerpt, date in articles:
    out.append(f"- [{title}]({BASE}/blog/{slug}) (authored {date}): {excerpt}")
out.append("")
out.append("## Frequently asked questions (site-wide)")
out.append("")
for q, a in faqs_site:
    out.append(f"### {q}")
    out.append("")
    out.append(a)
    out.append("")
out.append("## Frequently asked questions (per course, as published on course pages)")
out.append("")
for c in courses:
    for q, a in c['faqs']:
        out.append(f"### {c['title']} — {q}")
        out.append("")
        out.append(a)
        out.append("")

dest = ROOT / "public" / "llms-full.txt"
dest.write_text("\n".join(out))
print(f"courses={len(courses)} priced={sum(1 for c in courses if c['fees'])} "
      f"with_duration={sum(1 for c in courses if c['slug'] in durations)} "
      f"with_cert={sum(1 for c in courses if c['slug'] in details)} "
      f"services={len(services)} articles={len(articles)} "
      f"site_faqs={len(faqs_site)} course_faqs={sum(len(c['faqs']) for c in courses)}")
print(f"wrote {dest} ({dest.stat().st_size // 1024} KiB)")
