# 2026-11-27 人手執行器 — Full-Refund 全站條件化批（K3 ②-A 拍板）

## VERDICT: PASS
## CONSUMED: 重要文件/2026-11-27-full-refund-three-option-ruling-material.md（K3 回「②-A（推薦）…按最優推薦方案繼續下一步」）
## DELIVERED: 180 處無條件退款/滿意度承諾 → legal 對齊口徑，13 文件，commit 369cd3e6 上線
## NEXT: k3-review 12:05 獨立複探翻 online_verify；95%+ on-time 數字校準另案（§0.23）

數據來源: K3 2026-11-27 04:3x 拍板（②-A）；legal/page.tsx L87 實讀原文（僅品質缺陷可退/14 天窗口）；merchant-policy.ts（MerchantReturnFiniteReturnWindow）；terms L95（不可抗力→重印或退款）；live 探針 2026-11-27 04:5x-05:0x。

---

## 一、執行摘要
- **規模**：首輪 48 處（11 文件）→ 複掃發現 products-content.ts 模板重複類 132 處 + HowItWorks subtitle 漏網 + seo.ts doujin en → 二輪補清 → **合計 180 處 / 13 文件**（裁決材料估計 26 處，實際 7 倍——products-content 三語 FAQ 模板高度重複）。
- **口徑**（三語統一）：品質缺陷 → 免費重印或全額退款（zh「品質問題免費重印或全額退款」/ en "Free reprint or full refund for print quality defects" / ja「印刷品質不良は無料再印刷または全額返金」）；FAQ 補 14 天窗口句。
- **絕對詞全清**：100% satisfaction / 100% 滿意(保證) / 100% 満足(保証) / risk-free / 無風險 / リスクフリー / not satisfied / 不滿意免費重印 / 満足保証 / Free Reprint Guarantee。
- **打樣費明確化**：FreeSampleBanner 三語 + category-seo-content L4703/L4804：「full refund on orders 100+」→「proof fee refunded on 100+ pc orders / 校正費全額返金」。
- **保留不動**：RushDeliveryFAQ（我方原因延誤→退款或加急重印，條件合法；95%+ 準時率屬 §0.23 無來源數字另案）；OrderConfirmationClient `refunded`（支付枚舉）；legal/terms/merchant-policy（真值源）；title 凍結面。

## 二、文件清單（13）
ProductPageV9（6）· TrustBadgeBlock（3）· WhyChooseUs（3）· ProductWhyChooseUs（3）· FreeSampleBanner（5）· HowItWorks（5）· TrustBadges（6）· TrustWaterfall（3）· category-seo-content（5）· products-content（129）· product-faqs（6）· seo.ts（1）· institutional-printing 註釋更新（史實標註）

## 三、門禁
tsc 0 err · title-v5 HARD=0 · brand/gsc-leak/entity/price-truth/i18n 全靜默 · brand-mentions --strict 0 · encoding UTF-8 LF（13 files）

## 四、live 探針（2026-11-27 04:5x-05:0x）
| 探針 | 結果 |
|---|---|
| en 首頁 | 100% satisfaction=0 · "quality defects"=2 ✅ |
| zh-hk 首頁 | 100%滿意=0 · 品質問題免費重印或退款=2 ✅ |
| ja 首頁 | 100%満足=0 · 品質不良=2 ✅ |
| en PDP (small-batch) | trustGuarantee 新口徑=2 · 100% satisfaction=0 · FAQ 14天窗口=2 ✅ |
| en 類目 (stickers) | Quality Defects Covered=2 · not satisfied=0 ✅ |

## 五、遺留登記
1. RushDeliveryFAQ `95%+ on-time rate` — §0.23 無來源數字，待 008/運營數據校準（另案）。
2. product-faqs「收貨 7 個工作天內提交」vs legal「簽收 14 天內」— 前者更嚴（客戶不利但無虛假承諾），建議下次順手對齊 14 天。
3. N5/N6/A1 title 面 — 維持既有登記（12-04 復盤 / 11-28 D2 解凍）。

## 六、SOP-10 五問自查
1. 架構差異：執行前實讀 legal/merchant-policy/terms 三真值源 ✅ 2. 約束範圍：RushDeliveryFAQ/95% 未越權處理 ✅ 3. 原數據來源：live 探針值均實測 ✅ 4. 字段值策略：無證書號類字段 ✅ 5. Markdown 渲染：純字符串替換無新增鏈接語法 ✅
