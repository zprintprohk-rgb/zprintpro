# ZprintPro 三語站點 SEO／AEO／GEO 排名飛輪 · 下兩週戰略方案（2026-11-25 → 12-08）

> 角色：ZprintPro（智印港）首席搜索數據分析與戰略參謀
> 版本：v1 · 2026-11-25 · 接續 `2026-11-25-core-update-complete-gsc-recovery-verdict-and-flywheel-escalation.md`（下稱「11-25 首讀」）
> 性質：戰略方案 + 執行排程，供 K3 拍板與 5 條車道消費；**不代 K3 拍板**（§0.24）、**不承諾任何詞必進首頁**（11-19 §1 判讀紀律）
> 範圍：zh-hk / en 為主，ja 為輔（資源分配建議）；「兩週」= 11-25→12-08

> ⚠️ **2026-11-25 傍晚校準，優先於本文所有舊窗口判斷**：Google Search Status Dashboard 顯示 November 2026 core update 已於 11-24 關閉，但 **December 2026 core update 同日啟動且仍 Active**。因此 **12-01 不再是更新後乾淨對比點，§4.3 的 R1/R2/R3 不得於 12-01 自動放行**；須等最近一次核心更新完成後再留完整 7 天。最新 `(2)` GSC 檔亦新增 11-23 回升（33 點擊／1,392 曝光／排名 18.3），舊稱「後移持續至 11-24」不得再作確定事實。最新唯一執行校準見 `2026-11-25-three-market-flywheel-latest-gsc-and-dual-core-update-verdict.md`。本文保留作詞簇、真值與車道設計底稿。

---

## 0. 一句話戰略

**核心更新已於 11-24 完成，站點正處於「曝光池擴張 + 位置後移」的更新後重分配期；下兩週不打排名攻堅戰，而是用第一週完成「真值正確性 + 承接補缺 + 官方對比窗」，用 12-01 的合法判讀點決定第二週把資源押在哪三個簇。** 槓桿最高處不是深位大詞，而是 **28d 合計 ≈553 曝光卻只有 2 次點擊的 G1「頁一門口零點擊」簇**。

---

## 1. 數據底座（本輪新增：核心更新前後分段對比）

```
數據來源:
- GSC数据/28天三站点汇总…2026-11-25.xlsx 圖表 sheet（10-26→11-22 逐日，29 行）
- 分段腳本: .hermes/tmp/gsc_segments_20261125.py → .hermes/logs/gsc-2026-11-25-core-update-segments.json
- 四窗口 KPI + 帶錢詞差分: 11-25 首讀 §2/§5（openpyxl×pandas 雙方法 ALL MATCH）
- 設備/國家/富結果: 同檔 設備/国家_地区/搜索结果呈现 sheet
- 承接矩陣: src/data/products.ts（83 SKU slug）+ src/data/blog-data/{zh-hk,en,ja}.json（83/84/83 slug）
- 競品 SERP 快照: 2026-11-25 聯網搜索 ×7（§6 逐條標註站點）
- 核心更新: Search Engine Journal 2026-11-25（引 Search Status Dashboard，rollout complete as of Nov 24）
校準狀態: 🟢 已校準；11-23→11-22 各日為回填後權威值；11-23 之後各日尚未進入 28d 檔（待 11-27+ 導出）
```

### 1.1 核心更新前後分段（28d 逐日，曝光加權口徑）

| 段 | 日期 | 天數 | 點擊 | 曝光 | 點擊/日 | 曝光/日 | CTR | 加權排名 |
|---|---|---|---|---|---|---|---|---|
| **A 更新前基線週**（Google 官方對比基線） | **11-03→11-09** | 7 | 158 | 7,528 | **22.57** | **1,075.4** | **2.099%** | **13.95** |
| B 更新前 7 天 | 10-27→11-02 | 7 | 126 | 6,570 | 18.00 | 938.6 | 1.918% | 16.05 |
| C 更新啟動→生效前 | 11-10→11-12 | 3 | 61 | 3,762 | 20.33 | 1,254.0 | 1.621% | 12.91 |
| D 生效後穩定期 | 11-13→11-19 | 7 | 127 | 8,126 | 18.14 | 1,160.9 | 1.563% | 16.31 |
| **E 後移期** | **11-20→11-22** | 3 | 39 | 5,105 | **13.00** | **1,701.7** | **0.764%** | **33.69** |
| F 全 28d | 10-26→11-22 | 28 | 542 | 32,038 | 19.36 | 1,144.2 | 1.692% | 18.01 |

