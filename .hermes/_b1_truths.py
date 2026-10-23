# -*- coding: utf-8 -*-
# B1 truth extraction for 7 target SKUs from products.ts
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
raw = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
targets = ['textbooks', 'exercise-books', 'certificates', 'greeting-cards',
           'wedding-invitations', 'envelopes', 'roll-up-banners']
for slug in targets:
    i = raw.find(f"slug: '{slug}'")
    if i < 0:
        i = raw.find(f'"{slug}"')
    print(f'=== {slug} @ {i} ===')
    if i < 0:
        continue
    seg = raw[i:i+3500]
    for field in ['nameZh', 'nameEn', 'nameJa', 'minQuantity', 'basePrice',
                  'basePriceEn', 'basePrice_en', 'basePriceJa', 'basePrice_ja',
                  'price_range', 'priceRange', 'turnaround', 'deliveryTime']:
        m = re.search(re.escape(field) + r":\s*('[^']*'|\"[^\"]*\"|[0-9]+)", seg)
        if m:
            print(f'  {field}: {m.group(1)}')
