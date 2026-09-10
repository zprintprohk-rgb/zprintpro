# 全站 SKU 标题 v4 合规审计 (2026-09-10)

> 执行身份: ZprintPro 执行层 autoclaw v1.2（全量能力两级决策权版）
> 任务: 以标题规则 SSoT 审查所有 SKU 标题是否符合规则（老板 9/10 直接命令）
> 数据来源: 线上探针 `https://zprintpro.com/{locale}/product/{slug}/` <title>（12 次实探，权威真值）/ `git show main:src/data/sku-seo-data.ts`（batch2 标题已在 main）/ `src/data/products.ts`（tsx import，99 SKU）/ `src/lib/seo.ts` L819-850 `generateProductMetadata`（模板公式）/ 今日 GSC 28d 三市场 xlsx（hk 78 词 imp≥15、en 29 词 imp≥3、ja 21 词 imp≥3）
> 规则口径: `重要文件/2026-09-08-title-rules-and-deep-blog-standard.md`（SSoT §1.1-1.6 四元素/3 筛选/零污染/冻结）+ `docs/2026-09-09-k3-title-rule-v4-write-full.md` §一（v4 写满原则: 50-54 写满区 / ≥55 禁加 / 55-60 遗留只读 / >60 待修剪 / <50 按序补）
> 当量口径: 全角 CJK×2 + 半角×1（半角当量）；zh-hk/ja 以 25-27 全角 = 50-54 当量为目标区，en 以 50-54 raw chars 为目标区

---

## 一、审查方法（线上真值链，杜绝纸面误判）

1. **生效标题链**（page.tsx L105-116）: `skuSeo.seo[locale].title || generateProductMetadata(...)` 模板值 → 已按此取线上真值
2. **探针校准**: 12 次线上 <title> 实测，确认 skuSeo 非空时以 skuSeo 为准、空时渲染模板值（模板用 product.name/nameEn/nameJa，非 title_* 字段）
3. **覆盖**: 99 SKU × 3 locale = 297 标题槽全部测量（排除 small-bags=308 重定向非线上）
4. **冻结集**（9/9 工具定义 + 9/6 贺卡批窗）: 6 贺卡 SKU 窗内只读至 9/13 判定

## 二、合规总览（线上生产 main 真值）

| locale | ✅OK 50-54 | 🔧FILL <50 | ⚠️LEGACY 55-60 | 🔴RED >60 | 合计 |
|---|---|---|---|---|---|
| zh-hk | 78 | 11（6 冻结 + 5 婚礼模板短板） | 2 | 8（4 模板超限 + gang-run 等） | 99 |
| en | 54 | 0 | 34（含 14 模板回退 + 冻结遗留） | 11（含截断破损 3+） | 99 |
| ja | 79 | 0 | 10 | 10（含模板回退 61-93 + 冻结） | 99 |

- **跨语言污染**: zh-hk 日文「推し活」2 条（can-badge / eco-tote-bag）、zh-hk 英文 3 条（custom-red-packets / save-the-date-cards / doujinshi-printing 含 Comiket 专名）；en/ja 简体/繁中 = 0（ja 的 画/学/じ 为日文标准字，非污染）
- **品牌**: zh-hk 6 冻结贺卡尾缀 ZprintPro（应为智印港，P1 窗后）；其余 OK
- **数字钩子**: zh-hk 婚礼 5 + 冻结 6 无数字钩；ja 系统性缺失（81/99 无数字，观察项）

## 三、P0 发现 — F1 新建 15 SKU 空 seo title → 模板回退破损（45 标题槽）

**根因**: F1 合并（ca85da91）为 15 个 SKU（包装 3 + 婚礼 6 + 枱卡 6）创建了 sku-seo entry，seo title 三语全空 → 线上回退 `generateProductMetadata` 模板。该模板非 v4 合规产物：

