---
name: today
description: "Morning brief + dashboard refresh. Reads Calendar, the task tool, and the data files under uni/ health/ income/ side-hustle/, writes briefs/today.md and regenerates dashboard.html. Use on /today, \"morning brief\", \"what's on today\", or as a scheduled early-morning task."
---

# /today — morning brief

Read `CLAUDE.md` first. If it still has `{{placeholders}}`, stop and run `/setup`.
Everything here is read-only against connectors — never create or edit Calendar,
Notion, or email items from this skill.

## Steps
1. **Archive.** If `briefs/today.md` exists, move it to `briefs/archive/brief-{its date}.md`.
2. **Gather** (skip any domain unticked in CLAUDE.md; say which sections are stale if a connector is down):
   - Calendar: today + tomorrow, in the owner's timezone. Mark protected blocks 🔒.
   - Task tool: items due today or overdue, not done.
   - Habits: yesterday's completions → append to `health/data/habits-log.json` (dedupe by date). Compute Core % and Micro %.
   - `health/inputs/weigh-ins.csv` → `health/data/weigh-ins.json` (7-day avg, Δ vs previous 7 days). Skip if the file is empty.
   - `income/inputs/shifts.csv` → `income/data/shifts.json` (last 7 days, $/h by window).
   - `uni/data/assessments.json` — due within 7 days.
   - `income/data/applications.json` — deadlines within 7 days.
   - `side-hustle/data/pipeline.json` — the step marked `next`.
   - `TASKS.md` — open items dated today or earlier.
3. **Write `briefs/today.md`** in exactly this shape, under 40 lines:

```
# Brief — {Day D Mon YYYY}

**Work window:** {window} ✅ / ❌ ({why})
**Non-negotiables:** {from CLAUDE.md, as a checklist}

## Today
- {time} {event} ({room}) … chronological, 🔒 on protected blocks

## Due / overdue
- {soonest first: tasks, assessments, applications}

## Yesterday
- Habits: Core {n}/{N} · Micro {n}/{N} · missed: {list}
- Weight 7d avg: {x} ({Δ})      ← omit line if not tracked
- Work: ${x}/h over {h}h        ← omit if no shifts logged

## Top 3 for today
1. {pick from Due, TASKS.md, and the grade target — say why in ≤10 words}

## One thing to set up tonight
- {the single action that makes tomorrow morning automatic}
```

4. **Regenerate `dashboard.html`.** Replace only the JSON inside
   `<script id="data" type="application/json">…</script>` with the fresh values.
   The schema is documented at the top of that script block. Don't touch the markup.
5. Set `_meta.last_refreshed` in every data file you touched.

## Rules
- Numbers over prose. If a habit percentage dropped, say the number; don't editorialise.
- The "Top 3" must be doable today. Not "work on assignment" — "write the method section".
- If the owner's voice line says direct, the brief is direct.
