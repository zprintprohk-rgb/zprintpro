# 2026-11-12 · ZP-gsc-feedback 车道报告（11-12 无导出 · 72h 余 3.8h · A53 隔夜修复双方法验证通过 → 7d 词级首次可读 · 「lag=3」断言更正为非常量）

VERDICT: PARTIAL
RECOVERY: **N/A — `available:false`**（无 `gsc-cliff-2026-11-12.json`；detector 连续第 **9** 日无档）；最后官方值仍为 **123.7%**（`gsc-cliff-2026-11-03.json`，977 ÷ 789.8，full-country）；最后派生值 **105.3%**（11-11 批 940 ÷ 892.75，**CARRIED，非今日读数**，标签 `DERIVED_NOT_DETECTOR`）
RECOVERY_STATUS: **UNKNOWN_TODAY_NO_24H** — 今日无任何新 24h 档，连「当日派生值」都无法生成；不把 11-11 的 105.3% 冒充 11-12
RECOVERY_SERIES: full-country：10-29 **105.8%**（749.2）→ 10-30 **117.7%**（754.5）→ 11-03 **123.7%**（789.8，最后官方）→ 11-07 **96.98%**（827.96，DERIVED）→ 11-10 **130.0%**（864.82，DERIVED）→ 11-11 **105.3%**（892.75，DERIVED/CARRIED）；**11-12 无点**
RECOVERY_STREAK: **0/3** — 官方点只有 10-29 / 10-30 / 11-03，中间缺 10-31..11-02，从未「连续 3 日」；derived 不计入官方连胜
DATA_STATUS: **NO_NEW_BATCH_2026_11_12** — 全仓按文件名 glob（`**/*2026-11-12*`）**0 命中**；`GSC数据/` 最新仍 11-11 三档。最新批时龄 @20:13：24h 窗止 11-11T16 **28.2h**；7d/28d 数据日 11-09 **68.2h**（余 **3.8h**，**11-13 00:00 越 72h**）；3mo 数据日 10-31 **284.2h**（连续第 3 批缺：11-07/11-10/11-11）
DATA_GATE: **STALE_IMMINENT** — 今日仍在 72h 内，但「今日无新导出」使 A1 在 3.8h 后必然重开；本报告不产出任何「今日 KPI」
KPI_UPDATED: **false**
NO_NEW_DATA: **true**
PAGE_WRITES: 0
CONSUMED: `.hermes/logs/run-context-ZP-gsc-feedback.json` @ **2026-11-12 20:13:03**（preflight **9/9 ok** / `lock pid 28428` / `retry_queue` 3 项 / 本键 `d67672ac54a7db55` / `prev_run` = 11-11 20:34 OK）| `.hermes/logs/lane-status.json` @ **2026-11-09 06:43**（**85.5h ⇒ STALE_STATUS**；`bus_records=108` 为生成时值，`lane-runs.jsonl` 现 #116；problems=6 已过时）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6.1 只给任务不改页 / §7.1 运行口径 / §7.2 队列纪律 / §7.4 学习边界 / **§8 飞轮账本**）| `zprintpro-gsc-feedback-loop.md`（11-07 四窗差分块 + 11-03 证据分流块 + 恢复模式块）+ `sop-10-gate.md` | `.hermes/logs/flywheel-learning-ledger.json` @ **2026-11-10 08:35**（只读：`owner_lane=ZP-gsc-feedback` 10 项 + `window_math` + `data_supply` + `scheduler_truth`）| **`gsc-2026-11-11-four-window-analysis.json`**（隔夜重生成后复读）| **`gsc-2026-11-11-money-keyword-delta.json`**（隔夜重生成后复读）| `gsc-2026-11-10-four-window-analysis.json` / `-money-keyword-delta.json` / `gsc-2026-11-07-money-keyword-delta.json`（三段值链交叉校验）| `gsc-daily-anomaly-2026-11-11.json` | `gsc-cliff-2026-11-03.json` | `GSC数据/index.json` | `GSC数据/` 文件清单（最新 11-11 三档）| `.hermes/logs/lane-runs.jsonl` #114-116 | `strategy-task-queue.json`（只读）| `.git/logs/HEAD` L674-681 + `refs/heads/main` + `refs/remotes/origin/main` | `SESSION_LOCK.md` 顶部（最近释放 11-08 01:53）| `2026-11-02/05/07-ZP-gsc-feedback.md`（retry 三项复核）
DELIVERED: `.hermes/logs/2026-11-12-ZP-gsc-feedback.md`, `.hermes/logs/gsc-daily-anomaly-2026-11-12.json`
NEXT: **11-13 00:00** 最新批 7d/28d 越 72h（A1 重开）→ **11-13 20:52** weekly-meta 首验（7 项 FIX + 海报 desc + 三页超带 title：en stickers 100 / ja stickers 83 / zh-hk flyers 59，单变量单批，`title-v5` #27）→ **11-14** 首轮复测：**只判方向 + 真值一致性**，7d 变更后占比 **42.9%（lag3）/ 57.1%（lag2）**、28d **10.7% / 14.3%**，28d `BACKGROUND_ONLY` → **11-18** 首个 7d 100% 窗 → **11-21** 海报/喜帖份额收敛 → **11-28** small batch 复测 → **12-01** monthly 自然轮 → **12-04** 28d 达 82.1–85.7% 才可经营判断 → **12-10** 干净 28d。**K3 动作（D1）**：补 11-12 3-4 档导出 + 重启 7892 代理 + 跑 detector + 重建 index
IDEMPOTENCY: `d67672ac54a7db55`（day 2026-11-12 / intent=`GSC 数据供给闸门 + A53 关闭验证 + 7d 词级复读` / target=`11-12 无批 + 11-11 批复读 + 窗口算术更正`）；与上轮 `68e715db3c2ba383` 不同 ⇒ 换日合法新工作；`lane-status.warnings` 4 条 `DUPLICATE_IDEMPOTENCY_KEY` 全为 10-10 / 10-28 / 10-29 / 10-30 历史键，**不含本键**
RETRY_OF: **`ZP-gsc-feedback-20261102T201308-33844` → ALREADY_DONE(since 2026-11-02 20:2x)**（内容层已交付，零重写）｜**`2026-11-05 20:13` BLOCKED 轮 → SUPERSEDED_NOT_REWRITTEN**（仅 21 行 AUTO-FILL，锁竞争，dsh 未调用）｜**`ZP-gsc-feedback-20261107T202328-28680` → CLOSED_CONTENT_AND_REMOTE**（`wrapper_exit=5` push failed，但 `f8f9c737` / `c1f1a7f8` 已在 HEAD 祖先链，`origin/main = c4a96337` 为其后继）
RETRY_DETAIL: 三项逐条裁决见 §1.1；**机器 verdict 一律保留历史 FAILED / BLOCKED，不改写**（契约 §6.3 / §7.1.2）
STATUS_GATE: **STALE_STATUS** — `lane-status.json` 85.5h 未重建；本轮用 `lane-runs.jsonl` #114-116 + 11-11/11-10 报告 + git 链做手工对账；**未写** `lane-status.json` / `lane-runs.jsonl`（共享运行证据，非车道产物）
COVERAGE: **DATA_SUPPLY_GATE + RETRY_ADJUDICATION + A53_CLOSURE_VERIFY + SEVEN_DAY_REENABLE + WINDOW_ARITHMETIC_CORRECTION** — 零新批、零页面写入、零队列状态翻转；7d 词级从 `NOT_EVALUABLE`（A53 复发 2）转为**可读但仅方向**；「lag=3」旧断言更正为非常量
CONFIDENCE: **HIGH**（无新批这一事实 / A53 三段值链 / git 链 / 时龄算术）· **MEDIUM**（7d 词级：两批 7d 窗重叠 5/7、单行样本 1–43 imp）· **LOW**（任何「部署成效」「恢复」「排名改善」结论——今日根本没有新数据）
RUN: 定时 20:13 轮；**pwsh 沙箱禁用（v9.4，不重试）** ⇒ 未跑 detector / API / index / tsc / 门禁 / xlsx 重解析；只用文件与只读工具；**零 `src/` 写入、零 title/desc、零 canonical/301、零队列状态翻转**

