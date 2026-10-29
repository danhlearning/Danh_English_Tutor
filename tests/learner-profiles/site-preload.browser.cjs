const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs');
let nextHits=0;
const server=http.createServer((req,res)=>{
 res.setHeader('Content-Type',req.url.startsWith('/shared/')?'text/javascript':'text/html');
 if(req.url==='/start.html'){res.end('<main><a href="next.html">Next</a></main><script src="/shared/site-preload.js"></script>');return;}
 if(req.url==='/next.html'){nextHits++;res.end('<h1>Next page</h1>');return;}
 if(req.url==='/shared/site-preload.js'){res.end(fs.readFileSync('shared/site-preload.js'));return;}res.end('');
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{const page=await browser.newPage();await page.goto('http://127.0.0.1:'+server.address().port+'/start.html');await page.waitForFunction(()=>window.DanhSitePreload);await page.getByRole('link').hover();await page.getByRole('link').focus();await page.waitForTimeout(900);assert.equal(nextHits,0);assert.equal(await page.evaluate(()=>DanhSitePreload.stats.active+DanhSitePreload.stats.pages+DanhSitePreload.stats.bytes),0);await page.getByRole('link').click();await page.getByRole('heading',{name:'Next page'}).waitFor();assert.equal(nextHits,1);console.log('PASS retired page preloader fetches no destination before normal navigation');}finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
