/* Local, context-rich illustrations for words that one emoji cannot explain. */
(() => {
  'use strict';
  const svg = body => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">' + body + '</svg>';
  const scene = (label, body) => svg(
    '<rect x="4" y="94" width="112" height="22" rx="8" fill="#fff" opacity=".92"/>' + body +
    '<text x="60" y="109" text-anchor="middle" fill="#174a71" font-size="10" font-weight="800">' + label + '</text>'
  );
  const person = (x, y, shirt, scale = 1, hair = '#473629') =>
    '<g transform="translate(' + x + ' ' + y + ') scale(' + scale + ')">' +
    '<path d="M-11-5q0-16 11-16T11-5" fill="' + hair + '"/>' +
    '<circle cx="0" cy="0" r="11" fill="#eab98e" stroke="#a87551" stroke-width="2"/>' +
    '<path d="M-10 17q10-9 20 0l5 23h-30Z" fill="' + shirt + '" stroke="#52687b" stroke-width="2"/>' +
    '<path d="M-12 21-21 36M12 21 21 36M-7 40l-3 19M7 40l3 19" fill="none" stroke="#52687b" stroke-width="4" stroke-linecap="round"/>' +
    '</g>';
  const focus = (x, y, rx = 21) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="38" fill="#ffdb6c" opacity=".35"/>';
  const heart = '<path d="M60 38c-8-12-25-1 0 18 25-19 8-30 0-18Z" fill="#ed6c84"/>';
  const house = (x, color) => '<path d="M' + (x-16) + ' 54  ' + x + ' 37  ' + (x+16) + ' 54v31h-32Z" fill="' + color + '" stroke="#60758a" stroke-width="2"/><rect x="' + (x-5) + '" y="65" width="10" height="20" fill="#fff"/>';
  const family = {
    Brother: scene('ANH / EM TRAI', focus(77, 52) + person(30, 35, '#86b7df', .8) + person(77, 31, '#4c8ed1')),
    Sister: scene('CHỊ / EM GÁI', focus(77, 52) + person(30, 35, '#7dbdb1', .8) + person(77, 31, '#e982af', 1, '#674153')),
    Son: scene('CON TRAI', person(29, 27, '#6f95bc', .9) + person(79, 27, '#d4809c', .9) + focus(57, 62, 18) + person(57, 47, '#4e9ac8', .65)),
    Daughter: scene('CON GÁI', person(29, 27, '#6f95bc', .9) + person(79, 27, '#d4809c', .9) + focus(57, 62, 18) + person(57, 47, '#dc82aa', .65, '#674153')),
    Friend: scene('BẠN BÈ', person(32, 31, '#579bd3', .9) + person(84, 31, '#e6a169', .9) + '<path d="M50 56q10 9 16 0" fill="none" stroke="#476b83" stroke-width="4"/>'),
    'Best friend': scene('BẠN THÂN', person(30, 31, '#579bd3', .9) + person(88, 31, '#e6a169', .9) + heart),
    Cousin: scene('ANH CHỊ EM HỌ', person(25, 30, '#7da2c5', .7) + person(90, 30, '#cc96aa', .7) + person(43, 49, '#4a94d0', .55) + person(74, 49, '#e58eaa', .55) + '<path d="M43 84h31" stroke="#5582a3" stroke-width="3" stroke-dasharray="4 3"/>'),
    Classmate: scene('BẠN CÙNG LỚP', '<rect x="22" y="16" width="76" height="25" rx="3" fill="#376363"/><path d="M35 27h32" stroke="#fff" stroke-width="3"/>' + person(39, 42, '#6aadd7', .65) + person(80, 42, '#e2a56d', .65) + '<path d="M17 77h86" stroke="#ad8460" stroke-width="6"/>'),
    Neighbor: scene('HÀNG XÓM', house(34, '#f5bd72') + house(87, '#88b8e4') + person(34, 65, '#5d94bf', .3) + person(87, 65, '#d988a8', .3) + '<path d="M48 68q11-9 23 0" fill="none" stroke="#5d91a9" stroke-width="3"/>'),
    Uncle: scene('CHÚ / BÁC / CẬU', focus(72, 51) + person(25, 46, '#7ea6cf', .62) + person(73, 30, '#587fb7')),
    Aunt: scene('CÔ / DÌ / THÍM', focus(72, 51) + person(25, 46, '#7ea6cf', .62) + person(73, 30, '#d785a6', 1, '#65404b')),
    Husband: scene('CHỒNG', focus(38, 51) + person(37, 30, '#547eaf') + person(85, 30, '#d887a8', 1, '#65404b') + heart),
    Wife: scene('VỢ', person(36, 30, '#547eaf') + focus(85, 51) + person(85, 30, '#d887a8', 1, '#65404b') + heart)
  };
  const child = (x = 42, y = 25) => person(x, y, '#66a7d4', .85);
  const seated = '<circle cx="37" cy="35" r="10" fill="#eab98e" stroke="#a87551" stroke-width="2"/><path d="M32 46q17-2 20 18H31Z" fill="#66a7d4"/><path d="M47 62h20v17H43" fill="none" stroke="#52687b" stroke-width="5" stroke-linecap="round"/>';
  const action = {
    Run: scene('CHẠY', '<circle cx="52" cy="24" r="10" fill="#eab98e"/><path d="m52 35-8 22 21 4M45 55 19 70M61 61 83 78M47 43 26 36M57 45 77 32" fill="none" stroke="#427fae" stroke-width="7" stroke-linecap="round"/><path d="M15 45h20M10 56h20" stroke="#a2c4dd" stroke-width="3"/>'),
    Walk: scene('ĐI BỘ', '<circle cx="50" cy="24" r="10" fill="#eab98e"/><path d="M50 35v28m0-18-18 15m18-15 16 12M50 63 34 83M50 63 68 82" fill="none" stroke="#5d91b8" stroke-width="7" stroke-linecap="round"/>'),
    Jump: scene('NHẢY', '<circle cx="60" cy="25" r="10" fill="#eab98e"/><path d="M60 36v23M60 44 32 31M60 44 88 31M60 59 42 77M60 59 78 77" fill="none" stroke="#5c9dbd" stroke-width="7" stroke-linecap="round"/><path d="M31 87h58" stroke="#78b65e" stroke-width="4"/>'),
    Swim: scene('BƠI', '<circle cx="40" cy="42" r="10" fill="#eab98e"/><path d="m50 48 26 7 19-15M52 52 68 39" fill="none" stroke="#518fb9" stroke-width="8" stroke-linecap="round"/><path d="M10 65q12-9 24 0t24 0t24 0t24 0M10 77q12-9 24 0t24 0t24 0t24 0" fill="none" stroke="#55b7df" stroke-width="5"/>'),
    Eat: scene('ĂN', child() + '<ellipse cx="82" cy="74" rx="22" ry="8" fill="#fff" stroke="#7793aa" stroke-width="3"/><circle cx="82" cy="70" r="7" fill="#f09a56"/><path d="M63 37 72 23m-8 3 11 6" stroke="#6e8495" stroke-width="3"/>'),
    Drink: scene('UỐNG', child() + '<path d="M61 39h29l-4 31H65Z" fill="#76bde0" stroke="#426b8e" stroke-width="3"/><path d="M68 31h22" stroke="#426b8e" stroke-width="3"/><path d="M55 39 65 47" stroke="#52687b" stroke-width="4"/>'),
    Sleep: scene('NGỦ', '<rect x="17" y="58" width="85" height="24" rx="6" fill="#a1b9d4"/><rect x="23" y="54" width="31" height="15" rx="5" fill="#fff"/><circle cx="48" cy="45" r="11" fill="#eab98e"/><path d="M62 54h34v17H60Z" fill="#77a4cf"/><text x="74" y="29" fill="#667e9b" font-size="19">Zzz</text>'),
    Read: scene('ĐỌC', seated + '<path d="M58 47q17-8 29 1v25q-14-8-29 0Z" fill="#f8e4a5" stroke="#91704c" stroke-width="3"/><path d="M58 47q-14-8-25 0v25q12-8 25 0Z" fill="#f8e4a5" stroke="#91704c" stroke-width="3"/>'),
    Write: scene('VIẾT', seated + '<rect x="49" y="66" width="49" height="20" fill="#fff" stroke="#8aa1b5" stroke-width="2"/><path d="m58 53 20 22" stroke="#c68447" stroke-width="5"/><path d="M49 79h46" stroke="#6c8da6" stroke-width="3"/>'),
    Sing: scene('HÁT', child() + '<circle cx="82" cy="36" r="9" fill="#4a6278"/><path d="M82 45v29M63 38 73 42" stroke="#4a6278" stroke-width="5"/><text x="81" y="25" fill="#ed7f9e" font-size="20">♫</text>'),
    Dance: scene('NHẢY MÚA', '<circle cx="58" cy="26" r="10" fill="#eab98e"/><path d="M58 38v24M58 45 26 29M58 45 86 29M58 62 34 81M58 62 83 78" fill="none" stroke="#cf78aa" stroke-width="7" stroke-linecap="round"/><text x="90" y="54" fill="#8a75c1" font-size="18">♫</text>'),
    Play: scene('CHƠI', child(40, 24) + '<circle cx="86" cy="70" r="17" fill="#fff" stroke="#50677b" stroke-width="3"/><path d="m86 54 9 9-4 12H79l-4-12Z" fill="#575f6a"/>'),
    Cook: scene('NẤU ĂN', child(31, 24) + '<path d="M59 54h44l-6 25H64Z" fill="#aabac7" stroke="#596c79" stroke-width="3"/><path d="M55 54h52M65 43q-6-8 0-14m14 14q-6-8 0-14" fill="none" stroke="#718c9b" stroke-width="3"/>'),
    Draw: scene('VẼ', child(31, 24) + '<path d="M62 19h39v54H62Z" fill="#fff" stroke="#7791a6" stroke-width="4"/><circle cx="82" cy="42" r="9" fill="#f3cb66"/><path d="M65 67 51 86m32-13v13m16-13 14 13" stroke="#926e4d" stroke-width="4"/>'),
    Listen: scene('NGHE', child() + '<path d="M28 26q12-23 28 0M27 26v18m30-18v18" fill="none" stroke="#5b657e" stroke-width="7"/><rect x="21" y="35" width="9" height="18" rx="3" fill="#5b657e"/><rect x="54" y="35" width="9" height="18" rx="3" fill="#5b657e"/><text x="82" y="48" fill="#e37c9d" font-size="28">♫</text>'),
    Watch: scene('XEM', seated + '<rect x="67" y="25" width="43" height="37" rx="3" fill="#455e75"/><rect x="72" y="30" width="33" height="26" fill="#83c9e3"/><path d="M84 63v12m-14 0h29" stroke="#455e75" stroke-width="4"/>'),
    Sit: scene('NGỒI', seated + '<path d="M29 62v23m0-20h36m0 0v20" fill="none" stroke="#9a7252" stroke-width="6"/>'),
    Stand: scene('ĐỨNG', child(59, 25) + '<path d="M35 85h50" stroke="#7aaa70" stroke-width="4"/>'),
    Ride: scene('ĐI XE ĐẠP', '<circle cx="28" cy="72" r="16" fill="none" stroke="#536d80" stroke-width="4"/><circle cx="90" cy="72" r="16" fill="none" stroke="#536d80" stroke-width="4"/><path d="M28 72 48 42l20 30H28m40 0 22-30H48" fill="none" stroke="#5c9ab5" stroke-width="4"/><circle cx="57" cy="24" r="9" fill="#eab98e"/><path d="M56 34 48 48 68 50" stroke="#5c9ab5" stroke-width="6" fill="none"/>'),
    Fly: scene('BAY', child(30, 26) + '<path d="M49 58q25-35 38-34" fill="none" stroke="#7188a0" stroke-width="2"/><path d="m87 10 14 14-14 14-14-14Z" fill="#ed8d8d" stroke="#ae5a5a" stroke-width="3"/><path d="M87 38q-2 9 6 12" fill="none" stroke="#7188a0" stroke-width="2"/>')
  };
  window.DanhScenes = { familyfriends: family, verbs: action };
})();
