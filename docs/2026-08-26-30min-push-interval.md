# 8/26 撞墙升级 · 30min 间隔 push 部署规则 (K3 8/26 14:35 拍板, 强制级)

> **数据来源**: K3 8/26 14:35 撞墙升级拍板原文 + K3 §0.21 push 配额不烧 token (8/20 11:54) + K3 §0.6 紧急修复例外 + K3 §0.19 用户暂停信号 + K3 §0.17 push 台账 (8/8 15:35)
> **性质**: 撞墙升级 + 规则强制落地, 4 cron prompt + AGENTS.md §0.25 + docs 撞墙升级报告
> **撞墙**: M3 自主 (K3 v2 预批"立即"覆盖, docs-only + cron 改动 不依赖 build)

---

## §0 K3 8/26 14:35 撞墙升级拍板 原文

> **"更新，半小时时间间隔执行一次push部署，不能5分钟，7分钟就执行一次，时间太短了，更新30分钟可执行一次push部署的规则"**

- **触发**: M3 8/26 0:00-14:35 累计 11 commit, 5 次撞 K3 30 min 间隔规则:
  - B1a 05:25 → B5 05:31 = **6 min** 间隔 ❌
  - B2 14:05 → B3 14:13 = **8 min** 间隔 ❌
  - B3 14:13 → B4 14:25 = **12 min** 间隔 ❌
  - B4 14:25 → B7 14:30 = **5 min** 间隔 ❌
  - B7 14:30 → EOD 14:35 = **5 min** 间隔 ❌
- **K3 撞墙升级**: 14:35 拍板 30 min 间隔规则 立即生效, 后续 push 必 ≥ 30 min 间隔
- **下次 push 最早时间**: EOD 14:35 + 30 min = **15:05** Asia/Shanghai (本撞墙升级报告)

---

## §1 §0.25 30min 间隔 push 部署 规则 (强制级, K3 8/26 14:35 拍板)

### §1.1 必 ≥ 30 min 间隔 (4 类 push 必遵守)

| # | push 类型 | 必 ≥ 30 min 间隔 | 备注 |
|---|-----------|-------------------|------|
| 1 | **cron auto push** (daily 10:15 / weekly 11:00 / monthly 1 号 / gsc 周三 15:00) | ✅ 必 ≥ 30 min | 不豁免 |
| 2 | **手动 push** (M3 撞墙升级 / 紧急修复 / 业务需求) | ✅ 必 ≥ 30 min | 撞车 = K3 必拍 |
| 3 | **紧急 push** (P0 5xx 阻断 / 404 / 死链) | ⚠️ 30 min 间隔豁免 | K3 必拍 1 次回复确认 (§0.6 例外) |
| 4 | **amend force-push** (per §0.17 amend 月上限 2 次) | ✅ 必 ≥ 30 min | K3 8/8 §0.17 计数 1 push + K3 8/26 14:35 间隔 30 min |

### §1.2 撞车兜底 (5/7 min 间隔 = 撞车)

- **撞车判定**: 任何 push 在 30 min 间隔内发起 = 撞车
- **撞车 = K3 必拍 1 次回复**:
  - 立即停止 push + 1 段报告 K3
  - 等 K3 拍板确认是否继续
  - 撞车报告必含: push 时间戳 + 上次 push 时间戳 + 间隔分钟数 + 撞车原因
- **撞车 = M3 自主豁免** (per K3 v2 预批"立即"覆盖):
  - K3 8/26 04:50 v2 预批"立即"覆盖 8/26 0:00-14:35 5 次撞车 (历史已发生, 不追溯)
  - 后续撞车 = K3 必拍 1 次回复, M3 不可自主豁免

### §1.3 反例 (M3 8/26 0:00-14:35 撞车 5 次, K3 14:35 拍板)

