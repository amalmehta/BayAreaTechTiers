// Curated tier data. Opinion, not fact: prestige as perceived by people hiring
// and job-hunting in Bay Area tech, as of October 2026.

export const AS_OF = "October 2026";

export const TIERS = [
  { id: "S", label: "S", meaning: "Elite — opens almost any door" },
  { id: "A", label: "A", meaning: "Top tier — instantly recognized as strong" },
  { id: "B", label: "B", meaning: "Strong — well respected in the field" },
  { id: "C", label: "C", meaning: "Solid — good name, less buzz" },
  { id: "D", label: "D", meaning: "Respected — but not a prestige play for this role" },
];

export const ROLES = [
  { id: "overall", name: "Overall", short: "Overall" },
  { id: "swe", name: "Software Engineering", short: "Engineering" },
  { id: "ml", name: "ML & AI Research", short: "ML & AI" },
  { id: "pm", name: "Product Management", short: "Product" },
  { id: "design", name: "Design", short: "Design" },
  { id: "ds", name: "Data Science", short: "Data" },
  { id: "gtm", name: "Sales & Go-to-Market", short: "Sales" },
];

export const CATEGORIES = [
  { id: "bigtech", name: "Big Tech", meaning: "The giants and their big subsidiaries" },
  { id: "frontier", name: "Frontier AI", meaning: "Labs training frontier foundation models" },
  { id: "startup", name: "Startups", meaning: "Private, venture-backed companies, from Series A to decacorn" },
  { id: "established", name: "Established", meaning: "Public, post-IPO companies below Big Tech scale" },
  { id: "legacy", name: "Legacy & Hardware", meaning: "Older Silicon Valley giants and chipmakers" },
];

// Shorthand: the tier string lists tiers in this order —
// swe, ml, pm, design, ds, gtm, overall.
const TIER_ORDER = ["swe", "ml", "pm", "design", "ds", "gtm", "overall"];

function c(id, name, city, category, blurb, tiers, notes = {}) {
  const letters = tiers.split("");
  return {
    id, name, city, category, blurb, notes,
    tiers: Object.fromEntries(TIER_ORDER.map((role, i) => [role, letters[i]])),
  };
}

