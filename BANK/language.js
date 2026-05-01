const LANGUAGE_KEY = "bank-language";
const SUPPORTED_LANGUAGES = ["uz", "ru", "en"];
const languageRoot = document.documentElement;
const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
const languageSwitcher = document.querySelector("[data-language-switcher]");
const languageToggle = document.querySelector("[data-language-toggle]");

const uiTranslations = {
  uz: {
    meta: {
      homeTitle: "Maktab Fanlari",
      courseTitle: "Fan Tafsiloti",
      paymentTitle: "Fan To'lovlari",
      registerTitle: "Fanga Ro'yxatdan O'tish"
    },
    bank: {
      brandTop: "",
      brandMain: "Bank",
      contactPhone: "Aloqa telefon raqami",
      hotline: "Ishonch telefoni"
    },
    index: {
      sectionLabel: "Fanlar",
      sectionTitle: "Faningizni tanlang",
      sectionText:
        "O'quvchi o'rganmoqchi bo'lgan maktab fanini tanlaydi va keyingi sahifada batafsil ma'lumot, reja va to'lov variantlarini ko'radi.",
      openCourseAria: "{title} fanini ochish",
      sectionsLabel: "Bo'limlar",
      sections: {
        courses: "Fanlar",
        coursesMeta: "Guruh holati",
        team: "Jamoa",
        teamMeta: "Vazifalar",
        news: "E'lonlar",
        newsMeta: "Markaz xabarlari"
      }
    },
    detail: {
      loading: "Fan ma'lumotlari yuklanmoqda...",
      notFoundTag: "Topilmadi",
      notFoundTitle: "Bunday fan topilmadi",
      notFoundText:
        "Havola noto'g'ri bo'lishi mumkin. Fanlar ro'yxatiga qaytib, yo'nalishni qayta tanlang.",
      backToCourses: "Fanlar ro'yxatiga qaytish",
      chooseCareer: "Men shu fanni o'rganmoqchiman",
      backAll: "Barcha fanlarga qaytish",
      backToCoursePage: "Fan sahifasiga qaytish",
      brief: "Qisqacha",
      duration: "Davomiyligi",
      format: "Format",
      fullPrice: "To'liq narx",
      monthly: "Oyma-oy",
      teacher: "O'qituvchi",
      teacherInfo: "Qisqacha ma'lumot",
      teacherCertificate: "Sertifikati",
      teacherCertified: "Bor",
      teacherNotCertified: "Yo'q",
      teacherCertificateUnknown: "Kiritilmagan",
      teacherUploadCertificate: "Sertifikat yuklash",
      teacherChangeCertificate: "Sertifikatni almashtirish",
      teacherCertificateHint: "PNG, JPG yoki PDF sertifikat yuklang",
      teacherCertificateView: "Ko'rish",
      teacherCertificateSelected: "Yuklangan fayl",
      teacherPhotoPlaceholder: "Rasm joyi",
      teacherUploadPhoto: "Rasm yuklash",
      teacherChangePhoto: "Rasmni almashtirish",
      teacherUploadHint: "+ tugmasini bosib rasm tanlang",
      teacherNameFallback: "O'qituvchi ismi",
      teacherBioFallback:
        "{course} bo'yicha o'qituvchi haqida qisqacha ma'lumot shu yerga yoziladi.",
      whatYouGet: "Fan davomida nimalarni o'rganasiz",
      result: "Natija",
      paymentOptions: "To'lov variantlari",
      applyPay: "Ariza va to'lov",
      register: "Ro'yxatdan o'tish",
      paymentPageTitle: "To'lov sahifasi",
      paymentPageIntro:
        "Tanlangan fan uchun tarifni belgilang va to'lov usulini shu sahifada alohida tanlang.",
      paymentPageMethodsIntro:
        "Avval tarifni tanlang, keyin quyidagi usullardan biri bilan demo to'lovni boshlang.",
      registerPageTitle: "Ro'yxatdan o'tish",
      registerPageIntro:
        "Arizani alohida to'ldiring. Tanlangan tarif saqlanadi va keyin to'lov sahifasiga o'tishingiz mumkin.",
      openPaymentsPage: "To'lov sahifasi",
      openRegistrationPage: "Ro'yxatdan o'tish sahifasi",
      choosePlanFirst: "Avval tarifni ko'rish",
      formIntro:
        "Ma'lumotlaringizni qoldiring. Siz tanlagan tarif bilan operator bog'lanadi yoki bu joyga keyinchalik Click, Payme, Stripe kabi real to'lov integratsiyasini ulash mumkin.",
      formIntroSeparate:
        "Ma'lumotlaringizni qoldiring. Ariza yuborilgach operator siz bilan bog'lanadi, to'lov esa alohida sahifada bajariladi.",
      firstName: "Ismingiz",
      firstNamePlaceholder: "Ismingizni kiriting",
      lastName: "Familiyangiz",
      lastNamePlaceholder: "Familiyangizni kiriting",
      name: "Ism familiyangiz",
      namePlaceholder: "Ism familiyangizni kiriting",
      phone: "Telefon raqamingiz",
      phonePlaceholder: "+998 00 000 00 00",
      phoneValidation: "Telefon raqamini +998 00 000 00 00 formatida kiriting",
      studyMode: "O'qish formati",
      startDate: "Boshlanish sanasi",
      paymentMethod: "To'lov usuli",
      paymentsTitle: "To'lovlar",
      paymentsText: "Quyidagi usullardan birini tanlang",
      startPayment: "To'lovni boshlash",
      paymentDemoTitle: "To'lov oynasi",
      paymentDemoText: "Tanlangan usul uchun demo to'lov bo'limi ochildi.",
      payingForLabel: "To'lov qilinayotgan fan",
      senderLabel: "Jo'natuvchi",
      receiverLabel: "Qabul qiluvchi",
      receiverPlaceholder: "0000 0000 0000 0000",
      receiverHelp: "Qabul qiluvchi karta raqamini kiriting",
      receiverValidation: "Karta raqamini 16 ta raqam bilan kiriting",
      confirmPayment: "To'lovni tasdiqlash",
      closePayment: "Yopish",
      receiptUploadTitle: "Chekni yuklash",
      receiptUploadIntro:
        "{course} fani uchun {plan} tarifi bo'yicha to'lov tasdiqlandi. Endi chek faylini yuklang.",
      receiptFileLabel: "Chek fayli",
      receiptUploadFormats: "PNG, JPG yoki PDF formatdagi chekni yuklang",
      receiptUploadButton: "Chekni yuborish",
      receiptUploaded: "Chek yuklandi",
      receiptUploadSuccessMessage:
        "{course} fani uchun {plan} tarifi bo'yicha chek qabul qilindi: {fileName}.",
      receiptSelectedFile: "Tanlangan fayl: {fileName}",
      receiptRequired: "Avval chek faylini tanlang",
      selectedCourse: "Tanlangan fan",
      summaryIntro:
        "Quyidagi ma'lumot foydalanuvchi tanlagan fan va tarif asosida avtomatik yangilanadi.",
      course: "Fan",
      plan: "Tarif",
      price: "Narx",
      note: "Izoh",
      registerSummaryIntro:
        "Quyidagi ma'lumot tanlangan fan va tarif bo'yicha ro'yxatdan o'tish uchun tayyorlangan.",
      summaryNoteText:
        "Keyinchalik shu blokka promo-kod, chegirma yoki real payment gateway javoblari ham ulanadi.",
      applicationAccepted: "Ariza qabul qilindi",
      applicationSubmittedNote: "Sizning arizangiz yuborildi. Bir necha vaqtdan so'ng qabul qilinasiz.",
      registrationAccepted: "Ro'yxatdan o'tish qabul qilindi",
      paymentAccepted: "To'lov so'rovi yaratildi",
      successMessage:
        "{name}, siz {course} fani uchun {plan} tarifini tanladingiz. To'lov usuli: {paymentMethod}. Operator siz bilan {phone} raqami orqali bog'lanadi. O'qish formati: {studyMode}.",
      registrationSuccessMessage:
        "{name}, siz {course} fani uchun {plan} tarif bo'yicha ariza yubordingiz. Operator siz bilan {phone} raqami orqali bog'lanadi. O'qish formati: {studyMode}.",
      paymentSuccessMessage:
        "{course} fani uchun {plan} tarifi va {paymentMethod} usuli bo'yicha demo to'lov oynasi tayyor.",
      submitApplication: "Arizani yuborish",
      openAdminApplications: "Admin panelni ochish",
      goToPaymentPage: "To'lov sahifasiga o'tish",
      changePlan: "Tarifni o'zgartirish",
      studyModes: {
        offline: "Offline",
        online: "Online",
        hybrid: "Aralash"
      },
      paymentMethods: {
        click: "Click",
        payme: "Payme",
        humo: "Hazna",
        uzcard: "Paynet",
        card: "Bank karta",
        center: "Markazda to'lash"
      }
    }
  },
  ru: {
    meta: {
      homeTitle: "Школьные предметы",
      courseTitle: "Детали предмета",
      paymentTitle: "Оплата предмета",
      registerTitle: "Запись на предмет"
    },
    bank: {
      brandTop: "",
      brandMain: "Банк",
      contactPhone: "Контактный телефон",
      hotline: "Телефон доверия"
    },
    index: {
      sectionLabel: "Предметы",
      sectionTitle: "Выберите предмет",
      sectionText:
        "Ученик выбирает школьный предмет, открывает нужную карточку и переходит на страницу с подробной информацией и вариантами оплаты.",
      openCourseAria: "Открыть предмет {title}",
      sectionsLabel: "Разделы",
      sections: {
        courses: "Предметы",
        coursesMeta: "Состояние групп",
        team: "Команда",
        teamMeta: "Задачи",
        news: "Объявления",
        newsMeta: "Новости центра"
      }
    },
    detail: {
      loading: "Данные по предмету загружаются...",
      notFoundTag: "Не найдено",
      notFoundTitle: "Такой предмет не найден",
      notFoundText:
        "Ссылка может быть неверной. Вернитесь к списку предметов и выберите направление заново.",
      backToCourses: "Вернуться к списку предметов",
      chooseCareer: "Я хочу изучать этот предмет",
      backAll: "Вернуться ко всем предметам",
      backToCoursePage: "Назад к предмету",
      brief: "Кратко",
      duration: "Длительность",
      format: "Формат",
      fullPrice: "Полная стоимость",
      monthly: "Помесячно",
      teacher: "Преподаватель",
      teacherInfo: "Краткая информация",
      teacherCertificate: "Сертификат",
      teacherCertified: "Есть",
      teacherNotCertified: "Нет",
      teacherCertificateUnknown: "Не указано",
      teacherUploadCertificate: "Загрузить сертификат",
      teacherChangeCertificate: "Сменить сертификат",
      teacherCertificateHint: "Загрузите сертификат в PNG, JPG или PDF",
      teacherCertificateView: "Открыть",
      teacherCertificateSelected: "Загруженный файл",
      teacherPhotoPlaceholder: "Место для фото",
      teacherUploadPhoto: "Загрузить фото",
      teacherChangePhoto: "Сменить фото",
      teacherUploadHint: "Нажмите +, чтобы выбрать фото",
      teacherNameFallback: "Имя преподавателя",
      teacherBioFallback:
        "Здесь можно указать краткую информацию о преподавателе по предмету {course}.",
      whatYouGet: "Что вы изучите по предмету",
      result: "Результат",
      paymentOptions: "Варианты оплаты",
      applyPay: "Заявка и оплата",
      register: "Регистрация",
      paymentPageTitle: "Страница оплаты",
      paymentPageIntro:
        "Выберите тариф для предмета и отдельно настройте способ оплаты на этой странице.",
      paymentPageMethodsIntro:
        "Сначала выберите тариф, затем запустите демо-оплату одним из способов ниже.",
      registerPageTitle: "Регистрация",
      registerPageIntro:
        "Заполните заявку отдельно. Выбранный тариф сохранится, и затем вы сможете перейти к оплате.",
      openPaymentsPage: "Страница оплаты",
      openRegistrationPage: "Страница регистрации",
      choosePlanFirst: "Сначала выбрать тариф",
      formIntro:
        "Оставьте свои данные. Оператор свяжется с вами по выбранному тарифу, а позже сюда можно подключить реальную оплату через Click, Payme или Stripe.",
      formIntroSeparate:
        "Оставьте свои данные. После отправки заявки оператор свяжется с вами, а оплата выполняется на отдельной странице.",
      firstName: "Имя",
      firstNamePlaceholder: "Введите имя",
      lastName: "Фамилия",
      lastNamePlaceholder: "Введите фамилию",
      name: "Ваше имя",
      namePlaceholder: "Введите ваше имя",
      phone: "Ваш номер телефона",
      phonePlaceholder: "+998 00 000 00 00",
      phoneValidation: "Введите номер в формате +998 00 000 00 00",
      studyMode: "Формат обучения",
      startDate: "Дата старта",
      paymentMethod: "Способ оплаты",
      paymentsTitle: "Платежи",
      paymentsText: "Выберите один из способов ниже",
      startPayment: "Начать оплату",
      paymentDemoTitle: "Окно оплаты",
      paymentDemoText: "Открыт демо-блок оплаты для выбранного способа.",
      payingForLabel: "Какой предмет оплачивается",
      senderLabel: "Отправитель",
      receiverLabel: "Получатель",
      receiverPlaceholder: "0000 0000 0000 0000",
      receiverHelp: "Введите номер карты получателя",
      receiverValidation: "Введите 16-значный номер карты",
      confirmPayment: "Подтвердить оплату",
      closePayment: "Закрыть",
      receiptUploadTitle: "Загрузить чек",
      receiptUploadIntro:
        "Оплата по тарифу {plan} для предмета {course} подтверждена. Теперь загрузите файл чека.",
      receiptFileLabel: "Файл чека",
      receiptUploadFormats: "Загрузите чек в формате PNG, JPG или PDF",
      receiptUploadButton: "Отправить чек",
      receiptUploaded: "Чек загружен",
      receiptUploadSuccessMessage:
        "Чек по предмету {course} и тарифу {plan} принят: {fileName}.",
      receiptSelectedFile: "Выбранный файл: {fileName}",
      receiptRequired: "Сначала выберите файл чека",
      selectedCourse: "Выбранный предмет",
      summaryIntro:
        "Информация ниже автоматически обновляется по выбранному предмету и тарифу.",
      course: "Предмет",
      plan: "Тариф",
      price: "Цена",
      note: "Комментарий",
      registerSummaryIntro:
        "Ниже показаны данные для регистрации по выбранному предмету и тарифу.",
      summaryNoteText:
        "Позже сюда можно добавить промокоды, скидки и ответы от реального платежного сервиса.",
      applicationAccepted: "Заявка отправлена",
      applicationSubmittedNote: "Ваша заявка отправлена. В течение некоторого времени она будет обработана.",
      registrationAccepted: "Регистрация отправлена",
      paymentAccepted: "Платежный запрос создан",
      successMessage:
        "{name}, вы выбрали предмет {course} по тарифу {plan}. Способ оплаты: {paymentMethod}. Оператор свяжется с вами по номеру {phone}. Формат обучения: {studyMode}.",
      registrationSuccessMessage:
        "{name}, вы отправили заявку на предмет {course} по тарифу {plan}. Оператор свяжется с вами по номеру {phone}. Формат обучения: {studyMode}.",
      paymentSuccessMessage:
        "Для предмета {course} подготовлено демо-окно оплаты по тарифу {plan} и способу {paymentMethod}.",
      submitApplication: "Отправить заявку",
      openAdminApplications: "Открыть админ-панель",
      goToPaymentPage: "Перейти к оплате",
      changePlan: "Изменить тариф",
      studyModes: {
        offline: "Офлайн",
        online: "Онлайн",
        hybrid: "Смешанный"
      },
      paymentMethods: {
        click: "Click",
        payme: "Payme",
        humo: "Hazna",
        uzcard: "Paynet",
        card: "Банковская карта",
        center: "Оплата в центре"
      }
    }
  },
  en: {
    meta: {
      homeTitle: "School Subjects",
      courseTitle: "Subject Details",
      paymentTitle: "Subject Payments",
      registerTitle: "Subject Registration"
    },
    bank: {
      brandTop: "",
      brandMain: "Bank",
      contactPhone: "Contact phone number",
      hotline: "Trust hotline"
    },
    index: {
      sectionLabel: "Subjects",
      sectionTitle: "Choose your subject",
      sectionText:
        "Students choose the school subject they want to study, open the matching card, and continue to a page with details and payment options.",
      openCourseAria: "Open the {title} subject",
      sectionsLabel: "Sections",
      sections: {
        courses: "Subjects",
        coursesMeta: "Group status",
        team: "Team",
        teamMeta: "Tasks",
        news: "Announcements",
        newsMeta: "Center news"
      }
    },
    detail: {
      loading: "Loading subject details...",
      notFoundTag: "Not found",
      notFoundTitle: "This subject could not be found",
      notFoundText:
        "The link may be incorrect. Return to the subject list and choose a program again.",
      backToCourses: "Back to the subject list",
      chooseCareer: "I want to study this subject",
      backAll: "Back to all subjects",
      backToCoursePage: "Back to subject page",
      brief: "Overview",
      duration: "Duration",
      format: "Format",
      fullPrice: "Full price",
      monthly: "Monthly",
      teacher: "Teacher",
      teacherInfo: "Short info",
      teacherCertificate: "Certificate",
      teacherCertified: "Available",
      teacherNotCertified: "Not available",
      teacherCertificateUnknown: "Not specified",
      teacherUploadCertificate: "Upload certificate",
      teacherChangeCertificate: "Change certificate",
      teacherCertificateHint: "Upload a PNG, JPG, or PDF certificate",
      teacherCertificateView: "View",
      teacherCertificateSelected: "Uploaded file",
      teacherPhotoPlaceholder: "Photo place",
      teacherUploadPhoto: "Upload photo",
      teacherChangePhoto: "Change photo",
      teacherUploadHint: "Press + to choose a photo",
      teacherNameFallback: "Teacher name",
      teacherBioFallback:
        "Add a short teacher description for the {course} subject here.",
      whatYouGet: "What you will study",
      result: "Outcome",
      paymentOptions: "Payment options",
      applyPay: "Application and payment",
      register: "Registration",
      paymentPageTitle: "Payment page",
      paymentPageIntro:
        "Choose the subject plan and set the payment method separately on this page.",
      paymentPageMethodsIntro:
        "First choose a plan, then start a demo payment with one of the methods below.",
      registerPageTitle: "Registration",
      registerPageIntro:
        "Submit the application separately. Your selected plan stays saved and you can move to payments afterward.",
      openPaymentsPage: "Payment page",
      openRegistrationPage: "Registration page",
      choosePlanFirst: "View plans first",
      formIntro:
        "Leave your details. An operator will contact you for the selected plan, and later this block can be connected to real payments such as Click, Payme, or Stripe.",
      formIntroSeparate:
        "Leave your details. After the application is sent, an operator will contact you, while payment is handled on a separate page.",
      firstName: "First name",
      firstNamePlaceholder: "Enter your first name",
      lastName: "Last name",
      lastNamePlaceholder: "Enter your last name",
      name: "Your full name",
      namePlaceholder: "Enter your full name",
      phone: "Your phone number",
      phonePlaceholder: "+998 00 000 00 00",
      phoneValidation: "Enter the phone number in +998 00 000 00 00 format",
      studyMode: "Study format",
      startDate: "Start date",
      paymentMethod: "Payment method",
      paymentsTitle: "Payments",
      paymentsText: "Choose one of the methods below",
      startPayment: "Start payment",
      paymentDemoTitle: "Payment window",
      paymentDemoText: "A demo payment section has been opened for the selected method.",
      payingForLabel: "Subject being paid for",
      senderLabel: "Sender",
      receiverLabel: "Receiver",
      receiverPlaceholder: "0000 0000 0000 0000",
      receiverHelp: "Enter the receiver card number",
      receiverValidation: "Enter a 16-digit card number",
      confirmPayment: "Confirm payment",
      closePayment: "Close",
      receiptUploadTitle: "Upload receipt",
      receiptUploadIntro:
        "Payment for the {plan} plan of the {course} subject has been confirmed. Now upload the receipt file.",
      receiptFileLabel: "Receipt file",
      receiptUploadFormats: "Upload the receipt as PNG, JPG, or PDF",
      receiptUploadButton: "Send receipt",
      receiptUploaded: "Receipt uploaded",
      receiptUploadSuccessMessage:
        "The receipt for the {course} subject and {plan} plan has been received: {fileName}.",
      receiptSelectedFile: "Selected file: {fileName}",
      receiptRequired: "Choose a receipt file first",
      selectedCourse: "Selected subject",
      summaryIntro:
        "The information below updates automatically based on the selected subject and payment plan.",
      course: "Subject",
      plan: "Plan",
      price: "Price",
      note: "Note",
      registerSummaryIntro:
        "The details below are prepared for registration based on the selected subject and plan.",
      summaryNoteText:
        "Later this section can also include promo codes, discounts, and responses from a real payment gateway.",
      applicationAccepted: "Application received",
      applicationSubmittedNote: "Your application has been sent. It will be reviewed shortly.",
      registrationAccepted: "Registration received",
      paymentAccepted: "Payment request created",
      successMessage:
        "{name}, you selected the {course} subject with the {plan} plan. Payment method: {paymentMethod}. An operator will contact you at {phone}. Study format: {studyMode}.",
      registrationSuccessMessage:
        "{name}, you submitted an application for the {course} subject with the {plan} plan. An operator will contact you at {phone}. Study format: {studyMode}.",
      paymentSuccessMessage:
        "A demo payment window is ready for the {course} subject with the {plan} plan and {paymentMethod} method.",
      submitApplication: "Submit application",
      openAdminApplications: "Open admin panel",
      goToPaymentPage: "Go to payment page",
      changePlan: "Change plan",
      studyModes: {
        offline: "Offline",
        online: "Online",
        hybrid: "Hybrid"
      },
      paymentMethods: {
        click: "Click",
        payme: "Payme",
        humo: "Hazna",
        uzcard: "Paynet",
        card: "Bank card",
        center: "Pay at center"
      }
    }
  }
};

