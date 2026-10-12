// Pure functions behind the page. No DOM, no storage — easy to test in Node.

import { TIERS, ROLES, CATEGORIES } from "./data.js";

const TIER_IDS = TIERS.map((t) => t.id);
const ROLE_IDS = ROLES.map((r) => r.id);

export function isTier(id) {
  return TIER_IDS.includes(id);
}

export function isRole(id) {
  return ROLE_IDS.includes(id);
}

// "all" or one of the CATEGORIES ids.
export function isCategory(id) {
  return id === "all" || CATEGORIES.some((cat) => cat.id === id);
}

export function inCategory(company, categoryId) {
  return categoryId === "all" || company.category === categoryId;
}

// Overrides are the visitor's own placements for one role: { companyId: tierId }.
// Only placements that differ from the curated list are kept.
export function tierFor(company, roleId, overrides = {}) {
  return overrides[company.id] ?? company.tiers[roleId];
}

// Group companies into tiers for one role. Order inside a tier follows the data file.
export function buildBoard(companies, roleId, overrides = {}) {
  const board = Object.fromEntries(TIER_IDS.map((t) => [t, []]));
  for (const company of companies) {
    board[tierFor(company, roleId, overrides)].push(company);
  }
  return board;
}

export function moveCompany(overrides, company, roleId, tierId) {
  if (!isTier(tierId)) return overrides;
  const next = { ...overrides };
  if (company.tiers[roleId] === tierId) delete next[company.id];
  else next[company.id] = tierId;
  return next;
}

export function changedCount(overrides) {
  return Object.keys(overrides).length;
}

// Case- and accent-insensitive match on name, city or blurb.
export function matchesQuery(company, query) {
  const q = normalize(query);
  if (!q) return true;
  return [company.name, company.city, company.blurb].some((field) => normalize(field).includes(q));
}

function normalize(s) {
  return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

// Whatever comes out of localStorage may be stale or hand-edited; keep only valid entries
// that still differ from the curated list.
export function sanitizeMyLists(raw, companies) {
  const byId = new Map(companies.map((co) => [co.id, co]));
  const clean = {};
  if (!raw || typeof raw !== "object") return clean;
  for (const roleId of ROLE_IDS) {
    const entries = raw[roleId];
    if (!entries || typeof entries !== "object") continue;
    const roleClean = {};
    for (const [id, tier] of Object.entries(entries)) {
      const co = byId.get(id);
      if (co && isTier(tier) && co.tiers[roleId] !== tier) roleClean[id] = tier;
    }
    if (Object.keys(roleClean).length) clean[roleId] = roleClean;
  }
  return clean;
}

export const DEFAULT_SETTINGS = Object.freeze({
  theme: "system", // system | light | dark
  defaultRole: "overall",
  showCities: true,
  openInMyList: false,
});

export function sanitizeSettings(raw) {
  const s = { ...DEFAULT_SETTINGS };
  if (!raw || typeof raw !== "object") return s;
  if (["system", "light", "dark"].includes(raw.theme)) s.theme = raw.theme;
  if (isRole(raw.defaultRole)) s.defaultRole = raw.defaultRole;
  if (typeof raw.showCities === "boolean") s.showCities = raw.showCities;
  if (typeof raw.openInMyList === "boolean") s.openInMyList = raw.openInMyList;
  return s;
}

// Feedback goes to a prefilled GitHub issue; nothing is sent until the visitor submits it there.
export function feedbackUrl(repo, { kind, message, roleName }) {
  const title = `[${kind}] ${message.split("\n")[0].slice(0, 60)}`;
  const body = `${message}\n\n---\nRole being viewed: ${roleName}`;
  const params = new URLSearchParams({ title, body });
  return `https://github.com/${repo}/issues/new?${params}`;
}
