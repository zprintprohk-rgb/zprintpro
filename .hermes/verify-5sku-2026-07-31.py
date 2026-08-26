#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""verify 7/31 5 SKU 实际改动情况"""
import re
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

content = open('src/data/products.ts', encoding='utf-8').read()
for slug in ['waterproof-stickers', 'same-day-flyers', 'electronics-packaging-box', 'large-bags', 'folding-boxes']:
    # 找 slug 行
    m = re.search(r"slug:\s*'" + re.escape(slug) + r"'.*?(?=slug:\s*'|\}\s*;\s*$)", content, re.DOTALL)
    if m:
        block = m.group(0)
        opt = re.findall(r"optimizedAt:\s*'([^']+)'", block)
        rnd = re.findall(r"optimizationRound:\s*(\d+)", block)
        # description 字段 (取最前 200 chars + 末尾 200 chars)
        desc_match = re.search(r"description:\s*'([^']*)'", block)
        if desc_match:
            desc = desc_match.group(1)
            desc_show = (desc[:100] + '...' + desc[-300:]) if len(desc) > 400 else desc
            print(f'\n=== {slug} ===')
            print(f'  optimizedAt={opt} round={rnd}')
            print(f'  description (head 100): {desc[:100]}')
            print(f'  description (tail 300): {desc[-300:]}')
            print(f'  適配行業 in desc: {"適配行業" in desc} / 适配行业 in desc: {"适配行业" in desc}')
        else:
            print(f'  [{slug}] desc=NOT_FOUND')
    else:
        print(f'  [{slug}] NOT FOUND')
