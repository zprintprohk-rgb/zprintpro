# 2026-11-20 ZP-weekly-meta 周报（周五 20:52 轮 · RETRY_OF 11-06 · 食品包裝印刷 HOLD + 单变量候选）

VERDICT: OK
RECOVERY: UNAVAILABLE — 无 `.hermes/logs/gsc-cliff-2026-11-20.json`（detector 最后官方值 2026-11-03 = 123.7%；对端 11-20 的 114.29% 是「11-19 批 24h ÷ 同批 28d 日均」的派生值 DERIVED_NOT_DETECTOR，不当作恢复确认）
RETRY_OF: ZP-weekly-meta-20261106T205201（preflight BLOCKED：strategy-feedback exited 1 / output suppressed，candidate_files=[]）→ 本轮 preflight 的 `periodic_strategy_review` 已 ok，`periodic-review-weekly-2026-11-20.json` 可读且 status freshness age_days=0，该阻塞已由本轮真实消费闭合；无上一轮产物需要重做
CONSUMED: `.hermes/logs/run-context-ZP-weekly-meta.json` @ 2026-11-20 20:52:00（preflight ok，10/10 checks，lock pid 36568，this_run_key `e311eb8c55fd59fc`）| `.hermes/logs/lane-status.json` @ 2026-11-20 04:57（bus_records 131，verdict=ATTENTION，problems=7）| `.hermes/cron-prompts/lane-results-bus-contract.md`（§6/§7/§8）| `.hermes/logs/coordination-board.json` @ 2026-11-20T20:52:01 | `.hermes/logs/periodic-review-weekly-2026-11-20.json` | `.hermes/logs/gsc-2026-11-19-money-keyword-delta.json` + `gsc-daily-anomaly-2026-11-20.json` | `.hermes/logs/flywheel-learning-ledger.json` @ 11-19 23:25 + 11-20 gsc 追加块（只读）| `.hermes/logs/serp-evidence-2026-11-19-food-packaging.md`（只读，对端）| `重要文件/2026-11-18-decision-window-execution.md` | `.hermes/logs/2026-11-20-ZP-gsc-feedback.md` / `2026-11-20-ZP-daily-content.md` / `docs/2026-11-20-gsc-decline-diagnosis-and-flywheel-sprint-pool.md`（对端，只读）| `zprintpro-weekly-meta-refresh.md` + `sop-10-gate.md` | `.hermes/logs/sku-title-v5-audit-2026-11-14.json` / `-11-20.json`、`.hermes/logs/keywords-detox-audit-2026-11-14.json` / `-11-20.json`、`.hermes/logs/b1c-queue-progress.json`
DELIVERED: `.hermes/logs/2026-11-20-ZP-weekly-meta.md`
NEXT: 2026-11-27（下周五自然轮 / 任务 retry_at）只做**方向读数**（最新导出数据日约 11-23，变更后 5/7 天）；首个干净 7d 需数据日 ≥2026-11-25，落在 **2026-12-04** 轮。若届时 `食品包裝印刷` 仍 0 点击且 28d 展示 ≥100，向 K3 提交本报告 §3 的 title 单变量候选（P-c 具体化）；若已破零 → STOP，不再动 title。自然调度是否恢复仍以四方对账为准，不由本轮运行关闭。

---

## 0. 结论（三行）

1. **本周唯一 READY 且属于本车道的 meta 任务（`食品包裝印刷`）本轮判 HOLD，不改任何字段。** 原因：11-18 已部署该页 meta description 修复（`d5c0d36f` / `a9f218f0`，CF success + 5/5 探针 PASS），7d 干净窗要等数据日 ≥11-25（约 12-04 轮）；现在叠加第二个 snippet 变量会破坏单变量归因，也触碰 title 冻结面。
2. **单变量候选已具体化，但只作为条件提案，不是上线授权。** 目标 = `/zh-hk/blog/food-packaging-printing-guide/` 的 title（现 57 半角当量 → 拟 55），主词前置 + 采购词「訂製」+ 真值数字钩子（100 個起 / HK$2.5/個起）+ 品牌末尾一次；须 K3 明确解冻 + 12-04 读数仍零点击才可执行。
3. **周报四栏照实：** 生产变更有部署证据 4 项、待核验 1 项（分属 11-18 / 11-19 / 11-16 三批）；GSC 首个 100% 变更后 7d 窗成立但只做技术读数（28d 仅 28.6%）；`ZP-gsc-feedback` 11-20 为 PARTIAL（数据 92.2h 旧 + 无 11-20 导出，只做 NEXT）；5 条 ZP 车道 + watchdog 仍被 `2147946720` 拒绝（gsc 另为 Result=1），本车道不自行宣告调度恢复。

