# Phase B 5 P0 修复摘要

> **任务 ID**: Phase B (V1 审计 → 代码修复)
> **修复日期**: 2026-06-10
> **Owner**: ai-coder
> **作用域**: 仅代码层（不含内容扩写、不重做审计）
> **品牌硬规则**: 智印云 / ZprintPro（无 "智印港"）

---

## 1. 修复总览

| P0 | 标题 | 影响范围 | 文件 | 状态 |
|---|---|---|---|---|
| **P0-1** | en locale 数据错配（79/79 产品页中文 description 泄漏） | 79 产品页 | `product/[slug]/page.tsx` | ✅ 已修 |
| **P0-2** | Title 品牌重复（98 个 URL） | 92 产品+分类页 | `seo.ts` + `layout.tsx` | ✅ 已修 |
| **P0-3** | GEO Schema 缺失（HowTo / Speakable / Author） | 138 URL 部分覆盖 | `seo/schema-extensions.ts`（新）+ 4 个 page 文件 | ✅ 已修 |
| **P0-4** | hreflang 重复 + 路径错（Home 11 项） | 全站 | `layout.tsx` | ✅ 已修 |
| **P0-5** | ItemList schema 缺 url/name（13 分类 + 1 case-studies） | 14 URL | `seo/schema-extensions.ts`（新）+ `case-studies/page.tsx` + `category/[slug]/page.tsx` | ✅ 已修 |

---

## 2. 改动文件清单

| # | 路径 | 改动类型 | 行数变化 |
|---|---|---|---|
| 1 | `src/lib/seo/schema-extensions.ts` | **新增** | +358 行 |
| 2 | `src/lib/seo.ts` | 改 en/ja 品牌后缀 + 加 brandSuffix 变量 | +5 / -3 |
| 3 | `src/app/[locale]/layout.tsx` | 删 hreflang 渲染 + 改 template | +13 / -5 |
| 4 | `src/app/[locale]/product/[slug]/page.tsx` | P0-1 本地化 + P0-3 HowTo/Speakable | +40 / -10 |
| 5 | `src/app/[locale]/category/[slug]/page.tsx` | P0-5 ItemList + P0-3 HowTo/Speakable | +27 / -13 |
| 6 | `src/app/[locale]/blog/[slug]/page.tsx` | P0-3 Author=Person + Speakable | +30 / -20 |
| 7 | `src/app/[locale]/case-studies/page.tsx` | P0-5 ItemList 补 url+name | +18 / -5 |

总计: 7 个文件，1 个新增，6 个修改。

---

## 3. P0 逐项修复说明

### P0-1: en locale 数据错配（产品页中文泄漏）

**根因**: `src/app/[locale]/product/[slug]/page.tsx:161-170` 直接传 `product.name` / `product.description` 给 `generateProductJsonLd` —— 这些是中文字段，en/ja 页输出 `name: "牛皮紙袋"`。

**修法**:
- 改 caller（不改函数签名，保持向后兼容）传 `productTitle` / `productDescription`，这两个值由 `getProductTitle(product, locale)` / `getProductDescription(product, locale)` 提前按 locale 切换。
- 顺带修 `generateProductReviewsJsonLd(product.name, ...)` 改用 `productTitle`（line 275 → 305）。

**before**:
```ts
const productJsonLd = generateProductJsonLd(
  product.name,           // ← 永远是中文
  product.description,    // ← 永远是中文
  ...
);
```

**after**:
```ts
// 2026-06-10 Phase B 修复 P0-1：使用 locale 本地化的 name / description
const productJsonLd = generateProductJsonLd(
  productTitle,           // ← en 页 = nameEn, ja = nameJa
  productDescription,     // ← en 页 = descriptionEn, ja = descriptionJa
  ...
);
```

**grep 验证**:
```bash
# P0-1: product page 调用 generateProductJsonLd 时 name/description 不再直接传 product.name / product.description
$ Get-Content src/app/[locale]/product/[slug]/page.tsx | Select-String "generateProductJsonLd\(|productTitle|productDescription"
# 输出：productTitle (L146), productDescription (L147), generateProductJsonLd(productTitle, productDescription, ...) (L170-179)
# ✅ 已修
```

---

### P0-2: Title 品牌重复（98 个 URL）

