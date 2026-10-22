const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'shared/assets/primary-vocabulary');
fs.mkdirSync(folder,{recursive:true});
const slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const aliases={mum:'mother',dad:'father','stand up':'stand','sit down':'sit',reading:'read',walking:'on foot',visited:'visit',played:'play games',watched:'watch TV',helped:'helpful',went:'on foot',bicycle:'bike','school bag':'bag','draw pictures':'draw',singing:'sing',dancing:'dance',cooking:'cook dinner',cycling:'ride a bike'};
const scenes={
 hello:'Two children smiling and waving hello face to face at a school entrance.',goodbye:'A child with a backpack waving goodbye as a friend leaves through a gate.',yes:'A smiling child nodding in agreement, hands relaxed. No symbols.',no:'A child gently shaking their head and raising an open hand to politely decline. No symbols.',
 mother:'A caring mother helping her young child put on a backpack.',father:'A father reading a picture book with his young child.',
 eye:'Close-up of a friendly child face, head turned slightly so one open eye is the clear focal feature. Keep entire face intact.',ear:'Side portrait of a child with hair tucked behind one clearly visible ear. Intact face and neck.',nose:'Close-up of a child gently touching their nose with one finger. Intact friendly face.',mouth:'Close-up of a friendly child face with mouth slightly open, mouth clearly the focal point.',head:'Friendly child portrait from shoulders up, entire head fully visible.',
 one:'Exactly ONE large red apple centered on a tabletop. No digits.',two:'Exactly TWO red apples side by side on a tabletop. No digits.',three:'Exactly THREE red apples in a row on a tabletop. No digits.',four:'Exactly FOUR red apples in a two by two arrangement on a tabletop. No digits.',
 red:'A bright solid RED balloon, tied ribbon, isolated.',blue:'A bright solid BLUE balloon, tied ribbon, isolated.',green:'A bright solid GREEN balloon, tied ribbon, isolated.',yellow:'A bright solid YELLOW balloon, tied ribbon, isolated.',black:'A solid BLACK balloon, tied ribbon, isolated.',white:'A solid WHITE balloon against a soft pale blue backdrop, tied ribbon, isolated.',
 big:'A very large teddy bear next to a tiny teddy bear, large bear clearly foregrounded.',small:'A tiny teddy bear next to a large teddy bear, tiny bear clearly foregrounded.',
 my:'A child holding their own backpack close to their chest and pointing to themselves.',your:'A child offering a school backpack to another child, looking at the recipient.',what:'A curious child looking into an open mystery gift box, wondering what is inside. No question mark.',name:'A child proudly showing a blank name badge attached to their school shirt. Leave badge blank.',fine:'A cheerful healthy child stretching with a relaxed smile.',
 always:'A child brushing teeth in the morning, with seven small unlettered calendar day cards all showing the same repeated daily routine.',usually:'A child eating breakfast, next to a simple unlettered weekly chart with five breakfast pictures and two empty cells.',sometimes:'A child reading comics, with a small unlettered weekly chart showing two reading pictures and five empty cells.',never:'A child choosing water while a fizzy drink stays untouched at the far side of the table. No symbols.',
 address:'A cozy Vietnamese house seen from front, blank rectangular address plaque beside the door, no writing.',live:'A family standing in the doorway of their cozy home.',hometown:'A peaceful small Vietnamese hometown with homes, trees and a local lane.',future:'A schoolchild imagining themselves as a grown-up explorer, dreamlike soft vignette above them.',
 friendly:'Two smiling children greeting a new child warmly at school.',kind:'A child sharing a snack with a friend.',helpful:'A child helping another pick up fallen books.',clever:'A child completing a wooden shape puzzle with a happy thoughtful expression.',shy:'A quiet child standing a little behind a friendly classmate, bashful smile.',
 character:'A storybook open to a large illustration of a single friendly fox story character, no writing.',brave:'A child confidently guiding a smaller child across a safe stepping-stone path.',gentle:'A child carefully stroking a small rabbit, calm and gentle.', 'hard-working':'A child concentrating on schoolwork at a tidy desk, several completed pages nearby, no readable writing.',ending:'A closed storybook with a happy fox family scene on its cover, no letters.',
 headache:'A child sitting safely with one hand gently on their forehead, uncomfortable but calm.',toothache:'A child holding their cheek near the jaw with a mild uncomfortable expression.', 'sore throat':'A child with a scarf gently touching the front of their neck, calm expression.',fever:'A child resting in bed while a parent holds a thermometer, no numbers visible.',
 opposite:'A small post office building directly across a simple straight street from a green park, clearly facing each other.',between:'A small pharmacy building positioned exactly between a bank building and a grocery shop. No writing.', 'turn left':'An aerial view of a child walking along a garden path that bends clearly to the LEFT. No arrows or symbols.', 'go straight':'A child walking along one straight garden path towards a school in the distance. No arrows.',
 warm:'A child enjoying comfortable sunshine in a spring garden, light cardigan, blooming flowers.',cool:'A child in a light jacket enjoying a fresh autumn breeze and falling leaves.',quiet:'A calm empty village lane, tranquil pond and trees.',busy:'A lively city street with pedestrians and several vehicles in safe separate lanes.',beautiful:'A lush flower garden with a clear pond and colorful blossoms.',
 plan:'A child planning a trip at a desk with a blank calendar, small map and backpack, no writing.',learn:'A child studying a picture book at a desk with an encouraging adult nearby.',improve:'A child proudly comparing a simple early drawing with a noticeably more skillful finished drawing.',together:'Three children working together to build a wooden block bridge.',
 bag:'One turquoise school BACKPACK with two shoulder straps and a front zipped pocket. Not a handbag.',car:'One small red toy car with obvious toy scale beside a child hand.',
 open:'Two hands opening a plain picture book, pages visibly parting.',close:'Two hands closing a plain picture book, covers nearly touching.',
 touch:'A child gently touching a soft toy with one fingertip.',careful:'A child walking slowly and carefully past a small puddle without stepping in.',knife:'One kitchen knife lying safely flat on a countertop, no people holding it, rounded ordinary kitchen context.',
 rest:'A child resting comfortably on a sofa under a light blanket.',rubbish:'A small pile of discarded paper and empty packaging beside a waste bin.',clean:'A sparkling tidy classroom with a child finishing wiping a desk.',reuse:'A child using a washed empty jar as a pencil holder.',recycle:'A child sorting paper and plastic bottles into separate plain bins, no symbols or text.', 'save water':'A child turning off a running tap while brushing teeth.', 'plant trees':'Two children planting a young tree in soil with an adult nearby.',
 improve:'A child comparing a first simple block tower with a later taller stable tower they built, showing visible progress.',
};
let manifest={};try{manifest=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json'),'utf8'));}catch{}
let previous=[];try{previous=JSON.parse(fs.readFileSync(path.join(root,'docs/primary-image-prompts.json'),'utf8'));}catch{}
const jobs=[],bank=[];
for(const grade of [1,3,5]){const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,`grade/lop${grade}/units.js`),'utf8'),c);for(const u of c.window.DanhPrimaryCourse?.units||c.window.DanhGrade3Units)bank.push(...u.words);}
const all=new Map(bank.map(w=>[w.term,w]));
function resolve(term){
  if(manifest[term]){
    const entry=manifest[term],old=previous.find(j=>entry.src.endsWith('/'+j.slug+'-v1.webp'));
    if(entry.source==='imagegen'&&!fs.existsSync(path.join(root,'grade/lop1',entry.src))&&old&&!jobs.some(j=>j.slug===old.slug))jobs.push(old);
    return entry;
  }
  const w=all.get(term),target=aliases[term]||term,s=slug(target);
  if(aliases[term]){const result=resolve(target);manifest[term]=result;return result;}
  const exact=path.join(root,`shared/assets/vocabulary-3d/${s}-3d-v1.webp`);
  if(term!=='bag'&&fs.existsSync(exact)){return manifest[term]={src:`../../shared/assets/vocabulary-3d/${s}-3d-v1.webp`,source:'existing-ai'};}
  if(w&&/^[a-z-]+$/.test(w.art)&&w.art!=='bag'){
    const p=path.join(root,`shared/assets/vocabulary-3d/${w.art}-3d-v1.webp`);
    if(fs.existsSync(p))return manifest[term]={src:`../../shared/assets/vocabulary-3d/${w.art}-3d-v1.webp`,source:'existing-ai'};
  }
  const approved={dog:'animals',hand:'bodyparts',apple:'fruits',run:'verbs',bike:'transport',bus:'transport',train:'transport',plane:'transport'};
  if(approved[term])return manifest[term]={src:`../../grade/lop2/assets/images/approved/${approved[term]}/${s}-photo-v1.webp`,source:'existing-ai'};
  const src=`../../shared/assets/primary-vocabulary/${s}-v1.webp`;
  const entry=manifest[term]={src,source:'imagegen',original:`${s}-v1.png`};
  if(!fs.existsSync(path.join(folder,`${s}-v1.webp`))&&!jobs.some(j=>j.slug===s))jobs.push({slug:s,term,meaning:w?.meaning||term,prompt:`Use case: stylized-concept. Finished standalone square vocabulary picture for a Vietnamese children's English learning website. Illustrate the English word or phrase "${target}" (meaning: ${w?.meaning||target}). ${scenes[target]||`Show one clear, literal, child-friendly subject or scene that unambiguously represents ${target}.`} Match polished adorable 3D clay-style vocabulary art: warm cream or very light pastel background, soft studio lighting, rounded forms, believable proportions, distinct subject filling most of frame, uncluttered and legible at 160px. People have natural anatomy, friendly faces, ordinary Vietnamese/Asian school-age children where appropriate. This is a pictorial scene or object, not a flat icon, emoji, sticker, diagram or contact sheet. No text, letters, captions, logos, watermarks, arrows, or invented symbols. Preserve the exact meaning; no unrelated objects.`});
  return entry;
}
for(const term of all.keys())resolve(term);
fs.writeFileSync(path.join(folder,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(root,'docs/primary-image-prompts.json'),JSON.stringify([...new Map([...previous,...jobs].map(j=>[j.slug,j])).values()],null,2)+'\n');
console.log(JSON.stringify({unique:all.size,manifest:Object.keys(manifest).length,newImages:jobs.length}));