> **为什么是 `PARTIAL` 而不是 `OK`**：本车道的 30 天职责是「每日拉取并检测异常」。今天**没有可拉的批**（全仓无 11-12 文件、API 仍 `end1105`、detector 第 9 日空），所以 `KPI_UPDATED=false`。11-11 报告把 `OK` 定义为「当日产物完成**且** KPI 已按新批更新」——今天不满足后半句，写 `OK` 就是拿旧读数冒充新读数（违反 §0.23 与契约 §8.8）。
>
> **HOST_NOTE**：契约 §7.1.2 规定 host 遇 `VERDICT != OK` 判 `STALE` 并跳过 commit/push。本轮**不为了换推送而改判 `OK`**；若 host 因此不推，本报告仍是「今日无导出 + 72h 倒计时 + A53 已闭」的唯一载体，请由人工/K3 通道带走。这是规则冲突点（非本车道可改），建议 owner 在 §7.1.2 增加「`PARTIAL` 属数据供给阻断、可推送」的例外。

---

## 0. 一句话结论

**今天最值钱的事实不是「数据变了」，而是「数据没来，但昨天说不可用的那一层被修好了」。** ① 全仓没有任何 2026-11-12 的 GSC 文件，最新仍是 11-11 三档；7d/28d 距 72h 只剩 **3.8h**，**11-13 00:00** 必越线；② 隔夜 `e13124e5`（2026-11-12 00:01）修了 A53，我用**三段值链**独立验证通过（9.50 → 10.38 → 8.71），11-10 文件里那个块的「`previous_11_03/current_11_07` 错标」已消失，**7d 词级层首次可读**；③ 但 11-11 的 7d 窗仍有 **2/7 天**在 11-08 之后（对 11-09 只有 1/7），且 11-10→11-11 两批 7d 窗**重叠 5/7**，所以这层只作**方向**，不派单。

三件最值钱的新事实：

1. **A53 真的闭了，不是「改了 key」**：11-10 文件里那个块的**标签**是坏的（`previous_11_03/current_11_07`），但**值**其实是 11-10 批的读数；新 11-11 文件把同一组值正确挂到 `previous_11_10`，再接上 `current_11_11`。两个词逐值对上（食品包裝 10.38/21imp、即日 8.85/13imp）⇒ 值链连续，非伪造。**A53 = CLOSED_VERIFIED**。
2. **7d 词级第一读：改善多于恶化，但幅度全在噪声带**：改善 9 词（食品包裝 −1.67 且 **进入页一**、香港印刷 −5.73 且 **进入页一**、印海報 −4.68、貼紙訂製 −4.37、a2 poster −4.06、貼紙印刷 −1.07…），恶化 6 词（喜帖 +5.11、印刷公司 +5.07、小冊子 +4.00（1 imp 样本）、宣傳單張 +1.87、印刷 +1.60、pvc シール +1.06）。**7d 行样本只有 1–43 imp**，位置是展示加权均值，±1–5 位在这个样本量下不构成证据。
3. **「导出日 − 3 = 数据日」是错的，11-11 是 lag 2**：11-11 的 7d 窗是 **11-03..11-09**（数据日 11-09），导出日 11-11 ⇒ lag **2**；11-10→11-07、11-07→11-04、11-03→10-31 才是 lag 3。昨日报告的「lag=3 proven four times」与它自己的第 4 条证据自相矛盾。**影响**：11-14 的 7d 变更后占比是 **42.9%（lag3）或 57.1%（lag2）**，28d 是 **10.7% 或 14.3%**；区间两端都远低于 100% / 82%，所以「11-14 只判方向」的结论**不变**，但数字必须写成区间，不能写死 42.9%。

同时如实登记：**今日没有任何 KPI 可更新**（11-11 的数字全部标 CARRIED）；**3mo 仍缺 3 批**（11-07/11-10/11-11，今日无新批故不是「第 4 批」）；**API 188.2h**、**detector 第 9 日**、**index 仍 `latestFreshData=11-03`**（A47 复发 3）；**A51 超带 title 逾期第 8 天**；**A54 GEO owner 冲突 `next_check=2026-11-03`，已逾期 9 天**。

---

## 1. 结果总线消费与 retry 三项裁决（第 -1 优先级）

### 1.1 retry_queue 三项，逐项落判（零重跑、零改写）

| # | 队列项 | 本轮独立复核事实 | 裁决 | 证据 |
|---|---|---|---|---|
| 1 | `UNRESOLVED_DAY 2026-11-02 / FAILED` | 当日 20:2x 续跑已写 `2026-11-02-ZP-gsc-feedback.md`（`VERDICT: OK`，182 行，含 4 字段）+ `gsc-daily-anomaly-2026-11-02.json` | **ALREADY_DONE(since 2026-11-02 20:2x)**；零重跑；机器 verdict 保持 `FAILED` | 该报告首段 4 字段齐；`RETRY_OF` 指向同轮 QUOTA 失败 |
| 2 | `UNRESOLVED_DAY 2026-11-05 / BLOCKED`（锁被 daily 持 3.0 min） | 全文 21 行 AUTO-FILL：`VERDICT: BLOCKED` / `DELIVERED: NONE`；`dsh was not called` | **SUPERSEDED_NOT_REWRITTEN**：其数据窗（数据日 ≤11-04）已被 11-06/11-07/11-10/11-11 四轮覆盖；补写 = 用 11-12 的数据伪造 11-05 读数 | `2026-11-05-ZP-gsc-feedback.md` 全文 |
| 3 | `RETRY_OF ZP-gsc-feedback-20261107T202328-28680`（`wrapper_exit=5` push failed） | `f8f9c737`（20:22 报告）+ `c1f1a7f8`（20:22 产物）在 HEAD 祖先链 L649-650；`origin/main = c4a96337` 经 `3d72b543→…→9994ba18→c4a96337` 后继包含两提交 | **CLOSED_CONTENT_AND_REMOTE**：内容 + 远端双达；**零重写 11-07 报告**，机器 verdict 保留 `FAILED` | `.git/logs/HEAD` L649-651 / L678-680；`refs/remotes/origin/main` |

> **结构性噪音（第 8 轮）**：11-02 项自 11-03 起被连续重排，内容层早已闭合；生成器只读机器 verdict、不读内容层。本轮**不自行改脚本**（契约 §7.2），只登记为 F11 复发；owner = 总线脚本。
>
> **为什么 11-05 不补跑**：契约 §6.3 明确「历史缺口可以补诊断，但不得通过补跑把历史 MISSING 改写成『当时成功』」。今天补写只会产出一份「用 11-11 数据伪造的 11-05 读数」，比留空更坏。

### 1.2 盘面（`lane-status` 85.5h ⇒ 用总线 + 报告 + git 链替代）

