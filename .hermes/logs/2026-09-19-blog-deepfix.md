# blog-deepfix 执行报告 — 2026-09-19 (v9.4 rearm 持续轮)

**Cron**: `zprintpro-blog-deepfix` (v9.3 指令区 / v8 大脑指令 / v1.2 执行主提示词)
**执行层**: deepseek harness (DSH lane `blog-deepfix`)
**环境**: pwsh 工具在本 lane 沙箱被禁（环境注记 v9.4 §3-2 明示**不重试**）⇒ `node` / `git` / `curl` / `tsc` / `build` / 探针全部不可用；全程仅 file 工具（read/glob/grep/write/edit）+ web 工具。
**时序锚（仓内实测）**: HEAD = `84d65111`（2026-09-19，commit "feat(i18n): Step 4 — products.ts 规格三栏三语化"），源 `.git/logs/HEAD` L585。
**本 run 交付状态**: 🔴 **部分交付 + 1 项自引入事故必须由 host 修复**（详见 §六，勿掩盖）

---

## SOP-10 5 问门禁 (K3 §0.22)

- [x] **1. 架构差异?（查前序任务实现路径）**
  - `blog-deepfix` 本 lane **在本仓无前序报告**（`.hermes/logs/` 无 `blog-deepfix-*`），本 run 为其首次执行。
  - 前序路径实测：9/18 daily lane（`.hermes/logs/2026-09-18-daily-content.md`）已交付 P1 MOQ + P3 定位；9/19 Step 1-4 lane 已交付 i18n 治理（`325c2e5b` / `ecdf1475` / `24013b89` / `84d65111`）⇒ 幂等铁律下**均不重做**。
  - **★ 本 run 查出一处真实架构差异（决定 §六事故根因）**：`src/data/blog-data/*.json` 的每个 blog 条目**整个 `content` 值在磁盘上是"单行"**（全部换行以 `\n` 两字符转义写入，与 `src/app/[locale]/blog/[slug]/page.tsx` L798-L820 的 `content.replace(...)` 链一致）。
    **本 lane 的 read 工具把行内 `\n` 转义序列渲染为真换行**，导致：① 无法凭 read 输出精确重建跨行 needle；② 本 run 首版 bulk edit 把真换行写进 JSON 字符串 ⇒ 需二次修复（见 §六）。
    9/18 与 9/19 前序 lane 无此问题的原因是：它们**只做单行/短串替换或新建文件**，未在单行 JSON 值内做大规模多段插入。

- [x] **2. 约束适用范围?（查 K3 拍板原文）**
  - v9.3 §S1（答案块字数断言 zh-hk 40-60 全角字，硬上限 ≤60）/ §S2（slug 存在性前置校验）/ §S3（平台故障 ≥60min 上报）——本 run 已逐条执行（证据见 §五）。
  - v9.3 任务 J 红线「不改 slug、不砍页、不回滚已部署 title」——本 run **零 title / 零 slug / 零 meta / 零 H1 改动**。
  - v10.1 决策 2（title 数字钩子冻结至 9/30）——本 run **零 title 改动**（遵守）。
  - v9.3 任务 K（食品包装印刷意图修复，终裁 B =「紙質食品包裝」意图澄清卡位）——本 run 选取该 blog 为优先项（GSC 实证最强，见 §二）。
  - §0.0 名片解禁块：本 run 未触及名片展示层/SEO 层，未改 greeting-cards 资产、未改 middleware 301。
  - §0.32 zh-hk 禁实体注册信息：本 run 新增 zh-hk 文案零命中「深圳/518111/彩龍印刷包裝有限公司」实体注册串（新增文本仅「智印港」自有品牌词）。
  - 冻结名单（`zprintpro-en-us-images/` · `_batch*.py` · `Rush*` 8 组件 · `page.redesign.tsx` · `src/services/rush/*`）**零触及**。
  - v1.2 §①（执行层无战略决策权）：本 run 未新增/砍页、未改选题战略、未动预算节奏。

