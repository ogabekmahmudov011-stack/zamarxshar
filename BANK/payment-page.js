const paymentRoot = document.getElementById("paymentPage");
const U = window.CoursePageUtils;

function buildCourseRegisterHref(course, planId) {
  return `${U.buildPageHref("course.html", course.slug, planId)}#courseRegister`;
}

function renderPaymentPage(course, selectedPlan, initialMethod = "payme") {
  document.body.classList.remove("has-payment-sheet");
  document.title = `${course.title} | ${U.t("meta.paymentTitle")}`;

  paymentRoot.innerHTML = `
    <section class="detail-hero">
      <div>
        <span class="eyebrow">${U.escapeHtml(course.title)}</span>
        <h1 class="detail-hero__title">${U.t("detail.paymentPageTitle")}</h1>
        <p class="detail-hero__lead">${U.t("detail.paymentPageIntro")}</p>
        <div class="detail-hero__actions">
          <a class="button" data-register-link href="${buildCourseRegisterHref(course, selectedPlan.id)}">${U.t("detail.openRegistrationPage")}</a>
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
            <p>${U.t("detail.price")}</p>
            <strong id="heroAmount">${U.escapeHtml(selectedPlan.amount)}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="apply-grid detail-section">
      <div class="payment-card payment-card--surface">
        <p class="mini-label">${U.t("detail.paymentsTitle")}</p>
        <h2>${U.t("detail.paymentMethod")}</h2>
        <p>${U.t("detail.paymentPageMethodsIntro")}</p>

        <form class="apply-form" id="paymentMethodForm">
          <section class="payment-section">
            <div class="payment-section__header">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("payment")}</span>
                ${U.t("detail.paymentsTitle")}
              </span>
              <p class="payment-section__text">${U.t("detail.paymentsText")}</p>
            </div>
            ${U.buildPaymentMethodsMarkup(initialMethod)}
          </section>

          <button class="button button--with-icon" type="submit">
            <span class="button__icon" aria-hidden="true">${U.getFormIcon("submit")}</span>
            ${U.t("detail.startPayment")}
          </button>
        </form>

        <div class="payment-sheet" id="paymentSheet" hidden aria-hidden="true">
          <button
            class="payment-sheet__backdrop"
            type="button"
            data-payment-close
            aria-label="${U.t("detail.closePayment")}"
          ></button>
          <section class="payment-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="paymentSheetTitle"></section>
        </div>
        <div class="success-banner" id="successBanner"></div>

        <section class="receipt-upload" id="receiptSection" hidden>
          <h3>${U.t("detail.receiptUploadTitle")}</h3>
          <p id="receiptIntro">${U.t("detail.receiptUploadIntro", {
            course: course.title,
            plan: selectedPlan.title
          })}</p>

          <div class="summary-list receipt-upload__summary">
            <div class="summary-item">
              <span>${U.t("detail.course")}</span>
              <span id="receiptCourse">${U.escapeHtml(course.title)}</span>
            </div>
            <div class="summary-item">
              <span>${U.t("detail.plan")}</span>
              <span id="receiptPlan">${U.escapeHtml(selectedPlan.title)}</span>
            </div>
            <div class="summary-item">
              <span>${U.t("detail.price")}</span>
              <span id="receiptAmount">${U.escapeHtml(selectedPlan.amount)}</span>
            </div>
            <div class="summary-item">
              <span>${U.t("detail.paymentMethod")}</span>
              <span id="receiptMethod">${U.t(`detail.paymentMethods.${initialMethod}`)}</span>
            </div>
          </div>

          <form class="apply-form" id="receiptUploadForm">
            <label class="field-group">
              <span class="field-label">
                <span class="field-label__icon" aria-hidden="true">${U.getFormIcon("receipt")}</span>
                ${U.t("detail.receiptFileLabel")}
              </span>
              <input
                class="form-control form-control--file"
                id="receiptFileInput"
                type="file"
                name="receiptFile"
                accept=".jpg,.jpeg,.png,.pdf"
                data-receipt-input
                required
              />
            </label>

            <p class="payment-section__text" id="receiptFileMeta">${U.t("detail.receiptUploadFormats")}</p>

            <button class="button button--with-icon" id="receiptUploadButton" type="submit" disabled>
              <span class="button__icon" aria-hidden="true">${U.getFormIcon("receipt")}</span>
              ${U.t("detail.receiptUploadButton")}
            </button>
          </form>

          <div class="success-banner" id="receiptSuccessBanner"></div>
        </section>
      </div>

      <aside class="summary-card">
        <p class="mini-label">${U.t("detail.selectedCourse")}</p>
        <h3>${U.escapeHtml(course.title)}</h3>
        <p>${U.t("detail.summaryIntro")}</p>

        <div class="summary-list">
          <div class="summary-item">
            <span>${U.t("detail.course")}</span>
            <span>${U.escapeHtml(course.title)}</span>
          </div>
          <div class="summary-item">
            <span>${U.t("detail.price")}</span>
            <span id="summaryAmount">${U.escapeHtml(selectedPlan.amount)}</span>
          </div>
        </div>

        <p>${U.t("detail.summaryNoteText")}</p>
      </aside>
    </section>
  `;
}

