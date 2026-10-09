# ZP-monthly-matrix — 2026-10-10（月度矩阵审计 · 结果总线消费轮 · 首份合口径命名报告 · 无简化无延后）

VERDICT: PARTIAL
CONSUMED: run-context-ZP-monthly-matrix.json @ 2026-10-10 00:17:10 | lane-status.json @ 2026-10-09T15:48:45.210Z | lane-results-bus-contract.md @ v1 (2026-09-19) | zprintpro-monthly-matrix-audit.md（含 K3-BRAIN-INJECT-2026-10-09 第 -2 优先级区）| sop-10-gate.md | 上轮报告 2026-09-monthly-matrix-audit.md（磁盘可见 · 总线不可见）| 兄弟车道只读 2026-10-10-ZP-gsc-feedback.md + 2026-10-10-ZP-weekly-meta.md
DELIVERED: .hermes/logs/2026-10-10-ZP-monthly-matrix.md, .hermes/monthly-matrix-audit-20261010.json（新建独立 ledger；**未写** .hermes/industry-keyword-matrix.json — 同日已被 ZP-gsc-feedback 改写，跨车道避让）
NEXT: 11/1 06:13 跑批 → ① 先补 matrix.json 回灌（本轮 ledger 的 integrity/coverage/tier 三块直接并入 stats + 新增 monthly_matrix_2026_11_01 block，并修 version bump 与三处 last_updated 字段矛盾）② 若 10/12 档已落多行 per-query JSON 则执行 35 词触顶页置换（7 ja + 3 en，与 10/19 title 批合并 1 push；rush ja「激安」禁词同批消）③ 补 ホリデーカード 锚点 ④ AI Overview 引用率复测（方法待 K3）⑤ 内容质量自迭代 11/1 首批

**幂等核验（契约 §二.1/§二.2）**: `run-context.retry_queue = []` ⇒ 无 RETRY 项，报告不写 `RETRY_OF`。`run-context.previous_run.bus_record = null` / `latest_report = null`，但**磁盘实证存在上轮报告** `.hermes/logs/2026-09-monthly-matrix-audit.md`（manual run 2026-09-13, 951 行）⇒ 本轮按该文件做数据继承（见 §2），**不重复**其已交付的 queue/coverage/tier 结论，只做增量审计。本 run `idempotency_key = b03155c779d2e369`（run-context 预生成）。

**命名缺陷（本轮新发现 · 根因级）**: 历史月度报告命名为 `YYYY-MM-monthly-matrix-audit.md`（7/8/9 月三份存在），**不符合** wrapper/§0.35.3.6 强制的 `<YYYY-MM-DD>-<lane>.md`；`lane-status.mjs` 与 `lane-preflight.py` 因此判本车道 `lastReportFile=null` / `previous_run=null`，调度器侧 `LastTaskResult=2147946720`。⇒ **幂等账本与数据继承已断链 3 个月**（本车道是唯一有历史产物却被判「从未成功」的车道）。本报告改用合口径命名；历史三份建议补别名/归档说明（docs/.hermes 层，非 src）。

**跨车道避让（契约 §二.6，本轮实际生效）**: `run-context.sibling_lanes = []`（生成于 2026-10-10 00:17），但**开工直读磁盘**发现同日兄弟产物：`ZP-gsc-feedback`（今日）已写 **`.hermes/industry-keyword-matrix.json`** + `GSC数据/index.json`；`ZP-weekly-meta`（今日）已写 `src/lib/seo.ts` + `.hermes/ctr-meta-20261010-livefield.json`。⇒ 本轮**放弃** matrix.json 回灌（同日不二次改写，防 9/19 `zh-hk.json` 撞车事故同型），matrix 增量改落**独立新文件** `.hermes/monthly-matrix-audit-20261010.json`（零撞车面）；本轮**零 src 改动**。

**环境**: pwsh 工具在本 lane 沙箱被禁（v9.4 rearm 2026-09-14，明示**不重试**）⇒ 全程仅 read/glob/grep/write + web_fetch；**node / python / git / tsc / build / 门童 / JSON.parse 均不在 lane 内运行**，由 host-side wrapper 执行。已知影响：本 lane 无法产出「脚本 exit 0」自证（title 当量、GSC 逐词抽取、tsc 基线），凡涉脚本处一律标注方法降级与局限，**不以「跑过了」充当通过**（契约 §四）。

**Run type**: monthly-matrix 完整流程（死代码/完整性审计 + P0-P2/Tier 覆盖率 + 带钱词 v1 月度覆盖率 + 35 词触顶预算与置换计划 + 千问 v2.0 P0-P3 检查表基线 + 品牌季节段 + Tier 切换判定 + 30/60/90 与 v9.4 三件套 + 7 步/8 步 verify 对账 + 异常与人工动作），**无简化、无延后**；两项执行层动作按契约/环境显式推迟并写明解锁条件（§6、§9）。

---

## 0. 数据来源（SOP-10 第 3 款 / §0.23 数据诚信红线 — 必含）

