# 2026-11-07 · ZP-gsc-feedback 车道报告（11-07 三档到位 / 3mo 仍缺 / 24h 双降但 28d 双升 / 钱词首页 8 但 7 零点击 / 14 项交接）

VERDICT: OK
RECOVERY: **96.98%（DERIVED_SAME_BATCH · 803 ÷ 827.96 · full-country · 非 detector 输出）** — 最后官方值仍是 **123.7%**（`gsc-cliff-2026-11-03.json` · 977 ÷ 789.8）；今日无 `gsc-cliff-2026-11-07.json`
RECOVERY_STATUS: **UNVERIFIED_TODAY** — 比率从 123.7% 落到 96.98%，分解为「24h 分子 −17.8% × 28d 分母 +4.84%」= 比率 −21.6%；这是**相对比率移动**，不是流量崩塌，也不是排名/处罚/索引读数
DATA_STATUS: **XLSX_2026_11_07_PARTIAL** — 24h / 7d / 28d 三档今日到位（K3 08:41 导出）；**3mo 缺**，沿用 11-03 档（2026-08-01..10-31）；API 仍 `end1105`（数据日 11-04，20:13 时龄 **68.2h**，11-08 00:00 到 72h 线）；detector **available:false**
CONSUMED: `run-context-ZP-gsc-feedback.json` @ 2026-11-07 20:13:03（preflight 9/9 ok / retry_queue 1 / 锁 pid 11776）| `lane-status.json` @ **2026-11-04 06:43**（3 天未重建 → `STALE_STATUS`）| `lane-results-bus-contract.md`（§6.1 只给任务不改页 / §7.1 运行口径 / §7.2 队列纪律 / §7.4 学习边界）| `zprintpro-gsc-feedback-loop.md`（2026-11-07 四窗差分块 + 2026-11-03 证据分流块 + 恢复模式块）+ `sop-10-gate.md` | `gsc-2026-11-07-four-window-analysis.json`（10:31）| `gsc-2026-11-07-money-keyword-delta.json`（10:31）| `gsc-2026-11-07-workbook-schema.json`（10:00）| `periodic-review-weekly-2026-11-07.json/.md`（10:43）| `GSC数据/` 11-07 三档 xlsx + 11-03 3mo | `money-kw-share-baseline-2026-10-31.md`（query×page 归因基线，仅归因不作业绩）| `2026-11-07-ZP-daily-content.md`（18:17 同侪）| `2026-11-06-ZP-weekly-meta.md`（AUTO-FILL BLOCKED）| `lane-runs.jsonl`（104 条）| `strategy-task-queue.json` | `GSC数据/index.json`
DELIVERED: .hermes/logs/2026-11-07-ZP-gsc-feedback.md, .hermes/logs/gsc-daily-anomaly-2026-11-07.json
NEXT: **11-08 00:00 前**拉 API `--end 2026-11-07`（数据日 11-06），否则 API 面越 72h 线；**11-13 20:52** weekly-meta 自然轮消费 7 项 FIX + 逾期 sticker title + B1b（若 preflight 过）；**11-14** 14 项交接 7d 复测（同词/同页/同窗，单窗不判胜负）；**11-10** 月曆 copy 7 天窗；**12-01** monthly 自然触发
IDEMPOTENCY: `9b2ebe84434083de`（run-context 给定）；新日新 target（四窗差分 + 钱词交接 + 池口径钉死）⇒ 合法新工作；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10 / 10-28 / 10-29 / 10-30 历史键，**不含本键**
RETRY_OF: **ZP-gsc-feedback-20261102T201308-33844**（`retry_queue[0]`，UNRESOLVED_DAY 2026-11-02，dsh_exit=1）→ **ALREADY_DONE(since 2026-11-02 20:2x)**：该失败轮已由同日恢复轮写 `2026-11-02-ZP-gsc-feedback.md`（VERDICT OK）+ anomaly + matrix，本轮**零重写**；机器 verdict 按契约 §6.3/§7.1.2 保持 FAILED，不改写历史
STATUS_GATE: **STALE_STATUS** — lane-status 3 天未重建；本轮用 `lane-runs.jsonl` 104 条 + 当日报告做手工对账，**不**用旧 verdict 自动派运维修复，**未写** `lane-status.json`（共享运行证据，非车道产物）
COVERAGE: **NEW_DATA + NEW_ANALYSIS** — 11-07 三档首次入库；四窗差分；29 钱词逐行；7 项 FIX + 7 项 MEASURE + 6 项 `NO_CURRENT_BASELINE`；新增 A44/A45/NEW-14/15/16
CONFIDENCE: **HIGH（行级）** — 29 钱词逐行回读 delta JSON，rows 求和对齐 2,102 imp / 4 clk；7d 日行求和 135 clk / 6,912 imp 与 chart 完全一致；CTR 由 clk÷imp 复算一致；**MEDIUM（趋势）** — 7d/28d 窗口分别重叠 3/7 与 24/28 天，差值只是 4 天滚动；**LOW（归因）** — 今日导出无 query×page join，承接 URL 只能用 10-31 基线（7 天龄）
RUN: 定时 20:13 轮；本机 pwsh **本次实测可用（与 v9.4 注记不符，非重试所得）**，但 `python scripts/gsc-cliff-detector.py` 一次失败（uv trampoline `os error 2`）后**未重试**；算术与 JSON 校验用 node 完成；**零 `src/` 写入、零 title/desc 改动、零 canonical/301、零队列状态翻转**

> **VERDICT 释义（防误读）**：本行 `OK` = **车道执行完成**（契约 §6.1/§6.3：当日数据文件 + 当日报告 + 异常分类 + 下一验证点齐备），**不是**「KPI 已恢复」，**不是**「spam 处罚已解除」，**不是**「weekly-meta 已消费」，**不是**「3mo 已补齐」。今日真实状态 = `24h/7d/28d fresh / 3mo carried / detector missing / recovery derived only / 钱词首页 8 中 7 零点击 / 7 词两窗恶化`。

---

## 0. 本轮一句话结论

**数据面今天恢复了三条窗，但恢复的不是「好消息」而是「可测量性」：24h 从 23 clk / 977 imp 掉到 12 / 803，28d 却从 504 / 22,114 升到 538 / 23,183；钱词首页从 6 个增到 8 个，其中 7 个零点击。今天的问题不是没有曝光，而是页一曝光不产生点击、以及 7 个词连续两窗恶化。**

