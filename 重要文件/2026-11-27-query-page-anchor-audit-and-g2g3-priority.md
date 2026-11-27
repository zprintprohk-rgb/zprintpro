# 2026-11-27 承接層對照審計 · query×page 錨位與 G2/G3 堵點優先序

- VERDICT: 戰略盤點完成 — 2 個重大承接錯配 + 8 個衝首頁簇已排出優先序
- 数据来源：GSC query×page 90 日明細 `gsc_data_qp_90d.csv`（4415 行，fetch_gsc_data.py --days 90 --dimensions query,page，2026-11-27 12:0x 經代理 127.0.0.1:7890 拉取）
- 校准日期：2026-11-27（窗口 2026-08-29 ~ 2026-11-26）

## 〇、13 新詞錨位核驗（LONGTAIL 13 批售後）— 全部正確 ✅

| 新詞 | 90d imp | 主承接頁 | 判定 |
|---|---|---|---|
| 餐牌 | 394 | blog guide(r11) + menus 類目(r32) + laminated-menus | ✅ 三點承接 |
| 厚紙 | 8 | thick-paper-flyers PDP | ✅ |
| 線圈 | 6 | spiral-notebooks PDP | ✅ |
| 環保材質 | 98 | eco-printing blog + eco-paper-bags | ✅ |
| 牛皮紙 | 53 | kraft-paper-packaging-box PDP | ✅ |
| エコ用紙 | 4 | eco-paper-bags (ja) | ✅ |
| 賀卡印刷 | 4 | matte-greeting-cards PDP | ✅ |
| 防水ステッカー | 43 | waterproof-stickers (ja) | ✅ |
| ロールラベル | 11 | roll-stickers (ja) | ✅ |
| バナー 印刷 | 10 | roll-up-banners (ja) | ✅ |

## 一、🔴→⚪ 重大承接錯配 — 查案後勘誤（2026-11-27 14:2x）

**勘誤聲明（per §0.23）**：初版把「query 總 imp」誤植為單頁承接 imp。逐頁明細複查後：M1/M2 的「r2/r3 承接頁」各只有 **i1**，屬 Google 語義抽風，**非真錯配**。真正圖像：兩簇都是「主推頁卡 P2-P3、blog 權重未導給 PDP」。已按勘誤後方案執行批 Q2（詳見 `.hermes/logs/2026-11-27-manual-executor-q2-zh-double-cluster.md`）。

### M1 · 月曆簇（imp~1750）真實錨位
- 月曆印刷：custom-calendars **i338 r22.2** ／calendars 類目 i311 r34.8 ／2027 timetable blog i39 **r5.3**
- 月歷印刷：calendars 類目 i158 r31.8 ／custom-calendars i123 r25.4
- magnetic-calendars 僅 i1 r3（初版誤植，不動）
- **堵點根因**：timetable blog（r5.3 已首頁）**0 條 → custom-calendars PDP 鏈**，權重斷層
- **已執行（批 Q2）**：custom-calendars zh-hk G1 直答塊（1 本起 HK$3-8，products.ts 真值）+ timetable blog 精準錨鏈「定製月曆 1 本起」

### M2 · 海報簇（imp~2066）真實錨位
- 海報印刷：poster blog **i436 r16.6** ／a2-posters i277 **r34.6** ／posters 類目 i183 r63.5 ／首頁 i135 r19.4
- eco-flyers 僅 i1 r2（初版誤植，不動）
- **堵點根因**：poster blog（17 鏈）**0 條 → a1/a2-posters PDP 鏈**，權重全導給類目與無關 blog
- **已執行（批 Q2）**：a2-posters zh-hk G1 直答塊（10 張起 HK$16，products.ts 真值）+ poster blog 精準錨鏈「A2 海報印刷」「A1 海報印刷」

### M3 · 利是封印刷 i222 r6 落在 wedding-red-packet-printing-guide（婚禮紅包）
- blog 已首頁 r6 不動；堵點是 red-packets 類目 r20.8 + foil-red-packets r1.1（燙金利是封 i37 倒是 PDP r1）
- 修法：兩篇 blog → red-packets 類目 精準錨鏈，把類目推上首頁

