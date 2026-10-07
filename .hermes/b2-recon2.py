# -*- coding: utf-8 -*-
"""Clean SKU/category classification: slug + minQuantity within 800 chars = SKU"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
targets = ['greeting-cards', 'japan-doujin', 'doujinshi-printing', 'postcard-set',
           'eco-tote-bag', 'calendars', 'envelopes', 'graduation-yearbook',
           'banners', 'books', 'menus', 'posters', 'stickers', 'flyers', 'packaging',
           'paper-bags', 'red-packets', 'educational', 'wedding-invitations']
sku, cat = [], []
for t in targets:
    i = ts.find("slug: '%s'" % t)
    if i < 0:
        print('%-24s MISSING' % t); continue
    seg = ts[i:i + 800]
    if re.search(r'minQuantity:\s*\d+', seg):
        sku.append(t); kind = 'SKU'
    else:
        cat.append(t); kind = 'CATEGORY'
    print('%-24s %s' % (t, kind))
print('\nSKU:', sku)
print('CATEGORY:', cat)
