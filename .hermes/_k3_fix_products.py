# -*- coding: utf-8 -*-
"""Fix products.ts: remove invalid fields and use proper interface.
- Remove `pricing: { ... }` field (not in Product interface)
- Extract basePrice from pricing.basePrice
- Remove `industries: [...]` field (not in Product interface)
- Remove `price_range` if needed (it IS in interface)
- Keep all other valid fields
"""
import re
import os

PRODUCTS_FILE = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# Pattern: `pricing: { basePrice: <num>, unit: ..., priceModel: ..., tiers: [...] },`
# Replace with: `basePrice: <num>,`
# Use regex to capture basePrice
def replace_pricing(match):
    inner = match.group(1)
    bp_match = re.search(r"basePrice:\s*([\d.]+)", inner)
    if bp_match:
        return f"basePrice: {bp_match.group(1)},"
    return ""

# Match `pricing: { ... },\n` (one-line)
new_src = re.sub(
    r"pricing:\s*\{[^}]*\},\s*\n\s*",
    "",
    src
)

# Match multi-line pricing: { ... } blocks (these may span multiple lines)
# Use a greedy match
new_src = re.sub(
    r"pricing:\s*\{[^{}]*tiers:\s*\[[^\]]*\][^{}]*\},\s*\n\s*",
    "",
    new_src
)

# Remove `industries: [...],\n  ` field
new_src = re.sub(
    r"industries:\s*\[[^\]]*\],\s*\n\s*",
    "",
    new_src
)

# Check if the new src still has pricing or industries references
pricing_count = len(re.findall(r"\bpricing:\s*\{", new_src))
industries_count = len(re.findall(r"\bindustries:\s*\[", new_src))
print(f"Remaining 'pricing: {{' : {pricing_count} (should be 0)")
print(f"Remaining 'industries: [' : {industries_count} (should be 0)")

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

print(f"Updated {PRODUCTS_FILE}")
print(f"Old size: {len(src)}, New size: {len(new_src)}")
