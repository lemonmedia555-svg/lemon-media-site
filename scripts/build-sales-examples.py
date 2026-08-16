#!/usr/bin/env python3
"""Build the client-safe sales showcase from approved plans and final public assets."""

from __future__ import annotations

import html
import json
import re
import urllib.request
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parents[1]
WORKSPACE = ROOT.parents[2]
CASES = ROOT / "content" / "cases"
ASSETS = ROOT / "assets" / "cases"
OUTPUT = ROOT / "assets" / "design" / "examples-sales-data.js"
AUDIT = ROOT / "content" / "sales-examples-audit.yml"

PROJECTS = [
    {"slug": "saratov-kitchens-2026-08", "name": "Саратов Кухни", "category": "product", "task": 90812, "doc": "1JCV2qFZlzD7KK19K6KMAhOnhj5xn_1yX3MK21hFvlMA"},
    {"slug": "fr-moto", "name": "FR-moto", "category": "product", "task": 90704, "doc": "1THbxSKW2yJt6Pju4Er5gptHZftAmVjqxpriPs4HhcEE"},
    {"slug": "borodulina-tape", "name": "BORODULINA TAPE", "category": "expert", "task": 90872, "doc": "1V2LeMv4K3w3NLou_CRX6EmUl9YVrVooRl1AVaENVGbA"},
    {"slug": "chebusser", "name": "ЧЕБУССЭР", "category": "product", "task": 90860, "doc": "17HiZNnON-T6N4rX1l42x-yb9L45Hho_ENCO1aMIbGj0"},
    {"slug": "sergey-glibin", "name": "Сергей Глибин", "category": "services", "task": 90220, "doc": "1e1-Z0XCM2lbb8N_s_G2Dru_7ta_NZklV8V2Aw5ZkpKE"},
    {"slug": "nalog-expert", "name": "Налог Эксперт", "category": "expert", "task": 90772, "doc": "1wiFUPyPno163A_e5xr7C7tS9j31tBrNYmz2jWbTJgHI"},
    {"slug": "klient-prosto", "name": "Клиент Просто", "category": "expert", "task": 90740, "doc": "1eVIgo9xISxCKg0Ow4fvU3dueQEVEu6hmnUePfimB5-E"},
    {"slug": "refix", "name": "REFIX", "category": "services", "task": 90764, "doc": "1xDHnqP2mDXEbg8470ziq6wayGtjI-DzWOcYrQz0Owfs"},
    {"slug": "narfkis", "name": "NARFKiS", "category": "services", "task": 90850, "doc": "13okztHfuDbMhUk0RFzbg-cEbFsDqGGqffq5a4EtoKSI"},
    {"slug": "alliance-climate", "name": "Альянс Климат", "category": "services", "task": 90888, "doc": "1JTvtgaQZaiJ6zNAjon4xCyTh_CfDRhDolBI5UtcWp6E"},
    {"slug": "ateris", "name": "Атерис", "category": "services", "task": 90820, "doc": "1ghjXdVgb-bIMYGA05ISN6Up1znkn8GO-LmGySxxf0p0"},
    {"slug": "moscow-padel", "name": "MoscowPadel", "category": "services", "task": 90802, "doc": "1eec785WgY_1-MuhwGyKvnnbHxpBhRaSB2_qffnk1Ets"},
    {"slug": "ritual-s", "name": "Ритуал-С", "category": "services", "task": 90344, "doc": "1x8t8qaWf6gaCQbaZGm_qCqhwvjdFUElg7sEfV1lDEEs"},
    {"slug": "fjord-petersburg", "name": "Fjord-Petersburg", "category": "services", "source": "05 Клиенты/Fjord-Petersburg/КП-Fjord-Petersburg-2026-07.md"},
    {"slug": "siyanie-vyaza", "name": "Сияние вяза", "category": "product", "doc": "1fr1YkwVB4NzMw1U6K0BDY65dTKWvxkHr6po0P1Q7CCQ"},
    {"slug": "lipniki", "name": "Липники", "category": "product", "task": 90354, "doc": "17tresy0rQ0VXgqUKRUjNhVSAxT6q4w2AeER5YZxWQMY"},
    {"slug": "lisitsinsky", "name": "Александр Лисицинский", "category": "expert", "task": 90790, "doc": "1JDdJFw3OGModePCm7Wb2ht4rxZV1qo6JyN_Tje_LA0A"},
    {"slug": "oh-beauty", "name": "Oh! Beauty", "category": "services", "task": 90756, "doc": "1NxfhkVcx-zGK-dpl3AKi_Ot_xmGsUCP6-rjAkdm4yfE"},
    {"slug": "dobroe-serdtse", "name": "БФ «Доброе сердце»", "category": "services", "source": "05 Клиенты/Доброе-сердце/КП-Доброе-сердце-2026-07.md"},
    {"slug": "invest-management", "name": "Invest Management", "category": "expert", "task": 90700, "doc": "1XDYdou3wS5M-jTxp55EXvtZ8rcr1qzB_m2Q-0nSQumI"},
    {"slug": "masterpol", "name": "МастерПол", "category": "services", "task": 90406, "doc": "1MEF8k7xu9FCyW3xdYMNmNwod0ocGalvk1WbJZa6S1vk"},
    {"slug": "electronics-cherepovets", "name": "ЭЛЕКТРОНИКС", "category": "product", "task": 90882, "doc": "1rGiN4j5xeRI02kFX-jm3lF7pPXdEbSTsJ4QZBh9wBB8"},
    {"slug": "colorplast", "name": "Colorplast", "category": "product", "task": 90864, "doc": "1nrgcI3lS6FM8hT6mIHiJCHETWg7fwp9go3H_8tvQlek", "latest_cycle": True, "excluded_collections": [{"key": "previous_cycle", "reason": "На странице показана последняя датированная папка, предыдущий цикл не смешивается с актуальным."}]},
    {"slug": "taplife", "name": "TapLife", "category": "services", "doc": "15xV-LhYbrDZmTNVg8jgWsgeYS3T3pDo9q-QT8rlJS5o"},
    {"slug": "kristall-water", "name": "Кристалл", "category": "services", "task": 90698, "doc": "1i_Zin3kAUS6WDSqcSJhtuFfy_yyT091NS8nVRJATkbU"},
    {"slug": "inari", "name": "INARI", "category": "product", "task": 90832, "doc": "1WzipiOpsGrwreZeUgo3SEnSPPIDDrxmxqyM5oOLaaYw"},
    {"slug": "yagodny-ray", "name": "«Ягодный Рай»", "category": "product", "doc": "11p0bJxDxInakGIk4fpmcbduenz_s396hCbvMuSsttHc"},
    {"slug": "silny-parus", "name": "«Сильный Парус»", "category": "expert", "task": 90708, "doc": "1pO8OLiGJw8VKWfw5_jrhOqYE9eV6nFbDD7YUomxoZWs"},
    {"slug": "orange-style", "name": "Orange Style", "category": "services", "doc": "1B5Zha_skaAr0w7KSevsUcMiNj5oT35-n4A2oArrBUjQ"},
    {"slug": "dan-gun", "name": "«Дан-Гун»", "category": "services", "task": 90720, "doc": "1RfuTKIv_cdZe9XYSHdOqKZxeZhvbSzf6Wjy3qwrXDzU"},
    {"slug": "sidcobra", "name": "SIDCOBRA", "category": "expert", "task": 90702, "doc": "1PgV-hGLpImt7ISs1FzjYI3g4ko2F3dmqvCk7VgDAdAk"},
    {"slug": "roman-sedov", "name": "Роман Седов", "category": "expert", "task": 90722, "doc": "1hxrmTl5tGuPyOWBOlc55Ijj5yecpxM_f0hfUQlKTp50"},
    {"slug": "electric-monchegorsk", "name": "Электрик Мончегорск", "category": "services", "task": 90726, "doc": "1QJlfNg_MM27wVFHKFAEKj0QABJfdIsiFCtoJKm9eXwI"},
    {"slug": "olga-pravdyuk", "name": "Ольга Правдюк", "category": "expert", "task": 90734, "doc": "1LnD7D6BgbKFQbzRLcidx55fSy6aa6B9S7TQP0OqLuf8"},
    {"slug": "achinsk-begovoy", "name": "Ачинск Беговой", "category": "services", "task": 90716, "doc": "1jII71sGLUY-U-YDHg4Q8GvzX1OEUuVSMjBnlKUIn8Ao"},
    {"slug": "casahitto", "name": "CasaHitto", "category": "product", "task": 90750, "doc": "1BBjjIXIhscjZql-qdUAz6YP4dyYvUbdCpWT6m42ERJ4"},
    {"slug": "olga-andreeva", "name": "Ольга Андреева", "category": "expert", "task": 90710, "doc": "1amWuy8DWJWfBCuPUEQ0M-rP3M5qG7nkMtEJfNHxXStI"},
    {"slug": "dava-holding", "name": "Dava Holding", "category": "expert", "task": 90800, "doc": "1hoJIeLBUlGGe8wiMrpqbyICD-bEicjGDkP4VFwK4RSU", "excluded_collections": [{"key": "visual_concepts", "reason": "Черновые варианты выбора не являются финальным клиентским комплектом."}]},
    {"slug": "dava-life", "name": "Dava Life", "category": "product", "task": 90768, "doc": "1f5YaL3pCObS6s7TRjSCaR2m-DugT6-jIKne3FBfgoqA"},
]

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
HEADING_RE = re.compile(r"(?im)^\s*(?:#{1,6}\s*)?(?:_+\s*)?(?:"
    r"(?:пост|публикация|карусель)\s*(?:№\s*)?(\d{1,2})\b|"
    r"карусель\s*\(\s*пост\s*(\d{1,2})\s*\))[^\n]*")
