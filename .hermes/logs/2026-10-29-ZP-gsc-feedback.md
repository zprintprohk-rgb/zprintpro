# 2026-10-29 · ZP-gsc-feedback 车道报告（手动立即执行轮 · 数据到位·恢复确认轮 + 20:13 计划轮幂等复核 / retry 三日收口）

VERDICT: OK
RECOVERY: **109.9%**（全国家口径；双方法：方法1 3mo 档断崖前 714.71/日 vs 最新 7d 785.43/日 = 109.9%；方法2 28d 档子窗 732.50 = 107.2%；差 2.7pp 归因断崖前窗口定义，采用方法1；**与 10/28 三站口径 108.3% 不可直接比较**，方向一致均 >100%）
RECOVERY_SOURCE: `gsc-cliff-2026-10-29.json` = WARN_STALE ×3（输入仍是 10-15 单站 28d 档，止 10-12，17 天）且 ratio 135.5% 用的是固定 585.2 分母 → **不作恢复系数**；本报告 109.9% 为车道用同批 3mo/7d 复算（见 §11.5）
CONSUMED: 4 个新档（K3 2026-10-29 01:16-01:23 导出，全国家口径）| run-context-ZP-gsc-feedback.json（10-28 20:13 版）| lane-status.json | lane-results-bus-contract.md §7.2 | k3-kpi-panel-2026-10-26.md | 2026-10-27-week2-p1-execution-launch-pack.md（23 带钱词 SSoT）；§11 追加：run-context @ 2026-10-29 20:13:02 | lane-status @ 2026-10-29T11:43:10Z | lane-runs.jsonl L41/45/47/49 | gsc-deep-analysis-2026-10-26.json | GSC数据/index.json + C6 重建报告
DELIVERED: .hermes/logs/2026-10-29-ZP-gsc-feedback.md（本报告，完整分析版 + §11 20:13 轮追加）| .hermes/logs/gsc-daily-anomaly-2026-10-29.json | .hermes/industry-keyword-matrix.json 回灌（gsc_feedback_2026_10_29 block + priority_boost +2 词）| docs/2026-10-29-gsc-calibration-report.md | .hermes/logs/gsc-retry-closure-2026-10-29.json（§11 新增：retry_queue 三日收口 + 仪表对账 + CTR 意图分层）
NEXT: 10-30 验 C8（detector 是否消费 10-29 三站点汇总批，不再 WARN_STALE/135.5%）；11-01 月复盘（教科書 churn 47.1 诊断）；11-03 C4 面板 join + 门童 #9 复跑；11-04 年賀状/貼紙 14 天位次；11-06 海報印刷结构裁决 + weekly-meta 消费 18 商业意图 CTR 词
IDEMPOTENCY: 键 = sha256("ZP-gsc-feedback|run|lane-default|2026-10-29")[:16] = **0453ab66a64d9edd**；lane-runs.jsonl 已有 harness 记录（01:21），20:13 计划轮**已命中同键并跳过重分析**（只做 retry 收口，见 §11）
COVERAGE: FULL_ANALYSIS / RECOVERY_CONFIRMED / 数据缺口已闭合（A1/A2 解除；A16 车道层解除、detector 层转 A17；A15 于 03:46 重建解除，见 §11.5）
CONFIDENCE: MEDIUM（新档 3 天龄 28d；单批无 prev 对比文件 → 位置差为跨批方向性参考）
RUN: 手动触发（K3 "立即执行" 01:12 + 新档到位 01:16-01:23；bundled Python 解析 4 xlsx；线上探针 3/3 HTTP 200 于 01:14）
RUN_2: 2026-10-29 20:13 计划轮（preflight ok / 锁已持 / key 0453ab66a64d9edd 与 01:21 轮相同 → 分析 ALREADY_DONE；本轮算力全部投入 retry_queue 三日收口 + 仪表对账，未重跑分析、未改矩阵）
RETRY_OF: (1) 2026-10-24 `ZP-gsc-feedback-20261024T201343`（wrapper 0 / dsh null / report 误指 `.hermes/logs/2026-10-23-ZP-k3-review.md`）→ 诊断为 REPORT_MISATTRIBUTION，10-24 当日值已从 28d 日序列恢复（594 imp / 10 clk / 1.68%）；(2) 2026-10-26（无总线记录 + 20:13:04 自动兜底占位报告，但 `gsc-deep-analysis-2026-10-26.json` 产物在盘）→ 诊断为 REPORT_ABSENT_AUTOFILL，实质已被 10-28 §3 消费，本轮补交从未进过报告的 CTR 意图分层；(3) 2026-10-27 `ZP-gsc-feedback-20261027T201311`（report=NONE + 自动兜底占位）→ 诊断为 REPORT_ABSENT_AUTOFILL 且**当日指标在盘上不可重建**，不估算、不补史。三日历史 verdict 一律保留 FAILED（契约 §6.3）

