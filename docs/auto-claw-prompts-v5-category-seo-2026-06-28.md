# ZprintPro v5 分类页面 SEO 优化提示词 (喂给 GLM 5.2)

> **生成时间**: 2026-06-28 23:22 (Asia/Shanghai)
> **作者**: Mavis (orchestrator)
> **目标工具**: AutoClaw GLM 5.2
> **范围**: **只做分类页面** (局部 SEO 优化), 其他页面不动
> **业务目标**: zprintpro.com 月销 5 万美金

---

## 0. ⚠️ 关键发现: 当前 SEO 文字是图片像素 (不可爬)

**截图分析** (user 5 张图: paper-bags / flyers / stickers / educational / posters):

每张分类页面的 SEO 文字 (H1 标题 + 副标题 + 红色爆炸贴价格) **都是 hero 大图的一部分** (1920x600), 不是 HTML 文字。

**示例** (纸袋印刷 hero 图):
- 白色大字: "香港紙袋印刷定制 — 牛皮紙袋 / 白卡紙袋 / 精品紙袋" ← **H1 但在像素里**
- 白色小字: "專業品質，價格透明，快速交貨" ← **副标题但也在像素里**
- 红色爆炸贴: "牛皮紙袋 | HK$1.2起" ← **价格信息在像素里**

**问题**:
- Google 爬虫**只能读 HTML 文字**, 像素 0% SEO 价值
- 当前 H1 / 副标题 / 价格信息**对 SEO 0 贡献**
- 这就是 GSC 平均排名 27.7 (第 3 页) 的根因之一
- **每个 category 页面都有这个问题, 13-14 个全中招**

**v5 核心任务**: 把图片里的 SEO 文字**拆出来** = 用 **HTML 文字覆盖在图片之上**。

**实施方式**:
- Hero 大图保留作背景
- 在 `<div className="hero">` 内部添加 `<h1>` `<p>` `<span>` HTML 文字覆盖层
- 用 `position: absolute; z-index: 1; color: white;` 文字压在图片上
- 文字内容跟图片**一致或更详细** (可加 SEO 长尾词)

---

## 1. 5 张图 SEO 文字提取 (user 提供的截图)

| Category | H1 (图片中) | 副标题 (图片中) | 红色爆炸贴 (图片中) |
|----------|------------|---------------|------------------|
| 紙袋印刷 (paper-bags) | 香港紙袋印刷定制 — 牛皮紙袋 / 白卡紙袋 / 精品紙袋 | 專業品質，價格透明，快速交貨 | 牛皮紙袋 \| HK$1.2起 環保材質 · 免費設計 |
| 宣傳單張 (flyers) | 香港宣傳單張印刷 — A4/A5 傳單 / 摺頁 / 開業傳單 | 專業品質，價格透明，快速交貨 | A4宣傳單張 \| HK$0.3起 彩色印刷 · 即日可取 |
| 貼紙印刷 (stickers) | 貼紙印刷 | 專業品質，價格透明，快速交貨 | 防水貼紙 \| HK$0.5起 PVC材質 · 多種形狀 |
| 校園教育印刷 (educational) | 校園教育印刷 | 專業品質，價格透明，快速交貨 | 校園印刷 \| HK$0.2起 專業品質 · 快速交貨 |
| 定制海報 (posters) | 定制海報 | 專業品質，價格透明，快速交貨 | 海報印刷 \| HK$15起 大圖輸出 · 色彩鮮豔 |

**模式总结**:
- H1 模式: `香港[分类]印刷定制 — [子类1] / [子类2] / [子类3]` (zh-hk)
- 副标题 3 个: 专业品质 / 价格透明 / 快速交货 (所有 category 一致)
- 红色爆炸贴: `[核心子类] | HK$[X]起 [卖点1] · [卖点2]`

---

## 2. 13 分类 SEO 文字 (按截图标准, zh-hk / en / ja 三套)

**重要**: 主营品类是 **贴纸 / 宣传单张 / 包装盒 / 标签 / 纸袋 / 红包** (不写名片)。

### 2.1 主营 6 大类 (P0)

#### 1. 贴纸印刷 (stickers) - 主力品类

