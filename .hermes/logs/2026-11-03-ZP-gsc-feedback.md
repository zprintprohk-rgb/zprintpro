# 2026-11-03 · ZP-gsc-feedback 车道报告（K3 四档 xlsx 全新鲜 · 24h 冻结链解除 · 恢复第 3 个全国家 fresh 点 123.7% · 双方法方向校验 · C4 具名 URL 交接）

VERDICT: OK
RECOVERY: 123.7%（`gsc-cliff-2026-11-03.json` · `recovery_ratio_vs_mean28_dynamic` · **977 ÷ 789.8** · full-country · FRESH 24h 窗 **2026-11-02T03 → 2026-11-03T02**）
RECOVERY_STATUS: **基本恢复（≥90% 阈值达成）** — 3 个全国家 fresh 点 **105.8% / 117.7% / 123.7%** 全部越线；但「连续 3 日抬升 = 再评估启动」**未触发**（10-31~11-02 无读数），API 口径仍不可算。
RECOVERY_STREAK: **3 个全国家 fresh 点单调抬升（105.8% → 117.7% → 123.7%），但非连续 3 日**（10-31/11-01/11-02 无新读数）⇒「连续 3 日抬升 = 再评估启动」**未触发**。
DATA_STATUS: **FRESH_XLSX_2026_11_03（四档齐）/ API 面 STALE** — xlsx 数据日 **10-31**，20:13 时龄 **≈68h < 72h**；API 数据日 **10-30**，时龄 **≈92h**，今日无 end1103 拉取。
DATA_AGE: 24h 窗止 11-03 02:00 → **≈18h**；7d/28d/3mo 止 10-31 → **≈68h**；detector `data_age_days=3`；API 面 **≈92h**（两平面分开报，不合并）。
CONSUMED: `run-context-ZP-gsc-feedback.json` @ 2026-11-03 20:13:03（preflight ok / retry_queue 2 项 / 锁 pid 17636）| `lane-status.json` @ 2026-11-03 06:43（local；verdict=ATTENTION / problems=4）| `lane-results-bus-contract.md`（§6.1 只给任务不改页 + §7.1.5 同键恢复 + §7.2 队列纪律）| `zprintpro-gsc-feedback-loop.md` + `sop-10-gate.md` | `gsc-cliff-2026-11-03.json`（同日已落盘，生成者未署名；本车道未重跑，INFO only）| `gsc-xlsx-2026-11-03-analysis.json`（四档逐 sheet 解析）| `gsc-2026-11-03-taskj-c4-monthly.json`（任务J 二测 + C4 + 23 词月度基线）| `gsc-xlsx-sheetnames-2026-11-03.json` | `GSC数据/{24h,7d,28d,3mo}…2026-11-03*.xlsx` | `GSC数据/index.json`（11-02 07:19 重建）| `docs/2026-11-03-chief-analyst-execution-report.md` | `docs/2026-11-03-geo-probe-s1-completion.md` | `gsc-daily-anomaly-2026-11-02.json` | `strategy-task-queue.json` | 11-02 车道报告 + 11-03 同侪报告（k3-review / daily-content）+ `lane-runs.jsonl`（91 条）
DELIVERED: .hermes/logs/2026-11-03-ZP-gsc-feedback.md, .hermes/logs/gsc-daily-anomaly-2026-11-03.json, .hermes/logs/gsc-canonical-candidates-2026-11-03.json, .hermes/industry-keyword-matrix.json
NEXT: **11-04 首要** 补 API 拉取（`--end 2026-11-02 --days 28`，数据日须 ≥10-31）+ 任务J hkg 第三测；同日 貼紙 14 天判定（38.06，目标 ≤25）+ 年賀状簇破零检查；**11-06** weekly-meta CTR 批（食品包裝 118 imp/0 clk 为头号）+ O6 海报二选一 + O7 月曆 + 喜帖/利是封；**11-10** 月曆 copy 修复（c0552853）7 天效果。
IDEMPOTENCY: `eb744bde66f02889`（sha256(lane|intent|target|day)[:16]）；新日新 target（11-03 四档 xlsx + 23 词 + C4 + 恢复读数）⇒ 合法新工作；与 11-02 键 `06481dde1d50b86a` 不同，非重复处理。
RETRY_OF: **ZP-gsc-feedback-20261102T201308-33844**（run-context `retry_queue[0]`）→ **ALREADY_DONE(since 2026-11-03 06:1x)**：11-02 20:13 QUOTA 失败轮已由同会话恢复写出 `2026-11-02-ZP-gsc-feedback.md`（182 行，VERDICT OK）+ `gsc-daily-anomaly-2026-11-02.json` + matrix block；本轮**不重写、不重跑**。`retry_queue[1] UNRESOLVED_DAY 2026-11-02` 内容层同源闭合；机器层仍记 FAILED（契约 §6.3，不改写历史 verdict）。
COVERAGE: **NEW_EVIDENCE + STATE_TRANSITIONS**（A2/A19/A20 关闭；A1 双平面；新增 A27b/A30/A31/A32；NEW-10 双方法确认；NEW-11 食品包裝页1零点击；C4 具名 URL；O12 同侪完成消费）
CONFIDENCE: **HIGH（四档总量）/ MEDIUM（位置变化）** — 24h 977/23 与 28d 504/22,114 三处一致（analysis JSON + cliff JSON + 首席报告），7d 132/6,255 与 3mo 1,279/65,252 两处一致；28d 旧 pos 13.56 无独立 JSON 复算；API 任务J 仅二测，三测今日未跑；C4 为 query×page×country 单档。
RUN: 定时 20:13 轮；**沙箱 pwsh 被禁（不重试）**，仅 file/web 工具；未亲自跑 detector / API / node / python，消费同日已落盘产物（chief report 署名分析师；analysis/detector 生成者未在文件中署名）；**零 `src/` 写入**。

