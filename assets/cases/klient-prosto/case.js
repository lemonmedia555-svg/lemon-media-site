document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('[data-kp-tabs]');

  if (tabList) {
    const tabs = Array.from(tabList.querySelectorAll('[data-kp-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-kp-panel]'));

    const activateTab = (tab, moveFocus = false) => {
      const key = tab.dataset.kpTab;

      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.kpPanel !== key;
      });

      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = index;

        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        if (nextIndex !== index) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });
  }

  document.querySelectorAll('[data-kp-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-kp-slide]'));
    const previous = carousel.querySelector('[data-kp-prev]');
    const next = carousel.querySelector('[data-kp-next]');
    const counter = carousel.querySelector('[data-kp-counter]');
    const thumbs = carousel.querySelector('[data-kp-thumbs]');
    let current = 0;

    if (!slides.length) return;

    const render = () => {
      slides.forEach((slide, index) => {
        slide.hidden = index !== current;
      });

      if (counter) counter.textContent = `${current + 1} / ${slides.length}`;

      if (thumbs) {
        thumbs.querySelectorAll('button').forEach((button, index) => {
          button.setAttribute('aria-current', String(index === current));
        });
      }
    };

    if (thumbs) {
      slides.forEach((slide, index) => {
        const image = slide.querySelector('img');
        const button = document.createElement('button');
        const thumbnail = document.createElement('img');

        button.type = 'button';
        button.setAttribute('aria-label', `Показать экран ${index + 1}`);
        thumbnail.src = image ? image.src : '';
        thumbnail.alt = '';
        thumbnail.loading = 'lazy';
        button.append(thumbnail);
        button.addEventListener('click', () => {
          current = index;
          render();
        });
        thumbs.append(button);
      });
    }

    previous?.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      render();
    });

    next?.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      render();
    });

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        current = (current + 1) % slides.length;
        render();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        current = (current - 1 + slides.length) % slides.length;
        render();
      }
    });

    render();
  });

  const dialog = document.querySelector('[data-kp-dialog]');

  if (dialog) {
    const dialogImage = dialog.querySelector('[data-kp-dialog-image]');
    const dialogTitle = dialog.querySelector('[data-kp-dialog-title]');

    document.querySelectorAll('[data-kp-open]').forEach((button) => {
      button.addEventListener('click', () => {
        const image = button.querySelector('img');
        const source = button.dataset.kpSrc || image?.src || '';
        const title = button.dataset.kpAlt || image?.alt || 'Работа проекта';

        if (dialogImage) {
          dialogImage.src = source;
          dialogImage.alt = title;
        }

        if (dialogTitle) dialogTitle.textContent = title;

        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      });
    });

    dialog.querySelectorAll('[data-kp-dialog-close]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });

    dialog.addEventListener('click', (event) => {
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom;

      if (outside) dialog.close();
    });
  }
});
