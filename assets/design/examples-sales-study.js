const sequence = (directory, count, extension) => Array.from({ length: count }, (_, index) => `${directory}/${String(index + 1).padStart(2, '0')}.${extension}`);

const makePosts = (directory, extension, ids, titles, roles = [], descriptions = []) => ids.map((id, index) => ({
  src: `${directory}/${String(id).padStart(2, '0')}.${extension}`,
  publicationIndex: id - 1,
  title: titles[index] || `Публикация ${id}`,
  role: roles[index] || 'Часть связного контент-плана',
  description: descriptions[index] || ''
}));

const makeGroup = (title, sources, role, description, copyIndex = -1) => ({
  title,
  copyIndex,
  items: sources.map((src, index) => ({
    src,
    title,
    role: `${role} · экран ${index + 1} из ${sources.length}`,
    description,
    copyIndex
  }))
});

const defaultStoryRoles = ['Зацепить внимание', 'Объяснить тему', 'Показать решение', 'Дать конкретику', 'Перевести к основному материалу'];

const makeStories = (title, sources, titles = [], roles = [], descriptions = []) => ({
  title,
  items: sources.map((src, index) => ({
    src,
    title: titles[index] || `${title}: экран ${index + 1}`,
    role: roles[index] || defaultStoryRoles[index] || 'Продолжить историю',
    description: descriptions[index] || 'Последовательность работает как единый мини-сценарий, а не как набор несвязанных экранов.'
  }))
});

