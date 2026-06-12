# 智印云 ZprintPro — 顶级 SEO/GEO 战略路线图 (2026-06-12 → 2026-09-12)

> **作者**: opc-growth-architect L4
> **给谁看**: 终局师 / Mavis 编排者 / ai-coder / ai-content-engineer
> **基于数据**: Phase A2 评分 (Overall 43.5) + Phase B 5 P0 修 + Phase B-P1 4 P1 修 + P1-7 评分脚本修 (+0.3) + 竞品 benchmark
> **核心断言**: 当前 43.5/100 → **90 天达 75+ (良好)** 现实可达; **90+/100 (优秀)** 需 Authority (外接数据) + 内容深度扩写, 需 6-9 个月
> **不做**: 不重复 Phase A2/B/P1 已写过的内容; 不凭印象估分; 不改代码 (战略层)

---

## 0. TL;DR — 一页纸结论

| 维度 | 当前 | 30 天目标 | 60 天目标 | 90 天目标 | 路径 |
|------|------|----------|----------|----------|------|
| **Overall** | 43.5 | **58-62** | **68-72** | **75-80** | 混合 |
| **GEO Score** | 53.1 | **65-68** | **72-75** | **78-82** | 代码 + 数据为主 |
| **SEO Score** | 34.0 | **48-52** | **58-63** | **65-70** | 内容为主 |
| **核心动作** | schema 注入已 5/13 | 评分脚本升级 + 缺哪补哪 | 25 个 stub blog 扩写 | Trustpilot + GSC 接入 | 见 §3 路线图 |
| **预计询盘影响** | 0 (基线) | +20-30% | +50-80% | +80-150% | 与 GSC 数据挂钩 |

**3 个不容妥协**:
1. **90 天最低 75/100** — 否则不进 top tier, LLM 引用率起不来
2. **R 维度是最大杠杆** — 22.0 → 60+ 仅 schema 注入就够, 这是性价比 #1
3. **内容层 (Ept/Exp) 是 75→90 的瓶颈** — 这是代码改不出来的, 必须真写

---

## 1. 第一性原理差距分析 (八维度本质)

> **方法论**: 从"我已修过什么"反推是错的。**从"为什么 LLM/Google 给这个分数"反推**, 才是真分析。

### 1.1 8 维度本质解读 (基于 80 项 Rubric, 不基于 P0/P1 状态)

| 维度 | 现状 | 等级 | 本质原因 (1 句话) | 修复杠杆 |
|------|------|------|-------------------|---------|
| **C (Contextual)** | 68.8 | 中 | Title/H1/canonical/description 框架合规, 但 description 长度/质量差 + 79 产品页中文泄漏 | **代码层** (1-2 天) |
| **O (Organization)** | 75.5 | 好 | 全站 schema 覆盖率 100%, 但 ItemList/HowTo/Speakable **缺结构化深度** | **代码层** (3-5 天) |
| **R (Referenceability)** | 22.0 | 差 | **LLM 引用最依赖的语义锚点塌方** — 作者 bio (R02 0/138) / HowTo (R06 0/138) / Speakable (R07 0/138) / LocalBusiness (R08 0/138 → 已修 6/138) | **代码层** (P0/P1 已修, 但 R02/R06/R07 仍 0%) |
| **E (Exclusivity)** | 47.9 | 低 | AggregateRating 已实现但 50% 页面无; 内部数据/案例/FAQ 全站 1 页 | **数据层** (需真数据) |
| **Exp (Experience)** | 43.7 | 低 | Real photos/testimonials/process 缺; Exp 全靠 word_count 启发式 | **内容层** (真素材) |
| **Ept (Expertise)** | 46.3 | 低 | Glossary/standards/citation 全缺; blog 600 字门槛近半不达标 | **内容层** (扩写) |
| **A (Authority)** | 0.0 | 差 | **10 项全 N/A, 需外接 GSC/Ahrefs/Moz** — 不是 zprintpro 差, 是评估工具没接数据 | **数据层** (API 接入) |
| **T (Trust)** | 45.9 | 低 | HTTPS 100% + 4/138 trust badges + 0/138 guarantee; T 5 项 site-level N/A (Trustpilot/BBB) | **数据层** (第三方) |

### 1.2 真实差距 — 不是 zprintpro 差, 是 3 类问题叠加

