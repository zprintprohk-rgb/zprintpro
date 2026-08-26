#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io, os

# 1. about/page.tsx L128-145 验证
p1 = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
t1 = io.open(p1, 'r', encoding='utf-8').read()
lines = t1.split('\n')
print('=== about/page.tsx L128-145 (after fix) ===')
for i in range(127, 145):
    if i < len(lines):
        print(f'L{i+1}: {lines[i]}')
print()

# 2. products.ts L3378-3385 验证
p2 = r'F:\zprintpro-nextjs\src\data\products.ts'
t2 = io.open(p2, 'r', encoding='utf-8').read()
lines2 = t2.split('\n')
print('=== products.ts L3378-3385 (after fix) ===')
for i in range(3377, 3385):
    if i < len(lines2):
        print(f'L{i+1}: {lines2[i]}')
print()

# 3. 编码 spot check
for path in [p1, p2]:
    with open(path, 'rb') as f:
        b = f.read()
    bom = b[:3] == b'\xef\xbb\xbf'
    print(f'{os.path.basename(path)}: size={len(b)} BOM={bom}')
