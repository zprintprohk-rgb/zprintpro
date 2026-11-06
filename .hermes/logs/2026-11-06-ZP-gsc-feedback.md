# 2026-11-06 · ZP-gsc-feedback 车道报告（第 3 日无新原始数据 · 相邻窗增量 · 20:52 批进场门：批1 价格冲突 NO-GO / 批1b 真值 GO · 逾期 sticker title 第 2 日未执行）

VERDICT: OK
RECOVERY: **available:false**（连续第 3 日无当日 detector；不推算、不换分母）— 最后官方值 = **123.7%**（`gsc-cliff-2026-11-03.json` · `recovery_ratio_vs_mean28_dynamic` · **977 ÷ 789.8** · full-country · 24h 窗止 2026-11-03 02:00 · **证据龄 ≈90h**）
RECOVERY_STATUS: **UNVERIFIED（第 3 日）** — 指标层面最后状态仍是「基本恢复（≥90%）」，但那是 11-03 的读数；处罚解除 / 排名恢复 / 索引覆盖仍 UNKNOWN。
RECOVERY_STREAK: 3 个全国家 fresh 点 **105.8% → 117.7% → 123.7%**，但 10-31 起**连续 6 日无新点** ⇒「连续 3 日抬升 = 再评估启动」**未触发**（冻结第 3 天，与 11-04/11-05 相同，不推进）。
DATA_STATUS: **NO_NEW_RAW_DATA** — xlsx 四档 **STALE 第 3 日**（11-03 批，数据日 10-31，≈140h）；24h 窗止 11-03 02:00（≈90h）；API 面 **FRESH 但停在上一天**（`end1105`，数据日 11-04，≈44h，11-08 00:00 到 72h 线）；detector 缺 11-04/05/06 共 3 日；今日无 `end1106` 拉取 ⇒ **任务J 无第六测**。
CONSUMED: `run-context-ZP-gsc-feedback.json` @ 2026-11-06 20:13:03（preflight 9/9 ok / retry_queue 2 项 / 锁 pid 5308）| `lane-status.json` @ **2026-11-04 06:43**（未重建 2 天；verdict=ATTENTION / problems=2）| `lane-results-bus-contract.md`（§6.1 只给任务不改页 / §7.1.5 同键恢复 / §7.2 队列纪律 / §7.4 学习边界）| `zprintpro-gsc-feedback-loop.md`（2026-11-03 证据分流块 + 恢复模式块）+ `sop-10-gate.md` | `GSC数据/gsc-query-country-28d-end1105.csv`（1,507 行 / 74 clk / 8,115 imp / 窗 2026-10-08..11-04，**只读**）| `GSC数据/gsc-query-country-28d-end1104.csv`（8,433 imp / 78 clk / 窗 10-07..11-03，**只读**）| `gsc-2026-11-05-analyst-anomaly.json`（taskj 五测 8 行 + 466 行池 / 1,530 imp）| `gsc-2026-11-05-api-pull-end1105.json` | `docs/2026-11-05-pool-snippet-evidence-sweep.md` | `docs/2026-11-04-weekly-meta-execution-sheet-1106.md` | `2026-11-06-ZP-daily-content.md`（18:17 同侪）| `2026-11-05-ZP-k3-review.md` | `lane-runs.jsonl`（100 条）| `gsc-cliff-2026-11-03.json` | `GSC数据/index.json` | `strategy-task-queue.json` | 线上实抓 4 URL（本车道 20:0x-20:1x）
DELIVERED: .hermes/logs/2026-11-06-ZP-gsc-feedback.md, .hermes/logs/gsc-daily-anomaly-2026-11-06.json, .hermes/logs/gsc-2026-11-06-weekly-meta-gate.json, .hermes/industry-keyword-matrix.json
NEXT: **今晚 20:52** weekly-meta 单批按本报告 §6 门执行（**B1b GO；B1 改稿后才可做；B5 押后到 A38 清完；逾期 sticker title 单批**）；**11-07 23:47** blog-deepfix 复测 + 貼紙 14 天第二窗；**11-08** API 面到 72h 线；**11-10** 月曆 copy 7 天效果；**11-13** 批1/1b 若上线后 7d；**12-01** monthly 自然触发。数据面：`K3 导出 11-04..11-06 四档 + detector` 已属**同因第 3 次**，按契约 §2.4 停止自动重试、转人工。
IDEMPOTENCY: `4701da413249cbb9`（run-context 给定）；新日新 target（相邻窗增量 + 20:52 进场门 + 池口径审计）⇒ 合法新工作；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，**不含本键**。
RETRY_OF: **ZP-gsc-feedback-20261105T201303**（`retry_queue[0]`，kind=RETRY_OF，reason=「锁被 ZP-daily-content 持有 (3.0 min)」，`key_consumed:false`，dsh 未调用）→ **本轮即其恢复轮**：11-05 的 BLOCKED 是 preflight 锁互斥（死进程 25932 遗留），当日**零产出**，故不是重复处理；今日 preflight `lock_acquired=ok`，内容按 11-05 NEXT 补齐（数据面状态 + 池口径 + 批门）。`retry_queue[1]` **UNRESOLVED_DAY 2026-11-02 / FAILED** → **ALREADY_DONE(since 2026-11-02 20:2x)**：该日 QUOTA 失败轮已写 `2026-11-02-ZP-gsc-feedback.md`（VERDICT OK）+ anomaly + matrix；本轮**零重写**，机器层 FAILED 按 §6.3 不改写。
COVERAGE: **NO_NEW_DATA + NEW_ANALYSIS**（A36 升 P1「同因第 3 次」；新增 A39 池规则漂移 / A40 跨意图 top-5 / A41 批1 价格冲突 / A42 当量口径 / A43 运行缺口形态；NEW-8 相邻两 API 窗继续恶化；NEW-10 转平台；NEW-13 A2/A1 多值落到 category 页）
CONFIDENCE: **HIGH（行级）** — task-J 8/8 行逐条回读 end1104 + end1105 两 CSV；关键钱词 15 行逐条回读；批门 4 URL 单次实抓（title 与正文，**读不到 meta desc**）；**LOW（趋势）** — 相邻窗 27/28 天重叠，差值只代表单日换手；xlsx 侧 140h 未刷新，任何「全站四指标」不可更新。
RUN: 定时 20:13 轮；**沙箱 pwsh 被禁（试跑一次返回 0xC0000142 后立即停手，不重试）**，仅 file/web 工具；未亲自跑 detector / API / node / python / xlsx 重解析；**零 `src/` 写入、零 title 改动、零 canonical/301、零队列状态翻转**。

