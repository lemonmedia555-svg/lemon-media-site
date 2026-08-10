#!/usr/bin/env python3
"""Build design pages from the public case registry without touching prototypes."""

from __future__ import annotations

import colorsys
import html
import re
from collections import Counter
from pathlib import Path

import yaml
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "content" / "case-index.yml"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
CANONICAL_ID = "saratov-kitchens-2026-08"
CANONICAL_DESIGN_PAGE = "case-saratov-kitchens-design.html"
FORMAT_LABELS = {
    "static-post": "Пост",
    "carousel": "Карусель",
    "stories-sequence": "Сторис",
    "full-month": "Контент-план",
}
GOAL_LABELS = {
    "build-trust": "усилить доверие",
    "encourage-saves": "дать материал для сохранения",
    "reduce-result-uncertainty": "снять страх за результат",
    "create-purchase-desire": "вызвать желание покупки",
    "differentiate-offer": "отстроить предложение",
    "differentiate-approach": "показать отличие подхода",
    "measurement-request": "подвести к заявке на замер",
    "lead-request": "подвести к обращению",
    "show-expertise": "показать экспертность",
    "help-choice": "помочь с выбором",
    "collect-feedback": "собрать обратную связь",
    "encourage-comments": "вовлечь в диалог",
    "encourage-engagement": "вовлечь аудиторию",
    "seasonal-relevance": "связать тему с сезоном",
    "create-interest": "создать интерес",
    "show-real-work": "показать реальную работу",
    "encourage-participation": "подвести к участию",
    "explain-complex-topics": "объяснить сложную тему",
}


def esc(value: object) -> str:
    return html.escape(str(value or ""), quote=True)


def plain(value: object) -> str:
    text = re.sub(r"<[^>]+>", " ", str(value or ""))
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def plural(number: int, one: str, few: str, many: str) -> str:
    mod100 = number % 100
    mod10 = number % 10
    if 11 <= mod100 <= 14:
        return many
    if mod10 == 1:
        return one
    if 2 <= mod10 <= 4:
        return few
    return many


def natural_key(value: str) -> list[object]:
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", value)]


def source_text(page: str) -> str:
    path = ROOT / page
    return path.read_text(encoding="utf-8") if path.exists() else ""


def extract_first(source: str, pattern: str) -> str:
    match = re.search(pattern, source, re.I | re.S)
    return plain(match.group(1)) if match else ""


def extract_feed_sources(source: str) -> list[str]:
    match = re.search(r'<div class="[^"]*case-feed-grid[^"]*"[^>]*>(.*?)</div>', source, re.I | re.S)
    if not match:
        return []
    values = re.findall(r'<img[^>]+src="([^"]+)"', match.group(1), re.I)
    return list(dict.fromkeys(values))


def split_heading(value: str) -> tuple[str, str, str]:
    words = plain(value).split()
    if len(words) < 3:
        return ("Контент", "как связная", "система")
    best: tuple[float, tuple[str, str, str]] | None = None
    target = (sum(len(word) for word in words) + len(words) - 1) / 3
    for first_end in range(1, len(words) - 1):
        for second_end in range(first_end + 1, len(words)):
            groups = (
                " ".join(words[:first_end]),
                " ".join(words[first_end:second_end]),
                " ".join(words[second_end:]),
            )
            lengths = [len(group) for group in groups]
            score = sum((length - target) ** 2 for length in lengths) + (max(lengths) - min(lengths)) * 4
            if best is None or score < best[0]:
                best = (score, groups)
    return best[1] if best else ("Контент", "как связная", "система")


def all_images(asset_root: Path) -> list[Path]:
    if not asset_root.exists():
        return []
    return sorted(
        [path for path in asset_root.rglob("*") if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS],
        key=lambda path: natural_key(path.as_posix()),
    )


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def is_story(path: Path) -> bool:
    value = path.as_posix().lower()
    return "/stories/" in value or "/story/" in value or re.search(r"(^|[/_-])stor(?:y|ies)[/_-]", value) is not None