**根因**:
- `src/lib/seo.ts:273,274,328,330,331` 的 en/ja 分支末尾用 `${siteConfig.name}` = `智印云 ZprintPro`（含中文）
- `src/app/[locale]/layout.tsx:26` 的 template `'%s | ZprintPro'` 又会再加 `| ZprintPro`
- 结果: `Custom Bags | Global Shipping | 智印云 ZprintPro | ZprintPro` 双品牌

**修法（采用方案 A: layout 模板统一）**:
1. `layout.tsx:26` 改 `template: '%s'`（不再追加品牌）
2. `seo.ts` 的 `generateCategoryMetadata` 和 `generateProductMetadata` 加 `brandSuffix` 变量:
   - `locale === 'zh-hk' ? siteConfig.name : 'ZprintPro'`
   - en/ja 用纯英文 `ZprintPro`（无中文）
   - zh-hk 保留 `智印云 ZprintPro`（中文品牌符合用户场景）

**before**:
```ts
// seo.ts:273
: locale === 'en'
? `${name} | Global Shipping | ${siteConfig.name}`   // ← 智印云 ZprintPro (中英混杂)
```

**after**:
```ts
// seo.ts (line 271): 用 brandSuffix 变量
const brandSuffix = locale === 'zh-hk' ? siteConfig.name : 'ZprintPro';
// en/ja 用 'ZprintPro'，zh-hk 用 siteConfig.name
? `${name} | Global Shipping | ${brandSuffix}`   // ← ZprintPro (纯英文)
```

**before**:
```ts
// layout.tsx:26
template: '%s | ZprintPro',   // ← 与子页品牌后缀叠加
```

**after**:
```ts
// layout.tsx:29
template: '%s',   // ← 由子页统一控制品牌后缀
```

**grep 验证**:
```bash
# P0-2: en/ja 分支末尾用 'ZprintPro' 而不是 ${siteConfig.name}
$ Get-Content src/lib/seo.ts | Select-String "brandSuffix"
# 输出：
# L325: const brandSuffix = locale === 'zh-hk' ? siteConfig.name : 'ZprintPro';
# L327/329/330: 三处使用 brandSuffix
# ✅ 已修
```

---

### P0-3: GEO Schema 缺失（HowTo / Speakable / Author）

**根因**:
- `src/lib/seo.ts` 没有 `generateHowToJsonLd` / `generateSpeakableJsonLd`
- blog page 旧 Article schema 用 `author: { @type: 'Organization' }`（应为 Person）

**修法**:

#### 1) 新建 `src/lib/seo/schema-extensions.ts` (358 行)
导出:
- `generateHowToJsonLd(name, description, steps, locale, totalTime)` — 完整 schema.org/HowTo 字段（name / description / step[] / totalTime ISO 8601 / inLanguage）
- `generateSpeakableJsonLd(xpath, cssSelectors)` — SpeakableSpecification + xpath + cssSelector
- `generateBlogArticleJsonLd(input, locale)` — **author 强制 Person 类型**（E-E-A-T 关键）
- `generateCategoryItemListJsonLd(categoryName, products, locale)` — 修复 P0-5
- `getCategoryHowToSteps(categorySlug, locale)` — 4 主钻品类（packaging / paper-bags / books / calendars）各 5-7 步工艺步骤，**三语完整本地化**
- `standardSpeakableSelectors` 常量（product / category / blog 三组）

#### 2) 4 个 page 文件接入:

| Page | HowTo | Speakable | Author=Person |
|---|---|---|---|
| product (主钻 4 品类) | ✅ getCategoryHowToSteps + generateHowToJsonLd | ✅ standardSpeakableSelectors.product | n/a (Product schema) |
| category (主钻 4 品类) | ✅ getCategoryHowToSteps | ✅ standardSpeakableSelectors.category | n/a |
| blog | n/a (Article 已存在) | ✅ standardSpeakableSelectors.blog | ✅ generateBlogArticleJsonLd |
| case-studies | n/a | n/a | n/a (ItemList schema) |

**主钻 4 品类 HowTo 步骤数** (经 `getCategoryHowToSteps`):
- packaging: 7 步（材料选择 → 刀模设计 → 印刷 → 覆膜 → 烫金/UV → 模切 → 质检）
- paper-bags: 6 步（纸张 → 提手 → 尺寸 → 印刷 → 覆膜 → 成型）
- books: 7 步（排版 → 封面 → 内页印刷 → 封面覆膜 → 摺页 → 锁线胶装 → 精装成型）
- calendars: 5 步（图片整理 → 排版 → 纸张印刷 → 装订 → 包装）

