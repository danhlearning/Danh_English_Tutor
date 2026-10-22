/* Stable review tasks and profile-scoped journeys; Unit progress stays independent. */
(() => {
  'use strict';
  const KEY='danh-g2-mixed-review-v1';
  const modes=['meaning','listening','spelling','sentence','gap','letters','dialogue','sentence-listening','writing'];
  const choiceModes=['meaning','listening','gap','letters','dialogue','sentence-listening'];
  const outcomes=['first','retry','hinted','revealed','skipped'];
  const authored=typeof module!=='undefined'&&module.exports?require('../data/mixed-review-content.js'):window.DanhGrade2ReviewContent;
  const normalize=value=>String(value).toLowerCase().replace(/[’‘]/g,"'").replace(/[.,?!]/g,'').replace(/\s+/g,' ').trim();
  const search=value=>normalize(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const shuffle=(values,random=Math.random)=>{const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;};
  class Review {
    constructor(units,storage,random=Math.random,content=authored,key=KEY) {
      this.key=key;
      this.units=Object.values(units).sort((a,b)=>Number(a.id.replace(/\D/g,''))-Number(b.id.replace(/\D/g,'')));
      this.unitIds=this.units.map(u=>u.id);this.words=new Map();this.bank=new Map();this.contexts=new Map();
      for(const unit of this.units)for(const word of unit.words){const question=unit.questions.find(q=>q.imageWordId===word.id);this.words.set(`${unit.id}:${word.id}`,{...word,key:`${unit.id}:${word.id}`,unitId:unit.id,unitTitle:unit.title,question});}
      const add=record=>{if(this.bank.has(record.id))throw Error('Duplicate review ID: '+record.id);this.bank.set(record.id,record);};
      for(const word of this.words.values()){
        for(const mode of ['meaning','listening','spelling','letters']){
          const chars=[...word.name.toLowerCase()],indices=chars.map((c,i)=>/[a-z]/.test(c)?i:-1).filter(i=>i>=0),missing=indices[Math.floor(indices.length/2)];
          add({id:`${word.key}:${mode}`,key:word.key,unitId:word.unitId,mode,family:'word:'+word.key,answer:word.name,meaning:word.meaning,letter:chars[missing],masked:chars.map((c,i)=>i===missing?'__':c).join('')});
        }
        const q=word.question;if(q)this.contexts.set(q.id,{...q,key:word.key,unitId:word.unitId});
      }
      for(const scene of content?.sentences||[]){const key=`${scene.unitId}:${scene.word}`;if(!this.words.has(key))throw Error('Unknown review target: '+key);this.contexts.set(scene.id,{...scene,key});}
      for(const scene of this.contexts.values())for(const mode of ['sentence','gap','sentence-listening','writing']){
        const word=this.words.get(scene.key),pattern=new RegExp('\\b'+escape(word.name)+'\\b','i');
        if(!pattern.test(scene.answer))throw Error('Review sentence must contain its target: '+scene.id);
        add({id:`${scene.id}:${mode}`,key:scene.key,unitId:scene.unitId,mode,contextId:scene.id,family:'sentence:'+normalize(scene.answer),answer:scene.answer,meaning:scene.vietnamese,accepted:scene.acceptedAnswers||[scene.answer],masked:scene.answer.replace(pattern,'____')});
      }
      for(const chat of content?.dialogues||[]){const key=`${chat.unitId}:${chat.word}`;if(!this.words.has(key))throw Error('Unknown dialogue target: '+key);add({...chat,key,mode:'dialogue',family:'dialogue:'+chat.id,meaning:chat.context});}
      this.storage=storage;this.random=random;this.storageAvailable=true;this.recovered=false;
      this.state={version:1,selected:[...this.unitIds],selectedModes:[...modes],recent:[],active:null,history:[]};
      try{
        const text=storage.getItem(this.key);if(!text)return;const saved=JSON.parse(text);
        if(saved?.version!==1||!this.validUnits(saved.selected)){this.recovered=true;return;}
        this.state.selected=[...saved.selected];
        if(this.validModes(saved.selectedModes))this.state.selectedModes=[...saved.selectedModes];
        if(Array.isArray(saved.recent))this.state.recent=saved.recent.filter(v=>typeof v==='string'&&v.length<300).slice(-200);
        if(saved.active&&this.validRound(saved.active))this.state.active=saved.active;else if(saved.active)this.recovered=true;
        if(Array.isArray(saved.history))this.state.history=saved.history.filter(h=>typeof h?.id==='string'&&Number.isFinite(h.completedAt)&&Number.isInteger(h.total)&&h.total>0&&h.total<=48&&Number.isInteger(h.score)&&h.score>=0&&h.score<=h.total*10).slice(-20);
      }catch{this.recovered=true;}
    }
    validUnits(ids){return Array.isArray(ids)&&ids.length>0&&ids.length<=this.unitIds.length&&new Set(ids).size===ids.length&&ids.every(id=>this.unitIds.includes(id));}
    validModes(ids){return Array.isArray(ids)&&ids.length>0&&ids.length<=modes.length&&new Set(ids).size===ids.length&&ids.every(id=>modes.includes(id));}
    record(task=this.task){
      if(!task)return null;if(task.id)return this.bank.get(task.id);
      const w=this.words.get(task.key);if(!w||!modes.slice(0,4).includes(task.mode)||(task.mode==='sentence'&&!w.question))return null;
      return {key:w.key,unitId:w.unitId,mode:task.mode,legacy:true,family:'word:'+w.key,answer:task.mode==='sentence'?w.question.answer:w.name,meaning:task.mode==='sentence'?w.question.vietnamese:w.meaning,accepted:w.question?.acceptedAnswers};
    }
    solution(task=this.task){const r=this.record(task);return r.mode==='letters'?r.letter:r.mode==='dialogue'?r.id+':right':r.mode==='sentence-listening'?'scene:'+r.contextId:r.key;}
    choiceDomain(task,ids){
      const r=this.record(task);if(!choiceModes.includes(r.mode))return [];
      if(r.mode==='letters')return [...'abcdefghijklmnopqrstuvwxyz'].map(letter=>({value:letter,text:letter}));
      if(r.mode==='dialogue')return [r.answer,...r.distractors].map((text,i)=>({value:r.id+(i?':wrong'+i:':right'),text}));
      if(r.mode==='sentence-listening')return [...this.contexts.values()].filter(s=>ids.includes(s.unitId)).map(s=>({value:'scene:'+s.id,text:s.answer}));
      return this.pool(ids).map(w=>({value:w.key,text:r.mode==='meaning'?w.meaning:r.mode==='gap'?w.name.toLowerCase():w.name}));
    }
    optionLabel(value,task=this.task){return this.choiceDomain(task,this.round.units).find(o=>o.value===value)?.text||'';}
    isChoice(task=this.task){return choiceModes.includes(task.mode);}
    validRound(r){
      if(!r||typeof r.id!=='string'||!this.validUnits(r.units)||!Array.isArray(r.tasks)||!r.tasks.length||r.tasks.length>48||new Set(r.tasks.map(t=>t?.id||t?.key)).size!==r.tasks.length||!Number.isInteger(r.index)||r.index<0||r.index>r.tasks.length||!Array.isArray(r.answers)||r.answers.length!==r.tasks.length)return false;
      if(new Set(r.tasks.map(t=>this.record(t)?.family)).size!==r.tasks.length)return false;
      return r.tasks.every((t,index)=>{
        const record=this.record(t),a=r.answers[index];if(!record||t.key!==record.key||t.mode!==record.mode||!r.units.includes(record.unitId))return false;
        const domain=this.choiceDomain(t,r.units).map(o=>o.value);
        if(!Array.isArray(t.options)||t.options.length>4||new Set(t.options).size!==t.options.length)return false;
        // Old non-choice tasks stored vocabulary distractors too; preserve those arrays exactly.
        if(this.isChoice(t)){if(t.options.length<2||!t.options.includes(this.solution(t))||!t.options.every(v=>domain.includes(v)))return false;}
        else if(!t.options.every(v=>this.words.has(v)&&r.units.includes(this.words.get(v).unitId)))return false;
        const count=this.tokens(t).length;if(!Array.isArray(t.tokenOrder)||t.tokenOrder.length!==count||new Set(t.tokenOrder).size!==count||!t.tokenOrder.every(n=>Number.isInteger(n)&&n>=0&&n<count))return false;
        return a&&Number.isInteger(a.mistakes)&&a.mistakes>=0&&a.mistakes<10000&&typeof a.hint==='boolean'&&typeof a.draft==='string'&&a.draft.length<=500&&typeof a.lastAttempt==='string'&&a.lastAttempt.length<=500&&Array.isArray(a.wrongChoices)&&new Set(a.wrongChoices).size===a.wrongChoices.length&&a.wrongChoices.every(v=>t.options.includes(v)&&v!==this.solution(t))&&Array.isArray(a.parts)&&new Set(a.parts).size===a.parts.length&&a.parts.every(n=>t.tokenOrder.includes(n))&&(a.outcome===null||outcomes.includes(a.outcome))&&(index>=r.index||a.outcome!==null)&&(index<=r.index||a.outcome===null)&&(a.outcome!=='first'||(a.mistakes===0&&!a.hint))&&(a.outcome!=='retry'||(a.mistakes>0&&!a.hint))&&(a.outcome!=='hinted'||a.hint);
      });
    }
    save(){try{this.storage.setItem(this.key,JSON.stringify(this.state));this.storageAvailable=true;}catch{this.storageAvailable=false;}}
    select(ids){if(!this.validUnits(ids))return false;this.state.selected=[...ids];this.save();return true;}
    selectModes(ids){if(!this.validModes(ids))return false;this.state.selectedModes=[...ids];this.save();return true;}
    pool(ids=this.state.selected){return [...this.words.values()].filter(w=>ids.includes(w.unitId));}
    catalog(ids=this.state.selected,types=this.state.selectedModes){return [...this.bank.values()].filter(r=>ids.includes(r.unitId)&&types.includes(r.mode));}
    roundLength(ids=this.state.selected,types=this.state.selectedModes){return Math.min(new Set(this.catalog(ids,types).map(r=>r.family)).size,Math.max(10,ids.length));}
    makeTask(r,ids){
      const t={id:r.id,key:r.key,mode:r.mode,options:[],tokenOrder:[]};
      if(this.isChoice(t)){
        const right=this.solution(t),domain=this.choiceDomain(t,ids),rightText=domain.find(o=>o.value===right).text;
        const seen=new Set([normalize(rightText)]),wrong=[];
        for(const candidate of shuffle(domain,this.random)){const text=normalize(candidate.text);if(!seen.has(text)){seen.add(text);wrong.push(candidate.value);}}
        t.options=shuffle([right,...wrong.slice(0,3)],this.random);
      }
      t.tokenOrder=shuffle(this.tokens(t).map((_,i)=>i),this.random);return t;
    }
    start(reviewTasks){
      let tasks,ids=reviewTasks?.length?[...this.round.units]:[...this.state.selected];
      if(reviewTasks?.length)tasks=reviewTasks.map(t=>({...t,options:[...t.options],tokenOrder:[...t.tokenOrder]}));
      else{
        const catalog=this.catalog(),types=[...this.state.selectedModes],unitOrder=shuffle(ids,this.random),used=new Set(),recent=new Set(this.state.recent);tasks=[];
        for(let i=0;i<this.roundLength();i++){
          const mode=types[(i+this.state.history.length)%types.length],unitId=unitOrder[i%unitOrder.length];
          let candidates=catalog.filter(r=>r.mode===mode&&r.unitId===unitId&&!used.has(r.family));
          if(!candidates.length)candidates=catalog.filter(r=>r.unitId===unitId&&!used.has(r.family));
          if(!candidates.length)candidates=catalog.filter(r=>!used.has(r.family));
          if(!candidates.length)break;
          const candidatesShuffled=shuffle(candidates,this.random).sort((a,b)=>Number(recent.has(a.family))-Number(recent.has(b.family)));
          const r=candidatesShuffled[0];used.add(r.family);tasks.push(this.makeTask(r,ids));
        }
        this.state.recent=[...this.state.recent,...tasks.map(t=>this.record(t).family)].slice(-200);
      }
      this.state.active={id:globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`,units:ids,tasks,index:0,answers:tasks.map(()=>({mistakes:0,hint:false,draft:'',parts:[],wrongChoices:[],lastAttempt:'',outcome:null}))};
      this.save();return this.round;
    }
    get round(){return this.state.active;}get task(){return this.round?.tasks[this.round.index];}get answer(){return this.round?.answers[this.round.index];}
    tokens(task=this.task){const r=this.record(task);return (r.legacy?this.words.get(task.key).question.answer:r.answer).replace(/[.?!]+$/,'').split(/\s+/);}
    expected(task=this.task){return this.record(task).answer;}
    draft(value){if(this.answer&&!this.answer.outcome){this.answer.draft=String(value).slice(0,500);this.save();}}
    togglePart(index){if(!this.answer||this.answer.outcome||!this.task.tokenOrder.includes(index))return;const at=this.answer.parts.indexOf(index);if(at<0)this.answer.parts.push(index);else this.answer.parts.splice(at,1);this.save();}
    hint(){if(!this.answer||this.answer.outcome)return false;this.answer.hint=true;this.save();return true;}
    correct(value){
      const raw=String(value).slice(0,500),cleaned=normalize(raw),r=this.record();
      if(!r||!cleaned)return false;
      return this.isChoice()?raw===this.solution():(r.mode==='sentence'||r.mode==='writing')?(r.accepted||[r.answer]).some(v=>normalize(v)===cleaned):normalize(r.answer)===cleaned;
    }
    submit(value){
      const a=this.answer,t=this.task;if(!a||a.outcome)return 'locked';const raw=String(value).slice(0,500),cleaned=normalize(raw);if(!cleaned)return 'empty';const r=this.record();
      const correct=this.correct(raw);
      if(!correct){if(a.lastAttempt===cleaned)return 'repeat';a.lastAttempt=cleaned;a.mistakes=Math.min(9999,a.mistakes+1);if(t.options.includes(raw)&&!a.wrongChoices.includes(raw))a.wrongChoices.push(raw);this.save();return 'wrong';}
      a.outcome=a.hint?'hinted':a.mistakes?'retry':'first';this.save();return a.outcome;
    }
    resolve(outcome){if(!this.answer||this.answer.outcome||!['revealed','skipped'].includes(outcome))return false;this.answer.outcome=outcome;this.save();return true;}
    totals(round=this.round){const total=Object.fromEntries(outcomes.map(k=>[k,0]));for(const answer of round.answers)if(answer.outcome)total[answer.outcome]++;return {...total,score:total.first*10+total.retry*5+total.hinted*3,total:round.tasks.length};}
    next(){if(!this.answer?.outcome)return false;this.round.index++;if(this.round.index===this.round.tasks.length&&!this.state.history.some(h=>h.id===this.round.id)){this.state.history.push({id:this.round.id,completedAt:Date.now(),...this.totals()});this.state.history=this.state.history.slice(-20);}this.save();return true;}
    needsReview(){return this.round.tasks.filter((t,i)=>this.round.answers[i].outcome!=='first');}
  }
  const api={Review,KEY,modes,choiceModes,normalize,search};if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.DanhGrade2Review=api;
})();
