#!/usr/bin/env python3
"""
CORE-EEAT 80-item scoring + GEO Readiness 6-item checklist for zprintpro.com/en/
Source: F:\\zprintpro-nextjs\\docs\\seo-audit-en\\parsed-data.json (138 URLs)
Rubric: Pass=10 | Partial=5 | Fail=0 | N/A excluded from dimension mean
Dimensions: C / O / R / E / Exp / Ept / A / T (10 items each, 80 total)
Site-level items (A01-A10 + T01/T03/T05/T07/T10) -> N/A on every page (15 of 80)
GEO Score = mean(C,O,R,E); SEO Score = mean(Exp,Ept,A,T); Overall = mean(GEO,SEO)
Intent mapping: product=transactional | category/service=commercial |
                blog/about/news/faq/help/case-studies=informational |
                home/contact=navigational | terms/privacy=legal
Output: core-eeat-scores.json (single shot, atomic)
"""
from __future__ import annotations
import json, sys
from pathlib import Path
from collections import defaultdict, Counter

SRC = Path(r"F:\zprintpro-nextjs\docs\seo-audit-en\parsed-data.json")
DST = Path(r"F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-scores.json")

PASS, PARTIAL, FAIL, NA = 10, 5, 0, None

# 80 items, each = (dim, id, name, weight). weight lets us tune but defaults to 1.
# NA items: A01-A10 (all), T01, T03, T05, T07, T10
NA_ITEMS = {
    "A01","A02","A03","A04","A05","A06","A07","A08","A09","A10",
    "T01","T03","T05","T07","T10",
}

# Intent mapping
def intent_of(p: dict) -> str:
    pt = p.get("page_type", "")
    if pt == "product":   return "transactional"
    if pt in ("category", "service"): return "commercial"
    if pt in ("blog", "about", "news", "faq", "help", "case-studies"): return "informational"
    if pt in ("home", "contact"): return "navigational"
    if pt in ("terms", "privacy"): return "legal"
    return "informational"

