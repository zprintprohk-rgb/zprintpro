# T10 季节性 SKU 裁决 · 指针卡 (止噪用)

> **签发**: 战略大脑 · 2026-08-10 12:20
> **性质**: 指针卡 — T10 裁决全文**已存在**，本卡仅用于止住 M3 cron 每日"T10 任务卡缺失"的重复上报
> **状态**: 裁决已定，执行日 2026-09-10，此前零代码动作

## 裁决全文位置 (两处，内容一致)

1. `.hermes/m3-task-cards/2026-08-09-qwen38-phase-strategy-8-10.md` **§T10** — 完整 SOP（新建 8 SKU slug 清单 + 旧 12 slug 301 映射 + 验收标准）
2. 战略记忆 `project_zprintpro_seasonal_sku_verdict.md` — 裁决摘要

## 核心结论 (K3 8/10 9:38 拍板)

- **新建，不替换**：新建 8 个季节性 SKU（lai-see-custom-set / corporate-lai-see-series / desk-calendar-2027-light-shadow / a3-wall-calendar-solar-terms 等），不复用旧 slug
- **旧 12 个 301 收编**：9/10 新 SKU 上线验证 200 后，对 12 旧 slug 配 301 → 最匹配新 SKU（per §0.18 四步 SOP）
- 旧 SKU 标 `retiredAt: '2026-09-10'`，保留 1 个季度再物理删除
- 与 CF Bulk Redirects 修正版同批上线，不新增 push

## M3 执行节点

| 时间 | 动作 |
|---|---|
| 8/10-8/28 | **零代码动作**（设计期），prompt_library.md 已落 .hermes/seasonal/2027/design/ |
| 8/29-9/10 | 开发排期（2-3 push，per §0.17 台账） |
| 9/10 | 上线 + 301 收编 + curl 200 验证 |
| 9/17 | 验收：新 8 页 7 天 imps > 旧 12 页 90 天均值，否则复盘 |

**M3 cron 注意**: 扫到本卡即视为 T10 已就位，**停止上报"T10 缺失"**。

EOF · .hermes/m3-task-cards/2026-08-10-t10-seasonal-sku-pointer.md