COPY_MARKER_RE = re.compile(
    r"(?im)^\s*(?:\*\*)?(?:текст\s+(?:поста|публикации)(?:\s*\([^)]*\))?|"
    r"подпись\s+(?:к|под)\s+карусел(?:ь|и|ью)(?:\s*\([^)]*\))?|подпись\s+(?:поста|под\s+пост)|текст)(?:\*\*)?\s*:\s*"
)
STOP_RE = re.compile(r"(?im)^\s*(?:\*\*)?(?:визуал|что\s+делаем|слайды)(?:\*\*)?\s*:")


def canonical_text(value: str) -> str:
    return value.replace("—", "-").replace("–", "-").replace("ё", "е").replace("Ё", "Е")


def ru_count(value: int, forms: tuple[str, str, str]) -> str:
    remainder = value % 100
    if 11 <= remainder <= 14:
        form = forms[2]
    elif value % 10 == 1:
        form = forms[0]
    elif 2 <= value % 10 <= 4:
        form = forms[1]
    else:
        form = forms[2]
    return f"{value} {form}"


def text_source(config: dict[str, Any]) -> str:
    if config.get("source"):
        return (WORKSPACE / config["source"]).read_text(encoding="utf-8")
    doc_id = config["doc"]
    cache = Path("/tmp/lm-docs") / f"{doc_id}.txt"
    if cache.exists():
        return cache.read_text(encoding="utf-8-sig")
    url = f"https://docs.google.com/document/d/{doc_id}/export?format=txt"
    with urllib.request.urlopen(url, timeout=45) as response:
        raw = response.read().decode("utf-8-sig")
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(raw, encoding="utf-8")
    return raw


