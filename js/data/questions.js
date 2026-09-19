export const SECTIONS = [
  { id: "work", name: "Money & Work", blurb: "Who owns what, and what a person is owed." },
  { id: "power", name: "Power & the State", blurb: "How much a government may ask of you." },
  { id: "society", name: "Society & Custom", blurb: "How people should live together." },
  { id: "world", name: "Nation & World", blurb: "Where your obligations end." },
  { id: "earth", name: "Nature & Machines", blurb: "What the future costs." },
  { id: "justice", name: "Crime & Punishment", blurb: "What we do with the people who break the rules." }
];

import { WORK } from "./sections/work.js";
import { POWER } from "./sections/power.js";
import { SOCIETY } from "./sections/society.js";
import { WORLD } from "./sections/world.js";
import { EARTH } from "./sections/earth.js";
import { JUSTICE } from "./sections/justice.js";

export const CANONICAL_QUESTIONS = [...WORK, ...POWER, ...SOCIETY, ...WORLD, ...EARTH, ...JUSTICE]
  .map((q, i) => ({
    ...q,
    index: i,
    nuances: (q.nuances || []).map((n, j) => ({ ...n, id: q.id + "-" + j }))
  }));

function spread(questions) {
  const order = SECTIONS.map(s => s.id);
  const sizes = {};
  for (const q of questions) sizes[q.section] = (sizes[q.section] || 0) + 1;

  const seen = {};
  return questions
    .map(q => {
      const rank = seen[q.section] = (seen[q.section] || 0) + 1;
      return { q, at: (rank - 0.5) / sizes[q.section], tie: order.indexOf(q.section) };
    })
    .sort((a, b) => a.at - b.at || a.tie - b.tie)
    .map(entry => entry.q);
}

export const QUESTIONS = spread(CANONICAL_QUESTIONS);

export const SECTION_BY_ID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));

export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

export const QUICK_IDS = [
  "w03", "w07", "w14", "w16",
  "p03", "p05", "p12", "p15", "p18",
  "s01", "s09", "s12", "s16", "s18",
  "n01", "n04", "n06", "n16", "n20",
  "e03", "e10", "e14", "e16", "e17", "e19", "e21",
  "j02", "j04", "j09", "j10", "j14", "j15"
];

export const QUICK_QUESTIONS = QUESTIONS.filter(q => QUICK_IDS.includes(q.id));
