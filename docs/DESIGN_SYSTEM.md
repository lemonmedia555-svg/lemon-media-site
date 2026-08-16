> **ЛЕГАСИ. Не источник правды.** Канон дизайн-системы: `06 Маркетинг lemonmedia/Бренд/design-system/DESIGN.md`. Этот документ описывает старую палитру сайта (`#FFDD2D`) и оставлен только для миграции.

# Дизайн-система Лимон Медиа

Все токены живут в `assets/css/main.css` как CSS Custom Properties.

## Палитра

### Основные акцентные

| Имя | HEX | Где используется |
|-----|-----|------------------|
| `--yellow` | `#FFDD2D` | Главный акцент, кнопки primary, бейджи, hero-блок |
| `--yellow-hover` | `#F2C800` | hover-состояние жёлтого |
| `--yellow-soft` | `#FFF1A6` | Подложки выделений, badge |
| `--yellow-bg` | `#FFFAE6` | Очень светлая подложка секции |

### Текст и UI

| Имя | HEX | Где используется |
|-----|-----|------------------|
| `--ink` | `#1B1B1B` | Основной чёрный для текста и тёмных блоков |
| `--ink-soft` | `#2A2D32` | Чуть мягче |
| `--gray-900` | `#2A2D32` | Заголовки на вторичных блоках |
| `--gray-700` | `#5A5F66` | Текст-lead, описания |
| `--gray-500` | `#8A8F95` | muted-текст, подсказки |
| `--gray-300` | `#D6D8DB` | Бордеры контролов |
| `--gray-200` | `#E6E7EA` | Бордеры карточек |
| `--gray-100` | `#F2F3F5` | Фон скрытых кнопок, divider |
| `--gray-50` | `#F8F9FA` | Подложка soft-секций |

### Семантические

| Имя | HEX |
|-----|-----|
| `--success` | `#2EB872` (галочки, save-pill) |
| `--danger`  | `#E5484D` (ошибки в формах) |
| `--info`    | `#4361EE` (опциональный) |

## Типографика

**Шрифт**: [Manrope](https://fonts.google.com/specimen/Manrope) (Google Fonts), веса `400/500/600/700/800`. Fallback — system-стек.

### Размеры (масштабируются через `clamp`)

| Имя | Значение | Применение |
|-----|----------|------------|
| `--fs-h1` | `clamp(2.25rem, 5vw, 4rem)` | Hero-заголовки |
| `--fs-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | Заголовки секций |
| `--fs-h3` | `clamp(1.25rem, 2.2vw, 1.75rem)` | Подзаголовки |
| `--fs-h4` | `1.25rem` | Заголовки карточек |
| `--fs-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | Подзаголовки и интро-текст |
| `--fs-body` | `1rem` | Основной текст |
| `--fs-sm` | `0.875rem` | Подписи, метки |
| `--fs-xs` | `0.75rem` | Микротекст |

### Высота строки

`--lh-tight: 1.1` (заголовки) · `--lh-snug: 1.25` · `--lh-normal: 1.5` (текст) · `--lh-relaxed: 1.65`

## Спейсинг

Шаг 4px:

| Токен | px |
|-------|-----|
| `--sp-1` | 4 |
| `--sp-2` | 8 |
| `--sp-3` | 12 |
| `--sp-4` | 16 |
| `--sp-5` | 24 |
| `--sp-6` | 32 |
| `--sp-7` | 48 |
| `--sp-8` | 64 |
| `--sp-9` | 96 |
| `--sp-10` | 128 |

## Радиусы

| Токен | px |
|-------|-----|
| `--r-xs` | 6 |
| `--r-sm` | 10 |
| `--r-md` | 16 |
| `--r-lg` | 24 |
| `--r-xl` | 32 |
| `--r-pill` | 999 |

## Тени

- `--shadow-sm` — лёгкая, для контролов
- `--shadow-md` — для hover-карточек
- `--shadow-lg` — для модалок и фокус-форм

## Контейнер

- Max-width: `1240px`
- Padding: `24px` (десктоп), `16px` (мобильный, < 768)

## Брейкпоинты

| Имя | Ширина | Что меняется |
|-----|--------|--------------|
| Mobile | < 480 | Кнопки растягиваются, цифры в одну колонку |
| Tablet | < 768 | Бургер вместо меню, grid → 1 колонка, секции 64px |
| Small desktop | < 1024 | Pricing → 1 колонка, кейсы → 2 колонки, stats → 2x2 |
| Desktop | ≥ 1024 | Полная сетка |

## Компоненты

### Кнопки

```html
<a href="#" class="btn btn-primary">Жёлтая</a>
<a href="#" class="btn btn-dark">Чёрная</a>
<a href="#" class="btn btn-outline">Аутлайн</a>
<a href="#" class="btn btn-ghost">Прозрачная</a>

<!-- Размеры -->
<button class="btn btn-primary btn-sm">Маленькая</button>
<button class="btn btn-primary btn-lg">Большая</button>
<button class="btn btn-primary btn-block">На всю ширину</button>
```

### Карточки

```html
<div class="card">Базовая</div>
<div class="card card-soft">С серым фоном</div>
<div class="card card-yellow">Жёлтая</div>
<div class="card card-dark">Тёмная</div>
<div class="card card-hover">С hover-эффектом</div>
```

### Бейдж / пилюля

```html
<span class="badge">Тег</span>
<span class="badge badge-dark">Тёмный</span>
<span class="badge badge-outline">Аутлайн</span>
```

### Карточка прайса

```html
<div class="pricing-card pricing-card--featured">
  <span class="pricing-card__badge">Популярно</span>
  …
</div>
```

### Карточка отзыва

```html
<div class="review-card">
  <div class="review__stars">★★★★★</div>
  <p class="review__quote">«Цитата»</p>
  <div class="review__author">
    <div class="review__avatar">И</div>
    <div>
      <p class="review__name">Имя</p>
      <p class="review__role">Должность, компания</p>
    </div>
  </div>
</div>
```

### Карточка кейса

```html
<article class="case-card" data-case-category="logo">
  <div class="case-card__cover">Превью</div>
  <div class="case-card__body">
    <p class="case-card__cat">Категория</p>
    <p class="case-card__title">Название кейса</p>
  </div>
</article>
```

### FAQ-аккордеон

Использует нативный `<details>` — работает без JS.

```html
<details class="faq__item">
  <summary class="faq__q">Вопрос?</summary>
  <div class="faq__a">Ответ.</div>
</details>
```

### Форма

Поля валидируются в `assets/js/main.js`. Применение:

```html
<form id="demo-form" class="form" novalidate>
  <div class="form__fields">
    <div class="field">
      <label class="field__label" for="name">Имя *</label>
      <input class="field__input" name="name" required>
      <span class="field__error">Сообщение об ошибке</span>
    </div>
  </div>
  <div class="form__success">Спасибо!</div>
</form>
```

## Принципы

1. **Жёлтый — только для главного.** Один-два жёлтых блока на экран, не больше. Иначе шумно.
2. **Чёрный фон — для разделения.** CTA-баннер, hero-блоки, footer.
3. **Скругление 16-24 px** — узнаваемый стиль карточек.
4. **Бордеры тонкие 1 px** — никаких 2 px и больше для нейтральных карточек.
5. **clamp() везде** — заголовки и отступы должны масштабироваться без media queries по возможности.
