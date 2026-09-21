# K3 一次性拍板單 · 2026-09-21（10:52 全項拍板 · 11:2x 落地回填）

> 整理來源：sibling 報告 §8.4 六項 + 本日 08:21 / 08:36 / 08:43 / 09:06 / 10:52 對話拍板鏈。
> 規則依據：§0.34.2（K3 最新拍板 > 一切）；§0.23（無源不編）。
> 本版 = 終態回填：每項標「✅ 已落地（commit）/ 📊 數據待 K3 拍 / 💡 推薦待 K3 裁」。

---

## A. 已拍板已落地（08:21 批 + 10:52 修正）

| # | 事項 | 拍板內容 | 落地 |
|---|---|---|---|
| A1 | 成立年份 | **2012 年**（K3 10:52 終裁：08:21 拍板 2014「上一次拍板错了」，確認 2012；根 llms.txt 一直 2012 屬正確） | ✅ a4e93b10：gen-llms 三語 2014→2012 + 重生成（99 SKU ×3 語斷言全過） |
| A2 | MOQ 三類目 | banners 1 張起（噴繪一張起印）· posters 1-10 張 · calendars 數碼 1 本起 / 批量 300 起 | ✅ llms 層 57326ec9 對齊全口徑（線上三語各 7 命中實測） |
| A3 | llms-zh-hk 地址 | K3 08:43 二次拍板：就用新蒲崗地址；站內 legal/footer 實體註冊層（§0.32）維持深圳不動 | ✅ daf12bbd 已恢復（線上複驗通過） |

## B. 衝突項 — ✅ 全消解（11:0x 複核）

| # | 事項 | 結果 |
|---|---|---|
| B1 | MOQ 全站統一批 | ✅ **全消解**。banners（668e81ee）+ calendars（85c42e5e）+ posters 3 SKU（**75dce3f7**，K3 10:52「1张起」）：outdoor/display/adhesive 引擎 100→1 + quantities 階梯 100/500/1000→1/3/5/10/20（照 a1-posters 圖案）+ adhesive 賣點行 100→1 張起印 + 三語 SEO（6 條標題 band 全 OK，ja 掉帶補「短納期」鉤）+ marathon 博客 ×3 語 + real-estate en + 轉換塊標題 100 張起→1 張起（54 規則，殘留掃描全綠，tsc 54=基線）。a2-posters 引擎=10 未動（1-10 拍板範圍內） |

## C. 六項拍板單 — 全部有裁決（10:52）

| # | 事項 | K3 裁決 | 狀態 |
|---|---|---|---|
| C1 | E5 案例位 / E-E-A-T 信源 | 「不清楚说的是什么，真实 LinkedIn URL没有，不填」 | ✅ 不填。段6/段7 存量 FAIL 維持，待 K3 日後給 008 案例庫（現 008 台账只有計數/來源/品類分佈，無行業+用量+結果一手案例）或批批量標「待校准」 |
| C2 | E6 sticker 段3 問句化 | 「授权」 | ✅ 81e6bdc5：sticker-material-pvc-vinyl-removable ×3 語 7 條段錨問句化，段3 FAIL→PASS（60%/60%/60%，含邊際餘量） |
| C3 | E7 博客標題 16 OUT | 「独立轮授权」 | ⏳ 授權收到，獨立輪執行（另排，不佔本批） |
| C4 | ISO 9001 真偽與處置 | 「就这样描述，不补证书号，谁拿证书号放网上」 | ✅ 維持現狀描述，不補證書號。守衛 CRED_ISO_9001 維持 shadow 觀察 |
| C5 | faqs[].a 39 處疑似死數據 | 「回 CSV 源頭重生成，给到我数据我拍板」 | 📊 **數據已備好（§附錄 C5），待 K3 拍** — 關鍵發現：現行 方案 C 生成器明定 faqs 為 ts 權威例外域（regen 不碰），回灌需先擴權威域 |
| C6 | GA4 / 008 讀數開放 | 「这些是有给到的，怎么反复这个问题，没能力做就不要做」 | ✅ 不再問。已核實：K3 2026-09-08 拍板 #5-B 人工台账停用，**询盘单源走 GA4（G-248QMCT2S3，已接线）**；sibling KPI 基线台账 DELIVERY/zprintpro-kpi-baseline-ledger-2026-09-21.csv（S-01~S-05 至 09-18）已存在 → R-06 回填直接用，不重新要權限 |
| C7 | KPI 台账是否入 docs/ | 「给到推荐」 | 💡 **推薦：入**。鏡像進 `docs/ops/kpi-baseline-ledger.csv` 納版本控制（SSoT 唯一、換機不丟、可 diff），DELIVERY 原件留作工作副本。理由：.hermes 已 200+ 雜檔不宜再當 SSoT；KPI 基线是戰略資產應隨倉庫走。待 K3 一句「准」即鏡像 |