const LEGACY_PROJECTS = [
  {
    name: 'Саратов Кухни',
    sector: 'Кухни и интерьер',
    categories: ['product'],
    package: '15 публикаций · 5 каруселей · 5 историй',
    note: 'Модели, реальные проекты, польза и предложения собраны в одну визуальную систему.',
    formats: {
      post: {
        groups: [{
          title: 'Публикации',
          items: makePosts('assets/cases/saratov-kitchens-2026-08/posts', 'webp', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [
            'Как выбрать кухню и не переделывать через год',
            'Двухцветная классика на годы',
            'Модель Беверли - теплая классика',
            '«Кухня на заказ - это переплата»',
            'Бесплатный замер и 3D-проект',
            'Маленькая кухня, которая выглядит на миллион',
            'Четыре вещи, которые нужно проверить до заказа кухни',
            'Кухня без ручек от 85 000 рублей',
            'Серая кухня с барной стойкой',
            'Мифы о кухне на заказ',
            'Кухни, которые выбирают чаще',
            'Из чего делают фасады',
            'Зеленая кухня, от которой не устаешь',
            'Модель Прованс от 110 000 рублей',
            'Кухня в рассрочку 0%'
          ], [
            'Дать чек-лист перед заказом', 'Показать реальный проект', 'Показать модель и цену', 'Снять ценовое возражение', 'Подвести к замеру',
            'Показать решение для маленькой площади', 'Предупредить дорогие ошибки', 'Показать модель и цену', 'Показать реальный проект', 'Снять возражения',
            'Помочь с выбором', 'Объяснить материалы', 'Показать реальный проект', 'Показать модель и цену', 'Подвести к обращению'
          ])
        }]
      },
      carousel: {
        groups: [
          makeGroup('Маленькая кухня-студия', sequence('assets/cases/saratov-kitchens-2026-08/carousels/06', 7, 'webp'), 'Реальный проект', 'Планировка, материалы и приемы, которые визуально расширяют небольшую кухню.', 5),
          makeGroup('Что проверить до заказа кухни', sequence('assets/cases/saratov-kitchens-2026-08/carousels/07', 6, 'webp'), 'Польза', 'Чек-лист помогает читателю подготовиться к заказу и сохранить материал.', 6),
          makeGroup('Мифы о кухне на заказ', sequence('assets/cases/saratov-kitchens-2026-08/carousels/10', 7, 'webp'), 'Разбор возражений', 'Сложные вопросы разобраны по одному на каждом экране.', 9),
          makeGroup('Кухни, которые выбирают чаще', sequence('assets/cases/saratov-kitchens-2026-08/carousels/11', 7, 'webp'), 'Помощь с выбором', 'Подборка моделей дает ориентиры без перегруза каталожной информацией.', 10),
          makeGroup('Зеленая кухня: реальный проект', sequence('assets/cases/saratov-kitchens-2026-08/carousels/13', 7, 'webp'), 'Реальный проект', 'Готовая кухня раскрывается через детали, материалы и результат.', 12)
        ]
      },
      story: { groups: [makeStories('Мини-прогрев к замеру', sequence('assets/cases/saratov-kitchens-2026-08/stories', 5, 'webp'))] }
    }
  },
  {
    name: 'FR-moto',
    sector: 'Технический продукт',
    categories: ['product'],
    package: '10 публикаций · 2 карусели · 5 историй',
    note: 'Сложный продукт объяснен через выбор, применение и реальные ситуации владельцев техники.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/fr-moto/posts', 'jpg', [1, 2, 4, 5, 6, 7, 8, 10], [
        'Сделано в России: от идеи и чертежа до хард-теста',
        'Защита, которую не жалко проверить двойной курвой',
        'Защита рук - а чего так дорого?',
        'Руль, который не сломается',
        'Заказал сегодня - уехало завтра',
        'Гонщики выбирают FR-moto',
        'Встает на любой эндуро и кросс: подберем версию',
        'Признавайся: на чем катаешь?'
      ], ['Показать производство', 'Показать продукт в деле', 'Снять ценовое возражение', 'Объяснить надежность', 'Снять сомнение о сроках', 'Дать социальное доказательство', 'Помочь с совместимостью', 'Вовлечь в диалог']) }] },
      carousel: { groups: [
        makeGroup('Как выбрать защиту рук для эндуро', sequence('assets/cases/fr-moto/carousels/03', 7, 'jpg'), 'Польза', 'Критерии выбора разложены по шагам - материал удобно сохранить перед покупкой.', 2),
        makeGroup('Три собственные разработки FR-moto', sequence('assets/cases/fr-moto/carousels/09', 5, 'jpg'), 'Продукт', 'Линейка продуктов показана через конкретные отличия и задачи.', 8)
      ] },
      story: { groups: [makeStories('Мини-прогрев о продукте', sequence('assets/cases/fr-moto/stories', 5, 'jpg'))] }
    }
  },
  {
    name: 'BORODULINA TAPE',
    sector: 'Экспертные услуги · красота и здоровье',
    categories: ['expert'],
    package: '10 публикаций · 2 карусели · 5 историй',
    note: 'Экспертный контент без постоянной продажи: польза, доверие, услуги и мини-прогрев.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/borodulina-tape/posts', 'webp', [1, 2, 4, 5, 6, 8, 9, 10], [
        'На что я смотрю летом: лицо и тело в жару',
        'Почему я против подхода «наклеил и побежал»',
        'Как тейп, массаж и движение усиливают друг друга',
        'Кинезиофитнес - это не обычный фитнес',
        'Что всегда со мной на приеме: рабочий набор',
        'Опрос: о чем рассказать подробнее',
        'Можно ли использовать тейп в жару',
        'Летний повод начать'
      ], ['Связать тему с сезоном', 'Показать отличие подхода', 'Показать систему работы', 'Объяснить услугу', 'Усилить доверие', 'Собрать обратную связь', 'Ответить на вопрос', 'Подвести к обращению']) }] },
      carousel: { groups: [
        makeGroup('Три ошибки с тейпом на лице', sequence('assets/cases/borodulina-tape/carousels/03', 7, 'webp'), 'Польза', 'Эксперт объясняет причины и дает материал, который хочется сохранить.', 2),
        makeGroup('Что видно на диагностике', sequence('assets/cases/borodulina-tape/carousels/07', 7, 'webp'), 'Экспертность', 'Диагностика раскрыта через наблюдения специалиста и понятную пользу для клиента.', 6)
      ] },
      story: { groups: [makeStories('Мини-прогрев к диагностике', sequence('assets/cases/borodulina-tape/stories', 5, 'webp'))] }
    }
  },
  {
    name: 'ЧЕБУССЭР',
    sector: 'Товар · локальный общепит',
    categories: ['product'],
    package: '10 публикаций · 2 карусели · 5 историй',
    note: 'Ассортимент, польза, доверие и первый заказ собраны в связную систему для локального бизнеса.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/chebusser/posts', 'jpg', [1, 2, 4, 5, 7, 8, 9, 10], [
        '13 начинок. Любимая - одна?', 'Наш хит: чебурек с говядиной', 'Жарим только после заказа', 'Первый заказ',
        'Что добавить в меню?', 'Как применить промокод', '190 граммов - перекус?', 'Подарок к первому заказу'
      ], ['Помочь с выбором', 'Вызвать желание покупки', 'Усилить доверие', 'Подвести к заказу', 'Вовлечь в диалог', 'Объяснить механику', 'Отстроить предложение', 'Подвести к заказу']) }] },
      carousel: { groups: [
        makeGroup('Как съесть чебурек и не испачкаться', sequence('assets/cases/chebusser/carousels/03', 7, 'jpg'), 'Польза', 'Легкий сохраняемый материал показывает продукт в живой ситуации.', 2),
        makeGroup('Чебурек, который вы не пробовали', sequence('assets/cases/chebusser/carousels/06', 7, 'jpg'), 'Продукт', 'Новинка раскрывается через вкус, состав и повод попробовать.', 5)
      ] },
      story: { groups: [makeStories('Мини-прогрев к первому заказу', sequence('assets/cases/chebusser/stories', 5, 'jpg'))] }
    }
  },
  {
    name: 'Сергей Глибин',
    sector: 'Эксперт · ведущий событий',
    categories: ['services'],
    package: '20 публикаций · 5 каруселей · 5 историй',
    note: 'Личность, опыт и услуга раскрываются последовательно и остаются узнаваемыми во всех форматах.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/sergey-glibin/posts', 'jpg', [2, 3, 4, 5, 8, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20], [
        '«Ведущий - это тамада с конкурсами»?', 'Свадьба этого сезона', 'Какой свадебный конкурс бесит вас больше всего', 'Свадебный сезон в разгаре: как не потерять дату',
        'Как ведущий держит вечер, когда все идет не по плану', 'От чего зависит стоимость ведущего', 'Свадьба мечты: город или загород', 'Саксофонист в подарок к программе',
        'Когда на свадьбе звучит саксофон', 'Тайминг, который не дает вечеру провиснуть', 'Тот самый гость на свадьбе', '«Нам хватит диджея, зачем ведущий?»',
        'Что важнее на свадьбе: фото или атмосфера', 'Что обсудить с ведущим за месяц до свадьбы', 'Осень и зима бронируются летом'
      ], ['Разбор мифа', 'Показать работу', 'Вовлечь', 'Подвести к бронированию', 'Показать компетенцию', 'Объяснить цену', 'Вовлечь', 'Показать предложение', 'Показать атмосферу', 'Дать пользу', 'Раскрыть личность', 'Снять возражение', 'Вовлечь', 'Дать пользу', 'Подвести к бронированию']) }] },
      carousel: { groups: [
        makeGroup('Как выбрать ведущего на свадьбу', sequence('assets/cases/sergey-glibin/carousels/01', 7, 'jpg'), 'Польза', 'Пять признаков помогают сравнить ведущих до разговора и предоплаты.', 0),
        makeGroup('Семь вопросов ведущему до предоплаты', sequence('assets/cases/sergey-glibin/carousels/06', 7, 'jpg'), 'Польза', 'Вопросы снимают тревогу и помогают подготовиться к встрече.', 5),
        makeGroup('Свадьба за городом под Петербургом', sequence('assets/cases/sergey-glibin/carousels/07', 6, 'jpg'), 'Реальная работа', 'Событие показано как последовательная история, а не одиночная фотография.', 6),
        makeGroup('Пять мифов о ведущих', sequence('assets/cases/sergey-glibin/carousels/10', 7, 'jpg'), 'Разбор мифов', 'Карусель снимает типовые возражения до разговора с ведущим.', 9),
        makeGroup('Свадьба на девять человек', sequence('assets/cases/sergey-glibin/carousels/16', 6, 'jpg'), 'Реальная работа', 'Камерный формат раскрыт через задачу, атмосферу и результат.', 15)
      ] },
      story: { groups: [makeStories('Мини-прогрев к программе', sequence('assets/cases/sergey-glibin/stories', 5, 'jpg'))] }
    }
  },
  {
    name: 'Налог Эксперт',
    sector: 'Экспертные B2B-услуги',
    categories: ['expert'],
    package: '10 публикаций · 3 карусели · 10 историй',
    note: 'Актуальные поводы, практические разборы и мифы превращены в спокойный экспертный контент.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/nalog-expert/posts', 'jpg', [1, 2, 3, 4, 5, 7, 8, 10], [
        'Изменение налогового порога', 'Обязательные взносы директора', 'Как выбрать налоговый режим', 'Оптимизация - это всегда серые схемы?',
        'Экспресс-аудит бизнеса', 'Маленькому бизнесу бухгалтер не нужен?', 'Календарь отчетности и платежей', 'Бухгалтерия под ключ'
      ], ['Объяснить изменение', 'Дать актуальную информацию', 'Помочь с выбором', 'Снять возражение', 'Показать услугу', 'Снять возражение', 'Дать сохраняемую пользу', 'Подвести к обращению']) }] },
      carousel: { groups: [
        makeGroup('Первый сотрудник: шесть шагов', sequence('assets/cases/nalog-expert/carousels', 7, 'jpg').map((_, index) => `assets/cases/nalog-expert/carousels/06-${String(index + 1).padStart(2, '0')}.jpg`), 'Инструкция', 'Пошаговый материал делает сложную кадровую тему понятной.', 5),
        makeGroup('Требование из налоговой: шесть шагов', sequence('assets/cases/nalog-expert/carousels', 7, 'jpg').map((_, index) => `assets/cases/nalog-expert/carousels/09-${String(index + 1).padStart(2, '0')}.jpg`), 'Инструкция', 'Читатель получает спокойный порядок действий вместо тревоги.', 8),
        makeGroup('Подарок: памятка для бизнеса', sequence('assets/cases/nalog-expert/gift', 7, 'jpg'), 'Полезный материал', 'Отдельный сохраняемый материал усиливает ценность экспертного контента.')
      ] },
      story: { groups: [
        makeStories('Серия 1', Array.from({ length: 5 }, (_, index) => `assets/cases/nalog-expert/stories/01-${String(index + 1).padStart(2, '0')}.jpg`)),
        makeStories('Серия 2', Array.from({ length: 5 }, (_, index) => `assets/cases/nalog-expert/stories/02-${String(index + 1).padStart(2, '0')}.jpg`))
      ] }
    }
  },
  {
    name: 'Клиент Просто',
    sector: 'B2B-услуги · веб-студия',
    categories: ['expert'],
    package: '10 публикаций · 2 карусели · 5 историй',
    note: 'Услуги, кейсы, блог и внутреннюю работу собрали в один понятный месяц для бизнеса.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/klient-prosto/posts', 'png', [1, 2, 3, 5, 7, 8, 9, 10], [
        'Клиенты спрашивают нейросети, кого выбрать', 'Как создавали портал для инновационного кластера', 'Что происходит после фразы «нам нужен сайт»',
        'На чем можно и нельзя экономить при создании сайта', 'Почему сайт есть, а заявок нет: четыре причины', 'Промпт-инженер внутри работы веб-студии',
        'Юридическая гигиена сайта в 2026 году', 'Что происходит после запуска сайта'
      ], ['Актуальный повод', 'Показать кейс', 'Показать процесс', 'Снять ценовое возражение', 'Дать диагностику', 'Показать внутреннюю работу', 'Дать пользу', 'Объяснить поддержку']) }] },
      carousel: { groups: [
        makeGroup('SEO-кейс: путь от задачи к росту трафика', Array.from({ length: 7 }, (_, index) => `assets/cases/klient-prosto/carousels/04/post-04-slide-${String(index + 1).padStart(2, '0')}${index === 0 ? '-cover' : ''}.png`), 'Кейс', 'Задача и работа студии показаны по шагам, а не общим обещанием.', 3),
        makeGroup('SEO-кейс интернет-магазина', Array.from({ length: 7 }, (_, index) => `assets/cases/klient-prosto/carousels/06/post-06-slide-${String(index + 1).padStart(2, '0')}${index === 0 ? '-cover' : ''}.png`), 'Кейс', 'Сложный B2B-результат собран в последовательную историю.', 5)
      ] },
      story: { groups: [makeStories('Мини-прогрев к кейсу', Array.from({ length: 5 }, (_, index) => `assets/cases/klient-prosto/stories/story-${String(index + 1).padStart(2, '0')}.jpg`))] }
    }
  },
  {
    name: 'REFIX',
    sector: 'Локальные услуги · ремонт техники',
    categories: ['services'],
    package: '10 публикаций · 2 карусели · 3 серии историй',
    note: 'Страх неизвестной цены и срока снят через диагностику, процесс, детали и понятные действия.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/refix/posts', 'png', [2, 3, 5, 6, 7, 8, 9, 10], [
        'Пролил кофе на ноутбук', 'Три мифа о ремонте техники', 'Диагностика и ее условия', 'Что делать, если залили устройство водой',
        'Приставка шумит, как самолет?', 'Оригинал или аналог?', 'Сколько ждать ремонт?', 'Ремонт электросамокатов'
      ], ['Дать первый шаг', 'Снять мифы', 'Объяснить условия', 'Дать инструкцию', 'Показать знакомую проблему', 'Усилить доверие', 'Снять вопрос о сроках', 'Показать услугу']) }] },
      carousel: { groups: [
        makeGroup('Пять ошибок, из-за которых техника ломается раньше', sequence('assets/cases/refix/carousels/01', 7, 'png'), 'Польза', 'Сохраняемый материал помогает предупредить поломку.', 0),
        makeGroup('Как проходит ремонт в REFIX', sequence('assets/cases/refix/carousels/04', 7, 'png'), 'Процесс', 'Этапы ремонта снимают страх неизвестности до обращения.', 3)
      ] },
      story: { groups: [1, 2, 3].map((group) => makeStories(`Серия ${group}`, sequence(`assets/cases/refix/stories/0${group}`, 5, 'png'))) }
    }
  },
  {
    name: 'NARFKiS',
    sector: 'Спорт · социальный проект',
    categories: ['services'],
    package: '10 публикаций · 5 историй',
    note: 'Новые игры, реальные события и история организатора помогают снять барьеры перед участием.',
    formats: {
      post: { groups: [{ title: 'Публикации', items: makePosts('assets/cases/narfkis/posts', 'jpg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [
        'Инклюзивное авторалли «Приз Большого Норильска»', 'Что такое юкигассен и как в него играют', 'Миф: спорт недоступен людям с инвалидностью',
        'Как прошло инклюзивное авторалли', 'Спортивная инициатива и грантовый проект', 'Открытие сезона юкигассена',
        'Бочча, диск-гольф и юкигассен в Норильске', 'Как организовать спортивное событие под ключ',
        'Миф: в Норильске негде заниматься спортом', 'Зачем NARFKiS развивает инклюзивный спорт'
      ], ['Дать дату и повод прийти', 'Объяснить новую игру', 'Снять барьер', 'Показать реальное событие', 'Объяснить масштаб работы', 'Привлечь к новой дате', 'Познакомить с форматами', 'Показать компетенции', 'Ответить на возражение', 'Закрепить ценности']) }] },
      story: { groups: [makeStories('Открытие сезона юкигассена', sequence('assets/cases/narfkis/stories', 5, 'jpg'), [
        'Снежки в Норильске - в разгар лета', 'Что такое юкигассен', 'Команды, тактика и азарт', 'Дата и место открытия сезона', 'Переход к основному посту'
      ], ['Зацепить внимание', 'Объяснить', 'Показать механику', 'Дать конкретику', 'Перевести к посту'])] }
    }
  },
  {
    name: 'Альянс Климат',
    sector: 'Локальные услуги · климатические системы',
    categories: ['services'],
    package: '10 публикаций · 5 историй',
    note: 'Выбор, монтаж, ошибки, гарантия и обслуживание собраны в понятный путь для клиента.',
    formats: {
      post: { groups: [{
        title: 'Публикации',
        items: makePosts('assets/cases/alliance-climate/posts', 'webp', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [
          'Как подобрать мощность кондиционера под комнату', 'Как выглядит наш монтаж', 'Три ошибки при выборе кондиционера', '«Подошли с душой» - о культуре работы',
          'Монтаж за один день с гарантией', 'Зачем чистить кондиционер', 'Подбор под сложную планировку', 'Почему дешевый монтаж обходится дороже',
          'Что мы делаем, если попался брак', 'Обслуживание перед пиком жары'
        ], [
          'Дать сохраняемую подсказку', 'Снять страх грязи и случайной бригады', 'Отстроить выбор только по цене', 'Подтвердить отношение к клиенту',
          'Перевести к замеру', 'Показать сервисную экспертизу', 'Снять страх переплаты', 'Объяснить цену качества', 'Снять страх гарантии', 'Привести к сервисной заявке'
        ], [
          'Мощность зависит не только от площади: важны окна, люди, техника, потолки и остекление.',
          'Аккуратная трасса, проверка запуска и уборка после работ показывают реальный стандарт монтажа.',
          'Разобраны три дорогие ошибки: расчет только по метражу, экономия на монтаже и выбор самой дешевой модели.',
          'Отзыв раскрывается через конкретные действия мастера: объяснить решение, выбрать место и проверить технику.',
          'Оффер собирает замер по фото, выезд на сложный объект, монтаж в течение дня и гарантию на работы.',
          'Четыре сигнала для обслуживания: запах, слабый холод, капли и новый шум.',
          'Материал показывает, как подбирают блоки и трассы для студий, длинных квартир и офисов.',
          'Низкая цена раскрывается через риски монтажа и будущие расходы.',
          'Описана реальная гарантийная логика без обещаний, которые нельзя выполнить.',
          'Финальный материал напоминает о профилактике до жары и объясняет следующий шаг.'
        ])
      }] },
      story: { groups: [makeStories('Мини-прогрев к монтажу', sequence('assets/cases/alliance-climate/stories', 5, 'webp'), [
        'Летняя очередь на монтаж', 'Почему качество важнее спешки', 'Замер по фото', 'Монтаж и гарантия', 'Переход к подробному разбору'
      ], ['Честный хук', 'Объяснить ценность', 'Показать первый шаг', 'Дать конкретику', 'Перевести в пост'], [
        'Сразу сказать о сезонной очереди и вызвать вопрос: почему люди готовы ждать?',
        'Сравнить спешку на установке с аккуратной работой надолго.',
        'Объяснить замер по фото и отдельный выезд на сложный объект.',
        'Показать свой штат, проверенные модели, срок и гарантию.',
        'Напомнить о заполнении графика и отправить к подробному материалу.'
      ])] }
    }
  }
];

