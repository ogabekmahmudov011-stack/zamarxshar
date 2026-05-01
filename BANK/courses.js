const buildPlans = (full, monthly) => [
  {
    id: "full",
    title: "To'liq o'quv to'lovi",
    amount: full,
    note: "To'liq fan uchun chegirmali narx"
  },
  {
    id: "monthly",
    title: "Oyma-oy to'lov",
    amount: monthly,
    note: "Har oy teng miqdorda to'lov"
  }
];

const buildTeacher = (name = "", bio = "", certificate = null, photo = "") => ({
  name,
  bio,
  certificate,
  photo
});

const withTeacher = (course) => ({
  ...course,
  teacher: {
    ...buildTeacher(),
    ...(course.teacher || {})
  }
});

// Agar kerak bo'lsa, istalgan kurs ichiga quyidagicha teacher qo'shing:
// teacher: buildTeacher("Dilnoza Aliyeva", "5 yillik tajribaga ega ustoz.", true, "assets/dilnoza.jpg"),
// Yoki sertifikat fayli bilan:
// teacher: buildTeacher("Dilnoza Aliyeva", "5 yillik tajribaga ega ustoz.", { status: true, fileUrl: "assets/sertifikat.pdf", fileName: "dilnoza-sertifikat.pdf" }, "assets/dilnoza.jpg"),

