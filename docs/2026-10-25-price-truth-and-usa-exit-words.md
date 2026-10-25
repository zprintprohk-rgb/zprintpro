# 2026-10-25 执行报告 — 类目价格真值收口批 + USA query×country 退场词定位

VERDICT: DONE (3 src commits, 29 edits, 2 files)
CONSUMED: 车道 10-24 gsc-feedback 报告「下一步」①②④ + ③ 数据拉取
DELIVERED:
- ① paper-bags + posters 类目页内价格收口 (6692f169, 22 edits)
- ② posters 类目 meta desc 直答强化 + 价格对齐 (2a3443c4, 3 descs)
- ④ books(小冊子/騎馬釘) meta desc + paper-bags catalog FAQ 价格对齐 (a02aab3d, 4 edits)
- ③ GSC query×country 28d 拉取 + USA 退场词定位 (.hermes/logs/gsc-query-country-2026-10-25.json)
NEXT: K3 裁决清单见文末；推批后线上探针验收 paper-bags/posters 类目页

## 数据来源
- products.ts (price SSoT): kraft-paper-bags basePrice 8 / basePrice_en 1.84 / basePrice_ja 240; white-card 12/2/360; gift 20/4/600; a2-posters 16/2.3/300; a1-posters 20/4.6/600; saddle-stitch-booklets 6/1.84/258
- price-tables: posters.json (A2 157g qty50=HK$9/张; A1 PP qty1=HK$45/张); books.json (saddle 500本=HK$2.62/本)
- skuMoneyFAQs (product-faqs.ts): a2-posters zh HK$9起/张 / en $2.30 / ja ¥300; saddle-stitch zh HK$6起/本 / en $1.84 / ja ¥258
- 线上 PDP 实测 (2026-10-25 11:0x, zprintpro.com): kraft HK$8起/个; a2-posters HK$9起; a1-posters HK$45起(1张起印)
- GSC Search Console API (service account, 28d 2026-09-27~10-24): query×country, 1,562 rows → .hermes/logs/gsc-query-country-2026-10-25.json

## 一、价格真值收口（§0.23 红线类：客户可见数字对齐 SSoT）

### 1. paper-bags 类目页内 (category-seo-content.ts, 16 edits)
- zh featuredSnippet/coreAdv/buyingGuide/FAQ: 牛皮 HK$1.5→HK$8/個起 / 白卡 1.8→12 / 珠光燙金 3.5→20
- en featuredSnippet/coreAdv/FAQ: US$0.19→1.84 / 0.23→2 / 0.45→4
- ja featuredSnippet/coreAdv/FAQ: ¥22→240 / 28→360 / 55→600
- 「低至 HK$1.5/個」批量主张 → 对齐 SSoT 带底 HK$3/個
- 删除无来源「5,000 個以上階梯折扣 15-25%」百分比主张（3 语），改定性「另有階梯折扣」
- 注意: seo.ts meta desc 原已正确 (HK$3-8/個 / $1.84 / ¥240), 页内与 meta 此前自相矛盾 (同 order 25 信封案型)

### 2. posters 类目页内 (category-seo-content.ts, 6 edits)
- 「A2 128g 銅版紙 HK$6-9/張，A1 HK$10-16/張」→「A2 157g 銅版紙 HK$9 起/張，A1 HK$45 起/張」×3 语 ×2 面 (featuredSnippet + techSpecs 參考價)

### 3. posters 类目 meta desc (seo.ts, 3 descs) — 车道下一步 #2
- zh: HK$10 起/張 → A2 HK$9 起/張、A1 HK$45 起/張 (148c)
- en: $3.50 → $2.30 (A2 157g) / $4.60 (A1), 280c→153c (原超 158 长期截断)
- ja: ¥500〜 → A2 ¥300〜 / A1 ¥600〜 (133c)

### 4. books meta desc + catalog FAQ (seo.ts + category-seo-content.ts, 4 edits) — 车道下一步 #4 复查发现
- zh: HK$2.5 起/本 → HK$6 起/本 (166c→150c); en: $1.20 → $1.84 (364c→153c); ja: ¥180〜 → ¥258〜 (131c)
- paper-bags en catalog FAQ: saddle stitch $1.20 → $1.84
- 验证排除: foil-wedding-invitations $1.20 = SSoT 正确 (basePrice 1.2), 未动

