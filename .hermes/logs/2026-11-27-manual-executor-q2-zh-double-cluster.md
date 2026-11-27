# 2026-11-27 人手執行報告 · 批 Q2：zh-hk 月曆+海報雙簇（含 M1/M2 查案勘誤）

- VERDICT: PASS（live 4/4）
- CONSUMED: K3 11-27 14:10「批 Q2 + M2 查案合流執行…按最优推荐方案继续下一步」
- DELIVERED: zh-hk G1 直答塊 ×2 + 精準錨鏈 ×3 + 盤點報告勘誤 → commit dcd425d6 → live 全生效
- NEXT: 7d 復測門（月曆簇/海報簇進 P1 或顯著上移）；批 Q4（首頁商業詞 印刷公司/香港印刷）待拍

## 数据来源

- GSC 90d query×page 逐頁明細：`gsc_data_qp_90d.csv`（2026-11-27 12:0x 拉取；本批 14:2x 逐頁複查）
- 真值：`products.ts` custom-calendars（minQuantity 1 / price_range HK$3-8/本）· a2-posters（minQuantity 10 / basePrice HK$16）
- 校准日期：2026-11-27

## 一、查案勘誤（重要，per §0.23 主動撤回）

承接層對照初版「M1/M2 重大錯配」**定性有誤**：初版把 query 總 imp 誤植為單頁承接 imp。逐頁複查：

| 項 | 初版宣稱 | 逐頁實證 | 定性 |
|---|---|---|---|
| M1 月曆→magnetic-calendars | i759 r3 | **i1 r3**（月曆印刷全部 759 imp 中磁石曆僅 1） | ⚪ 非錯配（Google 語義抽風） |
| M2 海報→eco-flyers | i1460 r2 | **i1 r2**（eco-flyers 全文 0 處「海報」） | ⚪ 非錯配 |

真正堵點（權重斷層）：
- **月曆簇**：timetable blog 已 r5.3（首頁）但 **0 條 → custom-calendars PDP 鏈**；主推 PDP i338 卡 r22.2
- **海報簇**：poster blog 17 條內鏈 **0 條 → a1/a2-posters PDP**（全導類目/無關 blog）；a2-posters i277 卡 r34.6

盤點報告已加撤回聲明勘誤；教訓入賬本 #23：承接審計必須逐頁 imp×rank，嚴禁以 query 總量當單頁量。

## 二、落地內容（單變量 zh-hk）

1. **PDP G1 直答塊 ×2**：
   - custom-calendars：「定製月曆 1 本起印，HK$3-8／本…桌曆／掛曆／2027 年曆多款式…」
   - a2-posters：「A2 海報（420×594mm）10 張起印，HK$16／張起…157-200g 銅版／相紙…A1 加大版同線供應」
2. **blog 錨鏈 ×3**：
   - poster blog「頁面分工」段：補「A2 海報印刷」「A1 海報印刷」兩條 PDP 直達鏈
   - timetable blog「核心類目」清單：補「主推產品：定製月曆 1 本起」PDP 鏈

## 三、門禁與上線

- tsc 0 · blog-data JSON 嚴校過 · 反審 0 red（shadow 均歷史存量）
- commit `dcd425d6`（3 files）→ push 成功
- live 復探（CF build 後）：4/4 PASS（custom-calendars 塊含 HK$3-8 ✓ / a2-posters 塊含 HK$16 ✓ / poster blog 雙鏈 ✓ / timetable blog 單鏈 ✓）

## 四、7d 復測門（12-04）

- 月曆簇：custom-calendars「月曆印刷」r22.2 → 目標 P1；timetable blog 保持 r5 內
- 海報簇：a2-posters「海報印刷」r34.6 → 目標 ≤20 且 blog 權重可見下移
- 達標 → 翻 en/ja 版本；不達標 → 複查類目頁權重（posters/calendars 類目 r63/r35 亦是堵點）