| 线上实况（探针 <title> 实证） | 问题 |
|---|---|
| en corrugated-boxes: `...Custom Packaging &amp; ShippingPr` | **60 字符硬截断「Printing→Pr」**（破损英文） |
| en foil-wedding: `...Free Shipping $99+ \| Zpri` | **截断「ZprintPro→Zpri」**（品牌被切） |
| en wedding-place-cards: `Wedding Place CardsPrinting \| ...` | 后缀粘连无空格（CardsPrinting） |
| ja 9 条: 61-93 当量（白卡 85 / 瓦楞 83 / 插口 93 / 枱卡 74...） | **全部超限 >60**，含通用填充「日本向け高品質印刷」 |
| zh-hk 婚礼 5 条: 40-44 当量 | **不足 <50**，模板「香港喜帖印刷專家」填充非 GSC 词 |
| zh-hk 枱卡 4 条: 67 当量 | **超限 >60**，「香港枱卡 / 酒水牌 / 座位卡印刷專家」过长 + 类别名重复 |

**GSC 实证（3 筛选校验）**: 婚礼/枱卡/喜帖簇三市场 **0 展示词** → 独立长尾①不可用，按不足线补序走 ②数字钩子（minQuantity/price_range 实值：50套/張起、500個起、NT$6-450、HK$0.5-1,517）③工艺修饰（specs 实值：燙金/UV/壓紋/模切/站立/PVC 防水/直插/飛機插/E-F 坑）；包装 ja 可用 パッケージ印刷（37imp）同簇（提案未用，保持主词纯净）。

**→ 45 条 v4 写满提案已起草并全部验证通过（45/45 落 50-54 当量）**，明细见 §五。

## 四、其余发现

### P1 — 6 冻结贺卡族（窗内只读至 9/13 判定，届时修复）
- zh-hk 6 条: 41-48 当量 不足 + **品牌错（尾缀 ZprintPro）** + 无数字钩
- en 3 条 LEGACY 55-60 + 1 RED 63（matte-greeting）/ ja 3 条 RED 63-67
- 修复方向（9/13 后）: 尾缀 ZprintPro→智印港 + 补数字钩（100個起 HK$X 起，products 实值）+ 修剪 ≤54

### P2 — RED 遗留 修剪（9/13 合批, 非本次 P0）
- zh-hk 4 条: gang-run-card-boxes(64 拼版卡盒) + 3 模板超限（归入 P0-A 修复）
- en 11 条 RED 61-67（same-day-flyers 67 / a2-posters 62 / calendars 61-62 / menus 62 / books 61-62 / large-red-packets 62）
- ja 6 条 RED（gang-run 73 + 3 冻结 + 模板超限归 P0-A）
- 处置: 9/13 验证窗判定后合批，按「主词+锚点保护」修剪回 50-54

### LEGACY 55-60 遗留只读（v4 §1.2 容忍区, 9/13 后新改收到 ≤54）
- en 34 / ja 10 / zh-hk 2（save-the-date 混英文已由 P0-A 提案覆盖）

### 观察项（不阻塞, 挂账）
1. ja 数字钩子覆盖率低（81/99 无数字）——ja 写满但缺「价格/MOQ/交期」弹药, 建议 9/13 批一并补
2. zh-hk 模板类别名重复（包裝盒×2「物流盒印刷|香港包裝盒定製專家」）——P0-A 提案已消除
3. ja 模板用 ジープリント（§13.16.1 alternate 单独埋点, 合规但非主品牌 ZprintPro）
4. doujinshi-printing zh-hk 含「Comiket」专名（拉丁专名, 判例待确认——建议保留或改「展會前24小時特急」）

## 五、45 条 v4 标题提案（15 SKU × 3 locale, 全部验证: 当量 50-54 ✅ / 品牌分语言 ✅ / 简体 0 ✅）

