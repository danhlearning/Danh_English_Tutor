/* One fixed tablet play frame. Game DOM, scoring and storage remain in place. */
(() => {
 'use strict';
 if(window.DanhTabletGame)return;
 const root=new URL('../',document.currentScript.src);
 const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL('shared/tablet-game.css?v=ipados-layout-20261028',root).href;document.head.append(sheet);
 const tablet=()=>navigator.maxTouchPoints>0 && Math.min(screen.width||innerWidth,innerWidth)>=600 && innerWidth>=600;
 const selectors='.tab-content.active[id^="game-"],#play:not([hidden]),#practice:not([hidden]),[data-danh-game-surface]';
 let panel,input,saved,bar,keyboard,backdrop,scheduled=false,suppressed=null,caps=false,symbols=false,moreSymbols=false,keyboardDismissed=false;
 const originals=new Map();
 const visible=node=>node?.isConnected && !node.closest('[hidden],.tab-content:not(.active)') && node.getClientRects().length>0;
 const textInput=node=>node?.matches('textarea,input:not([type]),input[type=text],input[type=search],input[type=number],input[type=tel],input[type=url],input[type=email]');
 function configure(node){if(!originals.has(node))originals.set(node,{inputmode:node.getAttribute('inputmode'),policy:node.getAttribute('virtualkeyboardpolicy')});node.setAttribute('inputmode','none');node.setAttribute('virtualkeyboardpolicy','manual');}
 function restoreInputs(){for(const [node,attrs]of originals){for(const [key,value]of [['inputmode',attrs.inputmode],['virtualkeyboardpolicy',attrs.policy]]){if(value===null)node.removeAttribute(key);else node.setAttribute(key,value);}}originals.clear();}
 function findPanel(){
  for(const surface of document.querySelectorAll(selectors)){
   if(!visible(surface))continue;
   const target=surface.closest('#play,#practice,.tab-content,.g6-panel,#app')||surface;
   if(target.id==='app'&&!target.querySelector('[data-danh-game-surface]'))continue;
   return target;
  }
  return null;
 }
 const element=(tag,text,className)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(className)n.className=className;return n;};
 function makeButton(text,action,label){const b=element('button',text);b.type='button';if(label)b.setAttribute('aria-label',label);b.addEventListener('click',action);return b;}
 function viewport(){const v=window.visualViewport;document.documentElement.style.setProperty('--tg-height',`${v?.height||innerHeight}px`);document.documentElement.style.setProperty('--tg-top',`${v?.offsetTop||0}px`);}
 function leave(){
  if(!panel)return;const old=panel;close();suppressed=old;
  const exit=old.querySelector('#back,#exit-play,#leave-practice,#leave,#leave-letters,[data-action="leave"]')||document.querySelector('[data-tab="vocabulary"],.g2-main-nav .nav-btn:not([data-game-nav])');
  if(exit && !exit.disabled)exit.click();
 }
 function mount(){
  backdrop=element('div',null,'tg-backdrop');backdrop.setAttribute('aria-hidden','true');
  bar=element('nav',null,'tg-bar');bar.setAttribute('aria-label','Khung chơi');
  bar.append(makeButton('← Chọn hoạt động',leave));
  const title=element('strong','Cùng luyện tiếng Anh','tg-title');bar.append(title);
  const show=makeButton('Hiện bàn phím',()=>{keyboardDismissed=false;schedule();});show.className='tg-show-keyboard';show.hidden=true;bar.append(show);
  const expand=makeButton('Xem đầy đủ',()=>{const reading=panel.classList.toggle('tg-reading');if(!reading)panel.scrollTop=0;expand.textContent=reading?'Về khung chơi':'Xem đầy đủ';});expand.className='tg-expand';expand.hidden=true;bar.append(expand);
  keyboard=element('section',null,'tg-keyboard');keyboard.setAttribute('aria-label','Bàn phím tiếng Anh');keyboard.hidden=true;
  keyboard.addEventListener('pointerdown',event=>{if(event.target.closest('button'))event.preventDefault();});
  document.body.append(backdrop,bar,keyboard);buildKeys();
 }
 function buildKeys(){
  if(!keyboard)return;keyboard.replaceChildren();
  const rows=symbols?(moreSymbols?['[]{}#%^*+=',"_\\|~<>€£¥",'.,?!;:"']:['1234567890',"@#$&*()'\"",'.,?!;:-']):['qwertyuiop','asdfghjkl','zxcvbnm'];
  const alternate=['1234567890',"@#$&*()'\"",'%_+=/;:'];
  const key=(char,row,index)=>{
   const value=caps&&!symbols?char.toUpperCase():char,b=makeButton('',()=>type(caps&&!symbols?char.toUpperCase():char),`Gõ ${value}`);b.dataset.key=char;
   b.append(element('span',value,'tg-key-primary'));
   if(!symbols){const hint=element('small',alternate[row][index],'tg-key-alt');hint.setAttribute('aria-hidden','true');b.append(hint);}
   return b;
  };
  const special=(text,action,name,label)=>{const b=makeButton(text,action,label);b.dataset.action=name;b.className='tg-key-special';return b;};
  const shift=()=>{const b=special(symbols?(moreSymbols?'123':'#+='):'⇧',()=>{if(symbols)moreSymbols=!moreSymbols;else caps=!caps;buildKeys();},'shift',symbols?'Thêm ký hiệu':'Chữ hoa');b.setAttribute('aria-pressed',String(symbols?moreSymbols:caps));return b;};
  rows.forEach((letters,index)=>{
   const row=element('div',null,`tg-key-row tg-key-row-${index+1}`);
   if(index===1){const spacer=element('span',null,'tg-key-spacer');spacer.setAttribute('aria-hidden','true');row.append(spacer);}
   if(index===2)row.append(shift());
   [...letters].forEach((char,i)=>row.append(key(char,index,i)));
   if(index===0)row.append(special('⌫',()=>type(null),'delete','Xóa chữ'));
   if(index===1){const enter=special('Kiểm tra',submit,'submit','Kiểm tra · Return');enter.append(element('span','↵','tg-return-symbol'));row.append(enter);}
   if(index===2){if(!symbols){row.append(key(',',2,7),key('.',2,8));}row.append(shift());}
   keyboard.append(row);
  });
  const actions=element('div',null,'tg-key-row tg-key-actions');
  const mode=()=>special(symbols?'ABC':'.?123',()=>{symbols=!symbols;moreSymbols=false;buildKeys();},'symbols','Chữ số và dấu');
  const space=makeButton('space',()=>type(' '),'Khoảng trắng');space.dataset.action='space';
  const hide=special('⌨⌄',()=>{keyboardDismissed=true;schedule();},'hide','Ẩn bàn phím');
  actions.append(mode(),space,mode(),hide);keyboard.append(actions);updateKeys();
 }
 function updateKeys(){if(!keyboard)return;const disabled=!input||input.disabled||input.readOnly;for(const b of keyboard.querySelectorAll('button'))if(b.disabled!==disabled)b.disabled=disabled;}
 function type(text){
  if(!input || input.disabled || input.readOnly || !visible(input))return;
  const field=input;field.focus({preventScroll:true});const start=field.selectionStart??field.value.length,end=field.selectionEnd??start;
  let from=start,to=end,value=text;
  if(text===null){if(from===to)from=Math.max(0,from-1);value='';}
  const next=field.value.slice(0,from)+value+field.value.slice(to);
  if(field.maxLength>=0 && next.length>field.maxLength)return;
  const event=new InputEvent('beforeinput',{bubbles:true,cancelable:true,inputType:text===null?'deleteContentBackward':'insertText',data:value});
  if(!field.dispatchEvent(event))return;
  try{field.setRangeText(value,from,to,'end');}catch{field.value=next;}
  field.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:text===null?'deleteContentBackward':'insertText',data:value}));
 }
 function submit(){
  if(!input||input.disabled||input.readOnly)return;
  const form=input.form;
  const button=(form && [...form.querySelectorAll('button[type=submit],input[type=submit]')].find(b=>visible(b)&&!b.disabled))||[...panel.querySelectorAll('button')].find(b=>visible(b)&&!b.disabled&&(/^(?:Kiểm tra|Chấm|Check)(?:\s|$)/i.test(b.textContent.trim())||b.matches('#check,#check-btn,#sentence-check')));
  if(button)button.click();
  else if(form)form.requestSubmit();
  else {input.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true,cancelable:true}));}
 }
 function close(){
  if(!panel)return;
  panel.classList.remove('tg-panel','tg-reading');panel.scrollTop=0;panel=null;input=null;restoreInputs();
  backdrop?.remove();bar?.remove();keyboard?.remove();bar=keyboard=backdrop=null;
  document.body.classList.remove('tg-playing','tg-typing');
  for(const [key,value]of Object.entries(saved.style))document.body.style[key]=value;
  document.documentElement.style.overflow=saved.htmlOverflow;window.scrollTo(saved.x,saved.y);saved=null;
 }
 function sync(){
  scheduled=false;
  const next=tablet()?findPanel():null;
  if(next!==suppressed)suppressed=null;
  if(!next || next===suppressed){close();return;}
  if(next!==panel){
   close();panel=next;saved={x:scrollX,y:scrollY,htmlOverflow:document.documentElement.style.overflow,style:{}};
   for(const key of ['position','top','left','width','overflow','overscrollBehavior'])saved.style[key]=document.body.style[key];
   Object.assign(document.body.style,{position:'fixed',top:`-${saved.y}px`,left:'0',width:'100%',overflow:'hidden',overscrollBehavior:'none'});document.documentElement.style.overflow='hidden';document.body.classList.add('tg-playing');panel.classList.add('tg-panel');mount();
  }
  viewport();
  for(const node of panel.querySelectorAll('input,textarea'))if(textInput(node))configure(node);
  const candidates=[...panel.querySelectorAll('input,textarea')].filter(node=>textInput(node)&&visible(node)&&!node.disabled&&!node.readOnly);
  const nextInput=candidates.includes(document.activeElement)?document.activeElement:candidates[0]||null;
  if(input!==nextInput)keyboardDismissed=false;
  input=nextInput;
  if(input && input.type==='number'&&!symbols){symbols=true;buildKeys();}
  const typing=!!input&&!keyboardDismissed;
  keyboard.hidden=!typing;document.body.classList.toggle('tg-typing',typing);bar.querySelector('.tg-show-keyboard').hidden=!input||!keyboardDismissed;updateKeys();
  requestAnimationFrame(()=>{if(!panel||!bar)return;const expand=bar.querySelector('.tg-expand');const overflow=panel.classList.contains('tg-reading')||panel.scrollHeight>panel.clientHeight+4||[...panel.querySelectorAll('.item-display-box,#spelling-preview')].some(node=>node.clientHeight>0&&node.scrollHeight>node.clientHeight+4);if(expand.hidden===overflow)expand.hidden=!overflow;});
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(sync);}}
 document.addEventListener('focusin',event=>{if(tablet()&&textInput(event.target)&&event.target.closest('.tab-content,[data-danh-game-surface],#play,#practice,#app'))configure(event.target);schedule();});
 document.addEventListener('pointerdown',event=>{if(panel&&textInput(event.target)&&panel.contains(event.target)){keyboardDismissed=false;schedule();}},{passive:true});
 document.addEventListener('touchmove',event=>{if(panel && event.touches.length===1 && !event.target.closest('.tg-reading,dialog,[role=dialog]') && !textInput(event.target))event.preventDefault();},{passive:false});
 window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);window.visualViewport?.addEventListener('scroll',viewport);
 window.addEventListener('pagehide',close);
 const start=()=>{new MutationObserver(records=>{if(records.some(r=>!r.target.closest?.('.tg-keyboard,.tg-bar')))schedule();}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class','disabled','readonly']});schedule();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 window.DanhTabletGame={refresh:schedule,get active(){return !!panel;}};
})();
