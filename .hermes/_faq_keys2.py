# -*- coding: utf-8 -*-
# dump skuMoneyFAQs structure around its declaration
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
f = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
i = f.find('skuMoneyFAQs')
print(f[i:i+1200])
print('====')
# find the closing brace region and all top-level keys via brace matching
j = f.find('{', i)
depth = 0; k = j
while k < len(f):
    c = f[k]
    if c == '{': depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0:
            break
    k += 1
body = f[j+1:k]
print('body len:', len(body))
import re
keys = re.findall(r'^\s*([a-z0-9-]+)\s*:', body, re.M)
print('top-level keys:', sorted(set(keys)))
print('count:', len(set(keys)))
for t in ['a2-posters', 'a1-posters', 'kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags']:
    print(t, 'covered:', t in set(keys))
