# SKU 标题全量普查 (2026-09-19)

> 性质: **只读审计**。口径 SSoT = `scripts/guards/title-equiv.js` (半角当量, MIN=50 / MAX=58)
> 规则 SSoT = `docs/2026-09-13-title-batch-T-freeze.md` §6-3 (K3 9/13 终裁 目标区 **50-58 半角当量**, 取代 v4 的 50-54)

## 数据来源 (§0.23)
校准日期: 2026-09-19 11:56 UTC
- `src/data/sku-seo-data.ts` — 活 title 主源 (SKU × 3 locale)
- `src/data/products.ts` — slug → category_slug
- `.hermes/gsc-2026-09-18/extract.json` — GSC 28d 页面级 (窗口 2026-08-19~09-15, FRESH)
- 复算方法: methodA `title-equiv.js` (regex) vs methodB 数值逐码点 (§0.23.2)

## 汇总
```json
{
 "generatedFor": "2026-09-19",
 "ruleSSoT": "docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 9/13 终裁 目标区 50-58)",
 "equivSSoT": "scripts/guards/title-equiv.js",
 "TITLE_MIN": 50,
 "TITLE_MAX": 58,
 "skuCount": 100,
 "slotCount": 300,
 "slotsPresent": 300,
 "slotsMissing": 0,
 "byBand": {
  "FILL": 77,
  "TRIM": 38,
  "OK": 185
 },
 "byBandV4": {
  "FILL": 77,
  "LEGACY": 54,
  "OK": 147,
  "RED": 22
 },
 "recountMismatch": 0,
 "ruleDeltaOkOnlyUnderNewRule": 38,
 "withGscRows": 260,
 "issueSlots": 40
}
```

## A. 不足清单 (<50 半角当量, 按 GSC 展示降序)

