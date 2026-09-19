# MOQ 分类两法对账 (硬门) — 2026-09-19

校准日期: 2026-09-19 15:49 UTC

> **硬门**: K3 2026-09-19: 两法 SKU 集合与计数一致之前, 生成器不得构建
> **判定: NOT_UNIFIED — 硬门关闭, 生成器不得构建**

| 维度 | 方法A (title scope) | 方法B (300 槽) | 一致 |
|---|---|---|---|
| SKU 集合 | 27 | 27 | ✅ |
| 行数 | 38 | 43 | ❌ |
| 语义分桶 | — | — | ✅ |

## 阻断原因

- 行键差: 仅A 0 / 仅B 5

- 仅 B 有行: small-batch-stickers|en, premium-greeting-cards|en, spot-uv-greeting-cards|en, matte-greeting-cards|en, rounded-corner-greeting-cards|en