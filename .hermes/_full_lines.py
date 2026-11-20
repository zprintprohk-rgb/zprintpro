# -*- coding: utf-8 -*-
# full lines for editing + a1 skuMoneyFAQs
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
lines = t.split('\n')
for ln in [3298, 3360, 3396, 3458, 3494, 3556, 3598, 3616, 3679, 3694, 3705, 3708, 3712, 3730, 3805, 3816, 3819, 3823, 3841, 3915, 3926, 3929]:
    print(f'L{ln}: {lines[ln-1].strip()}')
    print()

f = open(r'F:\zprintpro-nextjs\src\data\product-faqs.ts', encoding='utf-8').read()
i = f.find('skuMoneyFAQs')
j = f.find('{', i)
# find 'a1-posters' key
k = f.find("'a1-posters': [", j)
print('a1-posters in skuMoneyFAQs:', k >= 0)
if k >= 0:
    print(f[k:k+900])
