const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'assets/js/topics/animals.js'), 'utf8');
const entries = [...script.matchAll(/\{ num: (\d+), name: '([^']+)', ipa: '([^']+)'/g)]
  .map(([, num, name, ipa]) => ({ num: Number(num), name, ipa }));

test('Animals có đủ 50 từ, phiên âm Anh-Mỹ và tệp âm tương ứng', () => {
  assert.equal(entries.length, 50);
  assert.deepEqual(entries.map(item => item.num), Array.from({ length: 50 }, (_, i) => i + 1));
  assert.equal(new Set(entries.map(item => item.name.toLowerCase())).size, 50);
  for (const { name, ipa } of entries) {
    assert.match(ipa, /^\/.+\/$/, `Thiếu phiên âm: ${name}`);
    const file = path.join(root, 'assets/audio/animals', `${name.toLowerCase()}.mp3`);
    assert.ok(fs.existsSync(file), `Thiếu tệp âm: ${name}`);
    const bytes = fs.readFileSync(file);
    assert.ok(bytes.length > 1000, `Tệp âm quá ngắn: ${name}`);
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3', `Tệp không phải MP3: ${name}`);
  }
  assert.deepEqual(Object.fromEntries(entries.filter(item => ['Fox', 'Goat', 'Giraffe', 'Turtle', 'Hippopotamus', 'Kangaroo'].includes(item.name)).map(({ name, ipa }) => [name, ipa])), {
    Fox: '/fɑːks/', Giraffe: '/dʒɪˈræf/', Hippopotamus: '/ˌhɪp.əˈpɑː.t̬ə.məs/',
    Turtle: '/ˈtɝː.t̬əl/', Kangaroo: '/ˌkæŋ.ɡəˈruː/', Goat: '/ɡoʊt/'
  });
});

test('Animals dùng tệp cố định cho từ đơn và tải mã mới', () => {
  assert.match(script, /wordAudioFiles\.get\(String\(text\)\.trim\(\)\.toLowerCase\(\)\)/);
  assert.match(script, /await playWordAudio\(source\)/);
  assert.match(script, /mp3\?v=us-ljspeech-2/);
  const html = fs.readFileSync(path.join(root, 'animals.html'), 'utf8');
  assert.match(html, /topics\/animals\.js\?v=us-ljspeech-2/);
});
