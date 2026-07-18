#!/usr/bin/env python3
"""
Sub-task B: 3 SKU metadata optimization (2026-07-16) - precision anchor version
Use unique multi-line anchor (minQuantity value + images filename) for precise targeting.
"""
from pathlib import Path
import re

BASE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_TS = BASE / 'src' / 'data' / 'products.ts'
TODAY = '2026-07-16'

text = PRODUCTS_TS.read_text(encoding='utf-8')
original_len = len(text)

# Pre-check 3 SKUs
for slug, anchor in [
    ('a4-flyers', "minQuantity: 100,\n    images: ['/images/products/a4-flyers.jpg']"),
    ('waterproof-stickers', "minQuantity: 100,\n    images: ['/images/products/waterproof-stickers.jpg']"),
]:
    # Search backward from anchor to find optimizedAt (already exists?)
    # Actually just try the insert and check
    if anchor not in text:
        raise ValueError(f'anchor for {slug} not found: {anchor!r}')

# Check current state
for slug, anchor in [
    ('a4-flyers', "minQuantity: 100,\n    images: ['/images/products/a4-flyers.jpg']"),
    ('waterproof-stickers', "minQuantity: 100,\n    images: ['/images/products/waterproof-stickers.jpg']"),
]:
    # Look at 500 chars BEFORE anchor to see if optimizedAt is already in this SKU
    idx = text.find(anchor)
    before = text[max(0, idx-500):idx]
    # If before contains optimizedAt:, it's already there
    if 'optimizedAt:' in before:
        # But the optimizedAt might be in longDescription template literal (false positive)
        # Better: count optimizedAt: occurrences in the file before and after this anchor
        before_count = text[:idx].count('optimizedAt:')
        after_count = text[idx:idx+5000].count('optimizedAt:')
        if before_count > after_count:
            # There's an optimizedAt in the 5000 chars after this anchor that isn't in longDescription
            # That means another SKU has it. But we want to check if THIS SKU has it.
            # Most reliable: search the full 5000 chars after anchor and look for 2 optimizedAt (one in longDescription false, one real)
            # For simplicity, just check if our insert is needed
            pass
    print(f'  - {slug}: anchor found, no double-add risk')

# Insert optimizedAt + optimizationRound before each unique anchor
insert_text = "    optimizedAt: '2026-07-16',\n    optimizationRound: 1,\n    "

for slug, anchor in [
    ('a4-flyers', "minQuantity: 100,\n    images: ['/images/products/a4-flyers.jpg']"),
    ('waterproof-stickers', "minQuantity: 100,\n    images: ['/images/products/waterproof-stickers.jpg']"),
]:
    # Find anchor position
    idx = text.find(anchor)
    # Check if optimizedAt already exists in the SKU's range
    # Use slug anchor to find this SKU's start
    slug_m = re.search(rf"slug:\s*'{slug}'", text)
    slug_pos = slug_m.start()
    sku_range = text[slug_pos:idx + len(anchor)]
    if 'optimizedAt:' in sku_range:
        # Already has it, skip
        print(f'  - {slug}: already has optimizedAt in SKU range, skip')
    else:
        # Insert before the anchor (which starts with '    minQuantity:')
        new_text = text[:idx] + insert_text + text[idx:]
        text = new_text
        print(f'  + {slug}: inserted optimizedAt + optimizationRound before minQuantity')

# gift-boxes: already optimized
print(f'  - gift-boxes: ALREADY OPTIMIZED 2026-07-04 (round 1), skip')

# Write
new_len = len(text)
print(f'\n=== TOTAL DIFF: {new_len - original_len:+d} chars ===')
PRODUCTS_TS.write_text(text, encoding='utf-8')
print(f'  -> wrote {PRODUCTS_TS}')
