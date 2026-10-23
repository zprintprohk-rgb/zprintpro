# -*- coding: utf-8 -*-
# B1: money-FAQ coverage gap analysis — skuMoneyFAQs keys vs products.ts slugs
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

pf = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
# keys of skuMoneyFAQs block
block = pf[pf.find('export const skuMoneyFAQs'):]
block = block[:block.find('\n};')]
keys = re.findall(r"^\s{2}['\"]([a-z0-9-]+)['\"]:", block, re.M)
print('skuMoneyFAQs covered:', len(keys))
print(sorted(keys))

pr = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
slugs = sorted(set(re.findall(r"slug:\s*'([a-z0-9-]+)'", pr)))
print('\nproducts.ts slugs:', len(slugs))
missing = [s for s in slugs if s not in keys]
print('\nmissing money-FAQ (%d):' % len(missing))
for s in missing: print(' ', s)
