# Self-Publishing (en) — fact sources for every number in the draft

Deliverable: `.hermes/staging/self-publishing-content.json` (slug `self-publishing-printing-guide`, en only this round)
Draft built: 2026-09-18 ~23:20 (Asia/Shanghai). Live probes: same session, all HTTP 200 unless noted.

## Source keys

- **[CAT]** `https://zprintpro.com/en/category/books/` — live curl, HTTP 200, 310,012 bytes, 2026-09-18
- **[PB]** `https://zprintpro.com/en/product/perfect-bound-books/` — live curl, HTTP 200, 239,520 bytes, 2026-09-18
- **[HC]** `https://zprintpro.com/en/product/hardcover-books/` — live curl, HTTP 200, 211,395 bytes, 2026-09-18
- **[SAD]** `https://zprintpro.com/en/product/saddle-stitch-booklets/` — live curl, HTTP 200, 231,961 bytes, 2026-09-18
- **[SPI]** `https://zprintpro.com/en/product/spiral-notebooks/` — live curl, HTTP 200, 194,035 bytes, 2026-09-18
- **[CATALOG]** `https://zprintpro.com/en/product/catalog-printing/` — live curl, HTTP 200, 223,234 bytes, 2026-09-18
- **[TS]** `src/data/products.ts` (read-only; no write, no edit)
- **[SIB]** `https://zprintpro.com/en/blog/photo-book-printing-guide/` — live curl, HTTP 200, rendered text, 2026-09-18 (already-published sibling guide)
- **[K3]** K3 2026-09-18 business 口径 as stated in the queue directive for this article (§5 of the dispatch brief)

## Number-by-number map

