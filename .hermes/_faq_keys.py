# -*- coding: utf-8 -*-
# skuMoneyFAQs coverage via quoted keys
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
f = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
i = f.find('skuMoneyFAQs')
seg = f[i:i+60000]
keys = re.findall(r"['\"]([a-z0-9-]+)['\"]\s*:\s*\{", seg)
print('quoted keys:', sorted(set(keys)))
print('count:', len(set(keys)))
for t in ['a2-posters', 'a1-posters', 'kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags']:
    print(t, 'covered:', t in keys)