| SKU slug | locale | 当量 | GSC展示28d | GSC位置 | CTR | 类别 | title |
|---|---|---|---|---|---|---|---|
| waterproof-stickers | zh-hk | 37 | 304 | 9.44 | 2.63% | stickers | 防水貼紙 | 防水 PVC 異形切割 | 智印港 |
| electronics-packaging-box | zh-hk | 46 | 253 | 49.51 | 0.40% | packaging | 電子產品包裝盒印刷 | 3C 數碼 EVA 內襯 | 智印港 |
| custom-calendars | zh-hk | 35 | 215 | 22.25 | 0.47% | calendars | 定制年曆 | 企業禮品 多款式 | 智印港 |
| handle-bags | zh-hk | 37 | 199 | 15.91 | 0.50% | paper-bags | 環保手挽袋 | 100%環保 多尺寸 | 智印港 |
| large-bags | zh-hk | 35 | 187 | 17.18 | 2.14% | paper-bags | 大號紙袋 | 100%環保 多尺寸 | 智印港 |
| transparent-stickers | zh-hk | 37 | 184 | 15.78 | 2.72% | stickers | 透明貼紙 | 防水 PVC 異形切割 | 智印港 |
| exercise-books | zh-hk | 40 | 159 | 6.65 | 1.89% | educational | 作業簿印刷 | 膠裝/騎馬釘 50本起 | 智印港 |
| waterproof-stickers | ja | 48 | 138 | 15.18 | 0.72% | stickers | 防水ステッカー | 防水 PVC ダイカット | ZprintPro |
| kraft-paper-bags | zh-hk | 35 | 130 | 11.17 | 0.77% | paper-bags | 牛皮紙袋 | 100%環保 多尺寸 | 智印港 |
| removable-stickers | zh-hk | 37 | 126 | 10.70 | 2.38% | stickers | 可移貼紙 | 防水 PVC 異形切割 | 智印港 |
| folded-leaflets | zh-hk | 36 | 113 | 24.25 | 0.88% | flyers | 摺頁單張 | 雙面四色 100張起 | 智印港 |
| vehicle-wraps | zh-hk | 39 | 112 | 46.44 | 0.89% | banners | 汽車車身貼 | 車身廣告 全車包覆 | 智印港 |
| certificates | zh-hk | 37 | 112 | 10.63 | 3.57% | educational | 證書印刷 | 專業印刷 品質保證 | 智印港 |
| foil-stickers | zh-hk | 37 | 102 | 5.74 | 6.86% | stickers | 燙金貼紙 | 防水 PVC 異形切割 | 智印港 |
| catalog-printing | zh-hk | 37 | 98 | 14.50 | 2.04% | books | 畫冊印刷 | 專業印刷 品質保證 | 智印港 |
| pearl-envelopes | zh-hk | 37 | 96 | 5.27 | 4.17% | envelopes | 珍珠光信封 | 雙面印刷 多規格 | 智印港 |
| outdoor-vinyl-banners | zh-hk | 35 | 88 | 52.09 | 0.00% | banners | 戶外橫幅 | 鋁合金支架 高清 | 智印港 |
| eco-paper-bags | zh-hk | 35 | 86 | 32.45 | 2.33% | paper-bags | 環保紙袋 | 100%環保 多尺寸 | 智印港 |
| colored-envelopes | zh-hk | 35 | 77 | 5.30 | 1.30% | envelopes | 彩色信封 | 雙面印刷 多規格 | 智印港 |
| mailer-boxes | zh-hk | 38 | 72 | 7.72 | 2.78% | packaging | 訂製郵寄盒 | 燙金 UV 100%訂製 | 智印港 |
| doujinshi-printing | zh-hk | 45 | 68 | 8.74 | 2.94% | japan-doujin | 同人誌印刷 10本起印 | Comiket前24小時特急対応 |
| kraft-paper-packaging-box | zh-hk | 43 | 67 | 32.57 | 4.48% | packaging | 牛皮紙包裝印刷盒 | 環保材質 多尺寸 | 智印港 |
| laminated-menus | zh-hk | 36 | 55 | 7.38 | 0.00% | menus | 過膠餐牌 | 防水 覆膜 50本起 | 智印港 |
| rigid-boxes | zh-hk | 36 | 49 | 8.69 | 4.08% | packaging | 精裝禮盒 | 燙金 UV 100%訂製 | 智印港 |
| fruit-food-label-stickers | zh-hk | 47 | 46 | 40.46 | 0.00% | stickers | 水果及食品標籤印刷 | 防水防油 SGS 認證 | 智印港 |
| school-flyers | zh-hk | 36 | 41 | 23.95 | 0.00% | educational | 學校單張 | 雙面四色 100張起 | 智印港 |
| security-stickers | zh-hk | 37 | 37 | 6.43 | 8.11% | stickers | 防偽貼紙 | 防水 PVC 異形切割 | 智印港 |
| desk-calendars | zh-hk | 35 | 35 | 30.40 | 2.86% | calendars | 座檯年曆 | 企業禮品 多款式 | 智印港 |
| adhesive-posters | zh-hk | 37 | 34 | 4.79 | 5.88% | posters | 背膠海報 | 防水材質 即日速遞 | 智印港 |
| fluorescent-stickers | zh-hk | 37 | 33 | 3.58 | 0.00% | stickers | 螢光貼紙 | 防水 PVC 異形切割 | 智印港 |
| magnetic-closure-gift-box | zh-hk | 48 | 32 | 6.75 | 3.12% | packaging | 磁吸翻蓋禮盒印刷 | 高端定製 48 小時交貨 | 智印港 |
| gift-bags | zh-hk | 35 | 31 | 12.74 | 12.90% | paper-bags | 禮品紙袋 | 100%環保 多尺寸 | 智印港 |
| foil-greeting-cards | zh-hk | 38 | 30 | 11.07 | 0.00% | greeting-cards | 燙金名片印刷 | 金・銀・玫瑰金 | 智印港 |
| art-posters | zh-hk | 37 | 28 | 16.46 | 0.00% | posters | 藝術海報 | 防水材質 即日速遞 | 智印港 |
| spiral-notebooks | zh-hk | 40 | 27 | 7.41 | 0.00% | books | 線圈筆記本 | 膠裝/騎馬釘 50本起 | 智印港 |
| thick-paper-flyers | zh-hk | 36 | 26 | 8.19 | 0.00% | flyers | 厚身單張 | 雙面四色 100張起 | 智印港 |
| outdoor-posters | zh-hk | 37 | 24 | 7.67 | 4.17% | posters | 戶外海報 | 防水材質 即日速遞 | 智印港 |
| pearl-envelopes | ja | 46 | 22 | 4.18 | 4.55% | envelopes | パール封筒 | 両面印刷 マルチサイズ | ZprintPro |
| fluorescent-stickers | ja | 48 | 21 | 14.48 | 4.76% | stickers | 蛍光ステッカー | 防水 PVC ダイカット | ZprintPro |
| eco-paper-bags | ja | 40 | 20 | 12.25 | 5.00% | paper-bags | エコ紙袋 | エコ素材 多サイズ | ZprintPro |
| perfect-bound-books | zh-hk | 49 | 19 | 9.21 | 10.53% | books | 公司膠裝書 覆膜・騎馬釘・10起印・HK$16起 | 智印港 |
| textbooks | ja | 43 | 18 | 47.61 | 0.00% | educational | 教科書 | 中綴じ/無線綴じ 50冊〜 | ZprintPro |
| a4-flyers | ja | 46 | 16 | 7.94 | 0.00% | flyers | A4 チラシ | 両面フルカラー 100枚〜 | ZprintPro |
| white-card-bags | zh-hk | 35 | 15 | 4.13 | 0.00% | paper-bags | 白卡紙袋 | 100%環保 多尺寸 | 智印港 |
| magnetic-calendars | zh-hk | 35 | 15 | 4.40 | 0.00% | calendars | 磁吸年曆 | 企業禮品 多款式 | 智印港 |
| mesh-banners | zh-hk | 39 | 15 | 7.40 | 6.67% | banners | 網孔布易拉寶 | 鋁合金支架 高清 | 智印港 |
| folding-boxes | zh-hk | 36 | 14 | 5.07 | 7.14% | packaging | 折疊禮盒 | 燙金 UV 100%訂製 | 智印港 |
| drink-menus | zh-hk | 38 | 13 | 6.77 | 0.00% | menus | 餐廳酒水牌 | 防水 覆膜 50本起 | 智印港 |
| white-card-bags | ja | 44 | 12 | 3.83 | 0.00% | paper-bags | 白カード紙袋 | エコ素材 多サイズ | ZprintPro |
| can-badge | zh-hk | 44 | 12 | 9.67 | 0.00% | japan-doujin | 罐型襟章印刷 57mm 76mm | 推し活 Comiket 必備 |
| a1-posters | ja | 39 | 11 | 9.64 | 0.00% | posters | A1 ポスター | 防水 翌日配送 | ZprintPro |
| hardcover-menus | zh-hk | 36 | 10 | 6.90 | 0.00% | menus | 精裝餐牌 | 防水 覆膜 50本起 | 智印港 |
| hardcover-books | zh-hk | 49 | 10 | 9.50 | 10.00% | books | 公司精裝書 燙金・局部UV・10起印・HK$40起 | 智印港 |
| display-posters | zh-hk | 37 | 9 | 6.22 | 0.00% | posters | 展架海報 | 防水材質 即日速遞 | 智印港 |
| large-bags | ja | 40 | 8 | 18.12 | 0.00% | paper-bags | 大型紙袋 | エコ素材 多サイズ | ZprintPro |
| custom-red-packets | zh-hk | 42 | 8 | 7.00 | 12.50% | red-packets | custom red packets | 燙金 UV 壓紋 | 智印港 |
| custom-calendars | en | 49 | 7 | 55.29 | 0.00% | calendars | Custom Calendars | Free Shipping $99+ | ZprintPro |
| embossed-red-packets | zh-hk | 34 | 5 | 10.00 | 0.00% | red-packets | 浮雕利是封 | 燙金 UV 壓紋 | 智印港 |
| pvc-menus | ja | 38 | 5 | 15.20 | 20.00% | menus | PVC menu | 防水 ラミネート | ZprintPro |
| laminated-menus | ja | 45 | 5 | 20.40 | 0.00% | menus | ラミネート menu | 防水 ラミネート | ZprintPro |
| foil-red-packets | ja | 45 | 4 | 3.50 | 0.00% | red-packets | 箔押し年賀状 | 箔押し UV エンボス | ZprintPro |
| pearl-envelopes | en | 48 | 4 | 20.25 | 0.00% | envelopes | Pearl Envelopes | Free Shipping $99+ | ZprintPro |
| thick-greeting-cards-400g | zh-hk | 45 | 4 | 3.25 | 0.00% | greeting-cards | 400g 超厚名片印刷 | 厚卡・燙金・壓紋 | 智印港 |
| adhesive-posters | ja | 40 | 3 | 36.67 | 0.00% | posters | 粘着ポスター | 防水 翌日配送 | ZprintPro |
| transparent-stickers | ja | 48 | 2 | 8.00 | 0.00% | stickers | 透明ステッカー | 防水 PVC ダイカット | ZprintPro |
| disposable-menus | en | 49 | 2 | 43.00 | 0.00% | menus | Disposable Menus | Free Shipping $99+ | ZprintPro |
| exercise-books | ja | 43 | 2 | 25.50 | 0.00% | educational | 練習帳 | 中綴じ/無線綴じ 50冊〜 | ZprintPro |
| eco-flyers | ja | 47 | 1 | 4.00 | 0.00% | flyers | エコチラシ | 両面フルカラー 100枚〜 | ZprintPro |
| eco-tote-bag | zh-hk | 48 | 1 | 5.00 | 0.00% | japan-doujin | 環保托特袋 有機棉 100% | 推し活 Comiket 場售首選 |
| small-bags | zh-hk | 35 | - | - | - | - | 小號紙袋 | 100%環保 多尺寸 | 智印港 |
| small-bags | ja | 40 | - | - | - | - | 小型紙袋 | エコ素材 多サイズ | ZprintPro |
| a5-flyers | ja | 46 | - | - | - | flyers | A5 チラシ | 両面フルカラー 100枚〜 | ZprintPro |
| thick-paper-flyers | ja | 47 | - | - | - | flyers | 厚口チラシ | 両面フルカラー 100枚〜 | ZprintPro |
| large-red-packets | ja | 43 | - | - | - | red-packets | 大型年賀状 | 箔押し UV エンボス | ZprintPro |
| disposable-menus | ja | 46 | - | - | - | menus | 使い捨てメニュー | 防水 ラミネート | ZprintPro |
| colored-envelopes | ja | 46 | - | - | - | envelopes | カラー封筒 | 両面印刷 マルチサイズ | ZprintPro |
| thick-greeting-cards-400g | ja | 47 | - | - | - | greeting-cards | 厚口400g名刺印刷 | 箔押し・エンボス | ZprintPro |

