# ZprintPro Daily Content Report — 2026-09-18

**Cron**: `zprintpro-daily-content-1x7w` (v9.6)
**执行轮**: 2026-09-18（v9.4 rearm 持续轮；本 run 承接 K3 v10.1（2026-09-18 19:10）串行批次 **P1** + **P3**）
**执行层**: deepseek hermes（v9.4 §3-2：报告落盘 = 任务成功）
**环境**: pwsh 工具在本 lane 沙箱被禁（不得重试）→ git / node / curl 不可用；全程用 read/glob/grep/write/edit + web 工具完成
**报告路径**: `.hermes/logs/2026-09-18-daily-content.md`
**时序锚**: 仓内最新 commit `4923ced4`（2026-09-18 20:54 +0800）+ K3 v10.1 指令 19:10 +0800（.git/logs/HEAD 与文档实测）

---

## SOP-10 5 问门禁 (K3 §0.22)

- [x] 1. **架构差异?** 派活前查前序任务实现路径 —
  - P0 清障已完成（`6e5179c5` 门童 #20 专用基线通道 + P0-3 代码层折叠重复词；`c4146e7f` blog 渲染层 description 字段名修复 + 规则 D；error-patterns.md 规则 `META_DESCRIPTION_MECHANICAL_DEFECT` 已入档）→ 本 run **不重做**（幂等铁律）。
  - **★ 本 run 查出一处真实架构差异**：执行层最优方案 v1 §三 P3-2 记「`scripts/csv-to-sku-seo.mjs` 已确认 merge 模式，读既有 .ts」——**实况不符**：脚本 L75-L102 为 `const out = {}` 逐行重建 + L125 `fs.writeFileSync(outPath, ts, 'utf-8')` **整文件覆盖**，且只映射 5 个字段（title/description/h1/keywords/body）+ faqs + imageAlt。据此**未执行** P3-2/P3-3 写入（详见 §四）。
  - 队列差异：v10.1 §三 记「下一篇必须是 P0-1 Candle & Soap Label」，但 `src/data/buying-guides.ts` L906-L931 实证该篇（`candle-soap-label-printing-guide`）**已于 9/17 上线**（v10 卡 §五 P0-4a `2ce4db49`+`d969459c`）→ 幂等铁律下**不重做**；队列 A #3 寫真書亦已于 `29f1afd9` 交付并 `4923ced4` 完成验收。P1/P3 为串行序中**下一件未做事**。
- [x] 2. **约束适用范围?** 查 K3 拍板原文 —
  - v10.1 决策 1 终裁 B 附加条件四条逐条执行：① 仅数码线书刊/本册类（`books` 品类 4 SKU），柯式线（5 个餐牌类 SKU）MOQ 展示**不动**；② 价格数字**零改动**；③ 文案只写「我哋 1 本起印」，**无任何竞品 MOQ 对比数字**；④ 9/25 回报 GSC 书刊簇 CTR/imp（已写入 matrix `pending`）。
  - 决策 2（title 数字钩子冻结至 9/30 观察窗终审）→ 本 run **零 title 改动**。
  - 冻结名单（`zprintpro-en-us-images/` × `_batch*.py` × `Rush*` 8 组件 × `page.redesign.tsx` × `src/services/rush/*`）**零触及**。
  - §0.0 名片：已解禁（接单层）；本 run 未触及展示层/SEO 层，未改 greeting-cards 资产、未改 middleware 301。
  - §0.25.10.5：本次含 2 个模板文件改动（PDP + 品类卡），属**展示层小改动**但含新组件结构渲染 → 不走「免预览直推」的自我认定，交 host-side wrapper 按 §12 push 5 步 SOP 处理。
- [x] 3. **原数据/拍板来源?** 3 问 —
  - ① 拍板来源：K3 2026-09-18 业务口径原话（「一本都可以印…只要统一说明就好」）+ v10.1 决策 1（`docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md` 19:10）+ 方案 `docs/2026-09-18-moq-unified-statement-and-enhancement-plan.md`。
  - ② 是不是真数据：是。`products.ts` features 9 处 `【50本起訂】` 由 grep 实测（行号见 §三）；`minQuantity` 96 SKU 分布、CSV 75 行 / 派生 99 slug / 生成器 126 行全文均为仓内实测，无估算。
  - ③ 留/撤：**留**（切点「100 本以上柯式更經濟」为站上既有表述，非本次新造，未增任何新数字）。
