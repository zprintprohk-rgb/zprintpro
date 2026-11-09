# 2026-11-09 · ZP-gsc-feedback 车道报告（数据断供第 2 日 · 零新 KPI · 14 项交接台账重算 · 11-14 复测窗 75% 与基线重叠）

VERDICT: OK
RECOVERY: **N/A — `available:false`**（无 `gsc-cliff-2026-11-09.json`，detector 连续第 6 日无档）；最后官方值 **123.7%**（`gsc-cliff-2026-11-03.json`，977 ÷ 789.8，full-country）；最近派生值 **96.98%**（11-07，803 ÷ 827.96，标 `DERIVED_NOT_DETECTOR`，**非今日**）
RECOVERY_STATUS: **UNKNOWN_TODAY** — 不补算、不换分母、不把 96.98% 读成「恢复掉了」
RECOVERY_SERIES: 三站和口径 10-28 **130.3%**（581.7 分母，24h 窗 10-22，**与全国家不可比，冻结不并入**）｜full-country：10-29 **105.8%**（749.2）→ 10-30 **117.7%**（754.5）→ 11-03 **123.7%**（789.8，最后官方）→ 11-07 **96.98%**（827.96，DERIVED）→ 11-08 / 11-09 **available:false**
RECOVERY_STREAK: **0/3** — 三个 fresh 点（10-29/10-30/11-03）不连续；「连续 3 日抬升 = 再评估启动」从未触发，且已 6 日无新点
DATA_STATUS: **STALE_NO_NEW_DATA** — xlsx 最新 = **11-07 导出**（24h 窗止 11-07T02，龄 **66.2h**；7d/28d 数据日 **11-04**，龄 **116.2h** > 72h；3mo 携 11-03 档，数据日 10-31，龄 **212.2h**）；API 最新 = `end1105`（数据日 **11-04**，龄 **116.2h**）；**11-08 / 11-09 无任何新导出**；`GSC数据/index.json` 仍未收录 11-07 批
DATA_GATE: **NO_NEW_KPI** — 本报告**不产生任何新 KPI、新 delta、新恢复值**；所有词行数字均为 **11-07 批携带值（数据日 11-04）**，只作复测基线，不得写成今日读数
KPI_UPDATED: false
NO_NEW_DATA: true
PAGE_WRITES: 0
CONSUMED: `.hermes/logs/run-context-ZP-gsc-feedback.json` @ 2026-11-09 20:13:02（preflight 9/9 ok / lock pid 32904 / retry_queue 4 项）| `.hermes/logs/lane-status.json` @ 2026-11-09 06:43（**13.5h，非 STALE**；bus_records=108 / verdict=ATTENTION / problems=6）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6.1 只给任务不改页 / §7.1 运行口径 / §7.2 队列纪律 / §7.4 学习边界）| `zprintpro-gsc-feedback-loop.md`（11-07 四窗差分块 + 11-03 证据分流块 + 恢复模式块）+ `sop-10-gate.md` | `gsc-2026-11-07-four-window-analysis.json`（10:31）| `gsc-2026-11-07-money-keyword-delta.json`（10:31，经 11-07 报告逐行回读值）| `gsc-daily-anomaly-2026-11-07.json` | `gsc-cliff-2026-11-03.json` / `gsc-cliff-2026-10-28.json` | `2026-11-07-ZP-gsc-feedback.md`（上轮）| `2026-11-02-ZP-gsc-feedback.md` / `2026-11-05-ZP-gsc-feedback.md`（retry 两项）| 11-08 两份执行报告 + `74ffa5a9` / `9acc3d16` | 11-09 `2026-11-09-p0-catalog-h1-execution.md` / `-p2-catalog-desc-execution.md` / `a33abd3b` / `392c5f30` | `docs/2026-11-09-retest-1114-runbook.md`（19:56，对端新写，**只读**）| `docs/2026-11-09-row4-flyers-books-evidence.md` + `gsc-2026-11-09-flyers-books-*.json`（20:08，对端新写，**只读**）| `2026-11-09-ZP-k3-review.md` | `.git/logs/HEAD`（L645-663）+ `.git/refs/heads/main` + `.git/refs/remotes/origin/main` | `GSC数据/index.json` + `GSC数据/*.xlsx` 清单（只读）| 线上 2 URL（本车道独立单次抓取）
DELIVERED: `.hermes/logs/2026-11-09-ZP-gsc-feedback.md`, `.hermes/logs/gsc-daily-anomaly-2026-11-09.json`
NEXT: **11-10 07:10** k3 复核 4 条调度是否脱离 `0x800710E0`；**11-10** 月曆 `EXP-1103-CALFAQ` 7 天窗（基线见 11-03 报告，本报告不重算）；**11-13 20:52** weekly-meta 首验：7 项 FIX 残留 + 海报 desc + 超带 title 族（含 flyers 59、stickers 100/83）；**11-14** 复测：**只判方向与真值一致性，不判成效**（28d 仅 10.7% 天数在 11-09 变更后，见 §5）；**11-18** 首个可判 7d 窗；**12-04** 28d 达 82% 后变更天数；**11-28** small batch 复测；**12-01** monthly 自然触发
IDEMPOTENCY: `b5128229594a7cb8`（day 2026-11-09 / intent=`GSC 四窗+钱词交接` / target=`总线+11-07 数据批+11-08/09 交付面+复测口径`）；`lane-status.warnings` 4 条 `DUPLICATE_IDEMPOTENCY_KEY` 全为 10-10/10-28/10-29/10-30 历史键，**不含本键**
RETRY_OF: **`ZP-gsc-feedback-20261107T202328-28680`**（`retry_queue[0]`，`wrapper_exit=5` git push failed）→ **CLOSED（内容 + 远端双达）**：`.git/logs/HEAD` L649-650 两次提交（`f8f9c737` 20:22、`c1f1a7f8` 20:22）在 `d7a8d5d7` 祖先链上且 `origin/main = d7a8d5d7` ⇒ 已在远端；**零重写 11-07 报告**，机器 verdict 按契约 §6.3 保留 FAILED
RETRY_OF_OTHERS: 11-02 FAILED → **ALREADY_DONE**（同日 20:2x 报告 `VERDICT: OK` 在盘）；11-05 BLOCKED → **SUPERSEDED，不补造**（AUTO-FILL 仅 lock 竞争，其数据窗已被 11-06/11-07 两轮覆盖）；11-07 FAILED → 见上 **CLOSED**
COVERAGE: **CONSUMPTION_AUDIT + MEASUREMENT_CALIBRATION** — 14 项交接逐项落状态（6 已部署 / 2 已诊断 / 1 NO_OP / 2 样本门 / 3 仍开）；新增复测窗口稀释算术；2 个线上探针；**零新数据、零页面写入、零队列翻转**
CONFIDENCE: **HIGH**（总线 / 时龄 / 窗口算术 / git 链）· **MEDIUM**（对端部署的线上一致性：每 URL 单次抓取）· **LOW**（任何趋势、因果、恢复结论 — 数据断供，拒绝推断）
RUN: 定时 20:13 轮；**pwsh 沙箱禁用（v9.4，不重试）** ⇒ 未跑 detector / API / tsc / 门禁 / xlsx 重解析；只用文件工具 + 2 次 `web_fetch`；**零 `src/` 写入、零 title/desc、零 canonical/301、零队列状态翻转**
VERDICT_DEFINITION: 本行 `OK` = **车道当日产物完成**（当日报告 + 机器可读 anomaly 台账 + 异常分类 + 下一验证点），**不是**「KPI 已更新」、**不是**「数据已刷新」、**不是**「恢复已确认」、**不是**「排名已改善」。今日真实状态 = `无 11-08/09 导出 / 28d 龄 116.2h / detector 6 日空 / 恢复 UNKNOWN / 6 项对端部署待 11-14 方向复测`。

