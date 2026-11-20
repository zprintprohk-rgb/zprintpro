# -*- coding: utf-8 -*-
# E2 核验: books category 是否链向 saddle PDP + saddle 指南是否链向 PDP
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 1. category-seo-content.ts 中 books 相关 category
p1 = 'F:/zprintpro-nextjs/src/data/category-seo-content.ts'
src = open(p1, encoding='utf-8').read()
# 找 slug 含 book 的 category 块
slugs = re.findall(r"slug:\s*'([^']*)'", src)
print('category-seo-content.ts 全部 slug:', [s for s in slugs if 'book' in s.lower() or 'print' in s.lower()][:12])
# books 分类在哪
for m in re.finditer(r"export const (\w+)", src):
    pass
# 找 books category 内容块及其 saddle 链接
for slug in set(slugs):
    if 'book' in slug.lower():
        i = src.find("'" + slug + "'")
        seg = src[max(0, i-200):i+1500]
        has_saddle = 'saddle-stitch-booklets' in seg or 'saddle stitch' in seg.lower()
        has_exercise = 'exercise-books' in seg
        has_textbook = 'textbooks' in seg
        print(f'category [{slug}]: saddle链接={has_saddle} exercise={has_exercise} textbook={has_textbook}')

# 2. saddle 指南 (blog) 是否链向 saddle PDP
base = 'F:/zprintpro-nextjs/src/data/blog-data/'
import json
for f in ['en', 'zh-hk', 'ja']:
    data = json.load(open(base + f + '.json', encoding='utf-8'))
    for key, v in data.items():
        if not isinstance(v, dict):
            continue
        c = v.get('content', '')
        if 'saddle-stitch' in key or ('saddle' in key and 'guide' in key):
            has_pdp = '/product/saddle-stitch-booklets/' in c
            print(f'blog[{f}:{key}] → saddle PDP: {has_pdp}')
