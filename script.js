const noteText = document.getElementById("note-text");
const changeNoteButton = document.getElementById("change-note");
const yearElement = document.getElementById("year");
const page = document.body.dataset.page;
const navLinks = document.querySelectorAll(".site-nav a");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle__icon");
const languageSelect = document.getElementById("language-select");
const savedTheme = localStorage.getItem("theme");
const savedLanguage = localStorage.getItem("language") || "uz";
const planTriggers = document.querySelectorAll("[data-plan-trigger]");
const profileForm = document.getElementById("profile-form");
const profileNameInput = document.getElementById("profile-name-input");
const profileRoleInput = document.getElementById("profile-role-input");
const profileGoalInput = document.getElementById("profile-goal-input");
const profileEmailInput = document.getElementById("profile-email-input");
const profilePhoneInput = document.getElementById("profile-phone-input");
const profileBioInput = document.getElementById("profile-bio-input");
const profileBadge = document.getElementById("profile-badge");
const profileBadgeImage = document.getElementById("profile-badge-image");
const profileNameDisplay = document.getElementById("profile-name");
const profileRoleDisplay = document.getElementById("profile-role-display");
const profileGoalDisplay = document.getElementById("profile-goal-display");
const profileEmailDisplay = document.getElementById("profile-email-display");
const profilePhoneDisplay = document.getElementById("profile-phone-display");
const profileBioDisplay = document.getElementById("profile-bio-display");
const profileResetButton = document.getElementById("profile-reset-button");
const profileMenuToggle = document.getElementById("profile-menu-toggle");
const profileMenuPanel = document.getElementById("profile-menu-panel");
const loginOpenButton = document.getElementById("login-open");
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const loginEmailInput = document.getElementById("login-email");
const loginPasswordInput = document.getElementById("login-password");
const loginPasswordWrap = document.getElementById("login-password-wrap");
const loginOnboardingWrap = document.getElementById("login-onboarding-wrap");
const loginUseCaseOptions = document.querySelectorAll('input[name="use-case"]');
const loginMarketingCheck = document.getElementById("login-marketing-check");
const loginContinueButton = document.querySelector(".login-form__continue");
const loginFormTip = document.querySelector(".login-form__tip");
const loginCloseButton = document.getElementById("login-close-button");
const loginCloseButtons = document.querySelectorAll("[data-login-close]");
const loginProviderButtons = document.querySelectorAll(".login-provider");
const loginProviderStatus = document.getElementById("login-provider-status");
const loginDivider = document.querySelector(".login-card__divider");
const loginProvidersWrap = document.querySelector(".login-providers");
const loginExisting = document.querySelector(".login-card__existing");
const homeImagePanel = document.getElementById("home-image-panel");
const homeImageLauncher = document.getElementById("home-image-launcher");
const homeImageTabs = document.querySelectorAll("[data-home-image-tab]");
const homeImageViews = document.querySelectorAll("[data-home-image-view]");
const homeImageUploadButton = document.getElementById("home-image-upload-button");
const homeImageInput = document.getElementById("home-image-input");
const homeImageLinkForm = document.getElementById("home-image-link-form");
const homeImageLinkInput = document.getElementById("home-image-link-input");
const homeImageUnsplashForm = document.getElementById("home-image-unsplash-form");
const homeImageUnsplashInput = document.getElementById("home-image-unsplash-input");
const homeImageGiphyForm = document.getElementById("home-image-giphy-form");
const homeImageGiphyInput = document.getElementById("home-image-giphy-input");
const homeImageStage = document.getElementById("home-image-stage");
const homeImageStageImage = document.getElementById("home-image-stage-image");
const homeImageGallery = document.getElementById("home-image-gallery");
const workspaceLinks = document.querySelectorAll("[data-workspace-link]");
const workspaceCards = document.querySelectorAll("[data-workspace-card]");
const workspaceLaunchKey = "it-center-workspace-launch";

const moonIcon = `
  <svg viewBox="0 0 24 24" class="theme-toggle__svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const sunIcon = `
  <svg viewBox="0 0 24 24" class="theme-toggle__svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/>
    <path d="M12 2.75V5.25M12 18.75V21.25M21.25 12H18.75M5.25 12H2.75M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54M18.54 18.54L16.77 16.77M7.23 7.23L5.46 5.46" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
