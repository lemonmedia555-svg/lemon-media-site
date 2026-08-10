(() => {
  const posts = [
    { id: 1, title: 'Как выбрать ведущего на свадьбу: пять признаков', format: 'Карусель · 7 слайдов', rubric: 'Польза' },
    { id: 2, title: '«Ведущий — это тамада с конкурсами»?', format: 'Пост', rubric: 'Разбор мифов' },
    { id: 3, title: 'Свадьба этого сезона', format: 'Пост', rubric: 'Наши работы' },
    { id: 4, title: 'Какой свадебный конкурс бесит вас больше всего', format: 'Пост', rubric: 'Вовлечение' },
    { id: 5, title: 'Свадебный сезон в разгаре: как не потерять дату', format: 'Пост', rubric: 'Предложение' },
    { id: 6, title: 'Семь вопросов ведущему до предоплаты', format: 'Карусель · 7 слайдов', rubric: 'Польза' },
    { id: 7, title: 'Свадьба за городом под Петербургом', format: 'Карусель · 6 слайдов', rubric: 'Наши работы' },
    { id: 8, title: 'Как ведущий держит вечер, когда всё идёт не по плану', format: 'Пост', rubric: 'О ведущем' },
    { id: 9, title: 'От чего зависит стоимость ведущего', format: 'Пост', rubric: 'Польза' },
    { id: 10, title: 'Пять мифов о ведущих', format: 'Карусель · 7 слайдов', rubric: 'Разбор мифов' },
    { id: 11, title: 'Свадьба мечты: город или загород', format: 'Пост', rubric: 'Вовлечение' },
    { id: 12, title: 'Саксофонист в подарок к программе', format: 'Пост', rubric: 'Предложение' },
    { id: 13, title: 'Когда на свадьбе звучит саксофон', format: 'Пост', rubric: 'Наши работы' },
    { id: 14, title: 'Тайминг, который не даёт вечеру провиснуть', format: 'Пост', rubric: 'Польза' },
    { id: 15, title: 'Тот самый гость на свадьбе', format: 'Пост', rubric: 'О ведущем' },
    { id: 16, title: 'Свадьба на девять человек', format: 'Карусель · 6 слайдов', rubric: 'Наши работы' },
    { id: 17, title: '«Нам хватит диджея, зачем ведущий?»', format: 'Пост', rubric: 'Разбор мифов' },
    { id: 18, title: 'Что важнее на свадьбе: фото или атмосфера', format: 'Пост', rubric: 'Вовлечение' },
    { id: 19, title: 'Что обсудить с ведущим за месяц до свадьбы', format: 'Пост', rubric: 'Польза' },
    { id: 20, title: 'Осень и зима бронируются летом', format: 'Пост', rubric: 'Предложение' }
  ];

  const carouselSlides = new Map([[1, 7], [6, 7], [7, 6], [10, 7], [16, 6]]);
  const pad = (value) => String(value).padStart(2, '0');
  const coverPath = (post) => carouselSlides.has(post.id)
    ? `assets/cases/sergey-glibin/carousels/${pad(post.id)}/01.jpg`
    : `assets/cases/sergey-glibin/posts/${pad(post.id)}.jpg`;

  const plan = document.querySelector('[data-sg-plan]');
  if (plan) {
    plan.innerHTML = posts.map((post) => `
      <li>
        <time datetime="2026-07">${pad(post.id)}</time>
        <div>
          <strong>${post.title}</strong>
          <span class="sg-plan-meta"><span>${post.rubric}</span><span>${post.format}</span></span>
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-sg-feed]');
  if (feed) {
    feed.innerHTML = posts.map((post) => {
      const src = coverPath(post);
      const count = carouselSlides.get(post.id);
      return `
        <figure>
          <span class="sg-format-pill">${count ? `${count} слайдов` : '1 макет'}</span>
          <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Публикация ${pad(post.id)} · ${post.title}">
            <img src="${src}" width="720" height="900" loading="lazy" alt="Сергей Глибин, публикация ${post.id}: ${post.title}">
          </button>
          <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
        </figure>`;
    }).join('');
  }

  const carousels = document.querySelector('[data-sg-carousels]');
  if (carousels) {
    carousels.innerHTML = posts.filter((post) => carouselSlides.has(post.id)).map((post) => {
      const count = carouselSlides.get(post.id) || 0;
      const slides = Array.from({ length: count }, (_, index) => {
        const slide = index + 1;
        const src = `assets/cases/sergey-glibin/carousels/${pad(post.id)}/${pad(slide)}.jpg`;
        return `<img src="${src}" width="720" height="900" loading="lazy" alt="Карусель ${post.id}, слайд ${slide} из ${count}" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Публикация ${pad(post.id)} · слайд ${slide} из ${count}" role="button" tabindex="0">`;
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
    ['Зацепить', 'Назвать знакомый страх: важного специалиста бронируют раньше площадки.'],
    ['Объяснить', 'Показать горизонт решения — популярные даты занимают заранее.'],
    ['Усилить', 'Связать сезон с реальным дефицитом свободных дат.'],
    ['Узнавание', 'Озвучить знакомый вопрос и риск получить отказ.'],
    ['Перевести', 'Направить в основную публикацию о бронировании.']
  ];
  const stories = document.querySelector('[data-sg-stories]');
  if (stories) {
    stories.innerHTML = storySteps.map(([title, copy], index) => {
      const story = index + 1;
      const src = `assets/cases/sergey-glibin/stories/${pad(story)}.jpg`;
      return `<li><figure><button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Сторис ${story} из 5 · ${title}"><img src="${src}" width="540" height="960" loading="lazy" alt="Сторис ${story} из 5: ${title}"></button><figcaption><span>${pad(story)}</span><strong>${title}</strong><small>${copy}</small></figcaption></figure></li>`;
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
