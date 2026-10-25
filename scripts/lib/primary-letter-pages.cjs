 const version='picture-tap-20261024';
function enable(html,grade,review=false){
 if(![3,4].includes(Number(grade)))return html;
 if(!html.includes('letter-ladder.css'))html=html.replace('</head>',`<link data-grade2-letter rel="stylesheet" href="../lop2/assets/css/letter-ladder.css?v=recall-gate-20261025"></head>`);
 if(!html.includes('picture-audio.css'))html=html.replace('</head>',`<link data-grade2-letter rel="stylesheet" href="../lop2/assets/css/picture-audio.css?v=${version}"></head>`);
 const scripts=`<script data-grade2-letter src="../lop2/assets/js/letter-ladder-core.js?v=recall-gate-20261025"></script>\n<script data-grade2-letter src="../lop2/assets/js/letter-ladder.js?v=recall-gate-20261025"></script>\n`;
 if(!html.includes('letter-ladder-core.js')){
  const match=html.match(/<script src="(?:\.\.\/lop2|\.)\/assets\/js\/(?:learning-core|mixed-review-core)\.js[^>]*><\/script>/);
  if(!match)throw Error('Missing lesson engine for grade '+grade);
  html=html.replace(match[0],scripts+(review?`<script data-grade2-letter src="../lop2/assets/js/letter-review.js?v=${version}"></script>\n`:'')+match[0]);
 }
 if(!html.includes('picture-audio.js'))html=html.replace(/(<script[^>]*src="[^\"]*letter-ladder-core\.js[^>]*><\/script>)/,`<script data-grade2-letter src="../lop2/assets/js/picture-audio.js?v=${version}"></script>\n$1`);
 if(review){
  if(!html.includes('id="letter-review"'))html=html.replace('<section id="play"',`<section data-grade2-letter-review id="letter-review" class="panel" hidden aria-labelledby="letter-review-title"><div class="play-heading"><h2 id="letter-review-title" tabindex="-1">Ghép chữ</h2><button id="leave-letters" type="button">Chọn bài</button></div><div id="letter-review-stage"></div></section>\n<section id="play"`);
  if(!html.includes('id="start-letters"'))html=html.replace(/<button id="start"[^>]*>[^<]*<\/button>/,`<button id="start" type="button" class="primary">Ôn tổng hợp</button><button data-grade2-letter-review id="start-letters" type="button" class="primary">Ghép chữ</button>`);
  html=html.replace(/(<body\b)(?![^>]*data-grade=)/,`$1 data-grade="${grade}"`).replace(/(<button id="pick-term1"[^>]*>)[^<]*/, '$1Học kỳ 1').replace(/(<button id="pick-term2"[^>]*>)[^<]*/, '$1Học kỳ 2');
 }
 return html.replace(/((?:letter-ladder-core|letter-review|grade2-navigation)\.js)\?v=[^" ]+/g,`$1?v=${version}`).replace(/((?:letter-ladder|mixed-review|learning-core|shared\/primary-grade2-lesson)\.js)\?v=[^" ]+/g,'$1?v=game-pacing-20261025').replace(/(picture-audio\.js)\?v=[^" ]+/g,'$1?v=all-vocab-picture-20261025').replace(/((?:letter-ladder|primary-grade2-lesson)\.js)\?v=[^" ]+/g,'$1?v=feedback-20261025').replace(/((?:letter-ladder(?:-core)?|learning-core|learning-effects)\.(?:js|css))\?v=[^" ]+/g,'$1?v=recall-gate-20261025');
}
module.exports={enable,version};
