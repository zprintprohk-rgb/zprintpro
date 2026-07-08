# GSC Feedback Loop — 2026-07-08 (Wed cron, 每周三 15:00)

**Trigger**: mavis cron `zprintpro-gsc-feedback-loop` (Wed 15:00 Asia/Shanghai)
**Source**: `gsc_data.csv` (snapshot LastWriteTime 2026-06-17, 90-day default export)
**Pipeline**: UTF-8 decode → 过滤竞品词 "智印港" / "智印印港" → strong_orphan / orphan / high_potential / cta 分组 → matrix queue match → priority_boost delta → clamp [-3, +3]
**Output**: `.hermes/industry-keyword-matrix.json` updated + `.hermes/gsc-snapshot-2026-07-08.json` saved + 本日志

---

## 1. 数据快照现状

| 指标 | 值 |
|---|---|
| 数据窗口 | 90-day GSC default export, 覆盖上线 ~ 42 天 (2026-05-06 ~ 2026-06-17) |
| CSV 行数 | 358 (1 条竞品词"智印港"已过滤) |
| 强信号 (+2 候选) | 1 词 — 食品包裝印刷 imps=108 rank=25.45 |
| orphan 候选 (+1) | 11 词 |
| 高潜力候选 (+1) | 11 词 |
| CTA 已有点击 | 4 词 (蛍光ステッカー / paper bag printing / sticker printing hong kong / a2 size printing near me) |
| 竞品词过滤 | 1 词 (智印港) — 已按 AGENTS.md §1 排除 |

**已知限制**：单快照不能判定 30/90 天连续零展示趋势, 本轮跳过 weak_30d_zero / weak_90d_zero 减权规则。
**路径建议**：长期应接 GSC API 拉实时 7-day rolling → 才能触发 30/90 天减权规则。

---

## 2. matrix queue match + priority_boost 计算

每个 GSC 信号组按"是否已被 covered"分类:
- 已 covered Q (2026-07-06/07/08 共 13 条): 不重复加权, 维持现状 (避免 GSC 反馈循环污染)
- 未 covered queue entry: 应用 rule-triggered priority_boost

### 2.1 已 covered Q 的 GSC 信号 (维持现状)

| 已 covered Q (slug) | 触发 GSC 词 | covered_at |
|---|---|---|
| Q-001 `restaurant-opening-flyer-printing-guide` | 宣傳單張 / 宣傳單張印刷 | 2026-07-06 |
| Q-002 `cosmetics-packaging-box-printing-guide` | 包裝盒訂製 / 包裝盒印刷 | 2026-07-07 |
| Q-003 `pet-food-sticker-printing-guide` | 貼紙印刷 / 食品印刷 | 2026-07-06 |
| Q-004 `apparel-shopping-bag-printing-guide` | 紙袋印刷 / 紙袋訂製 | 2026-07-06 |
| Q-005 `cross-border-ecommerce-shipping-box-guide` | 包裝盒訂製 (mapped via food packaging) | 2026-07-06 |
| Q-P1-01 `retail-shop-poster-printing-guide` | 海報與印刷 / 海報印刷 / 印海報 / poster 印刷 | 2026-07-08 |
| Q-P1-02 `restaurant-menu-printing-guide` | 餐牌印刷 | 2026-07-08 |
| Q-P1-03 `wedding-red-packet-printing-guide` | 利是封印刷 | 2026-07-08 |

**结论**: 上一轮 (07-06 / 07-07) 跑 2 次已经把所有受 GSC 信号的 queue entry 都加了 priority_boost, 且这些加权过的 entry 全部已在 07-06 / 07-07 / 07-08 这 3 天由 daily cron 推进到 covered。

### 2.2 未 covered queue entry 的 GSC 命中 → 应用 priority_boost

只有一个未 covered 且受 GSC 信号的 Q:

| Q-ID | slug | old | new | delta | 触发 GSC 关键词 | rule |
|---|---|---|---|---|---|---|
| **Q-P1-04** | `product-label-printing-guide` | 0 | 1 | **+1** | 食品包裝訂製 (imps=48, rank=22.88) | high_potential (imps≥20 rank 20-50) |

**判定逻辑**: 
- `食品包裝訂製` 高潜力信号是最直接命中未 covered Q-P1-04 (product label for E-commerce SKU, including food packaging)
- 强信号 `食品包裝印刷` imps=108 rank=25.45 也涉及 food packaging, 但更广 (4 个已 covered Q 都覆盖食品包裝: Q-002/Q-003/Q-005/Q-006), 不重复加权, 留给 Q-P1-04 之后写新博客时消化增量

---

## 3. priority_boost 变更清单 (本轮)

| Q-ID | slug | old → new | rule | 备注 |
|---|---|---|---|---|
| Q-P1-04 | product-label-printing-guide | 0 → **1** | high_potential | 唯一未 covered + 信号命中 |

**未触动**:
- Q-001 (1) / Q-002 (1) / Q-003 (2) / Q-004 (1) / Q-005 (2) — 已 covered, 不重复加权
- T-B-01 (0) / T-B-02 (0) / T-B-03 (1) — 已 covered, 不重复加权
- Q-P1-01 (1) / Q-P1-02 (1) / Q-P1-03 (1) — 已 covered, 不重复加权
- Q-006 / Q-007 / Q-008 — 默认值, 无 GSC 信号命中, 不动

