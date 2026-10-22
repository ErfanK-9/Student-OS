---
name: week
description: "Weekly reset — review last week's habits, earnings, uni and side-hustle numbers, refresh the data files, and plan next week around the owner's protected blocks. Use on /week, \"weekly reset\", \"plan my week\", or as a scheduled task on the owner's planning day."
---

# /week — weekly reset (fits in 60 minutes)

Read `CLAUDE.md` and every ticked `{domain}/CLAUDE.md`. Lead with numbers; keep prose short.

## Part 1 — Review (last Mon–Sun)
1. **Habits** → `health/data/habits-log.json`. Core % and Micro % for the week, a per-day
   sparkline (`▇▅▇▂▇▇▃`), habits under 50%, and whether the non-negotiables held every
   day. A Floor completion counts. **Never suggest cutting the list.**
2. **Body** (only if tracked) → 7-day avg vs previous week; training sessions vs target.
3. **Income** → `income/inputs/shifts.csv` → `shifts.json`. Hours, gross, $/h by window.
   Answer the config question directly: did the stated best window actually earn the most? Yes/no, with numbers.
4. **Uni** → refresh `uni/data/assessments.json` from `uni/inputs/` and uni emails.
   Marks received, anything due in 14 days, drills run (count `uni/outputs/drill-*`).
5. **Side hustle** (if ticked) → `pipeline.json`. Steps done; spend vs revenue to date.
   If spend rose and revenue didn't, say so in one sentence.
6. **Applications** → refresh `applications.json` from email. Deadlines in 14 days.
7. **TASKS.md** → move completed to Done; flag anything open for more than 2 weeks.

## Part 2 — Plan (next Mon–Sun)
- Re-read Calendar for next week. Don't trust the timetable table in `uni/CLAUDE.md`.
- Hard constraints come from the **Protected blocks** table, wind-down and sleep target in `CLAUDE.md`.
- Propose, with times: which mornings get the early work window; 3 study blocks with
  subjects (weight toward the lowest-tracking target grade); training days; one side-hustle
  block; one application block; walks if steps are tracked.
- Write `briefs/week-{Monday's date}.md`. Add next week's dated tasks to `TASKS.md`.
- **Ask before creating any Calendar events.** Create only the blocks the owner approves.

## Part 3 — Memory
Anything durable (schedule change, a grade, a preference) → `memory/`. If the shape of
the week changed, add a line to the change log in `CLAUDE.md`.
