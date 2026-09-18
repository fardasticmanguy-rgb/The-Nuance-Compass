export const WORLD = [
  {
    id: "n01",
    section: "world",
    text: "A government's first duty is to its own people, before anyone else's.",
    info: "Whether citizenship creates a stronger claim than need. Agreeing puts your compatriots first; disagreeing treats a stranger's suffering as equally weighty.",
    axes: { natl: -0.85 },
    nuances: [
      { when: "agree", text: "first, but not only", axes: { natl: 0.4 } },
      { when: "disagree", text: "though a government that ignores its own people loses the right to govern", axes: { natl: -0.35, govn: -0.3 } }
    ]
  },
  {
    id: "n02",
    section: "world",
    text: "Newcomers make a country better off.",
    info: "Immigration as gain against immigration as strain. Agreeing sees energy, labour and renewal; disagreeing sees pressure on wages, housing and cohesion.",
    axes: { natl: 0.85, cult: 0.45 },
    nuances: [
      { when: "agree", text: "when the country actually builds the housing and services to match", axes: { econ: -0.35, govn: 0.3 } },
      { when: "agree", text: "if they come through a system rather than around it", axes: { natl: -0.4, auth: 0.3 } },
      { when: "disagree", text: "though those already here should be treated as equals", axes: { natl: 0.4, cult: 0.3 } }
    ]
  },
  {
    id: "n03",
    section: "world",
    text: "Countries should hand real power to international bodies.",
    info: "Treaties and courts that can overrule a national parliament. Agreeing accepts shared sovereignty to solve shared problems; disagreeing keeps the final word at home.",
    axes: { natl: 0.9, auth: 0.25, govn: 0.4 },
    nuances: [
      { when: "agree", text: "only where a problem genuinely crosses borders", axes: { natl: -0.3, govn: 0.25 } },
      { when: "disagree", text: "because those bodies answer to nobody who can vote them out", axes: { govn: -0.45, natl: -0.2 } }
    ]
  },
  {
    id: "n04",
    section: "world",
    text: "Someone fleeing war should be let in, and the paperwork can follow.",
    info: "Whether asylum is an obligation or a discretion. Agreeing treats refuge as a duty regardless of numbers; disagreeing thinks a country must first decide what it can absorb.",
    axes: { natl: 0.85, auth: -0.35 },
    nuances: [
      { when: "agree", text: "shared fairly between countries rather than falling on whoever is nearest", axes: { govn: 0.35, natl: 0.25 } },
      { when: "disagree", text: "though genuine refugees are different from everyone else", axes: { natl: 0.4 } }
    ]
  },
  {
    id: "n05",
    section: "world",
    text: "Patriotism is a good thing.",
    info: "Love of country as a virtue that binds people together, or as the root of a lot of harm. One of the oldest dividing lines there is.",
    axes: { natl: -0.8, cult: -0.35 },
    nuances: [
      { when: "agree", text: "loving your country is not the same as thinking it is better than others", axes: { natl: 0.45 } },
      { when: "disagree", text: "loyalty should be to people and principles, not to a flag", axes: { natl: 0.3, cult: 0.3 } }
    ]
  },
  {
    id: "n06",
    section: "world",
    text: "Military spending should be cut hard.",
    info: "Guns against everything else a budget could buy. Agreeing treats armies as largely wasted money; disagreeing treats defence as the thing that keeps the rest possible.",
    axes: { natl: 0.5, auth: -0.5, econ: -0.25 },
    nuances: [
      { when: "agree", text: "and the savings spent on health, housing and education", axes: { econ: -0.4 } },
      { when: "disagree", text: "though the money should be spent far better than it is now", axes: { govn: 0.35 } }
    ]
  },
  {
    id: "n07",
    section: "world",
    text: "Rich countries owe the poorer world more than charity.",
    info: "Whether historical extraction and emissions create an obligation. Agreeing sees a debt to be paid; disagreeing sees the present generation as not responsible for the past.",
    axes: { natl: 0.75, econ: -0.6, ecol: 0.35 },
    nuances: [
      { when: "agree", text: "paid as investment and technology, not cash to governments", axes: { econ: 0.3, govn: 0.35 } },
      { when: "disagree", text: "though trade rules rigged in our favour should go", axes: { natl: 0.4, econ: -0.25 } }
    ]
  },
  {
    id: "n08",
    section: "world",
    text: "In the long run, borders should stop mattering.",
    info: "The far end of the borders axis. Agreeing treats the nation state as a passing arrangement; disagreeing treats it as the only unit where democracy actually works.",
    axes: { natl: 0.9, auth: -0.35 },
    nuances: [
      { when: "agree", text: "for people and ideas, but capital still needs holding down", axes: { econ: -0.45 } },
      { when: "disagree", text: "because self-government needs a self to govern", axes: { natl: -0.3, govn: -0.25 } }
    ]
  },
  {
    id: "n09",
    section: "world",
    text: "Sometimes a country has a duty to intervene in another country's crisis.",
    info: "Humanitarian intervention. Agreeing accepts a responsibility to protect; disagreeing points to how often that logic has been used as cover.",
    axes: { natl: 0.45, auth: 0.45 },
    nuances: [
      { when: "agree", text: "only with a clear international mandate", axes: { govn: 0.4, natl: 0.3 } },
      { when: "disagree", text: "help should be aid and shelter, never soldiers", axes: { auth: -0.45, natl: 0.3 } }
    ]
  },
  {
    id: "n10",
    section: "world",
    text: "A country should protect its own industries even if that makes things cost more.",
    info: "Tariffs and industrial policy against cheap imports. Agreeing values domestic capacity and jobs; disagreeing values the lower prices open competition brings.",
    axes: { natl: -0.75, econ: -0.25, govn: 0.2 },
    nuances: [
      { when: "agree", text: "only where it matters strategically, like food, energy and medicine", axes: { natl: 0.35, govn: 0.3 } },
      { when: "disagree", text: "though losing every factory has a cost nobody counted", axes: { natl: -0.35, econ: -0.25 } }
    ]
  },
  {
    id: "n11",
    section: "world",
    text: "Newcomers should be expected to adopt the local language and customs.",
    info: "Integration as a requirement against integration as something that happens on its own. Agreeing asks for adaptation; disagreeing thinks people may keep their way of living.",
    axes: { natl: -0.7, cult: -0.5, auth: 0.3 },
    nuances: [
      { when: "agree", text: "the language, yes, the customs are their own affair", axes: { cult: 0.45, natl: 0.25 } },
      { when: "disagree", text: "though the state should offer free language teaching to anyone who wants it", axes: { econ: -0.35, natl: -0.2 } }
    ]
  },
  {
    id: "n12",
    section: "world",
    text: "Global institutions mostly serve whoever is already powerful.",
    info: "A claim about how the international system actually works. Agreeing breeds suspicion of global governance from either the left or the right; disagreeing sees flawed but useful machinery.",
    axes: { govn: -0.7, natl: -0.25 },
    nuances: [
      { when: "agree", text: "so reform them rather than walking away", axes: { natl: 0.45, govn: 0.4 } },
      { when: "disagree", text: "imperfect rules still beat no rules at all", axes: { govn: 0.3, natl: 0.3 } }
    ]
  },
  {
    id: "n13",
    section: "world",
    text: "Cutting a country off with sanctions punishes its people more than its rulers.",
    info: "Economic pressure as a tool short of war. Agreeing sees ordinary people paying the price; disagreeing sees the only real alternative to doing nothing.",
    axes: { natl: 0.35, auth: -0.45 },
    nuances: [
      { when: "agree", text: "target the individuals in charge instead", axes: { govn: 0.4, auth: 0.25 } },
      { when: "disagree", text: "though food and medicine should always be exempt", axes: { natl: 0.35, auth: -0.3 } }
    ]
  },
  {
    id: "n14",
    section: "world",
    text: "Getting rid of nuclear weapons is worth doing even if others keep theirs.",
    info: "Unilateral disarmament. Agreeing treats the weapons themselves as the danger; disagreeing treats deterrence as the reason the worst wars have not happened.",
    axes: { natl: 0.55, auth: -0.45 },
    nuances: [
      { when: "agree", text: "but only as a step toward everyone doing it", axes: { natl: 0.3, govn: 0.3 } },
      { when: "disagree", text: "though the stockpiles should be far smaller than they are", axes: { natl: 0.3, auth: -0.25 } }
    ]
  },
  {
    id: "n15",
    section: "world",
    text: "Money spent on foreign aid would be better spent at home.",
    info: "Where scarce public money should go first. Agreeing keeps the budget domestic; disagreeing treats a small share of national income as an obligation abroad.",
    axes: { natl: -0.8, econ: 0.2 },
    nuances: [
      { when: "agree", text: "unless it prevents a famine or an epidemic", axes: { natl: 0.45 } },
      { when: "disagree", text: "though aid too often props up bad governments", axes: { natl: -0.3, govn: 0.3 } }
    ]
  },
  {
    id: "n16",
    section: "world",
    text: "Nobody should be locked up simply for crossing a border without permission.",
    info: "Immigration detention. Agreeing treats it as a civil matter, not a criminal one; disagreeing thinks a border is meaningless if breaking it carries no consequence.",
    axes: { natl: 0.6, auth: -0.7 },
    nuances: [
      { when: "agree", text: "especially never children", axes: { auth: -0.35, cult: 0.25 } },
      { when: "disagree", text: "though it should be brief and rare", axes: { auth: -0.4 } }
    ]
  }
];