# 80 items definition
ITEMS = [
    # C (Contextual) — C01..C10
    ("C","C01","Direct answer in first 150 words"),
    ("C","C02","Question-matching heading structure (Q in H2/H3)"),
    ("C","C03","Single H1 with primary keyword"),
    ("C","C04","Heading hierarchy (H1->H2->H3) preserved"),
    ("C","C05","Meta title under 60 chars & front-loaded keyword"),
    ("C","C06","Meta description 150-160 chars"),
    ("C","C07","Meta description matches page content"),
    ("C","C08","Canonical URL self-referencing"),
    ("C","C09","FAQ section with FAQPage schema"),
    ("C","C10","No Chinese characters on /en/ pages"),
    # O (Organization) — O01..O10
    ("O","O01","Clear intro paragraph establishing topic"),
    ("O","O02","Key Takeaways / Summary Box"),
    ("O","O03","Data presented in tables, not prose"),
    ("O","O04","List/table-of-contents for long pages"),
    ("O","O05","JSON-LD Schema markup present"),
    ("O","O06","BreadcrumbList schema"),
    ("O","O07","OpenGraph tags complete (og:title/desc/image/url)"),
    ("O","O08","Twitter card tags present"),
    ("O","O09","Image alt attributes (>=80% coverage)"),
    ("O","O10","Hreflang tags for multi-locale sites"),
    # R (Referenceability) — R01..R10
    ("R","R01","Author / publisher named in content"),
    ("R","R02","Author bio / about-author block"),
    ("R","R03","Article / BlogPosting schema (blog)"),
    ("R","R04","Article schema datePublished / dateModified"),
    ("R","R05","Citations / external authoritative references"),
    ("R","R06","HowTo schema for process pages"),
    ("R","R07","Speakable schema for voice/search snippets"),
    ("R","R08","LocalBusiness schema for location pages"),
    ("R","R09","Last-updated date visible on page"),
    ("R","R10","Source / methodology disclosed"),
    # E (Exclusivity) — E01..E10
    ("E","E01","Original first-party data or research"),
    ("E","E02","Unique imagery (not stock)"),
    ("E","E03","Product / Service schema with offer details"),
    ("E","E04","AggregateRating or review markup"),
    ("E","E05","Proprietary terminology / category naming"),
    ("E","E06","Distinct value proposition vs competitors"),
    ("E","E07","Original case studies or testimonials"),
    ("E","E08","Internal data (counts, stats, dates) present"),
    ("E","E09","Custom visuals: charts, infographics, original photos"),
    ("E","E10","Resource download / gated content"),
    # Exp (Experience) — Exp01..Exp10
    ("Exp","Exp01","First-hand experience signals"),
    ("Exp","Exp02","Real photos vs generic stock"),
    ("Exp","Exp03","Customer testimonials / reviews on-page"),
    ("Exp","Exp04","Case studies linked"),
    ("Exp","Exp05","Process / behind-the-scenes content"),
    ("Exp","Exp06","Quantified results (numbers, %, before/after)"),
    ("Exp","Exp07","Industry-specific terminology used"),
    ("Exp","Exp08","Geographic / regional specificity"),
    ("Exp","Exp09","Year / date context (freshness)"),
    ("Exp","Exp10","Hands-on demonstration content (video/photo)"),
    # Ept (Expertise) — Ept01..Ept10
    ("Ept","Ept01","Topic depth (>=600 words for blog, >=200 for product)"),
    ("Ept","Ept02","Multiple H2/H3 sections (>=3)"),
    ("Ept","Ept03","Technical specs / data sheets present"),
    ("Ept","Ept04","Standards / certifications referenced"),
    ("Ept","Ept05","FAQ / Q&A addressing real user questions"),
    ("Ept","Ept06","Comparison tables (us vs alternatives)"),
    ("Ept","Ept07","Glossary / terminology explained"),
    ("Ept","Ept08","Link to related authoritative resources"),
    ("Ept","Ept09","Disclosures / editorial policy"),
    ("Ept","Ept10","Multimedia (images, video) supporting content"),
    # A (Authority) — A01..A10 (all site-level -> N/A per spec)
    ("A","A01","Backlink profile (DR/DA)"),
    ("A","A02","Brand mentions across the web"),
    ("A","A03","Wikipedia / Wikidata presence"),
    ("A","A04","Industry awards / recognition"),
    ("A","A05","Press coverage"),
    ("A","A06","Government / .edu citations"),
    ("A","A07","Partnerships with known brands"),
    ("A","A08","Speaking engagements / conferences"),
    ("A","A09","Patents or proprietary research"),
    ("A","A10","Third-party reviews (G2, Capterra, Trustpilot)"),
    # T (Trust) — T01..T10
    ("T","T01","Privacy Policy page (N/A on per-page)"),
    ("T","T02","HTTPS / SSL enabled"),
    ("T","T03","Terms of Service page (N/A on per-page)"),
    ("T","T04","Visible contact info (address / phone / email)"),
    ("T","T05","Editorial policy page (N/A on per-page)"),
    ("T","T06","About page with company story"),
    ("T","T07","Accessibility statement (N/A on per-page)"),
    ("T","T08","Trust badges / certifications (ISO, FSC, PCI)"),
    ("T","T09","Money-back / satisfaction guarantee visible"),
    ("T","T10","Cookie consent / GDPR compliance (N/A on per-page)"),
]

# GEO Readiness 6 items (per task spec)
GEO6 = ["C02","C09","O03","O05","E01","O02"]