`;

const languageOptionLabels = {
  uz: "O'zbekcha",
  en: "English",
  ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439"
};

const translations = {
  uz: {
    nav: ["Loyiha", "Yo'nalishlar", "Rejalar", "Eslatma"],
    languageLabel: "Til",
    languageOptions: ["O'zbek", "Ingliz", "Rus"],
    themeLightTitle: "Qora rejim",
    themeDarkTitle: "Oq rejim",
    openPage: "Sahifani ochish",
    startPlan: "Reja kiritishni boshlash",
    noteButton: "Matnni almashtirish",
    notes: [
      "Bu repository mening shaxsiy rejalashtirish joyim hisoblanadi.",
      "Bu sahifa barcha rejalarimni tartibli va professional ko'rinishda saqlash uchun xizmat qiladi.",
      "Har bir yangi vazifa, maqsad va qadam shu yerda ketma-ket ravishda boshqariladi."
    ],
    profile: {
      tag: "Shaxsiy profil",
      title: "Profilingizni kiriting",
      labels: ["Ism", "Rol", "Maqsad", "GMAIL ACCOUNTINGIZNI KIRITING", "TELEFON RAQAMINGIZNI KIRITING", "Qisqa ma'lumot"],
      placeholders: [
        "Masalan: Abdulloh",
        "Masalan: Frontend developer",
        "Masalan: Rejalarni tartib bilan yuritish",
        "Masalan: siz@gmail.com",
        "Masalan: +998 90 123 45 67",
        "O'zingiz haqingizda qisqa yozing..."
      ],
      save: "Profilni saqlash",
      reset: "Tozalash",
      previewTag: "Profil",
      emptyName: "",
      emptyRole: "",
      emptyGoal: "",
      emptyEmail: "",
      emptyPhone: "",
      emptyBio: "",
      goalLabel: "Asosiy maqsad",
      emailLabel: "GMAIL ACCOUNTINGIZNI KIRITING",
      phoneLabel: "TELEFON RAQAMINGIZNI KIRITING"
    },
    footer: {
      home: "IT CENTER | Bosh sahifa",
      about: "IT CENTER | Loyiha sahifasi",
      focus: "IT CENTER | Yo'nalishlar sahifasi",
      roadmap: "IT CENTER | Rejalar sahifasi",
      note: "IT CENTER | Eslatma sahifasi"
    },
    pages: {
      home: {
        title: "IT CENTER | Bosh Sahifa",
        eyebrow: "Shaxsiy boshqaruv maydoni",
        h1: "Har bir bo'lim endi alohida sahifa bo'lib ochiladi",
        intro: "Bu bosh sahifa sizning barcha rejalashtirish bo'limlaringizga kirish nuqtasi bo'lib xizmat qiladi. Kerakli yo'nalishni tanlab, o'sha sahifada rejalaringizni tartibli davom ettirishingiz mumkin.",
        actions: ["Rejalar sahifasi", "Yo'nalishlarni ochish"],
        summaryLabel: "Tez kirish",
        summary: [
          "Alohida bo'lim sahifalari tayyorlandi",
          "Markaziy bosh sahifa orqali hammasi boshqariladi",
          "Har bir sahifa professional va bir xil uslubda"
        ],
        sectionTag: "Sahifalar",
        sectionTitle: "Kerakli bo'limni tanlang",
        cards: [
          ["Loyiha", "Loyiha haqida va asosiy maqsadlar joylashgan alohida sahifa."],
          ["Yo'nalishlar", "Ish rejalari, kundalik vazifalar va boshqa asosiy yo'nalishlar sahifasi."],
          ["Rejalar", "Rejalashtirish bosqichlari va tartibli yuritish uchun alohida sahifa."],
          ["Eslatma", "Shaxsiy boshqaruv markazi va yakuniy eslatmalar uchun alohida sahifa."]
        ]
      },
      about: {
        title: "IT CENTER | Loyiha",
        eyebrow: "Loyiha bo'limi",
        h1: "Shaxsiy rejalashtirishning mazmuni va maqsadi",
        intro: "Bu sahifada loyihaning asosiy vazifasi, nima uchun kerakligi va qanday yo'nalishda yuritilishi haqida umumiy tushuncha beriladi.",
        tags: ["Loyiha haqida", "Maqsad"],
        titles: ["Shaxsiy rejalashtirishni tizimli olib borish", "Har bir rejani ko'rinadigan qilish"],
        texts: [
          "Bu sahifa kundalik vazifalar, ish rejalari va uzoq muddatli maqsadlarni bir joyga jamlash uchun xizmat qiladi. Har bir reja alohida qayd etilib, keyingi qadamlar bilan bog'lab boriladi.",
          "Maqsad rejalarning yo'qolib ketmasligi, ularni tartib bilan boshqarish va bajarilish holatini aniq kuzatib borishdir."
        ]
      },
      focus: {
        title: "IT CENTER | Yo'nalishlar",
        eyebrow: "Asosiy yo'nalishlar",
        h1: "Rejalaringiz uchun bosh yo'nalishlar shu yerda",
        intro: "Har bir yo'nalish alohida kartada joylashgan va siz ishlaringizni shu bo'limlarga ajratib yuritishingiz mumkin.",
        sectionTag: "Yo'nalishlar",
        sectionTitle: "Reja yuritiladigan asosiy qismlar",
        cards: [
          ["Ish rejalari", "Kunlik yoki haftalik ishlar aniq yozilib, ustuvorlik bilan tartiblanadi."],
          ["Kundalik vazifalar", "Har kuni bajarilishi kerak bo'lgan vazifalar alohida qayd etiladi."],
          ["Muhim maqsadlar", "Eng muhim yo'nalishlar va uzoq muddatli niyatlar bir joyda saqlanadi."],
          ["Nazorat va kuzatish", "Bajarilgan ishlar belgilanadi va yangi rejalar oldingi qadamlar bilan ulanadi."]
        ]
      },
      roadmap: {
        title: "IT CENTER | Rejalar",
        eyebrow: "Yo'l xaritasi",
        h1: "Rejalaringizni qadam-baqadam yuritish bosqichlari",
        intro: "Bu sahifa rejalarning paydo bo'lishidan boshlab, ularni tartiblash va nazorat qilishgacha bo'lgan ketma-ket jarayonni ko'rsatadi.",
        sectionTag: "Rejalar",
        sectionTitle: "Rejalashtirish ketma-ketligi",
        steps: [
          ["Rejalarni yozib borish", "Barcha yangi fikrlar va vazifalar tizimli ravishda kiritiladi."],
          ["Vazifalarni tartiblash", "Yozilgan ishlar ustuvorlik va ketma-ketlik bo'yicha ajratiladi."],
          ["Muhim ishlarni ajratish", "Eng kerakli vazifalar alohida ko'rinishda belgilab olinadi."],
          ["Bajarilgan ishlarni belgilash", "Jarayonni nazorat qilish uchun bajarilgan qadamlar qayd etiladi."],
          ["Yangi rejalarni qo'shib borish", "Tizim doimiy ravishda kengayadi va yangi maqsadlar bilan boyitiladi."]
        ]
      },
      note: {
        title: "IT CENTER | Eslatma",
        eyebrow: "Eslatma bo'limi",
        h1: "Shaxsiy boshqaruv markazi va eslatmalar",
        intro: "Bu sahifa loyiha yakunlari, eslatmalar va umumiy boshqaruv uchun ajratilgan. Kerak bo'lsa matnni almashtirib, yangi mazmun bilan ishlatishingiz mumkin.",
        tag: "Eslatma",
        title2: "Shaxsiy markaz"
      }
    },
    modal: {
      eyebrow: "Reja kiritish sahifasi",
      title: "Yangi reja qo'shing",
      subtitle: "Oq sahifada rejangizni yozing, saqlang va keyin yana davom eting.",
      close: "Yopish",
      exitTitle: "Sahifadan chiqilsinmi?",
      exitText: "Saqlanmagan yozuvlaringiz yo'qolishi mumkin.",
      exitStay: "Qolish",
      exitLeave: "Chiqish",
      planTitle: "Reja nomi",
      planTitlePlaceholder: "Masalan: Bugungi vazifalar",
      planText: "Reja matni",
      planTextPlaceholder: "Rejangizni shu yerga yozing...",
      insertToggle: "Toggle list qo'shish",
      toggleTemplate: "Toggle sarlavha\n  - Ichki punkt",
      save: "Rejani saqlash",
      listTitle: "Kiritilgan rejalar",
      empty: "Hozircha bu bo'lim uchun reja kiritilmagan.",
      delete: "O'chirish",
      untitled: "Nomsiz reja",
      contextTitle: "{context} uchun reja",
      contextSubtitle: "Bu oq sahifada {context} bo'yicha o'zingizning rejalaringizni bemalol yozishingiz mumkin."
    }
  },
  en: {
    nav: ["Project", "Directions", "Plans", "Notes"],
    languageLabel: "Lang",
    languageOptions: ["Uzbek", "English", "Russian"],
    themeLightTitle: "Dark mode",
    themeDarkTitle: "Light mode",
    openPage: "Open page",
    startPlan: "Start entering plan",
    noteButton: "Change text",
    notes: [
      "This repository is my personal planning space.",
      "This page helps keep all my plans organized in a professional layout.",
      "Every new task, goal and step is managed here in sequence."
    ],
    profile: {
      tag: "Personal profile",
      title: "Enter your profile",
      labels: ["Name", "Role", "Goal", "Google", "Phone", "Short bio"],
      placeholders: [
        "Example: Abdulloh",
        "Example: Frontend developer",
        "Example: Keep plans organized",
        "Example: you@gmail.com",
        "Example: +998 90 123 45 67",
        "Write a short intro about yourself..."
      ],
      save: "Save profile",
      reset: "Clear",
      previewTag: "Profile",
      emptyName: "",
      emptyRole: "",
      emptyGoal: "",
      emptyEmail: "",
      emptyPhone: "",
      emptyBio: "",
      goalLabel: "Main goal",
      emailLabel: "Google",
      phoneLabel: "Phone"
    },
    footer: {
      home: "IT CENTER | Home page",
      about: "IT CENTER | Project page",
      focus: "IT CENTER | Directions page",
      roadmap: "IT CENTER | Plans page",
      note: "IT CENTER | Notes page"
    },
    pages: {
      home: {
        title: "IT CENTER | Home",
        eyebrow: "Personal control space",
        h1: "Each section now opens as a separate page",
        intro: "This home page serves as the entry point to all your planning sections. Choose the needed direction and continue your plans in an organized way on that page.",
        actions: ["Open plans page", "Open directions"],
        summaryLabel: "Quick access",
        summary: [
          "Separate section pages are ready",
          "Everything is managed through one main page",
          "Every page is professional and consistent"
        ],
        sectionTag: "Pages",
        sectionTitle: "Choose the needed section",
        cards: [
          ["Project", "A separate page for project details and key goals."],
          ["Directions", "A page for work plans, daily tasks and other core directions."],
          ["Plans", "A dedicated page for planning stages and organized progress."],
          ["Notes", "A separate page for your control center and final notes."]
        ]
      },
      about: {
        title: "IT CENTER | Project",
        eyebrow: "Project section",
        h1: "Meaning and purpose of personal planning",
        intro: "This page gives a general understanding of the project's main task, why it matters and how it will be organized.",
        tags: ["About project", "Goal"],
        titles: ["Manage personal planning systematically", "Make every plan visible"],
        texts: [
          "This page helps gather daily tasks, work plans and long-term goals in one place. Each plan is recorded separately and connected to the next steps.",
          "The goal is to prevent plans from getting lost, organize them clearly and track completion status accurately."
        ]
      },
      focus: {
        title: "IT CENTER | Directions",
        eyebrow: "Main directions",
        h1: "Your key planning directions are here",
        intro: "Each direction is placed in a separate card so you can organize your work by sections.",
        sectionTag: "Directions",
        sectionTitle: "Core parts for planning",
        cards: [
          ["Work plans", "Daily or weekly work is written clearly and sorted by priority."],
          ["Daily tasks", "Tasks that need to be completed every day are listed separately."],
          ["Important goals", "The most important directions and long-term intentions are kept in one place."],
          ["Control and tracking", "Completed tasks are marked and new plans are linked to previous steps."]
        ]
      },
      roadmap: {
        title: "IT CENTER | Plans",
        eyebrow: "Roadmap",
        h1: "Step-by-step stages for managing your plans",
        intro: "This page shows the sequence from the birth of plans to sorting and controlling them.",
        sectionTag: "Plans",
        sectionTitle: "Planning sequence",
        steps: [
          ["Write plans down", "All new ideas and tasks are entered systematically."],
          ["Sort tasks", "Written tasks are arranged by priority and order."],
          ["Separate important tasks", "The most necessary tasks are highlighted separately."],
          ["Mark completed work", "Completed steps are recorded to monitor progress."],
          ["Add new plans", "The system continuously expands with new goals."]
        ]
      },
      note: {
        title: "IT CENTER | Notes",
        eyebrow: "Notes section",
        h1: "Personal control center and notes",
        intro: "This page is reserved for project conclusions, notes and overall management. You can change the text and use new content when needed.",
        tag: "Notes",
        title2: "Personal center"
      }
    },
    modal: {
      eyebrow: "Plan entry page",
      title: "Add a new plan",
      subtitle: "Write your plan on this white page, save it and continue later.",
      close: "Close",
      exitTitle: "Leave this page?",
      exitText: "Your unsaved text may be lost.",
      exitStay: "Stay",
      exitLeave: "Leave",
      planTitle: "Plan title",
      planTitlePlaceholder: "Example: Today's tasks",
      planText: "Plan text",
      planTextPlaceholder: "Write your plan here...",
      insertToggle: "Insert toggle list",
      toggleTemplate: "Toggle heading\n  - Nested item",
      save: "Save plan",
      listTitle: "Entered plans",
      empty: "No plans have been added for this section yet.",
      delete: "Delete",
      untitled: "Untitled plan",
      contextTitle: "Plan for {context}",
      contextSubtitle: "On this white page, you can freely write your plans for {context}."
    }
  },
  ru: {
    nav: ["Проект", "Направления", "Этапы", "Заметки"],
    languageLabel: "Язык",
    languageOptions: ["Узбекский", "Английский", "Русский"],
    themeLightTitle: "Тёмный режим",
    themeDarkTitle: "Светлый режим",
    openPage: "Открыть страницу",
    startPlan: "Начать ввод плана",
    noteButton: "Сменить текст",
    notes: [
      "Этот репозиторий является моим личным местом для планирования.",
      "Эта страница помогает хранить все мои планы аккуратно и профессионально.",
      "Каждая новая задача, цель и шаг управляются здесь последовательно."
    ],
    footer: {
      home: "IT CENTER | Главная страница",
      about: "IT CENTER | Страница проекта",
      focus: "IT CENTER | Страница направлений",
      roadmap: "IT CENTER | Страница этапов",
      note: "IT CENTER | Страница заметок"
    },
    pages: {
      home: {
        title: "IT CENTER | Главная",
        eyebrow: "Личное пространство управления",
        h1: "Теперь каждый раздел открывается как отдельная страница",
        intro: "Эта главная страница служит входной точкой для всех ваших разделов планирования. Выберите нужное направление и продолжайте свои планы в порядке на соответствующей странице.",
        actions: ["Страница этапов", "Открыть направления"],
        summaryLabel: "Быстрый доступ",
        summary: [
          "Подготовлены отдельные страницы разделов",
          "Все управляется через одну главную страницу",
          "Каждая страница выполнена профессионально и в едином стиле"
        ],
        sectionTag: "Страницы",
        sectionTitle: "Выберите нужный раздел",
        cards: [
          ["Проект", "Отдельная страница с описанием проекта и главными целями."],
          ["Направления", "Страница с рабочими планами, ежедневными задачами и другими ключевыми направлениями."],
          ["Этапы", "Страница с последовательностью этапов планирования."],
          ["Заметки", "Отдельная страница для центра управления и итоговых заметок."]
        ]
      },
      about: {
        title: "IT CENTER | Проект",
        eyebrow: "Раздел проекта",
        h1: "Смысл и цель личного планирования",
        intro: "На этой странице дается общее понимание основной задачи проекта, зачем он нужен и как будет вестись.",
        tags: ["О проекте", "Цель"],
        titles: ["Системно вести личное планирование", "Сделать каждый план заметным"],
        texts: [
          "Эта страница помогает собрать ежедневные задачи, рабочие планы и долгосрочные цели в одном месте. Каждый план записывается отдельно и связывается со следующими шагами.",
          "Цель в том, чтобы планы не терялись, были упорядочены и чтобы их выполнение можно было точно отслеживать."
        ]
      },
      focus: {
        title: "IT CENTER | Направления",
        eyebrow: "Основные направления",
        h1: "Здесь собраны ваши ключевые направления",
        intro: "Каждое направление находится в отдельной карточке, чтобы вы могли вести свои дела по разделам.",
        sectionTag: "Направления",
        sectionTitle: "Основные части для ведения планов",
        cards: [
          ["Рабочие планы", "Ежедневные или недельные задачи записываются четко и сортируются по приоритету."],
          ["Ежедневные задачи", "Задачи, которые нужно выполнять каждый день, записываются отдельно."],
          ["Важные цели", "Самые важные направления и долгосрочные намерения хранятся в одном месте."],
          ["Контроль и отслеживание", "Выполненные дела отмечаются, а новые планы связываются с предыдущими шагами."]
        ]
      },
      roadmap: {
        title: "IT CENTER | Этапы",
        eyebrow: "Дорожная карта",
        h1: "Пошаговые этапы ведения ваших планов",
        intro: "Эта страница показывает последовательность от появления планов до их сортировки и контроля.",
        sectionTag: "Этапы",
        sectionTitle: "Последовательность планирования",
        steps: [
          ["Записывать планы", "Все новые идеи и задачи вносятся системно."],
          ["Сортировать задачи", "Записанные дела распределяются по приоритету и порядку."],
          ["Выделять важные дела", "Самые нужные задачи отмечаются отдельно."],
          ["Отмечать выполненное", "Выполненные шаги фиксируются для контроля процесса."],
          ["Добавлять новые планы", "Система постоянно расширяется новыми целями."]
        ]
      },
      note: {
        title: "IT CENTER | Заметки",
        eyebrow: "Раздел заметок",
        h1: "Личный центр управления и заметки",
        intro: "Эта страница предназначена для итогов проекта, заметок и общего управления. При необходимости можно менять текст и использовать новое содержание.",
        tag: "Заметка",
        title2: "Личный центр"
      }
    },
    modal: {
      eyebrow: "Страница ввода плана",
      title: "Добавьте новый план",
      subtitle: "Запишите свой план на этой белой странице, сохраните его и продолжайте дальше.",
      close: "Закрыть",
      planTitle: "Название плана",
      planTitlePlaceholder: "Например: Задачи на сегодня",
      planText: "Текст плана",
      planTextPlaceholder: "Напишите свой план здесь...",
      insertToggle: "Добавить toggle list",
      toggleTemplate: "Заголовок toggle\n  - Вложенный пункт",
      save: "Сохранить план",
      listTitle: "Добавленные планы",
      empty: "Для этого раздела пока нет добавленных планов.",
      delete: "Удалить",
      untitled: "План без названия",
      contextTitle: "План для: {context}",
      contextSubtitle: "На этой белой странице вы можете свободно записывать свои планы для раздела {context}."
    }
  }
};

let currentLanguage = savedLanguage;
let currentNoteIndex = 0;
let loginStep = 1;
const planStorageKey = `new-plan-items-${page}`;
const profileStorageKey = "new-plan-profile";
const loginStorageKey = "new-plan-account-email";
const legacyLoginStorageKey = "new-olan-account-email";
const loginProviderKey = "new-plan-auth-provider";
const loginUseCaseKey = "new-plan-use-case";
const authStateKey = "new-plan-authenticated";
let activePlanContext = "";
let suppressModalPop = false;
let modalHistoryLocked = false;
let modalHistoryTrapCount = 0;
let exitNoticeOpen = false;
let activeHomeImageTab = "upload";
let activeHomeImageId = "";
let homeImageItems = [];
let homeImagePreviewUrls = [];

const q = (selector) => document.querySelector(selector);
const qa = (selector) => Array.from(document.querySelectorAll(selector));
const text = () => translations[currentLanguage];
const profileText = () => text().profile || translations.uz.profile || translations.en.profile;
let workspaceTransitionBusy = false;

const getWorkspaceCardMeta = (link) => {
  const card = link.closest(".section-card, .focus-card, .timeline-item, .note-panel");
  const heading = card?.querySelector("h3, h2");
  const descriptionNode = card?.querySelector("p:not(.section-tag)") || card?.querySelector("p");

  return {
    section: link.dataset.workspaceSection || "default",
    label: heading?.textContent?.trim() || "",
    description: descriptionNode?.textContent?.trim() || ""
  };
};

const storeWorkspaceLaunch = (payload) => {
  try {
    sessionStorage.setItem(workspaceLaunchKey, JSON.stringify(payload));
  } catch {
    // Ignore storage errors and continue with navigation.
  }
};

const buildWorkspaceUrlFromPayload = (payload = {}) => {
  const url = new URL("plain.html", window.location.href);
  url.searchParams.set("section", payload.section || "default");

  if (payload.label) {
    url.searchParams.set("label", payload.label);
  }

  return url.toString();
};

const createWorkspaceTransition = (payload, sourceRect) => {
  const existingTransition = document.querySelector(".workspace-transition");
  if (existingTransition) {
    existingTransition.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "workspace-transition";
  overlay.innerHTML = `
    <div class="workspace-transition__veil"></div>
    <div class="workspace-transition__panel">
      <div class="workspace-transition__content">
        <span class="workspace-transition__label"></span>
        <h2 class="workspace-transition__title"></h2>
        <p class="workspace-transition__text"></p>
      </div>
      <div class="workspace-transition__footer"></div>
    </div>
  `;

  const labelNode = overlay.querySelector(".workspace-transition__label");
  const titleNode = overlay.querySelector(".workspace-transition__title");
  const textNode = overlay.querySelector(".workspace-transition__text");
  const panelNode = overlay.querySelector(".workspace-transition__panel");
  const finalWidth = Math.min(1120, window.innerWidth - 36);
  const finalHeight = Math.min(window.innerHeight - 24, 860);
  const originX = sourceRect.left + sourceRect.width / 2 - window.innerWidth / 2;
  const originY = sourceRect.top + sourceRect.height / 2 - window.innerHeight / 2;

  if (labelNode) {
    labelNode.textContent = "";
  }
  if (titleNode) {
    titleNode.textContent = "";
  }
  if (textNode) {
    textNode.textContent = "";
  }
  if (panelNode) {
    panelNode.style.setProperty("--workspace-origin-x", `${originX}px`);
    panelNode.style.setProperty("--workspace-origin-y", `${originY}px`);
    panelNode.style.setProperty("--workspace-scale-x", `${Math.max(sourceRect.width / finalWidth, 0.08)}`);
    panelNode.style.setProperty("--workspace-scale-y", `${Math.max(sourceRect.height / finalHeight, 0.08)}`);
  }

  document.body.appendChild(overlay);

  window.requestAnimationFrame(() => {
    document.body.classList.add("is-opening-workspace");
    overlay.classList.add("is-active");
  });
};

const openWorkspaceFromLink = (link) => {
  const openInNewTab = link.target === "_blank";

  if (workspaceTransitionBusy && !openInNewTab) {
    return;
  }

  const payload = {
    ...getWorkspaceCardMeta(link),
    launchedAt: Date.now()
  };
  const targetUrl = buildWorkspaceUrlFromPayload(payload);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  storeWorkspaceLaunch(payload);

  if (openInNewTab) {
    const launchedWindow = window.open(targetUrl, "_blank", "noopener,noreferrer");
    if (!launchedWindow) {
      window.location.href = targetUrl;
    }
    return;
  }

  if (reduceMotion) {
    window.location.href = targetUrl;
    return;
  }

  workspaceTransitionBusy = true;
  const sourceRect = (link.closest(".section-card, .focus-card, .timeline-item, .note-panel") || link).getBoundingClientRect();
  createWorkspaceTransition(payload, sourceRect);

  window.setTimeout(() => {
    window.location.href = targetUrl;
  }, 560);
};

if (savedTheme === "dark" || savedTheme === "light") {
  document.body.dataset.theme = savedTheme;
}

const getProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(profileStorageKey) || "{}");
  } catch {
    return {};
  }
};

const saveProfile = (profile) => {
  localStorage.setItem(profileStorageKey, JSON.stringify(profile));
};

const isAuthenticated = () =>
  localStorage.getItem(authStateKey) === "true" &&
  Boolean(localStorage.getItem(loginStorageKey) || localStorage.getItem(legacyLoginStorageKey) || getProfile().email);

const setAuthenticated = (value) => {
  localStorage.setItem(authStateKey, String(Boolean(value)));
};

const updateLoginButtonState = () => {
  if (!loginOpenButton || !profileMenuToggle) {
    return;
  }

  const authenticated = isAuthenticated();

  if (authenticated) {
    profileMenuToggle.textContent = "Get IT CENTER free";
    profileMenuToggle.classList.remove("is-icon");
    profileMenuToggle.setAttribute("aria-label", "Profil menyusini ochish");

    loginOpenButton.textContent = "Log in";
    loginOpenButton.classList.remove("is-icon");
    loginOpenButton.setAttribute("aria-label", "Workspace");
    return;
  }

  profileMenuToggle.textContent = "Get IT CENTER free";
  profileMenuToggle.classList.remove("is-icon");
  profileMenuToggle.setAttribute("aria-label", "Profil menyusini ochish");

  loginOpenButton.textContent = "Log in";
  loginOpenButton.classList.remove("is-icon");
  loginOpenButton.setAttribute("aria-label", "Log in");
};

const getProfileInitials = (name = "") => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  return initials || "";
};

const applyProfilePreview = (profile = getProfile()) => {
  if (
    !profileNameDisplay ||
    !profileRoleDisplay ||
    !profileGoalDisplay ||
    !profileEmailDisplay ||
    !profilePhoneDisplay ||
    !profileBioDisplay ||
    !profileBadge
  ) {
    return;
  }

  const copy = profileText();
  const name = profile.name?.trim();
  const role = profile.role?.trim();
  const goal = profile.goal?.trim();
  const email = profile.email?.trim();
  const phone = profile.phone?.trim();
  const bio = profile.bio?.trim();

  profileNameDisplay.textContent = name || copy.emptyName;
  profileRoleDisplay.textContent = role || copy.emptyRole;
  profileGoalDisplay.textContent = goal || copy.emptyGoal;
  profileEmailDisplay.textContent = email || copy.emptyEmail;
  profilePhoneDisplay.textContent = phone || copy.emptyPhone;
  profileBioDisplay.textContent = bio || copy.emptyBio;
  profileBadge.setAttribute("aria-label", `${name || "IT CENTER"} avatar`);
  if (profileBadgeImage) {
    profileBadgeImage.alt = `${name || "IT CENTER"} avatar`;
  }
};

const fillProfileForm = (profile = getProfile()) => {
  if (!profileForm) {
    return;
  }

  if (profileNameInput) profileNameInput.value = profile.name || "";
  if (profileRoleInput) profileRoleInput.value = profile.role || "";
  if (profileGoalInput) profileGoalInput.value = profile.goal || "";
  if (profileEmailInput) profileEmailInput.value = profile.email || "";
  if (profilePhoneInput) profilePhoneInput.value = profile.phone || "";
  if (profileBioInput) profileBioInput.value = profile.bio || "";
};

const setProfileMenuState = (isOpen) => {
  if (!profileMenuToggle || !profileMenuPanel) {
    return;
  }

  profileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  profileMenuPanel.hidden = !isOpen;
};

const setLoginModalState = (isOpen) => {
  if (!loginModal) {
    return;
  }

  loginModal.hidden = !isOpen;
  loginModal.style.display = isOpen ? "grid" : "none";
  if (isOpen) {
    document.body.classList.add("modal-open");
    window.setTimeout(() => loginEmailInput?.focus(), 0);
    return;
  }

  if (!planModal?.classList.contains("is-open")) {
    document.body.classList.remove("modal-open");
  }
};

const setLoginProviderStatus = (message, isError = false) => {
  if (!loginProviderStatus) {
    return;
  }

  loginProviderStatus.textContent = message;
  loginProviderStatus.classList.toggle("error", isError);
};

const syncLoginUseCaseSelection = () => {
  loginUseCaseOptions.forEach((option) => {
    option.closest(".login-onboarding__option")?.classList.toggle("is-selected", option.checked);
  });
};

const completeLoginSetup = () => {
  const selectedUseCase = document.querySelector('input[name="use-case"]:checked');
  if (!selectedUseCase) {
    setLoginProviderStatus("Iltimos, kamida bitta yo'nalishni tanlang.", true);
    return;
  }

  setAuthenticated(true);
  localStorage.setItem(loginProviderKey, "email-password");
  localStorage.setItem(loginUseCaseKey, selectedUseCase.value);
  localStorage.setItem("new-plan-marketing-opt-in", String(Boolean(loginMarketingCheck?.checked)));
  setLoginProviderStatus("Workspace ochilmoqda...");
  window.location.href = "workspace.html";
};

const setLoginStep = (step) => {
  loginStep = step;
  if (!loginPasswordWrap || !loginContinueButton || !loginOnboardingWrap) {
    return;
  }

  const isPasswordStep = step === 2;
  const isOnboardingStep = step === 3;
  loginPasswordWrap.hidden = !isPasswordStep;
  loginOnboardingWrap.hidden = !isOnboardingStep;
  loginContinueButton.textContent = isPasswordStep ? "Sign in" : "Continue";

  if (!isPasswordStep && loginPasswordInput) {
    loginPasswordInput.value = "";
  }

  if (!isOnboardingStep) {
    loginUseCaseOptions.forEach((option) => {
      option.checked = false;
    });
  }

  syncLoginUseCaseSelection();

  if (loginDivider) loginDivider.hidden = isOnboardingStep;
  if (loginProvidersWrap) loginProvidersWrap.hidden = isOnboardingStep;
  if (loginExisting) loginExisting.hidden = isOnboardingStep;

  if (loginFormTip) {
    if (isPasswordStep) {
      loginFormTip.textContent = "Enter your password to continue with your IT CENTER account.";
    } else if (isOnboardingStep) {
      loginFormTip.textContent = "Choose how you plan to use IT CENTER.";
    } else {
      loginFormTip.textContent = "Tip: Use your work email (if you have one) so it's easier for your team to join you on IT CENTER";
    }
  }
};

const closeLoginModal = () => {
  setLoginStep(1);
  setLoginProviderStatus("");
  setLoginModalState(false);
};

const createPlanModal = () => {
  if (!planTriggers.length) {
    return null;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "plan-modal";
  document.body.appendChild(wrapper);
  return wrapper;
};

const planModal = createPlanModal();

const renderModalShell = () => {
  if (!planModal) {
    return;
  }

  planModal.innerHTML = `
    <div class="plan-sheet">
      <div class="plan-sheet__top">
        <div>
          <p class="plan-sheet__eyebrow">${text().modal.eyebrow}</p>
          <h2 class="plan-sheet__title">${text().modal.title}</h2>
          <p class="plan-sheet__subtitle">${text().modal.subtitle}</p>
        </div>
        <button class="plan-close" type="button" aria-label="${text().modal.close}">X</button>
      </div>
      <form class="plan-form">
        <div class="plan-field">
          <label for="plan-title">${text().modal.planTitle}</label>
          <input id="plan-title" class="plan-input" name="title" type="text" placeholder="${text().modal.planTitlePlaceholder}">
        </div>
        <div class="plan-field">
          <label for="plan-text">${text().modal.planText}</label>
          <button class="plan-helper-button" type="button" data-plan-insert-toggle>${text().modal.insertToggle || "Insert toggle list"}</button>
          <textarea id="plan-text" class="plan-textarea" name="text" placeholder="${text().modal.planTextPlaceholder}" required></textarea>
        </div>
        <button class="button primary plan-submit" type="submit">${text().modal.save}</button>
      </form>
      <div class="plan-list-wrap">
        <h3 class="plan-list-title">${text().modal.listTitle}</h3>
        <div class="plan-list"></div>
      </div>
    </div>
    <div class="exit-notice" aria-hidden="true">
      <div class="exit-notice__glow"></div>
      <div class="exit-notice__card">
        <p class="exit-notice__eyebrow">${text().modal.eyebrow}</p>
        <h3 class="exit-notice__title">${text().modal.exitTitle || "Leave this page?"}</h3>
        <p class="exit-notice__text">${text().modal.exitText || "Your unsaved text may be lost."}</p>
        <div class="exit-notice__actions">
          <button class="button secondary exit-notice__stay" type="button">${text().modal.exitStay || "Stay"}</button>
          <button class="button primary exit-notice__leave" type="button">${text().modal.exitLeave || "Leave"}</button>
        </div>
      </div>
    </div>
  `;
};

renderModalShell();

const planForm = () => planModal?.querySelector(".plan-form");
const planTitleInput = () => planModal?.querySelector("#plan-title");
const planTextInput = () => planModal?.querySelector("#plan-text");
const planList = () => planModal?.querySelector(".plan-list");
const planSheetTitle = () => planModal?.querySelector(".plan-sheet__title");
const planSheetSubtitle = () => planModal?.querySelector(".plan-sheet__subtitle");
const exitNotice = () => planModal?.querySelector(".exit-notice");
const exitNoticeTitle = () => planModal?.querySelector(".exit-notice__title");
const exitNoticeText = () => planModal?.querySelector(".exit-notice__text");
const exitNoticeStay = () => planModal?.querySelector(".exit-notice__stay");
const exitNoticeLeave = () => planModal?.querySelector(".exit-notice__leave");
const inlinePlanList = () => document.querySelector("[data-inline-plan-list]");

const getPlans = () => {
  try {
    return JSON.parse(localStorage.getItem(planStorageKey) || "[]");
  } catch {
    return [];
  }
};

const savePlans = (items) => {
  localStorage.setItem(planStorageKey, JSON.stringify(items));
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatPlanDate = (value) =>
  new Date(value).toLocaleString(currentLanguage === "ru" ? "ru-RU" : currentLanguage === "en" ? "en-US" : "uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

const getPlanItemsMarkup = (items, emptyMessage = text().modal.empty) => {
  if (!items.length) {
    return `<p class="plan-empty">${emptyMessage}</p>`;
  }

  return items
    .slice()
    .reverse()
    .map(
      (item) => `
        <article class="plan-item">
          <div class="plan-item__meta">
            <span class="plan-item__context">${escapeHtml(item.context)}</span>
            <button class="plan-item__delete" type="button" data-plan-delete="${item.id}">${text().modal.delete}</button>
          </div>
          <h4 class="plan-item__title">${escapeHtml(item.title || text().modal.untitled)}</h4>
          <p class="plan-item__text">${escapeHtml(item.text).replace(/\n/g, "<br>")}</p>
          <p class="plan-item__date">${formatPlanDate(item.createdAt)}</p>
        </article>
      `
    )
    .join("");
};

const hasUnsavedPlanChanges = () => Boolean(planTitleInput()?.value.trim() || planTextInput()?.value.trim());

const openExitNotice = () => {
  const node = exitNotice();

  if (!node) {
    return;
  }

  exitNoticeOpen = true;
  node.classList.add("is-open");
  node.setAttribute("aria-hidden", "false");
};

const closeExitNotice = () => {
  const node = exitNotice();

  if (!node) {
    return;
  }

  exitNoticeOpen = false;
  node.classList.remove("is-open");
  node.setAttribute("aria-hidden", "true");
};

const renderPlans = () => {
  const listNode = planList();

  if (!listNode) {
    return;
  }

  const items = getPlans().filter((item) => item.context === activePlanContext);
  listNode.innerHTML = getPlanItemsMarkup(items);
};

const renderInlinePlans = () => {
  const listNode = inlinePlanList();

  if (!listNode) {
    return;
  }

  listNode.innerHTML = getPlanItemsMarkup(getPlans());
};

const updateThemeButton = () => {
  if (!themeToggle || !themeToggleIcon) {
    return;
  }

  const isDark = document.body.dataset.theme === "dark";
  themeToggleIcon.innerHTML = isDark ? sunIcon : moonIcon;
  themeToggle.setAttribute("aria-label", isDark ? text().themeDarkTitle : text().themeLightTitle);
  themeToggle.setAttribute("title", isDark ? text().themeDarkTitle : text().themeLightTitle);
};

const updateFooter = () => {
  const footer = q(".site-footer p");
  if (!footer || !yearElement) {
    return;
  }

  footer.innerHTML = `${text().footer[page] || "IT CENTER"} | <span id="year"></span>`;
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
};

const applyPageTranslations = () => {
  const pageText = text().pages[page];

  if (!pageText) {
    return;
  }

  document.title = pageText.title;
  document.documentElement.lang = currentLanguage;

  if (languageSelect) {
    languageSelect.value = currentLanguage;
    const options = languageSelect.querySelectorAll("option");
    options.forEach((option, index) => {
      option.textContent = languageOptionLabels[option.value] || text().languageOptions[index];
    });
  }

  const navText = text().nav;
  const navMap = {
    about: navText[0],
    focus: navText[1],
    roadmap: navText[2],
    note: navText[3]
  };
  navLinks.forEach((link) => {
    const navKey = link.dataset.i18n?.split(".").pop();
    if (navKey && navMap[navKey]) {
      link.textContent = navMap[navKey];
    }
  });

  const languageLabel = q(".language-switch__label");
  if (languageLabel) {
    languageLabel.textContent = text().languageLabel;
  }

  qa("[data-plan-trigger]").forEach((button) => {
    button.textContent = text().startPlan;
  });

  qa('.focus-card .button.secondary:not([data-plan-trigger])').forEach((button) => {
    button.textContent = text().openPage;
  });

  if (changeNoteButton) {
    changeNoteButton.textContent = text().noteButton;
  }

  const eyebrow = q(".eyebrow");
  const heroTitle = q(".hero-copy h1");
  const intro = q(".intro");

  if (eyebrow) eyebrow.textContent = pageText.eyebrow;
  if (heroTitle) heroTitle.textContent = pageText.h1;
  if (intro) intro.textContent = pageText.intro;

  if (page === "home") {
    const heroActions = qa(".hero-actions a");
    const summaryLabel = q(".summary-label");
    const summaryTexts = qa(".summary-text");
    const sectionTag = q(".section-heading .section-tag");
    const sectionTitle = q(".section-heading h2");
    const cards = qa(".focus-card");
    const homeActionMap = {
      roadmap: pageText.actions[0],
      focus: pageText.actions[1]
    };
    const homeCardMap = {
      project: pageText.cards[0],
      focus: pageText.cards[1],
      roadmap: pageText.cards[2],
      note: pageText.cards[3]
    };
    const profileCopy = profileText();
    const profileLabels = [
      q("#profile-name-label"),
      q("#profile-role-label"),
      q("#profile-goal-label"),
      q("#profile-email-label"),
      q("#profile-phone-label"),
      q("#profile-bio-label")
    ];
    const profileInputs = [profileNameInput, profileRoleInput, profileGoalInput, profileEmailInput, profilePhoneInput, profileBioInput];

    heroActions.forEach((actionLink) => {
      const actionKey = actionLink.dataset.homeAction;
      if (actionKey && homeActionMap[actionKey]) {
        actionLink.textContent = homeActionMap[actionKey];
      }
    });
    if (summaryLabel) summaryLabel.textContent = pageText.summaryLabel;
    summaryTexts.forEach((item, index) => {
      item.textContent = pageText.summary[index];
    });
    if (sectionTag) sectionTag.textContent = pageText.sectionTag;
    if (sectionTitle) sectionTitle.textContent = pageText.sectionTitle;
    cards.forEach((card) => {
      const cardKey = card.dataset.homeCard;
      const cardText = cardKey ? homeCardMap[cardKey] : null;
      const titleNode = card.querySelector("h3");
      const textNode = card.querySelector("p");
      if (titleNode && cardText) titleNode.textContent = cardText[0];
      if (textNode && cardText) textNode.textContent = cardText[1];
    });

    const profilePreviewTag = q(".profile-tag");
    const profileFormTag = q("#profile-form-tag");
    const profileFormTitle = q("#profile-form-title");
    const profileGoalLabel = q(".profile-meta__label");
    const profileEmailTitle = q("#profile-email-title");
    const profilePhoneTitle = q("#profile-phone-title");
    const profileSaveButton = q("#profile-save-button");

    if (profilePreviewTag) profilePreviewTag.textContent = profileCopy.previewTag;
    if (profileFormTag) profileFormTag.textContent = profileCopy.tag;
    if (profileFormTitle) profileFormTitle.textContent = profileCopy.title;
    if (profileGoalLabel) profileGoalLabel.textContent = profileCopy.goalLabel;
    if (profileEmailTitle) profileEmailTitle.textContent = profileCopy.emailLabel;
    if (profilePhoneTitle) profilePhoneTitle.textContent = profileCopy.phoneLabel;
    if (profileSaveButton) profileSaveButton.textContent = profileCopy.save;
    if (profileResetButton) profileResetButton.textContent = profileCopy.reset;

    profileLabels.forEach((labelNode, index) => {
      if (labelNode) {
        labelNode.textContent = profileCopy.labels[index];
      }
    });

    profileInputs.forEach((inputNode, index) => {
      if (inputNode) {
        inputNode.placeholder = profileCopy.placeholders[index];
      }
    });

    applyProfilePreview();
  }

  if (page === "about") {
    const cards = qa(".section-card");
    cards.forEach((card, index) => {
      card.querySelector(".section-tag").textContent = pageText.tags[index];
      card.querySelector("h2").textContent = pageText.titles[index];
      card.querySelector("p:not(.section-tag)").textContent = pageText.texts[index];
    });
  }

  if (page === "focus") {
    q(".section-heading .section-tag").textContent = pageText.sectionTag;
    q(".section-heading h2").textContent = pageText.sectionTitle;
    qa(".focus-card").forEach((card, index) => {
      card.querySelector("h3").textContent = pageText.cards[index][0];
      card.querySelector("p").textContent = pageText.cards[index][1];
    });
  }

  if (page === "roadmap") {
    q(".section-heading .section-tag").textContent = pageText.sectionTag;
    q(".section-heading h2").textContent = pageText.sectionTitle;
    qa(".timeline-item").forEach((item, index) => {
      item.querySelector("h3").textContent = pageText.steps[index][0];
      item.querySelector("p").textContent = pageText.steps[index][1];
    });
  }

  if (page === "note") {
    const tag = q(".note-panel .section-tag");
    const title2 = q(".note-panel h2");
    if (tag) tag.textContent = pageText.tag;
    if (title2) title2.textContent = pageText.title2;
    if (noteText) {
      noteText.textContent = text().notes[currentNoteIndex];
    }
  }

  updateFooter();
  updateThemeButton();
  renderModalShell();
  if (activePlanContext) {
    const titleNode = planSheetTitle();
    const subtitleNode = planSheetSubtitle();
    if (titleNode) titleNode.textContent = text().modal.contextTitle.replace("{context}", activePlanContext);
    if (subtitleNode) subtitleNode.textContent = text().modal.contextSubtitle.replace("{context}", activePlanContext.toLowerCase());
    renderPlans();
  }

  if (exitNoticeTitle()) exitNoticeTitle().textContent = text().modal.exitTitle || "Leave this page?";
  if (exitNoticeText()) exitNoticeText().textContent = text().modal.exitText || "Your unsaved text may be lost.";
  if (exitNoticeStay()) exitNoticeStay().textContent = text().modal.exitStay || "Stay";
  if (exitNoticeLeave()) exitNoticeLeave().textContent = text().modal.exitLeave || "Leave";
  renderInlinePlans();
};

const openPlanModal = (context) => {
  if (!planModal || !planTextInput()) {
    return;
  }

  if (!planModal.classList.contains("is-open")) {
    modalHistoryLocked = true;
    modalHistoryTrapCount = 2;
    history.pushState({ planModal: true, page, trap: 1 }, "", window.location.href);
    history.pushState({ planModal: true, page, trap: 2 }, "", window.location.href);
  }

  activePlanContext = context;
  planSheetTitle().textContent = text().modal.contextTitle.replace("{context}", context);
  planSheetSubtitle().textContent = text().modal.contextSubtitle.replace("{context}", context.toLowerCase());
  planTitleInput().value = "";
  planTextInput().value = "";
  renderPlans();
  closeExitNotice();
  planModal.classList.add("is-open");
  document.body.classList.add("modal-open");
  planTextInput().focus();
};

const closePlanModal = () => {
  if (!planModal) {
    return;
  }

  modalHistoryLocked = false;
  modalHistoryTrapCount = 0;
  closeExitNotice();
  planModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  if (history.state?.planModal) {
    suppressModalPop = true;
    history.back();
    window.setTimeout(() => {
      suppressModalPop = false;
    }, 0);
  }
};

const insertPlanToggleTemplate = () => {
  const input = planTextInput();
  if (!input) {
    return;
  }

  const template = text().modal.toggleTemplate || "Toggle heading\n  - Nested item";
  const currentValue = input.value.trimEnd();
  input.value = currentValue ? `${currentValue}\n\n${template}` : template;
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
};

const normalizeExternalUrl = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return "";
  }

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }

    return parsed.toString();
  } catch {
    return "";
  }
};

const getExternalUrlLabel = (value) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "") || "Linked image";
  } catch {
    return "Linked image";
  }
};

const createHomeImageId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const revokeHomeImagePreviewUrls = () => {
  homeImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  homeImagePreviewUrls = [];
};

const getHomeImageFocusTarget = () => {
  if (activeHomeImageTab === "link") return homeImageLinkInput;
  if (activeHomeImageTab === "unsplash") return homeImageUnsplashInput;
  if (activeHomeImageTab === "giphy") return homeImageGiphyInput;
  return homeImageUploadButton;
};

const renderHomeImageTabs = () => {
  homeImageTabs.forEach((tabNode) => {
    const isActive = tabNode.dataset.homeImageTab === activeHomeImageTab;
    tabNode.classList.toggle("is-active", isActive);
    tabNode.setAttribute("aria-selected", String(isActive));
  });

  homeImageViews.forEach((viewNode) => {
    viewNode.hidden = viewNode.dataset.homeImageView !== activeHomeImageTab;
  });
};

const renderHomeImageGallery = () => {
  if (!homeImageGallery) {
    return;
  }

  revokeHomeImagePreviewUrls();
  homeImageGallery.replaceChildren();

  if (!homeImageItems.length) {
    activeHomeImageId = "";
    if (homeImageStage) {
      homeImageStage.hidden = true;
    }
    homeImageGallery.hidden = true;
    return;
  }

  const featuredItem = homeImageItems.find((item) => item.id === activeHomeImageId) || homeImageItems[0];
  activeHomeImageId = featuredItem.id;

  if (homeImageStage && homeImageStageImage) {
    const featuredUrl = featuredItem.blob instanceof Blob
      ? URL.createObjectURL(featuredItem.blob)
      : featuredItem.url;

    if (featuredItem.blob instanceof Blob && featuredUrl) {
      homeImagePreviewUrls.push(featuredUrl);
    }

    homeImageStage.hidden = false;
    homeImageStageImage.src = featuredUrl;
    homeImageStageImage.alt = featuredItem.name || "Image";
  }

  const remainingItems = homeImageItems.filter((item) => item.id !== featuredItem.id);
  homeImageGallery.hidden = remainingItems.length === 0;

  remainingItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "home-image-gallery__item";
    card.dataset.homeImageSelect = item.id;
    card.tabIndex = 0;
    card.role = "button";
    card.setAttribute("aria-label", `${item.name || "Image"} rasmini ko'rsatish`);

    const preview = document.createElement("div");
    preview.className = "home-image-gallery__media";

    const mediaUrl = item.blob instanceof Blob
      ? URL.createObjectURL(item.blob)
      : item.url;

    if (item.blob instanceof Blob && mediaUrl) {
      homeImagePreviewUrls.push(mediaUrl);
    }

    const image = document.createElement("img");
    image.src = mediaUrl;
    image.alt = item.name || "Image";
    image.loading = "lazy";
    preview.appendChild(image);

    const meta = document.createElement("div");
    meta.className = "home-image-gallery__meta";

    const source = document.createElement("span");
    source.className = "home-image-gallery__source";
    source.textContent = item.source;

    const removeButton = document.createElement("button");
    removeButton.className = "home-image-gallery__remove";
    removeButton.type = "button";
    removeButton.dataset.homeImageRemove = item.id;
    removeButton.setAttribute("aria-label", "Remove image");
    removeButton.textContent = "x";

    meta.append(source, removeButton);

    const name = document.createElement("p");
    name.className = "home-image-gallery__name";
    name.textContent = item.name || "Image";

    card.append(preview, meta, name);
    homeImageGallery.appendChild(card);
  });
};

