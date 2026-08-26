#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""详细看 5 SKU description 末尾"""
import re
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

content = open('src/data/products.ts', encoding='utf-8').read()
lines = content.split('\n')
for i, ln in enumerate(lines):
    m = re.search(r"slug:\s*'(waterproof-stickers|same-day-flyers|electronics-packaging-box|large-bags|folding-boxes)'", ln)
    if m:
        slug = m.group(1)
        # find end (next slug)
        end = len(lines) - 1
        for j in range(i + 1, len(lines)):
            if re.match(r"\s*slug:\s*'", lines[j]):
                end = j - 1
                break
        # find description field line
        for k in range(i, end + 1):
            line = lines[k]
            if line.lstrip().startswith('description:'):
                # description spans multiple lines? find closing `',` at line end
                # If ends with `',` it's single-line; if ends with `'` not `,` it might be multi-line
                stripped = line.rstrip()
                if stripped.endswith("',"):
                    # single-line
                    print(f'  [{slug}] L{k+1} single-line desc, last 200 chars: ...{stripped[-200:]}')
                else:
                    print(f'  [{slug}] L{k+1} multi-line desc? stripped[-50:]={stripped[-50:]}')
                break
        # find optimizedAt
        for k in range(i, end + 1):
            if 'optimizedAt:' in lines[k]:
                print(f'  [{slug}] L{k+1} {lines[k].strip()}')
                break
