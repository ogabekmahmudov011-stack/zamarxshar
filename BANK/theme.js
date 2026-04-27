const THEME_KEY = "bank-theme";
const root = document.documentElement;
const themeButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    return null;
  }
}

function writeStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // localStorage is optional for this UI behavior.
  }
}

function getCurrentTheme() {
  return root.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  const nextActionLabel = theme === "dark" ? "Light rejimga o'tish" : "Dark rejimga o'tish";

  root.dataset.theme = theme;

  themeButtons.forEach((button) => {
    button.setAttribute("aria-label", nextActionLabel);
    button.setAttribute("title", nextActionLabel);
  });
}

applyTheme(readStoredTheme() || getCurrentTheme());

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    writeStoredTheme(nextTheme);
  });
});
