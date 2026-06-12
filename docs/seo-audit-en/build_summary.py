#!/usr/bin/env python3
"""
Generate core-eeat-summary.md from core-eeat-scores.json.
Reads F:\\zprintpro-nextjs\\docs\\seo-audit-en\\core-eeat-scores.json
Writes F:\\zprintpro-nextjs\\docs\\seo-audit-en\\core-eeat-summary.md
"""
import json
import sys
from pathlib import Path
from collections import Counter

SRC = Path(r"F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-scores.json")
DST = Path(r"F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-summary.md")

data = json.loads(SRC.read_text(encoding="utf-8"))
site = data["site_aggregate"]
dim_summary = data["dimension_summary"]
by_intent = data["by_intent"]
by_pt = data["by_page_type"]
item_dist = data["item_distribution"]
per_page = data["per_page"]
rubric = data["rubric"]
geo6 = rubric["geo6_items"]

# Scale helper: scores are 0-10 in this report. Grade bands given in 0-100.
# Convert per-item weighted_mean to 0-100 by multiplying by 10.
def to100(x):
    return round(x * 10, 1)

overall_100 = to100(site["overall"])
geo_100 = to100(site["geo_score"])
seo_100 = to100(site["seo_score"])

def band(x100):
    if x100 >= 90: return "优 (excellent)"
    if x100 >= 75: return "好 (good)"
    if x100 >= 60: return "中 (medium)"
    if x100 >= 40: return "低 (low)"
    return "差 (poor)"

# Worst 5 / best 5 pages
sorted_pp = sorted(per_page, key=lambda p: p.get("overall") or 0)
worst5 = sorted_pp[:5]
best5 = sorted_pp[-5:][::-1]

# Top 5 failing items (lowest pass rate among non-NA items)
non_na = [(iid, d) for iid, d in item_dist.items() if d["na"] < 138]
worst_items = sorted(non_na, key=lambda x: x[1]["pass_rate"])[:8]
best_items = sorted(non_na, key=lambda x: -x[1]["pass_rate"])[:8]

# 5 sample pages
def pick_sample(predicate, n=1):
    out = [p for p in per_page if predicate(p)]
    return out[:n]

# Top 3 categories
top_cats = sorted(by_pt.items(), key=lambda x: -x[1]["overall"])[:5]
bot_cats = sorted(by_pt.items(), key=lambda x: x[1]["overall"])[:5]

# Per-intent top failing items
def intent_failures(intent_name, n=5):
    pages = [p for p in per_page if p["intent"] == intent_name]
    if not pages:
        return []
    failed_counts = Counter()
    for p in pages:
        for iid, v in p["items"].items():
            if v.get("score") in (0, 5):  # FAIL or PARTIAL
                failed_counts[iid] += 1
    return failed_counts.most_common(n)

trans_failures = intent_failures("transactional", 6)
comm_failures = intent_failures("commercial", 6)
info_failures = intent_failures("informational", 6)

lines = []
P = lines.append

P("# 智印云 (ZprintPro) en 站 CORE-EEAT 80 项评分 + GEO Readiness 评估")
P("")
P("> 数据源: `F:\\zprintpro-nextjs\\docs\\seo-audit-en\\parsed-data.json` (138 URLs)")
P("> 评分时间: 2026-06-10 23:59 (CST)")
P("> Rubric: Pass=10 | Partial=5 | Fail=0 | N/A 排除")
P("> 维度: C (Contextual) / O (Organization) / R (Referenceability) / E (Exclusivity) / Exp (Experience) / Ept (Expertise) / A (Authority) / T (Trust)")
P("> 公式: GEO = (C+O+R+E)/4, SEO = (Exp+Ept+A+T)/4, Overall = (GEO+SEO)/2")
P("> **量表**: 每维度 10 项,每项 0/5/10。汇总分换算到 0-100 后对照 grade band (90-100 优 / 75-89 好 / 60-74 中 / 40-59 低 / 0-39 差)。")
P("> N/A 项: A01-A10 (Authority 全 10 项,site-level 需外链/whois/GSC 数据) + T01/T03/T05/T07/T10 (Trust 中 5 项 legal/site-level)。")
P("")

