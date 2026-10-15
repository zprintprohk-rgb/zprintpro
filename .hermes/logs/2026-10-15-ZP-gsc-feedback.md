# GSC Feedback Loop — 2026-10-15（ZP-gsc-feedback · 新档消费轮 · 10-14 STALE 重做轮 · 解除条件②达成）

VERDICT: OK
RECOVERY: 97.2%（实时 24h 展示 569 / 断崖前固定基线 585.2；源 `.hermes/logs/gsc-cliff-2026-10-15.json` → `realtime_24h.recovery_ratio_vs_precliff=0.972`，本 lane 复算 569÷585.2=0.97231 一致；窗口 2026-10-14T01:00~2026-10-15T00:00）｜**逐日序列 = 10-12 报 7.5%（44/585.3）→ 10-13 报 127.6%（747/585.3）→ 10-15 报 97.2%（569/585.2）**，三点之间仍有 2 处空档（10-13 窗↔10-15 窗间 ~28h）⇒ 点非连续线｜同档三站点 28d 数据日龄 **3 天**（档止 2026-10-12）⇒ `alerts=[]`，**10-12/10-13 的 WARN_STALE 解除、无 CRITICAL_CLIFF**｜**解除条件 ①1/3 日 ②✅达成（三站 28d 日均 581.7/日 ≥500）③K3 GA4 待办 ⇒ 灾难维持橙（观察级），未解除**
CONSUMED: run-context-ZP-gsc-feedback.json @ 2026-10-15 22:43:03（preflight ok 6/6 · this_run_key a455842fac59f595 · lock pid 33652 · **retry_queue=1 项** · sibling_lanes 2 条）| lane-status.json @ 2026-10-14T22:43:05Z（local 2026-10-15 06:43；verdict=ATTENTION · problems=6 · bus_records=32）| lane-results-bus-contract.md（v1）| zprintpro-gsc-feedback-loop.md（RECOVERY-MODE-2026-10-12 块 + K3-BRAIN-INJECT-2026-10-09 + v9.3 指令区）| sop-10-gate.md | .hermes/logs/gsc-cliff-2026-10-15.json + gsc-cliff-2026-10-13.json + gsc-cliff-2026-10-12.json | GSC数据/index.json | .hermes/_gsc1015_queries.json（存在性 + 键名/行数直读）| .hermes/logs/keywords-detox-audit-2026-10-15.json | .hermes/logs/sku-title-v5-audit-2026-10-15.json | .hermes/logs/2026-10-15-a2-baseline-probes.md/.json（只读）| docs/2026-10-15-w1-verdict-recovery-chain-fix-and-w2-kickoff.md | docs/2026-10-15-w1-ctr-batch-paper-bags-menus-packaging.md | docs/2026-10-12-recovery-lane-defense-plan.md | 上轮报告 2026-10-13-ZP-gsc-feedback.md + 2026-10-13-gsc-suggested-src-fixes.md | .hermes/logs/2026-10-15-ZP-daily-content.md（只读）| 本 run web_fetch ×3（2026-10-15）
DELIVERED: .hermes/logs/2026-10-15-ZP-gsc-feedback.md（本报告）, .hermes/logs/2026-10-15-gsc-suggested-src-fixes.md（FIX-1~FIX-13 状态更新 + 3 条新增线上实证）, .hermes/logs/2026-10-14-ZP-gsc-feedback.md（10-14 STALE 补记 · 闭合总线账本）, .hermes/industry-keyword-matrix.json（新增 `gsc_feedback_2026_10_15` block + `last_updated` / `last_updated_event` / `last_gsc_feedback_update` 3 处元数据，旧值以「前值(10-13):」保留）, GSC数据/index.json（补登 2026-10-15 档 ×12 · totalFiles 165→177 · **freshnessStatus STALE→FRESH（落盘日口径 0 天；档内数据日 10-12 = 龄 3 天）** + filesByDate/notes/actionRequired/stalenessNote 更新）
NEXT: ① **K3 每日导一份「24小时三站点汇总」档**（解除条件①自动累积；10-16/10-17 两日仍 ≥60% + GA4 核验 ⇒ 可宣布解除、增产接棒）② K3 三项核验（GA4 实时 / GSC 安全性与手动操作 / 无痕搜 3 词）——条件③最后一环 ③ 拉料缺口：**3mo 窗（连续第 4 档缺）** + per-query 转**多行**（10-15 已落单行 `_gsc1015_queries.json`）+ 24h 落机器格式（`.hermes/logs/gsc-24h-<date>.json`）④ **10/16 盲开正式判读**（年賀状簇 / en holiday cards；10-15 档仍 0 / 未列 ⇒ 若仍 0 启 Plan B：site: 收录诊断 + sitemap 条目核对，先修收录不追加资产）⑤ **W2 年賀状早鸟页割引真值 = K3 给**（10/31 硬截止，禁编数字；骨架已落）⑥ **10/19 title 解冻 TRIM 批**纳入第 4 条超线 `/en/category/greeting-cards/` ≈84 + 存量 3 条（77 / 66 / 59）；**同批须先清门童 #27 hard 8**（PRICE_MISMATCH 7 + FILLER_WORD 1），否则该批 title 变更会被 staged 硬拦 ⑦ **W1 CTR 批验证窗首判 = 下一份 28d 档（建议 10-22 导出）**，当前 28d 窗全在修复前 ⇒ 此刻不得判 CTR 成败 ⑧ §0.0 解禁块 (a)/(b)/(c) 裁决（解锁 6 槽 v22 残留 + FIX-7 en 贺卡页名片残留/繁中量词）⑨ 管理员一次性：`scripts/reset-stuck-lanes-20261013.ps1`（清 4 车道残留 Running 实例 + 删 legacy `\ZprintPro-CronWatchdog-2125`）⑩ 纸袋族交期三口径 + `price_range`/`basePrice` 内战各请 K3 一句话
RETRY_OF: **ZP-gsc-feedback-20261014T224345**（总线 verdict=OK 但 `report=NONE` / `files=[]`；lane-status 判 2026-10-14 = **STALE「跑过但无当日报告」**，recovery_plan.action=`retry`）→ 本轮**优先处置**：① 10-14 车道空转根因 = 当日**无新 28d 档**（最后完整档 10-09 止于 10-05）+ **24h 档命名漂移**（旧 `实时24小时*` → K3 新导出 `24小时三站点汇总数据*`，检测器 glob 匹配不到，判定链断档）⇒ 车道跑但喂不进数据、零产出；② 该缺口已由 **K3 10-15 12:09-12:15 导新档** + **10-15 人手会话修检测器**（W1 判决 §1.1/§1.2）+ **本 lane 消费新档**三段闭合；③ 补写 `.hermes/logs/2026-10-14-ZP-gsc-feedback.md`（标注补记、`VERDICT: FAILED` 零产出事实、不含虚构交付）使 2026-10-14 具备日期前缀命中的报告 ⇒ STALE 闭合。**不重做** 10-13 已交付项（锚点表/c 池/质量三件套 = ALREADY_DONE 处理；其数据基础 10-09 档本轮已被新档取代 ⇒ 锚点表作**合法刷新**，契约 §二.2「换天换 target = 新工作」）

---

## 0. 本轮定位 · 幂等 · 跨车道避让