> **VERDICT 释义（防误读）**：本行 `OK` = **车道执行完成**（契约 §6.1/§6.3：当日数据文件 + 当日报告 + 异常分类 + 下一验证点齐备），**不是**「KPI 已刷新」，**不是**「恢复已确认」，**不是**「xlsx 已补齐」，**不是**「weekly-meta 批已通过」，**不是**「页面已修」。今日真实运行面 = `API 停在上一天 / XLSX STALE 第 3 日 / DETECTOR 缺 3 日 / RECOVERY UNKNOWN 第 3 日 / 批1 不可执行 / sticker title 逾期第 2 日`。

---

## 0. 本轮一句话结论

**今天没有新原始数据，只有新事实：三条数据链同时停摆进入第 3 天（xlsx 140h、24h 窗 90h、detector 连缺 3 日），恢复系数连续第 3 日不可算；而 20:52 就要执行的 weekly-meta 单批，其「批 1」拟改 desc 的价格与它要挂上去的那一页正文/标题互相矛盾——按原文执行会把错价写进 SERP 摘要。**

三件新证据：

1. **批 1（poster blog desc）NO-GO as written**：拟改 desc 写 `A2 HK$16 起 / A1 HK$20 起`，但目标页 `/zh-hk/blog/poster-printing-guide/` 的 title 是「**HK$9起**」、正文写「A2 10 張起印 **HK$9** 起/張、A1 1 張起印 **HK$45** 起/張」。这两个数字在 `/zh-hk/category/posters/` 技术规格段确实是真值（A2 HK$16 / A1 HK$20），**但搬进 blog 的摘要就变成同一条 SERP 里 title 9 / desc 16 自相矛盾**，且与该页正文 45 冲突。
2. **批 1b（food blog desc）GO on truth**：拟改 desc 的 7 项数字（100 個起 / HK$2.5 起/個 / 無開版費無刀模費 / 3-5 工作天 / 1 小時內免費打稿 / 滿 HK$500 順豐免運 / DHL 2-4 天）今日在目标页正文逐项可核，**无新增未拍板数字**。
3. **逾期 sticker title 第 2 日未执行**：`/en/category/stickers/` 今日 20:1x 实抓 title 与 11-04/11-05 测量字符串**逐字一致**（仍含 `Free Proof + Free US Shipping`，仍超 58 阻断线）。

同时如实登记：**包裝盒簇转为平台期**（第三窗 -0.05 / +0.32 / 0.00，恶化停止但未恢复）；**喜帖相邻两 API 窗继续恶化**（31.92 → 33.75，+1.83）；**页1零点击池出现口径漂移**（16 行/632 展示 vs 466 行/1,530 展示是两套阈值，不可比）；**11-06 07:10 k3-review 缺跑**，`lane-status` 停在 11-04 06:43。

---

## 1. 结果总线消费（第 -1 优先级，先读再干）

| 项 | 事实 | 本轮处置 |
|---|---|---|
| `retry_queue[0]` | `RETRY_OF ZP-gsc-feedback-20261105T201303`，wrapper_exit=10，`key_consumed:false`，AUTO-FILL BLOCKED | **本轮 = 恢复轮**（锁已释放，preflight 9/9）；不重写 11-05 AUTO-FILL 文件，也不把它改写成「当时 OK」 |
| `retry_queue[1]` | `UNRESOLVED_DAY 2026-11-02 / FAILED`，dsh_exit=1 | **ALREADY_DONE**：11-02 恢复报告/anomaly/matrix 均在盘；零重跑。该项已连续 **4 轮**被重排（11-03/04/05/06），属生成器只看机器 verdict 的结构性噪音（承接 F9） |
| `previous_run.bus_record` | 11-05 gsc：BLOCKED / phase=preflight / dsh_exit=null / files=[] | 以总线为机器事实；当日无内容欠账，只有运行缺口 |
| `lane-status` 快照 | **2026-11-04 06:43**（2 天未重建），problems=2（monthly MISSING + scheduler 2147946720），bus_records=93（实为 100） | **BUS_STALE**：不把它的「PENDING」当今日盘面；今日盘面另用 `lane-runs.jsonl` + 报告文件核对 |
| 今日同侪 | daily-content 18:17 **OK**（harness，bus #100，src 零写入，files=本报告）；k3-review **07:10 无记录、无报告** | 与本轮写入 `.hermes/logs/` 无交集；k3 缺口只记录，不代跑 |
| 外部并发 | 11-05 分析师写 `gsc-2026-11-05-*` + `docs/2026-11-05-*`；11-06 仅 daily 一份报告 | 本轮**只读**；`*.2026-11-06*` 在 glob 下今日只有 daily 报告 ⇒ 无同文件撞车面 |
| 锁 | preflight 已持 `lane.lock`（pid 5308，20:13:03） | 写入仅 `.hermes/`，非 `src/`；锁语义无冲突 |
| 队列资质 | `READY` 1 项（`ca005d9b`，第 7 天，k3 owner）；`SCHEDULED` 1 项（sticker title，11-04 逾期）；`WAITING_K3` 5 项 | 不抢他车道 READY、不把 WAITING_K3 改 READY、不代改状态（契约 §7.2）；`strategy-task-queue.json` **零写入** |

---

## 2. 数据平面：三条链同时停摆（今日最重要的状态）

