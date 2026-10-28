const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('shared/pwa.js','utf8');
function setup(registration,{failUpdate=false}={}){
 const calls={register:0,updated:0,unregistered:0,deleted:[]};
 if(registration){registration.update=async()=>{calls.updated++;if(failUpdate)throw Error('network');};registration.unregister=async()=>{calls.unregistered++;};}
 const context={window:{},document:{currentScript:{src:'https://lesson.test/course/shared/pwa.js'}},URL,
  navigator:{serviceWorker:{getRegistration:async()=>registration,register(){calls.register++;}}},
  caches:{keys:async()=>['danh-offline:%2Fcourse%2F:files','danh-offline:%2Fother%2F:files','other-app'],delete:async name=>calls.deleted.push(name)}};
 context.window.caches=context.caches;vm.runInNewContext(source,context);return {context,calls};
}
test('fresh visitors do not register a worker, prefetch pages or download a package',async()=>{
 const s=setup(null);await s.context.window.DanhPWA.ready;assert.equal(s.calls.register,0);assert.equal(s.calls.updated,0);assert.deepEqual(s.calls.deleted,[]);assert.equal(s.context.window.DanhPWA.retired,true);
 assert(!fs.existsSync('offline-catalog.js'));assert(!fs.existsSync('offline-packs'));
 assert(!fs.readFileSync('shared/learner-profile.js','utf8').includes("new URL('shared/site-preload.js"));
 assert(!fs.readFileSync('index.html','utf8').includes('offline.html'));assert(!fs.readFileSync('shared/contact-footer.js','utf8').includes('offline.html'));
});
test('retires only this exact worker and cache scope without touching learner storage',async()=>{
 const s=setup({scope:'https://lesson.test/course/',active:{scriptURL:'https://lesson.test/course/sw.js'}});await s.context.window.DanhPWA.ready;
 assert.equal(s.calls.updated,1);assert.equal(s.calls.unregistered,1);assert.deepEqual(s.calls.deleted,['danh-offline:%2Fcourse%2F:files']);
 assert(!/localStorage|sessionStorage|indexedDB|\.clear\(/.test(source));
});
test('other apps and nested scopes are not unregistered or cleared',async()=>{
 for(const registration of [{scope:'https://lesson.test/',active:{scriptURL:'https://lesson.test/sw.js'}},{scope:'https://lesson.test/course/',active:{scriptURL:'https://lesson.test/course/another-app.js'}}]){
  const s=setup(registration);await s.context.window.DanhPWA.ready;assert.equal(s.calls.updated,0);assert.equal(s.calls.unregistered,0);assert.deepEqual(s.calls.deleted,[]);
 }
});
test('an unavailable update still unregisters this old offline worker',async()=>{
 const s=setup({scope:'https://lesson.test/course/',active:{scriptURL:'https://lesson.test/course/sw.js'}},{failUpdate:true});
 await s.context.window.DanhPWA.ready;assert.equal(s.calls.updated,1);assert.equal(s.calls.unregistered,1);assert.deepEqual(s.calls.deleted,['danh-offline:%2Fcourse%2F:files']);
});
