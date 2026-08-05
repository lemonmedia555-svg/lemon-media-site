#!/usr/bin/env bash
# =====================================================================
# Деплой сайта Лимон Медиа на VPS
# Что делает:
#   1. rsync всех HTML, CSS, JS, картинок в /var/www/lemon-media/
#   2. Обновляет nginx-конфиг (если изменился)
#   3. Тестирует конфиг и делает graceful reload
# Требования:
#   - sshpass (brew install hudochenkov/sshpass/sshpass на macOS)
#   - переменная окружения LEMON_VPS_PASS
#   - rsync (есть в системе по умолчанию)
# =====================================================================
set -euo pipefail

# Конфиг
SSH_HOST="5.182.86.152"
SSH_USER="root"
SSH_PASS="${LEMON_VPS_PASS:?Перед запуском задайте LEMON_VPS_PASS}"
REMOTE_ROOT="/var/www/lemon-media"
REMOTE_NGINX_CONF="/etc/nginx/sites-available/lemon-media"
REMOTE_NGINX_LINK="/etc/nginx/sites-enabled/lemon-media"
REMOTE_DEFAULT_LINK="/etc/nginx/sites-enabled/default"

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Цвета для лога
G='\033[0;32m'; R='\033[0;31m'; Y='\033[1;33m'; N='\033[0m'

log()  { echo -e "${G}[deploy]${N} $*"; }
warn() { echo -e "${Y}[warn]${N} $*"; }
err()  { echo -e "${R}[err]${N} $*" >&2; }

# Проверка зависимостей
command -v sshpass >/dev/null || { err "sshpass не установлен. brew install hudochenkov/sshpass/sshpass"; exit 1; }
command -v rsync   >/dev/null || { err "rsync не установлен"; exit 1; }

SSHPASS_CMD="sshpass -p $SSH_PASS"
SSH_OPTS="-o StrictHostKeyChecking=accept-new -o ConnectTimeout=15"

# ============= 1. Готовим каталоги на сервере =============
log "Создаём $REMOTE_ROOT на сервере (если нет)…"
$SSHPASS_CMD ssh $SSH_OPTS "$SSH_USER@$SSH_HOST" "mkdir -p $REMOTE_ROOT && chown -R www-data:www-data $REMOTE_ROOT"

# ============= 2. rsync статики =============
log "Синхронизируем файлы сайта…"
$SSHPASS_CMD rsync -avz --delete \
  -e "ssh $SSH_OPTS" \
  --exclude '.git/' --exclude 'node_modules/' --exclude '.DS_Store' \
  --exclude 'nginx/' --exclude 'deploy/' --exclude 'docs/' \
  --exclude 'README.md' --exclude '.gitignore' --exclude 'partials/' \
  "$PROJECT_DIR/" \
  "$SSH_USER@$SSH_HOST:$REMOTE_ROOT/"

# ============= 3. Заливаем nginx-конфиг =============
log "Заливаем nginx-конфиг…"
$SSHPASS_CMD scp $SSH_OPTS \
  "$PROJECT_DIR/nginx/lemon-media.conf" \
  "$SSH_USER@$SSH_HOST:$REMOTE_NGINX_CONF"

# ============= 4. Активируем сайт + отключаем default =============
log "Активируем сайт и отключаем дефолтный nginx-сайт…"
$SSHPASS_CMD ssh $SSH_OPTS "$SSH_USER@$SSH_HOST" "
  set -e
  # Симлинк (если ещё нет)
  ln -sf $REMOTE_NGINX_CONF $REMOTE_NGINX_LINK
  # Отключаем default, чтобы он не перехватывал default_server
  if [ -L $REMOTE_DEFAULT_LINK ]; then
    rm $REMOTE_DEFAULT_LINK
    echo '[server] default отключён'
  fi
  # Тест конфигурации
  nginx -t
  # Перезагрузка без даунтайма
  systemctl reload nginx
  chown -R www-data:www-data $REMOTE_ROOT
  echo '[server] nginx перезагружен'
"

# ============= 5. Smoke-тест =============
log "Smoke-тест: проверяем коды ответа…"
for path in / /pricing.html /start.html /audit.html /examples.html /reviews.html /about.html; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://$SSH_HOST$path") || code='--'
  if [ "$code" = "200" ]; then
    echo "  ✓ $path → $code"
  else
    warn "$path → $code"
  fi
done

# 404 должна отдавать 404
code=$(curl -s -o /dev/null -w '%{http_code}' "http://$SSH_HOST/this-page-does-not-exist") || code='--'
if [ "$code" = "404" ]; then
  echo "  ✓ /this-page-does-not-exist → $code (как и должно быть)"
else
  warn "/this-page-does-not-exist → $code (ожидалось 404)"
fi

log "Готово! Сайт: http://$SSH_HOST/"
