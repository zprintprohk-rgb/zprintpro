# Weekly execution and strategy review — 2026-11-13

> Generated deterministically from observed bus/status/queue evidence. No SEO, conversion or AI-citation outcome is inferred from missing data.

## Execution health

- Window: 2026-11-07 to 2026-11-13
- Runs: 18; verdicts: {"FAILED": 3, "OK": 11, "STALE": 1, "PARTIAL": 1, "PENDING": 2}
- Current lanes requiring attention: 3
- Lane status: {"available": true, "generated_local": "2026-11-13 06:43", "age_days": 0, "stale": false, "guard": "STALE_STATUS or unknown freshness cannot dispatch lane-repair tasks; use fresh bus and scheduler evidence"}
- Lane-status freshness gate passed or status is absent; absence is not proof of health.

| lane | verdict | recovery | evidence |
|---|---|---|---|
| ZP-weekly-meta | SCHEDULER_FAILED | request_human | Get-ScheduledTaskInfo -TaskName ZP-weekly-meta |
| ZP-monthly-matrix | SCHEDULER_FAILED | request_human | Get-ScheduledTaskInfo -TaskName ZP-monthly-matrix |
| ZP-k3-review | SCHEDULER_FAILED | request_human | Get-ScheduledTaskInfo -TaskName ZP-k3-review |

## Task decisions

| task | previous status | decision | reason |
|---|---|---|---|
| OPS-20261028-DSH-CREDENTIAL | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| ZH-POSTER-20261028-PROCUREMENT | DONE | STOP | terminal task state |
| ZH-PACKAGING-20261028-BATCH1 | DONE | STOP | terminal task state |
| EN-STICKER-20261028-SMALLBATCH | DONE | STOP | terminal task state |
| EN-CATALOG-20261028-TRUTH | DONE | STOP | terminal task state |
| JA-C109-20261028-DEADLINE | DONE | STOP | terminal task state |
| MEASURE-20261028-ATTRIBUTION | CLOSED_BY_K3_S0.37 | HOLD | retest is not due or lacks a concrete date |
| GEO-20261103-AI-PROBE-S1 | SCHEDULED | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| REVIEW-20261030-WEEKLY | DONE | STOP | terminal task state |
| REVIEW-20261101-MONTHLY | SCHEDULED | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| FIX-WEEKLY-2026-10-28-ZP-weekly-meta-f3e926f7 | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| FIX-WEEKLY-2026-10-28-ZP-blog-deepfix-4231b4bd | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| FIX-WEEKLY-2026-10-28-ZP-monthly-matrix-725c87e3 | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| TRUTH-T1-20261029-CALENDARS-50PCS | DONE | STOP | terminal task state |
| TRUTH-T2-20261029-MINI-CALENDARS-1000 | DONE | STOP | terminal task state |
| TRUTH-T3-20261029-EN-UNIT-LOCALIZE | DONE | STOP | terminal task state |
| FIX-WEEKLY-2026-10-30-ZP-k3-review-ca005d9b | CLOSED_RESOLVED | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| FIX-20261030-AEO-ANSWER-BLOCK-PROOF-CLAIM | DONE | STOP | terminal task state |
| FIX-20261030-SKU-BODY-SHIPPING-LEGACY | DONE | STOP | terminal task state |
| FIX-20261030-BLOG-CERT-PHRASES | READY | HOLD | retest is not due or lacks a concrete date |
| FIX-20261030-A1-POSTER-PRICE-TRIPLE | DONE | STOP | terminal task state |
| DIAG-20261030-STICKER-REGRESSION | DONE | STOP | terminal task state |
| FIX-20261030-STICKER-ZH-TRUTH-CONFLICT | READY | HOLD | retest is not due or lacks a concrete date |
| FIX-20261030-STICKER-PRICE-THREE-LAYER | READY | HOLD | retest is not due or lacks a concrete date |
| FIX-20261030-BLOG-H1-BRAND-SUFFIX | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| ASSET-20261030-PACKAGING-PROCUREMENT-ASSETS | READY | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| FIX-20261030-SKU-SEO-US-SHIPPING-LEGACY | DONE | STOP | terminal task state |
| FIX-20261104-STICKER-CATEGORY-TITLE-EQ | DONE | STOP | terminal task state |
| DIAG-20261030-STICKER-CLUSTER | DONE | STOP | terminal task state |
| FIX-20261031-DHL-SHIPPING-CLAIMS | DONE | STOP | terminal task state |
| FIX-20261031-FIVE-CATEGORY-TRUTH | READY | HOLD | retest is not due or lacks a concrete date |
| FIX-20261031-PRIMARY-URL-MISMATCH | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| FIX-20261113-POSTER-BLOG-TRUTH | READY | HOLD | retest is not due or lacks a concrete date |
| FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL | DONE | STOP | terminal task state |
| FIX-20261113-CATALOG-TRUTH-RESIDUAL | READY | HOLD | retest is not due or lacks a concrete date |
| FIX-20261113-JA-EDUCATION-C109-TRUTH | READY | HOLD | retest is not due or lacks a concrete date |

