# 2026-11-20 · ZP-gsc-feedback 车道报告（11-19 批首次消费（数据日 11-16）· **首个 100% 变更后 7d 窗成立（C1/C2 各 7/7）** · 9 个 READY 测量任务全部「深位化」· 28d 仍 28.6% 变更后 = BACKGROUND_ONLY · 零页面写入）

VERDICT: PARTIAL
RECOVERY: **114.29% — `DERIVED_NOT_DETECTOR`**（11-19 批 24h **1,138** ÷ 同批 28d 日均 **995.6786**；窗口止 **11-18T20**，批龄 **48.2h**，**不是 detector 读数**）
RECOVERY_SERIES: full-country：10-29 **105.8%**（793，官方）→ 10-30 **117.7%**（888，官方）→ 11-03 **123.7%**（977，最后官方）→ 11-07 **96.98%**（803，DERIVED）→ 11-10 **130.0%**（1,124，DERIVED）→ 11-11 **105.3%**（940，DERIVED）→ 11-12 **63.93%**（578，DERIVED）→ 11-16 **85.54%**（805，DERIVED）→ **11-19 114.29%**（1,138，DERIVED/NEW）
RECOVERY_STREAK: **0/3**（官方点 10-29 / 10-30 / 11-03 不连续；derived 不计入）
RECOVERY_SERIES_NOTE: 10-12..10-28 的官方点沿用 11-03 前报告与 `gsc-cliff-2026-10-*` 档案，本轮**未重算**（detector 自 11-04 起无档）；为避免手抄漂移，本行只声明来源、不复制数字
RECOVERY_FLAG: **114.29% 是 11-19 批单日读数，且 24h 窗含 11-18 生产变更约 20h、跨工作日单点**；**不判恢复完成、不判 CRITICAL_CLIFF**（detector 连续 **17** 日无档）
DATA_STATUS: **NEW_BATCH_2026_11_19_CONSUMED**（24h/7d/28d；**无 3mo**）— 7d/28d 数据日 **2026-11-16**（lag 3），时龄 **92.2h > 72h**
DATA_GATE: **STALE_92.2H**（24h 48.2h；7d/28d 92.2h；3mo 500.2h；API 404.2h；detector 17 日空；index 落后 **6** 批）
KPI_UPDATED: **true（export 2026-11-19 / 数据日 2026-11-16）**
RETEST_WINDOW: **FIRST_CLEAN_7D（C1 7/7=100%，C2 7/7=100%）→ 技术读数**；**28d C1 8/28=28.6% / C2 7/28=25.0% ⇒ BACKGROUND_ONLY**
PAGE_WRITES: 0
CONSUMED: `.hermes/logs/run-context-ZP-gsc-feedback.json` @ **2026-11-20 20:13:01**（preflight **ok / 10-10**；lock pid 26932；`retry_queue` **3** 项 = 1 RETRY_OF + 2 UNRESOLVED_DAY；本键 `323b32262db4c17c`；prev bus = 11-19 20:13:05 FAILED）| `.hermes/logs/lane-status.json` @ **2026-11-20 04:57**（**15.3h，新鲜**；bus_records **131**；verdict=ATTENTION；problems=7；gsc 11-14 PARTIAL / 11-15–17 MISSING / 11-18 FAILED / 11-19 FAILED / 11-20 PENDING；scheduler `Last=11-19 20:13:01 / Result=1`）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6.1/6.2/6.3/6.4/7.1–7.4/**§8**）| `zprintpro-gsc-feedback-loop.md`（11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块）+ `sop-10-gate.md` | `.hermes/logs/coordination-board.json` @ 20:13:02（**9 个 READY 测量任务**，全部 owner=本车道）| **`gsc-2026-11-19-four-window-analysis.json`**（权威窗口 + KPI + country/page 聚合 + page-1 池 + `two_method_reconciliation`）| **`gsc-2026-11-19-money-keyword-delta.json`**（28d 八导出序列 + 7d 块 `previous_11_16/current_11_19`）| `gsc-2026-11-16-*`（上批对照）| `gsc-cliff-2026-11-03.json` | `GSC数据/index.json` + `GSC数据/` 清单 | `.hermes/logs/flywheel-learning-ledger.json` @ 11-19 23:25（只读条目；**仅追加 `retest_gate_2026_11_20`**）| 对端 `2026-11-18-ZP-gsc-feedback.md` / `2026-11-19-ZP-gsc-feedback.failure.md` / `2026-11-20-ZP-daily-content.md` / `discussion-input-2026-11-21-sticker-title-eval.md` / `serp-evidence-2026-11-19-food-packaging.md` / `periodic-review-weekly-2026-11-13.json` | `SESSION_LOCK.md` 顶部
DELIVERED: `.hermes/logs/2026-11-20-ZP-gsc-feedback.md`, `.hermes/logs/gsc-daily-anomaly-2026-11-20.json`, `.hermes/logs/flywheel-learning-ledger.json`（**只加 `retest_gate_2026_11_20` 块**，未改任何既有条目 verdict / `data_supply` / `window_math`）
NEXT: **11-21** 貼紙第七窗（需数据日 ≥11-18）＋ 海报/喜帖主承接份额（需**当前** query×page join，否则仍 `CANNIBALIZATION_NOT_MEASURABLE`）＋ SMALLBATCH 7d（对端 daily）→ **下一个数据日 ≥11-18 的导出**读第七窗 → **数据日 ≥11-22/11-23** 才到 C1/C2 的 14d 干净窗 → **12-01** monthly → **12-04** 28d 82.1% 首个经营判决窗。**K3 动作 D1**：补 11-20（+ 缺的 11-13/14/15/17/18）四档、重启 7892 代理、跑 detector、重建 index；**D2** 复测表按 data_day 记键（A65）；**D3** 调度 `Result=1` 与 dsh 配额；**D4** 协同板窗口标签（A67）；**D5** 账本 `data_supply` 自相矛盾 + 独立 QA 生成器（A58/A68）
RETRY_OF: **`ZP-gsc-feedback-20261119T201305-35628`**（dsh exit 1 / model execution failed before host finalize）→ 本轮**重做测量**（新导出 11-19 + 9 个 READY 任务 + 100% 7d 窗审计），**不重写 11-19 的 `.failure.md`**；另两项 `UNRESOLVED_DAY(2026-11-18 / 2026-11-19)` 见 §1.1：11-18 是 guard 拦提交（`candidate_files=[]`，本轮零 `src/`），11-19 是同一 dsh 失败，已由本轮真实交付闭合
IDEMPOTENCY: `323b32262db4c17c`（day 2026-11-20 / intent=`11-19 批首次消费 + 9 个 READY 测量 + 首个 100% 7d 窗审计` / target=`export 2026-11-19（数据日 11-16）+ 9 词`）；与上轮 `e0e52600e993ad2a` 不同 ⇒ 换日 + 换目标，合法新工作；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，**不含本键**
STATUS_GATE: **FRESH**（lane-status 15.3h；problems=7 全为调度器残留 + MISSING 日行，**不据此派内容修复**）
COVERAGE: **LATE_ARRIVAL_BACKFILL(11-19) + KPI_11_19 + NINE_READY_MEASURE + FIRST_100PCT_7D_WINDOW(AUDIT) + PAGE1_ZERO_CLICK_POOL(60 ROWS) + C109_NAV_CLUSTER + STICKER_GATE_CROSS(PEER_CONFIRMED) + EIGHT_LOCK_WORDS(CARRY) + RECOVERY_DERIVED(11-19) + ANOMALY_STATE(+A69/A70)**
CONFIDENCE: **HIGH**（export=11-19 / 数据日 11-16 / 92.2h / lag 3 / 8 条 28d 序列 / CTR 手算 / `two_method_reconciliation` 11-19 all_match=true / 11-20 无新档三法）· **MEDIUM**（7d 窗与上窗重叠 4/7、单周季节、28d 仅 28.6% 变更后）· **LOW**（任何因果、部署成效、恢复/排名改善结论；query×page join 缺失）
RUN: 定时 20:13 轮；**未调用 pwsh 计算面**（detector/API/index/tsc/门禁/xlsx 重解析/schtasks 均未实跑；仅文件直读 + 手算复算）；**零 `src/`、零 title/desc、零 canonical/301、零队列状态翻转、零历史报告改写**

> **为什么是 `PARTIAL` 而不是 `OK`**：本轮有真实新增交付（11-19 批 KPI 首次消费 + 9 个 READY 任务测量 + **首个 100% 变更后 7d 窗**的技术审计 + 异常分类 + 复测 gate），但数据面仍未达 72h 门禁（数据日 11-16 = **92.2h**）、无 11-20 导出、3mo 连续 **6** 批缺、11-21 份额检查所需 query×page join 仍不存在。写 `OK` 等于把「92.2h 的批 + 28.6% 的 28d 窗」冒充「今日决策级结论」。
>
> **为什么不是 `NO_OP`**：本轮有实质新增（KPI 层首次交付 + 9 条测量 + 4 条异常状态迁移 + 账本 gate 改写为 TECHNICAL_ONLY），不是「有证据的合法无变更退出」。

---

## 0. 一句话结论

**今天最值钱的事实是：ledger 一直在等的「首个 100% 变更后 7d 窗」终于成立了——但它是 11-19 批（数据日 11-16），不是 ledger 表里写的 11-18；而 28d 仍只有 28.6% 变更后，所以 7d 只能做技术读数，不能做经营判决。**

三件新事实：

1. **C1/C2 的 7d 窗都已 100% 变更后**：7d 窗 `11-10..11-16`，C1（11-08）7/7、C2（11-09 12:44）7/7。这是 11-08 部署以来**第一个**干净 7d 窗（11-18 报告时的 85.7%/64.3% 已翻篇）。
2. **技术读数不好看**：9 个可测实验中 **6 个 7d 位次继续恶化**、3 个改善（其中 2 个仅改善 <3 位且仍在 44–51 位）、1 个无基线；28d 则是 **8 恶化 / 1 改善**（唯一改善=貼紙印刷 32.58→29.94，首次破 ≤30）。但 28d 只有 28.6% 变更后 ⇒ **只作背景**。
3. **9 个 READY 词全部「深位化」加深**：28d 位次 **12.22–44.78**，9 词合计点击 **2**（海報 1 + 印刷 1）。在 12–45 位谈 title/desc 改写没有证据；**本批零派单**。

同时如实登记两处新异常：**A69** 28d 首页零点击池里出现 `c109 日期 / c109 時間 / c109 配置 / c109 doujin / c109 comiket` 五条**活动导航型**查询（合计 167 展示 / 0 点击 / 位次 3.92–9.78），不能当商品页 CTR 失败；**A70** 7d 点击连续两个读数下降（144→130）而展示上升（+180），CTR −0.2076pp，需按页级 join 归因，不得直接改 title。

---

## 1. STEP 0 · 结果总线消费与 retry 裁决（第 -1 优先级）

### 1.1 `retry_queue` 三项的逐条裁决

| 项 | 事实 | 本轮裁决 |
|---|---|---|
| **RETRY_OF** `ZP-gsc-feedback-20261119T201305-35628` | 11-19 20:13 dsh exit=1，模型执行在 host finalize 前失败；报告为 AUTO-FILL `.failure.md` | **本轮即其重试**：以新导出 11-19 重跑测量与报告；**不覆盖/不改写** `.failure.md`；报告首段已写 `RETRY_OF` |
| **UNRESOLVED_DAY 2026-11-18** | `FAILED`，notes：「pre-commit guard rejected 1 production files; guard blocked src commit」，`candidate_files` 为空 | **不重写 11-18 报告**（它是真实 PARTIAL 交付：报告 + anomaly JSON + ledger gate 块）。该 guard 告警**无候选文件**，且 lane-status 自注「console log 可能混入人手会话输出」；本车道 11-18/11-20 均**零 `src/` 写入** ⇒ 按「不重犯」处理：本轮改动只落 `.hermes/logs/`，不产生可被 src guard 拦截的文件；若 11-18 三件仍未进 commit，由 host wrapper 随本轮一并提交 |
| **UNRESOLVED_DAY 2026-11-19** | 与 RETRY_OF 同一根因（dsh 失败），无真实交付 | 由本报告真实交付闭合；`state` 由 FAILED → completed（host 写总线） |

### 1.2 幂等与锁

- 本键 `323b32262db4c17c` ≠ 上轮 `e0e52600e993ad2a`；换日 + 换目标（11-19 批 vs 11-18 的 11-16 批）⇒ 合法新工作。`warnings` 4 条 DUPLICATE 不含本键。
- preflight `ok`，10/10 checks（含 `dsh_effective_provider_model=deepseek-official/deepseek-flash`）；`lane.lock` 由本轮持有（pid 26932）；`SESSION_LOCK.md` 顶部是 **11-14 16:3x 已释放**，历史 10-23/11-10 的「持有中」行均有对应释放条目（A64 本轮更正为**误报**，见 §6.1）。本轮**零 `src/` 写入**，不触发 §0.35.7 双条件写入门。
- **协同板构建成功**（`generated_at=2026-11-20T20:13:02+0800`），**9 个 READY 测量任务**全部 `owner_lane=ZP-gsc-feedback`；六项上游输入 `available:true` ⇒ 不触发「协同板失败必须 BLOCKED」。`SERP_UNAVAILABLE` 按板规保留，不猜真实展示标题/摘要。

### 1.3 本次「不重做」清单（幂等铁律）

- **不重做** 11-18 的 11-16 批 KPI 与六任务测量（其 verdict=PARTIAL 已交付，只做本轮 11-19 批的**新**读数）。
- **不重写** 11-14 / 11-18 / 11-19 任何报告、anomaly JSON、ledger 旧块。
- **不重做** 貼紙 title 评估：`discussion-input-2026-11-21-sticker-title-eval.md`（11-20 晚，analyst）已交付三候选与 SERP 结构；`serp-evidence-2026-11-19-food-packaging.md`（11-19 02:2x，weekly-meta）已交付食品包裝 SERP。本车道**只做测量层引用**，不重写、不另起 title 提案。
- **不改写** `strategy-task-queue.json`、`lane-status.json`、`lane-runs.jsonl`、`GSC数据/index.json`、任何 `gsc-2026-11-*` 分析 JSON、`coordination-board.json`、任何对端报告、`src/`、`docs/`。

### 1.4 对端与跨车道避让

| 今日他方动作 | 证据 | 本轮处置 |
|---|---|---|
| `2026-11-20-ZP-daily-content.md`（18:17，VERDICT OK / 内容层 NO_OP；11-21 复测窗预备；貼紙 29.94「第六窗」） | 文件本体（今日唯一写入的 .hermes/logs 对端车道报告） | **只读**；貼紙里程碑标 `ALREADY_REPORTED_BY_PEER`，本车道只补 28d/7d 测量层，不抢 title 决策 |
| `discussion-input-2026-11-21-sticker-title-eval.md`（11-20 晚，analyst） | 文件本体；含 11-20 受控浏览器真 SERP | **只读**；不重做 title 三候选，不改其结论 |
| `serp-evidence-2026-11-19-food-packaging.md`（11-19 02:2x，weekly-meta） | 文件本体；SERP 内嵌 GSC 125/0/7.93 与 delta 精确行互证 | **只读**；把 `食品包裝印刷` 标 `SERP_CAPTURED_PROPOSAL_PENDING_K3`，不再请求 SERP |
| 11-19 三档 xlsx + 两份分析 JSON | `GSC数据/` 清单；`gsc-2026-11-19-*` | **只读消费**；双方法只做比对，不改文件 |
| `flywheel-learning-ledger.json`（11-19 23:25，manual-session round7） | 账本 | **仅追加 `retest_gate_2026_11_20`**；未改 `data_supply` / `window_math` / `scheduler_truth` / `counters` / 他车道条目 |

> `run-context.sibling_lanes` 写 daily=`PENDING 21:17`，但 daily 实际已在 **18:17** 跑完并写报告 ⇒ 快照有采集盲点（与 11-18 同型）。本轮据「文件是否被写」避让，而不是据快照状态。

---

## 2. 数据面：11-19 是三窗新批，但仍差 1 天到 72h

### 2.1 四平面账本（时龄按「数据日次日 00:00」起算，20:13 基准）

| 平面 | 最新档 | 窗口 / 数据日 | 时龄 @20:13 | 判定 |
|---|---|---|---|---|
| xlsx 24h | **11-19** | 11-17T21 → **11-18T20** | **48.2h** | 非今日；单日 |
| xlsx 7d | **11-19** | 11-10 → **11-16** | **92.2h** | **> 72h ⇒ STALE（A1 继续开）** |
| xlsx 28d | **11-19** | 10-20 → **11-16** | **92.2h** | 同上；C1 仅 **8/28**、C2 **7/28** 在变更后 |
| xlsx 3mo | **11-03（carried）** | 08-01 → **10-31** | **500.2h** | 连续第 **6** 批缺（11-07/10/11/12/16/19） |
| API query×country | `gsc-query-country-28d-end1105.csv` | 数据日 **11-04** | **404.2h** | STALE；7892 代理未复 |
| detector | **无 11-04..11-20 档** | 最后 = 11-03 | **17 日空** | `available:false`；pwsh 计算禁用，不重试 |
| index.json | `lastBuild=11-05 07:38` | `latestFreshData=11-03` | 落后 **6 批** | **A47 复发 6**；门童 #9 会误判 |

- **「11-20 无导出」三方法**：① `GSC数据/*2026-11-2*` 文件名 0 命中（最新 11-19 三档）；② `gsc-2026-11-2*` 分析产物 0 命中；③ 对端 daily 11-20 明记「11-20 无导出」。不是「没找到」，是**文件不存在**。
- **11-19 是 11-16 之后唯一一批，且此前从未被本车道消费**：11-19 20:13 轮 dsh 失败（无报告）；11-20 daily 只消费了其中「貼紙 29.94」一行 + SERP 记录。Q1（KPI 层 + 9 READY 任务）本轮是**首次**交付。
- **口径**：11-19 导出 → 7d/28d 数据日 **11-16（lag 3）**；与 11-16 批（lag 3）一致，但 **lag 仍非常量**（11-12 批 lag 2）。任何「导出日 − 固定值」写法继续不成立（A57/A65）。
- **`index.json` 自述 `FRESH` 是 11-05 构建时的旧值**，且 `stalenessDays=2` 与 `latestFreshData=11-03` 自相矛盾；不得引用为今日新鲜度。
- **落盘义务 / detector（§K.1.2 + 恢复模式 STEP 0.5）**：本轮**未执行** —— pwsh 计算面在 lane 沙箱禁用（v9.4，不重试），故未写 `gsc-fresh-2026-11-20.json`、未改 `GSC数据/index.json`、未运行 `gsc-cliff-detector.py`；本轮读数取自 K3 投放的 11-19 xlsx 与分析 JSON。恢复系数按既有派生口径计算并标 `DERIVED_NOT_DETECTOR`；K3 恢复动作见 D1。

### 2.2 11-19 批 KPI（首次交付，非今日读数）

| 档 | 窗口 | 点击 | 展示 | CTR | 平均排名 | 时龄 | 状态 |
|---|---|---:|---:|---:|---:|---|---|
| 24h | 11-17T21 → 11-18T20 | **21** | **1,138** | 1.8453% | 14.1649 | 48.2h | FROZEN |
| 7d | 11-10 → 11-16 | **130** | **8,283** | 1.5695% | 15.5229 | 92.2h | **STALE / 100% 变更后** |
| 28d | 10-20 → 11-16 | **554** | **27,879** | 1.9872% | 14.9511 | 92.2h | **STALE / BACKGROUND_ONLY** |
| 3mo | 08-01 → 10-31（11-03 档） | 1,279 | 65,252 | 1.9601% | 17.3550 | 500.2h | CARRIED |

**上批（11-16）→ 本批（11-19）**（7d 重叠 4/7、28d 重叠 25/28，只作方向）

| 档 | Δ点击 | Δ展示 | ΔCTR | Δ排名（正=退） |
|---|---:|---:|---:|---:|
| 24h | **+9** | +333 | +0.3546pp | **−4.139（进）** |
| 7d | **−14（−9.72%）** | +180（+2.22%） | **−0.2076pp** | **+1.1792（退）** |
| 28d | **+10（+1.84%）** | +1,529（+5.80%） | **−0.0773pp** | **+0.271（退）** |

- **口径**：24h 是单日（且含 11-18 变更约 20h）⇒ 只作健康信号；7d/28d 是「展示继续增加、点击/CTR 回落、位次略退」。**不得**写成「恢复/胜出」，也**不得**写成「全站崩塌」。
- **双方法**：手算 CTR 21/1,138=1.8453%、130/8,283=1.5695%、554/27,879=1.9872%，与 JSON 一致；第二方法 = 四窗 JSON 自带 `two_method_reconciliation["2026-11-19"]`（7d：130/8,283/15.5229、28d：554/27,879/14.9511，method_1 与 method_2 完全一致，`reconciliation_all_match=true`）。**但仍无独立的 workbook QA 文件**（11-12 有 54/54；11-19 无）⇒ A68 只算「改进未闭合」。

---

## 3. 首个 100% 变更后 7d 窗：成立，但只能做技术读数

### 3.1 算式（按 data_day，不按 export_date）

| 变更 | 日期 | 可用 7d 窗 11-10..11-16 的变更后天数 | 可用 28d 窗 10-20..11-16 |
|---|---|---|---|
| **C1** 部署（74ffa5a9 / 9acc3d16） | 2026-11-08 | **7/7 = 100%** | **8/28 = 28.6%** |
| **C2** 改动（a33abd3b / 392c5f30） | 2026-11-09 12:44 | **7/7 = 100%** | **7/28 = 25.0%** |

- 这是 11-08 部署以来**第一个** 7d 全变更后窗。11-18 报告时的 85.7%（C1）/64.3%（C2）已被本批取代。
- **11-18 的生产变更不在本 7d 窗内**（窗止 11-16）；它只进 24h 窗（约 20h）⇒ 只能污染 24h 读数，不能用来解释 7d。
- **28d 仍 `BACKGROUND_ONLY`**：C1 28.6%、C2 25.0%；经营判决窗仍是 **12-04（导出日口径；若按 A65 改 data_day 记键，对应数据日约 12-01，82.1%）**。
- **纪律**：§8.4「7 天只验技术、14 天看方向、28 天才允许 SCALE/HOLD/FIX/STOP」。**本报告不出任何经营结论，不改任何实验 entry 的 verdict。**

### 3.2 十个实验的 7d 技术读数（28d 仅背景）

| 实验 | 词 | 7d 位次 上→本（Δ） | 28d 位次 上→本（Δ） | 28d 点击 | 读数 |
|---|---|---|---:|---|
| **EXP-1108-FLYERS-CLUSTER** | 宣傳單張 | 45.10 → **46.00**（+0.90） | 38.09 → **39.39**（+1.30） | 0 | 7d 恶化；28d **7 步连续恶化**（8 读数） |
| **EXP-1108-POSTER-PRIMARY-URL** | 海報印刷 | 23.77 → **28.02**（+4.25） | 18.24 → **20.37**（+2.13） | 1 | 7d 恶化；28d **11-03 后 6 步连续恶化**（7 读数）；`印海報` 7d +1.99 / 28d +0.43 |
| **EXP-1108-WEDDING-PRIMARY-URL** | 喜帖印刷 | 51.62 → **51.10**（−0.52） | 43.84 → **44.78**（+0.94） | 0 | 7d 微好但仍在 51 位；28d 恶化 |
| **EXP-1108-JA-DOUJINSHI-UNIT** | コミケ 印刷 | 25.08 → **35.97**（+10.89） | 27.37 → **30.49**（+3.12） | 0 | 7d 大幅恶化；28d 7 步连续恶化；C109（12-29..31）在前 |
| **EXP-1108-JA-TEXTBOOK-PRICE** | 教材 印刷製本 | 49.29 → **46.36**（−2.93） | 40.00 → **43.95**（+3.95） | 0 | 7d 改善但仍 46 位；28d 恶化 |
| **EXP-1108-EN-A2-POSTER** | a2 poster | 40.08 → **45.80**（+5.72） | 43.02 → **43.39**（+0.37） | 1 | 7d 恶化；28d 首次近乎持平但**不是止跌**（43 位平台） |
| **EXP-1109-CATALOG-EN-H1** | china catalog printing | 13.65 → **21.30**（+7.65） | 13.98 → **14.99**（+1.01） | 0 | 7d 跌出前 20；28d 仍 15 位、0 点击 |
| **EXP-1109-CATALOG-DESC** | 畫冊印刷 / カタログ印刷 | — | — | — | **NO_CURRENT_BASELINE**（两词均无 focus 行，不推断） |
| **EXP-STICKER-THIRD-WINDOW** | 貼紙印刷 | 28.73 → **27.55**（−1.18） | 32.58 → **29.94**（−2.64） | 0 | **唯一明确改善**；28d 首次 ≤30（8 读数 / 7 连改善） |
| **EXP-BOOKS-DUAL-PAGE** | 書刊印刷 / 印書 | 35.91→**38.60**（+2.69）/ 31.87→**33.80**（+1.93） | 33.83→**35.45**（+1.62）/ 31.84→**32.16**（+0.32） | 0 | 7d 恶化；28d 深位平稳 |

- **计数**：7d **6 恶化 / 3 改善 / 1 无基线**；28d **8 恶化 / 1 改善**（贴纸）。3 个「改善」里，喜帖（51.10）与教材（46.36）仍在 44–51 位，只有贴纸有「≤30」的实质门槛意义。
- **7d 样本限制**：7d 单行 2–74 imp；7d 窗与上窗重叠 **4/7**；单周季节 + C109 季前效应未分离 ⇒ 7d 只证明「技术层没有出现进首页级位移」，**不证明**部署失败。
- **结论**：C1/C2 部署后第一个完整 7 天窗内，**没有出现「进入首页」级位移**；唯一门槛级改善是贴纸（29.94）。是否延续，必须等 **14d（数据日 ≥11-22/23）** 与 **28d（12-04）**。

---

## 4. 九个 READY 测量任务（数据日 2026-11-16）

> 全部 `source=latest_gsc_delta`、`owner_lane=ZP-gsc-feedback`、`approval_gate=Measurement only … No automatic article/canonical/redirect`、`write_scope=[".hermes/logs/","docs/"]`、`retry_at=2026-11-20`。本轮**只写 `.hermes/logs/`**，`docs/` 未动。
> 共同口径：**all-country query rows；无 query×page/country join**；28d 序列 = 8 个导出、相邻窗重叠 25/28。

### 4.1 汇总（28d 读数 = 数据日 11-16）

| task_id | 词 | 28d imp / clk / CTR / pos | 上批 pos | Δ | 7d imp / clk / pos（上批） | 方向 |
|---|---|---|---|---|---|---|
| `…f2bc40ee31` | **海報印刷** | 186 / 1 / 0.5376% / **20.37** | 18.24 | +2.13 | 53 / 0 / 28.02（23.77） | 11-03 后 6 步连续恶化 |
| `…7dfc8ccac4` | **宣傳單張** | 134 / 0 / 0% / **39.39** | 38.09 | +1.30 | 28 / 0 / 46.00（45.10） | 7 步连续恶化 |
| `…8ba60bd637` | **印刷** | 127 / 1 / 0.7874% / **22.91** | 21.97 | +0.94 | 26 / 0 / 31.12（28.00） | 两窗恶化（最新 STABLE） |
| `…4c5ebffbea` | **コミケ 印刷** | 110 / 0 / 0% / **30.49** | 27.37 | +3.12 | 29 / 0 / 35.97（25.08） | 7 步连续恶化 |
| `…ffa9859a1b` | **教材 印刷製本** | 57 / 0 / 0% / **43.95** | 40.00 | +3.95 | 14 / 0 / 46.36（49.29） | 7 步连续恶化（7d 微好） |
| `…2d5ea01d64` | **易拉架印刷** | 43 / 0 / 0% / **41.63** | 40.66 | +0.97 | 12 / 0 / 39.75（31.17） | 40 位饱和后继续退 |
| `…549df6a371` | **喜帖印刷** | 36 / 0 / 0% / **44.78** | 43.84 | +0.94 | 10 / 0 / 51.10（51.62） | 两窗恶化（7d 微好） |
| `…c3807750ae` | **小冊子印刷** | 14 / 0 / 0% / **17.93** | 11.92 | +6.01 | 5 / 0 / 28.00（16.50） | 两窗恶化；样本极小 |
| `…cdc0931dc4` | **證書印刷** | 9 / 0 / 0% / **12.22** | 10.78 | +1.44 | 3 / 0 / 15.00（12.00） | 两窗恶化；样本极小 |

- 9 词各自独立成行，**不做跨词相加**（避免口径漂移）；点击合计 **2**（海報 1 + 印刷 1）。
- **深位口径**：8 词在 17.93–44.78 位，唯一接近首页的是 `證書印刷` 12.22（仅 9 imp）与 `小冊子印刷` 17.93（仅 14 imp）⇒ **样本不足以支撑 FIX**。
- **本批零派单**：九项全写 `MEASURE`，不写 FIX/SCALE/STOP，不改队列任何 status（契约 §6.1 / §7.2 / §8.4）。

### 4.2 逐任务要点（契约 §6.2 字段）

| 项 | TARGET / 证据 | ACTION / NEXT_CHECK |
|---|---|---|
| **A · 海報印刷** | 28d 8 导出 286→278→261→248→224→206→187→**186**；位次 14.94→…→18.24→**20.37**；clk 恒 1。当前 join 缺失；11-21 份额检查到期 | **MEASURE**；11-21 用**当前** join 复测 category/blog 份额；不改 title。`SERP_UNAVAILABLE`（该词无 SERP 记录）；`CANNIBALIZATION_NOT_MEASURABLE` |
| **B · 宣傳單張** | 28d imp 117→121→127→129→137→136→135→**134**；位次 29.37→…→38.09→**39.39**；0 click 全程 | **MEASURE**；11-21 复读；若仍 >38 由 monthly 判「品类页 vs 指南页门」；不改价、不改 title |
| **C · 印刷** | 28d imp 35→61→78→92→104→110→122→**127**；位次 22.03→19.8→…→21.97→**22.91**；clk 恒 1 | **MEASURE**；查询集扩张（imp +263%）与位次回退并存 ⇒ 记录 mix expansion，不判部署失败 |
| **D · コミケ 印刷** | 28d 173→170→163→146→134→129→119→**110**；位次 18.99→…→27.37→**30.49**；0 click；C109 = 12-29..31 | **MEASURE**；与 blog-deepfix 的 JA-C109 真值任务**分离**（文本真值≠排名救援）；C109 季窗（12 月）复读 |
| **E · 教材 印刷製本** | 28d imp 39→46→51→53→57→56→58→**57**；位次 20.69→…→40.00→**43.95**；0 click | **MEASURE**；30+ 位且 0 click 进 monthly 簇诊断；**不套用** `教科書印刷` churn 规则 |
| **F · 易拉架印刷** | 28d imp 42→48→44→44→44→40→41→**43**；位次 35.31→…→40.66→**41.63**；0 click | **MEASURE**；40+ 位饱和，若 12 月仍 40+ 由 monthly 判「roll-up 类目页是否为正确门」 |
| **G · 喜帖印刷** | 28d imp 15→10→16→23→26→27→32→**36**；位次 16.13→29.4→…→43.84→**44.78**；0 click | **MEASURE**；与海报同批（11-08 主承接 URL），11-21 份额检查一并复读；不回滚 |
| **H · 小冊子印刷** | 28d 52→45→34→29→25→24→13→**14**；位次 10.60→…→11.92→**17.93**（单步 +6.01）；7d 仅 5 imp | **MEASURE**；**样本闸门**：14 imp / 5 imp 不足以判「跌出首页」；先记 `SMALL_SAMPLE_UNSTABLE`，不派 FIX |
| **I · 證書印刷** | 28d 7→7→9→9→8→7→9→**9**；位次 10.00→…→10.78→**12.22**；0 click | **MEASURE**；9 imp 的 +1.44 位变化不构成 striking 机会；等 ≥30 imp 再判 |

---

## 5. 首页零点击池 / C109 导航簇 / 贴纸里程碑 / 市场 CTR

### 5.1 28d 首页零点击池：60 行（≥5 imp）

`page1_zero_click_pool_28d` 本批 **60 行**（11-18 报告的「4 词」是 focus 子集口径，不可与全池比较 ⇒ 本节改报全池，避免口径漂移）。

| # | 词 | imp | clk | pos | 备注 |
|---|---|---:|---:|---:|---|
| 1 | **c109 日期** | 131 | 0 | 9.54 | 活动导航型（见 5.2） |
| 2 | **食品包裝印刷** | 125 | 0 | 7.93 | **SERP 已取证**（peer 11-19），P-a/P-b/P-c 待 K3 |
| 3 | **a1海報** | 85 | 0 | 1.00 | 第 1 位 0 点击 = snippet/意图错位候选（需 SERP） |
| 4 | **食品印刷** | 72 | 0 | 5.01 | 需 SERP |
| 5 | **大信封** | 52 | 0 | 4.38 | 需 SERP |
| 6 | **餐牌印刷** | 44 | 0 | 9.20 | 需 SERP |
| 7 | 即日急件 | 39 | 0 | 8.26 | 需 SERP |
| 8 | 澳門易拉架size | 39 | 0 | 5.49 | 规格型，非采购页 |
| 9 | ステッカー 小ロット | 37 | 0 | 7.16 | ja 小批量，采购型 |
| 10 | alipay flash collect | 34 | 0 | 3.26 | 支付/活动词，非印刷 |

- **前 10 行合计 658 展示 / 0 点击**（131+125+85+72+52+44+39+39+37+34）。
- **交接**：交 **ZP-weekly-meta** 作 FIX 候选输入；但必须先有真实 SERP + 真值门禁（§7.2 / 11-13 块）。本车道**不写 title、不派单**。`食品包裝印刷` 已有 SERP 记录（peer），`a1海報` / `食品印刷` / `大信封` / `餐牌印刷` 仍 `SERP_UNAVAILABLE`。

### 5.2 A69 · C109 活动导航簇（新）

| 词 | imp | clk | pos |
|---|---:|---:|---:|
| c109 日期 | 131 | 0 | 9.54 |
| c109 doujin | 13 | 0 | 3.92 |
| c109 時間 | 9 | 0 | 9.78 |
| c109 配置 | 7 | 0 | 7.29 |
| c109 comiket | 7 | 0 | 10.00 |
| **合计** | **167** | **0** | — |

- **读法**：这是「展会日期/时间/配置」的**导航型**查询簇，不是商品采购意图；它在首页但 0 点击是**答案已满足**的自然结果，**不能**当商品页 CTR 失败，也**不能**用 title 改写给这一簇「救点击」。
- **交接**：交 monthly/AEO（事件页 `comiket-c109` 的结构化答案 + 日期/场馆直答块），非 weekly title。

### 5.3 貼紙印刷：≈30 线首次达成（**PEER 已交付**）

| 导出 | 10-30 | 11-03 | 11-07 | 11-10 | 11-11 | 11-12 | 11-16 | **11-19** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 28d pos | 40.88 | 38.06 | 37.65 | 35.35 | 34.58 | 34.35 | 32.58 | **29.94** |
| 28d imp | 120 | 127 | 131 | 139 | 142 | 136 | 148 | **179** |
| clk | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| 7d pos | — | — | — | — | — | — | 28.73 | **27.55**（74 imp） |

- **8 个读数、7 步连续改善**；**首次 ≤30（29.94）**，7d 也 27.55。全程 0 点击 = 第 3 页位置的自然结果，不是 title CTR 缺陷（peer 讨论包已作此判读）。
- **状态**：`ALREADY_REPORTED_BY_PEER`（daily 11-20 报「第六窗 29.94」；analyst 11-20 晚出 title 三候选讨论输入）。**本车道不重写、不另提 title 方案**；只登记 gate 已达成，第七窗（需数据日 ≥11-18）交由 11-21 轮。

### 5.4 市场 CTR（28d，searcher location，非 locale 业绩）

| 国家/地区 | imp | clk | CTR | pos | 上批 CTR |
|---|---:|---:|---:|---:|---:|
| 中国香港 | 15,923 | 395 | 2.4807% | 13.93 | 2.4798% |
| 日本 | 3,707 | 54 | **1.4567%** | 23.03 | 1.6427%（−0.1860pp） |
| 美国 | 3,225 | 30 | **0.9302%** | 15.90 | 0.9952%（−0.0655pp） |

- 三表是**独立聚合**，不与总 KPI 相加/相除；country = 搜索者位置，不是站点 locale 业绩。日/美 CTR 回落只作月度输入，不派单。

### 5.5 任务 J 八锁词（本周节奏：11-18 已交付，今日 CARRY）

任务 J 的追踪节奏是**每周**；本周已在 11-18 报告交付 8 词全表。今日只更新与 9 个 READY/贴纸重叠的三词，其余 5 词**不重复抄录**（幂等）：

| 词 | 28d imp | clk | pos | 上批（11-16） | 今日动作 |
|---|---:|---:|---:|---|---|
| 即日印刷 | 55 | 2 | **8.58** | 58 / 2 / 8.28 | CARRY（唯一页一词，位次略退 0.30） |
| 宣傳單張 | 134 | 0 | **39.39** | 135 / 0 / 38.09 | 见 §4（7 步连续恶化） |
| 貼紙印刷 | 179 | 0 | **29.94** | 148 / 0 / 32.58 | 见 §5.3（gate 达成，PEER 已交付） |
| 包裝盒印刷 / 紙盒印刷 / 包裝盒訂製 / 書刊印刷 / 騎馬釘書刊 | — | — | — | 11-18 报告 | **不重测**（本周已交付；下周自然轮） |

- 红线不变：**不改 slug、不砍页、不回滚已部署 title**；贴纸 title 决策由 peer/K3，不在本车道。

---

## 6. 异常状态迁移

### 6.1 今日关闭 / 改进

| ID | 上轮状态 | **11-20** | 依据 |
|---|---|---|---|
| **A66 MONEY_7D_BLOCK_KEYS_STALE** | REGRESSION_2026_11_16 | **CLOSED_VERIFIED_11_19** | 11-19 delta 的 7d 块全部按 `previous_11_16` / `current_11_19` 命名；对 `previous_11_11` 与 `current_11_12` 的 grep = **0**；值链与四窗 7d 窗 11-10..11-16 一致 |
| **A68 NO_INDEPENDENT_QA** | OPEN（11-16 无） | **IMPROVED_NOT_CLOSED** | 11-19 四窗 JSON 的 `two_method_reconciliation` 7d/28d 全部 `match=true`（两法一致）；但仍**无**独立 `workbook-independent-qa` 文件，弱于 11-12 的 54/54 |
| **A64 STALE_SESSION_LOCK_ENTRY** | STALE_DAY26（前轮判读） | **CLOSED_FALSE_POSITIVE** | 复核 `SESSION_LOCK.md`：顶部 = **11-14 16:3x 已释放**；11-10 08:3x「持有中」紧接 09:0x「✅ 释放」；10-23 13:5x「持有中」由 14:2x「✅ 已释放」收口；10-23 12:3x 由 13:0x 收口。前轮把历史 `持有中` 行当作活动锁 = 误报，本轮更正 |

### 6.2 继续开 / 复发

| ID | 11-18 状态 | **11-20** | 依据 |
|---|---|---|---|
| **A1 DATA_STALE** | STILL_OPEN（116.2h） | **STILL_OPEN（92.2h）** | 数据日 11-16，92.2h > 72h；有改善但仍未过门 |
| **A2 FROZEN_24H** | REOPENED_DAY3 | **REOPENED_DAY5** | 24h 窗止 11-18T20（48.2h），仍非「昨天/今天」 |
| **A36 XLSX_NOT_REFRESHED** | RECURRENCE_3 | **RECURRENCE_4** | 11-20 无工作簿；缺 11-13/14/15/17/18/20 六批 |
| **A44 DETECTOR_RUNTIME** | OPEN_DAY15 | **OPEN_DAY17** | `gsc-cliff-*` 止于 11-03 |
| **A47 GSC_INDEX_NOT_REBUILT** | RECURRENCE_5 | **RECURRENCE_6** | `lastBuild=11-05`；6 批未收录 |
| **A54 GEO_PROBE_OWNER_CONFLICT** | OPEN_OVERDUE_15D | **OPEN_OVERDUE_17D** | 队列 `next_check=2026-11-03`；owner 两写（gsc/weekly），仍无人跑 |
| **A58 LEDGER_DATA_SUPPLY_STALE** | STALE_DAY8 | **STALE_DAY10（且自相矛盾）** | `data_supply.status=BROKEN_DAY6 / latest_xlsx=11-07`，但同块 `note_1119` 已承认 11-19 三窗到位；机器字段与人读注记冲突 |
| **A63 SCHEDULER_REFUSED_GSC** | STILL_OPEN | **STILL_OPEN** | `Last=11-19 20:13:01 / Result=1`；11-19 是 dsh 失败（ledger 记 QUOTA Insufficient Balance），今日 20:13 入口不构成调度恢复证据 |
| **A65 DECISION_WINDOW_KEYED_ON_EXPORT_DATE** | NEW P1 | **STILL_OPEN（1 日漂移已实证）** | dilution 表把 export 11-18 标为 100% 7d；实际首个 100% 是 **export 11-19**（数据日 11-16）。表仍按 export_date 记键 |
| **A67 BOARD_BASELINE_WINDOW_MISLABEL** | NEW P2 | **RECURRENCE_2** | 板 9 任务 `baseline.window=2026-10-14..2026-11-10`，行数据来自 **10-20..11-16** |

### 6.3 今日新开

| ID | 级别 | 要点 | recovery_plan |
|---|---|---|---|
| **A69 C109_EVENT_NAV_CLUSTER_IN_PAGE1_ZERO_CLICK_POOL** | P3 | 5 条 `c109*` 查询合计 167 imp / 0 clk / 3.92–9.78 位，属活动日期/场馆导航型；不能当商品页 CTR 失败 | `modify_payload`（owner=monthly/AEO）：事件页结构化日期/场馆直答；**不得**用 title 改写给这一簇 |
| **A70 SEVEN_DAY_CLICK_DECLINE_SECOND_READ** | P2 | 7d 点击 144→**130**（−14，−9.72%）而展示 +180（+2.22%）、CTR −0.2076pp；连续第二个 7d 读数下降（11-16 为 −5） | `modify_payload`（owner=weekly-meta）：先取页级 join 与 SERP，再决定单变量；**不得**在全站层改 title；28d 仍背景 |

### 6.4 carry（无新证据，不改对端）

`A45`（派生根不替换官方根，冻结）、`A46`（已并入 A65）、`A48`（沙箱无拉数/解析能力）、`A49`（catalog 真值冲突，他车道）、`A50`（EN 页 ZH 块，观察）、`A52`/`A55`（历史措辞）、`A57`（lag 非常量，本批再确认 lag 3）、`A59`（7d 样本 2–74 imp、28d 25/28 重叠、8/28 变更后）、`A60`（11-14 retest 种子仍在，未当读数）、`A62`（并入 A65）。

---

## 7. 三条队列（只做证据，不翻状态、不派单）

### 7.1 机会队列

| ID | 状态 | 11-20 证据 |
|---|---|---|
| **OPP-01 页一零点击池** | **UPDATED_FULL_POOL（60 行）** | 前 10 行 658 imp / 0 clk；`食品包裝印刷` 已有 SERP；`a1海報` 1.0 位 0 点击是池内最尖锐的商品词异常 |
| **OPP-02 新进页一** | **NO_NEW_ENTRANT** | 60 行内无新进 >30 imp 的商品词；C109 导航簇不计入商品机会 |
| **OPP-03 两窗改善** | **GATE_MET（贴纸 29.94）** | 8 读数 / 7 连改善；**PEER 已交付**讨论输入；本车道只登记 |
| **OPP-04 产品摘要结构** | **MEASURE → monthly** | 无新结构数据 |
| **OPP-05 市场 CTR 差** | **UPDATED** | HK 2.4807% / JP 1.4567% / US 0.9302%；日、美回落 |
| **OPP-06 单页零点击** | **CARRY_OBSERVATION** | `/zh-hk/blog/design-file-specs/` 549 imp / 0 clk / 5.89（28d 页面聚合）；无 SERP/真值，不派单 |

### 7.2 退场候选（停止追加投入，不等于删页/noindex）

- **无新增退场**。`EXIT-01 教材` / `EXIT-03 a2 poster` / `EXIT-04 コミケ` / `EXIT-08 海報印刷` 维持 `DEEPENING_MEASURE` / `SEASONAL_HOLD_UNDER_REVIEW`：证据是「深位化」，**不是「部署失败」**。
- **红线**：这四个词所在 28d 窗只有 **8/28 天（C1）/ 7/28 天（C2）** 在变更后；不得把移动窗口读成实验结论，不得回滚已部署真值。
- `EXIT-04 コミケ`：7d 35.97（+10.89）、28d 30.49（+3.12），C109 季窗（12 月）前继续观察；**不得**因 7d 恶化回滚。

### 7.3 内耗候选（仍是假设，无当前 join）

| ID | 状态 | 证据 |
|---|---|---|
| **IF-01 posters** | **CURRENT_JOIN_STILL_ABSENT** | 页面级独立聚合：category/posters 329 imp / 0 clk / 37.82；blog poster guide 1,194 / 11 / 10.86；product a2-posters 825 / 18 / 12.98；product a1-posters 317 / 4 / 12.13。上批（11-16）：307/39.72、1,244/10.39、789/13.52 ⇒ category 展示 +22、位次 −1.90，blog 展示 −50、位次 +0.47。**不可 join**，份额 `CANNIBALIZATION_NOT_MEASURABLE`；11-21 需当前 join |
| **IF-03 stickers** | **GATE_MET_NOT_RESOLVED** | 貼紙 179 imp / 0 clk / 29.94；title 讨论由 peer/K3，12-04 窗判 |
| **IF-05 海报主承接** | **K3_REVIEW_CANDIDATE (11-21)** | 份额未收敛则复评「主承接 URL 选型」，**不回滚** |
| **IF-02 / IF-04** | carry | 无新页级证据 |

---

## 8. K3 升级（5 个决策点，均可一句话拍板）

### D1 · 🔴 P0 数据面仍落后：数据日 11-16（92.2h），11-20 无导出

> **事实**：最新 11-19 批数据日 **11-16**、**92.2h > 72h**；缺 11-13/14/15/17/18/20 六批；3mo 缺 **6** 批；API `end1105`（**404.2h**）；detector **17 日**空；index 落后 **6** 批。
> **推荐 (A)**：补 **11-20 + 11-17/18**（并顺手补 11-13/14/15）的 24h/7d/28d/3mo（全国家、网页搜索）+ 重启 7892 代理；随后 host 跑：

```powershell
cd F:\zprintpro-nextjs
python scripts\fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-20
python scripts\gsc-cliff-detector.py
node scripts\rebuild-gsc-index.mjs --write
powershell -NoProfile -Command "Get-ScheduledTaskInfo -TaskName ZP-gsc-feedback,ZP-daily-content,ZP-monthly-matrix,ZP-k3-review | Format-List TaskName,LastRunTime,LastTaskResult,NextRunTime"
```

> 备选 (B)：只补 11-20 三档先解 72h，7d 窗仍 100% 但无 3mo；(C) 等 11-21 自然导出 —— 不推荐，贴纸第七窗与份额检查会被一起拖成非决策级。

### D2 · 🟠 P1 复测表按 data_day 记键（A65，已实证 1 日漂移）

> **事实**：ledger `dilution_table` 写「export 2026-11-18 → 7d 100%」，实际首个 100% 是 **export 11-19（数据日 11-16）**；11-18 导出不存在。表按 export_date 记键 ⇒ 每次都晚 1 个导出。
> **推荐 (A)**：`dilution_table` 改为 `data_day → 百分比`，每次从工作簿窗读取 data_day；决策点改为「首个 data day ≥11-14（C1 7d）/ ≥11-16（C2 7d）/ ≥11-22（C1 14d）/ ≥11-23（C2 14d）」。备选 (B) 继续按导出日 ⇒ 反复「到期但不可判」；(C) 取消百分比只留方向 ⇒ 丢失 100% 窗纪律。

### D3 · 🟠 P1 调度 / dsh 配额（A63）

> **事实**：`lane-status`：`Last=2026-11-19 20:13:01 / Result=1`；11-19 为 dsh 失败（ledger `scheduler_truth.note_1119` 记 QUOTA Insufficient Balance）；11-15/16/17 无 run/无报告；今日 20:13 入口产出 preflight + 本报告，但**不构成自然调度恢复证据**。
> **推荐 (A)**：K3-admin 先处理 dsh 配额/凭据（充值或换 key），再按 `scripts/register-cron-tasks.ps1` 检查 `LogonType / RunLevel` 与 S4U canary（11-19 四方对账已备 10 分钟版修复脚本）。**在自然调度四方验收前，不写「调度已恢复」。**

### D4 · 🟡 P2 协同板窗口标签复发（A67）

> **事实**：板 9 任务 `baseline.window=2026-10-14..2026-11-10`，行数据来自 **10-20..11-16**（数值本身与 delta 一致，仅窗口标签旧）。
> **推荐 (A)**：板构建器把 `baseline.window` 与 row 同源（从同一 JSON 的 current window 取），并在生成时断言 window 与 data_day 匹配；本轮**不手改板**。

### D5 · 🟡 P2 账本 `data_supply` 自相矛盾（A58）+ 独立 QA（A68）

> **事实**：`data_supply` 机器字段仍 `BROKEN_DAY6 / latest_xlsx=2026-11-07`，但同块 `note_1119` 已写「11-19 三窗到位」；两处冲突，任何下游读机器字段都会误判。11-19 批仍**无**独立 workbook QA 文件（只有四窗内两法）。
> **推荐 (A)**：账本 owner（manual session）把 `data_supply` 的 `status/latest_xlsx/updated_at` 与 note 同步，并让分析生成器每批输出 QA 文件；本车道**不改**这两块（只追加自己的 gate 块）。

### 非阻塞 carry（不占 5 条）

- **A47 index**：6 批未收录，门童 #9 会把新档判成「不存在」。
- **A54 GEO 探针**：逾期 17 天；owner 冲突未决，本轮不声称已复测、不写 AI 引用增长/下降。
- **A64 更正**：`SESSION_LOCK.md` 无活动锁（顶部 11-14 已释放；11-10 09:0x、10-23 14:2x 均有释放条目）；前轮「10-23 持有中」是误读历史行，本轮更正为 `CLOSED_FALSE_POSITIVE`；本轮零 `src/` 写入，不需要人手锁。
- **§0.0 名片解禁块 (a)/(b)/(c)** 仍未裁 → 继续零触碰（不建页、不改 301、不动贺卡资产）。
- **执行层不自批**：队列里 `WAITING_K3 / SCHEDULED` 项（含 GEO S1）一律不翻状态。

---

## 9. 跨车道与写盘隔离

| 今日他方写入 | 时间 | 本轮处置 |
|---|---|---|
| daily 11-20 报告（OK / 内容层 NO_OP / 11-21 复测窗预备 / 貼紙 29.94） | 18:17 | **只读**；貼紙标 `ALREADY_REPORTED_BY_PEER`，不据其结论改本车道判断 |
| `discussion-input-2026-11-21-sticker-title-eval.md`（analyst） | 11-20 晚 | **只读**；不重做 title 三候选 |
| `serp-evidence-2026-11-19-food-packaging.md`（weekly-meta） | 11-19 02:2x | **只读**；食品包裝标 `SERP_CAPTURED_PROPOSAL_PENDING_K3` |
| 11-19 三档 + `gsc-2026-11-19-*` 分析 JSON | 11-19 后落地 | **只读消费**；A66/A68 只做比对，不改文件 |
| `strategy-task-queue.json` / `coordination-board.json` / `lane-status.json` / `lane-runs.jsonl` | host / 板构建器 | **零手改**；队列状态零翻转 |
| `flywheel-learning-ledger.json` | 11-19 23:25（他方） | **仅追加 `retest_gate_2026_11_20`**；未改 `data_supply` / `window_math` / `scheduler_truth` / `counters` / 他车道条目 |
| `src/`、title/desc、canonical/301、blog-data、CSV/生成器、`docs/`、`GSC数据/` | — | **零触碰** |

**本轮写盘**：3 个文件 —— 本报告、`gsc-daily-anomaly-2026-11-20.json`、账本新增块。无覆盖、无 `.failure.md`、无 `src/`、无 `docs/`、无队列/总线改写。
**Git**：commit/push 由 host-side wrapper 在本 lane 退出后执行；本轮不声称已提交。

---

## 10. 下一验证点

| 日期 / 条件 | 验什么 | 通过标准 / 失败动作 |
|---|---|---|
| **2026-11-21（自然导出）** | 贴纸第七窗（需数据日 ≥11-18） | 28d pos ≤27 ⇒ title 评估讨论升级（K3/analyst）；否则继续观察 |
| **2026-11-21** | 海报/喜帖主承接份额（需**当前** query×page join） | category 份额向 blog 收敛；否则复评选型，不回滚；无 join ⇒ `CANNIBALIZATION_NOT_MEASURABLE` |
| **2026-11-21** | SMALLBATCH 7d 复测（对端 daily） | 只读消费；不重复其结论 |
| **首个数据日 ≥11-18** | 贴纸第七窗 + 9 词新读数 | 有 24h/7d/28d 且数据日 ≥11-18 ⇒ 可判；否则 A1 继续开 |
| **首个数据日 ≥11-22 / ≥11-23** | C1 / C2 的 14d 干净窗 | 14d 才看方向；不足 14d 维持技术读数 |
| **2026-11-28** | small batch sticker（US 英文 SERP + 同口径 28d） | SERP 记录成功，或 `SERP_UNAVAILABLE`；不编造 |
| **2026-12-01** | monthly 自然触发 | 有 run 记录 + 月报告；否则 dead_letter |
| **2026-12-04 / 12-10** | 28d 82.1% / 100% 变更后 | 才可 SCALE/HOLD/FIX/STOP；六件齐才 SCALE |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先查前序实现路径：11-18 报告（11-16 批、6 任务、85.7% 窗）→ 11-19 失败（无交付）→ 11-20 daily（消費 11-19 贴纸一行）→ 11-19/11-20 peer 的 SERP 与 title 讨论包。据此本轮**做** 11-19 KPI 首次消费 + 9 任务测量 + 100% 7d 窗审计，**不做** 11-16 重交付、不做贴纸 title 重做。
- [x] **2. 约束适用范围？** 契约 §6.1（gsc 只给任务/不改页）⇒ 零 `src/`、零 title/desc、零 canonical/301；§7.2（不改队列状态）⇒ 零翻转；§8.3/§8.6（只写自己条目/不自批）⇒ 账本仅追加自己的 gate 块；§8.4（窗口纪律）⇒ 7d 只技术、28d 28.6% 一律背景，不出 SCALE/HOLD/FIX/STOP；§8.8（数据供给）⇒ 复测标 TECHNICAL_ONLY；§0.23（数字只来自真值）；§0.37（不接 GA4/008/订单）；§0.0（名片只接单不建页）；§0.35.7（零 src 写入，无需人手锁）。
- [x] **3. 原数据/拍板来源？** ① 来源：`gsc-2026-11-19-four-window-analysis.json` / `gsc-2026-11-19-money-keyword-delta.json`、11-16 对照、`gsc-cliff-2026-11-03.json`、`lane-status` 04:57、`coordination-board` 20:13、ledger 11-19 23:25；② 真数据：11-20 无导出（文件名 + 分析产物 + 对端三法）、数据日 11-16、92.2h、lag 3、8 条 28d 序列、CTR 手算一致、`two_method_reconciliation` all_match；③ 留/撤：**零数据撤回**；一项条件更正（ledger 的「export 11-18 = 首个 100% 7d」应为 export 11-19，记 A65，不改 ledger 旧块）。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入；价格/MOQ 仅作既有真值引用，不新增价格声明。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告与 JSON 台账；无 user-facing 文本，不触发 `parseInlineLinks`。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-20 20:13:01, preflight ok/10-10, lock pid 26932, retry_queue 3 [1 RETRY_OF + 2 UNRESOLVED_DAY], key 323b32262db4c17c) · lane-status.json (2026-11-20 04:57, 15.3h, bus_records 131, verdict ATTENTION, problems 7, scheduler Last 11-19 20:13:01 Result 1)
- 协同板: coordination-board.json (2026-11-20T20:13:02+0800, 9 READY GSC-MEASURE owner=ZP-gsc-feedback, baseline source=11-19 delta, baseline.window 标签错位 A67)
- GSC 权威窗口: gsc-2026-11-19-four-window-analysis.json (24h 21/1138/1.8453/14.1649 window 11-17T21..11-18T20; 7d 130/8283/1.5695/15.5229 window 11-10..11-16; 28d 554/27879/1.9872/14.9511 window 10-20..11-16; 3mo carried 1279/65252/1.9601/17.355 window 08-01..10-31; page aggregates: blog poster guide 1194/11/10.86, category posters 329/0/37.82, product a2-posters 825/18/12.98, product a1-posters 317/4/12.13; page1_zero_click_pool 60 rows; two_method_reconciliation 11-19 all_match=true)
- GSC 词级: gsc-2026-11-19-money-keyword-delta.json (28d 八导出 10-30..11-19: 海報 286..186 pos 14.94..20.37; 宣傳單張 117..134 pos 29.37..39.39; 喜帖 15..36 pos 16.13..44.78; 小冊子 52..14 pos 10.60..17.93; 證書 7..9 pos 10.00..12.22; 易拉架 42..43 pos 35.31..41.63; 教材 39..57 pos 20.69..43.95; コミケ 173..110 pos 18.99..30.49; 印刷 35..127 pos 22.03..22.91; 貼紙 120..179 pos 40.88..29.94; a2 poster 54..44 pos 17.20..43.39; china catalog 72..101 pos 15.79..14.99; 書刊 101..140 pos 32.28..35.45; 印書 52..61 pos 31.96..32.16; 7d block keys previous_11_16/current_11_19 = 108 matches, zero stale 11_11/11_12)
- 对照批: gsc-2026-11-16-four-window-analysis.json + gsc-2026-11-16-money-keyword-delta.json (country CTR HK 2.4798/JP 1.6427/US 0.9952; 7d 144/8103; 28d 544/26350)
- 恢复链: gsc-cliff-2026-11-03.json (977 / 789.8 = 123.7%, full-country) · 派生 11-19 1138 / (27879/28=995.6786) = 114.29% (DERIVED_NOT_DETECTOR)
- 数据供给: GSC数据/ 最新 = 2026-11-19 24h/7d/28d; 3mo = 2026-11-03; gsc-query-country-28d-end1105.csv (data day 11-04); GSC数据/index.json (lastBuild 11-05 07:38, latestFreshData 11-03, 6 批未收录)
- 对端: 2026-11-18-ZP-gsc-feedback.md (上轮真实 PARTIAL) · 2026-11-19-ZP-gsc-feedback.failure.md (AUTO-FILL) · 2026-11-20-ZP-daily-content.md (貼紙 29.94 / 11-21 复测预备) · discussion-input-2026-11-21-sticker-title-eval.md (title 三候选, 只读) · serp-evidence-2026-11-19-food-packaging.md (SERP+GSC 125/0/7.93 互证) · periodic-review-weekly-2026-11-13.json
- 账本: flywheel-learning-ledger.json (11-19 23:25; 10 项实验 + window_math + data_supply; 仅追加 retest_gate_2026_11_20)
- 调度真值: lane-status 04:57 (scheduler Last 11-19 20:13:01 / Result 1) · 会话锁: SESSION_LOCK.md 顶部 11-14 16:3x 已释放; 11-10/10-23 的「持有中」均有对应释放条目; 无活动锁 (A64 前轮误报, 本轮更正)
- 环境: pwsh 计算面禁用 (v9.4, 不重试) ⇒ detector/API/index/tsc/门禁/xlsx 重解析/schtasks 未实跑; commit/push 由 host wrapper 兜底
校准状态: 🟢 已校准 (2026-11-20) — export 11-19 / 数据日 11-16 / 92.2h / lag 3 / 8 条 28d 序列 / CTR 手算 / two_method_reconciliation 11-19 all_match / 11-20 无新档三法 = 一手直读或可复算; 🟡 9 词 28d 方向 = 25/28 重叠 + 窗口移动 + 8/28 变更后; 🟡 7d 单行 2–74 imp + 与上窗重叠 4/7; 🔴 独立 QA 缺失 (A68) / detector 17 日空 / 当前 query×page join 缺失
撤回声明: 无数据撤回。一项条件更正: ledger `dilution_table` 与 11-18 报告把「首个 100% 7d 窗」挂在 export_date 2026-11-18；实际 11-18 无导出，首个 100% 窗是 export 2026-11-19（数据日 11-16）。原条目与 11-18 报告均不改写，更正记 A65。另: A64「SESSION_LOCK 陈旧锁」经复核为前轮误报，更正为 CLOSED_FALSE_POSITIVE（非数据撤回）。
口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用增长结论 (A54); 零客户可见内容写入。**无老站 z-printpro.com 对比基线** —— 现有 GSC 档均为新站 zprintpro.com 属性 (§0.30.9 显式声明)。
```

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 「今日 KPI」 | 最新 = **11-19 批**，7d/28d 数据日 **11-16**（92.2h）；不是 11-20 读数 |
| 2 | 首个 100% 7d 窗 | **成立（C1/C2 各 7/7）**，但 7d 只验技术；**不出**经营结论 |
| 3 | 28d | 仅 **28.6%（C1）/25.0%（C2）** 变更后 ⇒ 一律 `BACKGROUND_ONLY`；12-04 才到 82.1% |
| 4 | 九词的「原因」 | 只有方向 + 归因缺口；无当前 query×page join、无 SERP（除食品包裝）、变更后仅 8/28 ⇒ 不判因果、不回滚 |
| 5 | 7d 数字 | 单行 2–74 imp、与上窗重叠 4/7、单周季节；只作技术读数，不作方向强弱判决 |
| 6 | 恢复系数 114.29% | 单一 24h、含 11-18 变更约 20h、`DERIVED_NOT_DETECTOR`；detector 17 日未跑 |
| 7 | 页级承接 | 只有当前独立页面聚合（category/blog/product 不可 join）；份额仍 `CANNIBALIZATION_NOT_MEASURABLE` |
| 8 | 3mo | 11-03 携带（数据日 10-31，500.2h）；缺 6 批 |
| 9 | index 新鲜度 | `index.json` 自述 FRESH/stalenessDays=2 是 11-05 旧值，与 `latestFreshData=11-03` 冲突 |
| 10 | 调度器 | 引 04:57 快照；11-19 20:13 是 dsh 失败；本轮 20:13 入口**不构成**调度恢复证据 |
| 11 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在 lane 退出后写入；本报告只声称 ③ 报告 + ④ 20:13 preflight 持锁 |
| 12 | 飞轮账本 | 仅追加 gate 块；`data_supply` / `window_math` 仍为旧值（A57/A58/A65），交 owner |
| 13 | 对端文件 | 11-18/11-19 gsc、11-20 daily、peer SERP/title 讨论包、11-19 GSC JSON、队列/板/锁文件全部零改写 |
| 14 | 独立 QA | 11-19 只有四窗内两法（all_match），无 54/54 式 workbook QA（A68） |
| 15 | 贴纸里程碑 | 29.94 由 daily 11-20 与 analyst 讨论包先交付；本车道只补测量层，不主张 title 结论 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7/§8 + 2026-11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块 + sop-10-gate）· 2026-11-20 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