const makeCatalogProject = ({ name, category, package: packageName, note, sourceFile, images }) => {
  const posts = images.filter((src) => !src.includes('/stories/') && !src.includes('/story-'));
  const stories = images.filter((src) => src.includes('/stories/') || src.includes('/story-'));
  const formats = {
    post: {
      groups: [{
        title: 'Публикации',
        items: posts.map((src, index) => ({ src, publicationIndex: index, title: `Материал ${index + 1}`, role: '', description: note }))
      }]
    }
  };
  if (stories.length) formats.story = { groups: [makeStories('Истории проекта', stories)] };
  return { name, sector: '', categories: [category], package: packageName, note, sourceFile, formats, isCatalogPreview: true };
};

LEGACY_PROJECTS.push(...[
  makeCatalogProject({ name: 'Атерис', category: 'services', package: '10 публикаций', note: 'Экспертные темы превращены в понятные ответы и спокойный путь к обращению.', sourceFile: 'case-ateris-design.html', images: ['assets/cases/ateris/posts/03.jpg', 'assets/cases/ateris/posts/05.jpg', 'assets/cases/ateris/posts/08.jpg'] }),
  makeCatalogProject({ name: 'MoscowPadel', category: 'services', package: '20 публикаций', note: 'Продукт показан через возможности объекта, сценарии использования и доверие.', sourceFile: 'case-moscow-padel-design.html', images: ['assets/cases/moscow-padel/posts/19.jpg', 'assets/cases/moscow-padel/posts/20.jpg', 'assets/cases/moscow-padel/posts/15.jpg'] }),
  makeCatalogProject({ name: 'Ритуал-С', category: 'services', package: '20 публикаций', note: 'Чувствительная тема объяснена спокойно: материалы, формы, стоимость и уход.', sourceFile: 'case-ritual-s-design.html', images: ['assets/cases/ritual-s/posts/04.webp', 'assets/cases/ritual-s/carousels/01/01.webp', 'assets/cases/ritual-s/carousels/08/01.webp'] }),
  makeCatalogProject({ name: 'Fjord-Petersburg', category: 'services', package: '11 публикаций', note: 'Формат отдыха раскрыт через поводы, маршруты и ответы на сомнения.', sourceFile: 'case-fjord-petersburg-design.html', images: ['assets/cases/fjord-petersburg/posts/01.jpg', 'assets/cases/fjord-petersburg/carousels/03/01.jpg', 'assets/cases/fjord-petersburg/carousels/bonus/02.jpg'] }),
  makeCatalogProject({ name: 'Сияние вяза', category: 'product', package: '10 публикаций', note: 'Фактура и изделие связаны с конкретными комнатами и задачами клиента.', sourceFile: 'case-siyanie-vyaza-design.html', images: ['assets/cases/siyanie-vyaza/posts/01.jpg', 'assets/cases/siyanie-vyaza/posts/05.jpg', 'assets/cases/siyanie-vyaza/carousel-02/01.jpg'] }),
  makeCatalogProject({ name: 'Липники', category: 'product', package: '10 публикаций', note: 'Ассортимент превращен в полезные поводы зайти в магазин сегодня.', sourceFile: 'case-lipniki-design.html', images: ['assets/cases/lipniki/posts/01.webp', 'assets/cases/lipniki/posts/02.webp', 'assets/cases/lipniki/gift/01.webp'] }),
  makeCatalogProject({ name: 'Александр Лисицинский', category: 'expert', package: '10 публикаций', note: 'Сложные медицинские темы раскрыты без обещаний и лишнего давления.', sourceFile: 'case-lisitsinsky-design.html', images: ['assets/cases/lisitsinsky/posts/02.jpg', 'assets/cases/lisitsinsky/posts/03.jpg', 'assets/cases/lisitsinsky/posts/05.jpg'] }),
  makeCatalogProject({ name: 'Oh! Beauty', category: 'services', package: '10 публикаций', note: 'Польза, сомнения, процесс и доверие собраны в последовательную серию.', sourceFile: 'case-oh-beauty-design.html', images: ['assets/cases/oh-beauty/posts/01.jpg', 'assets/cases/oh-beauty/posts/02.jpg', 'assets/cases/oh-beauty/posts/03.jpg'] }),
  makeCatalogProject({ name: 'БФ «Доброе сердце»', category: 'services', package: '10 публикаций', note: 'Контент о реальной помощи, доверии и участии.', sourceFile: 'case-dobroe-serdtse-design.html', images: ['assets/cases/dobroe-serdtse/posts/01.webp', 'assets/cases/dobroe-serdtse/carousels/02/01.webp', 'assets/cases/dobroe-serdtse/posts/06.webp'] }),
  makeCatalogProject({ name: 'Invest Management', category: 'expert', package: '10 публикаций', note: 'Сложный инвестиционный продукт объяснен через экономику, команду, объекты и риски.', sourceFile: 'case-invest-management-design.html', images: ['assets/cases/invest-management/post-06.jpg', 'assets/cases/invest-management/post-04-slide-01.jpg', 'assets/cases/invest-management/post-08.jpg'] }),
  makeCatalogProject({ name: 'МастерПол', category: 'services', package: '10 публикаций', note: 'Работы, выбор материалов, возражения, процесс и предложения собраны в один месяц.', sourceFile: 'case-masterpol-design.html', images: ['assets/cases/masterpol/post-01.jpg', 'assets/cases/masterpol/post-03-slide-01.jpg', 'assets/cases/masterpol/story-03.jpg'] }),
  makeCatalogProject({ name: 'ЭЛЕКТРОНИКС', category: 'product', package: '10 публикаций', note: 'Ассортимент магазина превращен в полезный месяц: выбор, витрина и предложения.', sourceFile: 'case-electronics-cherepovets-design.html', images: ['assets/cases/electronics-cherepovets/carousels/01/01.webp', 'assets/cases/electronics-cherepovets/posts/05.webp', 'assets/cases/electronics-cherepovets/gift/01.webp'] }),
  makeCatalogProject({ name: 'Colorplast', category: 'product', package: '30 публикаций', note: 'Два цикла контента показывают выбор, работы, возражения и весь визуальный продукт.', sourceFile: 'case-colorplast-design.html', images: ['assets/cases/colorplast/current/posts/01.jpg', 'assets/cases/colorplast/current/carousels/04/01.jpg', 'assets/cases/colorplast/previous/posts/01.jpg'] }),
  makeCatalogProject({ name: 'TapLife', category: 'services', package: '10 публикаций', note: 'Барьер клиента превращен в позиционирование, пользу и понятный сценарий визита.', sourceFile: 'case-taplife-design.html', images: ['assets/cases/taplife/posts/01.jpg', 'assets/cases/taplife/carousels/02/01.jpg', 'assets/cases/taplife/posts/08.jpg'] }),
  makeCatalogProject({ name: 'Кристалл', category: 'services', package: '10 публикаций', note: 'Инженерная услуга разложена на выбор, цену, риски и переход к расчету.', sourceFile: 'case-kristall-water-design.html', images: ['assets/cases/kristall-water/posts/01.jpg', 'assets/cases/kristall-water/posts/07.jpg', 'assets/cases/kristall-water/carousel/01.jpg'] }),
  makeCatalogProject({ name: 'INARI', category: 'product', package: '10 публикаций', note: 'Товарная витрина, кухня, помощь с выбором и вовлечение.', sourceFile: 'case-inari-design.html', images: ['assets/cases/inari/posts/01.jpg', 'assets/cases/inari/carousel-covers/03.jpg', 'assets/cases/inari/stories/01.jpg'] }),
  makeCatalogProject({ name: '«Ягодный Рай»', category: 'product', package: '5 публикаций', note: 'Сезонная серия: знакомство, польза, доверие, продукт и переход к обращению.', sourceFile: 'case-yagodny-ray-design.html', images: ['assets/cases/yagodny-ray/posts/01.jpg', 'assets/cases/yagodny-ray/posts/03.jpg', 'assets/cases/yagodny-ray/carousels/01/01.jpg'] }),
  makeCatalogProject({ name: '«Сильный Парус»', category: 'expert', package: '10 каруселей', note: 'Сложные юридические темы превращены в понятную систему каруселей.', sourceFile: 'case-silny-parus-design.html', images: ['assets/cases/silny-parus/carousels/01/01.jpg', 'assets/cases/silny-parus/carousels/09/01.jpg', 'assets/cases/silny-parus/stories/03/01.jpg'] }),
  makeCatalogProject({ name: 'Orange Style', category: 'services', package: '10 публикаций', note: 'Польза, мифы, доказательства, вовлечение и предложения для фитнес-клуба.', sourceFile: 'case-orange-style-design.html', images: ['assets/cases/orange-style/posts/01.jpg', 'assets/cases/orange-style/posts/05.jpg', 'assets/cases/orange-style/stories/03.jpg'] }),
  makeCatalogProject({ name: '«Дан-Гун»', category: 'services', package: '11 публикаций', note: 'Контент снимает тревогу родителей и помогает сделать первый шаг.', sourceFile: 'case-dan-gun-design.html', images: ['assets/cases/dan-gun/posts/01.jpg', 'assets/cases/dan-gun/carousels/07/01.jpg', 'assets/cases/dan-gun/carousels/bonus/01.jpg'] }),
  makeCatalogProject({ name: 'SIDCOBRA', category: 'expert', package: '30 публикаций', note: 'Тренировки, ученики и товары соединены в единую систему.', sourceFile: 'case-sidcobra-design.html', images: ['assets/cases/sidcobra/posts/01.jpg', 'assets/cases/sidcobra/carousels/03/01.jpg', 'assets/cases/sidcobra/posts/09.jpg'] }),
  makeCatalogProject({ name: 'Роман Седов', category: 'expert', package: '10 публикаций', note: 'Опыт ведущего превращен в экспертные темы и журнальную визуальную систему.', sourceFile: 'case-roman-sedov-design.html', images: ['assets/cases/roman-sedov/posts/01.jpg', 'assets/cases/roman-sedov/posts/03.jpg', 'assets/cases/roman-sedov/posts/09.jpg'] }),
  makeCatalogProject({ name: 'Электрик Мончегорск', category: 'services', package: '10 публикаций', note: 'Польза, реальные работы, снятие страхов и понятный путь к заявке.', sourceFile: 'case-electric-monchegorsk-design.html', images: ['assets/cases/electric-monchegorsk/posts/01.jpg', 'assets/cases/electric-monchegorsk/carousels/04/01.jpg', 'assets/cases/electric-monchegorsk/carousels/07/01.jpg'] }),
  makeCatalogProject({ name: 'Ольга Правдюк', category: 'expert', package: '11 публикаций', note: 'Профориентация превращена в понятный путь для родителей и подростков.', sourceFile: 'case-olga-pravdyuk-design.html', images: ['assets/cases/olga-pravdyuk/posts/01.jpg', 'assets/cases/olga-pravdyuk/carousels/02/01.jpg', 'assets/cases/olga-pravdyuk/carousels/bonus/01.jpg'] }),
  makeCatalogProject({ name: 'Ачинск Беговой', category: 'services', package: '11 публикаций', note: 'История события, помощь новичкам, атмосфера и путь к регистрации.', sourceFile: 'case-achinsk-begovoy-design.html', images: ['assets/cases/achinsk-begovoy/posts/01.jpg', 'assets/cases/achinsk-begovoy/carousels/02/01.jpg', 'assets/cases/achinsk-begovoy/carousels/06/01.jpg'] }),
  makeCatalogProject({ name: 'CasaHitto', category: 'product', package: '11 публикаций', note: 'Три дома превращены в понятную систему выбора и бронирования.', sourceFile: 'case-casahitto-design.html', images: ['assets/cases/casahitto/posts/01.jpg', 'assets/cases/casahitto/carousels/06/01.jpg', 'assets/cases/casahitto/carousels/bonus/01.jpg'] }),
  makeCatalogProject({ name: 'Ольга Андреева', category: 'expert', package: '10 публикаций', note: 'Позиция, теплые тексты и визуальный язык экспертного проекта.', sourceFile: 'case-olga-andreeva-design.html', images: ['assets/cases/olga-andreeva/posts/01.jpg', 'assets/cases/olga-andreeva/posts/05.jpg', 'assets/cases/olga-andreeva/stories/05.jpg'] }),
  makeCatalogProject({ name: 'Dava Holding', category: 'expert', package: '10 публикаций', note: 'Сложная бизнес-идея превращена в последовательный контент-план.', sourceFile: 'case-dava-holding-design.html', images: ['assets/cases/dava-holding/posts/01.jpg', 'assets/cases/dava-holding/posts/02.jpg', 'assets/cases/dava-holding/stories/03.jpg'] }),
  makeCatalogProject({ name: 'Dava Life', category: 'product', package: '10 публикаций', note: 'Польза, сомнения, продукт, выбор и заказ собраны в понятный путь.', sourceFile: 'case-dava-life-design.html', images: ['assets/cases/dava-life/posts/01.jpg', 'assets/cases/dava-life/posts/03.jpg', 'assets/cases/dava-life/posts/09.jpg'] })
]);

