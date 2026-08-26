#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Spot check 5 SKU final descriptions."""
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for slug in ['security-stickers', 'fluorescent-stickers', 'thick-paper-flyers', 'gang-run-card-boxes', 'tuck-end-boxes']:
    sm = re.search(r"slug:\s*['\"]" + slug + r"['\"]", content)
    if not sm:
        continue
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
    print(f'\n=== {slug} ===')
    for field in ['description', 'descriptionEn', 'descriptionJa']:
        fm = re.search(r"^\s*" + field + r":\s*['\"](.+?)['\"]\s*,?\s*$", block, re.MULTILINE | re.DOTALL)
        if fm:
            v = fm.group(1)
            print(f'  {field} ({len(v)} chars):')
            print(f'    {v[:300]}')
            if len(v) > 300:
                print(f'    [TAIL]: {v[-150:]}')
