(() => {
  const publications = [
    { id: 1, format: 'Пост', rubric: 'Витрина товара', title: 'Свежий завоз в Липниках', purpose: 'Показать, что на прилавке свежее', asset: 'assets/cases/lipniki/posts/01.webp' },
    { id: 2, format: 'Пост', rubric: 'Польза', title: 'Как выбрать свежую рыбу', purpose: 'Дать сохраняемую подсказку и показать экспертность', asset: 'assets/cases/lipniki/posts/02.webp' },
    { id: 3, format: 'Пост', rubric: 'Вовлечение', title: 'Мясо, рыба или овощи‑фрукты', purpose: 'Разговорить аудиторию и узнать спрос', asset: 'assets/cases/lipniki/posts/03.webp' },
    { id: 4, format: 'Пост', rubric: 'Витрина товара', title: 'Мясо своё — всегда свежее', purpose: 'Показать прямые поставки и усилить доверие', asset: 'assets/cases/lipniki/posts/04.webp' },
    { id: 5, format: 'Пост', rubric: 'Предложение', title: 'Хиты недели', purpose: 'Собрать популярные продукты в один повод зайти', asset: 'assets/cases/lipniki/posts/05.webp' },
    { id: 6, format: 'Карусель · 6 слайдов', rubric: 'Польза', title: 'Быстрые ужины после смены', purpose: 'Дать сохраняемые идеи и показать продукты в использовании', asset: 'assets/cases/lipniki/carousels/06/01.webp' },
    { id: 7, format: 'Пост', rubric: 'Вовлечение', title: 'Шашлык или рыба на выходные', purpose: 'Вызвать простой выбор и комментарии', asset: 'assets/cases/lipniki/posts/07.webp' },
    { id: 8, format: 'Карусель · 7 слайдов', rubric: 'Витрина товара', title: 'Рыбный прилавок Липников', purpose: 'Показать ассортимент через способы приготовления', asset: 'assets/cases/lipniki/carousels/08/01.webp' },
    { id: 9, format: 'Пост', rubric: 'Предложение', title: 'Лето — режем арбузы', purpose: 'Создать сезонный повод зайти сегодня', asset: 'assets/cases/lipniki/posts/09.webp' },
    { id: 10, format: 'Пост', rubric: 'Витрина товара', title: 'Быстрый ужин без хлопот', purpose: 'Показать решение для занятых покупателей', asset: 'assets/cases/lipniki/posts/10.webp' }
  ];

  const carousels = {
    '06': { directory: 'assets/cases/lipniki/carousels/06', slides: [1, 2, 3, 4, 5, 6], title: 'Быстрые ужины после смены' },
    '08': { directory: 'assets/cases/lipniki/carousels/08', slides: [1, 2, 3, 4, 5, 6, 7], title: 'Рыбный прилавок Липников' },
    gift: { directory: 'assets/cases/lipniki/gift', slides: [1, 2, 3, 4, 5, 6, 7], title: 'Список покупок на неделю' }
  };

  const pad = (value) => String(value).padStart(2, '0');

  const plan = document.querySelector('[data-lp-plan]');
  if (plan) {
    plan.innerHTML = publications.map((item) => `
      <li><time datetime="2026-08">${pad(item.id)}</time><div><strong>${item.title}</strong><span>${item.format} · ${item.rubric} · ${item.purpose}</span></div></li>`).join('');
  }

  const feed = document.querySelector('[data-lp-feed]');
  if (feed) {
    feed.innerHTML = publications.map((item) => `
      <figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${item.asset}" data-case-dialog-alt="${pad(item.id)} · ${item.title}">
          <img src="${item.asset}" width="864" height="1080" loading="lazy" alt="Магазин Липники, публикация ${item.id}: ${item.title}">
        </button>
        <figcaption><strong>${pad(item.id)} · ${item.rubric}</strong><span>${item.title}</span></figcaption>
      </figure>`).join('');
  }

  document.querySelectorAll('[data-lp-carousel]').forEach((track) => {
    const key = track.getAttribute('data-lp-carousel');
    const carousel = carousels[key];
    if (!carousel) return;
    track.innerHTML = carousel.slides.map((slide) => {
      const src = `${carousel.directory}/${pad(slide)}.webp`;
      return `<img src="${src}" width="864" height="1080" loading="lazy" alt="${carousel.title}, слайд ${slide} из ${carousel.slides.length}" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="${carousel.title} · слайд ${slide} из ${carousel.slides.length}" role="button" tabindex="0">`;
    }).join('');
  });

  document.querySelectorAll('[data-lp-carousel] [data-case-dialog-open]').forEach((slide) => {
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        slide.click();
      }
    });
  });
})();
