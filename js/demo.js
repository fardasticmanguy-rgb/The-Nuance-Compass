import { AXES } from "./data/axes.js";
import { QUESTION_BY_ID } from "./data/questions.js";
import { nuanceGroups, clamp } from "./scoring.js";

const PICKS = ["e11", "w07", "j05", "w01", "s06"];

const CHOICES = [
  { label: "Strongly disagree", short: "Strongly no", value: -90 },
  { label: "Disagree", short: "No", value: -55 },
  { label: "Neutral", short: "Neutral", value: 0 },
  { label: "Agree", short: "Yes", value: 55 },
  { label: "Strongly agree", short: "Strongly yes", value: 90 }
];

const SCALE = 78;
const SIZE = 200;
const HALF = SIZE / 2;

const POLES = {
  econ: ["Equality", "Markets"],
  auth: ["Liberty", "Order"]
};

const demo = { pick: 0, value: 55, chosen: [] };
const el = {};

const esc = text => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function question() {
  return QUESTION_BY_ID[PICKS[demo.pick]];
}

function pulls(withNuances) {
  const q = question();
  const v = demo.value / 100;
  const out = Object.fromEntries(AXES.map(a => [a.key, 0]));
  for (const [axis, pull] of Object.entries(q.axes)) out[axis] += v * pull;
  if (withNuances) {
    const conviction = Math.min(1, Math.abs(v) + 0.35);
    for (const n of q.nuances) {
      if (!demo.chosen.includes(n.id)) continue;
      for (const [axis, pull] of Object.entries(n.axes)) out[axis] += pull * conviction;
    }
  }
  for (const key of Object.keys(out)) out[key] = clamp(Math.round(out[key] * SCALE), -92, 92);
  return out;
}

const toX = econ => HALF + (econ / 100) * HALF;
const toY = auth => HALF - (auth / 100) * HALF;

function plotSvg() {
  const grid = [];
  for (let i = 1; i < 10; i += 1) {
    const at = (i / 10) * SIZE;
    grid.push(`<line x1="${at}" y1="0" x2="${at}" y2="${SIZE}"/><line x1="0" y1="${at}" x2="${SIZE}" y2="${at}"/>`);
  }
  return `<svg viewBox="-34 -26 ${SIZE + 68} ${SIZE + 52}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="demo-plot-label">
    <title id="demo-plot-label">Where this one answer would pull you on the compass</title>
    <rect x="0" y="0" width="${HALF}" height="${HALF}" fill="#d9534f"/>
    <rect x="${HALF}" y="0" width="${HALF}" height="${HALF}" fill="#4a86d6"/>
    <rect x="0" y="${HALF}" width="${HALF}" height="${HALF}" fill="#57b85a"/>
    <rect x="${HALF}" y="${HALF}" width="${HALF}" height="${HALF}" fill="#a86ad4"/>
    <g class="grid">${grid.join("")}</g>
    <line class="cross" x1="${HALF}" y1="0" x2="${HALF}" y2="${SIZE}"/>
    <line class="cross" x1="0" y1="${HALF}" x2="${SIZE}" y2="${HALF}"/>
    <text class="pole" x="${HALF}" y="-11" text-anchor="middle">ORDER</text>
    <text class="pole" x="${HALF}" y="${SIZE + 19}" text-anchor="middle">LIBERTY</text>
    <text class="pole" x="-12" y="${HALF}" text-anchor="middle" transform="rotate(-90 -12 ${HALF})">EQUALITY</text>
    <text class="pole" x="${SIZE + 12}" y="${HALF}" text-anchor="middle" transform="rotate(90 ${SIZE + 12} ${HALF})">MARKETS</text>
    <line class="trail" id="demo-trail" x1="${HALF}" y1="${HALF}" x2="${HALF}" y2="${HALF}"/>
    <g class="ghost" id="demo-ghost"><circle r="6"/></g>
    <g class="you" id="demo-dot"><circle class="halo" r="13"/><circle class="core" r="6"/></g>
  </svg>`;
}

function metersHtml() {
  return AXES.map(axis => `
    <div class="meter" data-axis="${axis.key}" style="--l:${axis.leftColor};--r:${axis.rightColor}">
      <div class="meter-top"><span>${esc(axis.name)}</span><b data-num>0</b></div>
      <div class="meter-track"><i data-tick></i></div>
    </div>`).join("");
}

function renderChoices() {
  el.choices.innerHTML = CHOICES.map((c, i) => `
    <button type="button" class="choice demo-choice" data-i="${i}" aria-pressed="${c.value === demo.value}">
      <span class="full">${c.label}</span><span class="short">${c.short}</span>
    </button>`).join("");
}

