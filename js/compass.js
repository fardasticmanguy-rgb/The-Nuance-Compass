import { IDEOLOGIES } from "./data/ideologies.js";
import { COUNTRIES } from "./data/countries.js";

const SIZE = 640;
const PAD = 62;
const PLOT = SIZE - PAD * 2;

const REFERENCE_IDEOLOGIES = [
  "Anarcho-Communism", "Marxism-Leninism", "Democratic Socialism", "Social Democracy",
  "Green Politics", "Left Populism", "Centrism", "Technocracy", "Fascism",
  "National Conservatism", "Right Populism", "Conservatism", "Neoliberalism",
  "Classical Liberalism", "Libertarianism", "Anarcho-Capitalism"
];

const REFERENCE_COUNTRIES = [
  "Norway", "Sweden", "Cuba", "China", "Russia", "Hungary", "United States",
  "United Kingdom", "Germany", "France", "Singapore", "Switzerland", "India",
  "Brazil", "Japan", "Saudi Arabia", "New Zealand", "Venezuela"
];

const toX = econ => PAD + ((econ + 100) / 200) * PLOT;
const toY = auth => PAD + ((100 - auth) / 200) * PLOT;

const esc = text => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function gridLines() {
  const lines = [];
  for (let i = 1; i < 20; i += 1) {
    const at = PAD + (i / 20) * PLOT;
    const major = i % 5 === 0;
    const width = major ? 0.8 : 0.4;
    const opacity = major ? 0.28 : 0.14;
    lines.push(`<line x1="${at}" y1="${PAD}" x2="${at}" y2="${PAD + PLOT}" stroke="#ffffff" stroke-width="${width}" opacity="${opacity}"/>`);
    lines.push(`<line x1="${PAD}" y1="${at}" x2="${PAD + PLOT}" y2="${at}" stroke="#ffffff" stroke-width="${width}" opacity="${opacity}"/>`);
  }
  return lines.join("");
}

function referencePoints(mode, scores) {
  if (mode === "none") return "";
  const pool = mode === "countries"
    ? COUNTRIES.filter(c => REFERENCE_COUNTRIES.includes(c.name))
    : IDEOLOGIES.filter(i => REFERENCE_IDEOLOGIES.includes(i.name));

  return pool.map(entry => {
    const x = toX(entry.econ);
    const y = toY(entry.auth);
    const crowded = Math.hypot(entry.econ - scores.econ, entry.auth - scores.auth) < 13;
    const right = entry.econ > 45;
    const anchor = right ? "end" : "start";
    const labelX = right ? x - 8 : x + 8;
    const name = mode === "countries" ? `${entry.flag} ${entry.name}` : entry.name;
    return `<g class="ref">
      <circle cx="${x}" cy="${y}" r="3.4" fill="#0b0d12" stroke="#ffffff" stroke-width="1.2" opacity="0.85"/>
      ${crowded ? "" : `<text x="${labelX}" y="${y + 3.6}" text-anchor="${anchor}" font-size="10.5" fill="#ffffff" opacity="0.72"
        stroke="#0b0d12" stroke-width="2.6" paint-order="stroke" font-family="Helvetica, Arial, sans-serif">${esc(name)}</text>`}
    </g>`;
  }).join("");
}

export function compassSvg(scores, mode = "ideologies", options = {}) {
  const x = toX(scores.econ);
  const y = toY(scores.auth);
  const mid = PAD + PLOT / 2;
  const dark = options.dark !== false;
  const frame = dark ? "#0b0d12" : "#ffffff";
  const axisInk = dark ? "#ffffff" : "#1b1d22";

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg" role="img"
    aria-label="Political compass plot. Economic score ${scores.econ}, authority score ${scores.auth}.">
  <rect width="${SIZE}" height="${SIZE}" fill="${frame}" rx="18"/>
  <rect x="${PAD}" y="${PAD}" width="${PLOT / 2}" height="${PLOT / 2}" fill="#d9534f"/>
  <rect x="${mid}" y="${PAD}" width="${PLOT / 2}" height="${PLOT / 2}" fill="#4a86d6"/>
  <rect x="${PAD}" y="${mid}" width="${PLOT / 2}" height="${PLOT / 2}" fill="#57b85a"/>
  <rect x="${mid}" y="${mid}" width="${PLOT / 2}" height="${PLOT / 2}" fill="#a86ad4"/>
  ${gridLines()}
  <line x1="${mid}" y1="${PAD}" x2="${mid}" y2="${PAD + PLOT}" stroke="${frame}" stroke-width="2.4" opacity="0.85"/>
  <line x1="${PAD}" y1="${mid}" x2="${PAD + PLOT}" y2="${mid}" stroke="${frame}" stroke-width="2.4" opacity="0.85"/>
  <rect x="${PAD}" y="${PAD}" width="${PLOT}" height="${PLOT}" fill="none" stroke="${frame}" stroke-width="2"/>

  <text x="${mid}" y="${PAD - 22}" text-anchor="middle" font-size="15" letter-spacing="3.4" fill="${axisInk}"
    font-family="Helvetica, Arial, sans-serif" font-weight="600">AUTHORITARIAN</text>
  <text x="${mid}" y="${PAD + PLOT + 34}" text-anchor="middle" font-size="15" letter-spacing="3.4" fill="${axisInk}"
    font-family="Helvetica, Arial, sans-serif" font-weight="600">LIBERTARIAN</text>
  <text x="${PAD - 20}" y="${mid}" text-anchor="middle" font-size="15" letter-spacing="3.4" fill="${axisInk}"
    font-family="Helvetica, Arial, sans-serif" font-weight="600" transform="rotate(-90 ${PAD - 20} ${mid})">EQUALITY</text>
  <text x="${PAD + PLOT + 22}" y="${mid}" text-anchor="middle" font-size="15" letter-spacing="3.4" fill="${axisInk}"
    font-family="Helvetica, Arial, sans-serif" font-weight="600" transform="rotate(90 ${PAD + PLOT + 22} ${mid})">MARKETS</text>

  ${referencePoints(mode, scores)}

  <g>
    <circle cx="${x}" cy="${y}" r="26" fill="#ffffff" opacity="0.18"/>
    <circle cx="${x}" cy="${y}" r="14" fill="#ffffff" opacity="0.35"/>
    <circle cx="${x}" cy="${y}" r="9" fill="#111318" stroke="#ffffff" stroke-width="3"/>
  </g>
  <text x="${x}" y="${y - 34}" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff"
    stroke="#0b0d12" stroke-width="3.4" paint-order="stroke" font-family="Helvetica, Arial, sans-serif">YOU</text>
  <text x="${x}" y="${y + 40}" text-anchor="middle" font-size="12" font-weight="600" fill="#ffffff"
    stroke="#0b0d12" stroke-width="3" paint-order="stroke" font-family="Helvetica, Arial, sans-serif">${scores.econ > 0 ? "+" : ""}${scores.econ}, ${scores.auth > 0 ? "+" : ""}${scores.auth}</text>
</svg>`;
}