function bindPaymentInteractions(course, initialPlan) {
  const planCards = Array.from(document.querySelectorAll(".plan-card"));
  const paymentForm = document.getElementById("paymentMethodForm");
  const paymentSheet = document.getElementById("paymentSheet");
  const paymentSheetPanel = paymentSheet.querySelector(".payment-sheet__panel");
  const successBanner = document.getElementById("successBanner");
  const summaryAmount = document.getElementById("summaryAmount");
  const heroAmount = document.getElementById("heroAmount");
  const registerLinks = Array.from(document.querySelectorAll("[data-register-link]"));
  const receiptSection = document.getElementById("receiptSection");
  const receiptIntro = document.getElementById("receiptIntro");
  const receiptCourse = document.getElementById("receiptCourse");
  const receiptPlan = document.getElementById("receiptPlan");
  const receiptAmount = document.getElementById("receiptAmount");
  const receiptMethod = document.getElementById("receiptMethod");
  const receiptUploadForm = document.getElementById("receiptUploadForm");
  const receiptFileInput = document.getElementById("receiptFileInput");
  const receiptFileMeta = document.getElementById("receiptFileMeta");
  const receiptUploadButton = document.getElementById("receiptUploadButton");
  const receiptSuccessBanner = document.getElementById("receiptSuccessBanner");

  let activePlan = initialPlan;
  let closeTimerId = 0;
  let lastFocusedElement = null;
  let confirmedPaymentState = null;

  const closePaymentSheet = () => {
    document.body.classList.remove("has-payment-sheet");
    paymentSheet.setAttribute("aria-hidden", "true");
    paymentSheet.classList.remove("is-visible");

    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
    }

    closeTimerId = window.setTimeout(() => {
      if (paymentSheet.classList.contains("is-visible")) {
        return;
      }

      paymentSheet.hidden = true;
      paymentSheetPanel.innerHTML = "";
    }, 240);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      window.setTimeout(() => {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }, 40);
    }
  };

  const updateRegisterLinks = () => {
    const nextHref = buildCourseRegisterHref(course, activePlan.id);

    registerLinks.forEach((link) => {
      link.href = nextHref;
      link.textContent = U.t("detail.openRegistrationPage");
    });
  };

  const syncPlan = (plan) => {
    activePlan = plan;

    planCards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.planId === plan.id);
    });

    summaryAmount.textContent = plan.amount;
    heroAmount.textContent = plan.amount;
    updateRegisterLinks();
    U.replaceQueryParams({ course: course.slug, plan: plan.id });
  };

  const showSuccessMessage = (paymentState) => {
    successBanner.textContent = "";

    const title = document.createElement("strong");
    title.textContent = U.t("detail.paymentAccepted");

    const message = document.createElement("p");
    message.textContent = U.t("detail.paymentSuccessMessage", {
      course: paymentState.courseTitle,
      plan: paymentState.planTitle,
      paymentMethod: U.t(`detail.paymentMethods.${paymentState.paymentMethod}`)
    });

    const actions = document.createElement("div");
    actions.className = "success-banner__actions";

    const registerLink = document.createElement("a");
    registerLink.className = "button-secondary";
    registerLink.href = buildCourseRegisterHref(course, activePlan.id);
    registerLink.textContent = U.t("detail.openRegistrationPage");

    actions.append(registerLink);

    successBanner.classList.add("is-visible");
    successBanner.append(title, message, actions);
  };

  const showReceiptMessage = (receiptState) => {
    receiptSuccessBanner.textContent = "";

    const title = document.createElement("strong");
    title.textContent = U.t("detail.receiptUploaded");

    const message = document.createElement("p");
    message.textContent = U.t("detail.receiptUploadSuccessMessage", {
      course: receiptState.courseTitle,
      plan: receiptState.planTitle,
      fileName: receiptState.fileName
    });

    receiptSuccessBanner.classList.add("is-visible");
    receiptSuccessBanner.append(title, message);
  };

  const revealReceiptSection = (paymentState) => {
    confirmedPaymentState = paymentState;
    receiptSection.hidden = false;
    receiptIntro.textContent = U.t("detail.receiptUploadIntro", {
      course: paymentState.courseTitle,
      plan: paymentState.planTitle
    });
    receiptCourse.textContent = paymentState.courseTitle;
    receiptPlan.textContent = paymentState.planTitle;
    receiptAmount.textContent = paymentState.amount;
    receiptMethod.textContent = U.t(`detail.paymentMethods.${paymentState.paymentMethod}`);
    receiptUploadForm.reset();
    receiptFileInput.setCustomValidity("");
    receiptFileMeta.textContent = U.t("detail.receiptUploadFormats");
    receiptUploadButton.disabled = true;
    receiptSuccessBanner.textContent = "";
    receiptSuccessBanner.classList.remove("is-visible");

    window.setTimeout(() => {
      receiptSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      receiptFileInput.focus({ preventScroll: true });
    }, 120);
  };

  const bindPaymentSheet = (paymentState) => {
    const senderCard = paymentSheetPanel.querySelector("[data-payment-method-toggle]");
    const senderBrand = paymentSheetPanel.querySelector("[data-payment-sender-brand]");
    const senderAccount = paymentSheetPanel.querySelector("[data-payment-sender-account]");
    const receiverInput = paymentSheetPanel.querySelector("[data-payment-receiver]");
    const closeButtons = Array.from(paymentSheet.querySelectorAll("[data-payment-close]"));
    const confirmButton = paymentSheetPanel.querySelector("[data-payment-confirm]");
    const paymentMethodsOrder = ["payme", "click", "humo", "uzcard"];

    const syncPaymentMethodPreview = (nextMethod) => {
      const preview = U.getPaymentPreviewMeta(nextMethod);
      const nextInput = paymentForm.querySelector(`input[name="paymentMethod"][value="${nextMethod}"]`);

      paymentState.paymentMethod = nextMethod;

      if (nextInput) {
        nextInput.checked = true;
      }

      senderBrand.innerHTML = U.getFormIcon(nextMethod);
      senderAccount.textContent = preview.senderAccount;
      senderCard.setAttribute("aria-label", U.t(`detail.paymentMethods.${nextMethod}`));
    };

    senderCard.addEventListener("click", () => {
      const currentIndex = paymentMethodsOrder.indexOf(paymentState.paymentMethod);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % paymentMethodsOrder.length : 0;
      const nextMethod = paymentMethodsOrder[nextIndex];
      syncPaymentMethodPreview(nextMethod);
    });

    receiverInput.addEventListener("input", () => {
      receiverInput.value = U.formatCardNumber(receiverInput.value);

      if (U.extractCardDigits(receiverInput.value).length === 16) {
        receiverInput.setCustomValidity("");
      } else {
        receiverInput.setCustomValidity(U.t("detail.receiverValidation"));
      }
    });

    receiverInput.addEventListener("blur", () => {
      if (U.extractCardDigits(receiverInput.value).length !== 16) {
        receiverInput.reportValidity();
      }
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", closePaymentSheet);
    });

    confirmButton.addEventListener("click", () => {
      if (U.extractCardDigits(receiverInput.value).length !== 16) {
        receiverInput.setCustomValidity(U.t("detail.receiverValidation"));
        receiverInput.reportValidity();
        return;
      }

      receiverInput.setCustomValidity("");
      closePaymentSheet();
      showSuccessMessage(paymentState);
      revealReceiptSection(paymentState);
      paymentForm.reset();
      const defaultPaymentInput = paymentForm.querySelector('input[name="paymentMethod"][value="payme"]');

      if (defaultPaymentInput) {
        defaultPaymentInput.checked = true;
      }
    });

    receiverInput.focus({ preventScroll: true });
    receiverInput.setSelectionRange(receiverInput.value.length, receiverInput.value.length);
  };

  paymentSheet.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && paymentSheet.classList.contains("is-visible")) {
      closePaymentSheet();
    }
  });

  planCards.forEach((card) => {
    card.addEventListener("click", () => {
      const nextPlan = U.getPlanById(course, card.dataset.planId);

      if (nextPlan) {
        syncPlan(nextPlan);
      }
    });
  });

  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    successBanner.textContent = "";
    successBanner.classList.remove("is-visible");

    const formData = new FormData(paymentForm);
    const paymentMethod = String(formData.get("paymentMethod") || "payme");
    const paymentState = {
      amount: activePlan.amount || activePlan.title,
      courseTitle: course.title,
      paymentMethod,
      planTitle: activePlan.title
    };

    if (closeTimerId) {
      window.clearTimeout(closeTimerId);
    }

    lastFocusedElement = document.activeElement;
    paymentSheet.hidden = false;
    paymentSheet.setAttribute("aria-hidden", "false");
    paymentSheetPanel.innerHTML = U.buildPaymentSheetMarkup(paymentState);
    document.body.classList.add("has-payment-sheet");
    window.requestAnimationFrame(() => {
      paymentSheet.classList.add("is-visible");
    });
    bindPaymentSheet(paymentState);
  });

  receiptFileInput.addEventListener("change", () => {
    const receiptFile = receiptFileInput.files && receiptFileInput.files[0];

    receiptFileInput.setCustomValidity("");
    receiptUploadButton.disabled = !receiptFile;
    receiptFileMeta.textContent = receiptFile
      ? U.t("detail.receiptSelectedFile", {
          fileName: receiptFile.name
        })
      : U.t("detail.receiptUploadFormats");
    receiptSuccessBanner.textContent = "";
    receiptSuccessBanner.classList.remove("is-visible");
  });

  receiptUploadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const receiptFile = receiptFileInput.files && receiptFileInput.files[0];

    if (!receiptFile) {
      receiptFileInput.setCustomValidity(U.t("detail.receiptRequired"));
      receiptFileInput.reportValidity();
      return;
    }

    receiptFileInput.setCustomValidity("");

    if (!confirmedPaymentState) {
      return;
    }

    showReceiptMessage({
      ...confirmedPaymentState,
      fileName: receiptFile.name
    });

    receiptUploadForm.reset();
    receiptUploadButton.disabled = true;
    receiptFileMeta.textContent = U.t("detail.receiptUploadFormats");
  });

  syncPlan(initialPlan);
}

function renderPage() {
  const { selectedSlug, selectedPlanId, selectedPaymentMethod } = U.getQueryState();
  const course = U.getLocalizedCourseBySlug(selectedSlug);
  const allowedMethods = ["payme", "click", "humo", "uzcard"];
  const initialMethod = allowedMethods.includes(selectedPaymentMethod) ? selectedPaymentMethod : "payme";

  if (!course) {
    U.renderEmptyState(paymentRoot);
    return;
  }

  const selectedPlan = U.getPlanById(course, selectedPlanId);
  renderPaymentPage(course, selectedPlan, initialMethod);
  bindPaymentInteractions(course, selectedPlan);
}

renderPage();
window.addEventListener("app:languagechange", renderPage);