| 平面 | 文件/事实 | 数据日 | 20:13 时龄 | 判定 |
|---|---|---|---:|---|
| **xlsx 四档** | 仍是 11-03 批（K3 11-03 06:15 导出） | **10-31** | **≈140h** | **STALE 第 3 日** |
| xlsx 24h 窗 | 窗止 2026-11-03 02:00 | — | **≈90h** | 无新窗 |
| **API** | `gsc-query-country-28d-end1105.csv`（11-05 人工拉取） | **11-04** | **≈44h** | **FRESH**（11-08 00:00 到线） |
| **detector** | 无 `gsc-cliff-2026-11-04/05/06.json` | — | — | **available:false 第 3 日** |
| index | lastBuild 11-05，256 文件，latestFreshData 11-03 | 11-03 | — | FRESH（72h 门） |

- **时龄口径**（本轮沿用 11-03/11-04/11-05 同法，防误算）：数据日**次日 00:00** 起算。xlsx 10-31 → 11-01 00:00 → 11-06 20:13 = **140h**；API 11-04 → 11-05 00:00 → 11-06 20:13 = **44h**；24h 窗 11-03 02:00 → 11-06 20:13 = **90h**。**凡时龄结论必须写起算点**（11-05 k3 曾在此处拦下 1 处 24h 误算）。
- **今日无 `end1106` 拉取**：`GSC数据/` 最新仍是 `end1105`；因此**任务J 不能出第六测**，也不得把 `end1105` 重新包装成「今日新测」。今日增量分析是**相邻窗对比**（end1104 → end1105），不是新数据。
- **两平面不相减**（A24）：xlsx 504 clk / 22,114 imp 与 API 74 clk / 8,115 imp 是窗口、grain、截断三重不同；API 只做词级/趋势，永不参与恢复系数（A26）。
- **A36 升级**：xlsx 未补已是**同因第 3 次**（11-04/05/06）。契约 §2.4「同一原因连续失败 2 次 → 停止自动重试，等人工」⇒ 本轮**不再把「等 xlsx」写成待重试项**，改记 `dead_letter` 候选 + `request_human`，需要 K3 动作而不是车道路径。

---

## 3. 恢复链：第 3 日无读数，证据本身也已 90h 龄

| fresh 24h 点 | 展示 | 点击 | 分母（同批 28d 均值） | 恢复系数 | 备注 |
|---|---:|---:|---:|---:|---|
| 2026-10-29 | 793 | 15 | 749.2 | 105.8% | 全国家 |
| 2026-10-30 | 888 | 15 | 754.5 | 117.7% | — |
| **2026-11-03** | **977** | **23** | **789.8** | **123.7%** | **最后官方值，窗止 11-03 02:00** |
| 11-04 / 11-05 / 11-06 | — | — | — | **available:false** | 缺 detector 与四档，**连续 3 日** |

- **三条口径禁令照旧**：① `167.0% = 977 ÷ 585.2` 是单站和三站和固定基线（A17），**不得当恢复系数**；② `129.5% = 977 ÷ 754.5` 是旧动态分母（A31），只能接 105.8→117.7 那条线，**不得与 123.7% 同线**；③ 10-12..10-28 的三站和点**不得**并入全国家曲线（A24）。
- **trigger 判读**：3 点单调抬升成立，但 10-31 起连续 6 日无新读数 ⇒「连续 3 日」不成立，再评估启动信号**未触发**；本报告不写「处罚已解除 / 排名已恢复 / 下周会更好」。
- **今日无新证据**：索引覆盖率（GSC 导出无该 sheet）与人工处罚页状态均 **UNKNOWN**，不编造。
- **A26/O2 的口径建议不变（A 方案）**：恢复系数 SSoT = xlsx 24h ÷ 同批 28d 动态分母；API 只做词级/趋势。今天「三条链同时停摆」正好证明：没有 24h 导出，恢复系数结构性不可算，换任何 API 分母都只是编数。

---

## 4. 任务J 8 锁词：第四测 → 第五测（相邻窗，同法）

第五测由 11-05 分析师在 `end1105` 上算出（`gsc-2026-11-05-analyst-anomaly.json`），本车道**逐行回读两 CSV 复核 8/8**，不声称新测。

| 锁词 | 四测 end1104 | **五测 end1105** | Δpos | 判读 |
|---|---|---|---|---|
| 包裝盒印刷 | 50 / 0 / 33.38 | **49 / 0 / 33.33** | -0.05 | 平台 |
| 包裝盒訂製 | 50 / 0 / 34.98 | **47 / 0 / 35.30** | +0.32 | 平台（略退） |
| 紙盒印刷 | 47 / 0 / 37.32 | **47 / 0 / 37.32** | 0.00 | 逐位相同 |
| 貼紙印刷 | 119 / 0 / 37.56 | **114 / 0 / 38.09** | +0.53 | 回吐，仍 38 深位 |
| 宣傳單張 | 120 / 0 / 34.36 | **118 / 0 / 34.44** | +0.08 | 平 |
| 即日印刷 | 54 / 1 / 7.48 | **53 / 1 / 7.40** | -0.08 | 唯一有点击锁词，微进 |
| 書刊印刷 | 115 / 0 / 32.78 | **110 / 0 / 32.88** | +0.10 | 平 |
| 騎馬釘 | 67 / 0 / 19.46 | **65 / 0 / 19.54** | +0.08 | 平 |

- **包裝盒簇：从「连续两窗同向微退」转「平台期」**。三窗累计仍为退（end1103→end1105：+0.10 / +1.32 / +1.39），但**最近一窗已停**（最大 +0.32）。因此 NEW-10 改判 `FLATTENED`，**不写「改善」也不写「继续恶化」**——证据只支持「恶化停止」。
- **貼紙**：end1103 37.85 → end1104 37.56 → end1105 38.09，两窗净 +0.24，仍在 38 位、0 点击 ⇒ O8 **HOLD 维持**（距 ≤25 目标 13 位），11-07 第二窗复测。
- **即日印刷**：7.79 → 7.48 → 7.40，两窗 -0.39，且是 8 锁词里唯一有点击的（1 clk）⇒ 唯一可称「方向正向」的锁词，但仍只是页1 中部。
- **数据完整性自查**：4 行与上一窗**逐位相同**（紙盒 47@37.32、a1海報 hkg 3@3.33 + twn 27@1.00、教材 46@30.87、海報size 27@9.19）。解释：低量词在「换入日/换出日都为 0 展示」时聚合不变；同批相邻行（食品印刷 64→62、small batch 29→26、月曆 121→118、喜帖 13→12）均有变化 ⇒ **不判 CSV 复读/缓存**。这条自查必须写，否则极易被误读为「数据没更新」。

