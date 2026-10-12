import { test } from "node:test";
import assert from "node:assert/strict";
import { TIERS, ROLES, CATEGORIES, COMPANIES } from "../js/data.js";

const tierIds = TIERS.map((t) => t.id);

test("company ids and names are unique", () => {
  assert.equal(new Set(COMPANIES.map((c) => c.id)).size, COMPANIES.length);
  assert.equal(new Set(COMPANIES.map((c) => c.name)).size, COMPANIES.length);
});

test("every company has a valid tier for every role", () => {
  for (const co of COMPANIES) {
    for (const r of ROLES) {
      assert.ok(tierIds.includes(co.tiers[r.id]), `${co.name} / ${r.id}: ${co.tiers[r.id]}`);
    }
    assert.deepEqual(Object.keys(co.tiers).sort(), ROLES.map((r) => r.id).sort(), co.name);
  }
});

test("notes only reference real roles", () => {
  for (const co of COMPANIES) {
    for (const key of Object.keys(co.notes)) assert.ok(ROLES.some((r) => r.id === key), `${co.name} note ${key}`);
  }
});

test("every company has a city and a blurb", () => {
  for (const co of COMPANIES) {
    assert.ok(co.city && co.blurb, co.name);
  }
});

test("each role uses the top and bottom tiers and keeps S selective", () => {
  for (const r of ROLES) {
    const counts = Object.fromEntries(tierIds.map((t) => [t, 0]));
    for (const co of COMPANIES) counts[co.tiers[r.id]]++;
    assert.ok(counts.S >= 3, `${r.id} has ${counts.S} in S`);
    assert.ok(counts.S <= 6, `${r.id} has ${counts.S} in S`);
    assert.ok(counts.D >= 1, `${r.id} has nothing in D`);
  }
});

test("every company has a known category, and every category has companies", () => {
  const ids = CATEGORIES.map((cat) => cat.id);
  for (const co of COMPANIES) assert.ok(ids.includes(co.category), `${co.name}: ${co.category}`);
  for (const id of ids) assert.ok(COMPANIES.some((co) => co.category === id), `${id} is empty`);
});

test("Overall is a role with its own curated tiers", () => {
  assert.equal(ROLES[0].id, "overall");
  assert.equal(COMPANIES.find((c) => c.id === "openai").tiers.overall, "S");
});