| 项 | 本轮实测 | 判定 |
|----|---------|------|
| 车道 / 触发 | `ZP-gsc-feedback` 22:43 法定窗；`run-context.generated_at = 2026-10-15 22:43:03`，`preflight.verdict = ok`（6/6：repo/branch=main · deps 328 包 · lock_free · prev_run_known=true · lane_status=ATTENTION · lock_acquired pid 33652） | ✅ 允许作业 |
| 幂等键 | `this_run_key = a455842fac59f595`（10-13 轮 `746c81db345ed352`、10-14 轮 `e0ab91cb9282c6a5`，换日均不同 ⇒ 新工作）；`lane-status.warnings` 无**新增** `DUPLICATE_IDEMPOTENCY_KEY`（唯一一条仍是 ZP-blog-deepfix 10/10 历史告警 `e5038594dc97fb9f`） | ✅ 契约 §二.2 |
| `previous_run` 账本 | run_id `ZP-gsc-feedback-20261014T224345` · verdict=OK · state=completed · **report=NONE** · files=[] · pushed=true · head=`e81631c0`；`latest_report` = `.hermes/logs/2026-10-13-ZP-gsc-feedback.md`，其 `delivered_files_from_report` 4 项（10-13 报告 + suggested-fixes + matrix block + GSC index） | ✅ 已交付项**不重做**；10-14 缺口见 RETRY_OF |
| 数据档事实 | **新完整档到窗**：`GSC数据/*2026-10-15.xlsx` ×12（24h/7d/28d × 三站点汇总 + hk/jp/us，K3 12:09-12:15 导出）；**无 3mo 窗**（连续第 4 档缺）；**per-query 首次落机器格式** `.hermes/_gsc1015_queries.json`（hk28 553 / us28 525 / jp28 166 / hk24 64 / us24 26 / jp24 9 行）但为**单行大 JSON** ⇒ 无 node 车道不可逐词解析 | ⚠️ 28d/24h 总量与断崖判据**一手可用**；词级数字**只能经 W1 判决文档转录消费**（已标注二手） |
| 跨车道避让 | 今日实跑兄弟车道 = **ZP-daily-content（21:17）**，其 DELIVERED = `src/data/sku-seo-data.ts` / `src/data/products.ts` / `.hermes/logs/b1c-queue-progress.json` / `.hermes/logs/2026-10-1{4,5}-ZP-daily-content.md` —— **与本 lane 本轮 5 个产物零交集**；`run-context.sibling_lanes` 两条仍写 PENDING（生成于 22:43:03 而 lane-status 快照为 10-15 06:43，快照滞后，**以实体报告为准**） | ✅ 零撞车面；本轮**零 src 改动** |
| 人手 / autoclaw 会话产物（只读登记，零改写） | `docs/2026-10-15-*.md` ×9（W1 判决 / W1 CTR 批 / W2 开工 / 两周计划 / 簇 2 收尾 / 簇 4 / hero-bar / CF workers / nengajo 骨架）· `.hermes/_gsc1015_extract.py` + `_gsc1015_queries.json` + `_gsc1015_matrix.py` · `.hermes/logs/2026-10-15-a2-*`（7 件）· `.hermes/logs/{keywords-detox,sku-title-v5,sku-title}-audit-2026-10-15.json` · `GSC数据/*2026-10-15.xlsx` ×12（K3 导出）| ✅ 只读 |

**Run type**：gsc-feedback-loop 完整流程（结果总线契约 → retry_queue 优先处置 → STEP 0.5 断崖检测器消费 → 恢复曲线 + 解除条件进度 → 数据管线缺口核查 → 锚点表刷新（en/ja/zh + 任务 J）→ CTR 池 + W1 歼灭批 → 盲开词纪律 → churn 盯梢 → title 线上实测 + 门童 #27 → 门童 #29 → 质量三件套（可复算部分）→ 品牌监测 → 301/路由验证 → 线上新观察 → matrix 回灌 → GSC index 维护 → src 修复建议 → SOP-10 + 数据来源 + 诚实清单 + spam 恢复周报第二版），**无简化、无延后**。
**环境**：pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 明示**不重试**）——全程仅用文件工具（read/glob/grep/write/edit）+ web 工具；`python scripts/gsc-cliff-detector.py` **未在车道内实跑**，改为**消费其已落盘产物** `gsc-cliff-2026-10-15.json`（修复后首读，字段完整）；xlsx 为二进制、`_gsc1015_queries.json` 为单行大 JSON ⇒ 二者车道内**不可直解**（如实标注，不用推测值充数）；git commit/push 由 host-side wrapper 在本 lane 退出后执行。

---

## 1. Freshness 门禁判定（§K.1.3 + 恢复模式块）

| 档 | 落盘日 | 落盘日口径龄 | 档内数据日 | 数据日口径龄 | 判定 | 处置 |
|----|--------|-------------|-----------|-------------|------|------|
| **10-15 档 ×12（新）** | 2026-10-15 12:09-12:15 | **0 天** | **2026-10-12** | **3 天** | 🟢 **FRESH**（≤72h）+ 检测器 `alerts=[]`（10-12/10-13 的 WARN_STALE 解除） | 28d/24h **总量与断崖判据一手可用**；词级数字以 W1 判决转录消费并标注 |
| 10-09 档 ×12（上轮唯一完整档） | 10-9 02:0x | 6 天 | 2026-10-05 | 10 天 | 🔴 STALE（已被新档取代） | 停止作为判据基础（上轮锚点表/c 池的继承基础就此作废） |
| 实时 24h 档 10-12 / 10-13 | 10-12 / 10-13 | — | 窗口 10-09T04:00~10-10T03:00 / 10-11T22:00~10-12T21:00 | 5 / 3 天 | 🟢 曲线点 1 / 点 2 | 曲线序列 |
| **24h 汇总档 10-15** | 2026-10-15 | 0 天 | 窗口 2026-10-14T01:00~2026-10-15T00:00 | 0 天 | 🟢 **FRESH** | **曲线点 3（本轮主消费）** |

- **诚实改写（本 lane 自办）**：`GSC数据/index.json` 原 `freshnessStatus=STALE / stalenessDays=4 / latestFreshData=2026-10-09` 已滞后于今日新档 ⇒ 本轮改为 `FRESH / stalenessDays=0 / latestFreshData=2026-10-15 / latestDataDateInFile=2026-10-12 / inFileDataAgeDays=3`，并补登 10-15 档 ×12（`totalFiles` 165→177）+ notes/actionRequired/stalenessNote 更新（属**基线更正**，非撤回）。
- **冲突处理（显式声明）**：§K.1.3「STALE 禁数字结论」在本轮**不触发**（新档落盘日口径 0 天 = FRESH）；数据日口径 3 天亦在 GSC API 常态延迟（2-3 天，§K.1.2）之内 ⇒ **允许**做 28d 词级判读。唯「3mo 长窗/品牌长窗」因连续第 4 档缺继续 `PENDING`。

## 2. STEP 0.5 · 断崖检测器判读（恢复模式块第 1 条）

**输入**：`.hermes/logs/gsc-cliff-2026-10-15.json`（本 lane 消费其已落盘产物；未重跑脚本——pwsh 禁用）

| 站点 | 档内最新日 | 龄 | 最新日展示 | 前 7 日均 | 近 3 日均 | 28d 日均 | 28d 合计 | cliff_ratio | depression_ratio | 判定 |
|------|-----------|----|-----------|----------|----------|---------|---------|------------|-----------------|------|
| hk | 2026-10-12 | 3 天 | **504** | 429.3 | 427.3 | 384.0 | 10,753imp / 310clk | 1.174 | 1.113 | 无断崖；最新完整日 = 28d 日均的 **131%** |
| jp | 2026-10-12 | 3 天 | 74 | 73.1 | 62.3 | 71.6 | 2,004 / 28 | 1.012 | 0.871 | 无断崖 |
| us | 2026-10-12 | 3 天 | 98 | 102.4 | 90.7 | 126.1 | 3,531 / 35 | 0.957 | **0.719** | 无断崖；三站中唯一 28d 窗内仍低于均值者（断崖伤混合窗），未触 <50% 阈 ⇒ 无 `WARN_DEPRESSED` |

- **`alerts = []`，`CRITICAL_CLIFF = 0`，`WARN_STALE = 0`** ⇒ 按恢复模式块：**不进入「只写断崖证据」分支**，进入**正常判读分支**（词级降置信声明解除）。
- **判定链修复（只读登记）**：10-14 起判定链断档根因为 **24h 档命名漂移** + 28d 档停在 10-05；修法（W1 判决 §1.2，他人会话落地）= ① `REALTIME_PATTERNS` 扩展兼容 `24小时三站点汇总*` ② **恢复系数分母固定为常量 585.2**（原动态 mean28 分母在新档会滑入断崖期使逐日不可比 ⇒ 固定基线是解除条件①判定前提）。本 lane 据此采用 585.2 口径，并声明与 10-13 报告的 585.3 差异仅为加总取整。