```
数据来源:
- 结果总线: .hermes/logs/run-context-ZP-monthly-matrix.json (2026-10-10 00:17:10) + .hermes/logs/lane-status.json (2026-10-09T15:48:45Z)
            .hermes/logs/lane-runs.jsonl (经 lane-status 间接: bus_records=15, 本车道 0 条)
            契约 .hermes/cron-prompts/lane-results-bus-contract.md v1 (2026-09-19)
- 矩阵事实源: .hermes/industry-keyword-matrix.json (12,628 行; version 2026-09-13-v1; **只读, 未写**)
              逐条直数 (grep 行号 + 条目计数) + stats 块声明值 双方法
- 上轮基线: .hermes/logs/2026-09-monthly-matrix-audit.md (manual run 2026-09-13) — 数据继承对比基准
- 带钱词: .hermes/money-kw-20261005.json (138,364 行, 机器可读 10/5 档) + .hermes/money-kw-20261012.json (data_window.status=MISSING)
          DELIVERY/2026-10-12-money-kw-package.md (§1.3 存量 TRIM / §3 预算普查 + GAP 规格)
          .hermes/money-kw-mine.py (正则 SSoT: MONEY_EN 17 / MONEY_JA 22 / MONEY_ZH 12)
- GSC 需求侧 (继承, 未重算): .hermes/logs/2026-10-10-ZP-gsc-feedback.md (§3 验证矩阵 en 8+ja 9+zh 16 / §4 CTR 池 / §5 盲开 / §7 三件套)
                            docs/2026-10-09-gsc-deep-audit-and-strategy.md (§一 总量 / §二 矩阵) + docs/2026-10-09-gsc-20day-delta-vs-0918.md
                            .hermes/gsc-2026-10-09/extract.json (单行大 JSON) + compare-vs-0918.json (多行)
- K3 拍板: docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md (§F-5 = 本车道 11/1 跑批定义 / Part A/E/G)
           docs/2026-09-13-title-batch-T-freeze.md §6-3 (50-57, 58 阻断) + docs/2026-09-12-k3-directive-v93-home-fix-money-words.md (§S1-S3 + 任务 J)
- 仓内实测 (本 run 逐行/逐串 grep):
  src/lib/hreflang.ts · src/types/locale.ts · src/lib/metadata.ts · src/lib/seo.ts · src/app/[locale]/layout.tsx
  src/app/[locale]/{legal,payment/success}/page.tsx · src/data/products.ts · src/data/sku-seo-data.ts · src/data/category-seo-content.ts
  src/lib/seo/schema-extensions.ts · scripts/guards/i18n-guard.js · .hermes/title-v5-audit-inventory.md
- 线上探针 (本 run, web_fetch 2026-10-10): https://github.com/zprintprohk-rgb (HTTP 200) · https://www.instagram.com/zprintpro (HTTP 200)
- 幂等核验: retry_queue=[] + 磁盘上轮报告 + 兄弟报告 DELIVERED 行
```

### §I.1 4 口径对照表（防计数混淆）

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| matrix queue[] 条目 | **36** | 直数（= stats.queue_size） | §3/§4/§9 |
| matrix covered[] 条目 | **49**（唯一 id 48） | 直数（= stats.covered_count） | §3/§4 |
| queue 中显式 `status:"completed"` | **16** | 直数 | §3（pending 对账） |
| SKU 标题条目（v5 inventory） | **276** = 92 SKU × 3 locale | 直数（grep） | §7 title 当量带 |
| 带钱词 v1 词表 | **36** = zh-hk 16 + en 10 + ja 10 | K3 8/30 拍板表 | §5 |
| 10-09 验证矩阵锚位 | **33** = en 8 + ja 9 + zh 16（29 有值 / 4 PENDING） | 继承兄弟车道 | §5 |
| 35 词触顶页 | **10** = ja 7 + en 3 | DELIVERY §3 预算普查 | §6 |

**校准状态**: 🟡 **混合** — GSC 需求侧继承兄弟车道 10/09 档（FRESH, stalenessDays=1，已校准）；矩阵/仓内/词表侧为本 run 一手实读（已校准，逐条附行号或 grep 计数）。无 10/12 档（今日 10/10，导出未到）。
**撤回声明**: 无（未撤回任何前序报告）。**对 W3 技术审计一处基线更正**: `.hermes/geo/w3-technical-audit-2026-09-30.md` §2 记 hreflang 为「zh-HK / x-default→/」，本轮实测 layout.tsx 已为「zh-Hant-HK / x-default→/zh-hk」⇒ W3 §2 结论已过期（详见 §7.1），属**基线更新**非报告撤回。
**无老站对比基线声明**: GSC 数据均为 zprintpro.com 新站属性，不含老站 z-printpro.com 基线（per §0.30.5）。

---

## 1. 总线/调度状态对账（判据纪律：不看自我播报）

| 项 | 实测 | 判定 |
|----|------|------|
| `run-context.preflight.verdict` | `ok`（5/6 检查 ok；`prev_run_known=false`） | ✅ 允许作业；`prev_run_known=false` 已被磁盘上轮报告解释 |
| 锁 | `lane.lock` 本轮持有（pid 36620 / acquired 2026-10-10 00:17:10） | ✅ 无并发车道 |
| `lane-status.json` 本车道 | **verdict=UNKNOWN**, state=pending, `lastReportFile=null`, `lastWrapperRun=null`, `lastRunRecord=null` | ❌ 与磁盘事实不符 → 见 §2 命名缺陷 |
| 调度器 | `ZP-monthly-matrix` State=Ready, Last=2026-10-01 14:01:01, **Result=2147946720** (0x80070020), Next=2026-11-01 06:13 | ❌ 从未成功跑过（文件占用类失败） |
| 本轮性质 | **非 1 号窗的手动/包装器补跑**（用户令「当次完整执行」） | ✅ 报告与 ledger 落盘即为证据 |
| 全车道问题面 | lane-status `problems=10` / `need_human=10`；4 车道 `2147946720`；`ZP-k3-review` 未注册；`ZP-daily-content` STALE(10-09) | request_human（§11） |

**空转判定**: 本轮**非空转** —— 有当日报告 + 独立 ledger + 可复算数字（§四纪律）。

---

## 2. 上轮 → 本轮数据继承（契约 §二.7：禁止只写绝对值）

