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

  document.querySelectorAll('[data-portfolio-filters]').forEach((panel) => {
    const targetSelector = panel.getAttribute('data-filter-target');
    const items = document.querySelectorAll(targetSelector || '#portfolio [data-category]');
    const categoryButtons = panel.querySelectorAll('[data-portfolio-category]');
    const formatButtons = panel.querySelectorAll('[data-portfolio-format]');
    let activeCategory = 'all';
    let activeFormat = 'all';

    const applyPortfolioFilters = () => {
      items.forEach((item) => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        const format = item.getAttribute('data-format') || '';
        const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
        const matchesFormat = activeFormat === 'all' || format === activeFormat;
        item.hidden = !matchesCategory || !matchesFormat;
      });
    };

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.getAttribute('data-portfolio-category') || 'all';
        categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
        applyPortfolioFilters();
      });
    });

    formatButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFormat = button.getAttribute('data-portfolio-format') || 'all';
        formatButtons.forEach((item) => item.classList.toggle('active', item === button));
        applyPortfolioFilters();
      });
    });
  });

  const calculator = document.querySelector('[data-calculator]');
  if (calculator) {
    const planButtons = calculator.querySelectorAll('[data-plan]');
    const carouselCounter = calculator.querySelector('[data-carousel-counter]');
    const carouselDecrease = calculator.querySelector('[data-carousel-decrease]');
    const carouselIncrease = calculator.querySelector('[data-carousel-increase]');
    const storyInterest = calculator.querySelector('[data-story-interest]');
    const storyButtons = calculator.querySelectorAll('[data-story-value]');
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
    const topicRoles = [
      'Знакомство', 'Проблема', 'Продукт', 'Решение', 'Кейс',
      'Возражение', 'Процесс', 'Команда', 'Польза', 'Предложение',
      'Отзыв', 'Ошибка', 'Сравнение', 'Инструкция', 'Вопросы',
      'До и после', 'Факт', 'Сценарий', 'Подборка', 'Закулисье',
      'Миф', 'Чек-лист', 'Совет', 'История', 'Новость',
      'Ценность', 'Выбор', 'Гарантия', 'Напоминание', 'Действие',
    ];
    const queryPlan = Number(new URLSearchParams(window.location.search).get('plan'));
    let selected = planMap.has(queryPlan)
      ? { posts: queryPlan, price: planMap.get(queryPlan) }
      : { posts: 10, price: 4990 };
    const queryCarousels = Math.max(0, Math.min(selected.posts, Math.floor(Number(new URLSearchParams(window.location.search).get('carousels') || 0))));
    let carouselPosts = new Set(Array.from({ length: queryCarousels }, (_, index) => index));
    const queryStories = Number(new URLSearchParams(window.location.search).get('stories') || 0);
    if (storyInterest && [0, 1, 2, 4].includes(queryStories)) storyInterest.value = String(queryStories);

    const format = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

    const render = () => {
      carouselPosts = new Set([...carouselPosts].filter((index) => index < selected.posts));
      const carouselCount = carouselPosts.size;
      if (carouselCounter) carouselCounter.textContent = String(carouselCount);
      if (carouselDecrease) carouselDecrease.disabled = carouselCount === 0;
      if (carouselIncrease) carouselIncrease.disabled = carouselCount === selected.posts;
      if (baseOutput) baseOutput.textContent = format(selected.price);
      if (carouselOutput) carouselOutput.textContent = format(carouselCount * 250);
      if (totalOutput) totalOutput.textContent = format(selected.price + carouselCount * 250);
      if (postsOutput) postsOutput.textContent = String(selected.posts);
      if (placementOutput) placementOutput.textContent = `До ${selected.posts * 5} размещений`;
      const stories = Number(storyInterest?.value || 0);
      storyButtons.forEach((button) => button.classList.toggle('active', Number(button.getAttribute('data-story-value')) === stories));
      if (bundleSlots) {
        bundleSlots.replaceChildren();
        for (let index = 0; index < selected.posts; index += 1) {
          const isCarousel = carouselPosts.has(index);
          const slot = document.createElement('button');
          slot.type = 'button';
          slot.className = isCarousel ? 'bundle-slot is-carousel' : 'bundle-slot';
          slot.innerHTML = `<span>${index + 1}</span><small>${topicRoles[index]}</small><em>${isCarousel ? 'до 7 слайдов' : '1 пост'}</em>`;
          slot.title = isCarousel ? `Пост ${index + 1}: убрать усиление каруселью` : `Пост ${index + 1}: усилить каруселью до 7 слайдов`;
          slot.setAttribute('aria-label', `${topicRoles[index]}. ${isCarousel ? 'Карусель до 7 слайдов' : 'Обычный пост'}`);
          slot.setAttribute('aria-pressed', String(isCarousel));
          slot.addEventListener('click', () => {
            if (carouselPosts.has(index)) carouselPosts.delete(index);
            else carouselPosts.add(index);
            render();
          });
          bundleSlots.append(slot);
        }
      }
      if (bundleStories) {
        bundleStories.hidden = stories === 0;
        bundleStories.innerHTML = stories
          ? `<div class="story-chain-mini" aria-hidden="true"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div><strong>${stories} × мини‑прогрев по 5 сторис</strong>`
          : '';
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

    carouselDecrease?.addEventListener('click', () => {
      const last = [...carouselPosts].sort((a, b) => b - a)[0];
      if (last !== undefined) carouselPosts.delete(last);
      render();
    });
    carouselIncrease?.addEventListener('click', () => {
      const next = Array.from({ length: selected.posts }, (_, index) => index).find((index) => !carouselPosts.has(index));
      if (next !== undefined) carouselPosts.add(next);
      render();
    });
    storyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (storyInterest) storyInterest.value = button.getAttribute('data-story-value') || '0';
        render();
      });
    });
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
    const startSlots = document.querySelector('[data-start-slots]');
    const startStories = document.querySelector('[data-start-story-stack]');
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
      if (startSlots) {
        startSlots.replaceChildren();
        for (let index = 0; index < posts; index += 1) {
          const slot = document.createElement('span');
          slot.className = index < carouselCount ? 'bundle-slot is-carousel' : 'bundle-slot';
          slot.innerHTML = `<span>${index + 1}</span><small>${index < carouselCount ? 'Карусель' : 'Пост'}</small>`;
          startSlots.append(slot);
        }
      }
      if (startStories) {
        startStories.hidden = storyCount === 0;
        startStories.innerHTML = storyCount
          ? `<div class="story-chain-mini" aria-hidden="true"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div><strong>${storyCount} × мини‑прогрев</strong>`
          : '';
      }
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
        message.textContent = 'В рабочей версии менеджер получит эту сборку, уточнит задачу бизнеса и согласует с вами содержание месяца.';
      }
    });
  });

  document.querySelectorAll('[data-format-guide]').forEach((guide) => {
    const buttons = Array.from(guide.querySelectorAll('[data-format-option]'));
    const title = guide.querySelector('[data-format-guide-title]');
    const copy = guide.querySelector('[data-format-guide-copy]');
    const image = guide.querySelector('[data-format-guide-image]');
    const label = guide.querySelector('[data-format-guide-label]');

    const activate = (button) => {
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      if (title) title.textContent = button.getAttribute('data-title') || '';
      if (copy) copy.textContent = button.getAttribute('data-copy') || '';
      if (label) label.textContent = button.getAttribute('data-label') || '';
      if (image instanceof HTMLImageElement) {
        image.src = button.getAttribute('data-image') || image.src;
        image.alt = button.getAttribute('data-alt') || '';
      }
    };

    buttons.forEach((button) => button.addEventListener('click', () => activate(button)));
  });

  document.querySelectorAll('[data-walkthrough]').forEach((walkthrough) => {
    const buttons = Array.from(walkthrough.querySelectorAll('[data-walkthrough-chapter]'));
    const panels = Array.from(walkthrough.querySelectorAll('[data-walkthrough-panel]'));

    const activate = (key) => {
      buttons.forEach((button) => {
        const active = button.getAttribute('data-walkthrough-chapter') === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-walkthrough-panel') !== key;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => activate(button.getAttribute('data-walkthrough-chapter') || 'brief'));
    });
  });

  document.querySelectorAll('[data-case-tabs]').forEach((tabs) => {
    const buttons = Array.from(tabs.querySelectorAll('[data-case-tab]'));
    const scope = tabs.closest('[data-case-explorer]') || document;
    const panels = Array.from(scope.querySelectorAll('[data-case-panel]'));

    const activate = (key, focus = false, reveal = false) => {
      buttons.forEach((button) => {
        const active = button.getAttribute('data-case-tab') === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
        if (active && focus) button.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-case-panel') !== key;
      });

      if (reveal) {
        window.requestAnimationFrame(() => {
          tabs.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start'
          });
        });
      }
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(button.getAttribute('data-case-tab') || '', false, true));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : index + (event.key === 'ArrowRight' ? 1 : -1);
        nextIndex = (nextIndex + buttons.length) % buttons.length;
        activate(buttons[nextIndex].getAttribute('data-case-tab') || '', true, true);
      });
    });

    const initial = buttons.find((button) => button.classList.contains('active')) || buttons[0];
    if (initial) activate(initial.getAttribute('data-case-tab') || '');
  });

  document.querySelectorAll('[data-case-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-case-slide]'));
    const previous = carousel.querySelector('[data-case-prev]');
    const next = carousel.querySelector('[data-case-next]');
    const thumbs = carousel.querySelector('[data-case-thumbs]');
    const counter = carousel.querySelector('[data-case-counter]');
    let current = 0;

    if (thumbs && !thumbs.children.length) {
      slides.forEach((slide, index) => {
        const button = document.createElement('button');
        const image = document.createElement('img');
        button.type = 'button';
        button.setAttribute('aria-label', `Открыть слайд ${index + 1}`);
        image.src = slide.getAttribute('src') || '';
        image.alt = '';
        button.append(image);
        thumbs.append(button);
      });
    }

    thumbs?.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        current = Number(button.getAttribute('data-case-thumb') || index);
        renderCaseCarousel();
      });
    });

    const renderCaseCarousel = () => {
      slides.forEach((slide, index) => { slide.hidden = index !== current; });
      thumbs?.querySelectorAll('button').forEach((button, index) => {
        button.classList.toggle('active', index === current);
        button.setAttribute('aria-current', index === current ? 'true' : 'false');
      });
      if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
    };

    previous?.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      renderCaseCarousel();
    });
    next?.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      renderCaseCarousel();
    });
    if (slides.length) renderCaseCarousel();
  });

  const caseDialog = document.querySelector('[data-case-dialog]');
  if (caseDialog instanceof HTMLDialogElement) {
    const dialogImage = caseDialog.querySelector('[data-case-dialog-image]');
    const dialogTitle = caseDialog.querySelector('[data-case-dialog-title]');
    const dialogMeta = caseDialog.querySelector('[data-case-dialog-meta]');
    const dialogGoal = caseDialog.querySelector('[data-case-dialog-goal]');

    document.querySelectorAll('[data-case-open], [data-case-dialog-open]').forEach((button) => {
      button.addEventListener('click', () => {
        const sourceImage = button.querySelector('img');
        const source = button.getAttribute('data-image') || button.getAttribute('data-case-dialog-src') || sourceImage?.getAttribute('src') || '';
        const title = button.getAttribute('data-title') || button.getAttribute('data-case-dialog-alt') || sourceImage?.getAttribute('alt') || 'Публикация';
        if (dialogImage instanceof HTMLImageElement) {
          dialogImage.src = source;
          dialogImage.alt = title;
        }
        if (dialogTitle) dialogTitle.textContent = title;
        if (dialogMeta) dialogMeta.textContent = button.getAttribute('data-meta') || '';
        if (dialogGoal) dialogGoal.textContent = button.getAttribute('data-goal') || '';
        caseDialog.showModal();
      });
    });

    caseDialog.querySelectorAll('[data-case-dialog-close]').forEach((button) => {
      button.addEventListener('click', () => caseDialog.close());
    });
    caseDialog.addEventListener('click', (event) => {
      if (event.target === caseDialog) caseDialog.close();
    });
  }
});
