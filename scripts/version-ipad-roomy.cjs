/* Refresh the shared tablet frame, tap feedback and letter-game flow. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),version='ipad-roomy-20261031',files=[];
function walk(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){if(['tests','node_modules'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.(html|cjs)$/.test(e.name))files.push(p);}}
for(const dir of ['grade','templates','scripts'])walk(dir);
for(const file of fs.readdirSync(root))if(file.endsWith('.html'))files.push(file);
files.push('shared/learner-profile.js','shared/tablet-game.js');
let count=0;
for(const file of files){const full=path.join(root,file);if(full===__filename)continue;const before=fs.readFileSync(full,'utf8');
 const after=before.replace(/((?:src|href)=["'][^"'\s<>]*\/(?:learner-profile|letter-ladder|learning-effects)\.(?:js|css))(?:\?[^"'\s<>]*)?/g,(_,asset)=>asset+'?v='+version).replace(/(shared\/tablet-game\.(?:js|css)\?v=)[\w-]+/g,'$1'+version).replaceAll('letter-responsive-20261031',version);
 if(after!==before){fs.writeFileSync(full,after);count++;}
}
console.log(`${count} pages/templates/builders updated for roomy iPad games.`);
