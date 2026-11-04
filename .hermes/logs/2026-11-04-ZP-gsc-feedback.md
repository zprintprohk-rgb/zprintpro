# 2026-11-04 · ZP-gsc-feedback 车道报告（API 面转新鲜 · xlsx/24h 面转陈旧 · 页1零点击池扩至 16 行 / 632 展示 · 恢复读数 available:false）

VERDICT: OK
RECOVERY: available:false（无 `gsc-cliff-2026-11-04.json`，且无 11-04 24h 导出；不推算、不换分母）— 最后官方值 = **123.7%**（`gsc-cliff-2026-11-03.json` · `recovery_ratio_vs_mean28_dynamic` · **977 ÷ 789.8** · full-country · 24h 窗止 2026-11-03 02:00）
RECOVERY_STATUS: **UNVERIFIED（今日无读数）** — 指标层面最后状态仍为「基本恢复（≥90%）」，但那是 11-03 的读数，不是今天的；处罚解除 / 排名恢复 / 索引覆盖仍 UNKNOWN。
RECOVERY_STREAK: **3 个全国家 fresh 点，非连续 3 日**（105.8% → 117.7% → 123.7%）；今日无新点 ⇒「连续 3 日抬升 = 再评估启动」**未触发**（与 11-03 相同，不推进）。
DATA_STATUS: **API 面 FRESH（数据日 11-02，20:13 时龄 ≈44h）/ xlsx 面 STALE（7d·28d·3mo 数据日 10-31，≈92h > 72h，无 11-04 导出）/ 24h 窗仍止 11-03 02:00（≈42h）/ detector available:false**
DATA_AGE: API ≈44h · xlsx 7d/28d/3mo ≈92h · 24h 窗 ≈42h · `index.json` lastBuild 11-03 21:30（FRESH，但未收录 11-04 新建 CSV，A33）
CONSUMED: `run-context-ZP-gsc-feedback.json` @ 2026-11-04 20:13:02（preflight 9/9 ok / retry_queue 1 项 / 锁 pid 35676）| `lane-status.json` @ 2026-11-04 06:43（local；bus_records=93，verdict=ATTENTION，problems=2）| `lane-results-bus-contract.md`（§6.1 只给任务不改页 / §7.1.5 同键恢复 / §7.2 队列纪律 / §7.4 学习边界）| `zprintpro-gsc-feedback-loop.md`（2026-11-03 证据分流块 + 恢复模式块）+ `sop-10-gate.md` | `GSC数据/gsc-query-country-28d-end1103.csv`（1,576 行 / 74 clk / 8,332 imp / 窗 10-06..11-02 / 数据日 11-02；本车道**只读**，未重拉）| `GSC数据/gsc-query-country-28d-end1102.csv`（1,522 / 70 / 7,776 / 窗 10-05..11-01）| `GSC数据/index.json` | `gsc-daily-anomaly-2026-11-03.json`（A/NEW/O 基线）| `gsc-cliff-2026-11-03.json`（最后官方恢复值）| `periodic-review-weekly-2026-11-03.json`（runs=43 / 14 handoffs / attention 3 项）| 11-04 同侪只读产物：`gsc-2026-11-04-taskj-third.json`、`gsc-2026-11-04-handoff-14q-snapshot.json`、`gsc-2026-11-04-o6-poster-attribution.json`、`gsc-2026-11-04-foil-redpacket-locale.json`、`2026-11-04-analyst-taskj-third-and-verdicts.md`、`2026-11-04-attention-coverage-audit.md`、`2026-11-04-nengajo-break-zero-verification.md`、`2026-11-04-ZP-daily-content.md`、`2026-11-04-ZP-k3-review.md`、`2026-11-04-00-a2-probe.md` | `.hermes/logs/lane-runs.jsonl`（95 条）| 线上抓取 `https://zprintpro.com/ja/product/foil-red-packets/`（本车道 20:2x，HTTP 200，A38 证据）
DELIVERED: .hermes/logs/2026-11-04-ZP-gsc-feedback.md, .hermes/logs/gsc-daily-anomaly-2026-11-04.json, .hermes/industry-keyword-matrix.json
NEXT: **11-05** 数据面优先：K3 补 11-04/11-05 四档 xlsx + `python scripts/fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-03`（**勿重拉 `--end 2026-11-02`**）+ 当日 detector（缺 xlsx 则 KPI 与恢复继续 UNKNOWN，不补算）；**11-06** weekly-meta CTR 批消费扩池后的 16 行 / 632 展示（食品包裝 114@8.53 头号 + 大信封 3.94 / 海報尺寸 4.85 两个 top-5 零点击）+ O6 海报 / O7 月曆 / O10 喜帖 intent / O11 利是封；**11-07** 貼紙与 blog 复测；**11-10** 月曆 copy 修复 7 天效果；**11-20** GEO S2 补引用 URL；**12-01** monthly 自然触发（A28 第 4 天）。
IDEMPOTENCY: `f9e73f25c028348a`（sha256(lane|intent|target|day)[:16]，run-context 给定）；新日新 target（11-04 API end1103 + 页1扩池 + O6/喜帖/利是封归因消费）⇒ 合法新工作，非重复处理；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，不含本键。
RETRY_OF: **ZP-gsc-feedback-20261102T201308-33844**（run-context `retry_queue[0]`，kind=UNRESOLVED_DAY day 2026-11-02，status=FAILED，dsh_exit=1）→ **ALREADY_DONE(since 2026-11-02 20:2x)**：该日 QUOTA 失败轮已由同会话恢复写出 `2026-11-02-ZP-gsc-feedback.md`（VERDICT OK，182 行）+ `gsc-daily-anomaly-2026-11-02.json` + matrix block；本轮**零重写、零重跑**。`lane-status` 对该项的 `recovery_plan=request_human`（修复 dsh 凭据脚本）**已被证据取代**：11-03 三条车道 dsh_exit=0（k3 07:16 / gsc 20:25 / daily 21:21）+ 11-04 01:1x 调度器实测 gsc/k3/daily `LastTaskResult=0` ⇒ 凭据链健康，无需该动作；机器层 FAILED 按契约 §6.3 **不改写历史 verdict**。
COVERAGE: **NEW_EVIDENCE + STATE_TRANSITIONS**（A32 关闭 / A1 平面翻转 / A2·A19·A20 重开为陈旧态 / 新增 A33·A34·A35·A36·A37·A38 / NEW-6 扩池 / NEW-8 改判 intent / NEW-9 系统性 blog 抢头 / O3 完成 / O8 HOLD）
CONFIDENCE: **MEDIUM-HIGH（行级事实）/ LOW-MEDIUM（趋势）** — 页1池 16 行 + 23 词关键行 11 行 + task-J 抽查 3 行（即日 / 貼紙 / 包裝盒）逐条回读 CSV 一致；API 总量 74/8,332 与 70/7,776 取同日报告交叉核对，**未独立重求和**（沙箱禁 shell）；相邻窗差值在**该导出粒度内**算术精确，但导出为截断集（A25），不代表全站；位置均值未重算。
RUN: 定时 20:13 轮；**沙箱 pwsh 被禁（不重试）**，仅 file/web 工具；未亲自跑 detector / API / node / python，消费同日已落盘产物；**零 `src/` 写入、零 title 改动、零 canonical/301、零队列状态翻转**。

