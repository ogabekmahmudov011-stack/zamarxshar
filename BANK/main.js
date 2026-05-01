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
