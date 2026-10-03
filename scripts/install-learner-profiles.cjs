const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let count=0;
function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){if(f.isDirectory()){if(!['.git','.codex','.agents','artifacts','node_modules','tests','docs','tools'].includes(f.name))walk(path.join(dir,f.name));continue;}if(!f.name.endsWith('.html'))continue;const file=path.join(dir,f.name);let html=fs.readFileSync(file,'utf8');if(!/<head[\s>]/i.test(html))continue;const prefix=path.relative(dir,root).replaceAll('\\','/')||'.';const block=`\n<script src="${prefix}/shared/learner-profile-core.js"></script>\n<script src="${prefix}/shared/learner-profile.js"></script>\n`;html=html.replace(/\s*<script src="[^"]*shared\/learner-profile(?:-core)?\.js"><\/script>/g,'');html=html.replace(/(<head[^>]*>)/i,'$1'+block);fs.writeFileSync(file,html);count++;}}
walk(root);console.log(`Learner profiles installed on ${count} HTML pages and templates.`);
