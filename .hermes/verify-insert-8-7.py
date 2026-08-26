#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Verify insertion correctness: slug counts, JSON validity, content quality."""
import json, os, re

os.chdir(r'F:\zprintpro-nextjs')

SLUG = 'poster-printing-price-guide'

# 1) page.tsx slug count (expect 4: 3 locale entries + 1 articleSlugs)
pg = open('src/app/[locale]/blog/[slug]/page.tsx', encoding='utf-8').read()
print('page.tsx occurrences of', SLUG, ':', pg.count(SLUG))

# 2) blog-posts.ts
bp = open('src/data/blog-posts.ts', encoding='utf-8').read()
print('blog-posts.ts occurrences:', bp.count(SLUG))
print('lpPosterPrintingPrice in array:', 'lpPosterPrintingPrice,' in bp)

# 3) JSON validity + content length
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(f'src/data/blog-data/{loc}.json', encoding='utf-8'))
    e = d[SLUG]
    content = e['content']
    # count Chinese chars for zh-hk
    zh_chars = len(re.findall(r'[\u4e00-\u9fff]', content)) if loc == 'zh-hk' else 0
    faqs = content.count('<h3>Q')
    links = re.findall(r'href="([^"]+)"', content)
    print(f'--- {loc}: title_len={len(e["title"])} content_len={len(content)} zh_chars={zh_chars} FAQ_h3={faqs}')
    print(f'    links: {links}')

# 4) 简体字 scan for zh-hk content (quick check common simplified chars)
simplified = ['几钱', '几多', '这边', '门市', '我们', '价格', '订单', '打印', '印刷厂']
zh_content = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))[SLUG]['content']
for s in simplified:
    if s in zh_content:
        print('SIMPLIFIED FOUND:', s)
print('zh-hk simplified scan done')
