(function (root) {
  'use strict';
  const groups = [
    ['tenses', '⏳', '6 thì cơ bản', 'Diễn tả thói quen, việc đang xảy ra và các mốc thời gian.'],
    ['relative', '🔗', 'Mệnh đề quan hệ', 'Nối ý và xác định người, vật trong câu.'],
    ['condition', '⚖️', 'Câu điều kiện', 'Phân biệt sự thật, khả năng và giả định.'],
    ['wordform', '🧩', 'Cấu tạo từ', 'Chọn đúng danh từ, động từ, tính từ và trạng từ.'],
    ['foundation', '🌱', 'Nền tảng câu', 'Bắt đầu với be, đại từ, danh từ, mạo từ và giới từ.'],
    ['communication', '💬', 'So sánh và nối ý', 'Dùng tình thái, so sánh và liên từ trong giao tiếp.'],
    ['advanced', '🚀', 'Vận dụng cấu trúc', 'Luyện bị động, tường thuật, câu hỏi và ngữ cảnh phối hợp.']
  ].map(([id, icon, title, description]) => ({ id, icon, title, description }));
  const topics = [];
  function add(id, group, title, rule, pitfall, examples, rows) {
    const seeds = rows.trim().split('\n').map((line, index) => {
      const [sentence, focus, wrong, source, word] = line.trim().split('|').map(value => value.trim());
      return { sentence, focus, wrong, source, word, familyId: `${id}-${index + 1}` };
    });
    topics.push({ id, group, title, rule, pitfall, examples, seeds });
  }
  add('present-simple', 'tenses', 'Hiện tại đơn',
    'Thói quen: I/you/we/they + động từ nguyên mẫu; he/she/it + động từ thêm s/es. Phủ định dùng do not/does not + động từ nguyên mẫu.',
    'Sau does/does not, động từ chính giữ nguyên mẫu. Không dùng dấu hiệu thời gian như một quy tắc duy nhất.',
    [['Lan walks to school every day.', 'Lan đi bộ đến trường mỗi ngày.'], ['They do not eat meat.', 'Họ không ăn thịt.']], `
Lan walks to school every day.|walks|walk
My father cooks dinner on Sundays.|cooks|cook
The library opens at eight every morning.|opens|open
We play badminton after school.|play|plays
Our teacher explains each new word.|explains|explain
I brush my teeth twice a day.|brush|brushes
The bus stops near our house.|stops|stop
They study English on Mondays.|study|studies
Minh washes his bike every weekend.|washes|wash
She does not drink coffee.|does not drink|does not drinks
I do not work on Saturdays.|do not work|does not work
Does your brother like chess?|Does|Do
Do the students wear uniforms?|Do|Does
Mai usually carries a notebook.|carries|carry
This shop closes at nine every evening.|closes|close
My cousins visit us every summer.|visit|visits
Nam often helps his grandmother.|helps|help
We always check our answers.|check|checks
The children enjoy drawing.|enjoy|enjoys
Her uncle teaches maths.|teaches|teach
I usually take the bus to work.|take|takes
My sister does not watch TV at night.|does not watch|does not watches
Do you need a new pencil?|Do|Does
He reads the news every morning.|reads|read
She does not eat meat.|does not eat|does not eats|She never eats meat.|not
They do not arrive late.|do not arrive|does not arrive|They never arrive late.|not
He does not smoke.|does not smoke|does not smokes|He never smokes.|not
We do not waste water.|do not waste|does not waste|We never waste water.|not
I do not skip breakfast.|do not skip|does not skip|I never skip breakfast.|not
Mai does not forget her keys.|does not forget|does not forgets|Mai never forgets her keys.|not`);
  add('present-continuous', 'tenses', 'Hiện tại tiếp diễn',
    'Việc đang diễn ra: am/is/are + V-ing. I đi với am; he/she/it đi với is; you/we/they đi với are. Đảo be lên trước chủ ngữ để hỏi.',
    'Không bỏ động từ be. Động từ trạng thái như know thường không dùng tiếp diễn trong nghĩa chỉ sự hiểu biết.',
    [['Mai is reading a book now.', 'Mai đang đọc sách lúc này.'], ['We are not playing outside.', 'Chúng tôi không đang chơi ngoài trời.']], `
Mai is reading a book now.|is reading|are reading
They are waiting for the bus now.|are waiting|is waiting
I am writing an email at the moment.|am writing|is writing
The baby is sleeping now.|is sleeping|are sleeping
We are preparing lunch right now.|are preparing|is preparing
Look! The boys are running.|are running|is running
Listen! Someone is singing.|is singing|are singing
My parents are working in the garden now.|are working|is working
The dog is chasing a ball now.|is chasing|are chasing
She is not watching TV now.|is not watching|is not watch
Are you listening to me?|Are|Is
Is Nam doing his homework now?|Is|Are
I am not using that chair.|am not using|is not using
We are learning a new song today.|are learning|is learning
The chef is cutting vegetables now.|is cutting|are cutting
The children are drawing pictures now.|are drawing|is drawing
My sister is taking a photo now.|is taking|are taking
It is raining outside right now.|is raining|are raining
The workers are repairing the road now.|are repairing|is repairing
I am looking for my glasses.|am looking|are looking
Who is knocking at the door?|is knocking|are knocking
The students are not talking now.|are not talking|is not talking
My brother is swimming in the pool now.|is swimming|is swiming
We are sitting near the window now.|are sitting|are siting
Lan is reading now.|is reading|are reading|Lan's reading now.|is
They are cooking now.|are cooking|is cooking|They're cooking now.|are
I am studying now.|am studying|is studying|I'm studying now.|am
He is not sleeping now.|is not sleeping|is not sleep|He isn't sleeping now.|not
We are not playing now.|are not playing|is not playing|We aren't playing now.|not
Minh is working now.|is working|are working|Minh's working now.|is`);
  add('past-simple', 'tenses', 'Quá khứ đơn',
    'Việc đã kết thúc trong quá khứ: động từ dạng quá khứ; phủ định did not + nguyên mẫu; câu hỏi Did + chủ ngữ + nguyên mẫu. Be dùng was/were.',
    'Không dùng động từ quá khứ sau did/did not. Động từ bất quy tắc cần học riêng, không thêm ed hàng loạt.',
    [['We visited Hue last year.', 'Chúng tôi đã thăm Huế năm ngoái.'], ['She did not go out yesterday.', 'Cô ấy đã không ra ngoài hôm qua.']], `
We visited Hue last year.|visited|visit
Nam bought a new notebook yesterday.|bought|buyed
She went to the museum last Sunday.|went|goed
They played football yesterday.|played|play
I saw a rainbow yesterday.|saw|seed
My father made breakfast yesterday.|made|maked
The lesson started at nine yesterday.|started|start
Lan wrote a letter last night.|wrote|writed
We took a taxi yesterday.|took|taked
He did not finish the task yesterday.|did not finish|did not finished
Did you call Mai last night?|Did|Do
She was tired after the trip yesterday.|was|were
They were at home last night.|were|was
I lost my pen yesterday.|lost|losed
The children found a shell yesterday.|found|finded
We ate noodles for lunch yesterday.|ate|eated
The train arrived late yesterday.|arrived|arrive
He broke a cup yesterday.|broke|breaked
They built this bridge in 2010.|built|builded
I met my cousin last weekend.|met|meet
Did she bring her umbrella yesterday?|bring|brought
We did not see that film last week.|did not see|did not saw
My sister drank orange juice yesterday.|drank|drinked
The team won the match yesterday.|won|winned
He did not come yesterday.|did not come|did not came|He didn't come yesterday.|not
They did not play yesterday.|did not play|did not played|They didn't play yesterday.|not
I did not watch TV last night.|did not watch|did not watched|I didn't watch TV last night.|not
Mai did not call yesterday.|did not call|did not called|Mai didn't call yesterday.|not
We did not buy anything yesterday.|did not buy|did not bought|We didn't buy anything yesterday.|not
Nam did not forget the meeting.|did not forget|did not forgot|Nam didn't forget the meeting.|not`);
  add('past-continuous', 'tenses', 'Quá khứ tiếp diễn',
    'Việc đang diễn ra tại một thời điểm quá khứ: was/were + V-ing. I/he/she/it đi với was; you/we/they đi với were.',
    'Việc đang diễn ra dùng tiếp diễn; việc xen vào có thể dùng quá khứ đơn. When/while không tự quyết định thì của mọi câu.',
    [['I was studying at eight last night.', 'Tôi đang học lúc tám giờ tối qua.'], ['They were cooking when I arrived.', 'Họ đang nấu ăn khi tôi đến.']], `
I was studying at eight last night.|was studying|were studying
They were cooking when I arrived.|were cooking|was cooking
Mai was reading when the phone rang.|was reading|were reading
We were walking home at five yesterday.|were walking|was walking
The baby was sleeping at midnight.|was sleeping|were sleeping
My parents were watching TV at nine last night.|were watching|was watching
Nam was doing homework when I called.|was doing|were doing
It was raining when we left.|was raining|were raining
You were talking when the teacher entered.|were talking|was talking
She was not listening at that moment.|was not listening|was not listen
Were they waiting at six yesterday?|Were|Was
Was he working when you arrived?|Was|Were
I was not driving when you called.|was not driving|were not driving
The boys were playing while their mother cooked.|were playing|was playing
Lan was painting at ten yesterday.|was painting|were painting
We were having lunch when the lights went out.|were having|was having
The dog was barking when I woke up.|was barking|were barking
My sister was writing while I read.|was writing|were writing
The workers were repairing the roof at noon.|were repairing|was repairing
He was carrying a box when he fell.|was carrying|were carrying
The students were taking a test at nine.|were taking|was taking
I was looking for my keys when she arrived.|was looking|were looking
The children were swimming at four yesterday.|were swimming|were swiming
Mai was sitting beside me during the concert.|was sitting|was siting
He was not sleeping at ten.|was not sleeping|was not sleep|He wasn't sleeping at ten.|not
We were not studying at noon.|were not studying|was not studying|We weren't studying at noon.|not
They were not playing at five.|were not playing|was not playing|They weren't playing at five.|not
Mai was not working at midnight.|was not working|were not working|Mai wasn't working at midnight.|not
I was not watching TV at eight.|was not watching|were not watching|I wasn't watching TV at eight.|not
Nam was not cooking when I called.|was not cooking|were not cooking|Nam wasn't cooking when I called.|not`);
  add('future-simple', 'tenses', 'Tương lai đơn',
    'Will + động từ nguyên mẫu dùng cho lời hứa, quyết định ngay lúc nói hoặc dự đoán. Phủ định will not; câu hỏi Will + chủ ngữ + nguyên mẫu.',
    'Không thêm s/ed vào động từ sau will. Dùng will trong các bài này theo yêu cầu; không coi mọi cách nói về tương lai khác đều sai.',
    [['I will help you with this box.', 'Tôi sẽ giúp bạn với chiếc hộp này.'], ['She will not forget your birthday.', 'Cô ấy sẽ không quên sinh nhật bạn.']], `
I will help you with this box.|will help|will helps
She will call you tonight.|will call|will calls
We will finish the work tomorrow.|will finish|will finished
They will arrive before noon tomorrow.|will arrive|will arrives
He will send the message later.|will send|will sends
I will open the door for you.|will open|will opened
The team will try again tomorrow.|will try|will tries
We will bring some water tomorrow.|will bring|will brought
Mai will join us next week.|will join|will joins
She will not forget your birthday.|will not forget|will not forgets
Will you help me tomorrow?|Will|Does
Will he come to the meeting?|come|comes
I will not leave you alone.|will not leave|will not left
We will be there at seven tomorrow.|will be|will are
The shop will close early tomorrow.|will close|will closes
I think it will rain tomorrow.|will rain|will rains
They will need more chairs tomorrow.|will need|will needs
He will explain the rules later.|will explain|will explained
I will answer the phone.|will answer|will answers
Our teacher will check the work tomorrow.|will check|will checks
Will the children stay at home tomorrow?|stay|stays
We will not waste your time.|will not waste|will not wastes
Mai will lend you her book.|will lend|will lent
I will carry your bag.|will carry|will carries
She will not go tomorrow.|will not go|will not goes|She won't go tomorrow.|not
They will not be late.|will not be|will not are|They won't be late.|not
I will help you.|will help|will helps|I'll help you.|will
We will meet tomorrow.|will meet|will met|We'll meet tomorrow.|will
He will not give up.|will not give|will not gives|He won't give up.|not
Mai will not forget.|will not forget|will not forgets|Mai won't forget.|not`);
  add('present-perfect', 'tenses', 'Hiện tại hoàn thành',
    'Have/has + quá khứ phân từ: trải nghiệm chưa nêu thời điểm đã kết thúc, kết quả hiện tại hoặc việc kéo dài đến hiện tại. Since + mốc bắt đầu; for + khoảng thời gian.',
    'Không ghép hiện tại hoàn thành với yesterday/last week để kể một việc đã kết thúc lúc đó. Phân từ bất quy tắc không luôn giống dạng quá khứ.',
    [['She has lost her keys, so she cannot open the door.', 'Cô ấy làm mất chìa khóa nên không mở được cửa.'], ['We have lived here for five years.', 'Chúng tôi sống ở đây được năm năm rồi.']], `
She has lost her keys, so she cannot open the door.|has lost|have lost
We have lived here for five years.|have lived|has lived
I have already finished my homework.|have already finished|has already finished
He has just arrived.|has just arrived|have just arrived
They have visited Hue twice.|have visited|has visited
Mai has never tried sushi.|has never tried|have never tried
You have made good progress this term.|have made|has made
The train has not arrived yet.|has not arrived|have not arrived
We have known each other since 2020.|have known|have knew
Has she read this book yet?|Has|Have
Have you ever seen a whale?|seen|saw
I have not eaten lunch yet.|have not eaten|have not ate
Nam has broken his glasses, so he cannot use them.|has broken|has broke
The children have cleaned their room.|have cleaned|has cleaned
My sister has been to Da Nang twice.|has been|have been
We have had this bike for three years.|have had|have has
I have sent the email already.|have sent|have sended
He has worked here since January.|has worked|have worked
They have not called us yet.|have not called|has not called
She has written three stories so far.|has written|has wrote
The rain has stopped, so we can go out.|has stopped|have stopped
Have the students finished the task?|Have|Has
We have bought some fruit for lunch.|have bought|have buyed
Mai has found her missing bag.|has found|has finded
I have not finished yet.|have not finished|has not finished|I haven't finished yet.|not
He has not arrived yet.|has not arrived|have not arrived|He hasn't arrived yet.|not
They have lived here since 2021.|have lived|has lived|They've lived here since 2021.|have
She has already eaten.|has already eaten|have already eaten|She's already eaten.|has
We have not met before.|have not met|has not met|We haven't met before.|not
Nam has not seen this film.|has not seen|has not saw|Nam hasn't seen this film.|not`);
  add('relative-clauses', 'relative', 'Mệnh đề quan hệ',
    'Who chỉ người, which chỉ vật; whose đứng trước danh từ để chỉ sở hữu. Mệnh đề xác định có thể dùng that cho người/vật. Khi đại từ là chủ ngữ, không thêm một chủ ngữ trùng phía sau.',
    'Không dùng that sau dấu phẩy trong mệnh đề không xác định. Whose là sở hữu, không phải who’s. Với tân ngữ có thể có nhiều cách đúng; bài sẽ chấp nhận biến thể phù hợp.',
    [['The girl who sits next to me is Lan.', 'Cô gái ngồi cạnh tôi là Lan.'], ['The boy whose bike is red is Nam.', 'Cậu bé có chiếc xe đạp màu đỏ là Nam.']], `
The girl who sits next to me is Lan.|who|which
The book which is on the desk is mine.|which|who
The boy whose bike is red is Nam.|whose|who
My aunt, who lives in Hue, is a doctor.|who|that
This bridge, which opened last year, is very long.|which|that
The teacher who helps us is kind.|who|which
The bag which fell off the chair is blue.|which|who
The woman whose son is in my class is a nurse.|whose|which
The dog which lives next door is friendly.|which|who
The students who study here wear uniforms.|who|which
The phone which is charging is mine.|which|who
The man whose car broke down called us.|whose|who
My brother, who works in Hanoi, visits often.|who|that
Our school, which has a big library, is nearby.|which|that
The artist whose painting won is happy.|whose|which
The person who called you is my uncle.|who|which
The house which has green windows is ours.|which|who
The singer whose voice you like is here.|whose|who
The children who are waiting need help.|who|which
The camera which costs less is smaller.|which|who
The farmer whose field is flooded needs support.|whose|which
The woman who teaches music is my neighbour.|who|which
The bicycle which is outside belongs to Mai.|which|who
Lan, who speaks English well, will help us.|who|that
The boy who is carrying a box is my brother.|who|which|The boy is my brother. He is carrying a box.|who
The bus which stops here goes to town.|which|who|The bus goes to town. It stops here.|which
The girl whose father is a teacher is Mai.|whose|who|The girl is Mai. Her father is a teacher.|whose
The shop which sells bread is open.|which|who|The shop is open. It sells bread.|which
The woman who lives upstairs is a doctor.|who|which|The woman is a doctor. She lives upstairs.|who
The tree which stands near the gate is old.|which|who|The tree is old. It stands near the gate.|which`);
  add('conditionals', 'condition', 'Câu điều kiện',
    'Loại 0: if + hiện tại đơn, hiện tại đơn. Loại 1: if + hiện tại đơn, will + nguyên mẫu. Loại 2: if + quá khứ đơn, would + nguyên mẫu. Loại 3: if + had + phân từ, would have + phân từ.',
    'Trong mẫu điều kiện loại 1 cơ bản, không thêm will vào mệnh đề if. Với giả định loại 2, were thường dùng cho mọi chủ ngữ, đặc biệt If I were you.',
    [['If it rains tomorrow, we will stay home.', 'Nếu ngày mai trời mưa, chúng tôi sẽ ở nhà.'], ['If I were you, I would ask for help.', 'Nếu là bạn, tôi sẽ nhờ giúp đỡ.']], `
If it rains tomorrow, we will stay home.|rains|will rains
If you heat ice, it melts.|melts|melt
If I were you, I would ask for help.|were|am
If she studies tonight, she will be ready.|studies|study
If they had a car, they would drive there.|would drive|will drove
If we had left earlier, we would have caught the bus.|would have caught|would have catch
If you press this button, the light turns on.|turns|turn
If he calls tomorrow, I will tell you.|calls|will calls
If Mai had more time, she would learn painting.|would learn|would learned
If it is sunny tomorrow, we will have a picnic.|will have|will has
If you mix blue and yellow, you get green.|get|gets
If I knew the answer, I would tell you.|knew|know
If Nam had studied, he would have passed.|had studied|had study
If they arrive early tomorrow, we will start on time.|arrive|arrives
If she were here, she would help us.|would help|would helps
If water reaches 100 degrees Celsius at sea level, it boils.|boils|boil
If we save enough money, we will buy a bike.|will buy|will bought
If I had wings, I would fly.|would fly|would flew
If he had listened, he would have understood.|would have understood|would have understand
If the shop is open tomorrow, I will buy some bread.|is|will is
If you do not water this plant, it dies.|do not water|does not water
If Lan practised more, she would play better.|would play|would plays
If we had taken a map, we would not have got lost.|had taken|had took
If you see Mai tomorrow, please give her this book.|see|sees
If you do not hurry, you will miss the bus.|do not hurry|does not hurry|Unless you hurry, you will miss the bus.|If
If it does not rain, we will walk.|does not rain|does not rains|Unless it rains, we will walk.|If
If you do not study, you will fail.|do not study|does not study|Unless you study, you will fail.|If
If he does not leave now, he will be late.|does not leave|does not leaves|Unless he leaves now, he will be late.|If
If we do not act, the problem will get worse.|do not act|does not act|Unless we act, the problem will get worse.|If
If she does not call, I will send a message.|does not call|does not calls|Unless she calls, I will send a message.|If`);
  add('word-forms', 'wordform', 'Cấu tạo từ',
    'Danh từ gọi tên người/vật/ý niệm; tính từ bổ nghĩa danh từ; trạng từ có thể bổ nghĩa động từ hoặc tính từ. Xác định vai trò của chỗ trống trước khi chọn dạng từ.',
    'Không phải từ kết thúc bằng ly đều là trạng từ: friendly là tính từ. Sau be có thể là danh từ, tính từ hoặc cấu trúc khác; cần xét cả nghĩa và câu.',
    [['She is a careful driver.', 'Cô ấy là một người lái xe cẩn thận.'], ['He answered politely.', 'Anh ấy trả lời lịch sự.']], `
She is a careful driver.|careful|carefully
He answered politely.|politely|polite
We need more information.|information|inform
The children were happy.|happy|happily
She speaks clearly.|clearly|clear
This is a useful tool.|useful|usefully
His explanation was clear.|explanation|explain
They worked quietly.|quietly|quiet
The garden is beautiful.|beautiful|beautifully
Her kindness helped me.|kindness|kind
The bus driver waited patiently.|patiently|patient
This road is dangerous.|dangerous|dangerously
Education is important.|Education|Educate
The students listened carefully.|carefully|careful
We had an interesting lesson.|interesting|interestingly
She made a good decision.|decision|decide
He smiled happily.|happily|happy
The team celebrated their success.|success|succeed
I felt comfortable in this chair.|comfortable|comfortably
The instructions are helpful.|helpful|helpfully
We discussed the importance of sleep.|importance|important
She completed the task successfully.|successfully|successful
The story was exciting.|exciting|excitingly
His arrival surprised everyone.|arrival|arrive
He drives carefully.|carefully|careful|He is a careful driver.|carefully
She sings beautifully.|beautifully|beautiful|Her singing is beautiful.|beautifully
He runs quickly.|quickly|quick|He is a quick runner.|quickly
She swims well.|well|good|She is a good swimmer.|well
He works hard.|hard|hardly|He is a hard worker.|hard
She dances gracefully.|gracefully|graceful|She is a graceful dancer.|gracefully`);
  add('be', 'foundation', 'Động từ be', 'Hiện tại: I am, he/she/it is, you/we/they are. Be nối chủ ngữ với thông tin về danh tính, trạng thái hoặc vị trí.', 'Câu hỏi đảo be lên trước chủ ngữ, không dùng do/does với be trong mẫu này.', [['I am a student.', 'Tôi là học sinh.'], ['Are they ready?', 'Họ sẵn sàng chưa?']], `
I am a student.|am|is
Lan is at home.|is|are
We are ready.|are|is
The books are on the desk.|are|is
My brother is twelve.|is|are
Are you tired?|Are|Is
Is she your teacher?|Is|Are
They are in the library.|are|is
The water is cold.|is|are
I am not late.|am|are
This room is clean.|is|are
Our friends are helpful.|are|is
She is not hungry.|is not|are not|She isn't hungry.|not
They are not here.|are not|is not|They aren't here.|not
I am happy.|am|is|I'm happy.|am`);
  add('pronouns', 'foundation', 'Đại từ và sở hữu', 'I/he/she/we/they làm chủ ngữ; me/him/her/us/them làm tân ngữ. My/your/his/her/our/their đứng trước danh từ; mine/yours/hers/ours/theirs thay cả cụm danh từ.', 'Không thêm danh từ sau mine/yours/ours. Its chỉ sở hữu; it’s là it is hoặc it has.', [['This bag is mine.', 'Chiếc túi này là của tôi.'], ['Please help me.', 'Làm ơn giúp tôi.']], `
This bag is mine.|mine|my
Please help me.|me|I
She is my sister.|She|Her
We invited them.|them|they
His bike is red.|His|He
They live near us.|us|we
Our classroom is bright.|Our|Ours
This pen belongs to him.|him|he
That house is theirs.|theirs|their
The cat is licking its paw.|its|it's
You can sit beside her.|her|she
These books are ours.|ours|our
This is my book.|my|mine|This book is mine.|my
That is her bag.|her|hers|That bag is hers.|her
These are our seats.|our|ours|These seats are ours.|our`);
  add('nouns', 'foundation', 'Danh từ và số nhiều', 'Danh từ đếm được có dạng số ít/số nhiều. Nhiều từ thêm s/es, một số bất quy tắc như child → children. Danh từ không đếm được như water không dùng a/an trong nghĩa thông thường.', 'Không dùng informations hoặc advices trong nghĩa thông tin/lời khuyên nói chung. Dùng pieces of advice khi cần đếm.', [['There are three children here.', 'Có ba đứa trẻ ở đây.'], ['I need some water.', 'Tôi cần một ít nước.']], `
There are three children here.|children|childs
I need some water.|water|waters
Two women are waiting.|women|womans
The boxes are heavy.|boxes|boxs
These knives are sharp.|knives|knifes
We saw five sheep.|sheep|sheeps
The leaves are green.|leaves|leafs
Both men are teachers.|men|mans
My feet are cold.|feet|foots
I need some information.|information|informations
There are four buses outside.|buses|buss
She gave me some advice.|advice|advices
I have two pieces of advice.|pieces of advice|advices|I have two suggestions to give as advice.|pieces
There are two children in the room.|children|childs|The room has two children in it.|There
There are three boxes on the shelf.|boxes|boxs|The shelf has three boxes on it.|There`);
  add('articles', 'foundation', 'Mạo từ a, an, the', 'A/an dùng trước danh từ đếm được số ít chưa xác định; chọn theo âm đầu: an apple, a university. The dùng khi người nghe xác định được đối tượng.', 'Âm quyết định a/an, không phải chữ cái đầu. Các câu về vật đã nhắc lại dùng the; không tự thêm the vào mọi danh từ.', [['She bought a book. The book is blue.', 'Cô ấy mua một cuốn sách. Cuốn sách đó màu xanh.'], ['He is an honest man.', 'Anh ấy là người trung thực.']], `
I ate an apple.|an|a
She has a bicycle.|a|an
He is an honest man.|an|a
Mai studies at a university.|a|an
We waited for an hour.|an|a
I saw a cat. The cat was black.|The|A
Please close the door next to you.|the|an
There is an umbrella by the window.|an|a
My father is a teacher.|a|an
She gave me a useful tip.|a|an
He wore a uniform.|a|an
The sun is bright today.|The|An
She is an English teacher.|an|a|She teaches English as her job.|an
He is a doctor.|a|an|He works as a doctor.|a
This is an old house.|an|a|This house is old.|an`);
  add('quantifiers', 'foundation', 'Lượng từ', 'Many/few đi với danh từ đếm được số nhiều; much/little đi với danh từ không đếm được. A few/a little có nghĩa có một ít; enough diễn tả đủ.', 'Few/little nhấn mạnh sự ít ỏi; a few/a little nhấn mạnh có một ít. Some thường dùng trong câu khẳng định, nhưng cũng dùng khi mời hoặc đề nghị.', [['We have a few chairs.', 'Chúng tôi có một vài chiếc ghế.'], ['There is a little milk left.', 'Còn lại một ít sữa.']], `
How many books do you have?|many|much
How much water do we need?|much|many
There are a few chairs here.|a few|a little
There is a little milk left.|a little|a few
We do not have much time.|much|many
She has many friends.|many|much
There are enough seats for everyone.|enough|much
I have a little money left.|a little|a few
There are too many cars on this road.|many|much
There is too much sugar in this tea.|much|many
Only a few students were absent.|a few|a little
He has very little patience.|little|few
We have enough chairs for everyone.|enough|much|We have at least as many chairs as we need for everyone.|enough
There is enough water for the trip.|enough|many|There is at least as much water as we need for the trip.|enough
I have enough time to finish.|enough|many|I have at least as much time as I need to finish.|enough`);
  add('adjectives-adverbs', 'foundation', 'Tính từ và trạng từ', 'Tính từ bổ nghĩa danh từ hoặc diễn tả trạng thái sau be/look/seem. Trạng từ thường bổ nghĩa cách thực hiện hành động: careful → carefully, good → well.', 'Hard và fast có thể làm trạng từ, không thêm ly trong nghĩa làm việc chăm chỉ/chạy nhanh. Hardly có nghĩa hầu như không.', [['The soup smells good.', 'Món súp có mùi thơm.'], ['She plays the piano well.', 'Cô ấy chơi piano giỏi.']], `
The soup smells good.|good|well
She plays the piano well.|well|good
He answered quickly.|quickly|quick
This is a quiet room.|quiet|quietly
The children looked happy.|happy|happily
She spoke softly.|softly|soft
He works hard.|hard|hardly
That train moves fast.|fast|fastly
The test was easy.|easy|easily
We solved the problem easily.|easily|easy
He is a friendly person.|friendly|friendlily
The music sounds beautiful.|beautiful|beautifully
She speaks quietly.|quietly|quiet|Her way of speaking is quiet.|quietly
He answers politely.|politely|polite|His answers are polite.|politely
She dances gracefully.|gracefully|graceful|Her dancing is graceful.|gracefully`);
  add('prepositions', 'foundation', 'Giới từ thời gian và vị trí', 'At dùng cho giờ; on cho ngày/thứ; in cho tháng/năm và nhiều khoảng thời gian dài. In chỉ bên trong; on chỉ trên bề mặt; under chỉ bên dưới.', 'Cụm giới từ còn phụ thuộc nghĩa và cách dùng cố định. Những câu này cung cấp vị trí hoặc thời gian rõ ràng, không đoán giới từ từ một từ riêng lẻ.', [['We meet at seven.', 'Chúng tôi gặp nhau lúc bảy giờ.'], ['Her birthday is in May.', 'Sinh nhật cô ấy vào tháng Năm.']], `
We meet at seven.|at|on
Her birthday is in May.|in|at
The test is on Monday.|on|in
I was born in 2012.|in|on
The picture hangs on the wall.|on|in
The fish swims in the tank.|in|on
The bag is under the chair.|under|into
We have lunch at noon.|at|in
They arrived on Friday.|on|at
I often read in the evening.|in|on
The cat is sleeping on the sofa.|on|into
She is standing between her two brothers.|between|among
We meet on Monday.|on|in|Our meeting day is Monday.|on
The lesson begins at nine.|at|on|Nine is the starting time of the lesson.|at
My birthday is in June.|in|at|June is my birth month.|in`);
  add('modals', 'communication', 'Động từ tình thái', 'Can/could/should/must/may/might + động từ nguyên mẫu. Must not là cấm; do not have to là không bắt buộc. Should thường dùng để khuyên.', 'Không dùng to hoặc thêm s sau động từ tình thái. Không đổi must not thành do not have to vì nghĩa khác nhau.', [['You should drink some water.', 'Bạn nên uống một ít nước.'], ['You must not park here.', 'Bạn không được đỗ xe ở đây.']], `
You should drink some water.|drink|drinks
She can swim well.|swim|swims
We must wear helmets.|wear|to wear
He may arrive later.|arrive|arrives
They might need help.|need|needs
Could you open the window?|open|to open
You must not park here.|must not|must not to
I can speak English.|speak|to speak
She should rest today.|rest|rests
We do not have to pay today.|have to|has to
He could read when he was five.|read|reads
May I sit here?|sit|to sit
You must wear a helmet.|must wear|must to wear|Wearing a helmet is compulsory for you.|must
You must not enter this room.|must not enter|must not to enter|You are forbidden to enter this room.|must
You do not have to come tomorrow.|do not have to|does not have to|It is not necessary for you to come tomorrow.|have`);
  add('comparisons', 'communication', 'So sánh', 'Tính từ ngắn thường thêm er/est; tính từ dài thường dùng more/most. So sánh ngang bằng dùng as + tính từ + as. Good → better → best.', 'Không dùng more taller hoặc most biggest. Trong mẫu so sánh nhất xác định, dùng the; chú ý các dạng bất quy tắc.', [['This bag is lighter than that one.', 'Túi này nhẹ hơn túi kia.'], ['Mai is as tall as Lan.', 'Mai cao bằng Lan.']], `
This bag is lighter than that one.|lighter|more lighter
Mai is as tall as Lan.|as tall as|as taller as
This is the biggest room.|biggest|most biggest
This book is more interesting than that one.|more interesting|interestinger
Today is colder than yesterday.|colder|more colder
Her score is better than mine.|better|gooder
Nam is the tallest boy in our class.|tallest|most tallest
This route is shorter than the old one.|shorter|more shorter
This is the most useful tool here.|most useful|usefulest
The red bag is as heavy as the blue one.|as heavy as|as heavier as
This chair is more comfortable than that one.|more comfortable|comfortabler
It was the best day of the trip.|best|goodest
Lan is shorter than Mai.|shorter than|more shorter than|Mai is taller than Lan.|shorter
This bag is not as heavy as that one.|not as heavy as|not as heavier as|That bag is heavier than this one.|as
My bike is not as fast as yours.|not as fast as|not as faster as|Your bike is faster than mine.|as`);
  add('connectors', 'communication', 'Liên từ và nối ý', 'Because + mệnh đề nêu nguyên nhân; because of + cụm danh từ. Although + mệnh đề diễn tả nhượng bộ; despite + danh từ/V-ing. And thêm ý, but đối lập, so nêu kết quả.', 'Trong mẫu cơ bản, không dùng đồng thời although và but để nối cùng hai mệnh đề. However là trạng từ nối và cần dấu câu thích hợp.', [['We stayed home because it rained.', 'Chúng tôi ở nhà vì trời mưa.'], ['Although she was tired, she kept working.', 'Dù mệt, cô ấy vẫn tiếp tục làm việc.']], `
We stayed home because it rained.|because|because of
Although she was tired, she kept working.|Although|Despite
We cancelled the trip because of the rain.|because of|because
Despite the noise, I could sleep.|Despite|Although
He was hungry, so he ate a sandwich.|so|because of
I like tea and coffee.|and|although
Although it was cold, they went swimming.|Although|Despite
She smiled despite feeling nervous.|despite|although
We left early because the road was busy.|because|because of
He is young but very responsible.|but|despite
Because of the storm, the match stopped.|Because of|Because
I took an umbrella because it was raining.|because|despite
Although it rained, we went out.|Although|Despite|It rained, but we went out.|Although
Although he was tired, he finished the work.|Although|Despite|He was tired, but he finished the work.|Although
We stayed home because it was cold.|because|because of|It was cold, so we stayed home.|because`);
  add('passive', 'advanced', 'Câu bị động', 'Bị động: be chia theo thì + quá khứ phân từ. Tân ngữ của câu chủ động thành chủ ngữ bị động. Có thể thêm by + người thực hiện khi cần.', 'Không bỏ be, không dùng nguyên mẫu thay phân từ. Chuyển sang bị động phải giữ thì và các thông tin của câu gốc.', [['This room is cleaned every day.', 'Phòng này được dọn mỗi ngày.'], ['The bridge was built in 2010.', 'Cây cầu được xây năm 2010.']], `
This room is cleaned every day.|is cleaned|is clean
The bridge was built in 2010.|was built|was build
These books are sold online.|are sold|are sell
The window was broken yesterday.|was broken|was broke
The letters were sent yesterday.|were sent|were send
The work will be finished tomorrow.|will be finished|will finished
English is spoken in this class.|is spoken|is spoke
The bike has been repaired.|has been repaired|has repaired
The road is being repaired now.|is being repaired|is repairing
The cake was made by Mai.|was made|was make
These trees were planted last year.|were planted|was planted
The homework must be finished today.|must be finished|must finished
The room is cleaned by Lan every day.|is cleaned|is clean|Lan cleans the room every day.|by
The letter was written by Nam yesterday.|was written|was wrote|Nam wrote the letter yesterday.|by
The work will be finished by us tomorrow.|will be finished|will finished|We will finish the work tomorrow.|by`);
  add('reported-speech', 'advanced', 'Câu tường thuật', 'Khi tường thuật sau said/told ở quá khứ, thường lùi thì và đổi đại từ theo người nói: am → was, can → could, will → would. Told cần tân ngữ; said không bắt buộc.', 'Lùi thì và đổi mốc thời gian phụ thuộc ngữ cảnh. Các bài này yêu cầu tường thuật sau thời điểm nói và theo mẫu lùi thì, không áp dụng máy móc cho sự thật vẫn đúng.', [['Lan said that she was tired.', 'Lan nói rằng cô ấy mệt.'], ['Nam told me that he could swim.', 'Nam nói với tôi rằng cậu ấy biết bơi.']], `
Lan said that she was tired.|was|were
Nam told me that he could swim.|could|can to
They said that they would help us.|would help|would helps
She told me that she had finished.|had finished|had finish
He said that he was working.|was working|were working
Mai told us that she liked music.|liked|likes to music
We said that we were ready.|were|was
Nam said that he had lost his pen.|had lost|had lose
Lan told me that she could come.|told|said
He said that he would call later.|would call|would calls
They told us that they were waiting.|were waiting|was waiting
She said that she had seen the film.|had seen|had saw
Lan said that she was happy.|was|were|Lan said, "I am happy."|said
Nam said that he could swim.|could|could to|Nam said, "I can swim."|said
Mai said that she would help me.|would help|would helps|Mai said to me, "I will help you."|said`);
  add('verb-patterns', 'advanced', 'V-ing và to V', 'Enjoy/avoid/finish + V-ing; want/decide/hope + to V. Sau giới từ thường dùng V-ing. Một số động từ dùng được cả hai dạng nhưng có thể đổi nghĩa.', 'Không đổi remember doing thành remember to do mà bỏ qua nghĩa. Bộ bài này dùng các mẫu có yêu cầu rõ, không coi mọi dạng khác đều sai.', [['I enjoy reading.', 'Tôi thích đọc sách.'], ['She decided to leave.', 'Cô ấy quyết định rời đi.']], `
I enjoy reading.|reading|to read
She decided to leave.|to leave|leaving
We finished cleaning the room.|cleaning|to clean
He wants to learn English.|to learn|learning
They avoided making noise.|making|to make
I hope to see you soon.|to see|seeing
She is interested in painting.|painting|to paint
We agreed to meet at eight.|to meet|meeting
He suggested walking home.|walking|to walk
I am looking forward to seeing you.|seeing|see
They promised to help.|to help|helping
She practised speaking English.|speaking|to speak
I enjoy swimming.|swimming|to swim|Swimming is enjoyable for me.|enjoy
He decided to leave.|to leave|leaving|He made a decision to leave.|decided
She hopes to win.|to win|winning|She hopes that she will win.|hopes`);
  add('questions', 'advanced', 'Câu hỏi và trật tự từ', 'Câu hỏi hiện tại đơn: Do/Does + chủ ngữ + nguyên mẫu; quá khứ đơn: Did + chủ ngữ + nguyên mẫu. Với be hoặc tình thái, đảo chính động từ đó. Câu hỏi gián tiếp dùng trật tự chủ ngữ–động từ.', 'Không đảo do/does trong phần câu hỏi gián tiếp. Câu hỏi chủ ngữ như Who called? không cần thêm did trong mẫu thông thường.', [['Where does Mai live?', 'Mai sống ở đâu?'], ['Can you tell me where Nam lives?', 'Bạn có thể nói cho tôi Nam sống ở đâu không?']], `
Where does Mai live?|does|do
When did they arrive?|arrive|arrived
Why are you late?|are|is
What does he want?|want|wants
Who called you yesterday?|called|did called
How many books do you have?|do|does
Can you tell me where Nam lives?|Nam lives|does Nam live
Do you know what she wants?|she wants|does she want
Where is your bag?|is|are
How often does she exercise?|exercise|exercises
Did he finish the task?|finish|finished
What are they doing now?|are|is
Can you tell me where Mai lives?|Mai lives|does Mai live|Where does Mai live? Begin with: Can you tell me...|where
Do you know when the shop opens?|the shop opens|does the shop open|When does the shop open? Begin with: Do you know...|when
Can you tell me what Nam wants?|Nam wants|does Nam want|What does Nam want? Begin with: Can you tell me...|what`);
  add('tense-contrast', 'advanced', 'Phân biệt các thì', 'Xét quan hệ thời gian: thói quen dùng hiện tại đơn; việc đang diễn ra dùng tiếp diễn; sự kiện đã kết thúc dùng quá khứ đơn; kết quả còn liên quan hiện tại có thể dùng hiện tại hoàn thành.', 'Không chọn thì chỉ vì một từ khóa. Đọc cả câu và kiểm tra việc đã kết thúc, đang diễn ra hay còn liên quan hiện tại.', [['I usually walk, but today I am taking the bus.', 'Tôi thường đi bộ, nhưng hôm nay tôi đang đi xe buýt.'], ['She was reading when the phone rang.', 'Cô ấy đang đọc khi điện thoại reo.']], `
I usually walk, but today I am taking the bus.|am taking|am take
She was reading when the phone rang.|was reading|were reading
We visited Hue last year and loved it.|visited|have visited
He has lost his key, so he cannot get in.|has lost|has lose
They play tennis every Sunday.|play|plays
Listen! The birds are singing.|are singing|is singing
I saw Mai yesterday, but I have not seen Nam yet.|have not seen|have not saw
He was cooking at seven last night.|was cooking|were cooking
She works here every Monday.|works|work
Look! Nam is crossing the road.|is crossing|is cross
We have lived here since 2020.|have lived|have live
They went home an hour ago.|went|have gone
She is not working now.|is not working|is not work|She isn't working now.|not
We did not go out yesterday.|did not go|did not went|We didn't go out yesterday.|not
He has not arrived yet.|has not arrived|has not arrive|He hasn't arrived yet.|not`);
  add('context-reading', 'advanced', 'Ngữ pháp trong ngữ cảnh', 'Đọc mạch ý trước khi chọn cấu trúc: xác định người thực hiện, thời gian và quan hệ nguyên nhân/kết quả. Kiểm tra lại cả đoạn sau khi điền.', 'Một câu riêng có thể cho nhiều cách hiểu. Các đoạn ngắn dưới đây bổ sung bối cảnh, nhưng vẫn yêu cầu giữ đúng nghĩa khi viết lại.', [['Mai has lost her bag. She cannot find it anywhere.', 'Mai đã làm mất túi. Cô ấy không tìm thấy nó ở đâu.'], ['It was raining. We stayed inside because of the rain.', 'Trời đang mưa. Chúng tôi ở trong nhà vì cơn mưa.']], `
Mai has lost her bag. She cannot find it anywhere.|has lost|has lose
It was raining. We stayed inside because of the rain.|because of|because
Nam is twelve. He goes to school by bike every day.|goes|go
I called Lan at eight. She was doing her homework then.|was doing|were doing
We bought a cake. The cake was delicious.|The|An
The road is wet. It has just rained.|has just rained|have just rained
My brother enjoys music. He practises singing every day.|singing|to sing
The room was dirty. It was cleaned by Mai yesterday.|was cleaned|was clean
The test is tomorrow. You should revise tonight.|revise|revises
Lan met a girl. The girl whose bag was red was Mai.|whose|who
It may rain tomorrow. If it rains, we will stay home.|rains|will rains
Nam spoke softly. His voice was quiet.|softly|soft
It was cold, but we went out.|but|despite|Although it was cold, we went out.|but
Lan did not come yesterday. She was ill.|did not come|did not came|Lan didn't come yesterday. She was ill.|not
The book was written by Mai. It is very popular.|was written|was wrote|Mai wrote the book. It is very popular.|by`);
  const api = { version: 1, groups, topics, levels: ['Nền tảng', 'Vận dụng', 'Thử thách'] };
  root.DanhGrammarCatalog = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
