/* One compact navigation pattern for every Grade 2 topic. */
(() => {
  const nav = document.querySelector('body.grade2-topic > nav');
  const header = document.querySelector('body.grade2-topic > header');
  const container = document.querySelector('body.grade2-topic > .container');
  if (!nav || !header || !container || nav.dataset.grade2Ready) return;

  const tabs = [...nav.querySelectorAll(':scope > button.nav-btn')];
  const tabId = button => button.getAttribute('onclick')?.match(/switchTab\('([^']+)'/)?.[1];
  const vocab = tabs.find(button => tabId(button) === 'vocab');
  const sentences = tabs.find(button => tabId(button) === 'sentences');
  const gameTabs = tabs.filter(button => /^game-/.test(tabId(button) || ''));
  if (!vocab || !sentences || !gameTabs.length) return;
  nav.dataset.grade2Ready = 'true';
  nav.classList.add('g2-main-nav');
  nav.setAttribute('aria-label', 'Các phần của bài học');
  vocab.textContent = 'Từ vựng';
  sentences.textContent = 'Mẫu câu';
  vocab.type = sentences.type = 'button';

  const links = document.createElement('div');
  links.className = 'g2-page-links';
  links.setAttribute('role', 'navigation');
  links.setAttribute('aria-label', 'Quay lại');
  for (const [label, href] of [['🏠 Trang chủ', '../../index.html'], ['📚 Lớp 2', './lop2.html']]) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    links.append(link);
  }
  header.after(links);

  const games = gameTabs.map(button => ({ id: tabId(button), label: ({
    'game-flip': 'Lật thẻ',
    'game-mcq': 'Trắc nghiệm',
    'game-spelling': 'Chính tả',
    'game-count': 'Viết câu'
  })[tabId(button)] })).filter(game => game.label);
  gameTabs.forEach(button => button.remove());
  let lastGame = games[0].id;
  const gamesButton = document.createElement('button');
  gamesButton.type = 'button';
  gamesButton.className = 'nav-btn g2-games-tab';
  gamesButton.dataset.gameNav = 'true';
  gamesButton.textContent = 'Trò chơi';
  gamesButton.addEventListener('click', () => openGame(lastGame));
  nav.append(gamesButton);

  const switcher = document.createElement('section');
  switcher.className = 'g2-game-switcher';
  switcher.setAttribute('aria-label', 'Chọn trò chơi');
  switcher.hidden = true;
  switcher.style.setProperty('--g2-game-count', String(games.length));
  const choices = document.createElement('div');
  choices.className = 'g2-game-choices';
  for (const game of games) {
    const choice = document.createElement('button');
    choice.type = 'button';
    choice.className = 'g2-game-choice';
    choice.dataset.game = game.id;
    choice.textContent = game.label;
    choice.addEventListener('click', () => openGame(game.id));
    choices.append(choice);
  }
  switcher.append(choices);
  const firstGame = container.querySelector(':scope > #game-flip');
  container.insertBefore(switcher, firstGame);

  function openGame(id) {
    if (!games.some(game => game.id === id)) id = games[0].id;
    lastGame = id;
    window.switchTab(id, { target: gamesButton, currentTarget: gamesButton });
    sync();
  }
  function sync() {
    const active = container.querySelector(':scope > .tab-content.active')?.id;
    const inGame = games.some(game => game.id === active);
    if (inGame) lastGame = active;
    switcher.hidden = !inGame;
    for (const [button, selected] of [[vocab, active === 'vocab'],
      [sentences, active === 'sentences'], [gamesButton, inGame]]) {
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
    for (const choice of choices.children) {
      const selected = choice.dataset.game === active;
      choice.classList.toggle('active', selected);
      choice.setAttribute('aria-pressed', String(selected));
    }
  }

  /* Animals still has page-specific Game 1 controls; the other topics use learning-core.js. */
  const legacyControls = container.querySelector('#game-flip [onclick^="prevSingleCard("]')?.parentElement;
  if (legacyControls?.querySelector('[onclick^="nextSingleCard("]')) {
    legacyControls.classList.add('g2-flashcard-controls');
    for (const button of legacyControls.querySelectorAll('button')) {
      button.classList.remove('nav-btn');
      button.classList.add('g2-card-nav-btn');
      button.type = 'button';
      const action = button.getAttribute('onclick') || '';
      if (action.startsWith('prevSingleCard(')) button.textContent = '← Thẻ trước';
      if (action.startsWith('nextSingleCard(')) {
        button.textContent = 'Thẻ tiếp →';
        button.dataset.direction = 'next';
      }
    }
  }

  for (const tab of container.querySelectorAll(':scope > .tab-content')) {
    new MutationObserver(sync).observe(tab, { attributes: true, attributeFilter: ['class'] });
  }
  document.addEventListener('DOMContentLoaded', sync);
  sync();
})();

/* Show a reveal button only after ten seconds on the current unanswered question. */
(() => {
  const delay = 10000;
  for (const section of document.querySelectorAll('#game-count, #game-spelling')) {
    const buttons = [...section.querySelectorAll('button')].filter(button => button.textContent.includes('Hiện đáp án'));
    if (!buttons.length) continue;
    const input = section.querySelector('#sentence-input, #count-sentence-input, #spelling-input');
    const question = section.querySelector('#sentence-stage, #count-counter-text, #spelling-preview');
    if (!input || !question) continue;
    for (const button of buttons) {
      let timer = null;
      let generation = 0;
      let ready = false;
      let used = false;
      function hide() {
        button.hidden = true;
        button.disabled = true;
        button.removeAttribute('data-reveal-ready');
      }
      function reset() {
        generation++;
        clearTimeout(timer);
        timer = null;
        ready = used = false;
        hide();
        if (!section.classList.contains('active') || document.hidden || input.disabled) return;
        const current = generation;
        timer = setTimeout(() => {
          timer = null;
          if (current !== generation || used || input.disabled || document.hidden || !section.classList.contains('active')) return;
          ready = true;
          button.hidden = false;
          button.disabled = false;
          button.dataset.revealReady = 'true';
        }, delay);
      }
      button.addEventListener('click', event => {
        if (ready && !used && !input.disabled) return;
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
      button.addEventListener('click', () => {
        used = true;
        ready = false;
        clearTimeout(timer);
        timer = null;
        hide();
      });
      new MutationObserver(reset).observe(question, { childList: true, characterData: true, subtree: true });
      new MutationObserver(reset).observe(section, { attributes: true, attributeFilter: ['class'] });
      new MutationObserver(() => {
        if (input.disabled) {
          generation++;
          clearTimeout(timer);
          timer = null;
          ready = false;
          hide();
        } else if (!timer && !ready && !used) reset();
      }).observe(input, { attributes: true, attributeFilter: ['disabled'] });
      document.addEventListener('visibilitychange', reset);
      reset();
    }
  }
})();