---

## 1. 周报四栏（窗口 2026-11-14..2026-11-20）

> **范围声明**：本轮按 `docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md` §8.3 的 30 天职责表执行 weekly-meta（**只处理已解冻且有证据的 title/description + CTR/真值检查**），**不执行**旧 v4 prompt 的「2 篇博客 + 3 个类目页 meta + 3 个 PDP 审查」批量——该口径已被 §8.3 与 2026-11-14 协同块取代；恢复期也限缩 meta 刷新。旧流程中不冲突的锁/门禁/报告格式继续执行。

### 1.1 生产变更（只列有部署证据的；不把 commit 当上线）

| 日期 | 变更 | commit | 部署 / 线上核验 | 状态 |
|---|---|---|---|---|
| 11-18 | **食品包裝 guide meta description**（`src/data/blog-posts.ts` excerpt zh-hk + `src/app/[locale]/blog/[slug]/page.tsx` posts 记录；生效面 = description，title 仍由 blog-posts.ts 提供且未变） | `d5c0d36f` + `a9f218f0` | CF Pages check-runs success；探针 5/5 PASS（含「100 個起」+「HK$2.5」）；本 run 另做 live fetch（2026-11-20，HTTP 200）复核 title/H1 未变 | **DEPLOYED，测量中**（单变量；7d 干净窗数据日 ≥11-25） |
| 11-18 | Schema MOQ 档价格（`getSchemaMoqTierPrice()`，`getProductOfferPrice` 分支 1 先取 MOQ 档；显示层路径不动） | `d5c0d36f` | 线上探针 `/en/product/a4-flyers/` schema offer price = **1.80**（旧伪价 $0.04 消失）；20 SKU 双方法 19 全等 + 1 安全回退 | DEPLOYED（本 run 未重跑探针，继承 11-18 执行报告） |
| 11-18 | a2 remedy A（PDP 首屏快速答案块 + `1 張起印→10 張起印` 真值修复 + 2 条 PAA FAQ） | `d5c0d36f` | 探针 420×594 + 答案块 PASS；两条 hub 内链 200 | DEPLOYED（同上） |
| 11-19 | 三语 contact 页两条指令（`15248366` / `6745d798`） | `15248366`、`6745d798` | ledger 记 CF success + live 三语 contact 全清 | DEPLOYED（ledger 自述，本 run 未独立复验） |
| 11-16 | sticker 批 | `7425d28d` | 11-18 daily 记录 `verify-deploy` = **no Cloudflare check_run** | **部署未核验**（挂账，不一刀切判成功/失败） |

> 边界：11-18 三议程同批两 commit，跨页看不是「单变量」；但就 `食品包裝印刷` 这一页，11-18 只改了 description 生效面（title 未变），所以本车道仍按单变量处理。11-08 / 11-09 / 11-13 / 11-18 各批的 **28d 判定窗均未闭合**（11-08/11-09 的 7d 只到技术读数，11-13/11-18 的 7d 更未到），本轮不评胜负、不叠加新变量。

### 1.2 测量报告（本周实测，不重算对端已交付的 KPI）

**执行健康（periodic-review-weekly-2026-11-20.json）**

- 窗口 2026-11-14..2026-11-20，runs **16**：STALE **6** / PARTIAL **1** / FAILED **5** / PENDING **2** / BLOCKED **2**。
- per_lane：`ZP-daily-content` STALE 5 / FAILED 2 / PENDING 1；`ZP-gsc-feedback` PARTIAL 1 / FAILED 2 / PENDING 1；`TRUTH-A2-SAMEDAY` BLOCKED 2 / FAILED 1 / STALE 1；**`ZP-weekly-meta` 截至周复盘生成时本窗口 0 条运行记录**（11-13 的调度器 LastRunTime 存在但 Result=2147946720、无 bus 记录、无当日报告 → 按四方对账不得算跑过）。
- status freshness：generated_local 2026-11-20 04:57，age_days 0，stale=false。

**GSC 四窗（11-19 批，数据日 2026-11-16；全国家、网页搜索；query/page 不联接）**