## 二、🟠 衝首頁簇優先序（imp × 距 P1 × 意圖）

| 序 | 簇 | imp | 現狀 | 動作 |
|---|---|---|---|---|
| P0-A | **en catalog printing china**（china/catalogue/wholesale/bulk 5 詞） | ~800 | catalog-printing PDP r11.5-21.7 全產品頁承接正確，只差權重 | blog↔PDP 錨鏈 + G1 直答塊 + FAQ — 最先見效 |
| P0-B | **en small batch sticker/label printing**（3 詞） | ~400 | r6-9.5 全站最接近首頁 | 同上，最快贏家 |
| P0-C | zh 月曆簇（月曆印刷 759 + 月歷 311 + 訂製 295） | ~1400 | M1 修復後 custom-calendars 直衝 | 依 M1 |
| P1-A | zh 印刷公司 i304 **c5（全站 B2B 點擊王）** r30 / 香港印刷 i83 c2 r11.5 首頁 | ~400 | 首頁承接兩大商業詞但 r30/r11.5 | 首頁 title/h1/直答塊加商業詞權重 + HK printing guide↔首頁 |
| P1-B | zh 利是封簇 13 詞 | 537 | M3 | 內鏈批 |
| P2-A | zh 書刊/印書/膠裝書/騎馬釘簇（12+ 詞） | ~2600 | books 類目 r44-56 極弱；saddle-stitch PDP r40-50；blog r19-49 | books hub 12 段重構 + blog→PDP 錨鏈 + PDP title 補大詞 |
| P2-B | zh 包裝盒/紙盒/訂製簇（8+ 詞） | ~1100 | packaging 類目 r35-43；electronics-packaging-box r45-66 | packaging hub 強化 + kraft/electronics PDP 內鏈互導 |
| P2-C | zh 易拉架簇 22 詞 | 679 | 只有 blog 承接 r36-58，**roll-up-banners PDP（zh）無排名** | zh PDP title 已有「易拉寶」錨——補內鏈+直答塊讓 PDP 接上 |
| P2-D | zh 宣傳單張簇（宣傳單張/印刷 2 詞） | 1035 | flyers 類目 r30/a4 r55/a5 r57 | flyers PDP 標題已優——類目頁權重批 |
| P3 | ja コミケ 印刷 i470 r21 + doujinshi printing i164 r10.5 | ~640 | doujin PDP 承接正確需推權重 | ja 內鏈 + comiket-c109 落地頁互導 |
| P3 | zh 摺頁簇 i328 r23 blog 承接 | 328 | blog 單點承接 | blog→folded-leaflet SKU 鏈（如有）|
| P3 | zh 喜帖 i97 r8.7 wedding-thank-you-cards | 193 | PDP 邊緣位 | 直答塊微推即入頁 1 |
| 已首頁 ✅ | 學校印刷 r2 / 證書紙 r3 / 燙金利是封 r1 / 即日印刷 r7.5（same-day-flyers） | — | 無需動 | 即日印刷 r7.5 可微推入前 3 |

## 三、行動批建議（按 ROI 排序，均可立即或下一 push 窗口上線）

- **批 Q1（本週）**：P0-A + P0-B = en 雙簇衝首頁（catalog-printing + small-batch-stickers 的 blog↔PDP 錨鏈 + G1 直答塊，4 頁面工作量，預期 r11→P1 / r7→P1-3）
- **批 Q2**：M1 月曆錯配修復（3 條內鏈，imp1400 簇的承接權重轉移）
- **批 Q3**：M2 海報錯配——先現場查 eco-flyers 為何 r2（半小時查案），再定轉移方案
- **批 Q4**：P1-A 首頁商業詞權重（印刷公司/香港印刷）
- **批 Q5**：P2 系列 hub 重構（books/packaging/flyers 類目 12 段 + 錨鏈網）

## 四、給 K3 的一句話

「批 Q1 en 雙簇是最近首頁的兩塊肉（r6-21、imp1200+、承接頁全對），今晚就能做完推上線；M1 月曆錯配是最大單一浪費（i759 r3 在磁石曆）。拍 Q1+Q2 我即刻執行。」
