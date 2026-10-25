/* Slow study reading and a livelier game voice, both at natural pitch. */
(() => {
  'use strict';
  const rate = 0.5;
  const audioRate = 0.6;
  const normalize = value => String(value || '').replace(/_/g, '-').toLowerCase();
  function configure(utterance) {
    utterance.rate = window.DanhGameFlow?.isPlaying() ? window.DanhGameFlow.speechRate : rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = window.speechSynthesis?.getVoices() || [];
    const locale = normalize(utterance.lang);
    const exact = voices.filter(voice => normalize(voice.lang) === locale);
    const candidates = exact.length ? exact : voices.filter(voice => /^en(?:-|$)/.test(normalize(voice.lang)));
    utterance.voice = candidates.find(voice => /Natural|Google|Samantha/i.test(voice.name || '')) || candidates[0] || null;
    return utterance;
  }
  function timeoutFor(text) {
    // Leave enough time for a whole sentence before a missing end event releases the game.
    return Math.max(20000, String(text || '').length * 180 + 4000);
  }
  window.DanhYoungSpeech = Object.freeze({ rate, audioRate, configure, timeoutFor });
})();