**zh-hk**:
- H1: `香港貼紙印刷定制 — 防水貼紙 / 透明貼紙 / 異形貼紙 / 標籤貼紙`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `防水貼紙 | HK$0.22/張起 熱賣中 · 免費設計`
- description: `香港貼紙印刷定制服務｜智印雲提供防水貼紙、透明貼紙、異形貼紙、標籤貼紙、食品級貼紙等多種材質，支持LOGO定制，小批量起訂。免費設計，即日交貨。`
- keywords: `香港貼紙,防水貼紙,透明貼紙,異形貼紙,標籤貼紙,食品貼紙,貼紙印刷,小批量,免費設計,即日交貨,ZPrintPro,智印雲`

**en**:
- H1: `Custom Sticker Printing — Waterproof Stickers / Transparent / Die-Cut / Product Labels`
- Subtitle: `Professional Quality, Transparent Pricing, Fast Delivery`
- Red burst: `Waterproof Stickers | From $0.03/pc Free Design · Global Shipping`
- description: `Custom sticker printing from 50 pieces. Waterproof, transparent, die-cut, vinyl, food-safe labels. 4-color CMYK, UV-resistant. Free design service. Rush production. Ships to US, UK, AU, CA.`
- keywords: `custom stickers,waterproof stickers,transparent stickers,die cut stickers,vinyl stickers,product labels,food labels,sticker printing,small batch,free design,US shipping,ZprintPro`

**ja**:
- H1: `ステッカー印刷 カスタム — 防水ステッカー / 透明 / ダイカット / 商品ラベル`
- サブタイトル: `プロ品質、透明価格、迅速対応`
- 赤いバースト: `防水ステッカー | ¥0.38/枚〜 食品対応 · 無料デザイン`
- description: `カスタムステッカー印刷、防水・透明・ダイカット・商品ラベル・食品対応ラベル等多種材質対応、CMYK4色印刷、耐UV。無料デザイン、50枚から対応。日本全国配送、3〜5営業日でお届け。`
- keywords: `ステッカー印刷,カスタムステッカー,防水ステッカー,透明ステッカー,ダイカット,商品ラベル,食品ラベル,小ロット,無料デザイン,即納,全国配送,ZprintPro`

#### 2. 宣传单张 (flyers) - 跨境单子主力

**zh-hk**:
- H1: `香港宣傳單張印刷 — A4/A5 傳單 / 摺頁 / 開業傳單 / 加急`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `A4宣傳單張 | HK$0.3/張起 彩色印刷 · 即日可取`
- description: `香港宣傳單張印刷定制｜智印雲提供A4/A5/A6宣傳單張、摺頁傳單、開業傳單、加急單張印刷。157g銅版紙，雙面四色，免費設計。100張起訂，24小時交貨，港九新界免費送貨。`
- keywords: `香港宣傳單張,A4傳單,A5傳單,摺頁,開業傳單,加急傳單,單張印刷,銅版紙,雙面印刷,免費設計,小批量,24小時交貨,ZPrintPro,智印雲`

**en**:
- H1: `Flyer Printing — A4 / A5 / Folded Leaflets / Grand Opening / Rush`
- Subtitle: `Professional Quality, Transparent Pricing, Fast Delivery`
- Red burst: `A4 Flyers | From $0.18/pc Full Color · 24h Turnaround`
- description: `Custom flyer printing from 100 pieces. A4 / A5 / A6 sizes, 157gsm gloss art paper, full color both sides. Folded leaflets, grand opening flyers, rush delivery. Free design. Ships to US, UK, AU.`
- keywords: `flyer printing,custom flyers,A4 flyers,A5 flyers,folded leaflets,grand opening,rush flyers,gloss art paper,full color,free design,small batch,24h shipping,ZprintPro`

**ja**:
- H1: `チラシ印刷 — A4 / A5 / 折込 / 開業チラシ / 急ぎ対応`
- サブタイトル: `プロ品質、透明価格、迅速対応`
- 赤いバースト: `A4チラシ | ¥18/枚〜 フルカラー · 即日対応`
- description: `カスタムチラシ印刷、100枚から対応。A4/A5/A6サイズ、157g光沢紙、両面フルカラー印刷。折込チラシ、開業チラシ、急ぎ対応。最短即日仕上げ、3〜5営業日で納品。日本語対応、全国配送無料。`
- keywords: `チラシ印刷,カスタムチラシ,A4チラシ,A5チラシ,折込チラシ,開業チラシ,急ぎ,光沢紙,両面印刷,小ロット,即納,全国配送,ZprintPro`