- [x] 4. **字段值策略?** — 本 run 未新增/改写任何 `certNo` / `validUntil` / `issuer` 字段，未引入联系方式变更（唯一联系号 +86 198 8085 1334 原样未动）。
- [x] 5. **Markdown 渲染?** — 本 run 新增文案全部为**纯文本/JSX 直接渲染**（`print-method-policy.ts` 的字符串常量 + PDP JSX 文本节点），**零 `[text](url)` Markdown 链接**，无 `parseInlineLinks()` 适用面；既有内链均为 `<a href>`。

---

## 数据来源 (K3 §0.23)

```
数据来源:
- K3 拍板记录: docs/2026-09-18-k3-directive-v101-five-decisions-ruling.md (2026-09-18 19:10 签发, 5 项决策终裁)
- 执行层方案: docs/2026-09-18-execution-layer-optimal-plan-v1.md (0707cc49) P1/P3 阶段定义
- MOQ 诊断: docs/2026-09-18-moq-unified-statement-and-enhancement-plan.md (§2 仓内实测 / §4 文案候选 / §五 L0-L4)
- 仓内实测: src/data/products.ts (features 9 处 【50本起訂】 行号 L4755/4830/4926/5023/5117/5664/5841/5941/6034; minQuantity 96 SKU)
           src/data/sku-seo-data.ts (99 个顶层 slug; zh-hk description 批量模板) / src/data/category-seo-content.ts (books 品类 1 本起訂 ×4)
           zprintpro-sku-seo-data.csv (76 行 = 1 表头 + 75 行; 31 列 TAB 分隔) / scripts/csv-to-sku-seo.mjs (126 行, 全量覆盖式生成器)
           scripts/guards/meta-description-guard.js (296 行, 规则 A/B/C/D) / .hermes/meta-baseline.json (基线 120 = zh-hk 9 / en 56 / ja 9 / sku-seo 44 / products 1 / category-seo 1)
- 幂等核验: src/data/buying-guides.ts L906-931 (candle-soap-label-printing-guide 已上线) + .git/logs/HEAD L557-565 (HEAD=4923ced4 2026-09-18 20:54)
- GSC: .hermes/hk28d-queries.json + .hermes/enja28d-queries.json (9/10 xlsx 28d 解析, 窗口 8/14-9/10) — STALE
- GSC 基线: GSC数据/gsc-fresh-2026-09-03.json (7d all = 12 clicks / 2,207 imps / 0.54% / pos 29.94)
- 008 询盘: data/inquiry-counter.json (2026-09-04 更新, 0 条; GA4 G-248QMCT2S3 已接线待回填)
- 环境: pwsh 沙箱禁用 (v9.4 §3-2 + 本 lane 环境注记) — 脚本/构建/探针类证据本 run 无法产出, 不虚报 PASS

校准状态: 待校准 — GSC 最新落盘真值 = 9/10 (vs 9/18 = 8d > 72h §K.1.3 新鲜度门) ⇒ STALE; 本报告不含任何新的 GSC 数字结论
撤回声明: 无 (本报告未撤回任何前序报告; 本 run 对 v1 方案「merge 模式」表述提出**更正**, 见 §六)
```

### §I.1 4 口径对照表（per §0.33.1，本报告含 SKU/篇数类数字 → 必填）

| 口径 | 真实数量 | 类型 | 本报告何处使用 |
|------|---------|------|----------------|
| zh-hk.json unique slugs | 79 | zh-hk 真实页面内容 | 未使用（本 run 未动 blog-data） |
| en.json unique slugs | 80 | en 真实页面内容 | 未使用 |
| ja.json unique slugs | 80 | ja 真实页面内容 | 未使用 |
| blog-posts.ts SSoT entries | 85 | SSoT 配置 | 未使用 |
| **CSV 源行数** | **75**（76 行含表头） | `zprintpro-sku-seo-data.csv` 实测 | §四 finding 4 |
| **sku-seo-data.ts 顶层 slug 数** | **99** | 派生文件实测（grep `^  "…": {$`） | §四 finding 4 |
| **products.ts 含 【50本起訂】 SKU 数** | **9**（books 线 4 + menus 线 5） | 仓内实测 | §三 |

---

## 一、任务清单执行状态（v9.3 指令区 + v10.1 串行批次，当次全量执行，无简化无延后）

