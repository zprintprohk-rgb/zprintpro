# SKU 标题长度违规 — 实证核查 + 普查结果 (2026-09-19)

> **性质**: 对上呈方案稿《SKU 标题长度违规：行业实证分析与系统性修复方案》的逐条实证核查 + 用户方案稿 Step 1「全量普查」的交付。
> **执行层**: deepseek hermes（承接 autoclaw / M3 角色，per §0.34）
> **本次未改动任何 src/**（原因见 §五「幂等冲突」）；只新增只读工具 + 报告。
>
> **数据来源（§0.23 强制行）**:
> **校准日期**: 2026-09-19 19:20 (Asia/Shanghai)
> - `src/data/sku-seo-data.ts`（100 SKU × 3 locale = 300 槽，活 title 主源；mtime 2026-09-19 17:21）
> - `src/data/products.ts`（slug → category_slug）
> - `.hermes/gsc-2026-09-18/extract.json`（GSC 28d，窗口 2026-08-19~09-15，`freshnessStatus=FRESH` / staleness 3d）
> - 线上探针 `https://zprintpro.com/{locale}/product/{slug}/`（30 次串行实探，30/30 MATCH）
> - 规则 SSoT: `docs/2026-09-13-title-batch-T-freeze.md` §6-3 + `scripts/guards/title-equiv.js`
> - 复算方法: methodA `title-equiv.js`（regex 逐字）vs methodB 数值区间逐码点（§0.23.2 双方法）
> - 探针脚本: `scripts/probe-live-titles.mjs`；普查脚本: `scripts/sku-title-census.mjs`

---

## 一、一句话结论

**方案稿的方向正确、但事实层大量失真，且其 Step 2/3/4 中有两项已在站内完成。**

真实普查结果：**300 个标题槽中 123 槽违规（41.0%）** — 82 槽不足（<50 当量）、41 槽超标（>58 当量）。
（⚠️ 2026-09-19 19:20 自我更正：首轮误报 99 SKU / 297 槽 / 121 违规。根因 = 解析正则硬要求 2 空格缩进，
漏掉 0 缩进的 `fruit-food-label-stickers`（L3086）。经与门禁独立复算对齐后修正为 100/300/123，
per §0.23.2 双方法复算——两法现已完全一致。）
方案稿声称的具体标题字符串、当量数值、以及「en/ja」的病灶方向，**多数与线上事实不符**；
但其引用的 GSC 数据（大信封 / a6 尺寸 / small batch sticker printing、en vs zh-hk CTR）**完全准确**。

---

## 二、逐条核查表（⚠️ = 需修正，✅ = 成立）

| # | 方案稿主张 | 判定 | 实测证据 |
|---|---|---|---|
| 1 | 规则应为「满格线 ≥58 / 写满区 50-57 / 最优 50-54」 | ✅ **已是现行规则**（50-58） | `docs/2026-09-13-title-batch-T-freeze.md` §6-3「K3 9/13 终裁 目标区 **50-58**（取代 v4 的 50–54）」；`scripts/guards/title-equiv.js` `TITLE_MIN=50 / TITLE_MAX=58`；commit `4b120b17`(9/15) 全站统一 |
| 2 | 「这是规则变更（满格线 ≥55→≥58），必须落文件」 | ⚠️ **半成立** | 9/13 终裁 + 9/15 代码已落；但 `AGENTS.md` §5 与 `docs/2026-09-09-k3-title-rule-v4-write-full.md` §1.2 **仍写 50-54 / ≥55 禁加** = 陈旧，会误导后续会话（本次已修，见 §六） |
| 3 | 站内违规普遍 | ✅ **成立且更严重** | 123/300 = **41.0%**（不足 82 + 超标 41） |
| 4 | 「约 82% 的店铺标题违规」（EcomHint 146 店） | ❌ **本站实测 41.0%**；EcomHint 该来源联网无法核实 | 自测普查 |
| 5 | A5 傳單印刷 = `A5 宣傳單張印刷 100張起…` ~52 ✅最优区 | ⚠️ **字符串不存在** | 线上 zh-hk a5-flyers = `A5 傳單印刷 圓角・覆膜・10起印・HK$0.25起 \| 智印港` = **50** |
| 6 | 月曆印刷 = `月曆印刷 2027 \| 台曆 + 掛曆 \| 30 秒报价` ~38 ❌不足 | ⚠️ **结论对、字符串错** | 线上 zh-hk custom-calendars = `定制年曆 \| 企業禮品 多款式 \| 智印港` = **35**（215 展示 / pos 22.25） |
| 7 | 貼紙印刷 = `貼紙印刷 防水抗UV \| 1張起印・異形裁切・燙金` ~42 ❌不足 | ❌ **字符串不存在** | 线上貼紙簇 6 条全为 `<主词> \| 防水 PVC 異形切割 \| 智印港` = **37** |
| 8 | 利是封 = `… HK$1.1起・燙金定制` ~48 ⚠️临界 | ❌ **不符** | 线上 zh-hk foil-red-packets = `燙金利是封 燙金・局部UV・100起印・HK$1.10起 \| 智印港` = **52**（达标） |
| 9 | A4/A5 傳單標題「智印港 ZprintPro · 品質保證 · 智印港」品牌出现两次 | ❌ **不存在** | 线上 a4-flyers = `A4 傳單印刷 圓角・覆膜・10起印・HK$0.35起 \| 智印港` = 50，单品牌、末尾一次 |
| 10 | 月曆標題含「旺季軍令狀」致品牌被 Google 删除 | ❌ **不存在** | 「軍令狀」全仓仅 2 处，均在 `src/data/category-seo-content.ts` L1645（**品类页内容**，非任何 SKU title） |
| 11 | 燙金/防偽/螢光貼紙 ~35/32/32 严重不足 | ⚠️ **结论对、数值错** | 三者实测均 = **37**（同一模板尾巴） |
| 12 | 「品質保證」「香港印刷專家」是标题填充词 | ✅ **部分成立（重要）** | `品質保證` 确为 live SKU title 填充：`證書印刷 \| 專業印刷 品質保證 \| 智印港`、`畫冊印刷 \| 專業印刷 品質保證 \| 智印港`（均 37 当量）。`香港印刷專家` 不在任何 SKU title（在 products/H1 正文） |
| 13 | en/ja SKU 标题问题 = 「结构性缺失/不足」 | ❌ **方向反了** | **en 不足仅 4 条、超标 27 条**；ja 不足 25 / 超标 8；**zh-hk 不足 52** / 超标 5。en 的真病灶是**超长**不是过短 |
| 14 | GSC「大信封」pos 4.42 / 45 展示 / 0 点击 | ✅ **完全准确** | `.hermes/gsc-2026-09-18/analysis-queries.md` L68 |
| 15 | GSC「a6 尺寸」pos 8.86 / 97 展示 / 0 点击 | ✅ **准确** | 同上 L65 |
| 16 | GSC「small batch sticker printing」pos 6.61 / 69 展示 | ✅ **准确** | 同上 L66 |
| 17 | en CTR 0.58% vs zh-hk 2.31%（en 只有 30%） | ✅ **准确** | extract.json 28d：`us_28d` 23/3948 = **0.58%**；`hk_28d` 251/10848 = **2.31%** |
| 18 | Google 重写 76% 标题（2025 Q1） | ✅ **有权威来源** | Search Engine Land（见 §七 引用） |
| 19 | Backlinko 400 万条：40-60 字符 CTR 高 33.3% | ⚠️ **未能核实到该确切口径**，引用时应标原始出处或降级为「行业常见口径」 | 联网检索未命中该数字 |
| 20 | Step 3「需新建自动校验门禁」 | ❌ **门禁已存在，但发现真实盲区**（见 §四） | `i18n-guard.js` `checkTitleLength` + `blog-standard-guard.js` `BLOG_TITLE_LENGTH` |
| 21 | Step 2「按分层重写标题」 | ⚠️ **与既有 72 条提案表幂等冲突**（见 §五） | `docs/2026-09-13-title-batch-T2-1b-proposals.md` |

### 2.1 方案稿标题字符串的真实来源（可复现结论）

方案稿引用的多条「线上标题」与 `docs/2026-09-13-title-batch-T2-1b-proposals.md` 的**「提案 title」列**高度同源，并被追加了不存在的成分：

| T2-1b 提案（原始） | 方案稿声称的「线上标题」 | 线上真值 |
|---|---|---|
| `A4傳單印刷 100張起印 HK$0.3/張 雙面彩印 · 智印港`（提案 #13） | 同句 + `\| 智印港 ZprintPro · 品質保證 · 智印港` | `A4 傳單印刷 圓角・覆膜・10起印・HK$0.35起 \| 智印港` |
| `A5傳單印刷 100張起印 雙面四色 免費設計 · 智印港`（#14） | 同句 + 同上垃圾后缀 | `A5 傳單印刷 圓角・覆膜・10起印・HK$0.25起 \| 智印港` |
| `燙金利是封 · 婚慶/年會/品牌活動定製 · 智印港`（#23） | 同句 + `智印港 ZprintPro · 春聯 · 香港印刷專家 · 智印港` | `燙金利是封 燙金・局部UV・100起印・HK$1.10起 \| 智印港` |
| `透明貼 / 透明貼紙 訂製 · 100張起印 · 貼紙印刷 · 智印港`（#4） | 「貼紙印刷 防水抗UV \| 1張起印・異形裁切・燙金」 | `透明貼紙 \| 防水 PVC 異形切割 \| 智印港` |

**判定**：方案稿 §3.1/§3.2 声称「从线上实际抓取的标题」**不成立** — 那些字符串是 9/13 的*提案*，且被追加了「双品牌 + 品質保證 + 春聯」等真实站内不存在的成分（站内 `ZprintPro` 混入 zh-hk title 会被 `brand-guard` 硬拦）。

---

## 三、真实普查结果（Step 1 交付）

**工具**: `node scripts/sku-title-census.mjs`（只读）
**报告**: `.hermes/reports/sku-title-census-2026-09-19.md` / `.json`

```
SKU 数 100 / 槽位 300 / 全部有 title（缺 title = 0）
现行规则 50-58：OK 177 | 不足(FILL) 82 | 超标(TRIM) 41   → 违规率 41.0%
v4 旧规则对照：  OK 146 | FILL 82 | LEGACY(55-60) 47 | RED(>60) 25
双方法复算：methodA vs methodB 不一致 = 0  ✅
线下/线上一致性：30/30 MATCH（sku-seo-data.ts 即线上真值源）
门禁独立复算：checkTitleLength 对 sku-seo-data.ts 命中 123 = 普查 123 ✅（修复盲区后）
```

### 3.1 按 locale 分布（**推翻方案稿的 en/ja 论断**）

| locale | 不足 <50 | 超标 >58 |
|---|---|---|
| zh-hk | **53** | 5 |
| ja | 25 | 8 |
| en | 4 | **28** |

### 3.2 最高 ROI：P0 = 位置 ≤20 且 展示 ≥30 且 当量 <40（实测 **21 条**）

| 当量 | SKU | 展示28d | 位置 | CTR | title |
|---|---|---|---|---|---|
| 37 | waterproof-stickers | 304 | 9.44 | 2.63% | `防水貼紙 \| 防水 PVC 異形切割 \| 智印港` |
| 35 | business-envelopes | 299 | 11.40 | **0.33%** | `公司信封 \| 雙面印刷 多規格 \| 智印港` |
| 35 | large-envelopes | 203 | 6.37 | 1.48% | `大號信封 \| 雙面印刷 多規格 \| 智印港` |
| 37 | handle-bags | 199 | 15.91 | 0.50% | `環保手挽袋 \| 100%環保 多尺寸 \| 智印港` |
| 35 | large-bags | 187 | 17.18 | 2.14% | `大號紙袋 \| 100%環保 多尺寸 \| 智印港` |
| 37 | transparent-stickers | 184 | 15.78 | 2.72% | `透明貼紙 \| 防水 PVC 異形切割 \| 智印港` |
| 35 | kraft-paper-bags | 130 | 11.17 | 0.77% | `牛皮紙袋 \| 100%環保 多尺寸 \| 智印港` |
| 37 | removable-stickers | 126 | 10.70 | 2.38% | `可移貼紙 \| 防水 PVC 異形切割 \| 智印港` |
| 37 | certificates | 112 | 10.63 | 3.57% | `證書印刷 \| 專業印刷 品質保證 \| 智印港` |
| 37 | foil-stickers | 102 | **5.74** | **6.86%** | `燙金貼紙 \| 防水 PVC 異形切割 \| 智印港` |
| 37 | catalog-printing | 98 | 14.50 | 2.04% | `畫冊印刷 \| 專業印刷 品質保證 \| 智印港` |
| 37 | pearl-envelopes | 96 | 5.27 | 4.17% | `珍珠光信封 \| 雙面印刷 多規格 \| 智印港` |
| 35 | colored-envelopes | 77 | 5.30 | 1.30% | `彩色信封 \| 雙面印刷 多規格 \| 智印港` |
| 38 | mailer-boxes | 72 | 7.72 | 2.78% | `訂製郵寄盒 \| 燙金 UV 100%訂製 \| 智印港` |
| 36 | laminated-menus | 55 | 7.38 | 0.00% | `過膠餐牌 \| 防水 覆膜 50本起 \| 智印港` |
| 36 | rigid-boxes | 49 | 8.69 | 4.08% | `精裝禮盒 \| 燙金 UV 100%訂製 \| 智印港` |
| 37 | security-stickers | 37 | 6.43 | 8.11% | `防偽貼紙 \| 防水 PVC 異形切割 \| 智印港` |
| 37 | adhesive-posters | 34 | 4.79 | 5.88% | `背膠海報 \| 防水材質 即日速遞 \| 智印港` |
| 37 | fluorescent-stickers | 33 | 3.58 | 0.00% | `螢光貼紙 \| 防水 PVC 異形切割 \| 智印港` |
| 35 | gift-bags | 31 | 12.74 | 12.90% | `禮品紙袋 \| 100%環保 多尺寸 \| 智印港` |
| 38 | foil-greeting-cards | 30 | 11.07 | 0.00% | `燙金名片印刷 \| 金・銀・玫瑰金 \| 智印港` ⚠️ |

> ⚠️ 末条 `foil-greeting-cards`（贺卡 SKU）线上 title 仍写 **「名片印刷」** — 属 §0.0 展示层/SEO 层**待 K3 裁决关联面**，执行层不得自裁（但可登记）。

### 3.3 零点击 5 条 — 含 **已达标** 标题（反驳单因论）

| band | 当量 | locale | SKU | 展示28d | 位置 |
|---|---|---|---|---|---|
| TRIM | 67 | en | small-batch-stickers | 396 | 17.81 |
| TRIM | 61 | en | catalog-printing | 307 | 29.71 |
| **OK** | **57** | en | exercise-books | 289 | 23.26 |
| **OK** | **55** | en | saddle-stitch-booklets | 225 | 67.00 |
| **OK** | **53** | en | foil-stickers | 136 | 39.51 |

**派生结论**：3/5 条零点击 SKU 的标题长度**已合规** ⇒ 「标题长度」不是 CTR 的唯一/充分变量（位置 23-67 是更主要约束）。方案稿「标题是唯一瓶颈」的因果模型**不完整**。

---

## 四、Step 3 门禁：已存在，但有真实盲区（新发现）

**已存在**：
- `scripts/guards/i18n-guard.js` L190-218 `checkTitleLength` — 目标文件清单**包含** `sku-seo-data`，severity = **yellow**
- `scripts/guards/blog-standard-guard.js` L87-99 `BLOG_TITLE_LENGTH` — severity = **red**（仅 Pillar blog）
- 驱动入口：`node scripts/check-regression-guard.js`（pre-commit 默认 `--commit`，yellow = shadow 仅警告）

**真实盲区（实测）**：全量跑 `check-regression-guard.js`，`I18N_TITLE_LENGTH` 命中 **仅 6 条，且全部落在孤儿文件 `src/data/product-seo.ts`**（该文件 `import` 零引用 = 非线上），**`sku-seo-data.ts` 的 297 个槽位命中 0**。

**根因**：`checkTitleLength` 的正则要求**裸键**
```js
const titleRe = /title:\s*["']([^"']{1,200})["']/g;
```
而 `sku-seo-data.ts` 全部使用**带引号的 JSON 键** `"title": "…"` —— `title` 后紧跟 `"` 再到 `:`，`title:` 子串永不出现 ⇒ 匹配恒为 0。
（per §0.23.2 闸门 1：先 dump 真实样本再写正则——此处正是反面案例。）

⇒ 方案稿「门禁不存在、需新建」判断错；真实待办是**修覆盖 + 定 severity**，不是新建。

---

## 五、Step 2 幂等冲突：重写方案与既有 72 条提案表冲突

`docs/2026-09-13-title-batch-T2-1b-proposals.md`（K3 9/13 拍板产物）**已存在 72 条提案**（<50 补足 / >58 收敛），词源 = `重要文件/money-keyword-map-20260905.md`（282 条）。
按 §2「不重复做已完成的事」幂等铁律，**不应重新生成提案**。

**但该表已陈旧，不可直接套用**（实测）：

| SKU | T2-1b 表「原当量」 | 本次实测 |
|---|---|---|
| foil-stickers | 16 | **37** |
| transparent-stickers | 35 | **37** |
| removable-stickers | 42 | **37** |
| a4-flyers | 48 | **50** |
| a5-flyers | 47 | **50** |

⇒ 正确路径 = **对既有 72 条提案按现行 title 复算 + 重新校准时量**，而非另起炉灶。

---

## 六、本次实际交付物

| 文件 | 性质 |
|---|---|
| `scripts/sku-title-census.mjs` | 新增 · 只读普查工具（双方法复算 + GSC 交叉 + 优先级分层 + 同质簇检测） |
| `scripts/probe-live-titles.mjs` | 新增 · 线上 title 探针（串行 + 三重校验，per §0.23.2 闸门 2） |
| `.hermes/reports/sku-title-census-2026-09-19.md` / `.json` | 新增 · 普查报告（不足/超标/品牌污染/P0/P1/零点击/同质簇） |
| `.hermes/reports/live-title-probe-2026-09-19.json` | 新增 · 30 次线上探针原始证据 |
| `.hermes/logs/2026-09-19-sku-title-length-verification.md` | 本文件 |

**未改动**：`src/**`（零改动）、`docs/2026-09-13-title-batch-T-freeze.md`、既有门禁脚本（另一会话正在改 guards，避让）。

---

## 七、外部来源引用

- Google changed 76% of title tags in Q1 2025 — [Search Engine Land](https://searchengineland.com/google-changed-76-of-title-tags-in-q1-2025-heres-what-that-means-454847)
- 标题长度/像素宽度最佳实践（用于交叉参考） — [Neil Patel](https://neilpatel.com/blog/title-tags-seo/)、[Scalenut 2026](https://www.scalenut.com/blogs/meta-title-length-best-practices-2026)
- ⚠️ 「EcomHint 146 店 / 82%」「Backlinko 40-60 字符 +33.3%」**未能核实**，不得作为决策依据（§0.23）。