> **VERDICT 释义（防误读）**：本行 `OK` = **车道执行完成**（契约 §6.1/§6.3：当日数据文件 + 当日报告 + 异常分类 + 下一验证点齐备），**不是**「KPI 四指标已刷新」，**不是**「恢复已确认」，**不是**「xlsx 已补齐」，**不是**「页面已修」。今日真实运行面 = `API FRESH / XLSX STALE / RECOVERY UNKNOWN`；月度复盘 `MISSING` 第 4 天；k3 车道 09:15 因 git push 失败在总线记 FAILED（报告已在盘）。

---

## 0. 本轮一句话结论

**今天两个数据平面互换了新鲜度：API 面恢复（数据日 11-02）、xlsx/KPI 面转陈旧（数据日 10-31，≈92h），因此「四指标 + 恢复系数」今天都不可更新——恢复读数只能 `available:false`。**

在此前提下本轮交付三件新证据：

1. **API 相邻窗精确位移**：end1102 → end1103（27/28 天重叠，只换掉 10-05、加入 11-02）点击 **70 → 74（+4）**、展示 **7,776 → 8,332（+556）**。因为两窗只差一天，这个差值在**该导出粒度内是算术恒等**（= 11-02 当日 − 10-05 当日），不是估算；但它只覆盖 query×country 截断集，不能当全站 KPI，也不能与 xlsx 相减（A24/A25）。
2. **页1零点击池从 5 词 / 196 展示扩到 16 行 / 632 展示**（规则：`0 点击 + 展示≥20 + 位置<11`），其中 **12 行 / 411 展示是 23 词表外的新面孔**；四个 **top-5 名次仍零点击**（燙金利是封 jpn 1.00 / a1海報 twn 1.00 / 大信封 3.94 / 海報尺寸 4.85）。这是 11-06 weekly-meta 批的直接输入，但**只是候选池，不是改稿清单**。
3. **内耗从「单簇分流」升级为「系统性 blog 抢头」**：海报（blog 9.78 / 37% vs 商品页 37.26 / 类目页 61.72）、利是封（blog 7.11 与 5.86 vs 类目页 22.33）、書刊（blog 45.5%）三簇同型；喜帖更被证认为**意图错配**——头部 query 的承接页是 `wedding-thank-you-cards`（9.36，11 展示），不是婚礼请柬类目（34.75）。

同时如实登记：**没有 11-04 四档导出、没有当日 detector、没有全站 KPI、没有恢复读数**；**monthly-matrix 11-01 MISSING 进入第 4 天**（调度 2147946720，仍是全车道唯二未解项之一；另一个是 git push 间歇失败 A37）。

---

## 1. 结果总线消费（第 -1 优先级，先读再干）

