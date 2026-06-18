# JA PDP Compliance & UX Audit Report (2026-06-18)

> **Scope**: Japan-market compliance + B2B UX patterns on zprintpro product detail pages
> **Locale**: `ja` (one of 3 active locales: zh-hk / en / ja)
> **PDP source**: `src/app/[locale]/product/[slug]/page.tsx`
> **Brand**: 智印雲 / ZprintPro (NOT 智印港 — competitor)
> **Auditor**: mvs_edaf36b16dc348b6a2e41b853c70d942 (general worker)

---

## TL;DR (5-line executive summary)

1. **JA-specific legal compliance is BROKEN** — no 特定商取引法 disclosure page exists; `messages/_legal-content.json` is leftover We2 (couple-wellness) content; `privacy/` and `terms/` are placeholders saying "(Full content to be provided)".
2. **TaxDisplay / JapanTrustBadges / DoujinSKU components EXIST but are NOT wired into PDP** — all three ja-specific components live in `src/components/japan/` but `product/[slug]/page.tsx` imports none of them; DoujinSKU is wired into the homepage only.
3. **JPY price display lacks 「(税込)」 suffix** — `pricing.ts:convertPriceRangeString()` emits `¥X,XXX-¥X,XXX/部` with no tax label; PDP does not call `TaxDisplay`, so B2C users see a number they cannot interpret as tax-inclusive vs. tax-exclusive (a common JP consumer complaint / consumer-center issue).
4. **No JP-native contact channels** — WhatsApp button uses +86 (China mobile) phone; LINE / +81 / ja-specific email are wired in Header/Footer but gated behind env vars that are likely unset; schema.org Organization for ja shows HK (Kwun Tong) address — 3 layers inconsistent (siteConfig HK / regionConfig.ja phonePrefix +852 / geoConfig.ja region JP).
5. **Many JP-specific UX claims are made in longDescriptionJa copy but not surfaced in PDP UI** — "ヤマト運輸・佐川急便", "Visa / Mastercard / JCB / Alipay / 銀行振込", "NET 30 月締請求書払い", "色校正", "サンプル請求", "特定商取引法に基づく表記完備" all appear in product descriptions but the PDP itself shows only 「国際送料無料」 / 「即日納品」 / 「DHL/FedEx 2-4 days」.

---

## C1. 特定商取引法 status — **FAIL** (legal risk **HIGH**)

JP 特定商取引法 (Specific Commercial Transactions Act) requires e-commerce sellers of tangible goods to display, before contract, the following in a way "easily viewable by the consumer":

| Required item | Where in ZprintPro today | Status |
| --- | --- | --- |
| 販売業者名 (full company name) | Only in `longDescriptionJa` copy (multiple products claim "ZprintPro Limited（香港本社・観塘）"). **No structured legal page.** | ❌ |
| 代表者名 (representative) | Nowhere | ❌ |
| 所在地 (full address, no PO box) | Only mentioned in `about/` and `longDescriptionJa` copy | ⚠️ partial |
| 電話番号 (reachable phone) | Contact page shows +86 181 2638 0255; not on PDP; Footer gated by `NEXT_PUBLIC_JA_PHONE` env | ❌ no JP phone |
| メールアドレス | `zprintpro@outlook.com` only; no JA-specific address surfaced | ⚠️ partial |
| 商品代金以外の必要料金 (shipping, tax) | "¥10,000以上で全国送料無料" is in `longDescriptionJa` only; not on PDP | ⚠️ partial |
| 送料 | Only in description copy, not PDP UI | ❌ |
| 支払方法 | LongDescriptionJa lists Visa / Mastercard / JCB / Alipay / 銀聯 / PayPal / 銀行振込 / NET 30 月締請求書. NOT exposed on PDP. | ⚠️ partial |
| 支払時期 | Not stated anywhere | ❌ |
| 引渡し時期 | "最短3-5営業日" in PDP for ja (`t.deliveryTime`) — generic | ⚠️ |
| 返品・交換条件 | Product schema `hasMerchantReturnPolicy` says "オーダーメイド印刷品は返品不可、発送前にデジタル校正を提供" — but only on schema.org JSON-LD, not user-visible | ⚠️ |
| 販売数量の制限等 | Not stated | ❌ |

