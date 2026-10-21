const fs=require('node:fs'),path=require('node:path');
const base=require('./upper-secondary-content.cjs')[10];
const additions=[
[['do the laundry','giặt quần áo','I do the laundry on Sunday mornings.','🧺'],['family bond','sự gắn kết gia đình','Sharing meals strengthens our family bond.','💛']],
[['recycle','tái chế','We recycle clean paper at school.','♻️'],['green lifestyle','lối sống xanh','A green lifestyle includes using less plastic.','🌿']],
[['composer','nhà soạn nhạc','The composer writes music for the school play.','🎼'],['instrument','nhạc cụ','The flute is my favourite instrument.','🎻']],
[['shelter','nơi trú ngụ, mái ấm','The shelter offers a safe place to sleep.','🏠'],['raise funds','gây quỹ','We sell handmade cards to raise funds for the library.','🎁']],
[['robot','người máy','The robot sorts small objects by shape.','🤖'],['solar panel','tấm pin năng lượng mặt trời','A solar panel turns sunlight into electricity.','☀️']],
[['equal pay','trả lương bình đẳng','Workers doing the same job deserve equal pay.','⚖️'],['female firefighter','nữ lính cứu hỏa','The female firefighter checks her safety equipment.','👩‍🚒']],
[['humanitarian aid','viện trợ nhân đạo','Humanitarian aid includes food and clean water.','📦'],['international','mang tính quốc tế','Our international team learns from different cultures.','🌏']],
[['online lesson','bài học trực tuyến','I join an online lesson from my desk at home.','💻'],['discussion','cuộc thảo luận','Our discussion helps us compare different ideas.','💬']],
[['wildlife','động vật hoang dã','We watch wildlife from a safe distance.','🦜'],['reforestation','việc trồng lại rừng','Reforestation brings trees back to damaged land.','🌳']],
[['tour guide','hướng dẫn viên du lịch','The tour guide explains how to protect the forest.','🧭'],['souvenir','đồ lưu niệm','I buy a handmade souvenir from a local craftsperson.','🏺']]
];
const scenes=[
[
'A Vietnamese teenage boy sweeping a home floor with a broom, a small bucket nearby. Emphasize doing a household chore.',
'Two Vietnamese parents returning home from their jobs carrying a plain work bag and groceries, warmly greeted by their teenager; conveys earning a living for the family, no money symbols or writing.',
'A responsible Vietnamese teenager gently feeding the family cat at the same spot beside its bowl, parents smiling in the background.',
'A Vietnamese teenager gratefully giving their grandmother a handmade bouquet, warm thankful expressions and natural hands.',
'A Vietnamese family planting a small tree together, overlapping hands supporting the young tree, conveying strengthening bonds.',
'An older Vietnamese teenage sister patiently helping her younger brother understand a blank notebook exercise at a desk, kind supportive expressions.',
'A Vietnamese teenager loading plain clothes into a front loading washing machine, a laundry basket alongside.',
'A close warm Vietnamese family of four sharing a homemade meal around a round table, smiling and talking, clear family connection.'
],
[
'Two simple travel choices side by side in one cohesive scene: a small car releasing a grey puff, and a teenager cycling along a green path, with much cleaner air near the bicycle. No arrows, footprints, labels or text.',
'A Vietnamese teenager choosing a fabric shopping bag filled with fresh vegetables instead of disposable plastic; friendly green leafy surroundings.',
'A single sturdy reusable metal water bottle beside a folded reusable fabric bag, clean simple objects fully visible.',
'A Vietnamese teenager carefully turning off a dripping tap with a small water droplet still visible, focus on saving water.',
'A thriving organic vegetable garden with rich compost and natural ladybirds, a Vietnamese grower gently picking fresh lettuce; no chemical bottles or labels.',
'Several discarded plain cups and crumpled wrappers scattered on a park path, clearly litter in the wrong place; no writing on wrappers.',
'A teenager placing clean paper into a recycling bin beside a neat stack of old plain paper, the bin bears only a pictorial recycling symbol, no text.',
'A Vietnamese teenager cycling with a reusable bag and bottle past a leafy neighbourhood, calm clean sustainable everyday living.'
],
[
'A small seated theatre audience clapping warmly, view from the side of an unlabelled stage, emphasize the audience rather than a performer.',
'A Vietnamese teenage singer confidently performing on a small school stage with microphone and gentle stage lights, no writing or banners.',
'A music competition judge sitting at a plain judging desk wearing headphones, attentively listening to a distant singer. Blank papers, no scoring numbers.',
'A talented Vietnamese teenage guitarist skilfully playing an acoustic guitar, classmates listening with impressed expressions.',
'A musician presenting a new plain album sleeve with only an abstract pictorial design, a few plain records neatly arranged beside it; no text or letters.',
'Three teenage singers waiting at a small school music competition, one trophy with no inscriptions and a simple stage; no banners or numbers.',
'A Vietnamese composer thoughtfully working at a piano with a pencil in hand and plain blank music paper on its stand, no notation, symbols or text.',
'Three musical instruments arranged clearly: acoustic guitar, flute and small drum, all fully visible on light paper, no person or lettering.'
],
[
'A Vietnamese teenage volunteer reading a blank picture book to two younger children at a community centre, warm attentive expressions, pages contain only simple pictures.',
'Two Vietnamese teenagers donating a cardboard box of clean warm clothes to a shelter worker, all boxes and clothes unlabelled.',
'A friendly Vietnamese neighbourhood community with several neighbours of different ages tending a small shared garden together.',
'A teenager returning from volunteering with a new friend, both smiling with relaxed confident posture near a community garden; conveys a positive benefit of helping.',
'A generous Vietnamese neighbour sharing a large basket of fresh vegetables with an older neighbour, warm giving gesture.',
'A small charity meal service run by caring volunteers, a volunteer handing a full bowl of soup to an older person at a community table. No signage or labels.',
'A modest safe community shelter: inviting open door, clean bed, blanket and caring adult welcoming a family, no signs or text.',
'Vietnamese students running a small handmade craft stall to raise funds, one customer placing a plain coin into a clear donation jar, cards have only pictures, no writing or numbers.'
],
[
'One small digital room temperature sensor device with a completely blank display, fully visible beside a houseplant; no numbers, text or logo.',
'A young Vietnamese inventor proudly demonstrating a simple mechanical grabber that picks up a small object, clearly a useful new invention, blank workspace.',
'A compact portable charger next to a small closed travel pouch and plain mobile phone, emphasize easily carried size, blank screens and no labels.',
'A safe school science experiment: a Vietnamese teenager wearing goggles carefully observing water filtration through gravel and sand in a clear bottle, tidy table.',
'A working air filter with visible grey dust particles on one side and clean clear air on the other, no arrows or labels, simple natural visual comparison.',
'An unbranded tablet displaying only simple colourful pictorial app icons, no letters, numbers, keyboard labels or readable text.',
'A friendly small wheeled educational robot sorting coloured wooden blocks into matching shapes, no letters or numbers.',
'One solar panel in sunlight on a simple roof, connected by a visible wire to a glowing light bulb, clear solar energy concept, no symbols or text.'
],
[
'Vietnamese teenage boy and girl standing at the same height on equal balanced platforms, both holding school books, an evenly balanced simple scale nearby, no writing.',
'A Vietnamese school girl stepping through an open classroom door toward a science activity with other peers, an encouraging teacher welcoming her; conveys opportunity.',
'A Vietnamese teenage girl unfairly left outside a closed club doorway while two peers are admitted, she looks disappointed and another peer gestures for fairness; avoid written signs.',
'A qualified Vietnamese female engineer in helmet carefully checking a small bridge model with a ruler with no markings, professional confident pose.',
'A Vietnamese teacher warmly encouraging a shy teenage girl to join a science demonstration, supportive open hands and confident smile.',
'A Vietnamese child entering an open welcoming school gate with a blank book, boys and girls of diverse backgrounds all welcome; conveys the right to education.',
'A Vietnamese man and woman doing the same office work at neighbouring desks, receiving identical plain coin stacks from a manager; clearly equal pay, no writing or numbers.',
'A Vietnamese female firefighter in complete protective uniform and helmet checking a fire hose, calm professional scene, no fire or text.'
],
[
'Vietnamese and international teenagers cooperating to assemble a simple small model bridge at a shared table, equal teamwork, blank materials.',
'Two peacekeeping workers wearing plain blue helmets delivering a box of supplies near a peaceful village, respectful calm scene, no weapons or insignia or text.',
'A new community library being built with shelves and books, a caring adult placing a sapling alongside; conveys investment in education, no money icons or writing.',
'A group of teenagers from neighbouring Southeast Asian communities meeting around a plain map-shaped table, no flags, borders, labels or letters.',
'A committed Vietnamese teenager carefully watering the same small school tree in a garden, strong attentive care and focus, no calendars or text.',
'A growing Vietnamese community with a new school building, green young trees and a simple bridge, hopeful development scene without labels.',
'Humanitarian workers handing a plain relief box containing food, blankets and sealed clean water to a family, humane dignified setting, no brands or words.',
'An international group of teenage students from several cultures collaborating around a small globe, friendly equal peers, no flags, words or map labels.'
],
[
'A Vietnamese teenager learning with a laptop at home in one part of a cohesive illustration and discussing a book with a teacher in a classroom in the other, connected by flowing pencil line, no words.',
'An open unbranded laptop, tablet and stylus arranged neatly as digital learning tools, screens have only simple abstract shapes, no letters or numbers.',
'A Vietnamese teenager tapping a colourful puzzle on a tablet while pictorial puzzle pieces visibly respond, interactive learning, no interface text or digits.',
'A Vietnamese teenager opening a digital lesson represented by an open laptop with a small unlocked padlock pictogram beside it, screen contains only a book pictogram.',
'A focused Vietnamese teenager studying alone at a tidy home desk with an open blank notebook, pencil and reading lamp, clear independent self-study.',
'A useful collection of learning resources: plain books, globe, headphones and an open laptop with only a book pictogram, no text or labels.',
'A Vietnamese teenager at a home desk taking an online lesson, laptop screen shows only the portrait of a friendly teacher with simple geometric diagrams, no text or digits.',
'Four Vietnamese teenage students discussing ideas around a shared table with blank notebooks, natural attentive faces and gestures, no speech bubbles or words.'
],
[
'A rich natural forest ecosystem with diverse birds, butterflies, flowers, a frog and several plant species, clear biodiversity, no people or text.',
'A wetland habitat with ducks nesting safely among reeds beside a pond, show the animals living in their natural home.',
'A forest area with many freshly cut tree stumps and a few remaining tall trees, clear harmful deforestation, no people or machinery labels.',
'A vulnerable sea turtle swimming near a reef with a caring conservation worker observing from a distance, gentle protective mood, no warning signs or text.',
'A factory chimney releasing a cloud of grey smoke over an otherwise clean landscape, emphasize pollutant in the air, no skull symbols or labels.',
'Two Vietnamese teenagers carefully protecting a small forest sapling with a simple wooden guard, preservation action, no writing.',
'A wild bird, small deer and squirrel living naturally together in a green woodland, clear wildlife rather than pets, no cages.',
'Vietnamese teenagers replanting young native trees in a previously cleared patch with visible old stumps, hopeful reforestation, no text.'
],
[
'A small group of teenage visitors quietly following a local guide along a forest boardwalk, protecting the landscape, clearly low impact ecotourism.',
'A responsible teenage visitor picking up their own rubbish and putting it in a small reusable bag before leaving a nature trail.',
'A peaceful scenic destination with forested hills, a lake and a small eco lodge, a traveller with a backpack looking toward it, no maps or labels.',
'A Vietnamese traveller buying fresh fruit directly from a local farmer at a small countryside stand, no currency details or signs.',
'A narrow winding hiking trail through a green forest with stepping stones, entire path clearly visible, no arrows or signs.',
'One side of a stream healthy and clean, the other affected by discarded plastic and damaged plants, one coherent environmental impact comparison, no arrows, words or borders.',
'A friendly Vietnamese local tour guide with a backpack explaining a forest tree to three teenage visitors, natural guiding gesture, no microphone or written signs.',
'A small handmade clay cup and woven miniature basket offered as travel souvenirs at a local craft stall, objects fully visible, no letters or price labels.'
]
];
const units=base.split('\n\n').map((block,i)=>{const [head,...lines]=block.split('\n');const [title,vietnamese,icon]=head.split('|');const ruleAt=lines.findIndex(l=>l.startsWith('>'));return {id:`unit${i+1}`,number:i+1,title,vietnamese,icon,words:[...lines.slice(0,ruleAt).map(l=>l.split('|')),...additions[i]].map(([term,meaning,example,icon],j)=>({id:j+1,term,meaning,example,icon,scene:scenes[i][j]}))};});
const prefix='Use case: scientific-educational. Asset: ONE square vocabulary illustration for Vietnamese grade 10 English learning, hand drawn coloured pencil with visible fine pencil strokes and soft shading on warm ivory paper, charming and age appropriate high school style. Composition: a single clear cohesive scene, all key subjects fully visible, centred with generous paper margins. No text, letters, numbers, words, logos, labels, flags, watermark, speech bubbles or comic panels. Natural anatomy, simple clear meaning. Scene: ';
module.exports={units,prefix};
if(require.main===module){const root=path.resolve(__dirname,'..');const assets=units.flatMap(u=>u.words.map(w=>({key:`${u.id}-${w.id}`,unit:u.number,wordId:w.id,term:w.term,file:`grade/lop10/assets/images/pencil/${u.id}/${w.id}-v1.webp`,prompt:prefix+w.scene})));fs.mkdirSync(path.join(root,'artifacts/grade10-pencil'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts/grade10-pencil/generation.json'),JSON.stringify({mode:'built-in image_gen',assets},null,2));console.log(`${assets.length} tranh`);}