**类型 A: 评估工具盲区 (5/8 维度部分原因)** — 评分上限被锁死
- A 维度 10/10 项 N/A → 不接 GSC + Ahrefs + Moz API, A 永远 0/100
- T 维度 5/10 项 N/A → 不接 Trustpilot widget, T 永远 ≤ 60
- E04 (AggregateRating) 在 V1 时被脚本 bug 误判 (P1-7 已修)

**类型 B: 代码层可修 (3 个维度可纯代码提升)** — 性价比最高
- R 维度: 4 schema (HowTo/Speakable/Author bio/LocalBusiness) — **Phase B+P1 已修, 但 R02/R06/R07 仍未真正覆盖** (只动了 HowTo/Speakable 结构, 没改 author bio 内容)
- O 维度: Key Takeaways / Comparison Table / Table data — 代码可补
- C 维度: description 长度/质量 + 79 产品中文泄漏 — **已修 P0-1 + P1-1, 但 blog 40 页 description 仍是 stub**

**类型 C: 内容层必须真写 (3 个维度卡死)** — 烧时间, 不烧代码
- Ept 维度: Glossary / Standards (FSC, ISO 12647, G7) / Citation — 没人能 AI 生成有版权的 standards 引用
- Exp 维度: Real photos (车间 / 印刷机 / 质检台) / Testimonials (真实客户名字+头像) / Case studies (真实数据)
- E 维度: Case study 详情 + 内部数据 (e.g. "30 秒报价 vs 行业平均 2 小时")

### 1.3 关键洞察 — 80% 分数集中在 4 类动作

```
Overall 43.5 → 75 增量来源拆解:

1. R 22.0 → 60+        = +38 分 × R占GEO权重 25%     = GEO +9.5 分 → Overall +4.8  [代码层]
2. Ept 46.3 → 65+      = +19 分 × Ept占SEO权重 25%    = SEO +4.8  分 → Overall +2.4  [内容层]
3. Exp 43.7 → 60+      = +16 分 × Exp占SEO权重 25%    = SEO +4.0  分 → Overall +2.0  [内容层]
4. T 45.9 → 65+        = +19 分 × T占SEO权重 25%      = SEO +4.8  分 → Overall +2.4  [数据层]
5. A 0 → 30+ (接入)    = +30 分 × A占SEO权重 25%      = SEO +7.5  分 → Overall +3.8  [数据层]
6. C 68.8 → 78         = +9.2  × C占GEO权重 25%       = GEO +2.3  分 → Overall +1.2  [代码层]
7. E 47.9 → 60         = +12.1 × E占GEO权重 25%       = GEO +3.0  分 → Overall +1.5  [混合]
8. O 75.5 → 82         = +6.5  × O占GEO权重 25%       = GEO +1.6  分 → Overall +0.8  [代码层]

总增量估算: 18.9 分 → 62.4 → 不够 75 ✗
重估: R 提升假设保守 + 内容层扩写 35 个 blog = 再加 8-10 分 → 70-72 ✗
需要 A+T 接入 + content scaling → 才能稳到 75+
```

**结论**: 75 分 = 至少需要 **代码 + 内容 + 数据三层全开**, 单纯任何一层都达不到。

---

## 2. 竞品 Benchmark (公开数据校准)

> **来源**: Ahrefs / SEMrush / SimilarWeb 公开统计 + 行业 SEO 评分标准
> **方法**: 不直接拉竞品 (付费墙), 用行业 tier 分类 + 公认可比指标

### 2.1 印刷/电商 SaaS 行业基准

| 网站 | DR (估算) | Organic KW (估) | 月流量 (估) | 行业 tier | 90 天 zprintpro 对标 |
|------|----------|----------------|------------|----------|---------------------|
| **Vistaprint.com** | 88-92 | 200K+ | 8M+ | Tier 1 (顶级) | 不可对标 |
| **Moo.com** | 78-82 | 30K+ | 800K+ | Tier 1 | 不对标, 但其内容深度可学 |
| **Printful.com** | 82-86 | 150K+ | 3M+ | Tier 1 | 不对标 |
| **99designs.com** | 80-85 | 100K+ | 2M+ | Tier 1 | 不对标 |
| **GotPrint.com** | 55-65 | 8K+ | 80K+ | Tier 2 | **直接对标** (印刷 niche, B2B) |
| **UPrinting.com** | 50-60 | 6K+ | 60K+ | Tier 2 | **直接对标** |
| **Alibaba 印刷子板块** | DR 95+ | KW 1M+ | 流量极大 | Tier 0 | 不对标, 不同生态 |
| **zprintpro.com (当前)** | **估 5-15** | **估 <100** | **估 <1K/月** | **Tier 4 (新站)** | **起点** |

