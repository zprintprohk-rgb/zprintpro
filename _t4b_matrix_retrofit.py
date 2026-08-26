#!/usr/bin/env python3
"""
Update matrix with v8 retrofit tracking - 8/6 2:20 K3 拍板

For each of 61 retrofit-needed blog, add v8_retrofit_needed / v8_score / v8_category
fields to the matrix for tracking.
"""
import json
import os

MATRIX = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"
AUDIT = r"F:\zprintpro-nextjs\.hermes\reports\blog-v8-audit-2026-08-06.json"

def main():
    with open(MATRIX, "r", encoding="utf-8") as f:
        m = json.load(f)
    with open(AUDIT, "r", encoding="utf-8") as f:
        audit = json.load(f)

    # 收集所有 v8 audit 结果
    audit_by_slug = {r["slug"]: r for r in audit["results"]}

    # 在 matrix 中加 v8_retrofit 子段
    if "v8_retrofit" not in m:
        m["v8_retrofit"] = {
            "audit_at": "2026-08-06T02:20:38+08:00",
            "audit_trigger": "K3 8/6 2:20 反馈 cosmetics v8 视觉/排版是金标准, 旧 68 篇都要 retrofit",
            "v8_template_version": "v2.0 (2026-08-06 02:20)",
            "v8_template_doc": ".hermes/template/blog-v8-seo-geo-template.md",
            "audit_report": ".hermes/reports/blog-v8-audit-2026-08-06.json",
            "total_blogs": audit["total_slugs"],
            "v8_ready_count": audit["v8_ready"],
            "partial_count": audit["partial"],
            "old_format_count": audit["old_format"],
            "phase_a_partial_8_6_8_12": [],
            "phase_b_p0_p1_8_13_8_19": [],
            "phase_c_p1_p2_8_20_8_26": [],
            "phase_d_news_tail_8_27_8_30": [],
            "target_completion": "2026-08-30 (62/62 篇 v8_ready 100% 合规)",
        }

    # 按 phase 分类
    partials = [r for r in audit["results"] if r["category"] == "partial"]
    old_format = [r for r in audit["results"] if r["category"] == "old_format"]
    old_format_sorted = sorted(old_format, key=lambda x: -x["avg_score"])  # 高分优先

    # Phase A: 6 partial
    for r in partials:
        m["v8_retrofit"]["phase_a_partial_8_6_8_12"].append({
            "slug": r["slug"],
            "current_score": r["avg_score"],
            "zh_score": r["zh_score"],
            "en_score": r["en_score"],
            "ja_score": r["ja_score"],
            "zh_chars": r["zh_chars"],
            "missing_zh": r["missing_zh"],
            "target_score": 15,
            "deadline": "2026-08-12"
        })

    # Phase B: 25 old_format 优先 (top 25 by avg_score)
    for r in old_format_sorted[:25]:
        m["v8_retrofit"]["phase_b_p0_p1_8_13_8_19"].append({
            "slug": r["slug"],
            "current_score": r["avg_score"],
            "zh_chars": r["zh_chars"],
            "missing_zh": r["missing_zh"],
            "target_score": 15,
            "deadline": "2026-08-19"
        })

    # Phase C: 20 old_format
    for r in old_format_sorted[25:45]:
        m["v8_retrofit"]["phase_c_p1_p2_8_20_8_26"].append({
            "slug": r["slug"],
            "current_score": r["avg_score"],
            "zh_chars": r["zh_chars"],
            "missing_zh": r["missing_zh"],
            "target_score": 15,
            "deadline": "2026-08-26"
        })

    # Phase D: 10 old_format (剩)
    for r in old_format_sorted[45:55]:
        m["v8_retrofit"]["phase_d_news_tail_8_27_8_30"].append({
            "slug": r["slug"],
            "current_score": r["avg_score"],
            "zh_chars": r["zh_chars"],
            "missing_zh": r["missing_zh"],
            "target_score": 15,
            "deadline": "2026-08-30"
        })

    # 写回
    with open(MATRIX, "w", encoding="utf-8") as f:
        json.dump(m, f, ensure_ascii=False, indent=2)

    print(f"[OK] v8_retrofit added to matrix")
    print(f"     Phase A (partial 8/6-8/12): {len(m['v8_retrofit']['phase_a_partial_8_6_8_12'])} 篇")
    print(f"     Phase B (P0/P1 8/13-8/19): {len(m['v8_retrofit']['phase_b_p0_p1_8_13_8_19'])} 篇")
    print(f"     Phase C (P1/P2 8/20-8/26): {len(m['v8_retrofit']['phase_c_p1_p2_8_20_8_26'])} 篇")
    print(f"     Phase D (News 8/27-8/30):  {len(m['v8_retrofit']['phase_d_news_tail_8_27_8_30'])} 篇")
    print(f"     Total retrofit planned: {len(m['v8_retrofit']['phase_a_partial_8_6_8_12']) + len(m['v8_retrofit']['phase_b_p0_p1_8_13_8_19']) + len(m['v8_retrofit']['phase_c_p1_p2_8_20_8_26']) + len(m['v8_retrofit']['phase_d_news_tail_8_27_8_30'])} 篇")
    print(f"     Target 8/30: 62/62 v8_ready (1 已有 + 61 retrofit)")

if __name__ == "__main__":
    main()
