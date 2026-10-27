# 2026-10-27 年賀状季节页客户可见声明盘点（只读）

**盘点对象**: `src/app/[locale]/nengajo-2027/page.tsx`（全文 306 行，逐行读取）
**数据来源**:
- 一手代码: `src/app/[locale]/nengajo-2027/page.tsx`（全文 read + 分模式 grep，行号双方法交叉一致）
- 一手代码: `src/data/products.ts`（L140-219 / L335-424 抽样段）、`src/data/blog-posts.ts`、`src/data/blog-data/{en,ja,zh-hk}.json`（slug 定位行）
- 一手代码: `public/sitemap{,-zh-hk,-en,-ja}.xml`、`public/manifest*.json`、`scripts/generate-sitemap.js`、`src/lib/whatsapp.ts`
- git 历史: `git log`（page.tsx 3 commit）/ `git status --porcelain` / `git diff`（sitemap-zh-hk 抽样，只读）
- 校准日期: 2026-10-27（本次盘点当日实测工作树状态）
**纪律声明**: 只读盘点；未改动 src/ 任何文件；未触碰 sitemap 脏工作树（仅 git diff 读取）；未 git add/commit/push；不替 K3 拍板。

---

## 1. NENGAJO_LIVE 常量与开关逻辑

| 项 | 位置 | 事实 |
|---|---|---|
| 常量当前值 | page.tsx:29 | `const NENGAJO_LIVE = true;` —— **已置 true（页面实质上线）** |
| 渲染守卫 | page.tsx:76 | `if (!NENGAJO_LIVE) notFound();`（false 时该路由全部 locale 返回 404） |
| locale 白名单 | page.tsx:77 | `if (!['zh-hk','en','ja'].includes(locale)) notFound();` |
| 构建期收口 | page.tsx:26 | `export const dynamicParams = false;`（未列入 generateStaticParams 的 locale 直接 404） |
| 静态参数 | page.tsx:31-33 | `generateStaticParams()` 返回 `[{locale:'zh-hk'},{locale:'en'},{locale:'ja'}]` |
| metadata 兜底 | page.tsx:54 | `metaMap[locale] \|\| metaMap.ja`（generateMetadata 不检查开关，开关只管页面体） |

**git 提交链（page.tsx，旧→新）**:
1. `ea2f4ccc` — 预埋入 src/（NENGAJO_LIVE=false 构建期 404 门禁、sitemap 未登记），K3「直接开工」2026-10-15；
2. `3eed6277` — **`[launch][nengajo-2027] NENGAJO_LIVE=true`**（commit message 自述 "approved-plan fallback: industry-default prices stay marked 確認後更新, K3 calibration pending"）+ sitemap x4 手工登记（lastmod 10-22）；
3. `fdc8569b` — P0-1 未拍板前撤「早割受付中」承诺词：title/h1/lead/desc 去早鳥・早割，当量 ja54/zh55/en53 达标；率/締切仍標「確認後更新」。

**与文件头注释的偏差（文档债）**: page.tsx:5-6 仍写「NENGAJO_LIVE=false → 构建期 404…sitemap 未登记」「上线=…+sitemap staticPages 一行+push」——与现状（true 已提交、sitemap 已登记且生成器已收口）不符，注释未随上线更新。
**runbook 存在性**: `.hermes/drafts/nengajo-2027/` 实测含 `LAUNCH-CHECKLIST.md`、`MERGE-SNIPPETS.md`、`page-nengajo-2027.tsx`（page.tsx:7 引用属实）。
**K3 三填值位（page.tsx:10-13 注释自述，当前仍未填）**: [1] 早割折扣率 [2] 正式締切日 [3] 宛名可否——页面正文对应位置全部仍为占位条件句（见 §4）。

## 2. 三 locale title / H1 / lead / description 逐字摘录

