# 2026-10-26 显示锚 P0 修复 + GSC 地域战略 + blog 价格族补漏 — 执行报告

> 执行依据: K3「穷尽 100% 能力分析研究后继续下一步执行」+ 10-25 遗留 K3 标记清单
> Commit: `3045f2cd` (OVERRIDE 锚 P0) + `c6018c17` (poster-size 币种串) — push 待窗口 (gate 18m<30m)

## VERDICT
P0-1 ✅ OVERRIDE 显示锚 10 项对齐 (9 项 2-9 倍假价 + doujinshi 删除) — **线上转化页客户可见假价清除**
P0-2 ✅ poster-size-guide zh/ja 币种串 (US$2.30 → HK$9/¥300)
P0-3 🔍 全站 blog 孤儿价扫描完成 — A 类币种串 8 篇 + B 类真孤儿 5 篇 (K3 校准域)
P0-4 ✅ GSC query×country 战略分析 (进攻面/退场词)
P1   🚩 lane 缺口: weekly-meta (10-25 周五) + gsc-feedback (10-25) 无运行记录

## CONSUMED
- 10-25 lane 产出: dd2b537f books 8 SKU en/ja 币种+MOQ 对齐 (数字 vs products.ts 全部一致 ✓)
- GSC query×country 28d pull (1,562 rows, .hermes/logs/gsc-query-country-2026-10-25.json)
- 线上 PDP hero 探针 6 页 (hardcover/yearbook/textbooks/perfect-bound/exercise/saddle)
- price-tables 全量 tier dump (books/flyers/stickers/posters.json)

## DELIVERED

### P0-1 显示锚 OVERRIDE 修复 (pricing.ts, 客户可见转化页)
**线上实锤 (6 页探针)**: hardcover hero「每個低至 HK$5.00-10.00」vs title「HK$40起」+ 正文「40-240」(8x);
yearbook 5-10 vs 45-180 (9x); textbooks 1-5 vs 5-50/24 起 (5x); saddle/perfect-bound/exercise hero 1.20/0.87/0.90
(deep-bulk 5000 本档真价) — 均为 7/26 拍板锚未随产品校准更新。

**修复 (对照 products.ts price_range, K3 9/23 title-v5「价格真值对照 products.ts」口径)**:
- hardcover-books 5-10 → 40-240 / graduation-yearbook 5-10 → 45-180 / textbooks 1-5 → 5-50
- rigid-boxes 2-10 → 8-42 / white-card-bags 0.7-3.5 → 5-12 / gift-bags 5-10 → 10-20
- eco-paper-bags 1.5-4 → 3-8 / handle-bags 1.5-4 → 3-8 / large-bags 3-7.5 → 6-15
- doujinshi-printing 5-10 删除 (price_range ¥7,500〜 无 HKD 带, 回退原样显示最诚实)
- 保留: white-card-boxes 0.5-3 ✓ / desk-calendars 3-8 ✓ / a1-posters 29-45 ✓ (9/19 拍板)
- 死锚 (acrylic-keychain/can-badge, 9/23 下架无 PDP) 保留 + 注释

### P0-1 生成器复核 (gen-price-data.mjs 注释固化)
priceDisplay = deep-bulk 地板价 + qty/batch = 起批档 = 行业标准双价语义 (Vistaprint 式),
9/19 只修 batchPrice 正确 — **本轮一度误改已回滚**, 加 2026-10-26 复核注释防回退。
flyers/stickers/books 的 min-qty 档为 modeled-small-batch 待校準模型值 (A5 传单 qty10 79.5=7.95/張
vs 校准大档 0.347/張) — 若改 priceDisplay 会把 hero 从真实地板恶化成模型假价。

### P0-2 poster-size-guide 币种串 (blog-data)
zh「A2 數碼印 US$2.30 起/張(10張起印)」→「HK$9 起/張」; ja「A2 デジタル印刷 US$2.30/枚から」→「¥300/枚から」
(SSoT a2 9/300 起); 唯一性校验 1:1 ✓