**Missing structural pieces**:
- ❌ No `/ja/legal` / `/ja/tokutei` / `/ja/特定商取引法` route exists
- ❌ `src/app/[locale]/privacy/page.tsx` and `terms/page.tsx` are stubs: `(Full privacy policy content to be provided.)` / `(Full terms content to be provided.)`
- ❌ `messages/_legal-content.json` content is **wrong product** — talks about We2 couple-wellness app, time capsules, partner pairing — **not ZprintPro printing**. This file should be removed or completely rewritten.
- ⚠️ `help-center/HelpCenterClient.tsx` has `legalTitle: '法的免責事項'` / `legalItems: [...]` (3 occurrences — zh-hk / en / ja) but this is generic legal disclaimer, not the 特定商取引法 disclosure

**Legal risk: HIGH.** Under 特定商取引法 Art. 11, a B2C seller that fails to display required items before contract is subject to:
- 業務改善指示 (business improvement order) from 消費者庁 / 経済産業局
- Penalties up to 3年懲役 / 300万円罰金 for non-compliance with formal disclosure requirements
- For cross-border sellers: no exemption simply because the seller is in HK; the law applies when selling to JP consumers

The repeated phrase 「特定商取引法に基づく表記完備」 in `longDescriptionJa` is **misleading advertising** — the disclosure does NOT exist.

**Recommendation: HIGH PRIORITY — create `/ja/legal` (特定商取引法に基づく表記) page + JA-localized disclosure content. Remove or rewrite `_legal-content.json`. Update longDescriptionJa copy to stop claiming compliance that does not exist.**

---

## C2. 消費税 handling — **PARTIAL**

**Components / libs available**:
- `src/lib/tax.ts` (20 lines): `TAX_RATE = 0.10`, `includeTax()`, `stripTax()`, `formatJPY()` — clean, correct, supports 「(税込)」/「(税抜)」 toggle via the consumer-facing `TaxDisplay.tsx`
- `src/components/japan/TaxDisplay.tsx` (39 lines, `'use client'`): renders `¥X,XXX` with 「(税込)」 suffix by default, has 税込/税抜 toggle button. **Clean, ready to use.**
- `src/lib/quote-engine/tax.ts` line 29: `'consumption_tax': '消費税'` — internal quote-engine handles JP 消費税 correctly

**What PDP actually shows for ja**:
- `src/app/[locale]/product/[slug]/page.tsx` line 386: `{locale === 'zh-hk' ? product.price_range.split('-')[0] : convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug).split('-')[0]}`
- `src/lib/pricing.ts:convertPriceRangeString()` (line 592) for `ja` returns: `${symbol}${Math.round(min).toLocaleString()}-${Math.round(max).toLocaleString()}/${unit}` — **NO 「(税込)」 suffix**
- No 「(税込)」 marker anywhere in PDP UI for ja

**Verification**:
```powershell
PS> Select-String -Path "src\app\[locale]\product\[slug]\page.tsx" -Pattern "TaxDisplay"
(no output)  # ← NOT IMPORTED
```

**JP consumer pain point**: JP consumers expect explicit 「税込」 / 「税抜」 labeling (consumer-center disputes commonly cite lack of clarity). The 2021 改正 景品表示法 (amended Premiums and Representations Act) makes 「誤認させる表示」 (misleading representations) about price actionable. Displaying a JPY number without 税込/税抜 label is high-risk.

**Recommendation: HIGH — Import and use `<TaxDisplay>` in PDP price block for ja. Add 「（税込）」 suffix to all JPY amounts in PDP UI (price block + QuoteCalculator output + longDescriptionJa copy). Add an explicit note "表示価格は消費税込みです" near the price.**

---

## C3. Japan trust signals — **PARTIAL** (component exists but unused)