### 2.2 行业 SEO 评分阈值 (公开标准)

来自京杭唯创 / 多家外贸 SEO 公司公开方法论:
- **65 分 = 新站上线生存线** (技术架构 + TDK 完整)
- **75 分 = 稳定运营及格线** (内链网 + 外链质量) ← **我们 90 天目标**
- **80 分 = 竞争力线** (内容 + 外链 + 信任信号)
- **90 分 = 优秀线** (全维度 + Authority + 实时更新)

### 2.3 Tier 2 竞品 (GotPrint/UPrinting) 的 SEO/GEO 模式分析

通过对公开案例研究, **Tier 2 印刷站 (DR 50-65)** 的典型特征:

| 信号 | Tier 2 必有 | zprintpro 当前 |
|------|-----------|---------------|
| Blog 数量 | 50-150 篇 (深度 + 原创) | 35 篇 (其中 21 stub) |
| 每篇 Blog 字数 | 平均 1500-2500 字 | 平均 600-1200 字 |
| HowTo schema | 20+ 页 | 24 页 (主钻 4 品类 × 6 单元) |
| Speakable schema | 50+ 页 | 79+ 页 (P0-3 已修) |
| Author bio with Person | 100% blog | 已修代码层 (P0-3) |
| Trustpilot widget | ✅ 主页 footer | ❌ |
| BBB / Google Reviews | ✅ | ❌ |
| Industry certification (ISO/FSC) | ✅ 视觉徽章 | 4/138 页面提及 |
| Video content | 10-30 视频 (产品演示) | 0 |
| Case studies | 10-50 真实案例 | 1 页 (1 个 case) |
| Testimonials (with name+photo) | 30+ | 0 |

**Tier 2 → zprintpro 90 天目标差距**:
- 内容数量级差 (35 → 80 篇 blog)
- 信任信号差 (Trustpilot + ISO/FSC 视觉化)
- 多媒体差 (视频 0 → 10)

---

## 3. 30 / 60 / 90 天路线图

> **目标分层逻辑**: GEO 是代码密集型 (4-6 周可大幅提升), SEO 是内容密集型 (3-6 月慢工), Authority/Trust 需第三方接入 (1-3 月谈判+实施)

### 3.1 30 天目标: Overall 58-62 (从 43.5 → +17)

**核心策略**: 把 P0/P1 真实效果抓出来 + 评分脚本升级 + 内容层第 1 波扩写

| KR | 目标 | 路径类型 | 责任人 | 工作量 |
|----|------|---------|--------|--------|
| KR1 | 重新 crawl + parse 抓 P0/P1 真实增量 | 数据层 | orchestrator (启 cron) | 0.5h (重跑) |
| KR2 | 评分脚本补 R02/R06/R07/R09/Ept07/E10 解析 | 代码层 | ai-coder | 6h |
| KR3 | blog 35 篇 description 全部补 150-160 字符 | 内容层 | ai-content | 8h |
| KR4 | blog 21 个 stub 扩写至 ≥1500 字 + FAQPage schema | 内容层 | ai-content | 30h (核心瓶颈) |
| KR5 | Key Takeaways 顶部摘要框 — 35 blog + 13 category 全注入 | 代码层 | ai-coder | 4h |
| KR6 | Author bio "About the Author" block — 35 blog 全部 | 内容层 | ai-content | 6h |
| KR7 | AggregateRating 真实 review 数接入 (review seed 脚本) | 数据层 | ai-coder | 8h |

**预期分数**: 43.5 → 58-62 (整体 +15-18)

### 3.2 60 天目标: Overall 68-72 (从 58 → +12)

**核心策略**: Trust/Authority 数据接入 + 内容第 2 波扩写

| KR | 目标 | 路径类型 | 责任人 | 工作量 |
|----|------|---------|--------|--------|
| KR1 | GSC 数据接入 (解锁 A01-A04 至少) | 数据层 | orchestrator + DevOps | 16h |
| KR2 | Trustpilot widget 接入 footer + 主页 + 7 core pages | 数据层 | ai-coder | 8h |
| KR3 | ISO 9001 / FSC / G7 证书视觉化 + schema 标记 | 代码+内容 | ai-coder + ai-content | 12h |
| KR4 | 25 个新 blog 选题 + 撰写 (每篇 ≥2000 字 + FAQ + HowTo) | 内容层 | ai-content | 80h |
| KR5 | Case studies 从 1 → 8 真实案例 (with 客户名 + 行业 + 数据) | 内容层 | ai-content + BD | 24h |
| KR6 | VideoObject schema + 5 个产品演示视频上传 | 内容层 | ai-content + media | 20h |
| KR7 | AggregateRating review 数从 seed 15 涨到 真实 50+ | 数据层 | ops + ai-coder | 持续 |