---

## 5. 钱词与页1：位置在动，点击不动（关键行）

| 词 | 国家 | 展示 | 点击 | pos（本轮） | 上档 | Δ | 判读 |
|---|---|---:|---:|---:|---:|---:|---|
| 食品包裝印刷 | hkg | 112 | 0 | **8.39** | 8.41 | -0.02 | 页1 最大单点 CTR 洞（连续 2 窗） |
| 食品印刷 | hkg | 62 | 0 | 7.48 | 7.64 | -0.16 | 同族，仍 0 点击 |
| 燙金利是封 | jpn | 29 | 0 | **1.00** | 1.00 | 0.00 | **连续 3 窗日本第 1 名 / 0 点击** |
| 大信封 | hkg | 35 | 0 | **4.20** | 4.03 | +0.17 | top-5 零点击第 3 个月（9/2 起） |
| a1海報 | twn | 27 | 0 | **1.00** | 1.00 | 0.00 | 台湾第 1 名 / 0 点击 |
| 海報尺寸 | hkg | 19 | 0 | **4.53** | 4.85 | -0.32 | top-5 零点击 |
| 海報印刷 | hkg | 245 | 1 | 14.80 | 14.76 | +0.04 | 簇头唯一点击（CTR 0.41%） |
| 小冊子印刷 | hkg | 34 | 0 | 10.50 | 10.51 | -0.01 | 页1 底缘；实体 ranker = saddle-stitch blog |
| 月曆印刷 | hkg | 118 | 0 | 24.81 | 24.61 | +0.20 | 平台；copy 修复窗 11-10 |
| **喜帖印刷** | hkg | 12 | 0 | **33.75** | 31.92 | **+1.83** | **相邻两 API 窗继续恶化**（31.92→33.75） |
| 教材 印刷製本 | jpn | 46 | 0 | **30.87** | 30.87 | 0.00 | 两窗逐位相同 ⇒ 恶化停止，平台 |
| 貼紙印刷 | hkg | 114 | 0 | **38.09** | 37.56 | +0.53 | 深位 0 点击 |
| doujinshi printing | usa | 34 | 0 | 10.91 | 10.86 | +0.05 | 页1 边缘，12 国长尾 |
| small batch sticker printing | usa | 26 | 0 | 6.00 | 5.83 | +0.17 | 页1 零点击，MOQ 钩子假设待 11-07 |
| china catalog printing | usa | 55 | 0 | 14.60 | — | — | 页2 顶 |

- **不混平面、不硬凑序列**：喜帖的「16.13 / 29.40」是 xlsx 10-31 档与 11-03 anomaly 记录的更早窗口，**都不与今天这两个相邻 API 窗连成同序列**；本报告只连 `31.92 → 33.75`，并把「更早窗 API 28.00」只作方向对照。
- **不重算 23 词全表**：今日无新 28d xlsx；上表是「关键 15 行 + 8 锁词」的相邻窗复核，其余词沿用 11-04 报告值并标注「携带」。
- **零点击 ≠ 摘要有问题**：SERP feature / 图片包 / AI Overview / 本地包 / 纯导航都能吞点击。本表只进候选池，**本轮不改任何 title/description**。

---

## 6. 20:52 weekly-meta 单批：进场门（本轮核心交付）

机器可读版：`.hermes/logs/gsc-2026-11-06-weekly-meta-gate.json`。方法边界先说清楚：**web_fetch 给的是渲染文本，含 `<title>` 与正文，但不含 `meta description`** ⇒ 本门只能核 title 字符串与正文真值；**desc 的 before 值必须由执行车道自查**（和执行清单 C-1 一致）。

| 批 | 目标 | 今日实抓 | 门 | 依据 |
|---|---|---|---|---|
| **B1** | `/zh-hk/blog/poster-printing-guide/` desc | title「**香港海報印刷 HK$9起**…」；正文「A2 10 張起印 **HK$9** 起/張、A1 1 張起印 **HK$45** 起/張」 | **NO-GO as written** | 拟改 desc 写 `A2 HK$16 / A1 HK$20`：数字在 category 页为真，**但与本页 title 9、正文 45 冲突** |
| **B1b** | `/zh-hk/blog/food-packaging-printing-guide/` desc | 100 個起 / HK$2.5 起/個 / 無開版費無刀模費 / 3-5 工作天 / 1 小時內免費打稿 / 滿 HK$500 順豐免運 / DHL 2-4 天 / 6 大食品類型表 —— **逐项在正文可核** | **GO on truth** | 拟改 desc 无新增未拍板数字；正文已写「合規以訂單確認」 |
| B2 | `/zh-hk/category/packaging/` desc | 今日未抓 | **UNVERIFIED** | 不得用 food blog 真值替代 category 真值 |
| B3 | `/ja/blog/textbook-printing-guide/` desc | 今日未抓 | **UNVERIFIED** | j1 诊断记录的 JPY 价格冲突仍在（D3） |
| B4 | `/en/blog/catalog-printing-china-supplier-guide/` | 今日未抓 | **UNVERIFIED** | title 58 = 阻断线，必须与 desc 分两批 |
| B5 | `/ja/product/foil-red-packets/` desc | 今日未重抓；11-04/11-05 两次独立抓取均见正文中文残留 | **HOLD_A38** | 先清正文语言，或 K3 明确允许先 desc |
| **逾期** | `/en/category/stickers/` title | `Small Batch Sticker & Label Printing from $0.05 \| 10 MOQ + Free Proof + Free US Shipping \| ZprintPro`（与 11-04/11-05 测量**逐字一致**） | **OVERDUE 第 2 日** | 队列 `scheduled_for 2026-11-04`，仍未执行 |
| — | `/ja/category/stickers/`、`/en/category/books/` | 今日未抓 | **UNVERIFIED** | 83 / 75 为 11-04 携带值 |

