(() => {
  const tabs = [...document.querySelectorAll('[data-case-tab]')];
  const gallery = [...document.querySelectorAll('[data-showcase-gallery] img')];
  const label = document.querySelector('[data-showcase-label]');
  const link = document.querySelector('[data-showcase-link]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const images = tab.dataset.images.split('|');
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      gallery.forEach((image, index) => {
        image.src = images[index];
        image.alt = `${tab.textContent.trim()} — пример ${index + 1}`;
      });
      label.textContent = tab.dataset.label;
      link.href = tab.dataset.link;
    });
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const value = filter.dataset.filter;
      filters.forEach((item) => item.classList.toggle('is-active', item === filter));
      cards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        card.hidden = value !== 'all' && !categories.includes(value);
      });
    });
  });
})();
