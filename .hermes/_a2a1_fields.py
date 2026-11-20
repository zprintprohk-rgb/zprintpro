# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['a2-posters', 'a1-posters']:
    i = prod.find("slug: '" + slug + "'")
    seg = prod[i:i+2500]
    print(f'=== {slug} ===')
    for f in ['price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity', 'nameEn', 'nameJa']:
        m = re.search(re.escape(f) + r":\s*(?P<v>'((?:[^'\\]|\\.)*)'|\[[^\]]*\]|[0-9.]+)", seg)
        if m:
            print(f'  {f} = {m.group("v")[:80]}')
    # price tables nearby
    mt = re.search(r'priceTables|tiers|quantityTiers', seg)
    if mt:
        print('  has priceTables/tiers marker at', mt.start())
    print()
