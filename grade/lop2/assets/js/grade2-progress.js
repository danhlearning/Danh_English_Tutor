(function () {
  'use strict';
  const prefix = 'danh:grade2:game4:';
  function key(topic) { return prefix + topic + ':v1'; }
  function valid(result) {
    return result && Number.isInteger(result.total) && result.total > 0 &&
      ['first', 'retry', 'revealed'].every(name => Number.isInteger(result[name]) && result[name] >= 0) &&
      result.first + result.retry + result.revealed === result.total;
  }
  function record(topic, result) {
    if (!/^[a-z0-9-]+$/.test(topic) || !valid(result)) return false;
    try {
      const value = { ...result, completedAt: new Date().toISOString() };
      window.localStorage.setItem(key(topic), JSON.stringify(value));
      return true;
    } catch (_) { return false; }
  }
  function read(topic) {
    if (!/^[a-z0-9-]+$/.test(topic)) return null;
    try {
      const value = JSON.parse(window.localStorage.getItem(key(topic)) || 'null');
      return valid(value) ? value : null;
    } catch (_) { return null; }
  }
  function decorate() {
    const grid = document.querySelector('.lesson-grid');
    if (!grid) return;
    let finished = 0;
    for (const card of document.querySelectorAll('.lesson-grid a.lesson-card')) {
      const topic = card.getAttribute('href')?.split('/').pop()?.replace(/\.html$/, '');
      if (!topic || !read(topic)) continue;
      finished++;
      const badge = document.createElement('span');
      badge.className = 'lesson-progress';
      badge.textContent = '✓ Đã hoàn thành 1 lượt Viết câu';
      card.insertBefore(badge, card.querySelector('.btn-study'));
    }
    const summary = document.createElement('p');
    summary.className = 'grade2-progress-summary';
    summary.textContent = 'Đã hoàn thành ít nhất 1 lượt Game 4 ở ' + finished +
      ' bài học hoặc chủ đề trên thiết bị này.';
    grid.before(summary);
  }
  window.DanhGrade2Progress = Object.freeze({ record, read, decorate });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate);
  else decorate();
})();
