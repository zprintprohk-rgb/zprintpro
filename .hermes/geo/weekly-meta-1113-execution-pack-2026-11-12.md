# 11-13 weekly-meta 批执行包（2026-11-12 预置 · 供 lane 消费 · 全部坐标 + 验证结果）

> **【APPLIED 2026-11-12 22:35 手会话已落地】** 第 1/2 节 src 编辑已全部应用并过守门（encoding ✓ / title-v5 #27 HARD=0 ✓ / tsc 54=54 ✓），commit 随本包一并提交；lane 明日**只需 push + live curl 验证**，勿重复应用（幂等）。验证点：三语类目页 live title 当量 ≤57；paper-bag 页 US$4.83 billion 可检索。

**预置人**：首席 SEO/AEO/GEO 数据战略分析师（手会话）· **批窗口**：2026-11-13 20:52 ZP-weekly-meta
**守门预告**：title 改动过 title-v5 #27（本包草稿已用 `scripts/guards/title-equiv.js` 真模块预验，全 PASS 50-57 带）；改后三语 live curl 复验。

## 1. Title 三页（lane 已立项；草稿已过当量带）

坐标：`src/lib/seo.ts` CATEGORY_SEO（单源）。keywords/descriptions **不动**（被删词由 keywords/desc 分层承接，per §0.29.2）。

| 行 | locale | 现值（当量） | 草稿（当量） | 变化 |
|---|---|---|---|---|
| L411 | stickers.en | Small Batch Sticker & Label Printing from $0.05 \| 10 MOQ + Free Proof + Free US Shipping \| ZprintPro（104） | `Small Batch Sticker Printing $0.05 · 10 MOQ \| ZprintPro`（**55**） | 保 GSC 带钱词 Sticker Printing + 双钩子；Label/Free Proof/US Shipping 降层到 keywords+desc |
| L412 | stickers.ja | シール印刷 10枚〜・オリジナルステッカー 防水/透明/ダイカット・2-4日発送 \| ZprintPro（83） | `ステッカー印刷 10枚〜 オリジナル 防水 短納期 \| ZprintPro`（**56**） | ja 带钱词 ステッカー印刷 前置；防水/透明/ダイカット 留 keywords |
| L433 | flyers.zh-hk | A5 宣傳單張印刷 10張起・A4/A5/A3 雙面 \| HK$0.18 起 \| 智印港（59） | `A5 宣傳單張印刷 10張起・A4/A5 雙面 \| HK$0.18 起 \| 智印港`（**56**） | 最小 churn：仅去 `/A3`（A3 词留 keywords） |

备选（均已验带）：en `Small Batch Stickers from $0.05 | 10 MOQ | ZprintPro`（52）；ja `シール印刷 10枚〜 オリジナル 防水・ダイカット | ZprintPro`（57）；zh `…雙面 HK$0.18 起…`（57）。

## 2. 纸袋指南残句修复 ×2（§0.23 断裂残句家族；源已核验）

坐标：`src/data/blog-data/zh-hk.json`（paper-bag 指南 entry，偏移 ~87839 / ~88638）。

| # | 现串（断裂） | 改为 | 依据 |
|---|---|---|---|
| 2a | `<strong>Kraft 紙袋市場單計</strong>：<strong>2024 年 US</strong> → 2026 年 US → 2034 年 US，` | `<strong>Kraft 紙袋市場單計</strong>：<strong>2024 年 US$4.83 billion → 2026 年 US$5.09 billion → 2034 年 US$6.97 billion，CAGR 5.5%</strong>，` | **Intel Market Research 官方页 2026-11-12 fetch 实测**（kraft-paper-bag-market-31482：USD 4.83B/2024 · 5.09B/2026 · 6.97B/2034 · CAGR 5.5%）；用 billion 显式单位避「億」歧义 |
| 2b | `智印港 2026 上半年週均產出 <strong> 個客製 kraft 袋</strong>，覆蓋零售、餐飲、禮品三大行業，` | `智印港 kraft 紙袋線 2026 上半年維持週均穩定量產，覆蓋零售、餐飲、禮品三大行業，` | 内部产能数字无 K3 拍板来源 → 定性化（禁编造 §0.23） |

