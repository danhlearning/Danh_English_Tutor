(() => {
  'use strict';
  const list = document.getElementById('unit-list');
  for (const unit of window.DanhGrade12Units) {
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
    const count = document.createElement('span'); count.className='g12-unit-count';count.textContent='';count.hidden=true;
    try {
      const round=JSON.parse(window.DanhLearners.storage.getItem(`danh-g12-spelling-${unit.id}-v1`)||'null');
      if(round?.version===1&&Array.isArray(round.order)&&round.order.length<=unit.words.length&&round.order.every(id=>unit.words.some(w=>w.id===id))&&Number.isInteger(round.position)&&round.position>=0&&round.position<round.order.length&&Object.values(round.entries||{}).some(e=>e?.draft||e?.outcome||e?.attempts)){
        count.hidden=false;count.textContent=`Tiếp tục gõ · ${round.position+1}/${round.order.length}`;
        card.href=`./${unit.id}.html?activity=spelling`;
      }
    }catch{}
    bottom.append(count);
    card.append(top, title, meaning);if(bottom.textContent)card.append(bottom);
    list.append(card);
  }
})();
