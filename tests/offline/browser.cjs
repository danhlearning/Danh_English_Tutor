const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');let legacy=true;const hits=[];
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');hits.push(url.pathname);res.setHeader('Cache-Control','no-store');
 if(url.pathname==='/course/setup.html'){res.setHeader('Content-Type','text/html');res.end('<p>Migration fixture</p>');return;}
 if(url.pathname==='/course/probe'){res.end('network');return;}
 if(url.pathname==='/course/sw.js' && legacy){res.setHeader('Content-Type','text/javascript');res.end(`self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('fetch',e=>{if(new URL(e.request.url).pathname.endsWith('/probe'))e.respondWith(Promise.resolve(new Response('old-offline-worker')));});`);return;}
 const file=path.resolve(root,'.'+url.pathname.replace(/^\/course/,''));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.mp3':'audio/mpeg','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext(),page=await context.newPage();
  await page.goto(base+'/course/setup.html');
  await page.evaluate(async()=>{localStorage.setItem('danh-learner-data:migration:test','keep-progress');await navigator.serviceWorker.register('./sw.js',{scope:'./'});await navigator.serviceWorker.ready;});
  await page.waitForFunction(()=>navigator.serviceWorker.controller);
  assert.equal(await page.evaluate(()=>fetch('./probe').then(r=>r.text())),'old-offline-worker');
  await page.evaluate(async()=>{await(await caches.open('danh-offline:%2Fcourse%2F:files')).put('./old',new Response('old'));await(await caches.open('foreign-app')).put('./keep',new Response('keep'));});
  legacy=false;
  await page.goto(base+'/course/index.html');
  await page.waitForFunction(()=>window.DanhPWA?.retired);
  await page.evaluate(()=>DanhPWA.ready);
  await page.waitForFunction(async()=>!(await navigator.serviceWorker.getRegistration(location.href)));
  await page.waitForFunction(async()=>(await fetch('./probe').then(r=>r.text()))==='network');
  assert.equal(await page.evaluate(()=>localStorage.getItem('danh-learner-data:migration:test')),'keep-progress');
  assert.deepEqual(await page.evaluate(()=>caches.keys()),['foreign-app']);
  assert.equal(await page.locator('a[href*="offline.html"]').count(),0);
  await page.goto(base+'/course/offline.html');await page.waitForURL('**/course/index.html');
  const fresh=await browser.newContext(),p=await fresh.newPage();await p.goto(base+'/course/index.html');await p.waitForFunction(()=>window.DanhPWA?.retired);await p.evaluate(()=>DanhPWA.ready);
  assert.equal(await p.evaluate(async()=>(await navigator.serviceWorker.getRegistrations()).length),0);
  assert(!hits.some(url=>/offline-catalog|offline-packs/.test(url)));
  console.log('PASS old worker retires, network serves pages, only owned caches removed, progress preserved; new visits install no worker or packages; old bookmark opens home');
  await fresh.close();await context.close();
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
