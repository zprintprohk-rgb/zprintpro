# 2026-10-25 Blog 价格族对齐 + books title/bulk + ja 校正时间 + GSC country 常态化 — 执行报告

> 执行依据: `docs/2026-10-25-price-truth-and-usa-exit-words.md` 7 项裁决清单 (K3 笼统批准「按优先级的最优方案执行」)
> Commit: `02369b16` (2026-10-25 ~12:33, push 12b0d13c..02369b16)

## VERDICT
P0-1 ✅ 已上线 (blog 价格族对齐 3 语) / P0-2 ✅ (books en title $1.20→$1.84) / P0-3 ✅ (books 页内 HK$14-57→HK$6 起/本) /
P1-4 🔴 报告级 (价格引擎根因已定位, products.ts C4 域 K3-only 不动) / P1-5 ✅ (ja 校正 2時間→4時間 ×7 desc) /
P1-6 ✅ (GSC API country 维度常态化, 双维实测 1,562 rows) / P2-7 ✅ 核验 (食品包裝 title 已在线上, 无需动作)

## CONSUMED
- 7 项裁决清单全部处理; 新增 3 个 K3 标记 (见 NEXT)
- 本批改动: 6 src 文件, 89+1+9+3+1+3+1 处替换

## DELIVERED

### P0-1 blog 价格族对齐 (3 语, 89 处唯一性校验通过)
**poster-printing-guide** (zh-hk 37 价段 + en 7 + ja 7):
- 尺寸表 5 行重锚: A2→HK$9 起/張, A1→HK$45 起/張, A0→HK$144 起/張 (A1×3.2), A3/B2→報價另詢; en US$2.30/4.60/14.70 起, ja ¥300/600/1,920〜
- 材质表 6 行: 157g→HK$9 起/張, 250g→HK$17 起/張, PP→HK$45 起/張, 相紙→HK$56 起/張, 200g/油畫布→報價另詢 (无 SSoT)
- 工艺表 6 行 +15%/25%/50%/30%/8% → 低/中/高 (无 SSoT 伪比例)
- 急件表 +30%/50%/80% → 另計/無附加 (无 SSoT 伪附加费)
- 12 场景行按主尺寸锚定 HK$9/17/45/144 起/張, A3 行→按尺寸報價
- 组合段「價格對應上文表格實際牌價」重锚后转真; Q1/Q2/Q3 伪价换锚, 删「單價約 2-2.4 倍」伪造比例 (45/9=5 不吻合)
- 删「加 80% 附加費 / HK$108-216/張」伪急件价 → 急件附加費另計

**poster-size-guide** (3 语):
- 「A1 10 張起印」→「1 張起印」; 「A2 數碼 US$0.18/張起, 1,000 張柯式 US$0.11/張起」→「US$2.30 起/張(10張起印), 柯式另詢」
- SKU 链接 blurb 重锚: A1→HK$45 起/張(PP), A2→HK$9 起/張(157g), A3→按尺寸報價
- 跨类目 blurb 3 处 (SSoT 校出): 傳單 HK$0.30-0.80→HK$0.25 起/張 (a5-flyers basePrice 0.25), 喜帖 HK$0.50-1.20→HK$1.00 起/個 (wedding basePrice 1.0), 三摺 HK$0.95-2.50→HK$0.70-1.95/張 (folded-leaflets 带)

**paper-bag-printing-guide** (3 语):
- zh「US$0.19/張」→「US$1.84 起/張」; en「from US$0.19/pc」→「US$1.84/pc」+ 「bulk () ... $3-5」空括号+无 SSoT 定量 → 定性; ja「1個 ¥22 から」→「¥240 から」+「US$0.19/枚」→「US$1.84 起/枚」
- 市场数据段 (全球紙袋市場 US$6.73億 CAGR 5.5-5.9% + kraft US$4.83B→6.97B) 带真实来源链接, §0.36.2 合规不动

**posters 类目 meta desc MOQ 修正** (回归自修): 「1 張起印」→「A2 10 張起印 HK$9 起/張、A1 1 張起印 HK$45 起/張」 (A2 minQuantity=10, price-tables 无 qty1 档); en/ja 同步

### P0-2 books en title $1.20→$1.84
saddle-stitch-booklets en title「from $1.20」→「from $1.84」(SSoT products.ts basePrice_en 1.84); title-v5 guard 复核: books 三语 hard:0 warn:0

