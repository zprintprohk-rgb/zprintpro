# -*- coding: utf-8 -*-
"""Dump en + ja a5-vs-a6 content + check poster blog slugs + cover fields."""
import json, re

for loc in ['en', 'ja']:
    with open(f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    e = d.get('a5-vs-a6-flyer-size')
    print(f"========== {loc} a5-vs-a6-flyer-size ==========")
    print(e['content'])

# poster blog slugs in blog-posts.ts
with open('src/data/blog-posts.ts', 'r', encoding='utf-8') as f:
    bp = f.read()
slugs = re.findall(r"slug:\s*'([^']+)'", bp)
print("\n=== blog slugs (poster related) ===")
print([s for s in slugs if 'poster' in s or 'flyer' in s])

# cover usage in blog-posts.ts
print("\n=== cover: in blog-posts.ts ===")
print(bp.count('cover:'))

# check latest daily blogs entries (lpPosterSizeGuide, lpA5VsA6FlyerSize, lpPosterPrintingPrice)
for name in ['lpPosterSizeGuide', 'lpA5VsA6FlyerSize', 'lpPosterPrintingPrice']:
    idx = bp.find(f'const {name}')
    if idx >= 0:
        print(f"\n--- {name} ---")
        print(bp[idx:idx+700])
