# 2026-11-28 place-cards 內容批 Q10（三語 body + FAQ 掛載 + 內鏈閉環）

- **拍板**：K3 2026-11-28 09:48「OK 就开工」（09:13 授權可立即上線）。
- **執行**：Kimi Work 人手會話。
- **commit**：`b2e77b7a`（已 push `ad93fb14..b2e77b7a`，線上三語實測生效）。
- **驗證**：tsc 0 / encoding 0 / brand-mentions --strict PASS / content-guard exit 0 / 數字真值審計全過。

## 1. 三語 body（`sku-seo-data.ts` place-cards 條目，原留空槽補齊）

結構（ foil / wedding-thank-you-cards 已驗證口徑）：
1. **場景+承接分工**（§5.1 唯一主承接）：「本頁只承接婚宴枱卡／席位卡訂製；要印結婚請帖，請到[燙金喜帖印刷]」— 防 PDP 互相搶詞
2. **採購證據**（§8 決策資產）：材質檔次對照（棉紙=教堂草地 / 銅版紙=照片風格 / 剛古紙=簡約）、工藝賣點（燙金姓名桌號 / 壓紋觸感 / 站立式免支架）
3. **交稿規範**：A6（105×148mm）/ A5 對摺 / 站立式、四色柯式或數碼 4C、300DPI、CMYK、3mm 出血、字體外框化、燙金專色圖層、刀模線（site-wide 入稿規範）
4. **價格真值**：HK$2-9/張、50 張起、批量單價更優；en ≈US$0.26（basePrice_en）、ja 目安 ¥39〜（basePrice_ja）
5. **配送條件句**：順豐本地 / DHL 全球（婚慶姊妹 SKU 已批口徑），「交收時效以報價確認為準」— **無檔期天數承諾（§0.23）**
6. **粗體 FAQ ×3**（foil **Q1:** 單行口徑，SkuSeoBody 已驗證渲染路徑）

## 2. FAQ 掛載（`product-faqs.ts`）

| 掛載點 | 內容 | 修復問題 |
|---|---|---|
| `skuMoneyFAQs['place-cards']` | 帶錢問答 ×3：幾多錢（HK$2-9 直答）/ 幾時收到（確認稿後生產+以報價為準）/ 可否同喜帖一齊訂 | PDP FAQ 原無 SKU 級內容 |
| `coreProductFAQMap['place-cards']` = `placeCardsFAQs` | 通用 ×2：交稿規格 / 尺寸選擇（A6·A5對摺·站立式） | **原未註冊 → page.tsx L246 誤回退 `educational` 通用集 = 婚宴頁掛教育類問答（§5.1 承接錯位）** |

- 可見 FAQ 手風琴與 FAQPage JSON-LD 同源（page.tsx L249-252），線上實測 `"@type":"FAQPage"` 已輸出。

## 3. 內鏈閉環（婚慶帶錢詞簇）

- place-cards PDP → [燙金喜帖 PDP]（/product/foil-wedding-invitations/，承接分工）
- place-cards PDP → [婚宴枱卡印刷指南 blog]（/blog/wedding-table-card-printing-guide/，決策證據）
- 三語各 2 條，線上實測 href 全部渲染。
- 註：反向鏈（blog/喜帖 PDP → place-cards）屬下一批 GSC 觀察窗動作，不在本單變量批。

## 4. 數字真值審計（全部回源）

| 數字 | 來源 |
|---|---|
| 50 張起 / HK$2-9 | products.ts PC-101 `minQuantity` / `price_range` |
| US$0.26 | `basePrice_en` |
| ¥39〜 | `basePrice_ja` |
| 300g / A6 105×148mm / A5 對摺 / 站立式 | PC-101 `specs` |
| 300DPI / CMYK / 3mm 出血 / 字體外框化 / 4C | site-wide 入稿規範（foil ja body 等已批口徑） |
| 7 個設計風格 | blog 標題實證「枱卡印刷指南 · 7 個設計風格 + 材質對比」 |
| 順豐本地 / DHL 全球 | wedding-thank-you-cards 已批 body 口徑 |

**刻意不寫**：任何生產天數承諾（PC-101 無檔期真值）。

## 復測門

不承諾首頁。下一 GSC 窗口觀察：「枱卡印刷 / 婚宴枱卡 / 席位卡 / wedding place cards / 席札」同詞同頁的曝光、排名、CTR；FAQPage schema 的富媒體展示；與 11-28 基線對照。