const PROJECTS = window.SALES_PROJECTS || [];
const isTildaEmbed = new URLSearchParams(window.location.search).get('embed') === 'tilda';

if (isTildaEmbed) {
  document.documentElement.classList.add('sales-is-embedded');
  document.body.dataset.salesEmbedReady = 'true';
}

LEGACY_PROJECTS.forEach((project) => {
  const feed = project.formats.post?.groups?.[0]?.items;
  const carouselGroups = project.formats.carousel?.groups || [];
  const plannedPublications = Number(project.package.match(/^\d+/)?.[0] || feed?.length || 0);
  const missingCovers = Math.max(0, plannedPublications - (feed?.length || 0));
  carouselGroups.slice(0, missingCovers).forEach((group) => {
    feed.push({ ...group.items[0], publicationIndex: group.copyIndex, role: group.items[0].role.split(' · ')[0] });
  });
  feed?.sort((first, second) => first.publicationIndex - second.publicationIndex);
});

const detailedCopySourceFiles = [
  'case-saratov-kitchens.html',
  'case-fr-moto-design.html',
  'case-borodulina-tape.html',
  'case-chebusser-design.html',
  'case-sergey-glibin-design.html',
  'case-nalog-expert-design.html',
  'case-klient-prosto-design.html',
  'case-refix-design.html',
  'case-narfkis-design.html',
  'case-alliance-climate-design.html'
];

