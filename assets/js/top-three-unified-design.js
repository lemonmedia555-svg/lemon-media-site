(() => {
  const formatPrice = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mainNav = document.querySelector('[data-main-nav]');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    mainNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const planButtons = Array.from(document.querySelectorAll('[data-plan]'));
  const storyButtons = Array.from(document.querySelectorAll('[data-stories]'));
  const carouselMinus = document.querySelector('[data-carousel-minus]');
  const carouselPlus = document.querySelector('[data-carousel-plus]');
  const carouselCount = document.querySelector('[data-carousel-count]');
  const totalPrice = document.querySelector('[data-total-price]');
  const summaryPosts = document.querySelector('[data-summary-posts]');
  const summaryCarousels = document.querySelector('[data-summary-carousels]');
  const summaryStories = document.querySelector('[data-summary-stories]');
  const summaryPlacements = document.querySelector('[data-summary-placements]');
  const orderLink = document.querySelector('[data-order-link]');

  let selectedPlan = { posts: 10, price: 4990 };
  let carousels = 0;
  let stories = 0;
  let storyPrice = 0;

  const updateSummary = () => {
    const total = selectedPlan.price + carousels * 250 + storyPrice;

    if (carouselCount) carouselCount.textContent = String(carousels);
    if (totalPrice) totalPrice.textContent = formatPrice(total);
    if (summaryPosts) summaryPosts.textContent = String(selectedPlan.posts);
    if (summaryCarousels) summaryCarousels.textContent = String(carousels);
    if (summaryStories) summaryStories.textContent = stories ? String(stories) : 'не выбраны';
    if (summaryPlacements) summaryPlacements.textContent = `до ${selectedPlan.posts * 5}`;
    if (orderLink) {
      orderLink.href = `start-design.html?plan=${selectedPlan.posts}&carousel=${carousels}&stories=${stories}`;
    }
  };

  planButtons.forEach((button) => {
    button.addEventListener('click', () => {
      planButtons.forEach((item) => item.classList.toggle('active', item === button));
      selectedPlan = {
        posts: Number(button.dataset.posts || 10),
        price: Number(button.dataset.price || 4990)
      };
      carousels = Math.min(carousels, selectedPlan.posts);
      updateSummary();
    });
  });

  carouselMinus?.addEventListener('click', () => {
    carousels = Math.max(0, carousels - 1);
    updateSummary();
  });

  carouselPlus?.addEventListener('click', () => {
    carousels = Math.min(selectedPlan.posts, carousels + 1);
    updateSummary();
  });

  storyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      storyButtons.forEach((item) => item.classList.toggle('active', item === button));
      stories = Number(button.dataset.stories || 0);
      storyPrice = Number(button.dataset.storyPrice || 0);
      updateSummary();
    });
  });

  updateSummary();

  const previewDialog = document.querySelector('[data-preview-dialog]');
  const previewImage = document.querySelector('[data-preview-image]');
  const previewClose = document.querySelector('[data-preview-close]');

  document.querySelectorAll('[data-preview]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!previewDialog || !previewImage) return;
      previewImage.src = button.dataset.preview || '';
      previewImage.alt = button.querySelector('img')?.alt || 'Увеличенный пример работы';
      previewDialog.showModal();
    });
  });

  previewClose?.addEventListener('click', () => previewDialog?.close());
  previewDialog?.addEventListener('click', (event) => {
    if (event.target === previewDialog) previewDialog.close();
  });

  const loginDialog = document.querySelector('[data-login-dialog]');
  const loginOpen = document.querySelector('[data-login-open]');
  const loginClose = document.querySelector('[data-login-close]');

  loginOpen?.addEventListener('click', () => loginDialog?.showModal());
  loginClose?.addEventListener('click', () => loginDialog?.close());
  loginDialog?.addEventListener('click', (event) => {
    if (event.target === loginDialog) loginDialog.close();
  });
})();
