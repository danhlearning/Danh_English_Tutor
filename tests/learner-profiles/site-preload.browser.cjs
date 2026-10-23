const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const hits = new Map();
const types = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.wav': 'audio/wav'};
const fixture = {
  '/__preload/start.html': '<main><a href="next.html">Next</a></main><script src="/shared/site-preload.js"></script>',
  '/__preload/next.html': '<link rel="stylesheet" href="theme.css"><script src="lesson.js"></script><img src="picture.svg"><audio autoplay src="must-not-load.wav"></audio>',
  '/__preload/theme.css': 'body {background-image:url(texture.svg)}',
  '/__preload/lesson.js': 'window.lessonRan = true;',
  '/__preload/picture.svg': '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
  '/__preload/texture.svg': '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
  '/__preload/many.html': Array.from({length: 40}, (_, i) => `<script src="lesson.js?n=${i}"></script>`).join(''),
  '/__preload/limits.html': '<main>' + Array.from({length: 8}, (_, i) => `<a href="many.html?n=${i}">Page ${i}</a>`).join('') + '</main><script src="/shared/site-preload.js"></script>',
  '/__preload/intent.html': '<a href="next.html">Next</a><a href="https://example.com/else.html">Outside</a><a download href="download.html">Download</a><script src="/shared/site-preload.js"></script>'
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  hits.set(url.pathname, (hits.get(url.pathname) || 0) + 1);
  if (fixture[url.pathname]) {
    res.writeHead(200, {'content-type': types[path.extname(url.pathname)] || 'image/svg+xml', 'cache-control': 'public, max-age=600'});
    res.end(fixture[url.pathname]); return;
  }
  const file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, {'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'public, max-age=600'});
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true});
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/__preload/start.html');
    await page.waitForFunction(() => DanhSitePreload.stats.completed >= 5 && DanhSitePreload.stats.active === 0);
    assert.equal(await page.evaluate(() => window.lessonRan), undefined, 'prefetch never executes destination scripts');
    assert.equal(hits.get('/__preload/must-not-load.wav'), undefined, 'prefetch never starts audio');
    const before = hits.get('/__preload/lesson.js');
    await page.getByRole('link', {name: 'Next', exact: true}).click();
    await page.waitForFunction(() => window.lessonRan);
    assert.equal(hits.get('/__preload/lesson.js'), before, 'destination reuses cached lesson JS');
    assert.equal(hits.get('/__preload/next.html'), 1, 'destination HTML reused from browser cache');
    await context.close();
    console.log('PASS cold browser warms HTML, CSS, JS, images; navigation reuses cache without running a lesson or audio early');

    for (const mode of ['saveData', '3g', 'offline']) {
      const c = await browser.newContext();
      await c.addInitScript(mode => {
        Object.defineProperty(navigator, 'connection', {value: {saveData: mode === 'saveData', effectiveType: mode === '3g' ? '3g' : '4g'}});
        if (mode === 'offline') Object.defineProperty(navigator, 'onLine', {value: false});
        window.requestIdleCallback = callback => setTimeout(callback, 0);
      }, mode);
      const p = await c.newPage(), count = hits.get('/__preload/next.html');
      await p.goto(base + '/__preload/start.html');
      await p.waitForFunction(() => !!window.DanhSitePreload);
      await p.getByRole('link').hover();
      await p.waitForTimeout(150);
      assert.equal(hits.get('/__preload/next.html'), count, mode);
      assert.equal(await p.evaluate(() => DanhSitePreload.stats.pages), 0);
      await c.close();
    }
    console.log('PASS skips Save-Data, slow connections and offline devices');

    const c = await browser.newContext();
    const p = await c.newPage();
    await p.goto(base + '/__preload/intent.html');
    await p.waitForFunction(() => !!window.DanhSitePreload);
    await p.getByRole('link', {name: 'Outside'}).hover();
    await p.getByRole('link', {name: 'Download'}).hover();
    assert.equal(await p.evaluate(() => DanhSitePreload.stats.pages), 0);
    await p.getByRole('link', {name: 'Next', exact: true}).focus();
    await p.waitForFunction(() => DanhSitePreload.stats.completed >= 5);
    await p.getByRole('link', {name: 'Next', exact: true}).hover();
    assert.equal(await p.evaluate(() => DanhSitePreload.stats.pages), 1, 'same intent is deduplicated');
    await c.close();
    console.log('PASS keyboard/pointer intent, deduplication and external/download exclusions');

    const limited = await browser.newContext();
    const limitPage = await limited.newPage();
    await limitPage.goto(base + '/__preload/limits.html');
    await limitPage.waitForFunction(() => !!window.DanhSitePreload);
    for (const link of await limitPage.getByRole('link').all()) await link.focus();
    await limitPage.waitForFunction(() => DanhSitePreload.stats.active === 0 && DanhSitePreload.stats.completed > 0);
    const stats = await limitPage.evaluate(() => DanhSitePreload.stats);
    assert(stats.pages <= 4 && stats.assets <= 24 && stats.bytes <= 3 * 1024 * 1024, JSON.stringify(stats));
    await limited.close();
    console.log('PASS bounded page and asset preparation when many links are selected');

    const real = await browser.newContext({viewport: {width: 390, height: 844}, reducedMotion: 'reduce'});
    const realPage = await real.newPage();
    realPage.on('pageerror', e => errors.push(e.message));
    let audio = 0; realPage.on('request', req => {if (/\.(wav|mp3)(?:\?|$)/.test(req.url())) audio++;});
    await realPage.goto(base + '/index.html');
    await realPage.waitForFunction(() => !!window.DanhSitePreload && !!window.DanhLearners);
    await realPage.waitForFunction(() => DanhSitePreload.stats.completed > 0);
    await realPage.getByRole('button', {name: 'Đăng nhập', exact: true}).click();
    await realPage.locator('#learner-name').fill('Kiểm tra tải trước');
    await realPage.getByRole('button', {name: 'Vào học ngay', exact: true}).click();
    await realPage.waitForFunction(() => DanhLearners.current?.name === 'Kiểm tra tải trước');
    await realPage.evaluate(() => DanhLearners.storage.setItem('danh-preload-test', 'kept'));
    await realPage.goto(base + '/grade/lop6/lop6.html');
    await realPage.waitForFunction(() => !!window.DanhSitePreload);
    assert.equal(await realPage.evaluate(() => DanhLearners.storage.getItem('danh-preload-test')), 'kept');
    await realPage.reload();
    assert.equal(await realPage.evaluate(() => DanhLearners.current.name), 'Kiểm tra tải trước');
    assert.equal(audio, 0, 'real pages never start audio during preload/login');
    assert.deepEqual(errors, []);
    const out = path.join(root, 'artifacts/site-preload');
    fs.mkdirSync(out, {recursive: true});
    await realPage.screenshot({path: path.join(out, 'grade6-mobile.png'), fullPage: true});
    await realPage.goto(base + '/index.html');
    await realPage.evaluate(() => document.fonts.ready);
    await realPage.screenshot({path: path.join(out, 'home-mobile.png'), fullPage: true});
    await realPage.setViewportSize({width: 1280, height: 900});
    await realPage.screenshot({path: path.join(out, 'home-desktop.png'), fullPage: true});
    await real.close();
    console.log('PASS real mobile home/login/nested grade/reload retains profile and progress, no automatic audio or page errors');
  } finally { await browser.close(); server.close(); }
})().catch(error => {console.error(error); server.close(); process.exitCode = 1;});