export const COMPANIES = [
  // Big Tech
  c("google", "Google", "Mountain View", "bigtech", "Search, Android, Cloud, YouTube and Google DeepMind.", "ASAAABA",
    { ml: "Includes Google DeepMind and Google Research.", gtm: "Mostly Google Cloud sales." }),
  c("meta", "Meta", "Menlo Park", "bigtech", "Facebook, Instagram, WhatsApp and Meta Superintelligence Labs.", "AAAASBA",
    { ds: "Product analytics at Meta's scale is the reference point for the field." }),
  c("apple", "Apple", "Cupertino", "bigtech", "iPhone, Mac and Apple silicon.", "ABASBCA",
    { design: "The design brand in consumer hardware and software." }),
  c("nvidia", "Nvidia", "Santa Clara", "bigtech", "GPUs, CUDA and the hardware behind the AI boom.", "SABCBAS"),
  c("netflix", "Netflix", "Los Gatos", "bigtech", "Streaming; known for senior-only, top-of-market pay.", "ABABSDA",
    { swe: "High bar and high pay, with a small, senior team." }),
  c("linkedin", "LinkedIn", "Sunnyvale", "bigtech", "Professional network, owned by Microsoft.", "BBBCABB"),
  c("waymo", "Waymo", "Mountain View", "bigtech", "Self-driving cars from Alphabet.", "AABBBCA"),

  // Frontier AI
  c("openai", "OpenAI", "San Francisco", "frontier", "Maker of ChatGPT and the GPT models.", "SSSAASS",
    { ml: "The frontier lab most people name first." }),
  c("anthropic", "Anthropic", "San Francisco", "frontier", "Maker of the Claude models; safety-focused frontier lab.", "SSSAASS",
    { ml: "Frontier lab with a deep interpretability and alignment bench." }),
  c("xai", "xAI", "Palo Alto", "frontier", "Maker of the Grok models.", "AABCCCA"),
  c("ssi", "Safe Superintelligence", "Palo Alto", "frontier", "Ilya Sutskever's research-only lab.", "ASDDCDA",
    { pm: "No products yet, so little PM work to point to." }),
  c("thinkingmachines", "Thinking Machines Lab", "San Francisco", "frontier", "Mira Murati's AI lab.", "ASBBBCA"),
  c("physicalintelligence", "Physical Intelligence", "San Francisco", "frontier", "Foundation models for robots.", "AACCCDB"),

  // Startups
  c("stripe", "Stripe", "South San Francisco", "startup", "Payments infrastructure for the internet.", "SCSAASS",
    { pm: "Famous for writing culture and craft-focused PMs." }),
  c("databricks", "Databricks", "San Francisco", "startup", "Data and AI platform; home of Spark and Mosaic AI.", "SAACASA",
    { gtm: "One of the most sought-after enterprise sales orgs." }),
  c("cursor", "Cursor", "San Francisco", "startup", "AI code editor, made by Anysphere.", "SBAABBA"),
  c("scaleai", "Scale AI", "San Francisco", "startup", "Data labeling and evaluation for AI labs.", "BBBCBAB"),
  c("perplexity", "Perplexity", "San Francisco", "startup", "AI answer engine.", "ABABBBB"),
  c("cognition", "Cognition", "San Francisco", "startup", "Maker of the Devin and Windsurf coding agents.", "ABBCCBB"),
  c("appliedintuition", "Applied Intuition", "Mountain View", "startup", "Software and AI for autonomous vehicles.", "ABBCCBB"),
  c("sierra", "Sierra", "San Francisco", "startup", "AI customer-service agents, co-founded by Bret Taylor.", "BCABCAB"),
  c("harvey", "Harvey", "San Francisco", "startup", "AI for law firms.", "BCBBCAB"),
  c("linear", "Linear", "San Francisco", "startup", "Issue tracker famous for its craft.", "ADASCCB",
    { design: "Often cited as the bar for software design craft." }),
  c("notion", "Notion", "San Francisco", "startup", "Docs, wikis and AI workspace.", "BCAABAB"),
  c("rippling", "Rippling", "San Francisco", "startup", "HR, IT and payroll platform.", "BDBBBAB"),
  c("vercel", "Vercel", "San Francisco", "startup", "Frontend cloud; maker of Next.js.", "BDBACAB"),
  c("glean", "Glean", "Palo Alto", "startup", "AI search for company knowledge.", "BBBBCAB"),
  c("plaid", "Plaid", "San Francisco", "startup", "Bank-data APIs behind most fintech apps.", "BDBBBBB"),
  c("decagon", "Decagon", "San Francisco", "startup", "AI customer-support agents.", "BCBCCBC"),
  c("mercor", "Mercor", "San Francisco", "startup", "AI-driven hiring and expert data for AI labs.", "BCBCCBC"),
  c("replit", "Replit", "Foster City", "startup", "Browser IDE and AI app builder.", "BCBBCCC"),
  c("discord", "Discord", "San Francisco", "startup", "Chat for communities and gamers.", "BDBBBDC"),
  c("brex", "Brex", "San Francisco", "startup", "Corporate cards and spend management.", "BDBBBBC"),
  c("retool", "Retool", "San Francisco", "startup", "Internal-tool builder.", "BDBBCBC"),
  c("mercury", "Mercury", "San Francisco", "startup", "Banking for startups.", "BDBACCC"),
  c("faire", "Faire", "San Francisco", "startup", "Wholesale marketplace for independent retail.", "BCBBBCC"),
  c("airtable", "Airtable", "San Francisco", "startup", "No-code databases and apps.", "CDBBCBC"),
  c("gusto", "Gusto", "San Francisco", "startup", "Payroll and HR for small businesses.", "CDBBCBC"),
  c("deel", "Deel", "San Francisco", "startup", "Global payroll and hiring.", "CDCCCAC"),
  c("benchling", "Benchling", "San Francisco", "startup", "Software for biotech R&D.", "CDBBCBC"),

  // Established
  c("airbnb", "Airbnb", "San Francisco", "established", "Travel marketplace with a design-led culture.", "ACSSSCA"),
  c("figma", "Figma", "San Francisco", "established", "Collaborative design tool.", "ACSSBAA",
    { design: "Designers building tools for designers." }),
  c("uber", "Uber", "San Francisco", "established", "Rides and delivery at global scale.", "BBABACB"),
  c("doordash", "DoorDash", "San Francisco", "established", "Local delivery marketplace.", "BCBBACB"),
  c("coinbase", "Coinbase", "San Francisco", "established", "Crypto exchange (remote-first, SF roots).", "BCBBBBB"),
  c("robinhood", "Robinhood", "Menlo Park", "established", "Consumer investing app.", "BCBBBDB"),
  c("cloudflare", "Cloudflare", "San Francisco", "established", "Network, security and edge compute.", "BDBCCAB"),
  c("pinterest", "Pinterest", "San Francisco", "established", "Visual discovery and shopping.", "BBBBBCC"),
  c("reddit", "Reddit", "San Francisco", "established", "Community forums.", "BCBBBCC"),
  c("lyft", "Lyft", "San Francisco", "established", "Ride-hailing.", "CCCBBCC"),
  c("instacart", "Instacart", "San Francisco", "established", "Grocery delivery.", "CCBBBCC"),
  c("salesforce", "Salesforce", "San Francisco", "established", "CRM giant; Slack and Tableau live here too.", "CBCCCSC",
    { gtm: "The classic enterprise sales training ground." }),
  c("adobe", "Adobe", "San Jose", "established", "Photoshop, Acrobat and Firefly.", "CBCBCBC"),
  c("servicenow", "ServiceNow", "Santa Clara", "established", "Enterprise workflow software.", "CCCCCAC"),
  c("workday", "Workday", "Pleasanton", "established", "HR and finance software for enterprises.", "CDCCCBC"),
  c("intuit", "Intuit", "Mountain View", "established", "TurboTax, QuickBooks and Credit Karma.", "CCCCBCC"),
  c("block", "Block", "Oakland", "established", "Square and Cash App.", "CDCBBCC"),
  c("dropbox", "Dropbox", "San Francisco", "established", "File storage and sync.", "CDCBCBC"),
  c("twilio", "Twilio", "San Francisco", "established", "Communication APIs.", "CDCCCBC"),
  c("okta", "Okta", "San Francisco", "established", "Identity and login.", "CDCCCBC"),
  c("samsara", "Samsara", "San Francisco", "established", "IoT for fleets and physical operations.", "CDCCCAC"),
  c("paloaltonetworks", "Palo Alto Networks", "Santa Clara", "established", "Cybersecurity platform.", "CDCDDAC"),
  c("chime", "Chime", "San Francisco", "established", "Consumer banking app.", "CDCBBDC"),
  c("zoom", "Zoom", "San Jose", "established", "Video meetings.", "CDCCCCD"),
  c("paypal", "PayPal", "San Jose", "established", "Online payments and Venmo.", "DDCCCCD"),

  // Legacy & Hardware
  c("amd", "AMD", "Santa Clara", "legacy", "CPUs and GPUs.", "CCDDDDC"),
  c("broadcom", "Broadcom", "Palo Alto", "legacy", "Chips and VMware.", "CCDDDBC"),
  c("intel", "Intel", "Santa Clara", "legacy", "Chips and fabs; the original Silicon Valley giant.", "DCDDDDD"),
  c("cisco", "Cisco", "San Jose", "legacy", "Networking and security hardware.", "DCDDDBD"),
  c("appliedmaterials", "Applied Materials", "Santa Clara", "legacy", "Chipmaking equipment.", "DCDDDCD"),
  c("hp", "HP", "Palo Alto", "legacy", "PCs and printers; the original Silicon Valley garage.", "DDDCDCD"),
  c("ebay", "eBay", "San Jose", "legacy", "Online marketplace.", "DDCCCDD"),
];
