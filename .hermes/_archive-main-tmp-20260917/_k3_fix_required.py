# -*- coding: utf-8 -*-
"""Add required fields to 12 new SKUs (WI-001 to WI-006, PC-001 to PC-006).
Required: title_zh, description_zh, basePrice, weight_score, images, isHot, isNew, minQuantity.
"""
import re

PRODUCTS_FILE = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# Find each WI/PC SKU block and insert required fields
# Pattern: `id: 'WI-XXX',` start of object, ends with `},\n`
# Add: title_zh, description_zh, basePrice, weight_score, isHot, isNew, minQuantity, images after slug

# Strategy: regex to find SKU blocks for WI/PC and add fields
# SKU block starts with: `// === 喜帖印刷` or `// === 台卡 / 酒水牌 / 座位卡`
# But easier: find each `id: 'WI-` or `id: 'PC-` and add fields before the next `,`

def add_required_fields(match):
    block = match.group(0)
    # Extract slug to use for image
    slug_match = re.search(r"slug:\s*'([^']+)'", block)
    slug = slug_match.group(1) if slug_match else "product"
    # Insert new fields after `slug: 'XXX',\n` and before `category:`
    new_fields = f"""
    title_zh: '',
    description_zh: '',
    basePrice: 1.00,
    weight_score: 50,
    images: ['/images/products/{slug}-1.jpg'],
    isHot: false,
    isNew: true,
    minQuantity: 50,
    """
    return re.sub(
        r"(slug:\s*'[^']+',)\n",
        r"\1\n" + new_fields,
        block,
        count=1
    )

# Match each WI/PC block: from `id: 'WI-` or `id: 'PC-` to the next `},\n`
pattern = re.compile(
    r"id:\s*'(?:WI|PC)-\d{3}',.*?\},\n",
    re.DOTALL
)

new_src, count = pattern.subn(add_required_fields, src)
print(f"Modified {count} SKU blocks (expected 12)")

# Also extract basePrice from each block - use first tier unitPrice as basePrice
# For each WI/PC block, we need to compute basePrice from the tiers
# But we don't have the pricing object anymore. Use defaults.
# Set basePrice: 1.00 as placeholder, real basePrice from description

# Better: for each SKU, set basePrice based on category
# WI (wedding): basePrice 1.20-25.00
# PC (place-cards): basePrice 0.25-4.50

# Find each id and set basePrice
# WI-001: 1.20, WI-002: 0.85, WI-003: 0.65, WI-004: 0.95, WI-005: 1.15, WI-006: 25.00
# PC-001: 0.30, PC-002: 0.25, PC-003: 0.30, PC-004: 0.40, PC-005: 0.40, PC-006: 4.50

base_prices = {
    'WI-001': 1.20, 'WI-002': 0.85, 'WI-003': 0.65, 'WI-004': 0.95, 'WI-005': 1.15, 'WI-006': 25.00,
    'PC-001': 0.30, 'PC-002': 0.25, 'PC-003': 0.30, 'PC-004': 0.40, 'PC-005': 0.40, 'PC-006': 4.50,
    'minQty': {'WI': 50, 'PC': 50, 'WI-006': 100, 'PC-006': 50},
}

def fix_specific_fields(match):
    block = match.group(0)
    # Find id
    id_match = re.search(r"id:\s*'(WI|PC)-(\d{3})'", block)
    if not id_match:
        return block
    sku_id = id_match.group(0)[5:-1]  # WI-001
    bp = base_prices.get(sku_id, 1.00)
    # Set title_zh = name value
    name_match = re.search(r"name:\s*'([^']+)'", block)
    title_zh = name_match.group(1) if name_match else ""
    desc_match = re.search(r"description:\s*'([^']{0,80})", block)
    desc_zh = desc_match.group(1) if desc_match else ""
    # Replace placeholder values
    new_block = re.sub(r"title_zh:\s*''", f"title_zh: '{title_zh}'", block)
    new_block = re.sub(r"description_zh:\s*''", f"description_zh: '{desc_zh}...'", new_block)
    new_block = re.sub(r"basePrice:\s*[\d.]+", f"basePrice: {bp}", new_block)
    return new_block

new_src, count2 = pattern.subn(fix_specific_fields, new_src)
print(f"Updated specific fields for {count2} SKU blocks")

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

print(f"Old size: {len(src)}, New size: {len(new_src)}")
