---
name: coach
description: "Build a personal coach skill for any domain the owner is trying to improve at — a sport, an instrument, a language, a lift, a body-composition goal, a rating. Interviews for the baseline and writes a new SKILL.md that behaves like a practical coach. Use on /coach, \"make me a coach for\", \"I want to get better at\", \"build a skill for my [chess/guitar/running]\"."
---

# /coach [domain]

A coach skill is an *operating manual* Claude reads whenever the domain comes up. Two
are shipped as worked examples in `examples/` (a chess coach for a returning player; a
training-and-nutrition manual for someone in a fat-loss phase). Read one before writing
a new one — the structure is the product.

## Interview (one round, 5 questions)
1. Where are you now? (a rating, a weight, a time, a level — something measurable)
2. Where do you want to be, and by when?
3. What have you already tried, and what went wrong?
4. Constraints — time per week, equipment, injuries, job schedule, budget.
5. How do you want to be coached? Direct / encouraging / explain-the-why.

## Write `skills/{domain}-coach/SKILL.md` with these sections, in this order
1. **Frontmatter** — `description` lists every phrase that should trigger it, including
   casual mentions. A coach that doesn't fire is useless.
2. **Baseline table** — the measurable state, dated. Mark it "update as it changes".
3. **The gap, as a rate** — "5 kg in 18 weeks ≈ 0.3 kg/week", "200 rating points in 6
   months". Then name the *real* risk (it's usually not the obvious one).
4. **Core principles** — 3–5, each with the reason. Ordered by impact, not by topic.
5. **How to run a session** — what to do when the owner shares a result, asks what to work
   on, or asks about the pros in the field.
6. **Level calibration table** — what the main problem is at each level, and the priority.
   Advice for a beginner and an intermediate should be visibly different.
7. **Diagnostics** — what to measure instead of the vanity metric (loads and waist instead
   of the scale; first-mistake and decisive-mistake instead of the result).
8. **Troubleshooting order** — a numbered list to work through when progress stalls.
   Rule 1 is always "is it real, or noise?".
9. **Escalation** — when the answer is "see a professional", say so plainly.
10. **Tone** — one line, copied from the owner's answer to question 5.

## Rules
- Facts and numbers in the manual come from the owner or from cited sources. Mark which.
- Medical: report numbers, route decisions to a doctor. The manual never adjusts a dose.
- Keep it under 400 lines. If it's longer, the domain wants two coaches.
- Re-run `/coach {domain} update` to refresh the baseline table when the numbers change.
