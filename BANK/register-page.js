const registerRoot = document.getElementById("registerPage");
const U = window.CoursePageUtils;

function renderRegisterPage(course, selectedPlan) {
  document.title = `${course.title} | ${U.t("meta.registerTitle")}`;

  registerRoot.innerHTML = `
    <section class="detail-hero">
      <div>
        <span class="eyebrow">${U.escapeHtml(course.title)}</span>
        <h1 class="detail-hero__title">${U.t("detail.registerPageTitle")}</h1>
        <p class="detail-hero__lead">${U.t("detail.registerPageIntro")}</p>
        <div class="detail-hero__actions">
          <a class="button-secondary" href="${U.buildPageHref("course.html", course.slug, selectedPlan.id)}">${U.t("detail.backToCoursePage")}</a>
        </div>
      </div>

      <div class="detail-hero__panel">
        <p class="mini-label">${U.t("detail.selectedCourse")}</p>
        <div class="stat-grid">
          <article class="detail-card">
            <p>${U.t("detail.course")}</p>
            <strong>${U.escapeHtml(course.title)}</strong>
          </article>
          <article class="detail-card">
            <p>${U.t("detail.plan")}</p>
            <strong>${U.escapeHtml(selectedPlan.title)}</strong>
          </article>
          <article class="detail-card">
            <p>${U.t("detail.price")}</p>
            <strong>${U.escapeHtml(selectedPlan.amount)}</strong>
          </article>
          <article class="detail-card">
            <p>${U.t("detail.format")}</p>
            <strong>${U.escapeHtml(course.format)}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="apply-grid detail-section">
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
            <span>${U.escapeHtml(selectedPlan.title)}</span>
          </div>
          <div class="summary-item">
            <span>${U.t("detail.price")}</span>
            <span>${U.escapeHtml(selectedPlan.amount)}</span>
          </div>
          <div class="summary-item">
            <span>${U.t("detail.note")}</span>
            <span>${U.escapeHtml(selectedPlan.note)}</span>
          </div>
        </div>

        <div class="summary-card__actions">
          <a class="button-secondary" href="${U.buildPageHref("course.html", course.slug, selectedPlan.id)}">${U.t("detail.changePlan")}</a>
        </div>
      </aside>
    </section>
  `;
}

function bindApplicationForm(course, selectedPlan) {
  const form = document.getElementById("applyForm");
  const successBanner = document.getElementById("successBanner");
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

    successBanner.classList.add("is-visible");
    successBanner.append(title, message);
  };

  form.addEventListener("submit", async (event) => {
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
      courseSlug: course.slug,
      courseTitle: course.title,
      name,
      phone,
      planTitle: selectedPlan.title,
      studyMode,
      studyModeLabel: U.t(`detail.studyModes.${studyMode}`),
      startDate,
      amount: selectedPlan.amount
    };

    try {
      await U.saveApplicationSubmission(course, selectedPlan, applicationState);
      showSuccessMessage(applicationState);
      form.reset();
      phoneInput.value = U.formatPhoneNumber("", true);
      phoneInput.setCustomValidity(U.t("detail.phoneValidation"));
    } catch (error) {
      successBanner.textContent = "";
      successBanner.classList.add("is-visible");
      successBanner.append(Object.assign(document.createElement("p"), {
        textContent: error?.message || "Arizani yuborishda xato yuz berdi."
      }));
    }
  });
}

function renderPage() {
  const { selectedSlug, selectedPlanId } = U.getQueryState();
  const course = U.getLocalizedCourseBySlug(selectedSlug);

  if (!course) {
    U.renderEmptyState(registerRoot);
    return;
  }

  const selectedPlan = U.getPlanById(course, selectedPlanId);
  renderRegisterPage(course, selectedPlan);
  bindApplicationForm(course, selectedPlan);
}

renderPage();
window.addEventListener("app:languagechange", renderPage);
