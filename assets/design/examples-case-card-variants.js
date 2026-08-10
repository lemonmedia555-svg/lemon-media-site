const CASE_VARIANTS = [
  {name:'Саратов Кухни', category:'Кухни и интерьер', meta:'15 публикаций', type:'product', task:'Показать выбор кухни как понятный путь — от полезных советов до бесплатного замера.', link:'case-saratov-kitchens-design.html', accent:'#d5a128', soft:'#f4ead7', ink:'#17130e', images:['assets/cases/saratov-kitchens-2026-08/posts/01.webp','assets/cases/saratov-kitchens-2026-08/posts/03.webp','assets/cases/saratov-kitchens-2026-08/posts/05.webp']},
  {name:'FR-moto', category:'Технический продукт', meta:'10 публикаций', type:'product', task:'Перевести технические характеристики на язык выбора и реальных ситуаций.', link:'case-fr-moto-design.html', accent:'#f1ce00', soft:'#171717', ink:'#ffffff', images:['assets/cases/fr-moto/posts/08.jpg','assets/cases/fr-moto/carousels/03/01.jpg','assets/cases/fr-moto/stories/01.jpg']},
  {name:'Атерис', category:'Ветеринарный центр', meta:'10 публикаций', type:'services', task:'Объяснить экспертные темы спокойно и снять сомнения до обращения.', link:'case-ateris-design.html', accent:'#3a9a58', soft:'#e6f3e4', ink:'#10351d', images:['assets/cases/ateris/posts/03.jpg','assets/cases/ateris/posts/05.jpg','assets/cases/ateris/posts/08.jpg']},
  {name:'Сергей Глибин', category:'Личный бренд', meta:'20 публикаций', type:'experts', task:'Собрать опыт, личность и услугу в одну узнаваемую систему.', link:'case-sergey-glibin-design.html', accent:'#111111', soft:'#eeeae2', ink:'#151515', images:['assets/cases/sergey-glibin/posts/19.jpg','assets/cases/sergey-glibin/carousels/06/01.jpg','assets/cases/sergey-glibin/stories/03.jpg']},
  {name:'MoscowPadel', category:'Спортивная инфраструктура', meta:'20 публикаций', type:'sport', task:'Показать объект через сценарии использования, преимущества и доверие.', link:'case-moscow-padel-design.html', accent:'#b6db22', soft:'#dfe9c4', ink:'#113724', images:['assets/cases/moscow-padel/posts/19.jpg','assets/cases/moscow-padel/posts/20.jpg','assets/cases/moscow-padel/posts/15.jpg']},
  {name:'Доброе сердце', category:'Благотворительность', meta:'21 готовый макет', type:'social', task:'Рассказывать истории помощи с уважением и понятным следующим действием.', link:'case-dobroe-serdtse-design.html', accent:'#35bf79', soft:'#e1f5ec', ink:'#113d2b', images:['assets/cases/dobroe-serdtse/posts/01.webp','assets/cases/dobroe-serdtse/carousels/02/01.webp','assets/cases/dobroe-serdtse/posts/10.webp']}
];

function media(item) {
  return `<div class="cv-media">${item.images.map((src,index) => `<img src="${src}" alt="${item.name}: материал ${index + 1}">`).join('')}</div>`;
}

function selectedCard(item) {
  return `<article class="cv-selected-card" data-category="${item.type}" style="--accent:${item.accent};--soft:${item.soft};--client-ink:${item.ink}">${media(item)}<div class="cv-selected-copy"><span>${item.category} · ${item.meta}</span><h2>${item.name}</h2><p>${item.task}</p><a href="${item.link}">Смотреть работу →</a></div></article>`;
}

document.querySelectorAll('[data-variant-grid]').forEach((grid) => {
  grid.innerHTML = CASE_VARIANTS.map(selectedCard).join('');
  const menu = grid.closest('.cv-shell').querySelector('[data-filter-menu]');
  menu.addEventListener('click',(event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    menu.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('is-active',item === button));
    grid.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  });
});