| SKU | zh-hk（25-27全角） | en（50-54ch） | ja（25-27全角） |
|---|---|---|---|
| corrugated-boxes | 瓦楞紙盒印刷訂製 坑盒E/F坑 500個起 跨境抗壓 \| 智印港 [52] | Corrugated Boxes E/F Flute 500pcs Custom \| ZprintPro [52] | 段ボール箱印刷 E/Fフルート 500個〜 耐圧 \| ZprintPro [51] |
| white-card-boxes | 白卡彩盒印刷訂製 化妝品盒 500個起 免費送貨 \| 智印港 [50] | White Cardboard Boxes 500pcs Gift Boxes \| ZprintPro [51] | 白カードボックス印刷 500個〜 特注・化粧品 \| ZprintPro [53] |
| tuck-end-boxes | 插口盒印刷訂製 直插/飛機插 500個起 輕量彩盒 \| 智印港 [52] | Tuck End Boxes Straight/Airplane 500pcs \| ZprintPro [51] | 差し込み式ボックス印刷 直挿し 500個〜 軽量 \| ZprintPro [54] |
| foil-wedding-invitations | 燙金喜帖印刷 金銀玫瑰金 50套起印 即日報價 \| 智印港 [50] | Foil Wedding Invites 50 Sets Foil Print \| ZprintPro [51] | 箔押し結婚式招待状 金銀 50セット〜 特急 \| ZprintPro [51] |
| save-the-date-cards | 結婚通知卡印刷 A6 50套起 NT$18起 燙金UV 設計 \| 智印港 [53] | Save the Date Cards 50 Sets Custom Wedding \| ZprintPro [54] | Save the Date カード印刷 50セット〜 箔押し \| ZprintPro [54] |
| wedding-thank-you-cards | 婚禮感謝卡印刷 燙金UV 50套起印 A6 即日報價 \| 智印港 [51] | Wedding Thank You Cards 50 Sets Foil Print \| ZprintPro [54] | 結婚式サンキュカード 50セット〜 箔押しUV \| ZprintPro [52] |
| wedding-program-cards | 婚禮節目單印刷 A5對摺 50套起印 燙金UV 雙面 \| 智印港 [51] | Wedding Program Cards A5 50 Sets Custom \| ZprintPro [51] | 結婚式プログラム印刷 A5 50セット〜 箔押し \| ZprintPro [53] |
| wedding-menu-cards | 婚禮菜單卡印刷 燙金UV 50套起印 A5 即日報價 \| 智印港 [51] | Wedding Menu Cards A5 50 Sets Foil Print \| ZprintPro [52] | ウェディングメニュー印刷 50セット〜 箔押し \| ZprintPro [54] |
| wedding-suite-bundle | 婚慶套裝印刷 請帖+回禮卡 50套起印 6件齊全 \| 智印港 [50] | Wedding Suite Bundle 6 Pcs 50 Sets Custom \| ZprintPro [51] | 結婚式6枚セット印刷 50セット〜 箔押し特急 \| ZprintPro [53] |
| wedding-place-cards | 婚宴枱卡印刷 燙金壓紋 50張起 NT$8起 站立式 \| 智印港 [51] | Wedding Place Cards 50 Sets Foil Stand-Up \| ZprintPro [53] | ウエディング席札印刷 50枚〜 箔押し・特急 \| ZprintPro [54] |
| drink-tokens | 酒水牌印刷 PVC防水 50張起 NT$6起 圓角模切 \| 智印港 [50] | Drink Tokens PVC Waterproof 50pcs Custom \| ZprintPro [52] | ドリンクトークン PVC防水 50枚〜 オリジナル \| ZprintPro [54] |
| escort-cards | 座位卡印刷 燙金UV 50張起 站立式 婚宴宴會 即日 \| 智印港 [54] | Escort Cards 50 Sets Gold Foil Stand-Up \| ZprintPro [51] | エスコートカード印刷 50枚〜 箔押し・特急 \| ZprintPro [54] |
| name-tags-badges | 會議名牌印刷 活動襟章 50張起 NT$10起 燙金 \| 智印港 [50] | Name Tags 50pcs Custom Conference Badges \| ZprintPro [52] | 名札印刷 会議用 50枚〜 箔押し・磁石・特急 \| ZprintPro [53] |
| cafe-table-cards | 餐廳枱卡印刷 PVC防水 50張起 NT$10起 站立式 \| 智印港 [51] | Cafe Table Cards 50pcs Waterproof Stand-Up \| ZprintPro [54] | カフェテーブルカード印刷 防水 50枚〜 特急 \| ZprintPro [53] |
| wedding-seating-charts | 婚宴席位圖印刷 A1/A2 50張起 燙金UV 即日報價 \| 智印港 [52] | Wedding Seating Charts A1/A2 50 Sets Foil \| ZprintPro [53] | 披露宴座席表印刷 A1/A2 50枚〜 箔押し・特急 \| ZprintPro [54] |