## B. 超标清单 (>58 半角当量, 按 GSC 展示降序)

| SKU slug | locale | 当量 | GSC展示28d | GSC位置 | CTR | 类别 | title |
|---|---|---|---|---|---|---|---|
| small-batch-stickers | en | 67 | 396 | 17.81 | 0.00% | stickers | Small Batch Stickers 50 pcs from $0.045 | Free 2h Proof | ZprintPro |
| doujinshi-printing | en | 59 | 359 | 11.72 | 1.39% | japan-doujin | Doujinshi Printing Comiket | Free Shipping $99+ | ZprintPro |
| catalog-printing | en | 61 | 307 | 29.71 | 0.00% | books | Catalog Printing | Saddle-Stitched | Free US Ship | ZprintPro |
| same-day-flyers | en | 67 | 93 | 40.39 | 0.00% | flyers | Same-Day Flyer Printing from $0.95 | Free Shipping $99+ | ZprintPro |
| waterproof-stickers | en | 59 | 80 | 40.46 | 1.25% | stickers | Custom Waterproof Stickers | Free Shipping $99+ | ZprintPro |
| fluorescent-stickers | en | 60 | 71 | 15.37 | 2.82% | stickers | Custom Fluorescent Stickers | Free Shipping $99+ | ZprintPro |
| double-sided-flyers | ja | 71 | 65 | 29.68 | 0.00% | flyers | 両面カラー印刷 両面チラシ | 両面フルカラー 100枚〜 翌日発送 | ZprintPro |
| pvc-menus | zh-hk | 66 | 53 | 9.13 | 3.77% | menus | PVC 餐牌印刷 · 防水防油覆膜 50本起 | 餐廳/咖啡店/酒吧菜單 | 智印港 |
| food-boxes | en | 71 | 49 | 38.63 | 0.00% | packaging | Paper Food Packaging Printing 100+ | Food-Safe Boxes & Bags | ZprintPr |
| adhesive-banners | en | 60 | 46 | 38.54 | 0.00% | banners | Adhesive Banners | Wind-Resistant | Free US Ship | ZprintPro |
| food-boxes | ja | 73 | 43 | 35.93 | 0.00% | packaging | 紙製食品パッケージ印刷 100個〜 | 食品用紙箱・紙袋・耐油カード | ZprintPro |
| a4-flyers | en | 60 | 36 | 13.81 | 2.78% | flyers | A4 Flyers for Holiday Cards | Free Shipping $99+ | ZprintPro |
| perfect-bound-books | en | 62 | 31 | 52.61 | 0.00% | books | Perfect Bound Books | Perfect Bound | Free US Ship | ZprintPro |
| transparent-stickers | en | 60 | 30 | 36.57 | 0.00% | stickers | Custom Transparent Stickers | Free Shipping $99+ | ZprintPro |
| cosmetic-boxes | ja | 87 | 30 | 6.60 | 0.00% | packaging | 化粧品パッケージボックス 4 種類 100 個〜 | マグネット蓋・引き出し・ブック型 | ZprintPro |
| small-batch-stickers | ja | 63 | 26 | 22.88 | 11.54% | stickers | 小ロットステッカー 50 枚〜 $0.045 | 防水PVC 2h 校正 | ZprintPro |
| a5-flyers | en | 60 | 26 | 12.12 | 0.00% | flyers | A5 Flyers for Holiday Cards | Free Shipping $99+ | ZprintPro |
| hardcover-menus | en | 62 | 22 | 60.59 | 0.00% | menus | Hardcover Menus | Laminated Durable | Free US Ship | ZprintPro |
| graduation-yearbook | ja | 69 | 22 | 62.82 | 0.00% | educational | 卒業記念アルバム印刷 50 冊〜 | 中綴じ / 無線綴じ / 上製本 | ZprintPro |
| wall-calendars | en | 61 | 20 | 44.05 | 0.00% | calendars | Wall Calendars | Wire-Bound Spiral | Free US Ship | ZprintPro |
| small-batch-stickers | zh-hk | 63 | 18 | 6.61 | 0.00% | stickers | 小批量貼紙 50 張起 HK$0.45 | 防水 PVC 異形切割 2h 打稿 | 智印港 |
| gang-run-card-boxes | zh-hk | 64 | 16 | 5.69 | 0.00% | packaging | 拼版白卡彩盒印刷 (免刀模費) | 8-15天交期 | 香港無對手價 | 智印港 |
| cosmetic-boxes | zh-hk | 77 | 14 | 6.64 | 0.00% | packaging | 化妝品包裝盒 4 種盒型 100 個起印 · 磁吸翻蓋 / 天地蓋 / 抽屜式 / 書型 | 智印港 |
| roll-up-banners | en | 59 | 13 | 38.15 | 0.00% | banners | Roll-up Banners | Wind-Resistant | Free US Ship | ZprintPro |
| mini-calendars | en | 61 | 9 | 5.56 | 0.00% | calendars | Mini Calendars | Wire-Bound Spiral | Free US Ship | ZprintPro |
| laminated-menus | en | 62 | 9 | 50.33 | 0.00% | menus | Laminated Menus | Laminated Durable | Free US Ship | ZprintPro |
| desk-calendars | en | 61 | 8 | 37.75 | 0.00% | calendars | Desk Calendars | Wire-Bound Spiral | Free US Ship | ZprintPro |
| fruit-food-label-stickers | en | 59 | 8 | 6.62 | 12.50% | stickers | Custom Food Label Stickers | Free Shipping $99+ | ZprintPro |
| gang-run-card-boxes | en | 90 | 7 | 30.29 | 0.00% | packaging | Gang-Run White Card Boxes (No Die-Cut Fee) | 8-15 Day Turnaround | Fro |
| folded-leaflets | en | 60 | 6 | 45.17 | 0.00% | flyers | Folded Leaflets | Tri-Fold Design | Free US Ship | ZprintPro |
| spiral-notebooks | en | 59 | 6 | 24.33 | 0.00% | books | Spiral Notebooks | Perfect Bound | Free US Ship | ZprintPro |
| eco-red-packets | en | 60 | 4 | 11.25 | 0.00% | red-packets | Eco Red Packets | Gold Foil Print | Free US Ship | ZprintPro |
| photo-frame-calendars | ja | 60 | 2 | 3.00 | 0.00% | calendars | フォトフレームカレンダー | ノベルティ 各種サイズ | ZprintPro |
| large-red-packets | en | 62 | 1 | 4.00 | 0.00% | red-packets | Large Red Packets | Gold Foil Print | Free US Ship | ZprintPro |
| school-flyers | en | 60 | 1 | 5.00 | 0.00% | educational | School Flyers | Same-Day Printing | Free US Ship | ZprintPro |
| gang-run-card-boxes | ja | 73 | 1 | 6.00 | 0.00% | packaging | 合版ホワイトカードボックス (型代不要) | 8-15日納期 | ¥3,800〜 | ZprintPro |
| postcard-set | en | 60 | 1 | 11.00 | 0.00% | japan-doujin | Washi Postcard Sets 4-8 pcs | Free Shipping $99+ | ZprintPro |
| eco-tote-bag | en | 60 | - | - | - | japan-doujin | Organic Cotton Eco Tote Bag | Free Shipping $99+ | ZprintPro |