function renderConditions() {
  const groups = nuanceGroups(question(), demo.value);
  const offered = groups.primary.slice(0, 3);
  demo.chosen = demo.chosen.filter(id => offered.some(n => n.id === id));
  el.condHead.textContent = groups.primaryHead;
  el.conds.innerHTML = offered.map(n => `
    <button type="button" class="nuance demo-cond" data-id="${n.id}" aria-pressed="${demo.chosen.includes(n.id)}">
      <span class="tick" aria-hidden="true">\u2713</span><span>${esc(n.text)}</span>
    </button>`).join("");
}

function signed(n) {
  if (n === 0) return "0";
  return (n > 0 ? "+" : "−") + Math.abs(n);
}

function caption(flat, real) {
  const stance = CHOICES.find(c => c.value === demo.value).label.toLowerCase();
  if (demo.chosen.length === 0) {
    if (demo.value === 0) return "Neutral barely moves you. Pick a side, then add the part you would say out loud.";
    return `A flat “${stance}” lands here. Now tick the condition you actually mean.`;
  }
  const dx = real.econ - flat.econ;
  const dy = real.auth - flat.auth;
  const [axis, delta] = Math.abs(dx) >= Math.abs(dy) ? ["econ", dx] : ["auth", dy];
  const moved = Math.round(Math.hypot(dx, dy));
  if (moved < 3) return `Same “${stance}”, and this condition mostly lands on the other axes.`;
  const pole = POLES[axis][delta > 0 ? 1 : 0];
  return `Same “${stance}”. That condition moved you ${moved} points, mostly toward ${pole}.`;
}

function place(node, econ, auth) {
  node.style.transform = `translate(${toX(econ)}px, ${toY(auth)}px)`;
}

function update() {
  const flat = pulls(false);
  const real = pulls(true);
  place(el.dot, real.econ, real.auth);
  place(el.ghost, flat.econ, flat.auth);
  const showGhost = demo.chosen.length > 0 && Math.hypot(real.econ - flat.econ, real.auth - flat.auth) >= 3;
  el.ghost.classList.toggle("on", showGhost);
  el.trail.classList.toggle("on", showGhost);
  el.trail.setAttribute("x1", toX(flat.econ));
  el.trail.setAttribute("y1", toY(flat.auth));
  el.trail.setAttribute("x2", toX(real.econ));
  el.trail.setAttribute("y2", toY(real.auth));

  for (const meter of el.meters.querySelectorAll(".meter")) {
    const n = real[meter.dataset.axis];
    meter.querySelector("[data-num]").textContent = signed(n);
    meter.querySelector("[data-tick]").style.left = `${50 + n / 2}%`;
    meter.classList.toggle("moved", n !== 0);
  }

  el.caption.textContent = caption(flat, real);
}

function loadQuestion() {
  const q = question();
  el.statement.textContent = q.text;
  el.count.textContent = `${demo.pick + 1} / ${PICKS.length}`;
  renderChoices();
  renderConditions();
  update();
}

export function initDemo(root) {
  if (!root) return;
  root.innerHTML = `
    <div class="demo-head">
      <span class="demo-title">Try one first</span>
      <span class="demo-nav"><span class="demo-count" data-count></span>
        <button type="button" class="linkish" data-next>Another one</button></span>
    </div>
    <p class="demo-statement" data-statement aria-live="polite"></p>
    <div class="demo-choices" data-choices role="group" aria-label="How far do you agree?"></div>
    <p class="demo-cond-head" data-cond-head></p>
    <div class="demo-conds" data-conds></div>
    <div class="demo-out">
      <div class="demo-plot">${plotSvg()}</div>
      <div class="demo-meters" data-meters>${metersHtml()}</div>
    </div>
    <p class="demo-caption" data-caption aria-live="polite"></p>`;

  el.statement = root.querySelector("[data-statement]");
  el.count = root.querySelector("[data-count]");
  el.choices = root.querySelector("[data-choices]");
  el.condHead = root.querySelector("[data-cond-head]");
  el.conds = root.querySelector("[data-conds]");
  el.meters = root.querySelector("[data-meters]");
  el.caption = root.querySelector("[data-caption]");
  el.dot = root.querySelector("#demo-dot");
  el.ghost = root.querySelector("#demo-ghost");
  el.trail = root.querySelector("#demo-trail");

  el.choices.addEventListener("click", event => {
    const button = event.target.closest(".demo-choice");
    if (!button) return;
    demo.value = CHOICES[Number(button.dataset.i)].value;
    renderChoices();
    renderConditions();
    update();
  });

  el.conds.addEventListener("click", event => {
    const button = event.target.closest(".demo-cond");
    if (!button) return;
    const id = button.dataset.id;
    demo.chosen = demo.chosen.includes(id) ? demo.chosen.filter(x => x !== id) : [...demo.chosen, id];
    button.setAttribute("aria-pressed", String(demo.chosen.includes(id)));
    update();
  });

  root.querySelector("[data-next]").addEventListener("click", () => {
    demo.pick = (demo.pick + 1) % PICKS.length;
    demo.value = 55;
    demo.chosen = [];
    loadQuestion();
  });

  loadQuestion();
}