| 窗 | clicks | impressions | CTR | avg position | 批龄 |
|---|---:|---:|---:|---:|---:|
| 24h（11-17T21..11-18T20） | 21 | 1,138 | 1.8453% | 14.1649 | 48.2h |
| 7d（11-10..11-16） | 130 | 8,283 | 1.5695% | 15.5229 | 92.2h |
| 28d（10-20..11-16） | 554 | 27,879 | 1.9872% | 14.9511 | 92.2h |
| 3mo（08-01..10-31，沿用 11-03） | 1,279 | 65,252 | 1.9601% | 17.355 | 500.2h |

- 对 11-16 批：7d clicks **-14（-9.72%）**、impressions **+180（+2.22%）**、CTR **-0.2076pp**、position **+1.1792（退）**；28d clicks +10（+1.84%）、impressions +1,529（+5.80%）、CTR -0.0773pp、position +0.271（退）。⇒「展示继续增、点击/CTR 回落、位次略退」，不是恢复胜出，也不是崩塌。
- **A70（对端 11-20 新记）成立**：7d 点击连续第二窗下降（144→130）；任何全站级 title 动作必须先有 query×page join + SERP，本轮不派全站 title。
- 这是个**首个 100% 变更后 7d 窗**（C1/C2 均 7/7），但按契约 §8.4 只能做技术核验；28d 变更后仅 28.6%（C1）/25.0%（C2），**禁止 SCALE/HOLD/FIX/STOP 经营判断**。

**页一零点击池（11-19 批，28d 全池，pos≤10、0 click、≥5 imp）**

- 全池 **60 行**；前 10 行合计 **658 imp / 0 clk**。
- 与本车道相关的头部：`食品包裝印刷` **125 / 0 / 7.93**（池内第 2）、`a1海報` 85 / 0 / **1.00**（第 3，SERP 未取证）、`食品印刷` 72 / 0 / 5.01、`大信封` 52 / 0 / 4.38、`餐牌印刷` 44 / 0 / 9.2。
- 只有 `食品包裝印刷` 有真实 SERP 记录（对端 11-19）；其余 `SERP_UNAVAILABLE`，按 §7.2 只能 HOLD，不得凭位置机械改 title/desc。

**`食品包裝印刷` 八导出序列（28d，同一 xlsx 口径；来源 delta JSON）**

| 导出 | 10-30 | 11-03 | 11-07 | 11-10 | 11-11 | 11-12 | 11-16 | 11-19 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| imp | 113 | 118 | 116 | 106 | 107 | 107 | 114 | **125** |
| clk | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| pos | 8.60 | 8.42 | 8.36 | 8.71 | 8.63 | 8.53 | 8.25 | **7.93** |

- 7d 同批：38→46 imp（+21%），pos 6.53→**6.17**（-0.36，改善），clk 仍 0。
- 判读：**排名/展示没有坏，坏的是点击**；位置已在页一上半区（7.9），0 点击指向摘要/意图层，不是内容量或排名层。这也解释了为什么本轮不能拿「再加内容」当动作。

**本周本车道自身**

- 最近一次真实交付：2026-10-30（OK）。11-06 preflight BLOCKED（strategy-feedback）；11-13 自然轮 Result=2147946720、无报告；本轮为本次 20:52 运行（触发方式待管理员四方对账；调度器快照仍停在 11-13）。

### 1.3 PARTIAL 跟进（只处理 NEXT，不重做 DELIVERED）

| 来源 | 已交付（不重做） | 未闭合（本轮只登记） | 下一动作 |
|---|---|---|---|
| `ZP-gsc-feedback` 2026-11-20 PARTIAL | 11-19 批 KPI 首次消费；9 个 READY 测量点；首个 100% 7d 技术审计；异常分类；retest gate | 7d/28d 数据日 11-16、92.2h（>72h）；无 11-20 导出；3mo 自 11-03 起缺 6 批；当前 query×page join 缺失 | 11-21 貼紙第七窗（需数据日 ≥11-18）+ 海报/喜帖份额（需 join）；本车道不重跑 KPI |
| `ZP-gsc-feedback` 2026-11-14 PARTIAL | 11-14 方向读数与 retest gate | 已被 11-20 批取代 | 不重做、不改写旧报告 |
| `ZP-gsc-feedback` 2026-11-18 FAILED | 真实 PARTIAL 报告 + anomaly + ledger gate 块 | pre-commit guard 拒 1 个 production 文件、`candidate_files=[]` | 不重写；本车道零 src 写入，不触发同类 guard |
| `ZP-weekly-meta` 2026-11-13 | **无 bus 记录、无当日报告** | 调度器 Result=2147946720 | 不把历史 MISSING 补写成「当时成功」；本轮只做今天的真实交付 |

