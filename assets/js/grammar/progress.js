(function (root) {
  'use strict';
  const KEY = 'danh-grammar-room-v1', DAY = 86400000;
  const fresh = () => ({ version: 1, records: {}, rounds: [], active: null });
  function valid(state) {
    return state && state.version === 1 && state.records && typeof state.records === 'object' && !Array.isArray(state.records) && Array.isArray(state.rounds);
  }
  function load(storage) {
    try { const raw = storage.getItem(KEY); if (!raw) return { state: fresh(), warning: '' }; const parsed = JSON.parse(raw); if (!valid(parsed)) throw new Error('invalid'); return { state: parsed, warning: '' }; }
    catch { return { state: fresh(), warning: 'Chưa đọc được tiến độ đã lưu. Em vẫn có thể luyện trong lượt này.' }; }
  }
  function save(storage,state) { try { storage.setItem(KEY,JSON.stringify(state)); return true; } catch { return false; } }
  function record(state,q,result,roundId,now = Date.now()) {
    const previous = state.records[q.id];
    if (previous && previous.roundId === roundId) return false;
    const success = result.kind === 'first';
    const stage = success ? previous ? Math.min((Number.isInteger(previous.stage) ? previous.stage : -1) + 1,2) : 0 : -1;
    const interval = success ? [3,7,14,14][stage] : 1;
    state.records[q.id] = { kind: result.kind, attempts: result.attempts, topic: q.topic, familyId: q.familyId, level: q.level, stage, due: now + interval*DAY, needsReview: !success || Boolean(previous && previous.needsReview && stage < 2), roundId, last: now };
    return true;
  }
  function due(state, now = Date.now()) { return Object.entries(state.records).filter(([,r]) => r && Number.isFinite(r.due) && r.due <= now).map(([id]) => id); }
  function mistakes(state) { return Object.entries(state.records).filter(([,r]) => r && r.needsReview).map(([id]) => id); }
  function completed(state,round, now = Date.now()) {
    if (state.rounds.some(r => r.id === round.id)) return false;
    state.rounds.push({ id: round.id, topic: round.topic, level: round.level, mode: round.mode, started: round.started, ended: now, questionIds: round.questionIds, families: round.families, outcomes: round.outcomes, total: round.questionIds.length });
    state.rounds = state.rounds.slice(-300); state.active = null; return true;
  }
  function mastered(state,topic,level,questions) {
    const pool = questions.filter(q => q.topic === topic && q.level === level);
    const required = {choice:6,fill:4,order:4,correct:2,rewrite:4};
    if(new Set(pool.map(q=>q.familyId)).size < 20 || Object.entries(required).some(([type,n])=>new Set(pool.filter(q=>q.type===type).map(q=>q.familyId)).size<n)) return false;
    const rounds = state.rounds.filter(r => r.topic===topic && r.level===level && r.total===10 && r.outcomes.filter(o=>o.kind==='first').length>=9).sort((a,b)=>a.ended-b.ended);
    for(let i=0;i<rounds.length;i++) {
      const first=rounds[i];
      for(let j=i+1;j<rounds.length;j++) {
        const second=rounds[j];
        if(second.mode==='review' || first.mode==='review' || second.families.some(id=>first.families.includes(id))) continue;
        const learnt=new Set([...first.families,...second.families]);
        if(rounds.slice(j+1).some(r=>r.mode==='review' && r.ended-second.ended>=7*DAY && r.families.every(id=>learnt.has(id)))) return true;
      }
    }
    return false;
  }
  const api = { KEY, DAY, fresh, load, save, record, due, mistakes, completed, mastered };
  root.DanhGrammarProgress = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
