# 自进化 4 步 SOP — 反审门童（Regression Guard）SSoT

> **SSoT 路径**: `.hermes/regression-guard/playbook.md`
> **拍板来源**: K3 9/1 15:06 (12:37 派活包 + 3 齿轮)
> **维护责任**: Mavis (M3) 跨 session 永久执行
> **触发**: 任何 M3 派活包修复错误, 必同步执行 4 步循环

---

## 4 步循环 (K3 9/1 15:06 拍板)

### Step 1 错误识别 (Identify)

- **触发源**:
  - **编辑前** (Mavis 输出建议): 5 道门童 dry-run 命中
  - **commit 前** (pre-commit hook v7): 5 道门童 strict 模式硬拦
  - **push 后** (5 cron 监控): 5 道门童 dry-run + 错误日志写入
  - **K3 派活包**: K3 拍板撤除某类错误
  - **历史回灌**: scripts/seed-error-patterns.js 扫近 30 天 commit diff
- **动作**:
  - 写 `error-log.md` 记录 (commit ID + 命中门童 + 命中规则 + 派活包拍板)
  - 暂存到 error-patterns.md 待 Step 2 归类

### Step 2 归类 (Classify)

- **触发**: Step 1 后立即 (commit hook 命中时自动)
- **动作**:
  - 写 `error-patterns.md` 规则条目:
    - 模式编号: `<门童#>-<类别#>-<序号#>`
    - 类别 / 严重度 / regex / 例子 / 拦截方式 / K3 拍板 / 替代文案 / 首次发现 / K3 拍板来源
  - **重复检测**: 已存在规则 → 更新 lastSeen + 命中数
  - **新规则**: 新增条目
- **DoD 铁律** (K3 9/1 15:06 齿轮 1):
  - 任何派活包修复错误, 若未同步把 pattern 写入 error-patterns.md, 视为任务未完成
  - 错误修复与规则沉淀是同一个 commit 的两部分
  - 修法: commit msg 加 `[DoD: <rule-id>]` 标记, hook 自动检查 error-patterns.md 是否同步

### Step 3 拦截 (Intercept)

- **触发**: Step 2 完成后
- **动作**:
  - 升级 `scripts/guards/X-guard.js` 规则集
  - 加单元测试 (scripts/test-guards.js, v1.1 升级)
  - 验证 pre-commit hook 跑通 (本地模拟 commit 命中)
- **DoD 检查**:
  - `node scripts/check-regression-guard.js --dod src/` 必过
  - 命中规则 100% 入 error-patterns.md

### Step 4 验证 (Verify)

- **触发**: Step 3 完成后
- **动作**:
  - 5 cron dry-run 命中 0 (push 后)
  - 拦截率统计 (90% 目标)
  - 已 pattern 化错误复发数 = 0
  - 误报率 <10% (9/15 复盘)
- **复盘节点**:
  - 9/8 (W1 中检): 拦截次数 + 误报次数
  - 9/15 (W2): shadow mode FP 复盘 → orange/yellow 升级硬拦 (v1.1)
  - 9/30 (月度): §0.28 P4 月度复盘

---

## 齿轮 1: DoD 铁律 (K3 9/1 15:06)

**No fix without a rule**

- 任何派活包修复错误, 必同步把 pattern 写入 error-patterns.md
- 错误修复与规则沉淀是同一个 commit 的两部分
- 修法:
  - commit msg 加 `[DoD: <rule-id>]` 标记
  - pre-commit hook --dod 模式自动检查 error-patterns.md 是否同步
  - 缺 → exit 1 拒绝 commit

## 齿轮 2: 周健康报告 (K3 9/1 15:06)

**每周固定输出 (5 cron SSoT v6.4 嵌入)**:

| 指标 | 期望 | 实际 | 飞轮状态 |
|------|------|------|---------|
| 拦截次数 | (周累计) | (周累计) | |
| 误报次数 | <10% (9/15 后) | (周累计) | |
| 新增 pattern 数 | ≤5 (飞轮收敛) | (周累计) | |
| 已 pattern 化错误复发数 | 0 | (周累计) | ✅ 健康 (0 复发) |

**K3 验收标准**: 连续 2 周零新增 pattern 且零复发 = 飞轮健康

**输出位置**: `.hermes/logs/regression-guard-weekly-YYYY-MM-DD.md` (周报, 自动生成)

## 齿轮 3: 历史 diff 回灌 seeding (K3 9/1 15:06)

**不靠记忆建库, 用脚本扫近 30 天 commit diff**

- 脚本: `scripts/seed-error-patterns.js`
- 用法: `node scripts/seed-error-patterns.js --since=30d --seed`
- 逻辑:
  1. `git log --since=30d --name-only --pretty=format:"%H %s"` 拿 30 天内所有 commit + 文件
  2. 对每个 src/ 改动文件, 跑 check-regression-guard.js --strict 扫
  3. 命中规则写入 error-patterns.md 作为种子证据
  4. 写入 error-log.md 标记 "回灌 seeding"
- 首次运行: 9/1 15:10 (v1.0 落地时) → seeding 出 11 条规则
- 后续: 每月 1 号跑一次 (5 cron monthly 嵌入)

---

## 跨项目 P0 通用性 (K3 9/1 15:06 升级)

- **zprintpro**: v1.0 完整落地 (本派活包)
- **aitoptools / togthr / stock-lab**: v1.3 复用 (共享 scripts/guards/ 5 文件 + 适配各项目错误模式库)
- **跨 session 永久**: git tracked → 跨 5 cron / 4 项目自动应用

---

## v1.1 升级计划 (9/15 shadow mode 转正)

| 门童 | v1.0 (9/1-9/15) | v1.1 (9/15 后) |
|------|----------------|----------------|
| 🔴 red 电话/品牌/跨语言污染严重 | 硬拦 (默认) | 硬拦 (默认) |
| 🟠 orange 数据诚信 11 类 | 仅警告 (shadow) | FP 复盘 <10% 后升硬拦 (--strict) |
| 🟡 yellow i18n 半角/SOP-10 | 仅警告 (shadow) | FP 复盘 <10% 后升硬拦 (--strict-all) |

**复盘指标**:
- shadow 期间 0 复发 + FP <10% → 升级硬拦
- 升级后 24h 监控误报率 → 仍 <10% → 保持硬拦
- 升级后 24h 监控误报率 >10% → 回退 shadow + K3 升级

---

## 错误模式库 vs 错误日志 关系

- **error-patterns.md**: 规则定义 (模式 + 例子 + 拦截), 增量追加
- **error-log.md**: 错误实例 (commit ID + 命中 + 修复), 时间序列
- **playbook.md**: 自进化 SOP (4 步 + 3 齿轮), 跨 session 永久

三者协同:
- 模式库定义 → 门童脚本拦截 → 错误日志记录 → 周健康报告 → 模式库更新

---

**拍板来源**: K3 9/1 15:06 12:37 派活包 + 4 修正 + 3 齿轮
**首次建立**: 2026-09-01 (v1.0 落地)
**维护**: Mavis (M3) + K3 拍板
