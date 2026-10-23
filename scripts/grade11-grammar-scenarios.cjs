// Mỗi mục dưới đây là một tình huống riêng, không nhân bản qua nhiều dạng.
const banks = [
 [
 ['choice','My grandfather ___ this walking club in 2018.','joined',['has joined','joins','joining'],'Mốc năm 2018 đã kết thúc: dùng quá khứ đơn.'],
 ['fill','Mai ___ three glasses of water so far today. (drink)','has drunk','So far today tính đến hiện tại: has + phân từ quá khứ.'],
 ['order','We have taken the stairs every day since September.','Since September nối thời điểm bắt đầu với hiện tại.'],
 ['correct','Last Sunday, I have cooked a vegetable soup.','Last Sunday, I cooked a vegetable soup.','Last Sunday là thời gian đã kết thúc.'],
 ['rewrite','The last time he visited the dentist was two years ago.','He has not visited the dentist for two years.','He has not ...','Dùng hiện tại hoàn thành phủ định và for two years.'],
 ['choice','___ you ever tried swimming before breakfast?','Have',['Did','Do','Are'],'Ever hỏi trải nghiệm tính đến hiện tại.']
 ],
 [
 ['choice','This is a library rule: visitors ___ keep their phones silent.','must',['might','do not have to','must not'],'Quy định bắt buộc: must.'],
 ['fill','Dinner is already ready. You ___ cook tonight. (không cần)','do not have to','Không cần làm, không phải bị cấm: do not have to.'],
 ['order','We should listen to each other before making a decision.','Should đưa lời khuyên; sau should dùng động từ nguyên mẫu.'],
 ['correct','You must to ask before borrowing my laptop.','You must ask before borrowing my laptop.','Sau must không có to.'],
 ['rewrite','It is forbidden to share another person’s password.','You must not share another person’s password.','You must not ...','Must not diễn đạt điều bị cấm.'],
 ['choice','My parents suggest taking a break. I ___ rest for a while.','should',['must not','should to','am'],'Lời khuyên nhẹ: should + động từ nguyên mẫu.']
 ],
 [
 ['choice','The new community garden looks ___ after the rain.','beautiful',['beautifully','beauty','beautify'],'Look là động từ nối khi miêu tả vẻ ngoài, theo sau là tính từ.'],
 ['fill','This soup ___ delicious. (taste)','tastes','Taste chỉ vị của món ăn: dạng trạng thái, chủ ngữ số ít.'],
 ['order','The streets seem quieter after the new railway opens.','Seem đi với tính từ so sánh quieter.'],
 ['correct','I am knowing the way to the pedestrian bridge.','I know the way to the pedestrian bridge.','Know chỉ sự hiểu biết, thường dùng ở thì đơn.'],
 ['rewrite','The new bus seats are comfortable to sit on. (Dùng feel.)','The new bus seats feel comfortable.','The new bus seats ...','Feel là động từ nối, theo sau là tính từ comfortable.'],
 ['choice','Be quiet! The engineer ___ carefully to a strange noise in the lift.','is listening',['listens','is seeming','seems'],'Listen là hành động đang diễn ra nên dùng hiện tại tiếp diễn.']
 ],
 [
 ['choice','Our guests enjoyed ___ traditional games with us.','playing',['to play','play','played'],'Enjoy + V-ing.'],
 ['fill','Lan is interested in ___ the regional youth meeting. (attend)','attending','Sau giới từ in dùng V-ing.'],
 ['order','Sharing meals helps visitors understand local customs.','Sharing meals làm chủ ngữ, động từ chính là helps.'],
 ['correct','They suggested to hold a cultural workshop.','They suggested holding a cultural workshop.','Suggest + V-ing.'],
 ['rewrite','It is exciting to meet students from neighbouring countries. (Bắt đầu bằng Meeting.)','Meeting students from neighbouring countries is exciting.','Meeting ...','Cụm danh động từ có thể làm chủ ngữ.'],
 ['choice','Thank you for ___ us organise the exchange.','helping',['help','helped','to help'],'Sau for dùng dạng V-ing.']
 ],
 [
 ['choice','___ by a severe storm, the coastal village needed support.','Damaged',['Damaging','Damage','To damaging'],'Ngôi làng bị thiệt hại: dùng phân từ quá khứ mang nghĩa bị động.'],
 ['fill','___ along the beach, we noticed plastic waste. (walk)','Walking','We chủ động đi bộ: dùng Walking; chủ thể hai vế phải trùng nhau.'],
 ['order','Powered by wind energy, the pump produces no exhaust fumes.','Máy bơm được cung cấp năng lượng: Powered by.'],
 ['correct','Knowing for its green spaces, the town attracts visitors.','Known for its green spaces, the town attracts visitors.','Thị trấn được biết đến: Known for, không phải Knowing.'],
 ['rewrite','Because she wanted to save energy, Linh switched off the lights. (Bắt đầu bằng Wanting.)','Wanting to save energy, Linh switched off the lights.','Wanting ...','Linh là chủ thể của cả wanting và switched.'],
 ['choice','___ too much heat, the city’s dark roads become uncomfortable to walk on.','Absorbing',['Absorbed','Absorb','Having absorb'],'Roads chủ động hấp thụ nhiệt: V-ing.']
 ],
 [
 ['choice','We joined the guided walk ___ about the ancient citadel.','to learn',['learning','learned','for learn'],'To learn diễn đạt mục đích.'],
 ['fill','Minh was the first student ___ the damaged tile. (notice)','to notice','Sau the first + danh từ có thể dùng to V.'],
 ['order','The museum has a quiet room to display old photographs.','To display bổ nghĩa cho mục đích sử dụng căn phòng.'],
 ['correct','They raised money for restore the temple roof.','They raised money to restore the temple roof.','Dùng to V để chỉ mục đích.'],
 ['rewrite','We visited the craft village because we wanted to learn weaving. (Dùng to.)','We visited the craft village to learn weaving.','We visited ...','Rút mục đích thành to learn weaving, giữ cùng chủ thể we.'],
 ['choice','She is looking for a safe place ___ the fragile vase.','to store',['storing','stored','store'],'To store bổ nghĩa cho place.']
 ],
 [
 ['choice','___ the application form, Hoa sent it to the college.','Having completed',['Complete','Has completed','Having complete'],'Having + phân từ quá khứ: hoàn thành đơn trước khi gửi.'],
 ['fill','He was proud of ___ his apprenticeship. (hoàn thành trước đó; dùng having)','having completed','Sau of dùng danh động từ hoàn thành having completed.'],
 ['order','Having saved enough money, Mai paid her tuition fee.','Saving đã hoàn tất trước paid: Having saved.'],
 ['correct','Having finish the course, Nam applied for a job.','Having finished the course, Nam applied for a job.','Sau having dùng phân từ quá khứ finished.'],
 ['rewrite','After she had compared the courses, Lan chose vocational training. (Bắt đầu bằng Having.)','Having compared the courses, Lan chose vocational training.','Having ...','Lan là chủ thể của hai hành động; comparing diễn ra trước chose.'],
 ['choice','The trainee denied ___ the safety instructions before using the machine.','having ignored',['have ignored','having ignore','to having ignored'],'Deny + danh động từ; having ignored chỉ việc xảy ra trước.']
 ],
 [
 ['choice','It was my sister ___ taught me to cook.','that',['which','whose','where'],'Câu chẻ nhấn mạnh người: It was ... that ...'],
 ['fill','It ___ at the local market that I bought this basket yesterday.','was','Mốc yesterday: dùng It was.'],
 ['order','It is a weekly budget that helps me control my spending.','Nhấn mạnh a weekly budget bằng It is ... that ...'],
 ['correct','It was on Friday when we opened our first bank account.','It was on Friday that we opened our first bank account.','Trong mẫu câu chẻ đang luyện, dùng that sau phần nhấn mạnh.'],
 ['rewrite','I learnt time management from my father. (Nhấn mạnh from my father.)','It was from my father that I learnt time management.','It was from my father ...','Nhấn mạnh nguồn học, giữ nguyên learnt ở quá khứ.'],
 ['choice','It is ___ that I find most difficult when living alone.','doing the laundry',['do the laundry','did the laundry','does the laundry'],'Cụm V-ing làm thành phần danh từ được nhấn mạnh.']
 ],
 [
 ['choice','___ he felt nervous, he reported the bullying to a teacher.','Although',['Because of','Despite','Therefore'],'Although nối hai mệnh đề tương phản.'],
 ['fill','The club cancelled its outdoor event ___ it was raining heavily. (vì)','because','Because + mệnh đề nêu nguyên nhân.'],
 ['order','She felt lonely, so she joined a school support group.','So nối nguyên nhân với kết quả.'],
 ['correct','Despite she was tired, she helped at the shelter.','Although she was tired, she helped at the shelter.','Sau despite cần cụm danh từ; ở đây là mệnh đề nên dùng although.'],
 ['rewrite','The road was flooded. Therefore, the volunteers took another route. (Nối bằng because.)','The volunteers took another route because the road was flooded.','The volunteers ...','Because đưa mệnh đề nguyên nhân; giữ hành động và lý do.'],
 ['choice','The team had little money; ___, they found a free meeting place.','however',['because','although','despite'],'However nối hai ý tương phản sau dấu chấm phẩy.']
 ],
 [
 ['choice','The students studied a simple ___ in the pond.','food chain',['foods chain','chain food','food chainses'],'Food bổ nghĩa cho chain và giữ dạng số ít.'],
 ['fill','This wetland is a nature ___. (khu bảo tồn)','reserve','Nature reserve là cụm danh từ chỉ khu bảo tồn thiên nhiên.'],
 ['order','Wildlife protection requires cooperation between local communities.','Wildlife bổ nghĩa cho protection.'],
 ['correct','The researchers tested several waters samples from the river.','The researchers tested several water samples from the river.','Water làm danh từ bổ nghĩa nên không thêm s; samples là danh từ chính số nhiều.'],
 ['rewrite','The centre runs a programme for protecting sea turtles. (Dùng turtle protection programme.)','The centre runs a turtle protection programme.','The centre ...','Turtle và protection bổ nghĩa cho programme.'],
 ['choice','We placed the observations in a ___.','research notebook',['researches notebook','notebook research','research notebookes'],'Research làm danh từ bổ nghĩa cho notebook.']
 ]
];
function compile(original) {
 return banks.flatMap((rows,index)=>rows.map((row,i)=>{
  const [type,...v]=row,base=original.find(q=>q.unit===index+1);
  const q={id:`g11-enhanced-u${index+1}-${i+1}`,unit:index+1,level:['easy','easy','medium','medium','hard','hard'][i],topic:base.topic,rule:base.rule,type};
  if(type==='choice')Object.assign(q,{prompt:v[0],answer:v[1],options:[v[1],...v[2]],explain:v[3]});
  if(type==='fill'||type==='correct')Object.assign(q,{prompt:type==='correct'?`Sửa lỗi và viết cả câu: ${v[0]}`:v[0],answer:v[1],explain:v[2]});
  if(type==='order')Object.assign(q,{prompt:'Xếp thành câu đúng.',parts:v[0].split(' '),answer:v[0],explain:v[1]});
  if(type==='rewrite')Object.assign(q,{source:v[0],prompt:'Viết lại theo yêu cầu.',answer:v[1],cue:v[2],explain:v[3]});
  return q;
 }));
}
module.exports={compile};