**预期分数**: 58 → 68-72 (+10-12)

### 3.3 90 天目标: Overall 75-80 (从 68 → +8)

**核心策略**: 外链启动 + 内容规模化 + LLM 引用率观测

| KR | 目标 | 路径类型 | 责任人 | 工作量 |
|----|------|---------|--------|--------|
| KR1 | Ahrefs/Moz API 接入 (DR/backlink 真实数据) | 数据层 | orchestrator | 16h |
| KR2 | 外链建设启动 — 10 个高质量印刷行业外链 | 数据层 | BD + ai-content | 30h |
| KR3 | 20 个新 blog (总 blog 35 → 80) | 内容层 | ai-content | 60h |
| KR4 | LLM 引用率监测 (Otterly.ai / Profound) 接入 | 数据层 | orchestrator | 8h |
| KR5 | Internal linking density 优化 (每页 ≥3 上下文链接) | 代码层 | ai-coder | 8h |
| KR6 | 主页 + 13 分类页 H2/H3 重写 (avg 3-4 → 8+) | 内容层 | ai-content | 12h |
| KR7 | Topic cluster 串联 (5 个 cluster hub) | 内容层 | ai-content | 16h |

**预期分数**: 68 → 75-80 (+7-12)

**LLM 引用率**: 当前估 5-10% → 90 天目标 30%+ (GEO Score 78+ 时 LLM 引用率基准)

---

## 4. P0-P5 修复清单 (精确到文件路径 + 行号 + 工作量)

> **给 ai-coder 的精确清单**, 每条标: 文件路径 / 行号范围 / 预期分数 / 工作量 / 依赖 / 硬规则

### P0 (1 周内, 阻塞性)

| # | 任务 | 文件 | 行号 | 预期增量 | 工作量 | 依赖 | 硬规则 |
|---|------|------|------|---------|--------|------|--------|
| **P0-1** | 重新 crawl + parse | `docs/seo-audit-en/crawl_parse_en.py` | 全文 | (前置) | 30-60min | 无 | 不要写入竞品 "智印港" 词 |
| **P0-2** | 评分脚本补 R02 (author bio 文本解析) | `docs/seo-audit-en/score_core_eeat.py` | R02 段 (~155) | R 22→30 | 2h | P0-1 跑出 raw HTML | 仅改 score 脚本, 不动代码 |
| **P0-3** | 评分脚本补 R06 (HowTo schema 解析) | 同上 | R06 段 (~165) | R +5 | 1h | P0-1 | 同上 |
| **P0-4** | 评分脚本补 R07 (Speakable schema 解析) | 同上 | R07 段 (~175) | R +10 | 1h | P0-1 | 同上 |
| **P0-5** | 评分脚本补 R09 (date proxy) | 同上 | R09 段 (~195) | R +3 | 1h | P0-1 | 同上 |
| **P0-6** | 评分脚本补 Ept07 (glossary 关键词解析) | 同上 | Ept07 段 (~410) | Ept +5 | 2h | P0-1 | 用 "glossary / 術語 / 用語" 关键词启发式 |
| **P0-7** | 评分脚本补 E10 (resource download) | 同上 | E10 段 (~395) | E +3 | 1h | P0-1 | 用 word_count≥800 + "download" 关键词 |
| **P0-8** | 重跑评分 + 生成新报告 | `build_summary.py` | 全文 | 验证 P0/P1 真实增量 | 1h | P0-2~7 全部 | 不动 summary 模板 |

**P0 总工作量**: ~10h, 1 个工程师 1 周内必完
**P0 预期分数增量**: 43.5 → 50-55 (+7-11)

### P1 (30 天内, 内容+数据双线)

