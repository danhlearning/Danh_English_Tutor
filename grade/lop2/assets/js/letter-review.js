(function(root){
 'use strict';
 const normal=s=>String(s).toLowerCase().trim().replace(/\s+/g,' ');
 function catalog(units){const map=new Map();for(const u of units)for(const w of u.words){const key=normal(w.name)+'|'+normal(w.meaning);if(map.has(key))map.get(key).unitIds.push(u.id);else map.set(key,{...w,id:`${u.id}:${w.id}`,sourceId:w.id,unitIds:[u.id]});}return [...map.values()];}
 function scope(ids,units,split=units.length/2){const sorted=units.filter(u=>ids.includes(u.id)).map(u=>u.id),same=list=>list.length===sorted.length&&list.every(id=>sorted.includes(id));if(same(units.slice(0,split).map(u=>u.id)))return 'review-term1';if(same(units.slice(split).map(u=>u.id)))return 'review-term2';if(same(units.map(u=>u.id)))return 'review-all';return 'review-set-'+sorted.join('-');}
 function chooseGroup(ranked,words,units){const byId=new Map(words.map(w=>[w.id,w])),covered=new Set(),picked=[];for(const id of ranked){const sources=byId.get(id).unitIds.filter(u=>units.includes(u));if(sources.some(u=>!covered.has(u))){picked.push(id);sources.forEach(u=>covered.add(u));if(picked.length===8)return picked;}}for(const id of ranked)if(picked.length<8&&!picked.includes(id))picked.push(id);return picked;}
 function connect({units,selectedUnits,open,back,termSplit=units.length/2}){
  const $=id=>document.getElementById(id),words=catalog(units),instances=new Map();let current,full=false,label='';
  const render=()=>{if(!current)return;const a=current.game.state.active;full=a?.phase===4;current.render($('letter-review-stage'),full);$('letter-review-title').textContent=(full?'Chính tả':'Ghép chữ')+label;};
  function launch(){
   const ids=selectedUnits(),name=scope(ids,units,termSplit),pool=words.filter(w=>w.unitIds.some(id=>ids.includes(id))).map(w=>w.id);
   if(!pool.length)return;
   label=name==='review-term1'?' · Học kỳ 1':name==='review-term2'?' · Học kỳ 2':'';
   if(!instances.has(name))instances.set(name,root.DanhLetterLadder.mount({topic:name,words,storage:root.DanhLearners.storage,selected:()=>pool,effects:root.DanhLearningEffects,allowStandalone:false,grade:root.DanhPrimaryGrade2Course?.grade||2,
    chooseGroup:ranked=>chooseGroup(ranked,words,ids),goSpelling:()=>{full=true;render();},rerender:()=>render()}));
   current=instances.get(name);open();render();$('letter-review-title').focus({preventScroll:true});
  }
  $('start-letters').onclick=launch;
  $('leave-letters').onclick=()=>{root.DanhLearningEffects.stop();back();$('start-letters').focus();};
  if(new URLSearchParams(location.search).get('game')==='letters')launch();
 }
 const api={catalog,scope,chooseGroup,connect};root.DanhGrade2LetterReview=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
