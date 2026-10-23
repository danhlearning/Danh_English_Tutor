// Mỗi mục là một tình huống riêng; không nhân một câu qua nhiều dạng.
const banks = [
 [
  ['choice','While the young scientist ___ her results, the lights went out.','was checking',['checks','is checking','were checking'],'While giới thiệu hành động đang diễn ra trong quá khứ: was checking.'],
  ['fill','The writer ___ her first award in 2009. (win)','won','In 2009 là thời điểm đã kết thúc: dùng quá khứ đơn won.'],
  ['order','We were reading her biography when the teacher arrived.','Were reading là hành động đang diễn ra; arrived là sự việc xen vào.'],
  ['correct','At eight last night, the volunteers was preparing meals.','At eight last night, the volunteers were preparing meals.','The volunteers là số nhiều: were preparing.'],
  ['rewrite','Mai was interviewing a local hero. Her recorder stopped during the interview. (Nối bằng when.)','Mai was interviewing a local hero when her recorder stopped.','Mai was ...','Giữ hành động nền ở quá khứ tiếp diễn và sự việc xen vào ở quá khứ đơn.'],
  ['choice','When I entered the hall yesterday, the speaker ___ about her childhood.','was talking',['talks','is talking','were talking'],'Việc nói đang diễn ra khi tôi bước vào: was talking.']
 ],
 [
  ['choice','Linh wore ___ traditional dress to the cultural fair. (Một bộ, chưa xác định.)','a',['an','some','any'],'Giới thiệu một bộ trang phục lần đầu; traditional bắt đầu bằng phụ âm: a.'],
  ['fill','We visited a cultural centre yesterday. ___ centre offers free language classes. (mạo từ)','The','Nhắc lại trung tâm đã giới thiệu: the.'],
  ['order','Music can bring people from different cultures together.','Music mang nghĩa khái quát, không dùng a hoặc an.'],
  ['correct','Our exchange student brought an useful guide to local customs.','Our exchange student brought a useful guide to local customs.','Useful bắt đầu bằng âm /j/: dùng a, không dùng an.'],
  ['rewrite','Our host showed us a temple. It was the oldest temple in the village. (Gộp thành một câu.)','Our host showed us the oldest temple in the village.','Our host ...','Dùng the trước so sánh nhất oldest; giữ thông tin của hai câu.'],
  ['choice','We shared ___ umbrella while walking to the international food festival. (Một chiếc, chưa xác định.)','an',['a','some','any'],'Umbrella bắt đầu bằng nguyên âm: an.']
 ],
 [
  ['choice','Our eco-club is looking ___ ways to reduce food waste.','for',['at','with','from'],'Look for có nghĩa tìm kiếm.'],
  ['fill','Please dispose ___ used batteries at a collection point. (giới từ)','of','Dispose of: xử lý, loại bỏ rác đúng cách.'],
  ['order','We can rely on reusable bags for our weekly shopping.','Rely on: dựa vào; on đi với rely.'],
  ['correct','The pupils are interested on making compost from leaves.','The pupils are interested in making compost from leaves.','Interested in + danh từ hoặc V-ing.'],
  ['rewrite','Our team takes care of the school garden. (Dùng look after.)','Our team looks after the school garden.','Our team ...','Look after có nghĩa chăm sóc; team là số ít nên dùng looks.'],
  ['choice','Everyone should contribute ___ keeping the neighbourhood clean.','to',['for','on','at'],'Contribute to + danh từ hoặc V-ing.']
 ],
 [
  ['choice','The more people move into the city, ___ pressure there is on housing.','the more',['more','the most','most'],'So sánh kép: the more ... the more ...'],
  ['fill','Rents are getting more and ___ expensive in the city centre.','more','More and more + tính từ dài: ngày càng.'],
  ['order','The better public transport becomes, the fewer cars people need.','The + so sánh hơn ở cả hai vế; cars đếm được nên dùng fewer.'],
  ['correct','The streets are becoming busy and busier as the town grows.','The streets are becoming busier and busier as the town grows.','So sánh tăng tiến với tính từ ngắn: busier and busier.'],
  ['rewrite','When the town grows faster, it needs more services. (Dùng so sánh kép.)','The faster the town grows, the more services it needs.','The faster ...','The faster ... the more ... diễn tả hai thay đổi liên quan.'],
  ['choice','The ___ the bus service is, the more residents use it.','more reliable',['most reliable','reliable','reliably'],'Dùng so sánh hơn more reliable trong vế đầu của so sánh kép.']
 ],
 [
  ['choice','The shop was short of staff, ___ Mai offered to work an extra shift.','so',['because','although','unless'],'So nối nguyên nhân thiếu nhân viên với kết quả làm thêm ca.'],
  ['fill','He accepted the position ___ it offered useful training. (vì)','because','Because + mệnh đề giải thích lý do nhận việc.'],
  ['order','Although the job is demanding, she finds it rewarding.','Although nối hai ý tương phản: công việc khó nhưng đáng làm.'],
  ['correct','Despite the salary was low, Nam accepted the apprenticeship.','Although the salary was low, Nam accepted the apprenticeship.','The salary was low là mệnh đề: dùng although, không dùng despite trực tiếp.'],
  ['rewrite','The company needed more staff. It advertised three vacancies. (Nối bằng because.)','The company advertised three vacancies because it needed more staff.','The company advertised ...','Because giới thiệu nguyên nhân; giữ thời quá khứ.'],
  ['choice','You will not be invited to an interview ___ you submit an application.','unless',['although','because','so that'],'Unless = if ... not: nếu không nộp đơn thì không được mời phỏng vấn.']
 ],
 [
  ['choice','We had a technician ___ the virtual assistant on our computer.','install',['installed','to install','installing'],'Have + người + động từ nguyên mẫu: nhờ ai làm việc gì.'],
  ['fill','The lab had its security software ___ yesterday. (update)','updated','Have + vật + phân từ quá khứ: nhờ cập nhật phần mềm.'],
  ['order','Mai got an expert to check the training data.','Get + người + to V, khác với have + người + V.'],
  ['correct','The school had its new cameras install by a technician.','The school had its new cameras installed by a technician.','Cameras nhận hành động: had + vật + installed.'],
  ['rewrite','An engineer repaired our robot for us yesterday. (Bắt đầu bằng We had.)','We had our robot repaired by an engineer yesterday.','We had ...','Had + vật + phân từ quá khứ; by an engineer giữ người thực hiện.'],
  ['choice','The researcher got her assistant ___ the results before publication.','to review',['review','reviewed','reviewing'],'Get + người + to V: to review.']
 ],
 [
  ['choice','The reporter said that the interview ___ already started before he arrived.','had',['has','is','will'],'Sự việc xảy ra trước một mốc quá khứ: had already started.'],
  ['fill','Lan asked me ___ I trusted that news source. (liệu; dùng if)','if','Câu hỏi yes/no tường thuật dùng if hoặc whether; yêu cầu ở đây là if.'],
  ['order','The editor asked where the photograph had been taken.','Câu hỏi gián tiếp dùng trật tự chủ ngữ trước động từ, không đảo ngữ.'],
  ['correct','Minh asked me where did I find the article.','Minh asked me where I had found the article.','Bỏ đảo ngữ did I; lùi quá khứ đơn thành quá khứ hoàn thành.'],
  ['rewrite','"I will check the facts," Hoa said. (Tường thuật với Hoa said that.)','Hoa said that she would check the facts.','Hoa said that ...','Will lùi thành would; I của Hoa đổi thành she.'],
  ['choice','The journalist asked us ___ the programme was broadcast live.','whether',['that','what','which'],'Whether mở câu hỏi yes/no được tường thuật.']
 ],
 [
  ['choice','The rangers hid behind the trees ___ they would not disturb the birds.','so that',['because of','despite','in spite of'],'So that + mệnh đề chỉ mục đích.'],
  ['fill','___ the forest was protected, illegal hunting still occurred. (mặc dù)','Although','Although mở mệnh đề nhượng bộ; dùng đầu câu.'],
  ['order','We will release the turtles when they are strong enough.','Mệnh đề thời gian với when dùng hiện tại đơn dù nói về tương lai.'],
  ['correct','The volunteers will plant trees if it will stop raining.','The volunteers will plant trees if it stops raining.','Điều kiện có thể xảy ra: if + hiện tại đơn, không dùng will trong vế if.'],
  ['rewrite','The keepers spoke quietly. They did not want to frighten the cubs. (Nối bằng so that.)','The keepers spoke quietly so that they would not frighten the cubs.','The keepers ...','Mệnh đề mục đích phủ định trong quá khứ: so that ... would not ...'],
  ['choice','The rescue team stayed near the nest ___ the young birds could fly safely.','until',['because of','despite','in spite of'],'Until + mệnh đề nêu thời điểm kết thúc việc chờ.']
 ],
 [
  ['choice','Before applying, you should find ___ more about the training programme.','out',['up','off','away'],'Find out: tìm hiểu thông tin.'],
  ['fill','I turned ___ the job offer because the workplace was too far away. (từ chối)','down','Turn down: từ chối lời đề nghị.'],
  ['order','She is looking forward to starting her internship next month.','Look forward to + V-ing, vì to ở đây là giới từ.'],
  ['correct','Our adviser told us to fill on the application form carefully.','Our adviser told us to fill in the application form carefully.','Fill in a form: điền mẫu đơn.'],
  ['rewrite','Never stop trying to achieve your long-term goal. (Thay stop trying bằng give up.)','Never give up trying to achieve your long-term goal.','Never ...','Give up + V-ing: ngừng cố gắng.'],
  ['choice','The careers workshop was put ___ until Friday because the speaker was ill.','off',['out','up','away'],'Put off: hoãn lại.']
 ],
 [
  ['choice','My mentor encouraged me ___ an evening course.','to take',['take','taking','taken'],'Encourage + người + to V.'],
  ['fill','The tutor reminded us ___ our progress every week. (review)','to review','Remind + người + to V.'],
  ['order','The librarian advised me to join the reading group.','Advise + người + to V.'],
  ['correct','Mai promised completing the online course by June.','Mai promised to complete the online course by June.','Promise + to V: hứa làm việc gì.'],
  ['rewrite','"Do not give up learning," the coach told me. (Dùng advised.)','The coach advised me not to give up learning.','The coach advised ...','Advise + người + not to V để tường thuật lời khuyên phủ định.'],
  ['choice','Nam offered ___ his grandfather how to use the learning app.','to show',['showing','show','showed'],'Offer + to V: đề nghị làm gì.']
 ]
];
function compile(original) {
 return banks.flatMap((rows,index)=>rows.map(([type,...v],i)=>{
  const base=original.find(q=>q.unit===index+1);
  const q={id:`g12-enhanced-u${index+1}-${i+1}`,unit:index+1,level:['easy','easy','medium','medium','hard','hard'][i],topic:base.topic,rule:base.rule,type};
  if(type==='choice')Object.assign(q,{prompt:v[0],answer:v[1],options:[v[1],...v[2]],explain:v[3]});
  if(type==='fill'||type==='correct')Object.assign(q,{prompt:type==='correct'?`Sửa lỗi và viết cả câu: ${v[0]}`:v[0],answer:v[1],explain:v[2]});
  if(type==='order')Object.assign(q,{prompt:'Xếp thành câu đúng.',parts:v[0].split(' '),answer:v[0],explain:v[1]});
  if(type==='rewrite')Object.assign(q,{source:v[0],prompt:'Viết lại theo yêu cầu.',answer:v[1],cue:v[2],explain:v[3]});
  return q;
 }));
}
module.exports={compile};
