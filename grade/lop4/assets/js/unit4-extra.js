/* Original Lesson 3 practice for Grade 4 Unit 4. */
(() => {
  'use strict';
  if (document.body.dataset.unit !== 'unit4') return;
  const unit = window.DanhGrade4Units?.unit4;
  const form = document.getElementById('unit4-invitation-form');
  const preview = document.getElementById('unit4-invitation-preview');
  const printButton = document.getElementById('unit4-invitation-print');
  const readingFeedback = document.getElementById('unit4-reading-feedback');
  const pronunciationNote = document.getElementById('unit4-pronunciation-note');
  if (!unit || !form || !preview) return;

  for (const word of unit.words.filter(item => item.group === 'months')) {
    const option = document.createElement('option');
    option.value = option.textContent = word.name;
    form.elements.month.append(option);
  }

  for (const button of document.querySelectorAll('[data-unit4-say]')) {
    button.addEventListener('click', () => {
      try {
        if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') throw Error('No speech support');
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(button.dataset.unit4Say);
        utterance.lang = 'en-GB';
        utterance.rate = 0.75;
        window.speechSynthesis.speak(utterance);
        pronunciationNote.textContent = '';
      } catch {
        pronunciationNote.textContent = 'Thiết bị này chưa phát được giọng đọc. Em vẫn có thể nhìn từ và luyện đọc.';
      }
    });
  }

  const answers = [...document.querySelectorAll('[data-unit4-answer]')];
  for (const select of answers) select.addEventListener('change', () => select.removeAttribute('aria-invalid'));
  document.getElementById('unit4-reading-check').addEventListener('click', () => {
    if (answers.some(select => !select.value)) {
      readingFeedback.textContent = 'Em hãy chọn đủ 3 đáp án trước nhé.';
      return;
    }
    let correct = 0;
    for (const select of answers) {
      const matched = select.value === select.dataset.unit4Answer;
      correct += Number(matched);
      if (matched) select.removeAttribute('aria-invalid');
      else select.setAttribute('aria-invalid', 'true');
    }
    readingFeedback.textContent = correct === 3
      ? '✅ Đúng cả 3 câu! Em đã hiểu bài đọc.'
      : `Đúng ${correct}/3 câu. Em đọc lại đoạn văn và sửa các ô được đánh dấu nhé.`;
  });

  function appendText(tag, value, className = '') {
    const element = document.createElement(tag);
    element.textContent = value;
    if (className) element.className = className;
    preview.append(element);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const host = String(fields.get('host') || '').trim();
    const guest = String(fields.get('guest') || '').trim();
    const month = String(fields.get('month') || '');
    const food = String(fields.get('food') || '');
    const drink = String(fields.get('drink') || '');
    if (!host || !guest || !month || !food || !drink) return;
    preview.replaceChildren();
    appendText('h4', "You're invited! 🎉");
    appendText('p', `Dear ${guest},`);
    appendText('p', `My birthday is in ${month}. Please come to my birthday party!`);
    const date = String(fields.get('date') || '');
    if (date) {
      const eventDate = new Date(`${date}T12:00:00`);
      if (!Number.isNaN(eventDate.getTime())) {
        appendText('p', `Date: ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(eventDate)}`);
      }
    }
    const time = String(fields.get('time') || '');
    if (time) appendText('p', `Time: ${time}`);
    const place = String(fields.get('place') || '').trim();
    if (place) appendText('p', `Place: ${place}`);
    appendText('p', `We can have some ${food} and some ${drink} at the party.`);
    appendText('p', `From ${host}`, 'g4-invitation-signature');
    preview.hidden = printButton.hidden = false;
    preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  printButton.addEventListener('click', () => window.print());
})();
