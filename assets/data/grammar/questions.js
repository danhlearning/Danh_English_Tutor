(function (root) {
  'use strict';
  const catalog = root.DanhGrammarCatalog || (typeof require === 'function' ? require('./catalog.js') : null);
  const pattern30 = ['choice','choice','choice','choice','choice','choice','choice','choice','choice','fill','fill','fill','fill','fill','fill','order','order','order','order','order','order','correct','correct','correct','rewrite','rewrite','rewrite','rewrite','rewrite','rewrite'];
  const pattern15 = ['choice','choice','choice','choice','fill','fill','fill','order','order','order','correct','correct','rewrite','rewrite','rewrite'];
  const items = [];
  const stems = { walks:'walk',cooks:'cook',opens:'open',explains:'explain',stops:'stop',washes:'wash',carries:'carry',closes:'close',helps:'help',teaches:'teach',reads:'read',forgets:'forget',rains:'rain',studies:'study',melts:'melt',turns:'turn',calls:'call',boils:'boil',dies:'die',gets:'get',goes:'go',works:'work',lives:'live',wants:'want',am:'be',is:'be',are:'be',was:'be',were:'be',does:'do',did:'do',has:'have',had:'have',reading:'read',waiting:'wait',writing:'write',sleeping:'sleep',preparing:'prepare',running:'run',singing:'sing',working:'work',chasing:'chase',watching:'watch',listening:'listen',doing:'do',using:'use',learning:'learn',cutting:'cut',drawing:'draw',taking:'take',raining:'rain',repairing:'repair',looking:'look',talking:'talk',swimming:'swim',sitting:'sit',studying:'study',cooking:'cook',walking:'walk',driving:'drive',playing:'play',painting:'paint',having:'have',barking:'bark',carrying:'carry',bought:'buy',went:'go',saw:'see',made:'make',wrote:'write',took:'take',lost:'lose',found:'find',ate:'eat',broke:'break',built:'build',met:'meet',drank:'drink',won:'win',seen:'see',eaten:'eat',broken:'break',written:'write',sent:'send',spoken:'speak',known:'know',caught:'catch',understood:'understand',taken:'take',given:'give',children:'child',women:'woman',men:'man',feet:'foot',knives:'knife',leaves:'leaf',boxes:'box',buses:'bus',carefully:'careful',politely:'polite',clearly:'clear',quietly:'quiet',beautifully:'beautiful',happily:'happy',patiently:'patient',successfully:'successful',quickly:'quick',softly:'soft',easily:'easy',gracefully:'graceful',well:'good',information:'inform',explanation:'explain',kindness:'kind',decision:'decide',success:'succeed',importance:'important',arrival:'arrive',education:'educate',dangerous:'danger',comfortable:'comfort',helpful:'help',useful:'use',interesting:'interest',exciting:'excite',lighter:'light',biggest:'big',colder:'cold',better:'good',tallest:'tall',shorter:'short',best:'good' };
  Object.assign(stems,{been:'be',knew:'know',studied:'study',arrived:'arrive',tried:'try',liked:'like',lived:'live',prepared:'prepare',decided:'decide',agreed:'agree',promised:'promise',cancelled:'cancel',used:'use',closed:'close'});
  function cue(focus,topic) {
    if(topic.id==='articles')return 'a / an / the';
    if(topic.id==='relative-clauses')return 'who / whom / which / that / whose';
    if(topic.id==='prepositions')return 'in / on / at / under / between';
    if(topic.id==='quantifiers')return focus==='enough'?'đủ':/much|many/.test(focus)?'nhiều':focus.includes('few')?'một vài':'một ít';
    if(topic.id==='pronouns')return /his|him/i.test(focus)?'he / him / his':/us|our/i.test(focus)?'we / us / our / ours':'she / her / hers';
    return focus.split(/\s+/).map(word => stems[word.toLowerCase()] || word.replace(/ed$/,'')).join(' / ');
  }
  for (const topic of catalog.topics) {
    for (let level = 1; level <= 3; level++) {
      topic.seeds.forEach((seed, index) => {
        const type = (topic.seeds.length === 30 ? pattern30 : pattern15)[index];
        const fullAnswer = type === 'rewrite' || type === 'correct' || type === 'order' || level === 3;
        const blank = seed.sentence.replace(seed.focus, '_____');
        const bad = seed.sentence.replace(seed.focus, seed.wrong);
        const answers = [fullAnswer ? seed.sentence : seed.focus];
        if (topic.id === 'relative-clauses' && !seed.sentence.includes(',') && ['who','which'].includes(seed.focus)) {
          answers.push(fullAnswer ? seed.sentence.replace(seed.focus,'that') : 'that');
        }
        const question = {
          id: `${seed.familyId}-l${level}`, familyId: seed.familyId, version: 1,
          topic: topic.id, group: topic.group, level, type, status: 'reviewed',
          prompt: type === 'rewrite' ? seed.source : type === 'correct' ? bad : type === 'order' ? '' : blank,
          instruction: type === 'rewrite' ? `Viết lại câu cùng nghĩa, dùng “${seed.word}”.` : type === 'correct' ? 'Sửa một lỗi ngữ pháp và viết lại toàn bộ câu.' : type === 'order' ? 'Sắp xếp các từ thành câu đúng. Bấm một từ đã chọn để trả lại.' : type === 'choice' ? `Chọn cách phù hợp với bài ${topic.title.toLowerCase()}.` : level === 3 ? 'Hoàn thành chỗ trống và viết lại toàn bộ câu.' : 'Điền phần còn thiếu vào chỗ trống.',
          answers, options: type === 'choice' ? [fullAnswer ? seed.sentence : seed.focus, fullAnswer ? bad : seed.wrong] : [],
          tokens: type === 'order' ? seed.sentence.split(/\s+/) : [],
          explanation: `${topic.rule}\nCâu hoàn chỉnh: ${seed.sentence}`,
          hint: topic.rule, scaffold: level === 1 ? topic.rule : '',
          cue: type === 'fill' ? cue(seed.focus,topic) : '',
          requiredWord: type === 'rewrite' ? seed.word : '',
          theoryUrl: `grammar-theory.html?topic=${topic.id}`
        };
        items.push(question);
      });
    }
  }
  root.DanhGrammarQuestions = items;
  if (typeof module !== 'undefined') module.exports = items;
})(typeof window !== 'undefined' ? window : globalThis);
