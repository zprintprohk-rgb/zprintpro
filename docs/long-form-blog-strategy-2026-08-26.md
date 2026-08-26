# 长文策略 (K3 8/26 19:19 拍板 每周 2 篇高质量长文)

> **拍板来源**: K3 8/26 19:19 当前 turn "每周 2 篇高质量文章, 一定要是搞质量的长文, 我们有标准的, 有哪些结构, 理解清楚"
>
> **目的**: 每周 2 篇长文 (zh-hk 800-1000 字 + en/ja 250-350 词 native) 节奏, K3 §13.4 9 段 + 4 FAQ + 5 内链 + 3 locale 严格标准
>
> **触发**: mavis cron `zprintpro-long-form-blog-2x1w` 每周二/五 9:00 Asia/Shanghai, 跑新 agent `blog-long-form-writer`

## 一、长文标准 (K3 §13.4 9 段 + 4 FAQ + 5 内链 + 3 locale native + 7 Anti-AI-Slop)

| 维度 | 标准 |
|---|---|
| **长度** | zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词 native |
| **结构** | 9 段 (引子 1 + 主段 7 + CTA 1) + 4 FAQ + 5 内部链接 + 1 JSON-LD BlogPosting |
| **图片** | 0 (K3 §13.4 纯文字博客硬约束) |
| **品牌** | 智印港 / ZprintPro (zh-hk 双品牌) + ISO 9001 + FSC + Heidelberg + HP Indigo (具体品牌) |
| **数字** | 必须带具体数字 (HK$8/張 / 1,200+ / 18:00 截單 / 100 張起印) + 来源 (GSC 8/18 / 008-baseline-v1.md) |
| **链接** | 5 内部链接 (1 类目 + 1 服务 + 1 blog + 2 相关) + 0 外部 |
| **Last Updated** | 写具体日期, 不"近期" |
| **3 locale** | 不直译, 美式英语 + 日本語敬体 |

## 二、9 段模板 (K3 §13.4)

```
## 1. 引子 (60-80 字)
[痛点 + 1 句为什么这篇能解决]
[数字 / 品牌 / 来源 必带]

## 2. 主段 1 (100-150 字)
[概念/背景]

## 3. 主段 2 (100-150 字)
[维度 1: 工艺/纸材/价格/时间]

## 4. 主段 3 (100-150 字)
[维度 2]

## 5. 主段 4 (100-150 字)
[维度 3]

## 6. 主段 5 (100-150 字)
[维度 4 或 对比]

## 7. 主段 6 (80-100 字)
[案例 / 真实数据 / 客户场景]

## 8. 主段 7 (100-150 字)
[5 内部链接]
<ul>
  <li><a href="/zh-hk/category/xxx/">类目 1</a></li>
  <li><a href="/zh-hk/services/yyy/">服务页 1</a></li>
  <li><a href="/zh-hk/blog/zzz/">相关 blog</a></li>
  <li><a href="/zh-hk/category/aaa/">类目 2</a></li>
  <li><a href="/zh-hk/category/bbb/">类目 3</a></li>
</ul>

## 9. CTA (30-50 字)
[WhatsApp 30 秒即時報價: <a href="/zh-hk/services/rush-printing-delivery/">前往即日印刷服務頁</a>]

[最後更新: 2026 年 X 月 X 日 · 智印港 ZprintPro · ISO 9001 + FSC 認證]
```

## 三、4 FAQ 模板 (K3 §13.4)

```
<h3>Q1: [基础问题 - 起印量/价格/时间]</h3>
<p>[简答 30-50 字, 数字必带]</p>

<h3>Q2: [4 种纸材/工艺对比]</h3>
<p>[简答 30-50 字]</p>

<h3>Q3: [怎么下單/流程]</h3>
<p>[简答 30-50 字]</p>

<h3>Q4: [加工艺成本/特殊要求]</h3>
<p>[简答 30-50 字]</p>
```

## 四、5 内部链接策略 (K3 §13.4 互链密度)

| 链接 | 数量 | 作用 |
|---|---|---|
| 类目页 | 1-2 | SEO 权重传递 |
| 服务页 | 1 | 转化入口 (rush-printing-delivery 是转化王) |
| 相关 blog | 1 | 站内互链, 增加 PV |
| 月曆/喜帖/包装盒 相关 | 1-2 | 旺季 R5 / 客单价 / 长期大词 互链 |

## 五、7 Anti-AI-Slop (K3 §13.4)

1. **不空话**: 每段必须有具体数字或品牌或来源
2. **不空泛对比**: "我們比同業好" ❌, "18:00 截單翌日 12:00 到" ✅
3. **不堆砌套话**: "提供優質印刷服務" ❌, "100 張起印 CMYK 全彩防水" ✅
4. **不直译**: en/ja native, 不"中文 → 英文"
5. **不写 AI 套话**: 不"在當今數字化時代" / "随着 AI 技術的發展"
6. **数据带日期/来源**: "GSC 8/18 baseline 大信封 pos 2.21"
7. **段落短**: 1 段 ≤ 4 句, 1 句 ≤ 30 字