⚠️ 同段连带 flag（**不在本批改**，需先核源）：EIN 行「全球紙袋市場 2026：US$6.73-6.90 億」单位疑似错（若 EIN 实为 billion 应为 67-69 億；与 Intel kraft 5.09B 并读自洽）→ 11-13 批内先 fetch EIN 原文核单位，属实则同批修（附来源行）。「70% 消費者付溢價」已对 Intel 原文核验 ✓ 保留。

## 3. a4 價格面 A/B/C（荐 K3 · 商业真值裁决，执行层不擅改）

> **2026-11-12 22:45 精修（追到管道级）**：`src/lib/price-data.generated.ts` L7542 锚表实存且值 = zh 0.31 / en 0.04 / ja 6.3（源 flyers.json eprint×0.95）；同表 L3334 价阶 qty10 = **HKD 140 / USD 18 / JPY 2,800（即 14 / 1.8 / 280 每张）**。故 0.31/0.04 是**批量档单张价（as-low-as）**，不是 MOQ-10 单价；schema 已按 2026-09-14 修复跟随锚（= hero 显示）。真正矛盾 = **同页 hero(0.31) vs 标题(0.35) vs 描述(0.3)** 三面 + **MOQ 10 实付 14/张 与「0.31 起 + 10 MOQ」并读产生 45× 预期落差**（GMC 价格准确性口径风险）。

| 选项 | 内容 | 评价 |
|---|---|---|
| **A** | 全站统一「as-low-as + 批量量级标注」：标题/hero/desc/schema 一律 0.31/0.04/6.3，且每处必带批量语境（如「起（5,000 張）」）；MOQ 10 另标 14/張 | 真话最彻底，但要改 4 面 × 3 语 + GMC 重审；改动面最大 |
| **B**（荐） | **schema 改挂 MOQ-10 价阶真值（14 / 1.8 / 280）+ 标题保留「起」但补批量语境锚（HK$0.31 起（5,000張））** | 解决 GMC 最大风险面（schema=实付价）；营销面改动小；需 1 处 seo.ts 管道改（offers 取价阶 qty=MOQ 行而非锚表 priceDisplay）+ 三语标题微调 |
| C | 维持现值 | 45× 落差 + $0.04 伪低价残留 → GMC 风险不解决；不荐 |

**推荐 B 的落地坐标（K3 一句话即发）**：`src/app/[locale]/product/[slug]/page.tsx` offerData 分支 1 改为「价阶表 qty=minQuantity 行的 priceHKD/USD/JPY」，删 getUnitPriceAnchor 优先级；标题侧仅 flyers 三语补「起（批量）」语境（过 title-v5）。

> ⚠️ 同一病灶波及全站：任何「锚表 priceDisplay（批量单张）+ MOQ 小数量」组合都可能有同类落差 → 建议 11-13 批顺带跑一次全站 SKU 量级审计（`priceDisplay` vs `tiers[qty=MOQ]` 比值 > 5× 者列清单），归 K3 拍板批量处置。

## 4. 数据供给时钟（K3 行动项）

- 7d/28d 数据日 11-09，**11-13 00:00 越过 72h 闸门 → A1 重开**（gsc lane 11-12 报告 STALE_IMMINENT）
- **11-13（周五）请导出 24h/7d/28d 三档**：该批是婚庆修复批（d3293241，11-11 18:51 live）的**首个可读窗**（24h 全覆盖 + 7d 含 11-11..11-13 三天）
- 3mo 连续 3 批缺（11-07/11-10/11-11）——方便时一并补

## 5. 复验队列（本批后）

- push 后：三语类目页 live title curl（≤57 实测）+ title-v5 HARD=0
- 11-14：site: 探针复测婚庆 snippet 是否刷新（龍年→年）；恶化六词速度分化判读表（证据包 v4）