def carousel_key(path: Path, asset_root: Path) -> str | None:
    value = path.relative_to(asset_root).as_posix().lower()
    if is_story(path):
        return None
    patterns = [
        r"(?:^|/)carousels?/([^/]+)/",
        r"(?:^|/)carousel[-_]?([^/]+)/",
        r"(?:^|/)gift/",
        r"post[-_](\d+)[-_]slide[-_]\d+",
        r"carousel[-_](\d+)[-_]\d+",
    ]
    for pattern in patterns:
        match = re.search(pattern, value)
        if match:
            return (match.group(1) if match.lastindex else "gift").replace(" ", "-")
    if "/carousel-covers/" in value:
        number = re.search(r"(\d+)", Path(value).stem)
        return f"cover-{number.group(1) if number else Path(value).stem}"
    return None


def carousel_groups(images: list[Path], asset_root: Path) -> list[tuple[str, list[Path]]]:
    groups: dict[str, list[Path]] = {}
    for image in images:
        key = carousel_key(image, asset_root)
        if key:
            groups.setdefault(key, []).append(image)
    return sorted(groups.items(), key=lambda item: natural_key(item[0]))


def collect_publications(node: object, output: list[dict[str, object]]) -> None:
    if isinstance(node, dict):
        if node.get("title") and (node.get("number") is not None or node.get("format")):
            output.append(node)
        for value in node.values():
            collect_publications(value, output)
    elif isinstance(node, list):
        for value in node:
            collect_publications(value, output)


def publication_rows(plan: dict[str, object]) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    collect_publications(plan, rows)
    seen: set[str] = set()
    result: list[dict[str, object]] = []
    for row in rows:
        key = f"{row.get('number')}|{plain(row.get('title'))}"
        if key not in seen:
            seen.add(key)
            result.append(row)
    return result


def select_feed(
    source: str,
    images: list[Path],
    groups: list[tuple[str, list[Path]]],
    publication_count: int,
) -> list[str]:
    from_source = [value for value in extract_feed_sources(source) if (ROOT / value).exists()]
    if from_source:
        return from_source

    candidates: list[Path] = []
    for image in images:
        value = image.as_posix().lower()
        relative = image.name.lower()
        if is_story(image) or carousel_key(image, image.parents[2] if len(image.parents) > 2 else image.parent):
            continue
        if "/posts/" in value or re.match(r"post[-_]\d+", relative):
            candidates.append(image)
    candidates.extend(files[0] for _, files in groups if files)
    candidates.extend(image for image in images if not is_story(image))

    unique: list[str] = []
    for image in candidates:
        value = rel(image)
        if value not in unique:
            unique.append(value)
        if len(unique) >= max(1, publication_count):
            break
    return unique


def colour_hex(rgb: tuple[int, int, int]) -> str:
    return "#" + "".join(f"{max(0, min(255, value)):02x}" for value in rgb)


def mix(rgb: tuple[int, int, int], other: tuple[int, int, int], amount: float) -> tuple[int, int, int]:
    return tuple(round(a * (1 - amount) + b * amount) for a, b in zip(rgb, other))  # type: ignore[return-value]