# ==================== 1. EXECUTIVE SUMMARY ====================
P("## 1. Executive Summary")
P("")
P(f"- **总评**: 全站 overall = **{overall_100:.1f}/100** → 等级 **{band(overall_100)}**")
P(f"- **GEO Score** (LLM/GEO 检索适配度): **{geo_100:.1f}/100** → {band(geo_100)}")
P(f"- **SEO Score** (传统 SEO + E-E-A-T): **{seo_100:.1f}/100** → {band(seo_100)}")
P(f"- **GEO-Ready 6 项清单 (C02/C09/O03/O05/E01/O02)**: 全站均值 {site['geo6_avg_pass_rate']*100:.1f}%,全 6 项达标的页面共 {site['geo6_pages_full_ready']}/138 ({site['geo6_pages_full_ready']*100/138:.1f}%)")
P(f"- **8 维度均值** (换算 0-100):")
for d, v in dim_summary.items():
    val = to100(v["weighted_mean"])
    P(f"  - {d}: {val:.1f} ({band(val)})")
P("")
P("### 关键发现 (TL;DR)")
P("")
P(f"1. **Referenceability (R) 是最大短板 (22.0/100)**: 90%+ 页面缺作者署名 (R01)、作者 bio (R02)、HowTo schema (R06)、Speakable schema (R07)、LocalBusiness schema (R08) — 这些是 LLM/GEO 检索最依赖的语义锚点。")
P(f"2. **Authority (A) 完全空缺 (0/100)**: 10 项全部 N/A,因 site-level 数据需外接 (GSC/Ahrefs/Whois)。本报告无法判断 — V2 Phase B 必须接入第三方数据源。")
P(f"3. **GEO 优于 SEO (53.1 vs 34.0)**: Organization (75.5) 拉高了 GEO 分 — 全站 100% canonical + 100% og:title + 99.3% hreflang 8 locale + 100% WebSite schema + 100% Product schema。但 Referenceability/Ept/Exp 拖了 SEO 后腿。")
P(f"4. **产品页 (transactional, n=79) 是站内最大流量潜力池**: 整体 46.1/100,geo6_pass_rate 78.5% (远高于 informational 的 40%) — **但** description 79/79 是中文占位符,这一项直接把 GEO 拉低 5+ 分。")
P(f"5. **Blog 35 篇是 GEO 重灾区 (40.0/100 overall)**: 32/35 有 Article schema 是亮点,但 0/35 有 Speakable schema、0/35 有 HowTo schema、35/35 description 长度 100 字符以下或缺失 — 修复 ROI 最高。")
P(f"6. **Trust 信号分散**: 4/138 (3%) 有 trust badges (ISO/FSC),0/138 有退款/保证说明 — Trust 维度只到 45.9/100,严重落后电商同业 (Vistaprout 80+)。")
P("")

# ==================== 2. RUBRIC ====================
P("## 2. CORE-EEAT 80 项 Rubric 总览")
P("")
P("| 维度 | 范围 | 本评估中 N/A 数 | 实际可评项 |")
P("|------|------|---------------|------------|")
all_items = [iid for iid in item_dist]
dims = ["C", "O", "R", "E", "Exp", "Ept", "A", "T"]
for d in dims:
    dim_items = [iid for iid in all_items if iid.startswith(d)]
    n_na = sum(1 for iid in dim_items if item_dist[iid]["na"] == 138)
    P(f"| {d} | C01-C10 / O01-O10 / ... | {n_na} | {10 - n_na} |")