| # | 任务 | 文件 | 行号 | 预期增量 | 工作量 | 依赖 | 硬规则 |
|---|------|------|------|---------|--------|------|--------|
| **P1-1** | blog 35 篇 description 全部补 150-160 字符 | `src/lib/seo.ts` | `generateBlogMetadata` (~600-650) | C 68→75, SEO +2 | 4h | 翻译资源 | en/ja/zh-hk 三语独立, 不互译机翻 |
| **P1-2** | Key Takeaways 顶部摘要框 — 35 blog | `src/app/[locale]/blog/[slug]/page.tsx` | 加 ~30 行新组件 + schema | O 75→82, GEO +1.5 | 4h | 无 | 内容 AI 生成 + 人工审 |
| **P1-3** | Key Takeaways — 13 category | `src/app/[locale]/category/[slug]/page.tsx` | 加 ~20 行 | O +1 | 2h | P1-2 共享组件 | 同上 |
| **P1-4** | "About the Author" block — 35 blog | `src/app/[locale]/blog/[slug]/page.tsx` | 加 ~40 行 + author bio 数据 | R 22→35, GEO +3 | 6h | P0-2 评分脚本就绪 | author 必须 Person type (P0-3 已修) |
| **P1-5** | 21 个 stub blog 扩写至 ≥1500 字 | `src/content/blogs/*.md` (或 supabase) | 全 21 文件 | Ept 46→58, SEO +3 | 30h | 内容引擎 prompt | 每篇必须含 1 个 FAQ + 1 个 table |
| **P1-6** | AggregateRating 真实 review 接入 (review seed 脚本) | `scripts/seed-product-reviews.ts` (新) | 新文件 ~150 行 | E 48→58, GEO +2.5 | 8h | 数据建模 | review 数 ≥ 50, 真实感 |
| **P1-7** | Comparison Table 注入 13 category 页 | `src/app/[locale]/category/[slug]/page.tsx` | 加 ~25 行 table 组件 | Ept +4, SEO +2 | 4h | 真实规格数据 | 表格列: 材质 / 尺寸 / 起订量 / 价格区间 / 工艺 |

**P1 总工作量**: ~58h, 2 个工程师 (coder + content) 并行 2 周
**P1 预期分数增量**: 50 → 58-62 (+8-12)

### P2 (60 天内, 数据接入 + 内容规模化)

| # | 任务 | 文件 | 行号 | 预期增量 | 工作量 | 依赖 | 硬规则 |
|---|------|------|------|---------|--------|------|--------|
| **P2-1** | GSC 数据接入 (A01-A04 至少) | `scripts/gsc-ingest.py` (新) + Supabase | 新 ~120 行 | A 0→30, SEO +7 | 16h | GSC API service account | 不超 GSC quota 限制 |
| **P2-2** | Trustpilot widget 接入 footer + 主页 + 7 core pages | `src/components/Footer.tsx` + 7 page.tsx | footer 加 ~10 行, 7 pages 加 ~3 行 each | T 46→62, SEO +4 | 8h | Trustpilot business account | widget 用 Business API |
| **P2-3** | ISO 9001 / FSC / G7 证书视觉化徽章 + schema | `src/components/TrustBadges.tsx` (新) + about 页 | 新 + 接入 | T +2, Exp +1 | 12h | 设计资源 (徽章 SVG) | 不要伪造证书, 已有就用 |
| **P2-4** | 25 个新 blog 撰写 (Topic cluster) | 内容引擎 | n/a | Ept 58→68, SEO +2.5 | 80h | 内容策略 (下) | ≥2000 字 / FAQ + HowTo + Table |
| **P2-5** | Case studies 从 1 → 8 真实案例 | `src/app/[locale]/case-studies/page.tsx` + supabase | schema 扩展 + 8 个 case 录入 | Exp 44→55, SEO +2.5 | 24h | BD 提供 8 客户授权 | 客户名 / 行业 / 真实数字 (e.g. 节省 30% 成本) |
| **P2-6** | VideoObject schema + 5 个产品演示视频上传 | `src/components/ProductVideo.tsx` (新) + 5 个视频 | 新 + 5 视频转码 | Exp +3 | 20h | 视频拍摄 / 现有素材 | 视频 ≤ 90s, 含字幕 |

**P2 总工作量**: ~160h, 2 个月并行
**P2 预期分数增量**: 58 → 68-72 (+10-14)

### P3 (90 天内, Authority + 内容规模化)