**E vs A：曝光/日 +58.2% · 點擊/日 −42.4% · CTR 2.10%→0.76% · 排名 13.95→33.69。**

三個讀數：
1. **D 段（11-13→11-19）與 A 段幾乎等價**（點擊/日 18.1 vs 22.6，排名 16.3 vs 14.0）——核心更新「生效」後的第一週並沒有明顯傷害，只是小退。
2. **E 段（11-20 起）才出現形態突變**：曝光暴增 58%、點擊反降、排名腰斬到 33.7。這與 Google 在 rollout 尾段「擴大重新評估範圍」的行為一致（Lily Ray 11-23 觀察：內容面下墜、主產品/品牌面強韌——與我方首頁 1,475 imp/55 clk 仍為最強承接相符）。
3. **11-24（K3 實測 2,400+）= E 段形態延續到完成日**，尚未反轉。按 Google 指引，**12-01 之後用 11-25→12-01 vs A 段（11-03→11-09）做合法對比**，這是本方案第二週資源分配的唯一判據來源。

### 1.2 設備層（28d）

| 設備 | 點擊 | 曝光 | CTR | 排名 |
|---|---|---|---|---|
| 桌面 | 291 | 20,903 | 1.39% | 21.57 |
| **移動** | 247 | 10,759 | **2.30%** | **11.04** |
| 平板 | 4 | 376 | 1.06% | 18.54 |

移動端排名 11.04、CTR 2.30% 遠優於桌面（21.57 / 1.39%）——**深位曝光主要來自桌面端**（B2B 採購場景 + 長尾信息查詢），而移動端承接的是即日/本地/品牌類近頁一詞。這意味著：G1 簇 CTR 修復要**以桌面 snippet 為主戰場**（meta title/description/富結果摘要），移動端則守住首屏直答不動。

---

## 2. 行業大詞 vs 真正帶錢詞：三語定義與當前位次

定義口徑（11-23 §4 延續）：**行業大詞** = 品類資格詞（建立主題權威，搜索量大但意圖泛）；**真正帶錢詞** = 帶「訂製/數量/材質/尺寸/地區/時效/採購風險」信號的交易詞。帶錢詞再分三檔：**G1 頁一門口**（pos ≤10.5）、**G2 近頁一**（10-16）、**G3 深位大詞**（25+）。全部為 28d（10-26→11-22）檔值。

### 2.1 zh-hk（主戰場）