> **VERDICT 释义（防误读）**：本行 `OK` = **车道执行完成**（契约 §6.1/§6.3：当日数据文件 + 当日报告 + 异常分类 + 下一验证点齐备），**不是**「连续 3 日确认恢复」，**不是**「API 面新鲜」，**不是**「任务J 三测已完成」，也**不是**「monthly 调度已修」。数据侧真实状态 = `FRESH_XLSX / STALE_API`；恢复侧 = `123.7% 全国家口径，≥90% 阈值 = 基本恢复（指标层面），streak 非连续 ⇒ 启动信号未触发`；任务侧 = `O3 三测 BLOCKED_INFRA`。

---

## 0. 本轮一句话结论

**今天第一次拿到了完整的四档新鲜数据（24h/7d/28d/3mo），24h 冻结链正式解除。** 全国家动态恢复系数 **123.7%**（977 ÷ 789.8），较 10-30 的 117.7% 再抬 6.0pp，是第三个单调抬升的全国家 fresh 点；但 10-31~11-02 没有新读数，**「连续 3 日」仍未成立**；按恢复模式 **≥90% 阈值，指标层面已是基本恢复**，但不得写成「连续 3 日确认」或「处罚已解除」。业务面：28d **504 点击 / 22,114 展示 / CTR 2.28% / pos 14.03**，对上一档 496 / 21,127 / 2.35% / 13.56 = 日均点击 **+1.6%**、日均展示 **+4.7%**、CTR **-0.07pp**、位置 **+0.47 退**；最近 24h 位于 7d 与 28d 日均之上（977 > 893.6 > 789.8），是正向但**单日**的信号。词面：**6/23 首页不变**，5 个页1零点击词合计 **196 imp / 0 clk**，其中 **食品包裝印刷 118 imp / 0 clk / pos 8.42** 是 23 词带钱词中最大的页1 CTR 洞；**包裝盒簇在 API 与 xlsx 两套尺子上同向变差**（+0.66/+1.12/+0.93 与 +0.91/+2.59/+3.58），升级为双方法确认；**喜帖 +13.27、ja 教材 +7.98** 为确认恶化。C4 给出 6 簇具名 URL：**全部是各市场内分流，无跨市场/hreflang 成因**，已把 O5 候选清单交 monthly-matrix。GEO S1 已由同侪完成 7 簇 × 2 跑（O12 不重做），zh 3 簇命中、ja 3 簇缺席。

同时如实登记三件事：**API 面今天是 STALE（数据日 10-30，≈92h），任务J 第三测没跑**（沙箱禁 pwsh/python，无 end1103 拉取）；**detector 的 site 级数字是汇总档回退后的同值**（A30），不能当单站读；**恢复系数今天同时存在 754.5 与 789.8 两个动态分母**（123.7% vs 129.5%，A31），本报告按提示词口径取 detector 字段 **123.7%**。

---

## 1. 结果总线消费（第 -1 优先级）

| 项 | 事实 | 判定 |
|---|---|---|
| `retry_queue[0]` | `RETRY_OF ZP-gsc-feedback-20261102T201308-33844`，dsh_exit=1，`key_consumed:false`，AUTO-FILL `.failure.md` | **ALREADY_DONE(2026-11-03 06:1x)**：同会话恢复已写正式报告 + anomaly + matrix；本轮零重写 |
| `retry_queue[1]` | `UNRESOLVED_DAY 2026-11-02`，status FAILED | 内容层已由 11-02 恢复报告闭合；机器层保留 FAILED（§6.3） |
| `previous_run.bus_record` | verdict FAILED / report `.failure.md` / head c4605923 | 以总线为机器事实；不据此重跑，不翻转历史 |
| 今日数据 | K3 06:15-06:16 导出四档 xlsx；分析师 06:1x 产出 analysis JSON + taskj/c4 JSON + chief report | 本轮消费为 KPI/词表/C4 数据面；**未**再解析 xlsx（避免重复劳动） |
| `lane-status` 遗留 | problems=4：gsc LastTaskResult=1（11-02 QUOTA 遗留）/ monthly 11-01 MISSING + 2147946720 / k3 Result=1 | 本车道只能记录，不能自修；见 §11 |
| 今日同侪 | k3-review 07:16 **OK**（push d0ba9b7a，0 files）；daily-content 18:17 **OK**（push c0552853，8 src） | 与本轮写入（`.hermes/logs/` + matrix）**无文件交集**；无撞车 |
| 外部并发 | 分析师会话改 `GSC数据/*2026-11-03*.xlsx` + `gsc-xlsx-*-analysis.json` + `gsc-*-taskj-c4-monthly.json` + `docs/2026-11-03-*`；zwork 会话写 GEO 探针目录 | 本轮**只读**，零改写 |
| 队列资质 | `GEO-20261103-AI-PROBE-S1` 仍 SCHEDULED（实际已完成）；`REVIEW-20261101-MONTHLY` 仍 SCHEDULED（无报告） | 不自行翻状态（§7.2）；只在 anomaly/报告登记证据，交 queue owner |
| 挂锁 | `lane.lock` 由 preflight 持有（pid 17636，20:13:03） | 写入仅 `.hermes/`，非 `src/`；锁语义无冲突 |

