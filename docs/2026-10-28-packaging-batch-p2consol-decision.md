# P2-CONSOL-01 pricing blog 归并决策包（D22-25）

> 日期：2026-10-28 · 侦察完成，待 K3 拍板
> 依据：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §9 PKG-P2-CONSOL-01

## 0. 数据来源行（§0.23）

- 文章源：`src/data/blog-data/en.json`（packaging-box-pricing-2026 / packaging-box-price-2026）
- 内链分布：dbg-p2consol.mjs 双方法复算（内容长度 + 全站内链引用 grep）
- 待补：GSC 两篇展示/点击对比（K3 重存 dsh 凭据后新导出）

## 一、审计现状（双方法复算 ✓）

| 维度 | pricing-2026 | price-2026 |
|---|---|---|
| title | `Packaging Box Printing Price 2026: 500/1000/5000 pcs・Custom Gift Box` | `Packaging Box Printing Price 2026: How Much for 500/1000/5000 Pieces?` |
| 内容长度 | 20,774 chars | 21,398 chars |
| 全站 blog 内链 | **8**（saddle-stitch/envelope/sticker/foil/kraft-comparison/cost-baseline/specs 等） | **0（孤儿）** |
| category links 引用 | ✓（L208 en category） | ✗ |
| 意图 | 价格表/成本拆解 | 采购决策/预算 |

**结论**：两篇 title 主词意图重复（Packaging Box Printing Price 2026 + 500/1000/5000 pcs），price-2026 无任何内链支撑 = 孤儿篇——**归并候选确认**。

## 二、决策包（A/B/C，推荐 A）

### 方案 A（推荐）：保留 pricing-2026 + 301 price-2026
- 理由：pricing-2026 已有 8 内链 + category 引用（链接权重集中），301 把 price-2026 查询意图收拢到单篇
- 动作：price-2026 → 301 → pricing-2026（三语 locale 一致 + sitemap 一致）；旧内链不残留错误落点
- 风险：GSC 若 price-2026 已有展示，301 期展示转移有短暂回落（通常 2-4 周恢复）
- **前置**：新 GSC 导出确认两篇展示量（若 price-2026 展示显著 > pricing-2026 则改保留 price-2026，逻辑不变）

### 方案 B：两篇分工（pricing = 价格表、price = 采购决策）
- 理由：不删资产，title 差异化（pricing 改 `Box Printing Cost Breakdown 2026`，price 保留采购决策）
- 动作：改 title + 内容分流 + 内链补 price-2026
- 风险：两篇仍竞食同一主词（Packaging Box Printing Price 2026），GSC 意图重叠难消除

### 方案 C：先观察（不动）
- 动作：等 GSC 数据后再定
- 风险：两篇竞食持续（关键词自我竞争，稀释权重）

## 三、验收（草案 §验收）

- 一篇一个明确意图（pricing-2026 价格主文）
- 旧内链不残留错误落点（8 内链 + category 引用全部指向 pricing-2026）
- 若 301：全 locale 与 sitemap 一致

## 四、待办

- [ ] K3 拍板 A/B/C
- [ ] GSC 新导出（K3 重存 dsh 凭据后）→ 两篇展示量对比佐证
- [ ] 拍板后执行（301 + 内链收拢 + sitemap + 三语）
