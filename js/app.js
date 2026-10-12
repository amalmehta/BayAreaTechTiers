// Wires the data and logic to the page.

import { AS_OF, TIERS, ROLES, CATEGORIES, COMPANIES } from "./data.js";
import {
  buildBoard, moveCompany, changedCount, matchesQuery, tierFor, inCategory,
  sanitizeMyLists, sanitizeSettings, feedbackUrl,
} from "./logic.js";

const REPO = "amalmehta/BayAreaTechTiers";
const KEYS = { settings: "bayAreaTechTiers.settings", myLists: "bayAreaTechTiers.myLists" };

const $ = (id) => document.getElementById(id);
const byId = new Map(COMPANIES.map((co) => [co.id, co]));

// ---- Storage (never required for the page to work) ----
function load(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
}

// ---- State ----
const settings = sanitizeSettings(load(KEYS.settings));
const state = {
  roleId: settings.defaultRole,
  mode: settings.openInMyList ? "mine" : "curated",
  query: "",
  category: "all",
  myLists: sanitizeMyLists(load(KEYS.myLists), COMPANIES),
  openId: null,
};

const role = () => ROLES.find((r) => r.id === state.roleId);
const overrides = () => (state.mode === "mine" ? state.myLists[state.roleId] || {} : {});

function setOverrides(next) {
  if (changedCount(next)) state.myLists[state.roleId] = next;
  else delete state.myLists[state.roleId];
  save(KEYS.myLists, state.myLists);
}

// ---- Helpers ----
function monogram(name) {
  const words = name.split(/\s+/);
  return words.length > 1 ? words[0][0] + words[1][0] : name[0].toUpperCase() + name[1];
}
function hue(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "style") node.style.cssText = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}
function monoEl(company, big = false) {
  return el("span", { class: big ? "mono big" : "mono", style: `--hue:${hue(company.name)}`, "aria-hidden": "true" },
    monogram(company.name));
}
const tierStyle = (t) => `--tier-color: var(--tier-${t})`;

// ---- Render ----
function renderRoles() {
  const nav = $("roles");
  nav.replaceChildren(...ROLES.map((r) => el("button", {
    role: "tab",
    "aria-selected": String(r.id === state.roleId),
    onclick: () => { state.roleId = r.id; render(); },
  }, r.name)));
}

function renderCategories() {
  const all = { id: "all", name: "All", meaning: "Every company on the list" };
  $("categories").replaceChildren(...[all, ...CATEGORIES].map((cat) => {
    const count = COMPANIES.filter((co) => inCategory(co, cat.id)).length;
    return el("button", {
      "aria-pressed": String(cat.id === state.category),
      title: cat.meaning,
      onclick: () => { state.category = cat.id; render(); },
    }, cat.name, el("span", { class: "count" }, String(count)));
  }));
  const cat = CATEGORIES.find((x) => x.id === state.category);
  $("category-hint").textContent = cat ? `${cat.name}: ${cat.meaning}.` : "";
  $("category-hint").hidden = !cat;
}

function renderBoard() {
  const ov = overrides();
  const shown = COMPANIES.filter((co) => inCategory(co, state.category));
  const board = buildBoard(shown, state.roleId, ov);
  const mine = state.mode === "mine";

  const rows = TIERS.map((tier) => {
    const chips = board[tier.id].map((co) => {
      const chip = el("button", {
        class: "chip" + (ov[co.id] ? " moved" : "") + (matchesQuery(co, state.query) ? "" : " dim"),
        "data-id": co.id,
        "aria-label": `${co.name}, ${co.city}`,
        title: co.blurb,
        onclick: () => openDetail(co.id),
      }, monoEl(co), el("span", {}, el("span", { class: "name" }, co.name), el("span", { class: "city" }, co.city)));
      if (mine) {
        chip.draggable = true;
        chip.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", co.id);
          e.dataTransfer.effectAllowed = "move";
          chip.classList.add("dragging");
        });
        chip.addEventListener("dragend", () => chip.classList.remove("dragging"));
      }
      return chip;
    });

    const row = el("section", { class: "row", "aria-label": `Tier ${tier.label}` },
      el("div", { class: "tier-label", style: tierStyle(tier.id), title: tier.meaning },
        el("b", {}, tier.label), el("span", {}, tier.meaning.split(" — ")[0])),
      el("div", { class: "chips" }, ...(chips.length ? chips : [el("span", { class: "empty" }, "—")])));

    if (mine) {
      row.addEventListener("dragover", (e) => { e.preventDefault(); row.classList.add("drop-target"); });
      row.addEventListener("dragleave", () => row.classList.remove("drop-target"));
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        row.classList.remove("drop-target");
        const co = byId.get(e.dataTransfer.getData("text/plain"));
        if (co) { setOverrides(moveCompany(ov, co, state.roleId, tier.id)); render(); }
      });
    }
    return row;
  });
  $("board").replaceChildren(...rows);
}