| # | 任务 | 状态 | 证据 |
|---|------|------|------|
| 1 | **P0 幂等核验**（不重做已完成） | ✅ 通过 | `6e5179c5` 门童 #20 通道 + P0-3；`c4146e7f` 渲染层修复 + 规则 D；error-patterns 规则入档 |
| 2 | **P1 MOQ 统一文案落位**（决策 1-B，🟡 已批） | ✅ 完成 | 新建 SSoT + products.ts 4 处 + PDP 展示/答案块 + 品类卡展示（§三） |
| 3 | **P3-1 CSV 源头治理定位**（决策 ③A，🟡 已批） | ✅ 完成（定位） | 4 项 finding + 影响评估（§四）；写入 ⚪ BLOCKED（见 §六） |
| 4 | 队列核验（幂等铁律，不重复做已完成的事） | ✅ 完成 | Candle & Soap 已上线；队列 A #3 寫真書已交付验收；未开新队列项（v10.1 §二「P4/P5 不提前」） |
| 5 | Matrix tracking 回灌 | ✅ 完成 | `daily_content_2026_09_18` 块（matrix L12095-12139） |
| 6 | 验收 greps + 报告落盘 | ✅ 完成 | §五 / 本文 |

> **未做且不做的项（有据不自作）**：title 数字钩子改造（决策 2 冻结至 9/30）、`minQuantity` 引擎改动（决策 1-B 只做展示层）、P2 meta 文案补齐（v10.1 §二「维持待审」）、新队列 blog（v10.1 §三 + §二「P4/P5 不提前」）、P3-2/P3-3 生成器写入（架构差异，见 §四/§六）。

---

## 二、本 run 改动文件清单（4 文件 + 1 matrix）

| 文件 | 改动 | 性质 |
|------|------|------|
| `src/data/print-method-policy.ts` | **新建**（SSoT：`MOQ_ONELINER` / `MOQ_STANDARD_PARAGRAPH` / `MOQ_AEO` / `MOQ_DISPLAY` / `DIGITAL_LINE_BOOK_SLUGS` / `isDigitalLineBook` / `getDisplayMinOrder`） | 数据层（新增） |
| `src/data/products.ts` | 4 处 `【50本起訂】`→`【1本起訂】`（books 线 SKU） | 数据层（文案） |
| `src/app/[locale]/product/[slug]/page.tsx` | ① import SSoT ② 价格卡「起訂量」走 `getDisplayMinOrder` ③ 新增 AEO 答案块 + 统一说明段（仅 4 SKU 渲染） | 展示层 |
| `src/components/category/CategoryProductCard.tsx` | import SSoT + `moqLine` 对名单 SKU 走 `getDisplayMinOrder` | 展示层 |
| `.hermes/industry-keyword-matrix.json` | 追加 `daily_content_2026_09_18` 块 | 记录 |

**零改动确认**：`minQuantity`（96 SKU 全部原值）、`title*` 字段、`price_range`/`basePrice*`、schema、图片、slug、middleware、blog-data JSON、冻结名单 —— 全部未动。

---

## 三、P1 · MOQ 统一文案落位（K3 v10.1 决策 1 终裁 B）

### 3.1 作用域判定（决策 1-B 条件①）

`products.ts` 含 `【50本起訂】小批量數碼，大量柯式` 共 **9 处**，按 `category` 分两类：

| 行号 | SKU slug | category | 处置 | 依据 |
|---|---|---|---|---|
| 5664 | `catalog-printing` | books | ✅ 改 `【1本起訂】` | 数码线书刊/画册 |
| 5841 | `perfect-bound-books` | books | ✅ 改 `【1本起訂】` | 数码线书刊 |
| 5941 | `hardcover-books` | books | ✅ 改 `【1本起訂】` | 数码线书刊 |
| 6034 | `spiral-notebooks` | books | ✅ 改 `【1本起訂】` | 数码线本册 |
| 4755 | `pvc-menus` | menus | ⛔ 不动 | 非书刊/本册类（条件①「柯式线 MOQ 不动」） |
| 4830 | `laminated-menus` | menus | ⛔ 不动 | 同上 |
| 4926 | `hardcover-menus` | menus | ⛔ 不动 | 同上 |
| 5023 | `drink-menus` | menus | ⛔ 不动 | 同上 |
| 5117 | `disposable-menus` | menus | ⛔ 不动 | 同上 |