def theme_from_image(path: Path | None) -> dict[str, str]:
    fallback = {
        "surface": "#123f35",
        "deep": "#092b24",
        "accent": "#c59a61",
        "soft": "#f5efe4",
        "on_accent": "#171713",
    }
    if not path or not path.exists():
        return fallback
    try:
        image = Image.open(path).convert("RGB")
        image.thumbnail((96, 96))
        quantized = image.quantize(colors=12).convert("RGB")
        pixels = quantized.get_flattened_data() if hasattr(quantized, "get_flattened_data") else quantized.getdata()
        counts = Counter(pixels)
        ranked = counts.most_common(12)
        useful = []
        for rgb, count in ranked:
            h, light, sat = colorsys.rgb_to_hls(*(channel / 255 for channel in rgb))
            if .05 < light < .94:
                useful.append((rgb, count, h, light, sat))
        if not useful:
            return fallback
        base = useful[0]
        accent_source = max(useful, key=lambda item: item[4] * .62 + item[3] * .24 + (item[1] / max(1, ranked[0][1])) * .14)
        base_h, base_s = base[2], max(.28, min(.72, base[4]))
        surface_rgb = tuple(round(channel * 255) for channel in colorsys.hls_to_rgb(base_h, .17, base_s))
        deep_rgb = tuple(round(channel * 255) for channel in colorsys.hls_to_rgb(base_h, .09, base_s))
        accent_h = accent_source[2]
        accent_s = max(.38, min(.78, accent_source[4]))
        accent_l = max(.56, min(.72, accent_source[3]))
        accent_rgb = tuple(round(channel * 255) for channel in colorsys.hls_to_rgb(accent_h, accent_l, accent_s))
        soft_rgb = mix(accent_rgb, (255, 255, 255), .88)
        luminance = sum(weight * channel for weight, channel in zip((.2126, .7152, .0722), accent_rgb)) / 255
        return {
            "surface": colour_hex(surface_rgb),
            "deep": colour_hex(deep_rgb),
            "accent": colour_hex(accent_rgb),
            "soft": colour_hex(soft_rgb),
            "on_accent": "#171713" if luminance > .55 else "#ffffff",
        }
    except Exception:
        return fallback


def render_images(paths: list[str], titles: list[str]) -> str:
    if not paths:
        return '<div class="case-empty">В публичной версии нет изображений этого формата.</div>'
    items = []
    for index, path in enumerate(paths):
        title = titles[index] if index < len(titles) else f"Публикация {index + 1}"
        items.append(
            f'<figure><button type="button" data-case-dialog-open data-case-dialog-src="{esc(path)}" '
            f'data-case-dialog-alt="{esc(title)}"><img src="{esc(path)}" width="720" height="900" '
            f'loading="lazy" alt="{esc(title)}"></button></figure>'
        )
    return "\n            ".join(items)


def render_copy_source(rows: list[dict[str, object]], feed_count: int) -> str:
    details = []
    for index in range(feed_count):
        row = rows[index] if index < len(rows) else {}
        title = plain(row.get("title")) or f"Публикация {index + 1}"
        format_id = plain(row.get("format"))
        format_name = FORMAT_LABELS.get(format_id, "Материал")
        goals = row.get("goals") if isinstance(row.get("goals"), list) else []
        goal_values = [GOAL_LABELS[plain(goal)] for goal in goals if plain(goal) in GOAL_LABELS]
        goal_text = ", ".join(goal_values) or "часть общего контент-плана"
        details.append(
            f'<details><summary><span>{index + 1:02d}</span><strong>{esc(title)}</strong><small>{esc(format_name)}</small></summary>'
            f'<div class="case-copy-body"><p>Роль материала: {esc(goal_text)}.</p></div></details>'
        )
    return "".join(details)