## 2. 四指标（xlsx 四档，同批同口径；§0.37 口径）

| 档 | 窗口 | 点击 | 展示 | CTR | 平均排名 | 数据日龄 |
|---|---|---:|---:|---:|---:|---:|
| **24h** | 2026-11-02T03 → 11-03T02 | **23** | **977** | **2.35%** | **15.93** | ≈18h |
| 7d | 2026-10-25 → 10-31 | 132 | 6,255 | 2.11% | 15.60 | 3d |
| 28d | 2026-10-04 → 10-31 | **504** | **22,114** | **2.28%** | **14.03** | 3d |
| 3mo | 2026-08-01 → 10-31 | 1,279 | 65,252 | 1.96% | 17.35 | 3d |

**同法趋势（28d，上一档 → 本轮）**

| 指标 | 上一档（09-30~10-27） | 本轮（10-04~10-31） | 变化 |
|---|---:|---:|---:|
| 点击 | 496（日均 17.71） | **504（日均 18.0）** | **+1.6%** |
| 展示 | 21,127（日均 754.5） | **22,114（日均 789.8）** | **+4.7%** |
| CTR | 2.35% | **2.28%** | **-0.07pp** |
| 平均排名 | 13.56（无独立复算） | **14.03** | **+0.47 退** |

- **双记录校验**：24h **977/23** 与 28d **22,114/504** 在 analysis JSON series、cliff JSON sites totals、首席报告 §一 三处一致；7d **132/6,255** 与 3mo **1,279/65,252** 在 analysis JSON + 首席报告两处一致。两个独立解析器（分析 JSON + detector）对 24h/28d 同源同值；日序列行数 24 / 7 / 28 / 92 与窗口天数吻合，窗口完整性通过。
- **同批梯度（有效，同尺）**：24h 977 > 7d 日均 893.6 > 28d 日均 789.8；点击 23 > 18.86 > 18.0。最近一天高于两个均值，方向正向；**单日不构成趋势**。
- **中期对照（同批）**：28d CTR 2.28% / pos 14.03 vs 3mo 1.96% / pos 17.35 → **+0.32pp / -3.32 位**，三个月维度仍是改善。
- **窗口声明**：28d 两档重叠 24/28 天，是窗口滑动趋势，不是独立二次测量；旧 pos 13.56 仅有书面记录（11-02 matrix / k3-review / 首席报告），无独立 JSON 复算，已标注。**xlsx 与 API 不混算（A24）**。
- **§K.1.2 落盘义务**：本轮**未执行**（无 API 拉取；沙箱禁脚本）。今日数据落盘形式 = K3 四档 xlsx + 分析师 analysis JSON；**无 `gsc-fresh-2026-11-03.json`**，`index.json` 未重建（A27b）。不以手工文件冒充 API 落盘。

## 3. 恢复链：第 3 个全国家 fresh 点（123.7%），触发线仍未达

`gsc-cliff-2026-11-03.json` 的 24h 窗是全新窗口（11-02T03→11-03T02），不是冻结复读。**全国家动态口径**序列（只有这三点可比）：

| fresh 点 | 24h 窗 | 展示 | 点击 | mean28 分母（同期 28d 档） | 恢复系数 |
|---|---|---:|---:|---:|---:|
| 10-29 | 10-27T22→10-28T21 | 793 | 15 | 749.2 | **105.8%** |
| 10-30 | 10-29T05→10-30T04 | 888 | 15 | 754.5 | **117.7%** |
| **11-03** | **11-02T03→11-03T02** | **977** | **23** | **789.8** | **123.7%** |

- **三口径并存，必须点名**：① 官方首值 **123.7%** = 977 ÷ **789.8**（detector 字段，28d 止 10-31，离 24h 窗最近）；② **167.0%** = 977 ÷ **585.2**（单站和三站和 pre-cliff 固定基线，**A17 明令不得当恢复系数**，只存档）；③ **129.5%** = 977 ÷ **754.5**（28d 止 10-27，供 105.8→117.7→129.5 趋势线连续用，**不得与 123.7% 同线混用**，A31）。
- **窗口错位（必须披露）**：24h 窗（11-02~11-03）比 28d 档末日（10-31）新 2 天，**分母不含 24h 窗本身**；这是 GSC 24h 实时视图与日期维度滞后的固有差异。故 123.7% 是「相对最近 28 天均值」，**不是同窗比值**；不能据此反推某一天的精确恢复率。
- **为何不把 10-12~10-28 并入曲线**：那些点的分母是「三站和」（581.7 一带），10-29 起才切到「全国家」汇总档（749.2/754.5/789.8）。两种口径不可比（A17/A24）。历史点单列：10-12 7.5%（44/1）、10-13 127.6%（747/20，仅 precliff）、10-15 97.8%（569/19）、10-16 121.4%（706/24）、10-19 71.0%（413/8）、10-22 130.3%（758/21，10-24/26/27/28 为同一窗重复）。**无 detector 文件的日期不补造**（以现有文件为准；11-02 无文件即无读数）。
- **streak 判读**：3 个 fresh 点单调抬升成立；但 **10-31 / 11-01 / 11-02 没有任何新 24h 读数**（888/15/117.7% 冻结复读），所以「连续 3 日抬升」**不成立**，再评估启动信号**未触发**。
- **水平判读**：按恢复模式口径 **≥90% = 基本恢复**；本点 123.7%，且 10-29 / 10-30 / 11-03 三点全部 ≥100% ⇒ **恢复水平 = 基本恢复（指标层面）**。边界：单日 24h 比值 ≠ 处罚解除 ≠ 排名恢复；索引覆盖与人工处罚状态仍 UNKNOWN（§12）。
- **A30（新）**：`sites.hk/jp/us` 三块数字完全相同（789.8 / 22,114 / 504），因为单站档 22 天过旧、detector 回退汇总档（INFO_CALIBER_SWITCH ×3）。**汇总比值可用，单站读数不可用**；后续报告不得把 `sites.hk` 当香港站。
- **A21（标注复发）**：daily-content 11-03 首值用 **167.0%**（固定口径），k3-review 用 **129.5%**（旧分母）；两者都写明了口径，无静默混算，但**首值纪律仍不一致**。建议一行机器守卫：首值必须等于 `gsc-cliff-<date>.realtime_24h.recovery_ratio_vs_mean28_dynamic`。