## C. 品牌 / 污染 / 填充词问题槽位

| SKU slug | locale | 当量 | 问题 | title |
|---|---|---|---|---|
| die-cut-stickers | zh-hk | 51 | 日文假名污染 | 異形模切貼紙 透明・模切・10起印・HK$0.58起 | 智印港 |
| a4-flyers | zh-hk | 50 | 日文假名污染 | A4 傳單印刷 圓角・覆膜・10起印・HK$0.35起 | 智印港 |
| a5-flyers | zh-hk | 50 | 日文假名污染 | A5 傳單印刷 圓角・覆膜・10起印・HK$0.25起 | 智印港 |
| double-sided-flyers | zh-hk | 51 | 日文假名污染 | 雙面傳單印刷 圓角・覆膜・10起印・HK$0.40起 | 智印港 |
| same-day-flyers | zh-hk | 51 | 日文假名污染 | 即日印刷 傳單 100張起 HK$0.55起 圓角・覆膜 | 智印港 |
| same-day-flyers | ja | 58 | 品牌不在末尾 | 即日チラシ印刷｜¥125〜・100枚から・無料デザイン｜ZprintPro |
| eco-flyers | zh-hk | 51 | 日文假名污染 | 環保傳單印刷 圓角・覆膜・10起印・HK$0.38起 | 智印港 |
| a2-posters | ja | 56 | 品牌不在末尾 | A2 ポスター印刷｜¥300〜・10枚〜・無料デザイン｜ZprintPro |
| a1-posters | zh-hk | 54 | 日文假名污染 | A1 大幅海報 厚紙・1張起印・HK$45起・4小時打稿 | 智印港 |
| foil-red-packets | zh-hk | 52 | 日文假名污染 | 燙金利是封 燙金・局部UV・100起印・HK$1.10起 | 智印港 |
| cartoon-red-packets | zh-hk | 52 | 日文假名污染 | 卡通利是封 燙金・局部UV・100起印・HK$1.10起 | 智印港 |
| eco-red-packets | zh-hk | 50 | 日文假名污染 | 環保利是封 燙金・覆膜・100起印・HK$1.90起 | 智印港 |
| large-red-packets | zh-hk | 50 | 日文假名污染 | 大利是封 燙金・局部UV・100起印・HK$2.20起 | 智印港 |
| wall-calendars | zh-hk | 53 | 日文假名污染 | 掛牆年曆 騎馬釘・1000起印・HK$3起・4小時打稿 | 智印港 |
| mini-calendars | zh-hk | 53 | 日文假名污染 | 迷你年曆 騎馬釘・1000起印・HK$3起・4小時打稿 | 智印港 |
| photo-frame-calendars | zh-hk | 53 | 日文假名污染 | 相框年曆 騎馬釘・1000起印・HK$3起・4小時打稿 | 智印港 |
| disposable-menus | zh-hk | 50 | 日文假名污染 | 一次性餐牌 防水・圓角・100起印・HK$0.22起 | 智印港 |
| outdoor-vinyl-banners | ja | 54 | 简体污染 | 屋外ビニールバナー | アルミスタンド 高画質 | ZprintPro |
| roll-up-banners | zh-hk | 52 | 日文假名污染 | 展示易拉寶 防水・10起印・HK$85起・4小時打稿 | 智印港 |
| roll-up-banners | ja | 54 | 简体污染 | ロールアップバナー | アルミスタンド 高画質 | ZprintPro |
| adhesive-banners | zh-hk | 50 | 日文假名污染 | 背膠噴繪 透明・10起印・HK$10起・4小時打稿 | 智印港 |
| mesh-banners | ja | 50 | 简体污染 | メッシュバナー | アルミスタンド 高画質 | ZprintPro |
| catalog-printing | zh-hk | 37 | 无效填充词 | 畫冊印刷 | 專業印刷 品質保證 | 智印港 |
| saddle-stitch-booklets | zh-hk | 50 | 日文假名污染 | 騎馬釘小冊子 覆膜・騎馬釘・10起印・HK$6起 | 智印港 |
| perfect-bound-books | zh-hk | 49 | 日文假名污染 | 公司膠裝書 覆膜・騎馬釘・10起印・HK$16起 | 智印港 |
| hardcover-books | zh-hk | 49 | 日文假名污染 | 公司精裝書 燙金・局部UV・10起印・HK$40起 | 智印港 |
| certificates | zh-hk | 37 | 无效填充词 | 證書印刷 | 專業印刷 品質保證 | 智印港 |
| textbooks | zh-hk | 50 | 日文假名污染 | 公司教科書 覆膜・騎馬釘・100起印・HK$24起 | 智印港 |
| doujinshi-printing | zh-hk | 45 | 品牌次数=0; 品牌不在末尾 | 同人誌印刷 10本起印 | Comiket前24小時特急対応 |
| acrylic-keychain | zh-hk | 52 | 日文假名污染 | 亞克力鑰匙扣 角色造型訂製 10起印・HK$2275起 | 智印港 |
| acrylic-keychain | ja | 57 | 品牌次数=0; 品牌不在末尾 | アクリルキーホルダー キャラクター形 推し活応援 | 10個から |
| can-badge | zh-hk | 44 | 品牌次数=0; 品牌不在末尾; 日文假名污染 | 罐型襟章印刷 57mm 76mm | 推し活 Comiket 必備 |
| postcard-set | zh-hk | 50 | 日文假名污染 | 明信片套裝 4-8張 和紙風 10起印・4小時打稿 | 智印港 |
| eco-tote-bag | zh-hk | 48 | 品牌次数=0; 品牌不在末尾; 日文假名污染 | 環保托特袋 有機棉 100% | 推し活 Comiket 場售首選 |
| eco-tote-bag | ja | 53 | 品牌次数=0; 品牌不在末尾 | エコトートバッグ オーガニックコットン | 推し活 コミケ |
| premium-greeting-cards | zh-hk | 51 | 日文假名污染 | 高級賀卡印刷 燙金・局部UV 100張起 HK$100起 | 智印港 |
| thick-greeting-cards-400g | zh-hk | 45 | 日文假名污染 | 400g 超厚名片印刷 | 厚卡・燙金・壓紋 | 智印港 |
| foil-greeting-cards | zh-hk | 38 | 日文假名污染 | 燙金名片印刷 | 金・銀・玫瑰金 | 智印港 |
| spot-uv-greeting-cards | zh-hk | 51 | 日文假名污染 | 局部UV賀卡印刷 啞面・高光 100張起 HK$140起 | 智印港 |
| matte-greeting-cards | zh-hk | 51 | 日文假名污染 | 啞膜賀卡印刷 防指紋・柔順 100張起 HK$110起 | 智印港 |

