#!/usr/bin/env python3
"""Check 3 SKU optimizationRound + nearby optimizationRound values"""
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()

# Find all optimizationRound occurrences (just count)
import re
all_matches = list(re.finditer(r'optimizationRound:\s*(\d+)', text))
print(f'TOTAL optimizationRound fields: {len(all_matches)}')
# Show distribution
from collections import Counter
counter = Counter(m.group(1) for m in all_matches)
print('Distribution:', dict(counter))

# For 3 target SKUs, find their optimizationRound
lines = text.split('\n')
for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    print(f'\n=== {slug} ===')
    for i, line in enumerate(lines):
        if f"slug: '{slug}'" in line:
            slug_line = i
            # Find nearest optimizationRound
            for j in range(i, min(i+500, len(lines))):
                if 'optimizationRound' in lines[j]:
                    print(f'  L{j+1}: {lines[j].rstrip()}')
                    break
                if 'slug:' in lines[j] and j > i+1:  # next slug
                    break
            break
