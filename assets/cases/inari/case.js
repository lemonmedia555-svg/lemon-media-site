(() => {
  const publications = [
    { id: 1, title: 'Как готовят ролл под заказ', format: 'Статика', rubric: 'Закулисье', asset: 'assets/cases/inari/posts/01.jpg' },
    { id: 2, title: 'Как выбрать сет на компанию', format: 'Статика', rubric: 'Польза', asset: 'assets/cases/inari/posts/02.jpg' },
    { id: 3, title: 'Популярные сеты', format: 'Карусель · 7 слайдов', rubric: 'Витрина товара', asset: 'assets/cases/inari/carousel-covers/03.jpg' },
    { id: 4, title: 'Что заказать на вечер пятницы', format: 'Статика', rubric: 'Вовлечение', asset: 'assets/cases/inari/posts/04.jpg' },
    { id: 5, title: 'Разбор сомнения о свежести рыбы', format: 'Статика', rubric: 'Закулисье', asset: 'assets/cases/inari/posts/05.jpg' },
    { id: 6, title: 'Пицца и доставка горячей еды', format: 'Статика', rubric: 'Витрина товара', asset: 'assets/cases/inari/posts/06.jpg' },
    { id: 7, title: 'Как доставить горячую еду горячей', format: 'Карусель · 7 слайдов', rubric: 'Польза', asset: 'assets/cases/inari/carousel-covers/07.jpg' },
    { id: 8, title: 'Роллы или пицца', format: 'Статика', rubric: 'Вовлечение', asset: 'assets/cases/inari/posts/08.jpg' },
    { id: 9, title: 'Люди и процессы на кухне', format: 'Статика', rubric: 'Закулисье', asset: 'assets/cases/inari/posts/09.jpg' },
    { id: 10, title: 'Быстрые и сытные позиции меню', format: 'Статика', rubric: 'Витрина товара', asset: 'assets/cases/inari/posts/10.jpg' }
  ];

  const pad = (value) => String(value).padStart(2, '0');

  const plan = document.querySelector('[data-inari-plan]');
  if (plan) {
    plan.innerHTML = publications.map((post, index) => {
      const day = 4 + index * 2;
      return `
        <li>
          <time datetime="2026-08-${pad(day)}">${pad(post.id)} · ${pad(day)}.08</time>
          <div>
            <strong>${post.title}</strong>
            <span class="inari-plan-meta"><span>${post.rubric}</span><span>${post.format}</span></span>
          </div>
        </li>`;
    }).join('');
  }

  const covers = document.querySelector('[data-inari-covers]');
  if (covers) {
    covers.innerHTML = publications.map((post) => `
      <figure>
        <span class="inari-format-pill">${post.format.startsWith('Карусель') ? 'только обложка' : '1 макет'}</span>
        <button type="button" data-case-dialog-open data-case-dialog-src="${post.asset}" data-case-dialog-alt="${pad(post.id)} · ${post.title}">
          <img src="${post.asset}" width="864" height="1080" loading="lazy" alt="INARI, макет публикации ${post.id}: ${post.title}">
        </button>
        <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
      </figure>`).join('');
  }

  const storyFlow = document.querySelector('[data-inari-stories]');
  if (storyFlow) {
    const storyTitles = [
      'Знакомая ситуация: гости уже скоро',
      'Необязательно готовить самому',
      'Один заказ на всю компанию',
      'Переход к готовым сетам',
      'Приглашение открыть публикацию'
    ];
    storyFlow.innerHTML = storyTitles.map((title, index) => {
      const story = index + 1;
      const src = `assets/cases/inari/stories/${pad(story)}.jpg`;
      return `
        <li>
          <figure>
            <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Сторис ${story} из 5 · ${title}">
              <img src="${src}" width="675" height="1200" loading="lazy" alt="INARI, сторис ${story} из 5: ${title}">
            </button>
            <figcaption>${pad(story)} · ${title}</figcaption>
          </figure>
        </li>`;
    }).join('');
  }

  const calendar = document.querySelector('[data-inari-calendar]');
  if (calendar) {
    const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', timeZone: 'Europe/Moscow' });
    calendar.innerHTML = publications.map((post, index) => {
      const day = 4 + index * 2;
      const date = new Date(`2026-08-${pad(day)}T10:00:00+03:00`);
      return `
        <article class="inari-calendar-card">
          <time datetime="2026-08-${pad(day)}T10:00:00+03:00"><strong>${pad(day)}.08</strong><span>${weekday.format(date)} · 10:00</span></time>
          <p>${pad(post.id)} · ${post.title}</p>
          <small>Черновик · только VK</small>
        </article>`;
    }).join('');
  }
})();