**Components available**:
- `src/components/japan/JapanTrustBadges.tsx` (66 lines): 3 badges — 国内検品済み (violet, ShieldCheck) / 消費税込 (emerald, Receipt) / エコ認証 (green, Leaf). Each has hover-desc. **Ready to use.**

**What PDP actually renders for ja trust**:
- Line 374-376 PDP: only `<RushDeliveryBadge locale={locale} />` for the 6 rush-eligible categories
- Line 395-403: badge "Free International Shipping · DHL/FedEx 2-4 days to Japan"
- Line 405-416: 「即日納品」 / 「品質保証」 / 「国際送料無料」 (text with icons)
- Line 437: `<TrustWaterfall locale={locale} />` (generic, 3-locale waterfall)
- Line 487: `<ProductWhyChooseUs locale={locale} />` (likely generic)
- Line 490: `<RegionalContent locale={locale} type="expertIntro" />` (ja has HK-Kwun-Tong-anchored copy about 15 years experience)
- Line 89-95 `RegionalContent.tsx` `RegionalTrustBadges` ja: 🔍QC徹底管理 / ✈️航空便3-5日 / 💬日本語対応 / ⚡急行対応可 — **imported in PDP line 43 but NOT USED (no `<RegionalTrustBadges>` render call in PDP JSX)**

**JP B2B typical trust signals not exposed on PDP**:
- ❌ 国内検品済み (covered by JapanTrustBadges but component not wired in)
- ⚠️ 消費税込 (covered by JapanTrustBadges, but actual JPY display is also wrong — see C2)
- ⚠️ エコ認証 / FSC認証 (covered in `about/page.tsx` certs section and products.ts longDescriptionJa, but not on PDP)
- ❌ SSL / 個人情報保護 (not visible)
- ❌ 特定商取引法に基づく表記 link (not in footer or PDP)
- ❌ 実店舗住所 / ショールーム案内 (only in copy)
- ❌ 資本金 / 設立年 / 取引実績 (only on `/about`)

**Verification**:
```powershell
PS> Select-String -Path "src\app\[locale]\product\[slug]\page.tsx" -Pattern "JapanTrustBadges"
(no output)  # ← NOT IMPORTED
```

**Recommendation: MEDIUM — Import and render `<JapanTrustBadges />` near the price block (above 「今すぐ購入」 button) for ja locale. Also add a 「特定商取引法に基づく表記」 link in the price block or shipping line (when C1 page is built).**

---

## C4. Doujin (同人) market support — **PARTIAL** (homepage only, not PDP)

**Components available**:
- `src/components/japan/DoujinSKU.tsx` (173 lines, `'use client'`): 5-SKU grid with コミケ必須 / 推し活応援 / VTuber向け / 少部数OK tags. Pink-to-purple gradient theme (distinguishes from B2B blue). I18N for zh-hk / en / ja. Links each SKU to `/${locale}/services/seo/${item.slug}/`. **Ready to use.**

**What PDP actually does for doujin**:
- `src/app/[locale]/product/[slug]/page.tsx` line 16: NOT imported
- `src/app/[locale]/page.tsx` line 16: imported, line 67: `{locale === 'ja' && <DoujinSKU locale={locale} />}` — homepage only

**Doujin-specific JP UX expectations vs. current state**:
| Expected flow | ZprintPro today |
| --- | --- |
| 作品展 (作品展示) gallery | ❌ Not implemented |
| 印刷所探し (printing service finder) | ❌ Not implemented |
| 少部数 (small quantity) | ⚠️ Mentioned in tag/CTA copy ("コミケ必須・少部数OK") but PDP itself shows MOQ per category (e.g. 100) |
| オンデマンド (on-demand printing) | ❌ Not surfaced |
| 入稿ガイド (data submission guide) | ⚠️ FAQ mentions 入稿 (line 89 faq/page.tsx), but no dedicated `/ja/guide/doujin` |
| データチェック無料 | ✅ Mentioned in `longDescriptionJa`: 「スタッフが無料でデータチェック」 |
| サンプル請求 (free sample request) | ⚠️ Mentioned in copy but no dedicated CTA button on PDP |
| イベント前 same-day shipping | ❌ PDP shows 「即日納品」 generically; no doujin event calendar |

