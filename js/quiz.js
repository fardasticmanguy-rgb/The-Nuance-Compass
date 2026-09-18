import { QUESTIONS, SECTION_BY_ID } from "./data/questions.js";
import { visibleNuances } from "./scoring.js";
import { state, answerFor, answeredCount, save } from "./state.js";

const CHOICES = [
  { label: "Strongly disagree", value: -90, min: -100, max: -73 },
  { label: "Disagree", value: -55, min: -72, max: -23 },
  { label: "Neutral", value: 0, min: -22, max: 22 },
  { label: "Agree", value: 55, min: 23, max: 72 },
  { label: "Strongly agree", value: 90, min: 73, max: 100 }
];

const SNAP_POINTS = CHOICES.map(c => c.value);
const SNAP_RANGE = 8;

const el = {};
let onFinish = () => {};
let infoOpen = false;
let fineOpen = false;

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
  el.choices = document.getElementById("choices");
  el.stance = document.getElementById("stance");
  el.stanceValue = document.getElementById("stance-value");
  el.fineToggle = document.getElementById("finetune-toggle");
  el.sliderBlock = document.getElementById("slider-block");
  el.slider = document.getElementById("slider");
  el.nuanceBlock = document.getElementById("nuance-block");
  el.nuanceHead = document.getElementById("nuance-head");
  el.nuanceList = document.getElementById("nuance-list");
  el.prevBtn = document.getElementById("prev-btn");
  el.nextBtn = document.getElementById("next-btn");
  el.topProgress = document.getElementById("topbar-progress");
  el.card = document.getElementById("question-card");

  buildChoices();

  el.slider.addEventListener("input", () => {
    setValue(snap(Number(el.slider.value)), false);
  });

  el.fineToggle.addEventListener("click", () => toggleFine());
  el.infoBtn.addEventListener("click", () => toggleInfo());
  el.prevBtn.addEventListener("click", () => go(state.position - 1));
  el.nextBtn.addEventListener("click", () => advance());

  document.addEventListener("keydown", onKey);
}

function snap(raw) {
  for (const point of SNAP_POINTS) {
    if (Math.abs(raw - point) <= SNAP_RANGE) return point;
  }
  return Math.round(raw / 5) * 5;
}

function current() {
  return QUESTIONS[state.position];
}

function buildChoices() {
  el.choices.innerHTML = "";
  CHOICES.forEach((choice, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.dataset.index = String(i);
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span class="choice-key">${i + 1}</span><span class="choice-label"></span>`;
    button.lastElementChild.textContent = choice.label;
    button.addEventListener("click", () => setValue(choice.value, true));
    el.choices.appendChild(button);
  });
}

function setValue(value, fromChoice) {
  const answer = answerFor(current().id);
  answer.value = value;
  answer.answered = true;
  if (!fromChoice) el.slider.value = String(value);
  paintStance(answer);
  paintChoices(answer);
  paintNuances(current(), answer);
  paintProgress();
  if (fromChoice) el.slider.value = String(value);
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
  el.counter.textContent = `${state.position + 1} of ${QUESTIONS.length}`;
  el.cardIndex.textContent = section ? section.blurb : "";
  el.statement.textContent = question.text;
  el.infoText.textContent = question.info;
  el.infoPanel.hidden = !infoOpen;
  el.infoBtn.setAttribute("aria-expanded", String(infoOpen));
  el.slider.value = String(answer.value);

  paintStance(answer);
  paintChoices(answer);
  paintNuances(question, answer);
  paintNav();
  paintProgress();
}

function stanceFor(value) {
  const magnitude = Math.abs(value);
  const direction = value > 0 ? "agree" : "disagree";
  if (magnitude <= 5) return "Neutral";
  if (magnitude <= 25) return "Lean " + direction;
  if (magnitude <= 60) return direction === "agree" ? "Agree" : "Disagree";
  if (magnitude <= 88) return "Strongly " + direction;
  return direction === "agree" ? "Agree completely" : "Reject completely";
}

function paintStance(answer) {
  el.stance.textContent = answer.answered ? stanceFor(answer.value) : "Not answered yet";
  el.stance.classList.toggle("muted", !answer.answered);
  el.stanceValue.textContent = (answer.value > 0 ? "+" : "") + answer.value;
}

function paintChoices(answer) {
  for (const button of el.choices.children) {
    const choice = CHOICES[Number(button.dataset.index)];
    const active = answer.answered && answer.value >= choice.min && answer.value <= choice.max;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("approx", active && answer.value !== choice.value);
  }
}

function paintNuances(question, answer) {
  const options = answer.answered ? visibleNuances(question, answer.value) : [];
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
  el.nextBtn.textContent = state.position === QUESTIONS.length - 1 ? "See results" : "Next";
}

function paintProgress() {
  const done = answeredCount();
  el.progressFill.style.width = (done / QUESTIONS.length) * 100 + "%";
  el.topProgress.hidden = false;
  el.topProgress.textContent = `${done} of ${QUESTIONS.length}`;
}

export function refreshProgress() {
  paintProgress();
}

function toggleFine(force) {
  fineOpen = force === undefined ? !fineOpen : force;
  el.sliderBlock.hidden = !fineOpen;
  el.fineToggle.setAttribute("aria-expanded", String(fineOpen));
  el.fineToggle.textContent = fineOpen ? "Hide scale" : "Fine-tune";
}

function toggleInfo(force) {
  infoOpen = force === undefined ? !infoOpen : force;
  el.infoPanel.hidden = !infoOpen;
  el.infoBtn.setAttribute("aria-expanded", String(infoOpen));
}

function onKey(event) {
  if (document.getElementById("screen-quiz").hidden) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.target.tagName === "INPUT" && event.target.type !== "range") return;

  const choice = CHOICES[Number(event.key) - 1];
  if (choice) {
    event.preventDefault();
    setValue(choice.value, true);
  } else if (event.key === "Enter") {
    event.preventDefault();
    advance();
  } else if (event.key === "Backspace") {
    event.preventDefault();
    go(state.position - 1);
  } else if (event.key === "i") {
    toggleInfo();
  }
}