| 车道 | 最新实况 | 与本轮关系 |
|---|---|---|
| **ZP-gsc-feedback** | 11-11 20:34 **OK**（bus #115，`dsh=0`，`wrapper=0`，`pushed=true`，head **`9994ba18`**）；11-12 = 本轮 | 断 1 日后自然轮；不声称「调度已恢复」 |
| ZP-daily-content | 11-11 21:55 **OK**（bus #116，`pushed=true`，head **`c4a96337`**） | 同侪只读；11-11 报告不重写 |
| ZP-k3-review | 11-10 / 11-11 有触发但无当日报告；scheduler 11-09 07:10 `LastResult=0` | 只读；归 k3 车道 / K3 复盘 |
| ZP-weekly-meta | 11-06 BLOCKED（脚本已修 `1e85b0d4`），下次 **11-13 20:52** | 7 项 FIX + 超带 title 唯一去处；不代跑 |
| ZP-blog-deepfix | 11-07 23:53 OK（`911def1e`），下次 11-14 | 只读 |
| ZP-monthly-matrix | 11-01 MISSING **第 12 天**；`LastTaskResult=2147946720`；next 12-01 | 仅记录（D1 已升级） |
| ZP-cron-watchdog | 11-09 06:43 重建 `lane-status`；11-10 / 11-11 / 11-12 未见新重建 | `STATUS_GATE: STALE_STATUS`（85.5h） |

- **今日同侪写入 = 无**：`run-context.sibling_lanes=[]`，且全仓 `**/*2026-11-12*` 0 命中 ⇒ 不存在「今日被别的车道改过的 GSC 文件」，跨车道避让无需触发。
- **仓库状态**：`local main = e13124e5`（2026-11-12 00:01，`fix(A53)`），`origin/main = c4a96337`，**本地领先 2 个提交**（`57614e52` docs(geo) W4 引用探针第 2 轮；`e13124e5` fix(A53) + `error-patterns.md`）。本车道只读其产物，不改写；本报告与台账由 host wrapper 在 lane 退出后 commit/push。
- **`head="REPLACE"` 占位符**：本轮总线 #114-116 已恢复真实 head（#116 `c4a96337`），A56 本批**未复现**；但 #114 的历史占位记录仍在共享总线里，**不改**。
- **人手锁**：`SESSION_LOCK.md` 顶部三项均为**已释放**（最近 11-08 01:53），无活跃人手锁；`lane.lock` 由本轮 preflight 持有（pid 28428）。本轮零 `src/` 写入，不触发 §0.35.7 双条件写入门。

### 1.3 幂等与锁

- 本轮键 `d67672ac54a7db55` ≠ 上轮 `68e715db3c2ba383`；换日 + 新目标 ⇒ 合法新工作，非重复处理。
- `lane-status.warnings` 4 条 DUPLICATE 均为 10-10 / 10-28 / 10-29 / 10-30 历史键，**不含本键**。
- preflight 9/9 ok，锁获取成功；本轮只写 2 个新文件（报告 + 台账），无覆盖、无 `.failure.md`。

---

## 2. 数据面：今日无新批，72h 只剩 3.8h

### 2.1 四平面账本（时龄按「数据日次日 00:00」起算，20:13 基准）

| 平面 | 最新档 | 窗口 / 数据日 | 时龄 @20:13 | 判定 |
|---|---|---|---|---|
| xlsx 24h | **11-11（无 11-12）** | 11-10T17 → **11-11T16** | **28.2h** | 仍是昨日窗；今日无新 24h |
| xlsx 7d | **11-11** | 11-03 → **11-09** | **68.2h** | 72h 内，余 **3.8h**（11-13 00:00 越线） |
| xlsx 28d | **11-11** | 10-13 → **11-09** | **68.2h** | 同上；**26/28 天在变更前** |
| xlsx 3mo | **11-03（carried）** | 08-01 → **10-31** | **284.2h** | 连续第 **3** 批缺（11-07/11-10/11-11）；今日无新批，故**不是**「第 4 批」 |
| API query×country | `gsc-query-country-28d-end1105.csv` | 数据日 **11-04** | **188.2h** | STALE；代理 7892 未复 |
| detector | **无 11-04..11-12 档** | 最后 = 11-03 | **9 日空** | `available:false` |
| index.json | `lastBuild=11-05 07:38` | `latestFreshData=11-03` | 落后 **3 批 / 6 个数据日** | **A47 复发 3**；门童 #9 会误判 |

- **「今日无导出」的判定方法（两法一致）**：① `**/*2026-11-12*` glob **0 命中**；② `GSC数据/` 目录清单最新三档均为 `…-2026-11-11.xlsx`。**不是**「我没找到」，是「文件不存在」。
- **一个缺失日到底损失多少**：若 lag=3，11-12 导出只会得到数据日 11-09，与 11-11 批**完全同窗**，损失为「0 天新数据」；若 lag=2（11-11 实测），11-12 导出会得到 11-10，损失 **1 天**。所以今日缺失的代价是 **0–1 天**，但 72h 时钟**照走**（按最新批数据日 11-09 计）。
- **三个平面不互相证明**：xlsx 最新 ≠ API 最新 ≠ detector 最新 ≠ index 最新。今天四个平面**全部没有前进**，只是 xlsx 仍在 72h 内。
- **`index.json` 自述 `stalenessDays=2 / FRESH` 是 11-05 构建时的旧值**，不是今天的事实；按 `latestFreshData=11-03` 与今日计，实际落后 3 批、6 个数据日。

### 2.2 今日唯一「数据产物」是异常台账，不是 KPI

- `gsc-daily-anomaly-2026-11-12.json` = 本轮的机器台账（数据供给状态 / A53 关闭证据 / 7d 复读 / 窗口算术 / 队列 / 下一验证点）。
- **§K.1.2 落盘义务本轮未履行**：API 面断（`end1105`，188.2h）+ 无 11-12 xlsx + pwsh 禁 ⇒ 无法生成 `gsc-fresh-2026-11-12.json`，也未重建 `index.json`。此缺口并入 A48 / A47，不写成「已拉数」。
- **不伪造今日读数**：本报告所有 11-11 数字均显式标 `CARRIED_2026_11_11`，不作今日 KPI。

---

## 3. A53 隔夜修复：值链验证 + 7d 词级首次可读

### 3.1 修复事实

- 提交 **`e13124e5`**（2026-11-12 00:01，`zwork`）：「fix(A53): analyzer clone chain stale anchors - seven_day_focus_deltas now 11-10->11-11 with correct keys (was 11-03 vs mislabeled 11-07)」+ `error-patterns.md` 模式登记。
- 直接复读 `gsc-2026-11-11-money-keyword-delta.json`：`seven_day_focus_deltas` 38 条（改善 9 / 恶化 6 / 平 13 / 无可比基线 10），键已变 `previous_11_10` / `current_11_11`；`gsc-2026-11-11-four-window-analysis.json` 的 `page1_transitions_7d` 已从旧值（small batch stickers / doujinshi printing / 香港印刷）变为 **`["食品包裝印刷","香港印刷"]`**，与 7d delta 的 `ENTERED_PAGE_1` 互证。

### 3.2 双方法验证（为什么这不是「只改标签」）

**方法 A · 三段值链**（同词跨三份文件逐值比对）：

| 词 | 11-07 文件 `current_11_07` | 11-10 文件 `current_11_07`（标签坏、值为 11-10 读数） | 11-11 文件 `previous_11_10` | 11-11 文件 `current_11_11` |
|---|---|---|---|---|
| 食品包裝印刷 | 9.50 / 26 imp | **10.38 / 21 imp** | **10.38 / 21 imp** ✅ | 8.71 / 24 imp |
| 即日印刷 | 8.88 / 16 imp | **8.85 / 13 imp** | **8.85 / 13 imp** ✅ | 8.53 / 15 imp |

