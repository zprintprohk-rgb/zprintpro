#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Look at R2 append example - foil-stickers (7/29 R2 after 7/22 R1)."""
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Look at foil-stickers - it was R1 7/22 then R2 7/29
for target in ['foil-stickers', 'kraft-paper-bags', 'white-card-bags', 'gift-bags', 'rigid-boxes', 'kraft-paper-packaging-box']:
    print(f'\n=== {target} ===')
    sm = re.search(r"slug:\s*['\"]" + target + r"['\"]", content)
    if not sm:
        print('  NOT FOUND')
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
    for field in ['optimizedAt', 'optimizationRound']:
        fm = re.search(r"^\s*" + field + r":\s*['\"]([^'\"]*?)['\"]", block, re.MULTILINE)
        if fm:
            print(f'  {field}: {fm.group(1)}')

    # Find description and print full
    fm = re.search(r"^\s*description:\s*['\"](.+?)['\"]\s*,?\s*$", block, re.MULTILINE | re.DOTALL)
    if fm:
        v = fm.group(1)
        print(f'  description full:')
        print(f'    {v[:600]}')
        if len(v) > 600:
            print(f'    [...skip {len(v)-600} chars...]')
            print(f'    {v[-300:]}')
    # Also look for descriptionEn and descriptionJa
    for field in ['descriptionEn', 'descriptionJa']:
        fm = re.search(r"^\s*" + field + r":\s*['\"](.+?)['\"]\s*,?\s*$", block, re.MULTILINE | re.DOTALL)
        if fm:
            v = fm.group(1)
            print(f'  {field} (last 300): ...{v[-300:]}')
