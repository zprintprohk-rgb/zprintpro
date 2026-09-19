# en 值内中文残留 — 分档清单 v2 (双方法复算对齐版)

> **本文件取代作废版** `.hermes/logs/i18n-en-cjk-classification-2026-09-19.md` (方法 1 = 按 CSV 行文本正则分档, 已判定作废)。
> 生成时间: 2026-09-19 · 生成者: 执行层 · 性质: **纯只读盘点**, 未修改任何 `src/` 生产文件

## 〇、数据来源

| 项 | 来源 |
|---|---|
| en 值判据 (唯一权威) | `scripts/guards/common.js` `resolveLocale()` + `scripts/guards/i18n-guard.js` `scanBidirectional()` 结构化值作用域 |
| 门童基线 | `.hermes/i18n-pollution-baseline.json` (`perRule.I18N_POLLUTION_EN` = 1032, `total` = 1320) |
| 方法 A 脚本 | `.hermes/_probe-pb/methodA-en-cjk-classify.cjs` → `_methodA-result.json` |
| 方法 B 脚本 | `.hermes/_probe-pb/methodB-en-cjk-classify.cjs` → `_methodB-result.json` |
| 对账脚本 | `.hermes/_probe-pb/en-cjk-align.cjs` |
| 逐笔机读 | `.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.csv` |
| 口径冲突量化 | `.hermes/_probe-pb/_diag-conflict.txt` · `.hermes/_probe-pb/_diag-authority8.txt` |

---

## 一、口径声明

### 1.1 en 值判据 (K3 拍板, 不新造第二套)

「哪些字符属于 en 语系值」以 **`common.resolveLocale(content, index, file)`** 为唯一权威。
但实测发现该函数与门童基线所用的**结构化值作用域**在这 8 档上**并不等价**, 二者关系必须显式声明:

| 判据 | 全 src/ en 中文字符数 | 8 档内 | 说明 |
|---|---|---|---|
| 门童结构化值作用域 (`attrLocale`) | **1032** | 1032 | = 基线 `perRule.I18N_POLLUTION_EN` 的来源 |
| `resolveLocale` (最近左侧 locale 键) | 3702 | 1235 | 多出 2670 / 8 档内多 203 |

**8 档内的 203 字差额全部是 `resolveLocale` 的假阳性, 零例外**, 三类 (逐行已核):

| # | 档 | 行注释/块注释内 | 字符数 | 根因 | 实证行 |
|---|---|---|---|---|---|
| 1 | `src/data/category-seo-content.ts` | **行注释 `//`** (8 行) | 120 | 命中落在 `//` 注释体内, 门童只扫字符串字面量 | L809 / L1534 / L2149 / L2150 / L2151 / L2155 / L3171 / L3172 |
| 2 | `src/components/layout/Footer.tsx` | **JSX 块注释 `{/* … */}`** (4 行) | 71 | 同上 —— L478 起为 `{/* 2026-06-18 Phase 0: Legal disclosure …` 块注释 | L451 / L479 / L480 / L481 |
| 3 | `src/data/blog-posts.ts` | **行注释 `//`** (1 行) | 12 | 同上 —— L532 注释写 `// en: 全球通用 + 強調"6 盒型對比…"` | L532 |

> ⇒ 本清单**以门童结构化值作用域为记账口径** (与基线 1032 同源), 同时把 `resolveLocale` 的 203 字假阳性
> **逐条列在 §六**, 不静默丢弃、不悄悄并入任何档。

### 1.2 分档定义 (互斥, 6 档, 不自创第 7 档)

按**命中字符所处的「字段」**归档 (不是按内容特征归档):

| 档 | 定义 | 实现 (字段名 → 档) |
|---|---|---|
| `category` | category / categoryKey 等分类字段值 | `category`,`categoryKey`,`categoryName`,`categories`,`categoryLabel`,`categorySlug` |
| `title` | title/seoTitle/metaTitle 类字段值 | + `h1`,`h2`,`h3`,`heading`,`bannerTitle`,`productName`,`cardTitle`,`onlineTitle`,`howTitle`,`faqTitle`,`ctaTitle`,`heroTitle`,`pageTitle` |
| `description` | description/metaDescription/excerpt 类字段值 | + `desc`,`summary`,`subtitle`,`bannerSubtitle`,`onlineDesc`,`ctaDesc`,`shortDescription`,`longDescription`,`intro` |
| `content` | content / 正文类字段值 | + `body`,`html`,`text`,`paragraphs`,`points`,`bullets`,`features`,`scenarios`,`material`,`specs`,`faq`,`q`,`a`,`note`,`tips`,`steps`,`benefits`,`highlights` |
| `JSON-LD` | 落在内嵌 JSON-LD (`application/ld+json` / `"@type"` / `@context`) 字符串内 | 优先级最高; 命中则**不再**计入其外壳字段, 以保互斥 |
| `其他` | 上述之外的 en 值内 | 未命中上表的一切键名, **逐条列名** (§四) |

**取消「FAQ 残留」作为字符档** —— 改为 `content` 档每条命中上挂布尔子标记 `rendersChineseFAQ` (§五)。
**另设独立「白名单候选」标记** (不占档位, 可跨档) —— §七。

### 1.3 `rendersChineseFAQ` 的严格定义 (为什么不能沿用旧判据)

= **命中的 CJK 字符落在 FAQ 结构体内**, 而非同值内的正文段落。两条证据任一成立即为 true:

- 证据 A: HTML 问答块 `<strong>Q…：` (或 `<h3>Q…：`) 起至下一个 Q / `</div>` / `<h2` 的整块内含 CJK;
- 证据 B: `FAQPage` JSON-LD 的 `"name"` / `"text"` (即 Question / Answer 文本) 内含 CJK。

> ⚠️ 旧版把「值里出现 FAQ 字样」(如正文写 `4 FAQs`) 当成「FAQ 里有中文」。实测: 按该宽松判据, `en.json` 有 **40 个 content 值**会被判 true;
> 按本版严格判据只有 **9 个** (其中 7 个落在 `content` 档, 1 个落在 `JSON-LD` 档 —— 见 §五)。这正是作废版 C 档 7 笔被推翻的同类错误。

---

## 二、双方法实现

