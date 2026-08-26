# -*- coding: utf-8 -*-
"""
scan-products-pattern-2026-07-31.py

扫描 products.ts 全部 syntax 错位:
  pattern A: 'A' **適配行業**: B.,  ← markdown 在字符串外 (跟 L3381 L1898 L5815 一样)
  pattern B: 'A., B'  ← 多余 , 在字符串前 (L5815 descriptionEn)
"""
import io
import sys
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PROD = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD, 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

print(f'=== pattern A scan (markdown 适/適配行業 in description_zh after string close) ===')
# 找行: ...description_zh: 'A' **適配行業**: B.,
pattern_a = re.compile(r"description_zh: '([^']*?)'\s*\*\*適配行業\*\*: ([^*]+?)\.,")
count_a = 0
for i, line in enumerate(lines):
    m = pattern_a.search(line)
    if m:
        count_a += 1
        print(f'  L{i+1}: ...{line.rstrip()[-120:]}')
print(f'pattern A count: {count_a}')

print()
print(f'=== pattern B scan (\'items.,\' 之类, 字符串前多了 \',\' ) ===')
# 找 'XXX.,' 后面紧跟 'YYYY' (没分隔符) - 简单匹配 '., 任意非引号
pattern_b = re.compile(r"'(.*?)\.,\s+([A-Z][a-zA-Z]+ [A-Z])")
count_b = 0
for i, line in enumerate(lines):
    for m in pattern_b.finditer(line):
        count_b += 1
        if count_b <= 5:
            print(f'  L{i+1}: ...{line[max(0, m.start()-50):m.end()+50]}...')
print(f'pattern B count: {count_b}')

# 找 description_zh 行里, 'A' **适配行业**: 模式
print()
print('=== pattern C scan: description_zh 行里含 适配/適配行業 在引号外 ===')
count_c = 0
for i, line in enumerate(lines):
    # 找 description_zh 字段后 ' 适配/適配行业 在引号外
    if 'description_zh' in line and ("' **适配行业" in line or "' **適配行業" in line):
        count_c += 1
        print(f'  L{i+1}: ...{line.rstrip()[-150:]}')
print(f'pattern C count: {count_c}')