> **为什么仍写 OK**：契约 §6.1 对 GSC 车道的四项成功证据是「当日数据文件 + 当日报告 + 异常分类 + 下一验证点」；本轮的「当日数据文件」= `gsc-daily-anomaly-2026-11-09.json`（车道自己的数据产物，非原始 xlsx）。原始 GSC 档由 K3 手工导出，车道在本沙箱**无拉取能力**（§7 A48）。若把「无新导出」写成 `PARTIAL`，机器会把本轮判 STALE 并丢弃已完成的交接台账——那是把**外部供给缺口**误记成**车道空转**。因此 `OK` + `DATA_GATE: NO_NEW_KPI` 双写，二者不可只读其一。

---

## 0. 一句话结论

**今天没有新数据，所以今天最值钱的产出不是「读数」，而是把上一轮的 14 项交接与 11-14 复测的测量口径算清楚：14 项里 6 项已由对端上线、2 项已诊断关闭、1 项 NO_OP、2 项卡样本门、3 项仍待 weekly-meta；而 11-14 的 28d 窗有 75% 与基线重叠、只有 10.7% 的天数落在 11-09 变更之后——用这个窗判胜负，等于用 89% 的旧数据判一个新改动。**

三件最值钱的新事实：

1. **11-07 的 14 项交接，两天内被消费了 9 项**（6 部署 + 1 NO_OP + 2 诊断），只剩 5 项（3 待 weekly-meta + 2 样本门）。这是自 10-31 建台账以来推进最快的一次，且**不是本车道做的**——本车道的职责是记账，不能把对端的部署写成自己的交付（§4）。
2. **11-14 的复测窗是稀释窗**：按已证的「导出日 − 3 = 数据日」滞后（11-03→10-31、11-07→11-04 两点同证），11-14 导出的 28d 窗 = 10-15..11-11，与 11-07 基线窗（10-08..11-04）重叠 **21/28 = 75.0%**；11-09 变更后的天数只有 **3/28 = 10.7%**。若真实效应是 3 个位次，28d 上只能看到 **≈0.32 位**——低于噪声。这不是「效应不存在」，是「窗口测不到」（§5）。
3. **数据链两端同时断供第 2 日**：xlsx 28d 数据日 11-04（116.2h）、API `end1105`（116.2h）、detector 止于 11-03，`index.json` 还停在 11-03 且未收录 11-07 批。**今天任何「恢复/恶化」叙述都只能是 11-07 的复读**，本报告拒绝给新结论（§2/§3）。

同时如实登记：**11-08 20:13 本车道无任何 run 记录**（A43，k3 报告 F6 同源）；**daily-content 20:21 被本车道锁挡下**（AUTO-FILL BLOCKED，属锁协议正常工作，但会污染当日 bus）；**catalog 页内 MOQ 仍自相矛盾**（H1/desc=10，规格表=100，FAQ=50–100，今日 20:2x 独立实抓确认）。

---

## 1. 结果总线消费与 retry 四项裁决（第 -1 优先级）

### 1.1 retry_queue 四项，逐项落判

| # | 队列项 | 事实 | 本轮裁决 | 证据 |
|---|---|---|---|---|
| 1 | `RETRY_OF` `ZP-gsc-feedback-20261107T202328-28680`（push failed） | 11-07 内容 OK、`wrapper_exit=5`、`pushed=false`、`head=c1f1a7f8` | **CLOSED**：`f8f9c737`/`c1f1a7f8` 两次提交在 `d7a8d5d7` 祖先链；`origin/main = d7a8d5d7` | `.git/logs/HEAD` L649-650；`.git/refs/remotes/origin/main` |
| 2 | `UNRESOLVED_DAY 2026-11-02 / FAILED`（dsh_exit=1） | 当日 20:2x 续跑已写 `2026-11-02-ZP-gsc-feedback.md`（`VERDICT: OK`，182 行） | **ALREADY_DONE(since 11-02 20:2x)**，零重跑 | 该报告首段 4 字段齐 |
| 3 | `UNRESOLVED_DAY 2026-11-05 / BLOCKED`（锁被 daily 持 3.0 min） | 当日只有 AUTO-FILL：`VERDICT: BLOCKED` / `DELIVERED: NONE`，dsh 未调用 | **SUPERSEDED，不补造**：其数据窗（数据日 ≤11-04）已被 11-06 OK + 11-07 OK 覆盖；补写 11-05 等于用今天的数据伪造当日读数 | `2026-11-05-ZP-gsc-feedback.md` 全文 21 行 |
| 4 | `UNRESOLVED_DAY 2026-11-07 / FAILED`（push） | 同 #1，内容与远端双达 | **CLOSED**，零重写 | 同上 |

> **结构性噪音（第 5 轮）**：11-02 项自 11-03 起被连续重排，但内容层早已闭合。生成器只读机器 verdict、不读内容层——本轮**不自行改脚本**（契约 §7.2），只登记为 F11 复发；owner = 总线索赔。

### 1.2 总线与同侪盘面（11-09 06:43 快照 + git 链）

| 车道 | 11-09 实况 | 与本轮关系 |
|---|---|---|
| **ZP-gsc-feedback** | 11-08 20:13 **无 wrapper run-start / 无 bus / 无报告**（k3 F6）；本轮 20:13 = 断 1 日后的补跑 | 本轮即 retry；不声称「调度已恢复」 |
| ZP-k3-review | 11-09 07:10 **OK**（断跑 3 天后首轮，已消费 11-07 三档 + 3 URL 探针） | 只读；其 D1/D2/D3 已升级，本轮**不重复造单** |
| ZP-daily-content | 11-08 21:25 harness OK；**11-09 20:21 AUTO-FILL BLOCKED（gsc 持锁）**，commit `3098ddab` 未推 | 锁协议正常工作；其报告**零改写** |
| ZP-weekly-meta | 11-06 BLOCKED（脚本已修 `1e85b0d4`），下次自然轮 **11-13 20:52** | 7 项 FIX 残留的唯一去处；不代跑 |
| ZP-blog-deepfix | 11-07 23:53 OK（`911def1e`），下次 11-14 | 只读 |
| ZP-monthly-matrix | 11-01 MISSING **第 9 天**；`LastTaskResult=2147946720`；next 12-01 | 只记录；k3 已提 D1 |
| ZP-cron-watchdog | 11-09 06:43 正常，`lane-status` 由此重建 | `STATUS_GATE: FRESH`（13.5h） |

