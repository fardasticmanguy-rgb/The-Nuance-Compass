const ENDPOINT = "https://syvmhcrowpjbpjyxnbdo.supabase.co";
const KEY = "sb_publishable_SBdTPLy5NmyVyClYr5Dy4g_GWxqs0Q_";
const MIN_SAMPLE = 30;

const headers = {
  "apikey": KEY,
  "Authorization": "Bearer " + KEY,
  "Content-Type": "application/json"
};

let cache = null;

export async function submit(answers, scores, mode) {
  const payload = {
    mode: mode === "quick" ? "quick" : "full",
    answers: Object.fromEntries(
      Object.entries(answers)
        .filter(([, a]) => a && a.answered)
        .map(([id, a]) => [id, a.value])
    ),
    scores: Object.fromEntries(scores.map(row => [row.axis.key, Math.round(row.score * 10) / 10]))
  };

  if (Object.keys(payload.answers).length === 0) return false;

  try {
    const response = await fetch(ENDPOINT + "/rest/v1/submissions", {
      method: "POST",
      headers: { ...headers, "Prefer": "return=minimal" },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (err) {
    void err;
    return false;
  }
}

async function rpc(name, body) {
  const response = await fetch(ENDPOINT + "/rest/v1/rpc/" + name, {
    method: "POST",
    headers,
    body: JSON.stringify(body || {})
  });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
}

export async function fetchStats(scores) {
  if (cache) return cache;
  try {
    const payload = Object.fromEntries(scores.map(row => [row.axis.key, Math.round(row.score * 10) / 10]));
    const [questions, axes, total] = await Promise.all([
      rpc("question_stats"),
      rpc("axis_percentiles", { user_scores: payload }),
      rpc("submission_count")
    ]);
    cache = {
      total: Number(total) || 0,
      questions: Object.fromEntries((questions || []).map(row => [row.question_id, row])),
      axes: axes && typeof axes === "object" ? axes : {}
    };
    return cache;
  } catch (err) {
    void err;
    return null;
  }
}

export function clearCache() {
  cache = null;
}

export function sideOf(value) {
  if (value > 22) return "agree";
  if (value < -22) return "disagree";
  return "neutral";
}

export function crowdLine(stat, userValue) {
  if (!stat || Number(stat.n) < MIN_SAMPLE) return null;
  const side = sideOf(userValue);
  const pct = {
    agree: Number(stat.pct_agree),
    neutral: Number(stat.pct_neutral),
    disagree: Number(stat.pct_disagree)
  };
  const verb = { agree: "agreed with", neutral: "sat neutral on", disagree: "disagreed with" };
  const mine = pct[side];
  const majority = Object.keys(pct).reduce((a, b) => (pct[a] >= pct[b] ? a : b));

  if (side === majority) {
    return { tone: "with", text: `${mine}% of people ${verb[side]} this too.` };
  }
  return {
    tone: "against",
    text: `You were in the ${mine}% who ${verb[side]} this. Most people, ${pct[majority]}%, ${verb[majority]} it.`
  };
}

export function axisLine(entry, axis) {
  if (!entry || Number(entry.n) < MIN_SAMPLE) return null;
  const below = Number(entry.pct_below);
  if (!Number.isFinite(below)) return null;
  if (below >= 50) return `More ${axis.right} than ${below}% of people who took this.`;
  return `More ${axis.left} than ${100 - below}% of people who took this.`;
}
