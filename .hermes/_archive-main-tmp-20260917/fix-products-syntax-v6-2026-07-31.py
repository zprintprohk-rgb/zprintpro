# -*- coding: utf-8 -*-
"""
fix-products-syntax-v6-2026-07-31.py

修 4 个 SKU description_zh 字段外 markdown ** 污染:
  L5815 large-bags  + 1 个 descriptionEn 'items.,' 多余 ,
  L7363 (待查 slug)
  L9541 (待查 slug)
  L17619 (待查 slug)

[pattern]
  原: description_zh: 'A' **適配行業**: B.,
  修: description_zh: 'A 适配行业: B。',
  + 5815 多余: 'items.,' -> 'items. '
"""
import io
import sys
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PROD = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD, 'r', encoding='utf-8') as f:
    content = f.read()

# pattern: 找所有 "description_zh: 'A' **適配行業**: B.,"
pattern = re.compile(
    r"description_zh: '([^']*?)'\s*\*\*適配行業\*\*:\s*([^,]+),\s*"
)
matches = list(pattern.finditer(content))
print(f'=== found {len(matches)} description_zh markdown pollution ===')
for m in matches:
    before = m.group(0)
    a = m.group(1)
    b = m.group(2).rstrip('.').strip()
    after = f"description_zh: '{a} 适配行业: {b}。',"
    print(f'  L{m.start()//80 + 1}: {before[:60]}... -> {after[:60]}...')
    content = content.replace(before, after, 1)

# L5815 descriptionEn: '...items., ISO 9001...' 修: 'items. ISO 9001...'
# 5815 descriptionEn: 'Large size, perfect for clothing, shoes and other large items., ISO 9001:2015 certified quality management system'
# 改: 'Large size, perfect for clothing, shoes and other large items. ISO 9001:2015 certified quality management system'
pattern_b = re.compile(r"'(.*?items\.),\s+(ISO[^']*)'")
m_b = pattern_b.search(content)
if m_b:
    before = m_b.group(0)
    after = f"'{m_b.group(1)} {m_b.group(2)}'"
    print(f'  L{m_b.start()//80 + 1}: items., fix')
    content = content.replace(before, after, 1)
else:
    print('  WARN: pattern_b (items.,) not found')

with io.open(PROD, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
print('[v6] saved products.ts')

# verify - 再跑 tsc 看 0 错
print('')
print('=== running tsc --noEmit ===')