const addHomeImageItem = ({ source, url = "", blob = null, name = "" }) => {
  const item = {
    id: createHomeImageId(),
    source,
    url,
    blob,
    name: name || (url ? getExternalUrlLabel(url) : "Image")
  };

  activeHomeImageId = item.id;
  homeImageItems = [item, ...homeImageItems];

  renderHomeImageGallery();
  homeImageStage?.scrollIntoView({ behavior: "smooth", block: "nearest" });
};

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

applyPageTranslations();

if (homeImagePanel) {
  renderHomeImageTabs();
  renderHomeImageGallery();

  homeImageTabs.forEach((tabNode) => {
    tabNode.addEventListener("click", () => {
      activeHomeImageTab = tabNode.dataset.homeImageTab || "upload";
      renderHomeImageTabs();
      const focusTarget = getHomeImageFocusTarget();
      focusTarget?.focus();
      if (typeof focusTarget?.select === "function") {
        focusTarget.select();
      }
    });
  });

  homeImageLauncher?.addEventListener("click", () => {
    if (activeHomeImageTab === "upload") {
      homeImageUploadButton?.click();
      return;
    }

    const focusTarget = getHomeImageFocusTarget();
    focusTarget?.focus();
    if (typeof focusTarget?.select === "function") {
      focusTarget.select();
    }
  });

  homeImageUploadButton?.addEventListener("click", () => {
    if (!homeImageInput) {
      return;
    }

    homeImageInput.value = "";
    homeImageInput.click();
  });

  homeImageInput?.addEventListener("change", () => {
    const selectedFiles = Array.from(homeImageInput.files || []);
    if (!selectedFiles.length) {
      return;
    }

    selectedFiles.forEach((file) => {
      addHomeImageItem({
        source: "Upload",
        blob: file,
        name: file.name
      });
    });
  });

  homeImageLinkForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = normalizeExternalUrl(homeImageLinkInput?.value || "");
    if (!url) {
      homeImageLinkInput?.focus();
      return;
    }

    addHomeImageItem({
      source: "Link",
      url
    });
    if (homeImageLinkInput) {
      homeImageLinkInput.value = "";
      homeImageLinkInput.focus();
    }
  });

  homeImageUnsplashForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = normalizeExternalUrl(homeImageUnsplashInput?.value || "");
    if (!url) {
      homeImageUnsplashInput?.focus();
      return;
    }

    addHomeImageItem({
      source: "Unsplash",
      url,
      name: `${getExternalUrlLabel(url)} image`
    });
    if (homeImageUnsplashInput) {
      homeImageUnsplashInput.value = "";
      homeImageUnsplashInput.focus();
    }
  });

  homeImageGiphyForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = normalizeExternalUrl(homeImageGiphyInput?.value || "");
    if (!url) {
      homeImageGiphyInput?.focus();
      return;
    }

    addHomeImageItem({
      source: "GIPHY",
      url,
      name: `${getExternalUrlLabel(url)} gif`
    });
    if (homeImageGiphyInput) {
      homeImageGiphyInput.value = "";
      homeImageGiphyInput.focus();
    }
  });

  homeImageGallery?.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-home-image-remove]");
    if (removeButton) {
      const targetId = removeButton.dataset.homeImageRemove;
      if (!targetId) {
        return;
      }

      if (targetId === activeHomeImageId) {
        const nextItem = homeImageItems.find((item) => item.id !== targetId);
        activeHomeImageId = nextItem?.id || "";
      }

      homeImageItems = homeImageItems.filter((item) => item.id !== targetId);
      renderHomeImageGallery();
      return;
    }

    const selectCard = event.target.closest("[data-home-image-select]");
    if (!selectCard) {
      return;
    }

    const targetId = selectCard.dataset.homeImageSelect;
    if (!targetId) {
      return;
    }

    activeHomeImageId = targetId;
    renderHomeImageGallery();
    homeImageStage?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  homeImageGallery?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const selectCard = event.target.closest("[data-home-image-select]");
    if (!selectCard) {
      return;
    }

    event.preventDefault();
    const targetId = selectCard.dataset.homeImageSelect;
    if (!targetId) {
      return;
    }

    activeHomeImageId = targetId;
    renderHomeImageGallery();
    homeImageStage?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (
    (page === "about" && href === "about.html") ||
    (page === "focus" && href === "focus.html") ||
    (page === "roadmap" && href === "roadmap.html") ||
    (page === "note" && href === "note.html")
  ) {
    link.classList.add("active");
  }
});

