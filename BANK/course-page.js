const detailRoot = document.getElementById("courseDetail");
const U = window.CoursePageUtils;
let detailTopbarObserver = null;

function getSidebarBadgeMarkup(course) {
  const iconMap = {
    "full-stack-web-development": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2.5"></rect>
        <path d="M8 7.5h8"></path>
        <path d="M8.5 11h2.5"></path>
        <path d="M13 11h2.5"></path>
        <path d="M8.5 15h2.5"></path>
        <path d="M13 15h2.5"></path>
      </svg>
    `,
    "cloud-computing": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="1.4"></circle>
        <path d="M4.8 12c0-2.6 3.2-4.7 7.2-4.7s7.2 2.1 7.2 4.7-3.2 4.7-7.2 4.7-7.2-2.1-7.2-4.7Z"></path>
        <path d="M8.1 6.7c2.3-1.3 5.9-.4 8 2.6 2.1 3 .2 6.7-2.1 8-2.3 1.3-5.9.4-8-2.6-2.1-3-.2-6.7 2.1-8Z"></path>
        <path d="M15.9 6.7c-2.3-1.3-5.9-.4-8 2.6-2.1 3-.2 6.7 2.1 8 2.3 1.3 5.9.4 8-2.6 2.1-3 .2-6.7-2.1-8Z"></path>
      </svg>
    `,
    "devops-platform-engineering": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5c2.7 0 5 .7 7 2 2-1.3 4.3-2 7-2v11c-2.7 0-5 .7-7 2-2-1.3-4.3-2-7-2Z"></path>
        <path d="M12 8.5v11"></path>
        <path d="M8 10.5h1.5"></path>
        <path d="M8 13.5h3"></path>
        <path d="M14.5 10.5H16"></path>
        <path d="M13 13.5h3"></path>
      </svg>
    `,
    "backend-api-engineering": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 19h12"></path>
        <path d="M8.5 19V8h7v11"></path>
        <path d="M7.5 8h9"></path>
        <path d="M10 5h4"></path>
        <path d="M10.5 11.5h3"></path>
        <path d="M10.5 14.5h3"></path>
      </svg>
    `,
    "mobile-app-development": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 8.5h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H9l-4 2v-2H6a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z"></path>
        <path d="M8 12h5"></path>
        <path d="M8 15h3.5"></path>
      </svg>
    `,
    "ui-ux-product-design": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19c-3.8 0-7-2.7-7-6.3 0-2.6 1.8-4.9 4.4-5.9A5.1 5.1 0 0 1 19 9.2c0 3.6-3.2 9.8-7 9.8Z"></path>
        <path d="M12 18c-1.1-3.1-.6-5.9 1.5-8.5"></path>
      </svg>
    `,
    cybersecurity: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 4.5h6"></path>
        <path d="M10 4.5v4l-4.2 7.3A3 3 0 0 0 8.4 20h7.2a3 3 0 0 0 2.6-4.2L14 8.5v-4"></path>
        <path d="M8.8 13h6.4"></path>
      </svg>
    `,
    "data-science-big-data": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5"></circle>
        <path d="M3.5 12h17"></path>
        <path d="M12 3.5a12.4 12.4 0 0 1 0 17"></path>
        <path d="M12 3.5a12.4 12.4 0 0 0 0 17"></path>
      </svg>
    `,
    "ai-engineering-machine-learning": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="10" rx="2"></rect>
        <path d="M8.5 19h7"></path>
        <path d="M10 15.5v3.5"></path>
        <path d="M14 15.5v3.5"></path>
        <path d="M7.5 9h9"></path>
      </svg>
    `,
    "qa-automation-testing": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5.5" y="4" width="13" height="16" rx="2.5"></rect>
        <path d="M8.5 8h7"></path>
        <path d="M8.5 12h7"></path>
        <path d="M8.5 16h4.5"></path>
      </svg>
    `
  };

  return iconMap[course.slug] ?? U.escapeHtml(course.short || course.title.slice(0, 2));
}

function buildPlanPreview(course) {
  return course.plans
    .map((plan) => `<li>${U.escapeHtml(plan.title)}</li>`)
    .join("");
}

