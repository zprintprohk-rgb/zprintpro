#!/usr/bin/env python3
"""
Update matrix with conversion_status field for v8.3 retrofit pipeline
8/7 02:20 K3 拍板
"""
import json
import os
from datetime import datetime

MATRIX = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

PARTIAL_SLUGS_8_7_8_12 = [
    "apparel-shopping-bag-printing-guide",
    "cross-border-ecommerce-shipping-box-guide",
    "baby-product-label-sticker-printing-guide",
    "cmyk-guide",
    "paper-materials",
    "same-day-flyers-printing-hong-kong-guide",
]

def main():
    with open(MATRIX, "r", encoding="utf-8") as f:
        m = json.load(f)

    # 加 conversion_status 顶层段
    if "conversion_status" not in m:
        m["conversion_status"] = {
            "policy": {
                "values": ["verified", "broken", "untested"],
                "default": "untested",
                "auto_test": "daily cron retrofit 完成后 22:00 跑 conversion-link-check",
                "manual_test": "K3 5min 用 1 设备 + 1 隐身窗口走 '博客→CTA→表单→提交→感谢页'",
            },
            "schema": {
                "status": "verified / broken / untested",
                "last_conversion_test": "ISO 8601 timestamp",
                "ai_citation_count": "整数 (8/12 复盘时 K3 手动统计 4 引擎命中数, default 0)",
            },
            "8_7_8_12_retrofit": {},
        }

    # 6 篇 partial retrofit 全部加 conversion_status
    for i, slug in enumerate(PARTIAL_SLUGS_8_7_8_12):
        target_date = f"2026-08-{7 + i:02d}"  # 8/7, 8/8, 8/9, 8/10, 8/11, 8/12
        m["conversion_status"]["8_7_8_12_retrofit"][slug] = {
            "retrofit_target_date": target_date,
            "conversion_status": "untested",  # 初始, retrofit 完成后 22:00 跑 check 改 "verified" 或 "broken"
            "last_conversion_test": None,  # ISO timestamp 由 cron auto fill
            "ai_citation_count": 0,  # 8/12 复盘时 K3 fill
            "expected_cta_to": ["/contact", "/quote", "wa.me/14158022922"],
            "expected_event": "contact_form_submit",  # 实际代码, K3 8/12 复盘可拍板改 "generate_lead"
            "k3_5min_action": "1 设备 + 1 隐身窗口走全流程 + 检查 webhook 邮件 + GA4 DebugView",
        }

    # 写回
    with open(MATRIX, "w", encoding="utf-8") as f:
        json.dump(m, f, ensure_ascii=False, indent=2)

    print(f"[OK] conversion_status added to matrix")
    print(f"     6 篇 partial retrofit 都初始化 conversion_status = 'untested'")
    print(f"     8/7-8/12 retrofit 当日 22:00 daily cron 跑 check 改 'verified' / 'broken'")
    print(f"     8/12 复盘时 K3 手动 ai_citation_count + 拍板 contact_form_submit vs generate_lead")

if __name__ == "__main__":
    main()
