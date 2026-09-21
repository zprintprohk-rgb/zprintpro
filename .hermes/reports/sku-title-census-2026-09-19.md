# SKU 标题全量普查 (2026-09-19)

> 性质: **只读审计**。口径 SSoT = `scripts/guards/title-equiv.js` (半角当量, MIN=50 / MAX=57)
> 规则 SSoT = `docs/2026-09-13-title-batch-T-freeze.md` §6-3 (K3 2026-09-19 裁决 目标区 **50-57 半角当量**, 58 为阻断线; 取代 v4 的 50-54 与 9/13 的 50-58)

## 数据来源 (§0.23)
校准日期: 2026-09-19 13:09 UTC
- `src/data/sku-seo-data.ts` — 活 title 主源 (SKU × 3 locale)
- `src/data/products.ts` — slug → category_slug
- `.hermes/gsc-2026-09-18/extract.json` — GSC 28d 页面级 (窗口 2026-08-19~09-15, FRESH)
- 复算方法: methodA `title-equiv.js` (regex) vs methodB 数值逐码点 (§0.23.2)

## 汇总
```json
{
 "generatedFor": "2026-09-19",
 "ruleSSoT": "docs/2026-09-13-title-batch-T-freeze.md §6-3 (K3 2026-09-19 裁决 目标区 50-57, 58 为阻断线; 取代 v4 的 50-54 与 9/13 的 50-58)",
 "equivSSoT": "scripts/guards/title-equiv.js",
 "TITLE_MIN": 50,
 "TITLE_MAX": 57,
 "skuCount": 100,
 "slotCount": 300,
 "slotsPresent": 300,
 "slotsMissing": 0,
 "byBand": {
  "OK": 300
 },
 "byBandV4": {
  "LEGACY": 121,
  "OK": 179
 },
 "recountMismatch": 0,
 "ruleDeltaOkOnlyUnderNewRule": 121,
 "withGscRows": 260,
 "issueSlots": 91
}
```

## A. 不足清单 (<50 半角当量, 按 GSC 展示降序)

| SKU slug | locale | 当量 | GSC展示28d | GSC位置 | CTR | 类别 | title |
|---|---|---|---|---|---|---|---|

## B. 超标清单 (>57 半角当量, 按 GSC 展示降序)

| SKU slug | locale | 当量 | GSC展示28d | GSC位置 | CTR | 类别 | title |
|---|---|---|---|---|---|---|---|

## C. 品牌 / 污染 / 填充词问题槽位

