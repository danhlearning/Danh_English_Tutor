/* Sentence practice for Colors; shares the existing Grade 2 scoring and progress engine. */
(() => {
  'use strict';
  const all = colorsData.map(word => ({
    id: word.name.toLowerCase(),
    answer: `It is ${word.name.toLowerCase()}.`,
    vietnamese: word.isTransparent ? 'Nó trong suốt.' : `Nó có màu ${word.meaning.replace(/^Màu /i, '').toLowerCase()}.`,
    visual: word.icon,
    meaning: word.meaning
  }));
  let selected = all.map(question => question.id);
  let deck = [];
  let index = 0;
  const find = id => document.getElementById(id);
  const game = window.DanhLegacyGame4.create({
    topic: 'colors',
    prepare: () => { deck = all.filter(question => selected.includes(question.id)).sort(() => Math.random() - 0.5); index = 0; },
    questions: () => deck,
    answers: question => [question.answer, question.answer.replace('It is ', "It's ")],
    primary: question => question.answer,
    setIndex: value => { index = value; },
    render: () => {
      const question = deck[index];
      find('count-counter-text').textContent = `Câu ${index + 1} / ${deck.length}`;
      const stage = find('count-items-container');
      stage.replaceChildren();
      const image = document.createElement('div');
      image.className = 'colors-game4-image';
      image.setAttribute('role', 'img');
      image.setAttribute('aria-label', question.meaning);
      image.innerHTML = question.visual;
      const meaning = document.createElement('p');
      meaning.className = 'colors-game4-prompt';
      meaning.textContent = question.vietnamese;
      const hint = document.createElement('p');
      hint.textContent = 'Gợi ý: It is + màu.';
      stage.append(image, meaning, hint);
      find('count-sentence-input').value = '';
      find('count-feedback').textContent = '';
    },
    speak: value => speak(value),
    sound: () => {}
  });
  const originalSwitchTab = window.switchTab;
  window.switchTab = (id, event) => {
    originalSwitchTab(id, event);
    if (id === 'game-count') game.open();
  };
  window.checkCountSentence = () => game.check();
  window.revealCountSentence = () => game.reveal();
  window.DanhColorsGame4 = Object.freeze({
    setSelection(ids, restart = false) {
      if (!restart && selected.length === ids.length && selected.every(id => ids.includes(id))) return;
      selected = ids.filter(id => all.some(question => question.id === id));
      game.restart();
    }
  });
  find('count-sentence-input').addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.repeat && !event.isComposing) {
      event.preventDefault();
      game.check();
    }
  });
})();
