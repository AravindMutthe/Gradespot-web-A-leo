#!/usr/bin/env python3
"""Print a lastmod map for src/app/sitemap.ts, from real git history only.

Method (documented in DECISIONS.md §25.33):
- Static route: last commit touching that route's page.tsx
  (git log -1 --format=%cs -- <file>).
- Course / service / comparison / article route: last commit changing
  the count of that route's slug string in its data file
  (git log -1 --format=%cs -S <slug> -- <data file>). The slug also
  appears in the course's image path, so the date is the last touch of
  the entry OR its image reference — still a real touch of that
  route's source, never a fabricated date.
- LP route (/lp/<course>-in-hyderabad): its course's date, because the
  LP renders that course's data.
Routes with no git history for their source get NO entry (no lastmod),
rather than an invented date. Re-run and paste the output into
sitemap.ts when routes change.
Usage: python3 scripts/sitemap-lastmod.py  (from the repo root)
"""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def git_date(args: list[str]) -> str | None:
    out = subprocess.run(["git", "-C", str(ROOT), "log", "-1", "--format=%cs"] + args,
                         capture_output=True, text=True).stdout.strip()
    return out or None


def slugs(data_file: str, key_pat: str) -> list[str]:
    src = (ROOT / data_file).read_text()
    return re.findall(key_pat, src)


STATIC = {
    "": "src/app/page.tsx",
    "/about-us": "src/app/about-us/page.tsx",
    "/trainings": "src/app/trainings/page.tsx",
    "/services": "src/app/services/page.tsx",
    "/resources": "src/app/resources/page.tsx",
    "/team-members": "src/app/team-members/page.tsx",
    "/team-members/nikhil-duth-d": "src/app/team-members/nikhil-duth-d/page.tsx",
    "/why-choose-us": "src/app/why-choose-us/page.tsx",
    "/testimonials": "src/app/testimonials/page.tsx",
    "/student-certifications": "src/app/student-certifications/page.tsx",
    "/certificate-verification": "src/app/certificate-verification/page.tsx",
    "/pricing": "src/app/pricing/page.tsx",
    "/for-institutes": "src/app/for-institutes/page.tsx",
    "/for-colleges": "src/app/for-colleges/page.tsx",
    "/career-support": "src/app/career-support/page.tsx",
    "/compare": "src/app/compare/page.tsx",
    "/blog": "src/app/blog/page.tsx",
    "/training-institute-in-dilsukhnagar-hyderabad":
        "src/app/training-institute-in-dilsukhnagar-hyderabad/page.tsx",
    "/contact-us": "src/app/contact-us/page.tsx",
    "/faq": "src/app/faq/page.tsx",
    "/terms-and-conditions": "src/app/terms-and-conditions/page.tsx",
    "/register": "src/app/register/page.tsx",
    "/accessibility": "src/app/accessibility/page.tsx",
    "/partner-with-us": "src/app/partner-with-us/page.tsx",
}

result: dict[str, str] = {}
for path, f in STATIC.items():
    d = git_date(["--", f])
    if d:
        result[path or "/"] = d

course_slugs = slugs("src/data/courses.ts", r'"slug": "([^"]+)"')
course_dates: dict[str, str] = {}
for s in course_slugs:
    d = git_date(["-S", s, "--", "src/data/courses.ts"])
    if d:
        course_dates[s] = d
        result[f"/trainings/{s}"] = d
catalog_only = set()
src = (ROOT / "src/data/courses.ts").read_text()
for m in re.finditer(r'"slug": "([^"]+)".*?"catalogOnly": (true|false)', src, re.S):
    if m.group(2) == "true":
        catalog_only.add(m.group(1))
for s in course_slugs:
    if s not in catalog_only and s in course_dates:
        result[f"/lp/{s}-in-hyderabad"] = course_dates[s]
for s in slugs("src/data/services.ts", r'slug: "([^"]+)"'):
    d = git_date(["-S", s, "--", "src/data/services.ts"])
    if d:
        result[f"/services/{s}"] = d
for s in slugs("src/data/comparisons.ts", r'slug: "([^"]+)"'):
    d = git_date(["-S", s, "--", "src/data/comparisons.ts"])
    if d:
        result[f"/compare/{s}"] = d
for s in slugs("src/data/articles.ts", r'slug: "([^"]+)"'):
    d = git_date(["-S", s, "--", "src/data/articles.ts"])
    if d:
        result[f"/blog/{s}"] = d

print(f"// {len(result)} routes with a real git lastmod date")
for k in sorted(result):
    print(f'  "{k}": "{result[k]}",')
