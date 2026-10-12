# Instructions

## Use it

Open the live site at https://amalmehta.github.io/BayAreaTechTiers/.

- **Pick a ranking:** use the tabs: Overall (the default), Software Engineering, ML & AI Research, Product Management, Design, Data Science, Sales & Go-to-Market.
- **Filter by company type:** use the row under the tabs: All, Big Tech, Frontier AI, Startups (private), Established (public, below Big Tech scale), Legacy & Hardware. The board then shows only that type, ranked against each other. Each button shows how many companies it has.
- **Find a company:** type in the search box. Companies that don't match fade out. It matches on name, city and description.
- **See details:** click a company to see its description, a note on this role (when there is one), and its tier for every role.
- **Make your own list:** switch to **My list**.
  - Drag a company to another tier, or click it and pick a tier (this also works on phones).
  - Moved companies get a dashed border.
  - **Reset this role** undoes your changes for the role you're viewing.
  - Your lists are saved in this browser only.
- **Settings:** the gear button, or ⌘, (Ctrl+, on Windows and Linux). Settings cover:
  - Appearance: system, light or dark.
  - The ranking shown when the page opens (Overall by default).
  - Whether to show cities under company names.
  - Whether to open in My list mode.
  - Reset all my lists.
- **Feedback:** the small tab on the right edge. Write a note and press **Continue on GitHub**. A prefilled issue opens in a new tab, and nothing is sent until you submit it there.

> In some browsers ⌘, is taken by the browser's own preferences. If so, use the gear button.

## Run it locally

You need Python 3 (any static file server works) and, for the tests, Node 18+. There's nothing to install.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. The page uses ES modules, so opening `index.html` straight from disk (`file://`) won't work. Serve it over HTTP instead.

## Test it

```bash
npm test
```

This runs the Node built-in test runner on `tests/`. The tests check that the data is complete and that the pure logic works (see [SYSTEM-DESIGN.md](SYSTEM-DESIGN.md#testing)).

## Change the tiers

Edit `js/data.js`. Each company is one line:

```js
c("stripe", "Stripe", "South San Francisco", "startup", "Payments infrastructure for the internet.", "SCSAASS", { pm: "…" }),
```

The fourth argument is the company type, one of the `CATEGORIES` ids: `bigtech`, `frontier`, `startup`, `established` or `legacy`. The seven letters are its tiers in this order: Engineering, ML & AI, Product, Design, Data, Sales, Overall. The last argument is optional and holds notes for specific roles. Run `npm test` afterwards. It catches missing or invalid tiers.

## Deploy

GitHub Pages serves the `main` branch root. Pushing to `main` updates the live site in about a minute.