### P0-3 全站 blog 孤儿价扫描 (102 slugs × 3 语)
**A 类币种串 (zh/ja 页出现别语币种, K3 定口径)**:
- paper-bag zh/ja「US$1.84 起/張」(1000 张含 logo 跨境报价, 换算值 14.4 vs 8 不确定 → 不擅改)
- sticker-guide ja 全篇 HK$ 串 (10+ 处, PVC 防水 ja 无 SSoT)
- same-day-flyers ja HK$0.35 串; school-exercise ja 全篇 HK$ (15+ 处, exercise zh 3.5<4 SSoT)
- textbook ja HK$5-50 + products.ts 标注; zine ja HK$6-32; packaging-box-pricing ja HK$2-8 全篇
- kraft-paper-box-types-comparison ja HK$280/480 + zh/ja 全篇低价带 (0.5-0.8/¥1-42 vs SSoT 5/150)
**B 类真孤儿 (低于 SSoT 底, 需校准, 不擅改)**:
- kraft-types zh 0.5-0.8/ja ¥1-42 (vs kraft 5/150 起); school-exercise zh 2.8-3.5 (vs 4)
- poster-printing-price-guide zh HK$6 (vs A2 9 起); marathon-event-poster zh HK$3-7 (A3 无 SSoT)
- folding-box-cosmetics zh 0.85-1.45 (vs 2.5); hotel-amenity-sticker HK$9-15 (无档)
- construction-material-sample-book zh $7,800 vs ja $1,014 不一致; real-estate $680/¥12,500 (沿用上轮)
- cross-border box zh 1.5-4 (vs mailer 2.5); custom-card-boxes ja ¥30,000 免运 (vs ¥500)

### P0-4 GSC query×country 战略 (数据来源: gsc-query-country-2026-10-25.json 1,562 rows)
- 地域: hkg 554 / usa 424 / jpn 176 / gbr 40 / twn 38 / pak 24 / can 19 / 50+ 国长尾
- hkg 进攻面 (pos 5-20, imps≥10): 海報印刷 260/0, 食品包裝印刷 103/0, 印海報 125/1, 紙袋印刷 61/0,
  小冊子印刷 59/0, 騎馬釘印刷 51/0 — 与 10 月 price-truth 修复品类高度重合
- usa 进攻面: small batch stickers 5.2/25 (首屏边缘), a2 poster 13.5/46, doujinshi 11.1/33,
  china catalog 簇 68 imps (16.7+15.1), saddle stitch 9.6/15
- 退场词 (pos≤3, 0 点击): jpn 燙金利是封 pos 1.0/33, 中綴じ冊子激安 pos 1.0/6 (首屏但无点击 →
  摘要缺价格钩子), hkg 畢業紀念冊香港 1.8/12, 印刷信封 2.7/10, 同人誌印刷 2.0/7
- 品牌: 智印港 pos 1.6 CTR 68.2% (强势)

## 门童全绿
tsc 54=54 / encoding 4 文件 / gsc-leak 0 / brand A 类 0 / title-v5 exit 0 (HARD 7 = 存量) / bc 报告式

## NEXT (K3 拍板)
1. **products.ts C4 域 (价格 SSoT 冲突)**: books 带 (saddle 6-32 等) vs books.json 校准档 (qty10 18.5/本)
   系统性不一致; textbooks ja basePrice 1288 = 错误换算 (zh 24 × 53.7 非 ×19.5); a2 price_range 95-1,017 无档支撑
2. **A 类币种串 8 篇**: 是否全站本地化 (zh HK$/ja ¥) — K3 定口径 (paper-bag US$1.84 跨境报价特殊)
3. **B 类真孤儿 5 篇**: kraft-types/school-exercise/poster-price/marathon/folding 低价带 — 需校准档位或撤价
4. **退场词修复**: jpn 燙金利是封/中綴じ冊子激安 title 加价格钩子; hkg 畢業紀念冊 title/摘要强化
5. **lane 缺口**: weekly-meta 10-25 (周五) + gsc-feedback 10-25 无运行记录 — 查 Task Scheduler 状态
6. title-v5 HARD 7 存量: a2-posters zh title「HK$9起」vs basePrice 16 (起批档口径) — 锚口径待定

数据来源:
- products.ts (price_range/basePrice/basePrice_en/basePrice_ja/minQuantity, 全量 dump)
- price-tables/{books,flyers,stickers,posters}.json (tier src/calibratedAt 全量 dump)
- 线上 curl 探针 6 PDP hero (2026-10-26 06:40, hardcover/yearbook/textbooks/perfect-bound/exercise/saddle)
- GSC API query×country pull (gsc-query-country-2026-10-25.json, 1,562 rows)
- lane-runs.jsonl / lane-status.mjs (10-25/26 总线)
- title-v5 audit sku-title-v5-audit-2026-10-25.json (252 槽)
