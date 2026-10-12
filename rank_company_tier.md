PROJECT NAME: rank_company_tier

META-INSTRUCTIONS:

<Read it all before acting. Ask about anything unclear, contradictory or
 underspecified — before starting and mid-build. Ask in the question widget
 (AskUserQuestion): related questions batched, concrete options, your
 recommendation first. Plain text only if the widget isn't available.>

<Don't expand scope. Anything not listed here is a proposal, including changes
 to this file — propose it, don't do it.>

<Prefer doing over describing: run the code, write the files, test it.>

<Always in scope, no proposal needed: when it goes on GitHub, a README that is
 easy to read at a glance — a line on what it is, then clear visuals
 (screenshots, a diagram or a chart), then links. Everything else goes in
 linked files: docs/INSTRUCTIONS.md (setup, run, use),
 docs/SYSTEM-DESIGN.md (see below) and docs/FILE-STRUCTURE.md (what's where). If what you're
 building is an application rather than a script, also a small unobtrusive feedback tab, and a settings
 button or tab (⌘, on the Mac) that gathers its preferences in one place.>

<If what you're building is an application, build it as a Mac app first; the
 website comes after, as its own step.>

<Name things the way a person would say them — "Goal Tracker", not
 goal_tracker — for the app, its windows, titles, files people open, repo
 descriptions and README headings. When you create the GitHub repo, name it
 with no "_" or "-": one word or joined words, e.g. GoalTracker.>

<Always in scope: a system design doc in the codebase, docs/SYSTEM-DESIGN.md,
 kept current as the build changes. Cover the architecture (with a Mermaid
 diagram), each component's job, the main flows, where data lives, the key
 design decisions and their trade-offs, how it's tested, and known limits.>

<Finish by listing every deliverable: path, what it is, how to check it works.>

<Git rules (no Claude attribution, never commit .claude/) are in
 ~/.claude/CLAUDE.md and apply on their own — nothing to repeat here.>

<Keep the changelog at the bottom current.>

CONTEXT:

based on well-known tech companies in the bay area, create a company ranking tier list for various types of roles (based on prestige)

DELIVERABLES:

website

OPEN QUESTIONS / ASSUMPTIONS:

<Agent fills in: what it guessed, what it decided without asking.>

Asked and answered (2026-10-06):
- Platform: website only (the DELIVERABLES field wins over the "Mac app first" meta-instruction).
- Roles: Software Engineering, ML & AI Research, Product Management, Design, Data Science, Sales & Go-to-Market.
- Interactivity: curated viewer plus a "My list" drag-to-rearrange mode, saved in the browser.
- Hosting: GitHub repo BayAreaTechTiers, deployed with GitHub Pages.

Decided without asking:
- Name: "Bay Area Tech Tiers".
- Tiers S/A/B/C/D, each with a one-line meaning. D means "respected, but not a prestige play for this role", not "bad".
- About 44 companies: Bay Area HQ or a major Bay Area presence. Left out companies whose HQ moved away (Tesla, Oracle, X, Palantir) and non-Bay Area giants (Microsoft, Amazon).
- Google DeepMind is folded into Google. Slack and Tableau are folded into Salesforce.
- The tiers are my own opinion as of October 2026, shown as opinion on the page.
- Logos are monogram tiles, not company logos (avoids trademarks).
- Feedback opens a prefilled GitHub issue (no backend). Settings: theme, default role, show cities, open in My list mode, reset all lists.
- Tests use Node's built-in runner. No dependencies, no build step.

Company types and Overall (2026-10-11, decided without asking):
- Types: Big Tech, Frontier AI, Startups (private), Established (public, below Big Tech scale; the "middling" group), Legacy & Hardware.
- LinkedIn and Waymo count as Big Tech (Microsoft and Alphabet). Stripe and Databricks are Startups because they're private. Figma and Airbnb are Established.
- "Overall" is its own curated tier per company, not an average of the role tiers. It's the default tab.
- Added 28 companies, for 72 in all. Frontier AI: Safe Superintelligence, Thinking Machines Lab, Physical Intelligence. Startups: Cursor, Cognition, Applied Intuition, Sierra, Harvey, Linear, Decagon, Mercor, Replit, Brex, Retool, Mercury, Faire, Airtable, Gusto, Deel, Benchling. Established: Samsara, Palo Alto Networks, Chime, Zoom. Legacy & Hardware: Broadcom, Applied Materials, HP, eBay.

CHANGELOG:

- 2026-10-06 — created
- 2026-10-11 — added company types (Big Tech, Frontier AI, Startups, Established, Legacy & Hardware) as filters, an Overall ranking, and 28 more companies (72 total)
- 2026-10-06 — built v1: static site, 6 role tier lists, My list mode, settings, feedback tab, tests, docs; GitHub Pages
- 2026-09-15 — added meta-instruction: built-out applications include a small feedback tab
- 2026-09-15 — added meta-instruction: no "Claude" attribution in commits, PRs, or branches
- 2026-09-16 — added meta-instruction: always include a README when adding to GitHub
- 2026-09-16 — changed meta-instruction: ask clarifying questions in the question widget
- 2026-09-17 — added meta-instructions: Claude never a contributor; never commit .claude/
- 2026-09-26 — compressed the meta-instructions and every field prompt; git rules moved to the global instruction file
- 2026-09-27 — added meta-instruction: applications are built as a Mac app first, then a website
- 2026-09-28 — folded inputs, instructions, constraints, deliverables and done criteria into one free-form CONTEXT
- 2026-09-28 — changed meta-instruction: a README on GitHub always includes a visual
- 2026-09-28 — added meta-instruction: name things like a person would, never snake_case
- 2026-09-28 — changed meta-instruction: README leads with visuals; instructions live in a linked guide
- 2026-09-28 — changed meta-instruction: README is visuals and links; details in docs/INSTRUCTIONS.md and docs/FILE-STRUCTURE.md
- 2026-09-29 — changed meta-instruction: GitHub repo names have no "_" or "-"
- 2026-10-02 — added a DELIVERABLES field after CONTEXT
- 2026-10-02 — added meta-instruction: every project has a system design doc at docs/SYSTEM-DESIGN.md
- 2026-10-05 — added meta-instruction: applications include a settings button or tab
