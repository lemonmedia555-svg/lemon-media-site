(() => {
  const carouselTabs = [...document.querySelectorAll('[data-case-carousel-tab]')];
  const carouselGroups = [...document.querySelectorAll('[data-case-carousel-group]')];

  const showCarousel = (key, focus = false) => {
    carouselTabs.forEach((tab) => {
      const active = tab.dataset.caseCarouselTab === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });

    carouselGroups.forEach((group) => {
      group.hidden = group.dataset.caseCarouselGroup !== key;
    });
  };

  carouselTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showCarousel(tab.dataset.caseCarouselTab || '06'));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      let nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? carouselTabs.length - 1 : index + direction;
      nextIndex = (nextIndex + carouselTabs.length) % carouselTabs.length;
      showCarousel(carouselTabs[nextIndex].dataset.caseCarouselTab || '06', true);
    });
  });

  const dialog = document.querySelector('[data-case-dialog]');
  const dialogCopy = dialog?.querySelector('[data-case-dialog-copy]');
  const dialogCopyBody = dialog?.querySelector('[data-case-dialog-copy-body]');
  const copyDetails = [...document.querySelectorAll('.case-copy-source details')];
  const feedButtons = [...document.querySelectorAll('#case-panel-feed [data-case-dialog-open]')];

  document.querySelectorAll('[data-case-dialog-open]').forEach((button) => {
    if (button.closest('#case-panel-feed')) return;
    button.addEventListener('click', () => {
      dialog?.classList.remove('has-copy');
      if (dialogCopy) dialogCopy.hidden = true;
      if (dialogCopyBody) dialogCopyBody.innerHTML = '';
    });
  });

  feedButtons.forEach((button, index) => {
    const title = button.getAttribute('data-case-dialog-alt') || button.querySelector('img')?.alt || 'Публикация';
    button.setAttribute('aria-label', `Открыть макет и полный текст: ${title}`);

    button.addEventListener('click', () => {
      const source = copyDetails[index]?.querySelector('.case-copy-body');
      if (!dialogCopy || !dialogCopyBody || !source) return;
      dialogCopyBody.innerHTML = source.innerHTML;
      dialogCopy.hidden = false;
      dialog?.classList.add('has-copy');
    });
  });

  if (carouselTabs.length) showCarousel(carouselTabs[0].dataset.caseCarouselTab || '06');
})();
