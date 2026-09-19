# 标题生成输入银行 (2026-09-19)

校准日期: 2026-09-19 12:06 UTC

> 三源合并: `products.ts` (数字真值) + GSC 28d (同簇候选词) + census (现状)
> **违规 SKU 74 个 / 槽位 115 条**

## 数据完备度

| 维度 | 有数据 | 说明 |
|---|---|---|
| MOQ 真值 | 69/74 | products.ts minQuantity |
| 价格区间 | 69/74 | products.ts price_range |
| specs (材质/尺寸/工艺) | 68/74 | 标题工艺修饰来源 |
| GSC 同簇候选词 | 69/74 | 长尾词 3 筛选素材 |

## ★ MOQ 一致性自检: 19 条不一致 (a2「1張起印」同类)

| slug | locale | 标题声称 | products.ts 真值 | 批次 | 当前 title |
|---|---|---|---|---|---|
| small-batch-stickers | zh-hk | 50 | 10 | P2-修剪 | 小批量貼紙 50 張起 HK$0.45 | 防水 PVC 異形切割 2h 打稿 | 智印港 |
| small-batch-stickers | en | 50 | 10 | P2-修剪 | Small Batch Stickers 50 pcs from $0.045 | Free 2h Proof | Zp |
| small-batch-stickers | ja | 50 | 10 | P2-修剪 | 小ロットステッカー 50 枚〜 $0.045 | 防水PVC 2h 校正 | ZprintPro |
| a4-flyers | ja | 100 | 10 | P3-低优先 | A4 チラシ | 両面フルカラー 100枚〜 | ZprintPro |
| a5-flyers | ja | 100 | 10 | P3-低优先 | A5 チラシ | 両面フルカラー 100枚〜 | ZprintPro |
| double-sided-flyers | ja | 100 | 10 | P2-修剪 | 両面カラー印刷 両面チラシ | 両面フルカラー 100枚〜 翌日発送 | ZprintPro |
| folded-leaflets | zh-hk | 100 | 10 | P1 | 摺頁單張 | 雙面四色 100張起 | 智印港 |
| thick-paper-flyers | zh-hk | 100 | 10 | P3-低优先 | 厚身單張 | 雙面四色 100張起 | 智印港 |
| thick-paper-flyers | ja | 100 | 10 | P3-低优先 | 厚口チラシ | 両面フルカラー 100枚〜 | ZprintPro |
| eco-flyers | ja | 100 | 10 | P3-低优先 | エコチラシ | 両面フルカラー 100枚〜 | ZprintPro |
| pvc-menus | zh-hk | 50 | 100 | P2-修剪 | PVC 餐牌印刷 · 防水防油覆膜 50本起 | 餐廳/咖啡店/酒吧菜單 | 智印港 |
| laminated-menus | zh-hk | 50 | 100 | P0-A | 過膠餐牌 | 防水 覆膜 50本起 | 智印港 |
| hardcover-menus | zh-hk | 50 | 100 | P3-低优先 | 精裝餐牌 | 防水 覆膜 50本起 | 智印港 |
| drink-menus | zh-hk | 50 | 100 | P3-低优先 | 餐廳酒水牌 | 防水 覆膜 50本起 | 智印港 |
| spiral-notebooks | zh-hk | 50 | 10 | P3-低优先 | 線圈筆記本 | 膠裝/騎馬釘 50本起 | 智印港 |
| exercise-books | zh-hk | 50 | 10 | P0-B | 作業簿印刷 | 膠裝/騎馬釘 50本起 | 智印港 |
| exercise-books | ja | 50 | 10 | P3-低优先 | 練習帳 | 中綴じ/無線綴じ 50冊〜 | ZprintPro |
| school-flyers | zh-hk | 100 | 10 | P3-低优先 | 學校單張 | 雙面四色 100張起 | 智印港 |
| textbooks | ja | 50 | 100 | P3-低优先 | 教科書 | 中綴じ/無線綴じ 50冊〜 | ZprintPro |

## 逐 SKU 输入 (按违规槽位展示数降序)

### small-batch-stickers  ·  stickers  ·  MOQ 10  ·  HK$38-120/A4
- specs: material=銅版紙／PP 合成紙／透明 PVC／Kraft 牛皮紙 / size=A4 起印；單張尺寸最小 10×10mm，最大 300×400mm / printMethod=四色數碼印刷（HP Indigo） / finishing=模切、圓角、局部燙金、覆膜
- features: 【A4 起印】無最低數量壓力，適合試產與限量活動 / 【多材質】銅版紙／PP／PVC／Kraft，匹配品牌調性 / 【Delta E ≤3】ICC 色彩管理，品牌色穩定還原
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | TRIM | 63 | 18 | 6.61 | P2-修剪 | 小批量貼紙 50 張起 HK$0.45 | 防水 PVC 異形切割 2h 打稿 | 智印港 |
| en | TRIM | 67 | 396 | 17.81 | P2-修剪 | Small Batch Stickers 50 pcs from $0.045 | Free 2h Proof |  |
| ja | TRIM | 63 | 26 | 22.88 | P2-修剪 | 小ロットステッカー 50 枚〜 $0.045 | 防水PVC 2h 校正 | ZprintPro |