function buildRegisterSection(course, selectedPlan) {
  return `
    <div class="detail-hero__register apply-grid" id="courseRegister" hidden>
      <div class="apply-card">
        <p class="mini-label">${U.t("detail.register")}</p>
        <h2>${U.t("detail.registerPageTitle")}</h2>
        <p>${U.t("detail.formIntroSeparate")}</p>

        <form class="apply-form" id="applyForm">
          <div class="field-row">
            <label class="field-group">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("name")}</span>
                ${U.t("detail.firstName")}
              </span>
              <span class="input-shell">
                <span class="input-shell__icon" aria-hidden="true">${U.getFormIcon("name")}</span>
                <input class="form-control form-control--with-icon" type="text" name="firstName" autocomplete="given-name" placeholder="${U.t("detail.firstNamePlaceholder")}" required />
              </span>
            </label>
            <label class="field-group">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("lastName")}</span>
                ${U.t("detail.lastName")}
              </span>
              <span class="input-shell">
                <span class="input-shell__icon" aria-hidden="true">${U.getFormIcon("lastName")}</span>
                <input class="form-control form-control--with-icon" type="text" name="lastName" autocomplete="family-name" placeholder="${U.t("detail.lastNamePlaceholder")}" required />
              </span>
            </label>
          </div>

          <div class="field-row">
            <label class="field-group">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("phone")}</span>
                ${U.t("detail.phone")}
              </span>
              <span class="input-shell">
                <span class="input-shell__icon" aria-hidden="true">${U.getFormIcon("phone")}</span>
                <input class="form-control form-control--with-icon" type="tel" name="phone" inputmode="numeric" autocomplete="tel" placeholder="${U.t("detail.phonePlaceholder")}" required />
              </span>
            </label>
            <label class="field-group">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("studyMode")}</span>
                ${U.t("detail.studyMode")}
              </span>
              <span class="input-shell">
                <span class="input-shell__icon" aria-hidden="true">${U.getFormIcon("studyMode")}</span>
                <select class="form-control form-control--with-icon" name="studyMode" required>
                  <option value="offline">${U.t("detail.studyModes.offline")}</option>
                  <option value="online">${U.t("detail.studyModes.online")}</option>
                  <option value="hybrid">${U.t("detail.studyModes.hybrid")}</option>
                </select>
              </span>
            </label>
          </div>

          <label class="field-group">
            <span class="field-label">
              <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("startDate")}</span>
              ${U.t("detail.startDate")}
            </span>
            <span class="input-shell">
              <span class="input-shell__icon" aria-hidden="true">${U.getFormIcon("startDate")}</span>
              <input class="form-control form-control--with-icon" type="date" name="startDate" required />
            </span>
          </label>

          <section class="payment-section register-payment-section">
            <div class="payment-section__header">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("payment")}</span>
                ${U.t("detail.paymentMethod")}
              </span>
              <p class="payment-section__text">${U.t("detail.paymentsText")}</p>
            </div>
            ${U.buildPaymentMethodsMarkup("payme", "registerPaymentMethod")}

            <button class="button button--with-icon button--block" type="button" data-register-payment-continue>
              <span class="button__icon" aria-hidden="true">${U.getFormIcon("submit")}</span>
              ${U.t("detail.startPayment")}
            </button>
          </section>

          <button class="button button--with-icon button--block" type="submit" aria-label="${U.t("detail.submitApplication")}">
            <span class="button__icon" aria-hidden="true">${U.getFormIcon("submit")}</span>
            ${U.t("detail.submitApplication")}
          </button>
        </form>

        <div class="success-banner" id="successBanner"></div>
      </div>

      <aside class="summary-card">
        <p class="mini-label">${U.t("detail.selectedCourse")}</p>
        <h3>${U.escapeHtml(course.title)}</h3>
        <p>${U.t("detail.registerSummaryIntro")}</p>

        <div class="summary-list">
          <div class="summary-item">
            <span>${U.t("detail.course")}</span>
            <span>${U.escapeHtml(course.title)}</span>
          </div>
          <div class="summary-item">
            <span>${U.t("detail.plan")}</span>
            <span>${U.escapeHtml(selectedPlan?.title || "")}</span>
          </div>
          <div class="summary-item">
            <span>${U.t("detail.price")}</span>
            <span>${U.escapeHtml(selectedPlan?.amount || "")}</span>
          </div>
          <div class="summary-item">
            <span>${U.t("detail.note")}</span>
            <span>${U.escapeHtml(selectedPlan?.note || "")}</span>
          </div>
        </div>

        <div class="summary-card__actions">
          <a class="button-secondary" href="${U.buildPageHref("payment.html", course.slug, selectedPlan?.id)}">${U.t("detail.choosePlanFirst")}</a>
        </div>
      </aside>
    </div>
  `;
}

function buildDetailTopNav(course) {
  return `
    <section class="detail-topbar" data-detail-topbar aria-label="${U.t("index.sectionsLabel")}">
      <div class="detail-topbar__summary">
        <span class="detail-topbar__badge" aria-hidden="true">${getSidebarBadgeMarkup(course)}</span>
        <div class="detail-topbar__copy">
          <p class="mini-label">${U.t("detail.selectedCourse")}</p>
          <h2 class="detail-topbar__title">${U.escapeHtml(course.title)}</h2>
        </div>
      </div>

      <nav class="detail-topbar__links" aria-label="${U.t("index.sectionsLabel")}">
        <a class="detail-topbar__link" href="#courseModules">${U.t("detail.whatYouGet")}</a>
        <a class="detail-topbar__link" href="#courseResult">${U.t("detail.result")}</a>
        <a class="detail-topbar__link" href="#courseOverview">${U.t("detail.brief")}</a>
        <a class="detail-topbar__link" href="#courseRegister" data-register-open>${U.t("detail.register")}</a>
      </nav>
    </section>
    <div class="detail-topbar-spacer" data-detail-topbar-spacer aria-hidden="true"></div>
  `;
}

