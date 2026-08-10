document.querySelectorAll('[data-focus-showcase]').forEach((showcase) => {
  const controls = [...showcase.querySelectorAll('[data-focus]')];
  const slides = [...showcase.querySelectorAll('[data-slide]')];
  const progress = showcase.querySelector('.hv-focus-progress i');
  let active = 0;
  let timer;

  const show = (index) => {
    active = index;
    controls.forEach((control, controlIndex) => control.classList.toggle('is-active', controlIndex === active));
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === active));
    progress.style.animation = 'none';
    progress.offsetHeight;
    progress.style.animation = '';
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => show((active + 1) % slides.length), 5000);
  };

  controls.forEach((control, index) => control.addEventListener('click', () => {
    show(index);
    start();
  }));

  showcase.addEventListener('mouseenter', () => clearInterval(timer));
  showcase.addEventListener('mouseleave', start);
  start();
});
