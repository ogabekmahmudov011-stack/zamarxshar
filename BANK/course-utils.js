(function () {
  const getLanguage = () => (window.getCurrentLanguage ? window.getCurrentLanguage() : "uz");
  const t = (path, paramsMap) => (window.getUiText ? window.getUiText(path, paramsMap) : path);
  const localizeCourse = (course) =>
    window.getLocalizedCourse ? window.getLocalizedCourse(course, getLanguage()) : course;

  function getCourseBySlug(slug) {
    return Array.isArray(window.COURSES) ? window.COURSES.find((course) => course.slug === slug) : undefined;
  }

  function getLocalizedCourseBySlug(slug) {
    const course = getCourseBySlug(slug);
    return course ? localizeCourse(course) : null;
  }

  function getQueryState() {
    const params = new URLSearchParams(window.location.search);

    return {
      params,
      selectedSlug: params.get("course"),
      selectedPlanId: params.get("plan"),
      selectedPaymentMethod: params.get("method")
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildPageHref(page, courseSlug, planId, paymentMethod) {
    const params = new URLSearchParams();

    if (courseSlug) {
      params.set("course", courseSlug);
    }

    if (planId) {
      params.set("plan", planId);
    }

    if (paymentMethod) {
      params.set("method", paymentMethod);
    }

    const query = params.toString();
    return query ? `${page}?${query}` : page;
  }

  function buildAdminPanelHref(section = "applications", subject = "") {
    const adminUrl = new URL("../index.html", window.location.href);

    if (section) {
      adminUrl.hash = section;
    }

    if (subject) {
      adminUrl.searchParams.set("subject", subject);
    } else {
      adminUrl.searchParams.delete("subject");
    }

    return adminUrl.toString();
  }

  function parseAmount(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return digits ? Number.parseInt(digits, 10) : 0;
  }

  async function requestJson(url, options = {}) {
    const response = await fetch(url, options);
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload?.error || "So'rovni bajarib bo'lmadi.");
    }

    return payload;
  }

  async function saveApplicationSubmission(course, selectedPlan, applicationState) {
    const entry = {
      source: "bank-course",
      name: String(applicationState?.name || "").trim(),
      phone: extractPhoneDigits(applicationState?.phone || ""),
      courseTitle: String(applicationState?.courseTitle || course?.title || "").trim(),
      courseSlug: String(applicationState?.courseSlug || course?.slug || "").trim(),
      planTitle: String(applicationState?.planTitle || selectedPlan?.title || "").trim(),
      studyMode: String(applicationState?.studyMode || "offline").trim(),
      studyModeLabel: String(applicationState?.studyModeLabel || "").trim(),
      startDate: String(applicationState?.startDate || "").trim(),
      amount: parseAmount(applicationState?.amount || selectedPlan?.amount || "")
    };

    const payload = await requestJson("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    });

    return payload?.application || entry;
  }

  async function fetchCourseTeacher(course) {
    const params = new URLSearchParams();
    if (course?.slug) {
      params.set("courseSlug", course.slug);
    }
    if (course?.title) {
      params.set("courseTitle", course.title);
    }

    const payload = await requestJson(`/api/courses/teacher?${params.toString()}`, {
      cache: "no-store"
    });

    return payload?.teacher || null;
  }

  async function fetchCourseStudents(course) {
    const params = new URLSearchParams();
    if (course?.slug) {
      params.set("courseSlug", course.slug);
    }
    if (course?.title) {
      params.set("courseTitle", course.title);
    }

    const payload = await requestJson(`/api/courses/students?${params.toString()}`, {
      cache: "no-store"
    });

    return Array.isArray(payload?.students) ? payload.students : [];
  }

  function replaceQueryParams(nextParams) {
    const nextUrl = new URL(window.location.href);

    Object.entries(nextParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        nextUrl.searchParams.delete(key);
      } else {
        nextUrl.searchParams.set(key, value);
      }
    });

    window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  }

  function getPlanById(course, planId) {
    if (!course || !Array.isArray(course.plans) || course.plans.length === 0) {
      return null;
    }

    return course.plans.find((plan) => plan.id === planId) ?? course.plans[0];
  }

  const haznaLogoSvgMarkup = `
    <svg class="brand-logo__hazna-svg" viewBox="0 0 300 300" aria-hidden="true">
      <rect width="300" height="300" fill="#2f7f58"></rect>
      <circle cx="150" cy="92" r="52" fill="#f7c951"></circle>
      <rect x="60" y="93" width="180" height="180" fill="none" stroke="#ffffff" stroke-width="42"></rect>
    </svg>
  `;

  const haznaLogoMarkup = `
    <span class="brand-logo__card-humo" aria-hidden="true">
      ${haznaLogoSvgMarkup}
    </span>
  `;

  const haznaStandaloneMarkup = `
    <span class="brand-logo brand-logo--hazna" aria-hidden="true">
      <span class="brand-logo__hazna-frame">
        ${haznaLogoSvgMarkup}
      </span>
    </span>
  `;

  const paynetLogoMarkup = `
    <span class="brand-logo brand-logo--paynet" aria-hidden="true">
      <svg class="brand-logo__paynet-svg" viewBox="0 0 420 420" aria-hidden="true">
        <circle cx="210" cy="210" r="210" fill="#27cd69"></circle>
        <rect x="0" y="143" width="420" height="134" fill="#ffffff"></rect>
        <text x="210" y="232" fill="#1f1f1f" font-family="Arial Black, Arial, sans-serif" font-size="108" font-weight="900" letter-spacing="-8" text-anchor="middle">paynet</text>
      </svg>
    </span>
  `;

  const formIcons = {
    name: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5"></circle>
        <path d="M5.5 19a6.5 6.5 0 0 1 13 0"></path>
      </svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.2 4.6h2.4l1.1 4.2-1.7 1.3a14.2 14.2 0 0 0 4 4l1.3-1.7 4.2 1.1v2.4c0 .7-.6 1.3-1.3 1.3A13.9 13.9 0 0 1 6.9 5.9c0-.7.6-1.3 1.3-1.3Z"></path>
      </svg>
    `,
    lastName: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="3"></circle>
        <path d="M3.8 18a5.2 5.2 0 0 1 10.4 0"></path>
        <path d="M16 9h4"></path>
        <path d="M16 13h4"></path>
      </svg>
    `,
    studyMode: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m4 8 8-4 8 4-8 4-8-4Z"></path>
        <path d="M8 10.5v3.8c0 .8 1.8 2.2 4 2.2s4-1.4 4-2.2v-3.8"></path>
        <path d="M20 9v5"></path>
      </svg>
    `,
    startDate: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2.5"></rect>
        <path d="M8 3.8v3"></path>
        <path d="M16 3.8v3"></path>
        <path d="M4 9.5h16"></path>
        <path d="M8 13h3"></path>
      </svg>
    `,
    payment: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="6" width="17" height="12" rx="2.5"></rect>
        <path d="M3.5 10.5h17"></path>
        <path d="M7.5 14.5h4"></path>
      </svg>
    `,
    click: `
      <span class="brand-logo brand-logo--click" aria-hidden="true">
        <span class="brand-logo__click-glyph"></span>
        <span class="brand-logo__click-word">click</span>
      </span>
    `,
    payme: `
      <span class="brand-logo brand-logo--payme" aria-hidden="true">
        <span class="brand-logo__pay">pay</span>
        <span class="brand-logo__me-wrap">
          <span class="brand-logo__me">me</span>
        </span>
      </span>
    `,
    humo: `
      ${haznaStandaloneMarkup}
    `,
    uzcard: `
      ${paynetLogoMarkup}
    `,
    card: `
      <span class="brand-logo brand-logo--card" aria-hidden="true">
        <span class="brand-logo__card-bank">Xazna</span>
        <span class="brand-logo__card-chip"></span>
        <span class="brand-logo__card-signal">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="brand-logo__card-badges">
          ${haznaLogoMarkup}
          <span class="brand-logo__card-uzcard">
            <span class="brand-logo__card-uzmark">U</span>
            <span class="brand-logo__card-uztext">UZ</span>
          </span>
        </span>
      </span>
    `,
    center: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 20h15"></path>
        <path d="M6 20V9.2l6-3.2 6 3.2V20"></path>
        <path d="M9 12.5h.01"></path>
        <path d="M15 12.5h.01"></path>
        <path d="M12 20v-4.5"></path>
      </svg>
    `,
    submit: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12h14"></path>
        <path d="m13 7 5 5-5 5"></path>
      </svg>
    `,
    receipt: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4.5h7l3 3V19a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 6 19V6a1.5 1.5 0 0 1 1-1.42Z"></path>
        <path d="M14 4.5V8h3"></path>
        <path d="M12 17V11"></path>
        <path d="m9.5 13.5 2.5-2.5 2.5 2.5"></path>
      </svg>
    `
  };

  function getFormIcon(name) {
    return formIcons[name] ?? "";
  }

  function extractPhoneDigits(value) {
    let digits = String(value || "").replace(/\D/g, "");

    if (digits.startsWith("998")) {
      digits = digits.slice(3);
    }

    return digits.slice(0, 9);
  }

  function formatPhoneNumber(value, keepPrefixSpace = true) {
    const digits = extractPhoneDigits(value);
    const parts = [];

    if (digits.length > 0) {
      parts.push(digits.slice(0, 2));
    }

    if (digits.length > 2) {
      parts.push(digits.slice(2, 5));
    }

    if (digits.length > 5) {
      parts.push(digits.slice(5, 7));
    }

    if (digits.length > 7) {
      parts.push(digits.slice(7, 9));
    }

    if (parts.length === 0) {
      return keepPrefixSpace ? "+998 " : "+998";
    }

    return `+998 ${parts.join(" ")}`;
  }

  function bindPhoneMask(phoneInput) {
    if (!phoneInput) {
      return;
    }

    const syncPhoneValue = () => {
      phoneInput.value = formatPhoneNumber(phoneInput.value, true);

      if (extractPhoneDigits(phoneInput.value).length === 9) {
        phoneInput.setCustomValidity("");
      } else {
        phoneInput.setCustomValidity(t("detail.phoneValidation"));
      }
    };

    syncPhoneValue();

    phoneInput.addEventListener("focus", () => {
      if (!phoneInput.value.trim()) {
        phoneInput.value = formatPhoneNumber("", true);
      }

      phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    });

    phoneInput.addEventListener("input", () => {
      syncPhoneValue();
      phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    });

    phoneInput.addEventListener("keydown", (event) => {
      if ((event.key === "Backspace" || event.key === "Delete") && phoneInput.selectionStart <= 5) {
        event.preventDefault();
        phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
      }
    });
  }

  function extractCardDigits(value) {
    return String(value || "")
      .replace(/\D/g, "")
      .slice(0, 16);
  }

  function formatCardNumber(value) {
    const digits = extractCardDigits(value);
    const parts = [];

    for (let index = 0; index < digits.length; index += 4) {
      parts.push(digits.slice(index, index + 4));
    }

    return parts.join(" ");
  }

  function getPaymentPreviewMeta(paymentMethod) {
    const previewMap = {
      payme: "Wallet ID 5457",
      click: "Click wallet 2804",
      humo: "5614 68** **** 5457",
      uzcard: {
        uz: "Paynet ilovasi",
        ru: "Paynet app",
        en: "Paynet app"
      }
    };

    const previewValue = previewMap[paymentMethod];

    return {
      senderAccount:
        (previewValue && typeof previewValue === "object" ? previewValue[getLanguage()] : previewValue) ??
        "0000 0000 0000 0000",
      receiverAccount: "0000 0000 0000 0000"
    };
  }

  function buildPaymentSheetMarkup(paymentState) {
    const preview = getPaymentPreviewMeta(paymentState.paymentMethod);

    return `
      <div class="payment-sheet__header">
        <div>
          <p class="mini-label">${t("detail.paymentDemoTitle")}</p>
          <h3 id="paymentSheetTitle">${escapeHtml(paymentState.courseTitle)}</h3>
          <p>${t("detail.paymentDemoText")}</p>
        </div>
        <button class="button-secondary payment-sheet__close" type="button" data-payment-close>
          ${t("detail.closePayment")}
        </button>
      </div>

      <div class="payment-sheet__focus">
        <span class="payment-sheet__focus-label">${t("detail.payingForLabel")}</span>
        <strong class="payment-sheet__focus-title">${escapeHtml(paymentState.courseTitle)}</strong>
        <div class="payment-sheet__focus-meta">
          <span class="payment-sheet__focus-pill">${escapeHtml(paymentState.planTitle)}</span>
          <span class="payment-sheet__focus-pill">${escapeHtml(paymentState.amount)}</span>
        </div>
      </div>

      <div class="payment-sheet__stack">
        <div class="payment-sheet__group">
          <span class="payment-sheet__label">${t("detail.senderLabel")}</span>
          <button
            class="payment-sheet__card payment-sheet__card--sender"
            type="button"
            data-payment-method-toggle
            aria-label="${t("detail.paymentMethods." + paymentState.paymentMethod)}"
          >
            <span class="payment-sheet__brand" aria-hidden="true" data-payment-sender-brand>${getFormIcon(paymentState.paymentMethod)}</span>
            <span class="payment-sheet__content">
              <strong>${escapeHtml(paymentState.amount)}</strong>
              <span data-payment-sender-account>${escapeHtml(preview.senderAccount)}</span>
            </span>
            <span class="payment-sheet__status" aria-hidden="true"></span>
            <span class="payment-sheet__caret" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <div class="payment-sheet__group">
          <span class="payment-sheet__label">${t("detail.receiverLabel")}</span>
          <label class="payment-sheet__card payment-sheet__card--receiver">
            <span class="payment-sheet__receiver-icon" aria-hidden="true">${getFormIcon("payment")}</span>
            <span class="payment-sheet__content">
              <input
                class="payment-sheet__input"
                type="text"
                inputmode="numeric"
                autocomplete="cc-number"
                placeholder="${t("detail.receiverPlaceholder")}"
                value="${preview.receiverAccount}"
                data-payment-receiver
                required
              />
              <span>${t("detail.receiverHelp")}</span>
            </span>
          </label>
        </div>
      </div>

      <div class="payment-sheet__actions">
        <button class="button-secondary" type="button" data-payment-close>${t("detail.closePayment")}</button>
        <button class="button" type="button" data-payment-confirm>${t("detail.confirmPayment")}</button>
      </div>
    `;
  }

  function buildPlanCards(plans, activePlanId) {
    const resolvedActiveId = activePlanId ?? plans[0]?.id;

    return plans
      .map((plan) => {
        const isActive = plan.id === resolvedActiveId;
        const isTitleOnly = !plan.amount && !plan.note;

        return `
          <button
            class="plan-card ${isActive ? "is-active" : ""} ${isTitleOnly ? "plan-card--title-only" : ""}"
            type="button"
            data-plan-id="${escapeHtml(plan.id)}"
            data-plan-title="${escapeHtml(plan.title)}"
            data-plan-amount="${escapeHtml(plan.amount)}"
            data-plan-note="${escapeHtml(plan.note)}"
          >
            <h3>${escapeHtml(plan.title)}</h3>
            ${plan.amount ? `<span class="payment-amount">${escapeHtml(plan.amount)}</span>` : ""}
            ${plan.note ? `<p class="payment-caption">${escapeHtml(plan.note)}</p>` : ""}
          </button>
        `;
      })
      .join("");
  }

  function buildPaymentMethodsMarkup(selectedMethod = "payme", inputName = "paymentMethod") {
    return `
      <div class="payment-methods payment-methods--standalone">
        <label class="payment-method payment-method--payme">
          <input type="radio" name="${escapeHtml(inputName)}" value="payme" ${selectedMethod === "payme" ? "checked" : ""} aria-label="${t("detail.paymentMethods.payme")}" />
          <span class="payment-method__icon" aria-hidden="true">${getFormIcon("payme")}</span>
        </label>
        <label class="payment-method payment-method--click">
          <input type="radio" name="${escapeHtml(inputName)}" value="click" ${selectedMethod === "click" ? "checked" : ""} aria-label="${t("detail.paymentMethods.click")}" />
          <span class="payment-method__icon" aria-hidden="true">${getFormIcon("click")}</span>
        </label>
        <div class="payment-method-bank-row">
          <label class="payment-method payment-method--humo">
            <input type="radio" name="${escapeHtml(inputName)}" value="humo" ${selectedMethod === "humo" ? "checked" : ""} aria-label="${t("detail.paymentMethods.humo")}" />
            <span class="payment-method__icon" aria-hidden="true">${getFormIcon("humo")}</span>
          </label>
          <label class="payment-method payment-method--uzcard">
            <input type="radio" name="${escapeHtml(inputName)}" value="uzcard" ${selectedMethod === "uzcard" ? "checked" : ""} aria-label="${t("detail.paymentMethods.uzcard")}" />
            <span class="payment-method__icon" aria-hidden="true">${getFormIcon("uzcard")}</span>
          </label>
        </div>
      </div>
    `;
  }

  function renderEmptyState(root) {
    const titleKey =
      (root && root.id === "registerPage" && "meta.registerTitle") ||
      (root && root.id === "paymentPage" && "meta.paymentTitle") ||
      "meta.courseTitle";

    document.title = t(titleKey);
    root.innerHTML = `
      <section class="empty-state">
        <span class="eyebrow">${t("detail.notFoundTag")}</span>
        <h1>${t("detail.notFoundTitle")}</h1>
        <p>${t("detail.notFoundText")}</p>
        <a class="button" href="index.html">${t("detail.backToCourses")}</a>
      </section>
    `;
  }

  window.CoursePageUtils = {
    bindPhoneMask,
    buildAdminPanelHref,
    buildPageHref,
    buildPaymentMethodsMarkup,
    buildPaymentSheetMarkup,
    buildPlanCards,
    escapeHtml,
    extractCardDigits,
    extractPhoneDigits,
    formatCardNumber,
    formatPhoneNumber,
    getCourseBySlug,
    getFormIcon,
    getLocalizedCourseBySlug,
    getPaymentPreviewMeta,
    getPlanById,
    getQueryState,
    localizeCourse,
    fetchCourseStudents,
    fetchCourseTeacher,
    renderEmptyState,
    replaceQueryParams,
    saveApplicationSubmission,
    t
  };
})();
