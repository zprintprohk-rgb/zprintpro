# -*- coding: utf-8 -*-
"""
fix-products-l1898-v5-2026-07-31.py

L1898 ST-WP waterproof-stickers 当前错乱状态:
  description_zh: 'A' 适配行业: B 'C',
其中 A=...車身貼紙等場景。, B=餐飲外賣/零售精品/.../品牌活動。, C=空

v4 删了 '**' 但没合并字符串, 现在 L1898 还是 syntax 错.

v5 修法: 用 regex 找 'A' 适配行业: B 'C' 模式, 合并成 'A 适配行业: B'
"""
import io
import sys
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PROD = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD, 'r', encoding='utf-8') as f:
    content = f.read()

# pattern: 'A' 适配行业: B 'C',  ->  'A 适配行业: B',
# A = 以 '場景。' 结尾
# B = 以 '品牌活動。' 结尾 (简体/繁体都行)
# C = empty before ',

# 用 regex: 找 "ST-WP 适配行业" 行:  'XXX' 适配行业: YYY 'ZZZ',
# 更简单: 在 L1898 找  '...場景。' 适配行业: ... ' , ->  '...場景。 适配行业: ... ',

# 用 regex 模式:  '([^']*?場景。)' \s* 适配行业: \s* ([^']*?品牌活動。) '\s*,
# 替换成 r"\1 适配行业: \2",

pattern = r"'(.*?場景。)'\s*适配行业:\s*(.*?品牌活動。)'\s*,"
m = re.search(pattern, content)
if m:
    before = m.group(0)
    after = "'{0} 适配行业: {1}',".format(m.group(1), m.group(2))
    content = content.replace(before, after)
    print(f'[v5] pattern found, before/after len = {len(before)}/{len(after)}')
    print(f'[v5] BEFORE: {before[:150]}')
    print(f'[v5] AFTER:  {after[:150]}')
    with io.open(PROD, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    print('[v5] saved products.ts')
else:
    print('[v5] pattern NOT FOUND')
    sys.exit(1)

# verify
with io.open(PROD, 'r', encoding='utf-8') as f:
    lines = f.readlines()
print('=== verify L1894-1900 ===')
for i in range(1893, 1902):
    if i < len(lines):
        sys.stdout.write('  L{0:4}: {1}\n'.format(i+1, lines[i].rstrip()[:200]))
