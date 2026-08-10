(() => {
  const posts = [
    { id: 1, date: '28.07', title: 'Ламинат, кварцвинил или инженерная доска', format: 'Пост', rubric: 'Польза' },
    { id: 2, date: '30.07', title: '79 м² за один день: разбор выполненной работы', format: 'Пост', rubric: 'Наши работы' },
    { id: 3, date: '01.08', title: 'Пять мифов об укладке пола, из-за которых переплачивают', format: 'Карусель · 7 слайдов', rubric: 'Разбор мифов' },
    { id: 4, date: '03.08', title: 'Почему у нас пол без щелей', format: 'Пост', rubric: 'Процесс' },
    { id: 5, date: '05.08', title: 'Замер с зачётом в стоимость работ', format: 'Пост', rubric: 'Предложение' },
    { id: 6, date: '07.08', title: '130 м² инженерной доски ёлочкой: разбор проекта', format: 'Карусель · 7 слайдов', rubric: 'Наши работы' },
    { id: 7, date: '09.08', title: 'Шесть точек проверки, когда принимаете готовый пол', format: 'Пост', rubric: 'Польза' },
    { id: 8, date: '11.08', title: 'Почему укладка ёлочкой дороже прямой', format: 'Пост', rubric: 'Разбор мифов' },
    { id: 9, date: '13.08', title: 'Откуда берётся низкая цена', format: 'Пост', rubric: 'Процесс' },
    { id: 10, date: '15.08', title: 'Бронируйте удобный срок заранее', format: 'Пост', rubric: 'Предложение' }
  ];

  const carouselSlides = new Map([[3, 7], [6, 7]]);
  const pad = (value) => String(value).padStart(2, '0');
  const coverPath = (post) => carouselSlides.has(post.id)
    ? `assets/cases/masterpol/post-${pad(post.id)}-slide-01.jpg`
    : `assets/cases/masterpol/post-${pad(post.id)}.jpg`;

  const plan = document.querySelector('[data-mp-plan]');
  if (plan) {
    plan.innerHTML = posts.map((post) => `
      <li>
        <time datetime="2026-${post.date.slice(3) === '07' ? '07' : '08'}-${post.date.slice(0, 2)}">${post.date}</time>
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
      const slideCount = carouselSlides.get(post.id);
      return `
        <figure>
          <span class="mp-format-pill">${slideCount ? `${slideCount} слайдов` : '1 макет'}</span>
          <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Публикация ${pad(post.id)} · ${post.title}">
            <img src="${src}" width="1080" height="1350" loading="lazy" alt="МастерПол, публикация ${post.id}: ${post.title}">
          </button>
          <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
        </figure>`;
    }).join('');
  }

  const carousels = document.querySelector('[data-mp-carousels]');
  if (carousels) {
    carousels.innerHTML = posts.filter((post) => carouselSlides.has(post.id)).map((post) => {
      const count = carouselSlides.get(post.id) || 0;
      const slides = Array.from({ length: count }, (_, index) => {
        const slide = index + 1;
        const src = `assets/cases/masterpol/post-${pad(post.id)}-slide-${pad(slide)}.jpg`;
        return `<img src="${src}" width="1080" height="1350" loading="lazy" alt="Карусель ${post.id}, слайд ${slide} из ${count}" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Публикация ${pad(post.id)} · слайд ${slide} из ${count}" role="button" tabindex="0">`;
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
              <span data-case-counter>1 / ${count}</span>
              <button type="button" aria-label="Следующий слайд публикации ${post.id}" data-case-next>→</button>
            </div>
            <div class="case-carousel-thumbs" data-case-thumbs aria-label="Слайды публикации ${post.id}"></div>
          </div>
        </article>`;
    }).join('');
  }

  const storySteps = [
    ['Зацепить', 'Поднять главный вопрос: почему цену нельзя честно назвать без осмотра основания.'],
    ['Объяснить', 'Показать, от каких условий зависит объём подготовки и итоговая стоимость.'],
    ['Снять страх', 'Заменить расплывчатую оценку на понятный расчёт после замера.'],
    ['Добавить выгоду', 'Объяснить, что стоимость замера засчитывается в заказ.'],
    ['Перевести', 'Направить в публикацию с подробностями и следующим шагом.']
  ];

  const stories = document.querySelector('[data-mp-stories]');
  if (stories) {
    stories.innerHTML = storySteps.map(([title, copy], index) => {
      const story = index + 1;
      const src = `assets/cases/masterpol/story-${pad(story)}.jpg`;
      return `<li><figure><button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="История ${story} из 5 · ${title}"><img src="${src}" width="1080" height="1920" loading="lazy" alt="История ${story} из 5: ${title}"></button><figcaption><span>${pad(story)}</span><strong>${title}</strong><small>${copy}</small></figcaption></figure></li>`;
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