### zh-hk（title L39 / H1 L81 / lead L82 / desc L40）
- **title**: `2027 賀年卡・年賀狀印刷 10 張起 HK$1 起 燙金UV | 智印港`
- **H1**: `2027 賀年卡・年賀狀印刷 — 10 張起 HK$1 起`
- **lead**: `2027 年賀狀／賀年卡印刷：6 款賀卡全部 10 張起印，HK$1 起，127×178mm 標準尺寸，燙金、局部 UV、圓角、400g 厚卡可選。3-5 個工作天交貨，DHL 全球 2-4 天，免費打樣，30 秒 AI 報價。`
- **desc**: `2027 賀年卡・年賀狀印刷：6 款賀卡全部 10 張起印，HK$1 起，127×178mm 標準尺寸，燙金／局部 UV／圓角／400g 厚卡可選，3-5 個工作天交貨，DHL 全球 2-4 天，免費打樣。早鳥優惠名額與截單日確認後即時更新，WhatsApp 30 秒報價。`
- keywords L41: `年賀狀印刷,賀年卡印刷,新年卡印刷,2027 賀年卡,賀卡印刷早鳥,燙金賀卡,厚卡賀卡,圓角賀卡,香港賀卡訂製,企業賀年卡`

### en（title L44 / H1 L125 / lead L126 / desc L45）
- **title**: `Nengajo 2027 Printing | 10 MOQ from $0.13 | ZprintPro`
- **H1**: `2027 Nengajo & New Year Cards — 10 MOQ from US$0.13`
- **lead**: `2027 Japanese New Year card printing: 6 SKUs from 10 pcs, from US$0.13/card, 127×178mm standard, foil / spot UV / rounded corners / 400g stock. 3-5 day production, DHL 2-4 day delivery, free digital proof, 30-second AI quote.`
- **desc**: `Japanese New Year cards (nengajo) 2027 printing: 6 card SKUs from 10 pcs, from US$0.13/card, 127×178mm standard, foil / spot UV / rounded corners / 400g stock, 3-5 day production, DHL 2-4 day delivery, free digital proof. Early-bird terms confirmed soon. 30-second AI quote.`
- keywords L46: `nengajo printing,japanese new year cards 2027,nengajo 2027,new year card printing,greeting card printing early bird,foil new year cards,custom nengajo,nengaja english,japan new year card service,new year postcard printing`

### ja（title L49 / H1 L169 / lead L170 / desc L50）
- **title**: `年賀状 2027 印刷 10枚から ¥20〜 オリジナル | ZprintPro`
- **H1**: `2027年年賀状印刷 — 10枚から ¥20〜 オリジナルカード`
- **lead**: `2027年年賀状印刷のご案内ページです。6 SKU すべて10枚から、1枚¥20〜。127×178mm 標準サイズ、箔押し・スポットUV・角丸・厚口400gから選べます。納期3〜5営業日、DHL国際2〜4日、無料入稿チェック、30秒AI見積り対応。`
- **desc**: `2027年年賀状印刷ページ。6 SKU すべて10枚から、1枚¥20〜（箔押し¥35〜）。127×178mm 標準サイズ、宛名オプション対応確認中、納期3〜5営業日、DHL国際2〜4日、無料入稿チェック。早割率・正式締切は確定次第本ページで更新。30秒AI見積り対応。`
- keywords L51: `年賀状印刷,年賀状 2027,オリジナル年賀状,箔押し 年賀状,年賀状 10枚から,宛名印刷,企業年賀状,数百枚 年賀状,年賀状 外注`

hreflang/canonical（L63-68）: canonical = `https://zprintpro.com/{locale}/nengajo-2027/`；languages 四条 zh-hk/en/ja + `x-default → zh-hk`。
品牌分层: zh-hk = 智印港（title L39 + schema L238），en/ja = ZprintPro，无双品牌同现。

## 3. 规格词出现处（行号 + 原文）

**`127×178`（22 处）**: L9, L40, L45, L50, L82, L89, L90, L91, L92, L93, L94, L126, L133, L134, L135, L136, L137, L138, L170, L177, L178, L179, L180, L181, L182, L216（规格行 18 处 + meta/lead/注释/waLink 参数各处；正文表格每行规格列均含 `127×178mm`）。
**`100×148`**: **0 处**（全文件不存在）。
**`はがき`**: **0 处**（页面通篇未出现「はがき／年賀はがき／官製はがき」字样——即未声明使用日本邮便官製はがき规格，仅自定 127×178mm）。
**`POSTCARD`（大写）**: 0 处；`postcard` 仅 1 处 = en keywords L46 尾词 `new year postcard printing`。
**起印量「10 張/10枚/10 pcs」**: L40, L82（zh lead/desc）、L50, L170（ja）、L45, L126（en）、表格行 L89-94 / L133-138 / L177-182 第 3 列、FAQ L108/152/196、waLink quantity `'10'`（L217）。
**纸重/工艺规格词**: `300g 銅版`（L89）/`400g 厚卡`（L90, L82）/`金箔／銀箔`（L91, L179）/`局部 UV`（L92, L180）/`啞膠過膠`（L93）/`圓角裁切`（L94）/`300g アート紙`（L177）/`マットラミネート`（L181）/`角丸カット`（L182）。