grep 验收：`【1本起訂】` = 4 处（L5664/5841/5941/6034）· `【50本起訂】` = 5 处（L4755/4830/4926/5023/5117）— **数量守恒 4+5 = 9 ✅**

> 说明：`catalog-printing` 的 `title_zh` 仍写「50本起」、`minQuantity` 仍 100 —— 前者属**决策 2 冻结的 title 数字钩子**，后者属**报价引擎输入**，二者本 run 依拍板均不动；同一 SKU 多口径一致性由 P3 源头治理 + 后续门童负责（见 §四 impact）。

### 3.2 展示层落位（P1-1，2 个通用位 = K3 拍板原文点名的 PDP / 品类页）

- **PDP**（`product/[slug]/page.tsx` L570）：`{product.minQuantity}` → `{getDisplayMinOrder(locale, product.slug, product.minQuantity)}`
  - 名单内 4 SKU → `MOQ_DISPLAY`：zh-hk「1 本起印（數碼）· 100 本以上柯式更經濟」/ en `From 1 copy (digital) · 100+ cheaper on offset` / ja `1 部から（デジタル）· 100 部以上はオフセットが経済的`
  - **名单外 SKU → 原样返回 `String(minQuantity)`，与改前输出逐字符相同（零 churn）**
- **品类页**（`CategoryProductCard.tsx` L72-80）：`moqLine` 对名单内 SKU 走同一 helper，名单外完全沿用既有三分支（`anchor.sub` / zh-hk / ja / en）

> **执行层拍板（🟢 自主区，理由写明）**：方案 §五 L1-1 原写「落入 PDP / 品类页 / blog 三处通用位」，而 v10.1 决策 1-B 原文只点名 **「PDP/品类页的『起訂量』显示」**。二者取舍时本 run 依 §0.34.2「K3 最新拍板 > 计划文档」取 **K3 原文口径**；理由：向全站 blog 渲染层插入通用块属**未在拍板中出现的面**，且违反「可逆优先 / 最小面」原则，故不做。

### 3.3 AEO 快速答案块（P1-2）

PDP 价格卡下方新增（仅名单内 4 SKU 渲染）：

```
⚡ 最少可以印幾本？ 1 本起印，無最低起訂量。少量走數碼印刷、批量走柯式膠印，100 本以上柯式印刷更經濟，色彩更準確。
起印量與印刷方式：1 本起印，無最低起訂量。少量（自費出版、試產、限量本、樣書）採數碼印刷…100 本以上柯式印刷更經濟、色彩更準確…
```

- **S1 答案块字数断言（v9.3 §S1 强制）**：zh-hk `MOQ_AEO.a` = **43 全角字**（半角 1 / 100 / 標點折算后落 40-60 區間，≤60 硬上限）✅
- 品类页（books）既有 FAQ「書籍印刷最低多少本起？→ 1 本起訂（數碼印刷）。100 本以上柯式印刷更經濟…」保留，无需改（幂等）。

### 3.4 三条红线自查（决策 1-B 条件②③）

- ② 价格数字：**零改动**（`price_range` 全文件未动；月曆 HK$8-25 / BK-002 HK$6-32 两次裁定保持）。
- ③ 合规：新增文案**只陈述我方**，无「vs 竞品 / 500-1000 本 / 比…便宜」类**未证实对比或绝对化表述**（grep 自查：新增 3 条文案 0 命中竞品 MOQ 数字）。
- 引擎：`minQuantity` 零改动 ⇒ 报价引擎 / 购物车 / 价格表**零影响**，可逆。

---

## 四、P3 · CSV 源头治理（决策 ③A）— 定位结果与**架构差异**

### 4.1 finding 1 — 44 处重复缺陷**不在** CSV 源头

- 具名短语全扫（`防水貼紙/防水貼紙` / `公司信封/公司信封` / `畫冊印刷/畫冊印刷` / `騎馬釘小冊子/騎馬釘`）：CSV **0 命中**。
- 通用形态全扫（`\p{Han}{2,}[/／]\p{Han}{2,}`）：CSV 76 行仅 **2 行**命中（L33 `快遞盒/飛機盒`、L71 `啞膜/光膜`），**均非重复前缀**。
- ⇒ 门童 #20 归因到 `sku-seo-data.ts` 的 **44 处** `A/A` 重复，**源頭 CSV 中不存在**。

### 4.2 finding 2 — 派生文件 zh-hk `description` 是批量模板，与 CSV 完全不同

