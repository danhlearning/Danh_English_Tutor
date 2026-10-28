(function () {
  'use strict';
  if (window.DanhLearners) return;
  // Chỉ gắn thao tác nghe; giữ nguyên DOM con và kích thước tranh.
  const pictureSelector='[data-danh-picture-listen]';
  const cardSelector='[data-danh-card-listen]';
  const cardEffects=new Map();
  const scannedCards=new WeakMap();
  let cardObserver;
  const nearbyCards=new Set();
  const warmNearbyCards=()=>window.DanhAnswerSpeech?.prepare([...nearbyCards].filter(card=>card.isConnected && !card.closest('[hidden],.tab-content:not(.active)')).map(card=>({card,rect:card.getBoundingClientRect()})).filter(({rect})=>rect.bottom>0).sort((a,b)=>(a.rect.top>=innerHeight)-(b.rect.top>=innerHeight)).slice(0,8).map(({card})=>card.dataset.danhCardListen));
  window.DanhVocabularyCards={warm:warmNearbyCards};
  const cardCleanup=card=>{const effect=cardEffects.get(card);if(!effect)return;clearTimeout(effect.timer);effect.animation?.cancel();card.classList.remove('danh-card-pressed');cardEffects.delete(card);};
  const cardFeedback=card=>{
    cardCleanup(card);card.classList.add('danh-card-pressed');
    let motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(window.DanhLearningEffects)motion=motion&&!window.DanhLearningEffects.reduced();
    else try{motion=motion&&JSON.parse(window.DanhLearners.storage.getItem('danh-vocabulary-effects-v1')||'{}').motion!==false;}catch{}
    const effect={};cardEffects.set(card,effect);
    if(motion&&card.animate)effect.animation=card.animate([{transform:'scale(1)'},{transform:'scale(.985)'},{transform:'scale(1)'}],{duration:220,easing:'ease-out'});
    effect.timer=setTimeout(()=>cardCleanup(card),320);
    document.dispatchEvent(new CustomEvent('danh-vocabulary-card-tap',{detail:{term:card.dataset.danhCardListen,motion}}));
  };
  const cardStop=()=>{for(const card of [...cardEffects.keys()])cardCleanup(card);};
  window.addEventListener('pagehide',cardStop);document.addEventListener('visibilitychange',()=>{if(document.hidden)cardStop();});
  const pictureBind=(node,text,label)=>{
    if(!node || node.matches('.word-picture,[data-word-audio]') || node.closest('button,a'))return node;
    node.dataset.danhPictureListen=String(text||'').trim();
    node.setAttribute('role','button');node.tabIndex=0;node.removeAttribute('aria-hidden');
    node.setAttribute('aria-label',`Phát âm: ${label||text}`);node.style.cursor='pointer';
    return node;
  };
  const flipSurface=(action,className='')=>{
    const node=document.createElement('div');node.className=className;node.tabIndex=0;
    node.setAttribute('role','group');node.setAttribute('aria-roledescription','Thẻ lật');node.dataset.danhFlipSurface='';
    node.addEventListener('click',action);
    node.addEventListener('keydown',event=>{if(event.target===node && ['Enter',' '].includes(event.key)){event.preventDefault();if(!event.repeat)node.click();}});
    return node;
  };
  const pictureScan=root=>{
    const selector='#vocab-grid .g6-word-card,#vocab-grid-container > *,#word-list .word-card';
    const cards=[...root.querySelectorAll(selector)];if(root.matches?.(selector))cards.unshift(root);
    for(const card of cards){
      const cardTitle=card.querySelector('.word-title,h3');
      // Game feedback and unrelated DOM changes must not rewrite every label,
      // style and tabindex on an already prepared vocabulary card.
      const titleText=cardTitle?.textContent.trim(),previous=scannedCards.get(card);
      if(previous && previous.text===titleText && previous.title===cardTitle && previous.picture===card.querySelector('.word-picture,[data-word-audio],[data-danh-picture-listen]') && card.dataset.danhCardListen===titleText)continue;
      if(cardTitle?.textContent.trim()){
        card.dataset.danhCardListen=cardTitle.textContent.trim();card.tabIndex=0;card.setAttribute('role','group');card.setAttribute('aria-roledescription','Thẻ nghe từ');card.setAttribute('aria-label',`Nghe từ: ${cardTitle.textContent.trim()}`);card.style.cursor='pointer';
        card.querySelectorAll('[data-danh-picture-listen],.word-picture').forEach(n=>n.tabIndex=-1);
        cardObserver?.observe(card);
        if(nearbyCards.has(card))warmNearbyCards();
      }
      if(card.querySelector('.word-picture,[data-word-audio]')){scannedCards.set(card,{text:titleText,title:cardTitle,picture:card.querySelector('.word-picture,[data-word-audio]')});continue;}
      const title=card.querySelector('.word-title,h3');
      const picture=card.querySelector('.g6-word-visual,.g4-visual,.g2-vocab-image,.word-image,.real-obj-wrapper,.number-badge-wrapper,.emoji-display,.image-badge-wrapper,[role="img"]') || [...card.children].find(n=>n.querySelector('svg,img'));
      if(!title || !picture || !title.textContent.trim())continue;
      pictureBind(picture,title.textContent,card.querySelector('.g6-meaning')?.textContent||title.textContent);
      if(card.matches(cardSelector))picture.tabIndex=-1;
      if(!picture.matches(pictureSelector))continue;
      for(const button of card.querySelectorAll('button'))if(button.matches('.g6-sound,.g2-audio,.audio-btn,[data-danh-listen]') || /[🔊🔉🔈]/u.test(button.textContent)){
        button.style.visibility='hidden';button.style.pointerEvents='none';button.tabIndex=-1;button.setAttribute('aria-hidden','true');
      }
      scannedCards.set(card,{text:titleText,title:cardTitle,picture});
    }
  };
  const picturePlay=event=>{
    const card=event.target.closest?.(cardSelector);
    if(card){
      if(event.type==='keydown'&&(!['Enter',' '].includes(event.key)||(event.target!==card&&!event.target.matches('.word-picture,[data-word-audio],[data-danh-picture-listen]'))))return;
      if(event.target.closest('a,input,select,textarea,button:not(.word-picture):not([data-word-audio])'))return;
      event.preventDefault();event.stopImmediatePropagation();
      if(!event.repeat){cardFeedback(card);window.DanhAnswerSpeech.listen(card.dataset.danhCardListen);}return;
    }
    const picture=event.target.closest?.(pictureSelector);if(!picture)return;
    if(picture.closest('.word-picture,[data-word-audio]'))return;
    if(event.type==='keydown' && (event.target!==picture || !['Enter',' '].includes(event.key)))return;
    event.preventDefault();event.stopImmediatePropagation();
    if(!event.repeat)window.DanhAnswerSpeech.listen(picture.dataset.danhPictureListen);
  };
  document.addEventListener('click',picturePlay,true);document.addEventListener('keydown',picturePlay,true);
  window.DanhPictureListen={bind:pictureBind,flipSurface,scan:pictureScan};
  document.addEventListener('DOMContentLoaded',()=>{
    if(window.IntersectionObserver)cardObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)nearbyCards.add(entry.target);else {nearbyCards.delete(entry.target);if(!entry.target.isConnected)cardObserver.unobserve(entry.target);}}warmNearbyCards();},{rootMargin:'0px 0px 240px 0px'});
    else {let timer;const warm=()=>{clearTimeout(timer);timer=setTimeout(()=>{nearbyCards.clear();for(const card of document.querySelectorAll(cardSelector)){const rect=card.getBoundingClientRect();if(rect.width && rect.bottom>0 && rect.top<innerHeight+240)nearbyCards.add(card);}warmNearbyCards();},80);};window.addEventListener('scroll',warm,{passive:true});warm();}
    const style=document.createElement('style');style.textContent='[data-danh-card-listen]:focus-visible,[data-danh-picture-listen]:focus-visible,[data-danh-flip-surface]:focus-visible{outline:3px solid #176d8a;outline-offset:3px}.danh-card-pressed{outline:3px solid #d79c37!important;outline-offset:-3px}';document.head.append(style);
    pictureScan(document);
    new MutationObserver(records=>{
      const roots=new Set();
      for(const record of records){
        const target=record.target.nodeType===1?record.target:record.target.parentElement;
        const card=target?.closest('#vocab-grid .g6-word-card,#vocab-grid-container > *,#word-list .word-card');if(card)roots.add(card);
        for(const node of record.addedNodes)if(node.nodeType===1 && !node.matches('script,style,.vg-spark,.danh-exercise-gap'))roots.add(node);
      }
      for(const root of roots){if(!root.isConnected)continue;let parent=root.parentElement,nested=false;while(parent){if(roots.has(parent)){nested=true;break;}parent=parent.parentElement;}if(!nested)pictureScan(root);}
    }).observe(document.body,{childList:true,characterData:true,subtree:true});
  },{once:true});
  const C = window.DanhLearnerCore;
  const base = new URL('../', document.currentScript.src);
  const tablet=document.createElement('script');tablet.src=new URL('shared/tablet-game.js?v=animals-pencil-20261029',base).href;tablet.async=false;document.head.append(tablet);
  const controls=document.createElement('script');controls.src=new URL('shared/learner-controls.js?v=repo-picture-listen-20261025',base).href;controls.async=false;document.head.append(controls);
  const font=document.createElement('link');font.rel='stylesheet';font.href=new URL('shared/learner-font.css?v=compact-gaps-20261025',base).href;document.head.append(font);
  const gaps=document.createElement('script');gaps.src=new URL('shared/exercise-gaps.js?v=compact-gaps-20261025',base).href;gaps.async=false;document.head.append(gaps);
  // Giọng đọc đáp án dùng chung, chỉ được gọi từ thao tác học đã chấm đúng.
  const answerSpeechEnabled=()=>window.DanhLearningEffects?.soundEnabled?.() ?? window.DanhGrammarExperience?.settings.sound ?? true;
  const cleanAnswerSpeech=s=>String(s||'').replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
  const answerAudioKey=s=>{let hash=2166136261;for(const c of cleanAnswerSpeech(s).toLowerCase())hash=Math.imul(hash^c.charCodeAt(0),16777619);return(hash>>>0).toString(16).padStart(8,'0');};
  // Prepare only the current task and the next two in its already chosen order.
  const gameAudio = new Map(), gameImages = new Map(), mediaQueue = [], preparedWindows = new Map();
  const mediaControllers = new Set();
  const connection = navigator.connection;
  let mediaBytes = 0, mediaBusy = 0, mediaTimer, mediaClosed = false;
  const gamePlaying = () => [...document.querySelectorAll('[data-danh-game-surface],.tab-content.active[id^="game-"]')]
    .some(node => !node.closest('[hidden]') && node.getClientRects().length > 0);
  const mediaAllowed = () => !mediaClosed && !document.hidden && navigator.onLine !== false && !connection?.saveData && !/^(slow-2g|2g)$/.test(connection?.effectiveType || '');
  const surfaceVisible = surface => !surface || surface.isConnected!==false && !surface.closest('[hidden]') && !surface.closest('.tab-content:not(.active)');
  const mediaPanelObserver = typeof MutationObserver==='undefined' ? null : new MutationObserver(()=>resumeGameMedia());
  const audioURL = text => new URL(`shared/answer-audio/${answerAudioKey(text)}.mp3`,base).href;
  const grade2Speech = /\/grade\/lop2\//.test(document.baseURI);
  function preparePlayer(entry){if(!entry.url || entry.player)return;const player=new Audio(entry.url);player.preload='auto';entry.player=player;player.load();}
  function releasePlayer(entry){if(!entry.player)return;entry.player.pause();entry.player.removeAttribute('src');entry.player.load();entry.player=null;}
  function queueAudio(text,player=false){
    const clean=cleanAnswerSpeech(text);if(!clean || !answerSpeechEnabled())return;
    const key=answerAudioKey(clean),existing=gameAudio.get(key);
    if(existing){if(player){existing.preloadPlayer=true;preparePlayer(existing);}gameAudio.delete(key);gameAudio.set(key,existing);return;}
    if(mediaQueue.length>=9)return;
    const entry={kind:'audio',key,src:audioURL(clean),preloadPlayer:player};gameAudio.set(key,entry);mediaQueue.push(entry);trimGameAudio();
  }
  const localMedia = value => {try {const url=new URL(value,document.baseURI);return url.origin===base.origin && url.pathname.startsWith(base.pathname) && /^https?:$/.test(url.protocol) && /\.(?:webp|png|jpe?g|svg|avif)$/i.test(url.pathname) ? url.href : null;}catch{return null;}};
  function trimGameAudio() {
    for (const [key, entry] of gameAudio) {
      if (gameAudio.size <= 12 && mediaBytes <= 2 * 1024 * 1024) break;
      if (!entry.url || entry.url === answerAudio?.src) continue;
      releasePlayer(entry);URL.revokeObjectURL(entry.url);mediaBytes-=entry.bytes;gameAudio.delete(key);
    }
  }
  function pumpGameMedia() {
    if (!mediaAllowed()) return;
    while (mediaBusy < 2 && mediaQueue.length) {
      const entry=mediaQueue.shift();
      if (entry.kind === 'audio' && !answerSpeechEnabled()) {gameAudio.delete(entry.key);continue;}
      mediaBusy++;
      const controller=new AbortController();mediaControllers.add(controller);
      const timer=setTimeout(()=>controller.abort(),5000);
      (async()=>{
        try {
          const response=await fetch(entry.src,{signal:controller.signal,credentials:'same-origin',priority:entry.preloadPlayer?'high':'low',cache:'default',redirect:'error'});
          if(!response.ok || Number(response.headers.get('content-length'))>1024*1024) {await response.body?.cancel();throw Error('media');}
          const reader=response.body?.getReader();if(!reader)throw Error('body');
          const chunks=[];let bytes=0;
          while(true){const part=await reader.read();if(part.done)break;bytes+=part.value.byteLength;if(bytes>1024*1024){await reader.cancel();throw Error('size');}chunks.push(part.value);}
          if(controller.signal.aborted || !mediaAllowed())throw Error('paused');
          entry.url=URL.createObjectURL(new Blob(chunks,{type:response.headers.get('content-type')||'audio/mpeg'}));entry.bytes=bytes;mediaBytes+=bytes;if(entry.preloadPlayer)preparePlayer(entry);trimGameAudio();
        } catch {if(gameAudio.get(entry.key)===entry)gameAudio.delete(entry.key);}
        finally {clearTimeout(timer);mediaControllers.delete(controller);mediaBusy--;pumpGameMedia();}
      })();
    }
  }
  function prepareGameMedia(items, surface) {
    if(surface)surface.dataset.danhGameSurface='';
    const panel=surface?.closest('.tab-content,[role="tabpanel"],.g6-panel');
    if(panel)mediaPanelObserver?.observe(panel,{attributes:true,attributeFilter:['hidden','class']});
    if(surface && surface!==panel)mediaPanelObserver?.observe(surface,{attributes:true,attributeFilter:['hidden']});
    const hiddenParent=surface?.closest('[hidden]');
    if(hiddenParent && hiddenParent!==panel && hiddenParent!==surface)mediaPanelObserver?.observe(hiddenParent,{attributes:true,attributeFilter:['hidden']});
    const upcoming=(items || []).filter(Boolean).slice(0,3);
    preparedWindows.set(surface || null,upcoming);
    if(preparedWindows.size>8)preparedWindows.delete(preparedWindows.keys().next().value);
    if(!mediaAllowed() || !surfaceVisible(surface))return;
    for(const item of upcoming){
      const text=cleanAnswerSpeech(typeof item==='string'?item:item.text || item.name || item.term || '');
      queueAudio(text);
      const sources=[item.image,...String(item.visual || item.photo || '').matchAll(/(?:href|src)=["']([^"']+)["']/g)].map(v=>typeof v==='string'?v:v?.[1]).filter(Boolean);
      for(const value of sources.slice(0,2)){
        const src=localMedia(value);if(!src || gameImages.has(src))continue;
        const image=new Image();image.decoding='async';image.fetchPriority='low';gameImages.set(src,image);image.src=src;image.decode?.().catch(()=>{if(gameImages.get(src)===image)gameImages.delete(src);});
        if(gameImages.size>6){const oldest=gameImages.keys().next().value,previous=gameImages.get(oldest);gameImages.delete(oldest);if(!previous.complete)previous.src='';}
      }
    }
    clearTimeout(mediaTimer);mediaTimer=setTimeout(pumpGameMedia,0);
  }
  const pauseGameMedia = () => {clearTimeout(mediaTimer);for(const c of mediaControllers)c.abort();mediaQueue.length=0;for(const [key,e] of gameAudio)if(!e.url)gameAudio.delete(key);for(const [src,image] of gameImages)if(!image.complete){image.src='';gameImages.delete(src);}};
  const resumeGameMedia = () => {if(!mediaAllowed())return;for(const [surface,items] of preparedWindows){if(surface?.isConnected===false){preparedWindows.delete(surface);continue;}if(surfaceVisible(surface))prepareGameMedia(items,surface);}};
  // Only observe game panels: button feedback and animation classes elsewhere
  // must not schedule another media preparation pass.
  window.DanhGameFlow={prepare:prepareGameMedia,isPlaying:gamePlaying,speechRate:.95,audioRate:1.15,
    get stats(){return {ready:[...gameAudio.values()].filter(e=>e.url).length,pending:mediaQueue.length,active:mediaBusy,bytes:mediaBytes,images:gameImages.size};}};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseGameMedia();else {resumeGameMedia();window.DanhVocabularyCards?.warm();}});
  window.addEventListener('offline',pauseGameMedia);
  window.addEventListener('online',()=>{resumeGameMedia();window.DanhVocabularyCards?.warm();});
  document.addEventListener('danh-learning-effects-change',()=>{if(!answerSpeechEnabled())pauseGameMedia();else {resumeGameMedia();window.DanhVocabularyCards?.warm();}});
  connection?.addEventListener?.('change',()=>{if(!mediaAllowed())pauseGameMedia();else {resumeGameMedia();window.DanhVocabularyCards?.warm();}});
  window.addEventListener('pagehide',()=>{mediaClosed=true;pauseGameMedia();for(const e of gameAudio.values())if(e.url){releasePlayer(e);URL.revokeObjectURL(e.url);}gameAudio.clear();gameImages.clear();mediaBytes=0;});
  window.addEventListener('pageshow',()=>{mediaClosed=false;resumeGameMedia();window.DanhVocabularyCards?.warm();});
  document.documentElement.dataset.answerSpeechVersion='audio-1';
  const answerSpeechState=(state,mode,text)=>{document.documentElement.dataset.answerSpeechState=state;document.documentElement.dataset.answerSpeechMode=mode;document.documentElement.dataset.answerSpeechText=text;document.dispatchEvent(new CustomEvent('danh-answer-speech',{detail:{state,mode,text}}));};
  let finishAnswerSpeech,answerAudio,answerSpeechToken=0;
  const stopAnswerSpeech=()=>{answerSpeechToken++;if(answerAudio){answerAudio.onended=answerAudio.onplaying=answerAudio.onerror=null;answerAudio.pause();if([...gameAudio.values()].some(entry=>entry.player===answerAudio)){try{answerAudio.currentTime=0;}catch{}}else {answerAudio.removeAttribute('src');answerAudio.load();}answerAudio=null;}finishAnswerSpeech?.();try{window.speechSynthesis?.cancel();}catch{}};
  const playAnswerAudio=text=>{
    const cached=gameAudio.get(answerAudioKey(text));
    const audio=cached?.player || new Audio(cached?.url || audioURL(text));answerAudio=audio;
    try{audio.currentTime=0;}catch{}
    audio.playbackRate=gamePlaying()?window.DanhGameFlow.audioRate:(grade2Speech ? .85 : window.DanhYoungSpeech?.audioRate || 1);
    audio.preservesPitch=true;
    return new Promise(resolve=>{
      let finished=false;
      const done=(success=true)=>{if(finished)return;finished=true;clearTimeout(timeout);if(finishAnswerSpeech===done)finishAnswerSpeech=null;if(answerAudio===audio)answerAudio=null;resolve(success);};
      const timeout=setTimeout(done,Math.max(20000,text.length*180+4000));finishAnswerSpeech=done;
      audio.onended=()=>{answerSpeechState('ended','audio',text);done();};
      audio.onplaying=()=>{if(!finished)answerSpeechState('playing','audio',text);};
      const failed=()=>{if(finished)return;document.dispatchEvent(new CustomEvent('danh-answer-speech',{detail:{state:'error',mode:'audio',text}}));done(false);};
      audio.onerror=failed;audio.play().catch(failed);
    });
  };
  window.DanhAnswerSpeech={
    prepare(texts){if(!mediaAllowed())return;for(const text of (texts || []).slice(0,8))queueAudio(text,true);clearTimeout(mediaTimer);mediaTimer=setTimeout(pumpGameMedia,0);},
    listen(text){return this.say(text,{manual:true});},
    say(text,{manual=window.DanhListenControls?.isManualRequest() || false,preferSpeech=false}={}){
      if((!manual&&!answerSpeechEnabled())||document.hidden)return false;
      const clean=cleanAnswerSpeech(text);
      if(!clean)return false;
      try{
        stopAnswerSpeech();
        const speechToken=answerSpeechToken;
        if((manual||grade2Speech||gamePlaying()||navigator.onLine===false)&&!preferSpeech){
          try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch{}
          return playAnswerAudio(clean).then(played=>played || (speechToken===answerSpeechToken && !document.hidden && this.say(clean,{manual,preferSpeech:true})));
        }
        const voices=window.speechSynthesis?.getVoices?.()||[];
        if(!window.speechSynthesis||!window.SpeechSynthesisUtterance||!voices.some(v=>/^en(?:[-_]|$)/i.test(v.lang)))return preferSpeech?false:playAnswerAudio(clean);
        const utterance=new window.SpeechSynthesisUtterance(clean);utterance.lang='en-GB';utterance.rate=gamePlaying()?window.DanhGameFlow.speechRate:.82;
        utterance.voice=voices.find(v=>/^en[-_]GB$/i.test(v.lang))||voices.find(v=>/^en\b/i.test(v.lang))||null;
        window.DanhYoungSpeech?.configure(utterance);
        return new Promise(resolve=>{
          let finished=false;
          const done=()=>{if(finished)return;finished=true;clearTimeout(timeout);if(finishAnswerSpeech===done)finishAnswerSpeech=null;resolve(true);};
          const timeout=setTimeout(done,Math.max(20000,clean.length*180+4000));
          finishAnswerSpeech=done;
          utterance.onstart=()=>answerSpeechState('playing','speech',clean);
          const fallback=()=>{if(finished)return;if(speechToken!==answerSpeechToken||(!manual&&!answerSpeechEnabled())||document.hidden){done();return;}clearTimeout(timeout);playAnswerAudio(clean).then(done);};
          utterance.onend=()=>{answerSpeechState('ended','speech',clean);done();};utterance.onerror=event=>{if(['canceled','interrupted'].includes(event.error))done();else fallback();};
          try{window.speechSynthesis.speak(utterance);}catch{fallback();}
        });
      }catch{return false;}
    },
    textForQuestion(question){
      const answer=String(question.answer??question.answers?.[0]??'').split('|')[0];
      // Ngữ điệu/nhịp và nhãn âm cần nghe câu tiếng Anh mẫu, không đọc nhãn tiếng Việt.
      const example=String(question.prompt||'').match(/[“"]([^”"]+)[”"]/)?.[1];
      return /[\u00c0-\u1ef9↗↘→]/.test(answer)||/^\/[^/]+\/$/.test(answer)?example:answer;
    },
    question(question){
      return this.say(this.textForQuestion(question));
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
  let host, shadow, overlay, panel, returnFocus, bodyOverflow='', errorMessage='', mustReload=false;
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
  function hide() { if(mustReload || (current && !store.get(current.id)))return; overlay.hidden=true; document.body.style.overflow=bodyOverflow; [...document.body.children].filter(e=>e!==host).forEach(e=>{if(e.dataset.learnerInert==='1'){e.inert=false;delete e.dataset.learnerInert;}});if(returnFocus?.isConnected)returnFocus.focus(); }
  function show(mode='list') {
    if (!shadow) return;
    if(mustReload && mode!=='list')mode='conflict';
    if(overlay.hidden){returnFocus=shadow.activeElement || document.activeElement;bodyOverflow=document.body.style.overflow;}
    panel.replaceChildren();overlay.hidden=false;document.body.style.overflow='hidden';
    [...document.body.children].filter(e=>e!==host && !['SCRIPT','STYLE','LINK'].includes(e.tagName)).forEach(e=>{if(!e.inert){e.inert=true;e.dataset.learnerInert='1';}});
    if (!mustReload && (!current || store.get(current.id)) && mode!=='conflict') panel.append(button('Đóng ✕',hide,'close'));
    if (mode==='create' || mode==='edit') {
      const editing=mode==='edit', p=editing?store.get(current.id):null;
      heading(editing?'Hồ sơ của '+p.name:'Lưu dữ liệu học',p?.avatar || '🌱');
      if(!editing)info('Đặt tên để giữ và tiếp tục dữ liệu học trên trình duyệt này.');
      if(editing)info('Đổi tên vẫn giữ nguyên lộ trình đã học.');
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
      input.focus();
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
      heading(current?'Chọn người học':'Lưu dữ liệu học','🌱');
      const list=el('div',undefined,'profiles'),profiles=store.list();profiles.forEach((p,i)=>{const b=button('',()=>select(p.id),'profile');b.append(el('span',p.avatar,'avatar'),el('strong',p.name));if(p.id===current?.id)b.append(el('small','Đang học'));else if(profiles.some(other=>other.id!==p.id && other.name===p.name && other.avatar===p.avatar))b.append(el('small','Hồ sơ #'+(i+1)));list.append(b);});panel.append(list,button('+ Thêm người học',()=>show('create'),'primary'),button('Khôi phục từ bản sao lưu',importFile,'wide'));
    }
    if(!local || mode==='manage')info(local?'Hồ sơ được lưu trên trình duyệt này, chưa đồng bộ sang thiết bị khác.':'Trình duyệt đang chặn lưu lâu dài. Hãy tải bản sao lưu trước khi đóng phiên.');
    if(mode!=='create' && mode!=='edit')panel.querySelector('button')?.focus();
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
    const css=el('link');css.rel='stylesheet';css.href=new URL('shared/learner-profile.css?v=save-chip-20261025',base).href;shadow.append(css);
    const bar=el('div',undefined,current?'bar':'bar is-guest');
    if(current)bar.append(el('span',current.avatar+' '+current.name,'bar-name'));
    if(current)bar.append(button('Đổi người học',()=>show('list')),button('Hồ sơ',()=>show('manage')));
    else bar.append(button('Lưu dữ liệu học',window.DanhLearners.open,'primary login'));
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
