#!/usr/bin/env python3
import re
prod = open('F:/zprintpro-nextjs/src/data/products.ts', 'r', encoding='utf-8').read()
ld_blocks = re.findall(r'longDescription: `([^`]+)`', prod)
nap = sum(1 for ld in ld_blocks if '非智印港' in ld)
no_nap_idx = [i for i, ld in enumerate(ld_blocks) if '非智印港' not in ld]
slugs = re.findall(r"^\s*slug:\s*'([^']+)'", prod, re.MULTILINE)
print(f'total longDescription: {len(ld_blocks)}')
print(f'with NAP: {nap}/{len(ld_blocks)}')
print(f'no NAP: {len(no_nap_idx)}')
for i in no_nap_idx:
    if i < len(slugs):
        print(f'  {slugs[i]}')