def render_carousels(groups: list[tuple[str, list[Path]]], rows: list[dict[str, object]], client: str) -> str:
    if not groups:
        return '<div class="case-empty">В этом проекте не было каруселей.</div>'
    carousel_rows = [row for row in rows if "carousel" in plain(row.get("format")).lower()]
    picker = []
    stages = []
    for index, (raw_key, files) in enumerate(groups):
        key = f"group-{index + 1}"
        row = carousel_rows[index] if index < len(carousel_rows) else {}
        title = plain(row.get("title")) or f"Карусель {index + 1}"
        selected = "true" if index == 0 else "false"
        hidden = "" if index == 0 else " hidden"
        tabindex = "" if index == 0 else ' tabindex="-1"'
        picker.append(
            f'<button type="button" role="tab" aria-selected="{selected}" aria-controls="case-carousel-{key}"{tabindex} '
            f'data-case-carousel-tab="{key}"><span>{index + 1:02d}</span><strong>{esc(title)}</strong><small>{len(files)} слайдов</small></button>'
        )
        slides = []
        thumbs = []
        for slide_index, file in enumerate(files):
            path = rel(file)
            slides.append(
                f'<img src="{esc(path)}" width="720" height="900" loading="lazy" '
                f'alt="{esc(client)}, карусель {index + 1}, слайд {slide_index + 1}" data-case-slide>'
            )
            thumbs.append(
                f'<button type="button" data-case-thumb="{slide_index}" aria-label="Открыть слайд {slide_index + 1}">'
                f'<img src="{esc(path)}" width="720" height="900" loading="lazy" alt=""></button>'
            )
        stages.append(
            f'<article id="case-carousel-{key}" class="case-carousel-block" role="tabpanel" data-case-carousel-group="{key}"{hidden}>'
            f'<div class="case-carousel" data-case-carousel aria-label="{esc(title)}">'
            f'<div class="case-carousel-track">{"".join(slides)}</div>'
            f'<div class="case-carousel-controls"><button type="button" aria-label="Предыдущий слайд" data-case-prev>←</button>'
            f'<span data-case-counter>1 / {len(files)}</span><button type="button" aria-label="Следующий слайд" data-case-next>→</button></div>'
            f'<div class="case-carousel-thumbs" data-case-thumbs aria-label="Слайды карусели">{"".join(thumbs)}</div>'
            f'</div></article>'
        )
    return (
        '<div class="case-carousel-gallery"><div class="case-carousel-picker" role="tablist" aria-label="Выбор карусели">'
        + "".join(picker)
        + '</div><div class="case-carousel-gallery__stage">'
        + "".join(stages)
        + "</div></div>"
    )


def render_stories(paths: list[Path], client: str) -> str:
    if not paths:
        return '<div class="case-empty">В этом проекте не было серии сторис.</div>'
    items = []
    for index, file in enumerate(paths):
        path = rel(file)
        title = f"{client}, сторис {index + 1}"
        items.append(
            f'<li><figure><button type="button" data-case-dialog-open data-case-dialog-src="{esc(path)}" '
            f'data-case-dialog-alt="{esc(title)}"><img src="{esc(path)}" width="540" height="960" '
            f'loading="lazy" alt="{esc(title)}"></button></figure></li>'
        )
    return f'<ol class="case-stories-flow">{"".join(items)}</ol>'


def render_links(links: object) -> str:
    if not isinstance(links, list):
        return '<p class="case-template-note">Публичные ссылки в кейсе не указаны.</p>'
    items = []
    for link in links:
        if isinstance(link, dict) and link.get("url"):
            items.append(
                f'<a href="{esc(link.get("url"))}" target="_blank" rel="noopener"><span>{esc(link.get("label") or "Открыть")}</span>'
                '<span class="case-link-arrow" aria-hidden="true">↗</span></a>'
            )
    return f'<div class="case-study-result__links">{"".join(items)}</div>' if items else '<p class="case-template-note">Публичные ссылки в кейсе не указаны.</p>'