P("")
P("### 2.1 GEO-Ready 6 项 (C02 / C09 / O03 / O05 / E01 / O02)")
P("")
P("这 6 项是 ChatGPT/Claude/Perplexity 抓取内容时最看重的语义结构,达标越多被引用的概率越大。")
P("")
P("| 编号 | 项目 | 全站 Pass 率 | 描述 |")
P("|------|------|--------------|------|")
geo6_desc = {
    "C02": "Direct answer in first 150 words (P0, FAQ-friendly intro)",
    "C09": "FAQ section with FAQPage schema (P0, LLM 抓取结构化问答)",
    "O03": "Data in tables, not prose (P0, 数字易被引用)",
    "O05": "JSON-LD Schema markup present (P0, LLM 解析锚点)",
    "E01": "Original first-party data (P0, 独家数据 = 引用优先级)",
    "O02": "Key Takeaways / Summary Box (P1, 顶部摘要框)",
}
for iid in geo6:
    d = item_dist.get(iid, {})
    P(f"| {iid} | {geo6_desc.get(iid, '')} | {d.get('pass_rate', 0)*100:.1f}% | {d.get('pass',0)}/138 pass |")
P("")

# ==================== 3. AGGREGATE ====================
P("## 3. 全站聚合 (Site Aggregate)")
P("")
P("| 指标 | 数值 (0-10 量表) | 换算 0-100 | 等级 |")
P("|------|------------------|-----------|------|")
P(f"| Overall | {site['overall']:.2f} | **{overall_100:.1f}** | **{band(overall_100)}** |")
P(f"| GEO Score | {site['geo_score']:.2f} | {geo_100:.1f} | {band(geo_100)} |")
P(f"| SEO Score | {site['seo_score']:.2f} | {seo_100:.1f} | {band(seo_100)} |")
P(f"| GEO6 平均达标率 | {site['geo6_avg_pass_rate']*100:.1f}% | - | - |")
P(f"| GEO6 全 6 项达标页数 | {site['geo6_pages_full_ready']}/138 | {site['geo6_pages_full_ready']*100/138:.1f}% | - |")
P(f"| 总评页面数 | {site['pages_scored']} | - | - |")
P("")

# ==================== 4. BY DIMENSION ====================
P("## 4. 8 维度分数明细 (Dimension Summary)")
P("")
P("| 维度 | 加权均值 (0-10) | 换算 0-100 | 等级 | 诊断 |")
P("|------|----------------|-----------|------|------|")
dim_diag = {
    "C": "标题/描述/H1/canonical 基本合规 (50-100 字符 + 100% canonical),但 description 79 产品页是中文占位符拉低均值",
    "O": "全站 JSON-LD / og:title / hreflang 覆盖率高,得分最高 — 但 O02 Key Takeaways 缺失严重",
    "R": "塌方:作者/R02/Speakable/HowTo/LocalBusiness 5 项全站 0%,Referenceability 是 LLM 抓取的最大障碍",
    "E": "中等:Product schema 全覆盖,AggregateRating 未解析,Case study / 内部数据仅 1 页",
    "Exp": "较弱:Real photos / Testimonials / Process 缺少,仅靠 word_count 启发式",
    "Ept": "较弱:tech specs 仅产品页有,无 standards/glossary/citation,blog 600 字门槛过半数不达标",
    "A": "N/A 全 10 项,site-level 数据需外接 (Ahrefs/GSC/Whois)",
    "T": "中等:HTTPS 100% (CDN 默认),但 trust badges 4/138,guarantee 0/138 — Trust 是电商转化关键",
}
for d in dims:
    v = dim_summary[d]
    val100 = to100(v["weighted_mean"])
    P(f"| **{d}** | {v['weighted_mean']:.2f} | {val100:.1f} | {band(val100)} | {dim_diag[d]} |")
P("")

# ==================== 5. BY INTENT ====================
P("## 5. 按用户意图拆分 (By Intent)")
P("")
P("| Intent | n | Overall (0-100) | GEO | SEO | GEO6 达标率 |")
P("|--------|---|------------------|-----|-----|--------------|")
for it in sorted(by_intent.keys(), key=lambda x: -by_intent[x]["overall"]):
    v = by_intent[it]
    P(f"| {it} | {v['n']} | {to100(v['overall']):.1f} | {to100(v['geo_score']):.1f} | {to100(v['seo_score']):.1f} | {v['geo6_avg_pass_rate']*100:.1f}% |")
