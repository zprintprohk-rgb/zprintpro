# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['food-packaging', 'food-paper-boxes', 'food-boxes', 'food-grade-boxes']:
    i = prod.find("slug: '" + slug + "'")
    if i < 0:
        print(slug, 'NOT FOUND'); continue
    seg = prod[i:i+2200]
    print(f'=== {slug} ===')
    for f in ['price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity']:
        m = re.search(re.escape(f) + r":\s*(?P<v>'((?:[^'\\]|\\.)*)'|\[[^\]]*\]|[0-9.]+)", seg)
        if m: print(f'  {f} = {m.group("v")[:70]}')
    print()
# find all slugs containing food/食品
for m in re.finditer(r"slug: '([^']*(food|食品|packaging)[^']*)'", prod):
    print('slug hit:', m.group(1))
