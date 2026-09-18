import { QUESTIONS } from "./data/questions.js";
import { blankAnswer } from "./state.js";

const VERSION = 1;
const SKIPPED = 255;
const UNANSWERED = 254;

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text) {
  const padded = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "===".slice((padded.length + 3) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function encodeAnswers(answers) {
  const bytes = new Uint8Array(1 + QUESTIONS.length * 3);
  bytes[0] = VERSION;
  QUESTIONS.forEach((q, i) => {
    const a = answers[q.id];
    const offset = 1 + i * 3;
    if (!a || (!a.touched && !a.skipped)) {
      bytes[offset] = UNANSWERED;
      return;
    }
    bytes[offset] = a.skipped ? SKIPPED : Math.max(-100, Math.min(100, a.value)) + 100;
    bytes[offset + 1] = a.weight;
    let mask = 0;
    q.nuances.forEach((n, bit) => {
      if (a.nuances.includes(n.id)) mask |= 1 << bit;
    });
    bytes[offset + 2] = mask;
  });
  return toBase64Url(bytes);
}

export function decodeAnswers(code) {
  const bytes = fromBase64Url(code);
  if (bytes[0] !== VERSION || bytes.length < 1 + QUESTIONS.length * 3) return null;
  const answers = {};
  QUESTIONS.forEach((q, i) => {
    const offset = 1 + i * 3;
    const raw = bytes[offset];
    if (raw === UNANSWERED) return;
    const answer = blankAnswer();
    if (raw === SKIPPED) {
      answer.skipped = true;
    } else {
      answer.value = raw - 100;
      answer.touched = true;
    }
    answer.weight = [0, 1, 2].includes(bytes[offset + 1]) ? bytes[offset + 1] : 1;
    const mask = bytes[offset + 2];
    answer.nuances = q.nuances.filter((n, bit) => mask & (1 << bit)).map(n => n.id);
    answers[q.id] = answer;
  });
  return answers;
}

export function shareUrl(answers) {
  const base = window.location.href.split("#")[0];
  return base + "#r=" + encodeAnswers(answers);
}

export function readShared() {
  const hash = window.location.hash;
  if (!hash.startsWith("#r=")) return null;
  try {
    return decodeAnswers(hash.slice(3));
  } catch (err) {
    void err;
    return null;
  }
}
