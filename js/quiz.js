import { QUESTIONS, SECTION_BY_ID } from "./data/questions.js";
import { WEIGHT_LABELS, visibleNuances } from "./scoring.js";
import { state, answerFor, answeredCount, save } from "./state.js";

const QUICK_SET = [
  { label: "Strongly disagree", value: -90 },
  { label: "Disagree", value: -55 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 55 },
  { label: "Strongly agree", value: 90 }
];

const el = {};
let onFinish = () => {};
let infoOpen = false;

export function initQuiz(handlers) {
  onFinish = handlers.onFinish;

  el.progressFill = document.getElementById("progress-fill");
  el.sectionTag = document.getElementById("section-tag");
  el.counter = document.getElementById("counter");
  el.cardIndex = document.getElementById("card-index");
  el.statement = document.getElementById("statement");
  el.infoBtn = document.getElementById("info-btn");
  el.infoPanel = document.getElementById("info-panel");
  el.infoText = document.getElementById("info-text");
  el.slider = document.getElementById("slider");
  el.stance = document.getElementById("stance");
  el.stanceValue = document.getElementById("stance-value");
  el.quickSet = document.getElementById("quick-set");
  el.nuanceBlock = document.getElementById("nuance-block");
  el.nuanceHead = document.getElementById("nuance-head");
  el.nuanceList = document.getElementById("nuance-list");
  el.weightOptions = document.getElementById("weight-options");
  el.prevBtn = document.getElementById("prev-btn");
  el.nextBtn = document.getElementById("next-btn");
  el.skipBtn = document.getElementById("skip-btn");
  el.topProgress = document.getElementById("topbar-progress");
  el.card = document.getElementById("question-card");

  buildQuickSet();
  buildWeightOptions();

  el.slider.addEventListener("input", () => {
    const answer = answerFor(current().id);
    answer.value = Number(el.slider.value);
    answer.skipped = false;
    answer.touched = true;
    paintSlider(answer);
    paintNuances(current(), answer);
    paintQuickSet(answer);
    paintNav();
    paintProgress();
    save();
  });

  el.infoBtn.addEventListener("click", () => toggleInfo());
  el.prevBtn.addEventListener("click", () => go(state.position - 1));
  el.nextBtn.addEventListener("click", () => advance());
  el.skipBtn.addEventListener("click", () => {
    const answer = answerFor(current().id);
    answer.skipped = true;
    answer.touched = false;
    answer.value = 0;
    save();
    advance();
  });

  document.addEventListener("keydown", onKey);
}

function current() {
  return QUESTIONS[state.position];
}

function buildQuickSet() {
  el.quickSet.innerHTML = "";
  QUICK_SET.forEach((preset, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = preset.label;
    button.dataset.value = String(preset.value);
    button.setAttribute("aria-pressed", "false");
    button.title = "Shortcut: " + (i + 1);
    button.addEventListener("click", () => setValue(preset.value));
    el.quickSet.appendChild(button);
  });
}

function buildWeightOptions() {
  el.weightOptions.innerHTML = "";
  WEIGHT_LABELS.forEach((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.weight = String(index);
    button.setAttribute("aria-pressed", String(index === 1));
    button.addEventListener("click", () => {
      const answer = answerFor(current().id);
      answer.weight = index;
      paintWeight(answer);
      save();
    });
    el.weightOptions.appendChild(button);
  });
}

function setValue(value) {
  const answer = answerFor(current().id);
  answer.value = value;
  answer.skipped = false;
  answer.touched = true;
  el.slider.value = String(value);
  paintSlider(answer);
  paintNuances(current(), answer);
  paintQuickSet(answer);
  paintNav();
  paintProgress();
  save();
}

export function go(index) {
  if (index < 0) return;
  if (index >= QUESTIONS.length) {
    onFinish();
    return;
  }
  state.position = index;
  infoOpen = false;
  render();
  save();
}

function advance() {
  if (state.position >= QUESTIONS.length - 1) {
    onFinish();
    return;
  }
  go(state.position + 1);
}

export function render() {
  const question = current();
  const answer = answerFor(question.id);
  const section = SECTION_BY_ID[question.section];

  el.card.style.animation = "none";
  void el.card.offsetWidth;
  el.card.style.animation = "";

  el.sectionTag.textContent = section ? section.name : "";
  el.counter.textContent = `Question ${state.position + 1} of ${QUESTIONS.length}`;
  el.cardIndex.textContent = section ? section.blurb : "";
  el.statement.textContent = question.text;
  el.infoText.textContent = question.info;
  el.infoPanel.hidden = !infoOpen;
  el.infoBtn.setAttribute("aria-expanded", String(infoOpen));
  el.slider.value = String(answer.skipped ? 0 : answer.value);

  paintSlider(answer);
  paintQuickSet(answer);
  paintWeight(answer);
  paintNuances(question, answer);
  paintNav();
  paintProgress();
}

