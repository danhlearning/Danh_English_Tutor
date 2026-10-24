(function(root){
  'use strict';
  const bands=['Pre A1','A1','A2','B1','B2','C1','C2'];
  const topicBands={be:'A1',pronouns:'A1',nouns:'A1',articles:'A1','present-simple':'A1','present-continuous':'A1',prepositions:'A1','past-simple':'A2','past-continuous':'A2','future-simple':'A2',quantifiers:'A2','adjectives-adverbs':'A2',modals:'A2',comparisons:'A2',questions:'A2','present-perfect':'B1','relative-clauses':'B1',conditionals:'B1','word-forms':'B1',connectors:'B1',passive:'B1','reported-speech':'B1','verb-patterns':'B1','tense-contrast':'B1','context-reading':'B1'};
  const modes={mixed:'Trộn thử thách',choice:'Chọn đáp án',fill:'Điền từ',order:'Xếp câu',correct:'Sửa lỗi',rewrite:'Viết lại câu'};
  function sentence(q){return q.explanation.split('Câu hoàn chỉnh: ')[1]?.trim()||q.answers[0];}
  function band(q){const text=sentence(q);if(q.topic==='conditionals'&&(/\bhad\b.*\bwould have\b|\bwould have\b.*\bhad\b/i.test(text)))return 'B2';return topicBands[q.topic]||null;}
  function pool(questions,{cefr='all',topic='all',game='mixed'}={}){return questions.filter(q=>q.status==='reviewed'&&q.level===2&&(cefr==='all'||band(q)===cefr)&&(topic==='all'||q.topic===topic)&&(game==='mixed'||q.type===game));}
  function select(questions,settings,round,records){
    const found=pool(questions,settings);
    if(settings.game!=='mixed')return round.select(found,{mode:'review',records}).slice(0,8);
    const candidates=round.select(found,{mode:'topic',records}),picked=[];
    for(const type of ['choice','fill','order','correct','rewrite']){const q=candidates.find(q=>q.type===type);if(q)picked.push(q);}
    for(const q of candidates)if(picked.length<8&&!picked.includes(q))picked.push(q);
    return round.shuffle(picked);
  }
  const api={bands,modes,topicBands,sentence,band,pool,select};root.DanhGrammarSkills=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