#### 3. 包装盒定制 (boxes) - 主力

**zh-hk**:
- H1: `香港包裝盒定制 — 禮盒 / 化妝品盒 / 食品盒 / 快遞盒 / 天地蓋盒`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `禮盒印刷 | HK$3-8/個起 熱賣中 · 免費設計`
- description: `香港包裝盒定制服務｜智印雲提供禮盒、化妝品盒、食品盒、快遞盒、天地蓋盒、書型盒、磁吸盒等多種盒型，350g-1200g灰板/白卡，燙金UV工藝。100個起訂，免費設計打樣。`
- keywords: `香港包裝盒,禮盒,化妝品盒,食品盒,快遞盒,天地蓋盒,書型盒,磁吸盒,包裝定制,燙金,UV,免費打樣,ZPrintPro,智印雲`

**en**:
- H1: `Custom Packaging Boxes — Gift / Cosmetic / Food / Mailer / Rigid Boxes`
- Subtitle: `Professional Quality, Transparent Pricing, Fast Delivery`
- Red burst: `Custom Boxes | From $3-8/pc Hot Selling · Free Design`
- description: `Custom packaging box manufacturing. Gift boxes, cosmetic boxes, food boxes, mailer boxes, rigid boxes. 350g-1200g greyboard, foil stamping, spot UV, embossing. 100 pcs MOQ. Free design + sampling.`
- keywords: `custom packaging boxes,gift boxes,cosmetic boxes,food boxes,mailer boxes,rigid boxes,box design,foil stamping,UV,embossing,free sample,ZprintPro`

**ja**:
- H1: `パッケージボックス カスタム — ギフトボックス / 化粧品 / 食品 / メール便 / 組み立て箱`
- サブタイトル: `プロ品質、透明価格、迅速対応`
- 赤いバースト: `カスタムボックス | ¥300〜 ホット販売 · 無料デザイン`
- description: `パッケージボックス製造、ギフトボックス・化粧品ボックス・食品ボックス・メール便ボックス・組み立て箱等多種対応。350g-1200gグレー板紙、箔押し、UV、エンボス加工。100個から対応、無料デザイン・サンプル。`
- keywords: `パッケージボックス,カスタム,ギフトボックス,化粧品ボックス,食品ボックス,メール便,組み立て箱,箔押し,UV,エンボス,無料サンプル,ZprintPro`

#### 4. 标签贴纸 (labels) - 跨境高频

**zh-hk**:
- H1: `香港標籤貼紙印刷 — 產品標籤 / 食品標籤 / 防水標籤 / 二維碼標籤`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `標籤貼紙 | HK$0.18/張起 防水 · 撕不爛 · 免費設計`
- description: `香港標籤貼紙印刷｜智印雲提供產品標籤、食品標籤、防水標籤、二維碼標籤、條碼標籤、圓形/方形/異形標籤。PVC/PET/銅版紙，UV油墨，防水防油。100張起訂。`
- keywords: `香港標籤,標籤貼紙,產品標籤,食品標籤,防水標籤,二維碼標籤,條碼標籤,圓形標籤,異形標籤,UV油墨,小批量,ZPrintPro,智印雲`

**en**:
- H1: `Custom Labels — Product / Food / Waterproof / QR Code Labels`
- Subtitle: `Professional Quality, Transparent Pricing, Fast Delivery`
- Red burst: `Custom Labels | From $0.02/pc Waterproof · Tear-proof · Free Design`
- description: `Custom label printing. Product labels, food labels, waterproof labels, QR code labels, barcode labels, round/square/die-cut shapes. PVC/PET/gloss paper, UV ink, waterproof oil-resistant. 100 pcs MOQ.`
- keywords: `custom labels,product labels,food labels,waterproof labels,QR code labels,barcode labels,round labels,die cut,UV ink,small batch,ZprintPro`

**ja**:
- H1: `ラベル印刷 カスタム — 商品ラベル / 食品ラベル / 防水 / QRコード`
- サブタイトル: `プロ品質、透明価格、迅速対応`
- 赤いバーースト: `ラベル | ¥2/枚〜 防水 · 耐引裂 · 無料デザイン`
- description: `ラベル印刷対応、商品ラベル・食品ラベル・防水ラベル・QRコードラベル・バーコードラベル・丸/角/異形カット。PVC/PET/光沢紙、UVインキ、防水・耐油対応。100枚から対応。`
- keywords: `ラベル印刷,商品ラベル,食品ラベル,防水ラベル,QRコードラベル,バーコード,丸ラベル,異形カット,UVインキ,小ロット,ZprintPro`