## D. 沿線四項 — 按最優推薦執行完畢

| # | 事項 | 最優推薦與執行 |
|---|---|---|
| D1 | 根 llms.txt 滯後 | 年份部分消解（2012 本就一直正確，A1 終裁後無衝突）。16 類/99 SKU 補表仍滯後（根文件含 GEO 戰略段需手工併）→ 登記下批，與 E7 獨立輪同批處理 |
| D2 | robots.txt `/{locale}/` 模板行 | ✅ 最優=**刪除**（a4e93b10）。middleware L192 對字面 `/{locale}/` 路徑 301→/en，Disallow 反而擋住爬蟲發現 301；刪除讓歸一生效。嵌入生成物 sitemap-content.ts 已同步，tsc 54=基線 |
| D3 | llms 舊檔欄位保留（營業時間/運營責任者） | ✅ 最優=**不保留**。舊欄位無拍板來源（運營責任者為未核實數據），§0.23 無源不編；新檔精簡口徑維持 |
| D4 | brand-guard 多語生成器誤報治本 | ✅ 最優=**守衛豁免**（db7a6983）：common.js 加 `isGeneratorScript()`，brand-guard 的 BRAND_LOCALE_MISMATCH 與 i18n-guard 的 locale 作用域類規則（I18N_CURRENCY/I18N_POLLUTION*）對 `scripts/` 生成器豁免；產出檔（public/ src/data/）照常掃描。實測 gen-llms 誤報 0、其餘規則照掃（JA_ALTERNATE 仍報） |
| D5 | decision-register 存量紅 | ✅ 最優=**歷史掩碼**（644e6802）：虛假電話 `+852 **** 8890`、FSC 證號 `FSC-C******` 掩碼（保留審計意義）；兩處雙品牌歷史引用改不觸發字面配寫法。門童複掃 register **0 red**，register 恢復可提交，#22/#23 已登記 |

---

## 附錄 C5 · faqs 死數據普查（給 K3 拍的數據）

**ts 側實查（sku-seo-data.ts）**：114 條 faqs / 63 SKU（sibling 報告「39 處」口徑偏小，實際全量 114）。
- **零消費者實證**：import 它的 `page.tsx` / `products.ts` 對 `.faqs` 使用 = 0；線上 FAQ 走 products.ts `faqSchema`。
- **內容劣質**：68/114 非問句形式（關鍵字碎片對，如「防水ステッカー→耐久ラベル」）；語言錯位（ja 假名 62 / 純拉丁 11 / CJK 41 混雜）；q/a 欄錯置（如 removable-stickers q 是句子、a 是標題「專業可移貼紙(無殘膠)服務 | 智印港」）。
- **CSV 源頭實查**：75 行 × 6 FAQ 欄（全中文，450 格全滿），質量正常（真問句+真答案）；個別答案 MOQ 口徑滯後（如 transparent-stickers「100張起訂」，現行引擎=10），回灌前須過門童 #24 校對。

**三選項（請 K3 拍）**：
1. **清空 ts faqs**（推薦）：死數據+零消費+劣質，清掉一了百了；FAQ 結構化數據未來走 products.ts faqSchema（已有消費者）。
2. **CSV 中文 FAQ 回灌 ts**：需先把 faqs 納入生成器覆蓋域（改 方案 C 權威域劃分）+ 75 行 MOQ 口徑校對 + 僅中文（en/ja 無源）。工作量中，產出仍無消費者。
3. **豁免台账**：保留現狀，登記 blog-12seg-accepted-deviations / 活書 §5 為已知死數據，門童計數豁免。

---

數據來源：K3 2026-09-21 08:21 / 08:36 / 08:43 / 09:06 / 10:52 對話拍板原文 · sibling 報告 §8.4 · commit 668e81ee/85c42e5e/57326ec9/daf12bbd/75dce3f7/a4e93b10/db7a6983/644e6802/81e6bdc5 實查 · faqs 普查腳本實測（.hermes/_faq-census-20260921.json）· .hermes/sop/008-inquiry-ledger.md（K3 9/8 #5-B 拍板）· DELIVERY/zprintpro-kpi-baseline-ledger-2026-09-21.csv。
校准日期：2026-09-21 08:45（首版）→ 10:25（B1 消解）→ **11:25（10:52 十項拍板終態回填）**。
