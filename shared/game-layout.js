/* Shared presentation only: original game buttons, forms and round state stay in place. */
(() => {
 'use strict';if(window.DanhGameLayout)return;
 const root=new URL('../',document.currentScript.src),css=document.createElement('link');css.rel='stylesheet';css.href=new URL('shared/game-layout.css?v=ipad-orientation-20261101',root).href;document.head.append(css);
 const menus=new Map();let pending=false,tabArrow=false;
 const visible=n=>n?.getClientRects().length>0&&!n.closest('[hidden],.tab-content:not(.active)');
 const make=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 const tablet=()=>navigator.maxTouchPoints>0&&Math.min(screen.width||innerWidth,screen.height||innerHeight)>=600&&innerWidth>=320;
 const pagers=new Map(),pictures=new Map();
 function vocabulary(enabled){
  for(const [grid,state]of pagers)if(!grid.isConnected){state.nav.remove();pagers.delete(grid);}
  const grids=new Set(document.querySelectorAll('#vocab-grid-container,#vocab-grid,#word-list.word-grid,#app .word-grid'));
  for(const grid of grids){
   let state=pagers.get(grid);if(!state){const nav=make('nav','gl-vocab-pager'),previous=make('button','','← Trước'),status=make('span','gl-vocab-position'),next=make('button','','Tiếp →');nav.setAttribute('aria-label','Duyệt thẻ từ vựng');previous.type=next.type='button';status.setAttribute('aria-live','polite');nav.append(previous,status,next);grid.after(nav);state={nav,previous,next,status,index:0,size:0,cards:[]};pagers.set(grid,state);for(const [button,delta]of [[previous,-1],[next,1]])button.addEventListener('click',()=>{window.DanhAnswerSpeech?.stop();state.index+=delta;drawVocabulary(grid,state,tablet());});}
   drawVocabulary(grid,state,enabled);
  }
 }
 function drawVocabulary(grid,state,enabled){
  const cards=[...grid.children].filter(n=>!n.matches('script,style,template,p,h2,h3')&&!n.hidden),size=innerWidth>innerHeight?3:2;
  if(!enabled){for(const card of grid.children)if(card.classList.contains('gl-card-page-hidden'))card.classList.remove('gl-card-page-hidden');if(grid.classList.contains('gl-vocab-grid'))grid.classList.remove('gl-vocab-grid');if(!state.nav.hidden)state.nav.hidden=true;return;}
  const focused=cards.indexOf(document.activeElement?.closest('.g2-vocab-card,.g6-word-card,.g4-word-card,.vocab-card,.word-card,[data-danh-card-listen]'));
  if(state.size&&state.size!==size)state.index=Math.floor((focused>=0?focused:state.index*state.size)/size);
  if(state.cards.length&&cards.some((card,i)=>state.cards[i]!==card))state.index=0;
  state.size=size;state.cards=cards;state.index=Math.max(0,Math.min(state.index,Math.ceil(cards.length/size)-1));
  if(!grid.classList.contains('gl-vocab-grid'))grid.classList.add('gl-vocab-grid');const columns=innerWidth<600?1:size;if(grid.style.getPropertyValue('--gl-card-columns')!==String(columns))grid.style.setProperty('--gl-card-columns',String(columns));
  const start=state.index*size,end=Math.min(cards.length,start+size);
  cards.forEach((card,i)=>card.classList.toggle('gl-card-page-hidden',i<start||i>=end));
  const text=cards.length?`Từ ${start+1}–${end} / ${cards.length}`:'Chưa có từ';if(state.status.textContent!==text)state.status.textContent=text;
  if(state.previous.disabled!==(start===0))state.previous.disabled=start===0;if(state.next.disabled!==(end===cards.length))state.next.disabled=end===cards.length;
  if(state.nav.hidden!==(cards.length<=size))state.nav.hidden=cards.length<=size;
 }
 function restorePicture(container,record){
  if(record.marker.isConnected&&record.image.isConnected)record.marker.replaceWith(record.image);else record.marker.remove();record.host.remove();container.classList.remove('gl-picture-stage');delete container.dataset.glPicture;pictures.delete(container);
 }
 function arrangePictures(enabled){
  for(const [container,record]of pictures)if(!enabled||!visible(container)||!record.marker.isConnected||!record.image.isConnected)restorePicture(container,record);
  if(!enabled)return;
  const definitions=[['.letter-ladder','.ll-prompt > .word-picture'],['.learning-stage:not(.letter-ladder)',':scope > .learning-question-visual'],['.g2-practice','#sentence-stage > .g2-practice-image'],['#spelling-stage',':scope > .word-picture,:scope > .word-image,:scope > .g6-flash-visual,:scope > [data-danh-picture-listen]'],['#quiz-stage',':scope > .word-picture,:scope > .word-image,:scope > .g6-flash-visual,:scope > [data-danh-picture-listen]'],['#stage:not(.letter-ladder)',':scope > .word-image'],['.g6-picture-flash',':scope > .word-picture'],['#app>.panel',':scope > .word-art,:scope > .emoji']];
  for(const [selector,imageSelector]of definitions)for(const container of document.querySelectorAll(selector)){
   if(!visible(container))continue;
   const image=[...container.querySelectorAll(imageSelector)].find(n=>!n.closest('.gl-task-picture'));
   if(!image)continue;
   const prior=pictures.get(container);if(prior)restorePicture(container,prior);
   const marker=document.createComment('game illustration position'),host=make('div','gl-task-picture');image.before(marker);
   const anchor=[...container.children].find(n=>!n.matches('.ll-warning,.ll-head,.ll-practice-note,.learning-progress,.g6-card-position,.vg-streak,.g2-practice-score,.vg-round-head,progress'));
   container.insertBefore(host,anchor||null);host.append(image);container.classList.add('gl-picture-stage');container.dataset.glPicture='true';pictures.set(container,{image,marker,host});
  }
 }

 function addMenu(content,kind){
  if(!content||menus.has(content))return;
  const bar=make('div','gl-game-bar'),back=make('button','gl-back','← Bài học'),details=make('details','gl-game-menu'),summary=make('summary','gl-game-summary','Đổi game');back.type='button';summary.setAttribute('aria-label','Đổi trò chơi');details.append(summary);content.before(bar);bar.append(back,details);details.append(content);
  const menu={content,kind,bar,back,details,summary,compact:null};menus.set(content,menu);
  back.addEventListener('click',()=>{const target=kind==='primary'?document.querySelector('.g2-main-nav .nav-btn:not([data-game-nav])'):document.querySelector('.g6-tab[data-tab="vocabulary"]');target?.click();sync();const heading=document.querySelector(kind==='primary'?'body>header h1,body>h1':'.g6-lesson-hero');heading?.scrollIntoView({block:'start'});target?.focus({preventScroll:true});});
 }
 function sync(){
  pending=false;
  const onTablet=tablet();document.body.classList.toggle('gl-tablet',onTablet);vocabulary(onTablet);arrangePictures(onTablet);
  addMenu(document.querySelector('.g2-game-choices'),'primary');addMenu(document.querySelector('.g6-tabs[role="tablist"]'),'secondary');
  const primary=document.querySelector('.tab-content.active[id^="game-"]'),secondary=[...document.querySelectorAll('.g6-panel:not([hidden])')].find(n=>['flashcards','letters','quiz','spelling'].includes(n.id));
  const active=!!primary||!!secondary||[...document.querySelectorAll('#play:not([hidden]),#practice:not([hidden])')].some(visible)||visible(document.querySelector('#quiz-stage [data-word-key]'));
  document.body.classList.toggle('gl-playing',active);document.body.classList.toggle('gl-primary-ready',[...menus.values()].some(m=>m.kind==='primary'));
  for(const menu of menus.values()){
   const playing=menu.kind==='primary'?!!primary:!!secondary,compact=innerWidth<=600&&playing&&!document.body.classList.contains('tg-playing');
   if(menu.compact!==compact){menu.compact=compact;menu.details.open=!compact||!!menu.keyboardOpen;}
   menu.bar.classList.toggle('gl-compact-menu',compact);if(menu.back.hidden===compact)menu.back.hidden=!compact;if(menu.summary.hidden===compact)menu.summary.hidden=!compact;
   const current=menu.kind==='primary'&&primary?menu.content.querySelector('[data-game="'+primary.id+'"]'):menu.content.querySelector('.active,[aria-pressed="true"],[aria-selected="true"]');const label='🎮 '+(current?.textContent.trim()||'Đổi game')+' ▾';if(menu.summary.textContent!==label)menu.summary.textContent=label;
  }
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(sync);}}
 document.addEventListener('keydown',event=>{if(event.target.closest('.g6-tabs')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){tabArrow=true;}},true);
 document.addEventListener('keyup',()=>{tabArrow=false;},true);
 document.addEventListener('pointerdown',()=>{tabArrow=false;},true);
 document.addEventListener('click',event=>{
  const choice=event.target.closest('.g2-game-choice,.g2-games-tab,.g6-tab');if(!choice)return;
  for(const menu of menus.values())if(menu.content.contains(choice))menu.keyboardOpen=tabArrow;
  if(tabArrow){schedule();return;}
  schedule();requestAnimationFrame(()=>{if(window.DanhTabletGame?.active)return;for(const menu of menus.values()){if(!menu.compact)continue;menu.details.open=false;menu.summary.focus({preventScroll:true});menu.bar.scrollIntoView({block:'start',behavior:'auto'});}});
 });
 const start=()=>{new MutationObserver(records=>{if(records.some(r=>!r.target.closest?.('.tg-keyboard,.tg-bar,.gl-game-summary')))schedule();}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','hidden','aria-selected','aria-pressed']});sync();};
 window.addEventListener('resize',schedule);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 window.DanhGameLayout={refresh:schedule};
})();