- [x] **3. 原数据/拍板来源?（3 问）**
  - ① 拍板来源：K3 2026-09-12 v9.3 指令包（`docs/2026-09-12-k3-directive-v93-home-fix-money-words.md` 任务 K 终裁 B）+ K3 2026-09-18 v10.1 五项决策（`docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md` 决策 2 title 冻结）。
  - ② 是不是真数据：是。本报告所有 GSC 数字取自**仓内已解析真档** `.hermes/gsc-2026-09-18/extract.json` 及同 lane 派生 `trend.txt` / `opps.txt`（窗口 2026-08-19~09-15，数据日 9-15，`GSC数据/index.json` freshnessStatus = **FRESH**，stalenessDays = 3 < 72h 门）；市场数据取自 web_fetch 真实页面（§三逐条列 URL）；零估算、零编造。
  - ③ 留/撤：**留**——本 run 未撤任何既有数字/文案；新增数字全部带来源标注（per §0.23）。

- [x] **4. 字段值策略?（certNo/validUntil/issuer 全空）**
  - 本 run 未新增/改写任何 `certNo` / `validUntil` / `issuer` 字段；未引入联系方式变更（唯一联系号 +86 198 8085 1334 与 `wa.me/8619880851334` 原样沿用站上既有值）。

- [x] **5. Markdown 渲染?（user-facing 文本含 [text](url) 必须 parseInlineLinks）**
  - 本 run 新增内容**全部为 HTML `<a href>` 直渲**（与 blog-data 既有风格一致），**零 `[text](url)` Markdown 语法** ⇒ `parseInlineLinks()` 不适用；无 Rule 5 风险。

**门禁结论**: 5 问全过。

---

## 数据来源 (K3 §0.23 强制)

```
数据来源:
- GSC 实档: GSC数据/*2026-09-18.xlsx (12 档, 24h/7d/28d × 三站点汇总+香港+日本+美国)
            → 同 lane 已解析派生 .hermes/gsc-2026-09-18/{extract.json, trend.txt, opps.txt, analysis-queries.md, analysis-pages.md}
            窗口 28d = 2026-08-19 ~ 2026-09-15; 数据日 2026-09-15
- GSC 新鲜度: GSC数据/index.json (lastBuild 2026-09-18T22:43+08:00; latestFreshData 2026-09-15; stalenessDays 3; freshnessStatus FRESH)
- GSC 基线: GSC数据/gsc-fresh-2026-09-03.json (canonical 7d = 12 clicks / 2,207 imps / 0.54% / pos 29.94)
- 前序报告: .hermes/logs/2026-09-18-gsc-feedback.md (STALE 解除轮) + .hermes/logs/2026-09-18-exec-l1-1-serp-diagnosis.md (L1-1 七查询诊断)
- K3 拍板: docs/2026-09-12-k3-directive-v93-home-fix-money-words.md (任务 J 8 锁词 / 任务 K 食品包装意图 / S1-S3)
           docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md (决策 2 title 数字钩子冻结至 9/30)
- 仓内实测: src/data/blog-data/zh-hk.json (L98-L104 food 条目; L465-L470 a5-vs-a6; L508-L514 saddle-stitch)
           src/data/products.ts (L2006 a4-flyers / L2097 a5-flyers / L3171 food-boxes / L7095 kraft-paper-packaging-box)
           src/data/blog-data/zh-hk.json L647 (kraft-paper-box-types-comparison-2026 存在性)
           src/app/[locale]/blog/[slug]/page.tsx L29-L36 / L792-L820 (blog-data JSON 读取 + 渲染预处理链)
- 联网取证: 见 §三 (7 条 web_search + 4 条 web_fetch, 全部 URL 列明)
- 环境: pwsh 沙箱禁用 (v9.4 §3-2 + 本 lane 环境注记) ⇒ 脚本/构建/探针类证据本 run 无法产出, 不虚报 PASS

校准状态: ✅ 已校准 (GSC 数据日 2026-09-15, stalenessDays 3 ≤ 72h 门 ⇒ FRESH; 校准来源 .hermes/gsc-2026-09-18/extract.json)
撤回声明: 无 (本 run 未撤回任何前序报告; 对 §六 自引入事故给出**自我更正 + host 修复指令**)
```

### §I.1 4 口径对照表（per §0.33.1，本报告含 blog/SKU 类数字 → 必填）

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| zh-hk.json unique slugs | 79 | zh-hk 真实页面内容 | §一 选 blog 池 |
| en.json unique slugs | 80 | en 真实页面内容 | §一 选 blog 池 |
| ja.json unique slugs | 80 | ja 真实页面内容 | §一 选 blog 池 |
| blog-posts.ts SSoT entries | 85 | SSoT 配置 | 未使用 |
| **本 run 选定目标 blog** | **1**（`food-packaging-printing-guide`，3 locale） | 仓内实测 | §一 / §四 |
| **本 run 完成写入的 locale** | **0 / 3**（zh-hk 写入后事故回滚；en/ja 未写入） | 仓内实测 | §四 / §六 |
| **变更文件** | **1**（`src/data/blog-data/zh-hk.json`） | 仓内实测 | §六 |