def clean_copy(raw: str) -> str:
    raw = canonical_text(raw)
    raw = re.sub(r"(?m)^\s*_{4,}\s*$", "", raw)
    raw = raw.replace("**", "").replace("==", "")
    raw = re.sub(r"(?m)^\s*#{1,6}\s*", "", raw)
    raw = re.sub(r"\n{3,}", "\n\n", raw).strip()
    return raw


def copy_to_html(raw: str) -> str:
    output: list[str] = []
    list_items: list[str] = []
    list_type = "ul"

    def flush_list() -> None:
        nonlocal list_items, list_type
        if not list_items:
            return
        output.append(f'<{list_type} class="sales-copy-list">{"".join(list_items)}</{list_type}>')
        list_items = []
        list_type = "ul"

    for line in clean_copy(raw).splitlines():
        line = line.strip()
        if not line:
            flush_list()
            continue

        ordered = re.match(r"^(\d+)[.)]\s+(.+)$", line)
        bullet = re.match(r"^(?:[-*•▪]|✅|☑️|✔️|🔹)\s*(.+)$", line)
        if ordered or bullet:
            next_type = "ol" if ordered else "ul"
            if list_items and list_type != next_type:
                flush_list()
            list_type = next_type
            item_text = ordered.group(2) if ordered else bullet.group(1)
            list_items.append(f"<li>{html.escape(item_text)}</li>")
            continue

        flush_list()
        escaped = html.escape(line)
        if line.startswith(("👉", "📌", "💬", "✍️")):
            output.append(f'<p class="sales-copy-callout">{escaped}</p>')
        elif len(line) <= 64 and not re.search(r"[.!?…]$", line) and not line.startswith(("#", "@")):
            output.append(f'<p class="sales-copy-subhead">{escaped}</p>')
        else:
            output.append(f"<p>{escaped}</p>")

    flush_list()
    return "".join(output)


