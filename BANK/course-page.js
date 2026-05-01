const detailRoot = document.getElementById("courseDetail");
const U = window.CoursePageUtils;
let detailTopbarObserver = null;
let teacherOverride = null;
const teacherPhotoStorageKey = "bank-course-teacher-photos";
const teacherCertificateStorageKey = "bank-course-teacher-certificates";
const teacherPhotoCache = new Map();
const teacherCertificateCache = new Map();

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
    `,
    "german-language": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6.5h8a4 4 0 1 1 0 8H8.5"></path>
        <path d="M6 4.5v15"></path>
        <path d="M8.5 10.5H14"></path>
      </svg>
    `,
    "french-language": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 5h11"></path>
        <path d="M6 12h8.5"></path>
        <path d="M6 19h11"></path>
        <path d="M6 5v14"></path>
        <path d="m14.5 8.5 2-2 2 2"></path>
      </svg>
    `,
    "physical-education": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 10v4"></path>
        <path d="M7 8v8"></path>
        <path d="M17 8v8"></path>
        <path d="M20 10v4"></path>
        <path d="M7 12h10"></path>
      </svg>
    `,
    "fine-arts": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4.5c4.7 0 8.5 3.2 8.5 7.4 0 3-2.4 5.6-5.5 5.6H13.8c-.9 0-1.6.7-1.6 1.6 0 .8-.7 1.4-1.6 1.4A7.1 7.1 0 0 1 3.5 13c0-4.7 3.8-8.5 8.5-8.5Z"></path>
        <circle cx="8.2" cy="9.3" r="1"></circle>
        <circle cx="12" cy="7.7" r="1"></circle>
        <circle cx="15.6" cy="9.5" r="1"></circle>
      </svg>
    `,
    "music-culture": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 5v10.5"></path>
        <path d="M14 6.5 19 5v8.5"></path>
        <circle cx="10" cy="17" r="2.5"></circle>
        <circle cx="19" cy="15.5" r="2"></circle>
      </svg>
    `,
    technology: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m14.5 6.5 3-3 3 3-3 3"></path>
        <path d="M6.5 14.5 3.5 17.5 6.5 20.5l3-3"></path>
        <path d="M8 16l8-8"></path>
        <path d="m11.5 4.5 8 8"></path>
      </svg>
    `,
    "technical-drawing": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 18.5 12 5.5l7 13Z"></path>
        <path d="M9 13.5h6"></path>
        <path d="M7.2 18.5h9.6"></path>
      </svg>
    `,
    "character-education": `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20c4.2-2.4 6.5-5.1 6.5-8.8V6.5L12 4 5.5 6.5v4.7C5.5 14.9 7.8 17.6 12 20Z"></path>
        <path d="m9.5 11.8 1.6 1.6 3.4-3.6"></path>
      </svg>
    `,
    law: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14"></path>
        <path d="M7 8h10"></path>
        <path d="M5.5 8 3.5 12h4Z"></path>
        <path d="M20.5 8 18.5 12h4Z"></path>
        <path d="M8 19h8"></path>
      </svg>
    `,
    economics: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 19V9"></path>
        <path d="M10 19V5"></path>
        <path d="M15 19v-7"></path>
        <path d="M20 19V8"></path>
        <path d="M4 19h17"></path>
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

function getStoredTeacherPhoto(courseSlug) {
  if (!courseSlug) {
    return "";
  }

  if (teacherPhotoCache.has(courseSlug)) {
    return teacherPhotoCache.get(courseSlug) || "";
  }

  try {
    const rawValue = localStorage.getItem(teacherPhotoStorageKey);
    const storedPhotos = rawValue ? JSON.parse(rawValue) : {};
    const photo = typeof storedPhotos?.[courseSlug] === "string" ? storedPhotos[courseSlug] : "";

    if (photo) {
      teacherPhotoCache.set(courseSlug, photo);
    }

    return photo;
  } catch {
    return "";
  }
}

function saveStoredTeacherPhoto(courseSlug, photoDataUrl) {
  if (!courseSlug || !photoDataUrl) {
    return false;
  }

  teacherPhotoCache.set(courseSlug, photoDataUrl);

  try {
    const rawValue = localStorage.getItem(teacherPhotoStorageKey);
    const storedPhotos = rawValue ? JSON.parse(rawValue) : {};
    const nextPhotos = typeof storedPhotos === "object" && storedPhotos ? storedPhotos : {};

    nextPhotos[courseSlug] = photoDataUrl;
    localStorage.setItem(teacherPhotoStorageKey, JSON.stringify(nextPhotos));
    return true;
  } catch {
    return false;
  }
}

function getTeacherPhotoInputId(courseSlug) {
  return `teacher-photo-${courseSlug || "course"}`;
}

function getTeacherCertificateInputId(courseSlug) {
  return `teacher-certificate-${courseSlug || "course"}`;
}

function getTeacherCertificateStatusValue(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  if (Object.prototype.hasOwnProperty.call(value, "status")) {
    return value.status;
  }

  if (Object.prototype.hasOwnProperty.call(value, "state")) {
    return value.state;
  }

  if (Object.prototype.hasOwnProperty.call(value, "available")) {
    return value.available;
  }

  if (Object.prototype.hasOwnProperty.call(value, "certified")) {
    return value.certified;
  }

  return null;
}

function inferTeacherCertificateName(fileUrl) {
  if (!fileUrl || String(fileUrl).startsWith("data:")) {
    return "";
  }

  try {
    const parsedUrl = new URL(fileUrl, window.location.href);
    const segments = parsedUrl.pathname.split("/").filter(Boolean);
    return decodeURIComponent(segments[segments.length - 1] || "");
  } catch {
    return "";
  }
}

function normalizeTeacherCertificateRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const fileUrl = String(value.fileUrl || value.url || value.src || value.file || "").trim();

  if (!fileUrl) {
    return null;
  }

  const fileName =
    String(value.fileName || value.name || value.title || inferTeacherCertificateName(fileUrl)).trim() ||
    "teacher-certificate";
  const mimeType = String(value.mimeType || value.type || "").trim();

  return {
    fileUrl,
    fileName,
    mimeType
  };
}

function isTeacherCertificatePdf(certificateFile) {
  if (!certificateFile || typeof certificateFile !== "object") {
    return false;
  }

  const mimeType = String(certificateFile.mimeType || "").trim().toLowerCase();
  const fileName = String(certificateFile.fileName || "").trim().toLowerCase();
  const fileUrl = String(certificateFile.fileUrl || "").trim().toLowerCase();

  return mimeType === "application/pdf" || fileName.endsWith(".pdf") || fileUrl.startsWith("data:application/pdf");
}

function resolveTeacherCertificate(value) {
  if (value === true) {
    return "yes";
  }

  if (value === false) {
    return "no";
  }

  const normalized = String(value || "").trim().toLowerCase();

  if (!normalized) {
    return "unknown";
  }

  if (["true", "yes", "bor", "available", "certified"].includes(normalized)) {
    return "yes";
  }

  if (["false", "no", "yoq", "yo'q", "not available", "not certified"].includes(normalized)) {
    return "no";
  }

  return "unknown";
}

function getTeacherCertificateBadge(certificateState) {
  const certificateMap = {
    yes: {
      className: "teacher-card__badge teacher-card__badge--yes",
      label: U.t("detail.teacherCertified")
    },
    no: {
      className: "teacher-card__badge teacher-card__badge--no",
      label: U.t("detail.teacherNotCertified")
    },
    unknown: {
      className: "teacher-card__badge teacher-card__badge--unknown",
      label: U.t("detail.teacherCertificateUnknown")
    }
  };

  return certificateMap[certificateState] || certificateMap.unknown;
}

function getStoredTeacherCertificate(courseSlug) {
  if (!courseSlug) {
    return null;
  }

  if (teacherCertificateCache.has(courseSlug)) {
    return teacherCertificateCache.get(courseSlug) || null;
  }

  try {
    const rawValue = localStorage.getItem(teacherCertificateStorageKey);
    const storedCertificates = rawValue ? JSON.parse(rawValue) : {};
    const certificate = normalizeTeacherCertificateRecord(storedCertificates?.[courseSlug]);

    if (certificate) {
      teacherCertificateCache.set(courseSlug, certificate);
    }

    return certificate;
  } catch {
    return null;
  }
}

function saveStoredTeacherCertificate(courseSlug, certificateRecord) {
  const normalizedRecord = normalizeTeacherCertificateRecord(certificateRecord);

  if (!courseSlug || !normalizedRecord) {
    return false;
  }

  teacherCertificateCache.set(courseSlug, normalizedRecord);

  try {
    const rawValue = localStorage.getItem(teacherCertificateStorageKey);
    const storedCertificates = rawValue ? JSON.parse(rawValue) : {};
    const nextCertificates =
      typeof storedCertificates === "object" && storedCertificates ? storedCertificates : {};

    nextCertificates[courseSlug] = normalizedRecord;
    localStorage.setItem(teacherCertificateStorageKey, JSON.stringify(nextCertificates));
    return true;
  } catch {
    return false;
  }
}

function getTeacherProfile(course) {
  const teacher = teacherOverride && typeof teacherOverride === "object"
    ? teacherOverride
    : (course && typeof course.teacher === "object" ? course.teacher : {});
  const name = String(teacher.name || "").trim() || U.t("detail.teacherNameFallback");
  const bio =
    String(teacher.bio || "").trim() ||
    U.t("detail.teacherBioFallback", { course: course.title });
  const photo = String(teacher.photoDataUrl || teacher.photo || "").trim();
  const certificateFile = normalizeTeacherCertificateRecord({
    fileUrl: teacher.certificateDataUrl || teacher.certificate?.fileUrl,
    fileName: teacher.certificateName || teacher.certificate?.fileName,
    mimeType: teacher.certificateType || teacher.certificate?.mimeType || teacher.certificate?.type
  }) || normalizeTeacherCertificateRecord(teacher.certificate);
  const certificateState = certificateFile
    ? "yes"
    : resolveTeacherCertificate(getTeacherCertificateStatusValue(teacher.certificate));

  return {
    name,
    bio,
    photo,
    certificateState,
    certificateFile
  };
}

function buildTeacherPhotoMarkup(course, teacher) {
  if (teacher.photo) {
    return `
      <img src="${U.escapeHtml(teacher.photo)}" alt="${U.escapeHtml(teacher.name)}" loading="lazy" />
    `;
  }

  return `
    <div class="teacher-card__placeholder">
      <span class="teacher-card__placeholder-text">${U.t("detail.teacherPhotoPlaceholder")}</span>
    </div>
  `;
}

function refreshTeacherPhotoMedia(course) {
  const media = detailRoot ? detailRoot.querySelector("[data-teacher-photo-media]") : null;

  if (!media) {
    return;
  }

  const teacher = getTeacherProfile(course);
  media.classList.toggle("teacher-card__media--empty", !teacher.photo);
  media.innerHTML = buildTeacherPhotoMarkup(course, teacher);
}

function bindTeacherPhotoUpload(course) {
  if (!detailRoot) {
    return;
  }

  const uploadInput = detailRoot.querySelector("[data-teacher-photo-input]");
  const uploadTrigger = detailRoot.querySelector("[data-teacher-photo-trigger]");

  if (!uploadInput || !uploadTrigger) {
    return;
  }

  if (uploadTrigger.dataset.bound !== "true") {
    uploadTrigger.dataset.bound = "true";
    uploadTrigger.addEventListener("click", () => {
      uploadInput.click();
    });
  }

  if (uploadInput.dataset.bound === "true") {
    return;
  }

  uploadInput.dataset.bound = "true";
  uploadInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];

    if (!file || !String(file.type || "").startsWith("image/")) {
      uploadInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const photoDataUrl = typeof reader.result === "string" ? reader.result : "";

      if (!photoDataUrl) {
        return;
      }

      saveStoredTeacherPhoto(course.slug, photoDataUrl);
      refreshTeacherPhotoMedia(course);
      uploadInput.value = "";
    });

    reader.readAsDataURL(file);
  });
}

function buildTeacherCertificateMarkup(course, teacher) {
  if (teacher.certificateFile) {
    const isPdf = isTeacherCertificatePdf(teacher.certificateFile);
    const previewMedia = isPdf
      ? `
        <div class="teacher-card__certificate-preview teacher-card__certificate-preview--pdf">
          <span class="teacher-card__certificate-preview-type">PDF</span>
          <strong class="teacher-card__certificate-preview-name">${U.escapeHtml(teacher.certificateFile.fileName)}</strong>
        </div>
      `
      : `
        <div class="teacher-card__certificate-preview">
          <img
            src="${U.escapeHtml(teacher.certificateFile.fileUrl)}"
            alt="${U.escapeHtml(teacher.certificateFile.fileName)}"
            loading="lazy"
          />
        </div>
      `;

    return `
      <div class="teacher-card__certificate-file teacher-card__certificate-file--filled">
        <button
          class="teacher-card__certificate-preview-trigger"
          type="button"
          data-teacher-certificate-view-trigger
          aria-label="${U.escapeHtml(U.t("detail.teacherCertificateView"))}"
          title="${U.escapeHtml(U.t("detail.teacherCertificateView"))}"
        >
          ${previewMedia}
        </button>
        <div class="teacher-card__certificate-details">
          <div class="teacher-card__certificate-copy">
            <strong class="teacher-card__certificate-file-name">${U.escapeHtml(teacher.certificateFile.fileName)}</strong>
            <span class="teacher-card__certificate-file-hint">${U.t("detail.teacherCertificateSelected")}</span>
          </div>
          <div class="teacher-card__certificate-actions">
            <button
              class="teacher-card__certificate-link teacher-card__certificate-link--button"
              type="button"
              data-teacher-certificate-view-trigger
            >
              ${U.t("detail.teacherCertificateView")}
            </button>
            <a
              class="teacher-card__certificate-link teacher-card__certificate-link--button"
              href="${U.escapeHtml(teacher.certificateFile.fileUrl)}"
              target="_blank"
              rel="noreferrer noopener"
            >
              ${U.t("detail.teacherCertificateView")}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="teacher-card__certificate-file teacher-card__certificate-file--empty">
      <div class="teacher-card__certificate-copy">
        <strong class="teacher-card__certificate-file-name">${U.t("detail.teacherCertificate")}</strong>
        <span class="teacher-card__certificate-file-hint">${U.t("detail.teacherCertificateUnknown")}</span>
      </div>
    </div>
  `;
}

function buildTeacherCertificateModalMarkup(course, teacher) {
  if (!teacher.certificateFile) {
    return "";
  }

  const modalTitleId = `teacher-certificate-modal-title-${course.slug || "course"}`;
  const viewerMarkup = isTeacherCertificatePdf(teacher.certificateFile)
    ? `
      <iframe
        src="${U.escapeHtml(teacher.certificateFile.fileUrl)}"
        title="${U.escapeHtml(teacher.certificateFile.fileName)}"
        loading="lazy"
      ></iframe>
    `
    : `
      <img
        src="${U.escapeHtml(teacher.certificateFile.fileUrl)}"
        alt="${U.escapeHtml(teacher.certificateFile.fileName)}"
        loading="lazy"
      />
    `;

  return `
    <div class="teacher-certificate-modal" data-teacher-certificate-modal hidden>
      <button class="teacher-certificate-modal__backdrop" type="button" data-teacher-certificate-close aria-label="${U.escapeHtml(U.t("detail.closePayment"))}"></button>
      <div class="teacher-certificate-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="${U.escapeHtml(modalTitleId)}">
        <div class="teacher-certificate-modal__header">
          <div>
            <span class="teacher-card__certificate-label">${U.t("detail.teacherCertificate")}</span>
            <h4 id="${U.escapeHtml(modalTitleId)}">${U.escapeHtml(teacher.certificateFile.fileName)}</h4>
          </div>
          <button class="button-secondary teacher-certificate-modal__close" type="button" data-teacher-certificate-close>
            ${U.t("detail.closePayment")}
          </button>
        </div>
        <div class="teacher-certificate-modal__viewer">
          ${viewerMarkup}
        </div>
      </div>
    </div>
  `;
}

function buildTeacherCertificateSectionMarkup(course, teacher) {
  const certificate = getTeacherCertificateBadge(teacher.certificateState);

  return `
    <div class="teacher-card__certificate">
      <span class="teacher-card__certificate-label">${U.t("detail.teacherCertificate")}</span>
      <strong class="${certificate.className}">${U.escapeHtml(certificate.label)}</strong>
    </div>
    <div class="teacher-card__certificate-panel">
      ${buildTeacherCertificateMarkup(course, teacher)}
    </div>
    ${buildTeacherCertificateModalMarkup(course, teacher)}
  `;
}

function refreshTeacherCertificateSection(course) {
  const certificateBlock = detailRoot
    ? detailRoot.querySelector("[data-teacher-certificate-block]")
    : null;

  if (!certificateBlock) {
    return;
  }

  const teacher = getTeacherProfile(course);
  certificateBlock.innerHTML = buildTeacherCertificateSectionMarkup(course, teacher);
  bindTeacherCertificatePreview(course);
}

function bindTeacherCertificateUpload(course) {
  if (!detailRoot) {
    return;
  }

  const uploadInput = detailRoot.querySelector("[data-teacher-certificate-input]");
  const uploadTrigger = detailRoot.querySelector("[data-teacher-certificate-trigger]");

  if (!uploadInput || !uploadTrigger) {
    return;
  }

  if (uploadTrigger.dataset.bound !== "true") {
    uploadTrigger.dataset.bound = "true";
    uploadTrigger.addEventListener("click", () => {
      uploadInput.click();
    });
  }

  if (uploadInput.dataset.bound === "true") {
    return;
  }

  uploadInput.dataset.bound = "true";
  uploadInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    const fileType = String(file?.type || "");
    const fileName = String(file?.name || "").trim();
    const isImage = fileType.startsWith("image/");
    const isPdf = fileType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");

    if (!file || (!isImage && !isPdf)) {
      uploadInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const fileUrl = typeof reader.result === "string" ? reader.result : "";

      if (!fileUrl) {
        return;
      }

      saveStoredTeacherCertificate(course.slug, {
        fileUrl,
        fileName,
        mimeType: fileType
      });
      refreshTeacherCertificateSection(course);
      uploadInput.value = "";
    });

    reader.readAsDataURL(file);
  });
}

function bindTeacherCertificatePreview() {
  if (!detailRoot) {
    return;
  }

  const modal = detailRoot.querySelector("[data-teacher-certificate-modal]");
  const viewTriggers = Array.from(detailRoot.querySelectorAll("[data-teacher-certificate-view-trigger]"));
  const closeTriggers = modal ? Array.from(modal.querySelectorAll("[data-teacher-certificate-close]")) : [];

  if (!modal || !viewTriggers.length) {
    document.body.classList.remove("has-certificate-preview");
    return;
  }

  const closePreview = () => {
    modal.hidden = true;
    document.body.classList.remove("has-certificate-preview");
  };

  const openPreview = () => {
    modal.hidden = false;
    document.body.classList.add("has-certificate-preview");
  };

  viewTriggers.forEach((trigger) => {
    if (trigger.dataset.bound === "true") {
      return;
    }

    trigger.dataset.bound = "true";
    trigger.addEventListener("click", openPreview);
  });

  closeTriggers.forEach((trigger) => {
    if (trigger.dataset.bound === "true") {
      return;
    }

    trigger.dataset.bound = "true";
    trigger.addEventListener("click", closePreview);
  });
}

function buildTeacherCard(course) {
  const teacher = getTeacherProfile(course);

  return `
    <article class="detail-card teacher-card">
      <div class="teacher-card__media${teacher.photo ? "" : " teacher-card__media--empty"}" data-teacher-photo-media>
        ${buildTeacherPhotoMarkup(course, teacher)}
      </div>
      <div class="teacher-card__content">
        <p class="mini-label">${U.t("detail.teacher")}</p>
        <h3>${U.escapeHtml(teacher.name)}</h3>
        <div class="teacher-card__info">
          <span class="teacher-card__info-label">${U.t("detail.teacherInfo")}</span>
          <p>${U.escapeHtml(teacher.bio)}</p>
        </div>
        <div class="teacher-card__certificate-stack" data-teacher-certificate-block>
          ${buildTeacherCertificateSectionMarkup(course, teacher)}
        </div>
      </div>
    </article>
  `;
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
        <a class="detail-topbar__link" href="#courseRegister" data-register-open data-register-mode="scroll">${U.t("detail.register")}</a>
        <a class="detail-topbar__link" href="#courseModules">${U.t("detail.whatYouGet")}</a>
        <a class="detail-topbar__link" href="#courseResult">${U.t("detail.result")}</a>
        <a class="detail-topbar__link" href="#courseOverview">${U.t("detail.brief")}</a>
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

  const wasHidden = registerSection.hidden;
  registerSection.hidden = false;
  if (wasHidden) {
    window.requestAnimationFrame(() => {
      registerSection.classList.add("is-visible");
    });
  } else {
    registerSection.classList.add("is-visible");
  }
  syncRegisterTriggers(true);

  const nextUrl = new URL(window.location.href);
  window.history.replaceState({}, "", `${nextUrl.pathname}${nextUrl.search}`);

  if (scrollIntoView) {
    registerSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  const firstField = registerSection.querySelector("input, select, textarea");
  if (firstField && typeof firstField.focus === "function") {
    window.setTimeout(() => {
      firstField.focus({ preventScroll: true });
    }, scrollIntoView ? 180 : 120);
  }
}

function bindRegisterTriggers() {
  const triggers = detailRoot ? Array.from(detailRoot.querySelectorAll("[data-register-open]")) : [];

  syncRegisterTriggers(false);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const shouldScroll = trigger.dataset.registerMode === "scroll";
      revealRegisterSection(shouldScroll);
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

  const showSuccessMessage = () => {
    successBanner.textContent = "";

    const title = document.createElement("strong");
    title.textContent = U.t("detail.applicationSubmittedTitle");

    const message = document.createElement("p");
    message.textContent = U.t("detail.applicationSubmittedNote");

    const actions = document.createElement("div");
    actions.className = "success-banner__actions";

    const contactLink = document.createElement("a");
    contactLink.className = "success-banner__phone";
    contactLink.href = U.supportContactPhoneHref;
    contactLink.textContent = U.supportContactPhoneDisplay;
    contactLink.setAttribute("aria-label", U.supportContactPhoneDisplay);

    actions.append(contactLink);
    successBanner.classList.add("is-visible");
    successBanner.append(title, message, actions);
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
      showSuccessMessage();
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

function renderCourseOverview(course, selectedPlan) {
  document.title = `${course.title} | ${U.t("meta.courseTitle")}`;

  detailRoot.innerHTML = `
    ${buildDetailTopNav(course)}

    <section class="detail-hero">
      <div>
        <span class="eyebrow">${U.escapeHtml(course.level)}</span>
        <h1 class="detail-hero__title">${U.escapeHtml(course.title)}</h1>
        <p class="detail-hero__lead">${U.escapeHtml(course.description)}</p>
        <div class="detail-hero__actions">
          <button class="button" type="button" data-register-open data-register-mode="inline">${U.t("detail.openRegistrationPage")}</button>
          <a class="button-secondary" href="index.html">${U.t("detail.backAll")}</a>
        </div>

        ${buildRegisterSection(course, selectedPlan)}
      </div>
    </section>

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
        ${buildTeacherCard(course)}
      </div>
    </section>

  `;
}

async function renderPage() {
  const { selectedSlug, selectedPlanId } = U.getQueryState();
  const course = U.getLocalizedCourseBySlug(selectedSlug);

  if (!course) {
    U.renderEmptyState(detailRoot);
    bindDetailTopbar();
    return;
  }

  const selectedPlan = U.getPlanById(course, selectedPlanId);
  try {
    teacherOverride = await U.fetchCourseTeacher(course);
  } catch {
    teacherOverride = null;
  }
  renderCourseOverview(course, selectedPlan);
  bindTeacherCertificatePreview(course);
  bindRegisterTriggers();
  bindApplicationForm(course, selectedPlan);
  if (window.location.hash === "#courseRegister") {
    revealRegisterSection(false);
  }
  bindDetailTopbar();
}

renderPage();
window.addEventListener("resize", syncDetailTopbar);
window.addEventListener("app:languagechange", renderPage);