| 项 | 事实 | 本轮处置 |
|---|---|---|
| `retry_queue[0]` | `UNRESOLVED_DAY 2026-11-02 / FAILED`，dsh_exit=1，notes「model execution failed before host finalize」 | **RETRY_OF + ALREADY_DONE(since 2026-11-02 20:2x)**：11-02 恢复报告/anomaly/matrix 均已在盘且 VERDICT OK；**不重写**。机器层 FAILED 保留（§6.3） |
| 该项 `recovery_plan` | `request_human` → `scripts\repair-dsh-scheduler-credential.ps1` | **已被证据取代**：11-03 三车道 dsh_exit=0 + 11-04 01:1x 调度器 LastTaskResult=0 ⇒ 凭据/额度链健康；该命令**不需要**执行（附证据而非口头豁免） |
| `previous_run.bus_record` | 11-03 gsc：OK / dsh=0 / wrapper=0 / pushed=true / head `7fba4c30` / files=[matrix] | 昨日已交付，**不重做**；其 NEXT 四项今日由同侪交付（API 拉取 / 任务J 三测 / 貼紙 14 天判定 / 年賀状破零），见 §7 |
| `lane-status` 06:43 快照 | verdict=ATTENTION，problems=2（monthly 11-01 MISSING + scheduler 2147946720） | 与 01:1x 实测一致：gsc/k3/daily 已治愈，**只剩 monthly**；不据此重跑任何车道 |
| `periodic-review-weekly-2026-11-03` | runs=43；attention 3 项（gsc SCHEDULER_FAILED / monthly MISSING / k3 SCHEDULER_FAILED）；14 个 GSC handoff 全 `PROPOSE_ONLY`、`scale_allowed=false` | gsc/k3 两条 attention **基于 06:43 旧快照，已被 11-03 夜间自然跑推翻**；不自行把 handoff 升 READY，不自我批准 |
| `sibling_lanes`（run-context） | 记 daily-content 21:17、k3-review 07:10 为 PENDING —— 该段取自 06:43 快照；实况 k3 09:15 运行并因 push 失败记 FAILED、daily 18:17 OK | 实况见 §9；本轮与其**零文件交集** |
| 锁 | preflight 已持 `lane.lock`（pid 35676，20:13:02） | 写入仅 `.hermes/`，非 `src/`；锁语义无冲突 |

**幂等**：`f9e73f25c028348a`，与 11-03 键 `eb744bde66f02889`、11-02 键 `06481dde1d50b86a` 均不同；新日新 target ⇒ 合法新工作。

---

## 2. 数据平面：API 翻新、xlsx 转陈旧（今日最重要的状态变化）

| 平面 | 文件 | 数据日 | 20:13 时龄 | 判定 |
|---|---|---|---:|---|
| **API** | `GSC数据/gsc-query-country-28d-end1103.csv`（11-04 01:15 拉取，窗 10-06..11-02） | **11-02** | **≈44h** | **FRESH**（<72h） |
| API（上一档） | `gsc-query-country-28d-end1102.csv`（窗 10-05..11-01） | 11-01 | ≈68h | 参照档 |
| **xlsx 7d/28d/3mo** | 仍是 11-03 批（K3 11-03 06:15 导出） | **10-31** | **≈92h** | **STALE**（>72h） |
| xlsx 24h | 同上，窗 11-02T03..11-03T02 | 窗止 11-03 02:00 | ≈42h | 可读但**无新窗** |
| detector | **无** `gsc-cliff-2026-11-04.json` | — | — | **available:false** |

- **与 11-03 完全镜像**：昨天是 xlsx 新鲜 / API 陈旧（92h），今天反过来。结论不是「数据变好了」，而是**单一平面新鲜是常态，必须每次分平面报**（A1）。
- 今日 **没有任何 11-04 四档导出**（目录内最新仍是 11-03 批）⇒ **四指标（点击/展示/CTR/平均排名）今日不可更新**；`gsc-daily-anomaly-2026-11-03.json` 里的 504 / 22,114 / 2.28% / 14.03 是**上一档基线**，不是今天的值。
- `index.json`：lastBuild 11-03 21:30，totalFiles 253，`filesByDate["2026-11-03"]=4`，latestFreshData 11-03，FRESH —— 11-03 的 A27b 已修好；但 11-04 01:15 新建的 end1103 CSV **未入册**（`filesByDate` 无 11-04 键）⇒ 新开 **A33**（门童 #9 仍按导出日期判 FRESH，只是清单落后一个文件）。
- **A25 纪律**：今日无同批 date-page 拉取，所以 query×country 的覆盖率**今天算不出来**；11-02 的 31.4% 展示 / 14.4% 点击覆盖率**不得当今日值引用**。

---

## 3. 页1零点击池：16 行 / 632 展示（今日新增的核心证据）

**规则（可复现）**：`query×country`，`clicks = 0`，`impressions ≥ 20`，`position < 11`，窗 2026-10-06..11-02。
**为什么是新的**：11-03 的池子只在 23 个带钱词里扫（5 词 / 196 展示）；今天在**新鲜 API 导出**上扫，才浮出 23 词表外的变体。

