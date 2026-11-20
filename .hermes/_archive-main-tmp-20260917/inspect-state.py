#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Inspect state: GSC plan files, matrix queue, blog slugs."""
import json, os, sys

os.chdir(r'F:\zprintpro-nextjs')

def read_any(path):
    raw = open(path, 'rb').read()
    if raw[:2] in (b'\xff\xfe', b'\xfe\xff'):
        return raw.decode('utf-16')
    return raw.decode('utf-8', errors='replace')

print('=' * 30, 'GSC plan 2026-08-06', '=' * 30)
p = '.hermes/logs/2026-08-06-GSC-关键词方案.md'
if os.path.exists(p):
    print(read_any(p)[:4000])
else:
    print('MISSING')

print()
print('=' * 30, 'GSC plan 2026-08-05 (if any)', '=' * 30)
for f in sorted(os.listdir('.hermes/logs')):
    if 'GSC' in f:
        print(' -', f, os.path.getsize(os.path.join('.hermes/logs', f)))

print()
print('=' * 30, 'matrix queue', '=' * 30)
try:
    m = json.load(open('.hermes/industry-keyword-matrix.json', encoding='utf-8'))
    queue = m.get('queue', [])
    print('queue total:', len(queue))
    for item in queue[:20]:
        if isinstance(item, dict):
            print(' ', item.get('id'), item.get('keyword'), item.get('status', ''), item.get('next_due', ''), item.get('category', ''))
        else:
            print(' ', item)
    cov = m.get('covered', [])
    print('covered total:', len(cov))
    print('lastUpdated:', m.get('lastUpdated'))
except Exception as e:
    print('ERR', e)
