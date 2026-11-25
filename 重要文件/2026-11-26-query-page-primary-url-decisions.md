# query×page 主 URL 決策矩陣（2026-11-26 · API 首拉 · G2/G3 堵點解除）

> **性質**：docs-only 分析交付；解堵事項 = 對齊包「query×page end1031 STALE」→ 現已由 **GSC API 直拉**取代手工導出（STALE 解除）
> **數據**：`GSC数据/gsc-query-page-28d-end1123-api-2026-11-26.csv`（2,357 行，10-27→11-23，與 11-25 `(2)` 權威批同窗）· `gsc-query-country-28d-end1123-api-2026-11-26.csv`（2,221 行）· `gsc-query-page-28d-freshest-api-2026-11-26.csv`（2,274 行，最新窗）
> **路徑**：`scripts/fetch_gsc_data.py` 經代理 **127.0.0.1:7890**（實際監聽端口；腳本默認 7892 未啟動，用 `GSC_PROXY` 環境變量覆蓋即可，腳本無需改）→ 每日三檔可由 daily 車道自動化

---

## 0. 執行摘要（5 條）

1. **香港異常推翻（更正昨日報告 §0.5）**：API query×country 證實 **hkg = 7,591 imp / 54 clk，是本站第一大市場**（> usa 3,224 + jpn 2,392 之和）；xlsx 國家表無香港行是**導出匿名化截断**，不是流量問題。zh-hk 大詞幾乎全部來自香港本地（貼紙印刷 223imp hkg · 海報印刷 185 · 月曆 175 · 食品包裝印刷 145 @ **pos 9.4**）。
2. **即日印刷簇主 URL 已定（實測）**：承接 = **blog `/zh-hk/blog/rush-printing-hk-guide/`**（即日印刷 50imp/9.26 + 即日急件 33imp/9.58 + 海報印刷即日 20imp/9.55）；rush 服務頁對「即日印刷」僅 1 imp/pos 57。Google 已投票——**不扶正、不 301**；策略 = blog 做承接強化 + 服務頁做轉化落點。
3. **catalog 族「en 第一結構問題」结案**：PDP 與 supplier-guide blog 是**分工不是互食**（wholesaler 黑馬詞 18imp/4.94 100% 歸 blog；china catalog printing 67/18.12 PDP vs 65/15.15 blog 各半）——**禁止 301/canonical/砍頁的預判成立**，打法 = blog 補直答+內鏈、PDP 補交易信號。
4. **新發現三連**：① **C109（Comiket）= 隱藏大詞**——`/zh-hk/comiket-c109/` 284imp/10.29 + 「c109 日期」147imp/9.63，冬季 Comiket 季節窗在即，431 imp @ 頁一門口零點擊；② **易拉架 = 命名不對口**——港人搜「易拉架」全部流向 blog（35imp/19.69），PDP `roll-up-banners` 名叫「易拉寶」零承接；③ **ja PDP 承接全部對口**（卓上カレンダー→desk-calendars · カタログ印刷→catalog PDP 8.18 · ラベル小ロット→small-batch 6.97 · 食品パッケージ→food-boxes 6.35）。
5. **宣傳單張歸口確認**：主承接 = `/zh-hk/category/flyers/`（127imp/42.39 + 140imp/28.96），快照「類目第 1」與 GSC 歸口的矛盾消除——類目頁就是歸口，問題是深位權威，不是歸屬。

---

## 1. 主 URL 決策矩陣（實測承接 · 28d end1123）

