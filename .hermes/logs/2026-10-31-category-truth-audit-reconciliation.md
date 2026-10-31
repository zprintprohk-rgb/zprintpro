# 五大 category 真值审计 · 双审计对账（2026-10-31 23:40）

> 背景：同一晚出现两份审计——对端 `.hermes/logs/2026-10-31-category-truth-audit.md`（56f5e2f8，方法论=MOQ 是否在真值集合内，标「需上下文核实」）与本端 `.hermes/logs/2026-10-31-five-category-truth-audit.md`（逐条 dump 上下文 + 价格维度）。
> 本页把两者合并为**单一可执行清单**，避免 K3 收到两份互相矛盾的结论。

## 一、对端「5 处超真值」逐条裁定（我已完成上下文 dump）

| 对端标记 | 实际上下文（实测原文） | 裁定 |
|---|---|---|
| flyers `50張起` | 产品卡徽标「50 張起 · 專屬定制」→ 链 `a5-flyers`（真值 MOQ 10） | **✅ 真冲突**（卡片宣称 50，SKU 是 10；或需标注「50 張以上才屬該價」） |
| stickers `50/100/1000` | 「50×50mm 光粉貼紙 **1000 張約 HK$200-350**」「100/500/1000 張階梯遞減」 | **❌ 假阳性**：属数量档/批量描述，非 MOQ |
| books `1本` | 「小批量友好：**1 本起訂**，數碼印刷按需生產」 | **✅ 真冲突**（books 全部 SKU MOQ=10） |
| books `100本` | 「10 本起印，**100 本有 85 折、500 本 7 折**」 | **❌ 假阳性**：折扣阶梯 |
| packaging `1000個` | 「自助平台 智印港｜最低起印量 **500-1000個起**｜200-500個起…」（对比文案） | **❌ 假阳性**：竞品/平台对比表文字 |
| posters `100張` | 「128g 銅版紙 A2 約 HK$6-9/張（**100 張批量價**）」 | **❌ 假阳性**：批量档说明（但其中 6-9 元本身是价格冲突，见下） |

⇒ 对端 6 项中 **2 项确认冲突、4 项假阳性**。假阳性全部源于「数量阶梯被当成 MOQ」，与我 v1 踩的是同一个坑（已在 `check-five-category-truth.py` docstring 记录）。

## 二、对端未覆盖的价格维度（本端新增，均为候选待判）

| 品类 | 线上「起價」候选 | 该品类最便宜 SKU | 说明 |
|---|---|---|---|
| flyers | **HK$0.18**（title/meta）、**0.14**（卡片「起訂 10 張 HK$0.14 每張 起」） | 0.25（a5-flyers） | 低于全部 SKU 起价 |
| books | **0.87 / 1.20 / 2.80**（卡片「起訂 10 本 HK$X/本 起」） | 6.00（saddle-stitch） | 低于全部 SKU 起价 |
| posters | **2.20**（卡片「起訂 10 件 HK$2.20 每張 起」）、说明段 **A2 6-9 / A1 10-16** | 13.00（adhesive）；a2 basePrice 16 | 与 price_range（a2 95-1,017）量级不自洽 |
| packaging | 0.22 / 0.50 / 1.50 | 2.50（food-boxes） | **需按 SKU 区间判**：white-card-boxes 区间 0.50-3.00 ⇒ 0.50 可能合法；0.22 需核 |

## 三、已执行（K3 2026-10-31 批准 (3) 先行）

| 项 | commit | 线上复验 |
|---|---|---|
| flyers socialProof `100張起` → `10張起` | b4b0c0f2 | 2026-10-31 17:30:21 ✅ |
| posters a2 `title_zh`/`description` HK$12.9 → HK$16（顺带 58→56 当量） | b4b0c0f2 | 同上 ✅ |

## 四、仍待 K3 (1) 排批（11-06 前一次审完再改）

1. flyers 卡片 `50 張起` 与起价 `0.14`（title/meta `0.18` 同源）
2. books `1 本起訂` 与卡片价 `0.87 / 1.20 / 2.80`
3. posters 卡片价 `2.20` + 说明段 `A2 6-9 / A1 10-16`
4. packaging `0.22`（0.50/1.50 需按 white-card/kraft 区间复核）
5. stickers 单位「每個」→「張」（2 处）

## 数据来源
- 对端审计：`.hermes/logs/2026-10-31-category-truth-audit.md`（commit 56f5e2f8）
- 本端审计：`.hermes/logs/2026-10-31-five-category-truth-audit.md` + `scripts/check-five-category-truth.py`（v2 口径）
- 上下文 dump：2026-10-31 12:2x curl `zh-hk/category/{flyers,books,posters,packaging,stickers}/`
- 真值：`src/data/products.ts` 逐 SKU basePrice / minQuantity / price_range
- 线上复验：2026-10-31 17:28–17:30（每 25s 轮询）
