# 2026-11-27 人手執行報告 · 批 Q1：en 雙簇衝首頁（承接層對照批最優推薦 #1/#2）

- VERDICT: PASS（live 4/4）
- CONSUMED: K3 11-27 13:55「按最优推荐方案继续下一步」→ 承接層對照批 P0-A/P0-B
- DELIVERED: en G1 直答塊 ×2 + 精準錨鏈 ×3 → commit 754c2f13 → live 全生效
- NEXT: 7d 復測門（兩簇排名進 P1-3）→ 達標後翻 zh/ja 版本；批 Q2（M1 月曆錯配）待 K3 拍

## 数据来源

- GSC 90d query×page：`gsc_data_qp_90d.csv`（4415 行，2026-11-27 12:0x 拉取）
- 真值：`products.ts` L958-1003（small-batch-stickers：10 MOQ / US$0.55 / HK$38-120/A4 / HP Indigo / Delta E ≤3 / 1-2 天）· L5086-5113（catalog-printing：10 MOQ / US$4.6 / 157-200g 內頁 / 四裝訂 / 免費排版 mockup）
- 校准日期：2026-11-27（窗口 2026-08-29 ~ 2026-11-26）

## 一、為什麼是這兩簇（優先序依據）

| 簇 | 90d imp | 排名現狀 | 承接正確性 |
|---|---|---|---|
| catalog printing china（5 詞：china/catalogue/wholesale/bulk/catalog） | ~800 | r11.5-21.7 | ✅ 全落 catalog-printing PDP |
| small batch sticker/label printing（3 詞） | ~400 | **r6-9.5 全站最近首頁** | ✅ 全落 small-batch-stickers PDP |

兩簇承接頁全部正確、只差權重——是 imp×距P1×意圖 三維 ROI 的最高分。

## 二、落地內容（單變量 en，a1-posters 先例）

1. **PDP G1 直答塊 ×2**（ProductPageV9.tsx，data-direct-answer 標記）：
   - catalog-printing：「Bulk catalog printing from 10 copies, from US$4.6 per book…四裝訂…free layout and design mockup; DHL 2-4 day worldwide」
   - small-batch-stickers：「From 10 pieces…HK$38-120 per sheet, from US$0.55 per sticker…HP Indigo / Delta E ≤3 / 1-2 working day」
2. **blog 錨鏈 ×3**（blog-data/en.json）：
   - catalog guide（原 **0 條 PDP 鏈**）：FAQ 錨「10 pcs MOQ catalog printing」+ 尾段錨「bulk catalog printing — 10-copy MOQ, wholesale tiers to 5000」
   - sticker-guide：「Small-batch labels (A4 sheets)」補精準錨（原有 1 條語境錨保留）

## 三、門禁與上線

- tsc 0 · blog-data JSON 嚴校（JSON.parse+控制字符+mojibake+鍵數）過 · 反審 0 red（shadow 均歷史存量）· encoding/簡體過
- commit `754c2f13`（6 files）→ push 首次 SSH 抖動、重試成功
- live 復探（CF build 後，UA）：4/4 PASS
  - /en/product/catalog-printing/ 直答塊含 US$4.6 ✓
  - /en/product/small-batch-stickers/ 直答塊含 HK$38-120 ✓
  - catalog blog → PDP 鏈生效 ✓ · sticker-guide → PDP 第二鏈生效 ✓

## 四、附：承接層盤點重大發現（詳見 重要文件/2026-11-27-query-page-anchor-audit-and-g2g3-priority.md）

- **M1 月曆印刷 i759 r3 落在 magnetic-calendars**（最大單一浪費，imp1400 簇承接權重錯位）
- **M2 海報印刷 i1460 r2 落在 eco-flyers**（全站最大詞錯配，需先查案再定轉移）
- 已首頁簇：學校印刷 r2 / 證書紙 r3 / 燙金利是封 r1 / 即日印刷 r7.5

## 五、遺留

1. 7d 復測門：12-04 復查兩簇 GSC 排名與直答塊展現；達標 → 翻 zh/ja 版本。
2. 批 Q2（M1 月曆內鏈導權）/ 批 Q3（M2 海報查案）待 K3 一句話。