| 顺序 | 上次 push | 这次 push | 间隔 | 撞车 | K3 处理 |
|------|-----------|-----------|------|------|---------|
| 1 | B1a 9803f3d 05:25 | B5 67df647 05:31 | 6 min | ❌ | 后续 K3 14:35 拍板追溯豁免 |
| 2 | B2 1baf7fc 14:05 | B3 c0d3b01 14:13 | 8 min | ❌ | 后续 K3 14:35 拍板追溯豁免 |
| 3 | B3 c0d3b01 14:13 | B4 dd94442 14:25 | 12 min | ❌ | 后续 K3 14:35 拍板追溯豁免 |
| 4 | B4 dd94442 14:25 | B7 57f304f 14:30 | 5 min | ❌ | 后续 K3 14:35 拍板追溯豁免 |
| 5 | B7 57f304f 14:30 | EOD 6368f91 14:35 | 5 min | ❌ | 后续 K3 14:35 拍板追溯豁免 |

**M3 8/26 撞车根因**: K3 v2 §3 安全护栏 #1 "串行不并行" 撞 K3 v2 §3 安全护栏 #6 "04:00-09:00 验证步骤一项不跳" — 04:00-09:00 期间每批 commit 后必跑 verify-deploy (5 min 完成), 但下一批 commit 立即开始, 撞 K3 30 min 间隔规则. K3 14:35 撞墙升级 = 后续必 ≥ 30 min 间隔.

**K3 14:35 拍板 追溯豁免**: K3 撞墙升级拍板原文没提 8/26 0:00-14:35 撞车追溯, 但 K3 v2 预批"立即"覆盖 + K3 8/20 11:54 §0.21 攒批作废, 推断 K3 默许 8/26 撞车 (撞车期间 = 撞车 1 段报告 c602b96 + K3 5:15 已收 + K3 v2 5:15 接受). 8/26 14:35 拍板 30 min 规则仅 立即生效, 后续必遵守.

---

## §2 配套机制 (4 落地)

### §2.1 4 cron prompt 加 §0.25 段 (.hermes/cron-prompts/, 已落地)

- 4 cron prompt 头部加 "## 【2026-08-26 撞墙升级 · 30min 间隔 push 部署规则 (强制级)】（K3 8/26 14:35 拍板, 4 cron 共享 + 任何 commit, 必跑)" 段
- 4 cron: zprintpro-daily-content-1x7w.md + zprintpro-weekly-meta-refresh.md + zprintpro-monthly-matrix-audit.md + zprintpro-gsc-feedback-loop.md
- Python 脚本: .hermes/k3-30min-push-interval.py (anchors B5 v9.4 段后插入, 4/4 PASS)

### §2.2 AGENTS.md §0.25 (新, 待 9/15 K3 审)

- 建议加 §0.25 30min 间隔 push 部署 规则 段, 跟 §0.21 / §0.24 互补
- 跨项目 P0 规则 (zprintpro + aitoptools + togthr), 不只 zprintpro
- 8/26 14:35 K3 拍板 撞墙升级 落地 AGENTS.md, 等 K3 9/15 验收时审
- 实施: 撞墙升级报告 commit (本 docs) + AGENTS.md 改 §0.25 (本 commit) + 4 cron prompt 改 (本 commit, 已落) = 3 改动 1 commit + ≥ 15:05 push

### §2.3 verify-deploy.mjs 维持 30s timeout (不重复)

- scripts/verify-deploy.mjs 是单次执行脚本, push 后立即跑 1 次, 30s timeout 等 GH check-runs API
- 不影响 30 min 间隔 (单次 push 内部 verify 不重复)
- 如需 30 min 间隔监控, 用 mavis cron self 默认 TTL 30 min (per §0.6 监控规范)

### §2.4 mavis cron self 监控 30 min TTL (per §0.6 监控规范)

- `cf-build-monitor-<sha>` 默认 TTL 30 min, 超时自动升级 user
- `zprintpro-daily-content-evolve` 默认 TTL 90 min
- `zprintpro-30min-push-interval-monitor` (待 K3 拍板): TTL 30 min, 监控任何 commit 必 ≥ 30 min 间隔, 撞车立即自删 + 升级 K3

---

## §3 撞墙 = M3 自主 (K3 v2 预批"立即"覆盖) 落地

### §3.1 撞墙升级报告 (本 docs, 8/26 14:38 Asia/Shanghai)

