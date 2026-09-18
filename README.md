# The Nuance Compass

A political test that admits people don't answer in yes or no.

Most compass tests hand you five radio buttons and treat *"abortion should be legal"* as one
question with one answer. It isn't. People agree **up to a point**, or agree **only if**, or would
agree if the statement meant the thing they think it means. This test is built around that gap.

**[Live version](https://fardasticmanguy-rgb.github.io/political-compass/)**

## What makes it different

**Five choices, or a scale if you want one.** Answer with the usual five buttons. If you sit
between two of them, open the fine-tune scale and place yourself anywhere from −100 to +100. It
snaps to the five choices and to steps of 5 in between, so it never fights you.

**Conditions, not absolutes.** Every statement carries the clauses people actually attach to their
opinions. Move the slider to the agree side and you're offered the qualifiers of agreement
(*only with a warrant*, *but not when it's inherited*, *as long as nobody is hurt*). Move it to
disagree and you're offered the reservations instead (*unless they genuinely cannot work*,
*though peaceful protest must be protected*). Each condition carries its own scoring weight, which
is how *agree, but only with a warrant* lands somewhere different from a flat *agree*.

**No assumed vocabulary.** Every question has an `i` button explaining in plain language what the
statement is really asking and what each side tends to imply. Nobody should have to already know
what "Georgism" means to answer honestly.

**Six axes.** Two axes cannot hold a person, so the classic economic and authority axes are joined
by culture, borders, ecology, and who you trust to make decisions.

## Results

- Your position plotted on the familiar four-quadrant compass, with either political traditions or
  real countries plotted alongside you for reference
- All six axes scored with a named position on each
- Your closest political traditions, ranked by distance across all six axes
- **Which countries your answers line up with**, and which one you're furthest from
- The answers that moved your score the most, the ones you wouldn't commit to, and any axis where
  you pulled in both directions at once
- A shareable link that encodes every answer in the URL, and a downloadable image

## The questions

100 statements across six sections: money and work, power and the state, society and custom, nation
and world, nature and machines, and crime and punishment. Between them they carry 220 conditional
clauses.

They're deliberately written broad rather than technical. The aim is to catch your instinct about
a principle, not to quiz you on policy detail. They're also **polarity balanced**: agreeing with all
100 statements puts you within a point or two of dead centre on every axis, so the test can't be
gamed by nodding along, and acquiescence bias doesn't quietly push everyone to one corner.

## Running it

No build step, no dependencies, no backend. It's static files.

```bash
git clone https://github.com/fardasticmanguy-rgb/political-compass.git
cd political-compass
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

It uses ES modules, so it needs to be served over HTTP rather than opened as a `file://` path.
Any static server works (`npx serve`, `python3 -m http.server`, the VS Code Live Server extension).

### Deploying

A GitHub Actions workflow in `.github/workflows/pages.yml` publishes the site to GitHub Pages on
every push to `main`.

Pages has to be switched on once by the repository owner before the first deploy can land:
**Settings > Pages > Build and deployment > Source > GitHub Actions**. After that every push
republishes on its own.

It's a static site, so it also drops onto Netlify, Vercel, or Cloudflare Pages with no
configuration. Point them at the repository root.

## How scoring works

Each statement pulls on one or more axes with a signed weight, scaled by how strongly you
answered. Selected conditions add their own smaller pulls, scaled by how strongly you answered the
parent question.

Each axis is normalised against the strongest possible answer to the questions you actually
answered, so questions you leave shrink the denominator instead of dragging you toward the centre.

Traditions and countries are matched by weighted Euclidean distance across all six axes, with the
economic and authority axes counting slightly heavier since they carry the most questions.

Nothing is sent anywhere. Answers live in `localStorage`, and shared links carry the full result
encoded in the URL fragment, which browsers never transmit to a server.

## Structure

```
index.html              markup for all three screens
css/style.css           styling, light and dark themes
js/main.js              screen routing and boot
js/quiz.js              question rendering, answer control, conditions, keyboard control
js/results.js           results screen
js/compass.js           the compass plot, drawn as SVG
js/scoring.js           scoring, normalisation, matching
js/state.js             localStorage persistence
js/share.js             result encoding for shareable links
js/data/axes.js         the six axes and their position labels
js/data/questions.js    question index
js/data/sections/       the 100 questions, by section
js/data/ideologies.js   31 traditions positioned on all six axes
js/data/countries.js    48 countries positioned on all six axes
```

## Adding a question

Drop an object into the relevant file in `js/data/sections/`:

```js
{
  id: "w19",
  section: "work",
  text: "The statement, written broadly enough to answer on instinct.",
  info: "What the question is really asking, and what each side tends to imply.",
  axes: { econ: -0.6, auth: 0.2 },
  nuances: [
    { when: "agree", text: "but only if ...", axes: { econ: 0.3 } },
    { when: "disagree", text: "unless ...", axes: { econ: -0.3 } },
    { when: "any", text: "a framing point that applies either way", axes: { auth: -0.2 } }
  ]
}
```

`axes` values run −1 to 1 and describe the pull when someone **fully agrees**. `when` controls
which side of the slider a condition appears on. Everything else (ids, indexes, normalisation)
is derived automatically.

If you add questions, keep an eye on polarity balance: the signed sum of each axis's weights across
all questions should stay near zero.

## Caveats

The country positions are rough readings of each state's prevailing policy mix over recent years.
They are not a verdict on the people who live there, they compress a great deal into six numbers,
and they will be arguable at the edges. Same goes for the ideology coordinates. It's a portfolio
piece and a conversation starter, not political science.

## Licence

MIT.
