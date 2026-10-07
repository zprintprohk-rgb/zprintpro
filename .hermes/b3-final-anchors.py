# -*- coding: utf-8 -*-
"""Anchors: books en keywords + posters category ja keywords"""
import io, re

csc = io.open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
for block, kw in [('books', 'zine'), ('posters', 'クリア')]:
    i = csc.find("'%s':" % block)
    if i < 0:
        i = csc.find('%s:' % block)
    seg = csc[i:i + 14000]
    k = seg.find('keywords:')
    print('== %s keywords (offset %d):' % (block, i + k))
    print(seg[k:k + 320])
    print('   [%s present: %s]' % (kw, kw in seg[:14000]))
