/* Extend the existing native SVG artwork with light pencil hatching, no filters. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'grade/lop2/assets/js/topics/colors.js'),'utf8');
const prefix=source.slice(0,source.indexOf('  /* Pencil artwork'));
const context={window:{}};vm.runInNewContext(prefix+';window.words=colorsData;',context);
const directory=path.join(root,'grade/lop2/assets/images/pencil/colors');fs.mkdirSync(directory,{recursive:true});
const records=[];
for(const word of context.window.words){
 const slug=word.name.toLowerCase(),original=word.sourceIcon||word.icon;
 // During rebuild the consumer may already use the new image; recover native art.
 const native=original.startsWith('<svg')?original:null;if(!native)throw Error('Missing source SVG: '+slug);
 let body=native.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
 const colors=[...new Set([...body.matchAll(/fill="(#[0-9a-f]+)"/gi)].map(m=>m[1]))];
 const defs=colors.map((color,i)=>`<pattern id="p${i}" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)"><rect width="3.6" height="3.6" fill="${color}" fill-opacity=".88"/><path d="M0 .5h3.6M0 2.6h3.6" stroke="${color.toLowerCase()==='#ffffff'?'#aab2be':'#fff8e9'}" stroke-opacity=".43" stroke-width=".38"/></pattern>`).join('');
 colors.forEach((color,i)=>body=body.replaceAll(`fill="${color}"`,`fill="url(#p${i})"`));
 const accent=word.hex||'#91a4ab';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="360" height="360"><defs>${defs}</defs><rect width="360" height="360" rx="28" fill="#fffdf6"/><path d="M58 91C119 45 247 38 301 118S282 275 202 303 51 268 45 192" fill="${accent}" fill-opacity=".07" stroke="${accent}" stroke-opacity=".22" stroke-width="1.4" stroke-dasharray="48 8 72 6"/><g transform="translate(52 48) scale(4)" stroke="#50504b" stroke-width=".44" stroke-linecap="round" stroke-linejoin="round">${body}</g><path d="M86 317q94 7 185-3m-159 9 135-2" fill="none" stroke="${accent}" stroke-width="2" stroke-opacity=".35" stroke-linecap="round"/></svg>\n`;
 const file=`grade/lop2/assets/images/pencil/colors/${slug}-pencil-v1.svg`;fs.writeFileSync(path.join(root,file),svg);records.push({id:slug,term:word.name,file,bytes:Buffer.byteLength(svg),nativeVector:true});
}
fs.mkdirSync(path.join(root,'docs/content'),{recursive:true});fs.writeFileSync(path.join(root,'docs/content/colors-pencil-manifest.json'),JSON.stringify(records,null,2));console.log('Built '+records.length+' lightweight pencil SVG illustrations.');
