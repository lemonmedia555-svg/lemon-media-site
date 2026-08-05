(() => {
  const publications = [
    {
      id: 1,
      rubric: 'Польза',
      title: 'Как подобрать мощность кондиционера под комнату',
      purpose: 'Показать экспертный расчёт и дать сохраняемую подсказку',
      asset: 'assets/cases/alliance-climate/posts/01.webp',
      summary: 'Мощность зависит не только от площади: важны сторона окон, люди, техника, высота потолков и остекление. На примере офиса объясняется, почему слабая модель работает на износ и не даёт нужной прохлады.'
    },
    {
      id: 2,
      rubric: 'Наши работы',
      title: 'Как выглядит наш монтаж',
      purpose: 'Снять страх грязи, кривых трасс и случайной бригады',
      asset: 'assets/cases/alliance-climate/posts/02.webp',
      summary: 'Публикация отвечает на бытовой страх перед установкой: аккуратная трасса, проверка запуска и уборка после работ. Отдельно подчёркнуто, что монтаж выполняет свой штат мастеров.'
    },
    {
      id: 3,
      rubric: 'Разбор мифов',
      title: 'Три ошибки при выборе кондиционера',
      purpose: 'Отстроиться от выбора только по цене и площади',
      asset: 'assets/cases/alliance-climate/posts/03.webp',
      summary: 'Материал разбирает три дорогие ошибки: расчёт только по метражу, экономию на монтаже и погоню за самой дешёвой моделью. Последствия показаны через износ, утечки и будущие расходы.'
    },
    {
      id: 4,
      rubric: 'Отзывы и результат',
      title: '«Подошли с душой» — о культуре работы',
      purpose: 'Подтвердить отношение к клиенту социальным доказательством',
      asset: 'assets/cases/alliance-climate/posts/04.webp',
      summary: 'Отзыв раскрывается через конкретные действия мастера: объяснить решение, выбрать место для блока, проверить технику и не уехать до полного запуска. Автор отзыва в визуале обезличен.'
    },
    {
      id: 5,
      rubric: 'Предложение',
      title: 'Монтаж за один день с гарантией',
      purpose: 'Перевести прогретого читателя к замеру и заявке',
      asset: 'assets/cases/alliance-climate/posts/05.webp',
      summary: 'Оффер собирает замер по фото, выезд специалиста для сложных случаев, монтаж в течение дня и гарантию на работы. Наличие модели и сроки предлагают проверять перед заказом, не обещая лишнего.'
    },
    {
      id: 6,
      rubric: 'Польза',
      title: 'Зачем чистить кондиционер',
      purpose: 'Дать чек‑лист для сохранения и показать сервисную экспертизу',
      asset: 'assets/cases/alliance-climate/posts/06.webp',
      summary: 'Четыре сигнала для обслуживания: запах, слабый холод, капли и новый шум. Текст объясняет, что чистка и проверка системы нужны до поломки в пик жары.'
    },
    {
      id: 7,
      rubric: 'Наши работы',
      title: 'Подбор под сложную планировку',
      purpose: 'Показать инженерный подход и снять страх переплаты',
      asset: 'assets/cases/alliance-climate/posts/07.webp',
      summary: 'Студии, длинные квартиры и офисы нельзя считать по одной формуле. Материал показывает, как подбирают места блоков и трассы, сравнивая одну систему с мультисплит‑решением.'
    },
    {
      id: 8,
      rubric: 'Разбор мифов',
      title: 'Почему дешёвый монтаж обходится дороже',
      purpose: 'Объяснить цену качества без нападения на конкурентов',
      asset: 'assets/cases/alliance-climate/posts/08.webp',
      summary: 'Низкая цена раскрывается через риски: плохая вальцовка, отсутствие вакуумирования, неверная установка и гарантия только на словах. Вывод переводит стоимость монтажа в стоимость спокойной эксплуатации.'
    },
    {
      id: 9,
      rubric: 'Отзывы и результат',
      title: 'Что мы делаем, если попался брак',
      purpose: 'Снять страх остаться один на один с проблемой',
      asset: 'assets/cases/alliance-climate/posts/09.webp',
      summary: 'Вместо обещания мгновенной замены описана реальная гарантийная логика: стандартные случаи ведёт компания, а редкие позиции могут проходить через официальный сервис бренда.'
    },
    {
      id: 10,
      rubric: 'Предложение',
      title: 'Обслуживание перед пиком жары',
      purpose: 'Привести к сервисной заявке до сезонной нагрузки',
      asset: 'assets/cases/alliance-climate/posts/10.webp',
      summary: 'Финальный материал напоминает о профилактике до жары: чистка блоков, проверка утечек и дозаправка при необходимости. Следующий шаг — согласовать визит специалиста.'
    }
  ];

  const stories = [
    { id: 1, role: 'Честный хук', caption: 'Сразу сказать о сезонной очереди — и вызвать вопрос «почему люди ждут?»', alt: 'История о летней очереди на монтаж', asset: 'assets/cases/alliance-climate/stories/01.webp' },
    { id: 2, role: 'Объяснить ценность', caption: 'Сравнить спешку на установке с аккуратной работой надолго.', alt: 'История о качестве установки', asset: 'assets/cases/alliance-climate/stories/02.webp' },
    { id: 3, role: 'Показать первый шаг', caption: 'Объяснить замер по фото и отдельный выезд на сложный объект.', alt: 'История о замере по фото', asset: 'assets/cases/alliance-climate/stories/03.webp' },
    { id: 4, role: 'Дать конкретику', caption: 'Свой штат, проверенные модели, типовой срок и гарантия на монтаж.', alt: 'История о монтаже и гарантии', asset: 'assets/cases/alliance-climate/stories/04.webp' },
    { id: 5, role: 'Перевести в пост', caption: 'Напомнить о заполнении графика и отправить к подробному разбору.', alt: 'История с переходом к посту о монтаже', asset: 'assets/cases/alliance-climate/stories/05.webp' }
  ];

  const pad = (value) => String(value).padStart(2, '0');

  const plan = document.querySelector('[data-ak-plan]');
  if (plan) {
    plan.innerHTML = publications.map((item) => `
      <li>
        <time datetime="2026-08">${pad(item.id)}</time>
        <div><strong>${item.title}</strong><span>${item.rubric} · ${item.purpose}</span></div>
      </li>`).join('');
  }

  const feed = document.querySelector('[data-ak-feed]');
  if (feed) {
    feed.innerHTML = publications.map((item) => `
      <figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${item.asset}" data-case-dialog-alt="${pad(item.id)} · ${item.title}">
          <img src="${item.asset}" width="864" height="1080" loading="lazy" alt="Альянс Климат, публикация ${item.id}: ${item.title}">
        </button>
        <figcaption><strong>${pad(item.id)} · ${item.rubric}</strong><span>${item.title}</span></figcaption>
      </figure>`).join('');
  }

  const storyFlow = document.querySelector('[data-ak-stories]');
  if (storyFlow) {
    storyFlow.innerHTML = stories.map((item) => `
      <li><figure>
        <button type="button" data-case-dialog-open data-case-dialog-src="${item.asset}" data-case-dialog-alt="История ${item.id} · ${item.role}">
          <img src="${item.asset}" width="720" height="1280" loading="lazy" alt="${item.alt}">
        </button>
        <figcaption><span>${pad(item.id)}</span><strong>${item.role}</strong><small>${item.caption}</small></figcaption>
      </figure></li>`).join('');
  }

  const copy = document.querySelector('[data-ak-copy]');
  if (copy) {
    copy.innerHTML = publications.map((item) => `
      <details>
        <summary><span>${pad(item.id)}</span><strong>${item.title}</strong><small>${item.rubric}</small></summary>
        <div class="case-copy-body"><p>${item.summary}</p><p class="case-copy-label">Маркетинговая роль</p><p class="case-copy-slide">${item.purpose}</p></div>
      </details>`).join('');
  }
})();