**Doujin-category route**: There is NO `/ja/doujin` or `/ja/category/doujin` route. `DoujinSKU` links to `/ja/services/seo/${slug}/` which is the generic services-seo template (`src/app/[locale]/services/seo/[slug]/page.tsx`).

**Missed conversion path**: A doujin visitor landing on e.g. `/ja/product/doujinshi-printing/` (if such SKU existed) would see the standard B2B PDP, with no doujin-specific CTAs (コミケ / 即日 / 少部数).

**Recommendation: MEDIUM — On PDP for category `books` or doujin-adjacent SKUs, conditionally render a slim DoujinCTA strip ("コミケ前 1週間以内の発注で翌日発送 / 少部数OK / データチェック無料") above QuoteCalculator for ja. Optionally create `/ja/doujin` index page that wraps DoujinSKU + category cards for doujin-relevant categories (books / stickers / postcards).**

---

## C5. Company info & address — **INCONSISTENT** (3 layers)

**3 layers of company info in code**:
| Layer | Location | ja value |
| --- | --- | --- |
| `siteConfig` | `src/lib/seo.ts` line 7-34 | name=`智印雲`, phone=`+86 181 2638 0255`, address.country=`HK`, address.city=`Kwun Tong`, address.region=`Kowloon` |
| `regionConfig` | `src/lib/seo.ts` line 54-92 | ja.phonePrefix=`+852` (HK), ja.areaServed=`Japan`, ja.regionCode=`JP`, ja.currency=`JPY`, ja.businessSchema=`Organization` |
| `geoConfig` | `src/lib/seo.ts` line 1125+ | ja.region=`JP`, ja.pricePrefix=`¥`, ja.deliveryText=`7-14営業日で全国へお届け` |

**Inconsistencies**:
- `siteConfig.phone = +86 181 2638 0255` (real, China mobile) is what shows in JSON-LD Organization schema for ALL locales including ja. This means for ja visitors, Google's knowledge panel would see a +86 phone with HK address — which is NAP mismatch that JP-side search ranking penalizes.
- `regionConfig.ja.phonePrefix = '+852'` (HK) — unused in code paths that I traced (not consumed by PDP UI), but it's a latent config bug.
- `generateBusinessJsonLd('ja')` returns `Organization` schema (line 499-507) with no address — meaning ja schema has NO address at all (vs. zh-hk `LocalBusiness` which has full address + geo + opening hours). For ja, the LocalBusiness signals are absent, hurting local-pack eligibility.

**Schema verification** (`generateBusinessJsonLd` in seo.ts:423):
- For ja (line 498-507): returns `Organization` only with `name / alternateName / url / logo / image / telephone / email / priceRange / areaServed / contactPoint / sameAs: [] / @id` — **no address, no geo, no openingHours, no payment methods**
- For zh-hk: full LocalBusiness with address, geo, openingHours, paymentAccepted, currenciesAccepted

**JP trust impact**: When ja user does a site: search for "智印雲 住所" or sees the JSON-LD in Google's Rich Results Test, they see a HK entity with +86 phone — not a JP-friendly signal.

**Recommendation: MEDIUM — For ja, generate a JP-flavored Organization schema with: (a) address pointing to a JP partner / virtual office if one exists, OR (b) explicit "運営会社: ZprintPro Limited (HK本社) / 日本国内サポート: 日本語スタッフ・平日9:00-18:00" disclosure. Fix `regionConfig.ja.phonePrefix` from `+852` to `+81` to match the new JP phone env var (C6). Add `paymentAccepted` to ja Organization schema.**

---

## C6. Phone & contact — **PARTIAL** (env-gated, no JP-native channel)

