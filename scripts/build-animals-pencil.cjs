/* Reproducible pencil adaptation of Twemoji 14.0.2, CC BY 4.0. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const codes='dog:1f415 cat:1f408 mouse:1f401 rabbit:1f407 hamster:1f439 fox:1f98a bear:1f43b panda:1f43c tiger:1f405 lion:1f981 cow:1f404 pig:1f416 frog:1f438 monkey:1f412 chicken:1f414 duck:1f986 bird:1f426 eagle:1f985 owl:1f989 penguin:1f427 bat:1f987 wolf:1f43a horse:1f40e zebra:1f993 giraffe:1f992 elephant:1f418 rhinoceros:1f98f hippopotamus:1f99b crocodile:1f40a snake:1f40d turtle:1f422 whale:1f40b dolphin:1f42c seal:1f9ad fish:1f41f shark:1f988 octopus:1f419 crab:1f980 butterfly:1f98b bee:1f41d ant:1f41c spider:1f577 kangaroo:1f998 camel:1f42b sheep:1f411 goat:1f410 deer:1f98c squirrel:1f43f snail:1f40c koala:1f428'.split(' ').map(s=>s.split(':'));
const sourceDir=path.join(root,'docs/content/animals-pencil-source'),output=path.join(root,'grade/lop2/assets/images/pencil/animals');
async function main(){
 const manifestFile=path.join(root,'docs/content/animals-pencil-manifest.json');
 const current=fs.existsSync(manifestFile)?JSON.parse(fs.readFileSync(manifestFile,'utf8')):[];
 if(current.length===50&&current.every(item=>item.generatedWith==='built-in image_gen')){
  for(const item of current)for(const file of [item.file,item.compact])if(!fs.existsSync(path.join(root,file)))throw Error('Missing generated artwork: '+file);
  console.log('Validated 50 generated Animals illustrations; preserved the selected v2 artwork.');return;
 }
 fs.mkdirSync(sourceDir,{recursive:true});fs.mkdirSync(output,{recursive:true});
 if(process.argv.includes('--fetch')){
  for(let i=0;i<codes.length;i+=5)await Promise.all(codes.slice(i,i+5).map(async([name,code])=>{const r=await fetch(`https://raw.githubusercontent.com/twitter/twemoji/v14.0.2/assets/svg/${code}.svg`);if(!r.ok)throw Error(name+': '+r.status);fs.writeFileSync(path.join(sourceDir,name+'.svg'),await r.text());}));
  const r=await fetch('https://raw.githubusercontent.com/twitter/twemoji/v14.0.2/LICENSE-GRAPHICS');if(!r.ok)throw Error('License download');fs.writeFileSync(path.join(sourceDir,'LICENSE.txt'),(await r.text()).split('\n').map(line=>line.trimEnd()).join('\n'));
 }
 const records=[];
 for(const [name,code] of codes){
  const original=fs.readFileSync(path.join(sourceDir,name+'.svg'),'utf8');
  if(/<(?:script|filter|text|image)\b|\bon\w+=|href=/i.test(original))throw Error('Unsafe artwork '+name);
  let body=original.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  const colors=[...new Set([...body.matchAll(/fill="(#[0-9a-f]+)"/gi)].map(m=>m[1]))];
  const defs=colors.map((c,i)=>`<pattern id="p${i}" width=".72" height=".72" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)"><rect width=".72" height=".72" fill="${c}" fill-opacity=".88"/><path d="M0 .16h.72M0 .5h.72" stroke="#fffaf0" stroke-opacity=".4" stroke-width=".085"/></pattern>`).join('');
  colors.forEach((c,i)=>{body=body.replaceAll(`fill="${c}"`,`fill="url(#p${i})"`);});
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="360" height="360"><!-- Pencil adaptation of Twemoji 14.0.2 by Twitter and contributors, CC BY 4.0. Source: https://github.com/twitter/twemoji --><defs>${defs}</defs><rect width="360" height="360" rx="28" fill="#fffdf6"/><path d="M52 114C94 47 250 36 302 132S267 296 165 305 43 251 47 177" fill="#abc9ac" fill-opacity=".09" stroke="#9eae8e" stroke-opacity=".26" stroke-width="1.4" stroke-dasharray="49 7 70 9"/><g transform="translate(36 30) scale(8)" stroke="#55534a" stroke-opacity=".7" stroke-width=".12" stroke-linejoin="round" stroke-linecap="round">${body}</g><path d="M89 326q88 4 181-2m-153 8 122-3" fill="none" stroke="#8b9b73" stroke-width="1.7" stroke-opacity=".35" stroke-linecap="round"/></svg>\n`;
  const file=`grade/lop2/assets/images/pencil/animals/${name}-pencil-v1.svg`;fs.writeFileSync(path.join(root,file),svg);
  records.push({id:name,file,bytes:Buffer.byteLength(svg),source:`https://github.com/twitter/twemoji/blob/v14.0.2/assets/svg/${code}.svg`,credit:'Twitter and contributors; pencil adaptation by Danh English Tutor',license:'CC-BY-4.0'});
 }
 fs.writeFileSync(path.join(root,'docs/content/animals-pencil-manifest.json'),JSON.stringify(records,null,2));
 console.log(`Built ${records.length} pencil animals (${records.reduce((n,r)=>n+r.bytes,0)} bytes total).`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