### 6.1 为什么 B1 必须拦（这是今天最值钱的一条）

- 拟改 desc 原文：「香港海報印刷 A2 10 張起、**HK$16 起/張**；A1 1 張起、**HK$20 起/張**。尺寸 A3-A0…」
- 目标页 title：「香港海報印刷 **HK$9起**：尺寸・紙質・工藝・設計要點 | 智印港」
- 目标页正文：「A2 10 張起印 **HK$9** 起/張、A1 1 張起印 **HK$45** 起/張」

⇒ 若逐字上线，用户看到的 SERP 摘要会是「title 9 / desc 16」，点进去正文又是「9 / 45」。**这不是排版问题，是把价格矛盾写进摘要**，且违反 §0.23「数字只能来自真值源」——同一页的 title / desc / 正文必须至少自洽。

- **可执行的三个选项（带推荐）**：
  - **A（推荐）desc 去价格**：只留尺寸/材质/交期（A3-A0、157-250g、3-5 工作天、免費打稿、滿 HK$500 免運），零价格风险，今天就能上；
  - **B** 用本页正文数字 `HK$9 / HK$45`：与本页一致，但与 category 参考价（16 / 20）仍冲突，只是把矛盾留在站内别处；
  - **C** 押到 K3 价格真值裁决（`FIX-20261031-FIVE-CATEGORY-TRUTH`）后 11-13 再做。
- **业务影响**：B1 覆盖池内 3 行（`poster 印刷` / `海報尺寸` / `海報size`），11-05 页级归因已证明三行共同的页 1 ranker 就是这篇 poster blog，是食品包裝簇之外最大的聚簇；押后 7 天代价可接受，写错价的代价不可逆（会被收录/被抓取）。

### 6.2 海报价的第三个证据点（NEW-13）

今日在 `/zh-hk/category/posters/` 实抓到的价格，与首页/商品页/博客都不完全一致：

| 位置 | A2 | A1 |
|---|---|---|
| `/zh-hk/blog/poster-printing-guide/` 正文 | HK$9 起/張（10 張起） | HK$45 起/張（1 張起） |
| `/zh-hk/category/posters/` 技术规格段 | **HK$16 起/張** | **HK$20 起/張** |
| `/zh-hk/category/posters/` 商品卡 | **HK$2.20/張起**（整批 HK$160 / 10 張 = HK$16/張） | **HK$29.00-45.00/張起** |
| A2 PDP 卡片标题 | HK$16/張 | — |

⇒ A2 至少 **3 个值**（9 / 16 / 2.20），A1 至少 **3 个值**（20 / 29-45 / 45）。这与首页 A2「三价」（11-05 k3 已记）同源，但**今天是第一次落到 category 页本身**。属 `FIX-20261031-FIVE-CATEGORY-TRUTH`（WAITING_K3）的证据增量，**本车道不裁决哪个是真值**。

### 6.3 sticker title 的当量口径差（A42）

同一字符串：队列记 **100** 当量，11-05 车道测 **104**。今日只验证「字符串逐字未变」，**不重算当量**（沙箱无 node，跑不了 `title-equiv.js`）。两值都 > 58 阻断线 ⇒ 合规结论不变；但**同一字符串两个数**说明当量口径需统一（建议以 `scripts/guards/title-equiv.js` 为唯一口径，队列里的手记值标注来源）。

---

## 7. 页1零点击池：口径漂移必须先修（A39）

| 版本 | 规则 | 结果 |
|---|---|---|
| 11-04 报告 | `clicks=0 AND imp>=20 AND pos<11` | **16 行 / 632 展示** |
| 11-05 分析师 JSON | `clicks=0 AND pos<=10`（**无 imp 门槛**） | **466 行 / 1,530 展示** |

- **不可比**：两者不是同一指标。**不得写「池从 16 行扩到 466 行」**——那会凭空造出 29 倍增长。
- 11-05 JSON 只公布 20 个具名行（`imp` 从 16 到 112），其余 446 行无明细 ⇒ **16 行口径今日不可重算**（无脚本、无明细）。本轮如实标 `RULE_DRIFT / NOT_RECOMPUTED`。
- **最高名次的零点击行（今日可见 6 行，来自 11-05 JSON 具名行）**：

| 词 | 国家 | 展示 | pos_w | 备注 |
|---|---|---:|---:|---|
| 燙金利是封 | hkg + jpn | 31 | **1.00** | 季节窗，日本第 1 名 |
| a1海報 | hkg + twn | 30 | **1.23** | 台湾第 1 名 |
| **alipay flash collect** | jpn/kor/mng/mys/nld/sgp/tha/usa | 21 | **3.24** | **新面孔 · 支付 how-to 跨意图** |
| **large envelope** | cze/hrv/kor/lva/qat/rou/tur/vnm | 17 | **3.70** | **新面孔 · 8 个非目标市场** |
| 大信封 | arg/can/hkg/mys/pak/usa | 40 | **4.17** | 长期 top-5 零点击 |
| 海報尺寸 | hkg | 19 | **4.53** | 尺寸意图 |

- **口径自查（聚合 ≠ 逐行）**：`大信封` 具名行逐行相加 = **41** imp（hkg 35 + 5 国 6），11-05 JSON 聚合写 **40**；其 `pos_w 4.17` 也无法由这些行的 imp 加权复算（hkg 单行即 4.20）。差 1 imp 不影响结论，但**聚合字段不可当逐行事实引用**——本报告的点名行一律回读 CSV（hkg 35@4.20 为直接读数）。
- **A40（新观察）**：`alipay flash collect` 与 `large envelope` 都是**在非目标市场**拿到 top-5 且 0 点击。前者是支付方式 how-to（与印刷钱词无关），后者是英文单数变体在 8 个非英语/非目标国。两种解释都需要 page 级 join 才能定：① 全球兜底排名（我们没在这些市场做本地化，摘要不匹配）；② 承接页错配。**交 monthly 判读，本车道不动页、不建页。**
- **纪律**：零点击池只进候选池；准入仍是「真实 SERP feature + before snippet + 单变量 + 复测日」，**本轮零 title/desc 改动**。

