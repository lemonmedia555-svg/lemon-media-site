(() => {
  const posts = [
    { id: 1, title: 'Инклюзивное авторалли «Приз Большого Норильска»', rubric: 'Анонс события', purpose: 'Дать дату, формат и причину прийти' },
    { id: 2, title: 'Что такое юкигассен и как в него играют', rubric: 'Польза', purpose: 'Сделать новую игру понятной' },
    { id: 3, title: 'Миф: спорт недоступен людям с инвалидностью', rubric: 'Разбор мифа', purpose: 'Снять барьер перед участием' },
    { id: 4, title: 'Как прошло инклюзивное авторалли', rubric: 'Проект клиента', purpose: 'Показать реальное событие' },
    { id: 5, title: 'Спортивная инициатива и грантовый проект', rubric: 'История бренда', purpose: 'Объяснить масштаб работы клиента' },
    { id: 6, title: 'Открытие сезона юкигассена', rubric: 'Анонс события', purpose: 'Привести внимание к новой дате' },
    { id: 7, title: 'Бочча, диск-гольф и юкигассен в Норильске', rubric: 'Польза', purpose: 'Познакомить с новыми форматами' },
    { id: 8, title: 'Как организовать спортивное событие под ключ', rubric: 'Проект клиента', purpose: 'Показать компетенции организатора' },
    { id: 9, title: 'Миф: в Норильске негде заниматься спортом', rubric: 'Разбор мифа', purpose: 'Ответить на локальное возражение' },
    { id: 10, title: 'Зачем NARFKiS развивает инклюзивный спорт', rubric: 'История бренда', purpose: 'Закрепить ценности и доверие' }
  ];

  const stories = [
    { id: 1, label: 'Зацепка', title: 'Снежки в Норильске — в разгар лета' },
    { id: 2, label: 'Объяснение', title: 'Что такое юкигассен' },
    { id: 3, label: 'Механика', title: 'Команды, тактика и азарт' },
    { id: 4, label: 'Конкретика', title: 'Дата и место открытия сезона' },
    { id: 5, label: 'Переход', title: 'Репост основного поста' }
  ];

  const pad = (value) => String(value).padStart(2, '0');
  const postPath = (id) => `assets/cases/narfkis/posts/${pad(id)}.jpg`;
  const storyPath = (id) => `assets/cases/narfkis/stories/${pad(id)}.jpg`;

  const plan = document.querySelector('[data-nf-plan]');
  if (plan) {
    plan.innerHTML = posts.map((post) => `
      <li>
        <time datetime="2026-07">${pad(post.id)}</time>
        <div>
          <strong>${post.title}</strong>
          <span>${post.rubric} · ${post.purpose}</span>
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-nf-feed]');
  if (feed) {
    feed.innerHTML = posts.map((post) => {
      const src = postPath(post.id);
      return `
        <figure>
          <button type="button" data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="${pad(post.id)} · ${post.title}">
            <img src="${src}" width="864" height="1080" loading="lazy" alt="NARFKiS, публикация ${post.id}: ${post.title}">
          </button>
          <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
        </figure>`;
    }).join('');
  }

  const storyTrack = document.querySelector('[data-nf-stories]');
  if (storyTrack) {
    storyTrack.innerHTML = stories.map((story) => {
      const src = storyPath(story.id);
      return `<img src="${src}" width="720" height="1280" loading="lazy" alt="NARFKiS, сторис ${story.id} из 5: ${story.title}" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="Сторис ${story.id} из 5 · ${story.title}" role="button" tabindex="0">`;
    }).join('');
  }

  const storyMap = document.querySelector('[data-nf-story-map]');
  if (storyMap) {
    storyMap.innerHTML = stories.map((story) => `
      <li><span>${pad(story.id)}</span><div><strong>${story.label}</strong><small>${story.title}</small></div></li>`).join('');
  }

  document.querySelectorAll('[data-nf-stories] [data-case-dialog-open]').forEach((slide) => {
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        slide.click();
      }
    });
  });
})();
