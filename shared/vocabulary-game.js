/* Game từ vựng dùng chung cho lớp 6 và 7. */
(() => {
  'use strict';
  const storage = window.DanhLearners.storage;
  const normal = value => String(value).toLocaleLowerCase('en').trim().replace(/\s+/g,' ');
  const read = (key, fallback) => { try { return JSON.parse(storage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const write = (key, value) => { try { storage.setItem(key,JSON.stringify(value)); } catch {} };
  const shuffle = values => {
    const out = [...values];
    for (let i=out.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]; }
    return out;
  };
  const el = (tag, text, className) => { const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node; };
  const button = (text, action, className='g6-primary') => { const node=el('button',text,className);node.type='button';node.addEventListener('click',action);return node; };
  const effects=window.DanhLearningEffects;
  const {feedback,afterFeedback,reduced}=effects;
  const settings = () => {
    document.body.classList.add('vg-world');
  };
  settings();

  function connectTablists() {
    for (const list of document.querySelectorAll('[role="tablist"]')) {
      const tabs=[...list.querySelectorAll('[role="tab"][data-tab]')];
      if(!tabs.length)continue;
      for(const tab of tabs){
        const panel=document.getElementById(tab.dataset.tab);
        if(!panel)continue;
        if(!tab.id)tab.id=`danh-tab-${tab.dataset.tab}`;
        tab.setAttribute('aria-controls',panel.id);
        panel.setAttribute('aria-labelledby',tab.id);
        panel.tabIndex=0;
      }
      const sync=()=>{const selected=tabs.find(tab=>tab.getAttribute('aria-selected')==='true')||tabs[0];for(const tab of tabs)tab.tabIndex=tab===selected?0:-1;};
      sync();
      new MutationObserver(sync).observe(list,{subtree:true,attributes:true,attributeFilter:['aria-selected']});
      list.addEventListener('keydown',event=>{
        const index=tabs.indexOf(event.target);
        if(index<0||event.altKey||event.ctrlKey||event.metaKey)return;
        const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:null;
        if(next===null)return;
        event.preventDefault();tabs[next].focus();tabs[next].click();sync();
      });
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',connectTablists,{once:true});
  else connectTablists();

  function flashcards({card,words,previous,next,illustration}) {
    let index=0,flipped=false,locked=false,timer;
    let inner;card.classList.add('vg-flip-card');
    const side = (word,back) => {
      const face=el('span',undefined,`vg-flip-face ${back?'vg-flip-back':'vg-flip-front'}`);
      face.append(el('span',`THẺ ${index+1}/${words.length}`,'g6-card-position'));
      if(back)face.append(illustration(word));
      face.append(el('strong',back?word.meaning:word.term),el('span',back?word.example:'Đoán nghĩa rồi chạm để lật','vg-flip-prompt'));
      return face;
    };
    const accessible=()=>{
      inner.children[0].setAttribute('aria-hidden',String(flipped));inner.children[1].setAttribute('aria-hidden',String(!flipped));
      card.setAttribute('aria-pressed',String(flipped));
      card.setAttribute('aria-label',flipped?`${words[index].meaning}. Chạm để xem từ tiếng Anh.`:`${words[index].term}. Chạm để xem nghĩa.`);
    };
    const render=()=>{
      clearTimeout(timer);locked=false;flipped=false;card.classList.remove('is-flipped');
      // A fresh rotating surface starts at zero without forcing the whole page to lay out.
      inner=el('span',undefined,'vg-flip-inner');inner.append(side(words[index],false),side(words[index],true));card.replaceChildren(inner);accessible();
    };
    card.addEventListener('click',()=>{
      if(locked)return;
      flipped=!flipped;card.classList.toggle('is-flipped',flipped);accessible();feedback('flip',card);
      locked=!reduced();if(locked)timer=setTimeout(()=>{locked=false;},560);
    });
    const move=direction=>{index=(index+direction+words.length)%words.length;render();feedback('next',card);};
    previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));render();
    return {current:()=>words[index]};
  }

  const streakLength = round => {
    if(round.attempts>0 || round.solved && round.outcome!=='first')return 0;
    let count=round.solved?1:0;
    for(let i=round.results.length-1;i>=0 && round.results[i].outcome==='first';i--)count++;
    return count;
  };
  const isMilestone = count => count===3 || count>=5 && count%5===0;

  function mount({stage,words,grade,scope,mark=()=>{},length=words.length}) {
    const all=words.map(word=>({...word,key:word.key || `u${word.unit || 0}-w${word.id}`}));
    const byKey=new Map(all.map(word=>[word.key,word]));
    const key=`danh-g${grade}-vocabulary-game-${scope}-v1`;
    const saved=read(key,{});
    const state={history:saved.history && typeof saved.history==='object' && !Array.isArray(saved.history)?saved.history:{},active:null};
    const valid = round => round && Array.isArray(round.items) && round.items.length>0 && round.items.length<=length && new Set(round.items).size===round.items.length && round.items.every(id=>byKey.has(id)) && Number.isInteger(round.index) && round.index>=0 && round.index<=round.items.length && Array.isArray(round.results) && round.results.length===round.index && round.results.every((result,index)=>result && ['first','corrected','seen'].includes(result.outcome) && result.key===round.items[index]) && Array.isArray(round.wrong) && new Set(round.wrong).size===round.wrong.length && round.wrong.every(id=>byKey.has(id)) && Number.isInteger(round.attempts) && round.attempts>=0 && typeof round.solved==='boolean' && (!round.solved || ['first','corrected','seen'].includes(round.outcome)) && (!round.options || Array.isArray(round.options) && round.options.length===4 && new Set(round.options).size===4 && round.options.every(id=>byKey.has(id)) && round.options.includes(round.items[round.index]));
    if(valid(saved.active))state.active=saved.active;
    const persist=()=>write(key,state);
    const eligible = target => {
      const seen=new Set([normal(target.term)]);
      return shuffle(all).filter(word=>{
        if(normal(word.meaning)===normal(target.meaning)||seen.has(normal(word.term)))return false;
        seen.add(normal(word.term));return true;
      });
    };
    const select = pool => {
      const unique=new Set();
      const candidates=shuffle(pool).filter(word=>{const id=`${normal(word.term)}|${normal(word.meaning)}`;if(unique.has(id))return false;unique.add(id);return eligible(word).length>=3;});
      candidates.sort((a,b)=>{
        const rank=w=>state.history[w.key]?.last==='first'?2:state.history[w.key]?0:1;
        return rank(a)-rank(b);
      });
      const units=[...new Set(candidates.map(word=>word.unit || 0))];
      const picked=units.map(unit=>candidates.find(word=>(word.unit || 0)===unit)).filter(Boolean).slice(0,length);
      return shuffle([...picked,...candidates.filter(word=>!picked.includes(word)).slice(0,length-picked.length)]).map(word=>word.key);
    };
    const begin = (pool=all) => {
      const items=select(pool);if(!items.length){stage.replaceChildren(el('p','Chưa đủ từ khác nhau để tạo lượt trắc nghiệm.'));return;}
      state.active={items,index:0,results:[],attempts:0,wrong:[],solved:false,options:null};persist();render();focusQuestion();feedback('start',stage);
    };
    const current = () => byKey.get(state.active.items[state.active.index]);
    const finish = outcome => {
      const round=state.active;if(round.solved)return;
      round.solved=true;round.outcome=outcome;
      const word=current(),prior=state.history[word.key];
      const history=prior && typeof prior==='object'?prior:{};
      history[outcome]=(Number.isFinite(history[outcome])?history[outcome]:0)+1;history.last=outcome;state.history[word.key]=history;
      if(outcome==='first')mark(word);
      persist();render();
      const count=streakLength(round);
      feedback(outcome==='seen'?'help':outcome==='corrected'?'corrected':isMilestone(count)?'streak':'good',stage.querySelector('.g6-choice.correct') || stage);
      if(isMilestone(count))feedbackVisualStreak(stage);
      if(outcome!=='seen')window.DanhAnswerSpeech.say(word.term);
    };
    const points = results => results.reduce((sum,result)=>sum+(result.outcome==='first'?10:result.outcome==='corrected'?5:0),0);
    const focusQuestion = () => {
      const question=stage.querySelector('[data-word-key]');
      if(question){question.tabIndex=-1;question.focus({preventScroll:true});stage.scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});}
    };
    function welcome() {
      stage.replaceChildren();
      const card=el('div',undefined,'vg-welcome');card.append(el('span','🐱','vg-mascot'),el('h3',scope.startsWith('term')?'Thử thách từ vựng học kỳ':'Sẵn sàng gom sao?'),el('p',`Đọc nghĩa tiếng Việt, chọn một trong 4 từ tiếng Anh. Mỗi lượt ${Math.min(length,all.length)} câu. Đúng ngay: 10 sao · tự sửa: 5 sao · xem đáp án: 0 sao.`));
      if(state.active)card.append(button(state.active.index===state.active.items.length?'Xem tổng kết lượt trước':'Tiếp tục lượt dở',()=>{render();focusQuestion();}));
      card.append(button(state.active?'Chơi lượt mới':'Bắt đầu chơi',()=>begin(),state.active?'g6-secondary':'g6-primary'));stage.append(card);
    }
    function render() {
      const round=state.active;if(!round){welcome();return;}
      stage.replaceChildren();
      if(round.index>=round.items.length){
        const first=round.results.filter(result=>result.outcome==='first').length,corrected=round.results.filter(result=>result.outcome==='corrected').length,seen=round.results.filter(result=>result.outcome==='seen').length;
        stage.append(el('span','🏆','vg-mascot'),el('h3',`Em đã hoàn thành ${round.items.length} câu!`),el('p',`⭐ ${points(round.results)} sao · Đúng ngay: ${first} · Tự sửa đúng: ${corrected} · Đã xem: ${seen}`));
        const weak=round.results.filter(result=>result.outcome!=='first').map(result=>byKey.get(result.key));
        if(weak.length){stage.append(el('p',`Cần ôn: ${weak.map(word=>word.term).join(', ')}`),button('Ôn lại từ cần luyện',()=>begin(weak)));}
        stage.append(button('Chơi lượt mới',()=>begin(),'g6-secondary'));return;
      }
      const word=current();
      if(!round.options){round.options=shuffle([word,...eligible(word).slice(0,3)]).map(choice=>choice.key);persist();}
      const head=el('div',undefined,'vg-round-head');head.append(el('span',`Câu ${round.index+1}/${round.items.length}`),el('strong',`⭐ ${points(round.results)+(round.solved?points([{outcome:round.outcome}]):0)} sao`));
      const streak=el('span',`🔥 ${streakLength(round)} câu đúng liên tiếp`,'vg-streak');streak.dataset.streak=String(streakLength(round));head.append(streak);
      const progress=el('progress');progress.max=round.items.length;progress.value=round.index;progress.setAttribute('aria-label','Tiến trình lượt');
      const question=el('h3',`Từ tiếng Anh nào có nghĩa “${word.meaning}”?`);question.dataset.wordKey=word.key;
      const choices=el('div',undefined,'g6-choices'),status=el('p',undefined,'g6-feedback');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
      round.options.forEach((id,index)=>{
        const choice=byKey.get(id);
        const option=button(`${'ABCD'[index]}. ${choice.term}`,()=>{
          if(round.solved || round.wrong.includes(id))return;
          if(id===word.key){finish(round.attempts===0?'first':'corrected');}
          else {round.attempts++;round.wrong.push(id);persist();render();feedback('bad',stage.querySelector(`[data-answer-key="${id}"]`));}
        },'g6-choice');option.dataset.answerKey=id;
        if(round.wrong.includes(id)){option.disabled=true;option.classList.add('wrong');}
        if(round.solved){option.disabled=true;if(id===word.key)option.classList.add('correct');}
        choices.append(option);
      });
      stage.append(head,progress,question,choices,status);
      if(round.solved){
        status.textContent=round.outcome==='seen'?`Đáp án: ${word.term}. Em hãy ôn lại từ này.`:round.outcome==='first'?`Chính xác! +10 sao. ${word.term} = ${word.meaning}.`:`Em đã tự sửa đúng! +5 sao. ${word.term} = ${word.meaning}.`;
        status.classList.add(round.outcome==='seen'?'vg-help':'vg-good');
        stage.append(el('p',word.example,'vg-example'),button('🔊 Nghe từ',()=>{
          if(!window.DanhListenControls?.isManualRequest() && !effects.soundEnabled()){status.textContent='Âm thanh đang tắt. Bật âm thanh để nghe từ nhé.';return;}
          window.DanhAnswerSpeech.say(word.term);
        },'g6-secondary'));
        const next=button(round.index===round.items.length-1?'Xem tổng kết →':'Câu tiếp theo →',()=>{
          if(!round.solved)return;
          round.results.push({key:word.key,outcome:round.outcome});round.index++;round.attempts=0;round.wrong=[];round.solved=false;round.options=null;delete round.outcome;persist();render();focusQuestion();feedback(round.index===round.items.length?'complete':'next',stage);
        });next.dataset.next='true';stage.append(next);
      } else if(round.attempts){
        status.textContent='Chưa đúng, em thử lại nhé. Tự sửa cũng giúp em ghi nhớ!';
        if(round.attempts>=2){const reveal=button('Xem đáp án',()=>finish('seen'),'g6-secondary');stage.append(reveal);}
      }
    }
    welcome();
    return {begin,render};
  }
  function feedbackVisualStreak(stage) {
    const badge=stage.querySelector('.vg-streak');if(!badge)return;
    badge.textContent=`🔥 Tuyệt vời! ${badge.dataset.streak} câu đúng liên tiếp`;
    if(!reduced())badge.classList.add('vg-celebrate');
  }
  window.DanhVocabularyGame={mount,flashcards,feedback,afterFeedback,shuffle,normal,isMilestone,soundEnabled:effects.soundEnabled};
})();