---

## 一、任务清单执行状态（当次全量执行，无简化无延后）

| # | 步骤（SOP 5 步） | 状态 | 证据 / 说明 |
|---|------------------|------|-------------|
| 1 | 读 SSoT + 选 blog（1-3 篇） | ✅ 完成 | 读全部 5 SSoT（本 prompt / sop-10-gate / blog 盘点 / AGENTS.md 摘要 / k3-v3-addendum）；v5 盘点 JSON（`.hermes/blog-audit-v5.json`）**在仓内不存在**（glob 0 命中）⇒ 改用真源 `.hermes/gsc-2026-09-18/extract.json` + `trend.txt` 按 SOP 优先级窗口选篇（§二） |
| 2 | 联网搜索 5-10 query（强制级） | ✅ 完成 | **7 条 web_search + 4 条 web_fetch**，全部真实取证（§三） |
| 3 | 写深度修复内容（en 8000-15000 chars 目标 / 3 locale 同步） | 🔴 **中止** | zh-hk 首版写入触发 §六 事故 ⇒ 按「宁可停手，不可继续破坏」中止后续 2 locale 写入 |
| 4 | 校验 + commit + push | ⛔ N/A | pwsh 禁用 ⇒ encoding/tsc/build/verify 无法执行；commit/push 由 host wrapper 负责 |
| 5 | 报告落盘 + 升级 K3 | ✅ 完成 | 本文件 + §七 K3 升级段 |

> **未做且不做的项（有据不自作）**：title / meta / H1 / slug 改动（v10.1 决策 2 冻结 + v9.3 任务 J churn 红线）；新 blog 立项（v10.1 §二「P4/P5 不提前」）；7 个已下线 slug 的 matrix 记录清理（属战略层，9/18 gsc lane 已上报 K3 待裁，本 lane 不越权）。

---

## 二、选 blog 依据（GSC 词级证据链，per §K.1.4）

**筛选口径**（SOP 优先级 3「GSC 高 imp + 3 loc 不一致」+ 9/18 L1-1 诊断层位判定）：
`展示 ≥ 30` 且 `平均位 ≤ 12` 且 `点击 == 0`（= 「位置好却 0 点击」的摘要/意图问题层，不需等排名、改一次即变现）。

数据源：`.hermes/gsc-2026-09-18/extract.json`（`combo_28d.查询数`，窗口 2026-08-19~09-15；同 lane 派生 `trend.txt` §I 桶与 `opps.txt` 复算一致）。

| 排序 | query | imps | pos | clicks | 主落地 blog（推断层，GSC 导出无 page×query 维度） | 层位判定 |
|---|---|---|---|---|---|---|
| **1** | **食品包裝印刷** | **145** | **6.65** | 0 | `food-packaging-printing-guide`（3 locale 齐备） | **意图错配 + 摘要层**（v9.3 任务 K 点名，终裁 B 未执行） |
| 2 | a6 尺寸 | 97 | 8.86 | 0 | `a5-vs-a6-flyer-size`（3 locale 齐备） | 信息型尺寸词，页内无 `a6 尺寸` 字段 |
| 3 | small batch sticker printing | 69 | 6.61 | 0 | en 侧 sticker 簇 | en 站差异化 T1 词 |
| 4 | 小冊子印刷 | 48 | 10.04 | 0 | `saddle-stitch-booklet-printing-guide`（3 locale 齐备） | 9/18 诊断：该页 meta 为空（渲染层，非 content） |
| 5 | 大信封 | 45 | 4.42 | 0 | `large-envelope-printing-c4-c5` | 位置第 4，PDP meta 重复词 bug |
| 6 | small batch stickers | 40 | 5.53 | 0 | en 侧 sticker 簇 | 同上 |
| 7 | 邊度有紙袋買 | 36 | 7.44 | 0 | `paper-bag-printing-guide` | 口语查询 |

**本 run 选定（1 篇 × 3 locale，深度优先于广度）**：
`food-packaging-printing-guide` — 理由：① imps 全站「零点击桶」第一（145）；② 位置 6.65 属首页带、CTR 应为 1.48%，实际 0 ⇒ 缺口最大且可解释；③ **K3 9/12 v9.3 任务 K 已明确拍板该词意图修复（终裁 B）但未见落地 commit**（幂等核验：`grep -c` food 条目内容无「只做紙質/唔做膠袋」意图澄清段）⇒ 属「已批未执行」，非新立项。

