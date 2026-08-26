# K3 CEO 日复盘 (每晚 21:12 cron) - SSoT prompt
# K3 8/17 05:23 CEO 战略定调: 闭环要"自己跑起来", 缺最后一个零件 = 每晚 21:12 K3 CEO 复盘定时任务
# 用法: mavis cron HTTP API PATCH 此 prompt 到 daemon cache

## 任务

读当日执行报告 + GSC 快照 → 出次日指令。

## 数据源

1. **当日执行报告**:
   - `.hermes/logs/$(date +%Y-%m-%d).md` (M3/autoclaw 落盘)
   - `zprintpro/.cluster/m3-exec-20260811/DELIVERY/` 最新报告
   - git log --oneline -1 (HEAD 状态)

2. **GSC 快照**:
   - `.hermes/gsc-snapshot-2026-08-14.json` (历史)
   - `.hermes/gsc-7d-*.csv` (周数据, 每周三更新)
   - `.hermes/gsc-data/` (原始 CSV)

3. **当前战略基准**:
   - `docs/k3-ceo-strategy-2026-08-17.md` (北极星路线图, 12 个月)
   - §1.3 月度小北极星 (M1 = 度量上线 + CTR 收割)
   - §4 5 指令 (A 度量 / B CTR / C striking-distance / D GEO / E 图像)

## 5 步执行

### Step 1: 读执行报告
- `cat .hermes/logs/$(date +%Y-%m-%d).md` 提取今天做了什么
- 看 git log 最近 5 commits 看 production 变更
- 看 DELIVERY 目录最近 5 个报告

### Step 2: 读 GSC 数据
- 加载最新 GSC 快照 (7d/28d)
- 对比上周同窗口: 展示 / 点击 / CTR / 排名变化
- 提取 top 10 关键词 + top 10 页面

### Step 3: 对照 §1.3 月度小北极星
- 当前是 M1 (8/17-9/16): 度量上线 + CTR 收割
- 验收: GA4+Supabase 跑通; 月点击 43→150; 59 号图像完成
- 报告当前进度 (0-100%)

### Step 4: 5 指令状态检查
- A (P0 本周): Supabase key / GA4 / PayPal - 完成?
- B (P0 3 天): top 25 零点击词 title/meta - 完成?
- C (P1 2 周): 4 个 striking-distance 词 - 进度?
- D (P1 2 周): GEO 地基 - llms.txt 上线?
- E (P2 并行): 59 号图像批次 - dry-run 完成?

### Step 5: 出次日指令
- 简短 (1 段, 5-10 行)
- 包含: ①昨日执行摘要 ②今日关键数据 (impressions/clicks/CTR) ③风险/阻塞 ④今日 1-3 优先级任务 ⑤K3 决策点
- 输出到 `.hermes/k3-daily-review-$(date +%Y-%m-%d).md`
- 发送一条短 ack 给 K3 session (mavis session send)

## 报告格式 (5 段)

```markdown
# K3 CEO 日复盘 — YYYY-MM-DD (M1 D+X)

## ①昨日执行摘要
- A 指令: [进度 % / 阻塞 / 完成]
- B 指令: [top X 词改完 / 累计]
- C 指令: [排名变化]
- D 指令: [GEO 资产上线状态]
- E 指令: [59 号批次状态]

## ②今日 GSC 数据 (vs 上周同窗口)
- 展示: X (上周 Y, ±Z%)
- 点击: X (上周 Y, ±Z%)
- CTR: X% (上周 Y%, ±Z%)
- 新进 top 20: [词列表]
- 排名上升: [词列表]

## ③风险/阻塞
- [阻塞 1: Supabase key 仍未拍板 / PayPal 仍审核中]
- [阻塞 2: GA4 无真实流量]

## ④今日 1-3 优先级任务
- P0: [指令 A2 GA4 真实流量验证]
- P1: [指令 B top 25 中剩余 X 词]
- P2: [指令 D1 llms.txt 上线]

## ⑤K3 决策点 (需要拍板)
- 决策 1: [...]
- 决策 2: [...]
```

## 资源

- 战略文档: `docs/k3-ceo-strategy-2026-08-17.md`
- AGENTS.md §0.7 production smoke / §0.17 push quota / §13.10 NAP 脱钩
- memory skill "mavis cron prompt HTTP API 绕开 CLI buffer"

## 静默规则 (per AGENTS.md R6)

- TTL 24h: cron 自删 (per AGENTS.md R6-cron 自检)
- 报告落盘失败: 自动升级 K3
- GSC 数据缺失: 跳过 §2 步骤, §4 重点查阻塞

## 与现有 cron 关系

- 10:15 内容自进化 cron: 写博客
- 21:12 K3 CEO 日复盘 cron (新增): 读执行 + 出指令
- 周一 11:00 meta refresh: 标题重写
- 周三 15:00 GSC 反馈环: 数据更新
- 每月 1 号 14:00 矩阵审计
- 每月 16 号 K3 月度北极星校准