---

## 0. 本轮一句话结论

**K3 已按导出清单补 4 个新档（24h/7d/28d/3mo 三站点汇总）→ 数据缺口闭合，本轮为恢复确认轮：全站恢复系数 109.9%（全国家口径），28d 点击 497 / 展示 20,977 / CTR 2.37% / 平均排名 13.52，最佳单日 10-26（31 点击 / 947 展示 / CTR 3.27%）。** 带钱词 23 词首页命中维持 6/23；新恶化 3 词（貼紙印刷 40.49 / 教科書印刷 47.1 / a2 poster 18.0）；新改善 3 词（china catalog printing 15.92 / 教材 印刷製本 17.31 / コミケ 印刷 18.85 锚达标）；盲开词仍全 0（nengajo 页已有展示）。矩阵已回灌（priority_boost：食品包裝 +1 / china catalog +1，其余观察）；A15（index.json 假 FRESH）在 01:21 成文时为「持续 19 天未修」——**§11.5 复核已解除**（03:46 重建：lastBuild 2026-10-29 / latestFreshData 2026-10-29 / FRESH）；遗留 **A17**：cliff detector 仍只吃单站 28d 档，WARN_STALE 17 天。

---

## 1. 数据口径（今日实测，4 新档全国家口径）

| 档 | 窗口 | 点击 | 展示 | CTR | 平均排名 | 数据龄 |
|---|---|---|---:|---:|---:|---:|---|
| 28d | 09-29..10-26 | 497 | 20,977 | 2.37% | 13.52 | 3 天 ✓ |
| 7d | 10-20..10-26 | 140 | 5,498 | 2.55% | 14.17 | 3 天 ✓ |
| 24h | 10-27T22..10-28T21 | 15 | 793 | 1.89% | 13.11 | 滚动窗 |
| 3mo | 07-27..10-26 | — | — | — | — | 长窗到位 ✓ |

> **口径铁律**：4 文件均为「三站点汇总」但实为**全国家口径**（证据：24h 国家表香港 481 + 大陆 96 + 台湾 20 + 日本 91 + 新加坡 11 … = 793 = 24h 图表总量）。10/28 报告 582.4/108.3% 为 hk+jp+us 三站过滤口径 → **两者不可直接比较**，仅方向性一致。

### 1.1 恢复曲线（28d 逐日，全国家）

```
09-29..10-08  断崖前窗口（10/28 报告口径对齐）：09-29 789 | 09-30 688 | 10-01 675 | 10-02 669 | 10-03 601 | 10-04 675 | 10-05 823 | 10-06 832 | 10-07 795 | 10-08 778
10-09..10-12  谷底段：664 | 534 | 737 | 818
10-13..10-26  恢复段：891 | 934 | 900 | 839 | 536 | 538 | 763 | 802 | 826 | 826 | 754 | 594 | 749 | 947
```

- 双方法：3mo 档断崖前 09-25..10-08 日均 **714.71**（n=14）vs 28d 档 09-29..10-08 子窗 732.50（n=10）→ 采用方法 1（窗口对齐 10/28）。
- 最新 7d 日均 785.43（28d 档与 7d 档**同值 = 独立文件双方法一致**）。
- 恢复系数 = 785.43 / 714.71 = **109.9%**；方法 2 = 785.43 / 732.50 = 107.2%。
- 最佳单日 10-26：31 点击 / 947 展示 / CTR 3.27% / pos 14.1；低点 10-24：10 / 594 / 1.68%。

---

## 2. §0.37 四指标 + 带钱词 + 首页词数 + 关键词行数

> §0.37 口径：只盯 四指标 + 带钱词排名 + 首页词数 + 关键词行数；**无 GA4 / 008 / 订单**。

### 2.1 四指标（date×page，全国家）
见 §1 表。28d 合计 clk 497（+7.8% vs 10-26 面板 461，跨批方向性参考）/ imp 20,977 / CTR 2.37% / pos 13.52。

### 2.2 带钱词 23 词（28d 查询表，主词行 imp 最大）

