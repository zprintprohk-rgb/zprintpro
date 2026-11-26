# G1 承接页直答六问真值核查 + 两项 PENDING 关闭（只读）

- 日期: 2026-11-25 · 执行层: autoclaw 研究员 · 只读（未写 src/，探针脚本在 .hermes/tmp/）
- 方法: 第一步 slug 从 src/data/products.ts / src/generated/sitemap-content.ts 源定位；第二步 live 串行探针（间隔 2.3s，状态码+slug-marker+长度>30KB 三校验，12/12 valid，0 INVALID）；第三步 PENDING 两项专项 GET。CJK 判定全走 Node utf-8（§0.26.9）。
- 双方法复算（§0.23.2）: 方法 A = 整页 strip-tags 后 regex 上下文抓取；方法 B = 针对疑点（NT$/$0.05/HK$·ja/RMB/WA 预填）二轮定点重抓并按上下文人工判读。两轮结论一致方可入结论；NT$×2、$0.05、HK$·ja 均两轮命中。
- 数据来源:
  - 源码: src/data/products.ts（L2979 food-boxes / L2546 a1-posters / L2461 a2-posters / L788 / L870 / L5825 / L951 / L139 / L135 / L134）, src/generated/sitemap-content.ts（SITEMAP_IMAGE_XML）
  - live 探针: zprintpro.com 12 URL + sitemap-image.xml + zh-hk/category/paper-bags/（2026-11-25 本轮，原始 JSON: .hermes/tmp/g1-probe-20261125.json）
  - 校准状态: 已校准（本轮 live + 源码双源一致）

## 结论摘要（高置信）
1. 12 个承接页全部 200 在线且 slug marker 命中；两项 PENDING 均可关闭：sitemap-image.xml = 200 application/xml、239 `<url>`、987 `<image:loc>` 合法 XML；paper-bags 报价模板区块在线且 6 行全渲染。
2. 六问直答达标面：MOQ/计价 11/12 页清晰；材质尺寸 12/12；生产-送达分开 8/12（A1 海报、证书、A2 海报部分、en PDP 弱）；WhatsApp 预填 7 字段（品类/尺寸/材质/数量/档案/交货地/日期）无任何页面全齐——档案、交货地两字段系统性缺失；急件 18:00 截单口径在全部 12 页 0 命中（均为「以报价确认」/加急 20-30%）。
3. 错币/价格真值 3 处硬缺口：① zh-hk 婚庆类目页 SKU 卡出现 NT$×2（NT$25-95、NT$15-55）；② en 类目页 title+JSON-LD 写 $0.05 而同页 FAQ 与 PDP 写 US$0.55（10× 矛盾）；③ ja 小批量页 hero ¥69 与报价表 HK$89-196 双币并存（页面自称「JPY 日本円建て」）。

## §A 第一步：slug 真实定位（源码 → live 验证）
| # | 任务词 | 真实 slug / URL | 类目 | live |
|---|--------|-----------------|------|------|
| 1 | 食品包装 (zh) | product/food-boxes (products.ts L2979, category_slug=packaging) | packaging | 200 |
| 2 | A1 海报 PDP | product/a1-posters (L2546) | posters | 200 |
| 3 | A2 海报 PDP | product/a2-posters (L2461) | posters | 200 |
| 4 | 透明贴纸 | product/transparent-stickers (L788) | stickers | 200 |
| 5 | 可移贴纸 | product/removable-stickers (L870) | stickers | 200 |
| 6 | 证书 | product/certificates (L5825) | educational | 200 |
| 7 | small batch en 页 | **独立 PDP /en/product/small-batch-stickers/ (L951) 存在且 200**；同时 /en/category/stickers/ 类目页 title/H1 也以 "Small Batch Sticker Printing" 定位 → 两层承接并存：类目页打主词+USA 定位，PDP 打价格/MOQ 承接 | stickers | 200×2 |
| 8 | ja small-batch 页 | product/small-batch-stickers @ /ja/（三语 imagesByLocale 齐全） | stickers | 200 |
| 9 | 婚礼 (zh) | category/wedding-invitations (类目页, L139; SKU 挂 L6881/L6933) | wedding-invitations | 200 |
| 10 | 利是封 cny | **无独立 cny 专页**（src/app grep cny = 0 命中）；承接页 = category/red-packets (L135) | red-packets | 200 |
| 11 | 月历 | category/calendars (类目页; PDP = wall-calendars L4010 / desk-calendars L4065) | calendars | 200 |

