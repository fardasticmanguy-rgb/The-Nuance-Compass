import { computeScores, matchIdeologies, axisLabels, quadrantOf } from "./scoring.js";
import { compassSvg } from "./compass.js";
import { state, answeredCount } from "./state.js";

const esc = text => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headingFor(fraction) {
  if (fraction < 0.3) return "You are under way";
  if (fraction < 0.55) return "Still going";
  if (fraction < 0.8) return "Past the halfway mark";
  return "Nearly there";
}

function blindBody(done, remaining) {
  return `
    <p class="eyebrow">${done} answered, ${remaining} to go</p>
    <h2>${headingFor(done / (done + remaining))}</h2>
    <p class="milestone-lead">
      No score yet, on purpose. Watching a compass move part-way through changes how people answer
      the rest of the questions, usually without them noticing. You get the whole thing at the end,
      once it can no longer steer you.
    </p>
    <p class="milestone-note">
      Want to watch it move anyway? Turn on live position on the front page before you start.
    </p>
  `;
}

function liveBody(done, remaining) {
  const { scores } = computeScores(state.answers);
  const quadrant = quadrantOf(scores);
  const lead = matchIdeologies(scores, 1)[0];
  const rows = axisLabels(scores);
  const strongest = [...rows].sort((a, b) => Math.abs(b.score) - Math.abs(a.score)).slice(0, 3);

  return `
    <p class="eyebrow">${done} answered, ${remaining} to go</p>
    <h2>So far you are sitting in the<br><span style="color:${quadrant.color}">${quadrant.name}</span></h2>
    <div class="milestone-compass">${compassSvg(scores, "none", { compact: true })}</div>
    <p class="milestone-lead">Closest tradition right now: <strong>${esc(lead.name)}</strong> at ${lead.match}%.
    That will move as you go.</p>
    <ul class="milestone-axes">
      ${strongest.map(row => `<li><span>${esc(row.axis.name)}</span><strong>${esc(row.label)}</strong></li>`).join("")}
    </ul>
  `;
}

export function renderMilestone(container, onContinue) {
  const done = answeredCount();
  const remaining = state.questions.length - done;
  const body = state.livePreview ? liveBody(done, remaining) : blindBody(done, remaining);

  container.innerHTML = `
    <div class="milestone-inner">
      ${body}
      <button class="primary-btn" id="milestone-continue" type="button">Keep going</button>
    </div>
  `;

  container.querySelector("#milestone-continue").addEventListener("click", onContinue);
}
