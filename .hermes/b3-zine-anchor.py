# -*- coding: utf-8 -*-
"""Locate japan-doujin en keywords + a2-posters CSV ja kw current values"""
import io, re

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = csc.find('japan-doujin')
seg = csc[i:i + 12000]
k = seg.find('keywords:')
print('japan-doujin keywords segment:')
print(seg[k:k + 400])
print('\nzine present:', 'zine' in seg[:12000])

lines = io.open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8').read().split('\n')
for l in lines[1:]:
    f = l.split('\t')
    if len(f) > 10 and f[3].strip() == 'a2-posters':
        print('\na2-posters ja kw:', f[10][:300])
