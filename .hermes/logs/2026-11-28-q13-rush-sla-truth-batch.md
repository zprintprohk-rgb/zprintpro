# 2026-11-28 批 Q13 — P0-RUSH-002 即日/交期口径统一

- **依據**：`重要文件/2026-11-28-three-site-homepage-flywheel-four-file-alignment-and-money-word-action.md` §6 P0 表 P0-RUSH-002「blog 100 張起、服務頁 10 張起；服務頁 18:00、A2 HKT 11:00 → 按品類／工藝／稿件與付款時間統一，不創造新 SLA」。
- **用戶指令**：2026-11-28 10:31「按優先級順序 繼續下一步 的最優推薦方案執行」。
- **commit**：`f3148d48`（已 push `05e00db2..f3148d48`，今日第 9 次 push）。
- **執行腳本**（留盤）：`.hermes/_tmp-q13-rush-truth.js`。

## SSoT（唯一運營口徑）

`products.ts` 即日傳單 SKU（L2414–2420，c18107a0 期最詳細口徑，三語一致）：
**10 張起；10–99 張常規 3–5 個工作天；100 張或以上 HKT 11:00 前確認稿件可即日急件（A4 上限 200 張／A5 上限 400 張）。**

## 舊值 → 新值（16 處，全部收斂到 SSoT，零新 SLA）

| # | 位置 | 舊值 | 新值 | 問題性質 |
|---|---|---|---|---|
| 1 | products.ts A4 傳單 zh desc | 48小時交貨 | 100 張+ 11:00 前可即日（A4≤200/A5≤400），常規 3–5 工作天 | 無來源且與 SSoT 矛盾 |
| 2 | products.ts A5 傳單 zh desc | 48小時交貨 | 同上 | 同上 |
| 3–8 | products.ts 傳單 features ×6 | 【即日可取】數碼印刷急單當天交付（無條件） | 【即日急件】100 張+ HKT 11:00 前確認稿件可當天交付（上限） | 無條件承諾 |
| 9–13 | products-content.ts 印刷工藝說明 ×5（傳單族 5 塊） | 即日急件支援 4 小時取件，建議上午 11 時前確認稿件 | 當天交付：100 張+、11:00（HKT）前確認稿件（A4≤200/A5≤400） | 「4 小時取件」全站無任何來源 |
| 14 | products-content.ts ja 塊 | A4 サイズ 1〜50 枚は当日仕上げ | 100 枚以上は午前 11 時（HKT）までにデータ確定で当日仕上げ | 閾值 50 與 SSoT 100 矛盾 |
| 15 | products-content.ts ja 塊 | 500 枚未満、午前 11 時データ確定で当日仕上げ | 100 枚以上・上限 A4 200/A5 400 | 閾值 500 與 SSoT 100 矛盾 |
| 16 | product-faqs.ts 急件收費 FAQ zh | 即日 4 小時取件加收 HK$80–150（視產品類型） | 即日急件（100 張+、11:00 前）可當天交付，附加費以報價確認為準 | 加價 HK$80–150 無引擎/任何來源 |

**未動（單變量紀律）**：免運聲明（全港速遞免費 / 48 小時快遞免費）= 另一變量，留運營聲明驗真批；.bak 文件 10 處殘留（豁免）。

## 兩層服務模型差異（列 K3 決策項，本批不動）

- **即日取層**（SKU 口徑）：100 張+、HKT 11:00 前確認稿件 → 當天交付（自取/速遞）。
- **翌日達層**（rush 服務頁 `rush-printing-delivery`，K3 卡 grep 釘死）：18:00 截單 → 通宵印刷 → 順豐翌日 12:00 前送到，急件適用傳單 50–1000 張。
- 兩者為不同服務層可並存，但 rush 頁標題「即日印刷・即日急件｜18:00 截單・翌日 12:00 送到」對「即日」一詞的使用與 SKU 即日取層易混淆；且 ProductPageV9 L462「1-5 張最快即日，18:00 截單翌日中午前」阈值（1–5 張）與 SSoT（100 張+）矛盾。均列 K3 拍板，不自作主張改 K3 卡釘死頁面。

## 驗證

- 本地：tsc 0 / encoding 0（3 文件 UTF-8 LF）/ 簡體 0 / brand-mentions PASS / content-guard red=0 / 門童 0 red / RULE-TRANSLATION-GUARD 0。
- 殘留掃描：`4 小時取件`/`【即日可取】`/`48小時交貨` 活文件全 0（僅 .bak 豁免）。
- 線上：push 後輪询 en/zh PDP（A4 傳單 features + FAQ）。

## 三补、Q13b — 派生层同步（commit `fdfec49f`，今日第 10 次 push）

线上验收 Q13 时发现 `name="description"` meta 仍输出旧「48小時交貨」——残留不在活 products.ts，而在 **派生层 `sku-seo-data.ts`**（SOP-5：派生文件禁手搓，须回源头）。处理：
1. 改源頭 `zprintpro-sku-seo-data.csv`（a4-flyers / a5-flyers 行 zh description）→ 與 products.ts Q13 SSoT 一致。
2. `node scripts/csv-to-sku-seo.mjs --apply` regen 83 塊，五道斷言全 PASS；期間發現生成器**誤吞 place-cards K3 拍板註釋**（0e3c25d2 出處），已手工恢復並在註釋中留痕。
3. 磁吸翻蓋禮盒 title「48小時交貨」（sku-seo-data L2374）= 包裝類目，屬運營聲明驗真批，本批不動。
4. 線上實測：zh a4-flyers 舊 meta=0／新 SSoT=3、ja small-batch-stickers 新閾值=2、zh 內容塊=2、ja a4-flyers=2，全部生效。

## 欠账更新

1. K3 決策：rush 頁兩層模型標注（即日取 vs 翌日達）+ ProductPageV9「1-5 張最快即日」閾值。
2. 引擎 FINISHING_COSTS 與標籤價不一致（Q12 遺留）。
3. 運營聲明驗真批：免運（全港速遞免費/48 小時快遞免費）、FSC、畫冊/學校/畢業紀念冊的「48 小時」聲明逐條對 products.ts（全站僅 4 SKU 有 turnaround 字段）。
4. `disposable-menus` 孤兒塊。
5. 婚慶簇反向鏈路 GSC 觀察窗。
