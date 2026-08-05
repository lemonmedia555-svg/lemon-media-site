(() => {
  const posts = [
    { id: 1, title: 'Из каких систем собран профессиональный падел-корт', format: 'Карусель · 7 слайдов', rubric: 'Полезное и экспертное' },
    { id: 2, title: 'Падел как быстро растущий вид спорта', format: 'Статика', rubric: 'Ситуативное' },
    { id: 3, title: 'Четыре корта для спортивной академии', format: 'Карусель · 7 слайдов', rubric: 'Объект' },
    { id: 4, title: 'Почему падел-корт — не просто площадка с сеткой', format: 'Карусель · 7 слайдов', rubric: 'Разбор мифа' },
    { id: 5, title: 'Бесплатный предварительный расчёт под площадку', format: 'Статика', rubric: 'Предложение' },
    { id: 6, title: 'Из чего складывается стоимость корта', format: 'Карусель · 7 слайдов', rubric: 'Полезное и экспертное' },
    { id: 7, title: 'Частный корт как пример решения', format: 'Карусель · 7 слайдов', rubric: 'Объект' },
    { id: 8, title: 'Где аудитория поставила бы свой корт', format: 'Статика', rubric: 'Вовлечение' },
    { id: 9, title: 'Чек-лист до начала строительства', format: 'Карусель · 7 слайдов', rubric: 'Полезное и экспертное' },
    { id: 10, title: 'Четыре комплектации корта и выбор между ними', format: 'Карусель · 7 слайдов', rubric: 'Предложение' },
    { id: 11, title: 'На чём нельзя экономить', format: 'Карусель · 7 слайдов', rubric: 'Разбор мифа' },
    { id: 12, title: 'Три корта как бизнес-проект', format: 'Карусель · 7 слайдов', rubric: 'Объект' },
    { id: 13, title: 'Почему лето подходит для строительства', format: 'Статика', rubric: 'Ситуативное' },
    { id: 14, title: 'Корт как источник дохода: что надо рассчитать', format: 'Карусель · 7 слайдов', rubric: 'Полезное и экспертное' },
    { id: 15, title: 'Предложение по отсрочке платежа', format: 'Статика', rubric: 'Предложение' },
    { id: 16, title: 'Возражение «не успеем построить в этом сезоне»', format: 'Статика', rubric: 'Разбор мифа' },
    { id: 17, title: 'Объект в Ижевске и работа по России', format: 'Статика', rubric: 'Объект' },
    { id: 18, title: 'Падел и теннис — в чём различие', format: 'Статика', rubric: 'Вовлечение' },
    { id: 19, title: 'Обслуживание корта', format: 'Статика', rubric: 'Полезное и экспертное' },
    { id: 20, title: 'Предложение построить корт в текущем сезоне', format: 'Статика', rubric: 'Предложение' }
  ];

  const carouselIds = new Set([1, 3, 4, 6, 7, 9, 10, 11, 12, 14]);
  const pad = (value) => String(value).padStart(2, '0');
  const coverPath = (post) => carouselIds.has(post.id)
    ? `assets/cases/moscow-padel/carousels/${pad(post.id)}/01.jpg`
    : `assets/cases/moscow-padel/posts/${pad(post.id)}.jpg`;

  const plan = document.querySelector('[data-mp-plan]');
  if (plan) {
    plan.innerHTML = posts.map((post, index) => `
      <li>
        <time datetime="2026-08-${pad(index + 6)}">${pad(index + 1)} · ${pad(index + 6)}.08</time>
        <div>
          <strong>${post.title}</strong>
          <span class="mp-plan-meta"><span>${post.rubric}</span><span>${post.format}</span></span>
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-mp-feed]');
  if (feed) {
    feed.innerHTML = posts.map((post) => {
      const src = coverPath(post);
      return `
        <figure>
          <span class="mp-format-pill">${carouselIds.has(post.id) ? '7 слайдов' : '1 макет'}</span>
          <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="${pad(post.id)} · ${post.title}">
            <img src="${src}" width="864" height="1080" loading="lazy" alt="MoscowPadel, публикация ${post.id}: ${post.title}">
          </button>
          <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
        </figure>`;
    }).join('');
  }

  const carousels = document.querySelector('[data-mp-carousels]');
  if (carousels) {
    carousels.innerHTML = posts.filter((post) => carouselIds.has(post.id)).map((post) => {
      const slides = Array.from({ length: 7 }, (_, index) => {
        const slide = index + 1;
        const src = `assets/cases/moscow-padel/carousels/${pad(post.id)}/${pad(slide)}.jpg`;
        return `<img src="${src}" width="864" height="1080" loading="lazy" alt="MoscowPadel, карусель ${post.id}, слайд ${slide} из 7" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Публикация ${pad(post.id)} · слайд ${slide} из 7" role="button" tabindex="0">`;
      }).join('');

      return `
        <article class="case-carousel-block">
          <div class="case-carousel-heading">
            <span class="tag">Публикация ${pad(post.id)} · ${post.rubric}</span>
            <h3>${post.title}</h3>
          </div>
          <div class="case-carousel" data-case-carousel aria-label="Публикация ${post.id}: ${post.title}">
            <div class="case-carousel-track">${slides}</div>
            <div class="case-carousel-controls">
              <button type="button" aria-label="Предыдущий слайд публикации ${post.id}" data-case-prev>←</button>
              <span data-case-counter>1 / 7</span>
              <button type="button" aria-label="Следующий слайд публикации ${post.id}" data-case-next>→</button>
            </div>
            <div class="case-carousel-thumbs" data-case-thumbs aria-label="Слайды публикации ${post.id}"></div>
          </div>
        </article>`;
    }).join('');
  }

  const gift = document.querySelector('[data-mp-gift]');
  if (gift) {
    const slides = Array.from({ length: 7 }, (_, index) => {
      const slide = index + 1;
      const src = `assets/cases/moscow-padel/gift/${pad(slide)}.jpg`;
      return `<img src="${src}" width="864" height="1080" loading="lazy" alt="Подарочная карусель MoscowPadel, слайд ${slide} из 7" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Подарочная карусель · слайд ${slide} из 7" role="button" tabindex="0">`;
    }).join('');

    gift.innerHTML = `
      <div class="case-carousel" data-case-carousel aria-label="Подарочная карусель Падел: 7 фактов">
        <div class="case-carousel-track">${slides}</div>
        <div class="case-carousel-controls">
          <button type="button" aria-label="Предыдущий слайд подарочной карусели" data-case-prev>←</button>
          <span data-case-counter>1 / 7</span>
          <button type="button" aria-label="Следующий слайд подарочной карусели" data-case-next>→</button>
        </div>
        <div class="case-carousel-thumbs" data-case-thumbs aria-label="Слайды подарочной карусели"></div>
      </div>`;
  }

  const calendar = document.querySelector('[data-mp-calendar]');
  if (calendar) {
    const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', timeZone: 'Europe/Moscow' });
    calendar.innerHTML = posts.map((post, index) => {
      const day = index + 6;
      const date = new Date(`2026-08-${pad(day)}T10:00:00+03:00`);
      return `
        <article class="mp-calendar-card">
          <time datetime="2026-08-${pad(day)}T10:00:00+03:00"><strong>${pad(day)}.08</strong><span>${weekday.format(date)} · 10:00</span></time>
          <p>${pad(post.id)} · ${post.title}</p>
          <small>Черновик · VK + Instagram</small>
        </article>`;
    }).join('');
  }

  document.querySelectorAll('.case-carousel-track [data-case-dialog-open]').forEach((slide) => {
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        slide.click();
      }
    });
  });
})();
