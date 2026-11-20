#!/usr/bin/env python3
"""
Sub-task B: 3 SKU metadata optimization (2026-07-16) - minimal safe version
- a4-flyers: add optimizedAt + optimizationRound before minQuantity
- gift-boxes: ALREADY OPTIMIZED 2026-07-04, skip
- waterproof-stickers: add optimizedAt + optimizationRound before minQuantity
DO NOT touch description_zh (regex broke longDescription in previous attempt).
Path: src/data/products.ts
"""
from pathlib import Path
import re

BASE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_TS = BASE / 'src' / 'data' / 'products.ts'
TODAY = '2026-07-16'

text = PRODUCTS_TS.read_text(encoding='utf-8')
original_len = len(text)

# Find next slug position (so we don't go beyond this SKU's range)
def find_next_slug_pos(text, start_pos):
    m = re.search(r"slug:\s*'", text[start_pos:])
    if m:
        return start_pos + m.start()
    return len(text)

# ============================================================
# a4-flyers: add optimizedAt + optimizationRound before minQuantity
# ============================================================
slug = 'a4-flyers'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
next_slug_pos = find_next_slug_pos(text, slug_pos + 10)
sku_range = text[slug_pos:next_slug_pos]
if 'optimizedAt:' not in sku_range:
    # Find minQuantity: 100 within SKU range
    minq_m = re.search(r'\bminQuantity:\s*\d+,', sku_range)
    if not minq_m:
        raise ValueError(f'minQuantity not found in {slug} range')
    minq_pos = slug_pos + minq_m.start()
    # Insert optimizedAt + optimizationRound before minQuantity
    text = text[:minq_pos] + f"    optimizedAt: '{TODAY}',\n    optimizationRound: 1,\n    " + text[minq_pos:]
    print(f'  + {slug}: added optimizedAt + optimizationRound before minQuantity')
else:
    print(f'  - {slug}: already has optimizedAt, skip')

# ============================================================
# gift-boxes: ALREADY optimized 2026-07-04 (verified by find-sku-fields2.py)
# ============================================================
slug = 'gift-boxes'
print(f'  - {slug}: ALREADY OPTIMIZED 2026-07-04 (round 1), skip (Sub-task B: do not double-optimize)')

# ============================================================
# waterproof-stickers: add optimizedAt + optimizationRound before minQuantity
# ============================================================
slug = 'waterproof-stickers'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
next_slug_pos = find_next_slug_pos(text, slug_pos + 10)
sku_range = text[slug_pos:next_slug_pos]
if 'optimizedAt:' not in sku_range:
    minq_m = re.search(r'\bminQuantity:\s*\d+,', sku_range)
    if not minq_m:
        raise ValueError(f'minQuantity not found in {slug} range')
    minq_pos = slug_pos + minq_m.start()
    text = text[:minq_pos] + f"    optimizedAt: '{TODAY}',\n    optimizationRound: 1,\n    " + text[minq_pos:]
    print(f'  + {slug}: added optimizedAt + optimizationRound before minQuantity')
else:
    print(f'  - {slug}: already has optimizedAt, skip')

# Write
new_len = len(text)
print(f'\n=== TOTAL DIFF: {new_len - original_len:+d} chars ===')
PRODUCTS_TS.write_text(text, encoding='utf-8')
print(f'  -> wrote {PRODUCTS_TS}')
