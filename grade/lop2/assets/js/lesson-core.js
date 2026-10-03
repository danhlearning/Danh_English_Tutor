/* Chức năng dùng chung cho các chủ đề Lớp 2. */
(function () {
  'use strict';
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function normalizeSentence(text) {
    return text.toLowerCase().replace(/’/g, "'").replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
  }
  function createSelection(lesson, storage) {
    const allIds = lesson.vocabulary.map(word => word.id);
    const knownIds = new Set(allIds);
    const key = 'danh:lop2:' + lesson.id + ':selected-words:v1';
    let selected = [...allIds];
    try {
      if (storage === undefined) storage = (window.DanhLearners?.storage || window.localStorage);
      const saved = JSON.parse(storage?.getItem(key) || 'null');
      if (Array.isArray(saved)) {
        const valid = [...new Set(saved.filter(id => knownIds.has(id)))];
        if (valid.length >= 4) selected = valid;
      }
    } catch (_) { /* Học bình thường khi trình duyệt không cho lưu. */ }
    return {
      ids: () => [...selected],
      words: () => lesson.vocabulary.filter(word => selected.includes(word.id)),
      questions: () => lesson.questions.filter(question => question.targetWordIds.every(id => selected.includes(id))),
      apply(ids) {
        const valid = [...new Set(ids.filter(id => knownIds.has(id)))];
        if (valid.length < 4) throw new Error('Hãy chọn ít nhất 4 từ để trắc nghiệm có đủ 4 đáp án.');
        selected = valid;
        let saved = false;
        try { if (storage) { storage.setItem(key, JSON.stringify(selected)); saved = true; } } catch (_) {}
        return { saved };
      }
    };
  }
  function mountWordPicker(host, lesson, selection, onApply) {
    const details = document.createElement('details');
    details.className = 'word-picker';
    details.open = true;
    details.innerHTML = '<summary>Chọn từ để luyện tập <span class="picker-applied"></span></summary>' +
      '<p class="picker-help">Bộ từ áp dụng cho cả 4 game. Chọn ít nhất 4 từ. Áp dụng bộ từ sẽ bắt đầu lượt mới.</p>' +
      '<div class="picker-modes" role="group" aria-label="Cách chọn từ">' +
      '<button type="button" data-mode="all">Tất cả</button><button type="button" data-mode="custom">Tự chọn</button></div>' +
      '<fieldset><legend>Đánh dấu các từ muốn luyện tập</legend><div class="picker-grid"></div></fieldset>' +
      '<p class="picker-count" aria-live="polite"></p>' +
      '<p class="picker-error" role="status"></p>' +
      '<button type="button" class="picker-apply">Áp dụng cho 4 game</button>';
    host.appendChild(details);
    const grid = details.querySelector('.picker-grid');
    const all = details.querySelector('[data-mode="all"]');
    const custom = details.querySelector('[data-mode="custom"]');
    const apply = details.querySelector('.picker-apply');
    const error = details.querySelector('.picker-error');
    const applied = details.querySelector('.picker-applied');
    let draft = new Set(selection.ids());
    let mode = draft.size === lesson.vocabulary.length ? 'all' : 'custom';
    const inputs = new Map();
    lesson.vocabulary.forEach(word => {
      const label = document.createElement('label');
      label.className = 'picker-word';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = word.id;
      checkbox.checked = draft.has(word.id);
      const picture = document.createElement('span');
      picture.className = 'picker-picture';
      picture.setAttribute('aria-hidden', 'true');
      picture.innerHTML = word.svg;
      const text = document.createElement('span');
      const english = document.createElement('strong');
      english.textContent = word.name;
      const meaning = document.createElement('span');
      meaning.textContent = word.meaning;
      text.append(english, meaning);
      label.append(checkbox, picture, text);
      grid.appendChild(label);
      inputs.set(word.id, checkbox);
      checkbox.addEventListener('change', () => {
        mode = 'custom';
        checkbox.checked ? draft.add(word.id) : draft.delete(word.id);
        updateDraft();
      });
    });
    function updateDraft() {
      all.setAttribute('aria-pressed', String(mode === 'all'));
      custom.setAttribute('aria-pressed', String(mode === 'custom'));
      details.querySelector('.picker-count').textContent = 'Đã chọn ' + draft.size + '/' + lesson.vocabulary.length + ' từ';
      apply.disabled = draft.size < 4;
      error.textContent = draft.size < 4 ? 'Hãy chọn ít nhất 4 từ để trắc nghiệm có đủ 4 đáp án.' : '';
    }
    function updateApplied() {
      applied.textContent = '— Đang dùng ' + selection.ids().length + '/' + lesson.vocabulary.length + ' từ · Đổi bộ từ';
    }
    all.addEventListener('click', () => {
      mode = 'all';
      draft = new Set(lesson.vocabulary.map(word => word.id));
      inputs.forEach(input => { input.checked = true; });
      updateDraft();
    });
    custom.addEventListener('click', () => {
      mode = 'custom';
      updateDraft();
      inputs.values().next().value?.focus();
    });
    apply.addEventListener('click', () => {
      const result = selection.apply([...draft]);
      onApply();
      updateApplied();
      details.open = false;
      host.querySelector('.picker-status').textContent = 'Đã áp dụng ' + selection.ids().length + ' từ cho 4 game.' +
        (result.saved ? '' : ' Trình duyệt không lưu được lựa chọn; bộ từ vẫn dùng trong phiên này.');
      details.querySelector('summary').focus();
    });
    const status = document.createElement('p');
    status.className = 'picker-status';
    status.setAttribute('role', 'status');
    host.appendChild(status);
    updateDraft();
    updateApplied();
  }
  window.Lop2Lesson = Object.freeze({ shuffle, normalizeSentence, createSelection, mountWordPicker });
})();
