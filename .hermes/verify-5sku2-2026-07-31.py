#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""verify 7/31 5 SKU 实际改动情况 (line-based)"""
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
        # look back 5 lines, then forward 200 lines
        opt_lines = []
        desc_lines = []
        for j in range(i, min(i+250, len(lines))):
            line = lines[j]
            if 'optimizedAt:' in line:
                opt_lines.append((j+1, line.strip()))
            if 'optimizationRound:' in line:
                opt_lines.append((j+1, line.strip()))
            if line.lstrip().startswith('description:') or line.lstrip().startswith('descriptionEn:') or line.lstrip().startswith('descriptionJa:'):
                desc_lines.append((j+1, line.strip()[:300]))
            if j > i + 1 and re.match(r"\s*slug:\s*'", line):
                break
        print(f'\n=== {slug} (start L{i+1}) ===')
        for ln_num, content_str in opt_lines[:4]:
            print(f'  L{ln_num}: {content_str}')
        for ln_num, content_str in desc_lines[:3]:
            print(f'  L{ln_num}: {content_str[:250]}')
