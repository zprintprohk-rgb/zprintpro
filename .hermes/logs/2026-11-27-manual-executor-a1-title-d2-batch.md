# 2026-11-27 人手執行報告 — A1 title 面 D2 批提前執行（42dd2e43）

**VERDICT**: PASS（六 URL live 驗收全過）
**CONSUMED**: 執行卡 `重要文件/2026-11-27-a1-title-face-d2-unfreeze-execution-card.md`（K3 11-27 05:34「三條併入」+ 05:41「調成現在就或下一個 push 窗口就上線」）
**DELIVERED**: commit `42dd2e43`（4 files, +29/-14）→ origin main → CF Pages build success → live 探針全過
**NEXT**: WARN 27 條分組批（見文末）；G1 批2 六問真值對照 11-27 18:17 daily 車道自走；11-28 D2 窗口本批已提前消化

数据来源: sku-title-v5-audit-2026-11-26.json（門童 #27 staged 審計）· products.ts L2471-2575（a1/a2 真值）· 線上 rush 服務頁二輪復測（2026-11-26 12:1x，草案 §1）· live 探針六 URL 實測（2026-11-27 06:0x-06:1x，帶瀏覽器 UA）
校准日期: 2026-11-27（title 當量以門童 title-equiv.js staged 審計為準）

## 一、本批變更（42dd2e43）

| 項 | 內容 | 驗收 |
|---|---|---|
| a1-posters 三語 title | zh「A1 大幅海報印刷 厚紙柯式 \| 1張起印 4小時打稿 \| 智印港」(eq53) / en「A1 Large Posters \| 594×841mm Offset \| 1 MOQ \| ZprintPro」(eq55) / ja「A1 ポスター \| 防水 DHL配送 オフセット \| 1枚〜 \| ZprintPro」(eq57) | live title 已生效；舊 HK$20起 / $4.60（title·meta）/ ¥600〜 字面量 = 0 |
| a2-posters zh-hk | 補「1-2天」(eq48→53) | live 生效 |
| art-posters zh-hk | 補「A1/A2」(eq55) | live 生效 |
| small-bags ja | title 補「DHL 2-4日」(eq57) + body 殘缺句「 fast delivery.」修復 | ⚠️ 死面（見 §三 N 項） |
| WA 模板 A2→A1 | posters 品類 whatsappTemplates[0] 三語 尺寸【A2】→【A1】 | live wa.me 預填解碼 = 尺寸【A1】/ size [A1] / サイズ[A1] ✅ |
| G1 批1 頁3 直答塊 | Variant A 落 a1-posters zh-hk 首屏（data-direct-answer 塊，A1 默認檔對齊） | live 可見 + RSC payload 各 1（共 2 命中 = 正常雙通道） |

## 二、門禁（執行前逐項）

1. `npx tsc --noEmit` = 0 err ✅
2. title-v5 門童：HARD=0；4 SKU 新當量全落 50-57 ✅
3. title-band 門童（#25）：0 硬攔 ✅
4. 六門禁 + brand-mentions --strict（exit 0）+ encoding（UTF-8 LF）全綠 ✅
5/5b. live 探探針（帶瀏覽器 UA，裸 curl 會被 CF 403）✅
6. 單變量聲明：本批 4 SKU 各自獨立；WARN 其餘 27 條未混入 ✅

## 三、登記與邊界

- **N 項（新發現）**：`small-bags` 與 `seo` 是 sku-seo-data.ts 僅存的 2 個 ts-only 孤兒鍵（CSV 83 行 / ts 85 鍵；生成器舊註釋「CSV 91 + ts-only 1」已不準）。兩者均無 products.ts 產品、無 PDP——`/ja/product/small-bags/` live 308 → `/ja/category/paper-bags/`。→ small-bags 本批修復 = **死面衛生，零 live 影響**；`seo` 鍵內容是 fruit-food-label-stickers 的重複副本，同死面。兩鍵 8 條 WARN 屬死面噪音，建議下一批連同孤兒鍵清理一次消掉。
- en a1 PDP 購買塊仍顯示 `$4.60 × 1` = 引擎實時換算值（HK$20×0.23），非本批 title 面範圍，不動。
- certificates / foil-stickers 凍結槽未動；N5/N6 維持登記待 12-04 復盤。
- 價格卡 29-45（HK$29/HK$45 錨）live 仍在 ✅（卡片邊界「pricing.ts:1016 不動」遵守）。

## 四、WARN 27 條分組批執行結果（K3 06:11 指令，本報告交付前已完成 → WARN 27→20，HARD=0）

| 組 | 原條數 | 結果 | 說明 |
|---|---|---|---|
| 死面孤兒 small-bags×3 | 3 | ✅ 已消 | 刪 ts 孤兒鍵（唯一真孤兒；實證 /ja/product/small-bags/ 308→/ja/category/paper-bags/） |
| 「seo」×5 | 5 | ⚠️ 誤判糾正 | **重大發現**：審計鍵「seo」實為 `fruit-food-label-stickers` 條目 0-indent 歷史畸形（tsc 合法、生成器容忍），被門童誤讀為頂層鍵。其為 **live PDP**，且三語 body 自相矛盾（zh「500 張起」/ en「100-piece minimum」/ ja「100 枚から」+ FAQ 又寫 500）——真價格矛盾，登 N7 待 K3 價格真值裁決，不擅自改 |
| MOQ_DRIFT 賀卡×4 | 4 | ✅ 已消 | premium-en 原已 10 MOQ；zh×3 改「10張起 HK$1起 / HK$1.1起」（=products.ts basePrice 真值；批量錨 HK$100-180/100張 由引擎顯示層承接）。三槽終稿當量 56/56/51 全過 50-57 |
| LONGTAIL_SOURCE | 13 | ⏳ 待考古 | 需 GSC query×page（7890/7892 代理啟動後）逐槽註 L2 來源或換 DELIVERY 詞庫命中詞 |
| FROZEN_FILLER_WORD certificates×2 | 2 | 🔒 不動 | 凍結槽只讀（邊界） |

**剩餘 WARN 20 = LONGTAIL 13 + 凍結 2 + N7（fruit-food 5）**。N7 是下一個正確性 P0：三語價格矛盾直接違 §0.23，建議 K3 拍板 basePrice/MOQ 真值後一併修 title+body+FAQ。

**執行中教訓（入賬本 #19）**：① sku-seo-data.ts 有 0-indent 歷史畸形鍵（fruit-food-label-stickers），任何「頂層鍵」正則匹配必須帶前導空格校驗 + 鄰鍵邊界斷言，裸 brace 計數會被字符串內括號騙；② 誤刪後 tsc 立即報缺 seo 屬性，恢復走 _bak-sku-seo-before-* 備份零損失；③ 門童審計以縮進識別槽位，畸形縮進會造出虛假「seo」槽——審計 WARN 必須回溯 ts 源結構再定批。

## 五、SOP-10 五問自檢

1. 架構差異：改前查證 small-bags 消費鏈（skuSeoData 僅 PDP page.tsx getSkuSeo 消費）→ 發現死面，如实登記 ✅
2. 約束適用：凍結槽 certificates/foil-stickers 未動 ✅
3. 來源：全部數字來自 products.ts / 門童審計 / live 實測 ✅
4. 字段值策略：無證書類字段變更 ✅
5. Markdown 渲染：直答塊用 JSX 組件渲染，無 user-facing [text](url) 裸語法 ✅
