/* Original compact 3D vocabulary art, shared by learning and games. */
(() => {
  'use strict';
  const assets = {
  "2:gsunit1": {
    "pasta": "pasta-3d-v1.webp",
    "popcorn": "popcorn-3d-v1.webp",
    "pizza": "pizza-3d-v1.webp"
  },
  "2:gsunit2": {
    "kite": "kite-3d-v1.webp",
    "bike": "bike-3d-v1.webp",
    "kitten": "kitten-3d-v1.webp"
  },
  "2:gsunit3": {
    "sail": "sail-3d-v1.webp",
    "sand": "sand-3d-v1.webp",
    "sea": "sea-3d-v1.webp"
  },
  "2:gsunit4": {
    "rainbow": "rainbow-3d-v1.webp",
    "river": "river-3d-v1.webp",
    "road": "road-3d-v1.webp"
  },
  "2:gsunit5": {
    "question": "question-3d-v1.webp",
    "square": "square-3d-v1.webp",
    "quiz": "quiz-3d-v1.webp"
  },
  "2:gsunit6": {
    "box": "box-3d-v1.webp",
    "fox": "fox-3d-v1.webp",
    "ox": "ox-3d-v1.webp"
  },
  "2:gsunit7": {
    "juice": "juice-3d-v1.webp",
    "jelly": "jelly-3d-v1.webp",
    "jam": "jam-3d-v1.webp"
  },
  "2:gsunit8": {
    "village": "village-3d-v1.webp",
    "van": "van-3d-v1.webp",
    "volleyball": "volleyball-3d-v1.webp"
  },
  "2:gsunit9": {
    "yogurt": "yogurt-3d-v1.webp",
    "yams": "yams-3d-v1.webp",
    "yo-yos": "yo-yos-3d-v1.webp"
  },
  "2:gsunit10": {
    "zoo": "zoo-3d-v1.webp",
    "zebra": "zebra-3d-v1.webp"
  },
  "2:gsunit11": {
    "slide": "slide-3d-v1.webp",
    "ride": "ride-3d-v1.webp",
    "drive": "drive-3d-v1.webp"
  },
  "2:gsunit12": {
    "grapes": "grapes-3d-v1.webp",
    "cake": "cake-3d-v1.webp",
    "table": "table-3d-v1.webp"
  },
  "2:gsunit13": {
    "eleven": "eleven-3d-v1.webp",
    "thirteen": "thirteen-3d-v1.webp",
    "fourteen": "fourteen-3d-v1.webp",
    "fifteen": "fifteen-3d-v1.webp"
  },
  "2:gsunit14": {
    "brother": "brother-3d-v1.webp",
    "sister": "sister-3d-v1.webp",
    "grandmother": "grandmother-3d-v1.webp"
  },
  "2:gsunit15": {
    "shirts": "shirts-3d-v1.webp",
    "shoes": "shoes-3d-v1.webp",
    "shorts": "shorts-3d-v1.webp"
  },
  "2:gsunit16": {
    "tent": "tent-3d-v1.webp",
    "teapot": "teapot-3d-v1.webp",
    "blanket": "blanket-3d-v1.webp"
  },
  "4:unit1": {
    "america": "america-3d-v1.webp",
    "australia": "australia-3d-v1.webp",
    "britain": "britain-3d-v1.webp",
    "japan": "japan-3d-v1.webp",
    "malaysia": "malaysia-3d-v1.webp",
    "vietnam": "viet-nam-3d-v1.webp"
  },
  "4:unit2": {
    "getup": "get-up-3d-v1.webp",
    "breakfast": "have-breakfast-3d-v1.webp",
    "school": "go-to-school-3d-v1.webp",
    "lunch": "have-lunch-3d-v1.webp",
    "dinner": "have-dinner-3d-v1.webp",
    "bed": "go-to-bed-3d-v1.webp"
  },
  "4:unit3": {
    "study-at-school": "study-at-school-3d-v1.webp",
    "listen-to-music": "listen-to-music-3d-v1.webp",
    "do-housework": "do-housework-3d-v1.webp",
    "watch-tv": "watch-tv-3d-v1.webp",
    "go-to-school": "go-to-school-3d-v1.webp",
    "play-football": "play-football-3d-v1.webp"
  },
  "4:unit4": {
    "month-1": "january-3d-v1.webp",
    "month-2": "february-3d-v1.webp",
    "month-3": "march-3d-v1.webp",
    "month-4": "april-3d-v1.webp",
    "month-5": "may-3d-v1.webp",
    "month-6": "june-3d-v1.webp",
    "month-7": "july-3d-v1.webp",
    "month-8": "august-3d-v1.webp",
    "month-9": "september-3d-v1.webp",
    "month-10": "october-3d-v1.webp",
    "month-11": "november-3d-v1.webp",
    "month-12": "december-3d-v1.webp",
    "jam": "jam-3d-v1.webp",
    "chips": "chips-3d-v1.webp",
    "grapes": "grapes-3d-v1.webp",
    "water": "water-3d-v1.webp",
    "lemonade": "lemonade-3d-v1.webp",
    "juice": "juice-3d-v1.webp"
  },
  "4:unit5": {
    "swim": "swim-3d-v1.webp",
    "ride-a-bike": "ride-a-bike-3d-v1.webp",
    "draw": "draw-3d-v1.webp",
    "sing": "sing-3d-v1.webp",
    "dance": "dance-3d-v1.webp",
    "play-the-piano": "play-the-piano-3d-v1.webp"
  },
  "4:unit6": {
    "classroom": "classroom-3d-v1.webp",
    "library": "library-3d-v1.webp",
    "playground": "playground-3d-v1.webp",
    "computer-room": "computer-room-3d-v1.webp",
    "music-room": "music-room-3d-v1.webp",
    "gym": "gym-3d-v1.webp"
  },
  "4:unit7": {
    "maths": "maths-3d-v1.webp",
    "english": "english-3d-v1.webp",
    "music": "music-3d-v1.webp",
    "art": "art-3d-v1.webp",
    "science": "science-3d-v1.webp",
    "pe": "pe-3d-v1.webp"
  },
  "4:unit8": {
    "art": "art-3d-v1.webp",
    "music": "music-3d-v1.webp",
    "science": "science-3d-v1.webp",
    "maths": "maths-3d-v1.webp",
    "english": "english-3d-v1.webp",
    "pe": "pe-3d-v1.webp"
  },
  "4:unit9": {
    "football": "football-3d-v1.webp",
    "badminton": "badminton-3d-v1.webp",
    "basketball": "basketball-3d-v1.webp",
    "table-tennis": "table-tennis-3d-v1.webp",
    "running": "running-3d-v1.webp",
    "swimming": "swimming-3d-v1.webp"
  },
  "4:unit10": {
    "beach": "beach-3d-v1.webp",
    "mountains": "mountains-3d-v1.webp",
    "island": "island-3d-v1.webp",
    "museum": "museum-3d-v1.webp",
    "camping": "camping-3d-v1.webp",
    "sightseeing": "sightseeing-3d-v1.webp"
  },
  "4:unit11": {
    "living-room": "living-room-3d-v1.webp",
    "bedroom": "bedroom-3d-v1.webp",
    "kitchen": "kitchen-3d-v1.webp",
    "bathroom": "bathroom-3d-v1.webp",
    "garden": "garden-3d-v1.webp",
    "balcony": "balcony-3d-v1.webp"
  },
  "4:unit12": {
    "teacher": "teacher-3d-v1.webp",
    "doctor": "doctor-3d-v1.webp",
    "farmer": "farmer-3d-v1.webp",
    "firefighter": "firefighter-3d-v1.webp",
    "chef": "chef-3d-v1.webp",
    "pilot": "pilot-3d-v1.webp"
  },
  "4:unit13": {
    "curly-hair": "curly-hair-3d-v1.webp",
    "straight-hair": "straight-hair-3d-v1.webp",
    "glasses": "glasses-3d-v1.webp",
    "blond-hair": "blond-hair-3d-v1.webp",
    "beard": "beard-3d-v1.webp",
    "freckles": "freckles-3d-v1.webp"
  },
  "4:unit14": {
    "brush-my-teeth": "brush-my-teeth-3d-v1.webp",
    "wash-my-face": "wash-my-face-3d-v1.webp",
    "have-breakfast": "have-breakfast-3d-v1.webp",
    "do-homework": "do-homework-3d-v1.webp",
    "take-a-shower": "take-a-shower-3d-v1.webp",
    "go-to-bed": "go-to-bed-3d-v1.webp"
  },
  "4:unit15": {
    "visit-grandparents": "visit-grandparents-3d-v1.webp",
    "go-shopping": "go-shopping-3d-v1.webp",
    "have-a-picnic": "have-a-picnic-3d-v1.webp",
    "watch-a-film": "watch-a-film-3d-v1.webp",
    "cook-dinner": "cook-dinner-3d-v1.webp",
    "play-games": "play-games-3d-v1.webp"
  },
  "4:unit16": {
    "sunny": "sunny-3d-v1.webp",
    "rainy": "rainy-3d-v1.webp",
    "cloudy": "cloudy-3d-v1.webp",
    "windy": "windy-3d-v1.webp",
    "snowy": "snowy-3d-v1.webp",
    "stormy": "stormy-3d-v1.webp"
  },
  "4:unit17": {
    "hospital": "hospital-3d-v1.webp",
    "post-office": "post-office-3d-v1.webp",
    "cinema": "cinema-3d-v1.webp",
    "park": "park-3d-v1.webp",
    "supermarket": "supermarket-3d-v1.webp",
    "bus-stop": "bus-stop-3d-v1.webp"
  },
  "4:unit18": {
    "t-shirt": "t-shirt-3d-v1.webp",
    "dress": "dress-3d-v1.webp",
    "shoes": "shoes-3d-v1.webp",
    "hat": "hat-3d-v1.webp",
    "bag": "bag-3d-v1.webp",
    "watch": "watch-3d-v2.webp"
  },
  "4:unit19": {
    "elephant": "elephant-3d-v1.webp",
    "giraffe": "giraffe-3d-v1.webp",
    "dolphin": "dolphin-3d-v1.webp",
    "parrot": "parrot-3d-v1.webp",
    "turtle": "turtle-3d-v1.webp",
    "butterfly": "butterfly-3d-v1.webp"
  },
  "4:unit20": {
    "make-a-kite": "make-a-kite-3d-v1.webp",
    "pitch-a-tent": "pitch-a-tent-3d-v1.webp",
    "tell-stories": "tell-stories-3d-v1.webp",
    "sing-songs": "sing-songs-3d-v1.webp",
    "take-photos": "take-photos-3d-v1.webp",
    "play-games": "play-games-3d-v1.webp"
  }
};
  const base = new URL('./assets/vocabulary-3d/', document.currentScript.src);
  const grade2 = document.body.dataset.topic;
  const grade4 = document.body.dataset.unit;
  const apply = (unit, grade) => {
    if (!unit) return;
    const images = assets[grade + ':' + unit.id] || {};
    for (const word of unit.words) {
      const file = images[word.id];
      if (!file) continue;
      const href = new URL(file, base).href;
      word.visual = '<svg class="danh-vocabulary-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" aria-hidden="true"><image href="' + href + '" width="360" height="360" preserveAspectRatio="xMidYMid meet"/></svg>';
    }
  };
  if (grade2) apply(window.grade2Units?.[grade2], 2);
  if (grade4) apply(window.DanhGrade4Units?.[grade4], 4);
  if (!grade4 && window.DanhGrade4Units) for (const unit of Object.values(window.DanhGrade4Units)) apply(unit, 4);
})();
