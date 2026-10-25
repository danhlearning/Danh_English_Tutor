/* Refresh changed game/speech resources in pages, templates and their builders. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),version='game-pacing-20261025';
const names=['learner-profile','young-learner-speech','learning-core','letter-ladder','letter-ladder-core','learning-effects','mixed-review','extended-topic','legacy-game4','legacy-game4-config','primary-grade2-lesson','primary-template-recall','grammar-game','vocabulary-game','primary-game','lesson','spelling-game','render','vocabulary-skills','experience','site-letter-games','contact-footer','vocabulary-library','animals'];
const feedbackAssets=new Set(['letter-ladder.js','primary-grade2-lesson.js','vocabulary-game.js','render.js','vocabulary-skills.js','experience.js']);
const recallAssets=new Set(['letter-ladder.js','letter-ladder-core.js','learning-core.js','learning-effects.js','letter-ladder.css','learning-effects.css']);
const siteAssets=new Set(['letter-ladder-core.js','letter-ladder.js','learning-core.js','site-letter-games.js','contact-footer.js','vocabulary-library.js','vocabulary-game.js','vocabulary-skills.js','vocabulary-skills.css','letter-ladder.css','learning-effects.js','learning-effects.css','animals.js']);
const pattern=new RegExp(`((?:src=["'][^"'\\s<>]*\\/(?:${names.join('|')})\\.js|href=["'][^"'\\s<>]*\\/(?:letter-ladder|learning-effects|vocabulary-skills)\\.css))(?:\\?[^"'\\s<>]*)?`,'g');
const files=[];
function walk(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.(?:html|cjs)$/.test(e.name))files.push(p);}}
for(const dir of ['grade','templates','scripts'])walk(dir);
for(const file of fs.readdirSync(root))if(file.endsWith('.html'))files.push(file);
let count=0;
for(const file of files){if(path.resolve(root,file)===__filename)continue;const p=path.join(root,file),before=fs.readFileSync(p,'utf8'),after=before.replace(pattern,(_,src)=>src+'?v='+(src.endsWith('/vocabulary-library.js')?'meaning-images-20261025':siteAssets.has(src.split('/').pop())?'site-letters-20261025':src.endsWith('/learner-profile.js')?'save-learning-20261025':recallAssets.has(src.split('/').pop())?'recall-gate-20261025':feedbackAssets.has(src.split('/').pop())?'feedback-20261025':version));if(before!==after){fs.writeFileSync(p,after);count++;}}
console.log(`${count} pages/templates/builders now request the updated game resources.`);
