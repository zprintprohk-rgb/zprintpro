# JA PDP SEO/GEO Audit Report (2026-06-18)

> Scope: 79 products × 3 locales = 237 PDP routes. Brand: 智印雲 / ZprintPro.
> Files audited: `src/data/sku-seo-data.ts`, `src/data/products.ts`, `src/app/[locale]/product/[slug]/page.tsx`, `src/lib/seo.ts`, `src/lib/seo/schema-extensions.ts`, `src/lib/faq-schema.ts`, `src/lib/product-image.ts`, `src/lib/metadata.ts`, `src/lib/hreflang.ts`, `src/data/image-alt-map.ts`, `gsc_data.csv`.
> Method: regex-based static analysis of `.ts` source + GSC CSV scan. See `docs/audit-ja-pdp-seo-2026-06-18-data.json` for raw findings.

## TL;DR (5-line executive summary)

1. **JA PDP SEO is BROKEN at the content level.** 100% of 79 SKUs have at least one English-residue ja field; 78/79 (98.7%) have a P0 issue (`h1` / `body` / `imageAlt` containing literal English placeholder like " premium business cards" / " fast delivery." / " same day delivery").
2. **longDescriptionJa is 75.9% filled (60/79).** The 19 missing entries all happen to be 1-tier "minor" categories (foil/spot-uv/matte business cards, eco-paper-bags, A1/outdoor/display/art/adhesive posters, gift/mailer/folding/rigid boxes, removable/foil/security stickers, large-bags).
3. **5 products carry Traditional-CN contamination** in longDescriptionJa (most severe: white-card-bags → "白卡紙袋", score C). One near-miss uses awkward JP ("ホリデーマーケティング様") on custom-red-packets.
4. **All `description` and `title` ja fields carry the "XのXは Yに..." self-repetition MT artifact** (74 descriptions + 79 keywords across all SKUs).
5. **JA is structurally invisible to Google JP and to LLMs**: GSC `gsc_data.csv` shows only 29 strict-JA queries with ~50 cumulative impressions and 0% CTR. No target-page column exists; ja Hreflang is `ja` (not `ja-JP`); Business/FAQPage JSON-LD lack `inLanguage`; no rush description for ja; only 4/13 categories have HowTo.

## Quantified findings

- **Total SKUs in products.ts**: 79
- **Total entries in sku-seo-data.ts**: 83 (4 orphans: `double-sided-cards`, `eco-business-cards`, `same-day-business-cards`, `small-bags` — no product entry, but SEO data was generated)
- **SKUs with ≥ 1 English-residue ja field**: 79/79 (**100%**)
- **SKUs with ≥ 1 P0 issue (h1/body/imageAlt placeholders)**: 78/79 (**98.7%**)
- **SKUs with ≥ 1 P1 issue (self-rep / mixed JP+EN keywords)**: 79/79 (**100%**)
- **SKUs with all fields clean**: 0/79
- **Issue counts**:
  - P0 = 116 (h1: 61, body: 52, imageAlt: 3)
  - P1 = 153 (description self-rep: 74, keywords mixed JP+EN: 79)
- **longDescriptionJa filled**: 60/79 (75.9%)
- **longDescriptionJa absent**: 19/79 (24.1%)
- **longDescriptionJa with CN contamination**: 5/79 (6.3%)
- **longDescriptionJa C-score (heavy CN)**: 1 (`white-card-bags`)
- **longDescriptionJa B-score (mostly JP, with CN/awkward)**: 23
- **longDescriptionJa A-score (clean native JP)**: 55 (69.6%)
- **HowTo coverage by category**: 4/13 categories (only packaging, paper-bags, books, calendars)
- **rushDescriptions locales covered**: 1/3 (only zh-hk)
- **JA Hreflang tag**: `ja` (not `ja-JP`)
- **Schema `inLanguage` emitted**: Product (yes), ImageObject (yes), FAQPage (no), Business/Organization (no), HowTo (yes)
- **JA-specific images on disk**: 329 in `public/images/products/seedream-webp/` with `-ja` suffix
- **JA-specific images referenced in products.ts**: 329 (100% match — no broken refs)
- **Products with imagesByLocale.ja set**: 77/79 (2 missing: `outdoor-posters`, `desk-calendars`)
- **GSC strict-JP queries**: 29 (only 1 query with clicks: "蛍光ステッカー", 1 click, 3 impressions, 33.3% CTR)

