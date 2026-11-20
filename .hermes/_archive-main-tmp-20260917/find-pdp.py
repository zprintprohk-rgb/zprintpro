#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Find PDP candidates - P0 SKUs not yet reviewed."""
import json
import re

with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)

v7 = m.get('v7_pdp_reviews', [])
reviewed = set(e.get('slug', e.get('sku', '')) for e in v7)
print(f'Total v7_pdp_reviews: {len(v7)}')
print('Reviewed PDPs:', sorted(reviewed))

# Get P0 SKUs from products.ts
p0_cats = ['stickers', 'flyers', 'packaging', 'paper-bags']
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

product_blocks = re.split(r'(?=^\s*\{\s*$)', content, flags=re.MULTILINE)
p0_skus = []
for blk in product_blocks:
    cat_match = re.search(r"category:\s*['\"](\w[\w-]*)['\"]", blk)
    slug_match = re.search(r"slug:\s*['\"](\w[\w-]*)['\"]", blk)
    if not cat_match or not slug_match:
        continue
    cat = cat_match.group(1)
    slug = slug_match.group(1)
    if cat in p0_cats:
        p0_skus.append((slug, cat))

# Find P0 SKUs not yet reviewed
unreviewed = [(s, c) for s, c in p0_skus if s not in reviewed]
print(f'\nP0 SKUs not yet PDP-reviewed: {len(unreviewed)}')
for s, c in unreviewed:
    print(f'  - {s:<30} ({c})')

# Today candidates
print('\n=== today PDP candidates (5 priority) ===')
for s, c in unreviewed[:5]:
    print(f'  PDP-CHOICE: {s} ({c})')

# Show structure of 1 candidate for inspection
target = unreviewed[0][0] if unreviewed else None
if target:
    print(f'\n=== {target} block ===')
    sm = re.search(r"slug:\s*['\"]" + target + r"['\"]", content)
    start = sm.start()
    depth = 0
    blk_start = start
    while blk_start > 0:
        if content[blk_start] == '{':
            depth += 1
            if depth == 1: break
        elif content[blk_start] == '}':
            depth -= 1
        blk_start -= 1
    depth = 0
    blk_end = start
    while blk_end < len(content):
        if content[blk_end] == '{':
            depth += 1
        elif content[blk_end] == '}':
            depth -= 1
            if depth == 0:
                blk_end += 1
                break
        blk_end += 1
    block = content[blk_start:blk_end]
    for field in ['title', 'nameEn', 'nameJa', 'description', 'descriptionEn', 'descriptionJa',
                  'longDescription', 'longDescriptionEn', 'longDescriptionJa', 'optimizedAt',
                  'price', 'pricePerPiece', 'moq', 'turnaround']:
        fm = re.search(r"^\s*" + field + r":\s*['\"]([^'\"]*?)['\"]", block, re.MULTILINE)
        if fm:
            v = fm.group(1)[:200]
            print(f'  {field}: {v}')
    print(f'  block_length: {len(block)}')