if (changeNoteButton && noteText) {
  changeNoteButton.addEventListener("click", () => {
    currentNoteIndex = (currentNoteIndex + 1) % text().notes.length;
    noteText.textContent = text().notes[currentNoteIndex];
  });
}

if (profileForm) {
  fillProfileForm();
  applyProfilePreview();

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = {
      name: profileNameInput?.value.trim() || "",
      role: profileRoleInput?.value.trim() || "",
      goal: profileGoalInput?.value.trim() || "",
      email: profileEmailInput?.value.trim() || "",
      phone: profilePhoneInput?.value.trim() || "",
      bio: profileBioInput?.value.trim() || ""
    };

    saveProfile(profile);
    applyProfilePreview(profile);
    updateLoginButtonState();
  });
}

if (profileResetButton && profileForm) {
  profileResetButton.addEventListener("click", () => {
    profileForm.reset();
    const emptyProfile = { name: "", role: "", goal: "", email: "", phone: "", bio: "" };
    saveProfile(emptyProfile);
    applyProfilePreview(emptyProfile);
    updateLoginButtonState();
  });
}

if (profileMenuToggle && profileMenuPanel) {
  setProfileMenuState(false);

  profileMenuToggle.addEventListener("click", () => {
    const isOpen = profileMenuToggle.getAttribute("aria-expanded") === "true";
    setProfileMenuState(!isOpen);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile-menu")) {
      setProfileMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setProfileMenuState(false);
    }
  });
}

