const CASES = [
  {name:'Саратов Кухни', segment:'product', category:'Кухни и интерьер', count:'15 публикаций', text:'Польза, модели, доказательства работ и предложения собраны в один месяц.', link:'case-saratov-kitchens-design.html', images:['assets/cases/saratov-kitchens-2026-08/posts/01.webp','assets/cases/saratov-kitchens-2026-08/posts/03.webp','assets/cases/saratov-kitchens-2026-08/posts/05.webp']},
  {name:'FR-moto', segment:'product', category:'Технический продукт', count:'10 публикаций', text:'Сложный продукт объяснён через выбор, применение и реальные ситуации.', link:'case-fr-moto-design.html', images:['assets/cases/fr-moto/posts/08.jpg','assets/cases/fr-moto/carousels/03/01.jpg','assets/cases/fr-moto/stories/01.jpg']},
  {name:'Атерис', segment:'services', category:'Ветеринарный центр', count:'10 публикаций', text:'Экспертные темы превращены в понятные ответы и спокойный путь к обращению.', link:'case-ateris-design.html', images:['assets/cases/ateris/posts/03.jpg','assets/cases/ateris/posts/05.jpg','assets/cases/ateris/posts/08.jpg']},
  {name:'Сергей Глибин', segment:'experts', category:'Личный бренд', count:'20 публикаций', text:'Личность, опыт и услуга раскрываются в одной узнаваемой системе.', link:'case-sergey-glibin-design.html', images:['assets/cases/sergey-glibin/posts/19.jpg','assets/cases/sergey-glibin/carousels/06/01.jpg','assets/cases/sergey-glibin/stories/03.jpg']},
  {name:'MoscowPadel', segment:'sport', category:'Спортивная инфраструктура', count:'20 публикаций', text:'Продукт показан через возможности объекта, сценарии использования и доверие.', link:'case-moscow-padel-design.html', images:['assets/cases/moscow-padel/posts/19.jpg','assets/cases/moscow-padel/posts/20.jpg','assets/cases/moscow-padel/posts/15.jpg']},
  {name:'Ритуал-С', segment:'services', category:'Ритуальные услуги', count:'20 публикаций', text:'Чувствительная тема объяснена спокойно: материалы, формы, стоимость и уход.', link:'case-ritual-s-design.html', images:['assets/cases/ritual-s/posts/04.webp','assets/cases/ritual-s/carousels/01/01.webp','assets/cases/ritual-s/carousels/08/01.webp']},
  {name:'Fjord-Petersburg', segment:'services', category:'Водные прогулки', count:'11 публикаций', text:'Формат отдыха раскрыт через поводы, маршруты и ответы на сомнения.', link:'case-fjord-petersburg-design.html', images:['assets/cases/fjord-petersburg/posts/01.jpg','assets/cases/fjord-petersburg/carousels/03/01.jpg','assets/cases/fjord-petersburg/carousels/bonus/02.jpg']},
  {name:'Сияние вяза', segment:'product', category:'Авторская мебель', count:'10 публикаций', text:'Фактура и изделие связаны с конкретными комнатами и задачами клиента.', link:'case-siyanie-vyaza-design.html', images:['assets/cases/siyanie-vyaza/posts/01.jpg','assets/cases/siyanie-vyaza/posts/05.jpg','assets/cases/siyanie-vyaza/carousel-02/01.jpg']},
  {name:'Липники', segment:'product', category:'Локальный магазин', count:'10 публикаций', text:'Ассортимент превращён в полезные поводы зайти в магазин сегодня.', link:'case-lipniki-design.html', images:['assets/cases/lipniki/posts/01.webp','assets/cases/lipniki/posts/02.webp','assets/cases/lipniki/gift/01.webp']},
  {name:'Александр Лисицинский', segment:'experts', category:'Кардиология', count:'10 публикаций', text:'Сложные медицинские темы раскрыты без обещаний и лишнего давления.', link:'case-lisitsinsky-design.html', images:['assets/cases/lisitsinsky/posts/02.jpg','assets/cases/lisitsinsky/posts/03.jpg','assets/cases/lisitsinsky/posts/05.jpg']},
  {name:'Oh! Beauty', segment:'services', category:'Красота и здоровье', count:'10 публикаций', text:'Польза, сомнения, процесс и доверие собраны в последовательную серию.', link:'case-oh-beauty-design.html', images:['assets/cases/oh-beauty/posts/01.jpg','assets/cases/oh-beauty/posts/02.jpg','assets/cases/oh-beauty/posts/03.jpg']},
  {name:'БФ «Доброе сердце»', segment:'social', category:'Благотворительность', count:'10 публикаций', text:'Контент о реальной помощи, доверии и участии. В галерее показана актуальная версия комплекта.', link:'case-dobroe-serdtse-design.html', images:['assets/cases/dobroe-serdtse/posts/01.webp','assets/cases/dobroe-serdtse/carousels/02/01.webp','assets/cases/dobroe-serdtse/posts/06.webp']},
  {name:'Альянс Климат', segment:'services local', category:'Климатические системы', count:'10 публикаций', text:'Тревогу перед монтажом превратили в понятный путь: выбор, процесс, ошибки, доказательства, гарантия и обслуживание.', link:'case-alliance-climate-design.html', images:['assets/cases/alliance-climate/posts/01.webp','assets/cases/alliance-climate/posts/05.webp','assets/cases/alliance-climate/stories/04.webp']},
  {name:'Invest Management', segment:'services experts', category:'Коммерческая недвижимость', count:'10 основных публикаций', text:'Сложный инвестиционный продукт объяснили через модельную экономику, команду, реальные объекты и разбор рисков.', link:'case-invest-management-design.html', images:['assets/cases/invest-management/post-06.jpg','assets/cases/invest-management/post-04-slide-01.jpg','assets/cases/invest-management/post-08.jpg']},
  {name:'МастерПол', segment:'services local', category:'Напольные покрытия', count:'10 публикаций', text:'Реальные работы, выбор материалов, разбор возражений, процесс и предложения собраны в один понятный месяц.', link:'case-masterpol-design.html', images:['assets/cases/masterpol/post-01.jpg','assets/cases/masterpol/post-03-slide-01.jpg','assets/cases/masterpol/story-03.jpg']},
  {name:'ЭЛЕКТРОНИКС', segment:'product local', category:'Розничная электроника', count:'10 основных публикаций', text:'Ассортимент магазина превратили в полезный месяц: выбор, снятие сомнений, витрина, вовлечение и предложения.', link:'case-electronics-cherepovets-design.html', images:['assets/cases/electronics-cherepovets/carousels/01/01.webp','assets/cases/electronics-cherepovets/posts/05.webp','assets/cases/electronics-cherepovets/gift/01.webp']},
  {name:'Colorplast', segment:'product services local', category:'Окна и остекление', count:'30 основных публикаций', text:'После первого месяца клиент увеличил пакет с 10 до 20 публикаций. Показываем оба цикла и весь визуальный продукт.', link:'case-colorplast-design.html', images:['assets/cases/colorplast/current/posts/01.jpg','assets/cases/colorplast/current/carousels/04/01.jpg','assets/cases/colorplast/previous/posts/01.jpg']},
  {name:'Налог Эксперт', segment:'services experts', category:'Бухгалтерские услуги', count:'10 основных публикаций', text:'Актуальные поводы, практические разборы, мифы и мягкие предложения для действующего экспертного аккаунта.', link:'case-nalog-expert-design.html', images:['assets/cases/nalog-expert/posts/03.jpg','assets/cases/nalog-expert/carousels/09-01.jpg','assets/cases/nalog-expert/stories/01-01.jpg']},
  {name:'TapLife', segment:'services local', category:'Семейный массажный кабинет', count:'10 основных публикаций', text:'Барьер «не с кем оставить ребёнка» превратили в позиционирование, полезный контент и понятный сценарий визита.', link:'case-taplife-design.html', images:['assets/cases/taplife/posts/01.jpg','assets/cases/taplife/carousels/02/01.jpg','assets/cases/taplife/posts/08.jpg']},
  {name:'Кристалл', segment:'services local', category:'Бурение и водоснабжение', count:'10 основных публикаций', text:'Сложную инженерную услугу разложили на выбор, цену, риски, комплекс работ и понятный переход к расчёту.', link:'case-kristall-water-design.html', images:['assets/cases/kristall-water/posts/01.jpg','assets/cases/kristall-water/posts/07.jpg','assets/cases/kristall-water/carousel/01.jpg']},
  {name:'NARFKiS', segment:'sport social', category:'Инклюзивный спорт', count:'10 публикаций', text:'Анонсы дополнили объяснением новых игр, снятием барьеров, реальными событиями и историей организатора.', link:'case-narfkis-design.html', images:['assets/cases/narfkis/posts/01.jpg','assets/cases/narfkis/posts/04.jpg','assets/cases/narfkis/stories/03.jpg']},
  {name:'INARI', segment:'product local', category:'Доставка еды', count:'10 публикаций', text:'Не только меню: товарная витрина, кухня, помощь с выбором и вовлечение.', link:'case-inari-design.html', images:['assets/cases/inari/posts/01.jpg','assets/cases/inari/carousel-covers/03.jpg','assets/cases/inari/stories/01.jpg']},
  {name:'BORODULINA TAPE', segment:'services experts', category:'Красота и здоровье', count:'10 публикаций', text:'Экспертный месяц без постоянной продажи: публикации, карусели и мини-прогрев.', link:'case-borodulina-tape-design.html', images:['assets/cases/borodulina-tape/posts/01.webp','assets/cases/borodulina-tape/posts/03.webp','assets/cases/borodulina-tape/stories/03.webp']},
  {name:'«Ягодный Рай»', segment:'product local', category:'Фермерский продукт', count:'5 постов', text:'Короткая сезонная серия: знакомство, польза, доверие, продукт и понятный переход к обращению.', link:'case-yagodny-ray-design.html', images:['assets/cases/yagodny-ray/posts/01.jpg','assets/cases/yagodny-ray/posts/03.jpg','assets/cases/yagodny-ray/carousels/01/01.jpg']},
  {name:'ЧЕБУССЭР', segment:'product local', category:'Локальный общепит', count:'10 публикаций', text:'Ассортимент, польза, доверие и первый заказ собраны в связную систему для локальной чебуречной.', link:'case-chebusser-design.html', images:['assets/cases/chebusser/posts/01.jpg','assets/cases/chebusser/carousels/03/01.jpg','assets/cases/chebusser/stories/05.jpg']},
  {name:'«Сильный Парус»', segment:'services experts', category:'Юридические услуги', count:'10 каруселей', text:'Сложные темы превратили в понятную систему: весь месяц — карусели, дополненные тремя мини-прогревами.', link:'case-silny-parus-design.html', images:['assets/cases/silny-parus/carousels/01/01.jpg','assets/cases/silny-parus/carousels/09/01.jpg','assets/cases/silny-parus/stories/03/01.jpg']},
  {name:'Orange Style', segment:'sport local', category:'Фитнес-клуб', count:'10 постов', text:'Пять рубрик удерживают внимание клуба: польза, мифы, доказательства, вовлечение и предложения.', link:'case-orange-style-design.html', images:['assets/cases/orange-style/posts/01.jpg','assets/cases/orange-style/posts/05.jpg','assets/cases/orange-style/stories/03.jpg']},
  {name:'«Дан-Гун»', segment:'sport local', category:'Детский спорт', count:'10+1 публикаций', text:'Контент для набора в группы: снять тревогу родителей, показать пользу и помочь сделать первый шаг.', link:'case-dan-gun-design.html', images:['assets/cases/dan-gun/posts/01.jpg','assets/cases/dan-gun/carousels/07/01.jpg','assets/cases/dan-gun/carousels/bonus/01.jpg']},
  {name:'SIDCOBRA', segment:'sport product experts', category:'Тренер + товары', count:'30 публикаций', text:'Тренировки, ученики и собственные товары соединены в единую чёрно-красную систему на десять недель.', link:'case-sidcobra-design.html', images:['assets/cases/sidcobra/posts/01.jpg','assets/cases/sidcobra/carousels/03/01.jpg','assets/cases/sidcobra/posts/09.jpg']},
  {name:'Роман Седов', segment:'experts services', category:'Личный бренд', count:'10 публикаций', text:'Опыт ведущего превратили в экспертные темы и журнальную визуальную систему, понятную до первого звонка.', link:'case-roman-sedov-design.html', images:['assets/cases/roman-sedov/posts/01.jpg','assets/cases/roman-sedov/posts/03.jpg','assets/cases/roman-sedov/posts/09.jpg']},
  {name:'Электрик Мончегорск', segment:'services local', category:'Локальные услуги', count:'10 публикаций', text:'Первый месяц для локального специалиста: польза, реальные работы, снятие страхов и понятный путь к заявке.', link:'case-electric-monchegorsk-design.html', images:['assets/cases/electric-monchegorsk/posts/01.jpg','assets/cases/electric-monchegorsk/carousels/04/01.jpg','assets/cases/electric-monchegorsk/carousels/07/01.jpg']},
  {name:'Ольга Правдюк', segment:'education experts services', category:'Образование', count:'10+1 публикаций', text:'Сложную профориентацию превратили в понятный путь для родителей и подростков: от мифов и тревоги до консультации.', link:'case-olga-pravdyuk-design.html', images:['assets/cases/olga-pravdyuk/posts/01.jpg','assets/cases/olga-pravdyuk/carousels/02/01.jpg','assets/cases/olga-pravdyuk/carousels/bonus/01.jpg']},
  {name:'Ачинск Беговой', segment:'sport local', category:'Беговое событие', count:'10+1 публикаций', text:'Месяц перед городским стартом: история события, помощь новичкам, атмосфера и понятный маршрут к регистрации.', link:'case-achinsk-begovoy-design.html', images:['assets/cases/achinsk-begovoy/posts/01.jpg','assets/cases/achinsk-begovoy/carousels/02/01.jpg','assets/cases/achinsk-begovoy/carousels/06/01.jpg']},
  {name:'CasaHitto', segment:'product local services', category:'Загородный отдых', count:'10+1 публикаций', text:'Три разных дома превратили в понятную систему выбора: показать объекты, снять сомнения и подвести к бронированию.', link:'case-casahitto-design.html', images:['assets/cases/casahitto/posts/01.jpg','assets/cases/casahitto/carousels/06/01.jpg','assets/cases/casahitto/carousels/bonus/01.jpg']},
  {name:'Клиент Просто', segment:'services experts', category:'B2B-веб-студия', count:'10 публикаций', text:'Услуги, кейсы, блог и внутреннюю работу собрали в один понятный месяц для владельцев бизнеса и маркетологов.', link:'case-klient-prosto-design.html', images:['assets/cases/klient-prosto/posts/01.png','assets/cases/klient-prosto/carousels/04/post-04-slide-01-cover.png','assets/cases/klient-prosto/stories/story-01.jpg']},
  {name:'Ольга Андреева', segment:'services experts', category:'Экспертный проект', count:'10 публикаций', text:'С нуля собрали позицию, тёплые тексты и визуальный язык мягкого перезапуска экспертного проекта.', link:'case-olga-andreeva-design.html', images:['assets/cases/olga-andreeva/posts/01.jpg','assets/cases/olga-andreeva/posts/05.jpg','assets/cases/olga-andreeva/stories/05.jpg']},
  {name:'Dava Holding', segment:'services experts', category:'Бизнес и экономика', count:'10 публикаций', text:'Неподходящий первый план полностью пересобрали и превратили сложную идею в последовательный контент-план.', link:'case-dava-holding-design.html', images:['assets/cases/dava-holding/posts/01.jpg','assets/cases/dava-holding/posts/02.jpg','assets/cases/dava-holding/stories/03.jpg']},
  {name:'REFIX', segment:'services local', category:'Ремонт техники', count:'10 публикаций', text:'Убираем страх неизвестной цены и срока: объясняем диагностику, процесс, детали и действия при аварии.', link:'case-refix-design.html', images:['assets/cases/refix/carousels/01/01.png','assets/cases/refix/posts/03.png','assets/cases/refix/stories/02/03.png']},
  {name:'Dava Life', segment:'product services', category:'Оздоровительная продукция', count:'10 публикаций', text:'Сложную линейку превратили в понятный путь: польза, сомнения, продукт, выбор и заказ.', link:'case-dava-life-design.html', images:['assets/cases/dava-life/posts/01.jpg','assets/cases/dava-life/posts/03.jpg','assets/cases/dava-life/posts/09.jpg']}
];

