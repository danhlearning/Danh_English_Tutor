const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), http = require('node:http'), crypto=require('node:crypto');
const root = path.resolve(__dirname, '../..'), out = path.join(root, 'artifacts/offline');
fs.mkdirSync(out, {recursive:true});
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webmanifest':'application/manifest+json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.wav':'audio/wav','.mp3':'audio/mpeg','.woff2':'font/woff2','.json':'application/json'};
let corrupt = false, upgrade = false;
const upgradedIndex = fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/\r\n/g,'\n')+'\n<!-- Offline update fixture -->\n';
const audio = 'shared/answer-audio/' + fs.readdirSync(path.join(root, 'shared/answer-audio')).find(file=>file.endsWith('.wav'));
const server = http.createServer((request,response) => {
  const url = new URL(request.url, 'http://localhost');
  if (!url.pathname.startsWith('/course/')) {response.writeHead(404).end();return;}
  let relative = decodeURIComponent(url.pathname.slice('/course/'.length));
  if (!relative || relative.endsWith('/')) relative += 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root+path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {response.writeHead(404).end();return;}
  response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  response.setHeader('Cache-Control', 'no-store');
  if (upgrade && relative === 'offline-catalog.js') {
    const context={self:{}};require('node:vm').runInNewContext(fs.readFileSync(file,'utf8'),context);
    const catalog=context.self.DANH_OFFLINE_CATALOG;catalog.version+='-upgrade';
    const entry=catalog.files.find(file=>file.url==='index.html'), previousBytes=entry.bytes;
    entry.bytes=Buffer.byteLength(upgradedIndex);entry.hash=crypto.createHash('sha256').update(upgradedIndex).digest('hex');catalog.bytes+=entry.bytes-previousBytes;
    response.end('self.DANH_OFFLINE_CATALOG='+JSON.stringify(catalog)+';');return;
  }
  if(upgrade && relative==='index.html'){response.end(upgradedIndex);return;}
  if (corrupt && relative === audio) {response.end('incorrect deployment response');return;}
  response.setHeader('Content-Length', fs.statSync(file).size);
  fs.createReadStream(file).pipe(response);
});
async function rpc(page,type,extra={}) {
  return page.evaluate(async ({type,extra}) => {
    const registration = await navigator.serviceWorker.ready;
    return new Promise((resolve,reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = event => {channel.port1.close();event.data.ok ? resolve(event.data.data) : reject(Error(event.data.error));};
      registration.active.postMessage({type,...extra}, [channel.port2]);
    });
  }, {type,extra});
}
async function main() {
  await new Promise(resolve=>server.listen(0, '127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}/course/`;
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'msedge',headless:true});
  try {
    const context = await browser.newContext({viewport:{width:768,height:1024},deviceScaleFactor:1,hasTouch:true,reducedMotion:'reduce'});
    const page = await context.newPage(), errors = [];
    async function waitDownload() {
      await page.locator('#download:enabled').waitFor({timeout:600000});
      const status=await page.locator('#status').innerText();
      assert(status.includes('Đã tải đủ'),status);
    }
    page.on('pageerror', error=>errors.push(error.message));
    await context.addInitScript(()=>{ window.audioEvents=[]; document.addEventListener('danh-answer-speech',e=>audioEvents.push(e.detail)); });
    await page.goto(base+'offline.html');
    await page.locator('#download:enabled').waitFor({timeout:60000});
    const initial = await rpc(page,'STATUS'); assert.equal(initial.saved.length,0); assert(initial.files>6400);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:path.join(out,'ipad-before.png'),fullPage:true});
    // Validate the real worker rejects incorrect server content without claiming success.
    const catalogSource = fs.readFileSync(path.join(root,'offline-catalog.js'),'utf8');
    const sandbox = {self:{}};require('node:vm').runInNewContext(catalogSource,sandbox);
    const catalog = sandbox.self.DANH_OFFLINE_CATALOG;
    const audioIndex = catalog.files.findIndex(file=>file.url===audio);
    corrupt=true;
    assert.equal((await rpc(page,'BATCH',{indexes:[audioIndex]})).failed[0].code,'FILE_CHANGED');corrupt=false;
    // A second click cannot create another download; pause retains verified files.
    await page.locator('#download').click();
    await page.waitForFunction(()=>document.querySelector('#progress').value>8,undefined,{timeout:30000});
    await page.locator('#pause').click();
    await page.locator('#download:enabled').waitFor({timeout:65000});
    const partial = await rpc(page,'STATUS'); assert(partial.saved.length>0 && partial.saved.length<partial.files);
    await page.reload(); await page.locator('#download:enabled').waitFor();
    assert.equal((await rpc(page,'STATUS')).saved.length,partial.saved.length);
    await page.locator('#download').click();
    await waitDownload();
    const full = await rpc(page,'STATUS');assert.equal(full.saved.length,full.files);
    console.log(`PASS full package: ${full.files} files, ${full.bytes} bytes; pause/resume and integrity`);
    // Real deletion and corruption must be detected and repaired.
    await page.evaluate(async ({base,hash})=>{
      const name=(await caches.keys()).find(name=>name.startsWith('danh-offline:')&&name.endsWith(':files'));
      const cache=await caches.open(name); await cache.delete(base+'__danh_offline_files__/'+hash);
    },{base,hash:catalog.files[audioIndex].hash});
    assert.equal((await rpc(page,'STATUS')).saved.length,full.files-1);
    assert.equal((await rpc(page,'BATCH',{indexes:[audioIndex],verify:true})).failed[0].code,'FILE_MISSING');
    assert.deepEqual((await rpc(page,'BATCH',{indexes:[audioIndex]})).saved,[audioIndex]);
    // Set a learner setting to prove downloads/worker replacement never clear local progress.
    await page.evaluate(()=>localStorage.setItem('offline-preserve-progress','saved learner draft'));
    await context.setOffline(true);
    await page.reload(); await page.locator('#download:enabled').waitFor();
    assert((await page.locator('#status').innerText()).includes('Đã đủ'));
    await page.locator('#verify').click();
    await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Kiểm tra xong'),undefined,{timeout:600000});
    await page.screenshot({path:path.join(out,'ipad-offline-ready.png'),fullPage:true});
    for (let grade=1;grade<=12;grade++) {
      await page.goto(base+`grade/lop${grade}/${grade===2?'gsunit1':'unit1'}.html?game=letters`);
      await page.waitForFunction(()=>window.DanhLearners);
      assert.equal(await page.evaluate(()=>audioEvents.length),0,'no automatic speech');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'iPad grade '+grade);
      assert.equal(await page.evaluate(()=>localStorage.getItem('offline-preserve-progress')),'saved learner draft');
    }
    const urls = ['flashcard.html?game=letters&grade=12&unit=unit2','grammar-practice.html','grade/lop2/animals.html','grade/lop2/weather.html','grade/lop12/vocabulary-review.html?term=2','flashcard-previous.html','ipa-practice.html'];
    for (const url of urls) {
      await page.goto(base+url); await page.waitForFunction(()=>window.DanhLearners);
      assert(!page.url().endsWith('offline.html'),url);
    }
    await page.goto(base+'ipa-theory.html');
    await page.waitForFunction(()=>window.DanhListenControls);
    await page.locator("button[onclick=\"speakWord('meet')\"]").click();
    await page.waitForFunction(()=>audioEvents.some(event=>event.state==='ended'&&event.mode==='audio'&&event.text==='meet'));
    await page.goto(base+'grade/lop2/gsunit1.html?game=letters');
    await page.waitForFunction(()=>window.DanhAnswerSpeech);
    await page.locator('.ll-slot').first().waitFor();
    const round = await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g2-letter-ladder-gsunit1-v1')).active);
    assert(round && round.ids.length>0);
    await page.reload();await page.locator('.ll-slot').first().waitFor();
    assert.deepEqual(await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g2-letter-ladder-gsunit1-v1')).active),round);
    const media = await page.evaluate(async (url)=>{
      const response=await fetch(url,{headers:{Range:'bytes=0-43'}});
      const buffer=await response.arrayBuffer();return {status:response.status,length:buffer.byteLength,range:response.headers.get('content-range')};
    },base+audio+'?v=offline-test');
    assert.equal(media.status,206);assert.equal(media.length,44);assert(media.range.startsWith('bytes 0-43/'));
    // Answer speech uses the cached WAV when navigator.onLine is false.
    const result = await page.evaluate(async()=>DanhAnswerSpeech.listen('hello'));
    assert.equal(result,true);
    assert(await page.evaluate(()=>audioEvents.some(e=>e.state==='ended'&&e.mode==='audio')));
    await page.goto(base+'offline.html'); await page.locator('#download:enabled').waitFor();
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
    await page.screenshot({path:path.join(out,'phone-offline-ready.png'),fullPage:true});
    // Stop the worker, start it anew, then open a deep link while the network is unavailable.
    const cdp=await context.newCDPSession(page);await cdp.send('ServiceWorker.enable');await cdp.send('ServiceWorker.stopAllWorkers');
    await page.goto(base+'grade/lop12/unit10.html?tab=words');await page.waitForFunction(()=>window.DanhLearners);
    assert(page.url().includes('unit10.html'));
    // An uncached/unknown nested URL safely leads to the offline page with working root-relative assets.
    await page.goto(base+'grade/lop12/no-such-lesson.html');
    assert.equal(page.url(),base+'offline.html');await page.locator('#download:enabled').waitFor();
    // Release update waits for an explicit action and reuses verified content, preserving the learner draft.
    await context.setOffline(false);upgrade=true;
    await page.evaluate(async()=>{const registration=await navigator.serviceWorker.ready;await registration.update();});
    await page.locator('#update:visible').waitFor({timeout:60000});
    assert.equal((await rpc(page,'STATUS')).version,full.version,'waiting worker does not replace a running app');
    await page.locator('#update').click();
    await page.waitForFunction(async()=>{
      const registration=await navigator.serviceWorker.ready;
      return registration.active && document.querySelector('#download')?.disabled===false && document.querySelector('#status')?.textContent.includes('Kho học chưa đủ');
    },undefined,{timeout:60000});
    assert((await rpc(page,'STATUS')).version.endsWith('-upgrade'));
    assert.equal(await page.evaluate(()=>localStorage.getItem('offline-preserve-progress')),'saved learner draft');
    assert.equal((await rpc(page,'STATUS')).saved.length,full.files-1,'only the changed HTML is missing; voices are shared across versions');
    const namesBefore=await page.evaluate(()=>caches.keys());assert(namesBefore.some(name=>name.endsWith('shell:'+full.version)));
    await page.locator('#download').click();
    await waitDownload();
    const namesAfter=await page.evaluate(()=>caches.keys());assert(!namesAfter.some(name=>name.endsWith('shell:'+full.version)));
    assert.equal(namesAfter.filter(name=>name.endsWith(':files')).length,1,'unchanged files never occupy a second full cache');
    await context.setOffline(true);await page.reload();await page.locator('#download:enabled').waitFor();
    await page.locator('#download').click();await page.waitForURL(base+'index.html');
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({files:full.files,bytes:full.bytes,pauseResume:true,integrity:true,fullOfflineVerification:true,grades:12,deepLinks:true,workerRestart:true,range:media,cachedAudio:true,legacyPronunciationAudio:true,roundResume:true,updatePreservesProgress:true,errors},null,2));
    console.log('PASS offline all 12 grades, library, old pages, range audio, worker restart, subdirectory deployment and responsive layout');
  } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>server.close());