**方法 B · 增量算术**：`10.38 → 8.71 = −1.67`、`8.85 → 8.53 = −0.32`，与文件 `delta_position` 完全一致；`direction` / `page1_transition` 与 `four_window.page1_transitions_7d` 一致。

⇒ **两法一致 ⇒ A53 = `CLOSED_VERIFIED`**（不是复发 3，也不是「re-key only」）。**仍留回归风险**：clone 链生成器必须在每次生成后断言内部日期锚点，下一次（11-13 批）要复验键名。

### 3.3 7d 词级第一读（11-10 批 → 11-11 批；⚠️ 两窗重叠 5/7）

| 方向 | 词 | 11-10 pos | 11-11 pos | Δ | 7d imp | 7d clk | 备注 |
|---|---|---:|---:|---:|---:|---:|---|
| 改善 | **食品包裝印刷** | 10.38 | **8.71** | **−1.67** | 24 | 0 | **ENTERED_PAGE_1** |
| 改善 | **香港印刷** | 11.33 | **5.60** | **−5.73** | 10 | 1 | **ENTERED_PAGE_1**（head 词，非钱词池） |
| 改善 | 印海報 | 23.29 | 18.61 | −4.68 | 18 | 0 | 与 28d 方向相反（见 §3.4） |
| 改善 | 貼紙訂製 | 27.62 | 23.25 | −4.37 | 8 | 0 | 小样本 |
| 改善 | a2 poster | 47.33 | 43.27 | −4.06 | 11 | 0 | **与 28d +9.17 冲突** |
| 改善 | 包裝盒訂製 | 31.12 | 28.36 | −2.76 | 14 | 0 | 仍深位 |
| 改善 | 宣傳單張印刷 | 28.66 | 26.46 | −2.20 | 28 | 0 | 与「宣傳單張」不同词 |
| 改善 | 貼紙印刷 | 26.74 | 25.67 | −1.07 | 39 | 0 | 五档连续改善，仍零点击 |
| 改善 | 紙盒印刷 | 32.56 | 31.50 | −1.06 | 16 | 0 | 仍深位 |
| 恶化 | **喜帖印刷** | 44.60 | **49.71** | **+5.11** | 14 | 0 | 与 28d 同向 |
| 恶化 | 印刷公司 | 23.77 | 28.84 | +5.07 | 31 | 1 | 与 28d 同向 |
| 恶化 | 小冊子印刷 | 14.00 | 18.00 | +4.00 | **1** | 0 | **样本闸门（1 imp）** |
| 恶化 | 宣傳單張 | 39.13 | 41.00 | +1.87 | 32 | 0 | 与 28d 同向 |
| 恶化 | 印刷 | 20.94 | 22.54 | +1.60 | 39 | 1 | 泛词 |
| 恶化 | pvc シール | 13.44 | 14.50 | +1.06 | 6 | 0 | 小样本 |
| 平 | 即日 / 月曆 / 海報印刷 / 書刊 / 包裝盒 / small batch stickers / china catalog / 教材 / コミケ / 學校 / 印書 / 利是封 / doujinshi | — | — | −0.99..+0.42 | 10–42 | 0–2 | 机器 `direction` 多为 STABLE |

- **7d 的窗口结构**：11-10 批 7d = 11-01..11-07；11-11 批 7d = 11-03..11-09。**重叠 5/7 = 71.4%**，换掉 11-01/11-02、加入 11-08/11-09（部署日 + 变更日）。所以本表 delta 是**两日替换效应**，不是「新一周的独立实验」。
- **样本闸门**：单行 7d 展示 1–43，`小冊子` 1 imp 的 +4.00 位、`pvc シール` 6 imp 的 +1.06 位一律不入决策；`saddle stitch booklet printing` / `large envelopes` / `卒アル販売` / `教科書印刷` 在 7d 块为 `NO_COMPARABLE_BASELINE`（**缺行 ≠ 零需求**；`卒アル販売` 28d 仍是 16 imp / pos 5.00）。
- **可用性结论**：7d 词级层从 `NOT_EVALUABLE` 升级为 **`EVALUABLE_DIRECTION_ONLY`**；**不派单、不 SCALE、不回滚**。

### 3.4 跨窗一致性（7d vs 28d，仅列方向）

| 关系 | 词 | 7d Δ | 28d Δ | 处置 |
|---|---|---:|---:|---|
| 一致改善 | 貼紙印刷 | −1.07 | −0.77 | `MEASURE`（142 imp / 0 clk；14 天/12-04 窗 HOLD） |
| 一致恶化 | 宣傳單張 | +1.87 | +0.89 | 已在 28d 两窗恶化名单；等 11-14 方向 |
| 一致恶化 | 喜帖印刷 | +5.11 | +1.39 | 小样本；11-14 / 11-21 复测 |
| 一致恶化 | 印刷公司 | +5.07 | +0.27 | 泛词，不派单 |
| **冲突** | a2 poster | **−4.06** | **+9.17** | 短窗改善 / 长窗加速恶化 ⇒ **两窗互相抵消，不判** |
| **冲突** | 海報印刷 | −0.48 | +0.94 | 同上；11-21 看份额 |
| 同向弱改善 | 食品包裝印刷 | −1.67 | −0.08 | 7d 进页一，28d 仍 107 imp / 0 clk ⇒ FIX 候选不变 |

> **规则引用**：11-07 四窗差分块第 3 条「7d 短窗恶化不得单独派单」；本批 `a2 poster` 正是反例——若只看 7d 会得出「改善 4 位」的错误结论，只看 28d 会得出「加速恶化」的另一错误结论。**7d/28d 冲突时一律不判**。

---

## 4. 「lag=3」断言更正：11-11 是 lag 2（影响窗口算术，不改结论）

### 4.1 事实

| 导出日 | 7d 窗起点 | 数据日 | lag（导出日 − 数据日） |
|---|---|---|---:|
| 2026-10-30 | 10-21 | 10-27 | 3 |
| 2026-11-03 | 10-25 | 10-31 | 3 |
| 2026-11-07 | 10-29 | 11-04 | 3 |
| 2026-11-10 | 11-01 | 11-07 | 3 |
| **2026-11-11** | **11-03** | **11-09** | **2** |

- 昨日报告写「11-03→10-31、11-07→11-04、11-10→11-07、**11-11→11-09**，均为 `导出日 − 3 = 数据日`」——**第 4 条与结论自相矛盾**（11-11 − 3 = 11-08 ≠ 11-09）。本轮按 `four_window.workbooks["2026-11-11"].7d.chart.window = 2026-11-03..2026-11-09` 逐字复核，判 **lag 非常量**。
- **这是措辞/口径更正，不是数据撤回**：11-11 的 7d/28d 读数本身没错，错的是「lag 恒为 3」的推断。原报告 commit `9994ba18`（2026-11-11 20:33），更正日期 2026-11-12。

### 4.2 11-13 / 11-14 双 lag 窗口表（数字必须写区间）