| slug | CSV `SEO描述(ZH)` | `sku-seo-data.ts` `description` |
|---|---|---|
| `waterproof-stickers` | `PVC材質防水貼紙，具有出色的防水、防曬、耐磨性能…` | `防水貼紙/防水貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質…專業團隊、價格透明，企業活動、店舖推廣首選。` |

差异不止 description：同 slug 的 `title`（CSV「防水貼紙 \| 專業印刷 \| 智印港」vs 派生「防水貼紙 \| 防水 PVC 異形切割 \| 智印港」）、`keywords`（CSV 6 个 vs 派生 40 个）、`faqs`（CSV 为正经 FAQ；派生 ja `faqs` 为占位垃圾 `{q:"防水ステッカー", a:"耐久ラベル"}`）**全部不同**。
⇒ 派生文件**并非由当前 CSV 生成**，或被模板批量覆写过；CSV 与派生**已经是两条内容线**。

### 4.3 finding 3 — 生成器是**全量覆盖**，不是 merge（**更正 v1 方案表述**）

`scripts/csv-to-sku-seo.mjs`（126 行全文已读）：
- L75 `const out = {};` → L76-102 仅由 CSV 逐行重建对象 → L125 `fs.writeFileSync(outPath, ts, 'utf-8')` **整文件写出**。
- 只有 1 个写入口，**无读既有 `.ts`、无合并、无 diff、无备份**。
- L107 输出文件头写死「79 个 SKU」（当前派生实为 99 slug）——文件头注释已失真。

### 4.4 finding 4 — CSV 落后派生 ≥7 条目（生成器会**丢** SKU）

- CSV = **75** 行数据；派生 = **99** 个顶层 slug。
- CSV 中 grep **0 命中**但派生存在的 slug（抽样 7 个）：`corrugated-boxes` / `tuck-end-boxes` / `drink-tokens` / `wedding-suite-bundle` / `doujinshi-printing` / `gang-run-card-boxes` / `kraft-paper-packaging-box`。

### 4.5 impact —— 若按 v1 方案原样跑 P3-2/P3-3

| # | 预期后果 | 判定 |
|---|---------|------|
| 1 | 44 处重复**不会减少**（CSV 无此串） | 目标失效 |
| 2 | 派生文件被**降级回旧内容**（ja 描述、keywords 40→6、faqs 变占位模板） | **内容回归**（客户可见） |
| 3 | 派生条目 99 → 75，`getSkuSeo()` 对 ≥7 个 SKU **返回 undefined**（PDP SEO 字段整段丢失） | **功能性损失** |

⇒ **P3-2/P3-3 未执行**（⚪ BLOCKED，属架构前置未决，非时间/ROI 原因）。依据 SOP-10 第 1 款（架构差异必查）+ §0.25.10.5（数据层变更不适用直推）+ 危险写入三件套（§12）。

### 4.6 44 处缺陷候选清单（P3-1 交付物）

- `sku-seo-data.ts` 中以「名稱/…」开头的 `description` 行 = **52 行**（grep 实测）。
- 逐行判读：**45 行**属 `A/A` 精确重复或 ≥3 字严格前缀重复（例：L31 `防水貼紙/防水貼紙` EXACT · L1503 `燙金利是封/利是封` PREFIX · L212 `異形模切貼紙/貼紙印刷` 子串 `貼紙/貼紙` EXACT）；**7 行**非缺陷（L125 `可移貼紙/不殘膠貼紙`、L562 `手挽袋/紙袋`、L866 `厚身單張/傳單印刷`、L951 `環保傳單印刷/環保印刷`、L2184 `戶外橫幅/易拉架`、L2227 `易拉寶/易拉架`、L2350 `網孔布易拉寶/易拉架`）。
- 门童基线记 **44**，本判读 **45**（±1）：差异源于 `DUP_EXACT` **非锚定**子串匹配（`\u4e00-\u9fff{2,12}[/／]\1` 可在长串中间命中）。
- **精确 44 条枚举需 node 跑门童 #20（本 lane 阻塞）**；下一 lane 须给门童加 `--list` 只读导出模式（不写盘）后再出「行号 → 字段 → 现值 → 目标值」正式清单。
- 门童 #20 自带的修法即**机械去重**（「去掉重复的一半，不改措辞」）——四类修复**不得**顺手改措辞（涉文案 = §8 升级）。

