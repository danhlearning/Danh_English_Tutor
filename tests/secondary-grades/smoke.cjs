const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});try{
 const ctx=await browser.newContext({viewport:{width:390,height:844}}),p=await ctx.newPage();await ctx.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await p.goto(base+'/grade/lop8/unit12.html');if(await p.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).isVisible())await p.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).click();await p.locator('#learner-name').fill('Kiểm tra kỹ năng riêng');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Kiểm tra kỹ năng riêng');
 for(const grade of [8,9]){
  await p.goto(base+`/grade/lop${grade}/unit12.html`);await p.locator('[data-tab=spelling]').click();
  assert.equal(await p.evaluate(g=>DanhLearners.storage.getItem(`danh-g${g}-unit12`),grade),null);
  const answer=await p.evaluate(g=>{const prompt=document.querySelector('#spelling-stage h3').textContent;return window[`DanhGrade${g}Units`][11].words.find(w=>prompt===`Gõ tiếng Anh cho: ${w.meaning}`).term;},grade);
  await p.locator('#spelling-stage input').fill(answer);await p.locator('#spelling-stage button[type=submit]').click();assert.match(await p.locator('#spelling-stage').textContent(),/Đúng rồi/);
  assert.equal(await p.evaluate(g=>DanhLearners.storage.getItem(`danh-g${g}-unit12`),grade),null);
 }
 for(const grade of [6,7])for(const term of [1,2]){
  await p.goto(base+`/grade/lop${grade}/vocabulary-review.html?term=${term}`);await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();assert.equal(await p.locator('.g6-choice').count(),4);
  const state=await p.evaluate(({grade,term})=>JSON.parse(DanhLearners.storage.getItem(`danh-g${grade}-vocabulary-game-term${term}-v1`)).active,{grade,term});assert.equal(state.items.length,10);
 }
 await p.goto(base+'/grade/lop9/grammar.html?unit=12');await p.locator('input[name=level][value=hard]').check();await p.locator('#start').click();
 for(let i=0;i<7;i++){
  const q=await p.evaluate(()=>{const a=JSON.parse(DanhLearners.storage.getItem('danh-g9-grammar-v1')).active;return DanhGrade9Grammar.find(q=>q.id===a.items[a.position]);});
  if(q.type==='choice'&&q.prompt.includes('long journey')){assert.ok(!/dùng despite/i.test(await p.locator('#question-prompt').textContent()));await p.screenshot({path:require('node:path').resolve(__dirname,'../../artifacts/secondary-grades/grade9-grammar-play-mobile-final.png'),fullPage:true});break;}
  await p.evaluate(q=>{
   const answer=q.answer.split('|')[0],area=document.getElementById('answer-area');
   if(q.type==='choice')[...area.querySelectorAll('button')].find(b=>b.textContent.slice(3)===answer).click();
   else if(q.type==='order'){for(const part of q.parts)[...area.querySelectorAll('.gg-token')].find(b=>!b.disabled&&b.textContent===part).click();[...area.querySelectorAll('button')].find(b=>b.textContent==='Kiểm tra câu').click();}
   else{area.querySelector('input,textarea').value=answer;area.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));}
   document.getElementById('next').click();
  },q);
 }
 console.log('PASS: gõ từ độc lập; ôn học kỳ lớp 6/7; đề chọn từ nối lớp 9 không chép đáp án vào hướng dẫn.');
 await ctx.close();
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