| 组 | 首页（≤10） | 11-20 | 20+ / 无记录 |
|---|---|---|---|
| zh 9 | 食品包裝印刷 8.71 / **即日印刷 7.12（clk=1）** | 海報印刷 14.87 / 印海報 12.83（clk=1）/ 小冊子 10.41 / 紙袋 14.43 / 騎馬釘 12.14 | 貼紙印刷 **40.49** / 月曆印刷 23.09 |
| en 8 | small batch sticker printing 5.52 / small batch stickers 5.15 / saddle stitch booklet printing 9.60 | doujinshi 10.14 / china catalog 15.92 / large envelopes 14.06 / a2 poster 18.00 | corporate holiday cards 无记录 |
| ja 6 | 卒アル販売 5.00（小样本） | コミケ 印刷 18.85 / 教材 印刷製本 17.31 / pvc シール 18.80 | 教材 印刷 制本 无记录 / 年賀状印刷 无记录 |

**首页 6/23**（zh 2 / en 3 / ja 1，与 10-27/10-28 一致）。恶化：貼紙 40.49（锁词失守最明确）、月曆 23.09、a2 poster 18.00（11.9→18.0 退）；改善：china catalog 15.92（18.0→15.9）、教材 印刷製本 17.31（19.3→17.3）、コミケ 18.85（锚 20.8 达标）。

### 2.3 首页词数 / 关键词行数（28d 查询表，query 级，导出上限 1000）
行数 1,000（截断）| 首页（≤10）503 | 11-20 175 | 20+ 302。⚠ 该口径与面板 q×p×c 不同，仅参考。

---

## 3. 清单更新（任务②）

### 3.1 零点击高展示词（28d，imp≥50 & clk=0，28 词，top 12）
海報印刷 287@14.9 · コミケ 印刷 177@18.9 · 貼紙印刷 118@40.5 · 食品包裝印刷 112@8.7 · 月曆印刷 109@23.1 · 宣傳單張 108@28.3 · 印刷公司 103@30.8 · 宣傳單張印刷 102@27.2 · 書刊印刷 97@32.2 · poster 印刷 77@11.4 · china catalog printing 76@15.9 · 紙袋印刷 65@14.4（完整 28 词 → gsc-daily-anomaly-2026-10-29.json）

### 3.2 Striking distance（pos 5-20 & imp≥20，40 词，top 10）
海報印刷 287@14.9 · コミケ 印刷 177@18.9 · 印海報 126@12.8（clk=1）· 食品包裝印刷 112@8.7 · poster 印刷 77@11.4 · china catalog 76@15.9 · 紙袋印刷 65@14.4 · 印刷紙袋 64@16.8 · 戶外貼紙 62@15.0 · 食品印刷 59@9.2（完整 40 词 → JSON）

### 3.3 锚点表（10-09 验证矩阵，28d）
- **en**：doujinshi 10.1（11.2 达标升）· china catalog 15.9（17.7 达标升）· large envelopes 14.1（持平）· small batch sticker 5.2（5.6 达标升）· saddle 主词 9.6 首页 · small batch label 0（差）· calendar sizes 43.9（持平）· holiday cards 0
- **ja**：コミケ 18.9（20.8 达标升）· 卒アル 5.0（66 大幅改善，小样本）· 教科書 47.1（34.6 **恶化 churn**）· 両面カラー 43.0（持平）· クラフト紙 2.0（imp=1 小样本）· 年賀状 / 特急激安 / 社名入りカレンダー / クリアポスター 0
- **zh**：海報 14.9 · 貼紙 40.5（恶化）· 即日 7.1（clk=1）· 月曆 23.1 · 年曆 6.2（clk=1）· 利是封 21.1（clk=1）· 書刊 32.2 · 騎馬釘 12.1 · 餐牌 10.2 · 傳單 19.0 · 紙袋 14.4 · 信封 10.0 · 包裝盒 34.3 · 小冊子 10.4 · 學校 21.2 · 易拉架 50.4

### 3.4 盲开词（28d + 24h 双查）
年賀状印刷 / 2027年賀状 / corporate holiday cards / business holiday cards = **全 0**；nengajo 3@8.7（28d）/ 1@9.0（24h）→ **/ja/nengajo-2027/ 页面已有展示**（收录信号），盲开词本身未破零（11-04 验证点）。

---

## 4. 校准日 Pillar 收录验证 + 抓取状态 + 同口径导出（任务③）

### 4.1 Pillar 收录验证（7d 网页表 10-20..10-26，GSC 有展示 = 已索引参与排名）
- **最强**：poster-printing-guide 422@7.7（5 clk）· folded-leaflet 180@10.4（11 clk）· saddle-stitch 103@10.0（3 clk）
- **中**：flyers 102 · packaging 85 · posters 82 · paper-bags 70 · calendars 66 · red-packets 49（3 clk）· stickers 42
- **弱/新**：educational 22 · comiket-c109 20@7.3（2 clk）· wedding 13 · envelopes 8@6.5 · **nengajo-2027 1@10.0（新页，已有展示）**
- 分站点 7d：zh-hk 4,615 imp/108 clk · en 1,330/20 · ja 635/13

