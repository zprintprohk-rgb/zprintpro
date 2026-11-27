# 膠裝書 PDP 考古與 Q6 錨鏈批 · 一頁建議書（2026-11-27 23:2x）

## 一、考古修正（推翻「無 PDP」原判斷）

**膠裝書 PDP 一直存在**：`perfect-bound-books` SKU 在 products.ts:5234 完整配置（price_range HK$16-80/本、basePrice 16、minQ 10、48-400 頁、isHot），三語 live 全 200，zh-hk title「無線膠裝書籍印刷 | 覆膜 膠裝 | 10本起印 HK$16起」合格。真相是 **PDP 存在但對膠裝詞隱形**——Q5-A 時的「無承接頁」defer 項撤銷。

## 二、GSC 證據（gsc_data_qp_90d.csv，90 天）

| query | 總 imp | PDP 佔比 | PDP 排名 | 最大承接頁（錯配） |
|---|---|---|---|---|
| 膠裝書 | 325 | **16%** (i51) | r33.0 | book guide i131 r49（無鏈）+ catalog PDP i29 r71（錯配） |
| 膠裝書價格 | 210 | **2%** (i4) | **r27.0 全簇最好** | 類目 i130 r39（FAQ 無鏈） |
| 膠裝書印刷 | 359 | **12%** (i43) | r47.9 | book guide i125 + 類目 i125（都無鏈）+ catalog PDP i64 r62（錯配） |
| 膠裝書刊 | 146 | 10% (i15) | r54.1 | 類目 i81（無鏈） |

**判讀**：Google 已想用 PDP 承接（膠裝書價格排名全簇最好 r27）但只給 2% 曝光——因高曝光承接頁（guide/類目/saddle blog/textbook blog 共 i286+）**零鏈**指向 PDP，權重傳不過去。catalog-printing PDP 憑 features 裡「多種裝訂：膠裝」錯配承接 i188（r62-84 差排名）。

**競品對比**：4a.com.hk 膠裝書 100 本約 HK$95/本、500 本約 HK$20/本；pro360 平台 A4 彩 68PP 約 HK$47-60/本。我方 HK$16-80/本（10 本起數碼、批量更低）**價格位勢 3-6 倍優勢**，缺的只是發現性。

## 三、已上線（批 Q6，commit 069b1f43，K3 22:56 開放式批准，live 5/5 PASS）

7 個精確錨（全 zh-hk 單變量）：book guide ×2（膠裝 FAQ + 裝訂節收尾）· saddle blog FAQ（64 頁轉膠裝）· textbook blog intro · books:zh-hk 直答 ×3（書刊印刷幾多錢一本 / 膠裝書印刷幾錢 / 膠裝書價格係點計）。tsc 0、反審 0 red。

## 四、後續建議（按 ROI 排序，待 K3 拍板或排期）

1. **catalog-printing PDP 裝訂句加導流鏈**（錯配 i188 截流）：features「【多種裝訂】騎馬釘、膠裝、線裝或硬皮」的「膠裝」改鏈 → perfect-bound PDP。1 行改動，把 Google 已給的錯配曝光導正。
2. **膠裝書專屬直答塊**（學 G1 六問真值）：PDP 頁首或類目塊補「膠裝書印刷幾多錢一本？→ HK$16-80/本 10 本起」AEO 塊——膠裝書價格 r27 已在首頁門檻邊緣，一塊直答可能直接進首頁。
3. **childrens-picture-book / zine / campus 等 5 篇 0 鏈 blog 補錨**（mentions 5-10 次/篇，低優先，可併入下一 blog 批）。
4. PDP title 補「膠裝書印刷」大詞——併 11-28 A1 title 解凍批。
5. en/ja 已有 7 鏈/語，無需動。

## 五、7d 復測門（12-04，與 Q1/Q2/Q4/Q5-A 同窗）

膠裝書價格 PDP r27→≤15（衝首頁）｜膠裝書印刷 PDP r47.9→≤25｜膠裝書 PDP r33→≤20。若達標，catalog PDP 導流鏈（建議 1）效果會被同步放大。
