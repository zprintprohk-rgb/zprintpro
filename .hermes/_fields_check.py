# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['white-card-boxes', 'doujinshi-printing', 'a2-posters', 'a1-posters', 'flyers', 'a5-flyers', 'same-day-flyers']:
    i = prod.find("slug: '" + slug + "'")
    if i < 0:
        # try variant: slug: "..." or id
        m2 = re.search(r'slug:\s*["\']' + re.escape(slug) + r'["\']', prod)
        print(slug, 'NOT FOUND' if not m2 else 'FOUND alt at ' + str(m2.start()))
        continue
    seg = prod[i:i+3000]
    fs = {}
    for f in ['name', 'nameEn', 'nameJa', 'price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity', 'category_slug']:
        m = re.search(re.escape(f) + r":\s*(?P<v>'((?:[^'\\]|\\.)*)'|\[[^\]]*\]|[0-9.]+)", seg)
        if m: fs[f] = m.group('v')[:50]
    print(f'=== {slug} ===')
    for k, v in fs.items(): print(f'  {k} = {v}')
