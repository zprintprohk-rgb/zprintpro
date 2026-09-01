# v8 Weekly Cron Addendum — 深度分增量 (K3 9/1 15:59 拍板)

> **配套 cron**: `zprintpro-weekly-meta-refresh.md` (76 KB, 9/1 12:09 SSoT) + `zprintpro-gsc-feedback-loop.md` (50 KB, SSoT)
> **拍板来源**: K3 9/1 15:59 派活包 (matrix → content-authority) + §7.5 三 cron 分工重划
> **生效**: 2026-09-01 15:59 CST
> **本 addendum 不动原 weekly SSoT**, 仅在 GSC 校准步骤叠加以下增量

---

## §A 每周深度分增量报告 (新指标, P0)

**在 weekly GSC 校准报告末尾, 加 1 行深度分增量**:

```
W{ISO_WEEK} 深度分增量 (per §4 深度分评分卡):
  - 全站长文平均深度分: {本周} (上周 {上周}, Δ {+/-})
  - 5 Pillar 深度分: 包裝盒 {x} / 貼紙 {x} / 宣傳單張 {x} / 紙袋 {x} / 標籤 {x}
  - 本周翻新: {N} 篇 thin → cluster 改造 (目标 1-2 篇/周, 月配额 4-6 篇)
  - 新增 cluster: {N} 篇 (目标 1-2 篇/周, 月配额 4-6 篇)
```

---

## §B T1 排名轨迹 (新指标, P0)

**在 weekly GSC 校准报告, 加 T1 排名轨迹快照**:

```
T1 排名轨迹 (K3 9/1 15:59 拍板, 改"部署覆盖率"为"排名轨迹"):
  - 进首页 (pos 1-10): {N} 词 (上周 {N}, Δ {+/-})
  - P1-3 (pos 4-6): {N} 词
  - CTR 破 0 (>0%): {N} 词
  - 部署覆盖率: {N}% (T1 词已部署页面/总 T1 词, 改名"部署覆盖率"避免"命中率"误导)
```

---

## §C AEO 引用资格周跟踪 (新指标, 9 月首测)

**在 weekly GSC 校准报告, 加 AEO 周跟踪**:

```
AEO 引用资格 (per §5 v8 monthly):
  - FAQPage schema 覆盖率: {本周}% (上周 {上周}%, Δ {+/-}, 目标 10/1 ≥60%)
  - llms.txt 状态: {上线/未上线/待更新}
  - AI 引擎抽查: Perplexity / ChatGPT 5 问引用率 {本周}% (上周 {上周}%, Δ {+/-})
```

---

## §D Pruning 周跟踪 (新指标, 9 月首测)

**在 weekly GSC 校准报告, 加 Pruning 周跟踪**:

```
Pruning 决策清单 (per §6 v8 monthly):
  - 30 天 0 imp 0 clk 页面: {N} 个 (上周 {上周}, Δ {+/-})
  - 本周建议 301: {N} 个 (累计 {N}/月, 目标 10 个/月)
  - 本周建议合并: {N} 个 (累计 {N}/月, 目标 5 个/月)
  - 本周建议翻新: {N} 个 (累计 {N}/月, 目标 4-6 个/月)
```

---

## §E 与 v8 monthly cron 协同 (per zprintpro-monthly-content-authority-audit.md)

- **9/3**: GSC 8 天数据校准 + T1 排名轨迹基线
- **9/13**: 首批 4-6 篇 thin → cluster 改造 → 深度分增量报告
- **9/20-9/26**: llms.txt + schema 全站 (W4 计划) → AEO 引用资格 +30%
- **9/30**: 月度复盘 → 周健康报告汇总到月报

---

**配套 SSoT**: `zprintpro-monthly-content-authority-audit.md` (v8) + `zprintpro-weekly-meta-refresh.md` (9/1 12:09 v6.4 base) + `zprintpro-gsc-feedback-loop.md` (SSoT)
**生效**: 2026-09-01 15:59 CST
**维护**: Mavis (M3) 跨 session 永久