**总 HowTo 注入数**: 主钻 4 品类 × 3 locale × 2 page 类型 (产品页+分类页) = **24 个页面** 注入 HowTo

**grep 验证**:
```bash
# P0-3: 新 schema-extensions.ts 存在 + 用了 HowTo/Speakable/Article
$ Get-ChildItem src/lib/seo/schema-extensions.ts
# ✅ 存在 (358 行)

$ Select-String src/app/[locale]/product/[slug]/page.tsx "HowTo|Speakable"
# 命中 9 处（含 import + 使用 + 渲染）
# ✅

$ Select-String src/app/[locale]/blog/[slug]/page.tsx "HowTo|Speakable|generateBlogArticleJsonLd|Person"
# 命中 5 处
# ✅
```

---

### P0-4: hreflang 重复 + 路径错（Home 11 项）

**根因**:
- `src/app/[locale]/layout.tsx:113-115` 手动 `{hreflangs.map(...)}` 渲染 hreflang `<link>` 标签
- `generateHreflangTags(safeLocale)` **不带 path 参数**，所以深层页（产品/分类）的 hreflang 全部指向 home URL
- 与 `metadata.alternates.languages`（Next.js 14+ 自动输出）**重复渲染**
- 双重 hreflang + 路径错 → Google 区域信号紊乱

**修法**:
- 删 `layout.tsx:113-115` 整段 `{hreflangs.map(...)}` JSX
- 删 `import { generateHreflangTags } from '@/lib/hreflang'` 这一行
- `src/lib/hreflang.ts` 函数保留（其他地方可能仍需手动调用）
- 完全靠 `metadata.alternates.languages` 输出 hreflang

**before**:
```tsx
// layout.tsx:103-115
const hreflangs = generateHreflangTags(safeLocale);  // ← 不带 path
// ...
{hreflangs.map((tag, i) => (
  <link key={i} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
))}
```

**after**:
```tsx
// layout.tsx:106 - hreflangs 变量删除
// layout.tsx:115-120 注释解释 P0-4 修复原因
// 完全靠 metadata.alternates.languages（已经在各 page.tsx 传了正确的 current page path）
```

**grep 验证**:
```bash
# P0-4: layout 不再手渲染 hreflang
$ Get-Content src/app/[locale]/layout.tsx | Select-String "hreflangs.map|generateHreflangTags"
# 输出：仅 1 处（在注释中解释为何删除）
# ✅ 已修（实际代码中 0 处）

$ Get-Content src/app/[locale]/layout.tsx | Select-String "import.*hreflang"
# ✅ 0 处（import 已删）
```

---

### P0-5: ItemList schema 缺 url/name（13 分类 + 1 case-studies）

**根因**:
- `src/app/[locale]/category/[slug]/page.tsx:103-113` 的 ItemList 已经有 url + name，但硬编码 `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zprintpro.com'}` 散在 page 里
- `src/app/[locale]/case-studies/page.tsx:334-352` 的 ItemList **完全缺 url/name**，只有 `item` 内嵌 Review
- V1 报告说"全 null"可能是旧版 build 抓取问题，但 case-studies 确实有 bug

**修法**:

#### 1) 新建 `generateCategoryItemListJsonLd(categoryName, products, locale)` 在 `schema-extensions.ts`:
- url 强制 `process.env.NEXT_PUBLIC_SITE_URL || 'https://zprintpro.com'` 显式兜底
- name 按 locale 选 `product.name` / `product.nameEn` / `product.nameJa`
- 每条 `ListItem` 含 `position` / `url` / `name` 三个标准字段

#### 2) `src/app/[locale]/category/[slug]/page.tsx`:
- 删旧的 inline `itemListJsonLd` (L103-113)
- 改用 `generateCategoryItemListJsonLd(categoryName, categoryProducts, locale)` (L105)

#### 3) `src/app/[locale]/case-studies/page.tsx`:
- 加 `SITE_URL` 显式兜底常量
- 给每条 `ListItem` 加 `name: ${cs.industry} - ${cs.client}` + `url: ${SITE_URL}/${locale}/case-studies/#case-${i+1}`
- 给内嵌 Review 的 `itemReviewed` 加 `url: SITE_URL`
- 整个 ItemList 顶部加 `name: t.h1`

**before** (case-studies L334-352):
```ts
const reviewSchema = {
  '@type': 'ItemList',
  // ← 缺 name
  itemListElement: t.caseStudies.map((cs, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    // ← 缺 name
    // ← 缺 url
    item: { '@type': 'Review', ... },
  })),
};
```

