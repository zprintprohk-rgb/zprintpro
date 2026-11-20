# -*- coding: utf-8 -*-
# precise dump of categorySeoData paper-bags + posters descriptions; find 1.84 source; posters pricing semantics
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()

# 1. locate categorySeoData dict and dump paper-bags/posters blocks verbatim
i = seo.find('categorySeoData')
print('categorySeoData at', i)
# find the object literal: it starts with a { after ':'
j = seo.find('=', i)
seg = seo[j:j+3000]
print(seg[:1500])
print('...')
# 2. 1.84 search
for m in re.finditer(r'1\.84', prod):
    s = max(0, m.start()-80)
    print('products.ts 1.84 ctx:', prod[s:m.end()+40].replace('\n', ' ')[:130])
print()
# 3. a2-posters / a1-posters full price fields + quantities
for slug in ['a2-posters', 'a1-posters']:
    m = re.search(r"slug: '" + slug + r"'.{0,2600}", prod, re.S)
    if m:
        seg2 = m.group(0)
        # print all price-ish fields + quantities
        for f in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range', 'quantities', 'name']:
            fm = re.search(re.escape(f) + r":\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg2)
            if fm:
                print(slug, '|', f, '=', fm.group(1)[:140])
        print()
