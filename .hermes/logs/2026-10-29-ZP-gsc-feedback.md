# 2026-10-29 · ZP-gsc-feedback 车道报告（手动立即执行轮 · K3 "立即执行" 指令 01:12）

VERDICT: OK
RECOVERY: 108.3%（日历日口径 10-13..10-22，无新数据不可复算；检测器口径 129.5% 冻结输入 A2 失效，不进趋势）
CONSUMED: run-context-ZP-gsc-feedback.json @ 2026-10-28 20:13:01（盘上最新） | lane-status.json @ 2026-10-28 | lane-results-bus-contract.md §7.2 | gsc-cliff-2026-10-28.json | GSC数据/index.json @ lastBuild 2026-10-10 | GSC数据/ 目录全量 113 文件（最新批 2026-10-23）
DELIVERED: .hermes/logs/2026-10-29-ZP-gsc-feedback.md（本报告；无新异常 JSON——无新数据，10-28 的 gsc-daily-anomaly-2026-10-28.json 仍为权威清单）
NEXT: 今晚 2026-10-29 20:13 定时轮命中同幂等键（0453ab66a64d9edd）→ 分析跳过，仅复核本报告 + 数据缺口是否补位；K3 导出清单见 §3，导出后次轮复算 108.3% 是否成立
IDEMPOTENCY: 本轮手动键 = sha256("ZP-gsc-feedback|run|lane-default|2026-10-29")[:16] = 0453ab66a64d9edd；已按 harness-lane 先例写入 lane-runs.jsonl（source=harness-lane），今晚 20:13 轮将命中同键 → 跳过重分析（防双交付，§0.28 1 cron 1 交付物）
COVERAGE: VERIFICATION_ONLY / DATA_GAP_REPORTED / 无新结论（A1 WARN_STALE 纪律：数据未到位不写新结论）
CONFIDENCE: LOW（WARN_STALE：28d 档 17 天龄，见 §1.1）
SUCCESS_EVIDENCE: 两件验证均执行（§2）+ 线上探针 3/3 HTTP 200（§2.2）+ 导出清单 §3 + 幂等记录已落总线
RUN: 手动触发（K3 GUI "立即执行" 2026-10-29 01:12；非 schtasks 触发；pwsh 可用，python 不可用——uv trampoline 失败，未重跑 cliff 检测器，读盘上最新 gsc-cliff-2026-10-28.json）

---

## 0. 本轮一句话结论

**两件验证均未到位 → 报数据缺口（附导出清单），不写任何新结论。** ① 新 GSC 导出：无（磁盘最新仍为 2026-10-23 批 = 24h+7d 共 8 件，无 28d/3mo，无 query×page×country 新档）；② `GSC数据/index.json` 重建：无（lastBuild 仍 2026-10-10T22:43，`freshnessStatus=FRESH` 假象持续 → 门童 #9 新鲜度检查继续盲区，A15 升级）。线上页面健康 3/3 HTTP 200（页面在线 ≠ 收录，不做收录推断）。本轮未写矩阵、未改页面、未改共享队列、未推远程（攒批未达阈值，留给今晚车道窗口）。

---

## 1. 数据口径与置信度

### 1.1 数据龄（今日实测，磁盘目录全量核对）

| 数据件 | 覆盖窗口 | 最新日 | 距 10-29 | 判定 |
|---|---|---|---|---|
| `GSC数据/*28天*2026-10-15.xlsx`（cliff 输入） | 28d | 2026-10-12 | **17 天** | 🔴 WARN_STALE（三站点同） |
| `gsc-deep-analysis-2026-10-26.json`（query 级） | 09-28..10-25 | 2026-10-25 | 4 天 | 🟡 边界可用，不作新结论 |
| `gsc-query-country-2026-10-25.json` | 28d 对比窗 | 2026-10-25 | 4 天 | 🟡 |
| `gsc-date-country-56d-2026-10-26.csv` | 56d | 2026-10-23 | 6 天 | 🟡 |
| `GSC数据/*2026-10-23*` 批（8 件） | 24h + 7d | 2026-10-23 | 6 天 | 🟡 但 **7d 档零消费**（A16 未修） |
| 24h realtime（cliff 内 758 imps） | 10-22 | 2026-10-22 | **7 天且被复用** | 🔴 不可作趋势（A2 持续） |