## §B 第二步：六问 × 页面矩阵（live 首屏可见答案）
图例: ✅=直答清晰 △=部分/含糊 ❌=缺失/矛盾 | 币种列为 HK$/US$/NT$/¥ 可见计数（整页可见文本）

| 页面 | ①MOQ/计价 | ②尺寸/材质 | ③18:00 急件 | ④生产/送达分开 | ⑤WA 预填 | ⑥币种真值 |
|---|---|---|---|---|---|---|
| zh food-boxes | ✅ 100個起 HK$2.5起/個 | ✅ 食品级纸材+白卡/瓦楞/牛皮表 | △ 加急20%·截稿以报价确认·无18:00 | ✅ 生产3-5工作天+顺丰1-2天+DHL2-4天 | △ 盒型/数量/尺寸/用途+交期；缺材质/档案/交货地 | ✅ HK$20 NT0 ¥0 |
| zh a2-posters | ✅ 10張起 HK$16起/張 | ✅ 420×594mm 200g铜版/PP | △ 即日badge·无18:00 | △ 「1-2天交货」无生产天数 | △ A2模板:尺寸/材质/数量+交期；缺档案/交货地 | ✅ HK$30 US$3* NT0 ¥0 |
| zh a1-posters | ❌ title HK$20 vs 卡片 HK$29-45 矛盾 | ✅ 594×841mm 铜版/PP/相纸 | △ title「4小時打稿」·无18:00 | ❌ 生产天数缺（以报价确认） | ❌ 预填模板写 A2（SKU 错配） | ✅ HK$30 NT0 ¥0 |
| zh transparent-stickers | ✅ 10張起 HK$0.38-1.50/張 | ✅ 透明PET·评分卡3材质 | △ 加急20%·无18:00 | ✅ 生产5-7工作天+顺丰1-2天 | ✅ 尺寸/数量/材质/用途/交货日期 5字段（最全） | ✅ HK$17 NT0 ¥0 |
| zh removable-stickers | ✅ 10張起 HK$0.45-1.60/張 | ✅ 铜版/PVC合成/透明 | △ 加急20%·无18:00 | ✅ 生产3-5工作天+1-2天送达 | ✅ 同贴纸5字段模板 | ✅ HK$19 NT0 ¥0 |
| zh certificates | ✅ 10張起 HK$8-40/張 | ✅ 道林/书纸/水印纸 80-100g | △ FAQ「特急…以报价确认」·无18:00 | △ 生产与交期均「以报价确认」 | △ 品类/纸材/尺寸/数量/工艺+交期；缺档案/交货地 | ✅ HK$17 NT0 ¥0（RMB=支付FAQ合法表述） |
| en small-batch PDP | ✅ 10pc 起 US$0.55/pc | ✅ WhiteVinyl/ClearPET/Foil·A4 | △ rush cutoff confirmed at quote·无18:00 | △ production confirmed at quote·US$99+ free ship | ✅ Size/Qty/Material/Shape/Turnaround 5字段；缺日期/交货地 | ✅ US$8+55×$ NT0 ¥0 |
| en category stickers | ❌ title+JSON-LD $0.05 vs FAQ US$0.55 | ✅ 材质卡 PVC/PET/PP | △ Same-day(digital 50-500)·无18:00 | ✅ 生产2-3工作天+ship 2.3天+DHL2-4 | ❌ 仅通用预填（无品类字段） | ✅ US$8 NT0 ¥0（HK$3=FAQ 对比价） |
| ja small-batch PDP | ✅ 10枚から ¥69/枚 | ✅ A4最小·HP Indigo/CMYK表 | ✅ A4 1-50枚 即日仕上げ(特急料金)·无18:00 | ✅ DHL 2-4日/航空便3-5日·配送表 | ✅ サイズ/枚数/素材/用途/希望納期 | ❌ hero ¥69 vs 报价表 HK$38/HK$89-196 双币并存 |
| zh wedding-invitations | ✅ 50套起 NT$25-95/**NT$15-55** | ✅ 300g棉纸/350g刚古/铜版·5材质 | △ 急件5天(+30%)·无18:00 | ✅ 生产7-10工作天(急件5天)+顺丰24h/DHL | ❌ 仅通用预填 | ❌ **NT$×2 错币** HK$11 |
| zh red-packets | ✅ 100個起 HK$1.10-3.00/個 | ✅ 120-150g红纸/FSC再生 | △ 旺季11月底前下单·无18:00 | ✅ 标准5-7工作天(复杂7-8天)+港九速递 | ❌ 仅通用预填 | ✅ HK$26 NT0 ¥0 |
| zh calendars | ✅ 1本起(数码) HK$3-8/本 | ✅ 250-300g铜版/哑粉·金属圈 | ✅ 急件2-3日(数码)·无18:00 | ✅ 数码3-5日/柯式5-7日+顺丰/DHL | ❌ 仅通用预填 | ✅ HK$14 NT0 ¥0 |

*zh-a2 页 US$3 = 正文引用「A1 US$4.60 起」他 SKU 参照，非本 SKU 计价，判定合法。

## §C 逐页证据原文行（live 可见文本，2026-11-25 抓取）
### zh-food-boxes（238KB, title 食品包裝盒印刷 訂製 100個起 HK$2.5）
- ① 「食品包裝盒印刷訂製，100個起印，HK$2.5起/個」/ 价格件 PK-003「最低訂購量 100個」「HK$2.50 × 100 = HK$250.00 MOQ 100」
- ② 「白卡紙 / 灰板 1200g 高密度灰板外裱 157g 銅版紙…瓦楞紙板 E 坑 / B 坑…牛皮紙」+「120×120×50mm（茶包／朱古力）」
- ③ 「加急訂單（24 小時打稿 + 2 天生產）加收 20%」「急件截稿與送達以報價確認」
- ④ 「標準生產 3-5 個工作天，港九新界順豐速遞 1-2 個工作天送達…跨境訂單 DHL 全球 2-4 個工作天配送」
- ⑤ 「我想報價【盒型：____】【數量：____個】【尺寸：____mm】【用途：____】，麻煩報價同講下交期」
- ⑥ HK$20 / NT$0 / ¥0
### zh-a2-posters（256KB, title 10張起印 HK$16起）
- ① 「10件起印，HK$16.00 起」「HK$16.00 × 10 = HK$160.00 MOQ 10」PO-001
- ② 「420×594mm」+「銅版紙/啞粉紙 128g-200g…PP 合成紙…相紙」
- ③ 「印刷即日速遞送貨｜今天下單 · 急件截稿與送達以報價確認」
- ④ 「1-2天交貨，全港送貨」（生产天数未给）
- ⑤ 「我想印海報，尺寸【A2】，材質【128g 銅版紙】，數量【200】張…報價同交期」
- ⑥ HK$30 / US$3（A1 US$4.60 引用）/ NT$0 / ¥0
### zh-a1-posters（240KB, title 1張起印 HK$20起 4小時打稿）
- ① ❌ 「A1大幅海報 1件起印，HK$29.00-45.00 起」vs「HK$20.00 × 1 = HK$20.00 MOQ 1」（title/卡矛盾）PO-002
- ② 「594×841mm」+ 三材质表同上
- ③ 「建議急件可拆數碼快印與後工裱貼分段排程」
- ④ ❌ 「1 張起印，48 小時快遞」为营销语；生产天数=「標準交期 以報價確認」
- ⑤ ❌ 预填为「尺寸【A2】，材質【128g 銅版紙】，數量【200】張」（A2 模板未按 A1 定制）
- ⑥ HK$30 / NT$0 / ¥0
### zh-transparent-stickers（226KB, title 10張起 HK$0.38起）
- ① 「10張起印，HK$0.38-1.50/張 起」ST-002「HK$0.38 × 10 = HK$3.80 MOQ 10」
- ② 「透明PET材質」+ 评分卡「透明PET/PVC防水/銅版紙」
- ④ 「標準生產 5-7 個工作天，加急…加收 20%…1-2 個工作天送達」
- ⑤ 「【尺寸】50×50mm【數量】1000 張【材質】光粉/透明/啞銀【用途】…【交貨日期】X 月 X 日前」
- ⑥ HK$17 / NT$0 / ¥0
### zh-removable-stickers（238KB, title 10個起 HK$0.45起）
- ① 「10張起印，HK$0.45-1.60/張 起」ST-003「HK$0.45 × 10 = HK$4.50 MOQ 10」
- ② 「銅版紙貼紙…PVC / 合成紙貼紙…透明」
- ④ 「標準生產 3-5 個工作天…順豐速遞 1-2 個工作天送達」（与 transparent 页 5-7 口径不一）
- ⑤ 同贴纸 5 字段模板
- ⑥ HK$19 / NT$0 / ¥0
### zh-certificates（219KB, title 10張起 HK$8起）
- ① 「10張起印，HK$8-40/張 起」ED-002「HK$8.00 × 10 = HK$80.00 MOQ 10」
- ② 「道林紙 100% 化學漿…書紙…」features「80g–100g書紙或道林紙」「浮水印紙」
- ③④ 「印刷交貨期需要多久？特急最快幾耐？ 標準訂單的生產與交期以報價確認」
- ⑤ 「我想印【畢業證書】，紙材【水印紙】，尺寸【A4】，數量【100】張，封面要【燙金＋防偽底紋】」
- ⑥ HK$17 / NT$0 / ¥0；RMB 1 = FAQ「多幣種結算（港幣/美元/日圓/人民幣）」合法
### en small-batch-stickers PDP（291KB, title from $0.55 | 10pcs）
- ① 「from 10 pc, from US$0.55/pc」ST-004「$0.55 × 10 = $5.50 MOQ 10」「Minimum order 10pc」
- ② 「Material & Quantity Comparison: White Vinyl 10 pcs…Clear PET…Foil」
- ③ 「rush cutoff & delivery confirmed at quote」
- ④ 「Production After Artwork Approval: Standard turnaround confirmed at quote」+「Free US shipping $99+」
- ⑤ 完整预填: 「- Size: [e.g. 50×50mm] - Quantity: [e.g. 1000 pcs] - Material: [gloss/matte/transparent/PVC] - Shape: [square/round/custom die-cut] - Turnaround: [standard/rush]」
- ⑥ US$8 + $×55 / NT$0 / ¥0
### en category stickers（321KB, title $0.05 · 10 MOQ）
- ① ❌ title「Small Batch Sticker Printing $0.05 · 10 MOQ」+ JSON-LD「from $0.05, 10 MOQ」vs 同页 FAQ「prices from US$0.55 per sticker」+ 卡片「$0.05 /pc From 10 pcs · batch $9」
- ② 卡片材质:「[Material] PVC waterproof / PP synthetic paper…」「Clear PET…white ink…」
- ③ 「Same-day (digital, 50–500 pcs); Standard 2–3 days (offset)」
- ④ 「Standard production takes 2–3 working days after artwork confirmation. Average sticker shipping is 2.3 days, and DHL worldwide…2-4 business days」
- ⑤ ❌ 仅「Hi, I'd like to inquire about …」通用预填（无字段模板）
- ⑥ US$8 / HK$3（FAQ 对比价「1000 pcs…cost roughly HK$200–350」）/ NT$0 / ¥0
### ja small-batch-stickers PDP（285KB, title 10枚〜 ¥69〜）
- ① 「小ロットステッカー / ラベル印刷 は 10枚から、¥69/枚 〜」「最小注文数 10枚」「¥69 × 10 = ¥690 MOQ 10」ST-004
- ② 「HP Indigo デジタル印刷 1 枚から対応…4 色 CMYK オフセット 500 枚以上…光膜ラミネート…型抜き」
- ③ 「即日仕上げ対応：A4 サイズ 1〜50 枚は当日仕上げ（自社工場受取・特急料金）」「短納期特急：…納期は見積もりで確認」
- ④ 「DHL 世界配送 2-4 日 日本全国へ国際配送（航空便3-5日…）」+ 配送表「DHL Express 2〜3 営業日」
- ⑤ 「【サイズ】50×50mm【枚数】1000枚【素材】光沢/透明/マット銀【用途】…【希望納期】〇月〇日まで」
- ⑥ ❌ ¥15（hero ¥69）vs HK$15（报价引擎段「A4 版基本価格 HK$38（約 700 円）〜、PP 合成紙 +HK$10、PET 透明 +HK$15、型抜き +HK$30」+ 价格表「HK$89/枚 HK$134/枚 HK$196」）；页面自称「JPY 日本円建て明朗会計」与 HK$ 计价表并存
### zh wedding-invitations 类目页（182KB, title 50 套起印）
- ① 「[起訂] 50 套」×2 SKU 卡（燙金喜帖/婚禮感謝卡）
- ② 「[材質] 300g 棉紙 / 350g 剛古紙 / 300g 銅版紙」+「5 種喜帖材質對比」
- ③ 「生產週期 標準 7-10 個工作天,急件 5 天 (+30%)」
- ④ 同上 + 「順豐本地 24h 達 / DHL 全球 2-4 天 (50+ 國家直送)」
- ⑤ ❌ 仅 header/sidebar 通用预填（「Category Sidebar WhatsApp CTA…來源：category-sidebar」）
- ⑥ ❌ 「[起訂] 50 套 **NT$25-95** / 套 起」「[起訂] 50 套 **NT$15-55** / 套 起」——zh 页 NT$×2；同页 HK$11（工艺加价 HK$1-3、满 HK$500 包邮）
### zh red-packets 类目页（256KB, title 100個起）
- ① 「六款利是封一律 100 個起印」「[起訂] 100 個 HK$1.10/個 起」等 6 卡
- ② 「120g紅色紙張；燙金／燙銀」「150g紅色紙張；浮雕＋燙金」「FSC認證再生紙或種子紙」
- ③ 「旺季建議 11 月底前下單」（无 18:00/急件加价句）
- ④ 「標準工藝 5-7 個工作天，複雜工藝 7-8 天」+「港九新界免費速遞，順豐上門，跨境訂單全球配送」
- ⑤ ❌ 仅通用预填
- ⑥ HK$26 / NT$0 / ¥0
### zh calendars 类目页（289KB, title 1本起印）
- ① 「1 本起訂（數碼印刷）」「[起訂] 1 本 HK$3/本 起」「HK$3.00-8.00 每本」
- ② 「250g–300g銅版紙或啞粉紙；金屬圈」「200g–250g銅版紙或卡紙；三角座架」
- ③ 「數碼印刷標準 3-5 日，柯式 5-7 日，急件 2-3 日（數碼）」
- ④ 「座枱曆／掛曆按箱規安排順豐或貨車…海外客戶有 DHL」
- ⑤ ❌ 仅通用预填
- ⑥ HK$14 / NT$0 / ¥0

## §D 第三步：两项 PENDING 判定
| PENDING | 判定 | 证据 |
|---|---|---|
| ① GET /sitemap-image.xml | ✅ 关闭：在线、形态合法 | status 200, content-type `application/xml; charset=utf-8`, 251,422 bytes, `<?xml …?><urlset xmlns=…sitemap/0.9 xmlns:image=…sitemap-image/1.1>`, 239 `<url>`, 987 `<image:loc>`, 无重定向；样例 loc=zh-hk/product/a1-posters lastmod 2026-11-21 |
| ② /zh-hk/category/paper-bags/ 报价模板区块（CategoryProcurementAssets） | ✅ 关闭：在线全渲染 | status 200, 321KB 级页面; markers 全命中：eyebrow「報價模板」×1、title「紙袋報價尺寸輸入模板（一表交齊，即刻報價）」×1、行「展開尺寸」×1（示例「中號 260 × 170 × 250 mm」×1）、「手挽」×8、「100 個起印」×8、「糊位檢查」×1、footnote「免費刀模設計 + 免費打稿…滿 HK$500 順豐免運」×3；6 行完整：展開尺寸/材質/手挽/印刷工藝/數量/交期與檔案 + 3 links（牛皮紙袋訂製/紙袋類目/立即報價）。11-25 k3-review F4 的「抓取截断」不复现（本轮整页抓取无截断） |

## §E 缺口清单（按严重度）
1. 🔴 婚庆类目页 NT$ 错币：zh-hk/category/wedding-invitations/ 2 张 SKU 卡价格「NT$25-95」「NT$15-55」——zh 页应 HK$。疑数据源 price 字段带错币种符号（需查 wedding SKU 卡价格模板）。
2. 🔴 en 类目页价格 10× 矛盾：title+JSON-LD「$0.05」vs 同页 FAQ「US$0.55」+ PDP ST-004 US$0.55/pc。$0.05 疑为 $0.55 掉位。title 与 JSON-LD 同源，会同时进 SERP 与 AI 引用。
3. 🔴 ja 小批量页双币并存：hero「¥69/枚」+ 报价表 HK$38/HK$89-196 + 加购 HK$10/15/30，页面却承诺「JPY 日本円建て」；AI 引用会随机取其一。
4. 🟠 A1 海报页内部价格矛盾：title「HK$20起」vs SKU 卡「HK$29.00-45.00 起」（PO-002）。
5. 🟠 WhatsApp 预填 7 字段系统性缺口：全部 12 页均无【档案】与【交货地】字段；4 个类目页（wedding/red-packets/calendars + en stickers）连品类字段模板都没有，仅通用来源追踪预填。Kimi §4.2 ⑤要求 7 字段，最高达成 5/7（贴纸 zh/en/ja PDP）。
6. 🟠 急件 18:00 口径在 G1 层不可直答：12 页 0 命中「18:00」截单（唯一命中为 footer 营业时间 09:00-18:00）；各页以「急件截稿以报价确认」/加急 20-30%/急件 2-3 日表述。若 Kimi §4.2 ③要求页面直答「18:00 前下单可加急」，G1 承接页全部不满足。
7. 🟡 生产/送达分开弱页：a1-posters（生产天数缺）、certificates（生产与交期全「以报价确认」）、en small-batch PDP（production confirmed at quote）。
8. 🟡 贴纸同类目生产口径不一：transparent「5-7 工作天」vs removable「3-5 工作天」（同 stickers 分类）。
9. 🟡 A1 页 WhatsApp 预填模板为 A2 例子（SKU 级未定制）。

## §F 待证项 / 下一步
1. NT$ 来源定位：查 src/data 婚庆 SKU 卡价格渲染组件/数据字段是否硬编码 NT$（建议 grep 'NT\$' src/，只读）。
2. en $0.05 来源：查 en stickers 类目 title/JSON-LD 生成链（category-seo-content 或 sku-seo-data），确认 $0.05 是否应 $0.55。
3. ja 报价表 HK$ 是否为报价引擎真实口径（HK$38 約700円 换算注记存在）还是迁移遗留，需 K3 拍板「ja 计价货币统一 ¥」后修。
4. 急件 18:00：确认 SSoT 口径（print-method-policy.ts / rush SSoT）后，决定是否在 G1 承接页补「18:00 截单」直答句——涉及 src 客户可见内容，走 §0.25 攒批，不在本轮只读范围。