## 4. 价格 / 早割 / 宛名 / 納期 / 配送 声明逐条（行号 + 原文 + 条件词）

### 4.1 价格（牌价表 6 SKU × 3 locale；早鳥價列全为占位）
**表头**: L87 `['SKU','規格','起印量','牌價（每張）','早鳥價']` / L131 `['SKU','Spec','MOQ','List price','Early-bird']` / L175 `['SKU','仕様','最小数量','牌価（1枚）','早割価格']`

| SKU | zh-hk（行） | en（行） | ja（行） | 条件词 |
|---|---|---|---|---|
| 高級/Premium | `HK$1.0 起`（L89） | `US$0.13 up`（L133） | `¥20〜`（L177） | 牌价本身无条件词（「起/up/〜」为下限表述）；早鳥價列 `確認後更新`/`To be confirmed`/`確定後に掲載` = **有条件词** |
| 400g 厚卡 | `HK$1.2 起`（L90） | `US$0.15 up`（L134） | `¥23〜`（L178） | 同上 |
| 燙金/Foil | `HK$1.8 起`（L91） | `US$0.23 up`（L135） | `¥35〜`（L179） | 同上 |
| UV 局部光油 | `HK$1.4 起`（L92） | `US$0.18 up`（L136） | `¥27〜`（L180） | 同上 |
| 啞膠/Matte | `HK$1.1 起`（L93） | `US$0.14 up`（L137） | `¥21〜`（L181） | 同上 |
| 圓角/Rounded | `HK$1.0 起`（L94） | `US$0.13 up`（L138） | `¥20〜`（L182） | 同上 |

**表注**: L96 `牌價來源：products.ts（2026-10-15 現取，與產品頁同步）；早鳥價確認後以本表為準。` / L140（en 同义）/ L184 `牌価の出所：products.ts（2026-10-15 現取、商品ページと同期）。` —— 均标了数据来源与同步口径。
**products.ts 抽样核对（2/6）**: `premium-greeting-cards`（products.ts L149 起）`basePrice: 1.0 / basePrice_en: 0.13 / basePrice_ja: 20 / minQuantity: 10`、specs.size `127×178mm`；`foil-greeting-cards`（L341 起）`basePrice: 1.8 / 0.23 / 35 / minQuantity: 10` —— **两 SKU 三币价格与页面逐字一致**。其余 4 SKU（thick-400g/spot-uv/matte/rounded）本次未抽样，标待证（页面自述同批 2026-10-15 快照）。

### 4.2 早割 / 早鳥（全部带条件词，无具体折扣率数字）
| 位置 | 行号 | 原文（节选） | 条件词 |
|---|---|---|---|
| zh ebTitle/ebBody/ebSlot | L83/84/85 | `早鳥優惠以「10 月底前落單」為目安（既有口徑，2026-11-01 再確認）。確定嘅早鳥折扣率同正式截單日一經拍板，即刻喺本頁更新…` | **有**（目安/再確認/拍板後） |
| en ebTitle/ebBody/ebSlot | L127/128/129 | `Working guidance: order by end of October (existing baseline, re-confirmed 2026-11-01)…published on this page once approved.` | **有**（working guidance/once approved） |
| ja ebTitle/ebBody/ebSlot | L171/172/173 | `早割は「10月末までのご発注」を目安としています（既存口径、2026-11-01 に再確認）…決まり次第…ご案内します。` | **有**（目安/決まり次第） |
| FAQ | L109 / L153 / L197 | 同口径重复 | **有** |
| 表格早鳥價列 | L87-94 / L131-138 / L175-182 | `確認後更新`/`To be confirmed`/`確定後に掲載` | **有** |
| meta desc | L40 / L45 / L50 | `早鳥優惠名額與截單日確認後即時更新` / `Early-bird terms confirmed soon` / `早割率・正式締切は確定次第本ページで更新` | **有** |
| WhatsApp 预填 | L122 / L166 / L210 | 「早鳥優惠」「early-bird quote」「早割見積り」 | 询价用语，非承诺 |
注：title/H1/lead 已被 fdc8569b 清空早鳥・早割词（防「未拍板先承诺」），现 title 三语均无早割字样。全页**无任何折扣率数字、无「受付中/进行中」式承诺词**。

