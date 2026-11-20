# -*- coding: utf-8 -*-
import io
lines = io.open('src/data/products.ts', encoding='utf-8').read().split('\n')
for i, l in enumerate(lines):
    if "slug: 'postcard-set'" in l or "slug: 'eco-tote-bag'" in l:
        print('slug at line', i+1)
        for j in range(i-3, i+3):
            print(' ', j+1, repr(lines[j][:72]))
        print()