## 3. 恢复曲线 + 解除条件进度（恢复模式块第 2 条 · 逐日序列）

```
恢复系数 = 实时 24h 展示 ÷ 断崖前固定基线 585.2

2026-10-12 报  ████▏                                             7.5%   (44 / 585.3)   窗口 10-09T04:00 ~ 10-10T03:00
2026-10-13 报  ███████████████████████████████████████████████████████████  127.6% (747 / 585.3)  窗口 10-11T22:00 ~ 10-12T21:00
2026-10-15 报  ██████████████████████████████████████████████████████       97.2%  (569 / 585.2)  窗口 10-14T01:00 ~ 10-15T00:00
              （10-13 窗↔10-15 窗 之间 ~28h 无导出 ⇒ 曲线是三点折线，非连续日序列）
阈值参考：  ≥60% = 部分恢复    ≥90% = 基本恢复   连续 3 日 ≥60% = 再评估启动
```

| 解除条件（strategy §1.2） | 判据 | 本轮状态 |
|---|---|---|
| ① 恢复系数**连续 3 日 ≥60%** | 固定基线 585.2 逐日判定 | **1/3 日**（10-15 = 97.2% ✅；10-13 = 127.6% 因中间空档不计入连续日）——K3 每日导 24h 汇总档即可自动累积 |
| ② 28d 日均（三站合计）**≥500** | 新 28d 档 | ✅ **达成 581.7/日**（384.0 + 71.6 + 126.1；窗口内含断崖日 = **含伤达标，更强**） |
| ③ **K3 GA4 实时核验** | K3 人肉 | ⏳ 待 K3 |

- **双方法复算（§0.23.2）**：法1 检测器 ratio **0.972**；法2 本 lane 复算 569 ÷ 585.2 = **0.97231** ⇒ 一致。条件② 复算：384.0+71.6+126.1 = **581.7** ✓（与 W1 判决 §2 一致）。
- **判定：橙（观察级）维持，未解除** —— 2/3 条件达成、逐日曲线健康（hk 最新完整日 504 = 断崖前基线 377 的 134%），但条件①未满 3 日、条件③未做 ⇒ 恢复模式车道块继续生效。
- **归因红线（不作因果结论）**：本 lane 无改动前后同窗对照；10-13 窗 ~80% 落在 B1a/B1b 去毒部署（10-12 ~07:00）之前、10-15 窗全在其后 ⇒ **两点机制不同源，逐点差分不可作因果证据**；恢复期所有位置数据在宣布解除前按「摆动期」处理。

## 4. 数据管线缺口核查（FIX-4 现状）

| 缺口 | 上轮（10-13） | 本轮（10-15） | 判定 |
|------|--------------|--------------|------|
| 完整 28d ×12 | ❌ 连续第 2 轮缺（最后 10-09 档） | ✅ **已到（10-15 档 ×12）** | **解除**（4 个 zh T1 锁词等的首要阻塞源消失） |
| per-query 机器格式 | ❌ 连续第 2 轮未落（10-09 为单行 extract.json） | 🟡 **首次落盘** `.hermes/_gsc1015_queries.json`（hk28 553 / us28 525 / jp28 166 / hk24 64 / us24 26 / jp24 9），但为**单行大 JSON** | **部分解除**；车道内仍不可逐词解析 ⇒ 词级仍需转录或改**多行** |
| 3mo 窗 | ❌ 连续第 3 档缺 | ❌ **连续第 4 档缺** | 品牌长窗/长趋势仍不可算 |
| 实时 24h 机器格式 | ❌ 未落 | ❌ 未落（仅 xlsx + 检测器 JSON 代理）；检测器 glob 已兼容新命名 | 仍请求 `.hermes/logs/gsc-24h-<date>.json` |
| 索引覆盖率 / 人工处罚页 | 未核验 | 未核验（无 GSC API / 无浏览器凭证） | 挂账（不推断） |

> **本 lane 自办与本 lane 不能办的分界（诚实声明）**：index 登记/元数据/报告/matrix 回灌 = 本 lane 自办（已做）；xlsx 解析、单行 JSON 拆行、3mo 拉档、GA4 核验 = 需 node/python 会话或 K3 真人动作（**车道内不做，也不虚报**）。

## 5. 锚点表刷新（en 8 + ja 9 + zh 16 + 任务 J 8 锁词）

> **口径声明（重要）**：词级数字取自 **`docs/2026-10-15-w1-verdict-recovery-chain-fix-and-w2-kickoff.md` §3 对本档 xlsx「查询数」sheet 的一手直读转录**（hk28 553 / us28 525 / jp28 166 行）；本 lane **未直解 xlsx**（二进制）也**未解析单行 queries.json** ⇒ 全部标注为**二手转录**，与 10-13 轮的「docx 转录」同类。凡该文未列出的词，一律判 `PENDING`（**不推断**）。
> **上轮 ALREADY_DONE 的处理**：上轮锚点表以 10-09 档为基（数据日 ≤10-05，断崖命中前窗口）；其基础档已被 10-15 档取代 ⇒ 本轮为**合法刷新**，非重复劳动（契约 §二.2）。

**zh-hk（12 项可读，全部核心带钱/大词零回退，多数改善）**

| 词 | 上轮 28d（10-09 档） | 本轮 28d（10-15 档） | 判定 |
|---|---|---|---|
| 紙袋印刷 | 77 / 8.3 | 76 / **7.3** | ✅ +1.0 位；c 仍 0（W1 CTR 批 10-15 凌晨才上线，28d 窗全在修复前 ⇒ **此刻不可判 CTR**） |
| 印刷紙袋 | 72 / 8.2 | 73 / **7.3** | ✅ +0.9 |
| 食品包裝印刷 | 117 / 9.7 | 118 / 9.8（24h 2.0，2 imp 小样本） | ✅ 持平 |
| 餐牌印刷 | 58 / 9.8 | 48 / 9.8 | ✅ pos 平；imps 58→48 观察，**不改 title**（churn 冻结窗） |
| 利是封訂製 / 訂做利是封 | 19-30 | 24 / **13.3** / CTR 4.2% | ✅ 大幅改善（Q4 旺季词） |
| **海報印刷** | 180 / 16.1 | **248（+38%）/ 11.9** | ✅✅ 簇 3 posters hub 重写红利兑现 |
| 宣傳單張 | 23.9-30.2 | 181 / **16.8** | ✅ 改善 |
| 月曆印刷 | 16.4 | 102 / 16.1 | ✅ 平（Q4 季节词） |
| 包裝盒 | 68 | 91 / 31.9 | ✅ 展示增 |
| **貼紙印刷** | 26.5 | 152 / **29.9**（24h 36.3） | ⚠️ **+3.4 软化** —— 簇 1 重写后 consolidation 未完成（重爬中），**禁动 title**，W2 承接页强化按计划走 |
| 印海報 | 15.1 | 141 / 14.1（24h 10.0） | ✅ |
| 訂做紙袋 | 24h 38.4 | 49 / **13.6** | ✅✅ |

**en（6 项可读；软化项均无本方批次归因）**

| 词 | 上轮 | 本轮 | 判定 |
|---|---|---|---|
| small batch sticker printing | 5.6-5.8 | 89 / **4.8**（24h 2.0） | ✅ 簇 1 红利延续 |
| a2 poster | 30.6 | 74（+155%）/ **9.7**（24h **1.0**） | ✅✅ |
| saddle stitch booklet printing | 104 / 4.2 | 189 / **11.7**（24h 11.0） | ⚠️ **软化 +7.5** —— 断崖伤混合窗（无任何批次触碰 booklet 面）⇒ W2 防御动作（内容层），非批回退 |
| china catalog printing | 17.7-26.7 | 101 / **38.2** | ⚠️ 软化（断崖伤残留）；W3 承接页差异化**提前到 W2** |
| zprint / z print（品牌词） | 6.4-7.6 | 48 / **13.6** / CTR 6.2% | ⚠️ 品牌词应 pos 1 ⇒ **W2 排查压制源** |
| doujinshi printing | 11.2 | 35 / 11.2 | ✅ 平（W3 C107 专题主攻） |

