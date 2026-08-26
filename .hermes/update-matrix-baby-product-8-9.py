#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""8/9 matrix 标记: baby-product-label-sticker-printing-guide v8_ready + conversion_status verified"""
import json

path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"
with open(path, "r", encoding="utf-8") as f:
    m = json.load(f)

# 1) queue[Q-014] baby-product 标记
for q in m.get("queue", []):
    if q.get("slug") == "baby-product-label-sticker-printing-guide":
        q["status"] = "completed"
        q["completed_at"] = "2026-08-09"
        q["v8_standard"] = True
        q["v8_ready_score"] = 15
        q["conversion_status"] = "verified"
        q["last_conversion_test"] = "2026-08-09T09:30:00+08:00"
        q["anti_ai_slop_8_items"] = True
        q["9_section_structure"] = True
        q["no_images"] = True
        q["faq_count"] = 4
        q["internal_links_count"] = 5
        q["locale_chars"] = {
            "zh-hk": 6928,
            "en": 11755,
            "ja": 7186,
        }
        print("Q-014 baby-product marked v8_ready + verified")
        break

# 2) v8_retrofit.phase_a_partial_8_6_8_12 baby-product entry 加完成状态
for entry in m.get("v8_retrofit", {}).get("phase_a_partial_8_6_8_12", []):
    if entry.get("slug") == "baby-product-label-sticker-printing-guide":
        entry["retrofit_completed"] = True
        entry["retrofit_completed_at"] = "2026-08-09"
        entry["v8_ready_score"] = 15
        entry["conversion_status"] = "verified"
        entry["last_conversion_test"] = "2026-08-09T09:30:00+08:00"
        entry["commit_hash"] = "0d46a4c"
        entry["cf_build_run"] = "93221129040"
        print("v8_retrofit.phase_a baby-product entry marked")
        break

# 3) v8_retrofit counts 更新 (v8_ready_count = 4: cosmetics + apparel + cross-border + baby-product)
vr = m.get("v8_retrofit", {})
vr["v8_ready_count"] = 4
vr["last_retrofit_at"] = "2026-08-09T16:33:00+08:00"
vr["last_retrofit_slug"] = "baby-product-label-sticker-printing-guide"
vr["last_retrofit_commit"] = "0d46a4c"
vr["last_retrofit_cf_run"] = "93221129040"
print(f"v8_retrofit.v8_ready_count = {vr['v8_ready_count']}")

# 4) 6 篇 partial 进度 (8/7 apparel ✅ + 8/8 cross-border ✅ + 8/9 baby-product ✅ + 8/10-8/12 待)
if "phase_a_progress" not in vr:
    vr["phase_a_progress"] = {}
vr["phase_a_progress"]["8_7_apparel"] = {"status": "completed", "commit": "2e28154"}
vr["phase_a_progress"]["8_8_cross_border"] = {"status": "completed", "commit": "46809c3"}
vr["phase_a_progress"]["8_9_baby_product"] = {"status": "completed", "commit": "0d46a4c"}
vr["phase_a_progress"]["8_10_cmyk"] = {"status": "pending", "deadline": "2026-08-10"}
vr["phase_a_progress"]["8_11_paper_materials"] = {"status": "pending", "deadline": "2026-08-11"}
vr["phase_a_progress"]["8_12_same_day_flyers"] = {"status": "pending", "deadline": "2026-08-12"}
print("v8_retrofit.phase_a_progress 3/6 completed")

# 5) push 配额 (8/9 1 push + 1 report push = 2 push, ≤5)
if "8_9_push_quota" not in vr:
    vr["8_9_push_quota"] = {}
vr["8_9_push_quota"]["retorfit_push"] = 1
vr["8_9_push_quota"]["report_push"] = 1
vr["8_9_push_quota"]["total"] = 2
vr["8_9_push_quota"]["daily_cap"] = 5
vr["8_9_push_quota"]["monthly_total"] = 2
vr["8_9_push_quota"]["monthly_cap"] = 150
print("v8_retrofit.8_9_push_quota 2/5 daily, 2/150 monthly")

# 写回
with open(path, "w", encoding="utf-8") as f:
    json.dump(m, f, ensure_ascii=False, indent=2)
print(f"wrote: {path}")
