const courseGrid = document.getElementById("courseGrid");
const getLanguage = () => (window.getCurrentLanguage ? window.getCurrentLanguage() : "uz");
const t = (path, params) => (window.getUiText ? window.getUiText(path, params) : path);
const localizeCourse = (course) =>
  window.getLocalizedCourse ? window.getLocalizedCourse(course, getLanguage()) : course;

const courseIcons = {
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

function getCourseIcon(slug) {
  return courseIcons[slug] ?? `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4"></rect>
      <path d="M8 12h8"></path>
      <path d="M12 8v8"></path>
    </svg>
  `;
}

function renderCourseCards() {
  if (!courseGrid || !Array.isArray(window.COURSES)) {
    return;
  }

  courseGrid.innerHTML = window.COURSES.map(
    (baseCourse) => {
      const course = localizeCourse(baseCourse);

      return `
      <a class="course-card course-card--${course.slug}" href="course.html?course=${course.slug}" aria-label="${t("index.openCourseAria", { title: course.title })}">
        <span class="course-card__icon" aria-hidden="true">${getCourseIcon(course.slug)}</span>
        <h3>${course.title}</h3>
        <p class="course-card__meta">${course.duration} &middot; ${course.format}</p>
        <span class="course-card__arrow" aria-hidden="true">&rarr;</span>
      </a>
    `;
    }
  ).join("");
}

renderCourseCards();

window.addEventListener("app:languagechange", renderCourseCards);
