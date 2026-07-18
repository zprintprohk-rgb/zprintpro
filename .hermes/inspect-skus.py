#!/usr/bin/env python3
"""Check 3 SKU existing optimizedAt status"""
import re
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
lines = text.split('\n')

for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    print(f'\n=== {slug} ===')
    # Find slug anchor
    for i, line in enumerate(lines):
        if f"slug: '{slug}'" in line or f'slug: "{slug}"' in line:
            print(f'  L{i+1}: {line.rstrip()}')
            # Show next 20 lines
            for j in range(i+1, min(i+30, len(lines))):
                l = lines[j]
                if 'optimizedAt' in l or 'optimizationRound' in l or 'minQuantity' in l:
                    print(f'  L{j+1}: {l.rstrip()}')
            break
