(() => {
  const publications = [
    { id: 1, format: 'Карусель · 7 слайдов', rubric: 'Польза', title: 'Гранит или мрамор: что выбрать', purpose: 'Сравнить материалы по понятным критериям' },
    { id: 2, format: 'Пост', rubric: 'Работы', title: 'Семейный комплекс', purpose: 'Показать состав комплексного решения' },
    { id: 3, format: 'Карусель · 7 слайдов', rubric: 'Работы', title: 'Семейный комплекс: от задачи до решения', purpose: 'Разобрать проект последовательно' },
    { id: 4, format: 'Пост', rubric: 'Закулисье', title: 'Свой камень и собственное производство', purpose: 'Показать основу качества и процесса' },
    { id: 5, format: 'Пост', rubric: 'Предложение', title: 'Старт линейки эконом-моделей', purpose: 'Показать доступный вариант без точной цены' },
    { id: 6, format: 'Пост', rubric: 'Польза', title: 'Когда устанавливать памятник', purpose: 'Ответить на частый вопрос по срокам' },
    { id: 7, format: 'Пост', rubric: 'Доверие', title: 'Отзыв о семейном заказе', purpose: 'Снизить тревогу через опыт клиента' },
    { id: 8, format: 'Карусель · 7 слайдов', rubric: 'Витрина', title: 'Почему один памятник дороже другого', purpose: 'Объяснить факторы стоимости без прайса' },
    { id: 9, format: 'Пост', rubric: 'Мифы', title: 'Три мифа о памятниках', purpose: 'Разобрать распространённые заблуждения' },
    { id: 10, format: 'Пост', rubric: 'Работы', title: 'Индивидуальный проект', purpose: 'Показать возможность решения под задачу' },
    { id: 11, format: 'Пост', rubric: 'Витрина', title: 'Мраморный комплект', purpose: 'Показать готовую комплектацию' },
    { id: 12, format: 'Карусель · 7 слайдов', rubric: 'Польза', title: 'Какую форму выбрать', purpose: 'Сравнить четыре типа конструкции' },
    { id: 13, format: 'Пост', rubric: 'Витрина', title: 'Портрет и барельеф', purpose: 'Объяснить варианты персонализации' },
    { id: 14, format: 'Пост', rubric: 'Закулисье', title: 'Шоурум: больше 30 образцов', purpose: 'Показать возможность выбора вживую' },
    { id: 15, format: 'Пост', rubric: 'Доверие', title: 'Отзыв о работе', purpose: 'Подтвердить внимательное отношение' },
    { id: 16, format: 'Пост', rubric: 'Мифы', title: 'Правда ли, что самому дешевле', purpose: 'Разобрать скрытые этапы и риски' },
    { id: 17, format: 'Карусель · 7 слайдов', rubric: 'Предложение', title: 'Линейка эконом-памятников', purpose: 'Объяснить экономию без потери аккуратности' },
    { id: 18, format: 'Пост', rubric: 'Польза', title: 'Уход за памятником', purpose: 'Дать сохраняемую инструкцию' },
    { id: 19, format: 'Пост', rubric: 'Витрина', title: 'Благоустройство', purpose: 'Показать услугу как комплекс' },
    { id: 20, format: 'Пост', rubric: 'Предложение', title: 'Сезонное предложение', purpose: 'Дать понятный повод обратиться' }
  ];

  const gallery = [
    { id: 1, rubric: 'Польза', title: 'Гранит или мрамор', asset: 'assets/cases/ritual-s/carousels/01/01.webp' },
    { id: 4, rubric: 'Закулисье', title: 'Свой камень', asset: 'assets/cases/ritual-s/posts/04.webp' },
    { id: 5, rubric: 'Предложение', title: 'Старт эконом-линии', asset: 'assets/cases/ritual-s/posts/05.webp' },
    { id: 7, rubric: 'Доверие', title: 'Слова семьи', asset: 'assets/cases/ritual-s/posts/07.webp' },
    { id: 8, rubric: 'Витрина', title: 'Факторы стоимости', asset: 'assets/cases/ritual-s/carousels/08/01.webp' },
    { id: 9, rubric: 'Мифы', title: 'Три мифа о памятниках', asset: 'assets/cases/ritual-s/posts/09.webp' },
    { id: 12, rubric: 'Польза', title: 'Какую форму выбрать', asset: 'assets/cases/ritual-s/carousels/12/01.webp' },
    { id: 15, rubric: 'Доверие', title: 'Отзыв о работе', asset: 'assets/cases/ritual-s/posts/15.webp' },
    { id: 16, rubric: 'Мифы', title: 'Дешевле самому?', asset: 'assets/cases/ritual-s/posts/16.webp' },
    { id: 17, rubric: 'Предложение', title: 'Эконом-памятники', asset: 'assets/cases/ritual-s/carousels/17/01.webp' }
  ];

  const carousels = {
    '01': { title: 'Гранит или мрамор', directory: 'assets/cases/ritual-s/carousels/01' },
    '08': { title: 'Почему один памятник дороже другого', directory: 'assets/cases/ritual-s/carousels/08' },
    '12': { title: 'Какую форму выбрать', directory: 'assets/cases/ritual-s/carousels/12' },
    '17': { title: 'Эконом-линия', directory: 'assets/cases/ritual-s/carousels/17' }
  };

  const pad = (value) => String(value).padStart(2, '0');

  const plan = document.querySelector('[data-rs-plan]');
  if (plan) {
    plan.innerHTML = publications.map((item) => `
      <li><time datetime="2026-07">${pad(item.id)}</time><div><strong>${item.title}</strong><span>${item.format} · ${item.rubric} · ${item.purpose}</span></div></li>`).join('');
  }

  const feed = document.querySelector('[data-rs-feed]');
  if (feed) {
    feed.innerHTML = gallery.map((item) => `
      <figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${item.asset}" data-case-dialog-alt="${pad(item.id)} · ${item.title}">
          <img src="${item.asset}" width="864" height="1080" loading="lazy" alt="Ритуал-С, публикация ${item.id}: ${item.title}">
        </button>
        <figcaption><strong>${pad(item.id)} · ${item.rubric}</strong><span>${item.title}</span></figcaption>
      </figure>`).join('');
  }

  document.querySelectorAll('[data-rs-carousel]').forEach((track) => {
    const key = track.getAttribute('data-rs-carousel');
    const carousel = carousels[key];
    if (!carousel) return;
    track.innerHTML = Array.from({ length: 7 }, (_, index) => {
      const slide = index + 1;
      const src = `${carousel.directory}/${pad(slide)}.webp`;
      return `<img src="${src}" width="864" height="1080" loading="lazy" alt="${carousel.title}, слайд ${slide} из 7" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="${carousel.title} · слайд ${slide} из 7" role="button" tabindex="0">`;
    }).join('');
  });

  document.querySelectorAll('[data-rs-carousel] [data-case-dialog-open]').forEach((slide) => {
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        slide.click();
      }
    });
  });
})();
