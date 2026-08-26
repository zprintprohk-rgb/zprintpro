"""
查 articleSlugs 数组 49 个但 JSON 只有 46 个 — 找出 JSON 缺的 3 个 slug
"""
import json
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
page_path = ROOT / "src/app/[locale]/blog/[slug]/page.tsx"
content = page_path.read_text(encoding="utf-8")
m = re.search(r"const articleSlugs = \[(.*?)\];", content, re.DOTALL)
article_slugs = re.findall(r"'([^']+)'", m.group(1))

# 看每个 slug 在哪个 locale 缺
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(ROOT / f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
    json_keys = set(d.keys())
    article_set = set(article_slugs)
    print(f"\n{loc} JSON ({len(d)}) vs articleSlugs ({len(article_slugs)}):")
    for slug in article_slugs:
        if slug not in json_keys:
            print(f"  MISSING: {slug}")

# 列出所有 49 slugs + 各自 3 locale 状态
print("\n\n=== FULL 49 articleSlugs × 3 locale status matrix ===")
for slug in article_slugs:
    row = [slug]
    for loc in ['zh-hk', 'en', 'ja']:
        d = json.load(open(ROOT / f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8'))
        e = d.get(slug, {})
        c = e.get('content', '')
        row.append('Y' if c else 'N')
    print('  '.join(row))