- **STATUS_GATE = FRESH_STATUS**（13.5h < 1 天）：与 11-07 的 `STALE_STATUS` 不同，本轮**可以**用 lane-status 的 verdict 做盘面对账；但仍不拿它派运维修复（problems 6 条已在 k3 D1）。
- **未推送遗留**：`local main = 3098ddab`、`origin/main = d7a8d5d7`，差 1 个 commit（daily 的 BLOCKED AUTO-FILL）。本报告 host 收尾若 push，会**顺带**带上它；这不是本车道产物，本报告不认领。

---

## 2. 数据面：为什么今天没有新 KPI

### 2.1 四窗与两平面（时龄按「数据日次日 00:00」起算，逐项注明）

| 平面 | 最新档 | 窗口 / 数据日 | 时龄 @20:13 | 判定 |
|---|---|---|---|---|
| xlsx 24h | 11-07 导出 | 11-06T03 → **11-07T02** | **66.2h**（48h + 18h13m） | 单日健康信号，已过期；不得当今日 |
| xlsx 7d | 11-07 导出 | 10-29 → **11-04** | **116.2h**（4d20h13m） | **> 72h ⇒ STALE** |
| xlsx 28d | 11-07 导出 | 10-08 → **11-04** | **116.2h** | **STALE**；四指标不可更新 |
| xlsx 3mo | **11-03 导出（carried）** | 08-01 → **10-31** | **212.2h** | 连续第 2 档缺 3mo |
| API query×country | `gsc-query-country-28d-end1105.csv` | 数据日 **11-04** | **116.2h** | 已由 11-07 的 68.2h FRESH 转 **STALE** |
| detector | **无 11-04..11-09 档** | 最后 = 11-03 | **6 日空** | `available:false` |
| index.json | lastBuild 11-05 | latestFreshData **11-03** | 落后 11-07 批 | **NEW A47** |

### 2.2 导出滞后已可证：`导出日 − 3 = 数据日`

- 11-03 导出 → 28d 数据日 **10-31**（−3）
- 11-07 导出 → 28d 数据日 **11-04**（−3）

两点同证，故 §5 的窗口算术一律用 **data_day = export_date − 3**；若下一次导出滞后不同，§5 全部重算（已在 JSON 里写 `recompute_if_lag_changes: true`）。

### 2.3 11-07 携带值（**只作基线，不是今日读数**）

| 窗口 | 点击 | 展示 | CTR | 平均排名 |
|---|---:|---:|---:|---:|
| 24h（11-06T03..11-07T02） | 12 | 803 | 1.4944% | 12.5218 |
| 7d（10-29..11-04） | 135 | 6,912 | 1.9531% | 15.9627 |
| 28d（10-08..11-04） | **538** | **23,183** | **2.3207%** | **14.2796** |
| 3mo（08-01..10-31） | 1,279 | 65,252 | 1.9601% | 17.355 |

- 同上批 11-03 对比（11-03 → 11-07）：24h 23/977 → 12/803；7d 132/6,255 → 135/6,912；28d 504/22,114 → 538/23,183。**窗口重叠 3/7 与 24/28 天，不是独立实验**，且这是 11-07 已交付过的对比，本轮只继承、不重算（幂等）。
- **今日不写任何「11-07 → 11-09」delta**：没有 11-08/09 档，做差就是拿同一批数据造新数（§0.23 红线）。
- **旧 v9.4 质量三件套**（striking 进首页 ≥5 / pos 1-20 展示占比 ≥30% / 有点击词数 ≥12）：11-07 分析档**无 striking 分层、无「有点击词总数」字段**，本报告**不编造**；只报 29 钱词口径（8 页一 / 4 点击）与 §0.37 四指标。若 K3 仍要该三件套，需下次分析档补字段（P3 口径缺口，不新开任务 ID）。

### 2.4 新的数据面缺陷：index.json 未随 11-07 批重建（A47）

- `GSC数据/index.json`：`lastBuild=2026-11-05T07:38`、`latestFreshData=2026-11-03`、`filesByDate` 无 `2026-11-07`。
- 目录实际有 3 个 11-07 xlsx（24h / 7d / 28d）。
- **后果**：门童 #9 `gsc-source-guard` 读 index 判新鲜度 ⇒ 会把 11-07 档误判为「不存在 / 最新仍是 11-03」，进一步收紧本来就过期的门禁。
- **处置**：只登记，不手改派生文件（SOP-5）；命令交 host（§10 D1）。**P3**。

---

## 3. 恢复链：今天只能写 UNKNOWN

| 日期 | 24h 展示 | 点击 | 分母（同批 28d 日均） | 恢复系数 | 口径 / 状态 |
|---|---:|---:|---:|---:|---|
| 2026-10-28 | 758 | 21 | 581.7（三站和） | 130.3% | **三站和，与全国家不可比 ⇒ 冻结，不并入曲线（A24）** |
| 2026-10-29 | 793 | 15 | 749.2 | 105.8% | full-country |
| 2026-10-30 | 888 | 15 | 754.5 | 117.7% | full-country |
| **2026-11-03** | **977** | **23** | **789.8** | **123.7%** | **最后官方值（detector）** |
| 2026-11-07 | 803 | 12 | 827.96 | **96.98%** | **DERIVED_NOT_DETECTOR**（非 detector、非今日） |
| 2026-11-08 | — | — | — | **available:false** | 无导出、无 detector |
| **2026-11-09** | — | — | — | **available:false** | 同上 |

- **三口径并存，必须点名**：① 官方 123.7% = 977 ÷ 789.8；② 167.0% = 977 ÷ 585.2（pre-cliff 固定基线，A17 明令不得当恢复系数）；③ 129.5% = 977 ÷ 754.5（旧动态分母，A31）。本报告只把 ① 当官方值。
- **96.98% 的读法不变**：123.7 → 96.98 的 26.7 点是**相对比值**，拆开是「分子 −17.8% + 分母 +4.84%」，**不是流量崩塌、不是处罚解除、不是索引恢复**；且它是 11-07 的派生值，今天引用必须带 `DERIVED_NOT_DETECTOR` 标签（A45 风险仍在：下游周复盘已引用一次）。
- **streak = 0/3**：10-29→10-30→11-03 三点不连续（中间缺 10-31、11-01、11-02 的独立 24h），「连续 3 日抬升」从未成立；11-07 的派生点又把序列打断。
- **UNKNOWN 三项**：处罚解除状态、排名恢复、索引覆盖率。四档没有索引覆盖率 sheet，今日无人处罚页核验；**不编造**（§0.23）。
- **spam 恢复周报（11-09 节）**：曲线如上（4 个可比点 + 1 个不可比点被冻结）；索引覆盖率 **UNKNOWN**；人工处罚页 **UNKNOWN**；下次 Google 更新窗口**不做日期预测**。结论只有一句：**数据断供期间，恢复状态无法判定**。

---

## 4. 11-07 → 11-09 交接台账：14 项逐项落状态

口径：词行数字全部是 **11-07 批 / 28d / 数据日 11-04**（携带值，不是今日）。「已部署」只表示代码与线上文案已验收，**不表示排名/点击改善**。