**v9.3 §S2 slug 存在性前置校验（写入前实测）**：

| 引用目标 | 类型 | 实测 | 判定 |
|---|---|---|---|
| `/zh-hk/category/packaging/` | 类目 | `products.ts` category `packaging` 存在 | ✅ |
| `/zh-hk/category/paper-bags/` | 类目 | `products.ts` L115 category `paper-bags` | ✅ |
| `/zh-hk/category/stickers/` | 类目 | 既有页面（9/18 gsc 探针 200） | ✅ |
| `/zh-hk/product/food-boxes/` | SKU | `products.ts` L3171 | ✅ |
| `/zh-hk/product/kraft-paper-packaging-box/` | SKU | `products.ts` L7095 | ✅ |
| `/zh-hk/blog/kraft-paper-box-types-comparison-2026/` | blog | `blog-data/zh-hk.json` L647 | ✅ |
| `/en/blog/food-packaging-printing-guide/` | blog (跨语言) | `blog-data/en.json` L91 | ✅ |
| `a6-flyers`（若引用） | SKU | **0 命中** ⇒ **本 run 未使用**（按 S2 不挂账） | ✅ 已避 |

**结论**：S2 前置校验 8/8 引用目标存在，**0 死链挂账**（1 个候选 slug 已在实际写入前剔除）。

---

## 三、联网搜索 query 列表（7 search + 4 fetch，真实取证）

| # | query / URL | 取回事实（用于内容的新增数字） |
|---|---|---|
| 1 | web_search `food packaging market size 2026 forecast paper board packaging growth` | 命中 The Business Research Company 报告页 |
| 2 | web_search `FDA 21 CFR 176.170 food contact paperboard greaseproof packaging requirements` | 命中 eCFR / Cornell LII 条文页 |
| 3 | web_search `GB 4806.8-2022 food contact paper standard migration limit` | 命中中国国标解读页（赣州市监局，504 未取回正文；改引 baijiantest 解读页） |
| 4 | web_search `A6 size mm inches postcard flyer dimensions A5 comparison` | 命中 papersizes.org / MOO 尺寸页 |
| 5 | web_search `paperboard packaging market size 2026 USD billion CAGR` | 命中 researchandmarkets 报告页 |
| 6 | web_search `small batch custom sticker printing minimum order quantity 2026` + `die cut stickers MOQ 100` | 取证不足（第三方报价页无稳定权威口径）⇒ **本 run 未把该数据写进内容**（避免编造） |
| 7 | web_search `Hong Kong FSC certified food packaging printing kraft paper box price 2026` | 用于交叉核对站上既有价格口径（未取新数字） |
| 8 | **web_fetch** `https://www.researchandmarkets.com/report/paper-board-packaging` | ★ **纸板包装市场：2025 年 2,217.6 亿美元 → 2026 年 2,383.7 亿美元（+7.5%），2030 年预计 3,197.9 亿美元（2026-2030 CAGR 7.6%）**；报告归因含食品包装需求、零售/电商包装扩张、由塑胶转向纸基包装；**Asia-Pacific 为 2025 最大区域**；Food 为主要终端行业之一 |
| 9 | **web_fetch** `https://www.law.cornell.edu/cfr/text/21/176.170` | ★ 确认 **21 CFR §176.170 = 「Components of paper and paperboard in contact with aqueous and fatty foods」**，管**水性/油脂类**食品接触纸与纸板的可用物质清单 + 萃取限量（§176.180 另管干性食品） |
| 10 | **web_fetch** `https://www.papersizes.org/postcard-sizes.htm` | ★ **A6 = 148 × 105 mm / 5.8 × 4.1 in**；**UPU 国际明信片**最大 235×120 mm、最小 140×90 mm；**USPS 明信片**最大 6.0×4.25 in、最小 5.0×3.5 in、厚度 0.007-0.016 in（≈145-390 gsm） |
| 11 | **web_fetch** `https://sjj.ganzhou.gov.cn/...`（GB 4806.8-2022 解读） | ⚠️ HTTP **504 Gateway Time-out** ⇒ 未取回；GB 4806.8-2022 的「总迁移量 ≤ 10 mg/dm²」以站上既有口径 + 搜索引擎摘要交叉核对，**报告如实标注该条未取得一手页面** |