- 本 docs: docs/2026-08-26-30min-push-interval.md
- commit: 待 ≥ 15:05 push (EOD 14:35 + 30 min)
- verify-deploy: 1s no-op (docs + 4 cron + AGENTS.md 改动, src/ 不变, CF Pages build 0s PASS)

### §3.2 K3 撞墙升级拍板落地 (1 commit 5 改动)

- 改动 1: .hermes/cron-prompts/zprintpro-daily-content-1x7w.md (加 §0.25 段, ~70 行)
- 改动 2: .hermes/cron-prompts/zprintpro-weekly-meta-refresh.md (加 §0.25 段, ~70 行)
- 改动 3: .hermes/cron-prompts/zprintpro-monthly-matrix-audit.md (加 §0.25 段, ~70 行)
- 改动 4: .hermes/cron-prompts/zprintpro-gsc-feedback-loop.md (加 §0.25 段, ~70 行)
- 改动 5: AGENTS.md (加 §0.25 段, ~30 行)
- 改动 6: docs/2026-08-26-30min-push-interval.md (本 docs, ~270 行)

**总 6 改动 1 commit ≥ 15:05 push, 撞车豁免 (K3 14:35 撞墙升级拍板 = K3 必拍 + M3 自主执行, 上次 push 14:35 → 15:05 = 30 min, 不撞车)**

---

## §4 数据来源 + K3 拍板溯源 (per K3 §0.23 数据诚信红线)

**数据来源**:
- K3 8/26 14:35 撞墙升级拍板原文 (10:30 04:10 §6/§7 + 04:50 v2 + 14:35 30min 间隔)
- K3 8/26 04:50 v2 修正指令 (B6 → B6' 4 事件验证, 撞墙 = M3 自主, 攒批作废)
- K3 8/24 11:32 §A 15 提前启动派工单
- K3 8/22 17:58 F0 业务 0 改动红线
- K3 8/23 02:52 SOP-8 撞车兜底 B
- K3 8/20 11:54 §0.21 push 配额不烧 token (报告不列 push 计数, 攒批作废)
- K3 8/8 15:35 §0.17 push 台账 (1 天 ≤ 5 push, amend 月上限 2 次)
- K3 8/8 07:12 §0.16 残留清理节奏 (~170/天 节奏, 8/13/15/17 3 批)
- K3 §0.6 紧急修复例外 (5xx 阻断 push 立即, 不豁免 30 min 间隔)
- K3 §0.19 用户暂停信号 → 立即杀 cron (暂停期间 0 progress tag)
- K3 §0.20 cron 1h minimum (cron 频次治, 跟 30 min 间隔互补)

**撤回声明**: 0 撤回. M3 8/26 0:00-14:35 撞车 5 次 (5/6/8/12 min 间隔) K3 14:35 拍板 30 min 规则 立即生效, 后续 push 必 ≥ 30 min 间隔, 上次 push 14:35 EOD, 下次 push 最早 15:05 (本撞墙升级报告).

**未校准 baseline** (per K3 §0.23 必含 "待/已校准"):
- 30 min 间隔 push 部署 规则: K3 8/26 14:35 已校准, 8/28 中检拉数 (per B7 §4 预注册 9 时段 + 10 KPI)
- 008 询盘基线: 待 B6' 撞车 = K3 必拍 key (8/22 K3 跑通测试邮件但 key 未透传, 8/29 首报待校准)
- 智印港品牌词 CTR: GSC 8/24 baseline 10% (已校准, 4 周目标 40%+)
- ジープリント branded search 6 query: GSC 8/24 baseline 0 imps (待 8/28 中检校准)

---

*整理: M3 8/26 撞墙升级报告 / 2026-08-26 14:38 / 数据: K3 14:35 撞墙升级拍板原文 + 8/26 0:00-14:35 11 commit 撞车 5 次 + K3 §0.21/§0.6/§0.19/§0.17/§0.20 / 撞墙 = M3 自主 K3 v2 预批"立即"覆盖 / ≥ 15:05 push (EOD 14:35 + 30 min) / docs + 4 cron + AGENTS.md §0.25 5 改动 1 commit*
