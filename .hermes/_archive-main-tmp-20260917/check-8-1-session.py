#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)
sessions = m.get('v7_cron_sessions', [])
for s in sessions[-3:]:
    print(json.dumps(s, ensure_ascii=False, indent=2))
    print('---')
