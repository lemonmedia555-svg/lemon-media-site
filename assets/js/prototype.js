document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const menuButton = document.querySelector('[data-menu-toggle]');
  const notesButton = document.querySelector('[data-notes-toggle]');

  menuButton?.addEventListener('click', () => {
    const isOpen = body.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Закрыть' : 'Меню';
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (menuButton) menuButton.textContent = 'Меню';
    });
  });

  notesButton?.addEventListener('click', () => {
    const hidden = body.classList.toggle('hide-notes');
    notesButton.textContent = hidden ? 'Показать заметки' : 'Скрыть заметки';
  });

  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.getAttribute('data-filter-target');
    const items = document.querySelectorAll(targetSelector || '[data-category]');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        items.forEach((item) => {
          const categories = (item.getAttribute('data-category') || '').split(' ');
          item.hidden = filter !== 'all' && !categories.includes(filter);
        });
      });
    });
  });

  const calculator = document.querySelector('[data-calculator]');
  if (calculator) {
    const planButtons = calculator.querySelectorAll('[data-plan]');
    const carouselInput = calculator.querySelector('[data-carousel-count]');
    const storyInterest = calculator.querySelector('[data-story-interest]');
    const baseOutput = calculator.querySelector('[data-base-output]');
    const carouselOutput = calculator.querySelector('[data-carousel-output]');
    const totalOutput = calculator.querySelector('[data-total-output]');
    const postsOutput = calculator.querySelector('[data-posts-output]');
    const placementOutput = calculator.querySelector('[data-placement-output]');
    const storyOutput = calculator.querySelector('[data-story-output]');
    const orderLink = calculator.querySelector('[data-order-link]');
    const bundleSlots = calculator.querySelector('[data-bundle-slots]');
    const bundleStories = calculator.querySelector('[data-bundle-stories]');
    const planMap = new Map([
      [10, 4990],
      [15, 7490],
      [20, 9990],
      [30, 14990],
    ]);
    const queryPlan = Number(new URLSearchParams(window.location.search).get('plan'));
    let selected = planMap.has(queryPlan)
      ? { posts: queryPlan, price: planMap.get(queryPlan) }
      : { posts: 10, price: 4990 };

    const format = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

    const render = () => {
      const carouselCount = Math.max(0, Math.min(selected.posts, Math.floor(Number(carouselInput?.value || 0))));
      if (carouselInput) {
        carouselInput.max = String(selected.posts);
        carouselInput.value = String(carouselCount);
      }
      if (baseOutput) baseOutput.textContent = format(selected.price);
      if (carouselOutput) carouselOutput.textContent = format(carouselCount * 250);
      if (totalOutput) totalOutput.textContent = format(selected.price + carouselCount * 250);
      if (postsOutput) postsOutput.textContent = String(selected.posts);
      if (placementOutput) placementOutput.textContent = `До ${selected.posts * 5} размещений`;
      const stories = Number(storyInterest?.value || 0);
      if (bundleSlots) {
        const visiblePosts = Math.min(selected.posts, 10);
        bundleSlots.replaceChildren();
        for (let index = 0; index < visiblePosts; index += 1) {
          const slot = document.createElement('span');
          slot.className = index < carouselCount ? 'bundle-slot is-carousel' : 'bundle-slot';
          slot.textContent = String(index + 1);
          slot.title = index < carouselCount ? `Пост ${index + 1}: карусель до 7 слайдов` : `Пост ${index + 1}`;
          bundleSlots.append(slot);
        }
        if (selected.posts > visiblePosts) {
          const rest = document.createElement('span');
          rest.className = 'bundle-slot bundle-slot-more';
          rest.textContent = `+${selected.posts - visiblePosts}`;
          rest.title = `Ещё ${selected.posts - visiblePosts} постов`;
          bundleSlots.append(rest);
        }
      }
      if (bundleStories) {
        bundleStories.hidden = stories === 0;
        bundleStories.textContent = stories ? `${stories} × мини‑прогрев по 5 сторис` : '';
      }
      if (storyOutput) {
        storyOutput.innerHTML = stories
          ? `<strong>Интерес к мини‑прогревам:</strong> ${stories} × 5 сторис · не входит в сумму`
          : '<strong>Мини‑прогревы:</strong> не выбраны';
      }
      if (orderLink) {
        const params = new URLSearchParams({
          plan: String(selected.posts),
          carousels: String(carouselCount),
          stories: String(stories),
        });
        orderLink.setAttribute('href', `start.html?${params.toString()}`);
      }
    };

    planButtons.forEach((button) => {
      button.addEventListener('click', () => {
        selected = {
          posts: Number(button.getAttribute('data-posts')),
          price: Number(button.getAttribute('data-price')),
        };
        planButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        render();
      });
    });

    carouselInput?.addEventListener('input', render);
    storyInterest?.addEventListener('change', render);
    planButtons.forEach((button) => {
      button.classList.toggle('active', Number(button.getAttribute('data-posts')) === selected.posts);
    });
    render();
  }

  document.querySelectorAll('[data-carousel-demo]').forEach((demo) => {
    const slides = Array.from(demo.querySelectorAll('[data-demo-slide]'));
    const previous = demo.querySelector('[data-demo-prev]');
    const next = demo.querySelector('[data-demo-next]');
    const dots = demo.querySelector('[data-demo-dots]');
    const currentOutput = demo.querySelector('[data-demo-current]');
    const titleOutput = demo.querySelector('[data-demo-title]');
    const descriptionOutput = demo.querySelector('[data-demo-description]');
    const titles = [
      'Обложка останавливает взгляд',
      'Первый пример делает риск конкретным',
      'Новая ситуация удерживает внимание',
      'Серия продолжает одну мысль',
      'Читатель узнаёт знакомый сценарий',
      'Последний аргумент закрепляет тему',
      'Финал завершает материал',
    ];
    const descriptions = [
      'Человек сразу узнаёт риск, который касается его бизнеса, и понимает, зачем листать дальше.',
      'Вместо общего предупреждения читатель получает понятную фразу из реальной деловой переписки.',
      'Каждый экран добавляет новый пример, но не заставляет заново разбираться в теме.',
      'Одинаковая структура помогает быстро считывать смысл и двигаться по материалу дальше.',
      'Практический пример превращает экспертный текст в полезный чек‑лист для предпринимателя.',
      'Серия не распадается: последний пример работает как часть единого аргумента.',
      'Человек получает законченный вывод, а бренд остаётся автором понятного экспертного объяснения.',
    ];
    let current = 0;

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Открыть слайд ${index + 1}`);
      dot.addEventListener('click', () => {
        current = index;
        renderDemo();
      });
      dots?.append(dot);
    });

    const renderDemo = () => {
      slides.forEach((slide, index) => {
        const active = index === current;
        slide.hidden = !active;
        slide.classList.toggle('active', active);
      });
      dots?.querySelectorAll('button').forEach((dot, index) => {
        dot.classList.toggle('active', index === current);
        dot.setAttribute('aria-current', index === current ? 'true' : 'false');
      });
      if (currentOutput) currentOutput.textContent = String(current + 1);
      if (titleOutput) titleOutput.textContent = titles[current];
      if (descriptionOutput) descriptionOutput.textContent = descriptions[current];
    };

    previous?.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      renderDemo();
    });
    next?.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      renderDemo();
    });
    renderDemo();
  });

  const startForm = document.querySelector('[data-order-form]');
  if (startForm) {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan') || '10';
    const carousels = params.get('carousels') || '0';
    const stories = params.get('stories') || '0';
    const planSelect = startForm.querySelector('[data-plan-select]');
    const carouselInput = startForm.querySelector('[data-start-carousels]');
    const storySelect = startForm.querySelector('[data-start-stories]');
    const totalOutput = document.querySelector('[data-start-total]');
    const summaryOutput = document.querySelector('[data-start-summary]');
    const placementsOutput = document.querySelector('[data-start-placements]');
    const prices = { 10: 4990, 15: 7490, 20: 9990, 30: 14990 };
    if (planSelect) planSelect.value = plan;
    if (carouselInput) carouselInput.value = carousels;
    if (storySelect) storySelect.value = stories;

    const renderOrder = () => {
      const posts = Number(planSelect?.value || 10);
      const carouselCount = Math.max(0, Math.min(posts, Math.floor(Number(carouselInput?.value || 0))));
      const storyCount = Number(storySelect?.value || 0);
      if (carouselInput) {
        carouselInput.max = String(posts);
        carouselInput.value = String(carouselCount);
      }
      const total = (prices[posts] || prices[10]) + carouselCount * 250;
      const formatted = new Intl.NumberFormat('ru-RU').format(total);
      if (totalOutput) totalOutput.textContent = `${formatted} ₽`;
      if (summaryOutput) {
        const carouselText = carouselCount ? `${carouselCount} карусел${carouselCount === 1 ? 'ь' : carouselCount < 5 ? 'и' : 'ей'}` : 'без каруселей';
        const storyText = storyCount ? `интерес: ${storyCount} мини‑прогрев${storyCount === 1 ? '' : storyCount < 5 ? 'а' : 'ов'} (не в сумме)` : 'без мини‑прогревов';
        summaryOutput.innerHTML = `<strong>${posts} постов</strong> · ${carouselText} · ${storyText}`;
      }
      if (placementsOutput) placementsOutput.textContent = `До ${posts * 5} размещений`;
    };

    planSelect?.addEventListener('change', renderOrder);
    carouselInput?.addEventListener('input', renderOrder);
    storySelect?.addEventListener('change', renderOrder);
    renderOrder();
  }

  document.querySelectorAll('[data-prototype-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = form.querySelector('[data-form-message]');
      if (message) {
        message.hidden = false;
        message.textContent = 'Это прототип: заявка пока не отправляется. Перед запуском сюда нужно подключить CRM и уведомление клиенту.';
      }
    });
  });
});
