# 2026-11-01 · ZP-gsc-feedback 车道报告（API 直取恢复数据可用性 · 同方法两窗首测 · 任务J hkg 首份 API 基线 · 24h 恢复读数仍冻结）

VERDICT: OK
RECOVERY: **117.7%**（**CARRIED / FROZEN_REPEAT，不是 2026-11-01 的新读数**）— `gsc-cliff-2026-11-01.json` 的 24h 输入窗仍是 **2026-10-29T05 → 2026-10-30T04**、**888 imp / 15 clk**，与 10-30、10-31 逐字段相同。动态口径 `recovery_ratio_vs_mean28_dynamic` = 1.177（888 ÷ 754.5，full-country）；固定口径 151.7%（888 ÷ 585.2，单站和三站和）**不得当恢复系数单独引用**（A21）。
RECOVERY_STATUS: **UNVERIFIED** — 今日仍无独立 24h 读数。新到的 API 数据是 **date×page 26 天日序列**，不是 24h 探测器输入，且**没有 API 口径的 pre-cliff 分母**，换算成恢复系数会重演跨方法混算（A26）。
DATA_STATUS: **FRESH_API_2026_11_01（部分）** — API 直取窗 **2026-10-04..2026-10-29（26 天）**，最新数据日 **10-29**（运行时刻约 **68h**，在 72h 内）；K3/UI 的 10-31 / 11-01 xlsx 仍不存在（A20 降级 P2）。
DATA_AGE: KPI 面 **≈2.8 天（68h，在 72h 内）**；detector 面 **5 天（28d 输入止 10-27，越 72h）** — 两个新鲜度平面分别报，不合并。
RECOVERY_STREAK: **2/3（未推进）** — 已确认 fresh 点仍只有 10-29 105.8% 与 10-30 117.7%；10-31 与 11-01 均为同一 24h 窗的冻结复读，「连续 3 日抬升 = 再评估启动」**未触发**。
CONSUMED: `run-context-ZP-gsc-feedback.json` @ 2026-11-01 20:13:04（preflight ok / retry_queue [] / 锁 pid 17128）| `lane-status.json` @ 2026-10-31T18:41:00Z（注意：昨日快照，不含 11-01）| `lane-results-bus-contract.md`（§6.1 只给任务不改页 + §7 队列/学习边界）| `gsc-cliff-2026-11-01.json` | **GSC API 11-01 四档**（`gsc-date-page-28d-end1031.csv` / `end1027.csv` / `money-kw-query-page-end1031.csv` / `gsc-query-country-28d-end1031.csv`）| `gsc-batch-2026-11-01-delta.json` / `-four-metrics-samecaliber.json` | `money-keyword-measurement-audit-2026-11-01.json` | `2026-11-01-gsc-batch-report.md` | `GSC数据/index.json` | `gsc-daily-anomaly-2026-10-31.json` | `strategy-task-queue.json` | 11-01 同侪报告（daily-content / blog-deepfix）
DELIVERED: `.hermes/logs/2026-11-01-ZP-gsc-feedback.md`（本报告）| `.hermes/logs/gsc-daily-anomaly-2026-11-01.json`（机器可读：四指标双方法校验 / 23 词 API 分国家表 / 任务J hkg 8 词 / 17 词 same-method delta / 内耗 6 案 / A1-A28 + NEW-1..9 / O1-O12 / 下一验证点）| `.hermes/industry-keyword-matrix.json`（新增 `gsc_feedback_2026_11_01` block + `priority_boost_history` 2026-11-01 **零变更**条目）
NEXT: **11-02 首要** 在数据日 10-29 越 72h 前再跑一次 `--end` API 拉取（否则 A1 在 KPI 面也会回退）；**11-03** 同方法任务J hkg 第二测（首个真 delta）+ C4 国家归属 + 门童 #9 index 重建 + **GEO AI 探针 S1（本车道 owner）**；**11-04** 年賀状簇 / 貼紙 14 天；**11-06** 海报价格 / 贴纸 MOQ / catalog / 日历 title 的 7d 效果 + 喜帖/利是封复核。
IDEMPOTENCY: `ca85b3bed63b9b6e`（sha256(lane|intent|target|day)[:16]）；`lane-runs.jsonl` 今日无本车道同键记录 ⇒ 本轮首次处理；`key_consumed:true`（执行完成口径 OK）。
RETRY_OF: NONE（`run-context.retry_queue=[]`）。上一轮 10-31 verdict=OK，其报告 / anomaly JSON / matrix 回灌按 `ALREADY_DONE(since 2026-10-31)` 继承，未重做；上轮 NEXT「补 10-31 或 11-01 导出」**由同侪 09:5x 的 API 直取满足**（非 K3 手工导出），本轮消费该新数据。
COVERAGE: **NEW_EVIDENCE**（同方法两窗四指标 + 任务J hkg 首测 + 内耗 query×page 实证 + 异常分类 + 队列交接）
CONFIDENCE: **MEDIUM**（四指标双方法校验通过；但 query×country 档仅覆盖 31.2% 展示、平均排名为单方法、无 query×page×country 三方 join）
RUN: 定时 20:13 轮；沙箱 pwsh 被禁（不重试），仅 file/web 工具；**未跑 detector / KPI / index / API 脚本**，未手搓派生 SOT（SOP-5）。