window.COURSES = [
  {
    slug: "full-stack-web-development",
    short: "MG",
    title: "Matematika va Geometriya",
    level: "5-11-sinflar uchun",
    duration: "9 oy",
    format: "Nazariya + masalalar",
    price: "5 400 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Matematika va geometriya mavzularini bosqichma-bosqich mustahkamlab, nazorat va imtihonlarga puxta tayyorlanasiz.",
    outcomes: [
      "Murakkab masalalarni bosqichma-bosqich yechish ko'nikmasi",
      "Tenglama, funksiya va geometriyada ishonchli baza",
      "Nazorat ishi va kirish imtihonlari uchun tayyorgarlik"
    ],
    modules: [
      "Sonlar va algebraik ifodalar",
      "Tenglamalar, tengsizliklar va sistemalar",
      "Funksiyalar va grafiklar",
      "Geometriya va planimetriya",
      "Trigonometriya asoslari",
      "Test yechish strategiyalari"
    ],
    plans: buildPlans("5 400 000 so'm", "600 000 so'm", "1 800 000 so'm")
  },
  {
    slug: "cloud-computing",
    short: "FZ",
    title: "Fizika",
    level: "6-11-sinflar uchun",
    duration: "9 oy",
    format: "Nazariya + amaliy masalalar",
    price: "5 400 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Mexanika, elektr va optika bo'limlarini tushunarli usulda o'rganib, formulalarni amaliy masalalarda qo'llaysiz.",
    outcomes: [
      "Formulalarni to'g'ri tanlash va qo'llash malakasi",
      "Grafik, jadval va tajriba natijalarini tahlil qilish",
      "Maktab imtihoni va testlar uchun tayyor baza"
    ],
    modules: [
      "Mexanika asoslari",
      "Molekulyar fizika va termodinamika",
      "Elektr va magnit hodisalari",
      "Optika va yorug'lik hodisalari",
      "Atom va yadro fizikasi kirish",
      "Masalalar ishlash va tajriba tahlili"
    ],
    plans: buildPlans("5 400 000 so'm", "600 000 so'm", "1 800 000 so'm")
  },
  {
    slug: "devops-platform-engineering",
    short: "AD",
    title: "Ona Tili va Adabiyot",
    level: "5-11-sinflar uchun",
    duration: "8 oy",
    format: "Matn + tahlil + insho",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Grammatika, imlo va badiiy matn tahlilini birgalikda o'rganib, yozma va og'zaki nutqni rivojlantirasiz.",
    outcomes: [
      "Imlo va tinish belgilarini to'g'ri qo'llash",
      "Insho, bayon va matn tahlilida erkinlik",
      "Adabiy asarlarni mazmun va g'oya jihatdan tahlil qilish"
    ],
    modules: [
      "Fonetika, leksikologiya va imlo",
      "So'z turkumlari va gap bo'laklari",
      "Matn tuzish va insho yozish",
      "Badiiy asar tahlili",
      "Adabiyot nazariyasi va mualliflar",
      "Test va bayon mashqlari"
    ],
    teacher: buildTeacher(
      "Saodat Xolmatova",
      "12 yillik tajribaga ega ona tili va adabiyot fani o'qituvchisi. Imlo, matn tahlili va insho yozish bo'yicha o'quvchilarni bosqichma-bosqich tayyorlaydi.",
      {
        status: true,
        fileUrl: "assets/ona-tili-sertifikat.svg",
        fileName: "saodat-xolmatova-sertifikat.svg"
      }
    ),
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "backend-api-engineering",
    short: "TR",
    title: "Tarix",
    level: "6-11-sinflar uchun",
    duration: "8 oy",
    format: "Sana + xarita + tahlil",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "O'zbekiston va jahon tarixidagi muhim davrlarni tizimli o'rganib, sanalar va voqealarni mantiqiy bog'lay olasiz.",
    outcomes: [
      "Muhim voqealarni davrlar bo'yicha ajratish",
      "Sana, shaxs va xaritalar bilan ishlash ko'nikmasi",
      "Test va yozma savollarga aniq javob bera olish"
    ],
    modules: [
      "Qadimgi sivilizatsiyalar",
      "O'rta asrlar tarixi",
      "O'zbekiston tarixi asoslari",
      "Jahon tarixi va muhim voqealar",
      "Tarixiy manbalar va xaritalar",
      "Test ishlash va takrorlash"
    ],
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "mobile-app-development",
    short: "EN",
    title: "Ingliz Tili",
    level: "Boshlang'ichdan o'rta bosqichgacha",
    duration: "10 oy",
    format: "Grammar + speaking",
    price: "6 000 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Grammatika, lug'at va speaking mashqlari orqali ingliz tilida o'qish, yozish va gapirish ko'nikmalaringiz rivojlanadi.",
    outcomes: [
      "Kundalik mavzularda erkinroq muloqot",
      "Grammar va vocabulary bo'yicha mustahkam baza",
      "Maktab nazorati va sertifikat bosqichiga tayyorgarlik"
    ],
    modules: [
      "Grammar foundations",
      "Vocabulary by topics",
      "Reading va listening mashqlari",
      "Speaking club va dialoglar",
      "Writing task va essay boshlang'ichi",
      "Test va exam practice"
    ],
    plans: buildPlans("6 000 000 so'm", "600 000 so'm", "2 000 000 so'm")
  },
  {
    slug: "ui-ux-product-design",
    short: "BI",
    title: "Biologiya",
    level: "6-11-sinflar uchun",
    duration: "8 oy",
    format: "Nazariya + diagrammalar",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Tirik organizmlar tuzilishi va jarayonlarini soddalashtirilgan tushuntirish hamda ko'rgazmali misollar bilan o'rganasiz.",
    outcomes: [
      "Hujayra va organizm tizimlarini farqlay olish",
      "Diagramma va biologik jarayonlarni tushuntirish",
      "Nazorat ishlari va testlar uchun puxta tayyorgarlik"
    ],
    modules: [
      "Hujayra va to'qimalar",
      "Botanika va o'simliklar",
      "Zoologiya asoslari",
      "Odam anatomiyasi va fiziologiya",
      "Genetika va ekologiya",
      "Diagramma va test mashqlari"
    ],
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "cybersecurity",
    short: "KM",
    title: "Kimyo",
    level: "7-11-sinflar uchun",
    duration: "9 oy",
    format: "Formulalar + reaksiyalar",
    price: "5 400 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Kimyoviy jarayonlar, formulalar va hisoblash masalalarini oddiydan murakkabga qarab amaliy misollar bilan o'rganasiz.",
    outcomes: [
      "Reaksiya tenglamalarini tuzish va tenglashtirish",
      "Davriy jadval bilan ishonchli ishlash",
      "Hisoblash masalalari va testlarga tayyorgarlik"
    ],
    modules: [
      "Atom tuzilishi va davriy jadval",
      "Kimyoviy bog'lanish va modda tuzilishi",
      "Reaksiya tenglamalari",
      "Eritmalar va hisoblash masalalari",
      "Organik kimyo kirish",
      "Laboratoriya xavfsizligi va testlar"
    ],
    plans: buildPlans("5 400 000 so'm", "600 000 so'm", "1 800 000 so'm")
  },
  {
    slug: "data-science-big-data",
    short: "GG",
    title: "Geografiya",
    level: "5-11-sinflar uchun",
    duration: "7 oy",
    format: "Xarita + statistika",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Tabiiy va iqtisodiy geografiya bo'limlarini xarita, atlas va diagrammalar orqali tushunarli usulda o'rganasiz.",
    outcomes: [
      "Xarita va atlas bilan ishlash tezligi",
      "Iqlim, materik va davlatlar bo'yicha mustahkam bilim",
      "Diagramma va statistik jadvalni sharhlash ko'nikmasi"
    ],
    modules: [
      "Tabiiy geografiya asoslari",
      "Iqlim va atmosfera",
      "Materiklar va okeanlar",
      "O'zbekiston iqtisodiy geografiyasi",
      "Xarita, atlas va koordinatalar",
      "Statistika va diagramma tahlili"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  },
  {
    slug: "ai-engineering-machine-learning",
    short: "IT",
    title: "Informatika",
    level: "5-11-sinflar uchun",
    duration: "8 oy",
    format: "Kompyuter savodxonligi + amaliyot",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Kompyuter savodxonligi, algoritmik fikrlash va dasturlashning boshlang'ich tushunchalarini amaliy mashg'ulotlar bilan o'rganasiz.",
    outcomes: [
      "Kompyuter va fayllar bilan erkin ishlash",
      "Office dasturlaridan samarali foydalanish",
      "Algoritm va sodda dasturlashga kirish"
    ],
    modules: [
      "Kompyuter qurilmalari va xavfsizlik",
      "Windows va fayllar bilan ishlash",
      "Word, Excel va PowerPoint",
      "Algoritm va blok-sxema",
      "Scratch yoki Python kirish",
      "Internet va media savodxonlik"
    ],
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "qa-automation-testing",
    short: "RU",
    title: "Rus Tili",
    level: "Boshlang'ichdan o'rta bosqichgacha",
    duration: "8 oy",
    format: "Grammar + reading",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Rus tilida o'qish, yozish va gapirish bo'yicha asosiy bilimlarni bosqichma-bosqich shakllantirasiz.",
    outcomes: [
      "Grammatika va asosiy qoidalarni to'g'ri qo'llash",
      "Matn o'qish va mazmunini tushunish",
      "Diktant, test va suhbatga tayyorlik"
    ],
    modules: [
      "Alifbo va talaffuz",
      "Grammatika asoslari",
      "Lug'at boyitish",
      "O'qib tushunish mashqlari",
      "Matn yozish va suhbat",
      "Diktant va testlar"
    ],
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "german-language",
    short: "DE",
    title: "Nemis Tili",
    level: "Boshlang'ichdan o'rta bosqichgacha",
    duration: "8 oy",
    format: "Grammar + speaking",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Nemis tilining asosiy grammatikasi, lug'ati va kundalik muloqotini bosqichma-bosqich o'rganasiz.",
    outcomes: [
      "Oddiy suhbatlarda fikr bildirish ko'nikmasi",
      "Asosiy grammatik mavzularni to'g'ri qo'llash",
      "Maktab nazorati va boshlang'ich sertifikatga tayyorlanish"
    ],
    modules: [
      "Alifbo va talaffuz",
      "Asosiy grammatika",
      "Kundalik lug'at boyitish",
      "O'qish va tinglab tushunish",
      "Dialog va speaking mashqlari",
      "Test va takrorlash"
    ],
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "french-language",
    short: "FR",
    title: "Fransuz Tili",
    level: "Boshlang'ichdan o'rta bosqichgacha",
    duration: "8 oy",
    format: "Grammar + speaking",
    price: "4 800 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Fransuz tilida o'qish, yozish va oddiy muloqot qilish uchun kerakli bazani amaliy mashqlar bilan shakllantirasiz.",
    outcomes: [
      "Asosiy ibora va gaplarni erkinroq ishlatish",
      "Boshlang'ich darajadagi matnlarni tushunish",
      "Nazorat va og'zaki savollarga tayyorlik"
    ],
    modules: [
      "Talaffuz va alifbo",
      "Boshlang'ich grammatika",
      "Mavzuli lug'atlar",
      "O'qish va listening",
      "Suhbat mashqlari",
      "Nazorat va testlar"
    ],
    plans: buildPlans("4 800 000 so'm", "600 000 so'm", "1 600 000 so'm")
  },
  {
    slug: "physical-education",
    short: "JT",
    title: "Jismoniy Tarbiya",
    level: "5-11-sinflar uchun",
    duration: "6 oy",
    format: "Amaliy mashg'ulot",
    price: "3 600 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Jismoniy tayyorgarlik, harakat koordinatsiyasi va sog'lom turmush ko'nikmalarini mashg'ulotlar orqali rivojlantirasiz.",
    outcomes: [
      "Jismoniy faollik va chidamlilikni oshirish",
      "Mashqlarni to'g'ri bajarish odatini shakllantirish",
      "Sport normativlariga yaxshiroq tayyorlanish"
    ],
    modules: [
      "Umumiy jismoniy tayyorgarlik",
      "Yengil atletika asoslari",
      "Harakatli o'yinlar",
      "Moslashuvchanlik va kuch mashqlari",
      "Sog'lom turmush qoidalari",
      "Nazorat normativlari"
    ],
    plans: buildPlans("3 600 000 so'm", "600 000 so'm", "1 200 000 so'm")
  },
  {
    slug: "fine-arts",
    short: "TS",
    title: "Tasviriy San'at",
    level: "5-11-sinflar uchun",
    duration: "7 oy",
    format: "Nazariya + amaliy rasm",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Rasm, rang va kompozitsiya asoslarini bosqichma-bosqich o'rganib, ijodiy fikrlashni rivojlantirasiz.",
    outcomes: [
      "Rang va shakl bilan ishlash ko'nikmasi",
      "Oddiy kompozitsiya va eskizlar chizish",
      "Nazariy va amaliy topshiriqlarda erkinlik"
    ],
    modules: [
      "Rangtasvir asoslari",
      "Qalam bilan chizish",
      "Kompozitsiya va proporsiya",
      "Tabiat va predmetlardan rasm",
      "Ijodiy ishlar",
      "Portfolio va ko'rgazma tayyorlash"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  },
  {
    slug: "music-culture",
    short: "MM",
    title: "Musiqa Madaniyati",
    level: "5-11-sinflar uchun",
    duration: "7 oy",
    format: "Nazariya + tinglash",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Musiqa savodi, ritm va turli asarlarni tushunish bo'yicha nazariy hamda amaliy ko'nikmalarni olasiz.",
    outcomes: [
      "Ritm va kuylarni farqlash",
      "Musiqa janrlari va asboblarini tanish",
      "Maktab topshiriqlarini yaxshiroq bajarish"
    ],
    modules: [
      "Musiqa savodi asoslari",
      "Ritm va temp",
      "Musiqa janrlari",
      "Musiqa asboblari",
      "Tinglash va tahlil",
      "Nazorat va ijodiy topshiriqlar"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  },
  {
    slug: "technology",
    short: "TX",
    title: "Texnologiya",
    level: "5-11-sinflar uchun",
    duration: "7 oy",
    format: "Nazariya + loyiha",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Texnologiya fanida kundalik amaliy ko'nikmalar, buyum tayyorlash va oddiy loyiha ishlari bilan shug'ullanasiz.",
    outcomes: [
      "Asbob-uskunalardan xavfsiz foydalanish",
      "Oddiy buyum va loyiha tayyorlash",
      "Amaliy topshiriqlarni mustaqil bajarish"
    ],
    modules: [
      "Texnika xavfsizligi",
      "Materiallar bilan ishlash",
      "Oddiy loyiha tuzish",
      "Uy-ro'zg'or amaliyoti",
      "Hunarmandchilik elementlari",
      "Yakuniy amaliy ish"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  },
  {
    slug: "technical-drawing",
    short: "CH",
    title: "Chizmachilik",
    level: "7-11-sinflar uchun",
    duration: "7 oy",
    format: "Qoidalar + chizma",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Texnik chizma qoidalari, proyeksiya va buyumlarni aniq tasvirlash ko'nikmalarini amalda o'rganasiz.",
    outcomes: [
      "Texnik chizmalarni o'qish va tushunish",
      "Asosiy proyeksiyalarni to'g'ri chizish",
      "Nazorat ishlarida aniq va toza ishlash"
    ],
    modules: [
      "Chizmachilik asboblari",
      "Chiziq va belgilar",
      "Proyeksiya asoslari",
      "Kesim va ko'rinishlar",
      "Detallar chizmasi",
      "Amaliy chizma ishlari"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  },
  {
    slug: "character-education",
    short: "TB",
    title: "Tarbiya",
    level: "5-11-sinflar uchun",
    duration: "6 oy",
    format: "Suhbat + tahlil",
    price: "3 600 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Tarbiya fanida ijtimoiy xulq, qadriyatlar va shaxsiy mas'uliyat mavzulari misollar bilan tushuntiriladi.",
    outcomes: [
      "Hayotiy vaziyatlarga ongli yondashish",
      "Muloqot va hurmat madaniyatini shakllantirish",
      "Maktabdagi tarbiyaviy topshiriqlarga tayyorlik"
    ],
    modules: [
      "Qadriyat va odob",
      "Muloqot madaniyati",
      "Mas'uliyat va intizom",
      "Jamiyat va oila",
      "Shaxsiy rivojlanish",
      "Suhbat va tahliliy topshiriqlar"
    ],
    plans: buildPlans("3 600 000 so'm", "600 000 so'm", "1 200 000 so'm")
  },
  {
    slug: "law",
    short: "HQ",
    title: "Huquq",
    level: "8-11-sinflar uchun",
    duration: "7 oy",
    format: "Nazariya + keys",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Huquqiy tushunchalar, fuqaro huquqlari va jamiyatdagi qonuniy munosabatlarni sodda misollar bilan o'rganasiz.",
    outcomes: [
      "Asosiy huquqiy tushunchalarni bilish",
      "Fuqaro huquq va majburiyatlarini anglash",
      "Test va mavzu savollariga aniq javob bera olish"
    ],
    modules: [
      "Davlat va huquq asoslari",
      "Konstitutsion huquq",
      "Fuqaro huquqlari",
      "Huquqiy mas'uliyat",
      "Hayotiy huquqiy vaziyatlar",
      "Test va muhokamalar"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  },
  {
    slug: "economics",
    short: "IQ",
    title: "Iqtisodiyot",
    level: "8-11-sinflar uchun",
    duration: "7 oy",
    format: "Nazariya + hisob-kitob",
    price: "4 200 000 so'm",
    monthly: "600 000 so'm / oy",
    description:
      "Iqtisodiy tushunchalar, bozor, budjet va kundalik moliyaviy savodxonlik mavzularini amaliy misollar bilan tushunasiz.",
    outcomes: [
      "Asosiy iqtisodiy atamalarni anglash",
      "Oddiy budjet va hisob-kitob qilish",
      "Iqtisodiy mavzudagi savollarga mantiqiy javob berish"
    ],
    modules: [
      "Iqtisodiyotga kirish",
      "Bozor va talab-taklif",
      "Oila budjeti",
      "Daromad va xarajat",
      "Tadbirkorlik asoslari",
      "Amaliy masalalar va testlar"
    ],
    plans: buildPlans("4 200 000 so'm", "600 000 so'm", "1 400 000 so'm")
  }
].map(withTeacher);
