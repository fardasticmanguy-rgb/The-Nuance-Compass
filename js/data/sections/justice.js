export const JUSTICE = [
  {
    id: "j01",
    section: "justice",
    text: "A serious crime deserves a punishment that is actually felt, whatever that does for rehabilitation.",
    info: "The purpose of punishment: repair or retribution. Agreeing thinks a wrong deserves a cost regardless of outcome; disagreeing prioritises rehabilitation and reduced reoffending.",
    axes: { auth: 0.8, cult: -0.5 },
    nuances: [
      { when: "disagree", text: "except for the very worst offences", axes: { auth: 0.4 } },
      { when: "agree", text: "though what happens inside should still prepare them to come out", axes: { auth: -0.4 } }
    ]
  },
  {
    id: "j02",
    section: "justice",
    text: "For the gravest crimes, execution can be the right answer.",
    info: "The death penalty. Agreeing accepts the state taking a life as ultimate justice; disagreeing points to irreversibility and the state's record of getting things wrong.",
    axes: { auth: 0.85, cult: -0.6 },
    nuances: [
      { when: "agree", text: "only where guilt is beyond any possible doubt", axes: { auth: -0.35, govn: 0.3 } },
      { when: "disagree", text: "because the state will eventually kill an innocent person", axes: { auth: -0.35, govn: -0.2 } }
    ]
  },
  {
    id: "j03",
    section: "justice",
    text: "Sentences handed down by the courts are generally too soft.",
    info: "A gut reading of whether justice is working. Agreeing usually tracks toward order and deterrence; disagreeing toward the view that long sentences achieve little.",
    axes: { auth: 0.8, cult: -0.5 },
    nuances: [
      { when: "agree", text: "for violence, not for petty or drug offences", axes: { auth: -0.45, cult: 0.35 } },
      { when: "disagree", text: "because prison mostly produces better criminals", axes: { auth: -0.35, cult: 0.3 } }
    ]
  },
  {
    id: "j04",
    section: "justice",
    text: "The law treats people differently depending on who they are.",
    info: "Whether justice is applied evenly across class, race and background. Agreeing sees systemic bias; disagreeing sees a system that broadly works as intended.",
    axes: { cult: 0.7, econ: -0.5 },
    nuances: [
      { when: "agree", text: "mostly a matter of money and lawyers rather than anything else", axes: { econ: -0.4, cult: -0.3 } },
      { when: "disagree", text: "though the badly-off plainly get worse representation", axes: { econ: -0.45 } }
    ]
  },
  {
    id: "j05",
    section: "justice",
    text: "Some of the money spent on policing would do more good spent elsewhere.",
    info: "Shifting resources toward housing, mental health and youth services. Agreeing treats crime as downstream of social conditions; disagreeing sees policing as the thing that keeps order now.",
    axes: { econ: -0.6, auth: -0.6 },
    nuances: [
      { when: "agree", text: "moved, not cut, and only where it demonstrably works", axes: { govn: 0.4, auth: 0.25 } },
      { when: "disagree", text: "though police should not be the ones handling mental health calls", axes: { auth: -0.45 } }
    ]
  },
  {
    id: "j06",
    section: "justice",
    text: "Ordinary police should not carry guns.",
    info: "Routine armed policing. Agreeing sees an unarmed force as safer for everyone; disagreeing sees officers facing armed criminals without means to respond.",
    axes: { auth: -0.6, cult: 0.25 },
    nuances: [
      { when: "agree", text: "with armed units available when they are genuinely needed", axes: { auth: 0.35 } },
      { when: "disagree", text: "though the training and accountability need to be far stronger", axes: { auth: -0.35, govn: 0.3 } }
    ]
  },
  {
    id: "j07",
    section: "justice",
    text: "Possessing a drug should never leave someone with a criminal record.",
    info: "Decriminalisation of personal possession. Agreeing treats use as a health matter; disagreeing thinks removing the penalty removes the deterrent.",
    axes: { auth: -0.75, cult: 0.4 },
    nuances: [
      { when: "agree", text: "and the state should run treatment, not just step back", axes: { econ: -0.4, govn: 0.3 } },
      { when: "disagree", text: "though selling and using should be treated very differently", axes: { auth: -0.4 } }
    ]
  },
  {
    id: "j08",
    section: "justice",
    text: "Anyone facing the state in court should have a serious defence paid for if they cannot afford one.",
    info: "Legal aid. Agreeing treats equal footing in court as fundamental; disagreeing sees public money spent defending the guilty.",
    axes: { econ: -0.5, auth: -0.55 },
    nuances: [
      { when: "agree", text: "funded to the same level as the prosecution, not a token", axes: { econ: -0.4 } },
      { when: "disagree", text: "though nobody should be convicted purely for being poor", axes: { econ: -0.4, auth: -0.3 } }
    ]
  },
  {
    id: "j09",
    section: "justice",
    text: "Fixed minimum sentences set by politicians are good policy.",
    info: "Mandatory minimums. Agreeing wants consistency and no soft judges; disagreeing thinks a judge who has seen the case should decide it.",
    axes: { auth: 0.7, govn: -0.4 },
    nuances: [
      { when: "agree", text: "with an escape clause for exceptional circumstances", axes: { auth: -0.4, govn: 0.35 } },
      { when: "disagree", text: "because politicians set them to win elections, not to reduce crime", axes: { govn: 0.35, auth: -0.3 } }
    ]
  },
  {
    id: "j10",
    section: "justice",
    text: "Ordinary citizens deciding guilt is better than leaving it to professionals.",
    info: "Juries. Agreeing keeps judgement in the hands of the public; disagreeing thinks trained judges make fewer mistakes.",
    axes: { govn: -0.7, auth: -0.3 },
    nuances: [
      { when: "agree", text: "except in highly technical cases like fraud", axes: { govn: 0.4 } },
      { when: "disagree", text: "though a court entirely run by the state is worse", axes: { govn: -0.3, auth: -0.3 } }
    ]
  },
  {
    id: "j11",
    section: "justice",
    text: "Victims should have a formal say in how an offender is sentenced.",
    info: "Victim impact and input. Agreeing gives the harmed party standing; disagreeing thinks justice should not vary with how eloquent or forgiving a victim happens to be.",
    axes: { govn: -0.55, auth: 0.3 },
    nuances: [
      { when: "agree", text: "heard, but not deciding", axes: { govn: 0.35 } },
      { when: "disagree", text: "though they deserve to be kept informed at every step", axes: { govn: -0.2 } }
    ]
  },
  {
    id: "j12",
    section: "justice",
    text: "Executives should go to prison when their company causes serious harm.",
    info: "Personal liability at the top. Agreeing wants power and consequence attached to the same person; disagreeing thinks corporate failure is rarely one individual's crime.",
    axes: { econ: -0.7, auth: 0.4 },
    nuances: [
      { when: "agree", text: "where they knew, or should obviously have known", axes: { econ: -0.2, govn: 0.3 } },
      { when: "disagree", text: "though the fines should be big enough to end the behaviour", axes: { econ: -0.4 } }
    ]
  },
  {
    id: "j13",
    section: "justice",
    text: "Predicting crime with data and cameras is a reasonable thing for police to do.",
    info: "Algorithmic and surveillance-led policing. Agreeing sees a smarter use of limited resources; disagreeing sees old bias rebuilt in software and pointed at the same neighbourhoods.",
    axes: { auth: 0.8, govn: 0.35 },
    nuances: [
      { when: "agree", text: "if the systems are audited publicly and independently", axes: { auth: -0.4, govn: 0.35 } },
      { when: "disagree", text: "because it just automates the prejudice already there", axes: { auth: -0.35, cult: 0.35 } }
    ]
  },
  {
    id: "j14",
    section: "justice",
    text: "There are situations where breaking an unjust law is the right thing to do.",
    info: "Civil disobedience. Agreeing puts conscience above legality; disagreeing thinks a society where everyone judges the law for themselves stops functioning.",
    axes: { auth: -0.8, cult: 0.35 },
    nuances: [
      { when: "agree", text: "openly, and accepting the punishment that follows", axes: { auth: 0.3, cult: -0.2 } },
      { when: "disagree", text: "though there are laws no one should ever obey", axes: { auth: -0.45 } }
    ]
  },
  {
    id: "j15",
    section: "justice",
    text: "People are entitled to know whether someone they are dealing with has a criminal past.",
    info: "Whether punishment should end when the sentence does. Agreeing prioritises disclosure; disagreeing thinks a record that follows you forever is a second sentence.",
    axes: { auth: 0.65, cult: -0.45, econ: 0.3 },
    nuances: [
      { when: "disagree", text: "except where the job puts them near the same risk again", axes: { auth: 0.4 } },
      { when: "agree", text: "though it should fade with time and good behaviour", axes: { auth: -0.4 } }
    ]
  }
];