## 4. 23 词带钱词：xlsx 28d 表 + 双方法方向校验

| 词 | 展示 | 点击 | pos（本轮） | 旧 pos（xlsx 上档） | Δ | 判读 |
|---|---:|---:|---:|---:|---:|---|
| 食品包裝印刷 | 118 | 0 | **8.42** | 8.70 | -0.28 | 首页零点击 · **P1 23 词最大洞** |
| 即日印刷 | 60 | 1 | **7.93** | 7.81 | +0.12 | 首页唯一有点击 |
| small batch sticker printing | 35 | 0 | **5.66** | 5.50 | +0.16 | 首页零点击 |
| small batch stickers | 21 | 0 | **5.10** | — | 新入列 | 首页零点击 |
| 卒アル販売 | 16 | 0 | **5.00** | — | 新入列 | 首页零点击 |
| saddle stitch booklet printing | 6 | 0 | **6.67** | — | 新入列 | 首页零点击（小样本） |
| 小冊子印刷 | 45 | 0 | 10.71 | — | 新入列 | 页2 顶部 |
| doujinshi printing | 50 | 0 | 10.06 | 10.00 | +0.06 | 页2 边界 |
| 騎馬釘印刷 | 65 | 0 | 12.78 | — | 新入列 | striking |
| 印海報 | 131 | 1 | 13.36 | — | 新入列 | striking，有 1 clk |
| large envelopes | 8 | 0 | 13.88 | — | 新入列 | striking（小样本） |
| 海報印刷 | 278 | 1 | 14.41 | 14.94 | -0.53 | 改善，仍页2 |
| china catalog printing | 72 | 0 | 14.96 | 15.79 | -0.83 | 改善 |
| 紙袋印刷 | 66 | 0 | 16.24 | — | 新入列 | striking |
| pvc シール | 19 | 0 | 17.79 | — | 新入列 | striking |
| a2 poster | 59 | 1 | 18.68 | — | 新入列 | 有 1 clk |
| コミケ 印刷 | 170 | 0 | 22.04 | 18.99 | **+3.05** | 倒退 |
| 利是封印刷 | 54 | 1 | 23.63 | 21.60 | +2.03 | 季节缓退 |
| 月曆印刷 | 116 | 0 | 25.30 | — | 新入列 | Q4 深位；24h 已见 10.9 |
| 教材 印刷製本 | 46 | 0 | **28.67** | 20.69 | **+7.98** | **确认恶化** |
| 喜帖印刷 | 10 | 0 | **29.40** | 16.13 | **+13.27** | **确认崩塌** |
| 書刊印刷 | 112 | 0 | 31.98 | 32.28 | -0.30 | 微改善 |
| 包裝盒印刷 | 50 | 0 | 32.80 | 31.89 | +0.91 | 包装簇退 |
| 宣傳單張 | 121 | 0 | **33.74** | 29.37 | **+4.37** | 倒退 |
| 貼紙印刷 | 127 | 0 | **38.06** | 40.88 | **-2.82** | 改善但仍在 38 深位 |

> 表内 25 行 = 23 词 + 2 个表外词（騎馬釘印刷 / 紙袋印刷），不改变 23 词口径；`corporate holiday cards` / `年賀状印刷` 仍无精确匹配行 = **盲区，不等于零需求**。`教科書 印刷 47.50（50 imp）` 单列在 anomaly NEW-3。

**双方法方向校验（API 10-30 vs xlsx 10-31；只比方向，不相减）**

- **19/23 在 ±1.5 位内**：食品包裝 8.39/8.42、即日 7.75/7.93、small batch sticker printing 5.65/5.66、small batch stickers 5.40/5.10、saddle stitch 7.40/6.67、卒アル 5.00/5.00、月曆 26.29/25.30、貼紙 39.39/38.06、pvc 18.06/17.79、宣傳單張 33.01/33.74、書刊 31.65/31.98。
- **两法同向结论**：包装三词**同向变差**（API +0.66/+1.12/+0.93；xlsx +0.91/+2.59/+3.58）⇒ NEW-10 升 **CONFIRMED_TWO_METHODS**；貼紙**同向改善**（-0.32 / -2.82）但仍 38.06 深位 0 点击；ja 教材**同向恶化**（+2.04 / +7.98）；喜帖两法都在 28-29（旧 16.13）⇒ 崩塌确认。
- **>1.5 位分歧（不平均，视窗口噪声）**：コミケ +4.40（17.64 / 22.04）、a2 poster +1.52（17.16 / 18.68）、large envelopes -1.72（15.60 / 13.88）。

**页1 零点击池（196 imp / 0 clk，交 weekly-meta 11-06）**

