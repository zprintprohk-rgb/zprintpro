# -*- coding: utf-8 -*-
# A1 calendars truth anchor: products.ts calendar SKUs minQuantity/basePrice/price_range
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
raw = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['wall-calendars', 'desk-calendars', 'calendar-cards', 'planner-calendars']:
    i = raw.find(f"'{slug}'")
    if i < 0:
        i = raw.find(f'"{slug}"')
    print(f'=== {slug} @ {i} ===')
    if i >= 0:
        seg = raw[i:i+2200]
        for field in ['minQuantity', 'basePrice', 'price_range', 'name_en', 'name_zh', 'name_ja']:
            m = re.search(re.escape(field) + r":\s*('[^']*'|\"[^\"]*\"|[0-9]+)", seg)
            if m: print(f'  {field}: {m.group(1)}')
