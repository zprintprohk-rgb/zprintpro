# -*- coding: utf-8 -*-
# 簇3 现场调查: flyer/poster/leaflet 三载体实况
import io, re, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
t = io.open(ROOT/'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')

# 1) 相关 SKU 全搜
slugs = re.findall(r"slug: '([a-z0-9-]*(?:flyer|poster|leaflet|brochure|fold|pamphlet)[a-z0-9-]*)'", t[base:])
print('matched slugs:', slugs)
for slug in slugs:
    i = t.index("slug: '%s'" % slug, base)
    seg = t[i:i+3000]
    nm = re.search(r"name: '([^']+)'", seg)
    mq = re.search(r'minQuantity: (\d+)', seg)
    pr = re.search(r"price_range: '([^']+)'", seg)
    print('%s | name=%s | minQ=%s | range=%s' % (slug, nm.group(1) if nm else '?', mq.group(1) if mq else '?', pr.group(1) if pr else '?'))

# 2) category 内容块存在性
cs = io.open(ROOT/'src/data/category-seo-content.ts', encoding='utf-8').read()
for c in ('flyersContent', 'postersContent', 'leafletsContent', 'brochuresContent'):
    print(c, '->', ('const %s' % c) in cs)
i = cs.find('const flyersContent')
if i > -1:
    seg = cs[i:i+1500]
    m = re.search(r"featuredSnippet: '([^']{0,120})", seg)
    print('flyers featuredSnippet:', m.group(1) if m else '?')
    m2 = re.search(r"lastUpdated: '([^']+)'", seg)
    print('flyers lastUpdated:', m2.group(1) if m2 else '?')
i = cs.find('const postersContent')
if i > -1:
    seg = cs[i:i+1500]
    m = re.search(r"featuredSnippet: '([^']{0,120})", seg)
    print('posters featuredSnippet:', m.group(1) if m else '?')
    m2 = re.search(r"lastUpdated: '([^']+)'", seg)
    print('posters lastUpdated:', m2.group(1) if m2 else '?')

# 3) 跨簇内链目标存在性 (packaging/menus/stickers/books)
for slug in ('packaging', 'menus', 'stickers', 'books', 'banners'):
    print("category '%s':" % slug, ("'%s':" % slug) in cs)