# ----------------------------------------------------------------------
# Per-page scoring
# ----------------------------------------------------------------------
def score_page(p: dict) -> dict:
    """Score a single page on the 80-item CORE-EEAT rubric."""
    url = p.get("url", "")
    pt  = p.get("page_type", "")
    intent = intent_of(p)
    items = {}

    # ----- Pre-extract fields with safe defaults -----
    title = p.get("title") or ""
    title_len = int(p.get("title_length") or 0)
    title_optimal = bool(p.get("title_optimal", False))
    md  = p.get("meta_description") or ""
    md_len = int(p.get("meta_description_length") or 0)
    md_optimal = bool(p.get("meta_description_optimal", False))
    h1 = p.get("h1_text") or ""
    h1_len = int(p.get("h1_length") or 0)
    h1_count = int(p.get("h1_count") or 0)
    h1_optimal = bool(p.get("h1_optimal", False))
    h2_count = int(p.get("h2_count") or 0)
    word_count = int(p.get("word_count") or 0)
    canonical = p.get("canonical") or ""
    og_count = int(p.get("og_count") or 0)
    tw_count = int(p.get("twitter_count") or 0)
    schema_types = p.get("schema_types") or []
    has_faq = bool(p.get("has_faq_schema", False))
    has_product = bool(p.get("has_product_schema", False))
    has_article = bool(p.get("has_article_schema", False))
    has_breadcrumb = bool(p.get("has_breadcrumb_schema", False))
    has_org = bool(p.get("has_organization_schema", False))
    has_howto = bool(p.get("has_howto_schema", False))
    has_speak = bool(p.get("has_speakable", False))
    has_local = bool(p.get("has_local_business_schema", False))
    has_website = bool(p.get("has_website_schema", False))
    schema_count = int(p.get("schema_count") or 0)
    img_total = int(p.get("img_total") or 0)
    img_missing = int(p.get("img_missing_alt") or 0)
    img_alt_ratio = float(p.get("img_alt_ratio") or 0.0)
    hreflang_count = int(p.get("hreflang_count") or 0)
    hreflang_unique = int(p.get("hreflang_unique_locales") or 0)
    robots = p.get("robots") or ""
    lm = p.get("locale_mismatch") or {}
    has_chinese = bool(lm.get("any_chinese", False))

    # 8/13/12 hreflang suggests multi-locale intent (en should have 12 covering 8)
    has_multilocale = hreflang_unique >= 5
    # direct answer: word count >= 60 in intro = likely has direct answer
    has_intro = word_count >= 150
    # takeaway box: heuristic from H2 count + word density (we can't see rendered text, so use word count threshold)
    has_takeaway = word_count >= 400 and h2_count >= 2
    # tables: heuristic — we don't have rendered DOM, use word density + h2 count as proxy
    has_table = h2_count >= 3 and word_count >= 300
    # toc: long page with many h2
    has_toc = h2_count >= 5
    # JSON-LD present
    has_jsonld = schema_count >= 1
    # author info: we don't have author field; for blog assume named via Article schema
    has_author = has_article and pt == "blog"  # only if Article schema exists
    has_author_bio = False  # not in parsed data
    # citations / external refs: heuristic from word count alone is weak
    has_citations = word_count >= 800 and h2_count >= 4
    # HowTo schema
    has_howto_schema = has_howto
    # Speakable schema
    has_speakable = has_speak
    # LocalBusiness schema
    has_localbiz = has_local
    # Last-updated: not parsed, use schema dateModified when present
    has_date = has_article  # proxy
    # Source/methodology disclosed: weak signal from word count + h2
    has_methodology = word_count >= 1000 and h2_count >= 5
    # First-party data: presence of Product schema with offers counts
    has_first_party = has_product or has_faq
    # Unique imagery: weak signal — if og:image present + total images
    has_unique_imagery = img_total >= 1 and has_jsonld
    # AggregateRating — 2026-06-12 P1-7 修复: 真实解析 parsed-data.json 的 schemas 列表
    # Phase A2 报告 Limitations §12.3 标 E04 全 138 fail 是因为本脚本没解析,
    # 实际 79/79 产品页代码层已有 aggregateRating (见 src/lib/seo.ts:703-736)
    has_rating = False
    has_review = False
    try:
        _schemas_list = p.get("schemas") or []
        for _s in _schemas_list:
            if not isinstance(_s, dict):
                continue
            if _s.get("@type") == "AggregateRating":
                has_rating = True
            if _s.get("@type") == "Product":
                if isinstance(_s.get("aggregateRating"), dict):
                    has_rating = True
                _review = _s.get("review")
                if isinstance(_review, list) and len(_review) > 0:
                    has_review = True
                elif isinstance(_review, dict):
                    has_review = True
    except Exception:
        pass
    # Proprietary terminology
    has_proprietary_terms = "ZprintPro" in title or "智印云" in (md + title)
    # Distinct value prop
    has_value_prop = word_count >= 200 and h1_len >= 10
    # Original case studies
    has_case_studies = has_article and word_count >= 600
    # Internal data (counts/stats)
    has_internal_data = word_count >= 300
    # Custom visuals (charts etc): weak signal
    has_custom_visuals = img_total >= 3
    # Resource download: not parsed
    has_download = False
    # First-hand experience signals
    has_fh_exp = has_case_studies or has_first_party
    # Real photos vs stock
    has_real_photos = img_total >= 2
    # Testimonials on page
    has_testimonials = has_faq  # weak proxy
    # Case studies linked
    case_linked = pt == "case-studies" or (has_article and word_count >= 800)
    # Process / behind-the-scenes
    has_process = has_howto_schema or word_count >= 700
    # Quantified results
    has_quantified = word_count >= 500 and h2_count >= 3
    # Industry terminology
    has_industry_terms = word_count >= 400
    # Geographic specificity
    has_geo_specific = "US" in title or "UK" in title or "AU" in title or "Hong Kong" in title or "USA" in title
    # Year/date context
    has_year_context = has_article  # Article schema carries date
    # Hands-on demo (video/photo) — img_total proxy
    has_demo = img_total >= 4
    # Topic depth threshold (intent-aware)
    if intent == "transactional":
        depth_pass = word_count >= 200
    elif intent == "commercial":
        depth_pass = word_count >= 350
    elif intent == "informational":
        depth_pass = word_count >= 600
    else:
        depth_pass = word_count >= 200
    depth_partial = word_count >= 120
    # Multiple H2 sections
    has_multi_h2 = h2_count >= 3
    has_some_h2 = h2_count >= 1
    # Tech specs
    has_specs = has_product  # product schema often carries specs
    # Standards/certifications referenced
    has_standards = "ISO" in (md + title) or "FSC" in (md + title) or has_org
    # FAQ real questions
    has_real_faq = has_faq
    # Comparison tables
    has_comparison = h2_count >= 4 and word_count >= 500
    # Glossary
    has_glossary = word_count >= 800
    # Link to authoritative resources — weak
    has_authoritative_link = word_count >= 500
    # Disclosures / editorial policy
    has_disclosure = pt in ("terms", "privacy", "about")
    # Multimedia
    has_multimedia = img_total >= 2

    # HTTPS — assume yes (we crawled via https)
    has_https = True
    # Contact info
    has_contact = pt in ("contact", "about") or "contact" in url.lower()
    # About page
    has_about = pt == "about" or has_org
    # Trust badges
    has_trust_badges = "ISO" in (md + title) or "FSC" in (md + title) or "certified" in (md + title).lower()
    # Money-back guarantee
    has_guarantee = "guarantee" in (md + title).lower() or "refund" in (md + title).lower()

    # ---- score table ----
    s = {}

    def put(k, v, note=""):
        items[k] = {"score": v, "note": note}

    # C
    put("C01", PASS if has_intro else (PARTIAL if word_count >= 80 else FAIL),
        f"word_count={word_count}, threshold 150")
    put("C02", PASS if (h2_count >= 2 and h1_optimal) else (PARTIAL if h2_count >= 1 else FAIL),
        f"h2={h2_count}, h1_optimal={h1_optimal}")
    put("C03", PASS if (h1_optimal and h1_count == 1) else (PARTIAL if h1_count == 1 else FAIL),
        f"h1_count={h1_count}, h1_len={h1_len}")
    put("C04", PASS if (h1_count == 1 and h2_count >= 1) else (PARTIAL if h1_count == 1 else FAIL),
        f"h1={h1_count}, h2={h2_count}")
    put("C05", PASS if title_optimal else (PARTIAL if title_len <= 70 else FAIL),
        f"title_len={title_len}")
    put("C06", PASS if md_optimal else (PARTIAL if 100 <= md_len <= 200 else FAIL),
        f"md_len={md_len}")
    put("C07", PASS if (md_optimal and word_count >= 200) else (PARTIAL if md_len >= 50 else FAIL),
        f"md_len={md_len}, words={word_count}")
    put("C08", PASS if canonical and canonical.rstrip("/") == url.rstrip("/") else (PARTIAL if canonical else FAIL),
        f"canonical={canonical}")
    put("C09", PASS if has_faq else FAIL,
        f"has_faq_schema={has_faq}")
    put("C10", PASS if not has_chinese else FAIL,
        f"chinese_on_en_page={has_chinese}")

    # O
    put("O01", PASS if word_count >= 200 else (PARTIAL if word_count >= 80 else FAIL),
        f"words={word_count}")
    put("O02", PASS if has_takeaway else (PARTIAL if word_count >= 250 else FAIL),
        f"has_takeaway_heuristic={has_takeaway}, words={word_count}")
    put("O03", PASS if has_table else (PARTIAL if h2_count >= 2 else FAIL),
        f"has_table_heuristic={has_table}, h2={h2_count}")
    put("O04", PASS if has_toc else (PARTIAL if h2_count >= 3 else FAIL),
        f"h2={h2_count}")
    put("O05", PASS if has_jsonld else FAIL,
        f"schema_count={schema_count}")
    put("O06", PASS if has_breadcrumb else (PARTIAL if has_jsonld else FAIL),
        f"has_breadcrumb={has_breadcrumb}")
    put("O07", PASS if og_count >= 6 else (PARTIAL if og_count >= 3 else FAIL),
        f"og_count={og_count}")
    put("O08", PASS if tw_count >= 3 else (PARTIAL if tw_count >= 1 else FAIL),
        f"twitter_count={tw_count}")
    put("O09", PASS if (img_total == 0 or img_alt_ratio >= 0.8) else (PARTIAL if img_alt_ratio >= 0.5 else FAIL),
        f"img_total={img_total}, alt_ratio={img_alt_ratio}")
    put("O10", PASS if has_multilocale else (PARTIAL if hreflang_count >= 2 else FAIL),
        f"hreflang_unique={hreflang_unique}")

    # R
    put("R01", PASS if has_author else (PARTIAL if has_org else FAIL),
        f"has_author_heuristic={has_author}")
    put("R02", PARTIAL if has_org else FAIL,
        f"author_bio_in_data=False")
    put("R03", PASS if (pt == "blog" and has_article) else (PARTIAL if has_article else FAIL),
        f"page_type={pt}, has_article_schema={has_article}")
    put("R04", PASS if (pt == "blog" and has_article) else (PARTIAL if has_article else FAIL),
        f"has_article_schema={has_article}")
    put("R05", PASS if has_citations else (PARTIAL if word_count >= 500 else FAIL),
        f"has_citations_heuristic={has_citations}")
    put("R06", PASS if has_howto_schema else FAIL,
        f"has_howto={has_howto_schema}")
    put("R07", PASS if has_speakable else FAIL,
        f"has_speakable={has_speakable}")
    put("R08", PASS if has_localbiz else FAIL,
        f"has_local_business={has_localbiz}")
    put("R09", PARTIAL if has_date else FAIL,
        f"has_date_proxy={has_date}")
    put("R10", PASS if has_methodology else (PARTIAL if word_count >= 700 else FAIL),
        f"methodology_heuristic={has_methodology}")

    # E
    put("E01", PASS if has_first_party else (PARTIAL if has_faq or has_product else FAIL),
        f"first_party_data_heuristic={has_first_party}")
    put("E02", PARTIAL if has_unique_imagery else FAIL,
        f"unique_imagery_heuristic={has_unique_imagery}")
    put("E03", PASS if has_product else FAIL,
        f"has_product_schema={has_product}")
    put("E04", PASS if has_rating else (PARTIAL if has_review else FAIL),
        f"aggregateRating={has_rating}, review={has_review}")
    put("E05", PASS if has_proprietary_terms else FAIL,
        f"proprietary_terms={has_proprietary_terms}")
    put("E06", PASS if has_value_prop else (PARTIAL if word_count >= 100 else FAIL),
        f"value_prop_heuristic={has_value_prop}")
    put("E07", PASS if has_case_studies else FAIL,
        f"has_case_studies={has_case_studies}")
    put("E08", PARTIAL if has_internal_data else FAIL,
        f"internal_data_heuristic={has_internal_data}")
    put("E09", PARTIAL if has_custom_visuals else FAIL,
        f"custom_visuals_heuristic={has_custom_visuals}")
    put("E10", FAIL, "resource download not detected in parsed data")

    # Exp
    put("Exp01", PASS if has_fh_exp else (PARTIAL if word_count >= 300 else FAIL),
        f"first_hand_heuristic={has_fh_exp}")
    put("Exp02", PARTIAL if has_real_photos else FAIL,
        f"real_photos_heuristic={has_real_photos}, img_total={img_total}")
    put("Exp03", PASS if has_testimonials else (PARTIAL if has_faq else FAIL),
        f"testimonials_proxy={has_testimonials}")
    put("Exp04", PASS if case_linked else (PARTIAL if word_count >= 500 else FAIL),
        f"case_linked={case_linked}")
    put("Exp05", PASS if has_process else (PARTIAL if has_howto_schema else FAIL),
        f"process_heuristic={has_process}")
    put("Exp06", PARTIAL if has_quantified else FAIL,
        f"quantified_heuristic={has_quantified}")
    put("Exp07", PARTIAL if has_industry_terms else FAIL,
        f"industry_terms_heuristic={has_industry_terms}")
    put("Exp08", PASS if has_geo_specific else (PARTIAL if word_count >= 200 else FAIL),
        f"geo_specific={has_geo_specific}")
    put("Exp09", PARTIAL if has_year_context else FAIL,
        f"year_context_proxy={has_year_context}")
    put("Exp10", PARTIAL if has_demo else FAIL,
        f"demo_heuristic={has_demo}, img_total={img_total}")

    # Ept
    put("Ept01", PASS if depth_pass else (PARTIAL if depth_partial else FAIL),
        f"word_count={word_count}, intent={intent}, threshold={150 if intent=='transactional' else 350 if intent=='commercial' else 600}")
    put("Ept02", PASS if has_multi_h2 else (PARTIAL if has_some_h2 else FAIL),
        f"h2={h2_count}")
    put("Ept03", PASS if has_specs else FAIL,
        f"has_specs={has_specs}")
    put("Ept04", PASS if has_standards else FAIL,
        f"standards_heuristic={has_standards}")
    put("Ept05", PASS if has_real_faq else FAIL,
        f"has_real_faq={has_real_faq}")
    put("Ept06", PASS if has_comparison else FAIL,
        f"comparison_heuristic={has_comparison}")
    put("Ept07", FAIL, "glossary not detected in parsed data")
    put("Ept08", PARTIAL if has_authoritative_link else FAIL,
        f"authoritative_link_heuristic={has_authoritative_link}")
    put("Ept09", PASS if has_disclosure else FAIL,
        f"disclosure={has_disclosure}")
    put("Ept10", PASS if has_multimedia else FAIL,
        f"multimedia={has_multimedia}, img_total={img_total}")

    # A (all N/A per task spec)
    for i in range(1, 11):
        put(f"A{i:02d}", NA, "site-level N/A (out of scope)")

    # T
    put("T01", NA, "site-level N/A (privacy policy page)")
    put("T02", PASS if has_https else FAIL, f"https={has_https}")
    put("T03", NA, "site-level N/A (ToS page)")
    put("T04", PASS if has_contact else (PARTIAL if pt != "terms" else FAIL),
        f"contact={has_contact}")
    put("T05", NA, "site-level N/A (editorial policy)")
    put("T06", PASS if has_about else (PARTIAL if has_org else FAIL),
        f"about_heuristic={has_about}")
    put("T07", NA, "site-level N/A (a11y statement)")
    put("T08", PASS if has_trust_badges else FAIL,
        f"trust_badges={has_trust_badges}")
    put("T09", PASS if has_guarantee else FAIL,
        f"guarantee={has_guarantee}")
    put("T10", NA, "site-level N/A (cookie consent)")

    return {
        "url": url,
        "file": p.get("file"),
        "page_type": pt,
        "intent": intent,
        "title_len": title_len,
        "meta_desc_len": md_len,
        "h1_count": h1_count,
        "h2_count": h2_count,
        "word_count": word_count,
        "schema_count": schema_count,
        "has_chinese": has_chinese,
        "has_faq": has_faq,
        "has_product": has_product,
        "has_article": has_article,
        "img_total": img_total,
        "items": items,
    }