> 无 2026-10-24..10-29 任何新导出（全目录 113 文件按 mtime 核对，最新 = 10-23 批）。按恢复期规则：判读降置信、报告标注数据龄、需 K3 导出新档。

### 1.2 双方法复算（§0.23.2）

本轮无新数据，恢复系数**不做复算**（沿用 10-28 双方法结论：日历日 108.3% vs 24h 冻结 129.5%，差异归因 A2 已定）。两种方法当前一致点 = "无新输入，两者均不可推进"。

---

## 2. 上轮（10-28）NEXT 两件验证结果

### 2.1 验证 ①：新 GSC 导出是否到位 → ❌ 未到位

- 检查：`GSC数据/` 全目录 mtime 扫描 + 文件名正则 `2026-10-2[4-9]` = **0 命中**。
- 现状：最新仍为 10-23 批（24h+7d × 4 组合 = 8 件）；28d 最新仍 10-15 档（止 10-12）；query×page×country 新档无。
- 结论：**数据缺口成立**，导出清单见 §3。

### 2.2 验证 ②：`GSC数据/index.json` 是否重建 → ❌ 未重建（A15 升级）

- 实测：`lastBuild=2026-10-10T22:43`、`latestFreshData=2026-10-09`、`filesByDate` 最大键 `2026-10-09`，却仍标 `freshnessStatus=FRESH/stalenessDays=1`。磁盘已有 10-15/16/19/23 导出（对该 index 检索 = 0 命中）。
- 后果：`scripts/guards/gsc-source-guard.js` L147 只在 `STALE` 时报 → 门童 #9 检查② 持续假阴性；**A15 从"待修"升级为"19 天未修"**（C6）。
- 边界：不手改 index.json（派生文件须生成器重建，SOP-5；仓内未见重建器 → 需 owner 指明生成路径或补 `--rebuild-index`）。

### 2.3 附带：线上页面健康（页面在线 ≠ 收录）

`https://zprintpro.com/ja/nengajo-2027/` = HTTP 200 · `/zh-hk/category/envelopes/` = HTTP 200 · `/en/category/stickers/` = HTTP 200。仅证明页面正常渲染，**不做收录/索引推断**（无 GSC Pages/Index 导出、无 API）。

---

## 3. 数据缺口导出清单（给 K3 / 数据 owner）

| # | 需要导出 | 口径 | 为什么 |
|---|---|---|---|
| 1 | 三站点 × 28d（hk/jp/us + 汇总） | date×page，最新日 ≥ 2026-10-26 | 28d 现止 10-12（17 天龄），cliff 输入与 §0.37 四指标都依赖 |
| 2 | query × page × country 全量 | 28d 当前窗 + 前窗对比 | 上轮 10-25 已 4 天龄，锁词/异常/内耗表的主证据 |
| 3 | 24h 实时（今日导出） | 24h 滚动窗 | 打破 A2 冻结输入（758 imps 已复用 4 轮） |
| 4 | 3mo 窗（若可行） | 28d 对比 | 10-09 大脑指令 #5 连续两档缺品牌长窗对照 |
| 5 | `GSC数据/index.json` 重建 | 生成器重建（非手改） | A15/C6：门童 #9 恢复报警能力的唯一路径 |

导出后：次轮按同口径复算 108.3% 是否成立、更新锁词/CTR 池/带钱词首页计数。

---

## 4. §0.37 四指标 + 带钱词（引用 10-26 面板，数据龄标注，不作新结论）

> §0.37 口径：只盯 点击次数 / 总曝光次数 / 平均点击率 / 平均排名（date×page）+ 带钱词排名 + 首页词数 + 关键词行数；**不含 GA4 / 008 / 订单**（线下处理，红线不接入）。