## 六、每周 2 篇节奏 (新 cron `long-form-blog-2x1w`)

| 周几 | 09:00 触发 | 内容 | 避开冲突 |
|---|---|---|---|
| 周二 | 1 篇长文 (新 agent 写) | TBD 选题 (B7 剩余 19 篇) | 避开周一 GBP 9:00 + 中检 12:00 + weekly-meta-refresh 11:00 |
| 周五 | 1 篇长文 (新 agent 写) | TBD 选题 | 避开周三 gsc-feedback-loop 15:00 |

**累计**: 每周 2 篇 × 9 周 = 18 篇 / 9 周 (B7 W1-W9 22 篇 - W1 #1 + W1 #2 + W3 #1 已 a1a7e56 + e133818 commit = 19 篇剩余, 18 篇 cron auto + 1 篇 W4 手动 R5 紧迫)

## 七、与现有 4 cron 边界 (K3 拍板"如果不好分配就建新")

| Cron | 内容 | 边界 |
|---|---|---|
| `daily-content-1x7w` | 短文 (<500 字) + SKU + matrix + IndexNow | **不跑长文** |
| `weekly-meta-refresh` | Tier B 行业 + 类目页 meta refresh | **不是 blog 内容** |
| `monthly-matrix-audit` | matrix 覆盖率审计 | **不是 blog 内容** |
| `gsc-feedback-loop` | GSC 数据 + 品牌词追踪 | **不是 blog 内容** |
| **`long-form-blog-2x1w`** (新) | **专门跑长文 ≥800 字** (新 agent blog-long-form-writer) | **新独立** |

## 八、撞车/豁免

- K3 19:19 当前 turn 拍板"按最优执行" = 1 次回复 = §0.22 撞墙 + §0.25 撞车 (距 fcd63be 1 min < 30 min) 双豁免成立
- 0 src 改动 (3 份 SSoT docs-only), F0 0 业务改动红线安全
- §0.17 amend 月上限 1/2 (剩 1), 本次不 amend
- K3 用 mavis CLI 创建 agent (Mavis 内部工具, M3 无法直接调用) — 3 docs 给 K3 拍板时参考

## 九、节奏触发器 (B7 22 篇派发进度)

| 周次 | 选题 | 当前状态 |
|---|---|---|
| W1 #1 | rush-printing-hk-guide | ✅ a1a7e56 commit 8/26 14:55 |
| W1 #2 | packaging-box-pricing-2026 | ✅ a1a7e56 commit 8/26 14:55 |
| W1 #3 | a4-c4-c5-envelope-specs | 📅 长文 cron 触发 (大信封 pos 2.21 第 1 优先) |
| W2 | (2 篇) | 📅 长文 cron |
| W3 #1 | 2027-monthly-calendar-printing-timetable | ✅ e133818 commit 8/26 17:52 (R5 9/15 硬截止) |
| W3 #2 | (1 篇) | 📅 长文 cron |
| W4-W9 | (剩余 13 篇) | 📅 长文 cron |

## 十、抢跑任务 (8/27-8/30 期间)

- **8/27 09:00 GBP 亲提** (K3 真人) — 给 rush 新页灌第一波真实流量
- **8/28 12:00 中检拉数** (M3 拉数) — 9 时段 + 10 KPI + 2 GEO + 修订版验收
- **8/30 08:00《2027 月曆印刷攻略》必发** (e133818 已 commit, daily-content cron 8/30 触发)
- **8/30 09:00 长文 cron 第 1 篇** (新 cron 安装后第 1 篇, 节奏起点)

## 十一、应用范围

- 任何 zprintpro / aitoptools / togthr / stock-lab 项目
- 任何 Mavis 长文 agent 创建
- 任何"每周 N 篇长文"节奏 (3-2-1 篇/周 灵活调)

## 十二、数据来源

- K3 8/26 19:19 当前 turn 拍板"每周 2 篇高质量长文"
- K3 §13.4 blog 标准 + 7 Anti-AI-Slop
- B7 22 篇派发 (commit 57f304f 8/26 05:36, docs/b7-blog-pool-2026-08-26.md)
- K3 §13.4 降速 2-3 篇/周 (8/26 04:10 拍板)
- 4 cron 现状 (.hermes/cron-prompts/{daily,weekly,monthly,gsc}.md)
- e133818 commit (W3 月曆首位 blog 8/30 08:00 必发)
- a1a7e56 commit (W1 #1 + W1 #2 blog zh-hk 已 commit)
- 16655c6 commit (T1+T2+T3 收口 8/27 06:00 前)
- 55f59cd commit (pre-push hook 今晚补)
- 008-baseline-v1.md (B6' 死穴已消, 漏斗底部洞已补上)
- autoclaw .cluster/rush-page-20260826/rush-nextjs-component-map.md