### 4.3 宛名（三 locale + FAQ 全部「確認中」，无条件词缺失风险为零）
- L104-105: `宛名印刷選項` / `宛名（收件人地址）印刷可否代做及加收費用確認中，確認後更新。`
- L148-149: `Recipient-name (atena) printing` / `Availability and pricing for atena (recipient addressing) being confirmed — updates on this page.`
- L192-193: `宛名印刷オプション` / `宛名（宛先）印刷の対応可否と価格は確認中です。確定次第、本ページでご案内します。`
- FAQ: L110 / L154 / L198（均「確認中 + WhatsApp 先登記」口径）；渲染 L290-291。
- ja meta desc L50 亦含 `宛名オプション対応確認中`。
→ **全部为条件句占位**，与 page.tsx:13 注释「拍『不提供』则改『対応外』」的待拍板状态一致。

### 4.4 納期 / 交期（无条件词 = 硬承诺「3-5 天」）
- meta: L40 `3-5 個工作天交貨` / L45 `3-5 day production` / L50 `納期3〜5営業日`
- lead: L82 / L126 / L170 同口径
- 时间线: L99-100 `設計／入稿…免費入稿檢查 + 數碼打樣`、`生產 3-5 個工作天 深圳平湖廠房柯式印刷，出貨前全檢色差`；L143-144（en 同构，`Offset printing at our Shenzhen Pinghu plant, 100% color QC`）；L187-188（ja 同构）
- FAQ: L108 / L152 / L196（`小批量數碼可做，大批量轉柯式` / `small runs are digital…`）
→ 「3-5 個工作天/営業日/working days」三 locale 一致、**无任何保留条件**（对照：blog 指南口径另有 5-7 天生产表述，见 §11 观察项）。

### 4.5 配送 / 免运（三 locale 口径不一致；门槛类条件词已列出）
| locale | 行号 | 原文 | 条件词 |
|---|---|---|---|
| zh-hk | L101 | `香港滿 HK$500 免費順豐 1-2 天；DHL 全球 2-4 天` | **有门槛**（滿 HK$500）+ DHL 无条件 |
| en | L145 | `DHL international 2-4 days; US free shipping $99+` | **有门槛**（$99+） |
| ja | L189 | `DHL 国際 2〜4 日（日本宛も対応）` | **无免运承诺**（无门槛句） |
- meta 层: L40 `DHL 全球 2-4 天` / L45 `DHL 2-4 day delivery` / L50 `DHL国際2〜4日` —— 无条件。
- 投函締切（免责设计）: L102 / L146 / L190 时间线第 4 步 + FAQ L111 / L155 / L199 一律「投函締切は日本郵便の当年公式案内をご参照ください（本頁唔代公佈 / not republished here）」——**不代公布官方死线，零编造日期**。
- 落单建议: L111 / L155 / L199 `建議 12 月中旬前完成落單留返郵寄時間`（ja `12月中旬までのご発注が安心です`）—— 软建议（建議/recommend/安心），非承诺；**与 blog 指南 11 月中口径存在落差**（见 §9/§11）。
- 生产地声明: L100 `深圳平湖廠房` / L144 `Shenzhen Pinghu plant` / L188 `深圳平湖工場`（城市+街区组合，非注册地址字段）。

## 5. FAQ 条目清单（每 locale 4 问；schema 同步此 4 条）

**zh-hk（L108-111）**:
1. `最少要印幾多張？`
2. `早鳥優惠幾時截？`
3. `可以代印宛名（收件人資料）嗎？`
4. `幾時落單先趕得切寄出？`

**en（L152-155）**:
1. `What is the minimum order?`
2. `When does the early-bird end?`
3. `Can you print recipient names (atena)?`
4. `How late can I order for January 1 delivery?`