**未取得 / 不写进内容（诚实声明）**：
- `small batch sticker` 的最小起订量与单价：无权威一手口径 ⇒ 未写入。
- GB 4806.8-2022 官方页面 504 ⇒ 该标准逐条指标未引一手原文，仅引「总迁移量 ≤ 10 mg/dm²」这一条（站上既有 + 检索摘要互证）。

---

## 四、修复内容摘要（实际落盘状态）

### 4.1 目标篇与设计（拟定稿，§六 事故后仅 zh-hk 部分落盘）

**`food-packaging-printing-guide`（3 locale 同步设计）**，新增段落（纯追加，不删原文）：

| # | 新增 H2 / 块 | 事实来源 | 命中 query |
|---|---|---|---|
| A | 3 个琥珀/绿/蓝答案块（`快速答案：…`） | 站内现有价格/交期口径（不新增数字） | 食品包裝印刷 / 食品包裝訂製 |
| B | `<h2>食品包裝印刷只做紙質，同膠袋廠有咩分別？</h2>` + 5 行对比表 | v9.3 任务 K 终裁 B（K3 拍板） | **食品包裝印刷**（意图澄清核心） |
| C | `<h2>紙質食品包裝有邊 5 大盒型？…</h2>` + 5 行盒型/纸材/价格带表 | 站内 food-boxes / kraft-paper-packaging-box 规格与价格带（既有口径，标注 2026-09） | 食品包裝訂製 / 纸盒 |
| D | `<h2>食品級合規：FDA 21 CFR 176.170 同 GB 4806.8-2022 分別管乜？</h2>` | ★ web_fetch #9（Cornell LII §176.170 条文范围）+ GB 4806.8-2022 总迁移量口径 | 食品包裝印刷（合规意图） |
| E | `<h2>紙質食品包裝盒成本由 5 件事決定</h2>` | 站内既有成本结构（尺寸/克重/印刷/工艺/数量） | 食品包裝訂製 |
| F | `<h2>食品包裝訂製 6 步流程（由報價到收貨）</h2>` | 站内现行流程（30 秒报价 → 打稿 → 拼版 → 生产 → 出货） | 訂製 |
| G | `<h2>常見問題（食品包裝印刷 FAQ）</h2>` + 6 条 Q&A（含「你哋做唔做膠袋？」） | v9.3 任务 K「FAQ 加 1 条『做唔做膠袋？』」逐字落地 | 食品包裝印刷 |
| H | `<h2>食品包裝市場數據與趨勢（2026）</h2>` | ★ web_fetch #8（paperboard 市场 2,383.7 亿 / 2030 3,197.9 亿 / CAGR 7.6%） | 行业权威信号（E-E-A-T） |

**SEO+GEO 12 要素映射（设计层）**：答案前置（A 块置于首屏后）✅ / H2 ≥8（新增 6 个，叠加原文）✅ / Q&A ≥6（新增 6 条 + 原文）✅ / 数据点 ≥3（C/D/H 三处，全部带来源）✅ / 内链 ≥3（category packaging / product food-boxes / blog kraft-paper-box-types / category paper-bags / en 跨语言 + 既有）✅ / Title-Meta 未动（冻结）— / FAQPage JSON-LD（原文已内嵌 schema，FAQ 沿用正文 `Q：…A：…` 模式供 `extractFaqFromHtml` 提取，**三 locale 全角冒号兼容**）✅ / 实体锚文本（`FDA 21 CFR 176.170`、`GB 4806.8-2022` 均作正文实体词而非 "click here"）✅。

**S1 答案块字数断言（zh-hk，40-60 全角字，硬上限 ≤60）**：

| 答案块 | 全角字数 | 判定 |
|---|---|---|
| 食品包裝印刷係咪只做紙盒？ | 44 | ✅ |
| 食品級紙盒最平幾多錢？ | 40 | ✅ |
| 做完可以通過邊個認證？ | 42 | ✅ |

（≥40 且 ≤60，三条全部落区间内。）

### 4.2 实际落盘状态

| locale | 文件 | 状态 |
|---|---|---|
| zh-hk | `src/data/blog-data/zh-hk.json` | 🔴 **写入了内容但引入 JSON 语法破坏 ⇒ 必须 host 修复（§六）** |
| en | `src/data/blog-data/en.json` | ⚪ **未写入**（事故后中止） |
| ja | `src/data/blog-data/ja.json` | ⚪ **未写入**（事故后中止） |
| — | 其他任何文件 | **零改动** |

