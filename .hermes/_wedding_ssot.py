# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
# wedding-invitation SKUs
for m in re.finditer(r"slug: '([a-z0-9-]*wedding[a-z0-9-]*)'.{0,700}", prod, re.S):
    seg = m.group(0)
    fs = []
    for f in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range']:
        fm = re.search(re.escape(f) + r":\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg)
        if fm:
            fs.append(f'{f}={fm.group(1)[:50]}')
    print('##', m.group(1), '|', ' | '.join(fs))
print()
# also foil wedding title sku
for m in re.finditer(r"slug: '([a-z0-9-]*foil[a-z0-9-]*)'.{0,700}", prod, re.S):
    seg = m.group(0)
    fs = [f'{f}={fm.group(1)[:50]}' for f in ['minQuantity', 'basePrice', 'basePrice_en', 'price_range'] for fm in [re.search(re.escape(f) + r":\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg)] if fm]
    print('##', m.group(1), '|', ' | '.join(fs))
