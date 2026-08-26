# -*- coding: utf-8 -*-
"""Verify poster-printing-price-guide insertion: JSON valid, slug counts, FAQ x4, char counts, no simplified."""
import json, re

# 1. JSON valid + slug present
for loc in ['zh-hk', 'en', 'ja']:
    path = f'src/data/blog-data/{loc}.json'
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    e = data.get('poster-printing-price-guide')
    assert e, f"{loc}: entry missing!"
    content = e['content']
    faq_count = content.count('<h3 class="text-lg font-bold') 
    h2_count = content.count('<h2 class="text-2xl')
    table_count = content.count('<table')
    link_count = content.count('href="/')
    print(f"{loc}: valid JSON | content {len(content)} chars | H2 x{h2_count} | FAQ H3 x{faq_count} | table x{table_count} | links x{link_count}")

# 2. Slug counts in blog-posts.ts + page.tsx
for path in ['src/data/blog-posts.ts', 'src/app/[locale]/blog/[slug]/page.tsx']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    n = content.count("'poster-printing-price-guide'")
    print(f"{path}: poster-printing-price-guide x{n}")

# 3. Simplified char scan on new content
simplified = ['海報' ,'貼紙', '传单', '印刷厂', '价格', '张', '张', '订单', '数量', '包装盒', '优惠', '质量', '服务', '设计', '制作', '公司']
# NOTE: 海报 is simplified for 海報 — check
for loc in ['zh-hk', 'en', 'ja']:
    with open(f'src/data/blog-data/{loc}.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    c = data['poster-printing-price-guide']['content']
    hits = []
    for s in ['海报', '传单', '价格', '订单', '数量', '包装', '优惠', '质量', '设计', '制作', '报价', '服务', '选择', '价格表', '印刷厂', '訂']:
        if s in c:
            hits.append(s)
    print(f"{loc} simplified scan hits: {hits if hits else 'NONE ✓'}")
