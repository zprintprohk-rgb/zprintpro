# -*- coding: utf-8 -*-
# B1 corrected gap: product-array-only slugs vs skuMoneyFAQs keys + truth extraction for final 7
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pr = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
arr = pr[pr.find('export const products:'):]
prod_slugs = re.findall(r"slug:\s*'([a-z0-9-]+)'", arr)
print('product SKUs:', len(prod_slugs))

pf = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
block = pf[pf.find('export const skuMoneyFAQs'):]
block = block[:block.find('\n};')]
keys = re.findall(r"^\s{2}['\"]([a-z0-9-]+)['\"]:", block, re.M)
covered = [s for s in prod_slugs if s in keys]
missing = [s for s in prod_slugs if s not in keys]
print('covered:', len(covered), '/', len(prod_slugs))
print('missing (%d):' % len(missing))
for s in missing: print(' ', s)

print()
targets = ['textbooks', 'exercise-books', 'certificates', 'perfect-bound-books',
           'foil-greeting-cards', 'roll-up-banners', 'business-envelopes']
for slug in targets:
    i = arr.find(f"slug: '{slug}'")
    print(f'=== {slug} ===')
    if i < 0:
        print('  NOT FOUND'); continue
    seg = arr[i:i+3000]
    for field in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range']:
        m = re.search(re.escape(field) + r":\s*('[^']*'|[0-9]+)", seg)
        if m:
            print(f'  {field}: {m.group(1)}')
        else:
            print(f'  {field}: (none)')
