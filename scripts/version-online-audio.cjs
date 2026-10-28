/* Refresh online audio, retirement migration, and image entry points. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),version='online-audio-20261028';
const names='learner-profile|young-learner-speech|contact-footer|pwa|offline|unit-pencil-art|bodyparts-diagrams|animals|vocabulary-library';
const pattern=new RegExp(`((?:src|href)=["'][^"'\\s<>]*\\/(?:${names})\\.js)(?:\\?[^"'\\s<>]*)?`,'g');
const files=[];
function walk(dir){for(const entry of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){if(['tests','node_modules'].includes(entry.name))continue;const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(?:html|cjs)$/.test(file))files.push(file);}}
for(const dir of ['grade','templates','scripts'])walk(dir);
for(const file of fs.readdirSync(root))if(file.endsWith('.html'))files.push(file);
for(const file of files){if(path.resolve(root,file)===__filename)continue;const full=path.join(root,file),before=fs.readFileSync(full,'utf8'),after=before.replace(pattern,(_,asset)=>asset+'?v='+(asset.endsWith('/learner-profile.js')?'ipados-layout-20261028':version));if(before!==after)fs.writeFileSync(full,after);}
