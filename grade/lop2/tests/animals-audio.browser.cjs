const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.LESSON_BASE_URL || 'http://127.0.0.1:8001';

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const context = await browser.newContext();
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.playedWords = [];
      const NativeAudio = window.Audio;
      window.Audio = function (source) {
        const audio = new NativeAudio(source);
        playedWords.push(audio);
        return audio;
      };
    });
    await page.goto(`${base}/grade/lop2/animals.html`);
    await page.locator('#learner-name').fill('Kiểm tra giọng');
    await page.getByRole('button', { name: 'Vào học ngay', exact: true }).click();
    await page.waitForFunction(() => typeof speak === 'function');
    assert.equal(await page.evaluate(() => playedWords.length), 0, 'No audio on opening');
    const decoded = await page.evaluate(async () => {
      const context = new AudioContext(), results = [];
      try {
        for (const word of animalsList) {
          const response = await fetch(wordAudioFiles.get(word.name.toLowerCase()));
          if (!response.ok) throw new Error(`Missing audio: ${word.name}`);
          const buffer = await context.decodeAudioData(await response.arrayBuffer());
          const samples = buffer.getChannelData(0);
          let peak = 0, energy = 0, clipped = 0;
          for (const sample of samples) {
            peak = Math.max(peak, Math.abs(sample)); energy += sample * sample;
            if (Math.abs(sample) >= 0.999) clipped++;
          }
          results.push({ word: word.name, duration: buffer.duration, peak, rms: Math.sqrt(energy / samples.length), clipped: clipped / samples.length });
        }
      } finally { await context.close(); }
      return results;
    });
    assert.equal(decoded.length, 50);
    for (const clip of decoded) {
      assert.ok(clip.duration > 0.25 && clip.duration / 0.6 < 20, `Duration: ${clip.word}`);
      assert.ok(clip.rms > 0.005, `Silent clip: ${clip.word}`);
      assert.ok(clip.clipped < 0.001, `Clipping: ${clip.word}`);
    }
    await page.locator('#vocab-grid-container .audio-btn').first().click();
    await page.waitForFunction(() => playedWords.length === 1 && playedWords[0].currentTime > 0);
    assert.deepEqual(await page.evaluate(() => [playedWords[0].playbackRate, playedWords[0].preservesPitch]), [0.6, true]);
    await page.evaluate(async () => { await speak('Hippopotamus'); });
    assert.equal(await page.evaluate(() => playedWords[0].paused && playedWords[1].ended), true);
    await page.evaluate(() => { speak('Kangaroo'); speak('Cat'); });
    await page.waitForFunction(() => playedWords.at(-1).currentTime > 0);
    assert.equal(await page.evaluate(() => playedWords.at(-2).paused), true);
    await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
    assert.equal(await page.evaluate(() => playedWords.every(audio => audio.paused)), true);
    await page.evaluate(() => {
      speak('Squirrel');
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    assert.equal(await page.evaluate(() => playedWords.every(audio => audio.paused)), true);
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
      window.deviceSpoken = [];
      window.Audio = function () { this.play = () => Promise.reject(new Error('Offline')); this.pause = () => {}; };
      window.speechSynthesis.getVoices = () => [{ lang: 'vi-VN' }, { lang: 'en-US', name: 'US test' }];
      window.speechSynthesis.speak = utterance => {
        deviceSpoken.push({ text: utterance.text, lang: utterance.lang, rate: utterance.rate, voice: utterance.voice.lang });
        queueMicrotask(() => utterance.onend?.());
      };
      // A plain utterance allows deterministic voice objects in this failure-path test.
      window.SpeechSynthesisUtterance = function (text) { this.text = text; };
    });
    await page.evaluate(async () => { await speak('Dog'); await speak('A bird can fly.'); });
    const fallback = await page.evaluate(() => deviceSpoken);
    assert.equal(fallback.length, 2);
    for (const item of fallback) assert.deepEqual([item.lang, item.rate, item.voice], ['en-US', 0.5, 'en-US']);
    await page.evaluate(async () => {
      speechSynthesis.getVoices = () => [{ lang: 'vi-VN' }];
      await speak('Rabbit');
    });
    assert.equal(await page.evaluate(() => deviceSpoken.length), 2, 'Do not use a different-language voice');
    assert.match(await page.locator('#animals-audio-note').innerText(), /chưa có giọng đọc Anh–Mỹ/);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ decoded: decoded.length, minDuration: Math.min(...decoded.map(x => x.duration)), maxDuration: Math.max(...decoded.map(x => x.duration)), maxClippedFraction: Math.max(...decoded.map(x => x.clipped)), result: 'PASS: decoding, slow pitch-preserving playback, cancellation, US fallback, no autoplay' }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
