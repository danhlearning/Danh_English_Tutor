/* Gõ từ lớp 12: lượt riêng theo Unit/hồ sơ, giữ bằng chứng tự sửa và đã xem. */
'use strict';
window.DanhGrade12Spelling = function ({stage, words, unitId}) {
  const key = `danh-g12-spelling-${unitId}-v1`;
  const storage = window.DanhLearners.storage;
  const byId = new Map(words.map(w => [w.id, w]));
  const normal = value => String(value).trim().toLocaleLowerCase('en').replace(/[’‘]/g,"'").replace(/\s+/g,' ');
  const outcomes = ['first','corrected','hinted','seen'];
  let warning = '', state;
  function fresh(ids = words.map(w => w.id)) {
    return {version:1, order:window.DanhVocabularyGame.shuffle(ids), position:0, entries:{}};
  }
  function valid(s) {
    return s?.version === 1 && Array.isArray(s.order) && s.order.length > 0 && s.order.length <= words.length &&
      new Set(s.order).size === s.order.length && s.order.every(id => byId.has(id)) &&
      Number.isInteger(s.position) && s.position >= 0 && s.position <= s.order.length && s.entries &&
      s.order.every((id,i) => {
        const e=s.entries[id];
        return (!e ? i >= s.position : typeof e.draft === 'string' && e.draft.length <= 250 && Number.isInteger(e.attempts) && e.attempts >= 0 &&
          (!e.outcome || outcomes.includes(e.outcome)) && (i >= s.position || !!e.outcome));
      });
  }
  try { const saved=JSON.parse(storage.getItem(key)||'null'); state=valid(saved)?saved:fresh(); }
  catch { state=fresh(); }
  function save() {
    try { storage.setItem(key,JSON.stringify(state)); }
    catch { warning='Lượt này chỉ được giữ khi trang còn mở.'; }
  }
  const el = (tag,text,cls) => {const e=document.createElement(tag); if(text)e.textContent=text;if(cls)e.className=cls;return e;};
  const button = (label,run,cls='g6-secondary') => {const b=el('button',label,cls);b.type='button';b.addEventListener('click',run);return b;};
  const effect = name => window.DanhVocabularyGame.feedback(name,stage);
  function start(ids) {state=fresh(ids);save();render();effect('start');}
  function render(focus=false) {
    stage.replaceChildren();
    if (state.position >= state.order.length) {
      const values=state.order.map(id=>state.entries[id]);
      stage.append(el('h3','Hoàn thành lượt gõ từ!'),el('p',`Đúng ngay: ${values.filter(e=>e.outcome==='first').length} · Tự sửa: ${values.filter(e=>e.outcome==='corrected').length} · Có gợi ý: ${values.filter(e=>e.outcome==='hinted').length} · Đã xem: ${values.filter(e=>e.outcome==='seen').length}`,'g12-result-counts'));
      const weak=state.order.filter(id=>state.entries[id].outcome!=='first');
      if(weak.length){
        const list=el('ul',null,'g12-review-list');
        for(const id of weak){const w=byId.get(id),li=el('li');li.append(el('span',`${w.term} · ${w.meaning}`),button('🔊 Nghe',()=>window.DanhAnswerSpeech.say(w.term),'g6-sound'));list.append(li);}
        stage.append(list,button(`Ôn ${weak.length} từ còn khó`,()=>start(weak),'g6-primary'));
      }
      stage.append(button('Chơi lượt mới',()=>start()));
      if(focus){stage.querySelector('h3').tabIndex=-1;stage.querySelector('h3').focus();}
      return;
    }
    const id=state.order[state.position],w=byId.get(id);
    const entry=state.entries[id] ||= {draft:'',attempts:0,outcome:null};
    save();
    const position=el('p',`Từ ${state.position+1}/${state.order.length}`,'g6-card-position');
    const heading=el('h3',w.meaning);heading.id='spelling-question';
    const form=el('form',null,'g6-answer');
    const input=el('input'); input.type='text';input.maxLength=250;input.autocomplete='off';input.spellcheck=false;input.autocapitalize='none';input.setAttribute('aria-labelledby',heading.id);input.value=entry.draft;
    const submit=el('button','Kiểm tra','g6-primary');submit.type='submit';
    const feedback=el('p',null,'g6-feedback');feedback.setAttribute('role','status');input.setAttribute('aria-describedby','spelling-feedback');feedback.id='spelling-feedback';
    const actions=el('div',null,'g12-spelling-actions');
    const listen=button('🔊 Nghe gợi ý',()=>{
      if(!window.DanhListenControls?.isManualRequest() && !window.DanhVocabularyGame.soundEnabled()){feedback.textContent='Âm thanh đang tắt.';return;}
      if(!entry.outcome){entry.hint=true;save();}
      window.DanhAnswerSpeech.say(w.term);
    },'g6-sound');
    const reveal=button('Xem đáp án',()=>{
      if(entry.outcome)return;entry.outcome='seen';save();effect('help');showResult();next.focus();
    });
    const next=button('Từ tiếp theo →',()=>{
      if(!entry.outcome||next.disabled)return;
      next.disabled=true;state.position++;save();render(true);effect(state.position===state.order.length?'complete':'next');
    },'g6-primary');
    function showResult() {
      const done=!!entry.outcome;
      input.disabled=done;submit.disabled=done;
      reveal.hidden=done||entry.attempts<2;next.hidden=!done;
      listen.textContent=done?'🔊 Nghe lại':'🔊 Nghe gợi ý';
      if(done)feedback.textContent=entry.outcome==='seen'?`Đáp án: ${w.term}. Cùng ôn lại từ này nhé.`:entry.outcome==='corrected'?`Em đã tự sửa đúng: ${w.term}!`:entry.outcome==='hinted'?`Đúng với gợi ý: ${w.term}!`:`Đúng rồi: ${w.term}!`;
      else if(entry.attempts)feedback.textContent='Chưa khớp. Em thử lại hoặc nghe gợi ý nhé.';
    }
    input.addEventListener('input',()=>{entry.draft=input.value;save();});
    form.addEventListener('submit',event=>{
      event.preventDefault();if(entry.outcome)return;
      if(!input.value.trim()){feedback.textContent='Gõ từ trước nhé.';input.focus();return;}
      entry.draft=input.value;
      if(normal(input.value)===normal(w.term)){
        entry.outcome=entry.hint?'hinted':entry.attempts?'corrected':'first';save();effect(entry.outcome==='first'?'good':'corrected');showResult();window.DanhAnswerSpeech.say(w.term);next.focus();
      }else{entry.attempts++;save();effect('bad');showResult();input.setAttribute('aria-invalid','true');input.focus();input.select();}
    });
    input.addEventListener('input',()=>input.removeAttribute('aria-invalid'));
    form.append(input,submit);actions.append(listen,reveal,next);
    stage.append(position,heading,form,actions,feedback);
    if(warning)stage.append(el('p',warning,'g6-note'));
    showResult();
    if(focus&&!entry.outcome)input.focus();
  }
  save();
  render();
};