### 1.4 调度异常（四方对账；wrapper=0 / 手动成功都不算恢复）

| 车道 | 调度器 Last | LastTaskResult | 本周总线/报告 | 判定 |
|---|---|---|---|---|
| ZP-daily-content | 2026-11-19 23:20:19 | 2147946720 | STALE 5 / FAILED 2 / PENDING 1 | SCHEDULER_FAILED |
| ZP-gsc-feedback | 2026-11-19 20:13:01 | **1** | PARTIAL 1 / FAILED 2 / PENDING 1；11-19 dsh quota 失败 | SCHEDULER_FAILED + 配额 |
| **ZP-weekly-meta** | **2026-11-13 21:32:01** | **2147946720** | 复盘生成时本窗口 0 条；11-13 无报告 | **SCHEDULER_FAILED**（本轮运行不关闭它） |
| ZP-blog-deepfix | 2026-11-15 18:25:40 | 2147946720 | 11-14 MISSING；本周 0 真实 run | SCHEDULER_FAILED + MISSING |
| ZP-monthly-matrix | 2026-11-01 17:42:14 | 2147946720 | 窗口内无应触发日 | 管理员重建待办 |
| ZP-k3-review | 2026-11-19 09:03:15 | 2147946720 | 11-14..11-19 连续 MISSING | SCHEDULER_FAILED |
| ZP-cron-watchdog | 2026-11-19 09:03:15 | 2147946720 | — | 管理员待办 |

- `2147946720` = `0x800710E0`（登录/权限拒绝），与本轮内容任务无关；**不能**用本轮报告存在来关闭它。
- K3/管理员动作（一条可粘贴的审计命令；`-Apply -All -CanaryVerified` 须 canary 通过后再执行）：
  ```
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-zp-scheduler-logon.ps1
  ```

### 1.5 恢复期四项（RECOVERY-MODE 2026-10-12 固定节）

| # | 项 | 本周读数 | 判定 |
|---|---|---|---|
| ① | 恢复系数周曲线 | `gsc-cliff-*` 仅 11-01 / 11-03 两档；detector 自 11-03 后无档；最后官方值 123.7% | **UNAVAILABLE**（不画曲线、不判恢复） |
| ② | 门童 #25/#27/#28/#29 本周审计 | #27：11-14 → 11-20 均 252 槽，HARD 0→0，WARN 30→30（LONGTAIL_SOURCE 13 / MOQ_UNVERIFIABLE 6 / MOQ_DRIFT 4 / BAND_FILL 3 / FROZEN_FILLER_WORD 2 / PRICE_UNVERIFIABLE 2）；#29：11-14 → 11-20 均 252 槽，issues 0→0（仅 greeting-cards R3 豁免项）；#25/#28 本周无独立审计 JSON | **只准减不准增：持平，无新增**；#25/#28 不作「已审计」结论 |
| ③ | 新上线内容 8-gram 相似度抽检 | 本周无新增正文批次；11-18 为既有字段修复（desc / schema / 答案块） | **N/A**（下一批新文时执行，>60% 即停手） |
| ④ | 下周 B1c 队列建议 | `b1c-queue-progress.json` 最后 order 30 = DONE（10-29，`b50ff77c`）；本周无新增 B1c 消费；11-18 daily 记 38/38 DONE | **无新 B1c 建议**；转 11-21 / 12-04 复测窗 |

---

## 2. `食品包裝印刷` FIX 任务裁决（`GSC-FIX-2026-11-20-87656b1b2c`）

**标准输入包**

