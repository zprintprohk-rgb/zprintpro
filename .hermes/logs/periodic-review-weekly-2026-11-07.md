# Weekly execution and strategy review — 2026-11-07

> Generated deterministically from observed bus/status/queue evidence. No SEO, conversion or AI-citation outcome is inferred from missing data.

## Execution health

- Window: 2026-11-01 to 2026-11-07
- Runs: 23; verdicts: {"OK": 14, "FAILED": 6, "STALE": 1, "BLOCKED": 2}
- Current lanes requiring attention: 5
- Lane status: {"available": true, "generated_local": "2026-11-07 22:48", "age_days": 0, "stale": false, "guard": "STALE_STATUS or unknown freshness cannot dispatch lane-repair tasks; use fresh bus and scheduler evidence"}
- Lane-status freshness gate passed or status is absent; absence is not proof of health.

| lane | verdict | recovery | evidence |
|---|---|---|---|
| ZP-daily-content | FAILED | request_human | powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-dsh-scheduler-credential.ps1 |
| ZP-gsc-feedback | FAILED | retry | .hermes/logs/cron-ZP-gsc-feedback.log |
| ZP-weekly-meta | BLOCKED | request_human | .hermes/logs/run-context-ZP-weekly-meta.json |
| ZP-monthly-matrix | MISSING | request_human | Get-ScheduledTask -TaskName ZP-monthly-matrix \| Get-ScheduledTaskInfo |
| ZP-k3-review | MISSING | request_human | Get-ScheduledTask -TaskName ZP-k3-review \| Get-ScheduledTaskInfo |

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
| REVIEW-20261030-WEEKLY | SCHEDULED | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| REVIEW-20261101-MONTHLY | SCHEDULED | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| FIX-WEEKLY-2026-10-28-ZP-weekly-meta-f3e926f7 | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| FIX-WEEKLY-2026-10-28-ZP-blog-deepfix-4231b4bd | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| FIX-WEEKLY-2026-10-28-ZP-monthly-matrix-725c87e3 | BLOCKED_INFRA | FIX | infrastructure blocker requires its designated owner |
| TRUTH-T1-20261029-CALENDARS-50PCS | DONE | STOP | terminal task state |
| TRUTH-T2-20261029-MINI-CALENDARS-1000 | DONE | STOP | terminal task state |
| TRUTH-T3-20261029-EN-UNIT-LOCALIZE | DONE | STOP | terminal task state |
| FIX-WEEKLY-2026-10-30-ZP-k3-review-ca005d9b | READY | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| FIX-20261030-AEO-ANSWER-BLOCK-PROOF-CLAIM | DONE | STOP | terminal task state |
| FIX-20261030-SKU-BODY-SHIPPING-LEGACY | DONE | STOP | terminal task state |
| FIX-20261030-BLOG-CERT-PHRASES | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| FIX-20261030-A1-POSTER-PRICE-TRIPLE | DONE | STOP | terminal task state |
| DIAG-20261030-STICKER-REGRESSION | DONE | STOP | terminal task state |
| FIX-20261030-STICKER-ZH-TRUTH-CONFLICT | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| FIX-20261030-STICKER-PRICE-THREE-LAYER | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| FIX-20261030-BLOG-H1-BRAND-SUFFIX | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| ASSET-20261030-PACKAGING-PROCUREMENT-ASSETS | READY | HOLD | insufficient comparable outcome evidence; no win/loss claim |
| FIX-20261030-SKU-SEO-US-SHIPPING-LEGACY | DONE | STOP | terminal task state |
| FIX-20261104-STICKER-CATEGORY-TITLE-EQ | SCHEDULED | HOLD | retest is not due or lacks a concrete date |
| DIAG-20261030-STICKER-CLUSTER | DONE | STOP | terminal task state |
| FIX-20261031-DHL-SHIPPING-CLAIMS | DONE | STOP | terminal task state |
| FIX-20261031-FIVE-CATEGORY-TRUTH | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |
| FIX-20261031-PRIMARY-URL-MISMATCH | WAITING_K3 | HOLD | approval gate is not satisfied; executor must not self-approve |

## GSC evidence handoffs

- Source: gsc-daily-anomaly-2026-11-07.json; 28d window: 2026-10-08..2026-11-04
- Freshness: XLSX_2026_11_07_PARTIAL_3MO_CARRIED
- Recovery: 96.98% DERIVED_SAME_BATCH (803 / 827.96), not a detector output; last official remains 123.7%; Impression-metric recovery only; not ranking, penalty, enquiry, order or revenue recovery