**ja（L196-199）**:
1. `最少注文枚数は？`
2. `早割の締切はいつ？`
3. `宛名印刷はできますか？`
4. `1月1日までに届く締切は？`

答案要点与 §4 各条口径一致（MOQ 10 / 早割目安 10 月底+2026-11-01 再確認 / 宛名確認中 / 生産 3-5 + DHL 2-4 + 12 月中旬前建議 + 投函締切指向日本郵便官方）。

## 6. JSON-LD schema 类型与关键字段

| schema | 位置 | 关键字段 | price/spec/dates 状况 |
|---|---|---|---|
| `FAQPage` | L223-232（@type L225） | `mainEntity` = 4×`Question`+`acceptedAnswer`（数据源 = 页面 faqs 数组） | 无 price/dates（答案文本含价格） |
| `Service` | L233-242（@type L235） | `name`/`description` = metaMap title/desc；`provider` Organization 按 locale 分层（L238，zh-hk 行=中文名品牌〔字面见 AGENTS §13.16〕/ 其余两语=ZprintPro）；`areaServed` 三语分别为 JP / US / HK（L239）；`offers` = **Offer 仅有 description（30 秒报价文案，L240）** | **无 price / priceCurrency / availability / priceValidUntil / validFrom** |
| `BreadcrumbList` | L243-250（@type L245） | 2 级：首页 + 本页（name=`t.h1.slice(0,40)`，L248） | — |

**要点**: 全页**没有 Product schema、Offer 无价格字段、无任何日期字段**——与「无编造数字」纪律一致，但也意味着该页当前**不具备 price rich-result 资格**；若 A/B 要测价格锚点/富结果，需先补 Product+Offer 真实价格。

## 7. WhatsApp 预填文案（逐字）

- zh-hk L122: `你好，我想查詢 2027 賀年卡／年賀狀早鳥優惠。SKU：高級／厚卡／燙金／UV／啞膠／圓角｜數量：＿＿張｜加工：＿＿`
- en L166: `Hi, I need a 2027 nengajo / New Year card early-bird quote. SKU: premium/400g/foil/UV/matte/rounded | Qty: ___ | Finish: ___`
- ja L210: `2027年年賀状の早割見積りを希望します。SKU：プレミアム／厚口／箔押し／UV／マット／角丸｜数量：＿＿枚｜加工：＿＿`

**链接构造（L214-221）**: `generateWhatsAppLink(locale, { productName: '年賀状印刷 2027 早割'/'賀年卡/年賀狀印刷 2027 早鳥'/'Nengajo 2027 Early-Bird Printing'(L215), size: '127×178mm'(L216), quantity: '10'(L217), material: '300g アート紙〜400g 厚口'/'300g 銅版紙〜400g 厚卡'/'300g art paper to 400g stock'(L218), extra: t.whatsappText(L219), source: 'nengajo-2027-hero'(L220) })`
**号码与追踪**: `src/lib/whatsapp.ts` L17 `const PHONE = '8619880851334'`（§13.10 唯一白名单号）；L77 拼 `https://wa.me/{phone}?text={encoded}` + `#src=...` 追踪 hash。CTA 渲染 L299（`target="_blank" rel="noopener"`）。

## 8. 页面内链与出链清单

**出站外链**: 仅 WhatsApp（L299，经 waLink）。
**canonical/hreflang 自引用**: L63-68。
**出站内链（每 locale 5 条，L115-119 / L159-163 / L203-207，plain `<a>` 非 next/link）**:
1. `/{locale}/category/greeting-cards/` — 賀卡類目
2. `/{locale}/blog/new-year-card-printing-2027-guide/` — 深度指南（slug 存在：blog-posts.ts:2247；blog-data en.json:818 / ja.json:811 / zh-hk.json:810）
3. `/{locale}/blog/foil-stamping-3-applications-2026/` — 燙金指南（blog-posts.ts:1672）
4. `/{locale}/product/foil-greeting-cards/` — SKU 存在（products.ts:341）
5. `/{locale}/product/premium-greeting-cards/` — SKU 存在（products.ts:149）