---

## 8. 异常清单状态迁移（A / NEW / O）

**今日升级 / 新开**

| ID | 级别 | 状态 | 要点 |
|---|---|---|---|
| A36 XLSX_NOT_REFRESHED | **P1** | **DEAD_LETTER_CANDIDATE** | 同因第 3 次（11-04/05/06）；契约 §2.4 停止自动重试，转 K3 动作 |
| A1 DATA_STALE | P1 | **DUAL_PLANE_DAY3** | API 44h FRESH（停在上一天）/ xlsx 140h STALE / detector 缺 3 日 |
| A2 FROZEN_24H | P2 | **OPEN_DAY3** | 24h 窗 90h 龄；恢复证据本身也过期 |
| A39 POOL_RULE_DRIFT | **P2** | **NEW** | 16/632 与 466/1,530 是两套阈值，不可比；16 行口径今日不可重算 |
| A40 CROSS_INTENT_TOPN | P3 | **NEW** | `alipay flash collect` / `large envelope` 非目标市场 top-5 零点击 |
| A41 BATCH_PRICE_CONFLICT | **P1** | **NEW** | B1 拟改 desc 价格与目标页 title/正文冲突 |
| A42 TITLE_EQ_CALIBER | P3 | **NEW** | 同一字符串 100 vs 104；均 >58，结论不变 |
| A43 RUN_GAP_PATTERN | P2 | **NEW** | 11-04 daily 21:17 / 11-05 watchdog 06:43 / 11-06 k3 07:10 三处缺跑；lane-status 停在 11-04 06:43 |
| NEW-13 POSTER_PRICE_MULTI | **P1** | **NEW** | A2 ≥3 值、A1 ≥3 值，已落到 category 页 |

**既有观察更新（不升级为动作）**

| ID | 11-05 状态 | 11-06 | 依据 |
|---|---|---|---|
| NEW-6 页1零点击 | OPEN（466/1,530） | **RULE_DRIFT** | A39；数字不可比 |
| NEW-8 喜帖 | CONFIRMED | **相邻两 API 窗恶化** | 31.92 → 33.75（更早窗 API 28.00 仅作参照，不连成序列） |
| NEW-10 包裝盒簇 | 两窗同向微退 | **FLATTENED** | -0.05 / +0.32 / 0.00 |
| NEW-11 食品包裝 | 114@8.53 | **112@8.39（第 2 窗）** | 仍页1 0 点击 |
| NEW-3 教材 | 29.98 | **30.87（两窗同值）** | 恶化停止，平台 |
| NEW-1 貼紙 | HOLD | **HOLD（38.09）** | 两窗净 +0.24 |
| NEW-4 海报 blog 抢头 | 证据齐 | 不变（B1 归因对准） | 11-05 页级归因 |
| A35 locale/country | UNCHANGED | UNCHANGED | 燙金 jpn / a1海報 twn 均 pos 1 |
| A38 ja 正文中文 | OPEN | OPEN（今日未重抓） | 11-05 两次抓取为证 |
| A28 monthly | MISSING 第 5 天 | **第 6 天** | next 12-01；2147946720 未变 |

---

## 9. 任务队列（O 系列，只记录不改状态）

| ID | 本轮记录 | 依据 |
|---|---|---|
| O1 API 拉取制度化 | **MANUAL_PULL_ONLY** | 今日无拉取；end1105 为 11-05 人工 |
| O2 恢复 SSoT | **WAITING_K3** | 第 3 日缺料，A 方案证据更强；不代 K3 定口径 |
| O3 任务J 三测 | **FIFTH_TEST_INHERITED / NO_SIXTH_TODAY** | 无 end1106 |
| O4 CTR 池 | **SCHEDULED_TODAY_2052（门已给）** | B1 NO-GO / B1b GO / 其余 UNVERIFIED |
| O5 canonical 候选 | **DELIVERED_CANDIDATES** | 11-03 具名清单有效 |
| O6 海报 | **DECISION_DUE_TODAY** | 证据齐；决策属 weekly-meta/monthly |
| O7 月曆 | **SCHEDULED_TODAY_2052** | 118@24.81；copy 窗 11-10 |
| O8 貼紙 14 天 | **HOLD** | 38.09；11-07 复测 |
| O9 ja 教材 | **OPEN** | 30.87 平台；monthly 仍缺 |
| O10 喜帖 | **INTENT_MISMATCH_OPEN** | 33.75（相邻两 API 窗恶化）；承接页 = thank-you-cards |
| O11 利是封 | **SCHEDULED_TODAY_2052** | 54/1clk + 燙金 jpn 1.00 |
| O12 GEO S1 | **DONE_BY_PEER_PARTIAL** | S2 11-20..24 |

**新增候选任务（PROPOSE_ONLY，本轮不自批、不派工）**

| ID | 路由 | 目标 | owner | 准入 |
|---|---|---|---|---|
| GSC-20261106-C1 | FIX | B1 desc 去价格 / 改口径 | weekly-meta + K3（价格真值） | A41；禁逐字执行 |
| GSC-20261106-C2 | FIX | 逾期 sticker title（en 100/104、ja 83） | weekly-meta | title-v5 + 单批 |
| GSC-20261106-C3 | FIX | 11-04..11-06 四档 + detector + `--end 2026-11-05` | K3-admin | 同因第 3 次 ⇒ 等人工 |
| GSC-20261106-C4 | MEASURE | A2/A1 海报价 3 值归并 | K3 | 价格真值不可由执行层自决 |
| GSC-20261106-C5 | MEASURE | 池指标口径写死（16/632 规则为 SSoT） | monthly / 分析师 | A39；不改今日结论 |

---

## 10. 跨车道对账与写盘隔离

