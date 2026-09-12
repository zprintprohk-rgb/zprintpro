# v93-v18-cleanse 清毒台账（K3 2026-09-12 裁决 C · 留壳清值）

> 批次: `v93-v18-cleanse`（与名片解禁批合并为 1 次 push）
> 手法: 与 §0.22 SOP-10 第 4 款（certNo 撤法）同源 —— **字段 key + 类型定义全保留，只清值** → 不触发 §0 F0「不删长文本字段」

## 一、前提（已独立复核，K2.8 结论成立）

7 个字段族在 `src/` 内**真消费者 = 0**（排除 `products.ts` 及其 `.bak*` 后逐族为 0）：
`seoTitle / seoDescription / aiSearchSummary / knowledgePanelData / relatedEntities / expertReview / authorBio`

PDP 的 title/description 走 **`getSkuSeo(slug)` → `sku-seo-data.csv`（78 SKU）** 优先，fallback 才用
`generateProductMetadata()`（读 `name` / `description`）→ **`sku-seo-data.ts` 才是活字段**，products.ts 的 V18 块是死字段。
⇒ 清值不丢任何已生效资产（幂等已查）。

## 二、执行结果

| 项 | 数值 |
|---|---|
| 清毒行数 | **696 行** = 87 SKU × 8 字段族 |
| 脚本 | `.hermes/v18-cleanse.cjs`（干跑 → `--apply`，写入前断言残留 = 0） |
| 残留终检 | `products.ts` 品牌/指纹命中 **0** |
| 盖戳 | 块头 `// === V18 CLEARED 2026-09-12 … ===` ×87 |
| 门禁 | `node scripts/check-brand-mentions.mjs --strict` → **A 类 0 命中, exit 0** |
| 回归 | `tsc` **54 = 54** 基线持平 |

清空样式（示例 thick-400g L221+）：
```
metaTitle: "",
aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
relatedEntities: {"sameAs": [], "mentions": []},
expertReview: {"reviewer": "", "credentials": "", "review": ""},
authorBio: {"name": "", "role": "", "bio": ""},
```

## 三、本次门禁抓到的**新真问题**（K2.8 未提及，属额外收获）

**`src/components/insights/HKPrintInquiryIndex/OrganizationSchema.tsx` 的 `foundingDate: '2024-Q1'`**
- 该组件被 `src/app/[locale]/insights/hk-print-inquiry-index/page.tsx:12` **import 并线上渲染** → 不是死字段
- 把公司成立日写成 2024 年第一季度，与 K3 8/19 拍板口径「扎根香港超過15年」**直接矛盾**，且是 Google 直读的结构化数据
- 处置：**撤除该行**（值无拍板来源，属 §0.23 无人拍板数字）。若 K3 要保留，请给真实成立年份后重填

## 四、门禁误报修正（避免过宽清扫伤正常内容）

| 命中 | 判定 | 处置 |
|---|---|---|
| `category-seo-content.ts:4583`「Marriage Registry expects **50,000+** registrations」 | 市场数据，非我方声称 | 收窄指纹：bare `50,000+` → `50,000+ brands` |
| `products-content.ts:2764`「35% off at **50,000+**」 | 折扣档位 | 同上 |
| `blog-data/{zh-hk,en,ja}.json` 的 **Tiffany** | 「品牌標準色（可口可樂紅、星巴克綠、**Tiffany 藍**）必須用 Pantone 專色」= 专色行业举例，非供货声称 | **保留**（C 类）；门禁新增跳过注释行逻辑 |

## 五、留待接线时的 TODO（记此不修）

1. **`faqSchema` 本次不动**（无品牌名）——但 `thick-greeting-cards-400g`（现名片 SKU）的 FAQ 答
   "Premium greeting cards typically use **300-350gsm** cardstock" 与该 SKU 的 **400g / 700-810g 三合一** 规格**自相矛盾**，接线或复用前必修
2. `relatedEntities.mentions` 的纸厂名（Mohawk/Neenah/Sappi/Stora Enso/Southworth/LUX Paper）已随批清空；
   若 v92 接线需"素材参照"，**按真实在用纸材重填**，禁再抄第三方品牌串
3. 所有清空字段在 v92 接线时**按真实实体 + K3 拍板口径重填**（届时再写，避免现在写了将来又改 = 幂等）

## 五点五、名片批执行路线（SOP-5 派生数据禁手搓 —— 已实测确认，下一轮直接执行）

**铁律**：PDP 的 title/description 来自 `getSkuSeo(slug)` → `src/data/sku-seo-data.ts`
→ 而该 TS 是 **派生文件**（头部注释：从 `zprintpro-sku-seo-data.csv` 生成，跑 `node scripts/csv-to-sku-seo.mjs` 更新）
⇒ **直改 TS 会被下次重生成覆盖**。正确路线：

1. 改源头 **`zprintpro-sku-seo-data.csv`**（76 行 = 表头 + 75 SKU；19 列）
   - 列序：`SKU, Category, Slug, 产品名ZH/EN/JA, 描述ZH/EN/JA, SEO标题ZH/EN/JA, SEO关键词ZH/EN/JA, SEO描述ZH/EN/JA, Static File Name`
   - 本轮实测样本：**L71 = `premium-greeting-cards`**（现 "高級賀卡印刷 | 燙金・局部UV・啞膜 | ZprintPro"）
   - 待改 2 行：`thick-greeting-cards-400g`、`foil-greeting-cards` → 改写 产品名×3 / SEO标题×3 / SEO关键词×3 / SEO描述×3
2. `node scripts/csv-to-sku-seo.mjs` 重新生成 TS（**禁止手改 TS**）
3. `npx tsc --noEmit`（基线 54）+ `node scripts/check-encoding.js`
4. CSV 含中文与引号字段 → **整行替换前必须逐字段核对引号/逗号**（字段内含逗号会破坏列对齐，风险点）
5. `premium-greeting-cards` 保贺卡（绑死 Rosewood 节日内容，改动面大）；`foil` 由贺卡转名片（燙金名片）
6. 「名片 · 咭片印刷」承接页属**新页面** → 按 §0.25.10.5 不走免预览直推

## 六、批次状态
- ✅ 数据清毒（products.ts 696 行）
- ✅ 门禁新增并挂链：`scripts/check-brand-mentions.mjs --strict`（A 类 > 0 阻断；范围 src/ + public/；豁免 .bak / docs / .hermes / 归档 / GSC 数据）
- ✅ 额外修：OrganizationSchema foundingDate 撤除
- ⏳ 待办：AGENTS.md §8 补「竞品名机审 = check-brand-mentions.mjs」+ §0.23 补「批量生成数据文件 commit 前必过编造 lint」（下一轮，避免中途重载 184KB AGENTS.md 污染上下文）
- ⏳ 待办：名片解禁批剩余（foil 改名 / sku-seo-data.ts（**活字段**）/ lib/seo.ts / 「名片 · 咭片印刷」承接页）+ GSC offers 修复合并为 **1 次 push**

数据来源：本轮实测 —— `.hermes/v18-cleanse.cjs` 干跑与 apply 输出（696 行）、写入后残留断言 0、`check-brand-mentions.mjs --strict` A 类 0、`tsc` 54=54、消费者复核（排除 .bak 后 7 族全 0）、`product/[slug]/page.tsx` L188-208（getSkuSeo 优先链）、品牌门禁 6 处命中的逐条分流。
