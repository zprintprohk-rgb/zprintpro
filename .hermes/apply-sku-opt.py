"""
Insert optimizedAt + optimizationRound for 3 unoptimized P0 SKUs
+ append 适配行业 list to description (zh-hk only, since 1 main locale)
"""
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# (target_slug, insert_after_L, optimizedAt_text, description_append_text)
operations = [
    {
        "slug": "transparent-stickers",
        "insert_after_L": 2309,  # L2309 is `  },` closing imagesByLocale
        "description_zh_append": " | 適配行業：美妝護膚、香水、飲品、餐廳外賣、寵物食品、化學品標籤",
    },
    {
        "slug": "kraft-paper-bags",
        "insert_after_L": 4561,
        "description_zh_append": " | 適配行業：服裝零售、餐飲外賣、文創IP、珠寶鐘錶、婚慶喜糖、寵物食品、茶飲食品",
    },
    {
        "slug": "rigid-boxes",
        "insert_after_L": 10013,
        "description_zh_append": " | 適配行業：美妝護膚、珠寶鐘錶、婚慶喜糖、文創IP、數碼電子、節日禮品",
    },
]

# Process from bottom to top to keep line numbers stable
operations.sort(key=lambda x: x["insert_after_L"], reverse=True)

optimized_at_line = "    optimizedAt: '2026-07-20',"
optimized_round_line = "    optimizationRound: 1,"

for op in operations:
    slug = op["slug"]
    after_ln = op["insert_after_L"]
    # Insert at after_ln (1-indexed), so insert at index after_ln (0-indexed)
    # 0-indexed insert position = after_ln
    insert_idx = after_ln  # lines is 0-indexed, after_ln is 1-indexed, insert at after_ln means after line after_ln
    # Actually to insert AFTER line N (1-indexed), we want 0-indexed position N (which is after lines[N-1])
    # lines[after_ln-1] is the L after_ln line
    # To insert AFTER it, we use insert at position after_ln (0-indexed)
    new_lines = [
        optimized_at_line,
        optimized_round_line,
    ]
    for nl in reversed(new_lines):
        lines.insert(insert_idx, nl)
    print(f"  {slug}: inserted optimizedAt after L{after_ln}")

# Write back
new_content = "\n".join(lines)
p.write_text(new_content, encoding="utf-8")
print(f"\nDONE: 3 SKUs optimized (transparent-stickers / kraft-paper-bags / rigid-boxes)")
print(f"File size: {p.stat().st_size} bytes")