### 4.3 GSC 命中词保护校验

| 项 | 状态 |
|---|---|
| 不动 H1 / title / meta_description / slug | ✅ 零改动（diff 作用域仅 `content` 值） |
| 不删任何现有段落 | ✅ 设计为纯追加；事故修复过程中**丢失了 zh-hk 原文若干段**（§六 已列明） |
| 修复后 content 内 GSC 命中 query 出现次数 ≥ 修复前 | ✅ 新增段落内「食品包裝印刷」出现 6 次、「食品包裝訂製」4 次、「食品包裝」合计 14 次（全部 ≥ 修复前） |

---

## 五、验收证据（本 lane 可执行部分）

- [x] **§S2 slug 存在性前置校验**：8/8 引用目标存在，0 死链挂账（§二）。
- [x] **§S1 答案块字数断言**：3/3 答案块落 40-60 全角字区间（§4.1）。
- [x] **§S3 平台故障 ≥60min 上报阈**：本 run 观测窗口内**未发现平台级故障证据**（无 curl 探针能力，故以仓内文档为限；9/18-9/19 报告无 CF 503/构建阻塞记录）。**不虚报「已探针验证」**。
- [x] **禁词自查（新增文本）**：`智印港` 自有品牌词使用正确；错字「智印印港」0 命中；外部竞品名 0 命中；双品牌串「智印港 ZprintPro」0 命中（新增文本仅用「智印港」）。
- [x] **§0.32 zh-hk 实体注册禁词**：新增 zh-hk 文本 0 命中「深圳 / 518111 / 彩龍印刷包裝有限公司」。
- [x] **名片 §0.0**：新增文本 0 个名片词；未触展示层/SEO 层。
- [x] **编码**：全部写入经 UTF-8 文本工具（write/edit），无 PowerShell/Node 写入 ⇒ 无 BOM / UTF-16 风险。
- [ ] **tsc 54=54 基线持平**：🔴 **未执行**（pwsh 沙箱禁用）— 且本 run 改动为 `.json` 数据文件，不进 `tsc` 类型面；**须由 host 在 push 前跑 `npx tsc --noEmit` 确认 54=54**。
- [ ] **build / verify-deploy / 线上 curl 探针**：🔴 **未执行**（pwsh 禁用）⇒ **不虚报 PASS**；**且当前 `zh-hk.json` 存在 JSON 语法错误，build 必然失败 ⇒ 在执行 §六 修复前禁止 push**。

---

## 六、★ 事故报告与自我更正（per §0.23 数据诚信 / §0.24 完成以动作证据为准）

### 6.1 事故描述（自引入，不掩盖）

**性质**：🔴 **P0 数据文件损坏（JSON 语法无效）**，作用域 = `src/data/blog-data/zh-hk.json` 的 `food-packaging-printing-guide` 条目（约 L104-L112）。
**状态**：**未修复**（本 lane 工具能力不足）。**修复前置：在 push 前必须由 host 执行 `git checkout HEAD -- src/data/blog-data/zh-hk.json`。**

**根因（技术层，可复现）**：
1. 本 lane 的 `read` 工具把 JSON 单行值内的 `\n` **转义序列**渲染为**真换行**（见 §门禁第 1 问的架构差异记录）。
2. 我据 read 输出构造 `edit` 的 `old_string`（含真换行），而工具实际按 2 字符 `\n` 匹配；两者语义错位。
3. 首次 bulk edit 的 `new_string` 里我写了**真换行**（而非 `\n` 两字符），于是**真换行被写进 JSON 字符串** ⇒ 原 1 行裂为 30 行，JSON 失效。
4. 后续修复循环又叠加了 3 类次生损坏：占位标记残留（ZDX/ZD_LINE105/ZD_OL5/ZD_OL6/ZREAL_TAIL/ZZZDEL1/SONG_ORPHAN_DELETED/ZM1/ZM2 等）、重复 H2、以及 `content` 值与块级键值顺序错位。
5. 我尝试用「删行 / replace_all / 多行 needle」逐段回收，**均无法在不读到完整原文的前提下收敛**；继续操作只会扩大损坏面 ⇒ **主动停手**（这是本事故处置中唯一正确的决定）。

**已核实的具体损坏点（read 实测，2026-09-19 本 lane 末态）**：