**ja（5 项可读；全线改善或持平，无回退）**

| 词 | 上轮 | 本轮 | 判定 |
|---|---|---|---|
| コミケ 印刷 | 175 / 20.8 | 185 / **19.6** | ✅ 微升（W3 C107 专题仍是大招） |
| クラフト紙 パッケージ印刷 | 55+50 / 24 | 109 / **17.8** | ✅ +6.2 |
| 教科書 / 教材 印刷 | 20.4-34.6 | 54 / **17.4** | ✅ 大幅改善（churn 判据日 10/19 的「≥30」触发条件在当前档下**不成立**；仍零动作） |
| 卒業アルバム 印刷 | 66.1 | 9 / 39.3 | ✅（低量改善） |
| 年賀状 簇 | 0 | **0** | ⏳ 仍未破零（见 §7） |

**任务 J 8 个 T1 锁词（每周追踪）**

| 锁词 | 本轮可读值 | 状态 |
|------|-----------|------|
| 紙袋印刷 | 76 / 7.3 | ✅ 有值 |
| 印刷紙袋（= 貼紙印刷族外同层） | 73 / 7.3 | ✅ 有值 |
| 食品包裝印刷 | 118 / 9.8 | ✅ 有值 |
| 貼紙印刷 | 152 / 29.9 | ✅ 有值（软化，盯梢） |
| 宣傳單張 | 181 / 16.8 | ✅ 有值 |
| 包裝盒印刷 / 紙盒印刷 / 包裝盒訂製 / 即日印刷 / 書刊印刷 / 騎馬釘 | — | **PENDING** —— 词级源为**单行** `_gsc1015_queries.json`，无 node 不可逐词抽取（连续第 3 档同类缺口；根因从「单行 extract.json」变为「单行 queries.json」） |

**硬约束结论**：本方三批次（B1c 簇 1/2/3 + W1 CTR 批）关联词面**零回退**；全部软化词（貼紙印刷 +3.4 / saddle stitch / china catalog / zprint 品牌）均为断崖伤残留或第三方压制，**无一批次归因**，且全部已有既定处置动作（W2 执行单）。

## 6. CTR c 值一等判据 · CTR 修复候选池 · W1 歼灭批

- **池（10 词，沿用 10-10 基线）**：貼紙印刷 156im c0 · 月曆印刷 118im c0 · 宣傳單張印刷 105im c0 · 食品包裝印刷 119im c0 · small batch sticker printing 99im c0 · 書刊印刷 94im c0 · 紙袋印刷 77im c0 · 印刷紙袋 72im c0 · 餐牌印刷 59im c0 · ja 特急印刷 激安 16.1 c0。本轮对池内 4 词的位置刷新见 §5（位置改善 ≠ CTR 已修，28d 窗 c 仍 0）。
- **W1 CTR 歼灭批已上线（10-15 01:48-01:57，commit `99269163` + `a330f967`）**：4 词承接页 = 紙袋印刷 / 印刷紙袋 / 食品包裝印刷 / 餐牌印刷，共 **16 格（8 title + 8 desc）**，paper-bags / menus / packaging 三类目 × zh-hk/en/ja。
- **根因修正（重要，战略原假设被实测推翻）**：原判「首页词 0 点击 = title/desc 钩子失效」；实测真因 = ① **title 截断**（paper-bags zh/en/ja 半角当量 **78 / 124 / 108**；packaging en **94**；menus zh/ja 61 / 64 ⇒ 价格钩与品牌**全部落在 Google 截断线之后**，从未被展示）② **假价清毒**（menus desc/title「HK$0.22 / $0.14 / ¥20」无任何 SKU 支撑、最廉真值 = 過膠 HK$5；packaging en「$0.85」陈旧）③ **幽灵价连带**：`category-conversion-blocks.ts` menus 块（客户可见 + FAQPage schema 源）整块建立在已下架「一次性餐牌」上，**已由他人会话同日修复 6 处**（只读登记）。
- **验证窗纪律**：首判 = **下一份 28d 档（建议 10-22 导出）**；当前 28d 窗**全部早于修复上线** ⇒ **此刻不得判 CTR 成败**（诚实红线）。
- **本 lane 线上抽验（一手）**：`web_fetch https://zprintpro.com/zh-hk/category/paper-bags/`（HTTP 200, 2026-10-15）`<title>` = `紙袋印刷 100個起 HK$3-8/個 | 牛皮白卡環保袋 | 智印港` —— 与批内 zh 新 title **逐字一致**，当量 52 ⇒ **批已上线实证**。

## 7. 盲开词纪律 —— 每轮必查（0→有展示即报胜）

| 盲开词 | 上轮（10-13） | 本轮（10-15 档） | 状态 |
|--------|--------------|-----------------|------|
| 年賀状印刷 / 2027年賀状（ja） | 0 展示（未见破零证据） | **0 / 0**（W1 判决 §3.3 逐词对账明确列出） | 🚩 **仍未破零**（连续多档） |
| corporate / business / custom holiday cards（en） | 0 展示（未见破零证据） | **该簇未出现在可读对账表中** ⇒ 无正面证据，也**不断言零** | 🚩 仍未破零 |
| 承接层落地证据（新版） | en 类目 title 已含 `Corporate Christmas`（10-13 实证） | 本 lane 复验 `/en/category/greeting-cards/`（HTTP 200）`<title>` **仍未变**：`Business & Holiday Card Printing from $0.50 \| Corporate Christmas 10 MOQ \| ZprintPro` | ✅ title 层承接词在位 |
| 盲开承接页建设 | Plan B 预置 | **W2 已开工**：`docs/2026-10-15-nengajo-2027-earlybird-page-skeleton.md`（骨架）；**割引真值必须 K3 给**（禁编数字）；**10/31 硬截止** | 🟡 结构先行，数字待 K3 |

- **10/16 = 大脑区定义的正式判读日**（K3-BRAIN-INJECT-2026-10-09 第 3 条）：10-15 档**既未提供反证也未提供正面证据**（0 / 未列）⇒ **不提前判胜/判败**；若 10/16 仍 0 ⇒ 启 Plan B：① `site:` 查 ja greeting-cards 页 / en 类目页收录状态 ② GSC 请求索引 + sitemap 条目核对（`public/sitemap-ja.xml` / `sitemap-en.xml`）③ **不追加新资产，先修收录**。
- **倒计时**：年賀状早割「10 月末まで」⇒ 距今 **16 天**（只报时，不动作；数字口径见 §16 诚实清单）。

## 8. churn 组盯梢

| 词 | 9/18 | 10-05 | 10-09 档（上轮） | **10-15 档（本轮）** | 纪律 / 本轮处置 |
|----|------|-------|-----------------|---------------------|----------------|
| 教科書 印刷（jp） | 51.2 | 28.8 | 34.6 | **17.4** | **10/19「≥30 → 启动诊断」的触发条件在当前档下不成立**；仍零动作（冻结纪律）；⚠️ 该值取自含断崖伤混合窗 ⇒ 判据日须以最新档复算 |
| saddle stitch booklet printing（us） | ~4 | 4.1 | 4.2 / c2（24h 2.5） | **11.7（+7.5 软化）** | 断崖伤（无批次触碰该面）⇒ W2 防御：booklet PDP 正文深度 + FAQ 保鲜 |
| catalog china 簇 | 18.4-20.8 | 17.4-21.4 | 17.7（变体 26.7） | **38.2（软化）** | 冻结至 10/19 的观察窗内；W3 差异化承接**提前到 W2** |
| food packaging（us） | 16.8 | — | 25.0 | 未列 | 维持观察（E2 packaging:en FAQ 排期不变） |
| a2 poster（us） | 25.2 | — | 30.6 | **9.7（24h 1.0）** | ✅ 改善；词序变体归并中，不动作 |
| zprint 品牌词（us） | — | — | 6.4-7.6 | **13.6** | 品牌词应 pos 1 ⇒ W2 排查压制源（战略 §2.2 既定） |
| 貼紙印刷（hk） | — | — | 26.5 | **29.9（+3.4）** | 禁动 title（churn）；W2 承接页强化 |