| 指标 | 上轮 2026-09（9/13 manual） | **本轮 2026-10（10/10）** | Δ | 备注 |
|------|------------------------------|---------------------------|----|------|
| queue_size | 36 | **36** | 0 | 未扩容（§9 建议） |
| covered_count | 48 | **49** | **+1** | 唯一 id 48（含 Q-GR-01 重复 1 条） |
| P0 声明覆盖率 | 95.45%（原文分母 21/22） | **95.45%（分子分母 9/21 = 42.86%）** | 声明未变 / 实值 − | **陈旧百分比未复算**（§3） |
| P1 声明覆盖率 | 90.91%（原文 10/11） | **90.91%（3/10 = 30%）** | 同上 | 同上 |
| Tier A 覆盖率 | 91.3%（21/23） | **7/21 = 33.3%** | − | stats 三套口径并存 |
| Tier B 覆盖率 | 100.0%（9/9） | **2/9 = 22.2%** | − | 上轮值亦与本轮 stats 不符 |
| 长尾 524 目标 | 7/524 = 1.34% | **23/524 = 4.39%** | +3.05pp | stats 自洽（unique_ids 23/524） |
| matrix version | 2026-09-13-v1（声称 bump，实际同值） | **2026-09-13-v1** | 0 | **连续第二月 step 6 FAIL** |
| 内容质量自迭代 | 0/10（上轮显式失败并升级） | **0/10（本轮未执行，属 11/1 批次定义）** | 0 | 未以「时间」为由简化（§10） |
| 孤儿博客净化 | 上轮记录 blog-posts.ts 曾有 mojibake 待修 | 本轮 `blog-posts.ts` 可正常读取/检索，未见乱码 | 改善 | 未逐字节复验，仅阅读层 |

---

## 3. 矩阵完整性审计（本轮核心新增 · 双方法复算 §0.23.2）

**法 1 = stats 块声明值**；**法 2 = 文件直数**（逐条 grep + 行号）。两法结果与判定：

| 项 | 法1 声明 | 法2 直数 | 判定 |
|----|---------|---------|------|
| queue_size | 36 | **36** | ✅ 一致 |
| covered_count | 49 | **49 条目**（唯一 id **48**；Q-GR-01 在 covered[] 内出现 2 次） | ⚠️ 字段语义 = 条目数，非唯一 |
| queue 内 completed | — | **16** | — |
| pending_in_queue | 22 | **20**（36 − 16） | ⚠️ 差 2，无对账字段 |
| p0_coverage_pct | 95.45 | **9/21 = 42.86%**；95.45% = **21/22**（9 月报告 §1 原文分母） | ❌ **陈旧未复算** |
| p1_coverage_pct | 90.91 | **3/10 = 30.0%**；90.91% = **10/11**（9 月报告 §1 原文分母） | ❌ **陈旧未复算** |
| p2_coverage_pct | 0 | 0/3 = 0% | ✅ |
| tier_*_covered | 7 / 2 / 3（合计 12） | 与 covered_count 49 粒度不同 | ⚠️ 两套计数并存，无桥接字段 |
| version | 2026-09-13-v1 | — | ❌ 上轮即未实际 bump，**连续两月** |
| last_updated 三字段 | `last_updated`=2026-08-05 / `lastUpdated`=2026-08-19 / `last_gsc_feedback_update`=2026-10-10 / `stats.last_updated`=2026-10-10 | — | ❌ **四个「最后更新」互不一致**，step 2 判 `matrix.json 是今天的` 失败 |

**结论（一句话）**: 矩阵的**条目层**（queue 36 / covered 49）与唯一 id 层（48）可对账，但**百分比层与元数据层已陈旧 1-2 个月且三套口径并存** —— 任何按 `stats.*_coverage_pct` 做决策的消费者都会得到错误数字（P0 实际 42.86%，非 95.45%）。

**7 步 verify 对账（cron prompt §7 + v4 step 8）**

| # | 断言 | 本轮判定 | 证据 |
|---|------|---------|------|
| step 2 | matrix.json 是今天的 | ❌ FAIL | `lastUpdated` 2026-08-19 / `last_updated` 2026-08-05 |
| step 3 | JSON 语法 valid | 🟡 PASS（阅读层） | 全文可逐行读取、结构键完整；**未跑** `JSON.parse`（无 node） |
| step 4 | queue/covered/stats 三字段都更新 | 🟡 PARTIAL | 仅 stats 的 `last_updated_event` 由兄弟车道写入；queue/covered 未变 |
| step 5 | 月报存在且非空 | ✅ PASS | 本文件 |
| step 6 | version 已 bump | ❌ FAIL | 仍 `2026-09-13-v1` |
| step 7 | 内容自迭代 ≥10 篇 | ❌ FAIL | 本轮 0 篇（未执行；11/1 批次） |
| step 8 | price-table 校准进度段 | ⛔ N/A | `.hermes/price-tables/` **目录不存在**（glob 0 命中）⇒ 该段无数据源，不得编造 |

> **不重犯（契约 §二.5）**: 上轮同因失败项（version bump / 内容自迭代）本轮**未再静默重试**，而是转为**机制建议**（§9/§11），避免第三次带病重试。

---

## 4. 覆盖率审计（P0/P1/P2 + Tier A/B/C + 524 长尾）

| 维度 | 总数 | 已 covered | 复算覆盖率 | stats 声明 | 结论 |
|------|------|-----------|-----------|-----------|------|
| P0 | 21 | 9 | **42.86%** | 95.45% | ⚠️ 未达「P0 优先」实质；唯一 P0/TierA 未 covered = **Q-002** cosmetics-packaging-box-printing-guide |
| P1 | 10 | 3 | **30.0%** | 90.91% | ⚠️ 9 月扩容的 4 篇仍未 covered |
| P2 | 3 | 0 | 0% | 0% | 与声明一致（P2 按需铺） |
| Tier A | 21 | 7 | 33.3% | 91.3%（9 月原文） | ⚠️ |
| Tier B | 9 | 2 | 22.2% | 100%（9 月原文） | ⚠️ Tier B 为本轮最薄层 |
| Tier C | 4 | 3 | 75.0% | — | 低频层反而最实 |
| 524 长尾 | 524 | 23 | **4.39%** | 4.39% | ✅ 自洽（unique_ids/524） |

- **K3 §6 铁律计数**: 已 covered 候选跳过 = **0**；PDP 5 天内重复审查 = 0；P3 blocklist 命中 = 0（0 是常态）。
- **两套并行口径警告**: `stats.p0_total/p0_covered`（21/9）与 `tier_a_total/tier_a_covered`（21/7）在**同一文件里给出同一集合的两个不同分子**；月度消费者须以「条目直数」为准（本报告 §3 法 2）。

