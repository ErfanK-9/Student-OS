---
name: setup
description: "First-run setup for Student OS. Interviews the user in short rounds and writes CLAUDE.md, the domain configs, and empty data files so /today, /week, /prep, /study, /apply and /research work from day one. Use on /setup, \"set up student os\", \"get me started\", or when any other skill finds {{placeholders}} still in CLAUDE.md."
---

# /setup — first run (15–20 minutes)

You are configuring a personal operating system for a university student who also
works. The output is a filled-in `CLAUDE.md` plus one `{domain}/CLAUDE.md` per domain
they use. Nothing else in the pack works until this is done, so be efficient and
don't over-ask.

## Before you start
1. Check `CLAUDE.md` for `{{` placeholders. If none remain, tell the user setup is
   already done and offer to change a specific section instead.
2. Check which connectors are actually available in this session (Calendar, Notion,
   Gmail, Drive). Record what you find — don't ask the user what they have.

## Interview — five rounds, 2–4 questions each
Ask a round, wait, write that section, move on. Never dump all questions at once.
Use tappable options where the answers are a small set.

**Round 1 — who you are.** Name, uni + degree + majors, current semester, what paid
work you do, what roles you're aiming for after uni. Optional: a side venture.

**Round 2 — the shape of your week.** Ask for the 2–4 blocks that must never be
scheduled over (a faith commitment, a volunteering slot, family time, a fixed class).
For each: day, time, does it beat paid work? Then: when do you earn the most, and
when do you want to be asleep?

**Round 3 — subjects.** For each subject: code, name, target grade, how it's
assessed (closed-book quiz / coding / case-based / calculation), and one known weak
spot. If they have subject outlines, ask them to drop the files into `uni/inputs/`.

**Round 4 — habits and health.** Up to 3 non-negotiables for every morning. Then
core habits (the ones that define a good day) and micro habits (small, stackable).
Where they track them today. Whether they track weight or training — if not, leave
those lines blank; never push tracking they didn't ask for.

**Round 5 — how you want to be spoken to.** One line. Offer options: "direct,
numbers first" / "warm but brief" / "explain the why". Then read it back.

## Write
- Replace every `{{placeholder}}` in `CLAUDE.md` and each domain `CLAUDE.md`.
  Delete the HTML comments once filled. Uncheck domains they don't use.
- Leave the `data/*.json` sample files in place but set `_meta.refreshed_by` to
  `"setup"` and empty the `items`/`days` arrays so the first `/today` starts clean.
- Add `TASKS.md` line: `- [ ] {tomorrow} · system · run /today for the first time`.
- Tell them the two commands that matter now: `/today` each morning, `/week` on
  their planning day. Everything else is on demand.

## Rules
- Don't file health conditions, medication, finances, or anything about a third party
  into config. If they volunteer it, keep it in conversation and leave it out of files.
- If they say "just use defaults", use these: wake 6–7, sunlight, 10-min walk;
  planning block Sunday afternoon; wind-down 2h before bed; 8h sleep. Say you did.
- Write files as you go so a dropped session loses at most one round.