| 项 | 方法 A | 方法 B |
|---|---|---|
| 思路 | 单字符扫描 → 反查字段 (位置算术) | 结构化解析 → en 值对象 → 遍历字段 |
| JSON | 自实现「词法段 + 容器配平」定位器, **不 JSON.parse** | `JSON.parse` 后逐字段走访 + 键序列原文定位 |
| TS/TSX | 键名起点表 + 值区间表, 取最内层字符串字段 | 自实现前向键扫描 → locale 值区间 → keyed 字符串/数组元素 |
| CJK 判定 | 逐字符 `resolveLocale` ∪ 门童作用域 | 只在 en 值区间内计 CJK 字符 |
| 数组裸元素 | 回溯最近具名外层键, 单独标记 | 归属其列表键 |
| 别名键 | 覆盖 (`beneficiaryCn` / `supportJA` 均按真实语系归属) | 覆盖 (同) |
| 共享 | 仅共享「档位定义 + 字段名映射 + 白名单 + FAQ 判据」, **代码路径完全独立** | 同 |

---

## 三、对账结果

### 3.1 逐文件字符数 (判据 ①)

| # | 文件 | 方法 A | 方法 B | 一致? |
|---|---|---|---|---|
| 1 | `src/data/blog-data/en.json` | 912 | 912 | ✅ |
| 2 | `src/data/category-seo-content.ts` | 12 | 12 | ✅ |
| 3 | `src/data/buying-guides.ts` | 38 | 38 | ✅ |
| 4 | `src/data/sku-seo-data.ts` | 28 | 28 | ✅ |
| 5 | `src/app/[locale]/payment-methods/page.tsx` | 16 | 16 | ✅ |
| 6 | `src/components/layout/Footer.tsx` | 12 | 12 | ✅ |
| 7 | `src/app/[locale]/category/[slug]/page.tsx` | 10 | 10 | ✅ |
| 8 | `src/data/blog-posts.ts` | 4 | 4 | ✅ |
| | **合计** | **1032** | **1032** | ✅ 完全一致 |

### 3.2 档位汇总 (判据 ②)

| 档 | 方法 A 字符 | 方法 B 字符 | 一致? | A 条目数 | B 条目数 |
|---|---|---|---|---|---|
| `category` | 33 | 33 | ✅ | 9 | 9 |
| `title` | 10 | 10 | ✅ | 2 | 2 |
| `description` | 67 | 67 | ✅ | 12 | 12 |
| `content` | 697 | 697 | ✅ | 37 | 41 |
| `JSON-LD` | 138 | 138 | ✅ | 5 | 5 |
| `其他` | 87 | 87 | ✅ | 8 | 10 |
| **合计** | **1032** | **1032** | ✅ 完全一致 | 73 | 79 |

> 「条目数」两法在 `content` / `其他` 档有差 (37 vs 41, 8 vs 10): 因**数组元素的记账方式不同** ——
> 方法 A 对数组裸元素单列 (不计入具名条目), 方法 B 将其归入列表键 ⇒ 后者条目更多。
> **字符数完全一致**, 差异仅在「条目怎么记」; 数组元素全量见 §八。

### 3.3 条目 (file:line) 集合 (判据 ③)

| 项 | 值 |
|---|---|
| 记账口径 | 只对**具名字段的值**记条目 (A 排除数组裸元素, B 排除数组元素) —— 两法数组表达方式不同, 已在 §八 单列 |
| 方法 A 条目数 | 73 |
| 方法 B 条目数 | 73 |
| 交集 | 73 |
| A 独有 | 0 |
| B 独有 | 0 |

✅ 两法条目集合**完全一致**。

### 3.4 对账结论

**一致** —— ①逐文件字符数 ②档位计数 ③条目集合 三层判据全部一致, 无需列差异。

---

## 四、各档明细 (file:line + 字段 + 原文节录)

### `category` — 33 字符 / 9 条目

| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |
|---|---|---|---|---|---|---|
| 1 | `src/data/blog-data/en.json:125` | category | 4 | 餐飲外賣 |  |  |
| 2 | `src/data/blog-data/en.json:143` | category | 2 | 寵物 |  |  |
| 3 | `src/data/blog-data/en.json:180` | category | 4 | 美妝護膚 |  |  |
| 4 | `src/data/blog-data/en.json:376` | category | 4 | 母嬰食品 |  |  |
| 5 | `src/data/blog-data/en.json:384` | category | 3 | 房地產 |  |  |
| 6 | `src/data/blog-data/en.json:392` | category | 4 | 醫藥保健 |  |  |
| 7 | `src/data/blog-data/en.json:400` | category | 4 | 汽車汽配 |  |  |
| 8 | `src/data/blog-data/en.json:408` | category | 4 | 體育賽事 |  |  |
| 9 | `src/data/blog-data/en.json:702` | category | 4 | 書籍印刷 |  |  |

<details><summary>原文节录 (9 条)</summary>

- `src/data/blog-data/en.json:125` "category": "餐飲外賣",
- `src/data/blog-data/en.json:143` "category": "寵物",
- `src/data/blog-data/en.json:180` "category": "美妝護膚",
- `src/data/blog-data/en.json:376` "category": "母嬰食品",
- `src/data/blog-data/en.json:384` "category": "房地產",
- `src/data/blog-data/en.json:392` "category": "醫藥保健",
- `src/data/blog-data/en.json:400` "category": "汽車汽配",
- `src/data/blog-data/en.json:408` "category": "體育賽事",
- `src/data/blog-data/en.json:702` "category": "書籍印刷",

</details>

### `title` — 10 字符 / 2 条目

| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |
|---|---|---|---|---|---|---|
| 1 | `src/data/sku-seo-data.ts:3483` | h1 | 4 | 婚禮名片 |  |  |
| 2 | `src/data/sku-seo-data.ts:3538` | h1 | 6 | 金屬光澤名片 |  |  |

<details><summary>原文节录 (2 条)</summary>

- `src/data/sku-seo-data.ts:3483` "h1": "婚禮名片",
- `src/data/sku-seo-data.ts:3538` "h1": "金屬光澤名片",

</details>

### `description` — 67 字符 / 12 条目

| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |
|---|---|---|---|---|---|---|
| 1 | `src/data/blog-data/en.json:5` | description | 6 | 國際認證體系 |  |  |
| 2 | `src/data/blog-data/en.json:131` | description | 6 | 進口印刷設備 |  |  |
| 3 | `src/data/blog-data/en.json:577` | description | 10 | 急件截單國際認證體系 |  |  |
| 4 | `src/data/blog-data/en.json:593` | description | 6 | 國際認證體系 |  |  |
| 5 | `src/data/blog-data/en.json:609` | description | 12 | 進口印刷設備國際認證體系 |  |  |
| 6 | `src/data/blog-data/en.json:617` | description | 9 | 國際認證體系認證紙 |  |  |
| 7 | `src/data/blog-data/en.json:709` | description | 4 | 认证体系 |  |  |
| 8 | `src/data/category-seo-content.ts:2108` | description | 2 | 立体 |  |  |
| 9 | `src/data/category-seo-content.ts:2109` | description | 2 | 镂空 |  |  |
| 10 | `src/data/category-seo-content.ts:4655` | description | 2 | 離島 |  |  |
| 11 | `src/data/sku-seo-data.ts:3482` | description | 4 | 壓紋名片 |  |  |
| 12 | `src/data/sku-seo-data.ts:3537` | description | 4 | 婚禮名片 |  |  |