### doujinshi-printing  ·  japan-doujin  ·  MOQ -  ·  -

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 45 | 68 | 8.74 | P0-B | 同人誌印刷 10本起印 | Comiket前24小時特急対応 |
| en | TRIM | 59 | 359 | 11.72 | P2-修剪 | Doujinshi Printing Comiket | Free Shipping $99+ | ZprintPr |

### catalog-printing  ·  books  ·  MOQ 10  ·  HK$2.8-1000/本
- specs: material=內頁157g–200g銅版紙；封面200g–250g銅版紙 / size=A4（210×297mm）或A5（148×210mm） / printMethod=四色柯式印刷 / finishing=覆膜（啞膜／光膜）、燙金、騎馬釘或膠裝
- features: 【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰 / 【四色柯式印刷】色彩飽和，適合照片與插畫 / 【多種裝訂】騎馬釘、膠裝、線裝或硬皮
- GSC 同簇候选词: china catalog printing(110imp/pos16.7) · 騎馬釘印刷(60imp/pos17.5) · 小冊子印刷(48imp/pos10.0) · school exercise book printing(43imp/pos18.3)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 98 | 14.5 | P0-A | 畫冊印刷 | 專業印刷 品質保證 | 智印港 |
| en | TRIM | 61 | 307 | 29.71 | P2-修剪 | Catalog Printing | Saddle-Stitched | Free US Ship | Zprint |

### waterproof-stickers  ·  stickers  ·  MOQ 10  ·  HK$0.22-1.0/張
- specs: material=PVC 防水／PP 合成紙；可覆啞膜或光膜 / size=最小約 10×10mm，最大約 300×400mm（依稿而定） / printMethod=四色數碼或柯式（依數量） / finishing=模切、覆膜（啞膜／光膜）、局部可選工藝
- features: 面材：PVC 防水或 PP 合成紙，戶外短期耐候 / 可選啞膜／光膜覆膜，提升耐磨與抗污 / 支援異形模切與可變資料（序號／條碼／QR）
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 304 | 9.44 | P0-A | 防水貼紙 | 防水 PVC 異形切割 | 智印港 |
| en | TRIM | 59 | 80 | 40.46 | P2-修剪 | Custom Waterproof Stickers | Free Shipping $99+ | ZprintPr |
| ja | FILL | 48 | 138 | 15.18 | P0-B | 防水ステッカー | 防水 PVC ダイカット | ZprintPro |

### electronics-packaging-box  ·  packaging  ·  MOQ 200  ·  HK$8-50/個
- specs: material=1200g 灰板紙裱糊銅版紙；EVA／PET 吸塑／紙漿內托 / size=完全訂製，常見 10×10×4cm 至 20×15×6cm / printMethod=四色柯式印刷 / finishing=燙金／燙銀、局部 UV、軟觸膜、磁吸扣
- features: 【1200g 灰板】高挺度外盒，抗壓耐摔 / 【EVA／吸塑／紙漿內托】三種內襯，精準固定 3C 產品 / 【防靜電選項】符合電子產品防護標準，避免靜電損傷
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 46 | 253 | 49.51 | P1 | 電子產品包裝盒印刷 | 3C 數碼 EVA 內襯 | 智印港 |

