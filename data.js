// ===== EDIT ME: languages, picture cards and quick phrases =====

// Languages for the speech menu: [code, display name]
var L=[["en-US","English"],["es-ES","Spanish"],["fr-FR","French"],["de-DE","German"],["it-IT","Italian"],["pt-BR","Portuguese"],["ru-RU","Russian"],["zh-CN","Chinese"],["ja-JP","Japanese"],["ko-KR","Korean"],["hi-IN","Hindi"],["ar-SA","Arabic"],["ms-MY","Malay"],["id-ID","Indonesian"],["ta-IN","Tamil"],["th-TH","Thai"],["vi-VN","Vietnamese"],["tr-TR","Turkish"]];

// Picture cards: e = emoji, n = name in each language, f = sound pitch (Hz)
// To add a card, copy one line and change it. Languages with no name fall back to English.
var cards=[
{e:"🐶",n:{en:"Dog",es:"Perro",fr:"Chien",zh:"小狗",ja:"いぬ",hi:"कुत्ता",ms:"Anjing",ar:"كلب"},f:330},
{e:"🐱",n:{en:"Cat",es:"Gato",fr:"Chat",zh:"小猫",ja:"ねこ",hi:"बिल्ली",ms:"Kucing",ar:"قطة"},f:700},
{e:"🐮",n:{en:"Cow",es:"Vaca",fr:"Vache",zh:"奶牛",ja:"うし",hi:"गाय",ms:"Lembu",ar:"بقرة"},f:150},
{e:"🐥",n:{en:"Chick",es:"Pollito",fr:"Poussin",zh:"小鸡",ja:"ひよこ",hi:"चूज़ा",ms:"Anak ayam",ar:"كتكوت"},f:1100},
{e:"🍼",n:{en:"Milk",es:"Leche",fr:"Lait",zh:"牛奶",ja:"ミルク",hi:"दूध",ms:"Susu",ar:"حليب"},f:520},
{e:"👩",n:{en:"Mama",es:"Mamá",fr:"Maman",zh:"妈妈",ja:"ママ",hi:"माँ",ms:"Mama",ar:"ماما"},f:440},
{e:"👨",n:{en:"Papa",es:"Papá",fr:"Papa",zh:"爸爸",ja:"パパ",hi:"पापा",ms:"Papa",ar:"بابا"},f:260},
{e:"🌙",n:{en:"Good night",es:"Buenas noches",fr:"Bonne nuit",zh:"晚安",ja:"おやすみ",hi:"शुभ रात्रि",ms:"Selamat malam",ar:"تصبح على خير"},f:392},
{e:"❤️",n:{en:"I love you",es:"Te quiero",fr:"Je t’aime",zh:"我爱你",ja:"だいすき",hi:"मैं तुमसे प्यार करता हूँ",ms:"Saya sayang awak",ar:"أحبك"},f:587}
];

// Quick phrase buttons in the "Type and listen" box
var chips=["Good morning, my little star!","Time to sleep, sweet dreams.","I love you so much.","Peek-a-boo! I see you!","Hello! How are you today?"];
