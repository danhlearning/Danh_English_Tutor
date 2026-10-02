// Manual browser check: PLAYWRIGHT_MODULE may point to a locally available runtime.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const base = process.env.LESSON_BASE_URL || 'http://127.0.0.1:8001';
const output = path.resolve(__dirname, '../../../artifacts/grade7-preview');
fs.mkdirSync(output, { recursive: true });
const exact = text => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.route(/https:\/\/fonts\./, route => route.fulfill({ status: 200, body: '' }));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}/index.html`);
    assert.equal(await page.locator('a[href="grade/lop7/lop7.html"]').count(), 1);
    await page.goto(`${base}/grade/lop7/lop7.html`);
    assert.equal(await page.locator('#unit-list a').count(), 12);
    await page.screenshot({ path: path.join(output, 'catalog-mobile.png'), fullPage: true });
    for (let unit = 1; unit <= 12; unit++) {
      await page.goto(`${base}/grade/lop7/unit${unit}.html`);
      assert.equal(await page.locator('.g6-word-card').count(), 8);
      assert.ok(!(await page.title()).includes('lớp 6'));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      for (const tab of ['flashcards', 'quiz', 'spelling', 'grammar', 'vocabulary']) {
        await page.locator(`[data-tab="${tab}"]`).click();
        assert.ok(await page.locator(`#${tab}`).isVisible());
      }
      const images = await page.evaluate(() => window.DanhGrade7Units.find(u => u.id === document.body.dataset.unit).words.filter(w => w.image).map(w => w.image));
      for (const image of images) {
        const response = await page.request.get(`${base}/grade/lop7/${image.replace(/^\.\//, '')}`);
        assert.equal(response.status(), 200, image);
      }
    }
    await page.goto(`${base}/grade/lop7/unit1.html`);
    const words = await page.evaluate(() => window.DanhGrade7Units[0].words);
    await page.locator('[data-tab="flashcards"]').click();
    for (let index = 1; index < 8; index++) await page.locator('#flash-next').click();
    assert.equal(await page.locator('#flashcard img').count(), 0);
    await page.locator('#flashcard').click();
    assert.equal(await page.locator('#flashcard img').count(), 1);
    await page.locator('#flashcard').screenshot({ path: path.join(output, 'creativity-flashcard.png') });
    await page.locator('[data-tab="quiz"]').click();
    for (let index = 0; index < 8; index++) {
      const heading = await page.locator('#quiz-stage h3').textContent();
      const word = words.find(w => heading.includes(`“${w.term}”`));
      assert.ok(word);
      await page.locator('#quiz-stage').getByRole('button', { name: word.meaning, exact: true }).click();
      await page.locator('#quiz-stage .g6-primary').click();
    }
    assert.ok((await page.locator('#quiz-stage h3').textContent()).includes('8/8'));
    await page.locator('[data-tab="spelling"]').click();
    for (let index = 0; index < 8; index++) {
      const heading = await page.locator('#spelling-stage h3').textContent();
      const word = words.find(w => heading === `Gõ tiếng Anh cho: ${w.meaning}`);
      await page.locator('#spelling-stage input').fill(word.term);
      await page.locator('#spelling-stage button[type="submit"]').click();
      await page.locator('#spelling-stage button').filter({ hasText: 'Từ tiếp theo' }).click();
    }
    assert.ok((await page.locator('#spelling-stage h3').textContent()).includes('8/8'));
    await page.goto(`${base}/grade/lop7/grammar.html`);
    await page.locator('#sound-toggle').evaluate(button => button.click());
    const types = new Set();
    for (let unit = 1; unit <= 12; unit++) {
      for (const level of ['easy', 'medium', 'hard']) {
        await page.locator('#unit-select').selectOption(String(unit));
        await page.locator(`input[name="level"][value="${level}"]`).check({ force: true });
        await page.locator('#start').click();
        let rewrites = 0;
        for (let step = 0; step < 10; step++) {
          const question = await page.evaluate(({ unit, level }) => {
            const prompt = document.getElementById('question-prompt').textContent;
            const source = document.querySelector('.gg-rewrite-source p')?.textContent;
            const tokens = [...document.querySelectorAll('.gg-tokens button')].map(x => x.textContent).sort().join('|');
            return window.DanhGrade7Grammar.find(q => q.unit === unit && q.level === level && q.prompt === prompt &&
              (q.type !== 'rewrite' || q.source === source) &&
              (q.type !== 'order' || [...q.parts].sort().join('|') === tokens));
          }, { unit, level });
          assert.ok(question, `Question lookup: ${unit}/${level}/${step}`);
          types.add(question.type);
          if (question.type === 'rewrite') rewrites++;
          if (question.type === 'choice') {
            await page.locator('#answer-area').getByRole('button', { name: question.answer, exact: true }).click();
          } else if (question.type === 'order') {
            for (const token of question.parts) {
              await page.locator('.gg-tokens button:not(:disabled)').filter({ hasText: exact(token) }).first().click();
            }
            await page.locator('.gg-token-actions .gg-primary').click();
          } else {
            await page.locator('#answer-area input, #answer-area textarea').fill(question.answer.split('|')[0]);
            await page.locator('#answer-area button[type="submit"]').click();
          }
          assert.ok((await page.locator('#feedback').getAttribute('class')).includes('good'), `${unit}/${level}: ${question.prompt}`);
          await page.locator('#next').click();
        }
        assert.ok(rewrites >= 2);
        assert.equal(await page.locator('#result-correct').textContent(), '10/10');
        await page.locator('#change').click();
      }
      console.log(`Unit ${unit}: passed all 3 levels / 30 answers`);
    }
    assert.equal(types.size, 5);
    for (const [width, height] of [[375, 812], [390, 844], [430, 932], [844, 390], [1280, 800]]) {
      await page.setViewportSize({ width, height });
      await page.locator('#start').click();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (width <= 760) {
        assert.ok(await page.locator('#question-prompt').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 24));
      }
      if (width === 390) await page.screenshot({ path: path.join(output, 'grammar-mobile.png') });
      await page.locator('#exit-play').click();
    }
    assert.deepEqual(errors, []);
    console.log('PASS: 12 Units, 19 image URLs, vocabulary games, 36 grammar rounds, 5 types and 5 viewports.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
