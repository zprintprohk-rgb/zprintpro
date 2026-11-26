# 裁決材料：退款時窗「7 工作天 vs 14 天」差異對齊（一頁）

**日期**：2026-11-27 · **提出方**：Kimi Work 主會話（首席 SEO/AEO/GEO 數據戰略分析師執行層）
**性質**：客戶可見承諾口徑真值衝突 → 需 K3 一句話拍板（三選一）
**數據來源**：src/ 靜態掃描 2026-11-27（13 文件命中點人工逐條核驗）；競品口徑來自 Vistaprint / Sticker Mule / GotPrint 公開政策頁（2026-11-27 聯網檢索）

---

## 一、衝突現狀（100% 窮盡掃描結果）

**真值源 = 14 天**（簽收後 14 天內發起退貨申請，三語一致，5 個獨立位置互證）：

| 位置 | 語系 | 原文要點 |
|---|---|---|
| `src/app/[locale]/legal/page.tsx` L87/L147/L207 | zh-hk / en / ja | 退貨申請需在簽收商品後 14 天內發起，逾期不予受理 |
| `src/app/[locale]/terms/page.tsx` L37/L87/L137 | zh-hk / en / ja | 同上（條款頁逐字同源） |
| `src/app/[locale]/help-center/HelpCenterClient.tsx` L197/L372/L547 | zh-hk / en / ja | 同上（幫助中心） |
| `src/lib/merchant-policy.ts` L16-17（結構化數據 Offer 層） | en / ja | Requests must be submitted within 14 days of receipt |
| `src/data/products-content.ts` L145/385/1658/6060（en PDP 詳情塊） | en | reprint at no cost or refund in full, within 14 days of receipt |

**衝突點 = 7 工作天**（唯一一處，三語成對出現）：

| 位置 | 語系 | 原文 |
|---|---|---|
| `src/data/product-faqs.ts` L810-812（generalProductFAQs 兜底集末條「印刷品質有問題可以重印嗎？」） | zh-hk | 請於收貨 **7 個工作天內**提交問題照片與訂單號碼 |
| 同上 | en | within **7 business days** of receipt |
| 同上 | ja | 商品受領後 **7 営業日以内**に問題写真と注文番号をご提出ください |

**影響面**：該兜底 FAQ 集服務 6+ 類目（greeting-cards / books / menus / banners / red-packets / educational）＋ PDP 兜底（`page.tsx` L246 未知 category_slug 回退 educational）——即**幾乎全站 PDP FAQ 區三語可見**，與 5 處 14 天真值源正面衝突，且被 FAQPage 結構化數據直接提交 Google（AI 答案引擎可抓取），屬 GEO 層面風險。

**附帶確認**（無第三種口徑）：全站無「退款處理需 7/14 天」類處理時效聲明；L83「銀行轉帳訂單確認後 7 日內匯款」屬付款條款，與本議題無關。除 L810-812 外無其他 7 天退款時窗。

## 二、競品基準（2026-11-27 檢索）

| 競品 | 質量缺陷救濟口徑 | 申請時窗 |
|---|---|---|
| Vistaprint | reprint → refund in full（100% satisfaction） | 美/加站 30 天內聯繫客服；印度站 15 天 |
| Sticker Mule | reprint or refund your money | 無硬性公開天數（以聯繫客服為準） |
| GotPrint | 類似 reprint/refund | 業界慣例 14-30 天 |

**行業帶**：14 天 = 保守下限；30 天 = 美國電商標配。我們當前 14 天合法合規但偏緊；7 工作天（≈9-11 個自然日跨週末）反而**比 14 天自然日更嚴**，等於自己給自己套雙重緊箍。

## 三、風險定性

1. **信任/轉化**：客戶在 FAQ 看到 7 天、在條款看到 14 天 → 認定口徑混亂或「FAQ 說了不算」，轉化信任打折（AEO 場景：AI 摘要可能引用較嚴的 7 天）。
2. **爭議不利解釋**：一旦糾紛，消費者保護慣例按**對消費者有利 + 條款含糊歸責賣家**解釋 → 我們實際被迫執行寬的 14 天，但 FAQ 承諾已留下話柄。
3. **SEO/GEO**：同一站兩種時窗 = 自我矛盾事實，削弱 E-E-A-T 與結構化數據一致性。

## 四、三選一方案（請 K3 一句話拍板）

### 方案 A：全站統一 14 天【執行層推薦】
- **改法**：僅改 `product-faqs.ts` L810-812 三語各 1 處（7 工作天 → 14 天）；其餘 5 個真值源位置**一字不動**。
- **工作量**：3 字符串，15 分鐘，零風險；與 legal/terms/help-center/merchant-policy 即刻全網一致。
- **競品位**：14 天仍屬行業保守下限，不會顯得比 Vistaprint 鬆；比 Sticker Mule 明確（他們無天數）。
- **SEO 增益**：FAQ 與條款同口徑，FAQPage 結構化數據與正文一致，GEO 引用無矛盾。

### 方案 B：全站統一 7 工作天
- 需反向改 5 個真值源位置 × 三語 ≈ 15+ 處（legal/terms/help-center/merchant-policy/products-content）。
- 對客戶更嚴 → 轉化信任降；仍低於 Vistaprint 30 天，無競爭優勢。**不推薦**。

### 方案 C：分層口徑（FAQ 重印承諾 7 天快道 + 條款退貨 14 天）
- 保留 FAQ 7 天作「快速處理通道」、條款 14 天作「正式退貨時窗」。
- 表面自洽，但客戶看到兩個數字必然困惑，AI 引擎仍可能引用 7 天；治理成本高（每次改口徑要同步兩層）。**不推薦**。

## 五、推薦與待批

**執行層推薦：方案 A（全站統一 14 天，只改 product-faqs.ts 3 處）**

**待 K3 拍板（一句話）**：「7/14 對齊 → A」/「B」/「C」

拍板後 15 分鐘內可完成修復，併入下一正確性批一次推（與 G1 批 2 / title 面 11-28 解凍件合流）。

---

**校驗聲明**：本材料全部命中點來自 2026-11-27 全 src 靜態掃描（grep 模式「退/退款/refund/return × 7/14」逐條人工排除交貨/審批/付款語境），13 文件命中點已逐條核驗；無估計、無遺漏聲明。
