# -*- coding: utf-8 -*-
"""Check: getContentFromJson logic in page.tsx, poster SKUs in products.ts, en/ja a5 ref lengths."""
import json, re

# 1. getContentFromJson in page.tsx
with open('src/app/[locale]/blog/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()
m = re.search(r'function getContentFromJson.*?(?=\n\})', page, re.S)
if m:
    print("=== getContentFromJson ===")
    print(m.group(0)[:600])
else:
    idx = page.find('getContentFromJson')
    print("found at", idx)
    print(page[idx-200:idx+800])

# 2. Poster SKUs in products.ts
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products = f.read()
slugs = re.findall(r"slug:\s*'([^']+)'", products)
print("\n=== all product slugs ===")
print(slugs)
poster_related = [s for s in slugs if any(k in s for k in ['poster', 'banner', 'a1', 'a2', 'a3'])]
print("poster-related slugs:", poster_related)

# 3. en/ja a5 entries lengths
for loc in ['en', 'ja']:
    with open(f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    e = d.get('a5-vs-a6-flyer-size')
    if e:
        print(f"\n=== {loc} a5-vs-a6: title={e['title'][:80]} len={len(e['content'])}")
