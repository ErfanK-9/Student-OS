// Turns dashboard.html into the page published as a private Claude artifact.
// The artifact host supplies its own <!doctype>/<html>/<head>/<body>, so this keeps
// the <title>, meta tag and <style> from the head and everything inside <body>.
// Usage: node scripts/artifact-page.mjs [outfile]   (default: .artifact/dashboard.html)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = process.argv[2] || root + ".artifact/dashboard.html";
const html = readFileSync(root + "dashboard.html", "utf8");

const pick = (re, what) => {
  const m = html.match(re);
  if (!m) { console.error(`dashboard.html: ${what} not found`); process.exit(1); }
  return m[1] ?? m[0];
};
const title = pick(/<title>[\s\S]*?<\/title>/, "<title>");
const meta = pick(/<meta name="claude:viewport-fit-sides"[^>]*>/, "viewport-fit-sides meta");
const style = pick(/<style>[\s\S]*?<\/style>/, "<style>");
const body = pick(/<body>([\s\S]*)<\/body>/, "<body>");

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, [title, meta, style, body.trim()].join("\n") + "\n");
console.log(`✓ wrote ${out}`);
