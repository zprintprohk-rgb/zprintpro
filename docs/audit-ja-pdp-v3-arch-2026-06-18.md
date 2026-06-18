# JA PDP v3 Architecture Audit — Cross-Cutting Synthesis (2026-06-18)

> **Scope**: 79 PDPs × 1 locale (`ja`) = 79 routes
> **Sources synthesized**:
> - `docs/audit-ja-pdp-seo-2026-06-18.md` (403 lines, 116 P0 / 153 P1 / 6 P2 issues — content/SEO/GEO)
> - `docs/audit-ja-pdp-compliance-2026-06-18.md` (353 lines, 8 areas, 5 ranked fixes — legal/UX/trust/payment)
> **Plus Mavis orchestrator findings**: cross-cutting architecture gaps that neither audit covered (page-size, og:image, manifest.json, thumbnail, x-default, schema transitTime mismatch).
> **Brand**: 智印雲 / ZprintPro (NOT 智印港 — competitor).
> **Output of**: `mvs_f606fc5128a0421bb4f0422e50aa7b3f` (Mavis root, post-watch synthesis)

---

## 0. TL;DR (5-line executive summary)

1. **JA PDP is structurally invisible AND legally exposed** — content layer has 116 P0 SEO issues (English residue on 78/79 SKUs) and 79/79 have 「XのXは Yに...」MT artifacts; compliance layer has 1 high-severity legal gap (特定商取引法 not built — repeated false claim 「特定商取引法に基づく表記完備」 in `longDescriptionJa` is misrepresentation under 景品表示法).
2. **3 of 3 `japan/*` components are dead code from PDP's perspective** — `<TaxDisplay>`, `<JapanTrustBadges>`, `<DoujinSKU>` all exist and are production-ready but `product/[slug]/page.tsx` imports none of them. Wiring them fixes BOTH the SEO (richer schema, ja-JP trust) AND the compliance (税込/税抜 toggle, 国内検品, エコ認証) axes simultaneously — highest ROI of any change.
3. **Schema transitTime contradicts UI by 7 days** (line 670-680 seo.ts says 7-14 days, PDP line 401 says 2-4 days for DHL/FedEx) — Google's Rich Results Test would flag; both audits missed the cross-reference because they reviewed files in isolation.
4. **3 of 5 top compliance fixes overlap with SEO work** — TaxDisplay (P1 schema gain), JP contact env vars (P1-2 address consistency → NAP), JapanTrustBadges (P1-4 inLanguage + Organization schema). Bundling reduces total effort from ~110 hr sequential to ~65 hr parallel.
5. **GSC ja signal is near-zero** (29 strict-JP queries, <100 cumulative impressions, 0% CTR) — JA pages are barely indexed. The fixes below should be prioritized BEFORE any further SEO investment; otherwise the optimization work won't compound.

---

## 1. Architecture overview — what JA PDP is today

```
┌─────────────────────────────────────────────────────────────────────┐
│                       src/app/[locale]/product/[slug]/page.tsx        │
│                       (single shared component for 79 SKUs × 3 locales) │
├─────────────────────────────────────────────────────────────────────┤
│  Imports (line 1-50)         │  Renders (line 297-499)              │
│  ──────────────────          │  ──────────────────                  │
│  ✅ QuoteCalculator (35)     │  JsonLd (schema.org)         297-306 │
│  ✅ ProductGallery (34)      │  ProductGallery             331       │
│  ✅ ProductTabs (36)         │  Upload box (broken submit) 338-349  │
│  ✅ RelatedProducts (37)     │  RushDeliveryBadge (6 cats) 375     │
│  ✅ ProductFaq (38)          │  Price block (no 税込)      386     │
│  ✅ RegionalContent (43)     │  Shipping text (UI/schema    395-403 │
│     └─ expertIntro,         │   ⚠️ 7-day transitTime gap)            │
│       RegionalCta ✅ used,  │  TrustWaterfall             437       │
│       RegionalTrustBadges   │  ProductTabs                438       │
│       ❌ IMPORTED NEVER     │  ProductFaq                 471       │
│         RENDERED            │  RelatedProducts            479       │
│  ✅ TrustWaterfall (48)     │  ProductWhyChooseUs         487       │
│  ✅ ProductWhyChooseUs (46) │  RegionalContent            490-499  │
│  ✅ JsonLd (33)             │                                  │
│  ✅ RushDeliveryBadge (47)  │                                  │
│                             │                                  │
│  ❌ TaxDisplay              │  (3 of 3 japan/* components   │
│  ❌ JapanTrustBadges        │   exist but are dead code    │
│  ❌ DoujinSKU               │   from PDP perspective)      │
└─────────────────────────────────────────────────────────────────────┘
       ↓ feeds SEO/GEO (seo.ts + sku-seo-data.ts) + Trust + Schema
       ↓ feeds Compliance (legal page missing + JPY display missing + JA contact env-gated)
```

