# 2026-11-18 · ZP-gsc-feedback 车道报告（11-16 批首次消费（数据日 11-13）· 六个 READY 测量任务全部「深位化」加深 · 11-18「首个 100% 7d 窗」**不成立** · 7d 块键名回归 + 无独立 QA · 零页面写入）

VERDICT: PARTIAL
RECOVERY: **85.54% — `DERIVED_NOT_DETECTOR`**（11-16 批 24h **805** ÷ 28d 日均 **941.07**；窗口止 **11-15T21**，批龄 **71.2h**，**不是今日读数**）
RECOVERY_STATUS: **DATA_STALE_NO_NEW_24H** — 11-17/18 无导出，24h 窗仍止 11-15T21；detector 未运行（pwsh 计算面禁用）
RECOVERY_SERIES: full-country：10-29 **105.8%**（793）→ 10-30 **117.7%**（888）→ 11-03 **123.7%**（977，最后官方）→ 11-07 **96.98%**（803，DERIVED）→ 11-10 **130.0%**（1,124，DERIVED）→ 11-11 **105.3%**（940，DERIVED）→ 11-12 **63.93%**（578，DERIVED）→ **11-16 85.54%**（805，DERIVED/NEW）
RECOVERY_STREAK: **0/3**（官方点 10-29 / 10-30 / 11-03 不连续；derived 不计入）
RECOVERY_FLAG: **85.54% 回到 11-11 量级，但仍 <90%**；单日、跨周末（11-14 周六 22:00 → 11-15 周日 21:00）、无 detector 校验 ⇒ **不判恢复、不判 CRITICAL_CLIFF**
DATA_STATUS: **NO_NEW_BATCH_2026_11_17_OR_11_18** — 最新 = **11-16 批（24h/7d/28d；本车道为 KPI 层首次消费者）**；7d/28d 数据日 **11-13**，时龄 **116.2h > 72h** ⇒ **A1 继续开**
DATA_GATE: **STALE_116.2H**（24h 71.2h；3mo 452.2h；API 356.2h；detector 连续 **15** 日空；index 落后 **5 批**）
KPI_UPDATED: **true（仅限 export 2026-11-16；数据日 11-13）**
RETEST_11_18: **DIRECTION_ONLY_NOT_DECISION_GRADE** — 7d 变更后 **85.7%（C1）/ 64.3%（C2）**、28d **21.4% / 17.9%**；不是 ledger 假设的 100%
PAGE_WRITES: 0
CONSUMED: `.hermes/logs/run-context-ZP-gsc-feedback.json` @ **2026-11-18 20:13:02**（preflight **ok / 10-10**；lock pid 36912；`retry_queue` **1** 项 FOLLOW_UP_PARTIAL；本键 `5b809ee47c5e6b03`；prev bus = 11-14 20:20:26 PARTIAL）| `.hermes/logs/lane-status.json` @ **2026-11-18 18:17**（**1.9h，新鲜**；bus_records **126**；verdict=ATTENTION；problems=9；gsc 11-13/15/16/17 **MISSING**、11-14 PARTIAL；scheduler `Last=11-17 23:44:52 / Result=2147946720`）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6.1/6.2/6.3/6.4/7.1-7.4/**§8**）| `zprintpro-gsc-feedback-loop.md`（11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块）+ `sop-10-gate.md` | `.hermes/logs/coordination-board.json` @ 20:13:03（**6 个 READY 测量任务**，全部 owner=本车道）| **`gsc-2026-11-16-four-window-analysis.json`**（权威窗口 + KPI + 国家/页面聚合）| **`gsc-2026-11-16-money-keyword-delta.json`**（28d 七导出序列 + 7d 块）| `gsc-2026-11-12-*`（上一批对照 + A53 键名比对 + 54/54 QA）| `gsc-cliff-2026-11-03.json` | `gsc-2026-11-14-retest-run.json`（11-09 种子，未当读数）| `GSC数据/index.json` + `GSC数据/` 清单 | `.hermes/logs/flywheel-learning-ledger.json` @ 11-10 08:35（只读条目；**仅追加 `retest_gate_2026_11_18`**）| 对端 `2026-11-14-ZP-gsc-feedback.md` / `2026-11-17-ZP-daily-content.md` / `2026-11-18-ZP-daily-content.md` / `periodic-review-weekly-2026-11-13.json` | `SESSION_LOCK.md` 顶部
DELIVERED: `.hermes/logs/2026-11-18-ZP-gsc-feedback.md`, `.hermes/logs/gsc-daily-anomaly-2026-11-18.json`, `.hermes/logs/flywheel-learning-ledger.json`（**只加 `retest_gate_2026_11_18` 块**，未改任何既有条目 verdict）
NEXT: **11-19/20** 等新导出（数据日 ≥11-14 才有 C1 的 100% 7d 窗）→ **11-21** 海报/喜帖主承接份额（需**当前** query×page join）→ **11-28** small batch（US SERP，否则 `SERP_UNAVAILABLE`）→ **12-01** monthly → **12-04** 28d 82.1–85.7%。**K3 动作 D1/D4**：补 11-17/18（+ 缺的 11-13/14/15）四档、重启 7892 代理、跑 detector、重建 index；处理 gsc 调度 `2147946720`。**D2**：把复测表改为按 data_day 记键（A65）。
IDEMPOTENCY: `5b809ee47c5e6b03`（day 2026-11-18 / intent=`11-16 批晚到补消费 + 六个 READY 测量 + 11-18 决策窗裁决` / target=`export 2026-11-16（数据日 11-13）+ 6 词`）；与上轮 `a702483fdfe983cb` 不同 ⇒ 换日 + 换目标，合法新工作；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，**不含本键**
RETRY_OF: **`ZP-gsc-feedback-20261114T202026-37948` → FOLLOW_UP_ONLY**（11-14 是真实 PARTIAL 交付：报告 472 行 + anomaly JSON + ledger gate 块；`lane-status` 11-14 recovery_plan=`modify_payload`「只处理报告 NEXT，禁止重做 DELIVERED」）。本轮**不重写 11-14 任何文件**
STATUS_GATE: **FRESH**（lane-status 1.9h；problems=9 全为调度器残留 + MISSING 日行，**不据此派内容修复**）
COVERAGE: **LATE_ARRIVAL_BACKFILL(11-16) + KPI_11_16 + SIX_READY_MEASURE + DECISION_WINDOW_AUDIT(A65) + SEVEN_DAY_BLOCK_INTEGRITY(A66/A68) + BOARD_LABEL(A67) + STICKER_SIXTH_WINDOW + PAGE1_ZERO_CLICK_HANDOFF + EIGHT_LOCK_WORDS + RECOVERY_DERIVED(11-16)**
CONFIDENCE: **HIGH**（export=11-16 / 数据日 11-13 / 116.2h / lag 3 / 六条 28d 序列 / CTR 手算 / 11-17-18 文件不存在三法）· **MEDIUM**（28d 方向：25/28 重叠、6/28 变更后、7d 样本 9–49 imp）· **LOW**（任何因果、部署成效、恢复/排名改善结论；7d 数字因 A66 标签不可验证）
RUN: 定时 20:13 轮；**未调用 pwsh 计算面**（detector/API/index/tsc/门禁/xlsx 重解析/schtasks 均未实跑；仅文件直读 + 手算复算）；**零 `src/`、零 title/desc、零 canonical/301、零队列状态翻转、零历史报告改写**

> **为什么是 `PARTIAL` 而不是 `OK`**：本轮确有真实新增交付（11-16 批 KPI 首次消费 + 六个 READY 任务的第二个数据日读数 + 异常分类 + 复测 gate + 数据完整性发现），但两件本应在 11-18 兑现的事**都没有兑现**：① 数据日仍是 **11-13**（116.2h，远超 72h），11-17/18 无导出；② ledger 写死的「11-18 = 首个 100% 变更后 7d 窗」在数据日口径下只有 **85.7% / 64.3%**，**不是决策级**。写 `OK` 等于把「85.7% 的窗」冒充「100% 的实验结论」。
>
> **为什么不是 `NO_OP`**：本轮有实质新增（KPI 层首次交付 + 6 条测量 + 4 个新异常 A65-A68 + 复测 gate 改写为 DIRECTION_ONLY），不是「有证据的合法无变更退出」。

---

## 0. 一句话结论

**今天最值钱的事实是：数据终于来了一批（11-16），但它不是「11-18 决策窗」需要的那一批；而 ledger 把「导出日」当成「数据日」——两者差 2–3 天，正好把这个窗判错了。**

三件新事实：

1. **11-16 是 11-12 之后唯一一批，且从未被 KPI 层消费**：`grep gsc-2026-11-16 .hermes/**/*.md` = **0 命中**；k3 11-17 MISSING；daily 只用了一行「貼紙印刷」做内容 gate。所以本轮做 `LATE_ARRIVAL_BACKFILL` 是**首次**交付，不是重复。
2. **11-16 批的 KPI 是「展示升、点击降、位次略退」**：28d 展示 **+1,034（+4.08%）** 而点击 **−16（−2.86%）**、CTR **−0.1475pp**、位次 **+0.1319（退）**；7d 同向。这不是恢复胜出，也不是崩塌。
3. **六个 READY 词在数据日 11-13 上全部继续「深位化」**：`海報印刷` 17.23→**18.24**、`コミケ 印刷` 25.74→**27.37**、`教材 印刷製本` 36.95→**40.00**、`a2 poster` 40.00→**43.02**、`學校印刷` 18.02→**20.07**、`易拉架印刷` 40.12→**40.66**。**六个词点击合计 2**（海報 1 + a2 1）。在 18–43 位谈 title/desc 改写没有证据；**本批零派单**。

同时如实登记三处数据完整性问题：**A66** 11-16 的 7d 块键名仍是 `previous_11_11/current_11_12` 而值已重算（A53 同类缺陷**换形态复发**）；**A68** 11-16 没有 workbook-independent QA（11-12 有 54/54）；**A67** 协同板的 `baseline.window` 仍写 10-14..11-10 而数据行来自 10-17..11-13。

---

## 1. STEP 0 · 结果总线消费与 retry 裁决（第 -1 优先级）

### 1.1 `retry_queue` 唯一一项：FOLLOW_UP_PARTIAL，只做 NEXT

| 项 | 事实 | 裁决 |
|---|---|---|
| `FOLLOW_UP_PARTIAL` / `ZP-gsc-feedback-20261114T202026-37948`，reason=「真实交付已完成; 仅处理 NEXT, 不得重做 DELIVERED」 | 11-14 报告 472 行、首段四字段齐；DELIVERED = 报告 + anomaly JSON + ledger gate 块；其 NEXT 明确列出 11-15/16 等导出、11-18 首个 100% 7d 窗、11-21 份额、K3 D1/D4 | **只执行 NEXT**：① 检查 11-15/16 是否有导出 → 找到 **11-16 批**并首次消费；② 判 11-18 窗 → **不成立**（§5）；③ 11-21/11-28/12-01/12-04 未到期，只登记。**未重写 11-14 报告/anomaly/ledger 旧块** |

### 1.2 幂等与锁

- 本键 `5b809ee47c5e6b03` ≠ 上轮 `a702483fdfe983cb`；换日 + 换目标（11-16 批 vs 11-14 的 11-12 批）⇒ 合法新工作。`warnings` 4 条 DUPLICATE 不含本键。
- preflight `ok`，10/10 checks（含 `dsh_effective_provider_model=deepseek-official/deepseek-flash`）；`lane.lock` 由本轮持有（pid 36912）；`SESSION_LOCK.md` 顶部是 **11-14 16:3x 已释放**的人手会话，另有一条 2026-10-23「持有中」残留（A64，TTL 已过）。本轮**零 `src/` 写入**，不触发 §0.35.7 双条件写入门。
- **协同板构建成功**（`generated_at=2026-11-18T20:13:03+08:00`），6 个 READY 测量任务全部 `owner_lane=ZP-gsc-feedback`，六项上游输入 `available:true` ⇒ **不触发「协同板失败必须 BLOCKED」**。`SERP_UNAVAILABLE` 按板规保留，不猜真实展示标题/摘要。

### 1.3 本次「不重做」清单（幂等铁律）

- **不重做** 11-14 的 gsc 交付与结论；**不重写** 11-14 的 PARTIAL。
- **不重做** 11-12 批 KPI（已由 k3 11-13 交付）；本轮只把它当 11-16 的对照。
- **不重复交付** 11-16 的 KPI 第二次：本轮一次性交付后，下一轮必须等**更新**的导出。
- **不改写** `strategy-task-queue.json`、`lane-status.json`、`lane-runs.jsonl`、`GSC数据/index.json`、任何 `gsc-2026-11-*` 分析 JSON、任何对端报告、`src/`、`docs/`。

### 1.4 对端与跨车道避让

| 今日他方动作 | 证据 | 本轮处置 |
|---|---|---|
| `2026-11-18-ZP-daily-content.md`（18:17，NO_OP 内容层，CF build 红灯，K3 决策窗未拍板） | 文件本体（唯一今日写入的 .hermes/logs 对端文件） | **只读**；不改其报告与结论 |
| `2026-11-17-ZP-daily-content.md`（11-16 档数据日 11-13；貼紙 32.58） | 文件本体 | **只读**；本轮独立从 11-16 批取同值（148 imp / 32.58），未采用其派生结论 |
| 11-16 三档 xlsx + 两份分析 JSON | `GSC数据/` 清单；`gsc-2026-11-16-*` | **只读**；A53/A66 只读比对，不改文件 |
| `flywheel-learning-ledger.json`（11-10 08:35，他方维护） | 账本 | **只追加自己的 `retest_gate_2026_11_18`**；`data_supply` / `window_math` / 他车道条目零改写 |

> `run-context.sibling_lanes` 写 daily=`PENDING 21:17`，但 daily 实际已在 **18:17** 跑完并写报告 ⇒ 快照有采集盲点。本轮据「文件是否被写」避让，而不是据快照状态。

---

## 2. 数据面：11-16 是唯一新批，但仍差 3 天

### 2.1 四平面账本（时龄按「数据日次日 00:00」起算，20:13 基准）

| 平面 | 最新档 | 窗口 / 数据日 | 时龄 @20:13 | 判定 |
|---|---|---|---|---|
| xlsx 24h | **11-16** | 11-14T22 → **11-15T21** | **71.2h** | 非今日；已冻结 |
| xlsx 7d | **11-16** | 11-07 → **11-13** | **116.2h** | **> 72h ⇒ STALE（A1 继续开）** |
| xlsx 28d | **11-16** | 10-17 → **11-13** | **116.2h** | 同上；仅 **6/28** 天在变更后 |
| xlsx 3mo | **11-03（carried）** | 08-01 → **10-31** | **452.2h** | 连续第 **5** 批缺（11-07/10/11/12/16） |
| API query×country | `gsc-query-country-28d-end1105.csv` | 数据日 **11-04** | **356.2h** | STALE；7892 代理未复 |
| detector | **无 11-04..11-18 档** | 最后 = 11-03 | **15 日空** | `available:false`；pwsh 计算禁用，不重试 |
| index.json | `lastBuild=11-05 07:38` | `latestFreshData=11-03` | 落后 **5 批** | **A47 复发 5**；门童 #9 会误判 |

- **「11-17/18 无导出」三方法**：① `GSC数据/*2026-11-1*` 文件名止于 **11-16**（24h/7d/28d 三档）；② `gsc-2026-11-1*` 分析产物止于 **11-16**；③ 对端 daily 11-17/11-18 均记「今日无新档」。不是「没找到」，是**文件不存在**。
- **11-16 是晚到批**：该批在 11-16 晚轮之后才落地，**11-17 gsc 车道未跑**（MISSING），此后无任何报告引用它 ⇒ 本轮是 KPI 层**第一消费者**（`LATE_ARRIVAL_BACKFILL`）。
- **口径纠正（A57 延续）**：11-12 导出 → 数据日 11-10（lag 2）；11-16 导出 → 数据日 **11-13（lag 3）**。**lag 仍非常量**，任何「导出日 − 固定值」的写法都不成立——这正是 A65 的根因。
- **`index.json` 自述 `FRESH` 是 11-05 构建时的旧值**，与 `latestFreshData=11-03` 冲突；不得引用为今日新鲜度。

### 2.2 11-16 批 KPI（首次交付，非今日读数）

| 档 | 窗口 | 点击 | 展示 | CTR | 平均排名 | 时龄 | 状态 |
|---|---|---:|---:|---:|---:|---|---|
| 24h | 11-14T22 → 11-15T21 | **12** | **805** | 1.4907% | 18.3039 | 71.2h | FROZEN |
| 7d | 11-07 → 11-13 | **144** | **8,103** | 1.7771% | 14.3437 | 116.2h | **STALE** |
| 28d | 10-17 → 11-13 | **544** | **26,350** | 2.0645% | 14.6801 | 116.2h | **STALE** |
| 3mo | 08-01 → 10-31（11-03 档） | 1,279 | 65,252 | 1.9601% | 17.3550 | 452.2h | CARRIED |

**上批（11-12）→ 本批（11-16）**（窗口滑动：7d 重叠 4/7、28d 重叠 25/28，只作方向）

| 档 | Δ点击 | Δ展示 | ΔCTR | Δ排名（正=退） |
|---|---:|---:|---:|---:|
| 24h | **+5** | +227 | +0.2796pp | +6.4511（退） |
| 7d | **−5（−3.36%）** | +452（+5.91%） | −0.1704pp | +0.7796（退） |
| 28d | **−16（−2.86%）** | +1,034（+4.08%） | −0.1475pp | +0.1319（退） |

- **口径**：三个窗都是「展示增加、点击/CTR 回落、平均位次略退」。**不得**写成「恢复/胜出」，也**不得**写成「全站崩塌」。
- **双方法**：手算 CTR 12/805=1.4907%、144/8,103=1.7771%、544/26,350=2.0645%，与 JSON 一致；第二方法 = 四窗 JSON 自带的 `same_window_comparisons.kpi_11_12_to_11_16`（clicks/imps/position delta 完全一致）。**没有** 11-16 的 workbook-independent QA（11-12 有 54/54）⇒ 这一层只有两法，不是三法（A68）。

---

## 3. 六个 READY 测量任务（数据日 2026-11-13）

> 全部 `source=latest_gsc_delta`、`owner_lane=ZP-gsc-feedback`、`approval_gate=Measurement only … No automatic article/canonical/redirect`、`write_scope=[".hermes/logs/","docs/"]`。本轮**只写 `.hermes/logs/`**，`docs/` 未动。
> 共同口径：**all-country query rows；无 query×page/country join**；28d 序列 = 7 个导出、相邻窗重叠 25/28；7d 单行 9–49 imp。

### 3.1 汇总（28d 序列 = 数据日 11-13 读数）

| task_id | 词 | 28d imp / clk / CTR / pos | 7d imp / clk / pos | 28d 序列（pos） | 方向 |
|---|---|---|---|---|---|
| `…f2bc40ee31` | **海報印刷** | 187 / 1 / 0.5348% / **18.24** | 35 / 0 / 23.77 | 14.94 → 14.41 → 14.83 → 15.55 → 16.49 → 17.23 → **18.24** | 11-03 后**五连恶化**；imp −34.6%（286→187），clk 恒 1 |
| `…4c5ebffbea` | **コミケ 印刷** | 119 / 0 / 0% / **27.37** | 12 / 0 / 25.08 | 18.99 → 22.04 → 22.88 → 23.97 → 24.96 → 25.74 → **27.37** | **六连恶化**；imp −31.2% |
| `…ffa9859a1b` | **教材 印刷製本** | 58 / 0 / 0% / **40.00** | 14 / 0 / 49.29 | 20.69 → 28.67 → 31.49 → 34.32 → 35.51 → 36.95 → **40.00** | **六连恶化**；imp +48.7% = 查询集扩张 |
| `…832a69e4d7` | **學校印刷** | 57 / 0 / 0% / **20.07** | 14 / 0 / 28.00 | 19.12 → 18.80 → 19.04 → 17.71 → 17.04 → 18.02 → **20.07** | 非单调，但 11-12→11-16 反转 +2.05；imp +35.7% |
| `…2d5ea01d64` | **易拉架印刷** | 41 / 0 / 0% / **40.66** | 12 / 0 / 31.17 | 35.31 → 37.85 → 39.20 → 40.02 → 39.45 → 40.12 → **40.66** | 40 位饱和；imp 五批平在 40–44 |
| `…99d055a272` | **a2 poster** | 40 / 1 / 2.5% / **43.02** | 12 / 0 / 40.08 | 17.20 → 18.68 → 25.80 → 29.75 → 38.92 → 40.00 → **43.02** | **六连恶化**；imp −25.9%；**未止跌** |

共同判读：**六个词全部是「深位化」而不是「摘要/CTR 故事」**——28d 位次 18–43，点击合计 2。`易拉架印刷` 是「饱和在 40 位」而非新跌；`學校印刷` 是「两窗反转」；其余四个是连续单调恶化。

> **7d 方向说明**：7d 块显示 `易拉架` 37.60→31.17、`a2 poster` 43.27→40.08（变好），但 ① 键名标签错误（A66，`previous_11_11/current_11_12`），② 样本仅 10–12 imp，③ 7d 窗仍 85.7% 在变更后 ⇒ **不作改善证据**，只登记。

### 3.2 逐任务要点（契约 §6.2 字段）

| 项 | TARGET / 证据 | ACTION / NEXT_CHECK |
|---|---|---|
| **A · 海報印刷** | query `海報印刷`（all-country；主承接 `/zh-hk/category/posters/`）。28d 7 导出 imp −34.6%、位次 +3.30；clk 恒 1。stale 页级归因（09-30..10-27）：567 imp 分散 6 URL，category 64（11.3%）vs blog guide 210（37.0%） | **MEASURE**；11-21 用**当前** join 复测份额；不改 title。`SERP_UNAVAILABLE`；`CANNIBALIZATION_NOT_MEASURABLE` |
| **B · コミケ 印刷** | ja；C109 = 12-29..31 在前方；28d 六连恶化、全程 0 click；11-08 单位改动仅覆盖 ≤6/28 天 | **MEASURE**；与 blog-deepfix 的 JA-C109 真值任务**分离**（文本真值≠排名救援）；11-21 + 季窗复读 |
| **C · 教材 印刷製本** | ja；`contains_groups` 显示该簇 5 行分散（58/40.0、33/39.36、20/39.4、18/68.56、5/52.2），无一行接近首页 | **MEASURE**；11-21 复读；30+ 位且 0 click 进 monthly 簇诊断。**不套用** `教科書印刷` churn 规则 |
| **D · 學校印刷** | zh-hk；imp +35.7% 而位次 +0.95、0 click（同类 mix expansion） | **MEASURE**；11-21 复读；campus 簇留给 monthly |
| **E · 易拉架印刷** | zh-hk；39–41 位饱和 5 个导出、0 click、imp 平 | **MEASURE**；11-21 复读；若仍 40+ 由 monthly 判「roll-up 类目页是否为正确门」 |
| **F · a2 poster** | en；28d 位次 +25.82（17.2→43.02）、imp −25.9%、clk 1；11-18「止跌」**未兑现**（11-12→11-16 仍 +3.02）。stale 归因把 `/zh-hk/product/a2-posters/` 挂在中文 `海報印刷` 下，**en 承接 URL 未验证** | **MEASURE**；首个 data day ≥11-16 的 7d 窗再判止跌；不改价、不改 title。`CANNIBALIZATION_NOT_MEASURABLE` |

> **本批零派单**：六项都写 `MEASURE`，不写 FIX/SCALE/STOP，不改队列任何 status（契约 §6.1 / §7.2 / §8.4）。

---

## 4. 决策窗裁决：11-18 **不是**「首个 100% 7d 窗」（A65）

### 4.1 算式

| 变更 | 日期 | 可用 7d 窗 11-07..11-13 的变更后天数 | 可用 28d 窗 10-17..11-13 |
|---|---|---|---|
| **C1** 部署（74ffa5a9 / 9acc3d16） | 2026-11-08 | **6/7 = 85.7%** | **6/28 = 21.4%** |
| **C2** 改动（a33abd3b / 392c5f30） | 2026-11-09 12:44 | **4.5/7 = 64.3%** | **5/28 = 17.9%** |

- 真正 100% 的 C1 7d 窗需要 **数据日 ≥ 11-14**；C2 需要 **数据日 ≥ 11-16**。
- 11-16 导出的数据日是 **11-13**，**差 1 天**没到 C1 的 100% 窗。
- **结论**：本轮只能 `DIRECTION_ONLY`；**28d 一律 `BACKGROUND_ONLY`**；不 SCALE / 不 HOLD 判决 / 不回滚 / 不二次改动。

### 4.2 为什么 ledger 会写错（A65）

`window_math.dilution_table` 把「export_date 2026-11-18 → 7d 100%」写在一起，隐含假设 **数据日 = 导出日**。实际 lag 2–3（11-12→11-10、11-16→11-13，A57 已两次确认）。修法：**表按 data_day 记键**，data_day 从工作簿窗口读，不从导出日减常数。本轮不改 ledger 的 `window_math`（owner 规则），只在自己的 gate 块与 anomaly 里记录。

### 4.3 首个真正 100% 窗的落点

| 判据 | 需要 | 当前 | 结论 |
|---|---|---|---|
| C1 7d 100% | 数据日 ≥ 11-14 | 11-13 | **差 1 个数据日** ⇒ 下一个导出即可（若补 11-17/18） |
| C2 7d 100% | 数据日 ≥ 11-16 | 11-13 | 差 3 个数据日 |
| 28d ≥82% | 数据日 ≥ 约 11-30 | 11-13 | 12-04 仍是最早经营判断日（±1 天取决于 lag） |

---

## 5. 贴纸第六窗 + 首页零点击池（交 weekly 的 CTR 证据）

### 5.1 貼紙印刷：连续第六步改善（7 个读数），但 gate 未达

| 导出 | 10-30 | 11-03 | 11-07 | 11-10 | 11-11 | 11-12 | 11-16 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 28d pos | 40.88 | 38.06 | 37.65 | 35.35 | 34.58 | 34.35 | **32.58** |
| 28d imp | 120 | 127 | 131 | 139 | 142 | 136 | **148** |
| clk | 0 | 0 | 0 | 0 | 0 | 0 | **0** |

- **gate = pos ≤ 30** → **32.58 > 30 ⇒ 未达**。连续 6 步改善（7 个读数）、展示升至 148，但**全程 0 点击**。
- 「第六窗」按导出数算或按数据日算都指向同一结论：**不触发 title 评估**；距 gate 仍差 **2.58 位**。
- 次级：`貼紙訂製` 52 imp / 0 clk / 28.5（28.64→28.5）。

### 5.2 首页零点击池（28d，数据日 11-13）

| # | 词 | imp | clk | pos | 上批（11-10） |
|---|---|---:|---:|---:|---|
| 1 | **食品包裝印刷** | **114** | 0 | 8.25 | 107 / 8.53 |
| 2 | **small batch sticker printing** | 21 | 0 | 7.52 | 21 / 7.29 |
| 3 | **卒アル販売** | 16 | 0 | 5.00 | 16 / 5.00 |
| 4 | **书籍印刷** | 5 | 0 | 7.60 | 5 / 7.60 |
| — | **合计** | **156** | **0** | — | 157 / 6 词 |

- 池子从 6 词缩到 4 词（`證書印刷`、`saddle stitch booklet printing` 掉出）；`书籍印刷` 5 imp 属样本闸门。
- **可用的 CTR 假设只有前 3 个词**；`食品包裝印刷` 114 imp / 8.25 位 / 0 点击仍是池内最大、也是 11-18 K3 议程第 3 项（food-packaging snippet 单变量，**未拍板**）。
- **SERP 仍不可得** ⇒ 先记真实 SERP title/snippet 再谈摘要改写；本车道不写 title、不派单。交 **ZP-weekly-meta** 下一自然轮（11-20）作 proposal 输入。

### 5.3 任务 J 八锁词周追踪（28d，数据日 11-13）

| 词 | imp | clk | pos | 上批 pos | Δ | 读法 |
|---|---:|---:|---:|---:|---:|---|
| 包裝盒印刷 | 50 | 0 | 31.64 | 32.08 | −0.44 | 深位平稳 |
| 紙盒印刷 | 59 | 0 | 35.76 | 36.38 | −0.62 | 深位平稳 |
| 包裝盒訂製 | 55 | 0 | 34.55 | 34.45 | +0.10 | 深位平稳 |
| **貼紙印刷** | **148** | 0 | **32.58** | 34.35 | **−1.77** | 连续改善但仍深 |
| 宣傳單張 | 135 | 0 | 38.09 | 36.46 | +1.63 | 恶化 |
| **即日印刷** | 58 | **2** | **8.28** | 8.16 | +0.12 | 唯一页一 |
| 書刊印刷 | 133 | 0 | 33.83 | 33.74 | +0.09 | 深位平稳 |
| 騎馬釘書刊 | 70 | 0 | 22.00 | n/a | n/a | contains-group 单源，无同排行基线 |

- 8 词里 **7 词在 22–38 位、0 点击**；唯一页一是 `即日印刷`（8.28，2 点击）。
- 红线不变：**不改 slug、不砍页、不回滚已部署 title**。

---

## 6. 数据完整性：A53 回归、缺失 QA、板标签错位

### 6.1 A66 · 7d 块键名回归（A53 同类缺陷换形态）

| 检查 | 结果 |
|---|---|
| 键名 | `gsc-2026-11-16-money-keyword-delta.json` 的 7d 块仍是 `previous_11_11` / `current_11_12`，但**值已重算**（`即日印刷` current = 9 imp / 9.11，11-12 文件当时是 13 imp / 8.38） |
| 第二方法 | 四窗 JSON 的 7d 窗是 **11-07..11-13** ⇒ 正确键应为 `previous_11_12` / `current_11_16`；同一文件的 28d 块按 export_date 正确命名 ⇒ 缺陷**只在 7d 生成器** |
| 跨产物冲突 | 四窗 `page1_transitions_7d` 把 `證書印刷`、`doujinshi printing` 列为 transition，而 delta 7d 块把两者标 `DROPPED_OUT_PAGE_1` ⇒ **比较器不同**；本轮**不采用 7d page-1 transition 作证据** |
| 影响 | 7d 数字**标签不可验证**；本报告结论用 28d（标签正确），7d 只作次级方向 |

### 6.2 A68 · 11-16 没有 independent QA

11-12 有 `gsc-2026-11-12-workbook-independent-qa.json`（`all_independent_checks_match=true`、54/54 formula rows）；11-16 **无对应文件**。原本用来兜住 A53 的「第三种方法」在本批**不存在**，因此 11-16 的 KPI 只有「手算 + 四窗 JSON」两法。

### 6.3 A67 · 协同板 baseline.window 错位

板里 6 个 READY 任务的 `baseline.source = gsc-2026-11-16-money-keyword-delta.json`，但 `baseline.window = 2026-10-14..2026-11-10`（上一批窗口）。实际 28d 窗是 **10-17..11-13**。数值本身与 delta 一致（187/1/18.24 等），只是窗口标签旧。

### 6.4 当前 join 缺失下的承接证据（只做独立聚合，不 join）

- 页面级独立聚合（28d）：`/zh-hk/blog/poster-printing-guide/` **1,244 imp / 10 clk / 10.39 位**；`/zh-hk/category/posters/` **307 imp / 1 clk / 39.72 位**；`/zh-hk/product/a2-posters/` **789 imp / 17 clk / 13.52 位**。
- 查询级独立行：`海報印刷` 187 imp / 18.24 位；`a2 poster` 40 imp / 43.02 位。
- **不得**把两组相加或相除（guardrail：query/page 独立表不 join），但方向一致：blog 的展示量约为 category 的 4 倍，主承接份额仍未向 category 收敛（与 stale 09-30..10-27 归因同向）。11-21 需**当前** join 才能下结论。

---

## 7. 恢复链（官方 123.7% 不变，新增 11-16 派生点 85.54%）

- **官方最后值 123.7%**（`gsc-cliff-2026-11-03.json`，977 ÷ 789.8，full-country）；detector 自 11-04 起 **15 日无档** ⇒ `available:false`。**不把 85.54% 与 123.7% 串成同一条官方曲线**。
- **新派生点**：11-16 24h **805** ÷ 11-16 28d 日均 **941.07** = **85.54%**，标签 `DERIVED_NOT_DETECTOR`。
- **派生点全表**：11-07 96.98%、11-10 130.0%、11-11 105.3%、11-12 63.93%、**11-16 85.54%**；全部 derived。
- **streak = 0/3**：官方点 10-29 / 10-30 / 11-03 不连续（缺 10-31..11-02）；derived 不计入。
- **UNKNOWN 三项**：人工处罚状态 / 排名恢复 / 索引覆盖率 —— 今日无处罚页核验、无索引 sheet，**不编造**。
- **spam 恢复周报（本周节）**：曲线 96.98 → 130.0 → 105.3 → 63.93 → **85.54**，宽幅震荡且星期结构不同；**一句结论：恢复状态仍不可判定，11-12 的 63.9% 低点被 11-16 部分收回，但两条都是单日派生值。**

---

## 8. 异常状态迁移

### 8.1 今日关闭

| ID | 11-14 状态 | **11-18** | 依据 |
|---|---|---|---|
| **A61 PEER_DATA_DAY_MISLABEL** | NEW P3 | **CLOSED_BY_PEER_CORRECTION** | daily 11-17/11-18 均把 11-16 批数据日写成 **11-13**（正确）；未改对端文件 |

### 8.2 继续开 / 复发

| ID | 11-14 状态 | **11-18** | 依据 |
|---|---|---|---|
| **A53 MONEY_7D_BLOCK_STALE** | CLOSED_VERIFIED（11-12 批） | **REGRESSION_2026_11_16 → 并入 A66** | 11-16 的 7d 块再次出现陈旧键名（值已重算） |
| **A1 DATA_STALE** | REOPENED_CONFIRMED | **STILL_OPEN** | 数据日 11-13，116.2h > 72h |
| **A2 FROZEN_24H** | REOPENED_DAY2 | **REOPENED_DAY3** | 24h 止 11-15T21（71.2h） |
| **A36 XLSX_NOT_REFRESHED** | RECURRENCE_2 | **RECURRENCE_3** | 11-17/18 无工作簿 |
| **A44 DETECTOR_RUNTIME** | OPEN_DAY11 | **OPEN_DAY15** | `gsc-cliff-*` 止于 11-03 |
| **A47 GSC_INDEX_NOT_REBUILT** | RECURRENCE_4 | **RECURRENCE_5** | 5 批未收录 |
| **A54 GEO_PROBE_OWNER_CONFLICT** | OPEN_OVERDUE_11D | **OPEN_OVERDUE_15D** | 队列 `next_check=2026-11-03`；两 owner 都没跑 |
| **A58 LEDGER_DATA_SUPPLY_STALE** | STALE_DAY4 | **STALE_DAY8** | 账本仍写 `latest_xlsx=11-07` |
| **A43 RUN_GAP** | PARTIAL | **WIDENED** | gsc 11-13/15/16/17 缺跑；k3 11-14..11-18 缺；monthly 自 11-01 缺 |
| **A63 SCHEDULER_REFUSED_GSC** | NEW P1 | **STILL_OPEN** | `Last=11-17 23:44:52 / Result=2147946720`；今日 20:13 入口未能在 18:17 快照中体现 |
| **A64 STALE_SESSION_LOCK_ENTRY** | NEW P3 | **STALE_DAY26** | `SESSION_LOCK.md` 仍有 10-23「持有中」 |

### 8.3 今日新开

| ID | 级别 | 要点 | recovery_plan |
|---|---|---|---|
| **A65 DECISION_WINDOW_KEYED_ON_EXPORT_DATE** | P1 | dilution_table 用 export_date 当 data_day；11-16 数据日 11-13 ⇒ 只有 85.7%/64.3%，不是 100% | `modify_payload`（owner=ledger/runbook）：表按 data_day 记键 |
| **A66 MONEY_7D_BLOCK_KEYS_STALE_REGRESSION** | P1 | 11-16 的 7d 块键名仍 `previous_11_11/current_11_12`，值已重算；7d page-1 transition 与四窗冲突 | `modify_payload`（owner=delta 生成器）：按实际日期命名 + 形状断言；禁手改 JSON |
| **A67 BOARD_BASELINE_WINDOW_MISLABEL** | P2 | 板 `baseline.window` 仍是 10-14..11-10，数据行来自 10-17..11-13 | `modify_payload`（owner=板构建器）：window 与 row 同源 |
| **A68 NO_INDEPENDENT_QA_FOR_11_16** | P2 | 11-12 有 54/54 QA，11-16 无 | `modify_payload`（owner=分析生成器）：每批都出 QA 文件 |

### 8.4 carry（无新证据，不改对端）

`A45`（派生根不替换官方根，冻结）、`A46`（已并入 A65）、`A48`（沙箱无拉数/解析能力）、`A49`（catalog 真值冲突）、`A50`（EN 页 ZH 块，观察）、`A52`/`A55`（历史措辞）、`A57`（lag 非常量，本批再确认 lag 3）、`A59`（7d 样本 9–49 imp、28d 25/28 重叠、6/28 变更后）、`A60`（11-14 retest 种子仍在，未当读数）、`A62`（并入 A65）。

---

## 9. 三条队列（只做证据，不翻状态、不派单）

### 9.1 机会队列

| ID | 状态 | 11-18 证据 |
|---|---|---|
| OPP-01 页一零点击池 | **UPDATED（11-16 批）** | 4 词 / 156 imp / 0 clk（11-10 批 6 词 / 157 imp）；證書印刷、saddle stitch 掉出 |
| OPP-02 新进页一 | **NEW_ENTRANT_SMALL_SAMPLE** | 书籍印刷 5 imp / 7.6 / 0 clk；不作决策 |
| OPP-03 两窗改善 | **MEASURE_IMPROVING** | 貼紙印刷 连续 6 步改善（7 个读数，40.88→32.58）但 0 click 且 >30 |
| OPP-04 产品摘要结构 | **MEASURE → monthly** | 无新结构数据 |
| OPP-05 市场 CTR 差 | **MEASURE → monthly** | 11-16 28d：HK 2.4798% / JP 1.6427% / US 0.9952%（搜索者位置，非 locale 业绩） |
| OPP-06 单页零点击 | **CARRY_OBSERVATION** | design-file-specs 407 imp / 0 clk / 5.73（28d 页面聚合）；无 SERP/真值，不派单 |

### 9.2 退场候选（停止追加投入，不等于删页/noindex）

- **无新增退场**。`EXIT-01 教材` / `EXIT-03 a2 poster` / `EXIT-04 コミケ` / `EXIT-08 海報印刷` 维持 `DEEPENING_MEASURE` / `SEASONAL_HOLD_UNDER_REVIEW`：证据是「深位化」，**不是「部署失败」**。
- **红线**：四个词 28d 窗仍有 **22–23/28 天**在 11-08 之前；不得把移动窗口读成实验结论，不得回滚已部署真值。
- `EXIT-04 コミケ` 的 `SEASONAL_HOLD` 需在 **11-21 / C109 季窗**复核：六个连续导出的单调下滑比「季节性」解释更强，但仍需当前 join + SERP 才能改判。

### 9.3 内耗候选（仍是假设，无当前 join）

| ID | 状态 | 证据 |
|---|---|---|
| IF-01 posters | **STALE_ATTRIBUTION_PLUS_CURRENT_PAGE_ORDERING** | 09-30..10-27：category 11.3% vs blog 37.0%；11-16 独立页面聚合仍显示 blog 1,244 imp/10.39 vs category 307/39.72（不可 join，仅同向）⇒ 当前 join 缺失 ⇒ `CANNIBALIZATION_NOT_MEASURABLE` |
| IF-03 stickers | **IMPROVING_NOT_RESOLVED** | 貼紙印刷 148 imp / 0 clk / 32.58；12-04 窗 |
| IF-05 海报主承接 | **K3_REVIEW_CANDIDATE** | 11-21 份额未收敛则复评「主承接 URL 选型」，**不回滚** |
| IF-02 / IF-04 | carry | 无新页级证据 |

---

## 10. K3 升级（5 个决策点，均可一句话拍板）

### D1 · 🔴 P0 数据面仍停 11-13（落后 5 个数据日，11-17/18 无导出）

> **事实**：最新 11-16 批数据日 **11-13**、**116.2h > 72h**；11-13/14/15/17/18 均无工作簿；3mo 缺 **5** 批；API `end1105`（**356.2h**）；detector **15 日**空；index 落后 **5 批**。
> **推荐 (A)**：补 **11-17 + 11-18**（并顺手补 11-13/14/15）的 24h/7d/28d/3mo（全国家、网页搜索）+ 重启 7892 代理；随后 host 跑：

```powershell
cd F:\zprintpro-nextjs
python scripts\fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-18
python scripts\gsc-cliff-detector.py
node scripts\rebuild-gsc-index.mjs --write
powershell -NoProfile -Command "Get-ScheduledTaskInfo -TaskName ZP-gsc-feedback,ZP-daily-content,ZP-monthly-matrix,ZP-k3-review | Format-List TaskName,LastRunTime,LastTaskResult,NextRunTime"
```

> 备选 (B)：只补 11-18 三档先解 72h，窗口仍只有 85.7%；(C) 等 11-21 与份额检查同批 —— **不推荐**，会把 11-21 的份额检查也拖成非决策级。

### D2 · 🟠 P1 复测表按 data_day 记键（A65）

> **事实**：ledger 写「export 2026-11-18 = 100% 7d」，实际 11-16 批只有 **85.7%（C1）/ 64.3%（C2）**；28d 只有 **21.4% / 17.9%**。
> **推荐 (A)**：把 `dilution_table` 改为 `data_day → 百分比`，并在每次生成时从工作簿窗口读 data_day；决策点改为「首个 data day ≥11-14 的导出」（C1 7d）与 12-04（28d）。备选 (B) 继续按导出日 ⇒ 会反复出现「到期但不可判」；(C) 取消百分比、只看方向 ⇒ 丢掉了 100% 窗的纪律。

### D3 · 🟡 P2 GEO 探针 owner 冲突（A54）：逾期 15 天

> **事实**：`strategy-task-queue.json` 写 `GEO-20261103-AI-PROBE-S1` owner=`ZP-gsc-feedback`、status=`SCHEDULED`、`next_check=2026-11-03`；账本写 owner=`ZP-weekly-meta`；两边都没跑。
> **推荐 (A)**：owner 定为 **ZP-weekly-meta**（其 measurement 批更接近探针），gsc 只消费结果；本轮**不声称已复测、不写任何 AI 引用增长/下降结论**。

### D4 · 🟠 P1 gsc 调度仍被拒（0x800710E0 族）

> **事实**：`lane-status` 18:17：`Last=2026-11-17 23:44:52 / Result=2147946720`；11-15/16/17 **无 bus 行、无报告**；本轮 20:13 入口产出 preflight + 报告，但 18:17 快照早于它，**不能据此称调度恢复**。
> **推荐 (A)**：K3-admin 用 `Get-ScheduledTask -TaskName ZP-gsc-feedback | Format-List *` 检查 `LogonType` / `RunLevel` / 凭据，并按 `scripts/register-cron-tasks.ps1` 重新注册（与 k3/monthly/weekly 同族一次处理）。**在自然调度四方验收前，不写「调度已恢复」。**

### D5 · 🟡 P2 11-16 批完整性（A66/A68）

> **事实**：7d 块键名仍是 11-11/11-12（值已重算）；7d page-1 transition 与四窗冲突；11-16 无 independent QA。
> **推荐 (A)**：生成器 owner 按实际日期命名 7d 键 + 每批输出 QA 文件；下一批生成后**再断言**键名与值链。**不手改 JSON**（派生文件铁律 §6.4）。

### 非阻塞 carry（不占 5 条）

- **A58 账本 `data_supply` 已 8 天未刷新**（仍 `BROKEN_DAY6 / latest_xlsx=11-07`）：交账本 owner；本轮只加 gate 块。
- **A47 index**：5 批未收录，门童 #9 会把新档判成「不存在」。
- **A51 已在 title 层关闭**（他车道）：本车道不重验、不复改。
- **6 项 WAITING_K3**（BLOG-CERT / STICKER-ZH-TRUTH / STICKER-PRICE-THREE-LAYER / BLOG-H1-BRAND / FIVE-CATEGORY-TRUTH / PRIMARY-URL-MISMATCH）→ 维持 HOLD，执行层不自批。
- **§0.0 名片解禁块 (a)/(b)/(c)** 仍未裁 → 继续零触碰（不建页、不改 301、不动贺卡资产）。

---

## 11. 跨车道与写盘隔离

| 今日他方写入 | 时间 | 本轮处置 |
|---|---|---|
| daily 11-18 报告（NO_OP 内容层、CF build 红灯、决策窗未拍板） | 18:17 | **只读**；不改其报告，不据其结论 |
| daily 11-17 报告（11-16 档数据日 11-13、貼紙 32.58） | 11-17 | **只读**；本车道独立复算同值 |
| 11-16 三档 + `gsc-2026-11-16-*` 分析 JSON | 11-16 后落地 | **只读消费**；A53/A66 只做比对，不改文件 |
| `strategy-task-queue.json` / `coordination-board.json` / `lane-status.json` / `lane-runs.jsonl` | host/板构建器 | **零手改**；队列状态零翻转 |
| `flywheel-learning-ledger.json` | 11-10（他方） | **仅追加 `retest_gate_2026_11_18`**；未改 `data_supply` / `window_math` / 他车道条目 |
| `src/`、title/desc、canonical/301、blog-data、CSV/生成器、`docs/`、`GSC数据/` | — | **零触碰** |

**本轮写盘**：3 个文件 —— 本报告、`gsc-daily-anomaly-2026-11-18.json`、账本新增块。无覆盖、无 `.failure.md`、无 `src/`、无 `docs/`、无队列/总线改写。
**Git**：commit/push 由 host-side wrapper 在本 lane 退出后执行；本轮不声称已提交。

---

## 12. 下一验证点

| 日期 | 验什么 | 通过标准 / 失败动作 |
|---|---|---|
| **2026-11-19/20** | 是否出现新导出 | 有 24h/7d/28d 且数据日 ≥11-14 ⇒ C1 首个 100% 7d 窗可判；否则 A1 继续开、决策窗再顺延 |
| **首个 data day ≥11-14** | C1 的 100% 7d 窗 | 六个词方向 + a2 poster 是否止跌；否则维持 DIRECTION_ONLY |
| **首个 data day ≥11-16** | C2 的 100% 7d 窗 | 同上；C2 相关实验才可判方向强弱 |
| **2026-11-21** | 海报/喜帖主承接份额（需**当前** join） | category 份额向 blog 收敛；否则复评选型，不回滚 |
| **2026-11-28** | small batch sticker（US 英文 SERP + 同口径 28d） | SERP 记录成功，或 `SERP_UNAVAILABLE`；不编造 |
| **2026-12-01** | monthly 自然触发 | 有 run 记录 + 月报告；否则 dead_letter |
| **2026-12-04 / 12-10** | 28d 82.1–85.7% / 100% 变更后 | 才可 SCALE/HOLD/FIX/STOP；六件齐才 SCALE |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先查前序实现路径：11-14 报告（无新导出、A53 已闭、10 项 gate BLOCKED）→ 11-16 batch（四窗 + delta，**无 QA**）→ 11-17/18 daily（已用 11-16 档数据日 11-13）→ 11-14 retest 种子（11-09 生成，未用）。据此本轮**做** 11-16 KPI 首次消费 + 6 任务测量 + 窗口径审计，**不做** 11-12 重交付、不做 11-14 重写。
- [x] **2. 约束适用范围？** 契约 §6.1（gsc 只给任务/不改页）⇒ 零 `src/`、零 title/desc、零 canonical/301；§7.2（不改队列状态）⇒ 零翻转；§8.3/§8.6（只写自己条目/不自批）⇒ 账本仅追加自己的 gate 块；§8.4（窗口纪律）⇒ 85.7%/21.4% 窗口一律不出 SCALE/HOLD/FIX/STOP；§8.8（数据供给阻断）⇒ 复测写 DIRECTION_ONLY；§0.23（数字只来自真值）；§0.37（不接 GA4/008/订单）；§0.0（名片只接单不建页）；§0.35.7（零 src 写入，无需人手锁）。
- [x] **3. 原数据/拍板来源？** ① 来源：`gsc-2026-11-16-four-window-analysis.json` / `gsc-2026-11-16-money-keyword-delta.json`、11-12 对照三件、`gsc-cliff-2026-11-03.json`、`lane-status` 18:17、`coordination-board` 20:13、ledger 11-10；② 真数据：11-17/18 无导出（文件名 + 分析产物 + 对端三法）、数据日 11-13、116.2h、lag 3、六条 28d 序列、CTR 手算一致；③ 留/撤：**零数据撤回**；一项条件更正（ledger 的「export 11-18 = 100% 7d」隐含数据日=导出日，实际 85.7%/64.3%，记 A65，不改 ledger 条目）。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入；价格/MOQ 仅作既有真值引用，不新增价格声明。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告与 JSON 台账；无 user-facing 文本，不触发 `parseInlineLinks`。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-18 20:13:02, preflight ok/10-10, lock pid 36912, retry_queue 1 FOLLOW_UP_PARTIAL, key 5b809ee47c5e6b03) · lane-status.json (2026-11-18 18:17, 1.9h, bus_records 126, verdict ATTENTION, problems 9, gsc 11-13/15/16/17 MISSING, scheduler Last 11-17 23:44:52 Result 2147946720)
- 协同板: coordination-board.json (2026-11-18T20:13:03+08:00, 6 READY GSC-MEASURE owner=ZP-gsc-feedback, baseline source=11-16 delta, baseline.window 标签错位 A67)
- GSC 权威窗口: gsc-2026-11-16-four-window-analysis.json (24h 12/805/1.4907/18.3039 window 11-14T22..11-15T21; 7d 144/8103/1.7771/14.3437 window 11-07..11-13; 28d 544/26350/2.0645/14.6801 window 10-17..11-13; 3mo 1279/65252/1.9601/17.355 window 08-01..10-31; page aggregates: blog poster guide 1244/10/10.39, category posters 307/1/39.72, product a2-posters 789/17/13.52)
- GSC 词级: gsc-2026-11-16-money-keyword-delta.json (28d 七导出: 海報 286/278/261/248/224/206/187; コミケ 173/170/163/146/134/129/119; 教材 39/46/51/53/57/56/58; a2 54/59/49/48/39/38/40; 學校 42/51/53/52/50/53/57; 易拉架 42/48/44/44/44/40/41; 貼紙 120/127/131/139/142/136/148 with pos 40.88→32.58; 7d 块键名 previous_11_11/current_11_12 = A66)
- 对照批: gsc-2026-11-12-four-window-analysis.json + gsc-2026-11-12-money-keyword-delta.json + gsc-2026-11-12-workbook-independent-qa.json (54/54; 11-16 无对应 QA = A68)
- 恢复链: gsc-cliff-2026-11-03.json (977 / 789.8 = 123.7%, full-country) · 派生 11-16 805 / (26350/28=941.0714) = 85.54% (DERIVED_NOT_DETECTOR)
- 数据供给: GSC数据/ 最新 = 2026-11-16 24h/7d/28d; 3mo = 2026-11-03; gsc-query-country-28d-end1105.csv (data day 11-04); GSC数据/index.json (lastBuild 11-05 07:38, latestFreshData 11-03; 5 批未收录)
- 页级归因(stale): docs/2026-11-13-priority-pool-attribution-addendum.md (window 2026-09-30..2026-10-27, hkg) — 只作历史对照, 不当当前 join
- 对端: 2026-11-14-ZP-gsc-feedback.md (上轮 NEXT) · 2026-11-17/2026-11-18-ZP-daily-content.md (11-16 档数据日 11-13) · periodic-review-weekly-2026-11-13.json (18 runs; OK 11 / FAILED 3 / STALE 1 / PARTIAL 1 / PENDING 2)
- 账本: flywheel-learning-ledger.json (2026-11-10 08:35; 10 项 owner=ZP-gsc-feedback; window_math.export_lag_days=3 与 11-16 lag 3 相符但 dilution 表按 export_date 记键 = A65)
- 调度真值: lane-status 18:17 (5 车道 2147946720) · 会话锁: SESSION_LOCK.md 顶部 (11-14 released; 10-23 stale holding)
- 环境: pwsh 计算面禁用 (v9.4, 不重试) ⇒ detector/API/index/tsc/门禁/xlsx 重解析/schtasks 未实跑; commit/push 由 host wrapper 兜底
校准状态: 🟢 已校准 (2026-11-18) — export 11-16 / 数据日 11-13 / 116.2h / lag 3 / 六条 28d 序列 / CTR 手算 / 11-17-18 文件不存在 = 一手直读或可复算; 🟡 六词 28d 方向 = 25/28 重叠 + 窗口移动 + 6/28 变更后; 🟡 7d 单行 9–49 imp; 🔴 7d 键名 (A66) / 无独立 QA (A68) / detector 15 日空 / 当前 query×page join 缺失
撤回声明: 无数据撤回。一项条件更正: 2026-11-14 报告及其 ledger `retest_gate_2026_11_14` 把「7d 首个 100% = 2026-11-18」写在 export_date 轴上；按数据日口径 11-16 批只有 85.7%/64.3%，原日期不撤回、撤回其适用条件（需 data day ≥11-14），记 A65；ledger 旧块与 11-14 报告均未改写。
口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用结论 (A54); 零客户可见内容写入。**无老站 z-printpro.com 对比基线** —— 现有 GSC 档均为新站 zprintpro.com 属性 (§0.30.9 显式声明)。
```

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 「今日 KPI」 | 最新 = **11-16 批**，7d/28d 数据日 **11-13**（116.2h）；不是 11-18 读数 |
| 2 | 11-18「首个 100% 7d 窗」 | **不成立**：85.7%（C1）/ 64.3%（C2）；28d 21.4%/17.9% = BACKGROUND_ONLY |
| 3 | 六词的「原因」 | 只有方向 + 归因缺口；无当前 query×page join、无 SERP、变更后仅 6/28 天 ⇒ **不判因果、不回滚** |
| 4 | 7d 数字 | 标签不可验证（A66）；与四窗 page-1 transition 冲突；只作次级方向 |
| 5 | 恢复系数 85.54% | 单一 24h、跨周末（周六夜→周日夜）、`DERIVED_NOT_DETECTOR`；detector 15 日未跑 |
| 6 | 页级承接 | 只有 stale 09-30..10-27 归因 + 当前独立页面聚合；**不可 join**，当前份额仍 `CANNIBALIZATION_NOT_MEASURABLE` |
| 7 | 3mo | 11-03 携带（数据日 10-31，452.2h）；缺 5 批 |
| 8 | index 新鲜度 | `index.json` 自述 FRESH 是 11-05 旧值，与 `latestFreshData=11-03` 冲突 |
| 9 | 调度器 | 引 18:17 快照；11-17 23:44 是最后一次被拒尝试；本轮 20:13 入口**不构成**调度恢复证据 |
| 10 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在 lane 退出后写入；本报告只声称 ③ 报告 + ④ 20:13 preflight 持锁 |
| 11 | 飞轮账本 | 仅追加 gate 块；`data_supply` / `window_math` 仍为 11-10 旧值（A57/A58/A65），交 owner |
| 12 | 对端文件 | 11-14 gsc / 11-17/18 daily / 11-16 GSC JSON / 队列 / 板 / 锁文件全部零改写 |
| 13 | 11-16 批的可验证性 | 无独立 QA（A68）；仅手算 + 四窗 JSON 两法，弱于 11-12 的三法 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7/§8 + 2026-11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块 + sop-10-gate）· 2026-11-18 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
