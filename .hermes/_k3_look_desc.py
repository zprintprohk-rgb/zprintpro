# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    src = f.read()
m = re.search(r"longDescription:\s*'([^']{50,500})'", src)
if m:
    print('zh-hk longDescription example:')
    print(m.group(1)[:500])
print()
m = re.search(r"longDescriptionEn:\s*'([^']{50,500})'", src)
if m:
    print('en longDescriptionEn example:')
    print(m.group(1)[:500])
print()
m = re.search(r"longDescriptionJa:\s*'([^']{50,500})'", src)
if m:
    print('ja longDescriptionJa example:')
    print(m.group(1)[:500])