> **VERDICT 释义（防误读）**：本行 `OK` = **车道执行完成**（契约 §6.1/§6.3：当日数据文件 + 当日报告 + 异常分类 + 下一验证点齐备），**不是**「站点已恢复」，**不是**「24h 恢复已确认」，也**不是**「xlsx 导出已补齐」。数据侧真实状态 = `FRESH_API_2026_11_01（部分）`；恢复侧真实状态 = `UNVERIFIED`（仍 2/3）。

---

## 0. 本轮一句话结论

**今天数据面出现了实质性转折：数据不再只靠 K3 手工导出。** 同侪会话在 09:5x 用 `scripts/fetch_gsc_data.py --end` 直取 Search Console API，拿到 **10-04..10-29（26 天）** 与 **09-30..10-27（28 天）** 两个同方法窗口。于是本轮第一次能给出**不混口径的趋势**：日均展示 **896.3 → 934.5（+4.3%）**、日均点击 **17.96 → 18.85（+4.9%）**、CTR **2.00% → 2.02%（+0.02pp）**、平均排名 **17.06 → 17.12（持平）**；但**末 7 日点击 136 → 132（-2.9%）**，说明这是**长尾扩面型**回升，不是主词突破。

同时，**24h 恢复读数仍是冻结复读**：`gsc-cliff-2026-11-01.json` 沿用 10-30 窗（888/15/117.7%），且 API 数据**没有同口径 pre-cliff 基线**，无法换算恢复系数。所以本轮**不宣布恢复进展**，只把「KPI 面已新鲜、恢复面仍冻结」这条裂缝如实登记为 A26，并把方法选择交给 owner。

真正的增量有三件：① 26 天同方法两窗四指标（双方法校验通过）；② **任务 J 8 锁词的 hkg 首份 API 基线**（10-28 以来第一次，8/8 有行）；③ **内耗从假设升级为 query×page 实证**（貼紙 9 URL top 32.2% / 海報 10 URL top 38.3% / 書刊 4 URL 43.9% / 月曆 4 URL 48.1%）。

---

## 1. 数据可得性：API 通路恢复，手工导出仍缺

### 1.1 今日实际可用的档

| 面 | 文件 | 窗口 / 天数 | 行数 | 点击 | 展示 |
|---|---|---|---:|---:|---:|
| API 新窗 | `GSC数据/gsc-date-page-28d-end1031.csv` | 2026-10-04..10-29（26d） | 6,092 | 490 | 24,297 |
| API 基线窗 | `GSC数据/gsc-date-page-28d-end1027.csv` | 2026-09-30..10-27（28d） | 6,492 | 503 | 25,095 |
| API 词×页 | `GSC数据/money-kw-query-page-end1031.csv` | 同新窗 | 1,724 | 74 | 10,192 |
| API 词×国 | `GSC数据/gsc-query-country-28d-end1031.csv` | 同新窗 | 1,506 | 74 | 7,572 |
| xlsx（旧） | `…28天…2026-10-30 (2).xlsx` | 09-30..10-27 | — | 496 | 21,127 |
| 24h（冻结） | `…24小时…2026-10-30.xlsx` | 10-29T05..10-30T04 | — | 15 | 888 |

- **xlsx 10-31 / 11-01 仍为 0**（`GSC数据/*2026-11*.xlsx` = 0；`*2026-10-3*.xlsx` = 3，全为 10-30）。API 通路使「无导出」**不再等于「无数据」**，故 A20 由 P1 降为 P2。
- **API 有 2 天延迟**：请求 28d（`--end 2026-10-31`）实得 26 天，止于 **10-29**。任何「28d 总量」跨窗比较都必须按日均，本轮全部按日均。
- **数据龄**：10-29 数据日 → 11-01 20:13 ≈ **68h**，在 72h 内（边界）；**11-02 起若不新拉即回退**。
- **index.json 未重建**：`lastBuild 2026-10-30T21:33`、`filesByDate` 无 11-01（A27），门童 #9 看不见 API CSV；本轮不手改派生索引（SOP-5）。

### 1.2 为什么今天必须换尺子（A24）

| 同窗口（09-30..10-27） | 点击 | 展示 | CTR | 均位 |
|---|---:|---:|---:|---:|
| xlsx UI 导出 | 496 | 21,127 | 2.35% | 13.56 |
| API 直取 | **503** | **25,095** | **2.00%** | **17.06** |

UI 导出**截断尾部页面**，同窗口少 3,968 展示（-15.8%）。若拿「API 新窗」直接减「xlsx 基线」，会得到**展示 +15%、均位 13.56→17.12、CTR 2.35%→2.02%** 的**假恶化**。本报告一律 **API 对 API**；xlsx 只作历史引用与「不回改」对象。

---

## 2. 四指标：同方法两窗，首次可判趋势

### 2.1 主表（§0.37 口径：点击 / 展示 / CTR / 均位）

