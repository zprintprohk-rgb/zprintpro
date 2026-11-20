#!/usr/bin/env python3
"""Replace Q-004 covered entry with v7 complete version"""
import json
from pathlib import Path

m = json.loads(Path(".hermes/industry-keyword-matrix.json").read_text(encoding="utf-8"))

q004_v7 = {
    "id": "Q-004",
    "slug": "apparel-shopping-bag-printing-guide",
    "category": "paper-bags",
    "sku": "kraft-paper-bags",
    "industry": "服裝",
    "tier": "A",
    "priority": "P0",
    "covered_at": "2026-07-21",
    "deployed_at": "2026-07-21T10:50:00+08:00",
    "deploy_method": "git push origin_ssh main → CF Pages auto-deploy (v7 daily 1-blog pack)",
    "verify_status": "pending-7-step",
    "locale_chars": {
        "zh-hk": 5769,
        "en": 7953,
        "ja": 5816
    },
    "nap_decoupled": True,
    "internal_links_count": 8,
    "no_images": True,
    "verify_steps": "pending-7-step (amend commit pending push)",
    "price_anchors": "5 档 intuan 校准錶 (HKD 811-4,202 for 500-5000 个) + 1 e-print HK 零售天花板对比 (3 locale)",
    "trust_signals": "15+ 年 / 15,000+ 客戶 / 100+ 國家 (zh-hk 2处 / en 1处 / ja 2处)",
    "v7_features": "報價型 (v7 升级: 从信息型转向报价型, 引用 price-tables 真实价格)",
    "v7_history": "P4 BODY 阶段 2026-07-16 写 body 字段但未上线 (路径 bug), 2026-07-21 v7 cron 补 zh-hk page.tsx entry + blog-posts.ts BlogPostMeta + price anchor + 15+ 年 trust + 推送上线",
    "deployed_commit": "TBD-amend-cf-build-2026-07-21",
    "cf_build_run": "TBD-cf-build-2026-07-21",
    "cron_session": "mvs_3c7e073901e140be80eaa9ea8a4141f6"
}

# Replace existing Q-004 entry
new_covered = []
replaced = False
for c in m["covered"]:
    if c.get("id") == "Q-004" or c.get("qid") == "Q-004":
        new_covered.append(q004_v7)
        replaced = True
    else:
        new_covered.append(c)
if not replaced:
    new_covered.append(q004_v7)
m["covered"] = new_covered
print(f"Q-004 replaced: {replaced}")
print(f"Total covered: {len(m['covered'])}")

Path(".hermes/industry-keyword-matrix.json").write_text(json.dumps(m, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"[OK] Matrix updated. Q-004 v7 entry replaced.")
