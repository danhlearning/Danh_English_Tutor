const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),work=path.join(root,'artifacts/grade6-pencil');fs.mkdirSync(work,{recursive:true});
const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'grade/lop6/assets/js/units-data.js'),'utf8'),c);
const scenes={
1:[
'A Vietnamese middle-school student wearing a neat white short-sleeve school shirt and navy trousers, with a second matching uniform neatly on a hanger. Emphasize the school clothing; no school emblem or necktie text.',
'Two Vietnamese students age 12 sharing the same classroom desk, with school bags and blank notebooks, smiling together as classmates. They are equal peers, no adult teacher.',
'Three blank school books with distinct pictorial covers: a globe, simple geometric shapes and a paint palette, arranged beside a pencil to convey different school subjects. No letters, mathematical digits or text.',
'A classroom wall weekly timetable represented by a clean rectangular grid with five equal columns and four rows, each cell contains only a small pictogram of a school activity such as ball, book, palette or music note. No letters, numbers or words anywhere.',
'An outdoor school playground with a basketball hoop and play area, a couple of middle-school students playing safely. Clearly an open playground rather than a classroom.',
'A welcoming school library with tall bookshelves, a reading desk and one student choosing a book. All book spines and covers blank or plain pictorial designs.',
'A middle-school student at a home desk in the evening carefully writing in an open exercise book, school bag and pencil nearby, a simple supper bowl off to the side. Notebook pages have only indistinct faint lines, absolutely no legible text.',
'A single open lined school notebook with a plain colored cover beside a pencil, full notebook visible. Blank ruled pages, no handwriting.'
],
2:[
'A welcoming family living room with a blue sofa, wooden coffee table, television on a stand, rug and curtained window. Show a coherent whole-room scene; no people needed.',
'A small bright bedroom with one neatly made bed and pillow, bedside table, reading lamp, wardrobe and daylight window. Emphasize the bed and whole room.',
'A tidy home kitchen with counters, sink, cooker and fridge; an adult mum carefully stirring a pot at the stove. Safe clear hand holding the handle, no excess fingers, plain cookware.',
'A clean bathroom with washbasin and mirror, bathtub with shower, towel and small floor tiles. No kitchen items, no people.',
'A clearly elevated apartment balcony with visible protective railing, flowers in planters and a chair; see buildings and ground far below beyond the railing. Not a ground-level garden.',
'One freestanding wooden clothes wardrobe, one hinged door open to show hanging plain shirts and a shelf. Full cabinet including feet visible, isolated with generous paper margin.',
'One blue two-seat fabric sofa with two pillows, completely visible including legs and arms, isolated on light paper. No other furniture.',
'One white home refrigerator with the upper door open showing a plain milk bottle, vegetables and fruit on shelves, freezer compartment visible. Entire appliance visible; no logos or labels.'
],
3:[
'A friendly middle-school student warmly welcoming a new peer with an open-hand wave and kind smile at a classroom doorway. Clear welcoming gesture, no touching or extra hands.',
'A kind middle-school girl helping a younger child pick up dropped pencils and a blank book. Show the considerate helping action and grateful child, natural hands.',
'A clever middle-school boy successfully completing a challenging interlocking geometric puzzle, concentrating with a small satisfied smile. No equations, numbers, letters or lightbulb speech bubbles.',
'A funny student doing a harmless playful goofy face while two classmates laugh. Warm humor, no teasing, costumes, signs or speech bubbles.',
'A confident middle-school girl standing upright presenting to a small class, looking relaxed with a microphone and an open gesture. No writing on the board or speech bubbles.',
'A creative student inventing a colorful imaginative drawing on paper using colored pencils, with unique shapes and animals on the drawing, no words. Emphasize original artwork and proud thoughtful expression.',
'A single pair of round eyeglasses with clear lenses and unfolded arms, full object visible on light paper, no face, no logo.',
'Portrait of a cheerful middle-school girl with clearly defined natural curly dark hair and ringlets. Head and shoulders centered, focus on hair texture; no hair accessories hiding curls.'
],
4:[
'A calm residential neighbourhood in Vietnam: several homes along one small street with trees, a corner shop without signs and neighbours strolling. Wide coherent street view, no place names.',
'A lively open-air fruit and vegetable market with covered stalls and baskets of produce, seller and customer exchanging fruit. No price tags, labels, lettering or currency details.',
'A broad open public town square surrounded by civic buildings, a central fountain and people meeting on the open paved plaza. Must clearly be a town plaza, not a geometric square.',
'A small post office with a postal worker sorting blank envelopes at a counter, a red letter box with a simple envelope pictogram only, parcels without labels. No postal name, text or digits.',
'A railway station with a train stopped beside a raised passenger platform and travelers waiting safely behind a line. Visible rails and station canopy. No station signage, letters or numbers.',
'A traditional Vietnamese temple with curved tiled roof and a quiet courtyard with incense urn, framed by trees. Respectful architecture, no calligraphy, signs, statues with writing or logos.',
'A convenient bus stop just a few easy steps from a school gate, with a student walking a very short route toward the waiting bus. Compact adjacent locations and easy access are the focus, no signs or text.',
'A peaceful quiet residential lane in gentle morning light, leafy trees, a cat resting and one person reading near home. No traffic or crowds; convey calm and stillness.'
],
5:[
'A single dramatic high green mountain rising to a rocky summit, foothills and clouds, clear mountain silhouette in a Vietnamese landscape. Not an erupting volcano.',
'A small green island completely surrounded by blue sea, with sandy shoreline and a few palms. Clearly visible water all around the isolated land.',
'A tall waterfall descending from a rocky cliff into a pool, fine water spray and green foliage, clear vertical cascade.',
'An accessible cave entrance in a limestone hill, looking inside at natural stalactites and rock formations, soft light from entrance. No human-made tunnel or mining gear.',
'A wide dry desert with rolling golden sand dunes, sparse tiny dry shrubs and a strong sun. No sea or green forest.',
'A dense green forest with many tall tree trunks, layered canopy and a narrow natural trail. More than a single tree.',
'A winding freshwater river flowing between green banks through a small rural settlement with a simple bridge. Clearly one river channel, no sea.',
'A family traveling by train, seen through a cutaway train window with luggage beside seats and countryside passing outside. Clear travel journey, no tickets, destination words or logos.'
],
6:[
'A Vietnamese child receiving a red lucky-money envelope from a grandparent at Tet; a small stack of generic unmarked paper money partly visible at the envelope opening. Emphasize giving the red envelope, no writing or banknote numerals.',
'Colorful fireworks bursting high in the night sky above a distant city silhouette, safely viewed from far away. No text or numerals.',
'A flowering Vietnamese peach-blossom branch with clearly pink five-petaled blossoms and a small few green leaves in a simple vase. Pink flowers, not yellow apricot blossom.',
'A flowering Vietnamese yellow apricot-blossom branch with clearly bright yellow five-petaled flowers, brown twigs and tiny green leaves in a simple vase. Yellow flowers, not pink peach blossoms.',
'A Vietnamese family decorating their home for Tet, hanging plain red ornaments and placing a flower vase. No lettering on ornaments, no banners, no numbers.',
'Two related Vietnamese family households visiting grandparents for Tet, a child greeting an aunt and uncle beside cousins while grandparents welcome them. Warm extended-family context, no arrows identifying a parent.',
'A Vietnamese middle-school child respectfully offering a warm New Year greeting to smiling grandparents, hands together politely, pink blossom nearby and a small subtle heart-shaped sparkle. No speech bubble or written greeting.',
'A joyful Vietnamese family celebrating Tet together around a festive meal with spring flowers and plain red decorations, smiling and raising small cups of tea. No alcohol, writing or banners.'
],
7:[
'A television showing an educational quiz-style programme with a presenter and a simple pictorial activity, no text or score display. A viewer sits watching from a slight side angle. Emphasize a TV programme as a screen broadcast.',
'A television showing an obviously animated cheerful cartoon of a friendly rabbit and a bear in a drawn forest; a middle-school student watches. The cartoon characters should look distinct from real animals, no lettering.',
'A television news broadcast: an adult news presenter at a desk, with a simple unlabeled globe graphic behind them and a small camera nearby. Absolutely no headline, ticker, letters, numbers or channel logo.',
'A television nature documentary about whales: a realistic-under-the-cartoon-style blue whale swimming in the ocean on the screen, with an unobtrusive documentary camera beside the viewing setup. No title or text.',
'A television comedy programme showing two playful stage comedians with harmless funny poses; two viewers in front of the screen laugh warmly. No words, signs, captions or speech bubbles.',
'A student selecting a television channel using a remote, with the TV showing three small distinct pictorial preview tiles: sport, nature and cooking, one tile highlighted. No channel names, numbers or lettering.',
'A single handheld television remote control, with clearly arranged plain circular and geometric buttons without letters or numbers. Entire object visible, no logo.',
'Two middle-school television viewers seated facing a TV, shown from the side so their attentive faces and the television are both clear. Focus on the people watching, not the television content.'
],
8:[
'Two middle-school students playing association football with a classic black-and-white soccer ball on a grass pitch, one kicking toward a small net. No American football, numbered jerseys or text.',
'Two middle-school students playing badminton across a net with correct lightweight rackets and a clearly visible feathered shuttlecock. Natural sports anatomy, no tennis ball.',
'A small volleyball game, students safely hitting a white volleyball above a net with open hands, no rackets. Show enough court to make volleyball clear, unnumbered sportswear.',
'A middle-school student swimming freestyle safely in a clear blue swimming pool, arms and head correctly positioned at water surface with gentle splashes. No unsafe underwater scenario.',
'A teenage track athlete running fast on a running track in plain unnumbered sportswear, correct running posture and visible full body. No medal text or stadium numbers.',
'A school sports team of five middle-school teammates in matching plain jerseys forming a supportive huddle, joined hands at center kept anatomically clear. No numbers, letters or sponsor marks.',
'A friendly running competition with three young athletes starting on parallel track lanes, an official holding a small plain flag, a simple finish ribbon far ahead. No ranks, numerals or scoreboard.',
'A single badminton racket with oval stringed head and long handle, beside one feather shuttlecock for context. Complete racket fully visible with generous margin; no text or logo.'
],
9:[
'A lively Vietnamese city with several urban buildings of varied heights, a tree-lined avenue, small buses and pedestrians, clear dense city scale. No shop signs or writing.',
'An iconic tall stone tower standing prominently above surrounding lower city buildings, with visitors photographing the distinctive tower. Clearly one recognizable local landmark, no real brand or written place name.',
'A history museum interior with carefully displayed artifacts in glass cases, a dinosaur skeleton and visitors walking respectfully. No information plaques or labels.',
'A grand elegant royal palace with symmetrical wings, ornate roof, formal gardens and broad front steps, full building visible. Distinct from a modest house or temple, no signs.',
'A conceptual national capital city: an important national government building at the center of a large city, with one simple star-shaped map pin above that building on a small unlabeled country-map inset. No flags with writing or geographical labels. Make governmental center the focus.',
'A clean hand-drawn globe with recognizable world landmasses, the large connected Asia continental landmass highlighted in warm orange while other land is green and oceans are blue. Correct broad geography, no borders, arrows, letters or continent names.',
'A striking beautiful bridge that many travelers are photographing, a few small cameras aimed at the same bridge, showing that the bridge is widely famous. No camera brand, word, hashtag or sign.',
'A family visiting a scenic city attraction on foot, one adult holding a folded blank pictorial map and the child looking curiously at the landmark, small backpack. Clearly sightseeing, no labels or place names.'
],
10:[
'A hopeful imagined future home with a gentle futuristic curved house, roof garden, clean solar panels and a helpful small robot outside. A small subtle progression from a simple current house to the imagined home can be suggested with one curved arrow, no dates or text.',
'A friendly household robot carefully cleaning a kitchen floor with a small mop, recognizable robot limbs and a human-scale kitchen. Clear useful cleaning action, no display letters or logos.',
'A house using solar energy, blue roof-mounted solar panels clearly receiving warm sunlight and supplying a glowing indoor lamp, subtle short yellow rays from sun to panels. No diagrams with writing or electrical danger.',
'One household washing machine with circular front door and plain unmarked controls, a small basket of laundry beside it. Clearly a domestic appliance, full appliance visible.',
'A cutaway smart home where ceiling lights, curtains and climate controls connect to a central simple smartphone through small curved signal lines. No text or numeric screens. House rooms remain easy to understand, not an abstract circuit.',
'A wireless speaker playing music next to a smartphone, connected only by small curved radio-wave marks through the air, with absolutely no connecting cable. No logos, letters or text.',
'Outer space with Earth in the distance, stars, one small astronaut and a modest space station. Focus on the vast dark-blue starry space, no labels or writing.',
'A person walking into a room while a motion sensor automatically switches on the ceiling light, hands at their sides away from switches. Use a small dotted sensor beam or gentle rays, clear cause and effect without text.'
],
11:[
'A small clear recycling process scene: used plain plastic bottles being processed in a compact safe recycling machine and coming out as a new plain reusable plastic container. Use two simple curved arrows to make transformation clear; no words or labels.',
'A used glass jam jar repurposed as a pencil holder on a study desk, its old plain lid beside it. Clearly the same intact jar being reused, not melted or thrown away. No label, letters or writing.',
'A student replacing a pile of disposable plastic shopping bags with one sturdy cloth bag for groceries; the unused plastic bags are set aside and the cloth bag is in use. Clear reduction in disposable waste, no crossed-out text or digits.',
'A city under polluted gray air, distant factory chimney releasing smoke and a dirty river with a few visible discarded bottles. Clear pollution while maintaining soft educational cartoon style, no distress or alarming text.',
'A healthy natural environment with green trees, clean river, birds, soil and distant hills, framed as a coherent ecosystem rather than just a globe. No text or symbols obscuring the scene.',
'A small still life of three clearly plastic household objects: a translucent plastic bottle, a lightweight plastic bag and a plain plastic food container. Visible flexible shiny plastic material, not glass. No labels.',
'A single household rubbish bin with open hinged lid and a crumpled blank paper being placed inside by one hand. Full bin visible, no recycling word or letters.',
'A middle-school student switching off an unnecessary room light as they leave in daylight, window providing enough natural light. Hand correctly contacts wall switch, show energy saving, no text.'
],
12:[
'A friendly upright humanoid robot with clear mechanical joints, simple face and speaker grille, gesturing gently toward a middle-school student as if speaking. No speech bubbles, letters or screen words.',
'A small coherent study table scene with a tablet, laptop and a compact friendly robot, connected by subtle signal lines, representing modern technology. Screens show only simple pictograms, no logos or text.',
'A helpful household robot carrying a stack of blank books to a student whose hands are occupied, showing useful assistance. Correct grips and safe posture, no writing.',
'A robot doing household chores: folding a clean towel beside a laundry basket with a broom resting nearby, in a home interior. One clear main action, no extra robot arms.',
'A robot turning toward a familiar student who has just greeted it, with subtle sound-wave lines from the student to the robot microphone sensor and a small gentle glow in the robot face. Show recognising a voice, no captions or speech bubbles.',
'A small wheeled robot moving from one side of a room to the other, shown once with a light motion trail and one simple directional arrow along the floor. No duplicated robot body, letters or numbers.',
'A robot repairing a small broken desk fan with a screwdriver, with the unplugged cable safely visible and one small removed cover nearby. Tool correctly held and touching a screw, no sparks, labels or words.',
'A middle-school human student standing next to a friendly robot, with the human clearly emphasized in the foreground by warm color and the robot smaller behind. Natural human skin, hair, clothing and hands contrasted with mechanical robot joints; no arrows or labels.'
]};
const style='Style: charming hand-drawn flat 2D colored-pencil cartoon with clearly visible pencil grain, layered colored-pencil shading and soft warm graphite outlines on warm white paper, restrained cheerful pastel colors, matching the newest pencil vocabulary illustrations for this project. Suitable for ages 11–12, natural proportions, not babyish. One coherent scene, square composition, main subject clear at thumbnail size, light breathing room around the subject. No photorealism, no 3D, no vector-flat rendering.';
const avoid='Constraints: absolutely no letters, readable text, words, numbers, captions, Vietnamese meanings, definitions, labels, logos, watermarks, decorative border or speech bubbles. No collage or multiple cards. Correct anatomy, object construction, perspective and cause-and-effect. Do not add unrelated decoration. Create exactly one finished square image.';
const assets=[];
for(const u of c.window.DanhGrade6Units)for(const w of u.words){
 const slug=w.term.replace(/[^a-z0-9]+/g,'-');
 assets.push({key:`${u.id}/${w.id}`,unit:u.number,unitId:u.id,id:w.id,term:w.term,meaning:w.meaning,example:w.example,slug,
  file:`grade/lop6/assets/images/pencil/${u.id}/${slug}-v1.webp`,
  prompt:`Use case: illustration-story. Asset: one square vocabulary illustration for a Grade 6 English learning website. Subject: ${w.term}, meaning ${w.meaning}. Context for the illustrator only, do not put these words in the image: ${w.example}\nScene: ${scenes[u.number][w.id-1]}\n${style}\n${avoid}`});
}
const priority=[2,1,3,4,5,6,7,8,9,10,11,12];assets.sort((a,b)=>priority.indexOf(a.unit)-priority.indexOf(b.unit)||a.id-b.id);
fs.writeFileSync(path.join(work,'generation.json'),JSON.stringify({mode:'built-in image_gen',style:'2D colored-pencil; latest Grade 2 reference',assets},null,2));
console.log(`Prepared ${assets.length} image prompts across 12 Units`);