<details><summary>原文节录 (12 条)</summary>

- `src/data/blog-data/en.json:5` "description": "Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare vinyl/PVC/Kraft/clear materials, 50-1000 MOQ, Free shipping over $99, FedEx Grou
- `src/data/blog-data/en.json:131` "description": "ZprintPro features 進口印刷設備 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing solutions.",
- `src/data/blog-data/en.json:577` "description": "Rush printing delivery 2026 US: FedEx Express 2-day, DHL 2-4 day, USPS Priority 1-3 day, ZprintPro 急件 18:00 截單, 4 cut-off tiers, 4 cost tiers, 4 use cases, 4 FAQs, factory-di
- `src/data/blog-data/en.json:593` "description": "Which waterproof sticker material? 4 stocks compared (PVC vinyl 3-yr outdoor / clear vinyl 90% transparency / removable no residue / hot foil finishing)，100 MOQ from $0.045 U
- `src/data/blog-data/en.json:609` "description": "2026 Certificate Printing 8000 word guide: 7 scenarios (academic/corporate/institutional/event/training/wedding/medical)，4 materials (200-300gsm C2S/parchment/cotton/specialt
- `src/data/blog-data/en.json:617` "description": "Rush order FAQ answered: where is fastest, exact price, cutoff time. ZprintPro 30-second AI quote, 18:00 cutoff, next-day 12:00 SF Express, DHL 2-4 day international, 100 MOQ
- `src/data/blog-data/en.json:709` "description": "School exercise book printing 100 MOQ, 4 paper stocks + 3 bindings + 4 print modes ZprintPro global clients, ISO 认证体系 + FSC + FDA + EU REACH, DHL 2-4 day, 30s WhatsApp quote.
- `src/data/category-seo-content.ts:2108` { name: '3D Craft', description: 'Three-dimensional effects transform flat packets into立体 artworks with extremely high collectible value.' },
- `src/data/category-seo-content.ts:2109` { name: 'Laser Cutting', description: 'Fine pattern镂空 cutting with dreamy light-through effects — ideal for premium customization.' },
- `src/data/category-seo-content.ts:4655` { title: 'SF Express Local 24h', description: 'HK 24h delivery,離島 1-2 days, free pickup over HKD 500' },
- `src/data/sku-seo-data.ts:3482` "description": "壓紋名片",
- `src/data/sku-seo-data.ts:3537` "description": "婚禮名片",

</details>

### `content` — 697 字符 / 37 条目 + 9 数组元素 (见 §八) · 方法 B 条目 41 (含数组元素)

| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |
|---|---|---|---|---|---|---|
| 1 | `src/data/blog-data/en.json:8` | content | 18 | 進口印刷設備進口印刷設備進口印刷設備 | **true** |  |
| 2 | `src/data/blog-data/en.json:16` | content | 6 | 國際認證體系 |  |  |
| 3 | `src/data/blog-data/en.json:24` | content | 6 | 國際認證體系 |  |  |
| 4 | `src/data/blog-data/en.json:56` | content | 6 | 國際認證體系 |  |  |
| 5 | `src/data/blog-data/en.json:64` | content | 30 | 進口印刷設備進口印刷設備進口印刷設備進口印刷設備進口印刷設備 |  |  |
| 6 | `src/data/blog-data/en.json:72` | content | 6 | 國際認證體系 |  |  |
| 7 | `src/data/blog-data/en.json:80` | content | 6 | 國際認證體系 |  |  |
| 8 | `src/data/blog-data/en.json:96` | content | 21 | 進口印刷設備國際認證體系認證紙國際認證體系 |  |  |
| 9 | `src/data/blog-data/en.json:104` | content | 6 | 國際認證體系 |  |  |
| 10 | `src/data/blog-data/en.json:134` | content | 24 | 進口印刷設備進口印刷設備進口印刷設備國際認證體系 |  |  |
| 11 | `src/data/blog-data/en.json:137` | content | 6 | 國際認證體系 |  |  |
| 12 | `src/data/blog-data/en.json:147` | content | 12 | 國際認證體系國際認證體系 |  |  |
| 13 | `src/data/blog-data/en.json:150` | content | 12 | 國際認證體系國際認證體系 |  |  |
| 14 | `src/data/blog-data/en.json:166` | content | 12 | 國際認證體系國際認證體系 | **true** |  |
| 15 | `src/data/blog-data/en.json:181` | content | 12 | 國際認證體系國際認證體系 |  |  |
| 16 | `src/data/blog-data/en.json:188` | content | 9 | 坑紙段國際認證體系 |  |  |
| 17 | `src/data/blog-data/en.json:207` | content | 50 | 認證紙國際認證體系進口印刷設備進口印刷設備餐牌認證紙進口印刷設備急件截單國際認證體系餐牌進口印刷設備 | **true** |  |
| 18 | `src/data/blog-data/en.json:231` | content | 12 | 進口印刷設備進口印刷設備 | **true** |  |
| 19 | `src/data/blog-data/en.json:255` | content | 27 | 認證紙國際認證體系進口印刷設備認證紙進口印刷設備万邑通 |  |  |
| 20 | `src/data/blog-data/en.json:311` | content | 8 | 國際認證體系衍生 |  |  |
| 21 | `src/data/blog-data/en.json:393` | content | 6 | 國際認證體系 | **true** |  |
| 22 | `src/data/blog-data/en.json:412` | content | 12 | 進口印刷設備進口印刷設備 |  |  |
| 23 | `src/data/blog-data/en.json:420` | content | 12 | 國際認證體系國際認證體系 |  |  |
| 24 | `src/data/blog-data/en.json:428` | content | 6 | 國際認證體系 |  |  |
| 25 | `src/data/blog-data/en.json:452` | content | 12 | 國際認證體系國際認證體系 |  |  |
| 26 | `src/data/blog-data/en.json:485` | content | 6 | 國際認證體系 |  |  |
| 27 | `src/data/blog-data/en.json:493` | content | 6 | 進口印刷設備 |  |  |
| 28 | `src/data/blog-data/en.json:496` | content | 36 | 進口印刷設備國際認證體系認證紙進口印刷設備進口印刷設備國際認證體系認證紙 |  |  |
| 29 | `src/data/blog-data/en.json:503` | content | 2 | 紅包 |  |  |
| 30 | `src/data/blog-data/en.json:511` | content | 5 | 騎馬釘中綴 |  |  |
| 31 | `src/data/blog-data/en.json:531` | content | 6 | 國際認證體系 |  |  |
| 32 | `src/data/blog-data/en.json:563` | content | 3 | 核心頁 |  |  |
| 33 | `src/data/blog-data/en.json:580` | content | 95 | 急件截單急件截單急件截單急件截單急件截單進口印刷設備國際認證體系認證紙急件截單急件截單急件截單急件截單急件截單急件截單急件截單急件截單國際認證體系認證紙急件截單國際認證體系認證紙進口印刷設備 | **true** |  |
| 34 | `src/data/blog-data/en.json:588` | content | 40 | 認證紙認證紙急件截單認證紙國際認證體系進口印刷設備國際認證體系認證紙進口印刷設備 |  |  |
| 35 | `src/data/blog-data/en.json:612` | content | 118 | 進口印刷設備國際認證體系進口印刷設備認證紙國際認證體系國際認證體系國際認證體系認證紙進口印刷設備國際認證體系認證紙進口印刷設備進口印刷設備進口印刷設備進口印刷設備國際認證體系急件截單認證紙進口印刷設備認證紙進口印刷設備認證紙國際認證體系 | **true** |  |
| 36 | `src/data/blog-data/en.json:620` | content | 30 | 進口印刷設備進口印刷設備國際認證體系認證紙國際認證體系認證紙 |  |  |
| 37 | `src/data/blog-data/en.json:728` | content | 4 | 彩龍印刷 |  |  |