| 词 | 展示 | 点击 | pos | 备注 |
|---|---:|---:|---:|---|
| 食品包裝印刷 | 118 | 0 | 8.42 | **P1 · 23 词中最大页1 CTR 洞（NEW-11）** |
| small batch sticker printing | 35 | 0 | 5.66 | SERP 首句缺 MOQ 钩子（11-03 同侪 SERP 测量） |
| small batch stickers | 21 | 0 | 5.10 | 同上 |
| 卒アル販売 | 16 | 0 | 5.00 | 小样本 |
| saddle stitch booklet printing | 6 | 0 | 6.67 | 小样本 |
| *即日印刷* | *60* | *1* | *7.93* | CTR 1.67%，页1 低 CTR 观察 |
| *a1海報（24h）* | *11* | *0* | *1.0* | 单日异常观察，不入 28d 池 |

- **c 值口径（10-09 大脑区）**：本轮无脚本，**未重算 CTR c 值**；以「页1/页2 零点击 + 展示量」作代理池，c 值判定与「连续两档」确认交 weekly-meta 11-06；不得据此直接改 title/description。
- **盲开词四查**：`年賀状印刷` / `corporate holiday cards` 在 top-N dump 无精确行；`2027年賀状` / `business holiday cards` 无法从 top-N 判定（全量 1000 行未落盘为可检索文件）→ **不能断言零需求**，11-04 破零检查继续。

## 5. 任务J hkg 8 锁词：二测已交付，三测今日 BLOCKED_INFRA

二测（API query×country，end1031 vs end1102）为 11-02 已交付成果，本轮继承不重跑：

| 锁词 | 二测（11-02） | Δ vs 首测 | 判读 |
|---|---|---|---|
| 包裝盒印刷 | 47/0/33.23 | +0.66 | 退（xlsx 同向 +0.91） |
| 包裝盒訂製 | 45/0/33.98 | +1.12 | 退（xlsx 同向 +2.59） |
| 紙盒印刷 | 45/0/35.93 | +0.93 | 退（xlsx 同向 +3.58） |
| 貼紙印刷 | 114/0/39.39 | -0.32 | 微进（xlsx -2.82） |
| 宣傳單張 | 110/0/33.01 | +0.22 | 平 |
| 即日印刷 | 55/1/7.75 | -0.06 | 首页唯一 1 clk |
| 書刊印刷 | 104/0/31.65 | -0.02 | 平 |
| 騎馬釘 | 63/0/19.05 | +0.05 | 平 |

**三测未执行（A32）**：今日无 `end1103` CSV，沙箱禁 pwsh/python，无法同法拉取；API 面因此 92h STALE。**这不是方法问题，也不是数据诚信问题，是覆盖缺口**。11-04 同法同调用（K3-admin 可代为执行）：

```
cd F:\zprintpro-nextjs
python scripts/fetch_gsc_data.py --end 2026-11-02 --days 28
```

产出后按同国家过滤（hkg 8 词）出第三测；**不得**用 11-03 xlsx 相减替代（A24/A25b）。

## 6. C4 内耗：具名 URL + canonical 候选交接（O5）

来源 `gsc-2026-11-03-taskj-c4-monthly.json`（query×page×country，窗 2026-09-30~10-27）：

| 查询 | 市场 | URLs | 观测 top URL | top share | top pos | 类型 | 处置方向 |
|---|---|---:|---|---:|---:|---|---|
| 貼紙印刷 | hkg | 10 | `/zh-hk/category/stickers/` | 33.2% | 39.52 | split | 选承接页 + 内容/内链收口 |
| 海報印刷 | hkg | 10 | `/zh-hk/blog/poster-printing-guide/` | 36.3% | 9.76 | split（blog 抢 head） | O6 11-06 二选一 |
| 書刊印刷 | hkg | 4 | `/zh-hk/blog/book-buying-guide/` | 45.5% | 30.41 | split（blog 领头） | 先查意图/落地，再谈合并 |
| 月曆印刷 | hkg | 4 | `/zh-hk/category/calendars/` | 47.1% | 38.9 | split + 深位 | Q4 后再看结构 |
| 包裝盒訂製 | hkg | 3 | `/zh-hk/category/packaging/` | 95.7% | 31.6 | concentrated | 问题是排名，不是分流 |
| small batch sticker printing | usa | 1 | `/en/product/small-batch-stickers/` | 100% | 5.61 | concentrated + 页1 | 纯 snippet/CTA，不是结构 |

**结论**：所有 split 都发生在**同一市场内部**（hkg 簇在 hkg，en 簇在 usa/EN），**没有跨市场或 hreflang 成因**。因此 O5 的正确动作是「每簇一个承接 URL + 内容/内链路径」，**不是 301/canonical 合并**；后者需 K3 拍板。具名候选清单已落 `.hermes/logs/gsc-canonical-candidates-2026-11-03.json`（含每簇约束与 do_not），交 monthly-matrix 11-06。

## 7. 异常清单更新（A 系列 + NEW 系列）

**状态迁移（今日关闭/推进）**

| ID | 状态 | 证据 |
|---|---|---|
| A2 FROZEN_24H_CHAIN | **RESOLVED** | 全新 24h 窗 977/23，冻结 888/15 结束 |
| A19 3MO_NOT_REFRESHED | **RESOLVED** | 3mo 1,279 / 65,252 / 1.96% / 17.35 |
| A20 NO_FRESH_EXPORT | **RESOLVED** | 四档 xlsx 齐 |
| A15 / A18 / A27 | RESOLVED | index 11-02 重建覆盖 |
| A29 QUOTA_1102 | RESOLVED | 今日 k3-review 07:16 + daily-content 18:17 均 OK |
| A26 RECOVERY_METRIC | **PARTIALLY_RESOLVED** | xlsx 口径可算 123.7%；API 口径仍无；O2 待 K3 |
| A25b TASK_J_METHOD | RESOLVED（二测） | 三测另见 A32，不是方法缺陷 |

