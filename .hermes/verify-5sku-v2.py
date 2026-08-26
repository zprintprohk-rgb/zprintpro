"""Tight verify 5 SKU optimization - check description tails"""
import re

with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

target_slugs = ['removable-stickers', 'folded-leaflets', 'same-day-flyers', 'electronics-packaging-box', 'a4-flyers']

for slug in target_slugs:
    m = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
    next_slug = re.search(r"\n\s*slug:\s*['\"]", content[m.end():])
    block_end = m.end() + next_slug.start() if next_slug else len(content)
    block = content[m.start():block_end]

    # Description with multi-line support
    desc_zh = re.search(r"description:\s*'([\s\S]+?)'(?=,|\s*\n)", block)
    desc_en = re.search(r"descriptionEn:\s*'([\s\S]+?)'(?=,|\s*\n)", block)
    desc_ja = re.search(r"descriptionJa:\s*'([\s\S]+?)'(?=,|\s*\n)", block)

    print(f'== {slug} ==')
    if desc_zh:
        has_zh = '餐飲外賣' in desc_zh.group(1)
        print(f'  zh-hk: {has_zh} (tail 100): {desc_zh.group(1)[-100:]}')
    if desc_en:
        has_en = 'Food & Beverage' in desc_en.group(1)
        print(f'  en: {has_en} (tail 100): {desc_en.group(1)[-100:]}')
    if desc_ja:
        has_ja = '飲食・ケータリング' in desc_ja.group(1)
        print(f'  ja: {has_ja} (tail 100): {desc_ja.group(1)[-100:]}')
    print()
