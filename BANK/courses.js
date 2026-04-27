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
  }
];