三件最值钱的新事实：

1. **恢复比率回落到 96.98%，但不是崩塌**：123.7% → 96.98% 的 26.7 个百分点里，分子 −17.8%、分母 +4.84%（28d 日均 789.8 → 827.96）。同一批 24h 803 imp 若用固定基线 585.2 算是 137.2%，按 A17 **禁止**当恢复系数。结论只能写到「与滚动 28d 均值大致持平」，不能写「恢复丢失」或「持续恢复」。
2. **钱词结构是「页一有位置、摘要没点击」**：8 个页一词合计 297 imp / 1 clk，其中 7 个零点击（239 imp / 0 clk）。`即日印刷` 是唯一有点击的页一词（58 imp / 1 clk / 7.55）。另有 15 个钱词深在 20 名外，`喜帖印刷`（36.25）、`教材 印刷製本`（31.49）、`a2 poster`（25.80）三窗连续恶化。
3. **7d 与 28d 打架时不能派单**：`月曆印刷` 7d −4.58 位、28d 只 −0.86；`貼紙印刷` 7d −4.88、28d −0.41；`海報印刷` 7d +5.37、28d +0.42。三者都**不进**今日 MEASURE 名单，只记 watch。`貼紙印刷` 的 28d 37.65 与 daily 车道今日三法对照 HOLD 完全一致。

同时如实登记：**3mo 仍缺**（11-07 只导出 3/4 窗）；**detector 连缺 4 日**（11-04..11-07）；**weekly-meta 11-06 被 preflight 拦下**，7 项 FIX 与逾期 sticker title 要等到 11-13；**k3-review 11-07 07:10 第 4 次缺跑**；`lane-status` 停在 11-04。

---

## 1. 结果总线消费（第 -1 优先级）

| 项 | 事实 | 本轮处置 |
|---|---|---|
| `retry_queue[0]` | `UNRESOLVED_DAY 2026-11-02 / FAILED`，dsh_exit=1 | **ALREADY_DONE(since 11-02 20:2x)**：11-02 恢复报告 / anomaly / matrix 均在盘；零重写；机器 verdict 保持 FAILED（§6.3） |
| `previous_run` | 11-06 gsc **OK**（bus #101 / head 5f0d8e1d / files=matrix） | 其 KPI 冻结值、A36 dead-letter 候选、B1/B1b 批门均作为本轮「上轮 X」基准继承 |
| `lane-status` | 生成于 **2026-11-04 06:43**，bus_records=93（实为 104），problems=2 | **STALE_STATUS**：不把 PENDING 当今日盘面；今日盘面改用 bus + 当日文件；不写该文件 |
| 今日同侪 | daily 18:17 **OK**（harness；貼紙 37.65 HOLD；sticker title 执行包；push 被 guard #21 拦）；weekly-meta 11-06 **BLOCKED**；k3-review 11-07 **无记录** | 只读消费；不代跑、不改其报告、不替对端 stamp |
| 外部产物 | 10:00–10:43 的分析档（schema / 四窗 / 钱词 / 周复盘） | **只读**；本轮零改写 |
| 锁 | preflight 已持 `lane.lock`（pid 11776，20:13:03） | 写入仅 `.hermes/`，不碰 `src/` |
| 队列 | `FIX-20261104-STICKER-CATEGORY-TITLE-EQ` 仍 SCHEDULED 11-04（逾期第 3 日）；`FIX-20261031-FIVE-CATEGORY-TRUTH` WAITING_K3；`FIX-20261031-PRIMARY-URL-MISMATCH` WAITING_K3 | 只引用，不翻状态；不抢他车道 READY；`strategy-task-queue.json` **零写入** |

### 1.1 手工对账（替代 3 天未重建的 lane-status）

- bus 104 条：11-06 gsc 20:24 OK → weekly-meta 20:52 BLOCKED（`strategy-feedback exited 1`，key 未消费）→ daily 21:26 OK → 11-07 daily 18:17 OK。
- 缺口：11-07 07:10 k3-review 无 bus 记录、无报告（第 4 个运行缺口：11-04 daily / 11-05 watchdog / 11-06 k3 / 11-07 k3）；monthly 11-01 MISSING 第 7 天。
- **不**从旧 lane-status 自动派运维修复；运维项只写 §10 need_human，附一条可粘贴命令。

---

## 2. 四窗 KPI（同窗口、同 xlsx 口径，11-03 → 11-07）

| 窗口 | 窗期（本轮） | 点击（上→本） | 展示（上→本） | CTR | 平均排名 | Δ 排名 | 读法 |
|---|---|---|---:|---:|---:|---:|---|
| **24h** | 11-06T03:00..11-07T02:00 | 23 → **12**（−47.8%） | 977 → **803**（−17.8%） | 2.3541% → **1.4944%**（−0.860pp） | 15.9332 → **12.5218** | **−3.41（更好）** | 仅健康信号；周二 vs 周五，单日样本，**不与 28d 排名比较** |
| **7d** | 10-29..11-04 | 132 → **135**（+2.3%） | 6,255 → **6,912**（+10.5%） | 2.1103% → **1.9531%**（−0.157pp） | 15.5953 → **15.9627** | **+0.37（更差）** | **风险窗**：曝光增、CTR 降、均位退；3/7 天重叠，4 天滚动 |
| **28d** | 10-08..11-04 | 504 → **538**（+6.7%） | 22,114 → **23,183**（+4.8%） | 2.2791% → **2.3207%**（+0.042pp） | 14.0266 → **14.2796** | **+0.25（更差）** | 量与 CTR 微升、均位微退；24/28 天重叠，非独立实验 |
| **3mo** | **11-03 档**：08-01..10-31 | 1,279（carried） | 65,252（carried） | 1.9601% | 17.355 | — | **背景，不是今日数据**；11-07 无 3mo 导出 |