## 9. Title 线上实测 + 门童 #27（title-v5）

| 页面 / 槽 | 实测 | 判定 |
|---|---|---|
| `/zh-hk/category/paper-bags/`（W1 批） | `紙袋印刷 100個起 HK$3-8/個 \| 牛皮白卡環保袋 \| 智印港`（当量 52） | ✅ 目标区 50-57 **且与批内新值逐字一致**（本 lane 一手） |
| `/en/category/greeting-cards/`（FIX-9 复验） | `Business & Holiday Card Printing from $0.50 \| Corporate Christmas 10 MOQ \| ZprintPro` —— 与 10-13 实测**同字符串** | 🔴 **仍为 84 当量（超 58 阻断线 +26）**；本批零动作（title 冻结至 10/19）⇒ 入 10/19 TRIM 批 |
| 存量超线 3 条 | `services/catalog-printing-china` 77 / `rush-printing-delivery` en 66 / ja 59 | 🔴 解冻后共 **4 条**进 TRIM 批 |
| **门童 #27 10-15 审计（他人机器产物，只读消费）** | `slotCount 252 / hardCount 8 / warnCount 28`；hard = **PRICE_MISMATCH 7** + **FILLER_WORD 1** | 🔴 **下一步 title 编辑的硬拦清单** |

**门童 #27 hard 8 明细（本轮新增可用情报，供下一批 title 工作）**

| # | slug / locale | title 现况（当量） | hard 规则 | 证据（审计 msg） |
|---|---|---|---|---|
| 1 | small-batch-stickers / zh-hk | 小批量貼紙 10 張起 HK$0.45（55） | PRICE_MISMATCH | 标题价 0.45 ≠ basePrice(zh-hk)=38 |
| 2 | small-batch-stickers / en | Small Batch Custom Stickers 50pcs from $0.045（57） | PRICE_MISMATCH（+ MOQ_DRIFT warn） | 0.045 ≠ basePrice(en)=0.55；MOQ 50 ≠ minQuantity 10 |
| 3 | same-day-flyers / zh-hk | 即日印刷 傳單 … HK$1.30起（53） | PRICE_MISMATCH | 1.3 ≠ basePrice 0.55 |
| 4 | same-day-flyers / en | from $0.16（55） | PRICE_MISMATCH | 0.16 ≠ 0.95 |
| 5 | same-day-flyers / ja | ¥25〜（54） | PRICE_MISMATCH | 25 ≠ 125 |
| 6 | a2-posters / zh-hk | HK$9起（55） | PRICE_MISMATCH | 9 ≠ 16 |
| 7 | a1-posters / zh-hk | HK$45起（53） | PRICE_MISMATCH | 45 ≠ 20 |
| 8 | white-card-boxes / zh-hk | … 免費送貨（51） | FILLER_WORD | 空洞/无源/条件承诺词 |
| — | certificates / foil-stickers（frozen） | — | FROZEN_FILLER_WORD ×2（warn） | 品質保證 / 專業印刷（冻结槽只读） |

> **判据纪律**：门童 #27 pre-commit 口径 = **staged title 变更硬拦、存量入审计不拦**（AGENTS.md §5）⇒ 上述 8 条不影响普通 push，但**任何编辑这些槽 title 的批次必须先按 `products.ts` 现取价修钩**，否则被拦。warn 28 明细：LONGTAIL_SOURCE 13 / MOQ_DRIFT 5 / MOQ_UNVERIFIABLE 6 / FROZEN_FILLER_WORD 2 / PRICE_UNVERIFIABLE 2。

**诚实声明**：本轮**未在车道内重算任何当量**（无 node，`scripts/guards/title-equiv.js` 未跑）；paper-bags 当量 52 引自 W1 批内部回读值，en greeting-cards 84 引自 10-13 双方法手算并本轮**线上字符串复验一致**（字符串同 ⇒ 当量同的前提成立）。若 host 侧跑出不同值，以 `title-equiv.js` 为准。

## 10. 门禁状态（只读消费他人审计产物 + 本 lane 零 src 改动声明）

| 门禁 | 10-15 状态 | 来源 |
|------|-----------|------|
| #29 keywords-detox | **252 槽 / 0 违规**；6 槽显式豁免 = `thick-greeting-cards-400g` / `foil-greeting-cards` × 3 locale（R3_MORPHEME「数组 0 个品类语素词」） | `.hermes/logs/keywords-detox-audit-2026-10-15.json` |
| #27 title-v5 | 252 槽 / hard 8 / warn 28（明细见 §9） | `.hermes/logs/sku-title-v5-audit-2026-10-15.json` |
| #16 gsc-leak | 本 lane 零客户可见内容改动 ⇒ 不触发；存量清零状态沿用 | 本 lane 产物面 |
| S1 答案块字数断言 | N/A（零 src 改动、无答案块批次） | — |
| S2 slug 存在性 | 本 lane 零新增 slug 引用；挂账 `Q-P1-01` / `Q-P1-03` 死 slug 仍待 K3 | matrix pending_items |
| S3 平台故障阈 | **未触发**（见 §13） | a2 探针 + 本 lane web_fetch |
| §0.0 名片展示层 | 本 lane 零名片词、未动贺卡资产、未动 middleware 301；6 槽 v22 残留仍走**显式豁免**，收口待 K3 (a)/(b)/(c) 裁决 | #29 豁免清单 + 本 lane grep/read |

## 11. 质量三件套 v9.4 + M1 线（可复算部分 / 不可复算部分分列）

| 项 | 上轮 | 本轮 | 说明 |
|---|---|---|---|
| **三站 28d 合计 imps / clicks / CTR**（**本轮可复算**） | 16,388 / 358 / **2.185%**（10-09 档） | **16,288 / 373 / 2.290%**（10-15 档） | clicks **+15（+4.2%）**、CTR **+0.105pp**；双方法：310+28+35 = 373 ✓；373÷16,288 = 2.290% ✓。⚠️ 窗口滑动（旧窗含断崖前高位日）⇒ 只作趋势代理，不作验收 |
| ① pos≤10 硬计数（上轮 486） | 10-10 判定 | **PENDING** | 需逐词聚合；无 node + 单行 JSON ⇒ 不可复算（**不虚报维持值**） |
| ② pos 1-20 占比（上轮 proxy 48.6%） | 10-10 判定 | **PENDING** | 同上 |
| ③ 有点击词数（上轮 ≥27） | 10-10 判定 | **PENDING** | 同上 |
| M1 线 1（hk 7d clicks ≥25，上轮 88 PASS） | 10-10 判定 | **PENDING**（本轮未复算） | 恢复期内以**恢复系数**为日内主判据（§3） |

## 12. 品牌监测

- **10-15 档品牌数字**：可读对账产物仅给 `zprint / z print`（us）= 48im / **13.6** / CTR 6.2%（上轮 6.4-7.6 ⇒ 品牌词未居 pos 1，W2 排查）。
- **智印港 / zprintpro / zprints / ジープリント**：维持 10-10 值（智印港 14clk/22im = CTR 63.6% / pos 1.59；zprintpro 3/4 / pos 2.25；zprints 1/7 / pos 4.14；ジープリント 0 命中）—— 标注 `ALREADY_DONE(2026-10-10)`，**本轮未复算**。
- **3mo 长窗**：连续第 4 档缺 ⇒ 品牌长窗/长趋势 **PENDING**（不可与 9/30 轮同窗对比）。

## 13. 301 / 路由验证（P0-2 ACTIVE 监控 · S3 平台故障阈）

