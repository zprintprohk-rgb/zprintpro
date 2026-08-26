"""
Find transparent-stickers full block end (the real `},` that closes the SKU object)
"""
from pathlib import Path
p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# find slug: 'transparent-stickers'
start = 0
for i, line in enumerate(lines, 1):
    if "slug: 'transparent-stickers'" in line:
        start = i
        print(f"transparent-stickers starts at L{i}")
        break

# Track state: at top level of SKU block
# SKU block opens with `{` right after `slug: 'transparent-stickers',` (or later)
# Find the `{` that opens the SKU block (after the slug: line)
# Actually structure: id:, sku_code:, slug:, ... , then longDescription: `...`, then various props, then }, closes
# Easier: scan for next `slug: '` at same indent level (4 spaces)
print("Looking for next slug: at 4-space indent (end of transparent-stickers block):")
for i in range(start + 1, min(start + 4500, len(lines))):
    line = lines[i]
    if line.startswith("    slug: '") and i > start:
        print(f"  Next slug at L{i}: {line.strip()}")
        # the transparent-stickers block ends right before this line
        # look backwards for the closing `},`
        for j in range(i - 1, start, -1):
            if lines[j].strip() == "},":
                print(f"  transparent-stickers block ends at L{j+1}: {lines[j]}")
                # show 15 lines around end
                for k in range(max(0, j-3), min(len(lines), j+10)):
                    print(f"    L{k+1}: {lines[k][:130]}")
                break
        break