- **24h 为什么不能当趋势**：本次 24h 是周五 03:00→周六 02:00，对照是周一 03:00→周二 02:00；点击减半但平均排名反而好 3.41 位 ⇒ 是「更少、但位置更好的曝光」，不是全面下滑。
- **7d 的真实风险**：曝光 +10.5% 而 CTR −0.157pp、均位 +0.37，说明新增曝光偏向深位；这正是「页一有位置、摘要没点击」的另一种写法。
- **28d 的真实方向**：点击 +6.7%、展示 +4.8%、CTR +0.042pp，均位只退 0.25 ⇒ 不是断崖，也不是反弹；是「量增、位微退」的平台期。
- **3mo 月度背景**（同一 92 天日序列分区，不证明因果）：8 月 321 / 19,031 / 25.13；9 月 413 / 22,162 / 14.22；10 月 **545 / 24,059 / 14.09**。10 月是三个月最好月，但 11 月的 28d 均位（14.28）比 10 月（14.09）略退。

### 2.1 结构性证据：产品摘要占 39% 曝光、35% 点击

| 窗口 | 产品摘要占曝光 | 占点击 | 摘要 CTR | 非摘要 CTR | 摘要排名 |
|---|---:|---:|---:|---:|---:|
| 24h | 35.5% | 25.0% | 1.05% | 1.74% | — |
| 7d | 38.9% | 30.4% | 1.52% | 2.23% | 32.32 |
| **28d** | **38.7%** | **35.3%** | **2.12%** | **2.45%** | **28.94** |

- 三个窗口一致：**摘要 CTR 都低于非摘要**，且摘要位置在 29 名附近（很深）却贡献 35% 点击。
- 这解释了「平均排名 14.28、CTR 2.32%」的组合：不是纯自然结果，近四成曝光来自产品富结果。**若摘要面变化，点击会在页面零改动的情况下移动**——这条交 monthly 做结构测量（`MEASURE-20261107-PRODUCT-SNIPPET-STRUCTURE`），本车道不改 feed、不改产品页。
- 设备面（28d）：桌面 13,819 / 317 / 2.29% / 16.56；移动 9,065 / 211 / 2.33% / **10.70**；平板 299 / 10 / 3.34% / 16.86。移动位置更好、CTR 与桌面几乎相同。
- 国家面（28d，**搜索者位置，不是 locale 站业绩**）：HK 13,651 / **382（71% 点击）** / 2.80% / 13.61；JP 2,720 / 47 / 1.73% / **21.28**（11-03 为 19.52）；US 2,658 / 33 / 1.24% / 15.45（11-03 为 15.25）。JP 曝光 +10.3% 而均位退 1.76，是「更多深位曝光」的同一模式；不能据此说 ja 站变差。

---

## 3. 恢复系数：96.98% 是「比率」，不是「流量」

| 日期 | 24h 展示 | 点击 | 28d 日均分母 | 比率 | 状态 |
|---|---:|---:|---:|---:|---|
| 2026-10-29 | 793 | 15 | 749.2 | 105.8% | fresh |
| 2026-10-30 | 888 | 15 | 754.5 | 117.7% | fresh |
| 2026-11-03 | 977 | 23 | 789.8 | **123.7%** | 最后官方值 |
| **2026-11-07** | **803** | **12** | **827.96** | **96.98%** | **DERIVED / 非 detector** |

- **公式**：`803 ÷ (23,183 ÷ 28) = 803 ÷ 827.9643 = 0.96985`。同批同式，full-country；分子来自 11-07 24h，分母来自 11-07 28d 日序列。
- **为什么不能写「恢复崩塌」**：比率是相对量。分子 −17.8%，分母 +4.84%，比率自然 −21.6%。同一 803 imp 用固定 585.2 算是 **137.2%**——A17 明令不得当恢复系数，167.0%（11-03 固定口径）与 129.5%（旧动态分母）同样禁用。
- **为什么不能写「持续恢复」**：10-29 → 10-30 → 11-03 的三点单调，已被 11-07 的 96.98% 打断；但打断的部分原因是分母上移，所以也**不能**写「掉回断崖」。正确表述：**与滚动 28d 均值大致持平，恢复的绝对水平无法由该比率判断**。
- **冻结纪律**：10-12..10-28 的三站和点不是 full-country 口径，**不并入本曲线**（A24）；本报告只列 4 个可比点，不画「连续抬升」。
- **UNKNOWN 三项**：处罚解除状态、排名恢复、索引覆盖率。GSC 四档没有索引覆盖率 sheet，今日无人工处罚页核验；**不编造**。
- **detector 缺失**：`python scripts/gsc-cliff-detector.py` 一次失败（uv trampoline `os error 2`），未重试；因此没有 `gsc-cliff-2026-11-07.json`。96.98% 只能标 `PROVISIONAL_NOT_DETECTOR`。
- **阈值口径**：恢复块定义 ≥60% = 部分恢复、≥90% = 基本恢复。96.98% 按此表落在「基本恢复」区间，但它是 derived、是与滚动均值的相对比，**不等于处罚解除、排名恢复或索引恢复**。
- **spam 恢复周报（2026-11-07 周节）**：
  - 曲线：105.8%（10-29）→ 117.7%（10-30）→ 123.7%（11-03）→ **96.98%（11-07，derived）**；4 个可比点，分母 749.2 / 754.5 / 789.8 / 827.96。
  - 索引覆盖率变化：**UNKNOWN** —— 四档无「索引覆盖率」sheet；`index.json` lastBuild 11-05、latestFreshData 11-03，滞后于 11-07 导出，不能当覆盖率证据。
  - 人工处罚页状态：**UNKNOWN** —— 今日无核验，不编造。
  - 下次 Google 更新窗口：无官方时间表，**不做日期预测**；只看 24h/7d 序列 + 展示结构 + 索引覆盖。
  - 口径警告：不并入 10-12..10-28 三站和点；不与固定 585.2 基线混算。

---

## 4. 钱词 29 行：页一 8 / 零点击 7 / 深位 15

口径：精确匹配 query 行，全国家 28d xlsx（2026-10-08..11-04），query sheet 上限 1,000 行。29 个钱词行合计 **2,102 imp / 4 clk**；页一 8 行 **297 imp / 1 clk**；页一零点击 7 行 **239 imp / 0 clk**；20 名外 15 行。缺失行是 `NO_CURRENT_BASELINE`，不是零需求。

**CTR c=0 的多档证据（逐档回读，不用新公式）**：29 个钱词中 **24 个在 10-30 / 11-03 / 11-07 三档全部 0 点击**；页一 8 行中 **7 行三档全部 0 点击**（唯一例外是 `即日印刷` 1/1/1）。这不是「某一天没点击」，是连续三档的摘要失效面。

