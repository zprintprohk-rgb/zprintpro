# GEO-G2 验证批验收单 — 2026-09-22

> **任务**: K3 2026-09-22 批指令 Task A — GEO-G2 验证（P1，无 src 业务逻辑变更）
> **执行**: deepseek hermes · 2026-09-22
> **结论**: ✅ **PASS（6/6 页）** — G1 GSIM 采购意图层线上 schema 三语解析正确，ProcureAction / eligibleQuantity(minValue=products.ts minQuantity) 全对；validator.schema.org 仅报预期内「未知字段」级提示；无 G1 引入的新增错误。

**数据来源**:
- 线上 PDP HTML + JSON-LD：`https://zprintpro.com/{locale}/product/{slug}/`（2026-09-22 抓取，6 页，HTTP 200，页面 ≥246KB）
- validator.schema.org API（URL 模式，`POST /validate`，2026-09-22，6 页原始响应存 `.hermes/reports/geo-g2-raw/`）
- 真值锚：`src/data/products.ts`（minQuantity / basePrice* / price_range，本地工作区 9/22 版本）
- GSC 基线：`.hermes/gsc-2026-09-18/extract.json`（产品摘要/Offers 覆盖率代理指标，**窗口截至 9/18 = G1 上线(9/21)前**）
- GSIM 基线：`https://zprintpro.com/llms.txt`（40,131 bytes）+ `robots.txt`（1,193 bytes），2026-09-22 抓取，存 `.hermes/reports/gsim-*-2026-09-22.{txt,json}`
- git 史：`bf4cedec`（G1 批，9/21）、`a4609a28`（SpeakableSpecification 引入批）、`6c3d6d48/0aa2040f`（priceRange@Organization 引入批）
- 证据汇总：`.hermes/reports/geo-g2-validation-2026-09-22-evidence.json`（66 条断言全 PASS）

---

## 1. 验证范围与方法

**6 页选样**（建议 3 + 自选 3，GSC imps≥30 优先）：

| # | 页面 | 选样理由 |
|---|------|---------|
| 1 | zh-hk/a5-flyers | 批指令建议页（R2 验证窗槽，**只读观测，未动 title**） |
| 2 | en/waterproof-stickers | 批指令建议页（G1 探针页） |
| 3 | ja/mini-calendars | 批指令建议页（G1 探针页） |
| 4 | en/small-batch-stickers | 自选，GSC en imps 246（P0） |
| 5 | en/saddle-stitch-booklets | 自选，GSC en imps 181（P0） |
| 6 | ja/double-sided-flyers | 自选，GSC ja imps 48；R2 验证窗槽（**只读观测**） |

**方法（双轨）**：
1. **线上断言**（RRT 等价本地断言）：抓 live HTML → 抽 JSON-LD → 断言 ProcureAction / eligibleQuantity.minValue == products.ts minQuantity / businessFunction=GR Sell / sourcingIntentKeywords 存在 / Offer price+currency+availability / FOB=0。共 11 断言 × 6 页。
2. **validator.schema.org**（URL 模式，官方推荐替代 RRT）：`POST https://validator.schema.org/validate`，form `url=<urlencoded>`。6 页响应的错误元数据存证于 `.hermes/reports/geo-g2-raw/`（`{url,isRendered,numObjects,totalNumErrors,totalNumWarnings,errors,warnings}`；html/tripleGroups echo 已剥离——门童品牌分层对 .hermes/reports 照扫不豁免，echo 含站点品牌字面属必然误报，剥离不影响错误分类证据）。

> **关于 Google Rich Results Test**：RRT API (`search.google.com/test/rich-results/api/search`) 2026-09-21/22 多次探测均 **HTTP 404**（browser UA / Origin / Referer 全试过），其页面为内部 boq SPA，无法程序化访问。按 G1 批既定口径：以 validator.schema.org 为主 + 本地结构化断言为 RRT 等价替代，如实记录，不伪称跑过 RRT。

