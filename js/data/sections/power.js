export const POWER = [
  {
    id: "p01",
    section: "power",
    text: "If you have nothing to hide, being watched should not frighten you.",
    info: "Surveillance catches criminals and also builds a record of everyone's life. Agreeing accepts monitoring as the price of safety; disagreeing treats privacy as a right that does not need justifying.",
    axes: { auth: 0.9 },
    nuances: [
      { when: "agree", text: "but only with a warrant signed by a judge", axes: { auth: -0.5, govn: 0.25 } },
      { when: "agree", text: "watching foreigners is different from watching citizens", axes: { natl: -0.45 } },
      { when: "disagree", text: "and the same goes for corporations, not just the state", axes: { econ: -0.4 } }
    ]
  },
  {
    id: "p02",
    section: "power",
    text: "Some questions are too serious to be settled by a public vote.",
    info: "Constitutions, rights, scientific questions, war. Agreeing wants certain things insulated from majorities; disagreeing thinks the people should be able to decide anything about their own country.",
    axes: { govn: 0.85, auth: 0.4 },
    nuances: [
      { when: "agree", text: "because rights should not depend on a majority mood", axes: { auth: -0.5, cult: 0.3 } },
      { when: "agree", text: "because most voters simply do not have the information", axes: { govn: 0.35, auth: 0.3 } },
      { when: "disagree", text: "though a vote should need a large majority, not a bare one", axes: { govn: 0.3 } }
    ]
  },
  {
    id: "p03",
    section: "power",
    text: "A country sometimes needs a leader who can cut through the process and act.",
    info: "The appeal of decisive rule against the friction of parliaments, courts and consultation. This is one of the clearest markers on the authority axis.",
    axes: { auth: 0.95, govn: -0.35 },
    nuances: [
      { when: "agree", text: "only under a genuine emergency, with a hard time limit", axes: { auth: -0.55 } },
      { when: "disagree", text: "because the process is precisely what protects you", axes: { auth: -0.3, govn: 0.3 } }
    ]
  },
  {
    id: "p04",
    section: "power",
    text: "Someone who leaks a government secret to expose wrongdoing is doing the right thing.",
    info: "Whistleblowers break the law and sometimes reveal genuine abuses. Agreeing puts public knowledge above official secrecy; disagreeing puts the chain of command first.",
    axes: { auth: -0.85, govn: -0.2 },
    nuances: [
      { when: "agree", text: "only if they tried the proper channels first", axes: { auth: 0.4 } },
      { when: "agree", text: "even if lives are put at risk, the truth comes first", axes: { auth: -0.3, natl: 0.3 } },
      { when: "disagree", text: "though they deserve protection when the wrongdoing is real", axes: { auth: -0.4 } }
    ]
  },
  {
    id: "p05",
    section: "power",
    text: "Decisions should be made as close to the people they affect as possible.",
    info: "Devolving power to regions, towns and neighbourhoods rather than a national capital. Agreeing favours local control; disagreeing values one standard applied to everyone.",
    axes: { auth: -0.65, natl: -0.2, govn: -0.4 },
    nuances: [
      { when: "agree", text: "but basic rights must be identical everywhere", axes: { auth: 0.35, cult: 0.3 } },
      { when: "disagree", text: "because local power just creates local tyrannies", axes: { auth: 0.3, govn: 0.3 } }
    ]
  },
  {
    id: "p06",
    section: "power",
    text: "Protest that shuts down ordinary life is still legitimate protest.",
    info: "Blockades, occupations, strikes that inconvenience uninvolved people. Agreeing sees disruption as the whole point of protest; disagreeing sees a line between speaking and coercing.",
    axes: { auth: -0.75, cult: 0.4 },
    nuances: [
      { when: "agree", text: "as long as nobody is hurt and nothing is destroyed", axes: { auth: 0.3 } },
      { when: "agree", text: "and those who do it should still accept the legal consequences", axes: { auth: 0.35 } },
      { when: "disagree", text: "though peaceful protest must be fiercely protected", axes: { auth: -0.45 } }
    ]
  },
  {
    id: "p07",
    section: "power",
    text: "When the public is plainly wrong about the facts, government should act on the evidence anyway.",
    info: "The clearest test of the expertise axis. Agreeing accepts that specialists sometimes know better; disagreeing says a government that overrules its people stops being theirs.",
    axes: { govn: 0.9, auth: 0.5 },
    nuances: [
      { when: "agree", text: "but it must explain itself and face the voters afterwards", axes: { govn: -0.3, auth: -0.3 } },
      { when: "disagree", text: "because deciding who counts as an expert is itself political", axes: { govn: -0.35 } }
    ]
  },
  {
    id: "p08",
    section: "power",
    text: "Political parties that threaten the system should be banned from running.",
    info: "Democracies sometimes outlaw movements that would end democracy. Agreeing accepts self-defence; disagreeing thinks the power to ban opponents will always be abused eventually.",
    axes: { auth: 0.7, govn: 0.25 },
    nuances: [
      { when: "agree", text: "only where a court, not a government, makes the call", axes: { auth: -0.35, govn: 0.35 } },
      { when: "disagree", text: "beat them in the open instead", axes: { auth: -0.35, govn: -0.3 } }
    ]
  },
  {
    id: "p09",
    section: "power",
    text: "Emergency powers are almost never handed back once the emergency ends.",
    info: "A claim about how states behave rather than about what is right. Agreeing makes you wary of any temporary power; disagreeing trusts institutions to wind them down.",
    axes: { auth: -0.7, govn: -0.25 },
    nuances: [
      { when: "agree", text: "so every emergency law should expire automatically", axes: { govn: 0.3, auth: -0.3 } },
      { when: "disagree", text: "though sunset clauses are still sensible", axes: { auth: -0.25 } }
    ]
  },
  {
    id: "p10",
    section: "power",
    text: "Speech that attacks whole groups of people should be against the law.",
    info: "This one splits people who normally agree with each other. Agreeing treats such speech as a harm the law should reach; disagreeing treats the power to define it as more dangerous than the speech.",
    axes: { auth: 0.7, cult: 0.35 },
    nuances: [
      { when: "agree", text: "only where it incites actual violence", axes: { auth: -0.45 } },
      { when: "disagree", text: "though platforms should still be free to remove it", axes: { econ: 0.3, cult: 0.2 } },
      { when: "disagree", text: "because the law will be turned on the powerless first", axes: { auth: -0.35, cult: 0.3 } }
    ]
  },
  {
    id: "p11",
    section: "power",
    text: "People should have to prove who they are before they can speak online.",
    info: "Ending anonymity to reduce abuse and manipulation. Agreeing prioritises accountability; disagreeing notes that anonymity protects dissidents, whistleblowers and ordinary privacy.",
    axes: { auth: 0.85, cult: -0.2 },
    nuances: [
      { when: "agree", text: "verified to the platform, but still anonymous to the public", axes: { auth: -0.4 } },
      { when: "disagree", text: "because anonymity is the only shield some people have", axes: { auth: -0.3, cult: 0.25 } }
    ]
  },
  {
    id: "p12",
    section: "power",
    text: "The way a country is governed should be hard to change.",
    info: "Entrenched constitutions, supermajorities, judicial review. Agreeing values stability and protection from passing moods; disagreeing thinks the living should not be ruled by the dead.",
    axes: { cult: -0.55, auth: 0.25, govn: 0.35 },
    nuances: [
      { when: "agree", text: "hard, but never impossible", axes: { cult: 0.3 } },
      { when: "disagree", text: "each generation should be able to write its own rules", axes: { cult: 0.35, govn: -0.35 } }
    ]
  },
  {
    id: "p13",
    section: "power",
    text: "Money should be kept out of politics, even if that means the state funds the parties.",
    info: "Public funding and donation caps against the freedom to support who you like. Agreeing treats political money as corrupting; disagreeing treats donating as part of political speech.",
    axes: { econ: -0.45, auth: 0.3, govn: 0.3 },
    nuances: [
      { when: "agree", text: "small donations from individuals should still be welcome", axes: { govn: -0.3, auth: -0.25 } },
      { when: "disagree", text: "though every donation should be public and instantly visible", axes: { govn: 0.3 } }
    ]
  },
  {
    id: "p14",
    section: "power",
    text: "Elected politicians should be able to hire and fire the officials who work under them.",
    info: "A professional civil service against political appointees. Agreeing wants officials answerable to whoever won the election; disagreeing wants continuity and expertise insulated from politics.",
    axes: { govn: -0.75, auth: -0.2 },
    nuances: [
      { when: "disagree", text: "but senior roles should still change with the government", axes: { govn: -0.35 } },
      { when: "agree", text: "because nobody voted for them", axes: { govn: -0.3, auth: -0.2 } }
    ]
  },
  {
    id: "p15",
    section: "power",
    text: "Big questions should be put directly to the people in a referendum.",
    info: "Direct democracy against representative government. Agreeing trusts the public verdict; disagreeing thinks complicated questions get flattened into slogans.",
    axes: { govn: -0.8, auth: -0.2 },
    nuances: [
      { when: "agree", text: "with a long, funded public debate beforehand", axes: { govn: 0.3 } },
      { when: "disagree", text: "because a single yes or no cannot carry that much weight", axes: { govn: -0.2 } }
    ]
  },
  {
    id: "p16",
    section: "power",
    text: "The armed forces should stay out of politics entirely, whatever the crisis.",
    info: "Civilian control of the military. Agreeing holds the line absolutely; disagreeing allows that there are moments when soldiers must act.",
    axes: { auth: -0.6, govn: 0.25 },
    nuances: [
      { when: "agree", text: "including in disaster relief, which is a civilian job", axes: { auth: -0.3 } },
      { when: "disagree", text: "only to defend the constitution, never to suspend it", axes: { auth: 0.3, govn: 0.25 } }
    ]
  },
  {
    id: "p17",
    section: "power",
    text: "Young people should get the vote earlier than they do now.",
    info: "Usually framed as lowering the voting age to sixteen. Agreeing widens the franchise toward those who will live with the consequences; disagreeing sets a bar of experience.",
    axes: { cult: 0.6, govn: -0.3, ecol: 0.2 },
    nuances: [
      { when: "agree", text: "if they can work and pay tax, they can vote", axes: { cult: 0.25, econ: 0.2 } },
      { when: "disagree", text: "though they should be taught politics properly before they do", axes: { govn: 0.3 } }
    ]
  }
];