### 4.2 抓取状态表
无 Crawl/Indexing 导出（K3 只导 Search 性能）→ 抓取状态表**挂起**；A15（index.json 假 FRESH 19 天）持续阻塞门童 #9，C6 需 owner 重建器（**不得手改派生文件 SOP-5**）。

### 4.3 同口径导出
本批 4 档即为同口径导出（全国家，K3 手导）。分析产物：gsc-daily-anomaly-2026-10-29.json + 本报告 + docs 校准报告。

---

## 5. 矩阵回灌（任务①，已执行）

- `gsc_feedback_2026_10_29` block 已入（KPI / 恢复 / 带钱词 23 / 零点击 28 / striking 40 / 锚点 / 盲开 / Pillar / 异常 / 候选 / next）。
- `priority_boost`：**食品包裝印刷 +1**（8.71 稳首页 + 112 imps）、**china catalog printing +1**（18.0→15.9 显著升 + 76 imps en 买家）；貼紙/月曆/教科書 0（观察/盯梢）。queue 命中：Q-014（food-packaging）0→1；Q-003 保持 1。
- `priority_boost_history` 追加 2026-10-29 记录（5 词变更明细）。
- 恢复期纪律：只更新证据/异常/候选（§7.2），不动页面、不动 WAITING_K3/BLOCKED_INFRA/SCHEDULED。

---

## 6. 异常状态（对比 10-28）

| ID | 异常 | 状态 |
|---|---|---|
| A1 | DATA_STALE | ✅ 解除（28d 止 10-26，3 天龄） |
| A2 | frozen_24h 链（758 imps × 4 轮） | ✅ 解除（新 24h 档到位） |
| A16 | 7d 零消费 | ✅ 解除（本轮消费 5,498 imps） |
| A15 | index.json 假 FRESH | ✅ 解除（01:21 成文时 19 天；03:46 C6 重建，见 §11.5） |
| **A17** | **detector 输入分裂**（新登记）：10-29 已 FRESH，detector 仍读 10-15 单站档 → WARN_STALE 17 天 / 135.5% 分母混用 | P1（C8，10-30 验） |
| NEW-1 | 貼紙印刷 40.49 失守 | P1（内容修复后复评） |
| NEW-2 | 教科書 34.6→47.1 churn 恶化 | P1（11-01 月复盘） |
| NEW-3 | a2 poster 11.9→18.0 退 | P2（en 非首攻，观察） |
| NEW-4 | 海報印刷 287 imps 零点击 | P2（价格口径统一后海报承接，周2 K3-2/K3-7 门） |

---

## 7. 未做 / 红线声明

