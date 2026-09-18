import { AXIS_KEYS, AXES, bandFor } from "./data/axes.js";
import { QUESTIONS } from "./data/questions.js";
import { IDEOLOGIES } from "./data/ideologies.js";
import { COUNTRIES } from "./data/countries.js";

const AXIS_IMPORTANCE = { econ: 1.25, auth: 1.25, cult: 1, natl: 0.95, ecol: 0.9, govn: 0.8 };

const MATCH_SCALE = 110;

export function nuanceGroups(question, value) {
  const byGate = gate => question.nuances.filter(n => n.when === gate);
  const shared = byGate("any");

  if (value > 4) {
    return {
      primary: [...byGate("agree"), ...shared],
      primaryHead: "You agree. On what condition?",
      cross: byGate("disagree"),
      crossHead: "Anything from the other side you would still sign up to?"
    };
  }

  if (value < -4) {
    return {
      primary: [...byGate("disagree"), ...shared],
      primaryHead: "You disagree. With any reservation?",
      cross: byGate("agree"),
      crossHead: "Anything from the other side you would still sign up to?"
    };
  }

  return {
    primary: [...shared, ...byGate("agree"), ...byGate("disagree")],
    primaryHead: "Sitting in the middle. Anything here you would still sign up to?",
    cross: [],
    crossHead: ""
  };
}

function blankAxisMap(fill = 0) {
  return Object.fromEntries(AXIS_KEYS.map(k => [k, fill]));
}

export function computeScores(answers) {
  const total = blankAxisMap();
  const ceiling = blankAxisMap();
  const positive = blankAxisMap();
  const negative = blankAxisMap();
  const counts = blankAxisMap();
  let answered = 0;

  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (!a || !a.answered) continue;
    answered += 1;
    const v = a.value / 100;

    for (const [axis, pull] of Object.entries(q.axes)) {
      const contribution = v * pull;
      counts[axis] += 1;
      total[axis] += contribution;
      ceiling[axis] += Math.abs(pull);
      if (contribution > 0) positive[axis] += contribution;
      else negative[axis] -= contribution;
    }

    const conviction = Math.min(1, Math.abs(v) + 0.35);
    for (const nuance of q.nuances) {
      if (!a.nuances.includes(nuance.id)) continue;
      for (const [axis, pull] of Object.entries(nuance.axes)) {
        const contribution = pull * conviction;
        total[axis] += contribution;
        ceiling[axis] += Math.abs(pull) * 0.45;
        if (contribution > 0) positive[axis] += contribution;
        else negative[axis] -= contribution;
      }
    }
  }

  const scores = blankAxisMap();
  const tension = blankAxisMap();
  for (const key of AXIS_KEYS) {
    scores[key] = ceiling[key] > 0 ? clamp(Math.round((total[key] / ceiling[key]) * 100), -100, 100) : 0;
    const spread = positive[key] + negative[key];
    tension[key] = spread > 0 ? Math.min(positive[key], negative[key]) / spread : 0;
  }

  return { scores, tension, answered, ceiling, counts };
}

export function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function distance(scores, target) {
  let sum = 0;
  for (const key of AXIS_KEYS) {
    const delta = (scores[key] - target[key]) * AXIS_IMPORTANCE[key];
    sum += delta * delta;
  }
  return Math.sqrt(sum / AXIS_KEYS.length);
}

function ranked(scores, pool) {
  return pool
    .map(entry => {
      const d = distance(scores, entry);
      return { ...entry, distance: d, match: clamp(Math.round(100 - (d / MATCH_SCALE) * 100), 0, 100) };
    })
    .sort((a, b) => a.distance - b.distance);
}

export function matchIdeologies(scores, count = 4) {
  return ranked(scores, IDEOLOGIES).slice(0, count);
}

export function matchCountries(scores, count = 4) {
  return ranked(scores, COUNTRIES).slice(0, count);
}

export function farthestCountry(scores) {
  return ranked(scores, COUNTRIES).slice(-1)[0];
}

export function axisLabels(scores, counts = {}) {
  return AXES.map(axis => {
    const score = scores[axis.key];
    const share = Math.round((score + 100) / 2);
    return {
      axis,
      score,
      count: counts[axis.key] || 0,
      leftShare: 100 - share,
      rightShare: share,
      label: bandFor(axis, score),
      leaning: score === 0 ? "even" : score > 0 ? axis.right : axis.left
    };
  });
}

export function convictionHighlights(answers, limit = 4) {
  const scored = QUESTIONS.map(q => {
    const a = answers[q.id];
    if (!a || !a.answered) return null;
    return { question: q, answer: a, force: Math.abs(a.value) };
  }).filter(Boolean);

  const strongest = [...scored].sort((a, b) => b.force - a.force).slice(0, limit);
  const softest = [...scored]
    .filter(entry => Math.abs(entry.answer.value) < 18)
    .sort((a, b) => Math.abs(a.answer.value) - Math.abs(b.answer.value))
    .slice(0, limit);

  return { strongest, softest };
}

export function biggestTension(tension) {
  let best = null;
  for (const axis of AXES) {
    const value = tension[axis.key];
    if (!best || value > best.value) best = { axis, value };
  }
  return best;
}

export function measurementNote(counts) {
  const rows = AXES.map(axis => ({ axis, count: counts[axis.key] || 0 })).filter(r => r.count > 0);
  if (rows.length < 2) return null;
  const sorted = [...rows].sort((a, b) => a.count - b.count);
  const thinnest = sorted[0];
  const thickest = sorted[sorted.length - 1];
  if (thickest.count < thinnest.count * 1.4) return null;
  return { thinnest, thickest };
}

export function quadrantOf(scores) {
  const x = scores.econ;
  const y = scores.auth;
  if (y >= 0 && x < 0) return { key: "authleft", name: "Authoritarian Left", color: "#d9534f" };
  if (y >= 0 && x >= 0) return { key: "authright", name: "Authoritarian Right", color: "#4a86d6" };
  if (y < 0 && x < 0) return { key: "libleft", name: "Libertarian Left", color: "#57b85a" };
  return { key: "libright", name: "Libertarian Right", color: "#a86ad4" };
}