| 项 | 本轮实测 | 结果 |
|----|---------|------|
| 旧域 `/products/sticker-printing/`（本 lane 一手） | cross-origin redirect → zprintpro.com | ✅ 301/308 链证据 |
| **a2 基线探针体系（他人 10-15 12:47 机器产物，37 探针 / 143 请求）** | 状态分布 **2xx 14 / 3xx 20 / 4xx 0 / 5xx 3**；**next.config-301 样本 11/11 全部 3xx 且目标正确**；middleware 样本（`/about/` `/zh-HK/` `/quote` `/zh-hk/quote?product=` `/zh-hk/product/drink-tokens/`）**3 次确定性一致** | ✅ 重定向层通过（抽测 12/12 确定性） |
| 5xx 明细（同上） | `/ja/` **503**（复测 200/200，瞬时）、`/zh-hk/category/greeting-cards/` 终态 503、`/zh-hk/help-center/` 503、`/wp-login.php` **500 稳态**；探针自述与 420ms 突发请求密度相关 | ⚠️ 未达 S3 60min 上报阈（未观察到平台级故障：无 CF 503 集群 / 无部署卡死）；建议部署后复跑（间隔 ≥1s） |
| 新站核心页 | `/zh-hk/` `/en/` 200；`/zh-hk/category/paper-bags/`、`/en/category/greeting-cards/` 本 lane 200 | ✅ |
| `/quote-desk/` | 200 + 正文 4,730B + title `Quote Desk — Internal Tool`，**未检出登录墙信号 ⇒ 疑公开可访问** | ⚠️ 只读登记（运维/安全面，非本 lane 动作） |

**诚实声明**：抽测 + 他人探针**不代表全量 301 健康**（按 §0.30.3 卫生项定位，不重复投入）；3 例 503 为瞬时/限流型，非稳态。

## 14. 本轮新增线上观察（3 项，均只报不改）

1. **「15,000+ 客戶 / customers / お客様」claim 遍布 12+ 文件**（`contact` L55/111/167 · `WhyCustomer`/`WhyChooseUs` · `StatsBar` · `CategorySidebar` · `HotProducts` · `HowItWorks` L224-227 · `QuoteForm` L120/161/202 · `EmailSubscribePopup` · `KnowledgeSection` · `blog-posts.ts` L1658-1660 · `pillar-content.ts` · `products-content.ts` L63/302/317/2995/6358 · `sku-seo-data.ts` L2529），并在**线上**类目页实测可见（`已有 15,000+ 客戶選擇智印港`）。
   → **未断言违规**（§0.22 SOP-10 第 3 款：先问来源，不替 K3 推断）。观察到的事实是：门童 #1 现有 pattern（`1,000+` 等）**未覆盖 `15,000+` 形态**，而这是一个客户可见的绝对数字 → **请 K3 或门童 owner 确认是否属白名单口径**；若属既定口径则登记不动。
2. **纸袋类目页交期三口径内战（客户可见）**：同一页 `/zh-hk/category/paper-bags/` 出现 ① FAQ `7-12 個工作天交貨` ② Specifications `標準 3–5 天（數碼）；5–7 天（柯式）` ③ W1 批 desc `3-5 工作天`；与 daily-content 10-15 报告登记的 SKU body `3-5 / 5-7` 内战同源 ⇒ 建议 K3 一句话定口径后按簇 7 统一。
3. **纸袋类目商品卡名品牌重复 + 空洞词**：线上卡名 = `牛皮紙袋印刷訂製 100個起印 免費刀模 FSC認證 · 服裝品牌跨境電商適配 | 智印港 · 品質保證 · 智印港`（**智印港 出现两次** + `品質保證` 空洞词）。数据侧已定位半截：`src/data/products.ts` **L1486** `title_zh` 即以 `| 智印港` 结尾 ⇒ 疑似**渲染层再追加 ` · 品質保證 · <brand>`**（candidate：`src/lib/h1-builder.ts` L448-455 或类目卡模板）。需 node 会话定位后**单批修**（本 lane 无 src 写权）。

## 15. Matrix 回灌 + 本轮新增观察（供 daily-content / weekly-meta / 月矩阵 / K3 排期）

- **matrix 新增 block**：`gsc_feedback_2026_10_15`（含 run_type / data_source / step_0_5_cliff_detector / detector_chain_fix / recovery_curve / release_conditions / anchor_table_refresh（zh/en/ja + 任务 J）/ ctr_c_value_pool + w1_batch_live + root_cause_correction / blind_open_discipline / churn_watch / title_live_audit_and_guard / blind_spots_and_new_findings / redirect_301_verification / gates / quality_metrics / brand_tracking / lane_health / other_lanes_registered / pending_items / request_human / priority_boost / p0_coverage / recovery_weekly_section_second_edition）。
- **元数据 ×3**：`stats.last_updated` → 2026-10-15；`stats.last_updated_event` 与 `last_gsc_feedback_update` → 本轮摘要（**旧值以「前值(10-13):」保留**，可追溯）。
- **priority_boost**：**0 UPDATE / 0 hold-change**（恢复期观察窗保守不动；9/18 挂账 2 UPDATE `Q-P1-01/Q-P1-03` 仍待 K3）。P0 coverage **95.45% 维持**（本轮无立项/结项）。
- **本轮新增观察（7 条）**：
  1. **解除条件②已达成**（三站 28d 日均 581.7 ≥500，且为「含伤达标」）⇒ 恢复进入**确定性上升段**；只差「连续 3 日 ≥60%」计数与 GA4 核验。**K3 每日导一份 24h 汇总档**是本轮唯一的推进杠杆。
  2. **数据管线仍是恢复期最大执行瓶颈**（性质已变）：28d ✅ 到档、per-query 🟡 到但为单行、3mo ❌ 连续第 4 档缺、24h 机器格式 ❌ ⇒ 建议把「xlsx/单行 JSON → 多行 JSON」的转换固化为 host 侧一步（例如 `scripts/gsc-xlsx-extract.mjs --out .hermes/gsc-<date>/*.json`），否则无 node 车道永远只能转录。
  3. **W1 CTR 批的真因是「截断 + 假价」而非「钩子失效」** ⇒ 该认知应回灌战略文档与后续承接页批次；同时提醒：**任何 title 长度超线会静默吞掉价格钩与品牌**，这本身就是一个系统性 CTR 杀手。
  4. **门童 #27 hard 8 = 下一步 title 作业的前置债**（7 条价格钩与 `products.ts` 内战 + 1 条空洞词）⇒ 建议 10/19 TRIM 批**同一批**先修这 8 条（否则 staged 硬拦），再处理 4 条超线。
  5. **盲开词进入判读前夜**：年賀状 0/0 + 早鸟页骨架已落 + 10/31 硬截止 16 天 ⇒ 明日（10/16）判读若仍 0，**先修收录不追加资产**；割引真值必须 K3 给。
  6. **品牌词异常**（zprint 13.6 未居 pos 1）+ **贴纸软化**（29.9）两条已在 W2 执行单内（新增第 6 项、第 2 项）⇒ 本 lane 不重复动作，只作盯梢。
  7. **调度健康（延续 10-13 档口径）**：`lane-status.problems = 6`（ZP-daily-content / ZP-gsc-feedback `LastTaskResult=1`；ZP-weekly-meta 10-09 MISSING + `2147946720`；ZP-monthly-matrix / ZP-k3-review `2147946720`）——全为**调度器读数/触发装载层**，本 lane 连续两轮（10-13 / 10-15）实际启动并产出 ⇒ 触发路径未死；一次性收口需 K3 管理员（§17）。

## 16. 诚实清单（本轮做不到 / 不做的，不得当结论使用）

