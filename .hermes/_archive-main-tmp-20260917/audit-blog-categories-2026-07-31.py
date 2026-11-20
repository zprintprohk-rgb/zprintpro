# -*- coding: utf-8 -*-
"""
audit-blog-categories-2026-07-31.py
Audit 71 篇文章的 category 状态, 找出未分类 / 侧边栏无入口的
"""
import io
import sys
import json
import re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# 1. blog-posts.ts 实际 categoryKey 分布 (68 篇)
BLOG_POSTS = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
with io.open(BLOG_POSTS, 'r', encoding='utf-8') as f:
    content = f.read()

# 抓所有 slug + categoryKey + title
posts = re.findall(r"slug:\s+'([^']+)'[^}]*?categoryKey:\s+'([^']+)'", content, re.DOTALL)
print(f'=== blog-posts.ts {len(posts)} 篇 ===')
from collections import Counter
cat_count = Counter([c for s, c in posts])
for cat, cnt in cat_count.most_common():
    print(f'  {cat:25s} {cnt}')

# 2. 侧边栏 UI categories (BlogContent.tsx)
UI_CATS = ['company-news', 'sticker', 'card', 'packaging', 'printing', 'design',
           'branding', 'hongkong', 'trends', 'buying-guide']
print(f'\n=== 侧边栏 UI 显示 {len(UI_CATS)} 个 ===')
for c in UI_CATS:
    print(f'  {c:25s} {cat_count.get(c, 0)}')

# 3. 侧边栏无入口的 (12 个 categoryKey)
invisible = [(c, n) for c, n in cat_count.items() if c not in UI_CATS]
invisible_total = sum(n for c, n in invisible)
print(f'\n=== 侧边栏无入口的 categoryKey ({len(invisible)} 个, {invisible_total} 篇) ===')
for c, n in sorted(invisible, key=lambda x: -x[1]):
    print(f'  {c:25s} {n}')

# 4. card 禁区
print(f'\n=== §11 名片禁区 (card) ===')
print(f'  card categoryKey 文章数: {cat_count.get("card", 0)}')
card_slugs = [s for s, c in posts if c == 'card']
for s in card_slugs:
    print(f'    - {s}')

# 5. blog-data/{locale}.json legacy posts (3 篇 71-68=3)
BLOG_DATA = r'F:\zprintpro-nextjs\src\data\blog-data'
total_legacy = 0
for locale in ['zh-hk', 'en', 'ja']:
    fp = f'{BLOG_DATA}/{locale}.json'
    try:
        with io.open(fp, 'r', encoding='utf-8') as f:
            data = json.load(f)
        # data 是 dict, keys = slug
        slugs = list(data.keys()) if isinstance(data, dict) else []
        total_legacy += len(slugs)
        print(f'\n=== {locale}.json: {len(slugs)} 篇 legacy ===')
        # 找哪些 slug 不在 blog-posts.ts
        blog_slugs = set(s for s, c in posts)
        not_in_blog = [s for s in slugs if s not in blog_slugs]
        print(f'  not in blog-posts.ts: {len(not_in_blog)}')
        for s in not_in_blog[:20]:
            print(f'    - {s}')
    except Exception as e:
        print(f'  ERR {locale}.json: {e}')

print(f'\n=== 总结 ===')
print(f'  blog-posts.ts: {len(posts)} 篇 (有 categoryKey)')
print(f'  侧边栏 UI: {sum(cat_count.get(c, 0) for c in UI_CATS)} 篇 可见')
print(f'  侧边栏无入口: {invisible_total} 篇 (12 个 categoryKey 被 UI 隐藏)')
print(f'  card 禁区: {cat_count.get("card", 0)} 篇 (需删/改)')
print(f'  全部文章 71 = {len(posts)} + 3 legacy (blog-data/{locale}.json 独有)')
