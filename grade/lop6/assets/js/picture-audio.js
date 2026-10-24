(() => {
  'use strict';
  window.DanhGrade6Picture = word => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'word-picture g6-picture-audio';
    button.dataset.wordAudio = word.id;
    button.setAttribute('aria-label', `Phát âm: ${word.meaning}`);
    if (word.image) {
      const image = document.createElement('img');
      image.src = word.image; image.alt = ''; image.width = 768; image.height = 768;
      image.loading = 'lazy'; image.draggable = false;
      image.addEventListener('error', () => { image.remove(); button.textContent = word.icon; }, {once:true});
      button.append(image);
    } else button.textContent = word.icon;
    button.addEventListener('click', event => {
      event.stopPropagation();
      window.DanhAnswerSpeech.listen(word.term);
    });
    return button;
  };
})();
