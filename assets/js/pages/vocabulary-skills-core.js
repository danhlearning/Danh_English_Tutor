(function(root){
 'use strict';
 const KEY='danh-skills-vocabulary-v1',modes=['meaning','listen','spelling','context'],outcomes=['first','corrected','hinted','seen'];
 const normal=s=>String(s||'').normalize('NFC').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
 const shuffle=items=>{const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
 const fresh=()=>({version:1,records:{},active:null});
 function context(w){if(!w.example)return null;const escaped=w.term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const re=new RegExp('(^|[^A-Za-z])'+escaped+'(?=$|[^A-Za-z])','i');return re.test(w.example)?w.example.replace(re,(_,prefix)=>prefix+'____'):null;}
 function validRound(r,byKey){
  return r&&modes.includes(r.mode)&&Array.isArray(r.order)&&r.order.length>0&&r.order.length<=8&&new Set(r.order).size===r.order.length&&r.order.every(k=>byKey.has(k))&&Number.isInteger(r.position)&&r.position>=0&&r.position<=r.order.length&&r.entries&&typeof r.entries==='object'&&r.order.every((k,i)=>{const e=r.entries[k];return e&&typeof e.draft==='string'&&e.draft.length<=250&&Number.isInteger(e.attempts)&&e.attempts>=0&&typeof e.hinted==='boolean'&&(!e.outcome||outcomes.includes(e.outcome))&&(i>=r.position||!!e.outcome)&&Array.isArray(e.options)&&e.options.includes(k)&&new Set(e.options).size===e.options.length&&e.options.every(k=>byKey.has(k));});
 }
 function create(storage,words,now=()=>Date.now()){
  const byKey=new Map(words.map(w=>[w.key,w]));let state=fresh(),warning='';
  try{const s=JSON.parse(storage.getItem(KEY)||'null');if(s?.version===1&&s.records&&typeof s.records==='object'&&!Array.isArray(s.records)){state=s;if(!validRound(s.active,byKey))state.active=null;}}catch{warning='Chưa đọc được lượt cũ. Mình chơi lượt mới nha.';}
  function save(){try{storage.setItem(KEY,JSON.stringify(state));return true;}catch{warning='Chưa lưu được. Giữ tab này mở để chơi tiếp nha.';return false;}}
  const recordKey=(k,mode)=>mode+'|'+k;
  function due(w,mode){const r=state.records[recordKey(w.key,mode)];return r&&Number.isFinite(r.due)&&r.due<=now();}
  function start(pool,mode){
   if(!modes.includes(mode))throw Error('Kiểu chơi chưa hợp lệ');
   const seen=new Set();const available=shuffle(pool).sort((a,b)=>Number(!!due(b,mode))-Number(!!due(a,mode))).filter(w=>{const n=normal(w.term);if(seen.has(n)||!byKey.has(w.key)||(mode==='context'&&context(w)===null))return false;if(mode!=='spelling'&&!pool.some(x=>normal(x.term)!==n&&normal(x.meaning)!==normal(w.meaning)))return false;seen.add(n);return true;});
   available.sort((a,b)=>Number(!!due(b,mode))-Number(!!due(a,mode)));
   if(!available.length)return false;
   const picked=available.slice(0,8),entries={};
   for(const w of picked){const terms=new Set([normal(w.term)]),meanings=new Set([normal(w.meaning)]);const distractors=shuffle(pool).filter(x=>{if(x.key===w.key||terms.has(normal(x.term))||meanings.has(normal(x.meaning)))return false;terms.add(normal(x.term));meanings.add(normal(x.meaning));return true;}).slice(0,3);entries[w.key]={draft:'',attempts:0,hinted:false,outcome:null,wrong:[],options:shuffle([w,...distractors]).map(x=>x.key)};}
   state.active={version:1,mode,order:picked.map(w=>w.key),position:0,entries,started:now()};save();return true;
  }
  const current=()=>{const r=state.active;return r&&r.position<r.order.length?byKey.get(r.order[r.position]):null;};
  const entry=()=>{const w=current();return w?state.active.entries[w.key]:null;};
  function settle(outcome){const r=state.active,w=current(),e=entry();if(!e||e.outcome)return false;e.outcome=outcome;const k=recordKey(w.key,r.mode),old=state.records[k];const stage=outcome==='first'?Math.min(Number.isInteger(old?.stage)?old.stage+1:0,3):0;state.records[k]={outcome,stage,due:now()+(outcome==='first'?[1,3,7,14][stage]:1)*86400000,at:now()};save();return true;}
  function answer(value){const w=current(),e=entry();if(!e||e.outcome)return 'locked';if(!String(value).trim())return 'empty';e.draft=String(value).slice(0,250);if(normal(value)===normal(w.term)){const kind=e.hinted?'hinted':e.attempts?'corrected':'first';settle(kind);return kind;}if(!Array.isArray(e.wrong))e.wrong=[];if(e.wrong.includes(normal(value)))return 'repeat';e.wrong.push(normal(value));e.attempts++;save();return 'wrong';}
  function hint(){const e=entry();if(!e||e.outcome)return;e.hinted=true;save();}
  function reveal(){return settle('seen');}
  function draft(value){const e=entry();if(e&&!e.outcome){e.draft=String(value).slice(0,250);save();}}
  function next(){const r=state.active,e=entry();if(!r||!e?.outcome)return false;r.position++;save();return true;}
  return {get state(){return state;},get warning(){return warning;},byKey,current,entry,start,answer,hint,reveal,draft,next,due,save};
 }
 const api={KEY,modes,outcomes,normal,shuffle,validRound,context,create};root.DanhVocabularySkillsCore=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
