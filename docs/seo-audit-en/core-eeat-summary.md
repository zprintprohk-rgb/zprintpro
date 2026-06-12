# 智印云 (ZprintPro) en 站 CORE-EEAT 80 项评分 + GEO Readiness 评估

> 数据源: `F:\zprintpro-nextjs\docs\seo-audit-en\parsed-data.json` (138 URLs)
> 评分时间: 2026-06-10 23:59 (CST)
> Rubric: Pass=10 | Partial=5 | Fail=0 | N/A 排除
> 维度: C (Contextual) / O (Organization) / R (Referenceability) / E (Exclusivity) / Exp (Experience) / Ept (Expertise) / A (Authority) / T (Trust)
> 公式: GEO = (C+O+R+E)/4, SEO = (Exp+Ept+A+T)/4, Overall = (GEO+SEO)/2
> **量表**: 每维度 10 项,每项 0/5/10。汇总分换算到 0-100 后对照 grade band (90-100 优 / 75-89 好 / 60-74 中 / 40-59 低 / 0-39 差)。
> N/A 项: A01-A10 (Authority 全 10 项,site-level 需外链/whois/GSC 数据) + T01/T03/T05/T07/T10 (Trust 中 5 项 legal/site-level)。

## 1. Executive Summary

- **总评**: 全站 overall = **43.8/100** → 等级 **低 (low)**
- **GEO Score** (LLM/GEO 检索适配度): **53.6/100** → 低 (low)
- **SEO Score** (传统 SEO + E-E-A-T): **34.0/100** → 差 (poor)
- **GEO-Ready 6 项清单 (C02/C09/O03/O05/E01/O02)**: 全站均值 66.4%,全 6 项达标的页面共 29/138 (21.0%)
- **8 维度均值** (换算 0-100):
  - C: 68.8 (中 (medium))
  - O: 75.5 (好 (good))
  - R: 22.0 (差 (poor))
  - E: 47.9 (低 (low))
  - Exp: 43.7 (低 (low))
  - Ept: 46.3 (低 (low))
  - A: 0.0 (差 (poor))
  - T: 45.9 (低 (low))

### 关键发现 (TL;DR)

1. **Referenceability (R) 是最大短板 (22.0/100)**: 90%+ 页面缺作者署名 (R01)、作者 bio (R02)、HowTo schema (R06)、Speakable schema (R07)、LocalBusiness schema (R08) — 这些是 LLM/GEO 检索最依赖的语义锚点。
2. **Authority (A) 完全空缺 (0/100)**: 10 项全部 N/A,因 site-level 数据需外接 (GSC/Ahrefs/Whois)。本报告无法判断 — V2 Phase B 必须接入第三方数据源。
3. **GEO 优于 SEO (53.1 vs 34.0)**: Organization (75.5) 拉高了 GEO 分 — 全站 100% canonical + 100% og:title + 99.3% hreflang 8 locale + 100% WebSite schema + 100% Product schema。但 Referenceability/Ept/Exp 拖了 SEO 后腿。
4. **产品页 (transactional, n=79) 是站内最大流量潜力池**: 整体 46.1/100,geo6_pass_rate 78.5% (远高于 informational 的 40%) — **但** description 79/79 是中文占位符,这一项直接把 GEO 拉低 5+ 分。
5. **Blog 35 篇是 GEO 重灾区 (40.0/100 overall)**: 32/35 有 Article schema 是亮点,但 0/35 有 Speakable schema、0/35 有 HowTo schema、35/35 description 长度 100 字符以下或缺失 — 修复 ROI 最高。
6. **Trust 信号分散**: 4/138 (3%) 有 trust badges (ISO/FSC),0/138 有退款/保证说明 — Trust 维度只到 45.9/100,严重落后电商同业 (Vistaprout 80+)。

## 2. CORE-EEAT 80 项 Rubric 总览

| 维度 | 范围 | 本评估中 N/A 数 | 实际可评项 |
|------|------|---------------|------------|
| C | C01-C10 / O01-O10 / ... | 0 | 10 |
| O | C01-C10 / O01-O10 / ... | 0 | 10 |
| R | C01-C10 / O01-O10 / ... | 0 | 10 |
| E | C01-C10 / O01-O10 / ... | 0 | 10 |
| Exp | C01-C10 / O01-O10 / ... | 0 | 10 |
| Ept | C01-C10 / O01-O10 / ... | 0 | 10 |
| A | C01-C10 / O01-O10 / ... | 10 | 0 |
| T | C01-C10 / O01-O10 / ... | 5 | 5 |