| 指标 | API 基线 09-30..10-27（28d） | API 新窗 10-04..10-29（26d） | 按日均 |
|---|---:|---:|---:|
| 点击 | 503 | 490 | 17.96 → **18.85/日（+4.9%）** |
| 展示 | 25,095 | 24,297 | 896.3 → **934.5/日（+4.3%）** |
| CTR | 2.00% | **2.02%** | **+0.02pp（持平）** |
| 平均排名 | 17.06 | **17.12** | **+0.06（持平）** |

**末 7 日**：展示 966.4 → 1,003.7/日（**+3.9%**）；点击 **136 → 132（-2.9%）**。
**位置分层**：1-10 47.9%→48.4% / 11-20 22.7%→22.6% / 21-40 19.6%→18.4% / 41+ 9.8%→10.7% —— 结构基本稳定，**没有「曝光变多但质量变差」**。

### 2.2 双方法复算（§0.23.2）

| 方法 | 点击 | 展示 | CTR |
|---|---:|---:|---:|
| A：文件总计 | 490 | 24,297 | 2.02% |
| B：26 天日序列逐日相加 | **490** | **24,297** | **2.02%**（490÷24,297=2.0167%） |
| 差异 | **0** | **0** | **0** |

- 平均排名 `17.12` 为 API 加权单方法值，**未做第二方法**，如实标注（不假称双验）。
- 「展示升 / 点击平」的旧观察今日得到修正：**总窗点击日均是升的（+4.9%）**，只有**末 7 日**点击转负。两个结论不矛盾，窗口不同。

### 2.3 同日水平（不是恢复系数）

10-29 单日 **1,207 展示 / 18 点击**，为 26 天日均 934.5 的 **129.2%**，也是窗内最高档之一（10-14 为 1,218）。这是**API 口径内的水平指数**，**不是** pre-cliff 恢复率 —— 见 §3。

---

## 3. 恢复曲线：读数仍未推进，且方法上无法推进

| 日期 | 24h imps | ratio | 读数 |
|---|---:|---:|---|
| 10-12 | 44 | 7.5% | precliff 口径，断崖窗 |
| 10-13 | 747 | 127.6% | 单点（~43h 空档） |
| 10-15 | 569 | 97.8% | dynamic，fresh |
| 10-16 | — | 121.4% | fresh（当时） |
| 10-17 | — | 121.4% | **FROZEN** |
| 10-19 | — | 71.0% | fresh（当时） |
| 10-20 | — | 71.0% | **FROZEN** |
| 10-24 | — | 130.3% | 冻结平台起点 |
| 10-26 / 27 / 28 | — | 130.3% ×3 | **FROZEN** |
| 10-29 | 793 | 105.8% | fresh（10-29 批） |
| 10-30 | 888 | 117.7% | fresh（10-30 批） |
| 10-31 | 888 | 117.7% | **FROZEN_REPEAT** |
| **11-01** | **888** | **117.7%** | **FROZEN_REPEAT（同 10-30 窗；不计入连续日）** |

- 已确认连续 fresh 点：**2/3**；第 3 点**未产生**。恢复块要求「连续 3 日 + 索引/处罚页核验」才可再评估，今日两项都不满足。
- **A26（新，P1）**：API 面有新鲜日序列，却**没有同口径 pre-cliff 分母**。用 API 日均去比 xlsx 的 714.71 就是跨方法，用 24h 888 去比 API 日均也是跨维度。故本轮**拒绝生产**一个「API 版恢复率」。建议 owner 在 11-03 前写死：恢复 SSoT 是 24h xlsx（现状），还是迁到 API 并重推基线。
- 同口径 28d 均值法仍停在 **105.6%**（754.5 ÷ 714.71），与 10-30 相同（没有新 28d 均值）。

---

## 4. 带钱词：23 词 API 分国家表 + 任务 J 首份 hkg 基线

> 口径：`gsc-query-country-28d-end1031.csv`，zh-hk→hkg / en→usa / ja→jpn。**与 xlsx 查询级表不可相减**（方法 + 维度 + 窗口三重不同）。

### 4.1 23 词（严格口径，首页 **6/23**）

**zh-hk（9 词，首页 2）**

| 词 | pos | clk | imp | 区间 |
|---|---:|---:|---:|---|
| 食品包裝印刷 | 8.46 | 0 | 108 | 首页 |
| 即日印刷 | 7.81 | 1 | 52 | 首页 |
| 海報印刷 | 13.94 | 1 | 254 | 11-20 |
| 印海報 | 12.99 | 1 | 121 | 11-20 |
| 小冊子印刷 | 10.71 | 0 | 45 | 11-20 |
| 紙袋印刷 | 16.63 | 0 | 59 | 11-20 |
| 騎馬釘印刷 | 12.95 | 0 | 55 | 11-20 |
| 月曆印刷 | 27.07 | 0 | 102 | 20+ |
| 貼紙印刷 | 39.71 | 0 | 105 | 20+ |

**en（8 词，首页 3）**