> **本轮新派单 = 0**：窗口未推进（无 11-08/09 档），按「同因只 recurrence、不重复派单」纪律，14 项只做**状态迁移**，不复制第二套 task_id；每项完整 10 字段（owner_lane / baseline / required_action / approval_gate / retry_at / cooldown_days / production_deploy / online_verify / retest / exit_criteria）仍以 `gsc-daily-anomaly-2026-11-07.json handoffs[]` 为 SSoT，本报告只更新 status / evidence / next_check。今日也**不产生**新的 FIX / MEASURE 提案（无新窗、无新 delta）。

### 4.1 FIX 7 项

| # | 词 | 基线 imp/clk/pos | 11-09 状态 | 证据 | 下一动作 |
|---|---|---:|---|---|---|
| 1 | 食品包裝印刷 | 116 / 0 / 8.36 | **OPEN_NO_EXECUTION** | 11-08/09 无该页执行；weekly-meta 11-06 BLOCKED | 11-13 weekly-meta 单变量（先抓 SERP + snippet） |
| 2 | small batch sticker printing | 27 / 0 / 6.00 | **DIAGNOSED_NO_CHANGE** | 11-08 诊断：HOLD/MEASURE；PDP 100% 承接、非内耗；SERP_UNAVAILABLE；title/desc 无精确词组但只算假设 | 11-28 同口径 + 美国英文 SERP 复测 |
| 3 | small batch stickers | 19 / 0 / 5.42 | **DIAGNOSED_NO_CHANGE**（并入 #2） | 同上；同一 PDP | 同上，合并计一次 |
| 4 | doujinshi printing | 55 / 0 / 9.98 | **OPEN_NO_EXECUTION** | 无该页执行记录 | 11-13 观察一窗后再定 |
| 5 | saddle stitch booklet printing | 5 / 0 / 7.40 | **SAMPLE_GATE**（<20 imp） | 11-07 报告已设样本门 | 不动作，等样本 |
| 6 | 卒アル販売 | 16 / 0 / 5.00 | **OPEN_NO_EXECUTION** | 无执行；三窗逐位 5.00 | 11-13 与 #1 同批评估 |
| 7 | large envelopes | 1 / 0 / 7.00 | **SAMPLE_GATE**（1 imp） | 11-07 判样本伪影 | 不动作 |

### 4.2 MEASURE 7 项

| # | 词 | 基线 imp/clk/pos | 11-09 状态 | 变更 / commit | 下一动作 |
|---|---|---:|---|---|---|
| 8 | コミケ 印刷 | 163 / 0 / 22.88 | **DEPLOYED** | `74ffa5a9`（JA 同人誌订单起价单位 `/部`→`/注文` + 免责句） | 11-14 方向；7d 为主判据 |
| 9 | 宣傳單張 | 127 / 0 / 34.73 | **DEPLOYED + EVIDENCE** | `74ffa5a9`（A4 單面 HK$0.35 起 / A5 0.25 起 + 阶梯说明）；`d7a8d5d7` 承接证据（category 106/98 imp @32.7/28.8，a4 PDP 16 @13.81） | 11-14 方向；无 snippet 提案 |
| 10 | 印海報 | 124 / 0 / 14.15 | **DEPLOYED** | `9acc3d16`（海报主承接 = `/zh-hk/category/posters/`，指南负责选购） | 11-14 看份额收敛 |
| 11 | 利是封印刷 | 59 / 1 / 24.42 | **NO_OP_ACCEPTED** | 11-08 判季节窗 + 承接集中（red-packets 75%） | 不扩页，只保护 |
| 12 | 教材 印刷製本 | 51 / 0 / 31.49 | **DEPLOYED** | `74ffa5a9`（正文 + description + blog-posts excerpt 同源改 ¥1,288〜） | 11-14 方向；价格真值已对齐 |
| 13 | a2 poster | 49 / 1 / 25.80 | **DEPLOYED** | `74ffa5a9`（EN A2 H1 + 4 处 MOQ 100→10） | 11-14 方向；H1 与 MOQ 同批 |
| 14 | 喜帖印刷 | 16 / 0 / 36.25 | **DEPLOYED** | `9acc3d16`（喜帖主承接 = `/zh-hk/category/wedding-invitations/`，感谢卡只做答谢意图） | 11-14 / 11-21 看 73%→? 收敛 |

**计数**：DEPLOYED **6**（#8-10、#12-14）· DIAGNOSED **2**（#2-3）· NO_OP **1**（#11）· SAMPLE_GATE **2**（#5、#7）· OPEN **3**（#1、#4、#6）= **14**。

### 4.3 不在本台账、但会污染复测窗的对端部署（confounders）

| 部署 | commit | 日期 | 影响粒度 | 备注 |
|---|---|---|---|---|
| 月曆 FAQ 口径收口 | `c0552853` | 11-03 | 月曆印刷 | 11-10 7 天窗（`EXP-1103-CALFAQ`），非本轮重算 |
| catalog **en H1** `100+→10+` | `a33abd3b` | 11-09 06:51 | en `china catalog printing` | CF run 128890190650 success；线上 H1 已由 k3 + 本车道双证 |
| catalog **zh/ja desc** `100 起→10 本起印` / `100〜→10冊〜` | `392c5f30` | 11-09 12:44 | zh-hk 畫冊印刷 / jpn カタログ印刷 | CF run 128985513618 success；与 en H1 分属不同查询粒度 |

- **归因边界**：`74ffa5a9` 一个 commit 含 4 个簇（flyers / ja textbook / ja doujinshi / en A2）。按「页 × 语种 × 查询粒度」可分，但**同一窗内 4 簇同变**，不能把簇间差异归给某一字段；每簇只能做自身前后对比。
- **两个变量同页同日**：catalog en H1（06:51）与 zh/ja desc（12:44）虽分属不同 locale/查询粒度，但都落在同一 SKU 的可索引面；11-14 若出现 `china catalog printing` 与 `畫冊印刷` 同向变化，**不能**用「同一页面改两次」解释为单一变量效应（§5 已列）。

---

## 5. 测量口径校正：11-14 的 28d 窗是「75% 旧数据 + 10.7% 新数据」

> 这是本轮唯一的**新增分析**。目的不是唱衰复测，而是防止 11-14 把「窗口稀释」误判成「改动无效」，进而触发不该有的二次改动。

### 5.1 窗口算术（data_day = export_date − 3，已由 11-03 / 11-07 两点同证）

| 复测导出日 | 假设数据日 | 7d 窗 | 7d 变更后天数（11-08 / 11-09 变更） | 28d 窗 | 28d 变更后天数 | 28d 与基线窗重叠 |
|---|---|---|---:|---|---:|---:|
| **11-14** | 11-11 | 11-05..11-11 | **4/7 = 57.1%** / **3/7 = 42.9%** | 10-15..11-11 | **4/28 = 14.3%** / **3/28 = 10.7%** | **21/28 = 75.0%** |
| 11-18 | 11-15 | 11-09..11-15 | **7/7 = 100%** / 7/7 = 100% | 10-19..11-15 | 8/28 = 28.6% / 7/28 = 25.0% | 17/28 = 60.7% |
| **11-21** | 11-18 | 11-12..11-18 | **7/7 = 100%** / 7/7 = 100% | 10-22..11-18 | 11/28 = 39.3% / 10/28 = 35.7% | 14/28 = 50.0% |
| 11-28 | 11-25 | 11-19..11-25 | 100% / 100% | 10-29..11-25 | 18/28 = 64.3% / 17/28 = 60.7% | 7/28 = 25.0% |
| **12-04** | 12-01 | 11-25..12-01 | 100% / 100% | 11-04..12-01 | **24/28 = 85.7%** / 23/28 = 82.1% | **1/28 = 3.6%** |
| **12-10** | 12-07 | 12-01..12-07 | 100% / 100% | 11-10..12-07 | **28/28 = 100%** / 28/28 = 100% | **0** |

