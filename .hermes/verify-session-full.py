#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)
sessions = m.get('v7_cron_sessions', [])
print(f'Total: {len(sessions)}')
for i, s in enumerate(sessions):
    date = s.get('date', '?')
    session = s.get('session', '?')
    if date == '?':
        date = s.get('started_at', '?')[:10]
    print(f'{i}: {date} | {session} | skus={len(s.get("skus", []))}')