**入站内链（指向 /nengajo-2027/ 的站内链接）**: **0 条** —— 全 src/ grep `nengajo` 仅命中本页 + blog-data 指南正文词 + blog-posts.ts keywords（L2266 `nengajo printing`，属指南关键词非链接）；导航/首页/类目页/博客正文均未链接本页（blog-data 中 `nengajo-2027` 字符串 = 0 命中）。**当前该页唯一发现渠道 = sitemap + 直接 URL**。

## 9. 该 URL 在 sitemap / manifest / blog-posts 的全仓引用（grep `/nengajo/`）

**说明**: 全仓根 grep 因仓库含 500MB 图片目录被中断，改用分目录精确 grep（src/、public/、docs/messages 走 `git grep`、scripts/ 定点）——覆盖代码与配置事实面；zprintpro-en-us-images/ 等资产目录未扫描（与代码引用无关）。

| 载体 | 结果 | 证据 |
|---|---|---|
| `public/sitemap.xml`（master） | ✅ 已登记，3 个 url 块 | L274-301（zh-hk L274-282 / en L284-292 / ja L294-301），每块含 hreflang 四连 `zh-Hant-HK/en/ja-JP/x-default` |
| `public/sitemap-zh-hk.xml` | ✅ | L94-101 |
| `public/sitemap-en.xml` | ✅ | L94-101 |
| `public/sitemap-ja.xml` | ✅ | L94-101 |
| 生成器 `scripts/generate-sitemap.js` | ✅ 已收口 | L81 `staticPages` 含 `'nengajo-2027/'`；L90 `if(u==='nengajo-2027/')return'0.8'; // seasonal campaign landing (2026-10-22 launch)` |
| sitemap 提交链 | 3eed6277 手工登记 → 被 build 的 generate-sitemap.js 覆盖（live 变陈旧）→ **ac2b8823 根因修复：写入生成器 staticPages 并重生成 x4 + IndexNow ping**（sitemap-zh-hk.xml git log 实证） |
| `public/manifest{,.en,.ja,.zh-hk}.json` | ❌ **0 引用**（4 份 manifest 均无 nengajo） | grep glob manifest*.json = No matches |
| `src/data/blog-posts.ts` | ❌ 无 URL 引用；仅 L2266 指南 keywords 含 `nengajo printing` 等（关键词，非链接） | grep |
| `src/data/blog-data/*.json` | ❌ 无 `/nengajo-2027/` 链接（`nengajo-2027` 字符串 0 命中）；指南正文含 nengajo 词（en.json:824） | grep |
| src/ 其余（middleware/nav/footer/home） | ❌ 0 引用 | 全 src grep |
| `messages/` | ❌ 0 | git grep |
| `docs/`（内部文档，非客户可见） | 12 文件提及（计数 1-6）: `2026-10-15-nengajo-2027-earlybird-page-skeleton.md`(6)、`2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md`(5)、`2026-10-16-two-week-execution-plan-v2.md`(3)、`2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md`(3)、`2026-10-26-seven-clusters-baseline-freeze.md`(2) 等 | `git grep -c -i nengajo -- docs` |
| `.hermes/drafts/nengajo-2027/` | LAUNCH-CHECKLIST.md / MERGE-SNIPPETS.md / page-nengajo-2027.tsx（runbook 实存） | ls |
| **sitemap 工作树脏状态（未提交，只读观测）** | 6 份 public/sitemap*.xml 均 `M`；抽样 diff（sitemap-zh-hk.xml）= 全量 `lastmod 2026-10-22→2026-10-26` + 新增 `comiket-c109/` url 块；**nengajo 条目本身已在 HEAD（ac2b8823），脏改动不涉及 nengajo** | git status + git diff |

## 10. en / zh-hk 是否独立版本（还是仅 ja）

**三 locale 均为独立完整版本，非 ja-only**：
- metaMap 三条独立 title/desc/keywords（L38-52）+ 三份独立页面文案对象（zh-hk L80-123 / en L124-167 / ja L168-211）+ `generateStaticParams` 三 locale（L31-33）；
- 本地化分层落实：**币种** HK$1.0/US$0.13/¥20 同构换算；**品牌** 单品牌分层——zh-hk 行=中文名品牌（字面见 AGENTS §13.16）；
- 品牌（续）：en 行与 ja 行均为 ZprintPro（单品牌）；**schema areaServed** HK/US/JP（L239）；**市场钩子** zh-hk 順豐+HK$500、en US $99+ 免运、ja DHL 日本宛；
- 差异点（供 A/B 参考）：免运承诺三 locale 不一致（见 §4.5）；en 页面向 US 市场（areaServed=US）而品类为日本年賀状，en timeline 亦含 US free shipping（L145）。

