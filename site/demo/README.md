# Banner demo profile

The banner shows output from a fictional test student, produced by following the
`/today`, `/study` and `/apply` specs in `plugin/skills/` against the profile below.
Change the profile, re-run the skills, and update `components/banner/content.ts` to match.

## Test profile (CLAUDE.md, condensed)
- **Name:** Jordan Lee · Bachelor of Business (Analytics) · Spring semester
- **Paid work:** courier, best window 6–10am weekdays
- **target_roles:** data analyst / business analyst internships
- **Protected blocks:** gym Tue/Thu 4–5:30pm 🔒
- **Non-negotiables:** water, 10 pages, plan tomorrow
- **Voice:** direct

### uni/CLAUDE.md
| Code | Name | Target | Assessment | Drill mode | Weak spot |
|---|---|---|---|---|---|
| QUANT201 | Business Statistics | D | weekly quizzes + exam | closed-book quiz | picking the right test under time |

### health/CLAUDE.md
Core: gym, sleep by 11, 10 pages, no phone first 30 min · Micro: water, stretch, plan tomorrow

### income/CLAUDE.md evidence bank
| # | Evidence | Number / outcome | Source |
|---|---|---|---|
| 1 | Automated weekly shift reporting with SQL + Power BI | cut 2h of manual work a week | project |
| 2 | Treasurer, student society | managed a $14k budget | resume |

---

## /today → briefs/today.md

```
# Brief — Tue 3 Nov 2026

**Work window:** 6–10am ✅
**Non-negotiables:** [ ] water [ ] 10 pages [ ] plan tomorrow

## Today
- 6:00 Courier shift (until 10:00)
- 13:00 QUANT201 lecture (Building 11, 04.401) — leave by 12:15
- 16:00 Gym 🔒

## Due / overdue
- Fri 6 Nov · QUANT201 Quiz 3 (10%) — ANOVA, chi-square
- Sun 8 Nov · Data analyst intern application (drafted, not submitted)

## Yesterday
- Habits: Core 3/4 · Micro 2/3 · missed: 10 pages
- Work: $31/h over 4h

## Top 3 for today
1. 25-min closed-book drill on ANOVA — Quiz 3, weakest topic
2. Read 10 pages at lunch — only Core habit missed
3. Submit the intern application — closes Sunday

## One thing to set up tonight
- Pack the courier bag and charge the phone before 10pm
```

## /study QUANT201 25 → question 4 of 10

```
Q4 (closed-book, 12:40 left): Which test compares the means of three or more groups?
  t-test · ANOVA · Chi-square · Regression
Answer: ANOVA ✅ — a t-test handles two groups; chi-square compares counts, not means.
```

## /apply → income/outputs/{company}-data-analyst-intern-2026-11-03.md (excerpt)

```
Must-haves from the ad: SQL, Power BI, stakeholder reporting
Tailored bullet (evidence #1, reworded, same facts):
- Automated weekly reporting with SQL and Power BI, cutting 2 hours of manual work a week
Gaps: Python (listed as nice-to-have) — mention current QUANT201 work in interview
```
