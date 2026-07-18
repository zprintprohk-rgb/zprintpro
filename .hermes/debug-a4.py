#!/usr/bin/env python3
"""Debug: find_next_slug_pos for a4-flyers"""
import re
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
m = re.search(r"slug:\s*'a4-flyers'", text)
slug_pos = m.start()
print(f'a4-flyers slug_pos = {slug_pos}')
# Find next slug:
next_m = re.search(r"slug:\s*'", text[slug_pos + 10:])
print(f'next slug pos (relative) = {next_m.start() if next_m else "NOT FOUND"}')
print(f'next slug (absolute) = {slug_pos + 10 + next_m.start() if next_m else "N/A"}')
# Show what's at the next slug pos
if next_m:
    abs_pos = slug_pos + 10 + next_m.start()
    print(f'around next slug: {text[abs_pos-50:abs_pos+200]!r}')

# Find minQuantity in [slug_pos, next_slug_pos]
if next_m:
    next_abs = slug_pos + 10 + next_m.start()
    range_text = text[slug_pos:next_abs]
    minq_m = re.search(r'\bminQuantity:\s*\d+,', range_text)
    print(f'\nminQuantity in range: {minq_m}')
    if minq_m:
        print(f'  pos (relative): {minq_m.start()}')
        print(f'  match: {minq_m.group()!r}')
    # Try with simpler regex
    print(f'\nDirect find minQuantity: in sku range')
    for m2 in re.finditer(r'minQuantity', range_text):
        print(f'  pos {m2.start()}: {range_text[max(0,m2.start()-20):m2.start()+50]!r}')