---

## 5. 带钱词地图 v1 月度覆盖率（K3 8/30 拍板 · monthly 必报）

**方法声明（§0.23.2 闸门 1）**: 无 node ⇒ 覆盖定义为「**源串精确命中**」于 `src/data/**`（SKU keywords / 类目内容 / blog / 转化块）。**不自动归并空格与变形**，变形单列（否则会把「无空格线上形态」误判为覆盖）。

### 5.1 zh-hk 16 词

| 状态 | 词 |
|------|----|
| ✅ 有落点（14） | 食品包裝印刷 / 即日印刷 / 餐牌印刷 / 紙袋印刷 / 食品包裝訂製 / doujinshi 印刷（同人誌印刷）/ china catalog 印刷（china catalog printing）/ 宣傳單張印刷 / 貼紙印刷 / **名片印刷**（业务子类目豁免，存量 title 在）/ 喜帖印刷 / 禮盒印刷 / 證書印刷 / 貼紙訂製 |
| 🟡 部分（1） | 海報印刷即日 —— 仅 1 条 FAQ 问句（`category-seo-content.ts` L3404「海報印刷即日交貨得唔得？」），**非 title/keyword 落点** |
| ❌ 缺失（1） | **月餅盒印刷** —— `src/` 全量 grep **0 命中** |

**覆盖率（含豁免）= 14/16 = 87.5%；（不含豁免）= 13/15 = 86.7%**

### 5.2 en 10 词

| 状态 | 词 |
|------|----|
| ✅ 有落点（7） | small batch stickers / small batch sticker printing / fluorescent stickers / china catalog printing / custom packaging boxes / die cut stickers / vinyl stickers |
| 🟡 部分（1） | small batch custom stickers —— 仅 `category-conversion-blocks.ts` L314 **内部 note 串**，非客户可见字段 |
| ❌ 缺失（2） | sticker labels（src/data grep 0）；**business card printing**（业务子类目豁免，0 —— 与 §0.0 展示层未拍板一致） |

**覆盖率（含豁免）= 7/10 = 70%**

### 5.3 ja 10 词

| 状态 | 词 |
|------|----|
| ✅ 有落点（4） | クラフト紙 パッケージ印刷 / 同人誌印刷 / ステッカー印刷 / パッケージ印刷 |
| 🟡 仅无空格变体（2） | ダイカット ステッカー 防水（线上为 `ダイカットステッカー`）/ ステッカー オリジナル（线上为 `オリジナルステッカー`） |
| ⚠️ 有落点但**触禁词**（2） | **特急印刷 激安**（`rush-printing-delivery/page.tsx` L48 存量 title）/ **印刷 激安**（同上子串） |
| ❌ 缺失（2） | チラシ印刷 早い（0）；名刺印刷 激安（0，且触禁词） |

**覆盖率（精确串）= 4/10 = 40%**

### 5.4 ⚠️ 两条结构性问题（本轮新增，供 11 月词盘裁决）

1. **v1 词表形态 ≠ 线上实际形态**：v1 多条为带空格/特定形态（`ダイカット ステッカー 防水`、`ステッカー オリジナル`、`特急印刷 激安`），线上关键词为**无空格合并形**。⇒ 按 v1 字面口径统计会**系统性低估** ja 覆盖率。**建议**: 11 月词盘改用**线上实际形态**作键，并保留 v1 形态为别名列。
2. **v1 表与后置门禁冲突**：v1 ja 表含 **2 条「激安」构式**，与 **K3 2026-09-02 GLM 拍板**（激安 → 格安/コスパ）及机审 `scripts/guards/i18n-guard.js` **`JA_激安`**（pattern `/激安/g`，L643-647）**直接冲突**。⇒ v1 的 ja 覆盖率**不可能靠「写入」达成**；且存量已有一处违规落地（§7.3）。**须 K3 一句话裁决**：改表（v1.1）或明确「存量豁免、不可新增」。

### 5.5 10-09 验证矩阵继承（需求侧，权威现行锚点表）

继承 `2026-10-10-ZP-gsc-feedback.md` §3：**en 8 + ja 9 + zh 16 = 33 锚位，29 有值 / 4 PENDING**（4 个 zh T1 锁词因 10/09 抽取产物为单行大 JSON 不可逐词抽取）。本轮**不重算**（零重拉、零重解析，避免与兄弟车道同日重复劳动）。关键点：`貼紙印刷` 156im c0 / `食品包裝印刷` 119im c0 / `月曆印刷` 118im c0 / `書刊印刷` 94im c0 / `small batch sticker printing` 99im c0 —— **页一 zero-click 池 ≥6 词**仍是 CTR 主战场（与 K3 大脑 Part E 里程碑一致）。

---

## 6. 35 词触顶页预算 + 置换算法（K3 大脑 §F-5-2）

**触顶页（= 35 词，置换算法适用）**：ja 7 页 —— waterproof-stickers / transparent-stickers / small-batch-stickers / die-cut-stickers / a2-posters / a1-posters / outdoor-posters；en 3 页 —— cartoon-red-packets / eco-red-packets / large-red-packets。
**有缺口页（直接补缺，不置换）**：catalog-printing[en] 12 / textbooks[ja] 15 / catalog-china 服务页[en] 22 / saddle-stitch-booklets[en] 9。

**算法（照抄 SSoT）**：`page kw < 35 → 补缺；≥ 35 → 置换（清退 pos 最差 / imps 最低 1-2 词，补新晋带钱词）`。

**本轮核实（可复算的一手证据）**：
- `src/data/sku-seo-data.ts` L50（waterproof-stickers ja）**实读 35 词**，含 10/5 批注入的 `pvc シール` / `PVCシール` ⇒ 该页确已触顶，且 10/5 批本身即用了一次置换（清退 `ノーリボン残留`）。
- 但 L86 / L122 / L158 / L194 / L230 / L266 / L302 等其余 sticker ja 页含 `ノーリボン残留`（**未清退的占位词**）⇒ **置换候选池现成**（这是「pos 最差/imp 最低」的天然首选，无需等 GSC 逐词排名即可先清）。

