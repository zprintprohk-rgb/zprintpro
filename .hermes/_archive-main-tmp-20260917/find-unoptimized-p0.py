"""
Find all P0 category SKUs and check which are already optimized
"""
import re
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# Find all SKU blocks: { slug: 'xxx', category: 'yyy', ... }
sku_blocks = []
current = {}
for i, line in enumerate(lines):
    m = re.search(r"slug:\s*'([^']+)'", line)
    if m:
        if current:
            sku_blocks.append(current)
        current = {"slug": m.group(1), "category": "", "line": i + 1, "has_optimizedAt": False}
    if current:
        m2 = re.search(r"category:\s*'([^']+)'", line)
        if m2 and not current.get("category"):
            current["category"] = m2.group(1)
        if "optimizedAt:" in line and "?" not in line and "string" not in line:
            current["has_optimizedAt"] = True

if current:
    sku_blocks.append(current)

# Filter P0 categories
p0_categories = ['stickers', 'flyers', 'packaging', 'paper-bags']
print("=== P0 Category SKUs ===")
for sku in sku_blocks:
    if sku['category'] in p0_categories:
        opt_status = "[OK] optimized" if sku['has_optimizedAt'] else "[--] NOT optimized"
        print(f"  L{sku['line']}: {sku['slug']} ({sku['category']}) {opt_status}")
