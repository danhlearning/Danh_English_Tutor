const test = require('node:test'), assert = require('node:assert/strict'), vm = require('node:vm');
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const source = fs.readFileSync(path.join(__dirname, '../../sw.js'), 'utf8');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
function fixture(stores = new Map(), version = 'new') {
  const listeners = {}, origin = 'https://example.test/course/';
  let text = 'sample audio data';
  const file = {url:'sample.wav',bytes:Buffer.byteLength(text),hash:hash(text)};
  let downloads = 0, corrupt = false, quota = false, missingPack = false;
  const cacheApi = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async keys() { return [...store.keys()].map(url => new Request(url)); },
        async match(url) { return store.get(typeof url === 'string' ? url : url.url)?.clone(); },
        async put(url, response) { if (quota) throw new DOMException('full', 'QuotaExceededError'); store.set(url, response.clone()); },
        async delete(url) { return store.delete(url); }
      };
    },
    async keys() { return [...stores.keys()]; }, async delete(name) { return stores.delete(name); }
  };
  const context = vm.createContext({URL, Request, Response, Headers, DOMException, AbortController, TextEncoder, TextDecoder, setTimeout, clearTimeout,
    crypto:crypto.webcrypto, caches:cacheApi, importScripts() {},
    fetch:async url => {downloads++;if(missingPack&&url.endsWith('.bin'))return new Response('',{status:404});return new Response(corrupt ? 'bad file' : text, {headers:{'content-type':'audio/wav'}});},
    self:{DANH_OFFLINE_CATALOG:{version,bytes:file.bytes,files:[file]},location:{href:origin+'sw.js'},
      clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name, fn)=>listeners[name]=fn}
  });
  vm.runInContext(source, context);
  return {context, stores, cacheApi, file, origin, listeners, get downloads(){return downloads;},
    get key(){return origin+'__danh_offline_files__/'+file.hash;},
    set corrupt(value){corrupt=value;}, set quota(value){quota=value;}, set content(value){text=value;},set missingPack(value){missingPack=value;},
    async rpc(type, extra={}) {
      let result, wait;
      listeners.message({data:{type,...extra},source:{url:origin+'offline.html'},ports:[{postMessage:value=>result=value}],waitUntil:p=>wait=p});
      await wait; return JSON.parse(JSON.stringify(result));
    }
  };
}
test('Windows-hosted text is verified and stored in the same form as an LF deployment', async () => {
  const app = fixture(); app.file.text = true; app.file.bytes = 9; app.file.hash = hash('line\nnext'); app.content = 'line\r\nnext';
  assert.deepEqual((await app.rpc('BATCH', {indexes:[0]})).data.saved, [0]);
  const cache = await app.cacheApi.open([...app.stores.keys()][0]);
  assert.equal(await (await cache.match(app.key)).text(), 'line\nnext');
});
test('download verifies content, deduplicates, detects missing files and never counts failed bytes', async () => {
  const app = fixture(); app.corrupt = true;
  let result = await app.rpc('BATCH', {indexes:[0]});
  assert.equal(result.data.failed[0].code, 'FILE_CHANGED');
  assert.deepEqual((await app.rpc('STATUS')).data.saved, []);
  app.corrupt = false;
  assert.deepEqual((await app.rpc('BATCH', {indexes:[0]})).data.saved, [0]);
  await app.rpc('BATCH', {indexes:[0]}); assert.equal(app.downloads, 2);
  const name = [...app.stores.keys()].find(name=>!name.includes('shell:'));
  const cache = await app.cacheApi.open(name);
  await cache.put(app.key, new Response('damaged'));
  result = await app.rpc('BATCH', {indexes:[0],verify:true});
  assert.equal(result.data.failed[0].code, 'FILE_MISSING');
  assert.deepEqual((await app.rpc('STATUS')).data.saved, []);
});
test('quota errors preserve saved state and an incomplete package cannot clean up older releases', async () => {
  const app = fixture();app.quota = true;
  assert.equal((await app.rpc('BATCH', {indexes:[0]})).data.failed[0].code, 'STORAGE_FULL');
  assert.equal((await app.rpc('CLEANUP')).error, 'INCOMPLETE');
  assert.deepEqual((await app.rpc('STATUS')).data.saved, []);
});
test('updates reuse matching hashes and cleanup preserves other apps and the waiting worker shell', async () => {
  const app = fixture(), prefix = 'danh-offline:' + encodeURIComponent('/course/') + ':';
  const old = await app.cacheApi.open(prefix+'old');
  await old.put(app.origin+app.file.url, new Response('sample audio data', {headers:{'x-danh-sha256':app.file.hash}}));
  await app.cacheApi.open(prefix+'shell:future'); await app.cacheApi.open('another-app');
  await app.rpc('BATCH', {indexes:[0]}); assert.equal(app.downloads, 0);
  assert((await app.rpc('CLEANUP')).ok);
  assert(!app.stores.has(prefix+'old')); assert(app.stores.has('another-app')); assert(app.stores.has(prefix+'shell:future'));
});
test('a new release shares unchanged media without copying even when storage cannot accept another file', async () => {
  const old = fixture(new Map(),'release-one');await old.rpc('BATCH',{indexes:[0]});
  const updated = fixture(old.stores,'release-two');updated.quota=true;
  assert.deepEqual((await updated.rpc('STATUS')).data.saved,[0]);
  assert.deepEqual((await updated.rpc('BATCH',{indexes:[0]})).data.saved,[0]);
  assert.equal(updated.downloads,0);
  assert.equal([...updated.stores.keys()].filter(name=>name.endsWith(':files')).length,1);
});
test('Safari audio ranges include suffix, open end and invalid range responses', async () => {
  const app = fixture(); await app.rpc('BATCH', {indexes:[0]});
  async function range(value) {
    let promise;
    app.listeners.fetch({request:new Request(app.origin+'sample.wav?v=audio', {headers:{Range:value}}),respondWith:p=>promise=p});
    const response = await promise;return {status:response.status,text:await response.text(),range:response.headers.get('content-range')};
  }
  assert.deepEqual(await range('bytes=0-5'), {status:206,text:'sample',range:'bytes 0-5/17'});
  assert.equal((await range('bytes=-4')).text, 'data');
  assert.equal((await range('bytes=7-')).text, 'audio data');
  assert.equal((await range('bytes=90-100')).status, 416);
  assert.equal((await range('bytes=4-2')).status, 416);
});
test('batch limits and concurrency protect the queue', async () => {
  const app = fixture();
  assert.equal((await app.rpc('BATCH', {indexes:[-1]})).error, 'INVALID_BATCH');
  assert.equal((await app.rpc('BATCH', {indexes:Array(13).fill(0)})).error, 'INVALID_BATCH');
  const results = await Promise.all([app.rpc('BATCH', {indexes:[0]}),app.rpc('BATCH', {indexes:[0]})]);
  assert(results.some(result=>result.error === 'BUSY'));
});
function usePack(app){app.file.pack=0;app.file.offset=0;app.context.self.DANH_OFFLINE_CATALOG.packs=[{url:'offline-packs/test.bin',hash:app.file.hash,bytes:app.file.bytes}];}
test('packed downloads share one request, verify both digests and keep normal cache/range behavior', async()=>{
 const app=fixture();usePack(app);
 assert.deepEqual((await app.rpc('BATCH',{indexes:[0,0,0]})).data.saved,[0,0,0]);
 assert.equal(app.downloads,1);assert.deepEqual((await app.rpc('STATUS')).data.saved,[0]);
 assert.equal(vm.runInContext('packBuffers.size',app.context),1);
 await app.rpc('PAUSE');assert.equal(vm.runInContext('packBuffers.size',app.context),0);
});
test('corrupt packs never count as saved; unavailable packs fall back to individual files',async()=>{
 const corrupt=fixture();usePack(corrupt);corrupt.corrupt=true;
 assert.equal((await corrupt.rpc('BATCH',{indexes:[0]})).data.failed[0].code,'FILE_CHANGED');
 assert.deepEqual((await corrupt.rpc('STATUS')).data.saved,[]);
 const fallback=fixture();usePack(fallback);fallback.missingPack=true;
 assert.deepEqual((await fallback.rpc('BATCH',{indexes:[0]})).data.saved,[0]);assert.equal(fallback.downloads,2);
});
