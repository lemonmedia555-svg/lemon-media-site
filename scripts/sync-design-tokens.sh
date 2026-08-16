#!/usr/bin/env bash
# ============================================================
# Синхронизация дизайн-системы lemonmedia.
#
# Канон (единственный физический источник):
#   06 Маркетинг lemonmedia/Бренд/design-system/
#
# Копии внутри репозитория сайта - генерируемые. Править их
# бесполезно: при следующем запуске правки затрутся.
#   design-system/   - полная копия (доки + css + json)
#   assets/design/   - только css, их подключают 73 страницы
#
# Использование:
#   ./scripts/sync-design-tokens.sh          # синхронизировать
#   ./scripts/sync-design-tokens.sh --check  # проверить дрейф, не менять
#
# Копии в git оставлены обычными файлами (не симлинками),
# иначе сломается деплой: канон лежит вне репозитория.
# ============================================================
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CANON="$(cd "$REPO/../../Бренд/design-system" && pwd)"

FULL=(system.json tokens.css tokens.json components.css sections.css DESIGN.md README.md REFERENCES.md WEB_ART_DIRECTION.md specimen.html site-specimen.html)
CSS=(tokens.css components.css sections.css)

CHECK=0
[[ "${1:-}" == "--check" ]] && CHECK=1

drift=0
sync_one() {
  local src="$1" dst="$2"
  if [[ ! -f "$src" ]]; then
    echo "НЕТ В КАНОНЕ: $src"; drift=1; return
  fi
  if [[ -f "$dst" ]] && cmp -s "$src" "$dst"; then
    return
  fi
  if [[ "$CHECK" == "1" ]]; then
    echo "РАСХОЖДЕНИЕ: ${dst#$REPO/}"
    drift=1
  else
    mkdir -p "$(dirname "$dst")"
    cp -f "$src" "$dst"
    echo "обновлено: ${dst#$REPO/}"
  fi
}

for f in "${FULL[@]}"; do
  sync_one "$CANON/$f" "$REPO/design-system/$f"
done

# ассеты витрины (логотипы, Ксюша, образцы работ)
while IFS= read -r -d '' src; do
  rel="${src#$CANON/}"
  sync_one "$src" "$REPO/design-system/$rel"
done < <(find "$CANON/assets" -type f -print0)
for f in "${CSS[@]}"; do
  sync_one "$CANON/$f" "$REPO/assets/design/$f"
done

if [[ "$CHECK" == "1" ]]; then
  if [[ "$drift" == "0" ]]; then
    echo "OK: копии совпадают с каноном"
  else
    echo "Копии разошлись с каноном. Запусти ./scripts/sync-design-tokens.sh"
    exit 1
  fi
else
  echo "Готово. Канон: $CANON"
fi
