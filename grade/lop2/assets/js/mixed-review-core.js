/* Profile-scoped mixed practice; independent of each Unit's progress. */
(() => {
  'use strict';
  const KEY = 'danh-g2-mixed-review-v1';
  const modes = ['meaning', 'listening', 'spelling', 'sentence'];
  const outcomes = ['first', 'retry', 'hinted', 'revealed', 'skipped'];
  const normalize = value => String(value).toLowerCase().replace(/’/g, "'").replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
  const search = value => normalize(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const shuffle = (values, random = Math.random) => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  };
  class Review {
    constructor(units, storage, random = Math.random) {
      this.units = Object.values(units).sort((a,b) => Number(a.id.replace('gsunit','')) - Number(b.id.replace('gsunit','')));
      this.unitIds = this.units.map(u => u.id);
      this.words = new Map();
      for (const unit of this.units) for (const word of unit.words) {
        const question = unit.questions.find(q => q.imageWordId === word.id);
        if (question) this.words.set(`${unit.id}:${word.id}`, { ...word, key:`${unit.id}:${word.id}`, unitId:unit.id, unitTitle:unit.title, question });
      }
      this.storage = storage; this.random = random; this.storageAvailable = true; this.recovered = false;
      this.state = { version:1, selected:[...this.unitIds], active:null, history:[] };
      try {
        const text = storage.getItem(KEY);
        if (!text) return;
        const saved = JSON.parse(text);
        if (saved?.version !== 1 || !this.validUnits(saved.selected)) { this.recovered = true; return; }
        this.state.selected = saved.selected;
        if (saved.active && this.validRound(saved.active)) this.state.active = saved.active;
        else if (saved.active) this.recovered = true;
        if (Array.isArray(saved.history)) this.state.history = saved.history.filter(h =>
          typeof h?.id === 'string' && Number.isFinite(h.completedAt) && Number.isInteger(h.total) && h.total > 0 && h.total <= 48 &&
          Number.isInteger(h.score) && h.score >= 0 && h.score <= h.total * 10).slice(-20);
      } catch { this.recovered = true; }
    }
    validUnits(ids) { return Array.isArray(ids) && ids.length > 0 && ids.length <= this.unitIds.length && new Set(ids).size === ids.length && ids.every(id => this.unitIds.includes(id)); }
    validRound(r) {
      if (!r || typeof r.id !== 'string' || !this.validUnits(r.units) || !Array.isArray(r.tasks) || !r.tasks.length || r.tasks.length > 48 ||
          new Set(r.tasks.map(t => t?.key)).size !== r.tasks.length || !Number.isInteger(r.index) || r.index < 0 || r.index > r.tasks.length ||
          !Array.isArray(r.answers) || r.answers.length !== r.tasks.length) return false;
      return r.tasks.every((task, index) => {
        const word = this.words.get(task?.key), a = r.answers[index];
        if (!word || !r.units.includes(word.unitId) || !modes.includes(task.mode)) return false;
        if (!Array.isArray(task.options) || task.options.length > 4 || new Set(task.options).size !== task.options.length ||
            !task.options.every(k => this.words.has(k) && r.units.includes(this.words.get(k).unitId))) return false;
        if (['meaning','listening'].includes(task.mode) && (task.options.length < 2 || !task.options.includes(task.key))) return false;
        const count = this.tokens(task).length;
        if (!Array.isArray(task.tokenOrder) || task.tokenOrder.length !== count || new Set(task.tokenOrder).size !== count || !task.tokenOrder.every(n => Number.isInteger(n) && n >= 0 && n < count)) return false;
        return a && Number.isInteger(a.mistakes) && a.mistakes >= 0 && a.mistakes < 10000 && typeof a.hint === 'boolean' &&
          typeof a.draft === 'string' && a.draft.length <= 500 && typeof a.lastAttempt === 'string' && a.lastAttempt.length <= 500 &&
          Array.isArray(a.wrongChoices) && new Set(a.wrongChoices).size === a.wrongChoices.length && a.wrongChoices.every(k => task.options.includes(k) && k !== task.key) &&
          Array.isArray(a.parts) && new Set(a.parts).size === a.parts.length && a.parts.every(n => task.tokenOrder.includes(n)) &&
          (a.outcome === null || outcomes.includes(a.outcome)) && (index >= r.index || a.outcome !== null) && (index <= r.index || a.outcome === null) &&
          (a.outcome !== 'first' || (a.mistakes === 0 && !a.hint)) && (a.outcome !== 'retry' || (a.mistakes > 0 && !a.hint)) && (a.outcome !== 'hinted' || a.hint);
      });
    }
    save() { try { this.storage.setItem(KEY, JSON.stringify(this.state)); this.storageAvailable = true; } catch { this.storageAvailable = false; } }
    select(ids) { if (!this.validUnits(ids)) return false; this.state.selected = [...ids]; this.save(); return true; }
    pool(ids = this.state.selected) { return [...this.words.values()].filter(w => ids.includes(w.unitId)); }
    roundLength(ids = this.state.selected) { return Math.min(this.pool(ids).length, Math.max(10, ids.length)); }
    start(reviewTasks) {
      const ids = this.state.selected;
      let tasks;
      if (reviewTasks?.length) tasks = reviewTasks.map(t => ({...t,options:[...t.options],tokenOrder:[...t.tokenOrder]}));
      else {
        const buckets = shuffle(ids, this.random).map(id => shuffle(this.pool([id]), this.random));
        const words = [];
        while (words.length < this.roundLength(ids)) for (const bucket of buckets) {
          if (bucket.length && words.length < this.roundLength(ids)) words.push(bucket.pop());
        }
        tasks = words.map((word, i) => {
          const task = { key:word.key, mode:modes[(i + this.state.history.length) % 4], options:[], tokenOrder:[] };
          const distractors = shuffle(this.pool(ids).filter(w => normalize(w.name) !== normalize(word.name) && normalize(w.meaning) !== normalize(word.meaning)), this.random);
          const unique = [];
          for (const candidate of distractors) if (!unique.some(w => normalize(w.name) === normalize(candidate.name) || normalize(w.meaning) === normalize(candidate.meaning))) unique.push(candidate);
          task.options = shuffle([word.key, ...unique.slice(0,3).map(w => w.key)], this.random);
          if (task.options.length < 2 && ['meaning','listening'].includes(task.mode)) task.mode = 'spelling';
          task.tokenOrder = shuffle(this.tokens(task).map((_,n) => n), this.random);
          return task;
        });
      }
      const roundUnits = reviewTasks?.length ? [...this.round.units] : [...ids];
      this.state.active = { id:globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, units:roundUnits,
        tasks, index:0, answers:tasks.map(() => ({ mistakes:0, hint:false, draft:'', parts:[], wrongChoices:[], lastAttempt:'', outcome:null })) };
      this.save(); return this.state.active;
    }
    get round() { return this.state.active; }
    get task() { return this.round?.tasks[this.round.index]; }
    get answer() { return this.round?.answers[this.round.index]; }
    tokens(task = this.task) { return this.words.get(task.key).question.answer.replace(/[.?!]+$/, '').split(/\s+/); }
    expected(task = this.task) { const w = this.words.get(task.key); return task.mode === 'sentence' ? w.question.answer : w.name; }
    draft(value) { if (this.answer && !this.answer.outcome) { this.answer.draft = String(value).slice(0,500); this.save(); } }
    togglePart(index) {
      if (!this.answer || this.answer.outcome || !this.task.tokenOrder.includes(index)) return;
      const at = this.answer.parts.indexOf(index);
      if (at < 0) this.answer.parts.push(index); else this.answer.parts.splice(at,1);
      this.save();
    }
    hint() { if (!this.answer || this.answer.outcome) return false; this.answer.hint = true; this.save(); return true; }
    submit(value) {
      const a = this.answer, t = this.task;
      if (!a || a.outcome) return 'locked';
      const raw = String(value).slice(0,500), cleaned = normalize(raw);
      if (!cleaned) return 'empty';
      const w = this.words.get(t.key);
      const correct = ['meaning','listening'].includes(t.mode) ? raw === t.key : t.mode === 'sentence'
        ? w.question.acceptedAnswers.some(v => normalize(v) === cleaned) : normalize(w.name) === cleaned;
      if (!correct) {
        if (a.lastAttempt === cleaned) return 'repeat';
        a.lastAttempt = cleaned; a.mistakes = Math.min(9999,a.mistakes+1);
        if (t.options.includes(raw) && !a.wrongChoices.includes(raw)) a.wrongChoices.push(raw);
        this.save(); return 'wrong';
      }
      a.outcome = a.hint ? 'hinted' : a.mistakes ? 'retry' : 'first'; this.save(); return a.outcome;
    }
    resolve(outcome) { if (!this.answer || this.answer.outcome || !['revealed','skipped'].includes(outcome)) return false; this.answer.outcome = outcome; this.save(); return true; }
    totals(round = this.round) {
      const total = Object.fromEntries(outcomes.map(k => [k,0]));
      for (const answer of round.answers) if (answer.outcome) total[answer.outcome]++;
      return { ...total, score:total.first*10+total.retry*5+total.hinted*3, total:round.tasks.length };
    }
    next() {
      if (!this.answer?.outcome) return false;
      this.round.index++;
      if (this.round.index === this.round.tasks.length && !this.state.history.some(h => h.id === this.round.id)) {
        this.state.history.push({id:this.round.id,completedAt:Date.now(),...this.totals()}); this.state.history = this.state.history.slice(-20);
      }
      this.save(); return true;
    }
    needsReview() { return this.round.tasks.filter((t,i) => this.round.answers[i].outcome !== 'first'); }
  }
  const api = {Review,KEY,modes,normalize,search};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else window.DanhGrade2Review = api;
})();
