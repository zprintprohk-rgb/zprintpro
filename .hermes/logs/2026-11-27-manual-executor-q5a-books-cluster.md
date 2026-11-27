# 2026-11-27 人手執行報告 · 批 Q5-A 書刊/膠裝簇權重批

- VERDICT: DONE（live round 2 5/5 PASS，兩 push：a273223d 主批 + 37bbbe53 追加修復）
- CONSUMED: K3 16:36 開放式批准（「批 Q5-A…按最优推荐方案继续下一步，都可以立即或是下一個 push 窗口就上線」）；gsc_data_qp_90d.csv 書刊簇 12 詞；Q4 既定 SOP
- DELIVERED: zh-hk 書刊簇真值修復 ×11 + 承接錨鏈 ×3 + GSC 精確詞 FAQ ×4 + blog 卡片摘要真值 ×1
- NEXT: 7d 復測門 12-04（與 Q1/Q2/Q4 同窗）→ 達標複製 en/ja；defer 4 項待 K3 拍板/排期

## 一、GSC 基線（gsc_data_qp_90d.csv，批前核驗）

書刊簇 12 詞 imp≥15 合計 ~3718、**全簇 0 點擊**——純曝光無承接是最大漏點：

| 詞 | imp | 承接頁現狀 |
|---|---|---|
| 書刊印刷 | 708 | 類目 i287 r56.4 / guide blog i254 r32.4 |
| 騎馬釘 | 443 | blog i181 r27.8 / PDP i178 r50 |
| 騎馬釘印刷 | 438 | blog i166 r18.8 / PDP i160 r41.6 |
| 印書 | 423 | 類目 i147 r45.5 / blog i117 r33.9 |
| 騎馬釘書刊 | 350 | PDP i165 r40.4 |
| 膠裝書印刷 | 359 | 無 PDP（defer 項） |
| 膠裝書 | 325 | 無 PDP |
| 膠裝書價格 | 210 | 類目 i130 r39.3 |
| 小冊子印刷 | 141 | blog i116 **r10.1 已首頁** |

book-buying-guide 全頁 i750、saddle-stitch blog 全頁 i631。guide blog 原 0 條 PDP 鏈；謊言價格（HK$14-57/500本、1 本起、精裝 HK$200-500）與 products.ts 真值（HK$6-32/本、10 本起、精裝 HK$40-240）同頁矛盾——價格可信度是轉化殺手。

## 二、執行內容（全部單變量 zh-hk，en/ja 零改動）

### commit a273223d（主批，push 1 @ 16:57）
1. **buying-guides.ts book guide zh-hk 真值修復 ×4**：amber 價格框（HK$14-57/500本 → HK$6-32/本 10 本起）、MOQ 框（1 本起 → 10 本起）、膠裝 FAQ（貴 HK$5-10 → +HK$30/本升級）、精裝 FAQ（HK$200-500 起 → HK$40-240/本）；裝訂節 + 結尾段 **PDP 精確錨鏈 ×2**
2. **category-conversion-blocks.ts books:zh-hk**：quickAnswer#1 截斷句補完 + quickAnswers ×2（書刊印刷幾多錢一本 i708 全簇最大詞原先無精確 FAQ、膠裝書印刷幾錢）+ newFaqs ×2（書刊印刷一本幾錢、膠裝書價格係點計）
3. **blog-data/zh-hk.json saddle-stitch blog**：about 塊前直答 CTA ×1（騎馬釘書刊印刷 10 本起印 HK$6-32/本 → PDP）

### commit 37bbbe53（追加修復，push 2 @ 17:29）
- **buying-guides.ts 價格區/MOQ 區殘留 ×5**：價格區藍框（500 本騎馬釘 HK$14-57/本，大批量 2000+ 本低至 HK$15-30/本 → 真值階梯）；**虛構柯式階梯表整表刪除**（50-100 本 HK$80-150 / 200-500 本 HK$40-80 / 500-1000 本 HK$25-50 / 2000+ 本 HK$15-30——與 HK$6-32 真值直接矛盾，無引擎來源）；價格區收尾段 1 本起印 → 10 本起 + 即日印刷鏈 + PDP 落單鏈；MOQ 區藍框 + 段落 1 本起 ×2 → 10 本起，1 本需求導流寫真書/自費出版 blog（真 1 本起產品線）
- **blog-posts.ts saddle-stitch blog 卡片摘要 zh-hk**（HK$14-57/本 (500 本) → HK$6-32/本）

