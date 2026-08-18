(() => {
  'use strict';

  const app = document.querySelector('#mvp-app');
  const page = document.body.dataset.page || 'home';
  const root = 'assets/';

  const workImages = [
    'cases/saratov-kitchens-2026-08/posts/03.webp',
    'cases/refix/posts/07.png',
    'cases/moscow-padel/posts/15.jpg',
    'cases/dava-holding/stories/01.jpg',
    'cases/alliance-climate/posts/03.webp',
    'cases/klient-prosto/carousels/04/post-04-slide-01-cover.png',
    'cases/borodulina-tape/stories/03.webp',
    'cases/achinsk-begovoy/posts/01.jpg',
    'cases/kristall-water/posts/06.jpg',
    'cases/inari/posts/01.jpg',
    'cases/oh-beauty/posts/02.jpg',
    'cases/chebusser/carousels/03/01.jpg',
    'cases/dan-gun/posts/04.jpg',
    'cases/olga-andreeva/posts/07.jpg',
    'cases/yagodny-ray/posts/01.jpg',
    'cases/sidcobra/posts/14.jpg'
  ];

  const saratovPosts = [1, 3, 5, 8, 12, 15].map(n => `cases/saratov-kitchens-2026-08/posts/${String(n).padStart(2, '0')}.webp`);
  const saratovStories = [1, 2, 3, 4, 5].map(n => `cases/saratov-kitchens-2026-08/stories/${String(n).padStart(2, '0')}.webp`);
  const saratovCarousel = [1, 2, 3, 4, 5, 6].map(n => `cases/saratov-kitchens-2026-08/carousels/06/${String(n).padStart(2, '0')}.webp`);

  const image = (src, alt, extra = '') => `<img src="${root}${src}" alt="${alt}" loading="lazy" ${extra}>`;
  const mediaButton = (src, alt) => `<button type="button" data-lightbox="${root}${src}" aria-label="Открыть работу">${image(src, alt)}</button>`;

  const routes = {
    home: 'mvp-home-design.html',
    pricing: 'mvp-pricing-design.html',
    examples: 'mvp-examples-design.html',
    case: 'mvp-case-design.html',
    audit: 'mvp-audit-design.html'
  };

  function header(active) {
    return `
      <header class="mvp-header">
        <div class="mvp-header__bar">
          <a class="mvp-logo" href="${routes.home}" aria-label="lemonmedia - главная">
            <img src="assets/design/logo-dark.svg" alt="lemonmedia">
          </a>
          <nav class="mvp-nav" aria-label="Основная навигация">
            <a href="${routes.examples}" ${active === 'examples' ? 'aria-current="page"' : ''}>Примеры работ</a>
            <a href="${routes.pricing}" ${active === 'pricing' ? 'aria-current="page"' : ''}>Цены</a>
            <a href="${routes.audit}" ${active === 'audit' ? 'aria-current="page"' : ''}>Бесплатный разбор</a>
          </nav>
          <a class="mvp-btn mvp-btn--lemon" href="#start">Оставить заявку</a>
          <button class="mvp-menu" type="button" data-menu-open aria-label="Открыть меню">☰</button>
        </div>
      </header>
      <nav class="mvp-mobile-nav" data-mobile-nav aria-label="Мобильная навигация">
        <button class="mvp-mobile-nav__close" type="button" data-menu-close aria-label="Закрыть меню">×</button>
        <a href="${routes.home}">Главная</a>
        <a href="${routes.examples}">Примеры работ</a>
        <a href="${routes.pricing}">Цены</a>
        <a href="${routes.audit}">Бесплатный разбор</a>
      </nav>`;
  }

  function footer() {
    return `
      <footer class="mvp-footer">
        <div class="mvp-shell mvp-footer__grid">
          <div>
            <a class="mvp-logo" href="${routes.home}" aria-label="lemonmedia - главная"><img src="assets/design/logo-white.svg" alt="lemonmedia"></a>
            <p class="mvp-footer__note">Ведём соцсети малого и среднего бизнеса под ключ.</p>
          </div>
          <div class="mvp-footer__col"><strong>Разделы</strong><a href="${routes.home}">Главная</a><a href="${routes.examples}">Примеры работ</a><a href="${routes.pricing}">Цены</a><a href="${routes.audit}">Бесплатный разбор</a></div>
          <div class="mvp-footer__col"><strong>Услуги</strong><a href="${routes.pricing}#social">Ведение соцсетей</a><a href="${routes.pricing}#video">Ролики</a><a href="${routes.pricing}#oneoffs">Оформление соцсети</a><a href="${routes.pricing}#oneoffs">Логотип</a></div>
          <div class="mvp-footer__col"><strong>Документы</strong><a href="legal-design.html#offer">Оферта</a><a href="legal-design.html#privacy">Конфиденциальность</a><a href="legal-design.html#requisites">Реквизиты ИП Тумаков</a></div>
        </div>
      </footer>`;
  }

  function dialog() {
    return `<dialog class="mvp-dialog" data-dialog><button type="button" data-dialog-close>Закрыть ×</button><img data-dialog-image src="${root}cases/saratov-kitchens-2026-08/posts/01.webp" alt=""></dialog>`;
  }

  function priceCards(detailed = false) {
    const start = detailed
      ? ['8 постов в месяц (картинка + текст)', 'публикации 2 раза в неделю', 'контент-план от маркетолога', 'дизайн в стиле вашего бренда', 'публикация во все соцсети', 'личный менеджер, правки входят', 'без каруселей, сторис и видео']
      : ['8 постов', 'публикации 2 раза в неделю'];
    const standard = detailed
      ? ['16 постов в месяц', '4 карусели (листаются, сильнее вовлекают)', '8 серий сторис (мини-прогревы к постам)', 'публикации через день', 'всё из «Старта»: план, тексты, дизайн, публикация, менеджер']
      : ['16 постов', '4 карусели', '8 серий сторис', 'публикации через день'];
    const max = detailed
      ? ['24 поста в месяц', '8 каруселей', '16 серий сторис', '4 ролика (Reels / Клипы / Shorts) - единственный тариф с видео', 'публикации почти каждый день']
      : ['24 поста', '8 каруселей', '16 серий сторис', '4 ролика', 'публикации почти каждый день'];
    const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;

    return `
      <div class="mvp-prices">
        <article class="mvp-price">
          <h3 class="mvp-h3">Старт</h3>
          <p class="mvp-price__money">4 990 ₽<span>/мес</span></p>
          ${list(start)}
          <p class="mvp-price__for">Минимум, чтобы соцсети жили и выглядели профессионально. Без каруселей, сторис и видео.</p>
          <button class="mvp-btn mvp-btn--ghost" type="button" data-pick-plan="Старт">Выбрать этот тариф</button>
        </article>
        <article class="mvp-price mvp-price--featured">
          <span class="mvp-price__badge">выбирает большинство</span>
          <h3 class="mvp-h3">Стандарт</h3>
          <p class="mvp-price__money">9 900 ₽<span>/мес</span></p>
          ${list(standard)}
          <p class="mvp-price__accent">Контента в 3,5 раза больше, чем в «Старте», - лента не замолкает ни на день.</p>
          <p class="mvp-price__for">Полноценное присутствие: лента, карусели и сторис работают вместе.</p>
          <button class="mvp-btn mvp-btn--purple" type="button" data-pick-plan="Стандарт">Выбрать этот тариф</button>
        </article>
        <article class="mvp-price">
          <span class="mvp-price__badge">максимум отдачи</span>
          <h3 class="mvp-h3">Максимум</h3>
          <p class="mvp-price__money">14 900 ₽<span>/мес</span></p>
          ${list(max)}
          <p class="mvp-price__accent">Единственный тариф с видео - самым сильным форматом по охватам.</p>
          <p class="mvp-price__for">Соцсети выглядят как у большого бренда: лента, сторис и ролики каждый день.</p>
          <button class="mvp-btn mvp-btn--ghost" type="button" data-pick-plan="Максимум">Выбрать этот тариф</button>
        </article>
      </div>`;
  }

  function contactForm({ title, text, audit = false, context = '' }) {
    const planChoices = audit ? '' : `
      <p><strong>Выберите тариф</strong></p>
      <div class="mvp-form__choices" data-plan-choices>
        ${['Старт', 'Стандарт', 'Максимум', 'не решил - посоветуйте'].map((item, index) => `<button class="mvp-choice ${index === 3 ? 'is-active' : ''}" type="button" data-plan="${item}">${item}</button>`).join('')}
      </div>
      <input type="hidden" name="plan" value="не решил - посоветуйте" data-plan-value>`;
    const auditFields = audit ? `
      <label class="mvp-field mvp-field--wide"><span>Ссылка на вашу группу или профиль</span><input type="url" name="profile" placeholder="https://..." required></label>
      <label class="mvp-field mvp-field--wide"><span>Пара слов о бизнесе (необязательно)</span><textarea name="about" placeholder="Чем вы занимаетесь"></textarea></label>` : '';
    return `
      <section class="mvp-section mvp-section--purple" id="start">
        <div class="mvp-shell mvp-form">
          <div>
            <p class="mvp-eyebrow">Можно начать без оплаты</p>
            <h2 class="mvp-h2">${title}</h2>
            <p class="mvp-lead">${text}</p>
            <div class="mvp-form__person">
              ${image('img/people/ksyusha-guide.jpeg', 'Ксюша, менеджер lemonmedia')}
              <p>Ответим на вопросы, покажем примеры по вашей нише и честно подскажем следующий шаг.</p>
            </div>
          </div>
          <form class="mvp-form__box" data-form>
            ${planChoices}
            <input type="hidden" name="context" value="${context}">
            <div class="mvp-fields">
              ${auditFields}
              <label class="mvp-field"><span>Имя</span><input name="name" autocomplete="name" placeholder="Как к вам обращаться" required></label>
              <label class="mvp-field"><span>Телефон или мессенджер</span><input name="contact" placeholder="Telegram, WhatsApp, MAX или телефон" required></label>
              <label class="mvp-field mvp-field--wide"><span>Как удобнее</span><select name="way"><option>Напишу сам</option><option>Свяжитесь со мной в мессенджере</option><option>Позвоните мне</option></select></label>
              <button class="mvp-btn mvp-btn--lemon mvp-field--wide" type="submit">${audit ? 'Получить разбор' : 'Отправить'}</button>
            </div>
            <p class="mvp-form__small">${audit ? 'Разбор придёт в течение 1-2 рабочих дней.' : 'Менеджер ответит в течение дня, чаще - в течение часа.'}</p>
            <p class="mvp-form__small">Нажимая, вы соглашаетесь с политикой конфиденциальности.</p>
            <p class="mvp-form__message" data-form-message hidden>Спасибо! В дизайн-прототипе форма показывает только сценарий отправки.</p>
          </form>
        </div>
      </section>`;
  }

  function homePage() {
    const columns = [workImages.slice(0, 4), workImages.slice(4, 8), workImages.slice(8, 12), workImages.slice(12, 16)];
    const platforms = [
      ['VK', 'ВКонтакте'], ['➤', 'Telegram'], ['Дз', 'Дзен'], ['ОК', 'Одноклассники'],
      ['◎', 'Instagram*'], ['MAX', 'MAX'], ['@', 'Threads*'], ['▶', 'YouTube (для роликов)']
    ];
    const cases = [
      { title: 'Саратов Кухни', niche: 'Ремонт и дом', count: '15 публикаций · 5 каруселей · 29 визуалов', images: saratovPosts.slice(0, 3), href: routes.case },
      { title: 'Moscow Padel', niche: 'Спорт', count: 'Посты · карусели · сторис', images: ['cases/moscow-padel/posts/15.jpg', 'cases/moscow-padel/carousels/09/01.jpg', 'cases/moscow-padel/carousels/06/01.jpg'], href: routes.case },
      { title: 'Oh Beauty', niche: 'Красота и здоровье', count: 'Посты · визуалы · оформление', images: ['cases/oh-beauty/posts/02.jpg', 'cases/oh-beauty/posts/01.jpg', 'cases/oh-beauty/posts/03.jpg'], href: routes.case },
      { title: 'ЧЕБУССЭР', niche: 'Еда и доставка', count: 'Посты · карусели · сторис', images: ['cases/chebusser/carousels/03/01.jpg', 'cases/chebusser/posts/04.jpg', 'cases/chebusser/posts/05.jpg'], href: routes.case },
      { title: 'REFIX', niche: 'Услуги и эксперты', count: 'Посты · карусели · сторис', images: ['cases/refix/posts/07.png', 'cases/refix/posts/03.png', 'cases/refix/stories/02/03.png'], href: routes.case },
      { title: 'DAVA Life', niche: 'Отдых и туризм', count: 'Посты · карусели · сторис', images: ['cases/dava-life/posts/01.jpg', 'cases/dava-life/posts/03.jpg', 'cases/dava-life/posts/09.jpg'], href: routes.case }
    ];
    const faq = [
      ['Контент будет делать нейросеть?', 'Нет. План, тексты и дизайн делают живые маркетолог и дизайнер. ИИ ускоряет рутину - за счёт этого цена ниже рынка, - но не придумывает и не рисует за людей. Аудитория чувствует ИИ-штамповку, поэтому мы её не делаем.'],
      ['Что если мне не понравится?', 'Сначала правки - они входят в цену: отдельно по текстам, отдельно по дизайну. Если после правок всё равно не то - в первые 14 дней вернём деньги.'],
      ['Что мне придётся делать самому?', 'Один раз заполнить бриф и раз в неделю согласовывать материалы. Всё остальное - на нас.'],
      ['У меня нет фотографий. Как будете делать контент?', 'Это не проблема. Работаем с тем, что есть: ваши фото, съёмка на телефон по нашим подсказкам, дизайн-макеты. А то, чего нет, генерируем нейросетями на профессиональном уровне: интерьеры, предметку, фоны, людей - так, что не отличить от съёмки. Контент без фотосессий - обычная для нас задача.'],
      ['В какие соцсети публикуете?', 'ВКонтакте, Telegram, Дзен, Одноклассники, Instagram*, MAX, Threads*, для роликов - YouTube. Один и тот же контент адаптируем и выкладываем везде, где есть ваша аудитория, без доплаты.'],
      ['А Instagram - это вообще законно?', 'Вести аккаунт и публиковать контент - законно. Запрещена реклама в Instagram (с сентября 2025). Мы публикуем контент и соблюдаем требования закона: маркировку и ограничения учитываем сами, вам следить не нужно.'],
      ['Когда выйдет первый пост?', 'Первую партию контента вы увидите примерно через 7 рабочих дней после брифа: 2 дня - план и тексты, ваши правки, ещё 2 дня - дизайн. После утверждения начинаем публиковать по графику.'],
      ['Как проходит оплата? Есть документы?', 'Работаем как ИП по оферте: счёт, карта, QR, Долями, рассрочка. Закрывающие документы даём. Оплачивать можно из-за рубежа.'],
      ['Вы гарантируете рост подписчиков и заявки?', 'Нет, и не верьте тем, кто гарантирует. Мы отвечаем за то, что контролируем: профессиональный контент, выходящий вовремя. Живой, регулярный, качественный контент - главное условие, чтобы соцсети начали работать, но продажи зависят и от продукта, цен и спроса.'],
      ['Можно поменять тариф или уйти?', 'Да. Оплата помесячная: закончился месяц - продлеваете, меняете тариф или останавливаетесь. Никаких договоров на год.'],
      ['Кто будет со мной на связи?', 'Личный менеджер в удобном вам мессенджере: ВКонтакте, Telegram, WhatsApp, MAX. Отвечает в рабочее время в течение часа-двух.'],
      ['Чем вы отличаетесь от фрилансера за те же деньги?', 'За 4 990-14 900 ₽ фрилансер делает всё один и ведёт параллельно несколько проектов. У нас над вашим контентом работают трое: маркетолог думает, дизайнер рисует, менеджер следит за сроками. И если человек заболел - конвейер не останавливается.']
    ];

    return `
      ${header('home')}
      <main class="mvp-main">
        <section class="mvp-home-hero">
          <div class="mvp-home-hero__copy">
            <div class="mvp-home-hero__copy-inner">
              <p class="mvp-rating"><span>★★★★★</span> 5,0 · более 200 отзывов на Яндекс Картах</p>
              <h1>Ведём ваши соцсети.<br><mark>От 4 990 ₽</mark> в месяц</h1>
              <p class="mvp-home-hero__lead">Маркетолог, дизайнер и личный менеджер делают контент за вас: план, тексты, дизайн, публикация. Вы только согласовываете - это 15 минут в неделю.</p>
              <ul class="mvp-hero-checks"><li>Контент делают живые люди, не нейросеть</li><li>Публикуем сразу во все ваши соцсети</li><li>Не понравится - вернём деньги</li></ul>
              <div class="mvp-actions"><a class="mvp-btn mvp-btn--lemon" href="#prices">Выбрать тариф</a><a class="mvp-btn mvp-btn--ghost" href="${routes.audit}">Бесплатный разбор</a></div>
              <p class="mvp-hero-proof">6 лет · 10 000+ проектов · рейтинг 5,0 и 200+ отзывов на Яндекс Картах</p>
            </div>
          </div>
          <div class="mvp-workwall" aria-label="Живая лента реальных работ lemonmedia">
            <div class="mvp-workwall__grid">${columns.map(col => `<div class="mvp-workwall__col">${col.concat(col).map((src, index) => mediaButton(src, `Реальная работа lemonmedia ${index + 1}`)).join('')}</div>`).join('')}</div>
            <a class="mvp-workwall__proof" href="${routes.examples}">Все работы - реальные →</a>
          </div>
        </section>

        <section class="mvp-section">
          <div class="mvp-shell mvp-panel mvp-panel--lavender mvp-distribution">
            <div>
              <p class="mvp-eyebrow">Один материал - много площадок</p>
              <h2 class="mvp-h2">Один пост - сразу во всех ваших соцсетях</h2>
              <p class="mvp-lead">Мы делаем контент один раз и публикуем его на всех площадках, где есть ваши клиенты. Доплачивать за каждую соцсеть не нужно - это входит в тариф.</p>
              <div class="mvp-content-pack">
                <div class="mvp-content-pack__top"><strong>Контент готов</strong><span>10 материалов</span></div>
                <div class="mvp-content-pack__images">${saratovPosts.slice(0, 4).map((src, i) => image(src, `Готовый материал ${i + 1}`)).join('')}</div>
              </div>
              <p class="mvp-form__small">*Instagram и Threads принадлежат Meta, признанной экстремистской организацией и запрещённой в РФ.</p>
            </div>
            <div class="mvp-network-list">${platforms.map(([icon, name]) => `<div class="mvp-network"><span class="mvp-network__icon">${icon}</span><div><strong>${name}</strong><br><small>опубликовано по графику</small></div><b>✓</b></div>`).join('')}</div>
          </div>
        </section>

        <section class="mvp-section mvp-section--white">
          <div class="mvp-shell">
            <div class="mvp-section-head"><div><p class="mvp-eyebrow">Как работаем</p><h2 class="mvp-h2">Вся ваша работа - 15 минут в неделю</h2></div><p class="mvp-lead">Мы забираем на себя всё: придумать, написать, нарисовать, опубликовать. От вас - один бриф в начале и пара «ок» в мессенджере. Вот как это устроено:</p></div>
            <div class="mvp-process">
              <article class="mvp-process__step"><b class="mvp-process__index">01</b><div><h3 class="mvp-h3">Заполняете бриф - один раз, минут за 15.</h3><p class="mvp-copy">Рассказываете о бизнесе: что продаёте, кто клиенты, что любите и что нельзя.</p></div><div class="mvp-process__visual">${image('img/product-inside/real-brief-refix.png', 'Скриншот реального брифа')}</div></article>
              <article class="mvp-process__step"><b class="mvp-process__index">02</b><div><h3 class="mvp-h3">Через 2 дня - контент-план и тексты.</h3><p class="mvp-copy">Маркетолог придумывает темы под ваши задачи и пишет тексты. Вы читаете и говорите, что поправить - правки входят в цену.</p></div><div class="mvp-process__visual">${image('img/product-inside/real-content-plan-refix.png', 'Скриншот настоящего контент-плана')}</div></article>
              <article class="mvp-process__step"><b class="mvp-process__index">03</b><div><h3 class="mvp-h3">Ещё 2 дня - дизайн.</h3><p class="mvp-copy">Дизайнер отрисовывает посты в стиле вашего бренда. Снова смотрите и утверждаете.</p></div><div class="mvp-process__visual">${image('cases/refix/posts/03.png', 'Реальный утверждённый макет')}</div></article>
              <article class="mvp-process__step"><b class="mvp-process__index">04</b><div><h3 class="mvp-h3">Публикуем сами, по графику.</h3><p class="mvp-copy">Загружаем всё в календарь и выпускаем без вашего участия. Вы видите, что и когда выйдет.</p></div><div class="mvp-process__visual">${image('img/product-inside/real-calendar-electric.png', 'Скриншот календаря публикаций')}</div></article>
            </div>
            <p class="mvp-lead"><strong>Первый готовый контент - уже через 7 рабочих дней после брифа.</strong></p>
            <div class="mvp-video-slot"><div><h3 class="mvp-h3">Как устроена работа изнутри</h3><p>Продающее видео от Ивана, основателя lemonmedia. Место под ролик уже встроено в композицию.</p></div><button class="mvp-video-slot__play" type="button" aria-label="Видео будет добавлено позже">▶</button></div>
          </div>
        </section>

        <section class="mvp-section">
          <div class="mvp-shell mvp-panel mvp-panel--dark" data-tabs>
            <div class="mvp-section-head"><div><p class="mvp-eyebrow">Полный месяц</p><h2 class="mvp-h2">Вот как выглядит месяц нашей работы. Целиком</h2></div><p class="mvp-lead">Красивые картинки в портфолио умеют показывать все. Мы показываем весь месяц одного клиента без купюр: каждый пост, каждый текст, каждый слайд карусели и календарь выхода.</p></div>
            <div class="mvp-tabs" role="tablist">${['План', 'Лента', 'Тексты', 'Карусели', 'Сторис', 'Календарь'].map((name, i) => `<button class="mvp-tab ${i === 0 ? 'is-active' : ''}" type="button" data-tab="month-${i}">${name}</button>`).join('')}</div>
            <div class="mvp-tabpanel is-active" data-panel="month-0"><table class="mvp-plan-table"><tbody><tr><th>05 августа</th><td>Как выбрать кухню и не переделывать через год</td><td>Польза</td></tr><tr><th>07 августа</th><td>Двухцветная классика на годы</td><td>Работа</td></tr><tr><th>09 августа</th><td>Модель Beverly - тёплая классика</td><td>Продукт</td></tr><tr><th>11 августа</th><td>Кухня на заказ = переплата</td><td>Миф</td></tr></tbody></table></div>
            <div class="mvp-tabpanel" data-panel="month-1"><div class="mvp-media-grid">${saratovPosts.map((src, i) => image(src, `Пост месяца ${i + 1}`)).join('')}</div></div>
            <div class="mvp-tabpanel" data-panel="month-2"><div class="mvp-panel"><h3 class="mvp-h3">Как выбрать кухню и не переделывать через год</h3><p class="mvp-copy">Кухня покупается не на год и не на два. Контент помогает человеку проверить планировку, материалы, фурнитуру и хранение до заказа.</p></div></div>
            <div class="mvp-tabpanel" data-panel="month-3"><div class="mvp-media-grid">${saratovCarousel.map((src, i) => image(src, `Слайд карусели ${i + 1}`)).join('')}</div></div>
            <div class="mvp-tabpanel" data-panel="month-4"><div class="mvp-media-grid mvp-media-grid--stories">${saratovStories.map((src, i) => image(src, `Сторис ${i + 1}`)).join('')}</div></div>
            <div class="mvp-tabpanel" data-panel="month-5">${image('img/product-inside/real-calendar-electric.png', 'Календарь публикаций')}</div>
            <div class="mvp-actions"><a class="mvp-btn mvp-btn--lemon" href="${routes.case}">Посмотреть весь кейс</a></div>
          </div>
        </section>

        <section class="mvp-section mvp-section--white">
          <div class="mvp-shell">
            <div class="mvp-section-head"><div><p class="mvp-eyebrow">Реальные проекты</p><h2 class="mvp-h2">Найдите свою нишу</h2></div><p class="mvp-lead">Кафе и доставка, бьюти, ремонт и стройка, спорт, эксперты, локальный ритейл - за 6 лет мы делали контент почти для всего.</p></div>
            <div class="mvp-case-cards">${cases.map(item => `<a class="mvp-case-card" href="${item.href}"><div class="mvp-case-card__mosaic">${image(item.images[0], item.title)}<div>${image(item.images[1], item.title)}${image(item.images[2], item.title)}</div></div><div><span class="lm-chip">${item.niche}</span><h3 class="mvp-h3">${item.title}</h3><p>${item.count}</p></div></a>`).join('')}</div>
            <div class="mvp-actions"><a class="mvp-btn mvp-btn--ghost" href="${routes.examples}">Все примеры работ</a></div>
          </div>
        </section>

        <section class="mvp-section" id="prices">
          <div class="mvp-shell">
            <div class="mvp-section-head"><div><p class="mvp-eyebrow">Понятный выбор</p><h2 class="mvp-h2">Три тарифа. Без скрытых доплат</h2></div><p class="mvp-lead">В каждом тарифе - полный цикл: контент-план, тексты, дизайн, публикация и личный менеджер. Разница только в объёме.</p></div>
            ${priceCards(false)}
            <p class="mvp-lead">Нужны только ролики? Делаем отдельно - от 5 990 ₽/мес. Разовые задачи: оформление соцсети или логотип - по 9 900 ₽. → <a href="${routes.pricing}">Все услуги и цены</a></p>
            <p class="mvp-copy">Оплата как удобно: картой, по счёту, Долями, Сплитом или в рассрочку от надёжных банков. Работаем по всей России и с зарубежьем.</p>
          </div>
        </section>

        <section class="mvp-section mvp-section--lemon">
          <div class="mvp-shell mvp-guarantee"><strong class="mvp-guarantee__number">14 дней</strong><div><h2 class="mvp-h2">Первые 14 дней вы ничем не рискуете</h2><p class="mvp-lead">Посмотрите первую партию контента, попросите правки. Если результат не понравится - вернём деньги. Без выяснений и «а вы сначала докажите». Мы 6 лет на рынке, нам дороже репутация.</p><a href="legal-design.html#offer">Условия в оферте →</a></div></div>
        </section>

        <section class="mvp-section mvp-section--white">
          <div class="mvp-shell">
            <div class="mvp-section-head mvp-section-head--single"><p class="mvp-eyebrow">Что достаётся вам</p><h2 class="mvp-h2">Почему не фрилансер и не штатный SMM-щик?</h2></div>
            <div class="mvp-compare-wrap"><table class="mvp-compare"><thead><tr><th></th><th>Цена в месяц</th><th>Кто делает</th><th>Риск</th></tr></thead><tbody><tr><td>Самому / сотрудник в нагрузку</td><td>0 ₽</td><td>вы, по вечерам</td><td>нерегулярно, выгорание</td></tr><tr><td>Фрилансер</td><td>15 000-40 000 ₽</td><td>один человек на 5 проектах</td><td>может пропасть</td></tr><tr><td>Штатный SMM-специалист</td><td>95 000-110 000 ₽</td><td>один человек на всё</td><td>дорого, простаивает</td></tr><tr><td>Агентство</td><td>50 000-150 000 ₽</td><td>команда</td><td>избыточно для задачи «контент»</td></tr><tr><td>lemonmedia</td><td>от 4 990 ₽</td><td>маркетолог + дизайнер + менеджер</td><td>14 дней - возврат</td></tr></tbody></table></div>
            <p class="mvp-lead">Мы можем так дёшево не потому, что делаем плохо, а потому что делаем только одно - контент - и поставили это на систему: узкая услуга, отлаженный конвейер, технологии на рутине, люди на смысле.</p>
          </div>
        </section>

        <section class="mvp-section">
          <div class="mvp-shell">
            <div class="mvp-section-head"><div><p class="mvp-eyebrow">Доверие можно проверить</p><h2 class="mvp-h2">10 000+ проектов за 6 лет</h2></div><p class="mvp-lead">10 000+ проектов · 6 лет на рынке · 200+ отзывов · рейтинг 5,0 на Яндекс Картах</p></div>
            <div class="mvp-review-wall"><div class="mvp-review-score"><strong>5,0</strong><span>★★★★★</span><p>Более 200 отзывов</p></div>${['Отзыв о ведении контента', 'Отзыв о работе команды', 'Отзыв о правках и сроках'].map(title => `<article class="mvp-review"><span class="lm-chip">Яндекс Карты</span><h3 class="mvp-h3">${title}</h3><p>Место для скриншота реального публичного отзыва с именем и датой.</p></article>`).join('')}</div>
            <div class="mvp-actions"><a class="mvp-btn mvp-btn--ghost" href="https://yandex.ru/maps/org/lemon_media/138965142865/reviews/" target="_blank" rel="noopener">Читать все отзывы на Яндекс Картах ↗</a></div>
          </div>
        </section>

        <section class="mvp-section mvp-section--white">
          <div class="mvp-shell">
            <div class="mvp-section-head mvp-section-head--single"><p class="mvp-eyebrow">Без ухода от ответа</p><h2 class="mvp-h2">Честные ответы на неудобные вопросы</h2></div>
            <div class="mvp-faq">${faq.map(([q, a], i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
          </div>
        </section>
        ${contactForm({ title: 'Через неделю в ваших соцсетях будет первый готовый контент', text: 'Выберите тариф - и менеджер свяжется с вами сегодня же. Или просто напишите нам в мессенджер: ответим на вопросы, покажем примеры по вашей нише, посоветуем, с чего начать.' })}
      </main>
      ${footer()}
      ${dialog()}`;
  }

  function pricingPage() {
    return `
      ${header('pricing')}
      <main class="mvp-main">
        <section class="mvp-price-hero">
          <div class="mvp-shell"><p class="mvp-eyebrow">Все цены открыты</p><h1 class="mvp-title">Услуги и цены</h1><p class="mvp-lead">Все цены открыты - ничего не прячем за «рассчитаем индивидуально». Выбирайте, что нужно: ведение соцсетей под ключ, ролики, оформление или логотип.</p></div>
        </section>
        <section class="mvp-section mvp-section--tight" id="social">
          <div class="mvp-shell"><div class="mvp-section-head"><div><p class="mvp-eyebrow">Главная услуга</p><h2 class="mvp-h2">Ведение соцсетей</h2></div><p class="mvp-lead">В каждом тарифе - полный цикл и команда: маркетолог, дизайнер, личный менеджер. Публикация во все ваши соцсети уже включена.</p></div>${priceCards(true)}
            <p class="mvp-lead">Серия сторис - это мини-прогрев из ~5 экранов, который ведёт к посту или карусели. Ролик - вертикальное видео 20-60 секунд со сценарием, монтажом и озвучкой.</p>
            <div class="mvp-format-strip"><div class="mvp-format">${image('cases/saratov-kitchens-2026-08/posts/03.webp', 'Пример поста')}Пост</div><div class="mvp-format">${image('cases/saratov-kitchens-2026-08/carousels/06/01.webp', 'Пример карусели')}Карусель</div><div class="mvp-format">${image('cases/saratov-kitchens-2026-08/stories/01.webp', 'Пример сторис')}Серия сторис</div><div class="mvp-format">${image('img/services/ai-avatar-demo-v1.jpg', 'Пример ролика')}Ролик</div></div>
          </div>
        </section>

        <section class="mvp-section mvp-section--dark" id="video">
          <div class="mvp-shell"><div class="mvp-section-head"><div><p class="mvp-eyebrow">Отдельный продукт</p><h2 class="mvp-h2">Только ролики - без ведения</h2></div><p class="mvp-lead">Если лента и так живёт, а нужны короткие видео: Reels, VK Клипы, Shorts. Сценарий, монтаж, озвучка и публикация - на нас.</p></div>
            <div class="mvp-video-packages"><article class="mvp-video-package"><span>4 ролика</span><strong>5 990 ₽/мес</strong><p>~1 498 ₽ за ролик</p></article><article class="mvp-video-package mvp-video-package--featured"><span>8 роликов · оптимально</span><strong>9 990 ₽/мес</strong><p>~1 249 ₽ за ролик</p></article><article class="mvp-video-package"><span>12 роликов</span><strong>12 990 ₽/мес</strong><p>~1 083 ₽ за ролик</p></article></div>
            <p class="mvp-lead">Что входит в каждый ролик: сценарий и раскадровка · монтаж вашего материала или генерация видеоряда · озвучка и субтитры · музыка и оформление под бренд · публикация, включая YouTube Shorts.</p>
            <div class="mvp-avatar"><div>${image('img/services/ai-avatar-demo-v1.jpg', 'Реальный пример цифрового ведущего')}</div><div><p class="mvp-eyebrow">Разово</p><h3 class="mvp-h2">Цифровой ведущий для ваших роликов</h3><p class="mvp-lead">Создаём AI-аватара - одно лицо бренда, которое ведёт ваши ролики. Без съёмок, не болеет, не уходит в отпуск и всегда остаётся с вами. Оплата один раз, дальше аватар работает во всех роликах вашего тарифа.</p><div class="mvp-avatar-tiers"><div class="mvp-avatar-tier"><span>Базовый - 1 ракурс</span><strong>2 900 ₽</strong></div><div class="mvp-avatar-tier"><span>Расширенный - 5 ракурсов + 1 сцена</span><strong>4 900 ₽</strong></div><div class="mvp-avatar-tier"><span>Премиум - 5 ракурсов + 3 сцены</span><strong>9 900 ₽</strong></div></div></div></div>
          </div>
        </section>

        <section class="mvp-section" id="oneoffs"><div class="mvp-shell"><div class="mvp-section-head mvp-section-head--single"><p class="mvp-eyebrow">Когда не нужно ведение</p><h2 class="mvp-h2">Разовые задачи</h2></div><div class="mvp-oneoffs"><article class="mvp-oneoff"><div><h3 class="mvp-h3">Оформление соцсети - 9 900 ₽</h3><p class="mvp-copy">Обложка, аватар, описание, меню, виджеты и закреплённый пост - соцсеть, в которую не стыдно вести рекламу. ВКонтакте, Instagram* или другая площадка.</p></div><div class="mvp-oneoff__visual">${image('cases/colorplast/previous/posts/01.jpg', 'До оформления')}${image('cases/colorplast/current/posts/01.jpg', 'После оформления')}</div></article><article class="mvp-oneoff"><div><h3 class="mvp-h3">Логотип - 9 900 ₽</h3><p class="mvp-copy">Логотип и базовый фирменный стиль: цвета, шрифты, правила использования. Основа, на которой держится весь контент.</p></div><div class="mvp-oneoff__visual">${image('cases/refix/posts/03.png', 'Пример фирменного стиля')}${image('cases/refix/posts/07.png', 'Пример фирменного стиля')}</div></article></div><p class="mvp-lead">Эти задачи чаще всего берут вместе с ведением: сначала приводим соцсеть в порядок, потом наполняем контентом.</p></div></section>

        <section class="mvp-section mvp-section--white"><div class="mvp-shell"><div class="mvp-section-head"><div><p class="mvp-eyebrow">Старт без сюрпризов</p><h2 class="mvp-h2">От заявки до первого поста - одна неделя</h2></div><p class="mvp-lead">Счёт для ИП/ООО, карта, QR, Долями, Сплит, рассрочка от надёжных банков. Оплата из-за рубежа - без проблем. Работаем по оферте, закрывающие документы даём.</p></div><div class="mvp-route">${['Пишете нам', 'Менеджер отвечает в течение дня, помогает выбрать тариф', 'Оплата после разговора, не до', 'Бриф 15 минут', 'Через 2 дня план и тексты', 'Ещё 2 дня дизайн', 'Публикуем'].map((item, i, arr) => `<div class="mvp-route__step"><b>${String(i + 1).padStart(2, '0')}</b><p>${item}</p></div>${i < arr.length - 1 ? '<span class="mvp-route__arrow">→</span>' : ''}`).join('')}</div></div></section>
        <section class="mvp-section mvp-section--lemon"><div class="mvp-shell mvp-guarantee"><strong class="mvp-guarantee__number">14 дней</strong><div><h2 class="mvp-h2">14 дней на возврат</h2><p class="mvp-lead">Не понравится первая партия контента после правок - вернём деньги. Это написано в оферте, а не только на сайте.</p></div></div></section>
        ${contactForm({ title: 'Не знаете, какой тариф ваш? Спросите', text: 'Напишите нам - посоветуем честно: иногда «Старта» достаточно, и мы так и скажем.' })}
      </main>${footer()}${dialog()}`;
  }

  const projects = [
    { name: 'Саратов Кухни', city: 'Саратов', niche: 'home', formats: 'posts carousel stories', tag: 'Ремонт и дом', count: '15 публикаций · 5 каруселей · 29 визуалов', images: saratovPosts.slice(0, 4) },
    { name: 'Moscow Padel', city: 'Москва', niche: 'sport', formats: 'posts carousel stories', tag: 'Спорт', count: 'Посты · карусели · сторис', images: ['cases/moscow-padel/posts/15.jpg','cases/moscow-padel/carousels/09/01.jpg','cases/moscow-padel/carousels/06/01.jpg','cases/moscow-padel/posts/02.jpg'] },
    { name: 'Oh Beauty', city: 'Москва', niche: 'beauty', formats: 'posts design', tag: 'Красота и здоровье', count: 'Посты · визуалы · оформление', images: ['cases/oh-beauty/posts/02.jpg','cases/oh-beauty/posts/01.jpg','cases/oh-beauty/posts/03.jpg','cases/oh-beauty/carousel/01.jpg'] },
    { name: 'ЧЕБУССЭР', city: 'Нижний Новгород', niche: 'food', formats: 'posts carousel stories', tag: 'Еда', count: 'Посты · карусели · сторис', images: ['cases/chebusser/carousels/03/01.jpg','cases/chebusser/posts/04.jpg','cases/chebusser/posts/05.jpg','cases/chebusser/posts/08.jpg'] },
    { name: 'REFIX', city: 'Россия', niche: 'services', formats: 'posts carousel stories', tag: 'Услуги и эксперты', count: 'Посты · карусели · сторис', images: ['cases/refix/posts/07.png','cases/refix/posts/03.png','cases/refix/stories/02/03.png','cases/refix/carousels/01/01.png'] },
    { name: 'DAVA Life', city: 'Карелия', niche: 'travel', formats: 'posts stories', tag: 'Отдых', count: 'Посты · сторис · оформление', images: ['cases/dava-life/posts/01.jpg','cases/dava-life/posts/03.jpg','cases/dava-life/posts/09.jpg','cases/dava-holding/stories/01.jpg'] },
    { name: 'Электроника Череповец', city: 'Череповец', niche: 'retail', formats: 'posts carousel', tag: 'Товары', count: 'Посты · карусели · визуалы', images: ['cases/electronics-cherepovets/posts/03.webp','cases/electronics-cherepovets/posts/02.webp','cases/electronics-cherepovets/posts/05.webp','cases/fr-moto/carousels/03/01.jpg'] },
    { name: 'Доброе сердце', city: 'Россия', niche: 'social', formats: 'posts carousel', tag: 'Соцпроекты', count: 'Посты · карусели · визуалы', images: ['cases/dobroe-serdtse/carousels/02/01.webp','cases/dobroe-serdtse/carousels/02/02.webp','cases/dobroe-serdtse/carousels/02/03.webp','cases/dobroe-serdtse/carousels/02/04.webp'] },
    { name: 'Альянс Климат', city: 'Россия', niche: 'home', formats: 'posts', tag: 'Ремонт и дом', count: 'Посты · визуалы · контент-план', images: ['cases/alliance-climate/posts/03.webp','cases/alliance-climate/posts/02.webp','cases/alliance-climate/posts/05.webp','cases/alliance-climate/posts/07.webp'] }
  ];

  function examplesPage() {
    const heroImages = projects.flatMap(item => item.images.slice(0, 1)).slice(0, 8);
    const nicheFilters = [['all','Все'],['food','Еда'],['beauty','Красота и здоровье'],['sport','Спорт'],['home','Ремонт и дом'],['services','Услуги и эксперты'],['retail','Товары'],['travel','Отдых'],['social','Соцпроекты']];
    const formatFilters = [['all','Все форматы'],['posts','Посты'],['carousel','Карусели'],['stories','Сторис'],['video','Ролики'],['design','Оформление'],['logo','Логотипы']];
    return `
      ${header('examples')}<main class="mvp-main">
        <section class="mvp-examples-hero"><div class="mvp-shell mvp-examples-hero__grid"><div><p class="mvp-eyebrow">Показываем без купюр</p><h1 class="mvp-title">Примеры наших работ</h1><p class="mvp-lead">Настоящие проекты настоящих клиентов: с контент-планами, текстами, каруселями и календарями публикаций. Выберите свою нишу - посмотрите, как это может выглядеть у вас.</p><p>На этой странице - свежие проекты. Всего за 6 лет - больше 10 000 работ.</p></div><div class="mvp-examples-collage">${heroImages.map((src, i) => image(src, `Работа lemonmedia ${i + 1}`)).join('')}</div></div></section>
        <div class="mvp-filters"><div class="mvp-shell"><div class="mvp-filter-group" data-filter-group="niche">${nicheFilters.map(([key,label], i) => `<button class="mvp-filter ${i === 0 ? 'is-active' : ''}" type="button" data-filter="${key}">${label}</button>`).join('')}</div><div class="mvp-filter-group" data-filter-group="format">${formatFilters.map(([key,label], i) => `<button class="mvp-filter ${i === 0 ? 'is-active' : ''}" type="button" data-filter="${key}">${label}</button>`).join('')}</div></div></div>
        <section class="mvp-section"><div class="mvp-shell"><div class="mvp-project-grid" data-projects>${projects.map((item, index) => `<article class="mvp-project" data-niche="${item.niche}" data-formats="${item.formats}"><div class="mvp-project__media">${item.images.map(src => image(src, `Работа проекта ${item.name}`)).join('')}</div><div class="mvp-project__meta"><div><span class="lm-chip">${item.tag}</span><h2 class="mvp-h3">${item.name} · ${item.city}</h2><p>${item.count}</p></div><a class="mvp-btn mvp-btn--ghost" href="${routes.case}">Открыть проект</a></div></article>`).join('')}</div><p class="mvp-lead" data-no-results hidden>По этому сочетанию пока нет карточек. Сбросьте один из фильтров.</p></div></section>
        <section class="mvp-section mvp-section--lemon"><div class="mvp-shell mvp-section-head"><div><p class="mvp-eyebrow">Это не предел опыта</p><h2 class="mvp-h2">Вашей ниши здесь нет?</h2></div><div><p class="mvp-lead">Это не значит, что мы не сможем. За 6 лет были шиномонтажки, нумерологи, глэмпинги, футбольные стадионы и благотворительные фонды. Пришлите ссылку на вашу соцсеть - бесплатно разберём и покажем, каким может быть ваш контент.</p><div class="mvp-actions"><a class="mvp-btn" href="${routes.audit}">Получить бесплатный разбор</a></div></div></div></section>
        ${contactForm({ title: 'Хотите так же?', text: 'Выберите удобный способ связи - покажем похожие проекты и предложим подходящий объём.' })}
      </main>${footer()}${dialog()}`;
  }

  function casePage() {
    const planRows = [
      ['01','Как выбрать кухню и не переделывать через год','05 августа'],['02','Двухцветная классика на годы','07 августа'],['03','Модель Beverly - тёплая классика','09 августа'],['04','Кухня на заказ = переплата','11 августа'],['05','Бесплатный замер и 3D-проект','13 августа'],['06','Маленькая кухня-студия','15 августа']
    ];
    return `
      ${header('case')}<main class="mvp-main">
        <section class="mvp-case-hero"><div class="mvp-shell mvp-case-hero__grid"><div><p class="mvp-eyebrow">Саратов Кухни · кухни на заказ · Саратов</p><h1 class="mvp-title">Показать кухни так, чтобы им доверили ремонт</h1><p class="mvp-lead">Клиенту был нужен связный контент-план о выборе кухни, готовых решениях, возражениях и предложениях бренда. Задача - помочь аудитории разобраться и подвести к обращению без обещаний коммерческого результата.</p></div><div class="mvp-case-hero__media">${saratovPosts.slice(0, 3).map((src,i) => image(src, `Работа проекта Саратов Кухни ${i+1}`)).join('')}</div></div></section>
        <section class="mvp-section mvp-section--tight"><div class="mvp-shell mvp-metrics"><article class="mvp-metric"><strong>15</strong><span>публикаций</span></article><article class="mvp-metric"><strong>5 / 34</strong><span>каруселей / слайда</span></article><article class="mvp-metric"><strong>29</strong><span>визуалов</span></article><article class="mvp-metric"><strong>5</strong><span>площадок</span></article></div></section>
        <section class="mvp-section mvp-section--white"><div class="mvp-shell"><div class="mvp-section-head mvp-section-head--single"><p class="mvp-eyebrow">Почему контент именно такой</p><h2 class="mvp-h2">Маркетинговая логика - 5 шагов</h2></div><div class="mvp-logic"><article class="mvp-logic__step"><b>01</b><h3>Понимаем страх</h3><p>Кухня дорогая и покупается надолго. Человек боится ошибиться с планировкой, материалами и цветом.</p></article><article class="mvp-logic__step"><b>02</b><h3>Снимаем вопрос темой</h3><p>План чередует пользу, реальные решения, продукты, мифы и предложения бренда.</p></article><article class="mvp-logic__step"><b>03</b><h3>Меняем формат</h3><p>Простая мысль идёт постом. Выбор и проверка - каруселью, которую удобно сохранить.</p></article><article class="mvp-logic__step"><b>04</b><h3>Собираем стиль</h3><p>Работы выглядят одной лентой, но каждый материал остаётся самостоятельным.</p></article><article class="mvp-logic__step"><b>05</b><h3>Ведём к обращению</h3><p>Полезный контент снижает неопределённость, а предложения подводят к замеру и расчёту.</p></article></div></div></section>
        <section class="mvp-section"><div class="mvp-shell mvp-solution"><div><p class="mvp-eyebrow">Одно решение крупно</p><h2 class="mvp-h2">Показали цену выбора, а не только красивые кухни</h2><p class="mvp-lead">Контент помогает проверить планировку, материалы, фурнитуру и хранение до заказа. Так бренд выглядит не витриной картинок, а спокойным экспертом.</p></div><div class="mvp-media-grid mvp-media-grid--four">${saratovPosts.slice(0,4).map((src,i)=>image(src,`Работа, подтверждающая решение ${i+1}`)).join('')}</div></div></section>
        <section class="mvp-section mvp-section--white"><div class="mvp-shell mvp-plan-dark"><p class="mvp-eyebrow">Все темы с задачей и датой</p><h2 class="mvp-h2">Весь контент-план целиком</h2><div class="mvp-plan-list">${planRows.map(([n,title,date])=>`<div class="mvp-plan-row"><b>${n}</b><span>${title}</span><small>${date}</small></div>`).join('')}</div></div></section>
        <section class="mvp-section"><div class="mvp-shell" data-tabs><div class="mvp-section-head mvp-section-head--single"><p class="mvp-eyebrow">Весь материал</p><h2 class="mvp-h2">Лента, карусели и сторис</h2></div><div class="mvp-tabs">${['Лента','Карусели','Сторис'].map((name,i)=>`<button class="mvp-tab ${i===0?'is-active':''}" type="button" data-tab="case-${i}">${name}</button>`).join('')}</div><div class="mvp-tabpanel is-active" data-panel="case-0"><div class="mvp-media-grid">${saratovPosts.map((src,i)=>image(src,`Публикация ${i+1}`)).join('')}</div></div><div class="mvp-tabpanel" data-panel="case-1"><div class="mvp-media-grid">${saratovCarousel.map((src,i)=>image(src,`Слайд карусели ${i+1}`)).join('')}</div></div><div class="mvp-tabpanel" data-panel="case-2"><div class="mvp-media-grid mvp-media-grid--stories">${saratovStories.map((src,i)=>image(src,`Сторис ${i+1}`)).join('')}</div></div></div></section>
        <section class="mvp-section mvp-section--dark"><div class="mvp-shell mvp-result"><div class="mvp-result__mark">✓</div><div><p class="mvp-eyebrow">Честный результат</p><h2 class="mvp-h2">Что подтверждено</h2><p class="mvp-lead">Подготовлен контент-план из 15 публикаций: 10 обычных постов, 5 каруселей, 4 готовых экрана сторис и 1 экран под репост публикации. Материалы подготовлены для размещения на 5 площадках.</p><p class="mvp-lead"><strong>Не заявляем:</strong> продажи, заявки, выручку, окупаемость, рост охватов, подписчиков и вовлечённости - эти данные не измерялись.</p><div class="mvp-actions"><a class="mvp-btn mvp-btn--light" href="https://vk.ru/sk.saratov" target="_blank" rel="noopener">Хотите проверить? Вот группа клиента ↗</a></div></div></div></section>
        ${contactForm({ title: 'Хотите такой же контент для своего бизнеса?', text: 'Этот проект сделан на тарифе «Стандарт». Напишите нам - покажем, как это будет выглядеть в вашей нише.', context: 'хочу как в кейсе Саратов Кухни' })}
      </main>${footer()}${dialog()}`;
  }

  function auditPage() {
    const benefits = [
      ['01','Оформление глазами клиента','Шапка, описание, меню, виджеты, закреплённый пост: что видит человек в первые 10 секунд и почему уходит'],
      ['02','Что уже работает','Чтобы не сломать при изменениях'],
      ['03','Что исправить первым','2-3 шага с самым быстрым эффектом'],
      ['04','Темы для контента','О чём вашему бизнесу стоит рассказывать'],
      ['05','Честный следующий шаг','Иногда это «справитесь своими силами», и мы так и пишем']
    ];
    return `
      ${header('audit')}<main class="mvp-main">
        <section class="mvp-audit-hero"><div class="mvp-shell mvp-audit-hero__grid"><div><p class="mvp-eyebrow">Безопасный первый шаг</p><h1 class="mvp-title">Бесплатно разберём ваши соцсети</h1><p class="mvp-lead">Пришлите ссылку на группу или профиль - маркетолог посмотрит глазами вашего клиента и честно скажет: что уже работает, что отпугивает и что исправить в первую очередь.</p><div class="mvp-actions"><a class="mvp-btn mvp-btn--lemon" href="#start">Получить разбор</a></div><p class="mvp-form__small">Бесплатно и без обязательств. Разбор придёт вам в мессенджер - текстом или видео.</p></div><div class="mvp-audit-preview"><div class="mvp-audit-preview__window"><div class="mvp-audit-preview__bar">Место под реальный видео-разбор</div><div class="mvp-audit-note"><b>Оформление глазами клиента</b><p>Шапка, описание, меню, виджеты, закреплённый пост: что видит человек в первые 10 секунд и почему уходит.</p></div><div class="mvp-audit-note"><b>Что уже работает</b><p>Чтобы не сломать при изменениях.</p></div><div class="mvp-audit-note"><b>Что исправить первым</b><p>2-3 шага с самым быстрым эффектом.</p></div></div></div></div></section>
        <section class="mvp-section mvp-section--white"><div class="mvp-shell"><div class="mvp-section-head mvp-section-head--single"><p class="mvp-eyebrow">Практический результат</p><h2 class="mvp-h2">Что вы получите</h2></div><div class="mvp-audit-benefits">${benefits.map(([n,t,c])=>`<article class="mvp-audit-benefit"><b>${n}</b><h3>${t}</h3><p>${c}</p></article>`).join('')}</div></div></section>
        <section class="mvp-section"><div class="mvp-shell mvp-audit-story"><div><p class="mvp-eyebrow">Настоящий путь клиента</p><h2 class="mvp-h2">Так выглядит разбор</h2><p class="mvp-lead">Тренер по физической реабилитации завёл группу ВКонтакте, прислал ссылку - в видео-разборе маркетолог показал, как перестроить шапку, меню и закреп под запись на онлайн-ведение. Совет понравился - клиент заказал оформление группы и ведение контента.</p></div><div class="mvp-audit-story__frames"><article class="mvp-audit-story__frame"><b>01 · До</b><h3>Кадр группы до разбора</h3><p>Место для реального скриншота.</p></article><article class="mvp-audit-story__frame"><b>02 · Разбор</b><h3>Фрагмент рекомендации</h3><p>Место для кадра из реального видео-разбора.</p></article><article class="mvp-audit-story__frame"><b>03 · После</b><h3>Группа после изменений</h3><p>Место для реального скриншота.</p></article></div></div></section>
        <section class="mvp-section mvp-section--lemon"><div class="mvp-shell mvp-section-head"><div><p class="mvp-eyebrow">Без скрытого условия</p><h2 class="mvp-h2">Честно: зачем мы это делаем</h2></div><div><p class="mvp-lead">Разбор - наш способ познакомиться. Части бизнесов после него хватает своих рук - и это нормально. Кому-то удобнее отдать контент нам - для этого есть тарифы от 4 990 ₽/мес. Навязывать не будем: разбор полезен сам по себе.</p><p><strong>6 лет · 10 000+ проектов · 200+ отзывов, рейтинг 5,0</strong></p></div></div></section>
        ${contactForm({ title: 'Пришлите ссылку - получите разбор', text: 'Маркетолог посмотрит профиль глазами нового клиента и отправит конкретные рекомендации.', audit: true, context: 'бесплатный разбор' })}
        <p class="mvp-shell mvp-form__small">*Instagram принадлежит Meta, признанной экстремистской организацией и запрещённой в РФ.</p>
      </main>${footer()}${dialog()}`;
  }

  const renderers = { home: homePage, pricing: pricingPage, examples: examplesPage, case: casePage, audit: auditPage };
  app.innerHTML = (renderers[page] || homePage)();

  const mobileNav = document.querySelector('[data-mobile-nav]');
  document.querySelector('[data-menu-open]')?.addEventListener('click', () => mobileNav?.classList.add('is-open'));
  document.querySelector('[data-menu-close]')?.addEventListener('click', () => mobileNav?.classList.remove('is-open'));

  document.querySelectorAll('[data-tabs]').forEach(group => {
    group.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
      group.querySelectorAll('[data-tab]').forEach(item => item.classList.toggle('is-active', item === button));
      group.querySelectorAll('[data-panel]').forEach(panel => panel.classList.toggle('is-active', panel.dataset.panel === button.dataset.tab));
    }));
  });

  document.querySelectorAll('[data-plan-choices]').forEach(group => {
    group.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => {
      group.querySelectorAll('[data-plan]').forEach(item => item.classList.toggle('is-active', item === button));
      group.closest('form').querySelector('[data-plan-value]').value = button.dataset.plan;
    }));
  });

  document.querySelectorAll('[data-pick-plan]').forEach(button => button.addEventListener('click', () => {
    const form = document.querySelector('#start');
    const choice = document.querySelector(`[data-plan="${button.dataset.pickPlan}"]`);
    choice?.click();
    form?.scrollIntoView({ behavior: 'smooth' });
  }));

  document.querySelectorAll('[data-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('[data-form-message]').hidden = false;
  }));

  const filterState = { niche: 'all', format: 'all' };
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    group.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      const kind = group.dataset.filterGroup;
      filterState[kind] = button.dataset.filter;
      group.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('is-active', item === button));
      let shown = 0;
      document.querySelectorAll('.mvp-project').forEach(card => {
        const nicheMatch = filterState.niche === 'all' || card.dataset.niche === filterState.niche;
        const formatMatch = filterState.format === 'all' || card.dataset.formats.split(' ').includes(filterState.format);
        card.hidden = !(nicheMatch && formatMatch);
        if (!card.hidden) shown += 1;
      });
      const empty = document.querySelector('[data-no-results]');
      if (empty) empty.hidden = shown > 0;
    }));
  });

  const modal = document.querySelector('[data-dialog]');
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-lightbox]');
    if (!trigger || !modal) return;
    const modalImage = modal.querySelector('[data-dialog-image]');
    modalImage.src = trigger.dataset.lightbox;
    modalImage.alt = trigger.querySelector('img')?.alt || 'Работа lemonmedia';
    modal.showModal();
  });
  document.querySelector('[data-dialog-close]')?.addEventListener('click', () => modal?.close());
  modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
})();
