#!/bin/sh
set -eu

SOURCE="${1:-/tmp/lis-bsdtar}"
TARGET="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)/assets/cases/lisitsinsky"

mkdir -p "$TARGET/posts" "$TARGET/carousels/04" "$TARGET/carousels/07" "$TARGET/gift"

for number in 1 2 3 5 6 8 9 10; do
  source_file=$(find "$SOURCE" -maxdepth 1 -type f -iname "пост $number.png" -print -quit)
  cp "$source_file" "$TARGET/posts/$(printf '%02d' "$number").png"
done

cp "$SOURCE/пост 4 карусель/пост 4 карусель.png" "$TARGET/carousels/04/01.png"
cp "$SOURCE/ПОСТ 7 КАРУСЕЛЬ/ПОСТ 7 карусель.png" "$TARGET/carousels/07/01.png"
cp "$SOURCE/карусель подарок/карусель подарок.png" "$TARGET/gift/01.png"

for number in 2 3 4 5 6 7; do
  cp "$SOURCE/пост 4 карусель/$(printf '%02d' "$number").png" "$TARGET/carousels/04/$(printf '%02d' "$number").png"
  cp "$SOURCE/ПОСТ 7 КАРУСЕЛЬ/$(printf '%02d' "$number").png" "$TARGET/carousels/07/$(printf '%02d' "$number").png"
  cp "$SOURCE/карусель подарок/$(printf '%02d' "$number").png" "$TARGET/gift/$(printf '%02d' "$number").png"
done
