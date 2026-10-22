(function (root) {
  'use strict';
  function normalize(value) {
    return String(value || '').normalize('NFKC').replace(/[’‘]/g, "'").replace(/[“”]/g,'"')
      .toLowerCase().replace(/\bwon't\b/g,'will not').replace(/\bcan't\b/g,'cannot')
      .replace(/\bcannot\b/g,'can not').replace(/\bshan't\b/g,'shall not')
      .replace(/\b([a-z]+)n't\b/g,'$1 not').replace(/\bi'm\b/g,'i am')
      .replace(/\b([a-z]+)'re\b/g,'$1 are').replace(/\b([a-z]+)'ve\b/g,'$1 have')
      .replace(/\b([a-z]+)'ll\b/g,'$1 will').replace(/\s+/g,' ').replace(/\s+([,.?!])/g,'$1').trim().replace(/[.!?]+$/,'');
  }
  function accepted(question, answer) {
    const value = normalize(answer);
    if (!value) return false;
    if(question.requiredWord && !String(answer).toLowerCase().split(/[^a-z’']+/).includes(question.requiredWord.toLowerCase())) return false;
    const candidates = question.answers.flatMap(item => {
      const variants = [item];
      if (/\b(?:is|has)\b/.test(item)) {
        variants.push(item.replace(/\b([A-Za-z]+) is\b/g,"$1's").replace(/\b([A-Za-z]+) has\b/g,"$1's"));
      }
      if (/\b(?:was|had|would)\b/.test(item)) variants.push(item.replace(/\b([A-Za-z]+) had\b/g,"$1'd").replace(/\b([A-Za-z]+) would\b/g,"$1'd"));
      return variants;
    });
    return candidates.some(item => normalize(item) === value);
  }
  const api = { normalize, accepted };
  root.DanhGrammarAnswer = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