def aggregate(per_page: list[dict]) -> dict:
    """Compute site, by-intent, by-page-type aggregates + item distribution + GEO6."""
    dims = ["C","O","R","E","Exp","Ept","A","T"]
    # Per-page dimension means
    for pg in per_page:
        dim_means = {}
        for d in dims:
            vals = [v["score"] for k, v in pg["items"].items() if k.startswith(d) and v["score"] is not None]
            dim_means[d] = round(sum(vals)/len(vals), 2) if vals else 0.0
        pg["dim_means"] = dim_means
        pg["geo_score"] = round((dim_means["C"] + dim_means["O"] + dim_means["R"] + dim_means["E"]) / 4, 2)
        pg["seo_score"] = round((dim_means["Exp"] + dim_means["Ept"] + dim_means["A"] + dim_means["T"]) / 4, 2)
        pg["overall"]   = round((pg["geo_score"] + pg["seo_score"]) / 2, 2)
        # GEO6 readiness: 6 items, all must be Pass for "ready"
        pg["geo6_pass"] = sum(1 for i in GEO6 if pg["items"].get(i, {}).get("score") == PASS)
        pg["geo6_pass_rate"] = round(pg["geo6_pass"] / 6, 4)

    # Site aggregate
    def mean_of(metric):
        vals = [pg[metric] for pg in per_page if metric in pg]
        return round(sum(vals)/len(vals), 2) if vals else 0.0

    site = {
        "pages_scored": len(per_page),
        "overall": mean_of("overall"),
        "geo_score": mean_of("geo_score"),
        "seo_score": mean_of("seo_score"),
        "geo6_avg_pass_rate": round(sum(pg["geo6_pass_rate"] for pg in per_page) / len(per_page), 4),
        "geo6_pages_full_ready": sum(1 for pg in per_page if pg["geo6_pass_rate"] == 1.0),
    }
    # Real dim site means
    site["dim_site_mean"] = {d: round(sum(pg["dim_means"][d] for pg in per_page) / len(per_page), 2) for d in dims}

    # By intent
    by_intent = {}
    intents = sorted({pg["intent"] for pg in per_page})
    for it in intents:
        sub = [pg for pg in per_page if pg["intent"] == it]
        n = len(sub)
        by_intent[it] = {
            "n": n,
            "overall": round(sum(pg["overall"] for pg in sub)/n, 2),
            "geo_score": round(sum(pg["geo_score"] for pg in sub)/n, 2),
            "seo_score": round(sum(pg["seo_score"] for pg in sub)/n, 2),
            "geo6_avg_pass_rate": round(sum(pg["geo6_pass_rate"] for pg in sub)/n, 4),
            "dim_mean": {d: round(sum(pg["dim_means"][d] for pg in sub)/n, 2) for d in dims},
        }

    # By page type
    by_page_type = {}
    pts = sorted({pg["page_type"] for pg in per_page})
    for pt in pts:
        sub = [pg for pg in per_page if pg["page_type"] == pt]
        n = len(sub)
        by_page_type[pt] = {
            "n": n,
            "overall": round(sum(pg["overall"] for pg in sub)/n, 2),
            "geo_score": round(sum(pg["geo_score"] for pg in sub)/n, 2),
            "seo_score": round(sum(pg["seo_score"] for pg in sub)/n, 2),
            "geo6_avg_pass_rate": round(sum(pg["geo6_pass_rate"] for pg in sub)/n, 4),
            "dim_mean": {d: round(sum(pg["dim_means"][d] for pg in sub)/n, 2) for d in dims},
        }

    # Per-item distribution
    item_dist = {}
    for dim, iid, _ in ITEMS:
        scores = [pg["items"][iid]["score"] for pg in per_page]
        n_pass = sum(1 for s in scores if s == PASS)
        n_part = sum(1 for s in scores if s == PARTIAL)
        n_fail = sum(1 for s in scores if s == FAIL)
        n_na   = sum(1 for s in scores if s is None)
        item_dist[iid] = {
            "dim": dim,
            "pass": n_pass, "partial": n_part, "fail": n_fail, "na": n_na,
            "scored_n": len(per_page) - n_na,
            "pass_rate": round(n_pass / max(1, len(per_page) - n_na), 4),
            "weighted_mean": round((n_pass*10 + n_part*5 + n_fail*0) / max(1, len(per_page) - n_na), 2),
        }

    # Dimension means
    dim_summary = {}
    for d in dims:
        sub = [v for k, v in item_dist.items() if k.startswith(d)]
        total_scored = sum(x["scored_n"] for x in sub)
        total_score  = sum(x["weighted_mean"] * x["scored_n"] for x in sub)
        dim_summary[d] = {
            "n_items": 10,
            "n_scored": total_scored,
            "weighted_mean": round(total_score / max(1, total_scored), 2),
        }

    return {
        "site": site,
        "dim_summary": dim_summary,
        "by_intent": by_intent,
        "by_page_type": by_page_type,
        "item_distribution": item_dist,
        "geo6_items": GEO6,
    }


