#!/usr/bin/env python3
"""Check 3 SKU existing optimizedAt status - real version"""
p = r'F:\zprintpro-nextjs\src\data\products.ts'
with open(p, 'r', encoding='utf-8') as f:
    text = f.read()
lines = text.split('\n')
for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    found_optimizedAt = False
    for i, line in enumerate(lines):
        if f"slug: '{slug}'" in line:
            # Check next 500 lines for optimizedAt
            for j in range(i, min(i+500, len(lines))):
                if 'optimizedAt' in lines[j]:
                    found_optimizedAt = True
                    print(f'{slug}: L{j+1} = {lines[j].rstrip()}')
                    break
            if not found_optimizedAt:
                print(f'{slug}: NO optimizedAt found in next 500 lines (slug at L{i+1})')
            break
