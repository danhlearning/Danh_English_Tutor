const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),version='review-letters-20261031';let count=0;
function refresh(before){return before.replace(/\b(src|href)=(["'])([^"'<>`\r\n]*\/(?:learner-profile|letter-ladder(?:-core)?|letter-review|mixed-review(?:-core)?|site-letter-games|vocabulary-game|vocabulary-review)\.(?:js|css))(?:\?[^"'<>`\s]*)?\2/g,(_,attr,quote,asset)=>`${attr}=${quote}${asset}?v=${version}${quote}`);}
function file(p){const full=path.join(root,p),before=fs.readFileSync(full,'utf8'),after=refresh(before);if(after!==before){fs.writeFileSync(full,after);count++;}}
function visit(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){if(['.git','node_modules','artifacts','tmp','tests'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())visit(p);else if(/\.(html|cjs)$/.test(e.name)&&p!==path.relative(root,__filename))file(p);}}
for(const dir of ['grade','templates','scripts'])visit(dir);
for(const p of fs.readdirSync(root).filter(p=>p.endsWith('.html')))file(p);
console.log(count+' review letter cache references refreshed.');