### 4.1 页一 8 行（FIX 候选 7 + 唯一有点击的 1）

| 词 | imp | clk | pos | Δpos 本窗 | 7d 方向 | 承接 URL（10-31 归因基线） | 处置 |
|---|---:|---:|---:|---:|---|---|---|
| 食品包裝印刷 | 116 | 0 | **8.36** | −0.06 | +0.33 | **未知**；页表候选 `/zh-hk/blog/food-packaging-printing-guide/` 298@7.59 | **FIX**（先抓 URL + snippet） |
| 即日印刷 | 58 | **1** | 7.55 | −0.38 | −0.06 | 未在 17 词基线内 | watch（唯一有点击） |
| small batch sticker printing | 27 | 0 | **6.00** | +0.34 | −12.0（仅 1 imp） | `/en/product/small-batch-stickers/` **100%** | **FIX**（与 sticker title 批去重） |
| small batch stickers | 19 | 0 | **5.42** | +0.32 | +1.5 | 同一 PDP（复数未实测） | **FIX**（合并到上项） |
| saddle stitch booklet printing | 5 | 0 | **7.40** | +0.73 | 无基线 | 未知；候选 blog / PDP | **FIX 低样本**（≥20 imp 才动） |
| doujinshi printing | 55 | 0 | **9.98** | −0.08 | −0.85 | 未知（EN；zh 同人 blog 221@5.93 非证明） | **FIX/观察**（新进页一） |
| large envelopes | 1 | 0 | **7.00** | −6.88 | 无基线 | 未知 | **FIX 低样本**（1 imp，不动作） |
| 卒アル販売 | 16 | 0 | **5.00** | 0.00 | 无基线 | 未知 | **FIX**（三窗逐位相同，查陈旧 snippet） |

- **`large envelopes` 的「进入页一」是 1 imp 的样本伪影**，不庆祝、不派内容任务；`doujinshi printing` 55 imp 的页一进入才值得观察一窗。
- **7 项 FIX 全部是 PROPOSE_ONLY**，没有 SERP 快照、没有 meta description 读数、没有当日 query×page join ⇒ 任何 title/desc 改动都必须等 weekly-meta 先补齐这三件。

### 4.2 两窗连续恶化 7 行（MEASURE）

判定口径：两窗同向且每窗 |Δpos| > 0.5（由 11-07 分析档逐行反推；`包裝盒印刷` +0.50 恰在边缘未计入）。

| 词 | imp | clk | pos | 三窗轨迹（10-30 → 11-03 → 11-07） | 承接 URL（10-31） | 根因假设（待证） |
|---|---:|---:|---:|---|---|---|
| コミケ 印刷 | 163 | 0 | 22.88 | 18.99 → 22.04 → **22.88** | `/ja/product/doujinshi-printing/` 94% | 季节 SERP（C109 官方/活动页）挤压 |
| 宣傳單張 | 127 | 0 | 34.73 | 29.37 → 33.74 → **34.73** | `/zh-hk/category/flyers/` 87% | 查询位次远深于页面均位（23.91），摘要/内链错配 |
| 印海報 | 124 | 0 | 14.15 | 12.79 → 13.36 → **14.15** | 未知；疑与 `海報印刷` 同 blog | 与 `海報印刷`（261 imp / 14.83）同意图分流 |
| 利是封印刷 | 59 | 1 | 24.42 | 21.60 → 23.63 → **24.42** | `/zh-hk/category/red-packets/` 75% | 季节窗，非永久退 |
| 教材 印刷製本 | 51 | 0 | 31.49 | 20.69 → 28.67 → **31.49** | `/ja/blog/textbook-printing-guide/` 70% | ja 教材 blog 已知 JPY 价冲突 + 语言质量 |
| a2 poster | 49 | 1 | 25.80 | 17.20 → 18.68 → **25.80** | 未知；候选 `/en/product/a2-posters/` | 产品摘要/feed 变化或 EN 页改版 |
| 喜帖印刷 | 16 | 0 | 36.25 | 16.13 → 29.40 → **36.25** | `/zh-hk/product/wedding-thank-you-cards/` **73%** | **意图错配**：感谢卡 PDP 接婚礼请柬查询 |

- **喜帖是今天最清晰的一条根因线索**：不是「排名掉了」，而是「接错页」——73% 份额落在 thank-you-cards PDP，category/wedding-invitations 只有 27%。这条交 MEASURE，**不**由本车道改 redirect/canonical/新页。
- **教材**的三窗恶化与已知 JPY 价冲突同页，但**不能**把相关当因果；先记录，content owner 决定。
- **a2 poster** 的 1 clk / 49 imp 说明摘要仍能偶尔拿到点击；25.80 的位移不等于「页面失效」。

### 4.3 两窗改善 4 行（HOLD / 复测，不 SCALE）

| 词 | imp | clk | pos | 三窗轨迹 | 备注 |
|---|---:|---:|---:|---|---|
| china catalog printing | 98 | 0 | 14.15 | 15.79 → 14.96 → **14.15** | 曝光 72 → 72 → 98；`/en/product/catalog-printing/` 73% |
| pvc シール | 22 | 0 | 15.91 | 18.75 → 17.79 → **15.91** | ja，仍 15 名外 |
| 貼紙訂製 | 38 | 0 | 29.29 | 32.41 → 30.59 → **29.29** | 第一 URL 是 blog sticker-guide 31% |
| 印刷公司 | 142 | **2** | 26.80 | 29.58 → 28.03 → **26.80** | 唯一「改善 + 有点击」的钱词 |

- **全部只到 HOLD_RETEST**：没有 production_deploy、没有 online_verify、没有 retest ⇒ 不满足 SCALE 五件套（契约 §7.4）。窗口移动不是实验胜负。

### 4.4 阈值边缘 / 7d 打架（不派单，只 watch）

