#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update matrix.json covered[] entries from pending to PASS
Update weekly report verify status to PASS
"""
import json
import sys
from pathlib import Path
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

REPO = Path(r"F:\zprintpro-nextjs")
MATRIX = REPO / ".hermes" / "industry-keyword-matrix.json"

NEW_COVERED = [
    {
        "id": "T1-MB-001",
        "slug": "baby-food-packaging-box-printing-guide",
        "verify_status": "PASS",
        "verify_steps": "7/7 (http200×3, schema×3, faq_4, no_img, no_shenzhen, kw)",
        "cf_build_run": "88409271583",
        "deployed_commit": "736dccc",
        "locale_chars_final": {"zh-hk": 3531, "en": 5621, "ja": 3833},
    },
    {
        "id": "T2-RE-002",
        "slug": "real-estate-flyer-printing-guide",
        "verify_status": "PASS",
        "verify_steps": "7/7 (http200×3, schema×3, faq_4, no_img, no_shenzhen, kw)",
        "cf_build_run": "88409271583",
        "deployed_commit": "736dccc",
        "locale_chars_final": {"zh-hk": 3432, "en": 5643, "ja": 3667},
    },
    {
        "id": "T3-MD-003",
        "slug": "medical-device-packaging-box-guide",
        "verify_status": "PASS",
        "verify_steps": "7/7 (http200×3, schema×3, faq_4, no_img, no_shenzhen, kw)",
        "cf_build_run": "88409271583",
        "deployed_commit": "736dccc",
        "locale_chars_final": {"zh-hk": 3645, "en": 5756, "ja": 3831},
    },
    {
        "id": "T4-AU-004",
        "slug": "auto-parts-shopping-bag-printing-guide",
        "verify_status": "PASS",
        "verify_steps": "7/7 (http200×3, schema×3, faq_4, no_img, no_shenzhen, kw)",
        "cf_build_run": "88409271583",
        "deployed_commit": "736dccc",
        "locale_chars_final": {"zh-hk": 3697, "en": 5587, "ja": 3910},
    },
    {
        "id": "T5-SP-005",
        "slug": "sports-merchandise-gift-box-printing-guide",
        "verify_status": "PASS",
        "verify_steps": "7/7 (http200×3, schema×3, faq_4, no_img, no_shenzhen, kw)",
        "cf_build_run": "88409271583",
        "deployed_commit": "736dccc",
        "locale_chars_final": {"zh-hk": 3577, "en": 5897, "ja": 4087},
    },
]

def main():
    with open(MATRIX, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updates = 0
    for new in NEW_COVERED:
        for entry in data["covered"]:
            if entry.get("id") == new["id"]:
                entry["verify_status"] = new["verify_status"]
                entry["verify_steps"] = new["verify_steps"]
                entry["cf_build_run"] = new["cf_build_run"]
                entry["deployed_commit"] = new["deployed_commit"]
                entry["locale_chars_final"] = new["locale_chars_final"]
                updates += 1
                break

    data["stats"]["last_updated_event"] = (
        "cron zprintpro-weekly-meta-refresh 2026-07-20 [VERIFIED 7/7]: "
        "5 博客全 3 locale 上線並 verify PASS (T1 母嬰食品 拓點 / T2 房地產 2nd SKU / "
        "T3 醫藥保健 2nd SKU / T4 汽車汽配 2nd SKU / T5 體育賽事 2nd SKU). "
        "CF build run 88409271583 / commit 736dccc. "
        "+5 internal link self-growth (15 insertions across 3 locales). "
        "CATEGORY_INDUSTRIES Tier B 拓點 (3 类目 × 3 locale = 9 hooks). "
        "Tier B 8 行业 100% 覆蓋. Next cron (2026-07-21 daily): Q-NEW-04/05/06 TBD."
    )

    with open(MATRIX, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"[OK] Updated {updates}/5 covered entries to PASS")
    print(f"[OK] last_updated_event: 2026-07-20 [VERIFIED 7/7]")

if __name__ == "__main__":
    main()
