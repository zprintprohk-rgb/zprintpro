# -*- coding: utf-8 -*-
"""Scan 业务卡 SKU (per §11 禁区)"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    data = f.read()

# Find all SKU objects
slugs = re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", data)
print(f'总 SKU: {len(slugs)}')

# §11 禁区关键词
forbidden = ['business-card', 'double-sided', 'eco-business', 'drawer-slide', 'drawer-style', 'small-bags', 'eco-tote', 'postcard-set', 'license', 'gift-boxes', 'same-day-business', 'eco-premium']

print('\n=== §11 禁区 SKU ===')
flagged = []
for s in slugs:
    for kw in forbidden:
        if kw in s:
            flagged.append(s)
            break
print(f'命中: {len(flagged)}')
for s in flagged:
    print(f'  - {s}')

# 找 title_zh 含"名片"/"咭片"/"business cards"
print('\n=== 含"名片"/"咭片" 标题 ===')
title_zh = re.findall(r"title_zh:\s*['\"]([^'\"]+)['\"]", data)
for t in title_zh:
    if '名片' in t or '咭片' in t or 'card' in t.lower():
        print(f'  - {t}')

# 找 longDescription 含"名片"/"咭片"
print('\n=== longDescription 含"名片"/"咭片" ===')
ld_count = 0
for m in re.finditer(r"longDescription:\s*['\"]([^'\"]+)['\"]", data):
    if '名片' in m.group(1) or '咭片' in m.group(1) or 'business card' in m.group(1).lower():
        ld_count += 1
        if ld_count <= 5:
            print(f'  - {m.group(1)[:150]}')
print(f'longDescription 命中: {ld_count}')

# productUrl 段
print('\n=== productUrl 含"business-card" ===')
pu = re.findall(r"productUrl:\s*['\"]([^'\"]+)['\"]", data)
for u in pu:
    if 'business-card' in u or 'eco-business' in u:
        print(f'  - {u}')