**新增/复发的结构性问题**

| ID | 状态 | 要点 |
|---|---|---|
| A1 DATA_STALE | **DUAL_PLANE** | xlsx FRESH（≈68h）/ API STALE（≈92h），两平面分开报 |
| A21 CALIBER_REGRESSION | **RECURRENCE_LABELED** | daily-content 首值 167.0%（固定口径）；k3 129.5%（旧分母）；均标注但首值不统一 → 建议机器守卫 |
| A27b INDEX_INVENTORY_LAG | **NEW** | index `filesByDate` 无 2026-11-03，目录却有 4 个 11-03 xlsx；门童 #9 仍按日期判 FRESH |
| A30 SITE_LEVEL_DUP_AGG | **NEW** | detector 的 hk/jp/us 三块同值，单站档 22d 回退；汇总比值可用，单站读数不可用 |
| A31 DUAL_DYNAMIC_DENOM | **NEW** | 754.5（止 10-27）vs 789.8（止 10-31）；同 977 得 129.5% vs 123.7%，不得同线混用 |
| A32 API_PULL_NOT_RUN | **NEW_BLOCKED_INFRA** | 无 end1103；任务J 三测与 API 日序列缺口；11-04 重试 |
| A28 MONTHLY_REVIEW | **OPEN_DAY3** | 11-01 MISSING，调度 2147946720，下次自然触发 12-01；owner K3-admin |

**NEW 观察项**

| ID | 状态 | 要点 |
|---|---|---|
| NEW-1 貼紙深位 | IMPROVING_NOT_SOLVED | 38.06 / 127 imp / 0 clk；11-04 14 天判定 |
| NEW-2 月曆 | WATCH | 28d 25.30；24h 10.9（10 imp）与 custom-calendars 19 imp/1 clk → 季节信号；copy 修复 c0552853 后 11-10 复测 |
| NEW-3 ja 教材 | **CONFIRMED_TWO_METHODS** | 28.67（+7.98 / +2.04）；教科書 印刷 47.50（10/19 ≥30 触发线早已越过，monthly 诊断仍缺，A28）；P1 |
| NEW-4 海报 blog | CONFIRMED_AT_QUERY_PAGE | blog 36.3% @9.76，O6 11-06 |
| NEW-5 展示升点击平 | OBSERVE | 日均展示 +4.7% / 点击 +1.6% / CTR -0.07pp |
| NEW-6 页1零点击 | **OPEN（5 词 / 196 imp / 0 clk）** | 交 weekly-meta 11-06 |
| NEW-7 利是封 | WATCH | 23.63 / 54 imp / 1 clk |
| NEW-8 喜帖 | **CONFIRMED** | 29.40 / 10 imp（旧 16.13）；先查索引+落地页 |
| NEW-9 内耗 | CONFIRMED_WITH_NAMED_URLS | 4 簇 split（33-47%），1 簇 concentrated，1 簇 PDP 100% |
| NEW-10 包裝盒簇 | **CONFIRMED_TWO_METHODS** | 两法同向变差；monthly 诊断优先 |
| NEW-11 食品包裝页1零点击 | **NEW P1** | 118 imp / 0 clk / pos 8.42；23 词中最大单点 CTR 洞 |
| NEW-12 品牌点击占比 | OBSERVE | 24h 智印港 3/3 + zprintpro 2/2 = 5/23（21.7%），单日不判趋势 |

## 8. 任务队列（O 系列状态，不自行翻 queue）

| ID | 状态 | 说明 |
|---|---|---|
| O1 API 拉取制度化 | **REGRESSED_TODAY** | 今日无拉取；仍手工触发（A32） |
| O2 恢复 SSoT 口径 | **WAITING_K3** | 123.7% 可算；A31 双分母强化「一句话定口径」的必要性 |
| O3 任务J 三测 | **BLOCKED_INFRA_TODAY** | 二测已交付；三测待 API |
| O4 CTR 池 | SCHEDULED 11-06 | 5 词 196 imp / 0 clk；食品包裝 118@8.42 头号 |
| O5 canonical 候选 | **DELIVERED_CANDIDATES** | 6 簇具名 URL；不 301/不合并 |
| O6 海报 | SCHEDULED 11-06 | blog 36.3% @9.76 vs 交易页 |
| O7 月曆 title | SCHEDULED 11-06 | 28d 25.30；copy 修复另算 11-10 |
| O8 貼紙 14 天 | **DATA_READY** | 38.06；11-04 判定 |
| O9 ja 教材 | OPEN | monthly 缺报告（A28） |
| O10 喜帖 | SCHEDULED 11-06 | 先索引+落地页 |
| O11 利是封 | SCHEDULED 11-06 | 季节分类 |
| O12 GEO S1 | **DONE_BY_PEER_PARTIAL** | 7 簇 × 2 跑；citation URL 未取全 → S2 11-20~24 |

## 9. GEO AI 探针 S1（O12）：同侪已完成，本车道消费不重做