const CASE_INDUSTRIES = {
  'Саратов Кухни': 'home',
  'FR-moto': 'product',
  'Атерис': 'health local-services',
  'Сергей Глибин': 'expert-b2b sport-events',
  'MoscowPadel': 'sport-events',
  'Ритуал-С': 'local-services',
  'Fjord-Petersburg': 'sport-events local-services',
  'Сияние вяза': 'home product',
  'Липники': 'food',
  'Александр Лисицинский': 'health expert-b2b',
  'Oh! Beauty': 'health local-services',
  'БФ «Доброе сердце»': 'education-social',
  'Альянс Климат': 'home local-services',
  'Invest Management': 'home expert-b2b',
  'МастерПол': 'home product',
  'ЭЛЕКТРОНИКС': 'product',
  'Colorplast': 'home product local-services',
  'Налог Эксперт': 'expert-b2b',
  'TapLife': 'health local-services',
  'Кристалл': 'home local-services',
  'NARFKiS': 'sport-events education-social',
  'INARI': 'food',
  'BORODULINA TAPE': 'health expert-b2b',
  '«Ягодный Рай»': 'food',
  'ЧЕБУССЭР': 'food',
  '«Сильный Парус»': 'expert-b2b',
  'Orange Style': 'sport-events local-services',
  '«Дан-Гун»': 'sport-events education-social',
  'SIDCOBRA': 'sport-events product expert-b2b',
  'Роман Седов': 'expert-b2b sport-events',
  'Электрик Мончегорск': 'home local-services',
  'Ольга Правдюк': 'education-social expert-b2b',
  'Ачинск Беговой': 'sport-events',
  'CasaHitto': 'home local-services',
  'Клиент Просто': 'expert-b2b',
  'Ольга Андреева': 'expert-b2b',
  'Dava Holding': 'expert-b2b',
  'REFIX': 'product local-services',
  'Dava Life': 'health product'
};