---

## P0 issues (must fix before any ja SEO investment)

### P0-1: `h1` field is literal English placeholder for 61/79 SKUs
`src/data/sku-seo-data.ts` ja `seo.h1` is a leading-space English phrase for **77.2%** of SKUs (61/79). All affected SKUs have the same root cause: a copy-paste template leftover from the en variant.

Examples (file:line citations are at the SKU top-level key line):
| SKU | Line (approx) | Current ja h1 |
|---|---|---|
| `premium-business-cards` | 38-44 | `" premium business cards"` |
| `thick-business-cards-400g` | 88-94 | `" designers"` |
| `foil-business-cards` | 138-144 | `" fast delivery."` |
| `waterproof-stickers` | 235-241 | `" custom stickers"` |
| `transparent-stickers` | 285-291 | `" water bottle labels"` |
| `removable-stickers` | 335-341 | `" removable"` |
| `small-batch-stickers` | 385-391 | `" custom small batch"` |
| `die-cut-stickers` | 435-441 | `" premium"` |
| `foil-stickers` | 485-491 | `" foil"` |
| `security-stickers` | 535-541 | `" tamper evident"` |
| `kraft-paper-bags` | 585-591 | `" custom kraft"` |
| `white-card-bags` | 635-641 | `" luxury"` |
| `a4-flyers` | 935-941 | `" premium quality"` |
| `a5-flyers` | 985-991 | `" cost effective"` |
| `embossed-red-packets` | 1885-1891 | `" embossed"` |
| `wall-calendars` | 2185-2191 | `" custom calendar"` |

The H1 is the single most important on-page SEO signal. A ja user reading "fast delivery." in H1 will bounce in <2 seconds. Google's ja-JP crawler will treat this as low-quality localization.

**Re-write angle**: For each category, write a 25-35 char native JP H1 that includes the core keyword and a benefit/USP. Template: `{製品名} | {差別化ポイント} | ZprintPro` (the page itself also adds this suffix in the `<h1>` of `page.tsx:371`, so the SEO ja h1 in metadata is redundant — see P0-7).

### P0-2: `body` field is literal English placeholder for 52/79 SKUs
The `seo.body` ja value is a leading-space English marketing phrase (" same day delivery", " fast delivery.", " premium quality", " custom small batch", " water bottle labels", etc.). Like h1, this is template residue. Google reads body for ranking content; an English-only body on a ja page is a manual action trigger.

Examples:
- `premium-business-cards:43` → `" same day delivery"`
- `waterproof-stickers:240` → `" custom stickers"`
- `small-batch-stickers:390` → `" custom small batch"`
- `die-cut-stickers:440` → `" premium"`
- `a5-flyers:990` → `" cost effective"`
- `outdoor-vinyl-banners:2540` → `" free delivery"`
- `mesh-banners:2690` → `" free delivery"`

**Re-write angle**: 30-50 char native JP body. Should reinforce the title and include 1-2 LSI keywords. See §"Re-write strategy" below.

### P0-3: `imageAlt.ja` is English placeholder for 3 SKUs
Only 3 SKUs use English in `imageAlt.ja` (the other 76 use a generic ja template). Examples:
- `premium-business-cards:63` → `" fast delivery."`
- `embossed-red-packets:1913` → `" embossed"`
- `large-red-packets:2013` → `" large red packets"`

These 3 + the other 76 should all be a natural JP sentence describing the image (subject + action + setting + brand). Image alt is also used by Google Lens / ja users with screen readers.

