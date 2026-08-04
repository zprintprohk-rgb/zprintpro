# K3 8/4 15:07 战略修正: Hreflang 修复目的升级

**触发**: K3 8/4 15:07 拍板战略修正
**核心变化**: Hreflang 修复目的从"分流旧权重" → "保护新增长 + 确权"

## 1. 战略修正核心

### 1.1 旧理论 (8/4 12:13 模块 1 审计)
- zh-hk 74.6% 流量 → en/ja 18.1% / 6.5% → Hreflang 失效导致 en/ja 重复内容被 Google 去重
- 修复目的: 分流 zh-hk 旧权重到 en/ja

### 1.2 新理论 (8/4 15:07 K3 战略修正)
- **zh-hk 流量是"旧权重 + 新内容"混合体**
- **en/ja 流量是 10 天新增长** (7/23 v7 daily + 7/27 weekly-meta-refresh 优化后新长出来)
- 旧站 z-printpro.com 只有中文权重, 没有 en/ja 权重 → en/ja 流量 = 纯新增长
- 修复 Hreflang 目的: **"确权"** — 告诉 Google en/ja 是独立页面别删, 保护新增长

## 2. 8/5 09:00 任务调整

### 2.1 P0 攒批 (Hreflang 升级 P0 + HSTS)

**Hreflang 修复 (1h)**:
- 目标: 防止 Google 把 en/ja 新页面当 zh-hk 重复内容过滤掉
- 修复内容: deep dive `metadata.alternates.languages` + 测试 4 页 hreflang 命中
- 8/5 09:00-10:00 执行

**HSTS 修复 (5 min)**:
- CF Dashboard → SSL/TLS → Edge Certificates → HSTS 启用
- 8/5 10:00-10:05 执行

**1 commit + 1 push 攒批**:
- 跟 8/5 9:10 daily cron 同期推
- §0.1 第 1 例外 (8/5 新一天, 攒批 SOP 重新计数)

### 2.2 8/12 复盘新增监控 (K3 拍板)

- en/ja 流量趋势验证 Hreflang 修复效果
- 修复后 en/ja 流量继续涨 → 策略对
- 修复后 en/ja 流量跌 → 旧站权重转移时有问题 / 新内容质量不够

## 3. 8/6-8/9 模块 5-7 排期 (不变)

### 3.1 模块 5 (GSC 深度) 8/6 跑
- 背景: en/ja 是新增长
- 重点分析: v7 daily + weekly-meta-refresh 对 en/ja 流量贡献
- 维度: 7/23-8/4 (10 天) en/ja 流量增量 vs zh-hk 流量增量

### 3.2 模块 6-7 (竞品 + 外链) 8/7-8/8
- 6 竞品名单 (K3 拍板: Packhelp / Noissue / Sticker Mule / Vistaprint / Alibaba / +1)

### 3.3 汇总 00+08 (Executive Summary) 8/8-8/9
- 含 en/ja 新增长保护策略
- 修复优先级 (Hreflang 升级 P0 确认)
- llms.txt 1 段结论 (K3 12:13 降级 P3)

## 4. K3 inbox 关联

- 8/4 12:13 模块 1 P0-1 robots.txt CF Dashboard 操作清单
- 8/4 12:13 模块 1 P1-3 Hreflang 升级 P0 修复
- 8/4 14:26 P0 修复记录
- **8/4 15:07 战略修正 (本文档)** - Hreflang 修复目的升级

## 5. 8/4 闭环状态 (K3 15:07 拍板后)

### 5.1 已完成 (8/4 06:01 - 15:07)

- 6 commits pushed (§0.1 第 1+2+3+4+5+6 例外全 K3 拍板)
- 8 月 quota 21/500 = 4.2%
- P0-1 robots.txt (application level)
- P0-2 AggregateRating 假数据 (42 处)
- v8 daily cron SEO+GEO 8 章标准
- BlogContent 22 tabs (25 blog 全部归类)
- zprintpro-audit/ 5 文件 (01+02+05, 待 00+03+04+06+07+08)

### 5.2 待 K3 8/4 闭环确认 (15:30)

- 8/4 任务全部拍板落地
- 8/5 09:00 self-reminder 触发 Hreflang + HSTS P0 攒批
- 8/5 9:10 daily cron v8 自动启动 写新文 (queue ≥ 1 强制)

### 5.3 K3 待办 (非 M3)

- CF Dashboard → Security → Bots → 12 AI crawlers 全部 Allowed
- 验证 5 min 后: `curl -s https://zprintpro.com/robots.txt | grep GPTBot` 只看到 Allow

## 6. 跟之前模块交叉

| 模块 | 8/4 状态 | 8/5 拍板后 |
|---|---|---|
| 01-technical-seo.md | 70/100, 修复后 90/100 | 8/5 Hreflang + HSTS 修后预计 95/100 |
| 02-schema-markup.md | 65/100, AggregateRating 删 | 8/4 已修, 不变 |
| 05-gsc-trend-analysis.md | Hreflang P1-3 升级 P0 | 8/5 修后, 8/12 复盘验证 en/ja 流量 |
| 03/04/06/07/08 | 8/5-8/9 排期不变 | 模块 5 8/6 重点 en/ja 新增长分析 |
| 00 (Executive Summary) | 8/8-8/9 | 战略修正 + 修复优先级 (Hreflang 升级 P0 确认) |
