# -*- coding: utf-8 -*-
# inspect category-seo-content.ts for paper-bags / posters meta fields
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
for slug in ['paper-bags', 'posters']:
    i = t.find("slug: '" + slug + "'")
    print('#####', slug, 'at', i)
    if i < 0:
        print('  NOT FOUND')
        continue
    seg = t[i:i+8000]
    fields = re.findall(r"(title|metaDescription|description|h1)\s*:\s*'((?:[^'\\]|\\.)*)'", seg)
    for fname, fval in fields:
        print('  ', fname, '=', fval[:120])
    print('  FAQ keys present:', seg.count('faq') + seg.count('FAQ'), '| question count:', seg.count('question'))
    # locate locale blocks
    for loc in ['zh-hk', 'en', 'ja']:
        j = seg.find("locale: '" + loc + "'")
        if j >= 0:
            print('  locale block', loc, 'at +' + str(j))