#### 5. 纸袋印刷 (paper-bags) - 牛皮纸袋/礼盒

**zh-hk**:
- H1: `香港紙袋印刷定制 — 牛皮紙袋 / 白卡紙袋 / 精品紙袋 / 環保紙袋`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `牛皮紙袋 | HK$1.2/個起 環保材質 · 免費設計`
- description: `香港紙袋印刷定制服務｜智印雲提供牛皮紙袋、白卡紙袋、環保紙袋、禮品紙袋、銅版紙袋、提手繩紙袋等多種材質，150g-300g，支持燙金UV工藝。100個起訂，免費設計。`
- keywords: `香港紙袋,牛皮紙袋,白卡紙袋,精品紙袋,環保紙袋,禮品紙袋,提手繩,FSC認證,燙金,UV,免費設計,ZPrintPro,智印雲`

**en**:
- H1: `Custom Paper Bags — Kraft / White Card / Eco-Friendly / Gift Bags`
- Subtitle: `Professional Quality, Transparent Pricing, Fast Delivery`
- Red burst: `Kraft Bags | From $1.2/pc Eco Material · Free Design`
- description: `Custom paper bag printing. Kraft bags, white card bags, eco-friendly bags, gift bags, twine handle bags, 150g-300g. Foil stamping, UV, FSC-certified. 100 pcs MOQ. Free design.`
- keywords: `custom paper bags,kraft paper bags,white card bags,eco friendly bags,gift bags,paper bags wholesale,FSC certified,foil stamping,UV,free design,ZprintPro`

**ja**:
- H1: `紙袋印刷 カスタム — クラフト紙 / ホワイトカード / エコ / ギフト`
- サブタイトル: `プロ品質、透明価格、迅速対応`
- 赤いバーースト: `クラフト紙袋 | ¥120/枚〜 エコ素材 · 無料デザイン`
- description: `紙袋印刷対応、クラフト紙袋・ホワイトカード紙袋・エコ紙袋・ギフト紙袋・ひも付紙袋等多種対応、150g-300g、FSC認証、箔押し、UV加工。100個から対応、無料デザイン。`
- keywords: `紙袋印刷,クラフト紙袋,ホワイトカード,エコ紙袋,ギフト紙袋,FSC認証,箔押し,UV,無料デザイン,ZprintPro`

#### 6. 红包印刷 (red-packets) - CNY 季节性

**zh-hk**:
- H1: `香港紅包印刷 — 利是封 / 賀年紅包 / 燙金紅包 / 卡通紅包`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `利是封印刷 | HK$2-5/個起 新年限定 · 燙金工藝`
- description: `香港紅包印刷定制｜智印雲提供利是封、賀年紅包、燙金紅包、卡通紅包、迷你紅包、加大紅包。157g紅紙/金紙，支持燙金UV、個性化印刷。100個起訂，CNY季節性搶手貨。`
- keywords: `香港紅包,利是封,賀年紅包,燙金紅包,卡通紅包,迷你紅包,新年,CNY,個性化印刷,燙金,UV,ZPrintPro,智印雲`

**en**:
- H1: `Red Packet Printing — Chinese New Year / Foil Stamped / Cartoon / Custom`
- Subtitle: `Professional Quality, Transparent Pricing, Fast Delivery`
- Red burst: `Red Packets | From $0.5/pc CNY Limited · Foil Stamping`
- description: `Custom red packet / Chinese New Year envelope printing. Foil stamped, cartoon, mini, large sizes. 157g red paper, gold accents, foil stamping, UV, custom designs. 100 pcs MOQ. CNY seasonal.`
- keywords: `red packet printing,Chinese New Year,foil stamped,CNY envelopes,custom red packets,cartoon red packets,foil stamping,UV,seasonal,ZprintPro`

