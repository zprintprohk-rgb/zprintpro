# v8 Daily Cron Addendum — 选题闸门 (K3 9/1 15:59 拍板)

> **配套 cron**: `zprintpro-daily-content-1x7w.md` (125 KB, 9/1 12:09 SSoT)
> **拍板来源**: K3 9/1 15:59 派活包 (matrix → content-authority) + §7.5 三 cron 分工重划
> **生效**: 2026-09-01 15:59 CST
> **本 addendum 不动原 daily SSoT**, 仅在选题闸门步骤叠加以下增量

---

## §A 选题闸门 (P0 硬规则)

**新选题必须先回答"补哪个 pillar 的哪个 cluster 缺口", 答不出 = 不立项**。

### §A.1 选题提交前必填 5 问

1. **Pillar 归属**: 这篇 cluster 归属哪个 Pillar? (包裝盒 / 貼紙 / 宣傳單張 / 紙袋 / 標籤 5 选 1)
2. **Cluster 缺口**: 当前该 Pillar 缺哪类 cluster? (材质 / 工艺 / 行业 / 场景 / FAQ)
3. **GSC 实证词**: 选题的核心词在 GSC 8 天 / 3 mo / 12 mo 哪个时间窗有 imps? (无 imps = 不立项)
4. **蚕食检测**: 与现有 94 篇 blog 哪些主题重复? (重复率 > 50% = 砍掉换新, per Animalz refresh)
5. **深度分目标**: 改造后预期深度分 ≥70? (字数 1,500+ + FAQPage + 3+ 内链 + 数据钩子 3+)

### §A.2 不立项清单 (答不出 5 问任一)

- ❌ GSC 0 imps 的"伪长尾词"
- ❌ 与 Pillar 主题蚕食的"重复 cluster"
- ❌ 预期深度分 < 70 的"thin 候选"
- ❌ 无业务洞察的"空泛科普"
- ❌ 包含无 K3 拍板来源硬数字的"虚假数据" (per 门童 #1 数据诚信 11 类)

### §A.3 立项后必同步

- 写入 B7 选题库 (v8 改排期: 22 篇选题中优先选能补 cluster 缺口的)
- 写入 daily cron 任务卡片 (`.hermes/m3-task-cards/`)
- 标注 Pillar 归属 + Cluster 缺口 + GSC 实证词 (per §A.1 5 问)

---

## §B 与反审门童 v1.0 协同 (per §0.31)

- **门童 #1 数据诚信 11 类**: 选题内容生成前 dry-run, 命中即改
- **DoD 铁律**: 任何派活包修复错误, 必同步把 pattern 写入 `error-patterns.md`

---

## §C 与 v8 monthly cron 协同 (per zprintpro-monthly-content-authority-audit.md)

- **9 月首单**: 94 篇 blog 盘点 → 4 档分布 → 翻新配额 4-6 篇/月
- **9/2-9/3**: 94 篇盘点 (worker 异步) → 选题库改排期
- **9/8**: 包裝盒 Pillar 升级 (12:32 优化基础上 3,000+ 字)
- **9/13**: 首批 4-6 篇 thin → cluster 改造

---

**配套 SSoT**: `zprintpro-monthly-content-authority-audit.md` (v8) + `zprintpro-daily-content-1x7w.md` (9/1 12:09 v6.4 base)
**生效**: 2026-09-01 15:59 CST
**维护**: Mavis (M3) 跨 session 永久