**执行状态**: ⛔ **BLOCKED**（显式，非简化）—— 三重阻塞：
1. 无 node/pwsh ⇒ 无法校验 35 项 JSON 数组改写后的语法与完整性（手工改 35 项字符串数组风险不可接受）；
2. 10/09 档逐词 pos/imps 为单行大 JSON（与兄弟车道同缺口）⇒ 「清退哪 1-2 词」的**排名依据缺失**；
3. src 行为改动落在 churn 纪律窗内（title 冻结至 10/19；关键词层宜同批合并 1 push，省 CF build 配额）。

**解锁条件（可执行）**: ① 10/12 档落盘**多行 per-query JSON**（兄弟车道 FIX-4）② node 可用 ③ 与 10/19 title 批（含 §7.3 禁词消项）合并为 1 次 push。本 run 已把该流程与候选池写入 ledger（`.hermes/monthly-matrix-audit-20261010.json` → `kw_budget_35`）。

---

## 7. 千问 v2.0 P0-P3 检查表基线（K3 大脑 §F-5-1 · 五项）

### 7.1 hreflang 双向/三向对称

| 层级 | 实测 | 判定 |
|------|------|------|
| **layout（权威兜底）** | `layout.tsx` L121-131：`en-US/en-GB/en-AU/en-CA → /en`；`ja-JP → /ja`；`zh-Hant-HK → /zh-hk`；`x-default → /zh-hk` | ✅ 集合完整且 x-default 正确 |
| **page 级构建器** | `seo.ts` L346/L869/L962/L1689 + `blog/[slug]` L945、`blog/page.tsx` L77、`about` L28 等：**路径带 `${slug}` 正确互指** ✅ 但标签用 **`ja`（非 `ja-JP`）**、**缺 `en-CA`** | 🟡 路径对称 ✅ / 标签不统一 ⚠️ |
| **x-default 错指向（3 处）** | `src/lib/metadata.ts` L27 → `/en`（`guide/[slug]` 页唯一消费者）；`legal/page.tsx` L234 → `/en/legal/`；`payment/success/page.tsx` L37 → `/en/payment/success/` | ❌ 与 layout/SSoT 的 `→zh-hk` 冲突 |
| **死代码残留** | `src/lib/hreflang.ts`（重复 `en-US` + `zh-HK`，**0 消费者**）；`seo.ts` L1702 `generateHreflangTags`（`zh-HK` + `ja`，**0 消费者**） | ⚠️ 若被重新接线即引入重复/冲突注解 |
| **W3 基线更正** | W3 (9/30) §2 记 `zh-HK` + `x-default→/` ⇒ **本轮实测已被修好**（zh-Hant-HK + x-default→/zh-hk） | 基线更新（非撤回） |

**结论**: **PATH 级三向对称已达标**（category/product/blog/quote 互指正确）；**LABEL 级不统一（ja vs ja-JP、en-CA 缺位）+ 3 处 x-default 错指向**为剩余缺口。属 **src 行为变更**，按 v1.2 §① 不擅自执行，列 §11 排批。

### 7.2 Organization sameAs 补全

| 发射器 | sameAs 集合 | 位置 |
|--------|-------------|------|
| `generateOrganizationSchema` | twitter / linkedin / github 组织 / github 仓库（**4**） | `seo.ts` L1783 |
| `getSiteNAP` (per locale) | github 组织 / github 仓库（**2**） | `seo.ts` L175/L204/L235 |
| `authorByLocale` (Person, ×3 locale) | linkedin / **instagram**（**2**） | `schema-extensions.ts` L381/391/401 |

- **W3 基线「sameAs 空壳」已部分修复**（9/30 W2 Phase 1.2 注入 GitHub 锚点，HTTP 200 已验）——**W3 §3 该结论亦过期**。
- **本轮线上实测**: `github.com/zprintprohk-rgb` = **HTTP 200**（内容确认）；`instagram.com/zprintpro` = HTTP 200，但 Instagram 对墙/占位页同样返 200 ⇒ **不构成账号归属证据**。
- ⚠️ **新发现 1（碎片化）**: 同一实体**三套不一致 sameAs**（4/2/2），且三处 schema 各自硬编码 ⇒ 实体信号被摊薄（GEO 大忌）。
- ⚠️ **新发现 2（诚信面）**: `authorByLocale` 三 locale 均含 `instagram.com/zprintpro`，而 `seo.ts` L1030 注释写「2026-06-17: sameAs 改为空（**用户没有真实社交账号, 不传假链接**）」，AGENTS §0.23 亦禁假链接。两者**口径打架** ⇒ 需 K3 1 行确认真实性（若无真实账号，应从 3 locale 移除）。

### 7.3 SKU 标题合规（50-57 当量带普查）

| 项 | 值 | 证据 |
|----|----|------|
| SKU 标题条目 | **276**（92 SKU × 3 locale，9/23 v5 批次快照） | `.hermes/title-v5-audit-inventory.md` |
| 50-57 目标区 | **276（100%）** | grep `[5x]:` 命中 276；`[0-4x]:` = 0；`[58]:` = 0；`[59]:` = 0；`[6-9x]:` = 0 |
| ≥58 阻断线 | **0** | 同上 |
| **页面层存量 TRIM（非 SKU）** | 3 条：`services/catalog-printing-china`（en/zh-hk）= **77**；`rush-printing-delivery` en = **66**、ja = **59** | DELIVERY §1.3 + 兄弟报告 §10 |
| ⚠️ **本轮新增 · 存量禁词** | `rush-printing-delivery` **ja LIVE title 含「激安」**（`page.tsx` L48）＝ `i18n-guard.js` `JA_激安` 禁词 | grep 双位置确认（page.tsx + guard） |

