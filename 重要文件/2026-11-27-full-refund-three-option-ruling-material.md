# Full Refund 全站口徑 · 三選一裁決材料（K3 拍板用 · 一頁）

**日期**：2026-11-27 · **執行**：Kimi Work 人手執行器（戰略分析席）
**對應卡**：`FIX-20261127-FULL-REFUND-SITEWIDE`（WAITING_K3）
**拍板格式**：回「②-A」或「②-B」或「①」或「③」即可（② 細分見 §4）

---

## 1. 真值 SSoT（legal 頁實讀原文，三語站共享）

`src/app/[locale]/legal/page.tsx` L87（zh-hk，en/ja 同義）：

> 本店所有商品均為按需訂製印刷產品，**僅針對印刷品質缺陷提供退貨服務**。可申請退貨的情況：印刷顏色偏差超出行業標準、裁切尺寸錯誤、材質與商品描述不符、商品運輸途中嚴重損壞。**退貨申請需在簽收商品後 14 天內發起**，逾期不予受理。非質量問題退貨運費由買家承擔；經核實確屬我方質量問題的，退貨運費由我方承擔。

輔助真值：`src/lib/merchant-policy.ts`（schema MerchantReturnFiniteReturnWindow / 14 天）；`terms` L95（不可抗力 → 責任上限重印或退款）。

**一句話**：我們的真實政策 = **品質缺陷 → 可退（14 天窗口）**；非品質原因 → 不可退。

## 2. 全站盤點（11 文件 · 26 處 · 分三級）

### A 級 · 越界絕對化（與 legal 直接矛盾，13 處）

| 位置 | 現狀 | 問題 |
|---|---|---|
| ProductPageV9 L121/188（**全部 PDP**） | en `100% satisfaction guarantee` / ja `100%満足保証` | 無條件滿意度承諾，legal 只保品質缺陷 |
| TrustBadgeBlock（類目頁）L31/48/65 | zh `不滿意免費重印` / en `Free reprint if not satisfied, full refund` / ja 同義 | 「not satisfied」無條件 |
| WhyChooseUs（首頁）L31/55/78 | 同上三語 | 同上 |
| ProductWhyChooseUs（PDP）L53-58/113-117/172 | 同上三語 | 同上 |
| FreeSampleBanner（PDP）L31/43-44 | zh `100% 無風險` / en `100% risk-free` + `full refund on orders 100+ pieces` | 絕對化 + 打樣費退費表述易被誤讀為訂單全額退 |
| HowItWorks（首頁）L51/86/121/143 | `100% satisfaction guarantee` ×3 語 | 絕對化 |
| TrustBadges（首頁/trade）L75/85 | `100% Satisfaction Guarantee` | 絕對化 |
| TrustWaterfall（首頁/PDP）L18/30 | zh `不滿意免費重印` | 無條件 |

### B 級 · 條件在但表述有洞（6 處）

| 位置 | 現狀 | 問題 |
|---|---|---|
| RushDeliveryFAQ L29/55 | `如因我方原因導致延誤，全額退款或免費加快重印` / `If delay is caused by us, full refund or free rush reprint` | 條件本身合法（≈terms L95 甚至更有利客戶）；洞在 `95%+ on-time rate` 無來源數字（§0.23 另一案） |
| category-seo-content L4703 | `Digital proof…HKD 200-500, full refund on orders 100+ pieces` | 語境是**打樣費**，表述易被誤讀為訂單全額退 |
| products-content FAQ ×4（L145/385/1658/6060） | `If the final print drifts from approved proof, we reprint at no cost or refund in full. Your satisfaction is guaranteed.` | 主條件其實合規（與確認樣不符=品質缺陷）；洞在尾巴 `Your satisfaction is guaranteed.` 絕對化、且無 14 天窗口 |

### C 級 · 無承諾語義（不動）

OrderConfirmationClient L30 `payment_status: 'refunded'` — 支付狀態枚舉，非營銷語。

## 3. 三選一分析

| 選項 | 內容 | 風險/代價 | 判定 |
|---|---|---|---|
| **① 保留現狀** | 不動 | PDP/首頁「not satisfied 就退」與 legal「僅品質缺陷」**直接矛盾**；買家拒付爭議/卡組織 chargeback 時站內承諾被引用；HK《商品說明條例》誤導風險；GMC 政策（虛假陳述）風險 | **確定級真值衝突，不可選** |
| **② 條件化** | 全部改為 legal 同族口徑：品質缺陷→免費重印或全額退款（14 天窗口）；刪 `100%/risk-free/not satisfied` 絕對詞；打樣費語明確化 | 約 11 文件 26 處字符串（3 語）+ 1 輪門童/live 複探；轉化上保留「退款保障」信任要素（印刷電商標配） | **推薦** |
| **③ 全站刪除** | 所有 refund/保證語清零 | legal 本就允許品質缺陷退款——過度刪除；首頁/PDP 信任帶出現空洞，轉化削弱；與競品（Sticker Mule/Vistaprint 均有 reprint-or-refund 類承諾）相比信任力掉檔 | 次選 |

**推薦 ②**，細分兩案供 K3 選：

## 4. 選項② 細案

### ②-A 完全對齊 legal（最保守 · 推薦）
- 所有 A 級改為：**「品質缺陷免費重印或全額退款 · 簽收 14 天內」**（en: `Free reprint or full refund for print quality defects` / ja: `印刷品質不良は無料重印・全額返金`）
- `100% satisfaction guarantee` → `Quality-defect guarantee` 類；`100% 無風險` → 刪
- B 級：RushDeliveryFAQ 保留主條件 + `95%+` 標「待校准」另案；L4703 改 `the proof fee is refunded on 100+ pc orders`；FAQ ×4 刪尾巴句、補 14 天窗口

### ②-B 行業慣用語保留 + 條件副行（轉化優先）
- 保留 `100% Satisfaction Guarantee` 作標題錨（美國印刷電商慣用語，含 Vistaprint/Sticker Mule 同類），但**每處副行必須帶條件**：`satisfaction guarantee — free reprint or refund for quality defects`
- 其餘同 ②-A
- 風險：「100%」字樣仍在，嚴格法務審查看仍屬絕對化修飾——若走此案建議同時在 legal 頁加一句「滿意保證以品質缺陷退換政策為準」補丁

## 5. 工程量與驗收（選②後）
- **觸及**：ProductPageV9 / TrustBadgeBlock / WhyChooseUs / ProductWhyChooseUs / FreeSampleBanner / HowItWorks / TrustBadges / TrustWaterfall / RushDeliveryFAQ（9 組件）+ category-seo-content / products-content（2 數據文件），26 處字符串
- **不觸及**：title 凍結面 / legal 頁（真值源）/ OrderConfirmationClient / 價格數字
- **驗收**：三語 refund 語義類在線複探（含「not satisfied」「risk-free」「100%」變體）= 0 越界命中；legal 頁與組件層口徑抽查一致；门童全綠

## 6. 歷史拍板錄（供參）
- K3 2026-10-30 裁决单#3：「无证案例/100%退款 不发布」——本材料推薦案與之一致：有 legal 背書的品質退款可以寫，無背書的絕對化承諾（100%/risk-free/not satisfied）刪。

---

**請 K3 拍板**：`①` / `②-A`（推薦）/ `②-B` / `③`