- ❌ 未改 src/、title/desc、301、贺卡资产、middleware（§0.0 解禁块待拍板，展示层/SEO 层不碰）。
- ❌ 未改 strategy-task-queue.json（§7.2 跨车道避让）。
- ❌ 未改 GSC数据/*.xlsx、index.json（派生文件禁手搓）。
- ✅ 回灌 matrix + 报告 + 异常 JSON + docs 校准报告。
- ⚠️ push：距上次 push（01:12:23）<30min，改动 commit 本地，**后台异步等待 01:42:23 后 push**（§0.25.8 不阻塞主进程）。

---

## 8. 下一验证点

| 日期 | 验证什么 | 成功阈值 |
|---|---|---|
| ~~今晚 20:13~~ | 已执行（§11）：同键命中 → 分析跳过；retry 三日收口 | ✅ 未产生第二份结论；三日历史 verdict 保留 FAILED |
| **2026-10-30** | C8 验证：detector 是否消费 10-29 三站点汇总批；`gsc-cliff-2026-10-30.json` 是否仍 WARN_STALE / 135.5% | 有同日档时 **0 条 WARN_STALE**；ratio 自带分母窗口标签 |
| 2026-11-01 | 教科書 churn 诊断（月复盘） | 分清索引/内耗/意图 |
| 2026-11-03 | C4 面板 join（C6 index 重建已于 10-29 03:46 完成 → 改为复跑门童 #9 复核） | 貼紙/月曆 词级记录入库；门童 #9 对新旧档都能正确报 |
| 2026-11-04 | 年賀状簇 / 貼紙印刷 14 天位次 | 年賀状有展示即报胜；貼紙 ≤25 |
| 2026-11-06 | 海報印刷 结构裁决后 14 天 | 类目占比升、查询 CTR 回升 |

---

## 11. 20:13 计划轮 · 幂等复核 + retry_queue 三日收口（本 run）

### 11.1 本轮定位（先查键，再动手）

| 项 | 事实 | 判定 |
|---|---|---|
| run-context | 生成于 `2026-10-29 20:13:02`，preflight 9/9 检查 `ok`，锁已持（pid 25616） | ✅ 可写 |
| 幂等键 | `0453ab66a64d9edd`，与 01:21 harness 轮 `ZP-gsc-feedback-20261029T012114-harness` **同键** | 今日分析 `ALREADY_DONE(since 01:21)` |
| 01:21 轮交付核验 | 本报告在盘（VERDICT: OK / 四字段齐）· `gsc-daily-anomaly-2026-10-29.json` 113 行 · `docs/2026-10-29-gsc-calibration-report.md` 在盘 · matrix 有 `gsc_feedback_2026_10_29` 块 | ✅ 四项均在，不重做 |
| retry_queue | 3 项：10-24 / 10-26 / 10-27，全部 `{FAILED}` | **本轮算力全部投这里** |

> 边界：不改 `src/`、不改 title/desc、不改 `strategy-task-queue.json`（今日 sibling 已写）、不改 `index.json` / `gsc-cliff-*.json` / `lane-status.json` / `lane-runs.jsonl`。产物只有两个：本报告 §11 + `.hermes/logs/gsc-retry-closure-2026-10-29.json`。
>
> 附带核实（不重复处置）：C6 报告已登记的 matrix 结构异常仍在——`gsc_feedback_2026_10_29` 块嵌套在 `gsc_feedback_2026_10_13` 内部（非顶层），内容可读、无消费者依赖；C6 已判「不擅改结构」，本轮**不重复登记、不手改**（SOP-5 派生文件禁手搓）。

### 11.2 RETRY 1 · 2026-10-24（REPORT_MISATTRIBUTION，非分析缺失）

| 证据 | 内容 |
|---|---|
| 总线 | `ZP-gsc-feedback-20261024T201343`，`wrapper_exit=0`、`dsh_exit=null`、`report=.hermes/logs/2026-10-23-ZP-k3-review.md`、`pushed=true`、`head=07d53b90` |
| 报告归属 | report 指向**别的车道、前一天**的 k3-review 报告；`2026-10-24-ZP-gsc-feedback.md` 不存在 → lane-status 判 FAILED 是**正确**的 |
| 检测器 | `gsc-cliff-2026-10-24.json`：WARN_STALE ×3（28d 档 = 10-15 批，止 10-12，12 天）；24h = 758 imp / 21 clk（窗 10-22，已被 10-24/26/27/28 四轮复用的冻结件） |
| 当日值（本轮恢复） | **594 展示 / 10 点击 / CTR 1.68%**（全国家口径，28d 档日序列），恢复段最低点（10-25 749 / 10-26 947） |

**收口判定**：`CLOSED_DIAGNOSED`。分析面已由 10-26 深度分析窗（09-28..10-25 含 10-24）与 10-29 §1.1 日序列覆盖；**历史 verdict 保留 FAILED**（契约 §6.3 禁止补跑改史）。归属缺陷本身已由现行 `scripts/lane-git-commit.py` L274-308 修好（只认当日同车道精确报告、跳过自动兜底占位），本轮无需再动。

### 11.3 RETRY 2 · 2026-10-26（产物在盘，报告缺席）

| 证据 | 内容 |
|---|---|
| 总线 | `lane-runs.jsonl` **当天无 ZP-gsc-feedback 行**（只有 daily-content / k3-review）；`2026-10-26-ZP-gsc-feedback.md` 是 20:13:04 的自动兜底占位；lane-status `exit=1` |
| 当天真实产物 | `gsc-deep-analysis-2026-10-26.json`（窗 09-28..10-25，1,565 行；前窗 08-31..09-27，1,681 行）+ 6 个 query/date CSV + `gsc-opportunities-2026-10-26.csv` + page-probe |
| 实质数据（date×page 口径） | 461 clk / 23,014 imp / CTR 2.00% / pos 16.44，对前窗 384 / 23,794 / 1.61% / 17.22 → **点击 +20.1%**、展示 -3.3%、排名 -0.78（改善） |
| 分语言 | zh-hk +2.3% imp / **+23.6% clk**；en -17.1% imp 但 pos 16.46→13.36、CTR 0.86%→1.04%（集中化，非衰退）；ja -2.2% imp / +12.5% clk |
| 分市场（query 口径，**不可与上行 date×page 相加/相减**） | hkg 51 clk/4,852 imp；usa 7/1,157（-493 imp，pos -3.15）；jpn 2/847；other 6/677 |

**收口判定**：`CLOSED_DIAGNOSED`。上述实质已被 10-28 §3 + 异常 A13 消费（同一文件、同一数字），不重复叙述。唯一的**从未交付增量**是 `ctr_gaps` 的意图分层，本轮补交：

| 层 | 词数 | 展示 | 处置 |
|---|---:|---:|---|
| **商业/交易** | **18** | **384**（池内 48%） | 唯一该进 title/meta/答案块的层；代表词：食品包裝印刷 104@9.11 · 食品印刷 54@9.31 · small batch sticker printing 49@4.77 · small batch stickers 28@5.07 · 餐牌印刷 27@9.37（clk 1→0）· saddle stitch booklet printing 15@9.60（94→15 imp、2→0 clk） |
| 泛词/待判 | 22 | 321 | 先判意图再动手。其中 **zprint / z print / zprints 三变体 = 60 imp、前窗 2 点击、本窗 0** → 品牌词零点击是 SERP 直答/导航吸收，**不是 CTR 缺陷，禁改 title**；燙金利是封 35@1.00 属语种/意图错配（10-28 已标注） |
| 信息/比较 | 8 | 95 | AEO 答案块素材（尺寸/价钱/是什么），不进 title |
| 合计 | **48** | **800**，点击 0 | 池 = 窗 09-28..10-25 query 口径；**周车道消费前须用 10-29 的 28d query 行复核**，本车道不改页 |

### 11.4 RETRY 3 · 2026-10-27（当日指标不可重建，不补史）

| 证据 | 内容 |
|---|---|
| 总线 | `ZP-gsc-feedback-20261027T201311`，`report=NONE`、`report_auto_generated=true`、`pushed=false`、`head=b6d32b35`、`dsh_exit=null` |
| 跨车道同族 | 同日 k3-review 轮 `ZP-k3-review-20261027T071033` 的 report 指向 **`2026-10-26-ZP-gsc-feedback.md`**（反向误指）→ 同一归属缺陷双向发生 |
| 检测器 | `gsc-cliff-2026-10-27.json`：WARN_STALE ×3（10-15 档，止 10-12，15 天）；24h 仍是 10-23 冻结件 → 即使当天写出报告，也给不出实时恢复值 |
| 数据覆盖 | 28d 窗 09-29..10-26、7d 窗 10-20..10-26 均**不含 10-27**；24h 窗 10-27T22:00 起，只覆盖当日最后 2 小时 → **当日 0–22 时无任何可读聚合** |

**收口判定**：`UNRECONSTRUCTABLE_NO_FABRICATION`。要补只能请 K3 另导一档含 10-27 的窗口（GSC 保留 16 个月）；因 10-28/10-29 两窗已夹住相邻趋势，当前价值低，**本轮不请求、不估算**。历史 verdict 保留 FAILED。

### 11.5 仪表对账（本轮新增，双方法复算 §0.23.2）

**问题**：同一天三个数字在跑——detector 135.5%、车道 109.9%、上一轮 108.3%。先定尺子。

| 方法 | 公式 | 结果 | 说明 |
|---|---|---:|---|
| detector 原样 | 793 ÷ 585.2 | **135.5%** | 585.2 = 固定常量（`gsc-cliff-2026-10-13` 三站 mean28，28d 窗止 10-05），分子为 10-29 的 24h 档 |
| detector 换分母 | 793 ÷ 714.71 | **111.0%** | 同一分子，换成本轮 3mo 断崖前日均（09-25..10-08 = 10006/14） |
| 车道方法 1 | 785.43 ÷ 714.71 | **109.9%** | 同批 7d 日均 ÷ 同批 3mo 断崖前日均（采用） |
| 车道方法 2 | 785.43 ÷ 732.50 | **107.2%** | 28d 档内子窗 09-29..10-08 |

**结论**：分母对齐后三法一致在 **107.2%–111.0%**（主两法差 1.1pp）；**135.5% 是分母口径差（585.2 vs 714.71，前者低 18.1%），不是恢复跳升**。恢复系数定稿 **109.9%**，135.5% 不得单独引用；若引用必须标注「固定 585.2 分母 / 28d 窗止 10-05」，且不得与 108.3%（三站口径）或 109.9%（全国家口径）混比。

**两条状态更新（本轮实测，覆盖 01:25 产物的旧判定）**：

1. **A15 已解除**：`GSC数据/index.json` → `lastBuild=2026-10-29T03:46`、`latestFreshData=2026-10-29`、`stalenessDays=0`、`FRESH`、`filesByDate["2026-10-29"]=4`、`totalFiles=238`；重建器 `scripts/rebuild-gsc-index.mjs` 在盘，门童 #9 一行修复（`|| -1` → `?? -1`）有 C6 报告与 commit `f98c8d89` 佐证。01:25 异常 JSON 里的「A15 OPEN 19 days」**已被 03:46 重建超越**，不得再当现状复用。
2. **A17（新登记）· DETECTOR_INPUT_SPLIT**：`gsc-cliff-2026-10-29.json` 仍只吃 `{站点}站点28天数据*.xlsx`（`gsc-cliff-detector.py` L93），而 10-29 新批是 `28天三站点汇总数据*` → 检测器输入停在 10-15（17 天），三条 WARN_STALE 照旧。后果：恢复模式块要求 `RECOVERY` 取自 `gsc-cliff-<当日>.json`，但该文件的输入在当天**不可能新鲜**，只能由车道手工复算并标注口径。A16 在车道层已解（7d 档被消费），**在 detector 层未解**。

### 11.6 候选任务（只给任务，不扩权）

| TASK_ID | INTENT | WRITE_SCOPE | OWNER | NEXT_CHECK | 验收 |
|---|---|---|---|---|---|
| `GSC-20261029-C8` | 让 detector 接受三站点汇总批（24h/7d/28d），同日新档不得再报 WARN_STALE；ratio 必须自带分母窗口标签 | `scripts/gsc-cliff-detector.py`（脚本 only） | infra（排程侧验证需 K3-admin） | 2026-10-30 | `gsc-cliff-2026-10-30.json` 有同日档时无 WARN_STALE；135.5% 类分母混用不再出现 |
| `GSC-20261029-C9` | 把 18 词 / 384 展示的商业意图 CTR 池作为 weekly-meta 的有序工单 | 本车道 none | weekly-meta | 2026-11-06 | 改动前逐词用 10-29 28d query 行复核；无品牌词（zprint/z print/zprints）进 title |

> 队列 `strategy-task-queue.json` 本轮**未写**（§7.2 只提供任务；今日 sibling 已写过该文件）。`WAITING_K3 / BLOCKED_INFRA / SCHEDULED` 一律未改状态。

### 11.7 红线与文件边界

- ❌ 未改 `src/`、title/desc、301、贺卡资产、middleware；未改 `strategy-task-queue.json`、`index.json`、`gsc-cliff-*.json`、`lane-status.json`、`lane-runs.jsonl`、matrix。
- ✅ 本 run 新增/改动：本报告 §11 + `.hermes/logs/gsc-retry-closure-2026-10-29.json`；与今日 sibling（daily-content / k3-review / blog-deepfix）**零文件重叠**。
- ⚠️ push 由 host wrapper 收尾（本沙箱不执行 git）；本报告不含「已上线」声明。
- ⚠️ **已知偏差（不掩盖）**：`GSC数据/gsc-fresh-2026-10-29.json` 不存在（§K.1.2 的落盘命名）。9/29 起实际链路 = K3 导出 xlsx + `gsc-daily-anomaly-<date>.json`；本沙箱 pwsh/脚本禁用，不能跑 `fetch_gsc_data.py`，也**不手搓派生 JSON**（SOP-5）。需 owner 裁决「恢复 API 落盘」或「废止该命名条款」，本轮不擅自二选一。



### 11.8 任务 J 8 锁词：本轮**不出表**（口径不可比，避免混算）

任务 J 要求 8 锁词（包裝盒印刷 / 紙盒印刷 / 包裝盒訂製 / 貼紙印刷 / 宣傳單張 / 即日印刷 / 書刊印刷 / 騎馬釘）按 **hkg query×country** 追踪。本轮 10-29 批只有三站点汇总 xlsx（24h/7d/28d/3mo），**没有 query×country 维度**；`gsc-deep-analysis-2026-10-29.json` 与配套双档亦未产出（C6 报告已登记同一缺口）。若拿 §3.3 的全国家 query 表去对 10-28 §4 的 hkg 口径，会重演 A10/A3 的口径混算。

- 最后有效口径 = `.hermes/logs/2026-10-28-ZP-gsc-feedback.md` §4（hkg 28d：包裝盒印刷 49/30.22 · 包裝盒訂製 44/30.27 · 紙盒印刷 41/32.12 · 貼紙印刷 107/39.91 · 宣傳單張 96/27.17 · 即日印刷 52/6.90/1clk · 書刊印刷 85/32.51 · 騎馬釘 48/19.65）。
- 本轮**不重算、不外推**；下一验证点 2026-11-03（K3 导出 query×page×country 双档后，与 C4 面板 join 同批复跑）。



---

## SOP-10 5 问门禁（K3 §0.22）

> 20:13 轮复核：5 问结论不变；§11 的每个数字均带文件 + 窗口 + 行号，三日 retry 未估造任何缺失值（10-27 明确写「不可重建」）。

- [x] 1. 架构差异：GSC 链路 = UI 导出 xlsx → openpyxl 解析（bundled Python）→ 清单/回灌/报告；不新建管道、不改 schema。
- [x] 2. 约束适用：契约 §7.2（只证据/异常/候选）、§0.37（无 GA4/008/订单）、§0.0 解禁块（展示层不碰）、恢复期"先保恢复再谈增长"。未替 K3 扩权。
- [x] 3. 原数据来源：全部数字带文件名+窗口+日期（§1）；恢复系数双方法标注；无估算 baseline。
- [x] 4. 字段值策略：不触及 certNo/validUntil/issuer，N/A。
- [x] 5. Markdown 渲染：产物为内部报告，无 user-facing 链接渲染，N/A。

---

## 数据来源 (K3 §0.23 / §0.33)

```
数据来源:
- GSC数据/24小时三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-29.xlsx（01:16 导出, 全国家口径, 窗 10-27T22..10-28T21）
- GSC数据/7天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-29.xlsx（01:16, 窗 10-20..10-26, clk140/imp5498）
- GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-29.xlsx（01:17, 窗 09-29..10-26, clk497/imp20977）
- GSC数据/3个月三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-29.xlsx（01:23, 窗 07-27..10-26, 断崖前复算输入）
- .hermes/logs/k3-kpi-panel-2026-10-26.md（前轮面板, 方向性 delta 参照）
- .hermes/logs/2026-10-27-week2-p1-execution-launch-pack.md（23 带钱词 SSoT + 主 URL）
- .hermes/logs/2026-10-28-ZP-gsc-feedback.md（上轮 NEXT = 本轮输入）
- .hermes/logs/gsc-daily-anomaly-2026-10-28.json（上轮异常基线）
- .hermes/industry-keyword-matrix.json（回灌后, 10-29 block + boost +2）
- 线上探针: zprintpro.com/ja/nengajo-2027/ + /zh-hk/category/envelopes/ + /en/category/stickers/（HEAD 01:14, 全 HTTP 200; 页面在线 ≠ 收录）
- .hermes/logs/run-context-ZP-gsc-feedback.json（2026-10-29 20:13:02, preflight ok, retry_queue 3 项）
- .hermes/logs/lane-status.json（2026-10-29T11:43:10.127Z = 19:43 本地；10-24 FAILED / 10-26 FAILED / 10-27 FAILED）
- .hermes/logs/lane-runs.jsonl L41（10-24 report 误指 k3-review）/ L45+L49（10-26 无记录、10-27 report=NONE）/ L47（10-27 k3-review 反向误指 10-26 gsc 报告）
- .hermes/logs/2026-10-26-ZP-gsc-feedback.md + .hermes/logs/2026-10-27-ZP-gsc-feedback.md（自动兜底占位, 失败证据）
- .hermes/logs/gsc-cliff-2026-10-24.json / -26 / -27 / -29（WARN_STALE 12/14/15/17 天；24h 冻结窗 10-22）
- .hermes/logs/gsc-deep-analysis-2026-10-26.json（ctr_gaps 48 条 / 800 展示；full_total 461/23,014）
- .hermes/logs/2026-10-29-ZP-gsc-feedback.md §1.1（10-24 当日 594 imp / 10 clk）
- GSC数据/index.json（lastBuild 2026-10-29T03:46, latestFreshData 2026-10-29, FRESH, totalFiles 238）
- .hermes/logs/2026-10-29-c6-gsc-index-rebuild-report.md（C6/A15 重建 + 门童 #9 修复, commit f98c8d89）
- scripts/gsc-cliff-detector.py L38-43（固定基线 585.2）/ L93（只 glob 单站 28d 档）
- scripts/lane-git-commit.py L274-308（现行当日同车道精确报告校验, 跳过自动兜底占位）
- .hermes/logs/gsc-retry-closure-2026-10-29.json（本轮机器可读收口记录）
校准状态: 已校准（2026-10-29 校准轮 + 20:13 复核轮; 恢复系数 109.9% 三法对账 107.2%-111.0%; A15 已由 03:46 重建解除, A17 新登记）
撤回声明: 无（本轮撤回 10-29 凌晨数据缺口版报告的「无新结论」定位——数据已到位, 升级为完整分析版; 原 01:21 版 commit 74eb89e3 保留在 git 历史。另撤回本报告 01:21 版「A15 持续 19 天未修」的现状表述——03:46 已重建解除, 原文保留并加注）
```
