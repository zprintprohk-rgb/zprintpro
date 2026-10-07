# -*- coding: utf-8 -*-
"""B3 anchors: greeting-cards ja faq tail + japan-doujin en keywords + a2-posters CSV ja kw"""
import io, re

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
# greeting-cards block faq region
i = csc.find('greeting-cards')
seg = csc[i:i + 9000]
j = seg.find('faq: [')
print('greeting faq at offset', i + j)
print(seg[j:j + 600])
