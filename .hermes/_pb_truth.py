# -*- coding: utf-8 -*-
# products.ts paper-bags + posters price anchors (truth check for featuredSnippets)
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
# paper-bag SKUs
for slug in ['kraft-paper-bags', 'white-card-bags', 'eco-paper-bags', 'gift-bags', 'large-bags', 'handle-bags', 'paper-bags']:
    for m in re.finditer(r"slug: '" + slug + "'", t):
        s = max(0, m.start()-400)
        seg = t[s:m.end()+2600]
        fields = {}
        for f in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range']:
            fm = re.search(re.escape(f) + r":\s*('[^']*'|[0-9]+)", seg)
            if fm:
                fields[f] = fm.group(1)
        print(slug, fields)
        break
print('---')
# posters SKUs
for slug in ['a2-posters', 'a1-posters', 'posters']:
    for m in re.finditer(r"slug: '" + slug + "'", t):
        s = max(0, m.start()-400)
        seg = t[s:m.end()+2000]
        fields = {}
        for f in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range']:
            fm = re.search(re.escape(f) + r":\s*('[^']*'|[0-9]+)", seg)
            if fm:
                fields[f] = fm.group(1)
        print(slug, fields)
        break