| 簇 | 詞（imp/pos） | 實測主承接 | 第二承接 | 決策 | 動作 |
|---|---|---|---|---|---|
| 即日簇 | 即日印刷 50/9.26 · 即日急件 33/9.58 · 海報印刷即日 20/9.55 | **blog rush-printing-hk-guide** | service-areas（即日急件 14/5.29）· 首頁（14/13.7） | **主 URL = blog**；服務頁不扶正 | blog 直答塊+WA 欄位補齊；blog→服務頁內鏈強化為轉化路徑 |
| catalog 族（en） | china catalog 67/18.12+65/15.15 · catalogue 40/15.12+42/14.26 · wholesaler 18/4.94→blog | **雙承接分工**：blog=信息/批發詞 · PDP=交易詞 | — | **不合併**，分工強化 | blog 加直答（MOQ/時程分界）+內鏈 PDP；PDP 強化交易信號 |
| 食品簇 | 食品包裝印刷 PDP 141/15.25 vs blog 137/7.98 · 食品印刷 blog 93/5.78 vs PDP 89/12.27 | **blog 位次領跑** · PDP=交易落點 | category/packaging 15/38.33 | 雙承接健康，不動結構 | 批2 已批 food-boxes PDP 直答塊；blog 補 PDP 內鏈錨 |
| 宣傳單張 | 宣傳單張 127/42.39 · 宣傳單張印刷 140/28.96 | **category/flyers** | a4/a5-flyers PDP（52-84 深位） | 歸口=類目頁 | 類目頁權威工程（G4 中期），不進兩週承諾 |
| 月曆 | 月曆印刷 141/15.96 | **product/custom-calendars**（PDP 主承接，非類目 39.01） | category/calendars | 主 URL=PDP | PDP 季節真值（截單/交付）核查後直答塊候選 |
| 紙袋 | 紙袋印刷 blog 64/22.22 · kraft 60/14.70 · handle 59/20.24 · 邊度有紙袋買→handle-bags 22/4.23 | **blog+kraft+handle 三分** | category 51/33.84 | 白話詞歸 handle-bags | 探針 C4 #10 互證；handle-bags 直答候選（白話 FAQ） |
| 學校 | 學校印刷 category 43/26.26 · school-flyers 43/18.53 · blog 9/5.89 | category/educational | school-flyers PDP | 先觀察 | 復測後定，不新建支柱頁 |
| 利是封 | 利是封印刷 category 39/30.15 · blog cny-2027 23/24.83 · PDP 5/14.40 | category/red-packets | cny blog | 季節窗沿用 | blog→類目內鏈；季節截單真值 |
| 書刊 | 書刊印刷 blog 130/36.20 · category/books 124/65.36 · saddle PDP 102/53.47 | blog book-buying-guide | books 類目 | 全深位，G4 工程 | 信息分工修整（中期），不進兩週 |
| 印刷公司 | 140/30.19 | blog hong-kong-printing-guide | 首頁 22/27.05 | 品牌權威工程 | 中期 |
| 易拉架 | 易拉架 blog 30/32.67+12/11.08 · 易拉架價錢 35/19.69 · 澳門易拉架size 31/3.61 | **blog 100% 承接 · PDP 零承接** | — | **命名不對口**：PDP 叫「易拉寶」 | 見 §2.2 |
| en 點名詞 | small batch sticker 14/6.07→PDP ✓ · doujinshi 61/10.26→PDP ✓ · cheap die cut 14/5.71→die-cut PDP ✓ · 105x140mm perfect binding 9/10.0→perfect-bound PDP ✓ | 全部對口 | — | 健康 | 維持；small-batch 待 snippet 批 |
| ja 點名詞 | ステッカー小ロット 43/8.35 · ラベル小ロット 29/6.97→small-batch · カタログ印刷 11/8.18→catalog · 卓上カレンダー 22/15.64→desk-cal · 食品パッケージ 17/6.35→food-boxes | 全部對口 | — | 健康 | ja 直答塊適配等「10 枚から」真值 |

---

## 2. 三大新發現專節

### 2.1 C109 = 被忽視的季節大詞（431 imp @ 頁一門口）

