/* Adapters for the existing Unit/review banks; assessed game progress stays separate. */
(function(root){
 'use strict';
 const normal=s=>String(s||'').normalize('NFC').trim().replace(/\s+/g,' ');
 const hash=text=>{let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16).padStart(8,'0');};
 function normalize(words){
  const bank=new Map();
  for(const raw of words||[]){
   const name=normal(raw.name||raw.term),meaning=normal(raw.meaning);
   if(!name||!meaning||!/[a-z]/i.test(name))continue;
   const key=JSON.stringify([name.toLowerCase(),meaning.toLowerCase()]);
   if(bank.has(key))continue;
   const id='w-'+hash(key)+'-'+hash('\u0001'+key);
   bank.set(key,{id,name,meaning,ipa:raw.ipa||'',image:raw.image,visual:raw.visual||raw.svg||'<span aria-hidden="true" style="font-size:38px">✏️</span>',example:raw.example});
  }
  return [...bank.values()];
 }
 function fingerprint(words){let h=2166136261;for(const c of words.map(w=>w.id).sort().join('\n'))h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16).padStart(8,'0');}
 const api={normalize,fingerprint};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 if(typeof document==='undefined')return;
 const mounted=new WeakMap(),entries=new WeakMap();
 const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
 function mount({stage,words,grade=0,scope='bank'}){
  const bank=normalize(words),identity=`site-${scope}-${fingerprint(bank)}`;
  const prior=mounted.get(stage);if(prior?.identity===identity&&prior.grade===grade)return prior;
  const selected=bank.map(w=>w.id);
  const instance=root.DanhLetterLadder.mount({topic:identity,words:bank,grade,storage:root.DanhLearners.storage,selected:()=>selected,effects:root.DanhLearningEffects,allowStandalone:false,
   goSpelling:()=>render(),rerender:()=>render()});
  const render=()=>{if(!bank.length){stage.textContent='Bộ này chưa có từ để ghép. Em chọn bộ khác nhé.';return;}instance.render(stage,instance.game.state.active?.phase===4);};
  const result={identity,grade,render,game:instance.game};mounted.set(stage,result);stage.dataset.letterStorage=instance.game.key;return result;
 }
 function bind(config){
  const button=document.querySelector('[data-tab="letters"]');if(!config.stage||!button)return;
  const game=mount(config);button.addEventListener('click',()=>{root.DanhAnswerSpeech.stop();game.render();});
  if(!config.stage.closest('[hidden]')&&config.stage.getClientRects().length)game.render();
 }
 function addEntry({anchor,...config}){
  if(!anchor)return;
  const old=entries.get(anchor);if(old){old.panel.hidden=false;old.wrapper.remove();}
  const panel=anchor,wrapper=make('section',null,'g6-panel site-letter-entry'),open=make('button','Ghép chữ','g6-primary'),body=make('div'),back=make('button','Quay lại','g6-secondary'),stage=make('div');
  open.type=back.type='button';body.hidden=true;body.append(back,stage);wrapper.append(open,body);panel.before(wrapper);
  open.onclick=()=>{config.beforeOpen?.();root.DanhAnswerSpeech.stop();const game=mount({...config,words:typeof config.words==='function'?config.words():config.words,stage});panel.hidden=true;body.hidden=false;open.hidden=true;game.render();stage.scrollIntoView({block:'start'});};
  back.onclick=()=>{root.DanhAnswerSpeech.stop();body.hidden=true;panel.hidden=false;open.hidden=false;config.afterBack?.();open.focus();};
  entries.set(anchor,{panel,wrapper});
 }
 Object.assign(api,{mount,bind,addEntry});root.DanhSiteLetters=api;
})(typeof window==='undefined'?globalThis:window);
