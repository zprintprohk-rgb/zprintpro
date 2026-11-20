# -*- coding: utf-8 -*-
import io, re, sys
t = io.open('src/data/products.ts', encoding='utf-8').read()
for slug in ['foil-stickers','security-stickers','fluorescent-stickers','die-cut-stickers','removable-stickers','small-batch-stickers']:
    i = t.index("slug: '%s'" % slug)
    seg = t[i:i+9000]
    j = seg.find('variables:')
    k = seg.find('seoImages', j)
    print('==== %s' % slug)
    print(seg[j:k][:1400])
    print()
