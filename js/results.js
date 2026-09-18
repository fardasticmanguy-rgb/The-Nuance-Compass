import { AXES } from "./data/axes.js";
import { QUESTIONS } from "./data/questions.js";
import { COUNTRY_NOTE } from "./data/countries.js";
import {
  computeScores, matchIdeologies, matchCountries, farthestCountry,
  axisLabels, convictionHighlights, biggestTension, quadrantOf
} from "./scoring.js";
import { compassSvg } from "./compass.js";
import { state } from "./state.js";
import { shareUrl } from "./share.js";

let compassMode = "ideologies";
let cached = null;

const esc = text => String(text)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

export function renderResults(container, handlers) {
  const { scores, tension, answered } = computeScores(state.answers);
  const rows = axisLabels(scores);
  const ideologies = matchIdeologies(scores, 4);
  const countries = matchCountries(scores, 4);
  const opposite = farthestCountry(scores);
  const { strongest, softest } = convictionHighlights(state.answers, 3);
  const torn = biggestTension(tension);
  const quadrant = quadrantOf(scores);
  cached = { scores, rows, ideologies, countries };

  container.innerHTML = `
    <div class="results-head">
      <p class="eyebrow">${answered} of ${QUESTIONS.length} questions answered</p>
      <h1>You land in the<br><span class="quadrant-name" style="color:${quadrant.color}">${quadrant.name}</span></h1>
      <p>Closest fit: <strong>${esc(ideologies[0].name)}</strong> at ${ideologies[0].match}%, though the six axes below say considerably more than any single label does.</p>
    </div>

    <section class="panel">
      <h2 class="panel-title">The map</h2>
      <p class="panel-sub">The classic two axes. Everything else lives further down.</p>
      <div class="compass-wrap" id="compass-wrap">${compassSvg(scores, compassMode)}</div>
      <div class="compass-toggle" id="compass-toggle">
        <button class="secondary-btn" type="button" data-mode="ideologies">Ideologies</button>
        <button class="secondary-btn" type="button" data-mode="countries">Countries</button>
        <button class="secondary-btn" type="button" data-mode="none">Just me</button>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Six axes</h2>
      <p class="panel-sub">Each bar is scored against the strongest answer you could have given.</p>
      <div class="axis-bars">${rows.map(axisBar).join("")}</div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Closest traditions</h2>
      <p class="panel-sub">Measured across all six axes, not just the two on the map.</p>
      <div class="match-grid">
        ${ideologies.map((entry, i) => `
          <article class="match${i === 0 ? " lead" : ""}">
            <div class="match-top">
              <span class="match-name">${esc(entry.name)}</span>
              <span class="match-pct">${entry.match}%</span>
            </div>
            <p>${esc(entry.blurb)}</p>
          </article>`).join("")}
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Where in the world</h2>
      <p class="panel-sub">The states whose prevailing politics sit nearest to your answers.</p>
      <div class="match-grid">
        ${countries.map((entry, i) => `
          <article class="match${i === 0 ? " lead" : ""}">
            <div class="match-top">
              <span class="match-name"><span class="match-flag">${entry.flag}</span>${esc(entry.name)}</span>
              <span class="match-pct">${entry.match}%</span>
            </div>
            <p>${esc(entry.note)}</p>
          </article>`).join("")}
      </div>
      <p class="note">Furthest from you: ${opposite.flag} ${esc(opposite.name)}, at ${opposite.match}%. ${esc(COUNTRY_NOTE)}</p>
    </section>

    <section class="panel">
      <h2 class="panel-title">What you actually said</h2>
      <p class="panel-sub">The answers that moved your position the most, and the ones you would not commit to.</p>
      <div class="highlight-list">
        ${strongest.map(entry => highlight(entry, entry.answer.value > 0 ? "for" : "against")).join("")}
        ${softest.map(entry => highlight(entry, "torn")).join("")}
      </div>
      ${torn && torn.value > 0.18 ? `
        <div class="tension-card" style="margin-top:18px">
          <h4>Your answers on the ${esc(torn.axis.name)} axis pull both ways</h4>
          <p>Roughly ${Math.round(torn.value * 100)}% of your answers on this axis argued against the other half.
          That usually means the axis is hiding two questions you answer differently, rather than that you are undecided.</p>
        </div>` : ""}
    </section>

    <div class="results-actions">
      <button class="primary-btn" id="copy-link" type="button">Copy shareable link</button>
      <button class="secondary-btn" id="download-png" type="button">Download image</button>
      <button class="secondary-btn" id="review-answers" type="button">Review answers</button>
      <button class="ghost-btn" id="retake" type="button">Start again</button>
    </div>

    <section class="panel" id="review-panel" hidden>
      <h2 class="panel-title">Your answers</h2>
      <p class="panel-sub">Click any line to go back and change it.</p>
      <div class="review-list">${QUESTIONS.map(reviewRow).join("")}</div>
    </section>

    <div class="toast" id="toast"></div>
  `;

  wire(container, handlers);
  requestAnimationFrame(() => animateBars(container, rows));
}

function axisBar(row) {
  const { axis, score, leftShare, rightShare, label } = row;
  return `
    <div class="axis-bar" data-axis="${axis.key}">
      <div class="axis-bar-top">
        <span class="side">${esc(axis.left)}</span>
        <span class="verdict">${esc(label)}</span>
        <span class="side">${esc(axis.right)}</span>
      </div>
      <div class="bar-track">
        <div class="bar-left" style="width:0%;background:${axis.leftColor}"></div>
        <div class="bar-right" style="width:0%;background:${axis.rightColor}"></div>
        <span class="midline"></span>
      </div>
      <div class="bar-nums">
        <span>${leftShare}%</span>
        <span>${score > 0 ? "+" : ""}${score}</span>
        <span>${rightShare}%</span>
      </div>
      <p class="axis-blurb">${esc(axis.blurb)}</p>
    </div>`;
}

