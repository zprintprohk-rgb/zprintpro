"""Audit mailer-boxes PDP - 5 dimensions"""
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
m = re.search(r"slug:\s*['\"]mailer-boxes['\"]", content)
next_slug = re.search(r"\n  slug:\s*['\"]", content[m.end():])
if next_slug:
    block = content[m.start():m.end()+next_slug.start()]
else:
    block = content[m.start():m.start()+8000]

# 提取 关键字段
fields = ['title_zh', 'title_en', 'title_ja', 'nameEn', 'nameJa',
          'description', 'descriptionEn', 'descriptionJa', 'description_zh',
          'longDescription', 'longDescriptionEn', 'longDescriptionJa',
          'price_range', 'basePrice', 'moq',
          'optimizedAt', 'optimizationRound']
for fname in fields:
    pattern = rf"{fname}:\s*'([\s\S]+?)'"
    mm = re.search(pattern, block)
    if mm:
        text = mm.group(1).strip()
        print(f'\n== {fname} (len {len(text)}) ==')
        print(f'  preview: {text[:300]}')
        if len(text) > 300:
            print(f'  ...')
            print(f'  tail: ...{text[-150:]}')
    else:
        # Try double-quote
        pattern2 = rf'{fname}:\s*"([\s\S]+?)"'
        mm2 = re.search(pattern2, block)
        if mm2:
            text = mm2.group(1).strip()
            print(f'\n== {fname} (double-quote, len {len(text)}) ==')
            print(f'  preview: {text[:300]}')