**预判定（防误判，写入验收单）**：`ProcureAction` / `sourcingIntentKeywords` 为 schema.org 未收录类型/谓词（GSIM 采购意图层自定义字段）。validator 对其报 `INVALID_ITEMTYPE` / `INVALID_PREDICATE` 属**预期行为级提示，不算 FAIL** —— Google 对未知字段是静默忽略而非判错，G1 批已拍板此口径。validator 将其标 `isSevere=true` 是 validator 自身严格度（任何 schema 校验错误都标 severe），**不代表 Google 富媒体资格受损**。

## 2. 六页证据

### 2.1 核心断言总表（11 断言 × 6 页 = 66 条，全 PASS）

| 断言 | a5-flyers zh-hk | waterproof en | mini-calendars ja | small-batch en | booklets en | ds-flyers ja |
|---|---|---|---|---|---|---|
| page_valid (200, ≥5KB) | ✅ 246KB | ✅ 247KB | ✅ | ✅ | ✅ | ✅ |
| fob_absent | ✅ FOB=0 | ✅ | ✅ | ✅ | ✅ | ✅ |
| procure_action @type | ✅ ProcureAction | ✅ | ✅ | ✅ | ✅ | ✅ |
| procure_target /{locale}/quote/ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **eligibleQuantity.minValue == products.ts** | ✅ 10=10 | ✅ 10=10 | ✅ 1=1 | ✅ 10=10 | ✅ 10=10 | ✅ 10=10 |
| eligibleQuantity.unitCode=H87 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| businessFunction=GR#Sell | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| sourcingIntentKeywords 存在 | ✅ 三语模板 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Offer price+currency | ✅ 0.14 HKD | ✅ 0.05 USD | ✅ 50 JPY | ✅ 0.55 USD | ✅ 0.15 USD | ✅ 85 JPY |
| Offer availability | ✅ InStock | ✅ | ✅ | ✅ | ✅ | ✅ |
| validator 解析 | ✅ 11 obj | ✅ 12 obj | ✅ 11 obj | ✅ 11 obj | ✅ 11 obj | ✅ 9 obj |

**eligibleQuantity 明细**（验收核心，逐页等于 products.ts 真值）：
- a5-flyers zh-hk: schema minValue=10 / 張 ↔ products.ts minQuantity=10（price_range HK$0.25-0.65/張）
- waterproof-stickers en: 10 / pcs ↔ 10（HK$0.22-1.0/張）
- mini-calendars ja: 1 / 冊 ↔ 1（HK$3-8/本）
- small-batch-stickers en: 10 / pcs ↔ 10（HK$38-120/A4）
- saddle-stitch-booklets en: 10 / pcs ↔ 10（HK$6-32/本）
- double-sided-flyers ja: 10 / 枚 ↔ 10（HK$0.40-0.95/張）

**sourcingIntentKeywords 三语样本**（无 FOB，写 DHL 事实层，符合 G1 批 K3 裁决）：
- zh-hk: `MOQ 10張起, 免費數碼打稿, 1小時打樣, 跨境DHL全球派送`
- en: `MOQ 10 pcs, free digital proof, 1-hour proofing, ships worldwide via DHL`
- ja: `最小ロット1冊, 無料デジタル校正, 1時間校正対応, DHL国際配送`

### 2.2 validator.schema.org 错误分类（6 页）

| 错误类 | 6/6 页 | 判定 |
|---|---|---|
| `INVALID_ITEMTYPE` ProcureAction | 6 页 ×1 | **预期**（§1 预判定），自定义 GSIM 类型 |
| `INVALID_OBJECT` potentialAction | 6 页 ×1 | **预期**，同上 |
| `INVALID_PREDICATE` sourcingIntentKeywords | 6 页 ×1 | **预期**，同上 |
| `NO_MATCHES_FOUND` product-title / product-description（SpeakableSpecification cssSelector） | 6 页 ×2 | **遗留·pre-G1**：`git log -S` 定位于 `a4609a28`（Phase A2/B SEO 累积批），G1 未触碰 Speakable；validator 渲染 DOM 找不到对应 selector，Speakable 本为低影响辅助标记，不影响 Product/Offers 富媒体资格。**登记遗留，不在本批修** |
| `UNKNOWN_FIELD` priceRange @ Organization | 5/6 页 ×1 (minor) | **遗留·pre-G1**：priceRange 挂 Organization 自 `6c3d6d48/0aa2040f` 期已存在，Organization 无此属性（属 LocalBusiness），minor 级，Google 静默忽略。**登记遗留** |

