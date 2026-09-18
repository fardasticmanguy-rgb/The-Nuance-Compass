export const AXES = [
  {
    key: "econ",
    name: "Economics",
    left: "Equality",
    right: "Markets",
    leftColor: "#e0564f",
    rightColor: "#4f86e0",
    blurb: "Who should own things, and who should decide what they are worth.",
    bands: [
      [-100, "Communist"],
      [-76, "Socialist"],
      [-46, "Social Democrat"],
      [-16, "Mixed Economy"],
      [16, "Market Liberal"],
      [46, "Capitalist"],
      [76, "Laissez-Faire"]
    ]
  },
  {
    key: "auth",
    name: "Authority",
    left: "Liberty",
    right: "Order",
    leftColor: "#4fbf7a",
    rightColor: "#c86ad4",
    blurb: "How much power the state may hold over the person.",
    bands: [
      [-100, "Anarchist"],
      [-76, "Libertarian"],
      [-46, "Civil Libertarian"],
      [-16, "Balanced"],
      [16, "Statist"],
      [46, "Authoritarian"],
      [76, "Totalitarian"]
    ]
  },
  {
    key: "cult",
    name: "Culture",
    left: "Tradition",
    right: "Progress",
    leftColor: "#c9a227",
    rightColor: "#39b7b0",
    blurb: "Whether inherited ways of life are worth keeping or worth outgrowing.",
    bands: [
      [-100, "Reactionary"],
      [-76, "Traditionalist"],
      [-46, "Conservative"],
      [-16, "Moderate"],
      [16, "Reformist"],
      [46, "Progressive"],
      [76, "Radical"]
    ]
  },
  {
    key: "natl",
    name: "Borders",
    left: "Nation",
    right: "World",
    leftColor: "#d9713c",
    rightColor: "#5b8ce0",
    blurb: "Where your loyalty stops: your country, or everybody.",
    bands: [
      [-100, "Isolationist"],
      [-76, "Nationalist"],
      [-46, "Patriot"],
      [-16, "Balanced"],
      [16, "Internationalist"],
      [46, "Globalist"],
      [76, "Cosmopolitan"]
    ]
  },
  {
    key: "ecol",
    name: "Ecology",
    left: "Growth",
    right: "Nature",
    leftColor: "#8a7f6d",
    rightColor: "#4faf5b",
    blurb: "What you are willing to give up for a habitable planet.",
    bands: [
      [-100, "Industrialist"],
      [-76, "Growth First"],
      [-46, "Pragmatist"],
      [-16, "Balanced"],
      [16, "Conservationist"],
      [46, "Green"],
      [76, "Deep Ecologist"]
    ]
  },
  {
    key: "govn",
    name: "Decision",
    left: "The People",
    right: "The Experts",
    leftColor: "#e0a13c",
    rightColor: "#7b7fd4",
    blurb: "Whose judgement should win when the crowd and the specialists disagree.",
    bands: [
      [-100, "Direct Democrat"],
      [-76, "Populist"],
      [-46, "Majoritarian"],
      [-16, "Balanced"],
      [16, "Institutionalist"],
      [46, "Technocrat"],
      [76, "Epistocrat"]
    ]
  }
];

export const AXIS_KEYS = AXES.map(a => a.key);

export const AXIS_BY_KEY = Object.fromEntries(AXES.map(a => [a.key, a]));

export function bandFor(axis, score) {
  let label = axis.bands[0][1];
  for (const [min, name] of axis.bands) {
    if (score >= min) label = name;
  }
  return label;
}