### 過程事故與修復（透明記錄）
- **誤插事故**：CTA 首輪錯落在 a5-vs-a6-flyer-size 傳單 blog（錨 `</ul>\n</div>\n<div class="mt-12…` 全文件僅傳單頁匹配，count=1 斷言通過但錯頁）。commit 前自查 diff 發現，從 `.bak-q5a-20261127` 還原後用頁面獨有錨（順豐本地免運費…送貨。</p>\n<div class="mt-12…）重插，count=1 且頁面雙向驗證（saddle-stitch 有 CTA / a5 無 CTA）。**教訓：blog-data 多頁共享模板時，count=1 不足證錯頁，必須驗證錨所在 slug 段。**
- **live round 1 探針 FAIL**：book-buying-guide 頁仍見 HK$14-57——首輪 grep 只掃關鍵字，未覆蓋藍框 callout 句式與表格。round 1 FAIL 直接觸發追加修復 commit 37bbbe53。**教訓：價格類頁面要分區掃（amber 框/藍框/表格/FAQ 尾段句式不同）；live 探針必帶負向斷言（STILL-PRESENT），只查新增會漏殘留。**
- **defer 登記**（單變量纪律，後續批處理）：ja book guide 同款謊言 ×2（buying-guides.ts:801/815）；月曆 blog 卡片摘要 HK$14-57 ×3 語（blog-posts.ts:1896-1898，屬 Q2 月曆簇 follow-up）；膠裝書無 PDP（~894 imp 無承接頁，新 SKU 待 K3 拍板）；saddle-stitch blog ja title ¥258 舊價痕跡待 ja 復查。

## 三、門禁與推送

- tsc --noEmit ×2 = 0；反審門童 shadow 全黃無 red；blog-data JSON 嚴校過
- push 1：a273223d（451587a2..a273223d @ 16:57）pre-push guard #21 全過
- push 2：37bbbe53（a273223d..37bbbe53 @ 17:29）pre-push guard #21 全過（窗口 ≥30min 滿足）

## 四、live 復探（UA 模擬瀏覽器，裸 curl 被 CF 403）

### Round 1（push 1 後，4 URL）
| URL | 結果 |
|---|---|
| /zh-hk/blog/saddle-stitch-booklet-printing-guide/ | PASS（CTA 生效） |
| /zh-hk/blog/book-buying-guide/ | **FAIL：仍見 HK$14-57** → 觸發追加修復 |
| /zh-hk/category/books/ | PASS（書刊印刷幾多錢一本 FAQ 生效） |
| /zh-hk/blog/a5-vs-a6-flyer-size/ | PASS（誤插已還原，無 CTA） |

### Round 2（push 2 後，5 URL）—— **5/5 PASS**
| URL | 斷言 | 結果 |
|---|---|---|
| /zh-hk/blog/book-buying-guide/ | 有 HK$6-32/本 ×3 處 + PDP 錨鏈 ×2；無 HK$14-57 / HK$80-150 / HK$40-80 / 1 本起印 / HK$200-500 | PASS |
| /zh-hk/blog/saddle-stitch-booklet-printing-guide/ | 有 CTA；無 HK$14-57 | PASS |
| /zh-hk/category/books/ | 有 書刊印刷幾多錢一本 + 膠裝書價格係點計 | PASS |
| /zh-hk/blog/a5-vs-a6-flyer-size/ | 無誤插 CTA | PASS |
| /zh-hk/blog/ | 卡片摘要新真值 HK$6-32/本 生效 | PASS |

## 五、7d 復測門（2026-12-04，與 Q1/Q2/Q4 同窗）

| 指標 | 現值 | 目標 |
|---|---|---|
| 書刊印刷 → guide blog | r32.4 | ≤20 |
| 書刊印刷 → 類目頁 | r56.4 | ≤30 |
| 騎馬釘印刷 → PDP | r41.6 | ≤25 |
| 小冊子印刷 blog | r10.1 | 守首頁 |

達標後複製 en（book printing/saddle stitch booklet 系）/ ja（書籍印刷/中綴じ 系）版本。

## 六、defer 清單（需 K3 拍板或排期）

1. **膠裝書新 PDP**（膠裝書印刷 i359 + 膠裝書 i325 + 膠裝書價格 i210 ≈ 894 imp 無承接頁）——產品線歸屬與價格引擎支持待考古
2. ja book guide 謊言 ×2 + ja title ¥258 痕跡——ja 單變量批
3. 月曆 blog 卡片 HK$14-57 ×3 語——Q2 月曆簇 follow-up
4. PDP title 補書刊大詞——11-28 A1 title 解凍批

## 七、收尾

- 賬本 #25（flywheel-learning-ledger.json update_log）
- 隊列 DONE 卡 FIX-20261127-Q5A-BOOKS-CLUSTER（strategy-task-queue.json）
- SESSION_LOCK 頂部持有段釋放（本批歷史保留）
