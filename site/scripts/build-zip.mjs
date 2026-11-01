// Builds private/student-os.zip — the file buyers download — straight from the repo,
// so the zip always matches the current plugin/ and folder template.
// Ships a whitelist only: no Ruflo tooling (.claude/, .claude-flow/, .mcp.json), no site/.
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { zipSync, strToU8 } from "fflate";

const repo = new URL("../..", import.meta.url).pathname;
const out = new URL("../private/", import.meta.url).pathname;

const SHIP = [
  "README.md",
  "CLAUDE.md",
  "dashboard.html",
  "package.json",
  ".claude-plugin",
  "plugin",
  "scripts/validate.mjs",
  "scripts/artifact-page.mjs",
  "uni",
  "health",
  "income",
  "side-hustle",
  "briefs",
];

// Owner-specific lines that must not reach buyers
const SCRUB = {
  "CLAUDE.md": [
    [/^- \*\*Dashboard artifact.*$/m, "- **Dashboard artifact (private, phone view):** none yet. Paste an artifact URL here and /today republishes it."],
  ],
};

const INSTALL = `# Installing Student OS

1. Unzip this folder somewhere you'll keep it, e.g. Documents/student-os.
2. Install the skills. In Claude Code, from inside this folder:
   /plugin marketplace add ./
   /plugin install student-os@student-os
3. Open the folder in Claude and run /setup. It interviews you in short rounds and
   fills in CLAUDE.md. Nothing else works until that's done.
4. Run /today each morning and /week on your planning day.

Keep this folder private. After /setup it holds your schedule, grades and pay.
Problems? Email the address on the receipt page.
`;

const files = {};
function add(rel) {
  const abs = join(repo, rel);
  if (!existsSync(abs)) throw new Error(`build-zip: missing ${rel}`);
  if (statSync(abs).isDirectory()) {
    for (const name of readdirSync(abs)) add(relative(repo, join(abs, name)));
    return;
  }
  let text = readFileSync(abs);
  for (const [re, rep] of SCRUB[rel] ?? []) {
    const s = text.toString("utf8");
    if (!re.test(s)) throw new Error(`build-zip: scrub rule for ${rel} no longer matches`);
    text = Buffer.from(s.replace(re, rep));
  }
  files[`student-os/${rel}`] = new Uint8Array(text);
}

SHIP.forEach(add);
files["student-os/INSTALL.md"] = strToU8(INSTALL);

mkdirSync(out, { recursive: true });
const zip = zipSync(files, { level: 9 });
writeFileSync(join(out, "student-os.zip"), zip);
console.log(`build-zip: ${Object.keys(files).length} files, ${(zip.length / 1024).toFixed(1)} KB → private/student-os.zip`);