```
TASK_ID: GSC-FIX-2026-11-20-87656b1b2c
INTENT: 页一高展示零点击（125 imp / 0 clk / pos 7.93）的 snippet/意图修复，只做一个变量
APPROVED_BY: 既有 GSC-FIX 通道（owner=ZP-weekly-meta，status=READY）；任何 title 改动仍需 K3 明确解冻
TARGET_QUERY_OR_URL: query 食品包裝印刷 (zh-hk) → /zh-hk/blog/food-packaging-printing-guide/
INPUT_EVIDENCE: gsc-2026-11-19-money-keyword-delta.json（8 导出序列）；serp-evidence-2026-11-19-food-packaging.md（Google HK、非个人化、AI Overview + Map Pack + 我方博客第 4 位）；2026-11-18 执行报告（desc 修复 + CF success + 探针 5/5）；live fetch 2026-11-20 HTTP 200
WRITE_SCOPE: .hermes/logs/、docs/（本轮）；src 改动不在本轮授权内
DO_NOT_TOUCH: 11-18 已部署的 description（测量窗内）；title（冻结面，须 K3 解冻）；canonical/301；PDP food-boxes；其他车道文件
TRUTH_SOURCE: products.ts PK-003（slug food-boxes，minQuantity=100，basePrice=2.5，price_range 'HK$2.5-18/個'）
ACTION: HOLD（不叠第二变量）；仅落一条条件式 title 候选（§3）
GATES: 锁/备份/当量/encoding/tsc/品牌/JSON/title-v5——全部在**执行时**跑；本轮零 src，无需跑构建
ONLINE_VERIFY: 本轮只做 live fetch（title/H1），不主张 meta description 已线上验证（text fetch 不回传 head meta）
REPORT: 本文件
STOP_IF: 11-18 desc 窗未闭合 / SERP 或真值缺失 / K3 未解冻 title / 锁冲突
NEXT_CHECK: 2026-11-27 方向读数；2026-12-04 首个干净 7d
```

**裁决：HOLD。** 三条独立理由，任一成立即不能现在改：

1. **单变量窗未闭合**：11-18 的 description 修复（唯一生效变量）在 11-19 批的 7d/28d 数据日（11-16）**之前**，即 0 个变更后天数；只有 24h 窗含约 20h。7d 干净窗需数据日 ≥2026-11-25（按 3 天导出滞后 ≈ 11-28 导出；落在 12-04 周五轮）。11-27 只能做方向读数（约 5/7 天）。
2. **title 属冻结面**：11-18 变更页 + 既有 title 冻结纪律（30 天职责表：只处理「已解冻且有证据」的 title/description）；P-c 需 K3 一句话解冻，执行层不得自批。
3. **SERP 证据只到「构成/标题/排位」，未到 snippet 正文**：对端 11-19 记录了 AI Overview、Map Pack、竞品与「我方博客第 4 位」及标题，但没有记录 Google 实际展示的 snippet 文本；本 run 的 text fetch 也拿不到 head meta，另用 web_search 代理查该 URL 只返回正文抽取（EU 法规段），不是 Google 展示 snippet。按 §7.2，snippet 正文缺证时不得把「改 title」包装成已验证修复。

**真值复核（本 run）**：live fetch 正文首屏含 `100 個起` / `HK$2.5 起/個` / `3-5 個工作天` / `1 小時內免費數碼打稿`，与 11-18 desc 一致；`products.ts` PK-003 的 `minQuantity=100` / `basePrice=2.5` 同值。未发现需撤回的数字。

**本轮明确不做**：不改 src；不改 11-18 已部署的 desc；不改 title；不新建长文；不 301/canonical；不把 `P-a/P-b/P-c` 重新派单（对端已列，重复派发违反幂等）。

---

## 3. 唯一 bounded 提案（P-c 具体化；条件执行，不是上线授权）

> 定位：把对端 SERP 文档 §3 的 P-c 从「选项」落成**一条可执行文案**；不新增第二提案。P-a（博客加 PDP 入口）/P-b（PDP 首屏答案块）仍是对端的备选，本轮不派发、不评价。

**变量（唯一）**：`/zh-hk/blog/food-packaging-printing-guide/` 的 **title**。description / 正文 / canonical / 内链 / schema 全部不动。

> 待验证假设（不是结论）：11-18 的 desc 已把「100 個起 / HK$2.5 起/個 / 牛皮紙白卡 / 燙金 UV / 3-5 天 / 30 秒 AI 報價」放进摘要；若 12-04 仍 0 点击，剩余缺口更可能在 title 的「完全指南：材質、安全、法規」信息型信号，而不是摘要缺数字。若 12-04 已破零，则该假设不成立，本提案自动作废。

**Before / After（逐字）**

```text
before: 食品包裝印刷完全指南：材質、安全、法規與設計實務 | 智印港
after : 食品包裝印刷 訂製100個起 HK$2.5/個起 材質·法規 | 智印港
```