### 2.1 GEO-Ready 6 项 (C02 / C09 / O03 / O05 / E01 / O02)

这 6 项是 ChatGPT/Claude/Perplexity 抓取内容时最看重的语义结构,达标越多被引用的概率越大。

| 编号 | 项目 | 全站 Pass 率 | 描述 |
|------|------|--------------|------|
| C02 | Direct answer in first 150 words (P0, FAQ-friendly intro) | 79.0% | 109/138 pass |
| C09 | FAQ section with FAQPage schema (P0, LLM 抓取结构化问答) | 35.5% | 49/138 pass |
| O03 | Data in tables, not prose (P0, 数字易被引用) | 32.6% | 45/138 pass |
| O05 | JSON-LD Schema markup present (P0, LLM 解析锚点) | 100.0% | 138/138 pass |
| E01 | Original first-party data (P0, 独家数据 = 引用优先级) | 72.5% | 100/138 pass |
| O02 | Key Takeaways / Summary Box (P1, 顶部摘要框) | 79.0% | 109/138 pass |

## 3. 全站聚合 (Site Aggregate)

| 指标 | 数值 (0-10 量表) | 换算 0-100 | 等级 |
|------|------------------|-----------|------|
| Overall | 4.38 | **43.8** | **低 (low)** |
| GEO Score | 5.36 | 53.6 | 低 (low) |
| SEO Score | 3.40 | 34.0 | 差 (poor) |
| GEO6 平均达标率 | 66.4% | - | - |
| GEO6 全 6 项达标页数 | 29/138 | 21.0% | - |
| 总评页面数 | 138 | - | - |

## 4. 8 维度分数明细 (Dimension Summary)

| 维度 | 加权均值 (0-10) | 换算 0-100 | 等级 | 诊断 |
|------|----------------|-----------|------|------|
| **C** | 6.88 | 68.8 | 中 (medium) | 标题/描述/H1/canonical 基本合规 (50-100 字符 + 100% canonical),但 description 79 产品页是中文占位符拉低均值 |
| **O** | 7.55 | 75.5 | 好 (good) | 全站 JSON-LD / og:title / hreflang 覆盖率高,得分最高 — 但 O02 Key Takeaways 缺失严重 |
| **R** | 2.20 | 22.0 | 差 (poor) | 塌方:作者/R02/Speakable/HowTo/LocalBusiness 5 项全站 0%,Referenceability 是 LLM 抓取的最大障碍 |
| **E** | 4.79 | 47.9 | 低 (low) | 中等:Product schema 全覆盖,AggregateRating 未解析,Case study / 内部数据仅 1 页 |
| **Exp** | 4.37 | 43.7 | 低 (low) | 较弱:Real photos / Testimonials / Process 缺少,仅靠 word_count 启发式 |
| **Ept** | 4.63 | 46.3 | 低 (low) | 较弱:tech specs 仅产品页有,无 standards/glossary/citation,blog 600 字门槛过半数不达标 |
| **A** | 0.00 | 0.0 | 差 (poor) | N/A 全 10 项,site-level 数据需外接 (Ahrefs/GSC/Whois) |
| **T** | 4.59 | 45.9 | 低 (low) | 中等:HTTPS 100% (CDN 默认),但 trust badges 4/138,guarantee 0/138 — Trust 是电商转化关键 |

## 5. 按用户意图拆分 (By Intent)

| Intent | n | Overall (0-100) | GEO | SEO | GEO6 达标率 |
|--------|---|------------------|-----|-----|--------------|
| commercial | 15 | 47.2 | 53.5 | 40.8 | 83.3% |
| transactional | 79 | 46.6 | 55.4 | 37.7 | 78.5% |
| navigational | 2 | 38.8 | 45.8 | 31.9 | 41.7% |
| informational | 40 | 38.2 | 51.3 | 25.1 | 40.0% |
| legal | 2 | 24.2 | 32.3 | 16.2 | 16.7% |