| 站点 | 展示 | 点击 | CTR | 平均排名 | 数据龄 |
|---|---|---|---:|---:|---:|---|
| 全站 | 23,014 | 461 | 2.00% | 16.4 | 面板 10-26 生成，date 止 10-23 |
| zh-hk | 15,605 | 366 | 2.35% | 17.5 | 同上 |
| en | 5,307 | 55 | 1.04% | 13.4 | 同上 |
| ja | 2,078 | 36 | 1.73% | 16.7 | 同上 |

- 带钱词 23 词首页命中：**6/23**（zh 2/9 · en 3/8 · ja 1/6）—— 引用 10-28 报告 §3 实测（面板 10-26 口径），无新数据不重算。
- 关键词行数：zh 582 / en 580 / ja 168；首页（≤10）词数：zh 242 / en 187 / ja 50（同上引用）。
- **以上全部为引用值，数据龄 3-6 天，仅作连续观察的锚点，不构成新结论**（A1 纪律）。

---

## 5. 锁词 / 异常 / 队列状态（无新数据 → 沿用 10-28 权威清单，仅状态更新）

| 项 | 10-28 状态 | 今日状态 |
|---|---|---|
| 8 锁词追踪（任务 J） | 貼紙印刷 39.91 失守最明确；即日印刷 6.90 唯一首页有点击 | 无新数据 → **沿用，不新增**（数据到位前不判定"再失守/回升"） |
| 异常 16 类（A1-A16） | `gsc-daily-anomaly-2026-10-28.json` 权威 | 引用；A15 升级（19 天），A16 未修（7d 零消费），A1 数据龄 +1 天 |
| 机会队列 / CTR 池 / 退场 / 内耗 | 10-28 §6 全表 | 沿用；**不追加新候选**（无新数据 = 无新证据） |
| 候选任务 C1-C7 | 全 OPEN | C6（index 重建）**升级为 P1-19 天**；C7（7d 消费）未执行；C1/C2/C3/C5 待 11/1-11/6 验证点；C4 待 11/3 |

---

## 6. 未做 / 红线声明（本轮）

- ❌ **未回灌 matrix**（`industry-keyword-matrix.json` 最后回灌 = 10-15 轮，mtime 2026-10-15 22:47）：理由 = ① 恢复期"先保恢复再谈增长"（prompt 恢复模式块 ⑥ 降级类）；② 数据缺口（priority_boost 判定需要 30/90 天趋势，28d 档 17 天龄，§0.23 禁旧数据新结论）；③ 契约 §7.2（GSC feedback 只更新证据/异常/候选任务，不得直接改页面）。
- ❌ 未改 `src/`、title/desc、301、贺卡资产、middleware。
- ❌ 未改 `strategy-task-queue.json`（10-28 复核车道写入，§7.2 跨车道避让）。
- ❌ 未改 `gsc-daily-anomaly-2026-10-28.json` / `gsc-pipeline-health-2026-10-28.json` / `gsc-cliff-2026-10-28.json`。
- ✅ **写入 1 行 lane-runs.jsonl（harness-lane 先例）**：仅幂等记录（key 0453ab66a64d9edd），目的是让今晚 20:13 定时轮命中同键跳过重分析，防同一日双交付/双报告（§0.28）。此为总线写入的最小必要动作，非伪造运行。
- ⚠️ 未推远程：本轮改动 = 1 报告 + 1 总线行 + lane-status 刷新（docs 级，攒批未达阈值 §0.25.9）→ commit 留本地，push 由今晚车道窗口自然携带。

---

## 7. 下一验证点

