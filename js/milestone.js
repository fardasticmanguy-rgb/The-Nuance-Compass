import { computeScores, matchIdeologies, axisLabels, quadrantOf } from "./scoring.js";
import { compassSvg } from "./compass.js";
import { state, answeredCount } from "./state.js";

const esc = text => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function renderMilestone(container, onContinue) {
  const done = answeredCount();
  const total = state.questions.length;
  const remaining = total - done;
  const { scores } = computeScores(state.answers);
  const quadrant = quadrantOf(scores);
  const lead = matchIdeologies(scores, 1)[0];
  const rows = axisLabels(scores);
  const strongest = [...rows].sort((a, b) => Math.abs(b.score) - Math.abs(a.score)).slice(0, 3);

  container.innerHTML = `
    <div class="milestone-inner">
      <p class="eyebrow">${done} answered, ${remaining} to go</p>
      <h2>So far you are sitting in the<br><span style="color:${quadrant.color}">${quadrant.name}</span></h2>
      <div class="milestone-compass">${compassSvg(scores, "none", { compact: true })}</div>
      <p class="milestone-lead">Closest tradition right now: <strong>${esc(lead.name)}</strong> at ${lead.match}%.
      That will move as you go.</p>
      <ul class="milestone-axes">
        ${strongest.map(row => `<li><span>${esc(row.axis.name)}</span><strong>${esc(row.label)}</strong></li>`).join("")}
      </ul>
      <button class="primary-btn" id="milestone-continue" type="button">Keep going</button>
    </div>
  `;

  container.querySelector("#milestone-continue").addEventListener("click", onContinue);
}