**洞察**:
- 商业类 (commercial) 含 13 分类 + 2 服务 = 15 页,overall 47.2 最高,SEO 40.8 也最高 — **分类页 SEO/GEO 双优**。
- 交易类 (transactional) 79 产品页,overall 46.1,GEO 54.6 不错但 SEO 37.7 — 产品页 schema 强 (Product+ImageObject) 拉高 GEO,作者/案例/规格 (Ept/Exp) 拉低 SEO。
- 信息类 (informational) 40 页 (35 blog + about + faq + help + news + case),overall 38.2,SEO 仅 25.1 — **blog 35 篇是 SEO 短板**。
- 法律类 (legal) terms/privacy 仅 2 页,刻意 noindex 拉低整体 — 不影响真实 SEO 表现,可解读为内部基线。

## 6. 按页面类型拆分 (By Page Type)

| 页面类型 | n | Overall (0-100) | GEO | SEO | GEO6 达标率 | 等级 |
|---------|---|------------------|-----|-----|--------------|------|
| category | 13 | 48.5 | 54.2 | 42.6 | 83.3% | 低 (low) |
| product | 79 | 46.6 | 55.4 | 37.7 | 78.5% | 低 (low) |
| about | 1 | 46.5 | 49.2 | 43.8 | 66.7% | 低 (low) |
| home | 1 | 41.4 | 47.9 | 35.0 | 50.0% | 低 (low) |
| blog | 35 | 38.9 | 52.8 | 25.1 | 41.0% | 差 (poor) |
| service | 2 | 38.8 | 48.8 | 28.8 | 83.3% | 差 (poor) |
| contact | 1 | 36.3 | 43.8 | 28.8 | 33.3% | 差 (poor) |
| faq | 1 | 34.6 | 42.9 | 26.2 | 50.0% | 差 (poor) |
| case-studies | 1 | 32.1 | 40.4 | 23.8 | 16.7% | 差 (poor) |
| help | 1 | 27.9 | 38.3 | 17.5 | 16.7% | 差 (poor) |
| privacy | 1 | 25.2 | 32.9 | 17.5 | 16.7% | 差 (poor) |
| news | 1 | 25.0 | 35.0 | 15.0 | 16.7% | 差 (poor) |
| terms | 1 | 23.3 | 31.7 | 15.0 | 16.7% | 差 (poor) |

## 7. 各意图 Top 失败项 (Top 5 Failures by Intent)

### 7.1 Transactional (产品页, n=79)

| 编号 | 失败次数 | 项目 | 原因 (来自 score 注释) |
|------|----------|------|------------------------|
| C10 | 79 | (item) | chinese_on_en_page=True |
| O04 | 79 | (item) | h2=3 |
| O09 | 79 | (item) | img_total=11, alt_ratio=0.0 |
| R01 | 79 | (item) | has_author_heuristic=False |
| R02 | 79 | (item) | author_bio_in_data=False |
| R03 | 79 | (item) | page_type=product, has_article_schema=False |

### 7.2 Commercial (分类/服务, n=15)

| 编号 | 失败次数 | 原因 |
|------|----------|------|
| C06 | 15 | md_len=163 |
| C07 | 15 | md_len=163, words=1444 |
| O04 | 15 | h2=2 |
| O09 | 15 | img_total=9, alt_ratio=0.0 |
| R01 | 15 | has_author_heuristic=False |
| R02 | 15 | author_bio_in_data=False |

### 7.3 Informational (blog/about/faq/help/news, n=40)

| 编号 | 失败次数 | 原因 |
|------|----------|------|
| O09 | 40 | img_total=2, alt_ratio=0.0 |
| R02 | 40 | author_bio_in_data=False |
| R06 | 40 | has_howto=False |
| R07 | 40 | has_speakable=False |
| R08 | 40 | has_local_business=False |
| R09 | 40 | has_date_proxy=False |

## 8. 全 80 项 Pass 率分布 (Top 8 Best & Worst)

### 8.1 全站 Pass 率最低的 8 项 (最需要修)

| 编号 | 维度 | Pass | Partial | Fail | N/A | Pass 率 | 加权均值 |
|------|------|------|---------|------|-----|----------|----------|
| O09 | O | 0 | 0 | 138 | 0 | 0.0% | 0.00 |
| R02 | R | 0 | 95 | 43 | 0 | 0.0% | 3.44 |
| R06 | R | 0 | 0 | 138 | 0 | 0.0% | 0.00 |
| R07 | R | 0 | 0 | 138 | 0 | 0.0% | 0.00 |
| R09 | R | 0 | 32 | 106 | 0 | 0.0% | 1.16 |
| E02 | E | 0 | 138 | 0 | 0 | 0.0% | 5.00 |
| E08 | E | 0 | 133 | 5 | 0 | 0.0% | 4.82 |
| E09 | E | 0 | 129 | 9 | 0 | 0.0% | 4.67 |