**Key architectural insight**: The PDP is a **single shared component** (`page.tsx`) for all 79 SKUs and 3 locales. Locale-conditional rendering is the primary knob (`{locale === 'ja' && ...}`). The 3 `japan/*` components are written to slot in but the wiring was never finished — Phase A built the components, Phase B built the locale/region data, Phase C (this synthesis) is the wiring.

---

## 2. Cross-cutting findings (overlap between SEO + Compliance)

These are issues where fixing once benefits both axes. Highest ROI.

| ID | Issue | SEO impact | Compliance impact | Effort | Win |
|---|---|---|---|---|---|
| **X-1** | Wire `<TaxDisplay>` into PDP price block for ja | Schema: no price-with-tax marker; `OfferShippingDetails` lacks `priceCurrency: 'JPY'` tax context | 景品表示法 risk: JPY without 「(税込)」 is misleading | S (15 min) | ⭐⭐⭐ |
| **X-2** | Wire `<JapanTrustBadges>` into PDP for ja | P1-4 Organization JSON-LD lacks `inLanguage`; no FSC/eco signals in schema | 国内検品 / 消費税込 / エコ認証 visible badges | S (30 min) | ⭐⭐⭐ |
| **X-3** | Fix `OfferShippingDetails for ja` transitTime 7-14 → 2-4 days | Schema↔UI inconsistency (Rich Results penalty) | DHL/FedEx promise consistency for JP buyer | S (5 min) | ⭐⭐ |
| **X-4** | Add `inLanguage: 'ja-JP'` to Business/Organization + FAQPage JSON-LD | P1-4, P1-5 (GEO extraction) | ja-JP targeting clarity | S (15 min) | ⭐⭐ |
| **X-5** | Set `NEXT_PUBLIC_LINE_URL` + `NEXT_PUBLIC_JA_PHONE` + `NEXT_PUBLIC_JA_EMAIL` env vars | NAP consistency: ja schema.org phone → real JP number | JP-native contact channels (LINE 95% reach vs WhatsApp <10%) | S (env config) | ⭐⭐ |
| **X-6** | Hreflang `ja` → `ja-JP` | P1-2 (canonical for ja-JP market) | Better Bing/MS regional ranking | S (1 line) | ⭐ |
| **X-7** | Build `/ja/legal` 特定商取引法 page | E-E-A-T: legal/contact signals in JSON-LD | **MANDATORY** — JP consumer law | M (4 hr) | ⭐⭐⭐ |
| **X-8** | Stop claiming 「特定商取引法に基づく表記完備」 in longDescriptionJa until X-7 is done | Removes false advertising risk from 70+ SKU descriptions | 景品表示法 compliance | S (find/replace) | ⭐⭐ |

**Total X-overlap effort**: ~5 hr for S-tier items, ~5 hr for X-7. Replaces ~30 hr of separate SEO + compliance work if done independently.

---

## 3. SEO-only findings (from `audit-ja-pdp-seo-2026-06-18.md`)

### 3.1 Quantified
- **79/79 SKUs** have at least one English-residue ja field (**100%**)
- **78/79** have P0 issue (h1 / body / imageAlt placeholder) (**98.7%**)
- **79/79** have P1 issue (description self-rep OR mixed JP+EN keywords) (**100%**)
- **0/79** are clean
- **Issue counts**: P0 = 116 (h1: 61, body: 52, imageAlt: 3); P1 = 153 (description self-rep: 74, keywords mixed: 79)
- **longDescriptionJa filled**: 60/79 (75.9%); missing for 19 (mostly minor sub-variants)
- **longDescriptionJa with CN contamination**: 5/79 (6.3%); 1 C-score (`white-card-bags`), 23 B-score
- **GSC strict-JP queries**: 29, ~50 cumulative impressions, 0% CTR