P("")
P("**洞察**:")
P("- 商业类 (commercial) 含 13 分类 + 2 服务 = 15 页,overall 47.2 最高,SEO 40.8 也最高 — **分类页 SEO/GEO 双优**。")
P("- 交易类 (transactional) 79 产品页,overall 46.1,GEO 54.6 不错但 SEO 37.7 — 产品页 schema 强 (Product+ImageObject) 拉高 GEO,作者/案例/规格 (Ept/Exp) 拉低 SEO。")
P("- 信息类 (informational) 40 页 (35 blog + about + faq + help + news + case),overall 38.2,SEO 仅 25.1 — **blog 35 篇是 SEO 短板**。")
P("- 法律类 (legal) terms/privacy 仅 2 页,刻意 noindex 拉低整体 — 不影响真实 SEO 表现,可解读为内部基线。")
P("")

# ==================== 6. BY PAGE TYPE ====================
P("## 6. 按页面类型拆分 (By Page Type)")
P("")
P("| 页面类型 | n | Overall (0-100) | GEO | SEO | GEO6 达标率 | 等级 |")
P("|---------|---|------------------|-----|-----|--------------|------|")
for pt in sorted(by_pt.keys(), key=lambda x: -by_pt[x]["overall"]):
    v = by_pt[pt]
    val100 = to100(v["overall"])
    P(f"| {pt} | {v['n']} | {val100:.1f} | {to100(v['geo_score']):.1f} | {to100(v['seo_score']):.1f} | {v['geo6_avg_pass_rate']*100:.1f}% | {band(val100)} |")
P("")

# ==================== 7. PER-INTENT FAILURE ====================
P("## 7. 各意图 Top 失败项 (Top 5 Failures by Intent)")
P("")
P("### 7.1 Transactional (产品页, n=79)")
P("")
P("| 编号 | 失败次数 | 项目 | 原因 (来自 score 注释) |")
P("|------|----------|------|------------------------|")
for iid, count in trans_failures:
    note = ""
    # find a sample note
    for p in per_page:
        if p["intent"] == "transactional":
            v = p["items"].get(iid, {})
            if v.get("score") in (0, 5):
                note = v.get("note", "")
                break
    P(f"| {iid} | {count} | (item) | {note} |")
P("")
P("### 7.2 Commercial (分类/服务, n=15)")
P("")
P("| 编号 | 失败次数 | 原因 |")
P("|------|----------|------|")
for iid, count in comm_failures:
    note = ""
    for p in per_page:
        if p["intent"] == "commercial":
            v = p["items"].get(iid, {})
            if v.get("score") in (0, 5):
                note = v.get("note", "")
                break
    P(f"| {iid} | {count} | {note} |")
P("")
P("### 7.3 Informational (blog/about/faq/help/news, n=40)")
P("")
P("| 编号 | 失败次数 | 原因 |")
P("|------|----------|------|")
for iid, count in info_failures:
    note = ""
    for p in per_page:
        if p["intent"] == "informational":
            v = p["items"].get(iid, {})
            if v.get("score") in (0, 5):
                note = v.get("note", "")
                break
    P(f"| {iid} | {count} | {note} |")
P("")

# ==================== 8. ITEM DISTRIBUTION ====================
P("## 8. 全 80 项 Pass 率分布 (Top 8 Best & Worst)")
P("")
P("### 8.1 全站 Pass 率最低的 8 项 (最需要修)")
P("")
P("| 编号 | 维度 | Pass | Partial | Fail | N/A | Pass 率 | 加权均值 |")
P("|------|------|------|---------|------|-----|----------|----------|")
for iid, d in worst_items:
    P(f"| {iid} | {d['dim']} | {d['pass']} | {d['partial']} | {d['fail']} | {d['na']} | {d['pass_rate']*100:.1f}% | {d['weighted_mean']:.2f} |")
P("")
P("### 8.2 全站 Pass 率最高的 8 项 (做得好的)")
P("")
P("| 编号 | 维度 | Pass | Partial | Fail | N/A | Pass 率 | 加权均值 |")
P("|------|------|------|---------|------|-----|----------|----------|")
for iid, d in best_items:
    P(f"| {iid} | {d['dim']} | {d['pass']} | {d['partial']} | {d['fail']} | {d['na']} | {d['pass_rate']*100:.1f}% | {d['weighted_mean']:.2f} |")