| SKU slug | locale | 当量 | 问题 | title |
|---|---|---|---|---|
| removable-stickers | ja | 50 | 品牌不在末尾 | はがせるステッカー｜再剥離｜10枚〜¥46〜｜ZprintPro |
| die-cut-stickers | zh-hk | 51 | 日文假名污染 | 異形模切貼紙 透明・模切・10起印・HK$0.58起 | 智印港 |
| die-cut-stickers | ja | 54 | 品牌不在末尾 | 型抜きステッカー｜防水PVC 丸角｜10枚〜¥60〜｜ZprintPro |
| security-stickers | ja | 56 | 品牌不在末尾 | セキュリティステッカー｜防水 PVC｜10枚〜¥51〜｜ZprintPro |
| kraft-paper-bags | ja | 57 | 品牌不在末尾 | クラフト紙袋｜箔押し ラミネート｜100枚〜¥240〜｜ZprintPro |
| handle-bags | ja | 50 | 品牌不在末尾 | 手提げ紙袋｜マルチサイズ｜100枚〜¥240〜｜ZprintPro |
| small-bags | zh-hk | 56 | 品牌不在末尾 | 小號紙袋印刷｜多尺寸 白卡牛皮｜100個起 DHL 2-4天｜智印港 |
| small-bags | ja | 56 | 品牌不在末尾 | 小判紙袋｜100個〜 即日発送｜白カード 多サイズ｜ZprintPro |
| large-bags | ja | 54 | 品牌不在末尾 | 大判紙袋｜100枚〜 ¥450〜｜エコ素材 多サイズ｜ZprintPro |
| a4-flyers | zh-hk | 50 | 日文假名污染 | A4 傳單印刷 圓角・覆膜・10起印・HK$0.35起 | 智印港 |
| a4-flyers | ja | 50 | 品牌不在末尾 | A4 チラシ｜両面フルカラー｜10枚〜 ¥70〜｜ZprintPro |
| a5-flyers | ja | 50 | 品牌不在末尾 | A5 チラシ｜両面フルカラー｜10枚〜 ¥50〜｜ZprintPro |
| folded-leaflets | ja | 56 | 品牌不在末尾 | 折りたたみパンフレット｜三つ折り｜10枚〜 ¥110｜ZprintPro |
| thick-paper-flyers | ja | 51 | 品牌不在末尾 | 厚紙チラシ｜両面フルカラー｜10枚〜 ¥95〜｜ZprintPro |
| same-day-flyers | zh-hk | 50 | 日文假名污染 | 即日印刷 傳單 10張起 HK$1.30起 圓角・覆膜 | 智印港 |
| same-day-flyers | ja | 54 | 品牌不在末尾 | 即日チラシ印刷｜¥25〜・10枚〜・無料デザイン｜ZprintPro |
| eco-flyers | ja | 54 | 品牌不在末尾 | エコチラシ｜再生紙 フルカラー｜10枚〜 ¥75〜｜ZprintPro |
| a2-posters | ja | 56 | 品牌不在末尾 | A2 ポスター印刷｜¥300〜・10枚〜・無料デザイン｜ZprintPro |
| display-posters | ja | 57 | 品牌不在末尾 | 展示用ポスター｜防水 PP 翌日発送｜1枚〜 ¥960〜｜ZprintPro |
| art-posters | ja | 54 | 品牌不在末尾 | アートポスター｜美術紙 Giclée｜1枚〜 ¥780〜｜ZprintPro |
| mailer-boxes | ja | 50 | 品牌不在末尾 | 発送箱 メーラーボックス｜100個〜 ¥105〜｜ZprintPro |
| folding-boxes | ja | 57 | 品牌不在末尾 | 折りたたみ箱｜箔押し ラミネート｜100枚〜 ¥69〜｜ZprintPro |
| rigid-boxes | ja | 55 | 品牌不在末尾 | 上製本箱（リジッドボックス）｜100個〜 ¥240〜｜ZprintPro |
| foil-red-packets | ja | 56 | 品牌不在末尾 | 箔押しポチ袋｜金箔 UV エンボス｜100枚〜 ¥64〜｜ZprintPro |
| embossed-red-packets | ja | 52 | 品牌不在末尾 | エンボスポチ袋｜箔押し UV｜100枚〜 ¥129〜｜ZprintPro |
| cartoon-red-packets | ja | 54 | 品牌不在末尾 | キャラクターポチ袋｜イラスト｜100枚〜 ¥64〜｜ZprintPro |
| eco-red-packets | zh-hk | 50 | 日文假名污染 | 環保利是封 燙金・覆膜・100起印・HK$1.90起 | 智印港 |
| eco-red-packets | ja | 52 | 品牌不在末尾 | エコポチ袋｜再生紙 箔押し｜100枚〜 ¥103〜｜ZprintPro |
| large-red-packets | ja | 53 | 品牌不在末尾 | 大判ポチ袋｜箔押し UV 厚紙｜100枚〜 ¥129〜｜ZprintPro |
| wall-calendars | zh-hk | 52 | 日文假名污染 | 掛牆年曆 騎馬釘・1本起印・HK$3起・4小時打稿 | 智印港 |
| wall-calendars | ja | 52 | 品牌不在末尾 | 壁掛けカレンダー｜ノベルティ｜1冊〜 ¥50〜｜ZprintPro |
| desk-calendars | ja | 54 | 品牌不在末尾 | 卓上カレンダー｜ノベルティ 定番｜1冊〜¥50〜｜ZprintPro |
| mini-calendars | zh-hk | 52 | 日文假名污染 | 迷你年曆 騎馬釘・1本起印・HK$3起・4小時打稿 | 智印港 |
| photo-frame-calendars | ja | 56 | 品牌不在末尾 | フォトフレームカレンダー｜置き型｜1冊〜 ¥50〜｜ZprintPro |
| magnetic-calendars | ja | 56 | 品牌不在末尾 | マグネットカレンダー｜ノベルティ｜1冊〜 ¥50〜｜ZprintPro |
| hardcover-menus | ja | 54 | 品牌不在末尾 | 高級メニュー｜上製本 箔押し｜10冊〜 ¥1288〜｜ZprintPro |
| drink-menus | ja | 55 | 品牌不在末尾 | ドリンクメニュー｜10枚〜 ¥515〜｜防水 マット｜ZprintPro |
| disposable-menus | ja | 55 | 品牌不在末尾 | 使い捨てメニュー｜100枚〜 ¥20〜｜防水 マット｜ZprintPro |
| outdoor-vinyl-banners | zh-hk | 53 | 品牌不在末尾 | 戶外燈布噴繪｜防水防曬 PVC高清｜1件起 HK$12起｜智印港 |
| outdoor-vinyl-banners | ja | 52 | 品牌不在末尾; 简体污染 | 屋外バナー｜高画質 PVC 耐候｜1個〜 ¥360〜｜ZprintPro |
| roll-up-banners | ja | 54 | 简体污染 | ロールアップバナー | アルミスタンド 高画質 | ZprintPro |
| adhesive-banners | zh-hk | 50 | 日文假名污染 | 背膠噴繪 透明・10起印・HK$10起・4小時打稿 | 智印港 |
| adhesive-banners | ja | 53 | 品牌不在末尾 | 粘着バナー｜透明 PP 防水加工｜1枚〜 ¥300〜｜ZprintPro |
| vehicle-wraps | ja | 55 | 品牌不在末尾 | カーラッピング｜フルラップ対応｜1台〜 ¥840〜｜ZprintPro |
| mesh-banners | ja | 50 | 简体污染 | メッシュバナー | アルミスタンド 高画質 | ZprintPro |
| catalog-printing | ja | 56 | 品牌不在末尾 | カタログ印刷｜箔押し ラミネート｜10枚〜¥644〜｜ZprintPro |
| perfect-bound-books | ja | 55 | 品牌不在末尾 | 無線綴じ本｜中綴じ ラミネート｜10冊〜 ¥644〜｜ZprintPro |
| hardcover-books | ja | 52 | 品牌不在末尾 | 上製本｜箔押し 見返し付き｜10冊〜 ¥1932〜｜ZprintPro |
| spiral-notebooks | ja | 57 | 品牌不在末尾 | リングノート｜YO綴じ スパイラル｜10冊〜 ¥386〜｜ZprintPro |
| business-envelopes | ja | 54 | 品牌不在末尾 | ビジネス封筒｜DL/C5/C4 窓付き｜100枚〜¥20〜｜ZprintPro |
| colored-envelopes | ja | 52 | 品牌不在末尾 | カラー封筒｜両面印刷 DL-C4｜100枚〜 ¥25〜｜ZprintPro |
| pearl-envelopes | ja | 55 | 品牌不在末尾 | パール封筒｜両面印刷 パール紙｜100枚〜 ¥64〜｜ZprintPro |
| exercise-books | ja | 54 | 品牌不在末尾 | ワークブック印刷｜中綴じ対応｜10冊〜 ¥258〜｜ZprintPro |
| certificates | zh-hk | 54 | 无效填充词 | 證書印刷 | 專業印刷 品質保證 | 100個起 HK$8起 | 智印港 |
| certificates | ja | 52 | 品牌不在末尾 | 賞状印刷｜金箔 銀箔 箔押し｜100枚〜¥386〜｜ZprintPro |
| school-flyers | ja | 54 | 品牌不在末尾 | 学校チラシ｜ラミネート 中綴じ｜10枚〜 ¥20〜｜ZprintPro |
| textbooks | ja | 54 | 品牌不在末尾 | 教科書印刷｜中綴じ 無線綴じ｜100冊〜¥1288〜｜ZprintPro |
| magnetic-closure-gift-box | ja | 52 | 品牌不在末尾 | マグネット式ギフトボックス｜100個〜¥450〜｜ZprintPro |
| electronics-packaging-box | zh-hk | 57 | 品牌不在末尾 | 電子產品包裝盒｜EVA 內襯 緩衝抗震｜200個起 HK$8起｜智印港 |
| electronics-packaging-box | ja | 52 | 品牌不在末尾 | 電子製品包装箱｜箔押し対応｜200個〜¥240〜｜ZprintPro |
| gang-run-card-boxes | ja | 56 | 品牌不在末尾 | 合版ホワイトカードボックス｜型代不要｜500個〜｜ZprintPro |
| fruit-food-label-stickers | zh-hk | 55 | 品牌不在末尾 | 水果及食品標籤印刷｜防水防油｜500張起 HK$0.22起｜智印港 |
| fruit-food-label-stickers | ja | 55 | 品牌不在末尾 | フルーツ・食品ラベル印刷｜防水 耐油｜500枚〜｜ZprintPro |
| acrylic-keychain | zh-hk | 52 | 日文假名污染 | 亞克力鑰匙扣 角色造型訂製 10起印・HK$2275起 | 智印港 |
| acrylic-keychain | ja | 56 | 品牌不在末尾 | アクリルキーホルダー｜推し活 キャラ型｜10個〜｜ZprintPro |
| postcard-set | ja | 54 | 品牌不在末尾 | ポストカードセット｜和紙風 4-8枚｜4セット〜｜ZprintPro |
| eco-tote-bag | ja | 57 | 品牌不在末尾 | エコトートバッグ｜オーガニックコットン｜10個〜｜ZprintPro |
| graduation-yearbook | ja | 53 | 品牌不在末尾 | 卒業記念アルバム印刷｜1冊〜¥1350〜｜中綴じ｜ZprintPro |
| premium-greeting-cards | zh-hk | 51 | 日文假名污染 | 高級賀卡印刷 燙金・局部UV 100張起 HK$100起 | 智印港 |
| premium-greeting-cards | ja | 54 | 品牌不在末尾 | プレミアムグリーティングカード｜10枚〜¥20〜｜ZprintPro |
| thick-greeting-cards-400g | ja | 55 | 品牌不在末尾 | 厚口名刺｜400g 箔押し・エンボス｜10枚〜¥23〜｜ZprintPro |
| foil-greeting-cards | zh-hk | 56 | 日文假名污染 | 燙金名片印刷 | 金・銀・玫瑰金 | 10個起 HK$1.8起 | 智印港 |
| foil-greeting-cards | ja | 55 | 品牌不在末尾 | 箔押し名刺｜金銀 ローズゴールド｜10枚〜¥35〜｜ZprintPro |
| spot-uv-greeting-cards | ja | 56 | 品牌不在末尾 | 部分UVグリーティングカード｜光沢｜10枚〜¥27〜｜ZprintPro |
| matte-greeting-cards | zh-hk | 51 | 日文假名污染 | 啞膜賀卡印刷 防指紋・柔順 100張起 HK$110起 | 智印港 |
| matte-greeting-cards | ja | 57 | 品牌不在末尾 | マットグリーティングカード｜防指紋｜10枚〜 ¥21｜ZprintPro |
| rounded-corner-greeting-cards | ja | 57 | 品牌不在末尾 | 角丸グリーティングカード｜R3mm丸角｜10枚〜 ¥20｜ZprintPro |
| cafe-table-cards | ja | 57 | 品牌不在末尾 | カフェテーブルカード｜PVC防水 スタンド｜50枚〜｜ZprintPro |
| drink-tokens | ja | 53 | 品牌不在末尾 | ドリンクトークン｜PVC防水 丸角仕様｜50枚〜｜ZprintPro |
| escort-cards | ja | 52 | 品牌不在末尾 | エスコートカード｜箔押し スタンド｜50枚〜｜ZprintPro |
| foil-wedding-invitations | ja | 51 | 品牌不在末尾 | 箔押し結婚式招待状｜金銀対応｜50セット〜｜ZprintPro |
| name-tags-badges | ja | 50 | 品牌不在末尾 | 名札｜会議・イベント用 磁石対応｜50枚〜｜ZprintPro |
| save-the-date-cards | ja | 56 | 品牌不在末尾 | Save the Date カード｜A6 箔押しUV｜50セット〜｜ZprintPro |
| tuck-end-boxes | ja | 57 | 品牌不在末尾 | 差し込み式ボックス｜直挿し 飛行機挿し｜500個〜｜ZprintPro |
| wedding-menu-cards | ja | 55 | 品牌不在末尾 | ウエディング メニュー｜A5 箔押し｜50セット〜｜ZprintPro |
| wedding-place-cards | ja | 52 | 品牌不在末尾 | ウエディング席札｜箔押し スタンド｜50枚〜｜ZprintPro |
| wedding-program-cards | ja | 50 | 品牌不在末尾 | 結婚式のしおり｜A5 折り加工｜50セット〜｜ZprintPro |
| wedding-seating-charts | ja | 51 | 品牌不在末尾 | 披露宴座席表｜A1/A2サイズ 箔押し｜50枚〜｜ZprintPro |
| wedding-suite-bundle | ja | 54 | 品牌不在末尾 | ウエディング フル セット｜6枚組｜50セット〜｜ZprintPro |
| wedding-thank-you-cards | ja | 56 | 品牌不在末尾 | 結婚式サンキュカード｜A6 箔押しUV｜50セット〜｜ZprintPro |
| white-card-boxes | ja | 53 | 品牌不在末尾 | 白カードボックス｜特注 化粧品対応｜500個〜｜ZprintPro |