| 词 | pos | clk | imp | 区间 |
|---|---:|---:|---:|---|
| small batch sticker printing | 5.64 | 0 | 33 | 首页 |
| small batch stickers | 5.20 | 0 | 15 | 首页 |
| saddle stitch booklet printing | 6.67 | 0 | 6 | 首页 |
| doujinshi printing | 11.09 | 0 | 34 | 11-20 |
| large envelopes | 14.86 | 0 | 7 | 11-20 |
| china catalog printing | 16.02 | 0 | 45 | 11-20 |
| a2 poster | 16.16 | 0 | 45 | 11-20 |
| corporate holiday cards | — | — | — | 无行 |

**ja（6 词，首页 1）**

| 词 | pos | clk | imp | 区间 |
|---|---:|---:|---:|---|
| 卒アル販売 | 5.00 | 0 | 16 | 首页（小样本） |
| コミケ 印刷 | 17.65 | 0 | 148 | 11-20 |
| 教材 印刷 製本 | 19.18 | 0 | 22 | 11-20 |
| pvc シール | 18.44 | 0 | 16 | 11-20 |
| 教材 印刷製本 | 24.75 | 0 | 40 | 20+ |
| 年賀状印刷 | — | — | — | 无行 |

- **首页 7/23 → 6/23 不是退步**：前者是 xlsx 查询级，后者是 API 分国家级，尺子不同；不可写成「掉了 1 个首页词」。
- 宽口径今日不计（分国家档只支持精确匹配），避免与 10-30 的 12/23 混读。

### 4.2 任务 J · 8 锁词 hkg（10-28 以来首份，**新基线**）

| 词 | 今日 hkg（API） | 10-28 xlsx hkg（仅参照） | 读法 |
|---|---|---|---|
| 包裝盒印刷 | **47 / 0 / 32.57** | 49 / 30.22 | 深层（>30） |
| 包裝盒訂製 | **43 / 0 / 32.86** | 44 / 30.27 | 集中 95.3%，问题在深度 |
| 紙盒印刷 | **44 / 0 / 35.00** | 41 / 32.12 | 深层 |
| 貼紙印刷 | **105 / 0 / 39.71** | 107 / 39.91 | 失守最明确 |
| 宣傳單張 | **104 / 0 / 32.79** | 96 / 27.17 | 承接 97.2% 在 category/flyers |
| 即日印刷 | **52 / 1 / 7.81** | 52 / 6.90 / 1 | 唯一首页 + 唯一点击 |
| 書刊印刷 | **101 / 0 / 31.67** | 85 / 32.51 | blog vs category 分裂 |
| 騎馬釘 | **60 / 0 / 19.00** | 48 / 19.65 | 8 词中次优位 |

- **8/8 有行**，这是任务 J 自 10-28 以来第一次拿全 hkg 表。
- **禁止相减**：右列是 UI 导出 + 不同窗口，左列是 API 新窗。表中「差异」不作为 regression/progress 结论（A25b）。**今天起以左列为新基线**，11-03 同调用再取第一次真 delta。
- 结构结论（不依赖 delta）：**1/8 首页、7/8 在 19-40 名且 0 点击** —— 任务 J 的核心问题仍是「深层 + 零点击」，不是「词不存在」。

### 4.3 17 词 same-method delta（同侪 API 两窗，可直接引用）

**恶化（需盯）**

| 词 | 旧 | 新 | Δ位 | 备注 |
|---|---|---|---:|---|
| 喜帖印刷 | 15 / 16.13 | 7 / **27.71** | **+11.58** | 展示腰斩，**真恶化**（NEW-8, P1） |
| 月曆印刷 | 206 / 32.93 | 189 / **37.07** | +4.15 | title trim 效果最早 11-06 |
| 教材 印刷製本 | 44 / 24.93 | 45 / **28.44** | +3.51 | ja 教材 churn 继续（A12） |
| 宣傳單張 | 123 / 30.46 | 108 / **33.86** | +3.40 | 但承接份额 87%→97.2%（更集中） |
| 利是封印刷 | 69 / 18.57 | 58 / **21.45** | +2.88 | Q4 季节前退位，仍 1 clk |

**改善**：a2 poster 17.20→**15.20（-2.00）** · コミケ 19.23→**17.94（-1.29，展示 -25）** · 海報印刷 34.01→**33.36（-0.65，展示 -47）** · 食品包裝印刷 -0.34 · china catalog 17.35→17.07（-0.28）。
**持平**：貼紙印刷 53.42→**53.36**（0 clk）· small batch sticker printing 5.50→**5.65**（0 clk）· 書刊印刷 44.36→44.65 · 印書 42.87→43.51。

### 4.4 盲开词

- 年賀状印刷 / 2027年賀状 / corporate holiday cards / business holiday cards = **仍无行**（分国家档为截断子集，**缺行 ≠ 零需求**）。
- `/zh-hk/nengajo-2027/` 仍是 10-30 页表值 **4 imp / 1 clk / CTR 25% / pos 2.75**（今日无页级 API 总量，carried）。**11-04 验证点不变**；Plan B（site: 收录诊断）已被「页面已上线 + HTTP 200」取代，不重复触发。

### 4.5 churn / 季节