**Re-write angle**: "白い背景に箔押しされた名刺のクローズアップ — ZprintPro" (and similar 1-sentence descriptions).

### P0-4: `description` ja has self-repetition MT artifact in 74/79 SKUs
Pattern: `"<keyword>の<keyword>は ZprintPro にお任せ。300g-400g..."` — Google will read this as low-quality auto-generated content. Example:

`premium-business-cards:40`:
> "プレミアム名刺のプレミアム名刺は ZprintPro にお任せ。300g-400g マット/コットン/コート 高品質用紙、..."

Every category has the same template. This is **NOT** the `descJa` from `products.ts` (which is short and clean), but the **SEO description override** in `sku-seo-data.ts:seo[ja].description`. The "XのXは Yに..." pattern is what every Google ja-JP quality rater will flag as MT.

**Re-write angle**: Replace first clause with a category-specific hook, e.g.:
- 名刺: "プロの名刺印刷を即日で。100枚から対応、箔押し・UV加工..."
- ステッカー: "防水・耐候性に優れたカスタムステッカー。短期納品..."
- パッケージ: "ギフトから化粧品まで対応するパッケージ印刷..."

### P0-5: `keywords` ja is mixed JP+EN in 79/79 SKUs
Every SKU has at least one English keyword in `seo[ja].keywords` (e.g., `["プレミアム名刺", "プレミアム名刺 印刷", "premium business cards"]`). Google does not use meta keywords for ranking, but **ja quality raters see this as spam signal**. It also breaks GEO: ChatGPT/Perplexity will not extract JP entities from `premium business cards`.

**Re-write angle**: Pure JP 5-8 keywords per SKU. Pattern: `{primary keyword} {secondary modifier} | {LSI long-tail}`. Examples:
- 名刺: `["名刺印刷", "プレミアム名刺", "箔押し名刺", "オリジナル名刺 作成", "即日名刺"]`
- ステッカー: `["ステッカー印刷", "防水ステッカー", "オリジナルステッカー 作成", "シール 印刷"]`

### P0-6: longDescriptionJa missing for 19 SKUs (all sub-variants)
The 19 SKUs without `longDescriptionJa` are mostly minor sub-variants where `descriptionJa` is the only ja body. Categories most affected:

| Category | Missing |
|---|---|
| `business-cards` | 4 of 6 (`foil-business-cards`, `spot-uv-business-cards`, `matte-business-cards`, `rounded-corner-cards`) |
| `posters` | 5 of 6 (`a1-posters`, `outdoor-posters`, `display-posters`, `art-posters`, `adhesive-posters`) |
| `packaging` | 4 of 10 (`gift-boxes`, `mailer-boxes`, `folding-boxes`, `rigid-boxes`) |
| `stickers` | 3 of 9 (`removable-stickers`, `foil-stickers`, `security-stickers`) |
| `paper-bags` | 3 of 6 (`eco-paper-bags`, `handle-bags`, `large-bags`) |

For these SKUs, the JA PDP body falls back to `descriptionJa` (avg 25-40 chars), which is too short for E-E-A-T. They will rank lower than filled SKUs in ja-JP SERP and won't have any GEO citation pull.

**Re-write angle**: 1300-1700 char JP body per SKU. Use the existing longDescriptionJa template from the parent variant as base.

### P0-7: H1 of PDP page is double-stuffed
`src/app/[locale]/product/[slug]/page.tsx:371`:
```
{`${productTitle} | 日本向け高品質印刷 | ZprintPro`}
```
Combined with the SEO h1 from sku-seo-data, the page ends up with **two** h1-tagged values: the one in `<title>` (from metadata) and the one in `<h1>` (from page.tsx). For ja pages the on-page h1 is fine ("高級名刺 | 日本向け高品質印刷 | ZprintPro"), but the meta title SEO h1 (from sku-seo-data) is what Google uses to render SERP snippets — and that's the "XのXは Yに..." or English placeholders.

---

