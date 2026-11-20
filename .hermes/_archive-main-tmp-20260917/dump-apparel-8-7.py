# -*- coding: utf-8 -*-
"""Dump apparel-shopping-bag v8 entry (zh-hk) + check page.tsx FAQPage schema logic."""
import json, re

with open('src/data/blog-data/zh-hk.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
e = d.get('apparel-shopping-bag-printing-guide')
if e:
    c = e['content']
    print("=== apparel zh-hk content (full v8 ref) ===")
    print(c)
else:
    print("apparel entry NOT in zh-hk.json, keys with apparel:", [k for k in d if 'apparel' in k])

# page.tsx FAQPage schema logic
with open('src/app/[locale]/blog/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()
idx = page.find('FAQPage')
print("\n=== page.tsx FAQPage schema logic ===")
print(page[max(0,idx-1500):idx+800])
