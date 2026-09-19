# 價目同步波 — 逐條清單 (供人工過目, 未執行)

**產出**: 2026-09-19 · `scripts/moq10-action-list.ts` · **乾淨 HEAD `26fd68c8` 下生成**

```
數據來源:
- 報告載體: 由「臨時 worktree @ 26fd68c8」在乾淨 HEAD 生成, 與工作區版本**逐位元一致**
  (已驗證: 掃描檔數/命中數/分類/行動/①清單 全部相同 ⇒ 未混入其他併發車道的改動)
- 掃描: 111 檔 / 1833 命中
- 分類器: classifyMoqString() (同一 SSoT)
- 校準日期: 2026-09-19
```

## 置信度分佈

| 置信度 | ① 改 MOQ | 說明 |
|---|---|---|
| high | 149 | 品類詞距命中 ≤25 字 |
| mid | 26 | 品類詞 26-60 字 或結構化欄位 |
| low | 4 | 多品類競爭 / 共享模板 → 建議轉④ |

## 清單① 本批品類待改 MOQ

| # | 檔案:行 | 品類 | 當前值 | 目標值 | 置信度 | 依據 | 欄位 | 上下文 |
|---|---|---|---|---|---|---|---|---|
| 1 | `src/data/blog-posts.ts:936` | 書刊/畫冊 | `30 本起印` | `10 本起印` | high | 書刊/畫冊 距 7 字 | — | 'zh-hk': '插畫師、漫畫家、Comic-Con 同人攤位、VTuber 周邊設計師、文創品牌必睇。一本高質素同人誌決定品牌辨識度與粉絲忠誠度。智印港為香港同人市場提供 30 |
| 2 | `src/data/blog-posts.ts:937` | 書刊/畫冊 | `30-copy MOQ` | `10-copy MOQ` | high | 書刊/畫冊 距 22 字 | — | en: 'Indie comic creators, zine makers, Comic-Con Artist Alley exhibitors, indie game stud |
| 3 | `src/data/blog-posts.ts:1230` | 書刊/畫冊 | `100 張起印` | `10 張起印` | high | 書刊/畫冊 距 9 字 | — | 'zh-hk': '香港新盤代理 / 二手樓經紀 / 物業管理必睇。157g 雙銅紙 A4 摺頁 + 騎馬釘小手冊 + 100 張起印，3-5 個工作天交付，順豐本地 + DHL  |
| 4 | `src/data/blog-posts.ts:1412` | 傳單 | `100 張起印` | `10 張起印` | high | 傳單 距 5 字 | — | 'zh-hk': '香港餐廳開幕 / 活動 late-call / 地產快銷旺季,Q1-Q2 同期急單需求 +35%。即日傳單印刷 100 張起印,4-6 小時特急,順豐本地 /  |
| 5 | `src/data/blog-posts.ts:1431` | 海報 | `100 張起印` | `1 張起印` | low | 窗內多品類競爭 (海報/傳單/橫額/噴繪/貼紙/標籤) | — | 'zh-hk': '香港即日急件印刷 100 張起印，18:00 截單，順豐翌日中午 12:00 前送到。6 大場景 (展會/投標/海報/傳單/易拉寶/貼紙) + 4 條 FAQ  |
| 6 | `src/data/blog-posts.ts:1433` | 海報 | `100 枚〜` | `1 枚〜` | low | 窗內多品類競爭 (海報/傳單/橫額/噴繪/貼紙/標籤) | — | ja: '香港当日特急印刷 100 枚〜, 18:00 締切, SF翌日12時前配送. 6 シーン (展示/入札/ポスター/チラシ/バナー/ステッカー) + 4 FAQ + 5 内 |
| 7 | `src/data/blog-posts.ts:1545` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 18 字 | — | 'zh-hk': '畫冊印刷點揀？攝影集、展覽圖錄、產品型錄 4 大類型規格表，銅版紙/啞粉紙/特種紙紙材對比，硬皮精裝/膠裝/騎馬釘裝訂攻略，附 4 條 FAQ，50 本起印，3 |
| 8 | `src/data/blog-posts.ts:1947` | 書刊/畫冊 | `100 部から` | `10 部から` | high | 書刊/畫冊 距 13 字 | — | ja: 'ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から ｜ ZprintPro', |
| 9 | `src/data/blog-posts.ts:1977` | 書刊/畫冊 | `100 部から` | `10 部から` | high | 書刊/畫冊 距 19 字 | — | ja: '絵本印刷：ハードカバー 32 ページ 100 部から ｜ ZprintPro', |
| 10 | `src/data/blog-posts.ts:2002` | 書刊/畫冊 | `1 本起印` | `10 本起印` | high | 書刊/畫冊 距 3 字 | — | 'zh-hk': "寫真書印刷：相冊相簿精裝 1 本起印 100 本更平 ｜ 智印港", |
| 11 | `src/data/blog-posts.ts:2034` | 書刊/畫冊 | `1 本起印` | `10 本起印` | high | 書刊/畫冊 距 15 字 | — | 'zh-hk': "自費出版印刷：1 本起印、無最低起訂量 平裝精裝 ｜ 智印港", |
| 12 | `src/data/buying-guides.ts:31` | 賀卡 | `100 張起印` | `10 張起印` | high | 賀卡 距 22 字 | — | 'zh-hk': '由 300g 銅版紙到 400g 厚卡、由燙金到 3D 立體，香港賀卡印刷選購全攻略。智印港拆解紙張、工藝、價格與交期，100 張起印、免費打樣，助您印出最有心 |
| 13 | `src/data/buying-guides.ts:32` | 賀卡 | `100 MOQ` | `10 MOQ` | high | 賀卡 距 24 字 | — | en: 'From 300g art board to 400g thick stock, foil stamping to 3D pop-up - a complete guid |
| 14 | `src/data/buying-guides.ts:33` | 賀卡 | `100枚から` | `10枚から` | high | 賀卡 距 22 字 | — | ja: '300gアート紙から400g厚紙、箔押しからポップアップまで—グリーティングカード印刷の選び方完全ガイド。100枚から注文可、無料サンプル、DHLで2-4日納品。', |
| 15 | `src/data/buying-guides.ts:44` | 賀卡 | `100 張起印` | `10 張起印` | low | 窗內多品類競爭 (賀卡) | — | 'zh-hk': `<p>賀卡是少數「一定會被翻開看」的印刷品：企業年終答謝、婚禮感謝、聖誕新年祝福，一張有質感的賀卡勝過十則群發訊息。但紙張克重、燙金工藝、起印數量選擇繁多，報價 |
| 16 | `src/data/buying-guides.ts:60` | 賀卡 | `100 MOQ` | `10 MOQ` | high | 賀卡 距 21 字 | — | 'en': `<p>Greeting cards are the rare print piece people actually open: corporate thank-yo |
| 17 | `src/data/buying-guides.ts:74` | 賀卡 | `100枚から` | `10枚から` | mid | 賀卡 距 54 字, 窗內單一品類 | — | 'ja': `<p>グリーティングカードは「必ず手に取って開いてもらえる」希少な印刷物です。企業のサンキューカード、ウェディングの挨拶、クリスマス・新年のメッセージに、質の高いカー |
| 18 | `src/data/buying-guides.ts:117` | 貼紙/標籤 | `50 個起印` | `10 個起印` | high | 貼紙/標籤 距 3 字 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙 50 個起印，數碼快印免庫存壓力；標準訂單 100 張起，燙金／防偽等特殊工藝 |
| 19 | `src/data/buying-guides.ts:117` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 25 字 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙 50 個起印，數碼快印免庫存壓力；標準訂單 100 張起，燙金／防偽等特殊工藝 |
| 20 | `src/data/buying-guides.ts:117` | 貼紙/標籤 | `500 張起` | `10 張起` | mid | 貼紙/標籤 距 43 字, 窗內單一品類 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙 50 個起印，數碼快印免庫存壓力；標準訂單 100 張起，燙金／防偽等特殊工藝 |
| 21 | `src/data/buying-guides.ts:181` | 貼紙/標籤 | `50枚から` | `10枚から` | high | 貼紙/標籤 距 6 字 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>ステッカーは50枚から注文可（デジタル小ロット）。標準注文は100枚から、箔押し・偽 |
| 22 | `src/data/buying-guides.ts:181` | 貼紙/標籤 | `100枚から` | `10枚から` | mid | 貼紙/標籤 距 30 字, 窗內單一品類 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>ステッカーは50枚から注文可（デジタル小ロット）。標準注文は100枚から、箔押し・偽 |
| 23 | `src/data/buying-guides.ts:181` | 貼紙/標籤 | `500枚から` | `10枚から` | mid | 貼紙/標籤 距 53 字, 窗內單一品類 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>ステッカーは50枚から注文可（デジタル小ロット）。標準注文は100枚から、箔押し・偽 |
| 24 | `src/data/buying-guides.ts:733` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 3 字 | — | <div class="bg-amber-50 rounded-lg p-4 my-4"><p><strong>最少訂幾多本？</strong>書刊 50 本起印（數碼印刷），50 |
| 25 | `src/data/buying-guides.ts:747` | 書刊/畫冊 | `50 本起印` | `10 本起印` | mid | 書刊/畫冊 距 42 字, 窗內單一品類 | — | <p>以上為大批量柯式口徑；小批量可用數碼印刷，50 本起印，詳見<a href="/zh-hk/category/books/">書刊印刷類別</a>。</p> |
| 26 | `src/data/buying-guides.ts:749` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 3 字 | — | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【書刊 50 本起印：騎馬釘小冊子 50 本起、膠裝書 100 本起、精裝書 50 本 |
| 27 | `src/data/buying-guides.ts:750` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 3 字 | — | <p>智印港書刊 50 本起印（數碼印刷），個人出版、活動場刊同市場測試都唔使囤貨；500 本以上轉柯式印刷，單本成本大幅下降。</p> |
| 28 | `src/data/buying-guides.ts:819` | 書刊/畫冊 | `50 冊から` | `10 冊から` | high | 書刊/畫冊 距 7 字 | — | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【書籍印刷 50 冊から：中綴じ冊子 50 冊〜、無線綴じ書籍 100 冊〜、上製本  |
| 29 | `src/data/buying-guides.ts:820` | 書刊/畫冊 | `50 冊から` | `10 冊から` | high | 書刊/畫冊 距 24 字 | — | <p>ZprintProの書籍印刷は 50 冊から（デジタル印刷）、個人出版・イベント冊子・市場テストに最適で在庫の心配なし；500 冊以上はオフセット印刷で単価が大幅に低下します |
| 30 | `src/data/buying-guides.ts:916` | 貼紙/標籤 | `MOQ 100` | `MOQ 10` | high | 貼紙/標籤 距 17 字 | — | 'zh-hk': 'FDA 認可膠水、防水面層、細 MOQ 100 張起。智印港食品級貼紙完整規格：FDA 21 CFR 175.105 文件、防水啞面／亮面、免費異形模切、DHL |
| 31 | `src/data/category-conversion-blocks.ts:74` | 貼紙/標籤 | `100 張起印` | `10 張起印` | high | 貼紙/標籤 距 20 字 | title | "title": "貼紙印刷｜香港最快 2 日起貨｜小批量 100 張起印｜ZprintPro", |
| 32 | `src/data/category-conversion-blocks.ts:75` | 貼紙/標籤 | `100 張起印` | `10 張起印` | high | 貼紙/標籤 距 24 字 | metaDescription | "metaDescription": "香港貼紙印刷專家，PVC/透明/啞銀/光粉多款材質，100 張起印，2-3 日出貨。立即 WhatsApp 報價：+86 198 8085  |
| 33 | `src/data/category-conversion-blocks.ts:354` | 貼紙/標籤 | `100枚から` | `10枚から` | high | 貼紙/標籤 距 16 字 | title | "title": "オリジナルステッカー印刷｜香港発・小ロット100枚から・2〜3日出荷｜ZprintPro", |
| 34 | `src/data/category-conversion-blocks.ts:355` | 貼紙/標籤 | `100枚から` | `10枚から` | mid | 貼紙/標籤 距 29 字, 窗內單一品類 | metaDescription | "metaDescription": "香港発のオリジナルステッカー印刷。PVC・透明・マット銀・光沢など9種以上、100枚から対応、2〜3日出荷。WhatsAppで今すぐお見積も |
| 35 | `src/data/category-conversion-blocks.ts:795` | 傳單 | `100 張起印` | `10 張起印` | mid | 傳單 距 31 字, 窗內單一品類 | a | "a": "常規單張 2-3 個工作天交貨，趕時間可問加急安排。MOQ 低至 100 張起印，適合小批量推廣。" |
| 36 | `src/data/category-conversion-blocks.ts:1491` | 海報 | `100 張起` | `1 張起` | high | 海報 距 23 字 | title | "title": "海報印刷｜印海報 A0-A3 大圖輸出・戶外防水 PVC 100 張起｜智印港", |
| 37 | `src/data/category-conversion-blocks.ts:2320` | 傳單 | `100枚から` | `10枚から` | high | 傳單 距 14 字 | title | "title": "チラシ印刷 ｜ フライヤー印刷・チラシ作成 ｜ A6〜A3 100枚から 即日特急対応｜ZprintPro", |
| 38 | `src/data/category-conversion-blocks.ts:2435` | 傳單 | `100枚から` | `10枚から` | mid | 傳單 距 39 字, 窗內單一品類 | — | { "q": "チラシの最小発注数（MOQ）は何枚からですか？", "a": "デジタル印刷は100枚から承ります。新店開業やイベントの試し配布にも十分な枚数です。1,000枚以上 |
| 39 | `src/data/category-conversion-blocks.ts:3589` | 書刊/畫冊 | `100 本起印` | `10 本起印` | high | 書刊/畫冊 距 8 字 | a | "a": "五款書刊（騎馬釘書刊小冊子、無線膠裝書、精裝書、線圈筆記本、畫冊型錄）劃一 100 本起印；" |
| 40 | `src/data/category-conversion-blocks.ts:3701` | 書刊/畫冊 | `100 本起印` | `10 本起印` | high | 書刊/畫冊 距 8 字 | — | { "q": "印書最少要印幾多本？有冇批量優惠？", "a": "五款書刊（騎馬釘書刊小冊子、無線膠裝書、精裝書、線圈筆記本、畫冊型錄）劃一 100 本起印；以騎馬釘小冊子為例， |
| 41 | `src/data/category-conversion-blocks.ts:3871` | 書刊/畫冊 | `100冊から` | `10冊から` | mid | 書刊/畫冊 距 31 字 + 結構化欄位 metaDescription | metaDescription | "metaDescription": "教材・テキスト・冊子印刷は工場直送。中綴じ冊子は1冊￥258〜、無線綴じ書籍は1冊￥644〜、上製本は1冊￥1,932〜、カタログは1冊￥6 |
| 42 | `src/data/category-conversion-blocks.ts:3879` | 書刊/畫冊 | `100冊から` | `10冊から` | mid | 書刊/畫冊 距 27 字 + 結構化欄位 a | a | "a": "無線綴じ書籍は1冊￥644〜、上製本（ハードカバー）は1冊￥1,932〜で、いずれも100冊から製造します。" |
| 43 | `src/data/category-conversion-blocks.ts:3883` | 書刊/畫冊 | `100冊から` | `10冊から` | high | 書刊/畫冊 距 6 字 | a | "a": "対応しています。中綴じ・無線綴じ・上製本すべて100冊からのご注文で、教材やテキストの小ロット製本にも対応します。" |
| 44 | `src/data/category-conversion-blocks.ts:3990` | 書刊/畫冊 | `100冊から` | `10冊から` | low | 窗內多品類競爭 (書刊/畫冊/教科書/練習) | — | { "q": "教材やテキストの印刷はいくらから依頼できますか？", "a": "教材・テキストでよく使われる中綴じ冊子は1冊￥258〜、ページ数の多いカタログ・図録は1冊￥644 |
| 45 | `src/data/category-conversion-blocks.ts:3991` | 書刊/畫冊 | `100冊から` | `10冊から` | high | 書刊/畫冊 距 12 字 | — | { "q": "無線綴じと上製本はそれぞれ何冊から注文できますか？", "a": "無線綴じ書籍は1冊￥644〜、上製本（ハードカバー）は1冊￥1,932〜で、いずれも100冊から |
| 46 | `src/data/category-conversion-blocks.ts:3992` | 書刊/畫冊 | `100冊から` | `10冊から` | high | 書刊/畫冊 距 6 字 | — | { "q": "無線綴じの小ロット製本には対応していますか？", "a": "対応しています。中綴じ・無線綴じ・上製本すべて100冊からのご注文で、教材やテキストの小ロット製本にも |
| 47 | `src/data/category-conversion-blocks.ts:3995` | 書刊/畫冊 | `100冊から` | `10冊から` | high | 書刊/畫冊 距 8 字 | a | "a": "中綴じ冊子・無線綴じ書籍・上製本はいずれも100冊から承ります。目安価格は中綴じ冊子1冊￥258〜、無線綴じ1冊￥644〜、上製本1冊￥1,932〜です。ページ数・紙質 |
| 48 | `src/data/category-conversion-blocks.ts:4003` | 書刊/畫冊 | `100冊から` | `10冊から` | high | 書刊/畫冊 距 4 字 | a | "a": "2.5mm厚のボード表紙にクロスまたは紙を装丁し、箔押しタイトルやリボン栞を追加できます。卒業記念アルバム・記念誌・保存版テキストに人気の仕様です。上製本は100冊から |
| 49 | `src/data/category-conversion-blocks.ts:4007` | 書刊/畫冊 | `100冊から` | `10冊から` | high | 書刊/畫冊 距 5 字 | a | "a": "はい。中綴じ・無線綴じ・上製本とも100冊から承りますので、講習会テキストや配布資料などの小ロットにも対応します。大口部数は段階的な数量割引が適用され、学校・塾・企業の |
| 50 | `src/data/category-seo-content.ts:712` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 23 字 | h2 | h2: '騎馬釘小冊子 / 騎馬釘書刊 / 畫冊印刷 / 產品型錄印刷 / 大量印刷 — 50 本起印, 8-64 頁全規格, 30 秒 AI 報價', |
| 51 | `src/data/category-seo-content.ts:912` | 書刊/畫冊 | `50冊から` | `10冊から` | mid | 書刊/畫冊 距 35 字 + 結構化欄位 h2 | h2 | h2: '中綴じ冊子 / カタログ印刷 / 大量印刷 / 卸売印刷 / 国際配送 — 50冊から, 8-64ページ全規格, 30秒 AI 見積もり', |
| 52 | `src/data/category-seo-content.ts:969` | 貼紙/標籤 | `1冊から` | `10冊から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '1冊から（デジタル印刷）。100冊以上はオフセット印刷がお得。' }, |
| 53 | `src/data/category-seo-content.ts:1599` | 貼紙/標籤 | `500枚から` | `10枚から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得。' }, |
| 54 | `src/data/category-seo-content.ts:1916` | 貼紙/標籤 | `50冊から` | `10冊から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' }, |
| 55 | `src/data/category-seo-content.ts:2217` | 貼紙/標籤 | `500枚から` | `10枚から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得。' }, |
| 56 | `src/data/category-seo-content.ts:2509` | 貼紙/標籤 | `50冊から` | `10冊から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' }, |
| 57 | `src/data/category-seo-content.ts:2665` | 貼紙/標籤 | `50 個起印` | `10 個起印` | high | 貼紙/標籤 距 5 字 | h2 | h2: '貼紙印刷 / 戶外貼紙 / 防水貼紙 / 可移貼紙 — 50 個起印 5-7 天交期', |
| 58 | `src/data/category-seo-content.ts:2722` | 貼紙/標籤 | `50 張起` | `10 張起` | high | 貼紙/標籤 距 22 字 | — | { label: '起訂量', value: '50 張起訂（數碼印刷），1,000 張以上柯式印刷更經濟' }, |
| 59 | `src/data/category-seo-content.ts:2739` | 貼紙/標籤 | `50 張起印` | `10 張起印` | high | 貼紙/標籤 距 12 字 | — | '貼紙印刷揀款一句講晒：室內用銅版紙、戶外用 PVC 防水、要撕得甩用可移貼紙、要通透感用透明貼。50 張起印、即日可交，最細 25×25mm 都印到；落單前答埋「貼喺邊、貼幾耐」 |
| 60 | `src/data/category-seo-content.ts:2745` | 貼紙/標籤 | `50 張起` | `10 張起` | high | 貼紙/標籤 距 23 字 | — | '搜「貼紙訂製」嘅客戶最常問色差同起訂量：數碼印刷 50 張起免製版，打樣當日完成；柯式 1,000 張起更抵。戶外貼紙記得指明要 UV 油墨加過膠，先頂得住香港夏天嘅日曬雨淋。' |
| 61 | `src/data/category-seo-content.ts:2745` | 貼紙/標籤 | `1,000 張起` | `10 張起` | high | 貼紙/標籤 距 13 字 | — | '搜「貼紙訂製」嘅客戶最常問色差同起訂量：數碼印刷 50 張起免製版，打樣當日完成；柯式 1,000 張起更抵。戶外貼紙記得指明要 UV 油墨加過膠，先頂得住香港夏天嘅日曬雨淋。' |
| 62 | `src/data/category-seo-content.ts:2756` | 貼紙/標籤 | `50 張起` | `10 張起` | high | 貼紙/標籤 距 18 字 | — | { q: '貼紙印刷最低多少張起？', a: '50 張起訂（數碼印刷）。1,000 張以上柯式印刷更經濟。' }, |
| 63 | `src/data/category-seo-content.ts:2876` | 貼紙/標籤 | `50枚から` | `10枚から` | high | 貼紙/標籤 距 8 字 | h2 | h2: 'ステッカー 印刷 / 屋外 ステッカー / 防水ステッカー / 剥がせるステッカー — 50枚から 5-7日納期', |
| 64 | `src/data/category-seo-content.ts:2933` | 貼紙/標籤 | `50枚から` | `10枚から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '50枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' }, |
| 65 | `src/data/category-seo-content.ts:2950` | 貼紙/標籤 | `50枚から` | `10枚から` | mid | 貼紙/標籤 距 51 字, 窗內單一品類 | — | 'オリジナルステッカーは「屋内はコート紙、屋外は防水ビニール、仮止めは再剥離、透明感はクリア素材」と覚えればOK。50枚からの小ロット、当日デジタル仕上げ対応。「どこに・どのくらい |
| 66 | `src/data/category-seo-content.ts:2965` | 貼紙/標籤 | `50枚から` | `10枚から` | high | 貼紙/標籤 距 20 字 | — | { q: 'シール印刷の最小発注数は？', a: '50枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' }, |
| 67 | `src/data/category-seo-content.ts:2987` | 傳單 | `100 張起印` | `10 張起印` | high | 傳單 距 15 字 | h2 | h2: '宣傳單張 / 宣傳單張印刷 / 傳單印刷 / 彩色單張 — A3-A6 全尺寸 100 張起印, 即日特急可選', |
| 68 | `src/data/category-seo-content.ts:3044` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 22 字 | — | { label: '起訂量', value: '100 張起訂（數碼印刷），1,000 張以上柯式印刷更經濟' }, |
| 69 | `src/data/category-seo-content.ts:3185` | 傳單 | `100枚から` | `10枚から` | high | 傳單 距 12 字 | h2 | h2: 'チラシ 印刷 / チラシ 作成 / フライヤー 印刷 / 両面カラーチラシ — A6-A3 100枚から, 即日特急対応', |
| 70 | `src/data/category-seo-content.ts:3242` | 貼紙/標籤 | `100枚から` | `10枚から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '100枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' }, |
| 71 | `src/data/category-seo-content.ts:3289` | 海報 | `100 張起印` | `1 張起印` | high | 海報 距 15 字 | h2 | h2: '印海報 / 海報印刷 / MTR 12-sheet 燈箱海報 — A0-A3 全尺寸 100 張起印, 防水 PP/PVC, 同日特急可選', |
| 72 | `src/data/category-seo-content.ts:3346` | 貼紙/標籤 | `1 張起` | `10 張起` | high | 貼紙/標籤 距 22 字 | — | { label: '起訂量', value: '1 張起訂（大圖輸出），10 張以上批量優惠' }, |
| 73 | `src/data/category-seo-content.ts:3499` | 海報 | `10枚から` | `1枚から` | high | 海報 距 22 字 | h2 | h2: 'ポスター 印刷 / ポスター 印刷 費用 / ポスター プリント / a3 ポスター サイズ — A0-A3 全サイズ 10枚から, 即日特急対応', |
| 74 | `src/data/category-seo-content.ts:3556` | 貼紙/標籤 | `1枚から` | `10枚から` | high | 貼紙/標籤 距 24 字 | — | { label: '最小発注数', value: '1枚から（大判出力）。10枚以上は大口割引あり。' }, |
| 75 | `src/data/category-seo-content.ts:3992` | 貼紙/標籤 | `50 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | — | { label: '起訂量', value: '同人誌 10 本起 / 貼紙 50 張起 / 海報 10 張起 / 壓克力 5 個起' }, |
| 76 | `src/data/category-seo-content.ts:3992` | 海報 | `10 張起` | `1 張起` | high | 海報 距 3 字 | — | { label: '起訂量', value: '同人誌 10 本起 / 貼紙 50 張起 / 海報 10 張起 / 壓克力 5 個起' }, |
| 77 | `src/data/category-seo-content.ts:4112` | 貼紙/標籤 | `MOQ 50` | `MOQ 10` | high | 貼紙/標籤 距 7 字 | — | { q: 'Can I get custom die-cut stickers?', a: 'Yes. Any shape die-cut (rounded, irregular, |
| 78 | `src/data/category-seo-content.ts:4218` | 賀卡 | `100 張起印` | `10 張起印` | high | 賀卡 距 7 字 | h2 | h2: '賀卡印刷 · 100 張起印 · 3D 立體爆款 · 順豐本地 + DHL 全球配送', |
| 79 | `src/data/category-seo-content.ts:4267` | 貼紙/標籤 | `100 張起印` | `10 張起印` | high | 貼紙/標籤 距 22 字 | — | { label: '起訂量', value: '100 張起印,500 張享批量折扣,50 張可議 (小批量試產)' }, |
| 80 | `src/data/category-seo-content.ts:4298` | 賀卡 | `100 張起印` | `10 張起印` | high | 賀卡 距 18 字 | — | { q: '賀卡印刷最少印幾多張?', a: '100 張起印。50 張小批量可議,適合設計確認或首批客戶。' }, |
| 81 | `src/data/category-seo-content.ts:4392` | 賀卡 | `100枚から` | `10枚から` | high | 賀卡 距 15 字 | h2 | h2: 'グリーティングカード印刷 ｜ 100枚から ｜ 立体 3D ヒット商品 ｜ DHL 2-4日配送', |
| 82 | `src/data/category-seo-content.ts:4441` | 貼紙/標籤 | `100 枚から` | `10 枚から` | high | 貼紙/標籤 距 23 字 | — | { label: '最小数量', value: '100 枚から、500 枚以上で数量割引、50 枚対応可 (小ロット試作)' }, |
| 83 | `src/data/category-seo-content.ts:4472` | 賀卡 | `100 枚から` | `10 枚から` | mid | 賀卡 距 27 字, 窗內單一品類 | — | { q: 'グリーティングカード印刷の最小注文数は?', a: '100 枚から。50 枚の小ロットもデザイン確認や初回クライアント様に可能。' }, |
| 84 | `src/data/category-seo-content.ts:4838` | 貼紙/標籤 | `50 張起印` | `10 張起印` | high | 貼紙/標籤 距 22 字 | — | { label: '起訂量', value: '50 張起印,200 張享批量折扣,100 張享 9 折' }, |
| 85 | `src/data/category-seo-content.ts:5016` | 貼紙/標籤 | `50 枚から` | `10 枚から` | high | 貼紙/標籤 距 23 字 | — | { label: '最小数量', value: '50 枚から、200 枚以上で数量割引、100 枚で 10%OFF' }, |
| 86 | `src/data/insights/hk-print-inquiry-index-vol1.ts:22` | 書刊/畫冊 | `100 部から` | `10 部から` | mid | 書刊/畫冊 距 46 字 + 結構化欄位 a | a | a: '50-100 部から, 短納期 24-72h。学园祭印刷 / 卒業記念アルバム 100 部から, 同人誌印刷 10 部から, ステッカー印刷 50 枚から。', |
| 87 | `src/data/insights/hk-print-inquiry-index-vol1.ts:22` | 書刊/畫冊 | `100 部から` | `10 部から` | high | 書刊/畫冊 距 9 字 | a | a: '50-100 部から, 短納期 24-72h。学园祭印刷 / 卒業記念アルバム 100 部から, 同人誌印刷 10 部から, ステッカー印刷 50 枚から。', |
| 88 | `src/data/insights/hk-print-inquiry-index-vol1.ts:22` | 貼紙/標籤 | `50 枚から` | `10 枚から` | high | 貼紙/標籤 距 8 字 | a | a: '50-100 部から, 短納期 24-72h。学园祭印刷 / 卒業記念アルバム 100 部から, 同人誌印刷 10 部から, ステッカー印刷 50 枚から。', |
| 89 | `src/data/product-faqs.ts:327` | 海報 | `10張起` | `1張起` | high | 海報 距 9 字 | — | 'zh-hk': '智印港提供A2海報印刷服務，最低10張起訂。無論是戶外防水海報、展覽海報或燙金海報，均可少批量定製，適合活動宣傳及零售推廣。詳情請參閱《海報印刷完全指南》。', |
| 90 | `src/data/product-faqs.ts:329` | 海報 | `10枚から` | `1枚から` | high | 海報 距 12 字 | — | 'ja': 'ZprintProではA2ポスター印刷に対応しており、最小ロットは10枚からです。屋外防水ポスター、展示会用ポスター、箔押しポスターなど、イベント宣伝や小売広告に最適 |
| 91 | `src/data/products-content.ts:276` | 賀卡 | `50枚〜` | `10枚〜` | high | 賀卡 距 5 字 | — | <details class="my-2"><summary><strong>ZprintPro の最小注文数量は？</strong></summary><p>ジープリントは小ロッ |
| 92 | `src/data/products-content.ts:390` | 賀卡 | `50枚〜` | `10枚〜` | high | 賀卡 距 5 字 | — | <details class="my-2"><summary><strong>ZprintPro の最小注文数量は？</strong></summary><p>ジープリントは小ロッ |
| 93 | `src/data/products-content.ts:550` | 賀卡 | `MOQ 100` | `MOQ 10` | high | 賀卡 距 21 字 | — | <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・少数役員も対応、特急料金で 50 枚も対応可能</li> |
| 94 | `src/data/products-content.ts:787` | 賀卡 | `MOQ 100` | `MOQ 10` | high | 賀卡 距 21 字 | — | <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・小規模チームも対応、特急料金で 50 枚も対応可能</li> |
| 95 | `src/data/products-content.ts:1021` | 賀卡 | `MOQ 100` | `MOQ 10` | high | 賀卡 距 21 字 | — | <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・小規模チームも対応、特急料金で 50 枚も対応可能</li> |
| 96 | `src/data/products-content.ts:1253` | 賀卡 | `MOQ 100` | `MOQ 10` | high | 賀卡 距 21 字 | — | <li><strong>MOQ 100 枚</strong>：個人グリーティングカード・小規模チームも対応、特急料金で 50 枚も対応可能</li> |
| 97 | `src/data/products-content.ts:1364` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 98 | `src/data/products-content.ts:1578` | 貼紙/標籤 | `50 枚〜` | `10 枚〜` | mid | 貼紙/標籤 距 57 字, 窗內單一品類 | — | <details class="my-2"><summary><strong>小ロットステッカーの最小注文数量（MOQ）は？</strong></summary><p>防水 Vin |
| 99 | `src/data/products-content.ts:1702` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 100 | `src/data/products-content.ts:1937` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 101 | `src/data/products-content.ts:2221` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 102 | `src/data/products-content.ts:2467` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 103 | `src/data/products-content.ts:2546` | 貼紙/標籤 | `100 枚から` | `10 枚から` | high | 貼紙/標籤 距 17 字 | — | <p>ZprintPro の箔押しステッカーは、ロゴ・パッケージ・シールに金属光沢を加える高級印刷。金箔・銀箔・ローズゴールド箔・銅箔・ホログラム箔・ブラシメタル箔の 6 種類から |
| 104 | `src/data/products-content.ts:2588` | 貼紙/標籤 | `MOQ 100` | `MOQ 10` | mid | 貼紙/標籤 距 32 字, 窗內單一品類 | — | <li><strong>MOQ 100 枚</strong>：少量イベント・ウェディングシールも対応、特急料金でさらに小ロットも対応可能</li> |
| 105 | `src/data/products-content.ts:2706` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 106 | `src/data/products-content.ts:2943` | 貼紙/標籤 | `500 張起印` | `10 張起印` | high | 貼紙/標籤 距 7 字 | — | <p>智印港（ZprintPro）已為多個國際零售品牌、文創市集、咖啡店提供貼紙印製服務。500 張起印，深圳自設廠房直送，DHL Express / FedEx 國際配送。</p |
| 107 | `src/data/products-content.ts:10062` | 書刊/畫冊 | `1部から` | `10部から` | mid | 書刊/畫冊 距 43 字, 窗內單一品類 | — | longDescriptionJa: `ハードカバー精裝書籍をZprintProでご注文。プレミアム仕上げの精裝本は、上質紙90g本文＋ハードケース表紙で、長期保存・高級感を両立し |
| 108 | `src/data/products-content.ts:11576` | 書刊/畫冊 | `50 部から` | `10 部から` | high | 書刊/畫冊 距 9 字 | — | <details class="my-2"><summary><strong>ジープリントの卒業記念アルバムの最低注文数量は？</strong></summary><p>ジープリン |
| 109 | `src/data/products.ts:338` | 賀卡 | `100個起印` | `10個起印` | high | 賀卡 距 3 字 | — | name: '燙金/燙銀賀卡 ｜ 賀卡 / 燙銀工藝 / 婚禮卡', nameEn: 'Foil-Stamped Greeting Cards ｜ Gold/Silver Foil |
| 110 | `src/data/products.ts:716` | 貼紙/標籤 | `100個起印` | `10個起印` | high | 貼紙/標籤 距 6 字 | — | name: '防水貼紙 / 戶外貼紙 訂製 ｜ PVC 防水 / 異形貼紙', nameEn: 'Waterproof Stickers / Outdoor Stickers ｜  |
| 111 | `src/data/products.ts:915` | 貼紙/標籤 | `50張起印` | `10張起印` | high | 貼紙/標籤 距 11 字 | — | name: '可移貼紙(無殘膠) / 可移貼紙訂製 ｜ 防水貼紙 / 異形貼紙', nameEn: 'Removable Stickers ｜ Waterproof & Die-C |
| 112 | `src/data/products.ts:5766` | 書刊/畫冊 | `MOQ 100` | `MOQ 10` | high | 書刊/畫冊 距 16 字 | — | faqSchema: [{"question": "What is the difference between perfect bound and saddle stitch?" |
| 113 | `src/data/sku-seo-data.ts:31` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | description | "description": "防水貼紙/防水貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、l |
| 114 | `src/data/sku-seo-data.ts:82` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | description | "description": "透明貼紙/透明貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、l |
| 115 | `src/data/sku-seo-data.ts:125` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | description | "description": "可移貼紙/不殘膠貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、 |
| 116 | `src/data/sku-seo-data.ts:184` | 貼紙/標籤 | `50 枚〜` | `10 枚〜` | high | 貼紙/標籤 距 6 字 | title | "title": "小ロットステッカー 50 枚〜 $0.045 ｜ 防水PVC 2h 校正 ｜ ZprintPro", |
| 117 | `src/data/sku-seo-data.ts:185` | 貼紙/標籤 | `50 枚〜` | `10 枚〜` | high | 貼紙/標籤 距 6 字 | description | "description": "オリジナル小ロットステッカー 50 枚〜 $0.045/枚〜。版代・型代ゼロ、2 時間無料デジタル校正、防水 PVC / BOPP 透明 / コート |
| 118 | `src/data/sku-seo-data.ts:212` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 5 字 | description | "description": "異形模切貼紙/貼紙印刷 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷 |
| 119 | `src/data/sku-seo-data.ts:255` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | description | "description": "燙金貼紙/燙金貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、l |
| 120 | `src/data/sku-seo-data.ts:298` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | description | "description": "防偽貼紙/防偽貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、l |
| 121 | `src/data/sku-seo-data.ts:341` | 貼紙/標籤 | `100 張起` | `10 張起` | high | 貼紙/標籤 距 3 字 | description | "description": "螢光貼紙/螢光貼紙 100 張起。採用 防水 PVC/銅版紙/透明料 高品質材質，支援 圓/方/異形 多種規格，提供 4 色 CMYK 全彩印刷、l |
| 122 | `src/data/sku-seo-data.ts:706` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 14 字 | title | "title": "A4 チラシ ｜ 両面フルカラー 100枚〜 ｜ ZprintPro", |
| 123 | `src/data/sku-seo-data.ts:726` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 11 字 | — | "ja": "A4チラシ / 両面カラー ｜ A4チラシ印刷 両面4色 100枚〜 即日発送 ｜ ZprintPro" |
| 124 | `src/data/sku-seo-data.ts:753` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 14 字 | title | "title": "A5 チラシ ｜ 両面フルカラー 100枚〜 ｜ ZprintPro", |
| 125 | `src/data/sku-seo-data.ts:773` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 11 字 | — | "ja": "A5チラシ / 両面カラー ｜ A5チラシ印刷 両面4色 100枚〜 即日発送 ｜ ZprintPro" |
| 126 | `src/data/sku-seo-data.ts:785` | 傳單 | `100 張起` | `10 張起` | high | 傳單 距 5 字 | description | "description": "雙面傳單印刷/傳單印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK  |
| 127 | `src/data/sku-seo-data.ts:800` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 14 字 | title | "title": "両面カラー印刷 両面チラシ ｜ 両面フルカラー 100枚〜 翌日発送 ｜ ZprintPro", |
| 128 | `src/data/sku-seo-data.ts:802` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 6 字 | h1 | "h1": "両面カラー印刷 両面チラシ ｜ 100枚〜翌日発送", |
| 129 | `src/data/sku-seo-data.ts:816` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 11 字 | — | "ja": "両面チラシ / 両面カラー ｜ 両面チラシ印刷 両面4色 100枚〜 即日発送 ｜ ZprintPro" |
| 130 | `src/data/sku-seo-data.ts:827` | 傳單 | `100張起` | `10張起` | high | 傳單 距 10 字 | title | "title": "摺頁單張 ｜ 雙面四色 100張起 ｜ 智印港", |
| 131 | `src/data/sku-seo-data.ts:865` | 傳單 | `100張起` | `10張起` | high | 傳單 距 10 字 | title | "title": "厚身單張 ｜ 雙面四色 100張起 ｜ 智印港", |
| 132 | `src/data/sku-seo-data.ts:866` | 傳單 | `100 張起` | `10 張起` | high | 傳單 距 5 字 | description | "description": "厚身單張/傳單印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK 全彩 |
| 133 | `src/data/sku-seo-data.ts:880` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 14 字 | title | "title": "厚口チラシ ｜ 両面フルカラー 100枚〜 ｜ ZprintPro", |
| 134 | `src/data/sku-seo-data.ts:896` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 10 字 | — | "ja": "厚口チラシ / 高耐久 ｜ 厚口チラシ印刷 高耐久 100枚〜 即日発送 ｜ ZprintPro" |
| 135 | `src/data/sku-seo-data.ts:939` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 12 字 | — | "ja": "即日チラシ / 両面カラー ｜ 即日チラシ印刷 当日仕上げ 100枚〜 ｜ ZprintPro" |
| 136 | `src/data/sku-seo-data.ts:951` | 傳單 | `100 張起` | `10 張起` | high | 傳單 距 10 字 | description | "description": "環保傳單印刷/環保印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK  |
| 137 | `src/data/sku-seo-data.ts:965` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 14 字 | title | "title": "エコチラシ ｜ 両面フルカラー 100枚〜 ｜ ZprintPro", |
| 138 | `src/data/sku-seo-data.ts:1081` | 海報 | `10 張起` | `1 張起` | high | 海報 距 3 字 | description | "description": "戶外海報/戶外海報 10 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色  |
| 139 | `src/data/sku-seo-data.ts:1097` | 海報 | `100枚〜` | `1枚〜` | high | 海報 距 14 字 | title | "title": "屋外ポスター 防水・ラミネート・100枚〜 ｜ ZprintPro", |
| 140 | `src/data/sku-seo-data.ts:1125` | 海報 | `10 張起` | `1 張起` | high | 海報 距 5 字 | description | "description": "展架海報/海報印刷 10 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色  |
| 141 | `src/data/sku-seo-data.ts:1140` | 海報 | `100枚〜` | `1枚〜` | high | 海報 距 7 字 | title | "title": "ディスプレイポスター印刷 100枚〜・最安 ｜ ZprintPro", |
| 142 | `src/data/sku-seo-data.ts:1179` | 海報 | `100枚〜` | `1枚〜` | high | 海報 距 5 字 | title | "title": "アートポスター 100枚〜・最安値・無料校正 ｜ ZprintPro", |
| 143 | `src/data/sku-seo-data.ts:1207` | 海報 | `10 張起` | `1 張起` | high | 海報 距 5 字 | description | "description": "背膠海報/海報印刷 10 張起。採用 157g-300g 銅版紙/PP 紙/相紙 高品質材質，支援 A1/A2/A3/A4 多種規格，提供 4 色  |
| 144 | `src/data/sku-seo-data.ts:2446` | 書刊/畫冊 | `100枚〜` | `10枚〜` | high | 書刊/畫冊 距 4 字 | title | "title": "中綴じ冊子 ラミネート・中綴じ・100枚〜 ｜ ZprintPro", |
| 145 | `src/data/sku-seo-data.ts:2488` | 書刊/畫冊 | `100枚〜` | `10枚〜` | high | 書刊/畫冊 距 4 字 | title | "title": "無線綴じ冊子 ラミネート・中綴じ・100枚〜 ｜ ZprintPro", |
| 146 | `src/data/sku-seo-data.ts:2816` | 書刊/畫冊 | `100枚〜` | `10枚〜` | high | 書刊/畫冊 距 4 字 | title | "title": "賞状印刷 箔押し・中綴じ・100枚〜・最安値 ｜ ZprintPro", |
| 147 | `src/data/sku-seo-data.ts:2843` | 傳單 | `100張起` | `10張起` | high | 傳單 距 10 字 | title | "title": "學校單張 ｜ 雙面四色 100張起 ｜ 智印港", |
| 148 | `src/data/sku-seo-data.ts:2844` | 傳單 | `100 張起` | `10 張起` | high | 傳單 距 9 字 | description | "description": "學校單張/學校 印刷 100 張起。採用 157g-300g 銅版紙 高品質材質，支援 A4/A5/A6/DL 多種規格，提供 4 色 CMYK 全 |
| 149 | `src/data/sku-seo-data.ts:2858` | 書刊/畫冊 | `100枚〜` | `10枚〜` | high | 書刊/畫冊 距 4 字 | title | "title": "学校チラシ ラミネート・中綴じ・100枚〜 ｜ ZprintPro", |
| 150 | `src/data/sku-seo-data.ts:2874` | 傳單 | `100枚〜` | `10枚〜` | high | 傳單 距 11 字 | — | "ja": "学校チラシ / 學校向け ｜ 学校チラシ印刷 両面4色 100枚〜 學校向け ｜ ZprintPro" |
| 151 | `src/data/sku-seo-data.ts:3095` | 貼紙/標籤 | `500 張起` | `10 張起` | high | 貼紙/標籤 距 5 字 | description | "description": "水果及食品標籤印刷 500 張起, 採用防水 PVC 或 PP 合成紙, 通過 SGS 食品接觸安全認證, 適合水果店、有機食品、烘焙店、外賣包裝。 |
| 152 | `src/data/sku-seo-data.ts:3383` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 6 字 | h1 | "h1": "香港畢業紀念冊 — 50 本起印 騎馬釘 / 膠裝 / 精裝", |
| 153 | `src/data/sku-seo-data.ts:3396` | 書刊/畫冊 | `50 冊から` | `10 冊から` | high | 書刊/畫冊 距 9 字 | description | "description": "卒業記念アルバム・校史特刊・同窓会誌・クラブ特刊印刷、50 冊から対応。中綴じ / 無線綴じ / 上製本の 3 方式、クラス写真・先生メッセージ・学 |
| 154 | `src/data/sku-seo-data.ts:3408` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 4 字 | — | { "q": "畢業紀念冊印刷", "a": "香港畢業紀念冊 50 本起印, 騎馬釘 / 膠裝 / 精裝三種裝訂可選" }, |
| 155 | `src/data/sku-seo-data.ts:3596` | 賀卡 | `100枚〜` | `10枚〜` | high | 賀卡 距 11 字 | title | "title": "部分UVグリーティングカード 100枚〜 マット ｜ ZprintPro", |
| 156 | `src/data/sku-seo-data.ts:3597` | 賀卡 | `100枚〜` | `10枚〜` | mid | 賀卡 距 58 字, 窗內單一品類 | description | "description": "部分UVグリーティングカード印刷：マット下地に光沢UVのコントラスト、300gコート紙または合成紙。127×178mm標準、100枚〜HK$140〜 |
| 157 | `src/data/sku-seo-data.ts:3646` | 賀卡 | `100枚〜` | `10枚〜` | mid | 賀卡 距 59 字, 窗內單一品類 | description | "description": "マットグリーティングカード印刷：なめらかなマット加工、指紋防止仕上げ、300gマット紙またはエコ紙。127×178mm標準、100枚〜HK$110〜 |
| 158 | `src/data/sku-seo-data.ts:3694` | 賀卡 | `100枚〜` | `10枚〜` | high | 賀卡 距 13 字 | title | "title": "角丸グリーティングカード印刷 100枚〜 R3mm ｜ ZprintPro", |
| 159 | `src/data/sku-seo-data.ts:3695` | 賀卡 | `100枚〜` | `10枚〜` | mid | 賀卡 距 56 字, 窗內單一品類 | description | "description": "角丸グリーティングカード印刷：R3mmのやさしい丸角型抜き、300gコート紙またはアート紙。127×178mm標準、100枚〜HK$100〜。誕生日 |
| 160 | `src/lib/seo.ts:608` | 書刊/畫冊 | `50部〜` | `10部〜` | high | 書刊/畫冊 距 5 字 | — | 'ja': '冊子印刷｜50部〜・中綴じ・無線綴じ・上製本｜ZprintPro', |
| 161 | `src/lib/seo.ts:644` | 賀卡 | `100枚から` | `10枚から` | high | 賀卡 距 15 字 | — | ja: 'グリーティングカード印刷 · 100枚から · 立体 3D 対応 ｜ ZprintPro', |
| 162 | `src/lib/seo.ts:654` | 賀卡 | `100枚から` | `10枚から` | high | 賀卡 距 13 字 | — | ja: 'グリーティングカード印刷 100枚から. 节日・誕生日・サンキュ・招待状・法人向け・立体 3D カード + 箔押し・UV・拔型加工. DHL 国際配送 2-4 日 + F |
| 163 | `src/app/[locale]/blog/[slug]/page.tsx:392` | 書刊/畫冊 | `50 本起印` | `10 本起印` | high | 書刊/畫冊 距 18 字 | description | description: '畫冊印刷點揀？攝影集、展覽圖錄、產品型錄 4 大類型規格表，銅版紙/啞粉紙/特種紙紙材對比，硬皮精裝/膠裝/騎馬釘裝訂攻略，附 4 條 FAQ，50 本 |
| 164 | `src/app/[locale]/category/[slug]/page.tsx:175` | 貼紙/標籤 | `50 MOQ` | `10 MOQ` | mid | 貼紙/標籤 距 33 字, 窗內單一品類 | — | 'en': 'Small Batch Sticker Printing Free Shipping · 50 MOQ Die-Cut Vinyl Waterproof · Made |
| 165 | `src/app/[locale]/category/[slug]/page.tsx:190` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 書刊/畫冊 距 14 字 | — | 'en': 'Custom Book Printing Free Shipping · 50 MOQ Saddle Hardcover Perfect Bound · USA Au |
| 166 | `src/app/[locale]/category/[slug]/page.tsx:206` | 書刊/畫冊 | `1000 MOQ` | `10 MOQ` | high | 書刊/畫冊 距 24 字 | — | 'en': 'Custom Calendars 2027 late-September window · 1000 MOQ 2027 Desk Wall Hardcover Foi |
| 167 | `src/app/[locale]/services/catalog-printing-china/page.tsx:23` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 書刊/畫冊 距 19 字 | title | title: 'China Catalog Printing ｜ 50 MOQ + Shenzhen Factory + DHL 2-4 Days ｜ 智印港 ZprintPro' |
| 168 | `src/app/[locale]/services/catalog-printing-china/page.tsx:24` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | mid | 書刊/畫冊 距 40 字, 窗內單一品類 | — | desc: 'China catalog printing from Shenzhen factory, 50 MOQ, free file check, 2h quote, DH |
| 169 | `src/app/[locale]/services/catalog-printing-china/page.tsx:28` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 書刊/畫冊 距 19 字 | title | title: 'China Catalog Printing ｜ 50 MOQ + Shenzhen Factory + DHL 2-4 Days ｜ ZprintPro', |
| 170 | `src/app/[locale]/services/catalog-printing-china/page.tsx:29` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | mid | 書刊/畫冊 距 40 字, 窗內單一品類 | — | desc: 'China catalog printing from Shenzhen factory, 50 MOQ, free file check, 2h quote, DH |
| 171 | `src/app/[locale]/services/catalog-printing-china/page.tsx:114` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | mid | 書刊/畫冊 距 44 字, 窗內單一品類 | — | heroTitle: 'China Catalog Printing — Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days', |
| 172 | `src/app/[locale]/services/catalog-printing-china/page.tsx:115` | 書刊/畫冊 | `50 本起印` | `10 本起印` | mid | 書刊/畫冊 距 45 字, 窗內單一品類 | — | heroSubtitle: '從深圳工廠直送全球嘅 catalog / brochure / magazine / lookbook 印刷, 50 本起印, 30 秒 AI 即時報 |
| 173 | `src/app/[locale]/services/catalog-printing-china/page.tsx:195` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | mid | 書刊/畫冊 距 44 字, 窗內單一品類 | — | heroTitle: 'China Catalog Printing — Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days', |
| 174 | `src/app/[locale]/services/catalog-printing-china/page.tsx:659` | 書刊/畫冊 | `50 MOQ` | `10 MOQ` | high | 書刊/畫冊 距 12 字 | — | <p className="text-sm text-blue-700">{locale === 'en' ? 'Saddle stitch / perfect bound / w |
| 175 | `src/app/[locale]/services/catalog-printing-china/page.tsx:659` | 書刊/畫冊 | `50部から` | `10部から` | high | 書刊/畫冊 距 6 字 | — | <p className="text-sm text-blue-700">{locale === 'en' ? 'Saddle stitch / perfect bound / w |
| 176 | `src/app/[locale]/services/catalog-printing-china/page.tsx:667` | 傳單 | `100 MOQ` | `10 MOQ` | high | 傳單 距 11 字 | — | <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets —  |
| 177 | `src/app/[locale]/services/catalog-printing-china/page.tsx:667` | 傳單 | `100枚から` | `10枚から` | high | 傳單 距 11 字 | — | <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets —  |
| 178 | `src/app/[locale]/services/catalog-printing-china/page.tsx:667` | 傳單 | `100 張起` | `10 張起` | high | 傳單 距 10 字 | — | <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets —  |
| 179 | `src/app/[locale]/services/rush-printing-delivery/page.tsx:45` | 海報 | `10 moq` | `1 moq` | high | 海報 距 7 字 | keywords | keywords: 'same-day printing,rush printing,6pm cut-off,overnight print,next-day delivery,C |

## 清單② price_tier — 改格式不改數字

> 格式: 「100 張起印，HK$0.22/張」→「100 張檔位：HK$0.22/張」。**數字必須完全不變**。

| # | 檔案:行 | 品類 | 命中 | 上下文 |
|---|---|---|---|---|
| 1 | `src/data/blog-posts.ts:375` | 未歸類 | `1000 MOQ` | en: 'Complete guide to custom stickers, packaging boxes, and labels for US small business. |
| 2 | `src/data/blog-posts.ts:449` | 未歸類 | `5000 MOQ` | en: 'Custom flyer printing guide for US small business. Standard sizes (4x6 / 5x7 / 8.5x11 |
| 3 | `src/data/blog-posts.ts:503` | 書刊/畫冊 | `50冊から` | ja: '中綴じ冊子印刷 50冊から, 8-64ページ, ¥258-1030/個 (500冊). 30秒 AI 即時見積もり, DHL グローバル 2-4日. ページ数ルール・自表 |
| 4 | `src/data/blog-posts.ts:520` | 未歸類 | `1000 MOQ` | en: 'Custom poster printing guide for US event organizers and retail. Standard sizes (A3/A |
| 5 | `src/data/blog-posts.ts:901` | 橫額/噴繪 | `100 MOQ` | en: 'US small business owners, Etsy / Shopify brands, Comic-Con / Anime Expo exhibitors —  |
| 6 | `src/data/blog-posts.ts:902` | 橫額/噴繪 | `100 MOQ` | ja: '米国中小企業・Etsy/Shopify ブランド・Comic-Con / Anime Expo 出展者向け。高品質ロールアップバナー / バックドロップがブース動員とブラ |
| 7 | `src/data/blog-posts.ts:955` | 未歸類 | `100 MOQ` | en: 'US hotels, B&Bs, Airbnb hosts, resorts, spa properties: Free Shipping $99+ Continenta |
| 8 | `src/data/blog-posts.ts:1106` | 傳單 | `100 張起印` | 'zh-hk': '香港餐廳旺季前必睇。200g-400g 全規格厚紙傳單,5,000 張 250g 銅版紙 A4 雙面四色 + 雙面過膠 HK$0.65/張 起。100 張起印, |
| 9 | `src/data/blog-posts.ts:1214` | 未歸類 | `100 MOQ` | en: 'US infant formula, baby food pouch, organic snack, and toddler meal brand owners: FDA |
| 10 | `src/data/blog-posts.ts:1231` | 傳單 | `100 MOQ` | en: 'US real estate agents, brokerages, property managers, open house hosts: A4 bi-fold +  |
| 11 | `src/data/blog-posts.ts:1265` | 未歸類 | `100 MOQ` | en: 'US auto dealers, used car lots, auto detailers, tire centers, and repair shops: reinf |
| 12 | `src/data/blog-posts.ts:1319` | 未歸類 | `100 MOQ` | en: 'US retail boutique, skincare, IP merchandise, and gift brand owners — gang-run white  |
| 13 | `src/data/blog-posts.ts:1338` | 包裝盒 | `500 MOQ` | en: 'US DTC brand owners and Amazon FBA sellers — gang-run white card boxes with 500 MOQ s |
| 14 | `src/data/blog-posts.ts:1375` | 未歸類 | `100 MOQ` | en: 'US banks, credit card issuers, brokerages, mutual funds, and insurance company client |
| 15 | `src/data/blog-posts.ts:1393` | 未歸類 | `100 MOQ` | en: 'US new development sales galleries, model homes, real estate agency branches — 5 stan |
| 16 | `src/data/blog-posts.ts:1413` | 傳單 | `100 MOQ` | en: 'US restaurant launch / event late-call / real estate quick sale peak season. Same-day |
| 17 | `src/data/blog-posts.ts:1413` | 未歸類 | `100 MOQ` | en: 'US restaurant launch / event late-call / real estate quick sale peak season. Same-day |
| 18 | `src/data/blog-posts.ts:1454` | 包裝盒 | `100 個起印` | 'zh-hk': '包裝盒印刷 100 個起印，2026 年真實單價：坑盒 500 個 HK$8-15/個，彩盒 1000 個 HK$12-20/個，禮盒 5000 個 HK$25 |
| 19 | `src/data/blog-posts.ts:1455` | 包裝盒 | `100 MOQ` | en: 'Packaging box printing 100 MOQ, 2026 real prices: corrugated 500 pcs $1-2/pc, color b |
| 20 | `src/data/blog-posts.ts:1606` | 信封 | `100 MOQ` | en: 'Large Envelopes C4/C5 100 MOQ from HK$0.5 ｜ Same-Day Rush ｜', |
| 21 | `src/data/blog-posts.ts:1610` | 信封 | `100 個起印` | 'zh-hk': '大信封 (C4/C5) 印刷 100 個起印 HK$0.5/個起。C4 500 個 HK$0.8-1.5/個, C5 500 個 HK$0.5-0.7/個, D |
| 22 | `src/data/blog-posts.ts:1634` | 未歸類 | `100 張起印` | 'zh-hk': '防水貼紙材質點揀? 4 大材質對比 (PVC 防水 3 年耐候 / 透明防水 90% 透光 / 可移不殘膠 / 燙金工藝) + 100 張起印 HK$0.35/ |
| 23 | `src/data/blog-posts.ts:1635` | 未歸類 | `100 MOQ` | en: 'Which waterproof sticker material? 4 stocks compared (PVC 3-yr outdoor / clear 90% tr |
| 24 | `src/data/blog-posts.ts:1658` | 傳單 | `100 個起印` | 'zh-hk': '急件 1,200+ 客戶最常問 3 條: 即日印刷邊度最快? 幾錢? 幾點截單? 智印港 30 秒 AI 報價 6 步流程, 中午前確認下午起貨, 18:00  |
| 25 | `src/data/blog-posts.ts:1659` | 傳單 | `100 MOQ` | en: 'Rush order FAQ answered: fastest delivery, exact price, cutoff time. ZprintPro 30-sec |
| 26 | `src/data/blog-posts.ts:1660` | 傳單 | `100枚から` | ja: '急ぎオーダーFAQ: 最速納期、正確な単価、明確な締切。ZprintPro 30秒AI見積もり6ステップ、正午までに確認午後に出荷、18:00締切翌日12時SF Expr |
| 27 | `src/data/blog-posts.ts:1682` | 包裝盒 | `100 個起印` | 'zh-hk': '燙金點揀? 3 大應用 (貼紙 / 喜帖 Q4 旺季 / 禮盒卡片 R5 聖誕新年) + 4 種箔 (金/銀/玫瑰金/鐳射) + 5 種材質相容性 + 100  |
| 28 | `src/data/blog-posts.ts:1683` | 未歸類 | `100 MOQ` | en: 'Which foil finish? 3 applications (foil stickers / wedding Q4 peak / gift box cards R |
| 29 | `src/data/blog-posts.ts:1729` | 未歸類 | `100 個起印` | 'zh-hk': '8 大盒型 (牛皮紙盒 / 坑盒 / 彩盒 / 禮盒 / 飛機盒 / 書型盒 / 抽屜盒 / 天地盒) 5 維度 (結構 / 厚度 / 耐用度 / 單價 / 適 |
| 30 | `src/data/blog-posts.ts:1730` | 未歸類 | `100 MOQ` | en: '8 box types 5-dimension comparison (structure / thickness / durability / unit price / |
| 31 | `src/data/blog-posts.ts:1811` | 教科書/練習 | `100冊から` | ja: '教科書・教材の印刷製本 100冊から HK$5-50/冊. 中綴じ・無線綴じ・上製本 3 製本方式, 80-100g 道林紙, 5-7 営業日納品, DHL 2-4日,  |
| 32 | `src/data/blog-posts.ts:1828` | 教科書/練習 | `100 本起印` | 'zh-hk': '練習簿印刷完全指南 2026: 4 種紙材 3 種裝訂 100 本起印 HK$3.5/本起 B2B 開學季 ｜ 智印港', |
| 33 | `src/data/blog-posts.ts:1829` | 未歸類 | `100 MOQ` | en: 'School Exercise Book Printing Guide 2026: 4 Paper Stocks 3 Bindings 100 MOQ from HK$3 |
| 34 | `src/data/blog-posts.ts:1862` | 貼紙/標籤 | `100 MOQ` | en: 'Custom apparel hang tags / woven labels / care labels 100 MOQ, 8 materials (coated /  |
| 35 | `src/data/blog-posts.ts:1863` | 未歸類 | `100 枚から` | ja: 'アパレル Hang tag / 織ネーム / 洗濯ネーム 100 枚から対応, 8 大素材（コート紙 / クラフト紙 / PVC / 織ネーム / サテン / 綿 / シ |
| 36 | `src/data/blog-posts.ts:1946` | 未歸類 | `100 MOQ` | en: 'Zine Printing Guide: 8-64pp, 100 MOQ, HK$6/pc ｜ ZprintPro', |
| 37 | `src/data/blog-posts.ts:1950` | 書刊/畫冊 | `100 本起印` | 'zh-hk': '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 每本約 HK$6-32, 5,000 本批量低至 HK$1.20/本. 內頁 80-100g 書紙 |
| 38 | `src/data/blog-posts.ts:1952` | 書刊/畫冊 | `100 部から` | ja: 'ジン（Zine）印刷は 100 部から、中綴じ 8〜64 ページ、1 部あたり約 HK$6〜32、5,000 部で HK$1.20。本文は 80〜100g 上質紙または  |
| 39 | `src/data/blog-posts.ts:1980` | 書刊/畫冊 | `100 本起印` | 'zh-hk': '童書繪本印刷 100 本起印。精裝硬皮 2.5mm 灰紙板封面、32 頁標準開本、單價 HK$40-240/本、100 本 85 折 500 本 7 折。A5/ |
| 40 | `src/data/blog-posts.ts:1982` | 書刊/畫冊 | `100 部から` | ja: '絵本印刷は 100 部から。2.5mm 厚紙ボード表紙のハードカバー、32 ページ標準判、1 部 HK$40〜240、100 部 85 折・500 部 7 折、A5/A4 |
| 41 | `src/data/buying-guides.ts:56` | 未歸類 | `100 張起印` | <ol class="list-decimal pl-5 my-3 space-y-1"><li><strong>定場景與檔期</strong>：節日檔（聖誕／新年／農曆年）建議提 |
| 42 | `src/data/buying-guides.ts:113` | 未歸類 | `50 個起印` | <div class="bg-amber-50 rounded-lg p-4 my-4"><p>貼紙印刷按材質、尺寸同數量報價：銅版紙 HK$0.5-1.5/張起，防水合成紙 HK |
| 43 | `src/data/buying-guides.ts:114` | 貼紙/標籤 | `50 個起印` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【貼紙印刷 50 個起印，防水啞光 HK$0.45/張起；銅版紙低至 HK$0.5-1 |
| 44 | `src/data/buying-guides.ts:140` | 貼紙/標籤 | `50 個起印` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：貼紙印刷幾錢？</strong><br/>A： |
| 45 | `src/data/buying-guides.ts:140` | 貼紙/標籤 | `100 張起` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：貼紙印刷幾錢？</strong><br/>A： |
| 46 | `src/data/buying-guides.ts:140` | 貼紙/標籤 | `500 張起` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：貼紙印刷幾錢？</strong><br/>A： |
| 47 | `src/data/buying-guides.ts:146` | 貼紙/標籤 | `50 pcs MOQ` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【Custom sticker printing starts at 50 pcs M |
| 48 | `src/data/buying-guides.ts:178` | 貼紙/標籤 | `50枚から` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【ステッカー印刷は50枚から注文可、防水マット HK$0.45/枚〜、アート紙 HK$ |
| 49 | `src/data/buying-guides.ts:204` | 貼紙/標籤 | `50枚から` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：ステッカー印刷はいくら？</strong><b |
| 50 | `src/data/buying-guides.ts:204` | 貼紙/標籤 | `100枚から` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：ステッカー印刷はいくら？</strong><b |
| 51 | `src/data/buying-guides.ts:204` | 貼紙/標籤 | `500枚から` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：ステッカー印刷はいくら？</strong><b |
| 52 | `src/data/buying-guides.ts:233` | 傳單 | `100 張起印` | <div class="bg-amber-50 rounded-lg p-4 my-4"><p><strong>快速答案：宣傳單張印刷幾錢？</strong><br/>A5 單面  |
| 53 | `src/data/buying-guides.ts:237` | 傳單 | `100 張起印` | <p>傳單價格由尺寸、紙質、單雙面同數量決定。以下係以 128g 銅版紙單面、100 張起印計嘅單價參考（per 智印港 A4/A5 傳單產品頁 2026-09 價格口徑）：</p |
| 54 | `src/data/buying-guides.ts:240` | 傳單 | `100 張起印` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p><strong>【傳單唔一定要貴——A5 單面 128g 銅版紙 100 張起印、HK |
| 55 | `src/data/buying-guides.ts:265` | 傳單 | `100 張起印` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：傳單印刷幾錢一張？</strong><br/> |
| 56 | `src/data/buying-guides.ts:265` | 傳單 | `100 張起` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：傳單印刷幾錢一張？</strong><br/> |
| 57 | `src/data/buying-guides.ts:307` | 傳單 | `100 枚から` | <div class="bg-amber-50 rounded-lg p-4 my-4"><p><strong>クイック答え：チラシ印刷はいくら？</strong><br/>A5  |
| 58 | `src/data/buying-guides.ts:311` | 傳單 | `100 枚から` | <p>チラシ価格はサイズ・用紙・片面両面・数量で決まります。下表は 128g コート紙・片面・100 枚からの単価目安（ZprintPro A4/A5 チラシ製品ページ 2026- |
| 59 | `src/data/buying-guides.ts:314` | 傳單 | `100 枚から` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p><strong>【チラシは高くない——A5 片面 128g コート紙 100 枚から  |
| 60 | `src/data/buying-guides.ts:339` | 傳單 | `100 枚から` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：チラシ印刷はいくら？</strong><br/ |
| 61 | `src/data/buying-guides.ts:339` | 未歸類 | `100 枚から` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：チラシ印刷はいくら？</strong><br/ |
| 62 | `src/data/buying-guides.ts:368` | 包裝盒 | `100 個起印` | 'zh-hk': `<p class="text-base text-[#1A56DB] font-medium mb-4"><strong>重點摘要：</strong>包裝盒訂製 |
| 63 | `src/data/buying-guides.ts:370` | 包裝盒 | `100 個起印` | <div class="bg-amber-50 rounded-lg p-4 my-4"><p><strong>價格：</strong>精裝盒（灰板裱紙）HK$8-42/個、摺盒  |
| 64 | `src/data/buying-guides.ts:374` | 未歸類 | `100 個起印` | <p class="text-base text-[#444444] leading-relaxed mb-4">包裝盒價格由盒型、材質、尺寸、數量同工藝決定。以下係智印港 202 |
| 65 | `src/data/buying-guides.ts:383` | 包裝盒 | `100 個起印` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【包裝盒訂製 100 個起印、3-7 天交貨，精裝盒 HK$8-42/個、白卡盒 HK |
| 66 | `src/data/buying-guides.ts:745` | 書刊/畫冊 | `50 本起印` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【書刊印刷 50 本起印：騎馬釘 8-64 頁、膠裝 64 頁以上；500 本騎馬釘  |
| 67 | `src/data/buying-guides.ts:815` | 書刊/畫冊 | `50 冊から` | <div class="bg-blue-50 rounded-lg p-4 my-4"><p>【書籍印刷は 50 冊から：中綴じ 8-64 ページ、無線綴じ 64 ページ以上；50 |
| 68 | `src/data/buying-guides.ts:930` | 貼紙/標籤 | `MOQ 100` | en: '<p>Candle and soap labels need <strong>FDA food-safe materials</strong>, <strong>wate |
| 69 | `src/data/buying-guides.ts:931` | 未歸類 | `100 枚から` | ja: '<p>キャンドルと石鹸ラベルには、<strong>FDA 食品グレード素材</strong>、<strong>防水ラミネート</strong>、<strong>小ロット  |
| 70 | `src/data/category-conversion-blocks.ts:474` | 貼紙/標籤 | `MOQ100` | { "q": "ステッカー印刷 1000枚の値段は？", "a": "50×50mm 光沢パウダーステッカー 1000枚 約HK$200-350。MOQ100枚〜、2〜3日で出荷、 |
| 71 | `src/data/category-conversion-blocks.ts:499` | 包裝盒 | `100個起印` | "metaDescription": "香港包裝盒訂製專家，100個起印低至HK$0.03/個，拼版免刀模費，FDA食品級+FSC認證可選。30秒AI即時報價，立即WhatsApp |
| 72 | `src/data/category-conversion-blocks.ts:1408` | 未歸類 | `100 張起` | "100 張起（HK$3/張 價）" |
| 73 | `src/data/category-conversion-blocks.ts:1492` | 海報 | `1 張起印` | "metaDescription": "香港海報印刷｜印海報 1 張起印，A2 128g銅版紙 HK$6-9/張、A1 HK$10-16/張，500 張減 30%，1,000 張以 |
| 74 | `src/data/category-conversion-blocks.ts:1538` | 未歸類 | `1 張起印` | "1 張起印，100 張起批量價" |
| 75 | `src/data/category-conversion-blocks.ts:1538` | 未歸類 | `100 張起` | "1 張起印，100 張起批量價" |
| 76 | `src/data/category-conversion-blocks.ts:1544` | 未歸類 | `1 張起印` | "1 張起印，10 張起批量優惠" |
| 77 | `src/data/category-conversion-blocks.ts:1544` | 未歸類 | `10 張起` | "1 張起印，10 張起批量優惠" |
| 78 | `src/data/category-conversion-blocks.ts:1770` | 海報 | `1枚から` | "metaDescription": "1枚から製作可能なポスター印刷。アートペーパー128g A2は125円/枚〜、A1は215円/枚〜、A0は415円/枚〜。中国深セン工場直送 |
| 79 | `src/data/category-conversion-blocks.ts:1883` | 未歸類 | `1枚から` | { "q": "ポスター印刷の1枚単価はいくらですか？", "a": "アートペーパー128g A2は125円/枚〜、A1は215円/枚〜、A0は415円/枚〜（100枚オフセット |
| 80 | `src/data/category-conversion-blocks.ts:1888` | 未歸類 | `1枚から` | "a": "大口オフセット1枚から対応、サイズと素材別価格：アートペーパー128g A2 125円/枚〜、A1 215円/枚〜、A0 415円/枚〜。1,000枚以上のオフセットな |
| … | | | | 其餘 529 條見 .json |

## 清單③ 共享模板句 (需逐實例判斷語境)

共享模板句共 282 條, 分佈於 4 個檔案。

| # | 檔案:行 | 命中 | 上下文 |
|---|---|---|---|
| 1 | `src/data/buying-guides.ts:58` | `100 張起印` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：賀卡最少可以印幾多張？</strong><br/>A：1 |
| 2 | `src/data/buying-guides.ts:873` | `100 張起` | <div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3"><p><strong>Q：餐牌最少可以印幾多張？</strong><br/>A：1 |
| 3 | `src/data/buying-guides.ts:929` | `MOQ 100` | 'zh-hk': '<p>蠟燭同手工皂標籤對 <strong>FDA 食品級材料</strong>、<strong>防水面層</strong>同 <strong>細批次 MOQ (100-5 |
| 4 | `src/data/buying-guides.ts:929` | `100 張起印` | 'zh-hk': '<p>蠟燭同手工皂標籤對 <strong>FDA 食品級材料</strong>、<strong>防水面層</strong>同 <strong>細批次 MOQ (100-5 |
| 5 | `src/data/buying-guides.ts:929` | `100 張起` | 'zh-hk': '<p>蠟燭同手工皂標籤對 <strong>FDA 食品級材料</strong>、<strong>防水面層</strong>同 <strong>細批次 MOQ (100-5 |
| 6 | `src/data/pillar-content.ts:58` | `100 張起` | 'zh-hk': '<p class="lead"><strong>香港貼紙印刷最低 100 張起訂，防水貼紙 HK$0.22/張起，支援九龍/港島/新界即日取貨，燙金與透明材質 3-5 個 |
| 7 | `src/data/products-content.ts:80` | `50 張起` | <details class="my-2"><summary><strong>小批量貼紙的最低起印量（MOQ）是多少？</strong></summary><p>防水 Vinyl／透明 PV |
| 8 | `src/data/products-content.ts:80` | `100 張起` | <details class="my-2"><summary><strong>小批量貼紙的最低起印量（MOQ）是多少？</strong></summary><p>防水 Vinyl／透明 PV |
| 9 | `src/data/products-content.ts:319` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 10 | `src/data/products-content.ts:319` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 11 | `src/data/products-content.ts:436` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 12 | `src/data/products-content.ts:436` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 13 | `src/data/products-content.ts:673` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 14 | `src/data/products-content.ts:673` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 15 | `src/data/products-content.ts:907` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 16 | `src/data/products-content.ts:907` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 17 | `src/data/products-content.ts:1139` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 18 | `src/data/products-content.ts:1139` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 19 | `src/data/products-content.ts:1592` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 20 | `src/data/products-content.ts:1592` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 21 | `src/data/products-content.ts:1709` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 22 | `src/data/products-content.ts:1709` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 23 | `src/data/products-content.ts:1944` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 24 | `src/data/products-content.ts:1944` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 25 | `src/data/products-content.ts:2228` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 26 | `src/data/products-content.ts:2228` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 27 | `src/data/products-content.ts:2474` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 28 | `src/data/products-content.ts:2474` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 29 | `src/data/products-content.ts:2713` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 30 | `src/data/products-content.ts:2713` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 31 | `src/data/products-content.ts:2950` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 32 | `src/data/products-content.ts:2950` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 33 | `src/data/products-content.ts:3197` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 34 | `src/data/products-content.ts:3197` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 35 | `src/data/products-content.ts:3414` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 36 | `src/data/products-content.ts:3414` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 37 | `src/data/products-content.ts:3522` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 38 | `src/data/products-content.ts:3522` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 39 | `src/data/products-content.ts:3787` | `10 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| 40 | `src/data/products-content.ts:3787` | `100 張起` | <details class="my-2"><summary><strong>智印港 的最低起印量是多少？</strong></summary><p>智印港支援小批量印刷，貼紙 10 張起、 |
| … | | | 其餘 242 條見 .json |