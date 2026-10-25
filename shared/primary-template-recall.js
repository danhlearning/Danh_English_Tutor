/* Lượt điền từ/ôn tập có thể tiếp tục; giao diện theo lớp 4. */
(() => {
  const storage=window.DanhLearners.storage,fx=window.DanhLearningEffects;
  const read=k=>{try{return JSON.parse(storage.getItem(k));}catch{return null;}};
  const normal=s=>String(s).trim().toLowerCase().replace(/’/g,"'").replace(/\s+/g,' ');
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const button=(text,action,cls='g4-primary')=>{const b=el('button',text,cls);b.type='button';b.addEventListener('click',action);return b;};
  function mount({stage,words,key,context=false,record,update}) {
    const byId=new Map(words.map(w=>[w.key||w.id,w])),labels={first:'Đúng ngay',corrected:'Tự sửa đúng',seen:'Đã xem đáp án',skipped:'Bỏ qua'};
    let round=read(key),timer,openedAt=null,active=false,revealButton;
    const valid=r=>r?.version===1&&Array.isArray(r.tasks)&&r.tasks.length>0&&new Set(r.tasks.map(q=>q?.id)).size===r.tasks.length&&Number.isInteger(r.index)&&r.index>=0&&r.index<=r.tasks.length&&r.tasks.every((q,i)=>q&&byId.has(q.id)&&Number.isInteger(q.errors)&&q.errors>=0&&typeof q.draft==='string'&&Number.isFinite(q.elapsed)&&q.elapsed>=0&&(q.result===null||Object.hasOwn(labels,q.result))&&(i>=r.index||q.result!==null));
    if(!valid(round))round=null;
    const save=()=>storage.setItem(key,JSON.stringify(round));
    const q=()=>round?.tasks[round.index];
    function pause(){clearTimeout(timer);if(openedAt!==null&&q()&&!q().result){q().elapsed+=Math.max(0,performance.now()-openedAt);save();}openedAt=null;}
    function arm(){pause();if(!active||document.hidden||!q()||q().result)return;openedAt=performance.now();const remaining=Math.max(0,10000-q().elapsed);if(revealButton)revealButton.hidden=remaining>0;timer=setTimeout(()=>{pause();if(revealButton&&active&&!document.hidden&&!q().result)revealButton.hidden=false;},remaining);}
    function start(ids){pause();round={version:1,index:0,tasks:shuffle(ids||words.map(w=>w.key||w.id)).map(id=>({id,errors:0,draft:'',elapsed:0,result:null}))};save();render();}
    function render(){
      pause();stage.replaceChildren();
      if(!round){start();return;}
      if(round.index===round.tasks.length){
        stage.append(el('h3','Hoàn thành lượt '+(context?'dùng từ!':'ôn!')));
        const counts=Object.fromEntries(Object.keys(labels).map(k=>[k,round.tasks.filter(q=>q.result===k).length]));
        stage.append(el('p',Object.entries(labels).map(([k,v])=>`${v}: ${counts[k]}`).join(' · '),'g4-result'));
        const weak=round.tasks.filter(q=>q.result!=='first').map(q=>q.id);
        if(weak.length)stage.append(button('Ôn từ cần luyện',()=>start(weak)));
        stage.append(button('Chơi lượt mới',()=>start()));update();return;
      }
      const task=q(),word=byId.get(task.id);
      stage.append(el('p',`Câu ${round.index+1}/${round.tasks.length}`,'g4-question-count'));
      const picture=el('span',undefined,'g4-visual g4-question-art');picture.innerHTML=word.visual;window.DanhPictureListen.bind(picture,word.name,word.meaning);stage.append(picture);
      const prompt=el('p',context?word.context.replace('____','_____'):word.meaning,'g4-context-prompt');stage.append(prompt);
      const line=el('div',undefined,'g4-answer-line'),input=el('input');
      input.type='text';input.id='recall-answer';input.autocomplete='off';input.autocapitalize='off';input.spellcheck=false;input.value=task.result?word.name:task.draft;input.disabled=!!task.result;input.placeholder='Gõ từ hoặc cụm từ tiếng Anh';input.setAttribute('aria-label',context?'Điền từ vào câu':'Gõ từ tiếng Anh cần ôn');
      const feedback=el('p',task.result?`${labels[task.result]} · ${word.name} — ${word.meaning}`:task.errors?'Chưa đúng. Em thử lại nhé.':'','g4-feedback');feedback.setAttribute('role','status');
      const finish=result=>{if(task.result||!active)return;pause();task.result=result;save();record(word,result,task.errors);update();fx.feedback(result==='first'?'good':result==='corrected'?'corrected':'help');render();if(result==='first'||result==='corrected')window.DanhAnswerSpeech.say(word.name);};
      const check=button('Kiểm tra',()=>{if(task.result||!active)return;const attempt=normal(input.value);if(!attempt){feedback.textContent='Hãy gõ câu trả lời trước nhé.';input.focus();return;}if(attempt===normal(word.name))finish(task.errors?'corrected':'first');else{task.errors++;save();record(word,'wrong',task.errors);update();feedback.textContent='Chưa đúng. Nhìn tranh, đọc nghĩa và thử lại nhé!';input.setAttribute('aria-invalid','true');fx.feedback('bad');input.focus();}});
      check.disabled=!!task.result;
      input.addEventListener('input',()=>{task.draft=input.value;input.removeAttribute('aria-invalid');save();});
      input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.repeat&&!e.isComposing){e.preventDefault();check.click();}});
      line.append(input,check);stage.append(line);
      if(task.result){stage.append(feedback,button(round.index+1===round.tasks.length?'Xem tổng kết':'Câu tiếp theo →',()=>{if(!task.result||round.tasks[round.index]!==task)return;round.index++;save();render();}));}
      else {
        revealButton=button('Hiện đáp án',()=>{pause();if(task.elapsed<10000||!active||document.hidden)return;finish('seen');},'g4-reveal');revealButton.hidden=true;
        stage.append(revealButton,button('Bỏ qua',()=>finish('skipped'),'g4-reveal'),feedback);arm();
      }
    }
    function show(){active=true;render();}
    function hide(){pause();active=false;}
    window.addEventListener('pagehide',pause);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else if(active)arm();});
    return {show,hide,reset(ids){pause();round=null;start(ids);},hasSaved:()=>!!round,isIncomplete:()=>!!round&&round.index<round.tasks.length};
  }
  window.DanhPrimaryRecall={mount};
})();
