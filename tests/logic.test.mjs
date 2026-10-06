import { test } from "node:test";
import assert from "node:assert/strict";
import { COMPANIES, TIERS } from "../js/data.js";
import {
  buildBoard, moveCompany, changedCount, matchesQuery, tierFor,
  sanitizeMyLists, sanitizeSettings, DEFAULT_SETTINGS, feedbackUrl,
} from "../js/logic.js";

const stripe = COMPANIES.find((c) => c.id === "stripe");
const intel = COMPANIES.find((c) => c.id === "intel");

test("buildBoard places every company exactly once", () => {
  const board = buildBoard(COMPANIES, "swe");
  assert.deepEqual(Object.keys(board), TIERS.map((t) => t.id));
  const placed = Object.values(board).flat();
  assert.equal(placed.length, COMPANIES.length);
  assert.ok(board.S.includes(stripe));
  assert.ok(board.D.includes(intel));
});

test("overrides move a company without touching others", () => {
  const board = buildBoard(COMPANIES, "swe", { intel: "S" });
  assert.ok(board.S.includes(intel));
  assert.ok(!board.D.includes(intel));
  assert.equal(Object.values(board).flat().length, COMPANIES.length);
});

test("moveCompany records changes and drops moves back to the curated tier", () => {
  let ov = moveCompany({}, intel, "swe", "A");
  assert.deepEqual(ov, { intel: "A" });
  assert.equal(tierFor(intel, "swe", ov), "A");
  assert.equal(changedCount(ov), 1);
  ov = moveCompany(ov, intel, "swe", "D");
  assert.deepEqual(ov, {});
});

test("moveCompany ignores unknown tiers and does not mutate input", () => {
  const ov = Object.freeze({ intel: "A" });
  assert.equal(moveCompany(ov, intel, "swe", "Z"), ov);
  assert.deepEqual(moveCompany(ov, stripe, "swe", "B"), { intel: "A", stripe: "B" });
});

test("matchesQuery matches name, city and blurb, ignoring case and accents", () => {
  assert.ok(matchesQuery(stripe, "STRI"));
  assert.ok(matchesQuery(stripe, "south san"));
  assert.ok(matchesQuery(stripe, "paymënts"));
  assert.ok(matchesQuery(stripe, "   "));
  assert.ok(!matchesQuery(stripe, "cupertino"));
});

test("sanitizeMyLists drops junk, unknown ids, bad tiers and no-op entries", () => {
  assert.deepEqual(sanitizeMyLists(null, COMPANIES), {});
  assert.deepEqual(sanitizeMyLists("x", COMPANIES), {});
  const clean = sanitizeMyLists({
    swe: { intel: "A", stripe: "S", nope: "B", figma: "Q" },
    ml: "garbage",
    madeUpRole: { intel: "S" },
  }, COMPANIES);
  assert.deepEqual(clean, { swe: { intel: "A" } });
});

test("sanitizeSettings keeps valid values and falls back to defaults", () => {
  assert.deepEqual(sanitizeSettings(undefined), DEFAULT_SETTINGS);
  assert.deepEqual(
    sanitizeSettings({ theme: "dark", defaultRole: "pm", showCities: false, openInMyList: "yes" }),
    { ...DEFAULT_SETTINGS, theme: "dark", defaultRole: "pm", showCities: false },
  );
  assert.equal(sanitizeSettings({ theme: "neon", defaultRole: "ceo" }).theme, "system");
});

test("feedbackUrl builds a prefilled GitHub issue link", () => {
  const url = new URL(feedbackUrl("me/Repo", { kind: "Bug", message: "Broken chip\nmore detail", roleName: "Design" }));
  assert.equal(url.origin + url.pathname, "https://github.com/me/Repo/issues/new");
  assert.equal(url.searchParams.get("title"), "[Bug] Broken chip");
  assert.match(url.searchParams.get("body"), /more detail[\s\S]*Role being viewed: Design/);
});
