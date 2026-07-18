#!/usr/bin/env python3
"""Inspect a4-flyers real range"""
import re
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
lines = text.split('\n')

# Find a4-flyers slug
for i, line in enumerate(lines):
    if "slug: 'a4-flyers'" in line:
        slug_line = i
        break
# Show 80 lines from slug_line
out = []
for j in range(slug_line, min(slug_line+80, len(lines))):
    l = lines[j].rstrip()
    # Detect any 'slug:' (next SKU)
    if j > slug_line + 5 and re.search(r"slug:\s*'", l):
        out.append(f'  L{j+1}: {l}  <-- NEXT SKU')
        break
    out.append(f'  L{j+1}: {l}')

with open('C:\\Users\\Administrator\\AppData\\Local\\Temp\\a4-flyers-range.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print('written')