| route | query | baseline (imp/clk/pos) | owner | required gate |
|---|---|---|---|---|
| FIX | 食品包裝印刷 | 116/0/8.36 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| FIX | doujinshi printing | 55/0/9.98 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| FIX | small batch sticker printing | 27/0/6.0 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| FIX | small batch stickers | 19/0/5.42 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| FIX | 卒アル販売 | 16/0/5.0 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| FIX | saddle stitch booklet printing | 5/0/7.4 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| FIX | large envelopes | 1/0/7.0 | ZP-weekly-meta | Record SERP features and the real title/snippet first; change at most one snippet variable after approval |
| MEASURE | コミケ 印刷 | 163/0/22.88 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 貼紙印刷 | 131/0/37.65 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 宣傳單張 | 127/0/34.73 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 月曆印刷 | 125/0/24.44 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 書刊印刷 | 121/0/33.08 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 宣傳單張印刷 | 117/0/28.9 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 利是封印刷 | 59/1/24.42 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 印書 | 56/0/31.38 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 紙盒印刷 | 54/0/36.72 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 包裝盒印刷 | 53/0/33.3 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 包裝盒訂製 | 53/0/34.43 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 教材 印刷製本 | 51/0/31.49 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | a2 poster | 49/1/25.8 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 貼紙訂製 | 38/0/29.29 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
| MEASURE | 喜帖印刷 | 16/0/36.25 | ZP-monthly-matrix | Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect |
- Upstream anomaly tasks retained: 12; candidate handoffs: 2.

### Same-window focus-query delta

- Source: gsc-2026-11-07-money-keyword-delta.json; queries: 38; industry-head: 8; page-1: 8; page-1 zero-click: 7.
- Entered page 1: doujinshi printing, large envelopes; dropped out: NONE.
- Confirmed two-window worsening: a2 poster, コミケ 印刷, 利是封印刷, 印海報, 喜帖印刷, 宣傳單張, 教材 印刷製本.
- Missing current baseline: printing company, printing services, 印刷廠, 印刷服務, 教科書印刷, 網上印刷; missing is not zero demand.

| route | query | latest imp/clk/pos | owner | retry | exit criteria |
|---|---|---|---|---|---|
| FIX | 食品包裝印刷 | 116/0/8.36 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| FIX | doujinshi printing | 55/0/9.98 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| FIX | small batch sticker printing | 27/0/6.0 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| FIX | small batch stickers | 19/0/5.42 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| FIX | 卒アル販売 | 16/0/5.0 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| FIX | saddle stitch booklet printing | 5/0/7.4 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| FIX | large envelopes | 1/0/7.0 | ZP-weekly-meta | 2026-11-14 | SERP snapshot and snippet source recorded; one approved FIX deployed and online-verified, or HOLD with documented blocker |
| MEASURE | コミケ 印刷 | 163/0/22.88 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | 宣傳單張 | 127/0/34.73 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | 印海報 | 124/0/14.15 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | 利是封印刷 | 59/1/24.42 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | 教材 印刷製本 | 51/0/31.49 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | a2 poster | 49/1/25.8 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
| MEASURE | 喜帖印刷 | 16/0/36.25 | ZP-gsc-feedback | 2026-11-14 | Root-cause evidence recorded with a comparable baseline; next FIX/HOLD decision has an owner and retest date |
- Same-window movements are diagnostic evidence, not independent experiment wins/losses; missing rows are not zero demand

## Blog queue remeasurement

- Source window: 2026-10-08..2026-11-04; statuses: {"remeasure": 3, "blocked_waiting_k3": 5}

| cluster | status | decision | recheck |
|---|---|---|---|
| flyers-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| stickers-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| books-zh-hk | remeasure | REMEASURE_NOT_DUE | 2026-11-14 |
| packaging-zh-hk | blocked_waiting_k3 | HOLD_WAITING_K3 | — |
| posters-zh-hk | blocked_waiting_k3 | HOLD_WAITING_K3 | 2026-11-07 |
| stickers-en | blocked_waiting_k3 | HOLD_WAITING_K3 | 2026-11-28 |
| catalog-en | blocked_waiting_k3 | HOLD_WAITING_K3 | 2026-11-28 |
| comiket-ja | blocked_waiting_k3 | HOLD_WAITING_K3 | 2026-11-28 |

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
