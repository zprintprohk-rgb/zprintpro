# -*- coding: utf-8 -*-
"""Verify all internal links in poster-printing-price-guide are valid (200-able routes)."""
import json, re, subprocess

# Collect all hrefs from the 3 locale entries
hrefs = set()
for loc in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    c = data['poster-printing-price-guide']['content']
    for m in re.finditer(r'href="([^"]+)"', c):
        hrefs.add(m.group(1))

print(f"Total unique hrefs: {len(hrefs)}")
for h in sorted(hrefs):
    print(f"  {h}")

# Verify product slugs exist in products.ts and blog slugs in blog-posts.ts
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = f.read()
with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    blogs = f.read()
with open('src/data/buying-guides.ts', 'r', encoding='utf-8') as f:
    guides = f.read()

# Valid route patterns per AGENTS.md: /{locale}/category/<slug>/, /{locale}/product/<slug>/, /{locale}/blog/<slug>/, /{locale}/quote/
import os
ok = True
for h in sorted(hrefs):
    parts = h.strip('/').split('/')
    if len(parts) == 2 and parts[1] == 'quote':
        print(f"  OK quote: {h}")
        continue
    if len(parts) != 3:
        print(f"  ?? unexpected path: {h}")
        ok = False
        continue
    loc, kind, slug = parts
    slug = slug.rstrip('/')
    if kind == 'product':
        exists = f"slug: '{slug}'" in products
    elif kind == 'blog':
        exists = f"slug: '{slug}'" in blogs
    elif kind == 'category':
        exists = f"'{slug}'" in products  # category slugs also in products.ts list
    else:
        exists = False
    status = "OK" if exists else "MISSING!"
    if not exists:
        ok = False
    print(f"  {status}: {h}")
print(f"\nALL LINKS VALID: {ok}")