| 项 | 内容 |
|---|---|
| 半角当量 | 57 → **55**（目标区 50-57；58 阻断线）。手算两法：① 逐字宽/窄相加 19×2+17=55；② 36 字符 + 19 宽字符=55。两法一致；**执行前必跑 `node scripts/guards/title-v5-guard.js` 复算** |
| 为什么是一个变量 | 只动 title；「訂製」是采购意图词；`100個起` / `HK$2.5/個起` 直接取 products.ts PK-003 真值（100 起 / 2.5 起价）；保留「材質·法規」承接该页既有的信息型查询；品牌末尾仅一次；不塞第二长尾 |
| 真值对照 | `src/data/products.ts` L2977-3006：`slug: 'food-boxes'`、`minQuantity: 100`、`basePrice: 2.5`、`price_range: 'HK$2.5-18/個'`（2026-11-20 本 run 实读）。文案用「/個起」对应 price_range 的起价口径，不写成固定价；不写认证、不写交期、不写 DHL |
| 为什么不是现在 | 11-18 desc 修复仍在判定窗（见 §2）；同页同窗双改变量 = 归因作废 |
| 执行前置（全部满足） | ① 12-04 轮读数：28d 仍 0 点击且 ≥100 imp；② K3 明确解冻该页 title；③ SERP snippet 正文已记录（或 K3 明示以 title 为唯一已知缺口）；④ 当量 55 经 guard 复核；⑤ 门童全量 + encoding + tsc 54=54；⑥ 单 commit、单 push（host 侧按 §0.25 窗口） |
| production_deploy | 未部署（本轮 null）。若获批，部署后必须 CF success + 线上 title 断言，不能以 git push 代替 |
| online_verify | 部署后：curl 线上 title 精确匹配 + canonical/robots 不变 + 页面 200；记录到 `.hermes/logs/` |
| retest | 7d（数据日 ≥部署+7，约部署后 10 天导出）/ 14d / 28d；同词、同页、同国家、同 xlsx 口径 |
| exit_criteria | 28d CTR >0 且展示不塌 >30% → 记 DEPLOYED/观察；若 7d 展示跌 >30% 或跌出页一 → 停手回查，不叠第二变量 |
| stop_if | K3 不解冻 / 12-04 已破零 / SERP 或真值新增缺口 / 同页出现其他变量 |

**如果 K3 不解冻 title**：本任务保持 HOLD，不自动降级去改 desc（11-18 desc 已是当前变量）；可另开「P-a 采购入口」作为转化向任务，但它不解决 GSC 点击零的问题，不作为本任务的替代交付。

---

## 4. READY 真值任务 deploy / online_verify / retest 对账（本周到期项）

| task_id | 队列状态 | 真实 deploy | online_verify | retest | 本周裁决 |
|---|---|---|---|---|---|
| `GSC-FIX-2026-11-20-87656b1b2c`（本车道） | READY | null | 仅 live fetch title/H1 | next 11-27；干净 7d 12-04 | **HOLD**（§2） |
| `VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL` | READY（owner k3-review） | PUSHED_NOT_INDEPENDENTLY_ONLINE_VERIFIED（head ff97d235） | 队列仍 PENDING；`verify-2026-11-19-smallbatch-truth-residual.md` 记 CF a9f218f0=success + PDP 断言全过 | 11-21 / 11-27 / 12-04 | **HOLD**：证据已存在但状态翻转需 k3-review，执行层不自批 |
| `FIX-20261113-POSTER-BLOG-TRUTH` | READY（owner blog-deepfix） | null | null | 部署后 7/14/28d | **FIX 未执行**（result NOT_EXECUTED）；不重复派单 |
| `FIX-20261113-JA-EDUCATION-C109-TRUTH` | READY（owner blog-deepfix） | null | null | 部署后 7/14/28d | **FIX 未执行** |
| `TRUTH-A2-SAMEDAY-20261120-01` | READY（owner daily，K3 11-20 20:30 已批） | null | null | next 11-21 | **FIX 待执行**（任务单已生效） |
| `GEO-20261103-AI-PROBE-S1` | SCHEDULED，next_check 已逾期 17d | — | — | — | **HOLD**（owner 冲突，不在本车道自批） |
| `MEASURE-20261028-ATTRIBUTION` | CLOSED_BY_K3_S0.37 | — | — | — | **STOP**（K3 §0.37 终局关闭，不再复活） |
| `REVIEW-20261101-MONTHLY` | SCHEDULED | — | — | 12-01 | **HOLD 至 12-01** |

