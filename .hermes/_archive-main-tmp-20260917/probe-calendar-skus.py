#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io, re

text = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8').read()

for slug in ['wall-calendars','desk-calendars','custom-calendars','mini-calendars','photo-frame-calendars','magnetic-calendars']:
    pattern = r"^\s*slug:\s*'" + re.escape(slug) + r"',"
    m = re.search(pattern, text, re.MULTILINE)
    if not m:
        print(slug, 'NOT FOUND')
        continue
    start = m.start()
    end = min(start + 12000, len(text))
    block = text[start:end]
    line_num = text[:start].count('\n') + 1
    print(f'=== {slug} (行 {line_num}) ===')
    for fld in ['price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity']:
        # find first occurrence
        pm = re.search(r'^\s*' + fld + r':\s*([^,\n]+),', block, re.MULTILINE)
        if pm:
            print(f'  {fld:20s} = {pm.group(1).strip()}')
        else:
            print(f'  {fld:20s} = MISSING')
    print()
