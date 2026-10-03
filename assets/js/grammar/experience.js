(function () {
  'use strict';
  const KEY='danh-grammar-experience-v1',reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let settings={sound:true,motion:true},context=null,voices=[],muted=false;
  try{const saved=JSON.parse((window.DanhLearners?.storage || window.localStorage).getItem(KEY));if(saved){settings.sound=typeof saved.sound==='boolean'?saved.sound:true;settings.motion=typeof saved.motion==='boolean'?saved.motion:true;}}catch{}
  function save(){try{(window.DanhLearners?.storage || window.localStorage).setItem(KEY,JSON.stringify(settings));}catch{}}
  function moving(){return settings.motion&&!reduced.matches;}
  function controls(){
    document.body.dataset.motion=moving()?'on':'off';
    const sound=document.getElementById('sound-toggle'),motion=document.getElementById('motion-toggle');
    sound.textContent=settings.sound?'🔊 Âm thanh: bật':'🔇 Âm thanh: tắt';sound.setAttribute('aria-pressed',String(settings.sound));
    motion.textContent=moving()?'✨ Hiệu ứng: bật':'✨ Hiệu ứng: giảm';motion.setAttribute('aria-pressed',String(moving()));
    motion.disabled=reduced.matches;motion.title=reduced.matches?'Đang theo tùy chọn giảm chuyển động của thiết bị':'Bật hoặc giảm chuyển động';
    if(!moving()){document.querySelector('.celebration-layer')?.remove();document.querySelectorAll('.fx-enter,.fx-pop,.fx-correct,.fx-retry,.fx-finish').forEach(el=>el.classList.remove('fx-enter','fx-pop','fx-correct','fx-retry','fx-finish'));}
  }
  function unlock(){
    if(!settings.sound)return null;
    try{if(!context){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;context=new Audio();}if(context.state==='suspended')context.resume().catch(()=>{});return context;}catch{return null;}
  }
  const tunes={tap:[[660,0,.035]],start:[[523,0,.1],[659,.1,.1],[784,.2,.13]],next:[[587,0,.06],[740,.07,.07]],correct:[[659,0,.11],[784,.11,.12],[1047,.23,.19]],corrected:[[659,0,.13],[880,.14,.18]],retry:[[392,0,.11],[349,.13,.12]],hint:[[880,0,.09],[1175,.1,.13]],reveal:[[523,0,.09],[659,.11,.1]],finish:[[523,0,.13],[659,.14,.13],[784,.28,.13],[1047,.43,.3]]};
  tunes.skip=[[523,0,.07],[440,.08,.08]];
  function sound(name){
    if(!settings.sound||document.hidden||muted)return;
    const audio=unlock();if(!audio||audio.state!=='running')return;
    for(const[freq,delay,length]of tunes[name]||tunes.tap){
      try{const oscillator=audio.createOscillator(),gain=audio.createGain(),start=audio.currentTime+delay;
        oscillator.type='sine';oscillator.frequency.value=freq;gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.065,start+.008);gain.gain.exponentialRampToValueAtTime(.001,start+length);
        oscillator.connect(gain);gain.connect(audio.destination);oscillator.start(start);oscillator.stop(start+length+.02);voices.push({oscillator,gain});oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();voices=voices.filter(v=>v.oscillator!==oscillator);};
      }catch{}
    }
  }
  function stop(){for(const v of voices){try{v.gain.gain.value=0;v.oscillator.stop();}catch{}}voices=[];}
  function animate(element,name){if(!element||!moving())return;element.classList.remove(name);void element.offsetWidth;element.classList.add(name);element.addEventListener('animationend',()=>element.classList.remove(name),{once:true});}
  const messages={start:'Mình cùng luyện từng câu nhé! 🌱',next:'Sẵn sàng cho câu tiếp theo nào! ✨',correct:'Đúng rồi! Một ngôi sao dành cho em ⭐',corrected:'Em đã tự sửa được rồi, giỏi lắm! 🌷',retry:'Thử lại nhé, mình cùng tìm cách đúng 💛',hint:'Một gợi ý nhỏ để em tự tìm ra đáp án 💡',reveal:'Đọc cách dùng rồi thử lại ở lượt ôn nhé 📖'};
  messages.skip='Không sao, mình có thể ôn lại câu này sau 🌼';
  function buddy(name){const el=document.getElementById('learning-buddy');if(!el)return;el.dataset.mood=['correct','corrected'].includes(name)?'correct':name==='retry'?'retry':'neutral';document.getElementById('buddy-message').textContent=messages[name]||messages.start;animate(el.querySelector('img'),name==='retry'?'fx-retry':'fx-pop');}
  let celebrationTimer;
  function celebrate(){
    if(!moving())return;document.querySelector('.celebration-layer')?.remove();clearTimeout(celebrationTimer);
    const layer=document.createElement('div');layer.className='celebration-layer';layer.setAttribute('aria-hidden','true');
    const colors=['#B59ADD','#F2B7CC','#A4D6C9','#F6D887','#A7C9EF'];
    for(let i=0;i<26;i++){const piece=document.createElement('i');piece.className='celebration-piece';piece.style.cssText=`--x:${15+Math.random()*70}%;--color:${colors[i%colors.length]};--delay:${Math.random()*.16}s;--drift:${-80+Math.random()*160}px`;layer.append(piece);}
    document.body.append(layer);celebrationTimer=setTimeout(()=>layer.remove(),1600);
  }
  function event(name,element){sound(name);buddy(name);animate(element,name==='retry'?'fx-retry':name==='correct'||name==='corrected'?'fx-correct':name==='next'||name==='start'?'fx-enter':'fx-pop');if(name==='finish'){animate(document.querySelector('.results-mascot img'),'fx-finish');celebrate();}}
  document.addEventListener('pointerdown',()=>{muted=false;unlock();},{capture:true});
  document.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)&&!e.repeat){muted=false;unlock();}},{capture:true});
  document.addEventListener('click',e=>{const target=e.target.closest('button,a,summary');if(!target||target.disabled||target.closest('.experience-toolbar'))return;if(!target.matches('#start-btn,#check-btn,#next-btn,#skip-btn,#reveal-btn,#hint-btn,#resume-btn,[data-quick]')){sound('tap');animate(target,'fx-pop');}},{capture:true});
  document.getElementById('sound-toggle').onclick=()=>{settings.sound=!settings.sound;if(!settings.sound)stop();controls();save();if(settings.sound){unlock();sound('tap');}};
  document.getElementById('motion-toggle').onclick=()=>{settings.motion=!settings.motion;controls();save();if(!moving())document.querySelector('.celebration-layer')?.remove();};
  document.addEventListener('visibilitychange',()=>{if(document.hidden){muted=true;stop();}});
  window.addEventListener('pagehide',stop);reduced.addEventListener('change',controls);controls();
  window.DanhGrammarExperience={event,animate,sound,get settings(){return {...settings,motion:moving()};},get audioState(){return context?.state||'not-started';},get activeVoices(){return voices.length;}};
})();