> 本轮不新增派单：11-21 份额检查在 gsc NEXT；SMALLBATCH 7d 在 daily/gsc；贴纸 title 讨论由对端 analyst 包承载。重复派发 = 幂等违规。
>
> **已登记、本轮不动**：`stickers-en` 类目 meta 4 处商业口径残留（`$0.05` 锚 / `DHL 2-4 day USA` / `Free proof in 4 hours` / foil 卡 `Fast 4-day turnaround`），来源 `verify-2026-11-19-smallbatch-truth-residual.md` §2.2 与 11-20 analyst 文档 §4/§6 禁止清单。该项同时触 title 冻结 + 多字段真值，属 K3/weekly-meta 裁决面；本轮不叠变量、不派单。

---

## 5. 学习门（账本）

- 已读 `.hermes/logs/flywheel-learning-ledger.json`（`owner_lane=ZP-weekly-meta`：`EXP-FOODBOX-OPP01`、`EXP-1108-SMALLBATCH-SNIPPET`、`EXP-GEO-S1`；`window_math.dilution_table`）。
- **本轮无新增学习候选**：`EXP-FOODBOX-OPP01` 的 11-18 description 已部署（change 存在），但 retest 未到期（7d 干净窗 12-04）、28d 更远；缺「retest」即不得进 `learning-candidates.jsonl`。`EXP-1108-SMALLBATCH-SNIPPET` 仍 MEASURE（residual 线上验收已有，7d 11-21 由对端）；`EXP-GEO-S1` 仍 MEASURE（11-10 复测未跑；11-17/24 待排，均无 citation 证据）。
- **A71（本 run 新记，账本完整性）**：`EXP-FOODBOX-OPP01.change` 仍写 `NONE — 先取 SERP 快照再定 snippet 单变量`，但 11-18 已实际部署 description 修复；账本该条 change/verdict 未同步。**本轮不写账本**：该文件今天 20:13 已被 `ZP-gsc-feedback` 追加 `retest_gate_2026_11_20`（跨车道避让，契约 §6.2），留待下一轮由本车道以增量块补记，且不得改对端块。
- 结论：`learning_evidence_complete=false`、`scale_allowed=false`；不 SCALE、不写共享 prompt、不扩权。

---

## 6. SOP-10 5 问门禁

- [x] **1. 架构差异？** 已核前序实现路径：11-18 三议程 `d5c0d36f`/`a9f218f0`（food meta 生效面=description）、11-19 SERP 取证、11-20 gsc 测量；本轮不重做 KPI、不改 11-18 已部署字段。
- [x] **2. 约束适用范围？** 查 K3 11-18 执行报告 + 30 天职责表 + title 冻结纪律：title 未解冻不动；desc 在窗不动；本轮只写 `.hermes/logs/`，零 src。
- [x] **3. 原数据/拍板来源？** GSC 数字全部出自 `gsc-2026-11-19-money-keyword-delta.json` / `gsc-daily-anomaly-2026-11-20.json` / `periodic-review-weekly-2026-11-20.json`；价格/MOQ 出自 `products.ts` PK-003；SERP 出自对端 11-19 记录；无估算、无编造。
- [x] **4. 字段值策略？** 本轮不涉 certNo/validUntil/issuer；提案不含任何认证/退款/统计/满意度声明；不写联系方式。
- [x] **5. Markdown 渲染？** 本文件是内部日志，不进 user-facing 渲染；§3 的 title 文案执行时进代码字段，不经 Markdown 渲染。

**双方法/口径**：① title 当量 = 逐字宽窄相加 vs 总字符+宽字符两法，均 55（执行前仍须 guard 复算）；② `食品包裝印刷` 页面身份 = SERP 可见承接（博客第 4 位）+ 11-05 query×page 归因（pos 8.56 / 111 imp）+ 11-20 live fetch（title/H1 一致）三法；③ GSC 28d 行 125/0/7.93 与 SERP 内嵌 GSC 小组件 125/0/7.9 双方法互证（对端 11-19 已做，本 run 复核 delta JSON 同值）。

---

## 7. 数据来源 / 校准 / 撤回

