export const EARTH = [
  {
    id: "e01",
    section: "earth",
    text: "We should be willing to live with less to stay within what the planet can take.",
    info: "Whether the environment requires real sacrifice or just better technology. Agreeing accepts a lower material standard; disagreeing thinks prosperity and ecology can rise together.",
    axes: { ecol: 0.9, econ: -0.3 },
    nuances: [
      { when: "agree", text: "starting with those who consume the most", axes: { econ: -0.45 } },
      { when: "agree", text: "chosen freely, not imposed by rationing", axes: { auth: -0.45 } },
      { when: "disagree", text: "though the waste in the system should still be cut hard", axes: { ecol: 0.4 } }
    ]
  },
  {
    id: "e02",
    section: "earth",
    text: "Invention will solve the environmental problem without anyone changing how they live.",
    info: "Technological optimism against limits. Agreeing bets on engineering; disagreeing thinks that bet is a way of avoiding the decision.",
    axes: { ecol: -0.8, govn: 0.3, cult: 0.25 },
    nuances: [
      { when: "agree", text: "if the state funds the research seriously", axes: { econ: -0.35, govn: 0.35 } },
      { when: "disagree", text: "though technology is still most of the answer", axes: { ecol: -0.35 } }
    ]
  },
  {
    id: "e03",
    section: "earth",
    text: "When environmental rules start costing people their jobs, the rules should give way.",
    info: "The oldest trade-off in environmental politics. Agreeing puts livelihoods first when the two collide; disagreeing holds the line on protection.",
    axes: { ecol: -0.85, econ: 0.35 },
    nuances: [
      { when: "disagree", text: "as long as the workers affected are properly looked after", axes: { econ: -0.45 } },
      { when: "agree", text: "though the rules should never be dropped entirely", axes: { ecol: 0.4 } }
    ]
  },
  {
    id: "e04",
    section: "earth",
    text: "Government should concern itself with the people who are actually here now.",
    info: "Whether future generations should have formal standing in law and budgeting. Agreeing keeps politics focused on the living; disagreeing extends the circle of concern forward in time.",
    axes: { ecol: -0.8, govn: -0.5 },
    nuances: [
      { when: "disagree", text: "on debt and pensions just as much as on the climate", axes: { econ: 0.35 } },
      { when: "agree", text: "though we plainly owe them something anyway", axes: { ecol: 0.4 } }
    ]
  },
  {
    id: "e05",
    section: "earth",
    text: "Companies that wreck an ecosystem should face the kind of punishment people do.",
    info: "Criminal liability for environmental destruction. Agreeing wants real consequences with names attached; disagreeing sees fines and regulation as the appropriate tool.",
    axes: { ecol: 0.8, econ: -0.5, auth: 0.35 },
    nuances: [
      { when: "agree", text: "the executives personally, not just the company", axes: { econ: -0.35, auth: 0.3 } },
      { when: "disagree", text: "though the fines should actually hurt", axes: { ecol: 0.35, econ: -0.3 } }
    ]
  },
  {
    id: "e06",
    section: "earth",
    text: "How much meat a country eats is a legitimate thing for policy to target.",
    info: "Land, emissions and animal welfare against what is on your plate. Agreeing accepts public intervention in diet; disagreeing treats it as the definition of overreach.",
    axes: { ecol: 0.75, auth: 0.45, cult: 0.3 },
    nuances: [
      { when: "agree", text: "by making the alternatives cheaper, not by banning anything", axes: { auth: -0.5, econ: 0.2 } },
      { when: "disagree", text: "though the industry should stop being subsidised", axes: { ecol: 0.4, econ: 0.25 } }
    ]
  },
  {
    id: "e07",
    section: "earth",
    text: "Animals have interests that should sometimes outweigh human convenience.",
    info: "How far moral consideration extends beyond our own species. Agreeing accepts real constraints on use of animals; disagreeing keeps human needs decisive.",
    axes: { ecol: 0.7, cult: 0.4 },
    nuances: [
      { when: "agree", text: "convenience, yes, but not genuine human need like medicine", axes: { ecol: -0.35 } },
      { when: "disagree", text: "though needless cruelty is still indefensible", axes: { ecol: 0.35 } }
    ]
  },
  {
    id: "e08",
    section: "earth",
    text: "Cars should be pushed out of city centres.",
    info: "Reallocating public space away from driving. Agreeing favours dense, walkable cities; disagreeing sees a tax on people who have no alternative.",
    axes: { ecol: 0.7, auth: 0.35, cult: 0.3 },
    nuances: [
      { when: "agree", text: "only once the public transport is genuinely good", axes: { econ: -0.4, ecol: -0.2 } },
      { when: "disagree", text: "though the air quality problem is real", axes: { ecol: 0.4 } }
    ]
  },
  {
    id: "e09",
    section: "earth",
    text: "Even where the science is settled, the public should still get to argue about it.",
    info: "How much weight evidence should carry against public opinion and values. Agreeing keeps the decision political; disagreeing hands the question to the specialists.",
    axes: { govn: -0.85, ecol: -0.25 },
    nuances: [
      { when: "disagree", text: "the facts are settled, what we do about them still is not", axes: { govn: -0.4 } },
      { when: "agree", text: "because consensus has been wrong before", axes: { govn: -0.35, cult: -0.25 } }
    ]
  },
  {
    id: "e10",
    section: "earth",
    text: "We should be willing to edit human biology to prevent disease.",
    info: "Genetic medicine and where it stops. Agreeing treats it as the next step in healthcare; disagreeing sees a line that should not be crossed.",
    axes: { cult: 0.7, govn: 0.45, ecol: -0.2 },
    nuances: [
      { when: "agree", text: "to treat disease only, never to design a child", axes: { cult: -0.4 } },
      { when: "disagree", text: "because only the rich would ever get it", axes: { econ: -0.45, cult: 0.3 } }
    ]
  },
  {
    id: "e11",
    section: "earth",
    text: "The largest technology companies have grown too powerful to leave as they are.",
    info: "Breaking up, regulating or taking over private infrastructure that everyone depends on. Agreeing treats them as unaccountable power; disagreeing treats intervention as worse than the problem.",
    axes: { econ: -0.7, auth: 0.3, govn: 0.25 },
    nuances: [
      { when: "agree", text: "broken up, not taken over by the state", axes: { econ: 0.45, auth: -0.3 } },
      { when: "agree", text: "the infrastructure should be publicly owned outright", axes: { econ: -0.4, auth: 0.25 } },
      { when: "disagree", text: "though they should not be allowed to buy every rival", axes: { econ: -0.35, govn: 0.25 } }
    ]
  },
  {
    id: "e12",
    section: "earth",
    text: "Powerful new technology should have to prove it is safe before it is released.",
    info: "Precaution against permission-free innovation. Agreeing wants a licence before launch; disagreeing thinks that freezes progress and hands the field to whoever ignores the rules.",
    axes: { auth: 0.55, govn: 0.4, cult: -0.35 },
    nuances: [
      { when: "agree", text: "by an independent public body, not the companies themselves", axes: { econ: -0.4, govn: 0.35 } },
      { when: "disagree", text: "though the makers should carry the liability when it goes wrong", axes: { econ: -0.35, auth: 0.25 } }
    ]
  },
  {
    id: "e13",
    section: "earth",
    text: "Nuclear power deserves a serious place in how we make electricity.",
    info: "A question that splits environmentalists from each other. Agreeing weighs low emissions and reliability; disagreeing weighs waste, cost and risk.",
    axes: { govn: 0.55, ecol: -0.1, cult: 0.3 },
    nuances: [
      { when: "agree", text: "publicly built and publicly owned", axes: { econ: -0.45 } },
      { when: "disagree", text: "renewables and storage will get there faster", axes: { ecol: 0.4, govn: -0.2 } }
    ]
  },
  {
    id: "e14",
    section: "earth",
    text: "Reaching further into space is worth serious public money.",
    info: "Long-horizon ambition against needs on the ground. Agreeing values exploration and the science that falls out of it; disagreeing sees a vanity project while problems here go unfunded.",
    axes: { govn: 0.45, ecol: -0.35, cult: 0.45 },
    nuances: [
      { when: "agree", text: "for science and observation, not for colonising anything", axes: { ecol: 0.35, cult: -0.2 } },
      { when: "disagree", text: "though it should not be left to private billionaires either", axes: { econ: -0.45 } }
    ]
  },
  {
    id: "e15",
    section: "earth",
    text: "Changing your own habits matters more than changing the system.",
    info: "Personal responsibility against structural change. Agreeing starts with the individual; disagreeing thinks the focus on personal virtue is a distraction from who actually decides.",
    axes: { econ: 0.6, ecol: -0.15, govn: -0.3 },
    nuances: [
      { when: "agree", text: "but the system has to make the right choice the easy one", axes: { econ: -0.45, govn: 0.3 } },
      { when: "disagree", text: "because a handful of firms cause most of the damage", axes: { econ: -0.4, ecol: 0.3 } }
    ]
  },
  {
    id: "e16",
    section: "earth",
    text: "Growth is the point of an economy.",
    info: "Whether a bigger economy is the goal or merely a means. Agreeing keeps growth central; disagreeing wants wellbeing, stability or sustainability measured instead.",
    axes: { ecol: -0.8, econ: 0.45 },
    nuances: [
      { when: "agree", text: "growth is what pays for everything else we want", axes: { econ: 0.3 } },
      { when: "disagree", text: "measure health, time and security instead", axes: { ecol: 0.35, econ: -0.35 } }
    ]
  }
];