| 日期 | 验证什么 | 成功阈值 |
|---|---|---|
| **今晚 2026-10-29 20:13**（定时轮） | 幂等键 0453ab66a64d9edd 命中 → 分析跳过；若 K3 已补导出则复核 §2 两项 + 复算 108.3% | 不产生第二份 10-29 分析结论；有导出则按 §3 清单核对 |
| 2026-11-01 | 教科書 印刷 churn 诊断（月复盘） | 分清索引/内耗/意图 |
| 2026-11-03 | KPI 面板 join 修复（C4）；GEO 探针（既有 SCHEDULED 不代跑）；C6 重建后门童 #9 复跑 | 貼紙/月曆不再"无记录"；门童 #9 在旧档上正确报 STALE |
| 2026-11-04 | 年賀状簇上线后 14 天；貼紙印刷 14 天位次 | 年賀状有展示即报胜；貼紙 ≤25 |
| 2026-11-06 | 海報印刷 结构裁决后 14 天 | 类目占比升、查询 CTR 回升 |

---

## SOP-10 5 问门禁 (K3 §0.22)

- [x] 1. **架构差异?** 已查前序实现路径：GSC 链路 = UI 导出 xlsx → cliff-detector / deep-analysis → k3-kpi-panel；本轮只读目录/JSON/MD + 线上 HEAD 探针，不新建管道、不改 schema。
- [x] 2. **约束适用范围?** 已查拍板原文：契约 §7.2（只更新证据/异常/候选任务，不改页面，不改 WAITING_K3/BLOCKED_INFRA/SCHEDULED→READY）；恢复模式块（先保恢复再谈增长）；§0.37（无 GA4/008/订单）。未替 K3 扩权。
- [x] 3. **原数据/拍板来源?** 每个数字带文件名+窗口+日期（§1.1/§4）；恢复系数沿用 10-28 双方法结论并写明"无新输入不复算"；无估算 baseline、无"约/预计"。
- [x] 4. **字段值策略?** 不触及 certNo / validUntil / issuer / 联系方式，N/A。
- [x] 5. **Markdown 渲染?** 产物为内部报告，无 user-facing `[text](url)` 渲染，N/A。

---

## 数据来源 (K3 §0.23 / §0.33)

```
数据来源:
- GSC数据/ 目录全量扫描 (2026-10-29 01:13, 113 文件; 最新批 2026-10-23 = 24h+7d 共 8 件, 无 28d/3mo; 无 10-24..10-29 导出)
- GSC数据/index.json (lastBuild 2026-10-10T22:43; latestFreshData 2026-10-09; freshnessStatus=FRESH 假象 → A15 19 天)
- .hermes/logs/gsc-cliff-2026-10-28.json (盘上最新 cliff; 28d 档止 2026-10-12; 24h 档窗 10-22 冻结)
- .hermes/logs/gsc-deep-analysis-2026-10-26.json (query 级, 止 2026-10-25)
- .hermes/logs/gsc-query-country-2026-10-25.json (28d 对比窗)
- .hermes/logs/k3-kpi-panel-2026-10-26.md/.json (2026-10-27T03:50:42Z 生成; §4 引用值出处)
- .hermes/logs/gsc-daily-anomaly-2026-10-28.json + gsc-pipeline-health-2026-10-28.json (10-28 权威异常/候选清单, 本轮未改写)
- .hermes/logs/2026-10-28-ZP-gsc-feedback.md (上轮报告: NEXT 两件验证即本节 §2 的输入)
- .hermes/logs/run-context-ZP-gsc-feedback.json (2026-10-28 20:13:01 版)
- .hermes/cron-prompts/lane-results-bus-contract.md §7.2 (GSC feedback 职权边界)
- .hermes/industry-keyword-matrix.json (mtime 2026-10-15 22:47; last_gsc_feedback_update=2026-10-15; 本轮未写)
- 线上探针: zprintpro.com/ja/nengajo-2027/ + /zh-hk/category/envelopes/ + /en/category/stickers/ (HEAD, 2026-10-29 01:14, 全 HTTP 200; 页面在线 ≠ 收录)
- .hermes/logs/lane-runs.jsonl (本轮追加 1 行 harness-lane 幂等记录, key 0453ab66a64d9edd)
校准状态: 待校准 (下次校准 = K3 按 §3 清单导出后; 上轮校准基线 9/3 官方口径 7d 全站 CTR 0.54% 仍为官方参照)
撤回声明: 无 (本轮未撤回任何数字; 未新增任何结论)
```
