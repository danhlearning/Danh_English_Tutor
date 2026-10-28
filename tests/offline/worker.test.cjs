const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('retirement worker claims open pages and deletes only its old offline caches',async()=>{
 const listeners={},deleted=[];let skipped=0,claimed=0,unregistered=0;
 const self={location:{href:'https://lesson.test/course/sw.js'},addEventListener:(name,fn)=>listeners[name]=fn,skipWaiting:async()=>skipped++,clients:{claim:async()=>claimed++},registration:{unregister:async()=>unregistered++}};
 vm.runInNewContext(fs.readFileSync('sw.js','utf8'),{self,URL,caches:{keys:async()=>['danh-offline:%2Fcourse%2F:files','danh-offline:%2Fcourse%2F:shell:old','danh-offline:%2Fother%2F:files','foreign'],delete:async name=>deleted.push(name)}});
 assert.deepEqual(Object.keys(listeners).sort(),['activate','install']);
 const run=async name=>{let done;listeners[name]({waitUntil:promise=>done=promise});await done;};
 await run('install');await run('activate');assert.equal(skipped,1);assert.equal(claimed,1);assert.equal(unregistered,1);assert.deepEqual(deleted,['danh-offline:%2Fcourse%2F:files','danh-offline:%2Fcourse%2F:shell:old']);
});
