/* Lập kế hoạch ảnh, giữ nguyên ID từ và dữ liệu học. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),ctx={window:{}},read=p=>fs.readFileSync(path.join(root,p),'utf8');
for(const f of ['grade/lop4/assets/js/grade2-course.js','grade/lop2/assets/js/pencil-images-data.js'])vm.runInNewContext(read(f),ctx);
const styles='ONE square vocabulary illustration for an English learning game, grade 4. Charming hand-drawn flat 2D colored-pencil picture-book art: visible pencil grain, soft graphite outlines, friendly child proportions, muted cheerful pastel colors, warm ivory paper background. Clear main subject, simple coherent scene, generous margins, readable at thumbnail size. NO letters, words, captions, speech bubbles, logos, watermarks, borders, photos, glossy 3D or digital-vector look. Natural anatomy and real-world logic. ';
const scenes={
 america:'The Statue of Liberty on a simple pedestal: raised torch in her right hand, blank tablet in her left arm, seven-rayed crown. No writing.',
 australia:'A friendly kangaroo with two hind legs, two forearms and a long tail, with Sydney Opera House in the background. No flags.',
 britain:'Big Ben in London and a red double-decker bus; use plain dot marks on clock, no digits or letters. All bus surfaces blank.',
 japan:'One Japanese flag: pure white cloth, exactly one central red circle, beside a small cherry blossom branch.',
 malaysia:'The recognizable Petronas Twin Towers of Kuala Lumpur: two matching silver towers with pointed spires and the skybridge correctly joining them. Simple tropical greenery, no signage.',
 'viet-nam':'One Vietnamese national flag: a red rectangular cloth with exactly one centered yellow five-pointed star. Small lotus flower beside the flagpole, no other flags.',
 'get-up':'A child sitting upright on the edge of their bed just after waking, stretching both arms, feet near slippers, morning sunlight. Eyes open, duvet behind, clearly getting up rather than going to sleep.',
 'have-breakfast':'A child eating breakfast at a kitchen table with a bowl of cereal, milk and banana, sunrise through a small window. Fork or spoon held naturally, no words on packaging.',
 'go-to-school':'Two primary-school children wearing backpacks walk along a safe pavement toward an inviting school entrance, early morning. No traffic, no writing on the school.',
 'have-lunch':'A child eating a rice-and-vegetable lunch at a school canteen table, bright midday sun through the window. Tray and spoon clearly visible, no labels.',
 'have-dinner':'A family of four seated around a dining table eating rice and vegetables in the evening. Dark night sky with crescent moon outside the window, warm lamp. Natural table and arm positions.',
 'go-to-bed':'A sleepy child in pyjamas climbing into bed and pulling up a blanket, moon outside a small window, slippers on the floor. Clearly bedtime, no clock digits.',
 'study-at-school':'A primary-school child learning at a desk in a classroom with a teacher and two classmates softly behind. Open exercise book contains only simple geometric shapes, no letters or numbers. Focus on studying.',
 'listen-to-music':'A smiling child wearing over-ear headphones and listening to music, gently tapping a foot, eyes content. A small music player with a plain screen; no notation or text.',
 'do-housework':'A child carefully sweeping crumbs from a room floor with a broom and dustpan, ordinary tidy home. Broom bristles touch floor, hands hold handle naturally.',
 'watch-tv':'Two children seated on a sofa looking toward a television showing a simple animal cartoon, TV clearly facing the children. Side view shows their faces and screen. No remote labels or lettering.',
 'play-football':'A child in simple sports clothes kicking a black-and-white football toward a small goal on a green playing field. Foot contacts ball naturally, two legs, no jersey numbers.',
 jam:'A small open glass jar of strawberry jam beside one strawberry and a slice of bread with jam, spoon rests on a saucer. Jar has no label.',
 chips:'A small plate of golden thick-cut fried potato chips, a little plain ketchup dish beside it. Appetizing clearly potato fries, not crisps in a packet.',
 grapes:'One fresh bunch of purple grapes with a short natural stem and one green vine leaf, clearly many connected grapes rather than a single grape. Centered on warm white paper.',
 lemonade:'A transparent glass of pale yellow lemonade with lemon slices, a lemon half and a simple paper straw. No face on glass, no lettering. Clearly lemonade rather than orange juice.',
 'play-the-piano':'A child sitting at a piano playing with both hands naturally resting on the black-and-white keyboard, feet below stool. Piano has a closed plain music stand with no sheet music or lettering.',
 classroom:'A welcoming primary classroom with orderly desks, chairs and a teacher desk, blank green chalkboard, light through windows. Clear whole-room view, no writing on anything.',
 library:'A welcoming library room with low bookshelves, a child reading at a small table, books have plain colored covers and no writing. Clearly a library, not a classroom.',
 playground:'A safe school playground with slide, swings and a child playing, green lawn and soft ground under play equipment. Correct swing ropes, no lettering.',
 'computer-room':'A school computer room with three desks and monitors, two children sitting at computers. Screens show only simple colored geometric shapes. Neat cables, no text or numbers.',
 'music-room':'A school music room with a piano, a guitar in a stand, drum and a child practising with a teacher. No musical notation, labels or sheet music.',
 gym:'A school indoor gymnasium with a wooden court, basketball hoop and wall bars, children doing a gentle warm-up. No heavy weightlifting or numbers on court.',
 maths:'A child learning maths using a colorful abacus and small counting blocks at a desk. Open notebook has only simple dots and shapes. No numbers, letters or mathematical symbols.',
 english:'An English lesson shown with two children practising conversation and a friendly teacher, plus a small recognizable UK flag with accurate Union Jack colors on a desk, blank books. No letters, words or speech bubbles. The flag acts as a language cue.',
 music:'A child learning music with a teacher while playing a small xylophone. A guitar rests behind them. No written notes, letters or notation.',
 art:'A child painting a colorful flower on a small easel with brush and palette in an art lesson. Brush touches paper naturally, paint spots realistic, no letters.',
 science:'A child safely observing a leaf through a magnifying glass beside a simple microscope in a science class, teacher nearby. No chemicals, flames or text.',
 pe:'Three children in sports clothes following a teacher in gentle stretching exercises on a school field. Clearly a physical education lesson. No numbers on clothing.',
 badminton:'Two children playing badminton across a low net, each with one racket, one white shuttlecock above the net. Racket strings and court positions physically coherent.',
 basketball:'A child bouncing an orange basketball near a basketball hoop on an outdoor court. One hand reaches toward the ball, ball close to ground, no jersey numbers.',
 'table-tennis':'Two children playing table tennis at opposite short ends of a blue rectangular table, each with one paddle, single small white ball and net correctly across the center. No giant ball.',
 beach:'A peaceful sandy beach with gentle sea waves, a bucket and spade, seashells and a small beach umbrella. Beach clearly meets water; no text.',
 mountains:'A clear view of a range of green and rocky mountain peaks with a walking path and a small stream, distant pale blue sky. Focus on mountains, no buildings.',
 island:'A small green island entirely surrounded by blue sea, a few palm trees and a sandy shore. Entire island visible with water on all sides, no mainland connection.',
 museum:'A child and parent visiting a museum gallery with a dinosaur skeleton model and a ceramic vase inside a glass display. No captions, signs or lettering anywhere.',
 camping:'Two children enjoying a safe campsite with a pitched tent, sleeping rolls and a small lantern, forest background. No campfire or dangerous tools. Focus on camping as a holiday activity.',
 sightseeing:'A family walking with a camera and admiring a historic building and garden while sightseeing. Show people actively looking at the landmark, no maps with text or signs.',
 garden:'A small lovely home garden with flowers, vegetable plants, a watering can and a winding path. Whole garden visible, not a single potted plant.',
 balcony:'A clearly recognizable exterior apartment balcony attached to the upper floor of a home, with secure railing, sliding glass door behind, two pots of flowers and a chair. Clearly elevated above garden, no people near edge.',
 teacher:'A friendly primary-school teacher holding a blank book and guiding a child at a desk beside a blank green chalkboard. Clearly teaching, no letters or numbers.',
 doctor:'A friendly doctor in a white coat with a stethoscope examining a teddy bear for a child patient in a small clinic. Correct stethoscope position, no logos, writing or medicine labels.',
 farmer:'A friendly farmer in a straw hat holding a basket of fresh vegetables in a farm field, a cow at a sensible distance behind. Correct tool-free anatomy, no labels.',
 firefighter:'A friendly firefighter in protective helmet, coat, boots and gloves holding a rolled hose near a small red fire engine. No fire or smoke. No badge text, truck lettering or numbers.',
 chef:'A smiling chef wearing a white toque and apron, stirring a pot of vegetable soup with a wooden spoon in a kitchen. No knife, flame, labels or text.',
 pilot:'A friendly airline pilot in a plain uniform and cap standing beside a passenger aircraft at an airport. Clearly an airline pilot, no military insignia, logos, airline names or lettering.',
 'curly-hair':'Portrait of a smiling child with clearly defined dark curly hair made of soft spirals. Head and shoulders only, simple plain shirt and ivory background; hair texture is the focus.',
 'straight-hair':'Portrait of a smiling child with long straight dark hair falling smoothly without waves. Head and shoulders only, plain shirt, hair shape clear.',
 glasses:'A pair of round eyeglasses with two clear lenses and two correctly connected temple arms, gently resting on a plain surface, no face, no words.',
 'blond-hair':'Portrait of a smiling child with clearly blond golden hair, head and shoulders, plain shirt, warm white background. Hair is distinctly yellow-gold, no hat.',
 beard:'Portrait of a friendly adult man with a neat full beard following his jaw and chin, clearly connected sideburns and moustache. No child, no shaving tools or hats. Beard is the focus.',
 freckles:'Close-up portrait of a friendly child with natural small freckles clearly scattered over both cheeks and nose, normal skin otherwise. No stars, dots floating in air or face paint.',
 'brush-my-teeth':'A child brushing their teeth at a bathroom sink with a toothbrush held naturally at their mouth, other hand holding a small cup. Small amount of toothpaste foam, no extra hands, no text.',
 'wash-my-face':'A child gently washing their face with water cupped in both hands at a bathroom sink. Water drops, tap over basin, hands touch cheeks naturally, no toothbrush or lettering.',
 'do-homework':'A child doing homework at a desk at home, school bag beside chair and an adult quietly helping. Notebook contains only simple geometric sketches, no readable text or numbers.',
 'take-a-shower':'A bathroom shower cubicle with a completely closed opaque blue shower curtain from ceiling rail down to shower tray; a shower head above the curtain visibly sprays water into the hidden cubicle. Slippers and a folded towel outside. No person or body visible. Clear physical construction.',
 'visit-grandparents':'Two children arriving at their grandparents home, smiling grandmother and grandfather welcoming them at an open doorway with open arms. Children wear small backpacks, clear visiting action.',
 'go-shopping':'A parent and child buying fruit and vegetables in a small shop, carrying a reusable shopping bag, cashier counter visible. All signs, receipts and packaging blank.',
 'have-a-picnic':'A family seated on a picnic blanket in a grassy park with a picnic basket, sandwiches and fruit. Correct picnic scene outdoors, no labels.',
 'watch-a-film':'Two children and an adult seated in a small cinema watching an animal adventure film on a large screen; side view includes seats and screen. No film titles or lettering.',
 'cook-dinner':'A parent and child preparing an evening vegetable meal together at a kitchen counter, parent stirs a cooking pot, child puts washed vegetables in a bowl. Moon visible outside, no dangerous knife handling.',
 'play-games':'Three children playing a simple colorful board game with counters and a plain blank spinner at a table. No numbers or letters on board or pieces, clear friendly turn-taking.',
 hospital:'A welcoming hospital building with a simple red cross symbol and an ambulance parked outside. No lettering, numbers, signage or trademarks. Full building visible, entrance clear.',
 'post-office':'A small welcoming post office building with a clear envelope pictogram above the entrance and a red mailbox beside the door. No words, numbers, letters or country-specific logos.',
 cinema:'A small cinema entrance with a large movie-camera pictogram and a plain film-reel decoration, inviting doors and a poster showing only an animal scene. No lettering, titles or logos.',
 park:'A pleasant public park with trees, a winding path, bench, flower beds and children strolling. Wide whole-place view, no gates with writing.',
 supermarket:'A supermarket interior with neat grocery aisles, produce section and a child beside a parent pushing a shopping trolley. Blank labels and packaging, no text, brands or numbers.',
 'bus-stop':'A sheltered bus stop with a bench and a plain bus pictogram on a pole, a child waiting safely with a parent, bus approaching on road. No timetable text, route numbers or lettering.',
 bag:'One clearly recognizable small handbag with two handles and a zipper, lavender and tan fabric, resting upright on ivory paper. Not a backpack, no logos or writing.',
 watch:'One simple wristwatch with a clear round face, plain dot hour markers, two clock hands and a continuous buckled strap. No numbers, letters or brand marks. Not the action of watching.',
 elephant:'One friendly elephant, full body, four legs, one trunk, two large ears, small tail; anatomically coherent, warm gray pencil shading and gentle expression.',
 giraffe:'One friendly giraffe, full body, long neck, four long legs, two small ossicones, natural patches and tail, no extra legs.',
 dolphin:'One friendly dolphin leaping slightly above a small blue ocean wave. Natural dolphin anatomy with snout, dorsal fin, paired pectoral fins, horizontal tail flukes, no legs or fish gills.',
 parrot:'One colorful red, yellow and blue parrot perched naturally on a branch, two feet gripping branch, curved beak, two folded wings and one long tail. No words.',
 turtle:'One friendly turtle walking on ground, full body, domed green-brown shell, four short legs, small head and tail. Coherent shell and limbs.',
 butterfly:'One butterfly resting with wings open on a small flower, exactly four wings in two symmetric pairs, two antennae and six small legs, colorful natural wing patterns.',
 'make-a-kite':'Two children making a diamond-shaped paper kite on a craft table: one glues colored paper onto a visible crossed-stick frame while the other attaches the string and ribbon tail. Safe scissors lying closed; no letters.',
 'pitch-a-tent':'Two children and an adult actively setting up a small tent at a grassy campsite: the tent is partly raised with visible poles being inserted, one adult secures a guyline. Clearly in-progress tent building, no mallet or sharp tools.',
 'tell-stories':'A child animatedly telling a story to two attentive friends seated in a semicircle around a lantern at camp; storyteller uses a gentle hand gesture, listeners look at storyteller. No book text, speech bubbles or fantasy thought bubbles.',
 'take-photos':'A child holding a small camera with both hands at eye level and photographing a butterfly on a flower. Camera points toward butterfly, correct hand grip, no logos or screen text.'
};
const aliases={'running':'run','swimming':'swim','sing songs':'sing','ride a bike':'ride'};
const sharedNew={'football':'play-football'};
const available=new Map();for(const [topic,words]of Object.entries(ctx.window.DanhGrade2PencilManifest))for(const [name,file]of Object.entries(words))available.set(name,{file:`grade/lop2/assets/images/pencil/${file}`,topic});
const all=ctx.window.DanhPrimaryGrade2Course.units.flatMap(u=>u.words.map(w=>({unit:u.id,id:w.id,name:w.name,meaning:w.meaning})));
const unique=[...new Map(all.map(w=>[w.name.toLowerCase(),w])).values()];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const assets=unique.map(w=>{
 const key=w.name.toLowerCase(),alias=aliases[key]||key,reuse=key==='watch'?null:available.get(alias),id=sharedNew[key]||slug(key);
 if(reuse)return {...w,key,id,source:'reused',file:reuse.file};
 if(!scenes[id])throw Error('Missing image specification: '+id);
 return {...w,key,id,source:'generated',file:`grade/lop4/assets/images/pencil/${id}-v1.webp`,prompt:styles+'Subject and scene: '+scenes[id]};
});
const dir=path.join(root,'artifacts/grade4-pencil');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'plan.json'),JSON.stringify({style:styles,wordCount:all.length,assets},null,2));
console.log(JSON.stringify({words:all.length,unique:assets.length,reuse:assets.filter(a=>a.source==='reused').length,generate:new Set(assets.filter(a=>a.source==='generated').map(a=>a.id)).size}));