def numbered_copy(source: str) -> dict[int, str]:
    matches = list(HEADING_RE.finditer(source))
    candidates: dict[int, list[tuple[bool, str]]] = {}
    for index, match in enumerate(matches):
        number = int(match.group(1) or match.group(2))
        end = matches[index + 1].start() if index + 1 < len(matches) else len(source)
        segment = source[match.end():end]
        marker = COPY_MARKER_RE.search(segment)
        body = segment[marker.end():] if marker else segment
        stop = STOP_RE.search(body)
        if stop:
            body = body[:stop.start()]
        if not marker:
            body = re.sub(r"(?im)^\s*(?:заголовок|текст)\s+на\s+(?:визуал|картинке)\s*:\s*[^\n]*\n?", "", body)
            lines = body.splitlines()
            slide_indexes = [line_index for line_index, line in enumerate(lines) if re.match(r"(?i)^\s*слайд\s*\d+", line)]
            if slide_indexes:
                slide_end = max(slide_indexes) + 1
                while slide_end < len(lines) and not lines[slide_end].strip():
                    slide_end += 1
                body = "\n".join(lines[slide_end:])
            stop = STOP_RE.search(body)
            if stop:
                body = body[:stop.start()]
        body = clean_copy(body)
        if body:
            candidates.setdefault(number, []).append((marker is not None, body))
    output: dict[int, str] = {}
    for number, values in candidates.items():
        marked = [body for has_marker, body in values if has_marker]
        output[number] = max(marked or [body for _, body in values], key=len)
    return output


def named_copy(source: str, title: str) -> str:
    words = [word for word in re.findall(r"[\w]+", canonical_text(title), re.UNICODE) if len(word) >= 4]
    patterns = [re.escape(title)]
    if len(words) >= 3:
        patterns.append(r"\s+".join(re.escape(word) for word in words[:4]))
    positions = []
    canonical_source = canonical_text(source)
    for pattern in patterns:
        positions.extend(match.start() for match in re.finditer(pattern, canonical_source, re.IGNORECASE))
    positions = sorted(set(positions))
    for position in reversed(positions):
        line_start = source.rfind("\n", 0, position) + 1
        line_end = source.find("\n", position)
        line_end = len(source) if line_end < 0 else line_end
        heading_line = canonical_source[line_start:line_end].lower()
        context_line_start = canonical_source.rfind("\n", 0, max(0, line_start - 1)) + 1
        heading_context = canonical_source[context_line_start:line_end].lower()
        line_has_format = any(word in heading_line for word in ("карус", "подар", "бонус"))
        context_has_format = any(word in heading_context for word in ("карус", "подар", "бонус"))
        if not line_has_format and not context_has_format:
            continue
        segment = source[line_end:line_end + 6000]
        boundary = re.search(r"(?im)^\s*(?:_{4,}|что\s+дальше|вопросы\s+клиенту)\s*$", segment)
        if boundary:
            segment = segment[:boundary.start()]
        marker = COPY_MARKER_RE.search(segment)
        if not marker:
            continue
        if not line_has_format:
            nearby_heading = HEADING_RE.search(segment[:marker.start()])
            if nearby_heading:
                continue
        body = segment[marker.end():]
        stop = STOP_RE.search(body)
        heading = HEADING_RE.search(body)
        ends = [match.start() for match in (stop, heading) if match]
        if ends:
            body = body[:min(ends)]
        body = clean_copy(body)
        if body:
            return body
    gifts = [match.start() for match in re.finditer(r"(?im)^\s*(?:(?:карусель[-\s]*)?подарок|бонус)[^\n]*", source)]
    if gifts:
        segment = source[gifts[-1]:gifts[-1] + 6000]
        boundary = re.search(r"(?im)^\s*(?:что\s+дальше|вопросы\s+клиенту)\s*$", segment[1:])
        if boundary:
            segment = segment[:boundary.start() + 1]
        marker = COPY_MARKER_RE.search(segment)
        if marker and HEADING_RE.search(segment[:marker.start()]):
            marker = None
        if marker:
            body = segment[marker.end():]
            stop = STOP_RE.search(body)
            if stop:
                body = body[:stop.start()]
            body = clean_copy(body)
            if body:
                return body
        all_markers = [candidate for candidate in COPY_MARKER_RE.finditer(segment) if not HEADING_RE.search(segment[:candidate.start()])]
        if all_markers:
            body = segment[all_markers[-1].end():]
            stop = STOP_RE.search(body)
            if stop:
                body = body[:stop.start()]
            body = clean_copy(body)
            if body:
                return body
    title_anchor = next((position for position in positions if COPY_MARKER_RE.search(source[position:position + 3000])), None)
    if title_anchor is not None:
        segment = source[title_anchor:title_anchor + 3000]
        marker = COPY_MARKER_RE.search(segment)
        boundary = re.search(r"(?m)^\s*_{4,}\s*$", segment)
        if boundary and marker and boundary.start() < marker.start():
            return ""
        nearby_heading = HEADING_RE.search(segment[:marker.start()]) if marker else None
        if nearby_heading:
            return ""
        body = segment[marker.end():] if marker else ""
        stop = STOP_RE.search(body)
        if stop:
            body = body[:stop.start()]
        body = clean_copy(body)
        if body:
            return body
    return ""