### 4.7 下一轮 P3 执行规格（写进 matrix `next_cycle_spec`）

1. 备份 + 三件套（计数断言 / 结果形状断言 / 备份）**齐备才准写盘**；
2. 先跑**只读** diff 脚本，导出 CSV↔派生逐字段差异表（99 slug × 8 字段族）；
3. 由 K3 一句话选方向：**(A 推荐) 以派生为准回填 CSV** 后重生成（保住 9/17-9/18 的 v92/V18 成果，同时让 SOP-5 单向流恢复）；(B) 以 CSV 为准重生成（接受 §4.5 的三项损失）；(C) 改造生成器为 **merge 模式**（读既有 .ts + 仅覆盖目标字段 + `--dry` diff）；
4. 方向定了再对 44 处做机械去重（可并入 3 的脚本）。

---

## 五、验收 greps / 门禁（本 lane 可执行部分）

- [x] **禁词 0（本次新增文本）**：`智印印港` / 外部竞品名 / 双品牌同时出现 —— 本次 4 个改动文件新增文本 **0 命中**（grep 验收）。
- [x] **名片 §0.0**：本次新增文本 0 个名片词；未触展示层/SEO 层，未改 greeting-cards 资产与 middleware 301。
- [x] **数量守恒**：`products.ts` `【1本起訂】`4 + `【50本起訂】`5 = 9（改前 9）。
- [x] **零 churn 断言（展示层）**：`getDisplayMinOrder` 对名单外 SKU 返回 `String(minQuantity)`，与改前 JSX 输出逐字符相同。
- [x] **引用完整性**：`getDisplayMinOrder` 定义 1 处（`print-method-policy.ts` L93）+ 调用 2 处（PDP L570 / CategoryProductCard L73），import 语句均在（grep 验收）。
- [x] **JSON 合法性**：matrix 追加块结构闭合（L12095-12139，文件 12139 行收尾 `}`），与 `daily_content_2026_09_16` 块同构；本次未改 blog-data JSON（门童 #15 面零触及）。
- [x] **S1 答案块字数断言**：zh-hk AEO 答案 43 全角字（40-60，≤60 硬上限）。
- [x] **S2 slug 存在性前置校验**：本 run 未新增/改动任何 slug 引用列表（零链接改动），**无死链挂账**。
- [x] **S3 平台故障上报阈（≥60min 必报）**：本 run 未观测平台级故障（无线上探针，因 pwsh/curl 不可用；未发现文档或仓内证据显示 9/18 存在 CF 503/构建阻塞）。
- [ ] **tsc 54=54**：🔴 **未执行**（pwsh 沙箱阻塞）— 本次改 2 个 `.tsx` / 1 个 `.ts` / 1 个 `.ts` 数据文件，**须由 host 或下一 lane 跑 `npx tsc --noEmit` 确认 54=54**；⚠️ 依 `.hermes/regression-guard/error-patterns.md` 规则 `TSC_ERROR_COUNT_DROP_IS_A_RED_FLAG`：**错误数下降 = 破坏信号**（出现 TS1xxx 即结构破坏），不是改进。
- [ ] **build / verify-deploy / 线上探针**：🔴 **未执行**（pwsh 沙箱阻塞）→ **不虚报 PASS**；本次新增 JSX 仅用既有 Tailwind class（`bg-amber-50` / `border-l-4` / `border-amber-400` / `rounded-r-lg` / `p-4` / `text-amber-900` / `text-amber-800/90`），无新依赖、无布局组件替换。
- [x] **编码**：全部写入经 UTF-8 文本工具（write/edit），无 PowerShell/Node 写入 ⇒ 无 BOM / UTF-16 风险。

---

## 六、更正声明（per §0.23 数据诚信；作用域 = 前序文档表述，非本报告）

- **被更正文档**：`docs/2026-09-18-execution-layer-optimal-plan-v1.md`（commit `0707cc49`，2026-09-18 18:32 +0800）§三 P3-2 备注「（**已确认 merge 模式，读既有 .ts**）」。
- **更正内容**：`scripts/csv-to-sku-seo.mjs`（126 行全文实测）为 **全量覆盖**（L75 `const out = {}` → L125 `writeFileSync` 整文件写出），**无 merge 逻辑**；且只映射 5 字段 + faqs + imageAlt。
- **更正依据**：本 run §4.3 全文读取 + L107 文件头「79 个 SKU」与派生 99 slug 的实测不符 + §4.4 的 7 slug 缺失抽样。
- **影响**：v1 方案 P3-2/P3-3 若照原样执行会产生**内容回归 + ≥7 SKU 覆盖丢失**（§4.5）；本 run 因此**未写入**任何 CSV/派生改动。
- **更正日期**：2026-09-18。
- **未更正项**：v1 方案的 P0/P1 排序与「广度优先 → 深度优先」纠偏结论**成立**，本 run 照此执行；P2「待审」、决策 2「title 冻结」同样成立。