## 11. 观察项（事实记录，非拍板建议）

1. **en keywords 疑似拼写**: L46 `nengaja english`（疑为 `nengajo` 之误；客户可见 meta keywords）。
2. **页内无 はがき/官製はがき 词**: 仅自定 127×178mm（恰为日本官製はがき尺寸），页面未声明与官製はがき/私製はがき关系；`100×148` 0 处。
3. **文件头注释滞后**: L5-6 仍描述「false→404、sitemap 未登记、上线待办」状态，与已上线事实不符（§1）。
4. **落单时间口径分布**（客户可见，三处不同）: 季节页 FAQ「12 月中旬前」（L111/155/199）；深度指南 en 版「10 月底=早鸟、11 月中=normal run 最晚」（en.json:824 正文与 FAQ Q1）；指南 zh-hk/ja 版开头「11 月中前落單最穩陣 / 11月中旬までの発注が安全」（zh-hk.json:825 / ja.json:826 片段）；另站内其他贺卡文（christmas-card-printing-2026、thick-card-printing-guide）用「11 月中前 + 生产 5-7 天」口径。完整三语指南全文未逐字核对，标待证。
5. **生产表述差异**: 季节页硬承诺「3-5 工作天」（§4.4），blog 指南多为「5-7 天生产」（如 en.json:824 同文另一段、thick-card/christmas 指南）——同站两口径并存。
6. **指南未回链季节页**（§8 入站=0）：季节页单向输出权重，无回流。
7. 价格快照自证链完整（表注 L96/140/184 标 products.ts 2026-10-15 现取），抽样 2/6 SKU 逐字一致，余 4 SKU 待证。

---

## VERDICT（盘点完整度）

**10/10 项完成，整体置信：高（页面内部各项 = 确定；引用面 = 确定；跨文件口径分布 = 高置信）**。
依据：页面 306 行全文逐行读取 + 8 组定点 grep 行号交叉一致（双方法）；git log/status/diff 只读实证上线状态与 sitemap 收口链；products.ts 抽样核对 2/6 SKU 价格逐字一致（余 4 SKU 与 blog 指南全文核对标待证）；全仓根级 grep 因巨型资产目录不可行，已按 src/public/scripts/docs/messages/.hermes 分域覆盖代码与配置事实面，并在 §9 声明覆盖边界。

## 3 条最值得 K3 注意的事实

1. **页面已实质上线，但 K3 三真值仍全部空挂**：`NENGAJO_LIVE=true` 已提交（3eed6277）+ sitemap x4 已登记且生成器 staticPages 已收口（ac2b8823，priority 0.8）——A/B 拍板的语境是「给已上线页改文案/价格」，而早割率、正式締切、宛名可否三处客户可见位置仍是「確認後更新/確認中」占位（早割率至今无任何数字，fdc8569b 已撤承诺词）；另有 6 份 public sitemap 工作树未提交改动（lastmod 10-26 + comiket-c109，不涉及 nengajo 条目）。
2. **同一漏斗三套落单时间口径互相矛盾**：季节页 FAQ「12 月中旬前落單」（L111/155/199）vs 深度指南「10 月底早鸟 / 11 月中最晚」（en.json:824）与 zh-hk/ja 版「11 月中前」（zh-hk.json:825 / ja.json:826）——客户从季节页点进指南即见冲突；且指南 3 locale 均未回链季节页，全站入站内链 = 0，页面目前只靠 sitemap 被发现。
3. **三 locale 配送承诺不一致 + schema 无价格字段**：zh-hk「滿 HK$500 免費順豐 1-2 天」（L101）、en「US free shipping $99+」（L145）、ja 完全无免运承诺（L189）；JSON-LD 仅 Service + 无 price 的 Offer（L233-242），无 Product/schema 价格与日期——若 A/B 涉及价格锚点或富结果，需先补真实价格字段。附带观察：en keywords 疑似拼写 `nengaja english`（L46）、页内无 はがき 字样（§11）。
