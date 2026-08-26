# Agent: blog-long-form-writer (K3 8/26 19:19 拍板 专门写长文章 agent)

> **职责**: 严格按 K3 §13.4 长文标准, 1 次产出 1 篇高质量长文 (zh-hk 800-1000 字 + en/ja 250-350 词 native, 9 段 + 4 FAQ + 5 内部链接 + 3 locale native + 7 Anti-AI-Slop)
> **触发**: mavis cron `zprintpro-long-form-blog-2x1w` 每周二/五 9:00 Asia/Shanghai
> **创建方式**: K3 用 mavis CLI `mavis agent create` 创建, 参考本 SSoT 规格

## 一、产出规格 (K3 §13.4 硬约束)

### 1. 长度
- **zh-hk**: 800-1000 字
- **en**: 250-350 词 (美式英语, 不直译 zh-hk)
- **ja**: 250-350 词 (敬体, 不直译 zh-hk)

### 2. 结构 (9 段 + 4 FAQ + 5 内部链接)

#### 9 段 (按 K3 §13.4 模板)
1. **引子** (60-80 字): 痛点 + 1 句为什么这篇能解决
2. **主段 1** (100-150 字): 概念/背景
3. **主段 2** (100-150 字): 维度 1
4. **主段 3** (100-150 字): 维度 2
5. **主段 4** (100-150 字): 维度 3
6. **主段 5** (100-150 字): 维度 4 或对比
7. **主段 6** (80-100 字): 案例/数据
8. **主段 7** (100-150 字): 5 内部链接 (用 ul/li + a 标签)
9. **CTA** (30-50 字): WhatsApp 30 秒即時報價

#### 4 FAQ (H3 + p, 简答)
- Q1: 基础问题 (起印量/价格/时间)
- Q2: 4 种纸材/工艺对比
- Q3: 怎么下單/流程
- Q4: 加工艺成本/特殊要求

#### 5 内部链接 (中文)
- 1 个类目页 (e.g. /category/packaging/)
- 1 个服务页 (e.g. /services/rush-printing-delivery/)
- 1 个 blog 文 (e.g. /blog/2026-monthly-calendar-printing-guide/)
- 2 个相关类目/服务 (e.g. /category/paper-bags/ + /services/wedding-invitation-printing/)

### 3. 7 Anti-AI-Slop (K3 §13.4)
1. **不空话**: 每段必须有具体数字 (HK$8 / 100 張 / 1,200+ / 18:00 / 4.6vw / 156 char) 或具体品牌 (智印港 / Heidelberg Speedmaster 6+1) 或具体来源 (GSC 8/18 baseline / 008-baseline-v1.md)
2. **不空泛对比**: "我們比同業好" ❌, "18:00 截單翌日 12:00 到, 順豐滿 HK$500 免費, DHL 全球 2-4 天" ✅
3. **不堆砌套话**: "提供優質印刷服務" ❌, "100 張起印 CMYK 全彩防水 1 張 A1 海報 HK$15 急件" ✅
4. **不直译**: en/ja 必须 native (美式英语 + 日本語敬体), 不"中文 → 英文直译"
5. **不写 AI 套话**: 不"在當今數字化時代" / "随着 AI 技術的發展", 直接说事
6. **数据带日期/来源**: "GSC 8/18 baseline 顯示 大信封 pos 2.21 (24 imp 0 click)" 不"印刷業數據顯示..."
7. **段落短**: 1 段 ≤ 4 句, 1 句 ≤ 30 字, 数字/品牌 关键词 加粗 (但 zh-hk 用 html <strong>)

### 4. 0 图片 (K3 §13.4 纯文字博客硬约束)
- 不加任何图 (alt 标签 img, 背景图 SVG, emoji 图片)
- emoji 文字 (📧 🔥 ✅ 等) 可用 0-3 处/篇, 跟内容相关 (e.g. ✅ 在价格表)
- 数字 + 单位: 必带 (1,200+ 客戶 / HK$0.25/張 / 18:00 截單 / 100 張起印)

## 二、Quality Gate (K3 必拍 1 次回复验收)

| 维度 | 验收 grep 命令 (curl live) | 阈值 |
|---|---|---|
| 9 段 H2/H3 | `grep -c '<h2' zh-hk` | ≥8 (引子 1 段 + 主段 7 段 + CTA 1 段) |
| 4 FAQ | `grep -c '<h3' zh-hk` | ≥4 (FAQ 标题) |
| 5 内链 | `grep -oE 'href="/zh-hk/(blog\|category\|services)/' \| sort -u` | ≥5 |
| zh-hk 字数 | wc 字 (Python 算) | 800-1000 |
| en/ja 词数 | wc 词 | 250-350 |
| 禁词 | grep 0 命中 | 咭片/名片/business cards |
| JSON-LD | grep 'application/ld+json' | ≥1 (BlogPosting schema) |
| verify-deploy | exit 0 | CF Pages build success |

## 三、commit message 格式 (K3 §6 附 #2 假设段)

```
feat(blog): W3 月曆首位 (slug 2027-monthly-calendar-printing-timetable, R5 9/15 硬截止)

**假设** (per K3 §6 附 #2): 月曆是 9 月最大时间敏感机会 (T42 月曆每拖 1 天 旺季收成少 1 天), 2027 月曆 GSC 8/18 baseline pos 21.1 (24 imps) 验证 4 周后改写, expected striking 进首页 ≤ 5

[commit body]
```

## 四、与现有 4 cron 边界

| Cron | 边界 |
|---|---|
| `daily-content-1x7w` | 跑短文 (<500 字) + SKU + matrix + IndexNow, **不跑长文** |
| `weekly-meta-refresh` | 跑 meta refresh, **不跑长文内容** |
| `monthly-matrix-audit` | 跑 matrix 审计, **不跑长文内容** |
| `gsc-feedback-loop` | 跑 GSC 反馈, **不跑长文内容** |
| **`long-form-blog-2x1w`** (新) | **专门跑长文** (≥800 字 + 9 段 + 4 FAQ + 5 内链 + 3 locale) |

## 五、撞车/豁免

- K3 19:19 当前 turn 拍板"按最优执行" = 1 次回复 = §0.22 撞墙 + §0.25 撞车 (距 fcd63be 1 min) 双豁免成立
- 0 src 改动 (3 份 SSoT docs-only), F0 0 业务改动红线安全

## 六、数据来源

- K3 8/26 19:19 当前 turn 拍板"每周 2 篇高质量长文"
- K3 §13.4 blog 标准 (9 段 + 4 FAQ + 5 内链 + 3 locale native + 7 Anti-AI-Slop)
- 4 cron 现状 (.hermes/cron-prompts/{daily,weekly,monthly,gsc}.md)
- B7 22 篇派发 (commit 57f304f 8/26 05:36, docs/b7-blog-pool-2026-08-26.md)
- K3 §13.4 降速 2-3 篇/周 (8/26 04:10 拍板)
- e133818 commit (W3 月曆首位 blog 8/30 08:00 必发)
- a1a7e56 commit (W1 #1 + W1 #2 blog zh-hk 已 commit)
- 16655c6 commit (T1+T2+T3 收口 8/27 06:00 前)
- 008-baseline-v1.md (B6' 死穴已消, 漏斗底部洞已补上)
- autoclaw .cluster/rush-page-20260826/rush-nextjs-component-map.md