| 复测导出日 | 数据日（lag3 / lag2） | 7d 窗（lag3 / lag2） | 7d 变更后（对 11-09） | 28d 变更后（对 11-09） |
|---|---|---|---:|---:|
| **11-13** | 11-10 / 11-11 | 11-04..11-10 / 11-05..11-11 | **28.6% / 42.9%** | **7.1% / 10.7%** |
| **11-14** | 11-11 / 11-12 | 11-05..11-11 / 11-06..11-12 | **42.9% / 57.1%** | **10.7% / 14.3%** |
| 11-18 | 11-15 / 11-16 | 11-09..11-15 / 11-10..11-16 | **100% / 100%** | 25.0% / 28.6% |
| 11-21 | 11-18 / 11-19 | 11-12..11-18 / 11-13..11-19 | 100% / 100% | 35.7% / 39.3% |
| 11-28 | 11-25 / 11-26 | 11-19..11-25 / 11-20..11-26 | 100% / 100% | 60.7% / 64.3% |
| **12-04** | 12-01 / 12-02 | 11-25..12-01 / 11-26..12-02 | 100% / 100% | **82.1% / 85.7%** |
| 12-10 | 12-07 / 12-08 | 12-01..12-07 / 12-02..12-08 | 100% / 100% | 100% / 100% |

- **结论不变**：无论 lag 2 还是 3，**11-14 的 7d 都 <100%、28d 都 <15%** ⇒ 11-14 只能「方向 + 真值一致性」，28d `BACKGROUND_ONLY`；**12-04 仍是首个 28d 经营判断窗**（82.1% 或 85.7%）。
- **对 runbook 的建议不变（交 owner，本车道不改文件）**：`docs/2026-11-09-retest-1114-runbook.md` 规则 1 的 `14.15 → ≤10` 数值门槛在 10.7%–14.3% 变更后天数下，真实 +4 位只能显示 ≈0.4–0.6 位，会被稀释本身判死；把数值门槛移到 **11-18（7d）/ 12-04（28d）**。
- **对飞轮账本的影响（A57 升级）**：`window_math.dilution_table` 的 28d 列 = 11-14 **10.7**、11-18 **28.6**、11-21 **39.3**、11-28 **64.3**、12-04 **82.1**。按本报告算术，11-14 与 12-04 落在 **lag3** 列（10.7 / 82.1），而 11-18 / 11-21 / 11-28 落在 **lag2** 列（28.6 / 39.3 / 64.3）⇒ **同一张表混用了两种 lag，本身不一致**。本轮不改共享账本，登记 A57，owner = 账本维护方；下一版必须按「工作簿实际数据日」逐行重算。

---

## 5. KPI：今日不更新，以下全部 `CARRIED_2026_11_11`

| 窗口 | 点击 | 展示 | CTR | 平均排名 | 窗口 | 状态 |
|---|---:|---:|---:|---:|---|---|
| 24h | 17 | 940 | 1.8085% | 11.6273 | 11-10T17..11-11T16 | **CARRIED（龄 28.2h）** |
| 7d | 158 | 7,528 | 2.0988% | 13.9523 | 11-03..11-09 | **CARRIED（龄 68.2h）** |
| 28d | 567 | 24,997 | 2.2683% | 14.5784 | 10-13..11-09 | **CARRIED（龄 68.2h）** |
| 3mo | 1,279 | 65,252 | 1.9601% | 17.355 | 08-01..10-31 | **CARRIED（11-03 档）** |

- **双方法对账（针对 11-11 批，非今日）**：`two_method_reconciliation["2026-11-11"]` 的 7d / 28d 在 clicks / impressions / weighted_position / focus_page1 上 `match=true`；CTR 独立复算 17/940=1.8085%、158/7528=2.0988%、567/24997=2.2683%，三行吻合。
- **本报告不重复展开 11-11 的 delta / 国家 / 页级 / 钱词 28d 表**：那些已在 `2026-11-11-ZP-gsc-feedback.md` 与 `gsc-daily-anomaly-2026-11-11.json` 交付，重复即违反幂等（契约 §二.1）。今日只新增 **A53 关闭** 与 **7d 词级** 两层。
- **钱词页一池（28d，CARRIED）**：6 词页一 / 5 词零点击 / **147 imp / 0 clk**（食品包裝 107 + small batch sticker printing 20 + saddle stitch 3 + large envelopes 1 + 卒アル販売 16）。池子未缩；今日无新 28d，**不重算、不宣称改善**。

---

## 6. 恢复链（carried；今日无点）

- **官方系数最后值 123.7%**（`gsc-cliff-2026-11-03.json`，977 ÷ 789.8，full-country）；detector 自 11-04 起无档 ⇒ `available:false` 第 9 日。
- **派生点全部标 `DERIVED_NOT_DETECTOR`**：11-07 96.98%（803/827.96）、11-10 130.0%（1,124/864.82）、11-11 105.3%（940/892.75）。**11-12 无 24h，故无 11-12 派生点**。
- **streak = 0/3**：官方点 10-29 / 10-30 / 11-03 不连续（缺 10-31..11-02）；derived 不计入。
- **UNKNOWN 三项**：人工处罚状态、排名恢复、索引覆盖率 —— 四档无索引 sheet，今日无处罚页核验，**不编造**。
- **spam 恢复周报（本周节）**：数据面**未继续恢复**（今日零新批）；曲线仍是围绕 100–130% 的宽幅震荡，且三个派生点星期结构不同。**一句结论：可测量性今日回退，恢复状态仍不可判定。**

---

## 7. 异常清单状态迁移

### 7.1 今日关闭

| ID | 11-11 状态 | **11-12** | 依据 |
|---|---|---|---|
| **A53 MONEY_7D_BLOCK_STALE** | RECURRENCE_2 | **CLOSED_VERIFIED** | `e13124e5` + 三段值链（§3.2）+ `page1_transitions_7d` 重生成 |
| A56 BUS_HEAD_PLACEHOLDER | NEW P3 | **NOT_REPRODUCED**（历史记录仍在） | 总线 #114-116 已为真实 head；不改历史行 |

### 7.2 今日重开 / 复发

| ID | 11-11 状态 | **11-12** | 依据 |
|---|---|---|---|
| **A1 DATA_STALE** | RESOLVED_TODAY_THIN | **PENDING_REOPEN（11-13 00:00）** | 无 11-12 导出；7d/28d 龄 68.2h，余 3.8h |
| **A2 FROZEN_24H** | CLOSED_TODAY | **REOPENED_DAY1** | 无 11-12 24h；最后窗止 11-11T16，龄 28.2h |
| **A36 XLSX_NOT_REFRESHED** | CLOSED_BY_HUMAN | **REOPENED** | 11-12 三档未落盘 |
| **A44 DETECTOR_RUNTIME** | OPEN_DAY8 | **OPEN_DAY9** | `gsc-cliff-*` 止于 11-03；pwsh 禁 ⇒ 不可重试 |
| **A47 GSC_INDEX_NOT_REBUILT** | RECURRENCE_2 | **RECURRENCE_3** | 11-07/11-10/11-11 三批仍未进 index；`latestFreshData=11-03` |
| **A51 FLYERS_TITLE_OVER_BAND** | OPEN_OVERDUE_DAY7 | **OPEN_OVERDUE_DAY8** | flyers 59 > 58；归 weekly-meta 11-13 |
| **A54 GEO_PROBE_OWNER_CONFLICT** | OPEN | **OPEN_OVERDUE_9D** | 队列 `next_check=2026-11-03`，已逾期 9 天 |
| **A43 RUN_GAP** | PARTIAL | **PARTIAL（不变）** | gsc 11-08 MISSING；monthly 第 12 天 |
| **A45 RECOVERY_DENOMINATOR** | OPEN_RISK_UP | **OPEN（冻结）** | 今日无新 derived，风险不增不减 |
| **A46 RETEST_WINDOW_DILUTION** | CONFIRMED_BY_1111_BATCH | **CONFIRMED + 区间化** | 11-14 = 42.9–57.1%（7d）/ 10.7–14.3%（28d） |
| A48 LANE_PULL_INCAPABLE | OPEN | **OPEN** | 仍无 API / detector / xlsx 重解析能力 |
| A49 / A50 / A52 / A55 | 不变 | **carry** | 无新证据；不改对端文件 |