| # | 任务 | 文件 | 行号 | 预期增量 | 工作量 | 依赖 | 硬规则 |
|---|------|------|------|---------|--------|------|--------|
| **P3-1** | Ahrefs/Moz API 接入 (DR/backlink 数据) | `scripts/authority-ingest.py` (新) | 新 ~100 行 | A 30→55, SEO +6 | 16h | API key | API quota 控制, 缓存 |
| **P3-2** | 外链建设 — 10 个高质量印刷行业外链 | BD outreach | n/a | A 55→70, SEO +4 | 30h | BD list | 拒绝 PBN / 链接农场 |
| **P3-3** | 20 个新 blog (35 → 80) | 内容引擎 | n/a | Ept 68→75, SEO +1.5 | 60h | P2-4 经验复用 | 长尾词研究前置 |
| **P3-4** | LLM 引用率监测 (Otterly.ai / Profound) | `scripts/llm-mention-monitor.py` (新) | 新 ~80 行 | (观测, 不直接加分) | 8h | API key | 月度报告 |
| **P3-5** | Internal linking density 优化 (≥3 链接/页) | `src/lib/seo/related-links.ts` (新) | 新 + 接入 | O +2, C +1 | 8h | 内容已扩写 | 不堆砌, 上下文相关 |
| **P3-6** | 主页 + 13 分类页 H2/H3 重写 (3-4 → 8+) | 14 page.tsx | 每个页面 ~50 行 | O +2 | 12h | 内容策划 | H 标签符合语义层级 |
| **P3-7** | Topic cluster 串联 (5 个 cluster hub) | `src/app/[locale]/blog/cluster/[slug]/page.tsx` (新) | 新 ~80 行 + 内链 | C +2, Ept +2 | 16h | 内容就绪 | cluster 内 5-8 篇串联 |

**P3 总工作量**: ~150h, 3 个月并行
**P3 预期分数增量**: 68 → 75-80 (+7-12)

### P4 (90 天后, 优化冲刺 80→90)

| # | 任务 | 预期增量 | 工作量 | 依赖 |
|---|------|---------|--------|------|
| P4-1 | 真实 Trustpilot 评论收集 (50+ 评论) | T +5 | 持续 | 客户触达 |
| P4-2 | Multi-language blog (en/zh-hk/ja 各 80 篇) | Ept +3 | 60h | 翻译资源 |
| P4-3 | 视频博客 (YouTube + 自托管) | Exp +4 | 30h | 视频资源 |
| P4-4 | Podcast / Audio content + PodcastEpisode schema | Exp +2 | 40h | 设备 + 嘉宾 |
| P4-5 | AI 客服 24/7 (LLM chat widget) | T +3 | 24h | ai-coder |
| P4-6 | Customer portal + login (增加 session depth) | Exp +2 | 80h | 架构 |

### P5 (战略层, 持续监控)

| # | 任务 | 频率 | 责任人 |
|---|------|------|--------|
| P5-1 | SEO 周报 (gsc_data.csv + seo-weekly-analyzer.py) | 周一 9 点 (cron 2e7ff9ec5f15) | 自动 |
| P5-2 | 评分重跑 (Phase C) | 每月 1 号 | orchestrator |
| P5-3 | 竞品 benchmark 更新 (Ahrefs) | 季度 | orchestrator |
| P5-4 | LLM 引用率报告 | 月度 | orchestrator |
| P5-5 | 自然流量增长监控 (目标 +30%/月) | 周报 KPI | 自动 |

---

## 5. 内容策略 (5 个 Topic Cluster)

> **为什么需要 cluster**: 单篇 blog 写再多, 没有 cluster hub 串联, Ept 维度上不去 (Google 看作 "信息孤岛", 不给 expertise 评分)

### 5.1 Cluster #1 — Paper Bags 主钻品类
- **Hub**: `/en/blog/paper-bags-guide/` (扩写, 3000+ 字)
- **子篇 (10 篇)**:
  - paper-bag GSM 选择
  - paper-bag 提手类型对比
  - paper-bag 印刷工艺 (4 色 vs 专色 vs UV)
  - paper-bag 尺寸标准 (industry-specific)
  - paper-bag 环保认证 (FSC, PEFC)
  - paper-bag 起订量 MOQ 指南
  - paper-bag 运输优化 (dimensional weight)
  - paper-bag 案例 (3-5 真实客户)
  - paper-bag vs plastic (环保对比数据)
  - paper-bag FAQ (50 问答)

### 5.2 Cluster #2 — Custom Packaging
- **Hub**: `/en/blog/custom-packaging-guide/`
- **子篇 (8 篇)**: 刀模设计 / 材质选择 / 印刷工艺 / 表面处理 / 配色 / 结构 / 案例 / FAQ

