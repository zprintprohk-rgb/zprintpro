"""
Find 3 unoptimized P0 SKUs:
1. transparent-stickers (stickers)
2. kraft-paper-bags (paper-bags)
3. rigid-boxes (packaging)

For each, find imagesByLocale block end position, insert optimizedAt + optimizationRound.
Also update title_zh/title_en/title_ja with 1-2 Tier A industry keywords,
and append "适配行业" list to description.
"""
import re
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# Find each SKU's slug position
targets = ['transparent-stickers', 'kraft-paper-bags', 'rigid-boxes']
slug_lines = {}
for i, line in enumerate(lines, 1):
    for t in targets:
        m = re.search(rf"slug:\s*'{t}'", line)
        if m and t not in slug_lines:
            slug_lines[t] = i

print("Slug positions:")
for t, ln in slug_lines.items():
    print(f"  {t}: L{ln}")

# For each, find imagesByLocale block end
# Pattern: `imagesByLocale: { 'zh-hk': [...], 'en': [...], 'ja': [...] }` → ends with `    },` at 2-space indent
# After that we insert optimizedAt before the next 4-space indent block (variables or seoImages)

sku_inserts = {}  # t -> (insert_line, optimizedAt_text)
for t, start_ln in slug_lines.items():
    # Search forward for `imagesByLocale: {`
    images_start = None
    for i in range(start_ln - 1, min(start_ln + 300, len(lines))):
        if "imagesByLocale:" in lines[i]:
            images_start = i + 1  # 0-indexed next line
            break
    if images_start is None:
        print(f"  WARN: {t} - no imagesByLocale found")
        continue

    # Find matching `    },` (2-space indent + `},`) from images_start
    # imagesByLocale block has nested arrays, ends at the first `    },` after the 'ja' block
    in_ja = False
    end_line = None
    for i in range(images_start, min(images_start + 200, len(lines))):
        line = lines[i]
        if "'ja':" in line:
            in_ja = True
        if in_ja and line == "  },":
            end_line = i + 1  # 1-indexed
            break
    if end_line is None:
        print(f"  WARN: {t} - no imagesByLocale end found")
        continue

    print(f"  {t}: imagesByLocale starts L{images_start + 1}, ends L{end_line}")
    sku_inserts[t] = end_line

# Print context around each end_line
for t, end_ln in sku_inserts.items():
    print(f"\n--- {t} context around L{end_ln} ---")
    for i in range(max(0, end_ln - 3), min(len(lines), end_ln + 5)):
        s = lines[i].encode('gbk', errors='replace').decode('gbk')
        print(f"  L{i+1}: {s[:130]}")
