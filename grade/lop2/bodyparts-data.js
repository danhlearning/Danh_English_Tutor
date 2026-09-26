// Dữ liệu chủ đề cơ thể. Mã từ ổn định dùng để chọn từ và liên kết bài tập.
// IPA Anh-Anh khi đọc từ riêng lẻ; forms không tự động là đáp án chính tả.
window.bodyPartsLesson = {
  "id": "bodyparts",
  "title": "Các bộ phận trên cơ thể",
  "speechLocale": "en-GB",
  "vocabulary": [
    {
      "name": "Head",
      "svg": "<svg role=\"img\" aria-label=\"Cái đầu\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <circle cx=\"50\" cy=\"55\" r=\"32\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <path d=\"M 20 45 Q 50 10 80 45 Q 78 28 50 25 Q 22 28 20 45 Z\" fill=\"#5D4037\" stroke=\"#3E2723\" stroke-width=\"2\"/>\n        <circle cx=\"38\" cy=\"55\" r=\"4\" fill=\"#3E2723\"/>\n        <circle cx=\"62\" cy=\"55\" r=\"4\" fill=\"#3E2723\"/>\n        <path d=\"M 38 72 Q 50 80 62 72\" stroke=\"#BF360C\" stroke-width=\"3\" fill=\"none\"/>\n        <ellipse cx=\"20\" cy=\"58\" rx=\"5\" ry=\"8\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <ellipse cx=\"80\" cy=\"58\" rx=\"5\" ry=\"8\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n      </svg>",
      "ipa": "/hed/",
      "meaning": "Cái đầu",
      "sentence": "This is my head.",
      "hex": "#FF7043",
      "id": "head",
      "singular": "head",
      "plural": "heads",
      "forms": [
        "head",
        "heads"
      ],
      "number": "singular",
      "imageDescription": "Cái đầu"
    },
    {
      "name": "Hair",
      "svg": "<svg role=\"img\" aria-label=\"Tóc\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <ellipse cx=\"50\" cy=\"65\" rx=\"30\" ry=\"28\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <path d=\"M 18 50 Q 25 15 50 15 Q 75 15 82 50 Q 70 30 50 30 Q 30 30 18 50 Z\" fill=\"#4E342E\" stroke=\"#3E2723\" stroke-width=\"2\"/>\n        <path d=\"M 25 35 Q 30 25 40 22\" stroke=\"#3E2723\" stroke-width=\"2\" fill=\"none\"/>\n        <path d=\"M 60 22 Q 70 25 75 35\" stroke=\"#3E2723\" stroke-width=\"2\" fill=\"none\"/>\n      </svg>",
      "ipa": "/heə/",
      "meaning": "Tóc",
      "sentence": "I have black hair.",
      "hex": "#6D4C41",
      "id": "hair",
      "singular": "hair",
      "plural": null,
      "forms": [
        "hair"
      ],
      "number": "uncountable",
      "imageDescription": "Tóc"
    },
    {
      "name": "Eyes",
      "svg": "<svg role=\"img\" aria-label=\"Đôi mắt\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <ellipse cx=\"30\" cy=\"50\" rx=\"18\" ry=\"12\" fill=\"#FFFFFF\" stroke=\"#37474F\" stroke-width=\"2.5\"/>\n        <ellipse cx=\"70\" cy=\"50\" rx=\"18\" ry=\"12\" fill=\"#FFFFFF\" stroke=\"#37474F\" stroke-width=\"2.5\"/>\n        <circle cx=\"30\" cy=\"50\" r=\"7\" fill=\"#5D4037\"/>\n        <circle cx=\"70\" cy=\"50\" r=\"7\" fill=\"#5D4037\"/>\n        <circle cx=\"32\" cy=\"47\" r=\"2\" fill=\"#FFFFFF\"/>\n        <circle cx=\"72\" cy=\"47\" r=\"2\" fill=\"#FFFFFF\"/>\n        <path d=\"M 14 42 Q 30 30 46 42\" stroke=\"#3E2723\" stroke-width=\"3\" fill=\"none\"/>\n        <path d=\"M 54 42 Q 70 30 86 42\" stroke=\"#3E2723\" stroke-width=\"3\" fill=\"none\"/>\n      </svg>",
      "ipa": "/aɪz/",
      "meaning": "Đôi mắt",
      "sentence": "My eyes are brown.",
      "hex": "#29B6F6",
      "id": "eyes",
      "singular": "eye",
      "plural": "eyes",
      "forms": [
        "eye",
        "eyes"
      ],
      "number": "plural",
      "imageDescription": "Đôi mắt"
    },
    {
      "name": "Ears",
      "svg": "<svg role=\"img\" aria-label=\"Đôi tai\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <path d=\"M 30 30 Q 10 40 15 62 Q 18 78 35 75 Q 45 72 40 55 Q 45 40 30 30 Z\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <path d=\"M 30 45 Q 22 52 26 62\" stroke=\"#BF360C\" stroke-width=\"2\" fill=\"none\"/>\n        <path d=\"M 70 30 Q 90 40 85 62 Q 82 78 65 75 Q 55 72 60 55 Q 55 40 70 30 Z\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <path d=\"M 70 45 Q 78 52 74 62\" stroke=\"#BF360C\" stroke-width=\"2\" fill=\"none\"/>\n      </svg>",
      "ipa": "/ɪəz/",
      "meaning": "Đôi tai",
      "sentence": "I listen with my ears.",
      "hex": "#FFA726",
      "id": "ears",
      "singular": "ear",
      "plural": "ears",
      "forms": [
        "ear",
        "ears"
      ],
      "number": "plural",
      "imageDescription": "Đôi tai"
    },
    {
      "name": "Nose",
      "svg": "<svg role=\"img\" aria-label=\"Mũi\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <path d=\"M 50 20 Q 40 55 32 65 Q 30 78 50 78 Q 70 78 68 65 Q 60 55 50 20 Z\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <ellipse cx=\"42\" cy=\"70\" rx=\"5\" ry=\"4\" fill=\"#BF360C\"/>\n        <ellipse cx=\"58\" cy=\"70\" rx=\"5\" ry=\"4\" fill=\"#BF360C\"/>\n      </svg>",
      "ipa": "/nəʊz/",
      "meaning": "Mũi",
      "sentence": "I smell with my nose.",
      "hex": "#EC407A",
      "id": "nose",
      "singular": "nose",
      "plural": "noses",
      "forms": [
        "nose",
        "noses"
      ],
      "number": "singular",
      "imageDescription": "Mũi"
    },
    {
      "name": "Mouth",
      "svg": "<svg role=\"img\" aria-label=\"Miệng\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <path d=\"M 15 50 Q 50 80 85 50 Q 50 65 15 50 Z\" fill=\"#D84315\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <path d=\"M 20 50 Q 50 60 80 50 L 80 45 Q 50 55 20 45 Z\" fill=\"#FFFFFF\"/>\n        <path d=\"M 15 50 Q 50 35 85 50\" stroke=\"#BF360C\" stroke-width=\"2.5\" fill=\"none\"/>\n      </svg>",
      "ipa": "/maʊθ/",
      "meaning": "Miệng",
      "sentence": "Open your mouth, please.",
      "hex": "#EF5350",
      "id": "mouth",
      "singular": "mouth",
      "plural": "mouths",
      "forms": [
        "mouth",
        "mouths"
      ],
      "number": "singular",
      "imageDescription": "Miệng"
    },
    {
      "name": "Teeth",
      "svg": "<svg role=\"img\" aria-label=\"Răng (số nhiều)\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <rect x=\"15\" y=\"35\" width=\"70\" height=\"35\" rx=\"10\" fill=\"#FFFFFF\" stroke=\"#B0BEC5\" stroke-width=\"2.5\"/>\n        <line x1=\"29\" y1=\"35\" x2=\"29\" y2=\"70\" stroke=\"#CFD8DC\" stroke-width=\"2\"/>\n        <line x1=\"43\" y1=\"35\" x2=\"43\" y2=\"70\" stroke=\"#CFD8DC\" stroke-width=\"2\"/>\n        <line x1=\"57\" y1=\"35\" x2=\"57\" y2=\"70\" stroke=\"#CFD8DC\" stroke-width=\"2\"/>\n        <line x1=\"71\" y1=\"35\" x2=\"71\" y2=\"70\" stroke=\"#CFD8DC\" stroke-width=\"2\"/>\n        <line x1=\"15\" y1=\"52\" x2=\"85\" y2=\"52\" stroke=\"#CFD8DC\" stroke-width=\"2\"/>\n      </svg>",
      "ipa": "/tiːθ/",
      "meaning": "Răng (số nhiều)",
      "sentence": "Brush your teeth every day.",
      "hex": "#26C6DA",
      "id": "teeth",
      "singular": "tooth",
      "plural": "teeth",
      "forms": [
        "tooth",
        "teeth"
      ],
      "number": "plural",
      "imageDescription": "Răng (số nhiều)"
    },
    {
      "name": "Neck",
      "svg": "<svg class=\"svg-icon\" viewBox=\"0 0 100 100\" role=\"img\" aria-label=\"Cổ được tô nổi bật giữa đầu và vai\"><title>Cổ được tô nổi bật giữa đầu và vai</title><ellipse cx=\"50\" cy=\"23\" rx=\"23\" ry=\"20\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/><path d=\"M38 41 L38 61 L62 61 L62 41\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"3\"/><path d=\"M38 61 Q14 65 12 94 L88 94 Q86 65 62 61 Z\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/></svg>",
      "ipa": "/nek/",
      "meaning": "Cổ",
      "sentence": "She has a long neck.",
      "hex": "#66BB6A",
      "id": "neck",
      "singular": "neck",
      "plural": "necks",
      "forms": [
        "neck",
        "necks"
      ],
      "number": "singular",
      "imageDescription": "Cổ được tô nổi bật giữa đầu và vai"
    },
    {
      "name": "Shoulder",
      "svg": "<svg class=\"svg-icon\" viewBox=\"0 0 100 100\" role=\"img\" aria-label=\"Một bên vai được tô nổi bật\"><title>Một bên vai được tô nổi bật</title><path d=\"M40 32 L40 46 L24 50 Q12 53 10 75 L10 94 L90 94 L90 75 Q88 53 76 50 L60 46 L60 32\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/><ellipse cx=\"50\" cy=\"20\" rx=\"16\" ry=\"18\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/><path d=\"M61 46 L76 50 Q86 53 88 67 L71 69 Q72 56 61 55 Z\" fill=\"#FFB74D\" stroke=\"#BF360C\" stroke-width=\"3\"/><path d=\"M88 29 L77 46 M78 38 L77 46 L85 43\" fill=\"none\" stroke=\"#BF360C\" stroke-width=\"3\"/></svg>",
      "ipa": "/ˈʃəʊl.də/",
      "meaning": "Vai",
      "sentence": "Put your hand on my shoulder.",
      "hex": "#AB47BC",
      "id": "shoulder",
      "singular": "shoulder",
      "plural": "shoulders",
      "forms": [
        "shoulder",
        "shoulders"
      ],
      "number": "singular",
      "imageDescription": "Một bên vai được tô nổi bật"
    },
    {
      "name": "Arm",
      "svg": "<svg role=\"img\" aria-label=\"Cánh tay\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <path d=\"M 30 15 Q 20 40 30 55 Q 25 70 35 85\" stroke=\"#FFCCBC\" stroke-width=\"22\" fill=\"none\" stroke-linecap=\"round\"/>\n        <path d=\"M 30 15 Q 20 40 30 55 Q 25 70 35 85\" stroke=\"#BF360C\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>\n        <circle cx=\"35\" cy=\"85\" r=\"12\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <circle cx=\"30\" cy=\"15\" r=\"10\" fill=\"#4FC3F7\" stroke=\"#0288D1\" stroke-width=\"2\"/>\n      </svg>",
      "ipa": "/ɑːm/",
      "meaning": "Cánh tay",
      "sentence": "I have two arms.",
      "hex": "#FFCA28",
      "id": "arm",
      "singular": "arm",
      "plural": "arms",
      "forms": [
        "arm",
        "arms"
      ],
      "number": "singular",
      "imageDescription": "Cánh tay"
    },
    {
      "name": "Hand",
      "svg": "<svg role=\"img\" aria-label=\"Bàn tay\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <rect x=\"35\" y=\"45\" width=\"30\" height=\"35\" rx=\"12\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <rect x=\"25\" y=\"15\" width=\"10\" height=\"35\" rx=\"5\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <rect x=\"38\" y=\"10\" width=\"10\" height=\"40\" rx=\"5\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <rect x=\"52\" y=\"12\" width=\"10\" height=\"38\" rx=\"5\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <rect x=\"65\" y=\"20\" width=\"10\" height=\"32\" rx=\"5\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n        <path d=\"M 35 60 Q 15 55 18 70 Q 20 82 35 78 Z\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n      </svg>",
      "ipa": "/hænd/",
      "meaning": "Bàn tay",
      "sentence": "Wash your hands before eating.",
      "hex": "#42A5F5",
      "id": "hand",
      "singular": "hand",
      "plural": "hands",
      "forms": [
        "hand",
        "hands"
      ],
      "number": "singular",
      "imageDescription": "Bàn tay"
    },
    {
      "name": "Finger",
      "svg": "<svg role=\"img\" aria-label=\"Ngón tay\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <rect x=\"38\" y=\"20\" width=\"24\" height=\"60\" rx=\"12\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <path d=\"M 40 30 Q 50 24 60 30\" stroke=\"#BF360C\" stroke-width=\"1.5\" fill=\"none\"/>\n        <ellipse cx=\"50\" cy=\"26\" rx=\"9\" ry=\"7\" fill=\"#FFF3E0\" stroke=\"#BF360C\" stroke-width=\"2\"/>\n      </svg>",
      "ipa": "/ˈfɪŋ.ɡə/",
      "meaning": "Ngón tay",
      "sentence": "I have ten fingers.",
      "hex": "#FF8A65",
      "id": "finger",
      "singular": "finger",
      "plural": "fingers",
      "forms": [
        "finger",
        "fingers"
      ],
      "number": "singular",
      "imageDescription": "Ngón tay"
    },
    {
      "name": "Leg",
      "svg": "<svg class=\"svg-icon\" viewBox=\"0 0 100 100\" role=\"img\" aria-label=\"Một chân được tô nổi bật; bàn chân làm nền nhạt\"><title>Một chân được tô nổi bật; bàn chân làm nền nhạt</title><path d=\"M36 9 L64 9 L59 46 L58 83 L39 83 L40 47 Z\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/><path d=\"M39 83 L58 83 L76 88 Q84 96 71 96 L38 96 Z\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/><path d=\"M26 12 L22 12 L22 80 L26 80\" fill=\"none\" stroke=\"#BF360C\" stroke-width=\"2.5\"/></svg>",
      "ipa": "/leɡ/",
      "meaning": "Chân",
      "sentence": "My legs are strong.",
      "hex": "#8D6E63",
      "id": "leg",
      "singular": "leg",
      "plural": "legs",
      "forms": [
        "leg",
        "legs"
      ],
      "number": "singular",
      "imageDescription": "Một chân được tô nổi bật; bàn chân làm nền nhạt"
    },
    {
      "name": "Knee",
      "svg": "<svg class=\"svg-icon\" viewBox=\"0 0 100 100\" role=\"img\" aria-label=\"Đầu gối được tô nổi bật ở giữa chân\"><title>Đầu gối được tô nổi bật ở giữa chân</title><path d=\"M37 7 L63 7 L59 42 L61 58 L58 93 L39 93 L41 58 L40 42 Z\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/><circle cx=\"50\" cy=\"50\" r=\"12\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"3\"/></svg>",
      "ipa": "/niː/",
      "meaning": "Đầu gối",
      "sentence": "My knee hurts.",
      "hex": "#5C6BC0",
      "id": "knee",
      "singular": "knee",
      "plural": "knees",
      "forms": [
        "knee",
        "knees"
      ],
      "number": "singular",
      "imageDescription": "Đầu gối được tô nổi bật ở giữa chân"
    },
    {
      "name": "Foot",
      "svg": "<svg role=\"img\" aria-label=\"Bàn chân\" class=\"svg-icon\" viewBox=\"0 0 100 100\">\n        <path d=\"M 20 60 Q 15 40 30 35 Q 45 30 50 45 L 85 55 Q 92 60 88 68 Q 82 75 60 72 L 25 72 Q 15 70 20 60 Z\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/>\n        <circle cx=\"55\" cy=\"47\" r=\"4\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"1.5\"/>\n        <circle cx=\"63\" cy=\"45\" r=\"4\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"1.5\"/>\n        <circle cx=\"71\" cy=\"45\" r=\"4\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"1.5\"/>\n        <circle cx=\"79\" cy=\"47\" r=\"4\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"1.5\"/>\n      </svg>",
      "ipa": "/fʊt/",
      "meaning": "Bàn chân",
      "sentence": "I have two feet.",
      "hex": "#26A69A",
      "id": "foot",
      "singular": "foot",
      "plural": "feet",
      "forms": [
        "foot",
        "feet"
      ],
      "number": "singular",
      "imageDescription": "Bàn chân"
    },
    {
      "name": "Tummy",
      "svg": "<svg class=\"svg-icon\" viewBox=\"0 0 100 100\" role=\"img\" aria-label=\"Bụng được tô nổi bật trên thân người\"><title>Bụng được tô nổi bật trên thân người</title><path d=\"M35 8 L65 8 L68 19 L84 26 L76 48 L68 43 L71 92 L29 92 L32 43 L24 48 L16 26 L32 19 Z\" fill=\"#ECEFF1\" stroke=\"#90A4AE\" stroke-width=\"2\"/><ellipse cx=\"50\" cy=\"64\" rx=\"19\" ry=\"23\" fill=\"#FFCCBC\" stroke=\"#BF360C\" stroke-width=\"2.5\"/><path d=\"M47 65 Q50 69 53 65\" fill=\"none\" stroke=\"#BF360C\" stroke-width=\"2.5\"/></svg>",
      "ipa": "/ˈtʌm.i/",
      "meaning": "Bụng",
      "sentence": "My tummy hurts a little.",
      "hex": "#F06292",
      "id": "tummy",
      "singular": "tummy",
      "plural": "tummies",
      "forms": [
        "tummy",
        "tummies"
      ],
      "number": "singular",
      "imageDescription": "Bụng được tô nổi bật trên thân người"
    }
  ],
  "questions": [
    {
      "vietnamese": "Đây là đầu của tôi.",
      "hint": "Đây là + đầu của tôi",
      "answer": "This is my head",
      "id": "body-head",
      "imageWordId": "head",
      "targetWordIds": [
        "head"
      ],
      "acceptedAnswers": [
        "This is my head"
      ]
    },
    {
      "vietnamese": "Tôi có mái tóc màu đen.",
      "hint": "Tôi + có + mái tóc + màu đen",
      "answer": "I have black hair",
      "id": "body-hair",
      "imageWordId": "hair",
      "targetWordIds": [
        "hair"
      ],
      "acceptedAnswers": [
        "I have black hair"
      ]
    },
    {
      "vietnamese": "Mắt của tôi màu nâu.",
      "hint": "Mắt của tôi + thì + màu nâu",
      "answer": "My eyes are brown",
      "id": "body-eyes",
      "imageWordId": "eyes",
      "targetWordIds": [
        "eyes"
      ],
      "acceptedAnswers": [
        "My eyes are brown"
      ]
    },
    {
      "vietnamese": "Tôi nghe bằng đôi tai của mình.",
      "hint": "Tôi + nghe + bằng + đôi tai",
      "answer": "I listen with my ears",
      "id": "body-ears",
      "imageWordId": "ears",
      "targetWordIds": [
        "ears"
      ],
      "acceptedAnswers": [
        "I listen with my ears"
      ]
    },
    {
      "vietnamese": "Tôi ngửi bằng mũi của mình.",
      "hint": "Tôi + ngửi + bằng + cái mũi",
      "answer": "I smell with my nose",
      "id": "body-nose",
      "imageWordId": "nose",
      "targetWordIds": [
        "nose"
      ],
      "acceptedAnswers": [
        "I smell with my nose"
      ]
    },
    {
      "vietnamese": "Hãy mở miệng ra nào.",
      "hint": "Mở + miệng của bạn + lời đề nghị lịch sự",
      "answer": "Open your mouth please",
      "id": "body-mouth",
      "imageWordId": "mouth",
      "targetWordIds": [
        "mouth"
      ],
      "acceptedAnswers": [
        "Open your mouth please",
        "Please open your mouth"
      ]
    },
    {
      "vietnamese": "Hãy đánh răng mỗi ngày.",
      "hint": "Đánh + răng + mỗi ngày",
      "answer": "Brush your teeth every day",
      "id": "body-teeth",
      "imageWordId": "teeth",
      "targetWordIds": [
        "teeth"
      ],
      "acceptedAnswers": [
        "Brush your teeth every day"
      ]
    },
    {
      "vietnamese": "Cô ấy có chiếc cổ dài.",
      "hint": "Cô ấy + có + một chiếc cổ dài",
      "answer": "She has a long neck",
      "id": "body-neck",
      "imageWordId": "neck",
      "targetWordIds": [
        "neck"
      ],
      "acceptedAnswers": [
        "She has a long neck"
      ]
    },
    {
      "vietnamese": "Đặt tay bạn lên vai tôi.",
      "hint": "Đặt + tay bạn + lên + vai tôi",
      "answer": "Put your hand on my shoulder",
      "id": "body-shoulder",
      "imageWordId": "shoulder",
      "targetWordIds": [
        "hand",
        "shoulder"
      ],
      "acceptedAnswers": [
        "Put your hand on my shoulder"
      ]
    },
    {
      "vietnamese": "Tôi có hai cánh tay.",
      "hint": "Tôi + có + hai + cánh tay",
      "answer": "I have two arms",
      "id": "body-arm",
      "imageWordId": "arm",
      "targetWordIds": [
        "arm"
      ],
      "acceptedAnswers": [
        "I have two arms"
      ]
    },
    {
      "vietnamese": "Hãy rửa tay trước khi ăn.",
      "hint": "Rửa + tay của bạn + trước khi ăn",
      "answer": "Wash your hands before eating",
      "id": "body-hand",
      "imageWordId": "hand",
      "targetWordIds": [
        "hand"
      ],
      "acceptedAnswers": [
        "Wash your hands before eating"
      ]
    },
    {
      "vietnamese": "Tôi có mười ngón tay.",
      "hint": "Tôi + có + mười + ngón tay",
      "answer": "I have ten fingers",
      "id": "body-finger",
      "imageWordId": "finger",
      "targetWordIds": [
        "finger"
      ],
      "acceptedAnswers": [
        "I have ten fingers"
      ]
    },
    {
      "vietnamese": "Đôi chân của tôi khỏe.",
      "hint": "Đôi chân của tôi + thì + khỏe",
      "answer": "My legs are strong",
      "id": "body-leg",
      "imageWordId": "leg",
      "targetWordIds": [
        "leg"
      ],
      "acceptedAnswers": [
        "My legs are strong"
      ]
    },
    {
      "vietnamese": "Đầu gối của tôi bị đau.",
      "hint": "Đầu gối của tôi + bị đau",
      "answer": "My knee hurts",
      "id": "body-knee",
      "imageWordId": "knee",
      "targetWordIds": [
        "knee"
      ],
      "acceptedAnswers": [
        "My knee hurts"
      ]
    },
    {
      "vietnamese": "Tôi có hai bàn chân.",
      "hint": "Tôi + có + hai + bàn chân",
      "answer": "I have two feet",
      "id": "body-foot",
      "imageWordId": "foot",
      "targetWordIds": [
        "foot"
      ],
      "acceptedAnswers": [
        "I have two feet"
      ]
    },
    {
      "vietnamese": "Bụng của tôi hơi đau.",
      "hint": "Bụng của tôi + đau + một chút",
      "answer": "My tummy hurts a little",
      "id": "body-tummy",
      "imageWordId": "tummy",
      "targetWordIds": [
        "tummy"
      ],
      "acceptedAnswers": [
        "My tummy hurts a little"
      ]
    }
  ]
};