**结论**: **SKU 层 276/276 全达标、0 超线**（v5 批次成果稳固）；风险全部在**页面层 3 条存量**，其中 rush ja 一条**同时含 58+ 超线 + 禁词** ⇒ 10/19 title 窗**必须同批消项**（TRIM 到 50-57 + 激安→格安/コスパ）。
**诚实声明（方法降级）**: 当量为**继承 9/23 inventory 的已算值 + grep 直数**，**未跑** `scripts/guards/title-equiv.js` / `sku-title-census.mjs`（无 node）；兄弟车道 10/10 live 抽测（stickers=57、ja greeting-cards≈55）**未发现漂移**，故判快照仍有效。

### 7.4 GEO 事实面板覆盖（en FSC-ISO-产能 · ja 納期-最小ロット-実績 · zh 本地地址-物流承諾）

| locale | 事实信号实测 | 覆盖 |
|--------|--------------|------|
| en | ISO 9001 + FSC + FDA + "ISO 9001 certified production" 句族 | ✅ |
| ja | FSC + 納期（3-5営業日）+ 最小ロット（100個/10部）+ **実績（B2B納品実績 4,820 件超）** | ✅ |
| zh-hk | 深圳自營工廠 / 海德堡 + 順豐本地 + FSC + 15 年 / 15,000+ 客戶 | ✅ |
| **结构化「事实面板」组件** | `grep geoFacts\|factsPanel\|factSheet\|DataPanel src/` → **仅 press-kit 翻译键** | ❌ **资产形态缺失** |

**结论**: **信号 3/3 locale 齐（内容层）**，但**无结构化事实面板/数据表资产** ⇒ 缺口是**形态**（AI 引用友好度）而非内容。建议随 W2 重构以「可核验事实块」形态补（§0.36 红线：来源必须真实可核验，禁编造 Reference）。

### 7.5 AI Overview / AI 引用率基线记录

| 项 | 值 |
|----|----|
| 首测存档 | `.hermes/geo/geo_citation_baseline-2026-09-30.md` + `.json`（已存在，满足「首测存档」） |
| 首测结果 | 8 probes → **命中 3/8 = 37.5%**；zh-hk **3/3** · en **0/3** · ja **0/2**；双方法复算 8/8（§0.23.2） |
| 本轮复测 | ⛔ **NOT_RUN** |
| 原因（诚实） | 本 lane 无 Perplexity / `source_check` 等价 **AI 引用源探针**工具（首测工具自动化侧不可用，key 缺失）；`web_search` 是普通检索，**不是** AI Overview 引用源探针，用其充当会**污染基线** ⇒ 宁缺毋编（§0.23） |
| 待 K3 | 月度复测的**工具与方法**（这条不解决，11/1 也只能继续挂 PENDING） |

---

## 8. 品牌监测 · 季节词渗透专段（K3 大脑 §F-5-3 新增要求）

**三档口径**：第 1 档 = 展示 0；第 2 档 = 有展示（不看位次）；第 3 档 = 有位次/点击。

| 词 | locale | 10-05 | **10-09** | 档位 | 内容侧 | 下一步 |
|----|--------|-------|-----------|------|--------|--------|
| 年賀状印刷 / 2027年賀状 | ja | 0 展示 | **0 展示** | **第 1 档** | ja greeting-cards 承接段 **live**（HTTP 200 实证，含「1枚¥20から・10枚の小ロット」+ 4 FAQ） | 10/16 判读；仍 0 → Plan B（`site:` 收录 + sitemap 核对） |
| corporate / business / custom holiday cards | en | 0 展示 | **0 展示** | **第 1 档** | en 承接段 live（`category-seo-content.ts` L4401-4416） | 同上 |
| ホリデーカード | ja | 未列 | 未列 | **UNTESTED** | 承接段含 holiday 语义词 | **11/1 锚点表补列并测** |
| 聖誕卡 / 賀卡 / 卡片印刷 | zh-hk | 未列 | 0 展示 | **第 1 档（季节窗未开）** | W9（10/21-27）B7 queue 窗；K3 待裁是否破 queue | 10/21 窗启动；11/1 出 0→展示 |

- **常规品牌词（combo 28d, 10-09 档，继承）**: 智印港 **14clk / 22im / CTR 63.6% / pos 1.59**（全站点击第一词，品牌信号健康）；zprintpro 3/4；zprint 1/32；zprints 1/7；`ジープリント` 本档 0 命中（30 目录建设未启动）。
- **季节段结论**: **4 条季节词全部停在第 1 档，无一条进入第 2 档**；最高时间风险 = **年賀状早割 10/31（倒计时 21 天）**，而内容收录需 5-10 天 ⇒ 10/16 判读是关键分水岭。
- **诚实边界**: 10/09 档数据日约 10/06-07，**早于** 10/9 承接段部署 ⇒ 本档 0 展示**不构成对承接段的否定**；10/12 档为首个可反映内容层的数据窗。

---

## 9. Tier 切换判定（K3 §6 铁律 + ≤10% 上限）

| 规则 | 阈值 | 本轮触发 | 说明 |
|------|------|---------|------|
| 自动降级（Tier A → C） | 某词 30d 连续零展示 | ⚠️ **数据不足** | 无 30d 滚动（10/09 单行 JSON + 4 锁词 PENDING）⇒ 跳过 |
| 自动降级（移除 queue） | 某 SKU 90d 无点击 | ⚠️ 数据不足 | 同上 |
| 自动升级（C → A） | 7d imps ≥100 且 rank ≤20 | ⚠️ 可判面窄 | 10/09 有 `pos≤10 查询数 486` 硬计数，但**逐词 7d/28d 明细**仍缺；不臆断 |
| 自动升级（B → A） | SKU 月环比 +50% | ⚠️ 无月环比 | 连续两档缺 3mo 窗 |