**ja**:
- H1: `紅包印刷 — 旧正月 / 箔押し / キャラクター / カスタム`
- サブタイトル: `プロ品質、透明価格、迅速対応`
- 赤いバーースト: `紅包 | ¥50/枚〜 春節限定 · 箔押し加工`
- description: `カスタム紅包印刷、旧正月封筒・箔押し紅包・キャラクター紅包・ミニ・大型対応。157g赤紙/金紙、箔押し、UV、個性化デザイン。100個から対応、春節季節商品。`
- keywords: `紅包印刷,旧正月,箔押し,キャラクター,カスタム,春節,箔押し,UV,個性デザイン,ZprintPro`

### 2.2 次要 4 大类 (P1, 同样标准)

#### 7. 海报定制 (posters) - 已截图

**zh-hk**:
- H1: `香港海報印刷定制 — A1/A2 海報 / 戶外海報 / 展覽海報 / 大圖輸出`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `海報印刷 | HK$15/張起 大圖輸出 · 色彩鮮豔`
- description: `香港海報印刷服務｜智印雲提供A1/A2/A3海報、戶外海報、展覽海報、防水海報、相紙海報。高清噴繪，157g-300g銅版紙，防水UV。1張起訂，港九新界免費送貨。`
- keywords: `香港海報,A1海報,A2海報,戶外海報,展覽海報,大圖輸出,防水海報,相紙海報,高清噴繪,免費送貨,ZPrintPro,智印雲`

#### 8. 横幅 (banners)

**zh-hk**:
- H1: `香港橫幅印刷 — 易拉寶 / 戶外橫幅 / 展覽橫幅 / 車身廣告`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `易拉寶印刷 | HK$50/個起 高清噴繪 · 鋁合金支架`
- description: `香港橫幅印刷服務｜智印雲提供易拉寶、戶外橫幅、展覽橫幅、車身廣告、mesh網格布。510g燈布，高清噴繪，防水防曬。1個起訂，24小時交貨。`

#### 9. 菜单 (menus)

**zh-hk**:
- H1: `香港菜單印刷 — PVC菜單 / 紙質菜單 / 精裝菜單 / 一次性菜單`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `PVC菜單 | HK$8-40/張起 熱賣中 · 免費設計`
- description: `香港菜單印刷服務｜智印雲提供PVC菜單、紙質菜單、精裝菜單、一次性菜單、酒水單、桌牌菜單。防水防油，雙面四色，UV工藝。10張起訂，24小時交貨。`

#### 10. 画册/书本 (books)

**zh-hk**:
- H1: `香港畫冊印刷 — 騎馬釘 / 膠裝書 / 精裝書 / 螺旋裝 / 兒童繪本`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `畫冊印刷 | HK$4-16/本起 熱賣中 · 免費設計`
- description: `香港畫冊印刷服務｜智印雲提供騎馬釘畫冊、膠裝書、精裝書、螺旋裝、兒童繪本、樣本書。157g銅版紙，雙面四色，覆膜UV。50本起訂，3-5天交貨。`

### 2.3 教育/校园 (educational) - 已截图 (主营品类附近, P1)

**zh-hk**:
- H1: `香港校園教育印刷 — 證書 / 作業簿 / 教材 / 學業簿`
- 副标题: `專業品質，價格透明，快速交貨`
- 红色爆炸贴: `校園印刷 | HK$0.2-0.8/張起 熱賣中 · 免費設計`
- description: `香港校園教育印刷服務｜智印雲提供證書、獎狀、畢業證書、作業簿、教材、學業簿、學校通訊、學年曆。80g-157g紙，雙面印刷，覆膜UV。100張起訂。`

### 2.4 不优化 (P3, 暂不动)

- **business-cards (名片)**: **不优化** (主营品类纠正, 名片不赚钱)
- **calendars (年历)**: 暂不动
- **envelopes (信封)**: 暂不动
- **notebooks (笔记本)**: 暂不动

---

## 3. 实施要求 (按截图标准)

### 3.1 Hero 大图 SEO 文字覆盖层 (核心!)

**当前问题**: SEO 文字是图片像素 (0% SEO 价值)