### 7.3 今日新开

| ID | 级别 | 状态 | 要点 | recovery_plan |
|---|---|---|---|---|
| **A57 EXPORT_LAG_NOT_CONSTANT** | P2 | NEW | 11-11 导出 → 数据日 11-09 = **lag 2**，推翻「lag=3 proven four times」；账本 `dilution_table` 同一张表混用 lag2 / lag3（11-14、12-04 = lag3；11-18/21/28 = lag2） | `modify_payload`（owner=账本/runbook；下一版按工作簿实际数据日逐行重算，不按 `导出日−3`） |
| **A58 LEDGER_DATA_SUPPLY_STALE** | P3 | NEW | 账本 `data_supply` 写于 11-10 08:35：`latest_xlsx=11-07`，行动项仍要求导出「11-08/09/10」，而 11-10/11-11 已落盘 | `modify_payload`（owner=账本维护方；本轮只读不改，避免与同侪撞车） |
| **A59 SEVEN_DAY_SMALL_SAMPLE** | P3 | NEW | 7d 词级恢复可读，但单行 1–43 imp、两批窗重叠 5/7；机器 `direction` 对 −0.99 仍标 STABLE | `none`（作为测量限制登记；任何 7d 词级结论必须带样本与重叠率） |

---

## 8. 三条队列（只做证据与候选，不翻状态、不派单）

### 8.1 机会队列

| ID | 状态 | 11-12 证据 |
|---|---|---|
| OPP-01 页一零点击池 | **OPEN（CARRIED）** | 5 词零点击 / 147 imp / 0 clk（28d，11-11 批）；今日无新 28d |
| OPP-02 新进页一 | **UPDATED（7d）** | 7d 新进页一 = **食品包裝印刷**（8.71，24 imp）+ **香港印刷**（5.60，10 imp / 1 clk）；**两者都已在 28d 池/已知词内，不是新词** |
| OPP-03 两窗改善 | **2 词，仍零点击** | 貼紙印刷 7d −1.07 / 28d −0.77，142 imp / 0 clk；學校印刷 7d −0.35 / 28d −0.67，50 imp / 0 clk ⇒ MEASURE，不 SCALE |
| OPP-04 产品摘要结构 | **MEASURE → monthly** | 无新结构数据；EN catalog 358 imp / 1 clk、design-file-specs 301 / 0 仍是单页样本 |
| OPP-05 市场 CTR 差 | **MEASURE → monthly** | HK 2.7302% / JP 1.7042% / US 1.2212%（搜索者位置，非 locale 业绩，CARRIED） |
| OPP-06 页一零点击单页 | **NEW_OBSERVATION（carried）** | `/zh-hk/blog/design-file-specs/` 301 imp / 0 clk / pos 5.51；缺 SERP 与 title/desc 真值，**只登记不派单** |

### 8.2 退场候选（停止追加投入）

- 无新增。EXIT-01..08 维持；**EXIT-08 `海報印刷`** 本批 7d −0.48（STABLE）与 28d +0.94 冲突 ⇒ **不因 7d 短窗改判**，继续与 `印海報` 合并观察。
- **`a2 poster`**：28d +9.17（加速恶化）但 7d −4.06（改善）⇒ 冲突，**不进退场、不回滚**；11-18 首个 7d 100% 窗再判。
- **红线**：8 个两窗恶化词的 28d 仍有 26/28 天在 11-08 之前，**不得**记成「部署失败」。

### 8.3 内耗候选（仍是假设，无 query×page join）

| ID | 状态 | 证据 |
|---|---|---|
| IF-01 posters | **DEPLOYED_AWAIT_SHARE** | `category/posters` 288 imp / 1 clk / 42.03 vs `blog/poster-printing-guide` 1,349 / 16 / 9.71（差 32.3 位；CARRIED） |
| IF-02 books | **MEASURE** | `category/books` 677 / 2 / 50.11 vs blog 449 / 1 / 36.06；双深位 |
| IF-03 stickers | **HOLD_GATE_MET** | 貼紙印刷 142 / 0 / 34.58；数据日 11-09 已达 gate，仍按 14 天/12-04 决策窗 HOLD，**不动 title** |
| IF-04 food packaging | **MEASURE** | `product/food-boxes` 336 / 2 / 29.64；blog 侧本批未进 top20 ⇒ `NO_CURRENT_BASELINE` |
| IF-05 海报主承接 | **K3_REVIEW_CANDIDATE** | category 42.03 vs blog 9.71；11-21 若份额未收敛，应复评「主承接 URL 选型」而非回滚 |

### 8.4 交接项标准字段（本批零派单，仅登记）

| 项 | owner_lane | baseline | required_action | approval_gate | retry_at / cooldown | production_deploy / online_verify | retest | exit_criteria |
|---|---|---|---|---|---|---|---|---|
| **FIX-01 食品包裝印刷** | ZP-weekly-meta | 28d 107 imp / 0 clk / 8.63；7d 24 imp / 0 / 8.71 | 先记录 SERP feature 与真实 title/snippet，再决定单变量改 title/desc | 11-13 自然轮 + `title-v5` #27（无需新 K3） | 11-13 / 7d | 无 / 无 | 11-18（7d 100%）、12-04（28d） | 28d CTR >0 且展示不塌；否则 HOLD |
| **MEASURE-08 海報印刷** | ZP-gsc-feedback | 28d 224 imp / 1 clk / 16.49；7d 31 / 0 / 19.65 | 复评「主承接 = category」的份额是否收敛；**不改 title** | K3 11-08 01:38 已批主 URL | 11-14（方向）/ 14d | `9acc3d16` / 4/4 PASS | 11-21 | category 份额向 blog 收敛；否则复评选型，不回滚 |
| **FIX-02 small batch sticker printing** | ZP-gsc-feedback | 28d 20 imp / 0 / 7.15；7d 1 imp（无可比基线） | 等美国英文 SERP 同口径复测 | SERP 可得性 | 11-28 / 14d | 无 / 无 | 11-28 | SERP 记录成功或 `SERP_UNAVAILABLE` |

> **队列纪律**：本车道**不**改 `strategy-task-queue.json` 任何状态；`WAITING_K3` / `BLOCKED_INFRA` / `SCHEDULED` 一律不翻 READY（契约 §7.2）。以上仅为候选与证据。

---

## 9. 跨车道对账与写盘隔离

| 今日他方写入 | 时间 / commit | 本轮处置 |
|---|---|---|
| `e13124e5` fix(A53) + `error-patterns.md` | 2026-11-12 00:01（本地，未推） | **只读消费**；本报告复验其值链，**不改其文件** |
| `57614e52` docs(geo) W4 引用探针第 2 轮 | 2026-11-11 23:42（本地，未推） | **只读**；不与 GSC 判读混写 |
| `c4a96337` daily 11-11 报告 | 11-11 21:54（origin 顶端） | **只读**；其貼紙 35.35（数据日 11-07）与本批 7d 34.58 口径不同，不互相改写 |
| `gsc-2026-11-11-four-window-analysis.json` / `-money-keyword-delta.json` | 隔夜重生成 | **只读消费**；A53 关闭依据，不改文件 |
| `flywheel-learning-ledger.json` | 11-10 08:35（他方） | **只读**；本轮无 deploy / online_verify / 11-14 复测读数 ⇒ 无强制回写；A57 / A58 交 owner |
| `strategy-task-queue.json` / `lane-status.json` / `lane-runs.jsonl` / `GSC数据/index.json` | 共享证据 | **零手改**；A47 / A54 / A58 交 owner |
| `src/`、title/desc、canonical/301、blog-data、CSV/生成器 | — | **零触碰** |

