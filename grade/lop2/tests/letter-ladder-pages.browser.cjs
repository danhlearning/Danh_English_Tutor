const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
const key=text=>{let h=2166136261;for(const c of text.replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase())h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16).padStart(8,'0');};
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await c.addInitScript(()=>{let api;Object.defineProperty(window,'DanhLetterLadder',{get(){return api;},set(value){api=value;const mount=value.mount;value.mount=options=>{window.lessonWords=options.words;return mount(options);};}});});
 const p=await c.newPage(),errors=[],missing=[],names=new Set();p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 const pages=fs.readdirSync('grade/lop2').filter(n=>n.endsWith('.html')&&fs.readFileSync('grade/lop2/'+n,'utf8').includes('src="./assets/js/learning-core.js'));
 for(const page of pages){await p.goto(base+'/grade/lop2/'+page+'?game=letters');await p.locator('.ll-slot').first().waitFor();assert(await p.locator('.tab-content.active .ll-slot').isVisible());assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),page);const words=await p.evaluate(()=>lessonWords.map(w=>w.name));for(const name of words){assert(fs.existsSync('shared/answer-audio/'+key(name)+'.wav'),page+' '+name);names.add(name);}console.log('PASS letter game and internal audio: '+page);}
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log('PASS '+pages.length+' grade 2 pages, '+names.size+' distinct word spellings with internal WAV fallback');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
