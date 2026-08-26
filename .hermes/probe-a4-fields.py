"""Check a4-flyers exact description values"""
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
m = re.search(r"slug:\s*['\"]a4-flyers['\"]", content)
next_slug = re.search(r"\n  slug:\s*['\"]", content[m.end():])
block_end = m.end() + next_slug.start() if next_slug else len(content)
block = content[m.start():block_end]
# Look for 7-word occurrences
zh_7word = '餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動'
en_7word = 'Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations'
ja_7word = '飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント'
print(f'Has zh 7-word: {zh_7word in block}')
print(f'Has en 7-word: {en_7word in block}')
print(f'Has ja 7-word: {ja_7word in block}')

# Try the original regex manually
desc_field = 'descriptionEn'
pattern = rf"({desc_field}:\s*')(.+?)('[\s,]*\n)"
m2 = re.search(pattern, block, re.DOTALL)
if m2:
    print(f'Found {desc_field} via regex: tail 50: ...{m2.group(2)[-50:]}')
else:
    print(f'NOT FOUND via regex: {desc_field}')

# Also look at exact text between description: ' and the next '
print()
print('--- Look for descriptionEn: ---')
idx = block.find('descriptionEn:')
if idx >= 0:
    # Find next ' after descriptionEn:
    quote1 = block.find("'", idx)
    quote2 = block.find("'", quote1+1)
    print(f'  Between quotes (first 100): {block[quote1+1:quote1+101]}')
    print(f'  Between quotes (last 100):  {block[quote2-100:quote2]}')