| 檔 | 詞 | imp | clk | pos | 承接頁（現狀） | 缺口判斷 |
|---|---|---|---|---|---|---|
| **G1** | 食品包裝印刷 | 144 | 0 | 8.94 | product/food-boxes（640/2/19.8）+ blog food-packaging | **最大零點擊**；11-18 meta 部署未破零 |
| G1 | 即日印刷 | 53 | 1 | 9.26 | 首頁 + blog rush-printing-hk-guide（501/8/8.65） | 承接分散，首頁/服務頁/blog 三方爭 |
| G1 | 即日急件 | 46 | 0 | 8.91 | 同上 | 零點擊 |
| G1 | a1 印刷 即日 / a2 印刷 即日 | 30 / 29 | 0 / 0 | 6.27 / 6.55 | product/a1-posters、a2-posters（811/15/12.5） | 零點擊；a2-posters 頁已強 |
| G1 | 透明貼紙印刷 | 24 | 0 | 5.17 | product/transparent-stickers | 零點擊 |
| G1 | 海報印刷一張 | 14 | 0 | 5.43 | blog poster-printing-price-guide（20/0/14.0 @24h） | 零點擊 |
| G1 | 2027利是封 | 13 | 0 | 6.85 | **blog cny-2027-red-packet-printing-guide**（搜索實測前 4） | **無「利是封印刷」交易總頁**，6 個 red-packet SKU 分散 |
| G1 | 印刷公司報價 / 印喜帖價格 | 15 / 15 | 0 / 1 | 7.33 / 5.20 | 首頁 / blog wedding | 報價類詞無專屬承接 |
| **G2** | china catalog printing | 112 | 0 | 14.86 | product/catalog-printing（724/**1**/37.6）+ en blog supplier-guide（24h 60 imp 領跑） | **PDP 深位 37.6，blog 反而承接** → 主 URL 分工待 query×page |
| G2 | 可移貼紙 | 92 | 0 | 13.86 | product/removable-stickers + blog sticker-material-pvc-vinyl-removable | H1 為 144 當量長句（11-23 盤點） |
| G2 | 學校印刷 | 88 | 0 | 18.24 | category/educational + 教材 blog 群 | 校園 L1 主營，無「學校印刷」直答頁 |
| G2 | 摺頁印刷 | 69 | 0 | 16.42 | product/folded-leaflets + blog folded-leaflet（786/17/**7.35**） | blog 已頁一，PDP 未跟上 |
| G2 | 香港印刷 | 37 | 2 | 12.0 | 首頁 | 唯一有點擊的 G2 |
| G2 | 小冊子印刷 / 證書印刷 | 14 / 10 | 0 / 0 | 21.3 / 10.1 | saddle-stitch-booklets / certificates（凍結窗） | 證書兩窗持平未回頁一 |
| **G3** | 貼紙印刷 | 218 | 0 | 30.56 | category/stickers + blog 群 | 大詞深位 |
| G3 | 海報印刷 | 187 | 1 | 24.56 | blog poster-printing-guide（1,006/13/12.8） | 大詞深位，blog 強 PDP 弱 |
| G3 | 月曆印刷 | 166 | 0 | 20.91 | product/custom-calendars（401/7/18.0）+ 2027 月曆 blog 群 | **季節窗 12 月仍有效**，6 個 calendar SKU 無總頁 |
| G3 | 書刊印刷 / 印書 / 書籍印刷 | 155 / 67 / — | 0 | 37.7 / 31.7 | **category/books（656/3/51.6 警報）** | **書刊簇承接頁深位 51.6 = 最大結構缺口** |
| G3 | 宣傳單張印刷 / 宣傳單張 | 145 / 143 | 0 / 0 | 29.2 / 44.0 | **category/flyers（搜索實測第 1！）** | 類目頁 snippet 已冠軍，但查詢層 pos 29-44 → **canonical/查詢歸屬待查** |
| G3 | 包裝盒印刷 / 包裝盒訂製 / 紙盒印刷 / 紙盒訂製 | 75 / 70 / 71 / 66 | 0 | 29-37 | 12 個 box SKU 分散 | **無「包裝盒印刷/訂製」交易總頁**（主營 #1 區域無總承接） |
| G3 | 利是封印刷 / 喜帖印刷 / 易拉架印刷 / 禮盒訂製 | 58 / 50 / 43 / 44 | 0 | 25-48 | red-packet ×6 / foil-wedding-invitations ×1 / roll-up-banners / magnetic-closure-gift-box | 喜帖 −2.31（11-25 首讀唯一大幅改善詞） |

### 2.2 en（第二主戰場）

| 檔 | 詞 | imp | clk | pos | 承接 | 缺口 |
|---|---|---|---|---|---|---|
| G1 | small batch sticker printing | 15 | 0 | 8.27 | product/small-batch-stickers（ja 470/4/13.3，en 承接待 query×page） | E12-E14 FAIL 殘留未清 |
| G1 | doujinshi printing | 63 | 0 | 10.48 | en doujin 簇（organic #1 + AIO 第 1，B3 凍結防守） | 不動 |
| G2 | china catalog printing / catalogue printing china | 112 / 51 | 0 / 0 | 14.9 / 13.6 | **product/catalog-printing 724/1/37.6 vs blog supplier-guide 24h 60 imp** | 主 URL 分工 = en 面第一結構問題 |
| G2 | small batch stickers | 63 | 0 | 14.97 | 同上 | |
| G3 | a2 poster printing | 21 | 0 | 30.1 | en a2-posters | +2.16 惡化 |
| G3 | educational printing / school exercise book printing | 21 / 13 | 0 | 33-34 / 11.9 | en textbooks（527/**0**/68.8 警報） | 教材簇 en 深位零點擊 |