const courseTranslations = {
  ru: {
    "full-stack-web-development": {
      level: "От новичка до трудоустройства",
      duration: "8 мес.",
      format: "Офлайн + онлайн поддержка",
      price: "1 000 000 сум",
      monthly: "1 000 000 сум / мес.",
      description:
        "Вы изучите frontend и backend вместе и начнете создавать полноценные web-приложения.",
      outcomes: [
        "4 реальных проекта для портфолио",
        "HTML, CSS, JavaScript, React, Node.js",
        "API, аутентификация, базы данных и deploy"
      ],
      modules: [
        "HTML, CSS и современные layout-подходы",
        "Основы JavaScript и работа с DOM",
        "React и архитектура компонентов",
        "Node.js, Express и REST API",
        "Работа с MongoDB или PostgreSQL",
        "Deploy, Git и подготовка портфолио"
      ],
      plans: [
        {
          id: "full",
          title: "Оплата на 30 дней",
          amount: "1 000 000 сум",
          note: ""
        },
        {
          id: "monthly",
          title: "Оплата со 2-го месяца",
          amount: "1 000 000 сум",
          note: ""
        },
        {
          id: "installment",
          title: "6-й месяц обучения бесплатно",
          amount: "",
          note: ""
        }
      ]
    },
    "cloud-computing": {
      level: "Для системных администраторов и инфраструктуры",
      duration: "5 мес.",
      format: "Лабы + практика",
      price: "1 000 000 сум",
      monthly: "2 000 000 сум / мес.",
      description:
        "Вы изучите основы AWS, Azure и cloud-архитектуры и научитесь управлять сервисами в реальной среде.",
      outcomes: [
        "Работа с виртуальными серверами и сетями",
        "Cloud security и monitoring",
        "Оптимизация затрат на инфраструктуру"
      ],
      modules: [
        "Основы cloud и модели сервисов",
        "AWS EC2, S3 i IAM",
        "Контейнеры и cloud networking",
        "Monitoring, scaling и logging",
        "Backup, failover и безопасность"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "1 000 000 сум",
          note: "Полная цена + bonus workshop"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "2 000 000 сум",
          note: "Равные платежи в течение 5 месяцев"
        },
        {
          id: "installment",
          title: "Для компании",
          amount: "1 000 000 сум",
          note: "Оплата по invoice в 2 части"
        }
      ]
    },
    "devops-platform-engineering": {
      level: "Практическая автоматизация",
      duration: "6 мес.",
      format: "Лаборатории с ментором",
      price: "1 000 000 сум",
      monthly: "2 000 000 сум / мес.",
      description:
        "Вы изучите CI/CD, Docker, Kubernetes и monitoring, чтобы настраивать современные release-процессы.",
      outcomes: [
        "Создание и автоматизация pipeline",
        "Deploy через Docker и Kubernetes",
        "Monitoring и alerting для production"
      ],
      modules: [
        "Linux и shell automation",
        "GitLab CI ili GitHub Actions",
        "Docker, registry и best practices для образов",
        "Основы Kubernetes",
        "Observability: Prometheus, Grafana",
        "Infrastructure as Code"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "1 000 000 сум",
          note: "Полная стоимость курса"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "2 000 000 сум",
          note: "Удобная оплата на 6 месяцев"
        },
        {
          id: "installment",
          title: "На 3 части",
          amount: "4 500 000 сум",
          note: "Поэтапная оплата"
        }
      ]
    },
    "backend-api-engineering": {
      level: "Глубокое изучение серверной части",
      duration: "7 мес.",
      format: "Project-based",
      price: "11 900 000 сум",
      monthly: "1 700 000 сум / мес.",
      description:
        "Вы получите навыки backend-архитектуры, дизайна API, аутентификации и оптимизации баз данных.",
      outcomes: [
        "Создание REST и GraphQL API",
        "JWT auth и система прав доступа",
        "Производительность баз данных и caching"
      ],
      modules: [
        "Основы backend на Node.js или Python",
        "REST API и валидация",
        "Authentication i authorization",
        "Работа с SQL и NoSQL",
        "Caching и queue-системы",
        "Testing и production deploy"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "11 900 000 сум",
          note: "С менторскими сессиями"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "1 700 000 сум",
          note: "Оплата в течение 7 месяцев"
        },
        {
          id: "installment",
          title: "В 2 части",
          amount: "6 100 000 сум",
          note: "Два крупных платежа"
        }
      ]
    },
    "mobile-app-development": {
      level: "Старт для Android и iOS",
      duration: "6 мес.",
      format: "Hybrid или native",
      price: "12 200 000 сум",
      monthly: "2 050 000 сум / мес.",
      description:
        "Вы получите практический опыт в разработке мобильных приложений, создании UI и интеграции с API.",
      outcomes: [
        "Единый проект для Android и iOS",
        "UI, state management и navigation",
        "Подготовка к публикации в store"
      ],
      modules: [
        "Основы мобильных платформ",
        "Flutter ili React Native",
        "State management",
        "API интеграция и auth",
        "Push notification и local storage",
        "Release и store submission"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "12 200 000 сум",
          note: "Полная стоимость курса"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "2 050 000 сум",
          note: "Оплата в течение 6 месяцев"
        },
        {
          id: "installment",
          title: "В 3 этапа",
          amount: "4 200 000 сум",
          note: "Один платеж каждые 2 месяца"
        }
      ]
    },
    "ui-ux-product-design": {
      level: "Дизайн и product-мышление",
      duration: "4 мес.",
      format: "Студийная практика",
      price: "8 400 000 сум",
      monthly: "2 100 000 сум / мес.",
      description:
        "Вы научитесь создавать удобные и красивые digital-продукты на основе UX, UI и product-подхода.",
      outcomes: [
        "Полноценная design system в Figma",
        "Research, wireframe и prototyping",
        "Case study для портфолио"
      ],
      modules: [
        "UX research и persona",
        "Information architecture",
        "Wireframe и prototyping",
        "UI visual system",
        "Design system и handoff"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "8 400 000 сум",
          note: "Полная оплата за курс"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "2 100 000 сум",
          note: "Оплата в течение 4 месяцев"
        },
        {
          id: "installment",
          title: "В 2 части",
          amount: "4 300 000 сум",
          note: "На старте и в середине курса"
        }
      ]
    },
    cybersecurity: {
      level: "Вход в кибербезопасность",
      duration: "5 мес.",
      format: "Cases и sandbox",
      price: "11 000 000 сум",
      monthly: "2 200 000 сум / мес.",
      description:
        "Вы получите сильную базу по сетевой безопасности, основам pentest и защите систем.",
      outcomes: [
        "Threat modeling и аудит",
        "Знакомство с SOC и incident response",
        "Практические лаборатории по безопасности"
      ],
      modules: [
        "Security fundamentals",
        "Сетевая и endpoint-безопасность",
        "OWASP i web security",
        "Основы pentest workflow",
        "Log analysis и incident response"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "11 000 000 сум",
          note: "Полная цена"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "2 200 000 сум",
          note: "Оплата на 5 месяцев"
        },
        {
          id: "installment",
          title: "Корпоративный",
          amount: "5 650 000 сум",
          note: "Расчеты в 2 этапа"
        }
      ]
    },
    "data-science-big-data": {
      level: "Аналитика и построение моделей",
      duration: "7 мес.",
      format: "Python lab + проект",
      price: "13 900 000 сум",
      monthly: "1 990 000 сум / мес.",
      description:
        "Вы освоите анализ данных, визуализацию и практику работы с большими объемами данных.",
      outcomes: [
        "Навыки Python, Pandas и SQL",
        "Подготовка dashboard и insight",
        "Знакомство с big data pipeline"
      ],
      modules: [
        "Python for data",
        "Pandas, NumPy и очистка данных",
        "SQL и analytics query",
        "Визуализация и dashboard",
        "Введение в machine learning",
        "Практический обзор big data экосистемы"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "13 900 000 сум",
          note: "Полная цена + mentor review"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "1 990 000 сум",
          note: "Оплата в течение 7 месяцев"
        },
        {
          id: "installment",
          title: "В 3 части",
          amount: "4 800 000 сум",
          note: "Поэтапная оплата"
        }
      ]
    },
    "ai-engineering-machine-learning": {
      level: "От модели до продукта",
      duration: "8 мес.",
      format: "Practice + mentor",
      price: "15 600 000 сум",
      monthly: "1 950 000 сум / мес.",
      description:
        "Сильное практическое направление по machine learning, интеграции LLM и созданию AI-продуктов.",
      outcomes: [
        "Supervised model и evaluation",
        "AI API и интеграция LLM",
        "AI-проект для портфолио"
      ],
      modules: [
        "Python и ML fundamentals",
        "Data prep и feature engineering",
        "Model training и evaluation",
        "Введение в deep learning",
        "Работа с LLM и интеграция",
        "Deploy AI-сервиса"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "15 600 000 сум",
          note: "Полная стоимость курса"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "1 950 000 сум",
          note: "Оплата в течение 8 месяцев"
        },
        {
          id: "installment",
          title: "В 4 части",
          amount: "4 050 000 сум",
          note: "Оплата каждые 2 месяца"
        }
      ]
    },
    "qa-automation-testing": {
      level: "Контроль качества и автоматизация",
      duration: "5 мес.",
      format: "Manual + automation",
      price: "9 600 000 сум",
      monthly: "1 920 000 сум / мес.",
      description:
        "Вы пошагово изучите manual testing, написание test case и создание автоматизированных тестов.",
      outcomes: [
        "Практика API и UI testing",
        "Automation на Selenium или Playwright",
        "Bug report и QA workflow"
      ],
      modules: [
        "Testing fundamentals",
        "Test case и documentation",
        "API testing",
        "UI automation tools",
        "Подключение тестов к CI"
      ],
      plans: [
        {
          id: "full",
          title: "Полная оплата",
          amount: "9 600 000 сум",
          note: "Полная стоимость курса"
        },
        {
          id: "monthly",
          title: "Помесячно",
          amount: "1 920 000 сум",
          note: "Оплата в течение 5 месяцев"
        },
        {
          id: "installment",
          title: "В 2 части",
          amount: "4 950 000 сум",
          note: "Два этапа оплаты"
        }
      ]
    }
  },
  en: {
    "full-stack-web-development": {
      level: "From beginner to employable",
      duration: "8 months",
      format: "Offline + online support",
      price: "1,000,000 UZS",
      monthly: "1,000,000 UZS / month",
      description:
        "Learn frontend and backend together and start building complete web applications.",
      outcomes: [
        "4 real portfolio projects",
        "HTML, CSS, JavaScript, React, Node.js",
        "API, authentication, databases, and deployment"
      ],
      modules: [
        "HTML, CSS, and modern layout techniques",
        "JavaScript fundamentals and DOM work",
        "React and component architecture",
        "Node.js, Express, and REST API",
        "Working with MongoDB or PostgreSQL",
        "Deployment, Git, and portfolio preparation"
      ],
      plans: [
        {
          id: "full",
          title: "30-day payment",
          amount: "1,000,000 UZS",
          note: ""
        },
        {
          id: "monthly",
          title: "Payment from month 2",
          amount: "1,000,000 UZS",
          note: ""
        },
        {
          id: "installment",
          title: "6th month free learning",
          amount: "",
          note: ""
        }
      ]
    },
    "cloud-computing": {
      level: "For sysadmins and infrastructure roles",
      duration: "5 months",
      format: "Labs + practice",
      price: "1,000,000 UZS",
      monthly: "2,000,000 UZS / month",
      description:
        "Learn AWS, Azure, and cloud architecture fundamentals and manage services in real environments.",
      outcomes: [
        "Work with virtual servers and networking",
        "Cloud security and monitoring",
        "Infrastructure cost optimization"
      ],
      modules: [
        "Cloud fundamentals and service models",
        "AWS EC2, S3, and IAM",
        "Containers and cloud networking",
        "Monitoring, scaling, and logging",
        "Backup, failover, and security"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "1,000,000 UZS",
          note: "Full price plus a bonus workshop"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "2,000,000 UZS",
          note: "Equal payments over 5 months"
        },
        {
          id: "installment",
          title: "Company plan",
          amount: "1,000,000 UZS",
          note: "Invoice-based payment in 2 parts"
        }
      ]
    },
    "devops-platform-engineering": {
      level: "Hands-on automation track",
      duration: "6 months",
      format: "Mentor-led labs",
      price: "1,000,000 UZS",
      monthly: "2,000,000 UZS / month",
      description:
        "Study CI/CD, Docker, Kubernetes, and monitoring to run modern release pipelines.",
      outcomes: [
        "Build and automate delivery pipelines",
        "Deploy with Docker and Kubernetes",
        "Production monitoring and alerting"
      ],
      modules: [
        "Linux and shell automation",
        "GitLab CI or GitHub Actions",
        "Docker, registries, and image best practices",
        "Kubernetes fundamentals",
        "Observability with Prometheus and Grafana",
        "Infrastructure as Code"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "1,000,000 UZS",
          note: "Complete course price"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "2,000,000 UZS",
          note: "Flexible payments over 6 months"
        },
        {
          id: "installment",
          title: "3-part plan",
          amount: "4,500,000 UZS",
          note: "Stage-based payment schedule"
        }
      ]
    },
    "backend-api-engineering": {
      level: "Deep server-side focus",
      duration: "7 months",
      format: "Project-based",
      price: "11,900,000 UZS",
      monthly: "1,700,000 UZS / month",
      description:
        "Gain strong skills in backend architecture, API design, authentication, and database optimization.",
      outcomes: [
        "Build REST and GraphQL APIs",
        "JWT auth and permission systems",
        "Database performance and caching"
      ],
      modules: [
        "Backend foundations with Node.js or Python",
        "REST API design and validation",
        "Authentication and authorization",
        "Working with SQL and NoSQL",
        "Caching and queue systems",
        "Testing and production deployment"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "11,900,000 UZS",
          note: "Includes mentor sessions"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "1,700,000 UZS",
          note: "Spread across 7 months"
        },
        {
          id: "installment",
          title: "2-part plan",
          amount: "6,100,000 UZS",
          note: "Two larger scheduled payments"
        }
      ]
    },
    "mobile-app-development": {
      level: "Android and iOS starter track",
      duration: "6 months",
      format: "Hybrid or native",
      price: "12,200,000 UZS",
      monthly: "2,050,000 UZS / month",
      description:
        "Build practical experience in mobile app development, UI creation, and API integration.",
      outcomes: [
        "One project for both Android and iOS",
        "UI, state management, and navigation",
        "Play Market and App Store preparation"
      ],
      modules: [
        "Mobile platform fundamentals",
        "Flutter or React Native",
        "State management",
        "API integration and auth",
        "Push notifications and local storage",
        "Release and store submission"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "12,200,000 UZS",
          note: "Complete course price"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "2,050,000 UZS",
          note: "Pay over 6 months"
        },
        {
          id: "installment",
          title: "3-stage plan",
          amount: "4,200,000 UZS",
          note: "One payment every 2 months"
        }
      ]
    },
    "ui-ux-product-design": {
      level: "Design and product thinking",
      duration: "4 months",
      format: "Studio practice",
      price: "8,400,000 UZS",
      monthly: "2,100,000 UZS / month",
      description:
        "Learn to design beautiful and usable digital products with a UX, UI, and product mindset.",
      outcomes: [
        "A complete design system in Figma",
        "Research, wireframes, and prototypes",
        "Portfolio-ready case study"
      ],
      modules: [
        "UX research and personas",
        "Information architecture",
        "Wireframing and prototyping",
        "UI visual systems",
        "Design systems and handoff"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "8,400,000 UZS",
          note: "Full course payment"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "2,100,000 UZS",
          note: "Payments over 4 months"
        },
        {
          id: "installment",
          title: "2-part plan",
          amount: "4,300,000 UZS",
          note: "At the start and midway"
        }
      ]
    },
    cybersecurity: {
      level: "Entry into cybersecurity",
      duration: "5 months",
      format: "Cases and sandbox",
      price: "11,000,000 UZS",
      monthly: "2,200,000 UZS / month",
      description:
        "Build a strong foundation in network security, pentest basics, and system protection.",
      outcomes: [
        "Threat modeling and security audits",
        "Introduction to SOC and incident response",
        "Hands-on security labs"
      ],
      modules: [
        "Security fundamentals",
        "Network and endpoint security",
        "OWASP and web security",
        "Pentest workflow basics",
        "Log analysis and incident response"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "11,000,000 UZS",
          note: "Complete price"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "2,200,000 UZS",
          note: "Monthly payments for 5 months"
        },
        {
          id: "installment",
          title: "Corporate plan",
          amount: "5,650,000 UZS",
          note: "Split into 2 invoice stages"
        }
      ]
    },
    "data-science-big-data": {
      level: "Analytics and model building",
      duration: "7 months",
      format: "Python lab + project",
      price: "13,900,000 UZS",
      monthly: "1,990,000 UZS / month",
      description:
        "Practice data analysis, visualization, and working with larger-scale data pipelines.",
      outcomes: [
        "Python, Pandas, and SQL skills",
        "Dashboard building and insight delivery",
        "Exposure to big data pipelines"
      ],
      modules: [
        "Python for data",
        "Pandas, NumPy, and data cleaning",
        "SQL and analytics queries",
        "Visualization and dashboards",
        "Introduction to machine learning",
        "Practical overview of the big data ecosystem"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "13,900,000 UZS",
          note: "Full price with mentor review"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "1,990,000 UZS",
          note: "Spread over 7 months"
        },
        {
          id: "installment",
          title: "3-part plan",
          amount: "4,800,000 UZS",
          note: "Step-by-step installment schedule"
        }
      ]
    },
    "ai-engineering-machine-learning": {
      level: "From model to product",
      duration: "8 months",
      format: "Practice + mentor",
      price: "15,600,000 UZS",
      monthly: "1,950,000 UZS / month",
      description:
        "A strong practical path into machine learning, LLM integration, and AI product development.",
      outcomes: [
        "Supervised models and evaluation",
        "AI APIs and LLM integration",
        "Portfolio-ready AI project"
      ],
      modules: [
        "Python and ML fundamentals",
        "Data prep and feature engineering",
        "Model training and evaluation",
        "Introduction to deep learning",
        "Working with LLMs and integration",
        "Deploying an AI service"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "15,600,000 UZS",
          note: "Complete course price"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "1,950,000 UZS",
          note: "Payments across 8 months"
        },
        {
          id: "installment",
          title: "4-part plan",
          amount: "4,050,000 UZS",
          note: "Payment every 2 months"
        }
      ]
    },
    "qa-automation-testing": {
      level: "Quality assurance and automation",
      duration: "5 months",
      format: "Manual + automation",
      price: "9,600,000 UZS",
      monthly: "1,920,000 UZS / month",
      description:
        "Learn manual testing, test case writing, and automated testing step by step.",
      outcomes: [
        "Hands-on API and UI testing",
        "Automation with Selenium or Playwright",
        "Bug reporting and QA workflow"
      ],
      modules: [
        "Testing fundamentals",
        "Test cases and documentation",
        "API testing",
        "UI automation tools",
        "Connecting tests to CI"
      ],
      plans: [
        {
          id: "full",
          title: "Full payment",
          amount: "9,600,000 UZS",
          note: "Complete course price"
        },
        {
          id: "monthly",
          title: "Monthly",
          amount: "1,920,000 UZS",
          note: "Payments over 5 months"
        },
        {
          id: "installment",
          title: "2-part plan",
          amount: "4,950,000 UZS",
          note: "Split into two payments"
        }
      ]
    }
  }
};

