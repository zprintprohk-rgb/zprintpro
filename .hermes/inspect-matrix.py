#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect matrix id structure."""
import json

with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)

v7 = m.get('v7_sku_optimizations', [])
print('v7_sku_optimizations ids (last 10):')
for e in v7[-10:]:
    print(f'  id={e.get("id","?")!r} slug={e.get("slug","?")}')

# Show first entry's full structure for reference
print('\nFirst v7 entry (for reference structure):')
print(json.dumps(v7[0], ensure_ascii=False, indent=2))

# Find max numeric suffix
import re
max_n = 0
for e in v7:
    idv = e.get('id', '')
    m2 = re.search(r'v7-SKU-(\d+)', idv)
    if m2:
        n = int(m2.group(1))
        if n > max_n: max_n = n
print(f'\nMax v7-SKU number: {max_n}')

# PDP max
v7p = m.get('v7_pdp_reviews', [])
max_p = 0
for e in v7p:
    idv = e.get('id', '')
    m2 = re.search(r'v7-PDP-(\d+)', idv)
    if m2:
        n = int(m2.group(1))
        if n > max_p: max_p = n
print(f'Max v7-PDP number: {max_p}')

# Last PDP entry
print('\nLast v7-PDP entry:')
print(json.dumps(v7p[-1], ensure_ascii=False, indent=2))
