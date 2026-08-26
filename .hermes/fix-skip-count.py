#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix k3_section6_skip_count drift: 25 baseline + 1 (8/1 A skip) = 26."""
import json

with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# 7/31 baseline was 25 (per 7/31 report). 8/1 +1 = 26.
# Currently 27 due to double-increment bug. Fix to 26.
old = matrix.get('k3_section6_skip_count')
matrix['k3_section6_skip_count'] = 26
print(f'k3_section6_skip_count: {old} -> 26')

# Also verify the latest 8/1 cron_session has the right values
sessions = matrix.get('v7_cron_sessions', [])
today = [s for s in sessions if s.get('started_at', '').startswith('2026-08-01')]
if today:
    print(f'8/1 cron_session fields:')
    for k, v in today[0].items():
        print(f'  {k}: {v}')

# Save
with open('.hermes/industry-keyword-matrix.json', 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)
print('\nMatrix saved')