def section_copy(source: str, heading_pattern: str) -> str:
    heading = re.search(heading_pattern, source, re.IGNORECASE | re.MULTILINE)
    if not heading:
        return ""
    segment = source[heading.end():]
    marker = COPY_MARKER_RE.search(segment)
    if marker:
        segment = segment[marker.end():]
    stop = STOP_RE.search(segment)
    if stop:
        segment = segment[:stop.start()]
    return clean_copy(segment)


def normalize_path(value: Any) -> str | None:
    if not isinstance(value, str) or not value.strip() or value.startswith("withheld"):
        return None
    value = value.strip().lstrip("/")
    return value if value.startswith("assets/cases/") else None


def paths_in(value: Any) -> list[str]:
    output: list[str] = []
    if isinstance(value, str):
        path = normalize_path(value)
        if path:
            output.append(path)
    elif isinstance(value, list):
        for item in value:
            output.extend(paths_in(item))
    elif isinstance(value, dict):
        for key in ("asset", "public_asset", "public_cover", "assets", "public_assets", "slides", "frames", "public_frames"):
            if key in value:
                output.extend(paths_in(value[key]))
    return list(dict.fromkeys(output))


def existing(paths: list[str]) -> list[str]:
    return [path for path in paths if (ROOT / path).is_file()]


def directory_images(directory: Path) -> list[str]:
    if not directory.is_dir():
        return []
    return [str(path.relative_to(ROOT)) for path in sorted(directory.rglob("*")) if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES]


def infer_numbered(slug: str, number: int, carousel: bool) -> list[str]:
    base = ASSETS / slug
    nn = f"{number:02d}"
    found: list[str] = []
    if carousel:
        for path in sorted(base.glob(f"posts/{nn}.*")):
            if path.suffix.lower() in IMAGE_SUFFIXES:
                found.append(str(path.relative_to(ROOT)))
        for pattern in (f"carousels/{nn}", f"carousel-{nn}", f"carousels/{nn}-*"):
            for directory in sorted(base.glob(pattern)):
                found.extend(directory_images(directory) if directory.is_dir() else [str(directory.relative_to(ROOT))])
        for pattern in (f"carousels/{nn}-*.*", f"post-{nn}-slide-*.*"):
            for path in sorted(base.glob(pattern)):
                if path.suffix.lower() in IMAGE_SUFFIXES:
                    found.append(str(path.relative_to(ROOT)))
    else:
        for pattern in (f"posts/{nn}.*", f"post-{nn}.*"):
            for path in sorted(base.glob(pattern)):
                if path.suffix.lower() in IMAGE_SUFFIXES:
                    found.append(str(path.relative_to(ROOT)))
    found = list(dict.fromkeys(found))
    if carousel and any(re.search(r"/carousels/[^/]+/01\.[^.]+$", path) for path in found):
        found = [path for path in found if not re.search(rf"/posts/{nn}\.[^.]+$", path)]
    return found