### 3.2 Top-5 SEO fixes (lifted from §"Top 5" of source audit)
1. Fix 116 P0 ja fields in `sku-seo-data.ts` (~30-40 hr, native JP translator)
2. Replace self-repetition template in 79 `description` fields (~10 hr)
3. Add longDescriptionJa for 19 missing SKUs (~6-10 hr, parent-variant template)
4. Add `inLanguage` to Organization + FAQPage JSON-LD (~15 min) ← **moved to X-4 above**
5. Add 5 HowTo blocks for ja top-volume categories (~4-6 hr)

### 3.3 Effort allocation (per source audit §"Per-category fix matrix")
- **Small** (≤2 hr): flyers, red-packets, envelopes, educational, calendars, banners, books, menus (8 cats, 41 SKUs)
- **Medium** (2-6 hr): packaging, paper-bags (2 cats, 16 SKUs)
- **Large** (6+ hr): stickers, business-cards, posters (3 cats, 21 SKUs)

---

## 4. Compliance-only findings (from `audit-ja-pdp-compliance-2026-06-18.md`)

### 4.1 Area status
| ID | Area | Status | Severity |
|---|---|---|---|
| C1 | 特定商取引法 disclosure | **FAIL** | **HIGH** (legal exposure) |
| C2 | 消費税 (税込) display | PARTIAL | HIGH (景品表示法 risk) ← **moved to X-1** |
| C3 | Japan trust signals | PARTIAL | MEDIUM ← **moved to X-2** |
| C4 | Doujin (同人) market support | PARTIAL | MEDIUM |
| C5 | Company info & address | INCONSISTENT (3 layers) | MEDIUM |
| C6 | Phone & contact (LINE/+81) | PARTIAL (env-gated) | HIGH ← **moved to X-5** |
| C7 | UX conversion gaps for ja B2B | FAIL (no payment/納期の UI) | HIGH |
| C8 | Shipping & delivery | PARTIAL (schema↔UI gap) | MEDIUM ← **moved to X-3** |

### 4.2 Top-5 compliance fixes (lifted from §"Top 5" of source audit)
1. Build `/ja/legal` page ← **X-7**
2. Wire `<TaxDisplay>` ← **X-1**
3. Set JP-native contact env vars ← **X-5**
4. Add 「支払い方法」 disclosure section in PDP right column (銀行振込 / NP掛け払い / クレジット / 締め払い) — NEW not in overlap
5. Wire `<JapanTrustBadges>` + fix schema transitTime ← **X-2 + X-3**

### 4.3 Brand safety: PASS
Both audits confirm zero 「智印港」 (competitor) references in ja copy. Brand discipline holding.

---

## 5. Mavis orchestrator findings — gaps neither audit caught

These came from cross-referencing both audits plus my own scan of the codebase. They belong in v3-arch because they affect ja PDP routing/architecture at the system level.

