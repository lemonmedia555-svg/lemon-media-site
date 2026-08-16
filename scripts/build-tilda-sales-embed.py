#!/usr/bin/env python3
"""Build a single T123-ready embed that loads the public showcase in an iframe."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "examples-sales-tilda-embed.html"
PUBLIC_URL = "https://lemonmedia555-svg.github.io/lemon-media-site/examples-sales-study.html"


EMBED = f"""<!-- lemonmedia: вставьте весь этот код в один блок T123 -->
<div id="lm-sales-works-tilda">
  <div class="lm-sales-works-tilda__status" aria-live="polite">Загружаем примеры работ…</div>
  <iframe
    title="Примеры работ lemonmedia"
    src="{PUBLIC_URL}?embed=tilda"
    loading="eager"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="fullscreen"
  ></iframe>
</div>

<style>
  #lm-sales-works-tilda {{
    position: relative;
    width: 100%;
    min-height: 900px;
    overflow: hidden;
    background: #F4F6FA;
  }}

  #lm-sales-works-tilda iframe {{
    display: block;
    width: 100%;
    height: 900px;
    border: 0;
    background: #F4F6FA;
  }}

  #lm-sales-works-tilda .lm-sales-works-tilda__status {{
    position: absolute;
    z-index: 0;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 24px;
    color: #020202;
    font: 700 16px/1.5 Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    text-align: center;
  }}

  #lm-sales-works-tilda.is-ready .lm-sales-works-tilda__status {{ display: none; }}

  @media (max-width: 640px) {{
    #lm-sales-works-tilda,
    #lm-sales-works-tilda iframe {{ min-height: 760px; height: 760px; }}
  }}
</style>

<script>
(function () {{
  var root = document.getElementById('lm-sales-works-tilda');
  if (!root || root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  var frame = root.querySelector('iframe');
  var allowedOrigin = 'https://lemonmedia555-svg.github.io';
  var minimumHeight = 760;

  function setHeight(value) {{
    var next = Math.max(minimumHeight, Math.ceil(Number(value) || 0));
    if (!next) return;
    frame.style.height = next + 'px';
    root.style.minHeight = next + 'px';
    root.classList.add('is-ready');
  }}

  window.addEventListener('message', function (event) {{
    if (event.origin !== allowedOrigin || event.source !== frame.contentWindow) return;
    if (!event.data || event.data.type !== 'lemonmedia:sales-height') return;
    setHeight(event.data.height);
  }});

  frame.addEventListener('load', function () {{
    root.classList.add('is-ready');
    frame.contentWindow.postMessage({{ type: 'lemonmedia:measure-sales' }}, allowedOrigin);
  }});
}})();
</script>
"""


OUTPUT.write_text(EMBED, encoding="utf-8")
print(f"Built {OUTPUT.name}: {OUTPUT.stat().st_size} bytes")
