# 2026-11-28 place-cards 三語 title/SEO 條目補位批（Q9）

- **拍板**：K3 2026-11-28 09:28「按 apply-title-batch 安全路径给 place-cards 补一条过 50-57 校验的三语 title 批（单变量、不动 216 个存量标题），你说 OK 就执行」；09:13 授权可立即 push。
- **執行**：Kimi Work 人手會話。
- **commit**：`ad93fb14`（已 push `0e3c25d2..ad93fb14`，線上三語實測生效）。

## 背景與範圍判定

- 戰略文件 §7.1「0–72 小時不批量改 title」→ 本批**非批量改存量**：place-cards 為 11-28 新補 SKU，線上兜底 title 三語全部 malformed（zh「…酒水牌 / | 智印港」空分段 / en「CardsPrinting | Fr」黏連截斷 / ja 空分段），屬 P0 正確性修復。
- apply-title-batch.mjs 只做**存量槽位替換**（找不到 SKU 段即 exit 1），新條目插入走「外科式條目新增」先例（同 1635bd0da doujin 批 79→84）。**83 存量條目零改動（84=83+1）**。

## 落盤內容（`src/data/sku-seo-data.ts` 新增 `"place-cards"` 條目）

| locale | title | 當量 | description 要點（全回 PC-101 真值） |
|---|---|---|---|
| zh-hk | 婚宴枱卡印刷 \| 50張起 HK$2起 燙金壓紋 站立式折卡 \| 智印港 | **57** | 50 張起 / HK$2 起 / 300g 棉紙·銅版紙·剛古紙 / 燙金·壓紋·模切·站立式折卡 / 免費打稿 |
| en | Wedding Place Cards \| 50 MOQ \| Foil & Emboss \| ZprintPro | **56** | 50 pcs / $0.26 each / 300gsm cotton·art·Conqueror / foil·embossing·die-cut·standing fold / free digital proof / shipping confirmed at quote |
| ja | ウエディング席札 \| 50枚〜 ¥39〜 \| 箔押し \| ZprintPro | **52** | 50枚〜 / ¥39〜 / 300g コットン·コート·コンカラー / 箔押し·エンボス·抜型·スタンド式 / 無料デジタル校正 |

- h1：zh-hk「婚宴枱卡印刷 | 300g厚卡 燙金壓紋 站立式」/ en「Wedding Place Cards | Foil & Emboss Options」/ ja「ウエディング席札 | 箔押し エンボス対応」（place-cards 不在 TITLE_WINDOW_FROZEN，h1 即生效）。
- keywords 各 6/5/5 個（站級 meta keywords 渲染已於 2026-10-12 移除，僅內部用）。
- body 有意留空（單變量原則；今日無 skuSeo 條目時本就無正文塊，零回歸）。
- imageAlt 複用 products.ts seoImages 已批文案（0e3c25d2 同批產物）。
- faqs: []（與同族最小 SKU foil-wedding-invitations 一致）。

## 驗證

1. 獨立複核（`.hermes/_tmp-verify-place-cards-titles.js`，複用 apply-title-batch 四道閘門 + 無來源數字攔截）：✅ 三語全過。
2. tsc 0 / check-encoding PASS / brand-mentions --strict A 類 0 命中 / content-guard exit 0。
3. pre-commit 門童：5 道 0 red、DoD 鐵律通過、Encoding 通過、簡體中文通過。
4. 線上實測（UA 繞過 CF 爬蟲攔截）：三語 `/product/place-cards` 新 title 全部生效（第 6 輪輪詢命中）。

## 與戰略文件的對齊

- §7.4 喜帖簇「材質、工藝、數量、打樣、檔期與真實價格條件」→ 本批 title/h1/description 已帶 真實價格檔（HK$2-9/張 50 起）+ 工藝（燙金/壓紋/站立式）+ 免費打稿；**檔期未寫**（無來源，不編造）。
- 帶錢詞集群承接：婚宴枱卡/席位卡 與 foil-wedding-invitations（喜帖）+ blog `wedding-table-card-printing-guide` 形成婚慶內鏈簇，回鏈批留待 body/FAQ 批。

## 欠賬（留批）

1. body 長文內容塊 + FAQ 掛載（下一內容批，可順帶加 blog 回鏈與 catalog/喜帖交叉內鏈）。
2. foil-stickers 等 `$$` 佔位符加價表殘留。
3. MOQ/48h/FSC 等運營聲明逐條對 products.ts 驗真。

## 復測門

不承諾首頁。下一 GSC 窗口觀察：「枱卡印刷 / 婚宴枱卡 / 席位卡 / wedding place cards / 席札」查詢的曝光、排名與 CTR 變化；同詞同頁對照 11-28 基線。