## D. 复算结果 (§0.23.2 双方法)

- methodA vs methodB 不一致: **0** 条 ✅ 两法一致
- 槽位总数 300 / 有 title 300 / 缺 title 0

## E. 规则口径影响面 (v4 50-54 vs 现行 50-57)

- v4 旧口径分布: {"LEGACY":121,"OK":179}
- 现行口径分布: {"OK":300}
- **仅因新口径 (50-57) 才判达标**的槽位: 121 条 (旧口径下属 55-57 由「满格禁加」变为「合规」; ≥58 仍为阻断线)

## F. 优先级分层 (真实数据实测)

### P0 — 位置 ≤20 且 展示 ≥30 且 当量 <40 (共 0 条: 排名已到位, 标题是唯一瓶颈)

| 当量 | locale | SKU | 展示28d | 位置 | CTR | title |
|---|---|---|---|---|---|---|

### P1 — 当量 40-49 且 展示 ≥50 (共 0 条)

| 当量 | locale | SKU | 展示28d | 位置 | CTR | title |
|---|---|---|---|---|---|---|

### 零点击 — 展示 ≥100 且 0 点击 (共 5 条)

| band | 当量 | locale | SKU | 展示28d | 位置 |
|---|---|---|---|---|---|
| OK | 51 | en | small-batch-stickers | 396 | 17.81 |
| OK | 55 | en | catalog-printing | 307 | 29.71 |
| OK | 57 | en | exercise-books | 289 | 23.26 |
| OK | 55 | en | saddle-stitch-booklets | 225 | 67.00 |
| OK | 57 | en | foil-stickers | 136 | 39.51 |