def publications(plan: dict[str, Any], latest_cycle: bool = False) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    if latest_cycle or "current_cycle" in plan:
        cycle = plan.get("current_cycle", {})
        return cycle.get("publications", []), listify(cycle.get("bonus"))
    rows = plan.get("publications") or plan.get("content_plan") or plan.get("posts") or plan.get("public_gallery") or []
    bonus: list[dict[str, Any]] = []
    for key in ("bonus", "gift", "gift_carousel", "bonus_carousel", "bonus_carousels"):
        bonus.extend(listify(plan.get(key)))
    return rows, bonus


def listify(value: Any) -> list[dict[str, Any]]:
    if isinstance(value, list):
        return [item for item in value if isinstance(item, dict)]
    if isinstance(value, dict):
        return [value]
    return []


def row_number(row: dict[str, Any], fallback: int) -> int:
    value = row.get("number", row.get("id", fallback))
    if isinstance(value, int):
        return value
    match = re.search(r"\d+", str(value))
    return int(match.group()) if match else fallback


def is_carousel(row: dict[str, Any]) -> bool:
    value = str(row.get("format", "")).lower()
    return "carousel" in value or "карус" in value or bool(row.get("slides"))


def source_slide_number(source: str) -> int | None:
    name = Path(source).name
    match = re.search(r"slide[-_](\d{2})(?:[-_][^.]+)?\.[^.]+$", name, re.IGNORECASE)
    if not match:
        match = re.search(r"(?:^|[-_])(\d{2})(?=\.[^.]+$)", name)
    return int(match.group(1)) if match else None


def expected_slide_count(row: dict[str, Any]) -> int | None:
    for key in ("slide_count", "frame_count", "public_safe_slide_count"):
        value = row.get(key)
        if isinstance(value, int):
            return value
    for key in ("slides", "frames"):
        value = row.get(key)
        if isinstance(value, list):
            return len(value)
        if isinstance(value, int):
            return value
    return None


def carousel_status(row: dict[str, Any], sources: list[str]) -> tuple[bool, bool, str]:
    if not sources:
        return False, False, "нет публичных слайдов"

    first_source = sources[0]
    first_number = source_slide_number(first_source)
    has_cover = (
        first_number == 1
        or "/posts/" in first_source
        or "/carousel-covers/" in first_source
    )

    sequence: list[int | None] = []
    for index, source in enumerate(sources):
        if index == 0 and has_cover:
            sequence.append(1)
        else:
            sequence.append(source_slide_number(source))

    expected = list(range(1, len(sources) + 1))
    declared = expected_slide_count(row)
    if not has_cover:
        return False, False, "нет первого слайда"
    if len(sources) < 2:
        return False, True, "доступна только обложка"
    if sequence != expected:
        return False, True, "в публичной последовательности есть пропуски"
    if declared is not None and declared != len(sources):
        return False, True, f"доступно {len(sources)} из {declared} слайдов"
    return True, True, ""


def story_groups(plan: dict[str, Any], slug: str) -> list[dict[str, Any]]:
    raw: list[dict[str, Any]] = []
    for key in ("stories", "story_series", "stories_sequences", "additional_story_frames"):
        raw.extend(listify(plan.get(key)))
    groups: list[dict[str, Any]] = []
    for index, row in enumerate(raw, 1):
        sources = existing(paths_in(row))
        if not sources and any("withheld" in str(value) for value in row.values()):
            continue
        if not sources:
            source_dir = ASSETS / slug / "stories"
            subdirs = [path for path in sorted(source_dir.iterdir()) if path.is_dir()] if source_dir.is_dir() else []
            if subdirs and index <= len(subdirs):
                sources = directory_images(subdirs[index - 1])
            elif len(raw) > 1 and source_dir.is_dir():
                sources = [path for path in directory_images(source_dir) if Path(path).name.startswith(f"{index:02d}-")]
            elif len(raw) == 1:
                sources = directory_images(source_dir)
        if not sources and len(raw) == 1:
            sources = [str(path.relative_to(ROOT)) for path in sorted((ASSETS / slug).glob("story-*.*")) if path.suffix.lower() in IMAGE_SUFFIXES]
        if not sources:
            continue
        frames = row.get("frames") or row.get("flow") or []
        items = []
        for frame_index, source in enumerate(sources):
            frame = frames[frame_index] if isinstance(frames, list) and frame_index < len(frames) and isinstance(frames[frame_index], dict) else {}
            frame_text = frame.get("topic") or frame.get("text") or frame.get("role") or ""
            items.append({
                "src": source,
                "title": canonical_text(str(frame_text or f"{row.get('title', 'Истории')}: экран {frame_index + 1}")),
                "copyHtml": copy_to_html(str(frame_text)) if frame_text else "",
            })
        groups.append({"title": canonical_text(str(row.get("title") or f"Серия {index}")), "items": items})
    if groups:
        return groups
    source_dir = ASSETS / slug / "stories"
    if not source_dir.is_dir():
        return []
    subdirs = [path for path in sorted(source_dir.iterdir()) if path.is_dir()]
    directories = subdirs or [source_dir]
    return [
        {"title": f"Серия {index}", "items": [{"src": source, "title": f"История: экран {item + 1}", "copyHtml": ""} for item, source in enumerate(directory_images(directory))]}
        for index, directory in enumerate(directories, 1) if directory_images(directory)
    ]


