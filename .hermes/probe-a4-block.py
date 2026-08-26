"""Find where 7-word went in a4-flyers block"""
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
m = re.search(r"slug:\s*['\"]a4-flyers['\"]", content)
next_slug = re.search(r"\n  slug:\s*['\"]", content[m.end():])
block_end = m.end() + next_slug.start() if next_slug else len(content)
block = content[m.start():block_end]

# 找所有 字段: 'value' 模式
fields = re.findall(r"\b(\w+):\s*'([^']{0,200})", block)
for fname, fval in fields[:25]:
    print(f'  {fname}: ...{fval[-100:]}')

# 找 7-word 出现的具体位置
for keyword in ['餐飲外賣、零售精品、跨境電商', 'Food & Beverage, Retail, Cross-border E-commerce', '飲食・ケータリング、小売・ブティック']:
    idx = block.find(keyword)
    if idx > 0:
        # Find the field name before this position
        # Look back for nearest `:`
        before = block[:idx]
        last_field = re.search(r"\b(\w+):", before[::-1])
        if last_field:
            # Reverse back
            field_name = last_field.group(1)[::-1]
            print(f'\n  "{keyword[:30]}" found at offset {idx}, in field starting ~{field_name}')