const copyCache = new Map();

async function loadProjectCopy(projectIndex) {
  if (copyCache.has(projectIndex)) return copyCache.get(projectIndex);
  try {
    const project = PROJECTS[projectIndex];
    const sourceFile = detailedCopySourceFiles[projectIndex] || project.sourceFile?.replace('-design.html', '.html') || project.sourceFile;
    const response = await fetch(sourceFile);
    if (!response.ok) throw new Error('copy source unavailable');
    const source = new DOMParser().parseFromString(await response.text(), 'text/html');
    const preferredCopyRoot = source.querySelector('.case-copy-source') || source.querySelector('[data-case-panel="copy"]') || source;
    let entries = [...preferredCopyRoot.querySelectorAll('details')].map((details) => ({
      title: details.querySelector('summary strong')?.textContent.trim() || '',
      html: (details.querySelector('.case-copy-body')?.innerHTML.trim() || '').replaceAll('\u2014', '-').replaceAll('\u0451', 'е').replaceAll('\u0401', 'Е')
    }));
    if (!entries.length) {
      entries = [...source.querySelectorAll('[data-case-dialog-open]')].map((button) => ({
        title: button.dataset.caseDialogAlt || button.querySelector('img')?.alt || '',
        html: ''
      }));
    }
    copyCache.set(projectIndex, entries);
    return entries;
  } catch {
    copyCache.set(projectIndex, []);
    return [];
  }
}

