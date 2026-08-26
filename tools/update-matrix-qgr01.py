#!/usr/bin/env python3
"""
2026-07-23 v7 daily-content-evolve: matrix.json covered[] 追加 Q-GR-01
"""
import json
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
F = ROOT / ".hermes/industry-keyword-matrix.json"

with open(F, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Q-GR-01 covered entry
qgr01_entry = {
    "id": "Q-GR-01",
    "slug": "gang-run-card-boxes-hk-guide",
    "category": "packaging",
    "sku": "gang-run-card-boxes",
    "industry": "零售精品",
    "tier": "A",
    "priority": "P0",
    "covered_at": "2026-07-23",
    "deployed_at": "2026-07-23T10:25:00+08:00",
    "deploy_method": "git push origin_ssh main → CF Pages auto-deploy (v7 daily 1-blog pack, K3 7/23 插队 priority_boost=3)",
    "verify_status": "pending-7-step",
    "locale_chars": {
        "zh-hk": 3627,
        "en": 1240,
        "ja": 506
    },
    "nap_decoupled": True,
    "internal_links_count": 5,
    "no_images": True,
    "v7_features": {
        "price_anchors": "5 档 intuan 校准錨點 (HK$129-2,379 / USD 25-461 / ¥3,800-69,150) — added 2026-07-23",
        "trust_signals": "15+ 年 / 15,000+ 客戶 / 100+ 國家 (3 locale each, 2 places: 引子 + brand 底氣段) — added 2026-07-23",
        "nap_decoupled": True,
        "en_us_sharp_hooks": "Free Shipping $99+ / Free Design Mockup / 100 MOQ / Fast Turnaround (DHL 2-4 day) / Made for USA — added 2026-07-23",
        "no_images": True,
        "internal_links_count": 5
    },
    "v7_upgraded_at": "2026-07-23",
    "v7_session": "mvs_40be86644bca4dfd9017a3955954503a",
    "v7_locale_chars": {
        "zh-hk": 3627,
        "en": 1240,
        "ja": 506
    },
    "double_brand": {
        "zh-hk": "智印港 ZprintPro (双品牌宪法 2026-07-21, 7 处出现)",
        "en_ja": "ZprintPro (en/ja 不带智印港)"
    },
    "covered_at_iso": "2026-07-23T10:25:00+08:00",
    "cf_build_run": "TBD-cf-build-2026-07-23",
    "deployed_commit": "TBD-commit-2026-07-23",
    "k3_section_6_protection": "Q-005 7/22 已 v7 升级到 6762/9529/6853 chars (远超 1200+ 提质目标), 7/23 daily cron 跳过 Q-005, 改写 Q-GR-01 (priority_boost=3 最高). K3 §6 铁律正确应用: 已 covered 不重写.",
    "page_ts_bugfix": "Fix L534 syntax error 'sports-merchandise-gift-box-printing-guide',, → 单逗号 + 加 'gang-run-card-boxes-hk-guide' 到 articleSlugs (in-scope bug fix)",
    "pdp_review": "gang-run-card-boxes 5 维度审查: 修 zh-hk body '深圳自有廠房' → 'ISO 9001 認證工廠 (亞洲自有)' (NAP 脱钩), 加 3 locale '15+ 年 / 15,000+ 客戶 / 100+ 國家' 信任条",
    "5_sku_optimization": [
        "kraft-paper-bags R1 (L4315 + description 强化 ESG 旺季)",
        "mailer-boxes R2 (L9309 + description 强化 D2C 旺季)",
        "white-card-boxes R2 (L18024 + description 强化拼版升级)",
        "food-boxes R1 (L8976 + description 强化节庆旺季)",
        "folding-boxes R1 (L9513 + description 强化 ESG 旺季)"
    ],
    "matrix_update": "matrix.json covered[] 追加 1 entry (Q-GR-01). 7/22 cec7778 commit 仍保留 queue 中 Q-GR-02/03 (priority_boost=2, 等 7/24-25 daily cron 写).",
    "cron_session": "mvs_40be86644bca4dfd9017a3955954503a",
    "note": "2026-07-23 v7 daily-content-evolve: K3 7/23 插队 priority_boost=3 (highest). 双品牌宪法: zh-hk = 智印港 ZprintPro, en/ja = ZprintPro. NAP 脱钩: 3 locale body 均 'ISO 9001 認證工廠 (亞洲自有)' — 不写 supplier origin city."
}

# 1. covered[] 追加
if 'covered' not in data:
    data['covered'] = []
data['covered'].append(qgr01_entry)
print(f"  ✓ covered[] 追加 Q-GR-01 (total: {len(data['covered'])})")

# 2. queue[] 中找 Q-GR-01,标记 status=completed
for q in data.get('queue', []):
    if q.get('id') == 'Q-GR-01':
        q['status'] = 'completed'
        q['completed_at'] = '2026-07-23'
        q['completed_slug'] = 'gang-run-card-boxes-hk-guide'
        print(f"  ✓ queue Q-GR-01 marked completed")
        break

# 3. matrix.json version + last_updated
data['version'] = '2026-07-23-qgr01-deployed'
data['last_updated'] = '2026-07-23T10:25:00+08:00'

# 写回
with open(F, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n  📊 matrix.json updated: covered[] = {len(data['covered'])}, queue[] = {len(data.get('queue', []))}")