- **教科書 印刷（jpn）**：45 imp / **47.71** / 0 clk；**教科書印刷（无空格）两窗均 0 展示** → 旧「47.1」作废，新基线为 47.71（带空格变体）。缺无空格行是数据事实，**不是改善**。
- **喜帖印刷**：hkg 7 / 0 / **27.71** —— 与 same-method 结论一致，属真恶化。
- **利是封印刷**：hkg 50 / **1 clk** / 23.80 —— 仍是扩展词中唯一有点击者，但位置在退。

---

## 5. 内耗：从「PENDING_JOIN」升级为 query×page 实证

> 源：`money-kw-query-page-end1031.csv`（新窗；**每个词的各行之和 = delta 文件总量**，故份额计算有效）。

| 词 | 总量 | URL 数 | top URL | top 份额 | top 位 | 判定 |
|---|---:|---:|---|---:|---:|---|
| 貼紙印刷 | 236 | 9 | `/zh-hk/category/stickers/` | 32.2% | 38.75 | **SPLIT**（另 blog 66@55.08 / 60@71.08） |
| 海報印刷 | 520 | 10 | `/zh-hk/blog/poster-printing-guide/` | 38.3% | **9.49** | **SPLIT + 首页资产是 blog**（product/a2 80@35.58；category 58@60.86） |
| 書刊印刷 | 214 | 4 | `/zh-hk/blog/book-buying-guide/` | 43.9% | 30.52 | **SPLIT**（category/books 91@55.70 近乎对半） |
| 月曆印刷 | 189 | 4 | `/zh-hk/product/custom-calendars/` | 48.1% | 28.78 | **SPLIT**（category/calendars 84@42.21） |
| 包裝盒訂製 | 43 | 2 | `/zh-hk/category/packaging/` | 95.3% | 32.86 | **CONCENTRATED**（问题是深度，不是分裂） |
| small batch sticker printing | 34 | 2 | `/en/product/small-batch-stickers/` | 97.1% | 5.65 | **CONCENTRATED**（纯 CTR 问题） |

- 意义：以前只能写「页级重叠 = 假设」；今天能写「**同一 query 的展示被 9/10 个 URL 分摊，top 份额仅 32-38%**」。这足以支撑「承接页收口」类任务，但仍**不能**说明哪个国家/哪个 URL 该做 canonical —— 三方 join 仍缺（下一验证点 11-03）。
- 纪律：本车道**只给候选**，不选 canonical、不改 redirect/noindex、不改 title。

---

## 6. 队列（只给任务，不改页、不改队列状态）

### 6.1 机会队列

| TASK_ID | 意图 | 目标 / 证据 | OWNER | NEXT_CHECK | 验收 |
|---|---|---|---|---|---|
| GSC-20261101-O1 | **API 拉取常态化** | 今日证明 API 可替代手工导出；data day 10-29 已 68h | ZP-k3-review + K3 | 11-03 | 每日固定 `--end` 拉取 + 运行日志；不再依赖人工 |
| GSC-20261101-O2 | **恢复口径 SSoT 定案** | 24h xlsx vs API 26d；A26 无 API pre-cliff 分母 | K3（规则变更） | 11-03 | 写死一种方法；恢复率可单方法复算 |
| GSC-20261101-O3 | 任务J hkg 第二测 | 今日 8/8 新基线；禁止与 10-28 相减 | 本车道 | 11-03 | 同调用取回 8 行，给出首个真 delta |
| GSC-20261101-O4 | CTR 池 | small batch 34@5.65/0；卒アル 16@5.00/0；食品 108@8.46/0；即日 52@7.81/1 | ZP-weekly-meta | 11-06 | 先查 SERP feature；修 1 个首页零点击并复测 |
| GSC-20261101-O5 | **内耗收口** | 貼紙/海報/書刊/月曆 四簇 SPLIT；包裝盒 CONCENTRATED | ZP-monthly-matrix（+weekly-meta 执行） | 11-03 | 每簇指定 1 个 canonical 候选；无 K3 不动 redirect/noindex |
| GSC-20261101-O6 | 海报结构 | 首页资产是 blog（199@9.49，1 clk），商业页 35-61 | ZP-daily-content / weekly-meta | 11-06 | 二选一：强化 blog→product 路径，或提升商业页；凭证据选 |
| GSC-20261101-O7 | 日历簇 | 月曆 32.93→37.07；product 91@28.78 vs category 84@42.21 | ZP-weekly-meta | 11-06 | 页级 imp ≥ 基线 80%，月曆词 ≥1 clk |
| GSC-20261101-O8 | 贴纸锁词 | 53.36 query / 39.71 hkg；9 URL 分裂；A1-A5 10-30 才上线 | ZP-daily-content | 11-04 | 冻结窗内不 churn title，只复测 |
| GSC-20261101-O9 | ja 教材 churn | 24.93→28.44；教科書 印刷 45@47.71 | ZP-monthly-matrix | 11-01 | 分清索引 / 意图 / 内耗；无 ROI 声明 |
| GSC-20261101-O10 | **喜帖真恶化** | 15@16.13→7@27.71（imp -53%，位 +11.58） | monthly-matrix + weekly-meta | 11-06 | 先查收录与落地页，再谈改写 |
| GSC-20261101-O11 | Q4 利是封 | 18.57→21.45，58 imp，1 clk；hkg 50/23.80 | ZP-monthly-matrix | 11-06 | 仅季节候选分类 |
| GSC-20261101-O12 | **GEO AI 探针 S1** | 队列 `GEO-20261103-AI-PROBE-S1`，本车道 owner | 本车道 | 11-03 | 固定 kit；记录 engine/date/answer/citation URL；**不得用普通网页搜索替代** |

