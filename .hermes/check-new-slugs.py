#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
files = ['src/data/blog-data/zh-hk.json','src/data/blog-data/en.json','src/data/blog-data/ja.json']
for f in files:
    with open(f, 'rb') as fh:
        b = fh.read()
    # strip BOM if present
    if b[:3] == b'\xef\xbb\xbf':
        b = b[3:]
    s = b.decode('utf-8', errors='replace')
    for kw in ['thick-paper-flyer-printing-restaurant-takeout-guide',
               'magnetic-closure-gift-box-ecommerce-brand-guide',
               'folding-box-cosmetics-brand-eco-friendly-guide']:
        n = s.count('"' + kw)
        print(f, kw, 'count =', n)
    print('---')
