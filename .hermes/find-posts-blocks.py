"""
Find posts.zh-hk / posts.en / posts.ja block boundaries in page.tsx
"""
from pathlib import Path
p = Path(r"F:\zprintpro-nextjs\src\app\[locale]\blog\[slug]\page.tsx")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")

# find posts object start
in_posts = False
for i, line in enumerate(lines, 1):
    if "const posts:" in line:
        print(f"L{i}: {line.strip()[:80]}")
    if "'zh-hk':" in line and "{" in line and not in_posts:
        print(f"L{i} [zh-hk block start]: {line.strip()[:80]}")
        in_posts = True
    if line.strip() == "}," and in_posts:
        print(f"L{i} [block end]: {line.strip()}")
        in_posts = False
    if line.strip().startswith("en:") and "{" in line and "zh-hk" not in line:
        print(f"L{i} [en block?]: {line.strip()[:80]}")
    if line.strip().startswith("ja:") and "{" in line and "zh-hk" not in line:
        print(f"L{i} [ja block?]: {line.strip()[:80]}")
    if "articleSlugs" in line and "const" in line:
        print(f"L{i} [articleSlugs start]: {line.strip()[:80]}")