| # | query | 国家 | 展示 | 点击 | 位置 | 23 词内 | 判读 |
|---:|---|---|---:|---:|---:|---|---|
| 1 | 食品包裝印刷 | hkg | 114 | 0 | 8.53 | ✅ | NEW-11 延续 · 池内最大单点 |
| 2 | poster 印刷 | hkg | 75 | 0 | 10.95 | — | 混合语变体 · 页1 底 |
| 3 | 食品印刷 | hkg | 62 | 0 | 7.90 | — | 食品包裝同族 |
| 4 | 小冊子印刷 | hkg | 43 | 0 | 10.74 | ✅ | 23 词内；11-03 亦列为 striking |
| 5 | **大信封** | hkg | 36 | 0 | **3.94** | — | **top-5 零点击** · R2 老词（9/2 为 2.16 / 89 / 0） |
| 6 | doujinshi printing | usa | 35 | 0 | 10.91 | ✅ | 承接 |
| 7 | **燙金利是封** | **jpn** | 33 | 0 | **1.00** | — | **日本第 1 名零点击** · 语言错配嫌疑（A35） |
| 8 | 包裝食品 裡印 | hkg | 31 | 0 | 9.39 | — | 疑似错拼长尾，需人工判读 |
| 9 | z print | usa | 31 | 0 | 8.90 | — | 品牌变体，非带钱词（NEW-12） |
| 10 | small batch sticker printing | usa | 29 | 0 | 5.83 | ✅ | 承接 · MOQ 钩子假设已排 11-06/07 |
| 11 | **a1海報** | **twn** | 27 | 0 | **1.00** | — | **台湾第 1 名零点击** |
| 12 | 海報size | hkg | 27 | 0 | 9.19 | — | 尺寸意图 |
| 13 | 邊度有紙袋買 | hkg | 25 | 0 | 7.88 | — | 问句型 |
| 14 | 即日急件 | hkg | 24 | 0 | 7.83 | — | 即日同族 |
| 15 | 海報印刷即日 | hkg | 20 | 0 | 9.55 | — | 即日意图 |
| 16 | **海報尺寸** | hkg | 20 | 0 | **4.85** | — | **top-5 零点击** |

- **合计 16 行 / 632 展示 / 0 点击**；其中 **12 行 / 411 展示**不在 23 词表内（上表「—」行）。
- **最值钱的不是「页1底部」，而是 4 个 top-5 名次仍零点击**：燙金利是封 jpn 1.00、a1海報 twn 1.00、大信封 3.94、海報尺寸 4.85。名次已经很好，问题在摘要/意图，不在排名——这类样本比 pos 10.9 的样本更干净。
- **纪律**：零点击 ≠ 摘要有问题。SERP feature / 图片包 / AI Overview / 本地包 / 纯导航意图都能吞点击。因此本表**只进候选池**，11-06 的准入仍是「真实 SERP feature 记录 + 单变量 + 复测日期」，**本轮不改任何标题/描述**。

---

## 4. 海报 query 家族：覆盖不是问题，转化才是（O6 的 query 侧证据）

在同一份 end1103 导出里按 `海報|poster` 扫描：**156 行 query×country，只有 8 行产生过点击（合计 8 次）**。头部：

| query | 国家 | 展示 | 点击 | 位置 | CTR |
|---|---|---:|---:|---:|---:|
| 海報印刷 | hkg | 258 | 1 | 14.52 | 0.39% |
| 印海報 | hkg | 128 | 1 | 13.62 | 0.78% |
| poster 印刷 | hkg | 75 | 0 | 10.95 | 0 |
| 海報與印刷 | hkg | 53 | 0 | 12.02 | 0 |
| a2 poster | usa | 50 | 0 | 20.62 | 0 |
| 海報 | hkg | 40 | 0 | 18.23 | 0 |
| 海報size | hkg | 27 | 0 | 9.19 | 0 |
| 海報印刷即日 | hkg | 22 | 0 | 9.55 | 0 |

- **读法**：站点对 150+ 个海报变体有展示、多个还在页1，但 148/156 行零点击；头部 0.39% CTR。**这是摘要/意图选择问题，不是覆盖问题**——不要用「再写一篇海报长文」来回应。
- **同日 URL 归因**（`gsc-2026-11-04-o6-poster-attribution.json`，窗 09-30..10-27）把这个判断落到页：`/zh-hk/blog/poster-printing-guide/` 占 37% 份额、位置 **9.78**、210 展示、**唯一 1 次点击**；`/zh-hk/product/a2-posters/` 位置 **37.26**（93 展示）；`/zh-hk/category/posters/` 位置 **61.72**（64 展示）。**blog 抢了 head，交易页在深位。**
- **利是封同型**：`/zh-hk/category/red-packets/` 52 展示 @22.33（1 clk），而 `/zh-hk/blog/cny-2027-red-packet-printing-guide/` @7.11、`/zh-hk/blog/wedding-red-packet-printing-guide/` @5.86 —— 两篇 blog 都在类目页前面。
- **喜帖是另一种病**：`喜帖印刷` 的 top URL 是 `/zh-hk/product/wedding-thank-you-cards/` @9.36（11 展示），婚礼请柬类目 @34.75。**名次没问题，接错了页**——O10 应从「索引+落地页检查」先改为「意图→URL 核对」。
- 三簇同型（海报 / 利是封 / 書刊 blog 45.5%）已够格升级为 **NEW-9 系统性候选**，但**这是 monthly 的结构议题，不是本车道可动的**：不 canonical、不 301、不合并、不改内链。O6 决策日仍是 11-06。

---

## 5. 国家 × 语言错配嫌疑（A35，只立假设，不落动作）

| query | 国家 | 展示 | 点击 | 位置 | 最可能承接页 | 证据强度 |
|---|---|---:|---:|---:|---|---|
| 燙金利是封 | jpn | 33 | 0 | **1.00** | `/ja/product/foil-red-packets/`（推断） | 中：query×country 行 + 同日页面探针；**未做 query×page join** |
| a1海報 | twn | 27 | 0 | **1.00** | 未确定 | 低：仅 query×country 行 |