function animateBars(container, rows) {
  rows.forEach(row => {
    const node = container.querySelector(`[data-axis="${row.axis.key}"]`);
    if (!node) return;
    node.querySelector(".bar-left").style.width = row.leftShare + "%";
    node.querySelector(".bar-right").style.width = row.rightShare + "%";
  });
}

function highlight(entry, kind) {
  const { question, answer } = entry;
  const labels = { for: "Strongly for", against: "Strongly against", torn: "No firm view" };
  const picked = question.nuances
    .filter(n => answer.nuances.includes(n.id))
    .map(n => n.text);
  return `
    <div class="highlight">
      <span class="badge ${kind}">${labels[kind]}</span>
      <p>${esc(question.text)}
        ${picked.length ? `<span class="cond">${esc(picked.join("; "))}</span>` : ""}
      </p>
    </div>`;
}

function reviewRow(question, index) {
  const answer = state.answers[question.id];
  const value = !answer || !answer.answered
    ? "not answered"
    : (answer.value > 0 ? "+" : "") + answer.value;
  return `
    <button class="review-row" type="button" data-goto="${index}">
      <span class="n">${index + 1}</span>
      <span class="t">${esc(question.text)}</span>
      <span class="v">${value}</span>
    </button>`;
}

function wire(container, handlers) {
  container.querySelector("#compass-toggle").addEventListener("click", event => {
    const button = event.target.closest("button[data-mode]");
    if (!button) return;
    compassMode = button.dataset.mode;
    container.querySelector("#compass-wrap").innerHTML = compassSvg(cached.scores, compassMode);
    markMode(container);
  });
  markMode(container);

  container.querySelector("#copy-link").addEventListener("click", async () => {
    const url = shareUrl(state.answers);
    try {
      await navigator.clipboard.writeText(url);
      toast(container, "Link copied to clipboard");
    } catch (err) {
      void err;
      window.prompt("Copy your result link:", url);
    }
  });

  container.querySelector("#download-png").addEventListener("click", () => downloadCard(container));

  container.querySelector("#review-answers").addEventListener("click", () => {
    const panel = container.querySelector("#review-panel");
    panel.hidden = !panel.hidden;
    if (!panel.hidden) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  container.querySelector("#retake").addEventListener("click", () => handlers.onRetake());

  container.querySelector("#review-panel").addEventListener("click", event => {
    const row = event.target.closest("[data-goto]");
    if (!row) return;
    handlers.onJump(Number(row.dataset.goto));
  });
}

function markMode(container) {
  for (const button of container.querySelectorAll("#compass-toggle button")) {
    button.style.borderColor = button.dataset.mode === compassMode ? "var(--accent)" : "";
    button.style.color = button.dataset.mode === compassMode ? "var(--accent)" : "";
  }
}

function toast(container, message) {
  const node = container.querySelector("#toast");
  node.textContent = message;
  node.classList.add("show");
  setTimeout(() => node.classList.remove("show"), 2200);
}

function cardSvg() {
  const { scores, rows, ideologies, countries } = cached;
  const barY = 802;
  const bars = rows.map((row, i) => {
    const y = barY + i * 34;
    const leftWidth = (row.leftShare / 100) * 400;
    return `
      <text x="40" y="${y - 5}" font-size="12" fill="#8c95a8" font-family="Helvetica, Arial, sans-serif">${esc(row.axis.left)}</text>
      <text x="600" y="${y - 5}" font-size="12" fill="#8c95a8" text-anchor="end" font-family="Helvetica, Arial, sans-serif">${esc(row.axis.right)}</text>
      <rect x="120" y="${y - 16}" width="400" height="14" rx="4" fill="${row.axis.rightColor}"/>
      <rect x="120" y="${y - 16}" width="${leftWidth}" height="14" rx="4" fill="${row.axis.leftColor}"/>
      <text x="320" y="${y - 5}" font-size="10.5" fill="#ffffff" text-anchor="middle" font-weight="600"
        font-family="Helvetica, Arial, sans-serif">${esc(row.label)}</text>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="1010" viewBox="0 0 640 1010">
    <rect width="640" height="1010" fill="#0d1017"/>
    <text x="40" y="52" font-size="26" fill="#ffffff" font-family="Helvetica, Arial, sans-serif">The Nuance Compass</text>
    <text x="40" y="76" font-size="13" fill="#8c95a8" font-family="Helvetica, Arial, sans-serif">${esc(ideologies[0].name)} · ${ideologies[0].match}% · closest state: ${esc(countries[0].name)}</text>
    <svg x="0" y="96" width="640" height="640" viewBox="0 0 640 640">${compassSvg(scores, "none").replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg>
    <text x="40" y="780" font-size="13" fill="#ffffff" font-family="Helvetica, Arial, sans-serif" font-weight="600">Six axes</text>
    ${bars}
    <text x="40" y="992" font-size="11" fill="#5b6478" font-family="Helvetica, Arial, sans-serif">100 questions, 220 conditions, six axes.</text>
  </svg>`;
}

function downloadCard(container) {
  const svg = cardSvg();
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const image = new Image();

  image.onload = () => {
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = 640 * scale;
    canvas.height = 1010 * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob(pngBlob => {
      if (!pngBlob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pngBlob);
      link.download = "nuance-compass.png";
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      toast(container, "Image downloaded");
    }, "image/png");
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    toast(container, "Could not render the image");
  };

  image.src = url;
}
