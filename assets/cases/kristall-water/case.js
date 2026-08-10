(() => {
  const topics = [
    { number: 1, role: 'Закулисье', title: 'Кто мы и с чего начинали', goal: 'Знакомство и доверие' },
    { number: 2, role: 'Польза', title: 'Кессон: когда он нужен и какой выбрать', goal: 'Объяснить выбор' },
    { number: 3, role: 'Наши работы', title: 'Было: вода привозная. Стало: вода в доме', goal: 'Показать результат' },
    { number: 4, role: 'Вовлечение', title: 'Зачем вообще нужна скважина', goal: 'Начать диалог' },
    { number: 5, role: 'Предложение', title: 'Забудьте про бутыли навсегда', goal: 'Условия периода кампании', note: 'исторические условия' },
    { number: 6, role: 'Польза', title: 'Одна компания и одна гарантия на весь комплекс', goal: 'Показать ценность системы' },
    { number: 7, role: 'Соцдоказательство', title: 'Опыт через географию выполненных объектов', goal: 'Подтвердить практику', note: 'цифра периода' },
    { number: 8, role: 'Польза', title: 'Что будет со скважиной без утепления к зиме', goal: 'Предупредить риск' },
    { number: 9, role: 'Наши работы', title: 'Скважины для застройщиков', goal: 'Показать B2B-направление' },
    { number: 10, role: 'Предложение', title: 'Напоминание об условиях кампании', goal: 'Перевести в расчёт', note: 'исторические условия' }
  ];

  const pad = (value) => String(value).padStart(2, '0');
  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const plan = document.querySelector('[data-kw-plan]');
  if (plan) {
    plan.innerHTML = topics.map((topic) => `
      <li>
        <time>${pad(topic.number)}</time>
        <div>
          <strong>${escapeHtml(topic.title)}</strong>
          <span>${escapeHtml(topic.role)} · ${escapeHtml(topic.goal)}</span>
          ${topic.note ? `<em>${escapeHtml(topic.note)}</em>` : ''}
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-kw-feed]');
  if (feed) {
    feed.innerHTML = topics.map((topic) => {
      const src = `assets/cases/kristall-water/posts/${pad(topic.number)}.jpg`;
      return `
        <figure>
          ${topic.note ? `<span class="kw-history-label">${escapeHtml(topic.note)}</span>` : ''}
          <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Кристалл · публикация ${pad(topic.number)} · ${escapeHtml(topic.title)}">
            <img src="${src}" width="720" height="900" loading="lazy" alt="Кристалл, публикация ${topic.number}: ${escapeHtml(topic.title)}">
          </button>
          <figcaption><b>${pad(topic.number)} · ${escapeHtml(topic.role)}</b><span>${escapeHtml(topic.title)}</span></figcaption>
        </figure>`;
    }).join('');
  }

  const carouselTarget = document.querySelector('[data-kw-carousel]');
  if (carouselTarget) {
    const slides = Array.from({ length: 7 }, (_, index) => {
      const number = index + 1;
      const src = `assets/cases/kristall-water/carousel/${pad(number)}.jpg`;
      return `
        <button type="button" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Кристалл · карусель о цене скважины · слайд ${number} из 7">
          <img src="${src}" width="720" height="900" loading="lazy" alt="Карусель о цене скважины, слайд ${number} из 7">
        </button>`;
    }).join('');

    const thumbs = Array.from({ length: 7 }, (_, index) => {
      const number = index + 1;
      const src = `assets/cases/kristall-water/carousel/${pad(number)}.jpg`;
      return `
        <button type="button" data-case-thumb="${index}" aria-label="Открыть слайд ${number}">
          <img src="${src}" width="72" height="90" loading="lazy" alt="">
        </button>`;
    }).join('');

    carouselTarget.innerHTML = `
      <article class="case-carousel-block kw-carousel-card">
        <div class="case-carousel-heading">
          <span class="tag">Подарочная карусель · версия на правках</span>
          <h3>Цена — это не только «рублей за метр»</h3>
          <p>Семь экранов показывают, какие позиции стоит уточнить до заказа.</p>
        </div>
        <div class="case-carousel" data-case-carousel aria-label="Из чего складывается цена скважины">
          <div class="case-carousel-track">${slides}</div>
          <div class="case-carousel-controls">
            <button type="button" aria-label="Предыдущий слайд" data-case-prev>←</button>
            <span data-case-counter>1 / 7</span>
            <button type="button" aria-label="Следующий слайд" data-case-next>→</button>
          </div>
          <div class="case-carousel-thumbs" data-case-thumbs>${thumbs}</div>
        </div>
      </article>`;
  }
})();