function syncDetailTopbar() {
  if (!detailRoot) {
    return;
  }

  const topbar = detailRoot.querySelector("[data-detail-topbar]");
  const spacer = detailRoot.querySelector("[data-detail-topbar-spacer]");

  if (!topbar || !spacer) {
    document.documentElement.style.removeProperty("--detail-topbar-offset");
    return;
  }

  const styles = window.getComputedStyle(topbar);
  const topOffset = parseFloat(styles.top || "0") || 0;
  const marginBottom = parseFloat(styles.marginBottom || "0") || 0;
  const totalHeight = Math.ceil(topbar.offsetHeight + marginBottom);

  spacer.style.height = `${totalHeight}px`;
  document.documentElement.style.setProperty("--detail-topbar-offset", `${Math.ceil(totalHeight + topOffset + 16)}px`);
}

function bindDetailTopbar() {
  if (detailTopbarObserver) {
    detailTopbarObserver.disconnect();
    detailTopbarObserver = null;
  }

  const topbar = detailRoot ? detailRoot.querySelector("[data-detail-topbar]") : null;

  if (!topbar) {
    document.documentElement.style.removeProperty("--detail-topbar-offset");
    return;
  }

  syncDetailTopbar();

  if ("ResizeObserver" in window) {
    detailTopbarObserver = new ResizeObserver(() => {
      syncDetailTopbar();
    });
    detailTopbarObserver.observe(topbar);
  }
}

function syncRegisterTriggers(isExpanded) {
  const triggers = detailRoot ? Array.from(detailRoot.querySelectorAll("[data-register-open]")) : [];

  triggers.forEach((trigger) => {
    trigger.setAttribute("aria-controls", "courseRegister");
    trigger.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  });
}

