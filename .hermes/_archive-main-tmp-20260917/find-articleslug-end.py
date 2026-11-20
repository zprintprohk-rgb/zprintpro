"""
Find posts.ja block end + 7-15 7-16 块具体位置
"""
from pathlib import Path
p = Path(r"F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# Find ja block boundaries
in_ja = False
ja_start = 0
for i, line in enumerate(lines, 1):
    if line.strip() == "ja: {" and not in_ja:
        ja_start = i
        in_ja = True
    if in_ja and line.strip() == "};":
        print(f"ja block: L{ja_start} - L{i}")
        in_ja = False
        break

# Find articleSlugs block + L457 area
print("\narticleSlugs block:")
in_articles = False
art_start = 0
for i, line in enumerate(lines, 1):
    if "const articleSlugs" in line and "[" in line:
        art_start = i
        in_articles = True
    if in_articles and line.strip() == "];":
        print(f"articleSlugs: L{art_start} - L{i}")
        in_articles = False
        break

# 7-16 块在 zh-hk 块中间,看 zh-hk 7-16 块起点
print("\n7-16 zh-hk block markers:")
for i, line in enumerate(lines, 1):
    if "2026-07-16" in line and "v4" in line and "daily" in line:
        print(f"  L{i}: {line.strip()[:80]}")
    if "folding-box-cosmetics" in line:
        print(f"  L{i}: {line.strip()[:80]}")
