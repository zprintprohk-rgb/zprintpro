# -*- coding: utf-8 -*-
"""Get poster SKU display titles for anchor text."""
import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    p = f.read()

# Find blocks for poster slugs
for slug in ['a1-posters', 'a2-posters', 'outdoor-posters', 'display-posters', 'art-posters', 'adhesive-posters']:
    idx = p.find(f"slug: '{slug}'")
    if idx < 0:
        print(f"{slug}: NOT FOUND")
        continue
    block = p[idx:idx+4000]
    m = re.search(r"title_zh:\s*'([^']+)'", block)
    me = re.search(r"title_en:\s*'([^']+)'", block)
    mj = re.search(r"title_ja:\s*'([^']+)'", block)
    print(f"{slug}: zh={m.group(1) if m else '?'} | en={me.group(1) if me else '?'} | ja={mj.group(1) if mj else '?'}")
