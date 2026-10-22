# Student OS (Cowork plugin)

The skills half of Student OS. Install this, then point Cowork at your Student OS
folder — the one holding `CLAUDE.md`, `TASKS.md`, `dashboard.html` and the domain
folders (`uni/`, `health/`, `income/`, `side-hustle/`).

## Install
```
/plugin install student-os --marketplace ErfanK-9/student-os
```

## Skills

| Call | What it does |
|---|---|
| `student-os:setup` | First run. A 15-minute interview that writes your `CLAUDE.md`. |
| `student-os:today` | Morning brief + `dashboard.html` refresh. |
| `student-os:week` | Weekly review and next-week plan around your protected blocks. |
| `student-os:prep` | Context pack before a class, meeting, call or shift. |
| `student-os:study` | Active-recall drill in the mode each subject needs. |
| `student-os:apply` | Tailored resume bullets + cover letter, logged. |
| `student-os:research` | Fixed frameworks: company / program / tool / topic / niche. |
| `student-os:coach` | Builds a coach skill for any domain you're improving at. |

## Order of operations
1. Connect your Student OS folder in Cowork.
2. Run `student-os:setup`. Nothing else works until `CLAUDE.md` has no `{{placeholders}}` left.
3. Run `student-os:today`. Open `dashboard.html` in a browser.
4. Optional: schedule `today` for early morning and `week` for your planning slot.

## Notes
- Every skill reads `CLAUDE.md` first and is read-only against your connectors unless
  you approve a specific write.
- A calendar connector makes `today` and `week` much better. Everything else is plain files.
