export const SOCIETY = [
  {
    id: "s01",
    section: "society",
    text: "A custom that has lasted for centuries has probably earned some respect.",
    info: "Whether age is itself a reason to keep something. Agreeing trusts inherited wisdom; disagreeing judges every practice on its merits today.",
    axes: { cult: -0.85 },
    nuances: [
      { when: "agree", text: "respect, but not immunity from being changed", axes: { cult: 0.35 } },
      { when: "disagree", text: "though tearing things down carelessly has its own cost", axes: { cult: 0.3 } }
    ]
  },
  {
    id: "s02",
    section: "society",
    text: "Religion should have no say in how a country writes its laws.",
    info: "Strict separation of faith and state. Agreeing wants law justified in terms everyone can share; disagreeing sees faith as a legitimate source of public morality.",
    axes: { cult: 0.7, auth: -0.2 },
    nuances: [
      { when: "agree", text: "but believers are entitled to argue their case like anyone else", axes: { cult: -0.3, auth: -0.3 } },
      { when: "agree", text: "and religious institutions should lose their special exemptions", axes: { cult: 0.35, auth: 0.3 } },
      { when: "disagree", text: "though no faith should be able to impose on the others", axes: { cult: 0.35 } }
    ]
  },
  {
    id: "s03",
    section: "society",
    text: "Who you love and who you marry is nobody else's business.",
    info: "A broad statement about the state and personal life. Agreeing treats intimate life as outside public authority; disagreeing thinks a society is entitled to hold a view.",
    axes: { cult: 0.75, auth: -0.5 },
    nuances: [
      { when: "agree", text: "but the state should still recognise and support families", axes: { cult: -0.25, econ: -0.25 } },
      { when: "disagree", text: "though the law should stay out of it even so", axes: { auth: -0.45, cult: 0.3 } }
    ]
  },
  {
    id: "s04",
    section: "society",
    text: "The world is changing faster than most people can live with.",
    info: "Not whether change is good, but whether the pace itself is a problem. Agreeing tends to go with wanting a brake; disagreeing tends to go with wanting an accelerator.",
    axes: { cult: -0.7, ecol: 0.15 },
    nuances: [
      { when: "agree", text: "and the people left behind are owed something for it", axes: { econ: -0.4 } },
      { when: "disagree", text: "people adapt far better than they are given credit for", axes: { cult: 0.3 } }
    ]
  },
  {
    id: "s05",
    section: "society",
    text: "People should be free to define their own identity, and the law should simply follow.",
    info: "Whether official records should reflect how a person understands themselves. Agreeing puts self-definition first; disagreeing thinks public categories need an external test.",
    axes: { cult: 0.8, auth: -0.35 },
    nuances: [
      { when: "agree", text: "with sensible exceptions where physical difference genuinely matters", axes: { cult: -0.35 } },
      { when: "disagree", text: "though people deserve respect and safety regardless", axes: { cult: 0.35, auth: -0.2 } }
    ]
  },
  {
    id: "s06",
    section: "society",
    text: "What an adult does to their own body is their own affair.",
    info: "The broad principle behind drugs, drink, sex work and risky choices. Agreeing draws a hard line around personal autonomy; disagreeing thinks society bears the consequences too.",
    axes: { auth: -0.85, cult: 0.45 },
    nuances: [
      { when: "agree", text: "so legalise, regulate and tax rather than pretend it away", axes: { econ: 0.2, govn: 0.3 } },
      { when: "agree", text: "but the costs of it should not fall on everyone else", axes: { econ: 0.35, auth: 0.2 } },
      { when: "disagree", text: "treat it as a health problem rather than a crime", axes: { auth: -0.45, econ: -0.3 } }
    ]
  },
  {
    id: "s07",
    section: "society",
    text: "Schools should teach children to be proud of their country.",
    info: "Education as shared identity against education as critical inquiry. Agreeing values a common story; disagreeing wants the uncomfortable parts taught too.",
    axes: { natl: -0.7, cult: -0.55, auth: 0.3 },
    nuances: [
      { when: "agree", text: "proud, and honest about the worst of it as well", axes: { natl: 0.4, cult: 0.4 } },
      { when: "disagree", text: "schools should teach how to think, not what to feel", axes: { cult: 0.25, auth: -0.3 } }
    ]
  },
  {
    id: "s08",
    section: "society",
    text: "Decisions about a pregnancy belong to the person who is pregnant.",
    info: "Whether the law should reach into this decision at all. Agreeing treats it as bodily autonomy; disagreeing treats it as a question with more than one party involved.",
    axes: { cult: 0.8, auth: -0.5 },
    nuances: [
      { when: "agree", text: "up to a point in the pregnancy, not indefinitely", axes: { cult: -0.35 } },
      { when: "agree", text: "and the care should be free at the point of use", axes: { econ: -0.4 } },
      { when: "disagree", text: "except where health, assault or serious abnormality is involved", axes: { cult: 0.45, auth: -0.3 } }
    ]
  },
  {
    id: "s09",
    section: "society",
    text: "Someone facing an incurable illness should be allowed to choose when to stop.",
    info: "Assisted dying. Agreeing extends autonomy to the end of life; disagreeing worries about pressure on the vulnerable and the value the law places on life.",
    axes: { cult: 0.65, auth: -0.5 },
    nuances: [
      { when: "agree", text: "with strict safeguards and independent sign-off", axes: { govn: 0.35, cult: -0.2 } },
      { when: "disagree", text: "though nobody should be forced to endure pointless pain", axes: { cult: 0.35 } }
    ]
  },
  {
    id: "s10",
    section: "society",
    text: "The family is the foundation a society is built on, and policy should say so.",
    info: "Whether the state should actively favour family life through tax, law and welfare. Agreeing sees it as the basic social unit; disagreeing sees it as one arrangement among many.",
    axes: { cult: -0.75, natl: -0.2 },
    nuances: [
      { when: "agree", text: "family meaning whoever you build a life with", axes: { cult: 0.55 } },
      { when: "disagree", text: "though raising children is real work and deserves support", axes: { econ: -0.4, cult: 0.2 } }
    ]
  },
  {
    id: "s11",
    section: "society",
    text: "A country works best when the people in it broadly share one culture.",
    info: "Cohesion against diversity. Agreeing sees shared culture as the social glue; disagreeing sees many cultures as a source of strength.",
    axes: { cult: -0.7, natl: -0.7 },
    nuances: [
      { when: "disagree", text: "as long as everyone shares the same basic rules", axes: { natl: -0.35, auth: 0.25 } },
      { when: "agree", text: "though people already here deserve equal treatment regardless", axes: { cult: 0.4, natl: 0.3 } }
    ]
  },
  {
    id: "s12",
    section: "society",
    text: "There is such a thing as a national character, and it is worth protecting.",
    info: "Whether a people has a distinct way of being that can be diluted. Agreeing leans toward cultural preservation; disagreeing sees the idea itself as a fiction.",
    axes: { natl: -0.8, cult: -0.5 },
    nuances: [
      { when: "agree", text: "it is a shared civic culture, not an ethnicity", axes: { natl: 0.45, cult: 0.4 } },
      { when: "disagree", text: "cultures are always changing and always have been", axes: { cult: 0.3, natl: 0.25 } }
    ]
  },
  {
    id: "s13",
    section: "society",
    text: "Art and speech that offend people still deserve protection.",
    info: "Where the right to be offensive ends. Agreeing protects expression almost unconditionally; disagreeing thinks dignity can outweigh a joke or a provocation.",
    axes: { auth: -0.8, cult: -0.1 },
    nuances: [
      { when: "agree", text: "protected from the state, not from criticism", axes: { cult: 0.35, auth: -0.2 } },
      { when: "disagree", text: "though the response should be social, not legal", axes: { auth: -0.5 } }
    ]
  },
  {
    id: "s14",
    section: "society",
    text: "Institutions should treat every applicant identically and ignore their background entirely.",
    info: "Whether fairness means identical treatment now, or active repair of past disadvantage. Agreeing treats the individual as the only fair unit; disagreeing wants inherited disadvantage addressed directly.",
    axes: { cult: -0.7, econ: 0.45 },
    nuances: [
      { when: "disagree", text: "on the basis of class and poverty rather than identity", axes: { econ: -0.35, cult: -0.3 } },
      { when: "agree", text: "though the playing field should be levelled long before that point", axes: { econ: -0.45 } }
    ]
  },
  {
    id: "s15",
    section: "society",
    text: "How to raise a child is the parents' business, not the state's.",
    info: "The boundary between family privacy and public duty toward children. Agreeing limits the state to extreme cases; disagreeing gives society a standing interest.",
    axes: { auth: -0.6, cult: -0.35 },
    nuances: [
      { when: "agree", text: "until a child is actually being harmed", axes: { auth: 0.4 } },
      { when: "disagree", text: "because children are people, not property", axes: { auth: 0.25, cult: 0.4 } }
    ]
  },
  {
    id: "s16",
    section: "society",
    text: "Ordinary people should find it much harder to own a weapon.",
    info: "Firearms and the private means of force. Agreeing prioritises collective safety; disagreeing treats self-defence, or distrust of the state, as decisive.",
    axes: { auth: 0.5, cult: 0.35 },
    nuances: [
      { when: "agree", text: "except for farming, hunting and sport, under licence", axes: { auth: -0.35 } },
      { when: "disagree", text: "because an armed public is a check on the state", axes: { auth: -0.55, govn: -0.3 } }
    ]
  },
  {
    id: "s17",
    section: "society",
    text: "Monuments should be left standing whatever we now think of the people on them.",
    info: "What public space should honour. Agreeing thinks the past should be explained rather than erased; disagreeing thinks public honours should reflect present values.",
    axes: { cult: -0.7, natl: -0.25 },
    nuances: [
      { when: "disagree", text: "moved to a museum and explained, not destroyed", axes: { cult: -0.35 } },
      { when: "agree", text: "but add the full story beside them", axes: { cult: 0.4 } }
    ]
  },
  {
    id: "s18",
    section: "society",
    text: "If nobody will pay for a piece of culture, the public purse should not be forced to.",
    info: "Museums, theatre, libraries, local arts. Agreeing thinks taste should not be subsidised by people who do not share it; disagreeing treats culture as public infrastructure.",
    axes: { econ: 0.55, cult: -0.25 },
    nuances: [
      { when: "disagree", text: "but spread widely, not concentrated in the capital", axes: { auth: -0.35, econ: -0.2 } },
      { when: "agree", text: "though heritage worth keeping is a different matter", axes: { cult: -0.4 } }
    ]
  }
];