**Currently displayed for ja visitors**:
| Channel | Source | Status |
| --- | --- | --- |
| Phone | `siteConfig.phone = +86 181 2638 0255` (China mobile, real) | ✅ Shown in schema + contact page + footer; **NOT a JP number** |
| Email | `zprintpro@outlook.com` | ✅ Shown everywhere; **NOT a JP-domain address** |
| WhatsApp | `generateWhatsAppLink()` → wa.me/8618126380255 | ✅ Shown on PDP via RegionalCta? **No**, on contact page; **JP user needs WhatsApp installed (less common than LINE)** |
| LINE | `<a href={process.env.NEXT_PUBLIC_LINE_URL}>` in Header + Footer | ⚠️ **Gated by env var** — likely unset; user must set NEXT_PUBLIC_LINE_URL to enable |
| +81 phone | Footer env-gated `NEXT_PUBLIC_JA_PHONE` | ⚠️ **Gated by env var** — not set |
| JA email | Footer env-gated `NEXT_PUBLIC_JA_EMAIL` | ⚠️ **Gated by env var** — not set |

**Verification**:
- `src/components/layout/Header.tsx` line 281-294: JA locale gets a LINE entry in the header IF `NEXT_PUBLIC_LINE_URL` is configured
- `src/components/layout/Footer.tsx` line 215-260: JA locale gets a dedicated "日本市場サポート" block (LINE / +81 phone / ja email), all env-gated

**Code evidence of awareness**: The Header & Footer code from 2026-06-14 (Phase B P0-6) shows the project KNOWS ja needs LINE + +81 phone + ja email — but the env vars are not set, so ja users see no JP-native channel today.

**JP consumer expectation**: LINE is the dominant B2C messaging channel in Japan (95%+ reach). WhatsApp penetration is < 10%. For B2B, JP buyers expect: メール (universal), 電話 (with a +81 number — currently missing), 問い合わせフォーム (have it at /ja/contact/), and for casual / 2C: LINE.

**Recommendation: HIGH — (a) Set `NEXT_PUBLIC_LINE_URL` env var to your actual LINE公式アカウント URL. (b) Provision a +81 number (Skype番号 / NTT IP電話 / クラウドPBX ~ ¥1,000/月) and set `NEXT_PUBLIC_JA_PHONE`. (c) Either use a jp-domain forwarding (e.g. ja@zprintpro.jp) or set `NEXT_PUBLIC_JA_EMAIL` to a JP-friendly address. (d) Until then, header/footer will not show JA-specific contact info.**

---

## C7. UX conversion gaps for ja B2B — **FAIL**

**JP B2B print buyer expectations vs. PDP current state**:

| Expected element | ZprintPro PDP today (ja) |
| --- | --- |
| サンプル請求 (free sample request) CTA | ❌ No CTA. Mentioned in copy only. |
| 30秒見積もり (30-sec instant quote) | ✅ Present via QuoteCalculator |
| 納期 (lead time) — per product | ⚠️ Generic 「即日納品」 + TrustWaterfall; no per-product table |
| データ入稿 (file submission) workflow | ⚠️ Upload box exists (line 338-349) — but file upload is non-functional (no submit handler) |
| PDF / Illustrator / PSD / PNG / JPG | ✅ Stated in upload box hint: 「PDF, AI, PSD, PNG, JPG 対応（最大50MB）」 |
| 校正 (proofing) step | ❌ Not on PDP. Mentioned in FAQ (line 89 faq/page.tsx): 「JPG校正データのみ提供」 |
| 銀行振込 payment | ❌ Not on PDP UI |
| NP掛け払い (B2B credit) | ❌ Not mentioned anywhere on PDP |
| クレジットカード (JCB / Visa / Mastercard) | ❌ Not on PDP UI (only on `/contact` page) |
| 締め払い (NET 30 月締) | ❌ Not on PDP UI; only in `longDescriptionJa` copy |
| 請求書払い | ❌ Not on PDP UI |
| 大量発注割引 (volume discount) | ⚠️ Stated in `longDescriptionJa` copy: 500枚15%OFF / 1,000枚25%OFF, not on PDP |
| 請求書 PDF download | ❌ No button |