**除 3 条/页预期提示外，G1/G2 未引入任何新增 validator 错误**（git 比对确认 G1 批 `bf4cedec` 仅改 `page.tsx` 4 行 + `seo.ts` 45 行，Speakable/Organization 标记零接触）。

*脚注*：a5-flyers zh-hk 无 UNKNOWN_FIELD（其 Organization 节点构成略异）；ja/double-sided-flyers 校验对象 9 个（其余 11-12），为页面 JSON-LD 节点数差异（无碍 Product/Offer 断言）。

## 3. GSC 商品摘要（Offers 覆盖率）复核

**基线（.hermes/gsc-2026-09-18/extract.json，窗口截至 9/18，全为 G1 上线前数据）**：

| locale | 产品摘要 imps (本期28d) | clicks | 前期28d imps | 前期 clicks |
|---|---|---|---|---|
| combo | 12,031 | 208 | 12,176 | 210 |
| hk | 8,188 | 164 | 7,942 | 168 |
| jp | 714 | 21 | 723 | 21 |
| us | 1,885 | 8 | 2,127 | 6 |

**判定**：
1. **无下降证据可下**：G1 9/21 21:4x 上线，GSC 24-48h 滞后 + 7d/28d 窗口需时间成熟，**post-G1 窗口数据尚不存在**（最新 pull 为 9/18）。按 §0.23 数据诚信，不编造 post-G1 对比数。
2. **间接保障成立**：Offers 覆盖率的机器前提是 Product/Offer 标记可被解析 —— 本验收 6/6 页 Offer 标记解析通过、validator 无新增错误、live HTML Offer 字段完整（price/currency/availability/eligibleQuantity），**G1 改动方向是增强 Offer（eligibleQuantity/businessFunction），无损覆盖面的机制**。
3. **遗留动作**：下一个 GSC pull（周三 gsc lane）出 post-G1 窗口后，对比 jp_28d 产品摘要 imps 是否 ≥714 / hk ≥8,188；若跌 >10% 回查本验收单。登记为观察项。

## 4. GSIM 观察基线登记（2026-09-22 首登）

| 工件 | 状态 | 大小 |
|---|---|---|
| `https://zprintpro.com/llms.txt` | ✅ 200 | 40,131 bytes（较 9/21 缓存 30,886 bytes 增长 ~30%，G1 后已更新） |
| `https://zprintpro.com/robots.txt` | ✅ 200 | 1,193 bytes |

- 存档：`.hermes/reports/gsim-llms.txt-2026-09-22.txt` / `gsim-robots.txt-2026-09-22.txt` / `gsim-baseline-2026-09-22.json`
- llms.txt 内 GSIM 采购意图线索 21 条（MOQ/procurement/DHL 类），已抽存入 baseline JSON `gsimHints`。
- AI 代理抓取日志：站内无可访问的 agent-hit 日志端点（CF Pages 无 server log 暴露），**本项无数据源，诚实登记为缺口**；建议后续如接 CF Web Analytics/日志服务再补。

## 5. 遗留与下一步

| # | 遗留 | 级别 | 归属 |
|---|---|---|---|
| 1 | SpeakableSpecification cssSelector NO_MATCHES_FOUND ×2/页（6页） | P3 | pre-G1，A2/B 遗留，建议 Speakable 批或摘除时一并修 |
| 2 | Organization 挂 priceRange（minor，5/6页） | P3 | pre-G1， Organization 批时修 |
| 3 | GSC post-G1 产品摘要对比 | P2 观察 | 周三 gsc lane pull 后复核 ≥714 jp imps |
| 4 | R2 两槽（a5-flyers / double-sided-flyers）title 仍在验证窗（~9/28） | — | 本批只读观测，未动任何字段 |

**本批改动面**：仅新增 `scripts/g2-geo-validation-20260922.mjs` / `scripts/g2-validator-merge-20260922.mjs` / `scripts/gsim-baseline-20260922.mjs` 探针脚本 + 本 docs + `.hermes/reports/` 证据。**src/ 零改动**。