if (loginOpenButton && loginModal) {
  setLoginModalState(false);
  setLoginStep(1);
  updateLoginButtonState();

  loginOpenButton.addEventListener("click", () => {
    setProfileMenuState(false);

    if (isAuthenticated()) {
      window.location.href = "workspace.html";
      return;
    }

    setLoginStep(1);
    setLoginModalState(true);
    setLoginProviderStatus("");
  });

  loginCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeLoginModal();
    });
  });

  loginModal.addEventListener("click", (event) => {
    if (event.target === loginModal) {
      closeLoginModal();
    }
  });
}

if (loginCloseButton) {
  loginCloseButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeLoginModal();
    window.location.replace("index.html");
  });
}

document.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("[data-login-close]");
  if (!closeTarget) {
    return;
  }

  closeLoginModal();

  if (closeTarget.id === "login-close-button") {
    window.location.assign("index.html");
  }
});

if (loginForm && loginEmailInput) {
  const storedLoginEmail = localStorage.getItem(loginStorageKey) || localStorage.getItem(legacyLoginStorageKey);
  if (storedLoginEmail) {
    loginEmailInput.value = storedLoginEmail;
    localStorage.setItem(loginStorageKey, storedLoginEmail);
    if (localStorage.getItem(loginUseCaseKey) || localStorage.getItem(loginProviderKey)) {
      setAuthenticated(true);
      updateLoginButtonState();
    }
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginEmailInput.value.trim();

    if (!email) {
      loginEmailInput.focus();
      return;
    }

    localStorage.setItem(loginStorageKey, email);
    const profile = getProfile();
    const nextProfile = { ...profile, email };
    saveProfile(nextProfile);
    if (profileEmailInput) {
      profileEmailInput.value = email;
    }
    applyProfilePreview(nextProfile);

    if (loginStep === 1) {
      setLoginStep(2);
      setLoginProviderStatus("Endi parolni kiriting.");
      loginPasswordInput?.focus();
      return;
    }

    const password = loginPasswordInput?.value.trim() || "";
    if (password.length < 4) {
      setLoginProviderStatus("Parol kamida 4 ta belgidan iborat bo'lsin.", true);
      loginPasswordInput?.focus();
      return;
    }

    if (loginStep === 2) {
      setLoginStep(3);
      setLoginProviderStatus("Endi o'zingizga mos yo'nalishni tanlang.");
      return;
    }

    completeLoginSetup();
  });
}