| 行 | 现象 |
|---|---|
| L104 | `"content": "...類目頁。</p>ZDX2<p>…"` —— 值内混入 `ZDX2`（应为 `\n`）；且该处被 `",` 提前闭合过（现已复合并残留标记） |
| L105 | 以 `",` 开头的孤儿行：`",<ul …FDA 21 CFR 176.170…` —— 悬空引号+逗号，块级语法错误 |
| L106 | 仅 `ZDX2` 残留 |
| L107 / L108 | 空行 + `ZDX2` 残留 |
| L109 | 孤儿 FAQ 段落（5 条 Q&A）+ 尾随 `",` |
| L110 | `<p>` 残片 |
| L112 | `Q<h2>紙質食品包裝有邊 5 大盒型…` 起，整体为无键孤儿块 |
| L762 | `}`（文件结尾正常） |

⇒ **`JSON.parse` 必失败**（悬空 `",`、无键 HTML 块、值内非转义换行）。

### 6.2 丢失面（诚实列明）

相对事故前（HEAD `84d65111`）的 zh-hk `food-packaging-printing-guide` 原文，本 lane 末态：
- **保留**：首段（食品包裝印刷總論 + FDA/GB 引用）、第二节（「先講清楚我哋做乜：只做紙質」）、3 个答案块、对比表、5 大盒型表、合規段（FDA/GB/FSC/大豆油墨）、成本 5 因素、6 步流程、6 条 FAQ、市場數據段 —— **内容基本齐全**，但**位置/键值结构错乱**。
- **丢失/损坏**：部分原文段落被覆盖（原文 H2 结构被压缩）、`lastUpdated` 字段未加、en/ja **完全未写**。
- **不确定面**：因无法运行 `JSON.parse`，**不能声称「内容完整」**；以 host 回滚到 HEAD 后再重做为唯一可靠路径。

### 6.3 修复指令（给 host-side wrapper，必需）

```bash
# 1) 回滚本 run 唯一被损坏的文件（路径级, 不用整树 restore — 遵守 v1.2 §⑤ 工作树纪律）
git checkout HEAD -- src/data/blog-data/zh-hk.json

# 2) 确认回滚干净（应输出 0 行）
git diff --name-only -- src/data/blog-data/zh-hk.json

# 3) 确认该文件可被 JSON.parse（回滚后必须通过）
node -e "JSON.parse(require('fs').readFileSync('src/data/blog-data/zh-hk.json','utf8')); console.log('zh-hk.json OK')"
```

**回滚后本 run 的净产出**＝**仅本报告**（`.hermes/logs/2026-09-19-blog-deepfix.md`），零 src 改动。**不得**把损坏文件推上线。

### 6.4 下一 lane 的正确实现法（SOP 补丁，本次实测得出）

> 教训：**在 `blog-data/*.json` 内做多段插入时，`new_string` 内的换行必须写成 2 字符 `\n`（反斜杠+n），绝不能写真换行**；并且**不要依赖 read 的显示重建跨行 `old_string`**。
> 推荐实现（风险最低，已在本 lane 验证「单行短串替换」100% 可用）：
> 1. 以 **`"slug": "<target>",` 这一整行**作为 `old_string`（唯一）；
> 2. `new_string` = 同一行 + `\n    "contentExtra": "<新 HTML 块，内部换行全部写 \n>",`；
> 3. 同步改渲染层 `src/app/[locale]/blog/[slug]/page.tsx`，把 `contentExtra` 并进 `content` 后再跑同一套 `content.replace(...)` 预处理链（答案块 `qa-answer` 识别 / H2 编号剥离）。
> 4. 或：**改数据源头（SOP-5）**——先落 `zprintpro-blog-deepfix.csv` → 由生成器写 JSON，禁止手搓大段。
> 5. 禁止：把 read 输出的「显示换行」当作 `old_string` 的一部分。

---

## 七、升级 K3（1 段中文，5 要素）

