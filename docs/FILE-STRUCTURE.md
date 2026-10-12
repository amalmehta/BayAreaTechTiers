# File Structure

```
.
├── index.html            Page markup: header, role tabs, board, and the detail, settings and feedback dialogs
├── css/styles.css        All styling; light/dark color tokens, tier colors, phone layout
├── js/data.js            The curated content: tiers, rankings, company types, companies and their tiers and notes
├── js/logic.js           Pure functions: build the board, move a company, search, clean stored data, feedback link
├── js/app.js             Glue: renders the page, handles clicks/drag/keys, reads and writes localStorage
├── tests/
│   ├── data.test.mjs     Data checks (every company has a valid tier for every role, unique ids, …)
│   └── logic.test.mjs    Logic checks (board building, moves, search, sanitizing, feedback URL)
├── docs/
│   ├── INSTRUCTIONS.md   Setup, run, use, edit tiers, deploy
│   ├── SYSTEM-DESIGN.md  Architecture, flows, decisions, testing, limits
│   ├── FILE-STRUCTURE.md This file
│   └── images/           README screenshots
├── package.json          `npm test` and `npm start` scripts (no dependencies)
├── rank_company_tier.md  The project brief
├── .nojekyll             Tells GitHub Pages to serve files as-is
├── .gitignore            Keeps .DS_Store, node_modules and .claude out of git
└── README.md             What it is, screenshots and links
```