- **执行事实**：zwork 浏览器面板 2026-11-03 12:22–12:33，Perplexity 访客/未登录，7 簇 × r1/r2 独立会话，**7/7 簇两跑方向一致**（`docs/2026-11-03-geo-probe-s1-completion.md`）。
- **结果**：zh-hk 三簇命中稳定（C4 紙袋 **第1推荐**、C1 食品盒在列（source #2/9）、C3 月曆第5）；en C2 两跑提及（引用 vs 仅提及待 S2）；**ja 三簇（C5/C6/C7）两跑全缺席**。
- **承诺真实性核验**：AI 引用的「1 小時數碼打稿 / 48 小時快遞 / 無開版費·無刀模費 / FDA」经站内溯源**均为真值**（`category-seo-content.ts` / `products-content.ts` / `blog-data/zh-hk.json` / `buying-guides.ts`），**无幻觉归因**。
- **唯一候选**：E3「答案收口」——把已存在于站内的承诺在对应 category 采购区显性化；属展示位置调整，**不是商业真值变更**，须走 11-06 单变量窗口，本轮不执行。
- **精度缺口**：Perplexity 来源 chip 未展开，完整引用 URL 未取得 → S2（11-20~24）必补；本车道**不重跑**，O12 记 `DONE_BY_PEER_PARTIAL`。
- **纪律**：不因探针改任何页面（含 C7 年賀状）；异常域 hkprint58.com 只登记「归属待核」，不公开定性。

## 10. 跨车道对账（2026-11-03）

| 车道 | 今日实况 | 与本轮交集 |
|---|---|---|
| ZP-k3-review | 07:16 OK，push d0ba9b7a，files=[]（仅报告） | 消费其 GSC 四档/恢复链摘要；**零改写** |
| ZP-daily-content | 18:17 OK，push c0552853，8 src（月曆 FAQ/CTA/blog 22 处 + 3 dirty 收口） | 其修复把月曆 copy 的测量窗推到 **11-10**；RECOVERY 首值 167.0% → A21；**零改写** |
| ZP-orchestrator/分析师 | 06:1x 四档 xlsx + analysis JSON + taskj/c4 JSON + chief report | 本轮**只读**消费 |
| zwork GEO | 12:22–12:33 S1 7 簇 × 2 | 本轮消费结论，不重跑 |
| ZP-monthly-matrix | 11-01 MISSING 第 3 天；调度 2147946720 | 只记录，见 §11 |
| 11-02 gsc 恢复产物 | report/anomaly/matrix 已存在 | **ALREADY_DONE，不重写** |

**写入隔离**：本轮只新增/修改 `.hermes/logs/` 3 个文件 + `.hermes/industry-keyword-matrix.json`；未触碰 `GSC数据/`、`docs/`、`src/`、`strategy-task-queue.json`、`lane-status.json` 或任何同侪产物。

## 11. K3 升级（need_human，一次性清桌）

1. **ZP-monthly-matrix 调度（A28，第 3 天）** — `LastTaskResult=2147946720`（0x800710E0），11-01 月复盘 MISSING，下次自然触发 12-01。可粘贴：
   ```
   schtasks /change /tn ZP-monthly-matrix /st 12:13
   ```
   若 0x800710E0 持续：删除后按 `scripts/register-cron-tasks.ps1` 重建（需管理员）。
2. **O2 恢复 SSoT 口径（一句话）** — 今日证据改变了推荐：**A（推荐）恢复系数 SSoT = xlsx 24h + 同批 28d 动态分母（123.7% 口径）**，API 26d daily 只做词级/趋势，不参与恢复系数；B = 维持 API 26d（但 API 无法产 24h，恢复系数仍不可算）；C = 双口径并存（现状，需每份报告标口径）。建议 A，可同时关闭 A26/A31 的口径争论。
3. **API 拉取（A32）** — 11-04 由本车道重试；若沙箱仍禁执行，请 K3-admin 跑：
   ```
   cd F:\zprintpro-nextjs
   python scripts/fetch_gsc_data.py --end 2026-11-02 --days 28
   ```
   否则任务J 三测与 API 日序列继续缺。
4. **index 重建（A27b）** — 4 个 11-03 xlsx 未入册：
   ```
   cd F:\zprintpro-nextjs
   node scripts/rebuild-gsc-index.mjs
   ```
5. **§2.3 全站模板真值 A/B/C**（carry，非本车道产出）：A＝全站「confirmed at quote」（推荐）/ B＝先贴纸族 6 SKU / C＝维持现状。
6. **GEO E3 展示收口**（O12 衍生）— 不在本轮执行；若要排期，须等 11-06 测量窗 + 单变量，且不得与商业真值改动同批。

## 12. spam 恢复周报（周中快照，2026-11-03）

- **恢复曲线（全国家，唯一可比）**：105.8%（10-29）→ 117.7%（10-30）→ **123.7%（11-03）**；3 点单调，+17.9pp / 5 天；按 **≥90% 阈值 = 基本恢复（指标层面）**，但**非连续日**，再评估启动信号未达。
- **同批梯度**：24h 977 > 7d 日均 893.6 > 28d 日均 789.8；点击 23 > 18.86 > 18.0 → 最近一天在均值之上（单日）。
- **索引覆盖率变化**：`index.json` 249 文件 / latestFreshData 10-31 / FRESH；**11-03 批次未入册**（A27b）；GSC 四档不含「索引覆盖率」sheet → **本轮无法给覆盖率变化，标 UNKNOWN**（不编造）。
- **人工处罚页状态**：本轮无新证据（未消费到处罚登记记录）→ **UNKNOWN**。
- **下次 Google 更新窗口**：无官方时间表 → **不做日期预测**；以 24h/7d 序列 + 索引覆盖 + 展示结构为观察指标。
- **口径警告**：本曲线不得与 10-12~10-28 的三站和口径点连线（A17/A24）；首值统一规则见 §11.2。