## D. 复算结果 (§0.23.2 双方法)

- methodA vs methodB 不一致: **0** 条 ✅ 两法一致
- 槽位总数 300 / 有 title 300 / 缺 title 0

## E. 规则口径影响面 (v4 50-54 vs 现行 50-58)

- v4 旧口径分布: {"FILL":77,"LEGACY":54,"OK":147,"RED":22}
- 现行口径分布: {"FILL":77,"TRIM":38,"OK":185}
- **仅因新口径 (50-58) 才判达标**的槽位: 38 条 (旧口径下属 55-58 由「满格禁加」变为「合规」)

## F. 优先级分层 (真实数据实测)

### P0 — 位置 ≤20 且 展示 ≥30 且 当量 <40 (共 19 条: 排名已到位, 标题是唯一瓶颈)

| 当量 | locale | SKU | 展示28d | 位置 | CTR | title |
|---|---|---|---|---|---|---|
| 37 | zh-hk | waterproof-stickers | 304 | 9.44 | 2.63% | 防水貼紙 | 防水 PVC 異形切割 | 智印港 |
| 37 | zh-hk | handle-bags | 199 | 15.91 | 0.50% | 環保手挽袋 | 100%環保 多尺寸 | 智印港 |
| 35 | zh-hk | large-bags | 187 | 17.18 | 2.14% | 大號紙袋 | 100%環保 多尺寸 | 智印港 |
| 37 | zh-hk | transparent-stickers | 184 | 15.78 | 2.72% | 透明貼紙 | 防水 PVC 異形切割 | 智印港 |
| 35 | zh-hk | kraft-paper-bags | 130 | 11.17 | 0.77% | 牛皮紙袋 | 100%環保 多尺寸 | 智印港 |
| 37 | zh-hk | removable-stickers | 126 | 10.70 | 2.38% | 可移貼紙 | 防水 PVC 異形切割 | 智印港 |
| 37 | zh-hk | certificates | 112 | 10.63 | 3.57% | 證書印刷 | 專業印刷 品質保證 | 智印港 |
| 37 | zh-hk | foil-stickers | 102 | 5.74 | 6.86% | 燙金貼紙 | 防水 PVC 異形切割 | 智印港 |
| 37 | zh-hk | catalog-printing | 98 | 14.50 | 2.04% | 畫冊印刷 | 專業印刷 品質保證 | 智印港 |
| 37 | zh-hk | pearl-envelopes | 96 | 5.27 | 4.17% | 珍珠光信封 | 雙面印刷 多規格 | 智印港 |
| 35 | zh-hk | colored-envelopes | 77 | 5.30 | 1.30% | 彩色信封 | 雙面印刷 多規格 | 智印港 |
| 38 | zh-hk | mailer-boxes | 72 | 7.72 | 2.78% | 訂製郵寄盒 | 燙金 UV 100%訂製 | 智印港 |
| 36 | zh-hk | laminated-menus | 55 | 7.38 | 0.00% | 過膠餐牌 | 防水 覆膜 50本起 | 智印港 |
| 36 | zh-hk | rigid-boxes | 49 | 8.69 | 4.08% | 精裝禮盒 | 燙金 UV 100%訂製 | 智印港 |
| 37 | zh-hk | security-stickers | 37 | 6.43 | 8.11% | 防偽貼紙 | 防水 PVC 異形切割 | 智印港 |
| 37 | zh-hk | adhesive-posters | 34 | 4.79 | 5.88% | 背膠海報 | 防水材質 即日速遞 | 智印港 |
| 37 | zh-hk | fluorescent-stickers | 33 | 3.58 | 0.00% | 螢光貼紙 | 防水 PVC 異形切割 | 智印港 |
| 35 | zh-hk | gift-bags | 31 | 12.74 | 12.90% | 禮品紙袋 | 100%環保 多尺寸 | 智印港 |
| 38 | zh-hk | foil-greeting-cards | 30 | 11.07 | 0.00% | 燙金名片印刷 | 金・銀・玫瑰金 | 智印港 |