def render_page(entry: dict[str, object]) -> tuple[str, str]:
    case_id = str(entry["id"])
    source_page = str(entry["public_page"])
    output_page = CANONICAL_DESIGN_PAGE if case_id == CANONICAL_ID else source_page.replace(".html", "-design.html")
    case_path = ROOT / "content" / str(entry["data"]["case"])  # type: ignore[index]
    plan_path = ROOT / "content" / str(entry["data"]["plan"])  # type: ignore[index]
    case = yaml.safe_load(case_path.read_text(encoding="utf-8")) or {}
    plan = yaml.safe_load(plan_path.read_text(encoding="utf-8")) or {}
    identity_value = case.get("identity", {})
    summary_value = case.get("summary", {})
    scope_value = case.get("scope", {})
    evidence_value = case.get("evidence", {})
    identity = identity_value if isinstance(identity_value, dict) else {}
    summary = summary_value if isinstance(summary_value, dict) else {"short": summary_value, "content_task": summary_value}
    scope = scope_value if isinstance(scope_value, dict) else {}
    evidence = evidence_value if isinstance(evidence_value, dict) else {}
    client = plain(identity.get("client_display_name")) or plain(entry.get("client_display_name")) or case_id
    source = source_text(source_page)
    original_h1 = extract_first(source, r"<h1[^>]*>(.*?)</h1>")
    original_h2 = extract_first(source, r"<h2[^>]*>(.*?)</h2>")
    hero_title = original_h1 or plain(summary.get("content_task")) or plain(identity.get("public_title"))
    hero_lines = split_heading(hero_title)
    strategy_title = original_h2 or "Контент работает как связный маршрут, а не набор отдельных публикаций"
    lead = plain(summary.get("short")) or plain(summary.get("content_task"))
    task = plain(summary.get("content_task")) or lead
    result_wording = plain(summary.get("result_wording")) or "Собран готовый к проверке комплект материалов."
    entry_scope = entry.get("scope", {}) if isinstance(entry.get("scope", {}), dict) else {}
    publication_count = int(scope.get("publications") or entry_scope.get("publications") or 0)
    carousel_count = int(scope.get("carousel_publications") or 0)
    carousel_slides = int(scope.get("carousel_slides") or 0)
    stories_count = int(scope.get("stories_frames") or 0)
    platform_count = int(scope.get("platform_count") or scope.get("confirmed_launch_platform_count") or scope.get("planned_platform_count") or 1)
    asset_root = ROOT / "assets" / "cases" / case_id
    images = all_images(asset_root)
    groups = carousel_groups(images, asset_root)
    rows = publication_rows(plan)
    titles = [plain(row.get("title")) for row in rows]
    feed = select_feed(source, images, groups, publication_count)
    if not publication_count:
        publication_count = len(feed)
    story_files = [image for image in images if is_story(image)]
    if stories_count:
        story_files = story_files[:stories_count]
    hero_images = (feed + [rel(image) for image in images])[:3]
    while hero_images and len(hero_images) < 3:
        hero_images.append(hero_images[-1])
    example_images = (feed + hero_images)[:4]
    while example_images and len(example_images) < 4:
        example_images.append(example_images[-1])
    first_image = ROOT / hero_images[0] if hero_images else None
    theme = theme_from_image(first_image)
    confirmed = evidence.get("confirmed") if isinstance(evidence.get("confirmed"), list) else []
    not_claimed = evidence.get("not_claimed") if isinstance(evidence.get("not_claimed"), list) else []
    proof_lines = [plain(value) for value in confirmed[:3]]
    while len(proof_lines) < 3:
        proof_lines.append(result_wording)
    not_claimed_text = "; ".join(plain(value).rstrip(".") for value in not_claimed[:2])
    honest = f"Без подтвержденных данных не заявляем: {not_claimed_text.lower()}." if not_claimed_text else "Не приписываем контенту продажи и заявки без подтвержденных данных."
    period = plain(identity.get("period"))
    display_carousels = carousel_count or len(groups)
    display_slides = carousel_slides or sum(len(files) for _, files in groups)
    display_stories = stories_count or len(story_files)
    style = ";".join([
        f"--case-project-surface:{theme['surface']}",
        f"--case-project-surface-deep:{theme['deep']}",
        f"--case-project-accent:{theme['accent']}",
        f"--case-project-accent-soft:{theme['soft']}",
        f"--case-project-on-accent:{theme['on_accent']}",
        f"--case-green:{theme['surface']}",
        f"--case-green-deep:{theme['deep']}",
        f"--case-gold:{theme['accent']}",
        f"--case-cream:{theme['soft']}",
    ])
    hero_media = "".join(
        f'<img src="{esc(path)}" width="720" height="900" alt="Работа проекта {esc(client)}">' for path in hero_images
    )
    examples_media = "".join(
        f'<img src="{esc(path)}" width="720" height="900" loading="lazy" alt="Пример работы проекта {esc(client)}">' for path in example_images
    )
    page = f'''<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{esc(lead)}">
  <title>Кейс «{esc(client)}» — lemonmedia</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/prototype.css">
  <link rel="stylesheet" href="assets/design/tokens.css">
  <link rel="stylesheet" href="assets/design/case-template.css?v=1">
</head>
<body class="lm-case-study lm-case-template lm-case-{esc(case_id)}" style="{style}">
  <header class="site-header">
    <div class="container header-row">
      <a class="brand lm-case-brand" href="top-three-air-study.html" aria-label="lemonmedia — главная"><img src="assets/design/logo-dark.svg" alt="lemonmedia"></a>
      <button class="menu-button" type="button" aria-expanded="false" data-menu-toggle>Меню</button>
      <nav class="main-nav" aria-label="Основная навигация">
        <a href="examples-study.html" aria-current="page">Работы</a><a href="process-design.html">Как работаем</a><a href="pricing-design.html">Цены</a><a href="reviews-design.html">Отзывы</a><a href="about-design.html">О компании</a><a href="articles-design.html">Статьи</a><a class="btn btn-small btn-accent" href="start-design.html">Начать работу</a>
      </nav>
    </div>
  </header>
  <main>
    <section class="case-study-hero" aria-labelledby="case-study-title">
      <div class="container"><div class="case-study-hero__grid">
        <div class="case-study-hero__copy">
          <h1 id="case-study-title"><span>{esc(hero_lines[0])}</span><span>{esc(hero_lines[1])}</span><span><em>{esc(hero_lines[2])}</em></span></h1>
          <p class="case-study-hero__lead">{esc(lead)}</p>
          <div class="case-study-hero__actions"><a class="btn btn-accent" href="#case-product">Посмотреть весь контент-план</a><a class="case-study-text-link" href="#case-strategy">Как построили логику →</a></div>
        </div>
        <div class="case-study-hero__visual" aria-label="Реальные публикации проекта {esc(client)}">
          <div class="case-study-hero__label"><strong>{esc(client)}</strong><span>{publication_count} публикаций в одной системе</span></div>{hero_media}
        </div>
      </div></div>
    </section>
    <section class="case-study-scope" aria-label="Состав контент-плана"><div class="container"><div class="case-study-scope__grid">
      <article><strong>{publication_count}</strong><span>готовых публикаций</span></article>
      <article><strong>{display_slides}</strong><span>{plural(display_slides, "слайд", "слайда", "слайдов")} в {display_carousels} {plural(display_carousels, "карусели", "каруселях", "каруселях")}</span></article>
      <article><strong>{display_stories}</strong><span>экранов сторис</span></article>
      <article><strong>{platform_count}</strong><span>{plural(platform_count, "площадка или канал выпуска", "площадки или канала выпуска", "площадок или каналов выпуска")}</span></article>
    </div></div></section>
    <section class="case-study-strategy" id="case-strategy"><div class="container">
      <div class="case-study-heading"><div><h2>{esc(strategy_title)}</h2></div><p>{esc(task)}</p></div>
      <ol class="case-study-route" aria-label="Логика контент-плана">
        <li><span>01</span><h3>Зацепить</h3><p>Начать с понятной ситуации или сильного интереса.</p></li>
        <li><span>02</span><h3>Объяснить</h3><p>Разложить сложную тему простым языком.</p></li>
        <li><span>03</span><h3>Показать</h3><p>Дать продукт, работу или опыт в конкретике.</p></li>
        <li><span>04</span><h3>Снять сомнения</h3><p>Ответить на вопросы до разговора с менеджером.</p></li>
        <li><span>05</span><h3>Дать следующий шаг</h3><p>Сделать продолжение простым и уместным.</p></li>
      </ol>
      <div class="case-study-examples">
        <div class="case-study-examples__copy"><div><h3>Не набор макетов, а связный контент-план</h3><p>{esc(result_wording)}</p></div>
          <div class="case-study-examples__legend"><div><strong>{publication_count} {plural(publication_count, "публикация", "публикации", "публикаций")}</strong><span>единая логика выпуска</span></div><div><strong>{display_carousels} {plural(display_carousels, "карусель", "карусели", "каруселей")}</strong><span>{display_slides} готовых {plural(display_slides, "слайд", "слайда", "слайдов")}</span></div><div><strong>{display_stories} сторис</strong><span>дополнительный сценарий внимания</span></div></div>
        </div>
        <div class="case-study-examples__media" aria-label="Примеры тем контент-плана">{examples_media}</div>
      </div>
    </div></section>
    <section class="section section-dark" id="case-product" data-case-tabs><div class="container">
      <div class="case-product-lead"><h2>Весь контент-план</h2><p>Откройте любую публикацию — внутри макет и роль материала.</p></div>
      <div class="case-tab-list" role="tablist" aria-label="Представления кейса">
        <button id="case-tab-feed" type="button" role="tab" aria-selected="true" aria-controls="case-panel-feed" data-case-tab="feed">Лента <span>{len(feed)}</span></button>
        <button id="case-tab-carousels" type="button" role="tab" aria-selected="false" aria-controls="case-panel-carousels" tabindex="-1" data-case-tab="carousels">Карусели <span>{display_carousels}</span></button>
        <button id="case-tab-stories" type="button" role="tab" aria-selected="false" aria-controls="case-panel-stories" tabindex="-1" data-case-tab="stories">Сторис <span>{display_stories}</span></button>
      </div>
      <div id="case-panel-feed" class="case-tab-panel" role="tabpanel" aria-labelledby="case-tab-feed" data-case-panel="feed"><div class="case-feed-grid">{render_images(feed, titles)}</div></div>
      <div class="case-copy-source" hidden aria-hidden="true"><div class="case-copy-list">{render_copy_source(rows, len(feed))}</div></div>
      <div id="case-panel-carousels" class="case-tab-panel" role="tabpanel" aria-labelledby="case-tab-carousels" data-case-panel="carousels" hidden>{render_carousels(groups, rows, client)}</div>
      <div id="case-panel-stories" class="case-tab-panel" role="tabpanel" aria-labelledby="case-tab-stories" data-case-panel="stories" hidden>{render_stories(story_files, client)}</div>
    </div></section>
    <section class="case-study-result"><div class="container">
      <div class="case-study-result__head"><div><h2>Готовый контент-план можно проверить целиком</h2></div><p>В кейсе открыт сам продукт: публикации, карусели, сторис и логика выпуска.</p></div>
      <div class="case-study-result__grid">
        <article class="case-study-result__proof"><div class="case-study-result__number">{publication_count}<span>публикаций собраны<br>в одну систему</span></div><div><h3>Что видно без пояснений менеджера</h3><ul class="case-study-proof-list"><li><strong>Стратегия</strong><span>{esc(proof_lines[0])}</span></li><li><strong>Производство</strong><span>{esc(proof_lines[1])}</span></li><li><strong>Выпуск</strong><span>{esc(proof_lines[2])}</span></li></ul></div></article>
        <article class="case-study-result__honest"><div><h3>Что подтверждает этот кейс</h3><p>{esc(honest)}</p></div><div>{render_links(evidence.get("public_links"))}</div></article>
      </div>
    </div></section>
    <div class="final-cta-stage"><section class="final-cta"><div class="container"><h2><span>10 готовых постов</span><span>и публикация на пяти площадках</span><em>4 990 ₽</em></h2><p class="lead">Маркетолог собирает план, команда пишет и оформляет, менеджер ведет согласование. Вы занимаетесь бизнесом.</p><div class="section-actions" style="margin-top:28px;"><a class="btn btn-accent" href="start-design.html?plan=10">Собрать 10 постов за 4 990 ₽</a><a class="btn btn-secondary" href="pricing-design.html">Посмотреть другие пакеты</a></div><p class="risk-note">Без скрытой доплаты за публикацию на подключенных площадках. Условия фиксируем до старта.</p></div></section></div>
  </main>
  <dialog class="case-dialog" aria-labelledby="case-dialog-title" data-case-dialog><div class="case-dialog-bar"><strong id="case-dialog-title" data-case-dialog-title>Работа проекта «{esc(client)}»</strong><button type="button" aria-label="Закрыть изображение" data-case-dialog-close>Закрыть ×</button></div><div class="case-dialog-content"><div class="case-dialog-visual"><img src="{esc(hero_images[0] if hero_images else '')}" width="720" height="900" alt="" data-case-dialog-image></div><article class="case-dialog-copy" data-case-dialog-copy hidden><div data-case-dialog-copy-body></div></article></div></dialog>
  <footer class="site-footer"><div class="container footer-grid"><div><a class="brand" href="top-three-air-study.html" aria-label="lemonmedia — главная"><span class="brand-dot" aria-hidden="true"></span>lemonmedia</a><p class="footer-note">Регулярный контент под ключ для малого и среднего бизнеса.</p></div><div class="footer-column"><strong>Выбрать</strong><a href="pricing-design.html">Цены и конструктор</a><a href="examples-study.html">Работы</a><a href="process-design.html">Как работаем</a><a href="compare-design.html">Сравнение</a></div><div class="footer-column"><strong>Узнать больше</strong><a href="reviews-design.html">Отзывы</a><a href="about-design.html">О компании</a><a href="services-design.html">Разовые услуги</a><a href="partners-design.html">Партнерам</a><a href="articles-design.html">Статьи</a><a href="faq-design.html">Все вопросы</a></div><div class="footer-column"><strong>Начать</strong><a href="start-design.html">Собрать пакет</a><a href="audit-design.html">Бесплатный разбор</a><a href="guarantee-design.html">Условия гарантии</a><a href="legal-design.html#offer">Условия работы</a><a href="legal-design.html#privacy">Конфиденциальность</a></div></div></footer>
  <script src="assets/js/prototype.js"></script>
  <script src="assets/design/case-saratov-approved.js?v=1"></script>
</body>
</html>
'''
    return output_page, page


