#!/usr/bin/env python3
"""
Sub-task B: 3 SKU optimization (2026-07-16)
- a4-flyers: add optimizedAt + optimizationRound + 1 line description (餐飲外賣)
- gift-boxes: append 美妝護膚 to existing 適配行業 list (no metadata change - already optimized 2026-07-04)
- waterproof-stickers: add optimizedAt + optimizationRound + 1 line description (寵物 FDA 認證)
Path: src/data/products.ts
"""
from pathlib import Path
import re

BASE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_TS = BASE / 'src' / 'data' / 'products.ts'
TODAY = '2026-07-16'

text = PRODUCTS_TS.read_text(encoding='utf-8')
original_len = len(text)

# ============================================================
# Helper: find SKU object end using template literal awareness
# ============================================================
def find_sku_object_end(text, slug):
    """Find the end of SKU object starting at slug, properly handling template literals."""
    m = re.search(rf"slug:\s*'{slug}'", text)
    if not m:
        raise ValueError(f'slug {slug!r} not found')
    pos = m.start()
    # Walk forward. Track: braces, backticks (template literals), and string literals (' and ")
    depth = 0
    found_open = False
    in_template = False
    in_single = False
    in_double = False
    while pos < len(text):
        c = text[pos]
        # Handle string state
        if not in_template:
            if c == "'" and not in_double:
                in_single = not in_single
            elif c == '"' and not in_single:
                in_double = not in_double
        if in_template and c == '`' and (pos == 0 or text[pos-1] != '\\'):
            in_template = False
            pos += 1
            continue
        if not in_template and not in_single and not in_double:
            if c == '`':
                in_template = True
            elif c == '{':
                depth += 1
                found_open = True
            elif c == '}':
                depth -= 1
                if found_open and depth == 0:
                    # End found
                    end_pos = pos + 1
                    if end_pos < len(text) and text[end_pos] == ',':
                        end_pos += 1
                    return pos, end_pos
        pos += 1
    raise ValueError(f'object end not found for {slug}')

# Find each SKU's object range
for slug in ['a4-flyers', 'gift-boxes', 'waterproof-stickers']:
    obj_close, obj_end = find_sku_object_end(text, slug)
    obj_text = text[text.find(f"slug: '{slug}'"):obj_end]
    has_opt = 'optimizedAt:' in obj_text
    has_round = 'optimizationRound:' in obj_text
    print(f'{slug}: obj_close={obj_close}, optimizedAt={has_opt}, optimizationRound={has_round}')

# ============================================================
# Fix 1: a4-flyers - add optimizedAt + optimizationRound before minQuantity
# ============================================================
slug = 'a4-flyers'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
# Find minQuantity: 100, position after slug
minq_m = re.search(r'\bminQuantity:\s*\d+', text[slug_pos:])
if not minq_m:
    raise ValueError(f'minQuantity not found for {slug}')
minq_pos = slug_pos + minq_m.start()
# Check if optimizedAt already exists in this SKU's range
# Find the line that contains minQuantity
# (Use the same template-aware search to be safe)
obj_close, obj_end = find_sku_object_end(text, slug)
sku_range = text[slug_pos:obj_end]
if 'optimizedAt:' not in sku_range:
    # Insert before minQuantity
    new_text = text[:minq_pos] + f"    optimizedAt: '{TODAY}',\n    optimizationRound: 1,\n    " + text[minq_pos:]
    text = new_text
    print(f'  + a4-flyers: added optimizedAt + optimizationRound before minQuantity')
else:
    print(f'  - a4-flyers: already has optimizedAt, skip metadata add')

# ============================================================
# Fix 1b: a4-flyers - append 餐飲旺季 to description (zh-hk)
# ============================================================
slug = 'a4-flyers'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
# Find description_zh: '...' (zh-hk) within this SKU
# Pattern: description_zh: '...'
# Use a precise regex with greedy match until ', \n
desc_m = re.search(r"description_zh:\s*'([^']+)'", text[slug_pos:])
if not desc_m:
    raise ValueError(f'description_zh not found for {slug}')