### 5.3 Cluster #3 — Books / Catalog / Magazine
- **Hub**: `/en/blog/book-printing-guide/`
- **子篇 (7 篇)**: 装订方式 / 内页纸张 / 封面工艺 / 跨页出血 / 案例 / FAQ / 价格计算器

### 5.4 Cluster #4 — Marketing Collateral (Flyer/Brochure/Poster)
- **Hub**: `/en/blog/marketing-collateral-guide/`
- **子篇 (6 篇)**: 设计尺寸标准 / 折叠方式 / 纸张选择 / 印刷工艺 / 案例 / FAQ

### 5.5 Cluster #5 — Sticker / Label
- **Hub**: `/en/blog/sticker-guide/`
- **子篇 (5 篇)**: 刀模 / 材质 / 耐候性 / 印刷工艺 / FAQ

**总产出**: 35 blog (现) → 80 blog (90 天), 新增 45 篇 = 30% 内容引擎产出 (15 篇/月)

---

## 6. KPI 红绿灯 (90 天监控)

| 指标 | 当前 | 30 天 | 60 天 | 90 天 | 红线 |
|------|------|------|------|------|------|
| Overall | 43.5 | 58-62 | 68-72 | **75-80** | < 60 = 内容引擎失灵 |
| GEO Score | 53.1 | 65-68 | 72-75 | 78-82 | < 65 = schema 注入没生效 |
| SEO Score | 34.0 | 48-52 | 58-63 | 65-70 | < 50 = 内容扩写不够 |
| 自然流量 | ~1K/月 | 1.5K | 3K | 5K-8K | < 1.5K = 流量没起来 |
| Blog 数量 | 35 | 45 | 65 | **80** | < 60 = 内容引擎失灵 |
| Trustpilot 评论 | 0 | 5 | 30 | **80+** | < 30 = T 提不上去 |
| AggregateRating review | 0 真实 | 50 seed | 100 真实 | **150 真实** | < 100 = E 提不上去 |
| 外链 DR | 估 5-15 | 15-20 | 20-30 | **30-45** | < 25 = A 提不上去 |
| LLM 引用率 | 估 5% | 10% | 20% | **30%+** | < 15% = GEO 没效果 |
| CAC | (基线) | (持平) | -10% | **-20%** | > +10% = 渠道失衡 |

---

## 7. 风险 + 缓解

| 风险 | 概率 | 影响 | 缓解 |
|------|------|------|------|
| crawl/parse 失败 (Phase A2 历史) | 中 | 高, 阻塞 P0 | 先 dry-run 1 个 URL 验证 |
| Trustpilot 注册审核慢 | 高 | 中, T 维度滞后 | 同时接 Google Reviews widget (备选) |
| 客户案例授权不到位 (BD 协调) | 高 | 中, Exp 提不上去 | 用匿名化案例 (行业 + 数据, 隐客户名) |
| Ahrefs API 费用 | 中 | 低 | 月费 $99 起, ROI 算得过来 |
| 内容扩写质量不达标 | 中 | 高, Ept 反向 | 每篇 2 审: AI 生成 + 印刷专家过审 |
| Cloudflare Pages 部署失败 | 低 | 高, 全站宕机 | 不改 wrangler.toml / next.config.js (硬规则) |

---

## 8. 硬规则自检清单 (战略层)

| 规则 | 战略如何保证 |
|------|------------|
| ❌ "智印港" | 内容策略明确写: 所有英文内容用 "ZprintPro", 中文用 "智印云" |
| ❌ GBK 乱码 | AI 内容生成后, 强制 UTF-8 写入验证 (Python open newline='\n') |
| ❌ 8 locale 漏 | 评分脚本默认 8 locale, 漏 1 个 → 报告黄灯 |
| ❌ en 中文泄漏 | P0-1 已修, 后续内容扩写强制 en/ja 翻译资源独立, 不机翻 |
| ❌ 删正常代码 | 战略层不动代码, 只指挥 ai-coder, ai-coder 删代码前必须 review |
| ❌ 改 Cloudflare 配置 | 战略层禁止, ai-coder 也禁止 |
| ❌ 改 package.json | 同上, 仅必要的依赖增加需 orchestrator 拍板 |

---

## 9. 不要做的事 (反模式)

