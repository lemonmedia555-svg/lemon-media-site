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
    const baseOutput = calculator.querySelector('[data-base-output]');
    const carouselOutput = calculator.querySelector('[data-carousel-output]');
    const totalOutput = calculator.querySelector('[data-total-output]');
    const postsOutput = calculator.querySelector('[data-posts-output]');
    let selected = { posts: 10, price: 4990 };

    const format = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

    const render = () => {
      const carouselCount = Math.max(0, Math.min(selected.posts, Number(carouselInput?.value || 0)));
      if (carouselInput) {
        carouselInput.max = String(selected.posts);
        carouselInput.value = String(carouselCount);
      }
      if (baseOutput) baseOutput.textContent = format(selected.price);
      if (carouselOutput) carouselOutput.textContent = format(carouselCount * 250);
      if (totalOutput) totalOutput.textContent = format(selected.price + carouselCount * 250);
      if (postsOutput) postsOutput.textContent = String(selected.posts);
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
    render();
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