if (loginUseCaseOptions.length) {
  loginUseCaseOptions.forEach((option) => {
    option.addEventListener("change", () => {
      syncLoginUseCaseSelection();

      if (loginStep === 3 && option.checked) {
        completeLoginSetup();
      }
    });
  });
}

if (loginProviderButtons.length) {
  const providerLoginUrls = {
    google: "https://accounts.google.com/signin",
    apple: "https://appleid.apple.com/sign-in",
    microsoft: "https://login.live.com"
  };

  loginProviderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const provider = button.dataset.provider;
      if (!provider) {
        return;
      }

      const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1);
      const email = loginEmailInput?.value.trim() || localStorage.getItem(loginStorageKey) || "";

      if (email) {
        localStorage.setItem(loginStorageKey, email);
        const profile = getProfile();
        const nextProfile = { ...profile, email };
        saveProfile(nextProfile);
        if (profileEmailInput) {
          profileEmailInput.value = email;
        }
        applyProfilePreview(nextProfile);
      }

      setAuthenticated(true);
      localStorage.setItem(loginProviderKey, provider);
      updateLoginButtonState();

      if (provider === "passkey") {
        if (!window.PublicKeyCredential) {
          setLoginProviderStatus("Passkey bu brauzerda qo'llab-quvvatlanmaydi.", true);
          return;
        }

        setLoginProviderStatus("Passkey tayyor. Qurilmangiz orqali tasdiqlang.");
        return;
      }

      if (provider === "sso") {
        const ssoOrg = window.prompt("SSO tashkilot nomi yoki domenini kiriting:");
        if (!ssoOrg || !ssoOrg.trim()) {
          setLoginProviderStatus("SSO uchun tashkilot nomi kiritilmadi.", true);
          return;
        }

        localStorage.setItem("new-plan-sso-org", ssoOrg.trim());
        setLoginProviderStatus(`SSO tanlandi: ${ssoOrg.trim()}`);
        return;
      }

      const loginUrl = providerLoginUrls[provider];
      if (loginUrl) {
        window.open(loginUrl, "_blank", "noopener,noreferrer");
        setLoginProviderStatus(`${providerLabel} login oynasi ochildi.`);
        return;
      }

      setLoginProviderStatus(`${providerLabel} ulanishi tayyorlandi.`);
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && loginModal && !loginModal.hidden) {
    closeLoginModal();
  }
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (modalHistoryLocked) {
      return;
    }
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeButton();
  });
}

