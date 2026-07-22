#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
M3 v6 任务 3 续: sku-seo-data.ts 删 gift-boxes 对象
"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts'

with open(FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find gift-boxes start
start = -1
for i, l in enumerate(lines):
    if '"gift-boxes":' in l and '{' in l:
        start = i
        break
print(f'gift-boxes starts at L{start+1}')

# Find matching close brace (handles strings, templates)
end = -1
depth = 0
in_str = None
in_tpl = False
for i in range(start, len(lines)):
    l = lines[i]
    j = 0
    while j < len(l):
        ch = l[j]
        if in_str:
            if ch == '\\':
                j += 1
            elif ch == in_str:
                in_str = None
        elif in_tpl:
            if ch == '`':
                in_tpl = False
        else:
            if ch == '"' or ch == "'":
                in_str = ch
            elif ch == '`':
                in_tpl = True
            elif ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    end = i
                    break
        j += 1
    if end != -1:
        break
print(f'gift-boxes ends at L{end+1}')
print(f'Deleting {end - start + 1} lines')

del lines[start:end + 1]
print(f'New line count: {len(lines)}')

with open(FILE, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Done.')
