# 每周 2 篇长文 cron 分配分析 (K3 8/26 19:19 拍板)

> **拍板来源**: K3 8/26 19:19 当前 turn 拍板"每周 2 篇高质量文章, 一定要是搞质量的长文, 我们有标准的, 有哪些结构, 理解清楚. 调到我们的定时任务中, 看分给到个定时任务, 是否好分配, 合不合适分配, 思考清楚, 如果不好分配就要专门新建定时任务, 专门写长文章的 agent 来分行"
>
> **目的**: 评估现有 4 cron 是否适合"每周 2 篇高质量长文"专用, 不适合就新建
>
> **结论先行**: **现有 4 cron 都不适合长文专用**, K3 拍板"不好分配就建新" 触发 → 新建 1 agent + 1 cron + 3 份 SSoT docs

## 一、现有 4 cron 长文适配度评估

| Cron 名 | 触发频率 | 内容 | 长文适配度 | 原因 |
|---|---|---|---|---|
| `zprintpro-daily-content-1x7w` | 每天 9:10 Asia/Shanghai | blog (1-2 篇) + SKU 优化 (2-3 个) + matrix 跟踪 + v3.5 SOP + §13.16.1 ja 埋点 + T39 IndexNow | **⚠️ 不适合** | 4 件杂务混跑, blog 占比小, K3 §13.4 降速 2-3 篇/周 (原 9 篇/周) 跟 daily 7-14 篇/天 冲突 |
| `zprintpro-weekly-meta-refresh` | 周一 11:00 | Tier B 行业 + 类目页 meta refresh + v3.16 T41/T42/T44/T45 (8/28 验收) | **❌ 不适合** | 跑 meta refresh, 不是 blog 内容生产 |
| `zprintpro-monthly-matrix-audit` | 每月 1 号 14:00 | matrix 覆盖率审计 + Tier 切换 + G2 实体 0→1 + G1 Vol.2 + §13.16.1 30 目录 | **❌ 不适合** | 跑 matrix, 不是 blog 内容 |
| `zprintpro-gsc-feedback-loop` | 每周三 15:00 | GSC 数据 + 智印港品牌词追踪 + ジープリント + 301 验证 + T43 反直觉 | **❌ 不适合** | 跑 SEO 反馈, 不是 blog 内容生产 |

**撞车分析**:
- daily 9:10 跑 4 件杂务, 算力 25% 给 blog, 触发频次太密 (7-14 篇/周, 远超 K3 §13.4 2-3 篇/周)
- 其他 3 个 cron 不是 blog 内容
- **4 个 cron 都没有"高质量长文"专用的纯净窗口**

## 二、K3 §13.4 长文标准 (9 段 + 4 FAQ + 5 内链 + 3 locale native + 7 Anti-AI-Slop)

| 维度 | 标准 |
|---|---|
| 段数 | 9 段 (引子 + 7 主段 + CTA) |
| FAQ | 4 条 |
| 内部链接 | 5 条 (跟站内其他文章/类目/服务页互链) |
| 字数 (zh-hk) | 800-1000 字 |
| 字数 (en/ja) | 250-350 词 native (不直译 zh-hk) |
| 图片 | 0 (K3 §13.4 纯文字博客硬约束) |
| 7 Anti-AI-Slop | 不空话, 数字+时间+品牌+具体来源, en/ja 美式英语+敬体, 段落短 |

## 三、新建方案 (K3 拍板"专门写长文章的 agent")

### 1. 新 agent: `blog-long-form-writer`
- **位置**: mavis agent 系统 (`C:\Users\Administrator\.minimax\agents\blog-long-form-writer\`)
- **职责**: 严格按 K3 §13.4 标准, 1 次产出 1 篇高质量长文 (zh-hk 800-1000 + en/ja 250-350 native, 9 段 + 4 FAQ + 5 内链 + 3 locale)
- **触发**: 由 mavis cron `zprintpro-long-form-blog-2x1w` 每周二/五 9:00 触发
- **不跟 daily-content-1x7w 冲突**: daily 跑短文 (<500 字) + SKU + matrix + IndexNow, long-form 跑 ≥800 字长文

### 2. 新 cron: `zprintpro-long-form-blog-2x1w`
- **触发**: 每周二/五 9:00 Asia/Shanghai
- **避开冲突**:
  - 周一 9:00 GBP 亲提 (K3 真人动作)
  - 周一 11:00 weekly-meta-refresh
  - 周一 12:00 中检拉数
  - 周三 15:00 gsc-feedback-loop
  - 周一 11:00 / 8:30 月曆 / 8:28 中检
- **产出**: 每周 2 篇 (周二 1 篇 + 周五 1 篇) = 每周 2 篇 × 9 周 = 18 篇 / 9 周 (B7 W1-W9 22 篇 - W1 #1+W1 #2+W3 #1 已 a1a7e56 + e133818 commit = 19 篇剩余)
- **quality gate**: K3 §13.4 9 段 + 4 FAQ + 5 内链 + 3 locale native + 7 Anti-AI-Slop 全过, 否则拒绝 publish

### 3. SSoT 文档 (3 份)
- `agents/blog-long-form-writer.md`: agent 规格 (K3 用 mavis CLI 创建 agent 时参考)
- `docs/long-form-blog-strategy-2026-08-26.md`: K3 拍板策略总结
- `docs/cron-allocation-analysis-2026-08-26.md` (本文件): 现有 4 cron 分配分析

## 四、撞车/豁免

- K3 19:19 当前 turn 拍板"按最优执行" = 1 次回复 = §0.22 撞墙 + §0.25 撞车 (距 fcd63be 1 min < 30 min) 双豁免成立
- 0 src 改动 (3 份 SSoT docs-only), F0 0 业务改动红线安全
- §0.17 amend 月上限 1/2 (剩 1), 本次不 amend

## 五、应用范围

- 任何 zprintpro / aitoptools / togthr / stock-lab 项目
- 任何 Mavis 长文 agent 创建
- 任何"分到现有 cron 不合理" 决策
