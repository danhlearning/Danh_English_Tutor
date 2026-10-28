/* Reviewed, text-free pictures; names and meanings are rendered outside the artwork. */
(() => {
  'use strict';
  const lesson = window.bodyPartsLesson;
  if (!lesson) return;
  for (const word of lesson.vocabulary) {
    const file = window.DanhGrade2PencilManifest?.bodyparts?.[word.name.toLowerCase()] || `bodyparts/${word.id}-v1.webp`;
    const art = `<img class="pencil-art svg-icon bodyparts-diagram" src="./assets/images/pencil/compact/${file}" srcset="./assets/images/pencil/compact/${file} 480w, ./assets/images/pencil/${file} 768w" sizes="240px" width="768" height="768" alt="" loading="lazy" decoding="async" draggable="false">`;
    word.svg = word.diagramSvg = art;
  }
})();
