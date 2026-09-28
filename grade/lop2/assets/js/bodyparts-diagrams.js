/* One child-friendly body map per word. Study cards show the name; games show only the pointer. */
(() => {
  'use strict';
  const lesson = window.bodyPartsLesson;
  if (!lesson) return;

  const ink = '#70564D';
  const skin = '#E8AF88';
  const hair = '#4B3935';
  const shirt = '#50A9A7';
  const focus = '#D65E3C';
  const backdrop = '<circle cx="50" cy="50" r="47" fill="#FFF4E6"/>';

  function face(part) {
    const openMouth = part === 'Mouth' || part === 'Teeth';
    const earsFill = part === 'Ears' ? '#F3AB7E' : skin;
    return `${backdrop}
      <path d="M24 39Q23 16 50 14Q77 16 76 39L74 53H26Z" fill="${hair}"/>
      <ellipse cx="50" cy="53" rx="28" ry="34" fill="${skin}" stroke="${ink}" stroke-width="1.5"/>
      <ellipse cx="22" cy="55" rx="4" ry="7" fill="${earsFill}" stroke="${ink}" stroke-width="1.2"/>
      <ellipse cx="78" cy="55" rx="4" ry="7" fill="${earsFill}" stroke="${ink}" stroke-width="1.2"/>
      <path d="M23 40Q25 19 47 18Q63 29 76 31L73 23Q63 12 49 13Q27 13 23 40Z" fill="${hair}"/>
      <path d="M33 42Q40 39 46 42M54 42Q61 39 68 42" fill="none" stroke="${hair}" stroke-width="1.7" stroke-linecap="round"/>
      <ellipse cx="40" cy="51" rx="8" ry="6" fill="#FFFDF9" stroke="${ink}" stroke-width="1.4"/>
      <ellipse cx="60" cy="51" rx="8" ry="6" fill="#FFFDF9" stroke="${ink}" stroke-width="1.4"/>
      <circle cx="41" cy="51" r="3.3" fill="${hair}"/><circle cx="61" cy="51" r="3.3" fill="${hair}"/>
      <circle cx="42" cy="49" r="1.2" fill="#FFFDF9"/><circle cx="62" cy="49" r="1.2" fill="#FFFDF9"/>
      <path d="M49 55Q47 62 52 62" fill="none" stroke="#986D5C" stroke-width="1.7" stroke-linecap="round"/>
      ${openMouth
        ? '<path d="M39 68Q50 65 61 68Q59 78 50 79Q41 78 39 68Z" fill="#A95A5D" stroke="#955052" stroke-width="1.4"/><path d="M42 68Q50 67 58 68L56 71H44Z" fill="#FFFDF9"/><path d="M48 68V71M52 68V71" stroke="#D6CEC6" stroke-width=".8"/>'
        : '<path d="M42 70Q50 77 58 70" fill="none" stroke="#9A5D58" stroke-width="2" stroke-linecap="round"/>'}
      <path d="M28 83Q50 91 72 83" fill="none" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/>
      ${faceFocus(part)}`;
  }

  function faceFocus(part) {
    switch (part) {
      case 'Head': return `<ellipse cx="50" cy="52" rx="31" ry="38" fill="none" stroke="${focus}" stroke-width="2.7"/>`;
      case 'Hair': return `<path d="M23 39Q24 12 50 12Q76 12 77 39" fill="none" stroke="${focus}" stroke-width="3" stroke-linecap="round"/>`;
      case 'Eyes': return `<ellipse cx="40" cy="51" rx="10.5" ry="8" fill="none" stroke="${focus}" stroke-width="2"/><ellipse cx="60" cy="51" rx="10.5" ry="8" fill="none" stroke="${focus}" stroke-width="2"/>`;
      case 'Ears': return `<ellipse cx="22" cy="55" rx="6" ry="9" fill="none" stroke="${focus}" stroke-width="2.3"/><ellipse cx="78" cy="55" rx="6" ry="9" fill="none" stroke="${focus}" stroke-width="2.3"/>`;
      case 'Nose': return `<ellipse cx="50" cy="60" rx="7" ry="8" fill="${focus}" fill-opacity=".16" stroke="${focus}" stroke-width="2"/>`;
      case 'Mouth': return `<ellipse cx="50" cy="72" rx="14" ry="10" fill="none" stroke="${focus}" stroke-width="2.3"/>`;
      case 'Teeth': return `<path d="M41 68Q50 66 59 68L57 72H43Z" fill="none" stroke="${focus}" stroke-width="2"/>`;
      default: return '';
    }
  }

  function upper(part) {
    return `${backdrop}
      <path d="M33 63Q26 70 21 82" fill="none" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
      <path d="M67 63Q74 60 78 49" fill="none" stroke="${skin}" stroke-width="10" stroke-linecap="round"/>
      <path d="M46 47H54V60H46Z" fill="${skin}" stroke="${ink}" stroke-width="1.1"/>
      <path d="M31 94V68Q31 56 44 55H56Q69 56 69 68V94Z" fill="${shirt}" stroke="#507E7C" stroke-width="1.8"/>
      <path d="M41 56L50 65L59 56" fill="none" stroke="#E5C59E" stroke-width="2"/>
      <ellipse cx="50" cy="30" rx="18" ry="21" fill="${skin}" stroke="${ink}" stroke-width="1.3"/>
      <path d="M32 29Q30 10 49 9Q66 9 68 29Q60 20 50 18Q42 25 32 29Z" fill="${hair}"/>
      <circle cx="44" cy="32" r="1.7" fill="${hair}"/><circle cx="56" cy="32" r="1.7" fill="${hair}"/>
      <path d="M45 41Q50 46 55 41" fill="none" stroke="#A85758" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M71 37L69 23Q69 20 72 20Q75 20 75 23L76 29V16Q76 13 79 13Q82 13 82 16V28L84 19Q85 16 88 17Q91 18 90 21L87 38Q86 46 79 47Q73 47 71 37Z" fill="${skin}" stroke="#AF755D" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M72 34Q66 29 64 33Q63 36 70 42" fill="${skin}" stroke="#AF755D" stroke-width="1.6" stroke-linecap="round"/>
      ${upperFocus(part)}`;
  }

  function upperFocus(part) {
    switch (part) {
      case 'Neck': return `<rect x="44" y="48" width="12" height="10" rx="3" fill="${focus}" fill-opacity=".32" stroke="${focus}" stroke-width="1.8"/>`;
      case 'Shoulder': return `<ellipse cx="67" cy="62" rx="8" ry="7" fill="${focus}" fill-opacity=".35" stroke="${focus}" stroke-width="2"/>`;
      case 'Arm': return `<path d="M32 64Q26 71 21 81" fill="none" stroke="${focus}" stroke-opacity=".7" stroke-width="11" stroke-linecap="round"/>`;
      case 'Hand': return `<circle cx="79" cy="31" r="17" fill="none" stroke="${focus}" stroke-width="2.4"/>`;
      case 'Finger': return `<path d="M79 15V28" fill="none" stroke="${focus}" stroke-width="4" stroke-linecap="round"/><circle cx="79" cy="15" r="3" fill="${focus}"/>`;
      case 'Tummy': return `<ellipse cx="50" cy="77" rx="12" ry="11" fill="${focus}" fill-opacity=".32" stroke="${focus}" stroke-width="2"/>`;
      default: return '';
    }
  }

  function lower(part) {
    return `${backdrop}
      <path d="M32 3H68L65 36H35Z" fill="${shirt}" stroke="#507E7C" stroke-width="1.8"/>
      <path d="M35 36H65L62 51H52L50 44L48 51H38Z" fill="#467BB5" stroke="#406788" stroke-width="1.8"/>
      <path d="M42 51Q41 66 38 82M58 51Q59 66 62 82" fill="none" stroke="${skin}" stroke-width="13" stroke-linecap="round"/>
      <path d="M29 86Q38 79 47 86L49 93H27Q25 89 29 86Z" fill="#526782"/>
      <path d="M55 86Q64 79 73 86L75 93H53Q51 89 55 86Z" fill="#526782"/>
      ${part === 'Leg'
        ? `<path d="M42 52Q41 66 38 80" fill="none" stroke="${focus}" stroke-opacity=".65" stroke-width="14" stroke-linecap="round"/>`
        : `<circle cx="40" cy="68" r="8" fill="${focus}" fill-opacity=".28" stroke="${focus}" stroke-width="2.5"/>`}`;
  }

  function feet() {
    return `${backdrop}
      <path d="M31 3H69L65 25H35Z" fill="#467BB5"/>
      <path d="M41 23L39 70M59 23L61 70" fill="none" stroke="#467BB5" stroke-width="16" stroke-linecap="round"/>
      <path d="M39 65V78M61 65V78" fill="none" stroke="${skin}" stroke-width="12" stroke-linecap="round"/>
      <path d="M20 78Q29 72 39 75Q47 73 53 83L54 91H18Q16 83 20 78Z" fill="#526782" stroke="#42556C" stroke-width="1.5"/>
      <path d="M49 83Q55 73 65 75Q75 72 82 78Q86 83 84 91H48Z" fill="#526782" stroke="#42556C" stroke-width="1.5"/>
      <path d="M20 78Q29 72 39 75Q47 73 53 83L54 91H18Q16 83 20 78Z" fill="${focus}" fill-opacity=".48" stroke="${focus}" stroke-width="2"/>`;
  }

  const specs = {
    Head: { art: face('Head'), target: [23, 62], gameStart: [5, 91] },
    Hair: { art: face('Hair'), target: [34, 25], gameStart: [5, 12] },
    Eyes: { art: face('Eyes'), target: [32, 51], gameStart: [5, 76] },
    Ears: { art: face('Ears'), target: [22, 55], gameStart: [5, 55] },
    Nose: { art: face('Nose'), target: [50, 60], gameStart: [9, 90] },
    Mouth: { art: face('Mouth'), target: [40, 71], gameStart: [6, 87] },
    Teeth: { art: face('Teeth'), target: [44, 69], gameStart: [7, 91] },
    Neck: { art: upper('Neck'), target: [45, 53], gameStart: [5, 54] },
    Shoulder: { art: upper('Shoulder'), target: [65, 62], gameStart: [94, 83] },
    Arm: { art: upper('Arm'), target: [26, 72], gameStart: [5, 87] },
    Hand: { art: upper('Hand'), target: [79, 31], gameStart: [95, 8], route: 'M88 57Q112 11 143 11H207Q218 14 218 41' },
    Finger: { art: upper('Finger'), target: [79, 17], gameStart: [95, 5], route: 'M98 57Q119 6 150 8H208Q218 8 218 27' },
    Leg: { art: lower('Leg'), target: [40, 70], gameStart: [5, 75] },
    Knee: { art: lower('Knee'), target: [40, 68], gameStart: [5, 69] },
    Foot: { art: feet(), target: [36, 83], gameStart: [6, 91] },
    Tummy: { art: upper('Tummy'), target: [50, 77], gameStart: [5, 91] }
  };

  const pointer = (start, target, route, width = 2.6) =>
    `<path d="${route || `M${start[0]} ${start[1]}L${target[0]} ${target[1]}`}" fill="none" stroke="${focus}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="${target[0]}" cy="${target[1]}" r="${width + 1.5}" fill="${focus}" stroke="#fff" stroke-width="1.4"/>`;

  for (const word of lesson.vocabulary) {
    const spec = specs[word.name];
    if (!spec) throw new Error(`Missing body-part diagram: ${word.name}`);
    const diagramTarget = [139 + spec.target[0], 10 + spec.target[1]];
    const labelEnd = [Math.min(125, 18 + word.name.length * 14), 57];
    word.diagramSvg = `<svg role="img" aria-label="${word.name} chỉ vào ${word.meaning.toLowerCase()}" class="bodyparts-diagram" viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="256" height="110" rx="16" fill="#FFF8EF"/>
      <svg x="139" y="10" width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">${spec.art}</svg>
      <text x="15" y="50" fill="#3D505B" font-family="Nunito, Arial, sans-serif" font-size="${word.name.length > 7 ? 22 : 25}" font-weight="800">${word.name}</text>
      ${pointer(labelEnd, diagramTarget, spec.route)}
    </svg>`;
    word.svg = `<svg role="img" aria-label="Dấu chỉ vào ${word.meaning.toLowerCase()}" class="svg-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      ${spec.art}${pointer(spec.gameStart, spec.target)}
    </svg>`;
    if (word.name === 'Hand') {
      const photo = './assets/images/approved/bodyparts/hand-photo-v1.webp';
      word.diagramSvg = `<svg role="img" aria-label="Hand chỉ vào bàn tay của bé" class="bodyparts-diagram" viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="256" height="110" rx="16" fill="#FFF8EF"/>
        <image href="${photo}" x="139" y="10" width="100" height="100"/>
        <text x="15" y="50" fill="#3D505B" font-family="Nunito, Arial, sans-serif" font-size="25" font-weight="800">Hand</text>
        ${pointer([85, 57], [164, 52])}
      </svg>`;
      word.svg = `<svg role="img" aria-label="Dấu chỉ vào bàn tay của bé" class="svg-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <image href="${photo}" width="100" height="100"/>
        <circle cx="25" cy="42" r="13" fill="none" stroke="#D65E3C" stroke-width="3"/>
      </svg>`;
    }
  }
})();