const formatNames = { post: 'Посты', carousel: 'Карусели', story: 'Истории' };
const categoryNames = { services: 'Услуги', product: 'Товары', expert: 'Эксперты и B2B' };
const validCategories = ['all', 'services', 'product', 'expert'];
const params = new URLSearchParams(window.location.search);
const filtersRoot = document.querySelector('[data-sales-filters]');
const showcaseRoot = document.querySelector('[data-sales-showcase]');
const emptyState = document.querySelector('[data-sales-empty]');
let activeCategory = validCategories.includes(params.get('category')) ? params.get('category') : 'all';
let activeProject = 0;
let activeFormat = 'post';
let activeSeries = 0;
let activeItem = 0;

function formatCount(format) {
  if (!format?.groups?.length) return 0;
  return format.groups.reduce((sum, group) => sum + (group.items?.length || 0), 0);
}

function visibleProjects() {
  return PROJECTS.map((project, index) => ({ project, index })).filter(({ project }) => activeCategory === 'all' || project.categories.includes(activeCategory));
}

function syncUrl() {
  const next = new URLSearchParams(window.location.search);
  activeCategory === 'all' ? next.delete('category') : next.set('category', activeCategory);
  const query = next.toString();
  window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
}

function prepareSelection() {
  const visible = visibleProjects();
  emptyState.hidden = visible.length > 0;
  showcaseRoot.hidden = visible.length === 0;
  if (!visible.some(({ index }) => index === activeProject) && visible.length) activeProject = visible[0].index;
}

