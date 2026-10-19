/* Reviewed, text-free pictures; names and meanings are rendered outside the artwork. */
(() => {
  'use strict';
  const lesson = window.bodyPartsLesson;
  if (!lesson) return;
  for (const word of lesson.vocabulary) {
    const file = window.DanhGrade2PencilManifest?.bodyparts?.[word.name.toLowerCase()] || `bodyparts/${word.id}-v1.webp`;
    const art = `<svg class="pencil-art svg-icon bodyparts-diagram" viewBox="0 0 768 768" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="./assets/images/pencil/${file}" width="768" height="768" preserveAspectRatio="xMidYMid meet"/></svg>`;
    word.svg = word.diagramSvg = art;
  }
})();
