# 2026-11-28 批 Q12 — K3 新價重標（Q12a）+ MOQ/Turnaround 验真（Q12b）

- **K3 拍板**：2026-11-28 10:15「Spot UV / 覆膜 / 圓角 / 模切 → HK$300 / 150 / 50 / 200 起，這個值重新定，以後全部按這個價標」+ 同條批准 MOQ/Turnaround 驗真批（承 Q11 欠賬 ①）。
- **授權鏈**：09:13「批准下一 push 窗口把 3a0eaf7d 推上線」→ 09:59 Q11 → 10:15 Q12 兩批。
- **commits**：Q12a `fb010b0e`（已 push `baba15d6..fb010b0e`）/ Q12b `05e00db2`（已 push `fb010b0e..05e00db2`）。
- **執行腳本**（留盤審計）：`.hermes/_tmp-q12a-remark.js` / `.hermes/_tmp-q12b-fix.js`。

---

## 一、Q12a — K3 新價重標（62 格）

### 舊值 → 新值（位置對應：Spot UV=300 / 覆膜=150 / 圓角=50 / 模切=200）

| 工藝 | Q11 真值（引擎 finishings.ts） | Q12a K3 新拍板 | 變動 |
|---|---|---|---|
| Spot UV | HK$80 起 | **HK$300 起** | +220 |
| 覆膜 | HK$50 起 | **HK$150 起** | +100 |
| 圓角 | HK$30 起 | **HK$50 起** | +20 |
| 模切 | HK$100 起 | **HK$200 起** | +100 |
| 燙金 | HK$300 起 | HK$300 起（K3 未重定，維持） | — |
| 擊凸 | HK$400 起 | HK$400 起（K3 未重定，維持） | — |

### 組合工藝 = 新值求和（6 種組合）

| 組合 | 舊（Q11 引擎和） | 新（Q12a K3 和） |
|---|---|---|
| 燙金 + Spot UV | 380 起 | **600 起**（300+300） |
| Spot UV + 擊凸 | 480 起 | **700 起**（300+400） |
| 覆膜 + Spot UV | 130 起 | **450 起**（150+300） |
| 覆膜 + 燙金 | 350 起 | **450 起**（150+300） |
| 覆膜 + 擊凸 | 450 起 | **550 起**（150+400） |
| 圓角 + Spot UV | 110 起 | **350 起**（50+300） |
| 圓角 + 燙金 | 330 起 | **350 起**（50+300） |

- **只重標顯示格（products-content.ts 完成工藝表格），未動報價引擎 FINISHING_COSTS**。
- ⚠️ **矛盾列 K3 決策項**：引擎 spot-uv 實算 HK$80 起 vs 頁面標籤 HK$300 起 — 引擎若不改，客戶點進報價器看到的加價與頁面標籤差 220。K3 需拍板：引擎同步改（=實際加價上調，經營決策）或維持雙軌（頁面是「起」宣稱，引擎是實算）。

## 二、Q12b — MOQ/Turnaround 验真（17 塊 en 表，54 格）

### 證據（全部已驗證）

1. `products.ts` `turnaround` 字段全站僅 4 個 SKU 有值（3×"5-7 working days" + 1× ja 同人誌）→ **17 個目標 SKU 全部無 turnaround 字段** → 表中 "3-5 days" / "5-7 days" / "7-10 business days" 全部無來源（§0.23）。
2. MOQ 真值 SSoT = products.ts `minQuantity`：6 款紅包=**100**、6 款日曆=**1**、4 款菜單=**10**。
3. **日曆方向實證**：custom-calendars zh 正文自述「1 本起印，適合打樣；50 本以上設批量檔」→ field=1 是真值、"50" 是批量檔門檻，表寫 50/25 為誤。
4. 菜單 10 與 9/19 c18107a0 全站紙品 10 起口徑一致。
5. custom-calendars 表 `MOQ 1 ✓` 已對、`from $0.40`（≈HK$3.1 與 price_range HK$3-8/本低端一致）保留，只改 Turnaround。
6. 17 塊表**只有 en 變體**（ja 無此類表、zh 無價格表）；同頁 FAQ 手風琴答案**已是條件句**（"Standard lead time depends on product... confirmed..."）→ 只改表即整頁自洽。
7. `disposable-menus` 在 products.ts 無對應產品 = 孤兒內容塊（客戶不可見），本批不動、列欠賬。

### 修改明細（27 MOQ + 27 Turnaround = 54 格）

| 塊 | 舊 MOQ → 新 | 格數 | Turnaround → Confirmed at quote |
|---|---|---|---|
| 6 款紅包（foil/embossed/custom/cartoon/eco/large） | 200/100 → **100** | 12 | 3-5 / 5-7 days ×12 |
| 5 款日曆（wall/desk/custom/mini/photo-frame/magnetic 中 5 款有表） | 50/25 → **1** | 7 | 3-5 days ×6 + 7-10 business days ×1 |
| 4 款菜單（pvc/laminated/hardcover/drink） | 50/100 → **10** | 8 | 3-5 days ×8 |

- 多行表結構（photo-frame L8020/L8021、magnetic L8181）按「表頭含 MOQ 的 table 區域內替換」處理，不依赖行號，實測 54 格全命中無誤傷。

## 三、影響組件

- `src/data/products-content.ts`：Q12a 62 格 + Q12b 29 行（29+/29-）= **唯一改動文件**，兩批零結構變化、精確一對一替換。
- 客戶可見面：en PDP 完成工藝加價表（Q12a）+ en 紅包/日曆/菜單規格表（Q12b）。
- 報價引擎（`finishings.ts` / FINISHING_COSTS）：**未動**（Q12a 矛盾列決策項）。

## 四、驗證記錄

- Q12b 本地：tsc 0 / encoding 0 / brand-mentions PASS（A 類 0）/ content-guard red=0（orange 173 全為存量 K3 拍板數據）/ pre-commit 門童 0 red / RULE-TRANSLATION-GUARD 0。
- Q12a 本地（前批）：同套全綠。
- 線上驗證：push 後 CF 構建 ~3-4 min，輪询 en 代表頁（spot-uv / matte / wall-calendars / laminated-menus / foil-red-packets）。

## 五、欠账留批（按優先級）

1. **引擎 FINISHING_COSTS 與標籤價不一致**（spot-uv 80 vs 300 等）——K3 拍板項。
2. 引擎 FINISHING_COSTS Record 缺 `die-cut` 項（僅頭部文檔，未參與 calculateFinishingCost）。
3. `disposable-menus` 孤兒內容塊（無產品）——下批刪或掛產品。
4. 運營聲明（MOQ/48h/FSC/免運門檻）逐條驗真——本批只驗 17 塊表格。
5. 婚慶簇反向鏈路（指南 blog → place-cards PDP）留 GSC 觀察窗後做。