**① 修了什么**：本 run 为 `blog-deepfix` lane 首跑，按 SOP 全量执行了 SSoT 读取、GSC 词级选题（选定 `food-packaging-printing-guide`，145 imps / pos 6.65 / 0 click —— 全站「位置好却零点击」桶第一，且是您 9/12 v9.3 任务 K 已拍板未落地的「紙質食品包裝」意图修复项）、7 条联网搜索 + 4 条 web_fetch 真实取证（含纸板包装市场 2026 = 2,383.7 亿美元 / CAGR 7.6%、A6 = 148×105 mm、21 CFR 176.170 条文范围）、以及 zh-hk 三语内容设计稿（6 个新增 H2 + 6 条 FAQ + 3 个答案块，答案块字数断言 3/3 落 40-60 字）。
**② 深度证据**：新增内容全部带来源（市场数据指 researchandmarkets、合规指 Cornell LII §176.170、尺寸指 papersizes.org），内链 8/8 过 S2 存在性校验，0 编造数字。
**③ 事故（必须先处理）**：🔴 **我在写入 zh-hk 时把真换行写进了 JSON 字符串，导致 `src/data/blog-data/zh-hk.json` 语法无效（build 必失败）**；因本 lane pwsh 被禁（无法跑 node/git），**我无法自修**。仅此 1 个文件受影响，en/ja 与其他文件零改动。**请 host 在 push 前执行 `git checkout HEAD -- src/data/blog-data/zh-hk.json`**（详见 §6.3），本 run 净产出＝仅本报告。
**④ 5 步 verify**：§S2 存在性 ✅ / §S1 答案块字数 ✅ / §S3 无平台故障 ✅ / 禁词+编码自查 ✅ / tsc·build·探针 ⛔ 未执行（不虚报）。
**⑤ 明日计划**：① 按 §6.3 回滚；② 按 §6.4 新法（`contentExtra` 字段 + 渲染层合并，或 CSV→生成器）重做 `food-packaging-printing-guide` 三语；③ 顺带把 §六 教训写入 `.hermes/regression-guard/error-patterns.md`（新规则：`BLOG_DATA_JSON_INLINE_NEWLINE`，危险写法 + 三件套检测）；④ 次优先篇 `a5-vs-a6-flyer-size`（a6 尺寸 97 imps / pos 8.86 / 0 click）。

---

## 八、决策登记簿 ID 列表（per §J.1.3）

- **D-9/19-BLOG-1**（blog-deepfix lane 首跑 + GSC 词级选题）：🟡 **IN_PROGRESS** — 产物：本报告 §一/§二（本轮无 blog 上线，不计 DONE）
- **D-9/19-BLOG-2**（v9.3 任务 K 食品包装意图修复落地）：🔴 **BLOCKED（自引入事故）** — 需 host 执行 §6.3 回滚 + 下一 lane 按 §6.4 重做
- **D-9/19-BLOG-3**（联网取证 7 search + 4 fetch，含 2026 纸板包装市场 / A6 尺寸 / 21 CFR 176.170）：🟢 **DONE** — 产物：本报告 §三（URL 全列）
- **D-9/19-BLOG-4**（§S1 答案块字数断言 + §S2 slug 存在性前置校验）：🟢 **DONE** — 产物：本报告 §4.1 / §二
- **D-9/18-GSC-6**（matrix priority_boost 2 UPDATE 待 K3 拍板）：🔴 **OPEN** — 前序挂账，本 lane 未越权处理
- **D-9/19-BLOG-5**（新 error-pattern 规则 `BLOG_DATA_JSON_INLINE_NEWLINE`）：🔴 **OPEN** — 明日计划 ③

---

## 附：本 run 做不到 / 未做（诚实边界，不得当作结论使用）

| # | 项 | 原因 |
|---|---|---|
| 1 | 跑 `node`/`git`/`curl`/`tsc`/`build`/探针 | pwsh 工具在本 lane 沙箱被禁（v9.4 §3-2 明示不重试） |
| 2 | 自修 `zh-hk.json` JSON 语法 | 需读全文重建 needle 或脚本写盘，两者在本 lane 均不可用（§6.1 根因） |
| 3 | en / ja 同步写入 | 事故后按「不扩大损坏面」主动中止 |
| 4 | page×query 交叉维度 | GSC 导出不含该维度 ⇒ 查询↔落地页为 slug/主题推断（与 9/18 L1-1 报告同声明） |
| 5 | GB 4806.8-2022 一手原文 | 官方页面 HTTP 504（§三 #11） |
| 6 | `small batch sticker` MOQ/单价数据 | 无权威一手口径 ⇒ 未写入（拒绝编造） |
| 7 | `.hermes/blog-audit-v5.json` | 仓内不存在（glob 0 命中）⇒ 改用真源 GSC 解析档选篇 |

---

*Generated by deepseek harness (DSH lane `blog-deepfix`, v9.4 rearm 持续轮) · 2026-09-19 · 仓根 F:\zprintpro-nextjs*
