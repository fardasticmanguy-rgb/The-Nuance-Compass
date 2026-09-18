export const WORK = [
  {
    id: "w01",
    section: "work",
    text: "Nobody should have to earn the right to food, shelter and medicine.",
    info: "This asks whether survival itself should depend on having a job. Agreeing points toward a guaranteed floor beneath everyone; disagreeing points toward support being tied to contribution.",
    axes: { econ: -0.9, auth: 0.15 },
    nuances: [
      { when: "agree", text: "but the floor should be bare, not comfortable", axes: { econ: 0.3 } },
      { when: "agree", text: "and it should be paid for by taxing wealth, not wages", axes: { econ: -0.35 } },
      { when: "disagree", text: "unless the person genuinely cannot work", axes: { econ: -0.3 } },
      { when: "any", text: "charity and community should do this, not the state", axes: { econ: 0.35, auth: -0.4 } }
    ]
  },
  {
    id: "w02",
    section: "work",
    text: "If the market pays someone a fortune, they have probably earned it.",
    info: "This is about whether market prices reflect real worth. Agreeing treats wealth as roughly deserved; disagreeing treats it as an accident of luck, birth or power.",
    axes: { econ: 0.85, cult: -0.2 },
    nuances: [
      { when: "agree", text: "but not when the fortune comes from inheritance", axes: { econ: -0.3 } },
      { when: "agree", text: "but not when the industry is propped up by the state", axes: { econ: 0.2, govn: -0.2 } },
      { when: "disagree", text: "though effort and risk still deserve some reward", axes: { econ: 0.3 } }
    ]
  },
  {
    id: "w03",
    section: "work",
    text: "The people who do the work should have a real say in how the company is run.",
    info: "This covers everything from unions to workers sitting on company boards. Agreeing means power inside a firm should be shared; disagreeing means the owners decide.",
    axes: { econ: -0.75, auth: -0.15 },
    nuances: [
      { when: "agree", text: "by law, not by the goodwill of owners", axes: { econ: -0.25, auth: 0.35 } },
      { when: "agree", text: "only in large firms, not small businesses", axes: { econ: 0.25 } },
      { when: "disagree", text: "though they should at least be able to organise freely", axes: { econ: -0.3, auth: -0.3 } }
    ]
  },
  {
    id: "w04",
    section: "work",
    text: "Large inherited fortunes are a problem worth fixing.",
    info: "Inheritance passes advantage between generations without anyone earning it. Agreeing favours taxing or limiting it; disagreeing treats what you leave your children as nobody else's business.",
    axes: { econ: -0.8, cult: 0.25 },
    nuances: [
      { when: "agree", text: "but family homes and small businesses should be left alone", axes: { econ: 0.3 } },
      { when: "disagree", text: "though the very largest estates are a fair target", axes: { econ: -0.3 } }
    ]
  },
  {
    id: "w05",
    section: "work",
    text: "Essential services like water and transport are better run by private companies than by the state.",
    info: "The privatisation argument. Agreeing trusts competition to deliver essentials more cheaply; disagreeing thinks things everyone needs should be run for use rather than profit.",
    axes: { econ: 0.85 },
    nuances: [
      { when: "disagree", text: "but run locally, not from a distant capital", axes: { auth: -0.4, govn: -0.2 } },
      { when: "disagree", text: "public ownership, but managed at arm's length from politicians", axes: { govn: 0.45 } },
      { when: "agree", text: "though they need tight regulation either way", axes: { econ: -0.3, govn: 0.25 } }
    ]
  },
  {
    id: "w06",
    section: "work",
    text: "What a company pays its executives is nobody's business but the company's.",
    info: "Pay gaps inside an organisation. Agreeing treats pay as a private contract; disagreeing thinks extreme gaps are a public problem worth capping.",
    axes: { econ: 0.8, auth: -0.35 },
    nuances: [
      { when: "disagree", text: "for public bodies and state contractors only", axes: { econ: 0.35, auth: -0.2 } },
      { when: "disagree", text: "achieved through tax, not a hard legal ceiling", axes: { auth: -0.4 } },
      { when: "agree", text: "but the gap should at least be published openly", axes: { econ: -0.2, govn: 0.2 } }
    ]
  },
  {
    id: "w07",
    section: "work",
    text: "Taxation takes what belongs to the person who earned it.",
    info: "This probes whether tax feels like a shared subscription or a confiscation. Agreeing leans toward a minimal state; disagreeing treats tax as the price of a society.",
    axes: { econ: 0.75, auth: -0.35 },
    nuances: [
      { when: "agree", text: "but some tax is still the price of civilisation", axes: { econ: -0.35 } },
      { when: "agree", text: "taxing land and resources is fairer than taxing work", axes: { econ: -0.25, govn: 0.3 } },
      { when: "disagree", text: "though people deserve to see exactly where it goes", axes: { govn: -0.2 } }
    ]
  },
  {
    id: "w08",
    section: "work",
    text: "Unions hold a country back more than they help it.",
    info: "Organised labour raises wages and job security, and can also slow change and protect insiders. Agreeing sides with employers and flexibility; disagreeing sides with collective bargaining.",
    axes: { econ: 0.8, auth: 0.15 },
    nuances: [
      { when: "agree", text: "but the right to strike must still exist", axes: { econ: -0.3, auth: -0.35 } },
      { when: "disagree", text: "though essential services should face limits on striking", axes: { auth: 0.4, econ: 0.2 } }
    ]
  },
  {
    id: "w09",
    section: "work",
    text: "Housing is an asset like any other, and people are entitled to profit from it.",
    info: "Whether homes are ordinary property or a basic need that markets handle badly. Agreeing treats housing as an investment; disagreeing wants it treated as somewhere to live first.",
    axes: { econ: 0.8, ecol: -0.2 },
    nuances: [
      { when: "disagree", text: "so build far more of it, rather than freezing prices", axes: { econ: 0.35, ecol: -0.25 } },
      { when: "disagree", text: "so cap rents and tax empty properties", axes: { econ: -0.3, auth: 0.3 } },
      { when: "agree", text: "though speculation by foreign buyers is a fair target", axes: { natl: -0.4 } }
    ]
  },
  {
    id: "w10",
    section: "work",
    text: "Most people who end up poor were dealt a bad hand, not a bad character.",
    info: "This is the deep split under almost every welfare argument: is poverty mainly circumstance or mainly choice. Your answer usually predicts how generous you want the safety net to be.",
    axes: { econ: -0.75, cult: 0.25 },
    nuances: [
      { when: "agree", text: "but help should still come with expectations attached", axes: { econ: 0.35, auth: 0.25 } },
      { when: "disagree", text: "though the hand you are dealt at birth matters enormously", axes: { econ: -0.35 } }
    ]
  },
  {
    id: "w11",
    section: "work",
    text: "Help from the state should come with something expected in return.",
    info: "Work requirements, training obligations, conditions on benefits. Agreeing treats support as a two-way deal; disagreeing treats it as an unconditional right.",
    axes: { econ: 0.6, auth: 0.45 },
    nuances: [
      { when: "agree", text: "but never for the sick, disabled or caring for others", axes: { econ: -0.3, auth: -0.2 } },
      { when: "disagree", text: "though the state should offer real work if it is wanted", axes: { econ: -0.3, auth: 0.2 } }
    ]
  },
  {
    id: "w12",
    section: "work",
    text: "Money should be managed by specialists, well out of reach of whoever won the last election.",
    info: "This is about independent central banks and similar bodies. Agreeing trusts insulated expertise; disagreeing thinks decisions that shape everyone's life should answer to voters.",
    axes: { govn: 0.85, auth: 0.2 },
    nuances: [
      { when: "agree", text: "but they must be answerable to parliament after the fact", axes: { govn: -0.3 } },
      { when: "disagree", text: "because unelected power is still power", axes: { govn: -0.3, auth: -0.3 } }
    ]
  },
  {
    id: "w13",
    section: "work",
    text: "A country should live within its means, even when that means going without.",
    info: "Borrowing now against balancing the books. Agreeing prioritises not handing a bill to the next generation; disagreeing prioritises present need.",
    axes: { econ: 0.6, ecol: 0.1 },
    nuances: [
      { when: "disagree", text: "but only for investment, never for day-to-day spending", axes: { econ: 0.3, govn: 0.25 } },
      { when: "agree", text: "except in a genuine emergency", axes: { econ: -0.25 } }
    ]
  },
  {
    id: "w14",
    section: "work",
    text: "A society that produces billionaires has got something wrong.",
    info: "Not whether billionaires are nice people, but whether such concentrations of wealth should be possible at all. Agreeing sees a structural failure; disagreeing sees a sign of successful enterprise.",
    axes: { econ: -0.85 },
    nuances: [
      { when: "agree", text: "wrong in how they got it, not that they have it", axes: { econ: 0.3, govn: 0.2 } },
      { when: "disagree", text: "though their influence over politics is a real problem", axes: { econ: -0.3, govn: -0.3 } }
    ]
  },
  {
    id: "w15",
    section: "work",
    text: "When prices spike on something essential, the state should step in and hold them down.",
    info: "Price controls during shortages. Agreeing prioritises access; disagreeing warns that capped prices cause the shortage to last longer.",
    axes: { econ: -0.6, auth: 0.45 },
    nuances: [
      { when: "agree", text: "only in a declared emergency, with an end date", axes: { auth: -0.3, govn: 0.25 } },
      { when: "disagree", text: "though outright profiteering should be punished", axes: { econ: -0.3, auth: 0.25 } }
    ]
  },
  {
    id: "w16",
    section: "work",
    text: "Open trade between countries has made ordinary lives better.",
    info: "Cheaper goods and export jobs on one side, hollowed-out industries and lost bargaining power on the other. Your answer sorts you on both economics and borders.",
    axes: { econ: 0.6, natl: 0.65 },
    nuances: [
      { when: "agree", text: "but the people it wrecked were never properly compensated", axes: { econ: -0.4 } },
      { when: "disagree", text: "so protect strategic industries, not everything", axes: { natl: 0.3, govn: 0.25 } },
      { when: "disagree", text: "because it exports exploitation to where nobody is watching", axes: { econ: -0.4, natl: 0.3 } }
    ]
  },
  {
    id: "w17",
    section: "work",
    text: "A country is better off when its people work hard and produce more.",
    info: "Whether the point of rising productivity is more output or more free time. Agreeing values effort and output; disagreeing wants the gains taken as time rather than money.",
    axes: { econ: 0.55, ecol: -0.3, cult: -0.3 },
    nuances: [
      { when: "disagree", text: "if productivity actually allows it, sector by sector", axes: { econ: 0.3, govn: 0.3 } },
      { when: "agree", text: "though people should be free to negotiate it themselves", axes: { econ: 0.3, auth: -0.3 } }
    ]
  },
  {
    id: "w18",
    section: "work",
    text: "Machines taking over human jobs is a problem to be managed, not a win to be celebrated.",
    info: "Automation raises output and destroys particular livelihoods. Agreeing wants the pace slowed or the gains shared; disagreeing trusts that new work always appears.",
    axes: { econ: -0.45, cult: -0.35, ecol: 0.1 },
    nuances: [
      { when: "agree", text: "so tax the gains and share them, do not stop the machines", axes: { econ: -0.3, cult: 0.45 } },
      { when: "disagree", text: "though the transition needs serious public support", axes: { econ: -0.35 } }
    ]
  }
];
