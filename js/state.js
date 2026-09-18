import { QUESTIONS } from "./data/questions.js";

const STORAGE_KEY = "nuance-compass-v1";
const THEME_KEY = "nuance-compass-theme";

export const state = {
  answers: {},
  position: 0
};

export function blankAnswer() {
  return { value: 0, nuances: [], answered: false };
}

export function answerFor(id) {
  if (!state.answers[id]) state.answers[id] = blankAnswer();
  return state.answers[id];
}

export function answeredCount() {
  return QUESTIONS.filter(q => state.answers[q.id] && state.answers[q.id].answered).length;
}

export function firstUnanswered() {
  const index = QUESTIONS.findIndex(q => !state.answers[q.id] || !state.answers[q.id].answered);
  return index === -1 ? QUESTIONS.length - 1 : index;
}

export function save() {
  try {
    const payload = {
      position: state.position,
      answers: Object.fromEntries(
        Object.entries(state.answers)
          .filter(([, a]) => a.answered)
          .map(([id, a]) => [id, [a.value, a.nuances]])
      )
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    void err;
  }
}

export function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return false;
    state.position = Number(parsed.position) || 0;
    state.answers = {};
    for (const [id, tuple] of Object.entries(parsed.answers || {})) {
      if (!Array.isArray(tuple)) continue;
      state.answers[id] = {
        value: clampValue(tuple[0]),
        nuances: Array.isArray(tuple[1]) ? tuple[1] : [],
        answered: true
      };
    }
    return answeredCount() > 0;
  } catch (err) {
    void err;
    return false;
  }
}

export function clearSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    void err;
  }
  state.answers = {};
  state.position = 0;
}

function clampValue(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.max(-100, Math.min(100, Math.round(v)));
}

export function loadTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (err) {
    void err;
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    void err;
  }
}