### P1 — 当量 40-49 且 展示 ≥50 (共 5 条)

| 当量 | locale | SKU | 展示28d | 位置 | CTR | title |
|---|---|---|---|---|---|---|
| 46 | zh-hk | electronics-packaging-box | 253 | 49.51 | 0.40% | 電子產品包裝盒印刷 | 3C 數碼 EVA 內襯 | 智印港 |
| 40 | zh-hk | exercise-books | 159 | 6.65 | 1.89% | 作業簿印刷 | 膠裝/騎馬釘 50本起 | 智印港 |
| 48 | ja | waterproof-stickers | 138 | 15.18 | 0.72% | 防水ステッカー | 防水 PVC ダイカット | ZprintPro |
| 45 | zh-hk | doujinshi-printing | 68 | 8.74 | 2.94% | 同人誌印刷 10本起印 | Comiket前24小時特急対応 |
| 43 | zh-hk | kraft-paper-packaging-box | 67 | 32.57 | 4.48% | 牛皮紙包裝印刷盒 | 環保材質 多尺寸 | 智印港 |

### 零点击 — 展示 ≥100 且 0 点击 (共 5 条)

| band | 当量 | locale | SKU | 展示28d | 位置 |
|---|---|---|---|---|---|
| TRIM | 67 | en | small-batch-stickers | 396 | 17.81 |
| TRIM | 61 | en | catalog-printing | 307 | 29.71 |
| OK | 57 | en | exercise-books | 289 | 23.26 |
| OK | 55 | en | saddle-stitch-booklets | 225 | 67.00 |
| OK | 53 | en | foil-stickers | 136 | 39.51 |