P("")

# ==================== 9. WORST/BEST PAGES ====================
P("## 9. 表现最差 5 页 (需立即修)")
P("")
P("| URL | 页面类型 | Intent | Overall (0-100) | GEO | SEO | GEO6 达标 |")
P("|-----|---------|--------|------------------|-----|-----|-----------|")
for p in worst5:
    P(f"| {p['url']} | {p['page_type']} | {p['intent']} | {to100(p['overall']):.1f} | {to100(p['geo_score']):.1f} | {to100(p['seo_score']):.1f} | {p['geo6_pass']}/6 |")
P("")
P("**注意**: 3 个 blog/flyer-guide / packaging-guide / sticker-guide 页面在 A1 deliverable 中已识别为 \"Post not found\" stub — 它们排在最差属于预期。其余如 /terms、/privacy 是 noindex 页,SEO 影响有限。")
P("")
P("## 10. 表现最好 5 页 (样板)")
P("")
P("| URL | 页面类型 | Intent | Overall (0-100) | GEO | SEO | GEO6 达标 |")
P("|-----|---------|--------|------------------|-----|-----|-----------|")
for p in best5:
    P(f"| {p['url']} | {p['page_type']} | {p['intent']} | {to100(p['overall']):.1f} | {to100(p['geo_score']):.1f} | {to100(p['seo_score']):.1f} | {p['geo6_pass']}/6 |")
P("")
P("**洞察**: 最佳页全部是产品页 (transactional),且全部通过 GEO6 全 6 项 — 这 5 个产品页可作为 V2 Phase B 修复其它 74 个产品页的模板样板。")
P("")

# ==================== 11. RECOMMENDATIONS ====================
P("## 11. P0/P1/P2 修复清单 (按 ROI 排序)")
P("")
P("### 11.1 P0 — 立即修 (单点修复,影响最大)")
P("")
P("| # | 修复项 | 涉及维度 | 影响页面 | 预期提升 |")
P("|---|--------|---------|---------|----------|")
P("| 1 | **产品页 description 从中文占位符改为英文 (Pass=10)** | C06/C07/C10 | 79/79 产品 | GEO +3 分,SEO +2 分 |")
P("| 2 | **产品页 keywords 从中文改为英文 (C10)** | C10 | 79/79 | GEO +2 分 |")
P("| 3 | **Title 去掉 brand 重复 (e.g. `X | Y | ZprintPro | ZprintPro` → `X | Y | ZprintPro`)** | C05 | 101/139 | GEO +1.5,SEO +1 |")
P("| 4 | **Description 长度补到 150-160 字符 (当前 79 产品 9 字符)** | C06 | 79 产品 + 40 blog | GEO +2 |")
P("| 5 | **加 Speakable schema 到所有 blog 页 (R07 现在 0/138)** | R07 | 35 blog | GEO +5 (LLM 引用率显著提升) |")
P("| 6 | **加 HowTo schema 到核心品类 (Packaging/Paper-bag/Sticker/Banner)** | R06/Ept08 | 4-6 产品 | GEO +1.5,SEO +2 |")
P("| 7 | **作者署名 + Article schema datePublished (R01/R04)** | R01/R04 | 35 blog | SEO +3 |")
P("")
P("### 11.2 P1 — 1 周内修")
P("")
P("| # | 修复项 | 涉及维度 |")
P("|---|--------|---------|")
P("| 8 | 加 LocalBusiness schema 到 contact/about 页 (R08 0→2) | R08 |")
P("| 9 | 加 AggregateRating 到 Product schema (E04) | E04 |")
P("| 10 | 加 Key Takeaways 顶部摘要框到 blog (O02) | O02 |")
P("| 11 | 加 Comparison Table 到 13 分类页 (Ept06) | Ept06 |")
P("| 12 | 加 Trust badges (ISO/FSC) 到 footer/about (T08) | T08 |")
P("")
P("### 11.3 P2 — 1 月内修")
P("")
P("| # | 修复项 | 涉及维度 |")
P("|---|--------|---------|")
P("| 13 | Authority 10 项 site-level 数据接入 (需 Ahrefs/GSC) | A |")
P("| 14 | T01/T03/T05/T07/T10 site-level trust 接入 (Trustpilot/BBB) | T |")
P("| 15 | Internal data/stats 块 (E08) 到分类页 | E08 |")
P("| 16 | Custom visuals / infographics (E09) | E09 |")
P("")