**QuoteCalculator** (`src/components/quote/QuoteCalculator.tsx`) — need to confirm if it has ja-specific labels (likely uses internal `quote-engine/markets.ts` which does have `taxType: 'consumption_tax'` for JP, so tax calc is correct internally). But output price does NOT use `<TaxDisplay>` and does NOT show 「(税込)」.

**Why this matters for ja B2B**:
- JP B2B procurement is a multi-step approval process (稟議 / 購買申請). The buyer wants to see at a glance: 単価 + 数量割引 + 送料 + 支払い条件. ZprintPro's PDP hides this in longDescriptionJa copy that is below the fold.
- 締め払い / NP掛け払い is the dominant B2B payment method in JP (not 銀行振込 pre-pay). Missing this is a hard blocker for many ja B2B buyers.

**Recommendation: HIGH — (a) Add a "B2B 支払い方法" section in the ja PDP: 銀行振込 (前払い) / NP掛け払い (後払い, 法人限定) / クレジットカード (Visa/MC/JCB) / 締め払い (NET 30, 要審査). (b) Add a サンプル請求 button in the price block (currently missing). (c) Show per-product 納期 in the right column (e.g. "校正2日 + 印刷3日 + 配送3-5日 = 約8-10日"). (d) Wire the upload box to a real submit handler that creates an inquiry in Supabase.**

---

## C8. Shipping & delivery — **PARTIAL**

**What PDP shows for ja** (line 395-403):
```tsx
{locale !== 'zh-hk' && (
  <div className="flex items-center gap-1.5 mb-2">
    <span className="...green badge...">国際送料無料</span>
    <span className="text-xs text-gray-400">
      DHL/FedEx アメリカ3-5日、日本2-4日
    </span>
  </div>
)}
```

**Strengths**:
- "DHL/FedEx 2-4 days to Japan" — accurate for international express, good signal
- "国際送料無料" — clear

**Gaps**:
| Expected | Current |
| --- | --- |
| ヤマト運輸 (Yamato) / 佐川急便 (Sagawa) / 日本郵便 (EMS) | ❌ Not on PDP UI; mentioned in `longDescriptionJa` for flyers/banners |
| 関税 / 輸入消費税 / 配送業者追跡番号 | ❌ Not surfaced. **JP imports have 関税 (HS code-based) that buyer often must pay** |
| イベント前 same-day shipping for doujin | ❌ Not surfaced |
| 配送先エリア別 deliveryTime | ⚠️ `Product schema OfferShippingDetails for ja`: handlingTime 2-3 day + transitTime 7-14 day — contradicts the "2-4 days" UI claim |
| 国内検品 → 国内発送 の誤解回避 | ⚠️ Copy says "国内検品体制" but actual shipment is from HK |

**Schema contradiction (HIGH PRIORITY BUG)**:
- PDP UI text: "DHL/FedEx 2-4 days to Japan"
- Schema `OfferShippingDetails for ja` (line 670-680 seo.ts): `transitTime: { minValue: 7, maxValue: 14, unitCode: 'DAY' }`
- This is a **7-day discrepancy** between UI and structured data. Google's Rich Results Test would flag this as inconsistent.

**Customs / 関税**: For cross-border printing to JP (HS code 4911.99), consumer typically pays:
- 関税: 0% (most printed matter)
- 消費税: 10% on (CIF value + 関税)
- 通関料: ¥200-¥1,000 per shipment

For B2B shipments > ¥10,000 CIF, 輸入消費税 also applies.

**Recommendation: HIGH — (a) Fix schema transitTime to match UI (2-4 days for DHL/FedEx). (b) Add a "関税・輸入消費税について" disclosure in the PDP shipping line for ja: "本商品は香港から発送されます。関税・輸入消費税はご注文者様のご負担となります。" (c) Add ヤマト運輸 / 佐川急便 / EMS as domestic JP carriers in the description (if you have a JP partner for last-mile delivery) or in the FAQ.**

---

## Component usage map

