# 2026-11-27 人手執行報告 · LONGTAIL 13 考古批（WARN 15→2 理論地板）

- VERDICT: PASS
- CONSUMED: K3 11-27 11:46「WARN 15 中的 LONGTAIL 13 條考古批——需 7890/7892 代理啟動後拉 GSC query×page 逐槽註 L2 來源，可把 WARN 清到個位數。要現在啟動代理跑這批」
- DELIVERED: 12 title 修復 + 6 GSC 實證詞註冊 → WARN 15→2（僅剩凍結槽 certificates 2 條只讀）→ push cf96768b → live 12/12 PASS
- NEXT: WARN 理論地板已到（2 條凍結只讀）；下一批 = 18:17 daily 車道自走 + G2/G3 query×page 承接層優化（13 槽新詞已有 query×page 錨位數據）

## 数据来源

- GSC query×page 90 日明細：`gsc_data_qp_90d.csv`（4415 行，`fetch_gsc_data.py --days 90 --dimensions query,page`，2026-11-27 12:0x 經代理 127.0.0.1:7890 = GOOGLE_API_PROXY 通道拉取）
- 門禁審計：`.hermes/logs/sku-title-v5-audit-2026-11-27.json`（WARN=2 覆寫後實測）
- 代碼 SSoT：`scripts/guards/title-v5-guard.js` L239-256（LONGTAIL 判定）/ L103-115（loadGscCorpus）
- 校准日期：2026-11-27（90 日窗 = 2026-08-29 ~ 2026-11-26）

## 一、13 槽分類與處置（L0-L3 階梯）

| slug | locale | 舊無源段 | 處置 | 新段 | 90d GSC 實證 |
|---|---|---|---|---|---|
| roll-stickers | ja | 「〜¥」價格鉤剝離殘段 | 重排（非撤換） | 10枚 ¥4〜（空格消除殘段） | ロールラベル i11 |
| waterproof-stickers | ja | 「〜¥」同上 | 重排 | 10枚 ¥41〜 | 防水ステッカー i43 |
| white-card-bags | ja | エコ素材（無源） | 撤→實證同簇 | エコ用紙 | エコ用紙 i4 |
| thick-paper-flyers | zh-hk | A4/A5 雙面四色（無源） | 補實證詞 | A4/A5 厚紙雙面四色 | 厚紙 i9（全落本頁） |
| custom-calendars | ja | 業務用（無源） | 撤→主詞強化 | オリジナルカレンダー 印刷（當量 51） | カレンダー 印刷 i41（同簇） |
| pvc-menus | zh-hk | 餐飲/酒吧菜單（無源） | 撤→實證詞 | 餐牌印刷 | 餐牌 i224 |
| laminated-menus | zh-hk | 餐廳/咖啡店菜單（無源） | 撤→實證詞 | 餐牌印刷 | 餐牌 i224 |
| hardcover-menus | zh-hk | 高級餐廳/酒店（無源） | 撤→實證詞 | 餐牌印刷 | 餐牌 i224 |
| roll-up-banners | ja | アルミスタンド（無源） | 撤→實證詞 | バナー 印刷 | i10（cluster 已有） |
| spiral-notebooks | zh-hk | A4/A5 YO圈/螺旋裝（YO圈無源） | 改寫 | A4/A5 線圈/螺旋裝 | 線圈 i6 |
| kraft-paper-packaging-box | zh-hk | 環保材質（**本就實證**） | title 不動僅補註冊 | —（維持） | 環保材質 i79 |
| foil-greeting-cards | zh-hk | 金・銀・玫瑰金（無源格式） | 重排含已註冊詞 | 金銀玫瑰金 燙金 | 燙金 i98（cluster 已有） |
| spot-uv-greeting-cards | zh-hk | 啞面高光對比（無源） | 撤→實證詞 | UV賀卡印刷 | 賀卡印刷 i2 |

## 二、重大機制發現（入賬本 #21）

guard 語料庫 `.hermes/gsc-2026-09-18/extract.json` 實測 **queries n=0**（`g.new.combo_28d['查询']` 解析路徑與現檔結構不符）→ corpus 通道恆空，**LONGTAIL_SOURCE 唯一活判定通道 = gscClusters**。後續補詞一律走 clusters 註冊（附 90d imps 實證），不修 guard 解析（避免連帶影響，另行登記）。

## 三、門禁與上線

- tsc 0 · title-v5 HARD=0 WARN=2 · title-band 存量 0 · brand-mentions strict 0 · encoding UTF-8 LF · 反審 0 red（shadow orange 為歷史存量）
- commit `cf96768b`（6 files，+6383/−1467）→ origin_ssh main
- live 復探（UA 模擬，CF build 後）：12/12 PASS，新 title 全部生效，舊無源段字面量歸零

## 四、遺留與下一步

1. WARN=2 = certificates 凍結槽 FROZEN_FILLER（品質保證/專業印刷）——只讀不可改 = **理論地板**，非阻塞。
2. fetch 腳本 `HTTP(S)_PROXY` env 對 httplib2 無效（踩坑）：必須用 `GOOGLE_API_PROXY=http://127.0.0.1:7890`；7892 端口本機未監聽。
3. G2/G3：13 槽新長尾詞的 query×page 錨位已入 `gsc_data_qp_90d.csv`，可供下一批承接層優化（哪些 query 該由哪個 SKU 承接）。