function cardTemplate(item, index) {
  const images = item.images.map((src, imageIndex) => `<img src="${src}" alt="${item.name}: работа ${imageIndex + 1}" loading="lazy">`).join('');
  return `<article class="ev-work-card" data-category="${CASE_INDUSTRIES[item.name] || ''}"><div class="ev-work-media">${images}</div><div class="ev-work-copy"><span>${item.category} · ${item.count}</span><h3>${item.name}</h3><p>${item.text}</p><a href="${item.link}">Смотреть работу →</a></div></article>`;
}

document.querySelectorAll('[data-work-grid]').forEach((grid) => {
  grid.innerHTML = CASES.map(cardTemplate).join('');
  const button = grid.parentElement.querySelector('[data-show-more]');
  const section = grid.closest('.ev-works');
  const filterGroup = section.querySelector('[data-case-filters]');
  let activeFilter = 'all';
  let open = false;

  const update = () => {
    const matching = [...grid.children].filter((card) => activeFilter === 'all' || card.dataset.category.split(' ').includes(activeFilter));
    [...grid.children].forEach((card) => card.classList.add('is-hidden'));
    matching.forEach((card, index) => card.classList.toggle('is-hidden', !open && index > 5));
    const remaining = Math.max(0, matching.length - 6);
    button.hidden = remaining === 0;
    const workWord = remaining % 10 === 1 && remaining % 100 !== 11 ? 'работу' : remaining % 10 >= 2 && remaining % 10 <= 4 && (remaining % 100 < 12 || remaining % 100 > 14) ? 'работы' : 'работ';
    button.textContent = open ? 'Скрыть дополнительные работы' : `Показать ещё ${remaining} ${workWord}`;
  };

  button.addEventListener('click', () => {
    open = !open;
    update();
  });

  filterGroup?.addEventListener('click', (event) => {
    const control = event.target.closest('[data-case-filter]');
    if (!control) return;
    activeFilter = control.dataset.caseFilter;
    open = false;
    filterGroup.querySelectorAll('[data-case-filter]').forEach((item) => item.classList.toggle('is-active', item === control));
    update();
  });

  update();
});
