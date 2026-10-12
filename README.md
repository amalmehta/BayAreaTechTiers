# Bay Area Tech Tiers

Prestige tier lists (S to D) of 72 well-known Bay Area tech companies: an overall list plus one for each of six roles. You can filter by company type (Big Tech, Frontier AI, Startups, Established, Legacy & Hardware) and rearrange any list into your own.

![Overall tier list](docs/images/desktop.png)

<img src="docs/images/mobile-dark.png" alt="Phone-width view in dark mode" width="320">

```mermaid
flowchart LR
  D[Curated tiers<br/>js/data.js] --> L[Logic<br/>js/logic.js]
  L --> UI[Page<br/>index.html + js/app.js]
  UI <--> S[(Your lists & settings<br/>browser localStorage)]
  UI -- Feedback --> G[Prefilled GitHub issue]
```

**Live site:** https://amalmehta.github.io/BayAreaTechTiers/

- [How to set up, run and use it](docs/INSTRUCTIONS.md)
- [System design](docs/SYSTEM-DESIGN.md)
- [What's where](docs/FILE-STRUCTURE.md)

*This is an opinion, not a fact. Prestige isn't the same as pay, culture or fit.*
