#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)
sessions = m.get('v7_cron_sessions', [])
print(f'Total: {len(sessions)}')
for i, s in enumerate(sessions[-2:]):
    print(f'--- Session {i} (last 2) ---')
    print(f'  date: {s.get("date", "?")}')
    print(f'  session: {s.get("session", "?")}')
    print(f'  strategy: {(s.get("strategy", "") or "")[:80]}')
    print(f'  skus: {len(s.get("skus", []))}')
    print(f'  deliverables: {s.get("deliverables", {})}')