### P0-3 books 页内 HK$14-57/本(500本) → HK$6 起/本
zh featuredSnippet 重锚到 zh SSoT 带底价 (basePrice 6); en「US$1.84-7.36/pc at 500 copies」= products.ts nameEn 带 ✓ 不动; ja「¥258-1030/個」起点=basePrice_ja 258 ✓ 不动
附带发现: products.ts zh 带「HK$6-32」vs en 带「US$1.84-7.36」(≈HK$14.4-57.4) 内部不一致 → K3 标记

### P1-4 A2/A1 价格引擎口径 — 根因定位 (报告级)
- 线上头显「每個低至 HK$2.20」= posters.json A2 300張档 2.19/張 真值 (gen-price-data.mjs bestHKD.ppu 取全档最低)
- 与「10張起批 · 整批 HK$160」配对: 低至价无标注数量, 配最小档整批 = 误导性配对 (设计语义问题, 不改)
- products.ts a2-posters 三面矛盾 (全部 C4 K3-only, 不动): description「HK$12.9起/張 200g/PP」(无 200g/PP 的 A2 config = 陈旧+不实纸种), price_range「HK$95-1,017」(无任何档位支撑), basePrice zh 16 (en 2.3/ja 300 已更新, zh 陈旧)
- title-v5 guard 对照锚 = basePrice → a2/a1 zh title「HK$9起/HK$45起」被判 PRICE_MISMATCH (存量审计, 不拦)
- 线上显示路径 (price_range → convertToFromPrice → schema Offer) 自洽正确; basePrice 仅 JSON-LD 无表兜底 + title-guard 锚

### P1-5 ja 校正 2時間→4時間
seo.ts 7 处 ja desc「無料デザイン校正 2 時間」→「4 時間」(zh 全站一致 4小時 = 真值; H1/meta/页内均 4h); category-seo-content/product-faqs/blog-data ja 均无 2時間 残留

### P1-6 GSC API country 维度常态化
scripts/fetch_gsc_data.py 加 --dimensions (默认 query 保 gsc_data.csv schema 兼容; query,country 出 6 列新表);
实测: 28d query×country = 1,562 rows, keys=[query,country], 代理 OK

### P2-7 食品包裝印刷 title 阶段 2 — 核验完成
food-boxes basePrice=2.5 ✓ (SSoT 确认); 三语 title 已在线含 2.5 钩子 (zh「100個起 HK$2.5 防油紙卡」/ en 100 MOQ / ja ¥101〜), title-v5 hard:0 → 阶段 2 已达成, 无动作

## 门童全绿
tsc 54=54 基线持平 / encoding 5 文件 UTF-8 LF / gsc-leak 0 / brand A类 0 / title-v5 exit 0 (books 三语 hard:0; 7 HARD=存量 stickers/flyers/a2/a1 zh title, 审计不拦) / bc 报告式 / push-gate OK (38m ≥30min)

## NEXT (K3 标记)
1. **products.ts C4 域 3 项** (K3-only): a2/a1-posters zh basePrice 16/20 陈旧 (建议对齐 price_range 口径 9/45); a2-posters description「12.9起/200g/PP」陈旧+纸种不实; a2/a1 price_range「95-1,017」「290-7,200」无档位支撑; books zh/en 带不一致 (6-32 vs 1.84-7.36)
2. **flyers 类目 desc 第四孤儿族**: zh「HK$0.18 起/張(大量檔)」/ en「from $0.06」/ ja「¥10〜」vs SSoT 底 0.2/0.14/20 (school-flyers) — 跨类目审计项
3. **title-v5 guard 锚口径**: 对照 basePrice vs 线上显示价 (price_range) 二选一, 需 K3 定 (影响 7 个存量 HARD 判定)
4. real-estate-floor-plan 套餐总价 ($88/$312/$2,444) K3 核实 (沿用上轮标记)
5. 68%/22%/10% 客户分布 stats 来源 (poster guide, 沿用上轮标记)

数据来源:
- products.ts / price-tables/posters.json (A2 157g qty10=160/50=450/300=656; A1 PP qty1=45; 全部 sell_hkd 档位)
- price-data.generated.ts (UNIT_PRICE_ANCHORS a2 zh 2.2 = 300張档 2.19 生成值)
- GSC API query×country pull 2026-10-25 (.hermes/logs/gsc-query-country-2026-10-25.json, 1,562 rows)
- title-v5 audit .hermes/logs/sku-title-v5-audit-2026-10-25.json (252 槽)
- 线上 curl 探针 a2-posters PDP 2026-10-25 12:36 (四价面实锤)
