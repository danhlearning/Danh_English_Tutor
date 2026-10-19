/* Âm và chuyển động học tập dùng chung; tùy chọn theo hồ sơ. */
(() => {
  'use strict';
  const storage=window.DanhLearners.storage;
  const read=(key,fallback)=>{try{return JSON.parse(storage.getItem(key))??fallback;}catch{return fallback;}};
  const write=(key,value)=>{try{storage.setItem(key,JSON.stringify(value));}catch{}};
  const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};
  const prefsKey='danh-vocabulary-effects-v1';
  const automatic=document.body.dataset.effectsMode==='automatic';
  let prefs=read(prefsKey,{}) || {};
  if(automatic) prefs={sound:true,motion:true,shared:true};
  else if(prefs.shared!==true){
    const legacy=read('danh-g6-grammar-effects',{}) || {};
    prefs={sound:prefs.sound!==false && legacy.sound!==false,motion:prefs.motion!==false && legacy.motion!==false,shared:true};
    write(prefsKey,prefs);
  }
  let sound = prefs.sound !== false, motion = prefs.motion !== false, audio;
  const voices = new Set();
  let speechTimer;
  let goodVariation = 0;
  const reduced = () => !motion || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stop = () => { clearTimeout(speechTimer);for(const oscillator of voices)try{oscillator.stop();}catch{} voices.clear();audio?.suspend()?.catch(()=>{});window.speechSynthesis?.cancel(); };
  const tone = (kind='tap') => {
    if(!sound || document.hidden)return;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;if(!Audio)return;
      audio ||= new Audio();if(audio.state==='suspended')audio.resume().catch(()=>{});
      const melodies = {tap:[740],next:[587,740],start:[392,523,659],good:goodVariation++%2?[587,740,880]:[523,659,784],corrected:[440,554,659],bad:[294,247],help:[392,494],streak:[523,659,784,1047,1319],complete:[392,523,659,784,1047],flip:[380]};
      const notes = melodies[kind] || melodies.tap;
      const step = kind==='streak' || kind==='complete' ? .085 : .065;
      if(kind==='flip') {
        const buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*.26),audio.sampleRate),samples=buffer.getChannelData(0);
        for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1);
        const source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain(),at=audio.currentTime;
        source.buffer=buffer;filter.type='bandpass';filter.frequency.setValueAtTime(1600,at);filter.frequency.exponentialRampToValueAtTime(450,at+.24);filter.Q.value=.6;
        source.connect(filter);filter.connect(gain);gain.connect(audio.destination);
        gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.075,at+.06);gain.gain.exponentialRampToValueAtTime(.0001,at+.25);
        voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};source.start(at);source.stop(at+.26);
      }
      notes.forEach((frequency,i)=>{
        const oscillator=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime+i*step;
        oscillator.type=['bad','corrected','next'].includes(kind)?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,at);
        if(kind==='bad')oscillator.frequency.exponentialRampToValueAtTime(frequency*.88,at+.12);
        oscillator.connect(gain);gain.connect(audio.destination);
        const duration=kind==='flip'?.065:kind==='complete'?.23:.16;
        gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(kind==='flip'?.015:.045,at+.008);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
        voices.add(oscillator);oscillator.onended=()=>{voices.delete(oscillator);oscillator.disconnect();gain.disconnect();};oscillator.start(at);oscillator.stop(at+duration+.01);
      });
    } catch {}
  };
  const sparkle = (x,y,kind='tap') => {
    if(reduced())return;
    while(document.querySelectorAll('.vg-spark').length>15)document.querySelector('.vg-spark').remove();
    const star=el('span',['good','corrected','streak','complete'].includes(kind)?'⭐':kind==='bad'?'🌱':'✦','vg-spark');star.setAttribute('aria-hidden','true');
    star.style.left=`${Math.max(12,Math.min(innerWidth-12,x))}px`;star.style.top=`${Math.max(12,Math.min(innerHeight-12,y))}px`;
    document.body.append(star);setTimeout(()=>star.remove(),650);
  };
  const feedback = (kind, target) => {
    clearTimeout(speechTimer);
    tone(kind);
    const detail={kind,sound,motion:!reduced()};
    document.dispatchEvent(new CustomEvent('danh-learning-feedback',{detail}));
    document.dispatchEvent(new CustomEvent('danh-vocabulary-feedback',{detail}));
    const rect=target?.getBoundingClientRect();
    if(kind!=='flip')sparkle(rect?rect.left+rect.width/2:innerWidth/2,rect?rect.top+Math.min(rect.height/2,150):innerHeight/2,kind);
    if(target && !reduced() && kind!=='flip') {
      const name=kind==='bad'?'vg-shake':kind==='streak'||kind==='complete'?'vg-celebrate':'vg-pop';
      target.classList.remove('vg-pop','vg-shake','vg-celebrate');void target.offsetWidth;target.classList.add(name);setTimeout(()=>target.classList.remove(name),650);
    }
  };
  const afterFeedback = callback => {
    clearTimeout(speechTimer);speechTimer=setTimeout(()=>{if(sound && !document.hidden)callback();},650);
  };
  document.addEventListener('click',event=>{
    const target=event.composedPath().find(node=>node instanceof Element);
    const card=target?.closest('.g6-unit-card,.vg-review-card,.vg-term-picks a');
    if(card)feedback('tap',card);
  });
  window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});

  const refresh=()=>{
    document.body.classList.toggle('vg-reduced',!motion);
    document.body.classList.toggle('gg-reduce-motion',!motion);
    if(!motion)document.querySelectorAll('.vg-spark').forEach(node=>node.remove());
    document.dispatchEvent(new Event('danh-learning-effects-change'));
  };
  const bindSettings=({soundButton,motionButton,compact=false})=>{
    const update=()=>{
      soundButton.textContent=sound?(compact?'🔊 Âm thanh':'🔊 Âm thanh: bật'):(compact?'🔇 Đã tắt âm':'🔇 Âm thanh: tắt');soundButton.setAttribute('aria-pressed',String(sound));
      motionButton.textContent=motion?(compact?'✨ Chuyển động':'✨ Chuyển động: bật'):'🌱 Giảm chuyển động';motionButton.setAttribute('aria-pressed',String(motion));
    };
    const persist=()=>{write(prefsKey,{sound,motion,shared:true});refresh();};
    soundButton.addEventListener('click',()=>{sound=!sound;if(!sound)stop();persist();if(sound)tone('tap');});
    motionButton.addEventListener('click',()=>{motion=!motion;persist();});
    document.addEventListener('danh-learning-effects-change',update);update();
  };
  refresh();
  window.DanhLearningEffects={feedback,afterFeedback,stop,reduced,bindSettings,automatic,soundEnabled:()=>sound,motionEnabled:()=>motion,isMilestone:count=>count===3||count>=5&&count%5===0};
})();
