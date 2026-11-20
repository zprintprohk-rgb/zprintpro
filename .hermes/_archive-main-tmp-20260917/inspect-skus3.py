#!/usr/bin/env python3
"""Inspect 3 SKU title/description structure"""
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
lines = text.split('\n')

for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    print(f'\n=== {slug} ===')
    for i, line in enumerate(lines):
        if f"slug: '{slug}'" in line:
            # Show next 30 lines
            for j in range(i, min(i+50, len(lines))):
                l = lines[j]
                if any(k in l for k in ['title_zh', 'title_en', 'title_ja', 'description', 'optimizationRound', 'optimizedAt', 'minQuantity']):
                    # Print to a file to avoid GBK encoding issues
                    pass
            # Just write title/desc lines to file
            with open(f'C:\\Users\\Administrator\\AppData\\Local\\Temp\\inspect-{slug}.txt', 'w', encoding='utf-8') as f:
                for j in range(i, min(i+50, len(lines))):
                    l = lines[j]
                    if any(k in l for k in ['title_zh', 'title_en', 'title_ja', 'description', 'optimizationRound', 'optimizedAt', 'minQuantity']):
                        f.write(f'  L{j+1}: {l.rstrip()}\n')
            print(f'  -> wrote C:\\Users\\Administrator\\AppData\\Local\\Temp\\inspect-{slug}.txt')
            break
            break
