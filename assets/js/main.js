/* ============================================================
   Лимон Медиа — основной JS
   Что внутри:
     1. Бургер-меню (мобильное)
     2. Активная ссылка в навигации (по pathname)
     3. Переключатель тарификации месяц/год (на pricing.html)
     4. Фильтр кейсов (на examples.html)
     5. Обработчик формы записи на демо (на book-demo.html)
     6. Текущий год в подвале
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. БУРГЕР ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    const toggle = () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('is-locked', isOpen);
    };
    burger.addEventListener('click', toggle);
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('is-open')) toggle();
      });
    });
  }

  /* ---------- 2. АКТИВНАЯ ССЫЛКА В МЕНЮ ---------- */
  const path = location.pathname.replace(/\/$/, '') || '/index.html';
  const pageName = path.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((el) => {
    if (el.dataset.nav === pageName || (pageName === '' && el.dataset.nav === 'index.html')) {
      el.classList.add('nav__link--active');
      if (el.classList.contains('mobile-nav__link')) el.classList.add('mobile-nav__link--active');
    }
  });

  /* ---------- 3. ПЕРЕКЛЮЧАТЕЛЬ ТАРИФА ---------- */
  const billingToggle = document.querySelector('.billing-toggle');
  if (billingToggle) {
    const buttons = billingToggle.querySelectorAll('button');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.billing; // 'month' | 'year'
        buttons.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        document.querySelectorAll('[data-price]').forEach((el) => {
          el.textContent = el.dataset['price' + mode.charAt(0).toUpperCase() + mode.slice(1)];
        });
        document.querySelectorAll('[data-period]').forEach((el) => {
          el.textContent = mode === 'year' ? '/ в месяц при оплате за год' : '/ в месяц';
        });
      });
    });
  }

  /* ---------- 4. ФИЛЬТР КЕЙСОВ ---------- */
  const filters = document.querySelector('.filters');
  if (filters) {
    const cards = document.querySelectorAll('[data-case-category]');
    filters.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter; // 'all' | категория
        filters.querySelectorAll('.filter-btn').forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
        cards.forEach((card) => {
          const show = cat === 'all' || card.dataset.caseCategory === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 5. ФОРМА ДЕМО ---------- */
  const demoForm = document.querySelector('#demo-form');
  if (demoForm) {
    const validators = {
      name: (v) => v.trim().length >= 2,
      phone: (v) => /^[\d\s+\-()]{7,}$/.test(v.trim()),
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    };
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      Object.entries(validators).forEach(([name, check]) => {
        const field = demoForm.querySelector(`[name="${name}"]`)?.closest('.field');
        const input = demoForm.querySelector(`[name="${name}"]`);
        if (!field || !input) return;
        if (!check(input.value)) {
          field.classList.add('has-error');
          isValid = false;
        } else {
          field.classList.remove('has-error');
        }
      });
      if (!isValid) return;
      /* Здесь мог бы быть fetch на бэкенд. Пока — имитация успеха. */
      demoForm.classList.add('is-submitted');
      // Прокручиваем к сообщению
      const success = demoForm.querySelector('.form__success');
      if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    /* Снимаем подсветку ошибки при вводе */
    demoForm.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('input', () => input.closest('.field')?.classList.remove('has-error'));
    });
  }

  /* ---------- 6. ТЕКУЩИЙ ГОД ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 7. ТАБ-СИСТЕМЫ ---------- */
  /* Каждая группа табов идёт парой: .tabs[role=tablist] и набор .tab-panel
     с data-tab-panel="<имя>", совпадающим с data-tab="<имя>" в кнопке. */
  document.querySelectorAll('.tabs[role="tablist"]').forEach((tablist) => {
    const tabs = tablist.querySelectorAll('.tab');
    // ищем панели — в ближайшем общем родителе (секция/контейнер)
    const scope = tablist.closest('section, .container, body');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.tab;
        tabs.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
        scope.querySelectorAll('[data-tab-panel]').forEach((panel) => {
          panel.classList.toggle('is-active', panel.dataset.tabPanel === key);
        });
      });
    });
  });

})();
