const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../../..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
test('all 13 Colors use distinct text-free lightweight pencil artwork and shared learning IDs',()=>{
 const source=read('grade/lop2/assets/js/topics/colors.js'),ctx={window:{}};
 vm.runInNewContext(source.slice(0,source.indexOf('  function speak'))+';window.words=colorsData;',ctx);
 const words=ctx.window.words;assert.equal(words.length,13);assert.equal(new Set(words.map(w=>w.image)).size,13);
 for(const word of words){const file=path.join(root,'grade/lop2',word.image),svg=fs.readFileSync(file,'utf8');assert(svg.includes('viewBox="0 0 360 360"'));assert(svg.includes('<pattern'));assert.doesNotMatch(svg,/<(?:text|script|filter)\b/i);assert(Buffer.byteLength(svg)<12000);assert(word.meaning&&word.ipa&&word.sentence);}
 const page=read('grade/lop2/colors.html');assert(page.includes("topic: 'colors'"));assert(page.includes('DanhLesson.mount'));assert(page.includes('onSelectionChange'));assert(page.includes('colors-game4.js?v=colors-pencil-20261029'));assert.doesNotMatch(source,/function initMcqGame|setTimeout\(/);
});
test('the entire legacy Clothes answer bank and known online failures have real MP3 files',()=>{
 const source=read('grade/lop2/assets/js/topics/clothes.js');let checked=0;
 for(const match of source.matchAll(/\banswer:\s*(['"])((?:\\.|(?!\1).)*)\1/g)){
  const text=vm.runInNewContext(match[0].slice(match[0].indexOf(':')+1)).replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();let hash=2166136261;for(const c of text)hash=Math.imul(hash^c.charCodeAt(0),16777619);
  const bytes=fs.readFileSync(path.join(root,'shared/answer-audio/'+(hash>>>0).toString(16).padStart(8,'0')+'.mp3'));assert(bytes.length>1000);assert.equal(bytes.toString('ascii',0,3),'ID3');checked++;
 }assert.equal(checked,20);
 for(const id of ['917cd269','0297e13b','750bbb3e'])assert(fs.statSync(path.join(root,'shared/answer-audio/'+id+'.mp3')).size>1000);
});