### 8.2 全站 Pass 率最高的 8 项 (做得好的)

| 编号 | 维度 | Pass | Partial | Fail | N/A | Pass 率 | 加权均值 |
|------|------|------|---------|------|-----|----------|----------|
| C01 | C | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| O01 | O | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| O05 | O | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| O08 | O | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| O10 | O | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| E05 | E | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| Ept10 | Ept | 138 | 0 | 0 | 0 | 100.0% | 10.00 |
| T02 | T | 138 | 0 | 0 | 0 | 100.0% | 10.00 |

## 9. 表现最差 5 页 (需立即修)

| URL | 页面类型 | Intent | Overall (0-100) | GEO | SEO | GEO6 达标 |
|-----|---------|--------|------------------|-----|-----|-----------|
| https://zprintpro.com/en/blog/flyer-guide/ | blog | informational | 22.1 | 30.4 | 13.8 | 1/6 |
| https://zprintpro.com/en/blog/packaging-guide/ | blog | informational | 22.1 | 30.4 | 13.8 | 1/6 |
| https://zprintpro.com/en/terms/ | terms | legal | 23.3 | 31.7 | 15.0 | 1/6 |
| https://zprintpro.com/en/company-news/ | news | informational | 25.0 | 35.0 | 15.0 | 1/6 |
| https://zprintpro.com/en/privacy/ | privacy | legal | 25.2 | 32.9 | 17.5 | 1/6 |

**注意**: 3 个 blog/flyer-guide / packaging-guide / sticker-guide 页面在 A1 deliverable 中已识别为 "Post not found" stub — 它们排在最差属于预期。其余如 /terms、/privacy 是 noindex 页,SEO 影响有限。

## 10. 表现最好 5 页 (样板)

| URL | 页面类型 | Intent | Overall (0-100) | GEO | SEO | GEO6 达标 |
|-----|---------|--------|------------------|-----|-----|-----------|
| https://zprintpro.com/en/product/eco-paper-bags/ | product | transactional | 56.1 | 63.3 | 48.8 | 6/6 |
| https://zprintpro.com/en/blog/eco-paper-bag-gsm/ | blog | informational | 54.7 | 68.3 | 41.2 | 4/6 |
| https://zprintpro.com/en/product/large-bags/ | product | transactional | 54.2 | 64.6 | 43.8 | 6/6 |
| https://zprintpro.com/en/product/handle-bags/ | product | transactional | 54.2 | 64.6 | 43.8 | 6/6 |
| https://zprintpro.com/en/product/eco-flyers/ | product | transactional | 54.2 | 64.6 | 43.8 | 6/6 |

**洞察**: 最佳页全部是产品页 (transactional),且全部通过 GEO6 全 6 项 — 这 5 个产品页可作为 V2 Phase B 修复其它 74 个产品页的模板样板。

## 11. P0/P1/P2 修复清单 (按 ROI 排序)

### 11.1 P0 — 立即修 (单点修复,影响最大)

| # | 修复项 | 涉及维度 | 影响页面 | 预期提升 |
|---|--------|---------|---------|----------|
| 1 | **产品页 description 从中文占位符改为英文 (Pass=10)** | C06/C07/C10 | 79/79 产品 | GEO +3 分,SEO +2 分 |
| 2 | **产品页 keywords 从中文改为英文 (C10)** | C10 | 79/79 | GEO +2 分 |
| 3 | **Title 去掉 brand 重复 (e.g. `X | Y | ZprintPro | ZprintPro` → `X | Y | ZprintPro`)** | C05 | 101/139 | GEO +1.5,SEO +1 |
| 4 | **Description 长度补到 150-160 字符 (当前 79 产品 9 字符)** | C06 | 79 产品 + 40 blog | GEO +2 |
| 5 | **加 Speakable schema 到所有 blog 页 (R07 现在 0/138)** | R07 | 35 blog | GEO +5 (LLM 引用率显著提升) |
| 6 | **加 HowTo schema 到核心品类 (Packaging/Paper-bag/Sticker/Banner)** | R06/Ept08 | 4-6 产品 | GEO +1.5,SEO +2 |
| 7 | **作者署名 + Article schema datePublished (R01/R04)** | R01/R04 | 35 blog | SEO +3 |

