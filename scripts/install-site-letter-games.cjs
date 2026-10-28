/* Repeatable integration into pages and templates; never edits learning banks. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),primary=require('./lib/primary-letter-pages.cjs');
const version='site-letters-20261025';
function dependencies(html,prefix,before){
 const styles=['grade/lop2/assets/css/letter-ladder.css','grade/lop2/assets/css/picture-audio.css'];
 const scripts=['grade/lop2/assets/js/letter-ladder-core.js','grade/lop2/assets/js/letter-ladder.js','grade/lop2/assets/js/picture-audio.js','shared/site-letter-games.js'];
 for(const file of styles)if(!html.includes(file.endsWith('/picture-audio.css')?prefix+file:file.split('/').pop()))html=html.replace('</head>',`<link rel="stylesheet" href="${prefix+file}?v=${version}">\n</head>`);
 const tags=scripts.filter(file=>file.endsWith('/picture-audio.js')?!html.includes('src="'+prefix+file):!html.includes(file.split('/').pop()+'?')&&!html.includes('src="'+prefix+file+'"')).map(file=>`<script src="${prefix+file}?v=${version}"></script>`).join('\n');
 if(tags)html=html.replace(before,tags+'\n$&');return html;
}
function transform(html,file){
 const grade=Number(file.match(/^grade\/lop(\d+)\//)?.[1]);
 if(file==='grade/lop2/animals.html'){
  const before=/<script[^>]*src="[^"\n]*topics\/animals\.js[^>]*><\/script>/;
  if(!html.includes('shared/learning-effects.js'))html=html.replace(before,'<script src="../../shared/learning-effects.js?v=loading-smooth-20261028"></script>\n$&');
  if(!html.includes('shared/learning-effects.css'))html=html.replace('</head>','<link rel="stylesheet" href="../../shared/learning-effects.css?v=site-letters-20261025'+version+'">\n</head>');
  html=dependencies(html,'../../',before);
 }
 if([1,3,4,5].includes(grade)&&(/src="[^"\n]*\/(?:learning-core|mixed-review)\.js/.test(html)))html=primary.enable(html,grade,html.includes('id="play"'));
 if(html.includes('shared/vocabulary-game.js')){
  if(grade>=6&&html.includes('data-tab="spelling"')&&html.includes('id="quiz-stage"')){
   if(!html.includes('data-tab="letters"'))html=html.replace(/<button\b[^>]*data-tab="spelling"/, '<button class="g6-tab" type="button" role="tab" data-tab="letters">Ghép chữ</button>\n      $&');
   if(!html.includes('id="letters-stage"'))html=html.replace('</main>','<section id="letters" class="g6-panel" hidden aria-label="Ghép chữ"><div id="letters-stage"></div></section>\n</main>');
  }
  html=dependencies(html,'../../',/<script[^>]*src="[^"\n]*shared\/vocabulary-game\.js[^>]*><\/script>/);
 }
 if(html.includes('assets/js/pages/vocabulary-skills.js')){
  if(!html.includes('data-mode="letters"'))html=html.replace(/<button\b[^>]*data-mode="spelling"/,'<button type="button" class="mode" data-mode="letters" aria-pressed="false"><span aria-hidden="true">🔤</span>Ghép chữ</button>\n      $&');
  const prefix=html.match(/src="([^"\n]*?)assets\/js\/pages\/vocabulary-skills\.js/)?.[1]||'./';
  html=dependencies(html,prefix,/<script[^>]*src="[^"\n]*assets\/js\/pages\/vocabulary-skills\.js[^>]*><\/script>/);
 }
 return html.replace(/((?:src|href)=["'][^"'\s<>]*\/(?:site-letter-games|contact-footer|vocabulary-library|vocabulary-game|vocabulary-skills|letter-ladder(?:-core)?|learning-core|learning-effects|animals)\.(?:js|css))(?:\?[^"'\s<>]*)?/g,(_,asset)=>asset+'?v='+(/\/(?:contact-footer|animals)\.js$/.test(asset)?'online-audio-20261028':/\/learning-effects\.js$/.test(asset)?'loading-smooth-20261028':/\/vocabulary-library\.js$/.test(asset)?'online-audio-20261028':/\/topics\/animals\.css$/.test(asset)&&html.includes('animals-shared.js')?'shared-topics-20261025':version)).replace(/(picture-audio\.js)\?v=[^" ]+/g,'$1?v=loading-smooth-20261028');
}
function run(){
 const files=[];for(const folder of ['grade','templates']){const walk=dir=>{for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const f=path.posix.join(dir,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.html'))files.push(f);}};walk(folder);}
 files.push(...fs.readdirSync(root).filter(f=>f.endsWith('.html')));
 let count=0;for(const file of files){const full=path.join(root,file),before=fs.readFileSync(full,'utf8'),after=transform(before,file);if(after!==before){fs.writeFileSync(full,after);count++;}}
 console.log('Integrated shared letter game into '+count+' pages/templates.');
}
module.exports={transform,run};if(require.main===module)run();