function projectMenu() {
  const visible = visibleProjects();
  const groups = (activeCategory === 'all' ? validCategories.slice(1) : [activeCategory]).map((category) => ({
    category,
    projects: visible.filter(({ project }) => project.categories.includes(category))
  })).filter(({ projects }) => projects.length);
  return `
    <div class="sales-project-menu__intro">
      <strong>Выберите проект</strong>
      <span>${visible.length} ${visible.length === 1 ? 'проект' : visible.length < 5 ? 'проекта' : 'проектов'}</span>
    </div>
    ${groups.map(({ category, projects }) => `
      <div class="sales-project-group">
        <h4>${categoryNames[category]}</h4>
        <div class="sales-project-list">
          ${projects.map(({ project, index }) => `<button class="sales-project-choice${index === activeProject ? ' is-active' : ''}" type="button" data-project-index="${index}"${index === activeProject ? ' aria-current="true"' : ''}>${project.name}</button>`).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

function currentContext() {
  const project = PROJECTS[activeProject];
  const availableFormats = ['post', 'carousel', 'story'].filter((key) => project.formats[key]?.groups?.length);
  if (!availableFormats.includes(activeFormat)) activeFormat = availableFormats[0];
  const format = project.formats[activeFormat];
  activeSeries = Math.min(activeSeries, format.groups.length - 1);
  const group = format.groups[activeSeries];
  activeItem = Math.min(activeItem, group.items.length - 1);
  return { project, availableFormats, format, group, item: group.items[activeItem] };
}

function renderShowcase() {
  const { project, availableFormats, format, group, item } = currentContext();
  const isStory = activeFormat === 'story';
  const formatTabs = availableFormats.map((key) => {
    const count = key === 'carousel' ? project.formats[key].groups.length : formatCount(project.formats[key]);
    return `<button class="${key === activeFormat ? 'is-active' : ''}" type="button" data-format-key="${key}">${formatNames[key]} <span>${count}</span></button>`;
  }).join('');
  const series = format.groups.length > 1 ? `
    <div class="sales-series" aria-label="Выберите материал">
      ${format.groups.map((seriesItem, index) => `<button class="${index === activeSeries ? 'is-active' : ''}" type="button" data-series-index="${index}">${seriesItem.isBonus ? 'Подарок' : seriesItem.publicationNumber ? `№${seriesItem.publicationNumber}` : index + 1}. ${seriesItem.title}</button>`).join('')}
    </div>
  ` : '<div class="sales-series" hidden></div>';
  const thumbs = group.items.map((thumb, index) => `
    <button class="${index === activeItem ? 'is-active' : ''}" type="button" data-item-index="${index}" aria-label="Показать экран ${index + 1}">
      <img src="${thumb.src}" alt="" loading="lazy"><span>${index + 1}</span>
    </button>
  `).join('');
  showcaseRoot.innerHTML = `
    <div class="sales-showcase__head">
      <div class="sales-project-select" data-project-select>
        <button class="sales-project-select__trigger" type="button" data-project-trigger aria-expanded="false">
          <span><span class="sales-project-select__label">Сейчас смотрите</span><strong>${project.name}</strong></span>
          <em class="sales-project-select__side"><span>Выбрать другой</span><span class="sales-project-select__chevron">↓</span></em>
        </button>
        <div class="sales-project-menu" data-project-menu hidden>${projectMenu()}</div>
      </div>
      <p><strong>${project.package}</strong>${project.note || ''}</p>
    </div>
    <div class="sales-format-tabs" role="tablist" aria-label="Форматы проекта">${formatTabs}</div>
    ${series}
    <div class="sales-viewer">
      <figure class="sales-viewer__visual${isStory ? ' is-story' : ''}">
        <span class="sales-viewer__counter">${activeItem + 1} / ${group.items.length}</span>
        <img src="${item.src}" alt="${project.name}: ${item.title}">
        <div class="sales-viewer__arrows">
          <button type="button" data-view-action="previous" aria-label="Предыдущий экран">←</button>
          <button type="button" data-view-action="next" aria-label="Следующий экран">→</button>
        </div>
      </figure>
      <div class="sales-viewer__copy">
        <h3>${item.title}</h3>
        <div class="sales-viewer__text" data-publication-copy>
          <div class="sales-viewer__text-body" data-publication-copy-body>${item.copyHtml || group.copyHtml || '<p>У материала нет отдельной подписи.</p>'}</div>
          <button type="button" data-copy-expand hidden>Прочитать подробнее</button>
        </div>
        <div class="sales-viewer__copy-nav" aria-label="Навигация по материалам">
          <button type="button" data-view-action="previous" aria-label="Предыдущий материал">←</button>
          <button type="button" data-view-action="next" aria-label="Следующий материал">→</button>
        </div>
      </div>
    </div>
    <div class="sales-thumbs-head">
      <strong>${activeFormat === 'carousel' ? `Все слайды: ${group.title}` : `Весь комплект: ${formatNames[activeFormat].toLowerCase()}`}</strong>
    </div>
    <div class="sales-thumbs${isStory ? ' is-story' : ''}">${thumbs}</div>
  `;

  const syncCopyOverflow = () => {
    const details = showcaseRoot.querySelector('[data-publication-copy]');
    const body = showcaseRoot.querySelector('[data-publication-copy-body]');
    const expand = details?.querySelector('[data-copy-expand]');
    if (!details || !body || !expand) return;
    const overflows = body.scrollHeight > body.clientHeight + 2;
    details.classList.toggle('is-collapsed', overflows);
    expand.hidden = !overflows;
  };
  const syncViewerHeight = () => {
    const visual = showcaseRoot.querySelector('.sales-viewer__visual');
    const copy = showcaseRoot.querySelector('.sales-viewer__copy');
    if (visual && copy) copy.style.height = `${visual.getBoundingClientRect().height}px`;
    requestAnimationFrame(syncCopyOverflow);
  };
  requestAnimationFrame(syncViewerHeight);
  showcaseRoot.querySelector('.sales-viewer__visual img')?.addEventListener('load', syncViewerHeight, { once: true });
}

function renderAll() {
  filtersRoot.querySelectorAll('[data-category]').forEach((button) => button.classList.toggle('is-active', button.dataset.category === activeCategory));
  prepareSelection();
  if (!showcaseRoot.hidden) renderShowcase();
  syncUrl();
}

function resetViewer() {
  activeFormat = 'post';
  activeSeries = 0;
  activeItem = 0;
}

filtersRoot.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  resetViewer();
  renderAll();
});

