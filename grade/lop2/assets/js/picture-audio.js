(function(){
 'use strict';
 const enabled=()=>window.DanhLetterLadder?.enabled===true;
 function make(word,{topic='',html,conceal=true}={}){
  const button=document.createElement('button');button.type='button';button.className='word-picture';button.dataset.wordAudio=word.id;button.setAttribute('aria-label',`Phát âm: ${word.meaning}`);
  const existing=[...document.querySelectorAll('#vocab-grid-container [data-word-audio]')].find(n=>n.dataset.wordAudio===word.id);
  const source=html??existing?.innerHTML??window.DanhPencil?.picture(topic,word.name)??word.photo??word.visual??word.svg;
  if(typeof source==='string'&&/^\s*</.test(source))button.innerHTML=source;
  else if(word.image){const img=document.createElement('img');img.src=word.image;img.alt='';button.append(img);}
  else{const span=document.createElement('span');span.textContent=source&&!/[a-z]/i.test(source)?source:word.meaning;button.append(span);}
  button.querySelectorAll('script,foreignObject').forEach(n=>n.remove());if(conceal)button.querySelectorAll('svg text').forEach(n=>n.remove());
  // Tranh sao chép từ thẻ đã gắn nghe không được mang vùng nghe con vào nút mới.
  button.querySelectorAll('[data-danh-picture-listen]').forEach(n=>{for(const attr of ['data-danh-picture-listen','role','tabindex','aria-label'])n.removeAttribute(attr);n.setAttribute('aria-hidden','true');});
  button.querySelectorAll('img').forEach(n=>{n.alt='';n.draggable=false;});button.querySelectorAll('svg').forEach(n=>n.setAttribute('aria-hidden','true'));
  button.onclick=event=>{event.stopPropagation();window.DanhAnswerSpeech.listen(word.name);};return button;
 }
 function wire(grid,words){
  if(!grid||!enabled())return;grid.classList.add('picture-word-grid');
  const names=new Map(words.map(w=>[w.name.toLowerCase().trim().replace(/\s+/g,' '),w]));
  const sync=()=>{[...grid.children].forEach((card,i)=>{const title=card.querySelector('.word-title,h3')?.textContent.toLowerCase().trim().replace(/\s+/g,' '),word=title?names.get(title):words[i];if(!word)return;card.classList.add('picture-word-card');
   const old=[...card.children].find(n=>n.matches('[role=img],.g2-vocab-image,.real-obj-wrapper,.number-badge-wrapper,.emoji-display,.image-badge-wrapper')||n.querySelector('svg,img'))||card.firstElementChild;
   if(!old)return;if(!old.matches('[data-word-audio]')||old.dataset.wordAudio!==word.id)old.replaceWith(make(word,{html:old.innerHTML,conceal:false}));
   card.querySelectorAll('button:not([data-word-audio])').forEach(n=>{if(/[🔊🔉🔈]/u.test(n.textContent)||n.matches('.audio-btn,.g2-audio'))n.remove();});
  });};sync();new MutationObserver(sync).observe(grid,{childList:true,subtree:true});
 }
 window.DanhPictureAudio={make,wire,enabled};
})();
