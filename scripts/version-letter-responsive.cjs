/* Invalidate the shared loader in live pages and keep page builders in sync. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),version='ipad-roomy-20261031',files=[];
function walk(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.(html|cjs)$/.test(e.name))files.push(p);}}
for(const dir of ['grade','templates','scripts'])walk(dir);
for(const file of fs.readdirSync(root))if(file.endsWith('.html'))files.push(file);
let count=0;
for(const file of files){
 const full=path.join(root,file);if(full===__filename)continue;
 const before=fs.readFileSync(full,'utf8');
 const after=before.replace(/(shared\/learner-profile\.js\?v=)[\w-]+/g,'$1'+version).replaceAll('ipados-layout-20261028',version);
 if(after!==before){fs.writeFileSync(full,after);count++;}
}
console.log(`${count} pages/templates/builders updated for the responsive letter game.`);
