(function (root) {
  'use strict';
  const quota = { choice: 3, fill: 2, order: 2, correct: 1, rewrite: 2 };
  function shuffle(list, random = Math.random) {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [out[i],out[j]] = [out[j],out[i]]; }
    return out;
  }
  function select(pool, { mode = 'topic', records = {}, random = Math.random, now = Date.now() } = {}) {
    const unique = new Set(), counts = {}, selected = [];
    let candidates = shuffle(pool.filter(q => q.status === 'reviewed'),random);
    const priority = q => {
      const record = records[q.id];
      return !record ? 0 : record.due <= now ? -2 : record.needsReview ? 1 : 2;
    };
    candidates.sort((a,b) => priority(a) - priority(b));
    function take(type, limit) {
      let found = 0;
      while(found < limit) {
        let options = candidates.filter(q => (!type || q.type === type) && !unique.has(q.familyId));
        if (mode === 'mixed') {
          options = options.filter(q => (counts[q.topic] || 0) < 5);
          options.sort((a,b) => (counts[a.topic] || 0) - (counts[b.topic] || 0) || priority(a) - priority(b));
        }
        if (!options.length) break;
        const next = options[0]; selected.push(next); unique.add(next.familyId);
        counts[next.topic] = (counts[next.topic] || 0) + 1; found++;
      }
    }
    if (mode === 'review') take(null,10);
    else for (const [type,limit] of Object.entries(quota)) take(type,limit);
    return shuffle(selected,random);
  }
  const api = { quota, shuffle, select };
  root.DanhGrammarRound = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