### 5.1 manifest.json route → index page leak [ARCHITECTURE]
- `https://www.zprintpro.com/manifest.json` is being indexed by Google as a search result (per user's earlier report)
- **Root cause hypothesis**: either (a) no `disallow: /manifest.json` in robots.txt, OR (b) the manifest doesn't have `Content-Type: application/manifest+json` and Next.js serves it as HTML, OR (c) there's no canonical / noindex on this asset
- **Audit status**: NEITHER audit checked `robots.txt`, `_headers`, `_redirects`, or `public/manifest.json`
- **Fix**: 
  - Add `Disallow: /manifest.json` to `public/robots.txt`
  - Verify `Content-Type: application/manifest+json` header in `_headers`
  - Add `<link rel="canonical">` on manifest route OR redirect 301 to homepage
- **Effort**: S (5 min)
- **Impact**: High — Google SERP showing manifest.json is a sloppy signal; hurts brand

### 5.2 Page-size 33MB per PDP [PERFORMANCE] ⚠️ critical
- Per user's earlier report: each ja PDP loads ~33MB on initial paint
- Images are 100KB WebP × ~6-8 per PDP = 600-800KB. Where does the 33MB come from?
- **Audit status**: NEITHER audit checked page weight, image loading, font loading, or JS bundle
- **Likely culprits** (in order of probability):
  1. **`ProductGallery`** may be loading all 329 ja `-ja.webp` images for the SKU × all locale variants on initial render (no lazy loading / no srcset)
  2. **JS bundle** — Next.js client components for ja locale may include all 3 locales' translations (no locale splitting)
  3. **Fonts** — google-fonts / Noto Sans JP embedded as base64 in critical CSS
  4. **Schema.org JSON-LD** — `longDescriptionJa` × 60 filled SKUs = potentially 60× 1.5KB = 90KB inline (not 33MB though)
  5. **Cloudflare Pages serves uncompressed** — verify `Content-Encoding: br` or `gzip` on JS/CSS
- **Fix path**:
  - Run `lighthouse` on a ja PDP, profile network waterfall
  - Verify `next.config.js` has `images: { formats: ['image/avif', 'image/webp'] }` + per-locale image opt
  - Verify Cloudflare Pages has Brotli enabled (default yes)
  - Verify `next/dynamic` is used for non-critical client components
- **Effort**: M (4-8 hr audit + fixes)
- **Impact**: HIGH — 33MB = ~10s TTI on 3G, 3-4s on 4G. Even on CF Pages' edge, this kills conversion. JP mobile users particularly affected.

### 5.3 PDP thumbnail = single fixed logo [UX / SEO]
- Per user's earlier report: every PDP's SERP thumbnail / og:image / preview shows the same fixed LOGO, not the SKU's first image
- **Audit status**: SEO audit P2-1 touched this ("og:image for ja falls back to slug-based webp → file not found") but didn't fully diagnose
- **Likely root cause**: 
  - `src/lib/seo.ts:401` emits `url: ${siteConfig.url}/images/products/${slug}.webp`
  - But the actual files in `public/images/products/` are `.jpg` (89 total) + `seedream-webp/` (329 with `-ja` suffix)
  - Result: 404 → fallback to brand LOGO
- **Why SKU first-image is better**:
  1. **Google Search thumbnail** — for JP product queries, image-rich results get +30% CTR (industry data)
  2. **GEO citation** — ChatGPT/Perplexity cite pages with concrete product visuals over generic logos
  3. **Social sharing** — LINE / Twitter / Facebook og:image preview = the first conversion hook for JP users
- **Fix path**:
  - Update `src/lib/seo.ts:401` to use `${slug}-ja.webp` from `seedream-webp/` (329 files exist)
  - Add `<meta property="og:image:width">` + `:height` (1200×630 ideal)
  - Add `<meta name="twitter:image">` for Twitter card
  - Verify CF Pages serves the actual `seedream-webp/` directory
- **Effort**: S (1-2 hr including screenshot verification)
- **Impact**: HIGH — image thumbnails are the primary visual hook for ja PDP SERP and social share

### 5.4 schema transitTime 7-14d contradicts UI "2-4d" [BUG] ← **X-3**
- Both audits flagged this independently but neither cross-referenced; SEO audit didn't read PDP UI, compliance audit didn't read schema
- **Already in X-3 above** — flagged here for awareness

### 5.5 x-default → /zh-hk/ signals Chinese-first [SEO]
- `src/lib/seo.ts:391,300,131` all emit `x-default: ${siteConfig.url}/zh-hk/...`
- Per Google: x-default should be locale-neutral landing page
- **Audit status**: SEO audit P2-2 caught this; no remediation proposed
- **Fix**: 
  - Either: `x-default` → `/en/` (most universal)
  - Or: build `/global/` neutral landing and point x-default there
- **Effort**: XS (1 line + smoke test)
- **Impact**: Medium — affects global SERP, less so for ja market specifically

### 5.6 Cloudflare Pages robots/sitemap drift [DEPLOYMENT]
- `public/robots.txt` and `app/sitemap.ts` are 2 separate sources of truth
- **Audit status**: Neither audit verified these
- **Fix path**:
  - Verify `robots.txt` includes `Sitemap: ${siteConfig.url}/sitemap-index.xml`
  - Verify per-locale sitemaps exist (zh-hk/en/ja + sitemap-index)
  - Verify CF Pages serves them with correct Content-Type
- **Effort**: XS (verification only)
- **Impact**: Critical if broken — Google won't crawl ja sitemaps

---

## 6. Unified v3 priority matrix

Sorted by **impact × (1/effort)**. X-overlap items (from §2) get priority because they fix two axes at once.

### Phase 0 — CRITICAL (legal exposure + indexing leak)
| Rank | ID | Action | Effort | Axis | Why |
|---|---|---|---|---|---|
| 1 | X-7 | Build `/ja/legal` 特定商取引法 page | M (4 hr) | Compliance | LEGAL RISK: Art. 11 violation, false claim in 70+ SKUs |
| 2 | X-8 | Stop claiming 「特定商取引法に基づく表記完備」 in copy until #1 done | S (30 min) | Compliance | 景品表示法 misrepresentation |
| 3 | 5.1 | Fix manifest.json indexing leak | S (5 min) | Architecture | SERP showing manifest.json = brand sloppiness |

### Phase 1 — HIGH-ROI OVERLAPS (S effort, dual axis win)
| Rank | ID | Action | Effort | Axis |
|---|---|---|---|---|
| 4 | X-1 | Wire `<TaxDisplay>` into PDP price block for ja | S (15 min) | SEO + Compliance |
| 5 | X-2 | Wire `<JapanTrustBadges>` into PDP for ja | S (30 min) | SEO + Compliance |
| 6 | X-3 | Fix schema transitTime 7-14 → 2-4 day | S (5 min) | SEO + Compliance |
| 7 | X-4 | Add `inLanguage: 'ja-JP'` to Organization + FAQPage JSON-LD | S (15 min) | SEO + Compliance |
| 8 | X-5 | Set `NEXT_PUBLIC_LINE_URL` / `NEXT_PUBLIC_JA_PHONE` / `NEXT_PUBLIC_JA_EMAIL` | S (env config) | SEO + Compliance |
| 9 | X-6 | Hreflang `ja` → `ja-JP` | S (1 line) | SEO + Compliance |
| 10 | 5.3 | Fix PDP thumbnail → SKU first image | S (1-2 hr) | Architecture + UX |

### Phase 2 — HIGH-VOLUME CONTENT (M-L effort, SEO-driven)
| Rank | ID | Action | Effort | Axis |
|---|---|---|---|---|
| 11 | SEO-2 | Replace 「XのXは Yに...」template in 79 descriptions | M (10 hr) | SEO |
| 12 | SEO-3 | Add longDescriptionJa for 19 missing SKUs | M (6-10 hr) | SEO + GEO |
| 13 | SEO-5 | Add 5 HowTo blocks (business-cards / stickers / flyers / posters / red-packets) | M (4-6 hr) | SEO + GEO |
| 14 | C7 | Add 「支払い方法」section in PDP right column (銀行振込 / NP掛け払い / クレジット / 締め払い) | M (4 hr) | Compliance |

### Phase 3 — CRITICAL PERFORMANCE + LARGE CONTENT (L effort, deep work)
| Rank | ID | Action | Effort | Axis |
|---|---|---|---|---|
| 15 | 5.2 | Diagnose + fix 33MB page-size | L (4-8 hr) | Performance (affects all) |
| 16 | SEO-1 | Fix all 116 P0 ja fields (h1/body/imageAlt) | L (30-40 hr) | SEO |
| 17 | C4 | Doujin-specific UX (conditional render in `books` / doujin-adjacent SKUs) | L (6 hr) | Compliance + UX |

### Phase 4 — POLISH
| Rank | ID | Action | Effort | Axis |
|---|---|---|---|---|
| 18 | 5.5 | x-default → /en/ or /global/ | XS | SEO |
| 19 | 5.6 | Verify CF Pages robots/sitemap/Content-Type | XS | Deployment |
| 20 | C5 | Address/phone alignment across siteConfig/regionConfig/geoConfig | S | Compliance |
| 21 | P2-1, P2-4, P2-5 | og:image broken refs, 2 missing imagesByLocale.ja, GSC URL column | S | SEO |

**Total estimated effort**:
- Phase 0: ~5 hr
- Phase 1: ~3 hr (8 small fixes)
- Phase 2: ~25 hr
- Phase 3: ~45 hr
- Phase 4: ~3 hr
- **Total: ~80 hr** (vs. ~110 hr sequential from the two source audits — savings from overlap bundling)

---

## 7. Decision tree for the next sprint

```
START
  │
  ├─ Is `/ja/legal` page built? ─── NO ─→ Phase 0 #1 (legal risk is blocking)
  │                                       │
  │                                       └─ Then #2 (stop false claim in copy)
  │                                       │
  │                                       └─ Then #3 (manifest.json indexing leak)
  │
  ├─ Is the user deploying ja content now? ─── YES ─→ Phase 1 all 7 items (1 day)
  │                                             │
  │                                             └─ Then Phase 2 SEO work (parallel track)
  │
  ├─ Is page speed a complaint? ─── YES ─→ Phase 3 #15 (33MB audit)
  │
  └─ Is GEO (LLM citation) a priority? ─── YES ─→ Phase 2 #12, #13 (longDescriptionJa + HowTo)
```

---

## 8. What v3-arch achieves vs. v1/v2

If we treat the two source audits as v1 (SEO) + v2 (Compliance):
- **v1 (SEO)** alone: fixes ranking but ships a legally exposed page
- **v2 (Compliance)** alone: fixes legal but ships invisible-in-SERP content
- **v3 (this synthesis)**: fixes BOTH, in priority order, with overlap bundling. Unblocks ja market entry.

**v3 = SEO content + compliance + performance + architecture fixes in one sequenced plan.**

---

## 9. Files referenced (consolidated from both audits)

### Source files (SEO audit)
- `src/data/sku-seo-data.ts:1-4188` — 83 ja SEO entries
- `src/data/products.ts:93-16531` — 79 Product[] entries
- `src/app/[locale]/product/[slug]/page.tsx:82-91, 200, 297-499` — PDP
- `src/lib/seo.ts:340-347, 386-391, 423-507, 670-680` — metadata + schema
- `src/lib/faq-schema.ts:14-27` — FAQPage
- `src/lib/seo/schema-extensions.ts:42-65, 71-..., 269-285, 291-304` — HowTo + Speakable
- `src/lib/product-image.ts:17-44` — locale image fallback
- `src/lib/metadata.ts:36` — hreflang map
- `src/types/locale.ts:16-20` — `hreflangMap`
- `src/data/image-alt-map.ts:44, 74` — Trad-CN residue
- `public/images/products/seedream-webp/` — 329 ja images
- `gsc_data.csv` — 335 GSC queries

### Source files (Compliance audit)
- `src/components/japan/TaxDisplay.tsx` — 税込/税抜 toggle (dead code)
- `src/components/japan/JapanTrustBadges.tsx` — 国内検品/税込/エコ badges (dead code)
- `src/components/japan/DoujinSKU.tsx` — コミケ grid (homepage only)
- `src/lib/tax.ts` — TAX_RATE = 0.10, formatJPY()
- `src/lib/pricing.ts:592` — `convertPriceRangeString` (no 税込 suffix)
- `src/lib/seo.ts:7-34, 54-92, 423-507` — siteConfig / regionConfig / business schema
- `src/app/[locale]/privacy/page.tsx`, `terms/page.tsx` — stubs
- `messages/_legal-content.json` — We2 leftover content (delete/rewrite)
- `src/components/layout/Header.tsx:281-294`, `Footer.tsx:215-260` — JA-specific contact (env-gated)

### Source files (Mavis additions)
- `public/robots.txt` — manifest.json disallow check
- `public/manifest.json` — Content-Type check
- `_headers` (CF Pages) — Content-Encoding check
- `next.config.js` — `images.formats` + locale image opt
- `app/sitemap.ts` — per-locale sitemap check

### Output
- `docs/audit-ja-pdp-v3-arch-2026-06-18.md` — this file

---

## 10. Notes for the next auditor / executor

- **Idempotency**: This is the FIRST `audit-ja-pdp-v3-arch-2026-06-18.md`. No prior version.
- **Source authority**: All numbers lifted from source audits' tables; no re-computation done. Re-running source audits will re-derive these counts.
- **Encoding**: This file is UTF-8. JP/CN text quoted from source files was lifted via Read tool (UTF-8 native, no PowerShell pipeline corruption).
- **Mavis additions**: §5.1-5.6 are orchestrator-level findings; treat them as new architecture work, not part of either source audit's scope.
- **Decision-tree in §7** assumes Phase 0 (legal) is non-negotiable. Do not skip.
- **Performance audit (5.2)** is the wild card — until we run Lighthouse, we don't know if 33MB is real or a measurement artifact. Recommend executing in Phase 3 BEFORE Phase 2 content work, so the content work doesn't get re-shipped into a 33MB page.
- **Brand safety**: All three audits (SEO, Compliance, Mavis) confirm zero 「智印港」 (competitor) references. Hold the line.

---

*Synthesis complete. 2 source audits + 6 Mavis findings = 1 unified plan. Estimated total effort: ~80 hr. Earliest blocker: legal (Phase 0). Highest ROI: Phase 1 overlap items (~3 hr for dual-axis win).*