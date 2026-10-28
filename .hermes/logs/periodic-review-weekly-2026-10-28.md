# Weekly execution and strategy review — 2026-10-28

> Generated deterministically from observed bus/status/queue evidence. No SEO, conversion or AI-citation outcome is inferred from missing data.

## Execution health

- Window: 2026-10-22 to 2026-10-28
- Runs: 12; verdicts: {"FAILED": 7, "OK": 2, "STALE": 2, "BLOCKED": 1}
- Current lanes requiring attention: 4

| lane | verdict | recovery | evidence |
|---|---|---|---|
| ZP-weekly-meta | MISSING | request_human | Get-ScheduledTask -TaskName ZP-weekly-meta \| Get-ScheduledTaskInfo |
| ZP-blog-deepfix | MISSING | request_human | Get-ScheduledTask -TaskName ZP-blog-deepfix \| Get-ScheduledTaskInfo |
| ZP-monthly-matrix | UNKNOWN | request_human | Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix |
| ZP-k3-review | BLOCKED | request_human | powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-dsh-scheduler-credential.ps1 |

## Task decisions

| task | previous status | decision | reason |
|---|---|---|---|
| OPS-20261028-DSH-CREDENTIAL | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| ZH-POSTER-20261028-PROCUREMENT | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| ZH-PACKAGING-20261028-BATCH1 | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| EN-STICKER-20261028-SMALLBATCH | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| EN-CATALOG-20261028-TRUTH | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| JA-C109-20261028-DEADLINE | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| MEASURE-20261028-ATTRIBUTION | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| GEO-20261103-AI-PROBE-S1 | SCHEDULED | HOLD | retest is not due or lacks a concrete date |
| REVIEW-20261030-WEEKLY | SCHEDULED | HOLD | retest is not due or lacks a concrete date |
| REVIEW-20261101-MONTHLY | SCHEDULED | HOLD | retest is not due or lacks a concrete date |
| FIX-WEEKLY-2026-10-28-ZP-weekly-meta-f3e926f7 | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| FIX-WEEKLY-2026-10-28-ZP-blog-deepfix-4231b4bd | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| FIX-WEEKLY-2026-10-28-ZP-monthly-matrix-725c87e3 | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |

## Dispatch and learning

- New FIX task IDs: NONE (or already present)
- Learning candidates: 0
- Learning gate: baseline + change + online_verify + retest are all mandatory. No automatic prompt, permission or production rewrites are permitted.

## Measurement limits

- GSC impressions are not market size; query/page/country aggregates are not interchangeable.
- No conversion ROI claim without GA4/008/order landing-page coverage.
- No AI citation claim without fixed-engine probe answers and citation URLs.

Data sources: .hermes/logs/lane-runs.jsonl, .hermes/logs/lane-status.json, .hermes/logs/strategy-task-queue.json.