```
数据来源:
- 结果总线: .hermes/logs/run-context-ZP-weekly-meta.json (2026-11-20 20:52:00) · lane-status.json (2026-11-20 04:57, bus_records 131)
- 周复盘: .hermes/logs/periodic-review-weekly-2026-11-20.json (16 runs; verdict counts)
- GSC: .hermes/logs/gsc-2026-11-19-money-keyword-delta.json + gsc-daily-anomaly-2026-11-20.json (数据日 2026-11-16; 24h/7d/28d; 3mo 沿用 11-03)
- SERP: .hermes/logs/serp-evidence-2026-11-19-food-packaging.md (Google 网页搜索, hl=zh-HK&gl=HK, 非个人化; 对端)
- 生产变更: 重要文件/2026-11-18-decision-window-execution.md (d5c0d36f/a9f218f0, CF success, 5/5 PASS)
- 真值: src/data/products.ts L2977-3006 (PK-003 food-boxes: minQuantity 100 / basePrice 2.5 / price_range HK$2.5-18/個)
- 线上: live fetch https://zprintpro.com/zh-hk/blog/food-packaging-printing-guide/ (2026-11-20, HTTP 200; title/H1; head meta 不可见)
- 队列/板: .hermes/logs/coordination-board.json @ 2026-11-20T20:52:01 · .hermes/logs/strategy-task-queue.json
- 账本: .hermes/logs/flywheel-learning-ledger.json @ 11-19 23:25 + 11-20 gsc 追加块
- 恢复期门审: .hermes/logs/sku-title-v5-audit-2026-11-14.json / -11-20.json; .hermes/logs/keywords-detox-audit-2026-11-14.json / -11-20.json; .hermes/logs/b1c-queue-progress.json (last order 30, 10-29)
校准状态: 已校准至 2026-11-20 20:52（GSC 11-19 批 / SERP 11-19 / live 11-20 / products.ts 当前工作树 / 11-20 门审 JSON）
撤回声明: 无数据撤回。两项条件更正: ① 对端文档「11-25 导出判破零」按 3 天导出滞后应为方向读数（数据日约 11-22），干净 7d 在 12-04；② ledger EXP-FOODBOX-OPP01 的 change=NONE 与 11-18 实际 desc 部署不符，记 A71，不重写旧块。
```

---

## 8. K3 / 管理员动作（本 run 的 request_human）

1. **调度器登录拒绝（P1，跨 7 条 ZP 任务 = 6 条 `2147946720` + gsc `Result=1`）**：`2147946720` 仍在；本车道本轮成功不关闭它。请管理员执行审计，canary 通过后再 `-Apply -All -CanaryVerified`：
   ```
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\repair-zp-scheduler-logon.ps1
   ```
2. **GSC 数据供给（P1）**：补 2026-11-20（及缺的 11-13/14/15/17/18）四档 24h/7d/28d/3mo 到 `GSC数据/`；重启 7892 代理后跑 `python scripts/gsc-cliff-detector.py` + `node scripts/rebuild-gsc-index.mjs --write`。这是恢复系数与 11-21 份额检查的前置。
3. **`食品包裝印刷` title 解冻（P2，条件）**：仅在 12-04 轮仍 0 点击且 ≥100 imp 时，请 K3 对 §3 的 57→55 候选给「准/不准」一句话；未拍板前本车道保持 HOLD。

---

## 9. NEXT（下一轮可执行）

- **2026-11-27（周五）**：读最新导出（数据日约 11-23，5/7 天）做 `食品包裝印刷` 方向读数；不判胜负、不改字段。复核 gsc 11-21 份额检查与貼紙第七窗是否已闭环。
- **2026-12-04（周五）**：首个干净 7d（数据日 ≥11-25）+ 11-08 批 28d 82.1% 经营判决窗。若 `食品包裝印刷` 仍 0 点击且 ≥100 imp → 提交 §3 给 K3；若已破零 → STOP，不再动 title。
- 每轮开工仍先读 `run-context` / `lane-status` / 契约 / 账本；本轮未改 `src`、未改任何 sibling 文件、未写账本（跨车道避让）、未 commit/push（host wrapper 处理）。
- 跨车道避让记录：今日已落盘的 sibling 产物 = `2026-11-20-ZP-gsc-feedback.md` + `gsc-daily-anomaly-2026-11-20.json` + ledger `retest_gate_2026_11_20`、`2026-11-20-ZP-daily-content.md` + `discussion-input-2026-11-21-sticker-title-eval.md`、`docs/2026-11-20-gsc-decline-diagnosis-and-flywheel-sprint-pool.md`；本 run 全部只读，未改写其中任一文件。
