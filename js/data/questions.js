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

export const QUESTIONS = [...WORK, ...POWER, ...SOCIETY, ...WORLD, ...EARTH, ...JUSTICE].map((q, i) => ({
  ...q,
  index: i,
  nuances: (q.nuances || []).map((n, j) => ({ ...n, id: q.id + "-" + j }))
}));

export const SECTION_BY_ID = Object.fromEntries(SECTIONS.map(s => [s.id, s]));

export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

export const QUICK_IDS = [
  "w04", "w07", "w10", "w15", "w16",
  "p01", "p05", "p07", "p10", "p15",
  "s01", "s09", "s13", "s14",
  "n01", "n04", "n05", "n12", "n16",
  "e05", "e07", "e10", "e12", "e14", "e15", "e16",
  "j02", "j08", "j14", "j15"
];

export const QUICK_QUESTIONS = QUESTIONS.filter(q => QUICK_IDS.includes(q.id));