function getValueByPath(source, path) {
  return path.split(".").reduce((acc, part) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, part)) {
      return acc[part];
    }

    return undefined;
  }, source);
}

function fillTemplate(value, params = {}) {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return params[key];
    }

    return match;
  });
}

function readStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY);
  } catch (error) {
    return null;
  }
}

function writeStoredLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    // Storage is optional for this UI preference.
  }
}

function getCurrentLanguage() {
  return SUPPORTED_LANGUAGES.includes(languageRoot.lang) ? languageRoot.lang : "uz";
}

function getUiText(path, params = {}) {
  const language = getCurrentLanguage();
  const value =
    getValueByPath(uiTranslations[language], path) ??
    getValueByPath(uiTranslations.uz, path) ??
    "";

  return fillTemplate(value, params);
}

function applyUniformCoursePricing(course, language = "uz") {
  const pricingByLanguage = {
    uz: {
      price: "350 000 so'm",
      monthly: "350 000 so'm / oy",
      planFull: "350 000 so'm",
      planMonthly: "350 000 so'm"
    },
    ru: {
      price: "350 000 сум",
      monthly: "350 000 сум / мес.",
      planFull: "350 000 сум",
      planMonthly: "350 000 сум"
    },
    en: {
      price: "350,000 UZS",
      monthly: "350,000 UZS / month",
      planFull: "350,000 UZS",
      planMonthly: "350,000 UZS"
    }
  };

  const pricing = pricingByLanguage[language] ?? pricingByLanguage.uz;

  return {
    ...course,
    price: pricing.price,
    monthly: pricing.monthly,
    plans: Array.isArray(course.plans)
      ? course.plans.map((plan) => {
          if (plan.id === "full") {
            return {
              ...plan,
              amount: pricing.planFull
            };
          }

          if (plan.id === "monthly") {
            return {
              ...plan,
              amount: pricing.planMonthly
            };
          }

          return plan;
        })
      : course.plans
  };
}

