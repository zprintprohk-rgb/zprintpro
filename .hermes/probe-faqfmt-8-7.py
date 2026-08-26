# -*- coding: utf-8 -*-
"""Check FAQ extraction coverage: test both formats against extractFaqFromHtml regex + check apparel live FAQ schema."""
import re

# The exact regex from page.tsx
regex = re.compile(r'<p><strong>Q:\s*([\s\S]*?)</strong>\s*(?:<br\s*/?>)\s*A:\s*([\s\S]*?)</p>', re.I)

for loc in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8') as f:
        import json
        data = json.load(f)
    # Test a5-vs-a6 (old format) vs apparel (v8 H3 format) vs my new entry
    for slug in ['a5-vs-a6-flyer-size', 'apparel-shopping-bag-printing-guide', 'poster-printing-price-guide']:
        e = data.get(slug)
        if not e:
            print(f"{loc}/{slug}: MISSING")
            continue
        matches = regex.findall(e['content'])
        print(f"{loc}/{slug}: old-format FAQs found = {len(matches)}")
