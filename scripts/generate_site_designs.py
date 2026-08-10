#!/usr/bin/env python3
"""Create public design pages from meaning-only prototypes.

The source prototypes are never changed. The generated pages receive the shared
lemonmedia visual layer and only link to other approved design routes.
"""

from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

import yaml


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "content" / "site-design-index.yml"

CORE_PAGES = [
    "pricing.html",
    "process.html",
    "compare.html",
    "reviews.html",
    "guarantee.html",
    "faq.html",
    "start.html",
    "audit.html",
    "services.html",
    "partners.html",
    "about.html",
    "articles.html",
    "legal.html",
    "404.html",
]

ARTICLE_PAGES = [
    "article-content-plan.html",
    "article-content-without-photos.html",
    "article-five-platforms.html",
    "article-how-it-works.html",
    "article-how-many-posts.html",
    "article-people-and-ai.html",
    "article-post-or-carousel.html",
    "article-text-before-design.html",
    "article-ways-to-create-content.html",
    "article-what-content-can-do.html",
    "article-what-is-included.html",
]

SPECIAL_OUTPUTS = {
    "article-text-before-design.html": "article-text-before-design-study.html",
}

THEMES = {
    "pricing.html": "purple-soft",
    "process.html": "lemon-soft",
    "compare.html": "dark",
    "reviews.html": "lavender",
    "guarantee.html": "dark",
    "faq.html": "cool",
    "start.html": "brand-dark",
    "audit.html": "lemon-soft",
    "services.html": "purple-soft",
    "partners.html": "dark",
    "about.html": "dark",
    "articles.html": "lavender",
    "legal.html": "cool",
    "404.html": "dark",
}

FONT_LINKS = """  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/design/tokens.css">
  <link rel="stylesheet" href="assets/design/site-page-template.css?v=1">"""

FOOTER_TEXT = "Регулярный контент под ключ для малого и среднего бизнеса."


def output_name(source: str) -> str:
    return SPECIAL_OUTPUTS.get(source, source.removesuffix(".html") + "-design.html")


def page_class(source: str) -> str:
    slug = source.removesuffix(".html").replace("_", "-")
    return f"lm-site-page lm-page-{slug}"


def read_case_mapping() -> dict[str, str]:
    path = ROOT / "content" / "case-design-index.yml"
    if not path.exists():
        return {}
    data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    result: dict[str, str] = {}
    for row in data.get("cases", []):
        if row.get("source_page") and row.get("design_page"):
            result[str(row["source_page"])] = str(row["design_page"])
    return result


def route_mapping() -> dict[str, str]:
    mapping = {source: output_name(source) for source in CORE_PAGES + ARTICLE_PAGES}
    mapping.update(
        {
            "index.html": "top-three-air-study.html",
            "examples.html": "examples-study.html",
            "book-demo.html": "start-design.html",
            "case.html": "examples-study.html",
            "case-johnny.html": "examples-study.html",
        }
    )
    mapping.update(read_case_mapping())
    return mapping


def rewrite_url(value: str, mapping: dict[str, str]) -> str:
    if not value or value.startswith(("#", "/", "mailto:", "tel:", "data:", "javascript:")):
        return value
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return value
    replacement = mapping.get(parsed.path)
    if not replacement:
        return value
    return urlunsplit(("", "", replacement, parsed.query, parsed.fragment))


def rewrite_html_links(value: str, mapping: dict[str, str]) -> str:
    pattern = re.compile(r'(?P<prefix>\bhref\s*=\s*["\'])(?P<url>[^"\']+)(?P<suffix>["\'])', re.I)

    def replace(match: re.Match[str]) -> str:
        url = rewrite_url(match.group("url"), mapping)
        return f'{match.group("prefix")}{url}{match.group("suffix")}'

    return pattern.sub(replace, value)


def normalize_footer_text(value: str) -> str:
    pattern = re.compile(r'(<p\s+class=["\']footer-note["\']>).*?(</p>)', re.I | re.S)
    return pattern.sub(rf"\g<1>{FOOTER_TEXT}\g<2>", value)


def add_body_classes(value: str, source: str) -> str:
    pattern = re.compile(r"<body(?P<attrs>[^>]*)>", re.I)

    def replace(match: re.Match[str]) -> str:
        attrs = match.group("attrs")
        class_match = re.search(r'class\s*=\s*(["\'])(.*?)\1', attrs, re.I | re.S)
        classes = page_class(source)
        if class_match:
            old = class_match.group(2).strip()
            new = f"{old} {classes}".strip()
            attrs = attrs[: class_match.start()] + f'class="{new}"' + attrs[class_match.end() :]
        else:
            attrs = f'{attrs} class="{classes}"'
        return f"<body{attrs}>"

    return pattern.sub(replace, value, count=1)


def add_design_assets(value: str) -> str:
    marker = '<link rel="stylesheet" href="assets/css/prototype.css">'
    if marker not in value:
        raise ValueError("prototype stylesheet link not found")
    return value.replace(marker, marker + "\n" + FONT_LINKS, 1)


def wrap_final_cta(value: str) -> str:
    if "final-cta-stage" in value:
        return value
    pattern = re.compile(r'(?P<section><section\s+class=["\'][^"\']*\bfinal-cta\b[^"\']*["\'][^>]*>.*?</section>)', re.I | re.S)
    return pattern.sub(r'<div class="final-cta-stage">\g<section></div>', value, count=1)


def generate_page(source: str, mapping: dict[str, str]) -> str:
    path = ROOT / source
    value = path.read_text(encoding="utf-8")
    value = add_design_assets(value)
    value = add_body_classes(value, source)
    value = wrap_final_cta(value)
    value = rewrite_html_links(value, mapping)
    value = normalize_footer_text(value)
    return value


def update_approved_surfaces(mapping: dict[str, str]) -> int:
    paths = [ROOT / "top-three-air-study.html", ROOT / "examples-study.html"]
    case_manifest = ROOT / "content" / "case-design-index.yml"
    if case_manifest.exists():
        data = yaml.safe_load(case_manifest.read_text(encoding="utf-8")) or {}
        paths.extend(ROOT / str(row["design_page"]) for row in data.get("cases", []) if row.get("design_page"))

    updated = 0
    for path in paths:
        if not path.exists():
            continue
        before = path.read_text(encoding="utf-8")
        after = normalize_footer_text(rewrite_html_links(before, mapping))
        if after != before:
            path.write_text(after, encoding="utf-8")
            updated += 1
    return updated


def main() -> None:
    mapping = route_mapping()
    rows = []
    for source in CORE_PAGES + ARTICLE_PAGES:
        destination = output_name(source)
        (ROOT / destination).write_text(generate_page(source, mapping), encoding="utf-8")
        rows.append(
            {
                "source_page": source,
                "design_page": destination,
                "theme": THEMES.get(source, "editorial" if source.startswith("article-") else "default"),
            }
        )

    updated = update_approved_surfaces(mapping)
    manifest = {
        "version": 1,
        "template_css": "assets/design/site-page-template.css",
        "prototype_policy": "read-only",
        "pages": rows,
        "redirects": [{"source_page": "book-demo.html", "design_page": "start-design.html"}],
    }
    MANIFEST_PATH.write_text(yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False), encoding="utf-8")
    print(f"generated={len(rows)}; updated_approved_surfaces={updated}")


if __name__ == "__main__":
    main()