<details><summary>原文节录 (37 条)</summary>

- `src/data/blog-data/en.json:8` "content": "<p>US small business and DTC brand owners order custom stickers, packaging boxes, and labels weekly from Asia factory-direct printing suppliers. With hundreds of competing suppli
- `src/data/blog-data/en.json:16` "content": "<p>Many designers and corporate marketing teams fa issues when preparing print files: white edges appearing on finished prints, blurry images, color vastly different from screen 
- `src/data/blog-data/en.json:24` "content": "<p>Brand image building needs systematic material support. From a sticker to product packaging, every touchpoint is a brand-to-customer communication opportunity. This article pr
- `src/data/blog-data/en.json:56` "content": "<p>In competitive retail, packaging is both protection and a brand's first touchpoint with consumers. What new directions will packaging design take in 2024-2026? This article sy
- `src/data/blog-data/en.json:64` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> CMYK vs RGB is the core decision for print color quality control. CMYK 4-color overprint reproduces
- `src/data/blog-data/en.json:72` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Choose paper by use case first: weight for function, coating for finish, budget for volume. This gu
- `src/data/blog-data/en.json:80` "content": "<p>Sustainability is now a global trend. More companies embed ESG (Environmental, Social, Governance) into core strategy, and eco-printing is a key part of that. This article pro
- `src/data/blog-data/en.json:96` "content": "<p><strong>Food packaging printing</strong> is the most strictly regulated branch of <a href=\"/en/category/packaging/\">packaging box</a> production. The global food packaging m
- `src/data/blog-data/en.json:104` "content": "<p>Paper bags are a critical part of brand packaging. Whether you run a boutique, gift store, café, or event business, a well-crafted <a href=\"/en/product/kraft-paper-bags/\">br
- `src/data/blog-data/en.json:134` "content": "<p>ZprintPro is a Shenzhen-rooted, globally-serving printing enterprise with 15 years of expertise. From corporate stationery to retail packaging, this article gives an in-depth 
- `src/data/blog-data/en.json:137` "content": "<p>Custom packaging box printing — from lid-base boxes to mailer boxes, white card to specialty paper, foil stamping to embossing. This guide decodes box styles, paper materials,
- `src/data/blog-data/en.json:147` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Apparel, streetwear, and boutique owners — a premium branded paper bag drives Instagram, TikTok, an
- `src/data/blog-data/en.json:150` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Shopify, Amazon FBA, Etsy, and Lazada sellers — a premium printed cross-border e-commerce shipping 
- `src/data/blog-data/en.json:166` "content": "<p>The pharmaceutical and supplement industry is one of the most strictly regulated printing applications worldwide. A <a href=\"en/category/stickers/\">pharmaceutical label</a> 
- `src/data/blog-data/en.json:181` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Cosmetic packaging boxes are the first impression of any skincare brand. 3 main box styles (lid-bas
- `src/data/blog-data/en.json:188` "content": "<p><span class=\"text-[#1A56DB] font-medium text-lg\">Key Takeaways:</span> Tea and beverage brand gift box printing drives premium unboxing for bubble tea, loose leaf tea, and D
- `src/data/blog-data/en.json:207` "content": "<p>The 2026 US F&B industry is entering a new era of experience upgrade. A menu is no longer a sheet of paper — it is the \"last gate\" of order decisions and an extension of bra
- `src/data/blog-data/en.json:231` "content": "<p>US high school yearbook season runs from August build kickoff through May graduation, and the Class of 2026 is the largest cohort in over a decade with 3.9 million projected g
- `src/data/blog-data/en.json:255` "content": "<p>The US wedding invitation market is valued at US$3.1 billion in 2026 with 2.4 million weddings annually. Engaged couples, wedding planners, and stationery designers know that 
- `src/data/blog-data/en.json:311` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Baby brand owners (infant formula, baby food, baby skincare, maternal nutrition) — an FDA-compliant
- `src/data/blog-data/en.json:393` "content": "<p>The global medical device packaging market exceeds US$60 billion in 2026, with US medical device exports growing 12% year-over-year. For medical device manufacturers, hospital
- `src/data/blog-data/en.json:412` "content": "<h2>Gang-Run White Card Boxes: Budget-Friendly 100-MOQ Starter for US Small Brands</h2>\n<p>US retail boutique, skincare, IP merchandise, and gift brand owners fa a familiar dile
- `src/data/blog-data/en.json:420` "content": "<h2>Custom Card Boxes for E-commerce: Why 500 MOQ Changes the Game for US DTC Brands</h2>\n<p>US DTC brand owners and Amazon FBA sellers fa a familiar pain when launching a new S
- `src/data/blog-data/en.json:428` "content": "<h2>Cosmetic Card Boxes: Silver & Holographic Cardstock That Wins the 3-Second Shelf Test</h2>\n<p>US indie cosmetics brand owners, skincare founders, serum and mask labels, and 
- `src/data/blog-data/en.json:452` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> How do you print same-day flyers? Approve your artwork by noon and collect within 4-6 hours, with r
- `src/data/blog-data/en.json:485` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> A1 (594×841 mm) vs A2 (420×594 mm) poster printing in 2026: A2 gloss art paper 128 gsm starts at <s
- `src/data/blog-data/en.json:493` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>TL;DR:</strong> Custom catalog &amp; art book printing 2026 — hardcover 100 copies from $5.80/book, perfect bound f
- `src/data/blog-data/en.json:496` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>Quick Answer:</strong> 2026 dragon year drives <strong> HK weddings</strong>, market past HK$1.5B. ZprintPro 50-500
- `src/data/blog-data/en.json:503` "content": "<p>Wedding table cards (place cards，seating charts，escort cards) are essential for any wedding with assigned seating. The 2026 average cost for 100-500 table cards is $0.40-1.20/
- `src/data/blog-data/en.json:511` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>Key takeaway:</strong> Saddle stitch booklets print from <strong>100 copies</strong>, with 8-64 pages, <strong>US$1
- `src/data/blog-data/en.json:531` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>Key takeaway:</strong> Custom apparel hang tags from 100 MOQ, 8 materials (coated / kraft / PVC / specialty / matte
- `src/data/blog-data/en.json:563` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>Quick Answer:</strong> 2027 calendar printing <strong>hard deadline: September 15, 2026</strong> for December 2026 
- `src/data/blog-data/en.json:580` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>Quick Answer:</strong> Rush printing delivery in the US 2026: fastest is <strong>FedEx Express 2-day</strong> for c
- `src/data/blog-data/en.json:588` "content": "<p class=\"text-base text-[#1A56DB] font-medium mb-4\"><strong>Quick Answer:</strong> Packaging box printing pricing 2026 US: <strong>500 pcs from $0.45-1.80/box</strong>, 4 from
- `src/data/blog-data/en.json:612` "content": "<p>ZprintPro's 2026 Certificate Printing Guide: 7 scenarios (academic/corporate/institutional/event/training/wedding/medical)，4 materials (200-300gsm art card/parchment/cotton/sp
- `src/data/blog-data/en.json:620` "content": "<p>Need 200 C4 envelopes for a 9 AM contract meeting. ZprintPro's 30-second AI quote flow answers three pain points: fastest delivery, exact price, cutoff time. Confirm by noon, 
- `src/data/blog-data/en.json:728` "content": "<p>If you are printing a zine in 2026, the two questions that decide everything are <strong>how many copies you must order</strong> and <strong>what one copy costs</strong>. Sadd

</details>

### `JSON-LD` — 138 字符 / 5 条目

| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |
|---|---|---|---|---|---|---|
| 1 | `src/data/blog-data/en.json:468` | content | 6 | 麥思印刷整合 |  |  |
| 2 | `src/data/blog-data/en.json:644` | content | 92 | 细分證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索證書編號備索答案答案答案答案答案答案答案答案答案答案答案答案 |  |  |
| 3 | `src/data/blog-data/en.json:677` | content | 6 | 並製本上製本 |  |  |
| 4 | `src/data/blog-data/en.json:691` | content | 18 | 證書編號備索證書編號備索證書編號備索 |  |  |
| 5 | `src/data/blog-data/en.json:712` | content | 16 | 认证体系月月认证体系认证认证体系 |  |  |

<details><summary>原文节录 (5 条)</summary>

- `src/data/blog-data/en.json:468` "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"A1 A2 A3 Poster Size Guide: Dimensions Chart, Uses, Material Sele
- `src/data/blog-data/en.json:644` "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Campus education printing Sept back-to-school complete guide: 5 P
- `src/data/blog-data/en.json:677` "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"2026 Hong Kong Printing Cost Baseline Report: 99-SKU Price Data f
- `src/data/blog-data/en.json:691` "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Print Specifications Complete Guide 2026: A1-A6 Sizes, CMYK Color
- `src/data/blog-data/en.json:712` "content": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"School Exercise Book Printing Guide 2026: 4 Stocks 3 Bindings 100

</details>

### `其他` — 87 字符 / 8 条目 + 6 数组元素 (见 §八) · 方法 B 条目 10 (含数组元素)

| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |
|---|---|---|---|---|---|---|
| 1 | `src/data/buying-guides.ts:930` | en | 38 | 輸入六色印刷設備批量以上批量以上数据来源数据数据数据九数据诚信红线校准拍板日 |  |  |
| 2 | `src/data/sku-seo-data.ts:3515` | en | 2 | 厚口 |  |  |
| 3 | `src/data/sku-seo-data.ts:3570` | en | 2 | 箔押 |  |  |
| 4 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn | 13 | 深圳市彩龍印刷包裝有限公司 |  | WL-1(法人全称);WL-4(品牌名) |
| 5 | `src/components/layout/Footer.tsx:146` | supportJA | 12 | 中国本土時間対応香港現地 |  | WL-3(别名键(ja 语系值)) |
| 6 | `src/app/[locale]/category/[slug]/page.tsx:170` | en | 4 | 月前就位 |  |  |
| 7 | `src/app/[locale]/category/[slug]/page.tsx:206` | en | 6 | 月最後黃金窗 |  |  |
| 8 | `src/data/blog-posts.ts:1834` | en | 4 | 认证体系 |  |  |

<details><summary>原文节录 (8 条)</summary>

- `src/data/buying-guides.ts:930` en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>water-resistant finishes</strong>, and <strong>small-batch MOQ (100-500 pcs)</strong> to survive handmad
- `src/data/sku-seo-data.ts:3515` "en": "厚口 カード",
- `src/data/sku-seo-data.ts:3570` "en": "箔押し カード",
- `src/app/[locale]/payment-methods/page.tsx:697` beneficiaryCn: '深圳市彩龍印刷包裝有限公司',
- `src/components/layout/Footer.tsx:146` supportJA: '中国本土 24時間対応 · 香港現地サポート',
- `src/app/[locale]/category/[slug]/page.tsx:170` 'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位 + CNY Wedding · USA Chinese Communities',
- `src/app/[locale]/category/[slug]/page.tsx:206` 'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts',
- `src/data/blog-posts.ts:1834` en: 'School exercise book printing 100 MOQ, 4 paper stocks + 3 bindings + 4 print modes ZprintPro global clients, ISO 认证体系 + FSC + FDA + EU REACH certified, DHL 2-4 day cross-border, 30s Wha

</details>

---

## 五、`content` 档布尔子标记 `rendersChineseFAQ` (取代旧「FAQ 残留」档)

| 项 | 值 |
|---|---|
| true 字符数 | 311 |
| true 涉及值数 | 7 |
| 方法 B 同项 | 311 字符 / 7 值 |
| 全库口径 (含 `JSON-LD` 档值) | `en.json` 内 `content` 字段共 9 个值满足严格判据: 7 个归 `content` 档 (下表), 1 个 (`print-specifications-reference-guide-2026`) 归 `JSON-LD` 档, 另 1 个 (`school-exercise-book-printing-guide`, 16 字) 的 CJK 落在 **`<h3>Q1:</h3><p>A: …</p>` 结构之外**故判 false |

| # | 值位置 | 字段 | 字数 | 判定证据 |
|---|---|---|---|---|
| 1 | `src/data/blog-data/en.json` L8 | content | 18 | html-QA-block@4088 |
| 2 | `src/data/blog-data/en.json` L166 | content | 12 | html-QA-block@4873 |
| 3 | `src/data/blog-data/en.json` L207 | content | 50 | html-QA-block@11873 + html-QA-block@12443 |
| 4 | `src/data/blog-data/en.json` L231 | content | 12 | html-QA-block@9722 |
| 5 | `src/data/blog-data/en.json` L393 | content | 6 | html-QA-block@4840 |
| 6 | `src/data/blog-data/en.json` L580 | content | 95 | html-QA-block@15222 |
| 7 | `src/data/blog-data/en.json` L612 | content | 118 | html-QA-block@21658 |

> 证据形如 `html-QA-block@N` = HTML 问答块 (Q/A) 内含 CJK; `FAQPage-JSONLD` = FAQPage schema 的 Question/Answer 文本内含 CJK。
> 「true」的语义 = **该 CJK 字符真的位于 FAQ 问/答文本内, 会被渲染成中文 FAQ**; 落在正文段落的 CJK 不计入本标记。

---

## 六、`resolveLocale` 独有命中 (203 字符) —— 逐条列差异, 不取其一

这些字符 **`resolveLocale` 判为 en, 门童结构化作用域不认**; 经逐条归因, **全部落在注释体内** (零例外)。
本清单**不计入**上文 1032, 但完整列出以免掩盖:

| # | 文件 | 字符数 | 命中行 | 性质 |
|---|---|---|---|---|
| 1 | `src/data/category-seo-content.ts` | 120 | L809 / L903 / L1534 / L1851 / L2149 / L2150 / L2151 / L2155 / L3081 / L3171 / L3172 | 行注释 |
| 2 | `src/components/layout/Footer.tsx` | 71 | L451 / L479 / L480 / L481 | 块/JSX 注释 |
| 3 | `src/data/blog-posts.ts` | 12 | L532 | 行注释 |
| | **合计** | **203** | | |

<details><summary>逐行明细 (行号 / 命中字 / 该行原文)</summary>

**`src/data/category-seo-content.ts`**

- L809 `批改写词段` — // 2026-08-24 v3.17 B3 批 1 改写: 4 词 cluster (catalog book + china catalog + catalog printing china + bulk catalog) + bulk/wholesale 段
- L903 `真實案例段` — // 2026-08-22 v3.15 S2 T36: T25 2026 H1 真實案例段 → en
- L1534 `信封場景大類` — // 2026-08-22 v3.15 S2 T36: T25 信封 2026 場景 5 大類 → en
- L1851 `月曆市場旺季前夜關鍵節點` — // 2026-08-22 v3.15 S2 T36: T25 2027 月曆市場旺季前夜關鍵節點 → en
- L2149 `此處原有留下的整條繁體中文` — // 2026-09-19 Step 5 (B3): 此處原有「2026-08-22 v3.14 T25」留下的**整條繁體中文** CNY 2027 FAQ
- L2150 `全中文插在語系的陣列內頁面會渲染中文屬真缺陷已刪除` — //   （q + a 全中文），插在 en 語系的 faq 陣列內 ⇒ en 頁面會渲染中文 FAQ，屬真缺陷，已刪除。
- L2151 `同一的英文版就在下方去重內容無損失` — //   同一 FAQ 的英文版就在下方（v3.15 S2 T36，L2155）⇒ 去重，內容無損失。
- L2155 `利是封備貨時間線行業趨勢` — // 2026-08-22 v3.15 S2 T36: T25 CNY 2027 利是封備貨時間線 + 行業趨勢 → en
- L3081 `首建` — // 2026-08-22 v3.13 T15: Flyer Pillar 首建
- L3171 `去模板化防加真實案例即日特急數據` — // 2026-08-22 v3.14 T25: flyers Pillar 去模板化 (防 scaled content abuse, 加 2026 H1 真實案例 + 即日特急數據)
- L3172 `修复污染添加段` — // 2026-08-22 v3.15 S2 T36: 修复 zh-hk 污染 + 添加 en 段

**`src/components/layout/Footer.tsx`**

- L451 `锚定文本供搜索引擎抓取` — {/* GEO 锚定文本 — 供 AI 搜索引擎抓取 */}
- L479 `不再顯示經營者資訊披露按鍵跨境無實體無法律義務` — 2026-07-08: zh-hk + en 不再顯示「經營者資訊披露」按鍵 (跨境無實體, 無法律義務);
- L480 `隱私政策使用條款已移到幫助中心欄` — 隱私政策 + 使用條款 已移到「幫助中心」欄;
- L481 `保留特定商取引法基表記日本特定商取引法要求` — ja 保留「特定商取引法に基づく表記」(日本特定商取引法要求)

**`src/data/blog-posts.ts`**

- L532 `全球通用强调盒型对比最新` — // en: 全球通用 + 强调"6 盒型对比 + 2026 最新"; ja: 强调"6 つの箱型徹底比較"

</details>

补充 (A/B 两法都排除、仅存在于 `resolveLocale` 全库口径的其他 src/ 文件, 供参考): 全 src/ 另有 2467 字同类假阳性, 详见 `.hermes/_probe-pb/_diag-conflict.txt`。

---

## 七、白名单候选 (K3 已批准 4 行; 不占档位, 可跨档)

| # | file:line | 字段 | 语系归属 | 字数 | 内容 |
|---|---|---|---|---|---|
| 1 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn | WL-1(法人全称) | 13 | `深圳市彩龍印刷包裝有限公司` |
| 2 | `src/app/[locale]/payment-methods/page.tsx:697` | beneficiaryCn | WL-4(品牌名) | 13 | `深圳市彩龍印刷包裝有限公司` |
| 3 | `src/app/[locale]/payment-methods/page.tsx:758` | bullets | WL-2(法定代表人姓名) | 3 | `唐运提` |
| 4 | `src/app/[locale]/payment-methods/page.tsx:758` | bullets | WL-4(品牌名) | 3 | `唐运提` |
| 5 | `src/components/layout/Footer.tsx:146` | supportJA | WL-3(别名键(ja 语系值)) | 12 | `中国本土時間対応香港現地` |

归档位置: 上述 4 行命中**全部落在 `其他` 档** (字段名 `beneficiaryCn` / `bullets` / `supportJA` 均在 6 档定义之外),
另有 `blog-data/en.json` 的品牌名 `彩龍印刷` 落在 `JSON-LD` 档。详见 §四 对应行。

---

## 八、数组元素 (两法表达方式不同, 单列以便复核)

| # | file:line | 字段 | 字数 | 节录 |
|---|---|---|---|---|
| 1 | `src/data/category-seo-content.ts:537` | points | 1 | 'Variable size output up to 3.2 meters wide, unlimited length —满足 building hoarding and other large-scale needs.', |
| 2 | `src/data/category-seo-content.ts:537` | points | 1 | 'Variable size output up to 3.2 meters wide, unlimited length —满足 building hoarding and other large-scale needs.', |
| 3 | `src/data/category-seo-content.ts:2788` | points | 1 | 'Precision die-cutting with fully customizable shapes: round, irregular,镂空.', |
| 4 | `src/data/category-seo-content.ts:2788` | points | 1 | 'Precision die-cutting with fully customizable shapes: round, irregular,镂空.', |
| 5 | `src/data/category-seo-content.ts:4606` | points | 1 | 'Local SF Express 24h HK,離島 1-2 days, free pickup over HKD 500', |
| 6 | `src/data/category-seo-content.ts:4606` | points | 1 | 'Local SF Express 24h HK,離島 1-2 days, free pickup over HKD 500', |
| 7 | `src/data/sku-seo-data.ts:3485` | keywords | 1 | "400g名片" |
| 8 | `src/data/sku-seo-data.ts:3485` | keywords | 1 | "400g名片" |
| 9 | `src/data/sku-seo-data.ts:3540` | keywords | 1 | "燙金名片" |
| 10 | `src/data/sku-seo-data.ts:3540` | keywords | 1 | "燙金名片" |
| 11 | `src/data/sku-seo-data.ts:3540` | keywords | 1 | "燙金名片" |
| 12 | `src/data/sku-seo-data.ts:3540` | keywords | 1 | "燙金名片" |
| 13 | `src/app/[locale]/payment-methods/page.tsx:758` | bullets | 1 | 'Official QR issued by 唐运提 (Mr. Tang, founder)', |
| 14 | `src/app/[locale]/payment-methods/page.tsx:758` | bullets | 1 | 'Official QR issued by 唐运提 (Mr. Tang, founder)', |
| 15 | `src/app/[locale]/payment-methods/page.tsx:758` | bullets | 1 | 'Official QR issued by 唐运提 (Mr. Tang, founder)', |

> 方法 A 对数组裸元素单独标记 `arrayElement`, 不计入 §3.3 条目集合; 方法 B 将其归入列表键。
> 两者**字符级计数完全一致** (已包含在 §3.1/§3.2), 差异仅在「条目怎么记」。

---

## 九、与作废版 (`.hermes/logs/i18n-en-cjk-classification-2026-09-19.md`) 的差异说明

### 9.1 两版口径的根本差异

| 项 | 作废版 | 本版 v2 |
|---|---|---|
| 分档依据 | **命中行的整行文本正则** (`/FAQ/` / `/"content":/` …) | **命中字符所处字段** (结构定位) |
| 字符记账 | 先把逐笔 CSV **按 `file:line:char` 去重**, 再分档 ⇒ 计数被去重压缩 | 逐字符记账, 不做字符级去重 |
| 条目口径 | 分档后的「笔数」自相矛盾 (A-G 合计 598 ≠ 声称 1138) | 字符数与条目数**分列**, 互不混用 |
| FAQ | 单列 C 档 (7 笔), 判据 = 行文本出现 `FAQ` | 取消该档; 改 `content` 档布尔子标记, 严格判据 (见 §1.3) |
| 别名键 | 未覆盖 (`supportJA` / `beneficiaryCn` 漏) | 覆盖 (按真实语系归属) |

### 9.2 数字变化与原因 (逐档)

| 作废版档位 | 作废版笔数 | 本版对应档 (字符数) | 变化原因 |
|---|---|---|---|
| A 白名单 (专有名词 4 行) | 28 | 不占档位; 现为跨档标记 28 字 (其他档 28 + JSON-LD 品牌名) | 口径相同, 改为**标记**而非档位 (K3 §3 要求) |
| B JSON-LD 残留 | 31 | `JSON-LD` **138 字符 / 5 条目** | 31 是「去重后的行笔数」; 本版按字符记 (同值可含多字符), 且改按**值内嵌内联 schema** 判据 |
| **C FAQ 残留** | **7** | **311 字符 / 7 值 (无「FAQ 档」, 改 `content` 档布尔子标记)** | 作废版 7 笔全部来自 `en.json:617` 的 `description` —— 其文本含 "Rush order **FAQ** answered" 字样, 行正则便判为「FAQ 残留」; 实际该值是 **meta description, 根本不是 FAQ 字段**。改按严格判据 (CJK 是否落在 FAQ 问/答文本内) 重算: 得 **311 字符 / 7 值真正位于 FAQ 结构体内** (见 §五) —— **数字同量级纯属巧合, 内容完全不同** |
| D category 字段残留 | 32 | `category` **33 字符 / 9 条目** | 去重压缩 vs 逐字符; 条目数 9 亦为真实值 |
| E title/description | 52 | `title` **10** + `description` **67** = **77 字符** | 作废版把 title/description 合档且按行去重; 本版两档分开、按字符计 |
| **F content 正文** | **300** | `content` **697 字符 / 37 条目** | 作废版 300 = 去重后的「行笔数」; 本版为**字符数** (同一 content 值内多字符逐字记); 二者不同量纲, 不是「残留翻倍」 |
| G 其他/待判 | 148 | `其他` **87 字符 / 8 条目** | 作废版 148 含大量实为 content/JSON-LD 的条目 (正则只看行文本, 分错); 本版按字段定位后大部分归入 content/JSON-LD |
| (新) 合计 | 598 (自相矛盾: 声称 1138) | **1032 字符 / 73 条目** | = 门童 `perRule.I18N_POLLUTION_EN` 基线值 |

### 9.3 关于「1138 vs 968 / 118 vs 0 / 28 vs 4 / 16 vs 0 / 12 vs 0」

上一版方法 2 的偏差根因已复核确认, 并给出本版的实证:

| 文件 | 旧方法 2 报数 | 真实值 (两法一致) | 旧方法 2 偏差根因 |
|---|---|---|---|
| `src/data/category-seo-content.ts` | 0 | **12** | 旧方法 2 只认「键名恰为 `en:`」的值域; 该档 CJK 落在 `en` **容器块内更深层** (如 `points: [...]` 数组元素 / `description`), 未被 `en:` 直属切片覆盖 |
| `src/data/sku-seo-data.ts` | 4 | **28** | 同上 —— 24 字落在 `en` 块内 `description`/`h1`/`keywords` 等子字段 |
| `src/app/[locale]/payment-methods/page.tsx` | 0 | **16** | 同上 —— 13 字落在 `beneficiaryCn` (**别名键**, 非 `en:`), 3 字落在 `bullets` 数组元素 |
| `src/components/layout/Footer.tsx` | 0 | **12** | 同上 —— 全 12 字落在 `supportJA` (**别名键**, 非 `en:`); 该值属 **ja 语系**, 因「最近左侧 locale 键 = `en:`」规则被记为 en ⇒ **这条属口径产物, 是否真缺陷需 K3 判** (见 §十) |
| 合计 | **968** | **1032** | 差 64 = 上述 4 档之和 |

### 9.4 关于旧版 1138 —— 已复核, 无需再引它做判据

旧版声称的 1138 (与方法 2 的 968 对不上) 是**逐笔 CSV 行数**, 而该 CSV 由 `en-cjk-inventory.cjs` 用
`guard.scanBidirectional()` 产出 —— 即**门童结构化值作用域**口径, 与基线 1032 **同源**。
两者差 106 的成因是**集合范围与去重口径不同** (旧版另有 `resolveLocale` 假阳性参与、且做过行级合并),
本任务**不以 1138 或 968 为任何判据** —— 统一采用可复算的 1032 (两法已独立复现一致)。

> 一句话: **1138 与 968 都不是 1032** —— 前者含假阳性/口径混杂, 后者漏别名键与嵌套字段, 两者都不可作判据。

---

## 十、无法判定归属 / 需 K3 判定的条目

### 10.1 字段归属判不出的条目

**无** —— 两法均能把 1032 字符全部归属到具名字段。

### 10.2 口径上真正存疑、需 K3 拍板的 3 项

| # | 项 | 字符数 | 争点 |
|---|---|---|---|
| 1 | `src/components/layout/Footer.tsx:146` `supportJA` | 12 | 字段名是 `supportJA` (**ja** 语系), 值却是含简体/中日混排; 门童按「最近左侧 locale 键」把它记入 en, 但这**可能是口径伪影而非真缺陷** |
| 2 | `src/data/blog-data/en.json` `content` 内 `[證書編號備索]` 等**合规占位符** | 84 | 是「中文残留」还是「证书号占位符」? SOP-10 第 4 款要求 certNo 撤为空串, 此处为占位符形态 (campus / print-specs / 其他) |
| 3 | `國際認證體系`(312) / `進口印刷設備`(258) / `認證體系`(208) / `認證紙`(69) / `急件`(36) / `截單`(36) 等**行业术语** | 含这些 token 的条目共 **46 条 / 847 字符** (占 1032 的 82%) | 属「中文残留需清理」还是「可保留的行业/工艺术语 + 经营参数」? 本清单按门童口径**全部计入**, 未自行放宽 (注: `急件 18:00 截單` 已在 `common.js` `OPERATIONAL_WHITELIST.businessParams` 内) |

> 上述 3 项本清单**均按门童原始口径计入** (未擅自豁免), 仅标注争点供 K3 裁决。

### 10.3 ★ 顺带发现的另一类真缺陷 (非本任务范围, 但同源命中, 必须上报)

盘点 `en` 值内 CJK 时, 在 **`src/data/buying-guides.ts:930`** 的 **`en` 语系 `content` 值尾部** 发现一段
**GSC 后台数据源行被写进了客户可见内容** —— 这正是 §0.23.1 (门童 #16 `gsc-leak-guard.js`) 的拦截对象:

```html
<small class="text-gray-500">数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)</small>
```

| 项 | 值 |
|---|---|
| 位置 | `src/data/buying-guides.ts:930` (字符位移 172176 / 行内偏移 8759) |
| 所属 | `en` 语系 `content` 值 (字符串字面量内, 非注释) |
| 命中后台黑话 | `GSC` · `gsc-fresh-2026-09-03.json` · `imps` · `pos` · `红线` · `校准` · `拍板` = **7 处** |
| 为何既在清单里又单独列出 | 本清单按「en 值内 CJK」口径只记其中 **38 个中文字符**; 而**英文黑话 (`GSC`/`imps`/`pos`) 不属 CJK, 不在本清单判据内**, 故必须另行上报 |
| 建议 | 按 §0.23.1「修复必须整句重写, 不能只删数字」处理: 整段 `<small>` 删除, 并跑 `node scripts/guards/gsc-leak-guard.js` 复核 |
| 本任务边界 | **未修改该文件** (纯只读); 仅上报 |

---

## 十一、复跑命令

```powershell
cd F:\zprintpro-nextjs
# 方法 A
node .hermes/_probe-pb/methodA-en-cjk-classify.cjs
# 方法 B
node .hermes/_probe-pb/methodB-en-cjk-classify.cjs
# resolveLocale 独有命中 (§六 明细)
node .hermes/_probe-pb/diag-resolveLocale-only.cjs
# 对账 + 重新生成报告与 CSV
node .hermes/_probe-pb/en-cjk-align.cjs
```

基线对账 (确认 1032 未漂移):

```powershell
node .hermes/_probe-pb/diag-sku-ground-truth.cjs
```

---

## 十二、边界声明

- 本任务**纯只读**: 未修改 / 未新增 / 未删除任何 `src/` 生产文件, 未 commit / push / add。
- 新增文件仅 2 份交付物 (报告 + CSV, 位于 `.hermes/logs/`) 与 `.hermes/_probe-pb/` 下脚本。
- 判据**未自行放宽**: 门童口径下 1032 字符全部计入, 未以「行业术语 / 品牌词」为由静默豁免。
