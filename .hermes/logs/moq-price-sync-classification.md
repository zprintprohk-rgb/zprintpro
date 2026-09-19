# 價目同步波 — 全量分類報告 (v2 強化品類歸屬)

**產出**: 2026-09-19 · `scripts/moq10-price-sync-report.ts` · 分類器 = `classifyMoqString()` (同一 SSoT)

```
數據來源:
- 掃描: src/data / src/lib / src/app 內 .ts/.tsx (排除 .bak / 生成檔 / 測試 / quote-engine)
- 檔案數: 111 · 命中數: 1833
- 品類歸屬: L1 最近產品名 (命中位置 ±60 字取最近) — v1 的「整行滑窗」已證實會大量假陽性
- 剔除: L2 註釋行 · L3 已達標值 / 共享模板句 (轉人工)
- 校準日期: 2026-09-19
```

## 一、分類分布

| 分類 | 數量 | 佔比 |
|---|---|---|
| moq_display | 936 | 51.1% |
| price_tier | 744 | 40.6% |
| other | 117 | 6.4% |
| industry_fact | 36 | 2.0% |
| **合計** | **1833** | 100% |

## 二、品類分布

| 品類 | 數量 | 本批? | 目標 MOQ |
|---|---|---|---|
| 未歸類 | 711 | ❓ | — |
| 貼紙/標籤 | 220 | ✅ 本批 | 10 張 |
| 信封 | 218 | ➖ 非本批 | 100 個 |
| 書刊/畫冊 | 124 | ✅ 本批 | 10 本 |
| 傳單 | 119 | ✅ 本批 | 10 張 |
| 包裝盒 | 91 | ➖ 非本批 | 100 個 |
| 海報 | 70 | ✅ 本批 | 1 張 |
| 紙袋 | 61 | ➖ 非本批 | 100 個 |
| 賀卡 | 53 | ✅ 本批 | 10 張 |
| 餐牌 | 53 | ➖ 非本批 | 100 個 |
| 教科書/練習 | 34 | ➖ 非本批 | 100 本 |
| 利是封 | 27 | ➖ 非本批 | 100 個 |
| 月曆 | 22 | ➖ 非本批 | 1000 本 |
| 橫額/噴繪 | 16 | ➖ 非本批 | 1 個 |
| 同人周邊 | 14 | ➖ 非本批 | 4 件 |

## 三、行動清單

| 行動 | 數量 | 說明 |
|---|---|---|
| ① 改 MOQ 數字 | 179 | 本批品類且數字未達標 → 改為現行 MOQ |
| ② 改格式不改數字 | 609 | price_tier → 「XX 張檔位：HK$YY」 |
| ③ 保留不動 | 396 | 非本批品類 / industry_fact / 已達標 |
| ④ 人工判斷 | 649 | 共享模板句 / 未歸類 |

## 四、按檔案分布

| 檔案 | 命中 | ①改MOQ | ②改格式 | ③保留 | ④人工 |
|---|---|---|---|---|---|
| `src/data/sku-seo-data.ts` | 661 | 47 | 367 | 42 | 205 |
| `src/data/products-content.ts` | 368 | 18 | 1 | 158 | 191 |
| `src/data/products.ts` | 152 | 4 | 36 | 67 | 45 |
| `src/data/category-conversion-blocks.ts` | 141 | 19 | 42 | 25 | 55 |
| `src/data/category-seo-content.ts` | 119 | 36 | 29 | 23 | 31 |
| `src/data/blog-posts.ts` | 101 | 11 | 40 | 15 | 35 |
| `src/lib/seo.ts` | 71 | 3 | 42 | 19 | 7 |
| `src/data/buying-guides.ts` | 64 | 19 | 29 | 3 | 13 |
| `src/app/[locale]/services/catalog-printing-china/page.tsx` | 42 | 12 | 3 | 1 | 26 |
| `src/app/[locale]/category/[slug]/page.tsx` | 18 | 3 | 1 | 9 | 5 |
| `src/app/[locale]/business-card-printing/page.tsx` | 17 | 0 | 0 | 0 | 17 |
| `src/app/[locale]/blog/[slug]/page.tsx` | 14 | 1 | 7 | 4 | 2 |
| `src/data/print-method-policy.ts` | 12 | 0 | 1 | 1 | 10 |
| `src/data/product-faqs.ts` | 11 | 2 | 4 | 4 | 1 |
| `src/app/[locale]/services/rush-printing-delivery/page.tsx` | 9 | 1 | 1 | 6 | 1 |
| `src/lib/h1-builder.ts` | 7 | 0 | 0 | 5 | 2 |
| `src/lib/seo-keywords.ts` | 6 | 0 | 0 | 4 | 2 |
| `src/app/[locale]/product/[slug]/page.tsx` | 5 | 0 | 3 | 2 | 0 |
| `src/app/[locale]/services/page.tsx` | 5 | 0 | 0 | 5 | 0 |
| `src/data/insights/hk-print-inquiry-index-vol1.ts` | 4 | 3 | 0 | 1 | 0 |
| `src/data/pillar-content.ts` | 4 | 0 | 3 | 0 | 1 |
| `src/lib/seo-related-queries.ts` | 1 | 0 | 0 | 1 | 0 |
| `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` | 1 | 0 | 0 | 1 | 0 |

## 五、行動清單① 明細 (本批品類待改 MOQ)