| 车道/会话 | 今日实况 | 与本轮关系 |
|---|---|---|
| ZP-daily-content | 18:17 harness **OK**（bus #100），年賀状破零扩大（7 国 11 imp，JP 首破）+ A38 三源决策包，**src 零写入** | 只读消费；**零改写**；其 A38 结论与本轮 §6 B5 HOLD 一致 |
| ZP-k3-review | **07:10 无记录、无报告** | 运行缺口，记 A43；不代跑 |
| ZP-weekly-meta | 20:52 待跑 | 本轮交付`gate.json` 即为其输入；不改其队列 |
| ZP-blog-deepfix | 非调度日（11-07 23:47） | 不预跑 |
| ZP-monthly-matrix | 11-01 MISSING 第 6 天 | 只记录 |
| 11-05 分析师 | API 拉取、taskj 五测、池 snippet、O6 归因 | **只读**；未重拉、未重算、未改写其 JSON/docs |
| 11-02/03/04 本车道产物 | 均在盘 | **ALREADY_DONE，零重写** |

**写盘隔离**：本轮只写 4 个路径 —— 本报告、`gsc-daily-anomaly-2026-11-06.json`、`gsc-2026-11-06-weekly-meta-gate.json`、`industry-keyword-matrix.json` 新 block。未触碰 `src/`、`GSC数据/`、`docs/`、`strategy-task-queue.json`、`lane-status.json`、`lane-runs.jsonl`、`gsc-cliff-*` 或任何同侪产物。

---

## 11. K3 升级（need_human，一次性清桌）

1. **xlsx 四档 + detector（A36，第 3 日 → dead_letter 候选）** — 请从 GSC 后台导出 **11-04 / 11-05 / 11-06** 的 24h / 7d / 28d / 3mo（全国家、网页搜索）落 `GSC数据/`；并跑：
   ```
   cd F:\zprintpro-nextjs
   python scripts/gsc-cliff-detector.py
   ```
   没有它，KPI 四指标与恢复系数**明天仍是 UNKNOWN**；本车道按 §2.4 不再自动重试同一动作。
2. **月度复盘（A28，第 6 天）** — `LastTaskResult=2147946720`，11-01 月复盘 MISSING，下次自然触发 12-01。可粘贴：
   ```
   schtasks /change /tn ZP-monthly-matrix /st 12:13
   ```
   若仍 0x800710E0：按 `scripts/register-cron-tasks.ps1` 删除重建（需管理员）。
3. **API 拉取（O1）** — 若沙箱继续禁 shell，请 K3-admin 跑：
   ```
   cd F:\zprintpro-nextjs
   python scripts/fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-05
   ```
   产出后本车道下一轮即可出**第六测**（`end1106`，窗 10-09..11-05）。
4. **海报价真值（A41/NEW-13，P1）** — A2 出现 9 / 16 / 2.20 三值，A1 出现 20 / 29-45 / 45 三值。请一句话裁决**唯一真值**（或授权「desc 一律去价格」）；在裁决前 B1 只能走「去价格」版本，否则 20:52 的批会把矛盾写进摘要。
5. **sticker title 逾期（F3，第 2 日）** — 队列 `FIX-20261104-STICKER-CATEGORY-TITLE-EQ` 仍 SCHEDULED 11-04，线上 title 逐字未变。建议今晚单批执行，或明确改期。
6. **运行缺口（A43）** — 11-04 daily 21:17 / 11-05 watchdog 06:43 / 11-06 k3 07:10 三处缺跑，`lane-status` 停在 11-04 06:43。请查主机夜间可用性与调度器 `LastRunTime`；在查清前，任何「全车道已健康」的结论都不成立。
7. **O2 恢复口径（carry）** — 维持推荐 A（xlsx 24h ÷ 同批 28d 动态分母；API 只做词级/趋势）。
8. **A38 ja 正文中文（carry）** — 内容车道 owner；本车道只交证据，且因此把 B5 押后。

---

## 12. spam 恢复周报（周中快照，2026-11-06）

- **恢复曲线（全国家，唯一可比）**：105.8%（10-29）→ 117.7%（10-30）→ **123.7%（11-03）**；今日无新点，曲线停在 11-03（证据龄 90h）。
- **同批梯度（11-03 读数）**：24h 977 > 7d 日均 893.6 > 28d 日均 789.8；点击 23 > 18.86 > 18.0。单日高于两均值，方向正向，但**单日不构成趋势**。
- **索引覆盖率变化**：`index.json` 256 文件 / latestFreshData 11-03 / FRESH；GSC 四档不含「索引覆盖率」sheet ⇒ **本轮无法给覆盖率变化，标 UNKNOWN**（不编造）。
- **人工处罚页状态**：无新证据 ⇒ **UNKNOWN**。
- **下次 Google 更新窗口**：无官方时间表 ⇒ **不做日期预测**；只看 24h/7d 序列 + 展示结构 + 索引覆盖。
- **口径警告**：本曲线不得与 10-12..10-28 三站和点连线；首值必须取当日 detector 动态字段，缺则 `available:false`（本报告即此口径）。

---

## 13. 下一验证点