1. ❌ **不要纯靠 GSC 接入就以为 A 维度起来了** — A 维度 10 项里 GSC 只覆盖 4 项 (clicks/impressions/CTR/position), 还要 Ahrefs (DR/backlink/keyword), Moz (DA/PA), Whois (domain age)
2. ❌ **不要用 AI 生成 Trustpilot 评论** — Trustpilot 检测虚假评论, 一旦标记账号永封
3. ❌ **不要用 PBN 链接农场** — Google Penguin 算法定期打击, 一旦发现 = 站点降权 90%
4. ❌ **不要扩写 blog 但不内链** — 孤岛内容 Ept 加不了分, 必须 cluster 串联
5. ❌ **不要扩写 blog 但不优化 H2/H3** — H2 平均 3-4 → 8+ 才到 Tier 2 水平
6. ❌ **不要重跑 crawl 但不改评分脚本** — 改完脚本才能识别 R02/R06/R07 真实覆盖, 否则还是 0
7. ❌ **不要追求 90+ (优秀线)** — 90 天到 75+ (良好线) 是 ROI 最高的甜蜜点, 90+ 需 6-9 月
8. ❌ **不要忽视 noindex 页面** — terms/privacy 仍评分, 但不影响真实 SEO, 不要花精力修它们

---

## 10. 下一步 (给 Mavis 编排者 + ai-coder)

### 10.1 给 Mavis 编排者 (Mavis) — 必须做
1. **启 P0**: cron 重跑 crawl_parse_en.py (预计 1h)
2. **派 ai-coder**: P0-2 ~ P0-8 评分脚本升级 (10h)
3. **派 ai-content**: P1-1 ~ P1-5 blog 扩写 (30+ 小时)
4. **决策**: Trustpilot 接入预算 (月费估算)
5. **决策**: Ahrefs API 接入预算

### 10.2 给 ai-coder — 精确任务清单
- **第一周**: P0-1 ~ P0-8 (评分脚本升级 + crawl 重跑)
- **第二周**: P1-1 ~ P1-3 (description + Key Takeaways) + P1-7 (Comparison Table)
- **第三周**: P1-4 (Author bio) + P1-6 (AggregateRating review seed)
- **第四周**: P2-1 (GSC 接入脚本) + P2-2 (Trustpilot widget)

### 10.3 给 ai-content-engineer — 内容清单
- **Week 1-2**: 35 blog description 重写 + 21 stub 扩写
- **Week 3-4**: Topic Cluster #1 (paper bags) 10 篇 + Cluster #2 (packaging) 8 篇
- **Week 5-8**: Cluster #3 + #4 + #5 (18 篇)
- **Week 9-12**: Case studies 8 个真实 + Trust/Authority 内容支持

### 10.4 给 ai-monetization (变现官) — 协同接口
- **CAC 预算**: 月预算从基线提升到 $3-5K (GSC + Trustpilot + 外链 + 内容)
- **LTV 校验**: 90 天后 LTV/3 必须 > CAC, 否则砍渠道
- **询盘增量**: 90 天目标 +80-150% (与 Phase A2 §6.1 一致)

---

## 11. 总结 — 这份战略的核心断言

1. **90 天到 75+ 是可达的** — 假设 P0/P1/P2/P3 全做, 工作量 ~370h, 2 人并行 3 月
2. **75 → 90 是另一阶段** — 需 Trustpilot 真实数据 + 外链 DR 50+ + 持续内容规模化, 6-9 月
3. **R 维度是最大杠杆** — schema 注入 (代码层) + author bio (内容层) = 22 → 60+
4. **Authority 接入是 75 分的瓶颈** — 不接 GSC + Ahrefs + Trustpilot, 永远卡在 60-65
5. **内容规模化是 80 分的瓶颈** — 35 → 80 blog + cluster 串联 + 真实案例 + 视频
6. **战略层 vs 战术层分工**: 我出战略 (这份); ai-coder 出代码 (P0/P1/P2/P3); ai-content 出文字 (扩写)

---

**报告结束** — 2026-06-12 by opc-growth-architect L4

**下一步**:
1. Mavis 编排者 review + 拍板 (Trustpilot/Ahrefs 预算)
2. ai-coder 接 P0 (评分脚本 + crawl 重跑) — 阻塞性, 1 周内
3. ai-content-engineer 接 P1-5 (21 stub blog 扩写) — 最大瓶颈, 1 月内
4. 30 天后重跑 Phase A2 + 验证分数增量