**本轮写盘**：仅 **2 个新文件** —— 本报告 + `gsc-daily-anomaly-2026-11-12.json`。无覆盖、无 `.failure.md`、无 `src/`、无 `docs/`、无账本改写、无队列翻转。
**Git 状态**：`local main = e13124e5`，`origin/main = c4a96337`（本地领先 2）；本报告与台账由 host wrapper 在本 lane 退出后 commit/push。

---

## 10. K3 升级（4 个决策点，均可一句话拍板）

### D1 · 🔴 P0 数据面今日零前进：11-12 无导出 + 3mo/API/detector/index 四缺

> **事实**：① 全仓无 11-12 任何 GSC 文件（glob 0 命中）；② 3mo 连续第 3 批缺（11-07/11-10/11-11）；③ API 仍 `end1105`（数据日 11-04，**188.2h**）；④ detector 第 9 日无档；⑤ index 仍 `latestFreshData=11-03`（3 批未收录）。
> **推荐 (A)**：K3 今日补 **11-12 的 24h/7d/28d/3mo 四档**（全国家、网页搜索）+ 重启 7892 代理；随后 host 跑下面命令。**11-13 00:00 是最新批 72h 线，只剩 3.8h。**

```powershell
cd F:\zprintpro-nextjs
python scripts\fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-12
python scripts\gsc-cliff-detector.py
node scripts\rebuild-gsc-index.mjs --write
powershell -NoProfile -Command "Get-ScheduledTaskInfo -TaskName ZP-gsc-feedback,ZP-daily-content,ZP-monthly-matrix,ZP-k3-review | Format-List TaskName,LastRunTime,LastTaskResult,NextRunTime"
```

- 备选 (B)：只补 11-12 三档（不含 3mo）先过 72h，3mo 与 API 留到 11-14；(C) 等 11-14 与复测同批——**不推荐**，会把 11-13 weekly-meta 与 11-14 首窗一起废掉。

### D2 · 🟠 P1 11-14 复测：数值门槛必须后移，且数字要写区间

> **推荐 (A)**：11-14 删除 runbook 规则 1 的 `14.15 → ≤10` 数值门槛，只留「真值一致性 + 方向」；数值门槛移到 **11-18（7d 100%）/ 12-04（28d 82.1–85.7%）**。
> **新证据**：11-14 的 7d 变更后占比是 **42.9%（lag3）或 57.1%（lag2）**，28d 是 **10.7% / 14.3%**（A57）。在 10.7% 下，真实 +4 位只能显示 ≈0.43 位，会被稀释本身判死。
> **备选 (B)**：照旧用 28d 判——风险是把「稀释」读成「无效」并触发二次改动；(C) 全推到 12-10——太晚，错过 11-21 的 7d 信号。

### D3 · 🟡 P2 GEO 探针 owner 冲突（A54）：逾期 9 天，请一句话定 owner

> **事实**：`strategy-task-queue.json` 写 `GEO-20261103-AI-PROBE-S1` owner=`ZP-gsc-feedback`、status=`SCHEDULED`、`next_check=2026-11-03`（已逾期 9 天）；`flywheel-learning-ledger.json` 写 owner=`ZP-weekly-meta`、`blocked_reason=11-10 复测未执行`。两个 owner 都没跑。
> **推荐 (A)**：owner 定为 **ZP-weekly-meta**（其 11-13 轮已有 measurement 批次），gsc 车道只消费结果；本轮**不声称已复测、不写任何 AI 引用增长/下降结论**。备选 (B) gsc 每周三附带跑；(C) 暂缓到 12 月。

### D4 · 🟡 P1 超带 title 族逾期第 8 天：flyers 59 + stickers 100/83

> **推荐 (A)**：11-13 weekly-meta 自然轮**一次单批**处理三页（en stickers 100→55、ja stickers 83→52、zh-hk flyers 59→≤57），逐页单变量、过 `title-v5` #27、登记为 11-14 confounder。**这是合规修正（>58 阻断线），不是排名实验。**
> **备选 (B)**：等 11-22（避开复测窗）——阻断线再挂 12 天；(C) 交 daily-content——owner 漂移风险（11-08 已试过）。

### 非阻塞 carry（不占 4 条）

- **A57 lag 口径**：账本 `dilution_table` 同一张表混用了 lag3（11-14 / 12-04）与 lag2（11-18 / 11-21 / 11-28），runbook 又写「lag=3」；两者都要改为「按工作簿实际数据日逐行重算」。本轮只登记，不改共享文件。
- **A58 账本 data_supply 过时**：写于 11-10 08:35，仍要求导出 11-08/09/10；交账本 owner 更新。
- **A47 index**：3 批未收录，门童 #9 会把新档判成「不存在」。
- **A53 回归风险**：下一次生成（11-13 批）必须再验 `previous_*` / `current_*` 键名与值链。
- **IF-05 海报主承接选型**：category 42.03 vs blog 9.71，32.3 位差距；11-21 若份额未收敛，建议 K3 复评「主承接 URL」而非回滚。
- **6 项 WAITING_K3**（BLOG-CERT / STICKER-ZH-TRUTH / STICKER-PRICE-THREE-LAYER / BLOG-H1-BRAND / FIVE-CATEGORY-TRUTH / PRIMARY-URL-MISMATCH）→ 维持 HOLD，执行层不自批。
- **§0.0 名片解禁块 (a)/(b)/(c)** 自 2026-09-12 未裁 → 继续零触碰（不建页、不改 301、不动贺卡资产）。

---

## 11. 下一验证点