- `src/data/blog-posts.ts:936` **[書刊/畫冊 → 10本/張]** `30 本起印` — 'zh-hk': '插畫師、漫畫家、Comic-Con 同人攤位、VTuber 周邊設計師、文創品牌必睇。一本高質素同人誌決定品牌辨識度與粉絲忠誠度。智印港為香港同人市場提供 30 本起印 + 5 大
- `src/data/blog-posts.ts:937` **[書刊/畫冊 → 10本/張]** `30-copy MOQ` — en: 'Indie comic creators, zine makers, Comic-Con Artist Alley exhibitors, indie game studios — prem
- `src/data/blog-posts.ts:1230` **[書刊/畫冊 → 10本/張]** `100 張起印` — 'zh-hk': '香港新盤代理 / 二手樓經紀 / 物業管理必睇。157g 雙銅紙 A4 摺頁 + 騎馬釘小手冊 + 100 張起印，3-5 個工作天交付，順豐本地 + DHL 全球 2-4 天配送
- `src/data/blog-posts.ts:1412` **[傳單 → 10本/張]** `100 張起印` — 'zh-hk': '香港餐廳開幕 / 活動 late-call / 地產快銷旺季,Q1-Q2 同期急單需求 +35%。即日傳單印刷 100 張起印,4-6 小時特急,順豐本地 / DHL 全球,7 種
- `src/data/blog-posts.ts:1431` **[海報 → 1]** `100 張起印` — 'zh-hk': '香港即日急件印刷 100 張起印，18:00 截單，順豐翌日中午 12:00 前送到。6 大場景 (展會/投標/海報/傳單/易拉寶/貼紙) + 4 條 FAQ + 5 條內部連結,
- `src/data/blog-posts.ts:1433` **[海報 → 1]** `100 枚〜` — ja: '香港当日特急印刷 100 枚〜, 18:00 締切, SF翌日12時前配送. 6 シーン (展示/入札/ポスター/チラシ/バナー/ステッカー) + 4 FAQ + 5 内部リンク, 3 ルー
- `src/data/blog-posts.ts:1545` **[書刊/畫冊 → 10本/張]** `50 本起印` — 'zh-hk': '畫冊印刷點揀？攝影集、展覽圖錄、產品型錄 4 大類型規格表，銅版紙/啞粉紙/特種紙紙材對比，硬皮精裝/膠裝/騎馬釘裝訂攻略，附 4 條 FAQ，50 本起印，3-5 個工作天交付。
- `src/data/blog-posts.ts:1947` **[書刊/畫冊 → 10本/張]** `100 部から` — ja: 'ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から | ZprintPro',
- `src/data/blog-posts.ts:1977` **[書刊/畫冊 → 10本/張]** `100 部から` — ja: '絵本印刷：ハードカバー 32 ページ 100 部から | ZprintPro',
- `src/data/blog-posts.ts:2002` **[書刊/畫冊 → 10本/張]** `1 本起印` — 'zh-hk': "寫真書印刷：相冊相簿精裝 1 本起印 100 本更平 | 智印港",
- `src/data/blog-posts.ts:2034` **[書刊/畫冊 → 10本/張]** `1 本起印` — 'zh-hk': "自費出版印刷：1 本起印、無最低起訂量 平裝精裝 | 智印港",
- `src/data/buying-guides.ts:31` **[賀卡 → 10本/張]** `100 張起印` — 'zh-hk': '由 300g 銅版紙到 400g 厚卡、由燙金到 3D 立體，香港賀卡印刷選購全攻略。智印港拆解紙張、工藝、價格與交期，100 張起印、免費打樣，助您印出最有心意的賀卡。',
- `src/data/buying-guides.ts:32` **[賀卡 → 10本/張]** `100 MOQ` — en: 'From 300g art board to 400g thick stock, foil stamping to 3D pop-up - a complete guide to custo
- `src/data/buying-guides.ts:33` **[賀卡 → 10本/張]** `100枚から` — ja: '300gアート紙から400g厚紙、箔押しからポップアップまで—グリーティングカード印刷の選び方完全ガイド。100枚から注文可、無料サンプル、DHLで2-4日納品。',
- `src/data/buying-guides.ts:44` **[賀卡 → 10本/張]** `100 張起印` — 'zh-hk': `<p>賀卡是少數「一定會被翻開看」的印刷品：企業年終答謝、婚禮感謝、聖誕新年祝福，一張有質感的賀卡勝過十則群發訊息。但紙張克重、燙金工藝、起印數量選擇繁多，報價差異也大。本文以智印
- `src/data/buying-guides.ts:60` **[賀卡 → 10本/張]** `100 MOQ` — 'en': `<p>Greeting cards are the rare print piece people actually open: corporate thank-yous, weddin
- `src/data/buying-guides.ts:74` **[賀卡 → 10本/張]** `100枚から` — 'ja': `<p>グリーティングカードは「必ず手に取って開いてもらえる」希少な印刷物です。企業のサンキューカード、ウェディングの挨拶、クリスマス・新年のメッセージに、質の高いカード1枚は大量送信のメ
- `src/data/buying-guides.ts:117` **[貼紙/標籤 → 10本/張]** `50 個起印` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙 50 個起印，數碼快印免庫存壓力；標準訂單 100 張起，燙金／防偽等特殊工藝 500 張起。</
- `src/data/buying-guides.ts:117` **[貼紙/標籤 → 10本/張]** `100 張起` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙 50 個起印，數碼快印免庫存壓力；標準訂單 100 張起，燙金／防偽等特殊工藝 500 張起。</
- `src/data/buying-guides.ts:117` **[貼紙/標籤 → 10本/張]** `500 張起` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙 50 個起印，數碼快印免庫存壓力；標準訂單 100 張起，燙金／防偽等特殊工藝 500 張起。</
- `src/data/buying-guides.ts:181` **[貼紙/標籤 → 10本/張]** `50枚から` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p>ステッカーは50枚から注文可（デジタル小ロット）。標準注文は100枚から、箔押し・偽造防止などの特殊加工
- `src/data/buying-guides.ts:181` **[貼紙/標籤 → 10本/張]** `100枚から` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p>ステッカーは50枚から注文可（デジタル小ロット）。標準注文は100枚から、箔押し・偽造防止などの特殊加工
- `src/data/buying-guides.ts:181` **[貼紙/標籤 → 10本/張]** `500枚から` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p>ステッカーは50枚から注文可（デジタル小ロット）。標準注文は100枚から、箔押し・偽造防止などの特殊加工
- `src/data/buying-guides.ts:733` **[書刊/畫冊 → 10本/張]** `50 本起印` — <div class="bg-amber-50 rounded-lg p-4 my-4"><p><strong>最少訂幾多本？</strong>書刊 50 本起印（數碼印刷），500/1000/500
- `src/data/buying-guides.ts:747` **[書刊/畫冊 → 10本/張]** `50 本起印` — <p>以上為大批量柯式口徑；小批量可用數碼印刷，50 本起印，詳見<a href="/zh-hk/category/books/">書刊印刷類別</a>。</p>
- `src/data/buying-guides.ts:749` **[書刊/畫冊 → 10本/張]** `50 本起印` — <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【書刊 50 本起印：騎馬釘小冊子 50 本起、膠裝書 100 本起、精裝書 50 本起；批量 500/1
- `src/data/buying-guides.ts:750` **[書刊/畫冊 → 10本/張]** `50 本起印` — <p>智印港書刊 50 本起印（數碼印刷），個人出版、活動場刊同市場測試都唔使囤貨；500 本以上轉柯式印刷，單本成本大幅下降。</p>
- `src/data/buying-guides.ts:819` **[書刊/畫冊 → 10本/張]** `50 冊から` — <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【書籍印刷 50 冊から：中綴じ冊子 50 冊〜、無線綴じ書籍 100 冊〜、上製本 50 冊〜；500/
- `src/data/buying-guides.ts:820` **[書刊/畫冊 → 10本/張]** `50 冊から` — <p>ZprintProの書籍印刷は 50 冊から（デジタル印刷）、個人出版・イベント冊子・市場テストに最適で在庫の心配なし；500 冊以上はオフセット印刷で単価が大幅に低下します。</p>
- `src/data/buying-guides.ts:916` **[貼紙/標籤 → 10本/張]** `MOQ 100` — 'zh-hk': 'FDA 認可膠水、防水面層、細 MOQ 100 張起。智印港食品級貼紙完整規格：FDA 21 CFR 175.105 文件、防水啞面／亮面、免費異形模切、DHL 2-4 日送達美國
- `src/data/category-conversion-blocks.ts:74` **[貼紙/標籤 → 10本/張]** `100 張起印` — "title": "貼紙印刷｜香港最快 2 日起貨｜小批量 100 張起印｜ZprintPro",
- `src/data/category-conversion-blocks.ts:75` **[貼紙/標籤 → 10本/張]** `100 張起印` — "metaDescription": "香港貼紙印刷專家，PVC/透明/啞銀/光粉多款材質，100 張起印，2-3 日出貨。立即 WhatsApp 報價：+86 198 8085 1334。",
- `src/data/category-conversion-blocks.ts:354` **[貼紙/標籤 → 10本/張]** `100枚から` — "title": "オリジナルステッカー印刷｜香港発・小ロット100枚から・2〜3日出荷｜ZprintPro",
- `src/data/category-conversion-blocks.ts:355` **[貼紙/標籤 → 10本/張]** `100枚から` — "metaDescription": "香港発のオリジナルステッカー印刷。PVC・透明・マット銀・光沢など9種以上、100枚から対応、2〜3日出荷。WhatsAppで今すぐお見積もり—ZprintPr
- `src/data/category-conversion-blocks.ts:795` **[傳單 → 10本/張]** `100 張起印` — "a": "常規單張 2-3 個工作天交貨，趕時間可問加急安排。MOQ 低至 100 張起印，適合小批量推廣。"
- `src/data/category-conversion-blocks.ts:1491` **[海報 → 1]** `100 張起` — "title": "海報印刷｜印海報 A0-A3 大圖輸出・戶外防水 PVC 100 張起｜智印港",
- `src/data/category-conversion-blocks.ts:2320` **[傳單 → 10本/張]** `100枚から` — "title": "チラシ印刷 | フライヤー印刷・チラシ作成 | A6〜A3 100枚から 即日特急対応｜ZprintPro",
- `src/data/category-conversion-blocks.ts:2435` **[傳單 → 10本/張]** `100枚から` — { "q": "チラシの最小発注数（MOQ）は何枚からですか？", "a": "デジタル印刷は100枚から承ります。新店開業やイベントの試し配布にも十分な枚数です。1,000枚以上はオフセット印刷に切
- `src/data/category-conversion-blocks.ts:3589` **[書刊/畫冊 → 10本/張]** `100 本起印` — "a": "五款書刊（騎馬釘書刊小冊子、無線膠裝書、精裝書、線圈筆記本、畫冊型錄）劃一 100 本起印；"
- `src/data/category-conversion-blocks.ts:3701` **[書刊/畫冊 → 10本/張]** `100 本起印` — { "q": "印書最少要印幾多本？有冇批量優惠？", "a": "五款書刊（騎馬釘書刊小冊子、無線膠裝書、精裝書、線圈筆記本、畫冊型錄）劃一 100 本起印；以騎馬釘小冊子為例，100 本有 85 
- `src/data/category-conversion-blocks.ts:3871` **[書刊/畫冊 → 10本/張]** `100冊から` — "metaDescription": "教材・テキスト・冊子印刷は工場直送。中綴じ冊子は1冊￥258〜、無線綴じ書籍は1冊￥644〜、上製本は1冊￥1,932〜、カタログは1冊￥644〜。いずれも10
- `src/data/category-conversion-blocks.ts:3879` **[書刊/畫冊 → 10本/張]** `100冊から` — "a": "無線綴じ書籍は1冊￥644〜、上製本（ハードカバー）は1冊￥1,932〜で、いずれも100冊から製造します。"
- `src/data/category-conversion-blocks.ts:3883` **[書刊/畫冊 → 10本/張]** `100冊から` — "a": "対応しています。中綴じ・無線綴じ・上製本すべて100冊からのご注文で、教材やテキストの小ロット製本にも対応します。"
- `src/data/category-conversion-blocks.ts:3990` **[書刊/畫冊 → 10本/張]** `100冊から` — { "q": "教材やテキストの印刷はいくらから依頼できますか？", "a": "教材・テキストでよく使われる中綴じ冊子は1冊￥258〜、ページ数の多いカタログ・図録は1冊￥644〜で、いずれも100
- `src/data/category-conversion-blocks.ts:3991` **[書刊/畫冊 → 10本/張]** `100冊から` — { "q": "無線綴じと上製本はそれぞれ何冊から注文できますか？", "a": "無線綴じ書籍は1冊￥644〜、上製本（ハードカバー）は1冊￥1,932〜で、いずれも100冊から製造します。無線綴じ
- `src/data/category-conversion-blocks.ts:3992` **[書刊/畫冊 → 10本/張]** `100冊から` — { "q": "無線綴じの小ロット製本には対応していますか？", "a": "対応しています。中綴じ・無線綴じ・上製本すべて100冊からのご注文で、教材やテキストの小ロット製本にも対応します。ページ数
- `src/data/category-conversion-blocks.ts:3995` **[書刊/畫冊 → 10本/張]** `100冊から` — "a": "中綴じ冊子・無線綴じ書籍・上製本はいずれも100冊から承ります。目安価格は中綴じ冊子1冊￥258〜、無線綴じ1冊￥644〜、上製本1冊￥1,932〜です。ページ数・紙質・部数により単価が変
- `src/data/category-conversion-blocks.ts:4003` **[書刊/畫冊 → 10本/張]** `100冊から` — "a": "2.5mm厚のボード表紙にクロスまたは紙を装丁し、箔押しタイトルやリボン栞を追加できます。卒業記念アルバム・記念誌・保存版テキストに人気の仕様です。上製本は100冊から、1冊￥1,932〜
- `src/data/category-conversion-blocks.ts:4007` **[書刊/畫冊 → 10本/張]** `100冊から` — "a": "はい。中綴じ・無線綴じ・上製本とも100冊から承りますので、講習会テキストや配布資料などの小ロットにも対応します。大口部数は段階的な数量割引が適用され、学校・塾・企業の定期発注にも対応しま
- `src/data/category-seo-content.ts:712` **[書刊/畫冊 → 10本/張]** `50 本起印` — h2: '騎馬釘小冊子 / 騎馬釘書刊 / 畫冊印刷 / 產品型錄印刷 / 大量印刷 — 50 本起印, 8-64 頁全規格, 30 秒 AI 報價',
- `src/data/category-seo-content.ts:912` **[書刊/畫冊 → 10本/張]** `50冊から` — h2: '中綴じ冊子 / カタログ印刷 / 大量印刷 / 卸売印刷 / 国際配送 — 50冊から, 8-64ページ全規格, 30秒 AI 見積もり',
- `src/data/category-seo-content.ts:969` **[貼紙/標籤 → 10本/張]** `1冊から` — { label: '最小発注数', value: '1冊から（デジタル印刷）。100冊以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:1599` **[貼紙/標籤 → 10本/張]** `500枚から` — { label: '最小発注数', value: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:1916` **[貼紙/標籤 → 10本/張]** `50冊から` — { label: '最小発注数', value: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:2217` **[貼紙/標籤 → 10本/張]** `500枚から` — { label: '最小発注数', value: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:2509` **[貼紙/標籤 → 10本/張]** `50冊から` — { label: '最小発注数', value: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:2665` **[貼紙/標籤 → 10本/張]** `50 個起印` — h2: '貼紙印刷 / 戶外貼紙 / 防水貼紙 / 可移貼紙 — 50 個起印 5-7 天交期',
- `src/data/category-seo-content.ts:2722` **[貼紙/標籤 → 10本/張]** `50 張起` — { label: '起訂量', value: '50 張起訂（數碼印刷），1,000 張以上柯式印刷更經濟' },
- `src/data/category-seo-content.ts:2739` **[貼紙/標籤 → 10本/張]** `50 張起印` — '貼紙印刷揀款一句講晒：室內用銅版紙、戶外用 PVC 防水、要撕得甩用可移貼紙、要通透感用透明貼。50 張起印、即日可交，最細 25×25mm 都印到；落單前答埋「貼喺邊、貼幾耐」兩條問題，就唔會揀錯
- `src/data/category-seo-content.ts:2745` **[貼紙/標籤 → 10本/張]** `50 張起` — '搜「貼紙訂製」嘅客戶最常問色差同起訂量：數碼印刷 50 張起免製版，打樣當日完成；柯式 1,000 張起更抵。戶外貼紙記得指明要 UV 油墨加過膠，先頂得住香港夏天嘅日曬雨淋。',
- `src/data/category-seo-content.ts:2745` **[貼紙/標籤 → 10本/張]** `1,000 張起` — '搜「貼紙訂製」嘅客戶最常問色差同起訂量：數碼印刷 50 張起免製版，打樣當日完成；柯式 1,000 張起更抵。戶外貼紙記得指明要 UV 油墨加過膠，先頂得住香港夏天嘅日曬雨淋。',
- `src/data/category-seo-content.ts:2756` **[貼紙/標籤 → 10本/張]** `50 張起` — { q: '貼紙印刷最低多少張起？', a: '50 張起訂（數碼印刷）。1,000 張以上柯式印刷更經濟。' },
- `src/data/category-seo-content.ts:2876` **[貼紙/標籤 → 10本/張]** `50枚から` — h2: 'ステッカー 印刷 / 屋外 ステッカー / 防水ステッカー / 剥がせるステッカー — 50枚から 5-7日納期',
- `src/data/category-seo-content.ts:2933` **[貼紙/標籤 → 10本/張]** `50枚から` — { label: '最小発注数', value: '50枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:2950` **[貼紙/標籤 → 10本/張]** `50枚から` — 'オリジナルステッカーは「屋内はコート紙、屋外は防水ビニール、仮止めは再剥離、透明感はクリア素材」と覚えればOK。50枚からの小ロット、当日デジタル仕上げ対応。「どこに・どのくらい貼るか」を決めれば素
- `src/data/category-seo-content.ts:2965` **[貼紙/標籤 → 10本/張]** `50枚から` — { q: 'シール印刷の最小発注数は？', a: '50枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:2987` **[傳單 → 10本/張]** `100 張起印` — h2: '宣傳單張 / 宣傳單張印刷 / 傳單印刷 / 彩色單張 — A3-A6 全尺寸 100 張起印, 即日特急可選',
- `src/data/category-seo-content.ts:3044` **[貼紙/標籤 → 10本/張]** `100 張起` — { label: '起訂量', value: '100 張起訂（數碼印刷），1,000 張以上柯式印刷更經濟' },
- `src/data/category-seo-content.ts:3185` **[傳單 → 10本/張]** `100枚から` — h2: 'チラシ 印刷 / チラシ 作成 / フライヤー 印刷 / 両面カラーチラシ — A6-A3 100枚から, 即日特急対応',
- `src/data/category-seo-content.ts:3242` **[貼紙/標籤 → 10本/張]** `100枚から` — { label: '最小発注数', value: '100枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' },
- `src/data/category-seo-content.ts:3289` **[海報 → 1]** `100 張起印` — h2: '印海報 / 海報印刷 / MTR 12-sheet 燈箱海報 — A0-A3 全尺寸 100 張起印, 防水 PP/PVC, 同日特急可選',
- `src/data/category-seo-content.ts:3346` **[貼紙/標籤 → 10本/張]** `1 張起` — { label: '起訂量', value: '1 張起訂（大圖輸出），10 張以上批量優惠' },
- `src/data/category-seo-content.ts:3499` **[海報 → 1]** `10枚から` — h2: 'ポスター 印刷 / ポスター 印刷 費用 / ポスター プリント / a3 ポスター サイズ — A0-A3 全サイズ 10枚から, 即日特急対応',
- `src/data/category-seo-content.ts:3556` **[貼紙/標籤 → 10本/張]** `1枚から` — { label: '最小発注数', value: '1枚から（大判出力）。10枚以上は大口割引あり。' },
- `src/data/category-seo-content.ts:3992` **[貼紙/標籤 → 10本/張]** `50 張起` — { label: '起訂量', value: '同人誌 10 本起 / 貼紙 50 張起 / 海報 10 張起 / 壓克力 5 個起' },
- `src/data/category-seo-content.ts:3992` **[海報 → 1]** `10 張起` — { label: '起訂量', value: '同人誌 10 本起 / 貼紙 50 張起 / 海報 10 張起 / 壓克力 5 個起' },
- `src/data/category-seo-content.ts:4112` **[貼紙/標籤 → 10本/張]** `MOQ 50` — { q: 'Can I get custom die-cut stickers?', a: 'Yes. Any shape die-cut (rounded, irregular, character
- `src/data/category-seo-content.ts:4218` **[賀卡 → 10本/張]** `100 張起印` — h2: '賀卡印刷 · 100 張起印 · 3D 立體爆款 · 順豐本地 + DHL 全球配送',
- `src/data/category-seo-content.ts:4267` **[貼紙/標籤 → 10本/張]** `100 張起印` — { label: '起訂量', value: '100 張起印,500 張享批量折扣,50 張可議 (小批量試產)' },
- `src/data/category-seo-content.ts:4298` **[賀卡 → 10本/張]** `100 張起印` — { q: '賀卡印刷最少印幾多張?', a: '100 張起印。50 張小批量可議,適合設計確認或首批客戶。' },
- `src/data/category-seo-content.ts:4392` **[賀卡 → 10本/張]** `100枚から` — h2: 'グリーティングカード印刷 | 100枚から | 立体 3D ヒット商品 | DHL 2-4日配送',
- `src/data/category-seo-content.ts:4441` **[貼紙/標籤 → 10本/張]** `100 枚から` — { label: '最小数量', value: '100 枚から、500 枚以上で数量割引、50 枚対応可 (小ロット試作)' },
- `src/data/category-seo-content.ts:4472` **[賀卡 → 10本/張]** `100 枚から` — { q: 'グリーティングカード印刷の最小注文数は?', a: '100 枚から。50 枚の小ロットもデザイン確認や初回クライアント様に可能。' },
- `src/data/category-seo-content.ts:4838` **[貼紙/標籤 → 10本/張]** `50 張起印` — { label: '起訂量', value: '50 張起印,200 張享批量折扣,100 張享 9 折' },
- `src/data/category-seo-content.ts:5016` **[貼紙/標籤 → 10本/張]** `50 枚から` — { label: '最小数量', value: '50 枚から、200 枚以上で数量割引、100 枚で 10%OFF' },
- `src/data/insights/hk-print-inquiry-index-vol1.ts:22` **[書刊/畫冊 → 10本/張]** `100 部から` — a: '50-100 部から, 短納期 24-72h。学园祭印刷 / 卒業記念アルバム 100 部から, 同人誌印刷 10 部から, ステッカー印刷 50 枚から。',
- `src/data/insights/hk-print-inquiry-index-vol1.ts:22` **[書刊/畫冊 → 10本/張]** `100 部から` — a: '50-100 部から, 短納期 24-72h。学园祭印刷 / 卒業記念アルバム 100 部から, 同人誌印刷 10 部から, ステッカー印刷 50 枚から。',
- `src/data/insights/hk-print-inquiry-index-vol1.ts:22` **[貼紙/標籤 → 10本/張]** `50 枚から` — a: '50-100 部から, 短納期 24-72h。学园祭印刷 / 卒業記念アルバム 100 部から, 同人誌印刷 10 部から, ステッカー印刷 50 枚から。',
- `src/data/product-faqs.ts:327` **[海報 → 1]** `10張起` — 'zh-hk': '智印港提供A2海報印刷服務，最低10張起訂。無論是戶外防水海報、展覽海報或燙金海報，均可少批量定製，適合活動宣傳及零售推廣。詳情請參閱《海報印刷完全指南》。',
- `src/data/product-faqs.ts:329` **[海報 → 1]** `10枚から` — 'ja': 'ZprintProではA2ポスター印刷に対応しており、最小ロットは10枚からです。屋外防水ポスター、展示会用ポスター、箔押しポスターなど、イベント宣伝や小売広告に最適です。詳しくは「ポス
- `src/data/products-content.ts:276` **[賀卡 → 10本/張]** `50枚〜` — <details class="my-2"><summary><strong>ZprintPro の最小注文数量は？</strong></summary><p>ジープリントは小ロット対応可能。ステッカ
- `src/data/products-content.ts:390` **[賀卡 → 10本/張]** `50枚〜` — <details class="my-2"><summary><strong>ZprintPro の最小注文数量は？</strong></summary><p>ジープリントは小ロット対応可能。ステッカ
- `src/data/products-content.ts:550` **[賀卡 → 10本/張]** `MOQ 100` — <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・少数役員も対応、特急料金で 50 枚も対応可能</li>
- `src/data/products-content.ts:787` **[賀卡 → 10本/張]** `MOQ 100` — <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・小規模チームも対応、特急料金で 50 枚も対応可能</li>
- `src/data/products-content.ts:1021` **[賀卡 → 10本/張]** `MOQ 100` — <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・小規模チームも対応、特急料金で 50 枚も対応可能</li>
- `src/data/products-content.ts:1253` **[賀卡 → 10本/張]** `MOQ 100` — <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・小規模チームも対応、特急料金で 50 枚も対応可能</li>
- `src/data/products-content.ts:1364` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:1578` **[貼紙/標籤 → 10本/張]** `50 枚〜` — <details class="my-2"><summary><strong>小ロットステッカーの最小注文数量（MOQ）は？</strong></summary><p>防水 Vinyl／透明 PVC 
- `src/data/products-content.ts:1702` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:1937` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:2221` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:2467` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:2546` **[貼紙/標籤 → 10本/張]** `100 枚から` — <p>ZprintPro の箔押しステッカーは、ロゴ・パッケージ・シールに金属光沢を加える高級印刷。金箔・銀箔・ローズゴールド箔・銅箔・ホログラム箔・ブラシメタル箔の 6 種類から選択可能、ビニールま
- `src/data/products-content.ts:2588` **[貼紙/標籤 → 10本/張]** `MOQ 100` — <li><strong>MOQ 100 枚</strong>：少量イベント・ウェディングシールも対応、特急料金でさらに小ロットも対応可能</li>
- `src/data/products-content.ts:2706` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:2943` **[貼紙/標籤 → 10本/張]** `500 張起印` — <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p>
- `src/data/products-content.ts:10062` **[書刊/畫冊 → 10本/張]** `1部から` — longDescriptionJa: `ハードカバー精裝書籍をZprintProでご注文。プレミアム仕上げの精裝本は、上質紙90g本文＋ハードケース表紙で、長期保存・高級感を両立した印刷物です。1部か
- `src/data/products-content.ts:11576` **[書刊/畫冊 → 10本/張]** `50 部から` — <details class="my-2"><summary><strong>ジープリントの卒業記念アルバムの最低注文数量は？</strong></summary><p>ジープリントの卒業記念アルバム
- `src/data/products.ts:338` **[賀卡 → 10本/張]** `100個起印` — name: '燙金/燙銀賀卡 | 賀卡 / 燙銀工藝 / 婚禮卡', nameEn: 'Foil-Stamped Greeting Cards | Gold/Silver Foil Wedding C
- `src/data/products.ts:716` **[貼紙/標籤 → 10本/張]** `100個起印` — name: '防水貼紙 / 戶外貼紙 訂製 | PVC 防水 / 異形貼紙', nameEn: 'Waterproof Stickers / Outdoor Stickers | Waterproof
- `src/data/products.ts:915` **[貼紙/標籤 → 10本/張]** `50張起印` — name: '可移貼紙(無殘膠) / 可移貼紙訂製 | 防水貼紙 / 異形貼紙', nameEn: 'Removable Stickers | Waterproof & Die-Cut Sticker
- `src/data/products.ts:5766` **[書刊/畫冊 → 10本/張]** `MOQ 100` — faqSchema: [{"question": "What is the difference between perfect bound and saddle stitch?", "answer"
- `src/data/sku-seo-data.ts:31` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "防水貼紙/防水貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計
- `src/data/sku-seo-data.ts:82` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "透明貼紙/透明貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計
- `src/data/sku-seo-data.ts:125` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "可移貼紙/不殘膠貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設
- `src/data/sku-seo-data.ts:184` **[貼紙/標籤 → 10本/張]** `50 枚〜` — "title": "小ロットステッカー 50 枚〜 $0.045 | 防水PVC 2h 校正 | ZprintPro",
- `src/data/sku-seo-data.ts:185` **[貼紙/標籤 → 10本/張]** `50 枚〜` — "description": "オリジナル小ロットステッカー 50 枚〜 $0.045/枚〜。版代・型代ゼロ、2 時間無料デジタル校正、防水 PVC / BOPP 透明 / コート紙 3 素材、ダイカ
- `src/data/sku-seo-data.ts:212` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "異形模切貼紙/貼紙印刷 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由
- `src/data/sku-seo-data.ts:255` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "燙金貼紙/燙金貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計
- `src/data/sku-seo-data.ts:298` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "防偽貼紙/防偽貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計
- `src/data/sku-seo-data.ts:341` **[貼紙/標籤 → 10本/張]** `100 張起` — "description": "螢光貼紙/螢光貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計
- `src/data/sku-seo-data.ts:706` **[傳單 → 10本/張]** `100枚〜` — "title": "A4 チラシ | 両面フルカラー 100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:726` **[傳單 → 10本/張]** `100枚〜` — "ja": "A4チラシ / 両面カラー | A4チラシ印刷 両面4色 100枚〜 即日発送 | ZprintPro"
- `src/data/sku-seo-data.ts:753` **[傳單 → 10本/張]** `100枚〜` — "title": "A5 チラシ | 両面フルカラー 100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:773` **[傳單 → 10本/張]** `100枚〜` — "ja": "A5チラシ / 両面カラー | A5チラシ印刷 両面4色 100枚〜 即日発送 | ZprintPro"
- `src/data/sku-seo-data.ts:785` **[傳單 → 10本/張]** `100 張起` — "description": "雙面傳單印刷/傳單印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK 全彩印刷、logo 
- `src/data/sku-seo-data.ts:800` **[傳單 → 10本/張]** `100枚〜` — "title": "両面カラー印刷 両面チラシ | 両面フルカラー 100枚〜 翌日発送 | ZprintPro",
- `src/data/sku-seo-data.ts:802` **[傳單 → 10本/張]** `100枚〜` — "h1": "両面カラー印刷 両面チラシ | 100枚〜翌日発送",
- `src/data/sku-seo-data.ts:816` **[傳單 → 10本/張]** `100枚〜` — "ja": "両面チラシ / 両面カラー | 両面チラシ印刷 両面4色 100枚〜 即日発送 | ZprintPro"
- `src/data/sku-seo-data.ts:827` **[傳單 → 10本/張]** `100張起` — "title": "摺頁單張 | 雙面四色 100張起 | 智印港",
- `src/data/sku-seo-data.ts:865` **[傳單 → 10本/張]** `100張起` — "title": "厚身單張 | 雙面四色 100張起 | 智印港",
- `src/data/sku-seo-data.ts:866` **[傳單 → 10本/張]** `100 張起` — "description": "厚身單張/傳單印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案
- `src/data/sku-seo-data.ts:880` **[傳單 → 10本/張]** `100枚〜` — "title": "厚口チラシ | 両面フルカラー 100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:896` **[傳單 → 10本/張]** `100枚〜` — "ja": "厚口チラシ / 高耐久 | 厚口チラシ印刷 高耐久 100枚〜 即日発送 | ZprintPro"
- `src/data/sku-seo-data.ts:939` **[傳單 → 10本/張]** `100枚〜` — "ja": "即日チラシ / 両面カラー | 即日チラシ印刷 当日仕上げ 100枚〜 | ZprintPro"
- `src/data/sku-seo-data.ts:951` **[傳單 → 10本/張]** `100 張起` — "description": "環保傳單印刷/環保印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK 全彩印刷、logo 
- `src/data/sku-seo-data.ts:965` **[傳單 → 10本/張]** `100枚〜` — "title": "エコチラシ | 両面フルカラー 100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:1081` **[海報 → 1]** `10 張起` — "description": "戶外海報/戶外海報 10 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色 CMYK 全彩印刷、
- `src/data/sku-seo-data.ts:1097` **[海報 → 1]** `100枚〜` — "title": "屋外ポスター 防水・ラミネート・100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:1125` **[海報 → 1]** `10 張起` — "description": "展架海報/海報印刷 10 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色 CMYK 全彩印刷、
- `src/data/sku-seo-data.ts:1140` **[海報 → 1]** `100枚〜` — "title": "ディスプレイポスター印刷 100枚〜・最安 | ZprintPro",
- `src/data/sku-seo-data.ts:1179` **[海報 → 1]** `100枚〜` — "title": "アートポスター 100枚〜・最安値・無料校正 | ZprintPro",
- `src/data/sku-seo-data.ts:1207` **[海報 → 1]** `10 張起` — "description": "背膠海報/海報印刷 10 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色 CMYK 全彩印刷、
- `src/data/sku-seo-data.ts:2446` **[書刊/畫冊 → 10本/張]** `100枚〜` — "title": "中綴じ冊子 ラミネート・中綴じ・100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:2488` **[書刊/畫冊 → 10本/張]** `100枚〜` — "title": "無線綴じ冊子 ラミネート・中綴じ・100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:2816` **[書刊/畫冊 → 10本/張]** `100枚〜` — "title": "賞状印刷 箔押し・中綴じ・100枚〜・最安値 | ZprintPro",
- `src/data/sku-seo-data.ts:2843` **[傳單 → 10本/張]** `100張起` — "title": "學校單張 | 雙面四色 100張起 | 智印港",
- `src/data/sku-seo-data.ts:2844` **[傳單 → 10本/張]** `100 張起` — "description": "學校單張/學校 印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖
- `src/data/sku-seo-data.ts:2858` **[書刊/畫冊 → 10本/張]** `100枚〜` — "title": "学校チラシ ラミネート・中綴じ・100枚〜 | ZprintPro",
- `src/data/sku-seo-data.ts:2874` **[傳單 → 10本/張]** `100枚〜` — "ja": "学校チラシ / 學校向け | 学校チラシ印刷 両面4色 100枚〜 學校向け | ZprintPro"
- `src/data/sku-seo-data.ts:3095` **[貼紙/標籤 → 10本/張]** `500 張起` — "description": "水果及食品標籤印刷 500 張起, 採用防水 PVC 或 PP 合成紙, 通過 SGS 食品接觸安全認證, 適合水果店、有機食品、烘焙店、外賣包裝。48 小時快遞 (順
- `src/data/sku-seo-data.ts:3383` **[書刊/畫冊 → 10本/張]** `50 本起印` — "h1": "香港畢業紀念冊 — 50 本起印 騎馬釘 / 膠裝 / 精裝",
- `src/data/sku-seo-data.ts:3396` **[書刊/畫冊 → 10本/張]** `50 冊から` — "description": "卒業記念アルバム・校史特刊・同窓会誌・クラブ特刊印刷、50 冊から対応。中綴じ / 無線綴じ / 上製本の 3 方式、クラス写真・先生メッセージ・学校ロゴ全面対応。日本
- `src/data/sku-seo-data.ts:3408` **[書刊/畫冊 → 10本/張]** `50 本起印` — { "q": "畢業紀念冊印刷", "a": "香港畢業紀念冊 50 本起印, 騎馬釘 / 膠裝 / 精裝三種裝訂可選" },
- `src/data/sku-seo-data.ts:3596` **[賀卡 → 10本/張]** `100枚〜` — "title": "部分UVグリーティングカード 100枚〜 マット | ZprintPro",
- `src/data/sku-seo-data.ts:3597` **[賀卡 → 10本/張]** `100枚〜` — "description": "部分UVグリーティングカード印刷：マット下地に光沢UVのコントラスト、300gコート紙または合成紙。127×178mm標準、100枚〜HK$140〜。誕生日・クリスマス
- `src/data/sku-seo-data.ts:3646` **[賀卡 → 10本/張]** `100枚〜` — "description": "マットグリーティングカード印刷：なめらかなマット加工、指紋防止仕上げ、300gマット紙またはエコ紙。127×178mm標準、100枚〜HK$110〜。クリスマス・年賀・
- `src/data/sku-seo-data.ts:3694` **[賀卡 → 10本/張]** `100枚〜` — "title": "角丸グリーティングカード印刷 100枚〜 R3mm | ZprintPro",
- `src/data/sku-seo-data.ts:3695` **[賀卡 → 10本/張]** `100枚〜` — "description": "角丸グリーティングカード印刷：R3mmのやさしい丸角型抜き、300gコート紙またはアート紙。127×178mm標準、100枚〜HK$100〜。誕生日・クリスマス・感謝・
- `src/lib/seo.ts:608` **[書刊/畫冊 → 10本/張]** `50部〜` — 'ja': '冊子印刷｜50部〜・中綴じ・無線綴じ・上製本｜ZprintPro',
- `src/lib/seo.ts:644` **[賀卡 → 10本/張]** `100枚から` — ja: 'グリーティングカード印刷 · 100枚から · 立体 3D 対応 | ZprintPro',
- `src/lib/seo.ts:654` **[賀卡 → 10本/張]** `100枚から` — ja: 'グリーティングカード印刷 100枚から. 节日・誕生日・サンキュ・招待状・法人向け・立体 3D カード + 箔押し・UV・拔型加工. DHL 国際配送 2-4 日 + FSC 認証 + 30
- `src/app/[locale]/blog/[slug]/page.tsx:392` **[書刊/畫冊 → 10本/張]** `50 本起印` — description: '畫冊印刷點揀？攝影集、展覽圖錄、產品型錄 4 大類型規格表，銅版紙/啞粉紙/特種紙紙材對比，硬皮精裝/膠裝/騎馬釘裝訂攻略，附 4 條 FAQ，50 本起印，3-5 個工作
- `src/app/[locale]/category/[slug]/page.tsx:175` **[貼紙/標籤 → 10本/張]** `50 MOQ` — 'en': 'Small Batch Sticker Printing Free Shipping · 50 MOQ Die-Cut Vinyl Waterproof · Made for USA S
- `src/app/[locale]/category/[slug]/page.tsx:190` **[書刊/畫冊 → 10本/張]** `50 MOQ` — 'en': 'Custom Book Printing Free Shipping · 50 MOQ Saddle Hardcover Perfect Bound · USA Authors',
- `src/app/[locale]/category/[slug]/page.tsx:206` **[書刊/畫冊 → 10本/張]** `1000 MOQ` — 'en': 'Custom Calendars 2027 late-September window · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Co
- `src/app/[locale]/services/catalog-printing-china/page.tsx:23` **[書刊/畫冊 → 10本/張]** `50 MOQ` — title: 'China Catalog Printing | 50 MOQ + Shenzhen Factory + DHL 2-4 Days | 智印港 ZprintPro',
- `src/app/[locale]/services/catalog-printing-china/page.tsx:24` **[書刊/畫冊 → 10本/張]** `50 MOQ` — desc: 'China catalog printing from Shenzhen factory, 50 MOQ, free file check, 2h quote, DHL 2-4 day 
- `src/app/[locale]/services/catalog-printing-china/page.tsx:28` **[書刊/畫冊 → 10本/張]** `50 MOQ` — title: 'China Catalog Printing | 50 MOQ + Shenzhen Factory + DHL 2-4 Days | ZprintPro',
- `src/app/[locale]/services/catalog-printing-china/page.tsx:29` **[書刊/畫冊 → 10本/張]** `50 MOQ` — desc: 'China catalog printing from Shenzhen factory, 50 MOQ, free file check, 2h quote, DHL 2-4 day 
- `src/app/[locale]/services/catalog-printing-china/page.tsx:114` **[書刊/畫冊 → 10本/張]** `50 MOQ` — heroTitle: 'China Catalog Printing — Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days',
- `src/app/[locale]/services/catalog-printing-china/page.tsx:115` **[書刊/畫冊 → 10本/張]** `50 本起印` — heroSubtitle: '從深圳工廠直送全球嘅 catalog / brochure / magazine / lookbook 印刷, 50 本起印, 30 秒 AI 即時報價, ISO 900
- `src/app/[locale]/services/catalog-printing-china/page.tsx:195` **[書刊/畫冊 → 10本/張]** `50 MOQ` — heroTitle: 'China Catalog Printing — Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days',
- `src/app/[locale]/services/catalog-printing-china/page.tsx:659` **[書刊/畫冊 → 10本/張]** `50 MOQ` — <p className="text-sm text-blue-700">{locale === 'en' ? 'Saddle stitch / perfect bound / wire-O / ha
- `src/app/[locale]/services/catalog-printing-china/page.tsx:659` **[書刊/畫冊 → 10本/張]** `50部から` — <p className="text-sm text-blue-700">{locale === 'en' ? 'Saddle stitch / perfect bound / wire-O / ha
- `src/app/[locale]/services/catalog-printing-china/page.tsx:667` **[傳單 → 10本/張]** `100 MOQ` — <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets — 100 MOQ' :
- `src/app/[locale]/services/catalog-printing-china/page.tsx:667` **[傳單 → 10本/張]** `100枚から` — <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets — 100 MOQ' :
- `src/app/[locale]/services/catalog-printing-china/page.tsx:667` **[傳單 → 10本/張]** `100 張起` — <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets — 100 MOQ' :
- `src/app/[locale]/services/rush-printing-delivery/page.tsx:45` **[海報 → 1]** `10 moq` — keywords: 'same-day printing,rush printing,6pm cut-off,overnight print,next-day delivery,CMYK full c

## 六、行動清單④ 明細 (共享模板句 / 未歸類, 需人工)

- `src/data/blog-posts.ts:450` [未歸類] ja: 'オリジナルチラシ印刷完全ガイド。標準サイズ（A4・A5・B5・A6）・用紙（コート紙・マット紙・上質紙・再生紙）・加工（両面印刷・折り・PP加工）・小ロット対応（30枚〜5000枚）・短納期（3日〜7日出荷）。
- `src/data/blog-posts.ts:954` [未歸類] 'zh-hk': '香港酒店業、半島、洲際、悅榕庄、精品酒店同 B&B 民宿必睇。100 個起印 + 防水 PVC + 燙金 logo + 順豐本地配送 + 5-7 個工作天交貨。',
- `src/data/blog-posts.ts:973` [未歸類] en: 'US banks, wealth management firms, broker-dealers, insurance carriers, family offices: FSC-certified kraf
- `src/data/blog-posts.ts:990` [未歸類] 'zh-hk': '香港渣打馬拉松、街馬、半馬拉松、學界田徑必睇。100 張起印，A1/A2 防水 PP + 13oz 戶外燈布起跑拱門，順豐本地港九新界免運費，3-5 個工作天交貨。',
- `src/data/blog-posts.ts:991` [未歸類] en: 'US race directors, running clubs, charity foundations: 100 MOQ, waterproof A1/A2 + 13oz vinyl start arche
- `src/data/blog-posts.ts:992` [未歸類] ja: '日本のレースディレクター、ランニングクラブ、チャリティ財団向け。100 枚から対応、防水 A1/A2 + 13oz ビニール スタートアーチ、ランナーパケット挿入物、3-5 営業日生産、全国送料無料。',
- `src/data/blog-posts.ts:1008` [未歸類] 'zh-hk': '香港 4S 店、二手車行、汽車美容、輪胎中心、維修工場必睇。100 張起印，防水 PVC + 透明 BOPP + 耐油 PVC，順豐本地港九新界免運費，3-5 個工作天交貨。',
- `src/data/blog-posts.ts:1009` [未歸類] en: 'US car dealerships, auto body shops, tire centers, quick lubes, EV brand experience studios: 100 MOQ, wat
- `src/data/blog-posts.ts:1010` [未歸類] ja: '日本の自動車ディーラー、鈑金塗装工場、タイヤセンター、Quick Lube、EV ブランド体験スタジオ向け。100 枚から対応、防水 PVC + 透明 BOPP + 耐油ビニール、3-5 営業日生産、全国送料無
- `src/data/blog-posts.ts:1026` [未歸類] 'zh-hk': '香港五星級酒店、精品酒店、B&B 民宿、Airbnb 短租必睇。100 張起印，軟觸啞面 PVC + 燙金箔 + 局部 UV，順豐本地港九新界免運費，3-5 個工作天交貨。',
- `src/data/blog-posts.ts:1027` [未歸類] en: 'US five-star hotels, boutique hotels, B&Bs, Airbnb hosts, resort spas: 100 MOQ, soft-touch matte PVC + fo
- `src/data/blog-posts.ts:1028` [未歸類] ja: '日本の五つ星ホテル、ブティックホテル、B&B、民泊、リゾートスパ向け。100 枚から対応、ソフトタッチマット PVC + 箔押し + スポット UV、ルームキー スリーブ、荷物タグ、3-5 営業日生産、全国送料
- `src/data/blog-posts.ts:1213` [未歸類] 'zh-hk': '香港嬰幼兒食品品牌、奶粉商、輔食製造商必睇。FDA 認證食品級內襯折疊盒 + BPA-free 大豆油墨 + 100 個起印，5-7 個工作天交付，順豐本地 + DHL 全球 2-4 天配送。',
- `src/data/blog-posts.ts:1247` [未歸類] 'zh-hk': '醫療器械製造商 / 醫院供應商 / 牙科診所 / 體外診斷設備商必睇。1200g 灰板硬盒 + ISO 13485 + Tyvek 滅菌袋 + 100 個起印，7-10 個工作天交付，順豐本地 + D
- `src/data/blog-posts.ts:1248` [未歸類] en: 'US medical device manufacturers, hospital suppliers, dental clinics, IVD equipment makers: ISO 13485 cert
- `src/data/blog-posts.ts:1264` [未歸類] 'zh-hk': '汽車 4S 店 / 二手車行 / 汽車美容 / 輪胎中心 / 維修工場必睇。120g 加強牛皮紙 + 油污防護淋膜 + 燙金 logo + 100 個起印，5-7 個工作天交付，順豐本地 + DHL 
- `src/data/blog-posts.ts:1281` [未歸類] 'zh-hk': '球隊周邊 / 賽事紀念品 / 球迷收藏 / 賽事贊助商必睇。1200g 灰板硬盒 + 燙金 logo + 序號印刷 + 100 個起印，7-10 個工作天交付，順豐本地 + DHL 全球 2-4 天配
- `src/data/blog-posts.ts:1282` [未歸類] en: 'US sports team merchandise, event memorabilia, fan collectibles, event sponsors: 1200gsm grayboard rigid 
- `src/data/blog-posts.ts:1412` [未歸類] 'zh-hk': '香港餐廳開幕 / 活動 late-call / 地產快銷旺季,Q1-Q2 同期急單需求 +35%。即日傳單印刷 100 張起印,4-6 小時特急,順豐本地 / DHL 全球,7 種現成紙材 + 3 工
- `src/data/blog-posts.ts:1414` [未歸類] ja: '日本 レストラン開業 / イベント late-call / 不動産クイック 繁忙期。100 個 MOQ スターター、4-6 時間特急、ヤマト運輸 1-3 日配送、5 種在庫用紙 + 3 加工制限 + 4 FAQ
- `src/data/blog-posts.ts:1432` [未歸類] en: 'Same-day printing HK from 100 MOQ, 6PM cut-off, SF Express next-day 12pm. 6 scenarios (trade show/tender/
- `src/data/blog-posts.ts:1587` [未歸類] en: '2027 calendar printing 9-month back-to-school corporate ramp. 4 types (wall / desk / monthly planner / pa
- `src/data/blog-posts.ts:1705` [未歸類] 'zh-hk': '9 月開學季校園印刷點揀? 5 大印刷品 (校刊/學生手冊/校園橫幅/畢業冊/證書) × 5 大材質 × 12 個應用場景 (4 大市場), 6 步印刷流程 + 30 秒 AI 報價, 18 SKU 
- `src/data/blog-posts.ts:1706` [未歸類] en: 'Back-to-school campus printing guide: 5 print products (yearbooks / student handbooks / campus banners / 
- `src/data/blog-posts.ts:1929` [未歸類] 'zh-hk': '2026 包裝盒印刷價格：精裝盒 / 摺盒 / 快遞盒 / 瓦楞盒。500/1000/5000 個階梯報價、4 種紙材、4 種工藝升級、FDA 21 CFR 食品級、FSC 認證。100 個起印，30
- `src/data/blog-posts.ts:1930` [未歸類] en: 'Packaging box printing pricing 2026 US: rigid box, folding carton, mailer box, corrugated box. 500/1000/5
- `src/data/blog-posts.ts:1976` [未歸類] en: 'Custom Picture Book Printing: 32pp, 100 MOQ | ZprintPro',
- `src/data/blog-posts.ts:2003` [未歸類] en: "Custom Photo Book Printing: MOQ 1, Bulk 100+ | ZprintPro",
- `src/data/blog-posts.ts:2004` [未歸類] ja: "フォトブック印刷：少部数 1部から 100部で割安 | ZprintPro",
- `src/data/blog-posts.ts:2007` [未歸類] 'zh-hk': "寫真書、相冊、攝影集由 1 本起印、無最低起訂量。本文拆解單價由頁數、開本、內頁紙同裝訂四項驅動的計法，對比數碼（HP Indigo，免開版費、交期短）同柯式（海德堡，100 本以上更經濟、色彩準確度
- `src/data/blog-posts.ts:2009` [未歸類] ja: "フォトブック・結婚アルバム・作品集は 1 部から、最低注文数なしで印刷できます。本記事では 1 部ごとの単価がページ数・判型・本文用紙・製本方法でどう決まるかを整理し、デジタル印刷（HP Indigo、版代なし
- `src/data/blog-posts.ts:2036` [未歸類] ja: "自費出版印刷：1 部から、最低注文数なし 並製本 | ZprintPro",
- `src/data/blog-posts.ts:2039` [未歸類] 'zh-hk': "自費出版印刷 1 本起印、無最低起訂量，呢份指南拆解五種裝訂方式同紙材點揀，講清楚 100 本由數碼轉柯式嘅分界線，並公開 100 本到 10,000 本嘅逐本參考單價階梯，最後逐項核對低 MOQ、快
- `src/data/blog-posts.ts:2041` [未歸類] ja: "自費出版の印刷は 1 部から、最低注文数なし。5 つの製本形式と用紙の選び方を比較し、100 部でデジタルからオフセットに切り替わる分岐点を解説します。100 部から 10,000 部までの 1 部単価ラダーを
- `src/data/blog-posts.ts:2041` [未歸類] ja: "自費出版の印刷は 1 部から、最低注文数なし。5 つの製本形式と用紙の選び方を比較し、100 部でデジタルからオフセットに切り替わる分岐点を解説します。100 部から 10,000 部までの 1 部単価ラダーを
- `src/data/buying-guides.ts:58` [共享模板] <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：賀卡最少可以印幾多張？</strong><br/>A：100 張起印。小批量數碼最快可
- `src/data/buying-guides.ts:82` [未歸類] <ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>用途と納期を決める</strong>：クリスマス・年賀状シーズンは6〜8週間前の発注が安心</li><li
- `src/data/buying-guides.ts:84` [未歸類] <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：最小ロットは？</strong><br/>A：100枚から。小ロットはデジタル（最短当
- `src/data/buying-guides.ts:252` [未歸類] <p>智印港傳單標準起印量係 <strong>100 張</strong>（per 智印港 A4/A5 傳單產品頁 MOQ 參數）。100 張適合活動當日街派或測試設計；穩步派發建議 500-1,000 張；大型推廣或長
- `src/data/buying-guides.ts:326` [未歸類] <p>ZprintPro のチラシ標準 MOQ は <strong>100 枚</strong>（ZprintPro A4/A5 チラシ製品ページによる）。100 枚は当日配布やデザインテスト向け、継続配布なら 500〜
- `src/data/buying-guides.ts:803` [未歸類] <div class="bg-amber-50 rounded-lg p-4 my-4"><p><strong>最小注文数は？</strong>書籍印刷は 50 冊から（デジタル印刷）、500/1000/5000 冊でボ
- `src/data/buying-guides.ts:817` [未歸類] <p>上記は大量オフセットの目安；小ロットはデジタル印刷で 50 冊から対応、詳細は<a href="/ja/category/books/">書籍印刷カテゴリー</a>をご覧ください。</p>
- `src/data/buying-guides.ts:873` [共享模板] <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：餐牌最少可以印幾多張？</strong><br/>A：100 張起訂，PVC 餐牌可單
- `src/data/buying-guides.ts:917` [未歸類] en: 'FDA food-safe adhesive, water-resistant finishes, small-batch MOQ 100-500 pcs. Free proof, free die-cut, 
- `src/data/buying-guides.ts:918` [未歸類] ja: 'FDA 食品グレード接着剤、防水ラミネート、小ロット MOQ 100-500 枚。無料サンプル、無料型抜き、FDA 証明書、DHL 2-4 日海外配送——US/EU 手工ブランドへアジア工場から直送。',
- `src/data/buying-guides.ts:929` [共享模板] 'zh-hk': '<p>蠟燭同手工皂標籤對 <strong>FDA 食品級材料</strong>、<strong>防水面層</strong>同 <strong>細批次 MOQ (100-500 張)</strong> 
- `src/data/buying-guides.ts:929` [共享模板] 'zh-hk': '<p>蠟燭同手工皂標籤對 <strong>FDA 食品級材料</strong>、<strong>防水面層</strong>同 <strong>細批次 MOQ (100-500 張)</strong> 
- `src/data/buying-guides.ts:929` [共享模板] 'zh-hk': '<p>蠟燭同手工皂標籤對 <strong>FDA 食品級材料</strong>、<strong>防水面層</strong>同 <strong>細批次 MOQ (100-500 張)</strong> 
- `src/data/category-conversion-blocks.ts:100` [未歸類] "stat": "100 張起",
- `src/data/category-conversion-blocks.ts:119` [未歸類] "500-1000 張起",
- …(其餘 599 條見 JSON)

## 七、v1 → v2 差異 (為何重做)

| 項目 | v1 | v2 |
|---|---|---|
| 品類判據 | 整行 + 前後 2 行滑窗 | **最近產品名** (命中位置 ±60 字) |
| 註釋行 | 計入 | 剔除 |
| 已達標值 | 誤列為待改 | 過濾 (轉③) |
| 共享模板句 | 誤歸單一品類 | 轉④人工 |
| 待改數 | 383 (含大量假陽性) | 見 §三 |

---

*本報告由 `scripts/moq10-price-sync-report.ts` 自動產生。抽驗未過之版本 (v1) 已作廢, 見 §七。*