**目标实施**:
```tsx
// 当前 (错)
<Image src="/images/category/paper-bags-hero.webp" alt="..." />

// 目标 (对) - HTML 文字覆盖在图片上
<section className="relative">
  <Image src="/images/category/paper-bags-hero.webp" alt="..." className="w-full" />
  <div className="absolute inset-0 flex items-center">
    <div className="container">
      {/* 面包屑 */}
      <nav className="text-white/80 text-sm mb-4">
        <a href="/zh-hk/">首頁</a> / <span>紙袋印刷</span>
      </nav>
      {/* H1 HTML 文字 */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
        香港紙袋印刷定制 — 牛皮紙袋 / 白卡紙袋 / 精品紙袋
      </h1>
      {/* 副标题 */}
      <p className="text-white/90 text-lg mb-6">
        專業品質，價格透明，快速交貨
      </p>
      {/* 红色爆炸贴价格 */}
      <div className="bg-red-600 text-white px-6 py-3 rounded-full inline-block">
        牛皮紙袋 | HK$1.2/個起 環保材質 · 免費設計
      </div>
    </div>
  </div>
</section>
```

### 3.2 Title / Meta (3 locale 独立)

按 13 分类清单生成 `generateMetadata`:

| 字段 | 长度 | 示例 (paper-bags zh-hk) |
|------|------|----------------------|
| title | 50-60 字符 | `香港紙袋印刷定制 - 牛皮紙袋/白卡紙袋/精品紙袋 \| 智印雲 ZprintPro` |
| description | 150-160 字符 | `香港紙袋印刷定制服務｜智印雲提供牛皮紙袋、白卡紙袋、環保紙袋、禮品紙袋等多種紙袋印刷...` |
| keywords | 10-15 个 | `香港紙袋,牛皮紙袋,白卡紙袋,精品紙袋,環保紙袋,禮品紙袋...` |
| og:title | 同 title | 同上 |
| og:description | 同 description | 同上 |
| canonical | URL | `https://zprintpro.com/zh-hk/category/paper-bags/` |
| hreflang | 3 locale + x-default | 完整 |

### 3.3 Schema (核心! 当前全缺)

每个 category page 注入 5 个 schema:

```tsx
// 1. BreadcrumbList
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    { '@type': 'ListItem', 'position': 1, 'name': '首頁', 'item': 'https://zprintpro.com/zh-hk/' },
    { '@type': 'ListItem', 'position': 2, 'name': '紙袋印刷', 'item': 'https://zprintpro.com/zh-hk/category/paper-bags/' }
  ]
}

// 2. CollectionPage / ItemList (14 个产品)
{
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': '紙袋印刷',
  'description': '...',
  'hasPart': [
    { '@type': 'Product', 'name': '牛皮紙袋', 'url': '...', 'offers': {...} },
    // ... 14 个
  ]
}

// 3. WebSite + SearchAction
{ '@type': 'WebSite', 'potentialAction': { '@type': 'SearchAction', 'target': '/zh-hk/search?q={search_term_string}' } }

// 4. LocalBusiness (zh-hk) / Organization (en/ja) (已有, 加进 category page)
{ '@type': 'LocalBusiness', 'name': '智印雲', 'address': {...虚拟HK...} }

// 5. FAQ (每个 category 3-5 个)
{
  '@type': 'FAQPage',
  'mainEntity': [
    { '@type': 'Question', 'name': '紙袋印刷最低起訂量?', 'acceptedAnswer': {'@type':'Answer', 'text':'100個起訂'} },
    // ...
  ]
}
```

合并为 1 个 `<JsonLd data={[bread, coll, web, loc, faq]} />` (按 v4 修复的格式)

### 3.4 Hero 右侧红色爆炸贴

**3 locale 各自独立文案** (按截图标准, 含数字 + 卖点):

| 字段 | zh-hk | en | ja |
|------|-------|----|----|
| 核心产品 | 牛皮紙袋 | Kraft Paper Bags | クラフト紙袋 |
| 价格 | HK$1.2/個起 | From $1.2/pc | ¥120/枚〜 |
| 卖点1 | 環保材質 | Eco Material | エコ素材 |
| 卖点2 | 免費設計 | Free Design | 無料デザイン |

### 3.5 左侧 Sidebar (产品分类)

**当前**: 已有 14 分类 sidebar + 当前选中高亮 + 数字徽章
**保留**: 不动

### 3.6 右侧产品卡片网格

**当前**: 已有产品卡片 (3 列, 红色爆炸贴价格 + 熱賣中 · 免費設計)
**优化**:
- 每个产品卡片加 `Product` schema (有 sku-seo-data)
- Alt 文本 3 locale 全
- 内链到 product 页 (anchor text 含主关键词)

---

## 4. 输入文件 (GLM 5.2 执行)

