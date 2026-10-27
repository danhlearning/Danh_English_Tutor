// One-time migration of the existing illustrations; reruns leave local files alone.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
async function main() {
  const file = path.join(root, 'assets/js/pages/flashcard.js');
  let source = fs.readFileSync(file, 'utf8');
  const urls = [...new Set(source.match(/https:\/\/images\.unsplash\.com\/[^\s"'<>]+/g) || [])];
  const directory = path.join(root, 'assets/images/legacy-vocabulary');
  fs.mkdirSync(directory, {recursive: true});
  for (const url of urls) {
    const name = crypto.createHash('sha256').update(url).digest('hex').slice(0, 16) + '.jpg';
    const target = path.join(directory, name);
    if (!fs.existsSync(target)) {
      const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
      if ([404, 410].includes(response.status)) {
        console.log('Unavailable original; using existing local fallback: ' + url);
        source = source.replaceAll(url, './assets/icons/vocabulary-fallback.svg');
        continue;
      }
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw Error('Image download failed: ' + url);
      fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    }
    source = source.replaceAll(url, './assets/images/legacy-vocabulary/' + name);
  }
  fs.writeFileSync(file, source);
  console.log(`Localized ${urls.length} legacy illustrations.`);
}
main().catch(error => {console.error(error); process.exitCode = 1;});
