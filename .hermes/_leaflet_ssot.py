# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
lines = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read().split('\n')
# find slugs containing 'flyer' or 'leaflet' or 'brochure' and print price fields nearby
for i, t in enumerate(lines):
    m = re.search(r"slug: '([^']*(flyer|leaflet|brochure|摺|fold)[^']*)'", t)
    if m:
        seg = lines[i:i+60]
        fs = []
        for j, s in enumerate(seg):
            fm = re.search(r"(price_range|basePrice|basePrice_en|basePrice_ja|minQuantity):\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", s)
            if fm:
                fs.append(f'L{i+j+1} {fm.group(1)}={fm.group(2)[:45]}')
        print('##', m.group(1), '|', ' | '.join(fs))
