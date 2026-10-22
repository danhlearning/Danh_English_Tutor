(function () {
  'use strict';
  function normalize(value) {
    return String(value).toLowerCase().replace(/’/g, "'").replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
  }
  function create(config) {
    let round = null;
    const find = id => document.getElementById(id);
    const input = () => find('count-sentence-input');
    const feedback = () => find('count-feedback');
    const score = () => find('count-score');
    const counter = () => find('count-counter-text');
    let nextButton;

    function actions() {
      if (!nextButton) {
        nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'btn-action g2-game4-next';
        nextButton.addEventListener('click', next);
        input().parentElement.appendChild(nextButton);
      }
      const section = find('game-count');
      const check = section.querySelector('[onclick^="checkCountSentence("]');
      const reveal = section.querySelector('[onclick^="revealCount"]');
      const locked = round.locked || round.index >= round.total;
      input().disabled = locked;
      if (check) check.disabled = locked;
      if (reveal) reveal.disabled = locked;
      nextButton.hidden = !locked;
      nextButton.textContent = round.index >= round.total ? 'Chơi lại' : 'Câu tiếp theo';
    }
    function updateScore() {
      score().textContent = 'Đã học ' + (round.first + round.retry + round.revealed) + '/' + round.total +
        ' · Đúng ngay ' + round.first + ' · Sửa đúng ' + round.retry + ' · Xem đáp án ' + round.revealed;
    }
    function render() {
      config.setIndex(round.index);
      config.render();
      input().removeAttribute('aria-invalid');
      actions();
      updateScore();
    }
    function restart() {
      config.prepare();
      round = { index: 0, total: config.questions().length, first: 0, retry: 0,
        revealed: 0, mistakes: 0, locked: false };
      if (round.total) render();
      else {
        feedback().textContent = 'Chưa có câu hỏi cho chủ đề này.';
        input().disabled = true;
        updateScore();
      }
    }
    function open() {
      if (!round) restart();
      else actions();
    }
    function check() {
      open();
      if (!round.total || round.locked || round.index >= round.total) return;
      const value = normalize(input().value);
      if (!value) {
        feedback().textContent = 'Hãy nhập câu tiếng Anh trước nhé.';
        input().focus();
        return;
      }
      const question = config.questions()[round.index];
      const answers = config.answers(question).filter(Boolean).map(normalize);
      if (!answers.includes(value)) {
        round.mistakes++;
        feedback().textContent = 'Chưa đúng. Em thử lại nhé!';
        feedback().style.color = '#B42318';
        input().setAttribute('aria-invalid', 'true');
        config.sound(false);
        input().focus();
        return;
      }
      round.locked = true;
      if (round.mistakes) round.retry++;
      else round.first++;
      feedback().textContent = round.mistakes ? 'Em đã sửa đúng!' : 'Chính xác!';
      feedback().style.color = '#247342';
      input().removeAttribute('aria-invalid');
      actions();
      updateScore();
      config.sound(true);
      config.speak(config.primary(question));
    }
    function reveal() {
      open();
      if (!round.total || round.locked || round.index >= round.total) return;
      const question = config.questions()[round.index];
      round.locked = true;
      round.revealed++;
      feedback().textContent = 'Đáp án: ' + config.primary(question);
      feedback().style.color = '#A35A00';
      actions();
      updateScore();
      config.speak(config.primary(question));
    }
    function next() {
      if (!round || !round.locked) return;
      if (round.index >= round.total) { restart(); return; }
      try { window.speechSynthesis?.cancel(); } catch (_) {}
      round.index++;
      if (round.index >= round.total) {
        round.locked = true;
        window.DanhGrade2Progress?.record(config.topic, { total: round.total, first: round.first, retry: round.retry, revealed: round.revealed });
        counter().textContent = 'Hoàn thành lượt luyện câu';
        feedback().textContent = 'Đúng ngay ' + round.first + ', sửa đúng ' + round.retry +
          ', xem đáp án ' + round.revealed + '.';
        feedback().style.color = '#247342';
        nextButton.textContent = 'Chơi lại';
        actions();
        return;
      }
      round.mistakes = 0;
      round.locked = false;
      render();
    }
    return { open, check, reveal, restart };
  }
  window.DanhLegacyGame4 = Object.freeze({ create, normalize });
})();