| 日期 | 验什么 | 通过标准 / 失败动作 |
|---|---|---|
| **2026-11-13 00:00** | 最新批 7d/28d 越过 72h | 若 11-12 未补导出 ⇒ A1 重开、KPI 面 STALE |
| **2026-11-13 20:13** | 新导出（11-13） | 有 24h/7d/28d ⇒ 恢复可读；同时复验 A53 键名未回归 |
| **2026-11-13 20:52** | weekly-meta 脚本修复后首验 | preflight 全过；7 项 FIX + 海报 desc + 三页超带 title 单批、单变量、`title-v5` PASS |
| **2026-11-14** | 首轮复测（11 实验 / 15 交接） | **只判方向 + 真值一致性**；28d `BACKGROUND_ONLY`；7d 仅 42.9–57.1%，不得作 STOP/回滚依据 |
| **2026-11-18** | 首个 7d 100% 变更后窗 | 7d 方向 + Δpos；与 11-14 是否同向；a2 poster 是否止跌 |
| **2026-11-21** | 第二窗：海报/喜帖份额是否收敛 | 7d 可判；28d 仍 35.7–39.3% ⇒ 背景；IF-05 选型复评触发点 |
| **2026-11-28** | small batch 复测（美国英文 SERP + 同口径 28d） | SERP 不可得则继续 `SERP_UNAVAILABLE`；不编造 |
| **2026-12-01** | monthly 自然触发（第 12 天缺口） | 有 run 记录 + 月报告；否则 dead_letter |
| **2026-12-04 / 12-10** | 28d 达 82.1–85.7% / 100% 变更后天数 | 才可做 SCALE/HOLD/FIX/STOP；六件齐才 SCALE |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先读前序实现路径：`2026-11-11` 报告（7d 词级 NOT_EVALUABLE，A53 复发 2）→ `e13124e5`（隔夜修 A53）→ 三份 money JSON 的值链比对。未凭 commit message 断言「已修」，而是逐值复算（10.38/21imp、8.85/13imp 两词双证）；同时发现 11-11 报告「lag=3」与其证据矛盾，登记 A57。
- [x] **2. 约束适用范围？** 契约 §6.1「gsc 只给任务、不改页」⇒ 零 `src/`、零 title/desc、零队列翻转；§7.1「STALE_STATUS 不派运维修复」⇒ lane-status 85.5h，只用总线 + 报告 + git 链；§8.3/§8.6「只写自己条目 + 不自批」⇒ 账本今日无强制回写，只读；§0.23（数字只来自真值）；§0.37（不接 GA4/008/订单）；§0.0（名片只接单不建页）；§0.35.7（无活跃人手锁，且本轮零 src 写入）。
- [x] **3. 原数据/拍板来源？** ① 来源：11-11 三档 xlsx 的分析 JSON（隔夜重生成）+ 11-10/11-07 money JSON + `GSC数据/index.json` + 总线 #114-116 + git 链；② 真数据：A53 三段值链双词一致、7d delta 算术可复算、无新批这一事实由 glob + 目录清单双法确认；③ 留/撤：**零数据撤回**；仅更正「lag=3」推断（非数据），原报告 commit `9994ba18` 已标注；A53 由复发 2 改为关闭。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入；价格/MOQ 只作对端部署的证据引用，不新增价格声明。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告与 JSON 台账；无 user-facing 文本，不触发 `parseInlineLinks`。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-12 20:13:03, preflight 9/9 ok, lock pid 28428, retry_queue 3, key d67672ac54a7db55) · lane-status.json (2026-11-09 06:43, 85.5h, STALE_STATUS, file bus_records=108 at generation, lane-runs now #116, verdict=ATTENTION)
- GSC 分析 (隔夜重生成): gsc-2026-11-11-four-window-analysis.json (workbooks["2026-11-11"]: 24h 17/940/1.8085/11.6273; 7d 158/7528/2.0988/13.9523 window 11-03..11-09; 28d 567/24997/2.2683/14.5784 window 10-13..11-09; two_method_reconciliation 11-11 match=true; page1_transitions_7d=["食品包裝印刷","香港印刷"]) · gsc-2026-11-11-money-keyword-delta.json (seven_day_focus_deltas 38 条, previous_11_10/current_11_11)
- A53 值链: gsc-2026-11-07-money-keyword-delta.json (食品包裝 current_11_07 = 9.50/26imp) · gsc-2026-11-10-money-keyword-delta.json (该块标签 previous_11_03/current_11_07, 值 10.38/21imp 与 8.85/13imp) · gsc-2026-11-11-money-keyword-delta.json (previous_11_10 = 同值)
- 修复提交: e13124e5 (2026-11-12 00:01, fix(A53): analyzer clone chain stale anchors + error-patterns.md)
- 数据供给: GSC数据/ 清单最新 = 2026-11-11 三档; 3个月…2026-11-03.xlsx (data day 10-31); gsc-query-country-28d-end1105.csv (data day 11-04); .hermes/logs/gsc-cliff-2026-11-03.json (最后官方 123.7%); GSC数据/index.json (lastBuild 11-05 07:38, latestFreshData 11-03)
- 时龄口径: 数据日次日 00:00 起算, 20:13 基准 → 24h 28.2h / 7d+28d 68.2h / 3mo 284.2h / API 188.2h / lane-status 85.5h
- 调度真值: 2026-11-10-scheduler-truth-refresh.md (01:29 实测) · flywheel-learning-ledger.json scheduler_truth (11-10 01:29)
- retry 复核: 2026-11-02-ZP-gsc-feedback.md (VERDICT OK) · 2026-11-05-ZP-gsc-feedback.md (21 行 AUTO-FILL BLOCKED) · 2026-11-07-ZP-gsc-feedback.md (content OK / machine FAILED)
- 版本链: .git/logs/HEAD L649-651, L674-681 · refs/heads/main = e13124e5 · refs/remotes/origin/main = c4a96337 (local ahead 2: 57614e52, e13124e5)
- 环境: pwsh 沙箱禁用 (v9.4, 不重试) ⇒ detector / API / index / tsc / 门禁 / xlsx 重解析 / schtasks 未实跑; commit/push 由 host wrapper 兜底
校准状态: 🟢 已校准 (2026-11-12) — 无新批事实 / A53 值链 / 7d delta 复算 / 时龄 / git 链 = 一手直读或可复算; 🟡 7d 词级 = 两批窗重叠 5/7 + 单行 1–43 imp; 🟡 lag = 2 或 3, 11-14 数字写区间; 🟡 3mo = 11-03 携带; 🔴 detector = missing 第 9 日
撤回声明: 无数据撤回。更正 1 项措辞/推断: 2026-11-11 报告 (commit 9994ba18, 2026-11-11 20:33) 的「export lag = 3 (proven four times)」与第 4 条证据 (11-11→11-09) 矛盾, 本轮按工作簿改为「lag 非常量」; 11-11 读数本身不变。
口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用结论 (A54); 零客户可见内容写入。**无老站 z-printpro.com 对比基线** —— 现有 GSC 档均为新站 zprintpro.com 属性 (§0.30.9 显式声明)。
```

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 今日 KPI | **今日没有任何新 GSC 批**；表中 24h/7d/28d/3mo 全部 `CARRIED_2026_11_11`，不是 11-12 读数 |
| 2 | 11-08 / 11-09 部署的「成效」 | 11-11 的 28d 有 26/28 天在变更前；7d 仅 2/7（28.6%）变更后；7d 词级又只覆盖两批窗重叠 5/7 ⇒ 只能判方向 |
| 3 | 官方恢复系数 | detector 第 9 日无档 ⇒ `available:false`；105.3% 是 11-11 derived 且**今日无新派生点** |
| 4 | 7d 词级幅度 | 单行 1–43 imp；`小冊子` 1 imp 的 +4.00 位、`pvc シール` 6 imp 的 +1.06 位均不入决策 |
| 5 | `a2 poster` / `海報印刷` 的方向 | 7d 与 28d 相反；冲突时不判，等 11-18 的 100% 7d 窗 |
| 6 | 11-14 的变更后占比 | lag 2 或 3 未定 ⇒ 42.9–57.1%（7d）/ 10.7–14.3%（28d），**不得只写 42.9%** |
| 7 | 3mo | 11-03 携带（数据日 10-31，284.2h），非今日；今日无新批故仍是「缺 3 批」 |
| 8 | index 新鲜度 | `index.json` 自述 `FRESH/stalenessDays=2` 是 11-05 旧值，与实际 `latestFreshData=11-03` 不符 |
| 9 | 调度器状态 | 引 11-10 01:29 实测；本轮触发归属 unknown（可能 harness/人工补跑） |
| 10 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在 lane 退出后写入；本报告只声称 ③「当日报告」+ ④「20:13 preflight 持锁」 |
| 11 | 历史 verdict | 11-02 / 11-05 / 11-07 的机器状态不改写；本轮只判「内容是否已交付 / 远端是否已含」 |
| 12 | 飞轮账本回写 | 本轮无 deploy / online_verify / 11-14 复测读数，无强制回写项；A57/A58 与待合并 note 在 anomaly JSON，未改共享账本 |
| 13 | A53 的长期性 | 已双方法验证关闭，但 clone 链生成器仍是同类缺陷的温床；下一批必须复验键名，否则复发第 3 次 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7/§8 + 2026-11-07 四窗差分块 + 2026-11-03 证据分流块 + 恢复模式块 + sop-10-gate）· 2026-11-12 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
