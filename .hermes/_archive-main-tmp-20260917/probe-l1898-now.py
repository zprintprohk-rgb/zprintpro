# -*- coding: utf-8 -*-
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
with io.open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
lines = content.split('\n')
# L1898
print(f'L1898: {lines[1897]!r}')
print()
# 找 4 个 markdown **适配行业** 残留位置 (在 description_zh 外)
import re
for m in re.finditer(r"\*\*适配行业\*\*", content):
    pos = m.start()
    # 找上下文 (前后 200 char)
    print(f'pos {pos}: {content[max(0,pos-100):pos+150]!r}')
    print()