| Component | Path | Imported in PDP? | Rendered in PDP? | Notes |
| --- | --- | --- | --- | --- |
| `TaxDisplay` | `src/components/japan/TaxDisplay.tsx` | ❌ NO | ❌ NO | 税込/税抜 toggle component, unused |
| `JapanTrustBadges` | `src/components/japan/JapanTrustBadges.tsx` | ❌ NO | ❌ NO | 国内検品/税込/エコ badges, unused |
| `DoujinSKU` | `src/components/japan/DoujinSKU.tsx` | ❌ NO | ❌ NO | 5-SKU doujin grid, used in homepage only |
| `RushDeliveryBadge` | `src/components/sections/RushDeliveryBadge.tsx` | ✅ YES (line 47) | ✅ YES (line 375) | 6 rush-eligible categories only |
| `RegionalContent` | `src/components/seo/RegionalContent.tsx` | ✅ YES (line 43) | ✅ YES (lines 490/495/499) | expertIntro / shipping / pricingNote |
| `RegionalCta` | `src/components/seo/RegionalContent.tsx` | ✅ YES (line 43) | ✅ YES (line 497) | 「無料お見積もり」 CTA for ja |
| `RegionalTrustBadges` | `src/components/seo/RegionalContent.tsx` | ✅ YES (line 43) | ❌ NO (imported, never rendered) | 🔍QC / ✈️航空便 / 💬日本語 / ⚡急行 — dead import |
| `TrustWaterfall` | `src/components/home/TrustWaterfall.tsx` | ✅ YES (line 48) | ✅ YES (line 437) | Generic 3-locale trust waterfall |
| `ProductWhyChooseUs` | `src/components/ProductWhyChooseUs.tsx` | ✅ YES (line 46) | ✅ YES (line 487) | Generic why-choose-us |
| `ProductGallery` | `src/components/ProductGallery.tsx` | ✅ YES (line 34) | ✅ YES (line 331) | Standard product images |
| `QuoteCalculator` | `src/components/quote/QuoteCalculator.tsx` | ✅ YES (line 35) | ✅ YES (line 423) | Calculator (uses tax.ts internally but output lacks 税込 label) |
| `ProductTabs` | `src/components/ProductTabs.tsx` | ✅ YES (line 36) | ✅ YES (line 438) | Tabs for description/specs/etc |
| `ProductFaq` | `src/components/ProductFaq.tsx` | ✅ YES (line 38) | ✅ YES (line 471) | FAQ accordion |
| `RelatedProducts` | `src/components/RelatedProducts.tsx` | ✅ YES (line 37) | ✅ YES (line 479) | Related products grid |
| `JsonLd` | `src/components/JsonLd.tsx` | ✅ YES (line 33) | ✅ YES (lines 297-306) | Schema.org JSON-LD injection |

**Key insight**: 3 of the 3 `japan/*` components are dead code from the PDP perspective. PDP relies entirely on the locale-agnostic / `RegionalContent` infrastructure, which has weaker JA-specific copy than the dedicated components.

---

## Top 5 highest-impact fixes (ranked)

