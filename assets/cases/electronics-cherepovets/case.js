(() => {
  const publications = [
    { id: 1, format: 'Карусель', rubric: 'Польза', title: 'Стекло или гидрогель — как выбрать защиту экрана', purpose: 'Объяснить разницу и помочь выбрать', asset: 'assets/cases/electronics-cherepovets/carousels/01/01.webp' },
    { id: 2, format: 'Пост', rubric: 'Вовлечение', title: 'Сколько зарядок живёт у вас дома', purpose: 'Собрать реакции и комментарии', asset: 'assets/cases/electronics-cherepovets/posts/02.webp' },
    { id: 3, format: 'Пост', rubric: 'Разбор мифов', title: 'Три мифа о защите смартфона', purpose: 'Снять сомнение «и так сойдёт»', asset: 'assets/cases/electronics-cherepovets/posts/03.webp' },
    { id: 4, format: 'Карусель', rubric: 'Витрина товара', title: 'Пять вещей для нового смартфона к учёбе', purpose: 'Прогреть к сезонному комплекту', asset: 'assets/cases/electronics-cherepovets/carousels/04/01.webp' },
    { id: 5, format: 'Пост', rubric: 'Предложение', title: 'Учебный год: защитим телефон школьника', purpose: 'Привести к заявке на защиту', asset: 'assets/cases/electronics-cherepovets/posts/05.webp' },
    { id: 6, format: 'Пост', rubric: 'Польза', title: 'Какая ТВ-антенна поймает сигнал', purpose: 'Показать экспертный подбор', asset: 'assets/cases/electronics-cherepovets/posts/06.webp' },
    { id: 7, format: 'Пост', rubric: 'Витрина товара', title: 'Беспроводные наушники Hoco W50', purpose: 'Показать конкретный товар', asset: 'assets/cases/electronics-cherepovets/posts/07.webp' },
    { id: 8, format: 'Пост', rubric: 'Вовлечение', title: 'Что решает при выборе наушников', purpose: 'Узнать приоритеты аудитории', asset: 'assets/cases/electronics-cherepovets/posts/08.webp' },
    { id: 9, format: 'Пост', rubric: 'Разбор мифов', title: 'Мифы об интернете и тарифах', purpose: 'Снять сомнения и подвести к подбору', asset: 'assets/cases/electronics-cherepovets/posts/09.webp' },
    { id: 10, format: 'Пост', rubric: 'Предложение', title: 'Видеорегистратор Viper Orion Duo по акции', purpose: 'Привести к заявке на автоэлектронику', asset: 'assets/cases/electronics-cherepovets/posts/10.webp' }
  ];

  const carousels = {
    '01': {
      directory: 'assets/cases/electronics-cherepovets/carousels/01',
      slides: [1, 3, 4, 5, 6, 7],
      title: 'Стекло или гидрогель'
    },
    '04': {
      directory: 'assets/cases/electronics-cherepovets/carousels/04',
      slides: [1, 2, 3, 4, 5, 6, 7],
      title: 'Пять вещей для нового смартфона к учёбе'
    },
    gift: {
      directory: 'assets/cases/electronics-cherepovets/gift',
      slides: [1, 2, 3, 4, 5, 6, 7],
      title: 'Шпаргалка по батарейкам'
    }
  };

  const pad = (value) => String(value).padStart(2, '0');

  const plan = document.querySelector('[data-ec-plan]');
  if (plan) {
    plan.innerHTML = publications.map((item) => `
      <li>
        <time datetime="2026-08">${pad(item.id)}</time>
        <div>
          <strong>${item.title}</strong>
          <span>${item.format} · ${item.rubric} · ${item.purpose}</span>
        </div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-ec-feed]');
  if (feed) {
    feed.innerHTML = publications.map((item) => `
      <figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${item.asset}" data-case-dialog-alt="${pad(item.id)} · ${item.title}">
          <img src="${item.asset}" width="864" height="1080" loading="lazy" alt="ЭЛЕКТРОНИКС, публикация ${item.id}: ${item.title}">
        </button>
        <figcaption><strong>${pad(item.id)} · ${item.rubric}</strong><span>${item.title}</span></figcaption>
      </figure>`).join('');
  }

  document.querySelectorAll('[data-ec-carousel]').forEach((track) => {
    const key = track.getAttribute('data-ec-carousel');
    const carousel = carousels[key];
    if (!carousel) return;

    track.innerHTML = carousel.slides.map((slide) => {
      const src = `${carousel.directory}/${pad(slide)}.webp`;
      return `<img src="${src}" width="864" height="1080" loading="lazy" alt="${carousel.title}, слайд ${slide} из 7" data-case-slide data-case-dialog-open data-case-dialog-src="${src}" data-case-dialog-alt="${carousel.title} · слайд ${slide} из 7" role="button" tabindex="0">`;
    }).join('');
  });

  document.querySelectorAll('[data-ec-carousel] [data-case-dialog-open]').forEach((slide) => {
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        slide.click();
      }
    });
  });
})();
