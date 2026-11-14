# 2026-11-14 · ZP-gsc-feedback 车道报告（无 11-13/14 导出 · 11-12 批隔夜晚到已由 k3 11-13 消费 · 四个 READY 测量任务在数据日 11-10 上定性 · 11-14 首轮复测 **BLOCKED** · A53 键名回归复验 PASS）

VERDICT: PARTIAL
RECOVERY: **63.93% — `DERIVED_NOT_DETECTOR`**（11-12 批 24h **578** ÷ 28d 日均 **904.14**；批龄 **52.2h**，**不是今日读数**）
RECOVERY_STATUS: **DATA_STALE_NO_NEW_24H** — 无 11-13/14 导出，24h 窗仍止于 11-12T16；detector 未运行（pwsh 计算禁用）
RECOVERY_SERIES: full-country：10-29 **105.8%**（793）→ 10-30 **117.7%**（888）→ 11-03 **123.7%**（977，最后官方）→ 11-07 **96.98%**（803，DERIVED）→ 11-10 **130.0%**（1,124，DERIVED）→ 11-11 **105.3%**（940，DERIVED）→ **11-12 63.93%**（578，DERIVED/NEW）
RECOVERY_STREAK: **0/3**（官方点 10-29 / 10-30 / 11-03 不连续；derived 不计入）
RECOVERY_FLAG: **单日 63.9% < 80%**，量级足以请 K3 看，但**不判 CRITICAL_CLIFF**——detector 未跑、单日 24h、周四工作日混杂（11-10 周二 1,124 / 11-11 周三 940）
DATA_STATUS: **NO_NEW_BATCH_2026_11_13_OR_11_14** — 最新 = **11-12 批（隔夜晚到，首消费者 k3 11-13）**；7d/28d 数据日 **11-10**，时龄 **92.2h > 72h** ⇒ **A1 重开确认**
DATA_GATE: **STALE_92.2H**（24h 52.2h；3mo 332.2h；API 236.2h；detector 连续 **11** 日空；index 落后 **4 批 / 7 个数据日**）
KPI_UPDATED: **false**
NO_NEW_DATA: **true**
RETEST_11_14: **BLOCKED_NO_NEW_EXPORT** — 可用窗仅 11-04..11-10（**7d 变更后 28.6–42.9%**；**28d 7.1–10.7%**），不是 11-12/11-13 报告里那个 42.9–57.1% 的「11-14 预测窗」
PAGE_WRITES: 0
CONSUMED: `.hermes/logs/run-context-ZP-gsc-feedback.json` @ **2026-11-14 20:13:02**（preflight **ok / 10-10 checks**；lock pid 24668；`retry_queue` **1** 项 RETRY_OF；本键 `a702483fdfe983cb`；prev bus = 11-12 20:21:32 STALE / wrapper_exit=6）| `.hermes/logs/lane-status.json` @ **2026-11-14 18:17**（**2.0h，新鲜**；bus_records **121**；verdict=ATTENTION；problems=7；gsc 11-13 **MISSING** / 11-14 PENDING；scheduler `Last=11-13 21:32:01 / Result=2147946720`）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6.1/6.3/6.4/7.1/7.2/7.3/7.4/**§8**）| `zprintpro-gsc-feedback-loop.md`（11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块）+ `sop-10-gate.md` | `.hermes/logs/coordination-board.json` @ 20:13:02（**4 个 READY 测量任务**，全部 owner=本车道，baseline=11-12 批 28d）| `.hermes/logs/2026-11-14-queue-reconciliation-audit.json`（10:23，peer）| `.hermes/logs/flywheel-learning-ledger.json` @ 11-10 08:35（只读条目；**仅追加 retest gate 块**）| **`gsc-2026-11-12-four-window-analysis.json`**（权威窗口；自述 11-12 批隔夜到）| **`gsc-2026-11-12-money-keyword-delta.json`**（28d 六导出序列 + 7d 块；`previous_11_11`/`current_11_12`）| **`gsc-2026-11-12-workbook-independent-qa.json`**（54/54 formula match）| `gsc-2026-11-14-retest-run.json`（**11-09 生成的种子，不是今日读数**）| `gsc-daily-anomaly-2026-11-12.json` | `gsc-cliff-2026-11-03.json` | `GSC数据/index.json` + `GSC数据/` 清单（最新 11-12 三档）| `2026-11-13-ZP-k3-review.md`（已消费 11-12 KPI/54 词，本轮不重做）| `2026-11-14-ZP-daily-content.md`（只读对照）| `docs/2026-11-13-priority-pool-attribution-addendum.md`（09-30..10-27 页级归因，明确 stale）| `periodic-review-weekly-2026-11-13.json` | `.git/refs/heads/main` = `.git/refs/remotes/origin/main` = **54117cad** + `.git/logs/HEAD` L690-710 | `SESSION_LOCK.md` 顶部
DELIVERED: `.hermes/logs/2026-11-14-ZP-gsc-feedback.md`, `.hermes/logs/gsc-daily-anomaly-2026-11-14.json`, `.hermes/logs/flywheel-learning-ledger.json`（**只加 `retest_gate_2026_11_14` 块**，未改任何既有条目 verdict）
NEXT: **11-15/11-16** 等 11-13/14 导出（有则恢复可读；无则 A1 继续开）→ **11-18** 首个 **100% 变更后 7d 窗**（四个深位词 + a2 poster 是否止跌 + stickers/flyers 受 11-12 22:55 title 变更 **CONFOUNDED**）→ **11-21** 海报/喜帖主承接份额（需**当前** query×page join）→ **11-28** small batch（US SERP，否则 `SERP_UNAVAILABLE`）→ **12-01** monthly → **12-04** 28d 82.1–85.7% 才可经营判断。**K3 动作 D1/D4**：补 11-13/14 四档 + 重启 7892 代理 + 跑 detector + 重建 index；处理 gsc 调度 `2147946720`（11-13 21:32 被拒且无 11-13 报告）
IDEMPOTENCY: `a702483fdfe983cb`（day 2026-11-14 / intent=`数据供给闸门 + 四个 READY 测量任务定性 + 11-14 复测阻断` / target=`11-12 批（数据日 11-10）+ 4 词`）；与上轮 `d67672ac54a7db55` 不同 ⇒ 换日 + 换目标，合法新工作；`lane-status.warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，**不含本键**
RETRY_OF: **`ZP-gsc-feedback-20261112T202132-28012` → ALREADY_DONE_CONTENT / CLASSIFICATION_ARTIFACT**（11-12 报告是真实 PARTIAL 交付：报告 431 行 + anomaly JSON；host `wrapper_exit=6` 只因「VERDICT 非 OK」；`lane-status` 11-12 日记录已由 legacy OK-only 误判更正为 **PARTIAL**，recovery_plan=`modify_payload`「只处理 NEXT，禁止重做 DELIVERED」。本轮**不重写 11-12 任何文件**，只消费其 NEXT=补数据）
RETRY_DETAIL: 该 retry 项**没有缺失交付物**，也没有 candidate_files ⇒ 不是内容重跑，是 host 分类残留；11-13 k3 报告 §2.1 已独立记录同一结论与本轮 host 补丁。机器 verdict（STALE/quarantined）按契约 §6.3 **保留不改写**
STATUS_GATE: **FRESH**（lane-status 2.0h；不同于 11-12 的 85.5h STALE_STATUS）。problems=7 全为调度器残留（5 条 `2147946720`）+ 2 条 MISSING 日行，**不据此派内容修复**
COVERAGE: **DATA_SUPPLY_GATE + LATE_ARRIVAL_BACKFILL(11-12) + FOUR_READY_MEASURE(数据日 11-10) + RETEST_BLOCK(11-14) + A53_REGRESSION_CHECK + PAGE1_ZERO_CLICK_HANDOFF + RECOVERY_DERIVED(11-12)**
CONFIDENCE: **HIGH**（无 11-13/14 导出 / 数据日 11-10 / 92.2h 时龄 / 11-12 批 lag=2 / A53 键名与 3 条 ENTERED_PAGE_1 一致 / 54-54 QA）· **MEDIUM**（四个词的 28d 序列方向：27/28 重叠、窗口移动、仅 2–3/28 变更后天数）· **LOW**（任何因果、部署成效、恢复/排名改善结论）
RUN: 定时 20:13 轮；**未调用 pwsh 计算面**（detector/API/index/tsc/门禁/xlsx 重解析/schtasks 均未实跑；仅文件直读 + 手算复算）；**零 `src/`、零 title/desc、零 canonical/301、零队列状态翻转、零历史报告改写**

> **为什么是 `PARTIAL` 而不是 `OK`**：本车道的 30 天职责含「每日拉取并检测异常」。今天**没有可拉的批**（11-13/14 导出不存在；唯一最新的 11-12 批已由 k3 11-13 交付 KPI 层），所以 `KPI_UPDATED=false`，11-14 首轮复测也只能判 **BLOCKED**。写 `OK` 会等于「拿 11-12 的读数冒充 11-14 复测结果」，违反 §0.23 与契约 §8.8。
>
> **为什么不是 `NO_OP`**：本轮有真实新增交付（4 个 READY 任务的根因证据与交接、A53 回归复验、首页零点击池 handoff、恢复链新派生点、5 条新异常），且复测**到期被阻断**需要显式记录，不属于「有证据的合法无变更退出」。

---

## 0. 一句话结论

**今天最值钱的事实是「复测到期了，但可用于复测的新数据不存在」——所以正确的动作是把它记成 BLOCKED，而不是把 11-12 批的旧窗口包装成 11-14 的首轮复测。**

三件新事实：

1. **数据面比 11-12 更差，不是更好**：11-12 的三档在当晚两轮之后才落地（k3 11-13 已消费），此后 **11-13、11-14 两天没有任何新导出**。7d/28d 的数据日停在 **11-10**，时龄 **92.2h**，**已越过 72h 线**（A1 由 11-12 的 `PENDING_REOPEN` 变为**确认重开**）；24h 停在 **11-12T16**（52.2h）；3mo 仍是 **11-03**（缺第 4 批）；API 仍是 `end1105`；detector **第 11 日**空；`index.json` 落后 **4 批**。
2. **四个 READY 测量任务在同一个数据日上全部指向「深位化」**：`海報印刷`（28d 286→206 imp、pos 14.94→17.23，四连恶化、点击数恒为 1）、`コミケ 印刷`（173→129 imp、pos 18.99→25.74、0 click）、`教材 印刷製本`（39→56 imp、pos 20.69→36.95、0 click，展示升而位次降=查询集扩张）、`a2 poster`（54→38 imp、pos 17.2→40.0、1 click；7d 平在 43.0 = 深度一致）。**四个都只能 `MEASURE`，一个都不能派 FIX**：当前 query×page join 不存在（`CANNIBALIZATION_NOT_MEASURABLE`），SERP 不可得（`SERP_UNAVAILABLE`），28d 窗仅 2–3/28 天在变更之后。
3. **11-14 的「首轮复测」可用窗比预测更薄**：11-12/11-13 报告假设今天会有新导出（数据日 11-11/11-12），据此写 7d 42.9–57.1%、28d 10.7–14.3%。实际可用窗是 **11-04..11-10**：**7d 28.6–42.9%**、**28d 7.1–10.7%**（A62）。唯一合法的读法是「方向 + 真值一致性」，28d `BACKGROUND_ONLY`，**不 SCALE / 不回滚 / 不二次改动**。

同时如实登记：`gsc-2026-11-14-retest-run.json` 这个**按今天命名**的文件其实是 **11-09 11:54Z** 用 `qc end1103` + `qp 2026-10-31` 生成的种子（A60）——把它当今日复测输出就是伪读数；`2026-11-14-ZP-daily-content.md` 把 11-12 的数据日写成 11-09（A61，措辞，不改对端文件）；gsc 车道 **11-13 整日缺跑**（无 bus 行、无报告），且调度器 11-13 21:32 出现 `2147946720` 被拒（A63）。

---

## 1. STEP 0 · 结果总线消费与 retry 裁决（第 -1 优先级）

### 1.1 `retry_queue` 唯一一项：不是缺交付，是分类残留

| 项 | 事实 | 裁决 |
|---|---|---|
| `RETRY_OF ZP-gsc-feedback-20261112T202132-28012`，reason=「same-day report VERDICT is not exactly OK」 | 11-12 报告 431 行，首段四字段齐；`DELIVERED` = 报告 + `gsc-daily-anomaly-2026-11-12.json`；当日真实结论是「无 11-12 导出 + A53 已闭 + 7d 词级恢复方向可读」。`wrapper_exit=6` / `STALE` 仅因 host 的 OK-only 规则；`lane-status` 11-12 日记录已被更正为 **PARTIAL**，recovery_plan=`modify_payload`，明确「PARTIAL 已有真实交付，不是空转；下轮只处理报告 NEXT，禁止重做 DELIVERED」。11-13 k3 报告 §2.1 独立记同一事实并注明 host 已补丁。 | **ALREADY_DONE_CONTENT / CLASSIFICATION_ARTIFACT**。**不重跑、不重写 11-12 报告/anomaly**；只消费其 NEXT =「补 11-12 之后的导出」。机器 verdict 保留 `STALE/quarantined`（契约 §6.3：历史 verdict 不改写） |

> 结论：**retry_queue 里没有需要重做的内容项**。本轮的新工作量全部来自今天的 4 个 READY 测量任务与 11-14 复测到期，不是「补 11-12」。

### 1.2 幂等与锁

- 本键 `a702483fdfe983cb` ≠ 上轮 `d67672ac54a7db55`；换日 + 换目标 ⇒ 合法新工作。`warnings` 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，不含本键。
- preflight `ok`，10/10 checks（含 `dsh_effective_provider_model=deepseek-official/deepseek-flash`）；`lane.lock` 由本轮持有（pid 24668）；`SESSION_LOCK.md` 无活跃人手锁（11-14 16:3x Kimi 会话已释放；另有一条 2026-10-23 的「持有中」残留，按 30 min TTL 已过期，A64）。本轮**零 `src/` 写入**，不触发 §0.35.7 双条件写入门。
- **协同板构建成功**：`coordination-board.json` `generated_at=2026-11-14T20:13:02+08:00`，4 个 READY 测量任务全部 `owner_lane=ZP-gsc-feedback`；上游 `strategy_queue / blog_queue / lane_status / gsc_delta(11-12) / weekly_review(11-13) / monthly_review(10-28)` 六项 `available:true` ⇒ **不触发「协同板失败必须 BLOCKED」**。`SERP_UNAVAILABLE` 按板规保留，不猜真实展示标题/摘要。

### 1.3 本次「不重做」清单（幂等铁律）

- **不重做** 11-12 的 gsc 交付（报告 + anomaly），**不重写** 11-12 的 PARTIAL 结论。
- **不重做** k3 11-13 已交付的 11-12 四窗 KPI、54 词、5 场线上核验；本报告只引用其数字并明确标注 `CARRIED_2026_11_12_EXPORT`。
- **不重做** 11-12 批的第二次 KPI「今日更新」；同一导出 + 同一 query + 同一 route 只消费一次（契约 §8.2 / 11-13 执行块第 2 条 `LATE_ARRIVAL_BACKFILL`）。
- **不改写** `strategy-task-queue.json`（daily 11-14 刚回写）、`lane-status.json`、`lane-runs.jsonl`、`GSC数据/index.json`、任何 `gsc-2026-11-12-*.json`、任何对端报告、`src/`、`docs/`。

### 1.4 对端与跨车道避让

| 今日他方动作 | 证据 | 本轮处置 |
|---|---|---|
| `c172b3d2` fix(truth) CATALOG-TRUTH-RESIDUAL + `54117cad` daily 11-14 报告/队列 | `.git/logs/HEAD` L709-710；`2026-11-14-ZP-daily-content.md` | **只读**；不改其 src、报告、队列 |
| `d7042647` / `978df830` / `13c4beaf` merchant 结构化数据真值批（人工会话 16:3x 释放） | `SESSION_LOCK.md` 顶部 | **只读**；不声称其已部署/已线上核验；本轮不接 GSC 结论到该批 |
| 11-12 三档 xlsx + 分析 JSON（隔夜/11-13 生成） | `GSC数据/` 清单；`gsc-2026-11-12-*.json` | **只读**；A53 复验只读比对，不改文件 |
| `flywheel-learning-ledger.json`（11-10 08:35，他方维护） | 账本 | **只加自己 owner 的 retest gate 块**；`data_supply` / `window_math` 仍归账本 owner（A58/A57） |
| `docs/2026-11-13-priority-pool-attribution-addendum.md`（09-30..10-27 页级归因） | 报告 §一/§二 | **只读**；本轮引用其 stale 归因时逐处标窗口，不冒充当前 join |

> `run-context.sibling_lanes` 写 daily=`PENDING 21:17`，但 daily 实际已在 **18:17 harness** 跑完并推 `c172b3d2` ⇒ 再次证明 sibling 快照有采集盲点（F13）。本轮据「文件是否被写」自行避让，而不是据 `sibling_lanes` 状态。

---

## 2. 数据面：11-13/14 两天零导出，A1 确认重开

### 2.1 四平面账本（时龄按「数据日次日 00:00」起算，20:13 基准）

| 平面 | 最新档 | 窗口 / 数据日 | 时龄 @20:13 | 判定 |
|---|---|---|---|---|
| xlsx 24h | **11-12（无 11-13/14）** | 11-11T17 → **11-12T16** | **52.2h** | 已冻结；无更新 |
| xlsx 7d | **11-12** | 11-04 → **11-10** | **92.2h** | **> 72h ⇒ STALE（A1 重开）** |
| xlsx 28d | **11-12** | 10-14 → **11-10** | **92.2h** | 同上；**25–26/28 天在变更前** |
| xlsx 3mo | **11-03（carried）** | 08-01 → **10-31** | **332.2h** | 连续第 **4** 批缺（11-07/11-10/11-11/11-12） |
| API query×country | `gsc-query-country-28d-end1105.csv` | 数据日 **11-04** | **236.2h** | STALE；7892 代理仍未复 |
| detector | **无 11-04..11-14 档** | 最后 = 11-03 | **11 日空** | `available:false`；pwsh 计算禁用，不重试 |
| index.json | `lastBuild=11-05 07:38` | `latestFreshData=11-03` | 落后 **4 批 / 7 个数据日** | **A47 复发 4**；门童 #9 会误判 |

- **「11-13/14 无导出」双方法**：① 全仓 glob `**/*2026-11-13*` 只有 docs/报告，**无任何 GSC xlsx/分析 JSON**；`GSC数据/*2026-11-14*` **0 命中**；② `GSC数据/` 目录清单最新三档均为 `…-2026-11-12.xlsx`。peer daily 11-14 亦记无新导出。不是「没找到」，是**文件不存在**。
- **11-12 是晚到批（`LATE_ARRIVAL_BACKFILL`）**：该批在 11-12 两轮（20:13 gsc / 21:17 daily）判「无批」之后落地，**11-13 07:16 由 ZP-k3-review 首次消费**（KPI + 四窗 + 54 词 + 5 URL）。本轮**不再交付同一 KPI**，只用它做 4 个 READY 任务的测量层。`content_hash` 因沙箱无哈希工具记为 `null`，身份锚定 = 工作簿文件名 + 窗口 + 独立 QA（54/54 formula match）。
- **口径纠正（A57 延续）**：11-12 导出 → 7d/28d 数据日 **11-10**，即 **lag 2**；11-10→11-07、11-07→11-04、11-03→10-31、10-30→10-27 是 lag 3。**lag 仍非常量**，任何「导出日 − 3」的写法都不成立。
- **`index.json` 自述 `stalenessDays=2 / FRESH` 是 11-05 构建时的旧值**，与 `latestFreshData=11-03` 冲突；不得引用为今日新鲜度。

### 2.2 `11-12` 批的四指标（CARRIED，不是今日新读数）

| 档 | 窗口 | 点击 | 展示 | CTR | 平均排名 | 时龄 | 状态 |
|---|---|---:|---:|---:|---:|---|---|
| 24h | 11-11T17 → 11-12T16 | **7** | **578** | 1.2111% | 11.8528 | 52.2h | FROZEN |
| 7d | 11-04 → 11-10 | **149** | **7,651** | 1.9475% | 13.5641 | 92.2h | **STALE** |
| 28d | 10-14 → 11-10 | **560** | **25,316** | 2.2120% | 14.5482 | 92.2h | **STALE** |
| 3mo | 08-01 → 10-31（11-03 档） | 1,279 | 65,252 | 1.9601% | 17.3550 | 332.2h | CARRIED |

**上批（11-11）→ 本批（11-12）**（窗口滑动：7d 重叠 6/7、28d 重叠 27/28，只作方向）

| 档 | Δ点击 | Δ展示 | ΔCTR | Δ排名（负=改善） |
|---|---:|---:|---:|---:|
| 24h | **−10（−58.8%）** | −362（−38.5%） | −0.5974pp | +0.2255（退） |
| 7d | −9（−5.7%） | **+123（+1.6%）** | −0.1513pp | **−0.3882（改善）** |
| 28d | −7（−1.2%） | **+319（+1.3%）** | −0.0563pp | −0.0302（改善） |

- **口径**：7d/28d 展示与位次微升、点击与 CTR 回落 ⇒「展示还在、平均位次未全面恶化、点击/CTR 回落」。**不得**写成「全站排名下跌」，也**不得**写成「恢复/胜出」。
- **双方法**：手算 CTR 7/578=1.2111%、149/7,651=1.9475%、560/25,316=2.2120% 与 JSON 一致；`workbook-independent-qa.json` 的 Summary J6/K6…J8/K8 全部 `match=true`，54/54 focus formula 行一致。

---

## 3. 11-14 首轮复测：到期，但没有可用于复测的新数据

### 3.1 事实链

| 项 | 事实 |
|---|---|
| 复测到期 | 账本 10 个 `owner_lane=ZP-gsc-feedback` 实验的 `retest.first` = **2026-11-14**（含 flyers / poster primary / wedding primary / ja doujin / ja textbook / en A2 / catalog H1 / catalog desc / sticker third window / books dual page） |
| 可用数据 | **数据日 11-10**（11-12 批），7d = 11-04..11-10、28d = 10-14..11-10 |
| 变更日 | C1 = 2026-11-08 部署；C2 = 2026-11-09 12:44 改动 |
| 变更后天数（**实际可用窗**） | 7d：C1 **3/7 = 42.9%**，C2 **2/7 = 28.6%**；28d：C1 **3/28 = 10.7%**，C2 **2/28 = 7.1%** |
| 11-12/11-13 报告里的「11-14 预测」 | 7d 42.9–57.1% / 28d 10.7–14.3%，前提是今天有数据日 11-11/11-12 的新导出 —— **前提未成立** |
| 种子文件陷阱 | `gsc-2026-11-14-retest-run.json` 生成于 **2026-11-09T11:54Z**，输入 `qc end1103`（数据日 11-03）+ `qp 2026-10-31`（页级窗 09-30..10-27），baseline 写的是 28d to 11-07 —— **它是预测种子，不是今天的结果**（A60） |

### 3.2 裁决

- **`BLOCKED_NO_NEW_EXPORT`**：不产出 11-14 复测胜负；不把 11-12 批的 delta 改名成「11-14 首轮复测」。
- 四个 READY 任务在 **export 2026-11-12 / data day 2026-11-10** 上的读数照常登记（§4），但标注 `MEASUREMENT_POINT=2026-11-12`，**不是**实验终点。
- 账本只追加 `retest_gate_2026_11_14`：10 个实验 `retest_status=BLOCKED` + 原因 + K3 动作；**不修改任何既有条目 verdict**（DEPLOYED/HOLD/MEASURE 是部署史，不因复测阻断被抹掉），并在块内写明这一取舍（契约 §8.3 的「只写自己条目」+ §8.8 的「复测项写 BLOCKED」两者同时满足）。
- **决策级窗口不变**：7d 首个 100% = **2026-11-18**；28d 已达 82.1–85.7% = **2026-12-04**；干净 28d = **2026-12-10**。

---

## 4. 四个 READY 测量任务（数据日 2026-11-10）

> 全部 `source=latest_gsc_delta`、`owner_lane=ZP-gsc-feedback`、`approval_gate=Measurement only … No automatic article/canonical/redirect`、`write_scope=[".hermes/logs/","docs/"]`。本轮**只写 `.hermes/logs/`**，`docs/` 未动。
> 共同口径：**all-country query rows；无 query×page/country join**；28d 序列 = 6 个连续导出、相邻窗重叠 27/28；7d = 11-11→11-12 两批、重叠 6/7；单行样本小。

### 4.1 汇总

| task_id | 词 | 28d（11-12）imp / clk / CTR / pos | 7d（11-04..11-10）imp / clk / pos | 28d 六导出轨迹（pos） | 方向 |
|---|---|---|---|---|---|
| `…f2bc40ee31` | **海報印刷** | 206 / 1 / 0.4854% / **17.23** | 32 / 0 / 19.88 | 14.94 → 14.41 → 14.83 → 15.55 → 16.49 → **17.23** | 四连恶化（−28.0% imp，clk 恒 1） |
| `…4c5ebffbea` | **コミケ 印刷** | 129 / 0 / 0% / **25.74** | 12 / 0 / 22.75 | 18.99 → 22.04 → 22.88 → 23.97 → 24.96 → **25.74** | 五连恶化（−25.4% imp） |
| `…ffa9859a1b` | **教材 印刷製本** | 56 / 0 / 0% / **36.95** | 11 / 0 / 55.09 | 20.69 → 28.67 → 31.49 → 34.32 → 35.51 → **36.95** | 五连恶化（+43.6% imp = 查询集扩张） |
| `…99d055a272` | **a2 poster** | 38 / 1 / 2.6316% / **40.00** | 11 / 0 / 43.00 | 17.20 → 18.68 → 25.80 → 29.75 → 38.92 → **40.00** | 五连恶化（−29.6% imp；7d 平在 43.0） |

共同判读：**四个词全部是「深位化」而不是「摘要/CTR 故事」**——28d 平均位次 17–40，点击合计 2（海報 1 + a2 1），CTR 0–2.63%。在 17 位以后谈 title/desc 改写是没有证据的；首页零点击池另见 §6。
> **方向标签说明**：协同板的 `two_window_direction` 以 **28d 两窗**为准；`海報印刷` 的 7d 是 **STABLE**（19.65→19.88，+0.23）、`a2 poster` 的 7d 是 **STABLE**（43.27→43.00，−0.27），与 28d 恶化不矛盾，也**不得**据此判改善。

### 4.2 逐任务输入包（契约 §6.2 字段）

#### A. `GSC-MEASURE-2026-11-14-f2bc40ee31` · 海報印刷（posters-zh-hk）

- **INTENT**：为已确认的两窗恶化词记录根因证据与可比基线，判断是否进入 FIX。
- **APPROVED_BY**：K3 2026-11-08 01:38 主承接 URL 拍板（只覆盖 URL 选择，不覆盖 title 改写）；本任务 approval_gate = measurement only。
- **TARGET**：query `海報印刷`（all-country row；主承接 `/zh-hk/category/posters/`）。
- **INPUT_EVIDENCE**：`gsc-2026-11-12-money-keyword-delta.json` 28d 六导出（286→278→261→248→224→206；14.94→17.23；clk 恒 1）；7d 31→32 imp、19.65→19.88；stale 页级归因（09-30..10-27）：567 imp 分散 6 URL，category **64（11.3%）**、blog guide **210（37.0%）**、a2 PDP **93（16.4%）**、retail blog 60（10.6%）、poster-buying blog 55（9.7%）、home 51（9.0%）。
- **WRITE_SCOPE**：`.hermes/logs/`（本轮已写报告 + anomaly + 账本 gate 块）。
- **DO_NOT_TOUCH**：title；canonical/301；海报/喜帖主 URL（K3 已拍）；`docs/` 对端文件；`src/`。
- **TRUTH_SOURCE**：GSC 11-12 批 + 已拍板主 URL；**无当前 query×page join**。
- **ACTION**：登记方向与承接份额假设；**不派 FIX**；11-21 用当前 join 复测份额。
- **GATES**：双方法（六导出序列 vs 28d/7d 算术 + 54/54 QA）；样本闸门；无 SERP 不推断。
- **ONLINE_VERIFY**：`9acc3d16` 曾 4/4 PASS（11-08）；本轮**未重验**，不声称今日线上状态。
- **STOP_IF**：出现「改 title 就能修 17 位」的证据缺失；份额 join 仍不可得 ⇒ 继续 HOLD。
- **NEXT_CHECK**：2026-11-21（份额）/ 2026-12-04（28d）。

#### B. `GSC-MEASURE-2026-11-14-4c5ebffbea` · コミケ 印刷（comiket-ja）

- **INTENT**：判断 5 个连续导出的单调下滑是排名损失、需求时点，还是查询集变化。
- **APPROVED_BY**：measurement only；CT-20261113-D5/D6 只治真值层。
- **TARGET**：query `コミケ 印刷`（ja；C109 = 2026-12-29..31 在前方）。
- **INPUT_EVIDENCE**：28d 173→170→163→146→134→129（−25.4%）；pos 18.99→25.74（+6.75）；6 个导出全部 0 click；7d 14→12 imp、18.36→22.75（+4.39）；11-08 单位改动 `74ffa5a9` 只覆盖 3/28 天。
- **WRITE_SCOPE**：`.hermes/logs/`。
- **DO_NOT_TOUCH**：活动日期/截稿承诺（未核实前禁写）；新建同人簇页面；title。
- **TRUTH_SOURCE**：GSC 11-12 批；C109 官方日期（既存）；无 query×page join，无 ja 页级行。
- **ACTION**：MEASURE；season window 继续观察；与 `ZP-blog-deepfix` 的 JA-C109/education 真值任务**分离**（后者 READY_NOT_EXECUTED，是文本真值，不是排名救援）。
- **GATES**：样本 129/12 imp 足够判方向、不足以判因果；不把 11-08 单位改动当因。
- **ONLINE_VERIFY**：`74ffa5a9` 曾 4/4 PASS（11-08）；本轮未重验。
- **STOP_IF**：无法区分「需求下滑」与「排名下滑」而仍被要求下 STOP/SCALE ⇒ 拒绝。
- **NEXT_CHECK**：2026-11-21 / C109 季窗。

#### C. `GSC-MEASURE-2026-11-14-ffa9859a1b` · 教材 印刷製本（ja education）

- **INTENT**：确认「展示升、位次降」是否查询集扩张，并判断是否需要在 decision-grade 窗做簇诊断。
- **APPROVED_BY**：measurement only；无新 K3 需求。
- **TARGET**：query `教材 印刷製本`（ja）。
- **INPUT_EVIDENCE**：28d 39→46→51→53→57→56（+43.6%）；pos 20.69→36.95（+16.26）；0 click；7d 13→11 imp、48.31→55.09（+6.78）；11-08 价格真值 `74ffa5a9` 仅 3/28 天。
- **WRITE_SCOPE**：`.hermes/logs/`。
- **DO_NOT_TOUCH**：title；价格真值；`教科書印刷`（不同词）的 churn 规则不套用。
- **TRUTH_SOURCE**：GSC 11-12 批；价格真值已批。
- **ACTION**：MEASURE；若 11-21 后仍在 30+ 位且 0 click，交 monthly/k3 做簇级诊断（带冻结基线）。
- **GATES**：双窗同向（28d + 7d 都恶化）；小样本已标；不把「展示增长」读成「表现改善」。
- **ONLINE_VERIFY**：`74ffa5a9` 曾 4/4 PASS；本轮未重验。
- **STOP_IF**：把「+43.6% 展示」当成功或当失败的单指标结论 ⇒ 拒绝。
- **NEXT_CHECK**：2026-11-21 / 2026-12-04。

#### D. `GSC-MEASURE-2026-11-14-99d055a272` · a2 poster（en）

- **INTENT**：确认 28d 位次崩塌（17.2→40.0）是否真实深度衰减，并锁定复测窗。
- **APPROVED_BY**：measurement only；A2 价格真值（HK$16 / A1 HK$20）已拍，不再改价。
- **TARGET**：query `a2 poster`（en）。
- **INPUT_EVIDENCE**：28d 54→59→49→48→39→38；pos 17.20→18.68→25.80→29.75→38.92→40.00；clk 1；7d 11→11 imp、43.27→43.00（STABLE）；相邻 28d 窗重叠 27/28 ⇒ 22.8 位变化不可能是纯窗口错位；11-08 EN A2 H1/MOQ 变更仅 2–3/28 天；stale 10-31 归因把 `/zh-hk/product/a2-posters/` 挂在中文 `海報印刷` 下，**en 的承接 URL 未被验证**。
- **WRITE_SCOPE**：`.hermes/logs/`。
- **DO_NOT_TOUCH**：title（含 A2 价格文案，已由前批处理）；价格源；canonical/301。
- **TRUTH_SOURCE**：GSC 11-12 批；products.ts 价格真值；无当前 query×page join。
- **ACTION**：MEASURE；11-18 用 100% 7d 窗确认止跌；若仍深位，monthly 复评 EN A2 landing（不回滚价格）。
- **GATES**：7d/28d 不冲突（都指向深位）；不把 7d 的「平」当改善。
- **ONLINE_VERIFY**：本轮**未**抓 A2 线上页；标注 `PENDING`。
- **STOP_IF**：没有当前 join 却要断言「a2-posters PDP 承接该词」⇒ 拒绝。
- **NEXT_CHECK**：2026-11-18 / 2026-12-04。

### 4.3 交接（每项含 owner / baseline / action / gate / retry / deploy / verify / retest / exit）

| 项 | owner_lane | baseline（export 11-12 / data day 11-10） | required_action | approval_gate | retry_at / cooldown | production_deploy / online_verify | retest | exit_criteria |
|---|---|---|---|---|---|---|---|---|
| 海報印刷 | ZP-gsc-feedback → monthly（份额） | 28d 206 / 1 / 17.23；7d 32 / 0 / 19.88 | 11-21 用**当前** query×page join 复测 category 份额；不改 title | K3 11-08 主 URL 拍板 + measurement only | 11-21 / 14d | `9acc3d16` / 4-4 PASS（11-08，今日未重验） | 11-21 / 12-04 | 份额向 blog 收敛；否则复评选型，不回滚 |
| コミケ 印刷 | ZP-gsc-feedback → monthly（季窗） | 28d 129 / 0 / 25.74；7d 12 / 0 / 22.75 | 季窗前继续测量；与 JA-C109 真值任务分离 | measurement only | 11-21 / 14d | `74ffa5a9` / 4-4 PASS（11-08） | 11-21 / C109 窗 | 位次止跌或需求被证；否则 monthly 决策 |
| 教材 印刷製本 | ZP-gsc-feedback → monthly | 28d 56 / 0 / 36.95；7d 11 / 0 / 55.09 | 11-21 复读；30+ 位且 0 click 进簇诊断 | measurement only | 11-21 / 14d | `74ffa5a9` / 4-4 PASS（11-08） | 11-21 / 12-04 | 位次回升或查询集解释；否则簇级决策 |
| a2 poster | ZP-gsc-feedback → monthly | 28d 38 / 1 / 40.00；7d 11 / 0 / 43.00 | 11-18 100% 7d 窗确认止跌；不改 title | measurement only；价格已拍 | 11-18 / 7d | `74ffa5a9` / 未重验 | 11-18 / 12-04 | 深度稳定；否则复评 EN A2 landing |

> **本批零派单**：4 项都写 `MEASURE`，不写 FIX/SCALE/STOP，不改队列任何 status（契约 §6.1 / §7.2 / §8.4）。

---

## 5. 首页零点击池 → 给 weekly 的 CTR 证据（11-12 批，28d）

| # | 词 | imp | clk | pos | 备注 |
|---|---|---:|---:|---:|---|
| 1 | **食品包裝印刷** | 107 | 0 | 8.53 | 池内最大；页一零点击 |
| 2 | **small batch sticker printing** | 21 | 0 | 7.29 | imp 20→21，pos 7.15→7.29 |
| 3 | **卒アル販売** | 16 | 0 | 5.00 | 连续 6 个导出 16/5.0 不动 |
| 4 | **證書印刷** | 7 | 0 | 10.00 | **ENTERED_PAGE_1** |
| 5 | **书籍印刷** | 5 | 0 | 7.60 | 11-10 才首次出现行；样本极小 |
| 6 | **saddle stitch booklet printing** | 1 | 0 | 4.00 | 样本闸门（1 imp） |
| — | **合计** | **157** | **0** | — | 上批 5 词 / 147 imp；+10 imp、+1 词 |

- **可用的 CTR 假设只在前 3 个词**：食品 107 / small batch 21 / 卒アル 16；`書籍 5` 与 `saddle 1` 属样本闸门，**不构成证据**。
- **SERP 仍不可得**（A54/SERP 第三条路径在 11-13 已判无效）：**先记真实 SERP feature/title/snippet，再谈单变量摘要改写**；本车道不写 title，不派单。
- 交 **ZP-weekly-meta** 下一自然轮（11-20）作为 proposal 输入；不得据此直接改 meta。

---

## 6. 恢复链（官方 123.7% 不变，新增 11-12 派生点 63.93%）

- **官方最后值 123.7%**（`gsc-cliff-2026-11-03.json`，977 ÷ 789.8，full-country）；detector 自 11-04 起 **11 日无档** ⇒ `available:false`。**不把 63.93% 与 123.7% 串成同一条官方曲线**。
- **新派生点**：11-12 24h 578 ÷ 11-12 28d 日均 904.1429 = **63.93%**，标签 `DERIVED_NOT_DETECTOR`。这是本批**唯一新增**的恢复读数，且是单一 24h、周四、无 detector 校验。
- **派生点全表**：11-07 96.98%（803/827.96）、11-10 130.0%（1,124/864.82）、11-11 105.3%（940/892.75）、**11-12 63.93%（578/904.14）**；全部 `DERIVED_NOT_DETECTOR`。
- **streak = 0/3**：官方点 10-29 / 10-30 / 11-03 不连续（缺 10-31..11-02）；derived 不计入。
- **UNKNOWN 三项**：人工处罚状态 / 排名恢复 / 索引覆盖率 —— 今日无处罚页核验、无索引 sheet，**不编造**。
- **spam 恢复周报（本周节）**：曲线仍是 96.98 → 130.0 → 105.3 → **63.93** 的宽幅震荡，且四个点星期结构不同；**一句结论：恢复状态仍不可判定，今日量级下行需 K3 在补数据后复核。**

---

## 7. A53 回归复验（本轮新做，PASS）

| 检查 | 结果 |
|---|---|
| 键名 | `gsc-2026-11-12-money-keyword-delta.json` 的 7d 块为 `previous_11_11` / `current_11_12`，抽样行（食品包裝印刷 / 即日印刷 / 海報印刷 / コミケ 印刷 / 教材 印刷製本 / a2 poster / 卒アル販売=NO_COMPARABLE_BASELINE）逐条正确 |
| 第二方法 | `page1_transitions_7d` = `["可移貼紙","small batch sticker printing","doujinshi printing"]`；7d 块恰好 3 条 `ENTERED_PAGE_1`（可移貼紙 / small batch sticker printing / doujinshi printing）⇒ 两法一致 |
| 独立 QA | `all_independent_checks_match=true`；`focus_formula_rows=54`、`matches=54`、`errors=[]` |
| 值链抽检 | 食品包裝印刷 7d：`previous_11_11` = 24 imp / 8.71 → `current_11_12` = 27 imp / 8.33，`delta_position` = **−0.38**（与 8.33 − 8.71 一致）；即日印刷 15 imp / 8.53 → 13 imp / 8.38，`delta_position` = **−0.15**（一致） |

- **结论**：A53 `CLOSED_VERIFIED` 保持，**本批未回归**。
- **残留风险**：clone 链生成器仍是同类缺陷源；下一批（11-13/14）生成后必须**再断言**键名与值链（契约 §8.8 / 11-12 报告 §3）。

---

## 8. 异常状态迁移

### 8.1 今日关闭 / 通过

| ID | 11-12 状态 | **11-14** | 依据 |
|---|---|---|---|
| A53 MONEY_7D_BLOCK_STALE | CLOSED_VERIFIED | **REGRESSION_CHECK_PASS** | §7 三方法一致 |
| A51 FLYERS_TITLE_OVER_BAND | OPEN_OVERDUE_DAY8 | **CLOSED_TITLE_LAYER（他车道）** | 11-12 22:55 `ae277dfa` 上线；11-13 k3 线上实测 en 55 / ja 56 / zh 56；本轮**只读，不重验** |

### 8.2 今日重开 / 复发

| ID | 11-12 状态 | **11-14** | 依据 |
|---|---|---|---|
| **A1 DATA_STALE** | PENDING_REOPEN（11-13 00:00） | **REOPENED_CONFIRMED** | 无 11-13/14 导出；7d/28d 92.2h |
| **A2 FROZEN_24H** | REOPENED_DAY1 | **REOPENED_DAY2** | 24h 窗止 11-12T16（52.2h） |
| **A36 XLSX_NOT_REFRESHED** | REOPENED | **RECURRENCE_2** | 11-13/14 无工作簿 |
| **A44 DETECTOR_RUNTIME** | OPEN_DAY9 | **OPEN_DAY11** | `gsc-cliff-*` 止于 11-03；pwsh 计算禁用 |
| **A47 GSC_INDEX_NOT_REBUILT** | RECURRENCE_3 | **RECURRENCE_4** | 4 批未收录；`latestFreshData=11-03` |
| **A54 GEO_PROBE_OWNER_CONFLICT** | OPEN_OVERDUE_9D | **OPEN_OVERDUE_11D** | 队列 `next_check=2026-11-03`；两 owner 都没跑 |
| **A58 LEDGER_DATA_SUPPLY_STALE** | NEW P3 | **STALE_DAY4** | 账本仍写 `latest_xlsx=11-07`，要求导出 11-08/09/10；11-10/11/12 已落 |
| **A43 RUN_GAP** | PARTIAL | **PARTIAL + gsc 11-13** | gsc 11-13 无 bus 行、无报告；monthly 仍 11-01 起缺 |

### 8.3 今日新开

| ID | 级别 | 状态 | 要点 | recovery_plan |
|---|---|---|---|---|
| **A60 RETEST_SEED_DATE_AMBIGUITY** | P2 | NEW | `gsc-2026-11-14-retest-run.json` 生成于 **11-09 11:54Z**，输入 qc end1103 / qp 10-31；按日期命名极易被当今日输出 | `modify_payload`（owner=runbook）重命名或写入 `generated_at` + input data day |
| **A61 PEER_DATA_DAY_MISLABEL** | P3 | NEW | daily 11-14 写 11-12 数据日 11-09（≈53h），权威窗口是 11-04..11-10（92.2h） | `modify_payload`（owner=daily prompt）；只登记不改对端文件 |
| **A62 AVAILABLE_WINDOW_THINNER_THAN_PROJECTION** | P2 | NEW | 11-14 实际可用窗 7d 28.6–42.9% / 28d 7.1–10.7%，不是预测的 42.9–57.1% / 10.7–14.3% | `modify_payload`（owner=runbook/ledger）；稀释率必须绑定**手头**数据日 |
| **A63 SCHEDULER_REFUSED_GSC** | P1 | NEW | `Last=11-13 21:32:01 / Result=2147946720`；无 11-13 bus 行/报告 ⇒ 被拒的尝试，不是成功轮 | `request_human`（K3-admin 查 logon 模式/凭据，同 5 车道 0x800710E0 族） |
| **A64 STALE_SESSION_LOCK_ENTRY** | P3 | NEW | `SESSION_LOCK.md` 顶部仍有 2026-10-23「持有中」（22 天），TTL 30 min 早已过期 | `modify_payload`（owner=人手会话）标记 released；本轮无 src 写入，不接管 |

### 8.4 carry（无新证据，不改对端）

`A45`（派生根不替换官方根，冻结）、`A46`（已更新为 28.6–42.9% / 7.1–10.7%）、`A48`（沙箱无拉数/解析能力）、`A49`（catalog 真值冲突，无新证据）、`A50`（EN 页 ZH 块，观察）、`A52` / `A55`（历史措辞）、`A57`（lag 非常量，本批再次确认 lag 2）、`A59`（7d 行 11–32 imp、28d 27/28 重叠、3/28 变更后）。

---

## 9. 三条队列（只做证据，不翻状态、不派单）

### 9.1 机会队列

| ID | 状态 | 11-14 证据 |
|---|---|---|
| OPP-01 页一零点击池 | **UPDATED（11-12 批）** | **6 词 / 157 imp / 0 clk**（11-11 批 5 词 / 147 imp）；large envelopes 掉出、證書印刷 7 imp 进入、书籍印刷 5 imp 出现 |
| OPP-02 新进页一 | **NEW_ENTRANT_SMALL_SAMPLE** | 證書印刷 7 imp / 10.0 / 0 clk；**5–7 imp 不作决策** |
| OPP-03 两窗改善 | **MEASURE** | 貼紙印刷 / 學校印刷 仍零点击；无新派单 |
| OPP-04 产品摘要结构 | **MEASURE → monthly** | 无新结构数据 |
| OPP-05 市场 CTR 差 | **MEASURE → monthly** | 11-12 批：HK 2.6348% / JP 1.6719% / US 1.2565%（搜索者位置，非 locale 业绩） |
| OPP-06 单页零点击 | **CARRY_OBSERVATION** | design-file-specs 301 imp / 0 clk / 5.51（11-11 批）；无 SERP/真值，不派单 |

### 9.2 退场候选（停止追加投入，不等于删页/noindex）

- **无新增退场**。`EXIT-01 教材` / `EXIT-03 a2 poster` / `EXIT-04 コミケ` / `EXIT-08 海報印刷` 均升级为 **`DEPLOYED_MEASURE` / `SEASONAL_HOLD_UNDER_REVIEW`**：证据是「深位化」，**不是「部署失败」**。
- **红线**：四个词 28d 窗仍有 **25–26/28 天**在 11-08 之前；不得把移动窗口读成实验结论，不得回滚已部署真值。
- `EXIT-04 コミケ` 的 `SEASONAL_HOLD` 需在 **11-21 / C109 季窗**复核：5 个连续导出的单调下滑比「季节性」解释更强，但仍需当前 join + SERP 才能改判。

### 9.3 内耗候选（仍是假设，无当前 query×page join）

| ID | 状态 | 证据 |
|---|---|---|
| IF-01 posters | **STALE_ATTRIBUTION_ONLY** | category 64/567 = 11.3% vs blog guide 210/567 = 37.0%（09-30..10-27，hkg）⇒ 主承接份额远未集中；当前 join 缺失 ⇒ `CANNIBALIZATION_NOT_MEASURABLE` |
| IF-03 stickers | **HOLD_GATE_MET** | 貼紙印刷 142 imp / 0 clk / 34.58（11-11 批）；14 天 / 12-04 决策窗 |
| IF-05 海报主承接 | **K3_REVIEW_CANDIDATE** | 11-21 份额未收敛则复评「主承接 URL 选型」，**不回滚** |
| IF-02 / IF-04 | carry | 无新页级证据 |

---

## 10. 跨车道与写盘隔离

| 今日他方写入 | 时间 / commit | 本轮处置 |
|---|---|---|
| daily 11-14 CATALOG-TRUTH-RESIDUAL（`products.ts` / `sku-seo-data.ts`）+ 队列 DONE | 18:17 harness → `c172b3d2` / 报告 `54117cad` | **只读**；不重做、不改其报告，不据 GSC 判其成效 |
| merchant 结构化数据真值批（人工会话 16:3x 释放） | `d7042647` / 验收 `978df830` / 待办 `13c4beaf` | **只读**；不声称其已线上核验，不把 A2/价格结论接到该批 |
| 11-12 三档 + `gsc-2026-11-12-*.json` | 11-12 隔夜 / 11-13 生成 | **只读消费**；A53 复验不改文件 |
| `strategy-task-queue.json` | 11-14 10:23 peer 回写 | **零手改**；队列状态零翻转 |
| `flywheel-learning-ledger.json` | 11-10 08:35（他方） | **仅追加自己的 `retest_gate_2026_11_14`**；未改 `data_supply` / `window_math` / 他车道条目 |
| `src/`、title/desc、canonical/301、blog-data、CSV/生成器、`docs/` | — | **零触碰** |

**本轮写盘**：3 个文件 —— 本报告、`gsc-daily-anomaly-2026-11-14.json`、账本新增块。无覆盖、无 `.failure.md`、无 `src/`、无 `docs/`、无队列/总线改写。
**Git**：`HEAD = origin/main = 54117cad`；报告与台账由 host wrapper 在本 lane 退出后 commit/push。

---

## 11. K3 升级（4 个决策点，均可一句话拍板）

### D1 · 🔴 P0 数据面连续两天零前进（11-13/14 无导出）

> **事实**：11-13、11-14 均无 GSC 导出；7d/28d 数据日 11-10、**92.2h > 72h**；3mo 缺 **4** 批；API `end1105`（**236.2h**）；detector **11 日**空；index 落后 **4 批**。
> **推荐 (A)**：今天补 **11-13 + 11-14** 的 24h/7d/28d/3mo 四档（全国家、网页搜索）+ 重启 7892 代理；随后 host 跑：

```powershell
cd F:\zprintpro-nextjs
python scripts\fetch_gsc_data.py --dimensions query,country --days 28 --end 2026-11-14
python scripts\gsc-cliff-detector.py
node scripts\rebuild-gsc-index.mjs --write
powershell -NoProfile -Command "Get-ScheduledTaskInfo -TaskName ZP-gsc-feedback,ZP-daily-content,ZP-monthly-matrix,ZP-k3-review | Format-List TaskName,LastRunTime,LastTaskResult,NextRunTime"
```

> 备选 (B)：只补 11-14 三档（不含 3mo）先解 72h；(C) 等 11-18 与决策窗同批 —— **不推荐**，会把 11-18 首个 100% 7d 窗一起废掉。

### D2 · 🟠 P1 11-14 复测：没有新数据，数值门槛必须后移

> **事实**：可用窗 11-04..11-10 ⇒ 7d **28.6–42.9%**、28d **7.1–10.7%** 变更后；runbook 规则 1 仍留 `14.15 → ≤10` 数值门槛。
> **推荐 (A)**：11-14 只做「方向 + 真值一致性」，删除数值门槛；门槛移到 **11-18（7d 100%）/ 12-04（28d 82.1–85.7%）**。备选 (B) 照旧用 28d 判 ⇒ 会把稀释读成无效并诱发二次改动；(C) 推 12-10 ⇒ 太晚。
> **附加**：不要把 `gsc-2026-11-14-retest-run.json` 当今日输出（A60）——它是 11-09 的种子。

### D3 · 🟡 P2 GEO 探针 owner 冲突（A54）：逾期 11 天

> **事实**：`strategy-task-queue.json` 写 `GEO-20261103-AI-PROBE-S1` owner=`ZP-gsc-feedback`、status=`SCHEDULED`、`next_check=2026-11-03`；账本写 owner=`ZP-weekly-meta`；两边都没跑。
> **推荐 (A)**：owner 定为 **ZP-weekly-meta**（其 measurement 批更接近探针），gsc 只消费结果；本轮**不声称已复测、不写任何 AI 引用增长/下降结论**。备选 (B) gsc 每周三附带跑；(C) 暂缓 12 月。

### D4 · 🟠 P1 gsc 调度 11-13 被拒（0x800710E0 族）

> **事实**：`lane-status` 18:17：`Last=2026-11-13 21:32:01 / Result=2147946720`；11-13 **无 bus 行、无报告**；11-14 早段亦无 gsc（本轮 20:13 是手工/harness 入口）。
> **推荐 (A)**：K3-admin 用 `Get-ScheduledTask -TaskName ZP-gsc-feedback | Format-List *` 检查 `LogonType` / `RunLevel` / 凭据，并按 `scripts/register-cron-tasks.ps1` 重新注册（与 k3/monthly/weekly 同族问题一次处理）。**在自然调度四方验收前，不写「调度已恢复」。**

### 非阻塞 carry（不占 4 条）

- **A58 账本 `data_supply` 已 4 天未刷新**（仍 `BROKEN_DAY6 / latest_xlsx=11-07`）：交账本 owner；本轮只加 gate 块。
- **A47 index**：4 批未收录，门童 #9 会把新档判成「不存在」。
- **A53 回归风险**：下一批生成后必须再验 `previous_*` / `current_*`。
- **A51 已在他车道 title 层关闭**：本车道不重验、不复改。
- **6 项 WAITING_K3**（BLOG-CERT / STICKER-ZH-TRUTH / STICKER-PRICE-THREE-LAYER / BLOG-H1-BRAND / FIVE-CATEGORY-TRUTH / PRIMARY-URL-MISMATCH）→ 维持 HOLD，执行层不自批。
- **§0.0 名片解禁块 (a)/(b)/(c)** 仍未裁 → 继续零触碰（不建页、不改 301、不动贺卡资产）。

---

## 12. 下一验证点

| 日期 | 验什么 | 通过标准 / 失败动作 |
|---|---|---|
| **2026-11-15 / 16** | 是否出现 11-13/14 导出 | 有 24h/7d/28d 且数据日 ≥11-11 ⇒ 恢复可读；否则 A1 继续开 |
| **2026-11-18** | 首个 **100% 变更后 7d 窗** | 四个深位词 + a2 poster 是否止跌；stickers/flyers 受 11-12 title 变更 ⇒ 标 `CONFOUNDED_BY_1112_TITLE` |
| **2026-11-21** | 海报/喜帖主承接份额（需**当前** join） | category 份额向 blog 收敛；否则复评选型，不回滚 |
| **2026-11-28** | small batch sticker（US 英文 SERP + 同口径 28d） | SERP 记录成功，或 `SERP_UNAVAILABLE`；不编造 |
| **2026-12-01** | monthly 自然触发 | 有 run 记录 + 月报告；否则 dead_letter |
| **2026-12-04 / 12-10** | 28d 82.1–85.7% / 100% 变更后 | 才可 SCALE/HOLD/FIX/STOP；六件齐才 SCALE |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先查前序实现路径：11-12 报告（无批、A53 已闭）→ 11-13 k3 报告 §3（已消费 11-12 四窗 KPI/54 词/5 URL）→ 11-14 daily（CATALOG 真值、队列回写）→ `gsc-2026-11-12-*.json`（权威窗口/QA）→ `gsc-2026-11-14-retest-run.json`（11-09 种子）。据此**不重做 KPI 层**，只做 4 个 READY 测量任务 + 复测阻断 + A53 回归复验，并在写盘前避开对端文件。
- [x] **2. 约束适用范围？** 契约 §6.1（gsc 只给任务/不改页）⇒ 零 `src/`、零 title/desc、零 canonical/301；§7.2（不改队列状态）⇒ 零翻转；§7.3（先读周复盘）⇒ 已读 `periodic-review-weekly-2026-11-13`；§8.3/§8.6（只写自己条目/不自批）⇒ 账本仅追加自己的 gate 块；§8.8（数据供给阻断 ⇒ 复测写 BLOCKED）⇒ 10 项全标 BLOCKED；§0.23（数字只来自真值）；§0.37（不接 GA4/008/订单）；§0.0（名片只接单不建页）；§0.35.7（零 src 写入，无需人手锁）。
- [x] **3. 原数据/拍板来源？** ① 来源：`GSC数据/` 11-12 三档 xlsx 及其分析 JSON（权威窗口/28d+7d 块/54-54 QA）、`gsc-cliff-2026-11-03.json`、`lane-status` 18:17、`lane-runs.jsonl`、`coordination-board` 20:13、`flywheel-learning-ledger` 11-10；② 真数据：无 11-13/14 导出（glob + 目录双法）、数据日 11-10、92.2h、lag 2、A53 键名/转移行三法一致；③ 留/撤：**零数据撤回**；仅两项措辞/条件更正（11-14 预测窗未成立 → 实际窗更薄；peer 数据日 11-09 → 11-10），原读数不变。
- [x] **4. 字段值策略？** 不涉及 certNo / validUntil / issuer；零客户可见内容写入；价格/MOQ 仅作既有真值引用，不新增价格声明。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告与 JSON 台账；无 user-facing 文本，不触发 `parseInlineLinks`。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-gsc-feedback.json (2026-11-14 20:13:02, preflight ok/10-10, lock pid 24668, retry_queue 1, key a702483fdfe983cb) · lane-status.json (2026-11-14 18:17, 2.0h, bus_records 121, verdict ATTENTION, problems 7, gsc 11-13 MISSING, scheduler Last 11-13 21:32:01 Result 2147946720) · lane-runs.jsonl (last 6; no gsc 11-13 row)
- 协同板: coordination-board.json (2026-11-14T20:13:02+08:00, 4 READY GSC-MEASURE owner=ZP-gsc-feedback, baseline=2026-11-12 28d) · 2026-11-14-queue-reconciliation-audit.json (10:23, source_window 10-14..11-10, SERP_UNAVAILABLE)
- GSC 权威窗口: gsc-2026-11-12-four-window-analysis.json (24h 7/578/1.2111/11.8528 window 11-11T17..11-12T16; 7d 149/7651/1.9475/13.5641 window 11-04..11-10; 28d 560/25316/2.2120/14.5482 window 10-14..11-10; 3mo 1279/65252/1.9601/17.355 window 08-01..10-31; page1_transitions_7d [可移貼紙, small batch sticker printing, doujinshi printing])
- GSC 词级: gsc-2026-11-12-money-keyword-delta.json (28d 六导出: 海報 286/278/261/248/224/206; コミケ 173/170/163/146/134/129; 教材 39/46/51/53/57/56; a2 54/59/49/48/39/38; 7d 块 previous_11_11/current_11_12) · gsc-2026-11-12-workbook-independent-qa.json (all_independent_checks_match=true; 54/54; errors=[])
- 复测种子: gsc-2026-11-14-retest-run.json (generated_at 2026-11-09T11:54:29Z; qc end1103; qp 2026-10-31; baseline note 28d to 11-07) — 不作为今日读数
- 恢复链: gsc-cliff-2026-11-03.json (977 / 789.8 = 123.7%, full-country) · 派生 11-12 578 / (25316/28=904.1429) = 63.93% (DERIVED_NOT_DETECTOR)
- 数据供给: GSC数据/ 最新 = 2026-11-12 24h/7d/28d; 3mo = 2026-11-03; gsc-query-country-28d-end1105.csv (data day 11-04); GSC数据/index.json (lastBuild 11-05 07:38, latestFreshData 11-03)
- 页级归因(stale): docs/2026-11-13-priority-pool-attribution-addendum.md (window 2026-09-30..2026-10-27, hkg) · gsc-2026-11-14-retest-run.json page_attribution (same 10-31 qp)
- 对端: 2026-11-13-ZP-k3-review.md (11-12 KPI/54 词已消费) · 2026-11-14-ZP-daily-content.md (CATALOG 真值, 数据日标注 11-09) · periodic-review-weekly-2026-11-13.json (18 runs; dispatched=[]; learning_candidates=[])
- 账本: flywheel-learning-ledger.json (2026-11-10 08:35; 10 项 owner=ZP-gsc-feedback; retest.first=2026-11-14; window_math.export_lag_days=3 已过时)
- 调度真值: lane-status 18:17 (5 车道 2147946720) · 会话锁: SESSION_LOCK.md 顶部 (11-14 16:3x released; 10-23 stale holding)
- 版本链: .git/refs/heads/main = .git/refs/remotes/origin/main = 54117cad; .git/logs/HEAD L690-710 (c172b3d2, 54117cad 今日)
- 环境: pwsh 计算面禁用 (v9.4, 不重试) ⇒ detector/API/index/tsc/门禁/xlsx 重解析/schtasks 未实跑; commit/push 由 host wrapper 兜底
校准状态: 🟢 已校准 (2026-11-14) — 无 11-13/14 导出 / 数据日 11-10 / 92.2h / lag 2 / A53 三法 / 54-54 QA = 一手直读或可复算; 🟡 四个词的 28d 方向 = 27/28 重叠 + 窗口移动 + 2–3/28 变更后; 🟡 7d 单行 11–32 imp; 🔴 detector 11 日空 / 当前 query×page join 缺失
撤回声明: 无数据撤回。两项措辞/条件更正: (1) 2026-11-12 报告与 2026-11-13 k3 报告的「11-14 = 7d 42.9–57.1% / 28d 10.7–14.3%」是**假设今天有新导出**的条件预测, 该前提未成立; 实际可用窗 (11-04..11-10) 为 **7d 28.6–42.9% / 28d 7.1–10.7%**, 原预测的读数本身不撤回, 只撤回其适用条件。(2) 2026-11-14 daily 报告的「11-12 数据日 11-09 ≈53h」更正为 **11-10 / 92.2h** (仅本报告口径, 不改对端文件)。
口径声明: 本报告不含 blog 篇数 / SKU 数 / 询盘数 / 客户数断言 (门童 #7 不触发); 无 GA4 / 008 / 订单数据 (§0.37); 无 AI 引用结论 (A54); 零客户可见内容写入。**无老站 z-printpro.com 对比基线** —— 现有 GSC 档均为新站 zprintpro.com 属性 (§0.30.9 显式声明)。
```

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 今日 KPI | **无 11-13/14 导出**；表中 24h/7d/28d/3mo 全部 `CARRIED_2026_11_12_EXPORT`，不是今日读数 |
| 2 | 11-14「首轮复测」 | **BLOCKED**；可用窗仅 11-04..11-10（28.6–42.9% / 7.1–10.7%）；不得把 11-12 delta 改名 |
| 3 | 四个深位词的「原因」 | 只有方向 + 归因缺口；无当前 query×page join、无 SERP、变更后仅 2–3/28 天 ⇒ **不判因果、不回滚** |
| 4 | 恢复系数 63.93% | 单一 24h、周四、`DERIVED_NOT_DETECTOR`；detector 11 日未跑，不判 `CRITICAL_CLIFF` |
| 5 | 页级承接 | 只有 09-30..10-27 的 stale 归因；当前份额 `CANNIBALIZATION_NOT_MEASURABLE` |
| 6 | 复测种子 | `gsc-2026-11-14-retest-run.json` 是 11-09 生成、10-31 输入，**不是今日输出** |
| 7 | 3mo | 11-03 携带（数据日 10-31，332.2h）；缺 4 批 |
| 8 | index 新鲜度 | `index.json` 自述 FRESH 是 11-05 旧值，与实际 `latestFreshData=11-03` 冲突 |
| 9 | 调度器 | 引 18:17 快照；11-13 21:32 是**被拒尝试**；本轮 20:13 入口归属未标，**不称调度恢复** |
| 10 | 四方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在 lane 退出后写入；本报告只声称 ③ 报告 + ④ 20:13 preflight 持锁 |
| 11 | 飞轮账本 | 仅追加 gate 块；`data_supply` / `window_math` 仍为 11-10 旧值（A57/A58），交 owner |
| 12 | 对端文件 | 11-13 k3 / 11-14 daily / 11-12 GSC JSON / 队列 / 锁文件全部零改写 |
| 13 | A53 的长期性 | 本批验证通过，但 clone 链生成器仍是同类缺陷源；下一批必须再断言键名 |

---

*Generated by DSH lane `ZP-gsc-feedback`（lane-results-bus-contract §6/§7/§8 + 2026-11-14 协同飞轮块 + 11-13 真值/CTR 块 + 11-07 四窗块 + 11-03 证据块 + 恢复模式块 + sop-10-gate）· 2026-11-14 20:13 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
