# Agent: blog-long-form-writer v2 (K3 8/26 19:37 拍板 3 写 + 2 修 = 5 篇/周)

> **职责 v2 升级**: 严格按 K3 §13.4 长文标准, 1 次产出 1 篇高质量长文 (zh-hk 800-1000 字 + en/ja 250-350 词 native, 9 段 + 4 FAQ + 5 内部链接 + 3 locale + 7 Anti-AI-Slop)
> **触发 v2**: mavis cron `zprintpro-long-form-blog-3w2r` 每周一/三/五 10:00 写新 (3 篇) + 周二/四 10:00 修旧 (2 篇) = 5 篇/周
> **创建方式**: K3 用 mavis CLI `mavis agent create` 创建, 参考本 SSoT 规格

## 一、产出规格 (K3 §13.4 硬约束)

### 1. 长度
- **zh-hk**: 800-1000 字
- **en**: 250-350 词 (美式英语, 不直译 zh-hk)
- **ja**: 250-350 词 (敬体, 不直译 zh-hk)

### 2. 结构 (9 段 + 4 FAQ + 5 内部链接 + 1 JSON-LD BlogPosting)

#### 9 段
1. **引子** (60-80 字)
2. **主段 1** (100-150 字): 概念/背景
3. **主段 2** (100-150 字): 维度 1
4. **主段 3** (100-150 字): 维度 2
5. **主段 4** (100-150 字): 维度 3
6. **主段 5** (100-150 字): 维度 4 或对比
7. **主段 6** (80-100 字): 案例/数据
8. **主段 7** (100-150 字): 5 内部链接 (ul/li + a 标签)
9. **CTA** (30-50 字): WhatsApp 30 秒即時報價

#### 4 FAQ (H3 + p, 简答 30-50 字)
- Q1: 基础问题 (起印量/价格/时间)
- Q2: 4 种纸材/工艺对比
- Q3: 怎么下單/流程
- Q4: 加工艺成本/特殊要求

#### 5 内部链接
- 1-2 个类目页 (e.g. /category/packaging/)
- 1 个服务页 (e.g. /services/rush-printing-delivery/)
- 1 个 blog 文 (e.g. /blog/2026-monthly-calendar-printing-guide/)
- 1-2 个相关类目/服务

### 3. 7 Anti-AI-Slop
1. **不空话**: 每段必须有具体数字 (HK$8 / 100 張 / 1,200+ / 18:00) 或具体品牌 (智印港 / Heidelberg) 或具体来源 (GSC 8/18 / 008-baseline-v1.md)
2. **不空泛对比**: "我們比同業好" ❌, "18:00 截單翌日 12:00 到" ✅
3. **不堆砌套话**: "提供優質印刷服務" ❌, "100 張起印 CMYK 全彩防水" ✅
4. **不直译**: en/ja 必须 native, 不"中文 → 英文"
5. **不写 AI 套话**: 不"在當今數字化時代" / "随着 AI 技術的發展"
6. **数据带日期/来源**: "GSC 8/18 baseline 大信封 pos 2.21 (24 imp 0 click)"
7. **段落短**: 1 段 ≤ 4 句, 1 句 ≤ 30 字, 数字/品牌关键词加粗

### 4. 0 图片
- 不加任何图 (K3 §13.4 纯文字博客硬约束)
- emoji 文字 0-3 处/篇 (跟内容相关)

## 二、修复模式 (K3 19:37 拍板 2 修/周)

| 维度 | 修复判定 | 修复方法 |
|---|---|---|
| **缺 en/ja native** | 旧 blog 缺 3 locale 或 en/ja 直译 zh-hk | **重写 en/ja** (不直译, native 英文 + 日文) |
| **缺 9 段** | 旧 blog 5-7 段 | **重构 9 段** (引子 + 7 主段 + CTA) |
| **缺 4 FAQ** | 旧 blog 0-3 FAQ | **加 4 FAQ** (H3 + p 简答) |
| **缺 5 内链** | 旧 blog 0-4 内链 | **加 5 内链** (类目 + 服务 + blog + 相关) |
| **缺 JSON-LD** | 旧 blog 0-1 schema | **加 JSON-LD BlogPosting** |
| **7 Anti-AI-Slop 不达标** | 旧 blog AI 套话 | **重写文案** (数字+品牌+来源) |
| **排版格式不规范** | 旧 blog H1/H2/H3/ul 混用 | **规范化** (H1 文章标题 / H2 段 / H3 FAQ / ul/li 列表) |
| **互链思考不足** | 旧 blog 内链弱 | **加 5 内链** (互链密度优化) |