## 13. 下一验证点

| 日期 | 验证 | 通过标准 |
|---|---|---|
| **11-04** | API 拉取（数据日须 ≥10-31）+ 任务J 第三测（同法 8 行）+ 貼紙 14 天判定 + 年賀状零展示检查 | CSV 落地且数据日 ≥10-31；8 行同调用；貼紙 ≤25 或按基线判；年賀状任一展示 = 进展 |
| **11-06** | weekly-meta CTR 批（食品包裝 / small batch / 卒アル / saddle / 即日）+ O6 海报二选一 + O7 月曆 + 喜帖/利是封 | SERP 特征检查留痕；单变量；有复测日期 |
| **11-07** | small batch sticker printing snippet 首句 MOQ 假设（若 11-06 立项） | 同词同页同窗，7d 后 CTR 方向 |
| **11-10** | 月曆 copy 修复（c0552853）7 天效果 | 目标页展示 ≥ 基线 80% 且带钱词 ≥1 clk |
| **11-20~24** | GEO S2（引用 URL 补全 + C2 引用/提及判定） | 四要素齐（engine/date/answer/citation URL） |
| **12-01** | monthly 自然触发（A28） | run 记录 + 月复盘报告 |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] 1. **架构差异？** 已查前序实现路径：11-02 报告/anomaly 的 A/NEW/O 结构、`gsc-cliff-2026-11-03.json` schema、`gsc-xlsx-2026-11-03-analysis.json` 四档结构、`gsc-2026-11-03-taskj-c4-monthly.json` 字段；均实读，未推断冲突。
- [x] 2. **约束适用范围？** 本车道只给任务不改页（契约 §6.1 / 恢复模式块）；未触 `src/`；未把 WAITING_K3 / BLOCKED_INFRA / SCHEDULED 改成 READY；未改 queue 状态。
- [x] 3. **原数据/拍板来源？** 全部数字可溯源：四档 = K3 11-03 06:15-06:16 xlsx（analysis JSON + cliff JSON + 首席报告三处一致）；23 词/任务J/C4 = `gsc-2026-11-03-taskj-c4-monthly.json` + `gsc-xlsx-2026-11-03-analysis.json` 实读；恢复 = detector 字段 + 三口径分列；旧 28d pos 13.56 无独立 JSON 复算，已标注。无编造 baseline。
- [x] 4. **字段值策略？** certNo/validUntil/issuer 不涉及；无客户可见内容写入（零 src 动作）。
- [x] 5. **Markdown 渲染？** 内部车道报告（`.hermes/logs/`），非 user-facing 渲染层；未引入 `[text](url)` 渲染面。

## 数据来源（K3 §0.23）

- `GSC数据/{24小时,7天,28天,3个月}三站点汇总数据zprintpro.com-Performance-on-Search-2026-11-03*.xlsx`（K3 2026-11-03 06:15-06:16 导出，全国家口径，搜索类型=网页）
- `.hermes/logs/gsc-cliff-2026-11-03.json`（24h 977/23；28d 22,114/504；mean28 789.8；INFO×3）
- `.hermes/logs/gsc-xlsx-2026-11-03-analysis.json`（四档 series + 211/573/1000/1000 查询行 + 页面行）
- `.hermes/logs/gsc-2026-11-03-taskj-c4-monthly.json`（任务J 二测 8 行；23 词月度 same-method；C4 query×page×country）
- `.hermes/logs/gsc-xlsx-sheetnames-2026-11-03.json`（四档 sheet 名核验）
- `GSC数据/index.json`（2026-11-02 07:19 重建；latestFreshData 10-31；stalenessDays 2；FRESH）
- `docs/2026-11-03-chief-analyst-execution-report.md`（四档表 / 23 词 Δ / 任务J / C4 / 恢复链；旧 pos 13.56 来源）
- `docs/2026-11-03-geo-probe-s1-completion.md`（O12 7 簇 × 2 跑 + 承诺溯源）
- `.hermes/logs/gsc-daily-anomaly-2026-11-02.json`（A1-A29 / NEW-1..10 / O1-O12 基线）
- `.hermes/logs/2026-11-02-ZP-gsc-feedback.md`（RETRY_OF 恢复报告，182 行）
- `.hermes/logs/lane-runs.jsonl`（91 条；11-02 gsc FAILED、11-03 k3/daily OK）· `.hermes/logs/lane-status.json`（11-03 06:43 快照）· `strategy-task-queue.json`（GEO-20261103 / REVIEW-20261101-MONTHLY）
- 校准状态：24h/28d 三处一致、7d/3mo 两处一致（HIGH）；28d 旧 pos 13.56 无独立 JSON 复算（MEDIUM）；API 任务J 仅二测；C4 单档；恢复三口径已分列。**未跑 detector/API/node/python**（沙箱禁 pwsh），消费同日已落盘产物。
- 撤回声明：无。11-02 的 117.7% 在其自身窗口内有效；本轮只新增 11-03 读数，不构成撤回。
- 口径声明：本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数 断言（门童 #7 不触发）；无 GA4 / 008 / 订单数据（§0.37）；无 GSC 后台黑话进入客户可见内容（门童 #16 语义：本报告仅内部）。

---

（本轮 detector 未由本车道重跑：`gsc-cliff-2026-11-03.json` 为同日已落盘产物（生成者未在文件中署名）；沙箱 pwsh 被禁，按环境约束不重试。所有消费均为只读，写入仅 `.hermes/logs/` 与 matrix。）
