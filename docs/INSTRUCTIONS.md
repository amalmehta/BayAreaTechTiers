# Instructions

## Use it

Open the live site at https://amalmehta.github.io/BayAreaTechTiers/.

- **Pick a role:** use the tabs (Software Engineering, ML & AI Research, Product Management, Design, Data Science, Sales & Go-to-Market).
- **Find a company:** type in the search box. Companies that don't match fade out. It matches on name, city and description.
- **See details:** click a company to see its description, a note on this role (when there is one), and its tier for every role.
- **Make your own list:** switch to **My list**.
  - Drag a company to another tier, or click it and pick a tier (this also works on phones).
  - Moved companies get a dashed border.
  - **Reset this role** undoes your changes for the role you're viewing.
  - Your lists are saved in this browser only.
- **Settings:** the gear button, or ⌘, (Ctrl+, on Windows and Linux). Settings cover:
  - Appearance: system, light or dark.
  - The role shown when the page opens.
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
c("stripe", "Stripe", "South San Francisco", "Payments infrastructure for the internet.", "SCSAAS", { pm: "…" }),
```

The six letters are its tiers in role order: Engineering, ML & AI, Product, Design, Data, Sales. The last argument is optional and holds notes for specific roles. Run `npm test` afterwards. It catches missing or invalid tiers.

## Deploy

GitHub Pages serves the `main` branch root. Pushing to `main` updates the live site in about a minute.
