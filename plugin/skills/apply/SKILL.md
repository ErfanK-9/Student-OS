---
name: apply
description: "Tailor the owner's resume and draft a cover letter for a specific internship or graduate role, then log it in income/data/applications.json. Use on /apply, \"apply for\", \"tailor my resume for\", \"cover letter for\"."
---

# /apply [company] [role] [link or pasted JD]

Read `CLAUDE.md` and `income/CLAUDE.md`. Source of truth: `income/inputs/resume.md`
(never edit it) and the **evidence bank** in `income/CLAUDE.md` — nothing outside it
goes into an application. Prior letters in `income/inputs/` show the owner's voice.
If there's no research note for the company in `income/outputs/`, run `/research company` first.

## Steps
1. Read the JD. Extract must-haves, nice-to-haves, values/keywords, deadline, process stages.
2. Map each requirement to evidence-bank items. List gaps honestly. **Never invent.**
3. Write `income/outputs/{company}-{role}-{YYYY-MM-DD}.md`:
   - Tailored resume bullets — reordered and reworded, same facts.
   - Cover letter ≤300 words, in the owner's voice, one concrete project story, no clichés.
   - "Gaps + how to address them in interview".
   - 5 likely interview questions.
4. Add or update the row in `income/data/applications.json` (dedupe on company+role):
   deadline, `status: drafted`, materials path.
5. Add to `TASKS.md`: `- [ ] {YYYY-MM-DD} · income · submit {company} {role} by {deadline}`.

## Rules
- Draft only. Never submit, never send email.
- If the role is off-target versus `target_roles`, say so before drafting.
- Salary figures stay in `income/` and never go to `memory/`.
