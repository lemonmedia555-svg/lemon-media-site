(() => {
  const publications = [
    { id: 1, title: 'Как безопасно перевезти питомца к ветеринару', rubric: 'Польза', purpose: 'Пошаговая памятка перед поездкой', asset: 'assets/cases/ateris/posts/01.jpg' },
    { id: 2, title: 'Когда питомцу нужен ветеринарный дерматолог', rubric: 'Экспертность', purpose: 'Помочь выбрать профильного специалиста' },
    { id: 3, title: 'Пять мифов об уходе за черепахами', rubric: 'Разбор мифа', purpose: 'Исправить распространённые ошибки', asset: 'assets/cases/ateris/posts/03.jpg' },
    { id: 4, title: 'Признаки боли, которые можно не заметить', rubric: 'Польза', purpose: 'Научить замечать тревожные изменения', asset: 'assets/cases/ateris/posts/04.jpg' },
    { id: 5, title: 'Первый приём щенка или котёнка', rubric: 'Предложение', purpose: 'Объяснить ценность раннего осмотра', asset: 'assets/cases/ateris/posts/05.jpg' },
    { id: 6, title: 'Уход за зубами и профессиональная чистка', rubric: 'Экспертность', purpose: 'Связать профилактику с помощью специалиста' },
    { id: 7, title: 'Миф: домашнему питомцу не нужен ветеринар', rubric: 'Разбор мифа', purpose: 'Объяснить пользу профилактических осмотров', asset: 'assets/cases/ateris/posts/07.jpg' },
    { id: 8, title: 'Когда перед приёмом нужна голодная выдержка', rubric: 'Польза', purpose: 'Подготовить владельца к визиту', asset: 'assets/cases/ateris/posts/08.jpg' },
    { id: 9, title: 'Кто лечит экзотических животных', rubric: 'Экспертность', purpose: 'Показать отличие центра' },
    { id: 10, title: 'Запись к специалисту по экзотическим животным', rubric: 'Предложение', purpose: 'Перевести интерес в следующий шаг', asset: 'assets/cases/ateris/posts/10.jpg' }
  ];

  const pad = (value) => String(value).padStart(2, '0');

  const plan = document.querySelector('[data-ateris-plan]');
  if (plan) {
    plan.innerHTML = publications.map((post) => `
      <li>
        <time datetime="2026-08">${pad(post.id)}</time>
        <div>
          <strong>${post.title}</strong>
          <span>${post.rubric} · ${post.purpose}</span>
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-ateris-feed]');
  if (feed) {
    feed.innerHTML = publications.filter((post) => post.asset).map((post) => `
      <figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${post.asset}" data-case-dialog-alt="${pad(post.id)} · ${post.title}">
          <img src="${post.asset}" width="864" height="1080" loading="lazy" alt="Атерис, публикация ${post.id}: ${post.title}">
        </button>
        <figcaption><strong>${pad(post.id)} · ${post.rubric}</strong><span>${post.title}</span></figcaption>
      </figure>`).join('');
  }

  const makeCarousel = (root, folder, title) => {
    const track = root?.querySelector('[data-ateris-track]');
    if (!track) return;
    track.innerHTML = Array.from({ length: 7 }, (_, index) => {
      const id = index + 1;
      const src = `assets/cases/ateris/${folder}/${pad(id)}.jpg`;
      return `<img src="${src}" width="864" height="1080" loading="lazy" alt="${title}, слайд ${id} из 7" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="${title} · слайд ${id} из 7" role="button" tabindex="0">`;
    }).join('');
  };

  document.querySelectorAll('[data-ateris-carousel]').forEach((carousel) => {
    makeCarousel(carousel, carousel.dataset.aterisCarousel, carousel.dataset.aterisTitle);
  });

  document.querySelectorAll('[data-ateris-track] [data-case-dialog-open]').forEach((slide) => {
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        slide.click();
      }
    });
  });
})();