function renderToolbar() {
  const mine = state.mode === "mine";
  $("mode-curated").classList.toggle("on", !mine);
  $("mode-curated").setAttribute("aria-pressed", String(!mine));
  $("mode-mine").classList.toggle("on", mine);
  $("mode-mine").setAttribute("aria-pressed", String(mine));
  $("mine-hint").hidden = !mine;
  const n = changedCount(state.myLists[state.roleId] || {});
  $("mine-count").textContent = n ? `${n} moved from the curated list.` : "";
  $("reset-role").hidden = !n;
}

function applySettings() {
  if (settings.theme === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.dataset.theme = settings.theme;
  document.body.classList.toggle("hide-cities", !settings.showCities);
}

function render() {
  renderRoles();
  renderCategories();
  renderToolbar();
  renderBoard();
  if (state.openId && $("detail").open) fillDetail(state.openId);
}

// ---- Company detail ----
function fillDetail(id) {
  const co = byId.get(id);
  const ov = overrides();
  const current = tierFor(co, state.roleId, ov);
  $("detail-mono").replaceWith(Object.assign(monoEl(co, true), { id: "detail-mono" }));
  $("detail-name").textContent = co.name;
  $("detail-city").textContent = `${co.city} · ${CATEGORIES.find((x) => x.id === co.category).name}`;
  $("detail-blurb").textContent = co.blurb;
  const note = co.notes[state.roleId];
  $("detail-note").hidden = !note;
  $("detail-note").textContent = note ? `${role().name}: ${note}` : "";

  const mine = state.mode === "mine";
  $("detail-move").hidden = !mine;
  if (mine) {
    $("detail-move-row").replaceChildren(...TIERS.map((t) => el("button", {
      style: tierStyle(t.id),
      "aria-pressed": String(t.id === current),
      "aria-label": `Move to tier ${t.label}`,
      onclick: () => { setOverrides(moveCompany(ov, co, state.roleId, t.id)); render(); },
    }, t.label)));
  }

  $("detail-roles").replaceChildren(...ROLES.map((r) => {
    const t = tierFor(co, r.id, state.mode === "mine" ? state.myLists[r.id] || {} : {});
    return el("tr", { class: r.id === state.roleId ? "current" : "" },
      el("td", {}, r.name),
      el("td", {}, el("span", { class: "badge", style: tierStyle(t) }, t)));
  }));
}

function openDetail(id) {
  state.openId = id;
  fillDetail(id);
  if (!$("detail").open) $("detail").showModal();
}

// ---- Settings ----
function openSettings() {
  $("set-theme").value = settings.theme;
  $("set-role").value = settings.defaultRole;
  $("set-cities").checked = settings.showCities;
  $("set-mine").checked = settings.openInMyList;
  if (!$("settings").open) $("settings").showModal();
}
function updateSetting(key, value) {
  settings[key] = value;
  save(KEYS.settings, settings);
  applySettings();
}

// ---- Wire up ----
function init() {
  $("asof").textContent = `As of ${AS_OF}.`;
  $("set-role").replaceChildren(...ROLES.map((r) => el("option", { value: r.id }, r.name)));

  $("search").addEventListener("input", (e) => { state.query = e.target.value; renderBoard(); });
  $("mode-curated").addEventListener("click", () => { state.mode = "curated"; render(); });
  $("mode-mine").addEventListener("click", () => { state.mode = "mine"; render(); });
  $("reset-role").addEventListener("click", () => { setOverrides({}); render(); });

  $("settings-btn").addEventListener("click", openSettings);
  $("set-theme").addEventListener("change", (e) => updateSetting("theme", e.target.value));
  $("set-role").addEventListener("change", (e) => updateSetting("defaultRole", e.target.value));
  $("set-cities").addEventListener("change", (e) => updateSetting("showCities", e.target.checked));
  $("set-mine").addEventListener("change", (e) => updateSetting("openInMyList", e.target.checked));
  $("reset-all").addEventListener("click", () => {
    if (!confirm("Reset your lists for every role back to the curated tiers?")) return;
    state.myLists = {};
    save(KEYS.myLists, state.myLists);
    render();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === ",") { e.preventDefault(); openSettings(); }
  });

  $("feedback-btn").addEventListener("click", () => $("feedback").showModal());
  $("feedback-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const message = $("fb-message").value.trim();
    if (!message) return;
    window.open(feedbackUrl(REPO, { kind: $("fb-kind").value, message, roleName: role().name }), "_blank", "noopener");
    $("fb-message").value = "";
    $("feedback").close();
  });

  // Click on the backdrop closes a dialog.
  for (const d of document.querySelectorAll("dialog")) {
    d.addEventListener("click", (e) => {
      if (e.target !== d) return;
      const r = d.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) d.close();
    });
  }

  applySettings();
  render();
}

init();
