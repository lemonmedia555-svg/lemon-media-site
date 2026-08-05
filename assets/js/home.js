/* lemonmedia — главная: интерактив (ванильный JS, без зависимостей) */
(function () {
  'use strict';

  /* Дублируем содержимое showcase - для бесшовной автопрокрутки цикла */
  var track = document.querySelector('.showcase-track');
  if (track) track.innerHTML += track.innerHTML;

  /* ====== Карусели: стрелки + перетаскивание + лайтбокс ====== */
  var DRAG_THRESHOLD = 6;

  /* Лайтбокс (один на страницу) */
  var lb = document.createElement('div');
  lb.className = 'cl-lightbox';
  lb.innerHTML =
    '<div class="cl-backdrop"></div>' +
    '<button class="cl-close" aria-label="Закрыть">&times;</button>' +
    '<button class="cl-nav cl-prev" aria-label="Назад"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 5 8 12 15 19"></polyline></svg></button>' +
    '<div class="cl-stage"><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="></div>' +
    '<button class="cl-nav cl-next" aria-label="Вперед"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 16 12 9 19"></polyline></svg></button>' +
    '<div class="cl-counter"></div>';
  document.body.appendChild(lb);

  var stageImg = lb.querySelector('.cl-stage img');
  var counter = lb.querySelector('.cl-counter');
  var imgs = [], idx = 0;

  function render() {
    if (!imgs.length || imgs[idx] == null) return;
    stageImg.src = imgs[idx];
    counter.textContent = (idx + 1) + ' / ' + imgs.length;
  }
  function openLB(list, start) {
    imgs = list; idx = start;
    render();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function go(d) { idx = (idx + d + imgs.length) % imgs.length; render(); }

  lb.querySelector('.cl-close').addEventListener('click', closeLB);
  lb.querySelector('.cl-backdrop').addEventListener('click', closeLB);
  lb.querySelector('.cl-prev').addEventListener('click', function () { go(-1); });
  lb.querySelector('.cl-next').addEventListener('click', function () { go(1); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });
  var sx = 0, sdown = false;
  var stage = lb.querySelector('.cl-stage');
  stage.addEventListener('pointerdown', function (e) { sdown = true; sx = e.clientX; });
  stage.addEventListener('pointerup', function (e) {
    if (!sdown) return; sdown = false;
    var dx = e.clientX - sx;
    if (dx > 40) go(-1); else if (dx < -40) go(1);
  });

  /* Настройка каждой ленты карусели */
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var strip = carousel.querySelector('.slides');
    if (!strip) return;

    var prevBtn = document.createElement('button');
    prevBtn.className = 'cr-arrow cr-arrow-prev';
    prevBtn.setAttribute('aria-label', 'Назад');
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="15 5 8 12 15 19"></polyline></svg>';
    var nextBtn = document.createElement('button');
    nextBtn.className = 'cr-arrow cr-arrow-next';
    nextBtn.setAttribute('aria-label', 'Вперед');
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="9 5 16 12 9 19"></polyline></svg>';
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);

    function step() {
      var slide = strip.querySelector('.slide');
      var w = slide ? slide.getBoundingClientRect().width + 8 : strip.clientWidth * 0.8;
      return Math.max(w, Math.round(strip.clientWidth * 0.7));
    }
    function syncArrows() {
      var max = strip.scrollWidth - strip.clientWidth - 2;
      carousel.classList.toggle('at-start', strip.scrollLeft <= 2);
      carousel.classList.toggle('at-end', strip.scrollLeft >= max);
    }
    prevBtn.addEventListener('click', function () { strip.scrollBy({ left: -step(), behavior: 'smooth' }); });
    nextBtn.addEventListener('click', function () { strip.scrollBy({ left: step(), behavior: 'smooth' }); });
    strip.addEventListener('scroll', syncArrows, { passive: true });
    syncArrows();

    /* Перетаскивание + тап для открытия лайтбокса */
    var down = false, moved = false, startX = 0, startScroll = 0, downImg = null;
    strip.addEventListener('pointerdown', function (e) {
      down = true; moved = false;
      startX = e.clientX; startScroll = strip.scrollLeft;
      downImg = e.target.closest('.slide img');
      strip.setPointerCapture(e.pointerId);
    });
    strip.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) { moved = true; strip.classList.add('dragging'); }
      strip.scrollLeft = startScroll - dx;
    });
    function endDrag() {
      if (!down) return;
      down = false;
      strip.classList.remove('dragging');
      if (!moved && downImg) {
        var nodes = strip.querySelectorAll('.slide img');
        var list = Array.prototype.map.call(nodes, function (i) { return i.src; });
        var start = Array.prototype.indexOf.call(nodes, downImg);
        openLB(list, Math.max(0, start));
      }
      downImg = null;
      syncArrows();
    }
    strip.addEventListener('pointerup', endDrag);
    strip.addEventListener('pointercancel', function () { down = false; moved = false; downImg = null; strip.classList.remove('dragging'); });
  });

  /* Посты в секции примеров тоже открываются в лайтбоксе */
  var exImgs = document.querySelectorAll('.ex-post img');
  exImgs.forEach(function (img, i) {
    img.addEventListener('click', function () {
      var list = Array.prototype.map.call(exImgs, function (im) { return im.src; });
      openLB(list, i);
    });
  });

  /* Прозрачный хедер становится белым при скролле */
  var hdr = document.querySelector('header');
  if (hdr) {
    var syncHdr = function () { hdr.classList.toggle('scrolled', window.scrollY > 12); };
    syncHdr();
    window.addEventListener('scroll', syncHdr, { passive: true });
  }

  /* Логотип: сжатие + перекат 360° */
  document.querySelectorAll('.lm-anim-logo').forEach(function (logo) {
    var roll = function () { logo.classList.add('is-rolling'); };
    logo.addEventListener('animationend', function () { logo.classList.remove('is-rolling'); });
    requestAnimationFrame(roll);
    setInterval(roll, 30000);
  });

  /* Бургер и мобильное меню */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mobile-nav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) hdr.classList.add('scrolled');
    });
    mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mnav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* FAQ-аккордеон */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
})();
