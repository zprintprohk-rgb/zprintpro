#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check matrix queue + existing poster/flyer guide coverage."""
import json

try:
    with open('.hermes/industry-keyword-matrix.json', encoding='utf-8') as f:
        m = json.load(f)
    print('matrix keys:', list(m.keys()))
    q = m.get('queue', [])
    print('queue len:', len(q))
    for item in q[:20]:
        print(json.dumps(item, ensure_ascii=False)[:220])
    c = m.get('covered', [])
    print('covered len:', len(c))
except Exception as e:
    print('matrix error:', e)