| # | 项 | 状态 | 原因 |
|---|----|------|------|
| 1 | `python scripts/gsc-cliff-detector.py` 实跑 | **未跑（消费产物）** | pwsh 在本 lane 沙箱被禁（v9.4 rearm，**不重试**）；改用其已落盘 `gsc-cliff-2026-10-15.json`（判据字段完整） |
| 2 | xlsx 直解（10-15 档 ×12） | **未做** | 二进制格式 + 沙箱无 node/python；词级数字全部经 W1 判决文档**转录**（已标注二手） |
| 3 | `_gsc1015_queries.json` 逐词抽取 | **未做** | 单行大 JSON（单行 2000+ 字符级），read/grep 工具无法逐词切片；故 任务 J 六词 + 质量三件套 + 品牌长窗判 **PENDING** |
| 4 | 3mo 窗 / 24h 机器格式 | **仍缺** | 档本身未提供（连续第 4 档缺）；本 lane 只能登记请求 |
| 5 | 当量 / 相似度 / tsc / build / 门童六命令 / curl / verify-deploy / schtasks | **不跑** | pwsh + node 均不可用；**本报告不虚报任何机器门禁 PASS**（#27/#29 数字为**他人**机器产物，已注明来源） |
| 6 | 索引覆盖率 / 人工处罚页状态 | **未核验** | 无 GSC API / 无浏览器凭证；挂账登记，不推断 |
| 7 | 因果归因（恢复 vs 我方整改 vs spam 压制） | **不做** | 无改动前后同窗对照；10-13/10-15 两窗机制不同源（§3） |
| 8 | 301 全量健康 | **不做** | 抽测 + 他人探针**不代表全量**（§0.30.3 卫生项定位） |
| 9 | 任何 `src/` 或客户可见内容改动（含 FIX-7/FIX-9/§14 三项） | **只报不改** | 本 lane 写权仅 `.hermes/` + `GSC数据/index.json`；FIX-7 属 §0.0 待裁决面、FIX-9 属 title 冻结域、§14 三项需 K3 口径或 src 定位 |
| 10 | 10-14 当日真实产出 | **不存在（补记）** | 10-14 车道空转（无新档 + 命名漂移）⇒ 补记文件只含**可核验事实**，`VERDICT: FAILED`，不含虚构交付 |
| 11 | git commit / push | **不做** | 由 host-side wrapper 在本 lane 退出后执行（§0.25 攒批 + 30min 硬下限） |
| 12 | 总线 `report` 字段的可能错位（**已知口径**） | **已声明** | 本轮为闭合 10-14 STALE 补写了 `2026-10-14-ZP-gsc-feedback.md`，而 `scripts/lane-git-commit.py::pick_lane_report()` 按 `sorted()` 取「今日或昨日日期前缀 + 车道后缀」的**第一份** ⇒ 总线 `report` 字段**可能落到 10-14 档**（非本报告）。经核 `scripts/lane-status.mjs` 逐日 verdict 由**文件名日期扫描**判定（不读总线 `report` 字段），故 10-14 与 10-15 两日都会判 OK、不会误判 STALE；仅 `cron-execution-report.md` / 总线 `report` 可读性受影响（与 daily-content 10-15 报告 §9.8 同型）。**下一棒若见 `previous_run.report = 2026-10-14-…`，以 `lane-status.json` 的 `days[]` + 本文件名为准** |

## 17. request_human（可粘贴 · 需 K3 / 管理员）

```powershell
rem ① K3 每日导一份 24h 汇总档（解除条件①自动累积；命名沿用 24小时三站点汇总数据zprintpro.com-Performance-on-Search-<date>.xlsx）
rem    同时建议本次补齐：3mo 窗 ×4（三站 + 汇总）
rem ② K3 三项人肉核验（决定灾难能否解除）
rem    - GA4 实时报告（条件③）
rem    - GSC 安全性與手動操作 → 手動操作（人工处罚页状态）
rem    - 无痕搜 3 词（智印港 / zprintpro / 印刷 关键词）确认展示面
rem ③ 复跑断崖检测器（K3 拉档后，续曲线点）
python F:\zprintpro-nextjs\scripts\gsc-cliff-detector.py
rem ④ 调度层一次性收口（管理员；清 4 车道残留 Running 实例 + 删 legacy 任务）
powershell -NoProfile -ExecutionPolicy Bypass -File F:\zprintpro-nextjs\scripts\reset-stuck-lanes-20261013.ps1
rem ⑤ 四方对账（任一会话）
powershell -NoProfile -Command "Get-Content F:\zprintpro-nextjs\.hermes\logs\lane-runs.jsonl -Tail 6"
powershell -NoProfile -Command "Select-String -Path F:\zprintpro-nextjs\.hermes\logs\cron-ZP-gsc-feedback.log -Pattern 'run start','dsh exit','report=' | Select-Object -Last 8"
rem ⑥ 把 xlsx/单行 JSON 转多行（需 node 会话，供无 node 车道消费）
node F:\zprintpro-nextjs\scripts\sku-title-census.mjs   rem 当量复核（替代本 lane 的手算/转录）
```

**K3 五问（决策点）**：① 每日 24h 汇总档 + 3mo 窗补齐（推进解除）② 三项人肉核验（GA4 / 手动处罚页 / 无痕搜）③ §0.0 解禁块 (a)/(b)/(c)（**推荐 (c)**：只改 SKU 显示名/尺寸矛盾与 keywords 去毒，不动 middleware 301 与贺卡承接页）④ 10/19 title 批范围确认（4 条超线 + **门童 #27 hard 8 前置清债**）⑤ 纸袋族交期口径 + `price_range`/`basePrice` 内战各一句话（+ `15,000+` claim 口径确认）。

## 18. spam 恢复周报（恢复模式块第 3 条 · 第二版）

