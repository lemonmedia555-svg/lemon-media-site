(() => {
  const grid = document.querySelector('[data-cases-grid]');
  const filters = document.querySelector('[data-cases-filters]');
  const moreButton = document.querySelector('[data-cases-more]');
  const countLabel = document.querySelector('[data-cases-count]');

  if (!grid || !filters || !moreButton || !countLabel) return;

  const cards = Array.from(grid.querySelectorAll('[data-category]'));
  const pageSize = 12;
  let activeFilter = 'all';
  let visibleLimit = pageSize;

  const matchingCards = () => cards.filter((card) => {
    if (activeFilter === 'all') return true;
    return (card.dataset.category || '').split(/\s+/).includes(activeFilter);
  });

  const render = () => {
    const matches = matchingCards();
    const visible = new Set(matches.slice(0, visibleLimit));

    cards.forEach((card) => {
      card.hidden = !visible.has(card);
    });

    const shown = Math.min(visibleLimit, matches.length);
    countLabel.textContent = `Показано ${shown} из ${matches.length} кейсов`;
    moreButton.hidden = shown >= matches.length;
    moreButton.textContent = `Показать ещё ${Math.min(pageSize, matches.length - shown)} кейсов`;
  };

  filters.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      visibleLimit = pageSize;
      filters.querySelectorAll('[data-filter]').forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      render();
    });
  });

  moreButton.addEventListener('click', () => {
    visibleLimit += pageSize;
    render();
  });

  document.querySelectorAll('[data-cases-jump]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = filters.querySelector(`[data-filter="${link.dataset.casesJump}"]`);
      if (target) target.click();
    });
  });

  render();
})();