| # | Number / claim as written | Source (file:line or URL) |
|---|---|---|
| 1 | "1 copy, no minimum order" | [CAT] bullet: "1 copy minimum (digital printing) — ideal for self-publishing, corporate prototyping, and limited art editions."; [CAT] spec table: "Minimum Order 1 copy (digital printing). 100+ recommended for offset (more economical)."; [CAT] FAQ "What is the minimum order for books?" → "1 copy (digital printing). 100+ copies recommended for offset printing with better color accuracy." |
| 2 | "100+ copies turn to offset" / "recommends 100+ copies for offset" | [CAT] same spec table + FAQ answer as #1 |
| 3 | "Digital runs carry no plate fee" / "digital printing, which needs no plate" | [SIB] rendered text: "1 copy, no minimum order; proofs print digitally with no plate fee." and "Small runs go to the digital line with no plate fee; above 100 copies offset is cheaper." and "Digital runs need no plates; offset adds platemaking." Also [K3]: "少量走數碼印刷（no plate fee / fastest proof / higher unit cost）" |
| 4 | "a digital proof is ready within 1 hour of file submission" | [PB] product hero: "HP Indigo 15K B2 digital line · free digital proof within 1 hour of file submission" |
| 5 | "the category page quotes a free design proof within 4 hours" | [CAT] FAQ "How fast can you print and ship custom books?" → "Free design proof in 4 hours, production starts once you approve…"; [CAT] meta description: "Free design proof in 4 hours" |
| 6 | "Lead times: digital 2-3 days, offset 5-7 days, hardcover 7-10 days" | [CAT] FAQ "How long does book printing take?" → "Digital: 2–3 days; Offset: 5–7 days; Hardcover: 7–10 days." |
| 7 | "DHL worldwide shipping is 2-4 days, free on US orders over $99" | [CAT] FAQ "Do you ship book printing orders to the USA?" → "DHL worldwide delivery takes 2-4 days and US orders over $99 ship free." |
| 8 | "48-400 pages" (perfect bound) | [PB] schema description: "Perfect-bound book printing for academic papers, annual reports, CSR reports, literary collections. 48-400 pages…" |
| 9 | "8-64 pages" (saddle stitch) | [SAD] schema description: "8-64 pages, lays flat at 180°…"; also [CAT] FAQ: "Saddle stitch booklets run US$1.84-7.36 per copy with a 50-copy MOQ (8-64 pages)." |
| 10 | "HK$16-80 per copy" (perfect bound) | [TS] line 5850 `price_range: 'HK$16-80/本'` (SKU BK-003 `perfect-bound-books`) |
| 11 | "HK$40-240" (hardcover) | [TS] line 5950 `price_range: 'HK$40-240/本'` (SKU BK-004 `hardcover-books`) |
| 12 | "HK$6-32" (saddle stitch) | [TS] line 5753 `price_range: 'HK$6-32/本'` (SKU BK-002 `saddle-stitch-booklets`) |
| 13 | "HK$8-40" (spiral) | [TS] line 6043 `price_range: 'HK$8-40/本'` (SKU BK-005 `spiral-notebooks`) |
| 14 | "HK$2.8-1000" (catalog) | [TS] line 5673 `price_range: 'HK$2.8-1000/本'` (SKU BK-001 `catalog-printing`) — quoted as published, including its wide upper bound |
| 15 | "the product pages … list 100 pieces" / "structured minimum of 100 pieces" | [TS] `minQuantity: 100` on all five book SKUs: lines 5680 (catalog), 5760 (saddle), 5857 (perfect), 5957 (hardcover), 6050 (spiral). Live corroboration: [PB] spec "Minimum order 100pc", [HC] "Minimum order 100pc", [SAD]/[SPI]/[CATALOG] "100 MOQ" |
| 16 | "HP Indigo 15K B2 digital line and a Heidelberg offset press line" | [PB] hero chip: "HP Indigo 15K B2 digital line"; [PB] figcaption + image alt: "Offset Heidelberg offset press line" |
| 17 | "A5 (148 x 210 mm), 4+32pp, PUR perfect binding" (the ladder's fixed spec) | [PB] price-ladder caption as rendered: "A5 (148×210mm) … 4+32PP (封面4P+內文32P, 內文16張雙面) 無線膠裝 (PUR)" — the label is a zh string rendered on the en page; I describe it in English and quote no Chinese |
| 18 | Ladder US$2.08 (100) / US$0.66 (500) / US$0.36 (1,000) / US$0.14 (5,000) / US$0.11 (10,000) | [PB] "Price Ladder · Reference" block, per-tier rows. Full published ladder also had 2,000 = US$0.20 and 3,000 = US$0.18; I quoted 5 of the 7 tiers to keep the table inside the article's length cap — omitted tiers are real, not contradicted |
| 19 | "the page flags the 10,000-copy tier as best value" | [PB] ladder row 10,000 carries the visible label "Best value"; page also shows "95% Order 10,000 pc vs 100 pc · save per pc" (the 95% figure itself is NOT quoted in the article) |
| 20 | "a 100-copy batch totals US$207.94" | [PB] ladder row 100: "US$2.08/pc · batch US$207.94" |
| 21 | "157g-200g art paper inside" (perfect bound / catalog) | [TS] line 5845 `material: '內頁157g–200g銅版紙…'` (perfect bound); [TS] line 5668 (catalog, `內頁157g–200g銅版紙`); [CAT] HowToStep 3: "157g-200g glossy or matte art paper CMYK offset printing." |
| 22 | "200g-250g laminated cover" | [TS] line 5845 `封面200g–250g銅版紙` + line 5848 `finishing: '膠裝、封面覆膜（啞膜／光膜）'`; catalog equivalent at lines 5668/5671 |
| 23 | "2.5mm gray board, foil or ribbon" (hardcover) | [HC] schema description: "2.5mm gray board cover with foil-stamped titles and ribbon bookmarks." |
| 24 | "saddle stitch runs on 128g-157g book paper" | [TS] line 5748 `material: '128g–157g銅版紙或書紙'` (saddle stitch) |
| 25 | "wire-o notebooks take 80g-100g book paper" | [TS] line 6038 `material: '內頁80g–100g書紙或道林紙；封面200g銅版紙或PP'` (spiral) |
| 26 | "Six binding methods are listed on the category page" | [CAT] FAQ "What binding methods are available?" → "Saddle-stitch, perfect binding, sewn binding, hardcover, wire-o binding, butterfly binding." = 6 |
| 27 | "these five have a product page" | The five whitelisted book SKUs: [PB], [HC], [SAD], [SPI], [CATALOG] — all five returned HTTP 200 |
| 28 | "volume discounts at 500, 1,000 and 5,000 copies" | [CAT] FAQ "Where can I get book printing in Hong Kong with a low MOQ?" → "…with volume discounts at 500 / 1,000 / 5,000 copies and DHL 2-4 day global delivery." |
| 29 | "ISO 9001 and FSC certified" | [CAT] FAQ: "The facility is ISO 9001 + FSC certified…" (15 / 19 occurrences on the page) |
| 30 | "ICC color management with press-side proofing" | [PB] figcaption / image alt: "ICC color management · press-side proofing" |
| 31 | "an InDesign typesetting team" | [CAT] FAQ "Do you offer typesetting services?" → "Yes. Professional typesetting team provides InDesign layout services meeting publishing industry standards." |
| 32 | Title carrier word "Paperback" | The perfect-bound SKU [PB] is the paperback/perfect-bound offer; the word is used as the format name, not as a priced claim |
| 33 | "Perfect bound and hardcover do not lie flat … saddle stitch and wire-o open flat" | Physical property of the bindings; [CAT] HowToStep copy and [SIB] state the flat-spread behaviour. No numeric claim |
| 34 | "Matte lamination shows handling marks, gloss shows scratches" | Qualitative handling note, no numeric claim. Not a performance guarantee |

## Deliberate source conflicts left unreconciled (per instruction: label, do not harmonise)

1. **MOQ**: [CAT] states **1 copy minimum on digital printing, no minimum order**; [TS] `minQuantity: 100` and the five product pages state **100 pc / 100 MOQ**. The draft states both side by side and attributes each to its own surface, and says explicitly: "The two figures describe different things, so ask which applies to your specification." No single blended figure is asserted.
2. **Saddle-stitch MOQ**: [CAT] FAQ says "50-copy MOQ" / "from 50 copies" while [TS] line 5760 and the [SAD] page say 100. **Neither 50 nor 100 for saddle stitch is quoted in this article**, to avoid picking a side.

## Numbers seen on live pages but DELIBERATELY NOT quoted (unverifiable or conflicting)

| Seen | Where | Why excluded |
|---|---|---|
| "from $0.64-1.28" (hardcover) | [HC] summary strip | Conflicts with [TS] hardcover band HK$40-240/本; could not reconcile, so omitted |
| "US$1.84-7.36/pc" (saddle stitch) | [SAD] schema description + [CAT] FAQ | Tied to the disputed 50-copy MOQ; omitted |
| "50 本起印" (catalog, zh) | [TS] line 5657 `description` | Conflicts with the same record's "100 MOQ" and `minQuantity: 100`; omitted |
| "2.3-day average dispatch" | [PB] hero | Real, but replaced by the [CAT] lead-time figures to avoid two competing dispatch numbers |
| "95% … save per pc" (perfect bound), "88% … save per pc" (saddle) | [PB] / [SAD] ladder headers | Savings percentages not needed by the article; omitted |
| "US$1113.57" (10,000-pc batch), US$328.81 / US$358.39 / US$711.65 | [PB] ladder | Batch-total column was cut from the ladder table for length; the 100-copy batch total (US$207.94) is kept, in the table-adjacent paragraph and FAQ Q2 |
| "vs Alibaba yellow pages 500+", "vs 2-day email inquiry", "vs 3-4 week sea freight" | [TS] line 5737 (saddle `descriptionEn`) and [SAD]/[CAT] schema copy | **Competitor-comparison red line.** Present in the product data but never used in this article |
| "US$4.6 per copy from 100 copies" (perfect bound / catalog) | [CAT] FAQ | Omitted to keep one consistent ladder source ([PB]); also it is a different spec than the A5 4+32pp ladder |
| "free reprint if unsatisfied", "100% satisfaction guarantee", "Quality guarantee" | [PB]/[SAD]/[SPI]/[CATALOG] spec strips | **Guarantee-language red line.** Not used anywhere in the draft |
| "95%+ color accuracy" (catalog) | [TS] line 5657 | Unverifiable percentage; omitted |
| "ISO 12647" | [SIB] | Not on the books surfaces I probed for this article; omitted |

## Red-line self-audit on the deliverable

- No `<img>` / `<figure>` / `<script>` / JSON-LD in `content.en` — verified 0 occurrences.
- No competitor name, no "vs", no "cheaper than", no competitor MOQ number — verified 0 occurrences.
- No guarantee language (`guarantee` / `promise` / `ensure` / `assure` / `fully compliant`) — verified 0 occurrences.
- No GSC back-office vocabulary (`GSC`, `pos`, `imps`, `impressions`, `rank`, `query`, `CTR`) — verified 0 occurrences.
- No CJK or fullwidth characters anywhere in the file — verified 0 occurrences.
- Internal links: 11 unique paths, all inside the §4 whitelist — verified 0 off-list.
- Brand: `ZprintPro` appears once in `title.en`, and the brand string in the body is `ZprintPro` only; no `智印港` / `智印印港` anywhere (CJK count is 0).
- `src/` was never written to by this task (see the note in the handover report about pre-existing/parallel `src/` modifications).
