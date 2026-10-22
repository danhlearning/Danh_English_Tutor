/* Cùng đảo ôn tập, ngân hàng riêng theo lớp; chỉ dùng câu đã biên soạn. */
(() => {
  const course=window.DanhPrimaryGrade2Course,grade=course.grade;
  const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  window.grade2Units=Object.fromEntries(course.units.map(u=>[u.id,{...u,title:`Unit ${u.number} · ${u.title}`,questions:u.words.flatMap(w=>{
    const pattern=new RegExp('\\b'+escape(w.name)+'\\b','i'),p=u.patterns.find(p=>pattern.test(p.question));
    return p?[{id:`g${grade}-${u.id}-${w.id}`,imageWordId:w.id,answer:p.question,vietnamese:p.note,acceptedAnswers:[p.question]}]:[];
  })}]));
  let dialogues;
  if(grade===1)dialogues=[{id:'g1-greeting',unitId:'unit1',word:'w1',context:'Mai chào em khi vừa gặp. Em chào lại Mai.',prompt:'Hello!',answer:'Hello, Mai.',distractors:['Goodbye, Nam.','Yes, please.','I am happy.']}];
  else if(grade===3)dialogues=[{id:'g3-greeting',unitId:'unit1',word:'w4',context:'Em thấy khỏe. Bạn hỏi thăm sức khỏe của em.',prompt:'How are you?',answer:'I am fine, thank you.',distractors:['This is my teacher.','My name is Nam.','Goodbye.']}];
  else if(grade===4){
    const answers=[...new Set(course.units.flatMap(u=>u.dialoguePatterns.map(p=>p.answer)))];
    dialogues=course.units.flatMap(u=>u.dialoguePatterns.map((p,i)=>({id:`g4-${u.id}-dialogue-${i+1}`,unitId:u.id,
      word:(u.words.find(w=>new RegExp('\\b'+escape(w.name)+'\\b','i').test(p.question+' '+p.answer))||u.words[0]).id,
      context:`Em muốn nói: ${u.patterns[i*2+1].note}`,prompt:p.question,answer:p.answer,
      distractors:answers.filter(a=>a!==p.answer).slice(0,3)})));
  }else dialogues=[{id:'g5-home',unitId:'unit1',word:'w2',context:'Em sống ở một ngôi làng. Một người bạn hỏi về nơi em sống.',prompt:'Where do you live?',answer:'I live in a village.',distractors:['I want to be a pilot.','It is in May.','I do exercise every day.']}];
  window.DanhGrade2ReviewContent={sentences:[],dialogues};
  window.DanhReviewConfig={key:`danh-g${grade}-mixed-review-v1`,termSplit:course.units.length/2};
})();
