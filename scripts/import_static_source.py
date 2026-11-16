#!/usr/bin/env python3
"""Import page content and public assets from a NEPS static-export folder.

Usage: python3 scripts/import_static_source.py /path/to/NEPS-website-static
Requires: beautifulsoup4 (see scripts/requirements.txt).
The generated HTML content files are intentionally readable and editable by the site team.
"""
from __future__ import annotations

import argparse
from html import escape
import json
import shutil
from pathlib import Path
from bs4 import BeautifulSoup, Comment

PROJECT_ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_ROUTE_DIRS = {"404", "_not-found"}


def clean_route(source_file: Path, source_root: Path) -> str:
    relative = source_file.parent.relative_to(source_root)
    if relative == Path("."):
        return "/"
    return "/" + relative.as_posix().strip("/") + "/"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Folder containing the static export")
    args = parser.parse_args()
    source_root = args.source.expanduser().resolve()
    if not (source_root / "index.html").is_file():
        raise SystemExit(f"No index.html found in source folder: {source_root}")

    pages_dir = PROJECT_ROOT / "app" / "content" / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    routes: list[dict[str, str]] = []
    homepage_placeholders: list[dict[str, str]] = []
    page_files = sorted(source_root.rglob("index.html"))
    for page_file in page_files:
        relative = page_file.relative_to(source_root)
        if any(part in EXCLUDED_ROUTE_DIRS or part.startswith(".") or part == "_next" for part in relative.parts):
            continue
        soup = BeautifulSoup(page_file.read_text(encoding="utf-8", errors="replace"), "html.parser")
        main_content = soup.find("main")
        if main_content is None:
            continue
        route = clean_route(page_file, source_root)
        if route == "/":
            for card in main_content.select(".news-card"):
                link = card.select_one("h3 a[href]")
                if not link:
                    continue
                excerpt = next((p.get_text(" ", strip=True) for p in card.find_all("p") if "meta" not in p.get("class", [])), "")
                date = card.select_one("p.meta")
                badge = card.select_one(".badge")
                homepage_placeholders.append({
                    "path": link.get("href", ""),
                    "title": link.get_text(" ", strip=True),
                    "description": excerpt,
                    "date": date.get_text(" ", strip=True) if date else "Date to be confirmed",
                    "label": badge.get_text(" ", strip=True) if badge else "Placeholder update",
                })
        for comment in main_content.find_all(string=lambda value: isinstance(value, Comment)):
            comment.extract()
        if route == "/contact/":
            for button in main_content.select("form.contact-form button"):
                button["type"] = "button"
                button["data-prepare-draft"] = "true"
        if route == "/team/":
            reset_button = main_content.select_one(".filters button")
            if reset_button:
                reset_button["type"] = "button"
        content_name = "index.html" if route == "/" else route.strip("/") + ".html"
        target = pages_dir / content_name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(str(main_content), encoding="utf-8")

        title_tag = soup.find("title")
        description_tag = soup.find("meta", attrs={"name": "description"})
        title = title_tag.get_text(" ", strip=True) if title_tag else "NEPS"
        description = description_tag.get("content", "").strip() if description_tag else ""
        if not description:
            for paragraph in main_content.find_all("p"):
                candidate = paragraph.get_text(" ", strip=True)
                if candidate and candidate.casefold() != title.casefold() and len(candidate) >= 80:
                    description = candidate
                    break
        routes.append({
            "path": route,
            "content": content_name,
            "title": title,
            "description": description,
        })

    existing_paths = {route["path"] for route in routes}
    for placeholder in homepage_placeholders:
        placeholder_path = placeholder["path"]
        if not placeholder_path.startswith("/news/") or placeholder_path in existing_paths:
            continue
        slug = placeholder_path.strip("/")
        content_name = slug + ".html"
        target = pages_dir / content_name
        target.parent.mkdir(parents=True, exist_ok=True)
        title = escape(placeholder["title"])
        excerpt = escape(placeholder["description"])
        date = escape(placeholder["date"])
        label = escape(placeholder["label"])
        detail = f'''<main id="main-content" tabindex="-1">
  <article>
    <div class="page-hero">
      <div class="container">
        <nav aria-label="Breadcrumb" class="breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/news/">News &amp; updates</a></nav>
        <p class="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p class="meta">{date}</p>
        <p class="page-intro">{excerpt}</p>
      </div>
    </div>
    <div class="container article-body">
      <a class="text-link" href="/news/">Back to all updates</a>
      <p>{excerpt}</p>
      <p class="small-note">Editorial placeholder. Replace or remove this example, confirm its date and details, and obtain content approval before public launch.</p>
    </div>
  </article>
</main>'''
        target.write_text(detail, encoding="utf-8")
        routes.append({
            "path": placeholder_path,
            "content": content_name,
            "title": placeholder["title"],
            "description": placeholder["description"],
            "noindex": True,
        })
        existing_paths.add(placeholder_path)

    not_found_source = source_root / "404.html"
    if not not_found_source.is_file():
        not_found_source = source_root / "404" / "index.html"
    if not_found_source.is_file():
        soup = BeautifulSoup(not_found_source.read_text(encoding="utf-8", errors="replace"), "html.parser")
        main_content = soup.find("main")
        if main_content:
            for comment in main_content.find_all(string=lambda value: isinstance(value, Comment)):
                comment.extract()
            (pages_dir / "not-found.html").write_text(str(main_content), encoding="utf-8")

    public_dir = PROJECT_ROOT / "public"
    public_dir.mkdir(parents=True, exist_ok=True)
    routes.sort(key=lambda item: item["path"])
    (PROJECT_ROOT / "app" / "content" / "routes.json").write_text(
        json.dumps(routes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (PROJECT_ROOT / "public" / "manus-routes.json").write_text(
        json.dumps({"routes": [{"path": item["path"], "title": item["title"]} for item in routes]}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    source_public = source_root / "public"
    if source_public.is_dir():
        shutil.copytree(source_public, public_dir, dirs_exist_ok=True)
    for asset_name in ("neps-logo.webp", "favicon.svg"):
        source_asset = source_root / asset_name
        if source_asset.is_file():
            shutil.copy2(source_asset, public_dir / asset_name)

    css_candidates = sorted((source_root / "_next" / "static" / "chunks").glob("*.css"))
    if css_candidates:
        styles_dir = PROJECT_ROOT / "app" / "styles"
        styles_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(css_candidates[0], styles_dir / "source-site.css")
    placeholders = source_root / "PLACEHOLDERS.md"
    if placeholders.is_file():
        shutil.copy2(placeholders, PROJECT_ROOT / "PLACEHOLDERS.md")

    print(f"Imported {len(routes)} routes, {len(list(pages_dir.rglob('*.html')))} page fragments, and public assets from {source_root}")
    for item in routes:
        print(f"{item['path']}  {item['title']}")


if __name__ == "__main__":
    main()
