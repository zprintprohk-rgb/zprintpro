#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Show tail of Q-006 en + ja content (CTA/Author/Sources) for template."""
import os, json

os.chdir(r'F:\zprintpro-nextjs')

for loc in ['en', 'ja']:
    d = json.load(open(f'src/data/blog-data/{loc}.json', encoding='utf-8'))
    c = d['tea-beverage-gift-box-printing-guide']['content']
    print(f'=== {loc} tail (len {len(c)}) ===')
    print(c[-3200:])
    print()