- **applied = 0**；**上限校验**: matrix 总数 36 × 10% = **3.6** ⇒ 0 ≤ 3.6 ✅
- **K3 §6 铁律**: 已 covered 候选跳过 = **0**；**未发生**「覆盖已 covered Q」误触发 ⇒ 无回滚需求。
- **人工审核挂账（继承 9 月，未擅自执行）**: `Q-GR-01 / Q-GR-02 / Q-GR-03`（covered > 90 天，GSC 复查）。
- **daily 唯一推荐**: `Q-002` `cosmetics-packaging-box-printing-guide`（全矩阵唯一 P0/TierA 未 covered）。
- **不执行战略层变更**（per §F-5-4）: 词盘结构、砍页、新建品类、预算节奏一律只报建议，不擅自执行。

---

## 10. 30/60/90 月度进度 + v9.4 质量三件套 + 内容自迭代

**v9.4 质量三件套（继承 10/09 档，本 lane 未重算）**

| 指标 | 门槛 | 实测 | 判定 |
|------|------|------|------|
| ① striking 词进首页数 | ≥5 | **pos≤10 查询数 = 486**（9/18: 350，**+38.9%**；hk 230 / us 162 / jp 60） | ✅ PASS（硬计数） |
| ② pos 1-20 展示占比 | ≥30% | **48.6%**（词数口径） | 🟡 proxy PASS（imps 加权字段缺） |
| ③ 有点击词数 | ≥12 | **≥27 词** | ✅ PASS |
| M1 线（hk 7d clicks） | ≥25 | **88**（70→86→88 三连升） | ✅ PASS |

**30/60/90 表（8/30 定义）→ 现状**: W1-W4（8/30-9/26）为**已过期历史窗**；K3 大脑 Part E 已把作战地图切到 **10/09-11/09（W1 季节抢修 / W2 10/19 title 解冻 / W3 聖誕卡+年賀状加码 / W4 11/1 全量审计）**，本车道位于 **W4 起点（11/1 06:13）**。Phase 判定 = **Phase 2 中段 + Phase 3 Q4 卡位前哨**（与 v3.0 §4.9 对齐）。
**月度里程碑代理指标（11/9 验收，继承 K3 大脑）**: 年賀状/holiday cards 双站有展示（**当前 0**）；en 页二冲 ≥2 词进前 10（当前 doujinshi 11.2 / large envelopes 13.8 / china catalog 17.7 ⇒ **0/3 进**）；页一 zero-click 池 ≥6 词（**当前 ≥6** ⇒ 未改善）；ja 28d 展示 ≥2,500（当前 2,023）；月有效询盘 = **待 008 校准**（不得编造）。

**内容质量自迭代 10 篇**: ⛔ **本轮 0 篇，未执行**，原因**不是时间**：① 属 K3 大脑 §F-5 给 11/1 批次的定义（本轮为 10/10 非 1 号窗的补跑）；② 该动作需 3 locale × 200-300 字修改 + 内链 curl 校验 ≥30 URL（本 lane 无 curl/node）⇒ 由后续批承担。**不以「跑过了」充当通过**，明确计为 step 7 FAIL（§3）。

---

## 11. 异常 / 阻塞 / 人工动作（request_human · 各附一条可粘贴命令）

| # | 项 | 责任 | 可粘贴命令 |
|---|----|------|-----------|
| 1 | 4 车道 `LastTaskResult=2147946720`（0x80070020 文件占用）+ `ZP-k3-review` 未注册 + legacy watchdog 残留 | **K3 管理员** | `powershell -NoProfile -ExecutionPolicy Bypass -File F:\zprintpro-nextjs\scripts\register-cron-tasks.ps1; schtasks /Run /TN "ZP-monthly-matrix"` |
| 2 | v1 带钱词表 ja「激安」2 条 与 `i18n-guard.js JA_激安` 冲突（改表 or 存量豁免） | K3 口径裁决 | —（1 行裁决即可） |
| 3 | `authorByLocale` Instagram sameAs 真实性（AGENTS §0.23 禁假链接） | K3 | `rg -n "instagram.com/zprintpro" src/lib/seo/schema-extensions.ts` |
| 4 | hreflang 标签统一（`ja`→`ja-JP`、补 `en-CA`）+ 3 处 x-default 错指向 | K3 排批（src 行为变更） | `rg -n "x-default" src/lib/metadata.ts src/app/[locale]/legal/page.tsx src/app/[locale]/payment/success/page.tsx` |
| 5 | AI Overview 引用率月度复测的工具/方法（Perplexity key 缺失） | K3 | — |

**已挂账（只报不改，继承）**: FIX-3 footer 实体口径（香港新蒲崗 vs 深圳）· §0.0 名片展示层 (a)/(b)/(c) · flyers 价格口径（meta HK$0.18 vs 页 A5 HK$0.14）· books 正文 MOQ「1 本起訂」vs 真值 10 · 门童 #24 扫描域扩展。