### 2.3 ja（輔助，只列 G1/G2）

| 檔 | 詞 | imp | clk | pos | 備註 |
|---|---|---|---|---|---|
| G1 | ステッカー 小ロット | 42 | 0 | 7.88 | 競品錨點 = Raksul「1 枚から」/ グラフィック「1 枚から翌日発送」/ zeami「1 枚 35 円〜」→ 我方 MOQ 口徑需在 snippet 直給 |
| G1 | 防水ステッカー / ステッカー印刷 小ロット | 41 / 36 | 0 | 11.7 / 11.0 | 同上 |
| G2 | 教材 印刷製本 | 72 | 0 | 46.9 | ja saddle-stitch-booklets 574/1/**57.3** 警報 |
| G3 | コミケ 印刷 | 109 | 0 | 30.1 | 季節 HOLD（12-29 C109 前） |
| G3 | パッケージ印刷 | 76 | 0 | 36.2 | |

> **矩陣結論（三語）**：承接頁「有」但「不對口」的詞 = 即日印刷/即日急件（首頁與 blog 爭）、china catalog printing（PDP 37.6 vs blog）、摺頁印刷（blog 頁一 PDP 未跟）；承接頁「無總頁」的詞 = **包裝盒印刷/訂製簇、利是封印刷、月曆印刷、學校印刷、書刊印刷（books 類目頁 51.6）**——這五個是下兩週「補承接」的候選，但**新建頁屬新功能區（§0.25.10.5 不直推），且核心更新後一週內不宜新建 doorway**，排第二週由 query×page 數據決定做不做。

---

## 3. 競品與搜索習慣（2026-11-25 快照，僅代表當次搜索）

### 3.1 zh-hk

| 查詢 | 當次可見結果 | 我方位次 | 啟示 |
|---|---|---|---|
| 香港 即日印刷 服務 價格 印刷公司 | e-print（24x7）· **智印港首頁** · Bannershop（4 小時特急，週一至五 09-15）· e-banner · PrintShop | **第 2** | 「今晚 6 點前落單」snippet 已在位；追 e-print 的 24x7 不現實，差異化 = 一張起印 + 免費打樣 + $500 免費速遞 |
| 海報印刷 香港 價格 一張 即日 | e-banner（HK$9/HK$11 環保/相紙海報）· e-print · **cpct-copycat「Poster 即日可取」明碼表 A1 $70/A2 $35/A3 $35/A4 $25** | 未見（本次快照前 3） | 競品 snippet 直接給**尺寸×單價表**；我方 a2-posters 811 imp/15 clk 已強，但 meta 未給「A2 一張 $X」型明碼 |
| 宣傳單張印刷 香港 價格 1000張 即日 | **智印港 /category/flyers（10 張起・HK$0.18 起・4 小時打稿・最快即日）** · e-print 柯式價表（1,000 張 $365）· **hkprint58 A4 傳單（抄站）** · PrintShop（A5 $112/1000）· 環球印刷 | **第 1** | 類目頁 snippet 冠軍；但查詢層「宣傳單張印刷」pos 29.2 → 需核 canonical/查詢歸屬；**抄站同屏**（DMCA 階梯證據可加一條） |
| 利是封印刷 2027 訂造 香港 | bynock 攻略（年前 3-4 個月準備）· giftntick（1,000 個起，聖誕前截止）· e-print 利是封 · **智印港 blog cny-2027（100 個起・燙金 HK$1.10-4.80）** | **第 4（blog）** | 競品 MOQ 1,000 vs 我方 100 = **真差異化**，但只有 blog 承接；季節窗 12 月仍有效 |

### 3.2 en / ja

| 查詢 | 當次可見結果 | 啟示 |
|---|---|---|
| china catalog printing company MOQ proofing shipping | printedinchinaonline（24h 響應 / 1-4 週生產 / 1-6 週運輸）· chinapackagingbox（7-10 天 / 禮盒 20-30 天）· book-printing-factory（2-6 週） | 競品 snippet **直給「生產週 + 運輸週」**；我方 catalog PDP 37.6 深位 → 直答塊加「production + international delivery 分開計」是可複製的 snippet 語言 |
| ステッカー印刷 小ロット 安い 10枚から | グラフィック（1 枚から・翌日発送）· Raksul（1 枚から・10 枚單位）· zeami（1 枚 35 円〜・50 枚起）· digitaprint | 日本小ロット賽道錨點 = **「1 枚から」**；我方 ja small-batch 需核 MOQ 口徑能否寫「10 枚から」並在 meta 直給 |

---

## 4. 飛輪架構：5 條車道 × 兩週排程

### 4.1 車道狀態（11-25 晨）

| 車道 | 狀態 | 下兩週觸發 |
|---|---|---|
| ZP-cron-watchdog 06:43 | S4U；**今日 06:43 canary 四方對賬** | 每日 |
| ZP-k3-review 07:10 | S4U；11-24 已出真實報告（PARTIAL） | 每日 |
| ZP-daily-content 21:17 | S4U；**今晚首個合併自然輪** | 每日 |
| ZP-weekly-meta 週五 20:52 | S4U；11-20 guard FAILED 未閉合 | **11-27**（+12-04 月度） |
| ZP-blog-deepfix 週六 23:47 | S4U；最後 OK 11-07 | **11-28**（READY=1） |
| gsc-feedback / monthly-matrix | 已退役（併入 daily / weekly） | — |

### 4.2 第一週（11-25→12-01）· 對比窗內：只做正確性、真值、承接核查、數據管線

| 日 | 車道/執行者 | 交付 | 驗收 |
|---|---|---|---|
| **11-25 三** | K3-admin | ① 06:43 後 watchdog 四方對賬（scheduler/總線/wrapper/報告）② 5 任務 StartWhenAvailable=true（先備份 XML）③ \ZprintPro-CronWatchdog-2125 刪除 | 4 證據齊；Get-ScheduledTaskInfo 不再 0x800710E0 |
| 11-25 | **K3 D1 拍板**：¥7,500 A/B（同人誌起價口徑）+ 喜帖 NT$→HK$ 幣種 | 兩個 P0 的商業真值 | 拍板原話入隊列 |
| 11-25 21:17 | daily | GSC 11-25 批消費（已產出 JSON，直接引用）+ 最多一個 READY 小批（候選：small-batch E12-E14 殘留） | 報告四字段；tsc 0=0；門童全過 |
| 11-26 07:10 | k3-review | 獨立驗收 daily 交付 + 21:17 自然輪證據 | 不寫 src |
| 11-26 | daily（D1 已拍板時） | doujin 價格/單位 P0 + 喜帖幣種 P0 + ja doujin 5 條中文 bullet + WhatsApp 預填 | 線上 E5-E9 復測全 PASS |
| 11-27 20:52 | **weekly** | ① 更新後首週對窗預處理：拉 11-03→11-09 基線（本方案 §1.1 已算）vs 11-25→11-30 回填 ② 最多一個 CTR 單變量**提案**（不執行）③ GEO 固定問題集 ④ query×page 導出申請（K3 真人） | SERP 截圖存檔；不自批 |
| 11-28 23:47 | **blog** | FIX-20261030-BLOG-CERT-PHRASES（唯一 READY；證書簇 blog 詞組修正）或 NO_OP | 12 段質量門；真值；內鏈 |
| 11-29→11-30 | k3-review / daily | H1 首批 6 SKU × 3 語（double-sided-flyers / roll-up-banners / removable-stickers / small-batch-stickers / catalog-printing / saddle-stitch-booklets）**建議值 + 真值審核**（不改 src） | 每頁現值/建議值/真值依據三欄；CSV 源頭改法確認 |
| **12-01 二** | 編排層（本會話或 k3-review） | **合法判讀點**：11-25→12-01 vs 11-03→11-09 週對週 + 11-28 決策包 §A 回填 | 雙方法；回填係數標註 |

### 4.3 第二週（12-02→12-08）· 判讀後變量批：按 12-01 結果三選一

| 12-01 判讀結果 | 診斷 | 第二週主動作 | 不做 |
|---|---|---|---|
| **R1 收斂**：排名回 ≤25、CTR 回 ≥1.6% | 更新後穩態偏好我方 | ① G1 簇 CTR 批（§5.1）② H1 首批 6 SKU 執行（CSV 源頭→生成器→門童 #27）③ 12-05 blog = A1/A2 海報尺寸×材質×急件截稿 | 不動深位大詞 title |
| **R2 持平**：排名 25-35、曝光仍高 | 長尾重分配持續 | ① 承接補缺（§5.2：包裝盒總頁/書刊類目頁修/利是封總頁——**由 query×page 決定做哪個**）② G1 簇只做 snippet 驗證不改 title ③ 12-05 blog = 即日傳單 18:00 通道 | 不新建 >1 個頁面；不批量 title |
| **R3 惡化**：排名 >35 且點擊/日 <10 | 更新後負向 | ① 凍結所有 SEO 變量 ② Lily Ray 型自查：blog 群是否有模板化/近重複（83×3 同構 slug 是嫌疑面）③ 只修正確性 + GEO 實體（Kompass/GBP） | 不反覆改；不新建頁 |
| 共同 | — | 12-04 週五 weekly 月度附加：12 月資源再分配（G3 深位排序 + ja B2 目錄建設裁決） | — |

---

## 5. 詞簇級執行卡（第二週變量批的具體內容）

### 5.1 G1 簇 CTR/snippet 單變量批（R1/R2 適用）

原則：**位置已在頁一門口，只改「被點選」的變量，一次只動一個面**。順序按曝光 × 零點擊：

| # | 詞 | 動作（單變量） | 真值前置 | 驗收 |
|---|---|---|---|---|
| 1 | 食品包裝印刷（144/0） | 首屏直答塊加「MOQ 100 個・HK$X 起・FDA 食品級・5-7 工作天」三行表（對應 11-23 §5 答案真值塊） | products.ts food-boxes 真值已拍板 | 24h 檔查 query→food-boxes 歸屬；14d CTR |
| 2 | 即日印刷/即日急件（99/1） | **主 URL 定一個**（首頁 vs services/rush 頁）— 待 query×page；snippet 統一「18:00 截單・適用品類・附加費按報價」 | 11-23 K3 條件化模板 | 不再三方爭 |
| 3 | a1/a2 印刷 即日（59/0） | a2-posters/a1-posters meta description 加「A2 一張 HK$X 起・即日截稿 18:00」明碼（對标 cpct-copycat 價表 snippet） | a2 價格真值 | 桌面 snippet 截圖 |
| 4 | 透明貼紙印刷（24/0） | transparent-stickers H1 規範化（§5.3 H1 批第二梯隊） | — | — |
| 5 | 2027利是封（13/0） | blog cny-2027 → 6 個 red-packet SKU 的內鏈矩陣補齊（hub-spoke），不新建總頁 | 季節截單真值 | 內鏈 curl 200 |

### 5.2 承接補缺候選（R2 適用；每個都先要 query×page 證據）

| 候選 | 現狀 | 補法（不是 doorway） | 風險 |
|---|---|---|---|
| 包裝盒印刷/訂製簇（282 imp/0 clk/pos 29-37） | 12 個 box SKU 分散，無總頁 | 強化既有 `category/packaging` 類目頁為總承接（明碼階 × 材質 × MOQ × 刀模流程），不新建 | 類目頁 churn |
| 書刊印刷/印書/書籍印刷（289 imp/0 clk） | category/books 656/3/**51.6** | 修 books 類目頁（H1/直答/內鏈到 saddle-stitch/perfect-bound/hardcover 三 PDP） | 深位 51.6 非兩週能回頁一 |
| 利是封印刷（58/0/25.4） | 6 SKU + 2 blog | 季節窗 12 月：blog hub → SKU spoke 內鏈 + 類目頁節慶區塊 | 12-25 後季節衰退 |
| 月曆印刷（166/0/20.9） | 6 SKU + 5 blog | 同上，2027 月曆季節窗 | 同上 |
| 學校印刷（88/0/18.2） | category/educational + blog 群 | 校園 L1 pillar（11 規劃）落實 query×page 後再定 | — |

### 5.3 H1 首批（11-23 §3.3 卡，11-29 建議值、R1 執行）

6 SKU × 3 語 = 18 個 H1；模式 `核心品類詞｜1-2 個主要規格或可驗證差異`；源頭 = `zprintpro-sku-seo-data.csv` → `csv-to-sku-seo.mjs --apply`；排除 certificates/foil-stickers 凍結窗與名片展示層未拍板項；門童 #27 + i18n + brand 全過；7/14 天復測登記。

### 5.4 Blog 深文（12 段骨架 + 真值塊 + targetKeywords + 內鏈 ≥5）

| 槽位 | 選題 | 主承接 | 查詢簇 | 信息增益點 |
|---|---|---|---|---|
| 11-28 | BLOG-CERT-PHRASES（READY） | certificates | 證書印刷 10.1 / 證書用紙 8.3 | 詞組修正，不新寫 |
| 12-05 | A1/A2 海報：尺寸×材質×急件截稿決策 | a2-posters + rush guide | a1/a2 印刷 即日、海報印刷一張 | 把 6 個 G1 零點擊詞收進一篇決策頁；價表 snippet 語言 |
| 12-12（候選） | 即日傳單 18:00 通道：生產/交付差異 | same-day-flyers + category/flyers | 即日印刷、即日急件 | Bannershop 明窗寫法的我方版 |
| 12-19（候選） | catalog China 採購清單：規格×頁數×裝訂×打樣×運輸 | en catalog-printing + supplier-guide | china catalog printing 族 | 「production + international delivery 分開計」直答 |
| ja 專屬 | 不機翻；候選「ステッカー 小ロット 選び方」 | ja small-batch-stickers | ステッカー 小ロット 7.88 | 對標 Raksul「1 枚から」口徑，先核我方 MOQ 能否寫 10 枚から |

### 5.5 三語同構 blog 的淨化（R3 觸發或隨手做）

`rush-printing-hk-guide` / `same-day-flyers-printing-hong-kong-guide` / `mtr-advertising-specs` 出現在 en/ja 站（83/84/83 slug 同構）= §13.10 NAP 脫鈎的跨市場污染嫌疑面，也是 Lily Ray「模板化內容」嫌疑面。處置：ja/en 版要麼本地化重寫（日本/美國即日場景），要麼 noindex/合併到本地對應篇——**由 12-04 weekly 月度盤點後提案，K3 拍板**。

---

## 6. AEO/GEO 面（兩週內可做、不做過頭）

| 層 | 動作 | 依據 |
|---|---|---|
| AEO 真值塊 | 5 個 G1 承接頁（food-boxes / a2-posters / a1-posters / transparent-stickers / small-batch）各一個「答案真值塊」：產品・起訂・材質尺寸・18:00 是否適用・附加費・生產 vs 送達・WhatsApp 傳檔欄位 | 11-23 §5 |
| Schema | 產品摘要已覆蓋 13,016 imp/40.6%（28d），不新增 schema 類型；只核 5 個 G1 頁 Product/FAQPage 與可見真值一致 | §0.36.3 |
| GEO 實體 | Kompass 兩條目 + GBP → `ZprintPro智印港`（§0.39），K3 真人 | 11-28 決策包 B1 |
| GEO 引用 | weekly 11-27 固定問題集（7 簇 × 2 跑）；AI Bots Protection=block 期間 Perplexity 通道記「平台側不可達」 | §0.38.4 |
| 不做 | 不把 AI 爬蟲到訪當排名；不編造認證/客戶數；不在客戶可見內容寫 GSC 數據（§0.23.1） | — |

---

## 7. KPI 儀表板（12-08 終審口徑）

| 指標 | A 段基線 | E 段現狀 | 12-08 目標（口徑） | 停止/回滾 |
|---|---|---|---|---|
| 曝光/日（7d 回填） | 1,075 | 1,702 | ≥1,400（不要求回 A，要求不低於 E 的 80%） | <1,000 連續 3 日 → 重開調查 |
| 點擊/日 | 22.6 | 13.0 | ≥18（回 D 段水平） | <10 → R3 凍結 |
| CTR（7d） | 2.10% | 0.76% | ≥1.5% | — |
| 加權排名（7d） | 13.95 | 33.69 | ≤25 | >35 → R3 |
| G1 簇點擊（14d） | ~2 / 553 imp | — | ≥8 | 0 → 單變量回滾 |
| 車道自然輪 | — | 5/5 待首輪 | 5/5 四方證據連續 7 天 | canary 失敗 → 回滾 XML |
| push 紀律 | — | 11-25 凌晨 1 次 28m39s 違規（已記） | 0 次違規 | — |

---

## 8. K3 真人動作清單（兩週內，按阻塞性排序）

| # | 動作 | 阻塞什麼 | 期限 |
|---|---|---|---|
| 1 | 06:43 後看 watchdog 四方對賬 + 設 StartWhenAvailable + 刪 2125 遺留 | 全部夜間車道 | 11-25 |
| 2 | **D1 拍板**：同人誌 ¥7,500 起價口徑（A/B）+ 喜帖 NT$→HK$ | P0-1/P0-2 → daily 11-26 小批 | 11-25 |
| 3 | GSC 每日三檔 + **query×page 導出**（最新仍 end1031 STALE） | 主 URL 分工（即日/catalog/宣傳單張）、承接補缺決策 | 11-26 起 |
| 4 | 12-01 對比窗資料放檔（11-25→12-01 三檔） | 第二週 R1/R2/R3 判讀 | 12-02 晨 |
| 5 | Kompass + GBP 實體歸一 | zh 面 AI 品牌標籤 | 本週 |
| 6 | D2：doujin title 解凍（「Comiket前24小時特急對應」） | doujin 簇 title 面 | 12-04 前 |
| 7 | 12-04 月度裁決：ja 目錄建設 vs 零投入 | 12 月資源 | 12-04 |

---

## 9. SOP-10 五問自檢

1. **架構差異**：本方案只讀數據與源碼 slug，未改 src/、未改 CSV、未 push；承接矩陣由 products.ts / blog-data 直讀。
2. **約束適用範圍**：title/H1 凍結（K3 11-23）在 11-29 前維持；新頁屬新功能區不直推（§0.25.10.5）；名片展示層 (a)(b)(c) 未拍板不觸。
3. **原數據/拍板來源**：分段對比 = 28d 檔逐日回填值；核心更新完成 = SEJ 2026-11-25；競品 = 當次搜索快照（非排名工具）；無新增業務數字。
4. **字段值策略**：所有 pos/imp/clk 直引檔值；K3 11-24 讀數標「K3 實測」。
5. **Markdown 渲染**：內部 docs，無 user-facing 渲染面。

---

## 附 A：11-25 首讀 → 本方案的增量

| 項 | 11-25 首讀 | 本方案新增 |
|---|---|---|
| 核心更新前後 | 7d 日序列（11-16 起） | **28d 逐日分段 A-F**，A 段基線已算出可直接用於 12-01 對比 |
| 設備 | 未讀 | 移動 11.04/2.30% vs 桌面 21.57/1.39% → snippet 主戰場 = 桌面 |
| 承接矩陣 | 頁面 top 20 | **83 SKU × 83/84/83 blog slug × 用戶詞表** → 5 個「無總頁」+ 3 個「承接不對口」 |
| 競品 | 3 次搜索 | 7 次搜索；**宣傳單張類目頁實測第 1**、利是封 blog 第 4、抄站同屏、ja「1 枚から」錨點 |
| 排程 | P0/P1/P2 清單 | **逐日車道表 + 12-01 三分支 R1/R2/R3** + 詞簇執行卡 |

## 附 B：機器可讀產物

- `.hermes/logs/gsc-2026-11-25-four-window-analysis.json`（四窗口 + 帶錢詞差分）
- `.hermes/logs/gsc-2026-11-25-core-update-segments.json`（28d 逐日 + A-F 分段）
- `.hermes/tmp/analyze_gsc_20261125.py` / `gsc_segments_20261125.py`（daily 車道每批可直接複用）

（完）
