#!/usr/bin/env python3
"""
7 步 verify 流水线 PASS 后, 更新 matrix.json Q-GR-01 entry:
- verify_status: pending-7-step → PASS
- cf_build_run: TBD-cf-build-2026-07-23 → 89103703406
- deployed_commit: TBD-commit-2026-07-23 → b0d82ee
- verify_steps: "7/7"
- sitemap_mtime: 2026-07-23 (sitemap.xml 369KB, slug 15 处命中, Q-GR-01 3 locale hreflang 完整)
"""
import json
from pathlib import Path
from datetime import datetime

ROOT = Path("F:/zprintpro-nextjs")
F = ROOT / ".hermes/industry-keyword-matrix.json"

with open(F, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 找 Q-GR-01
target = None
for c in data.get('covered', []):
    if c.get('id') == 'Q-GR-01':
        target = c
        break

if not target:
    print("  ❌ Q-GR-01 not found")
    exit(1)

# 更新
target['verify_status'] = 'PASS'
target['cf_build_run'] = '89103703406'
target['deployed_commit'] = 'b0d82ee'
target['deployed_at'] = '2026-07-23T10:35:00+08:00'
target['verify_steps'] = '7/7 (http200 3 locale, kw 37/19/43 ≥ 1, price 4/4/4 ≥ 3, partOf=0, no_img 0, internal_links 5/5 200, sitemap slug 15 hit 3 locale hreflang)'
target['sitemap_mtime'] = '2026-07-23'
target['cron_session'] = 'mvs_40be86644bca4dfd9017a3955954503a'

# 写回
with open(F, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"  ✓ Q-GR-01 entry finalized: verify_status=PASS, cf_build_run=89103703406, deployed_commit=b0d82ee")
print(f"  ✓ sitemap slug hit: 15 (Q-GR-01 3 locale hreflang 完整)")
print(f"  ✓ matrix.json SSoT updated (待 git commit)")
