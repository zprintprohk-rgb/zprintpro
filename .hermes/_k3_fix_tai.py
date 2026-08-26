# -*- coding: utf-8 -*-
"""Replace "台" with "枱" in PC-001 and PC-005 SKU names (proper traditional Chinese)."""
import re

PRODUCTS_FILE = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# Find PC-001 and PC-005 blocks (up to the next `},` at column 0)
# Pattern: `id: 'PC-001',\n  ... \n  },`
# Use a more targeted approach: find each occurrence of "婚宴台卡" or "餐廳 / 咖啡廳台卡" only in name/title_zh fields of PC-001/PC-005
# Better: just replace in the whole file - the SKUs are the only places with these specific phrases
# But this could affect other places. Use targeted regex.

# Pattern 1: Replace "台卡" with "枱卡" in name and title_zh fields of PC-001 and PC-005
# Each block ends with `},\n` (after description_zh + extra fields)
# Use re.DOTALL to match across lines

# Simple approach: just replace "台卡" with "枱卡" globally (only affects my SKUs)
new_src = src.replace("婚宴台卡", "婚宴枱卡")
new_src = new_src.replace("餐廳 / 咖啡廳台卡", "餐廳 / 咖啡廳枱卡")
new_src = new_src.replace("台卡", "枱卡")  # catch any remaining

# Also fix the comment line "台卡 / 酒水牌 / 座位卡" - keep as 台卡 since it's a category description
# Actually let's also fix the comment to use 枱卡 for consistency
new_src = new_src.replace("// === 台卡 / 酒水牌 / 座位卡", "// === 枱卡 / 酒水牌 / 座位卡")

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

# Count
tai_count_old = src.count("台卡")
ti_count_new = new_src.count("枱卡")
print(f"Old '台卡' count: {tai_count_old}")
print(f"New '枱卡' count: {ti_count_new}")
print(f"Old size: {len(src)}, New size: {len(new_src)}")
