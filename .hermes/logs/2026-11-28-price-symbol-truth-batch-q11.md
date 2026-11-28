# 2026-11-28 價格符號系統真值化批 Q11（161 格）

- **拍板**：K3 2026-11-28 09:59「OK 就开工」（09:13 授權可立即上線）。
- **執行**：Kimi Work 人手會話。
- **commit**：`baba15d6`（已 push `b2e77b7a..baba15d6`，線上 en/ja 實測 0 殘留）。

## 發現：問題規模大於原報告

原欠賬描述「foil-stickers 等 `$$` 佔位符加價表殘留」→ 實查 **161 格**（58 `$$` + 100 `$` + 3 `$$$`），遍佈 **30 個 SKU 塊 × en/ja 變體**。且語義比「佔位符」更嚴重：

- **A 類（143 格）**：`Cost Add` / `追加料金` 列的相對價位符號（$=低 $$=中 $$$=高）
- **B 類（18 格）**：`Unit Price` 列下的 `$$`/`$$$`（wall-calendars / 6 款 red-packets / 6 款 menus / desk / mini / photo-frame / magnetic calendars）— **標題為「單價」卻無一個數字，直接違反 §0.23**

## 真值來源與替換規則

**引擎真值**（`src/lib/quote-engine/finishings.ts`，`FINISHING_COSTS` + `calculateFinishingCost` 公式 `max(baseCost, perSheet×sheets) + plate` 的最小值）：

| 工藝 | 公式最小值 | 替換文本（en / ja / zh） |
|---|---|---|
| 燙金（任何色/全息/Logo/邊框） | 150 起步 + 鋅版 150 = **300** | `from HK$300` / `HK$300〜` / `HK$300 起` |
| 擊凸/壓凹/Letterpress | 200 + 凸版 200 = **400** | 400 |
| Spot UV（含 pattern/full-bleed） | **80** | 80 |
| 覆膜（啞/光/軟觸） | **50** | 50 |
| 圓角 | **30** | 30 |
| 模切（die/kiss/perforated/back-slit） | **100**（finishings.ts 頭部文檔 2026-06-07） | 100 |
| 組合（箔+UV / UV+擊凸 / 覆膜+X 等 8 種） | 各工藝最小值之和（如箔+UV=**380**） | 380 / 480 / 130 / 350 / 450 / 110 / 330 |

**無引擎真值（58 en + 13 ja 格）**：VOID/破壞型/全息聚酯/連番/可變 QR、白墨/光油/可移膠/靜電吸著、各手挽（棉繩/紙繩/緞帶/有機棉）、磁吸/內印/大豆油墨/水性塗層、盒型結構/特種紙/PU 皮、**全部 Unit Price 分檔格** → `At quote` / `見積り確認` / `以報價為準`。

## 執行與驗證

- 工具：`.hermes/_tmp-q11-price-symbol-sweep.js`（行號錨定 1:1 替換，161 插入 / 161 刪除，**零結構變化**；語言偵測靠塊內 `longDescription/En/Ja` 字段序）
- 規則順序有語義：覆膜先於燙金（"Matte Lamination (over foil)" 是覆膜工序）；組合規則先於單工藝
- tsc 0 / encoding 0 / brand-mentions --strict PASS / content-guard exit 0 / pre-commit 門童全綠
- 線上實測：en foil-greeting-cards 7×`from HK$300`、ja 6×`HK$300〜`、wall-calendars 3×`At quote`、foil-red-packets 3×`At quote`，全部 0 殘留

## 與戰略文件對齊

- §9.2 AEO「直接答案必須可採購、可核驗」→ `$` 符號不可核驗，引擎起步價可核驗
- §6 P0 商業真值 → Unit Price 列的假價格是本批最大毒點，已清零
- §0.23 數據誠信 → 無真值格一律「以報價為準」，不編造

## 欠賬（留批）

1. 同表 **MOQ / Turnaround 列**逐條對 products.ts 驗真（本批單變量只動價格列；如菜單 A4 50 / 3-5 days 未驗）
2. 引擎 `FINISHING_COSTS` Record 缺 `die-cut` 項（模切價僅存頭部文檔，未參與 `calculateFinishingCost`）→ 建議補 Record 項
3. 運營聲明（免運門檻/重印承諾等）逐條驗真

## 復測門

客戶可見報價區現全部為真值或可報價聲明；下一 GSC 窗口觀察相關 SKU 頁 CTR 是否改善（價格透明度是 B2B 轉化核心變量）。
