/* Shared presentation only: original game buttons, forms and round state stay in place. */
(() => {
 'use strict';if(window.DanhGameLayout)return;
 const root=new URL('../',document.currentScript.src),css=document.createElement('link');css.rel='stylesheet';css.href=new URL('shared/game-layout.css?v=game-layout-20261101',root).href;document.head.append(css);
 const menus=new Map();let pending=false,tabArrow=false;
 const visible=n=>n?.getClientRects().length>0&&!n.closest('[hidden],.tab-content:not(.active)');
 const make=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 function addMenu(content,kind){
  if(!content||menus.has(content))return;
  const bar=make('div','gl-game-bar'),back=make('button','gl-back','← Bài học'),details=make('details','gl-game-menu'),summary=make('summary','gl-game-summary','Đổi game');back.type='button';summary.setAttribute('aria-label','Đổi trò chơi');details.append(summary);content.before(bar);bar.append(back,details);details.append(content);
  const menu={content,kind,bar,back,details,summary,compact:null};menus.set(content,menu);
  back.addEventListener('click',()=>{const target=kind==='primary'?document.querySelector('.g2-main-nav .nav-btn:not([data-game-nav])'):document.querySelector('.g6-tab[data-tab="vocabulary"]');target?.click();sync();const heading=document.querySelector(kind==='primary'?'body>header h1,body>h1':'.g6-lesson-hero');heading?.scrollIntoView({block:'start'});target?.focus({preventScroll:true});});
 }
 function sync(){
  pending=false;
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
