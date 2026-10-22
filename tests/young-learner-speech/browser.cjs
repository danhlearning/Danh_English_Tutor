const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '../..');
const base = process.env.LESSON_BASE_URL || 'http://127.0.0.1:8001';
const files = ['grade/lop2', 'grade/lop4'].flatMap(dir => fs.readdirSync(path.join(root, dir)).filter(x => x.endsWith('.html')).map(name => `${dir}/${name}`)).filter(file => fs.readFileSync(path.join(root,file),'utf8').includes('young-learner-speech.js'));
(async () => {
 const browser = await chromium.launch({headless:true,channel:'msedge'});
 try {
  const context = await browser.newContext({viewport:{width:390,height:844}});
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await context.newPage(), errors=[];
  page.on('pageerror', e=>errors.push(e.message));
  await page.addInitScript(() => {
   window.readings=[];
   window.SpeechSynthesisUtterance=function(text){this.text=text;};
   speechSynthesis.getVoices=()=>[
    {lang:'vi-VN',name:'Vietnamese'}, {lang:'en-US',name:'US basic'},
    {lang:'en-GB',name:'GB basic'}, {lang:'en_US',name:'US Natural'}, {lang:'en-GB',name:'GB Natural'}
   ];
   speechSynthesis.cancel=()=>{};
   speechSynthesis.speak=u=>{readings.push({text:u.text,rate:u.rate,pitch:u.pitch,volume:u.volume,lang:u.lang,voice:u.voice?.name});queueMicrotask(()=>u.onend?.());};
  });
  await page.goto(`${base}/grade/lop2/gsunit1.html`);
  if(await page.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())await page.getByRole('button',{name:'Đăng nhập',exact:true}).click();await page.locator('#learner-name').fill('Kiểm tra đọc chậm');
  await page.getByRole('button',{name:'Vào học ngay',exact:true}).click();
  let pages=0, interactions=0;
  async function verifyRead(label,action){
   const before=await page.evaluate(()=>readings.length);await action();
   await page.waitForFunction(n=>readings.length>n,before);
   const readings=await page.evaluate(n=>window.readings.slice(n),before);
   for(const u of readings){assert.equal(u.rate,.5,label);assert.equal(u.pitch,1,label);assert.equal(u.volume,1,label);assert.equal(u.voice,u.lang==='en-GB'?'GB Natural':'US Natural',label);}
   interactions++;
  }
  for(const file of files.filter(x=>!x.endsWith('lop4.html'))){
   await page.goto(`${base}/${file}`);await page.waitForFunction(()=>window.DanhYoungSpeech);
   assert.equal(await page.evaluate(()=>readings.length),0,`${file}: no autoplay`);
   const html=fs.readFileSync(path.join(root,file),'utf8');
   assert.ok(html.indexOf('young-learner-speech.js')<html.search(/<script src="[^"\n]*(?:topics\/|extended-topic\.js|bodyparts\.js|learning-core\.js|lesson\.js)/),file);
   if(!file.endsWith('animals.html')){
    const button=page.locator('#vocab-grid-container button').filter({hasText:/🔊|Nghe/}).first();
    await verifyRead(`${file}: word`,()=>button.click());
    if(await page.locator('#sentences').count()){
     await page.evaluate(()=>switchTab('sentences'));
     const audio=page.locator('#sentences button').filter({hasText:/🔊|Nghe/}).first();
     if(await audio.count())await verifyRead(`${file}: sentence`,()=>audio.click());
    }
   }
   if(file.endsWith('gsunit1.html')||file.endsWith('unit19.html')){
    for(const tab of ['game-flip','game-mcq','game-spelling']){
     await page.evaluate(id=>switchTab(id),tab);
     const hear=page.locator(`#${tab} button`).filter({hasText:/🔊 Nghe/}).first();
     if(await hear.count())await verifyRead(`${file}:${tab}`,()=>hear.click());
     else {
      const target=await page.evaluate(()=>{const u=window.DanhGrade4Units?.[document.body.dataset.unit] || window.grade2Units?.[document.body.dataset.topic];const topic=document.body.dataset.unit?'g4'+u.id:u.id;const round=JSON.parse(DanhLearners.storage.getItem('danh.learning.'+topic+'.v1')).rounds.mcq;return u.words.find(w=>w.id===round.deck[round.index]).name;});
      await verifyRead(`${file}:mcq answer`,()=>page.getByRole('button',{name:target,exact:true}).click());
     }
    }
   }
   if(file==='grade/lop4/unit4.html'){await page.evaluate(()=>switchTab('lesson3'));await verifyRead('Grade 4 sound groups',()=>page.locator('[data-unit4-say]').first().click());}
   pages++;
  }
  await page.goto(`${base}/grade/lop4/unit19.html`);
  await page.evaluate(()=>DanhGrade4Progress.createStore(DanhLearners.storage).practice('unit19:elephant','spelling',{correct:false,firstTry:false}));
  await page.goto(`${base}/grade/lop4/lop4.html`);
  assert.equal(await page.evaluate(()=>readings.length),0);
  await page.locator('#review-start').click();
  await verifyRead('Grade 4 review',()=>page.getByRole('button',{name:'🔊 Nghe',exact:true}).click());
  assert.ok(await page.evaluate(()=>DanhYoungSpeech.timeoutFor('A long sentence. '.repeat(15))>40000));
  // A different-language voice must never be selected when English is unavailable.
  assert.equal(await page.evaluate(()=>{speechSynthesis.getVoices=()=>[{lang:'vi-VN',name:'Vietnamese'}];return DanhYoungSpeech.configure(new SpeechSynthesisUtterance('hello')).voice;}),null);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({pages:pages+1,interactions,noAutoplay:true,rate:.5,pitch:1,localeMatched:true,pageErrors:errors.length}));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