- 基线窗：7d = 10-29..11-04；28d = **10-08..11-04**（11-07 批）。
- 「变更后天数」= 窗内 ≥ 变更日的天数；11-08 变更 = `74ffa5a9` / `9acc3d16`；11-09 变更 = `a33abd3b` / `392c5f30`。

### 5.2 稀释模型（算术，不是测量）

若某改动使目标词真实改善 **Δ = 3 位**、且效应只作用于变更后的日子，则滚动窗读数 ≈ Δ × 变更后天数占比：

| 复测日 | 28d 可见位移（11-09 变更，Δ=3） | 7d 可见位移 | 能不能判 |
|---|---:|---:|---|
| 11-14 | **0.32 位** | 1.29 位 | **28d 不能判**；7d 勉强，且仍有 57% 日子在变更前 |
| 11-21 | 1.07 位 | **3.00 位** | **7d 可判**；28d 仍只作背景 |
| 12-04 | 2.46 位 | 3.00 位 | 28d 进入可判区（82%） |
| 12-10 | **3.00 位** | 3.00 位 | 28d 干净窗 |

- 该模型只用于**说明测不到**，不用于反推真实效应；实际效应还可能延迟 1–2 周，故 12-04 之后仍要 28d 复核。
- **关键判据**：11-14 的 28d 即使「纹丝不动」，也**不构成失败证据**；11-14 的 7d 若方向相反且 |Δpos| > 0.5，才进「查 confounders」而不是「回滚」。

### 5.3 与对端 11-14 runbook 的关系（只读，不改其文件）

- `docs/2026-11-09-retest-1114-runbook.md`（19:56）已预登记 6 项 confounders、`NO_NEW_DATA` 守卫，且 A/B/C 明写「首窗只判方向与真值一致性，不判成效」——**方向正确**，本轮不重写、不覆盖。
- **但它同时留了一条数值门槛**：规则 1 写「14.15→≤10 且 imp 不塌 = 进入 11-21 二窗」。在 10.7% 变更后天数下，即使真实改善 4 位，28d 也只能显示 ≈0.43 位 ⇒ **该门槛会被稀释本身判死**，与同段的「首窗不判成效」自相矛盾。建议把这条数值门槛整体后移到 11-18（7d）/ 12-04（28d），11-14 只留「真值一致性 + 方向」。
- 本报告**补的是它没算的那一段**：28d 窗的 75% 重叠与 10.7% 变更后占比，以及「决策级窗」应落在 11-18（7d）/ 12-04（28d）。
- 建议（交 runbook owner，非本车道执行）：在 runbook 的判定规则里加一行「11-14 的 28d 只作背景，不得作为 STOP/回滚依据」；并新增 11-18 / 12-04 两个检查点。**在本报告落盘时，runbook 尚未包含这两个日期**。

---

## 6. 今日独立线上探针（2 URL，单次抓取）

