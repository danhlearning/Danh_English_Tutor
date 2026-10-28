/* Refresh only the resources changed by the loading/interaction fix. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),version='loading-smooth-20261028';
const names='learner-profile\\.js|learning-effects\\.js|site-preload\\.js|pencil-illustrations\\.(?:js|css)|picture-audio\\.js|lesson\\.js';
const pattern=new RegExp(`((?:src|href)=["'][^"'\\s<>]*\\/(?:${names}))(?:\\?[^"'\\s<>]*)?`,'g');
const files=[];
function walk(dir){for(const entry of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){if(['tests','node_modules'].includes(entry.name))continue;const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(?:html|cjs)$/.test(file))files.push(file);}}
for(const dir of ['grade','templates','scripts'])walk(dir);
for(const file of fs.readdirSync(root))if(file.endsWith('.html'))files.push(file);
let count=0;
for(const file of files){if(path.resolve(root,file)===__filename)continue;const full=path.join(root,file),before=fs.readFileSync(full,'utf8'),after=before.replace(pattern,(_,asset)=>asset+'?v='+version);if(before!==after){fs.writeFileSync(full,after);count++;}}
console.log(`${count} pages, templates and builders request the updated loading resources.`);