function getLocalizedCourse(course, language = getCurrentLanguage()) {
  const localizedCourse = courseTranslations?.[language]?.[course.slug];
  const mergedCourse = localizedCourse
    ? {
        ...course,
        ...localizedCourse
      }
    : { ...course };

  return applyUniformCoursePricing(mergedCourse, language);
}

function updateLanguageButtons(language) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setLanguageSwitcherOpen(isOpen) {
  if (!languageSwitcher || !languageToggle) {
    return;
  }

  languageSwitcher.classList.toggle("is-open", isOpen);
  languageToggle.setAttribute("aria-expanded", String(isOpen));
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getUiText(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", getUiText(element.dataset.i18nPlaceholder));
  });
}

function updateDocumentTitle() {
  const titleKey =
    (document.getElementById("registerPage") && "meta.registerTitle") ||
    (document.getElementById("paymentPage") && "meta.paymentTitle") ||
    (document.getElementById("courseDetail") && "meta.courseTitle") ||
    "meta.homeTitle";

  document.title = getUiText(titleKey);
}

function setLanguage(language, dispatchEvent = true) {
  const nextLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : "uz";

  languageRoot.lang = nextLanguage;
  languageRoot.dataset.language = nextLanguage;
  updateLanguageButtons(nextLanguage);
  applyStaticTranslations();
  updateDocumentTitle();
  writeStoredLanguage(nextLanguage);

  if (dispatchEvent) {
    window.dispatchEvent(
      new CustomEvent("app:languagechange", {
        detail: {
          language: nextLanguage
        }
      })
    );
  }
}

window.getCurrentLanguage = getCurrentLanguage;
window.getUiText = getUiText;
window.getLocalizedCourse = getLocalizedCourse;

setLanguage(readStoredLanguage() || getCurrentLanguage(), false);
setLanguageSwitcherOpen(false);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
    setLanguageSwitcherOpen(false);
  });
});

if (languageSwitcher && languageToggle) {
  languageToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setLanguageSwitcherOpen(!languageSwitcher.classList.contains("is-open"));
  });

  languageSwitcher.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    setLanguageSwitcherOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setLanguageSwitcherOpen(false);
    }
  });
}

