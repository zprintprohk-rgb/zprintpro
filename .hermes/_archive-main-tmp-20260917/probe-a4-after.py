"""Check a4-flyers block after my edits"""
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
m = re.search(r"slug:\s*['\"]a4-flyers['\"]", content)
block_end = content.find('\n  slug:', m.end())
block = content[m.start():block_end]
# 找 description, descriptionEn, descriptionJa - multi-line support
for f in ['description', 'descriptionEn', 'descriptionJa']:
    pattern = rf"{f}:\s*'([\s\S]+?)',"
    m2 = re.search(pattern, block)
    if m2:
        print(f'== {f} ==')
        print(f'  tail 250: ...{m2.group(1)[-250:]}')
        print(f'  has 7-word: {("餐飲外賣" in m2.group(1) and "品牌活動" in m2.group(1))}')
        print()