| 词 | 28d 三窗 | 7d 方向 | 为什么不派 |
|---|---|---|---|
| 包裝盒印刷 | 31.89 → 32.80 → **33.30**（+0.91 / **+0.50**） | −7.65（改善） | 第二窗恰为 +0.50，不满足 >0.5；7d 与 28d 反向 |
| 貼紙印刷 | 40.88 → 38.06 → **37.65**（−2.82 / −0.41） | −4.88（改善） | 第二窗 −0.41 不过阈；daily 三法 HOLD 37.65 一致 |
| 海報印刷 | 14.94 → 14.41 → **14.83**（−0.53 / +0.42） | +5.37（恶化） | 两窗不同向；7d 单窗恶化不得单独派单 |
| 即日印刷 | 7.39 → 7.93 → **7.55**（+0.54 / −0.38） | −0.06 | 两窗不同向；且它是唯一页一点击词 |
| 月曆印刷 | 23.71 → 25.30 → **24.44**（+1.59 / −0.86） | −4.58（改善） | 两窗不同向；copy 7 天窗 11-10 |
| 書刊印刷 | 32.28 → 31.98 → **33.08**（−0.30 / +1.10） | +4.51（恶化） | 第一窗反向；7d 单窗不派 |

- 这张表是今天防「看见 7d 就派单」的证据。`海報印刷` 是海报簇最大词（261 imp），7d 恶化最扎眼，但 28d 两窗不同向 ⇒ **只 watch，不派 MEASURE**。

### 4.5 任务 J 8 锁词完整性：7/8 有今日 xlsx 行

| 锁词 | 今日 28d xlsx | 判读 |
|---|---:|---|
| 包裝盒印刷 | 53 / 0 / 33.30 | 阈值边缘（+0.50 不计连续），watch |
| 紙盒印刷 | 54 / 0 / 36.72 | 深位、0 点击 |
| 包裝盒訂製 | 53 / 0 / 34.43 | 深位、0 点击 |
| 貼紙印刷 | 131 / 0 / 37.65 | 深位 38；daily 三法 HOLD 一致 |
| 宣傳單張 | 127 / 0 / 34.73 | 两窗恶化，MEASURE |
| 即日印刷 | 58 / **1** / 7.55 | 唯一页一、唯一点击 |
| 書刊印刷 | 121 / 0 / 33.08 | 深位；7d +4.51 但 28d 非连续，watch |
| **騎馬釘** | **无今日精确行** | **NO_CURRENT_XLSX_BASELINE**；最后 API 值 65 / 0 / 19.54（end1105，数据日 11-04，hkg）**只作背景，不作今日 KPI** |

- 7 个有今日行的锁词里 **6 个深于 20 名**，只有 `即日印刷` 在页一并有点击；包裝盒三词仍在 33-37 名。这个结构与「页一有位置、摘要没点击」是同一枚硬币的两面：**页一只有 1 个锁词，且它的 CTR 是 1.72%**。
- `騎馬釘` 不沿用 11-04 的 API 值进今日基线（契约「缺当前精确行 = NO_CURRENT_BASELINE」）；下一窗若 xlsx 仍无该行，需在生成器层补该词，而不是在报告层手搬旧值。

---

## 5. 三条队列（机会 / 退场 / 内耗）

> **退场 = 停止追加投入 / 停止扩页，不等于删页或 noindex。** 删页/noindex 需 K3 或 monthly 裁决；本车道零页面写。

### 5.1 机会队列

| ID | 类型 | 规模 | 路由 | 说明 |
|---|---|---|---|---|
| OPP-01 | 页一零点击 | 7 词 / 239 imp / 0 clk | **FIX → weekly-meta** | 今日最大可执行池；先补 SERP + snippet + URL |
| OPP-02 | 新进页一 | doujinshi printing 55 imp；large envelopes 1 imp | WATCH | 后者样本伪影；前者观察一窗 |
| OPP-03 | 两窗改善 | 4 词（china catalog / pvc シール / 貼紙訂製 / 印刷公司） | HOLD_RETEST | 无部署/线上核验，不 SCALE |
| OPP-04 | 产品摘要结构 | 38.7% 曝光 / 35.3% 点击 / 摘要 CTR 2.12% vs 2.45% | MEASURE → monthly | 结构性依赖，非单页问题 |
| OPP-05 | 市场 CTR 差 | HK 2.80% / JP 1.73% / US 1.24%（搜索者位置） | MEASURE → monthly | 不能当 locale 站业绩 |

### 5.2 退场候选（停止追加投入，不是删页）

| ID | 词 | 理由 | 动作 |
|---|---|---|---|
| EXIT-01 | 教材 印刷製本 | 20.69 → 28.67 → 31.49；ja 教材 blog 70% 份额且有 JPY 价冲突 | 停 ja 教材扩写，先价真值 + 语言 |
| EXIT-02 | 喜帖印刷 | 16.13 → 29.40 → 36.25；感谢卡 PDP 73% 接请柬查询 | 停内容扩张，先意图诊断 |
| EXIT-03 | a2 poster | 17.20 → 18.68 → 25.80 | 停新海报内容，守现有 PDP |
| EXIT-04 | コミケ 印刷 | 18.99 → 22.04 → 22.88；C109 季节 | 不建新页，等活动周期 |
| EXIT-05 | 宣傳單張 | 29.37 → 33.74 → 34.73；category/flyers 87% | 停新传单文章，查摘要/内链 |
| EXIT-06 | 利是封印刷 | 21.60 → 23.63 → 24.42；red-packets 75% | 只保护，不扩页 |
| EXIT-07 | 印海報 | 12.79 → 13.36 → 14.15；唯一点击丢失 | 合并到海報印刷意图，不建独立页 |

### 5.3 内耗候选（**假设，无当日 join**）

| ID | 簇 | 页面证据（28d page 表） | 10-31 share 证据 | 判定 |
|---|---|---|---|---|
| IF-01 | posters | blog 1,507@9.11 / a2 PDP 827@13.01 / category 262@**42.85** | 海報印刷 第一 URL=blog 37%、PDP 16%、category 未进前二 | category 最弱，三 URL 同意图 |
| IF-02 | books | category 631@**48.07** / book-buying 417@35.75 / saddle blog 391@10.22 / saddle PDP 306@37.23 | 書刊印刷 blog 46% vs category 45%；印書 blog 34% vs category 32% | 近平手轮换，category 深 |
| IF-03 | stickers | category 34% share / sticker-guide blog 27% / 10 URLs | 貼紙訂製 第一 URL=blog 31%、第二 blog 29% | 分类页份额低，多页分流 |

