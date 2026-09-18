import { AXES } from "./data/axes.js";
import { QUESTIONS } from "./data/questions.js";
import { state, load, clearSaved, answeredCount, firstUnanswered, loadTheme, saveTheme } from "./state.js";
import { initQuiz, render as renderQuestion, go, refreshProgress } from "./quiz.js";
import { renderResults } from "./results.js";
import { readShared } from "./share.js";

const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  results: document.getElementById("screen-results")
};

function show(name) {
  for (const [key, node] of Object.entries(screens)) node.hidden = key !== name;
  document.getElementById("topbar-progress").hidden = name !== "quiz";
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const icon = document.querySelector("[data-theme-icon]");
  if (icon) icon.textContent = theme === "dark" ? "Light" : "Dark";
}

function buildAxisPreview() {
  const wrap = document.getElementById("axis-preview");
  wrap.innerHTML = AXES.map(axis => `
    <div class="axis-row">
      <span class="l"><b>${axis.left}</b></span>
      <span class="axis-name">${axis.name}</span>
      <span class="r"><b>${axis.right}</b></span>
    </div>`).join("");
}

function showResults() {
  renderResults(screens.results, {
    onRetake: () => {
      clearSaved();
      history.replaceState(null, "", window.location.pathname);
      refreshProgress();
      go(0);
      show("quiz");
    },
    onJump: index => {
      go(index);
      show("quiz");
    }
  });
  show("results");
}

function boot() {
  applyTheme(loadTheme());
  buildAxisPreview();

  initQuiz({ onFinish: () => showResults() });

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
    if (!screens.results.hidden) showResults();
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    go(0);
    show("quiz");
  });

  document.getElementById("resume-btn").addEventListener("click", () => {
    go(firstUnanswered());
    show("quiz");
  });

  document.getElementById("reset-all").addEventListener("click", () => {
    clearSaved();
    history.replaceState(null, "", window.location.pathname);
    document.getElementById("resume-btn").hidden = true;
    document.getElementById("intro-meta").textContent = "Saved answers cleared.";
    show("intro");
  });

  for (const link of document.querySelectorAll("[data-nav]")) {
    link.addEventListener("click", event => {
      event.preventDefault();
      show(link.dataset.nav);
    });
  }

  const shared = readShared();
  if (shared) {
    state.answers = shared;
    renderQuestion();
    showResults();
    return;
  }

  const restored = load();
  updateIntro();
  if (restored) {
    renderQuestion();
    refreshProgress();
  }
  show("intro");
}

function updateIntro() {
  const done = answeredCount();
  const resume = document.getElementById("resume-btn");
  const meta = document.getElementById("intro-meta");
  if (done > 0 && done < QUESTIONS.length) {
    resume.hidden = false;
    resume.textContent = `Resume: ${done} of ${QUESTIONS.length} done`;
    meta.textContent = "Your progress is saved in this browser only.";
  } else if (done === QUESTIONS.length) {
    resume.hidden = false;
    resume.textContent = "See your results";
    resume.onclick = () => showResults();
    meta.textContent = "You have answered everything.";
  } else {
    resume.hidden = true;
    meta.textContent = "Takes about 15 minutes. Nothing leaves your browser.";
  }
}

boot();
