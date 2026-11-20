#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""probe 7/30 5 SKU optimizedAt / optimizationRound format"""
import re
content = open('src/data/products.ts', encoding='utf-8').read()
# Find each of 7/30 5 SKUs
for slug in ['premium-greeting-cards', 'foil-stickers', 'gift-bags', 'eco-flyers', 'corrugated-boxes']:
    m = re.search(r"slug:\s*'" + re.escape(slug) + r"'.*?optimizedAt:\s*'2026-07-30'", content, re.DOTALL)
    if m:
        s = m.group(0)
        # show 500 chars around the end (description area)
        idx = s.find("description_zh")
        if idx > 0:
            print(f"=== {slug} ===")
            print(s[max(0,idx-200):idx+800])
            print("---")
        else:
            print(f"=== {slug} (no description_zh) ===")
            print(s[-1000:])
            print("---")
    else:
        print(f"NOT FOUND: {slug}")
