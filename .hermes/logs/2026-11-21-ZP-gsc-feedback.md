# 2026-11-21 · ZP-gsc-feedback 车道报告（无 11-20/11-21 导出 · 数据日仍 11-16 = **116.2h** · 9 个 READY 任务同导出 **ALREADY_DONE** · 11-21 两个决策点均不可测 · **新登记 19:50 海报博文改标题 = 12-04 判决 confounder** · 零页面写入）

VERDICT: PARTIAL
RECOVERY: **114.29% — `UNCHANGED_BATCH_2026_11_19` / `DERIVED_NOT_DETECTOR`**（11-19 批 24h **1,138** ÷ 同批 28d 日均 **995.6786**；窗口止 **11-18T20**，批龄 **72.2h**；**今日无新 24h 点，不是今日读数**）
RECOVERY_SERIES: full-country：10-29 **105.8%**（793，官方）→ 10-30 **117.7%**（888，官方）→ 11-03 **123.7%**（977，最后官方）→ 11-07 **96.98%**（803，DERIVED）→ 11-10 **130.0%**（1,124，DERIVED）→ 11-11 **105.3%**（940，DERIVED）→ 11-12 **63.93%**（578，DERIVED）→ 11-16 **85.54%**（805，DERIVED）→ 11-19 **114.29%**（1,138，DERIVED）；**11-21 无新点（不复制 11-19 冒充今日）**
RECOVERY_SERIES_NOTE: 10-29/10-30/11-03 为官方 detector 值；**11-07 点为上轮链条继承值，其分母用 11-04 批 28d 日均 828（803/828=96.98%）**，11-10 起改用同批 28d 日均（864.82 / 892.75 / 904.14 / 941.07 / 995.68）；**分母口径不完全一致，链条只作趋势参考，不作胜负**。10-12..10-28 官方点沿用 11-03 前报告与 `gsc-cliff-2026-10-*` 档案，**本轮未重算、未复制数字**（避免手抄漂移）；11-16 及更早各点本轮未重算（detector 18 日无档），仅 11-19 点可复算。
RECOVERY_STREAK: **0/3**（官方点 10-29 / 10-30 / 11-03 不连续；derived 不计入）
RECOVERY_FLAG: **无新导出 ⇒ 恢复曲线本轮无推进**；114.29% 仍是 11-19 批单日读数；detector 连续 **18** 日无档（11-04..11-21），**不判恢复完成、不判 CRITICAL_CLIFF**
DATA_STATUS: **NO_NEW_BATCH_2026_11_20_OR_11_21**（最新仍 11-19；7d/28d 数据日 **2026-11-16**；时龄 **116.2h**；缺 11-13/14/15/17/18/20/21 共 7 个自然日，其中工作日 5 个）
DATA_GATE: **STALE_116.2H**（24h 72.2h；7d/28d 116.2h；3mo 500.2h；API 404.2h；detector 18 日空；index 落后 **6** 批 / 16 日）
KPI_UPDATED: **false**（无新导出；最后 KPI 交付 = 11-20 轮的 export 11-19 / 数据日 11-16）
NO_NEW_DATA: **true**
DECISION_POINTS_11_21: **2/2 UNSATISFIABLE**（貼紙第七窗 `WINDOW_NOT_AVAILABLE`［需数据日 ≥11-18］；海報/喜帖主承接份额 `CANNIBALIZATION_NOT_MEASURABLE`［11-19 workbook 三窗 join flag=false；最新 query×page 表 = **2026-10-31**］）
RETEST_11_21: **BLOCKED_NO_NEW_EXPORT**（9 个 READY 任务 = 同一导出 11-19 / 同 query / 同 route，已由 11-20 轮测量 ⇒ 本轮 **ALREADY_DONE**，不重做）
CONFOUNDER_NEW: **A72**（2026-11-21 19:50 push `c93cb09d` 含 `2521140`：海报簇博文 title/价格改写 + `c93cb09d` ja 同人订单价格措辞；**在数据日 11-16 之后**，不污染 11-19 读数，但污染 11-22 起所有窗，直接威胁 `EXP-1108-POSTER-PRIMARY-URL` 的 12-04 判决）
PAGE_WRITES: 0
CONSUMED: `.hermes/logs/run-context-ZP-gsc-feedback.json` @ **2026-11-21 20:13:02**（preflight **ok / 10-10**；lock pid 16108；`retry_queue` **1** 项 = `FOLLOW_UP_PARTIAL`；本键 `b93ef5a6fc086a2d`；prev bus = 11-20 20:22:01 **PARTIAL**）| `.hermes/logs/lane-status.json` @ **2026-11-21 19:13**（**1.0h，新鲜**；bus_records **141**；verdict=ATTENTION；problems=**2** = weekly-meta 11-20 FAILED + k3-review 11-21 MISSING；gsc 11-15/16/17 MISSING / 11-18 FAILED / 11-19 FAILED / 11-20 PARTIAL / 11-21 PENDING）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6.1/6.2/6.3/6.4/7.1–7.4/**§8**）| `zprintpro-gsc-feedback-loop.md`（11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块）+ `sop-10-gate.md` | `.hermes/logs/coordination-board.json` @ 20:13:02（**9 个 READY 测量任务**，全部 owner=本车道）| **`gsc-2026-11-19-four-window-analysis.json`**（权威窗口 + KPI + country/page 聚合 + 60 行 page-1 池 + `query_page_join_available_in_workbook:false` ×3 + `two_method_reconciliation`）| **`gsc-2026-11-19-money-keyword-delta.json`**（28d 八导出序列 + 7d 块 `previous_11_16/current_11_19`）| `gsc-2026-11-16-*`（上批对照）| `gsc-cliff-2026-11-03.json` | `GSC数据/` 全清单（**153 文件，最新 11-19**）+ `index.json` | `.hermes/logs/flywheel-learning-ledger.json`（**只读既有条目**；本轮仅追加 `retest_gate_2026_11_21` + 两个实验的 `confounders`）| 对端：`2026-11-20-ZP-gsc-feedback.md` / `2026-11-20-ZP-daily-content.md` / **`2026-11-21-P1-truth-batch-execution.md`** / `2026-11-21-wrap-check-evening.md` / `2026-11-21-PRICE-DEBT-BIGBATCH.md` / `2026-11-21-RUSH-PAGE-TRUTH.md` / `2026-11-21-manual-p1-truth-batch.md` / `money-kw-share-baseline-2026-10-31.md` / `docs/assets/2026-11-20/gsc-money-queries-and-pages.json`（同 11-19 workbook 的 pages/queries 独立聚合）/ `strategy-task-queue.json` | `SESSION_LOCK.md` 顶部
DELIVERED: `.hermes/logs/2026-11-21-ZP-gsc-feedback.md`, `.hermes/logs/gsc-daily-anomaly-2026-11-21.json`, `.hermes/logs/flywheel-learning-ledger.json`（**只加 `retest_gate_2026_11_21` + `EXP-1108-POSTER-PRIMARY-URL` / `EXP-1108-JA-DOUJINSHI-UNIT` 的 `confounders` + `updated_at` / `update_log` 追加**；未改任何既有条目 verdict / `data_supply` / `window_math`）
NEXT: **首个新导出** → 标 `LATE_ARRIVAL_BACKFILL`（export_date / window_end / content_hash）→ 数据日 ≥**11-18** 才读貼紙第七窗 → 9 词只在**新导出**上复读（11-19 不得二次测量）→ 份额检查等**当前** query×page join（无则继续 `CANNIBALIZATION_NOT_MEASURABLE`）→ 数据日 ≥**11-22/11-23** 到 C1/C2 14d 方向窗 → **12-01** monthly → **12-04** 28d 82.1% 首个经营判决窗（**海报主承接实验默认 HOLD，除非有 join**）。**K3 动作 D1**：补 11-20/11-21（+ 缺的 11-13/14/15/17/18）四档、重启 7892 代理、跑 detector、重建 index、**提供当前 query×page join**；**D2** 稀释表按 data_day 记键（A65）；**D3** 调度凭据持久化（A63）；**D4** 协同板窗口标签（A67）；**D5** 账本 `data_supply` 自相矛盾 + 独立 QA（A58/A68）；**D6** 海报博文 11-21 改 title 的单变量归属（A72，默认 HOLD）
RETRY_OF: **NONE** —— `retry_queue` 唯一项 kind=`FOLLOW_UP_PARTIAL`（`ZP-gsc-feedback-20261120T202201-39644`，"真实交付已完成; 仅处理 NEXT, 不得重做 DELIVERED"）⇒ 按契约 §2.1 只做 NEXT，不触发失败重跑
FOLLOW_UP_OF: **`ZP-gsc-feedback-20261120T202201-39644`**（verdict PARTIAL；DELIVERED = 报告 + 11-20 anomaly + ledger gate；本轮**零重写**）
IDEMPOTENCY: `b93ef5a6fc086a2d`（day 2026-11-21 / intent=`数据供给闸门 + 11-21 决策点裁决 + 9 READY 同导出幂等 + 新 confounder 登记` / target=`export 2026-11-19（数据日 11-16）+ 9 词`）；与上轮 `323b32262db4c17c` 不同 ⇒ 换日 + 换目标，合法新工作；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，**不含本键**
STATUS_GATE: **FRESH**（lane-status 1.0h；problems=2 为调度器残留，**不据此派内容修复**）
COVERAGE: **DATA_SUPPLY_GATE(三法) + NINE_READY_IDEMPOTENT_CONSUME + DECISION_POINT_11_21_GATE ×2 + POST_WINDOW_CONFOUNDER(A72) + ANOMALY_MIGRATION(A1/A2/A36/A44/A47/A54/A58/A63/A65/A67/A68/A69/A70) + SPAM_WEEKLY(no new evidence) + FLYWHEEL_APPEND**
CONFIDENCE: **HIGH**（无 11-20/21 导出三法一致 / 数据日 11-16 / 116.2h / 153 文件清单 / join flag=false ×3 / 19:50 push 三 commit 与对端报告互证 / KPI 与 11-20 同源同值）· **MEDIUM**（9 词方向 = 25/28 重叠 + 8/28 变更后，且今日不重测）· **LOW**（任何因果、部署成效、恢复/排名改善结论；份额）
RUN: 定时 20:13 轮；**pwsh 仅用于一次只读 `Get-Content`（读 coordination board 头部），未跑任何计算/门禁**（detector/API/index/tsc/xlsx 重解析/schtasks/git 均未实跑；其余为文件直读 + 手算复算）；**零 `src/`、零 title/desc、零 canonical/301、零队列状态翻转、零历史报告改写、零对端文件改写**

> **为什么是 `PARTIAL` 而不是 `OK`**：本车道 30 天职责含「每日拉取并检测异常」。今天**没有可拉的批**（11-20/11-21 导出不存在），所以 `KPI_UPDATED=false`；11-21 两个到期决策点全部因输入缺失而不可测；且必须新登记一条会污染 12-04 判决的 confounder。写 `OK` 等于拿 11-19 的读数冒充 11-21 复测结果，并掩盖新变量。
>
> **为什么不是 `NO_OP`**：本轮有实质新增（三法证无新档、两个决策点的机器证据与关闭条件、**19:50 生产变更 → 两个实验 confounder**、异常状态迁移、账本 gate 追加），且到期复测被阻断需要显式记录，不属于「有证据的合法无变更退出」。

---

## 0. 一句话结论

**今天最值钱的事实不是 GSC 数字（没有新数字），而是：11-21 19:50 那次 push 把海报簇博文的 title/价格改了——这恰好落在 12-04「海报主承接 URL」经营判决窗的前面，使该实验从 11-22 起变成双变量；而没有 query×page join，我们无法把 category 与 blog 的份额拆开。**

三件新事实：

1. **数据面继续倒退**：数据日仍 11-16，时龄 92.2h → **116.2h**；缺 11-20/11-21 两批，累计缺 7 个自然日（工作日 5 个，11-14/15 为周末）；3mo 仍停在 11-03。今天**没有任何新 GSC 读数**，所有"今日 KPI"字样都不成立。
2. **11-21 两个决策点全部落空**：貼紙第七窗要求数据日 ≥11-18（差 2 天）；海報/喜帖份额要求**当前** query×page join（11-19 workbook 三窗均 `query_page_join_available_in_workbook=false`，最新 query×page 表只到 **2026-10-31**）。两者都**不猜、不补、不沿用旧值**。
3. **新增 A72（P1）**：19:50 push `c93cb09d` 含 `2521140`（海报博文 title→常青价标题、title-equiv 55、价格 HK$9→HK$16 起、description/正文对齐）与 `c93cb09d`（ja 同人订单价 "1 冊 ¥7,500 起"→"ご注文 ¥7,500〜"）。这些**在 11-16 之后**，所以 11-19 批读数干净；但 11-22 起每个窗都混入第二个变量。**默认动作：12-04 该实验无 join 则 HOLD，不回滚、不改 verdict。**

---

## 1. STEP 0 · 结果总线消费与 retry 裁决（第 -1 优先级）

### 1.1 `retry_queue` 唯一项：只做 NEXT，不重做 DELIVERED

| 字段 | 值 | 本轮裁决 |
|---|---|---|
| kind | `FOLLOW_UP_PARTIAL` | 不是失败重跑；按契约 §2.1「只处理 NEXT」 |
| run_id | `ZP-gsc-feedback-20261120T202201-39644` | 11-20 轮 verdict=PARTIAL、已 push（head `fb62b52b`） |
| reason | 「真实交付已完成; 仅处理 NEXT, 不得重做 DELIVERED」 | 本轮**零重写** 11-20 报告 / anomaly / ledger gate |

**NEXT 三项逐条落地：**

| NEXT 项 | 需要的输入 | 今天的事实 | 本轮状态 |
|---|---|---|---|
| 貼紙**第七窗** | 数据日 ≥ **11-18** | 最新数据日 **11-16** | `WINDOW_NOT_AVAILABLE`（差 2 天；不用 11-19 批重算第七窗） |
| 海報/喜帖**主承接份额** | **当前** query×page join | 11-19 workbook 三窗 join flag=**false**；最新 query×page 表 = **2026-10-31**；对端 11-21 wrap-check 亦记 query-x-page `NO_DATA` | `CANNIBALIZATION_NOT_MEASURABLE`（不推断份额） |
| SMALLBATCH 7d | 对端 `ZP-daily-content` | 该车道 **21:17** 才点火，晚于本轮 20:13 | `DELEGATED_PEER_PENDING`（下轮只读消费，不抢跑） |

### 1.2 幂等与锁

- 本键 `b93ef5a6fc086a2d` ≠ 上轮 `323b32262db4c17c`：换日 + 换目标（gate 审计 vs 11-19 批首读）⇒ 合法新工作；`warnings` 不含本键。
- preflight **ok / 10-10**（含 `dsh_effective_provider_model=deepseek-official/deepseek-flash`）；`lane.lock` 由本轮持有（pid 16108）；`SESSION_LOCK.md` 顶部 = **11-14 16:3x 已释放**，10-23 历史「持有中」均有后续释放条目 ⇒ **无活动人手锁**（A64 维持 `CLOSED_FALSE_POSITIVE`）。
- 协同板构建成功（`generated_at=2026-11-21T20:13:02+0800`），9 个 READY 任务全部 `owner_lane=ZP-gsc-feedback`；六项上游输入 `available:true` ⇒ 不触发「协同板失败必须 BLOCKED」。

### 1.3 本轮「不重做 / 不触碰」清单（幂等铁律）

- **不重做** 11-20 的 11-19 批 KPI 与 9 任务测量（同一 export + 同一 query + 同一 route ⇒ 幂等消费；见 §4）。
- **不重写** 11-14 / 11-18 / 11-19 / 11-20 任何报告、anomaly JSON、`.failure.md`、ledger 旧块。
- **不重做** 貼紙 title 评估：`discussion-input-2026-11-21-sticker-title-eval.md` 已由 analyst 交付；本车道只登记 gate，不另提方案。
- **不改写** `strategy-task-queue.json` / `lane-status.json` / `lane-runs.jsonl` / `coordination-board.json` / `GSC数据/index.json` / 任何 `gsc-2026-11-*` 分析 JSON / 任何对端报告 / `src/` / `docs/`。
- **不改写** 今日 5 份人手会话报告（`RUSH-PAGE-TRUTH` / `PRICE-DEBT-BIGBATCH` / `manual-p1-truth-batch` / `wrap-check-evening` / `P1-truth-batch-execution`）。

### 1.4 跨车道避让（按「文件是否被写」判，不按快照状态）

| 今日他方写入 | 时间 | 本轮处置 |
|---|---|---|
| `2026-11-21-P1-truth-batch-execution.md`（P1-1 海报博文旧价清毒 + P1-2 ja 教育/C109 真值；push `c93cb09d`） | 17:47–20:05 | **只读**；其 commit 事实登记为 A72 confounder，不重做其内容、不评价其 title |
| `2026-11-21-wrap-check-evening.md`（19:08 收尾检查；query-x-page `NO_DATA`；凭据风险） | 19:08 | **只读**；引用其 `NO_DATA` 作为份额不可测的第二证据 |
| `2026-11-21-PRICE-DEBT-BIGBATCH.md` / `RUSH-PAGE-TRUTH.md`（自述 18 + 4 个 src 档、0 commit / 0 push、gate NOT EXECUTED） | 17:xx–20:0x | **只读**；登记为 `UNVERIFIED_NOT_COUNTED_AS_DEPLOYED`，不并入本轮 deploy 结论 |
| `2026-11-21-manual-p1-truth-batch.md`（17:49 preflight BLOCKED，key 缺席） | 17:49 | **只读**；作为 A63 调度凭据风险证据 |
| `2026-11-20-ZP-daily-content.md`（貼紙 29.94 第六窗） | 11-20 18:17 | **只读**；貼紙里程碑标 `ALREADY_REPORTED_BY_PEER` |

> `run-context.sibling_lanes` 写 daily=`PENDING 21:17`、blog-deepfix=`PENDING 23:47`、k3-review=`MISSING 07:10`。本轮以「今日文件实际写入」避让，而不是据快照判定；三条车道报告今日均**不存在**（daily 未点火、k3 未点火），故无撞车面。

---

## 2. 数据面：没有 11-20/11-21 导出，一切「今日」字样不成立

### 2.1 四平面账本（基准 2026-11-21 20:13）

| 平面 | 最新档 | 窗口 / 数据日 | 时龄 | 判定 |
|---|---|---|---|---|
| xlsx 24h | **11-19** | 11-17T21 → **11-18T20** | **72.2h** | 非昨日/今日（A2 DAY6） |
| xlsx 7d | **11-19** | 11-10 → **11-16** | **116.2h** | **>72h ⇒ A1 继续开（且比 11-20 更差 24h）** |
| xlsx 28d | **11-19** | 10-20 → **11-16** | **116.2h** | 同上；C1 仅 **8/28**、C2 **7/28** 在变更后 |
| xlsx 3mo | **11-03（carried）** | 08-01 → **10-31** | **500.2h** | 连续第 **6** 批缺（11-07/10/11/12/16/19） |
| API query×country | `gsc-query-country-28d-end1105.csv` | 数据日 **11-04** | **404.2h** | STALE；7892 代理未复 |
| detector | **无 11-04..11-21 档** | 最后 = 11-03 | **18 日空** | `available:false`；pwsh 计算禁用，不重试 |
| index.json | `lastBuild=11-05 07:38` | `latestFreshData=11-03` | 落后 **6 批 / 16 日** | **A47 复发**；门童 #9 会误判 |

**时龄口径（本轮统一，且只声明一次）**：24h 从窗口终点 `11-18T20` 起算；7d/28d/3mo/API 从「数据日次日 00:00」起算（11-17 / 11-17 / 11-01 / 11-05）。**同基对比上轮**：48.2→72.2、92.2→116.2、92.2→116.2、476.2→500.2、380.2→404.2，**每个平面都精确 +24h**。上一轮 3mo/API 写 500.2/404.2 用的是「数据日 00:00」基（早一天），本轮改用统一基；**不是数据撤回，只是基准写明**。

### 2.2 「11-20 / 11-21 无导出」三方法（不是没找到，是文件不存在）

1. `GSC数据/*2026-11-2*` 文件名 glob = **0 命中**；全量清单 **153 文件**，最新 = `24小时/7天/28天三站点汇总…2026-11-19.xlsx`。
2. `.hermes/logs/gsc-2026-11-2*` 分析产物 glob = **0 命中**；最新 = `gsc-2026-11-19-*`。
3. 对端独立记录：11-20 daily 明记「11-20 无导出」；11-21 19:08 wrap-check 明记 query-x-page `NO_DATA`、无新批。

三法一致 ⇒ `NO_NEW_DATA=true`。**11-19 批已于 11-20 被本车道完整消费**（KPI + 9 任务 + 100% 7d 窗审计），今天没有第二个消费者可做的事。

### 2.3 KPI：沿用 11-19 批（**不是今日读数**，不再重复交付）

| 档 | 窗口 | 点击 | 展示 | CTR | 平均排名 | 时龄 | 状态 |
|---|---|---|---:|---:|---:|---|---|
| 24h | 11-17T21 → 11-18T20 | 21 | 1,138 | 1.8453% | 14.1649 | 72.2h | FROZEN |
| 7d | 11-10 → 11-16 | 130 | 8,283 | 1.5695% | 15.5229 | 116.2h | **STALE / 100% 变更后（技术级）** |
| 28d | 10-20 → 11-16 | 554 | 27,879 | 1.9872% | 14.9511 | 116.2h | **STALE / BACKGROUND_ONLY（28.6%）** |
| 3mo | 08-01 → 10-31（11-03 档） | 1,279 | 65,252 | 1.9601% | 17.3550 | 500.2h | CARRIED |

- **与 11-20 报告逐位相同**（同源同 export）⇒ 本轮不再做「上轮 X → 本轮 Y」的 KPI 对比（无新点，写了就是重复交付）。
- **双方法**：手算 21/1,138、130/8,283、554/27,879 与四窗 JSON 一致；第二方法 = 该 JSON 的 `two_method_reconciliation["2026-11-19"]`，`reconciliation_all_match=true`。仍**无**独立 workbook QA 文件（A68）。

### 2.4 detector / 落盘义务：未执行，原因写明

- 恢复模式 STEP 0.5 要求跑 `python scripts/gsc-cliff-detector.py`：**未执行**（pwsh 计算面禁用，v9.4 明令不重试）⇒ 恢复系数只能派生，标 `DERIVED_NOT_DETECTOR`；detector 已 **18 日**无档。
- 契约 §K.1.2 落盘义务要求拉数并写 `gsc-fresh-2026-11-21.json` + 更新 `index.json`：**未执行**（无 API、无 pwsh、index 属共享总线不改写）。本轮读数全部取自 K3 投放的 11-19 xlsx 与分析 JSON，**未伪造今日数据**。

### 2.5 spam 恢复周报（11-15..11-21，恢复模式块要求）

| 项 | 本周状态 | 证据 / 边界 |
|---|---|---|
| 恢复系数曲线 | **无新点**：11-16 **85.54%**（805）→ 11-19 **114.29%**（1,138）；官方最后点仍 11-03 **123.7%** | 两个点均为 `DERIVED_NOT_DETECTOR`；11-21 无导出，不画假点 |
| 索引覆盖率变化 | **不可测**：无 GSC 覆盖率导出、无 index API；`index.json` 仍停在 11-05 | 不声称「索引恢复/恶化」；A47 继续开 |
| 人工处罚页状态 | **无新证据**：本周无 Search Console 人工措施截图/导出；本车道不猜 | K3 核验后登记；未登记前写 `UNKNOWN` |
| 下次 Google 更新窗口预测 | **不预测**：本周无经核实的官方更新公告输入 | 不编造日期；按 §0.23 留空并等下一份可核验来源 |

> 结论：本周恢复面**没有可判定的新证据**。不写「恢复中/已恢复」，也不写「处罚加重」。

---

## 3. 11-21 两个到期决策点：都不可测（含机器证据与关闭条件）

### 3.1 貼紙第七窗 — `WINDOW_NOT_AVAILABLE`

| 项 | 值 |
|---|---|
| 要求 | 数据日 **≥ 2026-11-18** |
| 现有 | 数据日 **2026-11-16**（差 **2** 天） |
| 最后读数（11-19 批 / 非今日） | 28d **179 imp / 0 clk / 29.94 位**（上批 32.58）；7d **74 imp / 0 clk / 27.55 位**；**8 读数 / 7 连改善**，首次 ≤30 |
| 已由对端交付 | daily 11-20 报「第六窗 29.94」；analyst 11-20 晚出 title 三候选讨论包 |
| 本轮动作 | **只登记 gate 已达成，不重算第七窗、不另提 title 方案、不回滚** |
| 关闭条件 | 首个数据日 ≥11-18 的新导出 ⇒ 读第七窗；28d ≤27 才把 title 讨论升级给 K3/analyst，否则继续观察 |

### 3.2 海報 / 喜帖主承接份额 — `CANNIBALIZATION_NOT_MEASURABLE`

**机器证据（不是推断）：**

1. `gsc-2026-11-19-four-window-analysis.json` 对 24h / 7d / 28d 三窗均写 `"query_page_join_available_in_workbook": false`。
2. 最新 **query×page** 表 = `GSC数据/money-kw-query-page-2026-10-31.csv`（2026-10-31 导出，即 10-31 份额基线的来源）；`gsc-query-country-28d-end1105.csv` 是 **query×country**，**不是** query×page，不能当 join 用。
3. 对端 11-21 19:08 wrap-check：query-x-page `NO_DATA` 仍为开放项，等 11-24 决策包的数据批。
4. 对端 11-20 的 `docs/assets/2026-11-20/gsc-money-queries-and-pages.json`（同一 11-19 workbook）也只有 `pages` 与 `money_queries` 两个**独立**聚合，**没有 query×page 行** ⇒ 该文件不能当 join 用。

**参考基线（**不是当前值**，不可当 11-21 份额）：** `money-kw-share-baseline-2026-10-31`：`海報印刷` blog guide **37%** / category **16%**；`喜帖印刷` product **73%** / category **27%**。

- 本轮**不写任何 11-21 份额数字**，不判"收敛/未收敛"，不提回滚。
- 关闭条件：拿到**同一窗口**的 query×page 表（或 workbook 增加 page+query sheet）⇒ 才能算「主 URL 展示份额」。

### 3.3 SMALLBATCH 7d — `DELEGATED_PEER_PENDING`

对端 `ZP-daily-content` 21:17 点火，晚于本车道 20:13；本轮不抢跑、不重复其结论。下轮若其报告存在，只读消费。

---

## 4. 9 个 READY 测量任务：同一导出 ⇒ `ALREADY_DONE`（不重测）

> 全部 `source=latest_gsc_delta`、`owner_lane=ZP-gsc-feedback`、`approval_gate=Measurement only … No automatic article/canonical/redirect`、`write_scope=[".hermes/logs/","docs/"]`、`retry_at=2026-11-21`。
> **幂等判定**：board 的 9 行全部来自 **export 2026-11-19 / 数据日 11-16**，与 11-20 轮**同 export、同 query、同 route**；11-20 轮已逐项测量并交付 ⇒ 本轮标 `ALREADY_DONE(since 2026-11-20)`，**不重算、不重报为新读数**。

| task_id（尾 8 位） | 词 | 28d imp / clk / pos | 上批 pos | Δ | 7d imp / clk / pos | 本轮 |
|---|---|---:|---:|---:|---|---|
| `…f2bc40ee31` | 海報印刷 | 186 / 1 / **20.37** | 18.24 | +2.13 | 53 / 0 / 28.02 | ALREADY_DONE |
| `…7dfc8ccac4` | 宣傳單張 | 134 / 0 / **39.39** | 38.09 | +1.30 | 28 / 0 / 46.00 | ALREADY_DONE |
| `…8ba60bd637` | 印刷 | 127 / 1 / **22.91** | 21.97 | +0.94 | 26 / 0 / 31.12 | ALREADY_DONE |
| `…4c5ebffbea` | コミケ 印刷 | 110 / 0 / **30.49** | 27.37 | +3.12 | 29 / 0 / 35.97 | ALREADY_DONE |
| `…ffa9859a1b` | 教材 印刷製本 | 57 / 0 / **43.95** | 40.00 | +3.95 | 14 / 0 / 46.36 | ALREADY_DONE |
| `…2d5ea01d64` | 易拉架印刷 | 43 / 0 / **41.63** | 40.66 | +0.97 | 12 / 0 / 39.75 | ALREADY_DONE |
| `…549df6a371` | 喜帖印刷 | 36 / 0 / **44.78** | 43.84 | +0.94 | 10 / 0 / 51.10 | ALREADY_DONE |
| `…c3807750ae` | 小冊子印刷 | 14 / 0 / **17.93** | 11.92 | +6.01 | 5 / 0 / 28.00 | ALREADY_DONE（小样本） |
| `…cdc0931dc4` | 證書印刷 | 9 / 0 / **12.22** | 10.78 | +1.44 | 3 / 0 / 15.00 | ALREADY_DONE（小样本） |

- **方向不变**：7d 6 恶化 / 3 改善 / 1 无基线；28d 8 恶化 / 1 改善（贴纸）。今日**不重发**这些结论，只作继承基线。
- **交接字段**：每项的 `owner_lane / baseline / approval_gate / retry_at / production_deploy(null) / online_verify(null) / retest / exit_criteria` 均随 `task_id` 保留在协同板，本车道**未改写**；`approval_gate` 仍为 “Measurement only … No automatic article/canonical/redirect”。
- **派单纪律**：九项维持 `MEASURE`；不改队列 status、不写 FIX/SCALE/STOP、不发内容任务。
- **A67 复发 3**：board `baseline.window` 仍写 `2026-10-14..2026-11-10`，行数据实为 `2026-10-20..2026-11-16`。板由 builder 生成，本轮不手改。

---

## 5. 今日新增生产变更 → 两个实验的 confounder（本轮最重要新增）

### 5.1 事实（对端报告互证，非推测）

`2026-11-21-P1-truth-batch-execution.md` §5：**19:50 push `origin main 13:32→c93cb09d`**，三 commit 一次 build：

| commit | 内容（对端原文要点） | 与本车道关系 |
|---|---|---|
| `6e48429b` | comiket truth 补漏 | 与 ja 同人簇相关 |
| `2521140` | **海报簇博文旧价清毒**：`poster-printing-price-guide` title 由「HK$9起」改为常青价标题（title-equiv **55**，50-57 合规）、description/重点摘要/数据洞察/价格表对齐 A2 真值（HK$16/张起、10 张 HK$160、100 张 HK$561、常规 1-2 工作天）；`poster-size-guide` 三处价格与 CTA 交期改正；`blog-posts.ts` zh-hk title 镜像同步 | **直接落在 `EXP-1108-POSTER-PRIMARY-URL` 的竞争臂** |
| `c93cb09d` | ja 教育/C109 真值批：campus 退款/USD/SLA 无源承诺清除、`doujin-circle-printing-guide` 订单价「1 冊 ¥7,500 起」→「ご注文 ¥7,500〜」、school exercise desc/SLA 调整、comiket prep 复核零改 | 与 `EXP-1108-JA-DOUJINSHI-UNIT` 同变量族，扩到第二页 |

**线上核验（对端 19:57）**：zh price-guide `<title>` 已是新标题 **HIT**；meta description 仍旧值（CF 传播中）；正文锚点与 ja 同人句待下一窗口复验。**本轮不把它记成完整 online_verify。**

### 5.2 为什么这会打坏 12-04 的判决（单变量铁律）

`EXP-1108-POSTER-PRIMARY-URL` 的实验前提（K3 2026-11-08 01:38 拍板）= **主承接改为 `/zh-hk/category/posters/`，指南退居选购辅助**，复测看「份额是否向 category 收敛」。

- 11-19 批数据日 **11-16**，在 19:50 之前 ⇒ **今天的读数干净**，不受影响。
- 但 11-22 起任何一个 7d/28d 窗都会包含 **11-21 的博文 title + 价格改写**。如果 blog 臂的 CTR/位次因此上升，份额变化就**不能**再归因于 11-08 的 URL 决策 ⇒ **双变量**。
- 而 workbook **三窗都没有 query×page join**，无法把 category 与 blog 分开 ⇒ 即使等到 12-04（28d 82.1%），也**无法**做单变量判决。
- 因此：**默认 HOLD**（契约 §7.3.4「证据不足一律 HOLD」），**不回滚、不改实验 verdict、不新建实验**（因为没有可测量的 per-URL 单元，建了就是假承诺）。

### 5.3 ja 同人：同变量族，但是「第二页」

`EXP-1108-JA-DOUJINSHI-UNIT` 的原变量 = 11-08「订单起价单位 /部→/注文」。今天 `c93cb09d` 把 `doujin-circle-printing-guide` 的「1 冊 ¥7,500 起」改成「ご注文 ¥7,500〜」——**同一变量族**，但落在**另一页**。影响：

- 聚合查询读数仍可作方向（`コミケ 印刷` 28d 30.49、7d 35.97，均在深位）；
- per-page 归因同样需要 join；C109 季窗（12-29..31）前不做经营结论。

### 5.4 本轮做了什么 / 没做什么

| 做 | 不做 |
|---|---|
| 在 ledger 两个实验条目**追加 `confounders`**（additive，不动 verdict/approval/retest） | 不改实验 verdict、不写 APPROVED、不新建实验 |
| 在 `retest_gate_2026_11_21` 记 `post_window_confounders` + `upstream_change_events` | 不评价该 title 改动的战略对错（不是本车道职权） |
| 在报告与 anomaly JSON 记 A72（P1） | 不据此回滚任何已部署内容 |

---

## 6. 异常状态迁移

### 6.1 今日关闭 / 改进 / 维持

| ID | 上轮 | **11-21** | 依据 |
|---|---|---|---|
| **A63** | STILL_OPEN | **IMPROVED_ONE_CLEAN_IGNITION_11_20_NOT_CLOSED** | 11-20 20:22:01 有完整自然点火：dsh 0 / wrapper 0 / PARTIAL / pushed / head `fb62b52b`；今日 preflight 全过且 dsh 在跑。但 `LastTaskResult` 不可读（pwsh 禁用）、`run-context.scheduler_recovery=NOT_PROVEN`、对端 19:08 警告 21:17/23:47 凭据风险 ⇒ **不写「调度已恢复」** |
| **A66** | CLOSED_VERIFIED_11_19 | **CLOSED_NO_NEW_BATCH_TO_TEST** | 11-19 delta 的 7d 块仍为 `previous_11_16/current_11_19`；今日无新 delta 可再验 |
| **A64** | CLOSED_FALSE_POSITIVE | **维持** | `SESSION_LOCK.md` 无活动锁（顶部 11-14 已释放） |

### 6.2 继续开（恶化计数）

| ID | 11-20 | **11-21** | 依据 |
|---|---|---|---|
| **A1 DATA_STALE** | 92.2h | **STILL_OPEN_116.2H** | 数据日 11-16；>72h 且 +24h |
| **A2 FROZEN_24H** | DAY5 | **DAY6** | 24h 窗止 11-18T20 = 72.2h |
| **A36 XLSX_NOT_REFRESHED** | RECURRENCE_4 | **RECURRENCE_5** | 缺 11-13/14/15/17/18/20/21 共 7 个自然日（工作日 5 个） |
| **A44 DETECTOR_RUNTIME** | DAY17 | **DAY18** | `gsc-cliff-*` 止于 11-03 |
| **A47 GSC_INDEX** | 6 批 | **OPEN_6_BATCHES_DAY16** | `lastBuild=11-05`；11-07..11-19 六批未收录 |
| **A54 GEO_PROBE** | 17D | **18D** | 队列 `next_check=2026-11-03`；owner 两写未决 |
| **A58 LEDGER data_supply** | DAY10 + 矛盾 | **DAY11 + 矛盾** | 机器字段 `BROKEN_DAY6 / latest_xlsx=11-07`，同块 `note_1119` 已承认 11-19 到位 |
| **A65 WINDOW KEYED ON EXPORT DATE** | 1 日漂移已证 | **STILL_OPEN_NEW_PROOF** | `dilution_table` 的 `export_date 2026-11-21` 行写「7d 100% / 28d 39.3%」，但 20:13 无 11-21 导出 ⇒ **该行今日不可兑现**（第三个实例） |
| **A67 BOARD WINDOW MISLABEL** | RECURRENCE_2 | **RECURRENCE_3** | 板 `baseline.window=10-14..11-10`，行=10-20..11-16 |
| **A68 NO_INDEPENDENT_QA** | IMPROVED_NOT_CLOSED | **维持** | 只有四窗内两法，无独立 QA 档 |

### 6.3 carry（无新证据，不改对端）

`A69`（C109 导航簇 167 imp / 0 clk，交 monthly/AEO，禁 title 修）、`A70`（7d 点击 144→130 二次下降，需页级 join；**11-21 的改动在窗口外，不能解释 A70**）、`A45`/`A46`/`A48`/`A49`/`A50`/`A52`/`A55`/`A57`/`A59`/`A60`/`A62` 全部维持，不改写对端。

### 6.4 今日新开

| ID | 级别 | 要点 | recovery_plan |
|---|---|---|---|
| **A71 `DECISION_POINTS_11_21_INPUTS_ABSENT`** | P1 | 两个 11-21 决策点同时缺输入：数据日差 2 天 + 全部 workbook 无 query×page join（最新 query×page 表止 **2026-10-31**） | `modify_payload`（owner=K3/host）：补导出 + 提供当前 join；期间不推断 |
| **A72 `POSTER_BLOG_POST_WINDOW_CONFOUNDER`** | P1 | 19:50 `2521140`/`c93cb09d` 在数据日 11-16 之后改海报博文 title/价格与 ja 同人订单措辞；11-19 读数干净，但 11-22 起双变量 | `request_human`（K3/monthly）：12-04 该实验无 join ⇒ **HOLD**；不回滚、不改 verdict |

---

## 7. 三条队列（只做证据，不翻状态、不派单）

### 7.1 机会队列

| ID | 状态 | 11-21 证据 |
|---|---|---|
| **OPP-01 页一零点击池** | **CARRY_60_ROWS** | 11-19 批 60 行（前 10 行 658 imp / 0 clk）；`食品包裝印刷` 已有 SERP（peer 11-19），`a1海報` 1.0 位 0 点击仍是最尖锐异常；本批无新档，不重算 |
| **OPP-02 新进页一** | **NO_NEW_DATA** | 无新批可判 |
| **OPP-03 两窗改善** | **GATE_MET_PEER_DELIVERED** | 貼紙 29.94 / 8 读数 / 7 连改善；第七窗待数据日 ≥11-18 |
| **OPP-04 产品摘要结构** | **MEASURE → monthly** | 无新结构数据 |
| **OPP-05 市场 CTR 差** | **CARRY** | HK 2.4807% / JP 1.4567% / US 0.9302%（28d，三表独立聚合） |
| **OPP-06 单页零点击** | **CARRY_OBSERVATION** | `/zh-hk/blog/design-file-specs/` 549 imp / 0 clk / 5.89；无 SERP/真值，不派单 |

### 7.2 退场候选（停止追加投入 ≠ 删页/noindex）

- **无新增退场**。`EXIT-01 教材` / `EXIT-03 a2 poster` / `EXIT-04 コミケ` / `EXIT-08 海報印刷` 维持 `DEEPENING_MEASURE` / `SEASONAL_HOLD_UNDER_REVIEW`：证据是「深位化」，**不是「部署失败」**。
- 28d 仍只有 **8/28（C1）/ 7/28（C2）** 在变更后 ⇒ 窗口移动不是实验胜负；**不得**回滚已部署真值。

### 7.3 内耗候选（仍是假设，无当前 join）

| ID | 状态 | 证据 |
|---|---|---|
| **IF-01 posters** | **CURRENT_JOIN_STILL_ABSENT** | 11-19 页面级独立聚合（category 329 / blog 1,194 / product a2 825 / a1 317）**不可 join**；份额 `CANNIBALIZATION_NOT_MEASURABLE` |
| **IF-03 stickers** | **GATE_MET_NOT_RESOLVED** | 29.94；title 讨论由 peer/K3，12-04 窗判 |
| **IF-05 海报主承接** | **K3_REVIEW_AT_12_04** | 份额未收敛则不回滚；**今日新增 A72：博文改 title 使份额归因更难** ⇒ 默认 HOLD |
| **IF-02 / IF-04** | carry | 无新页级证据 |

---

## 8. K3 升级（6 个决策点，均可一句话拍板）

### D1 · 🔴 P0 数据面：缺 11-20/11-21，数据日 11-16（116.2h），join 仍缺

> **事实**：最新 11-19 批数据日 **11-16**、**116.2h**；缺 11-13/14/15/17/18/20/21；3mo 缺 6 批；API `end1105`（**404.2h**）；detector **18 日**空；index 落后 **6** 批；workbook 三窗 `query_page_join_available_in_workbook=false`。
> **推荐 (A)**：补 **11-20 + 11-21 + 11-17/18**（顺手补 11-13/14/15）的 24h/7d/28d/3mo（全国家、网页搜索）→ 重启 7892 代理 → host 跑：

```powershell
cd F:\zprintpro-nextjs
python scripts\fetch_gsc_data.py --dimensions query,page,country --days 28 --end 2026-11-21
python scripts\gsc-cliff-detector.py
node scripts\rebuild-gsc-index.mjs --write
powershell -NoProfile -Command "Get-ScheduledTaskInfo -TaskName ZP-gsc-feedback,ZP-daily-content,ZP-monthly-matrix,ZP-k3-review | Format-List TaskName,LastRunTime,LastTaskResult,NextRunTime"
```

> 备选 (B)：只补 11-20/21 三档先解 72h，join 仍缺 ⇒ 份额继续不可测；(C) 等自然导出 —— 不推荐，会把 12-04 判决一起拖成非决策级。

### D2 · 🟠 P1 稀释表按 `data_day` 记键（A65，第三个实例）

> **事实**：`dilution_table` 的 `export_date 2026-11-21` 行写「7d 100% / 28d 39.3%」，但 20:13 **无 11-21 导出**；11-18 行同样从未兑现。表按 export_date 记键 ⇒ 每次晚 1-2 个导出。
> **推荐 (A)**：改为 `data_day → 百分比`；决策点写「首个数据日 ≥11-14（C1 7d）/ ≥11-16（C2 7d）/ ≥11-22（C1 14d）/ ≥11-23（C2 14d）」。备选 (B) 继续按导出日 ⇒ 反复「到期但不可判」；(C) 取消百分比只留方向 ⇒ 丢失 100% 窗纪律。

### D3 · 🟠 P1 调度凭据 / 配额（A63）

> **事实**：11-20 是**一次干净自然点火**（dsh 0 / wrapper 0 / PARTIAL / pushed）；但 11-19 是 dsh 配额失败；今日 17:49 manual 车道 preflight `DEEPSEEK_API_KEY absent` 被 BLOCKED；对端 19:08 警告今晚 21:17/23:47 仍依赖计划任务进程内 key。`LastTaskResult` 本轮不可读。
> **推荐 (A)**：K3-admin 跑一次 `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-dsh-scheduler-credential.ps1` 固化凭据，并确认 11-21 20:13 / 21:17 / 23:47 三轮点火；**在四方验收前不写「调度已恢复」**。备选 (B) 只充值不修 S4U ⇒ 今晚仍可能复发。

### D4 · 🟡 P2 协同板窗口标签（A67，复发 3）

> **事实**：板 9 任务 `baseline.window=2026-10-14..2026-11-10`，行数据来自 **10-20..11-16**；数值与 delta 一致，仅窗口标签旧。
> **推荐 (A)**：板构建器把 `baseline.window` 与 row 同源（同一 JSON 的 current window），生成时断言 window 与 data_day 匹配；本轮不手改板。

### D5 · 🟡 P2 账本 `data_supply` 自相矛盾（A58）+ 独立 QA（A68）

> **事实**：`data_supply.status=BROKEN_DAY6 / latest_xlsx=2026-11-07`，同块 `note_1119` 已写「11-19 三窗到位」；11-19 仍无独立 workbook QA（只有四窗内两法）。
> **推荐 (A)**：账本 owner（manual session）同步 `status/latest_xlsx/updated_at` 与 note，分析生成器每批输出 QA 文件；本车道**不改**这两块（只追加 gate）。

### D6 · 🟠 P1 **NEW**：海报博文 11-21 改 title 的单变量归属（A72）

> **事实**：19:50 `2521140` 改了 `poster-printing-price-guide` 的 title（title-equiv 55）、价格与 description；`c93cb09d` 改了 ja 同人订单措辞。两者均在数据日 11-16 之后，**不污染 11-19 读数**，但使 `EXP-1108-POSTER-PRIMARY-URL` 从 11-22 起变成「URL 决策 + 博文改写」双变量；workbook 无 join ⇒ 无法拆。
> **推荐 (A) 默认 = 12-04 该实验 HOLD**（证据不足一律 HOLD；不回滚、不删页、不改 verdict、不新建不可测实验），除非届时拿到当前 query×page join 能把 category / blog 拆开。备选 (B) 以 11-21 为新基线重开实验 ⇒ 丢失 11-08 信号且需 K3 拍板；(C) 直接判「博文改写成功/失败」⇒ 无 join，属造结论，禁止。

### 非阻塞 carry

- **A47 index**：6 批未收录，门童 #9 会把新档判「不存在」。
- **A54 GEO 探针**：逾期 18 天，owner 冲突未决；本轮不声称已复测、不写 AI 引用增长/下降。
- **ZP-k3-review**：lane-status 11-15..11-21 连续 **MISSING**（07:10 无 run/无报告）；本车道**不声称它已在跑**；需 K3 管理员按 §0.35.6 注册/点火后由看门狗四方验收。
- **ZP-weekly-meta 11-20 FAILED**（guard 拦 9 个 production files）：对端 19:08 wrap-check 记「已由 `b2eaf643` 对账关闭（两法一致，撞车防护按设计生效，无工作丢失）」⇒ 本轮只登记，不重复派修。
- **§0.0 名片解禁块 (a)/(b)/(c)** 仍未裁 → 继续零触碰（不建页、不改 301、不动贺卡资产）。
- **执行层不自批**：队列 `WAITING_K3 / SCHEDULED` 项一律不翻状态。
- **Host 提醒**：最后已知 push = **19:50**（`c93cb09d`）⇒ §0.25 的 30min 窗口 = **20:20**；本轮 20:13 起跑，host 收尾时若早于 20:20，请按 §0.25.8 commit 留本地、不阻塞。另有 22 个他会话 src 档自述 0 commit/0 push，**请路径级 `git add`，勿整树提交**。

---

## 9. 跨车道与写盘隔离

| 今日他方写入 | 时间 | 本轮处置 |
|---|---|---|
| P1 真值批（海报博文 + ja 教育/C109，push `c93cb09d`） | 17:47–20:05 | **只读**；登记 A72 confounder；不重做、不评价 |
| wrap-check 19:08（query-x-page NO_DATA / 凭据风险） | 19:08 | **只读**；作 A71/A63 证据 |
| PRICE-DEBT-BIGBATCH / RUSH-PAGE-TRUTH（22 档，0 commit，gate 未跑） | 17:xx–20:0x | **只读**；标 `UNVERIFIED_NOT_COUNTED_AS_DEPLOYED` |
| manual-p1-truth-batch preflight BLOCKED | 17:49 | **只读**；作 A63 证据 |
| `strategy-task-queue.json` / `coordination-board.json` / `lane-status.json` / `lane-runs.jsonl` / `GSC数据/index.json` | host / builder | **零手改**；队列状态零翻转 |
| `src/`、title/desc、canonical/301、blog-data、CSV/生成器、`docs/`、`GSC数据/` | — | **零触碰** |

**本轮写盘**：3 个文件 —— 本报告、`gsc-daily-anomaly-2026-11-21.json`、账本（追加 gate + 两个 `confounders`）。无覆盖、无 `.failure.md`、无 `src/`、无 `docs/`、无队列/总线改写。
**Git**：commit/push 由 host-side wrapper 在本 lane 退出后执行；本轮不声称已提交，也不声称 19:50 的 push 由本车道完成。

---

## 10. 下一验证点

| 日期 / 条件 | 验什么 | 通过标准 / 失败动作 |
|---|---|---|
| **首个新导出** | 数据供给恢复 | 有 24h/7d/28d 且数据日 ≥11-18 ⇒ 可读第七窗；否则 A1 继续开；新导出必须标 `LATE_ARRIVAL_BACKFILL` |
| **首个数据日 ≥11-18** | 貼紙第七窗 + 9 词新读数 | 28d ≤27 ⇒ title 讨论升级（K3/analyst）；否则继续观察 |
| **任一时刻拿到当前 query×page join** | 海报/喜帖主承接份额 | 能算 category vs blog 份额 ⇒ 才可判「收敛」；否则 `CANNIBALIZATION_NOT_MEASURABLE` |
| **数据日 ≥11-22 / ≥11-23** | C1 / C2 14d 干净窗 | 14d 才看方向；不足 14d 维持技术读数；此窗起包含 11-21 生产变更 ⇒ 双变量 |
| **2026-11-28** | small batch sticker（US 英文 SERP + 同口径 28d） | SERP 记录成功，或 `SERP_UNAVAILABLE`；不编造 |
| **2026-12-01** | monthly 自然触发 | 有 run 记录 + 月报告；否则 dead_letter |
| **2026-12-04** | 28d 82.1% 变更后 | 才可 SCALE/HOLD/FIX/STOP；**海报主承接实验无 join ⇒ HOLD**；六件齐才 SCALE |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先查前序实现路径：11-20 报告（11-19 批 / 9 任务 / 首个 100% 7d 窗）→ 今日无新导出 → 对端 19:50 push 三 commit。据此本轮**做**数据供给闸门 + 决策点裁决 + confounder 登记，**不做** 11-19 批二次测量、不做贴纸 title 重做、不做份额推断。
- [x] **2. 约束适用范围？** 契约 §6.1（gsc 只给任务/不改页）⇒ 零 `src/`、零 title/desc、零 canonical/301；§7.2（不改队列状态）⇒ 零翻转；§8.3/8.6（只写自己条目/不自批）⇒ 账本仅追加 gate + 两个自有实验的 confounders；§8.4（窗口纪律）⇒ 7d 只技术、28d 28.6% 一律背景，不出 SCALE/HOLD/FIX/STOP；§8.8（数据供给）⇒ 复测标 BLOCKED；§0.23（数字只来自真值）；§0.37（不接 GA4/008/订单）；§0.0（名片只接单不建页）；§0.35.7（零 src 写入，无需人手锁）。
- [x] **3. 原数据/拍板来源？** ① 来源：`gsc-2026-11-19-four-window-analysis.json` / `gsc-2026-11-19-money-keyword-delta.json`、11-16 对照、`gsc-cliff-2026-11-03.json`、`lane-status` 19:13、`coordination-board` 20:13、ledger、对端 11-21 五份报告；② 真数据：无 11-20/21 导出（三法）、数据日 11-16、116.2h、join flag=false ×3、19:50 push 三 commit 与对端互证；③ 留/撤：**零数据撤回**；两项口径更正（时龄统一基、A65 11-21 行 UNREALIZED）均标为口径说明，不改历史报告。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入；价格/MOQ 仅引用对端已部署真值，不新增价格声明。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告与 JSON 台账；无 user-facing 文本，不触发 `parseInlineLinks`。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-21 20:13:02, preflight ok/10-10, lock pid 16108, retry_queue 1 [FOLLOW_UP_PARTIAL], key b93ef5a6fc086a2d) · lane-status.json (2026-11-21 19:13, 1.0h, bus_records 141, verdict ATTENTION, problems 2)
- 协同板: coordination-board.json (2026-11-21T20:13:02+0800, 9 READY GSC-MEASURE owner=ZP-gsc-feedback, baseline source=11-19 delta, baseline.window 标签错位 A67)
- GSC 权威窗口: gsc-2026-11-19-four-window-analysis.json (24h 21/1138/1.8453/14.1649 window 11-17T21..11-18T20; 7d 130/8283/1.5695/15.5229 window 11-10..11-16; 28d 554/27879/1.9872/14.9511 window 10-20..11-16; 3mo carried 1279/65252/1.9601/17.355 window 08-01..10-31; query_page_join_available_in_workbook=false ×3; page1_zero_click_pool 60 rows; two_method_reconciliation 11-19 all_match=true)
- GSC 词级: gsc-2026-11-19-money-keyword-delta.json (28d 八导出 10-30..11-19: 海報 186/20.37; 宣傳單張 134/39.39; 喜帖 36/44.78; 小冊子 14/17.93; 證書 9/12.22; 易拉架 43/41.63; 教材 57/43.95; コミケ 110/30.49; 印刷 127/22.91; 貼紙 179/29.94; 7d block keys previous_11_16/current_11_19)
- 对照批: gsc-2026-11-16-four-window-analysis.json + gsc-2026-11-16-money-keyword-delta.json (7d 144/8103; 28d 544/26350; country CTR HK 2.4798/JP 1.6427/US 0.9952)
- 恢复链: gsc-cliff-2026-11-03.json (977 / 789.8 = 123.7%, full-country) · 派生 11-19 1138 / (27879/28=995.6786) = 114.29% (DERIVED_NOT_DETECTOR, UNCHANGED)
- 数据供给: GSC数据/ 153 文件, 最新 = 2026-11-19 24h/7d/28d; 3mo = 2026-11-03; 最新 query×page 表 = money-kw-query-page-2026-10-31.csv (2026-10-31); API query×country = gsc-query-country-28d-end1105.csv (数据日 11-04, 非 join); index.json lastBuild 2026-11-05 07:38 / latestFreshData 2026-11-03; 文件名 glob 2026-11-2* = 0 命中
- 份额基线(非当前): money-kw-share-baseline-2026-10-31.md/.json (海報 blog 37%/category 16%; 喜帖 product 73%/category 27%; 2026-10-31 query x page)
- 对端: 2026-11-20-ZP-gsc-feedback.md (上轮真实 PARTIAL) · 2026-11-20-ZP-daily-content.md (貼紙 29.94 第六窗) · 2026-11-21-P1-truth-batch-execution.md (19:50 push c93cb09d / 2521140 海报博文 / ja 同人措辞 / 线上 19:57 title HIT) · 2026-11-21-wrap-check-evening.md (query-x-page NO_DATA; 凭据风险) · 2026-11-21-PRICE-DEBT-BIGBATCH.md + RUSH-PAGE-TRUTH.md (22 档 0 commit, gate NOT EXECUTED) · 2026-11-21-manual-p1-truth-batch.md (17:49 BLOCKED)
- 账本: flywheel-learning-ledger.json (读取时 updated_at 2026-11-19 23:25; 本轮追加 retest_gate_2026_11_21 + 两实验 confounders + updated_at/update_log)
- 调度真值: lane-status 19:13 (11-20 20:22:01 dsh 0/wrapper 0/PARTIAL/pushed/fb62b52b; 11-19 dsh FAILED) · run-context.scheduler_recovery=NOT_PROVEN · SESSION_LOCK.md 顶部 11-14 已释放, 无活动锁
- 环境: pwsh 计算面禁用 (v9.4, 不重试) ⇒ detector/API/index/tsc/门禁/xlsx 重解析/schtasks/git 未实跑 (仅一次只读 Get-Content 读板头部); commit/push 由 host wrapper 兜底 (最后已知 push 19:50 ⇒ 30min 窗口 20:20)
校准状态: 🟢 已校准 (2026-11-21) — 无新导出三法一致 / 数据日 11-16 / 116.2h / join flag=false / 19:50 push 三 commit 互证 / KPI 与 11-20 同源同值 = 一手直读或可复算; 🟡 9 词方向 = 25/28 重叠 + 8/28 变更后 (今日不重测); 🟡 份额 = 10-31 基线仅参考; 🔴 独立 QA 缺失 (A68) / detector 18 日空 / 当前 join 缺失
撤回声明: 无数据撤回。两项口径更正（非撤回）: ① 时龄统一基准为「窗口终点 / 数据日次日 00:00」，上轮 3mo/API 用「数据日 00:00」基，同基对比均为 +24h；② ledger dilution_table 的 export_date 2026-11-21 行今日不可兑现，记 A65，不改表。
口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用增长结论 (A54); 零客户可见内容写入。**无老站 z-printpro.com 对比基线** —— 现有 GSC 档均为新站 zprintpro.com 属性 (§0.30.9 显式声明)。
```

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 「今日 KPI」 | **不存在**；最新仍是 11-19 批 / 数据日 11-16（116.2h） |
| 2 | 11-20/11-21 导出 | **不存在**（三法一致）；不是「没找到」 |
| 3 | 貼紙第七窗 | **不可读**（数据日差 2 天）；11-19 的 29.94 不是第七窗 |
| 4 | 海报/喜帖份额 | **不可算**（三窗 join flag=false；最新 query×page 表止 10-31）；10-31 基线仅参考 |
| 5 | 9 个 READY 任务 | 本轮 **ALREADY_DONE**，非新测量；表中数值是继承基线 |
| 6 | A72 的判决影响 | 只能定性「双变量 + 需 join」；**不能**断言博文改写会升/降份额 |
| 7 | 19:50 上线 | 仅有 title HIT（19:57）；meta description 仍旧、正文锚点未验 ⇒ 不是完整 online_verify |
| 8 | 22 档待提交 src | 对端自述 0 commit/0 push；**未用 git 核实**，一律不计入 deployed |
| 9 | 恢复系数 114.29% | 11-19 单日、`DERIVED_NOT_DETECTOR`、detector 18 日未跑；今日无新点 |
| 10 | 7d/28d 方向 | 25/28 重叠、仅 8/28 变更后、单周季节；只作背景，不作实验胜负 |
| 11 | 调度器 | 11-20 一次干净点火 ≠ 已恢复；`LastTaskResult` 不可读；今晚仍可能复发 |
| 12 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在 lane 退出后写入；本报告只声称 ③ 报告 + ④ 20:13 preflight 持锁 |
| 13 | 飞轮账本 | 只追加 gate + 两个 `confounders`；`data_supply` / `window_math` / `scheduler_truth` 仍为旧值，交 owner |
| 14 | 对端文件 | 今日 5 份人手报告、11-20 报告、11-19 GSC JSON、队列/板/锁文件全部零改写 |
| 15 | 贴纸里程碑 | 29.94 由 daily 11-20 与 analyst 讨论包先交付；本车道只补测量层，不主张 title 结论 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7/§8 + 2026-11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块 + sop-10-gate）· 2026-11-21 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