- **燙金利是封 jpn**：同日探针显示 ja 页存在（200），title 为「箔押しポチ袋印刷 | 12色 100個から HK$1.10起 | (brand)」，当量 55；zh-hk 页 title 为「燙金利是封印刷 …」当量 56。**一个日文页在日本市场排中文 query 第 1 名**——若摘要承诺与查询语言不匹配，33 展示 0 点击就说得通；另一种解释是 SERP feature 吞点击。
- **不做的事**：不改 title（冻结批）、不改 URL、不做 hreflang 结论。探针里 `hreflang: []` **很可能是 9/18 已知的假阴性**（Next 渲染 `hrefLang` 驼峰、探针匹配小写），本报告**不据此判 hreflang 缺失**。
- **本轮新证据（独立 HTTP 抓取，非复用探针）**：[`/ja/product/foil-red-packets/`](https://zprintpro.com/ja/product/foil-red-packets/) 返回 200，title 与探针一致（当量 55）；但正文里**残留未翻译的中文块**：`【120g–150g紅色紙張】喜慶質感，挺度適中`、`【三色燙金】金／銀／玫瑰金`、`【免費刀模】`、`【燙金定位】±0.3mm`、`【節慶檔期】農曆新年前3週`，表格头 `適用場景`、单元格 `独特的质感`（简体「质」），以及 `海德堡 4 色機` / `寫真` / `精確` 等中文写法（同页他处已用 `ハイデルベルグ` / `写真`）。**这正好解释了「日文页为何能精确命中中文 query」**——不是 hreflang 问题，是页面上还留着中文。属客户可见 i18n 污染（A38），但修复归内容车道，本车道只交证据。
- **要的东西**：一次 `query×page×country` 拉取（这两个 query 即可），把「推断的承接页」变成「证实的承接页」；在那之前只进 11-06 triage 清单。

---

## 6. 恢复链：今天没有读数，不许造一个

- **机器口径**：`RECOVERY: available:false`。原因不是懒，是**结构性缺料**——恢复系数需要「24h 窗 + 同批 28d 动态分母」，今天既无 11-04 24h 导出，也无 detector。API 导出**没有 24h 维度**，也没有 pre-cliff 分母，所以「API 新鲜」**不能**换来恢复系数（A26）。
- **最后官方值**：**123.7% = 977 ÷ 789.8**（full-country，28d 止 10-31，24h 窗止 11-03 02:00）。三个全国家 fresh 点：**105.8%（10-29）→ 117.7%（10-30）→ 123.7%（11-03）**。单调抬升成立，但**非连续 3 日**，触发线未达。
- **三条口径禁令**（今天照旧）：① `167.0% = 977 ÷ 585.2` 是单站和三站和固定基线，**不得当恢复系数**（A17）；② `129.5% = 977 ÷ 754.5` 是旧动态分母，只能接 105.8→117.7 那条线，**不得与 123.7% 同线**（A31）；③ 10-12..10-28 的三站和点**不得**并入全国家曲线（A24）。
- **不预测**：不写「Google 处罚已解除 / 已恢复排名 / 下周会更好」。索引覆盖率与人工处罚状态今天仍是 **UNKNOWN**（无新证据）。

---

## 7. 异常清单状态迁移（A / NEW）

**今日关闭 / 推进**

| ID | 11-03 状态 | 11-04 状态 | 证据 |
|---|---|---|---|
| A32 API_PULL_NOT_RUN | NEW_BLOCKED_INFRA | **RESOLVED** | 11-04 01:15 拉取成功（1,576 行 / 数据日 11-02）；oauth2 连通性由 000 → 404（=通） |
| A27b INDEX_INVENTORY_LAG | NEW | **RESOLVED_1103 / 以 A33 重开** | index 11-03 21:30 重建，`filesByDate` 已含 11-03:4 |
| O3 任务J 三测 | BLOCKED_INFRA | **DONE** | 8/8 行落盘（即日 7.79 / 騎馬釘 19.28 / 書刊 32.04 / 貼紙 37.85 / 宣傳單張 33.92 / 包裝盒 34.24 / 紙盒 37.06 / 訂製 34.71） |
| O8 貼紙 14 天 | DATA_READY | **HOLD** | 37.85（API -1.54）/ 38.06（xlsx -2.82），均远高于 ≤25；不动 title |
| 年賀状破零 | 无精确行 | **`nengajo 2027` 7 展示 / 0 clk（5 国，含 jpn 1@10.00 首见）** | 同侪 daily-content + 独立复核（`2026-11-04-nengajo-break-zero-verification.md`）；JP 日文查询仍零命中；本车道只消费，不重跑 |

**今日重开（因为今天没有新导出，不是数据变坏）**

| ID | 状态 | 要点 |
|---|---|---|
| A1 DATA_STALE | **PLANES_FLIPPED** | API FRESH 44h / xlsx STALE 92h |
| A2 FROZEN_24H_CHAIN | **REOPENED** | 24h 窗仍止 11-03 02:00（≈42h），无新读 |
| A19 / A20 | **REOPENED** | 3mo 与四档导出都还是 11-03 批 |

**今日新增**

| ID | 级别 | 要点 | owner |
|---|---|---|---|
| A33 INDEX_LAG_1104_API_CSV | P3 | 11-04 CSV 未入册；门童 #9 仍 FRESH | rebuild 脚本 / K3-admin（沙箱禁 shell） |
| A34 PAGE1_ZERO_CLICK_POOL | P2 | 16 行 / 632 展示 / 0 点击；12 行新面孔 | 交 weekly-meta 11-06 |
| A35 LOCALE_COUNTRY_MISMATCH | P2 | 燙金利是封 jpn #1、a1海報 twn #1 均零点击 | 需 query×page join |
| A36 XLSX_NOT_REFRESHED_1104 | P1 | 无 11-04 四档 ⇒ KPI + 恢复 UNKNOWN | **K3 导出** |
| A37 GIT_SSH_INTERMITTENT | P2 | k3 09:15 `wrapper_exit=5 / git push failed`（报告已在盘、files=[]） | **K3-admin** |
| A38 JA_PAGE_ZH_FRAGMENTS | P2 | ja 利是封页正文残留中文块 + 简体「机」；客户可见 i18n 污染，也解释 jpn 中文 query 命中 | 内容车道（daily-content / blog-deepfix），非本车道 |

**既有观察更新（不升级为动作）**：NEW-1 HOLD；NEW-2 月曆 115@25.92（24h 曾 10.9）；NEW-3 教材 29.98；NEW-4 海报 blog 抢头证据齐；NEW-5 +7.1% 展示 / +5.7% 点击（单日换手，非趋势）；NEW-6 扩至 16 行；NEW-7 利是封窗口开（燙金 双市场 #1）；NEW-8 喜帖改判 intent；NEW-9 系统性候选；NEW-10 包裝盒三窗两法同向微退；NEW-11 食品包裝 114@8.53；NEW-12 `z print` usa 31@8.90 品牌变体（不做全站品牌点击占比：导出截断，A25）。

---

## 8. 任务队列（O 系列，只记录不改状态）

> 契约 §7.2：GSC feedback **只更新证据/异常分类/候选任务**，不得把 `WAITING_K3 / BLOCKED_INFRA / SCHEDULED` 改成 `READY`。本轮 **`strategy-task-queue.json` 零写入**。

| ID | 状态（本轮记录） | 依据 |
|---|---|---|
| O1 API 拉取制度化 | **MANUAL_PULL_ONLY** | 今日 01:15 仍是人工/同侪拉取，不是自动化 |
| O2 恢复 SSoT 口径 | **WAITING_K3** | 今天缺 24h 导出，正好证明依赖；不代 K3 定口径 |
| O3 任务J 三测 | **DONE_2026_11_04** | 8/8 行；包裝盒簇连续第二窗同向微退 |
| O4 CTR 池 | **SCHEDULED 11-06（池扩大）** | 5 词/196 → 16 行/632 |
| O5 canonical 候选 | **DELIVERED_CANDIDATES** | 11-03 具名清单有效；今日加 NEW-9 系统性证据 |
| O6 海报 | **EVIDENCE_COMPLETE / 决策仍 11-06** | 归因 + 家族扫描双证据 |
| O7 月曆 | SCHEDULED 11-06 | 25.30 xlsx / 25.92 API；copy 窗 11-10 |
| O8 貼紙 14 天 | **VERDICT HOLD** | 37.85 / 38.06 vs ≤25；11-07 复测 |
| O9 ja 教材 | OPEN | 29.98 / 28.67；monthly 仍缺（A28） |
| O10 喜帖 | **REFINED_INTENT_MISMATCH** | 承接页是 thank-you-cards @9.36 |
| O11 利是封 | SCHEDULED 11-06 | 类目 52@22.33 / 1 clk；两博客 7.11 / 5.86 |
| O12 GEO S1 | DONE_BY_PEER_PARTIAL | S2 窗 11-20..24；不重跑 S1 |

**新增候选任务（PROPOSE_ONLY，本轮不自批、不派工）**

| ID | 路由 | 目标 | owner | 准入 |
|---|---|---|---|---|
| GSC-20261104-C1 | FIX | 页1零点击池 triage（16 行 / 632） | weekly-meta | 先录 SERP feature + 真实 snippet；每页 1 变量；禁批量改 title |
| GSC-20261104-C2 | MEASURE | top-5 零点击 4 行（燙金 jpn、a1海報 twn、大信封、海報尺寸） | weekly-meta + monthly | 需 query×page×country；两个海外市场行需市场判读 |
| GSC-20261104-C3 | MEASURE | 海报家族 156 行 / 8 点击 + blog 抢头 | monthly | 无 K3 拍板不得 canonical/301/合并 |
| GSC-20261104-C4 | FIX | 数据面：11-04 xlsx + `--end 2026-11-03` API + detector | K3-admin / 下轮车道 | 同脚本同维度；**勿重拉 end 11-02** |
| GSC-20261104-C5 | FIX | `/ja/product/foil-red-packets/` 正文中文残留（A38） | daily-content / blog-deepfix | 只改正文语言，不碰 title / 价格 / MOQ / 交期；改后跑 i18n-guard |

---

## 9. 跨车道对账（2026-11-04）与写盘隔离

| 车道/会话 | 今日实况 | 与本轮关系 |
|---|---|---|
| ZP-k3-review | 09:15 运行（总线 fired_at），`wrapper_exit=5 / git push failed` 记 **FAILED**，但 `2026-11-04-ZP-k3-review.md` 已在盘、files=[] | 消费其 API/任务J/O6 摘要与调度器实测；**零改写**。push 失败另记 A37 |
| ZP-daily-content | 18:17 harness **OK**（年賀状破零 + 利是封窗口 + git SSH 根因画像），src 零写入 | 消费其年賀状/利是封测量；**不重做**；零改写 |
| 分析师会话 | 01:15 API 拉取、四件 11-04 探针/归因、O6 决策包、attention 覆盖审计 | **只读**消费；未改其 CSV/JSON/docs |
| zwork GEO | 11-03 S1 已完成（本日无新跑） | 不重跑，O12 保持 |
| ZP-monthly-matrix | 11-01 MISSING 第 4 天；调度 2147946720；next 12-01 | 只记录，见 §10 |
| 11-02/11-03 本车道产物 | report / anomaly / matrix / canonical 清单均在盘 | **ALREADY_DONE，零重写** |

**写盘隔离**：本轮只写 3 个路径 —— 本报告、`gsc-daily-anomaly-2026-11-04.json`、`industry-keyword-matrix.json` 的新 block。未触碰 `GSC数据/`、`docs/`、`src/`、`strategy-task-queue.json`、`lane-status.json`、`lane-runs.jsonl` 或任何同侪产物；`industry-keyword-matrix.json` 今日无其他车道写入（最新 block 为 11-03，本车道自写），无跨车道撞车。

---

## 10. K3 升级（need_human，一次性清桌）

1. **monthly-matrix 调度（A28，第 4 天，唯一存活的调度缺口）** —— `LastTaskResult=2147946720 (0x800710E0)`，11-01 月复盘 MISSING，下次自然触发 12-01。可粘贴：
   ```
   schtasks /change /tn ZP-monthly-matrix /st 12:13
   ```
   若 0x800710E0 持续：按 `scripts/register-cron-tasks.ps1` 重建（需管理员）。
2. **11-04 四档 xlsx 导出（A36）** —— 没有它，KPI 四指标与恢复系数今天、明天都只能 UNKNOWN。请从 GSC UI 导出 24h / 7d / 28d / 3mo 四档（搜索类型=网页，全国家）。
3. **API 拉取 + detector（A33/C4）** —— 若沙箱继续禁 shell，请 K3-admin 跑：
   ```
   cd F:\zprintpro-nextjs
   python scripts/fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-03
   python scripts/gsc-cliff-detector.py
   node scripts/rebuild-gsc-index.mjs
   ```
   （**不要**再拉 `--end 2026-11-02`，那份已在盘；重建 index 是为了把 11-04 CSV 入册。）
4. **git push 间歇失败（A37）** —— 今日已造成 k3 车道总线 FAILED 一例。管理员侧：启用 ssh-agent（`Set-Service ssh-agent -StartupType Automatic; Start-Service ssh-agent; ssh-add C:\Users\Administrator\.ssh\id_ed25519`），或在 wrapper 注入 `GIT_SSH_COMMAND`。修复前各车道 push 可能间歇失败。
5. **O2 恢复 SSoT 口径（一句话，carry）** —— 证据只增不减：**A（推荐）恢复系数 SSoT = xlsx 24h + 同批 28d 动态分母**；API 面只做词级/趋势，永不参与恢复系数。B = 维持 API（结构上产不出 24h）；C = 双口径并存（现状，每份报告都要标口径）。建议 A，可同时关闭 A26/A31。
6. **GEO E3 / 模板真值 A/B/C（carry，非本车道产出）** —— 维持既有 PROPOSE_ONLY，不在本轮排期。

---

## 11. spam 恢复周报（周中快照，2026-11-04）

- **恢复曲线（全国家，唯一可比）**：105.8%（10-29）→ 117.7%（10-30）→ **123.7%（11-03）**；今日**无新点**（无 24h 导出），曲线停在 11-03。按 ≥90% 阈值 = 指标层面基本恢复；**非连续日**，再评估启动信号未达。
- **同批梯度（11-03 读数，仍有效）**：24h 977 > 7d 日均 893.6 > 28d 日均 789.8；点击 23 > 18.86 > 18.0。
- **索引覆盖率变化**：`index.json` 253 文件 / latestFreshData 11-03 / FRESH；11-03 批已入册（A27b 关闭），11-04 CSV 未入册（A33）。GSC 导出不含「索引覆盖率」sheet ⇒ **本轮覆盖率变化仍 UNKNOWN**，不编造。
- **人工处罚页状态**：无新证据 ⇒ **UNKNOWN**。
- **下次 Google 更新窗口**：无官方时间表 ⇒ **不做日期预测**；只看 24h/7d 序列 + 展示结构 + 索引覆盖。
- **口径警告**：本曲线不得与 10-12..10-28 三站和点连线；首值必须取当日 detector 动态字段，缺则 `available:false`（本报告即此口径）。

---

## 12. 下一验证点

| 日期 | 验证 | 通过标准 |
|---|---|---|
| **11-05** | 四档 xlsx 补导 + API `--end 2026-11-03` + detector | xlsx 数据日 ≥11-02；CSV 数据日 ≥11-03；detector 的 `recovery_ratio_vs_mean28_dynamic` 非 null |
| **11-06** | weekly-meta CTR 批（食品包裝 114@8.53 + 4 个 top-5 零点击 + small batch/卒アル/saddle）+ O6 海报 + O7 月曆 + O10 喜帖 + O11 利是封 | SERP feature 留痕；每页单变量；复测日期明确；无批量改稿 |
| **11-07** | 貼紙与 blog 复测（blog-money-keyword-queue recheck_after=11-07） | 同词同页同窗；写出 before→after；单窗不判 SCALE |
| **11-10** | 月曆 copy 修复（c0552853）7 天效果 | 目标页展示 ≥ 基线 80% 且带钱词 ≥1 点击 |
| **11-20~24** | GEO S2（补全 citation URL + C2 引用/提及判定） | engine / date / answer / citation URL 四要素齐 |
| **12-01** | monthly 自然触发（A28） | run 记录 + 月复盘报告；O5/O9/O10/O11 在月会裁决 |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] 1. **架构差异？** 已实读前序实现路径：`gsc-daily-anomaly-2026-11-03.json` 的 A/NEW/O 结构、`gsc-cliff-2026-11-03.json` schema、`gsc-2026-11-04-taskj-third.json` 字段、`o6-poster-attribution` 的 query×page×country 结构、`periodic-review-weekly-2026-11-03.json` 的 handoff schema；未凭推断认定冲突。
- [x] 2. **约束适用范围？** 契约 §6.1「只提供任务、不直接改页面」+ §7.2 队列纪律 + 恢复模式红线（不新造近重复正文、数字只来自 products.ts/K3）。本轮零 `src/`、零 title、零 canonical/301、零队列状态翻转；未把 SCHEDULED/WAITING_K3 改 READY。
- [x] 3. **原数据/拍板来源？** 行级数字逐条回读 CSV（页1池 16 行全部；23 词关键行 11 行：食品包裝 114/0/8.53、貼紙 123/0/37.85、月曆 115/0/25.92、喜帖 11/0/31.45、利是封 56/1/24.07、包裝盒 49/0/34.24、海報印刷 258/1/14.52、小冊子 43/10.74、doujinshi 35/10.91、small batch 29/5.83、教材 47/0/29.98；task-J 抽查 3 行 即日 57/1/7.79、貼紙 123/37.85、包裝盒 49/34.24 与 JSON 一致；nengajo 5 行全读）；总量 74/8,332 与 70/7,776 取同日两份报告交叉核对，**未独立重求和**（沙箱禁 shell），已在 CONFIDENCE 标注；恢复值取 detector 字段，缺则 available:false；无编造 baseline。
- [x] 4. **字段值策略？** certNo / validUntil / issuer 不涉及；无客户可见内容写入（零 src）。
- [x] 5. **Markdown 渲染？** 本文件是 `.hermes/logs/` 内部车道报告，非 user-facing 渲染层；未引入需 `parseInlineLinks` 的链接语法。

