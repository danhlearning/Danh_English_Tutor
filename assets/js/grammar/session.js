(function (root) {
  'use strict';
  function create(questions, { topic, level, mode, topics = [] }, now = Date.now()) {
    return { id: `${now}-${Math.random().toString(36).slice(2,10)}`, topic, level, mode, topics, started: now, version: 1, questionIds: questions.map(q=>q.id), questionVersions: questions.map(q=>q.version), families: questions.map(q=>q.familyId), index: 0, outcomes: [], attempts: 0, revealed: false, answer: '', elapsed: 0, hint: false, order: [], optionOrder: [], tokenOrder: [] };
  }
  function compatible(session, map) {
    if(!session || session.version!==1 || !Array.isArray(session.questionIds) || !session.questionIds.length || session.questionIds.length>10 || !Array.isArray(session.questionVersions) || !Array.isArray(session.outcomes) || !Array.isArray(session.families) || !Number.isInteger(session.index) || session.index<0 || session.index>=session.questionIds.length || !Number.isInteger(session.attempts) || session.attempts<0 || !Array.isArray(session.order) || !Array.isArray(session.optionOrder) || !Array.isArray(session.tokenOrder) || !Number.isFinite(session.elapsed)) return false;
    if(new Set(session.questionIds).size!==session.questionIds.length || new Set(session.families).size!==session.families.length) return false;
    if(typeof session.answer!=='string'||session.elapsed<0||session.outcomes.length>session.questionIds.length||session.outcomes.some(o=>!o||!['first','corrected','seen','skipped'].includes(o.kind))||session.outcomes.slice(0,session.index).length!==session.index||!['topic','review','mixed'].includes(session.mode))return false;
    if(!session.questionIds.every((id,i)=> map[id] && map[id].version===session.questionVersions[i] && map[id].familyId===session.families[i]))return false;
    const q=map[session.questionIds[session.index]],indices=(list,max)=>new Set(list).size===list.length&&list.every(n=>Number.isInteger(n)&&n>=0&&n<max);
    return indices(session.order,q.tokens.length)&&indices(session.tokenOrder,q.tokens.length)&&indices(session.optionOrder,q.options.length);
  }
  function result(session, index = session.index) { return session.outcomes[index]; }
  function finishQuestion(session,kind) {
    if(result(session)) return false;
    session.outcomes[session.index] = { kind: session.revealed ? 'seen' : kind, attempts: session.attempts };
    return true;
  }
  function next(session) {
    if(!result(session)) return false;
    if(session.index===session.questionIds.length-1) return 'complete';
    session.index++; session.attempts=0;session.revealed=false;session.answer='';session.elapsed=0;session.hint=false;session.order=[];session.optionOrder=[];session.tokenOrder=[];session.lastAttempt='';
    return true;
  }
  function canReveal(session) { return session.attempts>=2 || session.elapsed>=60000; }
  function canHint(session,q) { return session.elapsed >= (q.type==='choice' || q.type==='fill' && q.level!==3 ? 20000 : 60000); }
  const api={create,compatible,result,finishQuestion,next,canReveal,canHint};
  root.DanhGrammarSession=api;
  if(typeof module!=='undefined') module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