**对 K3 大脑 §F-5 的一处结构建议（只报不改）**: §F-5-2 的 35 词置换若在 **11/1** 才执行，将与 11 月旺季（年賀状/聖誕卡/月曆）争同一批 SKU 注意力；本轮建议**提前到 10/19 title 窗同批**（数据条件已具备：10/12 档 + 现成占位词 `ノーリボン残留` 可先清）。

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异?（查前序实现路径）** — 查了 3 条：**(a)** 上轮 2026-09（9/13 manual）走「queue/coverage → tier rules → matrix P1 扩容 → 报告」，本轮**不重复**其扩容结论，只做增量完整性/覆盖率审计；**(b)** 兄弟车道 `ZP-gsc-feedback`（今日）走 `.hermes/` + matrix 回灌，本 lane **同日让路**、改落独立 ledger（撞车面 0）；**(c)** 月度报告命名路径存在**真实架构缺陷**（历史 3 份不合 §0.35.3.6 口径 → 总线断链），本轮已纠正并上报。**★ 另更正一处基线**: W3 技术审计 §2/§3 的 hreflang 与 sameAs 结论已被 9/30-10/10 的修复部分推翻（§7.1/§7.2）。
- [x] **2. 约束适用范围?（查 K3 拍板原文）** — K3 大脑 2026-10-09 §F-5 显式定义本车道 11/1 跑批（四项）；§F-5-4 明写「输出 matrix 回灌 + 11 月词盘建议（**交大脑月度复盘裁决，不擅自执行战略层变更**）」⇒ 本轮仅审计+建议，**未做战略取舍、未新建/砍页、未改价格**。同批遵守：§0.0 名片展示层不动（且未删改贺卡资产）、middleware 301 不动、title 冻结至 10/19、跨车道避让。
- [x] **3. 原数据/拍板来源?（3 问）** — ① 来源：matrix.json 一手直数 + 9 月报告（磁盘）+ 10/05 机器可读 money-kw JSON + 兄弟车道 10/09 档 + K3 8/30 与 10/09 拍板；② 真数据：覆盖率/条目数/grep 命中均为可复算实测，**未新增任何估算数字**，缺数据处标 PENDING/N/A（price-tables 不存在即判 N/A，未编造）；③ 留/撤：K3 拍板「留并执行」，本轮据此。
- [x] **4. 字段值策略?（certNo/validUntil/issuer 全空）** — 本批未触任何证书字段（0 改动）⇒ 不适用且不违反。
- [x] **5. Markdown 渲染?（`[text](url)` 走 parseInlineLinks）** — 本报告为内部文档，**未向任何 user-facing 文本注入** `[text](url)`；§6/§11 的引号内命令为内部操作串，不渲染到客户页面。

---

## 数据来源 / 校准状态 / 撤回声明（§I.2 三段，缺一作废）

```
数据来源:
- 结果总线: run-context-ZP-monthly-matrix.json (2026-10-10 00:17:10) + lane-status.json (2026-10-09T15:48:45Z) + lane-runs.jsonl(bus_records=15)
- 矩阵: .hermes/industry-keyword-matrix.json (12,628 行, version 2026-09-13-v1, 只读) — 一手 grep 直数
- 上轮: .hermes/logs/2026-09-monthly-matrix-audit.md (manual 2026-09-13) + 2026-07/08 同族 (命名不合规, 总线不可见)
- 带钱词: .hermes/money-kw-20261005.json (138,364 行) + .hermes/money-kw-20261012.json (status=MISSING)
          DELIVERY/2026-10-12-money-kw-package.md (§1.3/§3) + .hermes/money-kw-mine.py
- GSC (继承, 未重算): .hermes/logs/2026-10-10-ZP-gsc-feedback.md (§3/§4/§5/§7) + docs/2026-10-09-gsc-deep-audit-and-strategy.md
                      + .hermes/gsc-2026-10-09/{extract.json, compare-vs-0918.json}
- K3 拍板: docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md (§F-5 / Part A/E/G) 2026-10-09
           docs/2026-09-13-title-batch-T-freeze.md §6-3 · docs/2026-09-12-k3-directive-v93-home-fix-money-words.md
- 仓内一手实读: src/lib/hreflang.ts · src/lib/metadata.ts · src/lib/seo.ts · src/app/[locale]/layout.tsx
                src/app/[locale]/{legal,payment/success}/page.tsx · src/data/products.ts (83 条 relatedEntities 全空)
                src/data/sku-seo-data.ts (L50 等 35 词页) · src/data/category-seo-content.ts · src/lib/seo/schema-extensions.ts
                scripts/guards/i18n-guard.js (JA_激安 L643-647) · .hermes/title-v5-audit-inventory.md (276 条)
- 线上探针: web_fetch 2026-10-10 ×2 (github.com/zprintprohk-rgb HTTP 200 / instagram.com/zprintpro HTTP 200 非归属证据)
- 环境: pwsh 沙箱禁用 (v9.4 rearm) — node/python/git/tsc/build/门童 均未在 lane 内运行
校准状态: 🟡 混合已校准 — 需求侧继承 10/09 档 (FRESH, staleness 1d); 矩阵/仓内/词表为本 run 一手实读并附证据位置
撤回声明: 无 (未撤回任何前序报告)
基线更正 (非撤回): .hermes/geo/w3-technical-audit-2026-09-30.md §2 (hreflang) 与 §3 (sameAs 空壳) 已被 9/30-10/10 修复部分推翻 — 见 §7.1/§7.2
```

---

## NEXT 预排（下一轮 = 2026-11-01 06:13 正式月度跑批）

1. **matrix.json 回灌**（本轮跨车道避让未做）：把本 run ledger 的 `matrix_integrity` / `coverage` / `tier_switch` 三块并入，**修 version bump**（`2026-09-13-v1 → 2026-11-01-v1`）并**统一四个 last_updated 字段**，同时把 `p0/p1_coverage_pct` 改为**复算值**（42.86% / 30.0%）或补 `*_pct_recomputed` 字段。
2. **35 词触顶页置换**（若 10/12 档为多行 per-query JSON 且 node 可用）：7 ja + 3 en，先清 `ノーリボン残留` 类占位词，与 **10/19 title 批**（含 rush ja「激安」禁词消项 + 3 条存量 TRIM）合并 1 次 push。
3. **锚点表补 ホリデーカード**；季节段继续按三档记录（10/16 判读 → 11/1 出 0→展示进度）。
4. **AI Overview 引用率复测**（方法待 K3；未解决则继续显式 PENDING，不编造）。
5. **内容质量自迭代 11/1 首批**（3 locale × N 篇，需 curl 校验 ≥30 URL 由 host 侧承担）。
6. **命名治理**：为 7/8/9 月三份历史报告补 date-prefixed 别名或归档说明（docs/.hermes 层），恢复幂等账本连续性。

---

*Generated by deepseek harness（DSH lane `ZP-monthly-matrix`, v9.4 rearm 持续轮 · 非 1 号窗补跑 · 首份合口径命名报告）· 2026-10-10 · 仓根 F:\zprintpro-nextjs · 零 src 改动 · git commit/push 由 host-side wrapper 执行*