## GSC evidence handoffs

- Source: gsc-daily-anomaly-2026-11-12.json; 28d window: None
- Freshness: None
- Recovery: None; Impression-metric recovery only; not ranking, penalty, enquiry, order or revenue recovery

| route | query | baseline (imp/clk/pos) | owner | required gate |
|---|---|---|---|---|
- Upstream anomaly tasks retained: 0; candidate handoffs: 0.

### Same-window focus-query delta

- Source: gsc-2026-11-12-money-keyword-delta.json; queries: 54; industry-head: 8; page-1: 7; page-1 zero-click: 6.
- Entered page 1: 證書印刷; dropped out: NONE.
- Confirmed two-window worsening: a2 poster, コミケ 印刷, 教材 印刷製本, 海報印刷.
- Missing current baseline: 2027年賀状, business holiday cards, corporate holiday cards, large envelopes, printing company, printing services, 印刷廠, 印刷服務, 宣传单张, 年賀状印刷, 教科書印刷, 網上印刷, 貼紙订制; missing is not zero demand.

| route | query | latest imp/clk/pos | owner | retry | exit criteria |
|---|---|---|---|---|---|
| FIX | 食品包裝印刷 | 107/0/8.53 | ZP-weekly-meta | 2026-11-20 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| MEASURE | 海報印刷 | 206/1/17.23 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | コミケ 印刷 | 129/0/25.74 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | 教材 印刷製本 | 56/0/36.95 | ZP-gsc-feedback | 2026-11-20 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | a2 poster | 38/1/40.0 | ZP-gsc-feedback | 2026-11-20 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| HOLD | small batch sticker printing | 21/0/7.29 | ZP-gsc-feedback | 2026-11-18 | Recheck on the queue date or retain HOLD_WAITING_K3; no duplicate FIX dispatch |
| HOLD | 卒アル販売 | 16/0/5.0 | ZP-gsc-feedback | 2026-11-20 | Sufficient same-window evidence or explicit priority decision; otherwise remain HOLD |
| HOLD | 證書印刷 | 7/0/10.0 | ZP-gsc-feedback | 2026-11-20 | Sufficient same-window evidence or explicit priority decision; otherwise remain HOLD |
| HOLD | 书籍印刷 | 5/0/7.6 | ZP-gsc-feedback | 2026-11-20 | Sufficient same-window evidence or explicit priority decision; otherwise remain HOLD |
| HOLD | saddle stitch booklet printing | 1/0/4.0 | ZP-gsc-feedback | 2026-11-20 | Sufficient same-window evidence or explicit priority decision; otherwise remain HOLD |
- Same-window movements are diagnostic evidence, not independent experiment wins/losses; missing rows are not zero demand

## Blog queue remeasurement

- Source window: 2026-10-14..2026-11-10; statuses: {"remeasure": 8}

| cluster | status | decision | recheck |
|---|---|---|---|
| flyers-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| stickers-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| books-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| packaging-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| posters-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| stickers-en | remeasure | REMEASURE_NOT_DUE | 2026-11-18 |
| catalog-en | remeasure | REMEASURE_NOT_DUE | 2026-11-28 |
| comiket-ja | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |

## GEO measurement

- S1_COMPLETE_CITATION_URLS_PARTIAL; S2 2026-11-20..2026-11-24: MEASURE at S2; capture complete citation URLs. Do not rerun S1 or create content solely from absence

## Dispatch and learning

- New FIX task IDs: NONE (or already present)
- Recurred existing task IDs: FIX-WEEKLY-2026-10-28-ZP-weekly-meta-f3e926f7, FIX-WEEKLY-2026-10-28-ZP-monthly-matrix-725c87e3, FIX-WEEKLY-2026-10-30-ZP-k3-review-ca005d9b
- Suppressed duplicates: 3 (deduplication is recorded, not misreported as a write failure)
- Learning candidates: 0; SCALE-eligible: 0
- Learning gate: baseline + change + production_deploy + online_verify + retest are all mandatory. GSC movement alone is not a win/loss.
- FIX/MEASURE handoffs are proposals only. No automatic prompt, permission, canonical, redirect or production rewrites are permitted.

## Measurement limits

- GSC impressions are not market size; query/page/country aggregates are not interchangeable.
- Fresh xlsx inventory does not prove that the API plane is fresh.
- No conversion ROI claim without GA4/008/order landing-page coverage.
- No AI citation claim without fixed-engine probe answers and citation URLs.

Data sources: .hermes/logs/lane-runs.jsonl, .hermes/logs/lane-status.json, .hermes/logs/strategy-task-queue.json, latest eligible anomaly/blog/GEO evidence listed above.