| URL | 结果 | 判定 |
|---|---|---|
| [`/en/product/catalog-printing/`](https://zprintpro.com/en/product/catalog-printing/) | **HTTP 200**；H1 = `Catalog Printing 10+ \| ZprintPro`；title = `Catalog Printing \| 10 MOQ $4.60 \| Free Ship \| ZprintPro`；正文 `10 MOQ` / `from 10 copies` / `MOQ 10` 一致 | ✅ **11-09 的 en H1 单变量已上线**（与 k3 07:3x、p0 登记三方一致） |
| 同上，页内真值面 | **规格表仍是 100**：`8.5x11 / A4 / Custom` 三行 MOQ 全 = 100；`Unit Price` 仍 `$$` / `$$$`；FAQ 仍 `Most ZprintPro products start from 50–100 units/copies`；`free reprint / full refund`、`delivered by 12pm tomorrow`、`DHL worldwide 2-4 days` 仍在 | ⚠️ **A49 确认**：H1/desc/body=10 与表=100、FAQ=50–100 并存（k3 F4 同源）。本车道**不改**（契约 §6.1），登记为下一单变量批 |
| [`/zh-hk/category/flyers/`](https://zprintpro.com/zh-hk/category/flyers/) | **HTTP 200**；title = `A5 宣傳單張印刷 10張起・A4/A5/A3 雙面 \| HK$0.18 起 \| 智印港`；H1 = `香港 A5 宣傳單張印刷 — A4/A5 數碼快印 / 摺頁 / 開業傳單 / 24 小時急件`；7 个 SKU 卡 MOQ 均 `10 張`，起价 0.14（A5）/ 0.31（A4）/ 0.40（双面）/ 0.72（环保）/ 1.30（即日） | ✅ `74ffa5a9` 的价格阶梯与 `10張起` 在线；⚠️ **title 当量 59（>58 阻断线）**——与对端 row4 一致，但本车道**无 node 不能跑 `title-v5`**，标 `PROVISIONAL`，不自行认证 |

- **口径纪律**：每 URL 只抓 1 次（不做 3–6 次重复，避免限流）；只证明「此刻线上字符串是什么」，不改任何字段。
- **独立发现（P3，观察项）**：EN catalog 页的 `Specifications` 段仍嵌着 zh-hk 项目符号（`【157g–200g銅版紙…】【10本起訂】…`）。**优先判定为既有渲染/数据面问题，不由今日 H1 批引入**；需渲染层确认后再归 owner（daily-content / weekly-meta），本车道不动作。
- **未复用对端 `gsc-2026-11-09-flyers-books-live.json` 的 `titleEquiv` 数值**：该文件无 provenance、无计算脚本记录，且 `hasSingle10` 与 title 字面（`10本起`）不自洽 ⇒ 只作旁证，不作本报告结论。

---

## 7. 异常清单状态迁移

### 7.1 复发 / 重开

| ID | 11-07 状态 | 11-09 | 依据 |
|---|---|---|---|
| **A1 DATA_STALE** | PARTIALLY_RESOLVED（三窗到位） | **REOPENED_STALE** | 11-08/09 无导出；28d 数据日 116.2h > 72h |
| **A2 FROZEN_24H** | CLOSED_TODAY | **REOPENED_DAY1** | 最新 24h 窗止 11-07T02，龄 66.2h |
| **A36 XLSX_NOT_REFRESHED** | CLOSED_BY_HUMAN（11-07 08:41 导出） | **RECURRENCE_1**（同因，不新开 ID） | 11-08/09 连续 2 日无导出 |
| **A43 RUN_GAP** | OPEN（k3 第 4 缺口） | **PARTIAL** | k3 11-09 已复跑；**gsc 11-08 MISSING**；daily 20:21 被本车道锁挡（AUTO-FILL）；monthly 第 9 天 |
| **A44 DETECTOR_RUNTIME** | OPEN P1（uv trampoline os error 2） | **OPEN_DAY6** | `gsc-cliff-*` 止于 11-03；本沙箱连重试都不可能（pwsh 禁用） |
| **A45 RECOVERY_DENOMINATOR** | OPEN P2 | **OPEN**（引用风险未消） | 96.98% 仍会被下游读成「恢复掉到 97%」 |

### 7.2 今日新开

| ID | 级别 | 状态 | 要点 | recovery_plan |
|---|---|---|---|---|
| **A46 RETEST_WINDOW_DILUTION** | **P1** | NEW | 11-14 的 28d 与基线重叠 **75.0%**，11-09 变更后仅 **10.7%**；7d 也只有 42.9% | `modify_payload`（复测口径加「决策级窗」11-18 / 12-04；11-14 只判方向） |
| **A47 GSC_INDEX_NOT_REBUILT** | P3 | NEW | index `lastBuild=11-05` / `latestFreshData=11-03`，未收录 11-07 批；门童 #9 会误判 | `request_human`（host 跑 `rebuild-gsc-index.mjs`；不手改派生） |
| **A48 LANE_PULL_INCAPABLE** | **P2** | NEW（结构性） | v9.4 沙箱禁 pwsh ⇒ 车道**无法**拉 API、跑 detector、重解析 xlsx；「每日拉取」职责在本环境不可履行 | `request_human`（host 侧补拉；或放开车道 shell 只读白名单） |
| **A49 CATALOG_PAGE_TRUTH_CONFLICT** | **P2** | CONFIRMED（k3 F4 同源） | H1/desc/body=10；规格表 100×3；FAQ 50–100；`Unit Price $$` | `modify_payload`（11-22 后单批，避开 11-14/11-21 复测窗） |
| **A50 EN_PAGE_ZH_BLOCK** | P3 | NEW（观察） | EN catalog 页嵌 zh-hk 项目符号（`【10本起訂】` 等）；疑既有 | `modify_payload`（先渲染层确认，勿与 A49 同批） |
| **A51 FLYERS_TITLE_OVER_BAND** | P2 | NEW（evidence only） | `/zh-hk/category/flyers/` title 当量 59 > 58；与 stickers 100/83 同族 | 归 **weekly-meta 11-13**；本车道不执行、不认证 |

### 7.3 carry（无新证据，状态不变）

| ID | 状态 | 说明 |
|---|---|---|
| A39 POOL_RULE_DRIFT | CALIBER_PINNED | 29 钱词子集（7 行 / 239 imp）口径不变；466 行池仍不可重算 |
| NEW-14 产品摘要结构 | OPEN | 28d 38.7% 曝光 / 35.3% 点击 / 摘要 CTR 2.12% vs 2.45% —— 无新数据，维持 MEASURE→monthly |
| NEW-15 3mo 缺档 | OPEN（第 2 档） | 11-07 无 3mo；仍携 11-03（10-31 数据日） |
| NEW-16 近阈移动 | OPEN | 貼紙 −0.41 / 海報 +0.42 / 即日 −0.38，不派单；无新档不重判 |
| NEW-10 包裝盒 | THRESHOLD_EDGE | +0.91 / +0.50，第二窗恰在阈值；不派单 |
| A41 / A38 / A40 / A28 / NEW-1 / NEW-13 | 不变 | 海报价真值 / ja 正文中文 / 跨意图 / monthly 第 9 天 / 貼紙 14d（37.65 HOLD）/ 海报价多值 |
| NEW-8 喜帖 | **HANDOFF_CLOSED_DEPLOYED_PENDING_RETEST** | `9acc3d16` 上线 + 4/4 线上验收；11-14 看 73% 是否收敛 |
| NEW-9 教材 | **HANDOFF_CLOSED_DEPLOYED_PENDING_RETEST** | `74ffa5a9`；价格真值已同源；11-14 看 pos 是否脱离 30+ |

---

## 8. 三条队列（今日只做状态增量，不重算规模）

> 数字仍为 11-07 批（数据日 11-04）。退场 = 停止追加投入，**不等于**删页 / noindex。

### 8.1 机会队列

| ID | 状态变化 | 说明 |
|---|---|---|
| OPP-01 页一零点击池（7 词 / 239 imp / 0 clk） | **OPEN，未消费** | weekly-meta 11-06 BLOCKED；11-13 是下一个窗口；SERP feature 仍缺（本机出口 INVALID） |
| OPP-02 新进页一（doujinshi 55 / large envelopes 1） | **拆开**：55 imp 观察一窗；1 imp 判伪影 | 不给 1 imp 派单 |
| OPP-03 两窗改善 4 词 | **HOLD_RETEST** | china catalog（今日 H1 已改）/ pvc シール / 貼紙訂製 / 印刷公司；无部署证据不 SCALE |
| OPP-04 产品摘要结构 | **MEASURE → monthly** | 38.7%/35.3%；结构性，不是单页问题 |
| OPP-05 市场 CTR 差 | **MEASURE → monthly** | HK 2.80% / JP 1.73% / US 1.24%（搜索者位置，非 locale 业绩） |

### 8.2 退场候选（停止追加投入）

> **成熟度口径（§0.30.7，先于任何「深位=失败」判断）**：zh-hk 位置 28-41 属**年轻站正常位**；en/ja >20 属**新生儿正常**，不因此改 title/meta，只打地基。故本报告对 33-37 名的包裝盒/貼紙三词、22-36 名的 ja/zh 深位词，一律只判 `MEASURE/HOLD`，**不判失败、不据此改页**。

无新增。EXIT-01..07（教材 / 喜帖 / a2 poster / コミケ / 宣傳單張 / 利是封 / 印海報）中，**#8-10、#12-14 已转为「部署后观察」**，其余维持：
- `教材` 由 EXIT 转 **DEPLOYED→MEASURE**（价格真值已修，不再「停扩写」而是「观察是否值得再投」）；
- `喜帖` 同上（主 URL 已拍板，意图错配已纠）；
- `利是封` 维持 NO_OP；
- `コミケ` 维持季节窗（C109 已修单位，但不建新页）。

### 8.3 内耗候选（仍是假设，无当日 join）

- IF-02 books：`書刊印刷` blog 92@30.41 vs category 90@55.08；`印書` blog 51@32.39 vs category 47@46.32 vs catalog PDP 41@49.12 —— **双页均深位（30+），无页一竞争者**，纯 MEASURE，不做 301/canonical。
- IF-03 stickers：category 份额仍低，多 URL 分流；**第三窗 gate 未达**（需 ≥11-09 档，今日无导出）⇒ 37.65 维持 HOLD。
- IF-01 posters：`9acc3d16` 已分工，11-14 看份额是否向 category 收敛；**不因 11-14 未收敛就回滚**（收敛本来就需要 ≥2 窗）。

---

## 9. 跨车道对账与写盘隔离

| 今日已写文件（他方） | 时间 / commit | 本轮处置 |
|---|---|---|
| `docs/2026-11-09-retest-1114-runbook.md` | 19:56 / `4a9c921b` | **只读**；§5.3 只提建议，不改文件 |
| `docs/2026-11-09-row4-flyers-books-evidence.md` + `gsc-2026-11-09-flyers-books-{attribution,live}.json` | 20:08 / `d7a8d5d7` | **只读**；其 flyers/books 归因被我引用，未重算、未改写 |
| `2026-11-09-p0-catalog-h1-execution.md` / `-p2-catalog-desc-execution.md` | 07:0x / 12:44 | **只读**；只用其 commit 与线上断言做交叉核对 |
| `.hermes/cron-prompts/blog-money-keyword-queue.json` | 今日多次 | **零写入**（SOP-5 + 跨车道避让） |
| `src/data/sku-seo-data.ts`、`zprintpro-sku-seo-data.csv` | `a33abd3b` / `392c5f30` | **零触碰**；本报告不引用其未提交状态 |
| `.hermes/logs/2026-11-09-ZP-daily-content.md`（AUTO-FILL） | 20:21 / `3098ddab` | **零改写**；只登记其被锁挡的事实 |
| `GSC数据/index.json`、`lane-status.json`、`lane-runs.jsonl`、`strategy-task-queue.json` | 共享证据 | **零手改**；只在报告里引用 |

**本轮写盘**：仅 2 个新文件 —— 本报告 + `gsc-daily-anomaly-2026-11-09.json`。无覆盖、无 `.failure.md` 改写、无 `src/`、无 `docs/`。

---

## 10. K3 升级（3 个决策点，均可一句话拍板）

### D1 · 🔴 P0 数据断供第 2 日：请补 11-08/09/10 四档 + 3mo，并恢复 detector

> **推荐 (A)**：一次性导出 **11-08 / 11-09 / 11-10** 的 24h / 7d / 28d / 3mo（全国家、网页搜索）→ `GSC数据/`；随后由 host 跑下面 4 条命令。**没有这一步，11-10 之后所有报告都只能是 11-07 的复读。**
> **为什么现在**：xlsx 28d 已 116.2h、API 116.2h、3mo 212.2h、detector 6 日空；11-14 复测若仍无 11-08..11-13 的档，连「方向」都判不了。

```powershell
cd F:\zprintpro-nextjs
python scripts\fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-09
python scripts\gsc-cliff-detector.py
node scripts\rebuild-gsc-index.mjs --write
powershell -NoProfile -Command "Get-ScheduledTaskInfo -TaskName ZP-gsc-feedback,ZP-daily-content,ZP-monthly-matrix,ZP-k3-review | Format-List TaskName,LastRunTime,LastTaskResult,NextRunTime"
```

- 备选 (B)：只补 11-09 一档 + detector，先恢复「当日读数」能力，3mo 留到 11-14；(C) 等到 11-14 与复测同批补 —— **不推荐**，会把 11-10/11-13 两个窗口一起废掉。

### D2 · 🟠 P1 复测口径：11-14 只判方向，决策级窗改为 11-18 / 12-04

> **推荐 (A)**：采纳 §5 的窗口算术 —— 11-14 的 28d 明确标 `BACKGROUND_ONLY`，不得作为 STOP/回滚依据；11-18 起用 7d 作主判据；12-04 起 28d 达 82% 变更后天数才可作经营判断。
> **理由**：11-14 的 28d 有 75% 与基线重叠、只有 10.7% 天数在变更后；用 Δ=3 位的模型，28d 上只能看到 0.32 位。**不是改动无效，是窗口测不到。**
> **备选 (B)**：照旧在 11-14 用 28d 判 —— 风险是把「稀释」读成「无效」，触发二次改动（正是 11-07 报告警告的「窗口移动不判实验胜负」）；(C) 全部推到 12-10 一次性判 —— 太晚，会错过 11-21 的 7d 信号。

- 具体建议（交 runbook owner，非本车道改文件）：在 `docs/2026-11-09-retest-1114-runbook.md` 判定规则加一行「11-14 28d = BACKGROUND_ONLY」，并新增 11-18 / 12-04 两个检查点。

### D3 · 🟡 P1 超带 title 族扩容：flyers 59 入列（stickers 100/83 仍逾期）

> **推荐 (A)**：11-13 weekly-meta 自然轮**一次单批**处理三页（en stickers 100→55、ja stickers 83→52、zh-hk flyers 59→≤57），逐页单变量、过 `title-v5` #27、记录 11-14 复测的 confounder。**这是合规修正（>58 阻断线），不是排名实验。**
> **备选 (B)**：等 11-22（避开 11-14/11-21 复测窗）—— 代价是阻断线再挂 9 天；(C) 授权 daily-content 承接 —— 与 11-08 的「授权 daily」方案同风险（跨车道 owner 漂移）。

- 证据：k3 11-09 报告 §3.4（stickers 两页逐字未变）；对端 `d7a8d5d7` row4（flyers 59）；本报告 §6 独立抓到 flyers title 原文。**本车道不执行 title 改动**（契约 §6.1）。

**非阻塞 carry（不占 3 条）**：
- 4 条调度器 `0x800710E0` + monthly 第 9 天 → **k3 今日 D1 已升级，不重复造单**。
- A49 catalog 页内 MOQ 矛盾 → owner weekly-meta，建议 **11-22** 单批（避开复测窗）；A50 EN 页中文块先做渲染层确认。
- 6 项 WAITING_K3（BLOG-CERT / STICKER-ZH-TRUTH / STICKER-PRICE-THREE-LAYER / BLOG-H1-BRAND / FIVE-CATEGORY-TRUTH / PRIMARY-URL-MISMATCH）→ 维持 HOLD，执行层不自批。
- §0.0 名片解禁块 (a)/(b)/(c) 自 2026-09-12 未裁 → 继续零触碰。

---

## 11. 下一验证点

| 日期 | 验什么 | 通过标准 / 失败动作 |
|---|---|---|
| **2026-11-10 07:10** | 4 条调度是否脱离 `0x800710E0`；本车道是否有 bus 记录 | LastTaskResult=0 且有当日报告；否则 k3 D1 继续 |
| **2026-11-10** | 月曆 `EXP-1103-CALFAQ` 7 天窗（`c0552853`） | 目标页 imp ≥ 基线 80% 且带钱词 ≥1 clk；单窗不判胜负 |
| **2026-11-13 20:52** | weekly-meta 脚本修复后首验 | preflight 全过；7 项 FIX 残留 + 海报 desc + 超带 title 族（flyers 59 / stickers 100 / 83）单批、单变量、`title-v5` PASS |
| **2026-11-14** | 14 项交接首轮复测 | **只判方向 + 真值一致性**；28d 标 BACKGROUND；任一结论须带 commit / 窗期 / 变更后天数占比 |
| **2026-11-18** | 首个「7d 100% 变更后」窗 | 7d 方向 + Δpos 绝对值；与 11-14 对比看是否同向 |
| **2026-11-21** | 第二窗；海报/喜帖份额是否收敛 | 7d 可判；28d 仍 35.7-39.3%，只作背景 |
| **2026-11-28** | small batch 复测（美国英文 SERP + 同口径 28d） | 若 SERP 仍不可得，继续 `SERP_UNAVAILABLE`；不编造 |
| **2026-12-01** | monthly 自然触发（第 9 天缺口能否闭） | 有 run 记录 + 月报告；否则 dead_letter |
| **2026-12-04 / 12-10** | 28d 达 82% / 100% 变更后天数 | 才可做 SCALE/HOLD/FIX/STOP；六件齐才 SCALE |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 实读前序实现路径：11-07 报告 + anomaly JSON（14 项 handoff 原始定义）→ 11-08 `74ffa5a9`（7 文件，4 簇）与 `9acc3d16`（4 文件，2 簇）→ 11-09 `a33abd3b`（CSV 源头 + 生成器，字节变化 1）与 `392c5f30`（zh/ja desc，2 行）→ 19:56 runbook → 20:08 row4 证据。先读 diff/登记再判「已消费」，未凭标题推断。
- [x] **2. 约束适用范围？** 查契约与拍板：§6.1「gsc 只给任务、不改页」⇒ 本轮零 `src/`、零 title/desc；§7.1「STALE 不派运维修复」⇒ 只用 lane-status 做盘面，不据旧 verdict 派单；§7.2「不自行批准 / 不翻队列」⇒ 6 项 WAITING_K3 全 HOLD；§7.4「无 online_verify 不进学习候选」⇒ 本轮 learning candidates = 0；§0.23（数字只来自真值）；§0.37（不接 GA4/008/订单）；§0.0（名片只接单不建页）。
- [x] **3. 原数据/拍板来源？** ① 来源：11-07 三档 xlsx + 四窗/钱词 JSON + 11-03 3mo + `end1105` + git 链 + 2 次线上抓取；② 真数据：14 项基线逐项回读 11-07 报告与 anomaly；窗口算术用已证 lag=3；时龄写明起算点；③ 留/撤：**零撤回**，只做状态推进（A1/A2/A36 复发、A43 部分、A44 第 6 日、A45 维持、新增 A46-A51）。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入；价格只作对端部署的证据引用，不新增价格声明（flyers 0.18/0.25/0.35 的 spec 差异未判错，故不登记为缺陷）。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告；2 个 URL 用 Markdown 链接但**不进入渲染层**（非 user-facing）；未新增需 `parseInlineLinks` 的页面内容。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-09 20:13:02, preflight 9/9 ok, lock pid 32904, retry_queue 4) · lane-status.json (2026-11-09 06:43, bus_records=108, verdict=ATTENTION, problems=6)
- 总线历史: .hermes/logs/lane-runs.jsonl (108 条; 最后 #108 11-08 daily harness OK) · .hermes/logs/2026-11-09-ZP-k3-review.md (07:10, 断跑 3 日后首轮)
- GSC xlsx (carried, NOT today): 11-07 三档 — 24h 12/803/1.4944%/12.5218 (窗 11-06T03..11-07T02) · 7d 135/6912/1.9531%/15.9627 (10-29..11-04) · 28d 538/23183/2.3207%/14.2796 (10-08..11-04); 3mo 11-03 档 1279/65252/1.9601%/17.355 (08-01..10-31)
- GSC 分析: gsc-2026-11-07-four-window-analysis.json (10:31, 双方法对账) · gsc-2026-11-07-money-keyword-delta.json (10:31, 29 钱词) · gsc-daily-anomaly-2026-11-07.json (14 handoff 原始定义)
- 恢复: gsc-cliff-2026-11-03.json (官方 123.7% = 977/789.8, full-country) · gsc-cliff-2026-10-28.json (三站和 130.3% = 758/581.7, 冻结不并入)
- API: GSC数据/gsc-query-country-28d-end1105.csv (数据日 2026-11-04, 116.2h, 已 STALE)
- 对端交付: 2026-11-08-risk-query-priority-execution.md (74ffa5a9, 4/4 PASS) · 2026-11-08-poster-wedding-primary-url-execution.md (9acc3d16, 4/4 PASS) · 2026-11-09-p0-catalog-h1-execution.md (a33abd3b, CF 128890190650) · 2026-11-09-p2-catalog-desc-execution.md (392c5f30, CF 128985513618) · docs/2026-11-09-retest-1114-runbook.md (19:56) · docs/2026-11-09-row4-flyers-books-evidence.md (20:08, d7a8d5d7)
- 版本链: .git/logs/HEAD L645-663 · .git/refs/heads/main = 3098ddab (1 commit ahead) · .git/refs/remotes/origin/main = d7a8d5d7
- 线上探针 (本车道 2026-11-09 20:2x, 每 URL 单次): /en/product/catalog-printing/ 200 (H1 10+, 规格表 100×3, FAQ 50–100) · /zh-hk/category/flyers/ 200 (title 原文, 7 SKU MOQ 10)
- 环境: pwsh 沙箱禁用 (v9.4, 不重试) ⇒ detector / API / tsc / 门禁 / xlsx 重解析 / schtasks 未实跑; commit/push 由 host wrapper 兜底
校准状态: 🟢 已校准 (2026-11-09) — 总线/时龄/窗口算术/git 链 = 一手直读或可复核算术; 🟡 KPI = 11-07 携带值 (24h 66.2h, 7d/28d 116.2h, 3mo 212.2h; 同源 MEDIUM); 🟡 线上 = 2 URL 单次抓取; 🟡 title 当量 = 对端测量转述, 本车道无 node 未跑 title-v5; 🔴 detector = missing
撤回声明: 无。本轮不推翻任何前序读数; 仅做状态更新 (A1/A2 由 CLOSED 复发, A36 由 CLOSED 复发, A43 由 OPEN 转 PARTIAL), 均属时间推移与新证据, 非撤回。
口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用结论; 零客户可见内容写入。**无老站 z-printpro.com 对比基线** —— 现有 GSC 档均为新站 zprintpro.com 属性，301 前后对比需另导老站属性（§0.30.9 显式声明）。
```

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 今日 KPI / 任何新 delta | 无 11-08/09 导出；本报告全部词行为 11-07 携带值，只作基线 |
| 2 | 恢复系数 | 无当日 detector ⇒ `available:false`；96.98% 是 11-07 派生值，123.7% 是 11-03 官方值 |
| 3 | 11-14 复测的「实际结果」 | 尚未发生；§5 是**窗口算术**与**稀释模型**，不是测量结果 |
| 4 | `titleEquiv=59` | 转述对端测量；本沙箱无 node，未跑 `title-equiv.js` / `title-v5` ⇒ `PROVISIONAL` |
| 5 | 线上 | 每 URL 单次抓取；CDN/缓存可能造成快照差异，未做 3–6 次重复 |
| 6 | A50 EN 页中文块 | 单次抓取所见；是否为渲染层/数据层问题未确认，只记观察 |
| 7 | 调度器状态 | 引用 11-09 06:43 快照，非本轮实测；本轮触发归属 unknown（可能是 harness/人工补跑） |
| 8 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在 lane 退出后写入；本报告只声称 ③「当日报告」+ ④「20:13 preflight 持锁」 |
| 9 | 对端文件的内部一致性 | `gsc-2026-11-09-flyers-books-live.json` 的 `hasSingle10=false` 与其 title 字面不符；只作旁证 |
| 10 | 历史 verdict | 11-02 / 11-05 / 11-07 的机器状态不改写；本轮只判「内容是否已交付 / 远端是否已含」 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7 + 2026-11-07 四窗差分块 + 2026-11-03 证据分流块 + 恢复模式块 + sop-10-gate）· 2026-11-09 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