---

## 七、PENDING_K3 / 下游交接

1. **P3 方向裁决（🔴 一句话）**：§4.7 的 (A 推荐：以派生为准回填 CSV / B：以 CSV 为准重生成 / C：生成器改 merge 模式) —— 未决前 P3-2/P3-3 **不得写盘**。
2. **tsc 54=54 复核（host 侧）**：本次 4 文件改动须在 push 前跑 `npx tsc --noEmit`；**下降即回退**。
3. **P1 效果验收窗（v10.1 条件④，9/25）**：报 GSC 书刊簇（catalog / perfect-bound / hardcover / spiral 对应词）CTR/imp 变化 —— 需 9/17 起干净窗数据落盘后才能给数。
4. **GSC STALE 修法（P0，延续挂账）**：最新落盘真值仍为 9/10（8d > 72h 门）；下一 gsc-feedback lane 须拉 9/17+ 全站 7d/28d + 8 T1 词 + 智印港/ジープリント 落盘 `GSC数据/` 并更新 `index.json`。**本报告不含任何新 GSC 数字结论。**
5. **008 询盘 / GA4（⚪ 待 K3）**：`data/inquiry-counter.json` 仍 0 条；GA4 G-248QMCT2S3 已接线待回填（M1 线 3 无法判定）。
6. **前序挂账（`4923ced4` §六，本 run 未接手）**：① 3 篇「已宣告未注册」wedding 文章（title/H1 = slug × 3 locale）待 K3 选 (a) 注册 / (b) 退役 301 / (c) 仅补数据；② en/ja「快速答案块」拿不到 v5.1 琥珀样式（`page.tsx` 正则硬编码中文字面 `快速答案`）。
7. **观察项（非本 run 引入，不计入本次缺陷）**：全站 `src/` 存 52 处 `智印港 ZprintPro` 双品牌串（grep 实测，如 `src/lib/metadata.ts` L72、`src/app/[locale]/contact/page.tsx` L24 等），与 §13.16 v2 单品牌分层口径不符 —— 属**既有基线**（`check-brand-baseline.mjs` 保护），本 run 未新增、未擅自清理（批量文案属禁区）。
8. **push 状态**：本 lane 改动 = SSoT 新文件 + products.ts + PDP + 品类卡 + matrix + 本报告；**git commit/push 由 host-side wrapper 执行**（30 min 保护 + 白名单），CF build 后按 §12「push 后校验」跑 `verify-deploy.mjs`。

---

## 八、决策登记簿 ID 列表（per §J.1.3 强制规则）

- **D-9/18-v101-1**（P1 MOQ 展示层落位）：本 run 落地（4 文件）— 🟢 DONE（验证产物：本报告 §三 + matrix `p1_moq_landing`）
- **D-9/18-v101-3**（门童 #20 专用基线通道 + 存量只许递减）：前序 `6e5179c5` 🟢 DONE；本 run 复核基线 120 / 现存 120 / **新增 0**（未跑 node，计数以 `.hermes/meta-baseline.json` 与 `error-patterns.md` 已录值为据）
- **D-9/18-plan-P3**（CSV 源头治理）：🟡 IN_PROGRESS → 本 run 定位完成、**写入 ⚪ BLOCKED（架构前置未决，见 §四/§七 #1）**
- **D-9/18-plan-P0**（清障）：🟢 DONE（`6e5179c5` + `c4146e7f`）
- **D-9/18-plan-P2**（meta 文案补齐）：🔴 OPEN / 待审（v10.1 §二 维持待审）
- **D-9/18-GSC**（STALE 修法）：🔴 OPEN（9/10 → 9/18 = 8d，见 §七 #4）

---

*Generated by deepseek hermes (DSH lane `daily-content`, v9.4 rearm) · 2026-09-18 · F:\zprintpro-nextjs*