- `c109` 284imp/1clk/pos 10.29 + `c109 日期` 147imp/0clk/pos 9.63 → 全部歸 `/zh-hk/comiket-c109/`（同人展專題頁）。
- **時效性**：冬季 Comiket 在 12 月末（具體日期以站內專題頁為準）——距開展約 5 週，同人誌急件需求進入爬坡期；doujinshi printing（en）61/10.26 與 ja コミケ 印刷 105/30.73 是同族需求。
- **動作建議**（季節真值先行）：① 專題頁直答塊（截單日/生產天數/會場或順豐交付分界，全部用已拍板真值，不寫硬承諾）；② 專題頁→doujin PDP 內鏈檢查；③ 列入 11-27 weekly 讀窗與 12-04 月度季節覆盤。**不新建頁**。
- 注意：ja `コミケ 印刷` 105/30.73 深位，zh-hk C109 頁 pos 10 已是三語最好資產——zh-hk 頁是該簇旗艦。

### 2.2 易拉架 = 命名不對口（PDP 零承接）

- 港人搜「易拉架」（+價錢/+size/澳門），實測 100% 流向 blog；PDP `roll-up-banners` 的 zh-hk 名 =「易拉寶」（台/陸用語），28d 對「易拉架」族 **0 imp**。
- **打法**（不動 slug、不動 title 凍結面）：在 PDP zh-hk 正文/H2/FAQ 自然加入「易拉架」同義詞對照（如「易拉架（易拉寶）」），blog 補指向 PDP 的內鏈（錨文本含「易拉架價錢」語義）。屬內容面單變量，放行門後或併入批2 尾批。
- 澳門查詢（31imp/3.61）顯示跨境需求真實存在：不建澳門頁，在 PDP/blog 直答寫順豐澳門送達真值（以報價確認）。

### 2.3 香港 = 第一大市場（更正）

- 昨日報告「28d 國家表無香港 = 異常待核」→ **今日 API 證偽**：hkg 7,591imp/54clk 居首；異常在 xlsx 導出匿名化，非流量。原報告 §0.5 標記更正，不抹歷史。
- 啟示：zh-hk 主戰場定位被數據再確認；CTR 修復的主戰場 = **香港×桌面**（早前設備層結論疊加）。
- 附带：API 拉取常態化後，每日三檔 + query×page + query×country 都可由 daily 車道自動消費（代理 7890 在服務態運行，開機自啟待確認——若代理非開機自啟，列入管理員收尾清單第 4 項同批處理）。

---

## 3. 對已批批 2 的影響（直答塊）

1. **food-boxes PDP 直答塊（批2 首頁）**：決策不變；額外發現 = 食品 blog 位次領跑（7.98/5.78）→ blog 側補「→PDP」內鏈錨即可，blog 直答塊不在本批（避免雙變量）。
2. **即日簇不在批2**：正確——blog 主承接的直答塊屬下一批候選（需先對齊 blog 12 段骨架與 rush 頁 18:00 口徑，現已獲 SSoT 確認）。
3. **wholesaler 詞承接 = supplier-guide blog**：en 直答塊下一批候選 = 該 blog（不是 catalog PDP）。

---

## 4. 數據來源與自檢

```
数据来源:
- GSC API: scripts/fetch_gsc_data.py 經 GSC_PROXY=http://127.0.0.1:7890（7890 實測監聯通 Google；腳本默認 7892 未啟動）
- 三檔: query,page ×2（end1123 對齊批 2,357 行 / freshest 2,274 行）+ query,country（2,221 行），落 GSC数据/
- 交叉: 與 11-25 (2) xlsx 28d 查詢表抽詞比對（食品包裝印刷 156 vs API 族合計一致方向；位次口径 API=查詢×頁面加权，xlsx=查詢加权，不混算）
校准状态: 🟢 已校准（API 官方數據源；服務帳號 zprintpro-gsc-reader 唯讀）
```

**SOP-10 五問**：① 架構：沿用現有腳本+CSV 落盤，未新建管線；② 約束：query×page 到位前禁 301/canonical 的門禁已遵守，本檔結論全部基於實測承接；③ 來源：GSC API 官方數據，檔名+窗口如上；④ 字段：無價格/真值新增，命名建議不動 title 凍結面；⑤ 渲染：內部 docs，無 user-facing 變更。

> **下一步**：C109 季節直答塊 + 易拉架命名對口可併入批2 尾批或列 11-27 weekly 提案；API 每日自動拉取接入 daily 車道（替代手工導出節奏）。
