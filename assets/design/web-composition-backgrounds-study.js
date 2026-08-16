const body = document.body;
const menu = document.querySelector('[data-mobile-menu]');
const openButton = document.querySelector('[data-menu-open]');
const closeButton = document.querySelector('[data-menu-close]');

function openMenu() {
  if (!menu || !openButton) return;
  menu.hidden = false;
  body.classList.add('is-menu-open');
  openButton.setAttribute('aria-expanded', 'true');
  closeButton?.focus();
}

function closeMenu({ restoreFocus = true } = {}) {
  if (!menu || !openButton) return;
  menu.hidden = true;
  body.classList.remove('is-menu-open');
  openButton.setAttribute('aria-expanded', 'false');
  if (restoreFocus) openButton.focus();
}

openButton?.addEventListener('click', openMenu);
closeButton?.addEventListener('click', () => closeMenu());

menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMenu({ restoreFocus: false }));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu && !menu.hidden) closeMenu();
});

const monthTabs = [...document.querySelectorAll('[data-month-tab]')];
const monthPanels = [...document.querySelectorAll('[data-month-panel]')];

monthTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.monthTab;

    monthTabs.forEach(item => {
      item.setAttribute('aria-selected', String(item === tab));
    });

    monthPanels.forEach(panel => {
      const isActive = panel.dataset.monthPanel === target;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });
  });
});