### custom-calendars  ·  calendars  ·  MOQ 1000  ·  HK$3-8/本
- specs: material=250g–300g藝術紙或銅版紙 / size=A3、A4或完全客製 / printMethod=四色柯式或數碼印刷 / finishing=燙金、局部UV、金屬圈或騎馬釘
- features: 【300g銅版紙或啞粉紙】挺度佳，色彩還原準確 / 【四色柯式或數碼】適合照片與插畫印刷 / 【金屬圈或騎馬釘】翻頁順暢，牢固耐用
- GSC 同簇候选词: 月曆印刷(126imp/pos20.3) · 月曆訂製(65imp/pos25.1) · 月歷印刷(64imp/pos17.7) · 訂製月曆(8imp/pos24.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 215 | 22.25 | P1 | 定制年曆 | 企業禮品 多款式 | 智印港 |
| en | FILL | 49 | 7 | 55.29 | P3-低优先 | Custom Calendars | Free Shipping $99+ | ZprintPro |

### handle-bags  ·  paper-bags  ·  MOQ 100  ·  HK$3-8/個
- specs: material=牛皮／白卡；手挽棉繩或扁紙 / size=中／大袋為主；可客製 / printMethod=四色印刷為主 / finishing=穿孔打釘、底卡加固、可覆膜
- features: 手挽加固，承重更佳 / 適合量販與雙件服飾購物 / 可配底卡與側邊結實糊工
- GSC 同簇候选词: 紙袋印刷(70imp/pos13.8) · 訂做紙袋(67imp/pos18.6) · 紙袋訂製(61imp/pos24.6) · 印刷紙袋(58imp/pos15.5)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 199 | 15.91 | P0-A | 環保手挽袋 | 100%環保 多尺寸 | 智印港 |

### large-bags  ·  paper-bags  ·  MOQ 100  ·  HK$6-15/個
- specs: material=250g 白卡紙／300g 牛皮紙／280g 特種紋理紙 / size=展開約 320×120×380mm（可客製） / printMethod=四色柯式印刷 / finishing=燙金／燙銀、擊凸、手挽繩、底部加固
- features: 【320×120×380mm】加大尺寸，適合外套、鞋盒、大型禮品 / 【加固車縫】底部貼底工藝，承重達 8–10 公斤 / 【白卡／牛皮／特種紙】250g–300g，觸感與強度兼具
- GSC 同簇候选词: 紙袋印刷(70imp/pos13.8) · 訂做紙袋(67imp/pos18.6) · 紙袋訂製(61imp/pos24.6) · 印刷紙袋(58imp/pos15.5)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 187 | 17.18 | P0-A | 大號紙袋 | 100%環保 多尺寸 | 智印港 |
| ja | FILL | 40 | 8 | 18.12 | P3-低优先 | 大型紙袋 | エコ素材 多サイズ | ZprintPro |

### transparent-stickers  ·  stickers  ·  MOQ 10  ·  HK$0.38-1.50/張
- specs: material=透明 PET；可選白墨、啞膜／光膜 / size=客製模切外形，常用寬邊 20–120mm 級距 / printMethod=CMYK＋可選白墨（依設計） / finishing=覆膜（啞膜／光膜）、模切、可選局部 UV
- features: 高透明 PET 面材，可選白墨打底 / 適合玻璃瓶、化妝品與透明盒貼標 / 可覆啞膜／光膜，兼顧質感與耐用
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 184 | 15.78 | P0-A | 透明貼紙 | 防水 PVC 異形切割 | 智印港 |
| en | TRIM | 60 | 30 | 36.57 | P2-修剪 | Custom Transparent Stickers | Free Shipping $99+ | ZprintP |
| ja | FILL | 48 | 2 | 8 | P3-低优先 | 透明ステッカー | 防水 PVC ダイカット | ZprintPro |

### exercise-books  ·  educational  ·  MOQ 10  ·  HK$4-16/本
- specs: material=80g–100g書紙或道林紙；封面200g銅版紙 / size=A4（210×297mm）或A5（148×210mm） / printMethod=封面四色印刷；內頁單色或雙色 / finishing=騎馬釘裝訂、封面覆膜（可選）
- features: 【80g–100g書紙或道林紙】書寫流暢，不滲墨 / 【四色印刷】封面色彩鮮豔，內頁清晰 / 【騎馬釘或膠裝】牢固耐用，翻頁順暢
- GSC 同簇候选词: school exercise book printing(43imp/pos18.3) · school exercise book print(22imp/pos26.1) · school printing(4imp/pos10.5) · 教材 テキスト印刷(4imp/pos29.0)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 40 | 159 | 6.65 | P0-B | 作業簿印刷 | 膠裝/騎馬釘 50本起 | 智印港 |
| ja | FILL | 43 | 2 | 25.5 | P3-低优先 | 練習帳 | 中綴じ/無線綴じ 50冊〜 | ZprintPro |

### kraft-paper-bags  ·  paper-bags  ·  MOQ 100  ·  HK$3-8/個
- specs: material=牛皮紙 120–200g 級（依報價）；可配手挽材 / size=小／中／大袋型或客製展開尺寸 / printMethod=單色至四色；可數碼打樣 / finishing=燙金／燙銀、局部 UV、覆膜（視材）
- features: 牛皮紙質感，環保形象鮮明 / 可選棉繩／紙繩手挽與底部加固 / 支援燙金／UV 等品牌工藝
- GSC 同簇候选词: 紙袋印刷(70imp/pos13.8) · 訂做紙袋(67imp/pos18.6) · 紙袋訂製(61imp/pos24.6) · 印刷紙袋(58imp/pos15.5)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 130 | 11.17 | P0-A | 牛皮紙袋 | 100%環保 多尺寸 | 智印港 |

### removable-stickers  ·  stickers  ·  MOQ 10  ·  HK$0.45-1.60/張
- specs: material=PP 合成紙／PET 透明膜；可移膠 / size=最小約 15×15mm，最大約 250×350mm / printMethod=四色數碼或柯式（依數量） / finishing=模切、覆膜（啞膜／光膜）
- features: 【可移膠】移除不留殘膠，保護車漆與玻璃表面 / 【PP/PET 面材】可選合成紙或透明膜，適配不同展示需求 / 【3–5 次重貼】24 小時初黏測試，平滑面可反覆調整位置
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 126 | 10.7 | P0-A | 可移貼紙 | 防水 PVC 異形切割 | 智印港 |

### folded-leaflets  ·  flyers  ·  MOQ 10  ·  HK$0.70-1.95/張
- specs: material=157g或200g銅版紙 / size=A4展開（210×297mm）或DL（99×210mm） / printMethod=四色柯式或數碼印刷 / finishing=壓線、覆膜（啞膜／光膜可選）
- features: 【A4／A5標準尺寸】最常見派發規格，兼容性強 / 【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排 / 【157g–250g紙張】銅版紙或啞粉紙，挺度適中
- GSC 同簇候选词: 宣傳單張印刷(127imp/pos32.1) · チラシ印刷 早い(23imp/pos29.1) · double sided flyer printing(14imp/pos36.9) · チラシ 印刷 早い(7imp/pos25.6)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 36 | 113 | 24.25 | P1 | 摺頁單張 | 雙面四色 100張起 | 智印港 |
| en | TRIM | 60 | 6 | 45.17 | P2-修剪 | Folded Leaflets | Tri-Fold Design | Free US Ship | ZprintP |

### vehicle-wraps  ·  banners  ·  MOQ 100  ·  HK$28-120/平方米
- specs: material=鑄造級 PVC 車貼 80–100 微米；可移膠＋導氣槽 / size=依車型版型，常見轎車約 15–20 平方米 / printMethod=UV 固化或環保溶劑大判噴繪 / finishing=亮面／啞面覆膜、單透孔、3M／Avery 品牌升級
- features: 【鑄造級 PVC】80–100 微米，柔韌貼合車身曲面 / 【導氣槽底紙】貼附無氣泡，轉角不起翹 / 【可移除背膠】移除不殘膠，保護原廠烤漆
- GSC 同簇候选词: 易拉架製作(66imp/pos68.6) · banner 印刷(8imp/pos34.3) · adhesive banner printing(7imp/pos38.3) · 易拉架訂製(4imp/pos58.0)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 39 | 112 | 46.44 | P1 | 汽車車身貼 | 車身廣告 全車包覆 | 智印港 |

### certificates  ·  educational  ·  MOQ 100  ·  HK$8-40/張
- specs: material=200g–250g水印紙或棉質紙 / size=A4（210×297mm）或A3（297×420mm） / printMethod=四色印刷＋燙金 / finishing=燙金、壓凹、防偽底紋、浮水印
- features: 【80g–100g書紙或道林紙】書寫流暢，不滲墨 / 【四色印刷】封面色彩鮮豔，內頁清晰 / 【騎馬釘或膠裝】牢固耐用，翻頁順暢
- GSC 同簇候选词: school exercise book printing(43imp/pos18.3) · school exercise book print(22imp/pos26.1) · school printing(4imp/pos10.5) · 教材 テキスト印刷(4imp/pos29.0)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 112 | 10.63 | P0-A | 證書印刷 | 專業印刷 品質保證 | 智印港 |

### foil-stickers  ·  stickers  ·  MOQ 10  ·  HK$0.78-2.80/張
- specs: material=銅版紙／合成紙；可覆啞膜／光膜 / size=依稿模切；箔面最小字高視稿評估 / printMethod=四色印刷＋燙金（分版） / finishing=燙金／燙銀、模切、可選局部 UV
- features: 多色箔可選（金／銀／玫瑰金等） / 適合禮盒、酒標、美妝與 VIP 物料 / 可搭配覆膜保護箔面
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 102 | 5.74 | P0-A | 燙金貼紙 | 防水 PVC 異形切割 | 智印港 |

### pearl-envelopes  ·  envelopes  ·  MOQ 100  ·  HK$1.15-5.20/個
- specs: material=珠光／冰白特種書紙 / size=DL、C5、C4（變數可選） / printMethod=四色／專色＋可選燙金 / finishing=自黏封口、開窗、擊凸（可選）
- features: 珠光質感，禮儀場景吸睛 / 適合婚禮與高端活動郵寄 / 可搭細線燙金或凹凸
- GSC 同簇候选词: 信封印刷(18imp/pos5.3) · 封筒 両面印刷(7imp/pos5.6) · 信封訂製(3imp/pos7.7)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 96 | 5.27 | P0-A | 珍珠光信封 | 雙面印刷 多規格 | 智印港 |
| en | FILL | 48 | 4 | 20.25 | P3-低优先 | Pearl Envelopes | Free Shipping $99+ | ZprintPro |
| ja | FILL | 46 | 22 | 4.18 | P3-低优先 | パール封筒 | 両面印刷 マルチサイズ | ZprintPro |

### same-day-flyers  ·  flyers  ·  MOQ 10  ·  HK$0.55-1.50/張
- specs: material=157g銅版紙 / size=A4（210×297mm）或A5（148×210mm） / printMethod=四色高速數碼印刷 / finishing=無覆膜或啞膜（加時）
- features: 【A4／A5標準尺寸】最常見派發規格，兼容性強 / 【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排 / 【157g–250g紙張】銅版紙或啞粉紙，挺度適中
- GSC 同簇候选词: 宣傳單張印刷(127imp/pos32.1) · チラシ印刷 早い(23imp/pos29.1) · double sided flyer printing(14imp/pos36.9) · チラシ 印刷 早い(7imp/pos25.6)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| en | TRIM | 67 | 93 | 40.39 | P2-修剪 | Same-Day Flyer Printing from $0.95 | Free Shipping $99+ |  |

### outdoor-vinyl-banners  ·  banners  ·  MOQ 100  ·  HK$12-55/平方米
- specs: material=外光／內光 PVC 燈布（依場景） / size=按客製長寬平方米計 / printMethod=弱溶劑／溶劑／UV 噴繪 / finishing=打扣、焊邊、筒芯出貨（可選）
- features: 大幅面無縫或低縫拼接 / 防水、抗 UV 戶外墨水方案 / 可配打扣、焊邊、風扣
- GSC 同簇候选词: 易拉架製作(66imp/pos68.6) · banner 印刷(8imp/pos34.3) · adhesive banner printing(7imp/pos38.3) · 易拉架訂製(4imp/pos58.0)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 88 | 52.09 | P3-低优先 | 戶外橫幅 | 鋁合金支架 高清 | 智印港 |

### eco-paper-bags  ·  paper-bags  ·  MOQ 100  ·  HK$3-8/個
- specs: material=FSC 牛皮／再生紙（依供應）；大豆油墨 / size=小／中／大袋或客製 / printMethod=單色至四色（依設計） / finishing=手挽、可選燙金／覆膜（視材）
- features: 可選 FSC 認證與再生紙材 / 大豆油墨與環保手挽方案 / 適合 ESG 與社企品牌形象
- GSC 同簇候选词: 紙袋印刷(70imp/pos13.8) · 訂做紙袋(67imp/pos18.6) · 紙袋訂製(61imp/pos24.6) · 印刷紙袋(58imp/pos15.5)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 86 | 32.45 | P1 | 環保紙袋 | 100%環保 多尺寸 | 智印港 |
| ja | FILL | 40 | 20 | 12.25 | P3-低优先 | エコ紙袋 | エコ素材 多サイズ | ZprintPro |

### colored-envelopes  ·  envelopes  ·  MOQ 100  ·  HK$0.38-2.60/個
- specs: material=80–120g 書紙／彩色書紙 / size=DL、C5、C4（變數可選） / printMethod=柯式四色＋可選專色 / finishing=開窗、自黏封口（變數可選）
- features: 四色／專色還原插畫與品牌色 / 彩色紙或白底滿版皆可 / 自黏封口便於大量封裝
- GSC 同簇候选词: 信封印刷(18imp/pos5.3) · 封筒 両面印刷(7imp/pos5.6) · 信封訂製(3imp/pos7.7)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 77 | 5.3 | P0-A | 彩色信封 | 雙面印刷 多規格 | 智印港 |
| ja | FILL | 46 | - | - | P3-低优先 | カラー封筒 | 両面印刷 マルチサイズ | ZprintPro |

### mailer-boxes  ·  packaging  ·  MOQ 100  ·  HK$3.5-10/個
- specs: material=E／B 坑瓦楞或白卡裱瓦（依載重） / size=小／中／大或依內裝物客製 / printMethod=柔性版或柯式（依量與色數） / finishing=模切、壓線、自黏封口（可諮詢）
- features: 電商出貨耐壓楞型可選 / 滿版外印＋內側品牌訊息 / 飛機盒快速折合成型
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 38 | 72 | 7.72 | P0-A | 訂製郵寄盒 | 燙金 UV 100%訂製 | 智印港 |

### fluorescent-stickers  ·  stickers  ·  MOQ 10  ·  HK$0.52-2.00/張
- specs: material=螢光 PVC 膜／螢光紙；螢光油墨 / size=最小約 20×20mm，最大約 280×380mm / printMethod=四色數碼或柯式（依數量） / finishing=模切、反光條紋覆合、覆膜
- features: 【螢光油墨】高飽和度，日光下即顯強烈視覺衝擊 / 【PVC／螢光紙】可選防水膜或紙質，適配室內外場景 / 【SGS 認證】無重金屬遷移，安全用於食品與兒童相關標籤
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 33 | 3.58 | P0-A | 螢光貼紙 | 防水 PVC 異形切割 | 智印港 |
| en | TRIM | 60 | 71 | 15.37 | P2-修剪 | Custom Fluorescent Stickers | Free Shipping $99+ | ZprintP |
| ja | FILL | 48 | 21 | 14.48 | P3-低优先 | 蛍光ステッカー | 防水 PVC ダイカット | ZprintPro |

### kraft-paper-packaging-box  ·  packaging  ·  MOQ 300  ·  HK$1.5-1000/個
- specs: material=300g–350g FSC 牛皮卡紙；水性油墨 / size=常見 12×8×5cm 至 20×15×8cm（可客製） / printMethod=單色／雙色水性印刷或四色柯式 / finishing=燙黑、壓凹、絲印、手提繩
- features: 【300g–350g 牛皮卡】未漂白原漿，纖維粗獷自然 / 【FSC 認證】森林可持續來源，品牌環保形象加分 / 【完全生物降解】90 天內自然分解，無塑化劑殘留
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 43 | 67 | 32.57 | P1 | 牛皮紙包裝印刷盒 | 環保材質 多尺寸 | 智印港 |

### double-sided-flyers  ·  flyers  ·  MOQ 10  ·  HK$0.40-0.95/張
- specs: material=157g銅版紙或128g啞粉紙 / size=A4（210×297mm）或A5（148×210mm） / printMethod=四色雙面柯式印刷 / finishing=覆膜（啞膜／光膜可選）
- features: 【A4／A5標準尺寸】最常見派發規格，兼容性強 / 【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排 / 【157g–250g紙張】銅版紙或啞粉紙，挺度適中
- GSC 同簇候选词: 宣傳單張印刷(127imp/pos32.1) · チラシ印刷 早い(23imp/pos29.1) · double sided flyer printing(14imp/pos36.9) · チラシ 印刷 早い(7imp/pos25.6)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| ja | TRIM | 71 | 65 | 29.68 | P2-修剪 | 両面カラー印刷 両面チラシ | 両面フルカラー 100枚〜 翌日発送 | ZprintPro |

### laminated-menus  ·  menus  ·  MOQ 100  ·  HK$5-22/張
- specs: material=200g–250g銅版紙或啞粉紙；啞膠或光膠覆膜 / size=A4（210×297mm）或A3（297×420mm） / printMethod=四色印刷 / finishing=覆膜（啞膠／光膠）、圓角裁切
- features: 【防水防油】覆膜或PVC材質，適合餐飲環境 / 【四色印刷】食物圖片鮮豔誘人 / 【圓角或直角】依品牌風格選擇
- GSC 同簇候选词: 餐牌印刷(66imp/pos12.8) · pvc menu printing(4imp/pos71.3) · hard cover menu printing(4imp/pos74.3) · hardcover menu printing(3imp/pos59.7)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 36 | 55 | 7.38 | P0-A | 過膠餐牌 | 防水 覆膜 50本起 | 智印港 |
| en | TRIM | 62 | 9 | 50.33 | P2-修剪 | Laminated Menus | Laminated Durable | Free US Ship | Zprin |
| ja | FILL | 45 | 5 | 20.4 | P3-低优先 | ラミネート menu | 防水 ラミネート | ZprintPro |

### pvc-menus  ·  menus  ·  MOQ 100  ·  HK$8-32/張
- specs: material=0.5mm–1.0mm透明或白色PVC膠片 / size=A4（210×297mm）或A5（148×210mm） / printMethod=四色UV印刷 / finishing=圓角或直角裁切
- features: 【防水防油】覆膜或PVC材質，適合餐飲環境 / 【四色印刷】食物圖片鮮豔誘人 / 【圓角或直角】依品牌風格選擇
- GSC 同簇候选词: 餐牌印刷(66imp/pos12.8) · pvc menu printing(4imp/pos71.3) · hard cover menu printing(4imp/pos74.3) · hardcover menu printing(3imp/pos59.7)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | TRIM | 66 | 53 | 9.13 | P2-修剪 | PVC 餐牌印刷 · 防水防油覆膜 50本起 | 餐廳/咖啡店/酒吧菜單 | 智印港 |
| ja | FILL | 38 | 5 | 15.2 | P3-低优先 | PVC menu | 防水 ラミネート | ZprintPro |

### food-boxes  ·  packaging  ·  MOQ 100  ·  HK$2.5-18/個
- specs: material=350g 食品級白卡／400g 灰底白板；PE 淋膜或 PLA 內層 / size=完全訂製，常見 15×10×5cm 至 25×20×8cm / printMethod=四色柯式或數碼（依數量） / finishing=燙金／燙銀、窗口（PET）、局部 UV、覆膜
- features: 【食品級認證】SGS 與香港衛生署標準通過，安全接觸食品 / 【350g／400g 紙板】高挺度，保護糕點與茶葉不變形 / 【PE／PLA 內層】防油防濕，可降解選項滿足環保需求
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| en | TRIM | 71 | 49 | 38.63 | P2-修剪 | Paper Food Packaging Printing 100+ | Food-Safe Boxes & Bag |
| ja | TRIM | 73 | 43 | 35.93 | P2-修剪 | 紙製食品パッケージ印刷 100個〜 | 食品用紙箱・紙袋・耐油カード | ZprintPro |

### rigid-boxes  ·  packaging  ·  MOQ 100  ·  HK$8-42/個
- specs: material=灰板＋特種裱面紙；可選磁吸五金 / size=全客製內徑；常用禮品三階尺寸 / printMethod=柯式面紙印刷＋後工 / finishing=燙金、壓紋、局部 UV、手工糊盒
- features: 灰板裱面，結構挺括 / 磁吸、緞帶等開合儀式感配置 / 多工藝疊加：燙金、壓紋、局部 UV
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 36 | 49 | 8.69 | P0-A | 精裝禮盒 | 燙金 UV 100%訂製 | 智印港 |

### adhesive-banners  ·  banners  ·  MOQ 100  ·  HK$10-45/平方米
- specs: material=PVC 車貼／可移膠／透明膜（依場景） / size=按客製長寬平方米計 / printMethod=溶劑／弱溶劑／UV 噴繪 / finishing=霧面護膜、異形裁切（可選）
- features: 多種膠性：永久、可移、透明 / 大幅面無縫或低縫拼接 / 適合櫥窗、牆面、活動背板
- GSC 同簇候选词: 易拉架製作(66imp/pos68.6) · banner 印刷(8imp/pos34.3) · adhesive banner printing(7imp/pos38.3) · 易拉架訂製(4imp/pos58.0)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| en | TRIM | 60 | 46 | 38.54 | P2-修剪 | Adhesive Banners | Wind-Resistant | Free US Ship | ZprintP |

### fruit-food-label-stickers  ·  stickers  ·  MOQ 500  ·  HK$0.22-1.20/張
- specs: material=食品級 BOPP／PE／PLA；大豆油墨 / size=最小約 20×20mm，最大約 200×300mm / printMethod=四色數碼或柯式（依數量） / finishing=模切、覆膜（啞膜／光膜）、可變條碼
- features: 【食品級認證】SGS／FDA 通過，大豆油墨無遷移，可直接接觸食品 / 【耐冷耐濕】0–4°C 冷藏環境保持黏性，適合生鮮與冷鏈 / 【BOPP／PE／PLA】透明、白色或可降解三種面材選擇
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 47 | 46 | 40.46 | P3-低优先 | 水果及食品標籤印刷 | 防水防油 SGS 認證 | 智印港 |
| en | TRIM | 59 | 8 | 6.62 | P2-修剪 | Custom Food Label Stickers | Free Shipping $99+ | ZprintPr |

### school-flyers  ·  educational  ·  MOQ 10  ·  HK$0.2-0.8/張
- specs: material=128g–157g銅版紙或書紙 / size=A4（210×297mm）或A5（148×210mm） / printMethod=四色數碼印刷 / finishing=覆膜（可選）
- features: 【80g–100g書紙或道林紙】書寫流暢，不滲墨 / 【四色印刷】封面色彩鮮豔，內頁清晰 / 【騎馬釘或膠裝】牢固耐用，翻頁順暢
- GSC 同簇候选词: school exercise book printing(43imp/pos18.3) · school exercise book print(22imp/pos26.1) · school printing(4imp/pos10.5) · 教材 テキスト印刷(4imp/pos29.0)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 36 | 41 | 23.95 | P3-低优先 | 學校單張 | 雙面四色 100張起 | 智印港 |
| en | TRIM | 60 | 1 | 5 | P2-修剪 | School Flyers | Same-Day Printing | Free US Ship | ZprintP |

### security-stickers  ·  stickers  ·  MOQ 10  ·  HK$1.15-4.00/張
- specs: material=易碎紙／VOID／合成紙＋全息膜等（依方案） / size=依應用模切；小標籤至 A4 拼版皆可 / printMethod=可變數碼印刷為主；可搭配專色 / finishing=模切、全息冷燙或燙金（依稿）
- features: 易碎／VOID 等防拆材可選 / 可變序號、QR、條碼防竄貨 / 適用保修、3C、證書與封條
- GSC 同簇候选词: 貼紙印刷(165imp/pos27.3) · small batch label printing(76imp/pos29.8) · small batch sticker printing(69imp/pos6.6) · custom foil stickers(48imp/pos49.2)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 37 | 6.43 | P0-A | 防偽貼紙 | 防水 PVC 異形切割 | 智印港 |

### a4-flyers  ·  flyers  ·  MOQ 10  ·  HK$0.35-0.95/張
- specs: material=157g銅版紙或128g啞粉紙 / size=A4（210×297mm） / printMethod=四色柯式或數碼印刷 / finishing=覆膜（啞膜／光膜可選）
- features: 【A4／A5標準尺寸】最常見派發規格，兼容性強 / 【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排 / 【157g–250g紙張】銅版紙或啞粉紙，挺度適中
- GSC 同簇候选词: 宣傳單張印刷(127imp/pos32.1) · チラシ印刷 早い(23imp/pos29.1) · double sided flyer printing(14imp/pos36.9) · チラシ 印刷 早い(7imp/pos25.6)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| en | TRIM | 60 | 36 | 13.81 | P2-修剪 | A4 Flyers for Holiday Cards | Free Shipping $99+ | ZprintP |
| ja | FILL | 46 | 16 | 7.94 | P3-低优先 | A4 チラシ | 両面フルカラー 100枚〜 | ZprintPro |

### desk-calendars  ·  calendars  ·  MOQ 1000  ·  HK$3-8/本
- specs: material=200g–250g銅版紙或卡紙；三角座架 / size=A5（148×210mm）或A4（210×297mm） / printMethod=四色數碼或柯式印刷 / finishing=三角座架、騎馬釘或膠裝
- features: 【300g銅版紙或啞粉紙】挺度佳，色彩還原準確 / 【四色柯式或數碼】適合照片與插畫印刷 / 【金屬圈或騎馬釘】翻頁順暢，牢固耐用
- GSC 同簇候选词: 月曆印刷(126imp/pos20.3) · 月曆訂製(65imp/pos25.1) · 月歷印刷(64imp/pos17.7) · 訂製月曆(8imp/pos24.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 35 | 30.4 | P3-低优先 | 座檯年曆 | 企業禮品 多款式 | 智印港 |
| en | TRIM | 61 | 8 | 37.75 | P2-修剪 | Desk Calendars | Wire-Bound Spiral | Free US Ship | Zprint |

### adhesive-posters  ·  posters  ·  MOQ 100  ·  HK$13-42/張
- specs: material=150g–180g 背膠 PP／鑄造級 PVC；導氣槽底紙 / size=A4 至 A0，異形模切依稿件而定 / printMethod=環保溶劑或 UV 大判噴繪 / finishing=模切、鏤空、光膜／啞膜覆合
- features: 【導氣槽底紙】貼附時輕鬆排氣泡，移除不殘膠 / 【PP／PVC 面材】150g–180g，可選室內或戶外耐候型 / 【6–12 個月戶外耐候】UV 固化油墨，陽光下不褪色
- GSC 同簇候选词: 海報印刷(174imp/pos22.6) · poster 印刷(61imp/pos19.7) · 海報與印刷(38imp/pos16.4) · a2 poster(19imp/pos25.1)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 37 | 34 | 4.79 | P0-A | 背膠海報 | 防水材質 即日速遞 | 智印港 |
| ja | FILL | 40 | 3 | 36.67 | P3-低优先 | 粘着ポスター | 防水 翌日配送 | ZprintPro |

### magnetic-closure-gift-box  ·  packaging  ·  MOQ 100  ·  HK$15-80/個
- specs: material=灰板裱面＋隱藏磁吸；可觸感膜 / size=依產品＋內襯厚度全客製 / printMethod=面紙四色／專色＋後工 / finishing=燙金、壓紋、局部 UV、手工糊盒
- features: 磁吸翻蓋，單手開合體驗佳 / 硬盒結構＋觸感覆膜可選 / 燙金、壓紋、局部 UV 多工藝
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 48 | 32 | 6.75 | P0-B | 磁吸翻蓋禮盒印刷 | 高端定製 48 小時交貨 | 智印港 |

### gift-bags  ·  paper-bags  ·  MOQ 100  ·  HK$10-20/個
- specs: material=白卡／特種紙／珠光紙（依稿）；可覆膜 / size=禮品常用中／大袋或客製 / printMethod=四色＋燙金／局部 UV / finishing=燙金、局部 UV、緞帶或棉繩手挽
- features: 禮贈場景導向，工藝層次豐富 / 可搭燙金、局部 UV、緞帶手挽 / 袋型可加深底寬容納禮盒
- GSC 同簇候选词: 紙袋印刷(70imp/pos13.8) · 訂做紙袋(67imp/pos18.6) · 紙袋訂製(61imp/pos24.6) · 印刷紙袋(58imp/pos15.5)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 35 | 31 | 12.74 | P0-A | 禮品紙袋 | 100%環保 多尺寸 | 智印港 |

### perfect-bound-books  ·  books  ·  MOQ 10  ·  HK$16-80/本
- specs: material=內頁157g–200g銅版紙；封面200g–250g銅版紙 / size=A4（210×297mm）或A5（148×210mm） / printMethod=四色柯式印刷 / finishing=膠裝、封面覆膜（啞膜／光膜）
- features: 【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰 / 【四色柯式印刷】色彩飽和，適合照片與插畫 / 【多種裝訂】騎馬釘、膠裝、線裝或硬皮
- GSC 同簇候选词: china catalog printing(110imp/pos16.7) · 騎馬釘印刷(60imp/pos17.5) · 小冊子印刷(48imp/pos10.0) · school exercise book printing(43imp/pos18.3)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | FILL | 49 | 19 | 9.21 | P3-低优先 | 公司膠裝書 覆膜・騎馬釘・10起印・HK$16起 | 智印港 |
| en | TRIM | 62 | 31 | 52.61 | P2-修剪 | Perfect Bound Books | Perfect Bound | Free US Ship | Zprin |

### cosmetic-boxes  ·  packaging  ·  MOQ 100  ·  HK$8-65/個
- specs: material=1200-1500g 灰板裱糊 白卡 / 觸感紙 / 珠光紙; 內托 EVA / 紙漿 / PET 吸塑 / size=依瓶器三維客製; 標準 50×50×30mm 至 250×250×120mm / printMethod=四色柯式 + 專色; 可逆向 UV / finishing=覆膜 (啞/觸感/光) + 燙金 (金/銀/玫瑰金) + 局部 UV + 擊凸 + 糊盒
- features: 【4 種盒型】天地蓋 / 磁吸翻蓋 / 抽屜式 / 書型, 全部可選 / 【內托定製】EVA 挖槽 / 紙漿模塑 / PET 吸塑 3 種材質 / 【法規標示】藥機法 / FDA 21 CFR / EU 1223/2013 合規
- GSC 同簇候选词: 包裝盒印刷(71imp/pos36.1) · 紙盒印刷(63imp/pos35.0) · 紙盒訂製(63imp/pos38.8) · 包裝盒訂製(56imp/pos30.8)

| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |
|---|---|---|---|---|---|---|
| zh-hk | TRIM | 77 | 14 | 6.64 | P2-修剪 | 化妝品包裝盒 4 種盒型 100 個起印 · 磁吸翻蓋 / 天地蓋 / 抽屜式 / 書型 | 智印港 |
| ja | TRIM | 87 | 30 | 6.6 | P2-修剪 | 化粧品パッケージボックス 4 種類 100 個〜 | マグネット蓋・引き出し・ブック型 | ZprintPro |
