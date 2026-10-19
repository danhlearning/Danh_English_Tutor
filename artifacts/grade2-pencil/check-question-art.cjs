const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});
 try{
  const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8001')?r.continue():r.abort());
  const p=await c.newPage();await p.goto('http://127.0.0.1:8001');
  await p.locator('#learner-name').fill('Kiểm tra câu có tranh');
  await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>DanhLearners.current);
  const topics=JSON.parse(fs.readFileSync(__dirname+'/inventory.json','utf8').replace(/^\uFEFF/,'')).filter(t=>t.topic!=='numbers');
  const records=[];
  for(const t of topics){
   await p.goto('http://127.0.0.1:8001/grade/lop2/'+t.topic+'.html');
   await p.locator('nav .g2-games-tab').click();await p.locator('[data-game=game-count]').click();
   const rows=await p.evaluate(()=>{
    const questions=typeof sentenceQuestions!=='undefined'?sentenceQuestions:typeof countGameQuestions!=='undefined'?countGameQuestions:typeof dateQuestions!=='undefined'?dateQuestions:[];
    return questions.map(q=>{
     countList=[q];countIdx=0;loadCountQuestion();
     return {target:q.target||q.itemSingular,prompt:q.prompt,answer:q.answer,
      art:!!document.querySelector('#game-count .pencil-art')};
    });
   });
   const missing=rows.filter(r=>!r.art);
   assert(missing.every(r=>t.topic==='familyfriends'&&['who is this','who is that'].includes(r.target)),JSON.stringify({topic:t.topic,missing}));
   if(t.topic==='familyfriends'){
    await p.evaluate(()=>{countList=[sentenceQuestions.find(q=>q.target==='friends these')];countIdx=0;loadCountQuestion();});
    assert(await p.locator('#game-count image').evaluate(n=>n.getAttribute('href').endsWith('familyfriends/friend-v1.webp')));
    await p.screenshot({path:__dirname+'/friends-plural-game-mobile.png',fullPage:true});
   }
   records.push({topic:t.topic,total:rows.length,rendered:rows.length,missing});
  }
  const total=records.reduce((s,r)=>s+r.total,0);
  fs.writeFileSync(__dirname+'/question-art-checked.json',JSON.stringify({passed:true,total,records},null,2));
  console.log(`PASS ${total} sentence/count/date templates rendered; only two generic who questions keep symbols`);
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