### 6.2 退场复核队列（**不删页 / 不 noindex**，carried）

| URL | imp | pos | clk | CTR | 处置 |
|---|---:|---:|---:|---:|---|
| zh-hk/category/books | 522 | 43.99 | 1 | 0.19% | 结构性复核（收录/相关性），先不改 |
| zh-hk/category/posters | 212 | 45.56 | 1 | 0.47% | 11-06 海报价生效后复核 |
| zh-hk/category/stickers | 194 | 40.73 | 1 | 0.52% | 冻结簇，仅记录 |
| zh-hk/product/catalog-printing | 156 | 45.28 | 0 | 0.00% | PDP vs 服务页分工复核 |
| zh-hk/blog/sticker-buying-guide | 106 | 51.06 | 2 | 1.89% | 与 sticker-guide 124@39.53 重叠复核 |

> 今日**未重算页级总量**（API 页级需按页聚合，非本车道可安全手算）；上表仍为 10-30 页表值，明确标注 carried。

### 6.3 内耗队列（INTERNAL_CANNIBALIZATION）

**状态：CONFIRMED_AT_QUERY_PAGE（国家归属仍 PENDING）**。明细见 §5；下一步 11-03 拿 country 归属后，再判「同一 query 是否跨市场分散」，最后才谈 canonical / 内链。本轮无写权、无动作。

---

## 7. 异常状态（对比 10-31）

| ID | 异常 | 状态 | 证据 / 处置 |
|---|---|---|---|
| **A1** | DATA_STALE | 🟠 **PARTIALLY RESOLVED P1** | KPI 面 10-29 ≈68h（内）；detector 面 10-27 = 5 天（外）。两平面分报。 |
| **A2** | frozen 24h 链 | 🔴 **OPEN P1** | 11-01 仍复读 10-30 窗（888/15/117.7%）；第 3 个 fresh 24h 读数未产生。 |
| A15 | index 假 FRESH | ✅ RESOLVED | 未手改；但见 A27。 |
| A18 | index 未随 10-30 重建 | ✅ RESOLVED | 已含 10-30，重建于 10-30 21:33。 |
| **A19** | 3mo 未刷新 | 🟠 OPEN P2 | 仍是 10-29 长窗；precliff 714.71 沿用。 |
| **A20** | NO_FRESH_EXPORT | 🟢 **DOWNGRADED P2** | xlsx 仍缺，但 API 已恢复数据可得性；不再是唯一阻塞。 |
| **A21** | 跨车道校准口径回退 | 🔴 **RECURRING P2（升级）** | `2026-11-01-ZP-daily-content.md` 再次以 **151.7%** 作 RECOVERY 首值、117.7% 降括注 —— **连续第 2 天**。按契约 §2.5「同因第二次必须升级」：建议改机器门禁（检查首值是否等于 dynamic），不再靠散文提醒。 |
| A22 | 跨车道元数据不一致 | ✅ CLOSED_FOR_TODAY | 今日 blog-deepfix 窗口写法正确（09-30..10-27）。 |
| **A23** | API delta 窗标签不符 | 🟡 **NEW P3** | `gsc-batch-2026-11-01-delta.json` 写 10-04..**10-31**，但 CSV/四指标 JSON 止 **10-29**（26 天）。仅元数据；所有求和按 26 天。 |
| **A24** | API vs xlsx 方法分裂 | 🔴 **NEW P2** | 同窗差 3,968 展示 / 3.5 位均位；混比即假恶化。今日一律 API 对 API。 |
| **A25** | 分国家档仅覆盖 31.2% | 🟠 **NEW P2** | 7,572/24,297 展示、74/490 点击；有行可信、缺行不可断零。 |
| **A25b** | 任务J 方法/窗位移 | 🟠 **NEW P2** | hkg 新基线不与 10-28 xlsx 相减；11-03 取首个同方法 delta。 |
| **A26** | 恢复指标无法用 API 复算 | 🔴 **NEW P1** | 无 API pre-cliff 分母；恢复率仍只能冻结继承。需 owner 定方法。 |
| **A27** | index 未收 API CSV | 🟡 **NEW P3** | lastBuild 10-30；filesByDate 无 11-01；门童 #9 盲区。 |
| **A28** | 月复盘今日到期无报告 | 🟠 **NEW P2** | `REVIEW-20261101-MONTHLY` owner=ZP-monthly-matrix；盘上无 11-01 月报告，lane-status 记 `LastTaskResult=2147946720`。只登记，不代做。 |
| NEW-1 | 貼紙印刷深层 | 🔴 PERSISTENT P1 | 53.36 / 39.71 hkg，0 clk，9 URL 分裂；11-04 复测。 |
| NEW-2 | 月曆恶化 | 🟠 WATCH P2 | 32.93→37.07；109→189 imp；0 clk；11-06 看 title trim。 |
| NEW-3 | ja 教材恶化 | 🔴 WATCH P1 | 24.93→28.44；教科書 印刷 45@47.71；11-01 月复盘分因。 |
| NEW-4 | 海报首页是 blog | 🟠 OBSERVE P2 | 199@9.49 / 1 clk（0.5%）；商业页 35-61。位次 -0.65 但展示 -47。 |
| NEW-5 | 展示升 / 末7日点击降 | 🟡 OBSERVE P3 | 日均 +4.3%/+4.9%，末 7 日 **-2.9%**；长尾扩面型。 |
| NEW-6 | 首页零点击 | 🟠 OPEN P2 | small batch 34@5.65；卒アル 16@5.00；食品 108@8.46；即日 52@7.81/1。 |
| NEW-7 | Q4 利是封退位 | 🟡 NEW P3 | 18.57→21.45，69→58 imp，仍 1 clk。 |
| **NEW-8** | **喜帖崩塌** | 🔴 **NEW P1** | 15→7 imp，16.13→27.71（**+11.58**）；真恶化。 |
| **NEW-9** | **内耗实证** | 🟠 **NEW P2** | 4 簇 SPLIT（top 32-48%）；2 簇 CONCENTRATED。 |