**after** (case-studies L334-365):
```ts
const reviewSchema = {
  '@type': 'ItemList',
  name: t.h1,   // ← 新增
  itemListElement: t.caseStudies.map((cs, i) => {
    const title = `${cs.industry} - ${cs.client}`;   // ← 新增
    return {
      '@type': 'ListItem',
      position: i + 1,
      name: title,   // ← 新增
      url: `${SITE_URL}/${locale}/case-studies/#case-${i + 1}`,   // ← 新增
      item: { '@type': 'Review', ..., itemReviewed: { ..., url: SITE_URL } },   // ← 补 url
    };
  }),
};
```

**grep 验证**:
```bash
# P0-5: category/case-studies ItemList 都有 url + name
$ Select-String src/app/[locale]/category/[slug]/page.tsx "itemListElement" -Context 3
# 改用 generateCategoryItemListJsonLd（新模块在 schema-extensions.ts）
# ✅

$ Select-String src/app/[locale]/case-studies/page.tsx "itemListElement|url:|name:" -Context 3
# 输出：name: t.h1, name: title, url: SITE_URL/...
# ✅ 全部带 url + name
```

---

## 4. 验证结果

### 4.1 Build 验证

```bash
$ cd F:\zprintpro-nextjs
$ npm run build
```

**结果**: ✅ **Compiled successfully**
- Next.js 14.1.0 编译通过
- TypeScript 类型检查通过（修了一处 `@type` 重复定义）
- 静态生成 5/5 页面成功
- 边缘运行时警告（pre-existing, 与本次修改无关）
- Sitemap 生成 417 个 URL（13 分类 + 79 产品 + 31 博客 + 16 静态页 × 3 locales = 417）

### 4.2 Lint 验证

```bash
$ npm run lint
```

**结果**: ⚠️ **未配置**
- `next lint` 命令要求先配置 ESLint
- 项目根目录无 `.eslintrc*` 或 `eslint.config.*`
- 这次不能跳过 eslint config setup（属非 P0 范围）
- 已在交付报告中标记为 "todo"

**注**: Build 的 "Linting and checking validity of types" 已包含 type check 并通过。等价于 tsc --noEmit 通过。

### 4.3 SEO 完整性脚本

```bash
$ npm run seo:check
```

**结果**: ⚠️ **脚本不存在**
- `scripts/check-category-seo-completeness.js` 在 `package.json` 第 12 行被引用，但文件不存在
- `npm run sku:check` 同理（`scripts/check-product-sku-completeness.ts` 也不存在）
- 跳过（属 P0 范围外 — 脚本重建是独立任务）

**注**: 已用 grep 验证代替 5 个 P0 的代码层修复。

### 4.4 全局 grep 验证

```powershell
# P0-1: product page 使用 productTitle / productDescription
$ Select-String src/app/[locale]/product/[slug]/page.tsx "generateProductJsonLd\(|productTitle|productDescription"
# 输出 7 处命中 (L146/L147 import, L170 generateProductJsonLd(productTitle, productDescription, ...), L183 productTitle)
# ✅

# P0-2: en/ja 分支末尾用 'ZprintPro' 而非 siteConfig.name
$ Select-String src/lib/seo.ts "brandSuffix"
# L325: const brandSuffix = locale === 'zh-hk' ? siteConfig.name : 'ZprintPro';
# L327/329/330: 三处使用
# ✅

# P0-3: schema-extensions.ts 存在 + 用了 HowTo/Speakable/Article
$ Get-ChildItem src/lib/seo/schema-extensions.ts
# 存在 (358 行) ✅

# P0-4: layout 不再手渲染 hreflang
$ Select-String src/app/[locale]/layout.tsx "hreflangs.map|generateHreflangTags"
# 仅 1 处（注释中）
$ Select-String src/app/[locale]/layout.tsx "import.*hreflang"
# 0 处（import 已删）
# ✅

