/* One Unit artwork source for vocabulary, games and mixed review. */
(() => {
  'use strict';
  const images = {
  "grapes": "grade/lop2/assets/images/pencil/units/grapes-v1.webp",
  "fox": "grade/lop2/assets/images/pencil/units/fox-v1.webp",
  "volleyball": "grade/lop2/assets/images/pencil/units/volleyball-v1.webp",
  "pasta": "grade/lop2/assets/images/pencil/units/pasta-v1.webp",
  "popcorn": "grade/lop2/assets/images/pencil/units/popcorn-v1.webp",
  "kitten": "grade/lop2/assets/images/pencil/units/kitten-v1.webp",
  "sail": "grade/lop2/assets/images/pencil/units/sail-v1.webp",
  "sand": "grade/lop2/assets/images/pencil/units/sand-v1.webp",
  "sea": "grade/lop2/assets/images/pencil/units/sea-v1.webp",
  "rainbow": "grade/lop2/assets/images/pencil/units/rainbow-v1.webp",
  "river": "grade/lop2/assets/images/pencil/units/river-v1.webp",
  "road": "grade/lop2/assets/images/pencil/units/road-v1.webp",
  "question": "grade/lop2/assets/images/pencil/units/question-v1.webp",
  "quiz": "grade/lop2/assets/images/pencil/units/quiz-v1.webp",
  "box": "grade/lop2/assets/images/pencil/units/box-v1.webp",
  "ox": "grade/lop2/assets/images/pencil/units/ox-v1.webp",
  "jelly": "grade/lop2/assets/images/pencil/units/jelly-v1.webp",
  "village": "grade/lop2/assets/images/pencil/units/village-v1.webp",
  "van": "grade/lop2/assets/images/pencil/units/van-v1.webp",
  "yogurt": "grade/lop2/assets/images/pencil/units/yogurt-v1.webp",
  "yams": "grade/lop2/assets/images/pencil/units/yams-v1.webp",
  "yo-yos": "grade/lop2/assets/images/pencil/units/yo-yos-v1.webp",
  "zoo": "grade/lop2/assets/images/pencil/units/zoo-v1.webp",
  "zebra": "grade/lop2/assets/images/pencil/units/zebra-v1.webp",
  "slide": "grade/lop2/assets/images/pencil/units/slide-v1.webp",
  "drive": "grade/lop2/assets/images/pencil/units/drive-v1.webp",
  "shirts": "grade/lop2/assets/images/pencil/units/shirts-v1.webp",
  "tent": "grade/lop2/assets/images/pencil/units/tent-v1.webp",
  "teapot": "grade/lop2/assets/images/pencil/units/teapot-v1.webp",
  "blanket": "grade/lop2/assets/images/pencil/units/blanket-v1.webp",
  "pizza": "grade/lop2/assets/images/pencil/fooddrinks/pizza-v1.webp",
  "kite": "grade/lop2/assets/images/pencil/toys/kite-v1.webp",
  "bike": "grade/lop2/assets/images/pencil/transport/bike-v1.webp",
  "square": "grade/lop2/assets/images/pencil/shapes/square-v1.webp",
  "juice": "grade/lop2/assets/images/pencil/fooddrinks/juice-v1.webp",
  "ride": "grade/lop2/assets/images/pencil/verbs/ride-v1.webp",
  "cake": "grade/lop2/assets/images/pencil/fooddrinks/cake-v1.webp",
  "table": "grade/lop2/assets/images/pencil/householditems/table-v1.webp",
  "brother": "grade/lop2/assets/images/pencil/familyfriends/brother-v1.webp",
  "sister": "grade/lop2/assets/images/pencil/familyfriends/sister-v1.webp",
  "grandmother": "grade/lop2/assets/images/pencil/familyfriends/grandmother-v1.webp",
  "shoes": "grade/lop2/assets/images/pencil/clothes/shoes-v1.webp",
  "shorts": "grade/lop2/assets/images/pencil/clothes/shorts-v1.webp",
  "jam": "grade/lop4/assets/images/pencil/jam-v1.webp"
};
  const root = new URL('../../../../', document.currentScript.src);
  for (const unit of Object.values(window.grade2Units || {})) {
    for (const word of unit.words) {
      const file = images[word.id];
      if (!file) continue; // Keep the original, legible number diagrams in Unit 13.
      const href = new URL(file, root).href;
      word.image = href;
      word.visual = '<svg class="danh-vocabulary-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" aria-hidden="true"><image href="' + href + '" width="360" height="360" preserveAspectRatio="xMidYMid meet"/></svg>';
    }
  }
})();
