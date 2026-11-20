#!/usr/bin/env python3
"""
Sub-task B: 3 SKU metadata optimization (2026-07-16) - simplest safe version
- a4-flyers: add optimizedAt + optimizationRound before minQuantity
- gift-boxes: ALREADY OPTIMIZED 2026-07-04, skip
- waterproof-stickers: add optimizedAt + optimizationRound before minQuantity
Use slug anchor + first minQuantity AFTER slug (no need to find next SKU boundary).
Path: src/data/products.ts
"""
from pathlib import Path
import re

BASE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_TS = BASE / 'src' / 'data' / 'products.ts'
TODAY = '2026-07-16'

text = PRODUCTS_TS.read_text(encoding='utf-8')
original_len = len(text)

def add_metadata(slug):
    """Find slug, check if optimizedAt exists in a forward window, then add metadata before minQuantity.
    Forward window = 2000 chars (covers longDescription + a4-flyers' 12KB obj).
    """
    m = re.search(rf"slug:\s*'{slug}'", text)
    if not m:
        raise ValueError(f'slug {slug!r} not found')
    slug_pos = m.start()
    # Window: 2000 chars after slug, enough to cover minQuantity but not next SKU
    window = text[slug_pos:slug_pos + 2000]
    if 'optimizedAt:' in window:
        print(f'  - {slug}: already has optimizedAt in window, skip')
        return
    # Find minQuantity in this window
    minq_m = re.search(r'\bminQuantity:\s*\d+,', window)
    if not minq_m:
        raise ValueError(f'minQuantity not found in {slug} window')
    minq_pos = slug_pos + minq_m.start()
    # Insert optimizedAt + optimizationRound before minQuantity
    new_text = text[:minq_pos] + f"    optimizedAt: '{TODAY}',\n    optimizationRound: 1,\n    " + text[minq_pos:]
    return new_text

# a4-flyers
new_text = add_metadata('a4-flyers')
if new_text:
    text = new_text
    print(f'  + a4-flyers: added optimizedAt + optimizationRound')

# gift-boxes: ALREADY OPTIMIZED 2026-07-04
print(f'  - gift-boxes: ALREADY OPTIMIZED 2026-07-04 (round 1), skip (Sub-task B: do not double-optimize)')

# waterproof-stickers
new_text = add_metadata('waterproof-stickers')
if new_text:
    text = new_text
    print(f'  + waterproof-stickers: added optimizedAt + optimizationRound')

# Write
new_len = len(text)
print(f'\n=== TOTAL DIFF: {new_len - original_len:+d} chars ===')
PRODUCTS_TS.write_text(text, encoding='utf-8')
print(f'  -> wrote {PRODUCTS_TS}')
