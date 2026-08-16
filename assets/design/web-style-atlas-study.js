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

function closeMenu() {
  if (!menu || !openButton) return;
  menu.hidden = true;
  body.classList.remove('is-menu-open');
  openButton.setAttribute('aria-expanded', 'false');
  openButton.focus();
}

openButton?.addEventListener('click', openMenu);
closeButton?.addEventListener('click', closeMenu);

menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.hidden = true;
    body.classList.remove('is-menu-open');
    openButton?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu && !menu.hidden) closeMenu();
});
