---
name: research
description: "Structured deep-dive with a fixed framework per type — a company before applying, a program or tool before paying, a uni topic, or a market niche for the side hustle. Use on /research, \"research [X] for me\", \"deep dive on\", \"is [program/tool] worth it\"."
---

# /research [company | program | tool | topic | niche] [subject]

Read `CLAUDE.md` and the owning `{domain}/CLAUDE.md`. Web search and connectors are
read-only. Save to `{domain}/outputs/research-{slug}-{YYYY-MM-DD}.md` plus a ≤20-line
summary in chat. Every note ends with **"So what for {name}"** — a decision or next
action, not a summary.

## Frameworks
**company** (income) — before an application or interview
- What they do, in one paragraph an analyst would write.
- News in the last 90 days, strategy signals, tech/data stack if findable.
- The team or program being applied to — what people there actually do.
- Values/keywords from the careers pages → feed `/apply`.
- 3 questions to have answers for; 3 to ask.

**program | tool** (side-hustle or general) — before paying for anything
- What it promises vs what the fine print says.
- Total cost to actually use it (forced subscriptions, upsells, tooling).
- Independent reviews only — not testimonials from the seller's funnel.
- Who makes money here, and when. Realistic payback for the owner, with numbers.
- Verdict: **pay / wait / skip**, plus the one condition that would change it.

**topic** (uni) — for an assignment or weak spot
- First principles, then how the subject frames it.
- A worked example with numbers. Common exam traps.
- 5 closed-book recall questions → hand to `/study`.

**niche** (side-hustle) — who to sell to
- Where demand is, typical rates, how saturated.
- 5 prospects worth pitching and why. What a first offer looks like.

## Rules
- Cite sources with links. Separate fact from inference.
- If the honest answer is "don't do this", say it first.
- Log the verdict + date to `memory/` so it isn't re-researched.