def build_project(config: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    slug = config["slug"]
    plan = yaml.safe_load((CASES / slug / "plan.yml").read_text(encoding="utf-8")) or {}
    source = text_source(config)
    copies = numbered_copy(source)
    rows, bonus_rows = publications(plan, bool(config.get("latest_cycle")))
    hide_copy = set(config.get("hide_copy", []))
    feed: list[dict[str, Any]] = []
    carousels: list[dict[str, Any]] = []
    carousel_fragment_records: list[dict[str, Any]] = []
    missing_assets: list[int] = []
    missing_copy: list[int] = []

    for fallback, row in enumerate(rows, 1):
        if not isinstance(row, dict):
            continue
        number = row_number(row, fallback)
        carousel = is_carousel(row)
        explicit_public = "public_asset" in row and row.get("public_asset") in (None, False)
        sources = existing(paths_in(row))
        if not sources and not explicit_public:
            sources = infer_numbered(slug, number, carousel)
        elif carousel and len(sources) == 1 and not row.get("excluded_slides") and str(row.get("public_asset", "")).lower() != "partial":
            inferred = infer_numbered(slug, number, True)
            if "/carousels/" in sources[0]:
                inferred = [path for path in inferred if "/carousels/" in path]
            sources = list(dict.fromkeys(sources + inferred))
        if not sources:
            explicitly_excluded = explicit_public or row.get("display") is False or row.get("asset_status") == "excluded-after-qa" or row.get("public_assets") == []
            if not explicitly_excluded:
                missing_assets.append(number)
            continue
        title = row.get("public_title") or row.get("title") or row.get("source_topic") or f"Публикация {number}"
        title = canonical_text(str(title))
        copy_html = "" if number in hide_copy else copy_to_html(copies.get(number, ""))
        if number in hide_copy:
            copy_html = copy_to_html("Полный текст не показываем в публичной подборке.")
        if not copy_html and number not in hide_copy:
            missing_copy.append(number)
        cover = {"src": sources[0], "title": title, "copyHtml": copy_html, "publicationNumber": number}
        if carousel:
            group = {
                "title": title,
                "publicationNumber": number,
                "copyHtml": copy_html,
                "items": [{"src": path, "title": title, "copyHtml": copy_html, "publicationNumber": number} for path in sources],
            }
            complete, has_cover, reason = carousel_status(row, sources)
            if has_cover:
                feed.append(cover)
            if complete and copy_html:
                carousels.append(group)
            else:
                if complete and not copy_html:
                    reason = "в утвержденном плане нет подписи под каруселью"
                carousel_fragment_records.append({
                    "publication": number,
                    "title": title,
                    "available_frames": len(sources),
                    "reason": reason,
                })
        else:
            feed.append(cover)

    next_number = max([item["publicationNumber"] for item in feed], default=0) + 1
    for offset, row in enumerate(bonus_rows):
        explicit_number = row.get("number")
        number = int(explicit_number) if isinstance(explicit_number, int) and explicit_number >= next_number else next_number + offset
        sources = existing(paths_in(row))
        if not sources:
            for directory in (ASSETS / slug / "bonus", ASSETS / slug / "gift", ASSETS / slug / "carousels" / "bonus"):
                sources = directory_images(directory)
                if sources:
                    break
        if not sources:
            continue
        title = canonical_text(str(row.get("title") or "Дополнительная карусель"))
        copy_html = copy_to_html(named_copy(source, str(row.get("title") or "")))
        item = {"src": sources[0], "title": title, "copyHtml": copy_html, "publicationNumber": number}
        group = {
            "title": title,
            "publicationNumber": number,
            "isBonus": True,
            "copyHtml": copy_html,
            "items": [{"src": path, "title": title, "copyHtml": copy_html, "publicationNumber": number} for path in sources],
        }
        complete, _, reason = carousel_status(row, sources)
        if complete and copy_html:
            carousels.append(group)
        else:
            if complete and not copy_html:
                reason = "в утвержденном плане нет подписи под каруселью"
            carousel_fragment_records.append({
                "publication": number,
                "title": title,
                "available_frames": len(sources),
                "reason": reason,
            })

    feed.sort(key=lambda item: item["publicationNumber"])
    carousels.sort(key=lambda item: item["publicationNumber"])
    stories = story_groups(plan, slug)
    formats: dict[str, Any] = {"post": {"groups": [{"title": "Публикации", "items": feed}]}}
    if carousels:
        formats["carousel"] = {"groups": carousels}
    if stories:
        formats["story"] = {"groups": stories}

    scope = plan.get("scope") or plan.get("package") or (plan.get("current_cycle") or {}).get("scope") or {}
    planned = int(scope.get("publications") or scope.get("main_publications") or len(rows))
    parts = [ru_count(planned, ("публикация", "публикации", "публикаций"))]
    if carousels:
        parts.append(ru_count(len(carousels), ("карусель", "карусели", "каруселей")))
    story_count = sum(len(group["items"]) for group in stories)
    if story_count:
        parts.append(ru_count(story_count, ("история", "истории", "историй")))
    if len(feed) < planned:
        parts.append(f"в подборке {len(feed)} публичных материалов")

    project = {
        "name": config["name"],
        "categories": [config["category"]],
        "package": " · ".join(parts),
        "note": "",
        "formats": formats,
    }
    included_assets = sorted({item["src"] for format_data in formats.values() for group in format_data["groups"] for item in group["items"]})
    publication_numbers = [item["publicationNumber"] for item in feed]
    audit = {
        "slug": slug,
        "name": config["name"],
        "bitrix_task": config.get("task"),
        "content_source": config.get("doc") or config.get("source"),
        "planned_publications": planned,
        "public_publications": len(feed),
        "carousel_series": len(carousels),
        "partial_carousel_frames": sum(record["available_frames"] for record in carousel_fragment_records),
        "incomplete_carousel_series": carousel_fragment_records,
        "story_frames": story_count,
        "missing_public_assets": sorted(set(missing_assets)),
        "missing_copy": sorted(set(missing_copy)),
        "copy_intentionally_hidden": sorted(hide_copy),
        "excluded_or_unavailable_publications": sorted({row_number(row, index) for index, row in enumerate(rows, 1)} - {item["publicationNumber"] for item in feed}),
        "included_assets": len(included_assets),
        "duplicate_publication_numbers": sorted({number for number in publication_numbers if publication_numbers.count(number) > 1}),
        "excluded_collections": config.get("excluded_collections", []),
    }
    return project, audit


def main() -> None:
    projects: list[dict[str, Any]] = []
    audit: list[dict[str, Any]] = []
    excluded_projects: list[dict[str, Any]] = []
    for config in PROJECTS:
        project, record = build_project(config)
        audit.append(record)
        required_publications = max(10, record["planned_publications"])
        if record["public_publications"] < required_publications:
            excluded_projects.append({
                "slug": record["slug"],
                "name": record["name"],
                "reason": (
                    f"недоступен полный финальный комплект: "
                    f"{record['public_publications']} из {required_publications} календарных публикаций"
                ),
            })
            continue
        projects.append(project)
    OUTPUT.write_text("window.SALES_PROJECTS = " + json.dumps(projects, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    included_slugs = {project["name"] for project in projects}
    included_audit = [record for record in audit if record["name"] in included_slugs]
    AUDIT.write_text(yaml.safe_dump({"projects": audit, "excluded_projects": excluded_projects}, allow_unicode=True, sort_keys=False), encoding="utf-8")
    print(f"Built {len(projects)} visible projects, {sum(r['public_publications'] for r in included_audit)} publications, {sum(r['carousel_series'] for r in included_audit)} carousels, {sum(r['story_frames'] for r in included_audit)} story frames; excluded {len(excluded_projects)} incomplete projects")


if __name__ == "__main__":
    main()
