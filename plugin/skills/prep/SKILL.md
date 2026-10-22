---
name: prep
description: "Context pack before a class, a meeting, a recurring commitment, a side-hustle call, or a work shift. Use on /prep, \"prep me for\", \"what do I need for [class/meeting/shift]\"."
---

# /prep [class <code> | meeting <name> | block <name> | call | shift]

Read `CLAUDE.md`, then the owning `{domain}/CLAUDE.md`. Read-only against connectors.

## By type
- **class <code>** → last week's topic (from `uni/inputs/` notes or the outline), what's due
  next for that subject, room + time from Calendar, and 3 warm-up recall questions in the
  subject's assessment style (closed-book if that's the drill mode).
- **meeting <name>** → the Calendar event, attendees, related email threads (14 days),
  open items in `TASKS.md` mentioning it, any money or decision items in the threads.
- **block <name>** → for a protected block (volunteering, a group you run, family time):
  notes from last time (`inputs/` or the task tool), one suggestion for this session, and
  which class or shift it displaces and how that gets caught up.
- **call** → side-hustle: the `next` step in `pipeline.json`, spend so far, and the 3
  questions to ask before paying for anything else.
- **shift** → the work window from `CLAUDE.md`, expected $/h for that window from
  `shifts.json`, weather, local events likely to spike demand (search), and which habit's
  Floor version fits into breaks.

## Output
`{domain}/outputs/prep-{type}-{YYYY-MM-DD}.md` plus a ≤15-line summary in chat.
No padding. If there's nothing on file for last time, say so in one line and continue.