- **不能把 page 表与 query 行直接 join**（guardrail）。上表只说明「同簇多 URL、份额分散」，不是「某词一定被某页抢走」。真正的 join 需下一次 query×page 导出；`FIX-20261031-PRIMARY-URL-MISMATCH` 仍 WAITING_K3，本轮不替 K3 认定主 URL。

---

## 6. 交接台账（14 项，字段齐）

机器可读全文：`.hermes/logs/gsc-daily-anomaly-2026-11-07.json` → `handoffs[]`。每项均含 `owner_lane / baseline / required_action / approval_gate / retry_at / cooldown_days / production_deploy / online_verify / retest / exit_criteria`。本报告只列摘要：

| route | 数量 | 词 | owner | retry_at | 首发动作 |
|---|---:|---|---|---|---|
| **FIX** | 7 | 食品包裝印刷 / small batch sticker printing / small batch stickers / doujinshi printing / saddle stitch booklet printing / 卒アル販売 / large envelopes | ZP-weekly-meta | 2026-11-14 | 先抓 ranking URL + 实时 title/snippet + SERP feature，再一次只改一个变量 |
| **MEASURE** | 7 | コミケ 印刷 / 宣傳單張 / 印海報 / 利是封印刷 / 教材 印刷製本 / a2 poster / 喜帖印刷 | ZP-gsc-feedback | 2026-11-14 | 根因诊断（索引/意图/承接页/价真值），不建页、不 redirect、不 noindex |

- **FIX 的硬门**：`small batch sticker printing` 必须排在 `FIX-20261104-STICKER-CATEGORY-TITLE-EQ` 之后，同一窗不做第二次 title 改动；`saddle stitch`（5 imp）与 `large envelopes`（1 imp）设 ≥20 imp 样本门，今天**不动作**。
- **MEASURE 的硬门**：`喜帖` 的意图裁决需要 K3/monthly；`教材` 的价格真值需要 K3；`a2 poster` 的 EN URL 尚未确认；三条都不能由本车道改页面。
- **不派单的 6 个词**：`printing company` / `printing services` / `印刷廠` / `印刷服務` / `教科書印刷` / `網上印刷` — 当前精确行缺失，记 `NO_CURRENT_BASELINE`，**不沿用旧值**、不派内容任务。
- **同因只 recurrence**：7 项 MEASURE 与周复盘 10:43 的 7 项 MEASURE 完全同集合（词级一致），本轮不新建第二套任务 ID；只在 anomaly 里给 `handoff_id`，避免重复造单。

---

## 7. 数据诚信与口径自查（双方法）

| 检查 | 方法 A | 方法 B | 结果 |
|---|---|---|---|
| 7d 点击/展示 | chart 汇总 135 / 6,912 | 7 个日行相加 18+11+10+21+24+29+22 = 135；988+942+788+1018+993+1087+1096 = 6,912 | **一致** |
| 7d CTR | chart 1.9531% | 135 ÷ 6,912 = 1.9531% | **一致** |
| 28d 点击/展示/CTR | chart 538 / 23,183 / 2.3207% | 分析档 `two_method_reconciliation` match=true（两种独立算法） | **一致** |
| 24h CTR | chart 1.4944% | 12 ÷ 803 = 1.4944% | **一致** |
| 钱词行合计 | 29 行逐行相加 2,102 / 4 | 分析档 `money_focus_28d` 2,102 / 4 | **一致** |
| 页一零点击池 | 7 行（pos≤10 & clk=0） | 239 imp = 297 − 58（即日印刷） | **一致** |
| 恢复比率 | 803 ÷ 827.9643 = 0.96985 | 827.9643 × 0.97 = 803.13；反算一致 | **一致** |

- **平均排名无法由总量重算**（impression-weighted），7d/28d 依赖分析档的双方法对账；24h 均位只单方法，标 MEDIUM。
- **3mo 不是今日**：11-07 只导出 3 窗；3mo 沿用 11-03（08-01..10-31），不得写成「今日三个月数据」。
- **两平面不相减**：xlsx 28d 538 / 23,183 与 API `end1105` 74 clk / 8,115 imp 是窗口、grain、截断三重不同（API 仅 1,507 行 query×country）；API 只做词级/趋势，永不参与恢复系数。
- **池口径已钉死（A39 收敛）**：本报告只认「29 个精确钱词行 + pos≤10 + clk=0」= 7 行 / 239 imp。11-05 的 466 行 / 1,530 imp 是「pos≤10 无 imp 门槛」的另一套阈值，**不可比**，不得写「池从 16 扩到 466」。
- **两窗阈值**：|Δpos| > 0.5 才计连续；`包裝盒印刷` +0.50 不计入，`貼紙印刷` −0.41、`海報印刷` +0.42、`即日印刷` −0.38 均不计。
- **归因边界**：10-31 的 query×page 份额是 7 天前快照，只能决定「谁在接这个词」，不能当今日 CTR/排名原因；且它不覆盖全部 14 词。
- **GSC 黑话只进内部**：本文件在 `.hermes/logs/`，无客户可见内容写入（§0.23.1 门童 #16 范围外，但仍零 `src/`）。

---

## 8. 异常清单状态迁移

**今日关闭 / 部分解决**

| ID | 11-06 状态 | 11-07 | 依据 |
|---|---|---|---|
| A2 FROZEN_24H | OPEN_DAY3（24h 90h 龄） | **CLOSED_TODAY** | 新 24h 窗 11-06T03..11-07T02 |
| A36 XLSX_NOT_REFRESHED | P1 / DEAD_LETTER_CANDIDATE（第 3 日） | **CLOSED_BY_HUMAN** | K3 11-07 08:41 导出 24h/7d/28d |
| A1 DATA_STALE | DUAL_PLANE_DAY3 | **PARTIALLY_RESOLVED** | 三窗到位；3mo 仍缺；API 68.2h |
| A42 TITLE_EQ_CALIBER | 100 vs 104 未统一 | **RESOLVED_FOR_STICKER_PAIR** | daily 18:17 用 title-equiv 实算 en 100→55、ja 83→52 |
| A39 POOL_RULE_DRIFT | 16/632 vs 466/1,530 不可比 | **CALIBER_PINNED（钱词子集）** | 7 行 / 239 imp 口径写死；466 池仍不可重算 |

**今日新开 / 升级**

