// Checks the Student OS data layer: JSON files parse and keep their shape,
// CSV headers match what /today expects, and dashboard.html's data block is valid.
import { readFileSync, existsSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const errors = [];
const read = (p) => readFileSync(root + p, "utf8");

const dataFiles = {
  "uni/data/assessments.json": "items",
  "health/data/habits-log.json": "days",
  "health/data/weigh-ins.json": "items",
  "income/data/shifts.json": "items",
  "income/data/applications.json": "items",
  "side-hustle/data/pipeline.json": "steps",
};
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

for (const [path, key] of Object.entries(dataFiles)) {
  let json;
  try { json = JSON.parse(read(path)); } catch (e) { errors.push(`${path}: ${e.message}`); continue; }
  if (!json._meta || typeof json._meta.refreshed_by !== "string") errors.push(`${path}: missing _meta.refreshed_by`);
  if (!Array.isArray(json[key])) { errors.push(`${path}: "${key}" must be an array`); continue; }
  json[key].forEach((row, i) => {
    for (const f of ["date", "due", "deadline"]) {
      if (row[f] && !isoDate.test(row[f])) errors.push(`${path}: ${key}[${i}].${f} is not YYYY-MM-DD`);
    }
  });
}

const apps = JSON.parse(read("income/data/applications.json")).items;
const seen = new Set();
for (const a of apps) {
  const k = `${a.company}|${a.role}`.toLowerCase();
  if (seen.has(k)) errors.push(`applications.json: duplicate company+role "${a.company} / ${a.role}"`);
  seen.add(k);
}

const steps = JSON.parse(read("side-hustle/data/pipeline.json")).steps;
const next = steps.filter((s) => s.status === "next").length;
if (steps.length && next !== 1) errors.push(`pipeline.json: expected exactly one "next" step, found ${next}`);

const csvHeaders = { "health/inputs/weigh-ins.csv": "date,kg", "income/inputs/shifts.csv": "date,start,end,gross,window" };
for (const [path, header] of Object.entries(csvHeaders)) {
  const first = read(path).split(/\r?\n/)[0].trim();
  if (first !== header) errors.push(`${path}: header is "${first}", expected "${header}"`);
}

const html = read("dashboard.html");
const m = html.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/);
if (!m) errors.push("dashboard.html: data block not found");
else {
  try {
    const d = JSON.parse(m[1]);
    for (const k of ["_schema", "date", "habits", "work", "top3"]) if (!(k in d)) errors.push(`dashboard.html: data block missing "${k}"`);
  } catch (e) { errors.push(`dashboard.html: data block is not valid JSON (${e.message})`); }
}

for (const f of ["CLAUDE.md", "TASKS.md", "income/inputs/resume.md"]) if (!existsSync(root + f)) errors.push(`missing ${f}`);
const placeholders = (read("CLAUDE.md").match(/\{\{[^}]+\}\}/g) || []).length;

if (errors.length) { console.error(errors.map((e) => "✗ " + e).join("\n")); process.exit(1); }
console.log(`✓ data layer valid${placeholders ? ` · CLAUDE.md has ${placeholders} placeholders left — run /setup` : ""}`);
