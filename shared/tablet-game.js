/* One fixed tablet play frame. Game DOM, scoring and storage remain in place. */
(() => {
 'use strict';
 if(window.DanhTabletGame)return;
 const root=new URL('../',document.currentScript.src);
 const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href=new URL('shared/tablet-game.css?v=game-layout-20261101',root).href;document.head.append(sheet);
 // Use the physical screen's short edge: phones remain phones when rotated,
 // while an iPad keeps its game frame in Split View and Stage Manager.
 const tablet=()=>navigator.maxTouchPoints>0 && Math.min(screen.width||innerWidth,screen.height||innerHeight)>=600 && innerWidth>=320;
 const selectors='.tab-content.active[id^="game-"],#play:not([hidden]),#practice:not([hidden]),#letter-review:not([hidden]),[data-danh-game-surface]';
 let panel,input,saved,bar,keyboard,backdrop,gameDialog,scheduled=false,suppressed=null,caps=false,symbols=false,moreSymbols=false,keyboardDismissed=false,keyboardRequested=false;
 const originals=new Map();
 const visible=node=>node?.isConnected && !node.closest('[hidden],.tab-content:not(.active)') && node.getClientRects().length>0;
 const textInput=node=>node?.matches('textarea,input:not([type]),input[type=text],input[type=search],input[type=number],input[type=tel],input[type=url],input[type=email]');
 function configure(node){if(!originals.has(node))originals.set(node,{inputmode:node.getAttribute('inputmode'),policy:node.getAttribute('virtualkeyboardpolicy')});node.setAttribute('inputmode','none');node.setAttribute('virtualkeyboardpolicy','manual');}
 function restoreInputs(){for(const [node,attrs]of originals){for(const [key,value]of [['inputmode',attrs.inputmode],['virtualkeyboardpolicy',attrs.policy]]){if(value===null)node.removeAttribute(key);else node.setAttribute(key,value);}}originals.clear();}
 function findPanel(){
  for(const surface of document.querySelectorAll(selectors)){
   if(!visible(surface))continue;
   const target=surface.closest('#play,#practice,#letter-review,.tab-content,.g6-panel,#app')||surface;
   if(target.id==='app'&&!target.querySelector('[data-danh-game-surface]'))continue;
   return target;
  }
  return null;
 }
 const element=(tag,text,className)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(className)n.className=className;return n;};
 function makeButton(text,action,label){const b=element('button',text);b.type='button';if(label)b.setAttribute('aria-label',label);b.addEventListener('click',action);return b;}
 function viewport(){
  const v=window.visualViewport,height=v?.height||innerHeight;
  document.documentElement.style.setProperty('--tg-height',`${height}px`);document.documentElement.style.setProperty('--tg-top',`${v?.offsetTop||0}px`);
  const roomy=innerWidth>=700&&height>=600;
  document.body.classList.toggle('tg-roomy',!!panel&&roomy);
  const compact=roomy&&innerWidth<=1100&&height<=1100;
  document.body.classList.toggle('tg-compact',!!panel&&compact);
  const large=roomy&&innerWidth>=1000&&height>=800&&Math.max(innerWidth,height)>=1200;
  document.body.classList.toggle('tg-large',!!panel&&large);
  document.documentElement.style.setProperty('--tg-keyboard-size',`${large?(height>innerWidth?336:296):compact?(height<=800?248:288):roomy?(height>=700?Math.round(Math.max(296,Math.min(392,height*.34))):264):224}px`);
 }
 function leave(){
  if(!panel)return;const old=panel;close();suppressed=old;
  const exit=old.querySelector('#back,#exit-play,#leave-practice,#leave,#leave-letters,[data-action="leave"],[data-action="learn"]')||document.querySelector('[data-tab="vocabulary"],.g2-main-nav .nav-btn:not([data-game-nav])');
  if(exit && !exit.disabled)exit.click();
 }
 function gameChoices(){
  const primary=[...document.querySelectorAll('.g2-game-choice[data-game]')];
  const tabs=primary.length?primary:[...document.querySelectorAll('.g6-tab[data-tab]')].filter(n=>['flashcards','letters','quiz','spelling'].includes(n.dataset.tab));
  return tabs.map(node=>({node,id:node.dataset.game||node.dataset.tab,label:node.textContent.trim()}));
 }
 function gameStyle(id){
  if(/flip|flashcards/.test(id))return {icon:'🃏',detail:'Lật tranh và ôn nghĩa của từ.',tone:'peach'};
  if(/letter/.test(id))return {icon:'🧩',detail:'Chọn chữ để hoàn thành từ.',tone:'green'};
  if(/spelling/.test(id))return {icon:'✏️',detail:'Gõ từ tiếng Anh em nhớ.',tone:'blue'};
  if(/count/.test(id))return {icon:'📝',detail:'Điền từ và viết câu ngắn.',tone:'pink'};
  return {icon:'🎯',detail:'Nghe hoặc đọc rồi chọn đáp án.',tone:'yellow'};
 }
 function addNavigation(){
  const links=element('div',null,'tg-nav-links');links.setAttribute('role','group');links.setAttribute('aria-label','Điều hướng bài học');
  const requested=Number(new URLSearchParams(location.search).get('fromGrade'));
  const grade=[Number(document.body.dataset.grade),requested,Number(location.pathname.match(/\/grade\/lop(\d+)\//)?.[1]),Number(document.getElementById('grade-filter')?.value)].find(n=>Number.isInteger(n)&&n>=1&&n<=12);
  const targets=[['🏠','Trang chủ','index.html']];
  if(Number.isInteger(grade)&&grade>=1&&grade<=12)targets.push(['📚',`Lớp ${grade}`,`grade/lop${grade}/lop${grade}.html`],['🌈','Ôn tập',`grade/lop${grade}/${grade<=5?'review':'vocabulary-review'}.html`]);
  else targets.push(['📚','Kỹ năng','skills.html']);
  for(const [icon,label,path]of targets){const link=element('a',null,'tg-nav-link');link.href=new URL(path,root).href;link.setAttribute('aria-label',label);const symbol=element('span',icon,'tg-nav-icon');symbol.setAttribute('aria-hidden','true');link.append(symbol,element('span',label,'tg-nav-text'));links.append(link);}
  bar.append(links);
 }
 function addGamePicker(){
  const choices=gameChoices(),current=choices.find(choice=>choice.id===panel.id);
  const picker=makeButton('',()=>{
   if(!choices.length){leave();return;}
   gameDialog.replaceChildren();
   const heading=element('div',null,'tg-game-dialog-head'),title=element('h2','Em muốn chơi game nào?');title.id='tg-game-title';
   const dismiss=makeButton('Đóng ✕',()=>gameDialog.close(),'Đóng bảng chọn game');dismiss.className='tg-game-close';heading.append(title,dismiss);
   const grid=element('div',null,'tg-game-grid');
   for(const choice of choices){
    const info=gameStyle(choice.id==='game-flip'&&/ghép/i.test(choice.label)?'letters':choice.id),selected=choice.id===panel.id;
    const card=makeButton('',()=>{if(!card.isConnected||!gameDialog?.open)return;gameDialog.close();if(selected)return;window.DanhAnswerSpeech?.stop();choice.node.click();schedule();},choice.label);
    card.className='tg-game-card';card.dataset.game=choice.id;card.dataset.tone=info.tone;
    if(selected)card.setAttribute('aria-current','true');
    const icon=element('span',info.icon,'tg-game-icon');icon.setAttribute('aria-hidden','true');
    const copy=element('span',null,'tg-game-copy'),detail=element('small',info.detail);detail.id=`tg-game-detail-${choice.id}`;card.setAttribute('aria-describedby',detail.id);copy.append(element('strong',choice.label),detail);
    card.append(icon,copy);if(selected)card.append(element('span','Đang chơi','tg-game-current'));grid.append(card);
   }
   gameDialog.append(heading,grid);picker.setAttribute('aria-expanded','true');gameDialog.showModal();
  },'Chọn trò chơi');
  picker.className='tg-game-picker';if(choices.length){picker.setAttribute('aria-haspopup','dialog');picker.setAttribute('aria-expanded','false');}
  const currentName=(panel.id==='letter-review'?'Ôn tổng hợp · Ghép chữ':null)||current?.label||document.getElementById('round-label')?.textContent.trim()||document.getElementById('question-label')?.textContent.trim()||'Chọn hoạt động';
  const icon=element('span','🎮','tg-picker-icon');icon.setAttribute('aria-hidden','true');const text=element('span',null,'tg-picker-copy');text.append(element('small','Chọn game'),element('strong',currentName));
  const arrow=element('span','⌄','tg-picker-arrow');arrow.setAttribute('aria-hidden','true');picker.append(icon,text,arrow);bar.append(picker);
  gameDialog=element('dialog',null,'tg-game-dialog');gameDialog.setAttribute('aria-labelledby','tg-game-title');
  gameDialog.addEventListener('close',event=>{const open=event.currentTarget.open;picker.setAttribute('aria-expanded',String(open));if(!open&&picker.isConnected)picker.focus({preventScroll:true});});
  gameDialog.addEventListener('click',event=>{if(event.target!==gameDialog)return;const r=gameDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)gameDialog.close();});
 }
 function mount(){
  backdrop=element('div',null,'tg-backdrop');backdrop.setAttribute('aria-hidden','true');
  bar=element('nav',null,'tg-bar');bar.setAttribute('aria-label','Khung chơi');
  const back=makeButton('← Hoạt động',leave,'Quay về chọn hoạt động');back.className='tg-back';bar.append(back);addNavigation();addGamePicker();
  const tools=element('div',null,'tg-tools');tools.hidden=true;bar.append(tools);
  const show=makeButton('Hiện bàn phím',()=>{keyboardDismissed=false;keyboardRequested=true;schedule();});show.className='tg-show-keyboard';show.hidden=true;tools.append(show);
  const expand=makeButton('Xem đầy đủ',()=>{const reading=panel.classList.toggle('tg-reading');if(!reading)panel.scrollTop=0;expand.textContent=reading?'Về khung chơi':'Xem đầy đủ';});expand.className='tg-expand';expand.hidden=true;tools.append(expand);
  keyboard=element('section',null,'tg-keyboard');keyboard.setAttribute('aria-label','Bàn phím tiếng Anh');keyboard.hidden=true;
  keyboard.addEventListener('pointerdown',event=>{if(event.target.closest('button'))event.preventDefault();});
  document.body.append(backdrop,bar,keyboard,gameDialog);buildKeys();
  frameObserver?.observe(bar);frameObserver?.observe(keyboard);frameObserver?.observe(panel);
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
 function updateKeys(){if(!keyboard)return;const disabled=!input||input.disabled||input.readOnly;for(const b of keyboard.querySelectorAll('button')){const locked=b.dataset.action==='hide'?false:disabled;if(b.disabled!==locked)b.disabled=locked;}}
 function updateTools(){const tools=bar?.querySelector('.tg-tools');if(tools)tools.hidden=[...tools.children].every(node=>node.hidden);}
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
  frameObserver?.disconnect();panel.classList.remove('tg-panel','tg-reading','tg-word-input');panel.scrollTop=0;panel=null;input=null;keyboardRequested=false;restoreInputs();
  if(gameDialog?.open)gameDialog.close();gameDialog?.remove();gameDialog=null;
  backdrop?.remove();bar?.remove();keyboard?.remove();bar=keyboard=backdrop=null;
  document.body.classList.remove('tg-playing','tg-typing','tg-roomy','tg-compact','tg-large');
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
  panel.classList.toggle('tg-word-input',!!panel.querySelector('#word-answer'));
  for(const node of panel.querySelectorAll('input,textarea'))if(textInput(node))configure(node);
  const candidates=[...panel.querySelectorAll('input,textarea')].filter(node=>textInput(node)&&visible(node)&&!node.readOnly&&(!node.disabled||node.closest('[data-letter-auto="waiting"]')));
  const nextInput=candidates.includes(document.activeElement)?document.activeElement:candidates[0]||null;
  if(input!==nextInput){keyboardDismissed=false;keyboardRequested=false;}
  input=nextInput;
  if(input && input.type==='number'&&!symbols){symbols=true;buildKeys();}
  const shortViewport=(window.visualViewport?.height||innerHeight)<520;
  const typing=!!input&&!keyboardDismissed&&(!shortViewport||keyboardRequested);
  keyboard.hidden=!typing;document.body.classList.toggle('tg-typing',typing);bar.querySelector('.tg-show-keyboard').hidden=!input||typing;updateKeys();updateTools();
  document.documentElement.style.setProperty('--tg-bar-height',`${bar.getBoundingClientRect().height}px`);
  document.documentElement.style.setProperty('--tg-keyboard-height',`${typing?keyboard.getBoundingClientRect().height:0}px`);
  const available=(window.visualViewport?.height||innerHeight)-bar.getBoundingClientRect().height-(typing?keyboard.getBoundingClientRect().height:0);
  document.documentElement.style.setProperty('--tg-scale',String(Math.max(1,Math.min(1.5,available/400))));
  requestAnimationFrame(()=>{if(!panel||!bar)return;const expand=bar.querySelector('.tg-expand');const overflow=panel.classList.contains('tg-reading')||panel.scrollHeight>panel.clientHeight+4||[...panel.querySelectorAll('.item-display-box,#spelling-preview')].some(node=>node.clientHeight>0&&node.scrollHeight>node.clientHeight+4);if(expand.hidden===overflow)expand.hidden=!overflow;updateTools();});
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(sync);}}
 const frameObserver=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
 document.addEventListener('focusin',event=>{if(tablet()&&textInput(event.target)&&(panel||findPanel())?.contains(event.target))configure(event.target);schedule();});
 document.addEventListener('pointerdown',event=>{if(panel&&textInput(event.target)&&panel.contains(event.target)){keyboardDismissed=false;schedule();}},{passive:true});
 document.addEventListener('touchmove',event=>{if(panel && event.touches.length===1 && !event.target.closest('.tg-panel,dialog,[role=dialog]') && !textInput(event.target))event.preventDefault();},{passive:false});
 window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);window.visualViewport?.addEventListener('scroll',viewport);
 window.addEventListener('pagehide',close);
 document.fonts?.ready.then(schedule);
 const start=()=>{new MutationObserver(records=>{if(records.some(r=>!r.target.closest?.('.tg-keyboard,.tg-bar')))schedule();}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class','disabled','readonly','data-letter-auto']});schedule();};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 window.DanhTabletGame={refresh:schedule,get active(){return !!panel;}};
})();