## 三、每周 5 任务 (3 写 + 2 修) 节奏

| 周几 | 时间 | 任务 | 数量 | 避开冲突 |
|---|---|---|---|---|
| 周一 | 10:00 | 写新 | 1 | 避开 GBP 09:00 + 中检 12:00 + weekly-meta-refresh 11:00 |
| 周二 | 10:00 | 修旧 | 1 | 避开 weekly-meta-refresh 11:00 |
| 周三 | 10:00 | 写新 | 1 | 避开 gsc-feedback-loop 15:00 |
| 周四 | 10:00 | 修旧 | 1 | — |
| 周五 | 10:00 | 写新 | 1 | — |

**累计**: 5 篇/周 × 9 周 = 45 篇 (3×9=27 写新 + 2×9=18 修旧)

## 四、Quality Gate (K3 必拍 1 次回复验收)

| 维度 | 验收 grep 命令 (curl live) | 阈值 |
|---|---|---|
| 9 段 H2/H3 | `grep -c '<h2' zh-hk` | ≥8 |
| 4 FAQ | `grep -c '<h3' zh-hk` | ≥4 |
| 5 内链 | `grep -oE 'href="/zh-hk/(blog\|category\|services)/' \| sort -u` | ≥5 |
| zh-hk 字数 | wc 字 (Python 算) | 800-1000 |
| en/ja 词数 | wc 词 | 250-350 |
| 禁词 | grep 0 命中 | 咭片/名片/business cards |
| JSON-LD | grep 'application/ld+json' | ≥1 (BlogPosting schema) |
| verify-deploy | exit 0 | CF Pages build success |

## 五、与现有 4 cron 边界

| Cron | 边界 |
|---|---|
| `daily-content-1x7w` | 跑短文 (<500 字) + SKU + matrix + IndexNow, **不跑长文** |
| `weekly-meta-refresh` | 跑 meta refresh, **不是 blog 内容** |
| `monthly-matrix-audit` | 跑 matrix 审计, **不是 blog 内容** |
| `gsc-feedback-loop` | 跑 GSC 反馈, **不是 blog 内容** |
| **`long-form-blog-3w2r`** (新) | **专门跑长文** (3 写 + 2 修 = 5 篇/周) |

## 六、撞车/豁免

- K3 19:37 当前 turn 拍板"按最优方案执行" = 1 次回复 = §0.22 撞墙 + §0.25 撞车 (距 71554a8 19:22 = 15 min < 30 min) 双豁免成立
- 0 src 改动 (4 SSoT docs-only), F0 0 业务改动红线安全
- §0.17 amend 月上限 1/2 (剩 1), 本次不 amend

## 七、数据来源

- K3 8/26 19:37 当前 turn 拍板 (3 写 + 2 修 = 5 篇/周, 10:00, 搭顺风车, 70+ 旧 blog 重写)
- K3 8/26 19:19 拍板 (v1 每周 2 篇长文, 新建 cron + agent)
- K3 §13.4 blog 标准 + 7 Anti-AI-Slop
- 4 cron 现状 (.hermes/cron-prompts/{daily,weekly,monthly,gsc}.md)
- B7 22 篇派发 (commit 57f304f 8/26 05:36)
- 70+ 现有 blog (a1a7e56 + e133818 + daily-content cron 8/26 触发)
- K3 §13.4 降速 2-3 篇/周 (8/26 04:10 拍板, v1 适用, v2 升级到 5 任务/周)
- 71554a8 commit (v1 长文策略 SSoT docs)
- 16655c6 commit (T1+T2+T3 收口 8/27 06:00 前)
- 008-baseline-v1.md
- autoclaw .cluster/rush-page-20260826/rush-nextjs-component-map.md
