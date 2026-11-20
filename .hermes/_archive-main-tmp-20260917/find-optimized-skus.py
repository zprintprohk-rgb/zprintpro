"""
Find which SKUs already have optimizedAt field
"""
import re
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# Find all lines with "optimizedAt:" and exclude the interface definition
positions = []
for i, line in enumerate(lines, 1):
    if "optimizedAt:" in line and "?" not in line and "string" not in line:
        positions.append(i)

print(f"optimizedAt occurrences (excluding interface): {len(positions)}")

# For each, find the most recent slug: 'xxx' before it
for pos in positions:
    # search backwards 200 lines
    for j in range(pos - 1, max(0, pos - 200), -1):
        m = re.search(r"slug:\s*'([^']+)'", lines[j])
        if m:
            slug = m.group(1)
            cat_line_idx = max(0, j - 10)
            cat = ""
            for k in range(j, j - 20, -1):
                if k >= 0 and "category:" in lines[k]:
                    cat_m = re.search(r"category:\s*'([^']+)'", lines[k])
                    if cat_m:
                        cat = cat_m.group(1)
                    break
            print(f"  L{pos}: slug={slug}, category={cat}")
            break
