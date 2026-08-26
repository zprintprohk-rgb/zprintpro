# -*- coding: utf-8 -*-
"""Verify FAQ extraction + schema generation for poster-printing-price-guide."""
import re, json

# Exact regex from page.tsx extractFaqFromHtml
regex = re.compile(r'<p><strong>Q:\s*([\s\S]*?)</strong>\s*(?:<br\s*/?>)\s*A:\s*([\s\S]*?)</p>', re.I)

for loc in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    e = data['poster-printing-price-guide']
    matches = regex.findall(e['content'])
    print(f"{loc}: FAQs extracted = {len(matches)}")
    for q, a in matches:
        qq = re.sub(r'<[^>]+>', '', q).strip()
        aa = re.sub(r'<[^>]+>', '', a).strip()
        print(f"  Q: {qq[:60]}")
        print(f"  A: {aa[:60]}")