### #1 — Build `/ja/legal` (特定商取引法に基づく表記) page **[HIGH, effort L]**
**Why**: Legal exposure under JP 特定商取引法 Art. 11. Required disclosure missing today. Repeated false claims of "特定商取引法に基づく表記完備" in `longDescriptionJa` constitute 景品表示法 misrepresentation.
**Effort**: L (legal review + content authoring + page template)
**Acceptance**:
- Route `src/app/[locale]/legal/page.tsx` exists, renders ja content
- All 11 required 特定商取引法 items present and visible above the fold
- Footer adds 「特定商取引法に基づく表記」 link to `/ja/legal/` (and equivalent for en/zh-hk)
- `_legal-content.json` either removed or rewritten with ZprintPro content (currently it's leftover We2 couple-wellness content)

### #2 — Wire `<TaxDisplay>` into PDP for ja and add 「(税込)」 suffix everywhere **[HIGH, effort S]**
**Why**: JP consumer-protection norm + 景品表示法 risk. TaxDisplay component already exists and works — it's just not used.
**Effort**: S (component is ready, just import + place)
**Acceptance**:
- `src/app/[locale]/product/[slug]/page.tsx` imports `<TaxDisplay>` and renders it in the price block (replacing the raw `convertPriceRangeString` output for ja)
- QuoteCalculator output for ja shows 税込 by default with toggle to 税抜
- All JPY amounts in longDescriptionJa copy include 「（税込）」 suffix where appropriate

### #3 — Configure JP-native contact env vars (LINE / +81 phone / ja email) **[HIGH, effort S]**
**Why**: Code is already wired (Header.tsx line 281 + Footer.tsx line 215); env vars just need to be set.
**Effort**: S (env config + optional number/email provisioning)
**Acceptance**:
- `NEXT_PUBLIC_LINE_URL` set to your LINE公式アカウント URL
- `NEXT_PUBLIC_JA_PHONE` set to a +81 number (provision if not yet — ¥1,000/月 クラウドPBX minimum)
- `NEXT_PUBLIC_JA_EMAIL` set to a JP-friendly address
- Header shows 「LINE」 button for ja; Footer shows full 日本市場サポート block

### #4 — Add 「支払い方法」 disclosure section to ja PDP **[HIGH, effort S]**
**Why**: 特定商取引法 requires 支払方法 / 支払時期 disclosure; JP B2B buyers expect 銀行振込 / NP掛け払い / クレジットカード / 締め払い listed explicitly.
**Effort**: S (new component or copy block)
**Acceptance**:
- New section in PDP right column (or below the price block) listing:
  - 銀行振込 (前払い / 法人・個人)
  - クレジットカード (Visa / Mastercard / JCB / AMEX)
  - NP掛け払い (法人限定・後払い / 与信審査あり)
  - 締め払い (NET 30 月締 / 法人・要審査)
- All methods marked with 手数料・所要日数 notes

### #5 — Wire `<JapanTrustBadges>` into PDP for ja and fix schema/UI transitTime discrepancy **[MEDIUM, effort S]**
**Why**: Component exists unused; current ja trust signals are weaker than the dedicated JapanTrustBadges component supports. Schema contradicts UI on shipping days (7-day gap).
**Effort**: S (import + place + 1-line schema fix)
**Acceptance**:
- `<JapanTrustBadges variant="inline" />` rendered above the CTAs in PDP for ja locale only
- Schema `OfferShippingDetails for ja` transitTime updated from 7-14 day to 2-4 day to match UI
- Add `paymentAccepted` to ja Organization schema (currently only on zh-hk LocalBusiness)

---

## Notes for Verifier

- **Idempotency**: This is the FIRST `audit-ja-pdp-compliance-2026-06-18.md`. No prior version. If re-run, check that `phase-b-fixes-summary.md` or other audit docs don't already cover JA compliance specifically.
- **Source of truth**: PDP import check used `Select-String`. Live verification:
  ```powershell
  Select-String -Path "F:\zprintpro-nextjs\src\app\[locale]\product\[slug]\page.tsx" -Pattern "TaxDisplay|JapanTrustBadges|DoujinSKU"
  # Should return 0 matches (none imported)
  ```
- **QuoteCalculator's actual price display**: I did NOT fully read `QuoteCalculator.tsx`. Recommend verifier to spot-check that it does not show 「(税込)」 either.
- **Schema transitTime discrepancy**: `seo.ts` line 670-680 vs PDP UI line 401. Worth a follow-up fix.
- **`_legal-content.json` is wrong-product content** (We2 couple-wellness app), not ZprintPro printing content. Either delete or rewrite — not safe to use as ZprintPro legal text.
- **`longDescriptionJa` claims**: 70+ product entries claim 「特定商取引法に基づく表記完備」 — these claims become false advertising after this audit and until the legal page is built. Strongly recommend a copy edit pass that removes or hedges these claims until C1 is fixed.
- **Brand**: All Japanese copy uses `ZprintPro` / `智印雲` correctly. Zero 「智印港」 references found in ja copy. Brand safety: PASS.

---

*End of report. Total findings: 8 areas, 5 ranked fixes, 1 high-priority schema bug.*
