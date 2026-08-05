(() => {
  const currentTopics = [
    { number: 1, role: 'Польза', title: 'Почему потеют окна и что с этим делать', asset: 'assets/cases/colorplast/current/posts/01.jpg' },
    { number: 2, role: 'Разбор мифов', title: 'Мифы о пластике и алюминии', asset: 'assets/cases/colorplast/current/posts/02.jpg' },
    { number: 3, role: 'Решение', title: 'Остекление загородного дома в стиле шале', asset: 'assets/cases/colorplast/current/posts/03.jpg' },
    { number: 4, role: 'Польза · карусель', title: 'Как принять окна после монтажа', asset: 'assets/cases/colorplast/current/carousels/04/01.jpg' },
    { number: 5, role: 'Предложение периода', title: 'Остекление балкона под ключ до холодов', asset: 'assets/cases/colorplast/current/posts/05.jpg' },
    { number: 6, role: 'Процесс', title: 'Материалы и поставщики — почему это важно клиенту', asset: 'assets/cases/colorplast/current/posts/06.jpg' },
    { number: 7, role: 'Польза · карусель', title: 'Можно ли ставить окна зимой', asset: 'assets/cases/colorplast/current/carousels/07/01.jpg' },
    { number: 8, role: 'Решение · карусель', title: 'Замена старых окон — до и после', asset: 'assets/cases/colorplast/current/carousels/08/01.jpg' },
    { number: 9, role: 'Вовлечение', title: 'Что аудитория поменяла бы первым при ремонте', asset: 'assets/cases/colorplast/current/posts/09.jpg' },
    { number: 10, role: 'Польза', title: 'Почему дует из закрытого окна', asset: 'assets/cases/colorplast/current/posts/10.jpg' },
    { number: 11, role: 'Предложение периода', title: 'Тёплые окна к отопительному сезону', asset: 'assets/cases/colorplast/current/posts/11.jpg' },
    { number: 12, role: 'Отзыв', title: 'Отзыв об окнах в частном доме', asset: 'assets/cases/colorplast/current/posts/12.jpg' },
    { number: 13, role: 'Сравнение · карусель', title: 'Пластиковая или алюминиевая дверь', asset: 'assets/cases/colorplast/current/carousels/13/01.jpg' },
    { number: 14, role: 'Разбор мифов', title: 'Мифы о панорамном остеклении', asset: 'assets/cases/colorplast/current/posts/14.jpg' },
    { number: 15, role: 'Решение · карусель', title: 'Коммерческое остекление — до и после', asset: 'assets/cases/colorplast/current/carousels/15/01.jpg' },
    { number: 16, role: 'Вовлечение', title: 'Какая проблема с окнами раздражает больше всего', asset: 'assets/cases/colorplast/current/posts/16.jpg' },
    { number: 17, role: 'Обзор решения', title: 'Портальные системы и панорамное остекление', asset: 'assets/cases/colorplast/current/posts/17.jpg' },
    { number: 18, role: 'Предложение периода', title: 'Акция периода и бесплатный замер', asset: 'assets/cases/colorplast/current/posts/18.jpg' },
    { number: 19, role: 'Отзыв', title: 'Отзыв о сложной работе и сервисе', asset: 'assets/cases/colorplast/current/posts/19.jpg' },
    { number: 20, role: 'Процесс', title: 'Как проходит замер и почему важна точность', asset: 'assets/cases/colorplast/current/posts/20.jpg' }
  ];

  const previousTopics = [
    { number: 1, role: 'Польза', title: 'Окна для дома в жару и мороз', asset: 'assets/cases/colorplast/previous/posts/01.jpg' },
    { number: 2, role: 'Разбор мифов', title: 'Три мифа о цвете окон', asset: 'assets/cases/colorplast/previous/posts/02.jpg' },
    { number: 3, role: 'Решение', title: 'Остекление веранды под ключ', asset: 'assets/cases/colorplast/previous/posts/03.jpg' },
    { number: 4, role: 'Польза · карусель', title: '6 вещей до заказа окон', asset: 'assets/cases/colorplast/previous/carousels/04/01.jpg' },
    { number: 5, role: 'Предложение периода', title: 'Бесплатный замер периода кампании', asset: 'assets/cases/colorplast/previous/posts/05.jpg' },
    { number: 6, role: 'Производство', title: 'Профиль в разных цветах', asset: 'assets/cases/colorplast/previous/posts/06.jpg' },
    { number: 7, role: 'Отзыв', title: 'Отзыв об установке', asset: 'assets/cases/colorplast/previous/posts/07.jpg' },
    { number: 8, role: 'Решение · карусель', title: 'Из хранилища в комнату', asset: 'assets/cases/colorplast/previous/carousels/08/01.jpg' },
    { number: 9, role: 'Вовлечение', title: 'Какой цвет окон выбрали бы вы', asset: 'assets/cases/colorplast/previous/posts/09.jpg' },
    { number: 10, role: 'Польза', title: 'Профиль окна: за что вы платите', asset: 'assets/cases/colorplast/previous/posts/10.jpg' }
  ];

  const currentCarousels = [
    { id: '04', label: 'Публикация 04', title: 'Как принять окна после монтажа', base: 'assets/cases/colorplast/current/carousels/04' },
    { id: '07', label: 'Публикация 07', title: 'Можно ли ставить окна зимой', base: 'assets/cases/colorplast/current/carousels/07' },
    { id: '08', label: 'Публикация 08', title: 'Замена старых окон — до и после', base: 'assets/cases/colorplast/current/carousels/08' },
    { id: '13', label: 'Публикация 13', title: 'Пластиковая или алюминиевая дверь', base: 'assets/cases/colorplast/current/carousels/13' },
    { id: '15', label: 'Публикация 15', title: 'Коммерческое остекление — до и после', base: 'assets/cases/colorplast/current/carousels/15' },
    { id: 'bonus', label: 'Подарочная карусель', title: '7 решений для загородного дома', base: 'assets/cases/colorplast/current/carousels/bonus', bonus: true }
  ];

  const previousCarousels = [
    { id: '04', label: 'Публикация 04', title: '6 вещей до заказа окон', base: 'assets/cases/colorplast/previous/carousels/04' },
    { id: '08', label: 'Публикация 08', title: 'Из хранилища в комнату', base: 'assets/cases/colorplast/previous/carousels/08' },
    { id: 'bonus', label: 'Подарочная карусель', title: '6 ошибок остекления балкона', base: 'assets/cases/colorplast/previous/carousels/bonus', bonus: true }
  ];

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const feedMarkup = (topics, cycle) => topics.map((topic) => `
    <figure>
      <button type="button" data-case-dialog-open data-case-dialog-src="${topic.asset}" data-case-dialog-alt="${escapeHtml(topic.title)}">
        <img src="${topic.asset}" width="720" height="900" loading="lazy" alt="${escapeHtml(topic.title)} — макет Colorplast">
      </button>
      <figcaption><b>${String(topic.number).padStart(2, '0')}</b><span>${escapeHtml(topic.role)}</span><small>${cycle}</small></figcaption>
    </figure>`).join('');

  const carouselMarkup = (item, cycleLabel) => {
    const slides = Array.from({ length: 7 }, (_, index) => `${item.base}/${String(index + 1).padStart(2, '0')}.jpg`);
    const buttons = slides.map((asset, index) => `
      <button type="button" data-case-slide data-case-dialog-open data-case-dialog-alt="${escapeHtml(item.title)} — слайд ${index + 1}">
        <img src="${asset}" width="720" height="900" loading="lazy" alt="${escapeHtml(item.title)}, слайд ${index + 1}">
      </button>`).join('');
    const thumbs = slides.map((asset, index) => `
      <button type="button" data-case-thumb="${index}" aria-label="Открыть слайд ${index + 1}"><img src="${asset}" width="72" height="90" loading="lazy" alt=""></button>`).join('');

    return `
      <article class="case-carousel-block colorplast-carousel-card${item.bonus ? ' is-bonus' : ''}">
        <div class="case-carousel-heading">
          <span class="tag">${escapeHtml(item.label)} · 7 слайдов</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${cycleLabel}${item.bonus ? ' · отдельно от основного числа публикаций' : ''}</p>
        </div>
        <div class="case-carousel" data-case-carousel aria-label="${escapeHtml(item.title)}">
          <div class="case-carousel-track">${buttons}</div>
          <div class="case-carousel-controls"><button type="button" aria-label="Предыдущий слайд" data-case-prev>←</button><span data-case-counter>1 / 7</span><button type="button" aria-label="Следующий слайд" data-case-next>→</button></div>
          <div class="case-carousel-thumbs" data-case-thumbs>${thumbs}</div>
        </div>
      </article>`;
  };

  const planTarget = document.querySelector('[data-colorplast-plan]');
  const currentFeedTarget = document.querySelector('[data-colorplast-current-feed]');
  const currentCarouselsTarget = document.querySelector('[data-colorplast-current-carousels]');
  const previousFeedTarget = document.querySelector('[data-colorplast-previous-feed]');
  const previousCarouselsTarget = document.querySelector('[data-colorplast-previous-carousels]');

  if (planTarget) {
    planTarget.innerHTML = currentTopics.map((topic) => `
      <li><time>${String(topic.number).padStart(2, '0')}</time><div><strong>${escapeHtml(topic.title)}</strong><span>${escapeHtml(topic.role)}</span></div></li>`).join('');
  }
  if (currentFeedTarget) currentFeedTarget.innerHTML = feedMarkup(currentTopics, 'новый цикл');
  if (currentCarouselsTarget) currentCarouselsTarget.innerHTML = currentCarousels.map((item) => carouselMarkup(item, 'Новый цикл')).join('');
  if (previousFeedTarget) previousFeedTarget.innerHTML = feedMarkup(previousTopics, 'первый цикл');
  if (previousCarouselsTarget) previousCarouselsTarget.innerHTML = previousCarousels.map((item) => carouselMarkup(item, 'Первый цикл')).join('');
})();
