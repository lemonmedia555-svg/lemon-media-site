(() => {
  const posts = [
    { id: 1, title: 'Экономика субГАБа на модельном расчёте', format: 'Пост', rubric: 'Польза', goal: 'Объяснить механику дохода' },
    { id: 2, title: 'Почему основатель выбрал субаренду', format: 'Пост', rubric: 'Команда', goal: 'Создать личное доверие' },
    { id: 3, title: 'Кейс: объект в Архангельске заселён за 30 дней', format: 'Карусель · 7 слайдов', rubric: 'Наши работы', goal: 'Показать процесс на цифрах' },
    { id: 4, title: 'Три мифа о субаренде', format: 'Карусель · 7 слайдов', rubric: 'Разбор мифов', goal: 'Снять входные возражения' },
    { id: 5, title: 'Бесплатный экспертный разбор', format: 'Пост', rubric: 'Предложение', goal: 'Перевести в диалог' },
    { id: 6, title: 'Что выяснить у собственника до сделки', format: 'Пост', rubric: 'Польза', goal: 'Показать экспертизу' },
    { id: 7, title: 'Тест спроса: семь арендаторов за выходные', format: 'Пост', rubric: 'Наши работы', goal: 'Снять страх пустого объекта' },
    { id: 8, title: 'На чём строится экспертиза команды', format: 'Пост', rubric: 'Команда', goal: 'Подтвердить квалификацию' },
    { id: 9, title: 'Что происходит, если один субарендатор съезжает', format: 'Пост', rubric: 'Разбор мифов', goal: 'Объяснить управляемость риска' },
    { id: 10, title: 'Партнёрство без погружения в операционку', format: 'Пост', rubric: 'Предложение', goal: 'Показать формат работы' }
  ];

  const carouselSlides = new Map([[3, 7], [4, 7]]);
  const pad = (value) => String(value).padStart(2, '0');
  const coverPath = (post) => carouselSlides.has(post.id)
    ? `assets/cases/invest-management/post-${pad(post.id)}-slide-01.jpg`
    : `assets/cases/invest-management/post-${pad(post.id)}.jpg`;

  const plan = document.querySelector('[data-im-plan]');
  if (plan) {
    plan.innerHTML = posts.map((post) => `
      <li>
        <time datetime="2026-07">${pad(post.id)}</time>
        <div>
          <strong>${post.title}</strong>
          <span class="im-plan-meta"><span>${post.rubric}</span><span>${post.format}</span><span>${post.goal}</span></span>
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-im-feed]');
  if (feed) {
    feed.innerHTML = posts.map((post) => {
      const src = coverPath(post);
      const count = carouselSlides.get(post.id);
      return `
        <figure>
          <span class="im-format-pill">${count ? `${count} слайдов` : '1 макет'}</span>
          <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Публикация ${pad(post.id)} · ${post.title}">
            <img src="${src}" width="1080" height="1350" loading="lazy" alt="Invest Management, публикация ${post.id}: ${post.title}">
          </button>
          <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
        </figure>`;
    }).join('');
  }

  const carousels = document.querySelector('[data-im-carousels]');
  if (carousels) {
    carousels.innerHTML = posts.filter((post) => carouselSlides.has(post.id)).map((post) => {
      const count = carouselSlides.get(post.id) || 0;
      const slides = Array.from({ length: count }, (_, index) => {
        const slide = index + 1;
        const src = `assets/cases/invest-management/post-${pad(post.id)}-slide-${pad(slide)}.jpg`;
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
    ['Зацепить', 'Показать знакомую ситуацию: капитал есть, но он не работает.'],
    ['Сравнить', 'Обозначить ограничения привычных вариантов без готового ответа.'],
    ['Объяснить', 'Ввести механику субаренды через разницу ставок.'],
    ['Снять иллюзию', 'Показать, что объект, договор и заселение требуют системы.'],
    ['Перевести', 'Предложить бесплатный разбор капитала, города и подходящего формата.']
  ];

  const stories = document.querySelector('[data-im-stories]');
  if (stories) {
    stories.innerHTML = storySteps.map(([title, copy], index) => {
      const story = index + 1;
      const src = `assets/cases/invest-management/story-${pad(story)}.jpg`;
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