| ID | 级别 | 状态 | 要点 |
|---|---|---|---|
| A44 DETECTOR_RUNTIME | **P1** | **NEW** | `gsc-cliff-2026-11-07.json` 缺失；python uv trampoline `os error 2`；恢复只能 derived |
| A45 RECOVERY_DENOMINATOR | **P2** | **NEW** | 123.7→96.98：分子 −17.8%、分母 +4.84%；不得写成流量崩塌 |
| A43 RUN_GAP | **P1** | **OPEN** | 11-07 k3 07:10 第 4 缺口；weekly-meta 11-06 BLOCKED；lane-status 停 11-04 |
| NEW-8 喜帖 | P2 | **CONFIRMED_TWO_WINDOW_WORSENING** | 16.13 → 29.40 → 36.25；感谢卡 PDP 73% 意图错配 |
| NEW-10 包裝盒 | P2 | **THRESHOLD_EDGE** | +0.91 / +0.50，第二窗恰在阈值；不派单，下一窗看 |
| NEW-14 产品摘要依赖 | P2 | **NEW** | 38.7% 曝光 / 35.3% 点击；摘要 CTR 低于非摘要 |
| NEW-15 3mo 缺档 | P3 | **NEW** | 11-07 只导 3/4 窗；3mo 仍 11-03 |
| NEW-16 近阈移动 | P3 | **NEW** | 貼紙 −0.41 / 海報 +0.42 / 即日 −0.38，不派单 |

**carry（无新证据，不改状态）**

| ID | 状态 | 说明 |
|---|---|---|
| A41 BATCH_PRICE_CONFLICT | OPEN | 海报 blog desc 价冲突仍在；B1 仍 NO-GO as written；K3 价真值未裁 |
| A38 ja 正文中文 | OPEN | 今日未重抓；B5 继续 HOLD |
| A40 跨意图 top-5 | WATCH | `large envelopes` 1 imp 进页一 = 样本伪影；`alipay flash collect` 不在今日 29 行 |
| A28 monthly | MISSING 第 7 天 | 2147946720 未变；next 12-01 |
| NEW-1 貼紙 14 天 | HOLD | 37.65；daily 三法一致；11-14 第三窗 |
| NEW-13 海报价多值 | OPEN | A2 三值 / A1 三值；K3 未裁 |

---

## 9. 跨车道对账与写盘隔离

| 车道/会话 | 今日实况 | 与本轮关系 |
|---|---|---|
| ZP-daily-content | 18:17 harness **OK**；貼紙 37.65 HOLD；年賀状 3 窗 11 imp@8.45；FIX-STICKER 执行包（en 55 / ja 52）；**src 零写入**；push 被 guard #21 拦（commit 留本地） | 只读消费；貼紙结论与本轮 28d 一致；**零改写** |
| 10:00–10:43 分析会话 | workbook schema / 四窗差分 / 钱词 delta / 周复盘 | **只读**；未重拉、未重算、未改写 |
| ZP-weekly-meta | 11-06 20:52 **BLOCKED**（preflight `strategy-feedback exited 1`）；下次自然轮 11-13 | 其输入 = 本轮 7 项 FIX + 既有 B1b / sticker title；不代跑、不改队列 |
| ZP-k3-review | 11-07 07:10 **无记录、无报告** | 记 A43；不代跑 |
| ZP-monthly-matrix | 11-01 MISSING 第 7 天 | 只记录；12-01 自然触发 |
| ZP-blog-deepfix | 非调度日（周六 23:47） | 不预跑 |
| 11-06 本车道 | OK；A36 dead-letter 候选、B1/B1b 门、贴纸逾期 | 作为上轮基准继承；不重写 |

**写盘隔离**：本轮只写 **2 个新路径** —— 本报告 + `gsc-daily-anomaly-2026-11-07.json`。未触碰 `src/`、`GSC数据/`、`docs/`、`strategy-task-queue.json`、`lane-status.json`、`lane-runs.jsonl`、`gsc-cliff-*`、四窗/钱词/周复盘/同侪报告。今日无同文件撞车面。

---

## 10. K3 升级（need_human，一次性清桌）

1. **Python 运行时（A44，P1）** — `python scripts/gsc-cliff-detector.py` 返回 `uv trampoline failed ... os error 2`，本车道未重试。修好后恢复官方 detector 曲线：
   ```
   cd F:\zprintpro-nextjs
   python scripts\gsc-cliff-detector.py
   ```
2. **3mo 档（NEW-15，P3）** — 11-07 只导出 24h/7d/28d。请补 `3个月三站点汇总数据…2026-11-07.xlsx`；否则 3mo 只能继续标 11-03。
3. **weekly-meta 门（A43，P1）** — 11-06 20:52 preflight 被 `strategy-feedback exited 1` 拦下；11-07 10:43 周复盘已生成，说明脚本本身可用。请在 11-13 自然轮前做一次受控 smoke：
   ```
   python scripts/strategy-feedback.py --period weekly --date 2026-11-07 --repo F:\zprintpro-nextjs --write-queue
   ```
   否则 7 项 FIX + 逾期 sticker title + B1b 继续滞留。
4. **海报价真值（A41，P1）** — A2 仍见 9 / 16 / 2.20 三值，A1 见 20 / 29-45 / 45 三值。请一句话裁决唯一真值，或授权「desc 一律去价格」；裁决前 B1 不得逐字上线。
5. **monthly（A28，P1）** — `LastTaskResult=2147946720`，11-01 MISSING 第 7 天，下次自然 12-01：
   ```
   schtasks /change /tn ZP-monthly-matrix /st 12:13
   ```
6. **运行缺口（A43，P1）** — 11-07 k3 07:10 第 4 缺口；`lane-status` 停 11-04。请查主机夜间可用性，并重建总线：
   ```
   node scripts/lane-status.mjs --days=7
   ```
7. **push 门 #21（cross-lane，P1）** — 11-07 10:37 对端改 cron-prompt SSoT 未 stamp，daily 18:17 push 被拦；本报告的 host 侧 push 可能同样留本地。由 prompt 所有者执行 `rule-translation-guard.js --stamp`，本车道不代持。
8. **carry**：`FIX-20261104-STICKER-CATEGORY-TITLE-EQ` 逾期第 3 日（daily 已有执行包）；`A38` ja 正文中文（内容车道）；`FIX-20261031-PRIMARY-URL-MISMATCH` WAITING_K3（主 URL 认定，直接决定 IF-01/02 能不能动）。

