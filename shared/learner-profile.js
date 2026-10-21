(function () {
  'use strict';
  if (window.DanhLearners) return;
  const C = window.DanhLearnerCore;
  const base = new URL('../', document.currentScript.src);
  const font=document.createElement('link');font.rel='stylesheet';font.href=new URL('shared/learner-font.css',base).href;document.head.append(font);
  const gaps=document.createElement('script');gaps.src=new URL('shared/exercise-gaps.js?v=solid-1',base).href;gaps.async=false;document.head.append(gaps);
  // Giọng đọc đáp án dùng chung, chỉ được gọi từ thao tác học đã chấm đúng.
  const answerSpeechEnabled=()=>window.DanhLearningEffects?.soundEnabled?.() ?? window.DanhGrammarExperience?.settings.sound ?? true;
  const cleanAnswerSpeech=s=>String(s||'').replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  const answerAudioKey=s=>{let hash=2166136261;for(const c of cleanAnswerSpeech(s).toLowerCase())hash=Math.imul(hash^c.charCodeAt(0),16777619);return(hash>>>0).toString(16).padStart(8,'0');};
  document.documentElement.dataset.answerSpeechVersion='audio-1';
  const answerSpeechState=(state,mode,text)=>{document.documentElement.dataset.answerSpeechState=state;document.documentElement.dataset.answerSpeechMode=mode;document.documentElement.dataset.answerSpeechText=text;document.dispatchEvent(new CustomEvent('danh-answer-speech',{detail:{state,mode,text}}));};
  let finishAnswerSpeech,answerAudio;
  const stopAnswerSpeech=()=>{if(answerAudio){answerAudio.pause();answerAudio.src='';answerAudio=null;}finishAnswerSpeech?.();try{window.speechSynthesis?.cancel();}catch{}};
  const playAnswerAudio=text=>{
    const audio=new Audio(new URL(`shared/answer-audio/${answerAudioKey(text)}.wav`,base));answerAudio=audio;
    if(window.DanhYoungSpeech)audio.playbackRate=.85;
    return new Promise(resolve=>{
      let finished=false;
      const done=()=>{if(finished)return;finished=true;clearTimeout(timeout);if(finishAnswerSpeech===done)finishAnswerSpeech=null;if(answerAudio===audio)answerAudio=null;resolve(true);};
      const timeout=setTimeout(done,Math.max(20000,text.length*180+4000));finishAnswerSpeech=done;
      audio.onended=()=>{answerSpeechState('ended','audio',text);done();};
      audio.onplaying=()=>answerSpeechState('playing','audio',text);
      const failed=()=>{document.dispatchEvent(new CustomEvent('danh-answer-speech',{detail:{state:'error',mode:'audio',text}}));const note=document.getElementById('speech-note');if(note)note.textContent='Chưa phát được giọng đọc. Em bấm Nghe từ để thử lại nhé.';done();};
      audio.onerror=failed;audio.play().catch(failed);
    });
  };
  window.DanhAnswerSpeech={
    say(text){
      if(!answerSpeechEnabled()||document.hidden)return false;
      const clean=cleanAnswerSpeech(text);
      if(!clean)return false;
      try{
        stopAnswerSpeech();
        const voices=window.speechSynthesis?.getVoices?.()||[];
        if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!voices.some(v=>/^en(?:[-_]|$)/i.test(v.lang)))return playAnswerAudio(clean);
        const utterance=new window.SpeechSynthesisUtterance(clean);utterance.lang='en-GB';utterance.rate=.82;
        utterance.voice=voices.find(v=>/^en[-_]GB$/i.test(v.lang))||voices.find(v=>/^en\b/i.test(v.lang))||null;
        window.DanhYoungSpeech?.configure(utterance);
        return new Promise(resolve=>{
          let finished=false;
          const done=()=>{if(finished)return;finished=true;clearTimeout(timeout);if(finishAnswerSpeech===done)finishAnswerSpeech=null;resolve(true);};
          const timeout=setTimeout(done,Math.max(20000,clean.length*180+4000));
          finishAnswerSpeech=done;
          utterance.onstart=()=>answerSpeechState('playing','speech',clean);
          const fallback=()=>{if(finished)return;if(!answerSpeechEnabled()||document.hidden){done();return;}clearTimeout(timeout);playAnswerAudio(clean).then(done);};
          utterance.onend=()=>{answerSpeechState('ended','speech',clean);done();};utterance.onerror=event=>{if(['canceled','interrupted'].includes(event.error))done();else fallback();};
          try{window.speechSynthesis.speak(utterance);}catch{fallback();}
        });
      }catch{return false;}
    },
    question(question){
      const answer=String(question.answer??question.answers?.[0]??'').split('|')[0];
      // Ngữ điệu/nhịp và nhãn âm cần nghe câu tiếng Anh mẫu, không đọc nhãn tiếng Việt.
      const example=String(question.prompt||'').match(/[“"]([^”"]+)[”"]/)?.[1];
      return this.say(/[\u00c0-\u1ef9↗↘→]/.test(answer)||/^\/[^/]+\/$/.test(answer)?example:answer);
    },
    stop:stopAnswerSpeech
  };
  window.addEventListener('pagehide',stopAnswerSpeech);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAnswerSpeech();});
  const memory = () => { const map = new Map(); return {get length(){return map.size;},key(i){return [...map.keys()][i]??null;},getItem(k){return map.get(k)??null;},setItem(k,v){map.set(k,String(v));},removeItem(k){map.delete(k);}}; };
  function available(type) { try { const s=window[type], k='danh-profile-check'; s.setItem(k,'1');s.removeItem(k);return s; } catch { return null; } }
  const local = available('localStorage'), session = available('sessionStorage');
  const temporary=memory();
  if(!local && !session){
    const existing=C.parse(window.name)?.temporaryData;
    if(existing && typeof existing==='object')Object.entries(existing).forEach(([k,v])=>temporary.setItem(k,v));
    const set=temporary.setItem,remove=temporary.removeItem;
    const flush=()=>{const state=C.parse(window.name,{}),data={};for(let i=0;i<temporary.length;i++){const k=temporary.key(i);data[k]=temporary.getItem(k);}window.name=JSON.stringify({...state,temporaryData:data});};
    temporary.setItem=(k,v)=>{set(k,v);flush();};temporary.removeItem=k=>{remove(k);flush();};
  }
  const raw = local || session || temporary, store = C.createStore(raw);
  const SESSION = 'danh-learner-session-v1';
  let tab;
  try { tab=C.parse(window.name)?.danhTab; } catch {}
  if (!tab) { tab=crypto.randomUUID?.() || Math.random().toString(36).slice(2); window.name=JSON.stringify({...C.parse(window.name,{}),danhTab:tab}); }
  let saved=session ? C.parse(session.getItem(SESSION)) : C.parse(window.name)?.learnerSession;
  const confirmed=saved?.tab===tab && Date.now()-saved.at<12*60*60*1000;
  const current=confirmed ? store.get(saved.id) : null;
  let host, shadow, overlay, panel, returnFocus, errorMessage='', mustReload=false;
  function guestStorage() {
    const key='danh-learner-guest-session-v1', data=memory();
    let savedGuest;
    try { savedGuest=(session && C.parse(session.getItem(key))) || C.parse(window.name)?.guestSession; } catch { savedGuest=C.parse(window.name)?.guestSession; }
    if(savedGuest?.tab===tab && savedGuest.data && typeof savedGuest.data==='object') {
      Object.entries(savedGuest.data).forEach(([k,v])=>{if(C.validKey(k) && typeof v==='string')data.setItem(k,v);});
    }
    const set=data.setItem,remove=data.removeItem;
    const flush=()=>{
      const values={};for(let i=0;i<data.length;i++){const k=data.key(i);values[k]=data.getItem(k);}
      const value={tab,data:values};
      try { if(session){session.setItem(key,JSON.stringify(value));return;} } catch {}
      window.name=JSON.stringify({...C.parse(window.name,{}),guestSession:value});
    };
    data.setItem=(k,v)=>{if(!C.validKey(String(k)))throw Error('Unsupported learning key');set(k,v);flush();};
    data.removeItem=k=>{remove(k);flush();};
    data.clear=()=>{for(const k of Array.from({length:data.length},(_,i)=>data.key(i)))remove(k);flush();};
    return data;
  }
  const storage=current ? store.scope(current.id, storageError, tab) : guestStorage();
  // This document keeps its own storage scope, including during pagehide after a switch.
  window.DanhLearners={current,storage,open:()=>show(store.list().length?'list':'create'),manage:()=>show(current?'manage':store.list().length?'list':'create'),endSession:()=>{if(session){session.removeItem(SESSION);session.removeItem('danh-learner-guest-session-v1');}window.name=JSON.stringify({danhTab:tab});location.reload();}};
  function storageError(reason) { errorMessage=reason==='quota' ? 'Máy chưa lưu được thay đổi mới. Em hãy tải bản sao lưu và giải phóng bộ nhớ.' : 'Hồ sơ đã thay đổi ở tab khác. Em hãy tải lại trang để tiếp tục.'; if (shadow) { const notice=shadow.getElementById('storage-warning');notice.textContent=errorMessage;notice.hidden=false; } }
  function select(id) {
    const p=store.get(id); if(!p) {show('list');return;}
    const value={id,tab,at:Date.now()};
    try { if(session) session.setItem(SESSION,JSON.stringify(value)); else window.name=JSON.stringify({...C.parse(window.name,{}),danhTab:tab,learnerSession:value}); store.remember(id); }
    catch { storageError('quota');return; }
    // Reload initializes every learning module with the newly selected learner.
    location.reload();
  }
  function el(tag, text, cls) { const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e; }
  function button(text, fn, cls='') { const b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b; }
  function info(text) { panel.append(el('p',text,'muted')); }
  function heading(text, icon='🌟') { panel.append(el('div',icon,'mascot'),el('h1',text)); }
  function hide() { if(mustReload || (current && !store.get(current.id)))return; overlay.hidden=true; document.body.style.overflow=''; [...document.body.children].filter(e=>e!==host).forEach(e=>{if(e.dataset.learnerInert==='1'){e.inert=false;delete e.dataset.learnerInert;}});returnFocus?.focus(); }
  function show(mode='list') {
    if (!shadow) return;
    if(mustReload && mode!=='list')mode='conflict';
    returnFocus=shadow.activeElement || document.activeElement;panel.replaceChildren();overlay.hidden=false;document.body.style.overflow='hidden';
    [...document.body.children].filter(e=>e!==host && !['SCRIPT','STYLE','LINK'].includes(e.tagName)).forEach(e=>{if(!e.inert){e.inert=true;e.dataset.learnerInert='1';}});
    if (!mustReload && (!current || store.get(current.id)) && mode!=='conflict') panel.append(button('Đóng ✕',hide,'close'));
    if (mode==='create' || mode==='edit') {
      const editing=mode==='edit', p=editing?store.get(current.id):null;
      heading(editing?'Hồ sơ của '+p.name:'Chào em! Mình làm quen nhé 🌱',p?.avatar || '🌟');
      info(editing?'Đổi tên vẫn giữ nguyên lộ trình đã học.':'Chỉ cần tên là em có thể vào học ngay.');
      const form=el('form'); const label=el('label','Tên của em');label.htmlFor='learner-name';
      const input=el('input');input.id='learner-name';input.name='learnerName';input.placeholder='Ví dụ: Minh, Hoa, Nam';input.autocomplete='nickname';input.maxLength=80;input.required=true;input.value=p?.name||'';
      form.append(label,input,el('p','Chọn một bạn đồng hành','muted'));
      let avatar=p?.avatar || C.avatars[store.list().length % C.avatars.length];
      const choices=el('div',undefined,'avatars');choices.role='group';choices.setAttribute('aria-label','Bạn đồng hành');
      C.avatars.forEach(a=>{const b=button(a,()=>{avatar=a;[...choices.children].forEach(x=>x.setAttribute('aria-pressed',String(x.textContent===a)));});b.setAttribute('aria-label','Chọn '+a);b.setAttribute('aria-pressed',String(a===avatar));choices.append(b);});form.append(choices);
      const legacy=!editing && !store.list().length && Object.keys(store.legacy()).length>0;
      let checkbox;
      if(legacy){const l=el('label',undefined,'check');checkbox=el('input');checkbox.type='checkbox';checkbox.checked=true;l.append(checkbox,el('span','Giữ lộ trình đã học trên máy này cho tên này.'));form.append(l);}
      const error=el('p',undefined,'error');error.role='alert';form.append(error);
      const submit=el('button',editing?'Lưu thay đổi':'Vào học ngay','primary');submit.type='submit';form.append(submit);
      form.addEventListener('submit',e=>{e.preventDefault();try{if(editing){store.rename(p.id,input.value,avatar);location.reload();}else{const created=store.create(input.value,avatar,!!checkbox?.checked);select(created.id);}}catch(err){error.textContent=err.name==='QuotaExceededError'?'Máy chưa đủ chỗ lưu hồ sơ. Em thử giải phóng bộ nhớ nhé.':err.message||'Chưa lưu được hồ sơ. Em thử lại nhé.';}});
      panel.append(form);if(store.list().length)panel.append(button('← Chọn tên có sẵn',()=>show('list'),'wide'));
      setTimeout(()=>input.focus(),0);
    } else if(mode==='manage' && current) {
      const p=store.get(current.id);if(!p){show('list');return;}
      heading(p.name+' và hành trình học',p.avatar);
      const route=C.parse(storage.getItem('danh:learner-route:v1'));
      if(route?.path && safePath(route.path)) {info('Gần đây: '+route.title);const a=el('a','Tiếp tục bài gần đây →','primary link');a.href=new URL(route.path,location.origin).href;panel.append(a);}
      info('Lộ trình, phần cần ôn và lựa chọn hiệu ứng được lưu riêng cho em.');
      panel.append(button('✏️ Đổi tên / bạn đồng hành',()=>show('edit'),'wide'),button('📥 Tải bản sao lưu',download,'wide'),button('📂 Khôi phục từ bản sao lưu',importFile,'wide'),button('👋 Kết thúc phiên học',window.DanhLearners.endSession,'wide'),button('Xóa hồ sơ này',()=>show('delete'),'danger wide'));
    } else if(mode==='delete' && current) {
      heading('Xóa hồ sơ '+current.name+'?',current.avatar);info('Lộ trình của tên này sẽ bị xóa trên trình duyệt này. Các tên khác vẫn được giữ. Em có thể tải bản sao lưu trước.');
      panel.append(button('Tải bản sao lưu',download,'wide'),button('Giữ lại hồ sơ',()=>show('manage'),'primary'),button('Xác nhận xóa hồ sơ',()=>{store.remove(current.id);window.DanhLearners.endSession();},'danger wide'));
    } else if(mode==='conflict') {
      mustReload=true;
      heading('Mình cập nhật lộ trình nhé','🌱');info(errorMessage || 'Lộ trình đang được cập nhật ở một tab khác. Tải lại để tiếp tục với kết quả mới nhất.');panel.append(button('Tải lại để tiếp tục',()=>location.reload(),'primary'));
    } else {
      heading(current?'Chọn người học':'Đăng nhập','🌈');info('Chọn hồ sơ để tiếp tục lộ trình đã lưu trên trình duyệt này.');
      if(!current && storage.length)info('Lượt học thử trong tab này không tự nhập vào hồ sơ đã chọn.');
      const list=el('div',undefined,'profiles'),profiles=store.list();profiles.forEach((p,i)=>{const b=button('',()=>select(p.id),'profile');b.append(el('span',p.avatar,'avatar'),el('strong',p.name));if(p.id===current?.id)b.append(el('small','Đang học'));else if(profiles.some(other=>other.id!==p.id && other.name===p.name && other.avatar===p.avatar))b.append(el('small','Hồ sơ #'+(i+1)));list.append(b);});panel.append(list,button('+ Thêm người học',()=>show('create'),'primary'),button('Khôi phục từ bản sao lưu',importFile,'wide'));
    }
    info(local?'Hồ sơ được lưu trên trình duyệt này, chưa đồng bộ sang thiết bị khác.':'Trình duyệt đang chặn lưu lâu dài. Hãy tải bản sao lưu trước khi đóng phiên.');
    if(mode!=='create' && mode!=='edit')setTimeout(()=>panel.querySelector('button')?.focus(),0);
  }
  function safePath(path) {try{const u=new URL(path,location.origin);return u.origin===location.origin && /\.html$/.test(u.pathname) && !u.pathname.includes('..');}catch{return false;}}
  function download() {
    try {const blob=new Blob([JSON.stringify(store.backup(current.id),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob), a=el('a');a.href=url;a.download='danh-ho-so-'+current.id+'.json';shadow.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(err){storageError('quota');}
  }
  function importFile() {
    const input=el('input');input.type='file';input.accept='.json,application/json';input.hidden=true;panel.append(input);
    input.onchange=async()=>{try{const file=input.files?.[0];if(!file)return;if(file.size>5000000)throw Error('Tệp sao lưu quá lớn.');const p=store.restore(await file.text());select(p.id);}catch(err){const e=el('p',err.message,'error');e.role='alert';panel.append(e);}finally{input.remove();}};input.click();
  }
  function mount() {
    host=el('danh-learner');shadow=host.attachShadow({mode:'open'});
    const css=el('link');css.rel='stylesheet';css.href=new URL('shared/learner-profile.css',base).href;shadow.append(css);
    const bar=el('div',undefined,'bar');bar.append(el('span',current?current.avatar+' '+current.name:'🌱 Học thử','bar-name'));
    if(current)bar.append(button('Đổi người học',()=>show('list')),button('Hồ sơ',()=>show('manage')));
    else bar.append(button('Đăng nhập',window.DanhLearners.open,'primary login'));
    const notice=el('p',local?'': 'Trình duyệt chặn lưu lâu dài. Tiến độ chỉ giữ trong phiên này.','warning');notice.id='storage-warning';notice.role='status';notice.hidden=!!local;shadow.append(bar,notice);
    overlay=el('div',undefined,'overlay');overlay.hidden=true;panel=el('section',undefined,'sheet');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Hồ sơ người học');overlay.append(panel);shadow.append(overlay);document.body.prepend(host);
    shadow.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape'){e.preventDefault();hide();}if(e.key==='Tab'){const items=[...panel.querySelectorAll('button,input,a[href]')].filter(x=>!x.hidden && !x.disabled);const first=items[0],last=items.at(-1),active=shadow.activeElement;if(e.shiftKey && active===first){e.preventDefault();last?.focus();}else if(!e.shiftKey && active===last){e.preventDefault();first?.focus();}}});
    if(current && /(practice|lesson|unit\d|grammar|flashcard|\/topics\/|bodyparts|animals|food|clothes|numbers|phonetic)/i.test(location.pathname) && !/-index\.html$/.test(location.pathname) && !/\/grammar\.html$/.test(location.pathname)) {
      storage.setItem('danh:learner-route:v1',JSON.stringify({path:location.pathname+location.search,title:document.title.split('|')[0].trim(),at:Date.now()}));
    }
  }
  window.addEventListener('storage',e=>{
    if(!current)return;
    if(e.key===C.INFO+current.id && !store.get(current.id)){storage.lock();errorMessage='Hồ sơ này đã được xóa ở tab khác. Em hãy chọn người học để tiếp tục.';show('list');}
    else if(e.key?.startsWith(storage.prefix) && e.key!==storage.prefix+'danh:learner-route:v1') {
      const key=e.key.slice(storage.prefix.length);
      if(storage.read.has(key) && storage.writer(key)!==tab && storage.read.get(key)!==e.newValue){storage.lock();show('conflict');}
    }
  });
  document.addEventListener('DOMContentLoaded',mount,{once:true});
})();