- `src/app/[locale]/category/[slug]/page.tsx` (核心改)
- `src/lib/seo.ts` (schema 函数扩展, 加 generateCategoryMetadata)
- `src/data/products.ts` (14 分类数据)
- `src/data/category-seo-content.ts` (如已有, 直接用)
- `src/lib/whatsapp.ts` (红色爆炸贴 CTA)
- `src/data/image-alt-map.ts` (产品图 alt 3 locale)
- `src/components/home/HeroBanner.tsx` (参考用, 提取 hero 文字覆盖模式)

---

## 5. 验收标准 (多地理节点 verify)

✅ **代码层**: 6 commit (主营 6 大类 × 1 个 commit) + 2 commit (次要 4 大类)
✅ **HTML 关键词 verify** (curl + grep, 不只看 HTTP code):
- `curl /zh-hk/category/paper-bags/ | grep "香港紙袋印刷定制"` → HIT
- `curl /en/category/paper-bags/ | grep "Custom Paper Bags"` → HIT
- `curl /ja/category/paper-bags/ | grep "紙袋印刷"` → HIT
- **必须看到 H1 在 HTML 里** (不是只在图片里)
✅ **Schema verify**:
- `curl /zh-hk/category/paper-bags/ | grep "BreadcrumbList"` → HIT
- `curl /zh-hk/category/paper-bags/ | grep "CollectionPage"` → HIT
- `curl /zh-hk/category/paper-bags/ | grep "FAQPage"` → HIT
- `curl /zh-hk/category/paper-bags/ | grep "LocalBusiness"` → HIT
✅ **真实浏览器 verify** (user 视角, 不只看 curl):
- 打开浏览器看 zh-hk/category/paper-bags/
- 看到 HTML 大字 "香港紙袋印刷定制" (不是图片里)
- 看到红色爆炸贴 "牛皮紙袋 | HK$1.2/個起"
✅ **GSC 索引提升** (部署后 7 天):
- zh-hk "香港紙袋印刷" 排名从 27.7 → <15
- ja "紙袋印刷" 排名提升
- en "custom paper bag printing" 排名提升
✅ **i18n 层**: 3 locale 文字地道独立, 不串号
✅ **品牌层**: 全文无 "名片" (主营纠正)
✅ **主营品类层**: 6 大类 (贴纸/宣传单张/包装盒/标签/纸袋/红包) + 4 次类 (海报/横幅/菜单/画册) 全优化

---

## 6. 任务执行顺序 (按 ROI)

```
Phase 1: 主营 6 大类 SEO (P0)
  ① 任务 1: 贴纸 (stickers) - 跨境单子主力
  ② 任务 2: 宣传单张 (flyers) - 跨境高频
  ③ 任务 3: 包装盒 (boxes) - 高客单价
  ④ 任务 4: 标签 (labels) - 复购品类
  ⑤ 任务 5: 纸袋 (paper-bags) - 中等
  ⑥ 任务 6: 红包 (red-packets) - CNY 季节性

Phase 2: 次要 4 类 SEO (P1)
  ⑦ 任务 7: 海报 (posters)
  ⑧ 任务 8: 横幅 (banners)
  ⑨ 任务 9: 菜单 (menus)
  ⑩ 任务 10: 画册 (books) / 教育 (educational)

Phase 3: 不优化 (P3)
  - business-cards (主营纠正: 不写)
  - calendars, envelopes, notebooks (暂不动)
```

**总积分预算**:
- 主营 6 大类: 6 × 4 = 24 积分
- 次要 4 类: 4 × 3 = 12 积分
- 总: **36 积分** (v4 用了 ~30 积分, v5 多 6 积分)

---

## 7. 关键执行细节

### 7.1 Hero 文字覆盖层 (CSS 关键)

```css
/* 文字层覆盖在图片上 */
.hero-text-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  z-index: 1;
  pointer-events: none; /* 让图片区域可点击 (如有) */
}
.hero-text-overlay > * {
  pointer-events: auto; /* 但内部元素可点击 */
}

/* 渐变背景确保文字可读 (按截图风格) */
.hero-overlay {
  background: linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%);
}
```

### 7.2 红色爆炸贴 (按截图风格)

```tsx
<div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-bold text-base shadow-lg">
  <span>牛皮紙袋</span>
  <span>|</span>
  <span>HK$1.2/個起</span>
  <span className="text-xs font-normal">環保材質 · 免費設計</span>
</div>
```