function stanceFor(value) {
  const magnitude = Math.abs(value);
  const direction = value > 0 ? "agree" : "disagree";
  if (magnitude <= 5) return "Undecided";
  if (magnitude <= 25) return "Leaning " + direction;
  if (magnitude <= 60) return direction === "agree" ? "Agree" : "Disagree";
  if (magnitude <= 88) return "Strongly " + direction;
  return direction === "agree" ? "Agree without reservation" : "Reject outright";
}

function paintSlider(answer) {
  const value = answer.skipped ? 0 : answer.value;
  el.stance.textContent = answer.skipped ? "No opinion recorded" : stanceFor(value);
  el.stanceValue.textContent = answer.skipped ? "skipped" : (value > 0 ? "+" : "") + value;
  const hue = value > 5 ? "var(--green)" : value < -5 ? "var(--red)" : "var(--text)";
  el.stance.style.color = answer.skipped ? "var(--text-faint)" : hue;
}

function paintQuickSet(answer) {
  for (const button of el.quickSet.children) {
    const match = !answer.skipped && Number(button.dataset.value) === answer.value;
    button.setAttribute("aria-pressed", String(match));
  }
}

function paintWeight(answer) {
  for (const button of el.weightOptions.children) {
    button.setAttribute("aria-pressed", String(Number(button.dataset.weight) === answer.weight));
  }
}

function paintNuances(question, answer) {
  const options = answer.skipped ? [] : visibleNuances(question, answer.value);
  if (!options.length) {
    el.nuanceBlock.hidden = true;
    el.nuanceList.innerHTML = "";
    return;
  }

  el.nuanceBlock.hidden = false;
  el.nuanceHead.textContent = answer.value > 4
    ? "You agree. On what condition?"
    : answer.value < -4
      ? "You disagree. With any reservation?"
      : "Worth adding";

  el.nuanceList.innerHTML = "";
  for (const nuance of options) {
    const active = answer.nuances.includes(nuance.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nuance";
    button.setAttribute("aria-pressed", String(active));
    button.innerHTML = `<span class="tick" aria-hidden="true">✓</span><span></span>`;
    button.lastElementChild.textContent = nuance.text;
    button.addEventListener("click", () => {
      const picked = answer.nuances.includes(nuance.id);
      answer.nuances = picked
        ? answer.nuances.filter(id => id !== nuance.id)
        : [...answer.nuances, nuance.id];
      button.setAttribute("aria-pressed", String(!picked));
      save();
    });
    el.nuanceList.appendChild(button);
  }
}

function paintNav() {
  el.prevBtn.disabled = state.position === 0;
  const last = state.position === QUESTIONS.length - 1;
  el.nextBtn.textContent = last ? "See results" : "Next";
}

function paintProgress() {
  const done = answeredCount();
  const pct = (done / QUESTIONS.length) * 100;
  el.progressFill.style.width = pct + "%";
  el.topProgress.hidden = false;
  el.topProgress.textContent = `${done} / ${QUESTIONS.length} answered`;
}

export function refreshProgress() {
  paintProgress();
}

function toggleInfo(force) {
  infoOpen = force === undefined ? !infoOpen : force;
  el.infoPanel.hidden = !infoOpen;
  el.infoBtn.setAttribute("aria-expanded", String(infoOpen));
}

function onKey(event) {
  const quizVisible = !document.getElementById("screen-quiz").hidden;
  if (!quizVisible) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  const tag = event.target.tagName;
  const typing = tag === "INPUT" && event.target.type !== "range";
  if (typing) return;

  const answer = answerFor(current().id);
  const step = event.shiftKey ? 20 : 5;

  if (event.key === "ArrowRight" && tag !== "INPUT") {
    event.preventDefault();
    setValue(Math.min(100, (answer.skipped ? 0 : answer.value) + step));
  } else if (event.key === "ArrowLeft" && tag !== "INPUT") {
    event.preventDefault();
    setValue(Math.max(-100, (answer.skipped ? 0 : answer.value) - step));
  } else if (event.key === "Enter") {
    event.preventDefault();
    advance();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    go(state.position - 1);
  } else if (event.key === "i") {
    toggleInfo();
  } else if (QUICK_SET[Number(event.key) - 1]) {
    event.preventDefault();
    setValue(QUICK_SET[Number(event.key) - 1].value);
  }
}
