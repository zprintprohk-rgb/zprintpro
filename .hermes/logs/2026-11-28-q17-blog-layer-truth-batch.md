# 2026-11-28 Q17 blog 層驗真批（48h / FSC / 免運承諾真值化）

- **批次**：Q17（K3 2026-11-28 16:17 批准「你說 OK 就開工」）
- **執行**：Kimi Work 人手會話
- **VERDICT**：OK（push `ec714edf`，5 文件 +120/−120）
- **CONSUMED**：Q16 欠賬清單 + shipping.ts / products.ts 真值 SSoT
- **DELIVERED**：三語 blog-data + blog-posts.ts + buying-guides.ts 承諾句真值化

## 1. 真值 SSoT（本批驗真基準）

| 主題 | 真值 | 來源 |
|---|---|---|
| 香港免運 | **滿 HK$500**（港九新界）順豐免運，非無條件 | `src/lib/quote-engine/shipping.ts` FREE_SHIPPING_THRESHOLDS.local=500 |
| 美國免運 | 滿 US$99（≈HK$775，2026-07-18 K3 拍板） | 同上 north_america=775 |
| 日本配送 | 無「全國免運」真值；運費見積確認 | 同上 asia_pacific 門檻 HK$1500，無日本專屬免運 |
| 交期 | 全站僅 4 SKU 有 turnaround 字段（均 5-7 工作天）；無任何 SKU 有 48h 交期 | `src/data/products.ts` L6505/6564/6619/6722 |
| FSC | 僅牛皮紙袋（可選 FSC 認證牛皮紙）、環保紙袋（FSC 再生認證）2 SKU 有依據 | products.ts L1371/1658-1670 |

## 2. 變更統計（commit ec714edf）

### zh-hk.json（blog 層 213 命中 → 全部處置）
- **FSC**：boilerplate『【FSC 認證紙】FSC 認證紙材，配大豆油墨環保選項。』×11 →『指定品項（牛皮紙袋、環保紙袋）可選…』；散點 24 處（certificate-printing 的「已通過/編號/持證」、wedding-invitation、childrens-picture-book「我們採用」、photo-book「紙材全部用」、christmas-card「係標配」、rush-printing「覆蓋全系列」等）→「指定品項可選」口徑。
- **免運**：31 處補門檻——『順豐本地港九新界免運』×22 →『滿 HK$500』；『港九新界免費速遞』×4；『Free Shipping HK$99』→『滿 HK$500 順豐免運』（HK$99 門檻為假值）；『DHL $99 免運』×3 →『DHL 美國滿 US$99 免運』；baby-product/ecommerce 無門檻句補條件。
- **48h**：6 處改條件句——catalog-printing-guide（畫冊）×2『限簡單裝訂・少量』；textbook-printing-guide（學校）『需商議產能』；poster-printing-price-guide『視乎倉期』；print-specifications『急件通道，需確認產能』。
- **保留**：已帶 30-50% 附加費/按產能接單/需商議語境（paper-materials、restaurant-menu、hotel-amenity、finance-summit、christmas-card、a5-vs-a6 產品頁價目+即日印刷 fallback、rush-printing-hk-guide 同業對比表）、ISO/IEC 17025 實驗室 48h 行業內容、紙袋類真 FSC 語境、作者頁腳「FSC 認證紙材規範」（編輯依據聲明）。

### en.json（108 命中）
- 『4-day USA production』×2 →『4-day production for US orders』（實體真值 = 深圳平湖廠房，「USA production」為假值）。
- 免運補門檻 3 處（hotel-amenity『orders $99』→『over $99』、car-dealership 等）；其餘均已是「over $99 / over US$99」真值句。
- poster-printing-price-guide『ship in 24-48 hours』→『can ship…(subject to capacity)』。
- 保留：rush + 30-50% surcharge 語境（均帶條件）。

### ja.json（64 命中）
- **『全国送料無料』×59 →『全国配送対応（送料は見積時確認）』**（最大單項：日本站無免運真值）。
- FSC boilerplate ×9 + 散點 5 處 →「指定品項で」口徑。
- 48h 條件句：calendar『要事前確認』、catalog ×3『簡単な製本・少量に限る』、boilerplate ×5『生産枠・品目により要確認』、poster『スケジュール要確認』、cmyk-guide『米国注文 US$99 以上で送料無料』。
- 保留：+30% 附加費/のみ限定/要相談語境、食品溶出試驗 48h（行業內容）、24時間客服 SLA。

### blog-posts.ts（4 處）/ buying-guides.ts（2 處）
- 『順豐本地港九新界免運費』×4、『順豐本地免運費』、『free shipping in Hong Kong』→ 全補滿 HK$500 門檻。
- 保留：『free shipping over US$99』『Free Shipping $99+ Continental US』『滿 HK$500 港九新界順豐免運』等真值句。

## 3. 門禁記錄

- 三語 JSON parse 校驗 ✓；`npx tsc --noEmit` 0 錯；content-guard red=0（🟡 ja「会」為存量）；品牌 0 命中；encoding 5 文件 UTF-8 LF ✓。

## 4. 線上驗證（2026-11-28 ~17:20，兩次 push 後均驗證通過）

- [x] /zh-hk/blog/textbook-printing-guide/ 含「急件 48 小時可達（需商議產能）」✓
- [x] /zh-hk/blog/certificate-printing-guide/ 含「指定品項可選 FSC 認證紙」✓
- [x] /ja/blog/catalog-printing-guide/ 正文含「全国配送対応（送料は見積時確認）」✓
- [x] **補漏批**（550b312b）：首驗發現 meta 描述層殘留 3 處「全国送料無料」（blog/[slug]/page.tsx fallback meta L656/677/703 + blog-posts.ts ja meta 8 處）——blog-data JSON 外的第二戰場，已同口徑清掃；線上 meta description 已更新、「全国送料無料」歸零 ✓

## 4.1 兩次 commit

1. `ec714edf`（5 文件 +120/−120）：blog-data 三語 + blog-posts.ts + buying-guides.ts 正文層。
2. `550b312b`（2 文件 +12/−12）：blog 層 meta 描述層補漏（page.tsx fallback meta + blog-posts.ts ja meta）。

## 5. 欠賬（下一批候選）

1. **PDP/組件層同款承諾未動**（本次僅 blog 層）：products-content.ts 免運 75 處、sku-seo-data.ts 151 處、product-faqs.ts 16 處、components（TrustBadges/WhyChooseUs/HowItWorks 等）——建議 Q18 按同一 SSoT 批處理，需 K3 拍板範圍。
2. pillar 正文存量大數字（Q16 留批）待 K3 裁決。
3. `cluster-content.ts` 死文件刪除（P17 留批）。
