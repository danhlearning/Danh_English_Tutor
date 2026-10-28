/* Đọc trực tiếp ngân hàng của lớp; chỉ bổ sung chỉ mục, không sao chép nội dung. */
(function(root){
 'use strict';
 const sources=Array.from({length:12},(_,i)=>{
  const grade=i+1;
  return {grade,files:grade===2?['grade/lop2/assets/data/gs-unit1-data.js','grade/lop2/assets/data/gs-units-data.js','grade/lop2/assets/js/unit-pencil-art.js']:grade===6?['grade/lop6/assets/js/pencil-images-data.js','grade/lop6/assets/js/units-data.js']:[grade<=5?`grade/lop${grade}/assets/js/grade2-course.js`:`grade/lop${grade}/assets/js/units-data.js`],global:grade===2?'grade2Units':grade<=5?'DanhPrimaryGrade2Course':`DanhGrade${grade}Units`};
 });
 const normal=s=>String(s||'').normalize('NFC').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
 const key=(term,meaning)=>normal(term)+'|'+normal(meaning);
 function collect(courses,levels={},assetRoot='https://local.invalid/'){
  const words=new Map();
  for(const {grade,data} of courses){
   const units=Array.isArray(data)?data:Array.isArray(data.units)?data.units:Object.values(data);
   for(const unit of units)for(const w of unit.words||[]){
    const term=w.term||w.name,meaning=w.meaning;if(!term||!meaning)continue;
    const id=key(term,meaning),source={grade,unit:unit.id,wordId:w.id,title:unit.title,path:`grade/lop${grade}/${unit.id}.html`};
    const art=w.image||w.visual?.match(/<image[^>]*href=["']([^"']+)/)?.[1];
    let image=null;if(art){try{const origin=new URL(assetRoot),url=new URL(art,new URL(`grade/lop${grade}/`,origin));if(url.origin===origin.origin&&url.pathname.startsWith(origin.pathname))image=url.pathname.slice(origin.pathname.length);}catch{}}
    // Only share artwork when BOTH spelling and meaning match. Later sources
    // may have an illustration even when the first source only has an emoji.
    if(words.has(id)){const existing=words.get(id);existing.sources.push(source);if(!existing.image&&image)existing.image=image;continue;}
    words.set(id,{key:id,term,meaning,ipa:w.ipa||'',example:w.example||w.context?.replace(/_{2,}/g,term)||'',image,icon:w.icon||unit.icon||'🌱',sources:[source],level:levels[normal(term)]||null});
   }
  }
  return [...words.values()];
 }
 const api={sources,normal,key,collect};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 if(typeof document==='undefined')return;
 const base=new URL('../',document.currentScript.src);let pending;
 const script=file=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=new URL(file+'?v=online-audio-20261028',base);s.onload=resolve;s.onerror=()=>{s.remove();reject(Error('Chưa tải được bộ từ. Thử lại nha.'));};document.head.append(s);});
 api.load=()=>pending||(pending=(async()=>{
  const courses=[];
  for(const source of sources){for(const file of source.files)await script(file);courses.push({grade:source.grade,data:root[source.global]});}
  const words=collect(courses,root.DanhVocabularyLevels||{},base.href);
  return words;
 })().catch(e=>{pending=null;throw e;}));
 api.url=file=>new URL(file,base).href;
 root.DanhVocabularyLibrary=api;
})(typeof window==='undefined'?globalThis:window);
