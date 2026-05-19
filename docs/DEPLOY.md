# Деплой сайта Лимон Медиа

## Среда

| Что | Значение |
|-----|----------|
| Хост | `5.182.86.152` |
| ОС | Ubuntu 24.04 LTS |
| Пользователь | `root` |
| Веб-сервер | nginx |
| Web-root | `/var/www/lemon-media` |
| Конфиг nginx | `/etc/nginx/sites-available/lemon-media` |
| Симлинк | `/etc/nginx/sites-enabled/lemon-media` |
| Логи | `/var/log/nginx/lemon-media.access.log` и `.error.log` |

## Что ещё крутится на этом сервере

- **Matema Bot** (`matema-bot.service`) — Telegram-бот, не пересекается.
- **matema.pro** — отдельный nginx-блок, не трогаем.
- **VPN (x-ui / xray)** на портах 2096 / 2443 / 8443 — nginx их не обслуживает, наш деплой не влияет на VPN.

## Первичный деплой

```bash
./deploy/deploy.sh
```

Скрипт делает:

1. `mkdir -p /var/www/lemon-media` на сервере
2. `rsync` всех HTML/CSS/JS/картинок (с `--delete` — удаляет старое)
3. `scp` nginx-конфига
4. Создаёт симлинк, отключает старый `default`
5. `nginx -t` и `systemctl reload nginx`
6. Smoke-тест через `curl` всех 6 страниц + проверка 404

## Обновление контента

Поправил HTML / CSS / JS → запустил `./deploy/deploy.sh`. Деплой инкрементальный — синхронизирует только изменения.

## Откат

Если что-то пошло не так:

```bash
# Восстановить default
ssh root@5.182.86.152 'ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default && rm /etc/nginx/sites-enabled/lemon-media && systemctl reload nginx'
```

Файлы сайта останутся в `/var/www/lemon-media` — можно вернуться, восстановив симлинк.

## Ручной деплой (без скрипта)

```bash
# 1. Скопировать файлы
rsync -avz --delete \
  --exclude '.git/' --exclude 'nginx/' --exclude 'deploy/' --exclude 'docs/' \
  ./ root@5.182.86.152:/var/www/lemon-media/

# 2. Скопировать конфиг
scp nginx/lemon-media.conf root@5.182.86.152:/etc/nginx/sites-available/lemon-media

# 3. Активировать
ssh root@5.182.86.152 << 'EOF'
ln -sf /etc/nginx/sites-available/lemon-media /etc/nginx/sites-enabled/lemon-media
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
chown -R www-data:www-data /var/www/lemon-media
EOF
```

## Подключение домена (опционально)

Когда появится домен (например, `lemon-media-site.ru`):

1. В DNS прописать A-запись на `5.182.86.152`
2. На сервере отредактировать `/etc/nginx/sites-available/lemon-media`: заменить `server_name _;` на `server_name lemon-media-site.ru www.lemon-media-site.ru;`
3. Установить certbot и получить SSL:
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d lemon-media-site.ru -d www.lemon-media-site.ru
   ```
4. `systemctl reload nginx`

## Проверка после деплоя

```bash
# Проверка кодов ответа
curl -I http://5.182.86.152/
curl -I http://5.182.86.152/pricing.html
curl -I http://5.182.86.152/this-page-doesnt-exist  # → 404

# Логи nginx
ssh root@5.182.86.152 'tail -f /var/log/nginx/lemon-media.access.log'
```

## Безопасность

Скрипт `deploy.sh` использует пароль root из переменной `LEMON_VPS_PASS` (или дефолтное значение для разработки). Для продакшена:

1. Сгенерировать SSH-ключ и положить публичный в `~/.ssh/authorized_keys` на VPS
2. Удалить хардкод пароля из `deploy.sh`
3. Переключить на `ssh -i ~/.ssh/lemon-media-key`