`[N]` = 半角当量实测；验证脚本 `.hermes/title-proposals-verify.mjs`（45/45 通过）；数据 JSON `.hermes/title-proposals-45.json` / `title-proposals-by-slug.json`

**提案合规要点**: ① 主词前置（瓦楞紙盒印刷/燙金喜帖/婚宴枱卡...）② 工艺修饰 1-3（specs 实值）③ 数字钩子 1-2（MOQ+价格实值, 禁编造: NT$/HK$ 来自 products.price_range）④ 品牌末尾一次分语言（智印港 / ZprintPro）⑤ 零污染（save-the-date zh-hk 改「結婚通知卡」消除英文; 无简体; en 无中文截断）⑥ 全部 ≤54 防 Google 重写

## 六、执行结果（老板 9/10 拍板方案 A：立即执行 45 条 P0 ✅ 已上线）

- **注入**: `src/data/sku-seo-data.ts` 45 条 title（15 SKU × 3 locale），body/其他字段未动
- **验证**: 45/45 值匹配 + 当量 50-54 + 品牌分语言 + 简体 0 + 名片词 0；tsc 54=54（0 新增）/ build exit 0 / encoding ✓
- **commit** → merge `0c154d68`（23:57:22 push）→ CF deploy `b4ce2e87` success（5 poll ~4min）
- **线上探针（deploy 后）**:
  - en corrugated-boxes: `Corrugated Boxes E/F Flute 500pcs Custom | ZprintPro` ✅（原截断 ShippingPr 修复）
  - en foil-wedding: `Foil Wedding Invites 50 Sets Foil Print | ZprintPro` ✅（原截断 Zpri 修复）
  - ja corrugated: `段ボール箱印刷 E/Fフルート 500個〜 耐圧 | ZprintPro` ✅（原 RED 83 修复）
  - zh-hk foil-wedding: `燙金喜帖印刷 金銀玫瑰金 50套起印 即日報價 | 智印港` ✅（原 FILL 40 修复）
  - zh-hk wedding-place: `婚宴枱卡印刷 燙金壓紋 50張起 NT$8起 站立式 | 智印港` ✅
  - zh-hk drink-tokens / en save-the-date / ja wedding-place ✅
  - 蓝本 waterproof-stickers 标题回归未动 ✅
  - zh-hk 16 品类全部 200 ✅（初次探针 2 个 ERR 为超时抖动，重试 200）

**遗留（9/13 合批）**: 6 冻结贺卡族（zh-hk 尾缀 ZprintPro 品牌错 + 不足 41-48 + 无数字钩；en 3 LEGACY + 1 RED；ja 3 RED）→ 窗判后按 §四 P1 方向修复；en 11 + ja 6 + zh-hk 2 RED 遗留修剪回 50-54；en LEGACY 34 / ja 10 只读；观察项（ja 数字钩子、doujinshi Comiket 专名）挂账。

## 附：执行建议（原文，已拍板）

- **方案 A（推荐）**: 立即执行 45 条 P0 提案。理由: 线上标题当前**已破损**（en 截断 ShippingPr/Zpri、ja 61-93 超限、zh-hk 婚礼 40-44 不足），且 15 SKU 为 F1 新内容无验证窗、无 churn 风险（此前从未优化）；冻结 6 贺卡 + RED 遗留留 9/13 合批。流程: 改 sku-seo-data.ts（45 title 注入）→ 当量脚本复跑 + 三闸门 → 攒批 push（§0.25.9, 30min 窗口）→ 探针验收。
- **方案 B**: 全部留 9/13 与贺卡/RED 合批（省 1 次 build, 但破损标题多挂 3 天）。
- **方案 C**: 仅保留本报告（后续自取提案执行）。

> 执行层拍板理由（若选 A）: 破损英文标题 = P0 级质量事故（SERP 显示半截品牌词），修复零风险（新内容首优化）——符合「执行细节往赚钱/省钱方向倾斜」。
