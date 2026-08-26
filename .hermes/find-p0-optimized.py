"""
Find P0 category SKUs that have optimizedAt field (relaxed matching: SKU closing }, to next slug:)
"""
import re
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# Parse SKU blocks based on slug: 'xxx', pattern
# Track from slug: line until next slug: line OR eof
sku_blocks = []
current = None
for i, line in enumerate(lines, 1):
    m = re.search(r"^\s+slug:\s*'([^']+)'", line)
    if m:
        if current:
            sku_blocks.append(current)
        current = {"slug": m.group(1), "line": i, "has_optimizedAt": False, "category": ""}
    if current:
        m2 = re.search(r"category:\s*'([^']+)'", line)
        if m2 and not current.get("category"):
            current["category"] = m2.group(1)
        if "optimizedAt:" in line and "?" not in line:
            current["has_optimizedAt"] = True

if current:
    sku_blocks.append(current)

p0_categories = ['stickers', 'flyers', 'packaging', 'paper-bags']
print("=== P0 SKUs ===")
for sku in sku_blocks:
    if sku['category'] in p0_categories:
        opt = "[OK]" if sku['has_optimizedAt'] else "[--]"
        print(f"  L{sku['line']}: {sku['slug']} ({sku['category']}) {opt}")
