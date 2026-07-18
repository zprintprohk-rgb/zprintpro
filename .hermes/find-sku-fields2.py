#!/usr/bin/env python3
"""Find 3 SKU real fields - write to file"""
import re
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()

out_lines = []
for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    out_lines.append(f'\n=== {slug} ===')
    m = re.search(rf"slug:\s*'{slug}'", text)
    if not m:
        out_lines.append(f'  NOT FOUND')
        continue
    slug_pos = m.start()
    pos = slug_pos
    depth = 0
    found_open = False
    obj_end = None
    while pos < len(text):
        c = text[pos]
        if c == '{':
            depth += 1
            found_open = True
        elif c == '}':
            depth -= 1
            if found_open and depth == 0:
                obj_end = pos + 1
                if obj_end < len(text) and text[obj_end] == ',':
                    obj_end += 1
                break
        pos += 1
    if obj_end is None:
        out_lines.append(f'  object end NOT FOUND')
        continue
    obj = text[slug_pos:obj_end]
    obj_len = len(obj)
    out_lines.append(f'  obj length: {obj_len} chars')
    for field in ['minQuantity', 'optimizedAt', 'optimizationRound', 'title_zh', 'title_en', 'title_ja', 'description']:
        present = re.search(rf'\b{re.escape(field)}\b', obj) is not None
        if present:
            fm = re.search(rf'\b{re.escape(field)}\b', obj)
            ctx = obj[fm.start():fm.start()+80]
            ctx = ' '.join(ctx.split())[:80]
            out_lines.append(f'  {field}: PRESENT - {ctx}')
        else:
            out_lines.append(f'  {field}: ABSENT')

with open('C:\\Users\\Administrator\\AppData\\Local\\Temp\\sku-fields.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))
print('written to sku-fields.txt')
