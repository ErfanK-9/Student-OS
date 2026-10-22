# health

<!-- Filled in by /setup round 4. Leave tracking lines blank if not tracked; never
push tracking the owner didn't ask for. No conditions or medication in this file. -->

## Habits
Each habit has a full version and a **Floor** — the minimum that still counts on a bad day.

### Core (define a good day)
| Habit | Full | Floor |
|---|---|---|
| {{core_habit}} | {{full}} | {{floor}} |

### Micro (small, stackable)
| Habit | Full | Floor |
|---|---|---|
| {{micro_habit}} | {{full}} | {{floor}} |

- **Tracked in:** {{habit_tracker}}

## Body (optional)
- **Weight tracked:** {{yes_no}} — log to `inputs/weigh-ins.csv` (`date,kg`)
- **Training target:** {{sessions_per_week_or_blank}}

## Files
- `inputs/weigh-ins.csv` — raw weigh-ins. /today converts to `data/weigh-ins.json`.
- `data/habits-log.json` — one row per day, appended by /today.