if (languageSelect) {
  languageSelect.value = currentLanguage;
  languageSelect.addEventListener("change", () => {
    if (modalHistoryLocked) {
      languageSelect.value = currentLanguage;
      return;
    }
    currentLanguage = languageSelect.value;
    localStorage.setItem("language", currentLanguage);
    currentNoteIndex = 0;
    applyPageTranslations();
  });
}

workspaceLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (link.target === "_blank") {
      return;
    }

    event.preventDefault();
    openWorkspaceFromLink(link);
  });
});

workspaceCards.forEach((card) => {
  const link = card.querySelector("[data-workspace-link]");
  if (!link) {
    return;
  }

  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button, input, select, textarea, label")) {
      return;
    }

    event.preventDefault();
    openWorkspaceFromLink(link);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openWorkspaceFromLink(link);
  });
});

planTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const card = trigger.closest(".section-card, .focus-card, .timeline-item, .note-panel");
    const context = trigger.dataset.planContext || card?.querySelector("h3, h2")?.textContent || "Plan";
    openPlanModal(context);
  });
});

if (planModal) {
  planModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-plan-insert-toggle]")) {
      insertPlanToggleTemplate();
      return;
    }

    if (event.target.closest(".plan-close")) {
      if (hasUnsavedPlanChanges()) {
        openExitNotice();
      } else {
        closePlanModal();
      }
    }

    if (event.target.closest(".exit-notice__stay")) {
      closeExitNotice();
      planTextInput()?.focus();
    }

    if (event.target.closest(".exit-notice__leave")) {
      closePlanModal();
    }
  });
}