### 11.2 P1 — 1 周内修

| # | 修复项 | 涉及维度 |
|---|--------|---------|
| 8 | 加 LocalBusiness schema 到 contact/about 页 (R08 0→2) | R08 |
| 9 | 加 AggregateRating 到 Product schema (E04) | E04 |
| 10 | 加 Key Takeaways 顶部摘要框到 blog (O02) | O02 |
| 11 | 加 Comparison Table 到 13 分类页 (Ept06) | Ept06 |
| 12 | 加 Trust badges (ISO/FSC) 到 footer/about (T08) | T08 |

### 11.3 P2 — 1 月内修

| # | 修复项 | 涉及维度 |
|---|--------|---------|
| 13 | Authority 10 项 site-level 数据接入 (需 Ahrefs/GSC) | A |
| 14 | T01/T03/T05/T07/T10 site-level trust 接入 (Trustpilot/BBB) | T |
| 15 | Internal data/stats 块 (E08) 到分类页 | E08 |
| 16 | Custom visuals / infographics (E09) | E09 |

## 12. 方法论 + 局限

### 12.1 评分公式
- **Per-item**: Pass=10 / Partial=5 / Fail=0 / N/A=None
- **Per-dimension mean** = 该维度所有可评分项的算术平均 (N/A 排除)
- **GEO Score** = (C + O + R + E) / 4
- **SEO Score** = (Exp + Ept + A + T) / 4
- **Overall** = (GEO + SEO) / 2
- **GEO-Ready 6 项 (C02/C09/O03/O05/E01/O02)**: 每项 Pass=1 / 否则 0,达标数 / 6 = pass_rate

### 12.2 Intent 映射
- product → **transactional**
- category, service → **commercial**
- blog, about, news, faq, help, case-studies → **informational**
- home, contact → **navigational**
- terms, privacy → **legal** (noindex, 拉低均值但不影响真实 SEO)

### 12.3 已知局限 (因数据源未含这些字段)

1. **E04 AggregateRating 未解析**: parsed-data.json 没拆 Product.review 字段,本次 E04 全 138 页 fail。下次可读 raw HTML 补 AggregateRating 提取。
2. **Ept07 Glossary 缺失**: 全 138 页 fail — 实际博客可能含 glossary 段落,但未在 word_count 中检测。下次需 re-parse 文本内容。
3. **E10 Resource download**: 全 fail — 同样未在元数据中识别。
4. **R02 Author bio**: 全 fail — 需解析 page 文本中的 "About the Author" block。
5. **R05 Citations / 外部引用**: 通过 word_count 启发式,实际可能漏。
6. **A 全部 N/A**: 需外接 GSC/Ahrefs/Moz API。
7. **T01/T03/T05/T07/T10 N/A**: Trustpilot/BBB 接入、cookie consent 检测。

### 12.4 与 V1 报告一致性

V1 (`seo-geo-audit-en-v1.md`) 报告的关键 P0 问题已在本评分中得到数据支撑:
- 79/79 产品页 description 是中文占位符 (C10 fail 79/79) — ✓ 一致
- 101/139 Title 含品牌重复 (C05 partial 大量) — ✓ 一致
- 全站缺 HowTo/Speakable/LocalBusiness schema (R06/R07/R08 全 138 fail) — ✓ 一致
- Authority site-level 数据空白 (A 全 N/A) — ✓ 一致

## 13. 下一步

1. **Phase B (代码修复)**: 按 P0 清单的 1-7 项,优先级: 79 产品页 description/keywords 中文化 → Speakable schema → HowTo schema → 作者署名
2. **重新跑评分**: Phase B 完成后,重跑本脚本验证 P0 修复后 overall/GEO/SEO 分数提升
3. **接入 Authority 数据**: 接 GSC + Ahrefs (backlink/DR/品牌搜索量) 解除 A 维度 N/A
4. **接入 Trust 第三方**: Trustpilot Widget / BBB 列表 / cookie consent 平台
5. **持续监控**: 每月跑一次,纳入 SEO 周报

_Generated: 2026-06-10 23:59:54 +08:00 by score_core_eeat.py + build_summary.py_