## G. 结构性缺陷: 同簇标题同质化 (≥4 SKU 共享完全相同修饰段)

| locale | 共享修饰段 | SKU 数 | 当量 | 涉及 SKU |
|---|---|---|---|---|
| en | Free Shipping $99+ | ZprintPro | 50 | 59/60/58/56/53/57/55/54/51/52/67/49/50/48 | waterproof-stickers, transparent-stickers, removable-stickers, die-cut-stickers, foil-stickers, security-stickers, fluorescent-stickers, kraft-paper-bags, white-card-bags, gift-bags, eco-paper-bags, handle-bags, small-bags, large-bags, a4-flyers, a5-flyers, double-sided-flyers, thick-paper-flyers, same-day-flyers, a2-posters, a1-posters, outdoor-posters, display-posters, art-posters, adhesive-posters, cosmetic-boxes, mailer-boxes, folding-boxes, rigid-boxes, embossed-red-packets, custom-red-packets, cartoon-red-packets, custom-calendars, photo-frame-calendars, magnetic-calendars, disposable-menus, outdoor-vinyl-banners, saddle-stitch-booklets, business-envelopes, colored-envelopes, pearl-envelopes, magnetic-closure-gift-box, electronics-packaging-box, kraft-paper-packaging-box, fruit-food-label-stickers, doujinshi-printing, acrylic-keychain, can-badge, postcard-set, eco-tote-bag |
| zh-hk | 智印港 | 45 | 51/50/55/54/77/52/53/49 | die-cut-stickers, a4-flyers, a5-flyers, double-sided-flyers, same-day-flyers, eco-flyers, a2-posters, a1-posters, cosmetic-boxes, foil-red-packets, cartoon-red-packets, eco-red-packets, large-red-packets, wall-calendars, mini-calendars, photo-frame-calendars, disposable-menus, roll-up-banners, adhesive-banners, saddle-stitch-booklets, perfect-bound-books, hardcover-books, textbooks, acrylic-keychain, postcard-set, graduation-yearbook, premium-greeting-cards, spot-uv-greeting-cards, matte-greeting-cards, rounded-corner-greeting-cards, cafe-table-cards, corrugated-boxes, drink-tokens, escort-cards, foil-wedding-invitations, name-tags-badges, save-the-date-cards, tuck-end-boxes, wedding-menu-cards, wedding-place-cards, wedding-program-cards, wedding-seating-charts, wedding-suite-bundle, wedding-thank-you-cards, white-card-boxes |
| ja | ZprintPro | 42 | 52/53/50/51/54 | kraft-paper-bags, gift-bags, handle-bags, outdoor-posters, display-posters, art-posters, folding-boxes, embossed-red-packets, cartoon-red-packets, eco-red-packets, hardcover-menus, drink-menus, adhesive-banners, catalog-printing, saddle-stitch-booklets, perfect-bound-books, certificates, school-flyers, electronics-packaging-box, kraft-paper-packaging-box, doujinshi-printing, can-badge, postcard-set, premium-greeting-cards, spot-uv-greeting-cards, matte-greeting-cards, rounded-corner-greeting-cards, cafe-table-cards, corrugated-boxes, drink-tokens, escort-cards, foil-wedding-invitations, name-tags-badges, save-the-date-cards, tuck-end-boxes, wedding-menu-cards, wedding-place-cards, wedding-program-cards, wedding-seating-charts, wedding-suite-bundle, wedding-thank-you-cards, white-card-boxes |
| en | ZprintPro | 20 | 53/51/50/54/52 | foil-red-packets, premium-greeting-cards, spot-uv-greeting-cards, matte-greeting-cards, rounded-corner-greeting-cards, cafe-table-cards, corrugated-boxes, drink-tokens, escort-cards, foil-wedding-invitations, name-tags-badges, save-the-date-cards, tuck-end-boxes, wedding-menu-cards, wedding-place-cards, wedding-program-cards, wedding-seating-charts, wedding-suite-bundle, wedding-thank-you-cards, white-card-boxes |
| ja | 防水 PVC ダイカット | ZprintPro | 7 | 48/50/54/56 | waterproof-stickers, transparent-stickers, removable-stickers, die-cut-stickers, foil-stickers, security-stickers, fluorescent-stickers |
| zh-hk | 100%環保 多尺寸 | 智印港 | 7 | 35/37 | kraft-paper-bags, white-card-bags, gift-bags, eco-paper-bags, handle-bags, small-bags, large-bags |
| zh-hk | 防水 PVC 異形切割 | 智印港 | 6 | 37 | waterproof-stickers, transparent-stickers, removable-stickers, foil-stickers, security-stickers, fluorescent-stickers |
| ja | ノベルティ 各種サイズ | ZprintPro | 6 | 52/54/50/60/56 | wall-calendars, desk-calendars, custom-calendars, mini-calendars, photo-frame-calendars, magnetic-calendars |
| ja | 両面フルカラー 100枚〜 | ZprintPro | 5 | 46/53/47 | a4-flyers, a5-flyers, folded-leaflets, thick-paper-flyers, eco-flyers |
| en | Perfect Bound | Free US Ship | ZprintPro | 5 | 62/58/59/57/52 | perfect-bound-books, hardcover-books, spiral-notebooks, exercise-books, textbooks |
| ja | エコ素材 多サイズ | ZprintPro | 4 | 44/40 | white-card-bags, eco-paper-bags, small-bags, large-bags |
| zh-hk | 防水材質 即日速遞 | 智印港 | 4 | 37 | outdoor-posters, display-posters, art-posters, adhesive-posters |
| en | Laminated Durable | Free US Ship | ZprintPro | 4 | 56/62/58 | pvc-menus, laminated-menus, hardcover-menus, drink-menus |
| ja | 中綴じ/無線綴じ 50冊〜 | ZprintPro | 4 | 53/43 | hardcover-books, spiral-notebooks, exercise-books, textbooks |

## H. 违规清单 ledger (黄灯期跟踪 · K3 2026-09-19 指令)

- ledger: `.hermes/reports/sku-title-ledger.json` (稳定键 slug|locale, 记 firstSeen / 当量历史 / status)
- **未修复 115** / 已修复 3 / 累计 118
- 门禁阶段: **YELLOW_WARN** (存量 ≤10 时把 severity 由 yellow 升 red 硬拦)