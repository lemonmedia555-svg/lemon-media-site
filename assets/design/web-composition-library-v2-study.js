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
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu({ restoreFocus: false })));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu && !menu.hidden) closeMenu();
});

const explorerTabs = [...document.querySelectorAll('[data-explorer-tab]')];
const explorerPanels = [...document.querySelectorAll('[data-explorer-panel]')];

explorerTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.explorerTab;
    explorerTabs.forEach(item => item.setAttribute('aria-selected', String(item === tab)));
    explorerPanels.forEach(panel => {
      const isActive = panel.dataset.explorerPanel === target;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });
  });
});

const calculator = document.querySelector('[data-calculator]');

if (calculator) {
  const volumeInputs = [...calculator.querySelectorAll('input[name="volume"]')];
  const storyButtons = [...calculator.querySelectorAll('[data-story-count]')];
  const carouselMinus = calculator.querySelector('[data-carousel-minus]');
  const carouselPlus = calculator.querySelector('[data-carousel-plus]');
  const carouselCountNode = calculator.querySelector('[data-carousel-count]');
  const totalPriceNode = calculator.querySelector('[data-total-price]');
  const summaryVolumeNode = calculator.querySelector('[data-summary-volume]');
  const summaryCarouselsNode = calculator.querySelector('[data-summary-carousels]');
  const summaryStoriesNode = calculator.querySelector('[data-summary-stories]');
  const placementNode = calculator.querySelector('[data-placement-count]');
  let carouselCount = 0;
  let storyCount = 0;
  let storyPrice = 0;

  const formatPrice = value => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;

  function updateCalculator() {
    const selectedVolume = volumeInputs.find(input => input.checked) || volumeInputs[0];
    const volume = Number(selectedVolume.value);
    const basePrice = Number(selectedVolume.dataset.price);
    carouselCount = Math.min(volume, carouselCount);
    const total = basePrice + carouselCount * 250 + storyPrice;

    volumeInputs.forEach(input => input.closest('label')?.classList.toggle('is-selected', input === selectedVolume));
    if (carouselCountNode) carouselCountNode.textContent = String(carouselCount);
    if (totalPriceNode) totalPriceNode.textContent = formatPrice(total);
    if (summaryVolumeNode) summaryVolumeNode.textContent = String(volume);
    if (summaryCarouselsNode) summaryCarouselsNode.textContent = String(carouselCount);
    if (summaryStoriesNode) summaryStoriesNode.textContent = String(storyCount);
    if (placementNode) placementNode.textContent = String(volume * 5);
  }

  volumeInputs.forEach(input => input.addEventListener('change', updateCalculator));

  carouselMinus?.addEventListener('click', () => {
    carouselCount = Math.max(0, carouselCount - 1);
    updateCalculator();
  });

  carouselPlus?.addEventListener('click', () => {
    const selectedVolume = volumeInputs.find(input => input.checked) || volumeInputs[0];
    carouselCount = Math.min(Number(selectedVolume.value), carouselCount + 1);
    updateCalculator();
  });

  storyButtons.forEach(button => {
    button.addEventListener('click', () => {
      storyButtons.forEach(item => item.classList.toggle('is-selected', item === button));
      storyCount = Number(button.dataset.storyCount);
      storyPrice = Number(button.dataset.storyPrice);
      updateCalculator();
    });
  });

  updateCalculator();
}