desc_pos = slug_pos + desc_m.start()
desc_value = desc_m.group(1)
new_desc_value = desc_value + '**餐飲旺季 2026**: 暑假 / 國慶 / 聖誕 / 團年飯。'
text = text[:desc_pos] + f"description_zh: '{new_desc_value}'" + text[desc_pos + desc_m.end():]
print(f'  + a4-flyers description_zh: appended 餐飲旺季 line')

# ============================================================
# Fix 2: gift-boxes - append 美妝護膚 to existing 適配行業 list
# ============================================================
slug = 'gift-boxes'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
# Find description_zh: '...'
desc_m = re.search(r"description_zh:\s*'([^']+)'", text[slug_pos:])
if not desc_m:
    raise ValueError(f'description_zh not found for {slug}')
desc_pos = slug_pos + desc_m.start()
desc_value = desc_m.group(1)
# Check if 美妝護膚 already in description
if '美妝護膚' in desc_value:
    print(f'  - gift-boxes: 美妝護膚 already in description, skip')
else:
    # Find 適配行業 list and append 美妝護膚
    # Look for 母嬰產品 (last item) and append /美妝護膚
    new_desc_value = desc_value.replace('母嬰產品。', '母嬰產品/美妝護膚/個人護理。')
    if new_desc_value == desc_value:
        # Fallback: just append
        new_desc_value = desc_value + '**新增 2026-07-16**: 美妝護膚/個人護理品牌。'
    text = text[:desc_pos] + f"description_zh: '{new_desc_value}'" + text[desc_pos + desc_m.end():]
    print(f'  + gift-boxes description_zh: appended 美妝護膚')

# ============================================================
# Fix 3: waterproof-stickers - add optimizedAt + optimizationRound + description
# ============================================================
slug = 'waterproof-stickers'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
obj_close, obj_end = find_sku_object_end(text, slug)
sku_range = text[slug_pos:obj_end]
if 'optimizedAt:' not in sku_range:
    # Find minQuantity after slug
    minq_m = re.search(r'\bminQuantity:\s*\d+', text[slug_pos:])
    if not minq_m:
        raise ValueError(f'minQuantity not found for {slug}')
    minq_pos = slug_pos + minq_m.start()
    text = text[:minq_pos] + f"    optimizedAt: '{TODAY}',\n    optimizationRound: 1,\n    " + text[minq_pos:]
    print(f'  + waterproof-stickers: added optimizedAt + optimizationRound before minQuantity')
else:
    print(f'  - waterproof-stickers: already has optimizedAt, skip metadata add')

# 3b: waterproof-stickers description_zh append 寵物 FDA 認證 + 適配行業
slug = 'waterproof-stickers'
m = re.search(rf"slug:\s*'{slug}'", text)
slug_pos = m.start()
desc_m = re.search(r"description_zh:\s*'([^']+)'", text[slug_pos:])
if not desc_m:
    raise ValueError(f'description_zh not found for {slug}')
desc_pos = slug_pos + desc_m.start()
desc_value = desc_m.group(1)
new_desc_value = desc_value + '**FDA 食品級 2026-07-16**: 大豆油墨 / BPA-free / 防水防油。**適配行業**: 寵物食品 / 嬰幼兒用品 / 化妝品 / 酒類 / 醬料 / 保健品。'
text = text[:desc_pos] + f"description_zh: '{new_desc_value}'" + text[desc_pos + desc_m.end():]
print(f'  + waterproof-stickers description_zh: appended 寵物 + FDA line')

# ============================================================
# Write
# ============================================================
new_len = len(text)
print(f'\n=== TOTAL DIFF: {new_len - original_len:+d} chars ===')
PRODUCTS_TS.write_text(text, encoding='utf-8')
print(f'  -> wrote {PRODUCTS_TS}')