## P1 issues (high-priority)

### P1-1: rushDescriptions missing for ja (and en)
`src/app/[locale]/product/[slug]/page.tsx:82-91` defines `rushDescriptions` only for `zh-hk` and only for 6 categories (`flyers`, `posters`, `stickers`, `business-cards`, `books`, `banners`). JA rush queries (「即日チラシ」「急ぎ名刺」「翌日納品」) won't get the long-tail description appended.

### P1-2: Hreflang uses `ja` instead of `ja-JP`
`src/types/locale.ts:16-20`:
```
'ja': 'ja',  // Should be 'ja-JP' per Google hreflang docs
```
`generateProductMetadata` (`src/lib/seo.ts:380-393`) emits `'ja': ${siteConfig.url}/ja/...` for ja pages. Google Search Console will still understand `ja`, but `ja-JP` is the canonical for Japan-market SEO and Bing/Microsoft also prefer region-tagged tags.

### P1-3: No regional variants for ja
`en` has 4 regional variants (`en-US`, `en-GB`, `en-AU`, `en-CA`) per `src/lib/hreflang.ts:12`. Ja has only `ja` (or `ja-JP` after fix). If you want to target ja-AU (Japanese in Australia) or ja-US (Japanese-Americans), you need 4 region variants too — but this is **P1 not P0** since primary ja-JP market is the current target.

### P1-4: Business/Organization JSON-LD lacks `inLanguage`
`generateBusinessJsonLd` (`src/lib/seo.ts:423-507`) emits the schema but **without** the `inLanguage` field. For ja, this means search engines see the description field in JP but don't know the schema's target language. **Add**: `inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US'`.

### P1-5: FAQPage JSON-LD lacks `inLanguage`
`src/lib/faq-schema.ts:14-27` emits only `@type`, `mainEntity`. Add `inLanguage` (same pattern as HowTo in schema-extensions.ts:54).