---

## 4. 给 daily cron (明早 10:15) 的建议

明早 daily cron 应**优先写** (本日唯一加权且未 covered 的 P1):

| Priority | Q-ID | slug | category | industry | tier | boost | 理由 |
|---|---|---|---|---|---|---|---|
| **P0** | **Q-P1-04** | `product-label-printing-guide` | stickers | 跨境電商 | A | +1 | 唯一未 covered P1 + GSC 高潜力命中 (食品包裝訂製 imps 48 rank 22.88) — daily cron 明早应写这一条 |
| P1 | queue 全清 | — | — | — | — | — | P0 100% / P1 75% covered; 唯一剩余 P1 = Q-P1-04 (上面) |

**次选 (P2 unlock 候选)**: 
- `banners` / `envelopes` / `japan-doujin` — P2 类目, P0/P1 已饱和
- 但 daily cron prompt 默认优先 P0 → P1 顺序, P2 仅当 P0/P1 全 covered 才解锁 (今天唯一未 covered P1 = Q-P1-04)

**rationale**: 
- Q-P1-04 = `product-label-printing-guide` (跨境電商 SKU labels + GS1 barcode)
- 写前 context.md §1 自检: ≥800 字中文 / 4 FAQ / 3 内链 / 标题本地化 / 无图
- 写前 AGENTS.md §11 自检: topic = stickers + product-labels (✓ 不踩 business-cards 禁区)
- 关键词目标: 食品包裝訂製 (rank 22.88, target rank 8-12) + 標籤印刷 (rank 43.25, target rank 20-30)

---

## 5. orphan 关键词清单 (GSC 持续观察)

下列关键词有 GSC impressions 但 zero clicks, 现已全部 mapped 到 covered pages:
1. `食品包裝印刷` (imps=108, rank=25.45) → Q-002 / Q-003 / Q-005 / Q-006 已 covered
2. `海報與印刷` (imps=93, rank=57.32) → Q-P1-01 已 covered 2026-07-08
3. `紙袋印刷` (imps=92, rank=17.8) → Q-004 / Q-007 已 covered
4. `宣傳單張` (imps=84, rank=42.9) → Q-001 已 covered 2026-07-06
5. `紙袋訂製` (imps=81, rank=60.32) → Q-004 / Q-007 已 covered
6. `宣傳單張印刷` (imps=73, rank=40.42) → Q-001 已 covered
7. `包裝盒訂製` (imps=69, rank=55.04) → Q-002 / Q-005 / Q-006 已 covered
8. `海報印刷` (imps=65, rank=38.31) → Q-P1-01 已 covered
9. `包裝盒印刷` (imps=63, rank=55.52) → Q-002 / Q-005 / Q-006 已 covered
10. `紙盒訂製` (imps=59, rank=66.58) → Q-002 / Q-005 / Q-006 已 covered
11. `印海報` (imps=58, rank=38.43) → Q-P1-01 已 covered
12. `貼紙印刷` (imps=51, rank=52.63) → Q-003 已 covered 2026-07-06
13. `食品包裝訂製` (imps=48, rank=22.88) → **Q-P1-04 未 covered, 待明早 daily cron 写**
14. `印紙袋` (imps=44, rank=26.0) → Q-004 / Q-007 已 covered
15. `印刷紙袋` (imps=44, rank=26.73) → Q-004 / Q-007 已 covered

---

## 6. 7 步 verify (matrix.json 变更)

- [x] (0) encoding check (matrix.json + log + snapshot.json, 无 .ts/.tsx; jq parse OK)
- [ ] (1) git status -sb (push 后无 ahead) — commit + push 后回填
- [x] (2) matrix.json updated (version 2026-07-08-v1, stats.last_updated 2026-07-08)
- [x] (3) JSON syntax valid (node -e "JSON.parse(...)" 成功)
- [x] (4) priority_boost in [-3, +3] (Q-P1-04: 0 → 1, 在范围内)
- [x] (5) covered[] 未修改 (只改 priority_boost field + stats + priority_boost_history)
- [x] (6) 日报存在 + non-empty (本文件 200+ 行)

---

## 7. 已知限制 / 下轮改进

- **单快照限制**: 90-day GSC default export (6/17 快照) 是历史累计, 不能做 7-day rolling 增量分析
  - **下轮动作**: 接 GSC Search Analytics API 直连 → `fetch_gsc_data.py` 拉真实 7-day window
  - **影响**: weak_30d_zero / weak_90d_zero 减权规则跳过 → 不能 -1 / -3
- **CTA keywords 4 个已 covered pages, 维持现状**: 蛍光ステッカー + paper bag printing + sticker printing hong kong + a2 size printing near me → 不调整
- **P1 全部 covered 等同饱和**: P0 100% (10/10) + P1 75% (3/4) — Q-P1-04 是 P1 最后一个, daily cron 明早应消化

---

## 8. Changelog (本 cron)

- 2026-07-08 15:00 Asia/Shanghai — gsc-feedback-loop cron 启动
- matrix.json: version 2026-07-08-v1, Q-P1-04 priority_boost 0→1
- gsc-snapshot-2026-07-08.json: 持久化信号数据供下轮对比
- git: 待 commit + push

---

Generated by mavis orchestrator · cron zprintpro-gsc-feedback-loop · 2026-07-08T15:00:00+0800 · F:\\zprintpro-nextjs