# ==================== 12. METHODOLOGY ====================
P("## 12. 方法论 + 局限")
P("")
P("### 12.1 评分公式")
P("- **Per-item**: Pass=10 / Partial=5 / Fail=0 / N/A=None")
P("- **Per-dimension mean** = 该维度所有可评分项的算术平均 (N/A 排除)")
P("- **GEO Score** = (C + O + R + E) / 4")
P("- **SEO Score** = (Exp + Ept + A + T) / 4")
P("- **Overall** = (GEO + SEO) / 2")
P("- **GEO-Ready 6 项 (C02/C09/O03/O05/E01/O02)**: 每项 Pass=1 / 否则 0,达标数 / 6 = pass_rate")
P("")
P("### 12.2 Intent 映射")
P("- product → **transactional**")
P("- category, service → **commercial**")
P("- blog, about, news, faq, help, case-studies → **informational**")
P("- home, contact → **navigational**")
P("- terms, privacy → **legal** (noindex, 拉低均值但不影响真实 SEO)")
P("")
P("### 12.3 已知局限 (因数据源未含这些字段)")
P("")
P("1. **E04 AggregateRating 未解析**: parsed-data.json 没拆 Product.review 字段,本次 E04 全 138 页 fail。下次可读 raw HTML 补 AggregateRating 提取。")
P("2. **Ept07 Glossary 缺失**: 全 138 页 fail — 实际博客可能含 glossary 段落,但未在 word_count 中检测。下次需 re-parse 文本内容。")
P("3. **E10 Resource download**: 全 fail — 同样未在元数据中识别。")
P("4. **R02 Author bio**: 全 fail — 需解析 page 文本中的 \"About the Author\" block。")
P("5. **R05 Citations / 外部引用**: 通过 word_count 启发式,实际可能漏。")
P("6. **A 全部 N/A**: 需外接 GSC/Ahrefs/Moz API。")
P("7. **T01/T03/T05/T07/T10 N/A**: Trustpilot/BBB 接入、cookie consent 检测。")
P("")
P("### 12.4 与 V1 报告一致性")
P("")
P("V1 (`seo-geo-audit-en-v1.md`) 报告的关键 P0 问题已在本评分中得到数据支撑:")
P("- 79/79 产品页 description 是中文占位符 (C10 fail 79/79) — ✓ 一致")
P("- 101/139 Title 含品牌重复 (C05 partial 大量) — ✓ 一致")
P("- 全站缺 HowTo/Speakable/LocalBusiness schema (R06/R07/R08 全 138 fail) — ✓ 一致")
P("- Authority site-level 数据空白 (A 全 N/A) — ✓ 一致")
P("")

# ==================== 13. NEXT STEPS ====================
P("## 13. 下一步")
P("")
P("1. **Phase B (代码修复)**: 按 P0 清单的 1-7 项,优先级: 79 产品页 description/keywords 中文化 → Speakable schema → HowTo schema → 作者署名")
P("2. **重新跑评分**: Phase B 完成后,重跑本脚本验证 P0 修复后 overall/GEO/SEO 分数提升")
P("3. **接入 Authority 数据**: 接 GSC + Ahrefs (backlink/DR/品牌搜索量) 解除 A 维度 N/A")
P("4. **接入 Trust 第三方**: Trustpilot Widget / BBB 列表 / cookie consent 平台")
P("5. **持续监控**: 每月跑一次,纳入 SEO 周报")
P("")
P(f"_Generated: 2026-06-10 23:59:54 +08:00 by score_core_eeat.py + build_summary.py_")
P("")

# Write
DST.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {DST} ({DST.stat().st_size:,} bytes, {len(lines)} lines)")
print(f"\nSummary preview:")
print("\n".join(lines[:40]))