## 数据来源（K3 §0.23）

```
数据来源:
- GSC数据/gsc-query-country-28d-end1103.csv (API 直取 2026-11-04 01:15, 1,576 行 / 74 clk / 8,332 imp, 窗 2026-10-06..2026-11-02, 数据日 11-02) — 本车道只读
- GSC数据/gsc-query-country-28d-end1102.csv (窗 2026-10-05..2026-11-01, 1,522 行 / 70 clk / 7,776 imp) — 相邻窗对照
- .hermes/logs/gsc-2026-11-04-taskj-third.json (任务J hkg 三测 8/8 行, 同日分析师计算)
- .hermes/logs/gsc-2026-11-04-handoff-14q-snapshot.json (14 词 query×country 现值)
- .hermes/logs/gsc-2026-11-04-o6-poster-attribution.json (query×page×country, 窗 2026-09-30..2026-10-27)
- .hermes/logs/gsc-2026-11-04-foil-redpacket-locale.json (ja / zh-hk 页面探针, 200)
- GSC数据/{24小时,7天,28天,3个月}…2026-11-03*.xlsx (K3 11-03 06:15 导出, 数据日 10-31, ≈92h → STALE)
- GSC数据/index.json (lastBuild 2026-11-03T21:30+08; 253 文件; filesByDate 2026-11-03=4; FRESH; 无 11-04 键)
- .hermes/logs/gsc-cliff-2026-11-03.json (last official 123.7% = 977 / 789.8, full-country)
- .hermes/logs/gsc-daily-anomaly-2026-11-03.json (A/NEW/O 基线; 14 handoff 来源)
- .hermes/logs/periodic-review-weekly-2026-11-03.json (runs=43; attention=3; handoffs=14 PROPOSE_ONLY)
- .hermes/logs/lane-runs.jsonl (95 条; 11-04 k3 09:15 FAILED / daily 18:17 OK) + .hermes/logs/lane-status.json (11-04 06:43 快照)
- 线上抓取 (本车道独立, 2026-11-04 20:2x): https://zprintpro.com/ja/product/foil-red-packets/ → HTTP 200, title 当量 55, 正文含中文残留 (A38)
- docs/2026-11-03-geo-probe-s1-completion.md (GEO S1 结论, O12)
- 校准状态: 🟢 行级已校准（16 行池 + 8 行任务J + 关键 23 词行逐行回读 CSV）；🟡 总量未独立重求和（MEDIUM-HIGH）；🟡 位置均值未重算；🟡 无同批 date-page ⇒ 覆盖率不可重算（A25）
- 撤回声明: 无。11-03 的 123.7% 在其窗口内继续有效；本报告不新增也不撤回任何恢复读数。
- 口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言（门童 #7 不触发）；无 GA4 / 008 / 订单数据（§0.37）；无 GSC 后台黑话进入客户可见内容（门童 #16，本文件仅内部）。
```

---

（本轮 detector / API / node / python 均未由本车道执行：沙箱 pwsh 被禁，按环境约束不重试；所有同侪产物只读消费，写入仅 `.hermes/logs/` 两个新文件与 matrix 一个新 block。）