---

## 11. 下一验证点

| 日期 | 验证 | 通过标准 |
|---|---|---|
| **2026-11-08 00:00** | API 面 72h 线 | 有 `--end 2026-11-07`（数据日 11-06）则继续 FRESH；否则 API 也 STALE |
| **2026-11-10** | 月曆 copy（c0552853）7 天窗 | 目标页 imp ≥ 基线 80% 且带钱词 ≥1 clk |
| **2026-11-13 20:52** | weekly-meta 自然轮 | preflight 过；消费 7 FIX + sticker title；单变量；title-v5 PASS |
| **2026-11-14** | 14 项交接 7d 复测 | 同词/同页/同窗；有 before→after；单窗不判胜负 |
| **2026-11-20..24** | GEO S2 | engine / date / answer / citation URL 四要素齐 |
| **2026-12-01** | monthly 自然触发 + 产品摘要结构复盘 | run 记录 + 月报告；否则 D1 后仍失败即 dead_letter |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 实读前序实现路径：11-07 分析档（四窗/钱词/workbook schema）、10-31 query×page 份额基线、11-06 anomaly（A/NEW/O 结构）、11-06 weekly-meta AUTO-FILL、11-07 周复盘（FIX/MEASURE 集合）。先读文件再判「两窗恶化」，未凭推断。
- [x] **2. 约束适用范围？** 查 K3 拍板与契约原文：§6.1「gsc 只给任务不改页」、§7.1「STALE_STATUS 不派运维修复」、§7.2「不自行批准/不翻队列」、§7.4「无 online_verify 不进学习候选」、§0.23（数字只来自真值）、§0.23.1（GSC 黑话只进内部）、§0.37（不接 GA4/008/订单）、§0.0（名片只接单不建页）。本轮零 `src/`、零 title、零 canonical/301、零队列翻转。
- [x] **3. 原数据/拍板来源？** ① 来源：11-07 三档 xlsx（K3 08:41）+ 分析档（10:31）+ 10-31 query×page 基线；② 真数据：29 钱词逐行回读、7d 日行求和、CTR 复算、rows 求和对齐；③ 留/撤：**零撤回**，只做状态推进（A2/A36 关闭、A1 部分解决、A44/A45 新开）。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入（零 `src/`）；报告内价格只作真值冲突证据，不新增价格声明。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告，非 user-facing 渲染层；未引入需 `parseInlineLinks` 的链接语法（URL 以代码/表格文本呈现）。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-07 20:13:03, preflight 9/9 ok, lock pid 11776, retry_queue 1) · lane-status.json (2026-11-04 06:43, STALE_STATUS) · lane-runs.jsonl (104 条)
- GSC xlsx (2026-11-07, K3 08:41 导出, 时点据 2026-11-07-ZP-daily-content.md §4): 24小时 (窗 2026-11-06T03:00..11-07T02:00, 12 clk / 803 imp / 1.4944% / 12.5218) · 7天 (10-29..11-04, 135 / 6912 / 1.9531% / 15.9627) · 28天 (10-08..11-04, 538 / 23183 / 2.3207% / 14.2796)
- GSC xlsx (2026-11-03): 3个月 (08-01..10-31, 1279 / 65252 / 1.9601% / 17.355) — carried, 非今日
- 分析档: gsc-2026-11-07-four-window-analysis.json (10:31, 双方法对账 match=true) · gsc-2026-11-07-money-keyword-delta.json (10:31, 29 钱词 + 8 行业头词) · gsc-2026-11-07-workbook-schema.json (10:00, 产品摘要/设备/国家 sheet)
- 归因: money-kw-share-baseline-2026-10-31.md (query×page, 1,870+2,159 行, 仅归因不作今日业绩)
- 恢复: gsc-cliff-2026-11-03.json (最后官方 123.7% = 977 / 789.8, full-country); 今日无 detector (A44)
- 同侪: 2026-11-07-ZP-daily-content.md (18:17) · 2026-11-06-ZP-weekly-meta.md (AUTO-FILL BLOCKED) · periodic-review-weekly-2026-11-07.md/.json (10:43) · strategy-task-queue.json
- 校准状态: 🟢 行级已校准 (29 钱词 / 7d 日行 / CTR 复算 / rows 求和 / 比率反算) · 🟡 24h 均位单方法 · 🟡 28d 均位依赖分析档双方法 · 🟡 归因用 7 天前快照 · 🔴 detector 缺 (A44)
- 撤回声明: 无。11-03 的 123.7% 在其窗口内继续有效；本轮不撤回任何历史读数；11-07 的 96.98% 标 DERIVED，不进官方序列
- 口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用结论; 无客户可见内容写入
```

---

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | detector / 官方恢复曲线 | python uv trampoline 失败，一次后停手；96.98% 是 derived，不是 detector 输出 |
| 2 | 3mo KPI | 11-07 无 3mo 导出；沿用 11-03，已标日期，不称「今日三个月」 |
| 3 | API 面 | 今日未拉取；`end1105` 数据日 11-04，68.2h；11-08 00:00 到 72h 线 |
| 4 | 24h 趋势 | 单日、不同星期；只作健康信号，不与 28d 排名比较 |
| 5 | 7d/28d 因果 | 窗口重叠 3/7 与 24/28 天；移动只是滚动，不是实验胜负 |
| 6 | 承接 URL | 今日导出无 query×page join；7 词有 10-31 份额证据，其余标 UNKNOWN；候选 URL 不等于已证 URL |
| 7 | SERP / snippet | 无 SERP feature 快照、web_fetch 读不到 meta description；7 项 FIX 全部 PROPOSE_ONLY |
| 8 | 池 466 行 | 11-05 分析档只公布 20 具名行，无明细；本轮只钉死 29 钱词子集（7 行 / 239 imp） |
| 9 | 恢复三项 UNKNOWN | 处罚解除 / 排名恢复 / 索引覆盖率均无今日证据；不编造 |
| 10 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在本 lane 退出后写入；本报告只声称 ③「当日报告」+ ④「20:13 触发 + preflight 持锁」 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7 + 2026-11-07 四窗差分块 + 2026-11-03 证据分流块 + 恢复模式块 + sop-10-gate）· 2026-11-07 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