---

## 8. 总线与跨车道对账

- `run-context`：preflight **ok**，锁已获（pid 17128），`retry_queue=[]`，`sibling_lanes` 三条均 PENDING（daily-content / monthly-matrix / k3-review），prev run = 10-31 **OK** / pushed true / head `da9a96f1`。
- `lane-status.json`：生成于 **2026-10-31T18:41:00Z**，verdict `ATTENTION`，problems **2 条**（`ZP-monthly-matrix` / `ZP-k3-review` 调度器 `LastTaskResult=2147946720`）。该快照不含 11-01，不能据此判断今日各车道是否跑过。
- **11-01 同侪（均未被我改写）**：
  - `2026-11-01-gsc-batch-report.md`：API 直取，4 CSV + 2 JSON + `docs/2026-10-29-gsc-calibration-report.md` §八；揭示跨方法假象 —— 本轮最重要的数据供给。
  - `2026-11-01-ZP-daily-content.md`：年賀状早割 11-01 到期复核，6 文件 28 处，commit `919a6f4e`；RECOVERY 首值 **151.7%**（A21 复发）。
  - `2026-11-01-blog-deepfix.md`：**NO_OP**（队列 8 项全不可执行），改为测量底座审计 `money-keyword-measurement-audit-2026-11-01.json`。
  - `strategy-task-queue.json`：`generated_at 2026-10-31T23:20`，GEO S1 `SCHEDULED` / next 11-03；月复盘 `SCHEDULED` / next 11-01（未见报告，A28）。
- **避让结论**：本轮零改写 `src/`、`GSC数据/*.csv`、`strategy-task-queue.json`、`GSC数据/index.json`、`gsc-cliff-*.json`、`lane-status.json`、`lane-runs.jsonl`、任何 11-01 同侪产物。

---

## 9. 未做 / 红线声明

- ❌ 未改 `src/`、title/desc、301、贺卡资产、middleware（§0.0 解禁块 (a)/(b)/(c) 未裁决）。
- ❌ 未改 `GSC数据/*.csv`（同侪产物）、`GSC数据/index.json`（派生，SOP-5）、`gsc-cliff-2026-11-01.json`（detector 产物）、`strategy-task-queue.json`、`lane-status.json` / `lane-runs.jsonl`（总线证据）、任何 11-01 同侪报告/JSON。
- ❌ **未手搓** `gsc-fresh-2026-11-01.json`（§K.1.2 命名）——本沙箱无 pwsh/node，且派生文件禁手写。实际链路 = API CSV + `gsc-daily-anomaly-<date>.json`；是否废止该命名条款需 owner 裁决，本轮不擅自二选一。
- ❌ 未把 API 日均换算成「恢复系数」（A26）；未把 hkg 新基线与 10-28 xlsx 相减（A25b）；未用 xlsx 页表冒充今日页级重算。
- ❌ 未写 `learning-candidates.jsonl`：本轮只有 baseline + change，**缺 online_verify 与 retest**，按契约 §7.4 不构成学习样本。
- ❌ 未新建 `2026-11-01-gsc-suggested-src-fixes.md`：src 层建议已全部落 O4-O11 队列（proposals only）；且该命名以当日日期开头，有被 `lane-status` 误认作车道产物的风险（§0.35.3.6），故不落该文件。
- ✅ 仅新增：本报告、`gsc-daily-anomaly-2026-11-01.json`；仅修改：`.hermes/industry-keyword-matrix.json`（证据层 block + **零变更** history）。
- ⚠️ push 由 host wrapper 收尾（本沙箱不执行 git）；本报告不含「已上线」声明。

---

## 10. 下一验证点

