"""
查找 articleSlugs 数组里有但 blog-data JSON 里没的 slug (即 page.tsx 有路由但 content 缺失)
"""
import json
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")

# 读 articleSlugs from page.tsx
page_path = ROOT / "src/app/[locale]/blog/[slug]/page.tsx"
content = page_path.read_text(encoding="utf-8")
m = re.search(r"const articleSlugs = \[(.*?)\];", content, re.DOTALL)
if m:
    article_block = m.group(1)
    article_slugs = re.findall(r"'([^']+)'", article_block)
else:
    raise SystemExit("articleSlugs not found")

print(f"articleSlugs in page.tsx: {len(article_slugs)} slugs")

# 读 3 locale JSON keys
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(ROOT / f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
    json_keys = set(d.keys())
    article_set = set(article_slugs)
    missing = article_set - json_keys
    if missing:
        print(f"\n{loc} JSON missing slugs (in articleSlugs but not in JSON):")
        for slug in sorted(missing):
            print(f"  - {slug}")
    else:
        print(f"\n{loc} JSON: all articleSlugs covered")

# 找有 JSON content 但 articleSlugs 没有的(孤儿)
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(ROOT / f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
    json_keys = set(d.keys())
    article_set = set(article_slugs)
    orphan = json_keys - article_set
    if orphan:
        print(f"\n{loc} JSON orphan slugs (in JSON but not in articleSlugs):")
        for slug in sorted(orphan):
            print(f"  - {slug}")
