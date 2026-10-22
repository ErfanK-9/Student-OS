# Student OS

A folder-based operating system for a university student who also works. Claude skills
read and write plain files here: a morning brief, a weekly reset, study drills,
job applications, research and coaching.

## Layout
| Path | What it holds |
|---|---|
| `CLAUDE.md` | Who you are, protected blocks, rhythm, voice. Filled in by `/setup`. |
| `TASKS.md` | Dated tasks: `- [ ] YYYY-MM-DD · domain · task` |
| `dashboard.html` | Open in a browser. `/today` rewrites only its JSON data block. |
| `briefs/` | `today.md`, weekly plans, and `archive/` |
| `uni/` `health/` `income/` `side-hustle/` | One domain each: `CLAUDE.md` config, `inputs/` (yours), `data/` (JSON), `outputs/` (generated) |
| `memory/` | Durable notes: weak topics, research verdicts |
| `plugin/` | The skills: setup, today, week, prep, study, apply, research, coach |
| `.claude/`, `.claude-flow/` | Ruflo tooling (agents, hooks, swarm config). Its instructions are in `.claude/CLAUDE.md`. |

## Getting started
0. Install the skills (skip if the plugin is already synced to your claude.ai account):
   `/plugin install student-os --marketplace ErfanK-9/student-os`
1. Run `/setup` and answer the five short rounds of questions. Nothing else works until `CLAUDE.md` has no `{{placeholders}}` left.
2. Paste your resume into `income/inputs/resume.md` and fill the evidence bank in `income/CLAUDE.md`. `/apply` uses only those.
3. Run `/today` each morning and `/week` on your planning day. Everything else is on demand.

## Checks
`npm test` validates the data layer: the JSON files parse and keep their shape, dates are `YYYY-MM-DD`,
applications aren't duplicated, the side-hustle pipeline has one `next` step, the CSV headers are
correct, and the dashboard's data block is valid JSON. It also reports how many placeholders are left.

## Privacy
Once `/setup` runs, this folder holds your schedule, grades, pay and applications.
Keep the repository **private** before committing personal data.
