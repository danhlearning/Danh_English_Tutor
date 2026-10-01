(() => {
  'use strict';
  const list = document.getElementById('unit-list');
  for (const unit of window.DanhGrade6Units) {
    const card = document.createElement('a');
    card.className = 'g6-unit-card';
    card.href = `./${unit.id}.html`;
    card.style.setProperty('--unit-color', unit.color);
    const top = document.createElement('div'); top.className = 'g6-card-top';
    const number = document.createElement('span'); number.className = 'g6-unit-number'; number.textContent = `UNIT ${String(unit.number).padStart(2, '0')}`;
    const icon = document.createElement('span'); icon.className = 'g6-unit-icon'; icon.textContent = unit.icon; icon.setAttribute('aria-hidden', 'true');
    top.append(number, icon);
    const title = document.createElement('h3'); title.textContent = unit.title;
    const meaning = document.createElement('p'); meaning.textContent = unit.vietnamese;
    const bottom = document.createElement('div'); bottom.className = 'g6-card-bottom';
    const count = document.createElement('span'); count.textContent = `${unit.words.length} từ vựng`;
    const enter = document.createElement('strong'); enter.textContent = 'Vào học →';
    bottom.append(count, enter);
    card.append(top, title, meaning, bottom);
    list.append(card);
  }
})();
