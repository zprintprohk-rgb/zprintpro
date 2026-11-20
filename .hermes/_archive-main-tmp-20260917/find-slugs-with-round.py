#!/usr/bin/env python3
"""Find all slugs that have optimizationRound"""
import re
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
lines = text.split('\n')

# Find lines with optimizationRound and look backward for nearest slug
for i, line in enumerate(lines):
    if 'optimizationRound' in line:
        # Search backward for nearest slug
        for j in range(i, max(0, i-100), -1):
            slug_m = re.search(r"slug:\s*'([^']+)'", lines[j])
            if slug_m:
                print(f'L{i+1}: {lines[i].rstrip()}  <- slug: {slug_m.group(1)}')
                break