function revealRegisterSection(scrollIntoView = true) {
  const registerSection = detailRoot ? detailRoot.querySelector("#courseRegister") : null;

  if (!registerSection) {
    return;
  }

  registerSection.hidden = false;
  syncRegisterTriggers(true);

  const nextUrl = new URL(window.location.href);
  window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}`);

  if (scrollIntoView) {
    registerSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function bindRegisterTriggers() {
  const triggers = detailRoot ? Array.from(detailRoot.querySelectorAll("[data-register-open]")) : [];

  syncRegisterTriggers(false);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      revealRegisterSection(true);
    });
  });
}

function bindApplicationForm(course, selectedPlan) {
  const form = document.getElementById("applyForm");
  const successBanner = document.getElementById("successBanner");

  if (!form || !successBanner || !selectedPlan) {
    return;
  }

  const phoneInput = form.querySelector('input[name="phone"]');

  U.bindPhoneMask(phoneInput);

  const showSuccessMessage = (applicationState) => {
    successBanner.textContent = "";

    const title = document.createElement("strong");
    title.textContent = U.t("detail.registrationAccepted");

    const message = document.createElement("p");
    message.textContent = U.t("detail.registrationSuccessMessage", {
      name: applicationState.name,
      course: applicationState.courseTitle,
      plan: applicationState.planTitle,
      phone: applicationState.phone,
      studyMode: U.t(`detail.studyModes.${applicationState.studyMode}`)
    });

    const actions = document.createElement("div");
    actions.className = "success-banner__actions";

    const paymentLink = document.createElement("a");
    paymentLink.className = "button-secondary";
    paymentLink.href = U.buildPageHref("payment.html", course.slug, selectedPlan.id);
    paymentLink.textContent = U.t("detail.goToPaymentPage");

    const adminLink = document.createElement("a");
    adminLink.className = "button";
    adminLink.href = U.buildAdminPanelHref("applications");
    adminLink.target = "_blank";
    adminLink.rel = "noopener";
    adminLink.textContent = U.t("detail.openAdminApplications");

    actions.append(paymentLink, adminLink);

    successBanner.classList.add("is-visible");
    successBanner.append(title, message, actions);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const name = `${firstName} ${lastName}`.trim();
    const phone = U.formatPhoneNumber(String(formData.get("phone") || ""));
    const studyMode = String(formData.get("studyMode") || "offline");
    const startDate = String(formData.get("startDate") || "");

    if (U.extractPhoneDigits(phone).length !== 9) {
      phoneInput.setCustomValidity(U.t("detail.phoneValidation"));
      phoneInput.reportValidity();
      return;
    }

    phoneInput.setCustomValidity("");
    successBanner.textContent = "";
    successBanner.classList.remove("is-visible");

    const applicationState = {
      courseTitle: course.title,
      name,
      phone,
      planTitle: selectedPlan.title,
      studyMode,
      studyModeLabel: U.t(`detail.studyModes.${studyMode}`),
      startDate,
      amount: selectedPlan.amount
    };

    U.saveApplicationSubmission(course, selectedPlan, applicationState);
    showSuccessMessage(applicationState);
    window.open(U.buildAdminPanelHref("applications"), "_blank", "noopener");

    form.reset();
    phoneInput.value = U.formatPhoneNumber("", true);
    phoneInput.setCustomValidity(U.t("detail.phoneValidation"));
  });
}

function bindRegisterPaymentContinue(course, selectedPlan) {
  const continueButton = detailRoot ? detailRoot.querySelector("[data-register-payment-continue]") : null;

  if (!continueButton || !selectedPlan) {
    return;
  }

  continueButton.addEventListener("click", () => {
    const selectedMethod =
      detailRoot.querySelector('input[name="registerPaymentMethod"]:checked')?.value || "payme";

    window.location.href = U.buildPageHref("payment.html", course.slug, selectedPlan.id, selectedMethod);
  });
}

function renderCourseOverview(course, selectedPlan) {
  document.title = `${course.title} | ${U.t("meta.courseTitle")}`;

  detailRoot.innerHTML = `
    ${buildDetailTopNav(course)}

    <section class="detail-section" id="courseModules">
      <div>
        <h2>${U.t("detail.whatYouGet")}</h2>
        <ul class="modules">
          ${course.modules.map((module) => `<li>${U.escapeHtml(module)}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="detail-section detail-card" id="courseResult">
      <p class="mini-label">${U.t("detail.result")}</p>
      <ul class="detail-list">
        ${course.outcomes.map((item) => `<li>${U.escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>

    <section class="detail-section" id="courseOverview">
      <div class="detail-hero__panel">
        <p class="mini-label">${U.t("detail.brief")}</p>
        <div class="stat-grid">
          <article class="detail-card">
            <p>${U.t("detail.duration")}</p>
            <strong>${U.escapeHtml(course.duration)}</strong>
          </article>
          <article class="detail-card">
            <p>${U.t("detail.format")}</p>
            <strong>${U.escapeHtml(course.format)}</strong>
          </article>
          <article class="detail-card">
            <p>${U.t("detail.fullPrice")}</p>
            <strong>${U.escapeHtml(course.price)}</strong>
          </article>
          <article class="detail-card">
            <p>${U.t("detail.monthly")}</p>
            <strong>${U.escapeHtml(course.monthly)}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="detail-hero">
      <div>
        <span class="eyebrow">${U.escapeHtml(course.level)}</span>
        <h1 class="detail-hero__title">${U.escapeHtml(course.title)}</h1>
        <p class="detail-hero__lead">${U.escapeHtml(course.description)}</p>
        <div class="detail-hero__actions">
          <a class="button" href="#courseRegister" data-register-open>${U.t("detail.openRegistrationPage")}</a>
          <a class="button-secondary" href="index.html">${U.t("detail.backAll")}</a>
        </div>

        ${buildRegisterSection(course, selectedPlan)}
      </div>
    </section>

    <section class="flow-grid detail-section" id="courseNextSteps">
      <article class="payment-card flow-card" id="coursePayment">
        <h2>${U.t("detail.paymentPageTitle")}</h2>
        <p>${U.t("detail.paymentPageIntro")}</p>
        <ul class="detail-list flow-card__list">
          ${buildPlanPreview(course)}
        </ul>
        <div class="flow-card__actions">
          <a class="button" href="${U.buildPageHref("payment.html", course.slug, selectedPlan?.id)}">${U.t("detail.openPaymentsPage")}</a>
        </div>
      </article>
    </section>
  `;
}

function renderPage() {
  const { selectedSlug, selectedPlanId } = U.getQueryState();
  const course = U.getLocalizedCourseBySlug(selectedSlug);

  if (!course) {
    U.renderEmptyState(detailRoot);
    bindDetailTopbar();
    return;
  }

  const selectedPlan = U.getPlanById(course, selectedPlanId);
  renderCourseOverview(course, selectedPlan);
  bindRegisterTriggers();
  bindApplicationForm(course, selectedPlan);
  bindRegisterPaymentContinue(course, selectedPlan);
  if (window.location.hash === "#courseRegister") {
    revealRegisterSection(false);
  }
  bindDetailTopbar();
}

renderPage();
window.addEventListener("resize", syncDetailTopbar);
window.addEventListener("app:languagechange", renderPage);
