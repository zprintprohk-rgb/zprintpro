#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Dump matrix queue details + GSC csv top queries."""
import json, os, csv

os.chdir(r'F:\zprintpro-nextjs')

m = json.load(open('.hermes/industry-keyword-matrix.json', encoding='utf-8'))
queue = m.get('queue', [])
print('=== QUEUE full ===')
for item in queue:
    if isinstance(item, dict):
        keys = list(item.keys())
        print(json.dumps(item, ensure_ascii=False)[:300])
    else:
        print(item)

print()
print('=== GSC csv files ===')
for f in sorted(os.listdir('.hermes')):
    if 'gsc' in f.lower() or 'csv' in f.lower():
        p = os.path.join('.hermes', f)
        if os.path.isfile(p):
            print(' -', f, os.path.getsize(p))