def main():
    raw = json.loads(SRC.read_text(encoding="utf-8"))
    if not isinstance(raw, list):
        print(f"ERROR: expected list, got {type(raw)}", file=sys.stderr)
        sys.exit(1)
    print(f"Loaded {len(raw)} records from {SRC}")
    per_page = [score_page(p) for p in raw]
    agg = aggregate(per_page)
    out = {
        "schema_version": "core-eeat-1.0",
        "generated_at": "2026-06-10T23:59:54+08:00",
        "source": str(SRC),
        "rubric": {
            "scale": {"Pass": 10, "Partial": 5, "Fail": 0, "N/A": None},
            "geo_score": "(C+O+R+E)/4",
            "seo_score": "(Exp+Ept+A+T)/4",
            "overall":  "(GEO+SEO)/2",
            "grade_bands": [
                {"min": 90, "max": 100, "label": "excellent"},
                {"min": 75, "max": 89,  "label": "good"},
                {"min": 60, "max": 74,  "label": "medium"},
                {"min": 40, "max": 59,  "label": "low"},
                {"min": 0,  "max": 39,  "label": "poor"},
            ],
            "na_items_per_page": sorted(NA_ITEMS),
            "na_reason": "A01-A10 (all site-level) + T01/T03/T05/T07/T10 (legal/site-level). Task spec excludes.",
            "geo6_items": GEO6,
        },
        "site_aggregate": agg["site"],
        "dimension_summary": agg["dim_summary"],
        "by_intent": agg["by_intent"],
        "by_page_type": agg["by_page_type"],
        "item_distribution": agg["item_distribution"],
        "per_page": per_page,
    }
    DST.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {DST} ({DST.stat().st_size:,} bytes)")
    # Quick console summary
    s = out["site_aggregate"]
    print(f"\n=== Site Aggregate ===")
    print(f"  pages_scored       : {s['pages_scored']}")
    print(f"  overall            : {s['overall']}")
    print(f"  geo_score          : {s['geo_score']}")
    print(f"  seo_score          : {s['seo_score']}")
    print(f"  geo6 avg pass rate : {s['geo6_avg_pass_rate']*100:.1f}%")
    print(f"  geo6 full-ready pg : {s['geo6_pages_full_ready']}")
    print(f"\n=== Dimension means ===")
    for d, v in out["dimension_summary"].items():
        print(f"  {d:5s}: {v['weighted_mean']:5.2f}  (scored {v['n_scored']} page-items)")
    print(f"\n=== By intent ===")
    for it, v in out["by_intent"].items():
        print(f"  {it:16s} (n={v['n']:3d}): overall={v['overall']:5.2f}  geo={v['geo_score']:5.2f}  seo={v['seo_score']:5.2f}  geo6={v['geo6_avg_pass_rate']*100:4.1f}%")
    print(f"\n=== By page type (sorted) ===")
    for pt, v in sorted(out["by_page_type"].items(), key=lambda x: -x[1]["overall"]):
        print(f"  {pt:14s} (n={v['n']:3d}): overall={v['overall']:5.2f}  geo={v['geo_score']:5.2f}  seo={v['seo_score']:5.2f}  geo6={v['geo6_avg_pass_rate']*100:4.1f}%")


if __name__ == "__main__":
    main()