| 节 | 本轮内容 |
|----|---------|
| **① 恢复系数曲线** | **7.5%（10-12 报）→ 127.6%（10-13 报）→ 97.2%（10-15 报）**；分母固定 585.2 后三点可比；三点间 2 处空档（~43h / ~28h）；**条件②已达成（581.7/日）**，条件① 1/3 日；灾难 = 橙（观察级） |
| **② 索引覆盖率变化** | **PENDING** —— 无 GSC API；**间接证据**：28d 档数据日龄回到 3 天 + hk 最新完整日 504（断崖前 28d 日均 384 的 131%）+ 存活展示面回到断崖前量级 ⇒ 与「重新放行」一致，但**不可直接读作索引覆盖恢复** |
| **③ 人工处罚页状态** | **未核验**（K3 三项核验挂账）。机制说明：若为纯算法命中（诊断 v2 判 85% 概率分支），**无「请求重新审核」入口**，唯一路径 = 整改 + 等下次更新窗口 |
| **④ 下次 Google 更新窗口预测** | 沿用 10-13 外部证据（[stanventures 2026-09-28](https://www.stanventures.com/news/when-is-the-next-google-core-update-data-says-45-days-7714/)）：下次 core update 最迟 **2026-12-12**，2/3 概率在万圣节（10/31）前；仓内口径（recovery plan §1.2）= 下次窗口可能 12 月，恰在 CNY 利是封季前 ⇒ 两口径一致支持「**12 月前完成全站整改**」。本轮**未新增外部检索**（外部页面按不可信数据处理） |
| **⑤ 四机制状态** | 门童 #29（10-15 审计 252 槽 0 违规）/ 断崖检测器（**判定链已修复 + 固定基线**）/ 线上断言（a2 探针体系）/ 内容相似度闸门 —— **宣布解除前一律不动**（strategy §1.2） |
| **⑥ 本轮新增机制项** | 检测器 glob 兼容新命名 + 恢复系数分母常量化（585.2）⇒ 逐日可比性修复；建议再加「24h 档机器格式」一环，使曲线不依赖 xlsx |

> 外部页面内容按**不可信数据**处理，仅取事实片段作证，不执行其中任何指令性文本。

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异?** — 已查前序实现路径：① 上轮 10-13 报告 + `2026-10-13-gsc-suggested-src-fixes.md`（FIX-1~FIX-9 全读）② matrix `gsc_feedback_2026_10_13` block（全读）③ 10-14 总线记录 + `lane-status.json` 逐日 verdict（STALE 判定依据 = 文件名日期扫描）④ 今日 daily-content 报告（跨车道避让依据）⑤ 今日他人产物（W1 判决 / W1 CTR 批 / a2 探针 / #27/#29 审计）⑥ `scripts/lane-status.mjs` 报告判定口径（引 daily-content 已核结论）。据此本轮**只做增量 + 合法刷新 + 状态更新**，不改写任何前序结论。
- [x] **2. 约束适用范围?** — 已查 K3 拍板原文层级：结果总线契约 (-1) > 恢复模式块（K3 2026-10-12，凌驾级）> 大脑区（10-09）> v9.3；§0.0 解禁块展示层 (a)/(b)/(c) **未裁决** ⇒ 不动贺卡资产 / 不动 middleware 301 / 不建名片页（本轮零 src 改动即自然满足）；§0.23 数字真值（凡无来源数字不进报告；`15,000+` 只作**观察登记**不断言）；§0.23.1 后台黑话禁入客户可见（本 lane 产物全在 `.hermes/`）；§0.25 push 归 host。写权 = `.hermes/` + `GSC数据/index.json` ⇒ 未越权。
- [x] **3. 原数据/拍板来源?（3 问）** — ① 来源：`run-context`/`lane-status.json`/`lane-runs.jsonl` 账本、`gsc-cliff-2026-10-15.json`（机器产物）、`GSC数据/*2026-10-15.xlsx` ×12（存在性）+ `.hermes/_gsc1015_queries.json`（键名/行数直读）、`docs/2026-10-15-w1-verdict…`（一手直读 xlsx 的会话产物 = **转录源**）、他人审计产物（#27/#29）、**本 run web_fetch ×3 + grep ×5**；② 真数据：可复算数字均**双方法**（恢复系数 0.972 vs 0.97231；解除条件② 581.7 = 384.0+71.6+126.1；CTR 373/16288 = 2.290%；线上 title 字符串逐字比对）；凡转录项标注二手、凡未列项判 PENDING（**不推断**）；③ 留/撤：全部维持，**零撤回**；含 1 处**基线更正**（`GSC数据/index.json` freshness STALE→FRESH + 10-15 档登记，非撤回）+ 1 份**补记**（10-14，标注 `VERDICT: FAILED` 非交付）。
- [x] **4. 字段值策略?** — N/A（本 run 零 src 改动、无 certNo/validUntil/issuer 字段操作）；报告未引入任何联系方式变更。
- [x] **5. Markdown 渲染?** — 本报告为**内部文档**；未向任何 user-facing 文本注入未解析 `[text](url)`；引用的线上串为**证据片段**，不渲染到客户页面（唯一 markdown 链接指向外部情报源 `stanventures`，位于内部报告内）。

## 数据来源（K3 §0.23 强制行 + §I.2 三行 + §K.1 证据链）

```
数据来源:
- 结果总线: .hermes/logs/run-context-ZP-gsc-feedback.json (2026-10-15 22:43:03; preflight ok 6/6; lock pid 33652; retry_queue=1; this_run_key a455842fac59f595)
            .hermes/logs/lane-status.json (2026-10-14T22:43:05Z / local 2026-10-15 06:43; verdict=ATTENTION; problems=6; bus_records=32)
            .hermes/cron-prompts/lane-results-bus-contract.md (v1) · .hermes/cron-prompts/sop-10-gate.md
- 恢复判据: .hermes/logs/gsc-cliff-2026-10-15.json (alerts=[]; sites 28d hk 384.0/jp 71.6/us 126.1; realtime_24h 569imps/19clk/ratio 0.972 vs fixed 585.2)
            .hermes/logs/gsc-cliff-2026-10-13.json (747imps/20clk/1.276; 三站 mean28 合计 585.2 分母来源) + gsc-cliff-2026-10-12.json (44imps/1clk/0.075)
- GSC 新档:  GSC数据/*2026-10-15.xlsx ×12 (存在性 glob 实证; K3 12:09-12:15 导出; 档内逐日止 2026-10-12)
            .hermes/_gsc1015_queries.json (查询级行数直读: hk28 553 / us28 525 / jp28 166 / hk24 64 / us24 26 / jp24 9; 单行不可逐词解析)
            GSC数据/index.json (本轮改前: lastBuild 2026-10-13T22:43 / totalFiles 165 / STALE / stalenessDays 4 / latestFreshData 2026-10-09)
- 词级转录源: docs/2026-10-15-w1-verdict-recovery-chain-fix-and-w2-kickoff.md §1/§2/§3/§4/§5 (一手直读 xlsx 的会话产物; 本 lane 未直解 xlsx)
            docs/2026-10-15-w1-ctr-batch-paper-bags-menus-packaging.md §一/§二/§六 (W1 CTR 批 16 格 + 假价清毒 + menus 幽灵价三层翻转)
- K3 拍板:   docs/2026-10-12-recovery-lane-defense-plan.md (恢复模式 SSoT) · AGENTS.md §0.0 解禁块 / §0.22 / §0.23 / §0.23.1 / §0.23.2 / §0.25 / §0.34.2 / §0.35 / §5 (title 50-57, 58 阻断)
- 门禁产物(只读): .hermes/logs/keywords-detox-audit-2026-10-15.json (252 槽 0 违规 + 6 豁免) · .hermes/logs/sku-title-v5-audit-2026-10-15.json (252 槽 hard 8 / warn 28)
- 路由/301:  .hermes/logs/2026-10-15-a2-baseline-probes.md + .json (37 探针 / 143 请求 / 12:47) · 本 lane web_fetch 旧域 /products/sticker-printing/ (cross-origin redirect)
- 上轮账本:  .hermes/logs/2026-10-13-ZP-gsc-feedback.md (verdict=OK) · .hermes/logs/2026-10-13-gsc-suggested-src-fixes.md (FIX-1~9) · matrix gsc_feedback_2026_10_13 block
- 他人产物(只读): .hermes/logs/2026-10-15-ZP-daily-content.md · .hermes/logs/b1c-queue-progress.json · docs/2026-10-15-nengajo-2027-earlybird-page-skeleton.md 等 docs/2026-10-15-*.md ×9 · .hermes/_gsc1015_extract.py / _gsc1015_matrix.py
- 本 run 一手取证:
  · web_fetch ×3 (2026-10-15): zprintpro.com/zh-hk/category/paper-bags/ (HTTP 200; <title> 与 W1 批 zh 新值逐字一致; 同页 FAQ 7-12 天 vs Specs 3-5/5-7 口径内战; 商品卡双品牌实测)
                              zprintpro.com/en/category/greeting-cards/ (HTTP 200; title ≈84 当量字符串复验一致; 卡名仍含 Thick Business Cards (400g+); MOQ 标签仍为繁中 10 張)
                              z-printpro.com/products/sticker-printing/ (cross-origin redirect → zprintpro.com)
  · grep ×5: src (15,000+ claim 全站分布) · src/data (products.ts L1486 title_zh 定位) · matrix 元数据/block 锚点 · index.json 结构 · 审计 JSON 明细
- 环境: pwsh 工具在本 lane 沙箱被禁 (v9.4 rearm 2026-09-14, 明示不重试) ⇒ node/python/git/tsc/build/门童/curl/verify-deploy/schtasks 均未在 lane 内运行; xlsx 与单行 JSON 不可直解; git commit/push 由 host-side wrapper 在本 lane 退出后执行
校准状态: 🟡 混合已校准 — 恢复系数/解除条件②/CTR 代理/线上 title 字符串 = 本 run 双方法复算或一手抓取; 总线/仓内/门禁审计 = 一手直读; **28d/24h 词级 = W1 判决文档转录 (二手, 已逐处标注)**; 任务 J 六词 + 质量三件套 + 品牌长窗 = PENDING (不可复算, 不虚报)
撤回声明: 无 (未撤回任何前序报告); 含 1 处基线更正 (GSC数据/index.json freshnessStatus STALE→FRESH + 10-15 档登记) + 1 份补记 (2026-10-14-ZP-gsc-feedback.md, 标注 VERDICT: FAILED 零产出事实)
```

---

*Generated by deepseek harness（DSH lane `ZP-gsc-feedback`，新档消费轮 · 10-14 STALE 重做轮）· 2026-10-15 22:43 窗口 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · git commit/push 由 host-side wrapper 执行*