window.addEventListener("popstate", () => {
  if (suppressModalPop) {
    return;
  }

  if (modalHistoryLocked && planModal?.classList.contains("is-open")) {
    modalHistoryTrapCount += 1;
    history.pushState({ planModal: true, page, trap: modalHistoryTrapCount }, "", window.location.href);
    window.setTimeout(() => {
      if (modalHistoryLocked) {
        history.go(1);
      }
    }, 0);
  }
});

document.addEventListener("submit", (event) => {
  const currentPlanForm = planForm();
  if (!currentPlanForm || event.target !== currentPlanForm) {
    return;
  }

  event.preventDefault();
  const textValue = planTextInput().value.trim();
  const titleValue = planTitleInput().value.trim();

  if (!textValue) {
    planTextInput().focus();
    return;
  }

  const items = getPlans();
  items.push({
    id: Date.now().toString(),
    context: activePlanContext,
    title: titleValue,
    text: textValue,
    createdAt: new Date().toISOString()
  });
  savePlans(items);
  planForm().reset();
  renderPlans();
  renderInlinePlans();
  planTextInput().focus();
});

document.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-plan-delete]");
  if (!deleteButton) {
    return;
  }

  const nextItems = getPlans().filter((item) => item.id !== deleteButton.dataset.planDelete);
  savePlans(nextItems);
  renderPlans();
  renderInlinePlans();
});

document.addEventListener("click", (event) => {
  if (!modalHistoryLocked || !planModal?.classList.contains("is-open")) {
    return;
  }

  const allowedTarget = event.target.closest(".plan-sheet, .exit-notice__card");
  if (allowedTarget) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
}, true);

document.addEventListener("keydown", (event) => {
  if (!modalHistoryLocked || !planModal?.classList.contains("is-open")) {
    return;
  }

  const blockedKey =
    event.key === "F5" ||
    (event.altKey && event.key === "ArrowLeft") ||
    ((event.ctrlKey || event.metaKey) && ["r", "R", "w", "W"].includes(event.key));

  if (blockedKey) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (exitNoticeOpen && event.key === "Escape") {
    event.preventDefault();
    closeExitNotice();
    planTextInput()?.focus();
  }
}, true);
