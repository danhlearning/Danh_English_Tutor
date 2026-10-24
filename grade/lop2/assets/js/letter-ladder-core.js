(function(root){
 'use strict';
 const normal=s=>String(s||'').normalize('NFKC').replace(/[’‘]/g,"'").toLowerCase().trim().replace(/\s+/g,' ');
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const positions=w=>Array.from(w.name).flatMap((c,i)=>/[a-z]/i.test(c)?[i]:[]);
 const kinds=['first','corrected','hinted','seen'];
 function wordOrder(ids,previous=[]){
  const order=shuffle(ids),last=previous[previous.length-1];
  if(order.length>1&&order[0]===last){const i=1+Math.floor(Math.random()*(order.length-1));[order[0],order[i]]=[order[i],order[0]];}
  if(order.length>2&&order.length===previous.length&&order.every((id,i)=>id===previous[i]))order.push(order.shift());
  return order;
 }
 function task(w,phase){
  const holes=phase===4?[]:shuffle(positions(w)).slice(0,phase).sort((a,b)=>a-b),letters=Array.from(w.name);
  const tiles=holes.map(i=>letters[i].toLowerCase());
  if(phase!==4){const extras=shuffle(Array.from('abcdefghijklmnopqrstuvwxyz').filter(c=>!tiles.includes(c))).slice(0,3);tiles.push(...extras);}
  return {id:w.id,holes,tiles:shuffle(tiles),draft:holes.map(()=>null),text:'',errors:0,hinted:false,result:null,lastWrong:''};
 }
 function create(storage,topic,words,options={}){
  const grade=[2,3,4].includes(Number(options.grade))?Number(options.grade):2;
  const key=`danh-g${grade}-letter-ladder-${topic}-v1`,byId=new Map(words.map(w=>[w.id,w])),state={version:1,history:{},active:null,previous:null};let warning='';
  const signature=ids=>ids.map(id=>`${id}:${byId.get(id)?.name}`).join('|');
  function validTask(t,phase){
   const w=byId.get(t?.id);if(!w||!Array.isArray(t.holes)||!Array.isArray(t.tiles)||!Array.isArray(t.draft)||typeof t.text!=='string'||t.text.length>150||!Number.isInteger(t.errors)||t.errors<0||typeof t.hinted!=='boolean'||![null,...kinds].includes(t.result))return false;
   if(t.holes.length!==(phase===4?0:phase)||new Set(t.holes).size!==t.holes.length||!t.holes.every(i=>positions(w).includes(i))||t.tiles.length!==(phase===4?0:phase+3)||!t.tiles.every(c=>/^[a-z]$/.test(c))||t.draft.length!==t.holes.length)return false;
   const used=t.draft.filter(n=>n!==null);if(new Set(used).size!==used.length||!used.every(n=>Number.isInteger(n)&&n>=0&&n<t.tiles.length))return false;
   const bag=[...t.tiles];for(const i of t.holes){const j=bag.indexOf(Array.from(w.name)[i].toLowerCase());if(j<0)return false;bag.splice(j,1);}return true;
  }
  function valid(a){
   if(!a||!Array.isArray(a.selected)||!a.selected.length||a.selected.some(id=>!byId.has(id))||new Set(a.selected).size!==a.selected.length||!Array.isArray(a.ids)||!a.ids.length||a.ids.length>8||new Set(a.ids).size!==a.ids.length||a.ids.some(id=>!a.selected.includes(id))||a.signature!==signature(a.selected)||![1,2,3,4].includes(a.phase)||typeof a.bridge!=='boolean'||!Array.isArray(a.tasks)||!a.tasks.length||!Array.isArray(a.completed)||!Number.isInteger(a.index)||a.index<0||a.index>a.tasks.length)return false;
   const expected=a.ids.filter(id=>a.phase===4||positions(byId.get(id)).length>=a.phase);
   return a.tasks.length===expected.length&&new Set(a.tasks.map(t=>t?.id)).size===expected.length&&a.tasks.every((t,i)=>expected.includes(t.id)&&validTask(t,a.phase)&&(i>=a.index||t.result!==null)&&(i<=a.index||t.result===null))&&a.completed.length<=24&&a.completed.every(t=>[1,2,3].includes(t.phase)&&a.ids.includes(t.id)&&kinds.includes(t.result));
  }
  try{const saved=JSON.parse(storage.getItem(key)||'null');if(saved?.version===1){if(saved.history&&typeof saved.history==='object'&&!Array.isArray(saved.history))state.history=saved.history;if(valid(saved.active))state.active=saved.active;else if(saved.active)warning='Lượt cũ cần mở lại. Kết quả đã học vẫn được giữ.';state.previous=saved.previous||null;}}catch{warning='Chưa đọc được lượt đã lưu. Bạn vẫn chơi trong tab này nhé.';}
  const save=()=>{try{storage.setItem(key,JSON.stringify(state));return true;}catch{warning='Chưa lưu được. Giữ tab này để chơi tiếp nhé.';return false;}};
  function ensure(selected){
   selected=[...new Set(selected)].filter(id=>byId.has(id)&&positions(byId.get(id)).length);
   if(!selected.length)return false;
   const a=state.active;if(a&&(a.selected.length!==selected.length||a.selected.some(id=>!selected.includes(id))||a.signature!==signature(a.selected))){state.previous=JSON.parse(JSON.stringify(a));state.active=null;save();}return true;
  }
  function start(selected){
   selected=[...new Set(selected)].filter(id=>byId.has(id)&&positions(byId.get(id)).length);
   if(!ensure(selected))return false;
   const ranked=shuffle(selected.filter(id=>byId.has(id)&&positions(byId.get(id)).length));ranked.sort((a,b)=>(state.history[`${a}:4`]?.count||0)-(state.history[`${b}:4`]?.count||0));
   let ids=options.chooseGroup?options.chooseGroup([...ranked]):ranked.slice(0,8);
   if(!Array.isArray(ids)||!ids.length||ids.length>8||new Set(ids).size!==ids.length||ids.some(id=>!ranked.includes(id)))ids=ranked.slice(0,8);
   const order=wordOrder(ids,state.active?.tasks.map(t=>t.id));
   state.active={selected:[...selected],signature:signature(selected),ids,phase:1,index:0,tasks:order.map(id=>task(byId.get(id),1)),completed:[],bridge:false};save();return true;
  }
  const entry=()=>state.active?.tasks[state.active.index],word=()=>byId.get(entry()?.id);
  function choose(tile){const t=entry();if(!t||t.result||state.active.phase===4||!Number.isInteger(tile)||tile<0||tile>=t.tiles.length||t.draft.includes(tile))return false;const i=t.draft.indexOf(null);if(i<0)return false;t.draft[i]=tile;save();return true;}
  function remove(slot){const t=entry();if(!t||t.result||!Number.isInteger(slot)||slot<0||slot>=t.draft.length)return false;t.draft[slot]=null;save();return true;}
  function text(value){const t=entry();if(!t||t.result)return;t.text=String(value).slice(0,150);save();}
  function finish(result){const t=entry();if(!t||t.result)return null;t.result=result;const k=`${t.id}:${state.active.phase}`,old=state.history[k];state.history[k]={count:(Number.isInteger(old?.count)?old.count:0)+1,last:result};save();return result;}
  function check(){
   const t=entry(),a=state.active;if(!t||t.result)return null;
   if(a.phase===4?!normal(t.text):t.draft.some(n=>n===null))return 'empty';
   const answer=a.phase===4?normal(t.text):t.draft.map(n=>t.tiles[n]).join(''),expected=a.phase===4?normal(word().name):t.holes.map(i=>Array.from(word().name)[i].toLowerCase()).join('');
   if(answer===expected)return finish(t.hinted?'hinted':t.errors?'corrected':'first');
   if(t.lastWrong===answer)return 'repeat';t.errors++;t.lastWrong=answer;save();return 'wrong';
  }
  function hint(){const t=entry();if(!t||t.result)return '';t.hinted=true;save();return state.active.phase===4?Array.from(word().name)[0]:Array.from(word().name)[t.holes[t.draft.findIndex(n=>n===null)]??t.holes[0]];}
  function reveal(){const t=entry();if(!t||t.result||!t.hinted&&!t.errors)return false;t.text=word().name;const used=new Set();t.draft=t.holes.map(i=>{const n=t.tiles.findIndex((c,n)=>!used.has(n)&&c===Array.from(word().name)[i].toLowerCase());used.add(n);return n;});return finish('seen');}
  function next(){const a=state.active;if(!entry()?.result)return false;a.index++;save();return true;}
  function advance(){const a=state.active;if(!a||a.index!==a.tasks.length||a.phase===4)return false;const previous=a.tasks.map(t=>t.id);a.completed.push(...a.tasks.map(t=>({id:t.id,phase:a.phase,result:t.result})));do{a.phase++;a.tasks=wordOrder(a.ids.filter(id=>a.phase===4||positions(byId.get(id)).length>=a.phase),previous).map(id=>task(byId.get(id),a.phase));}while(!a.tasks.length&&a.phase<4);a.index=0;a.bridge=a.phase===4;save();return true;}
  function standalone(){if(state.active){state.active.bridge=false;save();}}
  return {key,state,byId,ensure,start,entry,word,choose,remove,text,check,hint,reveal,next,advance,standalone,save,get warning(){return warning;}};
 }
 const api={create,normal,positions,kinds};root.DanhLetterLadderCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
