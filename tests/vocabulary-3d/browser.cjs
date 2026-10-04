const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=path.resolve(__dirname,'../..');
const inventory=require('../../artifacts/vocabulary-3d/inventory.json');
const out=path.join(root,'artifacts/vocabulary-3d');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8001/grade/lop2/gsunit1.html');
  await page.locator('#learner-name').fill('Bạn học thử');
  await page.getByRole('button',{name:'Vào học ngay',exact:true}).click();
  await page.waitForFunction(()=>window.DanhLearners.current?.name==='Bạn học thử');
  const grades=[[2,16],[4,20]].filter(([grade])=>!process.env.ONLY_GRADE || grade===Number(process.env.ONLY_GRADE));
  for(const [grade,count] of grades)for(let n=1;n<=count;n++){
    const unit=grade===2?`gsunit${n}`:`unit${n}`;
    await page.goto(`http://127.0.0.1:8001/grade/lop${grade}/${unit}.html`);
    await page.waitForSelector('#vocab-grid-container .danh-vocabulary-art');
    const result=await page.evaluate(async()=>{
      const art=[...document.querySelectorAll('#vocab-grid-container .danh-vocabulary-art')];
      const sizes=await Promise.all(art.map(svg=>new Promise(resolve=>{const img=new Image();img.onload=()=>resolve({width:img.naturalWidth,height:img.naturalHeight,display:svg.getBoundingClientRect().width});img.onerror=()=>resolve(null);img.src=svg.querySelector('image').getAttribute('href');})));
      const gaps=[...document.querySelectorAll('.g4-word-card')].map(card=>card.querySelector('h3').getBoundingClientRect().left-card.querySelector('svg').getBoundingClientRect().right);
      return {sizes,gaps,overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    assert.equal(result.sizes.length,inventory.filter(x=>x.grade===grade&&x.unit===unit).length,unit);
    assert.ok(result.sizes.every(s=>s&&s.width<=360&&s.height<=360&&s.display<=110&&s.display>50),unit);
    assert.equal(result.overflow,false,unit);
    assert.ok(result.gaps.every(gap=>gap>=8),unit+' picture/text gap');
    if(n===1 || (grade===4&&n===20)){
      for(const tab of ['game-flip','game-mcq','game-spelling',grade===2?'game-count':'game-context']){
        await page.evaluate(id=>window.switchTab(id),tab);
        await page.waitForTimeout(100);
        assert.ok(await page.locator(`#${tab} .danh-vocabulary-art`).count()>0,`${unit}:${tab}`);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        if(grade===2&&tab==='game-flip'){
          await page.locator('#game-flip .learning-card-front svg').click();
          assert.ok(await page.locator('#game-flip .learning-card').evaluate(card=>card.classList.contains('is-flipped')));
        }
      }
      await page.evaluate(()=>window.switchTab('vocab'));
      await page.screenshot({path:path.join(out,`grade${grade}-${unit}-mobile.png`),fullPage:true});
    }
  }
  if(!process.env.ONLY_GRADE || process.env.ONLY_GRADE==='4'){
    await page.setViewportSize({width:1280,height:900});
    await page.goto('http://127.0.0.1:8001/grade/lop4/unit19.html');
    await page.waitForSelector('.danh-vocabulary-art');
    await page.screenshot({path:path.join(out,'grade4-animals-desktop.png'),fullPage:true});
    await page.evaluate(()=>window.switchTab('game-mcq'));
    const question=await page.evaluate(()=>{
      const round=JSON.parse(DanhLearners.storage.getItem('danh.learning.g4unit19.v1')).rounds.mcq;
      const target=round.deck[round.index], options=round.answers[round.index].options;
      return {right:options.indexOf(target),wrong:options.findIndex(id=>id!==target)};
    });
    await page.locator('#game-mcq .learning-options button').nth(question.wrong).locator('svg').click();
    assert.equal(await page.locator('#game-mcq .learning-feedback').getAttribute('data-kind'),'wrong');
    await page.locator('#game-mcq .learning-options button').nth(question.right).locator('svg').click();
    assert.equal(await page.locator('#game-mcq .learning-feedback').getAttribute('data-kind'),'correct');
    const mcq=await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh.learning.g4unit19.v1')).rounds.mcq);
    assert.equal(mcq.answers[0].solved,true);
    assert.ok(mcq.answers[0].mistakes>0);
    await page.evaluate(()=>window.switchTab('game-spelling'));
    const name=await page.evaluate(()=>{
      const round=JSON.parse(DanhLearners.storage.getItem('danh.learning.g4unit19.v1')).rounds.spelling;
      return DanhGrade4Units.unit19.words.find(word=>word.id===round.deck[round.index]).name;
    });
    const input=page.locator('#game-spelling .learning-spelling input');
    await input.fill('try again');await input.press('Enter');
    assert.equal(await page.locator('#game-spelling .learning-feedback').getAttribute('data-kind'),'wrong');
    await input.fill(name);await input.press('Enter');
    assert.equal(await page.locator('#game-spelling .learning-feedback').getAttribute('data-kind'),'correct');
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://127.0.0.1:8001/grade/lop4/lop4.html');
    await page.locator('#review-start').click();
    await page.waitForSelector('#review-stage .danh-vocabulary-art');
    assert.ok(await page.locator('#review-stage .danh-vocabulary-art').evaluate(svg=>svg.getBoundingClientRect().width<=130));
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.screenshot({path:path.join(out,'grade4-review-mobile.png'),fullPage:true});
  }
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log(`PASS: ${grades.reduce((n,g)=>n+g[1],0)} Unit pages, all images decode, four games, compact mobile layout, no page errors.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