# P0-5: category/case-studies ItemList 都有 url + name
$ Select-String src/app/[locale]/case-studies/page.tsx "itemListElement|url:|name:" -Context 3
# 输出：name: t.h1, name: title, url: SITE_URL/...
# ✅
```

---

## 5. 商业影响预测（基于 V1 报告）

| 指标 | V1 基线 | 修复后 90 天目标 | Phase B 增量 |
|---|---|---|---|
| en 产品页中文泄漏 | 79/79 (100%) | 0/79 | **-100%** |
| Title 品牌重复 | 98/138 (71%) | ≤5/138 | **-95%** |
| HowTo 覆盖率 | 0/138 (0%) | ≥24/138 | **+17%**（主钻 4 品类 × 3 locale × 2 page） |
| Speakable 覆盖率 | 0/138 (0%) | ≥79/138 | **+57%**（产品页 + 分类页 + 博客） |
| Author (Person) 覆盖率 | 0/32 (blog) | 32/32 | **+100%** |
| ItemList 缺 url/name | 14/14 (100%) | 0/14 | **-100%** |
| hreflang 重复 | 1 (home) | 0 | **-100%** |

**预估询盘增量**: 修复完 → 排名上 → 询盘 +50-100% (与 V1 报告 §6.1 一致)

---

## 6. 剩余 P1/P2 优先级建议（不在本次范围）

### P1 — 1 周内修
| # | 问题 | 来源 | 工作量 | 备注 |
|---|---|---|---|---|
| P1-1 | Description 过长 (max 238 字符) | V1 §4.1 | 1 天 | 与 P0-1 联动（en 文案重写） |
| P1-2 | H1 含杂讯（与 title 重复） | V1 §4.2 | 0.5 天 | H1 = "{品类} - {核心卖点}" |
| P1-3 | hreflang en-CA 等区域信号弱 | V1 §4.3 | 0.5 天 | P0-4 已修主体，en-CA 微调 |
| P1-4 | 缺 core pages schema (Privacy/Terms/FAQ) | V1 §4.4 | 0.5 天 | `WebPage` + `ContactPage`/`AboutPage` |
| P1-5 | 21 个 Blog 是 stub 占位页 | V1 §4.5 | 3 周（内容） | Article + FAQ + 扩写 |
| P1-6 | 28 个 sitemap guide URL 返回 404 | V1 §4.6 | 0.5 天 | 301 重定向到 /en/blog/ |

### P2 — 1 月内优化
- P2-1: 32 个 Blog 缺 Article + Author (已部分修，blog page 全部用 Person type，但 stub blog 内容还需扩)
- P2-2: 缺 VideoObject
- P2-3: 缺 Service schema (rush-printing-delivery)
- P2-4: Internal linking 加密度
- P2-5: Blog topic cluster 串联
- P2-6: 缺 LocalBusiness schema (HK 地址)
- P2-7: AggregateRating 真实 review 数
- P2-8: H2 数量过少 (avg 3-4 vs 竞品 8+)

### 工具 / 监控
- ESLint config setup（`npm run lint` 当前无法跑）
- 重建 `scripts/check-category-seo-completeness.js` 和 `scripts/check-product-sku-completeness.ts`
- Phase C 监控（gsc_data.csv + seo-weekly-analyzer.py 已就绪）

---

## 7. 硬规则自检

| 规则 | 状态 |
|---|---|
| ❌ 出现 "智印港" | ✅ 0 处 |
| ❌ 出现 GBK 乱码 | ✅ 0 处（UTF-8 写入） |
| ❌ 缺 8 locale hreflang | ✅ 0 处（仅修 P0-4 重复，不动 languages 本身） |
| ❌ en 文案出现中文 | ✅ en product 标题/desc 用 productTitle/productDescription (locale 切换) |
| ❌ en 页 meta description 还含 "印刷即日速遞送貨" placeholder | ⚠️ 未触碰 rushDescriptions 表（zh-hk 字典，不影响 en/ja） |
| ❌ 删掉现有正常工作的代码 | ✅ 仅删 layout.tsx 重复 hreflang 渲染（属 P0-4 修复范围） |
| ❌ 改 Cloudflare runtime 配置 (wrangler.toml / next.config.js) | ✅ 0 处 |
| ❌ 改 package.json dependencies | ✅ 0 处 |
| ❌ 用 mavis-trash 删文件 | ✅ 0 处（未删任何文件） |

---

## 8. 文件位置

报告: `F:\zprintpro-nextjs\docs\phase-b-fixes-summary.md`
schema-extensions.ts: `F:\zprintpro-nextjs\src\lib\seo\schema-extensions.ts`
6 个修改文件: 见 §2 表

---

**报告结束**

*Phase B 5 个 P0 修复完成 — 2026-06-10 by ai-coder*
*下一步: Phase C 监控（gsc_data.csv + seo-weekly-analyzer.py）+ Phase B-P1 修复*