| 日期 | 验证什么 | 成功阈值 |
|---|---|---|
| **2026-11-02** | 数据日 10-29 越 72h 前重新拉取 | 最新数据日 ≥10-30；`data_age ≤3d`；拉取有日志 |
| **2026-11-03** | 任务J hkg 同方法第二测 + C4 国家归属 + 门童 #9 index 重建 + **GEO AI 探针 S1** | 8 词同调用取回并给出真 delta；内耗可按国家归属；探针记录 engine/date/answer/citation URL |
| **2026-11-04** | 年賀状簇 / 貼紙 14 天 | 年賀状有展示即报胜；貼紙 ≤25 |
| **2026-11-06** | 海报价格 / 贴纸 MOQ / catalog / 日历 title 7d；喜帖 / 利是封复核 | 页级 imp ≥ 基线 80%，目标带钱词 ≥1 clk；喜帖位次不再恶化 |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 链路 = GSC API（同侪 `--end`）→ 4 CSV → 本车道消费；不新建管道、不改 schema。先 dump 真实表头与行数再引用（`热门查询,页面/国家,点击次数,展示,点击率,排名`）。
- [x] **2. 约束适用范围？** 契约 §6.1（只给证据/异常/候选，不改页）+ §7.2（不把 WAITING_K3/BLOCKED_INFRA 改 READY，未动 queue）+ §0.37（无 GA4/008/订单）+ 恢复期「先保恢复再谈增长」。
- [x] **3. 原数据/拍板来源？** 每个数字带文件名 + 窗口 + 维度；API/xlsx 双方法显式分列；任务J 新基线不与旧表相减；无估算 baseline。
- [x] **4. 字段值策略？** 不触及 certNo/validUntil/issuer，N/A。
- [x] **5. Markdown 渲染？** 产物为内部报告，无 user-facing 链接渲染，N/A。

---

## 数据来源（K3 §0.23 / §0.33）

```
数据来源:
- GSC Search Console API 直取（scripts/fetch_gsc_data.py --end 2026-10-31 --days 28, 2026-11-01 09:5x, 同侪会话执行）
  - GSC数据/gsc-date-page-28d-end1031.csv（6,092 行 / 2026-10-04..10-29 / 490 clk / 24,297 imp）
  - GSC数据/gsc-date-page-28d-end1027.csv（6,492 行 / 2026-09-30..10-27 / 503 clk / 25,095 imp）
  - GSC数据/money-kw-query-page-end1031.csv（1,724 行 / 74 clk / 10,192 imp）
  - GSC数据/gsc-query-country-28d-end1031.csv（1,506 行 / 74 clk / 7,572 imp / hkg,jpn,usa 等分国家行）
- .hermes/logs/gsc-batch-2026-11-01-four-metrics-samecaliber.json（两窗四指标 + 26/28 天日序列；双方法日序列求和 = 文件总量）
- .hermes/logs/gsc-batch-2026-11-01-delta.json（17 词 same-method delta；窗标签 10-31 与实数据 10-29 不符, 见 A23）
- .hermes/logs/money-keyword-measurement-audit-2026-11-01.json（10-31 query×page 承接浓度, 10-27 窗）
- .hermes/logs/2026-11-01-gsc-batch-report.md（跨方法假象披露 + 17 词 delta 叙述）
- .hermes/logs/gsc-cliff-2026-11-01.json（24h 888/15, dynamic 1.177, precliff 1.517, data_age_days 5, 0 CRITICAL / 0 WARN_STALE / INFO×3）
- GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-10-30 (2).xlsx（496/21,127/2.35%/13.56, 仅历史参照）
- GSC数据/index.json（lastBuild 2026-10-30T21:33, totalFiles 241, latestFreshData 2026-10-30, filesByDate 无 11-01 → A27）
- .hermes/logs/2026-11-01-ZP-daily-content.md · 2026-11-01-blog-deepfix.md（跨车道对账, 未改写）
- .hermes/logs/strategy-task-queue.json（2026-10-31T23:20, GEO-20261103-AI-PROBE-S1 / REVIEW-20261101-MONTHLY 只读）
- .hermes/logs/run-context-ZP-gsc-feedback.json（2026-11-01 20:13:04, preflight ok, retry_queue []）
- .hermes/logs/lane-status.json（2026-10-31T18:41:00Z = 昨日快照）
- 校准状态: 已校准（API 两窗同方法；四指标日序列双方法差异 0；10-29 数据日 ≈68h）
- 撤回声明: 无。10-30 的 117.7% 在其 24h 窗口内有效，今日仅 CARRIED，不构成撤回。
- 口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数 断言, 门童 #7 不触发；无 GA4 / 008 / 订单数据（§0.37）。
```

---

## 撤回声明（K3 §0.23）

- **本轮无撤回。** 10-30 的 117.7% 在其 24h 窗口（10-29T05→10-30T04）内有效；11-01 仅继承，不改写其当时正确性。
- 10-31 报告 §7 曾把「最新数据日 10-27 = 4 天」列为 A1；今日 API 面已推进到 10-29，但 detector 面仍 10-27 —— 该旧结论**不被撤回**，只被拆成两个平面（A1 PARTIALLY_RESOLVED）。
- 若 11-02/11-03 新拉取与今日数字冲突，按 §0.23 附原报告路径 + 撤回日期再声明，不在本轮预支。