| 日期 | 验证 | 通过标准 |
|---|---|---|
| **2026-11-06 20:52** | weekly-meta 单批（B1b；B1 改稿后；sticker title 单批） | 单变量；title-v5 PASS；有 7d 复测日；B1 若走原文即判违规 |
| **2026-11-07 23:47** | blog-deepfix 复测 + 貼紙 14 天第二窗 | 同词同页同窗；写 before→after；单窗不判 SCALE |
| **2026-11-08 00:00** | API 面到 72h 线 | 有 `end1107`（数据日 ≥11-06）则继续 FRESH；否则第三链也 STALE |
| **2026-11-10** | 月曆 copy（c0552853）7 天效果 | 目标页 imp ≥ 基线 80% 且带钱词 ≥1 clk |
| **2026-11-13** | B1/B1b 若上线后 7d CTR；FIVE-CATEGORY-TRUTH 若裁决则同批复测 | 同词同页同窗；基线 245/1 与 112/0 |
| **2026-11-20~24** | GEO S2（补 citation URL） | engine / date / answer / citation URL 四要素齐 |
| **2026-12-01** | monthly 自然触发 | run 记录 + 月复盘报告；否则 D1 后仍失败即 dead_letter |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 实读前序实现路径：11-05 分析师 anomaly JSON（taskj 五测 / 池 466 行）、`api-pull-end1105.json`（拉取回执与相邻窗）、`docs/2026-11-05-pool-snippet-evidence-sweep.md`（池行→页级归因）、`docs/2026-11-04-weekly-meta-execution-sheet-1106.md`（逐字稿 + E/F 增补）、11-04 本车道 anomaly（A/NEW/O 结构）。未凭推断认定冲突；池口径差异是**实读两处规则后**才判 A39。
- [x] **2. 约束适用范围？** 查 K3 拍板原文：契约 §6.1「gsc 只给任务不改页」、§7.2「不自行批准/不翻队列状态」、§7.4「无 online_verify 不进学习候选」、AGENTS §0.23（数字只来自真值）、§0.23.1（GSC 黑话只进内部）、§0.37（不接 GA4/008/订单）、§0.25（push 由 host）、§0.0（名片只接单不建页）。本轮零 `src/`、零 title、零 canonical/301、零队列翻转。
- [x] **3. 原数据/拍板来源？** ① 来源：`end1105` / `end1104` CSV（11-05 人工拉取 + 11-04 拉取）、11-05 分析师 JSON、`gsc-cliff-2026-11-03.json`、11-06 四 URL 实抓；② 真数据：8 锁词 + 关键 15 行逐条回读 CSV（含 4 行逐位相同的数据完整性自查）；批门数字逐项对照页面正文；③ 留/撤：**零撤回**，只做状态推进（A36 升 P1、NEW-10 转平台、NEW-8 相邻两 API 窗确认）。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入（零 src）。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告，非 user-facing 渲染层；未引入需 `parseInlineLinks` 的链接语法（URL 以代码/表格文本呈现）。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-06 20:13:03, preflight 9/9 ok, lock pid 5308, retry_queue 2) · lane-status.json (2026-11-04 06:43, BUS_STALE) · lane-runs.jsonl (100 条)
- GSC (API): GSC数据/gsc-query-country-28d-end1105.csv (1,507 行 / 74 clk / 8,115 imp / 窗 2026-10-08..11-04 / 数据日 11-04) — 只读
- GSC (API 相邻): GSC数据/gsc-query-country-28d-end1104.csv (8,433 imp / 78 clk / 窗 2026-10-07..11-03) — 只读, 仅用于相邻窗 Δ
- GSC (xlsx): GSC数据/{24小时,7天,28天,3个月}…2026-11-03*.xlsx (K3 11-03 06:15 导出, 数据日 10-31, ≈140h → STALE; 24h 窗止 11-03 02:00, ≈90h)
- 恢复: .hermes/logs/gsc-cliff-2026-11-03.json (last official 123.7% = 977 / 789.8, full-country); 今日无 11-04/05/06 detector
- 同侪: gsc-2026-11-05-analyst-anomaly.json (taskj 五测 + 466 行池/1,530 imp) · gsc-2026-11-05-api-pull-end1105.json · docs/2026-11-05-pool-snippet-evidence-sweep.md · docs/2026-11-04-weekly-meta-execution-sheet-1106.md · 2026-11-06-ZP-daily-content.md · 2026-11-05-ZP-k3-review.md
- 队列/索引: strategy-task-queue.json (READY ca005d9b / SCHEDULED sticker title 11-04 / WAITING_K3 5) · GSC数据/index.json (lastBuild 11-05, 256 文件)
- 线上实抓 (本车道 2026-11-06 20:0x-20:1x, 每 URL 单次): /zh-hk/blog/poster-printing-guide/ 200 · /zh-hk/category/posters/ 200 · /zh-hk/blog/food-packaging-printing-guide/ 200 · /en/category/stickers/ 200
- 校准状态: 🟢 行级已校准 (8 锁词 + 关键 15 行逐行回读两 CSV; 4 行逐位相同已解释) · 🟢 批门数字逐项对照正文 · 🟡 当量未重算 (沙箱无 node; 100 vs 104 口径差已标注) · 🟡 desc before 值不可读 (web_fetch 无 meta) · 🟡 池 16 行口径不可重算 (无明细/无脚本)
- 撤回声明: 无。11-03 的 123.7% 在其窗口内继续有效; 本报告不新增也不撤回任何恢复读数; 11-05 的 466/1,530 不是撤回, 是**不同阈值**, 已在 A39 标为不可比
- 口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 GSC 后台黑话进入客户可见内容 (门童 #16, 本文件仅内部)
```

---

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | detector / API 拉取 / node / python / xlsx 重解析 / title-equiv | 沙箱 pwsh 禁用（试一次 0xC0000142 后停手，不重试）；不虚报任何机器门禁 PASS |
| 2 | KPI 四指标 | 无 11-04..11-06 导出，全部为 11-03 批携带值（140h / 90h）；不称「今日 fresh」，不外推 |
| 3 | 恢复系数 | 无当日 detector ⇒ `available:false` 第 3 日；123.7% 是 11-03 值 |
| 4 | 池 16 行 / 632 | 今日不可重算（11-05 JSON 只公布 20 具名行）；只登记口径漂移，不造数 |
| 5 | desc before 值 | web_fetch 返回渲染文本，不含 meta description；只能核 title 与正文。B1b 的「desc 现为英文 125」仍是 11-05 记录，执行车道必须自查 |
| 6 | 标题当量 | 未重算；队列 100 / 11-05 车道 104 的差异属口径，不是页面变化；两者均 >58 |
| 7 | 跨市场行 | `燙金利是封 jpn` / `a1海報 twn` 仍是 query×country 行，无 query×page join；承接页为推断 |
| 8 | 线上确定性 | 每 URL 单次抓取；CDN/缓存可能造成快照差异，未做 3-6 次重复（避免限流） |
| 9 | SERP / snippet | 本机广东出口判 INVALID；SERP feature 半边仍缺，5 条 FIX 维持 PROPOSE_ONLY |
| 10 | 今日四方证据 ①② | `lane-runs.jsonl` 记录与 wrapper 日志由 host 在本 lane 退出后写入；本报告只声称 ③「当日报告存在」+ ④「20:13 触发 + preflight 持锁」 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7 + 恢复模式块 + 2026-11-03 证据分流块 + sop-10-gate）· 2026-11-06 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
