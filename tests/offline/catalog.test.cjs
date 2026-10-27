const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const {build, serialize, canonical} = require('../../scripts/build-offline-catalog.cjs');
const root = path.resolve(__dirname, '../..');
test('text hashes survive Git newline conversion while binary media bytes remain unchanged', () => {
  assert.deepEqual(canonical(Buffer.from('Tiếng Anh\r\nline\r\n'), true), Buffer.from('Tiếng Anh\nline\n'));
  const binary = Buffer.from([0,13,10,255]); assert.deepEqual(canonical(binary, false), binary);
});
test('offline release covers every deployed page, image, voice and local font, excludes development files', () => {
  const catalog = build(), urls = new Set(catalog.files.map(file => file.url));
  assert.equal(fs.readFileSync(path.join(root, 'offline-catalog.js'), 'utf8').replace(/\r\n/g, '\n'), serialize(catalog), 'rebuild offline catalog');
  assert.equal(urls.size, catalog.files.length);
  for (let grade = 1; grade <= 12; grade++) {
    assert(urls.has(`grade/lop${grade}/lop${grade}.html`));
    assert(urls.has(`grade/lop${grade}/${grade === 2 ? 'gsunit1' : 'unit1'}.html`));
  }
  assert(catalog.files.filter(file => file.url.startsWith('shared/answer-audio/')).length >= 4515);
  assert(urls.has('assets/fonts/nunito/vietnamese.woff2'));
  assert(urls.has('offline.html'));
  assert(catalog.files.every(file => !/(?:^|\/)(?:tests|artifacts|tmp|node_modules)\//.test(file.url)));
  assert(catalog.files.every(file => /^[a-f0-9]{64}$/.test(file.hash) && file.bytes > 0));
});
test('packaged lessons have no remote media dependencies', () => {
  const catalog = build();
  for (const file of catalog.files.filter(file => /\.(?:html|js|css)$/.test(file.url))) {
    const source = fs.readFileSync(path.join(root, file.url), 'utf8');
    assert(!/https?:\/\/(?:images\.unsplash\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)/.test(source), file.url);
  }
});
test('old pronunciation examples and notebook words have their own offline voice files', () => {
  const audioKey=text=>{let value=2166136261;for(const c of text.trim().toLowerCase())value=Math.imul(value^c.charCodeAt(0),16777619);return(value>>>0).toString(16).padStart(8,'0');};
  const words=new Set();
  for(const file of fs.readdirSync(root).filter(name=>name.endsWith('.html'))){
    for(const match of fs.readFileSync(path.join(root,file),'utf8').matchAll(/speakWord\('([^']+)'\)/g))words.add(match[1]);
  }
  const context=vm.createContext({window:{}});
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/pages/flashcard.js'),'utf8').split('const database =')[0]+';window.rawData=rawData;',context);
  for(const records of Object.values(context.window.rawData))for(const record of records)words.add(record.split('|')[0]);
  for(const word of words)assert(fs.statSync(path.join(root,`shared/answer-audio/${audioKey(word)}.wav`)).size>1000,word);
});
test('shell resources exist in the full catalog and installation reaches old/generated pages', () => {
  const catalog = build(), urls = new Set(catalog.files.map(file => file.url));
  const source = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const shellSource = source.match(/const shell = (\[[\s\S]*?\n\]);/)[1];
  for (const file of vm.runInNewContext(shellSource)) assert(urls.has(file), file);
  assert(fs.readFileSync(path.join(root, 'shared/contact-footer.js'), 'utf8').includes('shared/pwa.js'));
  for (const size of [180, 192, 512]) {
    const png = fs.readFileSync(path.join(root, `assets/icons/app-${size}.png`));
    assert.equal(png.readUInt32BE(16), size); assert.equal(png.readUInt32BE(20), size);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest')));
  assert.equal(manifest.scope, './'); assert.equal(manifest.start_url, './index.html');
});