def update_design_links(mapping: dict[str, str]) -> None:
    for relative_path in ["assets/design/examples-top-variants.js", "assets/design/examples-case-card-variants.js"]:
        path = ROOT / relative_path
        if not path.exists():
            continue
        value = path.read_text(encoding="utf-8")
        for source_page, design_page in mapping.items():
            value = value.replace(f"link:'{source_page}'", f"link:'{design_page}'")
        path.write_text(value, encoding="utf-8")


def main() -> None:
    registry = yaml.safe_load(INDEX_PATH.read_text(encoding="utf-8")) or {}
    cases = [entry for entry in registry.get("cases", []) if entry.get("publishable")]
    mapping: dict[str, str] = {}
    design_rows = []
    generated = 0
    for entry in cases:
        output_page, page = render_page(entry)
        mapping[str(entry["public_page"])] = output_page
        design_rows.append({"id": entry["id"], "source_page": entry["public_page"], "design_page": output_page})
        if entry["id"] == CANONICAL_ID:
            continue
        (ROOT / output_page).write_text(page, encoding="utf-8")
        generated += 1
    update_design_links(mapping)
    manifest = {"version": 1, "template": CANONICAL_DESIGN_PAGE, "cases": design_rows}
    (ROOT / "content" / "case-design-index.yml").write_text(yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False), encoding="utf-8")
    print(f"generated={generated}; total_design_pages={len(design_rows)}")


if __name__ == "__main__":
    main()