showcaseRoot.addEventListener('click', (event) => {
  const projectTrigger = event.target.closest('[data-project-trigger]');
  const projectButton = event.target.closest('[data-project-index]');
  const formatButton = event.target.closest('[data-format-key]');
  const seriesButton = event.target.closest('[data-series-index]');
  const itemButton = event.target.closest('[data-item-index]');
  const actionButton = event.target.closest('[data-view-action]');
  const copyExpand = event.target.closest('[data-copy-expand]');

  if (projectTrigger) {
    const menu = showcaseRoot.querySelector('[data-project-menu]');
    const isOpen = projectTrigger.getAttribute('aria-expanded') === 'true';
    projectTrigger.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
    return;
  }

  if (projectButton) {
    activeProject = Number(projectButton.dataset.projectIndex);
    resetViewer();
    renderAll();
    return;
  }

  if (copyExpand) {
    const copy = copyExpand.closest('[data-publication-copy]');
    const expanded = copy.classList.toggle('is-expanded');
    copyExpand.textContent = expanded ? 'Свернуть текст' : 'Прочитать подробнее';
    return;
  }

  if (formatButton) {
    activeFormat = formatButton.dataset.formatKey;
    activeSeries = 0;
    activeItem = 0;
    renderShowcase();
    return;
  }

  if (seriesButton) {
    activeSeries = Number(seriesButton.dataset.seriesIndex);
    activeItem = 0;
    renderShowcase();
    return;
  }

  if (itemButton) {
    activeItem = Number(itemButton.dataset.itemIndex);
    renderShowcase();
    return;
  }

  if (!actionButton) return;
  const action = actionButton.dataset.viewAction;
  const { group } = currentContext();
  if (action === 'previous' || action === 'next') {
    const step = action === 'next' ? 1 : -1;
    activeItem = (activeItem + step + group.items.length) % group.items.length;
    renderShowcase();
  }
});

document.querySelector('[data-reset-filters]').addEventListener('click', () => {
  activeCategory = 'all';
  activeProject = 0;
  resetViewer();
  renderAll();
});

renderAll();

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-project-select]')) return;
  const trigger = showcaseRoot.querySelector('[data-project-trigger]');
  const menu = showcaseRoot.querySelector('[data-project-menu]');
  if (!trigger || !menu) return;
  trigger.setAttribute('aria-expanded', 'false');
  menu.hidden = true;
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const trigger = showcaseRoot.querySelector('[data-project-trigger]');
  const menu = showcaseRoot.querySelector('[data-project-menu]');
  if (!trigger || !menu || menu.hidden) return;
  trigger.setAttribute('aria-expanded', 'false');
  menu.hidden = true;
  trigger.focus();
});

window.addEventListener('resize', () => {
  const visual = showcaseRoot.querySelector('.sales-viewer__visual');
  const copy = showcaseRoot.querySelector('.sales-viewer__copy');
  if (visual && copy) {
    copy.style.height = `${visual.getBoundingClientRect().height}px`;
    const details = showcaseRoot.querySelector('[data-publication-copy]');
    const body = showcaseRoot.querySelector('[data-publication-copy-body]');
    const expand = details?.querySelector('[data-copy-expand]');
    if (details && body && expand) {
      const overflows = body.scrollHeight > body.clientHeight + 2;
      details.classList.toggle('is-collapsed', overflows);
      expand.hidden = !overflows;
    }
  }
});

if (isTildaEmbed && window.parent !== window) {
  let lastEmbeddedHeight = 0;
  const reportEmbeddedHeight = () => {
    const height = Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    if (Math.abs(height - lastEmbeddedHeight) < 2) return;
    lastEmbeddedHeight = height;
    window.parent.postMessage({ type: 'lemonmedia:sales-height', height }, '*');
  };
  const embeddedResizeObserver = new ResizeObserver(reportEmbeddedHeight);
  embeddedResizeObserver.observe(document.body);
  window.addEventListener('load', reportEmbeddedHeight, { once: true });
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'lemonmedia:measure-sales') reportEmbeddedHeight();
  });
  requestAnimationFrame(reportEmbeddedHeight);
}