## G. 结构性缺陷: 同簇标题同质化 (≥4 SKU 共享完全相同修饰段)

| locale | 共享修饰段 | SKU 数 | 当量 | 涉及 SKU |
|---|---|---|---|---|
| zh-hk | 智印港 | 21 | 51/50/55/52/53/54 | die-cut-stickers, a4-flyers, same-day-flyers, a2-posters, eco-red-packets, wall-calendars, mini-calendars, adhesive-banners, acrylic-keychain, graduation-yearbook, premium-greeting-cards, matte-greeting-cards, rounded-corner-greeting-cards, corrugated-boxes, drink-tokens, escort-cards, foil-wedding-invitations, name-tags-badges, wedding-seating-charts, wedding-suite-bundle, white-card-boxes |
| en | Free Shipping $99+ | ZprintPro | 7 | 56/57/51/54/55 | die-cut-stickers, security-stickers, kraft-paper-bags, thick-paper-flyers, magnetic-calendars, outdoor-vinyl-banners, can-badge |
| ja | ZprintPro | 6 | 54/52/50/51 | outdoor-posters, cosmetic-boxes, saddle-stitch-booklets, kraft-paper-packaging-box, doujinshi-printing, corrugated-boxes |
| en | Free US Ship | ZprintPro | 5 | 54/57/53 | transparent-stickers, fluorescent-stickers, a5-flyers, exercise-books, doujinshi-printing |

## H. 违规清单 ledger (黄灯期跟踪 · K3 2026-09-19 指令)

- ledger: `.hermes/reports/sku-title-ledger.json` (稳定键 slug|locale, 记 firstSeen / 当量历史 / status)
- **未修复 0** / 已修复 126 / 累计 126
- 门禁阶段: **READY_TO_ESCALATE_RED** (存量 ≤10 时把 severity 由 yellow 升 red 硬拦)