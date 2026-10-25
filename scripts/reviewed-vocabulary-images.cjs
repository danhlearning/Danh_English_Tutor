/* Reapply approved vocabulary images when rebuilding a secondary course. */
const path=require('node:path');
const approved=require('../docs/content/vocabulary-image-repairs-20261025.json');
const normal=s=>String(s||'').normalize('NFC').trim().toLowerCase().replace(/\s+/g,' ');
function apply(grade,units){
 for(const unit of units)for(const word of unit.words){
  const item=approved.find(r=>r.locations.some(l=>l.includes(`grade/lop${grade}/`))&&normal(r.term)===normal(word.term)&&normal(r.meaning)===normal(word.meaning));
  if(item)word.image=path.posix.relative(`grade/lop${grade}`,item.image);
 }return units;
}
module.exports={apply};
