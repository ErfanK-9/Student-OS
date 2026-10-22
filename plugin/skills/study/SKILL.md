---
name: study
description: "Active-recall study session for one subject, in the drill mode set for that subject in uni/CLAUDE.md (closed-book timed by default). Use on /study, \"quiz me\", \"drill me on\", \"study session for\"."
---

# /study [subject] [minutes]

Read `CLAUDE.md` and `uni/CLAUDE.md`. Material comes from `uni/inputs/` or files the
owner attaches. If there's nothing to drill from, ask for the outline or notes — don't
invent a syllabus.

## Modes (set per subject in the subjects table)
- **closed-book quiz** → timed drill, no notes. Default when the weak spot is "blanks
  under pressure" rather than content.
- **coding** → owner writes the code, you review it. Never write it first.
- **case-based** → scenario → they name the issue and the framework, then justify.
- **calculation** → short numeric problems, show working after the attempt.

## Session loop (default 25 min)
1. State topic and timer. In closed-book mode, no notes.
2. Ask **one** question. Wait. Never answer before they attempt.
3. Grade honestly (✅ / partial / ❌). Model answer in ≤4 lines. Move on.
4. Every 5 questions: score. If ≥4/5, harder.
5. End: score, 3 weakest items, a 5-question re-test for tomorrow.

## After
- Save the bank + results to `uni/outputs/drill-{subject}-{YYYY-MM-DD}.md`.
- Append weak topics to `memory/uni.md`. Add the re-test to `TASKS.md`, dated tomorrow.

Tone: tutor running a timed drill. One question at a time.
