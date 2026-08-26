"""Fix a4-flyers: 7-word went into description_zh, move to description/descriptionEn/descriptionJa"""
import re

path = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

slug = 'a4-flyers'
ZH_7WORD = ' **適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。'
EN_7WORD = ' **Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.'
JA_7WORD = ' **適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。'

m = re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content)
next_slug = re.search(r"\n  slug:\s*['\"]", content[m.end():])
block_end = m.end() + next_slug.start() if next_slug else len(content)
block = content[m.start():block_end]

# 1. Strip 3-suffix combo from description_zh
# description_zh: '...content...  **適配行業**... **Best for**... **適用業界**...'
# The 3 suffixes are concatenated in this order
combo_pattern = rf"(description_zh:\s*')([\s\S]*?)(\s*{re.escape(ZH_7WORD)}\s*{re.escape(EN_7WORD)}\s*{re.escape(JA_7WORD)})(\s*')"
m_combo = re.search(combo_pattern, block)
if m_combo:
    # Strip the 3-suffix combo (keep description_zh's original content)
    original_content = m_combo.group(2).rstrip()
    new_text = m_combo.group(1) + original_content + m_combo.group(4)
    block = block.replace(m_combo.group(0), new_text, 1)
    print(f'✓ {slug}: stripped 3-suffix combo from description_zh')
else:
    # Try simpler strip
    for sfx in [ZH_7WORD, EN_7WORD, JA_7WORD]:
        if sfx in block:
            block = block.replace(sfx, '', 1)
            print(f'  ✓ {slug}: stripped "{sfx[:30]}..."')

# 2. Add 7-word to description / descriptionEn / descriptionJa
for desc_field, append in [
    ('description', ZH_7WORD),
    ('descriptionEn', EN_7WORD),
    ('descriptionJa', JA_7WORD),
]:
    # Use word boundary to avoid matching description_zh
    pattern = rf"(\b{desc_field}:\s*')([\s\S]+?)('(?=,|\s*\n))"
    m2 = re.search(pattern, block)
    if m2:
        current = m2.group(2)
        # Check if new 7-word already present
        already = ('餐飲外賣、零售精品' in current) or ('Food & Beverage, Retail' in current) or ('飲食・ケータリング' in current)
        if not already:
            new_text = current.rstrip() + append
            old = m2.group(0)
            new = m2.group(1) + new_text + m2.group(3)
            block = block.replace(old, new, 1)
            print(f'  ✓ {slug}.{desc_field}: added 7-word')
        else:
            print(f'  - {slug}.{desc_field}: 7-word already present')
    else:
        print(f'  ? {slug}.{desc_field}: pattern not found')

# Save
content_new = content[:m.start()] + block + content[block_end:]
with open(path, 'w', encoding='utf-8') as f:
    f.write(content_new)
print(f'\nSaved. Total file size: {len(content_new)} chars')
