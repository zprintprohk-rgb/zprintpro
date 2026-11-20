#!/usr/bin/env python3
"""Extract SKU data from products.ts for V22 prompt generation."""
import re
import json
import sys

PRODUCTS_FILE = r'F:\zprintpro-nextjs\src\data\products.ts'
OUTPUT_FILE = r'F:\zprintpro-nextjs\.hermes\k3-inbox\sku-data.json'


def main():
    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match each SKU block: starts with `id: 'XX-XXX'` and goes until next `id: 'XX-XXX'` or end
    sku_pattern = re.compile(
        r"id:\s*'([A-Z]+-\d+)'.*?(?=\n\s*id:\s*'[A-Z]+-\d+'|\Z)",
        re.DOTALL,
    )
    skus = {}
    for m in sku_pattern.finditer(content):
        block = m.group(0)
        sku_id = m.group(1)

        def find(pat, default=''):
            mm = re.search(pat, block)
            return mm.group(1) if mm else default

        sku_code = find(r"sku_code:\s*'([^']+)'")
        slug = find(r"slug:\s*'([^']+)'")
        category = find(r"category:\s*'([^']+)'")
        category_slug = find(r"category_slug:\s*'([^']+)'")
        name_en = find(r"nameEn:\s*'([^']+)'")
        desc_en = find(r"descriptionEn:\s*'([^']+)'")
        # SEO filename EN
        seo_m = re.search(r"en:\s*'(zprintpro-[a-z0-9-]+en\.webp)'", block)
        seo_filename = seo_m.group(1) if seo_m else ''
        # alt EN
        alt_m = re.search(
            r"alt:\s*\{[^}]*?en:\s*'([^']+)'", block, re.DOTALL
        )
        alt_en = alt_m.group(1) if alt_m else ''

        # SKU sequence number (1-based order in file)
        skus[sku_id] = {
            'id': sku_id,
            'sku_code': sku_code,
            'slug': slug,
            'category': category,
            'category_slug': category_slug or category,
            'name_en': name_en,
            'description_en': desc_en,
            'seo_filename': seo_filename,
            'alt_en': alt_en,
        }

    # Save JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(skus, f, ensure_ascii=False, indent=2)

    # Print sample: 1 per prefix
    prefixes = {}
    for sid in skus:
        p = re.match(r'([A-Z]+)-', sid).group(1)
        if p not in prefixes:
            prefixes[p] = sid

    print('=== Sample 1 per prefix ===')
    for p, sid in sorted(prefixes.items()):
        d = skus[sid]
        print(f'\n--- {sid} ({p}) ---')
        print(f'  slug:          {d["slug"]}')
        print(f'  category:      {d["category"]}')
        print(f'  category_slug: {d["category_slug"]}')
        print(f'  nameEn:        {d["name_en"][:80]}')
        print(f'  seo_filename:  {d["seo_filename"]}')
        print(f'  alt_en:        {d["alt_en"][:80]}')
        print(f'  desc_en[:200]: {d["description_en"][:200]}')

    print(f'\nTotal SKUs extracted: {len(skus)}')


if __name__ == '__main__':
    main()
