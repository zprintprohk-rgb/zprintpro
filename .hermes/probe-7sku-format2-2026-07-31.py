#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""probe 7/30 5 SKU complete block (slug to end of object)."""
import re
content = open('src/data/products.ts', encoding='utf-8').read()
# find slug line + 60 lines after
lines = content.split('\n')
for i, ln in enumerate(lines):
    m = re.search(r"slug:\s*'(premium-greeting-cards|foil-stickers|gift-bags|eco-flyers|corrugated-boxes)'", ln)
    if m:
        slug = m.group(1)
        print(f"=== L{i+1} {slug} ===")
        # print from slug line to 100 lines later or next slug, whichever first
        end = min(i+120, len(lines))
        for j in range(i, end):
            line = lines[j]
            # stop at next slug
            if j > i and re.match(r"\s*slug:\s*'", line):
                break
            # trim very long
            if len(line) > 200:
                line = line[:200] + '...'
            print(f"  L{j+1}: {line}")
        print()
