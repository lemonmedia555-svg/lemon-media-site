(() => {
  const topics = [
    { number: 1, role: 'История бренда', title: 'Массаж, на который можно прийти с ребёнком', asset: 'assets/cases/taplife/posts/01.jpg' },
    { number: 2, role: 'Польза · карусель', title: 'Детский массаж: с какого возраста и зачем', asset: 'assets/cases/taplife/carousels/02/01.jpg' },
    { number: 3, role: 'Команда', title: 'Кто будет работать с вашим телом', asset: 'assets/cases/taplife/posts/03.jpg' },
    { number: 4, role: 'Разбор мифов · карусель', title: '«Здоровому ребёнку массаж ни к чему»', asset: 'assets/cases/taplife/carousels/04/01.jpg' },
    { number: 5, role: 'Предложение', title: 'Первый визит со скидкой периода', asset: 'assets/cases/taplife/posts/05.jpg' },
    { number: 6, role: 'Закулисье', title: 'Пока вы на кушетке — чем занят ребёнок', asset: 'assets/cases/taplife/posts/06.jpg' },
    { number: 7, role: 'Польза', title: 'Спина и шея уставшего родителя', asset: 'assets/cases/taplife/posts/07.jpg' },
    { number: 8, role: 'Сценарий визита', title: 'Как проходит семейный визит', asset: 'assets/cases/taplife/posts/08.jpg' },
    { number: 9, role: 'Вовлечение', title: 'А вы бы взяли ребёнка с собой?', asset: 'assets/cases/taplife/posts/09.jpg' },
    { number: 10, role: 'Повод дня', title: 'Каникулы: дети дома, спина не отдыхает', asset: 'assets/cases/taplife/posts/10.jpg' }
  ];

  const carousels = [
    {
      id: '02',
      target: '[data-taplife-carousel-02]',
      label: 'Публикация 02 · 7 слайдов',
      title: 'Детский массаж по возрастам',
      description: 'Отдельно объяснили подход для малышей, школьников и подростков — без медицинских обещаний.',
      count: 7
    },
    {
      id: '04',
      target: '[data-taplife-carousel-04]',
      label: 'Публикация 04 · 6 слайдов',
      title: 'Разбор возражения родителей',
      description: 'Снимаем миф о том, что оздоровительный массаж нужен только при выраженном дискомфорте.',
      count: 6
    },
    {
      id: 'bonus',
      target: '[data-taplife-carousel-bonus]',
      label: 'Подарочная карусель · 7 слайдов',
      title: 'Шесть сигналов, что телу пора выдохнуть',
      description: 'Дополнительный сохраняемый материал вне десяти основных публикаций.',
      count: 7,
      bonus: true
    }
  ];

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const planTarget = document.querySelector('[data-taplife-plan]');
  if (planTarget) {
    planTarget.innerHTML = topics.map((topic) => `
      <li>
        <time>${String(topic.number).padStart(2, '0')}</time>
        <div><strong>${escapeHtml(topic.title)}</strong><span>${escapeHtml(topic.role)}</span></div>
      </li>`).join('');
  }

  const feedTarget = document.querySelector('[data-taplife-feed]');
  if (feedTarget) {
    feedTarget.innerHTML = topics.map((topic) => `
      <figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${topic.asset}" data-case-dialog-alt="${escapeHtml(topic.title)}">
          <img src="${topic.asset}" width="720" height="900" loading="lazy" alt="${escapeHtml(topic.title)} — макет TapLife">
        </button>
        <figcaption><b>${String(topic.number).padStart(2, '0')}</b><span>${escapeHtml(topic.role)}</span></figcaption>
      </figure>`).join('');
  }

  const carouselMarkup = (item) => {
    const assets = Array.from({ length: item.count }, (_, index) =>
      `assets/cases/taplife/carousels/${item.id}/${String(index + 1).padStart(2, '0')}.jpg`
    );
    const slides = assets.map((asset, index) => `
      <button type="button" data-case-slide data-case-dialog-open data-case-dialog-src="${asset}" data-case-dialog-alt="${escapeHtml(item.title)} — слайд ${index + 1}">
        <img src="${asset}" width="720" height="900" loading="lazy" alt="${escapeHtml(item.title)}, слайд ${index + 1}">
      </button>`).join('');
    const thumbs = assets.map((asset, index) => `
      <button type="button" data-case-thumb="${index}" aria-label="Открыть слайд ${index + 1}">
        <img src="${asset}" width="72" height="90" loading="lazy" alt="">
      </button>`).join('');

    return `
      <article class="case-carousel-block taplife-carousel-card${item.bonus ? ' is-bonus' : ''}">
        <div class="case-carousel-heading">
          <span class="tag">${escapeHtml(item.label)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </div>
        <div class="case-carousel" data-case-carousel aria-label="${escapeHtml(item.title)}">
          <div class="case-carousel-track">${slides}</div>
          <div class="case-carousel-controls">
            <button type="button" aria-label="Предыдущий слайд" data-case-prev>←</button>
            <span data-case-counter>1 / ${item.count}</span>
            <button type="button" aria-label="Следующий слайд" data-case-next>→</button>
          </div>
          <div class="case-carousel-thumbs" data-case-thumbs>${thumbs}</div>
        </div>
      </article>`;
  };

  carousels.forEach((item) => {
    const target = document.querySelector(item.target);
    if (target) target.innerHTML = carouselMarkup(item);
  });
})();
