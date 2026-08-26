#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Verify internal link targets exist: products + categories."""
import os, re, json

os.chdir(r'F:\zprintpro-nextjs')

# products
p = open('src/data/products.ts', encoding='utf-8').read()
prod_slugs = re.findall(r"slug:\s*'([^']+)'", p)
print('=== products with poster/a1/a2 ===')
for s in prod_slugs:
    if 'poster' in s or 'a1' in s or 'a2' in s or 'display' in s:
        print(' -', s)
print('total products:', len(prod_slugs))

# categories
cat = open('src/data/categories.ts', encoding='utf-8').read() if os.path.exists('src/data/categories.ts') else ''
if not cat:
    import glob
    for f in glob.glob('src/data/*.ts'):
        c = open(f, encoding='utf-8').read()
        if 'posters' in c and ('slug' in c):
            cat = c
            print('categories file:', f)
            break
cat_slugs = re.findall(r"slug:\s*'([^']+)'", cat)
print('=== category slugs ===')
for s in sorted(set(cat_slugs)):
    print(' -', s)

# check poster-size-guide full zh-hk content from JSON for template reference (first 3000 chars)
d = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))
c = d.get('poster-size-guide', {}).get('content', '')
print()
print('=== poster-size-guide zh-hk content (length %d) ===' % len(c))
print(c[:3500])
