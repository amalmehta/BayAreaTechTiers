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
  { id: "swe", name: "Software Engineering", short: "Engineering" },
  { id: "ml", name: "ML & AI Research", short: "ML & AI" },
  { id: "pm", name: "Product Management", short: "Product" },
  { id: "design", name: "Design", short: "Design" },
  { id: "ds", name: "Data Science", short: "Data" },
  { id: "gtm", name: "Sales & Go-to-Market", short: "Sales" },
];

// Shorthand: tiers are listed in ROLES order — swe, ml, pm, design, ds, gtm.
function c(id, name, city, blurb, tiers, notes = {}) {
  const [swe, ml, pm, design, ds, gtm] = tiers.split("");
  return { id, name, city, blurb, tiers: { swe, ml, pm, design, ds, gtm }, notes };
}

export const COMPANIES = [
  c("openai", "OpenAI", "San Francisco", "Maker of ChatGPT and the GPT models.", "SSSAAS",
    { ml: "The frontier lab most people name first." }),
  c("anthropic", "Anthropic", "San Francisco", "Maker of the Claude models; safety-focused frontier lab.", "SSSAAS",
    { ml: "Frontier lab with a deep interpretability and alignment bench." }),
  c("google", "Google", "Mountain View", "Search, Android, Cloud, YouTube and Google DeepMind.", "ASAAAB",
    { ml: "Includes Google DeepMind and Google Research.", gtm: "Mostly Google Cloud sales." }),
  c("meta", "Meta", "Menlo Park", "Facebook, Instagram, WhatsApp and Meta Superintelligence Labs.", "AAAASB",
    { ds: "Product analytics at Meta's scale is the reference point for the field." }),
  c("apple", "Apple", "Cupertino", "iPhone, Mac and Apple silicon.", "ABASBC",
    { design: "The design brand in consumer hardware and software." }),
  c("nvidia", "Nvidia", "Santa Clara", "GPUs, CUDA and the hardware behind the AI boom.", "SABCBA"),
  c("netflix", "Netflix", "Los Gatos", "Streaming; known for senior-only, top-of-market pay.", "ABABSD",
    { swe: "High bar and high pay, with a small, senior team." }),
  c("stripe", "Stripe", "South San Francisco", "Payments infrastructure for the internet.", "SCSAAS",
    { pm: "Famous for writing culture and craft-focused PMs." }),
  c("databricks", "Databricks", "San Francisco", "Data and AI platform; home of Spark and Mosaic AI.", "SAACAS",
    { gtm: "One of the most sought-after enterprise sales orgs." }),
  c("airbnb", "Airbnb", "San Francisco", "Travel marketplace with a design-led culture.", "ACSSSC"),
  c("uber", "Uber", "San Francisco", "Rides and delivery at global scale.", "BBABAC"),
  c("lyft", "Lyft", "San Francisco", "Ride-hailing.", "CCCBBC"),
  c("figma", "Figma", "San Francisco", "Collaborative design tool.", "ACSSBA",
    { design: "Designers building tools for designers." }),
  c("salesforce", "Salesforce", "San Francisco", "CRM giant; Slack and Tableau live here too.", "CBCCCS",
    { gtm: "The classic enterprise sales training ground." }),
  c("linkedin", "LinkedIn", "Sunnyvale", "Professional network, owned by Microsoft.", "BBBCAB"),
  c("pinterest", "Pinterest", "San Francisco", "Visual discovery and shopping.", "BBBBBC"),
  c("doordash", "DoorDash", "San Francisco", "Local delivery marketplace.", "BCBBAC"),
  c("instacart", "Instacart", "San Francisco", "Grocery delivery.", "CCBBBC"),
  c("coinbase", "Coinbase", "San Francisco", "Crypto exchange (remote-first, SF roots).", "BCBBBB"),
  c("robinhood", "Robinhood", "Menlo Park", "Consumer investing app.", "BCBBBD"),
  c("plaid", "Plaid", "San Francisco", "Bank-data APIs behind most fintech apps.", "BDBBBB"),
  c("scaleai", "Scale AI", "San Francisco", "Data labeling and evaluation for AI labs.", "BBBCBA"),
  c("waymo", "Waymo", "Mountain View", "Self-driving cars from Alphabet.", "AABBBC"),
  c("xai", "xAI", "Palo Alto", "Maker of the Grok models.", "AABCCC"),
  c("perplexity", "Perplexity", "San Francisco", "AI answer engine.", "ABABBB"),
  c("intel", "Intel", "Santa Clara", "Chips and fabs; the original Silicon Valley giant.", "DCDDDD"),
  c("amd", "AMD", "Santa Clara", "CPUs and GPUs.", "CCDDDD"),
  c("cisco", "Cisco", "San Jose", "Networking and security hardware.", "DCDDDB"),
  c("adobe", "Adobe", "San Jose", "Photoshop, Acrobat and Firefly.", "CBCBCB"),
  c("dropbox", "Dropbox", "San Francisco", "File storage and sync.", "CDCBCB"),
  c("notion", "Notion", "San Francisco", "Docs, wikis and AI workspace.", "BCAABA"),
  c("rippling", "Rippling", "San Francisco", "HR, IT and payroll platform.", "BDBBBA"),
  c("reddit", "Reddit", "San Francisco", "Community forums.", "BCBBBC"),
  c("discord", "Discord", "San Francisco", "Chat for communities and gamers.", "BDBBBD"),
  c("servicenow", "ServiceNow", "Santa Clara", "Enterprise workflow software.", "CCCCCA"),
  c("workday", "Workday", "Pleasanton", "HR and finance software for enterprises.", "CDCCCB"),
  c("block", "Block", "Oakland", "Square and Cash App.", "CDCBBC"),
  c("paypal", "PayPal", "San Jose", "Online payments and Venmo.", "DDCCCC"),
  c("intuit", "Intuit", "Mountain View", "TurboTax, QuickBooks and Credit Karma.", "CCCCBC"),
  c("vercel", "Vercel", "San Francisco", "Frontend cloud; maker of Next.js.", "BDBACA"),
  c("cloudflare", "Cloudflare", "San Francisco", "Network, security and edge compute.", "BDBCCA"),
  c("twilio", "Twilio", "San Francisco", "Communication APIs.", "CDCCCB"),
  c("okta", "Okta", "San Francisco", "Identity and login.", "CDCCCB"),
  c("glean", "Glean", "Palo Alto", "AI search for company knowledge.", "BBBBCA"),
];