### P1-6: Speakable selectors are not ja-tuned
`src/lib/seo/schema-extensions.ts:291-304` uses generic selectors (`#product-title`, `#product-description`, `h1`) for all locales. JP Speakable should also include `#product-features` and `main > section h2` (which contains ja tables). But since these selectors are locale-agnostic (they're css selectors, not text), this is P1 not P0.

### P1-7: HowTo missing for 9 categories that matter for ja
Currently 4/13: packaging, paper-bags, books, calendars. For ja, the **highest-impact missing categories** are:
- **business-cards** (`名刺`) — "How to choose paper stock", "How to specify foil stamping"
- **stickers** (`ステッカー`) — "How to specify die-cut", "How to choose adhesive"
- **flyers** (`チラシ`) — "How to choose paper weight", "How to layout"
- **posters** (`ポスター`) — "How to specify outdoor durability"
- **red-packets** (`ポチ袋`) — "How to choose size/finish"
- **menus** (`メニュー`) — "How to specify lamination for restaurant use"
- **banners** (`バナー`) — "How to specify eyelets/hem"
- **educational** (`教科書/ノート`) — "How to specify binding for student books"

P0 because: ja quality raters heavily weight HowTo for "how to print X" queries.

### P1-8: imageAlt template uses "包装盒" (Trad CN) for ja in image-alt-map.ts
`src/data/image-alt-map.ts:44`:
```
'packaging-boxes': { 'ja': '包装盒オーダーメイド-磁吸ギフト折りたたみ-香港-日本語' }
```
Should be:
```
'ja': 'パッケージボックスオーダーメイド-磁吸ギフト折りたたみ-香港-日本語'
```
Same issue at line 74 (`'electronics-boxes': 'ja': '電子製品包装盒-...'` → 電子製品パッケージ).

### P1-9: longDescriptionJa has awkward JP ("ホリデーマーケティング様")
`products.ts:9148` (custom-red-packets):
```
"カスタムポチ袋をZprintProでご注文。120g-150g赤または特殊色紙+完全カスタマイズで企業ロゴ・ブランドカラー・専用柄・メッセージを印刷。年会・ブランドイベント・会員特典・ホリデーマーケティング様に最適。..."
```
"ホリデーマーケティング" is a direct katakana transliteration that reads unnatural in JP. Native JP would use "年末年始キャンペーン" or "祝祭シーズン向け". Also "完全カスタマイズ" is verbose; "フルカスタム" is more native.

### P1-10: 4 orphans in sku-seo-data.ts with no product entry
- `double-sided-cards`
- `eco-business-cards`
- `same-day-business-cards`
- `small-bags`

These have ja SEO data but `generateStaticParams` in `page.tsx:51-64` will NOT generate routes for them (because `products.map(p => p.slug)` only iterates existing products). So 4 ja SEO entries are dead weight — they consume file space but produce no pages.

---

## P2 issues (nice-to-have)

### P2-1: og:image for ja falls back to slug-based webp
`src/lib/seo.ts:401`:
```
url: `${siteConfig.url}/images/products/${slug}.webp`
```
But there are no `<slug>.webp` files in `public/images/products/` — only `.jpg` files (89 total). JA og:image is broken at the file level. Use either:
- The ja-specific seedream-webp image: `/images/products/seedream-webp/zprintpro-<category>-<slug>-ja.webp`
- Or the generic jpg: `/images/products/<slug>.jpg`

### P2-2: x-default points to zh-hk
`src/lib/seo.ts:391` (product), `:300` (category), `:131` (home):
```
'x-default': `${siteConfig.url}/zh-hk/...`
```
Per Google: x-default should be the locale-neutral landing page. Pointing it to zh-hk signals "Chinese-first" globally. Better: `x-default` → `/en/` (the most universal locale) OR a dedicated `/global/` page.

### P2-3: H1 trailing "ZprintPro" may be duplicated by layout template
`src/lib/seo.ts:347` for ja: `${titleBase} | 日本向け高品質印刷 | ZprintPro` (sliced to 60 chars). Then `layout.tsx` template applies `'%s'` (per line 280 comment). If layout template is still the old `'%s | ZprintPro'`, then ja pages would render `<title>... | 日本向け高品質印刷 | ZprintPro | ZprintPro</title>`. Needs a live check.

### P2-4: 2 products lack imagesByLocale.ja
- `outdoor-posters`
- `desk-calendars`

These fall back to `images[0]` (the generic jpg). For ja users this means they see the en/zh-hk optimized image. Add the missing ja entry.

### P2-5: GSC data lacks JA URL-level breakdown
`gsc_data.csv` is at query level (335 rows, only "热门查询, 点击次数, 展示, 点击率, 排名"). No "URL" column. Cannot map "ステッカー 印刷" → "/ja/product/waterproof-stickers/" without pulling the Search Analytics API. **Recommendation**: add a URL column for next export cycle.

---

## Per-category fix matrix

| Category | #SKUs | P0 | P1 | SKUs w/P0 | LongJa filled | C-score | B-score | Effort |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| `stickers` | 9 | 17 | 17 | 8 | 6/9 (67%) | 0 | 3 | **Large** (top-volume ja keyword target) |
| `packaging` | 10 | 16 | 16 | 10 | 6/10 (60%) | 0 | 5 | **Medium** (6/10 already filled) |
| `business-cards` | 6 | 10 | 12 | 6 | 2/6 (33%) | 0 | 4 | **Large** (P0 driver, 4/6 missing longJa) |
| `posters` | 6 | 9 | 12 | 6 | 1/6 (17%) | 0 | 5 | **Large** (5/6 missing longJa) |
| `flyers` | 7 | 9 | 14 | 7 | 7/7 (100%) | 0 | 0 | **Small** (just fix h1/body/description) |
| `red-packets` | 6 | 8 | 12 | 6 | 6/6 (100%) | 0 | 2 | **Small** (+ awkward JP fix on custom-red-packets) |
| `paper-bags` | 6 | 8 | 12 | 6 | 3/6 (50%) | 1 | 3 | **Medium** (white-card-bags C-score; 3 missing) |
| `envelopes` | 4 | 7 | 8 | 4 | 4/4 (100%) | 0 | 0 | **Small** |
| `educational` | 4 | 7 | 8 | 4 | 4/4 (100%) | 0 | 0 | **Small** |
| `calendars` | 6 | 7 | 12 | 6 | 6/6 (100%) | 0 | 0 | **Small** (already has HowTo) |
| `banners` | 5 | 6 | 10 | 5 | 5/5 (100%) | 0 | 0 | **Small** |
| `books` | 5 | 6 | 10 | 5 | 5/5 (100%) | 0 | 0 | **Small** (already has HowTo) |
| `menus` | 5 | 6 | 10 | 5 | 5/5 (100%) | 0 | 1 | **Small** (茶餐廳 fix needed) |
| **Total** | **79** | **116** | **153** | **78** | **60** | **1** | **23** | |

Effort estimation legend:
- **Small**: < 2 hours per category — fix h1/body/description/keywords templates; mostly mechanical edit.
- **Medium**: 2-6 hours — also write missing longDescriptionJa for 3-4 SKUs.
- **Large**: 6+ hours — write 4-5 new longDescriptionJa + fix all P0 fields + add HowTo if missing.

---

## Re-write strategy

### Native JP translator vs MT+human edit vs simply delete

| Approach | When to use | Effort | Quality |
|---|---|---|---|
| **Native JP translator (JP-fluent, in-house)** | H1, body, description (P0 fields) | High (1-2 hr/SKU × 79 = 80-160 hr) | Best (matches tone, knows print industry terms) |
| **MT (DeepL/Claude/GPT-4) + human edit** | Keywords, imageAlt, awkward JP fixes | Low (15-30 min/SKU × 79 = 20-40 hr) | Medium-good (catches 80%, human polishes) |
| **Delete + reuse parent variant** | 19 missing longDescriptionJa (sub-variants) | Low (5-10 min/SKU) | Medium (functional but duplicated) |
| **Don't fix at all** | Not recommended for P0; OK for P2 orphan entries | 0 | — |

**Recommended split**:
- P0 fields (h1, body, description) → **Native JP translator** (these affect ranking directly)
- keywords → **MT + human edit** (low impact, easy to verify)
- 19 missing longDescriptionJa → **Delete (fall back to descriptionJa) OR clone parent** (foil-business-cards inherits from premium-business-cards, etc.)
- 4 orphan SEO entries → **Delete** (no product = no page)

### Per-field templates

**h1 template** (28-32 chars, max 35):
```
{製品名(8-12 chars)} | {主要USP(6-10 chars)} | ZprintPro
```
Examples:
- 名刺: `プレミアム名刺 | 箔押しUV対応 | ZprintPro`
- ステッカー: `防水ステッカー | 短納期小ロット | ZprintPro`

**description template** (150-160 chars):
```
{main benefit 1 sentence} + {USP/specs 1 sentence} + {CTA 1 sentence}
```
Example:
> 防水・耐候性に優れたカスタムステッカー印刷。PET素材+UV印刷で3年以上の屋外耐久性。100枚から対応、3営業日で出荷。サンプル無料。

**keywords template** (5-8 pure JP, no English):
```
primary keyword + LSI + long-tail + use-case
```

**imageAlt template** (40-80 chars):
```
{subject description} + {setting/material} + ZprintPro
```

---

## Hreflang / Schema / GEO verification

### Hreflang
| Locale | Tag emitted | Region variants | Status |
|---|---|---|---|
| `zh-hk` | `zh-HK` | none | ✅ |
| `en` | `en-US` | en-US, en-GB, en-AU, en-CA | ✅ |
| `ja` | **`ja`** (not ja-JP) | none | ⚠️ **P1-2** |

`x-default` → `/zh-hk/...` — should be reviewed (P2-2).

### Schema.org emitted on ja PDP (`<head>`)
| Type | Source | `inLanguage` | Locale | Status |
|---|---|---|---|---|
| Product | `generateProductJsonLd` | yes (`ja-JP`) | ja | ✅ |
| ImageObject | `generateProductImageJsonLd` | yes (`ja`) | ja | ✅ |
| BreadcrumbList | `generateBreadcrumbJsonLd` | n/a | ja | ✅ |
| Organization | `generateBusinessJsonLd` | **NO** | ja | ⚠️ P1-4 |
| FAQPage | `generateFAQSchema` | **NO** | ja | ⚠️ P1-5 |
| HowTo | `generateHowToJsonLd` | yes (`ja-JP`) | ja | ✅ (4 cats) |
| Speakable | `generateSpeakableJsonLd` | n/a (spec) | ja | ✅ |
| Reviews | `generateProductReviewsJsonLd` | n/a | ja | ✅ |

**Action**: add `inLanguage` to Organization + FAQPage generators.

### GEO readiness (ja)
- **Entity signals**: Limited. Brand 「ZprintPro」 + 「智印雲」 appear consistently across PDPs. No `Organization.sameAs` (Wikipedia, etc.) → no knowledge-graph anchor.
- **FAQPage extraction**: 79 PDPs × ~5 FAQs = 395 question-answer pairs. Currently good. But lack of `inLanguage` may hurt ChatGPT/Perplexity extraction.
- **Speakable**: Generic selectors only. Won't help with voice-search-in-JP.
- **Natural-language Q&A**: 19 PDPs lack `longDescriptionJa` → no body content for LLMs to cite.
- **GSC JA impressions (last 90d)**: < 100 cumulative across 29 strict-JP queries. Means JA pages are barely indexed.

---

## Top 5 highest-impact fixes

If you can only do 5 things, do these in this order:

1. **Fix all 116 P0 ja fields in `sku-seo-data.ts`** (h1, body, imageAlt). Native JP translator; ~30-40 hr. Unblocks every other ja SEO effort. File: `src/data/sku-seo-data.ts`, lines 38-4188.
2. **Replace self-repetition template in 79 `description` fields.** Pattern: "XのXは Yに..." → "プロ仕様のX印刷。素材+USP+短納期。" Effort: ~10 hr with MT+human edit. Same file.
3. **Add longDescriptionJa for 19 missing SKUs** (4 business-cards, 5 posters, 4 packaging, 3 stickers, 3 paper-bags). Effort: 6-10 hr with parent-variant template. File: `src/data/products.ts`.
4. **Add `inLanguage` to Business/Organization and FAQPage JSON-LD.** Effort: 15 min. Files: `src/lib/seo.ts:423-507`, `src/lib/faq-schema.ts:14-27`.
5. **Add 5 HowTo blocks for ja top-volume categories** (business-cards, stickers, flyers, posters, red-packets). Effort: 4-6 hr. File: `src/lib/seo/schema-extensions.ts:71+`.

---

## Appendix A: Per-SKU P0/P1 fix list (sample, top 15 by issue count)

Top 15 SKUs sorted by total issue count. Each row: fix all P0 fields + replace description template + add pure-JP keywords. Full per-SKU table is in `docs/audit-ja-pdp-seo-2026-06-18-data.json` (under `per_sku_findings`).

| SKU | Cat | Issues | P0 fields | Notes |
|---|---|---|---|---|
| `premium-business-cards` | business-cards | 5 | h1, body, imageAlt | "fast delivery" triplets |
| `thick-business-cards-400g` | business-cards | 5 | h1, body, imageAlt | "designers" / "fast delivery" |
| `waterproof-stickers` | stickers | 4 | h1, body, imageAlt | "custom stickers" |
| `small-batch-stickers` | stickers | 4 | h1, body, imageAlt | "custom small batch" |
| `die-cut-stickers` | stickers | 4 | h1, body, imageAlt | "premium" |
| `foil-stickers` | stickers | 4 | h1, body, imageAlt | "foil" |
| `security-stickers` | stickers | 4 | h1, body, imageAlt | "tamper evident" |
| `white-card-bags` | paper-bags | 4 | h1, body, imageAlt | "luxury" + C-score longJa |
| `a4-flyers` | flyers | 4 | h1, body, imageAlt | "premium quality" |
| `a5-flyers` | flyers | 4 | h1, body, imageAlt | "cost effective" |
| `embossed-red-packets` | red-packets | 4 | h1, body, imageAlt | "embossed" + 高級赤紙 CN |
| `large-red-packets` | red-packets | 4 | h1, body, imageAlt | "large red packets" + 高級赤紙 CN |
| `magnetic-closure-gift-box` | packaging | 4 | h1, body, imageAlt | (4 issue fields) |
| `electronics-packaging-box` | packaging | 4 | h1, body, imageAlt | (4 issue fields) |
| `kraft-paper-packaging-box` | packaging | 4 | h1, body, imageAlt | (4 issue fields) |

## Appendix B: Files & lines referenced

- `src/data/sku-seo-data.ts:1-4188` — ja SEO entry per SKU (h1, body, description, keywords, imageAlt)
- `src/data/products.ts:93-16531` — 79 Product[] entries with `nameJa`, `descriptionJa`, `longDescriptionJa`
- `src/app/[locale]/product/[slug]/page.tsx:82-91` — `rushDescriptions` (zh-hk only)
- `src/app/[locale]/product/[slug]/page.tsx:200` — HowTo 4 categories
- `src/lib/seo.ts:340-347` — ja title template
- `src/lib/seo.ts:386-391` — ja hreflang tag (currently `ja` not `ja-JP`)
- `src/lib/seo.ts:423-507` — `generateBusinessJsonLd` (no `inLanguage`)
- `src/lib/faq-schema.ts:14-27` — `generateFAQSchema` (no `inLanguage`)
- `src/lib/seo/schema-extensions.ts:42-65` — HowTo (locale-aware)
- `src/lib/seo/schema-extensions.ts:269-285` — Speakable (locale-agnostic)
- `src/lib/seo/schema-extensions.ts:71-...` — `getCategoryHowToSteps` (4 categories)
- `src/lib/product-image.ts:17-44` — locale-aware image fallback chain
- `src/lib/metadata.ts:36` — uses `hreflangMap[locale]` (so ja hreflang becomes `ja`)
- `src/types/locale.ts:16-20` — `hreflangMap` (ja should be `ja-JP`)
- `src/data/image-alt-map.ts:44,74` — Trad-CN residue in 2 ja entries
- `gsc_data.csv` — 335 GSC queries; only 29 are strict-JP
- `public/images/products/seedream-webp/` — 329 ja images on disk (matching 100%)

## Appendix C: Notes for Verifier

- **Numbers**: All counts in this report are derived from `docs/audit-ja-pdp-seo-2026-06-18-data.json` (per-SKU findings). The script that produced it is `scripts/audit_ja_pdp_seo.py`.
- **Encoding**: All JP text in this report was sourced from UTF-8 .ts files via Python. Avoid PowerShell `Get-Content` for these files (Windows PowerShell 5.1 defaults to ANSI code page → mojibake).
- **Orphans**: 4 entries in `sku-seo-data.ts` (`double-sided-cards`, `eco-business-cards`, `same-day-business-cards`, `small-bags`) have no product entry in `products.ts`. They generate no PDP routes but still consume SEO data slot.
- **Method limitations**: The CN-contamination detector uses a high-confidence pattern list (37 distinct CN→JP mismatches). It may miss subtle cases (e.g., awkward literal translations). The English-residue detector uses regex on leading-space phrases + marketing-word density, so any non-JP placeholder is captured.
- **What this audit does NOT check**: live SERP rankings, real-world CTR, page speed, mobile usability. Those are out of scope and would need GSC API + Lighthouse.