### 7.3 面包屑位置 (按截图标准, 左下)

```tsx
<nav aria-label="breadcrumb" className="absolute top-1/2 -translate-y-1/2 left-8 z-10 text-white/80 text-sm">
  <a href="/zh-hk/" className="hover:text-white">首頁</a>
  <span className="mx-2">/</span>
  <span>紙袋印刷</span>
</nav>
```

### 7.4 schema 合并 (按 v4 修复格式)

```tsx
<JsonLd data={[
  breadcrumbSchema,
  collectionPageSchema,
  webSiteSchema,
  localBusinessSchema,
  faqSchema
]} />
```

不是 5 个独立 `<JsonLd>`, 是 1 个数组! (踩坑 #5)

---

## 8. 已踩坑警告 (GLM 5.2 必读)

1. ❌ **品牌名"智印港"** → 全文过滤
2. ❌ **地址写 HK 觀塘** → zh-hk 用虚拟 HK 觀塘 OK, 但 en/ja 用真实深圳
3. ❌ **OG 写 "Hong Kong factory"** → "Shenzhen factory"
4. ❌ **SVG `<animate>` + next/image** → edge runtime 崩
5. ❌ **5 个独立 `<JsonLd>`** → 合并 1 个数组
6. ❌ **react-hook-form + edge** → `dynamic + ssr:false`
7. ❌ **buffer / fs / node:crypto** → edge runtime 不可用
8. ❌ **iframe + CSP** → 不用 iframe
9. ❌ **placeholder.jpg 零字节** → 验证 size
10. ❌ **"名片"** → 主营纠正, **绝对不要写**
11. ❌ **hreflang 缺 x-default** → 必填
12. ❌ **CF Pages 1046 rate limit** → 不用 wrangler 频繁 deploy
13. ❌ **PowerShell `&&` / `[locale]`** → 用 `;` / `-LiteralPath`
14. ❌ **Remove-Item 拦截** → mavis-trash
15. ❌ **CRLF** → Python open `newline=''`
16. ❌ **CF Pages Git integration build 状态** → 不在 GitHub check_runs
17. ❌ **CDN 边缘节点缓存假象** → 多地理节点 verify + HTML 关键词
18. ❌ **HTTP 200 不代表修复成功** → 真实浏览器 + HTML 关键词
19. ❌ **SEO 文字写在图片里 (像素)** → **必用 HTML 覆盖层** (本 v5 核心)
20. ❌ **schema 不写** → v5 必写 5 个 schema (bread / coll / web / loc / faq)

---

## 9. 提示

**GLM 5.2 接到这个 v5 提示词后**:
1. 先读 `src/app/[locale]/category/[slug]/page.tsx` 全文
2. 列改动清单: hero 文字层 + metadata + schema + 14 分类 SEO 文字
3. 按 Phase 1 顺序 (贴纸 → 宣传单张 → 包装盒 → 标签 → 纸袋 → 红包)
4. 每个 category 1-2 个 commit (代码 + SEO 文字数据)
5. 每个 commit 后 curl + HTML 关键词 verify
6. 报告给 user

**GLM 5.2 不要再**:
- ❌ 写名片 (business-cards)
- ❌ SEO 文字放在图片里 (必须 HTML)
- ❌ 5 个独立 `<JsonLd>` (合并 1 个数组)
- ❌ 强制统一 3 locale NAP (zh-hk 虚拟 HK, ja 真实深圳)

---

## 10. 关联文件 / 资源

- v4 提示词: `docs/auto-claw-prompts-v4-locale-strategy-2026-06-28.md`
- v3 提示词: `docs/auto-claw-prompts-2026-06-28.md` (GSC 数据 + 流量瓶颈)
- 当前 category page: `src/app/[locale]/category/[slug]/page.tsx`
- 14 分类数据: `src/data/products.ts`
- SKU 详细: `src/data/sku-seo-data.ts`
- llms.txt (global): `public/llms.txt`
- 主页 hero 参考: `src/components/home/HeroBanner.tsx`

---

**GLM 5.2 接到此 v5 后, 按 Phase 1 顺序执行, 主营 6 大类 + 次要 4 类共 10 个 category 全部按截图标准 SEO 优化, ~36 积分, ~30-45 分钟完成**。