### 验收
- tsc 54=54 (基线持平); brand A0; gsc-leak 0; 区城内旧价族 0 残留 (residue 检查)
- 双方法复算 (§0.23.2): 线上 PDP 实测 + price-tables + skuMoneyFAQs 三源一致 (A2 HK$9/A1 HK$45/A1 PP qty1=45)

## 二、USA query×country 退场词定位 (28d, 内部数据)

数据: .hermes/logs/gsc-query-country-2026-10-25.json (1,562 rows; usa 424 rows / 1,176 imps)
关键: **USA 424 词行中 420 行 0 点击** (1,161/1,176 imps 零点击) — US 是「排名有、点击无」结构问题

退场词 (imps≥5, 0 clicks, pos≤30, 高投入低回报 → 不再追加内容投资):
- evaluate the printing services company moo (6 imps pos 3.0) — 竞品评测意图, 无法转化
- car wrapping (5/19.6) / mailer box no minimum order (7/78.7) / peel off posters (6/38) — 无关业务
- calendar sizes (14/46.1) / how big is a standard wall calendar (12/68.9) / perfect bound booklet (6/59.2) — 深页词

进攻面 (排名好但 0 点击 → desc/富摘要优化, 与本批 desc 修复同向):
- small batch sticker printing (45 imps pos 4.7!) / small batch stickers (25/5.2)
- a2 poster (46/13.5) + a2 size poster (10/8.4) + a2 poster printing (7/8.3) + a1 poster printing (5/3.4) — 本批 posters desc 修复直接覆盖
- saddle stitch booklet printing (15/9.6) — 本批 books desc 修复覆盖
- large envelopes (22/14.2) / a5 flyer size (7/8.4) / exercise book printing (5/7.4)

中程 (pos 15-30, 需内容/权威):
- china catalog printing (43/16.7) + catalog printing china (27/22.4) + catalogue printing china (25/15.1) + catalogs printing china (9/25.1) + cheap catalog printing china (9/37.6) — 车道 10-24 已规划 en 差异化

## 三、K3 裁决清单 (待拍板)

1. **blog 价格族 (C4 邻近)**: paper-bag-printing-guide zh-hk/en/ja + poster 系指南 (poster-printing-price-guide / poster-size-guide 等) 携带旧价族 (HK$1.5/0.19/22 族 + HK$6-9/10-16 族 + HK$10/¥500 族), 与本批类目/meta 修复后不一致 — 是否按本批锚点批量对齐 (走 blog-deepfix lane 或 K3 拍板后执行)
2. **books en title 冻结矛盾**: 'Saddle Stitch Booklet Printing from $1.20' (title-v5 门童 WARN 区) vs SSoT $1.84 — title 冻结 2-4 周期内, 需 K3 裁决是否提前解冻修正
3. **books 类目页内 bulk 段**: featuredSnippet 'HK$14-57/本 (500 本)' vs price-tables saddle 500本=HK$2.62/本 (A4 8P 模型, 多页数无覆盖) — 是否属可核实报价, 需裁决或补 price-tables 多页数档
4. **A2/A1 价格引擎语义 (C4 域)**: products.ts basePrice 16/20 vs 线上显示 9/45 vs price-tables qty10=16 — 三口径不一致, 建议 K3 裁定唯一显示口径 (是否由 basePrice 驱动 PDP headline)
5. **ja desc 交期跨语不一致**: posters ja '無料デザイン校正 2 時間' vs zh '免費設計打稿 4 小時' — 需确认真值后对齐
6. **GSC 导出模板改版 / API 常态化** (车道 10-24 已提): 本次已用 API 拉 query×country, 建议 K3 授权 API 常态化 (脚本扩展 country 维度写生产脚本, 待拍板)
7. **食品包裝印刷 title 阶段 2**: 待 HK$2.5 SSoT 确认后执行 (车道遗留)

## 四、push 批次
- 3 src commits (6692f169 / 2a3443c4 / a02aab3d) + 本报告 docs commit
- 推前: reflog 验上次 remote push 时间 + fail-safe gate
