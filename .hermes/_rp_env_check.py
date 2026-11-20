# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['red-packets', 'envelopes', 'cny-2027-red-packets', 'wedding-red-packets']:
    hits = [m.start() for m in re.finditer(r'slug: [\'"]' + slug + r'[\'"]', prod)]
    print('===', slug, 'hits', len(hits), '===')
    for i in hits[:2]:
        seg = prod[i:i+2000]
        fs = {}
        for f in ['price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity']:
            mm = re.search(re.escape(f) + r":\s*(?P<v>'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg)
            if mm:
                fs[f] = mm.group('v')
        name = re.search(r"name: '((?:[^'\\]|\\.)*)'", seg)
        print('  name =', name.group(1)[:55] if name else '?')
        for k, v in fs.items():
            print('  ', k, '=', v)
